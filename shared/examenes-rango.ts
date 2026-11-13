/**
 * Los exámenes de rango de Jerusalén en línea: cada camino (sacerdocio, profecía y realeza) tiene sus cinco escalones, y
 * para cada escalón del 2 al 5 hay un examen propio, de 3 o 4 partes, sobre lo que debe saber ese rango. Se dan en el
 * aula del edificio del camino (AulaUI.tsx), con el maestro.
 *
 * - Cada parte se da cuando uno quiere, cualquier día, y queda guardada. Si se falla, hay que esperar para repetirla
 *   (15, 30 y después 60 minutos) y vuelve con preguntas que todavía no salieron. También se puede dar todo de corrido.
 * - El examen 2 hace falta para ser «de turno» (vidente, escriba del rey); el 3, el 4 y el 5 para recibir el cargo de su
 *   escalón al cerrar la temporada. Los cargos altos piden además el saber al día: el examen aprobado en esa temporada
 *   o su repaso corto.
 * - Aprobar un examen da mérito, gozo y la prenda de ese rango (no se vende: se gana).
 *
 * Las preguntas y sus respuestas están SOLO en el servidor (server/examenes-rango-banco.ts); llegan de a una, con las
 * opciones en un orden que decide el servidor, y la respuesta solo después de responder.
 * «Procura con diligencia presentarte a Dios aprobado, como obrero que no tiene de qué avergonzarse» (2 Timoteo 2:15)
 */
import { CAMINOS, CAMINOS_LISTA, type Camino } from "./caminos";
import type { MaestroId } from "./aula";
import { PARTES_RANGO } from "./examenes-rango-partes";

export type EscalonExamen = 2 | 3 | 4 | 5;
export const ESCALONES_EXAMEN: EscalonExamen[] = [2, 3, 4, 5];
export type ExamenRangoId = `${Camino}-${EscalonExamen}`;

export const VERSO_RANGO = {
  text: "Procura con diligencia presentarte a Dios aprobado, como obrero que no tiene de qué avergonzarse, que usa bien la palabra de verdad.",
  ref: "2 Timoteo 2:15",
};

/** Cuántas preguntas trae cada parte y cuántas hacen falta para aprobarla, según el escalón. */
export const MEDIDA_RANGO: Record<EscalonExamen, { preguntas: number; aprueba: number }> = {
  2: { preguntas: 6, aprueba: 5 },
  3: { preguntas: 7, aprueba: 6 },
  4: { preguntas: 7, aprueba: 6 },
  5: { preguntas: 8, aprueba: 7 },
};
/** Segundos de cada pregunta (el reloj lo lleva el servidor) y el margen por la conexión. */
export const SEGUNDOS_RANGO = 40;
export const MARGEN_RANGO = 6;
/** Minutos de espera para repetir una parte que se falló: la 1.ª vez, la 2.ª y de ahí en adelante. */
export const ESPERA_RANGO_MIN = [15, 30, 60] as const;
/** «De corrido»: todas las partes aprobadas a la primera dentro de estas horas. Da su sello y un poco de gozo. */
export const CORRIDO_HORAS = 3;
export const GOZO_CORRIDO = 20;
/** Lo que da aprobar cada examen (una sola vez): mérito de la temporada y gozo. */
export const PREMIO_RANGO: Record<EscalonExamen, { merito: number; gozo: number }> = {
  2: { merito: 40, gozo: 30 },
  3: { merito: 60, gozo: 50 },
  4: { merito: 80, gozo: 80 },
  5: { merito: 100, gozo: 120 },
};
/** El repaso de cada temporada para los cargos altos: de los bancos de los exámenes 4 (y 5), corto. */
export const REPASO_RANGO = { preguntas: 6, aprueba: 5, esperaMin: 15 } as const;
/** El gozo de más para quien va a una reunión que da alguien con el examen 3 de su camino (enseña en las reuniones). */
export const GOZO_REUNION_MAESTRO = 2;

/** El examen que pide cada cargo de la temporada. */
export const EXAMEN_DE_CARGO: Record<"jefe" | "principal" | "sumo", EscalonExamen> = { jefe: 3, principal: 4, sumo: 5 };

export function idExamen(camino: Camino, escalon: EscalonExamen): ExamenRangoId {
  return `${camino}-${escalon}`;
}

/** Minutos de espera después de fallar una parte (según cuántas veces se falló). */
export function esperaParteMin(fallos: number): number {
  if (fallos <= 0) return 0;
  return ESPERA_RANGO_MIN[Math.min(ESPERA_RANGO_MIN.length - 1, fallos - 1)];
}

// ---------------------------------------------------------------- las prendas de cada rango
export type PrendaRango = { id: string; nombre: string; color: string; detalle: string; verso: { text: string; ref: string } };

