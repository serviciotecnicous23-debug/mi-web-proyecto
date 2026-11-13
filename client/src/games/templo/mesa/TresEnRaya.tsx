/**
 * La pantalla del tres en raya (shared/mesa/tres-en-raya.ts): el tablero de madera, las fichas que caen con su
 * animación, la última jugada marcada y la línea ganadora que brilla.
 */
import type { VistaTres } from "@shared/mesa/tres-en-raya";
import type { PantallaMesaProps } from "./index";

const FICHA = [
  { simbolo: "✕", color: "text-amber-500", sombra: "drop-shadow-[0_2px_0_rgba(120,53,15,0.55)]" },
  { simbolo: "◯", color: "text-teal-500", sombra: "drop-shadow-[0_2px_0_rgba(17,94,89,0.55)]" },
] as const;

export function TresEnRayaPantalla({ vista, jugadas, jugar, ultima, ocupado, asientos, juegan }: PantallaMesaProps<VistaTres, number>) {
  const libres = new Set(jugadas);
  const linea = new Set(vista.linea ?? []);
  return (
    <div className="flex flex-col items-center gap-2" data-testid="mesa-tres-en-raya">
      <div className="flex gap-3 text-[12px] font-bold">
        {[0, 1].map((n) => (
          <span key={n} className={`flex items-center gap-1 rounded-full px-2 py-0.5 ${juegan.includes(n) ? "bg-amber-100 ring-2 ring-amber-400 dark:bg-amber-900/40" : "bg-white/70 dark:bg-stone-800"}`}>
            <span className={`text-base ${FICHA[n].color}`}>{FICHA[n].simbolo}</span> {asientos[n]?.nombre ?? `Asiento ${n + 1}`}
          </span>
        ))}
      </div>
      <div
        className="grid aspect-square w-full max-w-[18rem] grid-cols-3 grid-rows-3 gap-2 rounded-3xl p-2 shadow-[inset_0_2px_10px_rgba(0,0,0,0.35),0_8px_24px_rgba(0,0,0,0.25)]"
        style={{ background: "linear-gradient(145deg, #8b5a2b, #5c3a1a)" }}
      >
        {vista.tablero.map((c, i) => {
          const puedo = libres.has(i) && !ocupado;
          const esUltima = ultima?.jugada === i;
          const enLinea = linea.has(i);
          return (
            <button
              key={i}
              type="button"
              disabled={!puedo}
              onClick={() => jugar(i)}
              aria-label={c === null ? `Casilla ${i + 1}, libre` : `Casilla ${i + 1}: ${c === 0 ? "equis" : "círculo"}`}
              className={`relative flex min-h-0 items-center justify-center overflow-hidden rounded-2xl text-5xl font-black leading-none transition-all duration-200 ${
                enLinea ? "bg-amber-200 shadow-[0_0_18px_rgba(251,191,36,0.9)]" : "bg-[#f3e2c3]"
              } ${puedo ? "cursor-pointer hover:scale-[1.04] hover:bg-amber-50 hover:shadow-[0_0_12px_rgba(251,191,36,0.6)]" : ""} ${esUltima && !enLinea ? "ring-4 ring-amber-300/80" : ""}`}
              data-testid={`mesa-celda-${i}`}
            >
              {c !== null && (
                <span key={`${i}-${c}`} className={`${FICHA[c].color} ${FICHA[c].sombra} ${enLinea ? "animate-pulse" : ""}`} style={{ animation: enLinea ? undefined : "mesa-cae 280ms cubic-bezier(.2,1.6,.4,1)" }}>
                  {FICHA[c].simbolo}
                </span>
              )}
              {c === null && puedo && <span className="absolute h-2 w-2 rounded-full bg-amber-500/40" aria-hidden="true" />}
            </button>
          );
        })}
      </div>
      <style>{"@keyframes mesa-cae{0%{transform:scale(.2) translateY(-18px);opacity:0}100%{transform:scale(1) translateY(0);opacity:1}}"}</style>
    </div>
  );
}
