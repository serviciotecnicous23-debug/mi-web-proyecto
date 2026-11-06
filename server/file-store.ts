// Archivos guardados en la base de datos, por partes de 512 KB, cuando no hay un
// almacenamiento S3/R2 configurado. Antes cada archivo se guardaba como texto base64
// dentro de la propia publicación: un PDF de 20 MB ocupaba 27 MB y viajaba entero cada vez
// que alguien abría la lista (Comunidad llegó a pesar 1,4 MB por las fotos).
//
// Ahora cada archivo tiene su dirección (/files/<id>/<nombre>), el navegador lo guarda en
// caché, solo se descarga al abrirlo y los audios y videos se pueden adelantar (Range).
import fs from "node:fs";
import { createHash, randomBytes } from "node:crypto";
import type { Request, Response } from "express";
import { pool } from "./db";

const CHUNK_SIZE = 512 * 1024;

export class StorageFullError extends Error {
  constructor() {
    super("El espacio para archivos está lleno");
    this.name = "StorageFullError";
  }
}

export const STORED_FILES_SQL = `
CREATE TABLE IF NOT EXISTS "stored_files" (
  "id" text PRIMARY KEY,
  "owner_id" integer,
  "name" text NOT NULL,
  "mime" text NOT NULL,
  "size" integer NOT NULL,
  "sha256" text,
  "folder" text,
  "created_at" timestamp DEFAULT now()
);
CREATE INDEX IF NOT EXISTS "stored_files_sha256_idx" ON "stored_files" ("sha256");
CREATE TABLE IF NOT EXISTS "stored_file_chunks" (
  "file_id" text NOT NULL REFERENCES "stored_files"("id") ON DELETE CASCADE,
  "idx" integer NOT NULL,
  "data" bytea NOT NULL,
  PRIMARY KEY ("file_id", "idx")
);`;

/** Nombre sin rutas ni caracteres raros (se conserva la ñ y las tildes). */
export function safeFileName(name: string): string {
  const base = (name || "archivo").split(/[\\/]/).pop() || "archivo";
  const cleaned = base.replace(/[\u0000-\u001f<>:"|?*]+/g, "").replace(/\s+/g, " ").trim();
  return (cleaned || "archivo").slice(0, 150);
}

export function storedFileUrl(id: string, name: string): string {
  return `/files/${id}/${encodeURIComponent(safeFileName(name))}`;
}

/** Límite total de la base (MB). En Render el plan inicial trae 1 GB: se deja margen. */
function dbLimitBytes(): number {
  const mb = Number(process.env.FILE_DB_LIMIT_MB || 850);
  return (Number.isFinite(mb) && mb > 0 ? mb : 850) * 1024 * 1024;
}

export async function databaseSize(): Promise<number | null> {
  try {
    const { rows } = await pool.query("SELECT pg_database_size(current_database())::bigint AS size");
    return Number(rows[0]?.size) || null;
  } catch {
    return null;
  }
}

export async function storageStatus() {
  const size = await databaseSize();
  const limit = dbLimitBytes();
  let files = { count: 0, bytes: 0 };
  try {
    const { rows } = await pool.query(`SELECT count(*)::int AS count, coalesce(sum(size), 0)::bigint AS bytes FROM stored_files`);
    files = { count: Number(rows[0]?.count) || 0, bytes: Number(rows[0]?.bytes) || 0 };
  } catch {
    /* tabla aún sin crear */
  }
  return { databaseBytes: size, limitBytes: limit, files };
}

async function ensureRoom(bytes: number) {
  const size = await databaseSize();
  if (size != null && size + bytes > dbLimitBytes()) throw new StorageFullError();
}

async function findDuplicate(sha256: string, size: number): Promise<{ id: string; name: string } | null> {
  try {
    const { rows } = await pool.query(`SELECT id, name FROM stored_files WHERE sha256 = $1 AND size = $2 LIMIT 1`, [sha256, size]);
    return rows[0] || null;
  } catch {
    return null;
  }
}

function sha256OfFile(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const hash = createHash("sha256");
    fs.createReadStream(filePath).on("data", (d) => hash.update(d)).on("end", () => resolve(hash.digest("hex"))).on("error", reject);
  });
}

export interface StoreInput {
  name: string;
  mime: string;
  ownerId?: number | null;
  folder?: string;
}

