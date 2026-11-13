/**
 * La pantalla del huerto de la casa (casa/huerto3d.ts, shared/huerto.ts): arriba, volver a la casa y lo que tienes (el
 * agua del cántaro, el abono del redil, las gavillas y el gozo); las 3 tareas del huerto de hoy; abajo, lo que hay cerca
 * con un botón por tarea y, mientras se hace una, qué hacer con el dedo y cuánto va. Las herramientas se mejoran con
 * gozo (1 Samuel 13:20) y la ayuda explica cómo se trabaja, con su verso.
 */
import { useState } from "react";
import { DoorOpen, HelpCircle, Loader2, Sparkles, Wrench, X } from "lucide-react";
import { GOZO_HUERTO, HERRAMIENTAS, HERRAMIENTAS_IDS, NOMBRE_FUENTE, VERSOS_HUERTO, type HerramientaId } from "@shared/huerto";
import type { MercadoEstado } from "@shared/mercado";
import { gameStore, useGame } from "./store";
import type { HuertoWorld } from "./casa/huerto3d";
import { Ico } from "./iconos";

const sombra = "[text-shadow:0_1px_2px_rgba(0,0,0,.85)]";
const lados = { paddingLeft: "calc(0.5rem + var(--tpl-sl, 0px))", paddingRight: "calc(0.5rem + var(--tpl-sr, 0px))" };

const tiempo = (s: number) => {
  const m = Math.floor(s / 60);
  return m >= 60 ? `${Math.floor(m / 60)} h ${m % 60} min` : m >= 1 ? `${m} min` : `${Math.max(1, Math.ceil(s))} s`;
};

const PASOS = [
  { icono: "⛏️", titulo: "Ara el surco", texto: "Con la azada, deslizando el dedo de punta a punta. Después de cada siega hay que volver a ararlo.", verso: VERSOS_HUERTO.arar },
  { icono: "🌱", titulo: "Siembra", texto: "Trigo, cebada u olivos (las semillas se compran al sembrador del mercado). El cultivo de la estación crece más rápido.", verso: VERSOS_HUERTO.sembrar },
  { icono: "🐦", titulo: "Espanta las aves", texto: "Vienen por la semilla recién sembrada y por el grano maduro: tócalas. Si nadie las espanta, se comen parte.", verso: VERSOS_HUERTO.aves },
  { icono: "💧", titulo: "Riega", texto: "Llena tu cántaro en el pozo (manteniendo apretado) y riega: crece más rápido y da una gavilla más. El agua se cuenta. Con lluvia o con cisterna, se riega solo.", verso: VERSOS_HUERTO.regar },
  { icono: "🌿", titulo: "Arranca las malas hierbas", texto: "Salen con las horas: tócalas para arrancarlas. Si al segar el surco está limpio, gana una estrella.", verso: VERSOS_HUERTO.hierbas },
  { icono: "🐑", titulo: "Abona", texto: "Con lo que dan las ovejas de tu redil (Tu casa → Oficios): una estrella más.", verso: VERSOS_HUERTO.abono },
  { icono: "🌾", titulo: "Siega y lleva al granero", texto: "Con la hoz. La cosecha se ata en gavillas: llévalas al granero y recién ahí van a tu alfolí. Cada estrella da una más.", verso: VERSOS_HUERTO.gavillas },
  { icono: "🤲", titulo: "El rincón del pobre", texto: "Al segar puedes dejar el rincón del surco para el pobre y el extranjero: una gavilla menos y gozo.", verso: VERSOS_HUERTO.rincon },
];

