/**
 * La pantalla del ajedrez (shared/mesa/ajedrez.ts): el tablero de madera con sus coordenadas, las piezas que se deslizan,
 * las comidas que se apagan, adónde puede ir la pieza que tocas, la última jugada marcada, el rey en jaque que late, la
 * coronación con su elección y lo que comió cada lado. Quien juega con las negras ve el tablero al revés.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { casillaDe, nombreCasilla, type VistaAjedrez } from "@shared/mesa/ajedrez";
import type { PantallaMesaProps } from "./index";
import { NOMBRE_PIEZA, PiezaAjedrez } from "./piezas-ajedrez";
import { Estallido, TECLAS_ANIMACION, VetaMadera, usePiezasAnimadas } from "./tablero";
import { mesaSonido } from "./mesa-sonido";
import { useJugadaNueva } from "./vida";

const VALOR = [0, 1, 3, 3, 5, 9, 0];
const CLARA = "#f0dcb4";
const OSCURA = "#b07d4f";

function Comidas({ piezas, lado, ventaja }: { piezas: number[]; lado: 0 | 1; ventaja: number }) {
  const orden = [...piezas].sort((a, b) => a - b);
  return (
    <span className="flex min-h-[1.25rem] items-center">
      {orden.map((k, i) => (
        <PiezaAjedrez key={i} v={lado === 0 ? -k : k} className="-ml-1 h-5 w-5 first:ml-0" />
      ))}
      {ventaja > 0 && <span className="ml-1 text-[11px] font-black text-stone-500">+{ventaja}</span>}
    </span>
  );
}

export function AjedrezPantalla({ vista, jugadas, jugar, ultima, ocupado, asientos, juegan, miAsiento }: PantallaMesaProps<VistaAjedrez, string>) {
  const alReves = miAsiento === 1;
  const [sel, setSel] = useState<number | null>(null);
  const [corona, setCorona] = useState<{ de: number; a: number } | null>(null);
  useEffect(() => {
    setSel(null);
    setCorona(null);
  }, [ultima?.n, ocupado]);

  const porOrigen = useMemo(() => {
    const m = new Map<number, string[]>();
    if (!ocupado) for (const j of jugadas) m.set(casillaDe(j.slice(0, 2)), [...(m.get(casillaDe(j.slice(0, 2))) ?? []), j]);
    return m;
  }, [jugadas, ocupado]);
  const destinos = new Set(sel === null ? [] : (porOrigen.get(sel) ?? []).map((j) => casillaDe(j.slice(2, 4))));
  const camino = vista.ultima ? [vista.ultima.de, vista.ultima.a] : null;
  const piezas = usePiezasAnimadas(vista.t, camino, ultima?.n ?? 0);
  // cada jugada suena al posarse la pieza: la madera, comer o el jaque
  const comidas = vista.comidas[0].length + vista.comidas[1].length;
  const comidasAntes = useRef(comidas);
  useJugadaNueva(ultima, () => {
    const comio = comidas > comidasAntes.current;
    setTimeout(() => (comio ? mesaSonido.comer() : mesaSonido.pieza()), 240);
    if (vista.jaque !== null) setTimeout(() => mesaSonido.jaque(), 480);
  });
  useEffect(() => {
    comidasAntes.current = comidas;
  });

  function tocar(sq: number) {
    if (sel !== null && destinos.has(sq)) {
      const js = (porOrigen.get(sel) ?? []).filter((j) => casillaDe(j.slice(2, 4)) === sq);
      if (js.length > 1) setCorona({ de: sel, a: sq });
      else {
        jugar(js[0]);
        setSel(null);
      }
      return;
    }
    setSel(porOrigen.has(sq) && sq !== sel ? sq : null);
  }

  const material = (lado: 0 | 1) => vista.comidas[lado].reduce((s, k) => s + VALOR[k], 0);
  const ventaja = material(0) - material(1);
  const abajo: 0 | 1 = alReves ? 1 : 0;
  const arriba: 0 | 1 = alReves ? 0 : 1;
  const fila = (lado: 0 | 1) => (
    <div className={`flex w-full max-w-[25rem] items-center justify-between gap-2 rounded-full px-3 py-1 text-[12px] font-bold ${juegan.includes(lado) ? "bg-amber-100 ring-2 ring-amber-400 dark:bg-amber-900/40" : "bg-white/70 dark:bg-stone-800"}`}>
      <span className="flex items-center gap-1.5">
        <span className={`inline-block h-3 w-3 rounded-full border ${lado === 0 ? "border-stone-500 bg-[#fbf5e9]" : "border-stone-300 bg-[#2d2119]"}`} />
        {asientos[lado]?.nombre ?? (lado === 0 ? "Blancas" : "Negras")}
        <span className="font-normal text-stone-500">({lado === 0 ? "blancas" : "negras"})</span>
      </span>
      <Comidas piezas={vista.comidas[lado]} lado={lado} ventaja={lado === 0 ? ventaja : -ventaja} />
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-2" data-testid="mesa-ajedrez">
      {fila(arriba)}
      <div className="relative aspect-square w-full max-w-[25rem] select-none rounded-xl p-[3%] shadow-[0_10px_28px_rgba(0,0,0,0.35)]" style={{ background: "linear-gradient(145deg, #6b4423, #3d2512)" }}>
        <div className="relative h-full w-full overflow-hidden rounded-md">
          <div className="grid h-full w-full grid-cols-8 grid-rows-8">
            {Array.from({ length: 64 }, (_, k) => {
              const sq = alReves ? 63 - k : k;
              const oscura = ((sq >> 3) + (sq & 7)) % 2 === 1;
              const esUltima = vista.ultima && (vista.ultima.de === sq || vista.ultima.a === sq);
              const destino = destinos.has(sq);
              const ocupada = vista.t[sq] !== 0;
              const puede = porOrigen.has(sq);
              const nombre = nombreCasilla(sq);
              return (
                <button
                  key={sq}
                  type="button"
                  onClick={() => tocar(sq)}
                  disabled={ocupado}
                  aria-label={`${nombre}${ocupada ? `: ${NOMBRE_PIEZA[Math.abs(vista.t[sq])]} ${vista.t[sq] > 0 ? "blanco" : "negro"}` : ""}${destino ? " (puedes mover aquí)" : ""}`}
                  className={`relative ${puede || destino ? "cursor-pointer" : "cursor-default"}`}
                  style={{ background: oscura ? OSCURA : CLARA }}
                  data-testid={`mesa-casilla-${nombre}`}
                >
                  {esUltima && <span className="absolute inset-0 bg-amber-300/50" />}
                  {sel === sq && <span className="absolute inset-0 bg-emerald-400/50" />}
                  {vista.jaque === sq && (
                    <span className="absolute inset-[4%] rounded-full" style={{ background: "radial-gradient(circle, rgba(239,68,68,.9), rgba(239,68,68,0) 72%)", animation: "mesa-latido 1.1s ease-in-out infinite" }} />
                  )}
                  {destino &&
                    (ocupada ? (
                      <span className="absolute inset-[5%] rounded-full border-[3px] border-emerald-700/70" />
                    ) : (
                      <span className="absolute left-1/2 top-1/2 h-[30%] w-[30%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-800/45" style={{ animation: "mesa-aparece 160ms ease-out" }} />
                    ))}
                  {k % 8 === 0 && <span className={`absolute left-[4%] top-[2%] text-[10px] font-black leading-none ${oscura ? "text-[#f0dcb4]" : "text-[#8a5a31]"}`}>{nombre[1]}</span>}
                  {k >= 56 && <span className={`absolute bottom-[3%] right-[5%] text-[10px] font-black leading-none ${oscura ? "text-[#f0dcb4]" : "text-[#8a5a31]"}`}>{nombre[0]}</span>}
                </button>
              );
            })}
          </div>
          <VetaMadera />
          {piezas.map((p) => {
            const k = alReves ? 63 - p.sq : p.sq;
            const elegida = sel === p.sq && !p.sale;
            // la que acaba de llegar se asienta con un saltito
            const movida = !!vista.ultima && p.sq === vista.ultima.a && !p.sale;
            return (
              <div
                key={p.id}
                className="pointer-events-none absolute"
                style={{
                  left: `${(k & 7) * 12.5}%`,
                  top: `${(k >> 3) * 12.5}%`,
                  width: "12.5%",
                  height: "12.5%",
                  transition: "left 280ms cubic-bezier(.3,.9,.35,1), top 280ms cubic-bezier(.3,.9,.35,1), opacity 320ms, transform 220ms",
                  opacity: p.sale ? 0 : 1,
                  transform: p.sale ? "scale(.4) rotate(-20deg)" : elegida ? "scale(1.14) translateY(-5%)" : "scale(1)",
                  zIndex: p.sale ? 1 : elegida ? 4 : 2,
                }}
              >
                <div key={movida ? `m${ultima?.n ?? 0}` : "q"} className="h-full w-full" style={movida ? { animation: "mesa-asienta 340ms 240ms both" } : undefined}>
                  <PiezaAjedrez v={p.v} className="h-full w-full p-[5%] drop-shadow-[0_2px_1.5px_rgba(0,0,0,0.35)]" />
                </div>
              </div>
            );
          })}
          {/* al comer, un estallido donde estaba la pieza */}
          {piezas
            .filter((p) => p.sale)
            .map((p) => {
              const k = alReves ? 63 - p.sq : p.sq;
              return <Estallido key={`e${p.id}`} izq={`${(k & 7) * 12.5}%`} arriba={`${(k >> 3) * 12.5}%`} tam="12.5%" />;
            })}
          {corona && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-stone-950/55 backdrop-blur-[1px]" data-testid="mesa-corona">
              <p className="rounded-full bg-amber-100 px-3 py-1 text-[13px] font-black text-amber-950">¿En qué se convierte tu peón?</p>
              <div className="flex gap-2">
                {(["q", "r", "b", "n"] as const).map((l) => {
                  const k = { q: 5, r: 4, b: 3, n: 2 }[l];
                  return (
                    <button
                      key={l}
                      type="button"
                      className="h-14 w-14 rounded-2xl bg-[#f0dcb4] p-1 shadow-lg ring-2 ring-amber-400 transition hover:scale-110"
                      onClick={() => {
                        jugar(`${nombreCasilla(corona.de)}${nombreCasilla(corona.a)}${l}`);
                        setCorona(null);
                        setSel(null);
                      }}
                      aria-label={`Coronar ${NOMBRE_PIEZA[k]}`}
                      data-testid={`mesa-corona-${l}`}
                    >
                      <PiezaAjedrez v={miAsiento === 1 ? -k : k} className="h-full w-full" />
                    </button>
                  );
                })}
              </div>
              <button type="button" className="text-[12px] font-bold text-amber-100 underline" onClick={() => setCorona(null)}>
                Cancelar
              </button>
            </div>
          )}
        </div>
      </div>
      {fila(abajo)}
      {vista.jaque !== null && !vista.fin && (
        <p className="rounded-full bg-red-600 px-3 py-0.5 text-[13px] font-black text-white shadow" style={{ animation: "mesa-aparece 220ms ease-out" }} data-testid="mesa-jaque">
          ¡Jaque!
        </p>
      )}
      <style>{TECLAS_ANIMACION}</style>
    </div>
  );
}
