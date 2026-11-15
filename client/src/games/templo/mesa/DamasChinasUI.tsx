/**
 * Las damas chinas en la pantalla (shared/mesa/damas-chinas.ts): la estrella de madera con sus 121 hoyos, las canicas
 * de vidrio de cada color, los destinos que se encienden al tocar una canica propia y los saltos encadenados que se
 * ven uno por uno. La punta de cada jugador tiene su color, y la meta de enfrente se marca con el mismo color.
 *
 * Como las de verdad: la estrella de una pieza de madera con su veta, su canto y su sombra en la mesa; cada hoyo
 * taladrado (oscuro arriba y con la pared de abajo con luz), y las canicas de vidrio con su ojo de color adentro, el
 * brillo arriba y la luz que pasa abajo.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { CELDAS, DAMAS_CHINAS, PUNTAS, enfrente, hoyosDePunta, movimientosDe, type DamasChinasVista, type EvDamasChinas, type JugadaDamasChinas, type MovDC } from "@shared/mesa/damas-chinas";
import { mesaSonido } from "./mesa-sonido";
import { Asiento, AvisoMesa, BotonSonido, Confeti, RelojAnillo, Sello, colorDe, quedaMs, tono, useAhora, useAvisoCorto, useEventosNuevos, useMusicaDeJuego, useGolpeFinal, type PropsMesa } from "./vida";

const ESC = 4;
type P = { x: number; y: number };
const pos = (i: number): P => ({ x: CELDAS[i].px * ESC, y: CELDAS[i].py * ESC });
/** Las puntas de la estrella (sus 6 vértices de afuera) para dibujar la madera. */
const VERTICES = [0, 1, 2, 3, 4, 5].map((p) => {
  const h = hoyosDePunta(p);
  // el hoyo más lejano del centro de cada punta
  const lejos = h.reduce((m, i) => (Math.hypot(CELDAS[i].px, CELDAS[i].py) > Math.hypot(CELDAS[m].px, CELDAS[m].py) ? i : m), h[0]);
  const c = pos(lejos);
  const l = Math.hypot(c.x, c.y);
  return { x: (c.x / l) * (l + 6), y: (c.y / l) * (l + 6) };
});

/** El triángulo de cada punta (para pintarla del color de su dueño), un poco más grande que sus hoyos. */
const TRIANGULOS = [0, 1, 2, 3, 4, 5].map((p) => {
  const h = hoyosDePunta(p);
  const lejos = (i: number) => Math.hypot(CELDAS[i].px, CELDAS[i].py);
  const apice = h.reduce((m, i) => (lejos(i) > lejos(m) ? i : m), h[0]);
  // los dos extremos de la fila más cercana al centro
  const cerca = [...h].sort((a, b) => lejos(a) - lejos(b)).slice(0, 4);
  let par: [number, number] = [cerca[0], cerca[1]];
  let mejor = -1;
  for (const a of cerca)
    for (const b of cerca) {
      const d = Math.hypot(CELDAS[a].px - CELDAS[b].px, CELDAS[a].py - CELDAS[b].py);
      if (d > mejor) {
        mejor = d;
        par = [a, b];
      }
    }
  const v = [apice, par[0], par[1]].map(pos);
  const cx = (v[0].x + v[1].x + v[2].x) / 3;
  const cy = (v[0].y + v[1].y + v[2].y) / 3;
  return v.map((q) => {
    const dx = q.x - cx;
    const dy = q.y - cy;
    const l = Math.hypot(dx, dy);
    return { x: q.x + (dx / l) * 5, y: q.y + (dy / l) * 5 };
  });
});

