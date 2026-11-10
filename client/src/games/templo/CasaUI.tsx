/**
 * La pantalla de la casa por dentro (casa/mundo-casa.ts): el nombre de la casa y el cuarto donde se
 * está, salir a la calle, y para el dueño «Remodelar» (sacar muebles del arcón, moverlos, girarlos,
 * guardarlos y «Listo»). Los vecinos que visitan pueden dejar una bendición.
 */
import { useState } from "react";
import { Check, ChevronRight, DoorOpen, Hammer, Home, Loader2, MapPin, Package, RotateCw, Sparkles, X } from "lucide-react";
import { MUEBLES, VERSO_CAMARAS, type InteriorEstado } from "@shared/casa-interior";
import { gameStore, useGame } from "./store";
import { avisarMisiones } from "./online";
import type { CasaWorld } from "./casa/mundo-casa";

const sombra = "[text-shadow:0_1px_2px_rgba(0,0,0,.85)]";
const lados = { paddingLeft: "calc(0.5rem + var(--tpl-sl, 0px))", paddingRight: "calc(0.5rem + var(--tpl-sr, 0px))" };

async function pedir<T>(path: string, body?: unknown): Promise<{ ok: boolean; data: (T & { message?: string }) | null }> {
  try {
    const res = await fetch(`/api/jerusalen${path}`, {
      method: body === undefined ? "GET" : "POST",
      credentials: "include",
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body ?? {}),
    });
    return { ok: res.ok, data: (await res.json().catch(() => null)) as never };
  } catch {
    return { ok: false, data: null };
  }
}

