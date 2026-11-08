// Rutas del contenido compartido:
//   GET  /files/:id/:nombre      archivo guardado en la base (fotos, documentos, audios)
//   POST /api/upload/file        subir un archivo (documentos, imágenes, audio y video)
//   GET  /api/link-preview       vista previa de un enlace (título, canal, miniatura...)
//   POST /api/link-previews      varias vistas previas de una vez (una sola petición por página)
//   GET  /api/files/status       espacio usado (solo administración)
import type { Express, Request, Response, RequestHandler } from "express";
import multer from "multer";
import os from "node:os";
import path from "node:path";
import fs from "node:fs";
import { randomBytes } from "node:crypto";
import sharp from "sharp";
import { rateLimit } from "express-rate-limit";
import { uploadFile, isS3Configured } from "./file-storage";
import { StorageFullError, serveStoredFile, storageStatus, safeFileName } from "./file-store";
import { getLinkPreview, getLinkPreviews, isValidPreviewUrl } from "./link-preview";
import { fileExtension, fileTypeOf, FILE_TYPE_LABELS, type FileType } from "@shared/media";
import { chatQuotaExceeded } from "./chat";

const MB = 1024 * 1024;
const TMP_DIR = path.join(os.tmpdir(), "avivando-subidas");

/** Peso máximo por tipo. Sin S3/R2 los videos se limitan más: van dentro de la base. */
export function uploadLimitFor(type: FileType): number {
  switch (type) {
    case "image":
      return 25 * MB; // se reduce al subir
    case "audio":
      return 80 * MB;
    case "video":
      return (isS3Configured ? 300 : 80) * MB;
    case "powerpoint":
      return 60 * MB;
    case "text":
    case "csv":
      return 10 * MB;
    default:
      return 40 * MB;
  }
}

const MIME_BY_EXT: Record<string, string> = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  odt: "application/vnd.oasis.opendocument.text",
  rtf: "application/rtf",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ods: "application/vnd.oasis.opendocument.spreadsheet",
  ppt: "application/vnd.ms-powerpoint",
  pps: "application/vnd.ms-powerpoint",
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ppsx: "application/vnd.openxmlformats-officedocument.presentationml.slideshow",
  odp: "application/vnd.oasis.opendocument.presentation",
  txt: "text/plain",
  md: "text/markdown",
  csv: "text/csv",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  webp: "image/webp",
  avif: "image/avif",
  bmp: "image/bmp",
  heic: "image/heic",
  heif: "image/heif",
  mp3: "audio/mpeg",
  m4a: "audio/mp4",
  aac: "audio/aac",
  ogg: "audio/ogg",
  oga: "audio/ogg",
  opus: "audio/ogg",
  wav: "audio/wav",
  flac: "audio/flac",
  weba: "audio/webm",
  mp4: "video/mp4",
  m4v: "video/mp4",
  webm: "video/webm",
  mov: "video/quicktime",
  "3gp": "video/3gpp",
};

/** Extensiones que se aceptan. No se aceptan HTML, SVG, programas ni comprimidos. */
export const ALLOWED_UPLOAD_EXTENSIONS = new Set(Object.keys(MIME_BY_EXT));

const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => {
      fs.mkdirSync(TMP_DIR, { recursive: true });
      cb(null, TMP_DIR);
    },
    filename: (_req, file, cb) => cb(null, `${Date.now()}-${randomBytes(6).toString("hex")}.${fileExtension(file.originalname) || "bin"}`),
  }),
  limits: { fileSize: 300 * MB, files: 1 },
  // Los navegadores mandan el nombre en UTF-8: sin esto "Oración.pdf" llegaba como "OraciÃ³n.pdf".
  ...({ defParamCharset: "utf8" } as object), // nombres con tildes (UTF-8); los tipos de multer aún no lo traen
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_UPLOAD_EXTENSIONS.has(fileExtension(file.originalname))) cb(null, true);
    else cb(Object.assign(new Error("TIPO"), { code: "TIPO_NO_PERMITIDO" }));
  },
});

function receive(req: Request, res: Response, field: string): Promise<Express.Multer.File | undefined> {
  return new Promise((resolve, reject) => {
    upload.single(field)(req, res, (err: unknown) => (err ? reject(err) : resolve(req.file)));
  });
}

function mb(bytes: number) {
  return `${Math.round(bytes / MB)} MB`;
}

/**
 * Sube un archivo: lo valida, reduce las fotos y lo guarda (S3/R2 o la base).
 * Responde con los nombres de siempre (fileUrl, fileData) para no romper a quien ya los usa.
 */
