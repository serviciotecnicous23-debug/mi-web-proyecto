/**
 * Una cátedra de Jerusalén en línea (shared/catedras.ts): la enseñanza corta, la pregunta y, al responder,
 * la corrección con la cita. En la oración del profeta, responder cumple la oración.
 */
import { useContext, useEffect, useState } from "react";
import { BookOpen, Check, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CATEDRAS, type CatedraArea, type CatedraRespuesta, type LeccionVista } from "@shared/catedras";
import { Card } from "./ui";
import { CiudadCtx } from "./CiudadUI";
import { gameStore } from "./store";

async function pedir<T>(path: string, body: unknown): Promise<{ ok: boolean; status: number; data: (T & { message?: string; agotada?: boolean }) | null }> {
  try {
    const r = await fetch(`/api/jerusalen${path}`, { method: "POST", credentials: "include", cache: "no-store", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body ?? {}) });
    return { ok: r.ok, status: r.status, data: (await r.json().catch(() => null)) as never };
  } catch {
    return { ok: false, status: 0, data: null };
  }
}

export function CatedraView({ area }: { area: CatedraArea }) {
  const { city } = useContext(CiudadCtx);
  const meta = CATEDRAS[area];
  const [leccion, setLeccion] = useState<LeccionVista | null>(null);
  const [agotada, setAgotada] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [elegida, setElegida] = useState<string | null>(null);
  const [res, setRes] = useState<CatedraRespuesta | null>(null);
  const [enviando, setEnviando] = useState(false);
  useEffect(() => {
    let vivo = true;
    void pedir<LeccionVista>(`/catedra/${area}/leccion`, {}).then((r) => {
      if (!vivo) return;
      if (r.ok && r.data?.agotada) setAgotada(r.data.message || "Por hoy ya aprendiste las lecciones de esta cátedra.");
      else if (r.ok && r.data) setLeccion(r.data);
      else setError(r.data?.message || "No se pudo traer la lección. Revisa tu conexión.");
    });
    return () => {
      vivo = false;
    };
  }, [area]);

  const responder = async (op: string) => {
    if (elegida || !leccion) return;
    setElegida(op);
    setEnviando(true);
    const r = await pedir<CatedraRespuesta>(`/catedra/${area}/respuesta`, { opcion: op });
    setEnviando(false);
    if (r.ok && r.data) setRes(r.data);
    else setError(r.data?.message || "No se pudo corregir. Intenta de nuevo.");
  };
  // «Amén»: la oración se cumple (con lección respondida o sin lección porque ya aprendió las de hoy)
  const terminar = () => {
    gameStore.close();
    if (area === "oracion") city?.terminarOracion();
    if (res?.correcta) gameStore.toast(`${meta.icono} Bien aprendido · +${res.premio.merito} mérito · +${res.premio.gozo} ✨ gozo`, "gold");
  };
  // cerrar sin responder: no cuenta; puede volver a arrodillarse
  const cerrar = () => {
    gameStore.close();
    if (area === "oracion") city?.cancelarOracion();
  };

  return (
    <Card
      title={
        <span className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" /> {meta.nombre}
        </span>
      }
      onClose={res || agotada ? terminar : cerrar}
      testid="catedra"
    >
      <div className="space-y-3 p-4 text-sm">
        {error && <p className="rounded-xl bg-red-50 p-2.5 text-red-900 dark:bg-red-950/30 dark:text-red-200">{error}</p>}
        {agotada && (
          <>
            <p className="rounded-xl bg-amber-50 p-3 dark:bg-amber-950/30" data-testid="catedra-agotada">
              {agotada}
            </p>
            <Button className="w-full rounded-full bg-amber-500 font-bold text-amber-950 hover:bg-amber-400" onClick={terminar} data-testid="catedra-amen">
              🙏 Amén
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
            <p className="rounded-xl bg-amber-50 p-3 font-serif text-[15px] leading-snug dark:bg-amber-950/30" data-testid="catedra-ensena">
              {leccion.ensena}
            </p>
            <p className="font-bold leading-snug" data-testid="catedra-pregunta">
              {leccion.pregunta}
            </p>
            <div className="grid gap-1.5">
              {leccion.opciones.map((o) => {
                const estado = !res ? (elegida === o ? "elegida" : "") : o === res.respuesta ? "bien" : elegida === o ? "mal" : "apagada";
                return (
                  <button
                    key={o}
                    type="button"
                    disabled={!!elegida}
                    onClick={() => void responder(o)}
                    className={`rounded-xl border-2 px-3 py-2 text-left font-semibold ${
                      estado === "bien"
                        ? "border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200"
                        : estado === "mal"
                          ? "border-red-400 bg-red-50 text-red-900 dark:bg-red-950/30 dark:text-red-200"
                          : estado === "elegida"
                            ? "border-amber-400 bg-amber-50 dark:bg-amber-950/30"
                            : estado === "apagada"
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
                <p className="text-center text-[11px] text-stone-500">
                  Lecciones de hoy: {res.hoy} de {res.max} · aprendidas: {res.aprendidas} de {res.total}
                </p>
                <Button className="w-full rounded-full bg-amber-500 font-bold text-amber-950 hover:bg-amber-400" onClick={terminar} data-testid="catedra-amen">
                  🙏 Amén
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </Card>
  );
}
