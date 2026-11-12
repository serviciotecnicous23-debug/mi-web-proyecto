/**
 * El barrio juntos (pedido de Luis: «misiones juntos y competencia entre barrios»):
 *
 * - La misión del barrio de hoy: reunirse con vecinos del propio barrio en un lugar de la ciudad (orar juntos en el
 *   monte, junto al pozo de la plaza, a las puertas de la casa de la sabiduría…) y quedarse juntos unos segundos. El
 *   servidor lo ve con la presencia de la ciudad: son personas de verdad, nada se simula. Una vez por día por persona.
 * - La copa de los barrios: lo que hace cada vecino (deberes del templo, encargos, el concurso, los duelos, los
 *   consejos y las misiones juntos) suma puntos a su barrio en la semana. Los tres primeros barrios reciben gozo
 *   para cada vecino que aportó; los puntos de siempre suben el nivel del barrio, que se ve en sus calles.
 *
 * Las citas entre comillas son textuales de la Reina-Valera 1960.
 */
import type { Verso } from "./ciudad";

// ---------------------------------------------------------------- la misión del barrio de hoy
export type MisionJuntosId = "orar" | "pozo" | "sabiduria" | "templo" | "ancianos" | "mercado" | "barrio";
export type MisionJuntos = {
  id: MisionJuntosId;
  titulo: string;
  icono: string;
  /** Dónde (para el texto) y a qué lugar lleva «Ir allí» (los de «Ir a…» de la ciudad). */
  lugar: string;
  irA: "oracion" | "plaza" | "sabiduria" | "templo" | "puerta" | "mercado" | "casa";
  /** El centro y el radio del lugar (en la ciudad). La del barrio es en el área del propio barrio. */
  x: number;
  z: number;
  radio: number;
  enBarrio?: boolean;
  /** Cuántos vecinos del barrio tienen que estar juntos. */
  minimo: number;
  verso: Verso;
};

export const MISIONES_JUNTOS: MisionJuntos[] = [
  {
    id: "orar",
    titulo: "Oren juntos en el monte de la oración",
    icono: "⛰️",
    lugar: "el monte de la oración",
    irA: "oracion",
    x: 5.4,
    z: -28.5,
    radio: 5,
    minimo: 2,
    verso: { text: "Porque donde están dos o tres congregados en mi nombre, allí estoy yo en medio de ellos.", ref: "Mateo 18:20" },
  },
  {
    id: "pozo",
    titulo: "Reúnanse junto al pozo de la plaza",
    icono: "🪣",
    lugar: "el pozo de la plaza",
    irA: "plaza",
    x: 56,
    z: 3.2,
    radio: 5,
    minimo: 3,
    verso: { text: "¡Mirad cuán bueno y cuán delicioso es Habitar los hermanos juntos en armonía!", ref: "Salmo 133:1" },
  },
  {
    id: "sabiduria",
    titulo: "Vayan juntos a la casa de la sabiduría",
    icono: "🏛️",
    lugar: "la puerta de la casa de la sabiduría",
    irA: "sabiduria",
    x: 44.2,
    z: 8,
    radio: 4.5,
    minimo: 2,
    verso: { text: "Que juntos comunicábamos dulcemente los secretos, Y andábamos en amistad en la casa de Dios.", ref: "Salmo 55:14" },
  },
  {
    id: "templo",
    titulo: "Suban juntos al templo",
    icono: "🔥",
    lugar: "la escalinata del templo",
    irA: "templo",
    x: 38.6,
    z: 0,
    radio: 5,
    minimo: 2,
    verso: { text: "Y perseverando unánimes cada día en el templo,", ref: "Hechos 2:46" },
  },
  {
    id: "ancianos",
    titulo: "Vayan juntos a los ancianos de la puerta",
    icono: "👴",
    lugar: "la puerta de los ancianos",
    irA: "puerta",
    x: 70.6,
    z: 0,
    radio: 5,
    minimo: 2,
    verso: { text: "¿Andarán dos juntos, si no estuvieren de acuerdo?", ref: "Amós 3:3" },
  },
  {
    id: "mercado",
    titulo: "Vayan juntos al mercado",
    icono: "🛒",
    lugar: "el mercado de la plaza",
    irA: "mercado",
    x: 51,
    z: 7,
    radio: 5.5,
    minimo: 2,
    verso: { text: "Mejores son dos que uno; porque tienen mejor paga de su trabajo.", ref: "Eclesiastés 4:9" },
  },
  {
    id: "barrio",
    titulo: "Reúnanse en la calle de su barrio",
    icono: "🏘️",
    lugar: "la calle de tu barrio",
    irA: "casa",
    x: 0,
    z: 0,
    radio: 6,
    enBarrio: true,
    minimo: 3,
    verso: { text: "porque el pueblo tuvo ánimo para trabajar.", ref: "Nehemías 4:6" },
  },
];

/** Segundos que tienen que quedarse juntos. */
export const JUNTOS_SEGUNDOS = 20;
export const GOZO_JUNTOS = 15;
export const MERITO_JUNTOS = 15;

