/**
 * Las parcelas de cada barrio (las comparten la pantalla y el servidor): cuatro filas de 10 casas por área, la casa al
 * fondo de su parcela con el patio hacia la calle, numeradas desde la entrada que mira a la plaza. El servidor las usa
 * para saber si alguien está parado en la puerta de una casa (el banquete: shared/banquete.ts).
 */
import { AREAS, AREA_RECT, CASAS_POR_BARRIO, areaDeBarrio } from "./ciudad";

type V2 = [number, number];
type Rect = [number, number, number, number];

/** Una parcela: su rectángulo, el centro de la casa, hacia dónde mira la puerta y el umbral. */
export type Parcela = {
  n: number;
  area: number;
  rect: Rect;
  /** Centro de la casa (en el fondo de la parcela). */
  x: number;
  z: number;
  /** La puerta mira a +z (1) o a -z (-1). */
  dir: 1 | -1;
  /** Delante de la puerta. */
  umbral: V2;
};

const ANCHO = 3.6;
/** Filas de cada área: desde el borde de arriba (z0), [inicio, fin, la puerta mira a]. */
const FILAS: [number, number, 1 | -1][] = [
  [0, 5, 1],
  [9, 14, -1],
  [14.5, 19.5, 1],
  [23.5, 28.5, -1],
];
/** Las calles de dentro de cada área (desde z0). */
export const CALLES_DE_AREA: [number, number][] = [
  [5, 9],
  [19.5, 23.5],
];

/** Por dónde se llega a cada área desde la plaza (para numerar primero las parcelas cercanas). */
const ENTRADA_AREA: V2[] = [[38, 18], [38, -18], [32, 40], [32, -40]];

function parcelasDeArea(area: number): Parcela[] {
  const [x0, z0] = AREA_RECT[area - 1];
  const out: Omit<Parcela, "n">[] = [];
  for (const [a, b, dir] of FILAS) {
    for (let i = 0; i < 10; i++) {
      const px0 = x0 + i * ANCHO, px1 = px0 + ANCHO;
      const pz0 = z0 + a, pz1 = z0 + b;
      // la casa va al fondo (lejos de la calle) y deja un patio delante de la puerta
      const back = dir === 1 ? pz0 : pz1;
      const cz = back + dir * 1.95;
      const cx = (px0 + px1) / 2;
      out.push({ area, rect: [px0, pz0, px1, pz1], x: cx, z: cz, dir, umbral: [cx, cz + dir * 2.35] });
    }
  }
  const [ex, ez] = ENTRADA_AREA[area - 1];
  out.sort((p, q) => Math.hypot(p.x - ex, p.z - ez) - Math.hypot(q.x - ex, q.z - ez));
  return out.map((p, n) => ({ ...p, n }));
}

/** Las 40 parcelas de cada área (la 0 es la más cercana a la plaza). */
export const PARCELAS: Parcela[][] = Array.from({ length: AREAS }, (_, i) => parcelasDeArea(i + 1));

export function parcelaDe(barrio: number, n: number): Parcela {
  const lista = PARCELAS[areaDeBarrio(barrio) - 1];
  return lista[Math.max(0, Math.min(CASAS_POR_BARRIO - 1, n))];
}
