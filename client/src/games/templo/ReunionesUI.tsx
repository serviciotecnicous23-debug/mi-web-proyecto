/**
 * Las reuniones en las casas, la pantalla (shared/reuniones.ts): abrir tu casa para enseñar lo
 * que estudiaste, ir a la reunión de un vecino (su versículo, la idea clave y una pregunta) y la
 * lista de las reuniones de ahora en los anuncios de la plaza.
 */
import { GOZO_REUNION_MAESTRO } from "@shared/examenes-rango";
import { useEffect, useState } from "react";
import { BookOpen, Loader2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { REUNION_MINUTOS, REUNION_PREMIO, VERSO_REUNION, type ReunionesEstado, type ReunionLeccion, type ReunionRespuesta, type ReunionVista } from "@shared/reuniones";
import { nombreDeBarrio } from "@shared/ciudad";
import { avisarMisiones } from "./online";
import { gameStore } from "./store";
import { VerseBox } from "./ui";
import { Ico } from "./iconos";

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

const minutos = (s: number) => (s >= 60 ? `${Math.ceil(s / 60)} min` : `${s} s`);

/** En «Tu casa»: abrir la casa para enseñar una sección ya estudiada (una vez por día). */
export function ReunionCasa() {
  const [e, setE] = useState<ReunionesEstado | null>(null);
  const [elegida, setElegida] = useState(0);
  const [busy, setBusy] = useState(false);
  const [aviso, setAviso] = useState<string | null>(null);
  useEffect(() => {
    void pedir<ReunionesEstado>("/reuniones").then((r) => r.ok && r.data && setE(r.data));
  }, []);
  if (!e) return null;
  const abrir = async () => {
    const s = e.secciones[elegida];
    if (!s) return;
    setBusy(true);
    setAviso(null);
    const r = await pedir<ReunionesEstado & { misiones?: { titulo: string; premio: number; gozo?: number }[] }>("/reuniones", { estudio: s.estudio, seccion: s.seccion });
    setBusy(false);
    if (r.ok && r.data) {
      setE(r.data);
      avisarMisiones(r.data.misiones);
      gameStore.toast(`Abriste tu casa para estudiar «${s.titulo}»: tus vecinos ya lo ven`, "gold");
    } else setAviso(r.data?.message || "No se pudo abrir. Intenta de nuevo.");
  };
  const mia = e.mia;
  return (
    <section className="space-y-2 rounded-xl border border-violet-200 p-3 dark:border-violet-900/60" data-testid="casa-reunion">
      <p className="flex items-center gap-1.5 font-black">
        <BookOpen className="h-4 w-4 text-violet-600" /> Reúne a tus vecinos
      </p>
      <p className="text-[11px] text-stone-500">
        Abre tu casa {REUNION_MINUTOS} minutos para enseñar una sección que ya estudiaste. Cada vecino que venga y responda bien gana mérito y gozo, y tu casa gana honra (hasta {REUNION_PREMIO.maxPremiados} vecinos). Una vez por día.
      </p>
      {aviso && <p className="rounded-lg bg-amber-50 px-2 py-1 text-xs text-amber-900 dark:bg-amber-950/40 dark:text-amber-200">{aviso}</p>}
      {mia ? (
        mia.faltan > 0 ? (
          <p className="rounded-lg bg-violet-50 p-2 text-xs dark:bg-violet-950/30" data-testid="casa-reunion-activa">
            <Ico e="📖" /> Tu casa está abierta: «{mia.titulo}». Quedan {minutos(mia.faltan)} · {mia.asistentes} {mia.asistentes === 1 ? "vecino vino" : "vecinos vinieron"}.
          </p>
        ) : (
          <p className="rounded-lg bg-stone-100 p-2 text-xs dark:bg-stone-800" data-testid="casa-reunion-hecha">
            Hoy ya enseñaste «{mia.titulo}»: {mia.asistentes} {mia.asistentes === 1 ? "vecino vino" : "vecinos vinieron"}. Vuelve mañana.
          </p>
        )
      ) : e.secciones.length ? (
        <div className="space-y-1.5">
          <select
            className="w-full rounded-md border border-stone-300 bg-white px-2 py-1.5 text-xs dark:border-stone-700 dark:bg-stone-900"
            value={elegida}
            onChange={(ev) => setElegida(Number(ev.target.value))}
            aria-label="Qué vas a enseñar"
            data-testid="casa-reunion-seccion"
          >
            {e.secciones.map((s, i) => (
              <option key={`${s.estudio}:${s.seccion}`} value={i}>
                {s.titulo}
              </option>
            ))}
          </select>
          <Button className="w-full rounded-full bg-violet-600 font-bold text-white hover:bg-violet-500" disabled={busy} onClick={() => void abrir()} data-testid="casa-reunion-abrir">
            {busy ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : <Users className="mr-1 h-4 w-4" />} Abrir mi casa para enseñar
          </Button>
        </div>
      ) : (
        <p className="text-[11px] text-stone-500">Primero estudia una sección en la escuela de los profetas (botón del pergamino): lo que aprendes, lo puedes enseñar en tu casa.</p>
      )}
    </section>
  );
}

/** En la visita a la casa de un vecino: si tiene la casa abierta, su lección y la pregunta. */
export function ReunionVisita({ personajeId, alAcertar }: { personajeId: number; alAcertar?: () => void }) {
  const [leccion, setLeccion] = useState<ReunionLeccion | null>(null);
  const [res, setRes] = useState<ReunionRespuesta | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    let vivo = true;
    void pedir<ReunionesEstado>("/reuniones").then(async (r) => {
      const activa = r.ok && r.data ? r.data.activas.find((x) => x.anfitrionId === personajeId && x.faltan > 0) : undefined;
      if (!activa || !vivo) return;
      const l = await pedir<ReunionLeccion>(`/reuniones/${activa.id}`);
      if (vivo && l.ok && l.data) setLeccion(l.data);
    });
    return () => {
      vivo = false;
    };
  }, [personajeId]);
  if (!leccion) return null;
  const responder = async (opcion: number) => {
    setBusy(true);
    setError(null);
    const r = await pedir<ReunionRespuesta>(`/reuniones/${leccion.id}/responder`, { opcion });
    setBusy(false);
    if (r.ok && r.data) {
      setRes(r.data);
      if (r.data.correcta) {
        alAcertar?.();
        if (r.data.merito) gameStore.toast(`¡Bien respondido en la casa de ${leccion.anfitrion}! +${r.data.merito} de mérito · +${r.data.gozo} de gozo`, "gold");
        avisarMisiones(r.data.misiones);
      }
    } else setError(r.data?.message || "No se pudo enviar. Intenta de nuevo.");
  };
  const hecho = res ? { correcta: res.correcta, ok: res.ok, por: res.por } : leccion.resultado;
  return (
    <section className="space-y-2 rounded-xl border-2 border-violet-300 bg-violet-50/60 p-3 dark:border-violet-800 dark:bg-violet-950/20" data-testid="visita-reunion">
      <p className="text-xs font-black uppercase tracking-wider text-violet-700 dark:text-violet-300">
        <Ico e="📖" /> Reunión en esta casa · quedan {minutos(leccion.faltan)}
      </p>
      <p className="font-serif text-lg font-black">{leccion.titulo}</p>
      <p className="text-[11px] text-stone-500">De «{leccion.estudio}», enseñado por {leccion.anfitrion}.</p>
      {leccion.verso.text && <VerseBox text={leccion.verso.text} refName={leccion.verso.ref} />}
      <p className="rounded-lg bg-white/70 p-2 text-[13px] leading-relaxed dark:bg-stone-900/50">
        <b>La idea clave:</b> {leccion.clave}
      </p>
      <p className="font-bold">{leccion.pregunta.p}</p>
      <div className="grid gap-1.5">
        {leccion.pregunta.ops.map((o, i) => {
          // la correcta queda en verde; las demás, apagadas
          const estilo = !hecho
            ? "border-stone-300 bg-white dark:border-stone-700 dark:bg-stone-900"
            : i === hecho.ok
              ? "border-emerald-500 bg-emerald-50 font-bold text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-200"
              : "border-stone-300 bg-white opacity-50 dark:border-stone-700 dark:bg-stone-900";
          return (
            <button
              key={i}
              type="button"
              disabled={busy || !!hecho}
              onClick={() => void responder(i)}
              className={`rounded-lg border px-3 py-2 text-left text-sm ${estilo}`}
              data-testid={`visita-reunion-op-${i}`}
            >
              {o}
            </button>
          );
        })}
      </div>
      {error && <p className="text-xs text-red-700 dark:text-red-300">{error}</p>}
      {hecho && (
        <p className={`rounded-lg p-2 text-xs ${hecho.correcta ? "bg-emerald-50 text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200" : "bg-amber-50 text-amber-900 dark:bg-amber-950/30 dark:text-amber-200"}`} data-testid="visita-reunion-resultado">
          {hecho.correcta ? "¡Bien respondido! " : "No era esa. "}
          {hecho.por}
        </p>
      )}
    </section>
  );
}

