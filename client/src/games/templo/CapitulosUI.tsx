/**
 * La historia de la temporada (shared/capitulos.ts), la pantalla: los cuatro capítulos de la semana, la meta de toda la
 * ciudad (la lleva el servidor), lo que aportaste, el premio y la fiesta final en la plaza. Los capítulos que vienen se
 * ven cerrados: solo su nombre y el día en que se abren.
 */
import { useContext, useEffect, useState } from "react";
import { BookOpen, Eye, Footprints, Loader2, Lock, PartyPopper, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CiudadCtx } from "./CiudadUI";
import { gameStore } from "./store";
import { Card, VerseBox } from "./ui";
import type { Line } from "./data";
import { personajeCiudad } from "@shared/personajes";
import {
  APORTE_MINIMO_CAPITULO, PRENDAS_CAPITULOS, PUNTOS_CAPITULO, arcoDeTemporada, fechaEnPalabras, horaEnPalabras, type Capitulo, type CapituloVista, type CapitulosVista,
  type GraciasRespuesta,
} from "@shared/capitulos";

export async function traerCapitulos(): Promise<CapitulosVista | null> {
  try {
    const r = await fetch("/api/jerusalen/capitulos", { credentials: "include", cache: "no-store" });
    if (!r.ok) return null;
    return ((await r.json()) as { vista: CapitulosVista | null }).vista;
  } catch {
    return null;
  }
}

/** Lo que se cuenta al empezar un capítulo (la ventana de diálogo del juego). */
export function dialogoDelCapitulo(cap: Capitulo): Line[] {
  return cap.dialogo.map((l) => ({ quien: l.quien, texto: l.texto, ref: l.ref }));
}

const miles = (n: number) => n.toLocaleString("es");

export function prendaDe(id: string) {
  return PRENDAS_CAPITULOS.find((p) => p.id === id);
}

/** «el manto» o «la faja» (y «póntelo» o «póntela»). */
const esManto = (id: string) => id.startsWith("manto-");

function Barra({ valor, max }: { valor: number; max: number }) {
  const p = Math.max(0, Math.min(100, Math.round((valor / Math.max(1, max)) * 100)));
  return (
    <div className="h-3 w-full overflow-hidden rounded-full bg-stone-200 dark:bg-stone-800" role="progressbar" aria-valuenow={p} aria-valuemin={0} aria-valuemax={100}>
      <div className="h-full rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 transition-[width] duration-700" style={{ width: `${p}%` }} />
    </div>
  );
}

function Prenda({ id }: { id: string }) {
  const p = prendaDe(id);
  if (!p) return null;
  return (
    <span className="inline-flex items-center gap-1.5 font-bold">
      <span className="inline-block h-3.5 w-3.5 rounded-full border border-black/20" style={{ background: p.color }} aria-hidden />
      {p.nombre}
    </span>
  );
}

