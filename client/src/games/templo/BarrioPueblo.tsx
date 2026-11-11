/**
 * El tablero del barrio con las familias del pueblo (shared/pueblo.ts): quién pide hoy, qué y cuánto le falta, y el
 * botón para darle de tu alfolí. Cuando un pedido se completa, la familia da las gracias aquí mismo.
 */
import { useContext, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { CiudadCtx } from "./CiudadUI";
import { gameStore } from "./store";
import { VERSO_PUEBLO, type PedidoPuebloVista, type PuebloEstado } from "@shared/pueblo";
import { AYUDA_GOZO_DIA, type BienAyuda } from "@shared/ayuda";
import type { MisionCumplida } from "@shared/misiones";

const NOMBRE_BIEN: Record<BienAyuda, [string, string, string]> = {
  harina: ["harina", "harinas", "🌾"],
  aceite: ["aceite", "aceites", "🫒"],
  corderos: ["cordero", "corderos", "🐑"],
};

export function PuebloDelBarrio() {
  const { city } = useContext(CiudadCtx);
  const [e, setE] = useState<PuebloEstado | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [ocupado, setOcupado] = useState<number | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);

  useEffect(() => {
    let vivo = true;
    const cargar = async () => {
      const r = await fetch("/api/jerusalen/pueblo", { credentials: "include" }).catch(() => null);
      const d = r ? ((await r.json().catch(() => null)) as (PuebloEstado & { message?: string }) | null) : null;
      if (!vivo) return;
      if (r?.ok && d) {
        setE(d);
        setError(null);
      } else setError(d?.message || "No se pudo abrir el tablero del barrio. Revisa tu conexión.");
    };
    void cargar();
    const t = setInterval(() => void cargar(), 20_000);
    return () => {
      vivo = false;
      clearInterval(t);
    };
  }, []);

  async function dar(p: PedidoPuebloVista, cantidad: number) {
    setOcupado(p.parcela);
    setAviso(null);
    try {
      const r = await fetch(`/api/jerusalen/pueblo/${p.parcela}/dar`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cantidad }),
      });
      const d = (await r.json().catch(() => null)) as
        | (PuebloEstado & { message?: string; dio?: { cantidad: number; gozo: number; cumplido: boolean; gracias: string | null }; misiones?: MisionCumplida[]; gozoTotal?: number })
        | null;
      if (r.ok && d) {
        setE(d);
        city?.audio.coin(1);
        if (d.dio?.cumplido) void city?.mirarPueblo();
        if (d.gozoTotal != null) city?.ponerGozo(d.gozoTotal);
        const [uno, varios] = NOMBRE_BIEN[p.bien];
        setAviso(
          d.dio?.cumplido
            ? `🙏 La familia de ${p.familia.nombre}: «${d.dio.gracias}»`
            : `Diste ${d.dio?.cantidad ?? cantidad} ${(d.dio?.cantidad ?? cantidad) === 1 ? uno : varios} a la familia de ${p.familia.nombre}${d.dio?.gozo ? ` (+${d.dio.gozo} de gozo)` : ""}.`,
        );
        for (const m of d.misiones ?? []) gameStore.toast(`${m.titulo} +${m.premio} de mérito`, "gold");
      } else setAviso(d?.message || "No se pudo dar.");
    } catch {
      setAviso("No se pudo dar. Revisa tu conexión.");
    }
    setOcupado(null);
  }

  if (!e)
    return (
      <div className="py-6 text-center text-sm" data-testid="barrio-pueblo">
        {error ? <p className="text-red-700 dark:text-red-300">{error}</p> : <Loader2 className="mx-auto h-6 w-6 animate-spin text-amber-600" />}
      </div>
    );
  return (
    <div className="space-y-3" data-testid="barrio-pueblo">
      <p className="text-xs text-stone-600 dark:text-stone-300">
        En las casas que todavía no tienen dueño viven <b>{e.familias}</b> {e.familias === 1 ? "familia" : "familias"} del pueblo de Jerusalén. Cada día alguna pide algo; dales de tu alfolí.
      </p>
      {e.pedidos.length === 0 ? (
        <p className="rounded-xl bg-stone-50 p-3 text-center text-xs text-stone-500 dark:bg-stone-900/40">Hoy nadie del pueblo pide nada en tu barrio. ¡Vuelve mañana!</p>
      ) : (
        <ul className="space-y-2" data-testid="barrio-pueblo-pedidos">
          {e.pedidos.map((p) => {
            const [uno, varios, icono] = NOMBRE_BIEN[p.bien];
            const falta = Math.max(0, p.cantidad - p.recibido);
            const tengo = e.bienes[p.bien] ?? 0;
            return (
              <li key={p.parcela} className={`space-y-2 rounded-xl p-3 ring-1 ${p.cumplido ? "bg-emerald-50 ring-emerald-200 dark:bg-emerald-950/30 dark:ring-emerald-800" : "bg-amber-50 ring-amber-200 dark:bg-amber-950/30 dark:ring-amber-900"}`} data-testid={`pueblo-pedido-${p.parcela}`}>
                <p className="flex items-start gap-2 text-[13px] leading-snug">
                  <span className="text-2xl leading-none" aria-hidden="true">
                    {p.familia.icono}
                  </span>
                  <span className="min-w-0">
                    <b>
                      La familia de {p.familia.nombre}, {p.familia.oficio}
                    </b>{" "}
                    <span className="text-stone-500">(casa {p.parcela + 1})</span>
                    <span className="block italic">«{p.cumplido ? p.gracias : p.texto}»</span>
                  </span>
                </p>
                <div className="h-2 overflow-hidden rounded-full bg-white/80 dark:bg-stone-800" role="progressbar" aria-valuenow={p.recibido} aria-valuemin={0} aria-valuemax={p.cantidad}>
                  <div className={`h-full rounded-full ${p.cumplido ? "bg-emerald-500" : "bg-amber-500"}`} style={{ width: `${(p.recibido / p.cantidad) * 100}%` }} />
                </div>
                <p className="text-xs font-bold">
                  {icono} {p.recibido} de {p.cantidad} {p.cantidad === 1 ? uno : varios}
                  {p.miAporte > 0 ? ` · tú diste ${p.miAporte}` : ""}
                  {p.cumplido ? " · ✓ cumplido" : ` · faltan ${falta}`}
                </p>
                {!p.cumplido && (
                  <div className="flex flex-wrap items-center gap-2">
                    {[1, Math.min(3, falta), falta]
                      .filter((n, i, l) => n > 0 && l.indexOf(n) === i)
                      .map((n) => (
                        <button
                          key={n}
                          type="button"
                          disabled={ocupado !== null || tengo < n}
                          onClick={() => void dar(p, n)}
                          className="rounded-full bg-amber-500 px-3 py-1.5 text-xs font-black text-amber-950 disabled:opacity-40"
                          data-testid={`pueblo-dar-${p.parcela}-${n}`}
                        >
                          {ocupado === p.parcela ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : `Dar ${n}`}
                        </button>
                      ))}
                    <span className="text-[11px] text-stone-500">Tienes {tengo} en tu alfolí.</span>
                  </div>
                )}
                <p className="font-serif text-[11.5px] italic text-stone-600 dark:text-stone-300">
                  «{p.verso.text}» <span className="not-italic text-[10.5px] font-semibold text-amber-800 dark:text-amber-300">{p.verso.ref}</span>
                </p>
              </li>
            );
          })}
        </ul>
      )}
      {aviso && (
        <p className="rounded-lg bg-amber-50 px-2 py-1.5 text-xs text-amber-900 dark:bg-amber-950/40 dark:text-amber-200" data-testid="barrio-pueblo-aviso">
          {aviso}
        </p>
      )}
      <p className="text-center text-[11px] text-stone-500">
        Ayudar da gozo (hasta {AYUDA_GOZO_DIA} por día, junto con la ayuda a tus vecinos), cumple tu encargo de ayudar y suma para la copa de tu barrio. Te quedan {e.gozoQueda} de gozo hoy.
      </p>
      <p className="text-center font-serif text-[12px] italic text-stone-600 dark:text-stone-300">
        «{VERSO_PUEBLO.text}» <span className="not-italic text-[11px] font-semibold text-amber-800 dark:text-amber-300">{VERSO_PUEBLO.ref}</span>
      </p>
    </div>
  );
}
