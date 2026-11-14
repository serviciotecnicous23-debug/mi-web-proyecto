/**
 * La pantalla del tres en raya (shared/mesa/tres-en-raya.ts): un tablero de madera con nueve hoyos tallados (sin líneas
 * que se crucen) y dos fichas propias, la llama (el fuego) y la gota (el agua viva): nada con forma de equis, que es una
 * cruz. La ficha cae en su hoyo con su sonido, se ve la tuya asomando antes de jugar, la última jugada lleva su aro y la
 * línea ganadora se traza con luz de oro.
 */
import { useEffect, useRef } from "react";
import type { VistaTres } from "@shared/mesa/tres-en-raya";
import type { PantallaMesaProps } from "./index";
import { mesaSonido } from "./mesa-sonido";
import { useJugadaNueva, useMiTurno } from "./vida";

const NOMBRE = ["la llama", "la gota"] as const;

/** La llama y la gota, dibujadas en un cuadro de 100 × 100. */
export function FichaTres({ quien, className = "", style }: { quien: 0 | 1; className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden="true">
      <defs>
        <radialGradient id="tres-llama" cx=".5" cy=".72" r=".7">
          <stop offset="0" stopColor="#fff6c2" />
          <stop offset=".45" stopColor="#f6a21b" />
          <stop offset="1" stopColor="#c2410c" />
        </radialGradient>
        <radialGradient id="tres-gota" cx=".4" cy=".6" r=".75">
          <stop offset="0" stopColor="#d9f7ff" />
          <stop offset=".5" stopColor="#2aa7c7" />
          <stop offset="1" stopColor="#0d5568" />
        </radialGradient>
      </defs>
      {quien === 0 ? (
        <g>
          <path d="M50 7C58 22 77 36 77 60A27 27 0 0 1 23 60C23 46 30 37 39 28C40 39 44 45 50 47C46 33 46 19 50 7Z" fill="url(#tres-llama)" stroke="#8a3208" strokeWidth="3.2" strokeLinejoin="round" />
          <path d="M50 45C55 52 63 57 63 67A13 13 0 0 1 37 67C37 60 41 55 46 51C47 56 49 58 52 59C50 54 49 50 50 45Z" fill="#fff4c4" opacity=".92" />
        </g>
      ) : (
        <g>
          <path d="M50 7C50 7 80 44 80 63A30 30 0 0 1 20 63C20 44 50 7 50 7Z" fill="url(#tres-gota)" stroke="#0b4656" strokeWidth="3.2" strokeLinejoin="round" />
          <path d="M35 62C35 51 41 42 46 35" fill="none" stroke="#effcff" strokeWidth="5.5" strokeLinecap="round" opacity=".8" />
          <circle cx="36" cy="72" r="3.2" fill="#effcff" opacity=".7" />
        </g>
      )}
    </svg>
  );
}

/** El centro de cada hoyo (en %), con el relleno del 5 % y la separación del 6 %. */
const CENTRO = [18, 50, 82];