export function CapitulosView() {
  const { city } = useContext(CiudadCtx);
  const [v, setV] = useState<CapitulosVista | null>(null);
  const [error, setError] = useState(false);
  const [ver, setVer] = useState<number | null>(null);
  const [dando, setDando] = useState(false);
  const [aviso, setAviso] = useState<string | null>(null);

  useEffect(() => {
    let vivo = true;
    void traerCapitulos().then((x) => {
      if (!vivo) return;
      if (x) setV(x);
      else setError(true);
    });
    return () => {
      vivo = false;
    };
  }, []);

  const arco = v ? arcoDeTemporada(v.temporada) : null;
  const n = ver ?? v?.hoy?.n ?? v?.capitulos.filter((c) => c.estado === "pasado").length ?? 1;
  const cv: CapituloVista | undefined = v?.capitulos.find((c) => c.n === n);
  const cap = arco?.capitulos.find((c) => c.n === n);

  async function darGracias() {
    setDando(true);
    setAviso(null);
    try {
      const r = await fetch("/api/jerusalen/capitulos/gracias", { method: "POST", credentials: "include", headers: { "Content-Type": "application/json" }, body: "{}" });
      const d = (await r.json().catch(() => null)) as (GraciasRespuesta & { message?: string }) | null;
      if (!r.ok || !d) {
        setAviso(d?.message || "No se pudo. Revisa tu conexión.");
        return;
      }
      setV(d.vista);
      city?.audio.trumpet(true);
      const prenda = arco ? prendaDe(arco.fiesta.premio.prenda) : undefined;
      gameStore.toast(`${arco?.fiesta.icono ?? "🎺"} ¡Diste gracias en la fiesta! +${d.gozo} de gozo${d.nuevo && prenda ? ` y la «${prenda.nombre}» en tu armario` : ""}`, "gold");
      for (const a of d.avisos) gameStore.toast(a.gozo ? `${a.titulo} · +${a.gozo} de gozo` : a.titulo, "gold");
      city?.ponerGozo(d.gozoTotal);
      if (arco) setAviso(`«${arco.fiesta.gracias.text}» (${arco.fiesta.gracias.ref})`);
    } catch {
      setAviso("No se pudo. Revisa tu conexión.");
    } finally {
      setDando(false);
    }
  }

  function irConGuia(id: string) {
    gameStore.close();
    setTimeout(() => city?.irAPersonaje(id), 60);
  }

  return (
    <Card
      title={
        <span className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" /> La historia de la temporada
        </span>
      }
      onClose={() => gameStore.close()}
      wide
      testid="capitulos"
    >
      <div className="space-y-4 p-4 text-sm">
        {!v && !error && (
          <p className="flex items-center gap-2 text-stone-500">
            <Loader2 className="h-4 w-4 animate-spin" /> Abriendo el rollo de la historia…
          </p>
        )}
        {error && <p className="rounded-xl bg-red-50 p-2.5 text-red-900 dark:bg-red-950/30 dark:text-red-200">No se pudo traer la historia de la temporada. Revisa tu conexión.</p>}
        {v && arco && (
          <>
            <header className="space-y-1 text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-300">Temporada {v.temporada} · {v.arco.subtitulo}</p>
              <h2 className="font-serif text-2xl font-black text-amber-900 dark:text-amber-200" data-testid="capitulos-titulo">{v.arco.titulo}</h2>
              <p className="text-[11px] text-stone-500">{v.arco.refs}</p>
            </header>
            <VerseBox text={arco.lema.text} refName={arco.lema.ref} />

            <ol className="grid grid-cols-4 gap-1.5" data-testid="capitulos-linea">
              {v.capitulos.map((c) => {
                const abierto = c.estado !== "proximo";
                const elegido = c.n === n;
                return (
                  <li key={c.n}>
                    <button
                      type="button"
                      disabled={!abierto}
                      aria-pressed={elegido}
                      onClick={() => setVer(c.n)}
                      className={`flex h-full w-full flex-col items-center gap-0.5 rounded-xl border p-1.5 text-center text-[11px] leading-tight transition ${
                        elegido ? "border-amber-500 bg-amber-100 shadow dark:bg-amber-900/40" : abierto ? "border-stone-200 bg-white hover:border-amber-400 dark:border-stone-700 dark:bg-stone-900" : "border-dashed border-stone-300 bg-stone-50 text-stone-400 dark:border-stone-700 dark:bg-stone-900/40"
                      }`}
                      data-testid={`capitulo-${c.n}`}
                    >
                      <span className="text-xl leading-none">{abierto ? c.icono : <Lock className="mx-auto h-5 w-5" />}</span>
                      <span className="font-bold">Capítulo {c.n}</span>
                      <span className="line-clamp-2">{abierto ? c.titulo : fechaEnPalabras(c.desde)}</span>
                      <span className={`mt-0.5 rounded-full px-1.5 text-[10px] font-bold ${c.cumplido ? "bg-emerald-600 text-white" : c.estado === "actual" ? "bg-amber-500 text-amber-950" : c.estado === "pasado" ? "bg-stone-300 text-stone-700 dark:bg-stone-700 dark:text-stone-200" : "bg-transparent"}`}>
                        {c.cumplido ? "✓ cumplido" : c.estado === "actual" ? "esta semana" : c.estado === "pasado" ? "terminó" : "pronto"}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>

            {cv && cap && (
              <section className="space-y-3 rounded-2xl border border-amber-200 bg-amber-50/50 p-3 dark:border-amber-900/60 dark:bg-amber-950/10" data-testid="capitulo-detalle">
                <div className="flex items-start gap-3">
                  <span className="text-4xl leading-none">{cap.icono}</span>
                  <div className="min-w-0">
                    <p className="font-serif text-xl font-black">{cap.titulo}</p>
                    <p className="text-[11px] text-stone-500">
                      Del {fechaEnPalabras(cv.desde)} al {fechaEnPalabras(cv.hasta)}
                      {cv.estado === "actual" && v.hoy ? ` · ${v.hoy.diasRestantes === 1 ? "último día" : `quedan ${v.hoy.diasRestantes} días`}` : ""}
                    </p>
                  </div>
                </div>
                <div className="space-y-1.5 leading-relaxed">
                  {cap.historia.map((h, i) => (
                    <p key={i}>{h}</p>
                  ))}
                </div>
                <VerseBox text={cap.verso.text} refName={cap.verso.ref} />

                <div className="space-y-1.5 rounded-xl bg-white/80 p-3 dark:bg-stone-900/60" data-testid="capitulo-meta">
                  <p className="flex items-baseline justify-between gap-2 font-black">
                    <span>La meta de toda la ciudad</span>
                    {cv.meta !== null && (
                      <span className="text-xs font-bold text-amber-800 dark:text-amber-300">
                        {miles(cv.puntos)} de {miles(cv.meta)} {cap.unidad[1]}
                      </span>
                    )}
                  </p>
                  {cv.meta !== null ? <Barra valor={cv.puntos} max={cv.meta} /> : <p className="text-xs text-stone-500">Todavía nadie aportó esta semana: ¡sé el primero!</p>}
                  <p className="text-xs text-stone-600 dark:text-stone-300">
                    Esta semana la ciudad se une para <b>{cap.tarea}</b>. Cada deber suma {PUNTOS_CAPITULO.deber} {cap.unidad[0]}; cada encargo del día, {PUNTOS_CAPITULO.encargo}; cada recado de la calle de los siervos, {PUNTOS_CAPITULO.recado}.
                  </p>
                  <p className="text-xs">
                    Tú: <b data-testid="capitulo-mios">{miles(cv.mios)}</b> {cv.mios === 1 ? cap.unidad[0] : cap.unidad[1]}
                    {!cv.premiado && cv.mios < APORTE_MINIMO_CAPITULO && cv.estado === "actual" ? ` (para el premio te faltan ${APORTE_MINIMO_CAPITULO - cv.mios})` : ""}
                  </p>
                </div>

                <div className="rounded-xl border border-amber-300 bg-gradient-to-br from-amber-100 to-yellow-50 p-3 dark:border-amber-800 dark:from-amber-950/50 dark:to-stone-900" data-testid="capitulo-premio">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">El premio</p>
                  <p>
                    Si la ciudad cumple la meta, quienes aportaron al menos {APORTE_MINIMO_CAPITULO} reciben <b>+{cap.premio.gozo} de gozo</b> y {esManto(cap.premio.prenda) ? "el" : "la"} <Prenda id={cap.premio.prenda} />, que no se vende.
                  </p>
                  <p className="mt-1 text-xs font-bold">
                    {cv.premiado ? (
                      <span className="text-emerald-700 dark:text-emerald-300">✓ Ya lo recibiste: {esManto(cap.premio.prenda) ? "póntelo" : "póntela"} en tu casa, en «Adornos y ropa».</span>
                    ) : cv.cumplido ? (
                      cv.estado === "actual" ? (
                        <span className="text-amber-800 dark:text-amber-200">¡La ciudad ya cumplió! Llega a {APORTE_MINIMO_CAPITULO} esta semana y es tuyo.</span>
                      ) : (
                        <span className="text-stone-500">La ciudad lo cumplió.</span>
                      )
                    ) : cv.estado === "actual" ? (
                      <span className="text-stone-600 dark:text-stone-300">La ciudad todavía no llega. ¡Cada deber cuenta!</span>
                    ) : (
                      <span className="text-stone-500">Esa semana la ciudad no llegó a la meta.</span>
                    )}
                  </p>
                </div>

                {cv.estado === "actual" && v.top.length > 0 && (
                  <div data-testid="capitulo-top">
                    <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-stone-500">Los que más ayudan esta semana</p>
                    <ol className="space-y-0.5 text-xs">
                      {v.top.map((t, i) => (
                        <li key={i} className="flex justify-between gap-2">
                          <span>
                            {["🥇", "🥈", "🥉", "4.", "5."][i]} {t.nombre}
                          </span>
                          <b>{miles(t.puntos)}</b>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {city && cv.estado !== "proximo" && (
                    <Button size="sm" onClick={() => (gameStore.close(), setTimeout(() => city.verCapitulo(cap.n), 80))} data-testid="capitulo-ver">
                      <Eye className="mr-1.5 h-4 w-4" /> Verlo en la ciudad
                    </Button>
                  )}
                  {city && (
                    <Button size="sm" variant="secondary" onClick={() => irConGuia(cap.guia)} data-testid="capitulo-guia">
                      <Footprints className="mr-1.5 h-4 w-4" /> Ir con {personajeCiudad(cap.guia)?.nombre ?? cap.guia}
                    </Button>
                  )}
                  <Button size="sm" variant="ghost" onClick={() => (gameStore.close(), gameStore.push({ kind: "dialog", id: `capitulo:${v.temporada}:${cap.n}:otra`, lines: dialogoDelCapitulo(cap) }))} data-testid="capitulo-comienzo">
                    <RotateCcw className="mr-1.5 h-4 w-4" /> Volver a ver el comienzo
                  </Button>
                </div>
              </section>
            )}

            <section className="space-y-2 rounded-2xl border border-orange-300 bg-gradient-to-br from-orange-50 to-amber-50 p-3 dark:border-orange-900 dark:from-orange-950/30 dark:to-stone-900" data-testid="capitulos-fiesta">
              <p className="flex items-center gap-2 font-serif text-lg font-black">
                <PartyPopper className="h-5 w-5 text-orange-600" /> {arco.fiesta.icono} {arco.fiesta.titulo}
              </p>
              <p className="text-xs font-bold text-orange-800 dark:text-orange-300">
                Del {fechaEnPalabras(v.fiesta.desde)} al {fechaEnPalabras(v.fiesta.hasta)}, en la plaza. La gran alabanza: el {fechaEnPalabras(v.fiesta.vivo.dia)}, de las {horaEnPalabras(v.fiesta.vivo.desde)} a las {horaEnPalabras(v.fiesta.vivo.hasta)} (hora de Texas).
              </p>
              <p className="leading-relaxed">{arco.fiesta.texto}</p>
              <p className="text-xs">
                Si llegas en la gran alabanza: <b>+{arco.fiesta.premio.vivo} de gozo más</b>. Ya {v.fiesta.participantes === 1 ? "dio gracias 1 vecino" : `dieron gracias ${v.fiesta.participantes} vecinos`}.
              </p>
              {v.fiesta.momento === "fiesta" || v.fiesta.momento === "vivo" ? (
                <div className="flex flex-wrap items-center gap-2">
                  {v.fiesta.yo.fui && (v.fiesta.momento !== "vivo" || v.fiesta.yo.enVivo) ? (
                    <span className="font-bold text-emerald-700 dark:text-emerald-300" data-testid="fiesta-hecha">
                      ✓ Diste gracias{v.fiesta.yo.enVivo ? " en la gran alabanza" : ""}. ¡Bendito sea Jehová!
                    </span>
                  ) : (
                    <Button className="tpl-btn-oro" disabled={dando} onClick={() => void darGracias()} data-testid="fiesta-gracias">
                      {dando ? <Loader2 className="h-4 w-4 animate-spin" /> : `${arco.fiesta.icono} Dar gracias`}
                    </Button>
                  )}
                  {city && (
                    <Button size="sm" variant="secondary" onClick={() => (gameStore.close(), city.irA("plaza"))} data-testid="fiesta-plaza">
                      <Footprints className="mr-1.5 h-4 w-4" /> Ir a la plaza
                    </Button>
                  )}
                </div>
              ) : v.fiesta.momento === "despues" ? (
                <p className="text-xs font-bold text-stone-500">La fiesta ya pasó. ¡Pronto empieza otra historia!</p>
              ) : (
                <p className="text-xs font-bold text-stone-500">Todavía no: la fiesta se abre el {fechaEnPalabras(v.fiesta.desde)}.</p>
              )}
              {aviso && <p className="rounded-lg bg-white/80 px-2 py-1.5 text-xs dark:bg-stone-900/70" data-testid="fiesta-aviso">{aviso}</p>}
              <VerseBox text={arco.fiesta.verso.text} refName={arco.fiesta.verso.ref} />
            </section>
          </>
        )}
      </div>
    </Card>
  );
}
