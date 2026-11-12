/**
 * El regreso a Jerusalén en línea. Quien vuelve después de dos días o más recibe un regalo (gozo y semillas del
 * cultivo de la estación para sembrar al llegar; la primera vez que vuelve después de una semana o más, además,
 * «el mejor vestido» de Lucas 15:22) y ve lo que pasó mientras no estaba: en Jerusalén (el calendario,
 * shared/anio.ts), en su barrio, en su casa y en la ciudad.
 *
 * Lo cuenta el servidor (server/regreso.ts): la visita se anota al entrar a Jerusalén en línea y el regalo se recibe
 * una sola vez por vuelta, como mucho uno cada 7 días. Es una fuente pequeña de gozo a propósito: servir cada día
 * (la racha, los encargos) siempre rinde más que irse y volver.
 */
import type { Semilla } from "./anio";
import type { Verso } from "./calendario";

/** Días desde la última visita para que sea una vuelta (2 = faltó al menos un día entero). */
export const REGRESO_DESDE = 2;
/** Días después de volver en que todavía se puede recibir el regalo. */
export const REGRESO_VALIDO = 3;
/** Como mucho un regalo cada 7 días (contados de una vuelta a la otra). */
export const REGRESO_CADA = 7;
/** Desde cuántos días fuera llega el mejor vestido (una sola vez por persona). */
export const REGRESO_VESTIDO = 7;

/** El regalo según los días fuera (de mayor a menor). */
export const REGALOS_DE_REGRESO: readonly { desde: number; gozo: number; semillas: number }[] = [
  { desde: 14, gozo: 50, semillas: 5 },
  { desde: 7, gozo: 35, semillas: 4 },
  { desde: 4, gozo: 20, semillas: 3 },
  { desde: 2, gozo: 10, semillas: 2 },
];

/** La prenda del regreso: no se vende (shared/mercado.ts la lista como exclusiva). */
export const PRENDA_REGRESO = { id: "manto-mejor-vestido", nombre: "El mejor vestido", color: "#1f7a55" } as const;

export const VERSO_REGRESO: Verso = {
  text: "Pero el padre dijo a sus siervos: Sacad el mejor vestido, y vestidle; y poned un anillo en su mano, y calzado en sus pies.",
  ref: "Lucas 15:22",
};
export const VERSO_BIENVENIDA: Verso = { text: "Yo me alegré con los que me decían: A la casa de Jehová iremos.", ref: "Salmos 122:1" };

/** Cómo se dice cada semilla (una, varias). */
export const NOMBRE_SEMILLA: Record<Semilla, [string, string]> = {
  trigo: ["semilla de trigo", "semillas de trigo"],
  cebada: ["semilla de cebada", "semillas de cebada"],
  olivo: ["brote de olivo", "brotes de olivo"],
};

const numeroDia = (iso: string): number => {
  const [y, m, d] = iso.split("-").map(Number);
  return Math.round(Date.UTC(y, (m || 1) - 1, d || 1) / 86_400_000);
};

/** Días de una fecha (AAAA-MM-DD) a otra. */
export function diasEntre(desde: string, hasta: string): number {
  return numeroDia(hasta) - numeroDia(desde);
}

/** ¿Es una vuelta? De la última visita a hoy pasaron dos días o más. */
export function esVuelta(ultimo: string | null | undefined, hoy: string): boolean {
  return !!ultimo && diasEntre(ultimo, hoy) >= REGRESO_DESDE;
}

/** El regalo de una vuelta (gozo y cuántas semillas), o null si no hay. */
export function regaloDeRegreso(ausencia: number): { gozo: number; semillas: number } | null {
  if (!Number.isFinite(ausencia) || ausencia < REGRESO_DESDE) return null;
  const r = REGALOS_DE_REGRESO.find((x) => ausencia >= x.desde);
  return r ? { gozo: r.gozo, semillas: r.semillas } : null;
}

/**
 * La semilla del regalo: la que crece mejor en la estación (shared/anio.ts). Si la estación no tiene un cultivo propio,
 * cebada, que es la más rápida: quien vuelve ve su primera cosecha en la misma visita.
 */