export function CasaHudLayer({ mundo, onSalir }: { mundo: CasaWorld; onSalir: () => void }) {
  const { casa: c, toasts, modal } = useGame();
  const [guardando, setGuardando] = useState(false);
  const [bendiciendo, setBendiciendo] = useState(false);
  const [dejarCambios, setDejarCambios] = useState(false);
  if (!c) return null;

  const guardar = async () => {
    setGuardando(true);
    const r = await pedir<InteriorEstado>("/casa/interior", { interior: mundo.interior });
    setGuardando(false);
    if (r.ok && r.data) {
      mundo.confirmar(r.data);
      mundo.remodelar(false);
      gameStore.toast("Tu casa quedó como la dejaste: tus vecinos la verán así cuando entren.", "gold");
    } else gameStore.toast(r.data?.message || "No se pudo guardar. Intenta de nuevo.", "warn");
  };
  const cancelar = () => {
    mundo.revertir();
    mundo.remodelar(false);
  };
  const salir = () => {
    if (c.remodelando && c.cambios) {
      setDejarCambios(true);
      return;
    }
    if (c.remodelando) mundo.remodelar(false);
    onSalir();
  };
  const bendecir = async () => {
    setBendiciendo(true);
    const r = await pedir<{ bendiciones: number; misiones?: { titulo: string; premio: number; gozo?: number }[] }>(`/ciudad/casa/${mundo.estado.personajeId}/bendecir`, {});
    setBendiciendo(false);
    if (r.ok && r.data) {
      mundo.bendecida(r.data.bendiciones);
      gameStore.toast(`Dejaste tu bendición en la casa de ${c.dueno}`, "gold");
      avisarMisiones(r.data.misiones);
    } else gameStore.toast(r.data?.message || "No se pudo dejar la bendición.", "warn");
  };

  const enArcon = MUEBLES.filter((m) => (c.disponibles[m.id] || 0) > 0);
  const titulo = c.esMia ? c.letrero || "Tu casa" : `La casa de ${c.dueno}`;

  return (
    <div className="pointer-events-none absolute inset-0 z-10 text-white" data-testid="casa-hud">
      {/* arriba: la casa y salir */}
      <div
        className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 bg-gradient-to-b from-black/55 via-black/25 to-transparent pb-4"
        style={{ ...lados, paddingTop: "calc(0.5rem + var(--tpl-st, 0px))" }}
      >
        <div className="flex min-w-0 flex-col items-start gap-1">
          <span className="flex min-w-0 max-w-full items-center gap-1 rounded-full bg-gradient-to-b from-amber-300 to-amber-500 py-1 pl-1.5 pr-3 text-xs font-black text-amber-950 shadow-lg" data-testid="casa-titulo">
            <Home className="h-4 w-4 shrink-0" />
            <span className="min-w-0 truncate">{titulo}</span>
          </span>
          <span className={`rounded-full bg-black/45 px-2.5 py-0.5 text-[11px] font-semibold ${sombra}`}>
            {c.nombreNivel}
            {c.bendiciones > 0 ? ` · 🙏 ${c.bendiciones} ${c.bendiciones === 1 ? "bendición" : "bendiciones"}` : ""}
          </span>
        </div>
        <button
          type="button"
          onClick={salir}
          className="pointer-events-auto flex shrink-0 items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-black text-amber-950 shadow-lg active:scale-95"
          data-testid="casa-salir"
        >
          <DoorOpen className="h-4 w-4" /> Salir a la calle
        </button>
      </div>

      {dejarCambios && (
        <div className="pointer-events-auto absolute inset-x-0 top-16 mx-auto w-[min(92%,22rem)] space-y-2 rounded-2xl bg-white p-3 text-sm text-stone-800 shadow-2xl" data-testid="casa-cambios">
          <p className="font-bold">Moviste muebles y no los guardaste.</p>
          <div className="flex gap-2">
            <button type="button" className="flex-1 rounded-full bg-amber-400 px-3 py-1.5 font-bold text-amber-950" onClick={() => void guardar().then(() => setDejarCambios(false))}>
              Guardar
            </button>
            <button
              type="button"
              className="flex-1 rounded-full bg-stone-100 px-3 py-1.5 font-bold"
              onClick={() => {
                setDejarCambios(false);
                cancelar();
                onSalir();
              }}
            >
              Salir sin guardar
            </button>
          </div>
        </div>
      )}

      {/* abajo: avisos, el lugar y lo que se puede hacer */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-1.5" style={{ ...lados, paddingBottom: "calc(0.75rem + var(--tpl-sb, 0px))" }}>
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`max-w-[92%] rounded-xl px-3 py-1.5 text-center text-[13px] font-semibold shadow-lg sm:max-w-lg ${t.tone === "gold" ? "bg-gradient-to-r from-amber-300 to-amber-400 text-amber-950" : t.tone === "warn" ? "bg-red-50 text-red-900" : "bg-white/95 text-stone-800"}`}
          >
            {t.text}
          </div>
        ))}
        {!modal && (
          <>
            {!c.remodelando && (
              <div className={`rounded-full bg-sky-500/30 px-3 py-0.5 text-center text-[11px] font-bold leading-tight text-sky-50 backdrop-blur-[2px] ${sombra}`} data-testid="casa-lugar">
                <MapPin className="-mt-0.5 mr-0.5 inline h-3 w-3" />
                {c.lugar}
              </div>
            )}
            <div className={`max-w-[94%] rounded-full bg-black/35 px-3 py-1 text-center text-[12px] font-semibold leading-tight backdrop-blur-[2px] sm:max-w-md ${sombra}`} data-testid="casa-aviso">
              <ChevronRight className="-mt-0.5 mr-0.5 inline h-3.5 w-3.5 text-amber-300" />
              {c.aviso}
            </div>
          </>
        )}

        {!modal && c.esMia && !c.remodelando && (
          <div className="pointer-events-auto flex flex-wrap justify-center gap-2">
            <button type="button" onClick={() => mundo.remodelar(true)} className="flex items-center gap-1.5 rounded-full bg-gradient-to-b from-amber-300 to-amber-500 px-4 py-2 text-sm font-black text-amber-950 shadow-lg active:scale-95" data-testid="casa-remodelar">
              <Hammer className="h-4 w-4" /> Remodelar
            </button>
            <button type="button" onClick={() => gameStore.push({ kind: "casa" })} className="flex items-center gap-1.5 rounded-full bg-black/55 px-4 py-2 text-sm font-bold shadow-lg active:scale-95" data-testid="casa-ventana">
              <Home className="h-4 w-4 text-amber-300" /> Huerto, horno y más
            </button>
          </div>
        )}

        {!modal && !c.esMia && (
          <button
            type="button"
            onClick={() => void bendecir()}
            disabled={bendiciendo || c.yaBendije}
            className="pointer-events-auto flex items-center gap-1.5 rounded-full bg-gradient-to-b from-amber-300 to-amber-500 px-4 py-2 text-sm font-black text-amber-950 shadow-lg active:scale-95 disabled:opacity-60"
            data-testid="casa-bendecir"
          >
            {bendiciendo ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {c.yaBendije ? "Ya dejaste tu bendición hoy" : "Dejar una bendición"}
          </button>
        )}

        {!modal && c.esMia && c.remodelando && (
          <div className="pointer-events-auto w-full max-w-xl space-y-2 rounded-2xl bg-[#1f1a12]/92 p-2.5 text-sm shadow-2xl backdrop-blur sm:p-3" data-testid="casa-remodelando">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-black">
                <Hammer className="-mt-0.5 mr-1 inline h-4 w-4 text-amber-300" /> Remodelar · {c.colocados} de {c.max} muebles
              </p>
              {c.pisos.length > 1 && (
                <div className="flex gap-1" role="group" aria-label="Piso">
                  {c.pisos.map((p) => (
                    <button
                      key={p}
                      type="button"
                      aria-pressed={c.piso === p}
                      onClick={() => mundo.verPiso(p)}
                      className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${c.piso === p ? "bg-amber-400 text-amber-950" : "bg-white/10"}`}
                      data-testid={`casa-piso-${p}`}
                    >
                      {p === 0 ? "Planta baja" : c.nivel >= 3 ? "Terrado y aposento" : "Terrado"}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {c.seleccion && (
              <div className="flex flex-wrap items-center gap-1.5 rounded-xl bg-emerald-500/15 p-2" data-testid="casa-seleccion">
                <span className="min-w-0 flex-1 truncate font-bold">
                  {c.seleccion.icono} {c.seleccion.nombre}
                </span>
                <button type="button" onClick={() => mundo.girar()} className="flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-xs font-bold" data-testid="casa-girar">
                  <RotateCw className="h-3.5 w-3.5" /> Girar
                </button>
                <button type="button" onClick={() => mundo.guardarSeleccion()} className="flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-xs font-bold" data-testid="casa-guardar-arcon">
                  <Package className="h-3.5 w-3.5" /> Guardar en el arcón
                </button>
                <button type="button" onClick={() => mundo.deseleccionar()} className="rounded-full bg-white/10 p-1" aria-label="Soltar">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
            <div>
              <p className="mb-1 hidden text-[11px] font-semibold text-white/70 sm:block">Tu arcón (toca uno para ponerlo en la casa):</p>
              {enArcon.length ? (
                <div className="flex gap-1.5 overflow-x-auto pb-1" data-testid="casa-arcon">
                  {enArcon.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => mundo.elegirNuevo(m.id)}
                      disabled={c.colocados >= c.max}
                      className="flex shrink-0 items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-xs font-bold hover:bg-white/20 disabled:opacity-40"
                      data-testid={`casa-arcon-${m.id}`}
                    >
                      <span className="text-base">{m.icono}</span> {m.nombre}
                      <span className="rounded-full bg-amber-400 px-1.5 text-[10px] font-black text-amber-950">×{c.disponibles[m.id]}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-[11px] text-white/60">Tu arcón está vacío: compra muebles al alfarero del mercado (pestaña «Muebles»).</p>
              )}
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={cancelar} className="flex-1 rounded-full bg-white/10 px-3 py-2 text-sm font-bold" data-testid="casa-cancelar">
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => void guardar()}
                disabled={guardando}
                className="flex flex-[2] items-center justify-center gap-1.5 rounded-full bg-gradient-to-b from-amber-300 to-amber-500 px-3 py-2 text-sm font-black text-amber-950 disabled:opacity-60"
                data-testid="casa-listo"
              >
                {guardando ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />} Listo
              </button>
            </div>
            <p className="hidden text-center text-[10px] italic text-white/50 sm:block">
              «{VERSO_CAMARAS.text}» ({VERSO_CAMARAS.ref})
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
