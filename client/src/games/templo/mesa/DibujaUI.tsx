/**
 * «Dibuja y adivina» en la pantalla (shared/mesa/dibuja.ts): el lienzo de papel donde se dibuja con el dedo (o el
 * ratón), la paleta de colores y grosores, los trazos que les llegan a los demás dibujándose solos, las ocho palabras
 * para elegir, y la palabra que se revela al final de cada ronda.
 */
import { useEffect, useRef, useState } from "react";
import { Eraser, Check } from "lucide-react";
import { COLORES_DIBUJA, DIBUJA, GROSORES_DIBUJA, type DibujaVista, type JugadaDibuja, type Trazo } from "@shared/mesa/dibuja";
import { mesaSonido } from "./mesa-sonido";
import { Asiento, AvisoMesa, BotonSonido, Confeti, RelojAnillo, Sello, colorDe, quedaMs, useAhora, useAvisoCorto, useEventosNuevos, useMusicaDeJuego, type PropsMesa } from "./vida";

const W = 1000;
const H = 750;
const limpio = (n: string) => n.replace(/\s*🤖\s*$/u, "");

function dibujarTrazo(c: CanvasRenderingContext2D, t: Trazo, k: number, hasta = 1) {
  const n = t.p.length / 2;
  const fin = Math.max(1, Math.ceil(n * hasta));
  c.strokeStyle = COLORES_DIBUJA[t.c] ?? "#2a1a10";
  c.fillStyle = c.strokeStyle;
  c.lineWidth = t.g * k;
  c.lineCap = "round";
  c.lineJoin = "round";
  if (n === 1) {
    c.beginPath();
    c.arc(t.p[0] * k, t.p[1] * k, (t.g * k) / 2, 0, Math.PI * 2);
    c.fill();
    return;
  }
  c.beginPath();
  c.moveTo(t.p[0] * k, t.p[1] * k);
  for (let i = 1; i < fin; i++) c.lineTo(t.p[i * 2] * k, t.p[i * 2 + 1] * k);
  c.stroke();
}

