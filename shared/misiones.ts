/**
 * Misiones de Jerusalén en línea:
 * - Encargos del día: tres por personaje, distintos cada día (la misma semilla para todos ese día,
 *   mezclada con el personaje). Cada uno da mérito al cumplirse; los tres juntos, un premio más.
 * - La ofrenda del barrio: una meta semanal de deberes para todo el barrio. Al cumplirla, cada
 *   vecino que aportó recibe mérito, y el barrio ondea sus banderas.
 * - Los barrios compiten por la semana: la tabla de los barrios (deberes por vecino que sirve).
 * - Servir juntos: con dos o más sacerdotes en el templo a la vez, los deberes valen un poco más.
 * El servidor lleva las cuentas; el teléfono solo las muestra.
 */
import { EVENTOS_DEL_ANIO } from "./anio";

export type TipoEncargo =
  | "ofrendas" | "lena" | "aceite" | "panes" | "incienso" | "diezmos" | "aciertos" | "seccion" | "bendicion" | "alfoli" | "juntos"
  | "mensaje" | "oracion" | "memoria" | "discernir" | "audiencia" | "pan" | "ley" | "reunion" | "anfitrion" | "ayuda";

/** `caminos`: para quién es (sin él, para el sacerdocio). Los de todos llevan los tres caminos. */
export type EncargoDef = { id: string; tipo: TipoEncargo; meta: number; titulo: string; icono: string; caminos?: ("sacerdocio" | "profecia" | "realeza")[] };

const TODOS: ("sacerdocio" | "profecia" | "realeza")[] = ["sacerdocio", "profecia", "realeza"];

/** Los encargos de las fiestas del año (shared/anio.ts): id «ev-…», para los tres caminos. No se sortean: salen solos el día del evento. */
export const ENCARGOS_DE_FIESTA: EncargoDef[] = EVENTOS_DEL_ANIO.filter((e) => e.encargo).map((e) => ({ id: `ev-${e.id}`, tipo: e.encargo!.tipo, meta: e.encargo!.meta, titulo: e.encargo!.titulo, icono: e.encargo!.icono, caminos: TODOS }));
export const esEncargoDeFiesta = (id: string) => id.startsWith("ev-");

