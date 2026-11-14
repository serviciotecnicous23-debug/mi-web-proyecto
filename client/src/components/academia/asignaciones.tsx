// Las asignaciones de la Academia en la Escuela (server/academia-asignaciones.ts): la pestaña «Academia» del aula de un
// curso —quien lo dirige asigna materias, obligatorias u opcionales y con fecha límite, y ve cómo va cada alumno; el
// alumno ve las suyas— y las tarjetas de la portada de la academia y de la página de la materia. Solo importa tipos y
// funciones livianas (@shared/academia-escuela): el aula no carga el catálogo de la academia.
import { useState } from "react";
import { Link } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import { AlertTriangle, ArrowRight, BookOpen, CalendarClock, CheckCircle2, CircleDashed, Clock, GraduationCap, PenLine, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { TEXTO_ESTADO_ASIGNACION, type Asignacion, type AsignacionesCurso, type AvanceAsignacion, type MiAsignacion } from "@shared/academia-escuela";
import { asignarMateria, cambiarAsignacion, quitarAsignacion, useMisAsignaciones, type CuerpoAsignacion } from "@/components/academia/api";

const CHIP = "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs whitespace-nowrap";
const SELECT =
  "h-10 w-full rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring";
const dos = (n: number) => String(n).padStart(2, "0");
/** La fecha de hoy (en la hora de quien mira) para el campo de fecha. */
const hoyLocal = () => {
  const d = new Date();
  return `${d.getFullYear()}-${dos(d.getMonth() + 1)}-${dos(d.getDate())}`;
};
/** El día que eligió el profesor, hasta el final de ese día en su hora. */
const finDelDia = (fecha: string) => (fecha ? new Date(`${fecha}T23:59:59`).toISOString() : null);
const aCampo = (iso: string | null) => {
  if (!iso) return "";
  const d = new Date(iso);
  return `${d.getFullYear()}-${dos(d.getMonth() + 1)}-${dos(d.getDate())}`;
};
export const fechaLimite = (iso: string) => new Date(iso).toLocaleDateString("es", { weekday: "long", day: "numeric", month: "long" });

/** «vence hoy», «vence mañana», «vence en 5 días», «venció hace 2 días». */
export function cuandoVence(iso: string): string {
  const fin = new Date(iso);
  const hoy = new Date();
  const dias = Math.round((Date.UTC(fin.getFullYear(), fin.getMonth(), fin.getDate()) - Date.UTC(hoy.getFullYear(), hoy.getMonth(), hoy.getDate())) / 86_400_000);
  if (Date.now() > fin.getTime()) return dias >= 0 ? "venció hoy" : `venció hace ${-dias} ${dias === -1 ? "día" : "días"}`;
  if (dias === 0) return "vence hoy";
  if (dias === 1) return "vence mañana";
  return `vence en ${dias} días`;
}

/** El estado de una asignación, siempre con su ícono y su texto (nunca solo con color). */
export function ChipAvance({ a }: { a: AvanceAsignacion }) {
  if (a.estado === "aprobada") {
    return (
      <span className={`${CHIP} bg-emerald-500/15 font-medium`} data-estado="aprobada">
        <CheckCircle2 className="w-3 h-3" aria-hidden="true" /> Aprobada{a.nota != null ? ` · ${a.nota}` : ""}{a.aTiempo === false ? " (tarde)" : ""}
      </span>
    );
  }
  if (a.estado === "vencida") {
    return <span className={`${CHIP} bg-orange-500/15 font-medium`} data-estado="vencida"><AlertTriangle className="w-3 h-3" aria-hidden="true" /> Vencida · {a.lecciones}/{a.de}</span>;
  }
  if (a.estado === "en-curso") return <span className={`${CHIP} bg-muted`} data-estado="en-curso"><Clock className="w-3 h-3" aria-hidden="true" /> En curso · {a.lecciones}/{a.de}</span>;
  return <span className={`${CHIP} bg-muted`} data-estado="sin-empezar"><CircleDashed className="w-3 h-3" aria-hidden="true" /> {TEXTO_ESTADO_ASIGNACION["sin-empezar"]}</span>;
}

/** Una barra de una sola serie sobre su base (la parte de los alumnos que ya la aprobó). */
function Barra({ valor, de, etiqueta }: { valor: number; de: number; etiqueta: string }) {
  const pct = de > 0 ? Math.max(0, Math.min(100, (100 * valor) / de)) : 0;
  return (
    <span className="block h-2.5 w-full min-w-16 rounded-r-[4px] bg-orange-300 dark:bg-orange-900" role="img" aria-label={etiqueta} title={etiqueta}>
      {pct > 0 && <span className="block h-2.5 rounded-r-[4px] bg-orange-600" style={{ width: `${pct}%` }} />}
    </span>
  );
}

function DatosAsignacion({ a }: { a: Asignacion }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5 text-xs">
      <span className={`${CHIP} ${a.obligatoria ? "bg-orange-500/15 font-medium" : "bg-muted"}`}>{a.obligatoria ? "Obligatoria" : "Opcional"}</span>
      {a.materia.nivel && <span className={`${CHIP} bg-muted`}>Nivel {a.materia.nivel}</span>}
      <span className={`${CHIP} bg-muted`}><BookOpen className="w-3 h-3" aria-hidden="true" /> {a.materia.lecciones} lecciones</span>
      {a.venceAt ? (
        <span className={`${CHIP} bg-muted`} title={`Hasta el final del ${fechaLimite(a.venceAt)}`}>
          <CalendarClock className="w-3 h-3" aria-hidden="true" /> {fechaLimite(a.venceAt)} · {cuandoVence(a.venceAt)}
        </span>
      ) : (
        <span className={`${CHIP} bg-muted`}><CalendarClock className="w-3 h-3" aria-hidden="true" /> Sin fecha límite</span>
      )}
    </div>
  );
}

