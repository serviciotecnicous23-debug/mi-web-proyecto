import * as Sentry from "@sentry/node";
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { ensureDatabaseSchema } from "./ensure-schema";
import { checkEnrollmentSchedules } from "./storage";
import { createServer } from "http";
import path from "path";
import { startBackupScheduler } from "./backup";
import compression from "compression";
import helmet from "helmet";

// ========== VERSIÓN DE NODE.JS ==========
// Primeras versiones con el parche de seguridad de octubre de 2026 (fallo Brotli
// CVE-2026-111497, explotado activamente). Node 20 ya no recibe parches.
// En Render la versión la decide NODE_VERSION (render.yaml / panel del servicio).
const PATCHED_NODE: Record<number, [number, number]> = { 22: [23, 4], 24: [22, 1], 26: [12, 1] };
{
  const [major, minor, patch] = process.versions.node.split(".").map(Number);
  const floor = PATCHED_NODE[major];
  const patched = floor
    ? minor > floor[0] || (minor === floor[0] && patch >= floor[1])
    : major > 26;
  if (!patched) {
    console.error(
      `⚠ Node.js ${process.version} tiene fallos de seguridad sin parche. ` +
      "Pon NODE_VERSION=24 en Render (Environment) y vuelve a desplegar.",
    );
  }
}

// ========== SENTRY ERROR MONITORING ==========
if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV || "development",
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.2 : 1.0,
    integrations: [
      Sentry.httpIntegration(),
      Sentry.expressIntegration(),
    ],
    // Don't send PII by default
    sendDefaultPii: false,
  });
  console.log("[sentry] Server monitoring initialized");
}

const app = express();
const httpServer = createServer(app);

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

// ========== TRUST PROXY ==========
// Must be set BEFORE any middleware that depends on it (session, rate-limit)
// Required for Render, Codespaces, and any reverse proxy environment
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

// ========== COMPRESSION (gzip) ==========
// Reduces response sizes by ~70%, much faster page loads
app.use(compression() as unknown as express.RequestHandler);

// ========== SECURITY HEADERS (helmet) ==========
const videoFrameSources = [
  "'self'",
  // YouTube
  "https://www.youtube.com",
  "https://youtube.com",
  "https://*.youtube.com",
  "https://www.youtube-nocookie.com",
  "https://*.youtube-nocookie.com",
  "https://*.ytimg.com",
  "https://*.googlevideo.com",
  // Facebook
  "https://www.facebook.com",
  "https://web.facebook.com",
  "https://*.facebook.com",
  "https://*.fbcdn.net",
  "https://*.facebook.net",
  // TikTok
  "https://www.tiktok.com",
  "https://*.tiktok.com",
  "https://*.tiktokcdn.com",
  // Other platforms
  "https://player.vimeo.com",
  "https://zoom.us",
  "https://*.zoom.us",
  "https://meet.google.com",
  "https://teams.microsoft.com",
  // Jitsi Meet (Sala en Vivo)
  "https://meet.jit.si",
  "https://*.jitsi.net",
  "https://8x8.vc",
];
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://www.youtube.com", "https://*.facebook.com", "https://*.facebook.net", "https://meet.jit.si"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
      imgSrc: ["'self'", "data:", "blob:", "https:"],
      connectSrc: ["'self'", "https:", "wss:"],
      mediaSrc: ["'self'", "https:", "blob:"],
      frameSrc: videoFrameSources,
      childSrc: videoFrameSources,
      workerSrc: ["'self'", "blob:"],
    },
  },
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: false,
  crossOriginOpenerPolicy: false,
}));

// Servir archivos estáticos de uploads (avatares, regiones, biblioteca, etc.)
app.use("/uploads", express.static(path.join(process.cwd(), "uploads"), {
  maxAge: "7d", // Cache uploaded files for 7 days
  etag: true,
}));

// inflate: false → se rechazan (415) los cuerpos comprimidos (gzip/deflate/br).
// Los navegadores nunca los envían, y descomprimir lo que manda un extraño es justo
// la vía del fallo Brotli de Node.js (CVE-2026-111497) y del DoS de body-parser
// (CVE-2026-111181).
app.use(
  express.json({
      // increase limit so that base64-encoded file uploads (used by materials, cartelera, etc.)
      // do not trigger a 413 payload-too-large error. 20MB files expand to ~27MB in JSON.
      limit: "30mb",
      inflate: false,
      verify: (req, _res, buf) => {
        req.rawBody = buf;
      },
    }),
);

// also bump urlencoded since we occasionally send larger form bodies
app.use(express.urlencoded({ extended: false, limit: "30mb", inflate: false }));

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      // En producción no se copia el cuerpo de la respuesta al log: lleva correos,
      // teléfonos y datos de miembros. En desarrollo, solo un recorte.
      if (capturedJsonResponse && process.env.NODE_ENV !== "production") {
        const body = JSON.stringify(capturedJsonResponse);
        logLine += ` :: ${body.length > 300 ? `${body.slice(0, 300)}…` : body}`;
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  // Ensure all database tables and columns exist before starting
  await ensureDatabaseSchema();

  await registerRoutes(httpServer, app);

  // Sentry error handler must be registered after all routes but before custom error handler
  if (process.env.SENTRY_DSN) {
    Sentry.setupExpressErrorHandler(app);
  }

  app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    console.error("Internal Server Error:", err);

    if (res.headersSent) {
      return next(err);
    }

    return res.status(status).json({ message });
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || "5000", 10);
  const host = process.env.HOST || "0.0.0.0";
  const listenOptions: { port: number; host: string; reusePort?: boolean } = {
    port,
    host,
  };

  if (process.platform !== "win32") {
    listenOptions.reusePort = true;
  }

  httpServer.listen(
    listenOptions,
    () => {
      log(`serving on port ${port}`);

      // Check enrollment schedules on startup and every 5 minutes
      checkEnrollmentSchedules();
      setInterval(checkEnrollmentSchedules, 5 * 60 * 1000);

      // Start automated backup scheduler
      startBackupScheduler();
    },
  );
})();
