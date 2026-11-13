/**
 * «La noche de los sabios» (pedido de Luis, 12 de noviembre de 2026): «¿Quién es sabio?» para un grupo, como
 * los amigos de la iglesia. Alguien abre una sala con un código de seis letras e invita por la red de la ciudad a
 * sus vecinos y amigos; entran de 3 a 12 personas y quien abrió la sala la empieza. Son 12 preguntas, de la grada
 * 1 a la 12, de 20 segundos cada una, y todos responden a la vez. Acertar vale 100 puntos y hasta 100 más por la
 * rapidez (como en el duelo). Después de cada pregunta se ve la tabla en vivo, con los puestos que suben y bajan; al
 * final, el podio de los tres primeros en el estudio.
 *
 * El servidor lleva todo (las preguntas, el reloj de cada ronda, las respuestas y los puntos): aquí solo están las
 * reglas y lo que se ve. Solo entran cuentas aprobadas y nadie entra a una sala donde haya alguien con quien se
 * bloqueó. El gozo va dentro del tope de gozo del concurso y cada noche suma para la copa del barrio.
 */
import type { Verso } from "./ciudad";
import type { Camino } from "./caminos";
import { DUELO_SEGUNDOS, puntosDuelo } from "./sabio";

export const NOMBRE_NOCHE = "La noche de los sabios";
export const VERSO_NOCHE: Verso = { text: "El que anda con sabios, sabio será;", ref: "Proverbios 13:20" };
export const VERSO_SALA: Verso = { text: "¡Mirad cuán bueno y cuán delicioso es Habitar los hermanos juntos en armonía!", ref: "Salmos 133:1" };

/** Cuántas personas: de 3 a 12. */
export const NOCHE_MIN = 3;
export const NOCHE_MAX = 12;
/** Doce preguntas, de la grada 1 a la 12 (cada vez más difíciles). */
export const NOCHE_PREGUNTAS = 12;
/** Los segundos de cada pregunta (los mismos del duelo: así valen los mismos puntos por la rapidez). */
export const NOCHE_SEGUNDOS = DUELO_SEGUNDOS;
/** Segundos para prepararse antes de la primera pregunta. */
export const NOCHE_PREPARAR_S = 5;
/** Segundos que se ve la respuesta y la tabla en vivo antes de la pregunta siguiente. */
export const NOCHE_REVELAR_S = 8;
/** Una sala que nadie empieza en este tiempo se cierra sola. */
export const NOCHE_SALA_MIN = 20;
/** Noches por día para cada persona. */
export const NOCHES_DIA = 6;
/** Gozo al terminar, por el puesto (dentro del tope de gozo del concurso); los demás que terminan, NOCHE_GOZO_RESTO. */
export const NOCHE_GOZO = [20, 15, 12] as const;
export const NOCHE_GOZO_RESTO = 6;
/** Las letras del código (sin I ni O, que se confunden con 1 y 0). */
export const LETRAS_CODIGO = "ABCDEFGHJKLMNPQRSTUVWXYZ";
export const LARGO_CODIGO = 6;

/** Los puntos de una respuesta buena en la noche: 100 y hasta 100 más por la rapidez. */
export const puntosNoche = puntosDuelo;

/** El código como lo escribió la persona (minúsculas, espacios, guiones) → como se guarda. */
export function limpiarCodigo(s: unknown): string {
  return String(s ?? "")
    .normalize("NFC")
    .toUpperCase()
    .replace(/[^A-Z]/g, "")
    .slice(0, LARGO_CODIGO + 2);
}
export function codigoValido(s: string): boolean {
  return s.length === LARGO_CODIGO && [...s].every((c) => LETRAS_CODIGO.includes(c));
}
/** Un código nuevo al azar (el servidor revisa que no esté en uso). */
export function codigoNuevo(azar: () => number = Math.random): string {
  let s = "";
  for (let i = 0; i < LARGO_CODIGO; i++) s += LETRAS_CODIGO[Math.floor(azar() * LETRAS_CODIGO.length) % LETRAS_CODIGO.length];
  return s;
}

