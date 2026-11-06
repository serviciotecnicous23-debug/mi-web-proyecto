/**
 * File Storage Service — S3/R2 with local fallback
 *
 * Provides a unified interface for storing files externally (Cloudflare R2, AWS S3,
 * or any S3-compatible service) with an automatic fallback to base64 data URLs
 * when S3 is not configured.
 *
 * Environment variables:
 *   S3_ENDPOINT          - S3-compatible endpoint URL (e.g., https://<account>.r2.cloudflarestorage.com)
 *   S3_REGION            - AWS region or "auto" for R2 (default: "auto")
 *   S3_ACCESS_KEY_ID     - Access key ID
 *   S3_SECRET_ACCESS_KEY - Secret access key
 *   S3_BUCKET            - Bucket name
 *   S3_PUBLIC_URL        - Public URL prefix for serving files (e.g., https://cdn.example.com)
 *                          If not set, generates S3 URLs directly
 */

import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { randomBytes } from "crypto";
import fs from "fs";
import path from "path";
import { saveStoredBuffer, saveStoredPath, StorageFullError } from "./file-store";

// ─── Configuration ───────────────────────────────────────────────────────────

const S3_ENDPOINT = process.env.S3_ENDPOINT || "";
const S3_REGION = process.env.S3_REGION || "auto";
const S3_ACCESS_KEY_ID = process.env.S3_ACCESS_KEY_ID || "";
const S3_SECRET_ACCESS_KEY = process.env.S3_SECRET_ACCESS_KEY || "";
const S3_BUCKET = process.env.S3_BUCKET || "";
const S3_PUBLIC_URL = process.env.S3_PUBLIC_URL || "";

export const isS3Configured = !!(S3_ENDPOINT && S3_ACCESS_KEY_ID && S3_SECRET_ACCESS_KEY && S3_BUCKET);

// ─── S3 Client (lazy-initialized) ───────────────────────────────────────────

let s3Client: S3Client | null = null;