export const PRENDAS_RANGO: Record<ExamenRangoId, PrendaRango> = {
  "sacerdocio-2": {
    id: "faja-rango-turno", nombre: "Cinto del sacerdote de turno", color: "#2a4fbf", detalle: "Azul, para el que sirve en su turno.",
    verso: { text: "Y para los hijos de Aarón harás túnicas; también les harás cintos, y les harás tiaras para honra y hermosura.", ref: "Éxodo 28:40" },
  },
  "sacerdocio-3": {
    id: "manto-rango-jefe-turno", nombre: "Manto de púrpura del jefe de turno", color: "#5b3a6e", detalle: "Púrpura, para el que guía a los de su turno.",
    verso: { text: "Tus sacerdotes se vistan de justicia, Y se regocijen tus santos.", ref: "Salmos 132:9" },
  },
  "sacerdocio-4": {
    id: "faja-rango-principal", nombre: "Cinto de recamador de los principales", color: "#a3243b", detalle: "Carmesí bordado, de los principales sacerdotes.",
    verso: { text: "También el cinto de lino torcido, de azul, púrpura y carmesí, de obra de recamador, como Jehová lo mandó a Moisés.", ref: "Éxodo 39:29" },
  },
  "sacerdocio-5": {
    id: "manto-rango-jacinto", nombre: "Manto de jacinto", color: "#1f3f8f", detalle: "Azul, como el manto del efod del sumo sacerdote.",
    verso: { text: "Harás el manto del efod todo de azul;", ref: "Éxodo 28:31" },
  },
  "profecia-2": {
    id: "faja-rango-vidente", nombre: "Cinto de cuero del vidente", color: "#6b4a2e", detalle: "De cuero, como el de Elías tisbita.",
    verso: { text: "Y ellos le respondieron: Un varón que tenía vestido de pelo, y ceñía sus lomos con un cinturón de cuero. Entonces él dijo: Es Elías tisbita.", ref: "2 Reyes 1:8" },
  },
  "profecia-3": {
    id: "manto-rango-anciano-escuela", nombre: "Manto de pelo del anciano de la escuela", color: "#7a5a3a", detalle: "Tejido de pelo, el vestido de los profetas.",
    verso: { text: "Y ellos le respondieron: Un varón que tenía vestido de pelo, y ceñía sus lomos con un cinturón de cuero. Entonces él dijo: Es Elías tisbita.", ref: "2 Reyes 1:8" },
  },
  "profecia-4": {
    id: "faja-rango-profeta-rey", nombre: "Ceñidor de fidelidad del profeta del rey", color: "#c9a23a", detalle: "Dorado, para el que habla la verdad delante del rey.",
    verso: { text: "Y será la justicia cinto de sus lomos, y la fidelidad ceñidor de su cintura.", ref: "Isaías 11:5" },
  },
  "profecia-5": {
    id: "manto-rango-justicia", nombre: "Manto de justicia del varón de Dios", color: "#4a3b6a", detalle: "Morado, como el de Isaías.",
    verso: { text: "En gran manera me gozaré en Jehová, mi alma se alegrará en mi Dios; porque me vistió con vestiduras de salvación, me rodeó de manto de justicia, como a novio me atavió, y como a novia adornada con sus joyas.", ref: "Isaías 61:10" },
  },
  "realeza-2": {
    id: "faja-rango-escriba", nombre: "Cinto con tintero de escribano", color: "#3b5a5a", detalle: "Lleva su tintero a la cintura, como los escribas.",
    verso: { text: "Y he aquí que seis varones venían del camino de la puerta de arriba que mira hacia el norte, y cada uno traía en su mano su instrumento para destruir. Y entre ellos había un varón vestido de lino, el cual traía a su cintura un tintero de escribano; y entrados, se pararon junto al altar de bronce.", ref: "Ezequiel 9:2" },
  },
  "realeza-3": {
    id: "manto-rango-oficial", nombre: "Manto de lino del oficial del rey", color: "#2f4a7a", detalle: "Azul real, para los oficiales del palacio.",
    verso: { text: "Entonces Faraón quitó su anillo de su mano, y lo puso en la mano de José, y lo hizo vestir de ropas de lino finísimo, y puso un collar de oro en su cuello;", ref: "Génesis 41:42" },
  },
  "realeza-4": {
    id: "faja-rango-talabarte", nombre: "Talabarte del consejero", color: "#7a1f3d", detalle: "Granate, el cinto de los consejeros del rey.",
    verso: { text: "y lo vestiré de tus vestiduras, y lo ceñiré de tu talabarte, y entregaré en sus manos tu potestad; y será padre al morador de Jerusalén, y a la casa de Judá.", ref: "Isaías 22:21" },
  },
  "realeza-5": {
    id: "manto-rango-canciller", nombre: "Manto de lino y púrpura del canciller", color: "#5b2a6e", detalle: "Púrpura, como el de Mardoqueo.",
    verso: { text: "Y salió Mardoqueo de delante del rey con vestido real de azul y blanco, y una gran corona de oro, y un manto de lino y púrpura. La ciudad de Susa entonces se alegró y regocijó;", ref: "Ester 8:15" },
  },
};

// ---------------------------------------------------------------- los exámenes
export type ParteRangoDef = { n: number; titulo: string; tema: string; preguntas: number; aprueba: number };

