/**
 * «Avisos al teléfono» (shared/avisos.ts): activar los avisos del juego en este teléfono (usa la suscripción de avisos
 * del sitio, use-push-notifications) y elegir cuáles: la racha, el huerto, los duelos y las fiestas. El servidor
 * decide cuándo avisar y nunca de noche.
 */
import { useEffect, useState } from "react";
import { Bell, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePushNotifications } from "@/hooks/use-push-notifications";
import { TIPOS_AVISO, type AvisosVista, type TipoAviso } from "@shared/avisos";
import { gameStore } from "./store";
import { Card } from "./ui";

export async function pedirAvisos(cambio?: Partial<Record<TipoAviso | "activo", boolean>>): Promise<AvisosVista | null> {
  try {
    const r = await fetch("/api/jerusalen/avisos", {
      method: cambio ? "POST" : "GET",
      credentials: "include",
      cache: "no-store",
      headers: cambio ? { "Content-Type": "application/json" } : undefined,
      body: cambio ? JSON.stringify(cambio) : undefined,
    });
    return r.ok ? ((await r.json()) as AvisosVista) : null;
  } catch {
    return null;
  }
}

export function AvisosView() {
  const push = usePushNotifications();
  const [v, setV] = useState<AvisosVista | null>(null);
  const [ocupado, setOcupado] = useState(false);
  const [aviso, setAviso] = useState<string | null>(null);
  useEffect(() => {
    void pedirAvisos().then(setV);
  }, []);
  const activo = !!v?.pref?.activo && push.isSubscribed;

  async function activar() {
    setOcupado(true);
    setAviso(null);
    const ok = push.isSubscribed || (await push.subscribe());
    if (!ok) {
      const negado = typeof Notification !== "undefined" && Notification.permission === "denied";
      setAviso(
        negado
          ? "Tu navegador tiene los avisos bloqueados para esta página. Permítelos en la configuración del navegador (el candado junto a la dirección) y vuelve a intentar."
          : "No se pudieron activar. Intenta otra vez.",
      );
      setOcupado(false);
      return;
    }
    const nueva = await pedirAvisos({ activo: true });
    if (nueva) setV(nueva);
    setOcupado(false);
    gameStore.toast("🔔 Avisos activados en este teléfono", "gold");
  }

  async function cambiar(tipo: TipoAviso | "activo", valor: boolean) {
    const nueva = await pedirAvisos({ [tipo]: valor });
    if (nueva) setV(nueva);
  }

  return (
    <Card
      title={
        <span className="flex items-center gap-2">
          <Bell className="h-5 w-5" /> Avisos al teléfono
        </span>
      }
      onClose={() => gameStore.close()}
      testid="avisos"
    >
      <div className="space-y-3 p-4 text-sm">
        <p className="leading-snug">
          Te avisamos aunque el juego esté cerrado, para que no se te pierda nada. Nunca de noche: de 10 de la noche a 8 de la mañana (hora de Texas) no
          llega ningún aviso.
        </p>
        {!v ? (
          <Loader2 className="h-5 w-5 animate-spin text-amber-600" />
        ) : !v.configurado ? (
          <p className="rounded-xl bg-amber-100 px-3 py-2 text-amber-900 dark:bg-amber-950/50 dark:text-amber-200" data-testid="avisos-sin-servidor">
            Los avisos todavía no están encendidos en el servidor del ministerio. En cuanto lo estén, los activas aquí.
          </p>
        ) : !push.isSupported ? (
          <p className="rounded-xl bg-stone-100 px-3 py-2 dark:bg-stone-800" data-testid="avisos-sin-navegador">
            Este navegador no permite avisos. En iPhone: abre la página en Safari, toca Compartir → «Agregar a inicio» y entra desde ese ícono.
          </p>
        ) : activo ? (
          <p className="rounded-xl bg-emerald-50 px-3 py-2 font-semibold text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200" data-testid="avisos-activos">
            ✓ Los avisos están activados en este teléfono.
          </p>
        ) : (
          <Button className="w-full" disabled={ocupado || push.loading} onClick={() => void activar()} data-testid="avisos-activar">
            {ocupado ? <Loader2 className="h-4 w-4 animate-spin" /> : "🔔 Activar avisos en este teléfono"}
          </Button>
        )}
        {v?.configurado && (
          <ul className="space-y-2">
            {TIPOS_AVISO.map((t) => (
              <li key={t.id}>
                <label className={`flex items-start gap-2.5 rounded-xl border border-stone-200 p-2.5 dark:border-stone-700 ${activo ? "cursor-pointer" : "opacity-60"}`}>
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 accent-amber-600"
                    checked={v.pref ? v.pref[t.id] : true}
                    disabled={!activo}
                    onChange={(e) => void cambiar(t.id, e.target.checked)}
                    data-testid={`aviso-${t.id}`}
                  />
                  <span className="min-w-0">
                    <span className="font-bold">
                      {t.icono} {t.titulo}
                    </span>
                    <span className="block text-[12px] text-stone-500 dark:text-stone-400">{t.texto}</span>
                  </span>
                </label>
              </li>
            ))}
          </ul>
        )}
        {activo && (
          <button type="button" className="text-xs text-stone-500 underline underline-offset-2" onClick={() => void cambiar("activo", false)} data-testid="avisos-apagar">
            Apagar los avisos del juego
          </button>
        )}
        {aviso && <p className="rounded-lg bg-amber-100 px-2 py-1 text-xs text-amber-900 dark:bg-amber-950/50 dark:text-amber-200">{aviso}</p>}
      </div>
    </Card>
  );
}

/** La invitación en «Misiones» (debajo de «Para hoy») para quien todavía no activó los avisos. */
export function AvisosInvitacion() {
  const [v, setV] = useState<AvisosVista | null>(null);
  useEffect(() => {
    let vivo = true;
    void pedirAvisos().then((x) => vivo && setV(x));
    return () => {
      vivo = false;
    };
  }, []);
  const puede = typeof window !== "undefined" && "PushManager" in window && "serviceWorker" in navigator;
  if (!v || !v.configurado || v.pref?.activo || !puede) return null;
  return (
    <div className="flex items-center gap-2 rounded-xl border border-amber-300 bg-amber-50/60 px-3 py-2 text-[13px] dark:border-amber-800 dark:bg-amber-950/20" data-testid="avisos-invitacion">
      <span className="w-5 shrink-0 text-center">🔔</span>
      <span className="min-w-0 flex-1">Activa los avisos al teléfono: que no se te pierda la racha, la cosecha, un duelo ni una fiesta.</span>
      <Button
        size="sm"
        variant="secondary"
        className="h-7 shrink-0"
        onClick={() => {
          gameStore.close();
          gameStore.push({ kind: "avisos" });
        }}
      >
        Activar
      </Button>
    </div>
  );
}
