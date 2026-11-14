/**
 * La pantalla de las damas (shared/mesa/damas.ts): el tablero de nogal, las fichas de marfil y de ébano que se deslizan,
 * los saltos de una comida larga uno por uno, las comidas que se apagan, la dama con su corona y el aviso de «¡Hay que
 * comer!». Se elige la ficha y luego cada casilla del camino (si hay una sola manera, se completa sola).
 */
import { useEffect, useRef, useState } from "react";
import type { VistaDamas } from "@shared/mesa/damas";
import type { PantallaMesaProps } from "./index";
import { CoronaSvg, Estallido, TECLAS_ANIMACION, VetaMadera, usePiezasAnimadas } from "./tablero";
import { mesaSonido } from "./mesa-sonido";
import { useJugadaNueva } from "./vida";
import { Ico } from "../iconos";

const CLARA = "#efe0bf";
const OSCURA = "#7a5230";

function Ficha({ v }: { v: number }) {
  const blanca = v > 0;
  return (
    <div className="h-full w-full p-[10%]">
      <div
        className="relative h-full w-full rounded-full"
        style={{
          background: blanca ? "radial-gradient(circle at 35% 30%, #fffdf7, #efe2c8 55%, #c4ae86)" : "radial-gradient(circle at 35% 30%, #6e5848, #2b1f17 60%, #120c08)",
          border: blanca ? "2px solid #a58d66" : "2px solid #0b0705",
          boxShadow: "0 3px 0 rgba(0,0,0,.35), inset 0 -3px 0 rgba(0,0,0,.18)",
        }}
      >
        <span className="absolute inset-[22%] rounded-full" style={{ border: blanca ? "2px solid rgba(165,141,102,.65)" : "2px solid rgba(255,255,255,.14)" }} />
        {Math.abs(v) === 2 && <CoronaSvg className="absolute left-[18%] top-[20%] h-[60%] w-[64%]" />}
      </div>
    </div>
  );
}

/** ¿Este tramo come? (hay una ficha en medio) */
function come(t: number[], a: number, b: number): boolean {
  const df = Math.sign((b >> 3) - (a >> 3));
  const dc = Math.sign((b & 7) - (a & 7));
  let f = (a >> 3) + df;
  let c = (a & 7) + dc;
  while (f * 8 + c !== b && f >= 0 && f < 8 && c >= 0 && c < 8) {
    if (t[f * 8 + c]) return true;
    f += df;
    c += dc;
  }
  return false;
}

