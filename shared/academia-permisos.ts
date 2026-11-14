/**
 * Los roles y los permisos de la academia (docs/academia.md, «Roles y permisos»). Hay dos áreas separadas:
 * - **La academia**, donde se estudia: cada alumno ve solo lo suyo (su avance, sus notas y su ficha).
 * - **La administración de la academia** (desde el panel de administración de la web): la maneja SOLO la
 *   Administración. Los maestros, los líderes y las iglesias aliadas entran desde su propio panel y solo VEN la
 *   información de los alumnos (las iglesias, solo la de los alumnos de su iglesia); no cambian nada.
 *
 * Es una matriz de capacidades, como los roles de Moodle: cada rol de la web cae en un rol de la academia y cada
 * capacidad dice qué puede hacer y sobre quién. El servidor la comprueba en cada ruta y el panel la muestra tal cual.
 * No importa nada: la usan el panel y el servidor.
 */
export type RolAcademia = "direccion" | "equipo" | "iglesia" | "alumno";
/** Sobre quién: todos los alumnos, los de su iglesia aliada, solo lo suyo, o nada. */
export type Alcance = "todos" | "iglesia" | "propio" | "no";
export type Capacidad = "panel" | "avance" | "notas" | "contacto" | "exportar" | "avisos" | "revisar" | "documentos" | "contenido" | "aprobar" | "banco" | "mentores" | "abrir";

export type RolDef = { id: RolAcademia; nombre: string; quienes: string; roles: readonly string[] };

export const ROLES_ACADEMIA: readonly RolDef[] = [
  {
    id: "direccion",
    nombre: "Administración de la academia",
    quienes: "Solo la Administración de la web: es quien maneja la academia (revisa notas, aprueba el contenido, corrige documentos, elige mentores y la abre).",
    roles: ["admin"],
  },
  {
    id: "equipo",
    nombre: "Maestros y líderes (solo ver)",
    quienes: "El Director del Ministerio, el Staff Global, los Maestros del Ministerio y los obreros: ven el avance y las notas de los alumnos, sin sus datos de contacto y sin cambiar nada.",
    roles: ["director", "staff_global", "maestro_ministerio", "obrero"],
  },
  {
    id: "iglesia",
    nombre: "Pastores e iglesias aliadas (solo ver)",
    quienes: "Los administradores y los maestros de una iglesia aliada: ven solo a los alumnos de su iglesia, sin cambiar nada.",
    roles: ["admin_iglesia", "maestro_iglesia"],
  },
  { id: "alumno", nombre: "Alumno", quienes: "Todos los demás: estudian en la academia y ven solo lo suyo.", roles: [] },
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
};

/** Lo que puede hacer solo la Administración. */
const SOLO_ADMIN: Record<RolAcademia, Alcance> = { direccion: "todos", equipo: "no", iglesia: "no", alumno: "no" };

export const CAPACIDADES: readonly CapacidadDef[] = [
  {
    id: "panel",
    texto: "Entrar al seguimiento de la academia",
    detalle: "El resumen, los alumnos, las materias y la actividad.",
    alcance: { direccion: "todos", equipo: "todos", iglesia: "iglesia", alumno: "no" },
  },
  {
    id: "avance",
    texto: "Ver quién está inscrito y por dónde va",
    detalle: "Las materias de cada alumno, sus lecciones, su versículo y su estatus.",
    alcance: { direccion: "todos", equipo: "todos", iglesia: "iglesia", alumno: "propio" },
  },
  {
    id: "notas",
    texto: "Ver las notas y los exámenes",
    detalle: "La nota de cada materia, los intentos y la mejor nota de cada examen.",
    alcance: { direccion: "todos", equipo: "todos", iglesia: "iglesia", alumno: "propio" },
  },
  {
    id: "contacto",
    texto: "Ver la ficha con los datos de contacto",
    detalle: "Teléfono, correo, fecha de nacimiento y lo demás de la ficha de inscripción.",
    alcance: { direccion: "todos", equipo: "no", iglesia: "iglesia", alumno: "propio" },
  },
  {
    id: "exportar",
    texto: "Descargar los reportes",
    detalle: "Los alumnos, el avance en cada materia y el resumen por materia, en hojas de cálculo (CSV).",
    alcance: { direccion: "todos", equipo: "no", iglesia: "iglesia", alumno: "no" },
  },
  {
    id: "avisos",
    texto: "Recibir un aviso con cada inscripción",
    detalle: "En la campana de la web: quién se inscribió en la academia o en una materia.",
    alcance: { direccion: "todos", equipo: "no", iglesia: "iglesia", alumno: "no" },
  },
  {
    id: "revisar",
    texto: "Revisar respuestas escritas y cambiar notas",
    detalle: "Confirmar la nota del corrector o cambiarla, siempre con un motivo que queda registrado y que ve el alumno; responder los pedidos de revisión.",
    alcance: SOLO_ADMIN,
  },
  {
    id: "documentos",
    texto: "Corregir o revocar documentos",
    detalle: "Revocar un certificado o volver a darlo por válido, y corregir el nombre del alumno, siempre con un motivo.",
    alcance: SOLO_ADMIN,
  },
  {
    id: "contenido",
    texto: "Revisar el contenido y dejar observaciones",
    detalle: "Leer cada materia con sus lecciones y su banco de preguntas, ver el análisis de las preguntas y dejar observaciones.",
    alcance: SOLO_ADMIN,
  },
  {
    id: "aprobar",
    texto: "Aprobar las materias y la declaración de fe",
    detalle: "Dar por revisado y aprobado el contenido de una materia (o la declaración de fe) antes de abrirla, o quitar esa aprobación con un motivo.",
    alcance: SOLO_ADMIN,
  },
  {
    id: "banco",
    texto: "Retirar o volver a usar una pregunta del banco",
    detalle: "Según el análisis de preguntas: la retirada ya no sale en los intentos nuevos (las notas ya dadas no cambian).",
    alcance: SOLO_ADMIN,
  },
  {
    id: "mentores",
    texto: "Elegir el mentor de un alumno",
    detalle: "Elegir quién acompaña a cada alumno: el mentor ve su avance, sin notas ni datos de contacto, y nota cuando se detiene.",
    alcance: SOLO_ADMIN,
  },
  {
    id: "abrir",
    texto: "Abrir o cerrar la academia para todos",
    detalle: "Mientras está cerrada, solo la ven la Administración, los maestros, los líderes y las iglesias aliadas.",
    alcance: SOLO_ADMIN,
  },
];

/** Sobre quién tiene una capacidad un rol de la web. */
export function alcanceDe(role: string | null | undefined, capacidad: Capacidad): Alcance {
  const c = CAPACIDADES.find((x) => x.id === capacidad);
  if (!c) return "no";
  return c.alcance[rolAcademia(role)];
}

/** Si el rol solo puede ver (maestros, líderes e iglesias aliadas): no administra nada. */
export function soloVer(role: string | null | undefined): boolean {
  const r = rolAcademia(role);
  return r === "equipo" || r === "iglesia";
}

/** Cómo se muestra cada celda de la matriz en el panel. */
export function textoCelda(rol: RolAcademia, a: Alcance): string {
  if (a === "no") return "—";
  if (rol === "direccion") return "Sí";
  if (a === "iglesia") return "Solo los de su iglesia";
  if (a === "propio") return "Solo lo suyo";
  return "Sí, solo ver";
}
