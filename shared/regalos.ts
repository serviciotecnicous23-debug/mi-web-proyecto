/**
 * Los regalos entre vecinos (Jerusalén en línea, fase 2 de la economía del gozo): comprarle a un vecino o a un amigo
 * algo del mercado (un adorno, ropa, un mueble o semillas) y mandárselo con una frase de la lista (nada de texto
 * libre: juegan jóvenes). El que regala paga el precio del día (con el 10 % al tesoro, como toda compra). Lo de
 * temporada, solo en su tiempo; lo que no se vende (trajes de sabios, prendas de la historia) no se regala.
 * «El alma generosa será prosperada» (Proverbios 11:25).
 */
import type { Verso } from "./ciudad";

/** Las frases que se pueden mandar con un regalo. */
export const FRASES_REGALO = [
  "¡Para tu casa, con cariño!",
  "Gracias por ser buen vecino.",
  "Que Dios bendiga tu casa.",
  "Un regalo para alegrar tu día.",
  "Gracias por tu ayuda en el barrio.",
  "¡Bienvenido al barrio!",
  "Para que sigas sirviendo con gozo.",
  "¡Feliz fiesta en Jerusalén!",
] as const;

/** Cuántos regalos se pueden mandar por día, y cuántos a la misma persona. */
export const REGALOS_POR_DIA = 5;
export const REGALOS_A_LA_MISMA = 2;
/** Lo que se puede regalar (del mercado). */
export const CATEGORIAS_REGALO = ["adorno", "ropa", "mueble", "semilla"] as const;

export const VERSO_REGALO: Verso = { text: "El alma generosa será prosperada; Y el que saciare, él también será saciado.", ref: "Proverbios 11:25" };

export type RegaloRecibido = { id: number; de: string; articulo: string; frase: string; cuando: string; nuevo: boolean };
export type RegalosEstado = {
  recibidos: RegaloRecibido[];
  /** Los nuevos (sin ver). */
  nuevos: number;
  /** Cuántos te quedan para mandar hoy. */
  quedanHoy: number;
  gozo: number;
};
/** Para elegir qué regalar: lo que ya tiene (para no repetir adornos ni ropa) y si se le puede regalar. */
export type ParaRegalar = {
  personajeId: number;
  nombre: string;
  puede: boolean;
  motivo: string | null;
  /** Lo que ya tiene (adornos y ropa) y los muebles que ya tiene completos. */
  tiene: string[];
  /** El nivel de su casa (algunos muebles piden una casa más grande). */
  nivel: number;
  quedanHoy: number;
  gozo: number;
};
/** Lo que le llega en vivo a quien recibe el regalo (por la red de la ciudad). */
export type AvisoRegalo = { de: string; articulo: string; frase: string };
