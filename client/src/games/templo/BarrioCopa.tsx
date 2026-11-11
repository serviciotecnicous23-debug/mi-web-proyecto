/**
 * La copa de los barrios y la misión del barrio de hoy (shared/barrio-juntos.ts), en la ventana del barrio; y el
 * aviso de arriba de la pantalla mientras estás con tus vecinos en el lugar de la misión.
 */
import { useContext, useEffect, useState } from "react";
import { Loader2, MapPin, Megaphone, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CiudadCtx } from "./CiudadUI";
import { gameStore } from "./store";
import { pedirBarrio } from "./barrio-chat";
import { useJuntos } from "./juntos";
import { COPA_PUNTOS, JUNTOS_SEGUNDOS, MISIONES_JUNTOS, PREMIO_COPA, APORTE_COPA, VERSO_COPA, type CopaEstado, type MisionJuntos } from "@shared/barrio-juntos";

const miles = (n: number) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/** De dónde salen los puntos de la copa (para que cada vecino sepa cómo ayudar). */
const COMO: { icono: string; texto: string; puntos: string }[] = [
  { icono: "🤝", texto: "La misión del barrio de hoy", puntos: `${COPA_PUNTOS.juntos}` },
  { icono: "📋", texto: "Cada encargo del día (y los tres)", puntos: `${COPA_PUNTOS.encargo} y ${COPA_PUNTOS.encargosTodos}` },
  { icono: "🔥", texto: "Cada deber en el templo", puntos: `${COPA_PUNTOS.deber}` },
  { icono: "🏛️", texto: "Cada grada en «¿Quién es sabio?»", puntos: `${COPA_PUNTOS.grada}` },
  { icono: "⚔️", texto: "Jugar un duelo de sabios (y ganarlo)", puntos: `${COPA_PUNTOS.duelo} y ${COPA_PUNTOS.dueloGanado}` },
  { icono: "💬", texto: "Un consejo acertado a un vecino", puntos: `${COPA_PUNTOS.consejo}` },
  { icono: "🏺", texto: "Cada cosa dada a una familia del pueblo", puntos: `${COPA_PUNTOS.pueblo}` },
];

