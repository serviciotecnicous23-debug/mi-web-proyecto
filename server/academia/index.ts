/**
 * El registro del contenido y de los bancos de la academia (solo servidor).
 * Para publicar una materia: su contenido en contenido/, su banco en bancos/, agregarlos aquí y marcarla
 * `disponible: true` en shared/academia.ts (docs/academia.md, «Cómo agregar una materia»).
 */
import type { BancoMateria, LeccionContenido, PreguntaObjetiva } from "./tipos";
import { TRABAJOS } from "./trabajos";
import { BLOQUES_EXTRA } from "./esquemas";
import { CASOS } from "./casos";
import { N1_SALVACION } from "./contenido/n1-salvacion";
import { N1_ORACION } from "./contenido/n1-oracion";
import { N1_BIBLIA } from "./contenido/n1-biblia";
import { N1_ESPIRITU } from "./contenido/n1-espiritu";
import { N1_BAUTISMO_CENA } from "./contenido/n1-bautismo-cena";
import { N1_IGLESIA } from "./contenido/n1-iglesia";
import { N1_VIDA_NUEVA } from "./contenido/n1-vida-nueva";
import { N1_COMPARTIR_FE } from "./contenido/n1-compartir-fe";
import { N2_PANORAMA_AT } from "./contenido/n2-panorama-at";
import { N2_PANORAMA_NT } from "./contenido/n2-panorama-nt";
import { N2_DISCIPLINAS } from "./contenido/n2-disciplinas";
import { N2_DOCTRINAS } from "./contenido/n2-doctrinas";
import { N2_SERMON_MONTE } from "./contenido/n2-sermon-monte";
import { N2_MAYORDOMIA } from "./contenido/n2-mayordomia";
import { N2_EVANGELISMO_PERSONAL } from "./contenido/n2-evangelismo-personal";
import { N2_FAMILIA } from "./contenido/n2-familia";
import { N3_HERMENEUTICA } from "./contenido/n3-hermeneutica";
import { N3_METODOS_ESTUDIO } from "./contenido/n3-metodos-estudio";
import { N3_PENTATEUCO_HISTORICOS } from "./contenido/n3-pentateuco-historicos";
import { N3_EVANGELIOS_HECHOS } from "./contenido/n3-evangelios-hechos";
import { N3_ESPIRITU_SANTO } from "./contenido/n3-espiritu-santo";
import { N3_EVANGELISMO_CONSOLIDACION } from "./contenido/n3-evangelismo-consolidacion";
import { N3_LIDERAZGO_1 } from "./contenido/n3-liderazgo-1";
import { N3_HOMILETICA_1 } from "./contenido/n3-homiletica-1";
import { N3_HISTORIA_1 } from "./contenido/n3-historia-1";
import { N3_CONSEJERIA_BASICA } from "./contenido/n3-consejeria-basica";
import { N4_SISTEMATICA_1 } from "./contenido/n4-sistematica-1";
import { N4_SISTEMATICA_2 } from "./contenido/n4-sistematica-2";
import { N4_SISTEMATICA_3 } from "./contenido/n4-sistematica-3";
import { N4_SISTEMATICA_4 } from "./contenido/n4-sistematica-4";
import { N4_POETICOS_PROFETICOS } from "./contenido/n4-poeticos-profeticos";
import { N4_APOLOGETICA } from "./contenido/n4-apologetica";
import { N4_HOMILETICA_2 } from "./contenido/n4-homiletica-2";
import { N4_HISTORIA_2 } from "./contenido/n4-historia-2";
import { N4_ETICA } from "./contenido/n4-etica";
import { N4_EPISTOLAS_APOCALIPSIS } from "./contenido/n4-epistolas-apocalipsis";
import { N5_DIDACTICA } from "./contenido/n5-didactica";
import { N5_LIDERAZGO_2 } from "./contenido/n5-liderazgo-2";
import { N5_IDIOMAS } from "./contenido/n5-idiomas";
import { N5_TEOLOGIA_PASTORAL } from "./contenido/n5-teologia-pastoral";
import { N5_ADMINISTRACION } from "./contenido/n5-administracion";
import { N5_SEMINARIO } from "./contenido/n5-seminario";
import { N5_EXEGESIS } from "./contenido/n5-exegesis";
import { N5_AVIVAMIENTO } from "./contenido/n5-avivamiento";
import { EVANGELISMO_MISIONES_1 } from "./contenido/evangelismo-misiones-1";
import { EVANGELISMO_MISIONES_2 } from "./contenido/evangelismo-misiones-2";
import { EVANGELISMO_MISIONES_3 } from "./contenido/evangelismo-misiones-3";
import { EVANGELISMO_MISIONES_4 } from "./contenido/evangelismo-misiones-4";
import { EVANGELISMO_MISIONES_5 } from "./contenido/evangelismo-misiones-5";
import { ALABANZA_1 } from "./contenido/alabanza-1";
import { ALABANZA_2 } from "./contenido/alabanza-2";
import { ALABANZA_3 } from "./contenido/alabanza-3";
import { ALABANZA_4 } from "./contenido/alabanza-4";
import { ALABANZA_5 } from "./contenido/alabanza-5";
import { INTERCESION_1 } from "./contenido/intercesion-1";
import { INTERCESION_2 } from "./contenido/intercesion-2";
import { INTERCESION_3 } from "./contenido/intercesion-3";
import { INTERCESION_4 } from "./contenido/intercesion-4";
import { INTERCESION_5 } from "./contenido/intercesion-5";
import { PASTORAL_1 } from "./contenido/pastoral-1";
import { PASTORAL_2 } from "./contenido/pastoral-2";
import { PASTORAL_3 } from "./contenido/pastoral-3";
import { PASTORAL_4 } from "./contenido/pastoral-4";
import { PASTORAL_5 } from "./contenido/pastoral-5";
import { NINEZ_1 } from "./contenido/ninez-1";
import { NINEZ_2 } from "./contenido/ninez-2";
import { NINEZ_3 } from "./contenido/ninez-3";
import { NINEZ_4 } from "./contenido/ninez-4";
import { NINEZ_5 } from "./contenido/ninez-5";
import { JUVENTUD_1 } from "./contenido/juventud-1";
import { JUVENTUD_2 } from "./contenido/juventud-2";
import { JUVENTUD_3 } from "./contenido/juventud-3";
import { JUVENTUD_4 } from "./contenido/juventud-4";
import { JUVENTUD_5 } from "./contenido/juventud-5";
import { FAMILIA_CONSEJERIA_1 } from "./contenido/familia-consejeria-1";
import { FAMILIA_CONSEJERIA_2 } from "./contenido/familia-consejeria-2";
import { FAMILIA_CONSEJERIA_3 } from "./contenido/familia-consejeria-3";
import { FAMILIA_CONSEJERIA_4 } from "./contenido/familia-consejeria-4";
import { FAMILIA_CONSEJERIA_5 } from "./contenido/familia-consejeria-5";
import { CAPELLANIA_1 } from "./contenido/capellania-1";
import { CAPELLANIA_2 } from "./contenido/capellania-2";
import { CAPELLANIA_3 } from "./contenido/capellania-3";
import { CAPELLANIA_4 } from "./contenido/capellania-4";
import { CAPELLANIA_5 } from "./contenido/capellania-5";
import { COMUNICACIONES_1 } from "./contenido/comunicaciones-1";
import { COMUNICACIONES_2 } from "./contenido/comunicaciones-2";
import { COMUNICACIONES_3 } from "./contenido/comunicaciones-3";
import { COMUNICACIONES_4 } from "./contenido/comunicaciones-4";
import { COMUNICACIONES_5 } from "./contenido/comunicaciones-5";
import { LIDERAZGO_ADMINISTRACION_1 } from "./contenido/liderazgo-administracion-1";
import { N2_DONES } from "./contenido/n2-dones";
import { BANCO_N1_SALVACION } from "./bancos/n1-salvacion";
import { BANCO_N1_ORACION } from "./bancos/n1-oracion";
import { BANCO_N1_BIBLIA } from "./bancos/n1-biblia";
import { BANCO_N1_ESPIRITU } from "./bancos/n1-espiritu";
import { BANCO_N1_BAUTISMO_CENA } from "./bancos/n1-bautismo-cena";
import { BANCO_N1_IGLESIA } from "./bancos/n1-iglesia";
import { BANCO_N1_VIDA_NUEVA } from "./bancos/n1-vida-nueva";
import { BANCO_N1_COMPARTIR_FE } from "./bancos/n1-compartir-fe";
import { BANCO_N2_PANORAMA_AT } from "./bancos/n2-panorama-at";
import { BANCO_N2_PANORAMA_NT } from "./bancos/n2-panorama-nt";
import { BANCO_N2_DISCIPLINAS } from "./bancos/n2-disciplinas";
import { BANCO_N2_DOCTRINAS } from "./bancos/n2-doctrinas";
import { BANCO_N2_SERMON_MONTE } from "./bancos/n2-sermon-monte";
import { BANCO_N2_MAYORDOMIA } from "./bancos/n2-mayordomia";
import { BANCO_N2_EVANGELISMO_PERSONAL } from "./bancos/n2-evangelismo-personal";
import { BANCO_N2_FAMILIA } from "./bancos/n2-familia";
import { BANCO_N3_HERMENEUTICA } from "./bancos/n3-hermeneutica";
import { BANCO_N3_METODOS_ESTUDIO } from "./bancos/n3-metodos-estudio";
import { BANCO_N3_PENTATEUCO_HISTORICOS } from "./bancos/n3-pentateuco-historicos";
import { BANCO_N3_EVANGELIOS_HECHOS } from "./bancos/n3-evangelios-hechos";
import { BANCO_N3_ESPIRITU_SANTO } from "./bancos/n3-espiritu-santo";
import { BANCO_N3_EVANGELISMO_CONSOLIDACION } from "./bancos/n3-evangelismo-consolidacion";
import { BANCO_N3_LIDERAZGO_1 } from "./bancos/n3-liderazgo-1";
import { BANCO_N3_HOMILETICA_1 } from "./bancos/n3-homiletica-1";
import { BANCO_N3_HISTORIA_1 } from "./bancos/n3-historia-1";
import { BANCO_N3_CONSEJERIA_BASICA } from "./bancos/n3-consejeria-basica";
import { BANCO_N4_SISTEMATICA_1 } from "./bancos/n4-sistematica-1";
import { BANCO_N4_SISTEMATICA_2 } from "./bancos/n4-sistematica-2";
import { BANCO_N4_SISTEMATICA_3 } from "./bancos/n4-sistematica-3";
import { BANCO_N4_SISTEMATICA_4 } from "./bancos/n4-sistematica-4";
import { BANCO_N4_POETICOS_PROFETICOS } from "./bancos/n4-poeticos-profeticos";
import { BANCO_N4_APOLOGETICA } from "./bancos/n4-apologetica";
import { BANCO_N4_HOMILETICA_2 } from "./bancos/n4-homiletica-2";
import { BANCO_N4_HISTORIA_2 } from "./bancos/n4-historia-2";
import { BANCO_N4_ETICA } from "./bancos/n4-etica";
import { BANCO_N4_EPISTOLAS_APOCALIPSIS } from "./bancos/n4-epistolas-apocalipsis";
import { BANCO_N5_DIDACTICA } from "./bancos/n5-didactica";
import { BANCO_N5_LIDERAZGO_2 } from "./bancos/n5-liderazgo-2";
import { BANCO_N5_IDIOMAS } from "./bancos/n5-idiomas";
import { BANCO_N5_TEOLOGIA_PASTORAL } from "./bancos/n5-teologia-pastoral";
import { BANCO_N5_ADMINISTRACION } from "./bancos/n5-administracion";
import { BANCO_N5_SEMINARIO } from "./bancos/n5-seminario";
import { BANCO_N5_EXEGESIS } from "./bancos/n5-exegesis";
import { BANCO_N5_AVIVAMIENTO } from "./bancos/n5-avivamiento";
import { BANCO_EVANGELISMO_MISIONES_1 } from "./bancos/evangelismo-misiones-1";
import { BANCO_EVANGELISMO_MISIONES_2 } from "./bancos/evangelismo-misiones-2";
import { BANCO_EVANGELISMO_MISIONES_3 } from "./bancos/evangelismo-misiones-3";
import { BANCO_EVANGELISMO_MISIONES_4 } from "./bancos/evangelismo-misiones-4";
import { BANCO_EVANGELISMO_MISIONES_5 } from "./bancos/evangelismo-misiones-5";
import { BANCO_ALABANZA_1 } from "./bancos/alabanza-1";
import { BANCO_ALABANZA_2 } from "./bancos/alabanza-2";
import { BANCO_ALABANZA_3 } from "./bancos/alabanza-3";
import { BANCO_ALABANZA_4 } from "./bancos/alabanza-4";
import { BANCO_ALABANZA_5 } from "./bancos/alabanza-5";
import { BANCO_INTERCESION_1 } from "./bancos/intercesion-1";
import { BANCO_INTERCESION_2 } from "./bancos/intercesion-2";
import { BANCO_INTERCESION_3 } from "./bancos/intercesion-3";
import { BANCO_INTERCESION_4 } from "./bancos/intercesion-4";
import { BANCO_INTERCESION_5 } from "./bancos/intercesion-5";
import { BANCO_PASTORAL_1 } from "./bancos/pastoral-1";
import { BANCO_PASTORAL_2 } from "./bancos/pastoral-2";
import { BANCO_PASTORAL_3 } from "./bancos/pastoral-3";
import { BANCO_PASTORAL_4 } from "./bancos/pastoral-4";
import { BANCO_PASTORAL_5 } from "./bancos/pastoral-5";
import { BANCO_NINEZ_1 } from "./bancos/ninez-1";
import { BANCO_NINEZ_2 } from "./bancos/ninez-2";
import { BANCO_NINEZ_3 } from "./bancos/ninez-3";
import { BANCO_NINEZ_4 } from "./bancos/ninez-4";
import { BANCO_NINEZ_5 } from "./bancos/ninez-5";
import { BANCO_JUVENTUD_1 } from "./bancos/juventud-1";
import { BANCO_JUVENTUD_2 } from "./bancos/juventud-2";
import { BANCO_JUVENTUD_3 } from "./bancos/juventud-3";
import { BANCO_JUVENTUD_4 } from "./bancos/juventud-4";
import { BANCO_JUVENTUD_5 } from "./bancos/juventud-5";
import { BANCO_FAMILIA_CONSEJERIA_1 } from "./bancos/familia-consejeria-1";
import { BANCO_FAMILIA_CONSEJERIA_2 } from "./bancos/familia-consejeria-2";
import { BANCO_FAMILIA_CONSEJERIA_3 } from "./bancos/familia-consejeria-3";
import { BANCO_FAMILIA_CONSEJERIA_4 } from "./bancos/familia-consejeria-4";
import { BANCO_FAMILIA_CONSEJERIA_5 } from "./bancos/familia-consejeria-5";
import { BANCO_CAPELLANIA_1 } from "./bancos/capellania-1";
import { BANCO_CAPELLANIA_2 } from "./bancos/capellania-2";
import { BANCO_CAPELLANIA_3 } from "./bancos/capellania-3";
import { BANCO_CAPELLANIA_4 } from "./bancos/capellania-4";
import { BANCO_CAPELLANIA_5 } from "./bancos/capellania-5";
import { BANCO_COMUNICACIONES_1 } from "./bancos/comunicaciones-1";
import { BANCO_COMUNICACIONES_2 } from "./bancos/comunicaciones-2";
import { BANCO_COMUNICACIONES_3 } from "./bancos/comunicaciones-3";
import { BANCO_COMUNICACIONES_4 } from "./bancos/comunicaciones-4";
import { BANCO_COMUNICACIONES_5 } from "./bancos/comunicaciones-5";
import { BANCO_LIDERAZGO_ADMINISTRACION_1 } from "./bancos/liderazgo-administracion-1";
import { BANCO_N2_DONES } from "./bancos/n2-dones";

