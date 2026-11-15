/**
 * Las escaleras de Jacob en la pantalla (shared/mesa/escaleras.ts): el tablero de 100 casillas en zigzag, las
 * escaleras doradas (con su luz arriba) y las serpientes, el dado grande que rueda, y las fichas que saltan casilla
 * por casilla y después suben por la escalera o se deslizan por la serpiente. Cada atajo muestra su lección.
 *
 * El tablero es como los de verdad: el marco de madera con la franja de la salida (cada jugador en su hoyo), las losas
 * de mosaico con su canto, las escaleras con largueros de madera dorada y su sombra, y las serpientes con su grosor (de
 * la cabeza a la punta de la cola), sus anillos y su lomo con luz.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { ESCALERAS, ESCALERAS_JACOB, SERPIENTES, VERSO_LEVANTA, atajoEn, celdaDe, type EscalerasVista, type EvEscaleras, type JugadaEscaleras } from "@shared/mesa/escaleras";
import { Dado } from "./Dado";
import { mesaSonido } from "./mesa-sonido";
import { Asiento, AvisoMesa, BotonSonido, Confeti, RelojAnillo, Sello, colorDe, quedaMs, tono, useAhora, useAngosto, useAvisoCorto, useEventosNuevos, useMusicaDeJuego, useGolpeFinal, type PropsMesa } from "./vida";

type P = { x: number; y: number };
const centro = (c: number): P => {
  if (c <= 0) return { x: 20, y: 106.4 };
  const { fila, col } = celdaDe(c);
  return { x: col * 10 + 5, y: (9 - fila) * 10 + 5 };
};
/** El lugar de cada jugador en la salida, la franja de abajo del tablero (cada uno en su hoyo). */
const salida = (a: number): P => ({ x: 20 + a * 6, y: 106.4 });

