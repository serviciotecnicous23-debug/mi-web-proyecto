/**
 * Los roles y los permisos de la academia (docs/academia.md, «Roles y permisos»). Es una matriz de capacidades, como
 * los roles de Moodle: cada rol de la web cae en un rol de la academia, y cada capacidad dice qué puede hacer y sobre
 * quién (todos los alumnos, los de su iglesia o solo lo suyo). El servidor la comprueba en cada ruta del panel y el
 * panel la muestra tal cual, así que nunca dicen cosas distintas. No importa nada: la usan el panel y el servidor.
 */
export type RolAcademia = "direccion" | "profesor" | "iglesia" | "alumno";
/** Sobre quién: todos los alumnos, los de su iglesia aliada, solo lo suyo, o nada. */
export type Alcance = "todos" | "iglesia" | "propio" | "no";
export type Capacidad = "panel" | "avance" | "notas" | "contacto" | "exportar" | "avisos" | "revisar" | "documentos" | "contenido" | "aprobar" | "banco" | "abrir";

export type RolDef = { id: RolAcademia; nombre: string; quienes: string; roles: readonly string[] };

export const ROLES_ACADEMIA: readonly RolDef[] = [
  { id: "direccion", nombre: "Dirección académica", quienes: "Administración, Director del Ministerio y Staff Global", roles: ["admin", "director", "staff_global"] },
  { id: "profesor", nombre: "Profesor", quienes: "Maestros del Ministerio", roles: ["maestro_ministerio", "obrero"] },
  { id: "iglesia", nombre: "Iglesia aliada", quienes: "Administradores y maestros de una iglesia aliada (ven solo a los alumnos de su iglesia)", roles: ["admin_iglesia", "maestro_iglesia"] },
  { id: "alumno", nombre: "Alumno", quienes: "Todos los demás: miembros y usuarios", roles: [] },
];

/** El rol de la academia de un rol de la web. */
export function rolAcademia(role: string | null | undefined): RolAcademia {
  return ROLES_ACADEMIA.find((r) => !!role && r.roles.includes(role))?.id ?? "alumno";
}

export type CapacidadDef = {
  id: Capacidad;
  texto: string;
  detalle: string;
  alcance: Record<RolAcademia, Alcance>;
  /** Todavía no está en la web (fase A3). */
  pronto?: boolean;
  /** Lo que se muestra en lugar de «Todos los alumnos» cuando la capacidad no es sobre los alumnos. */
  textoTodos?: string;
};

export const CAPACIDADES: readonly CapacidadDef[] = [
  {
    id: "panel",
    texto: "Entrar al panel de seguimiento",
    detalle: "El resumen, los alumnos, las materias y la actividad.",
    alcance: { direccion: "todos", profesor: "todos", iglesia: "iglesia", alumno: "no" },
  },
  {
    id: "avance",
    texto: "Ver quién está inscrito y por dónde va",
    detalle: "Las materias de cada alumno, sus lecciones, su versículo y su estatus.",
    alcance: { direccion: "todos", profesor: "todos", iglesia: "iglesia", alumno: "propio" },
  },
  {
    id: "notas",
    texto: "Ver las notas y los exámenes",
    detalle: "La nota de cada materia, los intentos y la mejor nota de cada examen.",
    alcance: { direccion: "todos", profesor: "todos", iglesia: "iglesia", alumno: "propio" },
  },
  {
    id: "contacto",
    texto: "Ver la ficha con los datos de contacto",
    detalle: "Teléfono, correo, fecha de nacimiento y lo demás de la ficha de inscripción.",
    alcance: { direccion: "todos", profesor: "no", iglesia: "iglesia", alumno: "propio" },
  },
  {
    id: "exportar",
    texto: "Descargar los reportes",
    detalle: "Los alumnos, el avance en cada materia y el resumen por materia, en hojas de cálculo (CSV).",
    alcance: { direccion: "todos", profesor: "no", iglesia: "iglesia", alumno: "no" },
  },
  {
    id: "avisos",
    texto: "Recibir un aviso con cada inscripción",
    detalle: "En la campana de la web: quién se inscribió en la academia o en una materia.",
    alcance: { direccion: "todos", profesor: "no", iglesia: "iglesia", alumno: "no" },
  },
  {
    id: "revisar",
    texto: "Revisar respuestas escritas y cambiar notas",
    detalle: "Confirmar la nota del corrector o cambiarla, siempre con un motivo que queda registrado y que ve el alumno; responder los pedidos de revisión.",
    alcance: { direccion: "todos", profesor: "todos", iglesia: "no", alumno: "no" },
  },
  {
    id: "documentos",
    texto: "Corregir o revocar documentos",
    detalle: "Revocar un certificado o volver a darlo por válido, y corregir el nombre del alumno, siempre con un motivo.",
    alcance: { direccion: "todos", profesor: "no", iglesia: "no", alumno: "no" },
  },
  {
    id: "contenido",
    texto: "Revisar el contenido y dejar observaciones",
    detalle: "Leer cada materia con sus lecciones y su banco de preguntas, ver el análisis de las preguntas y dejar observaciones.",
    alcance: { direccion: "todos", profesor: "todos", iglesia: "no", alumno: "no" },
  },
  {
    id: "aprobar",
    texto: "Aprobar una materia en la revisión doctrinal",
    detalle: "Dar por revisado y aprobado el contenido de una materia antes de abrirla, o quitar esa aprobación con un motivo.",
    alcance: { direccion: "todos", profesor: "no", iglesia: "no", alumno: "no" },
  },
  {
    id: "banco",
    texto: "Retirar o volver a usar una pregunta del banco",
    detalle: "Según el análisis de preguntas: la retirada ya no sale en los intentos nuevos (las notas ya dadas no cambian).",
    alcance: { direccion: "todos", profesor: "no", iglesia: "no", alumno: "no" },
  },
  {
    id: "abrir",
    texto: "Abrir o cerrar la academia para todos",
    detalle: "Solo la Administración y el Director del Ministerio.",
    alcance: { direccion: "todos", profesor: "no", iglesia: "no", alumno: "no" },
    textoTodos: "Administración y Director",
  },
];

/** Sobre quién tiene una capacidad un rol de la web. */
export function alcanceDe(role: string | null | undefined, capacidad: Capacidad): Alcance {
  const c = CAPACIDADES.find((x) => x.id === capacidad);
  if (!c) return "no";
  if (capacidad === "abrir" && role !== "admin" && role !== "director") return "no";
  return c.alcance[rolAcademia(role)];
}

export const TEXTO_ALCANCE: Record<Alcance, string> = { todos: "Todos los alumnos", iglesia: "Los de su iglesia", propio: "Lo suyo", no: "—" };
