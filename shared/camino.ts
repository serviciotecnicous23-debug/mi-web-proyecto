/**
 * El camino de hoy (el motor del juego: estudio del 11 de noviembre de 2026): cuatro pasos al día —servir, aprender,
 * ayudar y restaurar— y un solo «siguiente paso» arriba de la pantalla, con su botón para ir. Al cumplir los cuatro,
 * el cofre del día. Lo lleva el servidor (server/camino.ts); aquí están las reglas y las respuestas.
 */
import type { PersonajeId } from "./personajes";
import type { EdificioRestauracion } from "./restauracion";

export type PasoId = "servir" | "aprender" | "ayudar" | "restaurar";

/** Adónde lleva el botón «Ir» de un paso. */
export type IrA =
  | { lugar: "templo" | "escuela" | "palacio" | "camara" | "siervos" | "plaza" | "sabiduria" }
  | { personaje: PersonajeId }
  | { edificio: EdificioRestauracion };

export type PasoCamino = {
  id: PasoId;
  icono: string;
  titulo: string;
  /** Lo que hay que hacer, en concreto (o lo que se hizo). */
  texto: string;
  hecho: boolean;
  progreso?: { valor: number; meta: number };
  ir: IrA | null;
};

export type CaminoHoy = {
  dia: string;
  pasos: PasoCamino[];
  hechos: number;
  cofre: { listo: boolean; recibido: boolean; gozo: number };
  /** El primer paso que falta (null si están todos). */
  siguiente: PasoCamino | null;
};

/** Segundos de servicio del día que pide el paso «servir». */
export const SERVIR_SEGUNDOS = 180;
/** Gozo del cofre del día. */
export const GOZO_COFRE = 20;

export const ICONO_PASO: Record<PasoId, string> = { servir: "🔥", aprender: "📖", ayudar: "🤝", restaurar: "🧱" };
export const TITULO_PASO: Record<PasoId, string> = { servir: "Servir", aprender: "Aprender", ayudar: "Ayudar", restaurar: "Restaurar" };
