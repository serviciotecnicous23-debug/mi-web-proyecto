/**
 * La pantalla del cuatro en raya (shared/mesa/cuatro-en-raya.ts): el tablero de madera con sus huecos, las fichas de
 * granate y de oro que caen con rebote, la ficha que asoma sobre la columna antes de soltarla, la última jugada marcada y
 * la línea de cuatro que brilla.
 */
import { useEffect, useRef, useState } from "react";
import { COLUMNAS, FILAS, type VistaCuatro } from "@shared/mesa/cuatro-en-raya";
import type { PantallaMesaProps } from "./index";
import { mesaSonido } from "./mesa-sonido";
import { useJugadaNueva, useMiTurno } from "./vida";
import { VetaMadera } from "./tablero";

const FICHA = [
  { nombre: "granate", fondo: "radial-gradient(circle at 35% 30%, #fecaca, #dc2626 45%, #7f1d1d)", borde: "#7f1d1d" },
  { nombre: "oro", fondo: "radial-gradient(circle at 35% 30%, #fef3c7, #f59e0b 45%, #92400e)", borde: "#92400e" },
] as const;

function Disco({ quien, fantasma = false, brilla = false }: { quien: 0 | 1; fantasma?: boolean; brilla?: boolean }) {
  return (
    <span
      className={`absolute inset-[7%] rounded-full ${brilla ? "animate-pulse ring-4 ring-amber-200" : ""}`}
      style={{
        background: FICHA[quien].fondo,
        border: `2px solid ${FICHA[quien].borde}`,
        boxShadow: brilla ? "0 0 18px rgba(253,230,138,.95)" : "inset 0 -3px 0 rgba(0,0,0,.25), 0 2px 3px rgba(0,0,0,.35)",
        opacity: fantasma ? 0.55 : 1,
      }}
    >
      <span className="absolute inset-[24%] rounded-full border-2 border-white/25" />
    </span>
  );
}

