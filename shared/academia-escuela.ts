/**
 * La Academia y la Escuela, conectadas (docs/academia.md, «Las asignaciones a los cursos de la Escuela» y «Los
 * mentores»): lo que responde el servidor (server/academia-asignaciones.ts y server/academia-mentores.ts) y el estado
 * de cada asignación. No importa nada: lo usan el aula, la planilla, la portada de la academia y el servidor.
 */

/** Cómo va un alumno en una materia que le asignó su curso. */
export type EstadoAsignacion = "sin-empezar" | "en-curso" | "aprobada" | "vencida";

export const TEXTO_ESTADO_ASIGNACION: Record<EstadoAsignacion, string> = {
  "sin-empezar": "Sin empezar",
  "en-curso": "En curso",
  aprobada: "Aprobada",
  vencida: "Vencida",
};

export type AvanceAsignacion = {
  estado: EstadoAsignacion;
  /** Lecciones completadas de la materia, de cuántas. */
  lecciones: number;
  de: number;
  /** La nota de la materia, si está aprobada. */
  nota: number | null;
  aprobada: string | null;
  /** Si se aprobó antes de la fecha límite (null si no hay fecha o no está aprobada). */
  aTiempo: boolean | null;
};

/** Lo que se sabe del alumno en la materia (academia_materias y sus lecciones completadas). */
export type FilaAvance = { estado: string | null; lecciones: number; nota: number | null; aprobadaAt: string | null };

/**
 * El estado de una asignación para un alumno, calculado al leerlo (nada corre de fondo): aprobada (a tiempo o no),
 * vencida si pasó la fecha sin aprobarla, en curso si se inscribió o completó alguna lección, y si no, sin empezar.
 */
export function estadoAsignacion(fila: FilaAvance | null, de: number, venceAt: string | null, ahora = Date.now()): AvanceAsignacion {
  const lecciones = Math.min(de, Math.max(0, fila?.lecciones ?? 0));
  const vence = venceAt ? Date.parse(venceAt) : NaN;
  if (fila?.estado === "aprobada") {
    const aprobada = fila.aprobadaAt ?? null;
    const aTiempo = Number.isFinite(vence) && aprobada ? Date.parse(aprobada) <= vence : null;
    return { estado: "aprobada", lecciones: de, de, nota: fila.nota ?? null, aprobada, aTiempo };
  }
  const base = { lecciones, de, nota: null, aprobada: null, aTiempo: null };
  if (Number.isFinite(vence) && ahora > vence) return { estado: "vencida", ...base };
  if (fila?.estado || lecciones > 0) return { estado: "en-curso", ...base };
  return { estado: "sin-empezar", ...base };
}

/** Una materia de la Academia asignada a un curso de la Escuela. */
export type Asignacion = {
  id: number;
  curso: { id: number; titulo: string };
  materia: { id: string; titulo: string; nivel: number | null; lecciones: number };
  obligatoria: boolean;
  /** La fecha límite (el final del día que eligió el profesor), o null. */
  venceAt: string | null;
  indicaciones: string | null;
  por: string;
  fecha: string;
};

export type ResumenAsignacion = { alumnos: number; sinEmpezar: number; enCurso: number; aprobadas: number; vencidas: number };

/** Las asignaciones de un curso, como las ve quien lo dirige (con cada alumno) o un alumno inscrito (con lo suyo). */
export type AsignacionesCurso = {
  curso: { id: number; titulo: string };
  /** Si la academia ya está abierta para todos (si no, los alumnos del curso todavía no ven las asignaciones). */
  abierta: boolean;
  /** Quien mira la puede ver (los alumnos, solo cuando está abierta). */
  visible: boolean;
  puedeGestionar: boolean;
  /** Las materias que se pueden asignar (las que tienen contenido). */
  materias: { id: string; titulo: string; nivel: number | null }[];
  asignaciones: (Asignacion & { resumen: ResumenAsignacion | null; mio: AvanceAsignacion | null })[];
  /** Solo para quien dirige el curso: cada alumno inscrito y aprobado, con su avance en cada asignación. */
  alumnos: { userId: number; nombre: string; matriculado: boolean; avance: Record<number, AvanceAsignacion> }[] | null;
};

/** Una asignación de alguno de mis cursos, con mi avance (la portada de la academia y la página de la materia). */
export type MiAsignacion = Asignacion & { avance: AvanceAsignacion };

/** Para la planilla del curso: las columnas de la Academia y el avance de cada alumno. */
export type AcademiaEnPlanilla = {
  asignaciones: { id: number; titulo: string; obligatoria: boolean; venceAt: string | null }[];
  avance: Record<number, Record<number, AvanceAsignacion>>;
};

/** El texto corto de un avance, para la planilla y el CSV: «92», «En curso (2/4)», «Sin empezar» o «Vencida (1/4)». */
export function textoAvance(a: AvanceAsignacion | undefined | null): string {
  if (!a) return "";
  if (a.estado === "aprobada") return a.nota != null ? String(a.nota) : "Aprobada";
  if (a.estado === "sin-empezar") return "Sin empezar";
  return `${TEXTO_ESTADO_ASIGNACION[a.estado]} (${a.lecciones}/${a.de})`;
}

// ---------------------------------------------------------------- los mentores

/** Una persona que un mentor acompaña: su avance, sin notas ni datos de contacto. */
export type Acompanado = {
  userId: number;
  nombre: string;
  matricula: string | null;
  nivel: number;
  estatus: { clave: string; texto: string };
  iglesia: string;
  lecciones: number;
  aprobadas: number;
  enCurso: { materiaId: string; titulo: string; lecciones: number; de: number }[];
  ultima: string | null;
  /** Días sin estudiar, si tiene materias en curso y pasó el umbral. */
  detenido: number | null;
};

export type MisAcompanados = { acompanados: Acompanado[]; umbral: number };

/** Se considera que se detuvo quien tiene materias en curso y no estudia hace tantos días. */
export const DIAS_DETENIDO_MENTOR = 7;
