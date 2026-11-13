/**
 * Los mentores en la pantalla (shared/mentores.ts, server/mentores.ts): el nuevo elige a su mentor (el sugerido va
 * primero) y ve sus seis pasos; el mentor ve a sus aprendices con sus pasos y dónde están, y puede ir con ellos,
 * invitarlos a venir y encontrarse con ellos para enseñarles un dicho de los ancianos. Cada nombre abre el registro de
 * esa persona (RegistroUI.tsx): así se ve lo que ha hecho antes de elegirla. Va en las Misiones y en su propia ventana
 * (la que abren «Para hoy» y los avisos).
 */
import { useContext, useEffect, useState } from "react";
import { Footprints, GraduationCap, HeartHandshake, Loader2, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CiudadCtx } from "./CiudadUI";
import { gameStore } from "./store";
import { Card, VerseBox } from "./ui";
import { invitarVecino, irConVecino } from "./Acompanar";
import { ICONO_CAMINO } from "./barrio-chat";
import { NombreConRegistro } from "./RegistroUI";
import { MENTORES, PASOS, VERSO_APRENDIZ, VERSO_JUNTOS, VERSO_MANTO, VERSO_MENTOR, type Companero, type MentoresEstado, type PasoVista } from "@shared/mentores";
import type { Dicho } from "@shared/dichos";
import { Ico } from "./iconos";

/** Llega por la red de la ciudad cuando algo cambió con tu mentor o tus aprendices: las ventanas abiertas se ponen al día. */
export const EVENTO_MENTOR = "jer-mentor";

