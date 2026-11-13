/**
 * El arca de Joás en la pantalla (shared/arca.ts, server/arca.ts): arriba de la escalinata del templo, cada uno echa su
 * gozo hasta llenarla entre toda la ciudad. Muestra cómo va, lo que puedes dar hoy, el libro con los nombres de los que
 * dieron, la causa real (si el ministerio la puso) y las arcas de las temporadas anteriores.
 */
import { useCallback, useEffect, useState } from "react";
import { Landmark, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ARCA_MINIMO, ARCA_TITULO_DESDE, VERSO_ARCA, VERSO_ARCA_LLENA, VERSO_DADOR, type ArcaEstado } from "@shared/arca";
import { gameStore } from "./store";
import { Card, VerseBox } from "./ui";
import { Gozo, Ico } from "./iconos";

type Resp = ArcaEstado & { message?: string; dado?: number; llenaAhora?: boolean };
async function pedir(path: string, body?: unknown): Promise<{ ok: boolean; data: Resp | null }> {
  try {
    const res = await fetch(`/api/jerusalen${path}`, {
      method: body === undefined ? "GET" : "POST",
      credentials: "include",
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    return { ok: res.ok, data: (await res.json().catch(() => null)) as Resp | null };
  } catch {
    return { ok: false, data: null };
  }
}

const fmt = (n: number) => n.toLocaleString("es-419");

export function ArcaView({ alCambiarGozo }: { alCambiarGozo?: (gozo: number) => void }) {
  const [a, setA] = useState<ArcaEstado | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [causa, setCausa] = useState("");
  const recibir = useCallback(
    (d: ArcaEstado) => {
      setA(d);
      alCambiarGozo?.(d.gozo);
    },
    [alCambiarGozo],
  );
  useEffect(() => {
    void pedir("/arca").then((r) => {
      if (r.ok && r.data) {
        recibir(r.data);
        setCausa(r.data.causa ?? "");
      } else setError(r.data?.message || "No se pudo ver el arca. Revisa tu conexión.");
    });
  }, [recibir]);
  const dar = async (gozo: number) => {
    setBusy(true);
    setError(null);
    const r = await pedir("/arca/dar", { gozo });
    setBusy(false);
    if (r.ok && r.data) {
      recibir(r.data);
      if (r.data.llenaAhora) gameStore.toast("🎉 ¡Llenaste el arca de Joás! Toda la ciudad lo celebra: mira las lámparas de oro en la escalinata.", "gold");
      else gameStore.toast(`🪙 Echaste ${r.data.dado ?? gozo} de gozo en el arca. «Dios ama al dador alegre».`, "gold");
    } else setError(r.data?.message || "No se pudo. Intenta de nuevo.");
  };
  const guardarCausa = async () => {
    setBusy(true);
    const r = await pedir("/admin/arca", { causa });
    setBusy(false);
    if (r.ok && r.data && "temporada" in r.data) {
      recibir(r.data);
      gameStore.toast(causa.trim() ? "Guardaste la causa del arca." : "Quitaste la causa del arca.", "gold");
    } else setError(r.data?.message || "No se pudo guardar la causa.");
  };

  const pct = a ? Math.min(100, Math.round((a.aportado / Math.max(1, a.meta)) * 100)) : 0;
  const puede = a ? Math.min(a.quedaHoy, a.gozo, Math.max(0, a.meta - a.aportado)) : 0;
  const montos = a ? [...new Set([ARCA_MINIMO, 50, 100, puede].filter((x) => x >= Math.min(ARCA_MINIMO, a.meta - a.aportado) && x <= puede))].sort((x, y) => x - y) : [];
  return (
    <Card
      title={
        <span className="flex items-center gap-2">
          <Landmark className="h-5 w-5" /> El arca de Joás
        </span>
      }
      onClose={() => gameStore.close()}
      testid="ciudad-arca"
    >
      <div className="space-y-3 p-4 text-sm">
        <VerseBox text={VERSO_ARCA.text} refName={VERSO_ARCA.ref} />
        {error && <p className="rounded-xl bg-red-50 p-2.5 text-xs text-red-900 dark:bg-red-950/30 dark:text-red-200" data-testid="arca-error">{error}</p>}
        {!a && !error && (
          <p className="flex items-center gap-2 text-stone-500">
            <Loader2 className="h-4 w-4 animate-spin" /> Abriendo el arca…
          </p>
        )}
        {a && (
          <>
            <p className="text-[13px] text-stone-600 dark:text-stone-300">
              Toda la ciudad llena esta arca en la temporada {a.temporada}. Cada uno echa su gozo (hasta 500 por día, para que sea de todos). Cuando se llene, la escalinata del templo se llenará de lámparas de oro y quedarán los nombres de los que dieron.
            </p>
            {a.causa && (
              <p className="rounded-xl border border-emerald-300 bg-emerald-50 p-2.5 text-[13px] font-semibold text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-100" data-testid="arca-causa">
                <Ico e="🤲" /> Si la ciudad llena el arca: {a.causa}
              </p>
            )}
            <section className={`space-y-1.5 rounded-xl border p-3 ${a.llena ? "border-amber-400 bg-gradient-to-br from-amber-100 to-yellow-50 dark:border-amber-700 dark:from-amber-950/40 dark:to-stone-900" : "border-amber-200 dark:border-amber-900/60"}`} data-testid="arca-avance">
              <p className="flex items-baseline justify-between gap-2 font-black">
                <span>{a.llena ? "🎉 ¡La ciudad llenó el arca!" : "🪙 Lo que lleva el arca"}</span>
                <span className="tabular-nums text-amber-800 dark:text-amber-300">
                  {fmt(a.aportado)} / {fmt(a.meta)}
                </span>
              </p>
              <div className="h-3 overflow-hidden rounded-full bg-amber-100 dark:bg-amber-950/50">
                <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 transition-[width] duration-700" style={{ width: `${pct}%` }} />
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-300">
                {a.llena ? "Las lámparas de oro alumbran la escalinata hasta el fin de la temporada." : `${pct} % · ${a.dadores} ${a.dadores === 1 ? "persona dio" : "personas dieron"} · quedan ${a.quedanDias} ${a.quedanDias === 1 ? "día" : "días"} de la temporada.`}
              </p>
              {a.llena && <VerseBox text={VERSO_ARCA_LLENA.text} refName={VERSO_ARCA_LLENA.ref} />}
            </section>
            {!a.llena && (
              <section className="space-y-2 rounded-xl bg-stone-50 p-3 dark:bg-stone-800/60" data-testid="arca-dar">
                <p className="text-xs">
                  Tienes <Gozo n={fmt(a.gozo)} /> de gozo. Hoy diste {fmt(a.hoy)}{a.quedaHoy > 0 ? ` y puedes dar ${fmt(a.quedaHoy)} más` : ": mañana puedes dar más"}. En la temporada diste {fmt(a.mio)}.
                </p>
                {montos.length ? (
                  <div className="flex flex-wrap gap-1.5">
                    {montos.map((m) => (
                      <Button key={m} size="sm" className="rounded-full bg-amber-500 font-bold text-amber-950 hover:bg-amber-400" disabled={busy} onClick={() => void dar(m)} data-testid={`arca-dar-${m}`}>
                        {busy ? <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" /> : "🪙"} Echar {fmt(m)}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <p className="text-[11px] text-stone-500">{a.quedaHoy <= 0 ? "Hoy ya diste lo más que se puede dar." : "Te falta gozo: sirve, estudia y cumple tus encargos."}</p>
                )}
                <p className="text-[11px] text-stone-500">
                  Si das {ARCA_TITULO_DESDE} o más en una temporada en que la ciudad llene el arca, ganas el título «Dador alegre» para tu álbum. Cada 10 de gozo suma un punto a la copa de tu barrio.
                </p>
              </section>
            )}
            <section className="space-y-1" data-testid="arca-libro">
              <p className="font-black"><Ico e="📜" /> El libro del arca</p>
              {a.libro.length ? (
                <ol className="space-y-0.5 text-xs">
                  {a.libro.map((x, i) => (
                    <li key={`${x.nombre}-${i}`} className={`flex justify-between gap-2 rounded px-2 py-0.5 ${x.esMio ? "bg-amber-100 font-bold dark:bg-amber-900/40" : ""}`}>
                      <span>
                        {i + 1}. {x.nombre}
                      </span>
                      <span className="tabular-nums"><Gozo n={fmt(x.gozo)} /></span>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-[11px] text-stone-500">Todavía nadie dio en esta temporada. ¡Sé el primero!</p>
              )}
            </section>
            {a.anteriores.length > 0 && (
              <p className="text-[11px] text-stone-500" data-testid="arca-anteriores">
                Antes: {a.anteriores.map((x) => `temporada ${x.temporada} ${x.llena ? "✓ llena" : `${Math.round((x.aportado / Math.max(1, x.meta)) * 100)} %`}`).join(" · ")}
              </p>
            )}
            <VerseBox text={VERSO_DADOR.text} refName={VERSO_DADOR.ref} />
            {a.admin && (
              <section className="space-y-1.5 rounded-xl border border-dashed border-emerald-400 p-2.5 text-xs" data-testid="arca-admin">
                <p className="font-bold">Administración: la causa real (opcional)</p>
                <textarea className="w-full rounded-lg border border-stone-300 bg-white p-2 text-xs dark:border-stone-600 dark:bg-stone-900" rows={2} maxLength={300} value={causa} onChange={(e) => setCausa(e.target.value)} placeholder="Por ejemplo: el ministerio dará una ofrenda para…" />
                <Button size="sm" variant="secondary" disabled={busy} onClick={() => void guardarCausa()}>
                  Guardar la causa
                </Button>
              </section>
            )}
          </>
        )}
      </div>
    </Card>
  );
}
