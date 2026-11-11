/**
 * Retratos dibujados (SVG) para los diálogos y la ceremonia de cada rango.
 */
import type { ReactElement } from "react";
type Who = "azarias" | "ezequias" | "narrador" | "conanias" | "isaias" | "miqueas" | "eliaquim" | "eleazar" | "etan" | "husai" | "rank0" | "rank1" | "rank2" | "rank3" | "rank4" | "lino";

const STONES = ["#b3242f", "#c9c24a", "#2e8b57", "#1f9e6e", "#2a4fbf", "#e8f4ff", "#e07a2a", "#8c8c8c", "#7d3c98", "#e6c84a", "#1d1a17", "#4f7a37"];

function Face({ skin, beard, brows = "#3b2a1e" }: { skin: string; beard?: string; brows?: string }) {
  return (
    <>
      <circle cx="32" cy="28" r="11.5" fill={skin} />
      <circle cx="20.6" cy="28.5" r="2.2" fill={skin} />
      <circle cx="43.4" cy="28.5" r="2.2" fill={skin} />
      {beard && <path d="M20.8 28.5 C21.5 44 42.5 44 43.2 28.5 C40 35.5 24 35.5 20.8 28.5Z" fill={beard} />}
      <ellipse cx="27.6" cy="27.2" rx="1.5" ry="1.8" fill="#1d1a17" />
      <ellipse cx="36.4" cy="27.2" rx="1.5" ry="1.8" fill="#1d1a17" />
      <circle cx="27.1" cy="26.6" r="0.5" fill="#fff" />
      <circle cx="35.9" cy="26.6" r="0.5" fill="#fff" />
      <path d="M25.6 23.6 l3.6 -0.6 M34.8 23 l3.6 0.6" stroke={brows} strokeWidth="1.2" strokeLinecap="round" />
      <ellipse cx="24.8" cy="31" rx="2" ry="1.2" fill="#e3907a" opacity="0.55" />
      <ellipse cx="39.2" cy="31" rx="2" ry="1.2" fill="#e3907a" opacity="0.55" />
      {!beard && <path d="M29.6 33 q2.4 1.8 4.8 0" stroke="#7a3b2a" strokeWidth="1" fill="none" strokeLinecap="round" />}
    </>
  );
}

function HighPriest({ old }: { old: boolean }) {
  return (
    <>
      <path d="M9 64 C11 47 20 41 32 41 C44 41 53 47 55 64Z" fill="#27468f" />
      {/* efod */}
      <path d="M18 64 L19 46 C24 43 40 43 45 46 L46 64Z" fill="#e2b33c" />
      <path d="M19 52 H45 M19 56 H45" stroke="#5b2a6e" strokeWidth="1.4" />
      <path d="M19 54 H45" stroke="#b3242f" strokeWidth="1.2" />
      {/* hombreras con ónice */}
      <circle cx="22" cy="44.5" r="2.2" fill="#17463a" stroke="#e2b33c" strokeWidth="1" />
      <circle cx="42" cy="44.5" r="2.2" fill="#17463a" stroke="#e2b33c" strokeWidth="1" />
      {/* pectoral con doce piedras */}
      <rect x="25" y="45.5" width="14" height="15" rx="1.5" fill="#f2c24c" stroke="#b88a1e" strokeWidth="0.8" />
      {STONES.map((c, i) => (
        <rect key={i} x={26.6 + (i % 3) * 4} y={47 + Math.floor(i / 3) * 3.4} width="2.8" height="2.4" rx="0.5" fill={c} />
      ))}
      <Face skin={old ? "#c48a5e" : "#d39a6c"} beard={old ? "#ece8e0" : undefined} brows={old ? "#f2efe8" : "#3b2a1e"} />
      {/* mitra con la lámina de oro */}
      <path d="M19.5 22 C19 9 45 9 44.5 22 Z" fill="#fbf8ef" />
      <path d="M20 18.5 H44 M20.5 15 H43.5" stroke="#e7e0cf" strokeWidth="1.2" />
      <rect x="26.5" y="19" width="11" height="3.2" rx="0.6" fill="#e2b33c" />
      <path d="M19.6 20.6 H26.5 M37.5 20.6 H44.4" stroke="#27468f" strokeWidth="0.9" />
      {/* campanillas y granadas */}
      {[14, 22, 30, 38, 46].map((x, i) => (
        <circle key={x} cx={x + 2} cy="62.5" r="1.4" fill={i % 2 ? "#b3242f" : "#f2c24c"} />
      ))}
    </>
  );
}