// ---------------------------------------------------------------- el formulario (asignar o cambiar)

function FormularioAsignacion({
  materias, inicial, alGuardar, alCancelar, ocupado, error, boton,
}: {
  materias?: { id: string; titulo: string; nivel: number | null }[];
  inicial?: Asignacion;
  alGuardar: (c: CuerpoAsignacion & { materiaId: string }) => void;
  alCancelar: () => void;
  ocupado: boolean;
  error: string | null;
  boton: string;
}) {
  const [materiaId, setMateriaId] = useState(inicial?.materia.id ?? materias?.[0]?.id ?? "");
  const [obligatoria, setObligatoria] = useState(inicial?.obligatoria ?? true);
  const [fecha, setFecha] = useState(aCampo(inicial?.venceAt ?? null));
  const [indicaciones, setIndicaciones] = useState(inicial?.indicaciones ?? "");
  return (
    <div className="rounded-xl border border-border p-4 space-y-3" data-testid="asignacion-formulario">
      {materias && (
        <label className="text-sm block">
          Materia de la academia
          <select value={materiaId} onChange={(e) => setMateriaId(e.target.value)} className={`${SELECT} mt-1`} data-testid="asignacion-materia">
            {materias.map((m) => <option key={m.id} value={m.id}>{m.nivel ? `Nivel ${m.nivel} · ` : ""}{m.titulo}</option>)}
          </select>
        </label>
      )}
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-sm block">
          Fecha límite (opcional)
          <Input type="date" value={fecha} min={hoyLocal()} onChange={(e) => setFecha(e.target.value)} className="h-10 mt-1 text-[16px]" data-testid="asignacion-fecha" />
        </label>
        <label className="text-sm flex items-center justify-between gap-3 rounded-md border border-input px-3 h-10 self-end">
          <span>{obligatoria ? "Obligatoria" : "Opcional"}</span>
          <Switch checked={obligatoria} onCheckedChange={setObligatoria} aria-label="Obligatoria" data-testid="asignacion-obligatoria" />
        </label>
      </div>
      <label className="text-sm block">
        Indicaciones para tus alumnos (opcional)
        <Textarea value={indicaciones} onChange={(e) => setIndicaciones(e.target.value)} rows={2} maxLength={500} className="mt-1 text-[16px]" placeholder="Por ejemplo: la conversamos en la clase del jueves." data-testid="asignacion-indicaciones" />
      </label>
      <div className="flex flex-wrap gap-2">
        <Button className="fire-btn-primary" onClick={() => alGuardar({ materiaId, obligatoria, venceAt: finDelDia(fecha), indicaciones })} disabled={ocupado || !materiaId} data-testid="asignacion-guardar">
          {ocupado ? "Guardando…" : boton}
        </Button>
        <Button variant="ghost" onClick={alCancelar} disabled={ocupado}>Cancelar</Button>
      </div>
      {error && <p className="text-sm text-red-600 dark:text-red-400" role="alert">{error}</p>}
    </div>
  );
}

