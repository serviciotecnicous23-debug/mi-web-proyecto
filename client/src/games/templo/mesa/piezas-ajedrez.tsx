/**
 * Las piezas del ajedrez, dibujadas para el juego (de marfil y de ébano), con la silueta clásica de las piezas de
 * torneo: la base de dos escalones, el cuello con su anillo y la cabeza de cada una. Se ven torneadas: el degradado da la
 * luz arriba a la izquierda y un brillo fino recorre el lado iluminado. Llenan casi toda la casilla.
 * El rey lleva una corona de arcos con una perla arriba: nada con forma de cruz. El alfil tiene su mitra con un solo
 * corte en diagonal.
 */
import type { ReactElement } from "react";

type Tinta = { relleno: string; trazo: string; detalle: string; brillo: string };
const MARFIL: Tinta = { relleno: "url(#aj-marfil)", trazo: "#4a3826", detalle: "#b39670", brillo: "#ffffff" };
const EBANO: Tinta = { relleno: "url(#aj-ebano)", trazo: "#070403", detalle: "#8a6c50", brillo: "#d9c3a3" };

/** Los degradados del marfil y del ébano (los mismos en cada pieza; el navegador usa el primero que encuentra). */
function Degradados() {
  return (
    <defs>
      <linearGradient id="aj-marfil" x1="0.1" y1="0" x2="0.9" y2="1">
        <stop offset="0" stopColor="#fffef9" />
        <stop offset="0.5" stopColor="#f4ead6" />
        <stop offset="1" stopColor="#cdb48b" />
      </linearGradient>
      <linearGradient id="aj-ebano" x1="0.1" y1="0" x2="0.9" y2="1">
        <stop offset="0" stopColor="#6e5847" />
        <stop offset="0.45" stopColor="#30241b" />
        <stop offset="1" stopColor="#0f0a07" />
      </linearGradient>
    </defs>
  );
}

const T = 2.3; // el grueso del contorno

/** La base de dos escalones, común a todas, con su brillo. */
function Base({ c }: { c: Tinta }) {
  return (
    <>
      <path d="M17 94 C17 89 21 86.5 26 86.5 L74 86.5 C79 86.5 83 89 83 94 Z" fill={c.relleno} stroke={c.trazo} strokeWidth={T} strokeLinejoin="round" />
      <path d="M25 87 C25 83 27.5 80.5 31 80.5 L69 80.5 C72.5 80.5 75 83 75 87 Z" fill={c.relleno} stroke={c.trazo} strokeWidth={T} strokeLinejoin="round" />
      <path d="M23 90.5 L46 90.5 M30 84 L44 84" stroke={c.brillo} strokeWidth={1.6} strokeLinecap="round" opacity={0.55} />
    </>
  );
}

/** Un anillo (el collarín bajo la cabeza). */
function Anillo({ c, y, rx }: { c: Tinta; y: number; rx: number }) {
  return (
    <>
      <ellipse cx={50} cy={y} rx={rx} ry={3.6} fill={c.relleno} stroke={c.trazo} strokeWidth={T} />
      <path d={`M${50 - rx + 3} ${y - 0.8} L${50 - rx * 0.2} ${y - 1.6}`} stroke={c.brillo} strokeWidth={1.4} strokeLinecap="round" opacity={0.6} />
    </>
  );
}

