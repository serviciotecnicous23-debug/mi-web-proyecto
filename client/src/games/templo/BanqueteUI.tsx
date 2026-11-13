/**
 * El banquete en tu casa (shared/banquete.ts, server/banquete.ts): abrir tu casa 20 minutos (en Tu casa → Vecinos) y
 * sentarse a la mesa de un vecino (al visitar su casa, parado en su puerta).
 */
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BANQUETE, VERSO_BANQUETE, VERSO_INVITADO, type BanquetesEstado, type SentarseRespuesta } from "@shared/banquete";
import { gameStore } from "./store";
import { Gozo, Ico } from "./iconos";

async function pedir<T>(path: string, body?: unknown): Promise<{ ok: boolean; data: (T & { message?: string }) | null }> {
  try {
    const res = await fetch(`/api/jerusalen${path}`, {
      method: body === undefined ? "GET" : "POST",
      credentials: "include",
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    return { ok: res.ok, data: (await res.json().catch(() => null)) as never };
  } catch {
    return { ok: false, data: null };
  }
}
const minutos = (s: number) => `${Math.max(1, Math.ceil(s / 60))} min`;

/** Abrir tu casa para un banquete (Tu casa → Vecinos). */
export function BanqueteCasa({ alGozo }: { alGozo?: (gozo: number) => void }) {
  const [e, setE] = useState<BanquetesEstado | null>(null);
  const [busy, setBusy] = useState(false);
  const [aviso, setAviso] = useState<string | null>(null);
  useEffect(() => {
    void pedir<BanquetesEstado>("/banquetes").then((r) => r.ok && r.data && setE(r.data));
  }, []);
  const abrir = async () => {
    setBusy(true);
    setAviso(null);
    const r = await pedir<BanquetesEstado>("/banquete", {});
    setBusy(false);
    if (r.ok && r.data) {
      setE(r.data);
      gameStore.toast(`🍞 Abriste tu casa con un banquete por ${BANQUETE.minutos} minutos. Tus vecinos ven el círculo dorado en tu puerta.`, "gold");
      alGozo?.(r.data.gozo);
    } else setAviso(r.data?.message || "No se pudo abrir el banquete.");
  };
  if (!e) return null;
  return (
    <section className="space-y-1.5 rounded-xl border border-amber-300 bg-amber-50/60 p-3 text-xs dark:border-amber-900/60 dark:bg-amber-950/20" data-testid="banquete-casa">
      <p className="font-black"><Ico e="🍞" /> Un banquete en tu casa</p>
      <p className="text-[11px] text-stone-600 dark:text-stone-300">
        Abre tu casa {BANQUETE.minutos} minutos con pan y aceite. Cada vecino que llegue a tu puerta y se siente a tu mesa gana {BANQUETE.gozoInvitado} de gozo y puntos para la copa del barrio, y tu casa gana {BANQUETE.honraPorInvitado} de honra por cada uno (hasta {BANQUETE.maxInvitados}). Cuesta <Gozo n={BANQUETE.gozo} />, {BANQUETE.harina} de flor de harina y {BANQUETE.aceite} de aceite. Una vez por día.
      </p>
      {e.mio ? (
        <p className="rounded-lg bg-white/70 p-2 font-semibold dark:bg-stone-900/50" data-testid="banquete-mio">
          {e.mio.faltan > 0 ? `Tu banquete está abierto: quedan ${minutos(e.mio.faltan)}. ` : "Tu banquete de hoy terminó. "}
          Se sentaron {e.mio.invitados} {e.mio.invitados === 1 ? "vecino" : "vecinos"} a tu mesa.
        </p>
      ) : (
        <Button className="w-full rounded-full bg-amber-500 font-bold text-amber-950 hover:bg-amber-400" disabled={busy || !e.puedoAbrir} onClick={() => void abrir()} data-testid="banquete-abrir">
          {busy ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : null} Abrir mi casa con un banquete
        </Button>
      )}
      {aviso && <p className="rounded-lg bg-rose-50 p-2 text-rose-800 dark:bg-rose-950/40 dark:text-rose-200">{aviso}</p>}
      <p className="text-[10px] italic text-stone-500">
        «{VERSO_BANQUETE.text}» ({VERSO_BANQUETE.ref})
      </p>
    </section>
  );
}

/** Sentarse a la mesa de un vecino (en la visita a su casa, si tiene banquete). */
export function BanqueteVisita({ personajeId, alGozo }: { personajeId: number; alGozo?: (gozo: number) => void }) {
  const [e, setE] = useState<BanquetesEstado | null>(null);
  const [busy, setBusy] = useState(false);
  const [aviso, setAviso] = useState<string | null>(null);
  useEffect(() => {
    void pedir<BanquetesEstado>("/banquetes").then((r) => r.ok && r.data && setE(r.data));
  }, [personajeId]);
  const b = e?.activos.find((x) => x.anfitrionId === personajeId && x.faltan > 0) ?? null;
  if (!b || b.mio) return null;
  const sentarse = async () => {
    setBusy(true);
    setAviso(null);
    const r = await pedir<SentarseRespuesta>(`/banquete/${b.id}/sentarse`, {});
    setBusy(false);
    if (r.ok && r.data) {
      alGozo?.(r.data.gozoTotal);
      setE((x) => (x ? { ...x, activos: x.activos.map((y) => (y.id === b.id ? r.data!.banquete : y)), sentadasHoy: x.sentadasHoy + 1 } : x));
      gameStore.toast(`🍞 Te sentaste a la mesa de ${b.anfitrion}: +${r.data.gozo} de gozo. ¡Gracias por la hospitalidad!`, "gold");
    } else setAviso(r.data?.message || "No te pudiste sentar.");
  };
  return (
    <section className="space-y-1.5 rounded-xl border border-amber-300 bg-amber-50/70 p-3 text-xs dark:border-amber-900/60 dark:bg-amber-950/20" data-testid="banquete-visita">
      <p className="font-black"><Ico e="🍞" /> {b.anfitrion} tiene un banquete</p>
      <p className="text-[11px] text-stone-600 dark:text-stone-300">
        Quedan {minutos(b.faltan)} · {b.invitados} de {BANQUETE.maxInvitados} a la mesa. Siéntate y gana {BANQUETE.gozoInvitado} de gozo (hasta {BANQUETE.sentadasPorDia} mesas por día).
      </p>
      {b.sentado ? (
        <p className="font-bold text-emerald-700 dark:text-emerald-300">✓ Ya estás sentado a su mesa.</p>
      ) : (
        <Button className="w-full rounded-full bg-amber-500 font-bold text-amber-950 hover:bg-amber-400" disabled={busy} onClick={() => void sentarse()} data-testid="banquete-sentarse">
          {busy ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : null} Sentarme a la mesa
        </Button>
      )}
      {aviso && <p className="rounded-lg bg-rose-50 p-2 text-rose-800 dark:bg-rose-950/40 dark:text-rose-200" data-testid="banquete-aviso">{aviso}</p>}
      <p className="text-[10px] italic text-stone-500">
        «{VERSO_INVITADO.text}» ({VERSO_INVITADO.ref})
      </p>
    </section>
  );
}