function semilla(texto: string): number {
  let x = 2166136261;
  for (const ch of texto) x = Math.imul(x ^ ch.charCodeAt(0), 16777619) >>> 0;
  return x || 1;
}

/** La misión de hoy de un barrio: la misma para todos sus vecinos ese día (cada barrio tiene la suya). */
export function misionJuntosDelDia(dia: string, barrio: number): MisionJuntos {
  return MISIONES_JUNTOS[semilla(`${dia}:juntos:${barrio}`) % MISIONES_JUNTOS.length];
}

// ---------------------------------------------------------------- la copa de los barrios
/** Puntos para el barrio por lo que hace cada vecino. */
export const COPA_PUNTOS = {
  deber: 1,
  encargo: 5,
  encargosTodos: 10,
  /** Por cada grada con que termina una partida de «¿Quién es sabio?». */
  grada: 1,
  duelo: 3,
  dueloGanado: 5,
  consejo: 3,
  juntos: 10,
  /** Por cada cosa dada a una familia del pueblo (shared/pueblo.ts). */
  pueblo: 2,
  /** Por cada recado de la calle de los siervos cumplido (shared/personajes.ts). */
  recado: 5,
  /** Por cada 10 de gozo dados a la obra del barrio (shared/barrio-obras.ts). */
  obra: 1,
  /** Por cada vez que alguien se sienta a la mesa de un banquete (shared/banquete.ts). */
  banquete: 2,
} as const;
export type FuenteCopa = keyof typeof COPA_PUNTOS;

/** Gozo para cada vecino que aportó (al menos APORTE_COPA) de los tres primeros barrios de la semana. */
export const PREMIO_COPA = [50, 35, 20];
export const APORTE_COPA = 20;
export const VERSO_COPA: Verso = { text: "Corred de tal manera que lo obtengáis.", ref: "1 Corintios 9:24" };

export type NivelBarrio = { nivel: number; nombre: string; puntos: number; adorno: string; verso: Verso };
/** El nivel del barrio sube con los puntos de siempre (nunca baja) y se ve en sus calles. */
export const NIVELES_BARRIO: NivelBarrio[] = [
  { nivel: 0, nombre: "Barrio nuevo", puntos: 0, adorno: "Sus calles esperan a sus vecinos.", verso: { text: "porque el pueblo tuvo ánimo para trabajar.", ref: "Nehemías 4:6" } },
  {
    nivel: 1,
    nombre: "Barrio de las lámparas",
    puntos: 400,
    adorno: "Lámparas encendidas a lo largo de la calle.",
    verso: { text: "Vosotros sois la luz del mundo; una ciudad asentada sobre un monte no se puede esconder.", ref: "Mateo 5:14" },
  },
  { nivel: 2, nombre: "Barrio de los olivos", puntos: 1500, adorno: "Olivos en las esquinas de la calle.", verso: { text: "Pero yo estoy como olivo verde en la casa de Dios;", ref: "Salmo 52:8" } },
  { nivel: 3, nombre: "Barrio de la fuente", puntos: 4000, adorno: "Una fuente de agua en medio del barrio.", verso: { text: "Sacaréis con gozo aguas de las fuentes de la salvación.", ref: "Isaías 12:3" } },
  {
    nivel: 4,
    nombre: "Barrio de los estandartes",
    puntos: 9000,
    adorno: "Estandartes con el emblema del barrio.",
    verso: { text: "Nosotros nos alegraremos en tu salvación, Y alzaremos pendón en el nombre de nuestro Dios;", ref: "Salmo 20:5" },
  },
  {
    nivel: 5,
    nombre: "Barrio de la paz",
    puntos: 18000,
    adorno: "Un arco de piedra a la entrada del barrio.",
    verso: { text: "Sea la paz dentro de tus muros, Y el descanso dentro de tus palacios.", ref: "Salmo 122:7" },
  },
];

export function nivelDeBarrio(puntos: number): { actual: NivelBarrio; siguiente: NivelBarrio | null } {
  let i = 0;
  for (let k = 0; k < NIVELES_BARRIO.length; k++) if (puntos >= NIVELES_BARRIO[k].puntos) i = k;
  return { actual: NIVELES_BARRIO[i], siguiente: NIVELES_BARRIO[i + 1] ?? null };
}

// ---------------------------------------------------------------- respuestas de la API y de la red
/** Cómo va la misión de hoy (lo manda la red mientras estás en el lugar). */
export type JuntosProgreso = { mision: MisionJuntosId; aqui: number; minimo: number; segundos: number; hecha: boolean };

export type FilaCopa = { puesto: number; n: number; nombre: string; puntos: number; vecinos: number; nivel: number; esMio: boolean };
export type CopaEstado = {
  semana: string;
  tabla: FilaCopa[];
  mio: {
    n: number;
    nombre: string;
    puntos: number;
    puesto: number | null;
    miAporte: number;
    total: number;
    nivel: NivelBarrio;
    siguiente: NivelBarrio | null;
    copas: number;
  } | null;
  hoy: { mision: MisionJuntos; hecha: boolean; enLinea: number } | null;
  /** El premio de la copa de la semana pasada que se acaba de entregar. */
  premio: { puesto: number; gozo: number; barrio: string } | null;
};