export function CopaDelBarrio() {
  const { city } = useContext(CiudadCtx);
  const [e, setE] = useState<CopaEstado | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [avisado, setAvisado] = useState(false);

  useEffect(() => {
    let vivo = true;
    const cargar = async () => {
      const r = await fetch("/api/jerusalen/barrio/copa", { credentials: "include" }).catch(() => null);
      const data = r ? ((await r.json().catch(() => null)) as (CopaEstado & { message?: string }) | null) : null;
      if (!vivo) return;
      if (r?.ok && data) {
        setE(data);
        setError(null);
        if (data.premio) city?.audio.trumpet(true);
      } else setError(data?.message || "No se pudo abrir la copa de los barrios. Revisa tu conexión.");
    };
    void cargar();
    const t = setInterval(() => void cargar(), 20_000);
    return () => {
      vivo = false;
      clearInterval(t);
    };
  }, [city]);

  function irA(m: MisionJuntos) {
    if (!city) return;
    city.audio.click();
    city.irA(m.irA);
    gameStore.close();
  }

  async function avisar() {
    setAvisado(true);
    const r = await pedirBarrio<unknown>("/chat", { method: "POST", body: JSON.stringify({ frase: "juntos" }) });
    if (!r.ok) {
      setAvisado(false);
      gameStore.toast(r.data?.message || "No se pudo avisar al barrio.", "warn");
    } else gameStore.toast("📣 Avisaste a tu barrio: «¡Vengan a la misión del barrio de hoy!»", "info");
  }

  if (!e)
    return (
      <div className="py-6 text-center text-sm" data-testid="barrio-copa">
        {error ? <p className="text-red-700 dark:text-red-300">{error}</p> : <Loader2 className="mx-auto h-6 w-6 animate-spin text-amber-600" />}
      </div>
    );
  const m = e.mio;
  const progreso = m && m.siguiente ? Math.min(100, Math.round(((m.total - m.nivel.puntos) / Math.max(1, m.siguiente.puntos - m.nivel.puntos)) * 100)) : 100;
  return (
    <div className="space-y-3" data-testid="barrio-copa">
      {e.premio && (
        <div className="rounded-xl bg-gradient-to-r from-amber-300 to-amber-500 p-3 text-center text-sm font-black text-amber-950 shadow" data-testid="barrio-copa-premio">
          🏆 {e.premio.barrio} quedó en el puesto {e.premio.puesto} de la copa la semana pasada: +{e.premio.gozo} de gozo para ti
        </div>
      )}
      {e.hoy && (
        <div className={`space-y-2 rounded-xl p-3 ring-1 ${e.hoy.hecha ? "bg-emerald-50 ring-emerald-300 dark:bg-emerald-950/30 dark:ring-emerald-800" : "bg-sky-50 ring-sky-200 dark:bg-sky-950/30 dark:ring-sky-800"}`} data-testid="barrio-mision-hoy">
          <p className="text-[11px] font-bold uppercase tracking-wider text-sky-800 dark:text-sky-300">La misión del barrio de hoy</p>
          <p className="flex items-start gap-2 text-[15px] font-black leading-snug">
            <span className="text-2xl leading-none" aria-hidden="true">
              {e.hoy.mision.icono}
            </span>
            <span>{e.hoy.mision.titulo}</span>
          </p>
          <p className="text-xs text-stone-600 dark:text-stone-300">
            Hacen falta {e.hoy.mision.minimo} vecinos de tu barrio juntos en {e.hoy.mision.lugar}, durante {JUNTOS_SEGUNDOS} segundos. Una vez por día; si ya la cumpliste, igual puedes ir a ayudar a los demás.
          </p>
          <p className="text-xs font-bold" data-testid="barrio-mision-estado">
            {e.hoy.hecha ? "✓ Ya la cumpliste hoy." : e.hoy.enLinea > 0 ? `${e.hoy.enLinea} ${e.hoy.enLinea === 1 ? "vecino está" : "vecinos están"} ahora en la ciudad.` : "Ahora no hay otros vecinos en la ciudad: avísales."}
          </p>
          <div className="grid grid-cols-2 gap-2">
            <Button size="sm" onClick={() => irA(e.hoy!.mision)} data-testid="barrio-mision-ir">
              <MapPin className="mr-1 h-4 w-4" /> Ir allí
            </Button>
            <Button size="sm" variant="outline" disabled={avisado} onClick={() => void avisar()} data-testid="barrio-mision-avisar">
              <Megaphone className="mr-1 h-4 w-4" /> {avisado ? "Avisado" : "Avisar al barrio"}
            </Button>
          </div>
          <p className="font-serif text-[12px] italic text-stone-600 dark:text-stone-300">
            «{e.hoy.mision.verso.text}» <span className="not-italic text-[11px] font-semibold text-amber-800 dark:text-amber-300">{e.hoy.mision.verso.ref}</span>
          </p>
        </div>
      )}
      {m && (
        <div className="space-y-2 rounded-xl bg-amber-50 p-3 dark:bg-amber-950/30" data-testid="barrio-nivel">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">Nivel {m.nivel.nivel} de tu barrio</p>
              <p className="truncate text-[15px] font-black">{m.nivel.nombre}</p>
            </div>
            <div className="shrink-0 text-right text-xs">
              <p className="font-black">{m.copas > 0 ? `🏆 × ${m.copas}` : "Sin copas aún"}</p>
              <p className="text-stone-500 dark:text-stone-400">{miles(m.total)} puntos de siempre</p>
            </div>
          </div>
          <p className="text-xs text-stone-600 dark:text-stone-300">{m.nivel.adorno}</p>
          {m.siguiente && (
            <>
              <div className="h-2 overflow-hidden rounded-full bg-amber-200/70 dark:bg-amber-900/50" role="progressbar" aria-valuenow={progreso} aria-valuemin={0} aria-valuemax={100}>
                <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-600" style={{ width: `${progreso}%` }} />
              </div>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">
                Siguiente: {m.siguiente.nombre} ({miles(m.siguiente.puntos)} puntos) — {m.siguiente.adorno.toLowerCase()}
              </p>
            </>
          )}
          <p className="font-serif text-[12px] italic text-stone-600 dark:text-stone-300">
            «{m.nivel.verso.text}» <span className="not-italic text-[11px] font-semibold text-amber-800 dark:text-amber-300">{m.nivel.verso.ref}</span>
          </p>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-lg bg-white/70 px-1 py-1.5 dark:bg-stone-900/40">
              <p className="text-[10px] font-bold uppercase text-stone-500">Esta semana</p>
              <p className="text-sm font-black">{miles(m.puntos)}</p>
            </div>
            <div className="rounded-lg bg-white/70 px-1 py-1.5 dark:bg-stone-900/40">
              <p className="text-[10px] font-bold uppercase text-stone-500">Puesto</p>
              <p className="text-sm font-black">{m.puesto ?? "—"}</p>
            </div>
            <div className="rounded-lg bg-white/70 px-1 py-1.5 dark:bg-stone-900/40">
              <p className="text-[10px] font-bold uppercase text-stone-500">Tu aporte</p>
              <p className="text-sm font-black">{miles(m.miAporte)}</p>
            </div>
          </div>
        </div>
      )}
      <div className="space-y-1.5">
        <p className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-stone-500">
          <Trophy className="h-3.5 w-3.5" /> La copa de los barrios de esta semana
        </p>
        {e.tabla.length === 0 ? (
          <p className="rounded-lg bg-stone-50 p-3 text-center text-xs text-stone-500 dark:bg-stone-900/40">Esta semana ningún barrio suma todavía. ¡Que el tuyo sea el primero!</p>
        ) : (
          <ol className="divide-y divide-amber-100 rounded-xl bg-white/70 dark:divide-amber-900/40 dark:bg-stone-900/40" data-testid="barrio-copa-tabla">
            {e.tabla.map((f) => (
              <li key={f.n} className={`flex items-center gap-2 px-3 py-2 text-[13px] ${f.esMio ? "bg-amber-100/80 dark:bg-amber-900/40" : ""}`}>
                <span className="w-6 text-center font-black">{f.puesto <= 3 ? ["🥇", "🥈", "🥉"][f.puesto - 1] : f.puesto}</span>
                <span className="min-w-0 flex-1 truncate font-bold">
                  {f.nombre}
                  {f.esMio ? " (el tuyo)" : ""}
                </span>
                <span className="text-[11px] text-stone-500">nivel {f.nivel} · {f.vecinos} vec.</span>
                <span className="w-14 text-right font-black tabular-nums">{miles(f.puntos)}</span>
              </li>
            ))}
          </ol>
        )}
        <p className="text-center text-[11px] text-stone-500">
          El lunes, los tres primeros reciben {PREMIO_COPA.join(", ")} de gozo para cada vecino que aportó al menos {APORTE_COPA} puntos.
        </p>
      </div>
      <div className="rounded-xl bg-stone-50 p-3 text-xs dark:bg-stone-900/40" data-testid="barrio-copa-como">
        <p className="mb-1 font-bold">Cómo suma tu barrio</p>
        <ul className="space-y-0.5">
          {COMO.map((c) => (
            <li key={c.texto} className="flex items-center justify-between gap-2">
              <span>
                {c.icono} {c.texto}
              </span>
              <span className="shrink-0 font-black text-amber-800 dark:text-amber-300">+{c.puntos}</span>
            </li>
          ))}
        </ul>
      </div>
      <p className="text-center font-serif text-[12px] italic text-stone-600 dark:text-stone-300">
        «{VERSO_COPA.text}» <span className="not-italic text-[11px] font-semibold text-amber-800 dark:text-amber-300">{VERSO_COPA.ref}</span>
      </p>
    </div>
  );
}

