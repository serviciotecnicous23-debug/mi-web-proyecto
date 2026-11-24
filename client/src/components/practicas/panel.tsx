// «Prácticas» en el panel de la academia (server/academia-practicas.ts): el estado de cada materia, si sus prácticas
// cuentan en la nota, los pesos de la nota por nivel, quién necesita ayuda y, por materia, cada actividad con qué tan
// clara es (el acierto y el error más elegido), su contenido para la revisión doctrinal y el botón para probarla.
import { useState } from "react";
import { Link } from "wouter";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Download, Eye, Flame, LifeBuoy, Play, Save, Scale } from "lucide-react";
import { NOMBRE_COMPONENTE, type Pesos } from "@shared/academia-base";
import { NOMBRE_PIEZA, type Pieza } from "@shared/practicas";
import { pedir, type ErrorAcademia } from "@/components/academia/api";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

type Fila = { id: string; titulo: string; nivel: number | null; lecciones: number; conPractica: number; completa: boolean; cuenta: boolean; desde: string | null; alumnos: number; intentos: number; promedio: number | null };
type Resumen = {
  materias: Fila[];
  pesos: Record<string, { actual: Pesos; base: Pesos; sin: Pesos }>;
  ayuda: { userId: number; nombre: string; materia: string; leccion: string; objetivo: string; fallos: number }[];
};
type Detalle = {
  materia: { id: string; titulo: string; nivel: number | null };
  config: { completa: boolean; cuenta: boolean; desde: string | null };
  mision: { titulo: string; intro: string; cierre: string } | null;
  lecciones: {
    id: string;
    n: number;
    titulo: string;
    objetivos: string[];
    actividades: { id: string; pieza: Pieza; objetivo: number; versiones: number; respuestas: number; acierto: number | null; errado: { texto: string | null; veces: number } | null; contenido: any[] }[];
  }[];
};

const fecha = (iso: string | null) => (iso ? new Date(iso).toLocaleDateString("es", { day: "numeric", month: "short", year: "numeric" }) : "—");

/** El contenido de una versión, para leerlo (la revisión doctrinal ve las respuestas). */
function VersionLegible({ pieza, v }: { pieza: Pieza; v: any }) {
  const linea = (t: string, k?: number) => <li key={k}>{t}</li>;
  const apoyo = v.apoyo ? <p className="text-xs text-muted-foreground mt-1">Lo dice la lección: <em>{v.apoyo}</em>{v.ref ? ` · ${v.ref}` : ""}</p> : null;
  switch (pieza) {
    case "tarjetas":
      return <ul className="list-disc pl-5 space-y-1">{v.tarjetas.map((t: any, k: number) => <li key={k}><strong>{t.frente}</strong> — {t.reverso}</li>)}</ul>;
    case "completa":
      return (
        <div>
          <p>{String(v.texto).split(/(\[\[[^\]]+\]\])/g).map((x: string, k: number) => (x.startsWith("[[") ? <mark key={k} className="bg-emerald-500/20 text-emerald-800 dark:text-emerald-200 font-semibold px-1 rounded">{x.slice(2, -2)}</mark> : <span key={k}>{x}</span>))}</p>
          <p className="text-xs mt-1">No van: {v.distractores.join(", ")}</p>
          {apoyo}
        </div>
      );
    case "relaciona":
      return <div><ul className="list-disc pl-5">{v.pares.map((p: string[], k: number) => linea(`${p[0]} → ${p[1]}`, k))}</ul>{apoyo}</div>;
    case "clasifica":
      return (
        <div>
          {v.grupos.map((g: string, gi: number) => (
            <p key={gi}><strong>{g}:</strong> {v.frases.filter((f: any) => f.grupo === gi).map((f: any) => f.texto).join(" · ")}</p>
          ))}
          {apoyo}
        </div>
      );
    case "ordena":
    case "linea":
      return <div><p className="font-semibold">{v.consigna}</p><ol className="list-decimal pl-5">{(v.pasos ?? v.eventos.map((e: any) => `${e.texto} (${e.fecha})`)).map((t: string, k: number) => linea(t, k))}</ol>{apoyo}</div>;
    case "verdad":
      return <ul className="space-y-1">{v.afirmaciones.map((a: any, k: number) => <li key={k}><strong>{a.verdad ? "Verdad" : "Error"}:</strong> {a.texto} <span className="text-muted-foreground">— {a.explica}</span></li>)}</ul>;
    case "error":
      return <div><ol className="list-decimal pl-5">{v.frases.map((f: string, k: number) => <li key={k} className={k === v.malo ? "text-rose-700 dark:text-rose-300 font-semibold" : ""}>{f}</li>)}</ol><p className="text-xs">Corrección: {v.correccion}</p>{apoyo}</div>;
    case "situacion":
      return (
        <div>
          <p className="italic">{v.caso}</p>
          <p className="font-semibold">{v.pregunta}</p>
          <ul className="space-y-1">{v.opciones.map((o: any, k: number) => <li key={k} className={o.bien ? "text-emerald-700 dark:text-emerald-300 font-semibold" : ""}>{o.bien ? "✓ " : "· "}{o.texto} <span className="text-muted-foreground font-normal">— {o.explica}</span></li>)}</ul>
          {apoyo}
        </div>
      );
    case "explica":
      return <div><p className="font-semibold">{v.clave.pregunta}</p><p className="text-xs">Ideas: {v.clave.ideas.map((i: any) => `${i.texto} (${i.peso})`).join(" · ")}</p><p className="text-xs">Modelo: {v.clave.modelo}</p>{apoyo}</div>;
    default:
      return <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(v, null, 1).slice(0, 1200)}</pre>;
  }
}

