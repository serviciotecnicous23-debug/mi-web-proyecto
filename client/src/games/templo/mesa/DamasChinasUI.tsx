/**
 * Las damas chinas en la pantalla (shared/mesa/damas-chinas.ts): la estrella de madera con sus 121 hoyos, las canicas
 * de vidrio de cada color, los destinos que se encienden al tocar una canica propia y los saltos encadenados que se
 * ven uno por uno. La punta de cada jugador tiene su color, y la meta de enfrente se marca con el mismo color.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { CELDAS, DAMAS_CHINAS, PUNTAS, enfrente, hoyosDePunta, movimientosDe, type DamasChinasVista, type EvDamasChinas, type JugadaDamasChinas, type MovDC } from "@shared/mesa/damas-chinas";
import { mesaSonido } from "./mesa-sonido";
import { Asiento, AvisoMesa, BotonSonido, Confeti, RelojAnillo, Sello, colorDe, quedaMs, useAhora, useAvisoCorto, useEventosNuevos, useMusicaDeJuego, useGolpeFinal, type PropsMesa } from "./vida";

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
      <div className="flex flex-wrap items-center gap-1.5">
        {nombres.map((n, a) => (
          <Asiento key={a} a={a} nombre={n} bot={bots[a]} yo={a === yo} activo={a === v.turno && v.fase === "jugando"} extra={`${v.enMeta[a] ?? 0} de 10 en la meta`} tam={28} />
        ))}
        <span className="ml-auto flex items-center gap-2">
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
        <svg viewBox="-54 -58 108 116" className="h-auto w-full touch-manipulation" role="img" aria-label="El tablero de las damas chinas">
          <defs>
            <radialGradient id="dc-madera" cx=".5" cy=".45" r=".6">
              <stop offset="0" stopColor="#e2ad6c" />
              <stop offset="1" stopColor="#9a6430" />
            </radialGradient>
            {nombres.map((_, a) => (
              <radialGradient key={a} id={`dc-canica-${a}`} cx=".35" cy=".3" r=".75">
                <stop offset="0" stopColor="#ffffff" />
                <stop offset=".25" stopColor={colorDe(a)} stopOpacity=".85" />
                <stop offset="1" stopColor={colorDe(a)} />
              </radialGradient>
            ))}
          </defs>
          <polygon points={[0, 2, 4].map((k) => `${VERTICES[k].x},${VERTICES[k].y}`).join(" ")} fill="url(#dc-madera)" stroke="#6a3a1c" strokeWidth="1.2" strokeLinejoin="round" />
          <polygon points={[1, 3, 5].map((k) => `${VERTICES[k].x},${VERTICES[k].y}`).join(" ")} fill="url(#dc-madera)" stroke="#6a3a1c" strokeWidth="1.2" strokeLinejoin="round" />
          {/* el color de cada punta: la casa de cada uno, y su meta enfrente (con borde punteado) */}
          {PUNTAS.map((_, p) => {
            const due = colorPunta.get(p);
            const meta2 = colorMeta.get(p);
            const pts = TRIANGULOS[p].map((q) => `${q.x},${q.y}`).join(" ");
            return (
              <g key={p}>
                {due != null && <polygon points={pts} fill={colorDe(due)} opacity=".3" stroke={colorDe(due)} strokeWidth=".8" strokeLinejoin="round" />}
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
                <circle cx={q.x} cy={q.y} r="2.1" fill="#4a2a12" />
                <circle cx={q.x} cy={q.y + 0.35} r="1.7" fill="#2a1408" />
                {dest && <circle cx={q.x} cy={q.y} r="2.4" fill="#fff6c8" stroke="#f1c232" strokeWidth=".6" className="mesa-late" style={{ transformOrigin: `${q.x}px ${q.y}px` }} />}
                {due >= 0 && !(enMov && animP) && (
                  <g>
                    <circle cx={q.x + 0.3} cy={q.y + 0.6} r="2.65" fill="#000" opacity=".3" />
                    <circle cx={q.x} cy={q.y} r="2.65" fill={`url(#dc-canica-${due})`} stroke={elegida === c.i ? "#fff" : "rgba(0,0,0,.35)"} strokeWidth={elegida === c.i ? 0.9 : 0.3} />
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
              <circle cx={animP.x + 0.6} cy={animP.y + 2.2} r="2.4" fill="#000" opacity=".22" />
              <circle cx={animP.x} cy={animP.y} r="2.85" fill={`url(#dc-canica-${anim.a})`} stroke="rgba(0,0,0,.35)" strokeWidth=".3" />
            </g>
          )}
        </svg>
      </section>
      <AvisoMesa texto={aviso} />
    </div>
  );
}
