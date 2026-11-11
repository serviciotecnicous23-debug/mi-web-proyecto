/**
 * «¿Quién es sabio?» (Santiago 3:13): el gran concurso de la casa de la sabiduría (Proverbios 9:1),
 * pedido de Luis el 2026-11-10. Un concurso de televisión a la manera bíblica, con su propio decorado,
 * su música y su presentador (Etán ezraíta, el sabio de 1 Reyes 4:31): no copia ningún programa real.
 *
 * - Quince gradas, una pregunta por grada y cada vez más difícil (como los quince cánticos graduales,
 *   Salmos 120 a 134). Las gradas 5 y 10 son seguras: si fallas después, te quedas con ellas.
 * - Puedes retirarte con lo ganado antes de responder. Cada pregunta tiene su reloj.
 * - Comodines (uno de cada uno por partida): el aventador quita dos respuestas, los ancianos de la puerta
 *   dicen qué responde el pueblo, un amigo da su consejo y, desde la grada 10 alguna vez, otro rollo cambia
 *   la pregunta.
 * - Banco de 50 preguntas por grada (750): salen al azar y a una persona no se le repiten hasta que vea
 *   todas las de esa grada; el orden de las respuestas cambia en cada partida.
 * - Siete entradas por día (las siete columnas). Puntos de sabiduría para las tablas de la semana y de
 *   siempre, gozo con tope diario, títulos y trajes de los sabios que solo se ganan aquí.
 *
 * El servidor lleva todo: elige la pregunta, guarda la hora en que se mostró y corrige.
 * Las citas entre comillas son textuales de la Reina-Valera 1960.
 */
import type { Verso } from "./ciudad";

export const NOMBRE_CONCURSO = "¿Quién es sabio?";
export const VERSO_CONCURSO: Verso = { text: "¿Quién es sabio y avisado entre vosotros? muestre por buena conversación sus obras en mansedumbre de sabiduría.", ref: "Santiago 3:13" };
export const VERSO_CASA: Verso = { text: "La sabiduría edificó su casa, Labró sus siete columnas.", ref: "Proverbios 9:1" };
export const VERSO_PRESENTADOR: Verso = {
  text: "Aun fue más sabio que todos los hombres, más que Etán ezraíta, y que Hemán, Calcol y Darda, hijos de Mahol;",
  ref: "1 Reyes 4:31",
};

export const GRADAS = 15;
export const GRADAS_SEGURAS = [5, 10] as const;
/** Puntos de sabiduría por grada alcanzada (índice = gradas acertadas). */
export const PUNTOS_GRADA = [0, 100, 200, 300, 500, 1000, 2000, 3000, 5000, 8000, 15000, 25000, 50000, 100000, 250000, 500000];
/** Gozo de Jerusalén en línea al terminar, por la grada con que te quedas. */
export const GOZO_GRADA = [0, 1, 2, 3, 4, 8, 10, 12, 14, 16, 25, 30, 35, 40, 50, 100];
/** Tope de gozo por día que da el concurso (las tablas y los trajes no tienen tope). */
export const GOZO_SABIO_DIA = 150;
/** Entradas por día: las siete columnas de la casa de la sabiduría. */
export const ENTRADAS_DIA = 7;
/** Premio de gozo para los tres primeros de la tabla de la semana (se entrega al volver la semana siguiente). */
export const PREMIO_SEMANA = [60, 40, 25];

/** Segundos para responder cada grada. */
export function segundosGrada(n: number): number {
  return n <= 5 ? 30 : n <= 10 ? 45 : 60;
}
/** Usar un comodín da unos segundos más para pensar. */
export const SEGUNDOS_COMODIN = 10;
/** El cántico gradual de cada grada (Salmos 120 a 134). */
export function canticoGrada(n: number): string {
  return `Salmo ${119 + Math.max(1, Math.min(GRADAS, n))}`;
}
/** Las gradas seguras que ya se pasaron: con cuánto te quedas si fallas. */
export function gradaSegura(acertadas: number): number {
  let s = 0;
  for (const g of GRADAS_SEGURAS) if (acertadas >= g) s = g;
  return s;
}

