import {
  BIBLE_BOOK_CHAPTERS, bibleBookNumber, isBibleVersion,
  type BibleChapterPayload, type BibleVersion,
} from "@shared/bible";

// Texto bíblico servido por la propia web. Antes cada navegador lo pedía a
// bible-api.deno.dev, que dejó de existir (NXDOMAIN, nov. 2026) y dejó la Biblia
// en blanco para todos. Ahora el servidor lo pide a Bolls (RV1960, NTV, LBLA) o a
// getBible (RV1909, dominio público), lo guarda en memoria y, si la versión pedida
// no responde, sirve la RV1909 avisando con `fallbackFrom`.

type Verse = { verse: number; text: string };

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

async function getJson(url: string): Promise<any> {
  const res = await fetch(url, {
    signal: AbortSignal.timeout(TIMEOUT_MS),
    headers: { Accept: "application/json", "User-Agent": "AvivandoElFuego/1.0 (biblioteca)" },
  });
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
    try {
      const verses = await fetchVersion(version, bookNumber, chapter);
      if (verses.length > 0) {
        const payload: BibleChapterPayload = { version, book, chapter, verses };
        remember(key, payload);
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
