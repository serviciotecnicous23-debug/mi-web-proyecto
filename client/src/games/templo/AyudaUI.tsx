/**
 * Los pedidos del barrio, la pantalla (shared/ayuda.ts): pedir ayuda desde «Tu casa» y dar de tu
 * alfolí desde los anuncios de la plaza.
 */
import { useEffect, useState } from "react";
import { HandHeart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AYUDA_MAX, AYUDA_MIN, VERSO_AYUDA, type AyudaDada, type AyudaEstado, type BienAyuda } from "@shared/ayuda";
import { avisarMisiones } from "./online";
import { gameStore } from "./store";

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

const NOMBRE: Record<BienAyuda, string> = { harina: "flor de harina", aceite: "aceite", corderos: "corderos" };
const ICONO: Record<BienAyuda, string> = { harina: "🌾", aceite: "🫒", corderos: "🐑" };
const horas = (s: number) => (s >= 3600 ? `${Math.floor(s / 3600)} h` : `${Math.max(1, Math.ceil(s / 60))} min`);

/** En «Tu casa»: pedir ayuda al barrio (una vez por día) y ver cómo va. */
export function PedirAyuda() {
  const [e, setE] = useState<AyudaEstado | null>(null);
  const [bien, setBien] = useState<BienAyuda>("harina");
  const [cantidad, setCantidad] = useState(5);
  const [busy, setBusy] = useState(false);
  const [aviso, setAviso] = useState<string | null>(null);
  useEffect(() => {
    void pedir<AyudaEstado>("/ayuda").then((r) => r.ok && r.data && setE(r.data));
  }, []);
  if (!e) return null;
  const enviar = async () => {
    setBusy(true);
    setAviso(null);
    const r = await pedir<AyudaEstado>("/ayuda", { bien, cantidad });
    setBusy(false);
    if (r.ok && r.data) {
      setE(r.data);
      gameStore.toast(`Pediste ${cantidad} de ${NOMBRE[bien]} a tu barrio: tus vecinos lo ven en los anuncios`, "gold");
    } else setAviso(r.data?.message || "No se pudo pedir. Intenta de nuevo.");
  };
  const m = e.mio;
  return (
    <section className="space-y-2 rounded-xl border border-teal-200 p-3 dark:border-teal-900/60" data-testid="casa-ayuda">
      <p className="flex items-center gap-1.5 font-black">
        <HandHeart className="h-4 w-4 text-teal-600" /> Pide ayuda a tu barrio
      </p>
      <p className="text-[11px] text-stone-500">Una vez por día puedes pedir a tus vecinos algo para tu ofrenda. Lo que te den llega a tu alfolí.</p>
      {aviso && <p className="rounded-lg bg-amber-50 px-2 py-1 text-xs text-amber-900 dark:bg-amber-950/40 dark:text-amber-200">{aviso}</p>}
      {m ? (
        <div className="rounded-lg bg-teal-50 p-2 text-xs dark:bg-teal-950/30" data-testid="casa-ayuda-mio">
          {ICONO[m.bien]} Pediste {m.cantidad} de {NOMBRE[m.bien]}: te dieron {m.recibido}.
          {m.cumplido ? " ¡Tu barrio cumplió tu pedido!" : m.faltan > 0 ? ` Queda abierto ${horas(m.faltan)}.` : " El pedido ya venció."}
          <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-teal-100 dark:bg-teal-950/60">
            <div className="h-full rounded-full bg-teal-500" style={{ width: `${Math.min(100, (m.recibido / m.cantidad) * 100)}%` }} />
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {(["harina", "aceite", "corderos"] as BienAyuda[]).map((b) => (
            <button key={b} type="button" onClick={() => setBien(b)} className={`rounded-full px-2.5 py-1 font-bold ${bien === b ? "bg-teal-600 text-white" : "bg-stone-100 dark:bg-stone-800"}`} data-testid={`ayuda-bien-${b}`}>
              {ICONO[b]} {NOMBRE[b]}
            </button>
          ))}
          <select
            className="rounded-md border border-stone-300 bg-white px-1.5 py-1 dark:border-stone-700 dark:bg-stone-900"
            value={cantidad}
            onChange={(ev) => setCantidad(Number(ev.target.value))}
            aria-label="Cuánto pides"
            data-testid="ayuda-cantidad"
          >
            {Array.from({ length: AYUDA_MAX - AYUDA_MIN + 1 }, (_, i) => AYUDA_MIN + i).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <Button size="sm" className="bg-teal-600 font-bold text-white hover:bg-teal-500" disabled={busy} onClick={() => void enviar()} data-testid="ayuda-pedir">
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Pedir al barrio"}
          </Button>
        </div>
      )}
    </section>
  );
}

/** En los anuncios de la plaza: los pedidos abiertos del barrio y dar de tu alfolí. */
export function PedidosBarrio({ alDar }: { alDar?: (bienes: AyudaEstado["bienes"]) => void }) {
  const [e, setE] = useState<AyudaEstado | null>(null);
  const [busy, setBusy] = useState(false);
  const [aviso, setAviso] = useState<string | null>(null);
  useEffect(() => {
    void pedir<AyudaEstado>("/ayuda").then((r) => r.ok && r.data && setE(r.data));
  }, []);
  if (!e) return null;
  const dar = async (id: number, cantidad: number) => {
    setBusy(true);
    setAviso(null);
    const r = await pedir<AyudaDada>(`/ayuda/${id}/dar`, { cantidad });
    setBusy(false);
    if (r.ok && r.data) {
      setE(r.data.estado);
      alDar?.(r.data.estado.bienes);
      avisarMisiones(r.data.misiones);
      gameStore.toast(`Diste ${r.data.dado} a tu vecino${r.data.gozo ? ` · +${r.data.gozo} de gozo` : ""}${r.data.cumplido ? " · ¡pedido cumplido!" : ""}`, "gold");
    } else setAviso(r.data?.message || "No se pudo dar. Intenta de nuevo.");
  };
  return (
    <section data-testid="anuncios-ayuda">
      <p className="mb-1 font-black">
        <HandHeart className="-mt-0.5 mr-1 inline h-4 w-4 text-teal-600" /> Pedidos de tu barrio
      </p>
      {aviso && <p className="mb-1 rounded-lg bg-amber-50 px-2 py-1 text-xs text-amber-900 dark:bg-amber-950/40 dark:text-amber-200">{aviso}</p>}
      {e.pedidos.length ? (
        <ul className="space-y-1">
          {e.pedidos.map((p) => {
            const falta = p.cantidad - p.recibido;
            const puedo = Math.min(falta, e.bienes[p.bien]);
            return (
              <li key={p.id} className="flex items-center gap-2 rounded-lg bg-teal-50/70 px-2 py-1.5 text-xs dark:bg-teal-950/20">
                <span className="min-w-0 flex-1">
                  {ICONO[p.bien]} <b>{p.nombre}</b> pide {p.cantidad} de {NOMBRE[p.bien]} · le faltan {falta} · tienes {e.bienes[p.bien]}
                </span>
                <Button size="sm" variant="secondary" className="h-7" disabled={busy || puedo < 1} onClick={() => void dar(p.id, 1)} data-testid={`ayuda-dar1-${p.id}`}>
                  Dar 1
                </Button>
                {puedo > 1 && (
                  <Button size="sm" className="h-7 bg-teal-600 text-white hover:bg-teal-500" disabled={busy} onClick={() => void dar(p.id, puedo)} data-testid={`ayuda-dar-${p.id}`}>
                    Dar {puedo}
                  </Button>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-xs text-stone-500">Nadie de tu barrio pidió ayuda ahora. Si necesitas algo para tu ofrenda, pídelo desde «Tu casa».</p>
      )}
      <p className="mt-1 text-[11px] text-stone-500">
        Ayudar da {e.gozoQueda > 0 ? `gozo (te quedan ${e.gozoQueda} por hoy)` : "alegría (hoy ya ganaste todo el gozo de ayudar)"}. «{VERSO_AYUDA.text}» ({VERSO_AYUDA.ref})
      </p>
    </section>
  );
}