function getS3Client(): S3Client {
  if (!s3Client) {
    s3Client = new S3Client({
      endpoint: S3_ENDPOINT,
      region: S3_REGION,
      credentials: {
        accessKeyId: S3_ACCESS_KEY_ID,
        secretAccessKey: S3_SECRET_ACCESS_KEY,
      },
      forcePathStyle: true, // Required for R2, MinIO, etc.
    });
  }
  return s3Client;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function generateKey(folder: string, originalName: string): string {
  const ext = path.extname(originalName).toLowerCase() || ".bin";
  const id = randomBytes(12).toString("hex");
  return `${folder}/${id}${ext}`;
}

function getPublicUrl(key: string): string {
  if (S3_PUBLIC_URL) {
    return `${S3_PUBLIC_URL.replace(/\/$/, "")}/${key}`;
  }
  // Fall back to S3 endpoint URL
  return `${S3_ENDPOINT.replace(/\/$/, "")}/${S3_BUCKET}/${key}`;
}

// ─── Upload ──────────────────────────────────────────────────────────────────

export interface UploadOptions {
  /** Subfolder in bucket (e.g., "avatars", "posts", "library") */
  folder: string;
  /** Original filename (used for extension) */
  filename: string;
  /** File content as Buffer (o filePath, para archivos grandes que están en disco) */
  buffer?: Buffer;
  /** Ruta de un archivo temporal en disco: se guarda sin cargarlo entero en memoria. */
  filePath?: string;
  /** MIME type */
  contentType: string;
  /** Cache-Control header (default: 1 year immutable) */
  cacheControl?: string;
  /** Quién lo sube (para saber de quién es cada archivo guardado en la base). */
  ownerId?: number | null;
}

export interface UploadResult {
  /** Public URL to access the file */
  url: string;
  /** S3 object key (for deletion) */
  key: string;
  /** Size in bytes */
  size: number;
}

/**
 * Upload a file to S3/R2 or fall back to base64 data URL.
 */
export async function uploadFile(options: UploadOptions): Promise<UploadResult> {
  const { folder, filename, contentType, cacheControl, ownerId, filePath } = options;
  const buffer = options.buffer ?? (filePath ? null : Buffer.alloc(0));

  if (!isS3Configured) {
    // Sin S3/R2: se guarda en la base de datos por partes y se sirve en /files/<id>/<nombre>.
    // Antes se devolvía un data: URL en base64 que quedaba dentro de cada publicación.
    if (process.env.DATABASE_URL) {
      try {
        const input = { name: filename, mime: contentType, ownerId, folder };
        const saved = filePath ? await saveStoredPath(filePath, input) : await saveStoredBuffer(buffer!, input);
        return { url: saved.url, key: "", size: saved.size };
      } catch (err) {
        if (err instanceof StorageFullError) throw err;
        console.error("[archivos] no se pudo guardar en la base; se usa base64:", (err as Error).message);
      }
    }
    const data = buffer ?? fs.readFileSync(filePath!);
    return {
      url: `data:${contentType};base64,${data.toString("base64")}`,
      key: "",
      size: data.length,
    };
  }

  const key = generateKey(folder, filename);
  const client = getS3Client();
  const body = buffer ?? fs.createReadStream(filePath!);
  const size = buffer ? buffer.length : fs.statSync(filePath!).size;

  await client.send(
    new PutObjectCommand({
      Bucket: S3_BUCKET,
      Key: key,
      Body: body,
      ContentLength: size,
      ContentType: contentType,
      CacheControl: cacheControl || "public, max-age=31536000, immutable",
    })
  );

  return {
    url: getPublicUrl(key),
    key,
    size,
  };
}

/**
 * ¿Es un archivo subido a esta web? (/files/... de la base, o el almacenamiento S3/R2).
 * Sirve para no aceptar como "adjunto" un enlace cualquiera de afuera.
 */
export function isOwnFileUrl(url?: string | null): boolean {
  if (!url || typeof url !== "string") return false;
  if (/^\/files\/[A-Za-z0-9_-]{16,40}(\/[^?#]*)?$/.test(url)) return true;
  if (url.startsWith("data:")) return true; // respaldo antiguo (base64)
  if (isS3Configured) {
    const prefixes = [S3_PUBLIC_URL, `${S3_ENDPOINT.replace(/\/$/, "")}/${S3_BUCKET}`].filter(Boolean).map((p) => p.replace(/\/$/, "") + "/");
    return prefixes.some((p) => url.startsWith(p));
  }
  return false;
}

// ─── Delete ──────────────────────────────────────────────────────────────────

/**
 * Delete a file from S3/R2.
 * No-op for base64 data URLs or empty keys.
 */
export async function deleteFile(key: string): Promise<void> {
  if (!key || !isS3Configured) return;

  const client = getS3Client();
  try {
    await client.send(
      new DeleteObjectCommand({
        Bucket: S3_BUCKET,
        Key: key,
      })
    );
  } catch (error) {
    console.error(`[file-storage] Failed to delete ${key}:`, error);
  }
}

// ─── Retrieve ────────────────────────────────────────────────────────────────

/**
 * Get a file buffer from S3/R2 (useful for server-side processing).
 */
export async function getFile(key: string): Promise<Buffer | null> {
  if (!key || !isS3Configured) return null;

  const client = getS3Client();
  try {
    const response = await client.send(
      new GetObjectCommand({
        Bucket: S3_BUCKET,
        Key: key,
      })
    );
    if (response.Body) {
      const chunks: Uint8Array[] = [];
      for await (const chunk of response.Body as AsyncIterable<Uint8Array>) {
        chunks.push(chunk);
      }
      return Buffer.concat(chunks);
    }
    return null;
  } catch (error) {
    console.error(`[file-storage] Failed to get ${key}:`, error);
    return null;
  }
}

// ─── Status ──────────────────────────────────────────────────────────────────

export function getStorageStatus(): {
  provider: "s3" | "local-base64";
  bucket?: string;
  endpoint?: string;
  publicUrl?: string;
} {
  if (isS3Configured) {
    return {
      provider: "s3",
      bucket: S3_BUCKET,
      endpoint: S3_ENDPOINT,
      publicUrl: S3_PUBLIC_URL || undefined,
    };
  }
  return { provider: "local-base64" };
}
