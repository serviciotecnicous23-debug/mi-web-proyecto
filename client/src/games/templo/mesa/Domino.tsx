/**
 * La pantalla del dominó (shared/mesa/domino.ts), como en los juegos de dominó de siempre:
 * - la mesa de paño con su borde de madera. La fila empieza en el medio y crece hacia las dos puntas, dobla en las
 *   orillas como una serpiente y los dobles van atravesados (shared/mesa/domino-cadena.ts). La mesa se aleja sola para
 *   que siempre se vean las dos puntas;
 * - las fichas de marfil con sus puntos hundidos y su perno de bronce. La recién puesta llega desde quien la jugó, con
 *   su brillo;
 * - cuando te toca, laten las puntas donde puedes jugar. Si la ficha que tocas casa en las dos, aparece su sombra en
 *   cada punta para elegir dónde ponerla;
 * - los demás arriba, con sus fichas boca abajo y lo que hicieron («¡Paso!», «Robó»). Mi mano en su atril, con las que
 *   casan levantadas;
 * - los puntos de cada pareja (o de cada uno) hasta la meta, y el final de cada mano con todas las fichas destapadas.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import type { Ficha, JugadaColocar, JugadaDomino, VistaDomino } from "@shared/mesa/domino";
import { cadenaDomino, caja, dondeIria, mitadLibre, type FichaPuesta } from "@shared/mesa/domino-cadena";
import type { PantallaMesaProps } from "./index";
import { TECLAS_ANIMACION } from "./tablero";
import { mesaSonido } from "./mesa-sonido";
import { Sello, colorDe, useJugadaNueva, useMiTurno } from "./vida";

/** Los puntos de cada mitad, con la ficha acostada (columna y fila, de -1 a 1). Parada, la ficha gira con sus puntos. */
const PUNTOS: Record<number, [number, number][]> = {
  0: [],
  1: [[0, 0]],
  2: [
    [-1, -1],
    [1, 1],
  ],
  3: [
    [-1, -1],
    [0, 0],
    [1, 1],
  ],
  4: [
    [-1, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
  ],
  5: [
    [-1, -1],
    [1, -1],
    [0, 0],
    [-1, 1],
    [1, 1],
  ],
  6: [
    [-1, -1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [0, 1],
    [1, 1],
  ],
};

/** El marfil, los puntos hundidos, el perno de bronce, el dorso y el brillo (los mismos en todas: vale el primero). */
function DefsDomino() {
  return (
    <defs>
      <linearGradient id="dom-cara" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#fffdf8" />
        <stop offset="0.6" stopColor="#f6efe0" />
        <stop offset="1" stopColor="#e4d7bd" />
      </linearGradient>
      <radialGradient id="dom-pip" cx="0.4" cy="0.35" r="0.7">
        <stop offset="0" stopColor="#040302" />
        <stop offset="0.68" stopColor="#1c140f" />
        <stop offset="1" stopColor="#56453a" />
      </radialGradient>
      <radialGradient id="dom-perno" cx="0.35" cy="0.3" r="0.75">
        <stop offset="0" stopColor="#fbe7a6" />
        <stop offset="1" stopColor="#94681d" />
      </radialGradient>
      <linearGradient id="dom-dorso" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#8f3726" />
        <stop offset="1" stopColor="#4a1a10" />
      </linearGradient>
      <filter id="dom-brillo" x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="0.16" />
      </filter>
    </defs>
  );
}

function Puntos({ n, cx }: { n: number; cx: number }) {
  return (
    <>
      {(PUNTOS[n] ?? []).map(([i, j], k) => (
        <circle key={k} cx={cx + i * 0.26} cy={j * 0.26} r={0.083} fill="url(#dom-pip)" />
      ))}
    </>
  );
}

/** La cara de una ficha acostada (2 × 1, con el centro en 0): `a` a la izquierda y `b` a la derecha; o el dorso. */
function CaraFicha({ a, b, oculta = false }: { a: number; b: number; oculta?: boolean }) {
  if (oculta)
    return (
      <>
        <rect x={-0.97} y={-0.47} width={1.94} height={0.94} rx={0.13} fill="url(#dom-dorso)" stroke="#2e0f08" strokeWidth={0.03} />
        <rect x={-0.84} y={-0.34} width={1.68} height={0.68} rx={0.08} fill="none" stroke="#e8b04a" strokeOpacity={0.6} strokeWidth={0.03} />
        <circle r={0.14} fill="none" stroke="#e8b04a" strokeOpacity={0.75} strokeWidth={0.03} />
        <circle r={0.05} fill="#e8b04a" fillOpacity={0.85} />
      </>
    );
  return (
    <>
      <rect x={-0.97} y={-0.47} width={1.94} height={0.94} rx={0.13} fill="url(#dom-cara)" stroke="#8a7458" strokeWidth={0.028} />
      <rect x={-0.91} y={-0.41} width={1.82} height={0.82} rx={0.09} fill="none" stroke="#ffffff" strokeOpacity={0.55} strokeWidth={0.02} />
      {/* la raya del medio, hundida, y el perno de bronce */}
      <line x1={-0.012} y1={-0.33} x2={-0.012} y2={0.33} stroke="#a08a6c" strokeWidth={0.03} strokeLinecap="round" />
      <line x1={0.016} y1={-0.33} x2={0.016} y2={0.33} stroke="#ffffff" strokeOpacity={0.7} strokeWidth={0.015} strokeLinecap="round" />
      <circle r={0.058} fill="url(#dom-perno)" stroke="#6b4a18" strokeWidth={0.012} />
      <Puntos n={a} cx={-0.5} />
      <Puntos n={b} cx={0.5} />
    </>
  );
}

/** Una ficha de dominó suelta (en la mano, boca abajo o al final de la mano). Acostada: `a` a la izquierda; parada: arriba. */
export function FichaDomino({ a, b, parada = false, oculta = false, className = "" }: { a: number; b: number; parada?: boolean; oculta?: boolean; className?: string }) {
  return (
    <svg viewBox={parada ? "-0.52 -1.02 1.04 2.04" : "-1.02 -0.52 2.04 1.04"} className={className} aria-hidden="true" style={{ filter: "drop-shadow(0 2px 1.5px rgba(0,0,0,.35))", overflow: "visible" }}>
      <DefsDomino />
      <g transform={parada ? "rotate(90)" : undefined}>
        <CaraFicha a={a} b={b} oculta={oculta} />
      </g>
    </svg>
  );
}

/** Una ficha en la mesa: su sombra y su canto (siempre abajo a la derecha, como da la luz) y la cara, girada si va parada. */
function FichaEnMesa({ p, nueva, desdeAbajo }: { p: FichaPuesta; nueva: boolean; desdeAbajo: boolean }) {
  const c = caja(p);
  const w = c.x1 - c.x0, h = c.y1 - c.y0;
  return (
    <g className={nueva ? (desdeAbajo ? "dom-llega-abajo" : "dom-llega-arriba") : undefined}>
      {nueva && <rect x={c.x0 - 0.1} y={c.y0 - 0.1} width={w + 0.2} height={h + 0.2} rx={0.22} fill="#fde68a" opacity={0.6} filter="url(#dom-brillo)" />}
      <rect x={c.x0 + 0.07} y={c.y0 + 0.11} width={w - 0.05} height={h - 0.05} rx={0.14} fill="#000" opacity={0.3} />
      <rect x={c.x0 + 0.045} y={c.y0 + 0.07} width={w - 0.06} height={h - 0.06} rx={0.13} fill="#b3a07e" />
      <g transform={`translate(${p.x} ${p.y})${p.acostada ? "" : " rotate(90)"}`}>
        <CaraFicha a={p.a} b={p.b} />
      </g>
    </g>
  );
}

/** La sombra de la ficha que vas a poner, en la punta donde iría: tócala para ponerla ahí. */
function SombraFicha({ p, alTocar, etiqueta }: { p: FichaPuesta; alTocar: () => void; etiqueta: string }) {
  const c = caja(p);
  const w = c.x1 - c.x0, h = c.y1 - c.y0;
  return (
    <g onClick={alTocar} style={{ cursor: "pointer" }} role="button" aria-label={etiqueta}>
      <rect x={c.x0 - 0.16} y={c.y0 - 0.16} width={w + 0.32} height={h + 0.32} rx={0.24} fill="#fde68a" opacity={0.28} />
      <g transform={`translate(${p.x} ${p.y})${p.acostada ? "" : " rotate(90)"}`} opacity={0.62}>
        <CaraFicha a={p.a} b={p.b} />
      </g>
      <rect x={c.x0 + 0.02} y={c.y0 + 0.02} width={w - 0.04} height={h - 0.04} rx={0.14} fill="none" stroke="#fbbf24" strokeWidth={0.075} className="dom-late" />
    </g>
  );
}

/** La caja que se ve de la mesa: se mueve suave cuando la fila crece (y de una, si no hay animación o la pestaña no se ve). */
function useCajaSuave(obj: [number, number, number, number]): [number, number, number, number] {
  const [vb, setVb] = useState(obj);
  const actual = useRef(obj);
  const [x, y, w, h] = obj;
  useEffect(() => {
    const ini = actual.current, fin: [number, number, number, number] = [x, y, w, h];
    if (ini.every((v, i) => Math.abs(v - fin[i]) < 1e-3)) return;
    const sinAnimar = typeof window === "undefined" || document.hidden || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (sinAnimar) {
      actual.current = fin;
      setVb(fin);
      return;
    }
    const t0 = performance.now(), dur = 430;
    let raf = 0;
    const paso = (t: number) => {
      const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      const v = ini.map((a, i) => a + (fin[i] - a) * e) as [number, number, number, number];
      actual.current = v;
      setVb(v);
      if (k < 1) raf = requestAnimationFrame(paso);
    };
    raf = requestAnimationFrame(paso);
    // si la pestaña se esconde a la mitad, queda donde va
    const t = setTimeout(() => {
      actual.current = fin;
      setVb(fin);
    }, dur + 120);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, [x, y, w, h]);
  return vb;
}

/** La proporción de la mesa (ancho / alto), para decidir hasta dónde llega cada renglón. */
function useProporcion(ref: React.RefObject<HTMLDivElement | null>): number {
  const [p, setP] = useState(1.5);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const medir = () => {
      const r = el.getBoundingClientRect();
      if (r.width > 10 && r.height > 10) setP(Math.round((r.width / r.height) * 20) / 20);
    };
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return p;
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

  // la mesa: hasta dónde llega cada renglón (según la forma de la mesa), las fichas en su lugar y las sombras
  const paño = useRef<HTMLDivElement | null>(null);
  const proporcion = useProporcion(paño);
  const limite = Math.max(3, Math.min(9, Math.round(proporcion * 4)));
  const cadena = useMemo(() => cadenaDomino(vista.mesa, limite), [vista.mesa, limite]);
  const ultimaN = vista.mesa.reduce((m, x) => Math.max(m, x.n), -1);
  const sombras = useMemo(() => (elegida ? opcionesDe(elegida).map((j) => ({ j, p: dondeIria(vista.mesa, limite, j.f, j.lado) })) : []), [elegida, colocar, vista.mesa, limite]); // eslint-disable-line react-hooks/exhaustive-deps
  const ladosQueCasan = new Set(colocar.map((j) => j.lado));
  const objetivo = useMemo((): [number, number, number, number] => {
    const cajas = [...cadena.fichas, ...sombras.map((s) => s.p)].map(caja);
    let x0 = -4, y0 = -2, x1 = 4, y1 = 2;
    if (cajas.length) {
      x0 = Math.min(...cajas.map((c) => c.x0));
      y0 = Math.min(...cajas.map((c) => c.y0));
      x1 = Math.max(...cajas.map((c) => c.x1));
      y1 = Math.max(...cajas.map((c) => c.y1));
    }
    // un poco de paño alrededor, nunca tan cerca que pocas fichas se vean gigantes, y con la forma de la mesa
    const pad = 0.9;
    let w = Math.max(x1 - x0 + 2 * pad, 10), h = Math.max(y1 - y0 + 2 * pad, 10 / proporcion);
    if (w / h < proporcion) w = h * proporcion;
    else h = w / proporcion;
    const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
    return [cx - w / 2, cy - h / 2, w, h];
  }, [cadena, sombras, proporcion]);
  const vb = useCajaSuave(objetivo);

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
    else if (j && typeof j === "object") setTimeout(() => mesaSonido.ficha(), 160);
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
  const nombre = (i: number) => (asientos[i]?.nombre ?? `Asiento ${i + 1}`).replace(/\s*🤖\s*$/u, "");
  const meToca = yo >= 0 && juegan.includes(yo) && !ocupado;
  const quienPuso = vista.mesa.find((f) => f.n === ultimaN)?.quien;
  // lo último que hizo cada uno, en su globito (hasta la jugada siguiente)
  const dijo = (i: number) => (ultima && ultima.asiento === i ? (ultima.jugada === "pasar" ? "¡Paso!" : ultima.jugada === "robar" ? "Robó" : null) : null);

  return (
    <div className="relative mx-auto flex w-full max-w-[44rem] flex-col items-center gap-2" data-testid="mesa-domino">
      {sello && <Sello llave={sello.n} texto={sello.texto} sub={sello.sub} color="#9a3412" />}
      {/* los puntos */}
      <div className="flex w-full flex-wrap justify-center gap-1.5 text-[12px] font-bold">
        {(vista.parejas ? [0, 1] : Array.from({ length: n }, (_, i) => i)).map((eq) => {
          const mio = yo >= 0 && equipo(yo) === eq;
          const quienes = Array.from({ length: n }, (_, i) => i).filter((i) => equipo(i) === eq);
          const p = vista.puntos[eq] ?? 0;
          return (
            <div key={eq} className={`min-w-[8rem] flex-1 rounded-xl px-2.5 py-1.5 shadow-sm ${mio ? "bg-amber-100 ring-2 ring-amber-400 dark:bg-amber-900/40" : "bg-white/80 dark:bg-stone-800"}`}>
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
      {/* los demás: su ficha de color, su nombre, sus fichas boca abajo y lo último que hicieron */}
      <div className="flex w-full flex-wrap justify-center gap-1.5">
        {otros.map((i) => {
          const activo = juegan.includes(i);
          const globo = dijo(i);
          return (
            <div
              key={i}
              className={`relative flex min-w-0 items-center gap-1.5 rounded-2xl py-1 pl-1 pr-2.5 text-[12px] font-bold shadow-sm transition ${activo ? "bg-amber-300 text-amber-950 shadow-[0_0_14px_rgba(251,191,36,0.75)] ring-2 ring-amber-500" : "bg-white/80 dark:bg-stone-800"}`}
              data-testid={`mesa-domino-rival-${i}`}
            >
              <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[13px] font-black text-white shadow-inner ${activo ? "mesa-late" : ""}`} style={{ background: `radial-gradient(circle at 35% 30%, ${colorDe(i)}cc, ${colorDe(i)})` }}>
                {nombre(i).trim().charAt(0).toUpperCase() || "?"}
              </span>
              <span className="min-w-0">
                <span className="block max-w-[7rem] truncate leading-tight">{nombre(i)}</span>
                <span className="flex items-center gap-1">
                  <span className="flex">
                    {Array.from({ length: Math.min(vista.cuantas[i] ?? 0, 7) }, (_, k) => (
                      <FichaDomino key={k} a={0} b={0} parada oculta className="-ml-1 h-[1.15rem] w-[0.6rem] first:ml-0" />
                    ))}
                  </span>
                  <span className="tabular-nums text-[11px]">{vista.cuantas[i]}</span>
                  {vista.parejas && yo >= 0 && equipo(i) === equipo(yo) && <span className="rounded-full bg-emerald-600 px-1.5 text-[9px] text-white">compañero</span>}
                </span>
              </span>
              {globo && (
                <span key={ultima?.n} className="absolute -right-1 -top-5 z-10 rounded-full bg-stone-900 px-2 py-0.5 text-[11px] font-black text-white shadow-lg ring-2 ring-white/70" style={{ animation: "mesa-aparece 220ms ease-out" }}>
                  {globo}
                </span>
              )}
            </div>
          );
        })}
      </div>
      {/* la mesa: borde de madera y paño, con la fila en su lugar */}
      <div className="w-full rounded-[1.6rem] p-[9px] shadow-[0_10px_26px_rgba(0,0,0,0.35)]" style={{ background: "linear-gradient(145deg, #7a4a24, #4a2a12 55%, #6b3f1d)" }}>
        <div
          ref={paño}
          className="relative w-full overflow-hidden rounded-[1.15rem]"
          style={{
            height: "clamp(15rem, 46vh, 27rem)",
            background:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.045) 1px, transparent 1.2px) 0 0 / 5px 5px, radial-gradient(ellipse at 50% 40%, #23855a 0%, #15653e 55%, #0b4127 100%)",
            boxShadow: "inset 0 2px 18px rgba(0,0,0,0.55), inset 0 0 0 2px rgba(0,0,0,0.25)",
          }}
          data-testid="mesa-domino-mesa"
        >
          {vista.mesa.length === 0 && !sombras.length ? (
            <p className="absolute inset-0 flex items-center justify-center px-6 text-center text-[13px] font-bold text-emerald-50/85">
              {meToca ? "Abre la mano: toca una de tus fichas." : "La mesa está vacía: se abre con la primera ficha."}
            </p>
          ) : (
            <svg viewBox={vb.join(" ")} preserveAspectRatio="xMidYMid meet" className="absolute inset-0 h-full w-full" role="img" aria-label={puntas ? `La mesa: ${vista.mesa.length} fichas; las puntas son ${puntas[0]} y ${puntas[1]}` : "La mesa"}>
              <DefsDomino />
              {cadena.fichas.map((p) => (
                <FichaEnMesa key={p.n} p={p} nueva={p.n === ultimaN} desdeAbajo={quienPuso === yo} />
              ))}
              {/* cuando te toca, laten las puntas donde puedes jugar */}
              {meToca &&
                !elegida &&
                (["izq", "der"] as const)
                  .filter((l) => ladosQueCasan.has(l))
                  .map((l) => {
                    const b = l === "izq" ? cadena.izq : cadena.der;
                    if (!b) return null;
                    const m = mitadLibre(b);
                    return <circle key={l} cx={m.x} cy={m.y} r={0.62} fill="#fde68a" fillOpacity={0.12} stroke="#fde68a" strokeWidth={0.07} className="dom-late" />;
                  })}
              {sombras.map((s) => (
                <SombraFicha key={s.j.lado} p={s.p} alTocar={() => jugar(s.j)} etiqueta={s.j.lado === "izq" ? `Ponerla en la punta del ${puntas?.[0] ?? ""}` : `Ponerla en la punta del ${puntas?.[1] ?? ""}`} />
              ))}
            </svg>
          )}
          {/* la mano y el pozo, en las esquinas del paño */}
          <span className="pointer-events-none absolute left-3 top-2 rounded-full bg-black/25 px-2 py-0.5 text-[11px] font-bold text-emerald-50/90">Mano {vista.mano}</span>
          {puntas && <span className="pointer-events-none absolute right-3 top-2 rounded-full bg-black/25 px-2 py-0.5 text-[11px] font-bold text-emerald-50/90">Puntas: {puntas[0]} y {puntas[1]}</span>}
          {n < 4 && (
            <span className="pointer-events-none absolute bottom-2 right-3 flex items-center gap-1.5 rounded-full bg-black/25 py-0.5 pl-1.5 pr-2 text-[11px] font-bold text-emerald-50/90" data-testid="mesa-domino-pozo">
              <span className="flex">
                {Array.from({ length: Math.min(3, vista.pozo) }, (_, k) => (
                  <FichaDomino key={k} a={0} b={0} oculta className="-ml-2 h-[0.7rem] w-[1.4rem] first:ml-0" />
                ))}
              </span>
              Pozo: {vista.pozo}
            </span>
          )}
        </div>
      </div>
      {/* cómo terminó la mano */}
      {fm && (
        <div className="w-full rounded-2xl bg-gradient-to-b from-amber-200 to-amber-400 p-3 text-amber-950 shadow-lg" style={{ animation: "mesa-aparece 260ms ease-out" }} data-testid="mesa-domino-fin-mano">
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
                <span className="mt-0.5 flex flex-wrap gap-1">
                  {m.map((f, k) => (
                    <FichaDomino key={k} a={f[0]} b={f[1]} className="h-4 w-8" />
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
      {/* mi mano, en su atril */}
      {yo >= 0 && vista.fase === "jugando" && (
        <div className="w-full">
          <div
            className="mx-auto w-fit max-w-full rounded-2xl px-2.5 pb-2 pt-3 shadow-[inset_0_2px_6px_rgba(0,0,0,0.35),0_6px_14px_rgba(0,0,0,0.25)]"
            style={{ background: "linear-gradient(180deg, #8a5a30, #5e3818)" }}
          >
            <div className="flex flex-wrap items-end justify-center gap-1.5" data-testid="mesa-domino-mano">
              {vista.miMano.map((f) => {
                const puede = opcionesDe(f).length > 0;
                const esta = !!elegida && iguales(elegida, f);
                return (
                  <button
                    key={`${f[0]}-${f[1]}`}
                    type="button"
                    disabled={!puede}
                    onClick={() => tocar(f)}
                    aria-label={`Ficha ${f[0]} y ${f[1]}${puede ? " (casa)" : ""}`}
                    className={`h-[4.9rem] w-[2.45rem] rounded-lg transition-all duration-200 ${puede ? "-translate-y-1.5 cursor-pointer drop-shadow-[0_0_9px_rgba(251,191,36,0.9)] hover:-translate-y-3" : "opacity-75 saturate-[.6] brightness-90"} ${esta ? "-translate-y-4 ring-4 ring-amber-300" : ""}`}
                    style={{ animation: "mesa-aparece 260ms ease-out" }}
                    data-testid={`mesa-ficha-${f[0]}-${f[1]}`}
                  >
                    <FichaDomino a={f[0]} b={f[1]} parada className="h-full w-full" />
                  </button>
                );
              })}
            </div>
            {/* el borde del atril */}
            <div className="mt-1.5 h-1.5 rounded-full bg-black/25" />
          </div>
          {elegida && puntas && (
            <div className="mt-2 flex flex-wrap items-center justify-center gap-2" style={{ animation: "mesa-aparece 180ms ease-out" }}>
              <span className="text-[12px] font-bold text-stone-600 dark:text-stone-300">Casa en las dos puntas: toca su sombra en la mesa, o</span>
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
      <style>{TECLAS_ANIMACION + DOMINO_ANIMACION}</style>
    </div>
  );
}

/**
 * La ficha nueva llega desde quien la jugó (las mías suben desde la mano; las de los demás bajan desde arriba) y se
 * asienta con un rebote corto; las puntas y las sombras laten. En SVG, 1px es una media ficha.
 */
const DOMINO_ANIMACION = `
.dom-llega-abajo, .dom-llega-arriba { transform-box: fill-box; transform-origin: center; }
.dom-llega-abajo { animation: dom-llega-abajo 480ms cubic-bezier(.25,1.25,.5,1); }
.dom-llega-arriba { animation: dom-llega-arriba 480ms cubic-bezier(.25,1.25,.5,1); }
@keyframes dom-llega-abajo { 0% { transform: translate(0px, 5px) scale(.82) rotate(-8deg); opacity: 0 } 60% { transform: translate(0px, -0.12px) scale(1.05); opacity: 1 } 100% { transform: none } }
@keyframes dom-llega-arriba { 0% { transform: translate(0px, -5px) scale(.82) rotate(8deg); opacity: 0 } 60% { transform: translate(0px, 0.12px) scale(1.05); opacity: 1 } 100% { transform: none } }
.dom-late { animation: dom-late 1.15s ease-in-out infinite; }
@keyframes dom-late { 0%, 100% { opacity: .35 } 50% { opacity: 1 } }
@media (prefers-reduced-motion: reduce) { .dom-llega-abajo, .dom-llega-arriba, .dom-late { animation: none !important } }
`;
