// Las piezas del panel general de administración (pages/admin.tsx), pensadas primero para el teléfono
// (docs/academia-panel.md, parte 4):
// - las secciones agrupadas en una sola fila (Inicio, Personas, Cursos, Comunidad, Sitio y Radio), cada una con sus
//   partes en un selector simple debajo;
// - «Lo que te toca»: lo que espera a la Administración, cada cosa con un toque que lleva a resolverla;
// - las cifras compactas;
// - la ventana para confirmar lo que no se puede deshacer (borrar, rechazar o desactivar).
import { useState, type ReactNode } from "react";
import { Link } from "wouter";
import {
  BookOpen, Calendar, CheckCircle2, ChevronRight, Church, Flag, GraduationCap, Inbox, LayoutDashboard, Mail, MessageSquare, Radio, UserCheck, UserPlus, Users,
} from "lucide-react";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";

/** Las partes del panel (las pestañas de siempre; sus nombres siguen sirviendo en ?tab=). */
export type Parte =
  | "pending" | "users" | "alliance" | "courses" | "teacher-requests" | "fichas" | "messages" | "posts" | "denuncias" | "events" | "content" | "radio-library" | "live";
export type Grupo = { id: string; texto: string; icono: typeof Users; partes: { id: Parte; texto: string }[] };

export const GRUPOS: Grupo[] = [
  { id: "personas", texto: "Personas", icono: Users, partes: [{ id: "pending", texto: "Solicitudes" }, { id: "users", texto: "Miembros" }, { id: "alliance", texto: "Alianzas" }] },
  { id: "cursos", texto: "Cursos", icono: GraduationCap, partes: [{ id: "courses", texto: "Cursos" }, { id: "teacher-requests", texto: "Maestros" }, { id: "fichas", texto: "Fichas" }] },
  { id: "comunidad", texto: "Comunidad", icono: MessageSquare, partes: [{ id: "messages", texto: "Mensajes" }, { id: "posts", texto: "Publicaciones" }, { id: "denuncias", texto: "Denuncias" }] },
  { id: "sitio", texto: "Sitio", icono: Calendar, partes: [{ id: "events", texto: "Eventos" }, { id: "content", texto: "Textos de la web" }] },
  { id: "radio", texto: "Radio", icono: Radio, partes: [{ id: "radio-library", texto: "Biblioteca" }, { id: "live", texto: "En vivo" }] },
];
export const PARTES: Parte[] = GRUPOS.flatMap((g) => g.partes.map((p) => p.id));
export const grupoDe = (parte: string) => GRUPOS.find((g) => g.partes.some((p) => p.id === parte));

const PILDORA = "inline-flex items-center gap-2 rounded-full h-11 px-4 text-sm font-medium border whitespace-nowrap transition-colors";

