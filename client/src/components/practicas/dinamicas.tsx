// Las dinámicas del catálogo de Luis (26-nov): el mismo contenido de la lección, jugado como anagrama, sopa de letras,
// crucigrama, «Arma la frase», memoria y «¡Atrápalas!». Todo se hace con un dedo y está pensado primero para el
// teléfono (375 de ancho). La memoria y «¡Atrápalas!» envían solas con `alEnviar`; las demás avisan su respuesta con
// `alCambiar` (null mientras está incompleta) y piden «Comprobar».
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Check, Flame, HandGrab, RotateCcw, X } from "lucide-react";
import { Marca, type PropsPieza, type VistaDe } from "./piezas";

const bien = "border-emerald-500 bg-emerald-500/12 text-emerald-900 dark:text-emerald-100";
const mal = "border-rose-500 bg-rose-500/12 text-rose-900 dark:text-rose-100";

type Partes = (string | { hueco: number })[];

/** La frase con sus espacios: la puntuación que sigue a un espacio va pegada a él (no queda sola al comienzo de la línea). */
function Frase({ partes, hueco, compacta = false }: { partes: Partes; hueco: (h: number) => ReactNode; compacta?: boolean }) {
  return (
    <p className={compacta ? "text-[16px] leading-[2.2] font-medium" : "text-lg leading-[2.5] font-medium"}>
      {partes.map((p, idx) => {
        if (typeof p === "string") {
          const antes = partes[idx - 1];
          return <span key={idx}>{antes && typeof antes !== "string" ? p.replace(/^[,.;:!?)»]+/, "") : p}</span>;
        }
        const sig = partes[idx + 1];
        const pegada = typeof sig === "string" ? (sig.match(/^[,.;:!?)»]+/)?.[0] ?? "") : "";
        return (
          <span key={idx} className="whitespace-nowrap">
            {hueco(p.hueco)}
            {pegada}
          </span>
        );
      })}
    </p>
  );
}

type EstadoEspacio = "vacio" | "activo" | "lleno" | "hecho" | "falto";

