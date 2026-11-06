import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { renderPageHtml } from "./seo";

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  // Serve static assets with aggressive caching (Vite hashes filenames)
  app.use("/assets", express.static(path.join(distPath, "assets"), {
    maxAge: "1y",         // Cache hashed assets for 1 year
    immutable: true,      // These files never change (hashed names)
    etag: true,
    // Un archivo de una versión anterior que ya no existe responde 404 y no la
    // página: si no, el navegador y el service worker guardaban HTML como si fuera .js/.css.
    fallthrough: false,
  }));

  // Serve icons, manifest, SW with moderate caching
  app.use("/icons", express.static(path.join(distPath, "icons"), {
    maxAge: "7d",
    etag: true,
  }));

  // Service Worker MUST never be cached — browser needs to always check for updates
  app.use("/sw.js", (_req, res) => {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.sendFile(path.join(distPath, "sw.js"));
  });

  // Other static files
  app.use(express.static(distPath, {
    maxAge: "1h",         // Short cache for manifest, favicon, etc.
    etag: true,
    // La portada "/" la sirve el respaldo de abajo con no-cache, como las demás
    // páginas. Con max-age=1h la portada (y la app instalada) seguían mostrando la
    // versión vieja hasta una hora después de cada publicación.
    index: false,
  }));

  // fall through to index.html if the file doesn't exist (SPA routing).
  // Cada ruta sale con su canónica, título y descripción (server/seo.ts).
  const indexHtml = fs.readFileSync(path.resolve(distPath, "index.html"), "utf-8");
  app.use("/{*path}", (req, res) => {
    res.setHeader("Cache-Control", "no-cache");
    // req.path aquí siempre es "/" (app.use quita lo que coincide con /{*path}): usar la URL completa.
    res.type("html").send(renderPageHtml(indexHtml, req.originalUrl));
  });
}
