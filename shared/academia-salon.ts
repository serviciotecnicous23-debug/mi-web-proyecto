// El salón del alumno (server/academia-salon.ts): su tiempo de estudio. Liviano: lo usan el servidor y la página.

/** La meta de cada semana, en minutos: la elige el alumno (de 30 minutos a 20 horas). */
export const META_ESTUDIO = { porDefecto: 120, min: 30, max: 1200, opciones: [60, 90, 120, 180, 240, 300, 420, 600] } as const;
/** Lo más que suma un aviso del temporizador y lo más que cuenta un día. */
export const ESTUDIO = { porAviso: 60, porDia: 720 } as const;
/** Las sesiones del temporizador de enfoque, en minutos. */
export const SESIONES = { enfoque: [15, 25, 45], descanso: 5 } as const;

export type EstudioVista = {
  hoy: number;
  /** Los últimos 7 días (el último es hoy, en hora de Texas), con sus minutos. */
  semana: { dia: string; minutos: number }[];
  totalSemana: number;
  meta: number;
  /** Días seguidos con algo de estudio (hasta hoy o ayer). */
  racha: number;
};
