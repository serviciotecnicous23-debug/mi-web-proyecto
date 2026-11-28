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
import { PRACTICAS_N3_HERMENEUTICA } from "./n3-hermeneutica";
import { PRACTICAS_N3_METODOS_ESTUDIO } from "./n3-metodos-estudio";
import { PRACTICAS_N3_PENTATEUCO_HISTORICOS } from "./n3-pentateuco-historicos";
import { PRACTICAS_N3_EVANGELIOS_HECHOS } from "./n3-evangelios-hechos";
import { PRACTICAS_N3_ESPIRITU_SANTO } from "./n3-espiritu-santo";
import { PRACTICAS_N3_EVANGELISMO_CONSOLIDACION } from "./n3-evangelismo-consolidacion";
import { PRACTICAS_N3_LIDERAZGO_1 } from "./n3-liderazgo-1";
import { PRACTICAS_N3_HOMILETICA_1 } from "./n3-homiletica-1";
import { PRACTICAS_N3_HISTORIA_1 } from "./n3-historia-1";
import { PRACTICAS_N3_CONSEJERIA_BASICA } from "./n3-consejeria-basica";
import { PRACTICAS_N4_SISTEMATICA_1 } from "./n4-sistematica-1";
import { PRACTICAS_N4_SISTEMATICA_2 } from "./n4-sistematica-2";
import { PRACTICAS_N4_SISTEMATICA_3 } from "./n4-sistematica-3";
import { PRACTICAS_N4_SISTEMATICA_4 } from "./n4-sistematica-4";
import { PRACTICAS_N4_POETICOS_PROFETICOS } from "./n4-poeticos-profeticos";
import { PRACTICAS_N4_EPISTOLAS_APOCALIPSIS } from "./n4-epistolas-apocalipsis";
import { PRACTICAS_N4_HOMILETICA_2 } from "./n4-homiletica-2";
import { PRACTICAS_N4_HISTORIA_2 } from "./n4-historia-2";
import { PRACTICAS_N4_APOLOGETICA } from "./n4-apologetica";
import { PRACTICAS_N4_ETICA } from "./n4-etica";
import { PRACTICAS_N5_TEOLOGIA_PASTORAL } from "./n5-teologia-pastoral";
import { PRACTICAS_N5_ADMINISTRACION } from "./n5-administracion";
import { PRACTICAS_N5_DIDACTICA } from "./n5-didactica";
import { PRACTICAS_N5_LIDERAZGO_2 } from "./n5-liderazgo-2";
import { PRACTICAS_N5_IDIOMAS } from "./n5-idiomas";
import { PRACTICAS_N5_EXEGESIS } from "./n5-exegesis";
import { PRACTICAS_N5_AVIVAMIENTO } from "./n5-avivamiento";
import { PRACTICAS_N5_SEMINARIO } from "./n5-seminario";
import { PRACTICAS_EVANGELISMO_MISIONES_1 } from "./evangelismo-misiones-1";
import { PRACTICAS_EVANGELISMO_MISIONES_2 } from "./evangelismo-misiones-2";
import { PRACTICAS_EVANGELISMO_MISIONES_3 } from "./evangelismo-misiones-3";
import { PRACTICAS_EVANGELISMO_MISIONES_4 } from "./evangelismo-misiones-4";
import { PRACTICAS_EVANGELISMO_MISIONES_5 } from "./evangelismo-misiones-5";
import { PRACTICAS_PASTORAL_1 } from "./pastoral-1";
import { PRACTICAS_PASTORAL_2 } from "./pastoral-2";
import { PRACTICAS_PASTORAL_3 } from "./pastoral-3";
import { PRACTICAS_PASTORAL_4 } from "./pastoral-4";
import { PRACTICAS_PASTORAL_5 } from "./pastoral-5";
import { PRACTICAS_ALABANZA_1 } from "./alabanza-1";
import { PRACTICAS_ALABANZA_2 } from "./alabanza-2";
import { PRACTICAS_ALABANZA_3 } from "./alabanza-3";
import { PRACTICAS_ALABANZA_4 } from "./alabanza-4";
import { PRACTICAS_ALABANZA_5 } from "./alabanza-5";
import { PRACTICAS_NINEZ_1 } from "./ninez-1";
import { PRACTICAS_NINEZ_2 } from "./ninez-2";
import { PRACTICAS_NINEZ_3 } from "./ninez-3";
import { PRACTICAS_NINEZ_4 } from "./ninez-4";
import { PRACTICAS_NINEZ_5 } from "./ninez-5";

