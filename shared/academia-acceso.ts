/**
 * Quién ve la Academia mientras está en vista previa (shared/academia.ts lo reexporta). Va aparte porque lo usa el menú,
 * que está en todas las páginas: aquí no se importa nada.
 */
export const ROLES_VISTA_PREVIA = [
  "admin", "director", "staff_global", "maestro_ministerio", "maestro_iglesia", "admin_iglesia", "obrero",
] as const;

export function veVistaPrevia(role: string | null | undefined): boolean {
  return !!role && (ROLES_VISTA_PREVIA as readonly string[]).includes(role);
}
