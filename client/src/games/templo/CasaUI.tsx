/**
 * La pantalla de la casa por dentro (casa/mundo-casa.ts): el nombre de la casa y el cuarto donde se
 * está, salir a la calle, y para el dueño «Remodelar» (sacar muebles del arcón, moverlos, girarlos,
 * guardarlos y «Listo»). Los vecinos que visitan pueden dejar una bendición.
 *
 * Dentro de la escuela de los profetas o del palacio: el nombre del edificio, hablar con su maestro y
 * un botón por estación para ir caminando (la que toca en los primeros pasos, resaltada).
 */
import { useState } from "react";
import { Check, ChevronRight, DoorOpen, Hammer, Home, Loader2, MapPin, MessageCircle, Package, RotateCw, Sparkles, X } from "lucide-react";
import { MUEBLES, USOS_CASA, VERSO_CAMARAS, type InteriorEstado, type UsoMueble, type UsoRespuesta } from "@shared/casa-interior";
import { gameStore, useGame } from "./store";
import { avisarMisiones } from "./online";
import type { CasaWorld } from "./casa/mundo-casa";
import { Ico } from "./iconos";

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

/** Lo que dice cada botón de los muebles que se usan (la casa viva). */
const BOTON_USO: Record<UsoMueble, { icono: string; texto: string; hecho: string }> = {
  sentarse: { icono: "🪑", texto: "Sentarse", hecho: "Sentarse" },
  descansar: { icono: "🛏️", texto: "Descansar", hecho: "Ya descansaste hoy" },
  cocinar: { icono: "🍲", texto: "Cocinar un guiso", hecho: "Ya cocinaste hoy" },
  leer: { icono: "📜", texto: "Leer el rollo", hecho: "Ya leíste el rollo hoy" },
};

