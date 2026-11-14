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
import { BANCO_N1_SALVACION } from "./bancos/n1-salvacion";
import { BANCO_N1_ORACION } from "./bancos/n1-oracion";
import { BANCO_N1_BIBLIA } from "./bancos/n1-biblia";
import { BANCO_N1_ESPIRITU } from "./bancos/n1-espiritu";
import { BANCO_N1_BAUTISMO_CENA } from "./bancos/n1-bautismo-cena";
import { BANCO_N1_IGLESIA } from "./bancos/n1-iglesia";
import { BANCO_N1_VIDA_NUEVA } from "./bancos/n1-vida-nueva";
import { BANCO_N1_COMPARTIR_FE } from "./bancos/n1-compartir-fe";

/** El Nivel 1 completo: las 8 materias en su orden. */
const LECCIONES: LeccionContenido[] = [
  ...N1_SALVACION, ...N1_ORACION, ...N1_BIBLIA, ...N1_ESPIRITU, ...N1_BAUTISMO_CENA, ...N1_IGLESIA, ...N1_VIDA_NUEVA, ...N1_COMPARTIR_FE,
];
const BANCOS_LISTA: BancoMateria[] = [
  BANCO_N1_SALVACION, BANCO_N1_ORACION, BANCO_N1_BIBLIA, BANCO_N1_ESPIRITU,
  BANCO_N1_BAUTISMO_CENA, BANCO_N1_IGLESIA, BANCO_N1_VIDA_NUEVA, BANCO_N1_COMPARTIR_FE,
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
}
export function materiaDe(id: string): string | undefined {
  return MATERIA_DE.get(id);
}
export function preguntaPorId(id: string): PreguntaObjetiva | undefined {
  return PREGUNTAS.get(id);
}
export function escritaPorId(id: string) {
  for (const b of BANCOS_LISTA) {
    const e = b.escritas.find((x) => x.id === id);
    if (e) return e;
  }
  return undefined;
}
