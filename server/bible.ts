import fs from "fs";
import path from "path";
import { gunzipSync } from "zlib";
import {
  BIBLE_BOOK_CHAPTERS, bibleBookNumber, isBibleVersion,
  type BibleChapterPayload, type BibleVersion,
} from "@shared/bible";

// Texto bíblico servido por la propia web. Antes cada navegador lo pedía a
// bible-api.deno.dev, que dejó de existir (NXDOMAIN, nov. 2026) y dejó la Biblia
// en blanco para todos. Ahora el servidor lo pide a Bolls (RV1960, NTV, LBLA), lo guarda en memoria y en la base
// (biblia_capitulos) y, si la versión pedida no responde, sirve la RV1909 avisando con `fallbackFrom`.
// La RV1909 (dominio público) va dentro de la web desde el 21-nov-2026: no depende de getBible ni de la base, así que
// el respaldo siempre responde (ver más abajo). getBible queda solo por si faltara el archivo.

type Verse = { verse: number; text: string };

// ─── La RV1909 dentro de la web ─────────────────────────────────────────────────────────────────────────────────────
// server/data/biblia/rv1909.json.gz: [libro 1..66][capítulo 1..n] -> [[versículo, texto], ...]. Sale de la RV1909 de
// open-bibles (github.com/seven1m/open-bibles, spa-rv1909.usfx.xml, «Public Domain») sin las etiquetas de Strong y sin
// los títulos de los salmos dentro del versículo 1, igual que la de getBible que se servía antes (cómo se armó:
// docs/vigilancia-y-respaldos.md). Unos 4 MB en memoria, que se cargan la primera vez que alguien la pide.
type Rv1909 = [number, string][][][];
let rv1909: Rv1909 | null | undefined;

function cargarRv1909(): Rv1909 | null {
  if (rv1909 !== undefined) return rv1909;
  const aqui = typeof __dirname !== "undefined" ? __dirname : null;
  const candidatas = [
    path.join(process.cwd(), "server", "data", "biblia", "rv1909.json.gz"),
    ...(aqui ? [path.join(aqui, "..", "server", "data", "biblia", "rv1909.json.gz")] : []),
  ];
  for (const archivo of candidatas) {
    try {
      const datos = JSON.parse(gunzipSync(fs.readFileSync(archivo)).toString("utf8"));
      if (Array.isArray(datos) && datos.length === 66) return (rv1909 = datos as Rv1909);
    } catch {
      // la siguiente
    }
  }
  console.warn("[biblia] no se encontró la RV1909 de la web (server/data/biblia/rv1909.json.gz); se pedirá a getBible");
  return (rv1909 = null);
}

/** Un capítulo de la RV1909 que va dentro de la web, o null si no está (libro de 1 a 66). */
export function capituloRv1909Local(libro: number, capitulo: number): Verse[] | null {
  const cap = cargarRv1909()?.[libro - 1]?.[capitulo - 1];
  return cap?.length ? cap.map(([verse, text]) => ({ verse, text })) : null;
}

const TIMEOUT_MS = 8000;
const CACHE_MAX = 800; // capítulos (~5 KB cada uno)

const BOLLS_CODES: Partial<Record<BibleVersion, string>> = {
  rv1960: "RV1960",
  ntv: "NTV",
  lbla: "LBLA",
};

