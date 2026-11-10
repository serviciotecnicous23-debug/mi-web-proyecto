/**
 * Los pedidos del barrio (Jerusalén en línea): una vez por día, un vecino puede pedir harina, aceite
 * o corderos para su ofrenda, y los demás del barrio le dan de su alfolí. Quien ayuda gana gozo
 * (uno por cada cosa que da, hasta 15 por día) y cumple su encargo.
 *   «Sobrellevad los unos las cargas de los otros, y cumplid así la ley de Cristo.» (Gálatas 6:2)
 */

export type BienAyuda = "harina" | "aceite" | "corderos";

export const AYUDA_MIN = 3;
export const AYUDA_MAX = 10;
/** Horas que dura un pedido. */
export const AYUDA_HORAS = 12;
/** Gozo por cada cosa dada, y lo más que se gana así en un día. */
export const AYUDA_GOZO = 1;
export const AYUDA_GOZO_DIA = 15;

export const VERSO_AYUDA = {
  text: "Sobrellevad los unos las cargas de los otros, y cumplid así la ley de Cristo.",
  ref: "Gálatas 6:2",
};

export type PedidoVista = {
  id: number;
  personajeId: number;
  nombre: string;
  bien: BienAyuda;
  cantidad: number;
  recibido: number;
  /** Segundos que le quedan. */
  faltan: number;
  cumplido: boolean;
  mio: boolean;
  parcela: number;
};

export type AyudaEstado = {
  /** Mi pedido de hoy (abierto o ya cumplido). */
  mio: PedidoVista | null;
  /** Los pedidos abiertos de mi barrio (de los demás). */
  pedidos: PedidoVista[];
  /** Lo que tengo en el alfolí (para saber cuánto puedo dar). */
  bienes: Record<BienAyuda, number>;
  /** Gozo que todavía puedo ganar hoy ayudando. */
  gozoQueda: number;
};

export type AyudaDada = {
  dado: number;
  gozo: number;
  cumplido: boolean;
  estado: AyudaEstado;
  misiones?: { titulo: string; premio: number; gozo?: number }[];
};