/** El Nivel 1 completo (las 8 materias en su orden), lo publicado de los Niveles 2 a 5 y de las especialidades. */
const LECCIONES: LeccionContenido[] = [
  ...N1_SALVACION, ...N1_ORACION, ...N1_BIBLIA, ...N1_ESPIRITU, ...N1_BAUTISMO_CENA, ...N1_IGLESIA, ...N1_VIDA_NUEVA, ...N1_COMPARTIR_FE,
  ...N2_PANORAMA_AT, ...N2_PANORAMA_NT, ...N2_DOCTRINAS, ...N2_DISCIPLINAS, ...N2_SERMON_MONTE, ...N2_MAYORDOMIA, ...N2_FAMILIA, ...N2_EVANGELISMO_PERSONAL, ...N2_DONES,
  ...N3_HERMENEUTICA, ...N3_METODOS_ESTUDIO, ...N3_PENTATEUCO_HISTORICOS, ...N3_EVANGELIOS_HECHOS, ...N3_ESPIRITU_SANTO, ...N3_EVANGELISMO_CONSOLIDACION, ...N3_LIDERAZGO_1, ...N3_HOMILETICA_1, ...N3_HISTORIA_1, ...N3_CONSEJERIA_BASICA,
  ...N4_SISTEMATICA_1, ...N4_SISTEMATICA_2, ...N4_SISTEMATICA_3, ...N4_SISTEMATICA_4, ...N4_POETICOS_PROFETICOS, ...N4_APOLOGETICA, ...N4_HOMILETICA_2, ...N4_HISTORIA_2, ...N4_ETICA, ...N4_EPISTOLAS_APOCALIPSIS,
  ...N5_DIDACTICA, ...N5_LIDERAZGO_2, ...N5_IDIOMAS, ...N5_TEOLOGIA_PASTORAL, ...N5_ADMINISTRACION, ...N5_SEMINARIO, ...N5_EXEGESIS, ...N5_AVIVAMIENTO,
  // especialidades
  ...EVANGELISMO_MISIONES_1, ...EVANGELISMO_MISIONES_2, ...EVANGELISMO_MISIONES_3, ...EVANGELISMO_MISIONES_4, ...EVANGELISMO_MISIONES_5,
  ...ALABANZA_1, ...ALABANZA_2, ...ALABANZA_3, ...ALABANZA_4, ...ALABANZA_5,
  ...INTERCESION_1, ...INTERCESION_2, ...INTERCESION_3, ...INTERCESION_4, ...INTERCESION_5, ...PASTORAL_1, ...PASTORAL_2, ...PASTORAL_3, ...PASTORAL_4, ...PASTORAL_5, ...NINEZ_1, ...NINEZ_2, ...NINEZ_3, ...NINEZ_4, ...NINEZ_5, ...JUVENTUD_1, ...JUVENTUD_2, ...JUVENTUD_3, ...JUVENTUD_4, ...JUVENTUD_5, ...FAMILIA_CONSEJERIA_1, ...FAMILIA_CONSEJERIA_2, ...FAMILIA_CONSEJERIA_3, ...FAMILIA_CONSEJERIA_4, ...FAMILIA_CONSEJERIA_5, ...CAPELLANIA_1, ...CAPELLANIA_2, ...CAPELLANIA_3, ...CAPELLANIA_4, ...CAPELLANIA_5, ...COMUNICACIONES_1, ...COMUNICACIONES_2, ...COMUNICACIONES_3, ...COMUNICACIONES_4, ...COMUNICACIONES_5, ...LIDERAZGO_ADMINISTRACION_1,
];
const BANCOS_LISTA: BancoMateria[] = [
  BANCO_N1_SALVACION, BANCO_N1_ORACION, BANCO_N1_BIBLIA, BANCO_N1_ESPIRITU,
  BANCO_N1_BAUTISMO_CENA, BANCO_N1_IGLESIA, BANCO_N1_VIDA_NUEVA, BANCO_N1_COMPARTIR_FE,
  BANCO_N2_PANORAMA_AT, BANCO_N2_PANORAMA_NT, BANCO_N2_DOCTRINAS, BANCO_N2_DISCIPLINAS, BANCO_N2_SERMON_MONTE, BANCO_N2_MAYORDOMIA, BANCO_N2_FAMILIA, BANCO_N2_EVANGELISMO_PERSONAL, BANCO_N2_DONES,
  BANCO_N3_HERMENEUTICA, BANCO_N3_METODOS_ESTUDIO, BANCO_N3_PENTATEUCO_HISTORICOS, BANCO_N3_EVANGELIOS_HECHOS, BANCO_N3_ESPIRITU_SANTO, BANCO_N3_EVANGELISMO_CONSOLIDACION, BANCO_N3_LIDERAZGO_1, BANCO_N3_HOMILETICA_1, BANCO_N3_HISTORIA_1, BANCO_N3_CONSEJERIA_BASICA,
  BANCO_N4_SISTEMATICA_1, BANCO_N4_SISTEMATICA_2, BANCO_N4_SISTEMATICA_3, BANCO_N4_SISTEMATICA_4, BANCO_N4_POETICOS_PROFETICOS, BANCO_N4_APOLOGETICA, BANCO_N4_HOMILETICA_2, BANCO_N4_HISTORIA_2, BANCO_N4_ETICA, BANCO_N4_EPISTOLAS_APOCALIPSIS,
  BANCO_N5_DIDACTICA, BANCO_N5_LIDERAZGO_2, BANCO_N5_IDIOMAS, BANCO_N5_TEOLOGIA_PASTORAL, BANCO_N5_ADMINISTRACION, BANCO_N5_SEMINARIO, BANCO_N5_EXEGESIS, BANCO_N5_AVIVAMIENTO,
  // especialidades
  BANCO_EVANGELISMO_MISIONES_1, BANCO_EVANGELISMO_MISIONES_2, BANCO_EVANGELISMO_MISIONES_3, BANCO_EVANGELISMO_MISIONES_4, BANCO_EVANGELISMO_MISIONES_5,
  BANCO_ALABANZA_1, BANCO_ALABANZA_2, BANCO_ALABANZA_3, BANCO_ALABANZA_4, BANCO_ALABANZA_5,
  BANCO_INTERCESION_1, BANCO_INTERCESION_2, BANCO_INTERCESION_3, BANCO_INTERCESION_4, BANCO_INTERCESION_5, BANCO_PASTORAL_1, BANCO_PASTORAL_2, BANCO_PASTORAL_3, BANCO_PASTORAL_4, BANCO_PASTORAL_5, BANCO_NINEZ_1, BANCO_NINEZ_2, BANCO_NINEZ_3, BANCO_NINEZ_4, BANCO_NINEZ_5, BANCO_JUVENTUD_1, BANCO_JUVENTUD_2, BANCO_JUVENTUD_3, BANCO_JUVENTUD_4, BANCO_JUVENTUD_5, BANCO_FAMILIA_CONSEJERIA_1, BANCO_FAMILIA_CONSEJERIA_2, BANCO_FAMILIA_CONSEJERIA_3, BANCO_FAMILIA_CONSEJERIA_4, BANCO_FAMILIA_CONSEJERIA_5, BANCO_CAPELLANIA_1, BANCO_CAPELLANIA_2, BANCO_CAPELLANIA_3, BANCO_CAPELLANIA_4, BANCO_CAPELLANIA_5, BANCO_COMUNICACIONES_1, BANCO_COMUNICACIONES_2, BANCO_COMUNICACIONES_3, BANCO_COMUNICACIONES_4, BANCO_COMUNICACIONES_5, BANCO_LIDERAZGO_ADMINISTRACION_1,
];