export function CasaHudLayer({
  mundo,
  onSalir,
  onMaestro,
  onHuerto,
  onGozo,
}: {
  mundo: CasaWorld;
  onSalir: () => void;
  onMaestro?: () => void;
  onHuerto?: () => void;
  /** El gozo nuevo (después de usar un mueble): se ve en la ciudad. */
  onGozo?: (g: number) => void;
}) {
  const { casa: c, toasts, modal } = useGame();
  const [guardando, setGuardando] = useState(false);
  const [usando, setUsando] = useState(false);
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

  /** Usar el mueble de ahí cerca: sentarse lo hace la casa; descansar, cocinar y leer, también el servidor (una vez por día). */
  const usar = async (uso: UsoMueble) => {
    if (!mundo.usar(uso) || uso === "sentarse") return;
    setUsando(true);
    const r = await pedir<UsoRespuesta>("/casa/usar", { uso });
    setUsando(false);
    if (!r.ok || !r.data) {
      gameStore.toast(r.data?.message || "No se pudo. Intenta de nuevo.", "warn");
      mundo.levantarse();
      return;
    }
    const d = r.data;
    mundo.ponerUsos({ descansar: false, cocinar: false, leer: false, ...(mundo.estado.usos ?? {}), [uso]: true });
    onGozo?.(d.gozoTotal);
    gameStore.toast(`${USOS_CASA[uso].icono} +${d.gozo} de gozo`, "gold");
    const primero =
      uso === "descansar"
        ? "Descansaste en tu casa. Mañana puedes volver a descansar."
        : uso === "cocinar"
          ? "Cocinaste un guiso en tu fogón. Si hoy abres tu banquete, cada invitado gana 1 de gozo más."
          : "El rollo de hoy (mañana trae otro versículo):";
    gameStore.push({
      kind: "dialog",
      id: `uso-${uso}`,
      lines: [
        { quien: "narrador", texto: primero },
        { quien: "narrador", texto: d.verso.text, ref: d.verso.ref },
      ],
    });
  };

  const enArcon = MUEBLES.filter((m) => (c.disponibles[m.id] || 0) > 0);
  const ed = c.edificio;
  const titulo = ed ? ed.nombre : c.esMia ? c.letrero || "Tu casa" : `La casa de ${c.dueno}`;

  return (
    <div className="pointer-events-none absolute inset-0 z-10 text-white" data-testid="casa-hud">
      {/* arriba: la casa y salir */}
      <div
        className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 bg-gradient-to-b from-black/55 via-black/25 to-transparent pb-4"
        style={{ ...lados, paddingTop: "calc(0.5rem + var(--tpl-st, 0px))" }}
      >
        <div className="flex min-w-0 flex-col items-start gap-1">
          <span className="flex min-w-0 max-w-full items-center gap-1 rounded-full bg-gradient-to-b from-amber-300 to-amber-500 py-1 pl-1.5 pr-3 text-xs font-black text-amber-950 shadow-lg" data-testid="casa-titulo">
            {ed ? <span className="text-sm leading-none"><Ico e={ed.icono ?? ""} /></span> : <Home className="h-4 w-4 shrink-0" />}
            <span className="min-w-0 truncate">{titulo}</span>
          </span>
          {!ed && (
            <span className={`rounded-full bg-black/45 px-2.5 py-0.5 text-[11px] font-semibold ${sombra}`}>
              {c.nombreNivel}
              {c.bendiciones > 0 ? ` · 🙏 ${c.bendiciones} ${c.bendiciones === 1 ? "bendición" : "bendiciones"}` : ""}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={salir}
          className="pointer-events-auto flex shrink-0 items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-black text-amber-950 shadow-lg active:scale-95"
          data-testid="casa-salir"
        >
          <DoorOpen className="h-4 w-4" /> {ed ? "Salir a la ciudad" : "Salir a la calle"}
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

        {/* los muebles que se usan (la casa viva): sentarse, descansar, cocinar y leer el rollo */}
        {!modal && !ed && !c.remodelando && c.postura && (
          <button
            type="button"
            onClick={() => mundo.levantarse()}
            className="pointer-events-auto flex items-center gap-1.5 rounded-full bg-white/90 px-4 py-2 text-sm font-black text-amber-950 shadow-lg active:scale-95"
            data-testid="casa-levantarse"
          >
            🚶 Levantarse
          </button>
        )}
        {!modal && !ed && !c.remodelando && !c.postura && c.uso && (
          <button
            type="button"
            onClick={() => void usar(c.uso!.uso)}
            disabled={usando || c.uso.hecho}
            className="pointer-events-auto flex items-center gap-1.5 rounded-full bg-gradient-to-b from-sky-300 to-sky-500 px-4 py-2 text-sm font-black text-sky-950 shadow-lg ring-2 ring-white/70 active:scale-95 disabled:from-stone-400 disabled:to-stone-500 disabled:text-white/80"
            data-testid={`casa-usar-${c.uso.uso}`}
          >
            {usando ? <Loader2 className="h-4 w-4 animate-spin" /> : <span className="text-base leading-none"><Ico e={BOTON_USO[c.uso.uso].icono ?? ""} /></span>}
            {c.uso.hecho ? BOTON_USO[c.uso.uso].hecho : `${BOTON_USO[c.uso.uso].texto} · ${c.uso.icono} ${c.uso.nombre}`}
          </button>
        )}

        {!modal && c.esMia && !c.remodelando && (
          <div className="pointer-events-auto flex flex-wrap justify-center gap-2">
            <button type="button" onClick={() => mundo.remodelar(true)} className="flex items-center gap-1.5 rounded-full bg-gradient-to-b from-amber-300 to-amber-500 px-4 py-2 text-sm font-black text-amber-950 shadow-lg active:scale-95" data-testid="casa-remodelar">
              <Hammer className="h-4 w-4" /> Remodelar
            </button>
            {onHuerto && (
              <button type="button" onClick={onHuerto} className="flex items-center gap-1.5 rounded-full bg-gradient-to-b from-lime-300 to-emerald-500 px-4 py-2 text-sm font-black text-emerald-950 shadow-lg active:scale-95" data-testid="casa-huerto">
                <Ico e="🌾" /> Mi huerto
              </button>
            )}
            <button type="button" onClick={() => gameStore.push({ kind: "casa" })} className="flex items-center gap-1.5 rounded-full bg-black/55 px-4 py-2 text-sm font-bold shadow-lg active:scale-95" data-testid="casa-ventana">
              <Home className="h-4 w-4 text-amber-300" /> Horno, obras y más
            </button>
          </div>
        )}

        {!modal && ed && (
          <div className="pointer-events-auto flex w-full max-w-xl flex-col items-center gap-1.5" data-testid="edificio-estaciones">
            {(ed.resto ?? []).some((r) => r.zonas.some((z) => !z.hecho)) && (
              <div className="flex max-w-full flex-col items-center gap-1" data-testid="edificio-restauracion">
                {(ed.resto ?? [])
                  .filter((r) => r.zonas.some((z) => !z.hecho))
                  .slice(0, 2)
                  .map((r) => (
                    <div key={r.id} className="flex max-w-full items-center gap-1.5 overflow-x-auto pb-0.5">
                      <span className="shrink-0 rounded-full bg-sky-900/70 px-2.5 py-1 text-[11px] font-black text-sky-50 shadow">
                        {r.icono} {r.hecha ? r.nombre : `${r.nombre}: ${r.hechos}/${r.total}`}
                      </span>
                      {r.zonas
                        .filter((z) => !z.hecho)
                        .map((z) => (
                          <button
                            key={z.id}
                            type="button"
                            onClick={() => mundo.irAZona(z.id)}
                            className={`flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold shadow-lg active:scale-95 ${z.guia ? "bg-gradient-to-b from-sky-300 to-sky-500 text-sky-950 ring-2 ring-white/80" : "bg-sky-950/70 text-white"}`}
                            data-testid={`edificio-zona-${z.id}`}
                          >
                            <span className="text-sm leading-none"><Ico e={z.icono ?? ""} /></span> {z.nombre}
                          </button>
                        ))}
                    </div>
                  ))}
              </div>
            )}
            <div className="flex max-w-full gap-1.5 overflow-x-auto pb-0.5">
              {ed.siguiente === "salir" && (
                <button
                  type="button"
                  onClick={() => mundo.irAEstacion("salir")}
                  className="flex shrink-0 items-center gap-1 rounded-full bg-gradient-to-b from-amber-300 to-amber-500 px-3 py-1.5 text-xs font-bold text-amber-950 shadow-lg ring-2 ring-white/80 active:scale-95"
                  data-testid="edificio-ir-salir"
                >
                  <DoorOpen className="h-3.5 w-3.5" /> Lo que sigue es afuera
                </button>
              )}
              {ed.estaciones
                // «Hablar con el maestro» ya tiene su botón abajo
                .filter((s) => s.id !== "maestro")
                .map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => mundo.irAEstacion(s.id)}
                    className={`flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold shadow-lg active:scale-95 ${s.siguiente ? "bg-gradient-to-b from-amber-300 to-amber-500 text-amber-950 ring-2 ring-white/80" : "bg-black/55 text-white"}`}
                    data-testid={`edificio-ir-${s.id}`}
                  >
                    <span className="text-sm leading-none"><Ico e={s.icono ?? ""} /></span> {s.nombre}
                  </button>
                ))}
            </div>
            <button
              type="button"
              onClick={() => onMaestro?.()}
              className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-black text-amber-950 shadow-lg active:scale-95"
              data-testid="edificio-maestro"
            >
              <MessageCircle className="h-4 w-4" /> Hablar con {ed.maestro}
            </button>
          </div>
        )}

        {!modal && !c.esMia && !ed && (
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
                  <Ico e={c.seleccion.icono ?? ""} /> {c.seleccion.nombre}
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
                      <span className="text-base"><Ico e={m.icono ?? ""} /></span> {m.nombre}
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
