/**
 * Dónde queda la respuesta buena en las preguntas de la academia (sin base de datos: se prueba en
 * academia-orden.test.ts). Antes cada pregunta se mezclaba por su cuenta y, por azar, una lección podía traer las
 * tres buenas en la misma letra (Luis lo vio en el repaso de la primera lección). Ahora:
 * - en una tanda (el repaso de una lección o un intento de examen), cada 4 preguntas seguidas usan los 4 lugares sin
 *   repetir, en un orden que da la semilla (de la persona y de la lección o del intento);
 * - las falsas van revueltas en los demás lugares.
 * No toca server/orden-examen.ts, que usan los estudios del juego.
 */
import { ordenDeOpciones } from "@shared/estudios";
import { numeroDe } from "./orden-examen";

/** El lugar de la buena en cada pregunta de una tanda de `n`: cada 4 seguidas, los 4 lugares sin repetir. */
export function lugaresDeLaBuena(n: number, semilla: number, opciones = 4): number[] {
  const out: number[] = [];
  for (let vuelta = 0; out.length < n; vuelta++) out.push(...ordenDeOpciones(opciones, (semilla | 0) + vuelta * 104729));
  return out.slice(0, Math.max(0, n));
}

/** Las opciones de una pregunta con la buena en `lugar` y las falsas (sin repetir) revueltas en los demás. */
export function opcionesConBuenaEn(id: string, correcta: string, falsas: readonly string[], semilla: number, lugar: number): string[] {
  const otras = [...new Set(falsas.filter((f) => f !== correcta))];
  const revueltas = ordenDeOpciones(otras.length, (semilla ^ numeroDe(id)) | 0).map((k) => otras[k]);
  revueltas.splice(Math.max(0, Math.min(lugar, revueltas.length)), 0, correcta);
  return revueltas;
}
