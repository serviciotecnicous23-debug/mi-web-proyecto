/**
 * La partida guardada: lo que el jugador logró. Se guarda en el navegador para todos y, con
 * cuenta, también en el servidor (para seguir en otro equipo o al reinstalar la app). Al abrir se
 * compara la del teléfono con la de la cuenta y nunca se pisa la más avanzada (shared/partida.ts);
 * el servidor además guarda un respaldo de la más avanzada. Todo número que llega de afuera se
 * limpia antes de usarse.
 */
import { compararPartidas, resumenPartida, type ResumenPartida } from "@shared/partida";
import { HELPERS, STATIONS, UPGRADES, type HelperId, type ProgressView, type StationId, type UpgradeId } from "./data";
import { GOALS, LOGROS, copas, todayKey, type Goal, type Stats, type StatKey } from "./progress";

export const GAME_SLUG = "aprendiz-del-templo";
const SAVE_KEY = "templo-partida-v1";
/** Los levitas sirven sin ti como mucho 2 horas cada vez que te vas y 3 horas por día. */
export const OFFLINE_CAP_MIN = 120;
export const OFFLINE_DIA_MIN = 180;

export type PileId = "lena" | "aceite" | "pan" | "incienso" | "diezmo";

export type SaveData = {
  v: 1;
  gozo: number;
  sabiduria: number;
  lifetimeGozo: number;
  built: Partial<Record<StationId, boolean>>;
  padPaid: Record<string, number>;
  helpers: Partial<Record<HelperId, number>>;
  upgrades: Partial<Record<UpgradeId, number>>;
  rank: number;
  lessons: string[];
  quizzes: Record<string, boolean>;
  story: Record<string, boolean>;
  day: number;
  time: number;
  ofrendas: number;
  served: number;
  altarFuel: number;
  purity: number;
  lampOil: number;
  bread: number;
  incense: number;
  abundance: number;
  piles: Partial<Record<PileId, number>>;
  gozoPile: number;
  finale: boolean;
  /** Pregunta que Azarías tiene lista para hacer. */
  pendingQuiz: string | null;
  /** Ofrendas presentadas cuando vino el rey (para saber cuándo llega la Pascua). */
  kingOfrendas: number;
  /** Las lámparas estaban llenas al anochecer y no se apagaron. */
  lampWatch: boolean;
  /** La jornada actual (número, objetivos y cuándo empezó) y las estrellas de cada jornada hecha. */
  jornada: { n: number; goals: Goal[]; startedAt: number; stars: string };
  /** Cuentas para los logros. */
  stats: Stats;
  /** Escalón de cada logro (1 bronce, 2 plata, 3 oro). */
  logros: Record<string, number>;
  /** Desafío del día y racha de días seguidos. */
  daily: { key: string; goals: Goal[]; done: boolean; streak: number; lastDone: string };
  savedAt: number;
  playSeconds: number;
  /** Generación: al terminar la historia se puede empezar otra vez sin perder lo ganado. */
  gen: number;
  /** El cargo más alto alcanzado en cualquier generación (cuenta para la tabla y el modo en línea). */
  rangoMax: number;
  /** Gloria de las generaciones anteriores: la gloria nunca baja. */
  gloriaPrev: number;
  /** Minutos que ya sirvieron hoy los levitas sin ti (tope diario). */
  offline: { key: string; min: number };
  /** Tristeza del pueblo por un juicio injusto (0 a 3): baja el gozo y pasa con las mañanas. */
  tristeza: number;
};

export function newSave(): SaveData {
  return {
    v: 1,
    gozo: 25,
    sabiduria: 0,
    lifetimeGozo: 0,
    built: {},
    padPaid: {},
    helpers: {},
    upgrades: {},
    rank: 0,
    lessons: [],
    quizzes: {},
    story: {},
    day: 1,
    time: 0.3,
    ofrendas: 0,
    served: 0,
    altarFuel: 0,
    purity: 5,
    lampOil: 0,
    bread: 0,
    incense: 0,
    abundance: 0,
    piles: {},
    gozoPile: 0,
    finale: false,
    pendingQuiz: null,
    kingOfrendas: 0,
    lampWatch: false,
    jornada: { n: 0, goals: [], startedAt: 0, stars: "" },
    stats: {},
    logros: {},
    daily: { key: "", goals: [], done: false, streak: 0, lastDone: "" },
    savedAt: Date.now(),
    playSeconds: 0,
    gen: 1,
    rangoMax: 0,
    gloriaPrev: 0,
    offline: { key: "", min: 0 },
    tristeza: 0,
  };
}

