// Una lección de la academia: objetivos, lectura con versículos y medios, idea clave, aplicación, repaso y terminar.
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, Eye, IdCard, Lightbulb, ListChecks, Lock, PenLine, PlayCircle, Save, Target, XCircle } from "lucide-react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { loginUrl } from "@/lib/login-redirect";
import { idYouTube, type BloqueoRepaso, type LeccionVista, type RespuestaRepaso } from "@shared/academia";
import { avanceVideo, completarLeccion, guardarReflexion, inscribirmeEnMateria, responderRepaso, useLeccion } from "@/components/academia/api";
import { BarraAvance, BloqueLeccion, Cargando, Minutos, PantallaCerrada, enlaceInscripcion } from "@/components/academia/ui";

type Intento = { elegida: number; r: RespuestaRepaso };

const mmss = (s: number) => `${Math.floor(Math.max(0, s) / 60)}:${String(Math.max(0, Math.ceil(s)) % 60).padStart(2, "0")}`;

/** Mientras no se lee la lección (y no se ve el video, si tiene), el repaso queda cerrado: lo cuenta el servidor. */
function RepasoCerrado({ lectura, video, videoPide, sinVideo }: { lectura: number; video: number | null; videoPide: number | null; sinVideo: number | null }) {
  return (
    <div className="glass-card p-5 border border-orange-500/40" role="status" data-testid="repaso-cerrado">
      <p className="font-semibold flex items-center gap-2"><Lock className="w-4 h-4 text-orange-500" /> El repaso se abre cuando termines la lección</p>
      <p className="text-sm text-muted-foreground mt-1">Lee la lección con calma{videoPide ? " y mira el video" : ""}: así el repaso te sirve de verdad.</p>
      <ul className="mt-3 space-y-1.5 text-sm">
        <li className="flex items-center gap-2" data-testid="repaso-falta-lectura">
          {lectura > 0 ? <Clock className="w-4 h-4 text-orange-500" /> : <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
          {lectura > 0 ? `Lectura: faltan ${mmss(lectura)}` : "Lectura: lista"}
        </li>
        {videoPide != null && video != null && (
          <li className="flex items-center gap-2" data-testid="repaso-falta-video">
            {video > 0 ? <PlayCircle className="w-4 h-4 text-orange-500" /> : <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
            {video > 0
              ? `Video: mira de corrido sus primeros ${videoPide >= 120 ? "2 minutos" : mmss(videoPide)} (faltan ${mmss(video)}; adelantarlo no cuenta)`
              : "Video: listo"}
          </li>
        )}
        {videoPide != null && video != null && video > 0 && sinVideo != null && sinVideo > 0 && (
          <li className="text-xs text-muted-foreground pl-6" data-testid="repaso-sin-video">¿No carga el video? El repaso se abre igual en {mmss(sinVideo)}.</li>
        )}
      </ul>
    </div>
  );
}

function PreguntaRepaso({ leccionId, p, n, alResponder, alBloquear }: { leccionId: string; p: LeccionVista["repaso"][number]; n: number; alResponder: (bien: boolean, todas: boolean) => void; alBloquear: (b: BloqueoRepaso) => void }) {
  const [intentos, setIntentos] = useState<Intento[]>([]);
  const [ocupado, setOcupado] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const resuelta = p.hecha || intentos.some((i) => i.r.bien);
  const ultimo = intentos[intentos.length - 1];
  const responder = async (k: number) => {
    if (resuelta || ocupado) return;
    setOcupado(true);
    setError(null);
    try {
      const r = await responderRepaso(leccionId, p.id, k);
      setIntentos((xs) => [...xs, { elegida: k, r }]);
      alResponder(r.bien, r.todas);
    } catch (e: any) {
      if (e?.status === 409 && e.datos?.bloqueo) alBloquear(e.datos.bloqueo as BloqueoRepaso);
      setError(e.message);
    } finally {
      setOcupado(false);
    }
  };
  return (
    <div className="glass-card p-5" data-testid={`repaso-${p.id}`}>
      <p className="font-medium mb-3"><span className="text-orange-500 mr-1">{n}.</span> {p.texto}</p>
      <div className="grid gap-2">
        {p.opciones.map((op, k) => {
          const elegidaMal = intentos.some((i) => i.elegida === k && !i.r.bien);
          const elegidaBien = intentos.some((i) => i.elegida === k && i.r.bien);
          return (
            <button
              key={k}
              type="button"
              disabled={resuelta || elegidaMal || ocupado}
              onClick={() => responder(k)}
              className={`text-left rounded-xl border px-4 py-3 text-[15px] transition min-h-[48px] ${
                elegidaBien ? "border-emerald-500 bg-emerald-500/10" : elegidaMal ? "border-red-400/60 bg-red-500/5 line-through opacity-70" : "border-border hover:border-orange-500"
              }`}
              data-opcion={k}
            >
              {op}
            </button>
          );
        })}
      </div>
      {ultimo && (
        <div className={`mt-3 rounded-xl p-3 text-sm ${ultimo.r.bien ? "bg-emerald-500/10" : "bg-orange-500/10"}`} role="status">
          <p className="font-semibold flex items-center gap-1.5 mb-1">
            {ultimo.r.bien ? <><CheckCircle2 className="w-4 h-4 text-emerald-600" /> ¡Correcto!</> : <><XCircle className="w-4 h-4 text-orange-600" /> Todavía no: vuelve a intentarlo.</>}
          </p>
          {ultimo.r.bien && <p>{ultimo.r.explica} <span className="text-muted-foreground">({ultimo.r.ref})</span></p>}
        </div>
      )}
      {p.hecha && !intentos.length && <p className="mt-3 text-sm text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Ya la respondiste bien.</p>}
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}

export default function AcademiaLeccion() {
  const { leccionId } = useParams<{ leccionId: string }>();
  const [, setLocation] = useLocation();
  const qc = useQueryClient();
  const { toast } = useToast();
  const q = useLeccion(leccionId);
  const [bien, setBien] = useState<Set<string>>(new Set());
  const [reflexion, setReflexion] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [terminando, setTerminando] = useState(false);
  // lo que falta para abrir el repaso: la lectura baja sola cada segundo; el video, con lo que cuenta el servidor
  const [bloqueo, setBloqueo] = useState<BloqueoRepaso | null>(null);

  useEffect(() => {
    if (q.data) {
      setBien(new Set(q.data.repaso.filter((p) => p.hecha).map((p) => p.id)));
      setReflexion(q.data.progreso?.reflexion ?? "");
      setBloqueo(q.data.bloqueo);
      window.scrollTo({ top: 0 });
    }
  }, [q.data?.leccion.id]);

  // la lectura y la espera sin video bajan solas cada segundo (el servidor lleva la cuenta de verdad)
  const corre = !!bloqueo && (bloqueo.lectura > 0 || ((bloqueo.video ?? 0) > 0 && (bloqueo.sinVideo ?? 0) > 0));
  useEffect(() => {
    if (!corre) return;
    const t = window.setInterval(
      () =>
        setBloqueo((b) => {
          if (!b) return b;
          const sinVideo = b.sinVideo == null ? null : Math.max(0, b.sinVideo - 1);
          return { ...b, lectura: Math.max(0, b.lectura - 1), sinVideo, video: sinVideo === 0 ? 0 : b.video };
        }),
      1000,
    );
    return () => window.clearInterval(t);
  }, [corre]);

  if (q.isLoading) return <Cargando />;
  if (q.error?.status === 403) return <PantallaCerrada mensaje={q.error.message} />;
  if (q.error?.status === 401) {
    return (
      <Layout>
        <div className="max-w-xl mx-auto px-4 py-20 text-center">
          <p className="text-lg mb-5">{q.error.message}</p>
          <a href={loginUrl()}><Button className="fire-btn-primary">Entrar</Button></a>
        </div>
      </Layout>
    );
  }
  if (q.error?.status === 409) {
    const datos = q.error.datos ?? {};
    const materia = typeof datos.materiaId === "string" ? `/academia/materia/${datos.materiaId}` : "/academia";
    return (
      <Layout>
        <div className="max-w-xl mx-auto px-4 py-20 text-center" data-testid="leccion-cerrada">
          <Lock className="w-12 h-12 mx-auto text-orange-500" />
          <p className="text-lg mt-4 mb-6">{q.error.message}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            {datos.inscripcion === false ? (
              <Link href={enlaceInscripcion(materia)}><Button className="fire-btn-primary h-12 px-7 w-full" data-testid="leccion-inscribirme-academia"><IdCard className="w-4 h-4 mr-2" /> Inscribirme en la academia</Button></Link>
            ) : (
              <Link href={materia}><Button className="fire-btn-primary h-12 px-7 w-full" data-testid="leccion-ir-materia">Ver la materia e inscribirme <ArrowRight className="w-4 h-4 ml-2" /></Button></Link>
            )}
            <Link href="/academia"><Button variant="outline" className="h-12 w-full">Volver a la academia</Button></Link>
          </div>
        </div>
      </Layout>
    );
  }
  if (!q.data) {
    return (
      <Layout>
        <div className="max-w-xl mx-auto px-4 py-20 text-center">
          <p className="text-lg mb-5">{q.error?.message ?? "No se encontró la lección."}</p>
          <Link href="/academia"><Button variant="outline">Volver a la academia</Button></Link>
        </div>
      </Layout>
    );
  }
  const l = q.data;
  const conSesion = l.conSesion;
  const materia = `/academia/materia/${l.materia.id}`;
  const todas = l.repaso.every((p) => bien.has(p.id));
  const completada = !!l.progreso?.completada;
  const repasoAbierto = !bloqueo || (bloqueo.lectura <= 0 && (bloqueo.video == null || bloqueo.video <= 0));
  // el primer video de YouTube es el que cuenta para abrir el repaso
  const videoQueCuenta = l.bloques.findIndex((b) => b.t === "video" && !!idYouTube(b.url));
  const alVerVideo = async (segundos: number) => {
    if (!bloqueo || bloqueo.video == null || bloqueo.video <= 0) return;
    if (!conSesion) {
      // sin cuenta no se guarda: se cuenta aquí
      setBloqueo((b) => (b && b.videoPide != null ? { ...b, video: Math.max(0, b.videoPide - segundos) } : b));
      return;
    }
    try {
      const r = await avanceVideo(l.leccion.id, segundos);
      setBloqueo((b) => (b ? { ...b, video: b.sinVideo === 0 ? 0 : r.falta } : b));
    } catch {
      // se vuelve a intentar con el próximo aviso
    }
  };

  const guardar = async () => {
    setGuardando(true);
    try {
      await guardarReflexion(l.leccion.id, reflexion);
      toast({ title: "Tu nota quedó guardada", description: "Solo tú la puedes ver." });
    } catch (e: any) {
      toast({ title: "No se pudo guardar", description: e.message, variant: "destructive" });
    } finally {
      setGuardando(false);
    }
  };
  const inscribir = async () => {
    setTerminando(true);
    try {
      await inscribirmeEnMateria(l.materia.id);
      await qc.invalidateQueries({ queryKey: ["academia"] });
      toast({ title: `Te inscribiste en «${l.materia.titulo}»`, description: "Ya puedes completar esta lección y seguir con las demás." });
    } catch (e: any) {
      toast({ title: "No se pudo inscribir", description: e.message, variant: "destructive" });
    } finally {
      setTerminando(false);
    }
  };
  const terminar = async () => {
    setTerminando(true);
    try {
      const r = await completarLeccion(l.leccion.id, reflexion);
      await qc.invalidateQueries({ queryKey: ["academia"] });
      toast({ title: "¡Lección completada!", description: r.siguiente ? "Sigue con la próxima cuando quieras." : "Terminaste las lecciones: ahora el versículo y el examen final." });
      setLocation(r.siguiente ? `/academia/leccion/${r.siguiente}` : `/academia/materia/${l.materia.id}`);
    } catch (e: any) {
      toast({ title: "Todavía no", description: e.message, variant: "destructive" });
    } finally {
      setTerminando(false);
    }
  };

  return (
    <Layout>
      <article className="max-w-3xl mx-auto px-4 pt-6 pb-16" data-testid="leccion">
        <Link href={`/academia/materia/${l.materia.id}`} className="text-sm text-muted-foreground hover:underline inline-flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> {l.materia.titulo}
        </Link>
        <div className="mt-4 mb-2 flex items-center justify-between gap-3">
          <p className="data-label">Lección {l.leccion.n} de {l.leccion.de}</p>
          <Minutos min={l.leccion.minutos} />
        </div>
        <BarraAvance valor={l.leccion.n} de={l.leccion.de} />
        <h1 className="heading-display font-display text-3xl md:text-5xl mt-6 mb-2" data-testid="leccion-titulo">{l.leccion.titulo}</h1>
        <p className="text-sm text-muted-foreground mb-6">{l.leccion.base}</p>

        {!conSesion && l.publica && (
          <div className="glass-card p-4 mb-6 text-sm">Estás leyendo una lección abierta. <a href={loginUrl()} className="text-orange-600 dark:text-orange-300 font-medium hover:underline">Entra o crea tu cuenta</a> para guardar tu avance y recibir tu certificado.</div>
        )}
        {l.docente && (
          <div className="glass-card p-4 mb-6 text-sm flex items-start gap-3 border border-sky-500/30" role="note" data-testid="leccion-vista-docente">
            <Eye className="w-5 h-5 text-sky-600 shrink-0" />
            <span><strong>Vista de la Administración.</strong> Lees la lección sin estar inscrito, para revisarla: puedes responder el repaso, pero no se guarda nada. Para cursarla como alumno, inscríbete en la materia.</span>
          </div>
        )}

        <section className="glass-card p-5 mb-8">
          <p className="data-label mb-2 flex items-center gap-1.5"><Target className="w-3.5 h-3.5" /> Al terminar esta lección podrás</p>
          <ul className="space-y-1.5">{l.objetivos.map((o) => <li key={o} className="flex gap-2 text-[15px]"><span className="text-orange-500">•</span>{o}</li>)}</ul>
        </section>

        <section className="mb-6">
          <p className="data-label mb-2">Para empezar</p>
          <p className="text-lg leading-8 italic">{l.paraEmpezar}</p>
        </section>

        <section>{l.bloques.map((b, i) => <BloqueLeccion key={i} b={b} alVerVideo={i === videoQueCuenta ? alVerVideo : undefined} />)}</section>

        <section className="my-10 rounded-2xl p-6 text-center bg-gradient-to-br from-orange-500/15 to-amber-400/10 border border-orange-500/20" data-testid="idea-clave">
          <p className="data-label mb-2 flex justify-center items-center gap-1.5"><Lightbulb className="w-4 h-4" /> La idea clave</p>
          <p className="font-display text-xl md:text-2xl font-semibold leading-snug">{l.ideaClave}</p>
        </section>

        <section className="mb-10">
          <h2 className="font-display text-2xl font-bold mb-2 flex items-center gap-2"><PenLine className="w-5 h-5 text-orange-500" /> Para la vida</h2>
          <p className="text-[16px] leading-7 mb-3">{l.paraLaVida.texto}</p>
          <label className="block text-sm font-medium mb-2" htmlFor="reflexion">{l.paraLaVida.pregunta}</label>
          {conSesion && !l.docente ? (
            <>
              <Textarea id="reflexion" value={reflexion} onChange={(e) => setReflexion(e.target.value.slice(0, 2000))} rows={4} placeholder="Escribe aquí tu respuesta (solo tú la puedes ver)" />
              <div className="mt-2 flex items-center gap-3">
                <Button variant="outline" size="sm" onClick={guardar} disabled={guardando}><Save className="w-4 h-4 mr-1" /> Guardar mi nota</Button>
                <span className="text-xs text-muted-foreground">Es privada: no tiene nota ni la ve nadie más.</span>
              </div>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">Con tu cuenta puedes guardar tu respuesta en tu diario privado.</p>
          )}
        </section>

        <section className="mb-10" data-testid="repaso">
          <h2 className="font-display text-2xl font-bold mb-1 flex items-center gap-2"><ListChecks className="w-5 h-5 text-orange-500" /> Repaso</h2>
          <p className="text-sm text-muted-foreground mb-4">Responde bien cada pregunta para terminar la lección. Cuenta lo que aciertes a la primera.</p>
          {!repasoAbierto && bloqueo ? (
            <RepasoCerrado lectura={bloqueo.lectura} video={bloqueo.video} videoPide={bloqueo.videoPide} sinVideo={bloqueo.sinVideo} />
          ) : (
            <div className="space-y-4">
              {l.repaso.map((p, i) => (
                <PreguntaRepaso
                  key={p.id}
                  leccionId={l.leccion.id}
                  p={p}
                  n={i + 1}
                  alResponder={(ok) => {
                    if (ok) setBien((s) => new Set(s).add(p.id));
                  }}
                  alBloquear={(b) => setBloqueo(b)}
                />
              ))}
            </div>
          )}
        </section>

        <div className="flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center">
          {l.anterior ? (
            <Link href={`/academia/leccion/${l.anterior}`}><Button variant="outline" className="w-full sm:w-auto"><ArrowLeft className="w-4 h-4 mr-1" /> Lección anterior</Button></Link>
          ) : <span />}
          {conSesion && l.docente ? (
            <Link href={materia}><Button variant="outline" size="lg" className="h-12 w-full">Volver a la materia</Button></Link>
          ) : conSesion && !l.matriculado ? (
            <Link href={enlaceInscripcion(materia)}>
              <Button size="lg" className="fire-btn-primary h-12 w-full" data-testid="leccion-inscribirme-academia">Inscribirme para guardar mi avance <ArrowRight className="w-4 h-4 ml-2" /></Button>
            </Link>
          ) : conSesion && !l.inscrita ? (
            <Button size="lg" className="fire-btn-primary h-12" onClick={inscribir} disabled={terminando} data-testid="leccion-inscribirme-materia">
              {terminando ? "Inscribiendo…" : "Inscribirme en esta materia"} <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : conSesion ? (
            <Button size="lg" className="fire-btn-primary h-12" onClick={terminar} disabled={!todas || terminando} data-testid="leccion-completar">
              {completada ? "Seguir" : "Completar lección"} <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <a href={loginUrl()}><Button size="lg" className="fire-btn-primary h-12 w-full">Entrar para guardar mi avance</Button></a>
          )}
        </div>
        {conSesion && !l.docente && !l.matriculado && (
          <p className="text-xs text-muted-foreground mt-2 text-right">Sin inscripción puedes leer esta lección y practicar el repaso; para completarla y guardar tu avance, inscríbete en la academia y en la materia.</p>
        )}
        {conSesion && !l.docente && l.matriculado && !l.inscrita && (
          <p className="text-xs text-muted-foreground mt-2 text-right">Esta lección se lee sin inscribirte; para completarla y seguir con las demás, inscríbete en la materia. Tu repaso no se pierde.</p>
        )}
        {conSesion && l.inscrita && l.matriculado && !todas && <p className="text-xs text-muted-foreground mt-2 text-right">Termina el repaso para continuar.</p>}
      </article>
    </Layout>
  );
}
