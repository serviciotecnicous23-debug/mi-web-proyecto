/**
 * La pantalla del parchís (shared/mesa/parchis.ts) con el tablero «el estadio» (mesa/parchis-geo.ts): la pista redonda,
 * el anillo de los caminos de llegada y la corona de laurel del centro, sin nada en forma de cruz. Tu color queda abajo a
 * la izquierda.
 *
 * Tiene vida: el dado rueda en el paño del centro (se toca para tirar), las fichas saltan casilla por casilla, la ficha
 * comida vuela de vuelta a su casa, la barrera se marca, y al llegar a la corona hay luz y fiesta. Cada cosa que pasa
 * llega como un evento (`eventos` de la vista) y se anima en orden, con los tiempos de `ANIMA` (los mismos que espera la
 * sala antes de que juegue la computadora). Mientras se anima, no se juega.
 */
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  ANIMA, CASA, META, PARCHIS, PARCHIS_MESA, ULTIMA_PISTA, casillaDe, esSeguro, esMover, esTirar, msDeMover, pasoMs,
  type EvParchis, type JugadaMover, type JugadaParchis, type VistaParchis,
} from "@shared/mesa/parchis";
import type { PantallaMesaProps } from "./index";
import { Dado } from "./Dado";
import { mesaSonido } from "./mesa-sonido";
import { BotonSonido, Confeti, Sello, useEventosNuevos } from "./vida";
import { Crown, House } from "lucide-react";
import {
  CASA_FORMA, CLARO, COLOR, D, GEO, NOMBRE_COLOR, OSCURO, anguloCamino, anguloCasilla, centroCasa, f2, huecoCasa,
  huecosDe, lugarCompartido, lugarDe, punto, sector, type P,
} from "./parchis-geo";

type Ev = EvParchis & { n: number };
type Clave = { t: number; p: P; salto?: number };
type AnimFicha = { a: number; f: number; inicio: number; claves: Clave[] };
type Efecto = { id: number; tipo: "comida" | "corona" | "barrera"; p: P; color: string; inicio: number; dur: number };
type Mensaje = { id: number; texto: string; sub?: string; color: string };

const sinBot = (s: string) => s.replace(/\s*🤖\s*$/u, "");

// ---------------------------------------------------------------- el tablero (lo que no se mueve)
function Tablero({ giro, activos }: { giro: number; activos: boolean[] }) {
  const casillas = useMemo(() => {
    const out: { d: string; fill: string; marca: P | null; aro: string }[] = [];
    for (let k = 1; k <= PARCHIS.casillas; k++) {
      const a = anguloCasilla(k);
      const sal = (PARCHIS.salida as readonly number[]).indexOf(k);
      const ent = (PARCHIS.entrada as readonly number[]).indexOf(k);
      const seg = esSeguro(k);
      const fill = sal >= 0 ? COLOR[sal] : ent >= 0 ? CLARO[ent] : seg ? "#fff6dc" : k % 2 ? "#fbf1d8" : "#f1e1bb";
      out.push({ d: sector(GEO.ri, GEO.ro, a - D / 2, a + D / 2, giro), fill, marca: seg ? punto(GEO.rm, a, giro) : null, aro: sal >= 0 ? "#ffffff" : ent >= 0 ? COLOR[ent] : "#c9a66a" });
    }
    return out;
  }, [giro]);
  const hojas = useMemo(() => {
    const out: { p: P; ang: number }[] = [];
    for (let a = 0; a < 360; a += 10)
      for (const [r, da] of [
        [25.6, 0],
        [22.4, 5],
      ]) {
        const p = punto(r, a + da, giro);
        out.push({ p, ang: a + da + giro + 118 });
      }
    return out;
  }, [giro]);
  return (
    <g>
      <rect x="0" y="0" width="100" height="100" rx="5" fill="url(#pq-madera)" />
      <rect x="1.6" y="1.6" width="96.8" height="96.8" rx="4" fill="#ead8b0" />
      {/* las casas, en las esquinas */}
      {[0, 1, 2, 3].map((c) => (
        <g key={c} transform={`rotate(${giro - 90 * c} 50 50)`} opacity={activos[c] ? 1 : 0.4}>
          <path d={CASA_FORMA} fill={CLARO[c]} stroke={COLOR[c]} strokeWidth=".7" />
          {[0, 1, 2, 3].map((h) => {
            const p = huecoCasa(0, h, 0);
            return <circle key={h} cx={f2(p.x)} cy={f2(p.y)} r="2.3" fill="#fffaf0" stroke={COLOR[c]} strokeWidth=".35" />;
          })}
        </g>
      ))}
      {/* la pista */}
      <circle cx="50" cy="50" r={GEO.ro + 0.8} fill="#b8925a" />
      {casillas.map((x, k) => (
        <path key={k} d={x.d} fill={x.fill} stroke="#a88552" strokeWidth=".22" />
      ))}
      {casillas.map((x, k) => (x.marca ? <circle key={k} cx={f2(x.marca.x)} cy={f2(x.marca.y)} r="1.15" fill="none" stroke={x.aro} strokeWidth=".45" /> : null))}
      {/* en cada salida, hacia dónde se da la vuelta */}
      {PARCHIS.salida.map((k, c) => {
        const a = anguloCasilla(k);
        const p = punto(GEO.ro - 1.55, a, giro);
        return (
          <g key={c} transform={`translate(${f2(p.x)} ${f2(p.y)}) rotate(${f2(a + giro - 90)})`} opacity={activos[c] ? 0.95 : 0.4}>
            <path d="M-.55 -.85L.45 0L-.55 .85" fill="none" stroke="#fff" strokeWidth=".5" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        );
      })}
      {/* el anillo de los caminos de llegada */}
      <path d={`${sector(GEO.rl, GEO.ri, 0, 180)}${sector(GEO.rl, GEO.ri, 180, 360)}`} fill="#dcc393" />
      {[0, 1, 2, 3].map((c) => (
        <g key={c} opacity={activos[c] ? 1 : 0.45}>
          {[1, 2, 3, 4, 5, 6, 7].map((i) => {
            const a = anguloCamino(c, i);
            return <path key={i} d={sector(GEO.rl, GEO.ri, a - GEO.dl / 2, a + GEO.dl / 2, giro)} fill={i % 2 ? CLARO[c] : "#fffaf0"} stroke={COLOR[c]} strokeWidth=".35" />;
          })}
          {(() => {
            const a = anguloCasilla(PARCHIS.entrada[c]);
            const p1 = punto(GEO.ri + 0.4, a, giro);
            const p2 = punto(GEO.ri - 2.4, a, giro);
            return <path d={`M${f2(p1.x)} ${f2(p1.y)}L${f2(p2.x)} ${f2(p2.y)}`} stroke={COLOR[c]} strokeWidth="1" strokeLinecap="round" />;
          })()}
        </g>
      ))}
      {/* la corona de laurel (la meta) y el paño del dado */}
      <circle cx="50" cy="50" r={GEO.rl} fill="#efe0bb" stroke="#a88552" strokeWidth=".3" />
      <circle cx="50" cy="50" r={GEO.corona} fill="none" stroke="url(#pq-oro)" strokeWidth="1.1" opacity=".75" />
      {hojas.map(({ p, ang }, k) => (
        <ellipse key={k} cx={f2(p.x)} cy={f2(p.y)} rx="2.1" ry=".95" transform={`rotate(${f2(ang)} ${f2(p.x)} ${f2(p.y)})`} fill="#7da34a" stroke="#4f7a2a" strokeWidth=".2" />
      ))}
      <circle cx="50" cy="50" r={GEO.pano} fill="url(#pq-pano)" />
    </g>
  );
}