const GOAL_KINDS = new Set(GOALS.map((g) => g.kind));
const STAT_KEYS: StatKey[] = [
  "ofrendas", "corderos", "palomas", "cereal", "familias", "lena", "lavar", "gozo", "preguntas", "pueblo",
  "aceite", "panes", "incienso", "diezmos", "orantes", "noches", "fuegoMax", "jornadas", "estrellas", "dias", "racha", "juicios", "fiestas",
];

function cleanGoals(v: unknown): Goal[] {
  if (!Array.isArray(v)) return [];
  const out: Goal[] = [];
  for (const g of v.slice(0, 5)) {
    if (!g || typeof g !== "object") continue;
    const r = g as Record<string, unknown>;
    if (typeof r.kind !== "string" || !GOAL_KINDS.has(r.kind as Goal["kind"])) continue;
    const target = Math.round(num(r.target, 1, 1e7, 1));
    out.push({ kind: r.kind as Goal["kind"], target, progress: Math.round(num(r.progress, 0, target, 0)) });
  }
  return out;
}

const dateKey = (v: unknown) => (typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : "");

const num = (v: unknown, min: number, max: number, def: number) => {
  const n = typeof v === "number" && Number.isFinite(v) ? v : def;
  return Math.min(max, Math.max(min, n));
};

