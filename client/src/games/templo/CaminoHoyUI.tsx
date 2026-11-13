/**
 * El camino de hoy (shared/camino.ts), la pantalla: el «siguiente paso» arriba de la ciudad, con su botón para ir; los
 * cuatro pasos del día en «Para hoy», con el cofre al cumplirlos; y el libro de la restauración (las salas que
 * restauraste en cada edificio). El servidor decide qué falta (server/camino.ts).
 */
import { useCallback, useContext, useEffect, useState } from "react";
import { BookMarked, ChevronRight, Gift, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CiudadCtx } from "./CiudadUI";
import { gameStore } from "./store";
import { Card } from "./ui";
import type { CaminoHoy, IrA, PasoCamino } from "@shared/camino";
import { SALAS, salasDe, type RestauracionVista } from "@shared/restauracion";
import type { CiudadWorld } from "./ciudad/mundo";
import { Ico } from "./iconos";

async function traerCamino(): Promise<CaminoHoy | null> {
  try {
    const r = await fetch("/api/jerusalen/camino-hoy", { credentials: "include", cache: "no-store" });
    return r.ok ? ((await r.json()) as CaminoHoy) : null;
  } catch {
    return null;
  }
}

/** El camino de hoy, al día: al entrar, cada minuto y cuando algo lo cambia (evento «jer-camino»). */
export function useCaminoHoy() {
  const [c, setC] = useState<CaminoHoy | null>(null);
  const traer = useCallback(() => void traerCamino().then((x) => x && setC(x)), []);
  useEffect(() => {
    traer();
    const t = setInterval(() => {
      if (!document.hidden) traer();
    }, 60_000);
    const alCambiar = () => setTimeout(traer, 400);
    window.addEventListener("jer-camino", alCambiar);
    window.addEventListener("jer-racha", alCambiar);
    return () => {
      clearInterval(t);
      window.removeEventListener("jer-camino", alCambiar);
      window.removeEventListener("jer-racha", alCambiar);
    };
  }, [traer]);
  return { camino: c, setCamino: setC, traer };
}

/** Lleva al lugar de un paso (camina solo hasta allá). */
export function irAPaso(city: CiudadWorld | null | undefined, ir: IrA | null) {
  if (!city || !ir) return;
  gameStore.close();
  setTimeout(() => {
    if ("personaje" in ir) city.irAPersonaje(ir.personaje);
    else if ("edificio" in ir) city.irA(ir.edificio);
    else city.irA(ir.lugar);
  }, 60);
}

export async function abrirCofre(city: CiudadWorld | null | undefined): Promise<CaminoHoy | null> {
  try {
    const r = await fetch("/api/jerusalen/camino-hoy/cofre", { method: "POST", credentials: "include", headers: { "Content-Type": "application/json" }, body: "{}" });
    const d = (await r.json().catch(() => null)) as { camino: CaminoHoy; gozo: number; gozoTotal: number; racha: { titulo: string; gozo: number } | null; message?: string } | null;
    if (!r.ok || !d) {
      gameStore.toast(d?.message || "No se pudo abrir el cofre. Revisa tu conexión.", "warn");
      return null;
    }
    city?.audio.trumpet(true);
    gameStore.toast(`🎁 ¡Cumpliste el camino de hoy! +${d.gozo} de gozo`, "gold");
    if (d.racha) {
      gameStore.toast(`${d.racha.titulo} · +${d.racha.gozo} de gozo`, "gold");
      window.dispatchEvent(new Event("jer-racha"));
    }
    city?.ponerGozo(d.gozoTotal);
    return d.camino;
  } catch {
    gameStore.toast("No se pudo abrir el cofre. Revisa tu conexión.", "warn");
    return null;
  }
}