/** Guarda un archivo que ya está en memoria. */
export async function saveStoredBuffer(buffer: Buffer, input: StoreInput): Promise<{ id: string; url: string; size: number }> {
  const sha = createHash("sha256").update(buffer).digest("hex");
  const dup = await findDuplicate(sha, buffer.length);
  if (dup) return { id: dup.id, url: storedFileUrl(dup.id, input.name || dup.name), size: buffer.length };
  await ensureRoom(buffer.length);
  const id = randomBytes(16).toString("base64url");
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query(
      `INSERT INTO stored_files (id, owner_id, name, mime, size, sha256, folder) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [id, input.ownerId ?? null, safeFileName(input.name), input.mime || "application/octet-stream", buffer.length, sha, input.folder || null],
    );
    for (let offset = 0, idx = 0; offset < buffer.length; offset += CHUNK_SIZE, idx++) {
      await client.query(`INSERT INTO stored_file_chunks (file_id, idx, data) VALUES ($1, $2, $3)`, [id, idx, buffer.subarray(offset, offset + CHUNK_SIZE)]);
    }
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK").catch(() => {});
    throw err;
  } finally {
    client.release();
  }
  return { id, url: storedFileUrl(id, input.name), size: buffer.length };
}

/** Guarda un archivo desde el disco sin cargarlo entero en memoria (audios y videos). */
export async function saveStoredPath(filePath: string, input: StoreInput): Promise<{ id: string; url: string; size: number }> {
  const size = fs.statSync(filePath).size;
  const sha = await sha256OfFile(filePath);
  const dup = await findDuplicate(sha, size);
  if (dup) return { id: dup.id, url: storedFileUrl(dup.id, input.name || dup.name), size };
  await ensureRoom(size);
  const id = randomBytes(16).toString("base64url");
  const client = await pool.connect();
  const fd = fs.openSync(filePath, "r");
  try {
    await client.query("BEGIN");
    await client.query(
      `INSERT INTO stored_files (id, owner_id, name, mime, size, sha256, folder) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [id, input.ownerId ?? null, safeFileName(input.name), input.mime || "application/octet-stream", size, sha, input.folder || null],
    );
    const buf = Buffer.alloc(CHUNK_SIZE);
    for (let idx = 0, offset = 0; offset < size; idx++) {
      const read = fs.readSync(fd, buf, 0, CHUNK_SIZE, offset);
      if (read <= 0) break;
      await client.query(`INSERT INTO stored_file_chunks (file_id, idx, data) VALUES ($1, $2, $3)`, [id, idx, Buffer.from(buf.subarray(0, read))]);
      offset += read;
    }
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK").catch(() => {});
    throw err;
  } finally {
    fs.closeSync(fd);
    client.release();
  }
  return { id, url: storedFileUrl(id, input.name), size };
}

// Solo se muestran dentro del navegador los tipos que no pueden ejecutar nada en esta web.
// HTML, SVG, XML y el resto se descargan, con una política que bloquea scripts.
const INLINE_TYPES = /^(application\/pdf|image\/(png|jpe?g|gif|webp|avif|bmp)|audio\/[\w.+-]+|video\/[\w.+-]+|text\/plain|text\/csv)$/;

function contentDisposition(kind: "inline" | "attachment", name: string): string {
  const ascii = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\x20-\x7e]/g, "_").replace(/["\\]/g, "");
  return `${kind}; filename="${ascii}"; filename*=UTF-8''${encodeURIComponent(name)}`;
}

/** GET/HEAD /files/:id/:nombre — con caché larga y por partes (Range) para audio y video. */
export async function serveStoredFile(req: Request, res: Response) {
  const id = String(req.params.fileId || "");
  if (!/^[A-Za-z0-9_-]{16,40}$/.test(id)) return res.status(404).end();
  let meta: { id: string; name: string; mime: string; size: number; sha256: string | null } | undefined;
  try {
    const { rows } = await pool.query(`SELECT id, name, mime, size, sha256 FROM stored_files WHERE id = $1`, [id]);
    meta = rows[0];
  } catch {
    return res.status(503).end();
  }
  if (!meta) return res.status(404).end();

  const size = Number(meta.size);
  const etag = `"${meta.sha256 || meta.id}"`;
  const mime = (meta.mime || "application/octet-stream").toLowerCase();
  const inline = INLINE_TYPES.test(mime) && req.query.download !== "1";
  res.setHeader("ETag", etag);
  res.setHeader("Cache-Control", "public, max-age=31536000, immutable, no-transform");
  res.setHeader("Accept-Ranges", "bytes");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Content-Type", mime.startsWith("text/") ? `${mime}; charset=utf-8` : mime);
  res.setHeader("Content-Disposition", contentDisposition(inline ? "inline" : "attachment", meta.name));
  if (!/^(application\/pdf|image\/|audio\/|video\/)/.test(mime)) {
    res.setHeader("Content-Security-Policy", "default-src 'none'; sandbox");
  }
  // El visor de Office (view.officeapps.live.com) necesita poder leer el archivo.
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.headers["if-none-match"] === etag) return res.status(304).end();

  let start = 0;
  let end = size - 1;
  const range = req.headers.range;
  if (range && size > 0) {
    const m = /^bytes=(\d*)-(\d*)$/.exec(range.trim());
    if (m && (m[1] !== "" || m[2] !== "")) {
      if (m[1] === "") {
        start = Math.max(0, size - Number(m[2]));
      } else {
        start = Number(m[1]);
        end = m[2] ? Math.min(Number(m[2]), size - 1) : size - 1;
      }
      if (start > end || start >= size) {
        res.setHeader("Content-Range", `bytes */${size}`);
        return res.status(416).end();
      }
      res.status(206);
      res.setHeader("Content-Range", `bytes ${start}-${end}/${size}`);
    }
  }
  res.setHeader("Content-Length", String(size === 0 ? 0 : end - start + 1));
  if (req.method === "HEAD" || size === 0) return res.end();

  const first = Math.floor(start / CHUNK_SIZE);
  const last = Math.floor(end / CHUNK_SIZE);
  let closed = false;
  res.on("close", () => {
    closed = true;
  });
  try {
    for (let from = first; from <= last && !closed; from += 8) {
      const to = Math.min(from + 7, last);
      const { rows } = await pool.query(
        `SELECT idx, data FROM stored_file_chunks WHERE file_id = $1 AND idx BETWEEN $2 AND $3 ORDER BY idx`,
        [id, from, to],
      );
      for (const row of rows) {
        if (closed) break;
        const chunkStart = Number(row.idx) * CHUNK_SIZE;
        const data: Buffer = row.data;
        const piece = data.subarray(Math.max(start - chunkStart, 0), Math.min(end - chunkStart + 1, data.length));
        if (!res.write(piece)) {
          await new Promise<void>((resolve) => {
            res.once("drain", () => resolve());
            res.once("close", () => resolve());
          });
        }
      }
    }
    res.end();
  } catch (err) {
    console.error("[files] error al enviar", id, err);
    res.destroy();
  }
}
