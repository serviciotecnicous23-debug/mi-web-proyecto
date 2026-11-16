/**
 * Los roles de las cuentas. Viven aparte del esquema de la base de datos (shared/schema.ts, que los reexporta) para
 * que el menú de la web, que va en todas las páginas, no cargue drizzle ni zod.
 */
export const ROLES = {
  director: "Director del Ministerio",
  staff_global: "Staff Global",
  admin_iglesia: "Administrador de Iglesia Aliada",
  maestro_ministerio: "Maestro del Ministerio",
  maestro_iglesia: "Maestro de Iglesia Aliada",
  miembro: "Miembro",
  usuario: "Usuario",
  // Alias de retrocompatibilidad
  admin: "Administrador",
  obrero: "Maestro",
} as const;

export type RolId = keyof typeof ROLES;

/** Los roles que administran la web (el panel de administración, los reportes y las finanzas). */
export const ROLES_ADMIN_WEB: readonly RolId[] = ["admin", "director", "staff_global"];

/**
 * Los roles agrupados para elegirlos en el panel de administración, con lo que puede hacer cada uno. La academia la
 * administra solo el rol «Administrador» (shared/academia-permisos.ts): los demás la ven, sin cambiar nada.
 */
export const GRUPOS_DE_ROLES: readonly { nombre: string; roles: readonly { id: RolId; detalle: string }[] }[] = [
  {
    nombre: "Administración",
    roles: [
      { id: "admin", detalle: "Todo: el panel de administración de la web y la administración de la academia (notas, contenido, documentos, mentores y apertura)." },
      { id: "director", detalle: "El panel de administración de la web, los reportes y las finanzas. En la academia ve el avance y las notas, sin cambiar nada." },
      { id: "staff_global", detalle: "Lo mismo que el Director: administra la web y en la academia solo ve." },
    ],
  },
  {
    nombre: "Enseñanza",
    roles: [
      { id: "maestro_ministerio", detalle: "El panel de maestro: sus cursos, las clases en vivo y los sermones. En la academia ve a los alumnos, sin cambiar nada." },
      { id: "obrero", detalle: "Como el Maestro del Ministerio (es el nombre antiguo del rol)." },
    ],
  },
  {
    nombre: "Iglesias aliadas",
    roles: [
      { id: "admin_iglesia", detalle: "Su iglesia aliada (Mi iglesia) y el panel de maestro. En la academia ve solo a los alumnos de su iglesia. No administra la web." },
      { id: "maestro_iglesia", detalle: "El panel de maestro de su iglesia. En la academia ve solo a los alumnos de su iglesia." },
    ],
  },
  {
    nombre: "Comunidad",
    roles: [
      { id: "miembro", detalle: "Miembro de la comunidad: estudia en la academia y participa en la web." },
      { id: "usuario", detalle: "Cuenta registrada: estudia en la academia y participa en la web." },
    ],
  },
];

/** Lo que puede hacer un rol, para mostrarlo junto al selector. */
export function detalleDeRol(role: string | null | undefined): string {
  for (const g of GRUPOS_DE_ROLES) for (const r of g.roles) if (r.id === role) return r.detalle;
  return "";
}
