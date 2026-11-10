/**
 * La economía de Jerusalén en línea: el gozo circula entre los vecinos.
 * - Los puestos de los vecinos: cada uno vende lo de su alfolí (flor de harina, aceite, corderos) al
 *   precio que elija, entre lo que paga el mercader y cuatro veces eso. El mercader de la plaza solo
 *   compra: quien necesita harina o aceite para el horno o las ofrendas se la compra a un vecino.
 * - El diezmo: de cada venta entre vecinos, el 10 % va al tesoro del templo; del mercado de la plaza,
 *   también el 10 % de lo que se compra.
 * - El tesoro reparte: la provisión para los que recién empiezan (Deuteronomio 14:28-29) y, cada
 *   semana, un premio a las casas más bendecidas por sus vecinos.
 * - El mercader paga menos lo que ya compró mucho ese día en toda la ciudad (hasta la mitad).
 * - Los muebles puestos dentro de la casa ayudan: el molino y las vasijas dan uno más en la cosecha
 *   y la tinaja hace rendir el riego.
 */
import { PRECIO_VENTA, type BienMercado } from "./mercado";

/** La parte de cada venta que va al tesoro del templo. */
export const DIEZMO = 0.1;
export function diezmoDe(total: number): number {
  return Math.floor(Math.max(0, total) * DIEZMO);
}

/** Puestos abiertos por persona, cuánto duran y cuánto se puede poner en uno. */
export const PUESTOS_MAX = 3;
export const PUESTO_HORAS = 48;
export const PUESTO_CANTIDAD_MAX = 30;

/** Precio por unidad permitido en un puesto: desde lo que paga el mercader hasta cuatro veces eso. */
export function rangoPrecio(b: BienMercado): { min: number; max: number } {
  const base = PRECIO_VENTA[b];
  return { min: Math.max(1, base), max: base * 4 };
}

/** Unidades vendidas en el día (en toda la ciudad) para que el mercader pague la mitad. */
export const SATURACION = 300;
/** Lo que paga el mercader por una unidad, según lo que ya compró hoy en la ciudad (nunca menos de la mitad ni de 1). */
export function precioMercaderHoy(precioDelDia: number, vendidosHoy: number): number {
  const k = Math.max(0.5, 1 - (Math.max(0, vendidosHoy) / SATURACION) * 0.5);
  return Math.max(1, Math.round(precioDelDia * k));
}

/** La provisión del tesoro: para quien empezó hace poco y casi no tiene gozo, una vez al día. */
export const PROVISION = { gozo: 6, siTieneMenosDe: 60, dias: 14 };

/** Premios de la semana (del tesoro) para las tres casas más bendecidas por sus vecinos. */
export const PREMIO_CASAS = [40, 25, 15];

/** Lo que hace cada mueble útil cuando está puesto dentro de la casa. */
export const AYUDA_MUEBLES: Record<string, string> = {
  molino: "Puesto en tu casa: el trigo y la cebada dan 1 más de flor de harina al cosechar.",
  vasijas: "Puestas en tu casa: el olivo da 1 más de aceite al cosechar.",
  tinaja: "Puesta en tu casa: el riego hace crecer 35 % más rápido (en vez de 25 %).",
};
/** Riego: cuánto dura el crecimiento regado, con y sin la tinaja. */
export const RIEGO = { normal: 0.75, conTinaja: 0.65 };

export const VERSO_DIEZMO = {
  text: "Traed todos los diezmos al alfolí y haya alimento en mi casa;",
  ref: "Malaquías 3:10",
};
export const VERSO_PROVISION = {
  text: "Y vendrá el levita, que no tiene parte ni heredad contigo, y el extranjero, el huérfano y la viuda que hubiere en tus poblaciones, y comerán y serán saciados;",
  ref: "Deuteronomio 14:29",
};

// ---------------------------------------------------------------- respuestas de la API
export type PuestoVista = {
  id: number;
  vendedor: string;
  vendedorId: number;
  bien: BienMercado;
  cantidad: number;
  precio: number;
  /** Segundos que faltan para que cierre (lo calcula el servidor: no depende de la hora del teléfono). */
  quedan: number;
  mio: boolean;
};

export type VentaNueva = { bien: BienMercado; cantidad: number; ganado: number; diezmo: number };

export type PuestosEstado = {
  abiertos: PuestoVista[];
  mios: PuestoVista[];
  /** Lo que se vendió de tus puestos desde la última vez (para avisarte). */
  ventasNuevas: VentaNueva[];
  gozo: number;
  bienes: Record<BienMercado, number>;
  /** Cuánto cabe todavía en tu alfolí de cada cosa. */
  libre: Record<BienMercado, number>;
  tesoro: number;
  precios: Record<BienMercado, { min: number; max: number; mercader: number }>;
};

export type TesoroEstado = {
  balance: number;
  entro: number;
  salio: number;
  ultimos: { texto: string; cuanto: number; entra: boolean; cuando: string }[];
  /** Las casas más bendecidas de esta semana (hasta ahora). */
  casas: { personajeId: number; nombre: string; bendiciones: number }[];
  premios: number[];
  provision: { puede: boolean; ya: boolean; motivo: string | null; gozo: number };
};