/** Une lo guardado con los valores por defecto y descarta lo que no corresponde. */
export function sanitize(raw: unknown): SaveData {
  const base = newSave();
  if (!raw || typeof raw !== "object") return base;
  const r = raw as Record<string, any>;
  const stationIds = new Set(STATIONS.map((s) => s.id));
  const helperIds = new Set(HELPERS.map((h) => h.id));
  const upgradeIds = new Set(UPGRADES.map((u) => u.id));
  const built: SaveData["built"] = {};
  for (const [k, v] of Object.entries(r.built || {})) if (stationIds.has(k as StationId) && v === true) built[k as StationId] = true;
  const helpers: SaveData["helpers"] = {};
  for (const [k, v] of Object.entries(r.helpers || {})) if (helperIds.has(k as HelperId)) helpers[k as HelperId] = num(v, 0, 3, 0);
  const upgrades: SaveData["upgrades"] = {};
  for (const [k, v] of Object.entries(r.upgrades || {})) if (upgradeIds.has(k as UpgradeId)) upgrades[k as UpgradeId] = Math.round(num(v, 0, 10, 0));
  const piles: SaveData["piles"] = {};
  for (const k of ["lena", "aceite", "pan", "incienso", "diezmo"] as PileId[]) if (r.piles && typeof r.piles === "object" && k in r.piles) piles[k] = Math.round(num(r.piles[k], 0, 40, 0));
  const strList = (v: unknown) => (Array.isArray(v) ? v.filter((x) => typeof x === "string").slice(0, 200) : []);
  const boolMap = (v: unknown) => {
    const out: Record<string, boolean> = {};
    if (v && typeof v === "object") for (const [k, b] of Object.entries(v)) if (typeof b === "boolean" && k.length < 40) out[k] = b;
    return out;
  };
  const padPaid: Record<string, number> = {};
  if (r.padPaid && typeof r.padPaid === "object") for (const [k, v] of Object.entries(r.padPaid)) if (k.length < 40) padPaid[k] = num(v, 0, 1e7, 0);
  return {
    ...base,
    gozo: num(r.gozo, 0, 1e9, base.gozo),
    sabiduria: Math.round(num(r.sabiduria, 0, 999, 0)),
    lifetimeGozo: num(r.lifetimeGozo, 0, 1e10, 0),
    built,
    padPaid,
    helpers,
    upgrades,
    rank: Math.round(num(r.rank, 0, 4, 0)),
    lessons: strList(r.lessons),
    quizzes: boolMap(r.quizzes),
    story: boolMap(r.story),
    day: Math.round(num(r.day, 1, 1e6, 1)),
    time: num(r.time, 0, 1, base.time),
    ofrendas: Math.round(num(r.ofrendas, 0, 1e8, 0)),
    served: Math.round(num(r.served, 0, 1e8, 0)),
    altarFuel: num(r.altarFuel, 0, 100, 0),
    purity: num(r.purity, 0, 100, 5),
    lampOil: num(r.lampOil, 0, 7, 0),
    bread: Math.round(num(r.bread, 0, 12, 0)),
    incense: Math.round(num(r.incense, 0, 4, 0)),
    abundance: num(r.abundance, 0, 1e6, 0),
    piles,
    gozoPile: num(r.gozoPile, 0, 1e9, 0),
    finale: r.finale === true,
    pendingQuiz: typeof r.pendingQuiz === "string" && r.pendingQuiz.length < 40 ? r.pendingQuiz : null,
    kingOfrendas: Math.round(num(r.kingOfrendas, 0, 1e8, 0)),
    lampWatch: r.lampWatch === true,
    jornada: (() => {
      const j = r.jornada && typeof r.jornada === "object" ? (r.jornada as Record<string, unknown>) : {};
      return {
        n: Math.round(num(j.n, 0, 1e6, 0)),
        goals: cleanGoals(j.goals),
        startedAt: num(j.startedAt, 0, 1e10, 0),
        stars: typeof j.stars === "string" ? j.stars.replace(/[^123]/g, "").slice(0, 200000) : "",
      };
    })(),
    stats: (() => {
      const out: Stats = {};
      const st = r.stats && typeof r.stats === "object" ? (r.stats as Record<string, unknown>) : null;
      if (st) {
        for (const k of STAT_KEYS) if (k in st) out[k] = Math.round(num(st[k], 0, 1e12, 0));
      } else {
        // Partida de antes de los logros: lo que ya se hizo cuenta para las copas (una sola vez).
        out.ofrendas = Math.round(num(r.ofrendas, 0, 1e8, 0));
        out.gozo = Math.round(num(r.lifetimeGozo, 0, 1e10, 0));
        out.diezmos = Math.round(num(r.abundance, 0, 1e6, 0));
        out.preguntas = r.quizzes && typeof r.quizzes === "object" ? Object.values(r.quizzes as Record<string, unknown>).filter((v) => v === true).length : 0;
        out.dias = Math.round(num(r.day, 1, 1e6, 1));
      }
      return out;
    })(),
    logros: (() => {
      const out: Record<string, number> = {};
      const lg = r.logros && typeof r.logros === "object" ? (r.logros as Record<string, unknown>) : {};
      for (const def of LOGROS) if (def.id in lg) out[def.id] = Math.round(num(lg[def.id], 0, 3, 0));
      return out;
    })(),
    daily: (() => {
      const d = r.daily && typeof r.daily === "object" ? (r.daily as Record<string, unknown>) : {};
      return {
        key: dateKey(d.key),
        goals: cleanGoals(d.goals),
        done: d.done === true,
        streak: Math.round(num(d.streak, 0, 100000, 0)),
        lastDone: dateKey(d.lastDone),
      };
    })(),
    savedAt: num(r.savedAt, 0, 9e15, Date.now()),
    playSeconds: num(r.playSeconds, 0, 1e9, 0),
    gen: Math.round(num(r.gen, 1, 99, 1)),
    rangoMax: Math.max(Math.round(num(r.rangoMax, 0, 4, 0)), Math.round(num(r.rank, 0, 4, 0))),
    gloriaPrev: Math.round(num(r.gloriaPrev, 0, 1e12, 0)),
    offline: (() => {
      const o = r.offline && typeof r.offline === "object" ? (r.offline as Record<string, unknown>) : {};
      return { key: dateKey(o.key), min: num(o.min, 0, 1440, 0) };
    })(),
    tristeza: Math.round(num(r.tristeza, 0, 3, 0)),
  };
}

export function progressView(s: SaveData): ProgressView {
  return {
    built: (id) => !!s.built[id],
    rank: s.rank,
    sabiduria: s.sabiduria,
    ofrendas: s.ofrendas,
    story: (id) => !!s.story[id],
    helpers: (id) => s.helpers[id] || 0,
  };
}

