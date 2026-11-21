// El inicio del panel de la academia (docs/academia-panel.md): primero «Lo que te toca» (lo que espera tu aprobación o tu
// revisión, cada cosa con un toque que lleva a resolverla; la declaración de fe se aprueba ahí mismo), después las cifras
// que se pueden tocar, quiénes necesitan ayuda, las últimas 12 semanas, la actividad reciente y, plegados, los datos por
// estatus, país e iglesia. Pensado primero para el teléfono.
import { useState } from "react";
import { Link } from "wouter";
import { AlertCircle, AlertTriangle, BookCheck, CheckCircle2, ChevronRight, ClipboardCheck, FileWarning, Inbox, MessageSquareWarning, PenLine, ScrollText } from "lucide-react";
import { NOMBRE_ESTATUS, type EstatusAlumno } from "@shared/academia-base";
import type { DireccionResumen } from "@shared/academia-direccion";
import { useContenido } from "@/components/academia/api";
import { Barras, Indicador, ListaActividad, numero } from "@/components/academia/seguimiento";
import { BarrasSemanas } from "@/components/academia/perfil-graficos";
import { AprobarDeclaracion } from "@/components/academia/panel-aprobar";
import type { VerMaterias } from "@/components/academia/panel-materias";

/** Cómo se nombra cada tipo de actividad que espera (`defensa`: el proyecto con la defensa ya programada). */
export const PENDIENTE_ACTIVIDAD: Record<string, { uno: string; varios: string }> = {
  evangelismo: { uno: "conversación de evangelismo por confirmar", varios: "conversaciones de evangelismo por confirmar" },
  servicio: { uno: "servicio por confirmar", varios: "servicios por confirmar" },
  practica: { uno: "registro de horas de práctica por confirmar", varios: "registros de horas de práctica por confirmar" },
  ensenanza: { uno: "enseñanza grabada por confirmar", varios: "enseñanzas grabadas por confirmar" },
  consolidacion: { uno: "consolidación de un nuevo creyente por confirmar", varios: "consolidaciones por confirmar" },
  sermon: { uno: "sermón por evaluar", varios: "sermones por evaluar" },
  proyecto: { uno: "proyecto final: programar su defensa", varios: "proyectos finales: programar su defensa" },
  defensa: { uno: "defensa del proyecto por evaluar", varios: "defensas del proyecto por evaluar" },
};

export type IrA = (destino: string, opciones?: { alumnos?: Record<string, unknown>; materias?: VerMaterias; ancla?: string }) => void;
type Tarea = { clave: string; icono: typeof Inbox; titulo: string; detalle: string; accion: () => void };