export function HuertoHudLayer({ mundo, onSalir, alGozo }: { mundo: HuertoWorld; onSalir: () => void; alGozo?: (g: number) => void }) {
  const { huerto: h, toasts, modal } = useGame();
  const [ver, setVer] = useState<"herramientas" | "ayuda" | null>(null);
  const [comprando, setComprando] = useState<HerramientaId | null>(null);
  const [tareasAbiertas, setTareasAbiertas] = useState(true);
  if (!h) return null;
  const m: MercadoEstado = mundo.estado;
  const lab = m.labranza;
  const gavillas = lab ? lab.gavillas.harina + lab.gavillas.aceite : 0;

  const mejorar = async (id: HerramientaId) => {
    setComprando(id);
    try {
      const res = await fetch("/api/jerusalen/casa/huerto/mejorar", { method: "POST", credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ herramienta: id }) });
      const d = (await res.json().catch(() => null)) as (MercadoEstado & { message?: string }) | null;
      if (res.ok && d) {
        mundo.ponerEstado(d);
        alGozo?.(d.gozo);
        gameStore.toast(`🔨 ${HERRAMIENTAS[id].mejor.nombre}: ${HERRAMIENTAS[id].mejor.ventaja}`, "gold");
      } else gameStore.toast(d?.message || "No se pudo. Intenta de nuevo.", "warn");
    } catch {
      gameStore.toast("No se pudo. Revisa tu conexión.", "warn");
    } finally {
      setComprando(null);
    }
  };

  return (
    <div className="pointer-events-none absolute inset-0 z-10 text-white" data-testid="huerto-hud">
      {/* arriba: el huerto, lo que tienes y volver a la casa */}
      <div className="absolute inset-x-0 top-0 flex flex-col gap-1.5 bg-gradient-to-b from-black/60 via-black/25 to-transparent pb-5" style={{ ...lados, paddingTop: "calc(0.5rem + var(--tpl-st, 0px))" }}>
        <div className="flex items-start justify-between gap-2">
          <span className="flex min-w-0 items-center gap-1 rounded-full bg-gradient-to-b from-lime-300 to-emerald-500 py-1 pl-2 pr-3 text-xs font-black text-emerald-950 shadow-lg" data-testid="huerto-titulo">
            <Ico e="🌾" /> <span className="truncate">El huerto de tu casa</span>
          </span>
          <div className="pointer-events-auto flex shrink-0 gap-1.5">
            <button type="button" onClick={() => setVer(ver === "ayuda" ? null : "ayuda")} className="rounded-full bg-black/45 p-1.5 shadow-lg active:scale-95" aria-label="Cómo se trabaja el huerto" data-testid="huerto-ayuda">
              <HelpCircle className="h-4 w-4" />
            </button>
            <button type="button" onClick={() => setVer(ver === "herramientas" ? null : "herramientas")} className="rounded-full bg-black/45 p-1.5 shadow-lg active:scale-95" aria-label="Mejorar las herramientas" data-testid="huerto-herramientas">
              <Wrench className="h-4 w-4" />
            </button>
            <button type="button" onClick={onSalir} className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-black text-amber-950 shadow-lg active:scale-95" data-testid="huerto-salir">
              <DoorOpen className="h-4 w-4" /> Volver a la casa
            </button>
          </div>
        </div>
        {lab && (
          <div className="flex flex-wrap gap-1 text-[11px] font-bold" data-testid="huerto-recursos">
            <span className={`rounded-full px-2 py-0.5 ${lab.agua ? "bg-sky-900/60" : "bg-red-900/70"} ${sombra}`} title={NOMBRE_FUENTE[lab.fuente]}>
              <Ico e="🏺" /> {lab.agua}/{lab.carga} {lab.agua === 1 ? "riego" : "riegos"}
            </span>
            <span className={`rounded-full bg-amber-900/60 px-2 py-0.5 ${sombra}`} title={lab.abono.ovejas ? `${lab.abono.ovejas} ovejas en tu redil` : "Sin ovejas en tu redil"}>
              🐑 {lab.abono.hay} de abono{lab.abono.proxima && lab.abono.hay < lab.abono.tope ? ` · otro en ${tiempo(lab.abono.proxima)}` : ""}
            </span>
            {gavillas > 0 && <span className={`rounded-full bg-yellow-700/70 px-2 py-0.5 ${sombra}`}>🌾 {gavillas} {h.llevando ? "a cuestas" : "segadas"}</span>}
            <span className={`rounded-full bg-black/45 px-2 py-0.5 ${sombra}`}>
              <Sparkles className="-mt-0.5 mr-0.5 inline h-3 w-3 text-amber-300" />
              {m.gozo}
            </span>
            {lab.llueve && <span className={`rounded-full bg-slate-600/70 px-2 py-0.5 ${sombra}`}>🌧️ Hoy llueve: lo sembrado hoy queda regado</span>}
          </div>
        )}
        {/* las 3 tareas del huerto de hoy */}
        {lab && lab.misiones.length > 0 && (
          <div className="pointer-events-auto max-w-md" data-testid="huerto-tareas">
            <button type="button" onClick={() => setTareasAbiertas(!tareasAbiertas)} className={`text-[11px] font-black uppercase tracking-wider text-lime-200 ${sombra}`}>
              Tareas del huerto de hoy {lab.misiones.filter((x) => x.cumplida).length}/{lab.misiones.length} {tareasAbiertas ? "▾" : "▸"}
            </button>
            {tareasAbiertas && (
              <ul className="mt-0.5 space-y-0.5">
                {lab.misiones.map((t) => (
                  <li key={t.id} className={`flex items-center gap-1.5 rounded-lg px-2 py-0.5 text-[11px] font-semibold ${t.cumplida ? "bg-emerald-700/60" : "bg-black/40"} ${sombra}`} data-testid={`huerto-tarea-${t.id}`}>
                    <span>{t.cumplida ? "✅" : t.icono}</span>
                    <span className="min-w-0 flex-1 truncate">{t.titulo}</span>
                    <span className="shrink-0 tabular-nums">
                      {t.hecho}/{t.meta} · +{GOZO_HUERTO.mision}
                    </span>
                  </li>
                ))}
                {!lab.todas && <li className={`px-2 text-[10px] text-white/70 ${sombra}`}>Las tres: +{GOZO_HUERTO.todas} de gozo de más.</li>}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* la ayuda y las herramientas */}
      {ver && (
        <div className="pointer-events-auto absolute inset-x-0 top-24 mx-auto max-h-[60%] w-[min(94%,26rem)] overflow-y-auto rounded-2xl bg-[#1f1a12]/95 p-3 text-sm shadow-2xl backdrop-blur" data-testid={`huerto-panel-${ver}`}>
          <div className="mb-2 flex items-center justify-between">
            <p className="font-black">{ver === "ayuda" ? "Cómo se trabaja el huerto" : "Tus herramientas"}</p>
            <button type="button" onClick={() => setVer(null)} className="rounded-full bg-white/10 p-1" aria-label="Cerrar">
              <X className="h-4 w-4" />
            </button>
          </div>
          {ver === "ayuda" ? (
            <ol className="space-y-2">
              {PASOS.map((p) => (
                <li key={p.titulo} className="rounded-xl bg-white/5 p-2">
                  <p className="font-bold">
                    <Ico e={p.icono ?? ""} /> {p.titulo}
                  </p>
                  <p className="text-[12px] text-white/80">{p.texto}</p>
                  <p className="mt-0.5 text-[11px] italic text-amber-100/70">
                    «{p.verso.text}» ({p.verso.ref})
                  </p>
                </li>
              ))}
              <li className="text-[11px] text-white/70">
                ⭐ Cada surco gana hasta 3 estrellas (riego, sin hierbas y abono): cada una da una gavilla más. Cada día hay 3 tareas del huerto con gozo.
              </li>
            </ol>
          ) : (
            <div className="space-y-2">
              {HERRAMIENTAS_IDS.map((id) => {
                const t = HERRAMIENTAS[id];
                const tiene = lab?.herramientas[id] === 2;
                return (
                  <div key={id} className="flex items-center gap-2 rounded-xl bg-white/5 p-2" data-testid={`huerto-herramienta-${id}`}>
                    <span className="text-2xl"><Ico e={t.icono ?? ""} /></span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-bold">{tiene ? t.mejor.nombre : t.nombre}</span>
                      <span className="block text-[11px] text-white/70">{tiene ? `✓ ${t.mejor.ventaja}` : `${t.mejor.nombre}: ${t.mejor.ventaja}`}</span>
                    </span>
                    {!tiene && (
                      <button
                        type="button"
                        disabled={!!comprando || m.gozo < t.mejor.precio}
                        onClick={() => void mejorar(id)}
                        className="shrink-0 rounded-full bg-gradient-to-b from-amber-300 to-amber-500 px-3 py-1.5 text-xs font-black text-amber-950 disabled:opacity-50"
                        data-testid={`huerto-mejorar-${id}`}
                      >
                        {comprando === id ? <Loader2 className="h-4 w-4 animate-spin" /> : `✨ ${t.mejor.precio}`}
                      </button>
                    )}
                  </div>
                );
              })}
              <p className="text-[11px] italic text-amber-100/70">
                «{VERSOS_HUERTO.herramientas.text}» ({VERSOS_HUERTO.herramientas.ref})
              </p>
            </div>
          )}
        </div>
      )}

      {/* abajo: los avisos, lo que hay cerca y el gesto */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-1.5" style={{ ...lados, paddingBottom: "calc(0.75rem + var(--tpl-sb, 0px))" }}>
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`max-w-[92%] rounded-xl px-3 py-1.5 text-center text-[13px] font-semibold shadow-lg sm:max-w-lg ${t.tone === "gold" ? "bg-gradient-to-r from-amber-300 to-amber-400 text-amber-950" : t.tone === "warn" ? "bg-red-50 text-red-900" : "bg-white/95 text-stone-800"}`}
          >
            {t.text}
          </div>
        ))}
        {!modal && h.aviso && (
          <div className={`max-w-[94%] rounded-full bg-black/40 px-3 py-1 text-center text-[12px] font-semibold leading-tight backdrop-blur-[2px] sm:max-w-md ${sombra}`} data-testid="huerto-aviso">
            {h.esperando && <Loader2 className="-mt-0.5 mr-1 inline h-3.5 w-3.5 animate-spin" />}
            {h.aviso}
          </div>
        )}
        {!modal && h.gesto && (
          <div className="pointer-events-auto w-full max-w-md space-y-1.5 rounded-2xl bg-[#13210f]/85 p-2.5 shadow-2xl backdrop-blur" data-testid="huerto-gesto">
            <p className="text-center text-[13px] font-bold">{h.gesto.texto}</p>
            <div className="h-2.5 overflow-hidden rounded-full bg-white/15">
              <div className="h-full rounded-full bg-gradient-to-r from-lime-300 to-emerald-400 transition-[width] duration-150" style={{ width: `${Math.round(h.gesto.progreso * 100)}%` }} />
            </div>
            <button type="button" onClick={() => mundo.cancelar()} disabled={h.esperando} className="mx-auto block rounded-full bg-white/10 px-3 py-1 text-xs font-bold disabled:opacity-50" data-testid="huerto-cancelar">
              Dejarlo
            </button>
          </div>
        )}
        {!modal && !h.gesto && h.cerca && (
          <div className="pointer-events-auto w-full max-w-md space-y-1.5 rounded-2xl bg-[#1f1a12]/88 p-2.5 shadow-2xl backdrop-blur" data-testid={`huerto-cerca-${h.cerca.tipo}`}>
            <p className="font-black">{h.cerca.titulo}</p>
            <p className="text-[12px] text-white/80" data-testid="huerto-cerca-estado">
              {h.cerca.estado}
            </p>
            {h.cerca.acciones.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {h.cerca.acciones.map((a, i) => (
                  <button
                    key={`${a.id}-${i}`}
                    type="button"
                    disabled={!!a.no || h.esperando}
                    title={a.no}
                    onClick={() => mundo.empezar(a.id, a.extra ?? {})}
                    className="flex items-center gap-1 rounded-full bg-gradient-to-b from-lime-300 to-emerald-500 px-3 py-1.5 text-xs font-black text-emerald-950 shadow-lg active:scale-95 disabled:from-stone-500 disabled:to-stone-600 disabled:text-white/70"
                    data-testid={`huerto-accion-${a.id}${a.extra?.semilla ? `-${String(a.extra.semilla)}` : a.extra?.rincon ? "-rincon" : ""}`}
                  >
                    <span className="text-sm leading-none"><Ico e={a.icono ?? ""} /></span> {a.nombre}
                  </button>
                ))}
              </div>
            )}
            {h.cerca.acciones.filter((a) => a.no).length > 0 && (
              <p className="text-[11px] text-amber-200/90">{[...new Set(h.cerca.acciones.filter((a) => a.no).map((a) => a.no))].join(" ")}</p>
            )}
          </div>
        )}
        {!modal && !h.gesto && !h.cerca && (
          <div className="pointer-events-auto flex flex-wrap justify-center gap-1.5" data-testid="huerto-ir">
            {h.llevando ? (
              <button type="button" onClick={() => mundo.irA("granero")} className="rounded-full bg-gradient-to-b from-amber-300 to-amber-500 px-3 py-1.5 text-xs font-black text-amber-950 shadow-lg active:scale-95" data-testid="huerto-ir-granero">
                <Ico e="🌾" /> Ir al granero
              </button>
            ) : (
              <>
                {gavillas > 0 && (
                  <button type="button" onClick={() => mundo.irA("gavillas")} className="rounded-full bg-gradient-to-b from-amber-300 to-amber-500 px-3 py-1.5 text-xs font-black text-amber-950 shadow-lg active:scale-95" data-testid="huerto-ir-gavillas">
                    <Ico e="🧺" /> Ir a las gavillas
                  </button>
                )}
                <button type="button" onClick={() => mundo.irA("pozo")} className="rounded-full bg-black/55 px-3 py-1.5 text-xs font-bold shadow-lg active:scale-95" data-testid="huerto-ir-pozo">
                  <Ico e="🏺" /> Ir al pozo
                </button>
                {m.huerto.map((_, i) => (
                  <button key={i} type="button" onClick={() => mundo.irA(i)} className="rounded-full bg-black/55 px-3 py-1.5 text-xs font-bold shadow-lg active:scale-95" data-testid={`huerto-ir-surco-${i}`}>
                    Surco {i + 1}
                  </button>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
