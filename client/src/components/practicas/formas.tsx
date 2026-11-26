// Las formas de jugar que el motor saca del mismo contenido (shared/practicas.ts, `FORMATOS`): así cada práctica es
// distinta y nadie sabe con qué se va a encontrar. Las de un toque (elige la pareja, desliza, ¿cuál no va?, escalones,
// ¿dónde va?, ¿cuál es falsa?) se envían solas al tocar; las demás piden «Comprobar».
import { Fragment, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, ChevronUp, Footprints, MessageCircle, Plus, Search, User, X } from "lucide-react";
import type { RespuestaPractica } from "@shared/practicas";
import { Marca, Opciones, type PropsPieza, type VistaDe, type VistaPieza } from "./piezas";

const bien = "border-emerald-500 bg-emerald-500/12 text-emerald-900 dark:text-emerald-100";
const mal = "border-rose-500 bg-rose-500/12 text-rose-900 dark:text-rose-100";
const elegido = "border-amber-500 bg-amber-500/15 ring-2 ring-amber-500/40";
const base = "border-border bg-card hover:border-amber-400/70";
const apagado = "border-border bg-card opacity-60";

/** Las opciones de un toque: al tocar se envía; después de corregir, la buena queda verde y la elegida, roja. */
function OpcionesDeUnToque({ opciones, correcta, bloqueado, alElegir, grande = false }: { opciones: string[]; correcta: number | null; bloqueado: boolean; alElegir: (k: number) => void; grande?: boolean }) {
  const [sel, setSel] = useState<number | null>(null);
  const clave = opciones.join("|");
  useEffect(() => setSel(null), [clave]);
  return (
    <div className="grid gap-2" role="radiogroup">
      {opciones.map((o, k) => {
        const cls = correcta != null ? (k === correcta ? bien : sel === k ? mal : apagado) : sel === k ? elegido : base;
        return (
          <motion.button
            key={`${clave}-${k}`}
            type="button"
            role="radio"
            aria-checked={sel === k}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              if (bloqueado) return;
              setSel(k);
              alElegir(k);
            }}
            className={`text-left rounded-2xl border-2 px-4 py-3 leading-snug min-h-[52px] ${grande ? "text-[16px] font-semibold" : "text-[15px]"} ${cls}`}
            data-testid={`opcion-${k}`}
          >
            <span className="flex items-start gap-2">
              <span className="flex-1">{o}</span>
              {correcta != null && k === correcta && <Marca ok />}
              {correcta != null && sel === k && k !== correcta && <Marca ok={false} />}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

function Paso({ paso, pasos, texto }: { paso: number; pasos: number; texto: string }) {
  return (
    <p className="text-xs font-semibold text-muted-foreground mb-2">
      {texto} {paso + 1} de {pasos}
    </p>
  );
}

// ---------------------------------------------------------------- completa: elige la palabra

export function EligePalabra({ vista, correccion, bloqueado, alCambiar }: PropsPieza<VistaDe<"elige">>) {
  const [elegidas, setElegidas] = useState<(string | null)[]>(() => vista.opciones.map(() => null));
  useEffect(() => {
    alCambiar(elegidas.every((x) => x != null) ? { pieza: "completa", huecos: elegidas as string[] } : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elegidas]);
  return (
    <div data-testid="pieza-elige">
      <p className="text-lg leading-[2.6] font-medium">
        {vista.partes.map((p, idx) => {
          if (typeof p === "string") return <span key={idx}>{p}</span>;
          const h = p.hueco;
          const marca = correccion ? correccion.marcas[h] : null;
          return (
            <span key={idx} className="inline-flex flex-col items-center align-middle mx-1 my-1 gap-1">
              <span className="inline-flex gap-1 rounded-2xl bg-muted/60 p-1">
                {vista.opciones[h].map((o) => {
                  const esta = elegidas[h] === o;
                  const cls =
                    marca === true && esta ? bien : marca === false && esta ? mal : correccion && o === correccion.correctas[h] ? "border-emerald-500/70 bg-emerald-500/10" : esta ? elegido : "border-transparent bg-card";
                  return (
                    <button
                      key={o}
                      type="button"
                      onClick={() => {
                        if (bloqueado) return;
                        const n = [...elegidas];
                        n[h] = o;
                        setElegidas(n);
                      }}
                      className={`h-10 px-3 rounded-xl border-2 text-[15px] font-semibold leading-none ${cls}`}
                      aria-pressed={esta}
                      data-testid={`elige-${h}-${o}`}
                    >
                      {o}
                    </button>
                  );
                })}
              </span>
            </span>
          );
        })}
      </p>
    </div>
  );
}

// ---------------------------------------------------------------- completa: escríbela

export function Escribela({ vista, correccion, bloqueado, alCambiar }: PropsPieza<VistaDe<"escribe">>) {
  const [textos, setTextos] = useState<string[]>(() => vista.letras.map(() => ""));
  useEffect(() => {
    alCambiar(textos.every((x) => x.trim()) ? { pieza: "completa", huecos: textos } : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textos]);
  return (
    <div data-testid="pieza-escribe">
      <p className="text-lg leading-[2.6] font-medium">
        {vista.partes.map((p, idx) => {
          if (typeof p === "string") return <span key={idx}>{p}</span>;
          const h = p.hueco;
          const marca = correccion ? correccion.marcas[h] : null;
          return (
            <span key={idx} className="inline-flex flex-col items-center align-middle mx-1">
              <input
                value={textos[h]}
                onChange={(e) => {
                  const n = [...textos];
                  n[h] = e.target.value;
                  setTextos(n);
                }}
                disabled={bloqueado}
                autoCapitalize="off"
                autoComplete="off"
                spellCheck={false}
                placeholder={`${vista.iniciales?.[h] ?? ""}…`}
                style={{ width: `${Math.max(6, vista.letras[h] + 4)}ch` }}
                className={`h-10 rounded-xl border-2 px-2 text-center text-[16px] font-semibold bg-card placeholder:text-muted-foreground/60 focus:outline-none focus:border-amber-500 ${marca === true ? bien : marca === false ? mal : "border-dashed border-muted-foreground/50"}`}
                aria-label={`Espacio ${h + 1}: empieza con ${vista.iniciales?.[h] ?? ""} y tiene ${vista.letras[h]} letras`}
                data-testid={`escribe-${h}`}
              />
              <span className="text-[10px] text-muted-foreground leading-none mt-0.5">{vista.letras[h]} letras</span>
              {correccion && marca === false && <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 leading-tight">{correccion.correctas[h]}</span>}
            </span>
          );
        })}
      </p>
      <p className="text-xs text-muted-foreground mt-3">Cada espacio te muestra su primera letra y cuántas letras tiene. Las tildes y las mayúsculas no importan, y en las palabras largas se perdona una letra.</p>
    </div>
  );
}

// ---------------------------------------------------------------- relaciona: elige la pareja

export function EligePareja({ vista, correccion, bloqueado, alEnviar }: PropsPieza<VistaDe<"elige-pareja">>) {
  const quieto = useReducedMotion();
  return (
    <div data-testid="pieza-elige-pareja">
      <Paso paso={vista.paso} pasos={vista.pasos} texto="Pareja" />
      <motion.div key={vista.idea} initial={quieto ? false : { opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border-2 border-violet-400/60 bg-violet-500/10 p-5 mb-4 text-center">
        <p className="text-xs font-bold uppercase tracking-wide text-violet-700 dark:text-violet-300 mb-1">¿Qué le corresponde?</p>
        <p className="text-2xl font-black leading-tight">{vista.idea}</p>
      </motion.div>
      <OpcionesDeUnToque opciones={vista.opciones} correcta={correccion ? correccion.correcta : null} bloqueado={bloqueado} alElegir={(k) => alEnviar({ pieza: "relaciona", opcion: k })} />
    </div>
  );
}

// ---------------------------------------------------------------- clasifica: desliza

export function Desliza({ vista, correccion, devolucion, bloqueado, alEnviar }: PropsPieza<VistaDe<"desliza">>) {
  const quieto = useReducedMotion();
  const [elegido_, setElegido] = useState<number | null>(null);
  useEffect(() => setElegido(null), [vista.frase]);
  const enviar = (g: number) => {
    if (bloqueado) return;
    setElegido(g);
    alEnviar({ pieza: "clasifica", grupo: g });
  };
  const ok = devolucion ? devolucion.bien : null;
  return (
    <div data-testid="pieza-desliza">
      <Paso paso={vista.paso} pasos={vista.pasos} texto="Frase" />
      <AnimatePresence mode="wait">
        <motion.div
          key={vista.frase}
          drag={bloqueado || quieto ? false : "x"}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.7}
          onDragEnd={(_, info) => {
            if (info.offset.x < -100) enviar(0);
            else if (info.offset.x > 100) enviar(1);
          }}
          initial={quieto ? false : { opacity: 0, y: 20, rotate: -2 }}
          animate={ok === false && !quieto ? { opacity: 1, y: 0, rotate: 0, x: [0, -10, 10, -6, 6, 0] } : { opacity: 1, y: 0, rotate: 0 }}
          exit={quieto ? undefined : { opacity: 0, x: elegido_ === 0 ? -160 : 160, rotate: elegido_ === 0 ? -12 : 12 }}
          className={`min-h-[150px] rounded-3xl border-2 p-5 flex flex-col justify-center text-center cursor-grab active:cursor-grabbing ${ok === true ? bien : ok === false ? mal : "border-amber-400/60 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/30"}`}
        >
          <p className="text-xl font-bold leading-snug">{vista.frase}</p>
          {correccion && <p className="mt-3 text-sm font-semibold">Va en: {vista.grupos[correccion.grupo]}</p>}
        </motion.div>
      </AnimatePresence>
      {!bloqueado && !quieto && <p className="text-xs text-muted-foreground mt-2 text-center">Deslízala hacia su lado o toca el botón.</p>}
      <div className="grid grid-cols-2 gap-3 mt-3">
        {[0, 1].map((g) => (
          <motion.button
            key={g}
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={() => enviar(g)}
            disabled={bloqueado}
            className={`min-h-[56px] rounded-2xl border-2 px-2 text-[14px] font-bold leading-tight flex items-center justify-center gap-1 disabled:opacity-70 ${
              g === 0 ? "border-sky-500/70 text-sky-800 dark:text-sky-200" : "border-violet-500/70 text-violet-800 dark:text-violet-200"
            } ${elegido_ === g ? (g === 0 ? "bg-sky-500/15" : "bg-violet-500/15") : ""}`}
            data-testid={`desliza-${g}`}
          >
            {g === 0 && <ArrowLeft className="w-4 h-4 shrink-0" />} {vista.grupos[g]} {g === 1 && <ArrowRight className="w-4 h-4 shrink-0" />}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- clasifica: ¿cuál no va?

export function Intruso({ vista, correccion, bloqueado, alEnviar }: PropsPieza<VistaDe<"intruso">>) {
  const [sel, setSel] = useState<number | null>(null);
  const clave = vista.frases.join("|");
  useEffect(() => setSel(null), [clave]);
  return (
    <div data-testid="pieza-intruso">
      <Paso paso={vista.paso} pasos={vista.pasos} texto="Ronda" />
      <div className="grid grid-cols-2 gap-2.5">
        {vista.frases.map((f, k) => {
          const cls = correccion ? (k === correccion.intruso ? bien : sel === k ? mal : apagado) : sel === k ? elegido : base;
          return (
            <motion.button
              key={`${clave}-${k}`}
              type="button"
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                if (bloqueado) return;
                setSel(k);
                alEnviar({ pieza: "clasifica", frase: k });
              }}
              className={`min-h-[110px] rounded-2xl border-2 p-3 text-[15px] font-semibold leading-snug flex items-center justify-center text-center ${cls}`}
              data-testid={`intruso-${k}`}
            >
              {f}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- ordena: escalones

export function Escalones({ vista, correccion, bloqueado, alEnviar }: PropsPieza<VistaDe<"escalones">>) {
  const quieto = useReducedMotion();
  return (
    <div data-testid="pieza-escalones">
      <p className="font-bold text-lg mb-1">{vista.consigna}</p>
      <p className="text-xs font-semibold text-muted-foreground mb-3">Escalón {vista.paso + 1} de {vista.pasos + 1}</p>
      {/* la escalera que se va armando: cada escalón un poco más arriba y a la derecha */}
      <div className="flex flex-col-reverse gap-1.5 mb-4">
        {vista.colocados.map((c, k) => (
          <motion.div
            key={c}
            initial={quieto ? false : { opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ marginLeft: `${Math.min(k, 5) * 6}%` }}
            className="rounded-xl border-2 border-emerald-500/60 bg-emerald-500/10 px-3 py-2 text-[14px] font-semibold flex items-center gap-2"
          >
            <span className="w-6 h-6 shrink-0 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center">{k + 1}</span>
            {c}
          </motion.div>
        ))}
        {vista.colocados.length === 0 && <p className="text-sm text-muted-foreground flex items-center gap-1.5"><Footprints className="w-4 h-4" /> ¿Qué va primero?</p>}
      </div>
      <p className="text-sm font-bold mb-2 flex items-center gap-1.5"><ChevronUp className="w-4 h-4 text-amber-600" /> ¿Qué va en el escalón {vista.paso + 1}?</p>
      <OpcionesDeUnToque opciones={vista.opciones} correcta={correccion ? correccion.correcta : null} bloqueado={bloqueado} alElegir={(k) => alEnviar({ pieza: vista.pieza, opcion: k } as RespuestaPractica)} />
    </div>
  );
}

// ---------------------------------------------------------------- ordena: ¿dónde va?

/** «¿Dónde va?»: un paso se salió de la lista y el alumno toca el lugar donde va (antes, entre o después de los otros). */
export function DondeVa({ vista, correccion, bloqueado, alEnviar }: PropsPieza<VistaDe<"donde-va">>) {
  const quieto = useReducedMotion();
  const [sel, setSel] = useState<number | null>(null);
  useEffect(() => setSel(null), [vista.suelto]);
  const lugar = (s: number) => {
    const buena = correccion ? correccion.correcta === s : false;
    const mia = sel === s;
    if (correccion && !buena && !mia) return <div key={`l${s}`} className="h-1.5" aria-hidden />;
    const cls = correccion ? (buena ? bien : mal) : mia ? elegido : "border-dashed border-amber-500/60 text-amber-800 dark:text-amber-200 hover:bg-amber-500/10";
    return (
      <motion.button
        key={`l${s}`}
        type="button"
        whileTap={{ scale: 0.97 }}
        onClick={() => {
          if (bloqueado) return;
          setSel(s);
          alEnviar({ pieza: vista.pieza, opcion: s } as RespuestaPractica);
        }}
        className={`w-full rounded-xl border-2 px-3 min-h-[38px] text-[13px] font-bold flex items-center justify-center gap-1.5 ${cls}`}
        aria-label={s === 0 ? "Ponerlo al comienzo" : s === vista.lista.length ? "Ponerlo al final" : `Ponerlo después de: ${vista.lista[s - 1]}`}
        data-testid={`lugar-${s}`}
      >
        {correccion && buena ? (
          <>
            <Check className="w-4 h-4 shrink-0" /> {vista.suelto}
          </>
        ) : correccion && mia ? (
          <>
            <X className="w-4 h-4 shrink-0" /> Aquí no
          </>
        ) : (
          <>
            <Plus className="w-4 h-4 shrink-0" /> Aquí
          </>
        )}
      </motion.button>
    );
  };
  return (
    <div data-testid="pieza-donde-va">
      <Paso paso={vista.paso} pasos={vista.pasos} texto="Ronda" />
      <motion.div key={vista.suelto} initial={quieto ? false : { opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border-2 border-amber-400/70 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/30 p-4 mb-4">
        <p className="text-xs font-bold uppercase tracking-wide text-amber-800 dark:text-amber-200 mb-1">{vista.pieza === "linea" ? "¿Dónde va este hecho?" : "¿Dónde va este paso?"}</p>
        <p className="text-lg font-bold leading-snug">{vista.suelto}</p>
      </motion.div>
      <div className="space-y-1.5">
        {lugar(0)}
        {vista.lista.map((s, k) => (
          <Fragment key={k}>
            <div className="rounded-xl border-2 border-border bg-card px-3 py-2 text-[14px] leading-snug flex items-start gap-2">
              <span className="w-2 h-2 mt-1.5 shrink-0 rounded-full bg-muted-foreground/50" aria-hidden />
              {s}
            </div>
            {lugar(k + 1)}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- verdad: ¿cuál es falsa?

export function CualFalsa({ vista, correccion, bloqueado, alEnviar }: PropsPieza<VistaDe<"cual-falsa">>) {
  return (
    <div data-testid="pieza-cual-falsa">
      <Paso paso={vista.paso} pasos={vista.pasos} texto="Ronda" />
      <p className={`flex items-start gap-1.5 rounded-2xl px-3 py-2 text-[15px] font-bold leading-snug mb-3 [&>svg]:mt-0.5 ${vista.busca === "falsa" ? "bg-rose-500/15 text-rose-800 dark:text-rose-200" : "bg-emerald-500/15 text-emerald-800 dark:text-emerald-200"}`}>
        {vista.busca === "falsa" ? <X className="w-4 h-4 shrink-0" /> : <Check className="w-4 h-4 shrink-0" />} {vista.consigna}
      </p>
      <OpcionesDeUnToque opciones={vista.afirmaciones} correcta={correccion ? correccion.correcta : null} bloqueado={bloqueado} alElegir={(k) => alEnviar({ pieza: "verdad", frase: k })} />
    </div>
  );
}

// ---------------------------------------------------------------- error: detective

/** «Detective»: las frases van seguidas, como un párrafo; se toca la que tiene el error. */
export function Detective({ vista, correccion, bloqueado, alCambiar }: PropsPieza<VistaPieza<"error">>) {
  const [sel, setSel] = useState<number | null>(null);
  useEffect(() => {
    alCambiar(sel == null ? null : { pieza: "error", frase: sel });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sel]);
  return (
    <div data-testid="pieza-detective">
      <div className="rounded-3xl border-2 border-dashed border-amber-500/50 bg-amber-50/60 dark:bg-amber-950/20 p-4">
        <p className="text-xs font-bold uppercase tracking-wide text-amber-800 dark:text-amber-200 flex items-center gap-1.5 mb-2"><Search className="w-4 h-4" /> El texto</p>
        <p className="text-[17px] leading-[2.1]">
          {vista.frases.map((f, k) => {
            const esMalo = correccion ? correccion.malo === k : false;
            const cls = correccion
              ? esMalo
                ? "bg-rose-500/20 line-through decoration-rose-500"
                : sel === k
                  ? "bg-muted"
                  : ""
              : sel === k
                ? "bg-amber-400/40 underline decoration-amber-500 decoration-2 underline-offset-4"
                : "underline decoration-dotted decoration-amber-500/60 underline-offset-4 hover:bg-amber-400/15";
            return (
              <span key={k}>
                <button type="button" onClick={() => !bloqueado && setSel(k)} className={`text-left rounded px-0.5 transition-colors ${cls}`} data-testid={`frase-${k}`}>
                  {f}
                </button>{" "}
              </span>
            );
          })}
        </p>
      </div>
      {correccion && <p className="mt-3 text-sm font-semibold text-emerald-800 dark:text-emerald-200">Debería decir: {correccion.correccion}</p>}
      {!correccion && <p className="mt-2 text-xs text-muted-foreground">{sel == null ? "Toca la frase que tiene el error." : "Si estás seguro, comprueba."}</p>}
    </div>
  );
}

// ---------------------------------------------------------------- situación: conversación

/** «Conversación»: el caso llega como un mensaje y las opciones son las respuestas que podrías escribir. */
export function Chat({ vista, correccion, bloqueado, alCambiar }: PropsPieza<VistaPieza<"situacion">>) {
  const quieto = useReducedMotion();
  const [sel, setSel] = useState<number | null>(null);
  // quien escribe: lo que va antes de los dos puntos del caso («Un compañero te dice: …»)
  const { quien, mensaje } = useMemo(() => {
    const k = vista.caso.indexOf(":");
    return k > 0 && k < 90 ? { quien: vista.caso.slice(0, k), mensaje: vista.caso.slice(k + 1).trim() } : { quien: "", mensaje: vista.caso };
  }, [vista.caso]);
  return (
    <div data-testid="pieza-chat">
      <div className="rounded-3xl bg-muted/40 p-3 space-y-2">
        {quien && <p className="text-[12px] text-muted-foreground text-center">{quien}</p>}
        <motion.div initial={quieto ? false : { opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} className="flex items-end gap-2">
          <span className="w-8 h-8 shrink-0 rounded-full bg-sky-500/20 text-sky-700 dark:text-sky-300 flex items-center justify-center"><User className="w-4 h-4" /></span>
          <p className="max-w-[80%] rounded-2xl rounded-bl-sm bg-card border border-border px-3 py-2 text-[15px] leading-snug shadow-sm">{mensaje}</p>
        </motion.div>
        {sel != null && (
          <motion.div initial={quieto ? false : { opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} className="flex justify-end">
            <p className={`max-w-[85%] rounded-2xl rounded-br-sm px-3 py-2 text-[15px] leading-snug ${correccion ? (correccion.correcta === sel ? "bg-emerald-600 text-white" : "bg-rose-600 text-white") : "bg-amber-500 text-white"}`}>{vista.opciones[sel]}</p>
          </motion.div>
        )}
      </div>
      <p className="font-bold text-[16px] mt-4 mb-2 flex items-center gap-1.5"><MessageCircle className="w-4 h-4 text-amber-600" /> {vista.pregunta}</p>
      <Opciones
        opciones={vista.opciones}
        correcta={correccion ? correccion.correcta : null}
        explicas={correccion ? correccion.explicas : null}
        bloqueado={bloqueado}
        alElegir={(k) => {
          setSel(k);
          alCambiar({ pieza: "situacion", opcion: k });
        }}
      />
    </div>
  );
}
