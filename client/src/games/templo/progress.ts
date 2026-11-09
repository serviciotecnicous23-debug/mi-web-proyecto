/**
 * El avance sin fin: jornadas con objetivos y estrellas (como los niveles de los juegos de
 * avance), logros con copas de bronce, plata y oro, el desafío del día y los adornos que el
 * templo va ganando. Todo se calcula aquí, sin el mundo 3D, para poder probarlo y guardarlo.
 */
import type { ProgressView } from "./data";
import { TEMPLO_LOGROS_NOMBRES as N } from "@shared/games";

// ---------------------------------------------------------------- objetivos
export type GoalKind =
  | "ofrendas" | "corderos" | "palomas" | "cereal" | "familias" | "lena" | "lavar" | "gozo" | "preguntas"
  | "aceite" | "panes" | "incienso" | "diezmos" | "orantes" | "fuegoVivo" | "noche" | "pueblo";

type GoalDef = {
  kind: GoalKind;
  icono: string;
  texto: (n: number) => string;
  /** Cuánto se pide en la jornada 1 y cuánto puede llegar a pedirse. */
  base: number;
  tope: number;
  /** Segundos que toma cada unidad, más o menos (para las estrellas). */
  seg: number;
  peso: number;
  requiere: (s: ProgressView) => boolean;
};

const plural = (n: number, uno: string, varios: string) => (n === 1 ? uno : varios);

export const GOALS: GoalDef[] = [
  { kind: "ofrendas", icono: "🔥", texto: (n) => `Presenta ${n} ${plural(n, "ofrenda", "ofrendas")} en el altar`, base: 5, tope: 120, seg: 9, peso: 5, requiere: (s) => s.built("altar") },
  { kind: "corderos", icono: "🐑", texto: (n) => `Presenta ${n} ${plural(n, "cordero", "corderos")}`, base: 2, tope: 40, seg: 22, peso: 2, requiere: (s) => s.built("altar") },
  { kind: "palomas", icono: "🕊️", texto: (n) => `Presenta ${n} ${plural(n, "par de palomas", "pares de palomas")}`, base: 2, tope: 40, seg: 20, peso: 2, requiere: (s) => s.built("altar") },
  { kind: "cereal", icono: "🌾", texto: (n) => `Presenta ${n} ${plural(n, "ofrenda", "ofrendas")} de flor de harina`, base: 2, tope: 30, seg: 30, peso: 1.5, requiere: (s) => s.built("altar") },
  { kind: "familias", icono: "🚪", texto: (n) => `Recibe tú mismo ${n} ${plural(n, "ofrenda", "ofrendas")} en la puerta`, base: 4, tope: 90, seg: 10, peso: 3, requiere: (s) => s.built("puertas") },
  { kind: "lena", icono: "🪵", texto: (n) => `Lleva ${n} ${plural(n, "leño", "leños")} al altar`, base: 6, tope: 90, seg: 6, peso: 3, requiere: (s) => s.built("altar") && s.helpers("lenero") === 0 },
  { kind: "lavar", icono: "💧", texto: (n) => `Lávate ${n} ${plural(n, "vez", "veces")} en el mar de bronce`, base: 2, tope: 25, seg: 40, peso: 2, requiere: (s) => s.built("fuente") },
  { kind: "gozo", icono: "✨", texto: (n) => `Recoge ${n} de gozo en la fuente dorada`, base: 40, tope: 60000, seg: 0.6, peso: 3, requiere: (s) => s.built("puertas") },
  { kind: "preguntas", icono: "📜", texto: (n) => `Responde bien ${n} ${plural(n, "pregunta", "preguntas")}`, base: 1, tope: 6, seg: 70, peso: 1.5, requiere: (s) => s.built("altar") },
  { kind: "aceite", icono: "🫒", texto: (n) => `Lleva ${n} ${plural(n, "jarro", "jarros")} de aceite al candelero`, base: 4, tope: 60, seg: 12, peso: 2, requiere: (s) => s.built("candelero") && s.helpers("aceitero") === 0 },
  { kind: "panes", icono: "🍞", texto: (n) => `Pon ${n} ${plural(n, "pan", "panes")} en la mesa de oro`, base: 4, tope: 60, seg: 12, peso: 1.5, requiere: (s) => s.built("mesa") && s.helpers("panadero") === 0 },
  { kind: "incienso", icono: "🌿", texto: (n) => `Lleva ${n} ${plural(n, "porción", "porciones")} de incienso al altar de oro`, base: 2, tope: 30, seg: 25, peso: 1.5, requiere: (s) => s.built("altarIncienso") && s.helpers("incensario") === 0 },
  { kind: "orantes", icono: "🙏", texto: (n) => `Que oren ${n} personas a la hora del incienso`, base: 6, tope: 120, seg: 14, peso: 1, requiere: (s) => s.built("altarIncienso") },
  { kind: "diezmos", icono: "🌾", texto: (n) => `Guarda ${n} ${plural(n, "diezmo", "diezmos")} en las cámaras`, base: 4, tope: 80, seg: 12, peso: 2, requiere: (s) => s.built("camaras") },
  { kind: "pueblo", icono: "🧑‍🏫", texto: (n) => `Responde ${n} ${plural(n, "pregunta", "preguntas")} del pueblo`, base: 1, tope: 6, seg: 80, peso: 1, requiere: (s) => s.built("ensenanza") },
  { kind: "fuegoVivo", icono: "🔥", texto: (n) => `Mantén el fuego encendido ${n >= 60 ? `${Math.round(n / 60)} min` : `${n} s`} sin que se apague`, base: 60, tope: 1500, seg: 1, peso: 1.5, requiere: (s) => s.built("altar") },
  { kind: "noche", icono: "🕯️", texto: (n) => `Que las lámparas ardan ${n === 1 ? "toda una noche" : `${n} noches enteras`}`, base: 1, tope: 3, seg: 240, peso: 0.8, requiere: (s) => s.built("candelero") },
];

