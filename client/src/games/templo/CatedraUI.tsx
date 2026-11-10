/**
 * Una cátedra de Jerusalén en línea (shared/catedras.ts): la enseñanza corta, la pregunta y, al responder,
 * la corrección con la cita. En la oración del profeta, responder cumple la oración; en la escuela, en la cámara
 * de los sacerdotes y en el palacio se aprenden varias seguidas (hasta el tope del día). El maestro enseña primero sobre lo que
 * se sirvió hace poco, y quien aprende sube de grado.
 */
import { useContext, useEffect, useRef, useState } from "react";
import { BookOpen, Check, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CATEDRAS, GRUPOS_CATEDRA, gradoCatedra, type CatedraArea, type CatedraRespuesta, type LeccionVista } from "@shared/catedras";
import { Card } from "./ui";
import { CiudadCtx } from "./CiudadUI";
import { gameStore } from "./store";
import { servidoReciente } from "./servido";

async function pedir<T>(path: string, body: unknown): Promise<{ ok: boolean; status: number; data: (T & { message?: string; agotada?: boolean }) | null }> {
  try {
    const r = await fetch(`/api/jerusalen${path}`, { method: "POST", credentials: "include", cache: "no-store", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body ?? {}) });
    return { ok: r.ok, status: r.status, data: (await r.json().catch(() => null)) as never };
  } catch {
    return { ok: false, status: 0, data: null };
  }
}

