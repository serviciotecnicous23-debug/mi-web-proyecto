/**
 * Los estudios de Jerusalén en línea, la pantalla: la lista por camino, cada estudio con sus
 * secciones (lectura, versículos, la idea clave y la práctica) y el examen final que corrige el
 * servidor. Lo aprobado queda para siempre y lo ve la comunidad.
 */
import { useEffect, useState } from "react";
import { ArrowLeft, Check, GraduationCap, Loader2, Lock, ScrollText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CAMINOS_ESTUDIO, ESTUDIOS, EXAMEN_APRUEBA, MERITO_ESTUDIO, MERITO_SECCION, estudioPorId,
  type CaminoEstudio, type EstudiosDe, type EstudiosEstado, type ExamenResultado, type MiEstudio, type PreguntaExamen, type SeccionEstudio,
} from "@shared/estudios";
import { gameStore } from "./store";
import { Card, VerseBox } from "./ui";

async function pedir<T>(path: string, init?: RequestInit): Promise<{ ok: boolean; status: number; data: T | null }> {
  try {
    const res = await fetch(`/api/jerusalen${path}`, { credentials: "include", ...init, headers: { "Content-Type": "application/json", ...(init?.headers || {}) } });
    return { ok: res.ok, status: res.status, data: (await res.json().catch(() => null)) as T | null };
  } catch {
    return { ok: false, status: 0, data: null };
  }
}

export const estudiosEstado = () => pedir<EstudiosEstado & { message?: string }>("/estudios");
export const estudiosDe = (personajeId: number) => pedir<EstudiosDe>(`/estudios/de/${personajeId}`);

type Vista = { v: "lista" } | { v: "estudio"; id: string } | { v: "seccion"; id: string; seccion: string } | { v: "examen"; id: string };

/** La ventana de los estudios (con su propia navegación: lista, estudio, sección y examen). */
export function EstudiosModal({ id }: { id?: string }) {
  const [vista, setVista] = useState<Vista>(id ? { v: "estudio", id } : { v: "lista" });
  const [estado, setEstado] = useState<EstudiosEstado | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    void estudiosEstado().then((r) => {
      if (r.ok && r.data) setEstado(r.data);
      else setError(r.data?.message || "No se pudieron traer tus estudios. Revisa tu conexión.");
    });
  }, []);
  const mio = (eid: string) => estado?.mios.find((m) => m.id === eid);
  const titulo =
    vista.v === "lista" ? "Estudios de Jerusalén" : vista.v === "examen" ? `Examen: ${estudioPorId(vista.id)?.titulo}` : estudioPorId(vista.id)?.titulo || "Estudio";
  return (
    <Card
      title={
        <span className="flex items-center gap-2">
          {vista.v !== "lista" && (
            <button
              type="button"
              className="rounded-full p-1 hover:bg-amber-100 dark:hover:bg-amber-900/40"
              onClick={() => setVista(vista.v === "estudio" ? { v: "lista" } : { v: "estudio", id: vista.id })}
              aria-label="Volver"
              data-testid="button-estudios-volver"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
          )}
          <ScrollText className="h-5 w-5" /> {titulo}
        </span>
      }
      onClose={() => gameStore.close()}
      testid="templo-estudios"
    >
      <div className="space-y-3 p-4 text-sm">
        {error && <p className="rounded-xl bg-red-50 p-2.5 text-red-900 dark:bg-red-950/30 dark:text-red-200">{error}</p>}
        {!estado && !error && (
          <p className="flex items-center gap-2 text-stone-500">
            <Loader2 className="h-4 w-4 animate-spin" /> Buscando tus estudios…
          </p>
        )}
        {estado && vista.v === "lista" && <Lista estado={estado} abrir={(eid) => setVista({ v: "estudio", id: eid })} />}
        {estado && vista.v === "estudio" && (
          <Detalle id={vista.id} mio={mio(vista.id)} estado={estado} leer={(s) => setVista({ v: "seccion", id: vista.id, seccion: s })} examen={() => setVista({ v: "examen", id: vista.id })} />
        )}
        {estado && vista.v === "seccion" && (
          <Seccion
            id={vista.id}
            seccion={vista.seccion}
            hecha={!!mio(vista.id)?.secciones.includes(vista.seccion)}
            alTerminar={(e) => {
              setEstado(e);
              setVista({ v: "estudio", id: vista.id });
            }}
          />
        )}
        {estado && vista.v === "examen" && <Examen id={vista.id} alTerminar={setEstado} volver={() => setVista({ v: "estudio", id: vista.id })} />}
      </div>
    </Card>
  );
}