/** En los anuncios de la plaza: las reuniones de ahora (primero las de tu barrio). */
export function ReunionesAnuncios({ alIr }: { alIr?: (r: ReunionVista) => void }) {
  const [e, setE] = useState<ReunionesEstado | null>(null);
  useEffect(() => {
    void pedir<ReunionesEstado>("/reuniones").then((r) => r.ok && r.data && setE(r.data));
  }, []);
  if (!e) return null;
  return (
    <section data-testid="anuncios-reuniones">
      <p className="mb-1 font-black">
        <BookOpen className="-mt-0.5 mr-1 inline h-4 w-4 text-violet-600" /> Reuniones en las casas
      </p>
      {e.activas.length ? (
        <ul className="space-y-1">
          {e.activas.map((r) => (
            <li key={r.id} className="flex items-center gap-2 rounded-lg bg-violet-50/70 px-2 py-1.5 text-xs dark:bg-violet-950/20">
              <span className="min-w-0 flex-1">
                <b>{r.anfitrion}</b> enseña «{r.titulo}» · {nombreDeBarrio(r.barrio)}, casa {r.parcela + 1} · quedan {minutos(r.faltan)}
                {r.maestro ? ` · 🎓 con examen de rango: +${GOZO_REUNION_MAESTRO} de gozo` : ""}
                {r.yaFui ? " · ya fuiste" : ""}
              </span>
              {alIr && !r.yaFui && (
                <Button size="sm" variant="secondary" className="h-7" onClick={() => alIr(r)} data-testid={`anuncios-reunion-ir-${r.id}`}>
                  Ir
                </Button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-xs text-stone-500">Ahora no hay ninguna. Estudia una sección y abre tu casa para enseñarla: tus vecinos lo verán aquí.</p>
      )}
      <p className="mt-1 text-[11px] italic text-stone-500">
        «{VERSO_REUNION.text.replace(/,$/, "…")}» ({VERSO_REUNION.ref})
      </p>
    </section>
  );
}
