// Lo que piden las pantallas de la academia al servidor (server/academia.ts y server/academia-examen.ts).
import { useQuery } from "@tanstack/react-query";
import type {
  AcademiaEstado, Apelable, ApelacionVista, CarneVista, DocumentoAcademia, ExamenEstado, LeccionVista, MateriaDetalle, MatriculaInfo, NivelEstado, PasoExamen,
  RespuestaRepaso, ResultadoExamen, VerificacionAcademia,
} from "@shared/academia";
import type { FichaInscripcion, FichaVista, InscripcionEstado } from "@shared/academia-inscripcion";
import type {
  ActividadItem, AlumnoDetalle, AlumnoFila, ApelacionItem, DireccionResumen, HistorialItem, ItemRevision, MateriaSeguimiento, ResultadoRevision, RevisionPanel,
} from "@shared/academia-direccion";
import type { ContenidoDetalle, ContenidoLista } from "@shared/academia-calidad";
import type { AsignacionesCurso, MiAsignacion, MisAcompanados } from "@shared/academia-escuela";
import type { DiagnosticoVista, RepasoVersiculos } from "@shared/academia";

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
  return useQuery<{ estado: ExamenEstado; ultimo: ResultadoExamen | null; apelacion: ApelacionVista | null; apelable: Apelable }, ErrorAcademia>({
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

/** Mi inscripción en la academia: la ficha, la matrícula, las iglesias aliadas y lo que ya se sabe de mi cuenta. */
export function useInscripcion() {
  return useQuery<InscripcionEstado, ErrorAcademia>({
    queryKey: ["academia", "inscripcion"],
    queryFn: () => pedir("GET", "/api/academia/inscripcion"),
    retry: false,
  });
}

export type ResultadoInscripcion = { ficha: FichaVista; matricula: MatriculaInfo; nueva: boolean };

/** Inscribirme (con el reglamento y el código de honor, la primera vez) o corregir mi ficha. */
export const inscribirme = (ficha: FichaInscripcion, aceptaciones?: { reglamento: boolean; honor: boolean }) =>
  pedir<ResultadoInscripcion>("POST", "/api/academia/inscripcion", { ficha, ...aceptaciones });

/** La foto de mi carné: la dirección de un archivo ya subido a la web, o null para quitarla. */
export const guardarFotoCarne = (url: string | null) => pedir<{ foto: string | null }>("POST", "/api/academia/foto", { url });

/** Inscribirme en una materia, desde su presentación. */
export const inscribirmeEnMateria = (materiaId: string) =>
  pedir<{ inscrita: string }>("POST", `/api/academia/materia/${encodeURIComponent(materiaId)}/inscripcion`, {});

export function useCarne() {
  return useQuery<CarneVista, ErrorAcademia>({ queryKey: ["academia", "carne"], queryFn: () => pedir("GET", "/api/academia/carne"), retry: false });
}

// ---------------------------------------------------------------- el panel de seguimiento y el expediente

export function useDireccionResumen() {
  return useQuery<DireccionResumen, ErrorAcademia>({ queryKey: ["academia", "direccion", "resumen"], queryFn: () => pedir("GET", "/api/academia/direccion/resumen"), retry: false });
}

export function useDireccionAlumnos(activo = true) {
  return useQuery<{ alumnos: AlumnoFila[]; puede: { exportar: boolean; contacto: boolean } }, ErrorAcademia>({
    queryKey: ["academia", "direccion", "alumnos"],
    queryFn: () => pedir("GET", "/api/academia/direccion/alumnos"),
    enabled: activo,
    retry: false,
  });
}

export function useDireccionActividad(activo = true) {
  return useQuery<{ actividad: ActividadItem[] }, ErrorAcademia>({
    queryKey: ["academia", "direccion", "actividad"],
    queryFn: () => pedir("GET", "/api/academia/direccion/actividad"),
    enabled: activo,
    retry: false,
  });
}

export function useDireccionAlumno(id: string | undefined) {
  return useQuery<AlumnoDetalle, ErrorAcademia>({
    queryKey: ["academia", "direccion", "alumno", id],
    queryFn: () => pedir("GET", `/api/academia/direccion/alumno/${encodeURIComponent(id!)}`),
    enabled: !!id,
    retry: false,
  });
}

export function useDireccionMateria(id: string | undefined) {
  return useQuery<MateriaSeguimiento, ErrorAcademia>({
    queryKey: ["academia", "direccion", "materia", id],
    queryFn: () => pedir("GET", `/api/academia/direccion/materia/${encodeURIComponent(id!)}`),
    enabled: !!id,
    retry: false,
  });
}

/** Mi expediente académico (kárdex). */
export function useExpediente() {
  return useQuery<AlumnoDetalle, ErrorAcademia>({ queryKey: ["academia", "expediente"], queryFn: () => pedir("GET", "/api/academia/expediente"), retry: false });
}

// ---------------------------------------------------------------- la revisión (fase A3)

export function useRevision(activo = true) {
  return useQuery<RevisionPanel, ErrorAcademia>({ queryKey: ["academia", "direccion", "revision"], queryFn: () => pedir("GET", "/api/academia/direccion/revision"), enabled: activo, retry: false });
}

export function useEscritasAlumno(id: string | undefined, activo = true) {
  return useQuery<{ escritas: ItemRevision[] }, ErrorAcademia>({
    queryKey: ["academia", "direccion", "escritas", id],
    queryFn: () => pedir("GET", `/api/academia/direccion/alumno/${encodeURIComponent(id!)}/escritas`),
    enabled: !!id && activo,
    retry: false,
  });
}

export function useHistorial(activo = true) {
  return useQuery<{ historial: HistorialItem[] }, ErrorAcademia>({ queryKey: ["academia", "direccion", "historial"], queryFn: () => pedir("GET", "/api/academia/direccion/historial"), enabled: activo, retry: false });
}

/** Confirmar la nota de una escrita, o cambiarla con su motivo (el servidor recalcula el examen, la materia y el nivel). */
export const revisarEscrita = (id: number, cuerpo: { accion: "confirmar" | "cambiar"; nota?: number; motivo: string }) =>
  pedir<ResultadoRevision>("POST", `/api/academia/direccion/revision/${id}`, cuerpo);
export const responderApelacion = (id: number, respuesta: string) => pedir<ApelacionItem>("POST", `/api/academia/direccion/apelacion/${id}`, { respuesta });
export const accionDocumento = (codigo: string, accion: "revocar" | "restaurar", motivo: string) =>
  pedir<{ codigo: string; revocado: boolean }>("POST", `/api/academia/direccion/documento/${encodeURIComponent(codigo)}/${accion}`, { motivo });
export const corregirNombre = (alumnoId: number, cuerpo: { nombres: string; apellidos: string; motivo: string }) =>
  pedir<{ nombre: string; documentos: number }>("POST", `/api/academia/direccion/alumno/${alumnoId}/nombre`, cuerpo);
export const cambiarApertura = (abierta: boolean) => pedir<{ abierta: boolean }>("POST", "/api/academia/direccion/apertura", { abierta });

// ---------------------------------------------------------------- la calidad del contenido (fase A3)

/** La revisión del contenido: cada materia con su aprobación, sus observaciones abiertas y las alertas del análisis. */
export function useContenido(activo = true) {
  return useQuery<ContenidoLista, ErrorAcademia>({ queryKey: ["academia", "direccion", "contenido"], queryFn: () => pedir("GET", "/api/academia/direccion/contenido"), enabled: activo, retry: false });
}

/** Una materia en la revisión del contenido: lecciones, observaciones, banco con sus respuestas y análisis de preguntas. */
export function useContenidoMateria(id: string | undefined) {
  return useQuery<ContenidoDetalle, ErrorAcademia>({
    queryKey: ["academia", "direccion", "contenido", id],
    queryFn: () => pedir("GET", `/api/academia/direccion/contenido/${encodeURIComponent(id!)}`),
    enabled: !!id,
    retry: false,
  });
}

const baseContenido = (materiaId: string) => `/api/academia/direccion/contenido/${encodeURIComponent(materiaId)}`;
export const observarContenido = (materiaId: string, texto: string, leccionId: string | null) =>
  pedir<{ id: number }>("POST", `${baseContenido(materiaId)}/observacion`, { texto, leccionId });
export const resolverObservacion = (id: number, respuesta: string) =>
  pedir<{ id: number }>("POST", `/api/academia/direccion/contenido/observacion/${id}/resolver`, { respuesta });
export const aprobarContenido = (materiaId: string, notas: string) => pedir<{ aprobada: boolean }>("POST", `${baseContenido(materiaId)}/aprobar`, { notas });
export const desaprobarContenido = (materiaId: string, motivo: string) => pedir<{ aprobada: boolean }>("POST", `${baseContenido(materiaId)}/desaprobar`, { motivo });
/** Retirar una pregunta del banco (ya no sale en los intentos nuevos) o volver a usarla. */
export const accionPregunta = (preguntaId: string, accion: "retirar" | "restaurar", motivo: string) =>
  pedir<{ retirada: boolean }>("POST", `/api/academia/direccion/pregunta/${encodeURIComponent(preguntaId)}/${accion}`, { motivo });

// ---------------------------------------------------------------- la Academia y la Escuela (fase A3)

/** Las asignaciones de la Academia a un curso de la Escuela (el aula): quien lo dirige ve a cada alumno. */
export function useAsignacionesCurso(cursoId: number | undefined, activo = true) {
  return useQuery<AsignacionesCurso, ErrorAcademia>({
    queryKey: ["academia", "asignaciones", "curso", cursoId],
    queryFn: () => pedir("GET", `/api/academia/curso/${cursoId}/asignaciones`),
    enabled: !!cursoId && activo,
    retry: false,
  });
}

/** Las asignaciones de todos mis cursos, con mi avance (la portada de la academia y la página de la materia). */
export function useMisAsignaciones(activo = true) {
  return useQuery<{ asignaciones: MiAsignacion[] }, ErrorAcademia>({
    queryKey: ["academia", "asignaciones", "mias"],
    queryFn: () => pedir("GET", "/api/academia/mis-asignaciones"),
    enabled: activo,
    retry: false,
  });
}

export type CuerpoAsignacion = { obligatoria: boolean; venceAt: string | null; indicaciones: string };
export const asignarMateria = (cursoId: number, cuerpo: CuerpoAsignacion & { materiaId: string }) =>
  pedir<{ id: number }>("POST", `/api/academia/curso/${cursoId}/asignaciones`, cuerpo);
export const cambiarAsignacion = (cursoId: number, id: number, cuerpo: CuerpoAsignacion) =>
  pedir<{ id: number }>("POST", `/api/academia/curso/${cursoId}/asignaciones/${id}`, cuerpo);
export const quitarAsignacion = (cursoId: number, id: number) => pedir<{ quitada: boolean }>("POST", `/api/academia/curso/${cursoId}/asignaciones/${id}/quitar`, {});

/** Las personas que acompaño como mentor (sin notas ni contacto). */
export function useAcompanados(activo = true) {
  return useQuery<MisAcompanados, ErrorAcademia>({ queryKey: ["academia", "acompanados"], queryFn: () => pedir("GET", "/api/academia/acompanados"), enabled: activo, retry: false });
}

export type PersonaBuscada = { id: number; nombre: string; usuario: string; rol: string; iglesia: string | null };
export const buscarPersonas = (q: string) => pedir<{ personas: PersonaBuscada[] }>("GET", `/api/academia/direccion/personas?q=${encodeURIComponent(q)}`);
export const elegirMentor = (alumnoId: number, mentorId: number | null) =>
  pedir<{ mentor: { userId: number; nombre: string } | null }>("POST", `/api/academia/direccion/alumno/${alumnoId}/mentor`, { mentorId });

// ---------------------------------------------------------------- suficiencia, diagnóstica, repaso y declaración (fase A4)

/** El examen de suficiencia de una materia y la prueba diagnóstica: las mismas rutas que el examen final. */
export const baseSuficiencia = (materiaId: string) => `/api/academia/suficiencia/${encodeURIComponent(materiaId)}`;
export const baseDiagnostico = "/api/academia/diagnostico/prueba";

/** Mi última prueba diagnóstica (con la sugerencia de hoy) y cuántas preguntas tiene. */
export function useDiagnostico(activo = true) {
  return useQuery<{ ultimo: DiagnosticoVista | null; preguntas: number }, ErrorAcademia>({
    queryKey: ["academia", "diagnostico"],
    queryFn: () => pedir("GET", "/api/academia/diagnostico"),
    enabled: activo,
    retry: false,
  });
}

/** Mis versículos aprendidos con su repaso espaciado. */
export function useRepasoVersiculos(activo = true) {
  return useQuery<RepasoVersiculos, ErrorAcademia>({ queryKey: ["academia", "repaso-versiculos"], queryFn: () => pedir("GET", "/api/academia/versiculos/repaso"), enabled: activo, retry: false });
}
export type VersiculoParaRepasar = { materiaId: string; materia: string; ref: string; fichas: { id: string; t: string }[]; caja: number; toca: boolean };
export const versiculoParaRepasar = (materiaId: string) => pedir<VersiculoParaRepasar>("GET", `/api/academia/versiculos/repaso/${encodeURIComponent(materiaId)}`);
export const responderRepasoVersiculo = (materiaId: string, orden: string[]) =>
  pedir<{ bien: boolean; hasta: number; total: number; caja: number; dominado: boolean; dias: number | null }>("POST", `/api/academia/versiculos/repaso/${encodeURIComponent(materiaId)}`, { orden });

/** Si la declaración de fe ya está aprobada (si no, se muestra como borrador). */
export function useDeclaracion() {
  return useQuery<{ aprobacion: { por: string; fecha: string } | null; cambio: boolean }, ErrorAcademia>({
    queryKey: ["academia", "declaracion"],
    queryFn: () => pedir("GET", "/api/academia/declaracion"),
    retry: false,
  });
}
export const aprobarDeclaracion = (notas: string) => pedir<{ aprobada: boolean }>("POST", "/api/academia/direccion/declaracion/aprobar", { notas });
export const desaprobarDeclaracion = (motivo: string) => pedir<{ aprobada: boolean }>("POST", "/api/academia/direccion/declaracion/desaprobar", { motivo });

/** Pedir la revisión del último intento de un examen (una vez por examen). */
export const pedirRevision = (base: string, mensaje: string) => pedir<{ apelacion: ApelacionVista }>("POST", `${base}/apelacion`, { mensaje });

export type ReporteCsv = "alumnos.csv" | "avance.csv" | "materias.csv";
export const enlaceReporte = (archivo: ReporteCsv) => `/api/academia/direccion/exportar/${archivo}`;

/** La verificación pública de un documento (sin cuenta). */
export const verificarDocumento = (codigo: string) => pedir<VerificacionAcademia>("GET", `/api/academia/verificar/${encodeURIComponent(codigo.trim())}`);

export const responderRepaso = (leccionId: string, preguntaId: string, opcion: number) =>
  pedir<RespuestaRepaso>("POST", "/api/academia/repaso", { leccionId, preguntaId, opcion });

/** Lo visto de corrido del video de la lección (para abrir el repaso). */
export const avanceVideo = (leccionId: string, segundos: number) =>
  pedir<{ visto: number; falta: number }>("POST", `/api/academia/leccion/${encodeURIComponent(leccionId)}/video`, { segundos });

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
