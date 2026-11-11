/**
 * La portada del juego (la sala de juegos y la pantalla de inicio) y el emblema del logo. Son ilustraciones
 * vectoriales con luz de atardecer: el sol que se esconde tras el monte, las murallas de Jerusalén con sus luces, la
 * casa de Jehová con Jaquín y Boaz y las puertas de oro encendidas, el altar con su fuego, brasas y humo, sacerdotes,
 * palomas y olivos. Todo se mueve con CSS (liviano para cualquier teléfono) y se queda quieto si el teléfono pide
 * menos movimiento.
 */
import { useId } from "react";

const ESTILO = `
.tc-est{animation:tc-titila 3.4s ease-in-out infinite}
@keyframes tc-titila{50%{opacity:.2}}
.tc-rayos{transform-origin:70px 100px;animation:tc-gira 90s linear infinite}
@keyframes tc-gira{to{transform:rotate(360deg)}}
.tc-llama{transform-box:fill-box;transform-origin:50% 100%;animation:tc-llama 1.15s ease-in-out infinite alternate}
.tc-l2{animation-duration:.9s;animation-delay:-.3s}
.tc-l3{animation-duration:.7s;animation-delay:-.5s}
@keyframes tc-llama{0%{transform:scale(1,1) skewX(0deg)}35%{transform:scale(1.05,1.13) skewX(-4deg)}70%{transform:scale(.96,.93) skewX(3deg)}100%{transform:scale(1.02,1.07) skewX(-1deg)}}
.tc-brasa{animation:tc-brasa 3.6s linear infinite}
@keyframes tc-brasa{0%{transform:translate(0,0);opacity:0}12%{opacity:1}100%{transform:translate(var(--dx,6px),-58px);opacity:0}}
.tc-humo{transform-box:fill-box;transform-origin:center;animation:tc-humo 8s ease-out infinite}
@keyframes tc-humo{0%{transform:translate(0,0) scale(.45);opacity:0}15%{opacity:.4}100%{transform:translate(26px,-64px) scale(2.3);opacity:0}}
.tc-luz{animation:tc-luz 2.4s ease-in-out infinite alternate}
@keyframes tc-luz{0%{opacity:.5}100%{opacity:1}}
.tc-vuelo{animation:tc-vuelo 30s linear infinite}
@keyframes tc-vuelo{from{transform:translate(-60px,6px)}to{transform:translate(380px,-22px)}}
.tc-ala{transform-box:fill-box;transform-origin:50% 100%;animation:tc-ala .42s ease-in-out infinite alternate}
@keyframes tc-ala{to{transform:scaleY(-.55)}}
.tc-puerta{animation:tc-luz 3.2s ease-in-out infinite alternate}
@media (prefers-reduced-motion:reduce){.tc-anim *{animation:none!important}}
`;

/** La llama (base en 0,0; unos 28 de ancho y 40 de alto). */
const LLAMA = "M-14 0 C-17 -9 -12 -16 -9 -22 C-8 -16 -5 -14 -3 -17 C-5 -25 -1 -33 3 -40 C4 -31 11 -26 10 -17 C13 -19 14 -23 13 -27 C19 -18 18 -6 14 0 Z";

function Fuego({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="tc-llama">
        <path d={LLAMA} fill="#ff5a14" />
      </g>
      <g transform="scale(.72)">
        <g className="tc-llama tc-l2">
          <path d={LLAMA} fill="#ffa628" />
        </g>
      </g>
      <g transform="translate(1 0) scale(.44)">
        <g className="tc-llama tc-l3">
          <path d={LLAMA} fill="#fff1b8" />
        </g>
      </g>
    </g>
  );
}

const ESTRELLAS: [number, number, number][] = [
  [18, 12, 0.7], [42, 26, 0.5], [64, 8, 0.6], [96, 20, 0.8], [118, 6, 0.5], [142, 16, 0.6], [176, 9, 0.7], [204, 22, 0.5], [228, 7, 0.8],
  [252, 18, 0.6], [276, 10, 0.5], [300, 24, 0.7], [311, 6, 0.5], [30, 40, 0.4], [86, 38, 0.4], [236, 36, 0.4], [290, 44, 0.4], [158, 28, 0.4],
];

