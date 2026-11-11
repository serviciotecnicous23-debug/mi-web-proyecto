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
