/**
 * La calidad del contenido (docs/academia.md, «La revisión del contenido» y «El análisis de preguntas»): lo que
 * responde el servidor (server/academia-calidad.ts). Solo tipos: el panel los importa sin cargar el catálogo.
 */

/** Una observación sobre el contenido de una materia (o de una de sus lecciones). */
export type ObservacionContenido = {
  id: number;
  leccionId: string | null;
  leccion: string | null;
  texto: string;
  por: string;
  fecha: string;
  /** La dejó quien mira (la puede resolver aunque no sea de la Dirección académica). */
  propia: boolean;
  resuelta: { por: string; fecha: string; respuesta: string | null } | null;
};

/** La aprobación doctrinal de una materia; deja de estar vigente si el contenido cambió después de aprobarla. */
export type AprobacionContenido = { por: string; fecha: string; notas: string | null; vigente: boolean };

/** Una materia en la lista de la revisión del contenido. */
export type ContenidoResumen = {
  id: string;
  titulo: string;
  nivel: number | null;
  disponible: boolean;
  lecciones: number;
  /** Preguntas del banco del examen final y preguntas escritas. */
  preguntas: number;
  escritas: number;
  /** Observaciones sin resolver. */
  abiertas: number;
  aprobacion: AprobacionContenido | null;
  /** Preguntas con alguna bandera del análisis (sin contar «pocos datos»). */
  alertas: number;
  retiradas: number;
};

/** La lista de la revisión del contenido, con lo que falta para abrir la academia. */
export type ContenidoLista = {
  materias: ContenidoResumen[];
  /** Materias con contenido, cuántas tienen la aprobación vigente y cuántas observaciones siguen abiertas. */
  total: number;
  aprobadas: number;
  abiertas: number;
};

/** Las cifras de una pregunta objetiva del banco, con su texto y su respuesta (solo para la Dirección y los profesores). */
export type PreguntaAnalisis = {
  id: string;
  leccion: number;
  texto: string;
  correcta: string;
  falsas: string[];
  explica: string;
  ref: string;
  n: number;
  facilidad: number | null;
  discriminacion: number | null;
  tarde: number | null;
  distractor: { texto: string; veces: number; parte: number } | null;
  banderas: string[];
  retirada: { por: string; fecha: string; motivo: string } | null;
  /** Por qué no se puede retirar (el banco quedaría corto), o null si se puede. */
  noSeRetira: string | null;
};

export type EscritaAnalisis = {
  id: string;
  pregunta: string;
  ideas: { texto: string; peso: number }[];
  modelo: string;
  n: number;
  promedio: number | null;
  marcadas: number | null;
  cambiadas: number | null;
  cambioMedio: number | null;
  banderas: string[];
  retirada: { por: string; fecha: string; motivo: string } | null;
  noSeRetira: string | null;
};

export type RepasoContenido = { leccionId: string; leccion: string; preguntas: { id: string; texto: string; correcta: string; falsas: string[]; explica: string; ref: string }[] };

/** Una materia en la revisión del contenido: sus lecciones, sus observaciones, su aprobación y el análisis de su banco. */
export type ContenidoDetalle = {
  materia: { id: string; titulo: string; nivel: number | null; resumen: string; memoria: string | null; disponible: boolean };
  lecciones: { id: string; titulo: string; minutos: number; base: string }[];
  observaciones: ObservacionContenido[];
  aprobacion: AprobacionContenido | null;
  /** Intentos cerrados en los que se basa el análisis: los del examen final y los del examen integral del nivel. */
  intentos: { final: number; integral: number };
  objetivas: PreguntaAnalisis[];
  escritas: EscritaAnalisis[];
  repaso: RepasoContenido[];
  /** Los umbrales del análisis, para explicarlos en la pantalla. */
  umbrales: { minimo: number; muyDificil: number; muyFacil: number; discriminaPoco: number; tarde: number };
  puede: { observar: boolean; aprobar: boolean; banco: boolean };
};