/** Una ficha: un disco de su color con brillo, su sombra en el tablero y (las mías) su número. */
function Ficha({ p, h, color, n, brilla, apagada }: { p: P; h: number; color: number; n: number | null; brilla: boolean; apagada?: boolean }) {
  const s = 1 + h * 0.09;
  return (
    <g opacity={apagada ? 0.55 : 1}>
      <ellipse cx={f2(p.x + 0.35 + h * 0.25)} cy={f2(p.y + 0.6 + h * 0.35)} rx={f2(1.75 * (1 - h * 0.04))} ry={f2(1.15 * (1 - h * 0.04))} fill="#000" opacity={f2(0.32 - h * 0.025)} />
      <g transform={`translate(${f2(p.x)} ${f2(p.y - h)}) scale(${f2(s)})`}>
        {brilla && <circle r="2.75" fill="none" stroke="#fff1a0" strokeWidth=".75" className="pq-late" />}
        <circle r="1.8" fill={`url(#pq-ficha-${color})`} stroke={OSCURO[color]} strokeWidth=".38" />
        <circle r="1.15" fill="none" stroke="#ffffff" strokeOpacity=".45" strokeWidth=".22" />
        <circle cx="-.55" cy="-.6" r=".5" fill="#fff" opacity=".75" />
        {n !== null && (
          <text y=".62" textAnchor="middle" fontSize="1.7" fontWeight="900" fill="#fff" stroke={OSCURO[color]} strokeWidth=".25" paintOrder="stroke" fontFamily="system-ui, sans-serif">
            {n}
          </text>
        )}
      </g>
    </g>
  );
}

function interpolar(an: AnimFicha, t: number): { p: P; h: number } {
  const c = an.claves;
  const u0 = t - an.inicio;
  for (let k = 1; k < c.length; k++) {
    if (u0 <= c[k].t) {
      const a = c[k - 1];
      const b = c[k];
      const u = Math.max(0, Math.min(1, (u0 - a.t) / Math.max(1, b.t - a.t)));
      return { p: { x: a.p.x + (b.p.x - a.p.x) * u, y: a.p.y + (b.p.y - a.p.y) * u }, h: (b.salto ?? 0) * Math.sin(u * Math.PI) };
    }
  }
  return { p: c[c.length - 1].p, h: 0 };
}
const finDe = (an: AnimFicha) => an.inicio + an.claves[an.claves.length - 1].t;