/** Gloria de la generación actual: lo que vuelve a empezar en una nueva generación. */
function gloriaGen(s: SaveData): number {
  const built = Object.values(s.built).filter(Boolean).length;
  const helpers = Object.values(s.helpers).reduce((a, b) => a + (b || 0), 0);
  const ups = Object.values(s.upgrades).reduce((a, b) => a + (b || 0), 0);
  return built * 100 + helpers * 60 + ups * 20 + s.rank * 300 + (s.finale ? 1500 : 0) + s.sabiduria * 25 + s.lifetimeGozo / 40;
}

/** "Gloria del templo": el puntaje de la tabla de los mejores. Crece con todo lo logrado y nunca baja. */
export function gloria(s: SaveData): number {
  const st = s.stats || {};
  return Math.round(gloriaGen(s) + (s.gloriaPrev || 0) + (st.jornadas || 0) * 40 + (st.estrellas || 0) * 15 + copas(s.logros || {}) * 20);
}

/** Gozo de más por cada generación: +25 % cada una, hasta +100 %. */
export function genBonus(s: Pick<SaveData, "gen">): number {
  return 0.25 * Math.min(4, Math.max(0, (s.gen || 1) - 1));
}

/**
 * Nueva generación (opcional, al terminar la historia): el templo vuelve a las ruinas y se empieza
 * como aprendiz, pero se quedan las copas, las jornadas con sus adornos, el libro, el desafío del
 * día, los días de servicio, el cargo más alto y la gloria. Cada generación da más gozo.
 */
export function nuevaGeneracion(old: SaveData): SaveData {
  const base = newSave();
  const gen = Math.min(99, (old.gen || 1) + 1);
  return {
    ...base,
    gen,
    rangoMax: Math.max(old.rangoMax || 0, old.rank),
    gloriaPrev: Math.round((old.gloriaPrev || 0) + gloriaGen(old)),
    gozo: base.gozo + 100 * (gen - 1),
    lessons: [...old.lessons],
    day: old.day,
    jornada: { n: old.jornada.n, goals: [], startedAt: 0, stars: old.jornada.stars },
    stats: { ...old.stats },
    logros: { ...old.logros },
    daily: old.daily.done ? { ...old.daily, goals: old.daily.goals.map((g) => ({ ...g })) } : { ...old.daily, key: "", goals: [] },
    playSeconds: old.playSeconds,
    offline: { ...old.offline },
  };
}

/** Gozo por minuto que traen los levitas mientras no se juega. */
export function offlineRate(s: SaveData): number {
  const h = s.helpers;
  let rate = 0;
  if (h.lenero) rate += 3;
  if (h.ayudante) rate += 8;
  if (h.portero) rate += 4;
  if (h.aceitero) rate += 3;
  if (h.panadero) rate += 3;
  if (h.incensario) rate += 3;
  rate += (h.cantor || 0) * 2;
  if (h.conanias) rate += 6 + Math.min(40, s.abundance * 0.2);
  return rate * (1 + (s.upgrades.abundancia || 0) * 0.2) * (1 + genBonus(s));
}

/**
 * Lo que hicieron los levitas mientras no jugabas. Para que sea justo y se crezca parejo, sirven
 * como mucho 2 horas cada vez que te vas y 3 horas por día; la primera hora rinde completa y la
 * segunda, la mitad.
 */
export function applyOffline(s: SaveData, now = Date.now()): { gained: number; minutes: number; away: number; leftToday: number } {
  const away = Math.max(0, (now - s.savedAt) / 60000);
  const key = todayKey(new Date(now));
  const used = s.offline?.key === key ? s.offline.min : 0;
  if (away < 2) return { gained: 0, minutes: 0, away: Math.floor(away), leftToday: Math.floor(OFFLINE_DIA_MIN - used) };
  const minutes = Math.min(away, Math.max(0, Math.min(OFFLINE_CAP_MIN, OFFLINE_DIA_MIN - used)));
  const efectivos = Math.min(minutes, 60) + Math.max(0, minutes - 60) * 0.5;
  const gained = Math.floor(offlineRate(s) * efectivos);
  s.offline = { key, min: used + minutes };
  if (gained > 0) {
    s.gozo += gained;
    s.lifetimeGozo += gained;
  }
  return { gained, minutes: Math.floor(minutes), away: Math.floor(away), leftToday: Math.max(0, Math.floor(OFFLINE_DIA_MIN - used - minutes)) };
}

