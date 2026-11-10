/**
 * Las cátedras de Jerusalén en línea: lecciones cortas con una pregunta, cada una con su maestro. El
 * profeta aprende con Isaías mientras ora en el monte; el sacerdote, con Eleazar en la cámara de los
 * sacerdotes, junto al templo, que le enseña el porqué de lo que sirvió hoy; el siervo del rey, con
 * Eliaquim en el palacio: cómo debe gobernar un rey y la historia de los reyes. Cada lección enseña algo y
 * lo prueba con la Palabra; el servidor guarda la respuesta y corrige (server/catedras-banco.ts): el
 * teléfono solo muestra. Lo aprendido es de la persona; el tope del día es por camino.
 */
import type { Camino } from "./caminos";

export type CatedraArea = "oracion" | "sacerdotal" | "reyes";

export type CatedraMeta = {
  nombre: string;
  icono: string;
  camino: Camino;
  maestro: string;
  lugar: string;
  /** El botón para terminar (en la oración, «Amén» cumple la oración). */
  cierre: string;
  /** Lo que se dice cuando ya se aprendieron las lecciones del día. */
  manana: string;
  /** Los grados de quien aprende: del primero a haber aprendido todas las lecciones. */
  grados: [string, string, string, string, string];
  /** Se pueden pedir varias lecciones seguidas (en la cámara); en la oración, una por oración. */
  seguidas: boolean;
};

export const CATEDRAS: Record<CatedraArea, CatedraMeta> = {
  oracion: {
    nombre: "La cátedra de la oración",
    icono: "🙏",
    camino: "profecia",
    maestro: "Isaías",
    lugar: "el monte de la oración",
    cierre: "🙏 Amén",
    manana: "Tu oración igual cuenta: vuelve mañana por más.",
    grados: ["Oyente", "Discípulo de Isaías", "Intercesor", "Atalaya", "Maestro de oración"],
    seguidas: false,
  },
  sacerdotal: {
    nombre: "La cátedra sacerdotal",
    icono: "🕯️",
    camino: "sacerdocio",
    maestro: "Eleazar",
    lugar: "la cámara de los sacerdotes",
    cierre: "📜 Gracias, Eleazar",
    manana: "Sigue sirviendo en el templo: mañana Eleazar te enseña más.",
    grados: ["Oyente de la cámara", "Discípulo de Eleazar", "Ayudante del altar", "Guarda del santuario", "Maestro de la cámara"],
    seguidas: true,
  },
  reyes: {
    nombre: "La cátedra de los reyes",
    icono: "👑",
    camino: "realeza",
    maestro: "Eliaquim",
    lugar: "el palacio del rey",
    cierre: "👑 Gracias, Eliaquim",
    manana: "Sigue sirviendo al rey: mañana Eliaquim te enseña más.",
    grados: ["Oyente del palacio", "Discípulo de Eliaquim", "Lector de las crónicas", "Consejero prudente", "Maestro de los reyes"],
    seguidas: true,
  },
};

/** Lecciones por día en cada camino, entre todas sus cátedras (después la oración sigue contando, sin lección). */
export const CATEDRA_POR_DIA = 8;
/** Mérito de la temporada por cada respuesta correcta (además del deber). */
export const CATEDRA_MERITO = 3;

/** El grado según cuántas lecciones distintas aprendió (el último, al aprenderlas todas). */
export function gradoCatedra(area: CatedraArea, aprendidas: number, total: number): { n: number; nombre: string } {
  const n = total > 0 && aprendidas >= total ? 4 : Math.max(0, Math.min(3, Math.floor((aprendidas / Math.max(1, total)) * 4)));
  return { n, nombre: CATEDRAS[area].grados[n] };
}

/** De qué deber trata una lección (para «sobre lo que serviste hoy»). */
export const GRUPOS_CATEDRA: Record<string, string> = {
  lena: "la leña del altar",
  aceite: "el aceite de las lámparas",
  panes: "los panes de la proposición",
  incienso: "el incienso",
  diezmos: "los diezmos",
  ofrendas: "las ofrendas del pueblo",
  orantes: "los que vienen a orar",
  audiencia: "las audiencias del pueblo",
  pan: "el pan para los pobres",
  ley: "la copia de la ley",
};

export type LeccionVista = {
  id: string;
  tema: string;
  /** La enseñanza corta antes de la pregunta. */
  ensena: string;
  pregunta: string;
  opciones: string[];
  /** Lecciones de hoy en el camino y el tope. */
  hoy: number;
  max: number;
  /** Cuántas lecciones distintas ya aprendió la persona y cuántas hay. */
  aprendidas: number;
  total: number;
  /** Si trata de algo que se sirvió hace poco: de qué (GRUPOS_CATEDRA). */
  sobre?: string | null;
};

export type CatedraRespuesta = {
  correcta: boolean;
  respuesta: string;
  explica: string;
  ref: string;
  premio: { merito: number; gozo: number };
  hoy: number;
  max: number;
  aprendidas: number;
  total: number;
  /** El gozo de la persona después del premio (para el contador de la pantalla). */
  gozoTotal?: number;
};
