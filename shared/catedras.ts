/**
 * Las cátedras de Jerusalén en línea: mientras se sirve, una lección corta con una pregunta (el profeta
 * mientras ora en el monte). Cada lección enseña algo y lo prueba con la Palabra; el servidor guarda la
 * respuesta y corrige (server/catedras-banco.ts): el teléfono solo muestra. Lo aprendido es de la persona.
 */
import type { Camino } from "./caminos";

export type CatedraArea = "oracion";

export const CATEDRAS: Record<CatedraArea, { nombre: string; icono: string; camino: Camino; maestro: string; lugar: string }> = {
  oracion: { nombre: "La cátedra de la oración", icono: "🙏", camino: "profecia", maestro: "Isaías", lugar: "el monte de la oración" },
};

/** Lecciones por día en cada cátedra (después la oración sigue contando, sin lección). */
export const CATEDRA_POR_DIA = 8;
/** Mérito de la temporada por cada respuesta correcta (además del deber de orar). */
export const CATEDRA_MERITO = 3;

export type LeccionVista = {
  id: string;
  tema: string;
  /** La enseñanza corta antes de la pregunta. */
  ensena: string;
  pregunta: string;
  opciones: string[];
  hoy: number;
  max: number;
  /** Cuántas lecciones distintas ya aprendió la persona y cuántas hay. */
  aprendidas: number;
  total: number;
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
};
