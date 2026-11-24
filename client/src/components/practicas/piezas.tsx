// Las piezas del motor de prácticas, como las usa el alumno en el teléfono: todo se hace con un dedo (tocar una cosa y
// luego su lugar; en ordenar, también arrastrar) y, al comprobar, cada pieza marca lo que quedó bien y lo que no.
// Cada pieza avisa su respuesta con `alCambiar` (null mientras está incompleta); las que se responden con un toque
// (verdad o error) la envían sola con `alEnviar`.
import { useEffect, useRef, useState } from "react";
import { Reorder, motion, useDragControls, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowUp, Check, GripVertical, Hand, Quote, X, Zap } from "lucide-react";
import type { Devolucion, Formato, ItemVista, RespuestaPractica } from "@shared/practicas";

/** La vista de una forma de jugar. */
export type VistaDe<F extends Formato> = Extract<ItemVista, { formato: F }>;
/** La vista de una pieza que se juega de una sola forma (o cuyas formas comparten la vista). */
export type VistaPieza<P extends ItemVista["pieza"]> = Extract<ItemVista, { pieza: P }>;

export type PropsPieza<V extends ItemVista> = {
  vista: V;
  /** La corrección del paso (de la forma de esta pieza), después de comprobar. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  correccion: any;
  devolucion: Devolucion | null;
  bloqueado: boolean;
  alCambiar: (r: RespuestaPractica | null) => void;
  alEnviar: (r: RespuestaPractica) => void;
};

/** Los colores de las parejas (siempre con su número: el color nunca va solo). */
export const COLORES_PAREJA = [
  "border-amber-500 bg-amber-500/15",
  "border-sky-500 bg-sky-500/15",
  "border-violet-500 bg-violet-500/15",
  "border-emerald-500 bg-emerald-500/15",
  "border-rose-500 bg-rose-500/15",
  "border-teal-500 bg-teal-500/15",
];

const bien = "border-emerald-500 bg-emerald-500/12 text-emerald-900 dark:text-emerald-100";
const mal = "border-rose-500 bg-rose-500/12 text-rose-900 dark:text-rose-100";
const elegido = "border-amber-500 bg-amber-500/15 ring-2 ring-amber-500/40";
const base = "border-border bg-card hover:border-amber-400/70";

export function Marca({ ok }: { ok: boolean }) {
  return ok ? (
    <span className="inline-flex w-6 h-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white" aria-label="Bien"><Check className="w-4 h-4" /></span>
  ) : (
    <span className="inline-flex w-6 h-6 shrink-0 items-center justify-center rounded-full bg-rose-500 text-white" aria-label="No"><X className="w-4 h-4" /></span>
  );
}

// ---------------------------------------------------------------- relámpago (las tarjetas de la lección)

/**
 * «Relámpago»: la pregunta de cada tarjeta con tres respuestas (la suya y las de otras tarjetas). Antes el alumno
 * volteaba la tarjeta y se calificaba solo («lo sabía»), lo que confundía al comienzo y dejaba hacer trampa.
 */
export function Relampago({ vista, correccion, bloqueado, alEnviar }: PropsPieza<VistaDe<"relampago">>) {
  const quieto = useReducedMotion();
  const [sel, setSel] = useState<number | null>(null);
  useEffect(() => setSel(null), [vista.pregunta]);
  return (
    <div data-testid="pieza-relampago">
      <p className="text-xs font-semibold text-muted-foreground mb-2">Pregunta {vista.paso + 1} de {vista.pasos}</p>
      <motion.div
        key={vista.pregunta}
        initial={quieto ? false : { opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl border-2 border-amber-400/60 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/30 p-5 mb-4"
      >
        <Zap className="w-6 h-6 text-amber-500 mb-1" fill="currentColor" fillOpacity={0.3} aria-hidden />
        <p className="text-xl font-bold leading-snug">{vista.pregunta}</p>
      </motion.div>
      <div className="grid gap-2" role="radiogroup" aria-label="Respuestas">
        {vista.opciones.map((o, k) => {
          const cls = correccion ? (k === correccion.correcta ? bien : sel === k ? mal : "border-border bg-card opacity-70") : sel === k ? elegido : base;
          return (
            <motion.button
              key={k}
              type="button"
              role="radio"
              aria-checked={sel === k}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                if (bloqueado) return;
                setSel(k);
                alEnviar({ pieza: "tarjetas", opcion: k });
              }}
              className={`text-left rounded-2xl border-2 px-4 py-3 text-[15px] leading-snug min-h-[52px] ${cls}`}
              data-testid={`opcion-${k}`}
            >
              {o}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- completa la idea

export function Completa({ vista, correccion, bloqueado, alCambiar }: PropsPieza<VistaDe<"banco">>) {
  const huecos = vista.partes.filter((p) => typeof p !== "string").length;
  const [llenos, setLlenos] = useState<(number | null)[]>(() => Array(huecos).fill(null));
  const [activo, setActivo] = useState(0);
  useEffect(() => {
    alCambiar(llenos.every((x) => x != null) ? { pieza: "completa", huecos: llenos.map((k) => vista.banco[k!]) } : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [llenos]);
  const usados = new Set(llenos.filter((x) => x != null) as number[]);
  const poner = (k: number) => {
    if (bloqueado || usados.has(k)) return;
    const destino = llenos[activo] == null ? activo : llenos.findIndex((x) => x == null);
    if (destino < 0) return;
    const nuevos = [...llenos];
    nuevos[destino] = k;
    setLlenos(nuevos);
    const sig = nuevos.findIndex((x) => x == null);
    setActivo(sig < 0 ? destino : sig);
  };
  const quitar = (h: number) => {
    if (bloqueado) return;
    if (llenos[h] == null) return setActivo(h);
    const nuevos = [...llenos];
    nuevos[h] = null;
    setLlenos(nuevos);
    setActivo(h);
  };
  return (
    <div data-testid="pieza-completa">
      <p className="text-lg leading-[2.4] font-medium">
        {vista.partes.map((p, idx) => {
          // la puntuación que sigue a un hueco va pegada a él (si no, la coma queda sola al comienzo de la línea)
          if (typeof p === "string") {
            const antes = vista.partes[idx - 1];
            const texto = antes && typeof antes !== "string" ? p.replace(/^[,.;:!?)»]+/, "") : p;
            return <span key={idx}>{texto}</span>;
          }
          const sig = vista.partes[idx + 1];
          const pegada = typeof sig === "string" ? (sig.match(/^[,.;:!?)»]+/)?.[0] ?? "") : "";
          const h = p.hueco;
          const k = llenos[h];
          const marca = correccion ? correccion.marcas[h] : null;
          const hueco = (
            <span key={idx} className="inline-flex flex-col items-center align-middle mx-0.5">
              <motion.button
                type="button"
                layout
                onClick={() => quitar(h)}
                className={`min-w-[84px] h-10 px-3 rounded-xl border-2 border-dashed text-base font-semibold transition-colors ${
                  marca === true ? bien + " border-solid" : marca === false ? mal + " border-solid" : k != null ? "border-amber-500 border-solid bg-amber-500/15" : activo === h ? "border-amber-500 bg-amber-500/5" : "border-muted-foreground/40"
                }`}
                aria-label={k != null ? `Hueco ${h + 1}: ${vista.banco[k]}. Toca para quitar.` : `Hueco ${h + 1}, vacío`}
                data-testid={`hueco-${h}`}
              >
                {k != null ? vista.banco[k] : " "}
              </motion.button>
              {correccion && marca === false && <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 leading-tight -mt-1">{correccion.correctas[h]}</span>}
            </span>
          );
          return pegada ? (
            <span key={idx} className="whitespace-nowrap">
              {hueco}
              {pegada}
            </span>
          ) : (
            hueco
          );
        })}
      </p>
      {!bloqueado && (
        <div className="flex flex-wrap gap-2 mt-6 justify-center" role="group" aria-label="Palabras para elegir">
          {vista.banco.map((w, k) => (
            <motion.button
              key={k}
              type="button"
              layout
              whileTap={{ scale: 0.94 }}
              onClick={() => poner(k)}
              disabled={usados.has(k)}
              className={`h-11 px-4 rounded-xl border-2 text-base font-semibold shadow-sm transition-opacity ${usados.has(k) ? "opacity-0 pointer-events-none" : "border-border bg-card"}`}
              data-testid={`palabra-${k}`}
            >
              {w}
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------- relaciona

export function Relaciona({ vista, correccion, bloqueado, alCambiar }: PropsPieza<VistaDe<"parejas">>) {
  const n = vista.izquierda.length;
  const [pares, setPares] = useState<(number | null)[]>(() => Array(n).fill(null));
  const [izq, setIzq] = useState<number | null>(0);
  useEffect(() => {
    alCambiar(pares.every((x) => x != null) ? { pieza: "relaciona", pares: pares as number[] } : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pares]);
  const elegirIzq = (i: number) => {
    if (bloqueado) return;
    setIzq(i);
  };
  const elegirDer = (j: number) => {
    if (bloqueado) return;
    const i = izq ?? pares.findIndex((x) => x == null);
    if (i < 0) return;
    const nuevos = pares.map((x) => (x === j ? null : x));
    nuevos[i] = nuevos[i] === j ? null : j;
    setPares(nuevos);
    const sig = nuevos.findIndex((x) => x == null);
    setIzq(sig < 0 ? null : sig);
  };
  const colorDe = (i: number) => COLORES_PAREJA[i % COLORES_PAREJA.length];
  return (
    <div className="grid grid-cols-2 gap-3" data-testid="pieza-relaciona">
      <div className="space-y-2" role="group" aria-label="Ideas">
        {vista.izquierda.map((t, i) => {
          const ok = correccion ? correccion.marcas[i] : null;
          return (
            <motion.button
              key={i}
              type="button"
              layout
              whileTap={{ scale: 0.97 }}
              onClick={() => elegirIzq(i)}
              className={`w-full min-h-[56px] text-left rounded-2xl border-2 px-3 py-2 text-[15px] font-semibold flex items-center gap-2 ${
                ok === true ? bien : ok === false ? mal : pares[i] != null ? colorDe(i) : izq === i ? elegido : base
              }`}
              data-testid={`izq-${i}`}
            >
              {pares[i] != null && <span className="w-6 h-6 shrink-0 rounded-full bg-foreground/80 text-background text-xs flex items-center justify-center">{i + 1}</span>}
              <span className="flex-1">{t}</span>
              {ok != null && <Marca ok={ok} />}
            </motion.button>
          );
        })}
      </div>
      <div className="space-y-2" role="group" aria-label="Lo que les corresponde">
        {vista.derecha.map((t, j) => {
          const de = pares.indexOf(j);
          const correctaDe = correccion ? correccion.correctas.indexOf(j) : -1;
          const ok = correccion && de >= 0 ? correccion.marcas[de] : null;
          return (
            <motion.button
              key={j}
              type="button"
              layout
              whileTap={{ scale: 0.97 }}
              onClick={() => elegirDer(j)}
              className={`w-full min-h-[56px] text-left rounded-2xl border-2 px-3 py-2 text-[14px] leading-snug flex items-center gap-2 ${ok === true ? bien : ok === false ? mal : de >= 0 ? colorDe(de) : base}`}
              data-testid={`der-${j}`}
            >
              {de >= 0 && <span className="w-6 h-6 shrink-0 rounded-full bg-foreground/80 text-background text-xs flex items-center justify-center">{de + 1}</span>}
              <span className="flex-1">
                {t}
                {correccion && ok === false && correctaDe >= 0 && <span className="block text-xs font-semibold text-emerald-700 dark:text-emerald-300 mt-1">Va con: {vista.izquierda[correctaDe]}</span>}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- clasifica (recuadros)

/** Los colores de los grupos (siempre con su nombre: el color nunca va solo). */
const COLORES_GRUPO = [
  { caja: "border-sky-400/70 bg-sky-500/5", titulo: "bg-sky-500 text-white" },
  { caja: "border-violet-400/70 bg-violet-500/5", titulo: "bg-violet-500 text-white" },
  { caja: "border-teal-400/70 bg-teal-500/5", titulo: "bg-teal-600 text-white" },
];

/**
 * «Clasifica»: los recuadros de los grupos van arriba, cada uno con su color y su nombre, y las frases por llevar
 * debajo. Se toca una frase (queda marcada) y después el recuadro donde va; los recuadros se encienden mientras hay una
 * frase marcada. (Luis no entendía «a qué correspondía qué cosa»: ahora se ve qué tocar en cada momento.)
 */
export function Clasifica({ vista, correccion, bloqueado, alCambiar }: PropsPieza<VistaDe<"recuadros">>) {
  const quieto = useReducedMotion();
  const [grupoDe, setGrupoDe] = useState<(number | null)[]>(() => Array(vista.frases.length).fill(null));
  const [sel, setSel] = useState<number | null>(null);
  useEffect(() => {
    alCambiar(grupoDe.every((g) => g != null) ? { pieza: "clasifica", grupos: grupoDe as number[] } : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grupoDe]);
  const llevar = (g: number) => {
    if (bloqueado || sel == null) return;
    const nuevos = [...grupoDe];
    nuevos[sel] = g;
    setGrupoDe(nuevos);
    setSel(null);
  };
  const ficha = (k: number, enGrupo: boolean) => {
    const ok = correccion ? correccion.marcas[k] : null;
    return (
      <motion.button
        key={k}
        layoutId={quieto ? undefined : `frase-${k}`}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          if (!bloqueado) setSel(sel === k ? null : k);
        }}
        className={`text-left rounded-xl border-2 px-3 py-2 leading-snug flex items-start gap-2 ${enGrupo ? "text-[14px]" : "text-[15px]"} ${
          ok === true ? bien : ok === false ? mal : sel === k ? elegido : "border-border bg-card"
        }`}
        aria-pressed={sel === k}
        data-testid={`frase-${k}`}
      >
        <span className="flex-1">
          {vista.frases[k]}
          {correccion && ok === false && <span className="block text-xs font-semibold text-emerald-700 dark:text-emerald-300 mt-1">Va en: {vista.grupos[correccion.correctas[k]]}</span>}
          {correccion && correccion.explicas[k] && <span className="block text-xs text-muted-foreground mt-1">{correccion.explicas[k]}</span>}
        </span>
        {ok != null && <Marca ok={ok} />}
      </motion.button>
    );
  };
  const sueltas = grupoDe.map((g, k) => (g == null ? k : -1)).filter((k) => k >= 0);
  const enciende = sel != null && !bloqueado;
  return (
    <div data-testid="pieza-clasifica">
      <div className={`grid gap-2.5 ${vista.grupos.length === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
        {vista.grupos.map((g, gi) => {
          const color = COLORES_GRUPO[gi % COLORES_GRUPO.length];
          return (
            <motion.div
              key={gi}
              role="button"
              tabIndex={0}
              onClick={() => llevar(gi)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && llevar(gi)}
              animate={enciende && !quieto ? { scale: [1, 1.02, 1] } : { scale: 1 }}
              transition={enciende ? { repeat: Infinity, duration: 1.4 } : undefined}
              className={`rounded-2xl border-2 overflow-hidden min-h-[110px] flex flex-col ${color.caja} ${enciende ? "ring-2 ring-amber-500/70 cursor-pointer" : ""}`}
              aria-label={`Recuadro: ${g}`}
              data-testid={`grupo-${gi}`}
            >
              <p className={`px-3 py-1.5 text-[13px] font-bold leading-tight ${color.titulo}`}>{g}</p>
              <div className="p-2 flex flex-col gap-1.5 flex-1">
                {grupoDe.map((x, k) => (x === gi ? ficha(k, true) : null))}
                {enciende && <p className="text-[12px] font-semibold text-amber-700 dark:text-amber-300 flex items-center gap-1 mt-auto"><Hand className="w-3.5 h-3.5" /> Toca aquí para ponerla</p>}
              </div>
            </motion.div>
          );
        })}
      </div>
      {!correccion && (
        <p className="text-sm font-semibold mt-4 mb-2">
          {sueltas.length
            ? sel == null
              ? `1. Toca una frase · 2. Toca su recuadro (quedan ${sueltas.length})`
              : "Ahora toca el recuadro donde va esa frase."
            : "Todas están en su recuadro. Si quieres cambiar una, tócala y elige otro recuadro."}
        </p>
      )}
      {sueltas.length > 0 && (
        <div className="flex flex-col gap-2" role="group" aria-label="Frases por llevar">
          {sueltas.map((k) => ficha(k, false))}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------- ordena (y la línea del tiempo)

function FilaOrden({ id, texto, n, total, mover, bloqueado, estado, fecha, linea }: { id: number; texto: string; n: number; total: number; mover: (d: -1 | 1) => void; bloqueado: boolean; estado: boolean | null; fecha?: string; linea?: boolean }) {
  const controles = useDragControls();
  return (
    <Reorder.Item
      value={id}
      dragListener={false}
      dragControls={controles}
      className={`relative flex items-center gap-2 rounded-2xl border-2 pl-1 pr-2 py-2 bg-card select-none ${estado === true ? bien : estado === false ? mal : "border-border"} ${linea ? "ml-6" : ""}`}
      whileDrag={{ scale: 1.03, boxShadow: "0 12px 28px rgba(0,0,0,0.18)" }}
      data-testid={`orden-${id}`}
    >
      {linea && <span className="absolute -left-[22px] top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 border-amber-500 bg-background" aria-hidden />}
      <button
        type="button"
        className="touch-none w-9 h-11 flex items-center justify-center text-muted-foreground disabled:opacity-30"
        onPointerDown={(e) => !bloqueado && controles.start(e)}
        disabled={bloqueado}
        aria-label="Arrastrar"
      >
        <GripVertical className="w-5 h-5" />
      </button>
      <span className="w-7 h-7 shrink-0 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-200 text-sm font-bold flex items-center justify-center">{n + 1}</span>
      <span className="flex-1 text-[15px] leading-snug font-medium">
        {texto}
        {fecha && <span className="block text-xs font-semibold text-amber-700 dark:text-amber-300 mt-0.5">{fecha}</span>}
      </span>
      {estado != null ? (
        <Marca ok={estado} />
      ) : (
        <span className="flex flex-col">
          <button type="button" onClick={() => mover(-1)} disabled={bloqueado || n === 0} className="w-8 h-6 flex items-center justify-center disabled:opacity-20" aria-label="Subir"><ArrowUp className="w-4 h-4" /></button>
          <button type="button" onClick={() => mover(1)} disabled={bloqueado || n === total - 1} className="w-8 h-6 flex items-center justify-center disabled:opacity-20" aria-label="Bajar"><ArrowDown className="w-4 h-4" /></button>
        </span>
      )}
    </Reorder.Item>
  );
}

export function Ordena({ items, correcto, fechas, bloqueado, alCambiar, linea }: { items: string[]; correcto: number[] | null; fechas?: string[] | null; bloqueado: boolean; alCambiar: (orden: number[]) => void; linea?: boolean }) {
  const [orden, setOrden] = useState<number[]>(() => items.map((_, i) => i));
  useEffect(() => {
    alCambiar(orden);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orden]);
  const mover = (pos: number, d: -1 | 1) => {
    const o = [...orden];
    const j = pos + d;
    if (j < 0 || j >= o.length) return;
    [o[pos], o[j]] = [o[j], o[pos]];
    setOrden(o);
  };
  return (
    <div className={linea ? "relative" : ""}>
      {linea && <span className="absolute left-[7px] top-3 bottom-3 w-0.5 bg-gradient-to-b from-amber-400 to-orange-600 rounded-full" aria-hidden />}
      <Reorder.Group axis="y" values={orden} onReorder={(o) => !bloqueado && setOrden(o)} className="flex flex-col gap-2">
        {orden.map((id, pos) => (
          <FilaOrden
            key={id}
            id={id}
            texto={items[id]}
            n={pos}
            total={orden.length}
            mover={(d) => mover(pos, d)}
            bloqueado={bloqueado}
            estado={correcto ? correcto[pos] === id : null}
            fecha={correcto && fechas ? fechas[id] : undefined}
            linea={linea}
          />
        ))}
      </Reorder.Group>
      {correcto && correcto.some((id, pos) => orden[pos] !== id) && (
        <div className="mt-4 rounded-2xl border border-emerald-500/40 bg-emerald-500/5 p-3">
          <p className="text-sm font-bold text-emerald-800 dark:text-emerald-200 mb-1.5">El orden correcto</p>
          <ol className="space-y-1 text-sm list-decimal pl-5">
            {correcto.map((id) => (
              <li key={id}>
                {items[id]}
                {fechas && <span className="text-xs text-muted-foreground"> · {fechas[id]}</span>}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------- ¿verdad o error?

export function Verdad({ vista, correccion, devolucion, bloqueado, alEnviar }: PropsPieza<VistaDe<"verdad-o-error">>) {
  const quieto = useReducedMotion();
  const [elegida, setElegida] = useState<boolean | null>(null);
  useEffect(() => setElegida(null), [vista.afirmacion]);
  const enviar = (v: boolean) => {
    if (bloqueado) return;
    setElegida(v);
    alEnviar({ pieza: "verdad", verdad: v });
  };
  const ok = devolucion ? devolucion.bien : null;
  return (
    <div className="flex flex-col items-center" data-testid="pieza-verdad">
      <p className="text-xs font-semibold text-muted-foreground mb-3">Afirmación {vista.paso + 1} de {vista.pasos}</p>
      <motion.div
        key={vista.afirmacion}
        drag={bloqueado || quieto ? false : "x"}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.6}
        onDragEnd={(_, info) => {
          if (info.offset.x > 110) enviar(true);
          else if (info.offset.x < -110) enviar(false);
        }}
        initial={quieto ? false : { opacity: 0, scale: 0.92, y: 16 }}
        animate={ok === false && !quieto ? { opacity: 1, scale: 1, y: 0, x: [0, -10, 10, -6, 6, 0] } : { opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className={`w-full min-h-[180px] rounded-3xl border-2 p-6 flex flex-col justify-center cursor-grab active:cursor-grabbing ${ok === true ? bien : ok === false ? mal : "border-amber-400/60 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/30"}`}
      >
        <Quote className="w-6 h-6 text-amber-600/60 mb-2" aria-hidden />
        <p className="text-xl font-semibold leading-snug">{vista.afirmacion}</p>
        {correccion && (
          <p className="mt-4 text-sm font-bold">{correccion.verdad ? "Es verdad." : "Es un error."}</p>
        )}
      </motion.div>
      {!bloqueado && !quieto && <p className="text-xs text-muted-foreground mt-2">También puedes deslizar: a la derecha es verdad, a la izquierda es un error.</p>}
      <div className="grid grid-cols-2 gap-3 w-full mt-4">
        <motion.button
          type="button"
          whileTap={{ scale: 0.95 }}
          onClick={() => enviar(false)}
          disabled={bloqueado}
          className={`h-14 rounded-2xl border-2 font-bold text-lg flex items-center justify-center gap-2 ${elegida === false ? "border-rose-500 bg-rose-500/15" : "border-rose-400/70 text-rose-700 dark:text-rose-300"} disabled:opacity-70`}
          data-testid="verdad-error"
        >
          <X className="w-5 h-5" /> Error
        </motion.button>
        <motion.button
          type="button"
          whileTap={{ scale: 0.95 }}
          onClick={() => enviar(true)}
          disabled={bloqueado}
          className={`h-14 rounded-2xl border-2 font-bold text-lg flex items-center justify-center gap-2 ${elegida === true ? "border-emerald-500 bg-emerald-500/15" : "border-emerald-500/70 text-emerald-700 dark:text-emerald-300"} disabled:opacity-70`}
          data-testid="verdad-verdad"
        >
          <Check className="w-5 h-5" /> Verdad
        </motion.button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- encuentra el error

export function EncuentraError({ vista, correccion, bloqueado, alCambiar }: PropsPieza<VistaPieza<"error">>) {
  const [sel, setSel] = useState<number | null>(null);
  useEffect(() => {
    alCambiar(sel == null ? null : { pieza: "error", frase: sel });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sel]);
  return (
    <div className="flex flex-col gap-2" role="radiogroup" aria-label="Frases" data-testid="pieza-error">
      {vista.frases.map((f, k) => {
        const esMalo = correccion ? correccion.malo === k : false;
        const cls = correccion ? (esMalo ? mal : sel === k ? "border-border opacity-80" : "border-border bg-card") : sel === k ? elegido : base;
        return (
          <motion.button
            key={k}
            type="button"
            role="radio"
            aria-checked={sel === k}
            whileTap={{ scale: 0.98 }}
            onClick={() => !bloqueado && setSel(k)}
            className={`text-left rounded-2xl border-2 px-4 py-3 text-[15px] leading-snug ${cls}`}
            data-testid={`frase-${k}`}
          >
            <span className={esMalo ? "line-through decoration-rose-500/70" : ""}>{f}</span>
            {esMalo && <span className="block mt-2 text-sm font-semibold text-emerald-800 dark:text-emerald-200 no-underline">Debería decir: {correccion!.correccion}</span>}
            {correccion && !esMalo && sel === k && <span className="block mt-1 text-xs font-semibold text-muted-foreground">Esta frase está bien.</span>}
          </motion.button>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------- situación (y los pasos de un caso)

export function Opciones({ opciones, correcta, explicas, bloqueado, alElegir, marcarValor }: { opciones: string[]; correcta: number | null; explicas: string[] | null; bloqueado: boolean; alElegir: (k: number) => void; marcarValor?: (k: number) => boolean | null }) {
  const [sel, setSel] = useState<number | null>(null);
  useEffect(() => setSel(null), [opciones.join("|")]);
  return (
    <div className="flex flex-col gap-2" role="radiogroup">
      {opciones.map((o, k) => {
        const ok = correcta != null ? k === correcta : marcarValor ? marcarValor(k) : null;
        const cls = correcta != null || (marcarValor && marcarValor(k) != null) ? (ok ? bien : sel === k ? mal : "border-border bg-card opacity-80") : sel === k ? elegido : base;
        return (
          <motion.button
            key={k}
            type="button"
            role="radio"
            aria-checked={sel === k}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              if (bloqueado) return;
              setSel(k);
              alElegir(k);
            }}
            className={`text-left rounded-2xl border-2 px-4 py-3 text-[15px] leading-snug ${cls}`}
            data-testid={`opcion-${k}`}
          >
            <span className="flex items-start gap-3">
              <span className={`mt-0.5 w-5 h-5 shrink-0 rounded-full border-2 ${sel === k ? "border-amber-500 bg-amber-500" : "border-muted-foreground/50"}`} aria-hidden />
              <span className="flex-1">
                {o}
                {explicas && <span className="block mt-1.5 text-sm text-muted-foreground">{explicas[k]}</span>}
              </span>
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

export function Situacion({ vista, correccion, bloqueado, alCambiar }: PropsPieza<VistaPieza<"situacion">>) {
  return (
    <div data-testid="pieza-situacion">
      <div className="rounded-3xl bg-gradient-to-br from-sky-50 to-indigo-50 dark:from-sky-950/40 dark:to-indigo-950/30 border border-sky-300/50 dark:border-sky-700/50 p-4 mb-4">
        <Quote className="w-5 h-5 text-sky-600/70 mb-1" aria-hidden />
        <p className="text-[16px] leading-relaxed">{vista.caso}</p>
      </div>
      <p className="font-bold text-lg mb-3">{vista.pregunta}</p>
      <Opciones opciones={vista.opciones} correcta={correccion ? correccion.correcta : null} explicas={correccion ? correccion.explicas : null} bloqueado={bloqueado} alElegir={(k) => alCambiar({ pieza: "situacion", opcion: k })} />
    </div>
  );
}

// ---------------------------------------------------------------- explícalo con tus palabras

export const contarPalabras = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;

export function Escribir({ pregunta, min, max, correccion, bloqueado, alCambiar }: { pregunta: string; min: number; max: number; correccion: { nota: number; ideas: { texto: string; ok: boolean }[]; avisos?: string[]; modelo: string } | null; bloqueado: boolean; alCambiar: (texto: string | null) => void }) {
  const [texto, setTexto] = useState("");
  const n = contarPalabras(texto);
  const ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    alCambiar(n >= 5 ? texto : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [texto]);
  return (
    <div data-testid="pieza-explica">
      <p className="font-bold text-lg mb-3">{pregunta}</p>
      <textarea
        ref={ref}
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        disabled={bloqueado}
        rows={5}
        className="w-full rounded-2xl border-2 border-border bg-card p-4 text-[16px] leading-relaxed focus:outline-none focus:border-amber-500 disabled:opacity-90"
        placeholder="Escribe aquí con tus palabras…"
        aria-label={pregunta}
        data-testid="explica-texto"
      />
      <p className={`text-xs mt-1 text-right ${n > max ? "text-rose-600" : n >= min ? "text-emerald-700 dark:text-emerald-300" : "text-muted-foreground"}`}>
        {n} {n === 1 ? "palabra" : "palabras"} (de {min} a {max})
      </p>
      {correccion && (
        <div className="mt-3 space-y-3">
          <div className="flex items-center gap-3">
            <span className={`text-3xl font-black ${correccion.nota >= 80 ? "text-emerald-600" : correccion.nota >= 50 ? "text-amber-600" : "text-rose-600"}`}>{correccion.nota}</span>
            <span className="text-sm text-muted-foreground leading-tight">de 100: lo que tu respuesta dice de las ideas de la lección</span>
          </div>
          <ul className="space-y-1.5">
            {correccion.ideas.map((i, k) => (
              <li key={k} className="flex items-start gap-2 text-[15px]">
                <Marca ok={i.ok} />
                <span>{i.texto}</span>
              </li>
            ))}
          </ul>
          {!!correccion.avisos?.length && (
            <ul className="text-sm text-amber-800 dark:text-amber-200 space-y-1">
              {correccion.avisos.map((a, k) => (
                <li key={k}>{a}</li>
              ))}
            </ul>
          )}
          <details className="rounded-2xl border border-border p-3" open={correccion.nota < 80}>
            <summary className="font-semibold text-sm cursor-pointer">Una buena respuesta</summary>
            <p className="mt-2 text-[15px] leading-relaxed">{correccion.modelo}</p>
          </details>
        </div>
      )}
    </div>
  );
}

export function Explica({ vista, correccion, bloqueado, alCambiar }: PropsPieza<VistaDe<"texto">>) {
  return <Escribir pregunta={vista.pregunta} min={vista.min} max={vista.max} correccion={correccion} bloqueado={bloqueado} alCambiar={(t) => alCambiar(t == null ? null : { pieza: "explica", texto: t })} />;
}