export function Portrait({ who, size = 64 }: { who: Who; size?: number }) {
  let body: ReactElement;
  let bg = "#f3e3bf";
  switch (who) {
    case "azarias":
      body = <HighPriest old />;
      break;
    case "rank4":
      body = <HighPriest old={false} />;
      bg = "#f7e7b4";
      break;
    case "ezequias":
      bg = "#ead6f0";
      body = (
        <>
          <path d="M9 64 C11 47 20 41 32 41 C44 41 53 47 55 64Z" fill="#5b2a6e" />
          <path d="M14 64 C16 50 22 44 32 44 C42 44 48 50 50 64" fill="none" stroke="#b3242f" strokeWidth="5" />
          <path d="M14 64 C16 50 22 44 32 44 C42 44 48 50 50 64" fill="none" stroke="#e2b33c" strokeWidth="1" />
          <Face skin="#bf8457" beard="#2b1d14" />
          <path d="M21 19 C21 13 43 13 43 19" fill="#2b1d14" />
          <path d="M20.5 19.5 L22 11 L26 16 L32 9.5 L38 16 L42 11 L43.5 19.5 Z" fill="#e2b33c" stroke="#b88a1e" strokeWidth="0.8" />
          <circle cx="32" cy="16" r="1.4" fill="#b3242f" />
        </>
      );
      break;
    case "conanias":
      bg = "#dbe6f5";
      body = (
        <>
          <path d="M9 64 C11 47 20 41 32 41 C44 41 53 47 55 64Z" fill="#efe6d2" />
          <path d="M14 55 H50" stroke="#1e4d8c" strokeWidth="4" />
          <Face skin="#b97a4f" beard="#3b2a1e" />
          <path d="M20.5 24 C20 11 44 11 43.5 24 C40 19 24 19 20.5 24Z" fill="#3b2a1e" />
          <path d="M20.8 21.5 H43.2" stroke="#1e4d8c" strokeWidth="2.4" />
        </>
      );
      break;
    case "isaias":
      // el profeta: manto oscuro de pelo, barba canosa y un rollo en la mano
      bg = "#e3dcef";
      body = (
        <>
          <path d="M9 64 C11 47 20 41 32 41 C44 41 53 47 55 64Z" fill="#4a3b6a" />
          <path d="M20 64 C21 52 25 46 32 45 C39 46 43 52 44 64" fill="#6b5a3e" />
          <Face skin="#c48a5e" beard="#ece8e0" brows="#f2efe8" />
          <path d="M20 22 C20 11 44 11 44 22 C40 16 24 16 20 22Z" fill="#ece8e0" />
          <rect x="45" y="50" width="12" height="5" rx="2.5" fill="#efe1bd" stroke="#b88a1e" strokeWidth="0.7" />
        </>
      );
      break;
    case "miqueas":
      // Miqueas de Moreset: un campesino profeta, más joven, barba castaña, manto verde oliva y una espiga
      bg = "#e4ead8";
      body = (
        <>
          <path d="M9 64 C11 47 20 41 32 41 C44 41 53 47 55 64Z" fill="#5f6f3a" />
          <path d="M20 64 C21 52 25 46 32 45 C39 46 43 52 44 64" fill="#c9b48a" />
          <Face skin="#c08458" beard="#6b4a2c" brows="#4a3220" />
          <path d="M20 22 C20 12 44 12 44 22 C40 17 24 17 20 22Z" fill="#4a3220" />
          <path d="M47 62 L50 44" stroke="#b88a1e" strokeWidth="1.4" strokeLinecap="round" />
          <ellipse cx="50.5" cy="42" rx="2.2" ry="4.5" fill="#d9b44a" />
        </>
      );
      break;
    case "eleazar":
      // el anciano sacerdote: túnica y tiara de lino, el cinto de colores (Éxodo 39:29) y una lamparilla de aceite
      bg = "#f1ead8";
      body = (
        <>
          <path d="M9 64 C11 47 20 41 32 41 C44 41 53 47 55 64Z" fill="#efe6d2" />
          <path d="M14 55.6 H50" stroke="#2a4fbf" strokeWidth="2" />
          <path d="M14 58 H50" stroke="#7d3c98" strokeWidth="1.5" />
          <path d="M14 60 H50" stroke="#b3242f" strokeWidth="1.5" />
          <Face skin="#c48a5e" beard="#ece8e0" brows="#f2efe8" />
          <path d="M20 22.5 C19.5 10.5 44.5 10.5 44 22.5 C40 18.5 24 18.5 20 22.5Z" fill="#f7f2e6" stroke="#d9cfb8" strokeWidth="0.6" />
          <path d="M20.6 20.2 C26 18.4 38 18.4 43.4 20.2" stroke="#d9cfb8" strokeWidth="0.8" fill="none" />
          <ellipse cx="50.5" cy="52.5" rx="5" ry="2.2" fill="#b0643a" />
          <path d="M55 51.6 q2.2 -0.6 2.6 -2" stroke="#b0643a" strokeWidth="1.4" fill="none" strokeLinecap="round" />
          <path d="M57.6 48.8 q-1.4 -2.6 0.2 -4.8 q1.6 2.2 -0.2 4.8Z" fill="#ffb347" />
        </>
      );
      break;
    case "etan":
      // Etán ezraíta, el sabio (1 Reyes 4:31) que presenta «¿Quién es sabio?»: manto azul noche con orla de oro,
      // turbante con banda dorada y un rollo en la mano
      bg = "#1c1640";
      body = (
        <>
          <path d="M9 64 C11 47 20 41 32 41 C44 41 53 47 55 64Z" fill="#1f2a5c" />
          <path d="M22 64 L25 45 M42 64 L39 45" stroke="#e9c46a" strokeWidth="1.6" />
          <path d="M25 45 C29 47.5 35 47.5 39 45" stroke="#e9c46a" strokeWidth="1.4" fill="none" />
          <Face skin="#c99068" beard="#2b1d14" />
          <path d="M19.5 21.5 C19 10 45 10 44.5 21.5 C40 16.5 24 16.5 19.5 21.5Z" fill="#f4efe0" />
          <path d="M19.8 19.6 C26 17.4 38 17.4 44.2 19.6" stroke="#e9c46a" strokeWidth="1.6" fill="none" />
          <circle cx="32" cy="17.6" r="1.3" fill="#7d3c98" stroke="#e9c46a" strokeWidth="0.5" />
          <rect x="45" y="49" width="12" height="5.5" rx="2.7" fill="#efe1bd" stroke="#b88a1e" strokeWidth="0.7" />
          <path d="M47 51.8 H55" stroke="#b88a1e" strokeWidth="0.6" />
        </>
      );
      break;
    case "husai":
      // Husai arquita, el amigo del rey David (2 Samuel 15:32-37): túnica parda y manto de viaje
      bg = "#e8ddc8";
      body = (
        <>
          <path d="M9 64 C11 47 20 41 32 41 C44 41 53 47 55 64Z" fill="#7a5a3a" />
          <path d="M14 64 C16 51 22 45 32 44 C42 45 48 51 50 64" fill="none" stroke="#a8844f" strokeWidth="4" />
          <Face skin="#b97a50" beard="#5a5048" brows="#4a4038" />
          <path d="M20.5 21.5 C20 12 44 12 43.5 21.5 C40 17.5 24 17.5 20.5 21.5Z" fill="#d9c9a8" />
        </>
      );
      break;
    case "eliaquim":
      // el mayordomo: túnica azul, faja y la llave sobre el hombro (Isaías 22:21-22)
      bg = "#dbe2f2";
      body = (
        <>
          <path d="M9 64 C11 47 20 41 32 41 C44 41 53 47 55 64Z" fill="#27468f" />
          <path d="M14 57 H50" stroke="#e2b33c" strokeWidth="2.4" />
          <Face skin="#bf8457" beard="#3b2a1e" />
          <path d="M20.5 22 C20 11 44 11 43.5 22 C40 17 24 17 20.5 22Z" fill="#efe6d2" />
          <path d="M42 46 L52 40" stroke="#b88a1e" strokeWidth="2" strokeLinecap="round" />
          <circle cx="53.5" cy="39" r="2.4" fill="none" stroke="#b88a1e" strokeWidth="1.6" />
          <path d="M44.5 45 l1.6 2.2 M46.8 43.6 l1.6 2.2" stroke="#b88a1e" strokeWidth="1.3" strokeLinecap="round" />
        </>
      );
      break;
    case "narrador":
      bg = "#efe2c4";
      body = (
        <>
          <rect x="14" y="16" width="36" height="34" rx="3" fill="#f7efd9" stroke="#b88a1e" strokeWidth="1.2" />
          <rect x="10" y="13" width="6" height="40" rx="3" fill="#8a5a32" />
          <rect x="48" y="13" width="6" height="40" rx="3" fill="#8a5a32" />
          {[22, 27, 32, 37, 42].map((y) => (
            <path key={y} d={`M19 ${y} H45`} stroke="#c9b48a" strokeWidth="1.4" strokeLinecap="round" />
          ))}
        </>
      );
      break;
    default: {
      // el aprendiz en cada rango
      const rank = who === "lino" ? -1 : Number(who.slice(4));
      const white = rank >= 1 || rank === -1;
      bg = rank === -1 ? "#f4f6fb" : "#f3e3bf";
      body = (
        <>
          <path d="M9 64 C11 47 20 41 32 41 C44 41 53 47 55 64Z" fill={white ? "#fbf8ef" : "#e2d3b4"} />
          {white && rank !== -1 ? (
            <>
              <path d="M13 56 H51" stroke="#27468f" strokeWidth="1.6" />
              <path d="M13 58 H51" stroke="#5b2a6e" strokeWidth="1.6" />
              <path d="M13 60 H51" stroke="#b3242f" strokeWidth="1.6" />
            </>
          ) : (
            <path d="M13 57 H51" stroke={rank === -1 ? "#e9e4d8" : "#8a6a42"} strokeWidth="2.2" />
          )}
          <Face skin="#d39a6c" />
          {white ? (
            <>
              <path d="M20 23 C19.5 11 44.5 11 44 23 Z" fill="#fbf8ef" />
              <path d="M20.3 19.5 H43.7 M21 16 H43" stroke="#e7e0cf" strokeWidth="1.1" />
            </>
          ) : (
            <path d="M20.5 25 C20 11 44 11 43.5 25 C40 19 24 19 20.5 25Z" fill="#3b2a1e" />
          )}
          {rank === 2 && <path d="M44 62 L56 44 M54 43 l4 -1 -1 4z" stroke="#c9d1dc" strokeWidth="2.2" fill="#dfe4ea" strokeLinecap="round" />}
          {(rank === 3 || rank === -1) && (
            <>
              <path d="M50 46 V54" stroke="#e2b33c" strokeWidth="0.8" />
              <path d="M45 54 h10 l-2 5 h-6z" fill="#e2b33c" />
            </>
          )}
        </>
      );
    }
  }
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true" className="shrink-0 rounded-full shadow-md ring-2 ring-amber-300/70">
      <clipPath id={`clip-${who}`}>
        <circle cx="32" cy="32" r="32" />
      </clipPath>
      <g clipPath={`url(#clip-${who})`}>
        <rect width="64" height="64" fill={bg} />
        {body}
      </g>
    </svg>
  );
}

