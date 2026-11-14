/**
 * La pantalla del dominó (shared/mesa/domino.ts): la mesa de paño con la fila de fichas que serpentea, la ficha recién
 * puesta que aparece con su brillo, las fichas boca abajo de los demás, mi mano con las que casan levantadas (y a qué
 * punta va si casa en las dos), robar y pasar, los puntos de cada pareja o de cada uno hasta la meta, y el final de cada
 * mano con todas las fichas destapadas.
 */
import { useEffect, useRef, useState } from "react";
import type { EnMesa, Ficha, JugadaColocar, JugadaDomino, VistaDomino } from "@shared/mesa/domino";
import type { PantallaMesaProps } from "./index";
import { TECLAS_ANIMACION } from "./tablero";
import { mesaSonido } from "./mesa-sonido";
import { Sello, useJugadaNueva, useMiTurno } from "./vida";

const PUNTOS: Record<number, [number, number][]> = {
  0: [],
  1: [[1, 1]],
  2: [
    [0, 0],
    [2, 2],
  ],
  3: [
    [0, 0],
    [1, 1],
    [2, 2],
  ],
  4: [
    [0, 0],
    [0, 2],
    [2, 0],
    [2, 2],
  ],
  5: [
    [0, 0],
    [0, 2],
    [1, 1],
    [2, 0],
    [2, 2],
  ],
  6: [
    [0, 0],
    [1, 0],
    [2, 0],
    [0, 2],
    [1, 2],
    [2, 2],
  ],
};

function Mitad({ n, x, y }: { n: number; x: number; y: number }) {
  return (
    <>
      {PUNTOS[n].map(([f, c], i) => (
        <circle key={i} cx={x + 12 + c * 13} cy={y + 12 + f * 13} r="4.4" fill="#2b1d14" />
      ))}
    </>
  );
}

/** Una ficha de dominó de marfil (o boca abajo). Acostada: `a` a la izquierda y `b` a la derecha; parada: `a` arriba. */
export function FichaDomino({ a, b, parada = false, oculta = false, className = "" }: { a: number; b: number; parada?: boolean; oculta?: boolean; className?: string }) {
  const w = parada ? 50 : 100;
  const h = parada ? 100 : 50;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} aria-hidden="true" style={{ filter: "drop-shadow(0 2px 1.5px rgba(0,0,0,.35))" }}>
      <rect x="1.5" y="1.5" width={w - 3} height={h - 3} rx="7" fill={oculta ? "#7c2d12" : "#fbf6ea"} stroke={oculta ? "#431407" : "#5b4636"} strokeWidth="2.5" />
      {oculta ? (
        <>
          <rect x="7" y="7" width={w - 14} height={h - 14} rx="4" fill="none" stroke="#fdba74" strokeOpacity=".55" strokeWidth="2" />
          <circle cx={w / 2} cy={h / 2} r="5" fill="#fdba74" fillOpacity=".7" />
        </>
      ) : (
        <>
          {parada ? <line x1="7" y1="50" x2="43" y2="50" stroke="#8a7461" strokeWidth="2.5" /> : <line x1="50" y1="7" x2="50" y2="43" stroke="#8a7461" strokeWidth="2.5" />}
          <circle cx={w / 2} cy={h / 2} r="2.6" fill="#b08d57" />
          <Mitad n={a} x={0} y={0} />
          <Mitad n={b} x={parada ? 0 : 50} y={parada ? 50 : 0} />
        </>
      )}
    </svg>
  );
}

