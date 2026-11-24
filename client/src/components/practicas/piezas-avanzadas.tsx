// Las piezas que estrenan los niveles siguientes (el motor ya las tiene listas): la línea del tiempo, el mapa de
// ideas, el mapa bíblico, marcar en el pasaje, el escenario ministerial y el caso de estudio.
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { BookOpen, MapPin, MessageCircle } from "lucide-react";
import type { RespuestaPractica } from "@shared/practicas";
import { Escribir, Opciones, Ordena, type PropsPieza, type VistaPieza } from "./piezas";

const bien = "border-emerald-500 bg-emerald-500/12";
const mal = "border-rose-500 bg-rose-500/12";

// ---------------------------------------------------------------- línea del tiempo

export function Linea({ vista, correccion, bloqueado, alCambiar }: PropsPieza<VistaPieza<"linea">>) {
  return (
    <div data-testid="pieza-linea">
      <Ordena items={vista.eventos} correcto={correccion ? correccion.correcto : null} fechas={correccion ? correccion.fechas : null} bloqueado={bloqueado} alCambiar={(orden) => alCambiar({ pieza: "linea", orden })} linea />
    </div>
  );
}

// ---------------------------------------------------------------- mapa de ideas

export function MapaIdeas({ vista, correccion, bloqueado, alCambiar }: PropsPieza<VistaPieza<"mapa-ideas">>) {
  const [elegidas, setElegidas] = useState<(number | null)[]>(() => vista.enlaces.map(() => null));
  const [abierto, setAbierto] = useState<number | null>(null);
  useEffect(() => {
    alCambiar(elegidas.every((x) => x != null) ? { pieza: "mapa-ideas", relaciones: elegidas as number[] } : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elegidas]);
  const nodo = (id: string) => vista.nodos.find((n) => n.id === id)!;
  return (
    <div data-testid="pieza-mapa-ideas">
      <div className="relative w-full aspect-[4/5] sm:aspect-[4/3] rounded-3xl border-2 border-border bg-muted/20 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
          {vista.enlaces.map((e, i) => {
            const a = nodo(e.de);
            const b = nodo(e.a);
            return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="currentColor" strokeOpacity={0.35} strokeWidth={0.6} vectorEffect="non-scaling-stroke" />;
          })}
        </svg>
        {vista.nodos.map((n) => (
          <div key={n.id} className="absolute -translate-x-1/2 -translate-y-1/2 max-w-[42%] rounded-2xl border-2 border-amber-500/70 bg-card px-3 py-2 text-center text-[13px] font-bold shadow-sm" style={{ left: `${n.x}%`, top: `${n.y}%` }}>
            {n.texto}
          </div>
        ))}
        {vista.enlaces.map((e, i) => {
          const a = nodo(e.de);
          const b = nodo(e.a);
          const ok = correccion ? correccion.marcas[i] : null;
          const k = elegidas[i];
          return (
            <button
              key={i}
              type="button"
              onClick={() => !bloqueado && setAbierto(abierto === i ? null : i)}
              className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 px-2.5 py-1 text-xs font-semibold bg-background ${ok === true ? bien : ok === false ? mal : k != null ? "border-amber-500" : "border-dashed border-muted-foreground/60"}`}
              style={{ left: `${(a.x + b.x) / 2}%`, top: `${(a.y + b.y) / 2}%` }}
              data-testid={`enlace-${i}`}
            >
              {k != null ? vista.relaciones[k] : "¿?"}
              {correccion && ok === false && <span className="block text-[11px] text-emerald-700 dark:text-emerald-300">{vista.relaciones[correccion.correctas[i]]}</span>}
            </button>
          );
        })}
      </div>
      {abierto != null && !bloqueado && (
        <div className="mt-3 rounded-2xl border border-border bg-card p-3">
          <p className="text-sm font-semibold mb-2">
            ¿Cómo se une «{nodo(vista.enlaces[abierto].de).texto}» con «{nodo(vista.enlaces[abierto].a).texto}»?
          </p>
          <div className="flex flex-wrap gap-2">
            {vista.relaciones.map((r, k) => (
              <button
                key={k}
                type="button"
                onClick={() => {
                  const nuevas = [...elegidas];
                  nuevas[abierto] = k;
                  setElegidas(nuevas);
                  const sig = nuevas.findIndex((x) => x == null);
                  setAbierto(sig < 0 ? null : sig);
                }}
                className="h-10 px-3 rounded-xl border-2 border-border text-sm font-semibold hover:border-amber-500"
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------- mapa bíblico

export function Mapa({ vista, correccion, bloqueado, alCambiar }: PropsPieza<VistaPieza<"mapa">>) {
  const [punto, setPunto] = useState<{ x: number; y: number } | null>(null);
  const caja = useRef<HTMLDivElement>(null);
  useEffect(() => setPunto(null), [vista.lugar, vista.paso]);
  const tocar = (e: React.PointerEvent) => {
    if (bloqueado || !caja.current) return;
    const r = caja.current.getBoundingClientRect();
    const p = { x: Math.round(((e.clientX - r.left) / r.width) * 1000) / 10, y: Math.round(((e.clientY - r.top) / r.height) * 1000) / 10 };
    setPunto(p);
    alCambiar({ pieza: "mapa", ...p });
  };
  return (
    <div data-testid="pieza-mapa">
      <p className="text-lg font-bold mb-2 flex items-center gap-2"><MapPin className="w-5 h-5 text-amber-600" /> Toca: {vista.lugar}</p>
      <p className="text-xs text-muted-foreground mb-2">Lugar {vista.paso + 1} de {vista.pasos}</p>
      <div ref={caja} onPointerUp={tocar} className="relative w-full rounded-3xl border-2 border-border overflow-hidden touch-manipulation cursor-crosshair">
        <img src={vista.imagen} alt={vista.alt} className="w-full h-auto block select-none pointer-events-none" draggable={false} />
        {punto && (
          <span className={`absolute -translate-x-1/2 -translate-y-full ${correccion ? (correccion.bien ? "text-emerald-600" : "text-rose-600") : "text-amber-600"}`} style={{ left: `${punto.x}%`, top: `${punto.y}%` }} aria-hidden>
            <MapPin className="w-8 h-8 drop-shadow" fill="currentColor" fillOpacity={0.25} />
          </span>
        )}
        {correccion && (
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-4 border-emerald-500 bg-emerald-500/20" style={{ left: `${correccion.x}%`, top: `${correccion.y}%` }} aria-label={`${vista.lugar} está aquí`} />
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- marca en el pasaje

export function Pasaje({ vista, correccion, bloqueado, alCambiar }: PropsPieza<VistaPieza<"pasaje">>) {
  const [sel, setSel] = useState<Set<number>>(new Set());
  useEffect(() => {
    alCambiar(sel.size ? { pieza: "pasaje", palabras: [...sel].sort((a, b) => a - b) } : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sel]);
  const correctas = new Set(correccion?.correctas ?? []);
  return (
    <div data-testid="pieza-pasaje">
      <p className="text-sm font-bold text-amber-800 dark:text-amber-200 flex items-center gap-1.5 mb-2"><BookOpen className="w-4 h-4" /> {vista.ref}</p>
      <p className="text-xs text-muted-foreground mb-3">Marca {vista.cuantas} {vista.cuantas === 1 ? "palabra" : "palabras"}.</p>
      <p className="text-[18px] leading-[2.2] font-serif">
        {vista.palabras.map((w, k) => {
          const marcada = sel.has(k);
          const ok = correccion ? correctas.has(k) : null;
          const cls = correccion ? (ok ? "bg-emerald-500/20 underline decoration-emerald-600 decoration-2" : marcada ? "bg-rose-500/20 line-through" : "") : marcada ? "bg-amber-400/40 rounded" : "";
          return (
            <span key={k}>
              <button
                type="button"
                onClick={() => {
                  if (bloqueado) return;
                  const s = new Set(sel);
                  if (s.has(k)) s.delete(k);
                  else s.add(k);
                  setSel(s);
                }}
                className={`px-0.5 rounded transition-colors ${cls}`}
                data-testid={`palabra-${k}`}
              >
                {w}
              </button>{" "}
            </span>
          );
        })}
      </p>
    </div>
  );
}

// ---------------------------------------------------------------- escenario ministerial

const VALOR: Record<0 | 1 | 2, { texto: string; cls: string }> = {
  2: { texto: "La mejor decisión", cls: "bg-emerald-600 text-white" },
  1: { texto: "Aceptable, pero había una mejor", cls: "bg-amber-500 text-white" },
  0: { texto: "No era lo apropiado", cls: "bg-rose-600 text-white" },
};

export function Escenario({ vista, correccion, bloqueado, alCambiar }: PropsPieza<VistaPieza<"escenario">>) {
  const quieto = useReducedMotion();
  return (
    <div data-testid="pieza-escenario">
      {vista.paso === 0 && <p className="text-sm text-muted-foreground mb-3">{vista.situacion}</p>}
      <motion.div key={vista.escena.id} initial={quieto ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border border-violet-300/60 dark:border-violet-700/60 bg-gradient-to-br from-violet-50 to-fuchsia-50 dark:from-violet-950/40 dark:to-fuchsia-950/30 p-4 mb-4">
        <MessageCircle className="w-5 h-5 text-violet-600/70 mb-1" aria-hidden />
        <p className="text-[16px] leading-relaxed">{vista.escena.narra}</p>
      </motion.div>
      <p className="font-bold text-lg mb-3">{vista.escena.pregunta}</p>
      {correccion && <p className={`inline-block rounded-full px-3 py-1 text-xs font-bold mb-3 ${VALOR[correccion.valor as 0 | 1 | 2].cls}`}>{VALOR[correccion.valor as 0 | 1 | 2].texto}</p>}
      <Opciones
        opciones={vista.escena.opciones}
        correcta={correccion ? correccion.mejor : null}
        explicas={correccion ? correccion.explicas : null}
        bloqueado={bloqueado}
        alElegir={(k) => alCambiar({ pieza: "escenario", opcion: k })}
      />
    </div>
  );
}

// ---------------------------------------------------------------- caso de estudio

export function Caso({ vista, correccion, bloqueado, alCambiar }: PropsPieza<VistaPieza<"caso">>) {
  const [abierto, setAbierto] = useState(vista.paso === 0);
  useEffect(() => setAbierto(vista.paso === 0), [vista.paso]);
  const actual = vista.actual;
  return (
    <div data-testid="pieza-caso">
      <details open={abierto} onToggle={(e) => setAbierto((e.target as HTMLDetailsElement).open)} className="rounded-3xl border border-border bg-muted/20 p-4 mb-4">
        <summary className="font-bold cursor-pointer">{vista.titulo}</summary>
        <div className="mt-2 space-y-2 text-[15px] leading-relaxed">
          {vista.relato.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </details>
      <p className="text-xs text-muted-foreground mb-2">Paso {vista.paso + 1} de {vista.pasos}</p>
      {actual.tipo === "situacion" ? (
        <>
          <p className="font-bold text-lg mb-3">{actual.pregunta}</p>
          <Opciones
            opciones={actual.opciones}
            correcta={correccion?.correcta ?? null}
            explicas={correccion?.explicas ?? null}
            bloqueado={bloqueado}
            alElegir={(k) => alCambiar({ pieza: "caso", opcion: k } as RespuestaPractica)}
          />
        </>
      ) : (
        <Escribir
          pregunta={actual.pregunta}
          min={actual.min}
          max={actual.max}
          correccion={correccion && correccion.nota != null ? { nota: correccion.nota, ideas: correccion.ideas ?? [], modelo: correccion.modelo ?? "" } : null}
          bloqueado={bloqueado}
          alCambiar={(t) => alCambiar(t == null ? null : ({ pieza: "caso", texto: t } as RespuestaPractica))}
        />
      )}
    </div>
  );
}
