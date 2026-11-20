// La bandeja de pendientes del panel de la academia: todo lo que espera a la Administración en un solo lugar, cada cosa
// con su cifra y un botón que lleva a donde se resuelve (las respuestas escritas, los pedidos de revisión, las
// actividades de los niveles por tipo, las materias por aprobar en la revisión doctrinal, las observaciones abiertas y
// la declaración de fe). Solo la ve quien puede revisar o aprobar (shared/academia-permisos.ts).
import { Link } from "wouter";
import { BookCheck, CheckCircle2, ClipboardCheck, FileWarning, Inbox, MessageSquareWarning, PenLine, ScrollText, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DireccionResumen } from "@shared/academia-direccion";
import { useContenido } from "@/components/academia/api";
import { numero } from "@/components/academia/seguimiento";

/** Cómo se nombra cada tipo de actividad que espera (`defensa`: el proyecto con la defensa ya programada). */
export const PENDIENTE_ACTIVIDAD: Record<string, { uno: string; varios: string; accion: string }> = {
  evangelismo: { uno: "conversación de evangelismo por confirmar", varios: "conversaciones de evangelismo por confirmar", accion: "Confirmar" },
  servicio: { uno: "servicio por confirmar", varios: "servicios por confirmar", accion: "Confirmar" },
  practica: { uno: "registro de horas de práctica por confirmar", varios: "registros de horas de práctica por confirmar", accion: "Confirmar" },
  ensenanza: { uno: "enseñanza grabada por confirmar", varios: "enseñanzas grabadas por confirmar", accion: "Confirmar" },
  consolidacion: { uno: "consolidación de un nuevo creyente por confirmar", varios: "consolidaciones de nuevos creyentes por confirmar", accion: "Confirmar" },
  sermon: { uno: "sermón por evaluar con la rúbrica", varios: "sermones por evaluar con la rúbrica", accion: "Evaluar" },
  proyecto: { uno: "proyecto final que espera que le programen la defensa", varios: "proyectos finales que esperan que les programen la defensa", accion: "Programar" },
  defensa: { uno: "defensa del proyecto programada, por evaluar después de su fecha", varios: "defensas del proyecto programadas, por evaluar después de su fecha", accion: "Ver" },
};

type Fila = { clave: string; icono: typeof Inbox; texto: string; boton: string; ir: () => void; testId: string };

function irA(tab: string, ancla: string | undefined, cambiar: (tab: string) => void) {
  cambiar(tab);
  if (ancla) window.setTimeout(() => document.getElementById(ancla)?.scrollIntoView({ behavior: "smooth", block: "start" }), 350);
}

