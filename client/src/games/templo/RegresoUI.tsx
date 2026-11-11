/**
 * «Mientras no estabas»: al volver a Jerusalén en línea después de dos días o más, lo que pasó en la ciudad (las fiestas
 * de esos días y si cambió la estación) y lo que viene. Todo sale del calendario (shared/anio.ts); la última visita se
 * guarda en este teléfono, por personaje.
 */
import { useEffect, useState } from "react";
import { diaEnJerusalen, loQuePaso, proximaFiestaGrande, type LoQuePaso } from "@shared/anio";

const CLAVE = "jerusalen-ultima-visita";
const minuscula = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

function leer(k: string): string | null {
  try {
    return localStorage.getItem(k);
  } catch {
    return null;
  }
}

function nombreEvento(e: LoQuePaso["eventos"][number]): string {
  if (e.evento.id === "reposo") return `${e.dias} ${e.dias === 1 ? "día" : "días"} de reposo`;
  if (e.evento.id === "lunaNueva") return e.dias === 1 ? "la luna nueva" : `${e.dias} lunas nuevas`;
  return `${e.evento.nombre}${e.dias > 1 ? ` (${e.dias} días)` : ""}`;
}

export function MientrasNoEstabas({ personajeId }: { personajeId?: number | null }) {
  const k = personajeId ? `${CLAVE}:${personajeId}` : null;
  const [hoy] = useState(() => diaEnJerusalen());
  // se lee una sola vez al llegar; la visita de hoy se guarda después (abajo)
  const [r] = useState<LoQuePaso | null>(() => {
    if (!k) return null;
    const antes = leer(k);
    if (!antes || !/^\d{4}-\d{2}-\d{2}$/.test(antes) || antes >= hoy.iso) return null;
    const p = loQuePaso(antes, hoy.iso);
    return p.dias >= 2 ? p : null;
  });
  useEffect(() => {
    if (!k) return;
    try {
      localStorage.setItem(k, hoy.iso);
    } catch {
      /* sin lugar en el teléfono: no pasa nada */
    }
  }, [k, hoy.iso]);
  if (!r) return null;
  const prox = proximaFiestaGrande();
  return (
    <section className="rounded-xl border border-sky-200/30 bg-sky-400/10 px-3 py-2.5 text-xs text-sky-50" data-testid="mientras-no-estabas">
      <p className="text-[11px] font-black uppercase tracking-[0.18em] text-sky-200">Mientras no estabas</p>
      <p className="mt-0.5">
        Tu última visita fue hace {r.dias} días{r.largo ? " (te contamos lo más reciente)" : ""}. En Jerusalén:
      </p>
      {r.eventos.length ? (
        <ul className="mt-1 flex flex-wrap gap-1">
          {r.eventos.map((e) => (
            <li key={e.evento.id} className="rounded-full bg-white/10 px-2 py-0.5 font-semibold">
              {e.evento.icono} {nombreEvento(e)}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-1 text-sky-100/80">Fueron días de servicio, sin fiestas.</p>
      )}
      {r.antes.id !== r.ahora.id && (
        <p className="mt-1.5">
          {r.ahora.icono} <b>Empezó {minuscula(r.ahora.nombre)}</b>: {r.ahora.texto}
        </p>
      )}
      <p className="mt-1.5 text-sky-100/85">
        Hoy: {hoy.hebreo.texto} · {hoy.estacion.icono} {hoy.estacion.nombre}
        {prox ? ` · ${prox.evento.icono} ${prox.evento.nombre} ${prox.enDias === 1 ? "mañana" : `en ${prox.enDias} días`}` : ""}.
      </p>
      <p className="mt-1 font-semibold text-amber-200">Entra a la ciudad: tu huerto, tus encargos y tu racha te esperan.</p>
    </section>
  );
}