export const goalDef = (k: GoalKind) => GOALS.find((g) => g.kind === k)!;

export type Goal = { kind: GoalKind; target: number; progress: number };

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Objetivos de una jornada: se arman con lo que ya está restaurado y crecen con el número. */
export function makeGoals(n: number, view: ProgressView, seed: number, daily = false): Goal[] {
  const rnd = mulberry32(seed);
  const open = GOALS.filter((g) => g.requiere(view));
  const count = daily ? 3 : n <= 2 ? 1 : n <= 12 ? 2 : 3;
  const fiesta = !daily && n % 5 === 0 && n > 0;
  const want = Math.min(open.length, count + (fiesta && n > 4 ? 1 : 0));
  const picked: GoalDef[] = [];
  const pool = [...open];
  while (picked.length < want && pool.length) {
    const total = pool.reduce((a, g) => a + g.peso, 0);
    let r = rnd() * total;
    let i = 0;
    for (; i < pool.length - 1; i++) {
      r -= pool[i].peso;
      if (r <= 0) break;
    }
    const g = pool.splice(i, 1)[0];
    // no dos de presentar ofrendas a la vez (se pisan entre sí)
    if (["corderos", "palomas", "cereal"].includes(g.kind) && picked.some((p) => ["corderos", "palomas", "cereal"].includes(p.kind))) continue;
    picked.push(g);
  }
  const level = daily ? 4 + Math.min(20, view.rank * 4) : n;
  return picked.map((g) => {
    const grow = 1 + 0.14 * (level - 1) + 0.004 * (level - 1) * (level - 1);
    let target = g.base * grow * (fiesta ? 1.2 : 1);
    if (g.kind === "noche") target = 1 + Math.floor(level / 25);
    if (g.kind === "preguntas" || g.kind === "pueblo") target = 1 + Math.floor(level / 12);
    if (g.kind === "gozo") target = Math.round(target / 10) * 10;
    if (g.kind === "fuegoVivo") target = Math.round(target / 30) * 30;
    return { kind: g.kind, target: Math.max(1, Math.min(g.tope, Math.round(target))), progress: 0 };
  });
}

