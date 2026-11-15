/**
 * El registro del contenido y de los bancos de la academia (solo servidor).
 * Para publicar una materia: su contenido en contenido/, su banco en bancos/, agregarlos aquí y marcarla
 * `disponible: true` en shared/academia.ts (docs/academia.md, «Cómo agregar una materia»).
 */
import type { BancoMateria, LeccionContenido, PreguntaObjetiva } from "./tipos";
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
import { N2_SERMON_MONTE } from "./contenido/n2-sermon-monte";
import { N2_MAYORDOMIA } from "./contenido/n2-mayordomia";
import { N2_EVANGELISMO_PERSONAL } from "./contenido/n2-evangelismo-personal";
import { N2_FAMILIA } from "./contenido/n2-familia";
import { N3_HERMENEUTICA } from "./contenido/n3-hermeneutica";
import { N3_METODOS_ESTUDIO } from "./contenido/n3-metodos-estudio";
import { N3_PENTATEUCO_HISTORICOS } from "./contenido/n3-pentateuco-historicos";
import { N3_EVANGELIOS_HECHOS } from "./contenido/n3-evangelios-hechos";
import { N3_EVANGELISMO_CONSOLIDACION } from "./contenido/n3-evangelismo-consolidacion";
import { N3_LIDERAZGO_1 } from "./contenido/n3-liderazgo-1";
import { N3_HOMILETICA_1 } from "./contenido/n3-homiletica-1";
import { N3_HISTORIA_1 } from "./contenido/n3-historia-1";
import { N3_CONSEJERIA_BASICA } from "./contenido/n3-consejeria-basica";
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
import { BANCO_N2_SERMON_MONTE } from "./bancos/n2-sermon-monte";
import { BANCO_N2_MAYORDOMIA } from "./bancos/n2-mayordomia";
import { BANCO_N2_EVANGELISMO_PERSONAL } from "./bancos/n2-evangelismo-personal";
import { BANCO_N2_FAMILIA } from "./bancos/n2-familia";
import { BANCO_N3_HERMENEUTICA } from "./bancos/n3-hermeneutica";
import { BANCO_N3_METODOS_ESTUDIO } from "./bancos/n3-metodos-estudio";
import { BANCO_N3_PENTATEUCO_HISTORICOS } from "./bancos/n3-pentateuco-historicos";
import { BANCO_N3_EVANGELIOS_HECHOS } from "./bancos/n3-evangelios-hechos";
import { BANCO_N3_EVANGELISMO_CONSOLIDACION } from "./bancos/n3-evangelismo-consolidacion";
import { BANCO_N3_LIDERAZGO_1 } from "./bancos/n3-liderazgo-1";
import { BANCO_N3_HOMILETICA_1 } from "./bancos/n3-homiletica-1";
import { BANCO_N3_HISTORIA_1 } from "./bancos/n3-historia-1";
import { BANCO_N3_CONSEJERIA_BASICA } from "./bancos/n3-consejeria-basica";
import { BANCO_N2_DONES } from "./bancos/n2-dones";

/** El Nivel 1 completo (las 8 materias en su orden) y lo publicado de los Niveles 2 y 3. */
const LECCIONES: LeccionContenido[] = [
  ...N1_SALVACION, ...N1_ORACION, ...N1_BIBLIA, ...N1_ESPIRITU, ...N1_BAUTISMO_CENA, ...N1_IGLESIA, ...N1_VIDA_NUEVA, ...N1_COMPARTIR_FE,
  ...N2_PANORAMA_AT, ...N2_PANORAMA_NT, ...N2_DISCIPLINAS, ...N2_SERMON_MONTE, ...N2_MAYORDOMIA, ...N2_FAMILIA, ...N2_EVANGELISMO_PERSONAL, ...N2_DONES,
  ...N3_HERMENEUTICA, ...N3_METODOS_ESTUDIO, ...N3_PENTATEUCO_HISTORICOS, ...N3_EVANGELIOS_HECHOS, ...N3_EVANGELISMO_CONSOLIDACION, ...N3_LIDERAZGO_1, ...N3_HOMILETICA_1, ...N3_HISTORIA_1, ...N3_CONSEJERIA_BASICA,
];
const BANCOS_LISTA: BancoMateria[] = [
  BANCO_N1_SALVACION, BANCO_N1_ORACION, BANCO_N1_BIBLIA, BANCO_N1_ESPIRITU,
  BANCO_N1_BAUTISMO_CENA, BANCO_N1_IGLESIA, BANCO_N1_VIDA_NUEVA, BANCO_N1_COMPARTIR_FE,
  BANCO_N2_PANORAMA_AT, BANCO_N2_PANORAMA_NT, BANCO_N2_DISCIPLINAS, BANCO_N2_SERMON_MONTE, BANCO_N2_MAYORDOMIA, BANCO_N2_FAMILIA, BANCO_N2_EVANGELISMO_PERSONAL, BANCO_N2_DONES,
  BANCO_N3_HERMENEUTICA, BANCO_N3_METODOS_ESTUDIO, BANCO_N3_PENTATEUCO_HISTORICOS, BANCO_N3_EVANGELIOS_HECHOS, BANCO_N3_EVANGELISMO_CONSOLIDACION, BANCO_N3_LIDERAZGO_1, BANCO_N3_HOMILETICA_1, BANCO_N3_HISTORIA_1, BANCO_N3_CONSEJERIA_BASICA,
];

export const CONTENIDO = new Map(LECCIONES.map((l) => [l.id, l]));
export const BANCOS = new Map(BANCOS_LISTA.map((b) => [b.materia, b]));

const PREGUNTAS = new Map<string, PreguntaObjetiva>();
/** De qué materia es cada pregunta y cada escrita (el examen integral se reparte por materia). */
const MATERIA_DE = new Map<string, string>();
for (const b of BANCOS_LISTA) {
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
export function escritaPorId(id: string) {
  for (const b of BANCOS_LISTA) {
    const e = b.escritas.find((x) => x.id === id) ?? (b.breve?.id === id ? b.breve : undefined);
    if (e) return e;
  }
  return undefined;
}
