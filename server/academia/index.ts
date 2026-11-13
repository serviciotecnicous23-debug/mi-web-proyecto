/**
 * El registro del contenido y de los bancos de la academia (solo servidor).
 * Para publicar una materia: su contenido en contenido/, su banco en bancos/, agregarlos aquí y marcarla
 * `disponible: true` en shared/academia.ts (docs/academia.md, «Cómo agregar una materia»).
 */
import type { BancoMateria, LeccionContenido, PreguntaObjetiva } from "./tipos";
import { N1_SALVACION } from "./contenido/n1-salvacion";
import { BANCO_N1_SALVACION } from "./bancos/n1-salvacion";

const LECCIONES: LeccionContenido[] = [...N1_SALVACION];
const BANCOS_LISTA: BancoMateria[] = [BANCO_N1_SALVACION];

export const CONTENIDO = new Map(LECCIONES.map((l) => [l.id, l]));
export const BANCOS = new Map(BANCOS_LISTA.map((b) => [b.materia, b]));

const PREGUNTAS = new Map<string, PreguntaObjetiva>();
for (const b of BANCOS_LISTA) {
  for (const lista of Object.values(b.repaso)) for (const p of lista) PREGUNTAS.set(p.id, p);
  for (const p of b.final) PREGUNTAS.set(p.id, p);
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
