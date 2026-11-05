import { BIBLE_BOOKS } from "./schema";
import { BIBLE_BOOK_CHAPTERS } from "./bible";

// Club de lectura "vivo": los desafíos se completan solos con lo que el miembro
// hace en la web (leer en la Biblia, escribir una nota, comentar, memorizar).
// Las fechas son días locales del lector ("YYYY-MM-DD") para que la racha no se
// corte a medianoche UTC en Venezuela, Perú o Texas.

export type ChapterRef = { book: string; chapter: number };

/** Hoy en la zona horaria dada, como "YYYY-MM-DD". */
export function localDate(timeZone?: string, at: Date = new Date()): string {
  try {
    return new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).format(at);
  } catch {
    return new Intl.DateTimeFormat("en-CA", { year: "numeric", month: "2-digit", day: "2-digit" }).format(at);
  }
}

export function isDateString(value: unknown): value is string {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`));
}

export function addDays(date: string, days: number): string {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export function daysBetween(from: string, to: string): number {
  return Math.round((Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / 86400000);
}

/** Semana ISO 8601, p. ej. "2026-W45": el versículo para memorizar cambia cada lunes. */
export function isoWeek(date: string): string {
  const d = new Date(`${date}T00:00:00Z`);
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - day);
  const yearStart = Date.UTC(d.getUTCFullYear(), 0, 1);
  const week = Math.ceil(((d.getTime() - yearStart) / 86400000 + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}

/** Tiempo mínimo en un capítulo para que cuente como leído: 1,5 s por versículo (20 s a 2 min). */
export function minReadingSeconds(verseCount: number): number {
  return Math.min(120, Math.max(20, Math.round(verseCount * 1.5)));
}

/** Todos los capítulos de los libros dados, en orden bíblico. */
export function chaptersOfBooks(books: readonly string[]): ChapterRef[] {
  const wanted = new Set(books);
  return (BIBLE_BOOKS as readonly string[])
    .filter((book) => wanted.has(book))
    .flatMap((book) => Array.from({ length: BIBLE_BOOK_CHAPTERS[book] ?? 0 }, (_, i) => ({ book, chapter: i + 1 })));
}

export const CHALLENGE_PRESETS = [
  { id: "juan-21", title: "El Evangelio de Juan en 21 días", books: ["Juan"], chaptersPerDay: 1, description: "Un capítulo al día para conocer a Jesús de cerca." },
  { id: "marcos-16", title: "Marcos en 16 días", books: ["Marcos"], chaptersPerDay: 1, description: "El evangelio más breve, un capítulo por día." },
  { id: "proverbios-31", title: "Proverbios en 31 días", books: ["Proverbios"], chaptersPerDay: 1, description: "Un capítulo de sabiduría cada día del mes." },
  { id: "romanos-16", title: "Romanos en 16 días", books: ["Romanos"], chaptersPerDay: 1, description: "La carta que explica el evangelio de la gracia." },
  { id: "hechos-28", title: "Hechos en 28 días", books: ["Hechos"], chaptersPerDay: 1, description: "Cómo nació la iglesia y se extendió el fuego del Espíritu." },
  { id: "salmos-30", title: "Salmos en 30 días", books: ["Salmos"], chaptersPerDay: 5, description: "Cinco salmos al día para orar con la Palabra." },
  { id: "evangelios-45", title: "Los 4 Evangelios en 45 días", books: ["Mateo", "Marcos", "Lucas", "Juan"], chaptersPerDay: 2, description: "La vida de Jesús completa, dos capítulos al día." },
  { id: "nt-260", title: "El Nuevo Testamento en 260 días", books: (BIBLE_BOOKS as readonly string[]).slice((BIBLE_BOOKS as readonly string[]).indexOf("Mateo")), chaptersPerDay: 1, description: "Un capítulo al día, de Mateo a Apocalipsis." },
] as const;

export const CLUB_BADGES = {
  primer_capitulo: { label: "Primer capítulo", desc: "Leíste tu primer capítulo en la Biblia de la web.", icon: "📖" },
  racha_7: { label: "Racha de 7 días", desc: "Una semana entera leyendo la Palabra.", icon: "🔥" },
  racha_30: { label: "Racha de 30 días", desc: "Un mes sin faltar a tu cita con Dios.", icon: "🏆" },
  racha_100: { label: "Racha de 100 días", desc: "Cien días seguidos en la Palabra.", icon: "👑" },
  desafio_club: { label: "Desafío del club", desc: "Terminaste un desafío del club de lectura.", icon: "🎯" },
  versiculo_memorizado: { label: "Versículo memorizado", desc: "Completaste tu primer versículo de la semana.", icon: "🧠" },
} as const;

export type ClubBadgeType = keyof typeof CLUB_BADGES;

// Texto exacto de la RV1960. Mateo 5:16 se corrigió a mano ("que está en los
// cielos"): el proveedor lo trae mal.
export const MEMORY_VERSES: { ref: string; book: string; chapter: number; text: string; blanks: string[] }[] = [
  { ref: "Juan 3:16", book: "Juan", chapter: 3, text: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.", blanks: ["mundo", "unigénito", "eterna"] },
  { ref: "Salmos 23:1", book: "Salmos", chapter: 23, text: "Jehová es mi pastor; nada me faltará.", blanks: ["Jehová", "pastor", "faltará"] },
  { ref: "Filipenses 4:13", book: "Filipenses", chapter: 4, text: "Todo lo puedo en Cristo que me fortalece.", blanks: ["puedo", "Cristo", "fortalece"] },
  { ref: "Proverbios 3:5", book: "Proverbios", chapter: 3, text: "Fíate de Jehová de todo tu corazón, Y no te apoyes en tu propia prudencia.", blanks: ["Jehová", "corazón", "prudencia"] },
  { ref: "Josué 1:9", book: "Josue", chapter: 1, text: "Mira que te mando que te esfuerces y seas valiente; no temas ni desmayes, porque Jehová tu Dios estará contigo en dondequiera que vayas.", blanks: ["esfuerces", "valiente", "contigo"] },
  { ref: "Isaías 41:10", book: "Isaias", chapter: 41, text: "No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te esfuerzo; siempre te ayudaré, siempre te sustentaré con la diestra de mi justicia.", blanks: ["contigo", "ayudaré", "diestra"] },
  { ref: "Romanos 8:28", book: "Romanos", chapter: 8, text: "Y sabemos que a los que aman a Dios, todas las cosas les ayudan a bien, esto es, a los que conforme a su propósito son llamados.", blanks: ["aman", "bien", "propósito"] },
  { ref: "Mateo 6:33", book: "Mateo", chapter: 6, text: "Mas buscad primeramente el reino de Dios y su justicia, y todas estas cosas os serán añadidas.", blanks: ["primeramente", "reino", "añadidas"] },
  { ref: "Salmos 119:105", book: "Salmos", chapter: 119, text: "Lámpara es a mis pies tu palabra, Y lumbrera a mi camino.", blanks: ["Lámpara", "palabra", "lumbrera"] },
  { ref: "Jeremías 29:11", book: "Jeremias", chapter: 29, text: "Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal, para daros el fin que esperáis.", blanks: ["pensamientos", "paz", "esperáis"] },
  { ref: "2 Timoteo 1:7", book: "2 Timoteo", chapter: 1, text: "Porque no nos ha dado Dios espíritu de cobardía, sino de poder, de amor y de dominio propio.", blanks: ["cobardía", "poder", "dominio"] },
  { ref: "Hebreos 11:1", book: "Hebreos", chapter: 11, text: "Es, pues, la fe la certeza de lo que se espera, la convicción de lo que no se ve.", blanks: ["certeza", "espera", "convicción"] },
  { ref: "Salmos 119:11", book: "Salmos", chapter: 119, text: "En mi corazón he guardado tus dichos, Para no pecar contra ti.", blanks: ["corazón", "guardado", "pecar"] },
  { ref: "Proverbios 18:10", book: "Proverbios", chapter: 18, text: "Torre fuerte es el nombre de Jehová; A él correrá el justo, y será levantado.", blanks: ["Torre", "nombre", "justo"] },
  { ref: "Mateo 11:28", book: "Mateo", chapter: 11, text: "Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar.", blanks: ["trabajados", "cargados", "descansar"] },
  { ref: "Romanos 12:2", book: "Romanos", chapter: 12, text: "No os conforméis a este siglo, sino transformaos por medio de la renovación de vuestro entendimiento, para que comprobéis cuál sea la buena voluntad de Dios, agradable y perfecta.", blanks: ["conforméis", "transformaos", "entendimiento"] },
  { ref: "Salmos 46:1", book: "Salmos", chapter: 46, text: "Dios es nuestro amparo y fortaleza, Nuestro pronto auxilio en las tribulaciones.", blanks: ["amparo", "fortaleza", "auxilio"] },
  { ref: "Isaías 40:31", book: "Isaias", chapter: 40, text: "pero los que esperan a Jehová tendrán nuevas fuerzas; levantarán alas como las águilas; correrán, y no se cansarán; caminarán, y no se fatigarán.", blanks: ["fuerzas", "águilas", "fatigarán"] },
  { ref: "1 Juan 1:9", book: "1 Juan", chapter: 1, text: "Si confesamos nuestros pecados, él es fiel y justo para perdonar nuestros pecados, y limpiarnos de toda maldad.", blanks: ["confesamos", "fiel", "maldad"] },
  { ref: "Mateo 5:16", book: "Mateo", chapter: 5, text: "Así alumbre vuestra luz delante de los hombres, para que vean vuestras buenas obras, y glorifiquen a vuestro Padre que está en los cielos.", blanks: ["alumbre", "luz", "glorifiquen"] },
  { ref: "Juan 14:6", book: "Juan", chapter: 14, text: "Jesús le dijo: Yo soy el camino, y la verdad, y la vida; nadie viene al Padre, sino por mí.", blanks: ["camino", "verdad", "vida"] },
  { ref: "Romanos 10:9", book: "Romanos", chapter: 10, text: "que si confesares con tu boca que Jesús es el Señor, y creyeres en tu corazón que Dios le levantó de los muertos, serás salvo.", blanks: ["confesares", "creyeres", "salvo"] },
  { ref: "Salmos 37:5", book: "Salmos", chapter: 37, text: "Encomienda a Jehová tu camino, Y confía en él; y él hará.", blanks: ["Encomienda", "camino", "confía"] },
  { ref: "Proverbios 16:3", book: "Proverbios", chapter: 16, text: "Encomienda a Jehová tus obras, Y tus pensamientos serán afirmados.", blanks: ["Encomienda", "obras", "afirmados"] },
  { ref: "1 Pedro 5:7", book: "1 Pedro", chapter: 5, text: "echando toda vuestra ansiedad sobre él, porque él tiene cuidado de vosotros.", blanks: ["echando", "ansiedad", "cuidado"] },
  { ref: "Santiago 1:5", book: "Santiago", chapter: 1, text: "Y si alguno de vosotros tiene falta de sabiduría, pídala a Dios, el cual da a todos abundantemente y sin reproche, y le será dada.", blanks: ["sabiduría", "abundantemente", "reproche"] },
];

/** El versículo de la semana ISO (el mismo para todos los miembros). */
export function memoryVerseForWeek(week: string) {
  const [year, w] = week.split("-W").map(Number);
  return MEMORY_VERSES[(year * 53 + w) % MEMORY_VERSES.length];
}

/** Para comparar respuestas: sin mayúsculas, tildes ni signos. */
export function normalizeWord(word: string): string {
  return word.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-zñ]/g, "");
}

// ---------- Datos que devuelve GET /api/club/summary ----------

export type DailyChallengeId = "leer" | "desafio" | "reflexion" | "compartir" | "versiculo";

export type ClubDailyChallenge = {
  id: DailyChallengeId;
  title: string;
  desc: string;
  done: boolean;
};

export type ClubChallengeSummary = {
  id: number;
  title: string;
  description: string | null;
  startDate: string;
  endDate: string;
  chaptersPerDay: number;
  totalChapters: number;
  totalDays: number;
  /** 1 = primer día; 0 o menos: aún no empieza; mayor que totalDays: terminó. */
  dayNumber: number;
  status: "proximo" | "activo" | "terminado";
  joined: boolean;
  myCompleted: number;
  /** Capítulos que, a este ritmo, ya deberían estar leídos hoy. */
  expectedByToday: number;
  todayReading: (ChapterRef & { read: boolean })[];
  memberCount: number;
  membersReadToday: number;
  members: { userId: number; displayName: string; avatarUrl: string | null; completed: number; readToday: boolean }[];
  canManage: boolean;
};

export type ClubSummary = {
  today: string;
  streak: { current: number; best: number; readToday: boolean; last7: boolean[] };
  totalChapters: number;
  daily: ClubDailyChallenge[];
  suggested: ChapterRef & { reason: string };
  memoryVerse: {
    week: string;
    ref: string;
    book: string;
    chapter: number;
    /** El texto con huecos; las palabras ocultas no viajan al navegador hasta completarlo. */
    parts: (string | { blank: number })[];
    blankCount: number;
    blankLengths: number[];
    done: boolean;
    fullText: string | null;
  };
  badges: { type: ClubBadgeType; earnedAt: string | null; details: string | null }[];
  challenges: ClubChallengeSummary[];
  community: { chaptersThisWeek: number; readersThisWeek: number };
  canCreateChallenges: boolean;
};

export type ReadingRecordResult = {
  recorded: boolean;
  firstTimeToday: boolean;
  streak: number;
  planItemsCompleted: number;
  newBadges: { type: ClubBadgeType; label: string; icon: string }[];
};
