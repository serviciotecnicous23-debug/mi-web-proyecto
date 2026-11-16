// «Repaso del día» (docs/academia-auditoria.md): las preguntas del repaso de las lecciones que el alumno ya terminó
// vuelven en días espaciados (1, 3, 7, 21 y 60), mezcladas entre materias. Es la práctica de recuperación espaciada, una
// de las dos técnicas de estudio de mayor utilidad según Dunlosky y otros (2013). No pone nota: sirve para no olvidar.
// No importa nada (lo usan el servidor y la pantalla).

/** Los días en que vuelve una pregunta acertada: después de la última queda dominada. */
export const REPASO_PREGUNTA_DIAS = [1, 3, 7, 21, 60] as const;
/** La caja de la pregunta dominada. */
export const CAJA_PREGUNTA_DOMINADA = REPASO_PREGUNTA_DIAS.length + 1;
/** Cuántas preguntas trae el repaso de un día (las que tocan, de a lo más 10). */
export const PREGUNTAS_POR_DIA = 10;

/** La caja después de responder (bien: la siguiente; mal: vuelve a la primera) y en cuántos días vuelve (null: dominada). */
export function siguientePregunta(caja: number, bien: boolean): { caja: number; dias: number | null } {
  if (!bien) return { caja: 1, dias: REPASO_PREGUNTA_DIAS[0] };
  const nueva = Math.min(Math.max(1, caja) + 1, CAJA_PREGUNTA_DOMINADA);
  return { caja: nueva, dias: nueva >= CAJA_PREGUNTA_DOMINADA ? null : REPASO_PREGUNTA_DIAS[nueva - 1] };
}

/**
 * Mezcla las preguntas de varias materias (práctica intercalada): una de cada materia por vuelta, en el orden en que
 * tocan, hasta `max`.
 */
export function intercalar<T extends { materiaId: string }>(lista: T[], max: number): T[] {
  const porMateria = new Map<string, T[]>();
  for (const x of lista) {
    const g = porMateria.get(x.materiaId) ?? [];
    g.push(x);
    porMateria.set(x.materiaId, g);
  }
  const grupos = [...porMateria.values()];
  const out: T[] = [];
  for (let vuelta = 0; out.length < max && grupos.some((g) => g.length > vuelta); vuelta++) {
    for (const g of grupos) {
      if (out.length >= max) break;
      if (g[vuelta]) out.push(g[vuelta]);
    }
  }
  return out;
}

export type PreguntaDelDia = {
  id: string;
  texto: string;
  opciones: string[];
  materia: { id: string; titulo: string };
  leccion: { id: string; titulo: string; n: number };
  caja: number;
};

export type RepasoDelDia = {
  preguntas: PreguntaDelDia[];
  /** Las que tocan hoy (todas, aunque el repaso traiga 10). */
  pendientes: number;
  /** Todas las que están en el repaso espaciado (de las lecciones terminadas). */
  total: number;
  dominadas: number;
  /** Las respondidas hoy. */
  hoy: number;
  /** Cuándo toca la próxima, si hoy no toca ninguna. */
  proxima: string | null;
};

export type RespuestaDelDia = { bien: boolean; correcta: string; explica: string; ref: string; caja: number; dias: number | null; dominada: boolean };
