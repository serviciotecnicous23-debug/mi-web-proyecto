/**
 * Las obras del barrio (shared/barrio-obras.ts, server/barrio-obras.ts), en «Tu barrio → Obras»: la obra de ahora con
 * lo juntado entre todos, dar gozo, lo que diste, las obras terminadas con lo que dan, y los constructores (los que más
 * dieron: van en la placa). «Levantémonos y edifiquemos» (Nehemías 2:18).
 */
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  APORTES_BARRIO, APORTE_MAXIMO_DIA, OBRAS_BARRIO, VERSO_OBRAS_BARRIO, obraBarrio, type AporteBarrioRespuesta, type ObrasBarrioEstado,
} from "@shared/barrio-obras";
import { gameStore } from "./store";
import { VerseBox, fmt } from "./ui";
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

/** La pestaña de las obras del barrio. `alGozo` avisa el gozo nuevo (para el marcador). */
export function ObrasDelBarrio({ alGozo }: { alGozo?: (gozo: number) => void }) {
  const [e, setE] = useState<ObrasBarrioEstado | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    void pedir<ObrasBarrioEstado>("/barrio/obras").then((r) => (r.ok && r.data ? setE(r.data) : setError(r.data?.message || "No se pudo abrir.")));
  }, []);
  const dar = async (gozo: number) => {
    setBusy(true);
    setError(null);
    const r = await pedir<AporteBarrioRespuesta>("/barrio/obras/aportar", { gozo });
    setBusy(false);
    if (r.ok && r.data) {
      setE(r.data);
      alGozo?.(r.data.gozoTotal);
      const t = r.data.terminada ? obraBarrio(r.data.terminada) : null;
      gameStore.toast(t ? `${t.icono} ¡Con tu ayuda se terminó ${t.nombre.toLowerCase()}! Todo el barrio lo disfruta.` : `🏗️ Diste ${r.data.dado} de gozo a la obra del barrio. ¡Gracias!`, "gold");
    } else setError(r.data?.message || "No se pudo dar.");
  };
  if (!e) {
    return error ? (
      <p className="rounded-lg bg-amber-50 p-2 text-xs dark:bg-amber-950/30">{error}</p>
    ) : (
      <div className="flex justify-center py-4">
        <Loader2 className="h-5 w-5 animate-spin text-amber-600" />
      </div>
    );
  }
  const actual = e.actual ? obraBarrio(e.actual.id) : null;
  const pct = e.actual ? Math.round((e.actual.aportado / e.actual.meta) * 100) : 100;
  const falta = e.actual ? e.actual.meta - e.actual.aportado : 0;
  return (
    <div className="space-y-3" data-testid="barrio-obras">
      {actual && e.actual ? (
        <section className="space-y-2 rounded-xl border border-amber-300 bg-amber-50/70 p-3 dark:border-amber-900/60 dark:bg-amber-950/20" data-testid="barrio-obra-actual">
          <p className="text-[11px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-300">La obra de ahora · {e.hechas.length + 1} de {OBRAS_BARRIO.length}</p>
          <p className="flex items-center gap-2 font-serif text-lg font-black">
            <span className="text-2xl"><Ico e={actual.icono ?? ""} /></span> {actual.nombre}
          </p>
          <p className="text-xs text-stone-600 dark:text-stone-300">{actual.detalle}</p>
          <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">✓ Para todo el barrio: {actual.ventaja}</p>
          <div className="h-3 overflow-hidden rounded-full bg-amber-100 dark:bg-amber-950/50">
            <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-600" style={{ width: `${Math.max(2, pct)}%` }} />
          </div>
          <p className="flex flex-wrap justify-between gap-1 text-xs tabular-nums">
            <span>
              <Gozo n={fmt(e.actual.aportado)} /> de {fmt(e.actual.meta)} · faltan {fmt(falta)}
            </span>
            <span className="text-stone-500">
              {e.actual.aportantes} {e.actual.aportantes === 1 ? "vecino dio" : "vecinos dieron"}
            </span>
          </p>
          <div className="flex flex-wrap gap-1.5">
            {APORTES_BARRIO.map((n) => (
              <Button key={n} size="sm" variant="secondary" disabled={busy || e.gozo < Math.min(n, falta) || e.mio.puedeHoy <= 0} onClick={() => void dar(n)} data-testid={`barrio-dar-${n}`}>
                Dar {n}
              </Button>
            ))}
            {falta <= Math.min(e.gozo, e.mio.puedeHoy) && falta > 0 && (
              <Button size="sm" className="bg-amber-500 font-bold text-amber-950 hover:bg-amber-400" disabled={busy} onClick={() => void dar(falta)} data-testid="barrio-dar-falta">
                ¡Terminarla! ({fmt(falta)})
              </Button>
            )}
          </div>
          <p className="text-[11px] text-stone-500">
            Tienes <Gozo n={fmt(e.gozo)} />. Diste {fmt(e.mio.enEsta)} a esta obra y {fmt(e.mio.total)} en todas. Se puede dar hasta {fmt(APORTE_MAXIMO_DIA)} por día (hoy te quedan {fmt(e.mio.puedeHoy)}), para que la obra sea de todos. Cada 10 de gozo suma un punto para la copa del barrio.
          </p>
          <p className="text-[11px] italic text-stone-500">
            «{actual.verso.text}» ({actual.verso.ref})
          </p>
        </section>
      ) : (
        <p className="rounded-xl bg-emerald-50 p-3 text-sm font-bold text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200">🎉 ¡Tu barrio terminó todas sus obras! Gloria a Dios por cada vecino que dio.</p>
      )}
      {error && <p className="rounded-lg bg-rose-50 p-2 text-xs text-rose-800 dark:bg-rose-950/40 dark:text-rose-200" data-testid="barrio-obras-error">{error}</p>}
      <section className="space-y-1.5">
        <p className="text-xs font-black uppercase tracking-wider text-amber-700 dark:text-amber-300">Las obras del barrio</p>
        <ol className="space-y-1">
          {OBRAS_BARRIO.map((o) => {
            const hecha = e.hechas.includes(o.id);
            const ahora = e.actual?.id === o.id;
            return (
              <li key={o.id} className={`flex items-start gap-2 rounded-lg px-2 py-1.5 text-xs ${hecha ? "bg-emerald-50 dark:bg-emerald-950/30" : ahora ? "bg-amber-100/70 dark:bg-amber-900/30" : "opacity-70"}`} data-testid={`barrio-obra-${o.id}`}>
                <span className="text-lg leading-none"><Ico e={o.icono ?? ""} /></span>
                <span className="min-w-0 flex-1">
                  <b>{o.nombre}</b> · <Gozo n={fmt(o.meta)} />
                  <br />
                  <span className="text-stone-600 dark:text-stone-300">{o.ventaja}</span>
                </span>
                <span className="shrink-0 font-bold">{hecha ? "✓" : ahora ? "🏗️" : "🔒"}</span>
              </li>
            );
          })}
        </ol>
      </section>
      <section className="space-y-1" data-testid="barrio-constructores">
        <p className="text-xs font-black uppercase tracking-wider text-amber-700 dark:text-amber-300"><Ico e="🪨" /> Los constructores del barrio</p>
        {e.constructores.length ? (
          <ol className="grid grid-cols-1 gap-0.5 text-xs sm:grid-cols-2">
            {e.constructores.map((c, i) => (
              <li key={`${c.nombre}-${i}`} className="flex justify-between gap-2 rounded bg-stone-50 px-2 py-0.5 dark:bg-stone-800/60">
                <span className="truncate">
                  {i + 1}. {c.nombre}
                </span>
                <span className="tabular-nums"><Gozo n={fmt(c.gozo)} /></span>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-[11px] text-stone-500">Todavía nadie dio: ¡sé el primero en la placa!</p>
        )}
        <p className="text-[11px] text-stone-500">Los que más dieron en todas las obras van en la placa de los constructores, a la entrada del barrio (Nehemías 3).</p>
      </section>
      <VerseBox text={VERSO_OBRAS_BARRIO.text} refName={VERSO_OBRAS_BARRIO.ref} />
    </div>
  );
}
