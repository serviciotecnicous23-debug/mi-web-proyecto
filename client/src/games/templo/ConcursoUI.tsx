/**
 * El concurso bíblico de la semana, la pantalla (shared/concurso.ts): la tabla de la semana, los
 * campeones de la semana pasada y las 10 preguntas con su reloj. El servidor corrige y mide.
 */
import { useEffect, useRef, useState } from "react";
import { Loader2, Medal, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONCURSO_PREGUNTAS, CONCURSO_PREMIOS, CONCURSO_SEGUNDOS, VERSO_CONCURSO, type ConcursoEstado, type ConcursoRespuesta } from "@shared/concurso";
import { gameStore } from "./store";
import { Card, VerseBox } from "./ui";

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

export function ConcursoView() {
  const [e, setE] = useState<ConcursoEstado | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [res, setRes] = useState<ConcursoRespuesta | null>(null);
  const [quedan, setQuedan] = useState(CONCURSO_SEGUNDOS);
  const inicio = useRef(0);
  useEffect(() => {
    void pedir<ConcursoEstado>("/concurso").then((r) => (r.ok && r.data ? setE(r.data) : setError(r.data?.message || "No se pudo abrir el concurso.")));
  }, []);
  // el reloj de la pregunta (el servidor es quien manda; esto solo se muestra)
  const n = e?.pregunta?.n ?? 0;
  useEffect(() => {
    if (!e?.pregunta || res) return;
    // el reloj empieza en lo que dice el servidor (si se volvió a abrir, sigue donde iba)
    const desde = e.pregunta.segundos;
    inicio.current = Date.now();
    setQuedan(desde);
    const t = setInterval(() => setQuedan(Math.max(0, desde - Math.floor((Date.now() - inicio.current) / 1000))), 250);
    return () => clearInterval(t);
  }, [n, res, e?.pregunta]);
  const empezar = async () => {
    setBusy(true);
    setError(null);
    const r = await pedir<ConcursoEstado>("/concurso/empezar", {});
    setBusy(false);
    if (r.ok && r.data) setE(r.data);
    else setError(r.data?.message || "No se pudo empezar.");
  };
  const responder = async (opcion: string) => {
    setBusy(true);
    setError(null);
    const r = await pedir<ConcursoRespuesta>("/concurso/responder", { opcion });
    setBusy(false);
    if (r.ok && r.data) {
      setRes(r.data);
      if (r.data.estado.mio?.terminado) gameStore.toast(`Terminaste el concurso: ${r.data.estado.mio.aciertos} de ${CONCURSO_PREGUNTAS}`, "gold");
    } else setError(r.data?.message || "No se pudo enviar.");
  };
  /** La siguiente pregunta: el servidor la manda y su reloj empieza ahora. */
  const siguiente = async () => {
    setBusy(true);
    setError(null);
    const r = await pedir<ConcursoEstado>("/concurso/siguiente", {});
    setBusy(false);
    if (r.ok && r.data) {
      setE(r.data);
      setRes(null);
    } else setError(r.data?.message || "No se pudo pedir la pregunta.");
  };
  const seguir = () => {
    if (res?.estado.mio?.terminado) {
      setE(res.estado);
      setRes(null);
    } else void siguiente();
  };
  return (
    <Card
      title={
        <span className="flex items-center gap-2">
          <Medal className="h-5 w-5" /> Concurso bíblico de la semana
        </span>
      }
      onClose={() => gameStore.close()}
      testid="ciudad-concurso"
    >
      <div className="space-y-3 p-4 text-sm">
        {error && <p className="rounded-xl bg-amber-50 p-2.5 text-xs text-amber-900 dark:bg-amber-950/30 dark:text-amber-200">{error}</p>}
        {!e && !error && (
          <p className="flex items-center gap-2 text-stone-500">
            <Loader2 className="h-4 w-4 animate-spin" /> Preparando las preguntas…
          </p>
        )}
        {e && res ? (
          <div className="space-y-2" data-testid="concurso-resultado">
            <p className={`rounded-xl p-3 font-bold ${res.correcta ? "bg-emerald-50 text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200" : "bg-amber-50 text-amber-900 dark:bg-amber-950/30 dark:text-amber-200"}`}>
              {res.correcta ? "¡Correcto!" : !res.aTiempo ? `Se acabó el tiempo. Era: ${res.respuesta}` : `Era: ${res.respuesta}`}
            </p>
            <p className="text-[13px]">{res.explica}</p>
            <p className="text-xs font-semibold text-amber-800 dark:text-amber-300">{res.ref}</p>
            <Button className="w-full rounded-full bg-amber-500 font-bold text-amber-950 hover:bg-amber-400" disabled={busy} onClick={seguir} data-testid="concurso-seguir">
              {res.estado.mio?.terminado ? "Ver la tabla" : "Siguiente pregunta"}
            </Button>
          </div>
        ) : e?.pregunta ? (
          <div className="space-y-2" data-testid="concurso-pregunta">
            <p className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
              <span>
                Pregunta {e.pregunta.n} de {CONCURSO_PREGUNTAS} · {e.mio?.aciertos ?? 0} {(e.mio?.aciertos ?? 0) === 1 ? "acierto" : "aciertos"}
              </span>
              <span className={`flex items-center gap-1 ${quedan <= 5 ? "text-red-600" : ""}`}>
                <Timer className="h-3.5 w-3.5" /> {quedan} s
              </span>
            </p>
            <div className="h-1.5 overflow-hidden rounded-full bg-amber-100 dark:bg-amber-950/50">
              <div className="h-full rounded-full bg-amber-500 transition-all" style={{ width: `${(quedan / CONCURSO_SEGUNDOS) * 100}%` }} />
            </div>
            <p className="text-[15px] font-bold leading-snug">{e.pregunta.texto}</p>
            <div className="grid gap-1.5">
              {e.pregunta.opciones.map((o, i) => (
                <button
                  key={o}
                  type="button"
                  disabled={busy}
                  onClick={() => void responder(o)}
                  className="rounded-lg border border-stone-300 bg-white px-3 py-2 text-left text-sm hover:border-amber-400 dark:border-stone-700 dark:bg-stone-900"
                  data-testid={`concurso-op-${i}`}
                >
                  {o}
                </button>
              ))}
            </div>
          </div>
        ) : e ? (
          <>
            <p className="text-[13px] leading-relaxed">
              Las mismas {CONCURSO_PREGUNTAS} preguntas para todos esta semana, con {CONCURSO_SEGUNDOS} segundos cada una. Gana quien más acierta; si empatan, quien respondió más rápido. Al cerrar la semana, los tres primeros reciben {CONCURSO_PREMIOS.join(", ")} de gozo.
            </p>
            {e.campeones && (
              <p className="rounded-xl bg-amber-50 p-2.5 text-xs dark:bg-amber-950/30" data-testid="concurso-campeones">
                🏆 Campeones de la semana pasada: <b>{e.campeones.nombres.join(" · ")}</b>
              </p>
            )}
            {e.mio?.esperando ? (
              <Button className="w-full rounded-full bg-amber-500 font-bold text-amber-950 hover:bg-amber-400" disabled={busy} onClick={() => void siguiente()} data-testid="concurso-continuar">
                Seguir con la pregunta {e.mio.respondidas + 1} de {CONCURSO_PREGUNTAS}
              </Button>
            ) : e.mio?.terminado ? (
              <p className="rounded-xl bg-emerald-50 p-2.5 text-center font-bold text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200" data-testid="concurso-mio">
                Tu resultado: {e.mio.aciertos} de {CONCURSO_PREGUNTAS} en {e.mio.segundos} s. Vuelve el lunes para el concurso nuevo.
              </p>
            ) : (
              <Button className="w-full rounded-full bg-amber-500 font-bold text-amber-950 hover:bg-amber-400" disabled={busy} onClick={() => void empezar()} data-testid="concurso-empezar">
                {busy ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : null} Empezar el concurso
              </Button>
            )}
            <div>
              <p className="mb-1 font-black">
                La tabla de la semana <span className="text-xs font-semibold text-stone-500">· cierra en {e.diasRestantes} {e.diasRestantes === 1 ? "día" : "días"}</span>
              </p>
              {e.tabla.length ? (
                <ol className="space-y-1" data-testid="concurso-tabla">
                  {e.tabla.map((f) => (
                    <li key={f.puesto} className={`flex items-center gap-2 rounded-lg px-2 py-1 ${f.isMe ? "bg-amber-100 font-bold dark:bg-amber-900/40" : "bg-stone-50 dark:bg-stone-800/50"}`}>
                      <span className="w-5 text-center">{f.puesto <= 3 ? ["🥇", "🥈", "🥉"][f.puesto - 1] : f.puesto}</span>
                      <span className="min-w-0 flex-1 truncate">{f.nombre}</span>
                      <span className="text-xs tabular-nums">
                        {f.aciertos}/{CONCURSO_PREGUNTAS} · {f.segundos} s
                      </span>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-xs text-stone-500">Todavía nadie terminó esta semana. ¡Sé el primero!</p>
              )}
            </div>
            <VerseBox text={VERSO_CONCURSO.text} refName={VERSO_CONCURSO.ref} />
          </>
        ) : null}
      </div>
    </Card>
  );
}