export function CatedraView({ area }: { area: CatedraArea }) {
  const { city, estado } = useContext(CiudadCtx);
  const meta = CATEDRAS[area];
  const personajeId = estado?.yo.personajeId;
  const [leccion, setLeccion] = useState<LeccionVista | null>(null);
  const [agotada, setAgotada] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [elegida, setElegida] = useState<string | null>(null);
  const [res, setRes] = useState<CatedraRespuesta | null>(null);
  const [enviando, setEnviando] = useState(false);
  /** Cuántas lecciones seguidas van (cada «Otra lección» pide una nueva). */
  const [vuelta, setVuelta] = useState(0);
  const [ganado, setGanado] = useState({ merito: 0, gozo: 0, bien: 0 });
  /** El comienzo de la ventana: con «Otra lección» se vuelve ahí para leer la enseñanza nueva. */
  const arriba = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let vivo = true;
    setLeccion(null);
    setAgotada(null);
    setError(null);
    setElegida(null);
    setRes(null);
    void pedir<LeccionVista>(`/catedra/${area}/leccion`, { pista: servidoReciente(personajeId) }).then((r) => {
      if (!vivo) return;
      if (r.ok && r.data?.agotada) setAgotada(r.data.message || "Por hoy ya aprendiste las lecciones de esta cátedra.");
      else if (r.ok && r.data) setLeccion(r.data);
      else setError(r.data?.message || "No se pudo traer la lección. Revisa tu conexión.");
      if (vuelta > 0) requestAnimationFrame(() => (arriba.current?.closest("[data-testid='catedra']") ?? arriba.current)?.scrollIntoView({ block: "start", behavior: "smooth" }));
    });
    return () => {
      vivo = false;
    };
  }, [area, vuelta, personajeId]);

  const responder = async (op: string) => {
    if (elegida || !leccion) return;
    setElegida(op);
    setEnviando(true);
    const r = await pedir<CatedraRespuesta>(`/catedra/${area}/respuesta`, { opcion: op });
    setEnviando(false);
    if (r.ok && r.data) {
      const d = r.data;
      setRes(d);
      if (d.correcta) setGanado((g) => ({ merito: g.merito + d.premio.merito, gozo: g.gozo + d.premio.gozo, bien: g.bien + 1 }));
      if (typeof d.gozoTotal === "number") city?.ponerGozo(d.gozoTotal);
      const antes = gradoCatedra(area, leccion.aprendidas, leccion.total);
      const ahora = gradoCatedra(area, d.aprendidas, d.total);
      if (ahora.n > antes.n) gameStore.toast(`🎓 Subiste de grado en ${meta.nombre.toLowerCase()}: ${ahora.nombre}`, "gold");
    } else {
      setError(r.data?.message || "No se pudo corregir. Intenta de nuevo.");
      // sin conexión se puede volver a intentar; si el servidor dijo que no, no
      if (r.status === 0) setElegida(null);
    }
  };

  // Al salir: en la oración, «Amén» la cumple (con lección respondida o porque ya aprendió las de hoy);
  // cerrar sin responder no cuenta y puede volver a arrodillarse.
  const salir = (cumplida: boolean) => {
    gameStore.close();
    if (area === "oracion") {
      if (cumplida) city?.terminarOracion();
      else city?.cancelarOracion();
    }
    if (ganado.bien > 0) gameStore.toast(`${meta.icono} Bien aprendido · +${ganado.merito} mérito · +${ganado.gozo} ✨ gozo`, "gold");
  };
  const cumplida = !!(res || agotada);
  const cuenta = res ?? leccion;
  const grado = cuenta ? gradoCatedra(area, cuenta.aprendidas, cuenta.total) : null;
  const otra = meta.seguidas && res && res.hoy < res.max;

  return (
    <Card
      title={
        <span className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" /> {meta.nombre}
        </span>
      }
      onClose={() => salir(cumplida)}
      testid="catedra"
    >
      <div ref={arriba} className="space-y-3 p-4 text-sm">
        {grado && cuenta && (
          <p className="flex flex-wrap items-center justify-between gap-1 text-[11px] font-bold text-stone-600 dark:text-stone-300" data-testid="catedra-grado">
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-amber-900 dark:bg-amber-900/40 dark:text-amber-200">
              🎓 {grado.nombre} · {cuenta.aprendidas} de {cuenta.total}
            </span>
            <span>
              Hoy: {cuenta.hoy} de {cuenta.max}
            </span>
          </p>
        )}
        {error && <p className="rounded-xl bg-red-50 p-2.5 text-red-900 dark:bg-red-950/30 dark:text-red-200">{error}</p>}
        {agotada && (
          <>
            <p className="rounded-xl bg-amber-50 p-3 dark:bg-amber-950/30" data-testid="catedra-agotada">
              {agotada}
            </p>
            <Button className="w-full rounded-full bg-amber-500 font-bold text-amber-950 hover:bg-amber-400" onClick={() => salir(true)} data-testid="catedra-amen">
              {meta.cierre}
            </Button>
          </>
        )}
        {!leccion && !agotada && !error && (
          <div className="flex justify-center py-6">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
        )}
        {leccion && (
          <>
            <p className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
              {meta.maestro} te enseña · {leccion.tema}
            </p>
            {leccion.sobre && GRUPOS_CATEDRA[leccion.sobre] && (
              <p className="rounded-xl bg-orange-50 px-3 py-1.5 text-[12px] font-semibold text-orange-900 dark:bg-orange-950/30 dark:text-orange-200" data-testid="catedra-sobre">
                🔥 Sobre lo que serviste hace poco: {GRUPOS_CATEDRA[leccion.sobre]}
              </p>
            )}
            <p className="rounded-xl bg-amber-50 p-3 font-serif text-[15px] leading-snug dark:bg-amber-950/30" data-testid="catedra-ensena">
              {leccion.ensena}
            </p>
            <p className="font-bold leading-snug" data-testid="catedra-pregunta">
              {leccion.pregunta}
            </p>
            <div className="grid gap-1.5">
              {leccion.opciones.map((o) => {
                const marca = !res ? (elegida === o ? "elegida" : "") : o === res.respuesta ? "bien" : elegida === o ? "mal" : "apagada";
                return (
                  <button
                    key={o}
                    type="button"
                    disabled={!!elegida}
                    onClick={() => void responder(o)}
                    className={`rounded-xl border-2 px-3 py-2 text-left font-semibold ${
                      marca === "bien"
                        ? "border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200"
                        : marca === "mal"
                          ? "border-red-400 bg-red-50 text-red-900 dark:bg-red-950/30 dark:text-red-200"
                          : marca === "elegida"
                            ? "border-amber-400 bg-amber-50 dark:bg-amber-950/30"
                            : marca === "apagada"
                              ? "border-stone-200 opacity-50 dark:border-stone-700"
                              : "border-amber-200 bg-white hover:border-amber-400 dark:border-amber-900 dark:bg-transparent"
                    }`}
                    data-testid="catedra-opcion"
                  >
                    {o}
                  </button>
                );
              })}
            </div>
            {enviando && <Loader2 className="mx-auto h-4 w-4 animate-spin" />}
            {res && (
              <div className="space-y-2" data-testid="catedra-resultado">
                <p className={`flex items-start gap-1.5 rounded-xl p-2.5 ${res.correcta ? "bg-emerald-50 text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200" : "bg-amber-50 dark:bg-amber-950/30"}`}>
                  {res.correcta ? <Check className="mt-0.5 h-4 w-4 shrink-0" /> : <X className="mt-0.5 h-4 w-4 shrink-0" />}
                  <span>
                    {res.correcta ? `¡Bien! +${res.premio.merito} mérito · +${res.premio.gozo} ✨ gozo. ` : `Era: «${res.respuesta}». `}
                    {res.explica} <span className="text-stone-500">({res.ref})</span>
                  </span>
                </p>
                {otra && (
                  <Button className="w-full rounded-full bg-orange-600 font-bold text-white hover:bg-orange-500" onClick={() => setVuelta((v) => v + 1)} data-testid="catedra-otra">
                    📜 Otra lección
                  </Button>
                )}
                <Button
                  className={`w-full rounded-full font-bold ${otra ? "bg-stone-200 text-stone-800 hover:bg-stone-300 dark:bg-stone-700 dark:text-stone-100" : "bg-amber-500 text-amber-950 hover:bg-amber-400"}`}
                  onClick={() => salir(true)}
                  data-testid="catedra-amen"
                >
                  {meta.cierre}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </Card>
  );
}
