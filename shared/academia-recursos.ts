// Los recursos de estudio de toda la academia en una lista (server/academia-recursos.ts, página /academia/recursos): los
// videos y audios de las lecciones, los recursos de cada sílabo y las lecturas ampliadas. Solo tipos.

export type TipoRecurso = "video" | "audio" | "lectura" | "guia" | "ampliada";

export type RecursoListado = {
  tipo: TipoRecurso;
  titulo: string;
  fuente: string;
  /** Un enlace de afuera (YouTube, una editorial) o de la web («/biblioteca?…»); null si es un libro sin enlace. */
  url: string | null;
  minutos: number | null;
  materia: { id: string; titulo: string; lugar: string; nivel: number | null };
  /** La lección donde está (los videos y audios de las lecciones). */
  leccion: { id: string; n: number; titulo: string } | null;
};

export type RecursosAcademia = { recursos: RecursoListado[] };