/** El contorno de la estrella (las 6 puntas y los 6 rincones de adentro), para la madera, su canto y su sombra. */
const ESTRELLA: P[] = (() => {
  const ext = VERTICES.map((q) => ({ ang: Math.atan2(q.y, q.x), r: Math.hypot(q.x, q.y) })).sort((x, y) => x.ang - y.ang);
  const pts: P[] = [];
  ext.forEach((e, k) => {
    pts.push({ x: Math.cos(e.ang) * e.r, y: Math.sin(e.ang) * e.r });
    const sig = ext[(k + 1) % ext.length];
    // el rincón de adentro, a mitad de camino entre dos puntas (en una estrella de seis puntas, a R/√3 del centro)
    const medio = (e.ang + sig.ang) / 2 + (sig.ang < e.ang ? Math.PI : 0);
    const ri = (e.r + sig.r) / 2 / Math.sqrt(3);
    pts.push({ x: Math.cos(medio) * ri, y: Math.sin(medio) * ri });
  });
  return pts;
})();
const caminoEstrella = (esc = 1, dx = 0, dy = 0) => `M${ESTRELLA.map((q) => `${(q.x * esc + dx).toFixed(2)} ${(q.y * esc + dy).toFixed(2)}`).join(" L")} Z`;
/** La veta de la madera: líneas largas que ondulan un poco, siempre las mismas. */
const VETAS = Array.from({ length: 24 }, (_, k) => {
  const y0 = -60 + k * 5 + Math.sin(k * 12.99) * 1.3;
  const a1 = Math.sin(k * 3.7) * 2.2;
  const a2 = Math.cos(k * 5.1) * 2;
  const a3 = Math.sin(k * 7.3) * 1.6;
  return {
    d: `M-62 ${y0.toFixed(2)} C-36 ${(y0 + a1).toFixed(2)} -18 ${(y0 - a2).toFixed(2)} 0 ${(y0 + a3 * 0.5).toFixed(2)} S38 ${(y0 + a2).toFixed(2)} 62 ${(y0 - a1 * 0.6).toFixed(2)}`,
    w: 0.3 + ((k * 7) % 5) * 0.12,
    o: 0.08 + ((k * 3) % 4) * 0.035,
  };
});

/** Una canica de vidrio: el color con su hondura, el ojo de color adentro, la luz que pasa abajo y el brillo arriba. */
function Canica({ x, y, a, r = 2.65, sombra = 0.3 }: { x: number; y: number; a: number; r?: number; sombra?: number }) {
  const c = colorDe(a);
  return (
    <g pointerEvents="none">
      {sombra > 0 && <ellipse cx={x + r * 0.17} cy={y + r * 0.36} rx={r * 0.96} ry={r * 0.82} fill="#000" opacity={sombra} />}
      <circle cx={x} cy={y} r={r} fill={`url(#dc-canica-${a})`} />
      <path
        d={`M${(x - r * 0.58).toFixed(2)} ${(y + r * 0.22).toFixed(2)} Q${(x - r * 0.08).toFixed(2)} ${(y - r * 0.6).toFixed(2)} ${(x + r * 0.62).toFixed(2)} ${(y + r * 0.02).toFixed(2)}`}
        fill="none"
        stroke={tono(c, 1.5)}
        strokeWidth={r * 0.17}
        strokeLinecap="round"
        opacity=".5"
      />
      <ellipse cx={x + r * 0.2} cy={y + r * 0.52} rx={r * 0.46} ry={r * 0.2} fill="#fff" opacity=".22" />
      <ellipse cx={x - r * 0.36} cy={y - r * 0.4} rx={r * 0.34} ry={r * 0.21} transform={`rotate(-35 ${(x - r * 0.36).toFixed(2)} ${(y - r * 0.4).toFixed(2)})`} fill="#fff" opacity=".88" />
      <circle cx={x + r * 0.42} cy={y - r * 0.5} r={r * 0.07} fill="#fff" opacity=".7" />
      <circle cx={x} cy={y} r={r} fill="none" stroke={tono(c, 0.4)} strokeWidth=".22" opacity=".8" />
    </g>
  );
}

type Anim = { a: number; desde: number; hasta: number; inicio: number; claves: P[] };
const HOP = 330;
function enAnim(an: Anim, t: number): P | null {
  const dt = t - an.inicio;
  const n = an.claves.length - 1;
  if (dt >= n * HOP) return null;
  const k = Math.floor(dt / HOP);
  const u = (dt - k * HOP) / HOP;
  const a = an.claves[k];
  const b = an.claves[k + 1];
  const arco = Math.sin(u * Math.PI) * 4;
  return { x: a.x + (b.x - a.x) * u, y: a.y + (b.y - a.y) * u - arco };
}

