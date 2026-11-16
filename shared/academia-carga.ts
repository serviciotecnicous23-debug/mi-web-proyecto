// La carga de trabajo real de una lección (docs/academia-auditoria.md, «Cómo se midió»): el tiempo que de verdad pide
// leerla con atención, ver sus videos, responder su repaso y escribir «Para la vida». Reemplaza a los minutos fijos
// (7 o 10) que traía cada lección, que en los niveles altos se quedaban cortos. No importa nada.
//
// Las velocidades de lectura son para estudiar (comprender un texto con conceptos nuevos), como las del estimador de
// carga de la Universidad Rice (130 a 180 palabras por minuto), y bajan en los niveles altos, más densos.

/** Palabras por minuto para estudiar, según el nivel (las especialidades leen como el Nivel 3). */
export const PALABRAS_POR_MINUTO: Record<number, number> = { 1: 150, 2: 140, 3: 130, 4: 120, 5: 120 };
/** Un versículo citado: unas 28 palabras en promedio (su texto sale de la RV1960 al pedir la lección). */
export const PALABRAS_POR_VERSICULO = 28;
/** Un video sin duración anotada: 3 minutos. */
export const MINUTOS_VIDEO_SIN_DATO = 3;
/** Cada pregunta del repaso: leerla, elegir y leer la explicación. */
export const SEGUNDOS_POR_PREGUNTA_REPASO = 40;
/** «Para la vida»: leer la aplicación y escribir la respuesta privada. */
export const MINUTOS_PARA_LA_VIDA = 2;

export type MedidaLeccion = {
  /** Palabras del texto que se lee (sin los versículos). */
  palabras: number;
  versiculos: number;
  /** Minutos de cada video (null si no se sabe). */
  videos: (number | null)[];
  preguntasRepaso: number;
  /** El nivel (null en una especialidad). */
  nivel: number | null;
};

/** Los minutos que de verdad pide una lección (redondeados, nunca menos de 5). */
export function minutosDeLeccion(m: MedidaLeccion): number {
  const ppm = PALABRAS_POR_MINUTO[m.nivel ?? 3] ?? 130;
  const leer = (m.palabras + m.versiculos * PALABRAS_POR_VERSICULO) / ppm;
  const ver = m.videos.reduce<number>((a, v) => a + (v ?? MINUTOS_VIDEO_SIN_DATO), 0);
  const repaso = (m.preguntasRepaso * SEGUNDOS_POR_PREGUNTA_REPASO) / 60;
  return Math.max(5, Math.round(leer + ver + repaso + MINUTOS_PARA_LA_VIDA));
}

/** Las palabras de un texto. */
export const contarPalabras = (t: string | undefined | null) => (t ?? "").split(/\s+/).filter(Boolean).length;
