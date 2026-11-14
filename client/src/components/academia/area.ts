// Las dos áreas de la academia (shared/academia-permisos.ts): la academia, donde se estudia, y su seguimiento o
// administración, que se abre desde el panel de cada rol de la web:
// - la Administración, desde el panel de administración (/admin/academia): la maneja;
// - los maestros, desde el panel del maestro (/maestro/academia): solo ven;
// - las iglesias aliadas, desde «Mi iglesia» (/mi-iglesia/academia): solo ven a los alumnos de su iglesia.
// Liviano: no importa el catálogo.
import { useLocation } from "wouter";

export type AreaAcademia = {
  /** La ruta base del panel: /admin/academia, /maestro/academia o /mi-iglesia/academia. */
  base: string;
  /** Adónde se vuelve: el panel de ese rol. */
  volver: { href: string; texto: string };
};

const AREAS: { prefijo: string; area: AreaAcademia }[] = [
  { prefijo: "/maestro/academia", area: { base: "/maestro/academia", volver: { href: "/maestro", texto: "Panel del maestro" } } },
  { prefijo: "/mi-iglesia/academia", area: { base: "/mi-iglesia/academia", volver: { href: "/mi-iglesia", texto: "Mi iglesia" } } },
];
const ADMIN: AreaAcademia = { base: "/admin/academia", volver: { href: "/admin", texto: "Panel de administración" } };

export function areaDe(ruta: string): AreaAcademia {
  return AREAS.find((a) => ruta.startsWith(a.prefijo))?.area ?? ADMIN;
}

/** El área de la página actual (por su ruta). */
export function useArea(): AreaAcademia {
  const [ruta] = useLocation();
  return areaDe(ruta);
}

/** El panel desde el que entra cada rol de la web (para los enlaces viejos de /academia/direccion). */
export function baseDelRol(role?: string | null): string {
  if (role === "admin" || role === "director" || role === "staff_global") return "/admin/academia";
  if (role === "admin_iglesia" || role === "maestro_iglesia") return "/mi-iglesia/academia";
  return "/maestro/academia";
}
