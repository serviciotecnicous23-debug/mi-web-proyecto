/**
 * «El calendario de Jerusalén» (shared/anio.ts): hoy (la fecha hebrea real y la civil), la estación del año con lo que
 * cambia en el huerto, en el mercado y en el cielo, los eventos de hoy (con su hora especial), lo que viene con su
 * fecha y la rueda de las seis estaciones de la tierra de Israel. Todo se calcula con el calendario real.
 */
import { useEffect, useState } from "react";
import { CalendarDays, CloudRain, Sun } from "lucide-react";
import { ESTACIONES, VERSO_DEL_ANIO, bonoDelMomento, diaEnJerusalen, proximosEventos, type DiaJerusalen, type EventoProximo } from "@shared/anio";
import { MESES } from "@shared/calendario";
import { gameStore } from "./store";
import { Card, VerseBox } from "./ui";

const BIEN: Record<string, string> = { harina: "la harina", aceite: "el aceite", corderos: "los corderos" };
const SEMILLA: Record<string, string> = { trigo: "el trigo", cebada: "la cebada", olivo: "los olivos" };
const nombreMes = (n: number) => (n === 13 ? "Adar segundo" : MESES[n - 1]?.nombre ?? "");

function cuando(p: EventoProximo): string {
  return p.enDias === 1 ? "mañana" : `en ${p.enDias} días`;
}