export type ExamenRango = {
  id: ExamenRangoId;
  camino: Camino;
  escalon: EscalonExamen;
  /** El escalón que abre (Sacerdote de turno, Vidente, Escriba del rey…). */
  rango: string;
  nombre: string;
  maestro: MaestroId;
  partes: ParteRangoDef[];
  prenda: PrendaRango;
  /** Lo que abre aprobarlo. */
  abre: string[];
};

const MAESTRO_DE: Record<Camino, MaestroId> = { sacerdocio: "eleazar", profecia: "isaias", realeza: "eliaquim" };

function abreDe(camino: Camino, escalon: EscalonExamen, rango: string, prenda: PrendaRango): string[] {
  const out = [`La prenda «${prenda.nombre}» (no se vende: se gana)`];
  if (escalon === 2) out.unshift(`Ser «${rango}» al llegar a 150 de mérito en la temporada`);
  else out.unshift(`Poder recibir el cargo de ${rango.toLowerCase()} al cerrar la temporada`);
  if (escalon === 3) out.push(`Enseñar en las reuniones: quien va a tu reunión gana ${GOZO_REUNION_MAESTRO} de gozo más`);
  const siguiente = (CAMINOS[camino].escalones as readonly string[])[escalon];
  if (escalon < 5 && siguiente) out.push(`Dar el examen de ${siguiente.toLowerCase()}`);
  return out;
}

export const EXAMENES_RANGO: ExamenRango[] = CAMINOS_LISTA.flatMap((camino) =>
  ESCALONES_EXAMEN.map((escalon): ExamenRango => {
    const id = idExamen(camino, escalon);
    const rango = CAMINOS[camino].escalones[escalon - 1];
    const prenda = PRENDAS_RANGO[id];
    const medida = MEDIDA_RANGO[escalon];
    return {
      id,
      camino,
      escalon,
      rango,
      nombre: `Examen de ${rango.toLowerCase()}`,
      maestro: MAESTRO_DE[camino],
      partes: (PARTES_RANGO[id] ?? []).map((p, i) => ({ n: i + 1, titulo: p.titulo, tema: p.tema, ...medida })),
      prenda,
      abre: abreDe(camino, escalon, rango, prenda),
    };
  }),
);

export function examenRango(id: unknown): ExamenRango | undefined {
  return EXAMENES_RANGO.find((e) => e.id === id);
}

export function examenesDeCamino(camino: Camino): ExamenRango[] {
  return EXAMENES_RANGO.filter((e) => e.camino === camino);
}

// ---------------------------------------------------------------- lo que contesta la API (sin respuestas)
export type ParteVista = ParteRangoDef & {
  /** Fecha (YYYY-MM-DD) en que se aprobó, o null. */
  aprobada: string | null;
  intentos: number;
  fallos: number;
  mejor: number;
  /** Segundos que faltan para poder repetirla (0 = ya se puede). */
  espera: number;
  /** Un intento empezado: en qué pregunta va. */
  enCurso: { i: number; de: number; aciertos: number } | null;
};

export type ExamenVista = {
  id: ExamenRangoId;
  escalon: EscalonExamen;
  rango: string;
  nombre: string;
  maestro: MaestroId;
  partes: ParteVista[];
  aprobado: string | null;
  deCorrido: boolean;
  /** Se puede dar (el anterior está aprobado). Si no, por qué. */
  abierto: boolean;
  porQue: string | null;
  prenda: PrendaRango;
  abre: string[];
};

export type RepasoVista = {
  temporada: number;
  /** Hace falta para seguir (o llegar) a un cargo alto al cerrar esta temporada. */
  necesario: boolean;
  aprobado: boolean;
  espera: number;
  enCurso: { i: number; de: number; aciertos: number } | null;
  preguntas: number;
  aprueba: number;
};

export type RangoEstado = {
  camino: Camino;
  personaje: string;
  examenes: ExamenVista[];
  /** El repaso de la temporada (solo si ya aprobó el examen 4). */
  repaso: RepasoVista | null;
  /** Lo que le falta para el cargo que tiene al alcance (o para el turno), en palabras. */
  falta: { texto: string; examen: ExamenRangoId | "repaso" } | null;
};

export type PreguntaRango = {
  examen: ExamenRangoId | "repaso";
  parte: number;
  n: number;
  de: number;
  pregunta: string;
  opciones: string[];
  segundos: number;
  restan: number;
  aciertos: number;
};

export type FinParte = {
  aprobada: boolean;
  aciertos: number;
  de: number;
  aprueba: number;
  /** Segundos para poder repetirla (si se falló). */
  espera: number;
  /** Con esta parte quedó aprobado todo el examen. */
  examenAprobado: boolean;
  deCorrido: boolean;
  premio: { merito: number; gozo: number } | null;
  prenda: PrendaRango | null;
  repaso?: boolean;
};

export type RespuestaRango = {
  bien: boolean;
  /** Se respondió fuera de tiempo (cuenta como mala). */
  tarde: boolean;
  correcta: string;
  explica: string;
  ref: string;
  aciertos: number;
  n: number;
  de: number;
  fin: FinParte | null;
  gozoTotal?: number;
};
