/**
 * Reuniones en las casas de Jerusalén en línea: quien ya estudió una sección puede abrir su casa
 * para enseñarla a sus vecinos, una vez por día y por 20 minutos.
 *   «Y estas palabras que yo te mando hoy, estarán sobre tu corazón; y las repetirás a tus hijos,
 *   y hablarás de ellas estando en tu casa…» (Deuteronomio 6:6-7)
 * Los vecinos que llegan a la puerta ven el versículo, la idea clave y una pregunta. Si aciertan,
 * ganan los dos: el vecino mérito y gozo; la casa que enseña, honra y gozo (hasta 10 vecinos).
 */

export const REUNION_MINUTOS = 20;
export const REUNION_PREMIO = { meritoVecino: 5, gozoVecino: 5, honraCasa: 3, gozoCasa: 2, maxPremiados: 10 };

/** El versículo de las reuniones (va en la pantalla). */
export const VERSO_REUNION = {
  text: "Y perseverando unánimes cada día en el templo, y partiendo el pan en las casas, comían juntos con alegría y sencillez de corazón,",
  ref: "Hechos 2:46",
};

/** Una reunión que se ve (en los anuncios, en la casa y en la ciudad). */
export type ReunionVista = {
  id: number;
  anfitrionId: number;
  anfitrion: string;
  barrio: number;
  parcela: number;
  estudio: string;
  seccion: string;
  /** El título de la sección que se enseña. */
  titulo: string;
  /** Segundos que le quedan. */
  faltan: number;
  asistentes: number;
  /** ¿Es la mía? ¿Ya fui? */
  mia: boolean;
  yaFui: boolean;
  /** Quien la da aprobó el examen de rango 3 (o más) de su camino: enseña en las reuniones (shared/examenes-rango.ts). */
  maestro?: boolean;
};

export type ReunionesEstado = {
  /** Mi reunión de hoy (activa o ya terminada), si abrí. */
  mia: ReunionVista | null;
  /** Las secciones que ya estudié (lo que puedo enseñar). */
  secciones: { estudio: string; seccion: string; titulo: string; icono: string }[];
  /** Las reuniones de ahora en mi barrio (y las de los demás barrios, pocas). */
  activas: ReunionVista[];
};

/** Lo que ve el vecino que llega a la reunión. */
export type ReunionLeccion = {
  id: number;
  anfitrion: string;
  titulo: string;
  estudio: string;
  verso: { text: string; ref: string };
  clave: string;
  pregunta: { p: string; ops: string[] };
  faltan: number;
  /** Si ya respondió: cómo le fue. */
  resultado: { correcta: boolean; ok: number; por: string } | null;
};

export type ReunionRespuesta = {
  correcta: boolean;
  ok: number;
  por: string;
  /** Lo que ganó (0 si no acertó o la casa ya premió a 10). */
  merito: number;
  gozo: number;
  misiones?: { titulo: string; premio: number; gozo?: number }[];
};