/** El lienzo: dibuja los trazos que llegan (los nuevos, poco a poco) y, si me toca, deja dibujar. */
function Lienzo({ trazos, puedo, color, grosor, alTrazo }: { trazos: Trazo[]; puedo: boolean; color: number; grosor: number; alTrazo: (t: Trazo) => void }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const caja = useRef<HTMLDivElement>(null);
  const propio = useRef<Trazo | null>(null);
  const pendientes = useRef<Trazo[]>([]);
  const vistos = useRef(trazos.length);
  const anim = useRef<{ desde: number; inicio: number } | null>(null);
  const [tam, setTam] = useState({ w: 600, h: 450 });

  useEffect(() => {
    const el = caja.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth;
      setTam({ w, h: (w * H) / W });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const pintar = (ahora = performance.now()) => {
    const cv = ref.current;
    if (!cv) return;
    const c = cv.getContext("2d");
    if (!c) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    if (cv.width !== Math.round(tam.w * dpr)) {
      cv.width = Math.round(tam.w * dpr);
      cv.height = Math.round(tam.h * dpr);
    }
    const k = (tam.w * dpr) / W;
    c.clearRect(0, 0, cv.width, cv.height);
    const a = anim.current;
    trazos.forEach((t, i) => {
      let hasta = 1;
      if (a && i >= a.desde) hasta = Math.max(0, Math.min(1, (ahora - a.inicio - (i - a.desde) * 120) / 420));
      if (hasta > 0) dibujarTrazo(c, t, k, hasta);
    });
    for (const t of pendientes.current) dibujarTrazo(c, t, k);
    if (propio.current) dibujarTrazo(c, propio.current, k);
  };

  // los trazos nuevos de los demás se dibujan solos, uno tras otro
  useEffect(() => {
    if (trazos.length < vistos.current) {
      pendientes.current = [];
      anim.current = null;
    } else if (trazos.length > vistos.current) {
      // lo que mandé yo ya llegó: deja de estar pendiente (y no se anima)
      const nuevos = trazos.length - vistos.current;
      const mios = Math.min(nuevos, pendientes.current.length);
      pendientes.current.splice(0, mios);
      if (nuevos > mios) anim.current = { desde: vistos.current + mios, inicio: performance.now() };
    }
    vistos.current = trazos.length;
    let id = 0;
    const paso = (t: number) => {
      pintar(t);
      const a = anim.current;
      if (a && t - a.inicio < 420 + (trazos.length - a.desde) * 120) id = requestAnimationFrame(paso);
      else anim.current = null;
    };
    id = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trazos, tam]);

  const punto = (e: React.PointerEvent) => {
    const r = ref.current!.getBoundingClientRect();
    return [Math.round(((e.clientX - r.left) / r.width) * W), Math.round(((e.clientY - r.top) / r.height) * H)];
  };
  return (
    <div ref={caja} className="relative w-full overflow-hidden rounded-2xl border-4 border-[#7a4a22] shadow-xl" style={{ background: "linear-gradient(135deg,#fffdf5,#f6ead0)" }}>
      <canvas
        ref={ref}
        style={{ width: tam.w, height: tam.h, touchAction: "none", cursor: puedo ? "crosshair" : "default", display: "block" }}
        aria-label={puedo ? "El lienzo: dibuja aquí" : "El dibujo"}
        role="img"
        data-testid="dibuja-lienzo"
        onPointerDown={(e) => {
          if (!puedo) return;
          (e.target as HTMLElement).setPointerCapture(e.pointerId);
          const [x, y] = punto(e);
          propio.current = { c: color, g: grosor, p: [x, y] };
          pintar();
        }}
        onPointerMove={(e) => {
          const t = propio.current;
          if (!t) return;
          const [x, y] = punto(e);
          const n = t.p.length;
          if (Math.hypot(x - t.p[n - 2], y - t.p[n - 1]) < 6) return;
          t.p.push(x, y);
          // un trazo muy largo se manda en partes (cada jugada pesa poco) y sigue desde el último punto
          if (t.p.length >= DIBUJA.maxPorTrazo * 2) {
            pendientes.current.push(t);
            alTrazo(t);
            propio.current = { c: t.c, g: t.g, p: [x, y] };
          }
          pintar();
        }}
        onPointerUp={() => {
          const t = propio.current;
          propio.current = null;
          if (!t) return;
          pendientes.current.push(t);
          pintar();
          alTrazo(t);
        }}
        onPointerCancel={() => {
          propio.current = null;
          pintar();
        }}
      />
    </div>
  );
}

export function DibujaUI({ vista: v, nombres, bots, jugar, recibidaEn }: PropsMesa<DibujaVista, JugadaDibuja>) {
  useMusicaDeJuego("dibuja");
  const ahora = useAhora(250);
  const [aviso, setAviso] = useAvisoCorto();
  const [color, setColor] = useState(0);
  const [grosor, setGrosor] = useState(GROSORES_DIBUJA[1]);
  const [sello, setSello] = useState<{ n: number; texto: string; sub?: string; color?: string } | null>(null);
  const [confeti, setConfeti] = useState(0);
  const yo = v.yo;
  const dibujo = yo != null && v.dibuja === yo && v.fase === "dibujar";

  useEventosNuevos(v.eventos, (e) => {
    if (e.t === "ronda") {
      mesaSonido.campana();
      if (e.dibuja === yo) setSello({ n: e.n, texto: "¡Te toca dibujar!", color: "#e06aa0" });
    } else if (e.t === "acierto") {
      mesaSonido.bien();
      if (e.a === yo) setConfeti((x) => x + 1);
    } else if (e.t === "fallo") {
      if (e.a === yo) mesaSonido.mal();
    } else if (e.t === "trazo") {
      if (e.a !== yo) mesaSonido.carta();
    } else if (e.t === "revela") {
      mesaSonido.campana();
    } else if (e.t === "fin") {
      setConfeti((x) => x + 1);
      mesaSonido.fiesta();
    }
  });

  async function mandar(j: JugadaDibuja) {
    const r = await jugar(j);
    if (!r.ok && r.message) setAviso(r.message);
  }

  const restante = quedaMs(v.restanteMs, recibidaEn, ahora);
  const quien = v.dibuja != null ? limpio(nombres[v.dibuja] ?? "") : "";

  return (
    <div className="mesa-raiz space-y-3" data-testid="mesa-dibuja">
      <Confeti disparo={confeti} />
      {sello && <Sello llave={sello.n} texto={sello.texto} sub={sello.sub} color={sello.color} />}
      <div className="flex flex-wrap items-center gap-1.5">
        {nombres.map((n, a) => (
          <Asiento key={a} a={a} nombre={n} bot={bots[a]} yo={a === yo} activo={a === v.dibuja && v.fase === "dibujar"} extra={bots[a] ? "mira" : v.aciertos.includes(a) ? "¡adivinó!" : `${v.puntos[a] ?? 0} puntos`} tam={28} />
        ))}
        <span className="ml-auto flex items-center gap-2">
          {v.fase !== "fin" && <RelojAnillo ms={restante} total={v.totalMs} tam={32} />}
          <BotonSonido />
        </span>
      </div>

      <div className="grid gap-3 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] md:items-start">
        <div className="space-y-2">
          <p className="text-center font-serif text-lg font-black text-[#3a2616] dark:text-amber-100">
            {v.fase === "preparar"
              ? "Preparando los lápices…"
              : v.fase === "fin"
                ? "¡Terminó!"
                : dibujo
                  ? (
                      <span>
                        Dibuja: <span className="rounded-lg bg-[#e06aa0] px-2 text-white">«{v.palabra}»</span>
                      </span>
                    )
                  : v.fase === "revelar"
                    ? <span>Era: <span className="rounded-lg bg-emerald-600 px-2 text-white">«{v.palabra}»</span></span>
                    : `Dibuja ${quien}… ¿qué será?`}
            <span className="ml-2 text-[12px] font-bold text-stone-500">
              ronda {v.ronda} de {v.rondas}
            </span>
          </p>
          <Lienzo trazos={v.trazos} puedo={dibujo} color={color} grosor={grosor} alTrazo={(t) => void mandar({ t: "trazo", ...t })} />
          {dibujo && (
            <div className="flex flex-wrap items-center justify-center gap-2" aria-label="La paleta">
              {COLORES_DIBUJA.map((c, i) => (
                <button key={c} type="button" onClick={() => setColor(i)} aria-pressed={color === i} aria-label={`Color ${i + 1}`} className={`h-8 w-8 rounded-full border-2 shadow transition ${color === i ? "scale-110 border-amber-500 ring-2 ring-amber-300" : "border-white"}`} style={{ background: c }} />
              ))}
              <span className="mx-1 h-6 w-px bg-stone-300" aria-hidden="true" />
              {GROSORES_DIBUJA.map((g) => (
                <button key={g} type="button" onClick={() => setGrosor(g)} aria-pressed={grosor === g} aria-label={`Grosor ${g}`} className={`flex h-8 w-8 items-center justify-center rounded-full border-2 bg-white shadow ${grosor === g ? "border-amber-500 ring-2 ring-amber-300" : "border-stone-200"}`}>
                  <span className="rounded-full" style={{ width: Math.min(22, g * 0.9 + 3), height: Math.min(22, g * 0.9 + 3), background: COLORES_DIBUJA[color] === "#ffffff" ? "#ddd" : COLORES_DIBUJA[color] }} />
                </button>
              ))}
              <button type="button" onClick={() => void mandar({ t: "borrar" })} className="flex items-center gap-1 rounded-full border-2 border-stone-200 bg-white px-3 py-1.5 text-[13px] font-bold text-stone-700 shadow" data-testid="dibuja-borrar">
                <Eraser className="h-4 w-4" /> Borrar todo
              </button>
              {v.practica && (
                <button type="button" onClick={() => void mandar({ t: "listo" })} className="flex items-center gap-1 rounded-full bg-emerald-600 px-3 py-1.5 text-[13px] font-black text-white shadow" data-testid="dibuja-listo">
                  <Check className="h-4 w-4" /> ¡Listo!
                </button>
              )}
            </div>
          )}
        </div>

        <div className="space-y-2">
          {v.opciones && (
            <section className="grid grid-cols-2 gap-2" aria-label="¿Qué está dibujando?">
              {v.opciones.map((op) => {
                const mia = v.miEleccion === op.texto;
                return (
                  <button
                    key={op.o}
                    type="button"
                    disabled={v.miEleccion != null}
                    onClick={() => void mandar({ t: "adivinar", o: op.o })}
                    aria-pressed={mia}
                    className={`min-h-[2.75rem] rounded-xl border-2 px-2 py-2 font-serif text-[14px] font-bold shadow-sm transition active:scale-95 ${
                      mia ? (v.miAcierto ? "border-emerald-500 bg-emerald-50 text-emerald-900" : "border-red-400 bg-red-50 text-red-900") : "border-amber-200 bg-white text-stone-800 hover:border-amber-400"
                    } disabled:cursor-default`}
                    data-testid={`dibuja-opcion-${op.o}`}
                  >
                    {op.texto}
                  </button>
                );
              })}
            </section>
          )}
          {v.miEleccion && v.fase === "dibujar" && (
            <p className={`mesa-pop rounded-xl px-3 py-2 text-center text-[14px] font-black ${v.miAcierto ? "bg-emerald-100 text-emerald-900" : "bg-amber-50 text-amber-900"}`}>
              {v.miAcierto ? "¡Adivinaste! Espera a los demás…" : "No era esa. Espera la siguiente ronda."}
            </p>
          )}
          {v.practica && v.fase === "dibujar" && (
            <p className="rounded-xl bg-white/80 px-3 py-2 text-center text-[13px] font-semibold text-stone-700 shadow-sm dark:bg-stone-900/70 dark:text-stone-200">
              Práctica: dibuja la palabra antes de que se acabe el reloj. En grupo, los demás la adivinan.
            </p>
          )}
          {(v.aciertos.length > 0 || v.fallaron.length > 0) && (
            <section className="rounded-xl border border-amber-200 bg-white/85 p-2 text-[13px] dark:bg-stone-900/70" aria-label="Quiénes adivinaron">
              {v.aciertos.map((a, k) => (
                <p key={a} className="mesa-pop font-bold" style={{ color: colorDe(a) }}>
                  {["🥇", "🥈", "🥉"][k] ?? "✓"} {limpio(nombres[a] ?? "")} adivinó
                </p>
              ))}
              {v.fallaron.map((a) => (
                <p key={a} className="text-stone-500">
                  {limpio(nombres[a] ?? "")} eligió otra
                </p>
              ))}
            </section>
          )}
        </div>
      </div>
      <AvisoMesa texto={aviso} />
    </div>
  );
}