/** El cuerpo de una serpiente: una curva que ondula de la cabeza a la cola (con más puntos si es larga). */
function caminoSerpiente(de: number, a: number): { d: string; puntos: P[] } {
  const p0 = centro(de);
  const p1 = centro(a);
  const dx = p1.x - p0.x;
  const dy = p1.y - p0.y;
  const largo = Math.hypot(dx, dy);
  const nx = -dy / largo;
  const ny = dx / largo;
  const ondas = Math.max(2, Math.round(largo / 14));
  const n = Math.max(40, Math.round(largo * 2));
  const puntos: P[] = [];
  for (let k = 0; k <= n; k++) {
    const t = k / n;
    const amp = Math.sin(t * Math.PI) * 3.4;
    const w = Math.sin(t * ondas * Math.PI) * amp;
    puntos.push({ x: p0.x + dx * t + nx * w, y: p0.y + dy * t + ny * w });
  }
  return { d: `M${puntos.map((p) => `${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" L")}`, puntos };
}

const fmt = (p: P) => `${p.x.toFixed(2)} ${p.y.toFixed(2)}`;

/**
 * El cuerpo de la serpiente con su grosor, como en los tableros de verdad: ancha detrás de la cabeza y fina hasta la
 * punta de la cola, con sus anillos oscuros cada tanto (medidos por lo largo, no por los puntos) y el lomo con luz.
 */
function cuerpoSerpiente(puntos: P[]) {
  const n = puntos.length;
  const izq: P[] = [];
  const der: P[] = [];
  const s: number[] = [0];
  for (let k = 1; k < n; k++) s.push(s[k - 1] + Math.hypot(puntos[k].x - puntos[k - 1].x, puntos[k].y - puntos[k - 1].y));
  const total = s[n - 1] || 1;
  const ancho: number[] = [];
  for (let k = 0; k < n; k++) {
    const a = puntos[Math.max(0, k - 1)];
    const b = puntos[Math.min(n - 1, k + 1)];
    const tx = b.x - a.x;
    const ty = b.y - a.y;
    const l = Math.hypot(tx, ty) || 1;
    const t = s[k] / total;
    // el cuello un poco más fino que el cuerpo, y después se afina hasta la cola
    const w = 0.26 + 1.18 * Math.pow(1 - t, 0.7) * (t < 0.05 ? 0.86 + t * 2.8 : 1);
    ancho.push(w);
    izq.push({ x: puntos[k].x + (-ty / l) * w, y: puntos[k].y + (tx / l) * w });
    der.push({ x: puntos[k].x - (-ty / l) * w, y: puntos[k].y - (tx / l) * w });
  }
  const ult = puntos[n - 1];
  const pen = puntos[n - 2];
  const lc = Math.hypot(ult.x - pen.x, ult.y - pen.y) || 1;
  const punta = { x: ult.x + ((ult.x - pen.x) / lc) * 1.1, y: ult.y + ((ult.y - pen.y) / lc) * 1.1 };
  const contorno = `M${izq.map(fmt).join(" L")} L${fmt(punta)} L${[...der].reverse().map(fmt).join(" L")} Z`;
  // los anillos: tramos de 1,1 de cada 2,8 de largo, sin tocar la cabeza ni la punta de la cola
  const anillos: string[] = [];
  let desde = -1;
  for (let k = 0; k < n - 1; k++) {
    const medio = (s[k] + s[k + 1]) / 2;
    const t = medio / total;
    const en = t > 0.07 && t < 0.93 && (medio + 0.6) % 2.8 < 1.1;
    if (en && desde < 0) desde = k;
    if ((!en || k === n - 2) && desde >= 0) {
      const hasta = en ? k + 1 : k;
      const l = izq.slice(desde, hasta + 1);
      const r = der.slice(desde, hasta + 1).reverse();
      if (l.length >= 2) anillos.push(`M${[...l, ...r].map(fmt).join(" L")} Z`);
      desde = -1;
    }
  }
  // la luz del lomo: la línea del medio corrida hacia arriba y a la izquierda (de donde viene la luz)
  const lomo: P[] = [];
  for (let k = 0; k < n; k++) {
    const t = s[k] / total;
    if (t < 0.04 || t > 0.82) continue;
    lomo.push({ x: puntos[k].x - ancho[k] * 0.32, y: puntos[k].y - ancho[k] * 0.42 });
  }
  return { contorno, anillos, lomo: lomo.length > 1 ? `M${lomo.map(fmt).join(" L")}` : "" };
}

const COLOR_SERPIENTE = ["#5f9e3a", "#c46a2a", "#7a54b8", "#3a8fb0", "#b8432f", "#4d7f2a", "#a8742a", "#2f7a6a"];
/** Los colores claros de las casillas de color (el resto son de color crema), como un mosaico de barro pintado. */
const TONOS_CASILLA = ["#f0d9a6", "#dde3b8", "#f1cfb4", "#d3e1df"];

function Tablero({ fichas, ganador, resaltar, turno }: { fichas: { a: number; p: P }[]; ganador: number | null; resaltar: string | null; turno: number | null }) {
  const serpientes = useMemo(
    () =>
      SERPIENTES.map((s, i) => {
        const camino = caminoSerpiente(s.de, s.a);
        return { s, ...camino, ...cuerpoSerpiente(camino.puntos), color: COLOR_SERPIENTE[i % COLOR_SERPIENTE.length] };
      }),
    [],
  );
  return (
    <svg viewBox="-3 -3 106 115" className="h-full w-full" role="img" aria-label="El tablero de las escaleras de Jacob">
      <defs>
        <linearGradient id="esc-oro" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff1a8" />
          <stop offset=".5" stopColor="#e5b23a" />
          <stop offset="1" stopColor="#a36f0f" />
        </linearGradient>
        <radialGradient id="esc-luz" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#fffbe0" stopOpacity=".95" />
          <stop offset="1" stopColor="#ffe9a0" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="esc-ficha" cx=".35" cy=".3" r=".75">
          <stop offset="0" stopColor="#fff" stopOpacity=".9" />
          <stop offset=".35" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="esc-ficha-cuerpo" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity=".38" />
          <stop offset=".45" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".25" />
        </linearGradient>
        <linearGradient id="esc-marco" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9a6232" />
          <stop offset=".5" stopColor="#7a4a22" />
          <stop offset="1" stopColor="#4e2c12" />
        </linearGradient>
        <radialGradient id="esc-cabeza" cx=".4" cy=".35" r=".7">
          <stop offset="0" stopColor="#fff" stopOpacity=".35" />
          <stop offset=".6" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* el marco de madera, con su canto, y la franja de la salida abajo */}
      <rect x="-3" y="-3" width="106" height="115" rx="4" fill="url(#esc-marco)" />
      <rect x="-2.4" y="-2.4" width="104.8" height="113.8" rx="3.4" fill="none" stroke="#c48a52" strokeWidth=".35" opacity=".55" />
      <rect x="-.9" y="-.9" width="101.8" height="101.8" rx="1" fill="#3a2210" />
      <rect x="-.9" y="102" width="101.8" height="7.8" rx="1.6" fill="#4a2c14" />
      <rect x="-.9" y="102" width="101.8" height="7.8" rx="1.6" fill="none" stroke="#2a180a" strokeWidth=".4" />
      <text x="1.6" y="107.4" fontSize="2.7" fontWeight="900" letterSpacing=".35" fill="#f3d9a4" fontFamily="Georgia, serif">
        SALIDA
      </text>
      {fichas.map(({ a }) => {
        const q = salida(a);
        return <ellipse key={a} cx={q.x} cy={q.y + 2.4} rx="2.5" ry=".85" fill="#2a180a" opacity=".55" />;
      })}
      {[...Array(100)].map((_, i) => {
        const c = i + 1;
        const { fila, col } = celdaDe(c);
        const x = col * 10;
        const y = (9 - fila) * 10;
        const par = (fila + col) % 2 === 0;
        const at = atajoEn(c);
        const fondo = c === 100 ? "#ffe9a0" : par ? "#fbf2dd" : TONOS_CASILLA[(Math.floor(col / 2) + fila) % TONOS_CASILLA.length];
        return (
          <g key={c}>
            <rect x={x} y={y} width="10" height="10" fill={fondo} />
            {/* el canto de cada losa: luz arriba y a la izquierda, sombra abajo y a la derecha */}
            <path d={`M${x + 0.2} ${y + 9.8} L${x + 0.2} ${y + 0.2} L${x + 9.8} ${y + 0.2}`} fill="none" stroke="#fff" strokeWidth=".35" opacity=".55" />
            <path d={`M${x + 0.2} ${y + 9.8} L${x + 9.8} ${y + 9.8} L${x + 9.8} ${y + 0.2}`} fill="none" stroke="#8a6a3a" strokeWidth=".3" opacity=".35" />
            {at && <rect x={x + 0.9} y={y + 0.9} width="8.2" height="8.2" rx="1.4" fill="none" stroke={at.sube ? "#d9a53a" : "#c46a5a"} strokeWidth=".35" strokeDasharray="1 .8" opacity=".7" />}
            <text x={x + 1.1} y={y + 3.4} fontSize="2.9" fontWeight="800" fill="#5a3c18" stroke="#fffaf0" strokeWidth=".55" strokeLinejoin="round" paintOrder="stroke" fontFamily="Georgia, serif">
              {c}
            </text>
          </g>
        );
      })}
      <rect x="0" y="0" width="100" height="100" fill="none" stroke="#2a180a" strokeWidth=".5" />
      {/* la meta: la corona del vencedor (sin cruz) */}
      <g transform={`translate(${centro(100).x} ${centro(100).y + 0.6})`}>
        <circle r="6" fill="url(#esc-luz)" />
        <path d="M-3.4 1.4 L-3.8 -2.2 L-1.8 -0.4 L0 -3 L1.8 -0.4 L3.8 -2.2 L3.4 1.4 Z" fill="url(#esc-oro)" stroke="#6a4a1a" strokeWidth=".35" strokeLinejoin="round" />
      </g>
      {/* las escaleras de Jacob: dos largueros de madera dorada con su canto y su luz, los peldaños, y la sombra en las losas */}
      {ESCALERAS_JACOB.map((e) => {
        const p0 = centro(e.de);
        const p1 = centro(e.a);
        const dx = p1.x - p0.x;
        const dy = p1.y - p0.y;
        const l = Math.hypot(dx, dy);
        const nx = (-dy / l) * 1.7;
        const ny = (dx / l) * 1.7;
        const peldanos = Math.max(3, Math.floor(l / 3.2));
        const brilla = resaltar === e.id;
        const rieles = [1, -1].map((sg) => ({ x1: p0.x + nx * sg, y1: p0.y + ny * sg, x2: p1.x + nx * sg, y2: p1.y + ny * sg }));
        const pel = [...Array(peldanos)].map((_, k) => {
          const u = (k + 0.5) / peldanos;
          const x = p0.x + dx * u;
          const y = p0.y + dy * u;
          return { x1: x + nx, y1: y + ny, x2: x - nx, y2: y - ny };
        });
        return (
          <g key={e.id} opacity={brilla ? 1 : 0.97}>
            <circle cx={p1.x} cy={p1.y} r={brilla ? 7 : 5} fill="url(#esc-luz)" />
            <g transform="translate(.7 .95)" stroke="#2a1a10" strokeLinecap="round" opacity=".24">
              {rieles.map((r, k) => (
                <line key={k} {...r} strokeWidth="1.7" />
              ))}
              {pel.map((r, k) => (
                <line key={k} {...r} strokeWidth=".9" />
              ))}
            </g>
            {pel.map((r, k) => (
              <g key={k} strokeLinecap="round">
                <line {...r} stroke="#6a4a1a" strokeWidth=".95" />
                <line {...r} stroke="#dba640" strokeWidth=".55" />
                <line x1={r.x1} y1={r.y1 - 0.13} x2={r.x2} y2={r.y2 - 0.13} stroke="#fff0b8" strokeWidth=".16" opacity=".8" />
              </g>
            ))}
            {rieles.map((r, k) => (
              <g key={k} strokeLinecap="round">
                <line {...r} stroke="#5a3a12" strokeWidth="1.7" />
                <line {...r} stroke="#d9a53a" strokeWidth="1.05" />
                <line x1={r.x1 - 0.2} y1={r.y1 - 0.2} x2={r.x2 - 0.2} y2={r.y2 - 0.2} stroke="#fff3c0" strokeWidth=".3" opacity=".85" />
              </g>
            ))}
          </g>
        );
      })}
      {/* las serpientes: el cuerpo con su grosor y sus anillos, la sombra en las losas y la cabeza con sus ojos */}
      {serpientes.map(({ s, puntos, contorno, anillos, lomo, color }) => {
        const cab = puntos[0];
        const sig = puntos[Math.min(3, puntos.length - 1)];
        const ang = (Math.atan2(cab.y - sig.y, cab.x - sig.x) * 180) / Math.PI;
        const brilla = resaltar === s.id;
        return (
          <g key={s.id} opacity={brilla ? 1 : 0.97}>
            <path d={contorno} transform="translate(.65 .9)" fill="#2a1a10" opacity=".24" />
            <path d={contorno} fill={color} stroke="#2a1a10" strokeWidth=".32" strokeLinejoin="round" />
            {anillos.map((d, k) => (
              <path key={k} d={d} fill={tono(color, 0.58)} />
            ))}
            {lomo && <path d={lomo} fill="none" stroke="#fff" strokeWidth=".42" strokeLinecap="round" strokeLinejoin="round" opacity=".38" />}
            <g transform={`translate(${cab.x} ${cab.y}) rotate(${ang})`}>
              <ellipse cx=".75" cy=".9" rx="2.7" ry="2.05" fill="#2a1a10" opacity=".24" />
              <path d="M-1.6 0 C-1.6 -1.9 .2 -2.15 1.5 -1.7 C2.6 -1.3 3.1 -.6 3.1 0 C3.1 .6 2.6 1.3 1.5 1.7 C.2 2.15 -1.6 1.9 -1.6 0 Z" fill={color} stroke="#2a1a10" strokeWidth=".35" />
              <path d="M-1.6 0 C-1.6 -1.9 .2 -2.15 1.5 -1.7 C2.6 -1.3 3.1 -.6 3.1 0 C3.1 .6 2.6 1.3 1.5 1.7 C.2 2.15 -1.6 1.9 -1.6 0 Z" fill="url(#esc-cabeza)" />
              <ellipse cx="1.15" cy="-.95" rx=".62" ry=".58" fill="#fffbe8" stroke="#2a1a10" strokeWidth=".12" />
              <ellipse cx="1.15" cy=".95" rx=".62" ry=".58" fill="#fffbe8" stroke="#2a1a10" strokeWidth=".12" />
              <ellipse cx="1.32" cy="-.95" rx=".2" ry=".42" fill="#111" />
              <ellipse cx="1.32" cy=".95" rx=".2" ry=".42" fill="#111" />
              <circle cx="1.22" cy="-1.1" r=".12" fill="#fff" />
              <circle cx="1.22" cy=".8" r=".12" fill="#fff" />
              <circle cx="2.6" cy="-.35" r=".11" fill="#2a1a10" />
              <circle cx="2.6" cy=".35" r=".11" fill="#2a1a10" />
              <path d="M3.05 0 L3.95 0 L4.45 -.45 M3.95 0 L4.45 .45" fill="none" stroke="#d9483a" strokeWidth=".28" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </g>
        );
      })}
      {/* las fichas: un peón con su base, su luz y su sombra; la del que tira tiene un anillo dorado que late */}
      {fichas.map(({ a, p }) => (
        <g key={a} transform={`translate(${p.x} ${p.y})`}>
          <ellipse cx="0" cy="3" rx="2.7" ry=".95" fill="#000" opacity=".32" />
          {turno === a && <ellipse cx="0" cy="2.6" rx="3.4" ry="1.25" fill="none" stroke="#f1c232" strokeWidth=".45" className="mesa-late" style={{ transformOrigin: "0px 2.6px" }} />}
          <ellipse cx="0" cy="2.55" rx="2.55" ry=".9" fill={tono(colorDe(a), 0.6)} stroke="#2a1a10" strokeWidth=".3" />
          <path d="M-2.3 2.45 Q-2.5 -.4 -1.05 -1.2 L1.05 -1.2 Q2.5 -.4 2.3 2.45 Z" fill={colorDe(a)} stroke="#2a1a10" strokeWidth=".35" strokeLinejoin="round" />
          <path d="M-2.3 2.45 Q-2.5 -.4 -1.05 -1.2 L1.05 -1.2 Q2.5 -.4 2.3 2.45 Z" fill="url(#esc-ficha-cuerpo)" />
          <ellipse cx="0" cy="-1.2" rx="1.35" ry=".42" fill={tono(colorDe(a), 0.7)} stroke="#2a1a10" strokeWidth=".25" />
          <circle cx="0" cy="-2.6" r="1.85" fill={colorDe(a)} stroke="#2a1a10" strokeWidth=".35" />
          <circle cx="0" cy="-2.6" r="1.85" fill="url(#esc-ficha)" />
          {ganador === a && <path d="M-1.6 -4.6 L-1.8 -6.2 L-.8 -5.3 L0 -6.6 L.8 -5.3 L1.8 -6.2 L1.6 -4.6 Z" fill="url(#esc-oro)" stroke="#6a4a1a" strokeWidth=".25" />}
        </g>
      ))}
    </svg>
  );
}

/** Dónde está cada ficha mientras se anima su jugada (salta casilla por casilla, y sube o baja por el atajo). */
type Anim = { a: number; inicio: number; claves: { t: number; p: P; salto?: boolean }[] };
function armarAnim(e: Extract<EvEscaleras, { t: "dado" }>, inicio: number): Anim {
  const p0 = e.desde <= 0 ? salida(e.a) : centro(e.desde);
  const claves: Anim["claves"] = [{ t: 0, p: p0 }];
  let t = 450;
  claves.push({ t, p: p0 });
  for (const c of e.camino) {
    t += 260;
    claves.push({ t, p: centro(c), salto: true });
  }
  if (e.atajo) {
    t += 120;
    if (e.atajo.sube) {
      t += 1150;
      claves.push({ t, p: centro(e.atajo.a) });
    } else {
      const { puntos } = caminoSerpiente(e.atajo.de, e.atajo.a);
      const dur = 1150;
      puntos.forEach((p, k) => claves.push({ t: t + (dur * k) / (puntos.length - 1), p }));
      t += dur;
    }
  }
  return { a: e.a, inicio, claves };
}
function enAnim(an: Anim, ahora: number): P | null {
  const t = ahora - an.inicio;
  const c = an.claves;
  if (t >= c[c.length - 1].t) return null;
  for (let k = 1; k < c.length; k++) {
    if (t <= c[k].t) {
      const a = c[k - 1];
      const b = c[k];
      const u = Math.max(0, Math.min(1, (t - a.t) / Math.max(1, b.t - a.t)));
      const arco = b.salto ? Math.sin(u * Math.PI) * 3.2 : 0;
      return { x: a.p.x + (b.p.x - a.p.x) * u, y: a.p.y + (b.p.y - a.p.y) * u - arco };
    }
  }
  return null;
}

export function EscalerasUI({ vista: v, nombres, bots, jugar, recibidaEn }: PropsMesa<EscalerasVista, JugadaEscaleras>) {
  useMusicaDeJuego("escaleras");
  const ahora = useAhora(250);
  const angosto = useAngosto();
  const [aviso, setAviso] = useAvisoCorto();
  const [dado, setDado] = useState({ valor: 1, vueltas: 0 });
  const [anims, setAnims] = useState<Anim[]>([]);
  const [, setCuadro] = useState(0);
  const [leccion, setLeccion] = useState<{ n: number; id: string; sube: boolean; quien: string } | null>(null);
  const [sello, setSello] = useState<{ n: number; texto: string; sub?: string; color?: string } | null>(null);
  const [confeti, setConfeti] = useState(0);
  const [ocupado, setOcupado] = useState(false);
  const yo = v.yo;
  const miTurno = yo != null && v.turno === yo && v.fase === "jugando";
  const temporizadores = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => () => temporizadores.current.forEach(clearTimeout), []);
  const luego = (ms: number, f: () => void) => temporizadores.current.push(setTimeout(f, ms));

  useEventosNuevos(v.eventos, (e) => {
    if (e.t === "dado") {
      setDado((d) => ({ valor: e.dado, vueltas: d.vueltas + 1 }));
      mesaSonido.dado();
      const an = armarAnim(e, Date.now());
      setAnims((l) => [...l.filter((x) => x.a !== e.a), an]);
      e.camino.forEach((_, k) => luego(450 + (k + 1) * 260 - 60, () => mesaSonido.salto(k)));
      if (e.atajo) {
        const t = 450 + e.camino.length * 260 + 120;
        const at = e.atajo;
        luego(t, () => {
          if (at.sube) mesaSonido.sube();
          else mesaSonido.baja();
          setLeccion({ n: e.n, id: at.id, sube: at.sube, quien: nombres[e.a] ?? "" });
        });
      }
    } else if (e.t === "turno") {
      if (e.a === yo) luego(300, () => mesaSonido.turno());
    } else if (e.t === "fin") {
      luego(1800, () => {
        setConfeti((x) => x + 1);
        mesaSonido.fiesta();
        if (v.ganador != null) setSello({ n: e.n, texto: "¡A la 100!", sub: nombres[v.ganador] ?? "", color: "#b8862a" });
      });
    }
  });
  // mientras haya fichas en camino, se dibuja a 60 cuadros por segundo
  useEffect(() => {
    if (!anims.length) return;
    let id = 0;
    const paso = () => {
      const t = Date.now();
      setCuadro((x) => x + 1);
      if (anims.some((an) => enAnim(an, t))) id = requestAnimationFrame(paso);
      else setAnims([]);
    };
    id = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(id);
  }, [anims]);

  const t = Date.now();
  const fichas = v.pos.map((pos, a) => {
    const an = anims.find((x) => x.a === a);
    const p = (an && enAnim(an, t)) || (pos <= 0 ? salida(a) : centro(pos));
    return { a, p, pos, anim: !!(an && enAnim(an, t)) };
  });
  // si hay varias en la misma casilla, se acomodan alrededor
  const porCasilla = new Map<number, number[]>();
  for (const f of fichas) if (!f.anim && f.pos > 0) porCasilla.set(f.pos, [...(porCasilla.get(f.pos) ?? []), f.a]);
  const dibujar = fichas.map((f) => {
    if (f.anim || f.pos <= 0) return { a: f.a, p: f.p };
    const l = porCasilla.get(f.pos)!;
    if (l.length < 2) return { a: f.a, p: f.p };
    const k = l.indexOf(f.a);
    const ang = (k / l.length) * Math.PI * 2;
    return { a: f.a, p: { x: f.p.x + Math.cos(ang) * 2.2, y: f.p.y + Math.sin(ang) * 2 } };
  });
  // la ficha que se mueve va arriba
  dibujar.sort((x, y) => Number(fichas[x.a].anim) - Number(fichas[y.a].anim));

  useGolpeFinal(v.fase === "fin", v.ganador != null && v.ganador === yo, yo != null);
  const restante = quedaMs(v.restanteMs, recibidaEn, ahora);
  const at = leccion ? [...ESCALERAS_JACOB, ...SERPIENTES].find((x) => x.id === leccion.id) : null;

  async function tirar() {
    if (ocupado) return;
    setOcupado(true);
    const r = await jugar({ t: "tirar" });
    setOcupado(false);
    if (!r.ok && r.message) setAviso(r.message);
  }

  return (
    <div className="mesa-raiz space-y-3" data-testid="mesa-escaleras">
      <Confeti disparo={confeti} />
      {sello && <Sello llave={sello.n} texto={sello.texto} sub={sello.sub} color={sello.color} />}
      <div className="flex flex-wrap items-center gap-1.5">
        {nombres.map((n, a) => (
          <Asiento key={a} a={a} nombre={n} bot={bots[a]} yo={a === yo} activo={a === v.turno && v.fase === "jugando"} extra={v.pos[a] ? `casilla ${v.pos[a]}` : "en la salida"} tam={28} />
        ))}
        <span className="ml-auto">
          <BotonSonido />
        </span>
      </div>
      {/* en la pantalla ancha, el tablero a la izquierda y el dado y la lección a la derecha; en el teléfono, el dado va en
          una barra pegada abajo de la ventana (siempre a la vista, como la mano del dominó) */}
      <div className="grid grid-cols-[minmax(0,1fr)] gap-3 md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] md:grid-rows-[auto_1fr] md:items-start">
        <section className="mx-auto w-full max-w-[34rem] overflow-hidden rounded-2xl shadow-xl md:row-span-2" aria-label="El tablero">
          <div style={{ aspectRatio: "106 / 115" }}>
            <Tablero fichas={dibujar} ganador={v.ganador} resaltar={leccion?.id ?? null} turno={v.fase === "jugando" ? v.turno : null} />
          </div>
        </section>
        <section className="mesa-pano sticky bottom-0 z-20 flex items-center gap-2.5 rounded-3xl px-3 py-2 text-white md:static md:flex-col md:px-3 md:py-4" aria-label="El dado" data-testid="escaleras-dado">
          <div className="flex min-w-0 flex-1 items-center justify-between gap-2 md:w-full md:flex-none">
            <p className="truncate text-[11px] font-black uppercase tracking-normal text-amber-100/90 md:text-[12px] md:tracking-wider">
              {v.fase === "preparar" ? "¡Ya empieza!" : v.fase === "fin" ? "Terminó" : miTurno ? "¡Te toca!" : `Tira ${(nombres[v.turno] ?? "").replace(/\s*🤖\s*$/u, "")}`}
            </p>
            {v.fase !== "fin" && <RelojAnillo ms={restante} total={v.fase === "preparar" ? ESCALERAS.prepararMs : v.turnoMs} tam={angosto ? 26 : 30} />}
          </div>
          <div className="shrink-0 md:my-4">
            <Dado i={2} valor={dado.valor} vueltas={dado.vueltas} guardado={false} tam={angosto ? 42 : 64} deshabilitado={!miTurno || ocupado} onClick={() => void tirar()} />
          </div>
          {miTurno && (
            <button
              type="button"
              onClick={() => void tirar()}
              disabled={ocupado}
              className="shrink-0 rounded-full border-b-4 border-[#6a3a1c] bg-gradient-to-b from-[#c98b4e] to-[#8a5428] px-4 py-2 font-serif text-[15px] font-black text-white shadow-lg transition active:translate-y-0.5 active:border-b-2 disabled:opacity-60 md:px-6 md:py-2.5 md:text-lg"
              data-testid="escaleras-tirar"
            >
              Tirar el dado
            </button>
          )}
        </section>
        {at && leccion && (
          <section key={leccion.n} className={`mesa-pop rounded-2xl border-2 p-3 shadow md:col-start-2 ${leccion.sube ? "border-amber-400 bg-amber-50" : "border-rose-300 bg-rose-50"} text-stone-800`} aria-live="polite" data-testid="escaleras-leccion">
            <p className="text-[11px] font-black uppercase tracking-wider" style={{ color: leccion.sube ? "#a36f0f" : "#9a3a3a" }}>
              {leccion.sube ? `🪜 ${leccion.quien} sube` : `🐍 ${leccion.quien} baja`} · {at.titulo}
            </p>
            <p className="mt-1 font-serif text-[15px] font-bold leading-snug">{at.leccion}</p>
            <p className="mt-1 text-[12px] italic leading-snug text-stone-600">
              «{at.verso.text}» <span className="font-bold not-italic">({at.verso.ref})</span>
            </p>
            {!leccion.sube && (
              <p className="mt-1 text-[12px] font-semibold text-emerald-800">
                Ánimo: «{VERSO_LEVANTA.text}» ({VERSO_LEVANTA.ref})
              </p>
            )}
          </section>
        )}
      </div>
      <AvisoMesa texto={aviso} />
    </div>
  );
}