/** Lo que espera a la Administración: cada cosa es un botón grande que lleva a resolverla. */
export function LoQueTeToca({ d, irA }: { d: DireccionResumen; irA: IrA }) {
  const contenido = useContenido(d.puede.contenido);
  const [declaracion, setDeclaracion] = useState(false);
  if (!d.puede.revisar && !d.puede.contenido) return null;
  const p = d.pendientes;
  const c = contenido.data;
  const tareas: Tarea[] = [];
  if (c && !c.declaracion.aprobacion?.vigente) {
    tareas.push({
      clave: "declaracion",
      icono: ScrollText,
      titulo: c.declaracion.aprobacion ? "Aprobar otra vez la declaración de fe" : "Aprobar la declaración de fe",
      detalle: c.declaracion.aprobacion ? "Su texto cambió después de tu aprobación. Tócala para revisarla y aprobarla aquí mismo." : "Los alumnos la ven como borrador. Tócala para revisarla y aprobarla aquí mismo.",
      accion: () => setDeclaracion(true),
    });
  }
  if (c && c.total - c.aprobadas > 0) {
    const faltan = c.total - c.aprobadas;
    tareas.push({ clave: "materias", icono: BookCheck, titulo: `Aprobar ${numero(faltan)} ${faltan === 1 ? "materia" : "materias"}`, detalle: `Revisión doctrinal: ${numero(c.aprobadas)} de ${numero(c.total)} aprobadas. Puedes aprobar una por una o varias a la vez.`, accion: () => irA("materias", { materias: "aprobar" }) });
  }
  if (d.puede.revisar) {
    if (p.escritas > 0) tareas.push({ clave: "escritas", icono: PenLine, titulo: `Revisar ${numero(p.escritas)} ${p.escritas === 1 ? "respuesta escrita" : "respuestas escritas"}`, detalle: "El corrector las marcó para que las mires.", accion: () => irA("pendientes", { ancla: "pendientes-escritas" }) });
    if (p.apelaciones > 0) tareas.push({ clave: "apelaciones", icono: MessageSquareWarning, titulo: `Responder ${numero(p.apelaciones)} ${p.apelaciones === 1 ? "pedido de revisión" : "pedidos de revisión"}`, detalle: "Alumnos que pidieron revisar un examen.", accion: () => irA("pendientes", { ancla: "pendientes-apelaciones" }) });
    for (const x of p.porTipo ?? []) {
      const n = PENDIENTE_ACTIVIDAD[x.tipo];
      tareas.push({ clave: `act-${x.tipo}`, icono: ClipboardCheck, titulo: `${numero(x.n)} ${n ? (x.n === 1 ? n.uno : n.varios) : "actividades por confirmar"}`, detalle: "Lo que piden los niveles además de sus materias.", accion: () => irA("pendientes", { ancla: "actividades-por-confirmar" }) });
    }
  }
  if (c && c.abiertas > 0) tareas.push({ clave: "observaciones", icono: FileWarning, titulo: `${numero(c.abiertas)} ${c.abiertas === 1 ? "observación abierta" : "observaciones abiertas"} en el contenido`, detalle: "No dejan aprobar su materia hasta resolverlas.", accion: () => irA("materias", { materias: "aprobar" }) });
  const cargando = d.puede.contenido && contenido.isLoading;
  return (
    <section className="space-y-2" data-testid="lo-que-te-toca" data-tareas={tareas.length}>
      <h2 className="font-display text-xl font-bold flex items-center gap-2">
        {tareas.length ? <Inbox className="w-5 h-5 text-orange-600" aria-hidden="true" /> : <CheckCircle2 className="w-5 h-5 text-emerald-600" aria-hidden="true" />}
        {tareas.length ? "Lo que te toca" : cargando ? "Revisando lo pendiente…" : "Todo al día"}
      </h2>
      {!tareas.length && !cargando && <p className="text-sm text-muted-foreground">No hay nada esperando tu aprobación ni tu revisión.</p>}
      <ul className="space-y-2">
        {tareas.map((t) => {
          const Icono = t.icono;
          return (
            <li key={t.clave}>
              <button type="button" onClick={t.accion} className="w-full glass-card border border-orange-500/40 p-4 flex items-center gap-3 text-left min-h-[72px] hover:border-orange-500 transition focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-orange-500" data-testid={`tarea-${t.clave}`}>
                <span className="rounded-full bg-orange-500/15 p-2.5 shrink-0"><Icono className="w-5 h-5 text-orange-600" aria-hidden="true" /></span>
                <span className="flex-1 min-w-0">
                  <span className="block font-semibold leading-snug">{t.titulo}</span>
                  <span className="block text-sm text-muted-foreground mt-0.5">{t.detalle}</span>
                </span>
                <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" aria-hidden="true" />
              </button>
            </li>
          );
        })}
      </ul>
      {c && <AprobarDeclaracion abierto={declaracion} alCerrar={() => setDeclaracion(false)} cambio={!!c.declaracion.aprobacion} />}
    </section>
  );
}

/** Las cuatro cifras: se tocan para ver su lista. */
export function Cifras({ d, irA }: { d: DireccionResumen; irA: IrA }) {
  const t = d.totales;
  return (
    <div className="grid gap-3 grid-cols-2 lg:grid-cols-4" data-testid="direccion-indicadores">
      <Indicador etiqueta="Alumnos" valor={t.inscritos} nota={`${numero(t.nuevosSemana)} nuevos esta semana`} alPulsar={() => irA("alumnos", { alumnos: { orden: "recientes" } })} ayuda="Ver la lista de los alumnos" testId="indicador-inscritos" />
      <Indicador etiqueta="Activos" valor={d.estatus.activo} nota={`${numero(d.estatus.pausa)} en pausa · ${numero(d.estatus.aspirante)} sin empezar`} alPulsar={() => irA("alumnos", { alumnos: { estatus: "activo" } })} ayuda="Ver solo a los alumnos activos" testId="indicador-activos" />
      <Indicador etiqueta="Necesitan ayuda" valor={d.ayudaTotal ?? d.ayuda.length} nota={d.ayuda.length ? "con alertas para mirar" : "nadie, por ahora"} alPulsar={() => irA("alumnos", { alumnos: { conAlertas: true } })} ayuda="Ver a los alumnos con alertas" testId="indicador-ayuda" />
      <Indicador etiqueta="Materias aprobadas" valor={t.aprobadas} nota={t.promedio != null ? `promedio ${t.promedio} · ${numero(t.lecciones)} lecciones` : `${numero(t.lecciones)} lecciones completadas`} alPulsar={() => irA("materias", { materias: "alumnos" })} ayuda="Ver las materias con sus alumnos" testId="indicador-aprobadas" />
    </div>
  );
}

