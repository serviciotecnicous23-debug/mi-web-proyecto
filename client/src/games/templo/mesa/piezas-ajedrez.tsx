/**
 * Las piezas del ajedrez, dibujadas para el juego (de marfil y de ébano). El rey lleva una corona con una perla arriba:
 * nada con forma de cruz. El alfil tiene su mitra con un solo corte en diagonal.
 */
import type { ReactElement } from "react";

const MARFIL = { relleno: "#fbf5e9", trazo: "#3b2a1a", detalle: "#c9b08a" };
const EBANO = { relleno: "#2d2119", trazo: "#f1e4c8", detalle: "#8a6a48" };

function Base({ c }: { c: typeof MARFIL }) {
  return (
    <>
      <rect x="22" y="84" width="56" height="9" rx="4" fill={c.relleno} stroke={c.trazo} strokeWidth="3" />
      <rect x="29" y="76" width="42" height="9" rx="3" fill={c.relleno} stroke={c.trazo} strokeWidth="3" />
    </>
  );
}

const FORMAS: Record<number, (c: typeof MARFIL) => ReactElement> = {
  // peón
  1: (c) => (
    <>
      <path d="M37 77 C39 64 43 54 45 47 L55 47 C57 54 61 64 63 77 Z" fill={c.relleno} stroke={c.trazo} strokeWidth="3" strokeLinejoin="round" />
      <ellipse cx="50" cy="46" rx="12" ry="4.5" fill={c.relleno} stroke={c.trazo} strokeWidth="3" />
      <circle cx="50" cy="31" r="12" fill={c.relleno} stroke={c.trazo} strokeWidth="3" />
      <Base c={c} />
    </>
  ),
  // caballo
  2: (c) => (
    <>
      <path
        d="M31 77 C31 63 38 55 45 49 C40 48 34 48 30 46 C26 44 26 38 30 35 L44 24 C46 17 52 13 57 17 C70 22 77 38 75 56 C74 66 71 72 70 77 Z"
        fill={c.relleno}
        stroke={c.trazo}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M58 20 C66 28 70 40 69 54" fill="none" stroke={c.detalle} strokeWidth="3" strokeLinecap="round" />
      <circle cx="49" cy="30" r="2.8" fill={c.trazo} />
      <path d="M33 41 L37 40" stroke={c.trazo} strokeWidth="2.5" strokeLinecap="round" />
      <Base c={c} />
    </>
  ),
  // alfil
  3: (c) => (
    <>
      <path d="M41 77 C43 69 45 64 46 60 L54 60 C55 64 57 69 59 77 Z" fill={c.relleno} stroke={c.trazo} strokeWidth="3" strokeLinejoin="round" />
      <path d="M50 17 C40 27 34 38 36 48 C38 56 44 61 50 61 C56 61 62 56 64 48 C66 38 60 27 50 17 Z" fill={c.relleno} stroke={c.trazo} strokeWidth="3" strokeLinejoin="round" />
      <path d="M44 43 L57 30" stroke={c.trazo} strokeWidth="3" strokeLinecap="round" />
      <circle cx="50" cy="13" r="5" fill={c.relleno} stroke={c.trazo} strokeWidth="3" />
      <Base c={c} />
    </>
  ),
  // torre
  4: (c) => (
    <>
      <path d="M33 77 L36 41 L64 41 L67 77 Z" fill={c.relleno} stroke={c.trazo} strokeWidth="3" strokeLinejoin="round" />
      <path d="M29 42 L29 21 L38 21 L38 28 L45 28 L45 21 L55 21 L55 28 L62 28 L62 21 L71 21 L71 42 Z" fill={c.relleno} stroke={c.trazo} strokeWidth="3" strokeLinejoin="round" />
      <path d="M38 52 L62 52 M39 64 L61 64" stroke={c.detalle} strokeWidth="2.5" strokeLinecap="round" />
      <Base c={c} />
    </>
  ),
  // dama: corona de cinco puntas con perlas
  5: (c) => (
    <>
      <path d="M28 76 L24 31 L34 50 L38 24 L45 48 L50 19 L55 48 L62 24 L66 50 L76 31 L72 76 Z" fill={c.relleno} stroke={c.trazo} strokeWidth="3" strokeLinejoin="round" />
      {[
        [24, 29],
        [38, 22],
        [50, 16],
        [62, 22],
        [76, 29],
      ].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="4.5" fill={c.relleno} stroke={c.trazo} strokeWidth="2.5" />
      ))}
      <path d="M31 64 L69 64" stroke={c.detalle} strokeWidth="2.5" strokeLinecap="round" />
      <Base c={c} />
    </>
  ),
  // rey: corona de arcos con una perla arriba (sin cruz)
  6: (c) => (
    <>
      <path
        d="M30 76 C28 62 26 50 28 39 C34 46 41 47 45 40 C47 35 48 32 50 32 C52 32 53 35 55 40 C59 47 66 46 72 39 C74 50 72 62 70 76 Z"
        fill={c.relleno}
        stroke={c.trazo}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <rect x="46.5" y="23" width="7" height="10" rx="2.5" fill={c.relleno} stroke={c.trazo} strokeWidth="2.5" />
      <circle cx="50" cy="17" r="7" fill={c.relleno} stroke={c.trazo} strokeWidth="3" />
      <path d="M31 63 L69 63" stroke={c.detalle} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="50" cy="55" r="3.5" fill={c.detalle} />
      <Base c={c} />
    </>
  ),
};

export const NOMBRE_PIEZA: Record<number, string> = { 1: "peón", 2: "caballo", 3: "alfil", 4: "torre", 5: "dama", 6: "rey" };

/** Una pieza: `v` positivo, de marfil (blancas); negativo, de ébano (negras). */
export function PiezaAjedrez({ v, className = "" }: { v: number; className?: string }) {
  const forma = FORMAS[Math.abs(v)];
  if (!forma) return null;
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" style={{ filter: "drop-shadow(0 2px 1.5px rgba(0,0,0,.35))" }}>
      {forma(v > 0 ? MARFIL : EBANO)}
    </svg>
  );
}