/** El banco de encargos (cada día salen tres de tipos distintos). */
export const ENCARGOS: EncargoDef[] = [
  { id: "ofrendas6", tipo: "ofrendas", meta: 6, titulo: "Presenta 6 ofrendas del pueblo en el altar", icono: "🐑" },
  { id: "ofrendas12", tipo: "ofrendas", meta: 12, titulo: "Presenta 12 ofrendas del pueblo en el altar", icono: "🐑" },
  { id: "lena8", tipo: "lena", meta: 8, titulo: "Aviva el fuego del altar con 8 leños", icono: "🪵" },
  { id: "aceite3", tipo: "aceite", meta: 3, titulo: "Llena las lámparas del candelero 3 veces", icono: "🫒" },
  { id: "panes6", tipo: "panes", meta: 6, titulo: "Pon 6 panes en la mesa de oro", icono: "🍞" },
  { id: "incienso2", tipo: "incienso", meta: 2, titulo: "Quema incienso 2 veces en el altar de oro", icono: "🌿" },
  { id: "diezmos2", tipo: "diezmos", meta: 2, titulo: "Guarda 2 diezmos en las cámaras", icono: "🌾" },
  { id: "aciertos2", tipo: "aciertos", meta: 2, titulo: "Responde bien 2 preguntas difíciles de Azarías", icono: "❓" },
  { id: "seccion1", tipo: "seccion", meta: 1, titulo: "Termina una sección de un estudio", icono: "📜", caminos: TODOS },
  { id: "bendicion1", tipo: "bendicion", meta: 1, titulo: "Visita la casa de un vecino y bendícela", icono: "🙌", caminos: TODOS },
  { id: "alfoli1", tipo: "alfoli", meta: 1, titulo: "Lleva al templo lo del alfolí de tu casa", icono: "🏺", caminos: TODOS },
  { id: "reunion1", tipo: "reunion", meta: 1, titulo: "Ve a una reunión en la casa de un vecino y responde bien", icono: "📖", caminos: TODOS },
  { id: "anfitrion1", tipo: "anfitrion", meta: 1, titulo: "Abre tu casa para enseñar lo que estudiaste", icono: "🏠", caminos: TODOS },
  { id: "ayuda1", tipo: "ayuda", meta: 1, titulo: "Ayuda a un vecino con lo de tu alfolí", icono: "🤲", caminos: TODOS },
  { id: "juntos10", tipo: "juntos", meta: 10, titulo: "Cumple 10 deberes sirviendo junto con otro sacerdote", icono: "🤝" },
  // escuela de los profetas
  { id: "mensaje2", tipo: "mensaje", meta: 2, titulo: "Lleva 2 mensajes de ánimo por la ciudad", icono: "📯", caminos: ["profecia"] },
  { id: "oracion2", tipo: "oracion", meta: 2, titulo: "Ora 2 veces en el monte de la oración", icono: "🙏", caminos: ["profecia"] },
  { id: "memoria2", tipo: "memoria", meta: 2, titulo: "Memoriza 2 versículos en la escuela", icono: "📖", caminos: ["profecia"] },
  { id: "discernir2", tipo: "discernir", meta: 2, titulo: "Discierne con las Escrituras 2 palabras de la plaza", icono: "🔎", caminos: ["profecia"] },
  // palacio del rey
  { id: "audiencia2", tipo: "audiencia", meta: 2, titulo: "Atiende 2 audiencias con justicia", icono: "⚖️", caminos: ["realeza"] },
  { id: "pan5", tipo: "pan", meta: 5, titulo: "Reparte 5 panes a los pobres de la ciudad", icono: "🍞", caminos: ["realeza"] },
  { id: "ley2", tipo: "ley", meta: 2, titulo: "Copia la ley 2 veces en el palacio", icono: "📜", caminos: ["realeza"] },
];

export const ENCARGOS_DIA = 3;
/** Buscar la definición de un encargo (los del banco o los de las fiestas). */
export const encargoDef = (id: string): EncargoDef | undefined => ENCARGOS.find((x) => x.id === id) ?? ENCARGOS_DE_FIESTA.find((x) => x.id === id);
export const MERITO_ENCARGO = 20;
/** Premio por cumplir los tres encargos del día. */
export const MERITO_ENCARGOS_TODOS = 30;

/** La ofrenda del barrio: deberes de todo el barrio en la semana (de lunes a domingo, hora de Texas). */
export const META_BARRIO = 300;
/** Para recibir el premio del barrio hay que haber aportado al menos estos deberes esa semana. */
export const APORTE_MINIMO = 10;
export const MERITO_BARRIO = 40;

/** Servir juntos: desde 2 sacerdotes en el templo a la vez, los deberes valen ×1,2. */
export const JUNTOS_DESDE = 2;
export const FACTOR_JUNTOS = 1.2;

// ---------------------------------------------------------------- respuestas de la API
export type Encargo = { id: string; titulo: string; icono: string; meta: number; progreso: number; hecho: boolean; /** el encargo de la fiesta de hoy (shared/anio.ts): su nombre */ fiesta?: string };
export type BarrioSemana = { n: number; nombre: string; deberes: number; vecinos: number; porVecino: number; cumplida: boolean };
export type MisionesEstado = {
  dia: string;
  encargos: Encargo[];
  todos: boolean;
  barrio: { n: number; nombre: string; deberes: number; meta: number; cumplida: boolean; miAporte: number; aporteMinimo: number } | null;
  /** La tabla de los barrios de esta semana (por deberes por vecino que sirvió). */
  barrios: BarrioSemana[];
  semana: string;
};
/** Lo que se acaba de cumplir (para avisar en el juego). */
export type MisionCumplida = { titulo: string; premio: number; gozo?: number };