export function ParchisPantalla({ vista: v, jugadas, miAsiento, asientos, jugar, ocupado }: PantallaMesaProps<VistaParchis, JugadaParchis>) {
  const n = asientos.length;
  const final = v.fase === "fin";
  const mi = miAsiento;
  const miColor = mi !== null ? v.colores[mi] : null;
  const giro = miColor !== null ? 90 * miColor : 0;
  const activos = [0, 1, 2, 3].map((c) => v.colores.includes(c));
  const nombre = (a: number) => sinBot(asientos[a]?.nombre ?? `Asiento ${a + 1}`);

  // ---------------------------------------------------------------- el tamaño (para el dado)
  const caja = useRef<HTMLDivElement>(null);
  const [ancho, setAncho] = useState(360);
  useEffect(() => {
    const el = caja.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => setAncho(el.clientWidth || 360));
    ro.observe(el);
    setAncho(el.clientWidth || 360);
    return () => ro.disconnect();
  }, []);

  // ---------------------------------------------------------------- lo que se anima
  const anims = useRef<AnimFicha[]>([]);
  const efectos = useRef<Efecto[]>([]);
  const cola = useRef(0);
  const ids = useRef(0);
  const temporizadores = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [, setCuadro] = useState(0);
  const [corriendo, setCorriendo] = useState(false);
  const [dado, setDado] = useState({ valor: v.dado ?? 5, vueltas: 0 });
  const [turnoVisto, setTurnoVisto] = useState(v.turno);
  const [mensaje, setMensaje] = useState<Mensaje | null>(null);
  const [confeti, setConfeti] = useState(0);
  const [sello, setSello] = useState<{ n: number; texto: string; sub: string; color: string } | null>(null);
  const [previa, setPrevia] = useState<number | null>(null);
  useEffect(() => () => temporizadores.current.forEach(clearTimeout), []);
  const luego = (ms: number, f: () => void) => {
    temporizadores.current.push(setTimeout(f, Math.max(0, ms)));
  };

  /** Pone una cosa en la cola: empieza cuando termina la anterior (y si la pantalla se atrasó, todo va más rápido). */
  function programar(dur: number, alEmpezar?: () => void): { inicio: number; f: number } {
    const ahora = Date.now();
    const atraso = cola.current - ahora;
    const f = atraso > 6000 ? 0.35 : atraso > 2500 ? 0.6 : 1;
    const inicio = Math.max(ahora, cola.current);
    cola.current = inicio + dur * f;
    if (alEmpezar) luego(inicio - ahora, alEmpezar);
    // al terminar se vuelve a dibujar aunque no corran los cuadros (con la pantalla en segundo plano, por ejemplo)
    luego(cola.current - ahora + 60, () => setCuadro((x) => x + 1));
    setCorriendo(true);
    return { inicio, f };
  }

  // las posiciones de cada ficha cuando nada se mueve (dos en una casilla: una afuera y otra adentro)
  const quietas = useMemo(() => {
    const grupos = new Map<string, string[]>();
    const clave = (a: number, pos: number) => {
      const c = v.colores[a];
      if (pos >= 0 && pos <= ULTIMA_PISTA) return `p${casillaDe(c, pos)}`;
      if (pos > ULTIMA_PISTA && pos < META) return `c${c}-${pos}`;
      return null;
    };
    v.fichas.forEach((l, a) =>
      l.forEach((pos, f) => {
        const k = clave(a, pos);
        if (k) grupos.set(k, [...(grupos.get(k) ?? []), `${a}-${f}`]);
      }),
    );
    const huecos = huecosDe(v.nFichas);
    return v.fichas.map((l, a) => {
      const c = v.colores[a];
      let enCorona = 0;
      return l.map((pos, f) => {
        if (pos === CASA) return huecoCasa(c, huecos[f] ?? f, giro);
        if (pos === META) return lugarDe(c, META, giro, 0, enCorona++);
        const g = grupos.get(clave(a, pos)!)!;
        return g.length > 1 ? lugarCompartido(c, pos, giro, g.indexOf(`${a}-${f}`)) : lugarDe(c, pos, giro, 0);
      });
    });
  }, [v.fichas, v.colores, v.nFichas, giro]);

  /** El lugar en la corona de una ficha que llega (el mismo que tendrá después, quieta). */
  const lugarEnCorona = (a: number, f: number) => {
    const k = v.fichas[a].filter((p, i) => p === META && i < f).length;
    return lugarDe(v.colores[a], META, giro, 0, k);
  };

  function animarFicha(a: number, f: number, claves: Clave[], inicio: number, factor: number) {
    anims.current.push({ a, f, inicio, claves: claves.map((c) => ({ ...c, t: c.t * factor })) });
  }

  function efecto(tipo: Efecto["tipo"], p: P, color: string, inicio: number, dur: number) {
    efectos.current.push({ id: ++ids.current, tipo, p, color, inicio, dur });
  }

  function decir(m: Omit<Mensaje, "id">, ms = 1900) {
    const id = ++ids.current;
    setMensaje({ ...m, id });
    luego(ms, () => setMensaje((x) => (x && x.id === id ? null : x)));
  }

  /** Cada cosa que pasó, en orden, con su animación. */
  function animar(e: Ev) {
    const yo = (a: number) => a === mi;
    switch (e.t) {
      case "dado": {
        programar(ANIMA.dado, () => {
          setDado((d) => ({ valor: e.v, vueltas: d.vueltas + 1 }));
          mesaSonido.dado();
        });
        break;
      }
      case "mueve": {
        const c = v.colores[e.a];
        const huecos = huecosDe(v.nFichas);
        const claves: Clave[] = [];
        const ultimaP = (p: number) => (p === META ? lugarEnCorona(e.a, e.f) : v.fichas[e.a][e.f] === p ? quietas[e.a][e.f] : lugarDe(c, p, giro, 0));
        if (e.desde === CASA) {
          claves.push({ t: 0, p: huecoCasa(c, huecos[e.f] ?? e.f, giro) });
          claves.push({ t: ANIMA.sale, p: ultimaP(0), salto: 6 });
        } else {
          claves.push({ t: 0, p: lugarDe(c, e.desde, giro, 0) });
          const pasos = e.hasta - e.desde;
          const ms = pasoMs(pasos);
          for (let k = 1; k <= pasos; k++) {
            const p = e.desde + k;
            claves.push({ t: k * ms, p: p === e.hasta ? ultimaP(p) : lugarDe(c, p, giro, 0), salto: pasos >= 10 ? 1.5 : 2.3 });
          }
        }
        const total = msDeMover(e.desde, e.hasta);
        claves.push({ t: total, p: claves[claves.length - 1].p });
        const { inicio, f } = programar(total);
        animarFicha(e.a, e.f, claves, inicio, f);
        const ahora = Date.now();
        // el sonido de cada salto
        claves.slice(1, -1).forEach((cl, k) => luego(inicio - ahora + cl.t * f - 40, () => mesaSonido.salto(Math.min(k, 12))));
        if (e.barrera) {
          const p = claves[claves.length - 1].p;
          luego(inicio - ahora + (total - ANIMA.asentar) * f, () => mesaSonido.canica(3));
          efecto("barrera", p, COLOR[c], inicio + (total - ANIMA.asentar) * f, 900);
        }
        break;
      }
      case "come": {
        const cv = v.colores[e.victima];
        const desdeP = lugarDe(cv, e.desde, giro, 0);
        const casa = huecoCasa(cv, huecosDe(v.nFichas)[e.vf] ?? e.vf, giro);
        const { inicio, f } = programar(ANIMA.come, () => {
          mesaSonido.baja();
          decir(
            yo(e.a)
              ? { texto: `¡Te comiste una ficha de ${nombre(e.victima)}!`, sub: "Cuenta 20 con una ficha", color: COLOR[v.colores[e.a]] }
              : yo(e.victima)
                ? { texto: `¡${nombre(e.a)} se comió tu ficha!`, sub: "Vuelve a tu casa", color: COLOR[cv] }
                : { texto: `${nombre(e.a)} se comió una ficha de ${nombre(e.victima)}`, sub: "+20 para contar", color: COLOR[v.colores[e.a]] },
          );
        });
        efecto("comida", desdeP, COLOR[cv], inicio, 700 * f);
        animarFicha(e.victima, e.vf, [{ t: 0, p: desdeP }, { t: 300, p: desdeP }, { t: ANIMA.come, p: casa, salto: 9 }], inicio, f);
        break;
      }
      case "meta": {
        const p = lugarEnCorona(e.a, e.f);
        const { inicio } = programar(ANIMA.meta, () => {
          mesaSonido.sube();
          decir(
            yo(e.a)
              ? { texto: "¡Tu ficha llegó a la corona!", sub: e.quedan ? "Cuenta 10 con otra ficha" : "¡Todas en la corona!", color: "#b8862a" }
              : { texto: `${nombre(e.a)} llegó a la corona`, sub: e.quedan ? "+10 para contar" : "¡con todas sus fichas!", color: "#b8862a" },
          );
        });
        efecto("corona", p, COLOR[v.colores[e.a]], inicio, 1400);
        break;
      }
      case "sin": {
        programar(ANIMA.sin, () => {
          mesaSonido.tic();
          decir(yo(e.a) ? { texto: `Sacaste ${e.v}: no puedes mover`, color: "#78716c" } : { texto: `${nombre(e.a)} sacó ${e.v}: no puede mover`, color: "#78716c" }, 1400);
        });
        break;
      }
      case "pierde": {
        programar(ANIMA.pierde, () => decir({ texto: `Ninguna ficha puede contar ${e.cuenta.n}`, sub: "Esa cuenta se pierde", color: "#78716c" }, 1500));
        break;
      }
      case "tres": {
        const c = v.colores[e.a];
        const { inicio, f } = programar(ANIMA.tres, () => {
          mesaSonido.mal();
          decir({ texto: "¡Tres seises seguidos!", sub: e.f !== null ? "La última ficha que se movió vuelve a casa" : "Pierde el turno", color: "#b91c1c" }, 2000);
        });
        if (e.f !== null && e.desde !== null) {
          const desdeP = lugarDe(c, e.desde, giro, 0);
          animarFicha(e.a, e.f, [{ t: 0, p: desdeP }, { t: 350, p: desdeP }, { t: 1150, p: huecoCasa(c, huecosDe(v.nFichas)[e.f] ?? e.f, giro), salto: 9 }], inicio, f);
        }
        break;
      }
      case "turno": {
        programar(ANIMA.turno, () => {
          setTurnoVisto(e.a);
          if (yo(e.a)) mesaSonido.turno();
          if (e.otra) decir(yo(e.a) ? { texto: "¡Sacaste 6! Tira otra vez", color: "#b8862a" } : { texto: `${nombre(e.a)} sacó 6: tira otra vez`, color: "#b8862a" }, 1400);
        });
        break;
      }
      case "fin": {
        programar(400, () => {
          setConfeti((x) => x + 1);
          mesaSonido.fiesta();
          if (e.a !== null) setSello({ n: e.n, texto: "¡A la corona!", sub: nombre(e.a), color: "#b8862a" });
        });
        break;
      }
    }
  }

  useEventosNuevos(v.eventos as Ev[], animar);

  // en el tablero final (al terminar), se repite la última jugada y la fiesta (antes de dibujar, así la ficha no salta)
  const repetido = useRef(false);
  useLayoutEffect(() => {
    if (!final || repetido.current) return;
    repetido.current = true;
    const evs = v.eventos as Ev[];
    let desde = 0;
    evs.forEach((x, k) => {
      if (x.t === "turno") desde = k + 1;
    });
    evs.slice(desde).forEach(animar);
    // (si no hubo nada que repetir, igual la fiesta)
    if (!evs.slice(desde).some((x) => x.t === "fin") && v.ganador !== null) {
      luego(500, () => {
        setConfeti((x) => x + 1);
        setSello({ n: -1, texto: "¡A la corona!", sub: nombre(v.ganador!), color: "#b8862a" });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [final]);

  // mientras algo se mueve, se dibuja a 60 cuadros por segundo
  useEffect(() => {
    if (!corriendo) return;
    let id = 0;
    const paso = () => {
      const t = Date.now();
      setCuadro((x) => x + 1);
      if (cola.current > t || anims.current.some((an) => finDe(an) > t) || efectos.current.some((x) => x.inicio + x.dur > t)) id = requestAnimationFrame(paso);
      else {
        anims.current = [];
        efectos.current = [];
        setCorriendo(false);
      }
    };
    id = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(id);
  }, [corriendo]);

  // ---------------------------------------------------------------- dibujar
  const t = Date.now();
  const animando = corriendo && cola.current > t;
  const puedoJugar = !final && !ocupado && !animando && mi !== null && jugadas.length > 0;
  const puedoTirar = puedoJugar && jugadas.some(esTirar);
  const movs = puedoJugar ? (jugadas.filter(esMover) as JugadaMover[]) : [];
  const puede = new Set(movs.map((j) => j.f));

  function lugarAhora(a: number, f: number): { p: P; h: number } {
    let siguiente: AnimFicha | null = null;
    for (const an of anims.current) {
      if (an.a !== a || an.f !== f) continue;
      if (t >= an.inicio && t < finDe(an)) return interpolar(an, t);
      if (t < an.inicio && (!siguiente || an.inicio < siguiente.inicio)) siguiente = an;
    }
    if (siguiente) return { p: siguiente.claves[0].p, h: 0 };
    return { p: quietas[a][f], h: 0 };
  }

  const fichas: { a: number; f: number; p: P; h: number }[] = [];
  v.fichas.forEach((l, a) => l.forEach((_, f) => fichas.push({ a, f, ...lugarAhora(a, f) })));
  // las que saltan van arriba, y las mías arriba de las demás
  fichas.sort((x, y) => x.h - y.h || Number(x.a === mi) - Number(y.a === mi));

  /** Adónde llegaría una ficha mía con la cuenta de ahora (para la vista previa y los botones). */
  function destino(j: JugadaMover): { pos: number; texto: string; come: boolean; barrera: boolean } {
    const pos0 = v.fichas[mi!][j.f];
    const c = v.colores[mi!];
    const pos = pos0 === CASA ? 0 : pos0 + j.n;
    let come = false;
    let barrera = false;
    if (pos <= ULTIMA_PISTA) {
      const k = casillaDe(c, pos)!;
      const ahi: number[] = [];
      v.fichas.forEach((l, a) => l.forEach((p, f) => (casillaDe(v.colores[a], p) === k && !(a === mi && f === j.f) ? ahi.push(a) : null)));
      barrera = ahi.length === 1 && ahi[0] === mi;
      come = ahi.some((a) => a !== mi) && (pos0 === CASA ? ahi.length >= 2 : ahi.length === 1 && !esSeguro(k));
    }
    const texto = pos0 === CASA ? "sale de casa" : pos === META ? "¡a la corona!" : pos > ULTIMA_PISTA ? `camino ${pos - ULTIMA_PISTA} de 7` : `casilla ${casillaDe(c, pos)}`;
    return { pos, texto, come, barrera };
  }
  /** ¿Esa ficha está en una barrera (con otra de su color en la misma casilla de la pista)? */
  function enBarrera(a: number, f: number) {
    const p = v.fichas[a][f];
    return p >= 0 && p <= ULTIMA_PISTA && v.fichas[a].some((q, i) => i !== f && q === p);
  }
  const conBarrera = (a: number) => v.fichas[a].some((_, f) => enBarrera(a, f));
  const jPrevia = previa !== null ? movs.find((j) => j.f === previa) : undefined;
  const pPrevia = jPrevia ? lugarDe(v.colores[mi!], destino(jPrevia).pos, giro, 0, v.fichas[mi!].filter((p) => p === META).length) : null;

  // lo que se dice arriba del tablero
  const tv = animando ? turnoVisto : v.turno;
  let estado: string;
  if (final) estado = v.ganador !== null ? `¡${nombre(v.ganador)} llegó a la corona con todas sus fichas!` : "La partida terminó.";
  else if (puedoTirar) estado = v.seises ? "¡Otra vez! Toca el dado." : "¡Te toca! Toca el dado.";
  else if (puedoJugar && v.cuenta) {
    const enCasa = v.fichas[mi!].some((p) => p === CASA);
    if (v.cuenta.tipo === "comer") estado = "¡Comiste! Cuenta 20 con una ficha.";
    else if (v.cuenta.tipo === "meta") estado = "¡Llegaste a la corona! Cuenta 10 con otra ficha.";
    else if (v.cuenta.n === 5 && enCasa && movs.every((j) => v.fichas[mi!][j.f] === CASA)) estado = "Sacaste 5: saca una ficha de tu casa.";
    else if (v.cuenta.n === 6 && conBarrera(mi!) && movs.every((j) => enBarrera(mi!, j.f))) estado = "Sacaste 6: tienes que abrir tu barrera.";
    else estado = `Sacaste ${v.cuenta.n}: elige la ficha que mueves.`;
  } else if (mi === null) estado = "Estás mirando la partida.";
  else if (animando) estado = tv === mi ? "Mira tu jugada…" : `Juega ${nombre(tv)}…`;
  else estado = v.turno === mi ? "Espera un momento…" : `Juega ${nombre(v.turno)}${asientos[v.turno]?.bot ? " (pensando…)" : ""}`;

  const tamDado = Math.round(Math.min(66, Math.max(34, ancho * 0.12)));
  const colorTurno = COLOR[v.colores[tv] ?? 0];

  return (
    <div className="mesa-raiz space-y-3" data-testid="mesa-parchis">
      <style>{ESTILO}</style>
      <Confeti disparo={confeti} />
      {sello && <Sello llave={sello.n} texto={sello.texto} sub={sello.sub} color={sello.color} />}
      <div className="flex flex-col gap-3 md:flex-row md:items-start">
        {/* el tablero cabe en la pantalla: tan ancho como se pueda, sin pasarse del alto que queda */}
        <section className="mx-auto shrink-0" style={{ width: "min(100%, 36rem, max(17rem, calc(100dvh - 21rem)))" }} aria-label="El tablero del parchís">
          <div ref={caja} className="relative aspect-square w-full overflow-hidden rounded-[18px] shadow-xl">
            <svg viewBox="0 0 100 100" className="block h-full w-full select-none" role="img" aria-label="El estadio: la pista redonda, los caminos de llegada y la corona del centro">
              <defs>
                <linearGradient id="pq-madera" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#a8703a" />
                  <stop offset=".5" stopColor="#8a5a2b" />
                  <stop offset="1" stopColor="#6a4220" />
                </linearGradient>
                <radialGradient id="pq-pano" cx=".45" cy=".4" r=".7">
                  <stop offset="0" stopColor="#3f8a5f" />
                  <stop offset="1" stopColor="#1d5233" />
                </radialGradient>
                <linearGradient id="pq-oro" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#fff1a8" />
                  <stop offset=".5" stopColor="#e5b23a" />
                  <stop offset="1" stopColor="#a36f0f" />
                </linearGradient>
                <radialGradient id="pq-luz" cx=".5" cy=".5" r=".5">
                  <stop offset="0" stopColor="#fffbe0" stopOpacity=".95" />
                  <stop offset="1" stopColor="#ffe9a0" stopOpacity="0" />
                </radialGradient>
                {COLOR.map((c, k) => (
                  <radialGradient key={k} id={`pq-ficha-${k}`} cx=".38" cy=".32" r=".75">
                    <stop offset="0" stopColor={CLARO[k]} />
                    <stop offset=".55" stopColor={c} />
                    <stop offset="1" stopColor={OSCURO[k]} />
                  </radialGradient>
                ))}
              </defs>
              <Tablero giro={giro} activos={activos} />
              {/* el borde del paño dice de quién es el turno */}
              <circle cx="50" cy="50" r={GEO.pano} fill="none" stroke={colorTurno} strokeWidth="1.1" style={{ transition: "stroke .4s" }} />
              {/* la casa de quien juega late */}
              {v.colores.map((c, a) => {
                const p = centroCasa(c, giro);
                return (
                  <g key={a} pointerEvents="none">
                    {a === tv && !final && <circle cx={f2(p.x)} cy={f2(p.y)} r="8.2" fill="none" stroke={COLOR[c]} strokeWidth=".8" className="pq-late" />}
                  </g>
                );
              })}
              {/* los efectos */}
              {efectos.current.map((x) => {
                const u = (t - x.inicio) / x.dur;
                if (u < 0 || u > 1) return null;
                if (x.tipo === "comida")
                  return (
                    <g key={x.id} transform={`translate(${f2(x.p.x)} ${f2(x.p.y)})`} opacity={f2(1 - u)}>
                      <circle r={f2(2 + u * 6)} fill="none" stroke="#b91c1c" strokeWidth={f2(1.2 * (1 - u) + 0.2)} />
                      {[0, 1, 2, 3, 4, 5, 6, 7].map((k) => {
                        const a = (k / 8) * Math.PI * 2;
                        const r1 = 2 + u * 3;
                        const r2 = 3 + u * 5;
                        return <line key={k} x1={f2(Math.cos(a) * r1)} y1={f2(Math.sin(a) * r1)} x2={f2(Math.cos(a) * r2)} y2={f2(Math.sin(a) * r2)} stroke={x.color} strokeWidth=".6" strokeLinecap="round" />;
                      })}
                    </g>
                  );
                if (x.tipo === "corona")
                  return (
                    <g key={x.id} transform={`translate(${f2(x.p.x)} ${f2(x.p.y)})`} opacity={f2(1 - u * u)}>
                      <circle r={f2(4 + u * 9)} fill="url(#pq-luz)" />
                      <circle r={f2(2.5 + u * 7)} fill="none" stroke="url(#pq-oro)" strokeWidth={f2(1.3 * (1 - u) + 0.2)} />
                      {[0, 1, 2, 3, 4].map((k) => {
                        const a = (k / 5) * Math.PI * 2 + u * 2;
                        const r = 3 + u * 8;
                        return <circle key={k} cx={f2(Math.cos(a) * r)} cy={f2(Math.sin(a) * r)} r=".55" fill="#ffe27a" />;
                      })}
                    </g>
                  );
                return <circle key={x.id} cx={f2(x.p.x)} cy={f2(x.p.y)} r={f2(2.4 + u * 2.5)} fill="none" stroke={x.color} strokeWidth={f2(1 * (1 - u) + 0.15)} opacity={f2(1 - u)} />;
              })}
              {/* la última jugada: un aro en la ficha que se movió */}
              {!animando &&
                !final &&
                (() => {
                  const u = [...(v.eventos as Ev[])].reverse().find((x) => x.t === "mueve");
                  if (!u || u.t !== "mueve" || v.fichas[u.a]?.[u.f] !== u.hasta) return null;
                  const p = quietas[u.a][u.f];
                  return <circle cx={f2(p.x)} cy={f2(p.y)} r="2.65" fill="none" stroke={COLOR[v.colores[u.a]]} strokeWidth=".45" strokeDasharray="1 .7" opacity=".9" />;
                })()}
              {/* adónde llegaría la ficha elegida */}
              {pPrevia && <circle cx={f2(pPrevia.x)} cy={f2(pPrevia.y)} r="2.3" fill="none" stroke="#fff" strokeWidth=".6" strokeDasharray=".8 .6" className="pq-late" />}
              {/* las fichas */}
              {fichas.map(({ a, f, p, h }) => (
                <Ficha key={`${a}-${f}`} p={p} h={h} color={v.colores[a]} n={a === mi ? f + 1 : null} brilla={a === mi && puede.has(f)} />
              ))}
              {/* donde se toca para mover */}
              {movs.map((j) => {
                const p = quietas[mi!][j.f];
                return (
                  <circle
                    key={j.f}
                    cx={f2(p.x)}
                    cy={f2(p.y)}
                    r="4.6"
                    fill="transparent"
                    className="cursor-pointer"
                    onClick={() => jugar(j)}
                    onMouseEnter={() => setPrevia(j.f)}
                    onMouseLeave={() => setPrevia((x) => (x === j.f ? null : x))}
                    data-testid={`parchis-ficha-${j.f}`}
                  >
                    <title>{`Mover la ficha ${j.f + 1}`}</title>
                  </circle>
                );
              })}
            </svg>
            {/* el dado, en el paño del centro */}
            <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center" data-testid="parchis-dado">
              <div className={`rounded-[24%] ${puedoTirar ? "pq-dado-listo" : ""}`}>
                <Dado i={2} valor={dado.valor} vueltas={dado.vueltas} guardado={false} tam={tamDado} deshabilitado={!puedoTirar} onClick={() => (puedoTirar ? jugar({ t: "tirar" }) : undefined)} />
              </div>
            </div>
            {puedoTirar && (
              <button
                type="button"
                onClick={() => jugar({ t: "tirar" })}
                className="absolute left-1/2 top-[61.5%] -translate-x-1/2 rounded-full bg-black/60 px-2.5 py-0.5 text-[11px] font-black text-amber-100 shadow"
                data-testid="parchis-tirar"
              >
                Toca el dado
              </button>
            )}
            {/* lo que pasó, un momento */}
            {mensaje && (
              <div key={mensaje.id} className="mesa-pop pointer-events-none absolute inset-x-0 top-[6%] z-20 flex justify-center px-6" role="status" aria-live="polite">
                <div className="max-w-[86%] rounded-2xl border-2 bg-[#fffaf0]/95 px-3 py-1.5 text-center shadow-lg" style={{ borderColor: mensaje.color }}>
                  <p className="font-serif text-[15px] font-black leading-tight" style={{ color: mensaje.color }}>
                    {mensaje.texto}
                  </p>
                  {mensaje.sub && <p className="text-[11px] font-bold text-stone-600">{mensaje.sub}</p>}
                </div>
              </div>
            )}
          </div>
        </section>

        <div className="min-w-0 flex-1 space-y-2.5">
          <div className="flex items-start gap-2">
            <p className={`flex-1 rounded-xl px-3 py-2 text-center text-[14px] font-black leading-snug shadow-sm ${puedoJugar ? "bg-amber-100 text-amber-900 ring-2 ring-amber-400 dark:bg-amber-900/40 dark:text-amber-100" : "bg-white/80 text-stone-700 dark:bg-stone-800 dark:text-stone-200"}`} data-testid="parchis-estado">
              {estado}
            </p>
            <BotonSonido />
          </div>
          {movs.length > 0 && (
            <div className="grid gap-1.5" data-testid="parchis-movidas">
              {movs.map((j) => {
                const d = destino(j);
                const c = v.colores[mi!];
                return (
                  <button
                    key={j.f}
                    type="button"
                    onClick={() => jugar(j)}
                    onMouseEnter={() => setPrevia(j.f)}
                    onMouseLeave={() => setPrevia((x) => (x === j.f ? null : x))}
                    onFocus={() => setPrevia(j.f)}
                    onBlur={() => setPrevia((x) => (x === j.f ? null : x))}
                    className="flex items-center gap-2 rounded-xl border-b-4 bg-white px-3 py-2 text-left text-[13px] font-bold text-stone-800 shadow transition hover:-translate-y-0.5 active:translate-y-0.5 active:border-b-2 dark:bg-stone-800 dark:text-stone-100"
                    style={{ borderColor: OSCURO[c] }}
                    data-testid={`parchis-mover-${j.f}`}
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[12px] font-black text-white shadow-inner" style={{ background: `radial-gradient(circle at 35% 30%, ${CLARO[c]}, ${COLOR[c]} 55%, ${OSCURO[c]})` }}>
                      {j.f + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      Ficha {j.f + 1} <span className="font-semibold text-stone-500 dark:text-stone-400">· {d.texto}</span>
                    </span>
                    {d.come && <span className="rounded-full bg-red-100 px-2 py-0.5 text-[11px] font-black text-red-800">come</span>}
                    {d.barrera && <span className="rounded-full bg-stone-200 px-2 py-0.5 text-[11px] font-black text-stone-700">barrera</span>}
                  </button>
                );
              })}
            </div>
          )}
          {/* cada jugador: su color, lo que le queda y lo que avanzó */}
          <ul className="grid grid-cols-2 gap-1.5 md:grid-cols-1" data-testid="parchis-jugadores">
            {Array.from({ length: n }, (_, a) => {
              const c = v.colores[a];
              const l = v.fichas[a] ?? [];
              const enMeta = l.filter((p) => p === META).length;
              const enCasa = l.filter((p) => p === CASA).length;
              const avance = l.reduce((s, p) => s + (p === CASA ? 0 : p === META ? 72 : p + 1), 0) / (72 * Math.max(1, v.nFichas));
              const juega = a === tv && !final;
              return (
                <li key={a} className={`rounded-xl px-2.5 py-1.5 transition ${juega ? "bg-amber-100 shadow ring-2 ring-amber-400 dark:bg-amber-900/40" : "bg-white/70 dark:bg-stone-800/70"}`}>
                  <div className="flex items-center gap-2">
                    <span className={`h-4 w-4 shrink-0 rounded-full shadow-inner ${juega ? "mesa-late" : ""}`} style={{ background: `radial-gradient(circle at 35% 30%, ${CLARO[c]}, ${COLOR[c]} 60%, ${OSCURO[c]})` }} />
                    <span className="min-w-0 flex-1 truncate text-[12px] font-bold sm:text-[13px]">
                      {nombre(a)}
                      {asientos[a]?.bot ? " 🤖" : ""}
                      {a === mi ? " (tú)" : ""}
                    </span>
                    <span className="hidden text-[11px] font-semibold text-stone-500 sm:inline dark:text-stone-400">{NOMBRE_COLOR[c]}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-[11px] font-semibold text-stone-600 dark:text-stone-300">
                    <span className="inline-flex items-center gap-1" title="En casa">
                      <House className="h-3.5 w-3.5 text-[#8a5a32] dark:text-amber-200" aria-hidden /> {enCasa}
                    </span>
                    <span className="inline-flex items-center gap-1" title="En la corona">
                      <Crown className="h-3.5 w-3.5 text-[#b88a1e] dark:text-amber-300" aria-hidden /> {enMeta}/{v.nFichas}
                    </span>
                    {v.comio[a] ? <span>comió {v.comio[a]}</span> : null}
                    <span className="ml-auto h-1.5 w-10 overflow-hidden rounded-full bg-stone-300/60 sm:w-20">
                      <span className="block h-full rounded-full transition-all duration-700" style={{ width: `${Math.round(avance * 100)}%`, background: COLOR[c] }} />
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="rounded-xl bg-amber-50/80 px-3 py-2 text-[12px] italic leading-snug text-stone-700 dark:bg-amber-950/30 dark:text-amber-100/90">
            «{PARCHIS_MESA.verso.text}» <span className="font-bold not-italic">({PARCHIS_MESA.verso.ref})</span>
          </p>
        </div>
      </div>
    </div>
  );
}

const ESTILO = `
@keyframes pq-late { 0%, 100% { transform: scale(.88); opacity: .55; } 50% { transform: scale(1.12); opacity: 1; } }
.pq-late { animation: pq-late 1.1s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
@keyframes pq-dado { 0%, 100% { box-shadow: 0 0 0 3px rgba(241,194,50,.55), 0 0 14px rgba(241,194,50,.6); } 50% { box-shadow: 0 0 0 5px rgba(241,194,50,.9), 0 0 24px rgba(241,194,50,.95); } }
.pq-dado-listo { animation: pq-dado 1.1s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) { .pq-late, .pq-dado-listo { animation: none; } }
`;