/** Segundos para las tres estrellas. */
export function parSeconds(goals: Goal[]): number {
  let s = 0;
  for (const g of goals) s = Math.max(s, g.target * goalDef(g.kind).seg);
  return Math.max(60, s * 1.15);
}

export function starsFor(goals: Goal[], seconds: number): 1 | 2 | 3 {
  const par = parSeconds(goals);
  return seconds <= par ? 3 : seconds <= par * 2 ? 2 : 1;
}

export function jornadaReward(n: number, stars: number): number {
  return Math.round((35 + 18 * n + 0.6 * n * n) * (0.6 + 0.2 * stars));
}

// ---------------------------------------------------------------- adornos que gana el templo
export type Adorno = { id: string; jornada: number; nombre: string; texto: string };

export const ADORNOS: Adorno[] = [
  { id: "palmeras", jornada: 5, nombre: "Palmeras en el atrio", texto: "«Plantados en la casa de Jehová, en los atrios de nuestro Dios florecerán» (Salmo 92:13)." },
  { id: "estandartes", jornada: 10, nombre: "Estandartes de las doce tribus", texto: "Cada tribu con su bandera, como en el desierto (Números 2:2)." },
  { id: "lirios", jornada: 15, nombre: "Lirios y granadas", texto: "Los capiteles tenían lirios y granadas (1 Reyes 7:19-20): ahora también el atrio." },
  { id: "braseros", jornada: 20, nombre: "Braseros de bronce", texto: "Más luz para las vigilias de la noche." },
  { id: "toldos", jornada: 25, nombre: "Toldos para los peregrinos", texto: "Sombra para las familias que llegan de lejos." },
  { id: "rebano", jornada: 30, nombre: "Corral de los corderos", texto: "Corderos sin defecto para las ofrendas (Éxodo 12:5)." },
  { id: "cantores", jornada: 40, nombre: "Coro de Asaf", texto: "Más levitas cantores con címbalos y arpas (1 Crónicas 25:1)." },
  { id: "oro", jornada: 50, nombre: "Pórtico adornado de oro", texto: "«Cubrió también la casa de piedras preciosas para ornamento» (2 Crónicas 3:6)." },
];

export function adornosFor(jornadasHechas: number) {
  return ADORNOS.filter((a) => jornadasHechas >= a.jornada);
}

// ---------------------------------------------------------------- logros
export type Stats = Partial<Record<StatKey, number>>;
export type StatKey =
  | "ofrendas" | "corderos" | "palomas" | "cereal" | "familias" | "lena" | "lavar" | "gozo" | "preguntas" | "pueblo"
  | "aceite" | "panes" | "incienso" | "diezmos" | "orantes" | "noches" | "fuegoMax" | "jornadas" | "estrellas" | "dias" | "racha"
  | "juicios" | "fiestas";

export type LogroDef = {
  id: string;
  nombre: string;
  icono: string;
  /** Logro por escalones (bronce, plata, oro) según una cuenta… */
  stat?: StatKey;
  niveles?: [number, number, number];
  unidad?: string;
  /** …o de una sola vez, por la historia. */
  historia?: string;
  texto: string;
};