export function DamasPantalla({ vista, jugadas, jugar, ultima, ocupado, asientos, juegan, miAsiento }: PantallaMesaProps<VistaDamas, number[]>) {
  const alReves = miAsiento === 1;
  const [camino, setCamino] = useState<number[]>([]);
  useEffect(() => setCamino([]), [ultima?.n, ocupado]);
  const validas = ocupado ? [] : jugadas;
  const origenes = new Set(validas.map((j) => j[0]));
  const conPrefijo = validas.filter((j) => camino.every((x, i) => j[i] === x));
  const siguientes = new Set(camino.length ? conPrefijo.filter((j) => j.length > camino.length).map((j) => j[camino.length]) : []);
  const hayQueComer = validas.length > 0 && (validas[0].length > 2 || come(vista.t, validas[0][0], validas[0][1]));
  const piezas = usePiezasAnimadas(vista.t, vista.ultima?.camino ?? null, ultima?.n ?? 0);
  // cada salto suena como madera; al comer, el golpe; al coronarse, el arpegio
  const total = vista.fichas[0] + vista.fichas[1];
  const totalAntes = useRef(total);
  useJugadaNueva(ultima, () => {
    const saltos = Math.max(1, (vista.ultima?.camino.length ?? 2) - 1);
    const comio = total < totalAntes.current;
    for (let k = 0; k < saltos; k++) setTimeout(() => (comio ? mesaSonido.comer() : mesaSonido.pieza()), 200 + k * 230);
    if (vista.ultima?.corona) setTimeout(() => mesaSonido.sube(), 260 + saltos * 230);
  });
  useEffect(() => {
    totalAntes.current = total;
  });
  const llegada = vista.ultima ? vista.ultima.camino[vista.ultima.camino.length - 1] : null;

  function tocar(sq: number) {
    if (camino.length && siguientes.has(sq)) {
      const nuevo = [...camino, sq];
      const quedan = validas.filter((j) => nuevo.every((x, i) => j[i] === x));
      if (quedan.length === 1) {
        jugar(quedan[0]);
        setCamino([]);
      } else setCamino(nuevo);
      return;
    }
    setCamino(origenes.has(sq) && !(camino.length === 1 && camino[0] === sq) ? [sq] : []);
  }

  const color = (lado: 0 | 1) => (
    <span className={`inline-block h-3 w-3 rounded-full border ${lado === 0 ? "border-stone-500 bg-[#f6ecd8]" : "border-stone-300 bg-[#2b1f17]"}`} />
  );
  const fila = (lado: 0 | 1) => (
    <div className={`flex w-full max-w-[25rem] items-center justify-between gap-2 rounded-full px-3 py-1 text-[12px] font-bold ${juegan.includes(lado) ? "bg-amber-100 ring-2 ring-amber-400 dark:bg-amber-900/40" : "bg-white/70 dark:bg-stone-800"}`}>
      <span className="flex items-center gap-1.5">
        {color(lado)} {asientos[lado]?.nombre ?? (lado === 0 ? "Blancas" : "Negras")}
      </span>
      <span className="tabular-nums text-stone-500">{vista.fichas[lado]} fichas</span>
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-2" data-testid="mesa-damas">
      {fila(alReves ? 0 : 1)}
      <div className="relative aspect-square w-full max-w-[25rem] select-none rounded-xl p-[3%] shadow-[0_10px_28px_rgba(0,0,0,0.35)]" style={{ background: "linear-gradient(145deg, #5a3a1e, #2e1d0e)" }}>
        <div className="relative h-full w-full overflow-hidden rounded-md">
          <div className="grid h-full w-full grid-cols-8 grid-rows-8">
            {Array.from({ length: 64 }, (_, k) => {
              const sq = alReves ? 63 - k : k;
              const oscura = ((sq >> 3) + (sq & 7)) % 2 === 1;
              const enUltima = vista.ultima?.camino.includes(sq);
              const elegido = camino.includes(sq);
              const siguiente = siguientes.has(sq);
              const puede = !camino.length && origenes.has(sq);
              return (
                <button
                  key={sq}
                  type="button"
                  onClick={() => tocar(sq)}
                  disabled={ocupado || !oscura}
                  aria-label={`Fila ${8 - (sq >> 3)}, columna ${(sq & 7) + 1}${vista.t[sq] ? (vista.t[sq] > 0 ? ": ficha blanca" : ": ficha negra") : ""}${siguiente ? " (puedes ir aquí)" : ""}`}
                  className="relative"
                  style={{ background: oscura ? OSCURA : CLARA }}
                  data-testid={`mesa-damas-${sq}`}
                >
                  {enUltima && <span className="absolute inset-0 bg-amber-300/35" />}
                  {elegido && <span className="absolute inset-0 bg-emerald-400/45" />}
                  {puede && <span className="absolute inset-[6%] rounded-full ring-2 ring-amber-300/80" style={{ animation: hayQueComer ? "mesa-latido 1.2s ease-in-out infinite" : undefined }} />}
                  {siguiente && (
                    <span className="absolute left-1/2 top-1/2 h-[30%] w-[30%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-300/80 shadow-[0_0_10px_rgba(110,231,183,0.9)]" style={{ animation: "mesa-aparece 160ms ease-out" }} />
                  )}
                </button>
              );
            })}
          </div>
          <VetaMadera />
          {piezas.map((p) => {
            // mientras se elige una comida larga, la ficha elegida se ve en la última casilla del camino
            const sq = camino.length > 1 && p.sq === camino[0] && !p.sale ? camino[camino.length - 1] : p.sq;
            const k = alReves ? 63 - sq : sq;
            const alzada = camino[0] === p.sq && !p.sale;
            return (
              <div
                key={p.id}
                className="pointer-events-none absolute"
                style={{
                  left: `${(k & 7) * 12.5}%`,
                  top: `${(k >> 3) * 12.5}%`,
                  width: "12.5%",
                  height: "12.5%",
                  transition: "left 230ms cubic-bezier(.3,.9,.35,1), top 230ms cubic-bezier(.3,.9,.35,1), opacity 360ms, transform 220ms",
                  opacity: p.sale ? 0 : 1,
                  transform: p.sale ? "scale(.3)" : alzada ? "scale(1.15) translateY(-6%)" : "scale(1)",
                  zIndex: p.sale ? 1 : alzada ? 4 : 2,
                }}
              >
                <div
                  key={p.sq === llegada && !p.sale && !alzada ? `m${ultima?.n ?? 0}` : "q"}
                  className="h-full w-full"
                  style={p.sq === llegada && !p.sale && !alzada ? { animation: `mesa-asienta 340ms ${200 + Math.max(0, (vista.ultima?.camino.length ?? 2) - 2) * 230}ms both` } : undefined}
                >
                  <Ficha v={p.v} />
                </div>
              </div>
            );
          })}
          {piezas
            .filter((p) => p.sale)
            .map((p) => {
              const k = alReves ? 63 - p.sq : p.sq;
              return <Estallido key={`e${p.id}`} izq={`${(k & 7) * 12.5}%`} arriba={`${(k >> 3) * 12.5}%`} tam="12.5%" />;
            })}
          {vista.ultima?.corona && llegada !== null && (
            <span
              key={`c${ultima?.n ?? 0}`}
              className="pointer-events-none absolute z-[6] rounded-full"
              style={{
                left: `${((alReves ? 63 - llegada : llegada) & 7) * 12.5}%`,
                top: `${((alReves ? 63 - llegada : llegada) >> 3) * 12.5}%`,
                width: "12.5%",
                height: "12.5%",
                background: "radial-gradient(circle, rgba(255,240,170,.95), rgba(245,180,40,.4) 45%, rgba(245,180,40,0) 70%)",
                animation: `mesa-destello 900ms ${260 + Math.max(0, (vista.ultima.camino.length ?? 2) - 2) * 230}ms ease-out both`,
              }}
              aria-hidden="true"
            />
          )}
        </div>
      </div>
      {fila(alReves ? 1 : 0)}
      {hayQueComer && (
        <p className="rounded-full bg-amber-500 px-3 py-0.5 text-[13px] font-black text-amber-950 shadow" style={{ animation: "mesa-aparece 220ms ease-out" }} data-testid="mesa-hay-que-comer">
          ¡Hay que comer!{validas[0].length > 2 ? ` Te puedes comer ${validas[0].length - 1} seguidas.` : ""}
        </p>
      )}
      {vista.ultima?.corona && <p className="text-[12px] font-bold text-amber-700 dark:text-amber-300"><Ico e="👑" /> ¡Una ficha se coronó!</p>}
      <style>{TECLAS_ANIMACION}</style>
    </div>
  );
}