export function loadLocal(): SaveData | null {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    return raw ? sanitize(JSON.parse(raw)) : null;
  } catch {
    return null;
  }
}

export function saveLocal(s: SaveData) {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(s));
  } catch {
    /* modo privado o sin espacio: se juega igual */
  }
}

export function clearLocal() {
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch {
    /* nada */
  }
}

// ---------------------------------------------------------------- servidor (solo con cuenta)
/** El respaldo que guarda el servidor: una partida más avanzada que fue reemplazada. */
export type Respaldo = ResumenPartida & { at: string | null };

export async function loadRemote(): Promise<{ save: SaveData | null; respaldo: Respaldo | null }> {
  try {
    const res = await fetch(`/api/juegos/${GAME_SLUG}/partida`, { credentials: "include", cache: "no-store" });
    if (!res.ok) return { save: null, respaldo: null };
    const body = await res.json();
    return { save: body?.data ? sanitize(body.data) : null, respaldo: body?.respaldo ?? null };
  } catch {
    return { save: null, respaldo: null };
  }
}

/** Vuelve a la partida del respaldo (la de ahora queda de respaldo). */
export async function recuperarRespaldo(): Promise<SaveData | null> {
  try {
    const res = await fetch(`/api/juegos/${GAME_SLUG}/partida/recuperar`, { method: "POST", credentials: "include" });
    if (!res.ok) return null;
    const body = await res.json();
    return body?.data ? sanitize(body.data) : null;
  } catch {
    return null;
  }
}

/** Resumen corto para mostrar una partida: «Día 140 · Sumo sacerdote · 14 lugares · 2.ª generación». */
export function textoPartida(r: ResumenPartida, rangos: string[]): string {
  const partes = [`Día ${r.dia}`, rangos[r.rango] || "Aprendiz", `${r.lugares} ${r.lugares === 1 ? "lugar" : "lugares"}`];
  if (r.gen > 1) partes.push(`${r.gen}.ª generación`);
  partes.push(`${Math.round(r.segundos / 60)} min jugados`);
  return partes.join(" · ");
}

/**
 * Cuál partida cargar al abrir el juego con cuenta.
 * - Si una sigue a la otra, la más avanzada (y si es la del teléfono, se sube a la cuenta).
 * - Si se jugaron por separado, hay que preguntar.
 */
export function elegirPartida(local: SaveData | null, remota: SaveData | null): { cargar: SaveData | null; subir: boolean; preguntar: boolean } {
  if (!local) return { cargar: remota, subir: false, preguntar: false };
  if (!remota) return { cargar: local, subir: true, preguntar: false };
  const rl = resumenPartida(local), rr = resumenPartida(remota);
  if (!rl || !rr) return { cargar: remota, subir: false, preguntar: false };
  const c = compararPartidas(rl, rr);
  if (c === "a") return { cargar: local, subir: true, preguntar: false };
  if (c === "b") return { cargar: remota, subir: false, preguntar: false };
  if (c === "igual") return local.savedAt > remota.savedAt + 1000 ? { cargar: local, subir: true, preguntar: false } : { cargar: remota, subir: false, preguntar: false };
  // se jugaron por separado: mientras tanto se muestra la más avanzada
  return { cargar: rr.peso >= rl.peso ? remota : local, subir: false, preguntar: true };
}

export async function saveRemote(s: SaveData): Promise<boolean> {
  try {
    const res = await fetch(`/api/juegos/${GAME_SLUG}/partida`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: s }),
      keepalive: true,
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function submitScore(s: SaveData): Promise<void> {
  try {
    await fetch(`/api/juegos/${GAME_SLUG}/puntaje`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        score: gloria(s),
        seconds: Math.round(s.playSeconds),
        meta: { rango: Math.max(s.rank, s.rangoMax || 0), jornada: s.stats.jornadas || 0, copas: copas(s.logros || {}), gen: s.gen || 1 },
      }),
    });
  } catch {
    /* sin conexión: se manda la próxima vez */
  }
}
