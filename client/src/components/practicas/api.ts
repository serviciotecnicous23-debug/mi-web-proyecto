// Lo que piden las pantallas del motor de prácticas al servidor (server/academia-practicas.ts).
import { useQuery } from "@tanstack/react-query";
import type {
  CaminoMateria, Devolucion, IntentoVista, JuegoVista, MedallaPractica, PracticaDelDiaResumen, PracticaLeccionVista, RespuestaPractica, ResultadoPractica,
} from "@shared/practicas";
import { pedir, type ErrorAcademia } from "@/components/academia/api";

export function usePracticaLeccion(leccionId: string | undefined) {
  return useQuery<PracticaLeccionVista, ErrorAcademia>({
    queryKey: ["practicas", "leccion", leccionId],
    queryFn: () => pedir("GET", `/api/academia/practicas/leccion/${encodeURIComponent(leccionId!)}`),
    enabled: !!leccionId,
    retry: false,
  });
}

export function useCamino(materiaId: string | undefined) {
  return useQuery<CaminoMateria, ErrorAcademia>({
    queryKey: ["practicas", "camino", materiaId],
    queryFn: () => pedir("GET", `/api/academia/practicas/materia/${encodeURIComponent(materiaId!)}`),
    enabled: !!materiaId,
    retry: false,
  });
}

export function useResumenDelDia(activo = true) {
  return useQuery<PracticaDelDiaResumen, ErrorAcademia>({
    queryKey: ["practicas", "dia", "resumen"],
    queryFn: () => pedir("GET", "/api/academia/practicas/dia/resumen"),
    enabled: activo,
    retry: false,
  });
}

export function useMedallas(activo = true) {
  return useQuery<{ medallas: MedallaPractica[]; posibles: number }, ErrorAcademia>({
    queryKey: ["practicas", "medallas"],
    queryFn: () => pedir("GET", "/api/academia/practicas/medallas"),
    enabled: activo,
    retry: false,
  });
}

export const empezarLeccion = (leccionId: string) =>
  pedir<IntentoVista>("POST", `/api/academia/practicas/leccion/${encodeURIComponent(leccionId)}/empezar`, { modo: "cuenta" });
export const empezarReto = (leccionId: string) =>
  pedir<IntentoVista>("POST", `/api/academia/practicas/leccion/${encodeURIComponent(leccionId)}/reto`, {});
export const empezarMision = (materiaId: string) => pedir<IntentoVista>("POST", `/api/academia/practicas/materia/${encodeURIComponent(materiaId)}/mision`, {});
export const practicaDelDia = () => pedir<IntentoVista | { vacio: true; resumen: PracticaDelDiaResumen }>("GET", "/api/academia/practicas/dia");
export const responder = (intento: number, n: number, respuesta: RespuestaPractica) =>
  pedir<Devolucion>("POST", `/api/academia/practicas/intento/${intento}/responder`, { n, respuesta });
export const pedirPista = (intento: number, n: number) => pedir<{ apoyo: string }>("POST", `/api/academia/practicas/intento/${intento}/pista`, { n });
export const terminarIntento = (intento: number) => pedir<ResultadoPractica>("POST", `/api/academia/practicas/intento/${intento}/terminar`, {});
export const cargarJuego = (materia?: string | null) => pedir<JuegoVista>("GET", `/api/academia/practicas/juego${materia ? `?materia=${encodeURIComponent(materia)}` : ""}`);
export const guardarMarca = (juego: "carrera" | "racha", puntos: number, materia?: string | null) =>
  pedir<{ mejor: number; nueva: boolean }>("POST", "/api/academia/practicas/juego/marca", { juego, puntos, materia: materia ?? null });
