/**
 * Lo que responde el panel de seguimiento de la Dirección académica (server/academia-direccion.ts). Solo tipos: el
 * panel los importa sin cargar el catálogo de la academia.
 */
import type { DocumentoAcademia, EstadoMateria, EstatusAlumno, EstatusVista } from "./academia";
import type { FichaVista } from "./academia-inscripcion";
import type { Alcance, RolAcademia } from "./academia-permisos";
import type { AlertaPerfil } from "./academia-perfil";

/** Las alertas de un alumno en la lista del panel: cuántas de cada prioridad y sus títulos (server/academia-alertas.ts). */
export type AlertasFila = { alta: number; media: number; titulos: string[] };
/** Una semana de la academia (de lunes a domingo) en las tendencias del panel. */
export type SemanaPanel = { inicio: string; inscripciones: number; lecciones: number; minutos: number; aprobadas: number };
/** Un alumno que necesita ayuda, con sus alertas (las que piden actuar o mirar). */
export type AlumnoAyuda = { userId: number; nombre: string; matricula: string; iglesia: string; alertas: AlertaPerfil[] };

export type ActividadTipo = "inscripcion" | "materia" | "aprobada" | "nivel" | "especialidad";
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
  /** Sus alertas (en la lista de alumnos del panel). */
  alertas?: AlertasFila;
};

export type MateriaReporte = {
  id: string;
  titulo: string;
  nivel: number | null;
  /** «Nivel 1» o el nombre de la especialidad. */
  grupo: string;
  /** La especialidad a la que pertenece (null en las de los niveles). */
  especialidad: string | null;
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
  /** Quienes tienen alertas que piden actuar o mirar, los más urgentes primero. */
  ayuda: AlumnoAyuda[];
  /** Las últimas 12 semanas: inscripciones, lecciones, minutos de estudio y materias aprobadas. */
  tendencias: SemanaPanel[];
  actividad: ActividadItem[];
  /** La academia ya está abierta para todos (o en vista previa). */
  abierta: boolean;
  /**
   * Respuestas escritas por revisar, pedidos de revisión y actividades por confirmar (para quien revisa), con las
   * actividades por tipo (`defensa` cuenta los proyectos con la defensa ya hecha, que esperan su evaluación).
   */
  pendientes: { escritas: number; apelaciones: number; actividades: number; porTipo?: { tipo: string; n: number }[] };
  puede: {
    exportar: boolean; contacto: boolean; revisar: boolean; documentos: boolean; abrir: boolean;
    /** La revisión del contenido: verla y dejar observaciones, aprobar materias y retirar preguntas del banco. */
    contenido: boolean; aprobar: boolean; banco: boolean;
    /** Elegir el mentor de un alumno. */
    mentores: boolean;
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
  /** Quien lo acompaña en la academia (su mentor), si tiene. */
  mentor: { userId: number; nombre: string } | null;
  puede: { contacto: boolean; revisar: boolean; documentos: boolean; mentores: boolean; gestionar?: boolean };
  /** Para la Administración (capacidad «gestionar»): lo que se puede cambiar del alumno. */
  gestion?: GestionAlumno | null;
};

// ---------------------------------------------------------------- la gestión del expediente (server/academia-gestion.ts)

export type GestionAlumno = {
  retirado: boolean;
  /** Tiempo extra en los exámenes (×1,5). */
  tiempoExtra: boolean;
  /** Las materias abiertas en las que todavía no está inscrito (para inscribirlo). */
  inscribibles: { id: string; titulo: string; grupo: string }[];
};

/** Una parte de la nota de una materia: su peso, lo que calcula el sistema y el ajuste de la Administración, si hay. */
export type ComponenteGestion = {
  id: "final" | "repasos" | "versiculo" | "mini" | "escritos";
  texto: string;
  peso: number;
  calculado: number;
  ajuste: { nota: number; motivo: string; por: string; fecha: string } | null;
};

/** Un examen o una entrega de la materia, con sus intentos, su tope, su espera y si hay un intento en curso. */
export type PruebaGestion = {
  clave: string;
  titulo: string;
  tipo: "final" | "mini" | "breve" | "suficiencia";
  intentos: number;
  /** El tope de intentos (null: sin tope, como el examen final, que pide esperas). */
  tope: number | null;
  /** Intentos de más que dio la Administración. */
  extra: number;
  fallos: number;
  mejor: number | null;
  /** Segundos que faltan para poder intentarlo otra vez (examen final). */
  espera: number;
  /** Desde el tercer fallo hay que volver a abrir las lecciones (examen final). */
  pideRepaso: boolean;
  enCurso: boolean;
};

export type GestionMateria = {
  materia: { id: string; titulo: string; nivel: number | null; grupo: string };
  inscrita: string | null;
  estado: EstadoMateria;
  via: "cursada" | "suficiencia" | "convalidada" | null;
  nota: number | null;
  componentes: ComponenteGestion[];
  lecciones: { id: string; n: number; titulo: string; completada: boolean }[];
  pruebas: PruebaGestion[];
  versiculo: { ref: string; aprendido: boolean; puntaje: number | null } | null;
  certificado: { codigo: string; revocado: boolean } | null;
  /** En los Niveles 3 a 5: cuántas materias del nivel lleva aprobadas por suficiencia o convalidación, y el tope. */
  topeConvalidacion: { usadas: number; tope: number } | null;
};

/** Lo que responde una acción de la gestión: qué pasó (dicho para la Administración) y la materia como quedó. */
export type ResultadoGestion = { mensaje: string; materia?: GestionMateria };

/** `embudo`: hasta dónde llegan los inscritos (cuántos completaron cada lección). */
export type MateriaSeguimiento = { materia: MateriaReporte; alumnos: (AlumnoFila & { avance: MateriaAvance })[]; puede: { exportar: boolean }; embudo?: { n: number; titulo: string; completaron: number }[] };

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
  /** La especialidad del trabajo final o de la materia revisada: completa (con su certificado) o ya no. */
  especialidad?: "completa" | "reabierta" | null;
  mensaje: string;
};

/** Una entrada del historial de cambios de la academia (notas, documentos, nombres y apertura). */
export type HistorialItem = { id: number; fecha: string; por: string; accion: string; alumno: AlumnoRef | null; texto: string; motivo: string | null };
