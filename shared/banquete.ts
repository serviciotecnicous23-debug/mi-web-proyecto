/**
 * El banquete en tu casa (Jerusalén en línea, fase 2 de la economía del gozo): abres tu casa 20 minutos con pan y
 * aceite para los que lleguen. Los vecinos que se paran en tu puerta se sientan a la mesa: cada uno gana un poco de
 * gozo y puntos para la copa del barrio, y tu casa gana honra por cada uno. Una vez por día; el banquete cuesta más
 * de lo que reparte (es hospitalidad, no negocio). Como las fiestas en el iglú de los juegos de antes, pero en
 * Jerusalén: «practicando la hospitalidad» (Romanos 12:13).
 */
import type { Verso } from "./ciudad";

export const BANQUETE = {
  minutos: 20,
  /** Lo que cuesta abrirlo: gozo y lo del alfolí. */
  gozo: 40,
  harina: 5,
  aceite: 2,
  /** Lo que gana cada invitado (y la copa de su barrio), y la honra de la casa por cada uno. */
  gozoInvitado: 2,
  honraPorInvitado: 2,
  maxInvitados: 12,
  /** Banquetes a los que uno se puede sentar por día (para que nadie viva de banquetes). */
  sentadasPorDia: 3,
  /** Qué tan cerca de la puerta hay que estar (metros). */
  cerca: 4,
} as const;

export const VERSO_BANQUETE: Verso = { text: "compartiendo para las necesidades de los santos; practicando la hospitalidad.", ref: "Romanos 12:13" };
export const VERSO_INVITADO: Verso = { text: "Hospedaos los unos a los otros sin murmuraciones.", ref: "1 Pedro 4:9" };

export type BanqueteVista = {
  id: number;
  anfitrionId: number;
  anfitrion: string;
  barrio: number;
  parcela: number;
  /** Segundos que le quedan. */
  faltan: number;
  invitados: number;
  mio: boolean;
  /** Ya me senté a esta mesa. */
  sentado: boolean;
};
export type BanquetesEstado = {
  /** Mi banquete de hoy (si abrí), activo o terminado. */
  mio: BanqueteVista | null;
  /** Si hoy todavía puedo abrir uno, y por qué no. */
  puedoAbrir: boolean;
  motivo: string | null;
  /** Los banquetes de ahora (los de mi barrio primero). */
  activos: BanqueteVista[];
  /** A cuántos me senté hoy. */
  sentadasHoy: number;
  gozo: number;
};
export type SentarseRespuesta = { gozo: number; gozoTotal: number; honra: number; banquete: BanqueteVista };