function Sacerdote({ x, y, s = 1, lena = false }: { x: number; y: number; s?: number; lena?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx="2.2" cy="0.3" rx="5.2" ry="1.1" fill="#2a1020" opacity=".32" />
      <path d="M-4 0 L-3 -11 Q0 -13.5 3 -11 L4 0 Z" fill="#f7efe0" />
      <path d="M0 -12.6 Q2.6 -11.8 3 -11 L4 0 L0 0 Z" fill="#3a1a20" opacity=".16" />
      <rect x="-3.4" y="-6.6" width="6.8" height="1" fill="#2a4fbf" />
      <rect x="-3.4" y="-5.6" width="6.8" height=".6" fill="#b3242f" />
      <circle cx="0" cy="-14.6" r="2" fill="#c48a5e" />
      <path d="M-2.1 -15 C-2.2 -18.4 2.2 -18.4 2.1 -15 Z" fill="#fbf8ef" />
      {lena && <rect x="-7" y="-13.6" width="11" height="2" rx="1" fill="#8a5a32" transform="rotate(-18)" />}
    </g>
  );
}

function Muralla({ x0, x1, torres }: { x0: number; x1: number; torres: number[] }) {
  const almenas: number[] = [];
  for (let x = x0; x < x1 - 2; x += 6) almenas.push(x);
  return (
    <g>
      <rect x={x0} y="114" width={x1 - x0} height="14" fill="#34183a" />
      {almenas.map((x) => (
        <rect key={x} x={x} y="111" width="3" height="3.2" fill="#34183a" />
      ))}
      <path d={`M${x0} 114.3 H${x1}`} stroke="#8b4a64" strokeWidth=".6" opacity=".7" />
      {torres.map((t) => (
        <g key={t}>
          <rect x={t} y="104" width="12" height="24" fill="#2e1534" />
          {[0, 4.5, 9].map((d) => (
            <rect key={d} x={t + d} y="101" width="3" height="3.2" fill="#2e1534" />
          ))}
          <path d={`M${t} 104.3 H${t + 12}`} stroke="#8b4a64" strokeWidth=".6" opacity=".7" />
          <rect className="tc-luz" x={t + 5.2} y="109" width="1.6" height="2.6" rx=".5" fill="#ffcf7a" style={{ animationDelay: `${(t % 7) * -0.4}s` }} />
        </g>
      ))}
    </g>
  );
}

function Columna({ c, id }: { c: number; id: (n: string) => string }) {
  return (
    <g>
      <polygon points={`${c + 4},62 ${c + 11},64 ${c + 11},128 ${c + 4},128`} fill="#2a1010" opacity=".14" />
      <rect x={c - 4} y="60" width="8" height="66" fill={`url(#${id("bronce")})`} />
      <rect x={c - 5.5} y="124" width="11" height="4" fill="#6e3a1c" />
      <path d={`M${c - 5.5} 124.3 H${c + 5.5}`} stroke="#f2b36b" strokeWidth=".5" opacity=".7" />
      <ellipse cx={c} cy="56" rx="7.2" ry="5.6" fill={`url(#${id("bronce")})`} />
      <path d={`M${c - 6} 54 Q${c} 60 ${c + 6} 54 M${c - 6} 58 Q${c} 52 ${c + 6} 58`} stroke="#5a2a12" strokeWidth=".5" fill="none" opacity=".55" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <circle cx={c - 6 + i * 3} cy="61.6" r="1.15" fill="#a3242c" />
          <circle cx={c - 6.3 + i * 3} cy="61.2" r=".35" fill="#ff9a8a" />
        </g>
      ))}
      <path d={`M${c - 5} 51.5 Q${c - 2.5} 46.5 ${c} 51 Q${c + 2.5} 46.5 ${c + 5} 51.5 Z`} fill="#f2b36b" />
    </g>
  );
}

function Olivo({ x, flip = false }: { x: number; flip?: boolean }) {
  return (
    <g transform={`translate(${x} 0) scale(${flip ? -1 : 1} 1)`} fill="#1d1224">
      <path d="M8 180 C9 168 6 160 10 150 C12 145 9 140 12 134 L15 135 C13 142 17 147 15 153 C13 162 17 170 18 180 Z" />
      <ellipse cx="6" cy="128" rx="20" ry="11" />
      <ellipse cx="22" cy="122" rx="14" ry="9" />
      <ellipse cx="-4" cy="138" rx="14" ry="8" />
      <ellipse cx="16" cy="134" rx="10" ry="6" />
      {[[-8, 124], [4, 117], [18, 114], [30, 121], [-14, 134]].map(([a, b], i) => (
        <ellipse key={i} cx={a} cy={b} rx="4" ry="1.6" transform={`rotate(${i % 2 ? 24 : -20} ${a} ${b})`} />
      ))}
    </g>
  );
}