export function BandejaPendientes({ d, cambiar }: { d: DireccionResumen; cambiar: (tab: string) => void }) {
  const contenido = useContenido(d.puede.contenido);
  if (!d.puede.revisar && !d.puede.contenido) return null;
  const p = d.pendientes;
  const filas: Fila[] = [];
  if (d.puede.revisar) {
    if (p.escritas > 0) {
      filas.push({ clave: "escritas", icono: PenLine, texto: `${numero(p.escritas)} ${p.escritas === 1 ? "respuesta escrita marcada" : "respuestas escritas marcadas"} por el corrector`, boton: "Revisar", ir: () => irA("revisar", undefined, cambiar), testId: "bandeja-escritas" });
    }
    if (p.apelaciones > 0) {
      filas.push({ clave: "apelaciones", icono: MessageSquareWarning, texto: `${numero(p.apelaciones)} ${p.apelaciones === 1 ? "pedido de revisión de un examen" : "pedidos de revisión de exámenes"}`, boton: "Responder", ir: () => irA("revisar", undefined, cambiar), testId: "bandeja-apelaciones" });
    }
    const porTipo = p.porTipo?.length ? p.porTipo : p.actividades > 0 ? [{ tipo: "", n: p.actividades }] : [];
    for (const t of porTipo) {
      const nombre = PENDIENTE_ACTIVIDAD[t.tipo];
      filas.push({
        clave: `actividad-${t.tipo}`,
        icono: ClipboardCheck,
        texto: `${numero(t.n)} ${nombre ? (t.n === 1 ? nombre.uno : nombre.varios) : t.n === 1 ? "actividad de los niveles por confirmar" : "actividades de los niveles por confirmar"}`,
        boton: nombre?.accion ?? "Confirmar",
        ir: () => irA("revisar", "actividades-por-confirmar", cambiar),
        testId: `bandeja-actividad-${t.tipo || "todas"}`,
      });
    }
  }
  const c = contenido.data;
  const siguiente = c?.materias.find((m) => !m.aprobacion?.vigente);
  if (d.puede.contenido && c) {
    const faltan = c.total - c.aprobadas;
    if (faltan > 0) {
      filas.push({
        clave: "revision",
        icono: BookCheck,
        texto: `${numero(faltan)} de ${numero(c.total)} materias por aprobar en la revisión doctrinal${siguiente ? ` · la siguiente: ${siguiente.titulo} (${siguiente.grupo ?? (siguiente.nivel ? `Nivel ${siguiente.nivel}` : "Especialidad")})` : ""}`,
        boton: "Ver la lista",
        ir: () => irA("contenido", undefined, cambiar),
        testId: "bandeja-revision",
      });
    }
    if (c.abiertas > 0) {
      filas.push({ clave: "observaciones", icono: FileWarning, texto: `${numero(c.abiertas)} ${c.abiertas === 1 ? "observación abierta" : "observaciones abiertas"} en el contenido`, boton: "Ver", ir: () => irA("contenido", undefined, cambiar), testId: "bandeja-observaciones" });
    }
    if (!c.declaracion.aprobacion?.vigente) {
      filas.push({
        clave: "declaracion",
        icono: ScrollText,
        texto: c.declaracion.aprobacion ? "La declaración de fe cambió después de aprobarla: hay que aprobarla otra vez" : "La declaración de fe espera tu aprobación",
        boton: "Revisarla",
        ir: () => irA("contenido", "contenido-declaracion", cambiar),
        testId: "bandeja-declaracion",
      });
    }
  }
  const cargando = d.puede.contenido && contenido.isLoading;
  return (
    <section className={`glass-card p-5 border ${filas.length ? "border-orange-500/40" : "border-emerald-500/30"}`} data-testid="direccion-bandeja" data-pendientes={filas.length}>
      <div className="flex items-center gap-2 mb-1">
        {filas.length ? <Inbox className="w-5 h-5 text-orange-600" aria-hidden="true" /> : <CheckCircle2 className="w-5 h-5 text-emerald-600" aria-hidden="true" />}
        <h3 className="font-semibold">{filas.length ? "Pendientes de la Administración" : "Todo al día"}</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-3">
        {filas.length
          ? "Lo que espera tu revisión o tu aprobación. Cada botón te lleva a donde se resuelve."
          : cargando
            ? "Revisando lo que espera…"
            : "No hay respuestas, pedidos, actividades ni materias esperando tu revisión."}
      </p>
      {filas.length > 0 && (
        <ul className="divide-y divide-border/60">
          {filas.map((f) => {
            const Icono = f.icono;
            return (
              <li key={f.clave} className="flex items-center gap-3 py-2.5" data-testid={f.testId}>
                <Icono className="w-4 h-4 text-orange-600 shrink-0" aria-hidden="true" />
                <span className="flex-1 min-w-0 text-sm">{f.texto}</span>
                {f.clave === "revision" && siguiente && (
                  <Link href={`/admin/academia/contenido/${siguiente.id}`}>
                    <Button size="sm" className="fire-btn-primary" data-testid="bandeja-aprobar-siguiente"><ShieldAlert className="w-4 h-4 mr-1.5" aria-hidden="true" /> Revisar y aprobar la siguiente</Button>
                  </Link>
                )}
                <Button size="sm" variant={f.clave === "revision" ? "outline" : "default"} className={f.clave === "revision" ? "" : "fire-btn-primary"} onClick={f.ir}>{f.boton}</Button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