// ---------------------------------------------------------------- el aula: quien dirige el curso

function TarjetaAsignacion({ a, cursoId }: { a: AsignacionesCurso["asignaciones"][number]; cursoId: number }) {
  const qc = useQueryClient();
  const { toast } = useToast();
  const [modo, setModo] = useState<"" | "cambiar" | "quitar">("");
  const [ocupado, setOcupado] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const refrescar = () => void qc.invalidateQueries({ queryKey: ["academia", "asignaciones"] });
  const guardar = async (c: CuerpoAsignacion) => {
    setOcupado(true);
    setError(null);
    try {
      await cambiarAsignacion(cursoId, a.id, c);
      toast({ title: "Asignación actualizada" });
      setModo("");
      refrescar();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setOcupado(false);
    }
  };
  const quitar = async () => {
    setOcupado(true);
    setError(null);
    try {
      await quitarAsignacion(cursoId, a.id);
      toast({ title: "Asignación quitada", description: "El avance de cada alumno en la materia no cambia." });
      refrescar();
    } catch (e: any) {
      setError(e.message);
      setOcupado(false);
    }
  };
  const r = a.resumen;
  return (
    <article className="glass-card p-4 space-y-3" data-testid="asignacion" data-materia={a.materia.id}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <Link href={`/academia/materia/${a.materia.id}`} className="font-semibold hover:underline">{a.materia.titulo}</Link>
          <p className="text-xs text-muted-foreground">Asignada por {a.por}</p>
        </div>
        {!modo && (
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" onClick={() => setModo("cambiar")} data-testid="asignacion-cambiar"><PenLine className="w-4 h-4 mr-1.5" /> Cambiar</Button>
            <Button size="sm" variant="ghost" onClick={() => setModo("quitar")} data-testid="asignacion-quitar"><Trash2 className="w-4 h-4 mr-1.5" /> Quitar</Button>
          </div>
        )}
      </div>
      <DatosAsignacion a={a} />
      {a.indicaciones && <p className="text-sm whitespace-pre-wrap">{a.indicaciones}</p>}
      {r && r.alumnos > 0 && (
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Barra valor={r.aprobadas} de={r.alumnos} etiqueta={`${r.aprobadas} de ${r.alumnos} alumnos la aprobaron`} />
            <span className="text-sm tabular-nums whitespace-nowrap">{r.aprobadas}/{r.alumnos}</span>
          </div>
          <p className="text-xs text-muted-foreground" data-testid="asignacion-resumen">
            {r.aprobadas} {r.aprobadas === 1 ? "aprobada" : "aprobadas"} · {r.enCurso} en curso · {r.sinEmpezar} sin empezar{r.vencidas ? ` · ${r.vencidas} ${r.vencidas === 1 ? "vencida" : "vencidas"}` : ""}
          </p>
        </div>
      )}
      {modo === "cambiar" && <FormularioAsignacion inicial={a} alGuardar={guardar} alCancelar={() => setModo("")} ocupado={ocupado} error={error} boton="Guardar los cambios" />}
      {modo === "quitar" && (
        <div className="rounded-xl border border-border p-3 space-y-2">
          <p className="text-sm">¿Quitar «{a.materia.titulo}» de las asignaciones del curso? Lo que cada alumno ya hizo en la materia no se pierde.</p>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" className="fire-btn-primary" onClick={quitar} disabled={ocupado} data-testid="asignacion-quitar-confirmar">{ocupado ? "Quitando…" : "Sí, quitarla"}</Button>
            <Button size="sm" variant="ghost" onClick={() => setModo("")} disabled={ocupado}>Cancelar</Button>
          </div>
          {error && <p className="text-sm text-red-600 dark:text-red-400" role="alert">{error}</p>}
        </div>
      )}
    </article>
  );
}

