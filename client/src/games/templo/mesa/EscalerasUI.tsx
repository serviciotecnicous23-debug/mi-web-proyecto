/**
 * Las escaleras de Jacob en la pantalla (shared/mesa/escaleras.ts): el tablero de 100 casillas en zigzag, las
 * escaleras doradas (con su luz arriba) y las serpientes, el dado grande que rueda, y las fichas que saltan casilla
 * por casilla y después suben por la escalera o se deslizan por la serpiente. Cada atajo muestra su lección.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { ESCALERAS, ESCALERAS_JACOB, SERPIENTES, VERSO_LEVANTA, atajoEn, celdaDe, type EscalerasVista, type EvEscaleras, type JugadaEscaleras } from "@shared/mesa/escaleras";
import { Dado } from "./Dado";
import { mesaSonido } from "./mesa-sonido";
import { Asiento, AvisoMesa, BotonSonido, Confeti, RelojAnillo, Sello, colorDe, quedaMs, useAhora, useAvisoCorto, useEventosNuevos, useMusicaDeJuego, type PropsMesa } from "./vida";

type P = { x: number; y: number };
const centro = (c: number): P => {
  if (c <= 0) return { x: -4, y: 95 };
  const { fila, col } = celdaDe(c);
  return { x: col * 10 + 5, y: (9 - fila) * 10 + 5 };
};

/** El cuerpo de una serpiente: una curva que ondula de la cabeza a la cola. */
function caminoSerpiente(de: number, a: number): { d: string; puntos: P[] } {
  const p0 = centro(de);
  const p1 = centro(a);
  const dx = p1.x - p0.x;
  const dy = p1.y - p0.y;
  const largo = Math.hypot(dx, dy);
  const nx = -dy / largo;
  const ny = dx / largo;
  const ondas = Math.max(2, Math.round(largo / 14));
  const puntos: P[] = [];
  for (let k = 0; k <= 40; k++) {
    const t = k / 40;
    const amp = Math.sin(t * Math.PI) * 3.4;
    const w = Math.sin(t * ondas * Math.PI) * amp;
    puntos.push({ x: p0.x + dx * t + nx * w, y: p0.y + dy * t + ny * w });
  }
  return { d: `M${puntos.map((p) => `${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" L")}`, puntos };
}

const COLOR_SERPIENTE = ["#5f9e3a", "#c46a2a", "#7a54b8", "#3a8fb0", "#b8432f", "#4d7f2a", "#a8742a", "#2f7a6a"];

function Tablero({ fichas, ganador, resaltar }: { fichas: { a: number; p: P }[]; ganador: number | null; resaltar: string | null }) {
  const serpientes = useMemo(() => SERPIENTES.map((s, i) => ({ s, ...caminoSerpiente(s.de, s.a), color: COLOR_SERPIENTE[i % COLOR_SERPIENTE.length] })), []);
  return (
    <svg viewBox="-1 -1 102 102" className="h-full w-full" role="img" aria-label="El tablero de las escaleras de Jacob">
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
      </defs>
      <rect x="-1" y="-1" width="102" height="102" rx="3" fill="#7a4a22" />
      {[...Array(100)].map((_, i) => {
        const c = i + 1;
        const { fila, col } = celdaDe(c);
        const x = col * 10;
        const y = (9 - fila) * 10;
        const par = (fila + col) % 2 === 0;
        const at = atajoEn(c);
        return (
          <g key={c}>
            <rect x={x} y={y} width="10" height="10" fill={c === 100 ? "#ffe9a0" : par ? "#f6e7c4" : "#ead2a0"} stroke="#c9a46a" strokeWidth=".25" />
            {at && <rect x={x + 0.6} y={y + 0.6} width="8.8" height="8.8" rx="1.2" fill={at.sube ? "#fff3c4" : "#f4d6c6"} opacity=".8" />}
            <text x={x + 1} y={y + 3.1} fontSize="2.6" fontWeight="800" fill="#8a6a3a" fontFamily="Georgia, serif">
              {c}
            </text>
          </g>
        );
      })}
      {/* la meta: la corona del vencedor (sin cruz) */}
      <g transform={`translate(${centro(100).x} ${centro(100).y + 0.6})`}>
        <circle r="6" fill="url(#esc-luz)" />
        <path d="M-3.4 1.4 L-3.8 -2.2 L-1.8 -0.4 L0 -3 L1.8 -0.4 L3.8 -2.2 L3.4 1.4 Z" fill="url(#esc-oro)" stroke="#6a4a1a" strokeWidth=".35" strokeLinejoin="round" />
      </g>
      {/* las escaleras de Jacob */}
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
        return (
          <g key={e.id} opacity={brilla ? 1 : 0.94}>
            <circle cx={p1.x} cy={p1.y} r={brilla ? 7 : 5} fill="url(#esc-luz)" />
            <line x1={p0.x + nx} y1={p0.y + ny} x2={p1.x + nx} y2={p1.y + ny} stroke="#6a4a1a" strokeWidth="1.5" strokeLinecap="round" />
            <line x1={p0.x - nx} y1={p0.y - ny} x2={p1.x - nx} y2={p1.y - ny} stroke="#6a4a1a" strokeWidth="1.5" strokeLinecap="round" />
            {[...Array(peldanos)].map((_, k) => {
              const t = (k + 0.5) / peldanos;
              const x = p0.x + dx * t;
              const y = p0.y + dy * t;
              return <line key={k} x1={x + nx} y1={y + ny} x2={x - nx} y2={y - ny} stroke="#c48a1c" strokeWidth=".8" strokeLinecap="round" />;
            })}
            <line x1={p0.x + nx} y1={p0.y + ny} x2={p1.x + nx} y2={p1.y + ny} stroke="url(#esc-oro)" strokeWidth=".9" strokeLinecap="round" />
            <line x1={p0.x - nx} y1={p0.y - ny} x2={p1.x - nx} y2={p1.y - ny} stroke="url(#esc-oro)" strokeWidth=".9" strokeLinecap="round" />
          </g>
        );
      })}
      {/* las serpientes */}
      {serpientes.map(({ s, d, puntos, color }) => {
        const cab = puntos[0];
        const sig = puntos[2];
        const ang = (Math.atan2(cab.y - sig.y, cab.x - sig.x) * 180) / Math.PI;
        const brilla = resaltar === s.id;
        return (
          <g key={s.id} opacity={brilla ? 1 : 0.92}>
            <path d={d} fill="none" stroke="#2a1a10" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity=".55" />
            <path d={d} fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d={d} fill="none" stroke="#fff6d0" strokeWidth=".7" strokeLinecap="round" strokeDasharray="0.8 2.2" opacity=".85" />
            <g transform={`translate(${cab.x} ${cab.y}) rotate(${ang})`}>
              <ellipse rx="2.6" ry="2" fill={color} stroke="#2a1a10" strokeWidth=".4" />
              <circle cx=".9" cy="-.9" r=".55" fill="#fff" />
              <circle cx=".9" cy=".9" r=".55" fill="#fff" />
              <circle cx="1.05" cy="-.9" r=".28" fill="#111" />
              <circle cx="1.05" cy=".9" r=".28" fill="#111" />
              <path d="M2.5 0 L3.6 -.5 M2.5 0 L3.6 .5" stroke="#d9483a" strokeWidth=".3" strokeLinecap="round" />
            </g>
          </g>
        );
      })}
      {/* las fichas */}
      {fichas.map(({ a, p }) => (
        <g key={a} transform={`translate(${p.x} ${p.y})`}>
          <ellipse cx="0" cy="3" rx="2.6" ry=".9" fill="#000" opacity=".3" />
          <path d="M-2.4 2.6 Q-2.6 -.4 -1.1 -1.2 L1.1 -1.2 Q2.6 -.4 2.4 2.6 Z" fill={colorDe(a)} stroke="#2a1a10" strokeWidth=".35" />
          <circle cx="0" cy="-2.4" r="1.9" fill={colorDe(a)} stroke="#2a1a10" strokeWidth=".35" />
          <circle cx="0" cy="-2.4" r="1.9" fill="url(#esc-ficha)" />
          {ganador === a && <path d="M-1.6 -4.4 L-1.8 -6 L-.8 -5.1 L0 -6.4 L.8 -5.1 L1.8 -6 L1.6 -4.4 Z" fill="url(#esc-oro)" stroke="#6a4a1a" strokeWidth=".25" />}
        </g>
      ))}
    </svg>
  );
}

/** Dónde está cada ficha mientras se anima su jugada (salta casilla por casilla, y sube o baja por el atajo). */
type Anim = { a: number; inicio: number; claves: { t: number; p: P; salto?: boolean }[] };
function armarAnim(e: Extract<EvEscaleras, { t: "dado" }>, inicio: number): Anim {
  const claves: Anim["claves"] = [{ t: 0, p: centro(e.desde) }];
  let t = 450;
  claves.push({ t, p: centro(e.desde) });
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
    const p = (an && enAnim(an, t)) || centro(pos);
    return { a, p, pos, anim: !!(an && enAnim(an, t)) };
  });
  // si hay varias en la misma casilla, se acomodan alrededor
  const porCasilla = new Map<number, number[]>();
  for (const f of fichas) if (!f.anim) porCasilla.set(f.pos, [...(porCasilla.get(f.pos) ?? []), f.a]);
  const dibujar = fichas.map((f) => {
    if (f.anim) return { a: f.a, p: f.p };
    const l = porCasilla.get(f.pos)!;
    if (l.length < 2) return { a: f.a, p: f.p };
    const k = l.indexOf(f.a);
    const ang = (k / l.length) * Math.PI * 2;
    return { a: f.a, p: { x: f.p.x + Math.cos(ang) * 2.2, y: f.p.y + Math.sin(ang) * 2 } };
  });
  // la ficha que se mueve va arriba
  dibujar.sort((x, y) => Number(fichas[x.a].anim) - Number(fichas[y.a].anim));

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
      <div className="grid gap-3 md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] md:items-start">
        <section className="mx-auto w-full max-w-[34rem] overflow-hidden rounded-2xl shadow-xl" aria-label="El tablero">
          <div className="aspect-square">
            <Tablero fichas={dibujar} ganador={v.ganador} resaltar={leccion?.id ?? null} />
          </div>
        </section>
        <div className="space-y-3">
          <section className="mesa-pano flex flex-col items-center rounded-3xl px-3 py-4 text-white" aria-label="El dado">
            <div className="flex w-full items-center justify-between">
              <p className="text-[12px] font-black uppercase tracking-wider text-amber-100/90">
                {v.fase === "preparar" ? "¡Ya empieza!" : v.fase === "fin" ? "Terminó" : miTurno ? "¡Te toca!" : `Tira ${(nombres[v.turno] ?? "").replace(/\s*🤖\s*$/u, "")}`}
              </p>
              {v.fase !== "fin" && <RelojAnillo ms={restante} total={v.fase === "preparar" ? ESCALERAS.prepararMs : v.turnoMs} tam={30} />}
            </div>
            <div className="my-4">
              <Dado i={2} valor={dado.valor} vueltas={dado.vueltas} guardado={false} tam={64} deshabilitado={!miTurno || ocupado} onClick={() => void tirar()} />
            </div>
            {miTurno && (
              <button
                type="button"
                onClick={() => void tirar()}
                disabled={ocupado}
                className="rounded-full border-b-4 border-[#6a3a1c] bg-gradient-to-b from-[#c98b4e] to-[#8a5428] px-6 py-2.5 font-serif text-lg font-black text-white shadow-lg transition active:translate-y-0.5 active:border-b-2 disabled:opacity-60"
                data-testid="escaleras-tirar"
              >
                Tirar el dado
              </button>
            )}
          </section>
          {at && leccion && (
            <section key={leccion.n} className={`mesa-pop rounded-2xl border-2 p-3 shadow ${leccion.sube ? "border-amber-400 bg-amber-50" : "border-rose-300 bg-rose-50"} text-stone-800`} aria-live="polite" data-testid="escaleras-leccion">
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
      </div>
      <AvisoMesa texto={aviso} />
    </div>
  );
}
