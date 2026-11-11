import type { Express, Request, Response, NextFunction, RequestHandler } from "express";
import { createServer, type Server } from "http";
import { storage, type CourseChildKind } from "./storage";
import { registerChatRoutes } from "./chat";
import { registerGameRoutes } from "./games";
import { registerJerusalenRoutes } from "./jerusalen";
import { registerCiudadRoutes } from "./ciudad";
import { registerRedRoutes, registrarRedCiudad } from "./ciudad-red";
import { registerEstudiosRoutes } from "./estudios";
import { registerMisionesRoutes } from "./misiones";
import { registerMercadoRoutes } from "./mercado";
import { registerEconomiaRoutes } from "./economia";
import { registerCatedrasRoutes } from "./catedras";
import { registerBarrioRoutes } from "./barrio";
import { registerBarrioJuntosRoutes } from "./barrio-juntos";
import { registerAcompanarRoutes } from "./acompanar";
import { registerPuebloRoutes } from "./pueblo";
import { registerSabioRoutes } from "./sabio";
import { registerSabioDueloRoutes } from "./sabio-duelo";
import { registerReunionesRoutes } from "./reuniones";
import { registerConcursoRoutes } from "./concurso";
import { registerAyudaRoutes } from "./ayuda";
import { registerMuroRoutes } from "./muro";
import { registerLogrosEnLineaRoutes } from "./logros-en-linea";
import { memoryStorage } from "./memory-storage";
import { pool } from "./db";
import { api } from "@shared/routes";
import { resolveSiteUrl } from "@shared/site";
import { z } from "zod";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import pgSession from "connect-pg-simple";
import MemoryStore from "memorystore";
import { rateLimit, ipKeyGenerator } from "express-rate-limit";
import { isIP } from "net";
import multer from "multer";
import sharp from "sharp";
import path from "path";
import fs from "fs";
import type { AuthenticatedRequest } from "./types";
import "./types"; // side-effect: augment Express.User
import { uploadFile, isOwnFileUrl } from "./file-storage";
import { registerMediaRoutes, registerFileServing, handleFileUpload } from "./media-routes";
import { sendPasswordResetEmail, sendVerificationEmail, sendWelcomeEmail, sendAccountApprovedEmail, sendDirectMessageEmail, sendNewCourseEmail, sendEventReminderEmail, isEmailConfigured } from "./email";
import { sendPushToMany, getVapidPublicKey, isPushConfigured, type PushPayload } from "./push";
import { registerAgentRoutes } from "./agent/routes";
import { getBibleChapter, BibleRequestError } from "./bible";
import { registerClubRoutes, notifyClubComment, readingClubPostAuthor } from "./club";
import { registerPrayerWallRoutes } from "./prayer-wall";
import { eliminarCuentaPropia } from "./account-deletion";
import { registerReportRoutes } from "./reports";
import { DEFAULT_AZURACAST_BASE_URL, AZURACAST_STATION_SHORTCODE } from "@shared/radio";
import {
  DEFAULT_AZURACAST_HLS_URL,
  DEFAULT_AZURACAST_LIGHT_STREAM_URL,
  DEFAULT_AZURACAST_METADATA_URL,
  DEFAULT_AZURACAST_STATION_URL,
  LEGACY_AZURACAST_BASE_URL,
  RADIO_OFFICIAL_URL,
  DEFAULT_AZURACAST_STREAM_URL,
  DEFAULT_PUBLIC_RADIO_STREAM,
  LEGACY_PUBLIC_RADIO_STREAM,
  RADIO_CATEGORIES,
  RADIO_ROTATION_CLOCK,
  RADIO_TIMEZONE,
  RADIO_WEEKLY_SCHEDULE,
  getRadioNow,
  type RadioCategoryId,
  type RadioLibraryTrack,
  type RadioStationPayload,
} from "@shared/radio";

const scryptAsync = promisify(scrypt);

// ========== IMAGE OPTIMIZATION UTILITY ==========
// Compresses images before storing as base64 to save database space
async function optimizeImage(filePath: string, maxWidth = 800, quality = 80): Promise<Buffer> {
  try {
    const metadata = await sharp(filePath).metadata();
    let pipeline = sharp(filePath);
    
    // Resize if wider than maxWidth
    if (metadata.width && metadata.width > maxWidth) {
      pipeline = pipeline.resize(maxWidth, undefined, { withoutEnlargement: true });
    }
    
    // Convert to WebP for significantly smaller file sizes
    pipeline = pipeline.webp({ quality });
    
    return await pipeline.toBuffer();
  } catch (err) {
    // Fallback: read file as-is if sharp fails
    console.error("Image optimization failed, using original:", err);
    return fs.readFileSync(filePath);
  }
}

// Optimize avatar images - smaller, more aggressive compression
async function optimizeAvatar(filePath: string): Promise<Buffer> {
  return optimizeImage(filePath, 400, 75);
}

// Optimize post/region images - larger, moderate compression
async function optimizePostImage(filePath: string): Promise<Buffer> {
  return optimizeImage(filePath, 1200, 80);
}

// Configurar multer para subida de avatares
const avatarDir = path.join(process.cwd(), "uploads", "avatars");
if (!fs.existsSync(avatarDir)) {
  fs.mkdirSync(avatarDir, { recursive: true });
}
const avatarStorage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, avatarDir),
  filename: (req, _file, cb) => {
    const ext = path.extname(_file.originalname).toLowerCase() || ".jpg";
    cb(null, `avatar-${req.user?.id ?? "unknown"}-${Date.now()}${ext}`);
  },
});
const avatarUpload = multer({
  storage: avatarStorage,
  ...({ defParamCharset: "utf8" } as object), // nombres con tildes (UTF-8); los tipos de multer aún no lo traen
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Solo se permiten imágenes"));
  },
});

// Configurar multer para firmas de certificados
const signaturesDir = path.join(process.cwd(), "uploads", "signatures");
if (!fs.existsSync(signaturesDir)) {
  fs.mkdirSync(signaturesDir, { recursive: true });
}
const signatureStorage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, signaturesDir),
  filename: (req, _file, cb) => {
    const ext = path.extname(_file.originalname).toLowerCase() || ".png";
    cb(null, `signature-${Date.now()}${ext}`);
  },
});
const signatureUpload = multer({
  storage: signatureStorage,
  ...({ defParamCharset: "utf8" } as object), // nombres con tildes (UTF-8); los tipos de multer aún no lo traen
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Solo se permiten imágenes"));
  },
});

// Configurar multer para imágenes de regiones
const regionImgDir = path.join(process.cwd(), "uploads", "regions");
if (!fs.existsSync(regionImgDir)) {
  fs.mkdirSync(regionImgDir, { recursive: true });
}
const regionStorage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, regionImgDir),
  filename: (req, _file, cb) => {
    const ext = path.extname(_file.originalname).toLowerCase() || ".jpg";
    cb(null, `region-${req.user?.id ?? "unknown"}-${Date.now()}${ext}`);
  },
});
const regionUpload = multer({
  storage: regionStorage,
  ...({ defParamCharset: "utf8" } as object), // nombres con tildes (UTF-8); los tipos de multer aún no lo traen
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Solo se permiten imágenes"));
  },
});

// Configurar multer para archivos de biblioteca (PDF, docs, etc.)
const libraryDir = path.join(process.cwd(), "uploads", "library");
if (!fs.existsSync(libraryDir)) {
  fs.mkdirSync(libraryDir, { recursive: true });
}
const libraryStorage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, libraryDir),
  filename: (req, _file, cb) => {
    const ext = path.extname(_file.originalname).toLowerCase();
    cb(null, `doc-${req.user?.id ?? "unknown"}-${Date.now()}${ext}`);
  },
});
const ALLOWED_LIBRARY_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "text/plain",
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
];
const libraryUpload = multer({
  storage: libraryStorage,
  ...({ defParamCharset: "utf8" } as object), // nombres con tildes (UTF-8); los tipos de multer aún no lo traen
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB max
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_LIBRARY_TYPES.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Tipo de archivo no permitido. Se permiten: PDF, Word, Excel, PowerPoint, texto e imágenes."));
  },
});

const radioUploadRoot = path.join(process.cwd(), "uploads", "radio");
const radioCategoryIds = new Set(RADIO_CATEGORIES.map((category) => category.id));
const allowedRadioExtensions = new Set([".mp3", ".m4a", ".aac", ".wav", ".ogg", ".oga", ".flac"]);
const allowedRadioMimeTypes = new Set([
  "audio/aac",
  "audio/flac",
  "audio/m4a",
  "audio/mp3",
  "audio/mpeg",
  "audio/mp4",
  "audio/ogg",
  "audio/wav",
  "audio/wave",
  "audio/x-m4a",
  "audio/x-wav",
]);

function isRadioCategory(value: string): value is RadioCategoryId {
  return radioCategoryIds.has(value as RadioCategoryId);
}

function getRouteParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] || "" : value || "";
}

function ensureRadioCategoryDir(category: RadioCategoryId) {
  const dir = path.join(radioUploadRoot, category);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function sanitizeAudioFileName(originalName: string) {
  const ext = path.extname(originalName).toLowerCase();
  const base = path.basename(originalName, ext)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);

  return `${Date.now()}-${base || "audio"}${ext}`;
}

function formatTrackTitle(fileName: string) {
  const withoutExt = path.basename(fileName, path.extname(fileName));
  return withoutExt
    .replace(/^\d+-/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function listRadioLibraryTracks(): RadioLibraryTrack[] {
  const tracks: RadioLibraryTrack[] = [];

  for (const category of RADIO_CATEGORIES) {
    const dir = ensureRadioCategoryDir(category.id);
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      if (!entry.isFile()) continue;
      const ext = path.extname(entry.name).toLowerCase();
      if (!allowedRadioExtensions.has(ext)) continue;

      const filePath = path.join(dir, entry.name);
      const stat = fs.statSync(filePath);
      const encodedCategory = encodeURIComponent(category.id);
      const encodedName = encodeURIComponent(entry.name);

      tracks.push({
        id: `${category.id}/${entry.name}`,
        title: formatTrackTitle(entry.name),
        fileName: entry.name,
        category: category.id,
        url: `/uploads/radio/${encodedCategory}/${encodedName}`,
        size: stat.size,
        createdAt: stat.birthtime.toISOString(),
      });
    }
  }

  return tracks.sort((a, b) => {
    const categoryA = RADIO_CATEGORIES.findIndex((category) => category.id === a.category);
    const categoryB = RADIO_CATEGORIES.findIndex((category) => category.id === b.category);
    if (categoryA !== categoryB) return categoryA - categoryB;
    return a.title.localeCompare(b.title, "es");
  });
}

function getRadioTrackPath(category: string, fileName: string) {
  if (!isRadioCategory(category)) return null;
  if (!fileName || path.basename(fileName) !== fileName) return null;
  const fullPath = path.join(ensureRadioCategoryDir(category), fileName);
  const resolvedRoot = path.resolve(radioUploadRoot);
  const resolvedPath = path.resolve(fullPath);
  if (resolvedPath !== resolvedRoot && !resolvedPath.startsWith(`${resolvedRoot}${path.sep}`)) return null;
  return fullPath;
}

const radioAudioUpload = multer({
  storage: multer.diskStorage({
    destination: (req, _file, cb) => {
      const category = getRouteParam(req.params.category);
      if (!isRadioCategory(category)) {
        cb(new Error("Categoría de radio no valida"), "");
        return;
      }
      cb(null, ensureRadioCategoryDir(category));
    },
    filename: (_req, file, cb) => {
      cb(null, sanitizeAudioFileName(file.originalname));
    },
  }),
  limits: {
    fileSize: 250 * 1024 * 1024,
    files: 12,
  },
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedRadioExtensions.has(ext) || allowedRadioMimeTypes.has(file.mimetype)) {
      cb(null, true);
      return;
    }
    cb(new Error("Solo se permiten archivos de audio para radio."));
  },
});

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

function isAdmin(req: Request): boolean {
  return req.isAuthenticated() && (req.user?.role === "admin" || req.user?.role === "director" || req.user?.role === "staff_global");
}

function isTeacherOrAdmin(req: Request): boolean {
  return req.isAuthenticated() && (
    req.user?.role === "admin" || req.user?.role === "obrero" ||
    req.user?.role === "director" || req.user?.role === "staff_global" ||
    req.user?.role === "maestro_ministerio" || req.user?.role === "maestro_iglesia" ||
    req.user?.role === "admin_iglesia"
  );
}

/** Administra un curso: la administración o el maestro a cargo de ESE curso. */
function canManageCourse(req: Request, course: { teacherId: number | null } | undefined | null): boolean {
  if (!course) return false;
  return isAdmin(req) || (isTeacherOrAdmin(req) && course.teacherId === req.user?.id);
}

function isChurchAdmin(req: Request, churchId: number): boolean {
  return req.isAuthenticated() && (
    isAdmin(req) ||
    (req.user?.role === "admin_iglesia" && req.user?.churchId === churchId)
  );
}

function isLegacyZenoUrl(url: string) {
  return url.includes("zeno.fm") || url.includes("zenomedia.com");
}

function normalizeRadioStreamUrl(url: string) {
  const cleanUrl = url.trim();
  if (!cleanUrl || isLegacyZenoUrl(cleanUrl)) return "";
  return cleanUrl;
}

function normalizeRadioStationUrl(url: string) {
  const cleanUrl = url.trim();
  if (!cleanUrl || isLegacyZenoUrl(cleanUrl)) return "";
  return cleanUrl;
}

function defaultLiveStreamConfig() {
  const uploadedTrack = listRadioLibraryTracks()[0]?.url || "";
  const envRadioUrl = normalizeRadioStreamUrl(process.env.RADIO_STREAM_URL || process.env.PUBLIC_RADIO_STREAM_URL || "");
  const radioUrl = envRadioUrl || DEFAULT_AZURACAST_STREAM_URL || uploadedTrack || DEFAULT_PUBLIC_RADIO_STREAM;
  return {
    sourceType: "radio",
    sourceUrl: "",
    radioUrl,
    title: "Avivando el Fuego Radio",
    isLive: false,
  };
}

function isRadioFallbackStream(url: string) {
  return !url || url === DEFAULT_PUBLIC_RADIO_STREAM || url === LEGACY_PUBLIC_RADIO_STREAM || url.startsWith("/uploads/radio/");
}