export async function handleFileUpload(req: Request, res: Response, field = "file") {
  if (typeof req.isAuthenticated !== "function" || !req.isAuthenticated()) return res.sendStatus(401);
  if (!req.user!.isActive) return res.status(403).json({ message: "Tu cuenta aún no está aprobada para subir archivos." });
  let file: Express.Multer.File | undefined;
  try {
    file = await receive(req, res, field);
  } catch (err: any) {
    if (err?.code === "LIMIT_FILE_SIZE") return res.status(413).json({ message: "El archivo es demasiado grande. Para videos largos, súbelo a YouTube o Drive y comparte el enlace: se verá aquí mismo." });
    if (err?.code === "TIPO_NO_PERMITIDO") return res.status(415).json({ message: "Ese tipo de archivo no se puede subir. Se aceptan PDF, Word, Excel, PowerPoint, texto, imágenes, audio y video." });
    return res.status(400).json({ message: "No se pudo recibir el archivo." });
  }
  if (!file) return res.status(400).json({ message: "No se envió ningún archivo." });

  const tmp = file.path;
  try {
    const ext = fileExtension(file.originalname);
    let mime = MIME_BY_EXT[ext] || "application/octet-stream";
    const type = fileTypeOf(file.originalname, mime);
    const limit = uploadLimitFor(type);
    if (file.size > limit) {
      return res.status(413).json({
        message: `${FILE_TYPE_LABELS[type]}: el máximo es ${mb(limit)} y este pesa ${mb(file.size)}.${type === "video" || type === "audio" ? " Puedes subirlo a YouTube o Drive y compartir el enlace: se verá aquí mismo." : ""}`,
      });
    }
    let name = safeFileName(file.originalname);
    let buffer: Buffer | undefined;
    // Fotos: se giran según la cámara y se reducen a 2560 px en WebP (una foto de celular
    // de 6 MB queda en ~500 KB). Los GIF se dejan como están para no perder la animación.
    if (type === "image" && ext !== "gif") {
      try {
        buffer = await sharp(tmp, { failOn: "none" })
          .rotate()
          .resize({ width: 2560, height: 2560, fit: "inside", withoutEnlargement: true })
          .webp({ quality: 82 })
          .toBuffer();
        mime = "image/webp";
        name = `${name.replace(/\.[^.]+$/, "")}.webp`;
      } catch {
        buffer = undefined; // HEIC u otro formato que sharp no lee: se guarda el original
      }
    }
    const folder = String((req.query.carpeta as string) || "archivos").replace(/[^a-z0-9-]/gi, "").slice(0, 30) || "archivos";
    // Chat: tope de espacio por persona cuando los archivos van dentro de la base (sin costo extra).
    if (folder === "chat" && !isS3Configured) {
      const quota = await chatQuotaExceeded(req.user!.id, buffer?.length ?? file.size);
      if (quota.exceeded) {
        return res.status(413).json({
          message: `Llegaste al límite de ${quota.limitMb} MB de archivos en el chat. Elimina para todos algunos mensajes con fotos o archivos y vuelve a intentar.`,
        });
      }
    }
    const result = await uploadFile({
      folder,
      filename: name,
      buffer,
      filePath: buffer ? undefined : tmp,
      contentType: mime,
      ownerId: req.user!.id,
    });
    res.json({
      url: result.url,
      fileUrl: result.url,
      fileData: result.url, // compatibilidad: algunos formularios leen fileData
      fileName: name,
      fileSize: result.size,
      mimeType: mime,
      fileType: type,
    });
  } catch (err) {
    if (err instanceof StorageFullError) {
      return res.status(507).json({ message: "El espacio para archivos está lleno. Comparte el archivo como enlace (Drive, YouTube) o avisa a la administración." });
    }
    console.error("[subida] error:", err);
    res.status(500).json({ message: "No se pudo guardar el archivo. Intenta de nuevo." });
  } finally {
    fs.promises.unlink(tmp).catch(() => {});
  }
}

/** Archivos guardados: va antes de la sesión (no usa cookies y así se guarda en caché). */
export function registerFileServing(app: Express) {
  // ":fileId" y no ":id": en esta web ":id" solo acepta números (app.param en routes.ts).
  app.get("/files/:fileId/:name", serveStoredFile);
  app.get("/files/:fileId", serveStoredFile);
}

export function registerMediaRoutes(
  app: Express,
  helpers: { uploadLimiter: RequestHandler; keyGenerator: (req: Request) => string; isAdmin: (req: Request) => boolean },
) {
  app.post("/api/upload/file", helpers.uploadLimiter, (req, res) => handleFileUpload(req, res, "file"));

  // Las vistas previas hacen que el servidor abra enlaces de afuera: con un límite propio.
  const previewLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 40,
    keyGenerator: helpers.keyGenerator,
    message: { message: "Demasiadas vistas previas seguidas. Espera un momento." },
    standardHeaders: true,
    legacyHeaders: false,
  }) as unknown as RequestHandler;

  app.get("/api/link-preview", previewLimiter, async (req, res) => {
    const url = String(req.query.url || "");
    if (!isValidPreviewUrl(url)) return res.status(400).json({ message: "Enlace no válido" });
    try {
      const preview = await getLinkPreview(url);
      res.setHeader("Cache-Control", "public, max-age=3600");
      res.json(preview);
    } catch {
      res.status(422).json({ message: "No se pudo leer el enlace" });
    }
  });

  app.post("/api/link-previews", previewLimiter, async (req, res) => {
    const raw: unknown[] = Array.isArray(req.body?.urls) ? req.body.urls : [];
    const urls = raw.filter(isValidPreviewUrl).slice(0, 24);
    if (!urls.length) return res.json({ previews: {} });
    res.json({ previews: await getLinkPreviews(urls) });
  });

  app.get("/api/files/status", async (req, res) => {
    if (typeof req.isAuthenticated !== "function" || !req.isAuthenticated() || !helpers.isAdmin(req)) return res.sendStatus(403);
    res.json({ storage: isS3Configured ? "s3" : "database", ...(await storageStatus()) });
  });
}