export const LOGROS: LogroDef[] = [
  { id: "altar", nombre: N["altar"], icono: "🔥", stat: "ofrendas", niveles: [25, 250, 2500], unidad: "ofrendas", texto: "Ofrendas presentadas en el altar" },
  { id: "cordero", nombre: N["cordero"], icono: "🐑", stat: "corderos", niveles: [10, 100, 800], unidad: "corderos", texto: "Corderos presentados (Éxodo 12:5)" },
  { id: "palomas", nombre: N["palomas"], icono: "🕊️", stat: "palomas", niveles: [10, 100, 800], unidad: "pares", texto: "Palomas presentadas (Levítico 5:7)" },
  { id: "harina", nombre: N["harina"], icono: "🌾", stat: "cereal", niveles: [10, 100, 600], unidad: "ofrendas", texto: "Ofrendas de cereal (Levítico 2:1)" },
  { id: "puerta", nombre: N["puerta"], icono: "🚪", stat: "familias", niveles: [20, 200, 2000], unidad: "familias", texto: "Ofrendas que recibiste tú mismo" },
  { id: "lena", nombre: N["lena"], icono: "🪵", stat: "lena", niveles: [50, 500, 5000], unidad: "leños", texto: "Leños llevados al altar (Levítico 6:12)" },
  { id: "manos", nombre: N["manos"], icono: "💧", stat: "lavar", niveles: [10, 100, 500], unidad: "veces", texto: "Veces que te lavaste en el mar de bronce" },
  { id: "gozo", nombre: N["gozo"], icono: "✨", stat: "gozo", niveles: [1000, 25000, 250000], unidad: "de gozo", texto: "Gozo recogido en la fuente dorada" },
  { id: "sabio", nombre: N["sabio"], icono: "📜", stat: "preguntas", niveles: [5, 25, 80], unidad: "respuestas", texto: "Preguntas respondidas bien (Malaquías 2:7)" },
  { id: "maestro", nombre: N["maestro"], icono: "🧑‍🏫", stat: "pueblo", niveles: [5, 30, 120], unidad: "preguntas", texto: "Preguntas del pueblo respondidas" },
  { id: "luz", nombre: N["luz"], icono: "🕯️", stat: "noches", niveles: [1, 10, 50], unidad: "noches", texto: "Noches con las lámparas encendidas hasta la mañana" },
  { id: "fuego", nombre: N["fuego"], icono: "♨️", stat: "fuegoMax", niveles: [300, 1200, 3600], unidad: "s", texto: "Tiempo seguido con el fuego encendido (Levítico 6:13)" },
  { id: "pan", nombre: N["pan"], icono: "🍞", stat: "panes", niveles: [24, 240, 1200], unidad: "panes", texto: "Panes puestos en la mesa de oro" },
  { id: "aceite", nombre: N["aceite"], icono: "🫒", stat: "aceite", niveles: [20, 200, 1500], unidad: "jarros", texto: "Aceite llevado al candelero (Levítico 24:2)" },
  { id: "incienso", nombre: N["incienso"], icono: "🌿", stat: "incienso", niveles: [10, 100, 500], unidad: "porciones", texto: "Incienso llevado al altar de oro (Éxodo 30:7-8)" },
  { id: "oracion", nombre: N["oracion"], icono: "🙏", stat: "orantes", niveles: [25, 250, 2500], unidad: "personas", texto: "Personas que oraron a la hora del incienso (Isaías 56:7)" },
  { id: "diezmos", nombre: N["diezmos"], icono: "🧺", stat: "diezmos", niveles: [25, 250, 2500], unidad: "diezmos", texto: "Diezmos guardados en las cámaras (Malaquías 3:10)" },
  { id: "dias", nombre: N["dias"], icono: "🌅", stat: "dias", niveles: [7, 40, 365], unidad: "días", texto: "Días del juego sirviendo en el templo" },
  { id: "jornadas", nombre: N["jornadas"], icono: "🗺️", stat: "jornadas", niveles: [10, 50, 200], unidad: "jornadas", texto: "Jornadas completadas" },
  { id: "estrellas", nombre: N["estrellas"], icono: "⭐", stat: "estrellas", niveles: [25, 150, 600], unidad: "estrellas", texto: "Estrellas ganadas en las jornadas (Génesis 15:5)" },
  { id: "racha", nombre: N["racha"], icono: "📅", stat: "racha", niveles: [3, 7, 30], unidad: "días seguidos", texto: "Desafíos del día cumplidos seguidos" },
  { id: "juez", nombre: N["juez"], icono: "⚖️", stat: "juicios", niveles: [3, 10, 30], unidad: "juicios", texto: "Juicios justos como sacerdote (Deuteronomio 17:9)" },
  { id: "fiestas", nombre: N["fiestas"], icono: "🎺", stat: "fiestas", niveles: [3, 15, 60], unidad: "días de fiesta", texto: "Días de fiesta sirviendo en el templo (Levítico 23:2)" },
  { id: "h-puertas", nombre: N["h-puertas"], icono: "🚪", historia: "puertas", texto: "Abriste las puertas del templo (2 Crónicas 29:3)" },
  { id: "h-fuego", nombre: N["h-fuego"], icono: "🔥", historia: "primerFuego", texto: "Encendiste el altar" },
  { id: "h-rango1", nombre: N["h-rango1"], icono: "🕊️", historia: "rango1", texto: "Te vistieron de sacerdote (Éxodo 28:40)" },
  { id: "h-rango2", nombre: N["h-rango2"], icono: "🎺", historia: "rango2", texto: "Sacerdote de turno (Números 10:8)" },
  { id: "h-rey", nombre: N["h-rey"], icono: "👑", historia: "visitaRey", texto: "Ezequías vino a adorar (2 Crónicas 29:30)" },
  { id: "h-pascua", nombre: N["h-pascua"], icono: "🌙", historia: "pascua", texto: "Hubo gran regocijo en Jerusalén (2 Crónicas 30:26)" },
  { id: "h-rango3", nombre: N["h-rango3"], icono: "🏺", historia: "rango3", texto: "Principal de los sacerdotes" },
  { id: "h-rango4", nombre: N["h-rango4"], icono: "💎", historia: "rango4", texto: "Vestiduras para honra y hermosura (Éxodo 28:2)" },
  { id: "h-velo", nombre: N["h-velo"], icono: "✝️", historia: "finale", texto: "El camino al Lugar Santísimo está abierto (Hebreos 10:19-20)" },
  { id: "h-todo", nombre: N["h-todo"], icono: "🏛️", historia: "todo", texto: "Los catorce lugares del templo, restaurados" },
  { id: "h-levitas", nombre: N["h-levitas"], icono: "🤝", historia: "levitasTodos", texto: "Todos los levitas sirven contigo (2 Crónicas 29:34)" },
];

