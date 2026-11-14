// Lo que piden las pantallas de la academia al servidor (server/academia.ts y server/academia-examen.ts).
import { useQuery } from "@tanstack/react-query";
import type {
  AcademiaEstado, DocumentoAcademia, ExamenEstado, LeccionVista, MateriaDetalle, NivelEstado, PasoExamen, RespuestaRepaso, ResultadoExamen,
  VerificacionAcademia,
} from "@shared/academia";

export class ErrorAcademia extends Error {
  status: number;
  datos: any;
  constructor(mensaje: string, status: number, datos: any) {
    super(mensaje);
    this.status = status;
    this.datos = datos;
  }
}

export async function pedir<T>(metodo: "GET" | "POST", url: string, cuerpo?: unknown): Promise<T> {
  const res = await fetch(url, {
    method: metodo,
    headers: cuerpo !== undefined ? { "Content-Type": "application/json" } : {},
    body: cuerpo !== undefined ? JSON.stringify(cuerpo) : undefined,
    credentials: "include",
  });
  let datos: any = null;
  try {
    datos = await res.json();
  } catch {
    datos = null;
  }
  if (!res.ok) throw new ErrorAcademia(datos?.message || "No se pudo completar. Inténtalo otra vez.", res.status, datos);
  return datos as T;
}

export function useAcademiaEstado() {
  return useQuery<AcademiaEstado, ErrorAcademia>({ queryKey: ["academia", "estado"], queryFn: () => pedir("GET", "/api/academia/estado"), retry: false });
}

export function useMateria(id: string | undefined) {
  return useQuery<MateriaDetalle, ErrorAcademia>({
    queryKey: ["academia", "materia", id],
    queryFn: () => pedir("GET", `/api/academia/materia/${encodeURIComponent(id!)}`),
    enabled: !!id,
    retry: false,
  });
}

export function useLeccion(id: string | undefined) {
  return useQuery<LeccionVista, ErrorAcademia>({
    queryKey: ["academia", "leccion", id],
    queryFn: () => pedir("GET", `/api/academia/leccion/${encodeURIComponent(id!)}`),
    enabled: !!id,
    retry: false,
  });
}

/** La ruta de un examen en el servidor: el final de una materia o el integral de un nivel (el mismo motor). */
export const baseExamen = (materiaId: string) => `/api/academia/examen/${encodeURIComponent(materiaId)}`;
export const baseIntegral = (nivel: number | string) => `/api/academia/integral/${encodeURIComponent(String(nivel))}`;

export function useExamen(base: string | undefined) {
  return useQuery<{ estado: ExamenEstado; ultimo: ResultadoExamen | null }, ErrorAcademia>({
    queryKey: ["academia", "examen", base],
    queryFn: () => pedir("GET", base!),
    enabled: !!base,
    retry: false,
  });
}

export function useNivel(n: string | undefined) {
  return useQuery<NivelEstado, ErrorAcademia>({
    queryKey: ["academia", "nivel", n],
    queryFn: () => pedir("GET", `/api/academia/nivel/${encodeURIComponent(n!)}`),
    enabled: !!n,
    retry: false,
  });
}

export const aceptarPacto = (n: number) => pedir<NivelEstado>("POST", `/api/academia/nivel/${n}/pacto`, { acepto: true });

/** Mis documentos de la academia (con `activo: false` no se piden: por ejemplo, sin sesión). */
export function useCertificados(activo = true) {
  return useQuery<DocumentoAcademia[], ErrorAcademia>({
    queryKey: ["academia", "certificados"],
    queryFn: () => pedir("GET", "/api/academia/certificados"),
    enabled: activo,
    retry: false,
  });
}

export function useCertificado(codigo: string | undefined) {
  return useQuery<DocumentoAcademia, ErrorAcademia>({
    queryKey: ["academia", "certificado", codigo],
    queryFn: () => pedir("GET", `/api/academia/certificado/${encodeURIComponent(codigo!)}`),
    enabled: !!codigo,
    retry: false,
  });
}

/** La verificación pública de un documento (sin cuenta). */
export const verificarDocumento = (codigo: string) => pedir<VerificacionAcademia>("GET", `/api/academia/verificar/${encodeURIComponent(codigo.trim())}`);

export const responderRepaso = (leccionId: string, preguntaId: string, opcion: number) =>
  pedir<RespuestaRepaso>("POST", "/api/academia/repaso", { leccionId, preguntaId, opcion });

export const completarLeccion = (leccionId: string, reflexion: string) =>
  pedir<{ completada: boolean; siguiente: string | null }>("POST", `/api/academia/leccion/${encodeURIComponent(leccionId)}/completar`, { reflexion });

export const guardarReflexion = (leccionId: string, texto: string) =>
  pedir<{ guardada: boolean }>("POST", `/api/academia/leccion/${encodeURIComponent(leccionId)}/reflexion`, { texto });

export type VersiculoEstudio = { ref: string; texto: string; enlace: string | null; aprendido: boolean; puntaje: number | null; intentos: number };
export type VersiculoPractica = { ref: string; fichas: { id: string; t: string }[]; aprendido: boolean; puntaje: number | null; intentos: number };

export const versiculoEstudio = (materiaId: string) => pedir<VersiculoEstudio>("GET", `/api/academia/versiculo/${encodeURIComponent(materiaId)}`);
export const versiculoPractica = (materiaId: string) => pedir<VersiculoPractica>("GET", `/api/academia/versiculo/${encodeURIComponent(materiaId)}?practica=1`);
export const responderVersiculo = (materiaId: string, orden: string[]) =>
  pedir<{ bien: boolean; hasta: number; total: number; puntaje: number | null }>("POST", `/api/academia/versiculo/${encodeURIComponent(materiaId)}`, { orden });

export const empezarExamen = (base: string) => pedir<PasoExamen>("POST", `${base}/empezar`, { compromiso: true });
export const pasoExamen = (base: string) => pedir<PasoExamen>("POST", `${base}/paso`, {});
export const responderExamen = (base: string, opcion: number) => pedir<PasoExamen>("POST", `${base}/respuesta`, { opcion });
export const entregarEscrita = (base: string, texto: string, pegado: boolean) => pedir<PasoExamen>("POST", `${base}/escrita`, { texto, pegado });

/** «45 minutos», «2 horas»: para las esperas. */
export function tiempoTexto(seg: number): string {
  if (seg <= 90) return `${Math.max(1, Math.round(seg))} segundos`;
  const min = Math.ceil(seg / 60);
  if (min < 90) return `${min} minutos`;
  const h = Math.round(min / 60);
  return h === 1 ? "1 hora" : `${h} horas`;
}