export function DamasChinasUI({ vista: v, nombres, bots, jugar, recibidaEn }: PropsMesa<DamasChinasVista, JugadaDamasChinas>) {
  useMusicaDeJuego("damas-chinas");
  const ahora = useAhora(250);
  const [aviso, setAviso] = useAvisoCorto();
  const [elegida, setElegida] = useState<number | null>(null);
  const [anim, setAnim] = useState<Anim | null>(null);
  const [, setCuadro] = useState(0);
  const [ultima, setUltima] = useState<{ a: number; puntos: P[] } | null>(null);
  const [sello, setSello] = useState<{ n: number; texto: string; sub?: string; color?: string } | null>(null);
  const [confeti, setConfeti] = useState(0);
  const [ocupado, setOcupado] = useState(false);
  const yo = v.yo;
  const miTurno = yo != null && v.turno === yo && v.fase === "jugando";
  const meta = yo != null ? enfrente(v.puntas[yo]) : null;
  const temporizadores = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => () => temporizadores.current.forEach(clearTimeout), []);

  useEventosNuevos(v.eventos, (e: EvDamasChinas & { n: number }) => {
    if (e.t === "mueve") {
      const claves = [pos(e.desde), ...e.camino.map(pos)];
      setAnim({ a: e.a, desde: e.desde, hasta: e.camino[e.camino.length - 1], inicio: Date.now(), claves });
      setUltima({ a: e.a, puntos: claves });
      e.camino.forEach((_, k) => temporizadores.current.push(setTimeout(() => mesaSonido.canica(k), (k + 1) * HOP - 40)));
      if (e.camino.length >= 3) temporizadores.current.push(setTimeout(() => mesaSonido.bien(), e.camino.length * HOP));
      setElegida(null);
    } else if (e.t === "turno") {
      if (e.a === yo) temporizadores.current.push(setTimeout(() => mesaSonido.turno(), 200));
    } else if (e.t === "llego") {
      temporizadores.current.push(
        setTimeout(() => {
          setConfeti((x) => x + 1);
          mesaSonido.fiesta();
          setSello({ n: e.n, texto: "¡Llegó a la meta!", sub: nombres[e.a], color: colorDe(e.a) });
        }, 1200),
      );
    }
  });
  useEffect(() => {
    if (!anim) return;
    let id = 0;
    const paso = () => {
      setCuadro((x) => x + 1);
      if (enAnim(anim, Date.now())) id = requestAnimationFrame(paso);
      else setAnim(null);
    };
    id = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(id);
  }, [anim]);
  useEffect(() => {
    if (!miTurno) setElegida(null);
  }, [miTurno]);

  const movs: MovDC[] = useMemo(() => (elegida != null && meta != null && miTurno ? movimientosDe(v.hoyos, elegida, meta) : []), [elegida, meta, miTurno, v.hoyos]);
  const destinos = new Map(movs.map((m) => [m.camino[m.camino.length - 1], m]));

  async function mover(m: MovDC) {
    if (ocupado) return;
    setOcupado(true);
    const r = await jugar({ t: "mover", desde: m.desde, camino: m.camino });
    setOcupado(false);
    if (!r.ok && r.message) setAviso(r.message);
  }
  function tocar(i: number) {
    if (!miTurno) return;
    if (destinos.has(i)) {
      void mover(destinos.get(i)!);
      return;
    }
    if (v.hoyos[i] === yo) {
      const m = movimientosDe(v.hoyos, i, meta!);
      if (!m.length) {
        setAviso("Esa canica no tiene a dónde ir.");
        setElegida(null);
        return;
      }
      mesaSonido.canica(0);
      setElegida(i === elegida ? null : i);
    }
  }

  useGolpeFinal(v.fase === "fin", v.ganador != null && v.ganador === yo, yo != null);
  const t = Date.now();
  const animP = anim ? enAnim(anim, t) : null;
  const restante = quedaMs(v.restanteMs, recibidaEn, ahora);
  const colorPunta = new Map<number, number>(v.puntas.map((p, a) => [p, a]));
  const colorMeta = new Map<number, number>(v.puntas.map((p, a) => [enfrente(p), a]));

  return (
    <div className="mesa-raiz space-y-3" data-testid="mesa-damas-chinas">
      <Confeti disparo={confeti} />
      {sello && <Sello llave={sello.n} texto={sello.texto} sub={sello.sub} color={sello.color} />}
      {/* los jugadores: en el teléfono, en una sola fila que se desliza de lado (así la mesa queda a la vista) */}
      <div className="flex items-center gap-1.5">
        <div className="flex min-w-0 flex-1 gap-1.5 overflow-x-auto pb-0.5 *:shrink-0 max-md:flex-nowrap md:flex-wrap" style={{ scrollbarWidth: "none" }}>
        {nombres.map((n, a) => (
          <Asiento key={a} a={a} nombre={n} bot={bots[a]} yo={a === yo} activo={a === v.turno && v.fase === "jugando"} extra={`${v.enMeta[a] ?? 0} de 10 en la meta`} tam={28} />
        ))}
        </div>
        <span className="ml-auto shrink-0 flex items-center gap-2">
          {v.fase !== "fin" && <RelojAnillo ms={restante} total={v.fase === "preparar" ? DAMAS_CHINAS.prepararMs : v.turnoMs} tam={32} />}
          <BotonSonido />
        </span>
      </div>
      <p className="text-center text-[13px] font-bold text-stone-700 dark:text-stone-200">
        {v.fase === "preparar"
          ? "¡A sus puntas!"
          : v.fase === "fin"
            ? v.ganador != null
              ? `¡${nombres[v.ganador]} llevó sus diez canicas a la meta!`
              : "Terminó la partida."
            : miTurno
              ? elegida == null
                ? "Te toca: toca una de tus canicas."
                : "Ahora toca un hoyo encendido (los saltos se encadenan solos)."
              : `Juega ${(nombres[v.turno] ?? "").replace(/\s*🤖\s*$/u, "")}…`}
      </p>
      <section className="mx-auto w-full max-w-[29rem]" aria-label="La estrella">
        <svg viewBox="-56 -60 112 122" className="h-auto w-full touch-manipulation" role="img" aria-label="El tablero de las damas chinas">
          <defs>
            <radialGradient id="dc-madera" cx=".5" cy=".42" r=".62">
              <stop offset="0" stopColor="#edbf80" />
              <stop offset=".62" stopColor="#d09456" />
              <stop offset="1" stopColor="#9a622c" />
            </radialGradient>
            <radialGradient id="dc-hoyo" cx=".5" cy=".3" r=".75">
              <stop offset="0" stopColor="#120803" />
              <stop offset=".6" stopColor="#2c170a" />
              <stop offset="1" stopColor="#6e4522" />
            </radialGradient>
            <clipPath id="dc-recorte">
              <path d={caminoEstrella()} />
            </clipPath>
            {nombres.map((_, a) => (
              <radialGradient key={a} id={`dc-canica-${a}`} cx=".4" cy=".36" r=".72">
                <stop offset="0" stopColor={tono(colorDe(a), 1.55)} />
                <stop offset=".5" stopColor={colorDe(a)} />
                <stop offset=".88" stopColor={tono(colorDe(a), 0.55)} />
                <stop offset="1" stopColor={tono(colorDe(a), 0.42)} />
              </radialGradient>
            ))}
          </defs>
          {/* la sombra de la estrella en la mesa, la madera con su veta y el canto (oscuro afuera, con luz adentro) */}
          <path d={caminoEstrella(1, 0, 2.4)} fill="#000" opacity=".26" />
          <path d={caminoEstrella(1.012, 0, 1.2)} fill="#000" opacity=".2" />
          <path d={caminoEstrella()} fill="url(#dc-madera)" />
          <g clipPath="url(#dc-recorte)">
            {VETAS.map((veta, k) => (
              <path key={k} d={veta.d} fill="none" stroke="#6a3c18" strokeWidth={veta.w} opacity={veta.o} />
            ))}
          </g>
          <path d={caminoEstrella()} fill="none" stroke="#5a3214" strokeWidth="1.3" strokeLinejoin="round" />
          <path d={caminoEstrella(0.976)} fill="none" stroke="#f8d6a0" strokeWidth=".45" strokeLinejoin="round" opacity=".6" />
          <path d={caminoEstrella(0.958)} fill="none" stroke="#7a4a20" strokeWidth=".28" strokeLinejoin="round" opacity=".35" />
          {/* el color de cada punta: la casa de cada uno (pintada, con su filete claro), y su meta enfrente (punteada) */}
          {PUNTAS.map((_, p) => {
            const due = colorPunta.get(p);
            const meta2 = colorMeta.get(p);
            const pts = TRIANGULOS[p].map((q) => `${q.x},${q.y}`).join(" ");
            return (
              <g key={p}>
                {due != null && <polygon points={pts} fill={tono(colorDe(due), 1.18)} opacity=".5" strokeLinejoin="round" />}
                {due != null && <polygon points={pts} fill="none" stroke={tono(colorDe(due), 1.4)} strokeWidth=".55" strokeLinejoin="round" opacity=".9" />}
                {meta2 != null && due !== meta2 && (
                  <polygon points={pts} fill={due == null ? colorDe(meta2) : "none"} fillOpacity=".12" stroke={colorDe(meta2)} strokeWidth=".9" strokeDasharray="2 1.6" strokeLinejoin="round" />
                )}
              </g>
            );
          })}
          {/* la última jugada */}
          {ultima && !animP && (
            <polyline points={ultima.puntos.map((q) => `${q.x},${q.y}`).join(" ")} fill="none" stroke={colorDe(ultima.a)} strokeWidth=".8" strokeDasharray="1.2 1.4" opacity=".75" />
          )}
          {CELDAS.map((c) => {
            const q = pos(c.i);
            const due = v.hoyos[c.i];
            const enMov = anim && (c.i === anim.hasta || (animP && c.i === anim.desde));
            const dest = destinos.has(c.i);
            return (
              <g key={c.i} onClick={() => tocar(c.i)} style={{ cursor: miTurno && (dest || due === yo) ? "pointer" : "default" }}>
                <circle cx={q.x} cy={q.y} r="2.2" fill="#7a4a20" opacity=".42" />
                <circle cx={q.x} cy={q.y} r="1.78" fill="url(#dc-hoyo)" />
                {dest && <circle cx={q.x} cy={q.y} r="2.4" fill="#fff6c8" stroke="#f1c232" strokeWidth=".6" className="mesa-late" style={{ transformOrigin: `${q.x}px ${q.y}px` }} />}
                {due >= 0 && !(enMov && animP) && (
                  <g>
                    <Canica x={q.x} y={q.y} a={due} />
                    {elegida === c.i && <circle cx={q.x} cy={q.y} r="2.75" fill="none" stroke="#fff" strokeWidth=".7" />}
                    {elegida === c.i && <circle cx={q.x} cy={q.y} r="3.6" fill="none" stroke="#f1c232" strokeWidth=".7" className="mesa-late" style={{ transformOrigin: `${q.x}px ${q.y}px` }} />}
                  </g>
                )}
                {/* un área más grande para tocar con el dedo */}
                <circle cx={q.x} cy={q.y} r="3.4" fill="transparent" data-testid={`dc-hoyo-${c.i}`} />
              </g>
            );
          })}
          {anim && animP && (
            <g pointerEvents="none">
              <ellipse cx={animP.x + 0.6} cy={animP.y + 2.2} rx="2.4" ry="2" fill="#000" opacity=".22" />
              <Canica x={animP.x} y={animP.y} a={anim.a} r={2.85} sombra={0} />
            </g>
          )}
        </svg>
      </section>
      <AvisoMesa texto={aviso} />
    </div>
  );
}