/** Arriba de la ciudad: el siguiente paso del camino de hoy (o el cofre, si ya están los cuatro). */
export function SiguientePaso() {
  const { city } = useContext(CiudadCtx);
  const { camino, setCamino } = useCaminoHoy();
  const [abriendo, setAbriendo] = useState(false);
  if (!camino) return null;
  if (camino.cofre.listo)
    return (
      <button
        type="button"
        disabled={abriendo}
        onClick={async () => {
          setAbriendo(true);
          const c = await abrirCofre(city);
          setAbriendo(false);
          if (c) setCamino(c);
        }}
        className="pointer-events-auto flex max-w-full items-center gap-1.5 self-start rounded-full bg-gradient-to-b from-amber-200 to-amber-400 py-1 pl-2 pr-3 text-[11px] font-black text-amber-950 shadow-lg ring-2 ring-white/70 active:scale-95"
        data-testid="siguiente-cofre"
      >
        {abriendo ? <Loader2 className="h-4 w-4 animate-spin" /> : <Gift className="h-4 w-4" />} ¡Abre el cofre del camino de hoy!
      </button>
    );
  const p = camino.siguiente;
  if (!p) return null;
  return (
    <div className="pointer-events-auto flex max-w-[min(100%,26rem)] items-center gap-1.5 self-start rounded-2xl bg-black/55 tpl-vidrio py-1 pl-2 pr-1 text-[11px] font-semibold text-white shadow-lg" data-testid="siguiente-paso">
      <span className="shrink-0 text-base leading-none"><Ico e={p.icono ?? ""} /></span>
      <button type="button" className="min-w-0 flex-1 text-left leading-tight" onClick={() => gameStore.push({ kind: "misiones" })} title="El camino de hoy">
        <span className="block text-[10px] font-black uppercase tracking-wider text-amber-300">
          Siguiente paso · {camino.hechos} de {camino.pasos.length}
        </span>
        <span className="line-clamp-2">{p.texto}</span>
      </button>
      {p.ir && city && (
        <button type="button" onClick={() => irAPaso(city, p.ir)} className="flex shrink-0 items-center gap-0.5 rounded-full bg-amber-400 px-2.5 py-1 text-[11px] font-black text-amber-950 active:scale-95" data-testid="siguiente-ir">
          Ir <ChevronRight className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

function Paso({ p, city }: { p: PasoCamino; city: CiudadWorld | null | undefined }) {
  const pct = p.progreso ? Math.min(100, Math.round((p.progreso.valor / Math.max(1, p.progreso.meta)) * 100)) : null;
  return (
    <li className={`flex items-start gap-2 rounded-xl border p-2 ${p.hecho ? "border-emerald-300 bg-emerald-50/70 dark:border-emerald-800 dark:bg-emerald-950/20" : "border-stone-200 bg-white/70 dark:border-stone-700 dark:bg-stone-900/40"}`} data-testid={`camino-${p.id}`}>
      <span className="mt-0.5 text-lg leading-none">{p.hecho ? "✅" : p.icono}</span>
      <div className="min-w-0 flex-1">
        <p className="text-[12px] font-black">{p.titulo}</p>
        <p className="text-[12px] leading-snug text-stone-600 dark:text-stone-300">{p.texto}</p>
        {pct !== null && !p.hecho && (
          <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-stone-200 dark:bg-stone-800">
            <div className="h-full rounded-full bg-amber-500" style={{ width: `${pct}%` }} />
          </div>
        )}
      </div>
      {!p.hecho && p.ir && city && (
        <Button size="sm" variant="secondary" className="h-7 shrink-0" onClick={() => irAPaso(city, p.ir)}>
          Ir
        </Button>
      )}
    </li>
  );
}

/** En «Para hoy»: los cuatro pasos del camino de hoy y el cofre. */
export function CaminoHoyBloque() {
  const { city } = useContext(CiudadCtx);
  const { camino, setCamino } = useCaminoHoy();
  const [abriendo, setAbriendo] = useState(false);
  if (!camino) return null;
  return (
    <section className="space-y-1.5 rounded-xl border border-amber-300 bg-gradient-to-b from-amber-50 to-white p-3 dark:border-amber-800 dark:from-amber-950/30 dark:to-stone-900" data-testid="camino-hoy">
      <p className="flex items-baseline justify-between gap-2 font-black">
        <span>El camino de hoy</span>
        <span className="text-xs font-bold text-amber-800 dark:text-amber-300">
          {camino.hechos} de {camino.pasos.length}
        </span>
      </p>
      <p className="text-[11px] text-stone-500">Servir, aprender, ayudar y restaurar: al cumplir los cuatro, el cofre del día (+{camino.cofre.gozo} de gozo y tu racha).</p>
      <ul className="space-y-1">
        {camino.pasos.map((p) => (
          <Paso key={p.id} p={p} city={city} />
        ))}
      </ul>
      {camino.cofre.recibido ? (
        <p className="text-center text-xs font-bold text-emerald-700 dark:text-emerald-300" data-testid="camino-cofre-recibido">
          <Ico e="🎁" /> Ya abriste el cofre de hoy. Mañana habrá otro camino.
        </p>
      ) : (
        <Button
          className="tpl-btn-oro w-full"
          disabled={!camino.cofre.listo || abriendo}
          onClick={async () => {
            setAbriendo(true);
            const c = await abrirCofre(city);
            setAbriendo(false);
            if (c) setCamino(c);
          }}
          data-testid="camino-cofre"
        >
          {abriendo ? <Loader2 className="h-4 w-4 animate-spin" /> : <Gift className="mr-1.5 h-4 w-4" />}
          {camino.cofre.listo ? "Abrir el cofre del camino de hoy" : `Cofre del día: te faltan ${camino.pasos.length - camino.hechos}`}
        </Button>
      )}
      <button type="button" onClick={() => (gameStore.close(), gameStore.push({ kind: "libro" }))} className="flex w-full items-center justify-center gap-1 text-xs font-bold text-amber-800 underline-offset-2 hover:underline dark:text-amber-300" data-testid="camino-libro">
        <BookMarked className="h-3.5 w-3.5" /> El libro de la restauración
      </button>
    </section>
  );
}

const NOMBRE_ED = { escuela: "La escuela de los profetas", palacio: "El palacio del rey", camara: "La cámara de los sacerdotes" } as const;

/** El libro de la restauración: las salas de cada edificio, restauradas o por restaurar. */
export function LibroView() {
  const [v, setV] = useState<RestauracionVista | null>(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    void fetch("/api/jerusalen/restauracion", { credentials: "include", cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d: { vista: RestauracionVista } | null) => (d ? setV(d.vista) : setError(true)))
      .catch(() => setError(true));
  }, []);
  return (
    <Card
      title={
        <span className="flex items-center gap-2">
          <BookMarked className="h-5 w-5" /> El libro de la restauración
        </span>
      }
      onClose={() => gameStore.close()}
      wide
      testid="libro-restauracion"
    >
      <div className="space-y-3 p-4 text-sm">
        {!v && !error && <Loader2 className="h-5 w-5 animate-spin text-amber-600" />}
        {error && <p className="rounded-xl bg-red-50 p-2.5 text-red-900 dark:bg-red-950/30 dark:text-red-200">No se pudo traer el libro. Revisa tu conexión.</p>}
        {v && (
          <>
            <p className="text-center font-serif text-lg font-black" data-testid="libro-cuenta">
              {v.hechas} de {v.total} salas restauradas
            </p>
            <p className="text-center text-xs text-stone-500">Cada edificio tiene tres salas en ruinas. Entra, párate en los círculos azules y restáuralas: vuelven la gente y lo de cada día.</p>
            {(["escuela", "palacio", "camara"] as const).map((ed) => (
              <section key={ed} className="space-y-1.5 rounded-xl border border-stone-200 p-3 dark:border-stone-700" data-testid={`libro-${ed}`}>
                <p className="font-black">{NOMBRE_ED[ed]}</p>
                <ul className="space-y-1">
                  {salasDe(ed).map((s) => {
                    const e = v.salas.find((x) => x.id === s.id);
                    const hechos = s.trabajos.reduce((a, t) => a + Math.min(t.veces, e?.progreso[t.id] ?? 0), 0);
                    const total = s.trabajos.reduce((a, t) => a + t.veces, 0);
                    return (
                      <li key={s.id} className={`flex items-center gap-2 rounded-lg px-2 py-1.5 ${e?.hecha ? "bg-emerald-50 dark:bg-emerald-950/25" : "bg-stone-50 dark:bg-stone-800/40"}`}>
                        <span className="text-lg">{e?.hecha ? s.icono : e?.abierta ? "🧱" : "🔒"}</span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[13px] font-bold">{s.nombre}</span>
                          <span className="block text-[11px] text-stone-500">
                            {e?.hecha ? `Restaurada · ${s.diario.nombre.toLowerCase()} cada día` : e?.abierta ? `${hechos} de ${total} trabajos` : "Primero, la sala anterior"}
                          </span>
                        </span>
                        {e?.hecha && <span className="text-xs font-black text-emerald-700 dark:text-emerald-300">✓</span>}
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
            <p className="text-center text-[11px] text-stone-500">En total, {SALAS.length} salas: la primera del edificio de tu camino es tu primer día en Jerusalén.</p>
          </>
        )}
      </div>
    </Card>
  );
}
