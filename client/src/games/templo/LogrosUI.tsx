/**
 * Los logros de Jerusalén en línea, la pantalla (shared/logros-en-linea.ts): los tuyos con lo que
 * llevas, y los de un vecino (solo los que ya ganó) al visitar su casa o tocarlo en la calle.
 */
import { useEffect, useState } from "react";
import { Award } from "lucide-react";
import { Medalla } from "./medalla";
import { LOGROS_EN_LINEA, type LogrosDe } from "@shared/logros-en-linea";
import { Ico } from "./iconos";

async function traer(path: string): Promise<LogrosDe | null> {
  try {
    const res = await fetch(`/api/jerusalen${path}`, { credentials: "include", cache: "no-store" });
    return res.ok ? ((await res.json()) as LogrosDe) : null;
  } catch {
    return null;
  }
}

/** Mis logros: los ganados en color y los demás con lo que llevo. */
export function MisLogros() {
  const [l, setL] = useState<LogrosDe | null>(null);
  useEffect(() => {
    void traer("/logros").then(setL);
  }, []);
  if (!l) return null;
  const ganados = l.logros.filter((x) => x.tiene).length;
  return (
    <section className="space-y-2 rounded-xl border border-amber-200 p-3 dark:border-amber-900/60" data-testid="mis-logros">
      <p className="flex items-baseline justify-between font-black">
        <span className="flex items-center gap-1.5">
          <Award className="h-4 w-4 text-amber-600" /> Tus logros en Jerusalén
        </span>
        <span className="text-xs font-semibold text-stone-500">
          {ganados} de {l.logros.length}
        </span>
      </p>
      <ul className="grid gap-1.5 sm:grid-cols-2">
        {l.logros.map((x) => {
          const d = LOGROS_EN_LINEA[x.id];
          return (
            <li key={x.id} className={`flex items-center gap-2.5 rounded-xl px-2 py-1.5 text-xs ${x.tiene ? "bg-gradient-to-r from-amber-100 to-amber-50 shadow-sm dark:from-amber-900/40 dark:to-transparent" : "bg-stone-50 dark:bg-stone-800/50"}`} data-testid={`logro-${x.id}`}>
              <Medalla icono={d.icono} metal={x.tiene ? 3 : 0} progreso={x.pide ? x.lleva / x.pide : 0} size={40} />
              <span className="min-w-0 flex-1">
                <b>{d.nombre}</b>
                <span className="block text-[11px] text-stone-500">{x.tiene ? "¡Logrado! Tus vecinos lo ven." : `${d.como} (${x.lleva} de ${x.pide})`}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/** Los logros de un vecino (solo los que ganó): en su casa y en su ficha. */
export function LogrosDeOtro({ personajeId }: { personajeId: number }) {
  const [l, setL] = useState<LogrosDe | null>(null);
  useEffect(() => {
    let vivo = true;
    void traer(`/logros/de/${personajeId}`).then((d) => vivo && setL(d));
    return () => {
      vivo = false;
    };
  }, [personajeId]);
  const ganados = l?.logros.filter((x) => x.tiene) ?? [];
  if (!l || !ganados.length) return null;
  return (
    <div className="flex flex-wrap gap-1" data-testid="logros-de-otro">
      {ganados.map((x) => (
        <span key={x.id} className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-bold text-amber-900 dark:bg-amber-900/40 dark:text-amber-200" title={LOGROS_EN_LINEA[x.id].como}>
          <Ico e={LOGROS_EN_LINEA[x.id].icono ?? ""} /> {LOGROS_EN_LINEA[x.id].nombre}
        </span>
      ))}
    </div>
  );
}
