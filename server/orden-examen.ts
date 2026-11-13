/**
 * El orden de las opciones de las preguntas de examen que corrige el servidor (los estudios y los exámenes de
 * rango): cada pregunta con su propio orden, fijo para ese intento (pedirla otra vez no lo cambia) y distinto de
 * las otras preguntas del mismo examen. Usa la regla común `ordenDeOpciones` (shared/estudios.ts).
 *
 * Antes, el examen de los estudios mezclaba con semillas seguidas y todas las preguntas de un mismo examen
 * tenían la buena en la misma letra: quien la adivinaba en la primera sacaba 6 de 6.
 */
import { ordenDeOpciones } from "@shared/estudios";

/** Un número propio de cada pregunta (sale de su id). */
export function numeroDe(id: string): number {
  let h = 2166136261;
  for (const ch of id) h = Math.imul(h ^ ch.charCodeAt(0), 16777619) >>> 0;
  return h;
}

/** Las opciones de una pregunta (la buena y las falsas, sin repetir) en el orden de esa pregunta en ese intento. */
export function opcionesDeExamen(id: string, correcta: string, falsas: readonly string[], semilla: number, lugar: number): string[] {
  const todas = [...new Set([correcta, ...falsas])];
  return ordenDeOpciones(todas.length, (semilla ^ numeroDe(id)) + lugar * 7919).map((k) => todas[k]);
}