// Lo que agregó la revisión del sistema de estudio (docs/academia-auditoria.md): los esquemas y los videos van al final
// de la lectura de su lección (esquemas.ts) y las preguntas de casos, al banco del examen final (casos.ts).
const LECCIONES_COMPLETAS: LeccionContenido[] = LECCIONES.map((l) => (BLOQUES_EXTRA[l.id]?.length ? { ...l, bloques: [...l.bloques, ...BLOQUES_EXTRA[l.id]] } : l));
const BANCOS_COMPLETOS: BancoMateria[] = BANCOS_LISTA.map((b) => (CASOS[b.materia]?.length ? { ...b, final: [...b.final, ...CASOS[b.materia]] } : b));

export const CONTENIDO = new Map(LECCIONES_COMPLETAS.map((l) => [l.id, l]));
export const BANCOS = new Map(BANCOS_COMPLETOS.map((b) => [b.materia, b]));

const PREGUNTAS = new Map<string, PreguntaObjetiva>();
/** De qué materia es cada pregunta y cada escrita (el examen integral se reparte por materia). */
const MATERIA_DE = new Map<string, string>();
for (const b of BANCOS_COMPLETOS) {
  for (const lista of Object.values(b.repaso)) for (const p of lista) PREGUNTAS.set(p.id, p);
  for (const p of b.final) {
    PREGUNTAS.set(p.id, p);
    MATERIA_DE.set(p.id, b.materia);
  }
  for (const e of b.escritas) MATERIA_DE.set(e.id, b.materia);
  // las mini pruebas: sus preguntas se corrigen como las del final, pero no salen en el integral
  for (const lista of Object.values(b.mini ?? {})) for (const p of lista) PREGUNTAS.set(p.id, p);
  if (b.breve) MATERIA_DE.set(b.breve.id, b.materia);
}
export function materiaDe(id: string): string | undefined {
  return MATERIA_DE.get(id);
}
export function preguntaPorId(id: string): PreguntaObjetiva | undefined {
  return PREGUNTAS.get(id);
}
/** Una clave escrita por su id: de los exámenes, del escrito breve de una materia o del trabajo final de una especialidad. */
export function escritaPorId(id: string) {
  for (const b of BANCOS_LISTA) {
    const e = b.escritas.find((x) => x.id === id) ?? (b.breve?.id === id ? b.breve : undefined);
    if (e) return e;
  }
  for (const t of TRABAJOS.values()) if (t.id === id) return t;
  return undefined;
}
