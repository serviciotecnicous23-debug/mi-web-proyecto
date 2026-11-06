// Vista previa de enlaces: título, canal o autor, miniatura y reproductor de lo que se
// comparte (YouTube, Instagram, TikTok, una página cualquiera...). El servidor la pide
// por la persona y la guarda un día en memoria.
//
// Seguridad: solo http/https a los puertos 80 y 443, y nunca a direcciones internas
// (localhost, 10.x, 192.168.x, la red de Render...). La dirección se comprueba en el
// momento de conectar, también en cada redirección, para que nadie use esto para entrar
// a la red interna del servidor.
import http from "node:http";
import https from "node:https";
import dns from "node:dns";
import net from "node:net";
import { classifyUrl, isShortLink, PROVIDER_LABELS, type MediaInfo, type MediaKind, type MediaProvider, type FileType } from "@shared/media";

export interface LinkPreview {
  url: string;
  finalUrl: string;
  provider: MediaProvider;
  kind: MediaKind;
  title?: string;
  description?: string;
  author?: string;
  authorUrl?: string;
  thumbnail?: string;
  siteName?: string;
  favicon?: string;
  embedUrl?: string;
  aspect: number;
  height?: number;
  fileType?: FileType;
  start?: number;
}

const USER_AGENT = "Mozilla/5.0 (compatible; AvivandoElFuegoBot/1.0; +https://ministerioavivandoelfuego.com)";
const MAX_HTML = 700_000;
const TIMEOUT_MS = 6_000;
const MAX_REDIRECTS = 4;

// ---------- Direcciones prohibidas ----------

export function isPrivateAddress(ip: string): boolean {
  if (net.isIPv4(ip)) {
    const [a, b] = ip.split(".").map(Number);
    return (
      a === 0 || a === 10 || a === 127 || a >= 224 ||
      (a === 100 && b >= 64 && b <= 127) || // CGNAT
      (a === 169 && b === 254) || // enlace local (metadatos de nubes)
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      (a === 192 && b === 0) ||
      (a === 198 && (b === 18 || b === 19))
    );
  }
  if (net.isIPv6(ip)) {
    const v = ip.toLowerCase();
    if (v === "::" || v === "::1") return true;
    const mapped = /^::ffff:(\d+\.\d+\.\d+\.\d+)$/.exec(v);
    if (mapped) return isPrivateAddress(mapped[1]);
    return /^(fe[89ab]|fc|fd|ff)/.test(v) || v.startsWith("64:ff9b:") || v.startsWith("2001:db8");
  }
  return true;
}

const safeLookup = ((hostname: string, options: dns.LookupOptions, callback: (...args: any[]) => void) => {
  dns.lookup(hostname, { ...options, all: true }, (err, addresses) => {
    if (err) return callback(err);
    const list = (Array.isArray(addresses) ? addresses : []) as dns.LookupAddress[];
    if (!list.length || list.some((a) => isPrivateAddress(a.address))) {
      return callback(Object.assign(new Error("Dirección no permitida"), { code: "EBLOCKED" }));
    }
    if (options.all) return callback(null, list);
    callback(null, list[0].address, list[0].family);
  });
}) as unknown as net.LookupFunction;

function checkUrl(raw: string): URL {
  const u = new URL(raw);
  if (u.protocol !== "https:" && u.protocol !== "http:") throw new Error("Solo enlaces web");
  if (u.port && u.port !== "80" && u.port !== "443") throw new Error("Puerto no permitido");
  if (u.username || u.password) throw new Error("Enlace con usuario no permitido");
  const host = u.hostname.replace(/^\[|\]$/g, "");
  if (host === "localhost" || host.endsWith(".localhost") || host.endsWith(".local") || host.endsWith(".internal")) throw new Error("Dirección no permitida");
  if (net.isIP(host) && isPrivateAddress(host)) throw new Error("Dirección no permitida");
  return u;
}

interface FetchResult {
  finalUrl: string;
  status: number;
  contentType: string;
  body: string;
}

function requestOnce(u: URL, accept: string): Promise<http.IncomingMessage> {
  return new Promise((resolve, reject) => {
    const lib = u.protocol === "https:" ? https : http;
    const req = lib.request(
      u,
      {
        method: "GET",
        lookup: safeLookup,
        timeout: TIMEOUT_MS,
        headers: {
          "User-Agent": USER_AGENT,
          Accept: accept,
          "Accept-Language": "es,en;q=0.7",
        },
      },
      resolve,
    );
    req.on("timeout", () => req.destroy(new Error("Tiempo agotado")));
    req.on("error", reject);
    req.end();
  });
}