/** Portada del juego (la sala de juegos y la pantalla de inicio). */
export function TemploCover({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 180" className={className} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="tc-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2b2a6e" />
          <stop offset="0.55" stopColor="#c96b4f" />
          <stop offset="1" stopColor="#f3c27a" />
        </linearGradient>
        <linearGradient id="tc-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff1a8" />
          <stop offset="1" stopColor="#e2b33c" />
        </linearGradient>
        <radialGradient id="tc-fire" cx="0.5" cy="0.9" r="0.7">
          <stop offset="0" stopColor="#fff1a8" />
          <stop offset="0.45" stopColor="#ff8a2a" />
          <stop offset="1" stopColor="#ff5a12" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="320" height="180" fill="url(#tc-sky)" />
      <circle cx="250" cy="52" r="16" fill="#ffe6a8" opacity="0.85" />
      {/* monte y muro */}
      <path d="M0 150 L320 150 L320 180 L0 180Z" fill="#c9b07a" />
      <path d="M0 132 H320 V150 H0Z" fill="#e3d5b6" />
      <path d="M0 132 H320" stroke="#8a5a32" strokeWidth="3" />
      {/* la casa */}
      <rect x="92" y="58" width="136" height="76" fill="#efe4c9" />
      <rect x="92" y="58" width="136" height="6" fill="#8a5a32" />
      <rect x="132" y="38" width="56" height="96" fill="#e3d5b6" />
      <rect x="128" y="34" width="64" height="7" fill="#e2b33c" />
      <rect x="150" y="84" width="20" height="50" rx="2" fill="url(#tc-gold)" />
      {/* Jaquín y Boaz */}
      {[138, 182].map((x) => (
        <g key={x}>
          <rect x={x - 4} y="66" width="8" height="68" fill="#b8763b" />
          <ellipse cx={x} cy="64" rx="8" ry="5" fill="#b8763b" />
          <circle cx={x - 4} cy="63" r="1.5" fill="#a3452e" />
          <circle cx={x + 4} cy="63" r="1.5" fill="#a3452e" />
        </g>
      ))}
      {/* altar con fuego */}
      <rect x="138" y="140" width="44" height="18" fill="#b8763b" />
      <rect x="136" y="137" width="48" height="4" fill="#7d4a22" />
      <ellipse cx="160" cy="128" rx="20" ry="18" fill="url(#tc-fire)" />
      <path d="M160 112 C163 120 170 124 168 132 C166 138 154 138 152 132 C150 125 157 121 160 112Z" fill="#ffd66b" />
      {/* luces de gozo */}
      {[[60, 90], [262, 104], [84, 118], [240, 128], [110, 30], [210, 26]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 2 ? 2.4 : 3.2} fill="#ffe6a8" opacity="0.9" />
      ))}
    </svg>
  );
}