function cleanText(raw: string): string {
  return raw
    .replace(/<S>\d+<\/S>/gi, "") // números Strong
    .replace(/<sup>[\s\S]*?<\/sup>/gi, "") // notas al pie
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/\s*•\s*/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

/** Cuánto esperar antes de reintentar un 429: lo que pida el proveedor (Retry-After), entre 0,3 y 2 segundos. */
export function esperaTras429(retryAfter: string | null): number {
  const segundos = Number(retryAfter);
  return Math.min(2000, Math.max(300, Number.isFinite(segundos) && segundos > 0 ? segundos * 1000 : 800));
}

async function getJson(url: string): Promise<any> {
  const pedir = () =>
    fetch(url, {
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: { Accept: "application/json", "User-Agent": "AvivandoElFuego/1.0 (biblioteca)" },
    });
  let res = await pedir();
  // Bolls limita las peticiones seguidas (429), sobre todo justo después de publicar, cuando la memoria está vacía:
  // se espera un momento y se reintenta una vez antes de servir el respaldo de la RV1909.
  if (res.status === 429) {
    await new Promise((r) => setTimeout(r, esperaTras429(res.headers.get("retry-after"))));
    res = await pedir();
  }
  if (!res.ok) throw new Error(`HTTP ${res.status} en ${new URL(url).host}`);
  return res.json();
}

async function fetchFromBolls(code: string, bookNumber: number, chapter: number): Promise<Verse[]> {
  const data = await getJson(`https://bolls.life/get-text/${code}/${bookNumber}/${chapter}/`);
  if (!Array.isArray(data)) return [];
  return data
    .map((v: any) => ({ verse: Number(v.verse), text: cleanText(String(v.text ?? "")) }))
    .filter((v) => Number.isInteger(v.verse) && v.verse > 0 && v.text);
}

async function fetchFromGetBible(bookNumber: number, chapter: number): Promise<Verse[]> {
  const data = await getJson(`https://api.getbible.net/v2/valera/${bookNumber}/${chapter}.json`);
  const verses = Array.isArray(data?.verses) ? data.verses : [];
  return verses
    .map((v: any) => ({ verse: Number(v.verse), text: cleanText(String(v.text ?? "")) }))
    .filter((v: Verse) => Number.isInteger(v.verse) && v.verse > 0 && v.text);
}

async function fetchVersion(version: BibleVersion, bookNumber: number, chapter: number): Promise<Verse[]> {
  const code = BOLLS_CODES[version];
  return code ? fetchFromBolls(code, bookNumber, chapter) : fetchFromGetBible(bookNumber, chapter);
}

const cache = new Map<string, BibleChapterPayload>();
const inFlight = new Map<string, Promise<BibleChapterPayload>>();

// Cada capítulo que llegó bien se guarda también en la base: al publicar, el servidor arranca con la memoria vacía y
// pedirle de golpe todo a Bolls lo hace responder 429 (y entonces saldría la RV1909, o el versículo de memoria no
// cargaría). Con la base, cada capítulo se pide a Bolls una sola vez. La base se carga solo cuando hace falta.
export const BIBLIA_SQL = `
CREATE TABLE IF NOT EXISTS biblia_capitulos (
  version text NOT NULL,
  libro integer NOT NULL,
  capitulo integer NOT NULL,
  versos jsonb NOT NULL,
  guardado_at timestamp NOT NULL DEFAULT now(),
  PRIMARY KEY (version, libro, capitulo)
);
`;
const base = () => import("./db").then((m) => m.pool);

async function leerGuardado(version: string, libro: number, capitulo: number): Promise<Verse[] | null> {
  try {
    const pool = await base();
    const { rows } = await pool.query(`SELECT versos FROM biblia_capitulos WHERE version = $1 AND libro = $2 AND capitulo = $3`, [version, libro, capitulo]);
    const v = rows[0]?.versos;
    return Array.isArray(v) && v.length > 0 ? (v as Verse[]) : null;
  } catch {
    return null;
  }
}

function guardar(version: string, libro: number, capitulo: number, versos: Verse[]): void {
  void base()
    .then((pool) =>
      pool.query(
        `INSERT INTO biblia_capitulos (version, libro, capitulo, versos) VALUES ($1, $2, $3, $4)
         ON CONFLICT (version, libro, capitulo) DO UPDATE SET versos = EXCLUDED.versos, guardado_at = now()`,
        [version, libro, capitulo, JSON.stringify(versos)],
      ),
    )
    .catch(() => undefined);
}

function remember(key: string, value: BibleChapterPayload) {
  cache.delete(key);
  cache.set(key, value);
  if (cache.size > CACHE_MAX) cache.delete(cache.keys().next().value!);
}

export class BibleRequestError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
  }
}

export async function getBibleChapter(version: string, book: string, chapter: number): Promise<BibleChapterPayload> {
  if (!isBibleVersion(version)) throw new BibleRequestError("Versión no disponible", 400);
  const bookNumber = bibleBookNumber(book);
  if (!bookNumber) throw new BibleRequestError("Libro no válido", 400);
  const maxChapter = BIBLE_BOOK_CHAPTERS[book] ?? 0;
  if (!Number.isInteger(chapter) || chapter < 1 || chapter > maxChapter) {
    throw new BibleRequestError("Capítulo no válido", 400);
  }

  const key = `${version}:${bookNumber}:${chapter}`;
  const cached = cache.get(key);
  if (cached) {
    remember(key, cached);
    return cached;
  }
  const pending = inFlight.get(key);
  if (pending) return pending;

  const load = (async (): Promise<BibleChapterPayload> => {
    // La RV1909 sale de la propia web, sin pedirla a nadie (y por eso el respaldo de las demás siempre responde).
    if (version === "rv1909") {
      const local = capituloRv1909Local(bookNumber, chapter);
      if (local) {
        const payload: BibleChapterPayload = { version, book, chapter, verses: local };
        remember(key, payload);
        return payload;
      }
    }
    const guardado = await leerGuardado(version, bookNumber, chapter);
    if (guardado) {
      const payload: BibleChapterPayload = { version, book, chapter, verses: guardado };
      remember(key, payload);
      return payload;
    }
    try {
      const verses = await fetchVersion(version, bookNumber, chapter);
      if (verses.length > 0) {
        const payload: BibleChapterPayload = { version, book, chapter, verses };
        remember(key, payload);
        guardar(version, bookNumber, chapter, verses);
        return payload;
      }
      throw new Error("sin versículos");
    } catch (err) {
      if (version === "rv1909") throw new BibleRequestError("No se pudo cargar el texto bíblico", 502);
      console.warn(`[biblia] ${version} ${book} ${chapter} falló (${(err as Error).message}); se sirve la RV1909`);
      const fallback = await getBibleChapter("rv1909", book, chapter).catch(() => {
        throw new BibleRequestError("No se pudo cargar el texto bíblico", 502);
      });
      // El respaldo no se guarda con la clave de la versión pedida: la próxima vez se reintenta.
      return { ...fallback, fallbackFrom: version };
    }
  })();

  inFlight.set(key, load);
  try {
    return await load;
  } finally {
    inFlight.delete(key);
  }
}