export const COPA = ["bronce", "plata", "oro"] as const;
export const COPA_PUNTOS = [1, 3, 10];
export const HISTORIA_PUNTOS = 5;

/** Escalón alcanzado (0 = ninguno, 1 bronce, 2 plata, 3 oro). */
export function logroNivel(def: LogroDef, stats: Stats, story: (id: string) => boolean): number {
  if (def.historia) return story(def.historia) ? 3 : 0;
  const v = stats[def.stat!] || 0;
  const [a, b, c] = def.niveles!;
  return v >= c ? 3 : v >= b ? 2 : v >= a ? 1 : 0;
}

export function copas(logros: Record<string, number>): number {
  let total = 0;
  for (const def of LOGROS) {
    const lv = logros[def.id] || 0;
    if (!lv) continue;
    if (def.historia) total += HISTORIA_PUNTOS;
    else for (let i = 0; i < lv; i++) total += COPA_PUNTOS[i];
  }
  return total;
}

// ---------------------------------------------------------------- desafío del día
export function todayKey(d = new Date()): string {
  const y = d.getFullYear(), m = String(d.getMonth() + 1).padStart(2, "0"), day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function daySeed(key: string): number {
  let h = 2166136261;
  for (let i = 0; i < key.length; i++) h = Math.imul(h ^ key.charCodeAt(i), 16777619);
  return h >>> 0;
}

export function dailyReward(streak: number): number {
  return 150 + 50 * Math.min(10, streak);
}
