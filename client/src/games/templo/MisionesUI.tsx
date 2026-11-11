/**
 * Las misiones de Jerusalén en línea, la pantalla: los encargos del día, la ofrenda semanal del barrio
 * y la tabla de los barrios de la semana. Las cuentas las lleva el servidor (server/misiones.ts).
 */
import { useEffect, useState } from "react";
import { Loader2, Target } from "lucide-react";
import { FACTOR_JUNTOS, JUNTOS_DESDE, MERITO_BARRIO, MERITO_ENCARGO, MERITO_ENCARGOS_TODOS, type MisionesEstado } from "@shared/misiones";
import { gameStore } from "./store";
import { Card } from "./ui";
import { ParaHoy } from "./ParaHoyUI";
import { CaminoHoyBloque } from "./CaminoHoyUI";

export async function traerMisiones(): Promise<{ ok: boolean; data: (MisionesEstado & { message?: string }) | null }> {
  try {
    const res = await fetch("/api/jerusalen/misiones", { credentials: "include", cache: "no-store" });
    return { ok: res.ok, data: (await res.json().catch(() => null)) as (MisionesEstado & { message?: string }) | null };
  } catch {
    return { ok: false, data: null };
  }
}

function Barra({ valor, max, color = "bg-amber-500" }: { valor: number; max: number; color?: string }) {
  const p = Math.max(0, Math.min(100, Math.round((valor / Math.max(1, max)) * 100)));
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-stone-200 dark:bg-stone-800">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${p}%` }} />
    </div>
  );
}

export function MisionesModal() {
  const [m, setM] = useState<MisionesEstado | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    void traerMisiones().then((r) => {
      if (r.ok && r.data) setM(r.data);
      else setError(r.data?.message || "No se pudieron traer las misiones. Revisa tu conexión.");
    });
  }, []);
  return (
    <Card
      title={
        <span className="flex items-center gap-2">
          <Target className="h-5 w-5" /> Misiones
        </span>
      }
      onClose={() => gameStore.close()}
      testid="templo-misiones"
    >
      <div className="space-y-4 p-4 text-sm">
        {error && <p className="rounded-xl bg-red-50 p-2.5 text-red-900 dark:bg-red-950/30 dark:text-red-200">{error}</p>}
        {!m && !error && (
          <p className="flex items-center gap-2 text-stone-500">
            <Loader2 className="h-4 w-4 animate-spin" /> Buscando tus misiones…
          </p>
        )}
        {m && (
          <>
            <CaminoHoyBloque />
            <ParaHoy misiones={m} />
            <section className="space-y-2" data-testid="misiones-encargos">
              <p className="font-black">Encargos de hoy</p>
              <p className="text-xs text-stone-500">
                Cambian cada día. Cada uno da +{MERITO_ENCARGO} de mérito; los tres, +{MERITO_ENCARGOS_TODOS} más.
              </p>
              <ul className="space-y-2">
                {m.encargos.map((e) => (
                  <li key={e.id} className={`rounded-xl border p-2.5 ${e.hecho ? "border-emerald-300 bg-emerald-50/60 dark:border-emerald-800 dark:bg-emerald-950/20" : "border-stone-200 dark:border-stone-700"}`} data-testid={`encargo-${e.id}`}>
                    <p className="flex items-start gap-2 font-semibold">
                      <span className="text-lg leading-none">{e.icono}</span>
                      <span className="min-w-0 flex-1">{e.titulo}</span>
                      <span className="shrink-0 text-xs font-black">{e.hecho ? "✓" : `${e.progreso}/${e.meta}`}</span>
                    </p>
                    <div className="mt-1.5">
                      <Barra valor={e.progreso} max={e.meta} color={e.hecho ? "bg-emerald-500" : "bg-amber-500"} />
                    </div>
                  </li>
                ))}
              </ul>
              {m.todos && <p className="rounded-xl bg-emerald-50 p-2 text-center text-xs font-bold text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200">¡Cumpliste los tres encargos de hoy!</p>}
            </section>

            {m.barrio && (
              <section className="space-y-1.5 rounded-xl border border-amber-200 p-3 dark:border-amber-900/60" data-testid="misiones-barrio">
                <p className="font-black">La ofrenda de {m.barrio.nombre}</p>
                <p className="text-xs text-stone-500">
                  Entre todos los vecinos: {m.barrio.meta} deberes en la semana. Al cumplirla, quien aportó al menos {m.barrio.aporteMinimo} recibe +{MERITO_BARRIO} de mérito.
                </p>
                <Barra valor={m.barrio.deberes} max={m.barrio.meta} color={m.barrio.cumplida ? "bg-emerald-500" : "bg-sky-500"} />
                <p className="flex justify-between text-xs">
                  <span>
                    {m.barrio.deberes} de {m.barrio.meta} {m.barrio.cumplida ? "· ¡cumplida!" : ""}
                  </span>
                  <span className={m.barrio.miAporte >= m.barrio.aporteMinimo ? "font-bold text-emerald-700 dark:text-emerald-300" : ""}>Tu aporte: {m.barrio.miAporte}</span>
                </p>
              </section>
            )}

            <section className="space-y-1.5" data-testid="misiones-barrios">
              <p className="font-black">Los barrios esta semana</p>
              {m.barrios.length ? (
                <ol className="divide-y rounded-lg border text-sm dark:divide-stone-700 dark:border-stone-700">
                  {m.barrios.map((b, i) => (
                    <li key={b.n} className={`flex items-center gap-2 px-3 py-1.5 ${m.barrio?.n === b.n ? "bg-amber-50 font-semibold dark:bg-amber-950/30" : ""}`}>
                      <span className={`w-5 text-center font-black ${i === 0 ? "text-yellow-500" : i === 1 ? "text-slate-400" : i === 2 ? "text-amber-700" : "text-stone-400"}`}>{i + 1}</span>
                      <span className="min-w-0 flex-1 truncate">
                        {b.nombre} {b.cumplida ? "🎏" : ""}
                      </span>
                      <span className="text-[11px] text-stone-500">{b.vecinos} {b.vecinos === 1 ? "vecino" : "vecinos"}</span>
                      <span className="w-12 text-right tabular-nums">{b.deberes}</span>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="py-2 text-center text-xs text-stone-500">Ningún barrio ha servido todavía esta semana. ¡Que el tuyo sea el primero!</p>
              )}
            </section>

            <p className="rounded-xl bg-stone-50 p-2.5 text-xs dark:bg-stone-900/40">
              🤝 <b>Servir juntos:</b> con {JUNTOS_DESDE} o más sacerdotes en el templo a la vez, cada deber vale ×{FACTOR_JUNTOS.toLocaleString("es-419")}. Invita a tus vecinos a servir contigo.
            </p>
          </>
        )}
      </div>
    </Card>
  );
}
