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
  puede: { exportar: boolean; contacto: boolean };
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
  puede: { contacto: boolean };
};

export type MateriaSeguimiento = { materia: MateriaReporte; alumnos: (AlumnoFila & { avance: MateriaAvance })[]; puede: { exportar: boolean } };