// ---------------------------------------------------------------- los comodines
export type Comodin = "aventador" | "ancianos" | "amigo" | "rollo";
export const COMODINES: Record<Comodin, { nombre: string; icono: string; texto: string; verso: Verso }> = {
  aventador: {
    nombre: "El aventador",
    icono: "🌾",
    texto: "Limpia la era: quita dos respuestas que no son.",
    verso: { text: "Su aventador está en su mano, y limpiará su era;", ref: "Mateo 3:12" },
  },
  ancianos: {
    nombre: "Los ancianos de la puerta",
    icono: "👴",
    texto: "Muestra qué respondió el pueblo a esta pregunta.",
    verso: { text: "Mas en la multitud de consejeros hay seguridad.", ref: "Proverbios 11:14" },
  },
  amigo: {
    nombre: "Un amigo",
    icono: "🤝",
    texto: "Husai, el amigo del rey, te da su consejo.",
    verso: { text: "Así vino Husai amigo de David a la ciudad;", ref: "2 Samuel 15:37" },
  },
  rollo: {
    nombre: "Otro rollo",
    icono: "📜",
    texto: "Cambia la pregunta por otra de la misma grada. Se abre cuando llegas alguna vez a la grada 10.",
    verso: { text: "Abrió, pues, Esdras el libro a ojos de todo el pueblo,", ref: "Nehemías 8:5" },
  },
};
export const ORDEN_COMODINES: Comodin[] = ["aventador", "ancianos", "amigo", "rollo"];

// ---------------------------------------------------------------- la clasificación (títulos)
export type Titulo = { id: string; nombre: string; icono: string; requisito: string };
export const TITULOS: Titulo[] = [
  { id: "oyente", nombre: "Oyente", icono: "👂", requisito: "Juega tu primera partida" },
  { id: "entendido", nombre: "Entendido", icono: "📖", requisito: "Llega a la grada 5" },
  { id: "prudente", nombre: "Prudente", icono: "🕯️", requisito: "Llega a la grada 10" },
  { id: "sabio", nombre: "Sabio", icono: "🌟", requisito: "Sube las quince gradas" },
  { id: "sabio-israel", nombre: "Sabio de Israel", icono: "🏛️", requisito: "Gana 3 veces" },
  { id: "consejero", nombre: "Consejero del rey", icono: "👑", requisito: "Gana 7 veces" },
  { id: "corazon", nombre: "Corazón sabio y entendido", icono: "💎", requisito: "Gana 15 veces" },
];

/** El título que corresponde a lo logrado (y el siguiente). */
export function tituloDe(s: { partidas: number; mejor: number; ganadas: number }): { actual: Titulo | null; siguiente: Titulo | null } {
  const logrados = [
    s.partidas >= 1,
    s.mejor >= 5,
    s.mejor >= 10,
    s.ganadas >= 1,
    s.ganadas >= 3,
    s.ganadas >= 7,
    s.ganadas >= 15,
  ];
  let i = -1;
  for (let k = 0; k < logrados.length; k++) if (logrados[k]) i = k;
  return { actual: i >= 0 ? TITULOS[i] : null, siguiente: TITULOS[i + 1] ?? null };
}

// ---------------------------------------------------------------- los trajes de los sabios (solo se ganan aquí)
export type PremioSabio = { id: string; nombre: string; requisito: string; color: string };
/** Mantos y fajas que van al armario de la casa (shared/mercado.ts los lista como exclusivos). */
export const TRAJES_SABIOS: PremioSabio[] = [
  { id: "faja-entendidos", nombre: "Faja de los entendidos", requisito: "Llega por primera vez a la grada 5", color: "#5a3fa6" },
  { id: "manto-prudentes", nombre: "Manto púrpura de los prudentes", requisito: "Llega por primera vez a la grada 10", color: "#5b2470" },
  { id: "manto-sabios", nombre: "Manto blanco de los sabios", requisito: "Sube las quince gradas", color: "#f4efe0" },
  { id: "faja-salomon", nombre: "Faja de oro de Salomón", requisito: "Gana sin usar ningún comodín", color: "#d6a21e" },
  { id: "manto-consejero", nombre: "Manto de grana del consejero", requisito: "Gana 3 veces", color: "#a3122a" },
  { id: "faja-tres-dobleces", nombre: "Faja de tres dobleces", requisito: "Llega a la grada 10 en tres partidas seguidas", color: "#2c6e5f" },
];
export const VERSO_TRAJES: Verso = { text: "Adorno de gracia dará a tu cabeza; Corona de hermosura te entregará.", ref: "Proverbios 4:9" };