/** Un espacio de la frase: vacío, con lo que lleva, ya hecho o corregido (con la buena debajo si quedó mal). */
function Espacio({ texto, estado, marca = null, etiqueta, correcta, chico = false }: { texto: string; estado: EstadoEspacio; marca?: boolean | null; etiqueta?: string; correcta?: string | null; chico?: boolean }) {
  const cls =
    marca === true
      ? `${bien} border-solid`
      : marca === false
        ? `${mal} border-solid`
        : estado === "hecho"
          ? "border-emerald-500/60 border-solid bg-emerald-500/10"
          : estado === "falto"
            ? "border-amber-500 border-solid bg-amber-500/15 text-amber-900 dark:text-amber-100"
            : estado === "lleno"
              ? "border-amber-500 border-solid bg-amber-500/15"
              : estado === "activo"
                ? "border-amber-500 bg-amber-500/5"
                : "border-muted-foreground/40";
  return (
    <span className="inline-flex flex-col items-center align-middle mx-0.5">
      <span className={`relative inline-flex items-center justify-center rounded-xl border-2 border-dashed font-semibold ${chico ? "min-w-[52px] h-8 px-2 text-[15px]" : "min-w-[72px] h-10 px-3 text-base"} ${cls}`}>
        {etiqueta && <span className="absolute -top-2.5 -left-2 rounded-full bg-amber-500 text-white text-[11px] font-black leading-none px-1.5 py-1">{etiqueta}</span>}
        {texto || " "}
      </span>
      {correcta && <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 leading-tight -mt-1">{correcta}</span>}
    </span>
  );
}

// ---------------------------------------------------------------- anagrama

/** «Anagrama»: las letras de la palabra que falta, revueltas; se tocan en orden (y se quitan tocando la casilla). */
export function Anagrama({ vista, correccion, bloqueado, alCambiar }: PropsPieza<VistaDe<"anagrama">>) {
  const [puestas, setPuestas] = useState<number[]>([]);
  useEffect(() => setPuestas([]), [vista.hueco]);
  const n = vista.letras.length;
  const palabra = puestas.map((k) => vista.letras[k]).join("");
  useEffect(() => {
    alCambiar(puestas.length === n ? { pieza: "completa", huecos: [palabra] } : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [puestas]);
  const usadas = new Set(puestas);
  const c = correccion?.formato === "anagrama" ? (correccion as { correcta: string; bien: boolean }) : null;
  // (las casillas: en una fila hasta 8 letras; las palabras largas, en dos filas)
  const columnas = n <= 8 ? n : Math.ceil(n / 2);
  const lado = Math.min(46, Math.floor((330 - (columnas - 1) * 6) / columnas));
  return (
    <div data-testid="pieza-anagrama">
      {vista.pasos > 1 && <p className="text-xs font-semibold text-muted-foreground mb-2">Palabra {vista.paso + 1} de {vista.pasos}</p>}
      <Frase
        partes={vista.partes}
        hueco={(h) =>
          h < vista.hueco ? (
            <Espacio texto={vista.hechas[h]} estado="hecho" />
          ) : h === vista.hueco ? (
            <Espacio texto={c?.bien ? c.correcta : palabra || "?"} estado={puestas.length ? "lleno" : "activo"} marca={c ? c.bien : null} correcta={c && !c.bien ? c.correcta : null} />
          ) : (
            <Espacio texto="…" estado="vacio" />
          )
        }
      />
      <div className="mt-5 grid justify-center gap-1.5" style={{ gridTemplateColumns: `repeat(${columnas}, ${lado}px)` }} aria-label="Tu palabra">
        {vista.letras.map((_, i) => {
          const k = puestas[i];
          const lleno = k != null;
          return (
            <button
              key={i}
              type="button"
              disabled={bloqueado || !lleno}
              onClick={() => setPuestas(puestas.filter((_, j) => j !== i))}
              style={{ height: lado + 6 }}
              className={`rounded-xl border-2 text-xl font-black flex items-center justify-center ${c ? (c.bien ? bien : mal) : lleno ? "border-amber-500 bg-amber-500/15" : "border-dashed border-muted-foreground/40"}`}
              aria-label={lleno ? `Letra ${i + 1}: ${vista.letras[k]}. Toca para quitarla.` : `Letra ${i + 1}, vacía`}
              data-testid={`casilla-${i}`}
            >
              {lleno ? vista.letras[k] : ""}
            </button>
          );
        })}
      </div>
      {!bloqueado && (
        <>
          <div className="mt-5 flex flex-wrap justify-center gap-2" role="group" aria-label="Letras para tocar">
            {vista.letras.map((l, k) => (
              <motion.button
                key={k}
                type="button"
                whileTap={{ scale: 0.88 }}
                disabled={usadas.has(k)}
                onClick={() => !usadas.has(k) && setPuestas([...puestas, k])}
                className={`w-12 h-12 rounded-2xl border-2 border-amber-400/80 bg-gradient-to-b from-amber-50 to-orange-100 dark:from-amber-900/50 dark:to-orange-950/50 text-xl font-black shadow-sm transition-opacity ${usadas.has(k) ? "opacity-0 pointer-events-none" : ""}`}
                aria-label={`Letra ${l}`}
                data-testid={`letra-${k}`}
              >
                {l}
              </motion.button>
            ))}
          </div>
          {puestas.length > 0 && (
            <div className="mt-3 flex justify-center">
              <button type="button" onClick={() => setPuestas([])} className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground" data-testid="anagrama-otra-vez">
                <RotateCcw className="w-4 h-4" /> Empezar de nuevo
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ---------------------------------------------------------------- sopa de letras

const COLORES_TRAZO = ["#f59e0b", "#0ea5e9", "#8b5cf6", "#10b981", "#ec4899", "#14b8a6"];
type Celda = [number, number];
const mismaCelda = (a: Celda | null, b: Celda | null) => !!a && !!b && a[0] === b[0] && a[1] === b[1];
const enLinea = (a: Celda, b: Celda) => {
  const dr = b[0] - a[0];
  const dc = b[1] - a[1];
  return (dr !== 0 || dc !== 0) && (dr === 0 || dc === 0 || Math.abs(dr) === Math.abs(dc));
};
const largoDe = (t: number[]) => Math.max(Math.abs(t[2] - t[0]), Math.abs(t[3] - t[1])) + 1;
const mismoTrazo = (x: number[], y: number[]) =>
  (x[0] === y[0] && x[1] === y[1] && x[2] === y[2] && x[3] === y[3]) || (x[0] === y[2] && x[1] === y[3] && x[2] === y[0] && x[3] === y[1]);
function letrasDe(filas: string[], t: number[]): string {
  const dr = Math.sign(t[2] - t[0]);
  const dc = Math.sign(t[3] - t[1]);
  let s = "";
  for (let k = 0; k < largoDe(t); k++) s += filas[t[0] + dr * k]?.[t[1] + dc * k] ?? "";
  return s;
}
function celdasDe(t: number[]): string[] {
  const dr = Math.sign(t[2] - t[0]);
  const dc = Math.sign(t[3] - t[1]);
  return Array.from({ length: largoDe(t) }, (_, k) => `${t[0] + dr * k},${t[1] + dc * k}`);
}

/**
 * «Sopa de letras»: se marca cada palabra tocando su primera letra y después la última (o deslizando el dedo). Hay que
 * marcar tantas como espacios tiene la frase; también hay palabras que no van.
 */
export function Sopa({ vista, correccion, bloqueado, alCambiar }: PropsPieza<VistaDe<"sopa">>) {
  const N = vista.filas.length;
  const [trazos, setTrazos] = useState<number[][]>([]);
  const [inicio, setInicio] = useState<Celda | null>(null);
  const [bajo, setBajo] = useState<Celda | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);
  const abajo = useRef<Celda | null>(null);
  const caja = useRef<HTMLDivElement>(null);
  useEffect(() => {
    alCambiar(trazos.length === vista.buscar ? { pieza: "completa", trazos } : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trazos]);
  const c = correccion?.formato === "sopa" ? (correccion as { elegidas: { texto: string; trazo: number[]; bien: boolean }[]; faltan: { texto: string; trazo: number[] }[]; palabras: string[] }) : null;

  const celdaEn = (x: number, y: number): Celda | null => {
    const el = (document.elementFromPoint(x, y) as HTMLElement | null)?.closest<HTMLElement>("[data-celda]");
    if (!el || !caja.current?.contains(el)) return null;
    const [r, k] = el.dataset.celda!.split(",").map(Number);
    return [r, k];
  };
  /** Agrega la palabra de `a` a `b` (true si el toque ya se usó, aunque no se agregue). */
  const marcar = (a: Celda, b: Celda): boolean => {
    if (!enLinea(a, b)) return false;
    const t = [a[0], a[1], b[0], b[1]];
    if (largoDe(t) < 3) setAviso("Las palabras tienen 3 letras o más.");
    else if (trazos.some((x) => mismoTrazo(x, t))) setAviso("Esa palabra ya la marcaste.");
    else if (trazos.length >= vista.buscar) setAviso(`Ya marcaste ${vista.buscar}. Toca una de tus palabras para quitarla.`);
    else {
      setTrazos([...trazos, t]);
      setAviso(null);
    }
    return true;
  };
  const soltar = (fin: Celda | null) => {
    const d = abajo.current;
    abajo.current = null;
    setBajo(null);
    if (!d || bloqueado) return;
    if (fin && !mismaCelda(fin, d)) {
      // (deslizó el dedo de una letra a otra)
      if (!marcar(d, fin)) setAviso("Marca en línea recta: de lado, hacia abajo o en diagonal.");
      setInicio(null);
      return;
    }
    // (tocó una letra: la primera de la palabra o la última)
    if (!inicio) return setInicio(d);
    if (mismaCelda(inicio, d)) return setInicio(null);
    if (marcar(inicio, d)) setInicio(null);
    else setInicio(d);
  };

  // lo que se dibuja: las palabras marcadas y, al corregir, las buenas, las malas y las que faltaron
  const lineas: { t: number[]; color: string; punteada?: boolean }[] = c
    ? [...c.elegidas.filter((x) => x.trazo.length === 4).map((x) => ({ t: x.trazo, color: x.bien ? "#10b981" : "#f43f5e" })), ...c.faltan.map((x) => ({ t: x.trazo, color: "#f59e0b", punteada: true }))]
    : trazos.map((t, i) => ({ t, color: COLORES_TRAZO[i % COLORES_TRAZO.length] }));
  // (la línea que se va a marcar: del dedo que se desliza, o de la primera letra tocada a la que se está tocando)
  const arrastrando = !!abajo.current && !!bajo && !mismaCelda(abajo.current, bajo);
  const desde = arrastrando ? abajo.current : inicio;
  const vistaPrevia = desde && bajo && !mismaCelda(desde, bajo) && enLinea(desde, bajo) ? new Set(celdasDe([desde[0], desde[1], bajo[0], bajo[1]])) : null;
  const halladas = c ? new Set(c.elegidas.filter((x) => x.bien).map((x) => x.texto)) : null;
  return (
    <div data-testid="pieza-sopa">
      <Frase
        compacta
        partes={vista.partes}
        hueco={(h) => {
          if (!c) return <Espacio chico texto="" estado="vacio" etiqueta={String(h + 1)} />;
          const w = c.palabras[h];
          return <Espacio chico texto={w} estado={halladas!.has(w) ? "hecho" : "falto"} />;
        }}
      />
      <div
        ref={caja}
        className="relative mx-auto mt-3 w-full max-w-[360px] aspect-square select-none touch-none rounded-2xl border-2 border-border bg-card"
        onPointerDown={(e) => {
          if (bloqueado) return;
          const k = celdaEn(e.clientX, e.clientY);
          if (!k) return;
          abajo.current = k;
          setBajo(k);
        }}
        onPointerMove={(e) => {
          if (!abajo.current) return;
          const k = celdaEn(e.clientX, e.clientY);
          if (k && !mismaCelda(k, bajo)) setBajo(k);
        }}
        onPointerUp={(e) => soltar(celdaEn(e.clientX, e.clientY) ?? bajo)}
        onPointerCancel={() => {
          abajo.current = null;
          setBajo(null);
        }}
        role="grid"
        aria-label="Sopa de letras"
      >
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox={`0 0 ${N} ${N}`} aria-hidden>
          {lineas.map((l, i) => (
            <line
              key={i}
              x1={l.t[1] + 0.5}
              y1={l.t[0] + 0.5}
              x2={l.t[3] + 0.5}
              y2={l.t[2] + 0.5}
              stroke={l.color}
              strokeOpacity={l.punteada ? 0.55 : 0.38}
              strokeWidth={0.74}
              strokeLinecap="round"
              strokeDasharray={l.punteada ? "0.25 0.2" : undefined}
            />
          ))}
        </svg>
        <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${N}, 1fr)`, gridTemplateRows: `repeat(${N}, 1fr)` }}>
          {vista.filas.flatMap((fila, r) =>
            [...fila].map((letra, k) => {
              const marcada = mismaCelda(inicio, [r, k]) || mismaCelda(bajo, [r, k]) || vistaPrevia?.has(`${r},${k}`);
              return (
                <div
                  key={`${r},${k}`}
                  data-celda={`${r},${k}`}
                  role="gridcell"
                  className={`relative flex items-center justify-center text-[17px] font-bold ${marcada ? "text-amber-700 dark:text-amber-300" : ""}`}
                  data-testid={`celda-${r}-${k}`}
                >
                  {marcada && <span className="absolute inset-[3px] rounded-full bg-amber-400/30 ring-2 ring-amber-500" aria-hidden />}
                  <span className="relative">{letra}</span>
                </div>
              );
            }),
          )}
        </div>
      </div>
      {aviso && !bloqueado && (
        <p className="mt-2 text-center text-sm font-semibold text-amber-700 dark:text-amber-300" role="status">
          {aviso}
        </p>
      )}
      <div className="mt-3 flex flex-wrap gap-2 justify-center" aria-label="Tus palabras">
        {(c ? c.elegidas.map((x) => ({ texto: x.texto, bien: x.bien as boolean | null })) : trazos.map((t) => ({ texto: letrasDe(vista.filas, t), bien: null as boolean | null }))).map((x, i) => (
          <button
            key={i}
            type="button"
            disabled={bloqueado}
            onClick={() => setTrazos(trazos.filter((_, j) => j !== i))}
            className={`h-9 pl-3 pr-2 rounded-full border-2 text-sm font-bold inline-flex items-center gap-1 ${x.bien === true ? bien : x.bien === false ? mal : "bg-card"}`}
            style={x.bien == null ? { borderColor: COLORES_TRAZO[i % COLORES_TRAZO.length] } : undefined}
            aria-label={bloqueado ? x.texto : `${x.texto}: toca para quitarla`}
            data-testid={`hallada-${i}`}
          >
            {x.texto}
            {x.bien == null ? <X className="w-3.5 h-3.5 opacity-60" /> : <Marca ok={x.bien} />}
          </button>
        ))}
        {!c && Array.from({ length: Math.max(0, vista.buscar - trazos.length) }).map((_, i) => (
          <span key={`f${i}`} className="h-9 min-w-[56px] px-3 rounded-full border-2 border-dashed border-muted-foreground/40 inline-flex items-center justify-center text-sm text-muted-foreground">
            ?
          </span>
        ))}
      </div>
      {!c && (
        <p className="mt-2 text-center text-xs text-muted-foreground">
          {trazos.length < vista.buscar ? `Te faltan ${vista.buscar - trazos.length} de ${vista.buscar}. ` : ""}Toca la primera letra y después la última de cada palabra (o desliza el dedo).
        </p>
      )}
    </div>
  );
}

// ---------------------------------------------------------------- crucigrama

/**
 * «Crucigrama»: la frase va arriba, con el número de cada palabra en su espacio, y se escribe en las casillas (se pasa
 * sola a la siguiente letra). Una casilla que cruza dos palabras sirve para las dos.
 */
export function Crucigrama({ vista, correccion, bloqueado, alCambiar }: PropsPieza<VistaDe<"crucigrama">>) {
  const casillas = useMemo(() => {
    const m = new Map<string, { p: number; j: number }[]>();
    vista.palabras.forEach((w, p) => {
      for (let j = 0; j < w.largo; j++) {
        const k = `${w.fila + (w.dir === "v" ? j : 0)},${w.col + (w.dir === "h" ? j : 0)}`;
        m.set(k, [...(m.get(k) ?? []), { p, j }]);
      }
    });
    return m;
  }, [vista]);
  const [letras, setLetras] = useState<Record<string, string>>({});
  const [sel, setSel] = useState(0);
  const refs = useRef(new Map<string, HTMLInputElement>());
  const yaEnfocada = useRef(false);
  const celdaDe = (p: number, j: number) => {
    const w = vista.palabras[p];
    return `${w.fila + (w.dir === "v" ? j : 0)},${w.col + (w.dir === "h" ? j : 0)}`;
  };
  const palabraDe = (p: number) => Array.from({ length: vista.palabras[p].largo }, (_, j) => letras[celdaDe(p, j)] ?? "").join("");
  useEffect(() => {
    const todas = vista.palabras.map((_, p) => palabraDe(p));
    alCambiar(todas.every((w, p) => w.length === vista.palabras[p].largo) ? { pieza: "completa", huecos: todas } : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [letras]);
  const c = correccion && !correccion.formato && Array.isArray(correccion.marcas) ? (correccion as { correctas: string[]; marcas: boolean[] }) : null;
  // la letra de la casilla activa queda seleccionada después de cada cambio (en el iPhone, con setSelectionRange)
  const seleccionar = (el: HTMLInputElement | null | undefined) => el?.setSelectionRange(0, el.value.length);
  useEffect(() => {
    const el = document.activeElement as HTMLInputElement | null;
    if (el && [...refs.current.values()].includes(el)) seleccionar(el);
  }, [letras]);

  const enfocar = (k: string) => {
    const el = refs.current.get(k);
    el?.focus();
    seleccionar(el);
  };
  const elegir = (p: number) => {
    setSel(p);
    const libre = Array.from({ length: vista.palabras[p].largo }, (_, j) => celdaDe(p, j)).find((k) => !letras[k]) ?? celdaDe(p, 0);
    enfocar(libre);
  };
  const escribir = (k: string, valor: string) => {
    // (borrar con el teclado del teléfono deja la casilla vacía)
    if (!valor) return setLetras(({ [k]: _, ...resto }) => resto);
    // (la letra de la casilla activa está siempre seleccionada: lo escrito la reemplaza) varias letras juntas (pegar, o
    // un teclado que manda la palabra entera) se reparten por las casillas que siguen
    const nuevas = [...valor.toLocaleUpperCase("es")].filter((x) => /\p{L}/u.test(x));
    if (!nuevas.length) return;
    const en = casillas.get(k)!;
    const p = en.some((x) => x.p === sel) ? sel : en[0].p;
    const largo = vista.palabras[p].largo;
    let j = en.find((x) => x.p === p)!.j;
    const puestas: Record<string, string> = {};
    for (const l of nuevas) {
      if (j >= largo) break;
      puestas[celdaDe(p, j)] = l;
      j++;
    }
    setLetras((x) => ({ ...x, ...puestas }));
    enfocar(celdaDe(p, Math.min(j, largo - 1)));
  };
  const borrar = (k: string) => {
    if (letras[k]) {
      setLetras(({ [k]: _, ...resto }) => resto);
      return;
    }
    const en = casillas.get(k)!;
    const j = en.find((x) => x.p === sel)?.j;
    if (j) {
      const antes = celdaDe(sel, j - 1);
      setLetras(({ [antes]: _, ...resto }) => resto);
      enfocar(antes);
    }
  };
  const tocar = (k: string) => {
    const ps = casillas.get(k)!.map((x) => x.p);
    if (!ps.includes(sel)) setSel(ps[0]);
    else if (ps.length > 1 && yaEnfocada.current) setSel(ps.find((p) => p !== sel)!);
  };

  const lado = Math.min(40, Math.floor(330 / vista.columnas));
  const flecha = (p: number) => `${vista.palabras[p].n}${vista.palabras[p].dir === "h" ? "→" : "↓"}`;
  const enSel = new Set(Array.from({ length: vista.palabras[sel]?.largo ?? 0 }, (_, j) => celdaDe(sel, j)));
  const inicios = new Map<string, number>();
  for (const w of vista.palabras) inicios.set(`${w.fila},${w.col}`, w.n);
  return (
    <div data-testid="pieza-crucigrama">
      <Frase
        compacta
        partes={vista.partes}
        hueco={(h) => {
          const p = vista.palabras.findIndex((w) => w.hueco === h);
          if (p < 0) return <Espacio chico texto="" estado="vacio" />;
          const marca = c ? c.marcas[p] : null;
          return (
            <button type="button" onClick={() => !bloqueado && elegir(p)} className="align-middle" aria-label={`Palabra ${flecha(p)}`}>
              <Espacio chico texto={palabraDe(p)} estado={p === sel && !c ? "activo" : palabraDe(p) ? "lleno" : "vacio"} etiqueta={flecha(p)} marca={marca} correcta={c && !c.marcas[p] ? c.correctas[p] : null} />
            </button>
          );
        }}
      />
      <div className="mt-4 mx-auto grid" style={{ gridTemplateColumns: `repeat(${vista.columnas}, ${lado}px)`, gridTemplateRows: `repeat(${vista.filas}, ${lado}px)`, width: lado * vista.columnas }} role="grid" aria-label="Crucigrama">
        {Array.from({ length: vista.filas * vista.columnas }, (_, i) => {
          const f = Math.floor(i / vista.columnas);
          const col = i % vista.columnas;
          const k = `${f},${col}`;
          const en = casillas.get(k);
          if (!en) return <div key={k} />;
          const malas = c ? en.some((x) => !c.marcas[x.p]) : false;
          const tono = c ? (malas ? "bg-rose-500/15 border-rose-500" : "bg-emerald-500/15 border-emerald-500") : enSel.has(k) ? "bg-amber-100 dark:bg-amber-900/40 border-amber-500" : "bg-card border-foreground/30";
          return (
            <div key={k} className="relative p-[1px]" role="gridcell">
              {inicios.has(k) && <span className="absolute top-0.5 left-1 z-10 text-[9px] font-black leading-none text-amber-700 dark:text-amber-300 pointer-events-none">{inicios.get(k)}</span>}
              <input
                ref={(el) => {
                  if (el) refs.current.set(k, el);
                  else refs.current.delete(k);
                }}
                value={letras[k] ?? ""}
                onChange={(e) => escribir(k, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Backspace") {
                    e.preventDefault();
                    borrar(k);
                  }
                }}
                onPointerDown={(e) => {
                  yaEnfocada.current = document.activeElement === e.currentTarget;
                }}
                onClick={(e) => {
                  tocar(k);
                  seleccionar(e.currentTarget);
                }}
                onFocus={(e) => seleccionar(e.currentTarget)}
                disabled={bloqueado}
                autoCapitalize="characters"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                enterKeyHint="next"
                className={`w-full h-full rounded-md border-2 text-center text-[16px] font-black uppercase caret-transparent focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-100 ${tono}`}
                aria-label={`Casilla de la palabra ${en.map((x) => flecha(x.p)).join(" y ")}`}
                data-testid={`cruce-${f}-${col}`}
              />
            </div>
          );
        })}
      </div>
      {!c && (
        <div className="mt-4 flex flex-wrap justify-center gap-2" role="group" aria-label="Palabras del crucigrama">
          {vista.palabras.map((w, p) => (
            <button
              key={p}
              type="button"
              onClick={() => elegir(p)}
              disabled={bloqueado}
              className={`h-9 px-3 rounded-full border-2 text-sm font-bold ${p === sel ? "border-amber-500 bg-amber-500/15" : "border-border bg-card"}`}
              data-testid={`palabra-cruce-${p}`}
            >
              {flecha(p)} · {w.largo} letras
            </button>
          ))}
        </div>
      )}
      {!c && <p className="mt-2 text-center text-xs text-muted-foreground">Toca una casilla o un número y escribe: la letra pasa sola a la siguiente. Las tildes no importan.</p>}
    </div>
  );
}

// ---------------------------------------------------------------- arma la frase

/** «Arma la frase»: los trozos de la idea, revueltos; se tocan en el orden en que se leen. */
export function ArmaLaFrase({ vista, correccion, bloqueado, alCambiar }: PropsPieza<VistaDe<"arma">>) {
  const [puestos, setPuestos] = useState<number[]>([]);
  useEffect(() => {
    alCambiar(puestos.length === vista.trozos.length ? { pieza: "completa", orden: puestos } : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [puestos]);
  const c = correccion?.formato === "arma" ? (correccion as { correcto: number[]; texto: string }) : null;
  const todoBien = !!c && puestos.every((k, pos) => c.correcto[pos] === k);
  return (
    <div data-testid="pieza-arma">
      <div className={`min-h-[120px] rounded-2xl border-2 p-3 flex flex-wrap gap-2 content-start ${c ? "border-transparent bg-muted/40" : "border-dashed border-amber-400/70 bg-amber-50/60 dark:bg-amber-950/20"}`} aria-label="Tu frase">
        {puestos.length === 0 && <p className="text-muted-foreground text-[15px] leading-snug">Toca abajo el trozo con que empieza la idea, y después los demás en orden.</p>}
        {puestos.map((k, pos) => {
          const ok = c ? c.correcto[pos] === k : null;
          return (
            <motion.button
              layout
              key={k}
              type="button"
              disabled={bloqueado}
              onClick={() => setPuestos(puestos.filter((x) => x !== k))}
              className={`text-left rounded-xl border-2 px-3 py-2 text-[16px] font-semibold leading-snug ${ok === true ? bien : ok === false ? mal : "border-amber-500 bg-card"}`}
              aria-label={`${pos + 1}: ${vista.trozos[k]}${bloqueado ? "" : ". Toca para devolverlo."}`}
              data-testid={`puesto-${pos}`}
            >
              {vista.trozos[k]}
            </motion.button>
          );
        })}
      </div>
      {c && !todoBien && (
        <div className="mt-3 rounded-2xl border-2 border-emerald-500/60 bg-emerald-500/10 px-3 py-2">
          <p className="text-[11px] font-bold uppercase tracking-wide text-emerald-800 dark:text-emerald-200">Así se lee</p>
          <p className="text-[16px] leading-snug font-medium">{c.texto}</p>
        </div>
      )}
      {!bloqueado && (
        <div className="mt-4 grid gap-2" role="group" aria-label="Trozos para tocar">
          {vista.trozos.map((t, k) =>
            puestos.includes(k) ? null : (
              <motion.button
                layout
                key={k}
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => setPuestos([...puestos, k])}
                className="text-left rounded-2xl border-2 border-border bg-card hover:border-amber-400/70 px-4 py-3 text-[16px] leading-snug min-h-[52px]"
                data-testid={`trozo-${k}`}
              >
                {t}
              </motion.button>
            ),
          )}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------- memoria

/** «Memoria»: las cartas boca abajo; se destapan de a dos y, si van juntas, quedan a la vista. */
export function Memoria({ vista, correccion, bloqueado, alEnviar }: PropsPieza<VistaDe<"memoria">>) {
  const quieto = useReducedMotion();
  const [abiertas, setAbiertas] = useState<number[]>([]);
  // al llegar el paso nuevo (otra pareja o un error), las dos que se destaparon quedan a la vista o se tapan
  const clave = `${vista.descubiertas.join(",")}|${vista.fallos}`;
  useEffect(() => setAbiertas([]), [clave]);
  const c = correccion?.formato === "memoria" ? (correccion as { cartas: number[]; par: boolean }) : null;
  const tocar = (i: number) => {
    if (bloqueado || abiertas.length >= 2 || abiertas.includes(i) || vista.descubiertas.includes(i)) return;
    const a = [...abiertas, i];
    setAbiertas(a);
    if (a.length === 2) alEnviar({ pieza: "relaciona", cartas: a });
  };
  return (
    <div data-testid="pieza-memoria">
      <p className="text-xs font-semibold text-muted-foreground mb-3">
        Parejas encontradas: {vista.paso + (c?.par ? 1 : 0)} de {vista.pasos}
      </p>
      <div className="grid grid-cols-2 gap-2.5" style={{ perspective: 900 }}>
        {vista.cartas.map((texto, i) => {
          const hallada = vista.descubiertas.includes(i);
          const abierta = hallada || abiertas.includes(i);
          const enJuego = !!c && c.cartas.includes(i);
          const borde = enJuego ? (c!.par ? "border-emerald-500 bg-emerald-500/12" : "border-rose-500 bg-rose-500/12") : hallada ? "border-emerald-500/60 bg-emerald-500/8" : "border-amber-500 bg-card";
          return (
            <motion.button
              key={i}
              type="button"
              onClick={() => tocar(i)}
              aria-label={abierta ? texto : `Carta ${i + 1}, tapada`}
              aria-pressed={abierta}
              className="relative min-h-[84px] rounded-2xl text-left"
              style={{ transformStyle: "preserve-3d" }}
              animate={quieto ? undefined : { rotateY: abierta ? 180 : 0, x: enJuego && !c!.par ? [0, -6, 6, -4, 4, 0] : 0 }}
              transition={{ rotateY: { duration: 0.35 }, x: { duration: 0.4 } }}
              data-testid={`carta-${i}`}
            >
              <span
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 text-white flex items-center justify-center shadow-md"
                style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", visibility: quieto && abierta ? "hidden" : undefined }}
                aria-hidden
              >
                <Flame className="w-7 h-7 opacity-90" fill="currentColor" fillOpacity={0.3} />
              </span>
              <span
                className={`absolute inset-0 rounded-2xl border-2 px-3 py-2 flex items-center text-[15px] font-semibold leading-snug ${borde}`}
                style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: quieto ? undefined : "rotateY(180deg)", visibility: quieto && !abierta ? "hidden" : undefined }}
              >
                <span className="flex-1">{texto}</span>
                {hallada && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
              </span>
            </motion.button>
          );
        })}
      </div>
      {c && !c.par && (
        <p className="mt-3 text-center text-sm font-semibold text-rose-700 dark:text-rose-300" role="status">
          No van juntas. Recuerda dónde está cada una.
        </p>
      )}
      {c && c.par && vista.paso < vista.pasos && (
        <p className="mt-3 text-center text-sm font-semibold text-emerald-700 dark:text-emerald-300" role="status">
          ¡Pareja!
        </p>
      )}
    </div>
  );
}

// ---------------------------------------------------------------- ¡atrápalas!

/** Cuánto tarda en caer una frase: más si es larga (que se alcance a leer). */
const segundosDeCaida = (texto: string) => Math.min(7, 3.8 + texto.split(/\s+/).length * 0.2);
/** El lugar de cada frase al caer (siempre el mismo para el mismo número, para que no salte de un lado a otro). */
const LUGARES = [50, 42, 58, 46, 54, 40, 60, 48];

/**
 * «¡Atrápalas!»: las frases caen una por una y se atrapan con un toque solo las del grupo que se pide (las demás se
 * dejan pasar). Sin prisa (o con el movimiento reducido del teléfono), se eligen de una lista.
 */
export function Atrapalas({ vista, correccion, bloqueado, alEnviar }: PropsPieza<VistaDe<"atrapa">>) {
  const quieto = useReducedMotion();
  const [estado, setEstado] = useState<"listo" | "cayendo" | "fin">("listo");
  const [actual, setActual] = useState(0);
  const [atrapadas, setAtrapadas] = useState<number[]>([]);
  const [atrapada, setAtrapada] = useState<number | null>(null);
  const [sinPrisa, setSinPrisa] = useState(false);
  const c = correccion?.formato === "atrapa" ? (correccion as { deGrupo: boolean[]; atrapadas: number[] }) : null;
  const lista = !!quieto || sinPrisa;
  const enviar = (a: number[]) => {
    setEstado("fin");
    alEnviar({ pieza: "clasifica", atrapadas: a });
  };
  const pasar = (a: number[]) => {
    setAtrapada(null);
    if (actual + 1 >= vista.frases.length) enviar(a);
    else setActual(actual + 1);
  };
  const atrapar = () => {
    if (estado !== "cayendo" || atrapada != null) return;
    const a = [...atrapadas, actual];
    setAtrapadas(a);
    setAtrapada(actual);
    window.setTimeout(() => pasar(a), 380);
  };

  // la corrección: cada frase, si era del grupo y si la atrapó
  if (c)
    return (
      <div data-testid="pieza-atrapa">
        <Cartel pregunta={vista.pregunta} grupo={vista.grupo} />
        <div className="mt-3 grid gap-2">
          {vista.frases.map((f, d) => {
            const era = c.deGrupo[d];
            const la = c.atrapadas.includes(d);
            const ok = era === la;
            const nota = era ? (la ? "La atrapaste" : "Se te escapó") : la ? "No era del grupo" : "Bien que la dejaste pasar";
            return (
              <div key={d} className={`rounded-2xl border-2 px-3 py-2 flex items-start gap-2 ${ok ? bien : mal}`} data-testid={`atrapa-${d}`}>
                <div className="flex-1">
                  <p className="text-[15px] font-semibold leading-snug">{f}</p>
                  <p className="text-xs font-bold opacity-80 mt-0.5">{nota}</p>
                </div>
                <Marca ok={ok} />
              </div>
            );
          })}
        </div>
      </div>
    );

  if (lista)
    return (
      <div data-testid="pieza-atrapa">
        <Cartel pregunta={vista.pregunta} grupo={vista.grupo} />
        <p className="mt-3 text-sm text-muted-foreground">Toca las frases que atraparías; las demás déjalas sin tocar.</p>
        <div className="mt-2 grid gap-2">
          {vista.frases.map((f, d) => {
            const la = atrapadas.includes(d);
            return (
              <button
                key={d}
                type="button"
                disabled={bloqueado || estado === "fin"}
                onClick={() => setAtrapadas(la ? atrapadas.filter((x) => x !== d) : [...atrapadas, d])}
                aria-pressed={la}
                className={`text-left rounded-2xl border-2 px-4 py-3 text-[15px] leading-snug min-h-[52px] flex items-center gap-2 ${la ? "border-amber-500 bg-amber-500/15 ring-2 ring-amber-500/40" : "border-border bg-card"}`}
                data-testid={`frase-${d}`}
              >
                <span className="flex-1">{f}</span>
                {la && <HandGrab className="w-5 h-5 text-amber-600 shrink-0" />}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          disabled={bloqueado || estado === "fin"}
          onClick={() => enviar(atrapadas)}
          className="mt-4 w-full h-12 rounded-2xl font-bold text-[17px] text-white bg-gradient-to-r from-amber-500 to-orange-600 disabled:opacity-60"
          data-testid="atrapa-listo"
        >
          {estado === "fin" ? "Revisando…" : "Listo"}
        </button>
      </div>
    );

  return (
    <div data-testid="pieza-atrapa">
      <Cartel pregunta={vista.pregunta} grupo={vista.grupo} />
      <div className="relative mt-3 h-[340px] overflow-hidden rounded-3xl border-2 border-border bg-gradient-to-b from-sky-50 to-amber-50 dark:from-sky-950/40 dark:to-amber-950/30">
        <style>{"@keyframes academia-caer { from { transform: translate(-50%, -130px); } to { transform: translate(-50%, 350px); } }"}</style>
        {estado === "listo" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
            <HandGrab className="w-12 h-12 text-amber-500" />
            <p className="text-[15px] leading-snug">
              Van a caer {vista.frases.length} frases, una por una. Tócalas para atrapar solo las del grupo <b>{vista.grupo}</b>.
            </p>
            <button type="button" onClick={() => setEstado("cayendo")} disabled={bloqueado} className="h-12 px-8 rounded-2xl font-black text-[17px] text-white bg-gradient-to-r from-amber-500 to-orange-600 shadow-lg shadow-orange-500/25" data-testid="atrapa-empezar">
              ¡Empezar!
            </button>
            <button type="button" onClick={() => setSinPrisa(true)} className="text-sm font-semibold text-muted-foreground underline" data-testid="atrapa-sin-prisa">
              Prefiero elegirlas sin prisa
            </button>
          </div>
        )}
        {estado === "cayendo" && actual < vista.frases.length && (
          <button
            key={actual}
            type="button"
            onClick={atrapar}
            onAnimationEnd={() => atrapada == null && pasar(atrapadas)}
            className={`absolute top-0 w-[78%] rounded-2xl border-2 px-3 py-3 text-[15px] font-semibold leading-snug text-left shadow-lg transition-colors ${atrapada === actual ? "border-amber-500 bg-amber-400 text-amber-950 scale-90" : "border-amber-400 bg-card"}`}
            style={{ left: `${LUGARES[actual % LUGARES.length]}%`, animation: `academia-caer ${segundosDeCaida(vista.frases[actual])}s linear forwards`, animationPlayState: atrapada === actual ? "paused" : "running" }}
            data-testid="cae"
          >
            {vista.frases[actual]}
          </button>
        )}
        {estado === "fin" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-[15px] font-semibold text-muted-foreground">Revisando…</p>
          </div>
        )}
        <div className="absolute bottom-0 inset-x-0 px-3 py-2 bg-background/80 backdrop-blur text-xs font-bold flex justify-between" aria-live="polite">
          <span>
            Frase {Math.min(actual + 1, vista.frases.length)} de {vista.frases.length}
          </span>
          <span className="text-amber-700 dark:text-amber-300">Atrapadas: {atrapadas.length}</span>
        </div>
      </div>
    </div>
  );
}

function Cartel({ pregunta, grupo }: { pregunta: string | null; grupo: string }) {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 py-3 shadow-md">
      {pregunta && <p className="text-[13px] opacity-90 leading-snug">{pregunta}</p>}
      <p className="text-[11px] font-bold uppercase tracking-wide opacity-90 mt-0.5 flex items-center gap-1">
        <HandGrab className="w-3.5 h-3.5" /> Atrapa solo las que son
      </p>
      <p className="text-xl font-black leading-tight">{grupo}</p>
    </div>
  );
}
