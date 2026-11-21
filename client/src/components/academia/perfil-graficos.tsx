// Los gráficos del perfil del alumno (components/academia/perfil-alumno.tsx):
// - las barras de cada semana: una sola serie sobre la misma base, puntas redondeadas y la meta como línea punteada;
// - el calendario de estudio de las últimas 12 semanas: un solo tono, de claro a oscuro, con su leyenda;
// - los medidores de acierto.
// Cada gráfico dice su cifra al pasar el puntero o al recorrerlo con el teclado, y tiene su texto para quien no lo ve.
// Los colores siguen la guía del panel (components/academia/seguimiento.tsx): naranja 600 en claro y en oscuro, y el
// texto siempre en el color del texto.
import { useState } from "react";
import type { DiaEstudio } from "@shared/academia-perfil";

export const fechaCorta = (dia: string) => new Date(`${dia}T12:00:00Z`).toLocaleDateString("es", { day: "numeric", month: "short", timeZone: "UTC" });

/** Barras de las últimas semanas (la última es la actual, que todavía no termina). */
export function BarrasSemanas<T extends { inicio: string }>({ titulo, semanas, valor, unidad, meta, testId, compacto }: {
  titulo: string;
  semanas: T[];
  valor: (s: T) => number;
  unidad: (n: number) => string;
  meta?: number;
  testId?: string;
  /** Más bajo (para el inicio del panel en el teléfono). */
  compacto?: boolean;
}) {
  const [activa, setActiva] = useState<number | null>(null);
  const valores = semanas.map(valor);
  const tope = Math.max(1, meta ?? 0, ...valores);
  const total = valores.reduce((a, b) => a + b, 0);
  const texto = (i: number) => `Semana del ${fechaCorta(semanas[i].inicio)}${i === semanas.length - 1 ? " (esta semana)" : ""}: ${unidad(valores[i])}`;
  return (
    <section className={`glass-card ${compacto ? "p-4" : "p-5"}`} data-testid={testId}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 mb-3">
        <h3 className={compacto ? "font-semibold text-sm" : "font-semibold"}>{titulo}</h3>
        <span className="text-xs text-muted-foreground" aria-live="polite">{activa != null ? texto(activa) : `En 12 semanas: ${unidad(total)}`}</span>
      </div>
      <div className={`relative ${compacto ? "h-20" : "h-36"}`}>
        {meta ? (
          <div className="absolute inset-x-0 border-t border-dashed border-foreground/40 pointer-events-none z-10" style={{ bottom: `${(100 * meta) / tope}%` }} aria-hidden="true">
            <span className="absolute right-0 -top-[18px] rounded bg-background/80 px-1 text-[11px] text-muted-foreground">Meta: {unidad(meta)}</span>
          </div>
        ) : null}
        <ul className="absolute inset-0 flex items-end gap-[2px] border-b border-border" aria-label={titulo}>
          {semanas.map((s, i) => (
            <li key={s.inicio} className="flex-1 h-full">
              <button
                type="button"
                className="w-full h-full flex items-end rounded-sm focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-orange-500"
                onMouseEnter={() => setActiva(i)}
                onMouseLeave={() => setActiva(null)}
                onFocus={() => setActiva(i)}
                onBlur={() => setActiva(null)}
                aria-label={texto(i)}
                title={texto(i)}
              >
                <span
                  className={`block w-full rounded-t-[4px] bg-orange-600 transition-opacity ${activa != null && activa !== i ? "opacity-50" : ""}`}
                  style={{ height: valores[i] > 0 ? `${Math.max(3, (100 * valores[i]) / tope)}%` : "0" }}
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-between text-[11px] text-muted-foreground mt-1.5" aria-hidden="true">
        <span>{fechaCorta(semanas[0].inicio)}</span>
        <span>Esta semana</span>
      </div>
    </section>
  );
}

/** Los tonos del calendario: sin estudio, menos de 15, de 15 a 29, de 30 a 44 y 45 minutos o más. */
const TONOS = ["bg-muted", "bg-orange-200 dark:bg-orange-900", "bg-orange-300 dark:bg-orange-700", "bg-orange-500 dark:bg-orange-500", "bg-orange-700 dark:bg-orange-300"];
const TRAMOS = ["Sin estudio", "Menos de 15 min", "15 a 29 min", "30 a 44 min", "45 min o más"];
const tramo = (m: number) => (m <= 0 ? 0 : m < 15 ? 1 : m < 30 ? 2 : m < 45 ? 3 : 4);
const DIAS_SEMANA = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

/** El calendario de los últimos días: una columna por semana (de lunes a domingo) y un cuadro por día. */
export function CalendarioEstudio({ dias }: { dias: DiaEstudio[] }) {
  const [activo, setActivo] = useState<DiaEstudio | null>(null);
  if (!dias.length) return null;
  // el día de la semana del primero (0 = lunes) para empezar la primera columna en lunes
  const dow = (dia: string) => (new Date(`${dia}T12:00:00Z`).getUTCDay() + 6) % 7;
  const celdas: (DiaEstudio | null)[] = [...Array(dow(dias[0].dia)).fill(null), ...dias];
  while (celdas.length % 7) celdas.push(null);
  const semanas = Array.from({ length: celdas.length / 7 }, (_, i) => celdas.slice(i * 7, i * 7 + 7));
  const conEstudio = dias.filter((d) => d.minutos > 0).length;
  const texto = (d: DiaEstudio) => `${new Date(`${d.dia}T12:00:00Z`).toLocaleDateString("es", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" })}: ${d.minutos ? `${d.minutos} minutos` : "sin estudio"}`;
  return (
    <section className="glass-card p-5" data-testid="perfil-calendario">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 mb-3">
        <h3 className="font-semibold">Días de estudio</h3>
        <span className="text-xs text-muted-foreground" aria-live="polite">{activo ? texto(activo) : `${conEstudio} de los últimos ${dias.length} días con estudio`}</span>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        <div className="grid grid-rows-7 gap-[3px] text-[10px] text-muted-foreground pr-1" aria-hidden="true">
          {DIAS_SEMANA.map((d, i) => <span key={d} className="h-[14px] leading-[14px]">{i % 2 === 0 ? d : ""}</span>)}
        </div>
        <div className="flex gap-[3px]" role="grid" aria-label={`Días de estudio de las últimas ${semanas.length} semanas`}>
          {semanas.map((sem, i) => (
            <div key={i} className="grid grid-rows-7 gap-[3px]" role="row">
              {sem.map((d, j) =>
                d ? (
                  <button
                    key={d.dia}
                    type="button"
                    role="gridcell"
                    className={`h-[14px] w-[14px] rounded-[3px] ${TONOS[tramo(d.minutos)]} focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-orange-500`}
                    onMouseEnter={() => setActivo(d)}
                    onMouseLeave={() => setActivo(null)}
                    onFocus={() => setActivo(d)}
                    onBlur={() => setActivo(null)}
                    aria-label={texto(d)}
                    title={texto(d)}
                  />
                ) : (
                  <span key={`v${j}`} className="h-[14px] w-[14px]" aria-hidden="true" />
                ),
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-3 text-[11px] text-muted-foreground">
        {TONOS.map((t, i) => (
          <span key={t} className="inline-flex items-center gap-1.5"><span className={`inline-block h-3 w-3 rounded-[3px] ${t}`} aria-hidden="true" />{TRAMOS[i]}</span>
        ))}
      </div>
    </section>
  );
}

/** Un medidor de acierto con su porcentaje y de cuántas respuestas sale. */
export function MedidorAcierto({ nombre, detalle, pct, bien, total }: { nombre: string; detalle?: string; pct: number; bien: number; total: number }) {
  return (
    <li className="grid grid-cols-[minmax(0,1fr)_7rem_3.5rem] sm:grid-cols-[minmax(0,1fr)_10rem_3.5rem] items-center gap-3 text-sm" title={`${nombre}: ${bien} de ${total} bien (${pct} %)`}>
      <span className="min-w-0">
        <span className="block truncate">{nombre}</span>
        {detalle && <span className="block text-xs text-muted-foreground truncate">{detalle}</span>}
      </span>
      <span className="block h-2.5 w-full rounded-r-[4px] bg-orange-300 dark:bg-orange-900" role="img" aria-label={`${pct} % bien, de ${total} respuestas`}>
        {pct > 0 && <span className="block h-2.5 rounded-r-[4px] bg-orange-600" style={{ width: `${pct}%` }} />}
      </span>
      <span className="tabular-nums text-right">{pct} %<span className="block text-[11px] text-muted-foreground">de {total}</span></span>
    </li>
  );
}