/** Portada del juego (la sala de juegos y la pantalla de inicio). */
export function TemploCover({ className = "" }: { className?: string }) {
  const u = useId().replace(/[^a-zA-Z0-9]/g, "");
  const id = (n: string) => `tc${u}${n}`;
  const url = (n: string) => `url(#${id(n)})`;
  const rayos = Array.from({ length: 14 }, (_, i) => {
    const a = (i / 14) * Math.PI * 2;
    const p = (d: number) => `${(70 + Math.cos(a + d) * 260).toFixed(1)},${(100 + Math.sin(a + d) * 260).toFixed(1)}`;
    return { pts: `70,100 ${p(-0.035)} ${p(0.035)}`, op: i % 2 ? 0.045 : 0.075 };
  });
  const lineas: number[] = [];
  for (let x = -160; x <= 480; x += 40) lineas.push(x);
  return (
    <svg viewBox="0 0 320 180" className={`tc-anim ${className}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <style>{ESTILO}</style>
      <defs>
        <linearGradient id={id("cielo")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0f0b2a" />
          <stop offset=".3" stopColor="#2e1a5c" />
          <stop offset=".52" stopColor="#8e3b6e" />
          <stop offset=".66" stopColor="#e0744a" />
          <stop offset=".72" stopColor="#f7b35e" />
          <stop offset="1" stopColor="#ffd98e" />
        </linearGradient>
        <radialGradient id={id("sol")} gradientUnits="userSpaceOnUse" cx="70" cy="100" r="150">
          <stop offset="0" stopColor="#fff4cf" stopOpacity="1" />
          <stop offset=".1" stopColor="#ffe08a" stopOpacity=".85" />
          <stop offset=".34" stopColor="#ffb35e" stopOpacity=".32" />
          <stop offset="1" stopColor="#ff8a3d" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id("piedra")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff3dc" />
          <stop offset=".6" stopColor="#f1d3a8" />
          <stop offset="1" stopColor="#d8ad83" />
        </linearGradient>
        <linearGradient id={id("piedra2")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f7e2bf" />
          <stop offset="1" stopColor="#c99c7c" />
        </linearGradient>
        <linearGradient id={id("sombra")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#b88a78" />
          <stop offset="1" stopColor="#8f6273" />
        </linearGradient>
        <linearGradient id={id("oro")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff3c4" />
          <stop offset=".5" stopColor="#f3c95a" />
          <stop offset="1" stopColor="#a8740f" />
        </linearGradient>
        <linearGradient id={id("bronce")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#7a3e1c" />
          <stop offset=".3" stopColor="#f2b36b" />
          <stop offset=".55" stopColor="#c4783a" />
          <stop offset="1" stopColor="#5a2a12" />
        </linearGradient>
        <linearGradient id={id("bronceV")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e9a45c" />
          <stop offset="1" stopColor="#6e3418" />
        </linearGradient>
        <radialGradient id={id("puerta")} cx=".5" cy=".72" r=".75">
          <stop offset="0" stopColor="#fffbe8" />
          <stop offset=".5" stopColor="#ffd978" />
          <stop offset="1" stopColor="#e39a2a" />
        </radialGradient>
        <linearGradient id={id("cono")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe3a0" stopOpacity=".42" />
          <stop offset="1" stopColor="#ffe3a0" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={id("brillo")} cx=".5" cy=".6" r=".5">
          <stop offset="0" stopColor="#ffe9a8" stopOpacity=".95" />
          <stop offset=".4" stopColor="#ff9a3a" stopOpacity=".45" />
          <stop offset="1" stopColor="#ff6a1a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id("suelo")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e7c999" />
          <stop offset=".5" stopColor="#c99d70" />
          <stop offset="1" stopColor="#8e6248" />
        </linearGradient>
        <radialGradient id={id("vineta")} cx=".5" cy=".42" r=".78">
          <stop offset=".62" stopColor="#0c0616" stopOpacity="0" />
          <stop offset="1" stopColor="#0c0616" stopOpacity=".62" />
        </radialGradient>
      </defs>

      {/* el cielo del atardecer, las estrellas que salen y el sol detrás del monte */}
      <rect width="320" height="180" fill={url("cielo")} />
      {ESTRELLAS.map(([x, y, r], i) => (
        <circle key={i} className="tc-est" cx={x} cy={y} r={r} fill="#fff6dc" style={{ animationDelay: `${(i * -0.37).toFixed(2)}s` }} />
      ))}
      <g className="tc-rayos">
        {rayos.map((r, i) => (
          <polygon key={i} points={r.pts} fill="#ffe6a8" opacity={r.op} />
        ))}
      </g>
      <rect width="320" height="180" fill={url("sol")} />
      <circle cx="70" cy="100" r="20" fill="#fff0c0" opacity=".35" />
      <circle cx="70" cy="100" r="12.5" fill="#fff4d2" />

      {/* el monte de los Olivos y la ciudad */}
      <path d="M0 104 C30 98 52 95 80 99 C108 103 124 96 150 97 C180 98 200 92 232 95 C262 98 290 94 320 99 V128 H0 Z" fill="#6a2c5c" opacity=".88" />
      <path d="M0 112 C40 106 70 109 100 110 C140 111 170 105 210 108 C250 111 280 106 320 109 V128 H0 Z" fill="#47204c" />
      {[[228, 106, 12], [244, 103, 10], [286, 105, 11]].map(([x, y, w]) => (
        <rect key={x} x={x} y={y} width={w} height={128 - y} fill="#2b1431" />
      ))}
      <Muralla x0={0} x1={100} torres={[8, 56]} />
      <Muralla x0={220} x1={320} torres={[252, 300]} />
      {[[34, 119], [84, 118], [236, 120], [282, 118]].map(([x, y], i) => (
        <rect key={i} className="tc-luz" x={x} y={y} width="1.6" height="2.4" rx=".5" fill="#ffcf7a" style={{ animationDelay: `${i * -0.7}s` }} />
      ))}

      {/* el atrio */}
      <rect x="0" y="128" width="320" height="52" fill={url("suelo")} />
      {lineas.map((x) => (
        <path key={x} d={`M${(160 + (x - 160) * 0.25).toFixed(1)} 128 L${x} 180`} stroke="#5a321e" strokeWidth=".5" opacity=".22" />
      ))}
      {[134, 141, 150, 161, 175].map((y) => (
        <path key={y} d={`M0 ${y} H320`} stroke="#5a321e" strokeWidth=".5" opacity=".18" />
      ))}
      <polygon points="200,128 226,128 320,150 282,150" fill="#2a1226" opacity=".2" />

      {/* la casa de Jehová: las cámaras de los lados, el templo y el pórtico */}
      <rect x="94" y="90" width="14" height="38" fill={url("piedra")} />
      <rect x="212" y="90" width="14" height="38" fill={url("sombra")} />
      {[103, 116].map((y) => (
        <path key={y} d={`M94 ${y} H108 M212 ${y} H226`} stroke="#7a4a3a" strokeWidth=".5" opacity=".35" />
      ))}
      {[97, 110].map((y) => (
        <g key={y}>
          <rect className="tc-luz" x="99.6" y={y} width="2" height="3.4" fill="#ffcf7a" style={{ animationDelay: `${y * -0.05}s` }} />
          <rect className="tc-luz" x="218.4" y={y} width="2" height="3.4" fill="#ffcf7a" style={{ animationDelay: `${y * -0.03}s` }} />
        </g>
      ))}
      <rect x="108" y="68" width="104" height="60" fill={url("piedra2")} />
      <rect x="106" y="65" width="108" height="4" fill={url("oro")} />
      {[74, 80, 86, 92, 98, 104, 110, 116, 122].map((y) => (
        <path key={y} d={`M108 ${y} H212`} stroke="#9a6a4a" strokeWidth=".4" opacity=".14" />
      ))}
      {[116, 124, 196, 204].map((x) => (
        <rect key={x} x={x} y="74" width="2.2" height="8" rx=".6" fill="#6b3a3a" opacity=".6" />
      ))}
      <polygon points="188,68 200,68 200,128 188,128" fill="#3a1a20" opacity=".13" />
      <rect x="132" y="34" width="56" height="94" fill={url("piedra")} />
      <rect x="176" y="34" width="12" height="94" fill="#3a1a20" opacity=".08" />
      {[46, 52, 58, 64, 70, 76, 82].map((y) => (
        <path key={y} d={`M132 ${y} H188`} stroke="#9a6a4a" strokeWidth=".4" opacity=".13" />
      ))}
      <rect x="128" y="29" width="64" height="6" fill={url("oro")} />
      <path d="M128 29.5 H192" stroke="#fff6d6" strokeWidth=".6" opacity=".85" />
      {[136, 143, 150, 157, 164, 171, 178, 185].map((x) => (
        <circle key={x} cx={x - 0.5} cy="40" r="1.3" fill={url("oro")} />
      ))}

      {/* las puertas de oro, encendidas por dentro, y su luz sobre las gradas */}
      <polygon points="151,128 169,128 198,180 122,180" fill={url("cono")} />
      <rect x="147" y="84" width="26" height="44" fill={url("oro")} />
      <rect x="151" y="88" width="18" height="40" fill={url("puerta")} />
      <rect className="tc-puerta" x="151" y="88" width="18" height="40" fill="#fff6d0" opacity=".35" />
      <path d="M160 88 V128" stroke="#c07a1a" strokeWidth=".6" opacity=".6" />
      {[96, 106, 116].map((y) => (
        <g key={y} stroke="#c07a1a" strokeWidth=".5" fill="none" opacity=".55">
          <circle cx="155.5" cy={y} r="1.6" />
          <circle cx="164.5" cy={y} r="1.6" />
        </g>
      ))}
      <ellipse cx="160" cy="130" rx="26" ry="4" fill="#ffe2a0" opacity=".5" />
      <Columna c={141} id={id} />
      <Columna c={179} id={id} />
      <rect x="128" y="128" width="64" height="3" fill="#efd9b3" />
      <rect x="124" y="131" width="72" height="3" fill="#e2c79c" />
      <rect x="120" y="134" width="80" height="3" fill="#d3b386" />
      {[128.3, 131.3, 134.3].map((y, i) => (
        <path key={y} d={`M${128 - i * 4} ${y} H${192 + i * 4}`} stroke="#fff8e6" strokeWidth=".5" opacity=".6" />
      ))}

      {/* el altar del holocausto con su fuego, brasas y humo */}
      <circle cx="109" cy="134" r="32" fill={url("brillo")} />
      <ellipse cx="114" cy="166.5" rx="25" ry="3" fill="#2a1020" opacity=".35" />
      <polygon points="122,148 128,145 128,163 122,166" fill="#5a2a12" />
      <polygon points="90,148 96,145 128,145 122,148" fill="#f2b36b" />
      <rect x="90" y="148" width="32" height="18" fill={url("bronceV")} />
      <rect x="90" y="155" width="32" height="3" fill="#5a2a12" opacity=".5" />
      {[94, 99, 104, 109, 114, 119].map((x) => (
        <path key={x} d={`M${x} 155 V158`} stroke="#f2b36b" strokeWidth=".4" opacity=".5" />
      ))}
      <rect x="95" y="141" width="3" height="4" rx=".8" fill="#d08a4a" />
      <rect x="125" y="141" width="3" height="4" rx=".8" fill="#d08a4a" />
      <Fuego x={109} y={146.5} s={0.92} />
      <rect x="89" y="143" width="4" height="5.5" rx="1" fill="#f2b36b" />
      <rect x="119" y="143" width="4" height="5.5" rx="1" fill="#f2b36b" />
      {[0, 1, 2].map((i) => (
        <circle key={i} className="tc-humo" cx={110 + i * 3} cy="108" r={5 + i * 2} fill="#e3d2cc" style={{ animationDelay: `${i * -2.7}s` }} />
      ))}
      {[-8, -4, -1, 2, 5, 8, -6, 3, 0, 6].map((dx, i) => (
        <circle
          key={i}
          className="tc-brasa"
          cx={109 + dx}
          cy="138"
          r={i % 3 ? 0.7 : 1}
          fill={i % 2 ? "#ffd36b" : "#ff8a2a"}
          style={{ animationDelay: `${(i * -0.37).toFixed(2)}s`, ["--dx" as string]: `${(dx * 0.9 + (i % 2 ? 4 : -3)).toFixed(1)}px` }}
        />
      ))}

      {/* los sacerdotes que sirven */}
      <Sacerdote x={136} y={168} s={1.15} lena />
      <Sacerdote x={201} y={150} s={0.95} />
      <Sacerdote x={214} y={157} s={1.05} />

      {/* palomas que cruzan el cielo */}
      <g className="tc-vuelo" style={{ animationDelay: "-9s" }}>
        {[[0, 44, 1], [13, 38, 0.8], [24, 49, 0.9]].map(([x, y, s], i) => (
          <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
            <path className="tc-ala" d="M0 0 Q-4 -5 -9 -3 Q-5 -1 0 0 Z" fill="#fff8ec" style={{ animationDelay: `${i * -0.13}s` }} />
            <path className="tc-ala" d="M0 0 Q4 -5 9 -3 Q5 -1 0 0 Z" fill="#fff8ec" style={{ animationDelay: `${i * -0.13}s` }} />
            <ellipse cx="0" cy=".4" rx="2.6" ry="1" fill="#fff8ec" />
          </g>
        ))}
      </g>

      {/* olivos que enmarcan, y la luz que se apaga en los bordes */}
      <Olivo x={-6} />
      <Olivo x={326} flip />
      <rect width="320" height="180" fill={url("vineta")} />
    </svg>
  );
}

/** El emblema del logo: el arco de la puerta del templo en oro, el altar con su fuego vivo y dos ramas de olivo. */
export function EmblemaTemplo({ className = "" }: { className?: string }) {
  const u = useId().replace(/[^a-zA-Z0-9]/g, "");
  const id = (n: string) => `em${u}${n}`;
  const url = (n: string) => `url(#${id(n)})`;
  const hojas = (lado: 1 | -1) =>
    [
      [15, 66, -30], [12, 59, -40], [10.5, 52, -52], [10.5, 45, -64], [12, 38, -78], [15, 32, -92],
    ].map(([x, y, r], i) => {
      const cx = lado === 1 ? x : 80 - x;
      const rot = lado === 1 ? r : -r;
      return (
        <g key={`${lado}${i}`}>
          <ellipse cx={cx - lado * 2.6} cy={y} rx="1.3" ry="3.4" fill="#d8c46a" transform={`rotate(${rot - 35 * lado} ${cx - lado * 2.6} ${y})`} />
          <ellipse cx={cx + lado * 2.4} cy={y - 1} rx="1.3" ry="3.4" fill="#a99a3e" transform={`rotate(${rot + 35 * lado} ${cx + lado * 2.4} ${y - 1})`} />
        </g>
      );
    });
  return (
    <svg viewBox="0 0 80 80" className={`tc-anim ${className}`} aria-hidden="true">
      <style>{ESTILO}</style>
      <defs>
        <radialGradient id={id("halo")} cx=".5" cy=".55" r=".5">
          <stop offset="0" stopColor="#ffcf6a" stopOpacity=".55" />
          <stop offset="1" stopColor="#ffcf6a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id("oro")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff6d2" />
          <stop offset=".45" stopColor="#f3c95a" />
          <stop offset="1" stopColor="#9c6a0c" />
        </linearGradient>
        <linearGradient id={id("noche")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a1d52" />
          <stop offset="1" stopColor="#140a20" />
        </linearGradient>
        <radialGradient id={id("fuego")} cx=".5" cy=".6" r=".5">
          <stop offset="0" stopColor="#ffe9a8" stopOpacity=".95" />
          <stop offset=".5" stopColor="#ff8a2a" stopOpacity=".4" />
          <stop offset="1" stopColor="#ff6a1a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="40" cy="42" r="38" fill={url("halo")} />
      <path d="M14 74 C9 62 7 48 13 34" stroke="#b8a24a" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <path d="M66 74 C71 62 73 48 67 34" stroke="#b8a24a" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      {hojas(1)}
      {hojas(-1)}
      <path d="M18 74 V36 C18 21 28 10 40 7 C52 10 62 21 62 36 V74 Z" fill={url("oro")} />
      <path d="M22.5 74 V37 C22.5 25 30.5 16 40 13 C49.5 16 57.5 25 57.5 37 V74 Z" fill={url("noche")} />
      <path d="M19.5 36 C19.5 22 28.5 12 40 9" stroke="#fffbe6" strokeWidth=".8" fill="none" opacity=".75" />
      {[[30, 24], [48, 21], [40, 18], [52, 33], [28, 36]].map(([x, y], i) => (
        <circle key={i} className="tc-est" cx={x} cy={y} r=".7" fill="#fff6dc" style={{ animationDelay: `${i * -0.6}s` }} />
      ))}
      <circle cx="40" cy="52" r="16" fill={url("fuego")} />
      <Fuego x={40} y={61} s={0.62} />
      <rect x="30" y="60" width="20" height="2.6" rx=".6" fill="#f2b36b" />
      <rect x="29.4" y="57.4" width="2.6" height="3" rx=".6" fill="#f2b36b" />
      <rect x="48" y="57.4" width="2.6" height="3" rx=".6" fill="#f2b36b" />
      <rect x="31" y="62.6" width="18" height="10" fill="#b8642c" />
      <rect x="31" y="66.4" width="18" height="1.6" fill="#5a2a12" opacity=".55" />
      <rect x="12" y="72" width="56" height="5" rx="1.6" fill={url("oro")} />
      <path d="M13 72.6 H67" stroke="#fffbe6" strokeWidth=".6" opacity=".8" />
    </svg>
  );
}

/** El emblema de «Jerusalén en línea»: un medallón de oro con la ciudad amurallada y el templo bajo el cielo de noche. */
export function EmblemaJerusalen({ className = "" }: { className?: string }) {
  const u = useId().replace(/[^a-zA-Z0-9]/g, "");
  const id = (n: string) => `ej${u}${n}`;
  const url = (n: string) => `url(#${id(n)})`;
  const almenas = [7, 11, 15, 33, 37, 41];
  return (
    <svg viewBox="0 0 48 48" className={`tc-anim ${className}`} aria-hidden="true">
      <style>{ESTILO}</style>
      <defs>
        <linearGradient id={id("oro")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff3c4" />
          <stop offset=".45" stopColor="#e9b949" />
          <stop offset=".75" stopColor="#8a5a0c" />
          <stop offset="1" stopColor="#f3c95a" />
        </linearGradient>
        <linearGradient id={id("cielo")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0d1838" />
          <stop offset=".65" stopColor="#24407a" />
          <stop offset="1" stopColor="#6a4a7a" />
        </linearGradient>
        <linearGradient id={id("muro")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe7a0" />
          <stop offset="1" stopColor="#c98a24" />
        </linearGradient>
        <clipPath id={id("dentro")}>
          <circle cx="24" cy="24" r="20.4" />
        </clipPath>
      </defs>
      <circle cx="24" cy="24" r="23" fill={url("oro")} />
      <g clipPath={url("dentro")}>
        <rect width="48" height="48" fill={url("cielo")} />
        {[[12, 12], [34, 10], [20, 8], [39, 18], [9, 21]].map(([x, y], i) => (
          <circle key={i} className="tc-est" cx={x} cy={y} r=".6" fill="#fff6dc" style={{ animationDelay: `${i * -0.7}s` }} />
        ))}
        <circle cx="35" cy="13.5" r="3" fill="#fff4d2" />
        <circle cx="36.4" cy="12.6" r="2.6" fill="#16264f" />
        <rect x="17" y="22" width="14" height="12" fill={url("muro")} />
        <rect x="20.5" y="15" width="7" height="19" fill={url("muro")} />
        <rect x="19.8" y="14" width="8.4" height="1.6" fill="#fff6d6" />
        <rect className="tc-puerta" x="22.9" y="27" width="2.2" height="4.6" fill="#fff8e0" />
        <rect x="4" y="33" width="40" height="15" fill={url("muro")} />
        {almenas.map((x) => (
          <rect key={x} x={x} y="31.4" width="2.2" height="1.8" fill="#ffe7a0" />
        ))}
        <rect x="9" y="29" width="5" height="5" fill={url("muro")} />
        <rect x="34" y="29" width="5" height="5" fill={url("muro")} />
        <path d="M4 33.3 H44" stroke="#fffbe6" strokeWidth=".5" opacity=".8" />
        <rect x="22.4" y="37" width="3.2" height="11" rx="1.6" fill="#7a4a12" opacity=".75" />
      </g>
      <circle cx="24" cy="24" r="20.4" fill="none" stroke="#000" strokeOpacity=".3" strokeWidth=".6" />
      <path d="M6.5 17 A19 19 0 0 1 17 6.5" stroke="#fff" strokeWidth="1" fill="none" opacity=".55" strokeLinecap="round" />
    </svg>
  );
}