/** El gozo que corresponde a cada puesto al terminar (antes del tope del día). */
export function gozoDePuesto(puesto: number): number {
  return NOCHE_GOZO[puesto - 1] ?? NOCHE_GOZO_RESTO;
}

/**
 * Los puestos: más puntos primero; si empatan, quien acertó más rápido (menos milisegundos en sus respuestas
 * buenas); si también empatan, comparten el puesto. Quien dejó la noche va al final.
 */
export function puestosDeNoche<T extends { puntos: number; ms: number; fuera?: boolean; orden: number }>(lista: T[]): (T & { puesto: number })[] {
  const orden = [...lista].sort((a, b) => Number(!!a.fuera) - Number(!!b.fuera) || b.puntos - a.puntos || a.ms - b.ms || a.orden - b.orden);
  let puesto = 0;
  return orden.map((j, i) => {
    const antes = orden[i - 1];
    if (!antes || !!antes.fuera !== !!j.fuera || antes.puntos !== j.puntos || antes.ms !== j.ms) puesto = i + 1;
    return { ...j, puesto };
  });
}

// ---------------------------------------------------------------- lo que se ve
export type EstadoNoche = "sala" | "jugando" | "terminada" | "cancelada";

export type NocheJugadorVista = {
  /** El personaje con que juega. */
  pid: number;
  nombre: string;
  camino: Camino;
  puntos: number;
  /** El puesto ahora y el que tenía antes de la última pregunta (para las flechas que suben y bajan). */
  puesto: number;
  antes: number | null;
  /** Ya respondió la pregunta abierta (no se dice qué). */
  respondio: boolean;
  /** Lo que ganó en la última pregunta revelada (0 si no acertó), y si acertó. */
  gano: number;
  bien: boolean | null;
  /** Dejó la noche. */
  fuera: boolean;
  anfitrion: boolean;
  yo: boolean;
};

export type NocheRevelado = {
  n: number;
  texto: string;
  opciones: string[];
  correcta: string;
  explica: string;
  ref: string;
  /** Lo que respondí yo (null si no respondí o si miro). */
  mia: string | null;
  misPuntos: number;
  /** Cuántos eligieron cada respuesta (mismo orden que `opciones`). */
  conteo: number[];
  /** Cuántos acertaron. */
  bien: number;
};

export type NocheVista = {
  id: number;
  /** Solo lo ven quienes están en la sala (para invitar a más). */
  codigo: string | null;
  estado: EstadoNoche;
  anfitrion: string;
  soyAnfitrion: boolean;
  /** Estoy en la sala (o solo miro). */
  juego: boolean;
  jugadores: NocheJugadorVista[];
  ronda: number;
  total: number;
  pregunta: { n: number; texto: string; opciones: string[]; segundos: number; restantes: number } | null;
  miRespuesta: string | null;
  /** Cuántos respondieron la pregunta abierta y cuántos siguen en la noche. */
  respondieron: number;
  activos: number;
  revelado: NocheRevelado | null;
  /** Segundos para lo que viene: la primera pregunta o la siguiente; en la sala, para que se cierre sola. */
  espera: number;
  fin: { puesto: number | null; gozo: number; topeGozo: boolean; podio: { nombre: string; camino: Camino; puntos: number; puesto: number }[] } | null;
  /** Cuántos miran (sin contar a quienes juegan). */
  mirando: number;
};

/** La invitación que le llega a un vecino o amigo por la red de la ciudad. */
export type InvitacionNoche = { id: number; codigo: string; de: string; camino: Camino; jugadores: number; restantes: number };
/** Cuánto se ve una invitación. */
export const NOCHE_INVITA_S = 60;

/** Una noche que se juega ahora (para mirarla desde «En vivo»). */
export type NocheEnVivo = { id: number; anfitrion: string; camino: Camino; jugadores: number; ronda: number; total: number; primero: string | null; mirando: number };

/** A quién se puede invitar (vecinos y amigos en línea que no están en otra sala). */
export type InvitablesNoche = { personajeId: number; nombre: string; camino: Camino; donde: string; relacion: "amigo" | "vecino" | "ambos"; invitado: boolean };
