// El editor de una nota del cuaderno: bloques que se tocan para escribir (como un cuaderno digital moderno, pensado
// para el teléfono). Enter crea el bloque siguiente (las listas siguen siendo listas), borrar en un bloque vacío lo
// quita, «/» abre el menú de bloques y Tab da sangría a las listas. La barra tiene el tipo de bloque, negrita, cursiva,
// resaltar, dictar con la voz, insertar un versículo, plantillas, deshacer y mover. Se guarda solo (api.ts).
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "wouter";
import {
  ArrowDown, ArrowUp, BookOpen, Bold, CheckSquare, Cloud, CloudOff, Heading1, Heading2, Highlighter, Italic, LayoutTemplate, Lightbulb, List, ListOrdered,
  Loader2, Mic, MicOff, Minus, Plus, Quote, Trash2, Type, Undo2, AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { PLANTILLAS, bloque, citaEscrita, type BloqueCuaderno, type NotaCompleta, type TipoBloque } from "@shared/cuaderno";
import { citaVisible } from "@shared/citas";
import { useNotaEditable, type EstadoGuardado } from "./api";
import { TextoCuaderno, TextoDeCita, fondoDeColor, type AlAbrirCita } from "./texto";

const TIPOS: { t: TipoBloque; nombre: string; icono: React.ComponentType<{ className?: string }>; ayuda: string }[] = [
  { t: "texto", nombre: "Texto", icono: Type, ayuda: "Escribe aquí…" },
  { t: "titulo", nombre: "Título", icono: Heading1, ayuda: "Título" },
  { t: "subtitulo", nombre: "Subtítulo", icono: Heading2, ayuda: "Subtítulo" },
  { t: "lista", nombre: "Lista", icono: List, ayuda: "Elemento de la lista" },
  { t: "numerada", nombre: "Lista numerada", icono: ListOrdered, ayuda: "Elemento numerado" },
  { t: "tarea", nombre: "Tarea", icono: CheckSquare, ayuda: "Algo por hacer" },
  { t: "cita", nombre: "Cita", icono: Quote, ayuda: "Una frase para recordar" },
  { t: "versiculo", nombre: "Versículo", icono: BookOpen, ayuda: "Lo que te enseña este versículo (opcional)" },
  { t: "aviso", nombre: "Idea importante", icono: Lightbulb, ayuda: "Una idea importante" },
  { t: "resaltado", nombre: "Resaltado", icono: Highlighter, ayuda: "Un texto resaltado" },
  { t: "separador", nombre: "Separador", icono: Minus, ayuda: "" },
];
const POR_TIPO = Object.fromEntries(TIPOS.map((x) => [x.t, x])) as Partial<Record<TipoBloque, (typeof TIPOS)[number]>>;
/**
 * El nombre, el ícono y la ayuda de un tipo de bloque. Un tipo que el editor no conozca se muestra como texto: una nota
 * nunca debe dejar de abrirse (antes, un bloque «resaltado» rompía el editor y dejaba la página sin salida).
 */
const tipoDe = (t: TipoBloque) => POR_TIPO[t] ?? TIPOS[0];
const SIGUE_IGUAL = new Set<TipoBloque>(["lista", "numerada", "tarea"]);

function EstadoChip({ estado }: { estado: EstadoGuardado }) {
  const m: Record<EstadoGuardado, [string, React.ReactNode]> = {
    guardado: ["Guardado", <Cloud key="i" className="w-3.5 h-3.5" />],
    guardando: ["Guardando…", <Loader2 key="i" className="w-3.5 h-3.5 animate-spin" />],
    pendiente: ["Sin guardar todavía", <Loader2 key="i" className="w-3.5 h-3.5" />],
    "sin-conexion": ["Sin conexión: se guardará al volver", <CloudOff key="i" className="w-3.5 h-3.5" />],
    conflicto: ["Esta nota cambió en otro equipo: lo tuyo quedó como copia", <AlertTriangle key="i" className="w-3.5 h-3.5" />],
    error: ["No se pudo guardar: lo tuyo sigue en este equipo", <AlertTriangle key="i" className="w-3.5 h-3.5" />],
  };
  const [texto, icono] = m[estado];
  const malo = estado === "sin-conexion" || estado === "conflicto" || estado === "error";
  return (
    <span className={`inline-flex items-center gap-1 text-xs ${malo ? "text-amber-700 dark:text-amber-300" : "text-muted-foreground"}`} role="status" data-testid="cuaderno-estado">
      {icono} {texto}
    </span>
  );
}

/** El reconocimiento de voz del navegador (Chrome, Edge, Safari): para dictar en lugar de escribir. */
function reconocedor(): any | null {
  const w = window as any;
  const SR = w.SpeechRecognition || w.webkitSpeechRecognition;
  if (!SR) return null;
  const r = new SR();
  r.lang = "es-ES";
  r.continuous = true;
  r.interimResults = false;
  return r;
}

type Props = {
  nota: NotaCompleta;
  /** En el panel de la lección: sin título grande. */
  compacto?: boolean;
  alAbrirCita?: AlAbrirCita;
  alGuardar?: (n: NotaCompleta) => void;
  /** Para agregar bloques desde afuera (lo resaltado en una lección). */
  registrarAgregar?: (f: ((bloques: BloqueCuaderno[]) => void) | null) => void;
};

export function EditorNota({ nota: inicial, compacto, alAbrirCita, alGuardar, registrarAgregar }: Props) {
  const { toast } = useToast();
  const { nota, estado, cambiar } = useNotaEditable(inicial, alGuardar);
  const [enfocado, setEnfocado] = useState<string | null>(null);
  const [cursorAlFinal, setCursorAlFinal] = useState(true);
  const [menuBarra, setMenuBarra] = useState<string | null>(null);
  const historia = useRef<BloqueCuaderno[][]>([]);
  const areas = useRef(new Map<string, HTMLTextAreaElement>());
  const [dictando, setDictando] = useState(false);
  const voz = useRef<any>(null);
  const puedeDictar = useMemo(() => typeof window !== "undefined" && !!((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition), []);

  const bloques = nota?.bloques ?? [];
  const setBloques = (f: (b: BloqueCuaderno[]) => BloqueCuaderno[], conHistoria = true) =>
    cambiar((n) => {
      if (conHistoria) {
        historia.current.push(n.bloques);
        if (historia.current.length > 60) historia.current.shift();
      }
      return { ...n, bloques: f(n.bloques) };
    });

  // lo que se agrega desde afuera (lo copiado de una lección) entra al final de la nota abierta
  useEffect(() => {
    registrarAgregar?.((nuevos) => setBloques((b) => [...b.filter((x) => x.t !== "texto" || x.texto.trim() || b.length > 1), ...nuevos]));
    return () => registrarAgregar?.(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registrarAgregar, nota?.id]);

  // al enfocar un bloque, el cursor va al final (o al principio, al unir dos bloques)
  useEffect(() => {
    if (!enfocado) return;
    const a = areas.current.get(enfocado);
    if (!a) return;
    a.focus();
    const p = cursorAlFinal ? a.value.length : 0;
    a.setSelectionRange(p, p);
  }, [enfocado, cursorAlFinal]);

  useEffect(() => () => voz.current?.stop?.(), []);

  if (!nota) return null;

  const indice = (id: string) => bloques.findIndex((b) => b.id === id);
  const enfocar = (id: string | null, alFinal = true) => {
    setCursorAlFinal(alFinal);
    setEnfocado(id);
  };
  const cambiarBloque = (id: string, f: (b: BloqueCuaderno) => BloqueCuaderno, conHistoria = false) =>
    setBloques((bs) => bs.map((b) => (b.id === id ? f(b) : b)), conHistoria);
  const insertarDespues = (id: string | null, nuevo: BloqueCuaderno) => {
    setBloques((bs) => {
      const i = id ? bs.findIndex((b) => b.id === id) : bs.length - 1;
      const out = [...bs];
      out.splice(i + 1, 0, nuevo);
      return out;
    });
    enfocar(nuevo.t === "separador" ? null : nuevo.id, true);
  };
  const quitar = (id: string) => {
    const i = indice(id);
    setBloques((bs) => bs.filter((b) => b.id !== id));
    const anterior = bloques[i - 1];
    enfocar(anterior && anterior.t !== "separador" ? anterior.id : null, true);
  };
  const mover = (id: string, d: -1 | 1) => {
    setBloques((bs) => {
      const i = bs.findIndex((b) => b.id === id);
      const j = i + d;
      if (i < 0 || j < 0 || j >= bs.length) return bs;
      const out = [...bs];
      [out[i], out[j]] = [out[j], out[i]];
      return out;
    });
  };
  const convertir = (id: string, t: TipoBloque) => {
    cambiarBloque(id, (b) => ({ ...b, t, texto: b.texto.replace(/^\/\S*$/, ""), ref: t === "versiculo" ? b.ref ?? "" : b.ref, hecho: t === "tarea" ? !!b.hecho : undefined, color: t === "aviso" ? b.color ?? "naranja" : b.color }), true);
    setMenuBarra(null);
    if (t === "separador") {
      const nuevo = bloque("texto");
      insertarDespues(id, nuevo);
    } else enfocar(id, true);
  };
  const deshacer = () => {
    const prev = historia.current.pop();
    if (prev) cambiar((n) => ({ ...n, bloques: prev }));
  };

  /** Envuelve lo seleccionado del bloque enfocado con una marca (**…**, _…_, ==…==). */
  const marcar = (m: string) => {
    if (!enfocado) return;
    const a = areas.current.get(enfocado);
    if (!a) return;
    const { selectionStart: s, selectionEnd: e, value } = a;
    const sel = value.slice(s, e) || "texto";
    const nuevo = value.slice(0, s) + m + sel + m + value.slice(e);
    cambiarBloque(enfocado, (b) => ({ ...b, texto: nuevo }), true);
    requestAnimationFrame(() => {
      a.focus();
      a.setSelectionRange(s + m.length, s + m.length + sel.length);
    });
  };

  const dictar = () => {
    if (dictando) {
      voz.current?.stop?.();
      setDictando(false);
      return;
    }
    const r = reconocedor();
    if (!r) return;
    let destino = enfocado;
    if (!destino) {
      const nuevo = bloque("texto");
      insertarDespues(null, nuevo);
      destino = nuevo.id;
    }
    r.onresult = (ev: any) => {
      const dicho = Array.from(ev.results as ArrayLike<any>)
        .slice(ev.resultIndex)
        .filter((x: any) => x.isFinal)
        .map((x: any) => x[0].transcript)
        .join(" ")
        .trim();
      if (dicho && destino) cambiarBloque(destino, (b) => ({ ...b, texto: `${b.texto}${b.texto && !/\s$/.test(b.texto) ? " " : ""}${dicho}` }));
    };
    r.onerror = (ev: any) => {
      setDictando(false);
      if (ev?.error === "not-allowed") toast({ title: "Sin permiso para el micrófono", description: "Permite el micrófono en tu navegador para dictar.", variant: "destructive" });
    };
    r.onend = () => setDictando(false);
    voz.current = r;
    try {
      r.start();
      setDictando(true);
    } catch {
      setDictando(false);
    }
  };

  const plantilla = (id: string) => {
    const p = PLANTILLAS.find((x) => x.id === id);
    if (!p) return;
    const vacia = bloques.every((b) => !b.texto.trim() && !b.ref);
    setBloques((bs) => (vacia ? p.bloques() : [...bs, ...p.bloques()]));
    toast({ title: `Plantilla: ${p.nombre}`, description: p.para });
  };

  const alTeclear = (e: React.KeyboardEvent<HTMLTextAreaElement>, b: BloqueCuaderno) => {
    const a = e.currentTarget;
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
      e.preventDefault();
      deshacer();
      return;
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") {
      e.preventDefault();
      marcar("**");
      return;
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "i") {
      e.preventDefault();
      marcar("_");
      return;
    }
    if (e.key === "Enter" && !e.shiftKey && b.t !== "versiculo") {
      e.preventDefault();
      if (SIGUE_IGUAL.has(b.t) && !b.texto.trim()) {
        convertir(b.id, "texto");
        return;
      }
      const corte = a.selectionStart;
      const resto = b.texto.slice(corte);
      cambiarBloque(b.id, (x) => ({ ...x, texto: x.texto.slice(0, corte) }), true);
      const nuevo = bloque(SIGUE_IGUAL.has(b.t) ? b.t : "texto", resto, b.nivel ? { nivel: b.nivel } : {});
      setCursorAlFinal(false);
      setBloques((bs) => {
        const i = bs.findIndex((x) => x.id === b.id);
        const out = [...bs];
        out.splice(i + 1, 0, nuevo);
        return out;
      }, false);
      setEnfocado(nuevo.id);
      return;
    }
    if (e.key === "Backspace" && a.selectionStart === 0 && a.selectionEnd === 0) {
      const i = indice(b.id);
      if (!b.texto && bloques.length > 1) {
        e.preventDefault();
        quitar(b.id);
        return;
      }
      const prev = bloques[i - 1];
      if (b.texto && prev && !["separador", "versiculo"].includes(prev.t)) {
        e.preventDefault();
        const largo = prev.texto.length;
        setBloques((bs) => bs.filter((x) => x.id !== b.id).map((x) => (x.id === prev.id ? { ...x, texto: x.texto + b.texto } : x)));
        setEnfocado(prev.id);
        setCursorAlFinal(true);
        requestAnimationFrame(() => areas.current.get(prev.id)?.setSelectionRange(largo, largo));
        return;
      }
    }
    if (e.key === "Tab" && SIGUE_IGUAL.has(b.t)) {
      e.preventDefault();
      cambiarBloque(b.id, (x) => ({ ...x, nivel: Math.max(0, Math.min(2, (x.nivel ?? 0) + (e.shiftKey ? -1 : 1))) || undefined }), true);
      return;
    }
    if (e.key === "ArrowUp" && a.selectionStart === 0) {
      const prev = bloques[indice(b.id) - 1];
      if (prev && prev.t !== "separador") {
        e.preventDefault();
        enfocar(prev.id, true);
      }
    }
    if (e.key === "ArrowDown" && a.selectionStart === a.value.length) {
      const sig = bloques[indice(b.id) + 1];
      if (sig && sig.t !== "separador") {
        e.preventDefault();
        enfocar(sig.id, false);
      }
    }
  };

  // el número de cada bloque de lista numerada (se reinicia al cortarse la lista)
  const numeros = new Map<string, number>();
  let n = 0;
  for (const b of bloques) {
    if (b.t === "numerada") numeros.set(b.id, ++n);
    else n = 0;
  }
  const actual = enfocado ? bloques.find((b) => b.id === enfocado) : undefined;

  return (
    <div className="relative" data-testid="cuaderno-editor">
      {/* la barra: arriba y fija mientras se escribe (en el teléfono el teclado no la tapa) */}
      <div className="sticky top-0 z-20 -mx-1 px-1 py-1.5 bg-background/95 backdrop-blur border-b border-border/60 flex items-center gap-0.5 overflow-x-auto" role="toolbar" aria-label="Herramientas de la nota">
        <DropdownMenu open={menuBarra === "tipo"} onOpenChange={(o) => setMenuBarra(o ? "tipo" : null)}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="shrink-0" disabled={!actual} title="Tipo de bloque" data-testid="cuaderno-tipo">
              {actual ? (() => { const I = tipoDe(actual.t).icono; return <I className="w-4 h-4" />; })() : <Type className="w-4 h-4" />}
              <span className="ml-1 hidden sm:inline">{actual ? tipoDe(actual.t).nombre : "Bloque"}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Convertir en</DropdownMenuLabel>
            {TIPOS.map((x) => (
              <DropdownMenuItem key={x.t} onSelect={() => actual && convertir(actual.id, x.t)}>
                <x.icono className="w-4 h-4 mr-2" /> {x.nombre}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="ghost" size="icon" className="shrink-0 h-8 w-8" onMouseDown={(e) => e.preventDefault()} onClick={() => marcar("**")} disabled={!actual} title="Negrita (Ctrl+B)" aria-label="Negrita"><Bold className="w-4 h-4" /></Button>
        <Button variant="ghost" size="icon" className="shrink-0 h-8 w-8" onMouseDown={(e) => e.preventDefault()} onClick={() => marcar("_")} disabled={!actual} title="Cursiva (Ctrl+I)" aria-label="Cursiva"><Italic className="w-4 h-4" /></Button>
        <Button variant="ghost" size="icon" className="shrink-0 h-8 w-8" onMouseDown={(e) => e.preventDefault()} onClick={() => marcar("==")} disabled={!actual} title="Resaltar" aria-label="Resaltar"><Highlighter className="w-4 h-4" /></Button>
        <Button variant="ghost" size="icon" className="shrink-0 h-8 w-8" onClick={() => insertarDespues(enfocado, bloque("versiculo", "", { ref: "" }))} title="Insertar un versículo" aria-label="Insertar un versículo" data-testid="cuaderno-versiculo"><BookOpen className="w-4 h-4" /></Button>
        {puedeDictar && (
          <Button variant={dictando ? "default" : "ghost"} size="icon" className={`shrink-0 h-8 w-8 ${dictando ? "bg-red-600 hover:bg-red-700 text-white" : ""}`} onClick={dictar} title={dictando ? "Dejar de dictar" : "Dictar con la voz"} aria-label={dictando ? "Dejar de dictar" : "Dictar con la voz"} data-testid="cuaderno-dictar">
            {dictando ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </Button>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="shrink-0 h-8 w-8" title="Plantillas de estudio" aria-label="Plantillas de estudio" data-testid="cuaderno-plantillas"><LayoutTemplate className="w-4 h-4" /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="max-w-[min(22rem,90vw)]">
            <DropdownMenuLabel>Plantillas de estudio</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {PLANTILLAS.map((p) => (
              <DropdownMenuItem key={p.id} onSelect={() => plantilla(p.id)} className="flex-col items-start">
                <span className="font-medium">{p.nombre}</span>
                <span className="text-xs text-muted-foreground whitespace-normal">{p.para}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="ghost" size="icon" className="shrink-0 h-8 w-8" onClick={deshacer} disabled={!historia.current.length} title="Deshacer (Ctrl+Z)" aria-label="Deshacer"><Undo2 className="w-4 h-4" /></Button>
        <span className="mx-1 h-5 w-px bg-border shrink-0" />
        <Button variant="ghost" size="icon" className="shrink-0 h-8 w-8" onMouseDown={(e) => e.preventDefault()} onClick={() => actual && mover(actual.id, -1)} disabled={!actual} title="Subir el bloque" aria-label="Subir el bloque"><ArrowUp className="w-4 h-4" /></Button>
        <Button variant="ghost" size="icon" className="shrink-0 h-8 w-8" onMouseDown={(e) => e.preventDefault()} onClick={() => actual && mover(actual.id, 1)} disabled={!actual} title="Bajar el bloque" aria-label="Bajar el bloque"><ArrowDown className="w-4 h-4" /></Button>
        <Button variant="ghost" size="icon" className="shrink-0 h-8 w-8" onMouseDown={(e) => e.preventDefault()} onClick={() => actual && quitar(actual.id)} disabled={!actual} title="Eliminar el bloque" aria-label="Eliminar el bloque"><Trash2 className="w-4 h-4" /></Button>
        <span className="ml-auto pl-2 shrink-0"><EstadoChip estado={estado} /></span>
      </div>

      {!compacto && (
        <input
          value={nota.titulo}
          onChange={(e) => cambiar((x) => ({ ...x, titulo: e.target.value.slice(0, 160) }))}
          placeholder="Título de la nota"
          className="w-full bg-transparent font-display text-2xl md:text-3xl font-bold mt-4 mb-2 outline-none placeholder:text-muted-foreground/50"
          aria-label="Título de la nota"
          data-testid="cuaderno-titulo"
        />
      )}
      {(nota.leccionId || nota.materiaId) && !compacto && (
        <p className="text-xs text-muted-foreground mb-3">
          {nota.leccionId ? (
            <>De la lección <Link href={`/academia/leccion/${nota.leccionId}`} className="underline">{nota.leccionTitulo ?? nota.leccionId}</Link>{nota.materiaTitulo ? ` · ${nota.materiaTitulo}` : ""}</>
          ) : (
            <>De la materia <Link href={`/academia/materia/${nota.materiaId}`} className="underline">{nota.materiaTitulo ?? nota.materiaId}</Link></>
          )}
        </p>
      )}

      <div className="mt-2 space-y-0.5" data-testid="cuaderno-bloques">
        {bloques.map((b) => (
          <BloqueEditable
            key={b.id}
            b={b}
            numero={numeros.get(b.id)}
            enfocado={enfocado === b.id}
            alEnfocar={() => enfocar(b.id, true)}
            alCambiar={(f) => cambiarBloque(b.id, f)}
            alTeclear={(e) => alTeclear(e, b)}
            alElegirTipo={(t) => convertir(b.id, t)}
            registrar={(el) => {
              if (el) areas.current.set(b.id, el);
              else areas.current.delete(b.id);
            }}
            alAbrirCita={alAbrirCita}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={() => insertarDespues(bloques.length ? bloques[bloques.length - 1].id : null, bloque("texto"))}
        className="mt-2 w-full text-left text-sm text-muted-foreground hover:text-foreground rounded-lg px-2 py-2 hover:bg-muted/60 inline-flex items-center gap-1.5"
        data-testid="cuaderno-agregar"
      >
        <Plus className="w-4 h-4" /> Agregar un bloque <span className="text-xs opacity-70 hidden sm:inline">(o escribe «/» en un bloque vacío)</span>
      </button>
    </div>
  );
}

type PropsBloque = {
  b: BloqueCuaderno;
  numero?: number;
  enfocado: boolean;
  alEnfocar: () => void;
  alCambiar: (f: (b: BloqueCuaderno) => BloqueCuaderno) => void;
  alTeclear: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  alElegirTipo: (t: TipoBloque) => void;
  registrar: (el: HTMLTextAreaElement | null) => void;
  alAbrirCita?: AlAbrirCita;
};

const ESTILO: Partial<Record<TipoBloque, string>> = {
  titulo: "font-display text-2xl font-bold leading-snug",
  subtitulo: "font-display text-lg font-semibold leading-snug text-orange-800 dark:text-orange-200",
  cita: "italic",
};

function BloqueEditable({ b, numero, enfocado, alEnfocar, alCambiar, alTeclear, alElegirTipo, registrar, alAbrirCita }: PropsBloque) {
  const area = useRef<HTMLTextAreaElement | null>(null);
  const ajustar = () => {
    const a = area.current;
    if (!a) return;
    a.style.height = "auto";
    a.style.height = `${a.scrollHeight}px`;
  };
  useEffect(ajustar, [enfocado, b.texto]);
  const sangria = b.nivel ? { paddingLeft: `${b.nivel * 1.25}rem` } : undefined;
  const menuBarra = enfocado && /^\/\S*$/.test(b.texto);
  const filtro = b.texto.slice(1).toLowerCase();

  if (b.t === "separador") {
    return <hr className="my-4 border-orange-500/30" data-tipo="separador" />;
  }

  const cajaTexto = (
    <textarea
      ref={(el) => {
        area.current = el;
        registrar(el);
      }}
      value={b.texto}
      rows={1}
      maxLength={6000}
      onChange={(e) => alCambiar((x) => ({ ...x, texto: e.target.value }))}
      onKeyDown={alTeclear}
      onInput={ajustar}
      placeholder={tipoDe(b.t).ayuda}
      className={`w-full resize-none bg-transparent outline-none leading-7 text-[16px] placeholder:text-muted-foreground/60 ${ESTILO[b.t] ?? ""}`}
      aria-label={tipoDe(b.t).nombre}
      data-testid="cuaderno-bloque-texto"
    />
  );
  const vista = (
    <div
      role="button"
      tabIndex={0}
      onClick={alEnfocar}
      onKeyDown={(e) => {
        if (e.key === "Enter") alEnfocar();
      }}
      className={`w-full cursor-text whitespace-pre-wrap break-words leading-7 text-[16px] min-h-7 ${ESTILO[b.t] ?? ""}`}
    >
      <TextoCuaderno texto={b.texto} ayuda={tipoDe(b.t).ayuda} alAbrirCita={alAbrirCita} />
    </div>
  );
  const contenido = enfocado ? cajaTexto : vista;

  let cuerpo: React.ReactNode;
  switch (b.t) {
    case "lista":
      cuerpo = (
        <div className="flex gap-2" style={sangria}>
          <span className="text-orange-500 leading-7 select-none">{b.nivel === 1 ? "◦" : b.nivel === 2 ? "▪" : "•"}</span>
          <div className="flex-1 min-w-0">{contenido}</div>
        </div>
      );
      break;
    case "numerada":
      cuerpo = (
        <div className="flex gap-2" style={sangria}>
          <span className="text-orange-600 dark:text-orange-300 font-semibold leading-7 select-none tabular-nums min-w-[1.5rem] text-right">{numero}.</span>
          <div className="flex-1 min-w-0">{contenido}</div>
        </div>
      );
      break;
    case "tarea":
      cuerpo = (
        <div className="flex gap-2 items-start" style={sangria}>
          <input
            type="checkbox"
            checked={!!b.hecho}
            onChange={(e) => alCambiar((x) => ({ ...x, hecho: e.target.checked }))}
            className="mt-1.5 h-4 w-4 accent-orange-600 shrink-0"
            aria-label={b.hecho ? "Hecha" : "Por hacer"}
          />
          <div className={`flex-1 min-w-0 ${b.hecho && !enfocado ? "line-through text-muted-foreground" : ""}`}>{contenido}</div>
        </div>
      );
      break;
    case "cita":
      cuerpo = (
        <blockquote className="border-l-4 border-orange-500/60 pl-3 py-0.5">
          {contenido}
          {b.fuente && <FuenteDe b={b} />}
        </blockquote>
      );
      break;
    case "aviso":
      cuerpo = (
        <div className={`rounded-xl px-3 py-2 flex gap-2 ${fondoDeColor(b.color ?? "naranja")}`}>
          <Lightbulb className="w-4 h-4 mt-1.5 shrink-0 text-orange-700 dark:text-orange-300" />
          <div className="flex-1 min-w-0">{contenido}</div>
        </div>
      );
      break;
    case "resaltado":
      cuerpo = (
        <div className={`rounded-lg px-2 py-1 ${fondoDeColor(b.color)}`}>
          {contenido}
          {b.fuente && <FuenteDe b={b} />}
        </div>
      );
      break;
    case "versiculo":
      cuerpo = <BloqueVersiculo b={b} enfocado={enfocado} alCambiar={alCambiar} alEnfocar={alEnfocar} contenido={contenido} alAbrirCita={alAbrirCita} />;
      break;
    default:
      cuerpo = contenido;
  }

  return (
    <div className={`relative rounded-lg px-2 py-0.5 ${enfocado ? "bg-orange-500/5 ring-1 ring-orange-500/20" : "hover:bg-muted/40"}`} data-tipo={b.t}>
      {cuerpo}
      {menuBarra && (
        <div className="absolute left-2 top-full z-30 mt-1 w-64 max-w-[85vw] rounded-xl border bg-popover p-1 shadow-lg" role="listbox" aria-label="Elegir el tipo de bloque">
          {TIPOS.filter((x) => !filtro || x.nombre.toLowerCase().includes(filtro)).map((x) => (
            <button
              key={x.t}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => alElegirTipo(x.t)}
              className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-muted flex items-center gap-2 text-sm"
            >
              <x.icono className="w-4 h-4 text-orange-600" /> {x.nombre}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function FuenteDe({ b }: { b: BloqueCuaderno }) {
  if (!b.fuente) return null;
  if (b.fuente.tipo === "leccion")
    return (
      <p className="text-xs text-muted-foreground mt-0.5 not-italic">
        — de la lección <Link href={`/academia/leccion/${b.fuente.id}`} className="underline">{b.fuente.titulo}</Link>
      </p>
    );
  return <p className="text-xs text-muted-foreground mt-0.5 not-italic">— {b.fuente.ref}</p>;
}

function BloqueVersiculo({
  b, enfocado, alCambiar, alEnfocar, contenido, alAbrirCita,
}: { b: BloqueCuaderno; enfocado: boolean; alCambiar: PropsBloque["alCambiar"]; alEnfocar: () => void; contenido: React.ReactNode; alAbrirCita?: AlAbrirCita }) {
  const cita = b.ref ? citaEscrita(b.ref) : null;
  return (
    <div className="rounded-xl border border-orange-500/30 bg-orange-500/5 px-3 py-2">
      <div className="flex items-center gap-2">
        <BookOpen className="w-4 h-4 text-orange-600 shrink-0" />
        <input
          value={b.ref ?? ""}
          onChange={(e) => alCambiar((x) => ({ ...x, ref: e.target.value.slice(0, 40) }))}
          onFocus={alEnfocar}
          placeholder="Escribe la cita: Juan 3:16"
          className="flex-1 bg-transparent outline-none font-semibold text-[15px] placeholder:font-normal placeholder:text-muted-foreground/60"
          aria-label="La cita del versículo"
          data-testid="cuaderno-versiculo-ref"
        />
        {cita && (
          alAbrirCita ? (
            <button type="button" className="text-xs text-orange-700 dark:text-orange-300 hover:underline shrink-0" onClick={() => alAbrirCita(cita)}>Abrir</button>
          ) : (
            <a href={`/biblioteca?libro=${encodeURIComponent(cita.libro)}&cap=${cita.capitulo}`} className="text-xs text-orange-700 dark:text-orange-300 hover:underline shrink-0">Abrir</a>
          )
        )}
      </div>
      {cita ? (
        <div className="mt-1.5" data-testid="cuaderno-versiculo-texto">
          <span className="sr-only">{citaVisible(cita)}</span>
          <TextoDeCita cita={cita} />
        </div>
      ) : b.ref ? (
        <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">Escribe la cita así: Juan 3:16 o Romanos 5:1-5.</p>
      ) : null}
      {(enfocado || b.texto) && <div className="mt-1.5 border-t border-orange-500/20 pt-1.5">{contenido}</div>}
    </div>
  );
}
