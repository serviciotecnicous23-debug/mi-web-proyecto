// El editor de una nota del cuaderno, con el estilo de Notas de Apple: el título arriba, la fecha y el texto que se escribe
// de corrido (cada renglón es un bloque, pero no se ven cajas ni formularios). Enter sigue la lista, borrar en un renglón
// vacío lo quita y Tab da sangría. La barra tiene «Aa» (el estilo del renglón: título, encabezado, cuerpo o cita; negrita,
// cursiva, subrayado, tachado y resaltado; las listas y la sangría), la lista de tareas, insertar (un versículo, una idea
// importante o una línea) y deshacer. Se guarda solo (api.ts): una nota nueva se crea con lo primero que se escribe.
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import {
  AlertTriangle, Bold, BookOpen, Check, Cloud, CloudOff, Highlighter, Italic, Lightbulb, List, ListChecks, ListIndentDecrease, ListIndentIncrease,
  ListOrdered, Loader2, Minus, Plus, Strikethrough, TextQuote, Underline, Undo2,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { bloque, citaEscrita, type BloqueCuaderno, type NotaCompleta, type TipoBloque } from "@shared/cuaderno";
import { citaVisible } from "@shared/citas";
import { useNotaEditable, type EstadoGuardado } from "./api";
import { TextoCuaderno, TextoDeCita, fondoDeColor, type AlAbrirCita } from "./texto";

/** El nombre de cada tipo de renglón y su texto de ayuda (el menú «/» y los lectores de pantalla). */
const TIPOS: { t: TipoBloque; nombre: string; ayuda: string }[] = [
  { t: "texto", nombre: "Cuerpo", ayuda: "" },
  { t: "titulo", nombre: "Título", ayuda: "Título" },
  { t: "subtitulo", nombre: "Encabezado", ayuda: "Encabezado" },
  { t: "lista", nombre: "Lista con viñetas", ayuda: "Elemento" },
  { t: "numerada", nombre: "Lista numerada", ayuda: "Elemento" },
  { t: "tarea", nombre: "Lista de tareas", ayuda: "Tarea" },
  { t: "cita", nombre: "Cita", ayuda: "Una frase para recordar" },
  { t: "versiculo", nombre: "Versículo", ayuda: "Lo que te enseña este versículo (opcional)" },
  { t: "aviso", nombre: "Idea importante", ayuda: "Una idea importante" },
  { t: "resaltado", nombre: "Resaltado", ayuda: "Un texto resaltado" },
  { t: "separador", nombre: "Línea", ayuda: "" },
];
const POR_TIPO = Object.fromEntries(TIPOS.map((x) => [x.t, x])) as Partial<Record<TipoBloque, (typeof TIPOS)[number]>>;
/** Un tipo que el editor no conozca se muestra como texto: una nota nunca debe dejar de abrirse. */
const tipoDe = (t: TipoBloque) => POR_TIPO[t] ?? TIPOS[0];
const SIGUE_IGUAL = new Set<TipoBloque>(["lista", "numerada", "tarea"]);
const CON_SANGRIA = SIGUE_IGUAL;

const BOTON_BARRA =
  "h-9 min-w-9 px-2 shrink-0 rounded-full inline-flex items-center justify-center text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 active:bg-amber-500/20 disabled:opacity-35 disabled:pointer-events-none transition-colors";

function EstadoChip({ estado }: { estado: EstadoGuardado }) {
  const m: Record<EstadoGuardado, [string, React.ReactNode]> = {
    guardado: ["Guardado", <Cloud key="i" className="w-3.5 h-3.5" />],
    guardando: ["Guardando…", <Loader2 key="i" className="w-3.5 h-3.5 animate-spin" />],
    pendiente: ["Guardando…", <Loader2 key="i" className="w-3.5 h-3.5" />],
    "sin-conexion": ["Sin conexión: se guardará al volver", <CloudOff key="i" className="w-3.5 h-3.5" />],
    conflicto: ["Esta nota cambió en otro equipo: lo tuyo quedó como copia", <AlertTriangle key="i" className="w-3.5 h-3.5" />],
    error: ["No se pudo guardar: lo tuyo sigue en este equipo", <AlertTriangle key="i" className="w-3.5 h-3.5" />],
  };
  const [texto, icono] = m[estado];
  const malo = estado === "sin-conexion" || estado === "conflicto" || estado === "error";
  return (
    <span className={`inline-flex items-center gap-1 text-xs ${malo ? "text-amber-700 dark:text-amber-300" : "text-muted-foreground"}`} role="status" title={texto} data-testid="cuaderno-estado">
      {icono} <span className={malo ? "" : "sr-only sm:not-sr-only"}>{texto}</span>
    </span>
  );
}

/** La fecha de arriba, como en Notas: «23 de noviembre de 2026, 10:42». */
const fechaDeNota = (iso: string) =>
  new Date(iso).toLocaleString("es", { day: "numeric", month: "long", year: "numeric", hour: "numeric", minute: "2-digit" });

type Props = {
  nota: NotaCompleta;
  /** En el panel de la lección: el título un poco más chico y sin la línea de la lección. */
  compacto?: boolean;
  alAbrirCita?: AlAbrirCita;
  alGuardar?: (n: NotaCompleta) => void;
  /** Para agregar bloques desde afuera (lo resaltado en una lección). */
  registrarAgregar?: (f: ((bloques: BloqueCuaderno[]) => void) | null) => void;
  /** Solo para leer (la papelera). */
  soloLeer?: boolean;
};

export function EditorNota({ nota: inicial, compacto, alAbrirCita, alGuardar, registrarAgregar, soloLeer }: Props) {
  const { nota, estado, cambiar } = useNotaEditable(inicial, alGuardar);
  const [enfocado, setEnfocado] = useState<string | null>(null);
  const [cursorAlFinal, setCursorAlFinal] = useState(true);
  const [formato, setFormato] = useState(false);
  const historia = useRef<BloqueCuaderno[][]>([]);
  const areas = useRef(new Map<string, HTMLTextAreaElement>());
  const titulo = useRef<HTMLInputElement | null>(null);

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

  // al enfocar un renglón, el cursor va al final (o al principio, al unir dos renglones)
  useEffect(() => {
    if (!enfocado) return;
    const a = areas.current.get(enfocado);
    if (!a) return;
    a.focus();
    const p = cursorAlFinal ? a.value.length : 0;
    a.setSelectionRange(p, p);
  }, [enfocado, cursorAlFinal]);

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
  /** Cambia el estilo del renglón (tocar otra vez el mismo estilo de lista lo vuelve texto, como en Notas). */
  const convertir = (id: string, t: TipoBloque) => {
    const b = bloques.find((x) => x.id === id);
    const nuevoTipo: TipoBloque = b && b.t === t && t !== "texto" && t !== "separador" ? "texto" : t;
    cambiarBloque(
      id,
      (x) => ({
        ...x,
        t: nuevoTipo,
        texto: x.texto.replace(/^\/\S*$/, ""),
        ref: nuevoTipo === "versiculo" ? x.ref ?? "" : x.ref,
        hecho: nuevoTipo === "tarea" ? !!x.hecho : undefined,
        color: nuevoTipo === "aviso" ? x.color ?? "naranja" : x.color,
        nivel: CON_SANGRIA.has(nuevoTipo) ? x.nivel : undefined,
      }),
      true,
    );
    if (nuevoTipo === "separador") insertarDespues(id, bloque("texto"));
    else enfocar(id, true);
  };
  const sangria = (d: -1 | 1) => {
    if (!enfocado) return;
    cambiarBloque(enfocado, (x) => (CON_SANGRIA.has(x.t) ? { ...x, nivel: Math.max(0, Math.min(2, (x.nivel ?? 0) + d)) || undefined } : x), true);
    enfocar(enfocado, true);
  };
  const deshacer = () => {
    const prev = historia.current.pop();
    if (prev) cambiar((n) => ({ ...n, bloques: prev }));
  };
  const listo = () => {
    (document.activeElement as HTMLElement | null)?.blur?.();
    setEnfocado(null);
  };
  /** Tocar debajo del texto sigue escribiendo: en el último renglón vacío o en uno nuevo. */
  const seguir = () => {
    if (soloLeer) return;
    const ultimo = bloques[bloques.length - 1];
    if (ultimo && ultimo.t === "texto" && !ultimo.texto.trim()) enfocar(ultimo.id, true);
    else insertarDespues(ultimo ? ultimo.id : null, bloque("texto"));
  };

  /** Pone o quita una marca en lo seleccionado del renglón (**negrita**, _cursiva_, ++subrayado++, ~~tachado~~, ==resaltado==). */
  const marcar = (m: string) => {
    if (!enfocado) return;
    const a = areas.current.get(enfocado);
    if (!a) return;
    const { selectionStart: s, selectionEnd: e, value } = a;
    const yaMarcado = s >= m.length && value.slice(s - m.length, s) === m && value.slice(e, e + m.length) === m;
    let nuevo: string;
    let desde: number;
    let hasta: number;
    if (yaMarcado) {
      nuevo = value.slice(0, s - m.length) + value.slice(s, e) + value.slice(e + m.length);
      desde = s - m.length;
      hasta = e - m.length;
    } else {
      const sel = value.slice(s, e) || "texto";
      nuevo = value.slice(0, s) + m + sel + m + value.slice(e);
      desde = s + m.length;
      hasta = s + m.length + sel.length;
    }
    cambiarBloque(enfocado, (b) => ({ ...b, texto: nuevo }), true);
    requestAnimationFrame(() => {
      a.focus();
      a.setSelectionRange(desde, hasta);
    });
  };

  const alTeclear = (e: React.KeyboardEvent<HTMLTextAreaElement>, b: BloqueCuaderno) => {
    const a = e.currentTarget;
    const mod = e.ctrlKey || e.metaKey;
    if (mod && e.key.toLowerCase() === "z") {
      e.preventDefault();
      deshacer();
      return;
    }
    if (mod && ["b", "i", "u"].includes(e.key.toLowerCase())) {
      e.preventDefault();
      marcar(e.key.toLowerCase() === "b" ? "**" : e.key.toLowerCase() === "i" ? "_" : "++");
      return;
    }
    if (e.key === "Enter" && !e.shiftKey && b.t !== "versiculo") {
      e.preventDefault();
      if (SIGUE_IGUAL.has(b.t) && !b.texto.trim()) {
        convertir(b.id, b.t);
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
      // un renglón de lista vacío primero vuelve a ser texto; un renglón de texto vacío se quita
      if (!b.texto && b.t !== "texto" && b.t !== "separador") {
        e.preventDefault();
        convertir(b.id, "texto");
        return;
      }
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
      if (i === 0 && !b.texto) {
        e.preventDefault();
        titulo.current?.focus();
        return;
      }
    }
    if (e.key === "Tab" && CON_SANGRIA.has(b.t)) {
      e.preventDefault();
      cambiarBloque(b.id, (x) => ({ ...x, nivel: Math.max(0, Math.min(2, (x.nivel ?? 0) + (e.shiftKey ? -1 : 1))) || undefined }), true);
      return;
    }
    if (e.key === "ArrowUp" && a.selectionStart === 0) {
      const prev = bloques[indice(b.id) - 1];
      if (prev && prev.t !== "separador") {
        e.preventDefault();
        enfocar(prev.id, true);
      } else if (!prev) {
        e.preventDefault();
        titulo.current?.focus();
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

  // el número de cada renglón de lista numerada (se reinicia al cortarse la lista)
  const numeros = new Map<string, number>();
  let n = 0;
  for (const b of bloques) {
    if (b.t === "numerada") numeros.set(b.id, ++n);
    else n = 0;
  }
  const actual = enfocado ? bloques.find((b) => b.id === enfocado) : undefined;
  const vacia = bloques.every((b) => !b.texto.trim() && !b.ref);
  const primerTexto = bloques.find((b) => b.t === "texto")?.id;

  return (
    <div className="relative notas-sistema bg-inherit" data-testid="cuaderno-editor">
      {!soloLeer && (
        // la barra: arriba y fija mientras se escribe (en el teléfono el teclado no la tapa)
        <div className="sticky top-0 z-20 -mx-1 px-1 py-1 bg-inherit flex items-center gap-0.5 overflow-x-auto" role="toolbar" aria-label="Herramientas de la nota">
          <Popover open={formato} onOpenChange={setFormato}>
            <PopoverTrigger asChild>
              <button type="button" className={BOTON_BARRA} onMouseDown={(e) => e.preventDefault()} aria-label="Formato del texto" title="Formato" data-testid="cuaderno-formato">
                <span className="text-[16px] font-semibold tracking-tight">Aa</span>
              </button>
            </PopoverTrigger>
            <PopoverContent align="start" collisionPadding={12} className="notas-sistema w-[min(21rem,calc(100vw-1.5rem))] rounded-2xl p-3" onOpenAutoFocus={(e) => e.preventDefault()}>
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold">Formato</p>
                {!actual && <p className="text-xs text-muted-foreground">Toca un renglón de la nota</p>}
              </div>
              <div className="grid grid-cols-4 gap-1.5" role="group" aria-label="Estilo del renglón">
                <BotonFormato sinRenglon={!actual} activo={actual?.t === "titulo"} alTocar={() => actual && convertir(actual.id, "titulo")} etiqueta="Título"><span className="font-bold text-[17px]">Título</span></BotonFormato>
                <BotonFormato sinRenglon={!actual} activo={actual?.t === "subtitulo"} alTocar={() => actual && convertir(actual.id, "subtitulo")} etiqueta="Encabezado"><span className="font-semibold">Encab.</span></BotonFormato>
                <BotonFormato sinRenglon={!actual} activo={actual?.t === "texto"} alTocar={() => actual && convertir(actual.id, "texto")} etiqueta="Cuerpo">Cuerpo</BotonFormato>
                <BotonFormato sinRenglon={!actual} activo={actual?.t === "cita"} alTocar={() => actual && convertir(actual.id, "cita")} etiqueta="Cita"><TextQuote className="w-4 h-4" /></BotonFormato>
              </div>
              <div className="grid grid-cols-5 gap-1.5 mt-1.5" role="group" aria-label="Marcas del texto">
                <BotonFormato sinRenglon={!actual} alTocar={() => marcar("**")} etiqueta="Negrita"><Bold className="w-4 h-4" /></BotonFormato>
                <BotonFormato sinRenglon={!actual} alTocar={() => marcar("_")} etiqueta="Cursiva"><Italic className="w-4 h-4" /></BotonFormato>
                <BotonFormato sinRenglon={!actual} alTocar={() => marcar("++")} etiqueta="Subrayado"><Underline className="w-4 h-4" /></BotonFormato>
                <BotonFormato sinRenglon={!actual} alTocar={() => marcar("~~")} etiqueta="Tachado"><Strikethrough className="w-4 h-4" /></BotonFormato>
                <BotonFormato sinRenglon={!actual} alTocar={() => marcar("==")} etiqueta="Resaltar"><Highlighter className="w-4 h-4" /></BotonFormato>
              </div>
              <div className="grid grid-cols-5 gap-1.5 mt-1.5" role="group" aria-label="Listas">
                <BotonFormato sinRenglon={!actual} activo={actual?.t === "lista"} alTocar={() => actual && convertir(actual.id, "lista")} etiqueta="Lista con viñetas"><List className="w-4 h-4" /></BotonFormato>
                <BotonFormato sinRenglon={!actual} activo={actual?.t === "numerada"} alTocar={() => actual && convertir(actual.id, "numerada")} etiqueta="Lista numerada"><ListOrdered className="w-4 h-4" /></BotonFormato>
                <BotonFormato sinRenglon={!actual} activo={actual?.t === "tarea"} alTocar={() => actual && convertir(actual.id, "tarea")} etiqueta="Lista de tareas"><ListChecks className="w-4 h-4" /></BotonFormato>
                <BotonFormato sinRenglon={!actual} alTocar={() => sangria(-1)} etiqueta="Menos sangría"><ListIndentDecrease className="w-4 h-4" /></BotonFormato>
                <BotonFormato sinRenglon={!actual} alTocar={() => sangria(1)} etiqueta="Más sangría"><ListIndentIncrease className="w-4 h-4" /></BotonFormato>
              </div>
            </PopoverContent>
          </Popover>
          <button
            type="button"
            className={BOTON_BARRA}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => (actual ? convertir(actual.id, "tarea") : insertarDespues(bloques.length ? bloques[bloques.length - 1].id : null, bloque("tarea")))}
            aria-label="Lista de tareas"
            title="Lista de tareas"
            data-testid="cuaderno-tareas"
          >
            <ListChecks className="w-[18px] h-[18px]" />
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button type="button" className={BOTON_BARRA} aria-label="Insertar" title="Insertar" data-testid="cuaderno-insertar"><Plus className="w-[18px] h-[18px]" /></button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="notas-sistema w-60">
              <DropdownMenuItem onSelect={() => insertarDespues(enfocado ?? (bloques.length ? bloques[bloques.length - 1].id : null), bloque("versiculo", "", { ref: "" }))} data-testid="cuaderno-versiculo">
                <BookOpen className="w-4 h-4 mr-2 text-amber-600" /> Un versículo
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => insertarDespues(enfocado ?? (bloques.length ? bloques[bloques.length - 1].id : null), bloque("aviso", "", { color: "naranja" }))}>
                <Lightbulb className="w-4 h-4 mr-2 text-amber-600" /> Una idea importante
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => insertarDespues(enfocado ?? (bloques.length ? bloques[bloques.length - 1].id : null), bloque("separador"))}>
                <Minus className="w-4 h-4 mr-2 text-amber-600" /> Una línea
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <button type="button" className={BOTON_BARRA} onMouseDown={(e) => e.preventDefault()} onClick={deshacer} disabled={!historia.current.length} aria-label="Deshacer" title="Deshacer (Ctrl+Z)">
            <Undo2 className="w-[18px] h-[18px]" />
          </button>
          <span className="flex-1 min-w-2" />
          <EstadoChip estado={estado} />
          {enfocado && (
            <button type="button" onClick={listo} className="ml-1 h-9 px-3 shrink-0 rounded-full text-[15px] font-semibold text-amber-600 dark:text-amber-400 hover:bg-amber-500/10" data-testid="cuaderno-listo-editar">
              Listo
            </button>
          )}
        </div>
      )}

      <p className="text-center text-xs text-muted-foreground mt-2" data-testid="cuaderno-fecha">{nota.id ? fechaDeNota(nota.actualizada) : "Nota nueva"}</p>
      <input
        ref={titulo}
        value={nota.titulo}
        readOnly={soloLeer}
        onChange={(e) => cambiar((x) => ({ ...x, titulo: e.target.value.slice(0, 160) }))}
        onFocus={() => setEnfocado(null)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || (e.key === "ArrowDown" && e.currentTarget.selectionStart === e.currentTarget.value.length)) {
            e.preventDefault();
            if (bloques.length) enfocar(bloques[0].id, false);
            else seguir();
          }
        }}
        placeholder="Título"
        className={`notas-campo w-full bg-transparent font-bold tracking-tight outline-none placeholder:text-muted-foreground/40 mt-1 ${compacto ? "text-[24px] leading-tight" : "text-[28px] leading-tight"}`}
        aria-label="Título de la nota"
        data-testid="cuaderno-titulo"
      />
      {(nota.leccionId || nota.materiaId) && !compacto && (
        <p className="text-xs text-muted-foreground mt-1">
          {nota.leccionId ? (
            <>De la lección <Link href={`/academia/leccion/${nota.leccionId}`} className="underline">{nota.leccionTitulo ?? nota.leccionId}</Link>{nota.materiaTitulo ? ` · ${nota.materiaTitulo}` : ""}</>
          ) : (
            <>De la materia <Link href={`/academia/materia/${nota.materiaId}`} className="underline">{nota.materiaTitulo ?? nota.materiaId}</Link></>
          )}
        </p>
      )}

      <div className="mt-2" data-testid="cuaderno-bloques">
        {bloques.map((b) => (
          <BloqueEditable
            key={b.id}
            b={b}
            numero={numeros.get(b.id)}
            enfocado={enfocado === b.id}
            ayuda={b.id === primerTexto && vacia ? "Escribe o pega aquí tu nota…" : undefined}
            soloLeer={soloLeer}
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
      {/* tocar debajo del texto sigue escribiendo, como en una hoja */}
      {!soloLeer && <div className="min-h-[30vh] cursor-text" onClick={seguir} aria-hidden="true" data-testid="cuaderno-seguir" />}
    </div>
  );
}

/** Un botón del panel «Aa»: aplica el estilo sin perder lo seleccionado. */
function BotonFormato({ activo, alTocar, etiqueta, children, sinRenglon }: { activo?: boolean; alTocar: () => void; etiqueta: string; children: React.ReactNode; sinRenglon: boolean }) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={alTocar}
      disabled={sinRenglon}
      aria-pressed={activo}
      aria-label={etiqueta}
      title={etiqueta}
      className={`h-11 rounded-xl inline-flex items-center justify-center gap-1.5 text-sm transition-colors disabled:opacity-40 ${
        activo ? "bg-amber-500 text-white" : "bg-muted/70 hover:bg-muted text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

type PropsBloque = {
  b: BloqueCuaderno;
  numero?: number;
  enfocado: boolean;
  ayuda?: string;
  soloLeer?: boolean;
  alEnfocar: () => void;
  alCambiar: (f: (b: BloqueCuaderno) => BloqueCuaderno) => void;
  alTeclear: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  alElegirTipo: (t: TipoBloque) => void;
  registrar: (el: HTMLTextAreaElement | null) => void;
  alAbrirCita?: AlAbrirCita;
};

/** El tamaño de cada estilo, como en Notas: el título grande, el encabezado y el cuerpo. */
const ESTILO: Partial<Record<TipoBloque, string>> = {
  titulo: "text-[24px] leading-snug font-bold tracking-tight",
  subtitulo: "text-[20px] leading-snug font-semibold",
};
const CUERPO = "text-[17px] leading-[1.6]";

function BloqueEditable({ b, numero, enfocado, ayuda, soloLeer, alEnfocar, alCambiar, alTeclear, alElegirTipo, registrar, alAbrirCita }: PropsBloque) {
  const area = useRef<HTMLTextAreaElement | null>(null);
  const ajustar = () => {
    const a = area.current;
    if (!a) return;
    a.style.height = "auto";
    a.style.height = `${a.scrollHeight}px`;
  };
  useEffect(ajustar, [enfocado, b.texto]);
  const sangria = b.nivel ? { paddingLeft: `${b.nivel * 1.5}rem` } : undefined;
  const menuBarra = enfocado && /^\/\S*$/.test(b.texto);
  const filtro = b.texto.slice(1).toLowerCase();
  const textoAyuda = ayuda ?? tipoDe(b.t).ayuda;

  if (b.t === "separador") return <hr className="my-3 border-border" data-tipo="separador" />;

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
      placeholder={textoAyuda}
      className={`notas-campo block w-full resize-none bg-transparent outline-none p-0 ${CUERPO} placeholder:text-muted-foreground/45 ${ESTILO[b.t] ?? ""}`}
      aria-label={tipoDe(b.t).nombre}
      data-testid="cuaderno-bloque-texto"
    />
  );
  const vista = (
    <div
      role={soloLeer ? undefined : "button"}
      tabIndex={soloLeer ? undefined : 0}
      onClick={soloLeer ? undefined : alEnfocar}
      onKeyDown={(e) => {
        if (!soloLeer && e.key === "Enter") alEnfocar();
      }}
      className={`w-full whitespace-pre-wrap break-words min-h-[1.6em] ${soloLeer ? "" : "cursor-text"} ${CUERPO} ${ESTILO[b.t] ?? ""}`}
    >
      {b.texto.trim() ? <TextoCuaderno texto={b.texto} alAbrirCita={alAbrirCita} /> : <span className="text-muted-foreground/45">{textoAyuda || " "}</span>}
    </div>
  );
  const contenido = enfocado && !soloLeer ? cajaTexto : vista;

  let cuerpo: React.ReactNode;
  switch (b.t) {
    case "lista":
      cuerpo = (
        <div className="flex gap-2.5" style={sangria}>
          <span className={`text-amber-500 select-none ${CUERPO}`} aria-hidden="true">{b.nivel === 1 ? "◦" : b.nivel === 2 ? "▪" : "•"}</span>
          <div className="flex-1 min-w-0">{contenido}</div>
        </div>
      );
      break;
    case "numerada":
      cuerpo = (
        <div className="flex gap-2" style={sangria}>
          <span className={`text-muted-foreground select-none tabular-nums min-w-[1.4rem] text-right ${CUERPO}`} aria-hidden="true">{numero}.</span>
          <div className="flex-1 min-w-0">{contenido}</div>
        </div>
      );
      break;
    case "tarea":
      cuerpo = (
        <div className="flex gap-2.5 items-start" style={sangria}>
          {/* el círculo de Notas: se llena al hacerla */}
          <button
            type="button"
            role="checkbox"
            aria-checked={!!b.hecho}
            disabled={soloLeer}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => alCambiar((x) => ({ ...x, hecho: !x.hecho }))}
            className={`mt-[3px] h-[22px] w-[22px] shrink-0 rounded-full border-[1.5px] inline-flex items-center justify-center transition-colors ${
              b.hecho ? "bg-amber-500 border-amber-500 text-white" : "border-muted-foreground/45 hover:border-amber-500"
            }`}
            aria-label={b.hecho ? "Hecha" : "Por hacer"}
            data-testid="cuaderno-tarea-circulo"
          >
            {b.hecho && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
          </button>
          <div className={`flex-1 min-w-0 ${b.hecho && !enfocado ? "line-through text-muted-foreground" : ""}`}>{contenido}</div>
        </div>
      );
      break;
    case "cita":
      cuerpo = (
        <blockquote className="border-l-[3px] border-amber-400 pl-3 my-1 text-foreground/90">
          {contenido}
          {b.fuente && <FuenteDe b={b} />}
        </blockquote>
      );
      break;
    case "aviso":
      cuerpo = (
        <div className="rounded-xl px-3 py-2 my-1 flex gap-2 bg-amber-500/10">
          <Lightbulb className="w-4 h-4 mt-1.5 shrink-0 text-amber-600 dark:text-amber-400" aria-hidden="true" />
          <div className="flex-1 min-w-0">{contenido}</div>
        </div>
      );
      break;
    case "resaltado":
      cuerpo = (
        <div className={`rounded-md px-1.5 py-0.5 my-0.5 ${fondoDeColor(b.color)}`}>
          {contenido}
          {b.fuente && <FuenteDe b={b} />}
        </div>
      );
      break;
    case "versiculo":
      cuerpo = <BloqueVersiculo b={b} enfocado={enfocado} soloLeer={soloLeer} alCambiar={alCambiar} alEnfocar={alEnfocar} contenido={contenido} alAbrirCita={alAbrirCita} />;
      break;
    default:
      cuerpo = contenido;
  }

  return (
    <div className="relative py-[1px]" data-tipo={b.t}>
      {cuerpo}
      {menuBarra && (
        <div className="absolute left-0 top-full z-30 mt-1 w-64 max-w-[85vw] rounded-xl border bg-popover p-1 shadow-lg" role="listbox" aria-label="Elegir el estilo del renglón">
          {TIPOS.filter((x) => !filtro || x.nombre.toLowerCase().includes(filtro)).map((x) => (
            <button
              key={x.t}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => alElegirTipo(x.t)}
              className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-muted text-sm"
            >
              {x.nombre}
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
        de la lección <Link href={`/academia/leccion/${b.fuente.id}`} className="underline">{b.fuente.titulo}</Link>
      </p>
    );
  return <p className="text-xs text-muted-foreground mt-0.5 not-italic">{b.fuente.ref}</p>;
}

function BloqueVersiculo({
  b, enfocado, soloLeer, alCambiar, alEnfocar, contenido, alAbrirCita,
}: { b: BloqueCuaderno; enfocado: boolean; soloLeer?: boolean; alCambiar: PropsBloque["alCambiar"]; alEnfocar: () => void; contenido: React.ReactNode; alAbrirCita?: AlAbrirCita }) {
  const cita = b.ref ? citaEscrita(b.ref) : null;
  return (
    <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 px-3 py-2 my-1">
      <div className="flex items-center gap-2">
        <BookOpen className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" aria-hidden="true" />
        <input
          value={b.ref ?? ""}
          readOnly={soloLeer}
          onChange={(e) => alCambiar((x) => ({ ...x, ref: e.target.value.slice(0, 40) }))}
          onFocus={alEnfocar}
          placeholder="Escribe la cita: Juan 3:16"
          className="notas-campo flex-1 min-w-0 bg-transparent outline-none font-semibold text-[16px] placeholder:font-normal placeholder:text-muted-foreground/50"
          aria-label="La cita del versículo"
          data-testid="cuaderno-versiculo-ref"
        />
        {cita &&
          (alAbrirCita ? (
            <button type="button" className="text-xs text-amber-700 dark:text-amber-300 hover:underline shrink-0" onClick={() => alAbrirCita(cita)}>Abrir</button>
          ) : (
            <a href={`/biblioteca?libro=${encodeURIComponent(cita.libro)}&cap=${cita.capitulo}`} className="text-xs text-amber-700 dark:text-amber-300 hover:underline shrink-0">Abrir</a>
          ))}
      </div>
      {cita ? (
        <div className="mt-1.5" data-testid="cuaderno-versiculo-texto">
          <span className="sr-only">{citaVisible(cita)}</span>
          <TextoDeCita cita={cita} />
        </div>
      ) : b.ref ? (
        <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">Escribe la cita así: Juan 3:16 o Romanos 5:1-5.</p>
      ) : null}
      {(enfocado || b.texto) && <div className="mt-1.5 border-t border-amber-500/20 pt-1.5">{contenido}</div>}
    </div>
  );
}
