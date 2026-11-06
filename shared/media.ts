// Reconoce enlaces y archivos para mostrarlos como reproductores o tarjetas, no como un
// enlace suelto: YouTube, Instagram, Facebook, TikTok, Vimeo, Spotify, SoundCloud, X,
// Twitch, Dailymotion, Google Drive/Docs, Dropbox y archivos directos (PDF, Word, audio...).
// Lo usan el servidor (vista previa) y la web (reproductor). Solo funciones puras.

export type MediaProvider =
  | "youtube"
  | "vimeo"
  | "facebook"
  | "instagram"
  | "tiktok"
  | "x"
  | "spotify"
  | "soundcloud"
  | "twitch"
  | "dailymotion"
  | "drive"
  | "docs"
  | "sheets"
  | "slides"
  | "dropbox"
  | "file"
  | "web";

/** Qué es, para elegir cómo mostrarlo. "post" = publicación de una red (foto, texto). */
export type MediaKind = "video" | "audio" | "document" | "image" | "post" | "web";

export type FileType =
  | "pdf"
  | "word"
  | "excel"
  | "powerpoint"
  | "text"
  | "csv"
  | "image"
  | "audio"
  | "video"
  | "archive"
  | "other";

export interface MediaInfo {
  /** El enlace tal como se compartió (normalizado). */
  url: string;
  provider: MediaProvider;
  kind: MediaKind;
  /** Identificador en la plataforma (video, publicación...). */
  id?: string;
  /** Reproductor para mostrar dentro de la página. "{parent}" se cambia por el dominio (Twitch). */
  embedUrl?: string;
  /** Miniatura que se conoce sin preguntar nada (YouTube, Drive). */
  thumbnail?: string;
  /** Ancho / alto del reproductor. */
  aspect: number;
  /** Alto fijo en píxeles para reproductores de audio (Spotify, SoundCloud). */
  height?: number;
  /** Si el enlace es un archivo: de qué tipo. */
  fileType?: FileType;
  /** Segundo en el que empieza (enlaces de YouTube con ?t=). */
  start?: number;
  /** La cuenta que se ve en el enlace (@usuario), por si la red no da el nombre. */
  handle?: string;
}

const WIDE = 16 / 9;
const TALL = 9 / 16;

const EXT_TYPES: Record<string, FileType> = {
  pdf: "pdf",
  doc: "word", docx: "word", odt: "word", rtf: "word",
  xls: "excel", xlsx: "excel", ods: "excel",
  ppt: "powerpoint", pptx: "powerpoint", pps: "powerpoint", ppsx: "powerpoint", odp: "powerpoint",
  txt: "text", md: "text", markdown: "text",
  csv: "csv",
  jpg: "image", jpeg: "image", png: "image", gif: "image", webp: "image", avif: "image", bmp: "image", svg: "image", heic: "image", heif: "image",
  mp3: "audio", m4a: "audio", aac: "audio", ogg: "audio", oga: "audio", opus: "audio", wav: "audio", flac: "audio", weba: "audio",
  mp4: "video", m4v: "video", webm: "video", mov: "video", ogv: "video", "3gp": "video", mkv: "video",
  zip: "archive", rar: "archive", "7z": "archive",
};