/** GET con redirecciones seguras; lee como mucho `maxBytes`. */
export async function safeFetch(raw: string, accept = "text/html,application/xhtml+xml,application/json;q=0.9,*/*;q=0.5", maxBytes = MAX_HTML): Promise<FetchResult> {
  let u = checkUrl(raw);
  for (let i = 0; i <= MAX_REDIRECTS; i++) {
    const res = await requestOnce(u, accept);
    const status = res.statusCode || 0;
    if (status >= 300 && status < 400 && res.headers.location) {
      res.resume();
      u = checkUrl(new URL(res.headers.location, u).toString());
      continue;
    }
    const contentType = String(res.headers["content-type"] || "");
    const chunks: Buffer[] = [];
    let size = 0;
    await new Promise<void>((resolve, reject) => {
      res.on("data", (chunk: Buffer) => {
        size += chunk.length;
        if (size > maxBytes) {
          chunks.push(chunk.subarray(0, Math.max(0, chunk.length - (size - maxBytes))));
          res.destroy();
          resolve();
          return;
        }
        chunks.push(chunk);
      });
      res.on("end", () => resolve());
      res.on("close", () => resolve());
      res.on("error", reject);
    });
    return { finalUrl: u.toString(), status, contentType, body: Buffer.concat(chunks).toString("utf8") };
  }
  throw new Error("Demasiadas redirecciones");
}

async function fetchJson(url: string): Promise<any | null> {
  try {
    const r = await safeFetch(url, "application/json", 200_000);
    if (r.status !== 200) return null;
    return JSON.parse(r.body);
  } catch {
    return null;
  }
}

// ---------- Lectura de la página (Open Graph) ----------

const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", "#39": "'" };

function decodeEntities(value: string): string {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => safeChar(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => safeChar(parseInt(dec, 10)))
    .replace(/&([a-z]+|#39);/gi, (m, name) => ENTITIES[name.toLowerCase()] ?? m);
}

function safeChar(code: number): string {
  try {
    return Number.isFinite(code) && code > 0 && code < 0x110000 ? String.fromCodePoint(code) : "";
  } catch {
    return "";
  }
}

function clean(value: string | undefined | null, max: number): string | undefined {
  if (!value) return undefined;
  const text = decodeEntities(value).replace(/\s+/g, " ").trim();
  if (!text) return undefined;
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}

function absolute(value: string | undefined, base: string): string | undefined {
  if (!value) return undefined;
  try {
    const u = new URL(decodeEntities(value.trim()), base);
    return u.protocol === "https:" || u.protocol === "http:" ? u.toString() : undefined;
  } catch {
    return undefined;
  }
}

export function parseHtmlMeta(html: string, baseUrl: string) {
  const head = html.slice(0, 400_000);
  const meta: Record<string, string> = {};
  for (const tag of head.match(/<meta\b[^>]*>/gi) || []) {
    const key = /\b(?:property|name|itemprop)\s*=\s*["']([^"']+)["']/i.exec(tag)?.[1]?.toLowerCase();
    const content = /\bcontent\s*=\s*"([^"]*)"/i.exec(tag)?.[1] ?? /\bcontent\s*=\s*'([^']*)'/i.exec(tag)?.[1];
    if (key && content != null && !(key in meta)) meta[key] = content;
  }
  const title = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(head)?.[1];
  let icon: string | undefined;
  for (const tag of head.match(/<link\b[^>]*>/gi) || []) {
    const rel = /\brel\s*=\s*["']([^"']+)["']/i.exec(tag)?.[1]?.toLowerCase() || "";
    if (/(^|\s)(icon|apple-touch-icon)(\s|$)/.test(rel)) {
      icon = /\bhref\s*=\s*["']([^"']+)["']/i.exec(tag)?.[1];
      if (rel.includes("apple-touch-icon")) break;
    }
  }
  return {
    title: clean(meta["og:title"] || meta["twitter:title"] || title, 200),
    description: clean(meta["og:description"] || meta["twitter:description"] || meta["description"], 300),
    image: absolute(meta["og:image:secure_url"] || meta["og:image"] || meta["twitter:image"] || meta["twitter:image:src"], baseUrl),
    siteName: clean(meta["og:site_name"] || meta["application-name"], 80),
    author: clean(meta["author"] || meta["article:author"], 120),
    video: absolute(meta["og:video:secure_url"] || meta["og:video:url"] || meta["og:video"], baseUrl),
    favicon: absolute(icon || "/favicon.ico", baseUrl),
  };
}

