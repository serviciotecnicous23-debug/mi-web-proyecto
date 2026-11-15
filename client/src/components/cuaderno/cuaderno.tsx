// El cuaderno entero: la lista de notas (buscar, fijadas, por materia, por etiqueta y la papelera), el editor de la
// nota elegida, los resaltados de las lecciones y lo que se guardó en la Biblia (resaltados y notas por versículo). Es
// el mismo en la academia (/academia/cuaderno) y en la Biblioteca (pestaña «Cuaderno»). En el teléfono, la lista y la
// nota se ven de a una.
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft, BookOpen, FilePlus2, Highlighter, NotebookPen, Pin, PinOff, RotateCcw, Search, Tag, Trash2, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { loginUrl } from "@/lib/login-redirect";
import { PLANTILLAS, bloque, type NotaCompleta, type NotaResumen, type ResaltadoLeccion } from "@shared/cuaderno";
import { citaVisible, type Cita } from "@shared/citas";
import {
  agregarALeccion, borrarNota, borrarResaltado, cambiarNota, crearNota, pedir, restaurarNota, useCuaderno, useResaltados, type ErrorCuaderno, type FiltrosCuaderno,
} from "./api";
import { EditorNota } from "./editor";
import { fondoDeColor, type AlAbrirCita } from "./texto";

type Vista = "notas" | "resaltados" | "biblia";

const fechaCorta = (iso: string) => {
  const d = new Date(iso);
  const hoy = new Date();
  const dias = Math.floor((new Date(hoy.toDateString()).getTime() - new Date(d.toDateString()).getTime()) / 86400000);
  if (dias === 0) return `hoy, ${d.toLocaleTimeString("es", { hour: "numeric", minute: "2-digit" })}`;
  if (dias === 1) return "ayer";
  return d.toLocaleDateString("es", { day: "numeric", month: "short", year: d.getFullYear() === hoy.getFullYear() ? undefined : "numeric" });
};

function useNota(id: number | null) {
  return useQuery<NotaCompleta, ErrorCuaderno>({
    queryKey: ["cuaderno", "nota", id],
    queryFn: () => pedir("GET", `/api/cuaderno/notas/${id}`),
    enabled: !!id,
    retry: false,
    staleTime: Infinity,
  });
}