/** Extensión en minúsculas, sin punto ("" si no hay). */
export function fileExtension(name: string | null | undefined): string {
  if (!name) return "";
  const clean = name.split(/[?#]/)[0];
  const dot = clean.lastIndexOf(".");
  if (dot < 0 || dot < clean.lastIndexOf("/")) return "";
  return clean.slice(dot + 1).toLowerCase();
}

/** Tipo de archivo por su tipo MIME o, si no se sabe, por la extensión del nombre. */
export function fileTypeOf(name?: string | null, mime?: string | null): FileType {
  const m = (mime || "").toLowerCase().split(";")[0].trim();
  if (m === "application/pdf") return "pdf";
  if (m.includes("wordprocessingml") || m === "application/msword" || m === "application/vnd.oasis.opendocument.text" || m === "application/rtf") return "word";
  if (m.includes("spreadsheetml") || m === "application/vnd.ms-excel" || m === "application/vnd.oasis.opendocument.spreadsheet") return "excel";
  if (m.includes("presentationml") || m === "application/vnd.ms-powerpoint" || m === "application/vnd.oasis.opendocument.presentation") return "powerpoint";
  if (m === "text/csv") return "csv";
  if (m === "text/plain" || m === "text/markdown") return "text";
  if (m.startsWith("image/")) return "image";
  if (m.startsWith("audio/")) return "audio";
  if (m.startsWith("video/")) return "video";
  if (m === "application/zip" || m === "application/x-zip-compressed" || m === "application/vnd.rar" || m === "application/x-7z-compressed") return "archive";
  return EXT_TYPES[fileExtension(name)] || "other";
}

/** Tipo MIME de un data: URL ("" si no lo es). */
export function dataUrlMime(url: string): string {
  const m = /^data:([^;,]+)[;,]/i.exec(url);
  return m ? m[1].toLowerCase() : "";
}

export const FILE_TYPE_LABELS: Record<FileType, string> = {
  pdf: "PDF",
  word: "Documento de Word",
  excel: "Hoja de cálculo",
  powerpoint: "Presentación",
  text: "Texto",
  csv: "Tabla (CSV)",
  image: "Imagen",
  audio: "Audio",
  video: "Video",
  archive: "Archivo comprimido",
  other: "Archivo",
};

export const PROVIDER_LABELS: Record<MediaProvider, string> = {
  youtube: "YouTube",
  vimeo: "Vimeo",
  facebook: "Facebook",
  instagram: "Instagram",
  tiktok: "TikTok",
  x: "X",
  spotify: "Spotify",
  soundcloud: "SoundCloud",
  twitch: "Twitch",
  dailymotion: "Dailymotion",
  drive: "Google Drive",
  docs: "Google Docs",
  sheets: "Hojas de cálculo de Google",
  slides: "Presentaciones de Google",
  dropbox: "Dropbox",
  file: "Archivo",
  web: "Enlace",
};

/** Enlaces cortos que hay que abrir para saber a qué video llevan. */
export function isShortLink(url: string): boolean {
  try {
    const host = new URL(url).hostname.toLowerCase().replace(/^www\./, "");
    if (["vm.tiktok.com", "vt.tiktok.com", "fb.watch", "on.soundcloud.com", "spoti.fi", "t.co", "bit.ly", "tinyurl.com", "goo.gl", "ow.ly", "buff.ly", "rebrand.ly", "cutt.ly", "is.gd", "lnkd.in", "instagr.am"].includes(host)) return true;
    if (host === "tiktok.com" && /^\/t\//.test(new URL(url).pathname)) return true;
    if (host === "facebook.com" && /^\/share\//.test(new URL(url).pathname)) return true;
    return false;
  } catch {
    return false;
  }
}

// ---------- Enlaces dentro de un texto ----------

const URL_IN_TEXT = /\b(?:https?:\/\/|www\.)[^\s<>"'`]+/gi;
const TRAILING = /[.,;:!?¡¿…»"'”’)\]}]+$/;

function trimUrl(raw: string): string {
  let url = raw;
  for (;;) {
    const m = TRAILING.exec(url);
    if (!m) break;
    // Un ")" al final se queda si abre otro "(" dentro (p. ej. Wikipedia).
    let cut = m[0];
    if (cut.startsWith(")") && (url.match(/\(/g) || []).length > (url.match(/\)/g) || []).length - cut.length) {
      cut = cut.slice(1);
      if (!cut) break;
    }
    url = url.slice(0, url.length - cut.length);
    if (!cut) break;
  }
  return url;
}

export interface TextPart {
  type: "text" | "link";
  value: string;
  /** Para "link": el enlace con https:// (los que empiezan por www.). */
  href?: string;
}

/** Parte un texto en trozos de texto y enlaces, en orden. */
export function splitTextWithLinks(text: string): TextPart[] {
  const parts: TextPart[] = [];
  if (!text) return parts;
  let last = 0;
  for (const match of text.matchAll(URL_IN_TEXT)) {
    const start = match.index ?? 0;
    const value = trimUrl(match[0]);
    if (!value || value.length < 8) continue;
    if (start > last) parts.push({ type: "text", value: text.slice(last, start) });
    parts.push({ type: "link", value, href: /^https?:\/\//i.test(value) ? value : `https://${value}` });
    last = start + value.length;
  }
  if (last < text.length) parts.push({ type: "text", value: text.slice(last) });
  return parts;
}

/** Los enlaces de un texto, sin repetir y en el orden en que aparecen. */
export function extractUrls(text: string | null | undefined, max = 10): string[] {
  if (!text) return [];
  const seen = new Set<string>();
  for (const part of splitTextWithLinks(text)) {
    if (part.type === "link" && part.href && !seen.has(part.href)) {
      seen.add(part.href);
      if (seen.size >= max) break;
    }
  }
  return Array.from(seen);
}

// ---------- Plataformas ----------

/** "90", "1m30s", "1h2m3s" → segundos. */
function parseStart(value: string | null): number | undefined {
  if (!value) return undefined;
  if (/^\d+$/.test(value)) return Number(value) || undefined;
  const m = /^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/.exec(value);
  if (!m) return undefined;
  const total = Number(m[1] || 0) * 3600 + Number(m[2] || 0) * 60 + Number(m[3] || 0);
  return total || undefined;
}

function youtube(u: URL, host: string): MediaInfo | null {
  let id: string | null = null;
  let tall = false;
  if (host === "youtu.be") {
    id = u.pathname.split("/")[1] || null;
  } else if (host === "youtube.com" || host === "music.youtube.com" || host === "youtube-nocookie.com") {
    const path = u.pathname;
    const seg = path.split("/").filter(Boolean);
    if (path === "/watch" || path === "/watch/") id = u.searchParams.get("v");
    else if (["shorts", "live", "embed", "v", "e"].includes(seg[0])) {
      id = seg[1] || null;
      tall = seg[0] === "shorts";
    }
    const list = u.searchParams.get("list");
    if (!id && list && /^[\w-]+$/.test(list)) {
      return {
        url: u.toString(),
        provider: "youtube",
        kind: "video",
        id: list,
        embedUrl: `https://www.youtube-nocookie.com/embed/videoseries?list=${list}&autoplay=1&rel=0&playsinline=1`,
        aspect: WIDE,
      };
    }
  } else {
    return null;
  }
  if (!id || !/^[\w-]{11}$/.test(id)) {
    // Canal o página de YouTube: tarjeta con la marca.
    const channel = /^\/(@[\w.-]{2,40})/.exec(u.pathname)?.[1];
    return { url: u.toString(), provider: "youtube", kind: "web", aspect: WIDE, handle: channel };
  }
  const start = parseStart(u.searchParams.get("t") || u.searchParams.get("start"));
  return {
    url: u.toString(),
    provider: "youtube",
    kind: "video",
    id,
    embedUrl: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&hl=es&cc_lang_pref=es${start ? `&start=${start}` : ""}`,
    thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    aspect: tall ? TALL : WIDE,
    start,
  };
}

function vimeo(u: URL, host: string): MediaInfo | null {
  if (host !== "vimeo.com" && host !== "player.vimeo.com") return null;
  const seg = u.pathname.split("/").filter(Boolean);
  const idx = seg.findIndex((s) => /^\d{5,}$/.test(s));
  if (idx < 0) return { url: u.toString(), provider: "vimeo", kind: "web", aspect: WIDE };
  const id = seg[idx];
  const hash = u.searchParams.get("h") || (seg[idx + 1] && /^[0-9a-f]{6,}$/i.test(seg[idx + 1]) ? seg[idx + 1] : "");
  return {
    url: u.toString(),
    provider: "vimeo",
    kind: "video",
    id,
    embedUrl: `https://player.vimeo.com/video/${id}?autoplay=1&dnt=1${hash ? `&h=${hash}` : ""}`,
    aspect: WIDE,
  };
}

function facebook(u: URL, host: string): MediaInfo | null {
  if (!["facebook.com", "fb.com", "fb.watch", "web.facebook.com", "business.facebook.com"].includes(host)) return null;
  const path = u.pathname.toLowerCase();
  const isReel = /^\/reel\//.test(path) || /^\/share\/r\//.test(path);
  const isVideo = host === "fb.watch" || isReel || /\/videos\//.test(path) || /^\/watch/.test(path) || /^\/share\/v\//.test(path) || /^\/[^/]+\/videos/.test(path);
  const href = encodeURIComponent(u.toString());
  if (isVideo) {
    return {
      url: u.toString(),
      provider: "facebook",
      kind: "video",
      embedUrl: `https://www.facebook.com/plugins/video.php?href=${href}&show_text=false&autoplay=true&width=560`,
      aspect: isReel ? TALL : WIDE,
    };
  }
  const isPost = /\/posts\//.test(path) || /^\/permalink\.php/.test(path) || /^\/photo/.test(path) || /^\/share\/p\//.test(path) || /\/story\.php/.test(path);
  if (isPost) {
    return {
      url: u.toString(),
      provider: "facebook",
      kind: "post",
      embedUrl: `https://www.facebook.com/plugins/post.php?href=${href}&show_text=true&width=500`,
      aspect: 4 / 5,
    };
  }
  return { url: u.toString(), provider: "facebook", kind: "web", aspect: WIDE };
}

function instagram(u: URL, host: string): MediaInfo | null {
  if (host !== "instagram.com" && host !== "instagr.am") return null;
  const m = /^\/(?:([\w.]+)\/)?(p|reel|reels|tv)\/([\w-]{5,})/.exec(u.pathname);
  if (!m) {
    const profile = /^\/([\w.]{2,30})\/?$/.exec(u.pathname)?.[1];
    return { url: u.toString(), provider: "instagram", kind: "web", aspect: 1, handle: profile ? `@${profile}` : undefined };
  }
  const type = m[2] === "p" ? "p" : "reel";
  const code = m[3];
  return {
    url: `https://www.instagram.com/${type}/${code}/`,
    provider: "instagram",
    kind: type === "p" ? "post" : "video",
    id: code,
    handle: m[1] ? `@${m[1]}` : undefined,
    embedUrl: `https://www.instagram.com/${type}/${code}/embed/captioned/`,
    aspect: type === "p" ? 4 / 5 : TALL,
  };
}

function tiktok(u: URL, host: string): MediaInfo | null {
  if (!host.endsWith("tiktok.com")) return null;
  const m = /\/(video|photo)\/(\d{8,})/.exec(u.pathname);
  const user = /^\/@([\w.-]{2,40})/.exec(u.pathname)?.[1];
  const handle = user ? `@${user}` : undefined;
  if (m && m[1] === "video") {
    return {
      url: u.toString(),
      provider: "tiktok",
      kind: "video",
      id: m[2],
      handle,
      embedUrl: `https://www.tiktok.com/player/v1/${m[2]}?autoplay=1&music_info=1&description=1&rel=0`,
      aspect: TALL,
    };
  }
  if (m) return { url: u.toString(), provider: "tiktok", kind: "post", id: m[2], aspect: TALL, handle };
  // Enlace corto (vm.tiktok.com/...) o perfil: el servidor averigua a qué video lleva.
  return { url: u.toString(), provider: "tiktok", kind: isShortLink(u.toString()) ? "video" : "web", aspect: TALL, handle };
}

function xTwitter(u: URL, host: string): MediaInfo | null {
  if (!["x.com", "twitter.com", "mobile.twitter.com", "mobile.x.com"].includes(host)) return null;
  const m = /^\/([^/]+)\/status(?:es)?\/(\d+)/.exec(u.pathname);
  if (!m) return { url: u.toString(), provider: "x", kind: "web", aspect: WIDE };
  return {
    url: u.toString(),
    provider: "x",
    kind: "post",
    id: m[2],
    handle: `@${m[1]}`,
    embedUrl: `https://platform.twitter.com/embed/Tweet.html?id=${m[2]}&theme=dark&dnt=true&lang=es`,
    aspect: 4 / 5,
  };
}

function spotify(u: URL, host: string): MediaInfo | null {
  if (host !== "open.spotify.com") return null;
  const m = /^\/(?:intl-[a-z-]+\/)?(track|episode|show|album|playlist|artist)\/([A-Za-z0-9]{10,})/.exec(u.pathname);
  if (!m) return { url: u.toString(), provider: "spotify", kind: "web", aspect: WIDE };
  const short = m[1] === "track" || m[1] === "episode";
  return {
    url: u.toString(),
    provider: "spotify",
    kind: "audio",
    id: m[2],
    embedUrl: `https://open.spotify.com/embed/${m[1]}/${m[2]}?utm_source=generator&theme=0`,
    aspect: WIDE,
    height: short ? 152 : 352,
  };
}

function soundcloud(u: URL, host: string): MediaInfo | null {
  if (host !== "soundcloud.com" && host !== "on.soundcloud.com" && host !== "m.soundcloud.com") return null;
  const seg = u.pathname.split("/").filter(Boolean);
  if (host === "soundcloud.com" && seg.length < 2) return { url: u.toString(), provider: "soundcloud", kind: "web", aspect: WIDE };
  return {
    url: u.toString(),
    provider: "soundcloud",
    kind: "audio",
    embedUrl: `https://w.soundcloud.com/player/?url=${encodeURIComponent(u.toString())}&auto_play=true&visual=false&hide_related=true&show_comments=false&show_reposts=false&show_teaser=false`,
    aspect: WIDE,
    height: 166,
  };
}

function twitch(u: URL, host: string): MediaInfo | null {
  if (host !== "twitch.tv" && host !== "clips.twitch.tv" && host !== "m.twitch.tv") return null;
  const seg = u.pathname.split("/").filter(Boolean);
  if (host === "clips.twitch.tv" && seg[0]) {
    return { url: u.toString(), provider: "twitch", kind: "video", id: seg[0], embedUrl: `https://clips.twitch.tv/embed?clip=${encodeURIComponent(seg[0])}&parent={parent}&autoplay=true`, aspect: WIDE };
  }
  if (seg[0] === "videos" && /^\d+$/.test(seg[1] || "")) {
    return { url: u.toString(), provider: "twitch", kind: "video", id: seg[1], embedUrl: `https://player.twitch.tv/?video=v${seg[1]}&parent={parent}&autoplay=true`, aspect: WIDE };
  }
  if (seg[1] === "clip" && seg[2]) {
    return { url: u.toString(), provider: "twitch", kind: "video", id: seg[2], embedUrl: `https://clips.twitch.tv/embed?clip=${encodeURIComponent(seg[2])}&parent={parent}&autoplay=true`, aspect: WIDE };
  }
  if (seg.length === 1 && /^\w{3,25}$/.test(seg[0])) {
    return { url: u.toString(), provider: "twitch", kind: "video", id: seg[0], embedUrl: `https://player.twitch.tv/?channel=${seg[0]}&parent={parent}&autoplay=true`, aspect: WIDE };
  }
  return { url: u.toString(), provider: "twitch", kind: "web", aspect: WIDE };
}

function dailymotion(u: URL, host: string): MediaInfo | null {
  let id: string | null = null;
  if (host === "dai.ly") id = u.pathname.split("/")[1] || null;
  else if (host === "dailymotion.com") {
    const m = /^\/video\/([a-zA-Z0-9]+)/.exec(u.pathname);
    id = m ? m[1] : null;
  } else return null;
  if (!id) return { url: u.toString(), provider: "dailymotion", kind: "web", aspect: WIDE };
  return {
    url: u.toString(),
    provider: "dailymotion",
    kind: "video",
    id,
    embedUrl: `https://www.dailymotion.com/embed/video/${id}?autoplay=1`,
    thumbnail: `https://www.dailymotion.com/thumbnail/video/${id}`,
    aspect: WIDE,
  };
}

function google(u: URL, host: string): MediaInfo | null {
  if (host === "drive.google.com") {
    const file = /\/file\/d\/([\w-]{10,})/.exec(u.pathname);
    const id = file ? file[1] : u.searchParams.get("id");
    const folder = /\/drive\/(?:u\/\d+\/)?folders\/([\w-]{10,})/.exec(u.pathname);
    if (folder) {
      return { url: u.toString(), provider: "drive", kind: "document", id: folder[1], embedUrl: `https://drive.google.com/embeddedfolderview?id=${folder[1]}#grid`, aspect: 4 / 3 };
    }
    if (id && /^[\w-]{10,}$/.test(id)) {
      return {
        url: u.toString(),
        provider: "drive",
        kind: "document",
        id,
        embedUrl: `https://drive.google.com/file/d/${id}/preview`,
        thumbnail: `https://drive.google.com/thumbnail?id=${id}&sz=w640`,
        aspect: 4 / 3,
      };
    }
    return { url: u.toString(), provider: "drive", kind: "web", aspect: WIDE };
  }
  if (host === "docs.google.com") {
    const m = /^\/(document|spreadsheets|presentation|forms)\/d\/(e\/)?([\w-]{10,})/.exec(u.pathname);
    if (!m) return null;
    const [, type, published, id] = m;
    const provider: MediaProvider = type === "spreadsheets" ? "sheets" : type === "presentation" ? "slides" : "docs";
    const base = `https://docs.google.com/${type}/d/${published || ""}${id}`;
    const embedUrl =
      type === "presentation" ? `${base}/embed?start=false&loop=false`
      : type === "forms" ? `${base}/viewform?embedded=true`
      : `${base}/preview`;
    return { url: u.toString(), provider, kind: "document", id, embedUrl, aspect: type === "presentation" ? WIDE : 3 / 4 };
  }
  return null;
}

function dropbox(u: URL, host: string): MediaInfo | null {
  if (host !== "dropbox.com" && host !== "dl.dropboxusercontent.com") return null;
  const type = EXT_TYPES[fileExtension(u.pathname)];
  if (!type) return { url: u.toString(), provider: "dropbox", kind: "web", aspect: WIDE };
  const direct = new URL(u.toString());
  if (host === "dropbox.com") {
    direct.searchParams.delete("dl");
    direct.searchParams.set("raw", "1");
  }
  return { ...directFile(direct, type), provider: "dropbox", url: u.toString(), embedUrl: direct.toString() };
}

function directFile(u: URL, type: FileType): MediaInfo {
  const kind: MediaKind =
    type === "video" ? "video"
    : type === "audio" ? "audio"
    : type === "image" ? "image"
    : "document";
  return { url: u.toString(), provider: "file", kind, fileType: type, embedUrl: u.toString(), aspect: type === "audio" ? WIDE : type === "video" ? WIDE : 3 / 4 };
}

/**
 * Qué es un enlace y cómo se muestra. Devuelve null si no es un enlace web válido.
 * Acepta también rutas de archivos de esta web ("/files/...", "/uploads/...") y data: URL.
 */
export function classifyUrl(raw: string | null | undefined): MediaInfo | null {
  if (!raw) return null;
  const value = raw.trim();
  if (value.startsWith("data:")) {
    const type = fileTypeOf("", dataUrlMime(value));
    return { ...directFile(new URL("data:,"), type), url: value, embedUrl: value };
  }
  let u: URL;
  try {
    u = new URL(value, "https://local.invalid");
  } catch {
    return null;
  }
  const local = u.hostname === "local.invalid";
  if (local) {
    // Archivo subido a esta web.
    const type = EXT_TYPES[fileExtension(u.pathname)] || "other";
    const path = u.pathname + u.search;
    return { ...directFile(u, type), url: path, embedUrl: path };
  }
  if (u.protocol !== "https:" && u.protocol !== "http:") return null;
  const host = u.hostname.toLowerCase().replace(/^(www\.|m\.|mobile\.)/, "");
  const found =
    youtube(u, host) ||
    vimeo(u, host) ||
    facebook(u, host) ||
    instagram(u, host) ||
    tiktok(u, host) ||
    xTwitter(u, host) ||
    spotify(u, host) ||
    soundcloud(u, host) ||
    twitch(u, host) ||
    dailymotion(u, host) ||
    google(u, host) ||
    dropbox(u, host);
  if (found) return found;
  const type = EXT_TYPES[fileExtension(u.pathname)];
  if (type) return directFile(u, type);
  return { url: u.toString(), provider: "web", kind: "web", aspect: WIDE };
}

/** ¿Se puede ver o escuchar dentro de la página? */
export function isPlayable(info: MediaInfo | null | undefined): boolean {
  return !!info && !!info.embedUrl && (info.kind === "video" || info.kind === "audio");
}
