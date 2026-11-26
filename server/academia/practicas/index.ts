/**
 * El registro de las prácticas de las lecciones (solo servidor). Para sumar las de una materia: escribir su archivo en
 * esta carpeta (como n1-salvacion.ts, con la guía de docs/academia-practicas.md), agregarlo a la lista de abajo y
 * correr las pruebas (server/academia-practicas.test.ts revisa cada frase contra su lección). Cuando todas las
 * lecciones de una materia tienen práctica, la materia queda «completa»: sus prácticas pueden entrar en la nota.
 */
import { materiaPorId } from "@shared/academia";
import type { Actividad, PracticasMateria } from "./tipos";
import { PRACTICAS_N1_SALVACION } from "./n1-salvacion";
import { PRACTICAS_N1_ORACION } from "./n1-oracion";
import { PRACTICAS_N1_BIBLIA } from "./n1-biblia";
import { PRACTICAS_N1_ESPIRITU } from "./n1-espiritu";
import { PRACTICAS_N1_BAUTISMO_CENA } from "./n1-bautismo-cena";
import { PRACTICAS_N1_IGLESIA } from "./n1-iglesia";
import { PRACTICAS_N1_VIDA_NUEVA } from "./n1-vida-nueva";
import { PRACTICAS_N1_COMPARTIR_FE } from "./n1-compartir-fe";
import { PRACTICAS_N2_PANORAMA_AT } from "./n2-panorama-at";
import { PRACTICAS_N2_PANORAMA_NT } from "./n2-panorama-nt";
import { PRACTICAS_N2_DOCTRINAS } from "./n2-doctrinas";
import { PRACTICAS_N2_DISCIPLINAS } from "./n2-disciplinas";
import { PRACTICAS_N2_SERMON_MONTE } from "./n2-sermon-monte";
import { PRACTICAS_N2_MAYORDOMIA } from "./n2-mayordomia";
import { PRACTICAS_N2_FAMILIA } from "./n2-familia";
import { PRACTICAS_N2_EVANGELISMO_PERSONAL } from "./n2-evangelismo-personal";
import { PRACTICAS_N2_DONES } from "./n2-dones";

const LISTA: PracticasMateria[] = [
  PRACTICAS_N1_SALVACION, PRACTICAS_N1_ORACION, PRACTICAS_N1_BIBLIA, PRACTICAS_N1_ESPIRITU,
  PRACTICAS_N1_BAUTISMO_CENA, PRACTICAS_N1_IGLESIA, PRACTICAS_N1_VIDA_NUEVA, PRACTICAS_N1_COMPARTIR_FE,
  // Nivel 2
  PRACTICAS_N2_PANORAMA_AT, PRACTICAS_N2_PANORAMA_NT, PRACTICAS_N2_DOCTRINAS,
  PRACTICAS_N2_DISCIPLINAS, PRACTICAS_N2_SERMON_MONTE, PRACTICAS_N2_MAYORDOMIA,
  PRACTICAS_N2_FAMILIA, PRACTICAS_N2_EVANGELISMO_PERSONAL, PRACTICAS_N2_DONES,
];

export const PRACTICAS_POR_MATERIA = new Map(LISTA.map((p) => [p.materia, p]));

/** Cada lección con práctica: sus actividades y de qué materia es. */
const POR_LECCION = new Map<string, { materia: string; actividades: Actividad[] }>();
for (const p of LISTA) for (const [leccion, actividades] of Object.entries(p.lecciones)) if (actividades.length) POR_LECCION.set(leccion, { materia: p.materia, actividades });

/** Las actividades de la práctica de una lección (null si todavía no tiene). */
export function actividadesDe(leccionId: string): Actividad[] | null {
  return POR_LECCION.get(leccionId)?.actividades ?? null;
}

/** Una actividad por su lección y su id. */
export function actividadPorId(leccionId: string, actividadId: string): Actividad | null {
  return actividadesDe(leccionId)?.find((a) => a.id === actividadId) ?? null;
}

/** Si todas las lecciones de la materia tienen su práctica (entonces puede entrar en la nota). */
export function materiaConPracticas(materiaId: string): boolean {
  const m = materiaPorId(materiaId);
  return !!m && m.lecciones.length > 0 && m.lecciones.every((l) => POR_LECCION.has(l.id));
}

/** Las materias con todas sus prácticas. */
export function materiasConPracticas(): string[] {
  return LISTA.map((p) => p.materia).filter(materiaConPracticas);
}

/** Cuántas lecciones de la materia tienen práctica. */
export function leccionesConPractica(materiaId: string): number {
  const m = materiaPorId(materiaId);
  return m ? m.lecciones.filter((l) => POR_LECCION.has(l.id)).length : 0;
}

export { LISTA as TODAS_LAS_PRACTICAS };
