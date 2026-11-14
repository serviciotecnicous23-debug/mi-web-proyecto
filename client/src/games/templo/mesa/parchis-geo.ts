/**
 * Las medidas del tablero del parchís, «el estadio» (aprobado por Luis el 13 de noviembre de 2026): todo en círculos y
 * sin nada en forma de cruz. En un cuadro de 100 × 100:
 * - la pista: un anillo de 68 casillas (radios 37,5 a 46,5), que se recorre en contra de las agujas del reloj;
 * - los caminos de llegada: un anillo por dentro (radios 29,6 a 37,5) con un arco de 7 casillas de cada color, que sale
 *   de su entrada y sigue la misma vuelta;
 * - la meta: la corona de laurel del centro (radio 24), con el paño del dado adentro;
 * - las casas: las cuatro esquinas (amarillo abajo a la izquierda, azul abajo a la derecha, rojo arriba a la derecha y
 *   verde arriba a la izquierda), con un hueco por ficha.
 * Todo se puede girar de a 90°, para que el color de cada uno quede siempre abajo a la izquierda.
 */
import { CASA, META, PARCHIS, ULTIMA_PISTA, casillaDe } from "@shared/mesa/parchis";

export const GEO = { c: 50, ro: 46.5, ri: 37.5, rm: 42, rl: 29.6, dl: 6.6, corona: 24, pano: 16.5 } as const;
/** El centro del anillo de los caminos de llegada. */
export const R_CAMINO = (GEO.rl + GEO.ri) / 2;
/** Lo que mide cada casilla de la pista (grados). */
export const D = 360 / PARCHIS.casillas;
/** La casilla 1 queda junto a la casa amarilla (la casa queda entre la 68 y la 5). */
const TH1 = 135 + 1.5 * D;

export const COLOR = ["#e0a21a", "#2f7fd0", "#d9483a", "#2e9e5b"] as const;
export const CLARO = ["#f7e2a6", "#cfe2f6", "#f6d0ca", "#cdebd7"] as const;
export const OSCURO = ["#8a5d05", "#174f86", "#8a2219", "#17633a"] as const;
export const NOMBRE_COLOR = ["Amarillo", "Azul", "Rojo", "Verde"] as const;

export type P = { x: number; y: number };
const rad = (g: number) => (g * Math.PI) / 180;
export const punto = (r: number, ang: number, giro = 0): P => ({ x: GEO.c + r * Math.cos(rad(ang + giro)), y: GEO.c + r * Math.sin(rad(ang + giro)) });
export const f2 = (n: number) => n.toFixed(2);

/** El ángulo (en grados, como en SVG: desde la derecha y hacia abajo) del centro de una casilla de la pista. */
export const anguloCasilla = (k: number) => TH1 - (k - 1) * D;
/** El ángulo de la casilla `i` (1–7) del camino de llegada de un color. */
export const anguloCamino = (color: number, i: number) => anguloCasilla(PARCHIS.entrada[color]) - (i - 1) * GEO.dl;
/** Dónde quedan las fichas que llegaron a la corona: junto a la boca de su camino. */
export const anguloCorona = (color: number, k: number) => anguloCamino(color, 7) - 7 - k * 8.5;

/** Un trozo de anillo (de a1 a a2 grados, con a1 < a2). */
export function sector(ri: number, ro: number, a1: number, a2: number, giro = 0): string {
  const p1 = punto(ro, a1, giro);
  const p2 = punto(ro, a2, giro);
  const p3 = punto(ri, a2, giro);
  const p4 = punto(ri, a1, giro);
  const g = a2 - a1 > 180 ? 1 : 0;
  return `M${f2(p1.x)} ${f2(p1.y)}A${ro} ${ro} 0 ${g} 1 ${f2(p2.x)} ${f2(p2.y)}L${f2(p3.x)} ${f2(p3.y)}A${ri} ${ri} 0 ${g} 0 ${f2(p4.x)} ${f2(p4.y)}Z`;
}

/** Gira un punto alrededor del centro. */
export function girar(p: P, giro: number): P {
  const c = Math.cos(rad(giro));
  const s = Math.sin(rad(giro));
  const x = p.x - GEO.c;
  const y = p.y - GEO.c;
  return { x: GEO.c + x * c - y * s, y: GEO.c + x * s + y * c };
}

/** Los huecos de la casa amarilla (abajo a la izquierda); las otras casas son la misma, girada. */
const HUECOS: P[] = [
  { x: 8.4, y: 85.4 },
  { x: 14.6, y: 85.4 },
  { x: 8.4, y: 91.6 },
  { x: 14.6, y: 91.6 },
];
/** Con dos fichas, en la diagonal. */
export const huecosDe = (nFichas: number) => (nFichas === 2 ? [0, 3] : [0, 1, 2, 3]);
export const huecoCasa = (color: number, hueco: number, giro: number): P => girar(HUECOS[hueco], giro - 90 * color);
/** El centro de la casa (para los nombres y los efectos). */
export const centroCasa = (color: number, giro: number): P => girar({ x: 11.5, y: 88.5 }, giro - 90 * color);
/** La forma de la casa amarilla: la esquina del tablero que queda fuera de la pista. */
export const CASA_FORMA = "M1.6 68.4L5.88 68.4A47.8 47.8 0 0 0 31.6 94.12L31.6 98.4L5.6 98.4Q1.6 98.4 1.6 94.4Z";

/**
 * Dónde va una ficha de ese color, con ese avance (sin contar si comparte la casilla). `hueco` es su lugar en la casa y
 * `enCorona` cuántas de su color llegaron antes que ella.
 */
export function lugarDe(color: number, pos: number, giro: number, hueco: number, enCorona = 0): P {
  if (pos === CASA) return huecoCasa(color, hueco, giro);
  if (pos === META) return punto(GEO.corona, anguloCorona(color, enCorona), giro);
  if (pos <= ULTIMA_PISTA) return punto(GEO.rm, anguloCasilla(casillaDe(color, pos)!), giro);
  return punto(R_CAMINO, anguloCamino(color, pos - ULTIMA_PISTA), giro);
}

/** Dos fichas en la misma casilla: una más afuera y otra más adentro. */
export function lugarCompartido(color: number, pos: number, giro: number, cual: number): P {
  if (pos >= 0 && pos <= ULTIMA_PISTA) return punto(GEO.rm + (cual ? -2.15 : 2.15), anguloCasilla(casillaDe(color, pos)!), giro);
  return punto(R_CAMINO + (cual ? -1.95 : 1.95), anguloCamino(color, pos - ULTIMA_PISTA), giro);
}