async function readLiveStreamConfig() {
  const defaults = defaultLiveStreamConfig();

  try {
    const content = await storage.getSiteContent("live_stream_config");
    const parsed = content?.content ? JSON.parse(content.content) : {};
    const config = { ...defaults, ...parsed };
    return { ...config, radioUrl: config.radioUrl || defaults.radioUrl };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`[radio] Using default live stream config: ${message}`);
    return defaults;
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express,
): Promise<Server> {
  // Un identificador mal formado ("undefined", "abc"...) llegaba a la base de datos
  // como NaN y salía un error 500; ahora responde 400 con un mensaje claro.
  for (const name of ["id", "courseId", "postId", "userId", "activityId", "churchId", "enrollmentId", "eventId", "optionId", "sessionId"]) {
    app.param(name, (_req, res, next, value) => {
      if (/^\d+$/.test(String(value))) return next();
      res.status(400).json({ message: "Identificador no válido" });
    });
  }
  // Schema verification is now handled by ensureDatabaseSchema() in index.ts
  // before registerRoutes is called.

  // ========== SEO: Google verification, robots.txt & sitemap.xml ==========
  // La dirección oficial; una SITE_URL de onrender.com se ignora (ver shared/site.ts).
  const SITE_URL = resolveSiteUrl(process.env.SITE_URL);

  app.get("/google2dc20426b22c049c.html", (_req, res) => {
    res.type("text/html").send("google-site-verification: google2dc20426b22c049c.html");
  });

  app.get("/robots.txt", (_req, res) => {
    res.type("text/plain").send(
`User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/
Disallow: /perfil
Disallow: /mensajes
Disallow: /mis-capacitaciones
Disallow: /maestro
Disallow: /aula/
Disallow: /radio-live-scene

Sitemap: ${SITE_URL}/sitemap.xml`
    );
  });

  // Configuración remota de la app de la radio (Google Play y App Store). La app la lee al
  // abrir: si cambia el servidor de la radio, se cambia aquí (shared/radio.ts) y las apps
  // instaladas lo toman sin publicar otra versión. Se lee desde la app (otro origen): CORS.
  app.get("/radio-app/config.json", (_req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Cache-Control", "public, max-age=300");
    res.json({
      // El nombre propio de la radio primero; la dirección técnica de antes, de respaldo.
      servers: [DEFAULT_AZURACAST_BASE_URL, LEGACY_AZURACAST_BASE_URL],
      mountPath: `/listen/${AZURACAST_STATION_SHORTCODE}/radio.mp3`,
      lightMountPath: `/listen/${AZURACAST_STATION_SHORTCODE}/ligero.aac`,
      ministryUrl: SITE_URL,
      // Lo que comparte la app: el enlace de la radio, no el del ministerio.
      shareUrl: RADIO_OFFICIAL_URL,
    });
  });

  app.get("/sitemap.xml", (_req, res) => {
    const pages = [
      { loc: "/", priority: "1.0", changefreq: "weekly" },
      { loc: "/bienvenida", priority: "0.8", changefreq: "monthly" },
      { loc: "/historia", priority: "0.8", changefreq: "monthly" },
      { loc: "/equipo", priority: "0.7", changefreq: "monthly" },
      { loc: "/en-vivo", priority: "0.9", changefreq: "daily" },
      { loc: "/radio", priority: "0.9", changefreq: "daily" },
      { loc: "/eventos", priority: "0.9", changefreq: "weekly" },
      { loc: "/capacitaciones", priority: "0.8", changefreq: "weekly" },
      { loc: "/contacto", priority: "0.7", changefreq: "yearly" },
      { loc: "/comunidad", priority: "0.7", changefreq: "daily" },
      { loc: "/biblioteca", priority: "0.7", changefreq: "weekly" },
      { loc: "/oracion", priority: "0.8", changefreq: "weekly" },
      { loc: "/regiones", priority: "0.6", changefreq: "monthly" },
      { loc: "/privacidad", priority: "0.3", changefreq: "yearly" },
      { loc: "/terminos", priority: "0.3", changefreq: "yearly" },
      { loc: "/login", priority: "0.3", changefreq: "yearly" },
      { loc: "/registro", priority: "0.5", changefreq: "yearly" },
    ];
    const today = new Date().toISOString().split("T")[0];
    const urls = pages.map(p =>
      `  <url>
    <loc>${SITE_URL}${p.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
    ).join("\n");

    res.type("application/xml").send(
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`
    );
  });

  // Health check endpoint (used by Render)
  app.get("/api/hello", (_req, res) => {
    res.json({
      status: "ok",
      message: "Ministerio Avivando el Fuego API is running",
      uptime: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
    });
  });

  // ========== AGENT ECOSYSTEM (Fase 1) ==========
  // Memoria compartida y revisor previo a acciones destructivas.
  // Ver AGENT_MEMORY.md en la raiz del repo para el protocolo completo.
  registerAgentRoutes(app);

  // ========== GLOBAL SEARCH ==========
  app.get("/api/search", async (req, res) => {
    try {
      const q = ((req.query.q as string) || "").trim().toLowerCase();
      if (q.length < 2) return res.json({ results: [] });

      const results: Array<{
        id: number;
        type: string;
        title: string;
        description?: string;
        url: string;
      }> = [];

      // Search courses
      try {
        const courses = await storage.listActiveCourses();
        courses
          .filter(
            (c: any) =>
              c.title?.toLowerCase().includes(q) ||
              c.description?.toLowerCase().includes(q) ||
              c.category?.toLowerCase().includes(q)
          )
          .slice(0, 5)
          .forEach((c: any) =>
            results.push({
              id: c.id,
              type: "course",
              title: c.title,
              description: c.description?.slice(0, 100),
              url: `/capacitaciones/${c.id}`,
            })
          );
      } catch {}

      // Search events
      try {
        const events = await storage.listPublishedEvents();
        events
          .filter(
            (e: any) =>
              e.title?.toLowerCase().includes(q) ||
              e.description?.toLowerCase().includes(q) ||
              e.location?.toLowerCase().includes(q)
          )
          .slice(0, 5)
          .forEach((e: any) =>
            results.push({
              id: e.id,
              type: "event",
              title: e.title,
              description: e.description?.slice(0, 100),
              url: `/eventos`,
            })
          );
      } catch {}

      // Search library resources
      try {
        const resources = await storage.listLibraryResources(undefined as any, q);
        (resources as any[])
          .slice(0, 5)
          .forEach((r: any) =>
            results.push({
              id: r.id,
              type: "library",
              title: r.title,
              description: r.description?.slice(0, 100),
              url: `/biblioteca`,
            })
          );
      } catch {}

      // Search sermons
      try {
        const sermons = await storage.listSermons({ search: q });
        (sermons as any[])
          .slice(0, 5)
          .forEach((s: any) =>
            results.push({
              id: s.id,
              type: "sermon",
              title: s.title,
              description: s.summary?.slice(0, 100) || s.series,
              url: `/sermones`,
            })
          );
      } catch {}

      // Search community posts
      try {
        const posts = await storage.listMemberPosts();
        posts
          .filter(
            (p: any) =>
              p.content?.toLowerCase().includes(q) ||
              p.title?.toLowerCase().includes(q)
          )
          .slice(0, 3)
          .forEach((p: any) =>
            results.push({
              id: p.id,
              type: "post",
              title: p.content?.slice(0, 80) || "Publicacion",
              description: undefined,
              url: `/comunidad`,
            })
          );
      } catch {}

      res.json({ results: results.slice(0, 15) });
    } catch (err) {
      console.error("Global search error:", err);
      res.json({ results: [] });
    }
  });

  // ========== RATE LIMITING ==========
  // En Render el tráfico llega por Cloudflare y su balanceador, y req.ip es la IP
  // del intermediario (cambia de una conexión a otra), no la del miembro: el límite
  // ni frenaba a un abusador ni distinguía a la gente. Cloudflare pone la IP real en
  // CF-Connecting-IP (y la sobrescribe si el cliente la manda); si no llega, se usa
  // req.ip como antes.
  const clientKey = (req: Request) => {
    const cf = req.headers["cf-connecting-ip"];
    return ipKeyGenerator(typeof cf === "string" && isIP(cf) ? cf : req.ip || "");
  };

  // Protect auth endpoints from brute force attacks
  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // 20 intentos fallidos cada 15 min por persona
    // Solo cuentan los fallos: entrar bien (p. ej. muchos miembros a la vez en un
    // culto) no gasta el cupo; probar contraseñas sí.
    skipSuccessfulRequests: true,
    keyGenerator: clientKey,
    message: { message: "Demasiados intentos. Intenta de nuevo en 15 minutos." },
    standardHeaders: true,
    legacyHeaders: false,
  });

  // General API rate limiter
  const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 120, // 120 requests per minute
    keyGenerator: clientKey,
    message: { message: "Demasiadas solicitudes. Intenta de nuevo en un momento." },
    standardHeaders: true,
    legacyHeaders: false,
  });

  // Upload rate limiter (more restrictive)
  const uploadLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 15, // 15 uploads per 5 minutes
    keyGenerator: clientKey,
    message: { message: "Límite de subida alcanzado. Espera unos minutos." },
    standardHeaders: true,
    legacyHeaders: false,
  });

  // Apply general rate limiter to all API routes
  app.use("/api/", apiLimiter as RequestHandler);

  // Archivos subidos (/files/<id>/<nombre>): antes de la sesión, sin cookies.
  registerFileServing(app);


  // Trust proxy (needed for Codespaces, Render, and reverse proxy environments)
  // Set here as well as index.ts to cover all environments
  app.set("trust proxy", 1);

  // ========== SESSION STORE (PostgreSQL-backed) ==========
  // Sessions persist across deploys/restarts - users stay logged in
  const isProduction = process.env.NODE_ENV === "production";
  const hasDatabase = !!process.env.DATABASE_URL;

  let sessionStore: session.Store | session.MemoryStore;
  if (hasDatabase) {
    // Create session table manually (connect-pg-simple's createTableIfMissing
    // tries to read a .sql file that doesn't exist in the esbuild bundle)
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS "user_sessions" (
          "sid" varchar NOT NULL COLLATE "default",
          "sess" json NOT NULL,
          "expire" timestamp(6) NOT NULL,
          CONSTRAINT "user_sessions_pkey" PRIMARY KEY ("sid")
        );
        CREATE INDEX IF NOT EXISTS "IDX_user_sessions_expire" ON "user_sessions" ("expire");
      `);
    } catch (err) {
      console.error("Error creating session table:", err);
    }

    const PgSessionStore = pgSession(session);
    sessionStore = new PgSessionStore({
      pool: pool,
      tableName: "user_sessions",
      createTableIfMissing: false,
      pruneSessionInterval: 60 * 15, // Cleanup expired sessions every 15 min
      ttl: 30 * 24 * 60 * 60, // Sessions last 30 days
    });
  } else {
    const MemStore = MemoryStore(session);
    sessionStore = new MemStore({ checkPeriod: 86400000 });
  }

  // Sin SESSION_SECRET en producción, un secreto conocido ("dev_secret") permitiría
  // falsificar sesiones. Se usa uno aleatorio por proceso: las sesiones se pierden al
  // reiniciar, pero nadie puede fabricarlas.
  if (isProduction && !process.env.SESSION_SECRET) {
    console.error("⚠ SESSION_SECRET no está definido en producción: se usa un secreto aleatorio temporal");
  }
  const sessionSecret = process.env.SESSION_SECRET
    || (isProduction ? randomBytes(32).toString("hex") : "dev_secret");

  const sessionMiddleware = session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    proxy: isProduction, // Trust first proxy in production (Render)
    cookie: {
      secure: isProduction, // true in production (HTTPS via Render proxy), false in dev
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      sameSite: "lax",
    },
  }) as RequestHandler;
  app.use(sessionMiddleware);

  // La versión publicada (Render pone el commit en cada despliegue): el juego avisa cuando hay una nueva.
  const versionPublicada = (process.env.RENDER_GIT_COMMIT || "").slice(0, 12) || `local-${Date.now().toString(36)}`;
  app.get("/api/version", (_req, res) => {
    res.setHeader("Cache-Control", "no-store");
    res.json({ version: versionPublicada });
  });
  // La presencia de la ciudad (WebSocket) lee la misma sesión al conectarse.
  registrarRedCiudad(httpServer, sessionMiddleware);

  app.use(passport.initialize() as RequestHandler);
  app.use(passport.session() as RequestHandler);

  // Archivos (/files/...), subida general y vistas previas de enlaces (después de la
  // sesión: la subida necesita saber quién la hace).
  registerMediaRoutes(app, { uploadLimiter: uploadLimiter as RequestHandler, keyGenerator: clientKey, isAdmin });

  // Debug endpoint to check authentication status (must be AFTER session/passport middleware)
  app.get("/api/auth-status", (req, res) => {
    res.json({
      authenticated: req.isAuthenticated?.() || false,
      hasSession: !!req.session,
      sessionID: req.sessionID?.slice(0, 8) + "...",
      userId: req.user?.id ?? null,
      username: req.user?.username ?? null,
    });
  });

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        let user = null;
        try {
          user = await storage.getUserByUsername(username);
        } catch (dbErr) {
          // Si la BD falla, usar almacenamiento en memoria
          console.log("Database unavailable, using memory storage");
          user = await memoryStorage.getUserByUsername(username);
        }
        
        if (!user || !(await comparePasswords(password, user.password))) {
          return done(null, false, { message: "Usuario o contraseña incorrectos" });
        }
        if (!user.isActive) {
          return done(null, false, { message: "Tu cuenta está pendiente de aprobación por un administrador" });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }),
  );

  passport.serializeUser((user: Express.User, done) => done(null, user.id));
  passport.deserializeUser(async (id: number, done) => {
    try {
      let user: Express.User | null | undefined = null;
      let databaseFailed = false;
      try {
        user = await storage.getUser(id);
      } catch (dbErr) {
        databaseFailed = true;
        console.log("Database unavailable during deserialization, trying memory storage");
      }
      // Respaldo en memoria SOLO si la base de datos falló. Si la base respondió
      // que el usuario no existe (p. ej. se borró), la sesión no debe "convertirse"
      // en el usuario de memoria que tenga el mismo id.
      if (!user && databaseFailed) {
        try {
          user = await memoryStorage.getUser(id) as Express.User | undefined;
        } catch (memErr) {
          console.log("Memory storage also failed during deserialization");
        }
      }
      if (!user) {
        console.log(`deserializeUser: user with id ${id} not found in any storage`);
      }
      done(null, user);
    } catch (err) {
      console.error("deserializeUser error:", err);
      done(err);
    }
  });

  // Administrador inicial: SOLO desde variables de entorno (ADMIN_EMAIL y
  // ADMIN_PASSWORD en Render). Este repositorio es público: nunca escribir
  // credenciales en el código. Si ya existe, no se toca, salvo que
  // ADMIN_RESET=1 pida restablecer su contraseña al valor de ADMIN_PASSWORD.
  (async () => {
    const adminEmail = process.env.ADMIN_EMAIL?.trim();
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminUsername = process.env.ADMIN_USERNAME?.trim() || "servicio-tecnico";
    const resetRequested = process.env.ADMIN_RESET === "1";

    if (!adminEmail || !adminPassword) {
      console.log("ℹ ADMIN_EMAIL/ADMIN_PASSWORD no definidos: no se crea ni se modifica el administrador inicial");
      return;
    }
    if (adminPassword.length < 12) {
      console.error("✗ ADMIN_PASSWORD debe tener al menos 12 caracteres; no se usa");
      return;
    }

    try {
      const hashedPassword = await hashPassword(adminPassword);

      // Respaldo en memoria (solo se usa si la base de datos falla)
      const existingMemory = await memoryStorage.findUserByEmail(adminEmail);
      if (!existingMemory) {
        await memoryStorage.createUser({
          username: adminUsername,
          password: hashedPassword,
          email: adminEmail,
          role: "admin",
          displayName: "Servicio Técnico",
          isActive: true,
        });
      }

      try {
        const existingDB = await storage.getUserByUsername(adminUsername);
        if (!existingDB) {
          await storage.createUser({
            username: adminUsername,
            password: hashedPassword,
            email: adminEmail,
            role: "admin",
            displayName: "Servicio Técnico",
            isActive: true,
          });
          console.log("✓ Administrador inicial creado en PostgreSQL");
        } else if (resetRequested) {
          await storage.updateUser(existingDB.id, { password: hashedPassword });
          if (!existingDB.isActive) await storage.toggleUserActive(existingDB.id);
          console.log("✓ Contraseña del administrador restablecida desde ADMIN_PASSWORD (quita ADMIN_RESET cuando termines)");
        }
      } catch (dbErr) {
        console.log("⚠ No se pudo preparar el admin en PostgreSQL:", (dbErr as Error).message);
      }
    } catch (err) {
      console.error("Error al inicializar admin:", err);
    }
  })();

  // ========== AUTH ===========
  app.post(api.auth.login.path, authLimiter as RequestHandler, (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", (err: Error | null, user: Express.User | false, info: { message?: string }) => {
      if (err) return next(err);
      if (!user) return res.status(401).json({ message: info?.message || "Error al iniciar sesion" });
      req.logIn(user, (err) => {
        if (err) return next(err);
        if (req.body?.remember === false) req.session.cookie.expires = null;
        const { password, ...safeUser } = user;
        res.json(safeUser);
      });
    })(req, res, next);
  });

  app.post(api.auth.register.path, authLimiter as RequestHandler, async (req, res) => {
    try {
      const input = api.auth.register.input.parse(req.body);
      let existing = null;
      try {
        existing = await storage.getUserByUsername(input.username);
      } catch (dbErr) {
        console.log('storage.getUserByUsername failed, using memoryStorage fallback');
        existing = await memoryStorage.getUserByUsername(input.username);
      }

      if (existing) {
        return res.status(400).json({ message: "Este nombre de usuario ya está en uso" });
      }

      const hashedPassword = await hashPassword(input.password);

      let allUsers: Array<{ id: number }> = [];
      try {
        allUsers = await storage.listUsers();
      } catch (dbErr) {
        console.log('storage.listUsers failed, using memoryStorage fallback');
        allUsers = await memoryStorage.listUsers();
      }

      const isFirstUser = allUsers.length === 0;
      const validRoles = ["miembro", "usuario", "obrero"];
      const role = isFirstUser ? "admin" : (validRoles.includes(input.role || "") ? input.role! : "miembro");
      
      // Guardar en PostgreSQL (persistente)
      let user: Express.User;
      // Generate email verification token
      const verifyToken = randomBytes(32).toString("hex");
      const verifyExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

      try {
        user = await storage.createUser({
          ...input,
          password: hashedPassword,
          role,
          isActive: isFirstUser,
          emailVerified: isFirstUser, // First user (admin) auto-verified
          emailVerifyToken: isFirstUser ? null : verifyToken,
          emailVerifyExpires: isFirstUser ? null : verifyExpires,
        });
      } catch (dbErr) {
        console.log('storage.createUser failed, using memoryStorage fallback');
        user = await memoryStorage.createUser({
          ...input,
          password: hashedPassword,
          role,
          isActive: isFirstUser,
        });
      }

      // Send verification email (non-blocking, won't crash server)
      if (!isFirstUser && input.email) {
        if (isEmailConfigured) {
          console.log(`[register] Sending verification email to ${input.email}`);
          sendVerificationEmail(input.email, verifyToken, input.displayName);
        } else {
          console.warn(`[register] RESEND_API_KEY not configured — skipping verification email for ${input.email}`);
        }
      } else if (!isFirstUser && !input.email) {
        console.warn(`[register] User ${input.username} registered without email — cannot send verification`);
      }

      req.logIn(user, (err) => {
        if (err) throw err;
        const { password: _, ...safeUser } = user;
        res.status(201).json({ ...safeUser, pending: !isFirstUser });
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.issues[0].message });
      }
      console.error("Registration error:", err);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  });

  app.post(api.auth.logout.path, (req, res) => {
    req.logout(() => { res.sendStatus(200); });
  });

  app.get(api.auth.me.path, (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "No autenticado" });
    const { password, ...safeUser } = req.user!;
    res.json(safeUser);
  });

  // "Eliminar mi cuenta" (Perfil): pide la contraseña y borra los datos personales
  // (ver server/account-deletion.ts). La administración no se borra desde aquí: otro
  // administrador debe quitarle el rol antes, para no dejar el ministerio sin acceso.
  app.post("/api/account/delete", authLimiter as RequestHandler, async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "No autenticado" });
    const me = req.user!;
    const password = typeof req.body?.password === "string" ? req.body.password : "";
    if (req.body?.confirm !== "ELIMINAR") {
      return res.status(400).json({ message: "Escribe ELIMINAR para confirmar." });
    }
    if (["admin", "director", "staff_global"].includes(me.role)) {
      return res.status(403).json({ message: "Una cuenta de administración no se puede eliminar desde aquí. Pide a otro administrador que te quite el rol primero." });
    }
    try {
      const fila = await storage.getUser(me.id);
      if (!fila || !password || !(await comparePasswords(password, fila.password))) {
        return res.status(400).json({ message: "La contraseña no es correcta." });
      }
      await eliminarCuentaPropia(me.id, await hashPassword(randomBytes(32).toString("hex")));
      req.logout(() => {
        req.session?.destroy(() => res.json({ ok: true }));
      });
    } catch (err) {
      console.error("[cuenta] No se pudo eliminar la cuenta", me.id, err);
      res.status(500).json({ message: "No se pudo eliminar la cuenta. Intenta de nuevo o escríbenos desde Contacto." });
    }
  });

  // ========== FORGOT PASSWORD ==========
  app.post("/api/forgot-password", authLimiter as RequestHandler, async (req, res) => {
    try {
      const { email } = req.body;
      if (!email || typeof email !== "string") {
        return res.status(400).json({ message: "Email requerido" });
      }

      // Always return success (don't reveal if email exists)
      const successMsg = { message: "Si el correo existe, recibiras instrucciones para restablecer tu contraseña" };

      let user = null;
      try {
        user = await storage.getUserByEmail(email.trim());
      } catch {
        // DB not available — silently fail
        return res.json(successMsg);
      }

      if (!user || !user.email) return res.json(successMsg);

      // Generate secure token
      const token = randomBytes(32).toString("hex");
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

      try {
        await storage.createPasswordResetToken(user.id, token, expiresAt);
      } catch {
        return res.json(successMsg);
      }

      // Send email (non-blocking, won't crash server)
      sendPasswordResetEmail(user.email, token, user.displayName);

      res.json(successMsg);
    } catch (err) {
      console.error("Forgot password error:", err);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  });

  app.post("/api/reset-password", authLimiter as RequestHandler, async (req, res) => {
    try {
      const { token, newPassword } = req.body;
      if (!token || !newPassword || typeof newPassword !== "string") {
        return res.status(400).json({ message: "Token y nueva contraseña requeridos" });
      }
      if (newPassword.length < 6) {
        return res.status(400).json({ message: "La contraseña debe tener al menos 6 caracteres" });
      }

      const resetToken = await storage.getPasswordResetToken(token);
      if (!resetToken) {
        return res.status(400).json({ message: "Enlace inválido o expirado" });
      }
      if (resetToken.usedAt) {
        return res.status(400).json({ message: "Este enlace ya fue utilizado" });
      }
      if (resetToken.expiresAt < new Date()) {
        return res.status(400).json({ message: "El enlace ha expirado. Solicita uno nuevo." });
      }

      const hashedPassword = await hashPassword(newPassword);
      await storage.updateUser(resetToken.userId, { password: hashedPassword });
      await storage.markPasswordResetTokenUsed(token);

      res.json({ message: "Contraseña restablecida exitosamente" });
    } catch (err) {
      console.error("Reset password error:", err);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  });

  // ========== EMAIL VERIFICATION ==========
  app.post("/api/verify-email", async (req, res) => {
    try {
      const { token } = req.body;
      if (!token || typeof token !== "string") {
        return res.status(400).json({ message: "Token requerido" });
      }

      const user = await storage.getUserByVerifyToken(token);
      if (!user) {
        return res.status(400).json({ message: "Enlace de verificación inválido" });
      }
      if (user.emailVerified) {
        return res.json({ message: "El correo ya fue verificado", alreadyVerified: true });
      }
      if (user.emailVerifyExpires && user.emailVerifyExpires < new Date()) {
        return res.status(400).json({ message: "El enlace ha expirado. Solicita uno nuevo." });
      }

      await storage.updateUser(user.id, {
        emailVerified: true,
        emailVerifyToken: null,
        emailVerifyExpires: null,
      });

      // Send welcome email (non-blocking)
      if (user.email) {
        sendWelcomeEmail(user.email, user.displayName);
      }

      res.json({ message: "Correo verificado exitosamente!" });
    } catch (err) {
      console.error("Verify email error:", err);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  });

  app.post("/api/resend-verification", authLimiter as RequestHandler, async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) return res.status(400).json({ message: "Email requerido" });

      const user = await storage.getUserByEmail(email.trim());
      if (!user || user.emailVerified) {
        // Don't reveal user existence
        return res.json({ message: "Si el correo existe y no está verificado, recibiras un nuevo enlace" });
      }

      const token = randomBytes(32).toString("hex");
      const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h
      await storage.updateUser(user.id, {
        emailVerifyToken: token,
        emailVerifyExpires: expires,
      });

      if (user.email) {
        sendVerificationEmail(user.email, token, user.displayName);
      }

      res.json({ message: "Si el correo existe y no está verificado, recibiras un nuevo enlace" });
    } catch (err) {
      console.error("Resend verification error:", err);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  });

  // ========== EMAIL STATUS (admin) ==========
  app.get("/api/email-status", (req, res) => {
    if (!req.isAuthenticated() || req.user?.role !== "admin") {
      return res.status(403).json({ message: "Solo administradores" });
    }
    const { getEmailStatus } = require("./email");
    res.json(getEmailStatus());
  });

  // Resend verification for currently logged-in user
  app.post("/api/resend-my-verification", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "No autenticado" });
    const user = req.user!;
    if (user.emailVerified) {
      return res.json({ message: "Tu correo ya está verificado" });
    }
    if (!user.email) {
      return res.status(400).json({ message: "No tienes correo registrado en tu perfil" });
    }
    if (!isEmailConfigured) {
      return res.status(503).json({ message: "El servicio de correo no está configurado. Contacta al administrador." });
    }
    try {
      const token = randomBytes(32).toString("hex");
      const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
      await storage.updateUser(user.id, {
        emailVerifyToken: token,
        emailVerifyExpires: expires,
      });
      sendVerificationEmail(user.email, token, user.displayName);
      res.json({ message: "Correo de verificación enviado! Revisa tu bandeja de entrada y spam." });
    } catch (err) {
      console.error("Resend my verification error:", err);
      res.status(500).json({ message: "Error al enviar correo de verificación" });
    }
  });

  // ========== EMAIL NOTIFICATION PREFERENCES ==========
  app.get("/api/email-preferences", (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "No autenticado" });
    const user = req.user!;
    res.json({
      emailNotifyAccountApproved: user.emailNotifyAccountApproved ?? true,
      emailNotifyDirectMessage: user.emailNotifyDirectMessage ?? true,
      emailNotifyNewCourse: user.emailNotifyNewCourse ?? true,
      emailNotifyEventReminder: user.emailNotifyEventReminder ?? true,
    });
  });

  app.patch("/api/email-preferences", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "No autenticado" });
    const { emailNotifyAccountApproved, emailNotifyDirectMessage, emailNotifyNewCourse, emailNotifyEventReminder } = req.body;
    try {
      const updates: Record<string, boolean> = {};
      if (typeof emailNotifyAccountApproved === "boolean") updates.emailNotifyAccountApproved = emailNotifyAccountApproved;
      if (typeof emailNotifyDirectMessage === "boolean") updates.emailNotifyDirectMessage = emailNotifyDirectMessage;
      if (typeof emailNotifyNewCourse === "boolean") updates.emailNotifyNewCourse = emailNotifyNewCourse;
      if (typeof emailNotifyEventReminder === "boolean") updates.emailNotifyEventReminder = emailNotifyEventReminder;
      
      const updatedUser = await storage.updateUser(req.user!.id, updates as any);
      // Update session user
      Object.assign(req.user!, updates);
      res.json({
        emailNotifyAccountApproved: updatedUser.emailNotifyAccountApproved,
        emailNotifyDirectMessage: updatedUser.emailNotifyDirectMessage,
        emailNotifyNewCourse: updatedUser.emailNotifyNewCourse,
        emailNotifyEventReminder: updatedUser.emailNotifyEventReminder,
      });
    } catch (err) {
      console.error("Update email preferences error:", err);
      res.status(500).json({ message: "Error al actualizar preferencias" });
    }
  });

  // ========== PUSH NOTIFICATIONS ==========
  app.get("/api/push/vapid-key", (_req, res) => {
    res.json({ key: getVapidPublicKey(), configured: isPushConfigured });
  });

  app.post("/api/push/subscribe", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    try {
      const { endpoint, keys } = req.body;
      if (!endpoint || !keys?.p256dh || !keys?.auth) {
        return res.status(400).json({ message: "Subscription data inválida" });
      }
      await storage.createPushSubscription(req.user!.id, endpoint, keys.p256dh, keys.auth);
      res.json({ message: "Subscripcion guardada" });
    } catch (err) {
      console.error("Push subscribe error:", err);
      res.status(500).json({ message: "Error al guardar subscripcion" });
    }
  });

  app.post("/api/push/unsubscribe", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    try {
      const { endpoint } = req.body;
      if (!endpoint) return res.status(400).json({ message: "Endpoint requerido" });
      await storage.deletePushSubscription(endpoint);
      res.json({ message: "Subscripcion eliminada" });
    } catch (err) {
      console.error("Push unsubscribe error:", err);
      res.status(500).json({ message: "Error al eliminar subscripcion" });
    }
  });

  // Admin: send test push notification
  app.post("/api/admin/push/send", async (req, res) => {
    if (!isAdmin(req)) return res.sendStatus(403);
    try {
      const { title, body, url } = req.body;
      if (!title || !body) return res.status(400).json({ message: "Título y mensaje requeridos" });

      const allSubs = await storage.getAllPushSubscriptions();
      const payload: PushPayload = {
        title,
        body,
        url: url || "/",
        icon: "/icons/icon-192x192.png",
      };

      const subs = allSubs.map(s => ({
        id: s.id,
        subscription: { endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } },
      }));

      // Non-blocking: send in background, clean up expired
      (async () => {
        try {
          const expiredIds = await sendPushToMany(subs, payload);
          if (expiredIds.length > 0) {
            await storage.deletePushSubscriptionsByIds(expiredIds);
            console.log(`[push] Cleaned ${expiredIds.length} expired subscriptions`);
          }
        } catch (e) {
          console.error("[push] Background send error:", e);
        }
      })();

      res.json({ message: `Enviando a ${allSubs.length} dispositivos`, count: allSubs.length });
    } catch (err) {
      console.error("Push send error:", err);
      res.status(500).json({ message: "Error al enviar notificación" });
    }
  });

  // ========== AVATAR UPLOAD ==========
  app.post("/api/upload/avatar", uploadLimiter as RequestHandler, avatarUpload.single("avatar") as RequestHandler, async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (!req.file) return res.status(400).json({ message: "No se envío ninguna imagen" });
    try {
      const userId = req.user!.id;
      // Optimize image (resize + compress to WebP) then upload
      const optimized = await optimizeAvatar(req.file.path);
      const result = await uploadFile({
        folder: "avatars",
        filename: `avatar-${userId}.webp`,
        buffer: optimized,
        contentType: "image/webp",
        ownerId: userId,
      });
      await storage.updateUser(userId, { avatarUrl: result.url });
      // Delete temp file
      try { fs.unlinkSync(req.file.path); } catch (_) {}
      res.json({ avatarUrl: result.url });
    } catch (err) {
      console.error("Avatar upload error:", err);
      res.status(500).json({ message: "Error al subir imagen" });
    }
  });

  // ========== REGION IMAGE UPLOAD ==========
  app.post("/api/upload/region-image", uploadLimiter as RequestHandler, regionUpload.single("image") as RequestHandler, async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (!req.file) return res.status(400).json({ message: "No se envío ninguna imagen" });
    try {
      // Optimize image then upload to storage
      const optimized = await optimizePostImage(req.file.path);
      const result = await uploadFile({
        folder: "regions",
        filename: `region-${Date.now()}.webp`,
        buffer: optimized,
        contentType: "image/webp",
      });
      try { fs.unlinkSync(req.file.path); } catch (_) {}
      res.json({ imageUrl: result.url });
    } catch (err) {
      console.error("Region image upload error:", err);
      res.status(500).json({ message: "Error al subir imagen" });
    }
  });

  // ========== LIBRARY FILE UPLOAD ==========
  // Documentos del Aula, la Biblioteca, la Cartelera y los anuncios: pasa por la subida
  // general (PDF, Word, Excel, PowerPoint, texto, imágenes, audio y video; ver media-routes).
  app.post("/api/upload/library-file", uploadLimiter as RequestHandler, (req: Request, res: Response) => handleFileUpload(req, res, "file"));

  // ========== CHANGE PASSWORD ==========
  app.post("/api/users/change-password", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    try {
      const { currentPassword, newPassword } = req.body;
      if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: "Ambas contraseñas son requeridas" });
      }
      if (newPassword.length < 6) {
        return res.status(400).json({ message: "La nueva contraseña debe tener al menos 6 caracteres" });
      }
      const userId = req.user!.id;
      const user = await storage.getUser(userId);
      if (!user) return res.sendStatus(404);
      const isValid = await comparePasswords(currentPassword, user.password);
      if (!isValid) {
        return res.status(400).json({ message: "La contraseña actual es incorrecta" });
      }
      const hashedNew = await hashPassword(newPassword);
      await storage.updateUser(userId, { password: hashedNew });
      res.json({ message: "Contraseña actualizada exitosamente" });
    } catch (err) {
      console.error("Change password error:", err);
      res.status(500).json({ message: "Error al cambiar contraseña" });
    }
  });

  // ========== FRIENDS SYSTEM ==========
  app.get("/api/friends", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const userId = req.user!.id;
    const friends = await storage.listFriends(userId);
    res.json(friends);
  });

  app.get("/api/friends/requests", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const userId = req.user!.id;
    const requests = await storage.listFriendRequests(userId);
    res.json(requests);
  });

  app.get("/api/friends/search", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const userId = req.user!.id;
    const q = (req.query.q as string) || "";
    const users = await storage.searchUsersForFriends(userId, q);
    res.json(users);
  });

  app.post("/api/friends/request", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const userId = req.user!.id;
    const { addresseeId } = req.body;
    if (!addresseeId || addresseeId === userId) {
      return res.status(400).json({ message: "ID de usuario inválido" });
    }
    try {
      const friendship = await storage.sendFriendRequest(userId, addresseeId);
      res.status(201).json(friendship);
    } catch (err: any) {
      res.status(400).json({ message: err.message || "Error al enviar solicitud" });
    }
  });

  app.patch("/api/friends/:id/accept", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const userId = req.user!.id;
    const friendshipId = parseInt(req.params.id);
    try {
      const result = await storage.acceptFriendRequest(friendshipId, userId);
      res.json(result);
    } catch (err: any) {
      res.status(400).json({ message: err.message || "Error al aceptar solicitud" });
    }
  });

  app.patch("/api/friends/:id/reject", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const userId = req.user!.id;
    const friendshipId = parseInt(req.params.id);
    try {
      const result = await storage.rejectFriendRequest(friendshipId, userId);
      res.json(result);
    } catch (err: any) {
      res.status(400).json({ message: err.message || "Error al rechazar solicitud" });
    }
  });

  app.delete("/api/friends/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const userId = req.user!.id;
    const friendshipId = parseInt(req.params.id);
    try {
      await storage.removeFriend(friendshipId, userId);
      res.json({ success: true });
    } catch (err: any) {
      res.status(400).json({ message: err.message || "Error al eliminar amigo" });
    }
  });

  // ========== USER PROFILE ==========
  app.get(api.users.get.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const id = parseInt(req.params.id);
    const user = await storage.getUser(id);
    if (!user) return res.sendStatus(404);
    const { password, emailVerifyToken, emailVerifyExpires, ...safeUser } = user;
    if (req.user!.id === id || isAdmin(req)) return res.json(safeUser);
    // A los demás miembros, solo el perfil público: sin correo, teléfono ni avisos.
    const { email, phone, emailVerified, emailNotifyAccountApproved, emailNotifyDirectMessage,
      emailNotifyNewCourse, emailNotifyEventReminder, ...publicProfile } = safeUser;
    res.json(publicProfile);
  });

  app.patch(api.users.update.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const id = parseInt(req.params.id);
    if (id !== req.user!.id && !isAdmin(req)) {
      return res.sendStatus(403);
    }
    try {
      const updates = api.users.update.input.parse(req.body);
      const user = await storage.updateUser(id, updates);
      res.json(user);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.issues[0].message });
      res.sendStatus(500);
    }
  });

  // ========== CONTACT ==========
  app.post(api.contact.send.path, async (req, res) => {
    try {
      const input = api.contact.send.input.parse(req.body);
      await storage.createMessage(input);
      res.json({ success: true });
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.issues[0].message });
      res.sendStatus(500);
    }
  });

  // ========== MEMBER POSTS ==========
  app.get(api.posts.list.path, async (req, res) => {
    // Public read access — anyone can view community posts
    const posts = await storage.listMemberPosts();
    res.json(posts);
  });

  app.post(api.posts.create.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (!req.user!.isActive) return res.sendStatus(403);
    try {
      const input = api.posts.create.input.parse(req.body);
      const content = (input.content ?? "").trim();
      // El adjunto solo puede ser un archivo subido a esta web (o a su almacenamiento).
      const fileUrl = isOwnFileUrl(input.fileUrl) ? input.fileUrl! : null;
      if (!content && !input.imageUrl && !fileUrl) {
        return res.status(400).json({ message: "Escribe algo o agrega una foto o un archivo para publicar" });
      }
      if (content.length > 5000) {
        return res.status(400).json({ message: "La publicación es demasiado larga (máximo 5000 caracteres)" });
      }
      const post = await storage.createMemberPost(req.user!.id, content, input.imageUrl, fileUrl ? {
        fileUrl,
        fileName: (input.fileName || "").slice(0, 200) || null,
        fileSize: typeof input.fileSize === "number" && input.fileSize >= 0 ? Math.round(input.fileSize) : null,
        fileMime: (input.fileMime || "").slice(0, 120) || null,
      } : undefined);
      res.status(201).json(post);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.issues[0].message });
      res.sendStatus(500);
    }
  });

  app.delete(api.posts.delete.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const postId = parseInt(req.params.id);
    const post = await storage.getMemberPost(postId);
    if (!post) return res.sendStatus(404);
    // Allow owner or admin to delete
    if (post.userId !== req.user!.id && !isAdmin(req)) {
      return res.sendStatus(403);
    }
    await storage.deleteMemberPost(postId);
    res.sendStatus(200);
  });

  // ========== EVENTS ==========
  app.get(api.events.list.path, async (req, res) => {
    if (isAdmin(req)) {
      res.json(await storage.listEvents());
    } else {
      res.json(await storage.listPublishedEvents());
    }
  });

  app.get(api.events.get.path, async (req, res) => {
    const event = await storage.getEvent(parseInt(req.params.id));
    if (!event) return res.sendStatus(404);
    if (!event.isPublished && !isAdmin(req)) return res.sendStatus(404);
    res.json(event);
  });

  app.post(api.events.create.path, async (req, res) => {
    if (!req.isAuthenticated() || !req.user) {
      console.log("Event create: user not authenticated. Session:", req.sessionID, "User:", req.user, "Authenticated:", req.isAuthenticated?.());
      return res.status(401).json({ message: "Debes iniciar sesión para crear eventos. Si ya iniciaste sesión, intenta cerrar sesión y volver a entrar." });
    }
    // Una cuenta sin aprobar no publica en el calendario público (ni dispara avisos a todos).
    if (!req.user.isActive) {
      return res.status(403).json({ message: "Tu cuenta aún no está aprobada. Cuando la aprueben podrás publicar eventos." });
    }
    try {
      const input = api.events.create.input.parse(req.body);
      // Ensure eventDate is a valid date string
      const eventDateParsed = new Date(input.eventDate);
      if (isNaN(eventDateParsed.getTime())) {
        return res.status(400).json({ message: "La fecha del evento no es valida" });
      }
      const event = await storage.createEvent({ ...input, createdBy: req.user!.id });
      
      // Push notification for new event (non-blocking)
      if (isPushConfigured) {
        (async () => {
          try {
            const allSubs = await storage.getAllPushSubscriptions();
            const payload: PushPayload = { title: "Nuevo Evento", body: event.title, url: "/eventos", icon: "/icons/icon-192x192.png" };
            const subs = allSubs.map(s => ({ id: s.id, subscription: { endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } } }));
            const expired = await sendPushToMany(subs, payload);
            if (expired.length > 0) await storage.deletePushSubscriptionsByIds(expired);
          } catch (e) { console.error("[push] Event push error:", e); }
        })();
      }
      
      res.status(201).json(event);
    } catch (err: any) {
      console.error("Error creating event:", err);
      if (err instanceof z.ZodError) return res.status(400).json({ message: "Datos invalidos: " + err.issues.map((e: any) => e.message).join(", ") });
      res.status(500).json({ message: err?.message || "Error interno al crear el evento. Intenta de nuevo." });
    }
  });

  app.patch(api.events.update.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Debes iniciar sesión" });
    const eventId = parseInt(req.params.id);
    if (isNaN(eventId)) return res.status(400).json({ message: "ID de evento inválido" });
    const event = await storage.getEvent(eventId);
    if (!event) return res.status(404).json({ message: "Evento no encontrado" });
    if (!isAdmin(req) && event.createdBy !== req.user!.id) return res.status(403).json({ message: "No tienes permiso para editar este evento" });
    try {
      const input = api.events.update.input.parse(req.body);
      const updated = await storage.updateEvent(eventId, input);
      if (!updated) return res.status(404).json({ message: "Evento no encontrado" });
      res.json(updated);
    } catch (err: any) {
      console.error("Error updating event:", err);
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.issues.map((e: any) => e.message).join(", ") });
      res.status(500).json({ message: err?.message || "Error al actualizar evento" });
    }
  });

  app.delete(api.events.delete.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Debes iniciar sesión" });
    const eventId = parseInt(req.params.id);
    if (isNaN(eventId)) return res.status(400).json({ message: "ID inválido" });
    const event = await storage.getEvent(eventId);
    if (!event) return res.status(404).json({ message: "Evento no encontrado" });
    if (!isAdmin(req) && event.createdBy !== req.user!.id) return res.status(403).json({ message: "No tienes permiso" });
    try {
      await storage.deleteEvent(eventId);
      res.json({ success: true });
    } catch (err: any) {
      console.error("Error deleting event:", err);
      res.status(500).json({ message: err?.message || "Error al eliminar evento" });
    }
  });

  // ========== EVENT RSVPS ==========
  app.get(api.eventRsvps.list.path, async (req, res) => {
    const eventId = parseInt(req.params.eventId);
    const rsvps = await storage.listEventRsvps(eventId);
    const count = await storage.getEventRsvpCount(eventId);
    res.json({ rsvps, count });
  });

  app.get(api.eventRsvps.myRsvp.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.json(null);
    const eventId = parseInt(req.params.eventId);
    const rsvp = await storage.getEventRsvp(eventId, req.user!.id);
    res.json(rsvp || null);
  });

  app.post(api.eventRsvps.upsert.path, async (req, res) => {
    if (!req.isAuthenticated()) {
      console.log("RSVP: user not authenticated. Session:", req.sessionID, "User:", req.user);
      return res.status(401).json({ message: "Debes iniciar sesión para confirmar asistencia" });
    }
    try {
      const eventId = parseInt(req.params.eventId);
      if (isNaN(eventId)) return res.status(400).json({ message: "ID de evento inválido" });
      const event = await storage.getEvent(eventId);
      if (!event) return res.status(404).json({ message: "Evento no encontrado" });
      // Use the URL eventId, override the body eventId to ensure consistency
      const input = api.eventRsvps.upsert.input.parse({ ...req.body, eventId });
      const rsvp = await storage.upsertEventRsvp(eventId, req.user!.id, input);
      
      // Create reminder notification for the user (non-blocking)
      if (input.status !== "no_asistire") {
        try {
          const eventDate = new Date(event.eventDate as string | Date);
          const formattedDate = eventDate.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" });
          const formattedTime = eventDate.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
          await storage.createNotification({
            userId: req.user!.id,
            type: "evento_recordatorio",
            title: `Recordatorio: ${event.title}`,
            content: `Te has confirmado para "${event.title}" el ${formattedDate} a las ${formattedTime}. Ubicacion: ${event.location}${event.meetingUrl ? '. Enlace: ' + event.meetingUrl : ''}`,
            link: "/eventos",
          });
          
          // Email reminder for event RSVP (non-blocking)
          if (isEmailConfigured && req.user!.email && req.user!.emailNotifyEventReminder !== false) {
            sendEventReminderEmail(
              req.user!.email,
              event.title,
              `${formattedDate} a las ${formattedTime}`,
              req.user!.displayName
            );
          }
        } catch (notifErr) {
          console.error("Error creating RSVP notification (non-blocking):", notifErr);
        }
      }
      
      res.json(rsvp);
    } catch (err) {
      console.error("Error in RSVP upsert:", err);
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.issues[0].message });
      res.status(500).json({ message: "Error interno al confirmar asistencia" });
    }
  });

  app.delete(api.eventRsvps.cancel.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Debes iniciar sesión" });
    const eventId = parseInt(req.params.eventId);
    if (isNaN(eventId)) return res.status(400).json({ message: "ID inválido" });
    try {
      await storage.cancelEventRsvp(eventId, req.user!.id);
      res.json({ success: true });
    } catch (err: any) {
      console.error("Error canceling RSVP:", err);
      res.status(500).json({ message: err?.message || "Error al cancelar confirmacion" });
    }
  });

  // ========== SITE CONTENT ==========
  app.get(api.siteContent.list.path, async (_req, res) => {
    res.json(await storage.listSiteContent());
  });

  app.get(api.siteContent.get.path, async (req, res) => {
    const content = await storage.getSiteContent(req.params.key);
    res.json(content || { sectionKey: req.params.key, title: null, content: null });
  });

  app.patch(api.siteContent.update.path, async (req, res) => {
    if (!isAdmin(req)) return res.sendStatus(403);
    try {
      const input = api.siteContent.update.input.parse(req.body);
      const content = await storage.upsertSiteContent(req.params.key, input, req.user!.id);
      res.json(content);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.issues[0].message });
      res.sendStatus(500);
    }
  });

  // ========== COURSES ==========
  app.get(api.courses.list.path, async (req, res) => {
    const { search, category, teacher } = req.query;
    let courseList;
    if (search || category) {
      courseList = await storage.searchCourses(search as string || "", category as string);
    } else if (teacher && req.isAuthenticated()) {
      courseList = await storage.listCoursesByTeacher(parseInt(teacher as string));
    } else if (isAdmin(req)) {
      courseList = await storage.listCourses();
    } else {
      courseList = await storage.listActiveCourses();
    }
    const counts = await storage.getEnrollmentCounts();
    // Enrich with teacher info
    const teacherIds = Array.from(new Set(courseList.map(c => c.teacherId).filter(Boolean))) as number[];
    const teacherMap: Record<number, { displayName: string | null; username: string; avatarUrl: string | null }> = {};
    for (const tid of teacherIds) {
      const t = await storage.getUser(tid);
      if (t) teacherMap[tid] = { displayName: t.displayName, username: t.username, avatarUrl: t.avatarUrl };
    }
    res.json(courseList.map(c => ({
      ...c,
      enrolledCount: counts[c.id]?.approved || 0,
      pendingCount: counts[c.id]?.pending || 0,
      teacher: c.teacherId && teacherMap[c.teacherId] ? teacherMap[c.teacherId] : null,
    })));
  });

  app.get(api.courses.get.path, async (req, res) => {
    const course = await storage.getCourse(parseInt(req.params.id));
    if (!course) return res.sendStatus(404);
    if (!course.isActive && !isAdmin(req) && !(isTeacherOrAdmin(req) && course.teacherId === req.user?.id)) {
      return res.sendStatus(404);
    }
    const counts = await storage.getEnrollmentCounts();
    const teacher = course.teacherId ? await storage.getUser(course.teacherId) : null;
    res.json({
      ...course,
      enrolledCount: counts[course.id]?.approved || 0,
      pendingCount: counts[course.id]?.pending || 0,
      teacher: teacher ? { displayName: teacher.displayName, username: teacher.username, avatarUrl: teacher.avatarUrl, bio: teacher.bio } : null,
    });
  });

  app.post(api.courses.create.path, async (req, res) => {
    if (!isTeacherOrAdmin(req)) return res.sendStatus(403);
    try {
      const input = api.courses.create.input.parse(req.body);
      const course = await storage.createCourse({ ...input, createdBy: req.user!.id });
      await storage.createNotificationForAll({
        type: "curso",
        title: "Nuevo Curso Disponible",
        content: `Se abrio el curso: ${course.title}`,
        link: `/capacitaciones/${course.id}`,
      });
      
      // Push notification for new course (non-blocking)
      if (isPushConfigured) {
        (async () => {
          try {
            const allSubs = await storage.getAllPushSubscriptions();
            const payload: PushPayload = { title: "Nuevo Curso Disponible", body: course.title, url: `/capacitaciones/${course.id}`, icon: "/icons/icon-192x192.png" };
            const subs = allSubs.map(s => ({ id: s.id, subscription: { endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } } }));
            const expired = await sendPushToMany(subs, payload);
            if (expired.length > 0) await storage.deletePushSubscriptionsByIds(expired);
          } catch (e) { console.error("[push] Course push error:", e); }
        })();
      }
      
      // Email notification for new course (non-blocking, batched)
      if (isEmailConfigured) {
        try {
          const allUsers = await storage.listUsers();
          const recipients = allUsers.filter(u => 
            u.email && u.isActive && u.emailNotifyNewCourse !== false && u.id !== req.user!.id
          );
          // Queue all — rate-limited queue (1/sec) prevents API saturation
          for (const recipient of recipients) {
            sendNewCourseEmail(recipient.email!, course.title, course.id, recipient.displayName);
          }
          if (recipients.length > 0) {
            console.log(`[email] Queued new course notification for ${recipients.length} users (rate-limited 1/sec)`);
          }
        } catch (emailErr) {
          console.error("[email] New course notification error (non-blocking):", emailErr);
        }
      }
      
      res.status(201).json(course);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.issues[0].message });
      res.sendStatus(500);
    }
  });

  app.patch(api.courses.update.path, async (req, res) => {
    const id = parseInt(req.params.id);
    const course = await storage.getCourse(id);
    if (!course) return res.sendStatus(404);
    if (!isAdmin(req) && !(isTeacherOrAdmin(req) && course.teacherId === req.user?.id)) {
      return res.sendStatus(403);
    }
    try {
      const input = api.courses.update.input.parse(req.body);
      const updated = await storage.updateCourse(id, input);
      res.json(updated);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.issues[0].message });
      res.sendStatus(500);
    }
  });

  app.delete(api.courses.delete.path, async (req, res) => {
    if (!isAdmin(req)) return res.sendStatus(403);
    await storage.deleteCourse(parseInt(req.params.id));
    res.sendStatus(200);
  });

  // ========== COURSE MATERIALS ==========
  // Materiales, anuncios y enlaces de clase son para quien está dentro del curso:
  // la administración, su maestro o un alumno con la inscripción aprobada.
  async function canAccessCourseContent(req: Request, courseId: number): Promise<boolean> {
    if (!req.isAuthenticated()) return false;
    if (isAdmin(req)) return true;
    const course = await storage.getCourse(courseId);
    if (!course) return false;
    if (course.teacherId === req.user!.id) return true;
    const enrollment = await storage.getEnrollmentByUserAndCourse(req.user!.id, courseId);
    return !!enrollment && (enrollment.status === "aprobado" || enrollment.status === "completado");
  }

  // Cambiar o borrar algo de un curso (sesión, material, anuncio, horario) es solo para la
  // administración o el maestro de ese curso. Antes bastaba con ser maestro de cualquier curso.
  async function courseChildAccess(req: Request, kind: CourseChildKind, id: number): Promise<200 | 403 | 404> {
    const courseId = await storage.getOwningCourseId(kind, id);
    if (!courseId) return 404;
    return canManageCourse(req, await storage.getCourse(courseId)) ? 200 : 403;
  }

  app.get(api.courseMaterials.list.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const courseId = parseInt(req.params.courseId);
    if (!(await canAccessCourseContent(req, courseId))) {
      return res.status(403).json({ message: "Inscríbete en el curso para ver sus materiales" });
    }
    const materials = await storage.listCourseMaterials(courseId);
    res.json(materials);
  });

  app.post(api.courseMaterials.list.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const courseId = parseInt(req.params.courseId);
    const course = await storage.getCourse(courseId);
    if (!course) return res.sendStatus(404);
    if (!isAdmin(req) && !(isTeacherOrAdmin(req) && course.teacherId === req.user?.id)) {
      return res.sendStatus(403);
    }
    try {
      const input = api.courseMaterials.create.input.parse({ ...req.body, courseId });
      const material = await storage.createCourseMaterial(input);
      res.status(201).json(material);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.issues[0].message });
      res.sendStatus(500);
    }
  });

  app.patch(api.courseMaterials.update.path, async (req, res) => {
    if (!isTeacherOrAdmin(req)) return res.sendStatus(403);
    const access = await courseChildAccess(req, "material", parseInt(req.params.id));
    if (access !== 200) return res.sendStatus(access);
    try {
      const input = api.courseMaterials.update.input.parse(req.body);
      const material = await storage.updateCourseMaterial(parseInt(req.params.id), input);
      if (!material) return res.sendStatus(404);
      res.json(material);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.issues[0].message });
      res.sendStatus(500);
    }
  });

  app.delete(api.courseMaterials.delete.path, async (req, res) => {
    if (!isTeacherOrAdmin(req)) return res.sendStatus(403);
    const access = await courseChildAccess(req, "material", parseInt(req.params.id));
    if (access !== 200) return res.sendStatus(access);
    await storage.deleteCourseMaterial(parseInt(req.params.id));
    res.sendStatus(200);
  });

  // ========== SALA EN VIVO (LIVE CLASSROOM) ==========
  // Get live classroom status for a course
  app.get(api.liveClassroom.get.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const courseId = parseInt(req.params.courseId);
    const content = await storage.getSiteContent(`live_classroom_${courseId}`);
    const defaultState = { isLive: false, roomName: "", startedBy: null, startedByName: "", startedAt: null, title: "" };
    try {
      const state = content?.content ? JSON.parse(content.content) : defaultState;
      res.json(state);
    } catch {
      res.json(defaultState);
    }
  });

  // Start a live classroom for a course (teacher/admin only)
  app.post(api.liveClassroom.start.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const courseId = parseInt(req.params.courseId);
    const course = await storage.getCourse(courseId);
    if (!course) return res.sendStatus(404);
    if (!isAdmin(req) && !(isTeacherOrAdmin(req) && course.teacherId === req.user?.id)) {
      return res.sendStatus(403);
    }
    const { title } = req.body || {};
    // Generate a unique, URL-safe room name
    const sanitized = (course.title || "clase").replace(/[^a-zA-Z0-9]/g, "-").replace(/-+/g, "-").slice(0, 30).toLowerCase();
    const roomName = `smartedu-${sanitized}-${courseId}-${Date.now()}`;
    const userName = req.user?.displayName || req.user?.username || "Maestro";
    const state = {
      isLive: true,
      roomName,
      startedBy: req.user!.id,
      startedByName: userName,
      startedAt: new Date().toISOString(),
      title: title || `Clase en Vivo - ${course.title}`,
    };
    await storage.upsertSiteContent(`live_classroom_${courseId}`, { content: JSON.stringify(state) }, req.user!.id);
    // Create monitoring session
    try {
      await storage.createLiveEventSession({
        context: "classroom",
        contextId: String(courseId),
        title: state.title,
        roomName,
        startedBy: req.user!.id,
      });
    } catch (err) { console.error("Error creating live classroom session tracking:", err); }
    // Notify enrolled students
    const enrollments = await storage.listEnrollmentsByCourse(courseId);
    const enrolledUserIds = enrollments
      .filter((e: any) => e.status === "aprobado" || e.status === "completado")
      .map((e: any) => e.user?.id || e.userId)
      .filter((id: number) => id !== req.user!.id);
    for (const userId of enrolledUserIds) {
      await storage.createNotification({
        userId,
        type: "clase_en_vivo",
        title: "Clase en Vivo Iniciada",
        content: `${userName} ha iniciado una clase en vivo: ${state.title}`,
        link: `/aula/${courseId}`,
      });
    }
    res.json(state);
  });

  // Stop a live classroom for a course (teacher/admin only)
  app.post(api.liveClassroom.stop.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const courseId = parseInt(req.params.courseId);
    const course = await storage.getCourse(courseId);
    if (!course) return res.sendStatus(404);
    if (!isAdmin(req) && !(isTeacherOrAdmin(req) && course.teacherId === req.user?.id)) {
      return res.sendStatus(403);
    }
    // End monitoring session
    try {
      const activeSession = await storage.getActiveLiveSession("classroom", String(courseId));
      if (activeSession) {
        await storage.endLiveEventSession(activeSession.id);
      }
    } catch (err) { console.error("Error ending live classroom session tracking:", err); }
    const state = { isLive: false, roomName: "", startedBy: null, startedByName: "", startedAt: null, title: "" };
    await storage.upsertSiteContent(`live_classroom_${courseId}`, { content: JSON.stringify(state) }, req.user!.id);
    res.json(state);
  });

  // ========== SALAS EN VIVO GENERICAS (Oracion, Eventos, En Vivo) ==========
  const validLiveRoomContexts = ["prayer", "event", "live"];

  // Get live room state
  app.get(api.liveRoom.get.path, async (req, res) => {
    const { context, contextId } = req.params;
    if (!validLiveRoomContexts.includes(context)) return res.sendStatus(400);
    const key = `live_room_${context}_${contextId}`;
    const content = await storage.getSiteContent(key);
    const defaultState = { isLive: false, roomName: "", startedBy: null, startedByName: "", startedAt: null, title: "" };
    try {
      const state = content?.content ? JSON.parse(content.content) : defaultState;
      res.json(state);
    } catch {
      res.json(defaultState);
    }
  });

  // Start a live room (admin/teacher only)
  app.post(api.liveRoom.start.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (!isTeacherOrAdmin(req)) return res.sendStatus(403);
    const { context, contextId } = req.params;
    if (!validLiveRoomContexts.includes(context)) return res.sendStatus(400);
    const { title } = req.body || {};
    const contextLabels: Record<string, string> = { prayer: "oracion", event: "evento", live: "envivo" };
    const sanitized = (title || contextLabels[context] || "sala").replace(/[^a-zA-Z0-9]/g, "-").replace(/-+/g, "-").slice(0, 30).toLowerCase();
    const roomName = `smartedu-${contextLabels[context]}-${sanitized}-${contextId}-${Date.now()}`;
    const userName = req.user?.displayName || req.user?.username || "Admin";
    const state = {
      isLive: true,
      roomName,
      startedBy: req.user!.id,
      startedByName: userName,
      startedAt: new Date().toISOString(),
      title: title || `Sala en Vivo`,
    };
    const key = `live_room_${context}_${contextId}`;
    await storage.upsertSiteContent(key, { content: JSON.stringify(state) }, req.user!.id);
    // Create monitoring session
    try {
      await storage.createLiveEventSession({
        context,
        contextId,
        title: state.title,
        roomName,
        startedBy: req.user!.id,
      });
    } catch (err) { console.error("Error creating live session tracking:", err); }
    // Send notification to all users
    const notifLabels: Record<string, string> = { prayer: "Oracion", event: "Evento", live: "Transmision" };
    const linkMap: Record<string, string> = { prayer: "/oracion", event: "/eventos", live: "/en-vivo" };
    await storage.createNotificationForAll({
      type: "sala_en_vivo",
      title: `Sala en Vivo - ${notifLabels[context] || ""}`,
      content: `${userName} ha iniciado una sala en vivo: ${state.title}`,
      link: linkMap[context] || "/en-vivo",
    });
    res.json(state);
  });

  // Stop a live room (admin/teacher only or same user who started)
  app.post(api.liveRoom.stop.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const { context, contextId } = req.params;
    if (!validLiveRoomContexts.includes(context)) return res.sendStatus(400);
    const key = `live_room_${context}_${contextId}`;
    // Check permissions: admin, teacher, or the user who started it
    const content = await storage.getSiteContent(key);
    if (content?.content) {
      try {
        const current = JSON.parse(content.content);
        if (!isAdmin(req) && !isTeacherOrAdmin(req) && current.startedBy !== req.user?.id) {
          return res.sendStatus(403);
        }
      } catch {}
    }
    // End monitoring session
    try {
      const activeSession = await storage.getActiveLiveSession(context, contextId);
      if (activeSession) {
        await storage.endLiveEventSession(activeSession.id);
      }
    } catch (err) { console.error("Error ending live session tracking:", err); }
    const state = { isLive: false, roomName: "", startedBy: null, startedByName: "", startedAt: null, title: "" };
    await storage.upsertSiteContent(key, { content: JSON.stringify(state) }, req.user!.id);
    res.json(state);
  });

  // Track user joining a live room
  app.post(api.liveRoom.join.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const { context, contextId } = req.params;
    if (!validLiveRoomContexts.includes(context)) return res.sendStatus(400);
    try {
      const activeSession = await storage.getActiveLiveSession(context, contextId);
      if (activeSession) {
        await storage.trackLiveEventJoin(activeSession.id, req.user!.id);
      }
      res.json({ ok: true });
    } catch (err) {
      console.error("Error tracking live join:", err);
      res.json({ ok: true }); // Don't block user from joining
    }
  });

  // Track user leaving a live room
  app.post(api.liveRoom.leave.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const { context, contextId } = req.params;
    if (!validLiveRoomContexts.includes(context)) return res.sendStatus(400);
    try {
      const activeSession = await storage.getActiveLiveSession(context, contextId);
      if (activeSession) {
        await storage.trackLiveEventLeave(activeSession.id, req.user!.id);
      }
      res.json({ ok: true });
    } catch (err) {
      console.error("Error tracking live leave:", err);
      res.json({ ok: true });
    }
  });

  // ========== COURSE SESSIONS ==========
  app.get(api.courseSessions.list.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const courseId = parseInt(req.params.courseId);
    const sessions = await storage.listCourseSessions(courseId);
    // La vista previa del curso enseña títulos y fechas; el enlace de la reunión
    // solo a quien está dentro (evita que extraños entren a la clase).
    if (await canAccessCourseContent(req, courseId)) return res.json(sessions);
    res.json(sessions.map((s) => ({ ...s, meetingUrl: null })));
  });

  app.post(api.courseSessions.list.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const courseId = parseInt(req.params.courseId);
    const course = await storage.getCourse(courseId);
    if (!course) return res.sendStatus(404);
    if (!isAdmin(req) && !(isTeacherOrAdmin(req) && course.teacherId === req.user?.id)) {
      return res.sendStatus(403);
    }
    try {
      const input = api.courseSessions.create.input.parse({ ...req.body, courseId });
      const s = await storage.createCourseSession(input);
      res.status(201).json(s);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.issues[0].message });
      res.sendStatus(500);
    }
  });

  app.patch(api.courseSessions.update.path, async (req, res) => {
    if (!isTeacherOrAdmin(req)) return res.sendStatus(403);
    const access = await courseChildAccess(req, "session", parseInt(req.params.id));
    if (access !== 200) return res.sendStatus(access);
    try {
      const input = api.courseSessions.update.input.parse(req.body);
      const s = await storage.updateCourseSession(parseInt(req.params.id), input);
      if (!s) return res.sendStatus(404);
      res.json(s);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.issues[0].message });
      res.sendStatus(500);
    }
  });

  app.delete(api.courseSessions.delete.path, async (req, res) => {
    if (!isTeacherOrAdmin(req)) return res.sendStatus(403);
    const access = await courseChildAccess(req, "session", parseInt(req.params.id));
    if (access !== 200) return res.sendStatus(access);
    await storage.deleteCourseSession(parseInt(req.params.id));
    res.sendStatus(200);
  });

  // ========== ENROLLMENTS ==========
  app.get(api.enrollments.list.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const myEnrollments = await storage.listEnrollmentsByUser(req.user!.id);
    res.json(myEnrollments);
  });

  app.get(api.enrollments.listByCourse.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const courseId = parseInt(req.params.courseId);
    const course = await storage.getCourse(courseId);
    if (!course) return res.sendStatus(404);
    if (!isAdmin(req) && !(isTeacherOrAdmin(req) && course.teacherId === req.user?.id)) {
      return res.sendStatus(403);
    }
    const enrollmentsList = await storage.listEnrollmentsByCourse(courseId);
    res.json(enrollmentsList);
  });

  app.post(api.enrollments.create.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (!req.user!.isActive) return res.sendStatus(403);
    try {
      const input = api.enrollments.create.input.parse(req.body);
      // Check if enrollment is open
      const course = await storage.getCourse(input.courseId);
      if (!course) return res.status(404).json({ message: "Curso no encontrado" });
      if (course.enrollmentStatus === "closed") {
        return res.status(400).json({ message: "Las inscripciones para este curso estan cerradas" });
      }
      if (course.enrollmentStatus === "scheduled") {
        return res.status(400).json({ message: "Las inscripciones para este curso aún no estan abiertas" });
      }
      const existing = await storage.getEnrollmentByUserAndCourse(req.user!.id, input.courseId);
      if (existing) {
        return res.status(400).json({ message: "Ya tienes una inscripción en este curso" });
      }
      const enrollment = await storage.createEnrollment(req.user!.id, input.courseId);
      res.status(201).json(enrollment);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.issues[0].message });
      res.sendStatus(500);
    }
  });

  app.patch(api.enrollments.update.path, async (req, res) => {
    if (!isTeacherOrAdmin(req)) return res.sendStatus(403);
    // Solo el maestro de ESE curso (o la administración) cambia estado, nota u observaciones.
    const current = await storage.getEnrollment(parseInt(req.params.id));
    if (!current) return res.sendStatus(404);
    if (!canManageCourse(req, await storage.getCourse(current.courseId))) return res.sendStatus(403);
    try {
      const input = api.enrollments.update.input.parse(req.body);
      const enrollment = await storage.updateEnrollment(parseInt(req.params.id), input);
      if (!enrollment) return res.sendStatus(404);

      // Auto-generate certificate when marking as "completado"
      let generatedCert = null;
      if (input.status === "completado") {
        try {
          const existingCert = await storage.getCertificateByEnrollment(enrollment.id);
          if (!existingCert) {
            const course = await storage.getCourse(enrollment.courseId);
            const teacher = course?.teacherId ? await storage.getUser(course.teacherId) : null;
            const code = `CERT-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
            generatedCert = await storage.createCertificate(
              enrollment.userId, enrollment.courseId, enrollment.id, code,
              teacher?.displayName || teacher?.username || undefined,
              enrollment.grade || undefined
            );
            console.log(`✓ Certificate generated for enrollment ${enrollment.id}: ${code}`);
          } else {
            generatedCert = existingCert;
            console.log(`Certificate already exists for enrollment ${enrollment.id}`);
          }
        } catch (certErr: any) {
          console.error("✗ Auto-certificate generation failed:", certErr?.message || certErr);
        }
      }

      res.json({ ...enrollment, certificate: generatedCert });
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.issues[0].message });
      res.sendStatus(500);
    }
  });

  app.delete(api.enrollments.delete.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const id = parseInt(req.params.id);
    const enrollment = await storage.getEnrollment(id);
    if (!enrollment) return res.sendStatus(404);
    if (enrollment.userId !== req.user!.id && !isAdmin(req)) {
      return res.sendStatus(403);
    }
    await storage.deleteEnrollment(id);
    res.sendStatus(200);
  });

  // ========== TEACHER REQUESTS ==========
  app.get(api.teacherRequests.list.path, async (req, res) => {
    if (!isAdmin(req)) return res.sendStatus(403);
    const requests = await storage.listTeacherRequests();
    res.json(requests);
  });

  app.get(api.teacherRequests.myRequests.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const requests = await storage.listTeacherRequestsByUser(req.user!.id);
    res.json(requests);
  });

  app.post(api.teacherRequests.create.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (!req.user!.isActive) return res.sendStatus(403);
    const userRole = req.user!.role;
    if (userRole !== "obrero" && userRole !== "admin") {
      return res.status(403).json({ message: "Solo obreros pueden solicitar ensenar un curso" });
    }
    try {
      const input = api.teacherRequests.create.input.parse(req.body);
      const existing = await storage.getTeacherRequestByUserAndCourse(req.user!.id, input.courseId);
      if (existing) {
        return res.status(400).json({ message: "Ya tienes una solicitud para este curso" });
      }
      const course = await storage.getCourse(input.courseId);
      if (!course) return res.sendStatus(404);
      if (course.teacherId === req.user!.id) {
        return res.status(400).json({ message: "Ya eres el maestro de este curso" });
      }
      const request = await storage.createTeacherRequest(req.user!.id, input.courseId, input.message);
      res.status(201).json(request);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.issues[0].message });
      res.sendStatus(500);
    }
  });

  app.patch(api.teacherRequests.update.path, async (req, res) => {
    if (!isAdmin(req)) return res.sendStatus(403);
    try {
      const input = api.teacherRequests.update.input.parse(req.body);
      const id = parseInt(req.params.id);
      const request = await storage.updateTeacherRequest(id, input);
      if (!request) return res.sendStatus(404);
      if (input.status === "aprobado") {
        await storage.updateCourse(request.courseId, { teacherId: request.userId });
      }
      res.json(request);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.issues[0].message });
      res.sendStatus(500);
    }
  });

  app.delete(api.teacherRequests.delete.path, async (req, res) => {
    if (!isAdmin(req)) return res.sendStatus(403);
    await storage.deleteTeacherRequest(parseInt(req.params.id));
    res.sendStatus(200);
  });

  // ========== COURSE ANNOUNCEMENTS ==========
  app.get(api.courseAnnouncements.list.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const courseId = parseInt(req.params.courseId);
    if (!(await canAccessCourseContent(req, courseId))) {
      return res.status(403).json({ message: "Inscríbete en el curso para ver sus anuncios" });
    }
    const announcements = await storage.listCourseAnnouncements(courseId);
    res.json(announcements);
  });

  app.post(api.courseAnnouncements.list.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const courseId = parseInt(req.params.courseId);
    const course = await storage.getCourse(courseId);
    if (!course) return res.sendStatus(404);
    if (!isAdmin(req) && !(isTeacherOrAdmin(req) && course.teacherId === req.user?.id)) {
      return res.sendStatus(403);
    }
    try {
      const input = api.courseAnnouncements.create.input.parse({ ...req.body, courseId });
      const announcement = await storage.createCourseAnnouncement({ ...input, authorId: req.user!.id });
      res.status(201).json(announcement);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.issues[0].message });
      res.sendStatus(500);
    }
  });

  app.patch(api.courseAnnouncements.update.path, async (req, res) => {
    if (!isTeacherOrAdmin(req)) return res.sendStatus(403);
    const access = await courseChildAccess(req, "announcement", parseInt(req.params.id));
    if (access !== 200) return res.sendStatus(access);
    try {
      const input = api.courseAnnouncements.update.input.parse(req.body);
      const announcement = await storage.updateCourseAnnouncement(parseInt(req.params.id), input);
      if (!announcement) return res.sendStatus(404);
      res.json(announcement);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.issues[0].message });
      res.sendStatus(500);
    }
  });

  app.delete(api.courseAnnouncements.delete.path, async (req, res) => {
    if (!isTeacherOrAdmin(req)) return res.sendStatus(403);
    const access = await courseChildAccess(req, "announcement", parseInt(req.params.id));
    if (access !== 200) return res.sendStatus(access);
    await storage.deleteCourseAnnouncement(parseInt(req.params.id));
    res.sendStatus(200);
  });

  // ========== COURSE SCHEDULE ==========
  app.get(api.courseScheduleEntries.list.path, async (req, res) => {
    const courseId = parseInt(req.params.courseId);
    const schedule = await storage.listCourseSchedule(courseId);
    res.json(schedule);
  });

  app.post(api.courseScheduleEntries.list.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const courseId = parseInt(req.params.courseId);
    const course = await storage.getCourse(courseId);
    if (!course) return res.sendStatus(404);
    if (!isAdmin(req) && !(isTeacherOrAdmin(req) && course.teacherId === req.user?.id)) {
      return res.sendStatus(403);
    }
    try {
      const input = api.courseScheduleEntries.create.input.parse({ ...req.body, courseId });
      const entry = await storage.createCourseScheduleEntry(input);
      res.status(201).json(entry);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.issues[0].message });
      res.sendStatus(500);
    }
  });

  app.patch(api.courseScheduleEntries.update.path, async (req, res) => {
    if (!isTeacherOrAdmin(req)) return res.sendStatus(403);
    const access = await courseChildAccess(req, "schedule", parseInt(req.params.id));
    if (access !== 200) return res.sendStatus(access);
    try {
      const input = api.courseScheduleEntries.update.input.parse(req.body);
      const entry = await storage.updateCourseScheduleEntry(parseInt(req.params.id), input);
      if (!entry) return res.sendStatus(404);
      res.json(entry);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.issues[0].message });
      res.sendStatus(500);
    }
  });

  app.delete(api.courseScheduleEntries.delete.path, async (req, res) => {
    if (!isTeacherOrAdmin(req)) return res.sendStatus(403);
    const access = await courseChildAccess(req, "schedule", parseInt(req.params.id));
    if (access !== 200) return res.sendStatus(access);
    await storage.deleteCourseScheduleEntry(parseInt(req.params.id));
    res.sendStatus(200);
  });

  // ========== SESSION ATTENDANCE ==========
  // Pasar asistencia: solo la administración o el maestro del curso de esa sesión, y solo a
  // personas inscritas en ese curso (antes cualquier maestro marcaba en cualquier sesión).
  async function attendanceContext(req: Request, sessionId: number) {
    const session = await storage.getCourseSession(sessionId);
    if (!session) return { status: 404 as const };
    const course = await storage.getCourse(session.courseId);
    if (!course || !canManageCourse(req, course)) return { status: 403 as const };
    return { status: 200 as const, session, course };
  }

  async function enrolledUserIds(courseId: number): Promise<Set<number>> {
    const roster = await storage.listEnrollmentsByCourse(courseId);
    return new Set(roster.filter((e) => e.status !== "rechazado").map((e) => e.userId));
  }

  app.get(api.sessionAttendance.list.path, async (req, res) => {
    if (!isTeacherOrAdmin(req)) return res.sendStatus(403);
    const sessionId = parseInt(req.params.sessionId);
    const ctx = await attendanceContext(req, sessionId);
    if (ctx.status !== 200) return res.sendStatus(ctx.status);
    const attendance = await storage.listSessionAttendance(sessionId);
    res.json(attendance);
  });

  app.post(api.sessionAttendance.list.path, async (req, res) => {
    if (!isTeacherOrAdmin(req)) return res.sendStatus(403);
    try {
      const sessionId = parseInt(req.params.sessionId);
      const input = api.sessionAttendance.upsert.input.parse({ ...req.body, sessionId });
      const ctx = await attendanceContext(req, sessionId);
      if (ctx.status !== 200) return res.sendStatus(ctx.status);
      if (!(await enrolledUserIds(ctx.course.id)).has(input.userId)) {
        return res.status(400).json({ message: "Esa persona no está inscrita en el curso" });
      }
      const attendance = await storage.upsertSessionAttendance(input);
      res.json(attendance);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.issues[0].message });
      res.sendStatus(500);
    }
  });

  // Toda la lista de una vez (botón "Guardar asistencia"). status null borra la marca.
  app.post(api.sessionAttendance.bulk.path, async (req, res) => {
    if (!isTeacherOrAdmin(req)) return res.sendStatus(403);
    try {
      const sessionId = parseInt(req.params.sessionId);
      const input = api.sessionAttendance.bulk.input.parse(req.body);
      const ctx = await attendanceContext(req, sessionId);
      if (ctx.status !== 200) return res.sendStatus(ctx.status);
      const enrolled = await enrolledUserIds(ctx.course.id);
      for (const record of input.records) {
        if (!enrolled.has(record.userId)) continue;
        if (record.status === null) await storage.deleteSessionAttendance(sessionId, record.userId);
        else await storage.upsertSessionAttendance({ sessionId, userId: record.userId, status: record.status });
      }
      res.json(await storage.listSessionAttendance(sessionId));
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.issues[0].message });
      console.error("Bulk attendance error:", err);
      res.sendStatus(500);
    }
  });

  // ========== PLANILLAS DEL CURSO ==========
  // Inscritos, asistencia, notas, seguimiento y hoja de firmas salen de esta sola consulta.
  app.get(api.coursePlanillas.get.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const courseId = parseInt(req.params.courseId);
    const course = await storage.getCourse(courseId);
    if (!course) return res.sendStatus(404);
    if (!canManageCourse(req, course)) return res.sendStatus(403);
    try {
      const [roster, sessions, schedule, attendance, teacher] = await Promise.all([
        storage.listCourseRoster(courseId),
        storage.listCourseSessions(courseId),
        storage.listCourseSchedule(courseId),
        storage.listCourseAttendance(courseId),
        course.teacherId ? storage.getUser(course.teacherId) : Promise.resolve(undefined),
      ]);
      res.setHeader("Cache-Control", "no-store");
      res.json({
        course: {
          id: course.id,
          title: course.title,
          description: course.description,
          category: course.category,
          level: course.level,
          maxStudents: course.maxStudents,
          enrollmentStatus: course.enrollmentStatus,
          isActive: course.isActive,
          createdAt: course.createdAt,
          gradeItems: course.gradeItems || [],
        },
        teacher: teacher ? { id: teacher.id, name: teacher.displayName || teacher.username } : null,
        schedule: schedule.filter((s) => s.isActive).map((s) => ({
          dayOfWeek: s.dayOfWeek,
          startTime: s.startTime,
          endTime: s.endTime,
          specificDate: s.specificDate,
          description: s.description,
        })),
        sessions: sessions.map((s) => ({
          id: s.id,
          title: s.title,
          sessionDate: s.sessionDate,
          duration: s.duration,
          isCompleted: s.isCompleted,
        })),
        students: roster.map((r) => ({
          enrollmentId: r.enrollmentId,
          userId: r.userId,
          name: r.displayName || r.username,
          username: r.username,
          email: r.email,
          phone: r.phone,
          country: r.country,
          cargo: r.cargo,
          church: r.churchName,
          memberType: r.memberType,
          status: r.status,
          grade: r.grade,
          scores: r.scores || {},
          observations: r.observations,
          enrolledAt: r.enrolledAt,
          completedAt: r.completedAt,
        })),
        attendance,
        generatedAt: new Date().toISOString(),
      });
    } catch (err) {
      console.error("Planillas error:", err);
      res.sendStatus(500);
    }
  });

  // Planilla de notas: guarda las evaluaciones del curso y las notas de cada alumno.
  app.put(api.coursePlanillas.saveGrades.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const courseId = parseInt(req.params.courseId);
    const course = await storage.getCourse(courseId);
    if (!course) return res.sendStatus(404);
    if (!canManageCourse(req, course)) return res.sendStatus(403);
    try {
      const input = api.coursePlanillas.saveGrades.input.parse(req.body);
      const items = input.items ?? course.gradeItems ?? [];
      if (new Set(items.map((i) => i.key)).size !== items.length) {
        return res.status(400).json({ message: "Dos evaluaciones tienen la misma clave" });
      }
      if (input.items) await storage.updateCourseGradeItems(courseId, input.items);
      const allowedKeys = new Set(items.map((i) => i.key));
      const enrollmentIds = new Set((await storage.listEnrollmentsByCourse(courseId)).map((e) => e.id));
      let saved = 0;
      for (const row of input.rows ?? []) {
        if (!enrollmentIds.has(row.enrollmentId)) continue;
        const patch: { scores?: Record<string, string>; grade?: string | null; observations?: string | null } = {};
        if (row.scores) {
          const scores: Record<string, string> = {};
          for (const [key, value] of Object.entries(row.scores)) {
            const clean = value.trim();
            if (allowedKeys.has(key) && clean) scores[key] = clean;
          }
          patch.scores = scores;
        }
        if (row.grade !== undefined) patch.grade = row.grade?.trim() || null;
        if (row.observations !== undefined) patch.observations = row.observations?.trim() || null;
        if (Object.keys(patch).length) {
          await storage.updateEnrollmentGrades(row.enrollmentId, patch);
          saved++;
        }
      }
      res.json({ ok: true, saved });
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.issues[0].message });
      console.error("Save grades error:", err);
      res.sendStatus(500);
    }
  });

  // ========== ADMIN ==========
  app.get(api.admin.listUsers.path, async (req, res) => {
    if (!isAdmin(req)) return res.sendStatus(403);
    res.json(await storage.listUsers());
  });

  app.patch(api.admin.toggleActive.path, async (req, res) => {
    if (!isAdmin(req)) return res.sendStatus(403);
    const user = await storage.toggleUserActive(parseInt(req.params.id));
    if (!user) return res.sendStatus(404);
    
    // Send email when account is ACTIVATED (not deactivated)
    if (user.isActive && user.email && isEmailConfigured && user.emailNotifyAccountApproved !== false) {
      sendAccountApprovedEmail(user.email, user.displayName);
    }
    
    res.json(user);
  });

  app.patch(api.admin.updateRole.path, async (req, res) => {
    if (!isAdmin(req)) return res.sendStatus(403);
    const id = parseInt(req.params.id);
    const { role } = req.body;
    const validRoles = ["director", "staff_global", "admin_iglesia", "maestro_ministerio", "maestro_iglesia", "miembro", "usuario", "admin", "obrero"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: "Rol inválido" });
    }
    const user = await storage.updateUserRole(id, role);
    if (!user) return res.sendStatus(404);
    res.json(user);
  });

  app.patch(api.admin.updateUserInfo.path, async (req, res) => {
    if (!isAdmin(req)) return res.sendStatus(403);
    const id = parseInt(req.params.id);
    const { cargo, country } = req.body;
    const user = await storage.updateUserInfo(id, cargo || null, country || null);
    if (!user) return res.sendStatus(404);
    res.json(user);
  });

  app.get(api.admin.getUserDetail.path, async (req, res) => {
    if (!isAdmin(req)) return res.sendStatus(403);
    const id = parseInt(req.params.id);
    const user = await storage.getUser(id);
    if (!user) return res.sendStatus(404);
    const { password, ...safeUser } = user;
    const userEnrollments = await storage.listEnrollmentsByUser(id);
    const userPosts = await storage.listPostsByUser(id);
    const enrichedEnrollments = await Promise.all(
      userEnrollments.map(async (e: any) => {
        const course = await storage.getCourse(e.courseId);
        return { ...e, courseName: course?.title || "Curso desconocido" };
      })
    );
    const attendanceRecords = await storage.listAttendanceByUser(id);
    const userCertificates = await storage.listCertificatesByUser(id);
    res.json({ user: safeUser, enrollments: enrichedEnrollments, posts: userPosts, attendance: attendanceRecords, certificates: userCertificates });
  });

  app.delete(api.admin.deleteUser.path, async (req, res) => {
    if (!isAdmin(req)) return res.sendStatus(403);
    const id = parseInt(req.params.id);
    if (id === req.user!.id) {
      return res.status(400).json({ message: "No puedes eliminarte a ti mismo" });
    }
    try {
      await storage.deleteUser(id);
      res.sendStatus(200);
    } catch (err: any) {
      // Otra tabla aún apunta a la cuenta (notas, planes, cursos, diezmos…): borrarla
      // exige decidir qué pasa con esos datos. Se explica en vez de mostrar el SQL.
      const code = err?.cause?.code ?? err?.code;
      if (code === "23503") {
        return res.status(409).json({
          message: "No se puede eliminar: esta cuenta tiene actividad en la web (notas, planes, publicaciones, cursos…). Desactívala en su lugar.",
        });
      }
      console.error("[admin] no se pudo eliminar el usuario:", err);
      res.status(500).json({ message: "No se pudo eliminar el usuario" });
    }
  });

  app.get(api.admin.getWhatsappLink.path, async (req, res) => {
    const content = await storage.getSiteContent("whatsapp_group_link");
    res.json({ link: content?.content || "" });
  });

  app.patch(api.admin.updateWhatsappLink.path, async (req, res) => {
    if (!isAdmin(req)) return res.sendStatus(403);
    const { link } = req.body;
    await storage.upsertSiteContent("whatsapp_group_link", { content: link || "" }, req.user!.id);
    res.json({ link: link || "" });
  });

  app.get(api.admin.getLiveStream.path, async (_req, res) => {
    res.json(await readLiveStreamConfig());
  });

  app.get(api.radio.station.path, async (_req, res) => {
    const liveConfig = await readLiveStreamConfig();
    const libraryTracks = listRadioLibraryTracks();
    const firstUploadedTrack = libraryTracks[0]?.url || "";
    const envStream = normalizeRadioStreamUrl(process.env.RADIO_STREAM_URL || process.env.PUBLIC_RADIO_STREAM_URL || "");
    const configuredStream = envStream || DEFAULT_AZURACAST_STREAM_URL;
    const stationUrl = normalizeRadioStationUrl(process.env.RADIO_STATION_URL || "") || DEFAULT_AZURACAST_STATION_URL;
    const metadataUrl = process.env.RADIO_METADATA_URL || DEFAULT_AZURACAST_METADATA_URL;
    // Las variantes ligera y HLS solo existen en el AzuraCast propio; si el stream
    // principal apunta a otro sitio, se configuran aparte o no se ofrecen.
    const usesOwnAzuraCast = configuredStream === DEFAULT_AZURACAST_STREAM_URL;
    const station: RadioStationPayload = {
      name: "Avivando el Fuego Radio",
      slogan: "Avivando el fuego del Espíritu Santo 24/7",
      timezone: process.env.RADIO_TIMEZONE || RADIO_TIMEZONE,
      streamUrl: configuredStream || firstUploadedTrack || DEFAULT_PUBLIC_RADIO_STREAM,
      lightStreamUrl: process.env.RADIO_LIGHT_STREAM_URL || (usesOwnAzuraCast ? DEFAULT_AZURACAST_LIGHT_STREAM_URL : null),
      hlsUrl: process.env.RADIO_HLS_URL || (usesOwnAzuraCast ? DEFAULT_AZURACAST_HLS_URL : null),
      metadataUrl,
      isConfigured: Boolean(configuredStream || firstUploadedTrack),
      updatedAt: new Date().toISOString(),
      provider: {
        name: "AzuraCast",
        stationUrl,
        streamUrl: configuredStream,
        metadataUrl,
        isPrimary:
          configuredStream.startsWith(DEFAULT_AZURACAST_BASE_URL) ||
          configuredStream.includes("sslip.io") ||
          configuredStream.includes("/listen/") ||
          configuredStream.includes("azuracast"),
      },
      library: {
        tracks: libraryTracks,
        trackCount: libraryTracks.length,
        hasUploadedAudio: libraryTracks.length > 0,
      },
      liveOverride: {
        isLive: Boolean(liveConfig.isLive && liveConfig.sourceType !== "radio" && liveConfig.sourceUrl),
        sourceType: liveConfig.sourceType || "radio",
        sourceUrl: liveConfig.sourceUrl || "",
        title: liveConfig.title || "",
      },
      now: getRadioNow(new Date(), process.env.RADIO_TIMEZONE || RADIO_TIMEZONE),
      schedule: RADIO_WEEKLY_SCHEDULE,
      categories: RADIO_CATEGORIES,
      rotationClock: RADIO_ROTATION_CLOCK,
    };

    res.json(station);
  });

  app.get(api.admin.listRadioLibrary.path, async (req, res) => {
    if (!isAdmin(req)) return res.sendStatus(403);
    const tracks = listRadioLibraryTracks();
    res.json({
      categories: RADIO_CATEGORIES,
      tracks,
      trackCount: tracks.length,
      uploadMaxMb: 250,
    });
  });

  app.post(
    api.admin.uploadRadioTrack.path,
    ((req, res, next) => {
      if (!isAdmin(req)) return res.sendStatus(403);
      if (!isRadioCategory(getRouteParam(req.params.category))) {
        return res.status(400).json({ message: "Categoría de radio no valida" });
      }
      return next();
    }) as RequestHandler,
    uploadLimiter as unknown as RequestHandler,
    radioAudioUpload.array("files", 12) as unknown as RequestHandler,
    async (req, res) => {
      const files = (req.files || []) as Express.Multer.File[];
      if (!files.length) {
        return res.status(400).json({ message: "Sube al menos un archivo de audio" });
      }

      const tracks = listRadioLibraryTracks().filter((track) =>
        files.some((file) => file.filename === track.fileName && track.category === getRouteParam(req.params.category)),
      );

      res.status(201).json({ uploaded: tracks, tracks: listRadioLibraryTracks() });
    },
  );

  app.delete(api.admin.deleteRadioTrack.path, async (req, res) => {
    if (!isAdmin(req)) return res.sendStatus(403);

    const filePath = getRadioTrackPath(req.params.category, req.params.fileName);
    if (!filePath || !fs.existsSync(filePath)) {
      return res.status(404).json({ message: "Audio no encontrado" });
    }

    fs.unlinkSync(filePath);
    res.json({ ok: true, tracks: listRadioLibraryTracks() });
  });

  app.patch(api.admin.updateLiveStream.path, async (req, res) => {
    if (!isAdmin(req)) return res.sendStatus(403);
    const { sourceType, sourceUrl, radioUrl, title, isLive } = req.body;
    const validTypes = ["radio", "youtube", "facebook", "tiktok", "custom", "restream", "hls"];
    const type = validTypes.includes(sourceType) ? sourceType : "radio";
    const cleanUrl = (url: string) => {
      if (!url || !url.trim()) return "";
      let cleaned = url.trim();
      if (!/^https?:\/\//i.test(cleaned)) cleaned = "https://" + cleaned;
      try { const u = new URL(cleaned); return ["http:", "https:"].includes(u.protocol) ? cleaned : ""; } catch { return ""; }
    };
    const config = JSON.stringify({ sourceType: type, sourceUrl: cleanUrl(sourceUrl || ""), radioUrl: cleanUrl(radioUrl || ""), title: (title || "").slice(0, 200), isLive: !!isLive });
    await storage.upsertSiteContent("live_stream_config", { content: config }, req.user!.id);
    if (!!isLive && type !== "radio") {
      await storage.createNotificationForAll({
        type: "transmision",
        title: "Nueva Transmision en Vivo",
        content: (title || "").slice(0, 200) || "Se inicio una transmision en vivo",
        link: "/en-vivo",
      });
    }
    res.json(JSON.parse(config));
  });

  app.get(api.admin.listMessages.path, async (req, res) => {
    if (!isAdmin(req)) return res.sendStatus(403);
    res.json(await storage.listMessages());
  });

  app.patch(api.admin.toggleMessageRead.path, async (req, res) => {
    if (!isAdmin(req)) return res.sendStatus(403);
    const msg = await storage.toggleMessageRead(parseInt(req.params.id));
    if (!msg) return res.sendStatus(404);
    res.json(msg);
  });

  app.delete(api.admin.deleteMessage.path, async (req, res) => {
    if (!isAdmin(req)) return res.sendStatus(403);
    await storage.deleteMessage(parseInt(req.params.id));
    res.sendStatus(200);
  });

  // ========== ADMIN: DATABASE BACKUPS ==========
  app.post("/api/admin/backups", async (req, res) => {
    if (!isAdmin(req)) return res.sendStatus(403);
    try {
      const { runBackup } = await import("./backup");
      const result = await runBackup();
      res.json(result);
    } catch (error) {
      res.status(500).json({ success: false, error: String(error) });
    }
  });

  app.get("/api/admin/backups", async (req, res) => {
    if (!isAdmin(req)) return res.sendStatus(403);
    try {
      const { listBackups } = await import("./backup");
      res.json(listBackups());
    } catch (error) {
      res.status(500).json({ error: String(error) });
    }
  });

  // ========== BIBLIOTECA: TEXTO BÍBLICO ==========
  // Público y cacheable (el texto no cambia). Proveedores y respaldo en server/bible.ts.
  app.get("/api/bible/chapter/:version/:book/:chapter", async (req, res) => {
    try {
      const payload = await getBibleChapter(req.params.version, req.params.book, Number(req.params.chapter));
      // Si se sirvió el respaldo, que el navegador vuelva a pedir la versión elegida.
      res.set("Cache-Control", payload.fallbackFrom ? "no-store" : "public, max-age=86400");
      res.json(payload);
    } catch (err) {
      if (err instanceof BibleRequestError) return res.status(err.status).json({ message: err.message });
      res.status(500).json({ message: "No se pudo cargar el texto bíblico" });
    }
  });

  // ========== BIBLIOTECA: CLUB DE LECTURA VIVO ==========
  // Lecturas comprobadas, desafíos del club, racha e insignias (server/club.ts).
  registerClubRoutes(app, { isTeacherOrAdmin });

  // ========== ORACIÓN: MURO DE PETICIONES ==========
  registerPrayerWallRoutes(app, { isTeacherOrAdmin, isAdmin });
  registerReportRoutes(app, { isAdmin });

  // ========== BIBLIOTECA: BIBLE HIGHLIGHTS ==========
  app.get(api.bibleHighlights.list.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const { book, chapter } = req.query;
    const highlights = await storage.listBibleHighlights(
      req.user!.id,
      book as string | undefined,
      chapter ? parseInt(chapter as string) : undefined
    );
    res.json(highlights);
  });

  app.post(api.bibleHighlights.create.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (!req.user!.isActive) return res.sendStatus(403);
    try {
      const input = api.bibleHighlights.create.input.parse(req.body);
      const highlight = await storage.createBibleHighlight(req.user!.id, input);
      res.status(201).json(highlight);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.issues[0].message });
      res.sendStatus(500);
    }
  });

  app.delete(api.bibleHighlights.delete.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    await storage.deleteBibleHighlight(parseInt(req.params.id), req.user!.id);
    res.sendStatus(200);
  });

  // ========== BIBLIOTECA: BIBLE NOTES ==========
  app.get(api.bibleNotes.list.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const { book, chapter } = req.query;
    const notes = await storage.listBibleNotes(
      req.user!.id,
      book as string | undefined,
      chapter ? parseInt(chapter as string) : undefined
    );
    res.json(notes);
  });

  app.post(api.bibleNotes.create.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (!req.user!.isActive) return res.sendStatus(403);
    try {
      const input = api.bibleNotes.create.input.parse(req.body);
      const note = await storage.createBibleNote(req.user!.id, input);
      res.status(201).json(note);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.issues[0].message });
      res.sendStatus(500);
    }
  });

  app.patch(api.bibleNotes.update.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    try {
      const input = api.bibleNotes.update.input.parse(req.body);
      const note = await storage.updateBibleNote(parseInt(req.params.id), req.user!.id, input.content);
      if (!note) return res.sendStatus(404);
      res.json(note);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.issues[0].message });
      res.sendStatus(500);
    }
  });

  app.delete(api.bibleNotes.delete.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    await storage.deleteBibleNote(parseInt(req.params.id), req.user!.id);
    res.sendStatus(200);
  });

  // ========== BIBLIOTECA: READING PLANS ==========
  app.get(api.readingPlans.list.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const { public: isPublic } = req.query;
    if (isPublic === "true") {
      res.json(await storage.listPublicReadingPlans());
    } else {
      res.json(await storage.listReadingPlans(req.user!.id));
    }
  });

  app.get(api.readingPlans.get.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const plan = await storage.getReadingPlan(parseInt(req.params.id));
    if (!plan) return res.sendStatus(404);
    const items = await storage.listReadingPlanItems(plan.id);
    res.json({ ...plan, items });
  });

  app.post(api.readingPlans.create.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (!req.user!.isActive) return res.sendStatus(403);
    try {
      const input = api.readingPlans.create.input.parse(req.body);
      const plan = await storage.createReadingPlan(req.user!.id, input);
      res.status(201).json(plan);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.issues[0].message });
      res.sendStatus(500);
    }
  });

  app.delete(api.readingPlans.delete.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const plan = await storage.getReadingPlan(parseInt(req.params.id));
    if (!plan) return res.sendStatus(404);
    if (plan.userId !== req.user!.id && !isAdmin(req)) return res.sendStatus(403);
    await storage.deleteReadingPlan(plan.id);
    res.sendStatus(200);
  });

  app.post(api.readingPlans.addItem.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    try {
      const planId = parseInt(req.params.id);
      const plan = await storage.getReadingPlan(planId);
      if (!plan || plan.userId !== req.user!.id) return res.sendStatus(404);
      const input = api.readingPlans.addItem.input.parse({ ...req.body, planId });
      const item = await storage.addReadingPlanItem(input);
      res.status(201).json(item);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.issues[0].message });
      res.sendStatus(500);
    }
  });

  // Bulk add items to a reading plan
  app.post(api.readingPlans.bulkAddItems.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (!req.user!.isActive) return res.sendStatus(403);
    try {
      const planId = parseInt(req.params.id);
      const plan = await storage.getReadingPlan(planId);
      if (!plan) return res.sendStatus(404);
      if (plan.userId !== req.user!.id) return res.sendStatus(403);
      const { items } = req.body;
      if (!Array.isArray(items) || items.length === 0) return res.status(400).json({ message: "Se requiere un arreglo de items" });
      const validItems = items.map((item: any, idx: number) => ({
        planId,
        book: String(item.book || ""),
        chapter: Number(item.chapter || 1),
        sortOrder: item.sortOrder ?? idx,
      }));
      const created = await storage.bulkAddReadingPlanItems(validItems);
      res.status(201).json(created);
    } catch (err) {
      console.error("Bulk add items error:", err);
      res.sendStatus(500);
    }
  });

  // ¿El ítem pertenece a un plan de este usuario?
  async function ownsReadingPlanItem(itemId: number, userId: number): Promise<boolean> {
    const item = await storage.getReadingPlanItem(itemId);
    if (!item) return false;
    const plan = await storage.getReadingPlan(item.planId);
    return !!plan && plan.userId === userId;
  }

  app.patch(api.readingPlans.toggleItem.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (!(await ownsReadingPlanItem(parseInt(req.params.id), req.user!.id))) return res.sendStatus(404);
    const item = await storage.toggleReadingPlanItem(parseInt(req.params.id));
    if (!item) return res.sendStatus(404);
    res.json(item);
  });

  app.delete(api.readingPlans.deleteItem.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (!(await ownsReadingPlanItem(parseInt(req.params.id), req.user!.id))) return res.sendStatus(404);
    await storage.deleteReadingPlanItem(parseInt(req.params.id));
    res.sendStatus(200);
  });

  // ========== BIBLIOTECA: READING CLUB ==========
  app.get(api.readingClub.list.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (!req.user!.isActive) return res.sendStatus(403);
    res.json(await storage.listReadingClubPosts());
  });

  app.post(api.readingClub.create.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (!req.user!.isActive) return res.sendStatus(403);
    try {
      const input = api.readingClub.create.input.parse(req.body);
      const post = await storage.createReadingClubPost(req.user!.id, input);
      res.status(201).json(post);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.issues[0].message });
      res.sendStatus(500);
    }
  });

  app.delete(api.readingClub.delete.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const id = parseInt(req.params.id);
    // El autor puede borrar su propia reflexión; la moderación, cualquiera.
    if (!isAdmin(req) && (await readingClubPostAuthor(id)) !== req.user!.id) return res.sendStatus(403);
    await storage.deleteReadingClubPost(id);
    res.sendStatus(200);
  });

  app.post(api.readingClubLikes.toggle.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (!req.user!.isActive) return res.sendStatus(403);
    const postId = parseInt(req.params.id);
    const result = await storage.toggleReadingClubPostLike(postId, req.user!.id);
    res.json(result);
  });

  app.get("/api/reading-club/my-likes", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    res.json(await storage.getUserLikedPosts(req.user!.id));
  });

  app.get(api.readingClub.listComments.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    res.json(await storage.listReadingClubComments(parseInt(req.params.id)));
  });

  app.post(api.readingClub.createComment.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (!req.user!.isActive) return res.sendStatus(403);
    try {
      const postId = parseInt(req.params.id);
      const input = api.readingClub.createComment.input.parse({ ...req.body, postId });
      const comment = await storage.createReadingClubComment(req.user!.id, input);
      notifyClubComment(postId, req.user!).catch((err) => console.error("[club] aviso de comentario:", err));
      res.status(201).json(comment);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.issues[0].message });
      res.sendStatus(500);
    }
  });

  app.delete(api.readingClub.deleteComment.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (!isAdmin(req)) return res.sendStatus(403);
    await storage.deleteReadingClubComment(parseInt(req.params.id));
    res.sendStatus(200);
  });

  // ========== BIBLIOTECA: LIBRARY RESOURCES ==========
  app.get(api.libraryResources.list.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (!req.user!.isActive) return res.sendStatus(403);
    const { category, search } = req.query;
    const resources = await storage.listLibraryResources(category as string, search as string);
    const likedIds = await storage.getUserLikedResources(req.user!.id);
    res.json(resources.map(r => ({ ...r, isLiked: likedIds.includes(r.id) })));
  });

  app.post(api.libraryResources.create.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (!req.user!.isActive) return res.sendStatus(403);
    try {
      const input = api.libraryResources.create.input.parse(req.body);
      const resource = await storage.createLibraryResource(req.user!.id, input);
      res.status(201).json(resource);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.issues[0].message });
      res.sendStatus(500);
    }
  });

  app.delete(api.libraryResources.delete.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (!isAdmin(req)) return res.sendStatus(403);
    await storage.deleteLibraryResource(parseInt(req.params.id));
    res.sendStatus(200);
  });

  app.post(api.libraryResources.toggleLike.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const result = await storage.toggleLibraryResourceLike(parseInt(req.params.id), req.user!.id);
    res.json(result);
  });

  // ========== NOTIFICACIONES ==========
  app.get(api.notifications.list.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const notifs = await storage.listNotifications(req.user!.id);
    res.json(notifs);
  });

  app.get(api.notifications.unreadCount.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const count = await storage.getUnreadNotificationCount(req.user!.id);
    res.json({ count });
  });

  app.patch(api.notifications.markRead.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    await storage.markNotificationRead(parseInt(req.params.id), req.user!.id);
    res.json({ success: true });
  });

  app.patch(api.notifications.markAllRead.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    await storage.markAllNotificationsRead(req.user!.id);
    res.json({ success: true });
  });

  // ========== ACTIVIDADES DE ORACION ==========
  app.get(api.prayerActivities.list.path, async (req, res) => {
    const activities = await storage.listPrayerActivities();
    res.json(activities);
  });

  app.post(api.prayerActivities.create.path, async (req, res) => {
    if (!req.isAuthenticated()) {
      console.log("Prayer create: user not authenticated. Session:", req.sessionID);
      return res.status(401).json({ message: "Debes iniciar sesión para crear actividades" });
    }
    // Crear una actividad avisa a TODOS los miembros: solo cuentas aprobadas.
    if (!req.user!.isActive) {
      return res.status(403).json({ message: "Tu cuenta aún no está aprobada. Cuando la aprueben podrás crear actividades de oración." });
    }
    try {
      const input = api.prayerActivities.create.input.parse(req.body);
      const activity = await storage.createPrayerActivity(req.user!.id, input);
      // Send notification to all users (non-blocking)
      try {
        await storage.createNotificationForAll({
          type: "oracion",
          title: "Nueva Actividad de Oración",
          content: `Se creó la actividad: ${activity.title}`,
          link: "/oracion",
        });
      } catch (notifErr) {
        console.error("Error creating prayer notifications (non-blocking):", notifErr);
      }
      res.status(201).json(activity);
    } catch (err: any) {
      console.error("Error creating prayer activity:", err);
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.issues[0].message });
      res.status(500).json({ message: err?.message || "Error interno al crear la actividad" });
    }
  });

  app.patch(api.prayerActivities.update.path, async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Debes iniciar sesión para editar actividades" });
    }
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ message: "ID de actividad inválido" });
      const activity = await storage.getPrayerActivity(id);
      if (!activity) return res.status(404).json({ message: "Actividad no encontrada" });
      if (activity.userId !== req.user!.id && !isAdmin(req)) {
        return res.status(403).json({ message: "No tienes permiso para editar esta actividad" });
      }
      const input = api.prayerActivities.update.input.parse(req.body);
      const updated = await storage.updatePrayerActivity(id, input);
      res.json(updated);
    } catch (err: any) {
      console.error("Error updating prayer activity:", err);
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.issues[0].message });
      res.status(500).json({ message: err?.message || "Error interno al editar la actividad" });
    }
  });

  app.delete(api.prayerActivities.delete.path, async (req, res) => {
    if (!req.isAuthenticated()) {
      console.log("Prayer delete: user not authenticated. Session:", req.sessionID);
      return res.status(401).json({ message: "Debes iniciar sesión para eliminar actividades" });
    }
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ message: "ID de actividad inválido" });
      const activity = await storage.getPrayerActivity(id);
      if (!activity) return res.status(404).json({ message: "Actividad no encontrada" });
      if (activity.userId !== req.user!.id && !isAdmin(req)) {
        return res.status(403).json({ message: "No tienes permiso para eliminar esta actividad" });
      }
      await storage.deletePrayerActivity(id);
      res.json({ success: true });
    } catch (err: any) {
      console.error("Error deleting prayer activity:", err);
      res.status(500).json({ message: err?.message || "Error interno al eliminar la actividad" });
    }
  });

  // ========== ASISTENCIA A ACTIVIDADES DE ORACION ==========
  app.get(api.prayerAttendees.list.path, async (req, res) => {
    const activityId = parseInt(req.params.activityId);
    const attendees = await storage.listPrayerAttendees(activityId);
    const count = {
      confirmado: attendees.filter((a: any) => a.status === "confirmado").length,
      tal_vez: attendees.filter((a: any) => a.status === "tal_vez").length,
    };
    res.json({ attendees, count });
  });

  app.get(api.prayerAttendees.myAttendance.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.json(null);
    const activityId = parseInt(req.params.activityId);
    const attendance = await storage.getPrayerAttendee(activityId, req.user!.id);
    res.json(attendance || null);
  });

  app.post(api.prayerAttendees.upsert.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    try {
      const activityId = parseInt(req.params.activityId);
      const activities = await storage.listPrayerActivities();
      const activity = activities.find(a => a.id === activityId);
      if (!activity) return res.sendStatus(404);
      const input = api.prayerAttendees.upsert.input.parse({ ...req.body, activityId });
      const attendance = await storage.upsertPrayerAttendee(activityId, req.user!.id, input);

      if (input.status !== "no_asistire") {
        try {
          let dateInfo = "";
          if (activity.scheduledDate) {
            const actDate = new Date(activity.scheduledDate as string | Date);
            const formattedDate = actDate.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" });
            const formattedTime = actDate.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
            dateInfo = ` el ${formattedDate} a las ${formattedTime}`;
          }
          const statusLabel = input.status === "tal_vez" ? "indicado que tal vez asistiras" : "confirmado tu asistencia";
          await storage.createNotification({
            userId: req.user!.id,
            type: "oracion",
            title: `Recordatorio: ${activity.title}`,
            content: `Has ${statusLabel} para "${activity.title}"${dateInfo}.${activity.meetingUrl ? ' Enlace: ' + activity.meetingUrl : ''}`,
            link: "/oracion",
          });
        } catch (notifErr) {
          console.error("Error creating prayer notification (non-blocking):", notifErr);
        }
      }

      res.json(attendance);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.issues[0].message });
      res.sendStatus(500);
    }
  });

  app.delete(api.prayerAttendees.cancel.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const activityId = parseInt(req.params.activityId);
    await storage.cancelPrayerAttendance(activityId, req.user!.id);
    res.sendStatus(200);
  });

  // ========== REGIONES DEL MINISTERIO ==========
  app.get(api.ministryRegions.list.path, async (_req, res) => {
    const regions = await storage.listMinistryRegions();
    res.json(regions);
  });

  app.post(api.ministryRegions.create.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (!isAdmin(req)) return res.sendStatus(403);
    try {
      const input = api.ministryRegions.create.input.parse(req.body);
      const region = await storage.createMinistryRegion(input);
      res.status(201).json(region);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.issues[0].message });
      res.status(500).json({ message: "Error al crear la región" });
    }
  });

  app.patch(api.ministryRegions.update.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (!isAdmin(req)) return res.sendStatus(403);
    try {
      const input = api.ministryRegions.update.input.parse(req.body);
      const updated = await storage.updateMinistryRegion(parseInt(req.params.id), input);
      if (!updated) return res.status(404).json({ message: "Región no encontrada" });
      res.json(updated);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.issues[0].message });
      res.status(500).json({ message: "Error al actualizar la región" });
    }
  });

  app.delete(api.ministryRegions.delete.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (!isAdmin(req)) return res.sendStatus(403);
    await storage.deleteMinistryRegion(parseInt(req.params.id));
    res.json({ success: true });
  });

  // ========== MIEMBROS DEL EQUIPO ==========
  app.get(api.teamMembers.list.path, async (_req, res) => {
    const members = await storage.listTeamMembers();
    res.json(members);
  });

  app.post(api.teamMembers.create.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (!isAdmin(req)) return res.sendStatus(403);
    try {
      const input = api.teamMembers.create.input.parse(req.body);
      const member = await storage.createTeamMember(input);
      res.status(201).json(member);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.issues[0].message });
      res.status(500).json({ message: "Error al crear el miembro" });
    }
  });

  app.patch(api.teamMembers.update.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (!isAdmin(req)) return res.sendStatus(403);
    try {
      const input = api.teamMembers.update.input.parse(req.body);
      const updated = await storage.updateTeamMember(parseInt(req.params.id), input);
      if (!updated) return res.status(404).json({ message: "Miembro no encontrado" });
      res.json(updated);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.issues[0].message });
      res.status(500).json({ message: "Error al actualizar el miembro" });
    }
  });

  app.delete(api.teamMembers.delete.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (!isAdmin(req)) return res.sendStatus(403);
    await storage.deleteTeamMember(parseInt(req.params.id));
    res.json({ success: true });
  });

  // ========== CARTELERA CENTRAL ==========
  // Aggregation endpoints (must be before parameterized routes)
  app.get(api.cartelera.allAnnouncements.path, async (_req, res) => {
    const all = await storage.listAllCourseAnnouncements();
    res.json(all);
  });

  app.get(api.cartelera.allSessions.path, async (_req, res) => {
    const sessions = await storage.listAllUpcomingSessions();
    res.json(sessions);
  });

  app.get(api.cartelera.allSchedules.path, async (_req, res) => {
    const schedules = await storage.listAllSchedules();
    res.json(schedules);
  });

  app.get(api.cartelera.stats.path, async (_req, res) => {
    const stats = await storage.getCarteleraStats();
    res.json(stats);
  });

  // Own announcements (admin/teacher only)
  app.get(api.cartelera.list.path, async (_req, res) => {
    const announcements = await storage.listCarteleraAnnouncements();
    res.json(announcements);
  });

  app.post(api.cartelera.create.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (!isTeacherOrAdmin(req)) return res.sendStatus(403);
    const parsed = api.cartelera.create.input.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: parsed.error.message });
    const ann = await storage.createCarteleraAnnouncement(req.user!.id, parsed.data);
    
    // Push notification for cartelera announcement (non-blocking)
    if (isPushConfigured) {
      (async () => {
        try {
          const allSubs = await storage.getAllPushSubscriptions();
          const payload: PushPayload = { title: "Nuevo Anuncio en Cartelera", body: ann.title, url: "/comunidad", icon: "/icons/icon-192x192.png" };
          const subs = allSubs.map(s => ({ id: s.id, subscription: { endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } } }));
          const expired = await sendPushToMany(subs, payload);
          if (expired.length > 0) await storage.deletePushSubscriptionsByIds(expired);
        } catch (e) { console.error("[push] Cartelera push error:", e); }
      })();
    }
    
    res.json(ann);
  });

  app.patch(api.cartelera.update.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (!isTeacherOrAdmin(req)) return res.sendStatus(403);
    const id = parseInt(req.params.id);
    const existing = await storage.getCarteleraAnnouncement(id);
    if (!existing) return res.status(404).json({ message: "Anuncio no encontrado" });
    if (!isAdmin(req) && existing.authorId !== req.user!.id) return res.sendStatus(403);
    const parsed = api.cartelera.update.input.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: parsed.error.message });
    const updated = await storage.updateCarteleraAnnouncement(id, parsed.data);
    res.json(updated);
  });

  app.delete(api.cartelera.delete.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (!isTeacherOrAdmin(req)) return res.sendStatus(403);
    const id = parseInt(req.params.id);
    const existing = await storage.getCarteleraAnnouncement(id);
    if (!existing) return res.status(404).json({ message: "Anuncio no encontrado" });
    if (!isAdmin(req) && existing.authorId !== req.user!.id) return res.sendStatus(403);
    await storage.deleteCarteleraAnnouncement(id);
    res.json({ success: true });
  });

  // ========== POST IMAGE UPLOAD ==========
  const postImgDir = path.join(process.cwd(), "uploads", "posts");
  if (!fs.existsSync(postImgDir)) {
    fs.mkdirSync(postImgDir, { recursive: true });
  }
  const postImageStorage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, postImgDir),
    filename: (req, _file, cb) => {
      const ext = path.extname(_file.originalname).toLowerCase() || ".jpg";
      cb(null, `post-${req.user?.id || "unknown"}-${Date.now()}${ext}`);
    },
  });
  const postImageUpload = multer({
    storage: postImageStorage,
    ...({ defParamCharset: "utf8" } as object), // nombres con tildes (UTF-8); los tipos de multer aún no lo traen
    limits: { fileSize: 15 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
      if (file.mimetype.startsWith("image/")) cb(null, true);
      else cb(new Error("Solo se permiten imágenes"));
    },
  });

  app.post("/api/upload/post-image", uploadLimiter as RequestHandler, postImageUpload.single("image") as RequestHandler, async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (!req.user!.isActive) return res.sendStatus(403);
    if (!req.file) return res.status(400).json({ message: "No se envió ninguna imagen" });
    try {
      // Optimize image then upload to storage
      const optimized = await optimizePostImage(req.file.path);
      const result = await uploadFile({
        folder: "posts",
        filename: `post-${Date.now()}.webp`,
        buffer: optimized,
        contentType: "image/webp",
        ownerId: req.user!.id,
      });
      try { fs.unlinkSync(req.file.path); } catch (_) {}
      res.json({ imageUrl: result.url });
    } catch (err) {
      console.error("Post image upload error:", err);
      res.status(500).json({ message: "Error al subir imagen" });
    }
  });

  // ========== POST COMMENTS ==========
  app.get(api.postComments.list.path, async (req, res) => {
    // Public read access — anyone can view comments
    const postId = parseInt(req.params.postId);
    const comments = await storage.listPostComments(postId);
    res.json(comments);
  });

  app.post(api.postComments.create.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (!req.user!.isActive) return res.sendStatus(403);
    try {
      const postId = parseInt(req.params.postId);
      const input = api.postComments.create.input.parse({ ...req.body, postId });
      const content = input.content.trim();
      if (!content) return res.status(400).json({ message: "El comentario no puede estar vacío" });
      if (content.length > 2000) {
        return res.status(400).json({ message: "El comentario es demasiado largo (máximo 2000 caracteres)" });
      }
      if (!(await storage.getMemberPost(postId))) {
        return res.status(404).json({ message: "Esta publicación ya no existe" });
      }
      const comment = await storage.createPostComment(req.user!.id, { ...input, content });
      res.status(201).json(comment);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.issues[0].message });
      res.sendStatus(500);
    }
  });

  app.delete(api.postComments.delete.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const commentId = parseInt(req.params.id);
    const comment = await storage.getPostComment(commentId);
    if (!comment) return res.sendStatus(404);
    // Allow owner or admin to delete
    if (comment.userId !== req.user!.id && !isAdmin(req)) {
      return res.sendStatus(403);
    }
    await storage.deletePostComment(commentId);
    res.sendStatus(200);
  });

  // ========== MENSAJES DIRECTOS (tipo WhatsApp, en tiempo real) ==========
  // Fotos, notas de voz, documentos, respuestas, reacciones, vistos: ver server/chat.ts.
  registerChatRoutes(app);

  // ========== JUEGOS (puntajes y tabla de los mejores) ==========
  registerGameRoutes(app);

  // ========== JERUSALÉN EN LÍNEA (modo en línea del templo: personajes, temporada y cargos) ==========
  registerJerusalenRoutes(app);
  // La ciudad (etapa 2): la casa de cada personaje y su barrio.
  registerCiudadRoutes(app);
  // Vecinos de la ciudad: bloquear y desbloquear, y sacar a alguien de la ciudad (administración).
  registerRedRoutes(app);
  registerEstudiosRoutes(app);
  registerMisionesRoutes(app);
  registerMercadoRoutes(app);
  registerEconomiaRoutes(app);
  registerCatedrasRoutes(app);
  // El barrio como clan: la charla del barrio, su emblema y su lema, y sus vecinos.
  registerBarrioRoutes(app);
  // la misión del barrio de hoy y la copa de los barrios
  registerBarrioJuntosRoutes(app);
  // acompañar a los vecinos: ir con él e invitarlo a venir
  registerAcompanarRoutes(app);
  // las casas del pueblo y sus pedidos en el barrio
  registerPuebloRoutes(app);
  // «¿Quién es sabio?»: el concurso de la casa de la sabiduría.
  registerSabioRoutes(app);
  // el duelo de sabios (dos personas, las mismas preguntas a la vez)
  registerSabioDueloRoutes(app);
  registerReunionesRoutes(app);
  registerConcursoRoutes(app);
  registerAyudaRoutes(app);
  registerMuroRoutes(app);
  registerLogrosEnLineaRoutes(app);

  // ========== IGLESIAS DEL MINISTERIO (COBERTURA Y RESPALDO) ==========
  app.get(api.ministryChurches.list.path, async (req, res) => {
    const churchType = req.query.type as string | undefined;
    const churches = await storage.listMinistryChurches(churchType);
    res.json(churches);
  });

  app.get(api.ministryChurches.get.path, async (req, res) => {
    const church = await storage.getMinistryChurch(parseInt(req.params.id));
    if (!church) return res.status(404).json({ message: "Iglesia no encontrada" });
    res.json(church);
  });

  app.post(api.ministryChurches.create.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (!isAdmin(req)) return res.sendStatus(403);
    try {
      const input = api.ministryChurches.create.input.parse(req.body);
      const church = await storage.createMinistryChurch(input);
      res.status(201).json(church);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.issues[0].message });
      res.status(500).json({ message: "Error al crear la iglesia" });
    }
  });

  app.patch(api.ministryChurches.update.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (!isAdmin(req)) return res.sendStatus(403);
    try {
      const input = api.ministryChurches.update.input.parse(req.body);
      const updated = await storage.updateMinistryChurch(parseInt(req.params.id), input);
      if (!updated) return res.status(404).json({ message: "Iglesia no encontrada" });
      res.json(updated);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.issues[0].message });
      res.status(500).json({ message: "Error al actualizar la iglesia" });
    }
  });

  app.delete(api.ministryChurches.delete.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (!isAdmin(req)) return res.sendStatus(403);
    await storage.deleteMinistryChurch(parseInt(req.params.id));
    res.json({ success: true });
  });

  // ========== PUBLICACIONES DE IGLESIAS ==========
  app.get(api.churchPosts.list.path, async (req, res) => {
    const churchId = req.query.churchId ? parseInt(req.query.churchId as string) : undefined;
    const posts = await storage.listChurchPosts(churchId);
    res.json(posts);
  });

  app.post(api.churchPosts.create.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (!req.user!.isActive) return res.sendStatus(403);
    try {
      const parsed = api.churchPosts.create.input.parse(req.body);
      const input = { ...parsed, content: parsed.content.trim() };
      if (!input.content) return res.status(400).json({ message: "Escribe algo para publicar" });
      const church = await storage.getMinistryChurch(input.churchId);
      if (!church || !church.isActive) return res.status(400).json({ message: "Iglesia no válida o inactiva" });
      const post = await storage.createChurchPost(req.user!.id, input);
      res.status(201).json(post);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.issues[0].message });
      res.status(500).json({ message: "Error al crear la publicación" });
    }
  });

  app.delete(api.churchPosts.delete.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const id = parseInt(req.params.id);
    const post = await storage.getChurchPost(id);
    if (!post) return res.sendStatus(404);
    const isChurchModerator = req.user!.role === "admin_iglesia" && req.user!.churchId === post.churchId;
    if (post.userId !== req.user!.id && !isAdmin(req) && !isChurchModerator) return res.sendStatus(403);
    await storage.deleteChurchPost(id);
    res.json({ success: true });
  });

  // ========== PUBLICACIONES REGIONALES ==========
  app.get(api.regionPosts.list.path, async (req, res) => {
    const region = req.query.region as string | undefined;
    const posts = await storage.listRegionPosts(region);
    res.json(posts);
  });

  app.post(api.regionPosts.create.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (!req.user!.isActive) return res.sendStatus(403);
    const parsed = api.regionPosts.create.input.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: parsed.error.issues[0].message });
    const input = { ...parsed.data, content: parsed.data.content.trim() };
    if (!input.content) return res.status(400).json({ message: "Escribe algo para publicar" });
    const allRegions = await storage.listMinistryRegions();
    const validRegionNames = allRegions.filter(r => r.isActive).map(r => r.name);
    if (!validRegionNames.includes(input.region)) return res.status(400).json({ message: "Región no válida" });
    const post = await storage.createRegionPost(req.user!.id, input);
    res.status(201).json(post);
  });

  app.delete(api.regionPosts.delete.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const id = parseInt(req.params.id);
    const post = await storage.getRegionPost(id);
    if (!post) return res.sendStatus(404);
    if (post.userId !== req.user!.id && !isAdmin(req)) return res.sendStatus(403);
    await storage.deleteRegionPost(id);
    res.json({ success: true });
  });

  // ========== REACCIONES REGIONALES ==========
  app.post("/api/region-posts/:id/reactions", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const postId = parseInt(req.params.id);
    const { reactionType } = req.body;
    if (!reactionType) return res.status(400).json({ message: "Tipo de reaccion requerido" });
    const result = await storage.toggleRegionPostReaction(postId, req.user!.id, reactionType);
    res.json(result);
  });

  app.get("/api/region-posts/:id/reactions", async (req, res) => {
    const postId = parseInt(req.params.id);
    const reactions = await storage.getRegionPostReactions(postId);
    res.json(reactions);
  });

  // ========== ENCUESTAS REGIONALES ==========
  app.post("/api/region-posts/:id/poll", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const postId = parseInt(req.params.id);
    const { question, options } = req.body;
    if (!question || !options || options.length < 2) return res.status(400).json({ message: "Pregunta y al menos 2 opciones requeridas" });
    const poll = await storage.createRegionPostPoll(postId, question, options);
    res.status(201).json(poll);
  });

  app.get("/api/region-posts/:id/poll", async (req, res) => {
    const postId = parseInt(req.params.id);
    const poll = await storage.getRegionPostPoll(postId);
    res.json(poll);
  });

  app.post("/api/region-polls/:optionId/vote", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const optionId = parseInt(req.params.optionId);
    const result = await storage.voteRegionPostPoll(optionId, req.user!.id);
    res.json(result);
  });

  app.get("/api/region-posts/:id/my-vote", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const postId = parseInt(req.params.id);
    const optionId = await storage.getUserPollVote(postId, req.user!.id);
    res.json({ optionId });
  });

  // ========== CERTIFICATES ==========
  app.get(api.certificates.myList.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const certs = await storage.listCertificatesByUser(req.user!.id);
    // Enrich with student name for display — use overrides if admin set them
    const enriched = certs.map(c => ({
      ...c,
      courseName: c.courseNameOverride || c.course?.title || "Curso",
      studentName: c.studentNameOverride || req.user!.displayName || req.user!.username,
      verificationCode: c.certificateCode,
    }));
    res.json(enriched);
  });

  app.get(api.certificates.listByUser.path, async (req, res) => {
    if (!isAdmin(req)) return res.sendStatus(403);
    const userId = parseInt(req.params.userId);
    const certs = await storage.listCertificatesByUser(userId);
    res.json(certs);
  });

  // Get certificate by enrollment ID (for admin/teacher to view student certs)
  app.get("/api/certificates/by-enrollment/:enrollmentId", async (req, res) => {
    if (!isTeacherOrAdmin(req)) return res.sendStatus(403);
    const cert = await storage.getCertificateByEnrollment(parseInt(req.params.enrollmentId));
    if (!cert) return res.status(404).json({ message: "Certificado no encontrado para esta inscripción" });
    const certUser = await storage.getUser(cert.userId);
    const course = await storage.getCourse(cert.courseId);
    res.json({
      ...cert,
      verificationCode: cert.certificateCode,
      studentName: cert.studentNameOverride || certUser?.displayName || certUser?.username || "Estudiante",
      courseName: cert.courseNameOverride || course?.title || "Curso",
      teacherName: cert.teacherName,
      courseCategory: course?.category,
      customMessage: cert.customMessage,
      signatureUrl: cert.signatureUrl,
      issuedDateOverride: cert.issuedDateOverride,
    });
  });

  app.get(api.certificates.get.path, async (req, res) => {
    const cert = await storage.getCertificate(parseInt(req.params.id));
    if (!cert) return res.sendStatus(404);
    const user = await storage.getUser(cert.userId);
    const course = await storage.getCourse(cert.courseId);
    res.json({
      ...cert,
      verificationCode: cert.certificateCode,
      studentName: user?.displayName || user?.username || "Estudiante",
      courseName: course?.title || "Curso",
      courseCategory: course?.category,
      user: { displayName: user?.displayName, username: user?.username },
      course: { title: course?.title, category: course?.category },
    });
  });

  app.get(api.certificates.verify.path, async (req, res) => {
    const cert = await storage.getCertificateByCode(req.params.code);
    if (!cert) return res.status(404).json({ valid: false, message: "Certificado no encontrado" });
    const user = await storage.getUser(cert.userId);
    const course = await storage.getCourse(cert.courseId);
    res.json({
      valid: true,
      certificate: {
        ...cert,
        verificationCode: cert.certificateCode,
        studentName: user?.displayName || user?.username || "Estudiante",
        courseName: course?.title || "Curso",
      },
      // Legacy flat fields for verify UI
      studentName: user?.displayName || user?.username || "Estudiante",
      courseName: course?.title || "Curso",
      grade: cert.grade,
      issuedAt: cert.issuedAt,
    });
  });

  app.post(api.certificates.generate.path, async (req, res) => {
    if (!isTeacherOrAdmin(req)) return res.sendStatus(403);
    try {
      const { enrollmentId } = req.body;
      const enrollment = await storage.getEnrollment(enrollmentId);
      if (!enrollment) return res.status(404).json({ message: "Inscripción no encontrada" });
      if (enrollment.status !== "completado") return res.status(400).json({ message: "El estudiante no ha completado el curso" });

      // Al marcar "completado" ya se emite uno solo: no crear un segundo certificado
      // (antes este botón duplicaba el del alumno).
      const existing = await storage.getCertificateByEnrollment(enrollmentId);
      if (existing) return res.json(existing);

      const course = await storage.getCourse(enrollment.courseId);
      const teacher = course?.teacherId ? await storage.getUser(course.teacherId) : null;
      const code = `CERT-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
      
      const cert = await storage.createCertificate(
        enrollment.userId, enrollment.courseId, enrollmentId, code,
        teacher?.displayName || teacher?.username || undefined,
        enrollment.grade || undefined
      );
      res.status(201).json(cert);
    } catch (err) {
      console.error("Certificate generation error:", err);
      res.status(500).json({ message: "Error al generar certificado" });
    }
  });

  // Backfill: generate certificates for all completed enrollments that don't have one yet
  app.post("/api/certificates/backfill", async (req, res) => {
    if (!isAdmin(req)) return res.sendStatus(403);
    try {
      const allCourses = await storage.listCourses();
      let generated = 0;
      for (const course of allCourses) {
        const enrollmentsList = await storage.listEnrollmentsByCourse(course.id);
        const teacher = course.teacherId ? await storage.getUser(course.teacherId) : null;
        for (const e of enrollmentsList) {
          if (e.status === "completado") {
            const existing = await storage.getCertificateByEnrollment(e.id);
            if (!existing) {
              const code = `CERT-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
              await storage.createCertificate(
                e.userId, e.courseId, e.id, code,
                teacher?.displayName || teacher?.username || undefined,
                e.grade || undefined
              );
              generated++;
            }
          }
        }
      }
      res.json({ message: `Se generaron ${generated} certificados retroactivos` });
    } catch (err) {
      console.error("Backfill error:", err);
      res.status(500).json({ message: "Error en la generacion retroactiva" });
    }
  });

  // Update certificate (admin only) — edit names, dates, grades, messages, signatures
  app.put("/api/certificates/:id", async (req, res) => {
    if (!isAdmin(req)) return res.sendStatus(403);
    try {
      const certId = parseInt(req.params.id);
      const { studentNameOverride, courseNameOverride, teacherName, grade, customMessage, signatureUrl, issuedDateOverride } = req.body;
      const updates: any = {};
      if (studentNameOverride !== undefined) updates.studentNameOverride = studentNameOverride || null;
      if (courseNameOverride !== undefined) updates.courseNameOverride = courseNameOverride || null;
      if (teacherName !== undefined) updates.teacherName = teacherName || null;
      if (grade !== undefined) updates.grade = grade || null;
      if (customMessage !== undefined) updates.customMessage = customMessage || null;
      if (signatureUrl !== undefined) updates.signatureUrl = signatureUrl || null;
      if (issuedDateOverride !== undefined) updates.issuedDateOverride = issuedDateOverride || null;

      const cert = await storage.updateCertificate(certId, updates);
      if (!cert) return res.status(404).json({ message: "Certificado no encontrado" });

      const certUser = await storage.getUser(cert.userId);
      const course = await storage.getCourse(cert.courseId);
      res.json({
        ...cert,
        verificationCode: cert.certificateCode,
        studentName: cert.studentNameOverride || certUser?.displayName || certUser?.username || "Estudiante",
        courseName: cert.courseNameOverride || course?.title || "Curso",
        teacherName: cert.teacherName,
      });
    } catch (err) {
      console.error("Certificate update error:", err);
      res.status(500).json({ message: "Error al actualizar certificado" });
    }
  });

  // Upload signature image for certificates (admin only)
  app.post("/api/upload/signature", uploadLimiter as RequestHandler, signatureUpload.single("signature") as RequestHandler, async (req: Request, res: Response) => {
    if (!isAdmin(req)) return res.sendStatus(403);
    if (!req.file) return res.status(400).json({ message: "No se proporcionó archivo" });
    try {
      const ext = path.extname(req.file.originalname).toLowerCase() || ".png";
      const result = await uploadFile({
        folder: "signatures",
        filename: `firma-${Date.now()}${ext}`,
        buffer: fs.readFileSync(req.file.path),
        contentType: req.file.mimetype,
      });
      res.json({ url: result.url });
    } catch (err) {
      console.error("Signature upload error:", err);
      res.status(500).json({ message: "Error al subir la firma" });
    } finally {
      try { fs.unlinkSync(req.file.path); } catch (_) {}
    }
  });

  // ========== TITHES ==========
  app.get(api.tithes.list.path, async (req, res) => {
    if (!isAdmin(req)) return res.sendStatus(403);
    const { churchId, regionName, month } = req.query;
    const list = await storage.listTithes({
      churchId: churchId ? parseInt(churchId as string) : undefined,
      regionName: regionName as string,
      month: month as string,
    });
    res.json(list);
  });

  app.post(api.tithes.create.path, async (req, res) => {
    if (!isAdmin(req)) return res.sendStatus(403);
    try {
      const input = api.tithes.create.input.parse(req.body);
      const tithe = await storage.createTithe({ ...input, recordedBy: req.user!.id });
      res.status(201).json(tithe);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.issues[0].message });
      res.sendStatus(500);
    }
  });

  app.delete(api.tithes.delete.path, async (req, res) => {
    if (!isAdmin(req)) return res.sendStatus(403);
    await storage.deleteTithe(parseInt(req.params.id));
    res.json({ success: true });
  });

  app.get(api.tithes.report.path, async (req, res) => {
    if (!isAdmin(req)) return res.sendStatus(403);
    const { month, year } = req.query;
    const report = await storage.getTitheReport(month as string, year as string);
    res.json(report);
  });

  // Public donation endpoint — no auth required
  app.post(api.tithes.publicDonate.path, async (req, res) => {
    try {
      const input = api.tithes.publicDonate.input.parse(req.body);
      const tithe = await storage.createTithe({
        donorName: input.donorName,
        amount: input.amount,
        currency: input.currency || "USD",
        type: "donacion",
        method: input.method || "transferencia",
        notes: input.notes || (input.email ? `Email: ${input.email}` : null),
        userId: req.user?.id || null,
        recordedBy: null as any,
      });
      res.status(201).json({ success: true, id: tithe.id });
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.issues[0].message });
      console.error("Public donation error:", err);
      res.sendStatus(500);
    }
  });

  // Budget summary for admin
  app.get(api.tithes.budgetSummary.path, async (req, res) => {
    if (!isAdmin(req)) return res.sendStatus(403);
    try {
      const year = (req.query.year as string) || new Date().getFullYear().toString();
      const report = await storage.getTitheReport(undefined, year);
      // Calculate monthly breakdown
      const monthlyData: Record<string, number> = {};
      if (report.rows) {
        for (const r of report.rows) {
          const month = new Date(r.createdAt).toISOString().slice(0, 7);
          monthlyData[month] = (monthlyData[month] || 0) + (parseFloat(r.amount) || 0);
        }
      }
      const monthly = Object.entries(monthlyData)
        .map(([month, total]) => ({ month, total }))
        .sort((a, b) => a.month.localeCompare(b.month));
      
      res.json({
        ...report,
        monthly,
        avgMonthly: monthly.length > 0 ? report.total / monthly.length : 0,
      });
    } catch (err) {
      console.error("Budget summary error:", err);
      res.sendStatus(500);
    }
  });

  // ========== STRIPE INTEGRATION ==========
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let stripe: any = null;

  if (stripeSecretKey) {
    try {
      const Stripe = (await import("stripe")).default;
      // Versión de la API fijada a la del SDK (stripe 23). Al subir de versión el
      // SDK, revisar el changelog: en esta se cambió payment_method_types por
      // allowed_payment_method_types en Checkout.
      stripe = new Stripe(stripeSecretKey, { apiVersion: "2026-10-28.endive" });
      console.log("[stripe] Payment processing initialized");
    } catch (err) {
      console.warn("[stripe] Could not initialize Stripe:", err);
    }
  } else {
    console.log("[stripe] STRIPE_SECRET_KEY not set — Stripe payments disabled");
  }

  // Config endpoint — tells client if Stripe is available
  app.get(api.tithes.stripeConfig.path, (_req, res) => {
    const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY || null;
    res.json({
      enabled: !!stripe && !!publishableKey,
      publishableKey,
    });
  });

  // Create Stripe Checkout session
  app.post(api.tithes.stripeCheckout.path, async (req, res) => {
    if (!stripe) return res.status(503).json({ message: "Pagos con tarjeta no disponibles en este momento" });
    try {
      const input = api.tithes.stripeCheckout.input.parse(req.body);
      const currency = (input.currency || "usd").toLowerCase();
      const amountInCents = Math.round(input.amount * 100);

      // Determine the base URL for redirects
      const protocol = req.headers["x-forwarded-proto"] || req.protocol;
      const host = req.headers["x-forwarded-host"] || req.headers.host;
      const baseUrl = `${protocol}://${host}`;

      const session = await stripe.checkout.sessions.create({
        allowed_payment_method_types: ["card"],
        mode: "payment",
        customer_email: input.email,
        line_items: [{
          price_data: {
            currency,
            product_data: {
              name: "Donación al Ministerio",
              description: `Donación de ${input.donorName}`,
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        }],
        metadata: {
          donorName: input.donorName,
          email: input.email,
          type: "donacion",
        },
        success_url: `${baseUrl}/finanzas?payment=success&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/finanzas?payment=cancelled`,
      });

      res.json({ url: session.url, sessionId: session.id });
    } catch (err: any) {
      console.error("[stripe] Checkout session error:", err);
      res.status(500).json({ message: err.message || "Error al crear la sesión de pago" });
    }
  });

  // Stripe Webhook — confirms successful payments and records them
  app.post(api.tithes.stripeWebhook.path, async (req, res) => {
    if (!stripe) return res.sendStatus(503);
    const sig = req.headers["stripe-signature"] as string;
    let event: any;

    try {
      if (stripeWebhookSecret) {
        event = stripe.webhooks.constructEvent(req.rawBody, sig, stripeWebhookSecret);
      } else {
        // If no webhook secret, trust the event (dev only)
        event = req.body;
      }
    } catch (err: any) {
      console.error("[stripe] Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      try {
        const donorName = session.metadata?.donorName || session.customer_email || "Donante Anónimo";
        const email = session.metadata?.email || session.customer_email || "";
        const amount = (session.amount_total / 100).toFixed(2);
        const currency = (session.currency || "usd").toUpperCase();

        await storage.createTithe({
          donorName,
          amount,
          currency,
          type: "donacion",
          method: "tarjeta",
          notes: `Stripe Payment ID: ${session.payment_intent}${email ? ` | Email: ${email}` : ""}`,
          userId: null,
          recordedBy: null as any,
        });

        console.log(`[stripe] Donation recorded: ${donorName} - ${currency} ${amount}`);
      } catch (err) {
        console.error("[stripe] Error recording donation from webhook:", err);
      }
    }

    res.json({ received: true });
  });

  // ========== REPORTS ==========
  app.get(api.reports.dashboard.path, async (req, res) => {
    if (!isAdmin(req)) return res.sendStatus(403);
    const data = await storage.getReportDashboard();
    res.json(data);
  });

  app.get(api.reports.memberGrowth.path, async (req, res) => {
    if (!isAdmin(req)) return res.sendStatus(403);
    const data = await storage.getMemberGrowthReport();
    res.json(data);
  });

  app.get(api.reports.courseStats.path, async (req, res) => {
    if (!isAdmin(req)) return res.sendStatus(403);
    const data = await storage.getCourseStatsReport();
    res.json(data);
  });

  app.get(api.reports.attendanceStats.path, async (req, res) => {
    if (!isAdmin(req)) return res.sendStatus(403);
    const data = await storage.getAttendanceReport();
    res.json(data);
  });

  app.get(api.reports.prayerStats.path, async (req, res) => {
    if (!isAdmin(req)) return res.sendStatus(403);
    const data = await storage.getPrayerStatsReport();
    res.json(data);
  });

  app.get(api.reports.libraryStats.path, async (req, res) => {
    if (!isAdmin(req)) return res.sendStatus(403);
    const data = await storage.getLibraryStatsReport();
    res.json(data);
  });

  app.get(api.reports.enrollmentExport.path, async (req, res) => {
    if (!isAdmin(req)) return res.sendStatus(403);
    try {
      const allCourses = await storage.listCourses();
      const rows: any[] = [];
      for (const course of allCourses) {
        const enrollmentsList = await storage.listEnrollmentsByCourse(course.id);
        for (const e of enrollmentsList) {
          rows.push({
            Curso: course.title,
            Categoria: course.category,
            Estudiante: e.user.displayName || e.user.username,
            Estado: e.status,
            Calificacion: e.grade || "",
            FechaInscripcion: e.enrolledAt,
            FechaCompletado: e.completedAt || "",
          });
        }
      }
      // Return as CSV
      if (rows.length === 0) return res.status(200).send("Sin datos");
      const headers = Object.keys(rows[0]);
      const csv = [headers.join(","), ...rows.map(r => headers.map(h => `"${String(r[h]).replace(/"/g, '""')}"`).join(","))].join("\n");
      res.setHeader("Content-Type", "text/csv; charset=utf-8");
      res.setHeader("Content-Disposition", "attachment; filename=inscripciones.csv");
      res.send("\uFEFF" + csv); // BOM for Excel
    } catch (err) {
      console.error("Export error:", err);
      res.sendStatus(500);
    }
  });

  // Live Events Report
  app.get(api.reports.liveEvents.path, async (req, res) => {
    if (!isAdmin(req)) return res.sendStatus(403);
    try {
      const data = await storage.getLiveEventReport();
      res.json(data);
    } catch (err) {
      console.error("Live events report error:", err);
      res.json({ sessions: [], summary: { totalSessions: 0, activeSessions: 0, totalDuration: 0, avgDuration: 0 } });
    }
  });

  // Live Events Export CSV (va antes que /:sessionId: si no, "export" se tomaba como
  // número de sesión y el botón Exportar de Reportes respondía 400).
  app.get(api.reports.liveEventExport.path, async (req, res) => {
    if (!isAdmin(req)) return res.sendStatus(403);
    try {
      const data = await storage.getLiveEventReport();
      const rows = data.sessions.map((s: any) => ({
        Titulo: s.title,
        Tipo: s.contextLabel,
        Responsable: s.creatorName,
        "Fecha Inicio": s.startedAt ? new Date(s.startedAt).toLocaleString("es") : "",
        "Fecha Fin": s.endedAt ? new Date(s.endedAt).toLocaleString("es") : "Activa",
        "Duracion (min)": s.durationMinutes || 0,
        "Conectados Unicos": s.uniqueAttendees,
        "Total Conexiones": s.totalConnections,
        "Pico Conectados": s.peakViewers,
        Estado: s.status === "active" ? "Activa" : "Finalizada",
      }));
      if (rows.length === 0) return res.status(200).send("Sin datos");
      const headers = Object.keys(rows[0]);
      const csv = [headers.join(","), ...rows.map((r: any) => headers.map(h => `"${String(r[h]).replace(/"/g, '""')}"`).join(","))].join("\n");
      res.setHeader("Content-Type", "text/csv; charset=utf-8");
      res.setHeader("Content-Disposition", "attachment; filename=eventos_en_vivo.csv");
      res.send("\uFEFF" + csv);
    } catch (err) {
      console.error("Live events export error:", err);
      res.sendStatus(500);
    }
  });

  // Live Event Session Detail
  app.get(api.reports.liveEventDetail.path, async (req, res) => {
    if (!isAdmin(req)) return res.sendStatus(403);
    try {
      const sessionId = parseInt(req.params.sessionId);
      const data = await storage.getLiveEventSessionDetail(sessionId);
      if (!data) return res.sendStatus(404);
      res.json(data);
    } catch (err) {
      console.error("Live event detail error:", err);
      res.sendStatus(500);
    }
  });

  // ========== SERMONS ==========
  app.get(api.sermons.list.path, async (req, res) => {
    const { category, preacherId, series, search } = req.query;
    const list = await storage.listSermons({
      category: category as string,
      preacherId: preacherId ? parseInt(preacherId as string) : undefined,
      series: series as string,
      search: search as string,
    });
    res.json(list);
  });

  app.get(api.sermons.get.path, async (req, res) => {
    const sermon = await storage.getSermon(parseInt(req.params.id));
    if (!sermon) return res.sendStatus(404);
    res.json(sermon);
  });

  app.post(api.sermons.create.path, async (req, res) => {
    if (!isTeacherOrAdmin(req)) return res.sendStatus(403);
    try {
      const input = api.sermons.create.input.parse(req.body);
      const sermon = await storage.createSermon({ ...input, createdBy: req.user!.id });
      res.status(201).json(sermon);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.issues[0].message });
      res.sendStatus(500);
    }
  });

  app.patch(api.sermons.update.path, async (req, res) => {
    if (!isTeacherOrAdmin(req)) return res.sendStatus(403);
    try {
      const input = api.sermons.update.input.parse(req.body);
      const updated = await storage.updateSermon(parseInt(req.params.id), input);
      if (!updated) return res.sendStatus(404);
      res.json(updated);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.issues[0].message });
      res.sendStatus(500);
    }
  });

  app.delete(api.sermons.delete.path, async (req, res) => {
    if (!isTeacherOrAdmin(req)) return res.sendStatus(403);
    await storage.deleteSermon(parseInt(req.params.id));
    res.json({ success: true });
  });

  app.get(api.sermons.notes.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const notes = await storage.listSermonNotes(parseInt(req.params.id), req.user!.id);
    res.json(notes);
  });

  app.post(api.sermons.saveNote.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    try {
      const input = api.sermons.saveNote.input.parse({ ...req.body, sermonId: parseInt(req.params.id) });
      const note = await storage.createSermonNote(req.user!.id, input);
      res.status(201).json(note);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.issues[0].message });
      res.sendStatus(500);
    }
  });

  app.delete(api.sermons.deleteNote.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    await storage.deleteSermonNote(parseInt(req.params.id), req.user!.id);
    res.json({ success: true });
  });

  // ========== SMALL GROUPS ==========
  app.get(api.smallGroups.list.path, async (_req, res) => {
    const groups = await storage.listSmallGroups();
    res.json(groups);
  });

  app.get(api.smallGroups.get.path, async (req, res) => {
    const group = await storage.getSmallGroup(parseInt(req.params.id));
    if (!group) return res.sendStatus(404);
    res.json(group);
  });

  app.post(api.smallGroups.create.path, async (req, res) => {
    if (!isTeacherOrAdmin(req)) return res.sendStatus(403);
    try {
      const input = api.smallGroups.create.input.parse(req.body);
      const group = await storage.createSmallGroup(input);
      res.status(201).json(group);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.issues[0].message });
      res.sendStatus(500);
    }
  });

  app.patch(api.smallGroups.update.path, async (req, res) => {
    if (!isTeacherOrAdmin(req)) return res.sendStatus(403);
    try {
      const input = api.smallGroups.update.input.parse(req.body);
      const updated = await storage.updateSmallGroup(parseInt(req.params.id), input);
      if (!updated) return res.sendStatus(404);
      res.json(updated);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.issues[0].message });
      res.sendStatus(500);
    }
  });

  app.delete(api.smallGroups.delete.path, async (req, res) => {
    if (!isAdmin(req)) return res.sendStatus(403);
    await storage.deleteSmallGroup(parseInt(req.params.id));
    res.json({ success: true });
  });

  app.post(api.smallGroups.join.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const member = await storage.joinSmallGroup(parseInt(req.params.id), req.user!.id);
    res.json(member);
  });

  app.delete(api.smallGroups.leave.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    await storage.leaveSmallGroup(parseInt(req.params.id), req.user!.id);
    res.json({ success: true });
  });

  app.get(api.smallGroups.members.path, async (req, res) => {
    const members = await storage.listSmallGroupMembers(parseInt(req.params.id));
    res.json(members);
  });

  app.get(api.smallGroups.meetings.path, async (req, res) => {
    const meetings = await storage.listSmallGroupMeetings(parseInt(req.params.id));
    res.json(meetings);
  });

  app.post(api.smallGroups.createMeeting.path, async (req, res) => {
    if (!isTeacherOrAdmin(req)) return res.sendStatus(403);
    try {
      const input = api.smallGroups.createMeeting.input.parse({ ...req.body, groupId: parseInt(req.params.id) });
      const meeting = await storage.createSmallGroupMeeting(input);
      res.status(201).json(meeting);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.issues[0].message });
      res.sendStatus(500);
    }
  });

  async function isSmallGroupMember(req: Request, groupId: number): Promise<boolean> {
    if (isAdmin(req)) return true;
    const members = await storage.listSmallGroupMembers(groupId);
    return members.some((m) => m.userId === req.user!.id);
  }

  app.get(api.smallGroups.messages.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (!(await isSmallGroupMember(req, parseInt(req.params.id)))) {
      return res.status(403).json({ message: "Únete al grupo para ver sus mensajes" });
    }
    const msgs = await storage.listSmallGroupMessages(parseInt(req.params.id));
    res.json(msgs);
  });

  app.post(api.smallGroups.sendMessage.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (!(await isSmallGroupMember(req, parseInt(req.params.id)))) {
      return res.status(403).json({ message: "Únete al grupo para escribir en él" });
    }
    try {
      const input = api.smallGroups.sendMessage.input.parse({ ...req.body, groupId: parseInt(req.params.id) });
      const msg = await storage.sendSmallGroupMessage(req.user!.id, input);
      res.status(201).json(msg);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.issues[0].message });
      res.sendStatus(500);
    }
  });

  // ========== CALENDAR ==========
  app.get(api.calendar.events.path, async (req, res) => {
    const { start, end } = req.query;
    const items = await storage.getCalendarEvents(start as string, end as string);
    res.json(items);
  });

  // ========== REFORMA MINISTERIAL: NUEVAS RUTAS ==========

  // --- Teacher Profiles ---
  app.get("/api/teacher-profiles", async (req, res) => {
    const profiles = await storage.listTeacherProfiles();
    res.json(profiles);
  });

  app.get("/api/teacher-profiles/:userId", async (req, res) => {
    const profile = await storage.getTeacherProfile(parseInt(req.params.userId));
    if (!profile) return res.sendStatus(404);
    res.json(profile);
  });

  app.post("/api/teacher-profiles", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    try {
      const existing = await storage.getTeacherProfile(req.user!.id);
      if (existing) return res.status(400).json({ message: "Ya tienes una ficha ministerial" });
      const profile = await storage.createTeacherProfile(req.user!.id, req.body);
      await storage.createAuditLog({ userId: req.user!.id, action: "create", entityType: "teacher_profile", entityId: profile.id });
      res.status(201).json(profile);
    } catch (err) {
      res.sendStatus(500);
    }
  });

  app.patch("/api/teacher-profiles/:userId", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const targetUserId = parseInt(req.params.userId);
    if (targetUserId !== req.user!.id && !isAdmin(req)) return res.sendStatus(403);
    const profile = await storage.updateTeacherProfile(targetUserId, req.body);
    if (!profile) return res.sendStatus(404);
    res.json(profile);
  });

  app.post("/api/teacher-profiles/:userId/approve", async (req, res) => {
    if (!isAdmin(req)) return res.sendStatus(403);
    const profile = await storage.approveTeacherProfile(parseInt(req.params.userId), req.user!.id);
    if (!profile) return res.sendStatus(404);
    await storage.createAuditLog({ userId: req.user!.id, action: "approve", entityType: "teacher_profile", entityId: profile.id });
    res.json(profile);
  });

  // --- Alliance Requests ---
  app.get("/api/alliance-requests", async (req, res) => {
    if (!isAdmin(req)) return res.sendStatus(403);
    const requests = await storage.listAllianceRequests();
    res.json(requests);
  });

  app.post("/api/alliance-requests", async (req, res) => {
    try {
      const { insertAllianceRequestSchema } = await import("@shared/schema");
      const data = insertAllianceRequestSchema.parse(req.body);
      const request = await storage.createAllianceRequest(data);
      res.status(201).json(request);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.issues[0].message });
      res.sendStatus(500);
    }
  });

  app.patch("/api/alliance-requests/:id", async (req, res) => {
    if (!isAdmin(req)) return res.sendStatus(403);
    try {
      const { updateAllianceRequestSchema } = await import("@shared/schema");
      const data = updateAllianceRequestSchema.parse(req.body);
      const request = await storage.updateAllianceRequest(parseInt(req.params.id), data, req.user!.id);
      if (!request) return res.sendStatus(404);
      await storage.createAuditLog({ userId: req.user!.id, action: "review_alliance", entityType: "alliance_request", entityId: request.id, details: data.status });
      res.json(request);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.issues[0].message });
      res.sendStatus(500);
    }
  });

  // --- Church Permissions ---
  app.get("/api/churches/:churchId/permissions", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const churchId = parseInt(req.params.churchId);
    if (!isAdmin(req) && !isChurchAdmin(req, churchId)) return res.sendStatus(403);
    const perms = await storage.getChurchPermissions(churchId);
    res.json(perms);
  });

  app.post("/api/churches/:churchId/permissions", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const churchId = parseInt(req.params.churchId);
    if (!isAdmin(req) && !isChurchAdmin(req, churchId)) return res.sendStatus(403);
    try {
      const perm = await storage.setChurchPermission({ ...req.body, churchId }, req.user!.id);
      await storage.createAuditLog({ userId: req.user!.id, action: "set_permission", entityType: "church_permission", entityId: perm.id });
      res.status(201).json(perm);
    } catch (err) {
      res.sendStatus(500);
    }
  });

  app.delete("/api/churches/:churchId/permissions/:userId", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const churchId = parseInt(req.params.churchId);
    if (!isAdmin(req) && !isChurchAdmin(req, churchId)) return res.sendStatus(403);
    await storage.removeChurchPermission(parseInt(req.params.userId), churchId);
    res.sendStatus(204);
  });

  // --- Church Dashboard & Members ---
  app.get("/api/churches/:churchId/dashboard", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const churchId = parseInt(req.params.churchId);
    if (!isAdmin(req) && !isChurchAdmin(req, churchId)) return res.sendStatus(403);
    const dashboard = await storage.getChurchDashboard(churchId);
    res.json(dashboard);
  });

  app.get("/api/churches/:churchId/members", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const churchId = parseInt(req.params.churchId);
    if (!isAdmin(req) && !isChurchAdmin(req, churchId)) return res.sendStatus(403);
    const members = await storage.getChurchMembers(churchId);
    res.json(members);
  });

  // --- Member Channeling ---
  app.post("/api/member-channeling", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    try {
      const { insertMemberChannelingSchema } = await import("@shared/schema");
      const data = insertMemberChannelingSchema.parse(req.body);
      const channeling = await storage.createMemberChanneling(req.user!.id, data);
      await storage.createAuditLog({ userId: req.user!.id, action: "request_channeling", entityType: "member_channeling", entityId: channeling.id });
      res.status(201).json(channeling);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.issues[0].message });
      res.sendStatus(500);
    }
  });

  app.get("/api/member-channeling", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const churchId = req.query.churchId ? parseInt(req.query.churchId as string) : undefined;
    if (churchId && !isAdmin(req) && !isChurchAdmin(req, churchId)) return res.sendStatus(403);
    if (!churchId && !isAdmin(req)) return res.sendStatus(403);
    const channelings = await storage.listMemberChannelings(churchId);
    res.json(channelings);
  });

  app.patch("/api/member-channeling/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (!isAdmin(req) && !isTeacherOrAdmin(req)) return res.sendStatus(403);
    const { status } = req.body;
    if (!["aprobado", "rechazado"].includes(status)) return res.status(400).json({ message: "Estado inválido" });
    const channeling = await storage.resolveMemberChanneling(parseInt(req.params.id), status, req.user!.id);
    if (!channeling) return res.sendStatus(404);
    await storage.createAuditLog({ userId: req.user!.id, action: "resolve_channeling", entityType: "member_channeling", entityId: channeling.id, details: status });
    res.json(channeling);
  });

  // --- Course Teacher Assignments ---
  app.get("/api/courses/:courseId/teacher-assignments", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const assignments = await storage.listCourseTeacherAssignments(parseInt(req.params.courseId));
    res.json(assignments);
  });

  app.post("/api/courses/:courseId/teacher-assignments", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (!isTeacherOrAdmin(req)) return res.sendStatus(403);
    try {
      const { insertCourseTeacherAssignmentSchema } = await import("@shared/schema");
      const data = insertCourseTeacherAssignmentSchema.parse({ ...req.body, courseId: parseInt(req.params.courseId) });
      const assignment = await storage.createCourseTeacherAssignment(data, req.user!.id);
      res.status(201).json(assignment);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.issues[0].message });
      res.sendStatus(500);
    }
  });

  app.patch("/api/course-teacher-assignments/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (!isTeacherOrAdmin(req)) return res.sendStatus(403);
    try {
      const { updateCourseTeacherAssignmentSchema } = await import("@shared/schema");
      const data = updateCourseTeacherAssignmentSchema.parse(req.body);
      const assignment = await storage.updateCourseTeacherAssignment(parseInt(req.params.id), data, req.user!.id);
      if (!assignment) return res.sendStatus(404);
      res.json(assignment);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.issues[0].message });
      res.sendStatus(500);
    }
  });

  // --- Audit Log ---
  app.get("/api/audit-logs", async (req, res) => {
    if (!isAdmin(req)) return res.sendStatus(403);
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 100;
    const logs = await storage.listAuditLogs(limit);
    res.json(logs);
  });

  // --- Member Progress / Badges ---
  app.get("/api/badges/:userId", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const badges = await storage.getUserBadges(parseInt(req.params.userId));
    res.json(badges);
  });

  // --- Active Churches (public, for "Buscar Iglesia") ---
  app.get("/api/churches/active", async (_req, res) => {
    const allChurches = await storage.listMinistryChurches();
    const activeAllied = allChurches.filter((c: any) => c.isActive && (c.churchType === "aliada" || c.allianceStatus === "activa"));
    res.json(activeAllied);
  });

  return httpServer;
}