/** El aviso de arriba de la pantalla mientras estás con tus vecinos en el lugar de la misión del barrio de hoy. */
export function JuntosChip() {
  const { p, hecha } = useJuntos();
  if (!p && !hecha) return null;
  if (hecha)
    return (
      <div className="rounded-full bg-emerald-600/95 px-3 py-1.5 text-xs font-black text-white shadow-lg" data-testid="ciudad-juntos" role="status">
        🙌 ¡Misión del barrio cumplida!
      </div>
    );
  const m = MISIONES_JUNTOS.find((x) => x.id === p!.mision);
  const faltan = Math.max(0, p!.minimo - p!.aqui);
  return (
    <div className="flex max-w-[92vw] items-center gap-2 rounded-full bg-sky-900/90 px-3 py-1.5 text-xs font-bold text-white shadow-lg ring-1 ring-sky-300/50" data-testid="ciudad-juntos" role="status">
      <span aria-hidden="true">{m?.icono ?? "🤝"}</span>
      <span className="min-w-0 truncate">
        {p!.hecha
          ? p!.aqui > 1
            ? `Ya la cumpliste: ayudas a tus vecinos (${p!.aqui} aquí)`
            : "Ya cumpliste la misión del barrio de hoy"
          : faltan > 0
            ? `Misión del barrio: ${p!.aqui} de ${p!.minimo} vecinos aquí · faltan ${faltan}`
            : `¡Juntos! ${p!.segundos} s más y la cumplen`}
      </span>
    </div>
  );
}
