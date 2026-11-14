/**
 * Lo que responde el panel de seguimiento de la Dirección académica (server/academia-direccion.ts). Solo tipos: el
 * panel los importa sin cargar el catálogo de la academia.
 */
import type { DocumentoAcademia, EstadoMateria, EstatusAlumno, EstatusVista } from "./academia";
import type { FichaVista } from "./academia-inscripcion";
import type { Alcance, RolAcademia } from "./academia-permisos";

export type ActividadTipo = "inscripcion" | "materia" | "aprobada" | "nivel";
export type ActividadItem = { tipo: ActividadTipo; userId: number; nombre: string; matricula: string | null; texto: string; fecha: string };

export type AlumnoFila = {
  userId: number;
  nombre: string;
  matricula: string;
  promocion: number;
  pais: string;
  ciudad: string;
  iglesia: string;
  estatus: EstatusVista;
  /** Materias inscritas, aprobadas y en curso (con sus títulos). */
  materias: number;
  aprobadas: number;
  enCurso: string[];
  lecciones: number;
  desde: string;
  ultima: string;
  /** Solo con el permiso de ver el contacto. */
  telefono?: string;
  correo?: string;
};

export type MateriaReporte = {
  id: string;
  titulo: string;
  nivel: number | null;
  orden: number;
  inscritos: number;
  enCurso: number;
  aprobadas: number;
  /** El promedio de las notas de quienes la aprobaron. */
  promedio: number | null;
  /** El avance medio de los inscritos, en lecciones completadas (0 a 100). */
  avance: number;
};

export type DireccionResumen = {
  rol: RolAcademia;
  alcance: Alcance;
  iglesia: { id: number; nombre: string } | null;
  totales: { inscritos: number; nuevosSemana: number; nuevosMes: number; lecciones: number; aprobadas: number; niveles: number; promedio: number | null };
  estatus: Record<EstatusAlumno, number>;
  materias: MateriaReporte[];
  paises: { nombre: string; n: number }[];
  iglesias: { nombre: string; n: number }[];
  /** Con materias en curso y 14 días o más sin estudiar. */
  detenidos: AlumnoFila[];
  actividad: ActividadItem[];
  /** La academia ya está abierta para todos (o en vista previa). */
  abierta: boolean;
  /** Respuestas escritas por revisar y pedidos de revisión pendientes (para quien revisa). */
  pendientes: { escritas: number; apelaciones: number };
  puede: {
    exportar: boolean; contacto: boolean; revisar: boolean; documentos: boolean; abrir: boolean;
    /** La revisión del contenido: verla y dejar observaciones, aprobar materias y retirar preguntas del banco. */
    contenido: boolean; aprobar: boolean; banco: boolean;
  };
};

export type MateriaAvance = {
  id: string;
  titulo: string;
  nivel: number | null;
  inscrita: string;
  estado: EstadoMateria;
  lecciones: number;
  de: number;
  versiculo: boolean;
  intentos: number;
  mejor: number | null;
  nota: number | null;
  aprobada: string | null;
  certificado: string | null;
};

export type AlumnoDetalle = {
  fila: AlumnoFila;
  /** La ficha completa, solo con el permiso de ver el contacto. */
  ficha: FichaVista | null;
  materias: MateriaAvance[];
  niveles: { n: number; nombre: string; pacto: string | null; completado: string | null; promedio: number | null }[];
  certificados: DocumentoAcademia[];
  actividad: ActividadItem[];
  puede: { contacto: boolean; revisar: boolean; documentos: boolean };
};

export type MateriaSeguimiento = { materia: MateriaReporte; alumnos: (AlumnoFila & { avance: MateriaAvance })[]; puede: { exportar: boolean } };

// ---------------------------------------------------------------- la revisión (fase A3)

export type AlumnoRef = { userId: number; nombre: string; matricula: string | null };
export type ExamenRef = { clave: string; titulo: string; intento: number };

/** Una respuesta escrita para revisar, con la clave de corrección que la juzgó. */
export type ItemRevision = {
  id: number;
  alumno: AlumnoRef;
  examen: ExamenRef;
  pregunta: string;
  modelo: string;
  /** Las ideas de la clave: su peso y si el corrector la encontró. */
  ideas: { texto: string; peso: number; ok: boolean }[];
  /** Los conceptos errados que el corrector encontró. */
  errores: string[];
  citas: string[];
  texto: string;
  palabras: number;
  /** Por qué quedó para revisar: nota dudosa, texto pegado, copia de la pregunta, lista de palabras, fuera de tiempo. */
  marcas: string[];
  notaAuto: number;
  notaFinal: number | null;
  revision: { por: string; fecha: string; motivo: string } | null;
  /** Un pedido de revisión pendiente del mismo examen. */
  apelacion: number | null;
  fecha: string;
};

export type ApelacionItem = {
  id: number;
  alumno: AlumnoRef;
  examen: ExamenRef;
  mensaje: string;
  fecha: string;
  estado: "pendiente" | "resuelta";
  respuesta: string | null;
  resuelta: string | null;
  por: string | null;
  /** Las respuestas escritas de ese intento. */
  escritas: ItemRevision[];
};

export type RevisionPanel = { pendientes: ItemRevision[]; apelaciones: ApelacionItem[]; recientes: ItemRevision[] };

/** Lo que pasó al cambiar una nota: el examen, la materia y el nivel, recalculados. */
export type ResultadoRevision = {
  item: ItemRevision;
  recalculado: boolean;
  examen: { antes: number | null; despues: number | null };
  materia: { nota: number; aprobada: boolean; cambio: "aprobada" | "desaprobada" | null } | null;
  nivel: "completo" | "reabierto" | null;
  mensaje: string;
};

/** Una entrada del historial de cambios de la academia (notas, documentos, nombres y apertura). */
export type HistorialItem = { id: number; fecha: string; por: string; accion: string; alumno: AlumnoRef | null; texto: string; motivo: string | null };