/** La fila de la mesa, en renglones que van y vuelven (los dobles, de pie). */
function Fila({ mesa, yo }: { mesa: EnMesa[]; yo: number }) {
  const CAP = 13;
  const ultima = mesa.reduce((m, x) => Math.max(m, x.n), -1);
  const renglones: EnMesa[][] = [];
  let ancho = 0;
  for (const f of mesa) {
    const w = f.izq === f.der ? 1 : 2;
    if (!renglones.length || ancho + w > CAP) {
      renglones.push([]);
      ancho = 0;
    }
    renglones[renglones.length - 1].push(f);
    ancho += w;
  }
  if (!mesa.length) return <p className="py-6 text-center text-[13px] font-bold text-emerald-100/80">La mesa está vacía: se abre con la primera ficha.</p>;
  return (
    <div className="flex w-full flex-col gap-[2px]">
      {renglones.map((r, k) => {
        const vuelta = k % 2 === 1;
        const fichas = vuelta ? [...r].reverse() : r;
        return (
          <div key={k} className={`flex w-full items-center ${vuelta ? "justify-end" : "justify-start"}`} style={{ aspectRatio: `${CAP} / 2` }}>
            {fichas.map((f) => {
              const doble = f.izq === f.der;
              const nueva = f.n === ultima;
              const [a, b] = vuelta ? [f.der, f.izq] : [f.izq, f.der];
              return (
                <div
                  key={f.n}
                  className={`relative flex h-full items-center justify-center ${nueva ? "z-10" : ""}`}
                  style={{ width: `${((doble ? 1 : 2) / CAP) * 100}%`, animation: nueva ? `${f.quien === yo ? "domino-llega-abajo" : "domino-llega-arriba"} 440ms cubic-bezier(.25,1.25,.5,1)` : undefined }}
                >
                  <FichaDomino a={a} b={b} parada={doble} className={`${doble ? "h-full w-full" : "h-1/2 w-full"} ${nueva ? "drop-shadow-[0_0_8px_rgba(253,230,138,0.95)]" : ""}`} />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

const iguales = (x: Ficha, y: Ficha) => x[0] === y[0] && x[1] === y[1];

export function DominoPantalla({ vista, jugadas, jugar, ocupado, asientos, juegan, miAsiento, ultima }: PantallaMesaProps<VistaDomino, JugadaDomino>) {
  const [elegida, setElegida] = useState<Ficha | null>(null);
  useEffect(() => setElegida(null), [vista.mesa.length, vista.mano, ocupado]);
  const validas = ocupado ? [] : jugadas;
  const colocar = validas.filter((j): j is JugadaColocar => typeof j !== "string");
  const opcionesDe = (f: Ficha) => colocar.filter((j) => iguales(j.f, f));
  const n = asientos.length;
  const yo = miAsiento ?? -1;
  const equipo = (i: number) => (vista.parejas ? i % 2 : i);
  const puntas = vista.mesa.length ? [vista.mesa[0].izq, vista.mesa[vista.mesa.length - 1].der] : null;

  function tocar(f: Ficha) {
    const os = opcionesDe(f);
    if (!os.length) return;
    if (os.length === 1) {
      jugar(os[0]);
      setElegida(null);
    } else setElegida(elegida && iguales(elegida, f) ? null : f);
  }

  // cada ficha suena al asentarse en la mesa; robar suena a madera y pasar, a un golpecito
  useMiTurno(miAsiento !== null && juegan.includes(miAsiento));
  useJugadaNueva(ultima, () => {
    const j = ultima?.jugada;
    if (j === "robar") mesaSonido.pieza();
    else if (j === "pasar") mesaSonido.tic();
    else if (j && typeof j === "object") setTimeout(() => mesaSonido.ficha(), 120);
  });
  // el final de cada mano: el sello grande («¡Dominó!» o «¡Tranque!») y la campana, una vez
  const manoVista = useRef<number | null>(vista.finMano ? vista.mano : null);
  const [sello, setSello] = useState<{ n: number; texto: string; sub: string } | null>(null);
  useEffect(() => {
    const f = vista.finMano;
    if (!f || manoVista.current === vista.mano) return;
    manoVista.current = vista.mano;
    const quien = f.ganador !== null ? (asientos[f.ganador]?.nombre ?? "") : "";
    setSello({ n: vista.mano, texto: f.como === "domino" ? "¡Dominó!" : "¡Tranque!", sub: f.como === "empate" ? "Nadie anota" : `${quien} · +${f.puntos}` });
    setTimeout(() => mesaSonido.campana(), 200);
  }, [vista.finMano, vista.mano, asientos]);

  const otros = Array.from({ length: n }, (_, k) => (yo >= 0 ? (yo + 1 + k) % n : k)).filter((i) => i !== yo);
  const fm = vista.finMano;
  const nombre = (i: number) => asientos[i]?.nombre ?? `Asiento ${i + 1}`;

  return (
    <div className="relative flex flex-col items-center gap-2" data-testid="mesa-domino">
      {sello && <Sello llave={sello.n} texto={sello.texto} sub={sello.sub} color="#9a3412" />}
      {/* los puntos */}
      <div className="flex w-full max-w-[30rem] flex-wrap justify-center gap-1.5 text-[12px] font-bold">
        {(vista.parejas ? [0, 1] : Array.from({ length: n }, (_, i) => i)).map((eq) => {
          const mio = yo >= 0 && equipo(yo) === eq;
          const quienes = Array.from({ length: n }, (_, i) => i).filter((i) => equipo(i) === eq);
          const p = vista.puntos[eq] ?? 0;
          return (
            <div key={eq} className={`min-w-[8rem] flex-1 rounded-xl px-2.5 py-1.5 ${mio ? "bg-amber-100 ring-2 ring-amber-400 dark:bg-amber-900/40" : "bg-white/70 dark:bg-stone-800"}`}>
              <div className="flex items-center justify-between gap-2">
                <span className="truncate">{vista.parejas ? (mio ? "Tu pareja" : "La otra pareja") : nombre(eq)}</span>
                <span className="tabular-nums">
                  {p} / {vista.meta}
                </span>
              </div>
              {vista.parejas && <p className="truncate text-[10px] font-semibold text-stone-500">{quienes.map(nombre).join(" y ")}</p>}
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-stone-300/60">
                <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-700" style={{ width: `${Math.min(100, (p / vista.meta) * 100)}%` }} />
              </div>
            </div>
          );
        })}
      </div>
      {/* los demás, con sus fichas boca abajo */}
      <div className="flex w-full max-w-[30rem] flex-wrap justify-center gap-1.5">
        {otros.map((i) => (
          <div key={i} className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-bold transition ${juegan.includes(i) ? "scale-105 bg-amber-400 text-amber-950 shadow-[0_0_12px_rgba(251,191,36,0.7)]" : "bg-white/70 dark:bg-stone-800"}`}>
            <span className="truncate">{nombre(i)}</span>
            {vista.parejas && yo >= 0 && equipo(i) === equipo(yo) && <span className="rounded-full bg-emerald-600 px-1.5 text-[9px] text-white">compañero</span>}
            <span className="flex">
              {Array.from({ length: Math.min(vista.cuantas[i] ?? 0, 7) }, (_, k) => (
                <FichaDomino key={k} a={0} b={0} parada oculta className="-ml-1.5 h-5 w-2.5 first:ml-0" />
              ))}
            </span>
            <span className="tabular-nums text-[11px]">{vista.cuantas[i]}</span>
          </div>
        ))}
      </div>
      {/* la mesa */}
      <div className="relative w-full max-w-[30rem] rounded-3xl p-3 shadow-[inset_0_2px_14px_rgba(0,0,0,0.5),0_8px_22px_rgba(0,0,0,0.3)]" style={{ background: "radial-gradient(ellipse at 50% 35%, #1f7a4d, #0f4d2f 75%)", border: "8px solid #5c3a1a" }}>
        <Fila mesa={vista.mesa} yo={yo} />
        <div className="mt-2 flex items-center justify-between text-[11px] font-bold text-emerald-50/90">
          <span>Mano {vista.mano}</span>
          {puntas && (
            <span>
              Puntas: {puntas[0]} y {puntas[1]}
            </span>
          )}
          {n < 4 && <span>Pozo: {vista.pozo}</span>}
        </div>
      </div>
      {/* cómo terminó la mano */}
      {fm && (
        <div className="w-full max-w-[30rem] rounded-2xl bg-gradient-to-b from-amber-200 to-amber-400 p-3 text-amber-950 shadow-lg" style={{ animation: "mesa-aparece 260ms ease-out" }} data-testid="mesa-domino-fin-mano">
          <p className="text-center font-serif text-[15px] font-black">
            {fm.como === "domino"
              ? `¡Dominó! ${nombre(fm.ganador!)} se quedó sin fichas: +${fm.puntos}`
              : fm.como === "tranque"
                ? `¡Tranque! Gana ${nombre(fm.ganador!)} con menos puntos: +${fm.puntos}`
                : "Tranque empatado: esta mano nadie anota."}
          </p>
          <div className="mt-2 grid grid-cols-2 gap-1.5">
            {fm.manos.map((m, i) => (
              <div key={i} className={`rounded-lg px-2 py-1 text-[11px] font-bold ${i === fm.ganador ? "bg-white/80" : "bg-white/45"}`}>
                <span>
                  {nombre(i)} · {m.reduce((s, f) => s + f[0] + f[1], 0)} pts
                </span>
                <span className="mt-0.5 flex flex-wrap gap-0.5">
                  {m.map((f, k) => (
                    <FichaDomino key={k} a={f[0]} b={f[1]} className="h-3.5 w-7" />
                  ))}
                </span>
              </div>
            ))}
          </div>
          {validas.includes("seguir") && (
            <button type="button" className="mt-2 w-full rounded-xl bg-amber-900 py-2 text-[13px] font-black text-amber-50 shadow transition hover:bg-amber-800" onClick={() => jugar("seguir")} data-testid="mesa-domino-seguir">
              Siguiente mano ▶
            </button>
          )}
        </div>
      )}
      {/* mi mano */}
      {yo >= 0 && vista.fase === "jugando" && (
        <div className="w-full max-w-[30rem]">
          <div className="flex flex-wrap items-end justify-center gap-1.5" data-testid="mesa-domino-mano">
            {vista.miMano.map((f) => {
              const puede = opcionesDe(f).length > 0;
              const esta = elegida && iguales(elegida, f);
              return (
                <button
                  key={`${f[0]}-${f[1]}`}
                  type="button"
                  disabled={!puede}
                  onClick={() => tocar(f)}
                  aria-label={`Ficha ${f[0]} y ${f[1]}${puede ? " (casa)" : ""}`}
                  className={`h-[4.6rem] w-[2.3rem] rounded-lg transition-all duration-200 ${puede ? "-translate-y-1.5 cursor-pointer drop-shadow-[0_0_8px_rgba(251,191,36,0.85)] hover:-translate-y-3" : "opacity-60"} ${esta ? "-translate-y-4 ring-4 ring-emerald-400" : ""}`}
                  style={{ animation: "mesa-aparece 260ms ease-out" }}
                  data-testid={`mesa-ficha-${f[0]}-${f[1]}`}
                >
                  <FichaDomino a={f[0]} b={f[1]} parada className="h-full w-full" />
                </button>
              );
            })}
          </div>
          {elegida && puntas && (
            <div className="mt-2 flex justify-center gap-2" style={{ animation: "mesa-aparece 180ms ease-out" }}>
              {opcionesDe(elegida).map((j) => (
                <button key={j.lado} type="button" className="rounded-xl bg-emerald-700 px-3 py-1.5 text-[12px] font-black text-white shadow hover:bg-emerald-600" onClick={() => jugar(j)} data-testid={`mesa-domino-${j.lado}`}>
                  {j.lado === "izq" ? `◀ En la punta del ${puntas[0]}` : `En la punta del ${puntas[1]} ▶`}
                </button>
              ))}
            </div>
          )}
          {(validas.includes("robar") || validas.includes("pasar")) && (
            <div className="mt-2 flex justify-center">
              {validas.includes("robar") ? (
                <button type="button" className="rounded-xl bg-amber-600 px-4 py-2 text-[13px] font-black text-white shadow hover:bg-amber-500" onClick={() => jugar("robar")} data-testid="mesa-domino-robar">
                  No casa ninguna: robar del pozo ({vista.pozo})
                </button>
              ) : (
                <button type="button" className="rounded-xl bg-stone-600 px-4 py-2 text-[13px] font-black text-white shadow hover:bg-stone-500" onClick={() => jugar("pasar")} data-testid="mesa-domino-pasar">
                  No casa ninguna: paso
                </button>
              )}
            </div>
          )}
        </div>
      )}
      <style>{TECLAS_ANIMACION + DOMINO_LLEGA}</style>
    </div>
  );
}

/** La ficha nueva se desliza desde quien la jugó: las mías suben desde la mano; las de los demás bajan desde arriba. */
const DOMINO_LLEGA = `
@keyframes domino-llega-abajo { 0% { transform: translateY(160%) scale(.8) rotate(-10deg); opacity: 0 } 60% { transform: translateY(-8%) scale(1.06) rotate(1deg); opacity: 1 } 100% { transform: none } }
@keyframes domino-llega-arriba { 0% { transform: translateY(-160%) scale(.8) rotate(10deg); opacity: 0 } 60% { transform: translateY(8%) scale(1.06) rotate(-1deg); opacity: 1 } 100% { transform: none } }
@media (prefers-reduced-motion: reduce) { [style*="domino-llega"] { animation: none !important } }
`;
