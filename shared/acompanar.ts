/**
 * Acompañar a los vecinos en la ciudad (pedido de Luis: «seguir, invitar, ir con él»): ir adonde está un amigo o
 * vecino del barrio, seguirlo caminando detrás de él, e invitarlo a venir adonde estás. Solo entre amigos (de la web)
 * y vecinos del barrio, nunca con quien bloqueaste o te bloqueó, y quien no quiere recibir invitaciones las apaga
 * (el mismo interruptor de las llamadas y los retos del concurso). Seguir es solo en tu pantalla: no se avisa.
 */
import type { Verso } from "./ciudad";
import type { Camino } from "./caminos";

/** Segundos que dura una invitación. */
export const INVITACION_S = 60;
/** Una invitación a la misma persona cada tanto, y unas pocas por minuto en total. */
export const INVITAR_CADA_MS = 30_000;
export const INVITACIONES_POR_MINUTO = 4;
export const VERSO_ACOMPANAR: Verso = { text: "porque a dondequiera que tú fueres, iré yo,", ref: "Rut 1:16" };

/** Dónde está ahora un amigo o vecino (para ir con él). */
export type DondeEsta = { personajeId: number; nombre: string; x: number; z: number; enTemplo: boolean; lugar: string };

/** La invitación que le llega a un amigo o vecino. */
export type Invitacion = { de: number; nombre: string; camino: Camino; lugar: string; restantes: number };