// ---------- oEmbed de cada plataforma ----------

function oembedUrl(info: MediaInfo, url: string): string | null {
  const e = encodeURIComponent(url);
  switch (info.provider) {
    case "youtube":
      return info.id && info.kind === "video" ? `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(`https://www.youtube.com/watch?v=${info.id}`)}` : null;
    case "vimeo":
      return `https://vimeo.com/api/oembed.json?url=${e}`;
    case "tiktok":
      return `https://www.tiktok.com/oembed?url=${e}`;
    case "spotify":
      return `https://open.spotify.com/oembed?url=${e}`;
    case "soundcloud":
      return `https://soundcloud.com/oembed?format=json&url=${e}`;
    case "x":
      return `https://publish.twitter.com/oembed?omit_script=1&dnt=true&lang=es&url=${e}`;
    case "dailymotion":
      return `https://www.dailymotion.com/services/oembed?url=${e}`;
    default:
      return null;
  }
}

function stripHtml(html: string): string {
  return decodeEntities(html.replace(/<br\s*\/?>/gi, " ").replace(/<[^>]+>/g, " "));
}

/** Títulos genéricos que ponen las redes cuando no dejan ver la publicación. */
function isGenericTitle(title: string | undefined, provider: MediaProvider): boolean {
  if (!title) return true;
  const t = title.toLowerCase().trim();
  return ["instagram", "facebook", "tiktok", "tiktok - make your day", "log in or sign up to view", "iniciar sesión", "inicia sesión en facebook", "error", "x"].includes(t)
    || (provider === "facebook" && /^(facebook|log ?in|inicia)/i.test(t));
}

