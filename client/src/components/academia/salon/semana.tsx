// La semana de estudio del salón: los minutos de cada uno de los últimos 7 días (barras de un solo tono, con su valor al
// pasar o tocar), el avance hacia la meta de la semana y los días seguidos. La meta la elige el alumno.
import { useState } from "react";
import { Flame, Target } from "lucide-react";
import { META_ESTUDIO, type EstudioVista } from "@shared/academia-salon";

const diaCorto = (dia: string) => new Date(`${dia}T12:00:00Z`).toLocaleDateString("es", { weekday: "short", timeZone: "UTC" }).replace(".", "");
const diaLargo = (dia: string) => new Date(`${dia}T12:00:00Z`).toLocaleDateString("es", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" });
const horas = (m: number) => (m >= 60 ? `${Math.floor(m / 60)} h${m % 60 ? ` ${m % 60} min` : ""}` : `${m} min`);

export function SemanaEstudio({ e, alCambiarMeta }: { e: EstudioVista; alCambiarMeta: (meta: number) => void }) {
  const [sobre, setSobre] = useState<number | null>(null);
  const tope = Math.max(...e.semana.map((d) => d.minutos), Math.ceil(e.meta / 7), 10);
  const avance = Math.min(1, e.totalSemana / Math.max(1, e.meta));
  return (
    <div data-testid="salon-semana">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="text-sm text-muted-foreground">Esta semana</p>
          <p className="font-display text-2xl font-bold tabular-nums">
            {horas(e.totalSemana)} <span className="text-base font-normal text-muted-foreground">de {horas(e.meta)}</span>
          </p>
        </div>
        {e.racha > 0 && (
          <p className="text-sm flex items-center gap-1 text-orange-700 dark:text-orange-300" data-testid="salon-racha-estudio">
            <Flame className="w-4 h-4" /> {e.racha} {e.racha === 1 ? "día" : "días"} seguidos
          </p>
        )}
      </div>
      <div className="mt-2 h-2.5 rounded-full bg-orange-500/15 overflow-hidden" role="progressbar" aria-valuemin={0} aria-valuemax={e.meta} aria-valuenow={e.totalSemana} aria-label="Avance hacia la meta de la semana">
        <div className="h-full rounded-full bg-orange-500 transition-all" style={{ width: `${avance * 100}%` }} />
      </div>

      {/* las barras: una por día; el valor aparece al pasar o tocar */}
      <div className="mt-4 relative">
        <div className="flex items-end gap-[2px] h-28" aria-hidden="true">
          {e.semana.map((d, i) => {
            const hoy = i === e.semana.length - 1;
            return (
              <button
                key={d.dia}
                type="button"
                className="flex-1 h-full flex flex-col justify-end items-center group focus:outline-none"
                onMouseEnter={() => setSobre(i)}
                onMouseLeave={() => setSobre(null)}
                onFocus={() => setSobre(i)}
                onBlur={() => setSobre(null)}
                onClick={() => setSobre(sobre === i ? null : i)}
                tabIndex={-1}
              >
                {sobre === i && (
                  <span className="absolute -top-1 -translate-y-full text-xs rounded-md bg-popover border shadow px-2 py-1 whitespace-nowrap z-10">
                    {diaLargo(d.dia)}: <strong>{horas(d.minutos)}</strong>
                  </span>
                )}
                <span
                  className={`w-full max-w-10 rounded-t ${hoy ? "bg-orange-500" : "bg-orange-400/60 dark:bg-orange-400/50"} ${sobre === i ? "ring-2 ring-orange-600/60" : ""}`}
                  style={{ height: d.minutos ? `${Math.max(4, (d.minutos / tope) * 100)}%` : "2px", opacity: d.minutos ? 1 : 0.35 }}
                />
              </button>
            );
          })}
        </div>
        <div className="border-t border-border/70" />
        <div className="flex gap-[2px] mt-1" aria-hidden="true">
          {e.semana.map((d, i) => (
            <span key={d.dia} className={`flex-1 text-center text-[11px] capitalize ${i === e.semana.length - 1 ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
              {i === e.semana.length - 1 ? "Hoy" : diaCorto(d.dia)}
            </span>
          ))}
        </div>
        {/* la misma información en texto, para los lectores de pantalla */}
        <ul className="sr-only">
          {e.semana.map((d) => (
            <li key={d.dia}>{diaLargo(d.dia)}: {horas(d.minutos)}</li>
          ))}
        </ul>
      </div>

      <label className="mt-4 flex items-center gap-2 text-sm">
        <Target className="w-4 h-4 text-orange-600" /> Mi meta por semana:
        <select
          value={e.meta}
          onChange={(ev) => alCambiarMeta(Number(ev.target.value))}
          className="rounded-lg border bg-background px-2 py-1 text-sm"
          data-testid="salon-meta"
        >
          {[...new Set([...META_ESTUDIO.opciones, e.meta])].sort((a, b) => a - b).map((m) => (
            <option key={m} value={m}>{horas(m)}</option>
          ))}
        </select>
      </label>
    </div>
  );
}
