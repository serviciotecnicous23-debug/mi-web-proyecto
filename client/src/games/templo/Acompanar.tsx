/**
 * Acompañar a los vecinos en la ciudad (shared/acompanar.ts): ir adonde está un amigo o vecino (y seguirlo), invitarlo
 * a venir, la invitación que llega arriba de la pantalla y el aviso «Siguiendo a…» con su botón para dejar de seguir.
 */
import { useContext, useEffect, useRef, useState } from "react";
import { Footprints, Loader2, Megaphone, X } from "lucide-react";
import type { CiudadWorld } from "./ciudad/mundo";
import { CiudadCtx } from "./CiudadUI";
import { gameStore } from "./store";
import { ICONO_CAMINO } from "./barrio-chat";
import { acompanar, useInvitacion, useSiguiendo } from "./acompanar-red";
import { VERSO_ACOMPANAR, type DondeEsta } from "@shared/acompanar";

/**
 * Ir adonde está un amigo o vecino: pregunta dónde está y lleva allí (y lo sigue). Si está sirviendo en el templo,
 * lleva al pie de la escalinata. Devuelve el aviso si no se pudo (o null).
 */
export async function irConVecino(city: CiudadWorld, personajeId: number, seguir = true): Promise<string | null> {
  let res: Response;
  try {
    res = await fetch(`/api/jerusalen/ciudad/donde/${personajeId}`, { credentials: "include" });
  } catch {
    return "No se pudo saber dónde está. Revisa tu conexión.";
  }
  const d = (await res.json().catch(() => null)) as (DondeEsta & { message?: string }) | null;
  if (!res.ok || !d) return d?.message || "No se pudo saber dónde está.";
  if (d.enTemplo) {
    city.irA("templo");
    return `${d.nombre} está sirviendo en el templo: sube por la escalinata para servir con él.`;
  }
  city.irAPunto(d.x, d.z);
  if (seguir) city.seguir(personajeId, d.nombre);
  return null;
}

/** Seguir a un amigo o vecino que se ve cerca (sin ir a otro lado). Devuelve el aviso si no se pudo (o null). */
export async function seguirVecino(city: CiudadWorld, personajeId: number): Promise<string | null> {
  let res: Response;
  try {
    res = await fetch(`/api/jerusalen/ciudad/donde/${personajeId}`, { credentials: "include" });
  } catch {
    return "No se pudo. Revisa tu conexión.";
  }
  const d = (await res.json().catch(() => null)) as (DondeEsta & { message?: string }) | null;
  if (!res.ok || !d) return d?.message || "No se pudo seguirlo.";
  if (d.enTemplo) return `${d.nombre} está sirviendo en el templo.`;
  city.seguir(personajeId, d.nombre);
  return null;
}

/** Invitar a un amigo o vecino a venir adonde uno está. Devuelve el aviso para mostrar. */
export async function invitarVecino(personajeId: number): Promise<{ ok: boolean; texto: string }> {
  try {
    const res = await fetch("/api/jerusalen/ciudad/invitar", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a: personajeId }),
    });
    const d = (await res.json().catch(() => null)) as { nombre?: string; message?: string } | null;
    if (res.ok) return { ok: true, texto: `📣 Invitaste a ${d?.nombre ?? "tu vecino"} a venir adonde estás.` };
    return { ok: false, texto: d?.message || "No se pudo invitar." };
  } catch {
    return { ok: false, texto: "No se pudo invitar. Revisa tu conexión." };
  }
}

/** La invitación de un amigo o vecino: ir con él (y seguirlo) o «Ahora no». */
export function InvitacionEntrante() {
  const { city } = useContext(CiudadCtx);
  const inv = useInvitacion();
  const [restan, setRestan] = useState(0);
  const [yendo, setYendo] = useState(false);
  const ocupada = useRef(false);
  ocupada.current = yendo;

  useEffect(() => {
    if (!inv) return;
    const paso = () => {
      setRestan(Math.max(0, Math.ceil((inv.hasta - Date.now()) / 1000)));
      if (Date.now() > inv.hasta && !ocupada.current) {
        clearInterval(t);
        acompanar.cerrarInvitacion();
      }
    };
    const t = setInterval(paso, 250);
    paso();
    return () => clearInterval(t);
  }, [inv]);

  if (!inv || !city) return null;
  async function ir() {
    if (!city || !inv) return;
    setYendo(true);
    const aviso = await irConVecino(city, inv.de, true);
    setYendo(false);
    acompanar.cerrarInvitacion();
    if (aviso) gameStore.toast(aviso, "info");
  }
  return (
    <div className="pointer-events-auto absolute inset-x-2 top-2 z-[64] mx-auto max-w-md rounded-2xl border border-emerald-300/70 bg-gradient-to-b from-emerald-900 to-emerald-950 p-3 text-emerald-50 shadow-2xl shadow-black/60" data-testid="ciudad-invitacion" role="dialog" aria-label={`${inv.nombre} te invita`}>
      <div className="flex items-start gap-2">
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg">
          <Megaphone className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-200">Te invitan</p>
          <p className="text-[13px] leading-snug">
            <b>
              {ICONO_CAMINO[inv.camino]} {inv.nombre}
            </b>{" "}
            te invita a venir: está {inv.lugar.charAt(0).toLowerCase() + inv.lugar.slice(1)}.
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-white/15 px-2 py-1 text-sm font-black tabular-nums">{restan}</span>
        <button type="button" className="shrink-0 rounded-full bg-white/10 p-1.5 hover:bg-white/20" onClick={() => acompanar.cerrarInvitacion()} aria-label="Ahora no">
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-2.5 grid grid-cols-[1fr_auto] gap-2">
        <button type="button" disabled={yendo} onClick={() => void ir()} className="rounded-xl bg-emerald-400 px-3 py-2.5 text-sm font-black text-emerald-950 disabled:opacity-60" data-testid="ciudad-invitacion-ir">
          {yendo ? <Loader2 className="mx-auto h-4 w-4 animate-spin" /> : `Ir con ${inv.nombre}`}
        </button>
        <button type="button" onClick={() => acompanar.cerrarInvitacion()} className="rounded-xl bg-white/10 px-3 py-2.5 text-xs font-bold hover:bg-white/20" data-testid="ciudad-invitacion-no">
          Ahora no
        </button>
      </div>
      <p className="mt-2 text-center font-serif text-[11px] italic text-emerald-100/80">
        «{VERSO_ACOMPANAR.text}» <span className="not-italic font-semibold text-amber-300">{VERSO_ACOMPANAR.ref}</span>
      </p>
    </div>
  );
}

/** Mientras sigues a alguien: a quién, y el botón para dejar de seguirlo. */
export function SiguiendoChip() {
  const { city } = useContext(CiudadCtx);
  const s = useSiguiendo();
  if (!s || !city) return null;
  return (
    <div className="pointer-events-auto flex max-w-[92vw] items-center gap-2 rounded-full bg-emerald-800/90 py-1 pl-3 pr-1 text-xs font-bold text-white shadow-lg ring-1 ring-emerald-300/50" data-testid="ciudad-siguiendo" role="status">
      <Footprints className="h-3.5 w-3.5 shrink-0" />
      <span className="min-w-0 truncate">Siguiendo a {s.nombre}</span>
      <button type="button" className="shrink-0 rounded-full bg-white/15 px-2.5 py-1 hover:bg-white/25" onClick={() => city.dejarDeSeguir()} data-testid="ciudad-siguiendo-dejar">
        Dejar de seguir
      </button>
    </div>
  );
}