export function semillaDeRegreso(cultivo: Semilla | null | undefined): Semilla {
  return cultivo ?? "cebada";
}

/** Lo que el servidor recuerda de la última vuelta de una persona. */
export type FilaRegreso = { vuelta: string | null; ausencia: number | null; reclamado: string | null };

/**
 * ¿Puede recibir el regalo hoy? Hasta 3 días después de volver, una vez por vuelta y como mucho uno cada 7 días
 * (de la vuelta del último regalo a esta).
 */
export function puedeRecibir(f: FilaRegreso, hoy: string): boolean {
  if (!f.vuelta || !f.ausencia || f.ausencia < REGRESO_DESDE) return false;
  const pasaron = diasEntre(f.vuelta, hoy);
  if (pasaron < 0 || pasaron > REGRESO_VALIDO) return false;
  if (!f.reclamado) return true;
  return f.reclamado < f.vuelta && diasEntre(f.reclamado, f.vuelta) >= REGRESO_CADA;
}

/** ¿Ya recibió el regalo de esta vuelta? */
export function yaRecibido(f: FilaRegreso): boolean {
  return !!f.vuelta && !!f.reclamado && f.reclamado >= f.vuelta;
}

// ---------------------------------------------------------------- respuestas de la API
export type RegaloRegreso = {
  gozo: number;
  semillas: { id: Semilla; n: number; nombre: string };
  /** El mejor vestido (solo la primera vez que vuelve después de una semana o más). */
  prenda: { id: string; nombre: string } | null;
  /** «listo»: se puede recibir hoy; «recibido»: ya lo recibió en esta vuelta. */
  estado: "listo" | "recibido";
};

export type BarrioMientras = {
  n: number;
  nombre: string;
  /** Vecinos que llegaron al barrio (los primeros nombres) y cuántos fueron. */
  vecinosNuevos: { nombres: string[]; total: number };
  /** Mensajes en la charla del barrio (sin los tuyos ni los de quien bloqueaste) y quiénes escribieron. */
  charla: { mensajes: number; quienes: string[] };
  reuniones: { total: number; anfitriones: string[] };
  /** Lo que el barrio dio a las casas del pueblo. */
  pueblo: { cosas: number; personas: number };
  /** Los pedidos de ayuda del barrio que alguien atendió. */
  ayudas: { veces: number; cosas: number };
  /** La copa de esta semana: el puesto (null si todavía no suma) y los puntos que ganó mientras no estabas. */
  copa: { puesto: number | null; puntos: number; barrios: number; ganados: number | null };
  nivel: { nivel: number; nombre: string; subio: boolean };
};

export type CasaMientras = {
  /** Quienes visitaron y bendijeron tu casa. */
  visitas: { nombres: string[]; total: number };
  /** Lo que te dieron en tus pedidos de ayuda. */
  regalos: { quien: string; bien: string; cantidad: number }[];
  /** Parcelas del huerto listas para cosechar. */
  huertoListo: number;
  /** Lo que se vendió en tu puesto del mercado y todavía no has visto. */
  ventas: number;
};

export type CiudadMientras = {
  /** Piedras que puso la ciudad en el muro mientras no estabas (null si no se sabe: la primera vez). */
  piedras: number | null;
  muro: { tramos: number; de: number };
  /** Los capítulos de la historia de la temporada que se cumplieron mientras no estabas. */
  capitulosCumplidos: string[];
  /** El capítulo de esta semana y cuánto lleva la ciudad (0 a 100). */
  capitulo: { titulo: string; icono: string; pct: number; cumplido: boolean } | null;
};

export type RegresoVista = {
  hoy: string;
  /** La última vuelta (si fue hace 3 días o menos): el día, cuántos días estuvo fuera y su última visita antes. */
  vuelta: { dia: string; ausencia: number; desde: string; hoy: boolean } | null;
  regalo: RegaloRegreso | null;
  barrio: BarrioMientras | null;
  casa: CasaMientras | null;
  ciudad: CiudadMientras | null;
};

export type RegaloRecibido = {
  gozo: number;
  gozoTotal: number;
  semillas: { id: Semilla; n: number; nombre: string };
  prenda: { id: string; nombre: string } | null;
};