/** Las prácticas de una materia con todo su contenido (en el panel y en la revisión doctrinal). */
export function DetallePracticas({ id, volver }: { id: string; volver?: () => void }) {
  const q = useQuery<Detalle, ErrorAcademia>({ queryKey: ["practicas", "panel", id], queryFn: () => pedir("GET", `/api/academia/direccion/practicas/materia/${encodeURIComponent(id)}`) });
  const [abierta, setAbierta] = useState<string | null>(null);
  if (q.isLoading) return <p className="text-muted-foreground">Cargando…</p>;
  if (!q.data) return <p>{q.error?.message ?? "No se pudo cargar."}</p>;
  const d = q.data;
  return (
    <div className="space-y-4" data-testid="practicas-materia">
      {volver && <button type="button" onClick={volver} className="text-sm text-muted-foreground hover:underline inline-flex items-center gap-1"><ArrowLeft className="w-4 h-4" /> Todas las materias</button>}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h3 className="font-display text-2xl font-bold">{d.materia.titulo}</h3>
          <p className="text-sm text-muted-foreground">{d.config.completa ? (d.config.cuenta ? `Cuenta en la nota desde el ${fecha(d.config.desde)}` : "Completa, pero no cuenta en la nota") : "Todavía no tiene la práctica de todas sus lecciones"}</p>
        </div>
        <a href={`/api/academia/direccion/practicas/materia/${encodeURIComponent(d.materia.id)}/resultados.csv`} download className="inline-flex items-center gap-1.5 h-10 px-4 rounded-full border border-border text-sm font-semibold hover:border-orange-500"><Download className="w-4 h-4" /> Planilla de resultados</a>
      </div>
      {d.mision && <p className="text-sm rounded-2xl bg-muted/40 p-3"><strong>Misión:</strong> {d.mision.titulo}. {d.mision.intro}</p>}
      {d.lecciones.map((l) => (
        <div key={l.id} className="rounded-2xl border border-border p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-bold">Lección {l.n}: {l.titulo}</p>
            {l.actividades.length > 0 && (
              <Link href={`/academia/practica/${l.id}`} className="inline-flex items-center gap-1.5 h-9 px-3 rounded-full bg-orange-600 text-white text-sm font-semibold" data-testid={`probar-${l.id}`}><Play className="w-4 h-4" /> Probar como alumno</Link>
            )}
          </div>
          {l.actividades.length === 0 ? (
            <p className="text-sm text-muted-foreground mt-2">Sin práctica todavía.</p>
          ) : (
            <ul className="mt-3 divide-y divide-border">
              {l.actividades.map((a) => {
                const clave = `${l.id}:${a.id}`;
                return (
                  <li key={a.id} className="py-2.5">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                      <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-xs font-bold">{NOMBRE_PIEZA[a.pieza]}</span>
                      <span className="flex-1 min-w-[180px] text-muted-foreground">Objetivo {a.objetivo + 1}: {l.objetivos[a.objetivo]}</span>
                      <span>{a.respuestas} {a.respuestas === 1 ? "respuesta" : "respuestas"}</span>
                      <span className={a.acierto == null ? "text-muted-foreground" : a.acierto < 50 ? "text-rose-600 font-bold" : a.acierto < 70 ? "text-amber-600 font-semibold" : "text-emerald-700 dark:text-emerald-300 font-semibold"}>{a.acierto == null ? "—" : `${a.acierto} % de acierto`}</span>
                      <button type="button" onClick={() => setAbierta(abierta === clave ? null : clave)} className="inline-flex items-center gap-1 text-orange-700 dark:text-orange-300 font-semibold"><Eye className="w-4 h-4" /> {abierta === clave ? "Ocultar" : `Ver las ${a.versiones} versiones`}</button>
                    </div>
                    {a.errado?.texto && (
                      <p className="text-xs mt-1 text-rose-700 dark:text-rose-300">El error más elegido ({a.errado.veces} {a.errado.veces === 1 ? "vez" : "veces"}): {a.errado.texto}</p>
                    )}
                    {abierta === clave && (
                      <div className="mt-2 grid gap-2">
                        {a.contenido.map((v, k) => (
                          <div key={k} className="rounded-xl bg-muted/30 p-3 text-sm">
                            <p className="text-xs font-bold mb-1">Versión {k + 1}</p>
                            <VersionLegible pieza={a.pieza} v={v} />
                          </div>
                        ))}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

function EditorPesos({ nivel, p, alGuardar }: { nivel: string; p: { actual: Pesos; base: Pesos; sin: Pesos }; alGuardar: () => void }) {
  const { toast } = useToast();
  const [v, setV] = useState<Pesos>(p.actual);
  const [guardando, setGuardando] = useState(false);
  const claves = (Object.keys(p.base) as (keyof Pesos)[]).filter((k) => p.sin[k] > 0 || k === "practicas");
  const suma = claves.reduce((a, k) => a + (Number(v[k]) || 0), 0);
  const enviar = async (restablecer = false) => {
    setGuardando(true);
    try {
      await pedir("POST", "/api/academia/direccion/practicas/pesos", restablecer ? { nivel: Number(nivel), restablecer: true } : { nivel: Number(nivel), pesos: v });
      toast({ title: `Pesos del Nivel ${nivel} guardados` });
      if (restablecer) setV(p.base);
      alGuardar();
    } catch (e: any) {
      toast({ title: "No se guardaron", description: e?.message, variant: "destructive" });
    } finally {
      setGuardando(false);
    }
  };
  return (
    <div className="rounded-2xl border border-border p-3">
      <p className="font-bold text-sm mb-2">{nivel === "3" ? "Niveles 3 a 5 y especialidades: Nivel 3" : `Nivel ${nivel}`}</p>
      <div className="grid grid-cols-2 gap-2">
        {claves.map((k) => (
          <label key={k} className="text-xs flex items-center justify-between gap-2">
            <span>{NOMBRE_COMPONENTE[k]}</span>
            <input type="number" min={0} max={100} value={v[k]} onChange={(e) => setV({ ...v, [k]: Math.round(Number(e.target.value)) })} className="w-16 h-9 rounded-lg border border-border bg-background px-2 text-right text-sm" aria-label={`${NOMBRE_COMPONENTE[k]}, Nivel ${nivel}`} />
          </label>
        ))}
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <span className={`text-xs font-semibold ${suma === 100 ? "text-emerald-700 dark:text-emerald-300" : "text-rose-600"}`}>Suman {suma}</span>
        <span className="flex-1" />
        <button type="button" onClick={() => enviar(true)} disabled={guardando} className="h-9 px-3 rounded-full text-xs border border-border">Los de siempre</button>
        <button type="button" onClick={() => enviar()} disabled={guardando || suma !== 100} className="h-9 px-3 rounded-full text-xs bg-orange-600 text-white font-semibold disabled:opacity-50 inline-flex items-center gap-1"><Save className="w-3.5 h-3.5" /> Guardar</button>
      </div>
    </div>
  );
}

export function PanelPracticas({ enlaceAlumno }: { enlaceAlumno?: (id: number) => string }) {
  const qc = useQueryClient();
  const { toast } = useToast();
  const q = useQuery<Resumen, ErrorAcademia>({ queryKey: ["practicas", "panel"], queryFn: () => pedir("GET", "/api/academia/direccion/practicas") });
  // (con `&pmateria=` en la dirección se abre directo esa materia)
  const [materia, setMateria] = useState<string | null>(() => new URLSearchParams(window.location.search).get("pmateria"));
  if (materia) return <DetallePracticas id={materia} volver={() => setMateria(null)} />;
  if (q.isLoading) return <p className="text-muted-foreground">Cargando…</p>;
  if (!q.data) return <p>{q.error?.message ?? "No se pudo cargar."}</p>;
  const d = q.data;
  const cambiarCuenta = async (f: Fila, cuenta: boolean) => {
    try {
      await pedir("POST", `/api/academia/direccion/practicas/materia/${encodeURIComponent(f.id)}/cuenta`, { cuenta });
      toast({ title: cuenta ? `Las prácticas de «${f.titulo}» cuentan en la nota` : `Las prácticas de «${f.titulo}» ya no cuentan en la nota` });
      void qc.invalidateQueries({ queryKey: ["practicas", "panel"] });
    } catch (e: any) {
      toast({ title: "No se pudo cambiar", description: e?.message, variant: "destructive" });
    }
  };
  return (
    <div className="space-y-8 pb-20" data-testid="panel-practicas">
      <section>
        <h2 className="font-display text-xl font-bold flex items-center gap-2"><Flame className="w-5 h-5 text-orange-500" /> Las prácticas de cada materia</h2>
        <p className="text-sm text-muted-foreground mt-1">Cuando una materia tiene la práctica de todas sus lecciones, sus prácticas pueden entrar en la nota de quien la empiece desde ese día.</p>
        <div className="mt-3 grid gap-2">
          {d.materias.map((f) => (
            <div key={f.id} className="rounded-2xl border border-border p-3 flex flex-wrap items-center gap-3" data-testid={`practicas-fila-${f.id}`}>
              <button type="button" onClick={() => setMateria(f.id)} className="flex-1 min-w-[200px] text-left">
                <span className="block font-semibold">{f.titulo}</span>
                <span className="block text-xs text-muted-foreground">
                  {f.conPractica} de {f.lecciones} lecciones con práctica · {f.alumnos} {f.alumnos === 1 ? "alumno" : "alumnos"} · {f.intentos} intentos{f.promedio != null ? ` · promedio ${f.promedio}` : ""}
                </span>
              </button>
              {f.completa ? (
                <label className="flex items-center gap-2 text-sm">
                  <Switch checked={f.cuenta} onCheckedChange={(v) => void cambiarCuenta(f, v)} aria-label={`Que las prácticas de ${f.titulo} cuenten en la nota`} />
                  {f.cuenta ? `En la nota desde el ${fecha(f.desde)}` : "No cuenta en la nota"}
                </label>
              ) : (
                <span className="text-xs text-muted-foreground">En preparación</span>
              )}
              <button type="button" onClick={() => setMateria(f.id)} className="h-9 px-3 rounded-full border border-border text-sm font-semibold hover:border-orange-500">Ver</button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl font-bold flex items-center gap-2"><Scale className="w-5 h-5 text-orange-500" /> Los pesos de la nota con prácticas</h2>
        <p className="text-sm text-muted-foreground mt-1">Valen para quien empieza una materia con todas sus prácticas. Deben sumar 100.</p>
        <div className="mt-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {["1", "2", "3", "4", "5"].map((n) => d.pesos[n] && <EditorPesos key={n} nivel={n} p={d.pesos[n]} alGuardar={() => void qc.invalidateQueries({ queryKey: ["practicas", "panel"] })} />)}
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl font-bold flex items-center gap-2"><LifeBuoy className="w-5 h-5 text-orange-500" /> Necesitan ayuda</h2>
        <p className="text-sm text-muted-foreground mt-1">Quien falló tres veces seguidas el mismo objetivo.</p>
        {d.ayuda.length === 0 ? (
          <p className="mt-2 text-sm">Nadie por ahora.</p>
        ) : (
          <ul className="mt-2 divide-y divide-border rounded-2xl border border-border">
            {d.ayuda.map((a, k) => (
              <li key={k} className="p-3 text-sm">
                {enlaceAlumno ? <Link href={enlaceAlumno(a.userId)} className="font-semibold hover:underline">{a.nombre}</Link> : <span className="font-semibold">{a.nombre}</span>}
                <span className="text-muted-foreground"> · {a.materia} · {a.leccion}</span>
                <span className="block text-xs mt-0.5">Objetivo: {a.objetivo} ({a.fallos} fallos seguidos)</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