export function Cuaderno({ modo, alAbrirCita, notaInicial }: { modo: "academia" | "biblioteca"; alAbrirCita?: AlAbrirCita; notaInicial?: number | null }) {
  const qc = useQueryClient();
  const { toast } = useToast();
  const [vista, setVista] = useState<Vista>("notas");
  const [buscar, setBuscar] = useState("");
  const [q, setQ] = useState("");
  const [filtros, setFiltros] = useState<FiltrosCuaderno>({ vista: "todas" });
  const [sel, setSel] = useState<number | null>(notaInicial ?? null);
  const lista = useCuaderno({ ...filtros, q }, vista === "notas");

  useEffect(() => {
    const t = window.setTimeout(() => setQ(buscar.trim()), 300);
    return () => window.clearTimeout(t);
  }, [buscar]);
  useEffect(() => {
    if (notaInicial) setSel(notaInicial);
  }, [notaInicial]);

  const nueva = async (plantilla?: string) => {
    try {
      const n = await crearNota(plantilla ? { plantilla } : { bloques: [bloque("texto")] });
      qc.setQueryData(["cuaderno", "nota", n.id], n);
      await qc.invalidateQueries({ queryKey: ["cuaderno", "lista"] });
      setVista("notas");
      setFiltros({ vista: "todas" });
      setSel(n.id);
    } catch (e: any) {
      toast({ title: "No se pudo crear la nota", description: e?.message, variant: "destructive" });
    }
  };

  const papelera = filtros.vista === "papelera";
  const notas = lista.data?.notas ?? [];

  if (lista.error?.status === 401) {
    return (
      <div className="glass-card p-6 text-center" data-testid="cuaderno-sin-sesion">
        <NotebookPen className="w-10 h-10 mx-auto text-orange-500" />
        <p className="mt-3 mb-4">Entra con tu cuenta para usar tu cuaderno: tus apuntes se guardan y los ves en todos tus equipos.</p>
        <a href={loginUrl()}><Button className="fire-btn-primary">Entrar</Button></a>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-[minmax(260px,320px)_1fr]" data-testid="cuaderno">
      {/* la lista (en el teléfono se esconde mientras se ve una nota) */}
      <aside className={`${sel ? "hidden md:block" : ""} space-y-3`}>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="fire-btn-primary flex-1" data-testid="cuaderno-nueva"><FilePlus2 className="w-4 h-4 mr-1.5" /> Nueva nota</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-72 max-w-[90vw]">
              <DropdownMenuItem onSelect={() => nueva()}><FilePlus2 className="w-4 h-4 mr-2" /> En blanco</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Con una plantilla de estudio</DropdownMenuLabel>
              {PLANTILLAS.map((p) => (
                <DropdownMenuItem key={p.id} onSelect={() => nueva(p.id)} className="flex-col items-start" data-testid={`cuaderno-plantilla-${p.id}`}>
                  <span className="font-medium">{p.nombre}</span>
                  <span className="text-xs text-muted-foreground whitespace-normal">{p.para}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Qué ver">
          {([
            ["notas", "Notas", NotebookPen],
            ["resaltados", "Resaltados", Highlighter],
            ["biblia", "De la Biblia", BookOpen],
          ] as const).map(([v, t, I]) => (
            <button
              key={v}
              type="button"
              role="tab"
              aria-selected={vista === v}
              onClick={() => {
                setVista(v);
                setSel(null);
              }}
              className={`px-3 py-1.5 rounded-full text-sm inline-flex items-center gap-1.5 border ${vista === v ? "bg-orange-600 text-white border-orange-600" : "border-border hover:bg-muted"}`}
              data-testid={`cuaderno-vista-${v}`}
            >
              <I className="w-3.5 h-3.5" /> {t}
            </button>
          ))}
        </div>

        {vista === "notas" && (
          <>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input value={buscar} onChange={(e) => setBuscar(e.target.value)} placeholder="Buscar en mis notas" className="pl-8" aria-label="Buscar en mis notas" data-testid="cuaderno-buscar" />
            </div>
            <div className="flex flex-wrap gap-1.5 text-xs">
              <Chip activo={filtros.vista !== "fijadas" && !papelera && !filtros.materia && !filtros.etiqueta} onClick={() => setFiltros({ vista: "todas" })}>Todas</Chip>
              <Chip activo={filtros.vista === "fijadas"} onClick={() => setFiltros({ vista: "fijadas" })}><Pin className="w-3 h-3" /> Fijadas</Chip>
              {lista.data?.materias.map((m) => (
                <Chip key={m.id} activo={filtros.materia === m.id} onClick={() => setFiltros({ vista: "todas", materia: m.id })}>{m.titulo} · {m.notas}</Chip>
              ))}
              {lista.data?.etiquetas.map((e) => (
                <Chip key={e} activo={filtros.etiqueta === e} onClick={() => setFiltros({ vista: "todas", etiqueta: e })}><Tag className="w-3 h-3" /> {e}</Chip>
              ))}
              {!!lista.data?.enPapelera && (
                <Chip activo={papelera} onClick={() => setFiltros({ vista: "papelera" })}><Trash2 className="w-3 h-3" /> Papelera · {lista.data.enPapelera}</Chip>
              )}
            </div>
            {papelera && <p className="text-xs text-muted-foreground">Las notas de la papelera se borran solas a los 30 días.</p>}
            <ul className="space-y-2" data-testid="cuaderno-lista">
              {lista.isLoading && <li className="text-sm text-muted-foreground">Cargando tu cuaderno…</li>}
              {!lista.isLoading && !notas.length && (
                <li className="glass-card p-4 text-sm text-muted-foreground" data-testid="cuaderno-vacio">
                  {q || filtros.materia || filtros.etiqueta || filtros.vista !== "todas"
                    ? "No hay notas con ese filtro."
                    : modo === "academia"
                      ? "Tu cuaderno está vacío. Crea tu primera nota, o abre una lección: ahí puedes tomar apuntes y resaltar el texto."
                      : "Tu cuaderno está vacío. Crea tu primera nota: escribe una cita como Juan 3:16 y se vuelve un enlace a la Biblia."}
                </li>
              )}
              {notas.map((n) => (
                <TarjetaNota key={n.id} n={n} activa={sel === n.id} alAbrir={() => setSel(n.id)} />
              ))}
            </ul>
          </>
        )}
        {vista === "resaltados" && <p className="text-xs text-muted-foreground">Lo que resaltas en las lecciones de la academia. Toca uno para ir a su lección, o pásalo a tu nota de esa lección.</p>}
        {vista === "biblia" && <p className="text-xs text-muted-foreground">Lo que resaltaste y anotaste en la Biblia de la Biblioteca, versículo por versículo.</p>}
      </aside>

      {/* la nota elegida, los resaltados o lo de la Biblia */}
      <section className={`${!sel && vista === "notas" ? "hidden md:block" : ""} min-w-0`}>
        {vista === "notas" && (sel ? <NotaAbierta id={sel} papelera={papelera} alCerrar={() => setSel(null)} alAbrirCita={alAbrirCita} /> : <SinNota />)}
        {vista === "resaltados" && <VistaResaltados />}
        {vista === "biblia" && <VistaBiblia alAbrirCita={alAbrirCita} />}
      </section>
    </div>
  );
}

function Chip({ activo, onClick, children }: { activo: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} className={`px-2.5 py-1 rounded-full border inline-flex items-center gap-1 ${activo ? "bg-orange-500/15 border-orange-500/50 text-orange-800 dark:text-orange-200" : "border-border hover:bg-muted"}`}>
      {children}
    </button>
  );
}

function TarjetaNota({ n, activa, alAbrir }: { n: NotaResumen; activa: boolean; alAbrir: () => void }) {
  return (
    <li>
      <button
        type="button"
        onClick={alAbrir}
        className={`w-full text-left rounded-xl border p-3 transition ${activa ? "border-orange-500/60 bg-orange-500/10" : "border-border hover:bg-muted/60"}`}
        data-testid="cuaderno-tarjeta"
      >
        <div className="flex items-start gap-2">
          <p className="font-semibold leading-snug flex-1 min-w-0 truncate">{n.titulo || "Sin título"}</p>
          {n.fijada && <Pin className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" aria-label="Fijada" />}
        </div>
        {n.extracto && <p className="text-sm text-muted-foreground line-clamp-2 mt-0.5">{n.extracto}</p>}
        <div className="flex flex-wrap items-center gap-1.5 mt-1.5 text-[11px] text-muted-foreground">
          <span>{fechaCorta(n.actualizada)}</span>
          {n.materiaTitulo && <span className="px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-800 dark:text-orange-200">{n.materiaTitulo}</span>}
          {n.etiquetas.map((e) => <span key={e} className="px-1.5 py-0.5 rounded bg-muted">#{e}</span>)}
        </div>
      </button>
    </li>
  );
}

function SinNota() {
  return (
    <div className="glass-card p-8 text-center text-muted-foreground hidden md:block">
      <NotebookPen className="w-10 h-10 mx-auto text-orange-500/70" />
      <p className="mt-3">Elige una nota de la lista o crea una nueva.</p>
      <p className="text-sm mt-2">Consejo: escribe «/» en un bloque vacío para elegir el tipo de bloque, y una cita como «Juan 3:16» para enlazar la Biblia.</p>
    </div>
  );
}

function NotaAbierta({ id, papelera, alCerrar, alAbrirCita }: { id: number; papelera: boolean; alCerrar: () => void; alAbrirCita?: AlAbrirCita }) {
  const qc = useQueryClient();
  const { toast } = useToast();
  const q = useNota(id);
  const [etiqueta, setEtiqueta] = useState("");
  const n = q.data;
  if (q.isLoading) return <div className="glass-card p-6 text-sm text-muted-foreground">Abriendo la nota…</div>;
  if (!n) return <div className="glass-card p-6 text-sm">No se pudo abrir esa nota. <button className="underline" onClick={alCerrar}>Volver</button></div>;

  const refrescar = async (r?: NotaCompleta) => {
    if (r) qc.setQueryData(["cuaderno", "nota", r.id], (v: NotaCompleta | undefined) => (v ? { ...v, fijada: r.fijada, etiquetas: r.etiquetas, color: r.color, borrada: r.borrada } : r));
    await qc.invalidateQueries({ queryKey: ["cuaderno", "lista"] });
  };
  const fijar = async () => refrescar(await cambiarNota(n.id, { fijada: !n.fijada }));
  const agregarEtiqueta = async () => {
    const t = etiqueta.trim();
    if (!t) return;
    setEtiqueta("");
    await refrescar(await cambiarNota(n.id, { etiquetas: [...n.etiquetas, t] }));
  };
  const quitarEtiqueta = async (t: string) => refrescar(await cambiarNota(n.id, { etiquetas: n.etiquetas.filter((x) => x !== t) }));
  const aLaPapelera = async () => {
    await borrarNota(n.id);
    qc.removeQueries({ queryKey: ["cuaderno", "nota", n.id] });
    await refrescar();
    toast({ title: "La nota está en la papelera", description: "Puedes restaurarla durante 30 días." });
    alCerrar();
  };
  const restaurar = async () => {
    const r = await restaurarNota(n.id);
    qc.setQueryData(["cuaderno", "nota", r.id], r);
    await refrescar();
    toast({ title: "Nota restaurada" });
  };
  const borrarDelTodo = async () => {
    if (!window.confirm("¿Borrar esta nota para siempre? No se puede deshacer.")) return;
    await borrarNota(n.id, true);
    qc.removeQueries({ queryKey: ["cuaderno", "nota", n.id] });
    await refrescar();
    alCerrar();
  };

  return (
    <div className="glass-card p-3 sm:p-5" data-testid="cuaderno-nota">
      <div className="flex items-center gap-1.5 flex-wrap mb-1">
        {/* salir de la nota: se guarda sola, así que «Listo» solo la cierra (en el teléfono vuelve a la lista) */}
        <Button variant="outline" size="sm" onClick={alCerrar} data-testid="cuaderno-cerrar-nota"><ArrowLeft className="w-4 h-4 mr-1" /> Listo</Button>
        {n.leccionId && (
          <Link href={`/academia/leccion/${n.leccionId}`} data-testid="cuaderno-ir-leccion">
            <Button variant="ghost" size="sm"><BookOpen className="w-4 h-4 mr-1" /> Volver a la lección</Button>
          </Link>
        )}
        <span className="flex-1" />
        {n.borrada ? (
          <>
            <Button variant="outline" size="sm" onClick={restaurar} data-testid="cuaderno-restaurar"><RotateCcw className="w-4 h-4 mr-1" /> Restaurar</Button>
            <Button variant="ghost" size="sm" className="text-red-600" onClick={borrarDelTodo} data-testid="cuaderno-borrar-definitiva"><Trash2 className="w-4 h-4 mr-1" /> Borrar para siempre</Button>
          </>
        ) : (
          <>
            <Button variant="ghost" size="sm" onClick={fijar} data-testid="cuaderno-fijar">{n.fijada ? <><PinOff className="w-4 h-4 mr-1" /> Quitar de arriba</> : <><Pin className="w-4 h-4 mr-1" /> Fijar arriba</>}</Button>
            <Button variant="ghost" size="sm" onClick={aLaPapelera} data-testid="cuaderno-papelera"><Trash2 className="w-4 h-4 mr-1" /> A la papelera</Button>
          </>
        )}
      </div>
      {n.borrada || papelera ? (
        <div className="opacity-80 pointer-events-none select-text">
          <p className="text-sm text-amber-700 dark:text-amber-300 mb-2">Esta nota está en la papelera: restáurala para seguir escribiendo.</p>
          <EditorNota key={`${n.id}-${n.version}-p`} nota={n} alAbrirCita={alAbrirCita} />
        </div>
      ) : (
        <EditorNota key={n.id} nota={n} alAbrirCita={alAbrirCita} alGuardar={(r) => {
            if (r.id === n.id) qc.setQueryData<NotaCompleta>(["cuaderno", "nota", n.id], r);
          }} />
      )}
      {!n.borrada && (
        <div className="mt-5 pt-3 border-t border-border/60 flex flex-wrap items-center gap-1.5 text-xs">
          <Tag className="w-3.5 h-3.5 text-muted-foreground" />
          {n.etiquetas.map((e) => (
            <span key={e} className="px-2 py-0.5 rounded-full bg-muted inline-flex items-center gap-1">
              #{e}
              <button type="button" onClick={() => quitarEtiqueta(e)} aria-label={`Quitar la etiqueta ${e}`}><X className="w-3 h-3" /></button>
            </span>
          ))}
          <input
            value={etiqueta}
            onChange={(e) => setEtiqueta(e.target.value.slice(0, 32))}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                void agregarEtiqueta();
              }
            }}
            placeholder="Agregar etiqueta"
            className="bg-transparent outline-none px-1 py-0.5 w-32"
            aria-label="Agregar una etiqueta"
            data-testid="cuaderno-etiqueta"
          />
        </div>
      )}
    </div>
  );
}

function VistaResaltados() {
  const qc = useQueryClient();
  const { toast } = useToast();
  const q = useResaltados();
  const grupos = useMemo(() => {
    const m = new Map<string, { titulo: string; materia: string | null; leccionId: string; items: ResaltadoLeccion[] }>();
    for (const r of q.data ?? []) {
      const g = m.get(r.leccionId) ?? { titulo: r.leccionTitulo ?? r.leccionId, materia: r.materiaTitulo, leccionId: r.leccionId, items: [] };
      g.items.push(r);
      m.set(r.leccionId, g);
    }
    return [...m.values()];
  }, [q.data]);
  if (q.isLoading) return <div className="glass-card p-6 text-sm text-muted-foreground">Cargando tus resaltados…</div>;
  if (!grupos.length)
    return (
      <div className="glass-card p-6 text-sm text-muted-foreground" data-testid="cuaderno-resaltados-vacio">
        Todavía no resaltaste nada. En una lección, selecciona un texto con el dedo o el mouse y elige un color.
      </div>
    );
  const pasar = async (r: ResaltadoLeccion) => {
    try {
      await agregarALeccion(r.leccionId, [bloque("resaltado", r.texto, { color: r.color, fuente: { tipo: "leccion", id: r.leccionId, titulo: r.leccionTitulo ?? r.leccionId } })]);
      await qc.invalidateQueries({ queryKey: ["cuaderno"] });
      toast({ title: "Pasado a tu nota de la lección", description: r.leccionTitulo ?? undefined });
    } catch (e: any) {
      toast({ title: "No se pudo", description: e?.message, variant: "destructive" });
    }
  };
  const quitar = async (r: ResaltadoLeccion) => {
    await borrarResaltado(r.id);
    await qc.invalidateQueries({ queryKey: ["cuaderno"] });
  };
  return (
    <div className="space-y-4" data-testid="cuaderno-resaltados">
      {grupos.map((g) => (
        <div key={g.leccionId} className="glass-card p-4">
          <p className="font-semibold"><Link href={`/academia/leccion/${g.leccionId}`} className="hover:underline">{g.titulo}</Link></p>
          {g.materia && <p className="text-xs text-muted-foreground mb-2">{g.materia}</p>}
          <ul className="space-y-2">
            {g.items.map((r) => (
              <li key={r.id} className="flex items-start gap-2">
                <p className={`flex-1 rounded-lg px-2 py-1 text-[15px] leading-7 ${fondoDeColor(r.color)}`}>{r.texto}</p>
                <Button variant="ghost" size="sm" onClick={() => pasar(r)} title="Pasar a mi nota de la lección"><NotebookPen className="w-4 h-4" /></Button>
                <Button variant="ghost" size="sm" onClick={() => quitar(r)} title="Quitar el resaltado"><Trash2 className="w-4 h-4" /></Button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

type NotaBiblia = { id: number; book: string; chapter: number; verse: number; content: string };
type ResaltadoBiblia = { id: number; book: string; chapter: number; verseStart: number; verseEnd: number; color: string; note: string | null };

function VistaBiblia({ alAbrirCita }: { alAbrirCita?: AlAbrirCita }) {
  const notas = useQuery<NotaBiblia[]>({ queryKey: ["/api/bible/notes", "todas"], queryFn: () => pedir("GET", "/api/bible/notes"), retry: false });
  const res = useQuery<ResaltadoBiblia[]>({ queryKey: ["/api/bible/highlights", "todos"], queryFn: () => pedir("GET", "/api/bible/highlights"), retry: false });
  const items = useMemo(() => {
    const out: { clave: string; cita: Cita; texto: string; color?: string }[] = [];
    for (const n of notas.data ?? []) out.push({ clave: `n${n.id}`, cita: { libro: n.book, capitulo: n.chapter, desde: n.verse, hasta: n.verse }, texto: n.content });
    for (const h of res.data ?? []) out.push({ clave: `h${h.id}`, cita: { libro: h.book, capitulo: h.chapter, desde: h.verseStart, hasta: h.verseEnd }, texto: h.note ?? "", color: h.color });
    return out.sort((a, b) => a.cita.libro.localeCompare(b.cita.libro) || a.cita.capitulo - b.cita.capitulo || a.cita.desde - b.cita.desde);
  }, [notas.data, res.data]);
  if (notas.isLoading || res.isLoading) return <div className="glass-card p-6 text-sm text-muted-foreground">Cargando lo de la Biblia…</div>;
  if (notas.error || res.error)
    return <div className="glass-card p-6 text-sm text-muted-foreground">Las notas y los resaltados de la Biblia se guardan cuando tu cuenta está aprobada.</div>;
  if (!items.length)
    return (
      <div className="glass-card p-6 text-sm text-muted-foreground" data-testid="cuaderno-biblia-vacio">
        Todavía no resaltaste ni anotaste versículos. En la Biblioteca, toca un versículo para resaltarlo o escribir una nota: aparecerá aquí.
      </div>
    );
  return (
    <ul className="space-y-2" data-testid="cuaderno-biblia">
      {items.map((x) => (
        <li key={x.clave} className="glass-card p-3 flex items-start gap-3">
          <span className="w-2 self-stretch rounded-full shrink-0" style={{ background: x.color ?? "transparent", border: x.color ? undefined : "1px solid currentColor", opacity: x.color ? 1 : 0.2 }} aria-hidden="true" />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm">{citaVisible(x.cita)}</p>
            {x.texto ? <p className="text-[15px] leading-7 whitespace-pre-wrap">{x.texto}</p> : <p className="text-sm text-muted-foreground">Resaltado</p>}
          </div>
          {alAbrirCita ? (
            <Button variant="ghost" size="sm" onClick={() => alAbrirCita(x.cita)}>Abrir</Button>
          ) : (
            <a href={`/biblioteca?libro=${encodeURIComponent(x.cita.libro)}&cap=${x.cita.capitulo}`}><Button variant="ghost" size="sm">Abrir</Button></a>
          )}
        </li>
      ))}
    </ul>
  );
}
