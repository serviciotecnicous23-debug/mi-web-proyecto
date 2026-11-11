/**
 * La medalla de un logro: bronce, plata u oro con su cinta y su brillo; sin ganar, de piedra y con un anillo que
 * muestra cuánto falta para la siguiente. El dibujo del logro (su emoji) va en el centro.
 */
import { useId } from "react";

const METALES = [
  ["#f5f5f4", "#d6d3d1", "#a8a29e"], // sin ganar
  ["#ffd9b0", "#cd7f32", "#6e3a16"], // bronce
  ["#ffffff", "#c9ced6", "#6b7280"], // plata
  ["#fff3c4", "#e9b949", "#8a5a0c"], // oro
] as const;

export function Medalla({ icono, metal, progreso = 0, size = 44, titulo }: { icono: string; metal: 0 | 1 | 2 | 3; progreso?: number; size?: number; titulo?: string }) {
  const u = useId().replace(/[^a-zA-Z0-9]/g, "");
  const [c0, c1, c2] = METALES[metal];
  const p = Math.max(0, Math.min(1, progreso));
  const largo = 2 * Math.PI * 20.6;
  return (
    <span className="relative inline-flex shrink-0 items-center justify-center" style={{ width: size, height: size }} title={titulo}>
      <svg viewBox="0 0 44 44" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id={`md${u}m`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={c0} />
            <stop offset=".5" stopColor={c1} />
            <stop offset="1" stopColor={c2} />
          </linearGradient>
          <radialGradient id={`md${u}c`} cx=".4" cy=".3" r=".8">
            <stop offset="0" stopColor={metal ? "#fffdf5" : "#fafaf9"} />
            <stop offset="1" stopColor={metal ? c0 : "#e7e5e4"} />
          </radialGradient>
        </defs>
        {metal > 0 && (
          <g>
            <polygon points="14,30 19,30 17,43 13.5,39.5 10,41" fill="#b3242f" />
            <polygon points="25,30 30,30 34,41 30.5,39.5 27,43" fill="#2a4fbf" />
          </g>
        )}
        {metal < 3 && p > 0 && (
          <>
            <circle cx="22" cy="21" r="20.6" fill="none" stroke="currentColor" strokeOpacity=".15" strokeWidth="2" className="text-stone-500" />
            <circle
              cx="22"
              cy="21"
              r="20.6"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={`${(largo * p).toFixed(2)} ${largo.toFixed(2)}`}
              transform="rotate(-90 22 21)"
            />
          </>
        )}
        <circle cx="22" cy="21" r="17.4" fill={`url(#md${u}m)`} />
        <circle cx="22" cy="21" r="13.6" fill={`url(#md${u}c)`} />
        <circle cx="22" cy="21" r="13.6" fill="none" stroke={c2} strokeOpacity=".45" strokeWidth=".6" />
        <path d="M8.6 15.5 A14.5 14.5 0 0 1 16.5 7.6" stroke="#fff" strokeWidth="1.1" fill="none" opacity={metal ? 0.7 : 0.5} strokeLinecap="round" />
      </svg>
      <span className={`relative -mt-[6%] leading-none ${metal ? "" : "opacity-55 grayscale"}`} style={{ fontSize: size * 0.4 }}>
        {icono}
      </span>
    </span>
  );
}
