// El cuaderno entero, con el estilo de Notas de Apple: las carpetas (todas, fijadas, cada materia, las etiquetas y las
// eliminadas), la búsqueda, las notas agrupadas por fecha (Hoy, Ayer, Últimos 7 días…) y el botón para escribir una
// nota nueva, que se abre al instante con su título y su texto (se crea con lo primero que se escribe). También los
// resaltados de las lecciones y lo que se guardó en la Biblia. Es el mismo en la academia (/academia/cuaderno) y en la
// Biblioteca (pestaña «Cuaderno»). En el teléfono, la lista y la nota se ven de a una.
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "wouter";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BookOpen, ChevronLeft, Ellipsis, Folder, NotebookPen, Pin, PinOff, RotateCcw, Search, SquarePen, Tag, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { loginUrl } from "@/lib/login-redirect";
import { useConfirmar } from "@/components/confirmar";
import { bloque, grupoDeFecha, type NotaCompleta, type NotaResumen, type ResaltadoLeccion } from "@shared/cuaderno";
import { citaVisible, type Cita } from "@shared/citas";
import {
  agregarALeccion, borrarNota, borrarResaltado, cambiarNota, notaNueva, pedir, restaurarNota, useCuaderno, useResaltados, type ErrorCuaderno, type FiltrosCuaderno,
} from "./api";
import { EditorNota } from "./editor";
import { fondoDeColor, type AlAbrirCita } from "./texto";

type Vista = "notas" | "resaltados" | "biblia";
type Seleccion = number | "nueva" | null;