export function TresEnRayaPantalla({ vista, jugadas, jugar, ultima, ocupado, asientos, juegan, miAsiento }: PantallaMesaProps<VistaTres, number>) {
  const libres = new Set(ocupado ? [] : jugadas);
  const linea = vista.linea ?? [];
  const enLinea = new Set(linea);
  const mio = (miAsiento ?? 0) as 0 | 1;
  useMiTurno(miAsiento !== null && juegan.includes(miAsiento));
  useJugadaNueva(ultima, () => mesaSonido.pieza());
  // la línea ganadora suena una vez, cuando aparece
  const habiaLinea = useRef(linea.length > 0);
  useEffect(() => {
    if (linea.length && !habiaLinea.current) setTimeout(() => mesaSonido.linea(), 250);
    habiaLinea.current = linea.length > 0;
  }, [linea.length]);

  const a = linea.length ? Math.min(...linea) : -1;
  const b = linea.length ? Math.max(...linea) : -1;
  const p1 = a >= 0 ? { x: CENTRO[a % 3], y: CENTRO[Math.floor(a / 3)] } : null;
  const p2 = b >= 0 ? { x: CENTRO[b % 3], y: CENTRO[Math.floor(b / 3)] } : null;
  // la línea pasa un poco más allá de las fichas de las puntas
  const ext = p1 && p2 ? { x1: p1.x - (p2.x - p1.x) * 0.12, y1: p1.y - (p2.y - p1.y) * 0.12, x2: p2.x + (p2.x - p1.x) * 0.12, y2: p2.y + (p2.y - p1.y) * 0.12 } : null;

  return (
    <div className="flex flex-col items-center gap-2.5" data-testid="mesa-tres-en-raya">
      <div className="flex flex-wrap justify-center gap-2 text-[12px] font-bold">
        {([0, 1] as const).map((n) => (
          <span
            key={n}
            className={`flex items-center gap-1.5 rounded-full py-0.5 pl-1 pr-2.5 transition ${juegan.includes(n) ? "bg-amber-100 text-amber-950 ring-2 ring-amber-400 dark:bg-amber-900/50 dark:text-amber-50" : "bg-white/75 text-stone-700 dark:bg-stone-800 dark:text-stone-100"}`}
          >
            <FichaTres quien={n} className="h-6 w-6" />
            {asientos[n]?.nombre ?? `Asiento ${n + 1}`}
            <span className="font-semibold opacity-60">({NOMBRE[n]})</span>
          </span>
        ))}
      </div>
      <div
        className="relative aspect-square w-full max-w-[20rem] select-none rounded-[26px] p-[5%] shadow-[inset_0_2px_0_rgba(255,255,255,0.18),inset_0_-6px_12px_rgba(0,0,0,0.35),0_12px_26px_rgba(0,0,0,0.35)]"
        style={{ background: "radial-gradient(ellipse at 28% 18%, #b07b44, #7a4b22 58%, #4e2f15)" }}
      >
        <div className="pointer-events-none absolute inset-0 rounded-[26px] opacity-30" style={{ background: "repeating-linear-gradient(98deg, rgba(40,20,5,.35) 0 1.5px, transparent 1.5px 10px)" }} />
        <div className="relative grid h-full w-full grid-cols-3 grid-rows-3 gap-[6%]">
          {vista.tablero.map((c, i) => {
            const puedo = libres.has(i);
            const esUltima = ultima?.jugada === i && !enLinea.has(i);
            return (
              <button
                key={i}
                type="button"
                disabled={!puedo}
                onClick={() => jugar(i)}
                aria-label={c === null ? `Hoyo ${i + 1}, libre` : `Hoyo ${i + 1}: ${NOMBRE[c]}`}
                className={`group relative rounded-full transition-transform duration-150 ${puedo ? "cursor-pointer active:scale-95" : "cursor-default"}`}
                style={{
                  background: enLinea.has(i) ? "radial-gradient(circle at 50% 42%, #5a3a10, #8a5a12 70%, #c9922a)" : "radial-gradient(circle at 50% 40%, #21130a, #3b2210 62%, #57331a)",
                  boxShadow: "inset 0 5px 9px rgba(0,0,0,.65), inset 0 -2px 3px rgba(255,220,160,.12), 0 1px 0 rgba(255,235,200,.22)",
                }}
                data-testid={`mesa-celda-${i}`}
              >
                {/* (la vista previa es solo CSS: si se cambiara lo que hay bajo el dedo al pasar, el toque se perdería) */}
                {c === null && puedo && (
                  <>
                    <span className="pointer-events-none absolute left-1/2 top-1/2 h-[12%] w-[12%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-200/30 transition-opacity group-hover:opacity-0 group-focus-visible:opacity-0" aria-hidden="true" />
                    <FichaTres quien={mio} className="pointer-events-none absolute inset-[13%] h-[74%] w-[74%] opacity-0 transition-opacity group-hover:opacity-40 group-focus-visible:opacity-40" />
                  </>
                )}
                {c !== null && (
                  <FichaTres
                    key={`${i}-${c}`}
                    quien={c}
                    className={`absolute inset-[11%] h-[78%] w-[78%] drop-shadow-[0_3px_2px_rgba(0,0,0,0.55)] ${enLinea.has(i) ? "tres-brilla" : ""}`}
                    style={enLinea.has(i) ? undefined : { animation: "tres-cae 380ms cubic-bezier(.25,1.5,.45,1)" }}
                  />
                )}
                {esUltima && <span className="pointer-events-none absolute inset-[-5%] rounded-full ring-[3px] ring-amber-300/80" />}
              </button>
            );
          })}
        </div>
        {ext && (
          <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
            <line x1={ext.x1} y1={ext.y1} x2={ext.x2} y2={ext.y2} stroke="rgba(255,236,160,.55)" strokeWidth="9" strokeLinecap="round" pathLength={1} className="tres-traza" style={{ filter: "blur(2px)" }} />
            <line x1={ext.x1} y1={ext.y1} x2={ext.x2} y2={ext.y2} stroke="#ffe69a" strokeWidth="3.2" strokeLinecap="round" pathLength={1} className="tres-traza" />
          </svg>
        )}
      </div>
      <style>{`
@keyframes tres-cae { 0% { transform: scale(1.5) translateY(-14%); opacity: 0 } 60% { transform: scale(.92) translateY(2%); opacity: 1 } 100% { transform: scale(1) translateY(0) } }
@keyframes tres-traza { from { stroke-dashoffset: 1 } to { stroke-dashoffset: 0 } }
.tres-traza { stroke-dasharray: 1; stroke-dashoffset: 0; animation: tres-traza .55s .15s ease-out backwards; }
@keyframes tres-brilla { 0%, 100% { filter: drop-shadow(0 0 3px rgba(255,230,140,.6)) } 50% { filter: drop-shadow(0 0 10px rgba(255,230,140,1)) } }
.tres-brilla { animation: tres-brilla 1.2s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) { .tres-traza, .tres-brilla { animation: none } }
`}</style>
    </div>
  );
}