type Resp = MentoresEstado & { message?: string; elegido?: string; texto?: string; aprendi?: Dicho | null; ensene?: Dicho | null; paso?: boolean };
async function pedir(path: string, body?: unknown): Promise<{ ok: boolean; status: number; data: Resp | null }> {
  try {
    const res = await fetch(`/api/jerusalen${path}`, {
      method: body === undefined ? "GET" : "POST",
      credentials: "include",
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    return { ok: res.ok, status: res.status, data: (await res.json().catch(() => null)) as Resp | null };
  } catch {
    return { ok: false, status: 0, data: null };
  }
}

export async function traerMentores(): Promise<MentoresEstado | null> {
  const r = await pedir("/mentores");
  return r.ok ? r.data : null;
}

function Barra({ n }: { n: number }) {
  return (
    <span className="block h-1.5 overflow-hidden rounded-full bg-stone-200 dark:bg-stone-700" aria-label={`${n} de ${PASOS.length} pasos`}>
      <span className="block h-full rounded-full bg-gradient-to-r from-violet-400 to-violet-600 transition-all" style={{ width: `${Math.round((n / PASOS.length) * 100)}%` }} />
    </span>
  );
}

/** Los seis pasos: los cumplidos con su ✓ y, para el aprendiz, un botón para ir a hacer el que falta. */
function Pasos({ pasos, propios, camino }: { pasos: PasoVista[]; propios: boolean; camino: Companero["camino"] | null }) {
  const { city, estado } = useContext(CiudadCtx);
  const cam = camino ?? estado?.yo.camino ?? null;
  const ir = (id: (typeof PASOS)[number]["ir"]) => {
    gameStore.close();
    if (id === "templo") {
      if (city) city.irA(cam === "profecia" ? "escuela" : cam === "realeza" ? "palacio" : "templo");
    } else if (id === "instruccion") {
      if (city && cam === "profecia") city.irA("escuela");
      else if (city && cam === "realeza") city.irA("palacio");
      else gameStore.push({ kind: "instruccion" });
    } else if (id === "estudios") gameStore.push({ kind: "estudios" });
    else if (id === "obras") gameStore.push({ kind: "casa", pestana: "obras" });
  };
  return (
    <ul className="space-y-1">
      {PASOS.map((p) => {
        const v = pasos.find((x) => x.id === p.id);
        const hecho = !!v?.hecho;
        return (
          <li key={p.id} className={`flex items-center gap-2 rounded-lg px-2 py-1 text-xs ${hecho ? "bg-emerald-50 text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200" : "bg-white/70 dark:bg-stone-900/40"}`} data-testid={`mentor-paso-${p.id}`}>
            <span className="text-base leading-none">{hecho ? "✅" : p.icono}</span>
            <span className="min-w-0 flex-1">
              <b>{p.titulo}</b>
              {hecho ? (v?.antes ? <span className="text-stone-500"> · ya lo habías hecho</span> : null) : <span className="block text-[11px] text-stone-500 dark:text-stone-400">{p.como}</span>}
            </span>
            {propios && !hecho && p.ir && p.ir !== "mentor" && (
              <Button size="sm" variant="secondary" className="h-6 rounded-full px-2 text-[11px]" onClick={() => ir(p.ir)}>
                Ir
              </Button>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/** Ir con él, invitarlo a venir y encontrarse (los dos en la ciudad, a pocos pasos). */
function Juntos({ c, juntosHoy, onJuntos, busy }: { c: Companero; juntosHoy: boolean; onJuntos: () => void; busy: boolean }) {
  const { city } = useContext(CiudadCtx);
  if (!city) return <p className="text-[11px] text-stone-500">Para encontrarte con {c.nombre}, sal a la ciudad.</p>;
  return (
    <div className="flex flex-wrap gap-1.5">
      {c.enLinea && (
        <Button
          size="sm"
          variant="secondary"
          className="h-7 rounded-full px-2.5 text-xs"
          onClick={() =>
            void irConVecino(city, c.personajeId).then((aviso) => {
              gameStore.close();
              if (aviso) gameStore.toast(aviso, "info");
            })
          }
          data-testid={`mentor-ir-${c.userId}`}
        >
          <Footprints className="mr-1 h-3.5 w-3.5" /> Ir con {c.nombre}
        </Button>
      )}
      {c.enLinea && c.enCiudad && (
        <Button size="sm" variant="secondary" className="h-7 rounded-full px-2.5 text-xs" onClick={() => void invitarVecino(c.personajeId).then((r) => gameStore.toast(r.texto, r.ok ? "gold" : "warn"))} data-testid={`mentor-invitar-${c.userId}`}>
          <Megaphone className="mr-1 h-3.5 w-3.5" /> Invitar a venir
        </Button>
      )}
      {!juntosHoy && (
        <Button size="sm" disabled={busy} className="h-7 rounded-full bg-violet-600 px-2.5 text-xs font-bold text-white hover:bg-violet-500" onClick={onJuntos} data-testid={`mentor-juntos-${c.userId}`}>
          <HeartHandshake className="mr-1 h-3.5 w-3.5" /> Nos encontramos
        </Button>
      )}
      {juntosHoy && <span className="self-center text-[11px] font-semibold text-violet-700 dark:text-violet-300"><Ico e="🤝" /> Ya se encontraron hoy</span>}
    </div>
  );
}

const enLinea = (c: Companero) =>
  c.enLinea ? <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">● en línea{c.donde ? ` · ${c.donde}` : ""}</span> : <span className="text-[11px] text-stone-500">no está ahora</span>;

/** La sección de los mentores (en las Misiones y en su ventana). */
export function Mentores() {
  const [e, setE] = useState<MentoresEstado | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [resultado, setResultado] = useState<{ texto: string; dicho: Dicho | null } | null>(null);
  const traer = () =>
    void pedir("/mentores").then((r) => {
      if (r.ok && r.data) setE(r.data);
      else setError(r.data?.message || null);
    });
  useEffect(() => {
    traer();
    const al = () => traer();
    window.addEventListener(EVENTO_MENTOR, al);
    return () => window.removeEventListener(EVENTO_MENTOR, al);
  }, []);
  const hacer = async (path: string, body: unknown, ok?: (d: Resp) => void) => {
    setBusy(true);
    setError(null);
    const r = await pedir(path, body);
    setBusy(false);
    if (r.ok && r.data) {
      setE(r.data);
      ok?.(r.data);
      // la ciudad pone al día las marcas sobre los nombres (y las otras ventanas abiertas)
      window.dispatchEvent(new CustomEvent(EVENTO_MENTOR));
    } else setError(r.data?.message || "No se pudo. Revisa tu conexión.");
  };
  const juntos = (con: number) =>
    void hacer("/mentores/juntos", { con }, (d) => {
      setResultado({ texto: d.texto ?? "🤝 Se encontraron.", dicho: d.aprendi ?? null });
    });
  if (!e) return error ? null : <Loader2 className="mx-auto h-4 w-4 animate-spin text-stone-400" />;
  const yo = e.yo;
  const nada = !e.miMentor && !yo.puedeElegir && !yo.puedeSerMentor && !e.aprendices.length;
  return (
    <section className="space-y-2.5 rounded-xl border border-violet-300 bg-violet-50/60 p-3 dark:border-violet-800 dark:bg-violet-950/20" data-testid="mentores">
      <p className="flex items-center gap-1.5 font-black">
        <GraduationCap className="h-4 w-4" /> Mentores
      </p>
      {error && <p className="rounded-lg bg-rose-50 p-2 text-xs text-rose-800 dark:bg-rose-950/40 dark:text-rose-200">{error}</p>}
      {resultado && (
        <div className="space-y-1.5 rounded-lg bg-white/80 p-2 text-xs ring-1 ring-violet-300 dark:bg-stone-900/50 dark:ring-violet-800" data-testid="mentor-resultado">
          <p className="font-semibold">{resultado.texto}</p>
          {resultado.dicho && <VerseBox text={resultado.dicho.text} refName={resultado.dicho.ref} />}
        </div>
      )}

      {/* el aprendiz con su mentor */}
      {e.miMentor && (
        <div className="space-y-1.5" data-testid="mentores-mi-mentor">
          <p className="text-[13px]">
            Tu mentor:{" "}
            <b>
              {ICONO_CAMINO[e.miMentor.camino]} <NombreConRegistro personajeId={e.miMentor.personajeId} nombre={e.miMentor.nombre} />
            </b>{" "}
            {enLinea(e.miMentor)}
          </p>
          <div className="flex items-center gap-2">
            <span className="min-w-0 flex-1">
              <Barra n={e.miMentor.hechos} />
            </span>
            <span className="text-xs font-black tabular-nums">
              {e.miMentor.hechos}/{PASOS.length}
            </span>
          </div>
          <Pasos pasos={e.miMentor.pasos} propios camino={null} />
          <Juntos c={e.miMentor} juntosHoy={e.miMentor.juntosHoy} busy={busy} onJuntos={() => juntos(e.miMentor!.userId)} />
          <p className="text-[11px] text-stone-500">
            Cada paso: ✨ +{MENTORES.gozoPaso.aprendiz} para ti y +{MENTORES.gozoPaso.mentor} para tu mentor. Los seis: ✨ +{MENTORES.gozoFin.aprendiz} y el manto de Elías para los dos.
          </p>
          <button type="button" className="text-[11px] text-stone-500 underline" disabled={busy} onClick={() => void hacer("/mentores/dejar", {}, () => gameStore.toast("Dejaste a tu mentor. Lo que ya cumpliste se queda.", "info"))} data-testid="mentor-dejar">
            Dejar a mi mentor
          </button>
        </div>
      )}
      {e.terminoCon && <p className="text-xs" data-testid="mentores-termino">🪢 Terminaste tus pasos con <b>{e.terminoCon.nombre}</b>. ¡Ahora tú también puedes ser mentor!</p>}

      {/* el nuevo elige a su mentor */}
      {yo.puedeElegir && (
        <div className="space-y-1.5" data-testid="mentores-elegir">
          <p className="text-xs text-stone-700 dark:text-stone-300">
            Acabas de llegar a Jerusalén: elige un mentor que te acompañe en tus primeros días. Juntos cumplen seis pasos, y cada uno les da gozo a los dos. Toca un nombre para ver su registro.
          </p>
          {e.posibles.length ? (
            <ul className="space-y-1">
              {e.posibles.map((m) => (
                <li key={m.userId} className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs ${m.sugerido ? "bg-violet-100 ring-1 ring-violet-400 dark:bg-violet-900/40" : "bg-white/70 dark:bg-stone-900/40"}`} data-testid={`mentor-posible-${m.userId}`}>
                  <span className="min-w-0 flex-1">
                    <b>
                      {ICONO_CAMINO[m.camino]} <NombreConRegistro personajeId={m.personajeId} nombre={m.nombre} />
                    </b>
                    {m.sugerido && <span className="ml-1 rounded-full bg-violet-600 px-1.5 py-0.5 text-[10px] font-black text-white">⭐ Sugerido</span>}
                    {m.titulo && <span className="ml-1 text-[11px] text-amber-700 dark:text-amber-300"><Ico e="🏅" /> {m.titulo}</span>}
                    <span className="block text-[11px] text-stone-500">
                      {m.relacion === "amigo" ? "Está entre tus amigos" : m.relacion === "ambos" ? "Vive en tu barrio y está entre tus amigos" : "Vive en tu barrio"} · {m.dias} días en Jerusalén
                      {m.guiados ? ` · ya guió a ${m.guiados}` : ""} · {m.enLinea ? `● en línea${m.donde ? ` (${m.donde})` : ""}` : "no está ahora"}
                    </span>
                  </span>
                  <Button size="sm" disabled={busy} className="h-7 rounded-full bg-violet-600 px-3 text-xs font-bold text-white hover:bg-violet-500" onClick={() => void hacer("/mentores/elegir", { mentor: m.userId }, (d) => gameStore.toast(`🤝 ${d.elegido ?? m.nombre} es tu mentor. ¡A cumplir los pasos juntos!`, "gold"))} data-testid={`mentor-elegir-${m.userId}`}>
                    Elegir
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="rounded-lg bg-white/70 p-2 text-xs dark:bg-stone-900/40" data-testid="mentores-sin-posibles">
              Todavía no hay mentores en tu barrio ni entre tus amigos. Pueden serlo los que ya terminaron sus primeros pasos, aprobaron un estudio y jugaron {MENTORES.diasMentor} días. Vuelve a mirar mañana.
            </p>
          )}
          <VerseBox text={VERSO_APRENDIZ.text} refName={VERSO_APRENDIZ.ref} />
        </div>
      )}

      {/* el mentor con sus aprendices */}
      {(yo.puedeSerMentor || e.aprendices.length > 0) && (
        <div className="space-y-1.5" data-testid="mentores-aprendices">
          <p className="text-[13px] font-bold">
            Tus aprendices ({e.aprendices.length}/{MENTORES.maxAprendices}){e.guiados ? <span className="font-normal text-stone-500"> · ya guiaste a {e.guiados}</span> : null}
          </p>
          {e.aprendices.map((a) => (
            <div key={a.userId} className="space-y-1 rounded-lg bg-white/70 p-2 dark:bg-stone-900/40" data-testid={`mentor-aprendiz-${a.userId}`}>
              <p className="text-xs">
                <b>
                  {ICONO_CAMINO[a.camino]} <NombreConRegistro personajeId={a.personajeId} nombre={a.nombre} />
                </b>{" "}
                {enLinea(a)}
              </p>
              <div className="flex items-center gap-2">
                <span className="min-w-0 flex-1">
                  <Barra n={a.hechos} />
                </span>
                <span className="text-xs font-black tabular-nums">
                  {a.hechos}/{PASOS.length}
                </span>
              </div>
              <Pasos pasos={a.pasos} propios={false} camino={a.camino} />
              <Juntos c={a} juntosHoy={a.juntosHoy} busy={busy} onJuntos={() => juntos(a.userId)} />
              <button type="button" className="text-[11px] text-stone-500 underline" disabled={busy} onClick={() => void hacer("/mentores/dejar", { aprendiz: a.userId })} data-testid={`mentor-soltar-${a.userId}`}>
                Dejar de ser su mentor
              </button>
            </div>
          ))}
          {!e.aprendices.length && <p className="text-xs text-stone-600 dark:text-stone-300">Cuando alguien que acaba de llegar a tu barrio (o una amistad nueva) te elija como mentor, te llega un aviso. Cada paso que cumpla te da ✨ +{MENTORES.gozoPaso.mentor}; si termina los seis, ✨ +{MENTORES.gozoFin.mentor}, el manto de Elías y el título «Idóneo para enseñar».</p>}
          <label className="flex items-center gap-2 text-xs">
            <input type="checkbox" checked={yo.recibe} disabled={busy} onChange={(x) => void hacer("/mentores/recibir", { si: x.target.checked })} data-testid="mentor-recibe" />
            Recibir aprendices nuevos
          </label>
          <VerseBox text={VERSO_MENTOR.text} refName={VERSO_MENTOR.ref} />
        </div>
      )}

      {nada && yo.motivoMentor && <p className="text-xs text-stone-600 dark:text-stone-300" data-testid="mentores-motivo"><Ico e="🎓" /> {yo.motivoMentor}</p>}
      {(e.miMentor || e.aprendices.length > 0) && (
        <p className="text-center font-serif text-[12px] italic text-stone-500">
          «{e.miMentor ? VERSO_JUNTOS.text : VERSO_MANTO.text}» <span className="not-italic font-semibold">— {e.miMentor ? VERSO_JUNTOS.ref : VERSO_MANTO.ref}</span>
        </p>
      )}
    </section>
  );
}

/** La ventana de los mentores (la abren «Para hoy», los avisos y los ancianos de la puerta). */
export function MentoresView() {
  return (
    <Card
      title={
        <span className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5" /> Mentores
        </span>
      }
      onClose={() => gameStore.close()}
      testid="ventana-mentores"
    >
      <div className="space-y-3 p-4 text-sm">
        <Mentores />
      </div>
    </Card>
  );
}