// ---------------------------------------------------------------- lo que dice el presentador (original)
export const FRASES_PRESENTADOR = {
  bienvenida: "¡Bienvenido a la casa de la sabiduría! Siete columnas, quince gradas y una sola pregunta: ¿quién es sabio?",
  ultima: "¿Es tu última palabra?",
  bien: ["¡Sabia respuesta!", "¡Así es! Subes una grada más.", "¡Correcto! El pueblo aplaude en la puerta.", "¡Bien dicho! La sabiduría te acompaña."],
  segura: "¡Grada segura! Esos puntos ya nadie te los quita.",
  mal: "Lo siento… no era esa.",
  tiempo: "Se acabó el tiempo…",
  retiro: { text: "Aun el necio, cuando calla, es contado por sabio; El que cierra sus labios es entendido.", ref: "Proverbios 17:28" } as Verso,
  gano: { text: "he aquí que te he dado corazón sabio y entendido,", ref: "1 Reyes 3:12" } as Verso,
};

// ---------------------------------------------------------------- respuestas de la API
export type PreguntaVista = {
  /** La grada que se juega (1 a 15). */
  n: number;
  texto: string;
  opciones: string[];
  /** Índices quitados por el aventador. */
  quitadas: number[];
  segundos: number;
  /** Segundos que quedan según el servidor. */
  restantes: number;
};

export type PartidaVista = {
  id: number;
  /** Gradas acertadas. */
  grada: number;
  puntos: number;
  /** Con cuánto te quedas si fallas. */
  seguro: number;
  pregunta: PreguntaVista | null;
  usados: Comodin[];
  /** El comodín «otro rollo» está abierto para esta persona. */
  rolloAbierto: boolean;
  ancianos: number[] | null;
  amigo: { quien: string; opcion: number; dice: string } | null;
};

export type FinPartida = {
  estado: "perdio" | "retiro" | "gano" | "tiempo";
  /** Gradas con que te quedas (las acertadas, o la segura si fallaste). */
  grada: number;
  puntos: number;
  gozo: number;
  /** Ya llegó al tope de gozo del día. */
  topeGozo: boolean;
  premios: PremioSabio[];
  titulo: Titulo | null;
  tituloNuevo: boolean;
  /** La respuesta correcta de la última pregunta (si se falló o se retiró con una pregunta a la vista). */
  correcta: string | null;
  explica: string | null;
  ref: string | null;
  gozoTotal: number;
};

export type RespuestaSabio = {
  correcta: boolean;
  /** El texto de la respuesta correcta y la explicación con su cita. */
  respuesta: string;
  explica: string;
  ref: string;
  partida: PartidaVista | null;
  fin: FinPartida | null;
};

export type FilaTabla = { puesto: number; nombre: string; puntos: number; grada: number; ganadas?: number; esYo: boolean };

export type SabioEstado = {
  partida: PartidaVista | null;
  yo: {
    partidas: number;
    mejor: number;
    ganadas: number;
    total: number;
    titulo: Titulo | null;
    siguiente: Titulo | null;
    premios: string[];
    entradasHoy: number;
    gozoHoy: number;
    rolloAbierto: boolean;
  };
  semana: string;
  tablaSemana: FilaTabla[];
  tablaSiempre: FilaTabla[];
  miPuestoSemana: number | null;
  /** Premio de la semana pasada que se acaba de entregar. */
  premioSemana: { puesto: number; gozo: number } | null;
};
