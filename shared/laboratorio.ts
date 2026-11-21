/**
 * El laboratorio ministerial de la academia (server/academia-laboratorio.ts): prácticas donde el alumno actúa en una
 * situación real de su ministerio, ve lo que pasa con cada decisión y recibe un perfil por competencia. Aquí, lo que
 * comparten el servidor y las pantallas: las reglas de la nota y lo que ve el alumno. Las claves (los puntos de cada
 * opción y el camino ejemplar) viven solo en el servidor (server/academia/laboratorio/) y se muestran al responder.
 */

/** Las reglas del laboratorio. En el piloto la práctica es formativa: no cuenta para la nota de la materia. */
export const LABORATORIO = {
  /** Intentos que cuentan; después se puede seguir practicando sin que cambie el mejor. */
  intentos: 3,
  /** Con una acción crítica, la práctica queda en este máximo y pide repetirla. */
  topeConCritica: 60,
  /** En el piloto no pesa en la nota de la materia. */
  cuentaParaLaNota: false,
} as const;

export type FormatoPractica = "escenario" | "conversacion" | "ordenar";

export const NOMBRE_FORMATO: Record<FormatoPractica, string> = {
  escenario: "Escenario con decisiones",
  conversacion: "Conversación simulada",
  ordenar: "Ordenar lo más apropiado",
};

export type NivelCompetencia = "Ejemplar" | "Competente" | "En desarrollo" | "Inicial";

/** El nivel de una competencia según su porcentaje (de 0 a 100). */
export function nivelDe(pct: number): NivelCompetencia {
  if (pct >= 90) return "Ejemplar";
  if (pct >= 70) return "Competente";
  if (pct >= 40) return "En desarrollo";
  return "Inicial";
}

/** Con una acción crítica en esa competencia, su nivel no pasa de «En desarrollo». */
export function nivelConCritica(pct: number, conCritica: boolean): NivelCompetencia {
  const n = nivelDe(pct);
  return conCritica && (n === "Ejemplar" || n === "Competente") ? "En desarrollo" : n;
}

/** La nota de la práctica: el promedio de las competencias según su peso; con una acción crítica, hasta 60. */
export function notaPractica(competencias: { pct: number; peso: number }[], criticas: number): number {
  const pesos = competencias.reduce((a, c) => a + c.peso, 0) || 1;
  const t = Math.round(competencias.reduce((a, c) => a + c.pct * c.peso, 0) / pesos);
  return criticas > 0 ? Math.min(t, LABORATORIO.topeConCritica) : t;
}

/** Cómo se siente el alumno al terminar (la primera pregunta de la conversación de cierre). */
export const SENTIRES = ["En calma", "Con nervios", "Con dudas", "Con peso"] as const;
export const LIMITE_LLEVO = 600;

export type Medidor = { id: string; nombre: string; valor: number; explica: string };

/** Una práctica en la lista de su materia. */
export type PracticaResumen = {
  id: string;
  titulo: string;
  formato: FormatoPractica;
  rol: string;
  situacion: string;
  minutos: number;
  pasos: number;
  /** Las lecciones en que se basa (y que hay que terminar antes). */
  lecciones: { n: number; id: string; titulo: string; completada: boolean }[];
  /** Lo que falta para hacerla («la lección 5»), vacío si ya se puede. */
  falta: string[];
  intentos: number;
  mejor: number | null;
  nivel: NivelCompetencia | null;
  /** El intento sin terminar, si hay uno. */
  enCurso: number | null;
};

export type LaboratorioMateria = {
  materiaId: string;
  practicas: PracticaResumen[];
  /** La Administración la prueba sin inscribirse: sus intentos no se guardan como de alumno. */
  prueba: boolean;
  /** Con sesión e inscrito en la materia (o la Administración): puede hacer las prácticas. */
  puede: boolean;
};

/** La práctica antes de empezar: la preparación (el rol, la situación y el objetivo). */
export type PracticaDetalle = {
  practica: PracticaResumen & {
    objetivo: string;
    antes: string[];
    competencias: { nombre: string; leccion: string }[];
    cierre: string;
    /** Un pasaje para leer antes, con su enlace a la Biblioteca. */
    lectura: { ref: string; enlace: string | null } | null;
  };
  materia: { id: string; titulo: string };
  conSesion: boolean;
  prueba: boolean;
  puede: boolean;
};

export type OpcionVista = { k: number; texto: string };

/** Lo que el alumno ve en cada paso: una escena (o un turno de la conversación) o una ronda para ordenar. */
export type PasoVista =
  | {
      tipo: "escena";
      n: number;
      de: number;
      titulo: string;
      narra: string[];
      quien: string | null;
      dice: string | null;
      pregunta: string;
      opciones: OpcionVista[];
    }
  | {
      tipo: "ordenar";
      n: number;
      de: number;
      titulo: string;
      situacion: string;
      pregunta: string;
      opciones: OpcionVista[];
    };

/** Lo que pasó con una decisión: se muestra enseguida, antes de seguir. */
export type ConsecuenciaVista = {
  n: number;
  titulo: string;
  /** Lo que eligió (en ordenar, su orden de la mejor a la peor). */
  elegida: string[];
  pasa: string;
  /** Lo que responde la otra persona, y quién es. */
  responde: string | null;
  quien: string | null;
  /** Por qué estuvo bien o qué faltó, con la lección. */
  explica: string;
  /** La mejor respuesta, si no la eligió. */
  mejor: string | null;
  ejemplar: boolean;
  puntos: number;
  max: number;
  critica: string | null;
  cambios: { nombre: string; delta: number }[];
  /** En ordenar: el orden de quien sabe, con el porqué de cada opción. */
  orden: { texto: string; porque: string; tuLugar: number }[] | null;
};

export type CompetenciaResultado = { id: string; nombre: string; leccion: string; pct: number; nivel: NivelCompetencia; conCritica: boolean };

export type ResultadoPractica = {
  nota: number;
  competencias: CompetenciaResultado[];
  criticas: { titulo: string; texto: string }[];
  /** El camino ejemplar, paso por paso, con lo que eligió el alumno (al ordenar, lo que puso primero). */
  camino: { titulo: string; porque: string; elegida: string; bien: boolean }[];
  /** Para la conversación de cierre: lo que hizo bien y lo que haría distinto. */
  bien: string[];
  distinto: string[];
};

export type IntentoVista = {
  id: number;
  practica: { id: string; titulo: string; formato: FormatoPractica; rol: string; minutos: number; cierre: string };
  materia: { id: string; titulo: string };
  intento: number;
  /** false: un intento de la Administración o después de los que cuentan. */
  cuenta: boolean;
  estado: "en-curso" | "terminado";
  paso: PasoVista | null;
  medidores: Medidor[];
  resultado: ResultadoPractica | null;
  cierre: { sentir: string | null; llevo: string } | null;
  mejor: number | null;
  intentos: number;
};

export type RespuestaPaso = { consecuencia: ConsecuenciaVista; intento: IntentoVista };