const LISTA: PracticasMateria[] = [
  PRACTICAS_N1_SALVACION, PRACTICAS_N1_ORACION, PRACTICAS_N1_BIBLIA, PRACTICAS_N1_ESPIRITU,
  PRACTICAS_N1_BAUTISMO_CENA, PRACTICAS_N1_IGLESIA, PRACTICAS_N1_VIDA_NUEVA, PRACTICAS_N1_COMPARTIR_FE,
  // Nivel 2
  PRACTICAS_N2_PANORAMA_AT, PRACTICAS_N2_PANORAMA_NT, PRACTICAS_N2_DOCTRINAS,
  PRACTICAS_N2_DISCIPLINAS, PRACTICAS_N2_SERMON_MONTE, PRACTICAS_N2_MAYORDOMIA,
  PRACTICAS_N2_FAMILIA, PRACTICAS_N2_EVANGELISMO_PERSONAL, PRACTICAS_N2_DONES,
  // Nivel 3
  PRACTICAS_N3_HERMENEUTICA, PRACTICAS_N3_METODOS_ESTUDIO, PRACTICAS_N3_PENTATEUCO_HISTORICOS,
  PRACTICAS_N3_EVANGELIOS_HECHOS, PRACTICAS_N3_ESPIRITU_SANTO, PRACTICAS_N3_EVANGELISMO_CONSOLIDACION,
  PRACTICAS_N3_LIDERAZGO_1, PRACTICAS_N3_HOMILETICA_1, PRACTICAS_N3_HISTORIA_1,
  PRACTICAS_N3_CONSEJERIA_BASICA,
  // Nivel 4
  PRACTICAS_N4_SISTEMATICA_1, PRACTICAS_N4_SISTEMATICA_2, PRACTICAS_N4_SISTEMATICA_3,
  PRACTICAS_N4_SISTEMATICA_4, PRACTICAS_N4_POETICOS_PROFETICOS, PRACTICAS_N4_EPISTOLAS_APOCALIPSIS,
  PRACTICAS_N4_HOMILETICA_2, PRACTICAS_N4_HISTORIA_2, PRACTICAS_N4_APOLOGETICA,
  PRACTICAS_N4_ETICA,
  // Nivel 5
  PRACTICAS_N5_TEOLOGIA_PASTORAL, PRACTICAS_N5_ADMINISTRACION, PRACTICAS_N5_DIDACTICA,
  PRACTICAS_N5_LIDERAZGO_2, PRACTICAS_N5_IDIOMAS, PRACTICAS_N5_EXEGESIS,
  PRACTICAS_N5_AVIVAMIENTO, PRACTICAS_N5_SEMINARIO,
  // Especialidades: evangelismo-misiones, pastoral
  PRACTICAS_EVANGELISMO_MISIONES_1, PRACTICAS_EVANGELISMO_MISIONES_2, PRACTICAS_EVANGELISMO_MISIONES_3,
  PRACTICAS_EVANGELISMO_MISIONES_4, PRACTICAS_EVANGELISMO_MISIONES_5, PRACTICAS_PASTORAL_1,
  PRACTICAS_PASTORAL_2, PRACTICAS_PASTORAL_3, PRACTICAS_PASTORAL_4,
  PRACTICAS_PASTORAL_5,
  // Especialidades: alabanza, ninez
  PRACTICAS_ALABANZA_1, PRACTICAS_ALABANZA_2, PRACTICAS_ALABANZA_3,
  PRACTICAS_ALABANZA_4, PRACTICAS_ALABANZA_5, PRACTICAS_NINEZ_1,
  PRACTICAS_NINEZ_2, PRACTICAS_NINEZ_3, PRACTICAS_NINEZ_4,
  PRACTICAS_NINEZ_5,
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
