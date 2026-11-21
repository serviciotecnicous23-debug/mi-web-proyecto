// Lo que piden al servidor las pantallas del laboratorio ministerial (server/academia-laboratorio.ts).
import { useQuery } from "@tanstack/react-query";
import type { InformeLaboratorio, IntentoVista, LaboratorioMateria, PracticaDetalle, PracticasPendientes, RespuestaPaso } from "@shared/laboratorio";
import { pedir, type ErrorAcademia } from "./api";

export function useLaboratorioMateria(materiaId: string | undefined) {
  return useQuery<LaboratorioMateria, ErrorAcademia>({
    queryKey: ["academia", "laboratorio", "materia", materiaId],
    queryFn: () => pedir("GET", `/api/academia/laboratorio/materia/${encodeURIComponent(materiaId!)}`),
    enabled: !!materiaId,
    retry: false,
  });
}

export function usePractica(practicaId: string | undefined) {
  return useQuery<PracticaDetalle, ErrorAcademia>({
    queryKey: ["academia", "laboratorio", "practica", practicaId],
    queryFn: () => pedir("GET", `/api/academia/laboratorio/practica/${encodeURIComponent(practicaId!)}`),
    enabled: !!practicaId,
    retry: false,
  });
}

export const empezarPractica = (practicaId: string) =>
  pedir<IntentoVista>("POST", `/api/academia/laboratorio/practica/${encodeURIComponent(practicaId)}/empezar`, {});

export const responderPaso = (intentoId: number, cuerpo: { paso: number; k?: number; orden?: number[] }) =>
  pedir<RespuestaPaso>("POST", `/api/academia/laboratorio/intento/${intentoId}/responder`, cuerpo);

export const guardarCierre = (intentoId: number, cuerpo: { sentir: string | null; llevo: string }) =>
  pedir<IntentoVista>("POST", `/api/academia/laboratorio/intento/${intentoId}/cierre`, cuerpo);

/** «la lección 2» o «las lecciones 2, 5 y 6». */
export function textoLecciones(ns: number[]): string {
  if (ns.length === 1) return `la lección ${ns[0]}`;
  return `las lecciones ${ns.slice(0, -1).join(", ")} y ${ns[ns.length - 1]}`;
}

/** Las prácticas que el alumno ya puede hacer y todavía no terminó (para «Lo de hoy» y el salón). */
export function usePracticasPendientes(activo: boolean) {
  return useQuery<PracticasPendientes, ErrorAcademia>({
    queryKey: ["academia", "laboratorio", "pendientes"],
    queryFn: () => pedir("GET", "/api/academia/laboratorio/pendientes"),
    enabled: activo,
    retry: false,
  });
}

/** El informe del laboratorio en el panel de la academia (solo la Administración). */
export function useInformeLaboratorio(activo: boolean) {
  return useQuery<InformeLaboratorio, ErrorAcademia>({
    queryKey: ["academia", "direccion", "laboratorio"],
    queryFn: () => pedir("GET", "/api/academia/direccion/laboratorio"),
    enabled: activo,
    retry: false,
  });
}