function Lista({ estado, abrir }: { estado: EstudiosEstado; abrir: (id: string) => void }) {
  const caminos = Object.keys(CAMINOS_ESTUDIO) as CaminoEstudio[];
  return (
    <>
      <p>
        Estudios bíblicos por camino. Cada uno tiene secciones para leer y practicar, y un examen final. <b>Lo aprobado queda para siempre</b>: lo ve la comunidad y algunos cargos lo
        piden.
      </p>
      <p className="rounded-xl bg-amber-50 p-2.5 text-xs dark:bg-amber-950/30" data-testid="estudios-aprobados">
        <GraduationCap className="-mt-0.5 mr-1 inline h-4 w-4" />
        Aprobados: <b>{estado.aprobados}</b> de {ESTUDIOS.length}. Cada sección da +{MERITO_SECCION} de mérito y cada estudio aprobado +{MERITO_ESTUDIO} (una vez).
      </p>
      {caminos.map((c) => {
        const lista = ESTUDIOS.filter((e) => e.camino === c);
        if (!lista.length) return null;
        return (
          <div key={c}>
            <p className="mb-1 font-black">
              {CAMINOS_ESTUDIO[c].icono} {CAMINOS_ESTUDIO[c].nombre}
            </p>
            <ul className="space-y-1.5">
              {lista.map((e) => {
                const m = estado.mios.find((x) => x.id === e.id);
                const bloqueado = !!e.requiere && !estado.mios.find((x) => x.id === e.requiere)?.aprobado;
                return (
                  <li key={e.id}>
                    <button
                      type="button"
                      onClick={() => abrir(e.id)}
                      className={`flex w-full items-center gap-3 rounded-xl border p-2.5 text-left hover:bg-amber-50 dark:hover:bg-amber-950/20 ${m?.aprobado ? "border-emerald-300 bg-emerald-50/60 dark:border-emerald-800 dark:bg-emerald-950/20" : "border-stone-200 dark:border-stone-700"}`}
                      data-testid={`estudio-${e.id}`}
                    >
                      <span className="text-2xl">{e.icono}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-bold">{e.titulo}</span>
                        <span className="block text-[11px] text-stone-500">
                          {m?.aprobado
                            ? `✓ Aprobado el ${m.aprobado}`
                            : bloqueado
                              ? `Primero aprueba «${estudioPorId(e.requiere!)?.titulo}»`
                              : `${m?.secciones.length || 0} de ${e.secciones.length} secciones${m?.puedeExamen ? " · examen listo" : ""}`}
                        </span>
                      </span>
                      {bloqueado ? <Lock className="h-4 w-4 shrink-0 text-stone-400" /> : m?.aprobado ? <Check className="h-5 w-5 shrink-0 text-emerald-600" /> : null}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </>
  );
}

function Detalle({ id, mio, estado, leer, examen }: { id: string; mio?: MiEstudio; estado: EstudiosEstado; leer: (s: string) => void; examen: () => void }) {
  const e = estudioPorId(id);
  if (!e) return null;
  const bloqueado = !!e.requiere && !estado.mios.find((x) => x.id === e.requiere)?.aprobado;
  return (
    <>
      <p>{e.resumen}</p>
      {e.abre && <p className="text-xs font-semibold text-amber-800 dark:text-amber-300">{e.abre}</p>}
      {bloqueado && (
        <p className="rounded-xl bg-stone-100 p-2.5 text-xs dark:bg-stone-800">
          <Lock className="-mt-0.5 mr-1 inline h-3.5 w-3.5" /> Primero aprueba «{estudioPorId(e.requiere!)?.titulo}».
        </p>
      )}
      <ol className="space-y-1.5">
        {e.secciones.map((s, i) => {
          const hecha = !!mio?.secciones.includes(s.id);
          return (
            <li key={s.id} className="flex items-center gap-3 rounded-xl border border-stone-200 p-2.5 dark:border-stone-700">
              <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-black ${hecha ? "bg-emerald-500 text-white" : "bg-amber-100 text-amber-900 dark:bg-amber-900 dark:text-amber-100"}`}>
                {hecha ? <Check className="h-4 w-4" /> : i + 1}
              </span>
              <span className="min-w-0 flex-1 font-semibold">{s.titulo}</span>
              <Button size="sm" variant={hecha ? "secondary" : "default"} disabled={bloqueado} onClick={() => leer(s.id)} data-testid={`button-seccion-${s.id}`}>
                {hecha ? "Repasar" : "Leer"}
              </Button>
            </li>
          );
        })}
      </ol>
      {mio?.aprobado ? (
        <p className="rounded-xl bg-emerald-50 p-2.5 text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200" data-testid="estudio-aprobado">
          ✓ Aprobado el {mio.aprobado} ({mio.mejor} de 6). Es tuyo para siempre.
        </p>
      ) : (
        <Button className="w-full rounded-full bg-amber-500 font-bold text-amber-950 hover:bg-amber-400" disabled={!mio?.puedeExamen} onClick={examen} data-testid="button-estudio-examen">
          <GraduationCap className="mr-1 h-4 w-4" />
          {mio?.esperaExamen ? `Examen en ${mio.esperaExamen} s` : mio?.puedeExamen ? "Dar el examen final" : "Examen final (termina las secciones)"}
        </Button>
      )}
      {!mio?.aprobado && <p className="text-center text-[11px] text-stone-500">El examen tiene 6 preguntas; se aprueba con {EXAMEN_APRUEBA}.</p>}
    </>
  );
}

function Seccion({ id, seccion, hecha, alTerminar }: { id: string; seccion: string; hecha: boolean; alTerminar: (e: EstudiosEstado) => void }) {
  const e = estudioPorId(id);
  const s: SeccionEstudio | undefined = e?.secciones.find((x) => x.id === seccion);
  const [elegidas, setElegidas] = useState<Record<number, number>>({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  if (!e || !s) return null;
  const todasBien = s.preguntas.every((p, i) => elegidas[i] === p.ok);
  const terminar = async () => {
    setBusy(true);
    setError(null);
    const r = await pedir<{ premio: number; estado: EstudiosEstado; message?: string }>(`/estudios/${id}/seccion`, { method: "POST", body: JSON.stringify({ seccion }) });
    setBusy(false);
    if (!r.ok || !r.data) {
      setError(r.data?.message || "No se pudo guardar. Intenta de nuevo.");
      return;
    }
    if (r.data.premio) gameStore.toast(`Sección terminada: «${s.titulo}» · +${r.data.premio} de mérito`, "gold");
    for (const m of (r.data as { misiones?: { titulo: string; premio: number }[] }).misiones || []) gameStore.toast(`${m.titulo} · +${m.premio} de mérito`, "gold");
    alTerminar(r.data.estado);
  };
  return (
    <div className="space-y-3" data-testid="estudio-seccion">
      <h4 className="font-serif text-lg font-black">{s.titulo}</h4>
      {s.lectura.map((p) => (
        <p key={p} className="leading-relaxed">
          {p}
        </p>
      ))}
      {s.versos.map((v) => (
        <VerseBox key={v.ref} text={v.text} refName={v.ref} />
      ))}
      <p className="rounded-xl border-l-4 border-amber-400 bg-amber-50 p-2.5 font-semibold dark:bg-amber-950/30">Idea clave: {s.clave}</p>
      <p className="font-black">Practica</p>
      {s.preguntas.map((p, i) => {
        const el = elegidas[i];
        return (
          <div key={p.p} className="space-y-1.5 rounded-xl border border-stone-200 p-2.5 dark:border-stone-700">
            <p className="font-semibold">{p.p}</p>
            {p.ops.map((o, k) => {
              const estado = el === undefined ? "" : k === p.ok && el === k ? "bien" : el === k ? "mal" : "";
              return (
                <button
                  key={o}
                  type="button"
                  onClick={() => setElegidas((prev) => ({ ...prev, [i]: k }))}
                  disabled={el === p.ok}
                  className={`block w-full rounded-lg border px-2.5 py-1.5 text-left text-[13px] ${
                    estado === "bien" ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30" : estado === "mal" ? "border-red-400 bg-red-50 dark:bg-red-950/30" : "border-stone-200 hover:bg-amber-50 dark:border-stone-700 dark:hover:bg-amber-950/20"
                  }`}
                  data-testid={`practica-${i}-${k}`}
                >
                  {o}
                </button>
              );
            })}
            {el !== undefined && <p className={`text-xs ${el === p.ok ? "text-emerald-700 dark:text-emerald-300" : "text-red-700 dark:text-red-300"}`}>{el === p.ok ? `¡Bien! ${p.por}` : "No es esa. Vuelve a leer y elige otra."}</p>}
          </div>
        );
      })}
      {error && <p className="rounded-lg bg-red-50 p-2 text-xs text-red-900 dark:bg-red-950/30 dark:text-red-200">{error}</p>}
      <Button className="w-full rounded-full bg-amber-500 font-bold text-amber-950 hover:bg-amber-400" disabled={!todasBien || busy} onClick={() => void terminar()} data-testid="button-seccion-terminar">
        {busy ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : <Check className="mr-1 h-4 w-4" />}
        {hecha ? "Listo (ya la habías terminado)" : todasBien ? "Terminar la sección" : "Responde bien la práctica para terminar"}
      </Button>
    </div>
  );
}

function Examen({ id, alTerminar, volver }: { id: string; alTerminar: (e: EstudiosEstado) => void; volver: () => void }) {
  const [preguntas, setPreguntas] = useState<PreguntaExamen[] | null>(null);
  const [resp, setResp] = useState<Record<string, string>>({});
  const [resultado, setResultado] = useState<ExamenResultado | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    void pedir<{ preguntas: PreguntaExamen[]; message?: string }>(`/estudios/${id}/examen`, { method: "POST" }).then((r) => {
      if (r.ok && r.data) setPreguntas(r.data.preguntas);
      else setError(r.data?.message || "No se pudo traer el examen.");
    });
  }, [id]);
  const entregar = async () => {
    setBusy(true);
    const r = await pedir<ExamenResultado & { message?: string }>(`/estudios/${id}/examen/respuestas`, { method: "POST", body: JSON.stringify({ respuestas: resp }) });
    setBusy(false);
    if (!r.ok || !r.data) {
      setError(r.data?.message || "No se pudo entregar. Intenta de nuevo.");
      return;
    }
    setResultado(r.data);
    alTerminar(r.data.estado);
    if (r.data.aprobado) gameStore.toast(r.data.primeraVez ? `¡Aprobaste «${estudioPorId(id)?.titulo}»! +${r.data.premio} de mérito` : "¡Aprobado otra vez!", "gold");
  };
  if (error)
    return (
      <div className="space-y-2">
        <p className="rounded-xl bg-amber-50 p-2.5 dark:bg-amber-950/30">{error}</p>
        <Button variant="secondary" onClick={volver}>
          Volver al estudio
        </Button>
      </div>
    );
  if (!preguntas)
    return (
      <p className="flex items-center gap-2 text-stone-500">
        <Loader2 className="h-4 w-4 animate-spin" /> Preparando el examen…
      </p>
    );
  if (resultado)
    return (
      <div className="space-y-2" data-testid="examen-resultado">
        <p className={`rounded-xl p-3 text-center font-black ${resultado.aprobado ? "bg-emerald-50 text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200" : "bg-amber-50 dark:bg-amber-950/30"}`}>
          {resultado.aciertos} de {resultado.de} · {resultado.aprobado ? "¡Aprobado! Este estudio es tuyo para siempre." : `Te faltó poco: se aprueba con ${EXAMEN_APRUEBA}. Repasa y vuelve a intentarlo en 2 minutos.`}
        </p>
        <ul className="space-y-1.5">
          {resultado.correcciones.map((c) => {
            const p = preguntas.find((x) => x.id === c.id);
            return (
              <li key={c.id} className={`rounded-xl border p-2.5 text-xs ${c.bien ? "border-emerald-300" : "border-red-300"}`}>
                <p className="font-semibold">
                  {c.bien ? "✓" : "✗"} {p?.pregunta}
                </p>
                {!c.bien && <p className="mt-0.5">Respuesta: {c.correcta}</p>}
                <p className="mt-0.5 text-stone-500">
                  {c.explica} ({c.ref})
                </p>
              </li>
            );
          })}
        </ul>
        <Button className="w-full" variant="secondary" onClick={volver} data-testid="button-examen-volver">
          Volver al estudio
        </Button>
      </div>
    );
  const completas = preguntas.every((p) => resp[p.id]);
  return (
    <div className="space-y-3" data-testid="estudio-examen">
      <p className="text-xs text-stone-500">Responde las {preguntas.length} preguntas y entrega. Se aprueba con {EXAMEN_APRUEBA}.</p>
      {preguntas.map((p, i) => (
        <div key={p.id} className="space-y-1.5 rounded-xl border border-stone-200 p-2.5 dark:border-stone-700">
          <p className="font-semibold">
            {i + 1}. {p.pregunta}
          </p>
          {p.opciones.map((o, k) => (
            <button
              key={o}
              type="button"
              onClick={() => setResp((prev) => ({ ...prev, [p.id]: o }))}
              className={`block w-full rounded-lg border px-2.5 py-1.5 text-left text-[13px] ${resp[p.id] === o ? "border-amber-500 bg-amber-50 font-semibold dark:bg-amber-950/30" : "border-stone-200 hover:bg-amber-50 dark:border-stone-700 dark:hover:bg-amber-950/20"}`}
              data-testid={`examen-${i}-${k}`}
            >
              {o}
            </button>
          ))}
        </div>
      ))}
      <Button className="w-full rounded-full bg-amber-500 font-bold text-amber-950 hover:bg-amber-400" disabled={!completas || busy} onClick={() => void entregar()} data-testid="button-examen-entregar">
        {busy ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : <Check className="mr-1 h-4 w-4" />} Entregar el examen
      </Button>
    </div>
  );
}

/** Lo que ve la comunidad: los estudios aprobados de otro personaje (en la ficha del vecino). */
export function EstudiosDeOtro({ personajeId }: { personajeId: number }) {
  const [d, setD] = useState<EstudiosDe | null>(null);
  useEffect(() => {
    void estudiosDe(personajeId).then((r) => r.ok && r.data && setD(r.data));
  }, [personajeId]);
  if (!d) return null;
  return (
    <div className="rounded-xl bg-amber-50 p-2.5 text-xs dark:bg-amber-950/30" data-testid="vecino-estudios">
      <p className="font-bold">
        <GraduationCap className="-mt-0.5 mr-1 inline h-4 w-4" /> Estudios aprobados: {d.aprobados.length}
      </p>
      {d.aprobados.length > 0 && (
        <ul className="mt-1 space-y-0.5">
          {d.aprobados.map((a) => (
            <li key={a.id}>
              {a.icono} {a.titulo} <span className="text-stone-500">· {a.fecha}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
