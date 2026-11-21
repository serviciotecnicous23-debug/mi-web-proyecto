/**
 * Todas las prácticas del laboratorio ministerial (piloto: Cuidado y consejería básica, Homilética I y Protección de
 * menores). Una materia puede tener varias; los ids nunca se reusan (los intentos guardados los usan).
 */
import type { PracticaDef } from "./tipos";
import { PRACTICAS_CONSEJERIA } from "./n3-consejeria-basica";
import { PRACTICAS_HOMILETICA } from "./n3-homiletica-1";
import { PRACTICAS_NINEZ } from "./ninez-4";

export const PRACTICAS: PracticaDef[] = [...PRACTICAS_CONSEJERIA, ...PRACTICAS_HOMILETICA, ...PRACTICAS_NINEZ];

const porId = new Map(PRACTICAS.map((p) => [p.id, p]));

export function practicaPorId(id: string): PracticaDef | undefined {
  return porId.get(id);
}

export function practicasDeMateria(materiaId: string): PracticaDef[] {
  return PRACTICAS.filter((p) => p.materia === materiaId);
}
