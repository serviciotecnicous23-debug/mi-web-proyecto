/**
 * Los dibujos propios de la lotería bíblica (y de la memoria): 55 figuras hechas aquí, en SVG, con un estilo común
 * (tinta café, colores cálidos, luz y sombra con degradados). Nunca los de la lotería comercial.
 *
 * Nada con forma de cruz: la estrella es de cinco puntas, el sol tiene muchos rayos, el águila sube con las alas en V,
 * la espada no aparece, la sandalia no lleva tiras cruzadas y la red se teje en escamas.
 *
 * `DefsFiguras` va una vez en la pantalla (los degradados que comparten todas) y `Figura` dibuja una por su id.
 */
import { memo } from "react";

const T = "#3a2616";
const SW = 2;

/** Los degradados que usan todas las figuras (una vez por pantalla). */
export function DefsFiguras() {
  return (
    <svg width="0" height="0" style={{ position: "absolute", width: 0, height: 0 }} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="mf-cielo" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a9dcf3" />
          <stop offset="1" stopColor="#fdf1d2" />
        </linearGradient>
        <linearGradient id="mf-noche" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1d2a5c" />
          <stop offset="1" stopColor="#4a4f8f" />
        </linearGradient>
        <linearGradient id="mf-oro" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff1a8" />
          <stop offset=".45" stopColor="#f1c232" />
          <stop offset="1" stopColor="#a36f0f" />
        </linearGradient>
        <linearGradient id="mf-madera" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d79b5c" />
          <stop offset="1" stopColor="#8a5428" />
        </linearGradient>
        <linearGradient id="mf-agua" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8fd3f0" />
          <stop offset="1" stopColor="#2a72b0" />
        </linearGradient>
        <radialGradient id="mf-fuego" cx=".5" cy=".75" r=".7">
          <stop offset="0" stopColor="#fff7c2" />
          <stop offset=".45" stopColor="#ffb52e" />
          <stop offset="1" stopColor="#e0471b" />
        </radialGradient>
        <linearGradient id="mf-hoja" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9bd970" />
          <stop offset="1" stopColor="#3c8a37" />
        </linearGradient>
        <linearGradient id="mf-piedra" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ebe4d3" />
          <stop offset="1" stopColor="#9d927d" />
        </linearGradient>
        <linearGradient id="mf-piel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6d2ab" />
          <stop offset="1" stopColor="#d9a174" />
        </linearGradient>
        <linearGradient id="mf-barro" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e8a26a" />
          <stop offset="1" stopColor="#a8572b" />
        </linearGradient>
        <linearGradient id="mf-arena" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3d99c" />
          <stop offset="1" stopColor="#d2a85e" />
        </linearGradient>
        <linearGradient id="mf-lana" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#dcd6c8" />
        </linearGradient>
        <linearGradient id="mf-rayas" x1="0" y1="0" x2="1" y2="0">
          {["#e5483a", "#f5d03a", "#3d8fd6", "#5cb85c", "#8a54b8", "#f39232", "#e5483a"].map((c, i, l) => (
            <stop key={i} offset={i / (l.length - 1)} stopColor={c} />
          ))}
        </linearGradient>
        <radialGradient id="mf-luz" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#fffbe0" stopOpacity="1" />
          <stop offset=".6" stopColor="#ffe9a0" stopOpacity=".55" />
          <stop offset="1" stopColor="#ffe9a0" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="mf-brillo" cx=".35" cy=".3" r=".6">
          <stop offset="0" stopColor="#fff" stopOpacity=".85" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        {[
          ["azul", "#5b8fd6", "#2d4f94"],
          ["roja", "#d9583e", "#93301f"],
          ["verde", "#6fae5a", "#36702f"],
          ["morada", "#9a6cc9", "#5b3a8c"],
          ["crema", "#f4e6c8", "#c9b28a"],
          ["cafe", "#a97448", "#6a4325"],
          ["gris", "#b6b2aa", "#77726a"],
        ].map(([n, a, b]) => (
          <linearGradient key={n} id={`mf-tela-${n}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={a} />
            <stop offset="1" stopColor={b} />
          </linearGradient>
        ))}
      </defs>
    </svg>
  );
}

// ---------------------------------------------------------------- piezas que se repiten
const tela = (n: "azul" | "roja" | "verde" | "morada" | "crema" | "cafe" | "gris") => `url(#mf-tela-${n})`;

/** Una persona de frente: túnica, brazos, cabeza con su pelo, barba o velo, y lo que lleve en las manos (children). */
function Persona({
  x = 50,
  ropa = tela("azul"),
  faja = "#c9a227",
  pelo = "#4a2e1a",
  barba,
  velo,
  tocado,
  corona,
  alto = 1,
  nino,
  children,
}: {
  x?: number;
  ropa?: string;
  faja?: string | null;
  pelo?: string;
  barba?: string;
  velo?: string;
  tocado?: string;
  corona?: boolean;
  alto?: number;
  nino?: boolean;
  children?: React.ReactNode;
}) {
  const s = nino ? 0.82 : alto;
  return (
    <g transform={`translate(${x} ${92}) scale(${s}) translate(${-50} ${-92})`}>
      {/* sombra en el suelo */}
      <ellipse cx="50" cy="92" rx="20" ry="3.2" fill="#000" opacity=".16" />
      {/* túnica */}
      <path d="M37 44 Q50 39 63 44 L69 90 Q50 94 31 90 Z" fill={ropa} stroke={T} strokeWidth={SW} strokeLinejoin="round" />
      {faja && <path d="M35.5 60 Q50 64 64.5 60 L65 65 Q50 69 35 65 Z" fill={faja} stroke={T} strokeWidth="1.2" />}
      {/* brazos */}
      <path d="M38 46 Q30 56 33 68" fill="none" stroke={ropa} strokeWidth="7" strokeLinecap="round" />
      <path d="M62 46 Q70 56 67 68" fill="none" stroke={ropa} strokeWidth="7" strokeLinecap="round" />
      <circle cx="33" cy="69" r="3.6" fill="url(#mf-piel)" stroke={T} strokeWidth="1.2" />
      <circle cx="67" cy="69" r="3.6" fill="url(#mf-piel)" stroke={T} strokeWidth="1.2" />
      {/* cuello y cabeza */}
      <rect x="46.5" y="37" width="7" height="6" fill="url(#mf-piel)" />
      {velo && <path d="M37 33 Q36 14 50 13 Q64 14 63 33 L66 50 Q50 46 34 50 Z" fill={velo} stroke={T} strokeWidth="1.6" strokeLinejoin="round" />}
      <circle cx="50" cy="28" r="10" fill="url(#mf-piel)" stroke={T} strokeWidth={SW} />
      {!velo && !tocado && <path d="M40 27 Q40 16 50 16 Q60 16 60 27 Q57 20 50 21 Q43 20 40 27 Z" fill={pelo} />}
      {tocado && (
        <>
          <path d="M38.5 30 Q37 15 50 15 Q63 15 61.5 30 L64 44 Q61 40 59 32 Q50 24 41 32 Q39 40 36 44 Z" fill={tocado} stroke={T} strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M39.5 22 Q50 18 60.5 22" fill="none" stroke="#7a4a22" strokeWidth="2.2" />
        </>
      )}
      {barba && <path d="M41.5 30 Q42 42 50 44 Q58 42 58.5 30 Q55 34 50 34 Q45 34 41.5 30 Z" fill={barba} stroke={T} strokeWidth="1.1" />}
      {/* ojos y sonrisa */}
      <circle cx="46.3" cy="27.5" r="1.1" fill={T} />
      <circle cx="53.7" cy="27.5" r="1.1" fill={T} />
      {!barba && <path d="M46.5 32 Q50 34.6 53.5 32" fill="none" stroke={T} strokeWidth="1.1" strokeLinecap="round" />}
      <circle cx="43.6" cy="31" r="1.8" fill="#f08c7a" opacity=".35" />
      <circle cx="56.4" cy="31" r="1.8" fill="#f08c7a" opacity=".35" />
      {corona && (
        <path d="M41 19 L43 10 L46.5 15 L50 8 L53.5 15 L57 10 L59 19 Z" fill="url(#mf-oro)" stroke={T} strokeWidth="1.3" strokeLinejoin="round" />
      )}
      {children}
    </g>
  );
}

const Suelo = ({ c = "url(#mf-arena)", y = 84 }: { c?: string; y?: number }) => <path d={`M0 ${y} Q50 ${y - 5} 100 ${y} V100 H0Z`} fill={c} />;
const Fondo = ({ c = "url(#mf-cielo)" }: { c?: string }) => <rect x="0" y="0" width="100" height="100" fill={c} />;
const Nube = ({ x, y, s = 1, c = "#fff" }: { x: number; y: number; s?: number; c?: string }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-14 4 Q-16 -4 -8 -5 Q-6 -12 2 -10 Q8 -15 13 -7 Q20 -6 18 2 Q18 6 12 6 H-10 Q-15 6 -14 4 Z" fill={c} stroke="#9bb6c9" strokeWidth="1" />
  </g>
);
/** Una estrella de cinco puntas. */
const Estrella5 = ({ x, y, r, c = "url(#mf-oro)", sw = 1.2 }: { x: number; y: number; r: number; c?: string; sw?: number }) => {
  const p = [...Array(10)].map((_, i) => {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rr = i % 2 ? r * 0.45 : r;
    return `${(x + rr * Math.cos(a)).toFixed(2)},${(y + rr * Math.sin(a)).toFixed(2)}`;
  });
  return <polygon points={p.join(" ")} fill={c} stroke={T} strokeWidth={sw} strokeLinejoin="round" />;
};
/** Una llamita. */
const Llama = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M0 -12 Q7 -4 5 2 Q3 7 0 7 Q-3 7 -5 2 Q-7 -4 0 -12 Z" fill="url(#mf-fuego)" stroke="#b8461c" strokeWidth=".9" />
    <path d="M0 -5 Q3 0 2 3 Q0 5 -2 3 Q-3 0 0 -5 Z" fill="#fff6c8" />
  </g>
);
const Ojo = ({ x, y, r = 1.6 }: { x: number; y: number; r?: number }) => (
  <g>
    <circle cx={x} cy={y} r={r} fill={T} />
    <circle cx={x + r * 0.35} cy={y - r * 0.35} r={r * 0.35} fill="#fff" />
  </g>
);
const Olas = ({ y, c = "#e6f6ff" }: { y: number; c?: string }) => <path d={`M0 ${y} Q12 ${y - 5} 25 ${y} T50 ${y} T75 ${y} T100 ${y}`} fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" opacity=".8" />;
const Hoja = ({ x, y, a = 0, s = 1 }: { x: number; y: number; a?: number; s?: number }) => (
  <path d="M0 0 Q6 -6 13 0 Q6 6 0 0 Z" transform={`translate(${x} ${y}) rotate(${a}) scale(${s})`} fill="url(#mf-hoja)" stroke="#2d5f2a" strokeWidth=".9" />
);

// ---------------------------------------------------------------- las figuras
const FIGURAS: Record<string, () => React.ReactNode> = {
  arca: () => (
    <>
      <Fondo />
      <Nube x={22} y={18} s={0.9} />
      <path d="M0 78 Q12 72 25 78 T50 78 T75 78 T100 78 V100 H0Z" fill="url(#mf-agua)" />
      <path d="M8 60 H92 L82 80 Q50 87 18 80 Z" fill="url(#mf-madera)" stroke={T} strokeWidth={SW} strokeLinejoin="round" />
      <path d="M12 66 H88 M15 72 H85" stroke="#6b4321" strokeWidth="1.4" />
      <rect x="26" y="42" width="44" height="18" fill="#dcaa6e" stroke={T} strokeWidth={SW} />
      <path d="M22 44 L48 30 L74 44 Z" fill="#a8642f" stroke={T} strokeWidth={SW} strokeLinejoin="round" />
      <rect x="42" y="47" width="12" height="9" rx="2" fill="#5a3a1c" />
      <path d="M72 44 L76 24 L80 24 L78 44" fill="#f2c14e" stroke={T} strokeWidth="1.5" strokeLinejoin="round" />
      <ellipse cx="80.5" cy="22" rx="5.5" ry="3.6" fill="#f2c14e" stroke={T} strokeWidth="1.5" />
      <circle cx="82.5" cy="21" r=".9" fill={T} />
      <circle cx="76" cy="32" r="1.3" fill="#b06a2a" />
      <circle cx="77.5" cy="38" r="1.1" fill="#b06a2a" />
      <Olas y={86} />
    </>
  ),
  paloma: () => (
    <>
      <Fondo />
      <circle cx="74" cy="24" r="12" fill="url(#mf-luz)" />
      <path d="M22 58 Q30 44 46 46 Q60 47 68 40 Q72 46 66 54 Q74 56 80 52 Q78 62 64 64 Q50 70 34 66 Q24 64 22 58 Z" fill="url(#mf-lana)" stroke={T} strokeWidth={SW} strokeLinejoin="round" />
      <path d="M44 48 Q44 26 28 18 Q30 34 36 48 Z" fill="#fff" stroke={T} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M50 48 Q58 28 72 22 Q68 38 58 50 Z" fill="#f3f0e8" stroke={T} strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="26" cy="56" r="6" fill="#fff" stroke={T} strokeWidth="1.6" />
      <Ojo x={24.5} y={55} r={1.2} />
      <path d="M20.5 57 L15 58.5 L20.5 60 Z" fill="#e5a04a" stroke={T} strokeWidth="1" />
      <path d="M15 59 Q8 64 6 72" fill="none" stroke="#5f7d2f" strokeWidth="1.6" />
      <Hoja x={9} y={63} a={110} s={0.7} />
      <Hoja x={7} y={69} a={70} s={0.7} />
    </>
  ),
  arcoiris: () => (
    <>
      <Fondo />
      {["#e5483a", "#f39232", "#f5d03a", "#5cb85c", "#3d8fd6", "#4a4fb0", "#8a54b8"].map((c, i) => (
        <path key={c} d={`M${10 + i * 4} 76 A${40 - i * 4} ${40 - i * 4} 0 0 1 ${90 - i * 4} 76`} fill="none" stroke={c} strokeWidth="4.2" />
      ))}
      <path d="M0 80 Q25 66 50 78 Q75 66 100 80 V100 H0Z" fill="url(#mf-hoja)" />
      <Nube x={18} y={72} s={1.1} />
      <Nube x={84} y={72} s={1.1} />
    </>
  ),
  escalera: () => (
    <>
      <Fondo />
      <circle cx="78" cy="14" r="20" fill="url(#mf-luz)" />
      {[...Array(7)].map((_, i) => (
        <path key={i} d={`M78 14 L${60 + i * 8} 0`} stroke="#fff3c4" strokeWidth="1.5" opacity=".7" />
      ))}
      <Nube x={80} y={22} s={1.2} />
      <path d="M22 88 L70 22" stroke="url(#mf-oro)" strokeWidth="5" strokeLinecap="round" />
      <path d="M36 92 L84 26" stroke="url(#mf-oro)" strokeWidth="5" strokeLinecap="round" />
      {[...Array(8)].map((_, i) => {
        const t = 0.08 + i * 0.12;
        const ax = 22 + (70 - 22) * t;
        const ay = 88 + (22 - 88) * t;
        return <path key={i} d={`M${ax} ${ay} L${ax + 14} ${ay + 4}`} stroke="#c48a1c" strokeWidth="3" strokeLinecap="round" />;
      })}
      <Suelo />
      <path d="M8 92 Q12 84 22 85 Q28 86 27 92 Z" fill="url(#mf-piedra)" stroke={T} strokeWidth="1.4" />
      <circle cx="58" cy="40" r="2.2" fill="#fff8d0" />
      <circle cx="48" cy="56" r="1.6" fill="#fff8d0" />
    </>
  ),
  tunica: () => (
    <>
      <Fondo />
      <Suelo />
      <Persona ropa="url(#mf-rayas)" faja={null} pelo="#5a3417" />
      <path d="M33 70 Q50 74 67 70" fill="none" stroke="#fff" strokeWidth="1.2" opacity=".6" />
      <path d="M32 80 Q50 84 68 80" fill="none" stroke="#fff" strokeWidth="1.2" opacity=".6" />
    </>
  ),
  zarza: () => (
    <>
      <Fondo />
      <Suelo />
      <circle cx="50" cy="52" r="34" fill="url(#mf-luz)" />
      <path d="M22 84 Q18 66 30 62 Q28 50 40 50 Q44 40 54 46 Q64 40 68 52 Q80 54 76 66 Q84 74 78 84 Z" fill="url(#mf-hoja)" stroke={T} strokeWidth={SW} strokeLinejoin="round" />
      <Llama x={36} y={50} s={1.5} />
      <Llama x={52} y={40} s={2} />
      <Llama x={66} y={52} s={1.5} />
      <Llama x={44} y={60} s={1.1} />
      <Llama x={60} y={64} s={1.1} />
      <path d="M8 90 Q14 82 22 86 Q26 92 16 93 Z" fill="url(#mf-piedra)" stroke={T} strokeWidth="1.2" />
      <path d="M80 90 Q88 82 94 88 Q96 94 84 94 Z" fill="url(#mf-piedra)" stroke={T} strokeWidth="1.2" />
    </>
  ),
  sandalia: () => (
    <>
      <Fondo c="url(#mf-arena)" />
      {[0, 1].map((k) => (
        <g key={k} transform={`translate(${k ? 54 : 18} ${k ? 14 : 20}) rotate(${k ? 8 : -8})`}>
          <ellipse cx="14" cy="64" rx="15" ry="4" fill="#000" opacity=".14" />
          <path d="M14 2 Q26 2 27 16 Q28 30 24 42 Q22 52 22 58 Q22 66 14 66 Q6 66 6 58 Q6 50 4 42 Q0 28 2 16 Q3 2 14 2 Z" fill="#8a5428" stroke={T} strokeWidth={SW} strokeLinejoin="round" />
          <path d="M14 6 Q23 6 23.5 17 Q24 29 20.5 41 Q19 50 19 57 Q19 62 14 62 Q9 62 9 57 Q9 49 7.5 41 Q4 29 4.5 17 Q5 6 14 6 Z" fill="#e2b07a" />
          <path d="M3 18 Q14 14 27 18" fill="none" stroke="#6a3a1c" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M5 34 Q14 31 25 34" fill="none" stroke="#6a3a1c" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M8 50 Q14 47 20 50" fill="none" stroke="#6a3a1c" strokeWidth="4" strokeLinecap="round" />
          <path d="M13 6 Q14 11 14 15" fill="none" stroke="#6a3a1c" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="14" cy="17" r="1.6" fill="url(#mf-oro)" stroke={T} strokeWidth=".6" />
        </g>
      ))}
    </>
  ),
  moises: () => (
    <>
      <Fondo />
      <path d="M0 40 Q10 30 18 40 L22 100 H0Z" fill="url(#mf-agua)" stroke="#2a72b0" strokeWidth="1" />
      <path d="M100 40 Q90 30 82 40 L78 100 H100Z" fill="url(#mf-agua)" stroke="#2a72b0" strokeWidth="1" />
      <path d="M4 50 Q10 46 16 50 M84 50 Q90 46 96 50 M4 64 Q10 60 18 64 M82 64 Q90 60 96 64" stroke="#e6f6ff" strokeWidth="1.5" fill="none" />
      <Suelo c="url(#mf-arena)" y={88} />
      <Persona ropa={tela("cafe")} barba="#eeeae0" tocado="#e9dcc0" faja="#7a4524">
        <path d="M70 72 L80 14" stroke="#7a4524" strokeWidth="3.4" strokeLinecap="round" />
        <path d="M67 69 Q72 60 76 50" stroke={tela("cafe")} strokeWidth="6" strokeLinecap="round" fill="none" />
      </Persona>
    </>
  ),
  rana: () => (
    <>
      <Fondo c="url(#mf-agua)" />
      <ellipse cx="50" cy="80" rx="38" ry="10" fill="#3c8a37" stroke={T} strokeWidth="1.6" />
      <path d="M22 76 Q16 60 30 56 Q32 40 50 40 Q68 40 70 56 Q84 60 78 76 Z" fill="url(#mf-hoja)" stroke={T} strokeWidth={SW} strokeLinejoin="round" />
      <circle cx="38" cy="42" r="8" fill="url(#mf-hoja)" stroke={T} strokeWidth={SW} />
      <circle cx="62" cy="42" r="8" fill="url(#mf-hoja)" stroke={T} strokeWidth={SW} />
      <circle cx="38" cy="42" r="4.5" fill="#fff" />
      <circle cx="62" cy="42" r="4.5" fill="#fff" />
      <Ojo x={39} y={43} r={2.4} />
      <Ojo x={61} y={43} r={2.4} />
      <path d="M38 60 Q50 68 62 60" fill="none" stroke={T} strokeWidth="1.8" strokeLinecap="round" />
      <ellipse cx="50" cy="70" rx="12" ry="5" fill="#d8f0b8" opacity=".8" />
      <path d="M24 76 Q18 82 12 80 M76 76 Q82 82 88 80" stroke={T} strokeWidth="2" fill="none" strokeLinecap="round" />
    </>
  ),
  mar: () => (
    <>
      <Fondo />
      <path d="M0 26 Q14 18 30 26 L36 100 H0Z" fill="url(#mf-agua)" stroke="#2a72b0" strokeWidth="1.2" />
      <path d="M100 26 Q86 18 70 26 L64 100 H100Z" fill="url(#mf-agua)" stroke="#2a72b0" strokeWidth="1.2" />
      <path d="M30 26 Q34 20 28 16 M70 26 Q66 20 72 16" stroke="#e6f6ff" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      {[38, 52, 66, 80].map((y) => (
        <path key={y} d={`M4 ${y} Q16 ${y - 5} 30 ${y} M70 ${y} Q84 ${y - 5} 96 ${y}`} stroke="#e6f6ff" strokeWidth="1.4" fill="none" opacity=".7" />
      ))}
      <path d="M36 100 L44 40 H56 L64 100 Z" fill="url(#mf-arena)" />
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${50 + (i - 1) * 4} ${52 + i * 14}) scale(${0.5 + i * 0.2})`}>
          <circle cx="0" cy="-8" r="3" fill="url(#mf-piel)" stroke={T} strokeWidth="1" />
          <path d="M-4 -5 L-5 6 H5 L4 -5 Z" fill={[tela("roja"), tela("verde"), tela("azul")][i]} stroke={T} strokeWidth="1" />
        </g>
      ))}
    </>
  ),
  nube: () => (
    <>
      <Fondo />
      <path d="M0 80 Q50 72 100 80 V100 H0Z" fill="url(#mf-arena)" />
      <path d="M36 92 Q34 60 40 30 Q44 14 50 8 Q56 14 60 30 Q66 60 64 92 Z" fill="#e9eef5" opacity=".7" />
      {[
        [50, 14, 9],
        [44, 24, 9],
        [56, 26, 9],
        [48, 36, 10],
        [42, 46, 9],
        [57, 44, 10],
        [50, 56, 11],
        [42, 66, 10],
        [58, 66, 10],
        [50, 76, 12],
        [40, 82, 9],
        [61, 82, 9],
      ].map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="#fbfcff" stroke="#a9b6c9" strokeWidth="1.3" />
      ))}
      {[
        [46, 20],
        [52, 40],
        [46, 62],
        [54, 72],
      ].map(([x, y], i) => (
        <path key={i} d={`M${x - 5} ${y} q5 -4 10 0`} stroke="#c9d3e2" strokeWidth="1.6" fill="none" />
      ))}
      {[14, 84].map((x) => (
        <g key={x}>
          <path d={`M${x - 11} 92 L${x} 74 L${x + 11} 92 Z`} fill={tela("crema")} stroke={T} strokeWidth="1.4" strokeLinejoin="round" />
          <path d={`M${x} 80 L${x - 3} 92 H${x + 3} Z`} fill="#6a4325" />
        </g>
      ))}
    </>
  ),
  tablas: () => (
    <>
      <Fondo />
      <circle cx="50" cy="40" r="36" fill="url(#mf-luz)" />
      {[0, 1].map((k) => (
        <g key={k} transform={`translate(${k ? 52 : 18} 18) rotate(${k ? 4 : -4})`}>
          <path d="M0 64 V16 Q0 0 15 0 Q30 0 30 16 V64 Z" fill="url(#mf-piedra)" stroke={T} strokeWidth={SW} />
          {[16, 24, 32, 40, 48, 56].map((y) => (
            <path key={y} d={`M6 ${y} H24`} stroke="#7d7363" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 2.4" />
          ))}
        </g>
      ))}
    </>
  ),
  monte: () => (
    <>
      <Fondo />
      <path d="M50 10 Q38 18 46 24 Q34 26 40 34" fill="none" stroke="#8b8a95" strokeWidth="6" strokeLinecap="round" opacity=".7" />
      <path d="M58 8 Q70 14 60 22 Q72 26 62 32" fill="none" stroke="#a3a2ad" strokeWidth="5" strokeLinecap="round" opacity=".6" />
      <path d="M2 92 L38 36 Q50 26 62 36 L98 92 Z" fill="url(#mf-piedra)" stroke={T} strokeWidth={SW} strokeLinejoin="round" />
      <path d="M38 36 Q50 26 62 36 L56 46 Q50 40 44 46 Z" fill="#c9b9a4" />
      <Llama x={46} y={36} s={1.1} />
      <Llama x={54} y={34} s={1.3} />
      <path d="M20 70 L30 62 M70 66 L80 74 M44 62 L52 56" stroke="#8a7f6c" strokeWidth="1.6" strokeLinecap="round" />
      <Suelo y={90} />
    </>
  ),
  candelero: () => (
    <>
      <Fondo c="url(#mf-noche)" />
      <circle cx="50" cy="34" r="40" fill="url(#mf-luz)" opacity=".7" />
      {[1, 2, 3].map((k) => (
        <path key={k} d={`M${50 - k * 11} 34 Q${50 - k * 11} ${60 + k * 2} 50 ${62 + k * 2} Q${50 + k * 11} ${60 + k * 2} ${50 + k * 11} 34`} fill="none" stroke="url(#mf-oro)" strokeWidth="3.2" />
      ))}
      <path d="M50 30 V84" stroke="#d9a520" strokeWidth="4.5" />
      <path d="M49 30 V84" stroke="#fff1a8" strokeWidth="1.2" opacity=".7" />
      <path d="M38 90 Q50 80 62 90 Z" fill="url(#mf-oro)" stroke={T} strokeWidth="1.4" />
      {[-3, -2, -1, 0, 1, 2, 3].map((k) => (
        <g key={k}>
          <path d={`M${50 + k * 11 - 4} 34 H${50 + k * 11 + 4} L${50 + k * 11 + 2.5} 30 H${50 + k * 11 - 2.5} Z`} fill="url(#mf-oro)" stroke={T} strokeWidth="1" />
          <Llama x={50 + k * 11} y={27} s={0.72} />
        </g>
      ))}
    </>
  ),
  vara: () => (
    <>
      <Fondo />
      <Suelo />
      <path d="M48 92 Q50 60 52 14" stroke="url(#mf-madera)" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M48 92 Q50 60 52 14" stroke={T} strokeWidth="1" strokeLinecap="round" fill="none" opacity=".5" />
      {[
        [52, 20, -40],
        [51, 30, 30],
        [50.5, 42, -30],
        [50, 54, 40],
      ].map(([x, y, a], i) => (
        <Hoja key={i} x={x} y={y} a={a + (a > 0 ? 0 : 180)} s={0.95} />
      ))}
      {[
        [45, 24],
        [58, 34],
        [43, 46],
        [58, 18],
      ].map(([x, y], i) => (
        <g key={i}>
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse key={a} cx={x} cy={y - 3.2} rx="2" ry="3.2" fill="#fff" stroke="#e7a2b4" strokeWidth=".8" transform={`rotate(${a} ${x} ${y})`} />
          ))}
          <circle cx={x} cy={y} r="1.5" fill="#f5c84a" />
        </g>
      ))}
      <ellipse cx="57" cy="60" rx="3.2" ry="4.5" fill="#c99456" stroke={T} strokeWidth="1" />
      <ellipse cx="44" cy="64" rx="3" ry="4.2" fill="#c99456" stroke={T} strokeWidth="1" />
    </>
  ),
  asna: () => (
    <>
      <Fondo />
      <Suelo />
      <path d="M22 54 Q24 44 40 44 H66 Q76 44 76 54 V64 Q76 70 70 70 H28 Q22 70 22 64 Z" fill={tela("gris")} stroke={T} strokeWidth={SW} />
      {[28, 38, 62, 70].map((x) => (
        <rect key={x} x={x - 2.5} y="66" width="5" height="22" rx="2" fill={tela("gris")} stroke={T} strokeWidth="1.4" />
      ))}
      <path d="M68 50 L80 30 Q86 26 90 32 L92 44 Q90 50 84 48 L76 56 Z" fill={tela("gris")} stroke={T} strokeWidth={SW} strokeLinejoin="round" />
      <path d="M80 30 L76 12 Q80 10 82 14 L84 28 Z" fill={tela("gris")} stroke={T} strokeWidth="1.4" />
      <path d="M85 29 L88 11 Q92 10 92 14 L88 30 Z" fill={tela("gris")} stroke={T} strokeWidth="1.4" />
      <Ojo x={84} y={36} r={1.5} />
      <ellipse cx="90" cy="45" rx="3" ry="2.4" fill="#5b5752" />
      <path d="M22 54 Q14 58 14 68" stroke={T} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M36 44 Q50 38 62 44 L60 54 H38 Z" fill={tela("roja")} stroke={T} strokeWidth="1.4" />
    </>
  ),
  murallas: () => (
    <>
      <Fondo />
      <Suelo />
      <rect x="8" y="40" width="20" height="46" fill="url(#mf-piedra)" stroke={T} strokeWidth={SW} />
      <path d="M8 40 V34 H12 V40 M16 40 V34 H20 V40 M24 40 V34 H28 V40" stroke={T} strokeWidth="1.6" fill="url(#mf-piedra)" />
      <rect x="72" y="40" width="20" height="46" fill="url(#mf-piedra)" stroke={T} strokeWidth={SW} />
      <path d="M72 40 V34 H76 V40 M80 40 V34 H84 V40 M88 40 V34 H92 V40" stroke={T} strokeWidth="1.6" fill="url(#mf-piedra)" />
      <path d="M28 56 H40 L44 62 L38 70 L46 76 V86 H28 Z" fill="url(#mf-piedra)" stroke={T} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M72 56 H62 L58 64 L64 70 L56 78 V86 H72 Z" fill="url(#mf-piedra)" stroke={T} strokeWidth="1.6" strokeLinejoin="round" />
      {[
        [48, 50, 15],
        [54, 38, -20],
        [44, 30, 35],
        [58, 62, 10],
        [50, 74, -10],
      ].map(([x, y, a], i) => (
        <rect key={i} x={x} y={y} width="8" height="6" rx="1" fill="url(#mf-piedra)" stroke={T} strokeWidth="1.2" transform={`rotate(${a} ${x} ${y})`} />
      ))}
      <path d="M36 36 Q40 30 46 32 M64 32 Q60 26 54 28" stroke="#8a7f6c" strokeWidth="1.4" fill="none" strokeDasharray="2 2" />
    </>
  ),
  shofar: () => (
    <>
      <Fondo />
      <path d="M14 70 Q20 40 50 36 Q74 34 80 18 Q90 26 86 40 Q76 58 50 60 Q30 62 26 76 Z" fill="url(#mf-arena)" stroke={T} strokeWidth={SW} strokeLinejoin="round" />
      {[0.2, 0.35, 0.5, 0.65].map((t, i) => (
        <path key={i} d={`M${20 + t * 60} ${68 - t * 40} q4 ${-4 + i} 8 -2`} stroke="#b38a4a" strokeWidth="1.4" fill="none" />
      ))}
      <ellipse cx="82" cy="24" rx="6" ry="9" transform="rotate(35 82 24)" fill="#8a5a24" stroke={T} strokeWidth="1.6" />
      <path d="M14 70 Q12 76 18 80 L26 76" fill="#d2a85e" stroke={T} strokeWidth="1.6" />
      {[0, 1, 2].map((k) => (
        <path key={k} d={`M${88 + k * 4} ${10 - k * 2} Q${96 + k * 3} ${22} ${90 + k * 4} ${34 + k * 2}`} stroke="#d6a21e" strokeWidth="2" fill="none" strokeLinecap="round" opacity={1 - k * 0.25} />
      ))}
    </>
  ),
  sol: () => (
    <>
      <Fondo />
      {[...Array(16)].map((_, i) => (
        <path key={i} d="M50 50 L47 14 L53 14 Z" transform={`rotate(${i * 22.5} 50 50)`} fill="#f5c12e" stroke="#d48a12" strokeWidth=".8" />
      ))}
      <circle cx="50" cy="50" r="22" fill="url(#mf-oro)" stroke={T} strokeWidth={SW} />
      <circle cx="44" cy="44" r="7" fill="url(#mf-brillo)" />
    </>
  ),
  sanson: () => (
    <>
      <Fondo c="url(#mf-arena)" />
      {[10, 78].map((x) => (
        <g key={x}>
          <rect x={x} y="14" width="12" height="76" fill="url(#mf-piedra)" stroke={T} strokeWidth={SW} />
          <rect x={x - 2} y="10" width="16" height="6" fill="url(#mf-piedra)" stroke={T} strokeWidth="1.4" />
          <path d={`M${x + 4} 20 V86 M${x + 8} 20 V86`} stroke="#a59a86" strokeWidth="1" />
        </g>
      ))}
      <Persona ropa={tela("roja")} pelo="#3b2412" barba="#3b2412" faja="#7a4524">
        <path d="M40 22 Q30 30 32 44 M60 22 Q70 30 68 44 M42 18 Q36 26 34 34" stroke="#3b2412" strokeWidth="3.4" fill="none" strokeLinecap="round" />
        <path d="M37 47 Q26 44 22 40" stroke={tela("roja")} strokeWidth="7" strokeLinecap="round" fill="none" />
        <path d="M63 47 Q74 44 78 40" stroke={tela("roja")} strokeWidth="7" strokeLinecap="round" fill="none" />
        <circle cx="22" cy="40" r="3.8" fill="url(#mf-piel)" stroke={T} strokeWidth="1.2" />
        <circle cx="78" cy="40" r="3.8" fill="url(#mf-piel)" stroke={T} strokeWidth="1.2" />
      </Persona>
    </>
  ),
  rut: () => (
    <>
      <Fondo />
      <path d="M0 74 Q50 64 100 74 V100 H0Z" fill="#e8c35a" />
      <Persona ropa={tela("verde")} velo={tela("crema")} faja="#b7862a">
        <g transform="translate(58 46) rotate(18)">
          {[-6, -3, 0, 3, 6].map((dx) => (
            <path key={dx} d={`M${dx * 0.6} 30 L${dx} 0`} stroke="#c9952a" strokeWidth="1.6" />
          ))}
          {[-6, -3, 0, 3, 6].map((dx) => (
            <ellipse key={`e${dx}`} cx={dx} cy="-3" rx="2.2" ry="5.5" fill="#f2c94c" stroke="#a37516" strokeWidth=".8" />
          ))}
          <path d="M-5 16 H5" stroke="#7a4524" strokeWidth="2.4" />
        </g>
      </Persona>
    </>
  ),
  samuel: () => (
    <>
      <Fondo c="url(#mf-noche)" />
      <Estrella5 x={16} y={16} r={3} />
      <Estrella5 x={84} y={12} r={2.4} />
      <path d="M0 84 H100 V100 H0Z" fill="#6a4a30" />
      <rect x="62" y="74" width="34" height="10" rx="3" fill={tela("crema")} stroke={T} strokeWidth="1.4" />
      <circle cx="40" cy="58" r="26" fill="url(#mf-luz)" />
      <Persona ropa={tela("crema")} nino x={42} faja="#7a4524" pelo="#3b2412">
        <path d="M66 70 Q74 66 76 60" stroke={tela("crema")} strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d="M70 60 Q78 54 86 58 Q84 64 76 64 Z" fill="url(#mf-barro)" stroke={T} strokeWidth="1.3" />
        <Llama x={86} y={54} s={0.7} />
      </Persona>
    </>
  ),
  arpa: () => (
    <>
      <Fondo />
      <circle cx="50" cy="52" r="36" fill="url(#mf-luz)" />
      <path d="M30 86 L26 20 Q26 12 34 12 Q44 12 50 22 Q58 34 76 36 Q84 37 82 44 L40 86 Z" fill="url(#mf-madera)" fillOpacity=".22" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((k) => {
        const t = k / 7;
        const x = 32 + t * 42;
        const yTop = 18 + t * 18 + Math.sin(t * Math.PI) * 6;
        const yBot = 84 - t * 40;
        return <path key={k} d={`M${x.toFixed(1)} ${yTop.toFixed(1)} L${x.toFixed(1)} ${yBot.toFixed(1)}`} stroke="#9a6b2a" strokeWidth="1.2" />;
      })}
      <path d="M28 88 L30 86 L80 42" fill="none" stroke="#7a4a22" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M28 88 L30 86 L80 42" fill="none" stroke="#c98b4e" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M30 88 L26 20 Q26 10 36 12 Q46 14 52 24 Q60 36 78 36 Q86 36 84 44" fill="none" stroke="url(#mf-oro)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M30 88 L26 20 Q26 10 36 12 Q46 14 52 24 Q60 36 78 36 Q86 36 84 44" fill="none" stroke={T} strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="31" cy="12.5" r="3.2" fill="url(#mf-oro)" stroke={T} strokeWidth="1" />
      <ellipse cx="29" cy="90" rx="8" ry="2.6" fill="#7a4a22" stroke={T} strokeWidth="1" />
    </>
  ),
  david: () => (
    <>
      <Fondo />
      <Suelo c="url(#mf-hoja)" />
      <Persona ropa={tela("crema")} pelo="#8a4a1e" faja="#7a4524" nino x={46}>
        <path d="M63 47 Q72 40 74 30" stroke={tela("crema")} strokeWidth="6.5" strokeLinecap="round" fill="none" />
        <circle cx="74" cy="29" r="3.4" fill="url(#mf-piel)" stroke={T} strokeWidth="1.2" />
        <path d="M74 29 Q84 8 95 20" stroke="#5a3417" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        <path d="M74 29 Q86 26 95 20" stroke="#5a3417" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        <circle cx="95" cy="19" r="3.6" fill="url(#mf-piedra)" stroke={T} strokeWidth="1.3" />
      </Persona>
      <path d="M66 6 Q86 -6 100 10" stroke="#ffffff" strokeWidth="1.8" fill="none" strokeDasharray="3 3" strokeLinecap="round" />
    </>
  ),
  goliat: () => (
    <>
      <Fondo />
      <Suelo />
      <Persona ropa={tela("gris")} barba="#2a1a10" pelo="#2a1a10" faja="#5a3a1c" alto={1.12}>
        <path d="M38 13 Q50 2 62 13 L63 22 H37 Z" fill="url(#mf-oro)" stroke={T} strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M50 3 V-4" stroke="#b8461c" strokeWidth="3" strokeLinecap="round" />
        {[48, 54, 60, 66, 72].map((y) => (
          <path key={y} d={`M38 ${y} Q50 ${y + 3} 62 ${y}`} stroke="#8d877c" strokeWidth="1.4" fill="none" />
        ))}
        <path d="M74 92 L82 0" stroke="#6b4321" strokeWidth="3.4" strokeLinecap="round" />
        <path d="M82 0 L79 -10 L85 -9 Z" fill="#b6b2aa" stroke={T} strokeWidth="1" />
        <path d="M67 68 Q74 60 78 46" stroke={tela("gris")} strokeWidth="6.5" strokeLinecap="round" fill="none" />
      </Persona>
    </>
  ),
  corona: () => (
    <>
      <Fondo />
      <circle cx="50" cy="50" r="38" fill="url(#mf-luz)" />
      <path d="M18 72 L14 30 L32 48 L42 22 L50 40 L58 22 L68 48 L86 30 L82 72 Z" fill="url(#mf-oro)" stroke={T} strokeWidth={SW} strokeLinejoin="round" />
      <rect x="16" y="70" width="68" height="12" rx="3" fill="url(#mf-oro)" stroke={T} strokeWidth={SW} />
      {[14, 42, 58, 86].map((x, i) => (
        <circle key={x} cx={x} cy={[30, 22, 22, 30][i]} r="3.4" fill="#fff4c0" stroke={T} strokeWidth="1.1" />
      ))}
      <circle cx="32" cy="76" r="3" fill="#d9483a" stroke={T} strokeWidth="1" />
      <circle cx="50" cy="76" r="3.4" fill="#3d8fd6" stroke={T} strokeWidth="1" />
      <circle cx="68" cy="76" r="3" fill="#5cb85c" stroke={T} strokeWidth="1" />
      <path d="M24 62 Q50 56 76 62" stroke="#fff4c0" strokeWidth="1.4" fill="none" opacity=".8" />
    </>
  ),
  templo: () => (
    <>
      <Fondo />
      <circle cx="50" cy="40" r="40" fill="url(#mf-luz)" />
      <path d="M10 90 H90 V84 H10 Z M16 84 H84 V78 H16 Z" fill="url(#mf-piedra)" stroke={T} strokeWidth="1.4" />
      <rect x="22" y="36" width="56" height="42" fill="#f3e6c7" stroke={T} strokeWidth={SW} />
      <path d="M18 38 L50 18 L82 38 Z" fill="url(#mf-oro)" stroke={T} strokeWidth={SW} strokeLinejoin="round" />
      {[28, 66].map((x) => (
        <g key={x}>
          <rect x={x} y="40" width="6" height="38" fill="url(#mf-oro)" stroke={T} strokeWidth="1.3" />
          <ellipse cx={x + 3} cy="40" rx="5" ry="2.5" fill="url(#mf-oro)" stroke={T} strokeWidth="1.1" />
        </g>
      ))}
      <path d="M42 78 V54 Q50 46 58 54 V78 Z" fill="#8a5a24" stroke={T} strokeWidth="1.6" />
    </>
  ),
  cuervo: () => (
    <>
      <Fondo />
      <path d="M0 88 Q30 80 60 90 T100 86 V100 H0Z" fill="url(#mf-agua)" />
      <path d="M26 66 Q22 46 40 40 Q54 36 66 44 L80 40 Q78 50 70 52 Q72 66 60 72 Q44 78 30 74 Z" fill="#2c2a33" stroke="#0d0c10" strokeWidth={SW} strokeLinejoin="round" />
      <path d="M34 50 Q44 30 62 40 Q52 48 40 58 Z" fill="#3f3c4a" stroke="#0d0c10" strokeWidth="1.4" />
      <circle cx="68" cy="46" r="6.5" fill="#2c2a33" stroke="#0d0c10" strokeWidth="1.4" />
      <circle cx="69.5" cy="44.5" r="1.6" fill="#fff" />
      <path d="M74 46 L86 48 L74 51 Z" fill="#4a4652" stroke="#0d0c10" strokeWidth="1" />
      <ellipse cx="88" cy="51" rx="8" ry="5" fill="#e9b872" stroke={T} strokeWidth="1.4" />
      <path d="M84 49 Q88 47 92 49" stroke="#b07a3a" strokeWidth="1" fill="none" />
      <path d="M30 74 L26 84 M38 76 L36 86" stroke="#0d0c10" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  ester: () => (
    <>
      <Fondo />
      <rect x="0" y="80" width="100" height="20" fill="#7a4a8c" />
      <Persona ropa={tela("morada")} velo="#e8d9ff" corona faja="url(#mf-oro)">
        <path d="M66 70 L78 46" stroke="url(#mf-oro)" strokeWidth="2.6" strokeLinecap="round" />
        <circle cx="79" cy="44" r="3.2" fill="url(#mf-oro)" stroke={T} strokeWidth="1" />
      </Persona>
    </>
  ),
  leon: () => (
    <>
      <Fondo c="url(#mf-arena)" />
      <ellipse cx="50" cy="90" rx="34" ry="5" fill="#000" opacity=".14" />
      <path d="M30 86 Q26 60 40 56 H62 Q76 58 74 86 Z" fill="#e2a74a" stroke={T} strokeWidth={SW} />
      {[...Array(14)].map((_, i) => (
        <ellipse key={i} cx="50" cy="20" rx="7" ry="11" fill="#b86a22" stroke={T} strokeWidth="1.1" transform={`rotate(${i * 25.7} 50 40)`} />
      ))}
      <circle cx="50" cy="40" r="17" fill="#f0b859" stroke={T} strokeWidth={SW} />
      <Ojo x={44} y={37} r={1.8} />
      <Ojo x={56} y={37} r={1.8} />
      <path d="M47 44 Q50 47 53 44 Z" fill="#6a3a1c" />
      <path d="M50 47 V49 M45 50 Q50 53 55 50" stroke={T} strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <path d="M36 86 V78 M64 86 V78" stroke={T} strokeWidth="1.4" />
    </>
  ),
  "gran-pez": () => (
    <>
      <Fondo c="url(#mf-agua)" />
      <path d="M10 58 Q24 30 58 32 Q80 34 88 52 Q80 72 56 74 Q26 76 10 58 Z" fill="#5b7fa6" stroke={T} strokeWidth={SW} strokeLinejoin="round" />
      <path d="M14 60 Q34 70 60 70 Q78 68 86 56 Q78 64 58 66 Q34 66 14 60 Z" fill="#cfe3f2" />
      <path d="M86 52 L98 38 Q96 52 98 66 Z" fill="#5b7fa6" stroke={T} strokeWidth="1.6" strokeLinejoin="round" />
      <Ojo x={28} y={48} r={2.6} />
      <path d="M12 58 Q22 60 30 56" stroke={T} strokeWidth="1.6" fill="none" />
      <path d="M48 32 Q46 18 40 12 M48 32 Q52 18 58 12 M48 32 V12" stroke="#e6f6ff" strokeWidth="2" fill="none" strokeLinecap="round" />
      <Olas y={86} />
      <Olas y={94} />
    </>
  ),
  torre: () => (
    <>
      <Fondo />
      <Nube x={22} y={20} />
      <Nube x={80} y={14} s={0.8} />
      <Suelo />
      {[0, 1, 2, 3, 4].map((k) => (
        <rect key={k} x={20 + k * 7} y={80 - k * 14} width={60 - k * 14} height="14" fill="url(#mf-barro)" stroke={T} strokeWidth="1.6" />
      ))}
      {[0, 1, 2, 3, 4].map((k) => (
        <path key={k} d={`M${24 + k * 7} ${87 - k * 14} H${76 - k * 7}`} stroke="#8a4a22" strokeWidth="1" strokeDasharray="4 3" />
      ))}
      <rect x="46" y="18" width="8" height="6" fill="url(#mf-barro)" stroke={T} strokeWidth="1.2" />
      <rect x="49" y="12" width="7" height="6" fill="url(#mf-barro)" stroke={T} strokeWidth="1.2" transform="rotate(12 52 15)" />
    </>
  ),
  llave: () => (
    <>
      <Fondo />
      <circle cx="50" cy="50" r="38" fill="url(#mf-luz)" />
      <g transform="rotate(-30 50 50)">
        <circle cx="28" cy="50" r="14" fill="none" stroke="url(#mf-oro)" strokeWidth="7" />
        <circle cx="28" cy="50" r="14" fill="none" stroke={T} strokeWidth="1.2" />
        <rect x="40" y="46.5" width="44" height="7" rx="2" fill="url(#mf-oro)" stroke={T} strokeWidth="1.2" />
        <path d="M70 53.5 V62 H76 V53.5 M80 53.5 V66 H86 V53.5" fill="url(#mf-oro)" stroke={T} strokeWidth="1.2" />
      </g>
    </>
  ),
  lampara: () => (
    <>
      <Fondo c="url(#mf-noche)" />
      <circle cx="58" cy="38" r="30" fill="url(#mf-luz)" />
      <path d="M18 64 Q20 52 40 52 H62 Q74 52 80 44 Q82 52 76 58 Q70 70 46 70 Q24 72 18 64 Z" fill="url(#mf-barro)" stroke={T} strokeWidth={SW} strokeLinejoin="round" />
      <ellipse cx="42" cy="54" rx="7" ry="2.4" fill="#6a3a1c" />
      <path d="M18 64 Q10 62 12 56 Q18 58 22 60" fill="url(#mf-barro)" stroke={T} strokeWidth="1.6" />
      <Llama x={78} y={40} s={1.3} />
      <path d="M26 78 Q50 74 74 78" stroke="#e6c48a" strokeWidth="1.4" fill="none" strokeDasharray="2 3" />
    </>
  ),
  luna: () => (
    <>
      <Fondo c="url(#mf-noche)" />
      <circle cx="50" cy="50" r="38" fill="url(#mf-luz)" opacity=".45" />
      <path d="M66 22.3 A32 32 0 1 0 66 77.7 A30 30 0 1 1 66 22.3 Z" fill="#f6efc4" stroke="#c9b964" strokeWidth="1.6" />
      <circle cx="30" cy="58" r="3" fill="#e4d99a" />
      <circle cx="28" cy="40" r="2" fill="#e4d99a" />
      <circle cx="36" cy="72" r="1.6" fill="#e4d99a" />
      <Estrella5 x={78} y={30} r={5} c="#fff3b0" />
      <Estrella5 x={84} y={62} r={3.6} c="#fff3b0" />
      <Estrella5 x={14} y={16} r={3} c="#fff3b0" />
    </>
  ),
  estrella: () => (
    <>
      <Fondo c="url(#mf-noche)" />
      <circle cx="50" cy="34" r="30" fill="url(#mf-luz)" />
      <Estrella5 x={50} y={36} r={20} sw={2} />
      {[
        [20, 18],
        [82, 22],
        [14, 52],
        [88, 50],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.6" fill="#fff6d0" />
      ))}
      <path d="M0 100 V84 H12 V78 H20 V86 H30 V74 L36 70 L42 74 V86 H54 V80 H64 V88 H74 V76 H84 V86 H100 V100 Z" fill="#2a2440" />
      <rect x="34" y="78" width="4" height="4" fill="#ffd66b" />
      <rect x="77" y="80" width="3" height="3" fill="#ffd66b" />
    </>
  ),
  cordero: () => (
    <>
      <Fondo />
      <Suelo c="url(#mf-hoja)" />
      {[
        [32, 60],
        [42, 54],
        [54, 54],
        [64, 60],
        [38, 68],
        [52, 70],
        [62, 68],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="10" fill="url(#mf-lana)" stroke={T} strokeWidth="1.4" />
      ))}
      <path d="M36 74 V86 M46 76 V88 M58 76 V88 M64 74 V86" stroke={T} strokeWidth="3.2" strokeLinecap="round" />
      <ellipse cx="72" cy="48" rx="9" ry="11" fill="#f3ece0" stroke={T} strokeWidth={SW} />
      <ellipse cx="64" cy="44" rx="5" ry="2.6" fill="#e7dccb" stroke={T} strokeWidth="1.2" transform="rotate(-20 64 44)" />
      <ellipse cx="81" cy="44" rx="5" ry="2.6" fill="#e7dccb" stroke={T} strokeWidth="1.2" transform="rotate(20 81 44)" />
      <Ojo x={69} y={47} r={1.3} />
      <Ojo x={76} y={47} r={1.3} />
      <path d="M70 54 Q72.5 56 75 54" stroke={T} strokeWidth="1.1" fill="none" />
    </>
  ),
  ciervo: () => (
    <>
      <Fondo />
      <path d="M0 80 Q30 74 60 82 T100 78 V100 H0Z" fill="url(#mf-agua)" />
      <Olas y={90} />
      <path d="M24 54 Q26 44 40 44 H62 Q72 44 72 54 V60 Q72 66 66 66 H30 Q24 66 24 60 Z" fill="#b87a3e" stroke={T} strokeWidth={SW} />
      <path d="M30 64 V82 M38 64 V84 M58 64 V84 M66 64 V82" stroke="#8a5428" strokeWidth="4" strokeLinecap="round" />
      <path d="M66 50 Q76 58 80 72 Q82 78 78 80 Q72 80 72 74 Q70 64 62 56 Z" fill="#b87a3e" stroke={T} strokeWidth={SW} strokeLinejoin="round" />
      <Ojo x={76} y={72} r={1.3} />
      <path d="M72 58 Q66 44 70 34 M70 42 Q62 38 60 32 M72 50 Q80 40 86 38 M80 42 Q84 34 82 28" stroke="#6a4325" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M36 50 H44 M50 48 H56" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity=".6" />
    </>
  ),
  aguila: () => (
    <>
      <Fondo />
      <Nube x={80} y={78} s={1.2} />
      <Nube x={18} y={84} />
      <path d="M50 50 Q30 40 14 14 Q30 20 40 26 Q36 18 34 10 Q46 22 50 40 Z" fill="#7a5230" stroke={T} strokeWidth={SW} strokeLinejoin="round" />
      <path d="M50 50 Q70 40 86 14 Q70 20 60 26 Q64 18 66 10 Q54 22 50 40 Z" fill="#7a5230" stroke={T} strokeWidth={SW} strokeLinejoin="round" />
      {[0, 1, 2].map((k) => (
        <g key={k}>
          <path d={`M${16 + k * 6} ${16 + k * 3} q-4 -6 -3 -10`} stroke="#4e3218" strokeWidth="1.4" fill="none" strokeLinecap="round" />
          <path d={`M${84 - k * 6} ${16 + k * 3} q4 -6 3 -10`} stroke="#4e3218" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        </g>
      ))}
      <path d="M26 30 Q36 34 44 42 M74 30 Q64 34 56 42" stroke="#a37446" strokeWidth="1.4" fill="none" />
      <ellipse cx="50" cy="58" rx="9" ry="14" fill="#8a5c34" stroke={T} strokeWidth={SW} />
      <path d="M44 70 L50 82 L56 70 Z" fill="#6a4325" stroke={T} strokeWidth="1.4" />
      <circle cx="50" cy="42" r="7" fill="#fff" stroke={T} strokeWidth={SW} />
      <path d="M50 44 L56 46 L50 49 Z" fill="#f2b632" stroke={T} strokeWidth="1" />
      <Ojo x={48} y={41} r={1.3} />
    </>
  ),
  palmera: () => (
    <>
      <Fondo />
      <Suelo />
      <path d="M46 90 Q44 60 52 30 L58 30 Q52 60 56 90 Z" fill="url(#mf-madera)" stroke={T} strokeWidth="1.6" />
      {[36, 46, 56, 66, 76].map((y) => (
        <path key={y} d={`M${46 + (90 - y) * 0.12} ${y} q4 2 8 0`} stroke="#6b4321" strokeWidth="1.2" fill="none" />
      ))}
      {[-150, -110, -60, -20, 20, 160].map((a) => (
        <path key={a} d="M0 0 Q14 -8 30 2 Q16 0 0 0 Z" transform={`translate(55 30) rotate(${a})`} fill="url(#mf-hoja)" stroke="#2d5f2a" strokeWidth="1.1" />
      ))}
      {[50, 56, 60].map((x, i) => (
        <circle key={x} cx={x} cy={34 + (i % 2) * 2} r="2.6" fill="#8a4a22" stroke={T} strokeWidth=".8" />
      ))}
    </>
  ),
  vid: () => (
    <>
      <Fondo />
      <path d="M8 20 Q30 30 50 22 Q72 14 92 24" stroke="#6b4321" strokeWidth="3" fill="none" strokeLinecap="round" />
      {[
        [20, 26, 0],
        [70, 20, 1],
      ].map(([x, y, k]) => (
        <g key={x}>
          <path d={`M${x} ${y} Q${x - 6} ${y - 10} ${x - 12} ${y - 6} Q${x - 10} ${y + 2} ${x} ${y} Q${x + 2} ${y - 12} ${x + 10} ${y - 12} Q${x + 12} ${y - 2} ${x} ${y}`} fill="url(#mf-hoja)" stroke="#2d5f2a" strokeWidth="1.1" />
          {k === 0 && <path d={`M${x + 4} ${y} q6 6 2 12`} stroke="#6b8f2a" strokeWidth="1" fill="none" />}
        </g>
      ))}
      {[
        [38, 30],
        [62, 26],
      ].map(([x0, y0]) => (
        <g key={x0}>
          <path d={`M${x0} ${y0 - 6} V${y0}`} stroke="#6b4321" strokeWidth="1.6" />
          {[
            [0, 0],
            [-6, 0],
            [6, 0],
            [-3, 6],
            [3, 6],
            [-9, 6],
            [9, 6],
            [0, 12],
            [-6, 12],
            [6, 12],
            [-3, 18],
            [3, 18],
            [0, 24],
          ].map(([dx, dy], i) => (
            <circle key={i} cx={x0 + dx} cy={y0 + 4 + dy} r="4" fill="#7b3f9c" stroke="#3e1a54" strokeWidth=".9" />
          ))}
          <circle cx={x0 - 2} cy={y0 + 2} r="1.4" fill="#fff" opacity=".6" />
        </g>
      ))}
      <Suelo c="url(#mf-hoja)" y={90} />
    </>
  ),
  pozo: () => (
    <>
      <Fondo />
      <Suelo />
      <path d="M22 18 Q50 0 78 18" stroke="url(#mf-madera)" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M26 18 V50 M74 18 V50" stroke="url(#mf-madera)" strokeWidth="5" strokeLinecap="round" />
      <circle cx="50" cy="12" r="4" fill="#8a5428" stroke={T} strokeWidth="1.2" />
      <path d="M50 16 V42" stroke="#7a5a30" strokeWidth="1.4" />
      <path d="M44 42 H56 L54 52 H46 Z" fill="url(#mf-madera)" stroke={T} strokeWidth="1.3" />
      <path d="M16 54 Q50 46 84 54 V86 Q50 94 16 86 Z" fill="url(#mf-piedra)" stroke={T} strokeWidth={SW} />
      <ellipse cx="50" cy="54" rx="34" ry="7" fill="#5a7f9a" stroke={T} strokeWidth="1.6" />
      {[
        [24, 66],
        [40, 70],
        [58, 70],
        [74, 66],
        [30, 78],
        [50, 82],
        [68, 78],
      ].map(([x, y], i) => (
        <rect key={i} x={x - 6} y={y - 3} width="12" height="7" rx="2" fill="none" stroke="#8a7f6c" strokeWidth="1" />
      ))}
    </>
  ),
  cantaro: () => (
    <>
      <Fondo />
      <Suelo />
      <path d="M38 26 H62 L60 34 Q78 44 74 66 Q70 86 50 88 Q30 86 26 66 Q22 44 40 34 Z" fill="url(#mf-barro)" stroke={T} strokeWidth={SW} strokeLinejoin="round" />
      <path d="M40 34 Q24 30 26 50" stroke="#a8572b" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M60 34 Q76 30 74 50" stroke="#a8572b" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M30 56 Q50 62 70 56 M32 66 Q50 72 68 66" stroke="#f4c28c" strokeWidth="1.8" fill="none" />
      <ellipse cx="50" cy="26" rx="12" ry="3" fill="#6a3a1c" stroke={T} strokeWidth="1.2" />
      <ellipse cx="38" cy="48" rx="4" ry="8" fill="url(#mf-brillo)" />
      {[
        [54, 16],
        [60, 10],
        [46, 8],
      ].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y} q2.4 3.4 0 4.6 q-2.4 -1.2 0 -4.6 Z`} fill="#5fb2e6" />
      ))}
    </>
  ),
  "panes-peces": () => (
    <>
      <Fondo />
      <path d="M10 60 Q50 54 90 60 L82 86 Q50 94 18 86 Z" fill="url(#mf-madera)" stroke={T} strokeWidth={SW} />
      {[66, 74, 82].map((y) => (
        <path key={y} d={`M${14 + (y - 60) * 0.2} ${y} Q50 ${y - 4} ${86 - (y - 60) * 0.2} ${y}`} stroke="#6b4321" strokeWidth="1.2" fill="none" />
      ))}
      {[22, 36, 50, 64, 78].map((x, i) => (
        <ellipse key={x} cx={x} cy={i % 2 ? 50 : 54} rx="9" ry="7" fill="#e3a24f" stroke={T} strokeWidth="1.5" />
      ))}
      {[22, 36, 50, 64, 78].map((x, i) => (
        <path key={`r${x}`} d={`M${x - 4} ${(i % 2 ? 50 : 54) - 2} q4 -2 8 0`} stroke="#f5d79a" strokeWidth="1.2" fill="none" />
      ))}
      {[0, 1].map((k) => (
        <g key={k} transform={`translate(${k ? 60 : 24} ${k ? 26 : 30}) rotate(${k ? 12 : -10})`}>
          <path d="M0 0 Q10 -8 22 0 Q10 8 0 0 Z" fill="#8fb0c9" stroke={T} strokeWidth="1.4" />
          <path d="M22 0 L30 -5 L30 5 Z" fill="#8fb0c9" stroke={T} strokeWidth="1.2" />
          <circle cx="6" cy="-1" r="1.2" fill={T} />
        </g>
      ))}
    </>
  ),
  red: () => (
    <>
      <Fondo c="url(#mf-agua)" />
      <path d="M8 18 Q50 30 92 18 L80 84 Q50 96 20 84 Z" fill="#c9a36a" fillOpacity=".18" stroke="#b8925a" strokeWidth="2" />
      {[0, 1, 2, 3, 4, 5].map((r) =>
        [0, 1, 2, 3, 4, 5, 6].map((c) => {
          const x = 14 + c * 12 + (r % 2) * 6;
          const y = 28 + r * 10;
          return x < 90 ? <path key={`${r}-${c}`} d={`M${x - 6} ${y} Q${x} ${y + 7} ${x + 6} ${y}`} fill="none" stroke="#e4caa0" strokeWidth="1.2" /> : null;
        }),
      )}
      {[
        [30, 52, 10],
        [52, 64, -14],
        [66, 46, 20],
        [40, 74, 0],
      ].map(([x, y, a], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${a})`}>
          <path d="M0 0 Q8 -6 16 0 Q8 6 0 0 Z" fill={i % 2 ? "#f2b45e" : "#9cc3dd"} stroke={T} strokeWidth="1.1" />
          <path d="M16 0 L22 -4 L22 4 Z" fill={i % 2 ? "#f2b45e" : "#9cc3dd"} stroke={T} strokeWidth="1" />
          <circle cx="4" cy="-1" r=".9" fill={T} />
        </g>
      ))}
      {[10, 30, 50, 70, 90].map((x) => (
        <circle key={x} cx={x} cy={18 + Math.sin(x) * 2} r="2.6" fill="#f0e3c2" stroke={T} strokeWidth="1" />
      ))}
    </>
  ),
  sembrador: () => (
    <>
      <Fondo />
      <path d="M0 78 Q50 70 100 78 V100 H0Z" fill="#8a5a30" />
      {[12, 24, 36, 48, 60, 72, 84].map((x) => (
        <path key={x} d={`M${x} 92 q2 -6 4 0`} stroke="#5f8f3a" strokeWidth="1.6" fill="none" />
      ))}
      <Persona ropa={tela("verde")} barba="#6a4325" tocado={tela("crema")} faja="#7a4524" x={44}>
        <path d="M33 69 Q36 76 44 74" stroke={tela("cafe")} strokeWidth="9" strokeLinecap="round" fill="none" />
        <path d="M63 47 Q74 44 80 36" stroke={tela("verde")} strokeWidth="6.5" strokeLinecap="round" fill="none" />
        <circle cx="81" cy="35" r="3.4" fill="url(#mf-piel)" stroke={T} strokeWidth="1.2" />
      </Persona>
      {[
        [86, 42],
        [90, 50],
        [84, 56],
        [94, 60],
        [88, 66],
      ].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="1.4" ry="1" fill="#f2d08a" stroke="#8a5a30" strokeWidth=".5" />
      ))}
    </>
  ),
  samaritano: () => (
    <>
      <Fondo />
      <Suelo />
      <g transform="translate(-6 4) scale(.8)">
        <path d="M60 52 Q62 42 76 42 H96 Q104 42 104 52 V60 Q104 66 98 66 H66 Q60 66 60 60 Z" fill={tela("gris")} stroke={T} strokeWidth={SW} />
        <path d="M66 64 V84 M74 64 V86 M90 64 V86 M98 64 V84" stroke="#77726a" strokeWidth="4" strokeLinecap="round" />
        <path d="M100 48 L110 30 Q116 28 118 34 L118 44 Q116 48 110 47 L104 54 Z" fill={tela("gris")} stroke={T} strokeWidth="1.6" />
      </g>
      <Persona ropa={tela("azul")} barba="#4a2e1a" tocado={tela("crema")} faja="#c9a227" x={36}>
        <path d="M63 50 Q70 56 70 66" stroke={tela("azul")} strokeWidth="6.5" strokeLinecap="round" fill="none" />
        <path d="M64 66 Q66 58 72 58 Q78 58 78 66 Q78 74 71 74 Q64 74 64 66 Z" fill="url(#mf-barro)" stroke={T} strokeWidth="1.3" />
        <rect x="68" y="54" width="6" height="5" fill="#8a5428" stroke={T} strokeWidth="1" />
      </Persona>
    </>
  ),
  oveja: () => (
    <>
      <Fondo />
      <Suelo c="url(#mf-hoja)" />
      <path d="M6 92 Q10 70 22 74 Q26 86 22 94 Z M80 94 Q84 74 96 76 Q100 88 96 96 Z" fill="url(#mf-piedra)" stroke={T} strokeWidth="1.3" />
      {[
        [34, 52],
        [46, 46],
        [60, 48],
        [70, 56],
        [40, 62],
        [54, 64],
        [66, 66],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="11" fill="url(#mf-lana)" stroke={T} strokeWidth="1.4" />
      ))}
      <path d="M38 72 V88 M48 74 V90 M60 74 V90 M68 72 V88" stroke={T} strokeWidth="3.4" strokeLinecap="round" />
      <ellipse cx="24" cy="48" rx="9" ry="11" fill="#3a2e28" stroke={T} strokeWidth={SW} />
      <ellipse cx="16" cy="42" rx="5" ry="2.6" fill="#3a2e28" transform="rotate(-25 16 42)" />
      <Ojo x={21} y={47} r={1.3} />
      <path d="M26 60 Q28 66 26 70" stroke="#c9a227" strokeWidth="1.4" fill="none" />
      <circle cx="26" cy="72" r="3" fill="url(#mf-oro)" stroke={T} strokeWidth="1" />
    </>
  ),
  camello: () => (
    <>
      <Fondo c="url(#mf-arena)" />
      <path d="M14 58 Q16 40 30 38 Q34 26 44 34 Q52 26 60 36 Q66 42 64 58 Q60 64 50 64 H24 Q14 64 14 58 Z" fill="#c99456" stroke={T} strokeWidth={SW} strokeLinejoin="round" />
      <path d="M20 62 V86 M28 62 V88 M48 62 V88 M56 62 V86" stroke="#a87440" strokeWidth="4" strokeLinecap="round" />
      <path d="M60 46 Q70 40 72 26 Q74 16 82 16 Q88 18 86 24 L80 28 Q78 40 70 52 Z" fill="#c99456" stroke={T} strokeWidth={SW} strokeLinejoin="round" />
      <Ojo x={81} y={21} r={1.3} />
      <path d="M86 24 Q84 27 81 26" stroke={T} strokeWidth="1" fill="none" />
      <g transform="translate(90 52) rotate(-10)">
        <path d="M-3.5 -26 Q0 -32 3.5 -26 L1.2 30 L0 36 L-1.2 30 Z" fill="#cfd4da" stroke={T} strokeWidth="1.3" strokeLinejoin="round" />
        <ellipse cx="0" cy="-21" rx="1.5" ry="4.2" fill="#f3d99c" stroke={T} strokeWidth=".8" />
        <path d="M-1 -10 V24" stroke="#fff" strokeWidth="1" opacity=".7" />
      </g>
    </>
  ),
  zaqueo: () => (
    <>
      <Fondo />
      <Suelo c="url(#mf-hoja)" />
      <path d="M40 92 Q42 70 38 52 L48 50 Q50 70 54 92 Z" fill="url(#mf-madera)" stroke={T} strokeWidth="1.6" />
      <path d="M44 56 Q30 46 20 48 M46 54 Q62 44 76 46" stroke="#8a5428" strokeWidth="4" strokeLinecap="round" fill="none" />
      <circle cx="30" cy="30" r="20" fill="url(#mf-hoja)" stroke="#2d5f2a" strokeWidth="1.4" />
      <circle cx="62" cy="26" r="22" fill="url(#mf-hoja)" stroke="#2d5f2a" strokeWidth="1.4" />
      <circle cx="46" cy="16" r="16" fill="url(#mf-hoja)" stroke="#2d5f2a" strokeWidth="1.4" />
      <g transform="translate(14 -2) scale(.55)">
        <Persona ropa={tela("roja")} barba="#4a2e1a" pelo="#4a2e1a" faja="#c9a227" x={70} />
      </g>
      <Hoja x={70} y={44} a={30} />
      <Hoja x={22} y={44} a={150} />
    </>
  ),
  viuda: () => (
    <>
      <Fondo c="url(#mf-arena)" />
      <path d="M62 60 H92 V90 H62 Z" fill="url(#mf-madera)" stroke={T} strokeWidth={SW} />
      <path d="M58 60 Q77 44 96 60 Z" fill="#8a5428" stroke={T} strokeWidth="1.6" />
      <rect x="72" y="55" width="10" height="3" rx="1" fill="#2a1a10" />
      <Persona ropa={tela("gris")} velo={tela("cafe")} faja={null} x={38}>
        <path d="M63 47 Q72 48 76 52" stroke={tela("gris")} strokeWidth="6.5" strokeLinecap="round" fill="none" />
        <circle cx="77" cy="52" r="3.2" fill="url(#mf-piel)" stroke={T} strokeWidth="1.2" />
      </Persona>
      <circle cx="78" cy="46" r="2.4" fill="url(#mf-oro)" stroke={T} strokeWidth=".9" />
      <circle cx="73" cy="42" r="2.4" fill="url(#mf-oro)" stroke={T} strokeWidth=".9" />
    </>
  ),
  gallo: () => (
    <>
      <Fondo />
      <circle cx="80" cy="76" r="16" fill="url(#mf-oro)" opacity=".85" />
      <Suelo />
      <path d="M30 70 Q24 50 40 42 Q52 38 60 46 Q66 56 62 66 Q56 76 42 76 Q32 76 30 70 Z" fill="#d9583e" stroke={T} strokeWidth={SW} />
      <path d="M32 54 Q14 40 10 22 Q22 34 30 40 Q26 28 30 18 Q36 34 40 44" fill="#2f6f4f" stroke={T} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M56 46 Q58 30 64 24 Q72 22 72 30 Q70 40 62 48 Z" fill="#f2b632" stroke={T} strokeWidth="1.6" />
      <path d="M62 24 Q60 16 66 14 Q66 18 70 16 Q70 20 74 20 Q72 24 68 24" fill="#e5483a" stroke={T} strokeWidth="1.2" />
      <path d="M72 28 L80 26 L72 32 Z" fill="#f2b632" stroke={T} strokeWidth="1" />
      <path d="M70 32 Q70 38 66 38 Q64 34 68 32" fill="#e5483a" stroke={T} strokeWidth="1" />
      <Ojo x={67} y={27} r={1.2} />
      <path d="M44 76 V86 M52 76 V86" stroke="#c98a2a" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M82 18 Q88 14 92 18 M84 24 Q92 22 96 26" stroke="#8a6b4a" strokeWidth="1.4" fill="none" strokeLinecap="round" />
    </>
  ),
  copa: () => (
    <>
      <Fondo />
      <circle cx="50" cy="36" r="34" fill="url(#mf-luz)" />
      <path d="M26 22 H74 Q74 52 50 58 Q26 52 26 22 Z" fill="url(#mf-oro)" stroke={T} strokeWidth={SW} strokeLinejoin="round" />
      <ellipse cx="50" cy="22" rx="24" ry="5" fill="#8a2b4a" stroke={T} strokeWidth="1.4" />
      <path d="M46 58 H54 V76 H46 Z" fill="url(#mf-oro)" stroke={T} strokeWidth="1.4" />
      <path d="M32 84 Q50 72 68 84 Z" fill="url(#mf-oro)" stroke={T} strokeWidth="1.4" />
      <path d="M28 22 Q24 32 26 40 M72 22 Q78 34 74 44" stroke="#8a2b4a" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="25" cy="44" r="2.2" fill="#8a2b4a" />
      <circle cx="75" cy="48" r="2.2" fill="#8a2b4a" />
      <ellipse cx="38" cy="34" rx="4" ry="8" fill="url(#mf-brillo)" />
    </>
  ),
  noe: () => (
    <>
      <Fondo />
      <Suelo />
      <path d="M62 54 H98 L94 64 H66 Z" fill="url(#mf-madera)" stroke={T} strokeWidth="1.6" />
      <path d="M70 54 V44 H90 V54" fill="#dcaa6e" stroke={T} strokeWidth="1.4" />
      <Persona ropa={tela("cafe")} barba="#f2efe6" pelo="#e0dcd2" faja="#7a4524" x={40}>
        <path d="M63 50 Q72 46 76 38" stroke={tela("cafe")} strokeWidth="6.5" strokeLinecap="round" fill="none" />
        <circle cx="77" cy="37" r="3.4" fill="url(#mf-piel)" stroke={T} strokeWidth="1.2" />
        <path d="M77 37 L84 26" stroke="#6b4321" strokeWidth="2.6" strokeLinecap="round" />
        <rect x="80" y="20" width="10" height="6" rx="1.4" fill="#9aa0a6" stroke={T} strokeWidth="1.1" transform="rotate(-30 85 23)" />
      </Persona>
    </>
  ),
  rollo: () => (
    <>
      <Fondo />
      <circle cx="50" cy="50" r="38" fill="url(#mf-luz)" />
      <rect x="22" y="28" width="56" height="44" fill="#f6ead0" stroke={T} strokeWidth={SW} />
      {[36, 44, 52, 60].map((y) => (
        <path key={y} d={`M30 ${y} H70`} stroke="#8a7458" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="5 2.6" />
      ))}
      {[22, 78].map((x) => (
        <g key={x}>
          <rect x={x - 5} y="22" width="10" height="56" rx="5" fill="url(#mf-madera)" stroke={T} strokeWidth="1.6" />
          <rect x={x - 2} y="16" width="4" height="8" rx="1.5" fill="#6b4321" />
          <rect x={x - 2} y="76" width="4" height="8" rx="1.5" fill="#6b4321" />
        </g>
      ))}
      <path d="M62 80 Q76 70 92 54 Q90 64 76 78 Z" fill="#fff" stroke={T} strokeWidth="1.3" />
      <path d="M62 80 L58 86" stroke={T} strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
};

export const IDS_FIGURAS = Object.keys(FIGURAS);
export const tieneFigura = (id: string) => id in FIGURAS;

/** Una figura (100 × 100). */
export const Figura = memo(function Figura({ id, className, titulo }: { id: string; className?: string; titulo?: string }) {
  const f = FIGURAS[id];
  return (
    <svg viewBox="0 0 100 100" className={className} role={titulo ? "img" : undefined} aria-label={titulo} aria-hidden={titulo ? undefined : true} preserveAspectRatio="xMidYMid slice">
      {f ? f() : <rect width="100" height="100" fill="#eee" />}
    </svg>
  );
});
