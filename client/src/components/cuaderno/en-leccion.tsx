// El cuaderno dentro de una lección: al seleccionar un texto (con el dedo o el mouse) aparece una barra para
// resaltarlo en cinco colores, pasarlo al cuaderno o copiarlo; el botón «Cuaderno» abre la nota de esa lección, con el
// estilo de Notas: el título y el texto, sin elegir nada antes (si todavía no hay nota, se crea con lo primero que se
// escribe). Lo resaltado se ve pintado en la lección (marcas.tsx) y, como lo pasado al cuaderno, queda también en la
// nota de la lección: el aviso trae «Ver mi nota», que la abre justo en lo nuevo.
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import { ChevronLeft, Copy, ExternalLink, Highlighter, NotebookPen, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { COLORES, bloque, type BloqueCuaderno, type ColorCuaderno, type NotaCompleta, type ResaltadoLeccion } from "@shared/cuaderno";
import { agregarALeccion, borrarResaltado, cambiarResaltado, notaNueva, resaltar, useCuadernoLeccion } from "./api";
import { EditorNota } from "./editor";
import { fondoDeColor } from "./texto";
import type { Marca } from "./marcas";
import { seleccionExacta, vistaPrevia, type SeleccionExacta } from "./seleccion";

const PUNTO: Record<ColorCuaderno, string> = {
  amarillo: "bg-yellow-300",
  verde: "bg-emerald-300",
  azul: "bg-sky-300",
  rosa: "bg-pink-300",
  naranja: "bg-orange-300",
};

/** Los resaltados de la lección, por bloque (para pintarlos en el texto). */
export function useMarcasDeLeccion(leccionId: string, activo: boolean): Map<number, Marca[]> {
  const q = useCuadernoLeccion(leccionId, activo);
  return useMemo(() => {
    const m = new Map<number, Marca[]>();
    for (const r of q.data?.resaltados ?? []) m.set(r.bloque, [...(m.get(r.bloque) ?? []), { texto: r.texto, color: r.color }]);
    return m;
  }, [q.data]);
}

type Seleccion = SeleccionExacta;

const esperar = (ms: number) => new Promise((r) => window.setTimeout(r, ms));

export function CuadernoEnLeccion({ leccionId, leccionTitulo, contenedor }: { leccionId: string; leccionTitulo: string; contenedor: React.RefObject<HTMLElement | null> }) {
  const qc = useQueryClient();
  const { toast } = useToast();
  const q = useCuadernoLeccion(leccionId);
  const [abierto, setAbierto] = useState(false);
  const [pestana, setPestana] = useState<"nota" | "resaltados">("nota");
  const [sel, setSel] = useState<Seleccion | null>(null);
  const [alFinal, setAlFinal] = useState(false);
  const fin = useRef<HTMLDivElement | null>(null);
  const agregar = useRef<((b: BloqueCuaderno[]) => void) | null>(null);
  const ocultar = useRef<number | null>(null);
  const tactil = useMemo(() => typeof window !== "undefined" && !!window.matchMedia?.("(pointer: coarse)").matches, []);
  const clave = ["cuaderno", "leccion", leccionId];
  const nota = q.data?.nota ?? null;
  const resaltados = q.data?.resaltados ?? [];

  // lo seleccionado dentro del texto de la lección: el texto exacto de cada párrafo que toca (seleccion.ts)
  useEffect(() => {
    let t: number | null = null;
    const revisar = () => {
      const s = document.getSelection();
      const caja = contenedor.current;
      if (!s || s.isCollapsed || !s.rangeCount || !caja) {
        // al tocar la barra, la selección se pierde: la barra espera un momento
        if (ocultar.current == null) ocultar.current = window.setTimeout(() => {
          setSel(null);
          ocultar.current = null;
        }, 1500);
        return;
      }
      const nueva = seleccionExacta(s, caja);
      if (ocultar.current != null) {
        window.clearTimeout(ocultar.current);
        ocultar.current = null;
      }
      // una selección fuera del texto de la lección no deja viva la anterior
      setSel(nueva);
    };
    const alCambiar = () => {
      if (t) window.clearTimeout(t);
      t = window.setTimeout(revisar, 120);
    };
    document.addEventListener("selectionchange", alCambiar);
    return () => {
      document.removeEventListener("selectionchange", alCambiar);
      if (t) window.clearTimeout(t);
      if (ocultar.current) window.clearTimeout(ocultar.current);
    };
  }, [contenedor]);

  const terminar = () => {
    setSel(null);
    document.getSelection()?.removeAllRanges();
  };
  /** Abre la nota de la lección y baja hasta lo último que se guardó. */
  const verNota = () => {
    setPestana("nota");
    setAlFinal(true);
    setAbierto(true);
  };
  useEffect(() => {
    if (!abierto || !alFinal || !nota) return;
    const t = window.setTimeout(() => {
      fin.current?.scrollIntoView({ behavior: "smooth", block: "end" });
      setAlFinal(false);
    }, 350);
    return () => window.clearTimeout(t);
  }, [abierto, alFinal, nota]);
  const avisoGuardado = (titulo: string, lo?: string) =>
    toast({
      title: titulo,
      description: lo ? `${lo} Quedó en tu nota de «${leccionTitulo}», en Mi cuaderno.` : `Quedó en tu nota de «${leccionTitulo}», en Mi cuaderno.`,
      // con un botón, el aviso dura más (los demás se cierran a los 5 segundos)
      duration: 10_000,
      action: <ToastAction altText="Ver mi nota" onClick={verNota} data-testid="cuaderno-ver-nota">Ver mi nota</ToastAction>,
    });
  const conservar = () => {
    if (ocultar.current != null) {
      window.clearTimeout(ocultar.current);
      ocultar.current = null;
    }
  };

  const resaltarSel = async (color: ColorCuaderno) => {
    const s = sel;
    if (!s) return;
    terminar();
    // un resaltado por párrafo (el servidor guarda cada uno con su párrafo, para pintarlo en su lugar)
    const partes = s.partes.slice(0, 8);
    let hechos = 0;
    let ultimaNota: NotaCompleta | null = null;
    try {
      for (const p of partes) {
        if (hechos) await esperar(320);
        const { notaLeccion: notaDelServidor, ...r } = await resaltar({ leccionId, bloque: p.bloque, texto: p.texto.slice(0, 1200), color });
        qc.setQueryData(clave, (v: any) => (v ? { ...v, resaltados: [...v.resaltados, r], nota: notaDelServidor ?? v.nota } : { nota: notaDelServidor, resaltados: [r] }));
        if (notaDelServidor) ultimaNota = notaDelServidor;
        hechos++;
      }
      qc.invalidateQueries({ queryKey: ["cuaderno", "resaltados"] });
      qc.invalidateQueries({ queryKey: ["cuaderno", "lista"] });
      if (ultimaNota) avisoGuardado(hechos > 1 ? `${hechos} párrafos resaltados y guardados en tu nota` : "Resaltado y guardado en tu nota");
      if (s.partes.length > partes.length) toast({ title: "Se resaltaron los primeros 8 párrafos", description: "Para más, resalta por partes." });
    } catch (e: any) {
      toast({ title: hechos ? `Se resaltaron ${hechos} párrafos, pero no todos` : "No se pudo resaltar", description: e?.message, variant: "destructive" });
    }
  };
  const alCuaderno = async () => {
    const s = sel;
    if (!s) return;
    terminar();
    // el texto exacto, un bloque de cita por párrafo; la fuente (la lección) va en el último
    const bloques = s.partes.map((p, i) =>
      bloque("cita", p.texto.slice(0, 6000), i === s.partes.length - 1 ? { fuente: { tipo: "leccion", id: leccionId, titulo: leccionTitulo } } : {}),
    );
    const resumen = `«${vistaPrevia(s.texto, 90)}»`;
    if (agregar.current) {
      agregar.current(bloques);
      toast({ title: "Agregado a tu nota", description: `${resumen} quedó al final de la nota de esta lección.` });
      return;
    }
    try {
      const n = await agregarALeccion(leccionId, bloques);
      qc.setQueryData(clave, (v: any) => (v ? { ...v, nota: n } : { nota: n, resaltados: [] }));
      qc.invalidateQueries({ queryKey: ["cuaderno", "lista"] });
      avisoGuardado(s.partes.length > 1 ? `Guardaste ${s.partes.length} párrafos en tu cuaderno` : "Guardado en tu cuaderno", resumen);
    } catch (e: any) {
      toast({ title: "No se pudo agregar", description: e?.message, variant: "destructive" });
    }
  };
  const copiar = async () => {
    const s = sel;
    if (!s) return;
    terminar();
    try {
      await navigator.clipboard.writeText(`${s.texto}\n— ${leccionTitulo}`);
      toast({ title: "Copiado", description: "Pégalo donde quieras." });
    } catch {
      toast({ title: "No se pudo copiar", variant: "destructive" });
    }
  };

  // la nota de la lección todavía sin crear: el título es el de la lección y se crea con lo primero que se escriba
  const borrador = useMemo(() => notaNueva({ leccionId, titulo: leccionTitulo, leccionTitulo }), [leccionId, leccionTitulo]);
  const quitarResaltado = async (r: ResaltadoLeccion) => {
    await borrarResaltado(r.id);
    qc.setQueryData(clave, (v: any) => (v ? { ...v, resaltados: v.resaltados.filter((x: ResaltadoLeccion) => x.id !== r.id) } : v));
    qc.invalidateQueries({ queryKey: ["cuaderno", "resaltados"] });
  };
  const colorResaltado = async (r: ResaltadoLeccion, color: ColorCuaderno) => {
    const nuevo = await cambiarResaltado(r.id, { color });
    qc.setQueryData(clave, (v: any) => (v ? { ...v, resaltados: v.resaltados.map((x: ResaltadoLeccion) => (x.id === r.id ? nuevo : x)) } : v));
  };

  // la barra de lo seleccionado: junto al texto en la computadora; abajo, fija, en el teléfono (no tapa el menú del sistema)
  const estiloBarra: React.CSSProperties | undefined =
    sel && !tactil
      ? { left: Math.max(8, Math.min(window.innerWidth - 350, sel.rect.left + sel.rect.width / 2 - 170)), top: Math.max(8, sel.rect.top - 84) }
      : undefined;

  return (
    <>
      {/* en el body: la animación de entrada de la página (transform) no la mueve de su lugar */}
      {sel && createPortal(
        <div
          className={`fixed z-50 rounded-2xl border bg-popover shadow-xl px-2 pt-1.5 pb-1 ${tactil ? "left-3 right-3 bottom-24" : "w-[340px]"}`}
          style={estiloBarra}
          onPointerDown={conservar}
          onMouseDown={(e) => e.preventDefault()}
          role="toolbar"
          aria-label="Lo que seleccionaste"
          data-testid="cuaderno-barra-seleccion"
        >
          {/* lo que se va a guardar, antes de tocar un botón */}
          <p className={`px-1.5 text-muted-foreground leading-snug ${tactil ? "text-[13px]" : "text-xs"}`} data-testid="cuaderno-seleccion-vista">
            <span className="italic">«{vistaPrevia(sel.texto)}»</span>
            <span className="whitespace-nowrap"> · {sel.palabras} {sel.palabras === 1 ? "palabra" : "palabras"}{sel.partes.length > 1 ? ` en ${sel.partes.length} párrafos` : ""}</span>
          </p>
          <div className={`flex items-center gap-1 mt-0.5 ${tactil ? "justify-center" : ""}`}>
            <Highlighter className="w-4 h-4 text-muted-foreground mx-1" aria-hidden="true" />
            {COLORES.map((c) => (
              <button key={c} type="button" onClick={() => resaltarSel(c)} className={`w-6 h-6 rounded-full border border-black/10 ${PUNTO[c]}`} aria-label={`Resaltar en ${c}`} data-testid={`cuaderno-resaltar-${c}`} />
            ))}
            <span className="mx-1 h-5 w-px bg-border" />
            <Button size="sm" variant="ghost" onClick={alCuaderno} data-testid="cuaderno-al-cuaderno"><NotebookPen className="w-4 h-4 mr-1" /> Al cuaderno</Button>
            <Button size="sm" variant="ghost" onClick={copiar} aria-label="Copiar"><Copy className="w-4 h-4" /></Button>
            <Button size="sm" variant="ghost" onClick={terminar} aria-label="Cerrar"><X className="w-4 h-4" /></Button>
          </div>
        </div>,
        document.body,
      )}

      {/* fijo en una caja aparte: el botón con fuego lleva position: relative */}
      <div className={`fixed z-40 right-4 bottom-24 md:bottom-6 ${sel ? "hidden" : ""}`}>
        <Button onClick={() => setAbierto(true)} className="rounded-full shadow-lg fire-btn-primary h-12 px-5" data-testid="cuaderno-abrir" aria-label="Abrir mi cuaderno de esta lección">
          <NotebookPen className="w-5 h-5 mr-1.5" /> Cuaderno
          {resaltados.length > 0 && <span className="ml-1.5 rounded-full bg-white/25 px-1.5 text-xs">{resaltados.length}</span>}
        </Button>
      </div>

      <Sheet open={abierto} onOpenChange={setAbierto}>
        <SheetContent side="right" className="notas-papel notas-sistema w-full sm:max-w-xl overflow-y-auto p-4 sm:p-6" data-testid="cuaderno-panel">
          <SheetHeader className="text-left space-y-0">
            <div className="flex items-center gap-1 -ml-2 pr-8">
              <button type="button" onClick={() => setAbierto(false)} className="h-9 pl-1 pr-2 rounded-full inline-flex items-center text-[16px] text-amber-600 dark:text-amber-400 hover:bg-amber-500/10" data-testid="cuaderno-volver-leccion">
                <ChevronLeft className="w-6 h-6 -ml-0.5" /> Lección
              </button>
              <span className="flex-1" />
              {nota && (
                <Link href={`/academia/cuaderno?nota=${nota.id}`} className="h-9 px-2 rounded-full inline-flex items-center gap-1 text-sm text-amber-600 dark:text-amber-400 hover:bg-amber-500/10">
                  Mi cuaderno <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
            <SheetTitle className="sr-only">Mi nota de la lección {leccionTitulo}</SheetTitle>
          </SheetHeader>
          <div className="inline-flex w-full rounded-xl bg-muted/70 p-0.5 mt-2 mb-1" role="group" aria-label="Qué ver">
            {([["nota", "Mi nota"], ["resaltados", `Resaltados (${resaltados.length})`]] as const).map(([v, tx]) => (
              <button
                key={v}
                type="button"
                aria-pressed={pestana === v}
                onClick={() => setPestana(v)}
                className={`flex-1 h-8 rounded-[10px] text-sm transition ${pestana === v ? "bg-white dark:bg-[#48484a] shadow-sm font-semibold" : "text-muted-foreground hover:text-foreground"}`}
              >
                {tx}
              </button>
            ))}
          </div>

          {pestana === "nota" &&
            (q.isLoading ? (
              <p className="text-sm text-muted-foreground mt-3">Abriendo tu nota…</p>
            ) : (
              <EditorNota
                // la misma clave antes y después de crearse: no se pierde lo que se está escribiendo
                key={`leccion-${leccionId}`}
                nota={nota ?? borrador}
                compacto
                registrarAgregar={(f) => {
                  agregar.current = f;
                }}
                alGuardar={(r: NotaCompleta) => {
                  qc.setQueryData(clave, (v: any) => (v ? { ...v, nota: r } : { nota: r, resaltados: [] }));
                }}
              />
            ))}

          {pestana === "nota" && (
            <div ref={fin} className="mt-2 flex flex-wrap items-center gap-2 border-t border-border/60 pt-3">
              <button type="button" onClick={() => setAbierto(false)} className="h-10 px-4 rounded-full bg-amber-500 hover:bg-amber-600 text-white text-[15px] font-semibold" data-testid="cuaderno-listo">
                Volver a la lección
              </button>
              <span className="text-xs text-muted-foreground">Se guarda sola mientras escribes. Selecciona texto de la lección para pasarlo aquí.</span>
            </div>
          )}

          {pestana === "resaltados" &&
            (resaltados.length ? (
              <ul className="space-y-2 mt-2" data-testid="cuaderno-panel-resaltados">
                {resaltados.map((r) => (
                  <li key={r.id} className="rounded-xl border p-2">
                    <p className={`rounded-lg px-2 py-1 text-[15px] leading-7 ${fondoDeColor(r.color)}`}>{r.texto}</p>
                    <div className="flex items-center gap-1 mt-1.5">
                      {COLORES.map((c) => (
                        <button key={c} type="button" onClick={() => colorResaltado(r, c)} className={`w-5 h-5 rounded-full border ${PUNTO[c]} ${r.color === c ? "ring-2 ring-offset-1 ring-amber-500" : "border-black/10"}`} aria-label={`Cambiar a ${c}`} />
                      ))}
                      <span className="flex-1" />
                      <Button size="sm" variant="ghost" onClick={() => quitarResaltado(r)} aria-label="Quitar el resaltado"><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground mt-3">Selecciona un texto de la lección con el dedo o el mouse y elige un color.</p>
            ))}
        </SheetContent>
      </Sheet>
    </>
  );
}