/** La fila de secciones y, debajo, las partes de la sección elegida. `actual` es «inicio» o una parte. */
export function NavPanelGeneral({ actual, alElegir, avisos }: { actual: string; alElegir: (destino: string) => void; avisos: Partial<Record<Parte, number>> }) {
  const grupo = grupoDe(actual);
  const total = (g: Grupo) => g.partes.reduce((s, p) => s + (avisos[p.id] ?? 0), 0);
  return (
    <div id="admin-pestanas" className="scroll-mt-20 space-y-3 mb-5">
      <nav className="-mx-4 px-4 overflow-x-auto" aria-label="Secciones del panel">
        <ul className="flex gap-2 w-max pb-1">
          <li>
            <button type="button" onClick={() => alElegir("inicio")} aria-current={actual === "inicio" ? "page" : undefined} className={`${PILDORA} ${actual === "inicio" ? "bg-orange-600 border-orange-600 text-white" : "bg-card border-border hover:border-orange-500"}`} data-testid="seccion-inicio">
              <LayoutDashboard className="w-4 h-4" aria-hidden="true" /> Inicio
            </button>
          </li>
          {GRUPOS.map((g) => {
            const Icono = g.icono;
            const activa = grupo?.id === g.id;
            const n = total(g);
            return (
              <li key={g.id}>
                <button type="button" onClick={() => alElegir(g.partes[0].id)} aria-current={activa ? "page" : undefined} className={`${PILDORA} ${activa ? "bg-orange-600 border-orange-600 text-white" : "bg-card border-border hover:border-orange-500"}`} data-testid={`seccion-${g.id}`}>
                  <Icono className="w-4 h-4" aria-hidden="true" /> {g.texto}
                  {n > 0 && <span className={`rounded-full text-[11px] px-1.5 leading-5 font-semibold ${activa ? "bg-white text-orange-700" : "bg-orange-600 text-white"}`}>{n}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      {grupo && grupo.partes.length > 1 && (
        <div className={`grid gap-1 rounded-xl bg-muted/60 p-1 ${grupo.partes.length === 3 ? "grid-cols-3" : "grid-cols-2"}`} role="group" aria-label={`Partes de ${grupo.texto}`}>
          {grupo.partes.map((p) => (
            <button key={p.id} type="button" onClick={() => alElegir(p.id)} aria-pressed={actual === p.id} className={`h-10 rounded-lg text-sm font-medium transition-colors inline-flex items-center justify-center gap-1.5 ${actual === p.id ? "bg-background shadow" : "text-muted-foreground"}`} data-testid={`parte-${p.id}`}>
              {p.texto}
              {(avisos[p.id] ?? 0) > 0 && <span className="rounded-full bg-orange-600 text-white text-[11px] px-1.5 leading-5 font-semibold">{avisos[p.id]}</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

type Tarea = { clave: string; icono: typeof Inbox; uno: string; varios: string; detalle: string; destino: Parte; n: number };

/**
 * Lo que espera a la Administración: cuentas por aprobar, solicitudes de alianza, inscripciones, maestros, fichas
 * ministeriales, mensajes, denuncias y, aparte, lo que espera en la academia (que lleva a su panel).
 */
export function LoQueTeTocaGeneral({ avisos, alElegir, academia = 0 }: { avisos: Partial<Record<Parte, number>>; alElegir: (destino: string) => void; academia?: number }) {
  const tareas: Tarea[] = [
    { clave: "cuentas", icono: UserPlus, uno: "cuenta nueva por aprobar", varios: "cuentas nuevas por aprobar", detalle: "Pidieron unirse al ministerio. Aprueba o rechaza cada una.", destino: "pending" as Parte, n: avisos.pending ?? 0 },
    { clave: "alianzas", icono: Church, uno: "iglesia que pide ser aliada", varios: "iglesias que piden ser aliadas", detalle: "Llegaron desde la página «Alianza». Escríbele al pastor y decide.", destino: "alliance" as Parte, n: avisos.alliance ?? 0 },
    { clave: "inscripciones", icono: GraduationCap, uno: "inscripción a un curso por aprobar", varios: "inscripciones a cursos por aprobar", detalle: "El curso se abre solo, con los botones para aprobar o rechazar.", destino: "courses" as Parte, n: avisos.courses ?? 0 },
    { clave: "maestros", icono: BookOpen, uno: "obrero que pide enseñar un curso", varios: "obreros que piden enseñar un curso", detalle: "Al aprobar, queda como maestro del curso.", destino: "teacher-requests" as Parte, n: avisos["teacher-requests"] ?? 0 },
    { clave: "fichas", icono: UserCheck, uno: "ficha ministerial por aprobar", varios: "fichas ministeriales por aprobar", detalle: "Al aprobarse, cada ficha aparece en el directorio de maestros.", destino: "fichas" as Parte, n: avisos.fichas ?? 0 },
    { clave: "mensajes", icono: Mail, uno: "mensaje de contacto sin leer", varios: "mensajes de contacto sin leer", detalle: "Lo que escribieron en el formulario de contacto.", destino: "messages" as Parte, n: avisos.messages ?? 0 },
    { clave: "denuncias", icono: Flag, uno: "denuncia por revisar", varios: "denuncias por revisar", detalle: "Lo que los miembros denunciaron en la comunidad.", destino: "denuncias" as Parte, n: avisos.denuncias ?? 0 },
  ].filter((t) => t.n > 0);
  return (
    <section className="space-y-2" data-testid="lo-que-te-toca-general" data-tareas={tareas.length}>
      <h2 className="text-xl font-bold flex items-center gap-2">
        {tareas.length || academia ? <Inbox className="w-5 h-5 text-orange-600" aria-hidden="true" /> : <CheckCircle2 className="w-5 h-5 text-emerald-600" aria-hidden="true" />}
        {tareas.length || academia ? "Lo que te toca" : "Todo al día"}
      </h2>
      {!tareas.length && !academia && (
        <p className="text-sm text-muted-foreground">No hay cuentas, alianzas, inscripciones, obreros, fichas, mensajes, denuncias ni nada de la academia esperando.</p>
      )}
      <ul className="space-y-2">
        {academia > 0 && (
          <li>
            <Link href="/admin/academia?tab=pendientes" className="w-full glass-card border border-orange-500/40 p-4 flex items-center gap-3 text-left min-h-[72px] hover:border-orange-500 transition focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-orange-500" data-testid="tarea-general-academia">
              <span className="rounded-full bg-orange-500/15 p-2.5 shrink-0"><GraduationCap className="w-5 h-5 text-orange-600" aria-hidden="true" /></span>
              <span className="flex-1 min-w-0">
                <span className="block font-semibold leading-snug">{academia} {academia === 1 ? "cosa espera en la academia" : "cosas esperan en la academia"}</span>
                <span className="block text-sm text-muted-foreground mt-0.5">Respuestas escritas, pedidos de revisión, actividades de los niveles o materias por aprobar.</span>
              </span>
              <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" aria-hidden="true" />
            </Link>
          </li>
        )}
        {tareas.map((t) => {
          const Icono = t.icono;
          return (
            <li key={t.clave}>
              <button type="button" onClick={() => alElegir(t.destino)} className="w-full glass-card border border-orange-500/40 p-4 flex items-center gap-3 text-left min-h-[72px] hover:border-orange-500 transition focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-orange-500" data-testid={`tarea-general-${t.clave}`}>
                <span className="rounded-full bg-orange-500/15 p-2.5 shrink-0"><Icono className="w-5 h-5 text-orange-600" aria-hidden="true" /></span>
                <span className="flex-1 min-w-0">
                  <span className="block font-semibold leading-snug">{t.n} {t.n === 1 ? t.uno : t.varios}</span>
                  <span className="block text-sm text-muted-foreground mt-0.5">{t.detalle}</span>
                </span>
                <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" aria-hidden="true" />
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/** Las cifras del ministerio: pequeñas, y cada una lleva a su lista. */
export function CifrasGenerales({ cifras, alElegir }: { cifras: { texto: string; valor: number; nota?: string; destino: Parte; testId: string }[]; alElegir: (destino: string) => void }) {
  return (
    <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
      {cifras.map((c) => (
        <button key={c.testId} type="button" onClick={() => alElegir(c.destino)} className="glass-card p-3 flex flex-col items-start justify-start text-left border border-transparent hover:border-orange-500/50 transition focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-orange-500" data-testid={c.testId}>
          <span className="block text-xs text-muted-foreground">{c.texto}</span>
          <span className="block text-2xl font-bold leading-tight mt-0.5">{c.valor}</span>
          {c.nota && <span className="block text-xs text-muted-foreground">{c.nota}</span>}
        </button>
      ))}
    </div>
  );
}

/** Lo que se confirma: un título, qué pasa, el texto del botón y la acción. */
export type Confirmacion = { titulo: string; detalle: string; boton: string; accion: () => void };

/** La ventana para confirmar lo que no se puede deshacer. `pedir` la abre; `ventana` se pone una vez en la página. */
export function useConfirmar(): { pedir: (c: Confirmacion) => void; ventana: ReactNode } {
  const [c, setC] = useState<Confirmacion | null>(null);
  const ventana = (
    <AlertDialog open={!!c} onOpenChange={(v) => !v && setC(null)}>
      <AlertDialogContent className="w-[calc(100vw-1.5rem)] max-w-md rounded-2xl" data-testid="confirmar-accion">
        <AlertDialogHeader>
          <AlertDialogTitle>{c?.titulo}</AlertDialogTitle>
          <AlertDialogDescription>{c?.detalle}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col-reverse sm:flex-row gap-2">
          <AlertDialogCancel className="h-12 mt-0">Cancelar</AlertDialogCancel>
          <AlertDialogAction className="h-12 bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={() => { c?.accion(); setC(null); }} data-testid="confirmar-si">
            {c?.boton}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
  return { pedir: setC, ventana };
}