/** Quiénes necesitan ayuda: los primeros cinco, con sus alertas, y el enlace a todos. */
export function NecesitanAyuda({ d, irA, enlaceAlumno }: { d: DireccionResumen; irA: IrA; enlaceAlumno: (id: number) => string }) {
  if (!d.ayuda.length) return null;
  return (
    <section className="space-y-2" data-testid="direccion-ayuda">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display text-xl font-bold">Necesitan ayuda ({numero(d.ayudaTotal ?? d.ayuda.length)})</h2>
        {d.ayuda.length > 5 && <button type="button" className="text-sm font-medium underline" onClick={() => irA("alumnos", { alumnos: { conAlertas: true } })}>Ver todos</button>}
      </div>
      <ul className="space-y-2">
        {d.ayuda.slice(0, 5).map((a) => (
          <li key={a.userId}>
            <Link href={enlaceAlumno(a.userId)} className="block glass-card p-4 hover:border-orange-500/50 border border-transparent transition">
              <span className="flex items-baseline justify-between gap-3">
                <span className="font-semibold">{a.nombre}</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0 self-center" aria-hidden="true" />
              </span>
              <span className="block text-xs text-muted-foreground">{[a.matricula, a.iglesia].filter(Boolean).join(" · ")}</span>
              <span className="mt-1.5 block space-y-0.5">
                {a.alertas.map((x) => (
                  <span key={x.clave} className="flex items-start gap-1.5 text-sm">
                    {x.gravedad === "alta" ? <AlertTriangle className="w-4 h-4 mt-0.5 text-red-600 shrink-0" aria-hidden="true" /> : <AlertCircle className="w-4 h-4 mt-0.5 text-orange-600 shrink-0" aria-hidden="true" />}
                    <span><span className="sr-only">{x.gravedad === "alta" ? "Atender pronto: " : "Para mirar: "}</span>{x.titulo}</span>
                  </span>
                ))}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Las últimas 12 semanas: cuatro gráficos pequeños. */
export function Tendencias({ d }: { d: DireccionResumen }) {
  return (
    <section className="space-y-2" data-testid="direccion-tendencias">
      <h2 className="font-display text-xl font-bold">Las últimas 12 semanas</h2>
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        <BarrasSemanas titulo="Lecciones completadas" semanas={d.tendencias} valor={(s) => s.lecciones} unidad={(n) => `${numero(n)} ${n === 1 ? "lección" : "lecciones"}`} compacto />
        <BarrasSemanas titulo="Minutos de estudio" semanas={d.tendencias} valor={(s) => s.minutos} unidad={(n) => `${numero(n)} min`} compacto />
        <BarrasSemanas titulo="Inscripciones" semanas={d.tendencias} valor={(s) => s.inscripciones} unidad={(n) => `${numero(n)} ${n === 1 ? "inscripción" : "inscripciones"}`} compacto />
        <BarrasSemanas titulo="Materias aprobadas" semanas={d.tendencias} valor={(s) => s.aprobadas} unidad={(n) => `${numero(n)} ${n === 1 ? "materia" : "materias"}`} compacto />
      </div>
    </section>
  );
}

const ORDEN_ESTATUS: EstatusAlumno[] = ["aspirante", "activo", "pausa", "egresado", "graduado", "retirado"];
/** Los primeros 7 y el resto como «Otros». */
function conOtros(filas: { nombre: string; n: number }[], tope = 7) {
  if (filas.length <= tope + 1) return filas;
  return [...filas.slice(0, tope), { nombre: "Otros", n: filas.slice(tope).reduce((a, f) => a + f.n, 0) }];
}

/** La actividad reciente y, plegados, los alumnos por estatus, país e iglesia. */
export function ActividadYDatos({ d, irA, enlaceAlumno }: { d: DireccionResumen; irA: IrA; enlaceAlumno: (id: number) => string }) {
  const estatusPorNombre = (nombre: string) => ORDEN_ESTATUS.find((k) => NOMBRE_ESTATUS[k] === nombre);
  return (
    <>
      <section className="glass-card p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3 mb-3">
          <h2 className="font-semibold">Actividad reciente</h2>
          <button type="button" className="text-sm font-medium underline" onClick={() => irA("historial")}>Ver el historial</button>
        </div>
        <ListaActividad items={d.actividad.slice(0, 6)} enlaceAlumno={enlaceAlumno} />
      </section>
      <details className="glass-card p-4 sm:p-5 group" data-testid="mas-datos">
        <summary className="font-semibold cursor-pointer list-none flex items-center justify-between gap-2">
          Más datos: los alumnos por estatus, país e iglesia
          <ChevronRight className="w-4 h-4 transition-transform group-open:rotate-90" aria-hidden="true" />
        </summary>
        <div className="grid gap-4 lg:grid-cols-3 mt-4">
          <Barras titulo="Por estatus" filas={ORDEN_ESTATUS.map((k) => ({ nombre: NOMBRE_ESTATUS[k], n: d.estatus[k] }))} testId="barras-estatus" alElegir={(n) => irA("alumnos", { alumnos: { estatus: estatusPorNombre(n) ?? "" } })} />
          <Barras titulo="Por país" filas={conOtros(d.paises)} vacio="Todavía no hay alumnos." alElegir={(n) => irA("alumnos", { alumnos: { pais: n } })} testId="barras-paises" />
          <Barras titulo="Por iglesia" filas={conOtros(d.iglesias)} vacio="Todavía no hay alumnos." alElegir={(n) => irA("alumnos", { alumnos: { iglesia: n } })} testId="barras-iglesias" />
        </div>
      </details>
    </>
  );
}
