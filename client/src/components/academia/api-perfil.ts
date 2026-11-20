// Lo que pide el perfil completo del alumno en el panel (server/academia-perfil.ts): el perfil y la bitácora de seguimiento.
import { useQuery } from "@tanstack/react-query";
import type { PerfilAlumno, TipoSeguimiento } from "@shared/academia-perfil";
import { ErrorAcademia, pedir } from "@/components/academia/api";

/** `activo`: se pide después de la ficha del alumno (así no van las dos consultas juntas). */
export function usePerfilAlumno(id: string | undefined, activo = true) {
  return useQuery<PerfilAlumno, ErrorAcademia>({
    queryKey: ["academia", "direccion", "perfil", id],
    queryFn: () => pedir("GET", `/api/academia/direccion/alumno/${encodeURIComponent(id!)}/perfil`),
    enabled: !!id && activo,
    retry: false,
  });
}

export function anotarSeguimiento(alumnoId: number, cuerpo: { tipo: TipoSeguimiento; texto: string }) {
  return pedir<{ id: number }>("POST", `/api/academia/direccion/alumno/${alumnoId}/seguimiento`, cuerpo);
}

export function borrarSeguimiento(notaId: number) {
  return pedir<{ ok: boolean }>("POST", `/api/academia/direccion/seguimiento/${notaId}/borrar`);
}
