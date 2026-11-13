/**
 * Los dichos de los ancianos en la pantalla (shared/dichos.ts, server/dichos.ts): la ventana de los ancianos de la
 * puerta, con el dicho de hoy (se descubre al sentarse a escucharlo) y los que ya juntaste, y la colección en el álbum.
 */
import { useContext, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CiudadCtx } from "./CiudadUI";
import { gameStore } from "./store";
import { Card, VerseBox } from "./ui";
import { DICHOS, GOZO_DICHO, VERSO_DICHOS, VERSO_OIDO_SABIO, VERSO_PUERTA, delTema, dicho as dichoPorId, type Dicho, type DichoEscuchado, type DichosEstado } from "@shared/dichos";

type Resp<T> = T & { message?: string };
async function pedir<T>(path: string, body?: unknown): Promise<{ ok: boolean; status: number; data: Resp<T> | null }> {
  try {
    const res = await fetch(`/api/jerusalen${path}`, {
      method: body === undefined ? "GET" : "POST",
      credentials: "include",
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    return { ok: res.ok, status: res.status, data: (await res.json().catch(() => null)) as Resp<T> | null };
  } catch {
    return { ok: false, status: 0, data: null };
  }
}

export async function traerDichos(): Promise<DichosEstado | null> {
  const r = await pedir<DichosEstado>("/dichos");
  return r.ok ? r.data : null;
}

/** Un dicho con lo que quiere decir. */
function DichoCompleto({ d, nuevo }: { d: Dicho; nuevo?: boolean }) {
  return (
    <div className={`space-y-1.5 ${nuevo ? "tpl-dicho-nuevo" : ""}`} data-testid="dicho-texto">
      <VerseBox text={d.text} refName={d.ref} />
      <p className="rounded-lg bg-white/80 px-2.5 py-1.5 text-[13px] leading-relaxed dark:bg-stone-900/40">
        <b>Quiere decir:</b> {d.quiere}
      </p>
    </div>
  );
}

/** Los dichos que ya tienes (y los que faltan, con su tema escondido). */
export function ListaDichos({ tengo, abierta: abiertaInicial = false }: { tengo: readonly string[]; abierta?: boolean }) {
  const [abierta, setAbierta] = useState(abiertaInicial);
  const [ver, setVer] = useState<string | null>(null);
  const set = new Set(tengo);
  const n = DICHOS.filter((d) => set.has(d.id)).length;
  const completa = n >= DICHOS.length;
  const visto = ver ? dichoPorId(ver) : undefined;
  return (
    <section className={`rounded-xl border p-2.5 ${completa ? "border-amber-400 bg-amber-50/60 dark:border-amber-700 dark:bg-amber-950/20" : "border-stone-200 dark:border-stone-700"}`} data-testid="album-dichos">
      <button type="button" className="flex w-full items-center gap-2 text-left" onClick={() => setAbierta(!abierta)} aria-expanded={abierta}>
        <span className="text-xl">🧓</span>
        <span className="min-w-0 flex-1">
          <span className="block font-bold">
            Los dichos de los ancianos {completa && <span className="text-[11px] text-amber-700 dark:text-amber-300">· 🏅 Oído de sabio</span>}
          </span>
          <span className="mt-1 block h-1.5 overflow-hidden rounded-full bg-stone-200 dark:bg-stone-700">
            <span className="block h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-600" style={{ width: `${Math.round((n / DICHOS.length) * 100)}%` }} />
          </span>
        </span>
        <span className="shrink-0 text-xs font-black tabular-nums" data-testid="album-dichos-n">
          {n}/{DICHOS.length}
        </span>
      </button>
      {abierta && (
        <div className="mt-2 space-y-1.5">
          <p className="text-[11px] text-stone-500">Cada día los ancianos de la puerta dicen uno. Si te falta alguno, tu mentor te lo puede enseñar al encontrarse en la ciudad.</p>
          <div className="flex flex-wrap gap-1">
            {DICHOS.map((d) => {
              const si = set.has(d.id);
              return (
                <button
                  key={d.id}
                  type="button"
                  disabled={!si}
                  onClick={() => setVer(ver === d.id ? null : d.id)}
                  aria-pressed={ver === d.id}
                  className={`rounded-lg px-1.5 py-0.5 text-[11px] ${si ? "bg-white font-semibold ring-1 ring-amber-300 dark:bg-stone-900 dark:ring-amber-800" : "bg-stone-100 text-stone-400 dark:bg-stone-800"}`}
                >
                  {si ? `📜 ${d.tema}` : "❔ …"}
                </button>
              );
            })}
          </div>
          {visto && <DichoCompleto d={visto} />}
          {completa && <VerseBox text={VERSO_OIDO_SABIO.text} refName={VERSO_OIDO_SABIO.ref} />}
        </div>
      )}
    </section>
  );
}

/** La ventana de los ancianos de la puerta (se abre al llegar a su círculo, junto a la puerta de la ciudad). */
export function DichosView() {
  const { city } = useContext(CiudadCtx);
  const [e, setE] = useState<DichosEstado | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [recien, setRecien] = useState<DichoEscuchado | null>(null);
  useEffect(() => {
    void pedir<DichosEstado>("/dichos").then((r) => {
      if (r.ok && r.data) setE(r.data);
      else setError(r.data?.message || "No se pudo hablar con los ancianos. Revisa tu conexión.");
    });
  }, []);
  const escuchar = async () => {
    setBusy(true);
    setError(null);
    const r = await pedir<DichoEscuchado>("/dichos/escuchar", {});
    setBusy(false);
    if (r.ok && r.data) {
      setE(r.data);
      setRecien(r.data);
      if (r.data.gozoTotal != null) city?.ponerGozo(r.data.gozoTotal);
      if (r.data.gozo > 0) city?.flotar(`+${r.data.gozo} de gozo`);
      gameStore.toast(r.data.nuevo ? `🧓 Un dicho nuevo en tu álbum: ${r.data.dicho.tema}. (${r.data.tengo.length} de ${r.data.total})` : `🧓 Los ancianos te repitieron el dicho ${delTema(r.data.dicho.tema)}.`, "gold");
    } else setError(r.data?.message || "No se pudo. Revisa tu conexión.");
  };
  const hoy = e?.hoy;
  return (
    <Card title="Los ancianos de la puerta" onClose={() => gameStore.close()} testid="ciudad-ancianos">
      <div className="space-y-3 p-4 text-sm">
        <p className="leading-relaxed">
          Booz subió a la puerta y se sentó allí, con diez ancianos de la ciudad (Rut 4:1-2). Los ancianos de Jerusalén se sientan aquí cada día y dicen un dicho de los sabios, el mismo para toda la ciudad.
        </p>
        {error && <p className="rounded-lg bg-rose-50 p-2 text-xs text-rose-800 dark:bg-rose-950/40 dark:text-rose-200">{error}</p>}
        {!e && !error && <Loader2 className="mx-auto h-5 w-5 animate-spin" />}
        {e && hoy && (
          <>
            <section className="space-y-2 rounded-xl border border-amber-300 bg-amber-50/70 p-3 dark:border-amber-800 dark:bg-amber-950/20" data-testid="dicho-hoy">
              <p className="text-[11px] font-black uppercase tracking-wider text-amber-800 dark:text-amber-300">El dicho de hoy · {hoy.tema}</p>
              {e.escuchado && hoy.dicho ? (
                <>
                  <DichoCompleto d={hoy.dicho} nuevo={!!recien} />
                  <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">✓ Ya está en tu álbum. Mañana los ancianos dirán otro.</p>
                </>
              ) : (
                <>
                  <p className="text-[13px]">Siéntate con ellos y escucha lo que los sabios dicen {delTema(hoy.tema)}.</p>
                  <Button className="w-full rounded-full bg-amber-500 font-bold text-amber-950 hover:bg-amber-400" disabled={busy} onClick={() => void escuchar()} data-testid="button-ancianos-escuchar">
                    {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : `Sentarse a escuchar (+${GOZO_DICHO} de gozo)`}
                  </Button>
                </>
              )}
            </section>
            <ListaDichos tengo={e.tengo} />
            <p className="text-[11px] text-stone-500">
              ¿Te falta alguno? Tu mentor te lo puede enseñar al encontrarse contigo en la ciudad.{" "}
              <button
                type="button"
                className="font-semibold text-violet-700 underline dark:text-violet-300"
                onClick={() => {
                  gameStore.close();
                  gameStore.push({ kind: "mentores" });
                }}
              >
                Ver los mentores
              </button>
            </p>
            <VerseBox text={VERSO_DICHOS.text} refName={VERSO_DICHOS.ref} />
            <p className="text-center font-serif text-[12px] italic text-stone-500">
              «{VERSO_PUERTA.text}» <span className="not-italic font-semibold">— {VERSO_PUERTA.ref}</span>
            </p>
          </>
        )}
        <Button variant="secondary" className="w-full" onClick={() => gameStore.close()} data-testid="button-ancianos-gracias">
          Gracias, padres
        </Button>
      </div>
    </Card>
  );
}