function VistaDelProfesor({ d }: { d: AsignacionesCurso }) {
  const qc = useQueryClient();
  const { toast } = useToast();
  const [asignando, setAsignando] = useState(false);
  const [ocupado, setOcupado] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const asignadas = new Set(d.asignaciones.map((a) => a.materia.id));
  const libres = d.materias.filter((m) => !asignadas.has(m.id));
  const asignar = async (c: CuerpoAsignacion & { materiaId: string }) => {
    setOcupado(true);
    setError(null);
    try {
      await asignarMateria(d.curso.id, c);
      toast({ title: "Materia asignada", description: d.abierta ? "Tus alumnos reciben un aviso en la campana." : "Tus alumnos la verán cuando la academia se abra para todos." });
      setAsignando(false);
      void qc.invalidateQueries({ queryKey: ["academia", "asignaciones"] });
    } catch (e: any) {
      setError(e.message);
    } finally {
      setOcupado(false);
    }
  };
  const alumnos = d.alumnos ?? [];
  return (
    <div className="space-y-5">
      {!d.abierta && (
        <p className="glass-card p-4 text-sm border border-orange-500/30" role="note" data-testid="asignaciones-vista-previa">
          La academia está en vista previa: tus alumnos verán estas asignaciones cuando se abra para todos. Ya puedes prepararlas.
        </p>
      )}
      {asignando ? (
        <FormularioAsignacion materias={libres} alGuardar={asignar} alCancelar={() => setAsignando(false)} ocupado={ocupado} error={error} boton="Asignar la materia" />
      ) : (
        libres.length > 0 && (
          <Button className="fire-btn-primary" onClick={() => setAsignando(true)} data-testid="asignacion-nueva"><Plus className="w-4 h-4 mr-1.5" /> Asignar una materia de la academia</Button>
        )
      )}
      {d.asignaciones.length === 0 ? (
        <p className="text-sm text-muted-foreground">Todavía no hay materias de la academia asignadas a este curso.</p>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">{d.asignaciones.map((a) => <TarjetaAsignacion key={a.id} a={a} cursoId={d.curso.id} />)}</div>
      )}
      {d.asignaciones.length > 0 && (
        <section className="glass-card p-0 overflow-x-auto" data-testid="asignaciones-alumnos">
          <h3 className="font-semibold px-4 pt-4">Cómo va cada alumno</h3>
          <p className="text-xs text-muted-foreground px-4 pb-2">La nota de cada materia aprobada sale sola, también en la planilla de notas del curso.</p>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-muted-foreground border-b border-border">
                <th className="py-2.5 px-4 font-medium">Alumno</th>
                {d.asignaciones.map((a) => <th key={a.id} className="py-2.5 px-3 font-medium">{a.materia.titulo}</th>)}
              </tr>
            </thead>
            <tbody>
              {alumnos.map((al) => (
                <tr key={al.userId} className="border-b border-border/60 last:border-0 align-top" data-testid="asignaciones-fila">
                  <td className="py-2.5 px-4">
                    <span className="font-medium">{al.nombre}</span>
                    {!al.matriculado && <span className="block text-xs text-muted-foreground">Todavía no se inscribió en la academia</span>}
                  </td>
                  {d.asignaciones.map((a) => <td key={a.id} className="py-2.5 px-3"><ChipAvance a={al.avance[a.id]} /></td>)}
                </tr>
              ))}
              {!alumnos.length && (
                <tr>
                  <td colSpan={d.asignaciones.length + 1} className="py-6 text-center text-muted-foreground">Todavía no hay alumnos aprobados en este curso.</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
}

// ---------------------------------------------------------------- el aula: el alumno

function TarjetaMia({ a, avance, conCurso = false }: { a: Asignacion; avance: AvanceAsignacion; conCurso?: boolean }) {
  return (
    <article className={`glass-card p-4 space-y-2.5 ${avance.estado === "vencida" ? "border border-orange-500/40" : ""}`} data-testid="asignacion-mia" data-materia={a.materia.id}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          {conCurso && <p className="text-xs text-muted-foreground">De tu curso «{a.curso.titulo}»</p>}
          <p className="font-semibold">{a.materia.titulo}</p>
        </div>
        <ChipAvance a={avance} />
      </div>
      <DatosAsignacion a={a} />
      {a.indicaciones && <p className="text-sm whitespace-pre-wrap">{a.indicaciones}</p>}
      {avance.estado !== "aprobada" && (
        <Link href={`/academia/materia/${a.materia.id}`}>
          <Button size="sm" className="fire-btn-primary mt-1">{avance.estado === "sin-empezar" ? "Empezar la materia" : "Seguir con la materia"} <ArrowRight className="w-4 h-4 ml-1.5" /></Button>
        </Link>
      )}
    </article>
  );
}

/** La pestaña «Academia» del aula de un curso. */
export function AulaAcademia({ d }: { d: AsignacionesCurso }) {
  return (
    <div className="space-y-4" data-testid="aula-academia">
      <div className="flex items-start gap-3">
        <GraduationCap className="w-6 h-6 text-orange-500 shrink-0 mt-0.5" aria-hidden="true" />
        <div>
          <h2 className="font-semibold text-lg">Asignaciones de la Academia</h2>
          <p className="text-sm text-muted-foreground">
            {d.puedeGestionar
              ? "Asigna a tu curso materias de la Academia Avivando el Fuego, obligatorias u opcionales y con fecha límite, y mira cómo va cada alumno."
              : "Las materias de la Academia Avivando el Fuego que te asignó tu curso. Al aprobarlas, la nota sale sola en la planilla del curso."}
          </p>
        </div>
      </div>
      {d.puedeGestionar ? (
        <VistaDelProfesor d={d} />
      ) : (
        <div className="space-y-3">{d.asignaciones.map((a) => a.mio && <TarjetaMia key={a.id} a={a} avance={a.mio} />)}</div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------- la portada y la página de la materia

const pendientePrimero = (a: MiAsignacion, b: MiAsignacion) =>
  Number(a.avance.estado === "aprobada") - Number(b.avance.estado === "aprobada") ||
  (a.venceAt ? Date.parse(a.venceAt) : Infinity) - (b.venceAt ? Date.parse(b.venceAt) : Infinity);

/** «Para tus cursos»: las materias que te asignaron tus cursos de la Escuela, primero las pendientes. */
export function MisAsignacionesPortada({ activo }: { activo: boolean }) {
  const q = useMisAsignaciones(activo);
  const lista = [...(q.data?.asignaciones ?? [])].sort(pendientePrimero);
  if (!lista.length) return null;
  const pendientes = lista.filter((a) => a.avance.estado !== "aprobada").length;
  return (
    <section className="max-w-6xl mx-auto px-4 pt-8" data-testid="mis-asignaciones">
      <p className="data-label text-orange-600 dark:text-orange-300">Para tus cursos de la Escuela</p>
      <h2 className="font-display text-2xl md:text-3xl font-bold mt-1 mb-1">Materias asignadas</h2>
      <p className="text-sm text-muted-foreground mb-4">
        {pendientes ? `${pendientes} ${pendientes === 1 ? "pendiente" : "pendientes"} de ${lista.length}.` : "Las aprobaste todas."}
      </p>
      <div className="grid gap-3 md:grid-cols-2">{lista.map((a) => <TarjetaMia key={a.id} a={a} avance={a.avance} conCurso />)}</div>
    </section>
  );
}

/** En la página de la materia: qué curso la asignó y para cuándo. */
export function AsignacionDeMateria({ materiaId, activo }: { materiaId: string; activo: boolean }) {
  const q = useMisAsignaciones(activo);
  const mias = (q.data?.asignaciones ?? []).filter((a) => a.materia.id === materiaId);
  if (!mias.length) return null;
  return (
    <div className="mt-5 space-y-2 max-w-2xl" data-testid="materia-asignada">
      {mias.map((a) => (
        <p key={a.id} className={`glass-card p-4 text-sm flex items-start gap-2 ${a.avance.estado === "vencida" ? "border border-orange-500/40" : "border border-border"}`}>
          <GraduationCap className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" aria-hidden="true" />
          <span className="flex-1">
            Tu curso «{a.curso.titulo}» te la asignó ({a.obligatoria ? "obligatoria" : "opcional"})
            {a.venceAt ? `: hasta el ${fechaLimite(a.venceAt)} (${cuandoVence(a.venceAt)}).` : "."}
            {a.indicaciones ? ` ${a.indicaciones}` : ""}
          </span>
          <ChipAvance a={a.avance} />
        </p>
      ))}
    </div>
  );
}
