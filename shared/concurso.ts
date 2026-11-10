/**
 * El concurso bíblico de la semana (Jerusalén en línea): las mismas 10 preguntas para todos cada
 * semana (de lunes a domingo, día de Texas), con 20 segundos cada una. Gana quien más acierta y,
 * si empatan, quien respondió más rápido. Al cerrar la semana, los tres primeros reciben gozo y
 * quedan como campeones en los anuncios de la plaza.
 *   «Procura con diligencia presentarte a Dios aprobado, como obrero que no tiene de qué
 *   avergonzarse, que usa bien la palabra de verdad.» (2 Timoteo 2:15)
 */

export const CONCURSO_PREGUNTAS = 10;
export const CONCURSO_SEGUNDOS = 20;
/** Gozo para el primero, el segundo y el tercero de la semana. */
export const CONCURSO_PREMIOS = [60, 40, 25];

export const VERSO_CONCURSO = {
  text: "Procura con diligencia presentarte a Dios aprobado, como obrero que no tiene de qué avergonzarse, que usa bien la palabra de verdad.",
  ref: "2 Timoteo 2:15",
};

export type ConcursoFila = { puesto: number; nombre: string; aciertos: number; segundos: number; isMe: boolean };

export type ConcursoEstado = {
  /** El lunes de la semana (clave). */
  semana: string;
  /** Días que le quedan (contando hoy). */
  diasRestantes: number;
  /** Cómo voy (null si no empecé esta semana). `esperando`: la siguiente pregunta todavía no se pidió. */
  mio: { respondidas: number; aciertos: number; segundos: number; terminado: boolean; esperando: boolean } | null;
  /** La pregunta que corre ahora (su reloj empezó al pedirla). */
  pregunta: { n: number; texto: string; opciones: string[]; segundos: number } | null;
  tabla: ConcursoFila[];
  /** Los campeones de la semana pasada. */
  campeones: { semana: string; nombres: string[] } | null;
};

export type ConcursoRespuesta = {
  correcta: boolean;
  aTiempo: boolean;
  respuesta: string;
  explica: string;
  ref: string;
  estado: ConcursoEstado;
};