export function CalendarioView() {
  const [d, setD] = useState<DiaJerusalen>(() => diaEnJerusalen());
  const [vienen, setVienen] = useState<EventoProximo[]>(() => proximosEventos(Date.now(), 8));
  useEffect(() => {
    // si la ventana queda abierta al cambiar el día (o la hora especial), se pone al día
    const id = window.setInterval(() => {
      setD(diaEnJerusalen());
      setVienen(proximosEventos(Date.now(), 8));
    }, 60_000);
    return () => window.clearInterval(id);
  }, []);
  const b = bonoDelMomento(Date.now(), d);
  const e = d.estacion;
  const sube = Object.entries(e.precios).filter(([, f]) => (f ?? 1) > 1).map(([k]) => BIEN[k]);
  const baja = Object.entries(e.precios).filter(([, f]) => (f ?? 1) < 1).map(([k]) => BIEN[k]);
  return (
    <Card
      title={
        <span className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5" /> El calendario de Jerusalén
        </span>
      }
      onClose={() => gameStore.close()}
      testid="calendario"
      wide
    >
      <div className="space-y-3 p-4 text-sm">
        <section className="rounded-2xl bg-gradient-to-br from-indigo-950 via-purple-950 to-amber-950 p-4 text-white" data-testid="calendario-hoy">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-300/90">Hoy en Jerusalén</p>
          <p className="mt-0.5 font-serif text-2xl font-black text-amber-100">{d.hebreo.texto}</p>
          <p className="text-xs text-white/75">
            {d.civilTexto} · año {d.hebreo.anio} del calendario hebreo
          </p>
          <p className="mt-2 flex items-center gap-2 font-bold">
            <span className="text-xl">{e.icono}</span> {e.nombre}
            <span className="ml-auto flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-semibold">
              {d.llueve ? <CloudRain className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />} {d.llueve ? "hoy llueve" : "hoy no llueve"}
            </span>
          </p>
          <p className="mt-1 text-[13px] leading-snug text-white/85">{e.texto}</p>
        </section>

        <section className="grid gap-2 sm:grid-cols-3" data-testid="calendario-efectos">
          <div className="rounded-xl border border-stone-200 p-2.5 dark:border-stone-700">
            <p className="text-[11px] font-bold uppercase tracking-wider text-stone-500">🌱 En tu huerto</p>
            <p className="mt-0.5 leading-snug">
              {e.cultivo ? <>Crece más rápido {SEMILLA[e.cultivo]} (un cuarto menos de espera).</> : e.lento > 1 ? <>Con el frío, todo tarda un poco más.</> : <>Todo crece a su ritmo.</>}
              {d.llueve ? " Hoy llueve: lo que siembres hoy queda regado." : e.lluvia === 0 ? " No llueve: hay que regar." : ""}
            </p>
          </div>
          <div className="rounded-xl border border-stone-200 p-2.5 dark:border-stone-700">
            <p className="text-[11px] font-bold uppercase tracking-wider text-stone-500">⚖️ En el mercado</p>
            <p className="mt-0.5 leading-snug">
              {sube.length ? <>Los mercaderes buscan más {sube.join(" y ")}. </> : null}
              {baja.length ? <>Hay abundancia de {baja.join(" y ")}: la buscan menos.</> : null}
              {!sube.length && !baja.length ? "Los mercaderes buscan de todo por igual." : null}
            </p>
          </div>
          <div className="rounded-xl border border-stone-200 p-2.5 dark:border-stone-700">
            <p className="text-[11px] font-bold uppercase tracking-wider text-stone-500">🔥 En el templo</p>
            <p className="mt-0.5 leading-snug">
              {b.merito > 1 ? <>El servicio vale ×{b.merito.toLocaleString("es-419")}{b.hora ? ` (${b.hora})` : ""}.</> : <>Un día de servicio normal.</>}
              {b.gozo > 1 ? <> Los encargos dan ×{b.gozo.toLocaleString("es-419")} de gozo.</> : null}
            </p>
          </div>
        </section>

        {d.eventos.length > 0 && (
          <section className="space-y-2" data-testid="calendario-eventos">
            <p className="text-[11px] font-bold uppercase tracking-wider text-stone-500">Hoy se celebra</p>
            {d.eventos.map((a) => (
              <div key={a.evento.id} className="space-y-1.5 rounded-xl bg-amber-50 p-3 dark:bg-amber-950/30">
                <p className="font-bold">
                  {a.evento.icono} {a.evento.nombre}
                  {a.de > 1 ? <span className="ml-1 text-xs font-semibold text-stone-500">· día {a.dia} de {a.de}</span> : null}
                </p>
                <p className="leading-snug">{a.evento.efecto}</p>
                <VerseBox text={a.evento.verso.text} refName={a.evento.verso.ref} />
                <p className="text-xs italic text-stone-600 dark:text-stone-300">{a.evento.hoy}</p>
              </div>
            ))}
          </section>
        )}

        <section className="space-y-1.5" data-testid="calendario-vienen">
          <p className="text-[11px] font-bold uppercase tracking-wider text-stone-500">Lo que viene</p>
          <ul className="divide-y divide-stone-200 rounded-xl border border-stone-200 dark:divide-stone-700 dark:border-stone-700">
            {vienen.map((p) => (
              <li key={`${p.evento.id}-${p.iso}`} className="flex items-center gap-2 px-3 py-2">
                <span className="w-6 shrink-0 text-center text-lg">{p.evento.icono}</span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold">{p.evento.nombre}</span>
                  <span className="block text-[11px] text-stone-500">{p.texto}</span>
                </span>
                <span className="shrink-0 rounded-full bg-stone-100 px-2 py-0.5 text-[11px] font-bold text-stone-600 dark:bg-stone-800 dark:text-stone-300">{cuando(p)}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-1.5" data-testid="calendario-estaciones">
          <p className="text-[11px] font-bold uppercase tracking-wider text-stone-500">Las estaciones del año</p>
          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
            {ESTACIONES.map((x) => (
              <div key={x.id} className={`rounded-xl p-2 text-xs ${x.id === e.id ? "bg-amber-100 ring-2 ring-amber-400 dark:bg-amber-900/40" : "bg-stone-50 dark:bg-stone-800/60"}`}>
                <p className="font-bold">
                  {x.icono} {x.nombre}
                </p>
                <p className="text-[11px] text-stone-500">{x.meses.filter((m) => m !== 13).map(nombreMes).join(", ")}</p>
              </div>
            ))}
          </div>
          <VerseBox text={VERSO_DEL_ANIO.text} refName={VERSO_DEL_ANIO.ref} />
        </section>
      </div>
    </Card>
  );
}

/** La estación en el huerto (MercadoUI): qué crece más rápido y si hoy la lluvia riega lo que se siembra. */
export function EstacionDelHuerto() {
  const d = diaEnJerusalen();
  const e = d.estacion;
  const sem = e.cultivo ? SEMILLA[e.cultivo] : null;
  return (
    <button
      type="button"
      className="w-full rounded-lg bg-sky-50 px-2 py-1.5 text-left text-[11px] leading-snug text-sky-900 dark:bg-sky-950/30 dark:text-sky-200"
      onClick={() => gameStore.push({ kind: "calendario" })}
      data-testid="huerto-estacion"
    >
      {d.llueve ? "🌧️" : e.icono} <b>{e.nombre}</b>: {sem ? `crece más rápido ${sem} (un cuarto menos de espera)` : e.lento > 1 ? "con el frío, todo tarda un poco más" : "todo crece a su ritmo"}.
      {d.llueve ? " Hoy llueve: lo que siembres hoy queda regado." : e.lluvia === 0 ? " En esta estación no llueve: riega tu huerto." : ""} <span className="font-bold underline">Ver el calendario</span>
    </button>
  );
}