const FORMAS: Record<number, (c: Tinta) => ReactElement> = {
  // peón: cuerpo que se abre hacia la base, el anillo y la cabeza redonda
  1: (c) => (
    <>
      <path d="M33 81 C35.5 69 42 57 44.5 48 L55.5 48 C58 57 64.5 69 67 81 Z" fill={c.relleno} stroke={c.trazo} strokeWidth={T} strokeLinejoin="round" />
      <path d="M43 52 C41 62 37.5 70 36 78" stroke={c.brillo} strokeWidth={1.8} strokeLinecap="round" fill="none" opacity={0.6} />
      <Anillo c={c} y={47} rx={14.5} />
      <circle cx={50} cy={30} r={13.5} fill={c.relleno} stroke={c.trazo} strokeWidth={T} />
      <path d="M42.5 25 A9 9 0 0 1 49 20.5" stroke={c.brillo} strokeWidth={2} strokeLinecap="round" fill="none" opacity={0.75} />
      <Base c={c} />
    </>
  ),
  // caballo: la cabeza mirando a la izquierda, con la crin, la oreja, el ojo y la nariz
  2: (c) => (
    <>
      <path
        d="M29 81 C28.5 70 33 61 41 54.5 C36 53.5 30 54 26 51.5 C20.5 48 20.5 40.5 25.5 36.5 L37.5 26.5 C39 19.5 43.5 13.5 49.5 13 L52 7.5 L55.5 14 C68 18.5 77.5 33 76.5 53 C76 64 73.5 73 72 81 Z"
        fill={c.relleno}
        stroke={c.trazo}
        strokeWidth={T}
        strokeLinejoin="round"
      />
      {/* la crin, en mechones a lo largo del cuello */}
      <path d="M56.5 17 C64 22 69.5 30 71 40 M60 27 C64.5 33 66.5 40 66.5 48 M63.5 42 C65 50 64.5 58 62 66" stroke={c.detalle} strokeWidth={2.2} strokeLinecap="round" fill="none" />
      {/* la quijada y la boca */}
      <path d="M26.5 45.5 C30 46.5 34 46.5 37 45" stroke={c.trazo} strokeWidth={1.8} strokeLinecap="round" fill="none" opacity={0.8} />
      <circle cx={46} cy={28.5} r={3} fill={c.trazo} />
      <circle cx={45.2} cy={27.6} r={0.9} fill={c.brillo} opacity={0.8} />
      <path d="M27.5 40 L30.5 39.2" stroke={c.trazo} strokeWidth={2.2} strokeLinecap="round" />
      {/* el brillo del lado iluminado */}
      <path d="M38 33 C42 23 46 18 50 16.5 M36 60 C33 66 32 72 32 78" stroke={c.brillo} strokeWidth={1.8} strokeLinecap="round" fill="none" opacity={0.6} />
      <Base c={c} />
    </>
  ),
  // alfil: la mitra con su corte en diagonal y la bolita arriba, el anillo y el cuerpo
  3: (c) => (
    <>
      <path d="M38 81 C40.5 72 43 66 44.5 61 L55.5 61 C57 66 59.5 72 62 81 Z" fill={c.relleno} stroke={c.trazo} strokeWidth={T} strokeLinejoin="round" />
      <Anillo c={c} y={60} rx={13} />
      <path d="M50 15 C38 25.5 32 37.5 34 48 C36 55.5 42.5 59 50 59 C57.5 59 64 55.5 66 48 C68 37.5 62 25.5 50 15 Z" fill={c.relleno} stroke={c.trazo} strokeWidth={T} strokeLinejoin="round" />
      <path d="M43.5 43 L57.5 29" stroke={c.trazo} strokeWidth={T} strokeLinecap="round" />
      <circle cx={50} cy={11.5} r={5} fill={c.relleno} stroke={c.trazo} strokeWidth={T} />
      <path d="M40 41 C40 33 44 26 48.5 21.5 M42 64 C41 70 39.5 75 39 78" stroke={c.brillo} strokeWidth={1.8} strokeLinecap="round" fill="none" opacity={0.6} />
      <Base c={c} />
    </>
  ),
  // torre: el cuerpo, el anillo y las almenas
  4: (c) => (
    <>
      <path d="M31 81 L34.5 45 L65.5 45 L69 81 Z" fill={c.relleno} stroke={c.trazo} strokeWidth={T} strokeLinejoin="round" />
      <rect x={28.5} y={39} width={43} height={7.5} rx={2.5} fill={c.relleno} stroke={c.trazo} strokeWidth={T} />
      <path d="M26 40 L26 16 L37 16 L37 23.5 L44.5 23.5 L44.5 16 L55.5 16 L55.5 23.5 L63 23.5 L63 16 L74 16 L74 40 Z" fill={c.relleno} stroke={c.trazo} strokeWidth={T} strokeLinejoin="round" />
      <path d="M37 56 L63 56 M36.5 68 L63.5 68" stroke={c.detalle} strokeWidth={2} strokeLinecap="round" />
      <path d="M30 37 L30 20 M38 50 L36.5 77" stroke={c.brillo} strokeWidth={1.8} strokeLinecap="round" opacity={0.6} />
      <Base c={c} />
    </>
  ),
  // dama: la corona de cinco puntas con sus perlas, la cintura y los anillos
  5: (c) => (
    <>
      <path d="M27 80 C29 70 32 63 34 56 L66 56 C68 63 71 70 73 80 Z" fill={c.relleno} stroke={c.trazo} strokeWidth={T} strokeLinejoin="round" />
      <Anillo c={c} y={56} rx={17} />
      <path d="M31 53 L22 28 L35 44 L38 20 L45.5 42 L50 15 L54.5 42 L62 20 L65 44 L78 28 L69 53 Z" fill={c.relleno} stroke={c.trazo} strokeWidth={T} strokeLinejoin="round" />
      {[
        [22, 26],
        [38, 18],
        [50, 12.5],
        [62, 18],
        [78, 26],
      ].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r={4.4} fill={c.relleno} stroke={c.trazo} strokeWidth={2} />
      ))}
      <path d="M30 70 L70 70" stroke={c.detalle} strokeWidth={2} strokeLinecap="round" />
      <path d="M28 33 L33 48 M35 60 C33.5 66 32 71 31 77" stroke={c.brillo} strokeWidth={1.8} strokeLinecap="round" fill="none" opacity={0.6} />
      <Base c={c} />
    </>
  ),
  // rey: el cuerpo alto, la corona de arcos y una perla arriba (sin cruz)
  6: (c) => (
    <>
      <path d="M28 80 C30 70 32.5 62 34.5 55 L65.5 55 C67.5 62 70 70 72 80 Z" fill={c.relleno} stroke={c.trazo} strokeWidth={T} strokeLinejoin="round" />
      <Anillo c={c} y={55} rx={17.5} />
      <path
        d="M31 52 C28.5 43 27 35 28.5 28 C34 34 41 35 45 29 C47 25.5 48 23.5 50 23.5 C52 23.5 53 25.5 55 29 C59 35 66 34 71.5 28 C73 35 71.5 43 69 52 Z"
        fill={c.relleno}
        stroke={c.trazo}
        strokeWidth={T}
        strokeLinejoin="round"
      />
      <rect x={46.5} y={14.5} width={7} height={10} rx={2.5} fill={c.relleno} stroke={c.trazo} strokeWidth={2} />
      <circle cx={50} cy={10.5} r={6} fill={c.relleno} stroke={c.trazo} strokeWidth={T} />
      <path d="M31 47 L69 47" stroke={c.detalle} strokeWidth={2} strokeLinecap="round" />
      <circle cx={50} cy={39} r={3.2} fill={c.detalle} />
      <path d="M31.5 33 C31 38 31.5 43 32.5 46 M36 59 C34.5 65 33 70.5 32 77 M46.5 7.5 A4.5 4.5 0 0 1 49.5 5.5" stroke={c.brillo} strokeWidth={1.8} strokeLinecap="round" fill="none" opacity={0.6} />
      <Base c={c} />
    </>
  ),
};

export const NOMBRE_PIEZA: Record<number, string> = { 1: "peón", 2: "caballo", 3: "alfil", 4: "torre", 5: "dama", 6: "rey" };

/** Una pieza: `v` positivo, de marfil (blancas); negativo, de ébano (negras). Llena casi toda su caja. */
export function PiezaAjedrez({ v, className = "" }: { v: number; className?: string }) {
  const forma = FORMAS[Math.abs(v)];
  if (!forma) return null;
  return (
    <svg viewBox="9 3 82 93" className={className} aria-hidden="true" style={{ filter: "drop-shadow(0 2.5px 1.6px rgba(0,0,0,.42))", overflow: "visible" }}>
      <Degradados />
      {forma(v > 0 ? MARFIL : EBANO)}
    </svg>
  );
}