async function buildPreview(rawUrl: string): Promise<LinkPreview> {
  let info = classifyUrl(rawUrl);
  if (!info) throw new Error("Enlace no válido");
  let finalUrl = info.url;

  // Enlace corto (vm.tiktok.com, fb.watch, bit.ly...): se sigue para saber a dónde va.
  if (isShortLink(finalUrl) || (info.provider === "tiktok" && !info.embedUrl)) {
    try {
      const r = await safeFetch(finalUrl, "text/html", 64_000);
      if (r.finalUrl && r.finalUrl !== finalUrl) {
        const again = classifyUrl(r.finalUrl);
        if (again) {
          info = again;
          finalUrl = again.url;
        }
      }
    } catch {
      /* se queda con lo que hay */
    }
  }

  const preview: LinkPreview = {
    url: rawUrl,
    finalUrl,
    provider: info.provider,
    kind: info.kind,
    embedUrl: info.embedUrl,
    thumbnail: info.thumbnail,
    aspect: info.aspect,
    height: info.height,
    fileType: info.fileType,
    start: info.start,
    author: info.handle,
    siteName: info.provider !== "web" && info.provider !== "file" ? PROVIDER_LABELS[info.provider] : undefined,
  };

  // Archivos directos: no hace falta leer nada.
  if (info.provider === "file") {
    const name = decodeURIComponent(new URL(finalUrl, "https://x.invalid").pathname.split("/").pop() || "");
    preview.title = clean(name, 160);
    return preview;
  }

  const oembed = oembedUrl(info, finalUrl);
  if (oembed) {
    const data = await fetchJson(oembed);
    if (data) {
      preview.title = clean(data.title, 200) || preview.title;
      preview.author = clean(data.author_name, 120) || preview.author;
      preview.authorUrl = absolute(data.author_url, finalUrl);
      preview.thumbnail = absolute(data.thumbnail_url, finalUrl) || preview.thumbnail;
      if (info.provider === "x" && typeof data.html === "string") {
        preview.description = clean(stripHtml(data.html).replace(/—\s*[^—]*$/, ""), 280);
      }
      if (info.provider === "tiktok" && typeof data.html === "string" && !preview.embedUrl) {
        const id = /data-video-id="(\d+)"/.exec(data.html)?.[1];
        if (id) {
          preview.embedUrl = `https://www.tiktok.com/player/v1/${id}?autoplay=1&music_info=1&description=1&rel=0`;
          preview.kind = "video";
        }
      }
      if (info.provider === "vimeo" && data.width && data.height) {
        preview.aspect = Number(data.width) / Number(data.height) || preview.aspect;
      }
      if (preview.title || preview.thumbnail) return preview;
    }
  }

  // Página normal (o red sin oEmbed abierto: Instagram, Facebook, Drive...).
  try {
    const r = await safeFetch(finalUrl);
    if (r.status >= 200 && r.status < 400 && /html|xml/i.test(r.contentType)) {
      const m = parseHtmlMeta(r.body, r.finalUrl);
      if (info.provider === "facebook" && m.title) {
        // "806 mil reproducciones · 2,3 mil veces compartido | Texto del video | Página"
        const parts = m.title.split(" | ").filter((p) => !/\b(reproducciones|visualizaciones|views|reacciones|reactions|compartido|shares|comentarios|comments)\b/i.test(p));
        m.title = parts.join(" | ") || undefined;
      }
      const genericTitle = isGenericTitle(m.title, info.provider);
      preview.title = (!genericTitle && m.title) || preview.title;
      preview.description = (!genericTitle && m.description) || preview.description;
      preview.thumbnail = preview.thumbnail || m.image;
      preview.siteName = preview.siteName || m.siteName || new URL(r.finalUrl).hostname.replace(/^www\./, "");
      preview.author = preview.author || m.author;
      preview.favicon = m.favicon;
      if (preview.title && (info.provider === "drive" || info.provider === "docs" || info.provider === "sheets" || info.provider === "slides")) {
        preview.title = preview.title.replace(/\s+-\s+Google (Drive|Docs|Sheets|Slides|Documentos|Hojas de cálculo|Presentaciones)$/i, "");
      }
      // Una página que trae su propio video directo (mp4) se puede reproducir aquí.
      if (info.provider === "web" && m.video && /\.(mp4|webm|m3u8)(\?|$)/i.test(m.video)) {
        preview.kind = "video";
        preview.embedUrl = m.video;
        preview.fileType = "video";
      }
    }
  } catch {
    /* sin datos: la tarjeta muestra la marca y el dominio */
  }
  if (!preview.siteName) {
    try {
      preview.siteName = new URL(finalUrl).hostname.replace(/^www\./, "");
    } catch {
      /* nada */
    }
  }
  return preview;
}

// ---------- Memoria (un día; los fallos, una hora) ----------

const cache = new Map<string, { value: LinkPreview; expires: number }>();
const pending = new Map<string, Promise<LinkPreview>>();
const MAX_CACHE = 3000;

export async function getLinkPreview(rawUrl: string): Promise<LinkPreview> {
  const key = rawUrl.trim();
  const hit = cache.get(key);
  if (hit && hit.expires > Date.now()) return hit.value;
  const inFlight = pending.get(key);
  if (inFlight) return inFlight;
  const job = buildPreview(key)
    .then((value) => {
      const ok = !!(value.title || value.thumbnail || value.embedUrl);
      cache.set(key, { value, expires: Date.now() + (ok ? 24 : 1) * 3600_000 });
      if (cache.size > MAX_CACHE) {
        const oldest = cache.keys().next().value;
        if (oldest) cache.delete(oldest);
      }
      return value;
    })
    .finally(() => pending.delete(key));
  pending.set(key, job);
  return job;
}

/** Varias a la vez, de 4 en 4, para no lanzar 20 conexiones de golpe. */
export async function getLinkPreviews(urls: string[]): Promise<Record<string, LinkPreview | null>> {
  const out: Record<string, LinkPreview | null> = {};
  const queue = [...new Set(urls)];
  async function worker() {
    for (;;) {
      const url = queue.shift();
      if (!url) return;
      try {
        out[url] = await getLinkPreview(url);
      } catch {
        out[url] = null;
      }
    }
  }
  await Promise.all([worker(), worker(), worker(), worker()]);
  return out;
}

export function isValidPreviewUrl(value: unknown): value is string {
  if (typeof value !== "string" || value.length > 2048) return false;
  try {
    checkUrl(value);
    return true;
  } catch {
    return false;
  }
}
