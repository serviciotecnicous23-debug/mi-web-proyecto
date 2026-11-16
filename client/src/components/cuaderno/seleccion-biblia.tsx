/**
 * Seleccionar un pedazo del capítulo en la Biblioteca y pasarlo al cuaderno: la barra (igual a la de las lecciones)
 * muestra lo que se va a guardar y crea una nota con el texto EXACTO, sin los números de versículo, y su cita
 * («Juan 3:16-17», de los versículos que toca la selección). Cada versículo del capítulo lleva `data-verso` y su texto
 * va en un `[data-texto]` (así los números no se cuelan en lo guardado).
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Copy, NotebookPen, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { bloque } from "@shared/cuaderno";
import { crearNota } from "./api";
import { limpiarTexto, vistaPrevia } from "./seleccion";

type SeleccionBiblia = { texto: string; desde: number; hasta: number; palabras: number; rect: DOMRect };

/** Lo seleccionado dentro del capítulo: el texto exacto de cada versículo que toca y el primero y el último. */
function seleccionDelCapitulo(sel: Selection | null, caja: HTMLElement | null): SeleccionBiblia | null {
  if (!sel || sel.isCollapsed || !sel.rangeCount || !caja) return null;
  const r = sel.getRangeAt(0);
  if (!r.intersectsNode(caja)) return null;
  const rango = r.cloneRange();
  if (!caja.contains(r.startContainer)) rango.setStart(caja, 0);
  if (!caja.contains(r.endContainer)) rango.setEnd(caja, caja.childNodes.length);
  if (rango.collapsed) return null;
  const trozos: string[] = [];
  let desde = 0;
  let hasta = 0;
  for (const v of Array.from(caja.querySelectorAll<HTMLElement>("[data-verso]"))) {
    const texto = v.querySelector<HTMLElement>("[data-texto]");
    if (!texto || !rango.intersectsNode(texto)) continue;
    const parte = document.createRange();
    parte.selectNodeContents(texto);
    if (rango.compareBoundaryPoints(Range.START_TO_START, parte) > 0) parte.setStart(rango.startContainer, rango.startOffset);
    if (rango.compareBoundaryPoints(Range.END_TO_END, parte) < 0) parte.setEnd(rango.endContainer, rango.endOffset);
    const t = limpiarTexto(parte.toString());
    if (!t) continue;
    const n = Number(v.getAttribute("data-verso"));
    if (!desde) desde = n;
    hasta = n;
    trozos.push(t);
  }
  const texto = trozos.join(" ").trim();
  if (texto.length < 2 || !desde) return null;
  return { texto, desde, hasta, palabras: texto.split(/\s+/).filter(Boolean).length, rect: rango.getBoundingClientRect() };
}

export function BarraSeleccionBiblia({ contenedor, libro, capitulo, alAbrirNota }: {
  contenedor: React.RefObject<HTMLElement | null>;
  /** El nombre del libro como se escribe en la cita («Juan», «1 Corintios»). */
  libro: string;
  capitulo: number;
  alAbrirNota?: (id: number) => void;
}) {
  const { toast } = useToast();
  const [sel, setSel] = useState<SeleccionBiblia | null>(null);
  const ocultar = useRef<number | null>(null);
  const tactil = useMemo(() => typeof window !== "undefined" && !!window.matchMedia?.("(pointer: coarse)").matches, []);

  useEffect(() => {
    let t: number | null = null;
    const revisar = () => {
      const s = document.getSelection();
      if (!s || s.isCollapsed) {
        if (ocultar.current == null) ocultar.current = window.setTimeout(() => {
          setSel(null);
          ocultar.current = null;
        }, 1500);
        return;
      }
      if (ocultar.current != null) {
        window.clearTimeout(ocultar.current);
        ocultar.current = null;
      }
      setSel(seleccionDelCapitulo(s, contenedor.current));
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
  // al cambiar de capítulo, la barra se va
  useEffect(() => setSel(null), [libro, capitulo]);

  if (!sel) return null;
  const cita = `${libro} ${capitulo}:${sel.desde}${sel.hasta > sel.desde ? `-${sel.hasta}` : ""}`;
  const terminar = () => {
    setSel(null);
    document.getSelection()?.removeAllRanges();
  };
  const conservar = () => {
    if (ocultar.current != null) {
      window.clearTimeout(ocultar.current);
      ocultar.current = null;
    }
  };
  const alCuaderno = async () => {
    const s = sel;
    terminar();
    try {
      const n = await crearNota({ titulo: cita, bloques: [bloque("cita", s.texto.slice(0, 6000), { fuente: { tipo: "biblia", ref: cita } }), bloque("texto")] });
      toast({
        title: "Guardado en tu cuaderno",
        description: `«${vistaPrevia(s.texto, 80)}» (${cita}). Escribe debajo lo que Dios te enseña.`,
        duration: 10_000,
        action: alAbrirNota ? <ToastAction altText="Abrir la nota" onClick={() => alAbrirNota(n.id)}>Abrir la nota</ToastAction> : undefined,
      });
    } catch (e: any) {
      toast({ title: "No se pudo guardar", description: e?.message ?? "Inténtalo otra vez.", variant: "destructive" });
    }
  };
  const copiar = async () => {
    const s = sel;
    terminar();
    try {
      await navigator.clipboard.writeText(`«${s.texto}» (${cita}, RV1960)`);
      toast({ title: "Copiado", description: "Con su cita, listo para pegar." });
    } catch {
      toast({ title: "No se pudo copiar", variant: "destructive" });
    }
  };
  const estilo: React.CSSProperties | undefined = tactil
    ? undefined
    : { left: Math.max(8, Math.min(window.innerWidth - 350, sel.rect.left + sel.rect.width / 2 - 170)), top: Math.max(8, sel.rect.top - 84) };

  return createPortal(
    <div
      className={`fixed z-50 rounded-2xl border bg-popover shadow-xl px-2 pt-1.5 pb-1 ${tactil ? "left-3 right-3 bottom-24" : "w-[340px]"}`}
      style={estilo}
      onPointerDown={conservar}
      onMouseDown={(e) => e.preventDefault()}
      role="toolbar"
      aria-label="Lo que seleccionaste del capítulo"
      data-testid="biblia-barra-seleccion"
    >
      <p className={`px-1.5 text-muted-foreground leading-snug ${tactil ? "text-[13px]" : "text-xs"}`} data-testid="biblia-seleccion-vista">
        <span className="font-semibold text-foreground">{cita}</span> · <span className="italic">«{vistaPrevia(sel.texto, 60)}»</span>
      </p>
      <div className={`flex items-center gap-1 mt-0.5 ${tactil ? "justify-center" : ""}`}>
        <Button size="sm" variant="ghost" onClick={alCuaderno} data-testid="biblia-al-cuaderno"><NotebookPen className="w-4 h-4 mr-1" /> Al cuaderno</Button>
        <Button size="sm" variant="ghost" onClick={copiar} data-testid="biblia-copiar"><Copy className="w-4 h-4 mr-1" /> Copiar con la cita</Button>
        <Button size="sm" variant="ghost" onClick={terminar} aria-label="Cerrar"><X className="w-4 h-4" /></Button>
      </div>
    </div>,
    document.body,
  );
}