/** La hora o la fecha de cada nota en la lista, como en Notas: «10:42», «ayer», «lunes» o «21/11/26». */
const cuandoCorto = (iso: string) => {
  const d = new Date(iso);
  const g = grupoDeFecha(iso);
  if (g === "Hoy") return d.toLocaleTimeString("es", { hour: "numeric", minute: "2-digit" });
  if (g === "Ayer") return "ayer";
  if (g === "Últimos 7 días") return d.toLocaleDateString("es", { weekday: "long" });
  return d.toLocaleDateString("es", { day: "numeric", month: "numeric", year: "2-digit" });
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

export function Cuaderno({
  modo, alAbrirCita, notaInicial, nuevaAlAbrir,
}: { modo: "academia" | "biblioteca"; alAbrirCita?: AlAbrirCita; notaInicial?: number | null; nuevaAlAbrir?: boolean }) {
  const qc = useQueryClient();
  const [vista, setVista] = useState<Vista>("notas");
  const [buscar, setBuscar] = useState("");
  const [q, setQ] = useState("");
  const [filtros, setFiltros] = useState<FiltrosCuaderno>({ vista: "todas" });
  const [sel, setSel] = useState<Seleccion>(notaInicial ?? (nuevaAlAbrir ? "nueva" : null));
  // la clave del editor: no cambia cuando la nota nueva se crea (así no se pierde lo que se está escribiendo)
  const [claveEditor, setClaveEditor] = useState(() => (nuevaAlAbrir && !notaInicial ? "nueva-al-abrir" : `n${notaInicial ?? ""}`));
  const lista = useCuaderno({ ...filtros, q }, vista === "notas");

  useEffect(() => {
    const t = window.setTimeout(() => setQ(buscar.trim()), 300);
    return () => window.clearTimeout(t);
  }, [buscar]);
  useEffect(() => {
    if (notaInicial) {
      setSel(notaInicial);
      setClaveEditor(`n${notaInicial}`);
    }
  }, [notaInicial]);

  const abrir = (id: number) => {
    setSel(id);
    setClaveEditor(`n${id}`);
  };
  const nueva = () => {
    setVista("notas");
    if (filtros.vista === "papelera") setFiltros({ vista: "todas" });
    setSel("nueva");
    setClaveEditor(`nueva-${Date.now()}`);
  };
  /** La nota nueva ya existe en el servidor: queda abierta, con el mismo editor. */
  const alCrear = (r: NotaCompleta) => {
    qc.setQueryData(["cuaderno", "nota", r.id], r);
    setSel(r.id);
  };

  const papelera = filtros.vista === "papelera";
  const notas = lista.data?.notas ?? [];
  const grupos = useMemo(() => {
    const fijadas = papelera ? [] : notas.filter((n) => n.fijada);
    const resto = papelera ? notas : notas.filter((n) => !n.fijada);
    const porGrupo = new Map<string, NotaResumen[]>();
    for (const n of resto) {
      const g = grupoDeFecha(n.actualizada);
      porGrupo.set(g, [...(porGrupo.get(g) ?? []), n]);
    }
    return [...(fijadas.length ? ([["Fijadas", fijadas]] as [string, NotaResumen[]][]) : []), ...porGrupo];
  }, [notas, papelera]);

  if (lista.error?.status === 401) {
    return (
      <div className="notas-papel notas-sistema rounded-2xl border p-6 text-center" data-testid="cuaderno-sin-sesion">
        <NotebookPen className="w-10 h-10 mx-auto text-amber-500" />
        <p className="mt-3 mb-4">Entra con tu cuenta para usar tu cuaderno: tus notas se guardan y las ves en todos tus equipos.</p>
        <a href={loginUrl()}><Button className="fire-btn-primary">Entrar</Button></a>
      </div>
    );
  }

  const enLaLista = vista === "notas" && sel == null;
  return (
    <div className="notas-sistema grid gap-4 md:grid-cols-[minmax(280px,340px)_1fr]" data-testid="cuaderno">
      {/* la lista (en el teléfono se esconde mientras se ve una nota) */}
      <aside className={`${sel != null && vista === "notas" ? "hidden md:block" : ""} space-y-3 min-w-0`}>
        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-xl bg-muted/70 p-0.5 flex-1 min-w-0" role="group" aria-label="Qué ver">
            {([
              ["notas", "Notas"],
              ["resaltados", "Resaltados"],
              ["biblia", "Biblia"],
            ] as const).map(([v, t]) => (
              <button
                key={v}
                type="button"
                aria-pressed={vista === v}
                onClick={() => {
                  setVista(v);
                  setSel(null);
                }}
                className={`flex-1 h-8 rounded-[10px] text-sm transition ${vista === v ? "bg-white dark:bg-[#48484a] shadow-sm font-semibold" : "text-muted-foreground hover:text-foreground"}`}
                data-testid={`cuaderno-vista-${v}`}
              >
                {t}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={nueva}
            className="h-10 w-10 shrink-0 rounded-full inline-flex items-center justify-center text-amber-600 dark:text-amber-400 hover:bg-amber-500/10"
            aria-label="Nota nueva"
            title="Nota nueva"
            data-testid="cuaderno-nueva"
          >
            <SquarePen className="w-[22px] h-[22px]" />
          </button>
        </div>

        {vista === "notas" && (
          <>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <input
                value={buscar}
                onChange={(e) => setBuscar(e.target.value)}
                placeholder="Buscar"
                className="w-full h-10 rounded-xl bg-muted/70 pl-9 pr-9 text-[16px] outline-none focus:ring-2 focus:ring-amber-500/40"
                aria-label="Buscar en mis notas"
                data-testid="cuaderno-buscar"
              />
              {buscar && (
                <button type="button" onClick={() => setBuscar("")} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground" aria-label="Borrar la búsqueda">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            {/* las carpetas, en una fila que se desliza */}
            <div className="-mx-4 px-4 overflow-x-auto">
              <div className="flex gap-1.5 w-max pb-0.5 text-sm" role="group" aria-label="Carpetas">
                <Carpeta activa={filtros.vista !== "fijadas" && !papelera && !filtros.materia && !filtros.etiqueta} onClick={() => setFiltros({ vista: "todas" })}>
                  <Folder className="w-3.5 h-3.5" /> Todas
                </Carpeta>
                <Carpeta activa={filtros.vista === "fijadas"} onClick={() => setFiltros({ vista: "fijadas" })}><Pin className="w-3.5 h-3.5" /> Fijadas</Carpeta>
                {lista.data?.materias.map((m) => (
                  <Carpeta key={m.id} activa={filtros.materia === m.id} onClick={() => setFiltros({ vista: "todas", materia: m.id })}>
                    <Folder className="w-3.5 h-3.5" /> {m.titulo} <span className="text-muted-foreground">{m.notas}</span>
                  </Carpeta>
                ))}
                {lista.data?.etiquetas.map((e) => (
                  <Carpeta key={e} activa={filtros.etiqueta === e} onClick={() => setFiltros({ vista: "todas", etiqueta: e })}>#{e}</Carpeta>
                ))}
                {!!lista.data?.enPapelera && (
                  <Carpeta activa={papelera} onClick={() => setFiltros({ vista: "papelera" })}>
                    <Trash2 className="w-3.5 h-3.5" /> Eliminadas <span className="text-muted-foreground">{lista.data.enPapelera}</span>
                  </Carpeta>
                )}
              </div>
            </div>
            {papelera && <p className="text-xs text-muted-foreground px-1">Las notas eliminadas se borran solas a los 30 días.</p>}

            <div className="space-y-4" data-testid="cuaderno-lista">
              {lista.isLoading && <p className="text-sm text-muted-foreground px-1">Cargando tu cuaderno…</p>}
              {!lista.isLoading && !notas.length && (
                <div className="notas-papel rounded-2xl border p-6 text-center text-sm text-muted-foreground" data-testid="cuaderno-vacio">
                  {q || filtros.materia || filtros.etiqueta || filtros.vista !== "todas" ? (
                    "No hay notas aquí."
                  ) : (
                    <>
                      <NotebookPen className="w-9 h-9 mx-auto text-amber-500/80 mb-2" />
                      <p>Todavía no tienes notas.</p>
                      <p className="mt-1">
                        {modo === "academia"
                          ? "Toca el lápiz para escribir una, o abre una lección: lo que resaltes o pases al cuaderno queda aquí."
                          : "Toca el lápiz para escribir una. Una cita como Juan 3:16 se vuelve un enlace a la Biblia."}
                      </p>
                    </>
                  )}
                </div>
              )}
              {grupos.map(([g, ns]) => (
                <section key={g} aria-label={g}>
                  <h3 className="text-[15px] font-bold px-1 mb-1.5">{g}</h3>
                  <ul className="notas-papel rounded-2xl border divide-y divide-border/70 overflow-hidden">
                    {ns.map((n) => (
                      <FilaNota key={n.id} n={n} activa={sel === n.id} alAbrir={() => abrir(n.id)} conCarpeta={!filtros.materia} />
                    ))}
                  </ul>
                </section>
              ))}
              {!!notas.length && (
                <p className="text-center text-xs text-muted-foreground" data-testid="cuaderno-cuantas">
                  {notas.length} {notas.length === 1 ? "nota" : "notas"}
                </p>
              )}
            </div>
          </>
        )}
        {vista === "resaltados" && <p className="text-xs text-muted-foreground px-1">Lo que resaltas en las lecciones de la academia. Toca uno para ir a su lección, o pásalo a tu nota de esa lección.</p>}
        {vista === "biblia" && <p className="text-xs text-muted-foreground px-1">Lo que resaltaste y anotaste en la Biblia de la Biblioteca, versículo por versículo.</p>}
      </aside>

      {/* la nota elegida, los resaltados o lo de la Biblia */}
      <section className={`${enLaLista ? "hidden md:block" : ""} min-w-0`}>
        {vista === "notas" &&
          (sel != null ? (
            <NotaAbierta
              id={sel}
              claveEditor={claveEditor}
              papelera={papelera}
              alCerrar={() => setSel(null)}
              alCrear={alCrear}
              alAbrirCita={alAbrirCita}
            />
          ) : (
            <SinNota />
          ))}
        {vista === "resaltados" && <VistaResaltados />}
        {vista === "biblia" && <VistaBiblia alAbrirCita={alAbrirCita} />}
      </section>

      {/* en el teléfono, el lápiz para escribir una nota nueva queda a mano (en el body: la animación de la página no lo mueve) */}
      {enLaLista && createPortal(
        <button
          type="button"
          onClick={nueva}
          className="md:hidden fixed z-40 right-4 bottom-24 h-14 w-14 rounded-full bg-amber-500 text-white shadow-lg inline-flex items-center justify-center active:scale-95 transition"
          aria-label="Nota nueva"
          data-testid="cuaderno-nueva-flotante"
        >
          <SquarePen className="w-6 h-6" />
        </button>,
        document.body,
      )}
    </div>
  );
}

function Carpeta({ activa, onClick, children }: { activa: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={activa}
      className={`h-8 px-3 rounded-full inline-flex items-center gap-1.5 whitespace-nowrap transition ${activa ? "bg-amber-500 text-white" : "bg-muted/70 hover:bg-muted"}`}
    >
      {children}
    </button>
  );
}

function FilaNota({ n, activa, alAbrir, conCarpeta }: { n: NotaResumen; activa: boolean; alAbrir: () => void; conCarpeta: boolean }) {
  return (
    <li>
      <button
        type="button"
        onClick={alAbrir}
        className={`w-full text-left px-4 py-3 transition ${activa ? "bg-amber-500/15" : "hover:bg-muted/50 active:bg-muted"}`}
        data-testid="cuaderno-tarjeta"
      >
        <span className="flex items-center gap-1.5">
          <span className="font-semibold text-[16px] leading-snug truncate flex-1 min-w-0">{n.titulo || "Nota nueva"}</span>
          {n.fijada && <Pin className="w-3.5 h-3.5 text-amber-500 shrink-0" aria-label="Fijada" />}
        </span>
        <span className="block text-[14px] text-muted-foreground truncate mt-0.5">
          <span className="text-foreground/75">{cuandoCorto(n.actualizada)}</span>
          {"  "}
          {n.extracto || "Sin más texto"}
        </span>
        {conCarpeta && n.materiaTitulo && (
          <span className="mt-1 inline-flex items-center gap-1 text-[12px] text-muted-foreground max-w-full">
            <Folder className="w-3 h-3 shrink-0" /> <span className="truncate">{n.materiaTitulo}</span>
          </span>
        )}
      </button>
    </li>
  );
}

function SinNota() {
  return (
    <div className="notas-papel rounded-2xl border p-10 text-center text-muted-foreground hidden md:block">
      <NotebookPen className="w-10 h-10 mx-auto text-amber-500/70" />
      <p className="mt-3">Elige una nota o toca el lápiz para escribir una nueva.</p>
      <p className="text-sm mt-2">Escribe una cita como Juan 3:16 y se vuelve un enlace a la Biblia.</p>
    </div>
  );
}

function NotaAbierta({
  id, claveEditor, papelera, alCerrar, alCrear, alAbrirCita,
}: { id: number | "nueva"; claveEditor: string; papelera: boolean; alCerrar: () => void; alCrear: (r: NotaCompleta) => void; alAbrirCita?: AlAbrirCita }) {
  const qc = useQueryClient();
  const { toast } = useToast();
  const { pedir: pedirConfirmar, ventana } = useConfirmar();
  const q = useNota(typeof id === "number" ? id : null);
  const [borrador] = useState(() => notaNueva());
  const [etiquetas, setEtiquetas] = useState(false);
  const n = id === "nueva" ? borrador : q.data;
  if (id !== "nueva" && q.isLoading) return <div className="notas-papel rounded-2xl border p-6 text-sm text-muted-foreground">Abriendo la nota…</div>;
  if (!n) return <div className="notas-papel rounded-2xl border p-6 text-sm">No se pudo abrir esa nota. <button className="underline" onClick={alCerrar}>Volver</button></div>;
  const nuevaSinGuardar = n.id === 0;

  const refrescar = async (r?: NotaCompleta) => {
    if (r) qc.setQueryData(["cuaderno", "nota", r.id], (v: NotaCompleta | undefined) => (v ? { ...v, fijada: r.fijada, etiquetas: r.etiquetas, color: r.color, borrada: r.borrada } : r));
    await qc.invalidateQueries({ queryKey: ["cuaderno", "lista"] });
  };
  const fijar = async () => refrescar(await cambiarNota(n.id, { fijada: !n.fijada }));
  const aLaPapelera = async () => {
    await borrarNota(n.id);
    qc.removeQueries({ queryKey: ["cuaderno", "nota", n.id] });
    await refrescar();
    toast({ title: "La nota está en Eliminadas", description: "Puedes recuperarla durante 30 días." });
    alCerrar();
  };
  const restaurar = async () => {
    const r = await restaurarNota(n.id);
    qc.setQueryData(["cuaderno", "nota", r.id], r);
    await refrescar();
    toast({ title: "Nota recuperada" });
  };
  const borrarDelTodo = () =>
    pedirConfirmar({
      titulo: "¿Borrar esta nota para siempre?",
      detalle: "No se puede deshacer.",
      boton: "Borrar para siempre",
      accion: async () => {
        await borrarNota(n.id, true);
        qc.removeQueries({ queryKey: ["cuaderno", "nota", n.id] });
        await refrescar();
        alCerrar();
      },
    });

  return (
    <div className="notas-papel rounded-2xl border px-3 pb-3 pt-2 sm:px-5 sm:pb-5" data-testid="cuaderno-nota">
      {ventana}
      <div className="flex items-center gap-0.5 -mx-1">
        {/* salir de la nota: se guarda sola, así que solo vuelve a la lista */}
        <button type="button" onClick={alCerrar} className="h-9 pl-1 pr-2 rounded-full inline-flex items-center text-[16px] text-amber-600 dark:text-amber-400 hover:bg-amber-500/10" data-testid="cuaderno-cerrar-nota">
          <ChevronLeft className="w-6 h-6 -ml-0.5" /> Notas
        </button>
        <span className="flex-1" />
        {n.leccionId && (
          <Link href={`/academia/leccion/${n.leccionId}`} data-testid="cuaderno-ir-leccion">
            <span className="h-9 px-2 rounded-full inline-flex items-center gap-1 text-sm text-amber-600 dark:text-amber-400 hover:bg-amber-500/10">
              <BookOpen className="w-4 h-4" /> <span className="hidden sm:inline">Ir a la lección</span>
            </span>
          </Link>
        )}
        {n.borrada ? (
          <>
            <Button variant="ghost" size="sm" className="text-amber-700 dark:text-amber-300" onClick={restaurar} data-testid="cuaderno-restaurar"><RotateCcw className="w-4 h-4 mr-1" /> Recuperar</Button>
            <Button variant="ghost" size="sm" className="text-red-600" onClick={borrarDelTodo} data-testid="cuaderno-borrar-definitiva"><Trash2 className="w-4 h-4 mr-1" /> Borrar</Button>
          </>
        ) : (
          !nuevaSinGuardar && (
            <>
              <button
                type="button"
                onClick={fijar}
                className={`h-9 w-9 rounded-full inline-flex items-center justify-center hover:bg-amber-500/10 ${n.fijada ? "text-amber-500" : "text-amber-600/80 dark:text-amber-400/80"}`}
                aria-label={n.fijada ? "Quitar de arriba" : "Fijar arriba"}
                title={n.fijada ? "Quitar de arriba" : "Fijar arriba"}
                data-testid="cuaderno-fijar"
              >
                {n.fijada ? <PinOff className="w-[18px] h-[18px]" /> : <Pin className="w-[18px] h-[18px]" />}
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button type="button" className="h-9 w-9 rounded-full inline-flex items-center justify-center text-amber-600 dark:text-amber-400 hover:bg-amber-500/10" aria-label="Más" title="Más" data-testid="cuaderno-mas">
                    <Ellipsis className="w-5 h-5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="notas-sistema w-56">
                  <DropdownMenuItem onSelect={fijar}>{n.fijada ? <><PinOff className="w-4 h-4 mr-2" /> Quitar de arriba</> : <><Pin className="w-4 h-4 mr-2" /> Fijar arriba</>}</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setEtiquetas(true)} data-testid="cuaderno-etiquetas"><Tag className="w-4 h-4 mr-2" /> Etiquetas</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={aLaPapelera} className="text-red-600 focus:text-red-600" data-testid="cuaderno-papelera"><Trash2 className="w-4 h-4 mr-2" /> Eliminar</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )
        )}
      </div>
      {n.borrada || papelera ? (
        <div className="opacity-80 select-text">
          <p className="text-sm text-amber-700 dark:text-amber-300 mt-2">Esta nota está en Eliminadas: recupérala para seguir escribiendo.</p>
          <EditorNota key={`${n.id}-${n.version}-p`} nota={n} alAbrirCita={alAbrirCita} soloLeer />
        </div>
      ) : (
        <EditorNota
          key={claveEditor}
          nota={n}
          alAbrirCita={alAbrirCita}
          alGuardar={(r) => {
            if (id === "nueva" && r.id) alCrear(r);
            else if (r.id === n.id) qc.setQueryData<NotaCompleta>(["cuaderno", "nota", n.id], r);
          }}
        />
      )}
      {!n.borrada && n.etiquetas.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5 text-xs">
          {n.etiquetas.map((e) => <span key={e} className="px-2 py-0.5 rounded-full bg-muted">#{e}</span>)}
        </div>
      )}
      {!nuevaSinGuardar && <VentanaEtiquetas nota={n} abierta={etiquetas} alCerrar={() => setEtiquetas(false)} alCambiar={refrescar} />}
    </div>
  );
}

/** Las etiquetas de una nota, en una ventana aparte (opcional: el cuaderno no las pide). */
function VentanaEtiquetas({ nota, abierta, alCerrar, alCambiar }: { nota: NotaCompleta; abierta: boolean; alCerrar: () => void; alCambiar: (r?: NotaCompleta) => Promise<void> }) {
  const [texto, setTexto] = useState("");
  const agregar = async () => {
    const t = texto.trim();
    if (!t) return;
    setTexto("");
    await alCambiar(await cambiarNota(nota.id, { etiquetas: [...nota.etiquetas, t] }));
  };
  const quitar = async (t: string) => alCambiar(await cambiarNota(nota.id, { etiquetas: nota.etiquetas.filter((x) => x !== t) }));
  return (
    <Dialog open={abierta} onOpenChange={(v) => !v && alCerrar()}>
      <DialogContent className="notas-sistema w-[calc(100vw-1.5rem)] max-w-sm rounded-2xl">
        <DialogHeader>
          <DialogTitle>Etiquetas</DialogTitle>
          <DialogDescription>Para encontrar tus notas por tema. Son opcionales.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-wrap gap-1.5">
          {nota.etiquetas.length ? (
            nota.etiquetas.map((e) => (
              <span key={e} className="pl-2.5 pr-1 py-1 rounded-full bg-muted inline-flex items-center gap-1 text-sm">
                #{e}
                <button type="button" onClick={() => quitar(e)} className="p-0.5 rounded-full hover:bg-background" aria-label={`Quitar la etiqueta ${e}`}><X className="w-3.5 h-3.5" /></button>
              </span>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">Esta nota no tiene etiquetas.</p>
          )}
        </div>
        <div className="flex gap-2">
          <input
            value={texto}
            onChange={(e) => setTexto(e.target.value.slice(0, 32))}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                void agregar();
              }
            }}
            placeholder="Nueva etiqueta"
            className="flex-1 min-w-0 h-10 rounded-xl bg-muted/70 px-3 text-[16px] outline-none focus:ring-2 focus:ring-amber-500/40"
            aria-label="Nueva etiqueta"
            data-testid="cuaderno-etiqueta"
          />
          <Button onClick={() => void agregar()} disabled={!texto.trim()} className="h-10 bg-amber-500 hover:bg-amber-600 text-white">Agregar</Button>
        </div>
        <Button variant="ghost" onClick={alCerrar} className="text-amber-700 dark:text-amber-300">Listo</Button>
      </DialogContent>
    </Dialog>
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
  if (q.isLoading) return <div className="notas-papel rounded-2xl border p-6 text-sm text-muted-foreground">Cargando tus resaltados…</div>;
  if (!grupos.length)
    return (
      <div className="notas-papel rounded-2xl border p-6 text-sm text-muted-foreground" data-testid="cuaderno-resaltados-vacio">
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
        <div key={g.leccionId} className="notas-papel rounded-2xl border p-4">
          <p className="font-semibold"><Link href={`/academia/leccion/${g.leccionId}`} className="hover:underline">{g.titulo}</Link></p>
          {g.materia && <p className="text-xs text-muted-foreground mb-2">{g.materia}</p>}
          <ul className="space-y-2">
            {g.items.map((r) => (
              <li key={r.id} className="flex items-start gap-2">
                <p className={`flex-1 rounded-lg px-2 py-1 text-[15px] leading-7 ${fondoDeColor(r.color)}`}>{r.texto}</p>
                <Button variant="ghost" size="sm" onClick={() => pasar(r)} title="Pasar a mi nota de la lección" aria-label="Pasar a mi nota de la lección"><NotebookPen className="w-4 h-4" /></Button>
                <Button variant="ghost" size="sm" onClick={() => quitar(r)} title="Quitar el resaltado" aria-label="Quitar el resaltado"><Trash2 className="w-4 h-4" /></Button>
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
  if (notas.isLoading || res.isLoading) return <div className="notas-papel rounded-2xl border p-6 text-sm text-muted-foreground">Cargando lo de la Biblia…</div>;
  if (notas.error || res.error)
    return <div className="notas-papel rounded-2xl border p-6 text-sm text-muted-foreground">Las notas y los resaltados de la Biblia se guardan cuando tu cuenta está aprobada.</div>;
  if (!items.length)
    return (
      <div className="notas-papel rounded-2xl border p-6 text-sm text-muted-foreground" data-testid="cuaderno-biblia-vacio">
        Todavía no resaltaste ni anotaste versículos. En la Biblioteca, toca un versículo para resaltarlo o escribir una nota: aparecerá aquí.
      </div>
    );
  return (
    <ul className="notas-papel rounded-2xl border divide-y divide-border/70 overflow-hidden" data-testid="cuaderno-biblia">
      {items.map((x) => (
        <li key={x.clave} className="p-3 flex items-start gap-3">
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
