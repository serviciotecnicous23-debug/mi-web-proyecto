/**
 * El muro caído de Jerusalén en línea: un tramo de la muralla oriental, al norte de la puerta, está
 * caído. Cada deber de cualquier persona (sacerdote, profeta o siervo del rey) pone piedras; cuando
 * se juntan las de un tramo, el tramo se levanta en la ciudad para todos y quienes ayudaron en él
 * reciben gozo. Es de toda la ciudad, no de un barrio, y queda para siempre.
 */

export const MURO_TRAMOS = 12;
/** Piedras (deberes) que pide cada tramo. */
export const MURO_META = 300;
/** Para el premio de un tramo hay que haber puesto al menos estas piedras en él. */
export const MURO_APORTE_MINIMO = 10;
export const MURO_PREMIO_GOZO = 15;
/** Dónde está: en el muro oriental (x = 76), desde la torre norte de la puerta hacia el norte. */
export const MURO_DESDE_Z = 7;
export const MURO_TRAMO_LARGO = 2;

export const VERSO_MURO = {
  text: "Después con ánimo resuelto edificó Ezequías todos los muros caídos, e hizo alzar las torres, y otro muro por fuera: fortificó además a Milo en la ciudad de David, e hizo también muchas espadas y escudos.",
  ref: "2 Crónicas 32:5",
};

export type MuroEstado = {
  tramos: number;
  meta: number;
  /** Tramos ya levantados (0 a 12). */
  construidos: number;
  /** Piedras del tramo que se está levantando. */
  progreso: number;
  /** Mis piedras en ese tramo. */
  mias: number;
  /** Quienes más piedras pusieron en ese tramo. */
  top: { nombre: string; n: number }[];
};