export function CuatroEnRayaPantalla({ vista, jugadas, jugar, ultima, ocupado, asientos, juegan, miAsiento }: PantallaMesaProps<VistaCuatro, number>) {
  const [encima, setEncima] = useState<number | null>(null);
  const puedo = new Set(ocupado ? [] : jugadas);
  const linea = new Set(vista.linea ?? []);
  // la última ficha: la más alta de la columna donde se jugó
  let ultimaCasilla = -1;
  if (typeof ultima?.jugada === "number") for (let f = FILAS - 1; f >= 0 && ultimaCasilla < 0; f--) if (vista.t[f * COLUMNAS + ultima.jugada] !== null) ultimaCasilla = f * COLUMNAS + ultima.jugada;
  const mio = (miAsiento ?? 0) as 0 | 1;
  const alto = 0.62; // la franja de arriba, donde asoma la ficha antes de soltarla (en filas)
  // la ficha suena al llegar al fondo; la línea de cuatro, con su brillo
  useMiTurno(miAsiento !== null && juegan.includes(miAsiento));
  useJugadaNueva(ultima, () => setTimeout(() => mesaSonido.cae(), 300));
  const habiaLinea = useRef(linea.size > 0);
  useEffect(() => {
    if (linea.size && !habiaLinea.current) setTimeout(() => mesaSonido.linea(), 420);
    habiaLinea.current = linea.size > 0;
  }, [linea.size]);
  const ordenLinea = vista.linea ?? [];

  return (
    <div className="flex flex-col items-center gap-2" data-testid="mesa-cuatro-en-raya">
      <div className="flex gap-3 text-[12px] font-bold">
        {([0, 1] as const).map((n) => (
          <span key={n} className={`flex items-center gap-1.5 rounded-full px-2 py-0.5 ${juegan.includes(n) ? "bg-amber-100 ring-2 ring-amber-400 dark:bg-amber-900/40" : "bg-white/70 dark:bg-stone-800"}`}>
            <span className="relative inline-block h-4 w-4">
              <Disco quien={n} />
            </span>
            {asientos[n]?.nombre ?? `Asiento ${n + 1}`}
          </span>
        ))}
      </div>
      <div className="relative max-w-[24rem] select-none" style={{ width: "min(100%, max(16rem, calc(100dvh - 22rem)))", aspectRatio: `${COLUMNAS} / ${FILAS + alto}` }} onMouseLeave={() => setEncima(null)}>
        <div className="absolute inset-x-[3%] top-0 grid grid-cols-7" style={{ height: `${(alto / (FILAS + alto)) * 100}%` }}>
          {Array.from({ length: COLUMNAS }, (_, c) => (
            <div key={c} className="relative">
              {encima === c && puedo.has(c) && (
                <span className="absolute inset-x-[6%] bottom-0 top-[-20%]">
                  <Disco quien={mio} fantasma />
                </span>
              )}
            </div>
          ))}
        </div>
        <div
          className="absolute inset-x-0 bottom-0 grid grid-cols-7 grid-rows-6 gap-[1.6%] rounded-3xl p-[3%] shadow-[inset_0_2px_10px_rgba(0,0,0,0.45),0_10px_26px_rgba(0,0,0,0.3)]"
          style={{ top: `${(alto / (FILAS + alto)) * 100}%`, background: "linear-gradient(160deg, #8b5a2b, #4a2c12)" }}
        >
          <VetaMadera className="rounded-3xl" />
          {Array.from({ length: FILAS * COLUMNAS }, (_, k) => {
            const f = FILAS - 1 - Math.floor(k / COLUMNAS);
            const c = k % COLUMNAS;
            const i = f * COLUMNAS + c;
            const x = vista.t[i];
            const nueva = i === ultimaCasilla;
            return (
              <div key={i} className={`relative rounded-full ${encima === c && puedo.has(c) ? "bg-amber-100/10" : ""}`} style={{ background: "radial-gradient(circle at 50% 38%, #1a0f07, #2e1c0d 70%)", boxShadow: "inset 0 3px 6px rgba(0,0,0,.6)" }}>
                {x !== null && (
                  <span
                    key={nueva ? `n-${ultima?.n}` : "q"}
                    className="absolute inset-0"
                    style={nueva && !linea.size ? ({ animation: "cuatro-cae 460ms cubic-bezier(.33,1.35,.55,1)", "--caida": `${-(FILAS - f + alto) * 116}%` } as React.CSSProperties) : undefined}
                  >
                    <Disco quien={x} brilla={linea.has(i)} />
                  </span>
                )}
                {nueva && !linea.size && <span className="pointer-events-none absolute inset-[-6%] rounded-full ring-2 ring-amber-300/70" />}
                {linea.has(i) && (
                  <span
                    className="pointer-events-none absolute inset-[-20%] rounded-full"
                    style={{ background: "radial-gradient(circle, rgba(255,240,170,.9), rgba(250,200,60,.35) 45%, rgba(250,200,60,0) 70%)", animation: `mesa-destello 800ms ${380 + ordenLinea.indexOf(i) * 140}ms ease-out both` }}
                    aria-hidden="true"
                  />
                )}
              </div>
            );
          })}
        </div>
        <div className="absolute inset-x-[3%] bottom-0 top-0 grid grid-cols-7">
          {Array.from({ length: COLUMNAS }, (_, c) => (
            <button
              key={c}
              type="button"
              disabled={!puedo.has(c)}
              onClick={() => jugar(c)}
              onMouseEnter={() => setEncima(c)}
              onFocus={() => setEncima(c)}
              aria-label={`Soltar la ficha en la columna ${c + 1}`}
              className={`rounded-xl ${puedo.has(c) ? "cursor-pointer hover:bg-amber-200/10" : "cursor-default"}`}
              data-testid={`mesa-columna-${c}`}
            />
          ))}
        </div>
      </div>
      <style>{"@keyframes cuatro-cae{0%{transform:translateY(var(--caida))}70%{transform:translateY(4%)}85%{transform:translateY(-3%)}100%{transform:translateY(0)}}@keyframes mesa-destello{0%{opacity:.95;transform:scale(.6)}100%{opacity:0;transform:scale(1.7)}}"}</style>
    </div>
  );
}
