// El examen final de una materia: compromiso de honradez, Parte A objetiva con reloj, Parte B escrita con corrección
// automática y el resultado con la revisión completa (server/academia-examen.ts).
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import { AlertTriangle, ArrowLeft, CheckCircle2, ClipboardCheck, Clock, PenLine, ShieldCheck, Timer, XCircle } from "lucide-react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { APRUEBA, materiaPorId, type EscritaExamen, type PasoExamen, type PreguntaExamen, type ResultadoExamen } from "@shared/academia";
import { empezarExamen, entregarEscrita, pasoExamen, responderExamen, tiempoTexto, useExamen } from "@/components/academia/api";
import { Cargando, NotaMedalla, PantallaCerrada } from "@/components/academia/ui";

const LETRAS = ["A", "B", "C", "D", "E", "F"];

/** Cuenta hacia atrás desde `inicial` segundos; avisa una vez al llegar a cero. */
function useReloj(clave: string, inicial: number, alTerminar: () => void) {
  const [quedan, setQuedan] = useState(inicial);
  const fin = useRef(alTerminar);
  fin.current = alTerminar;
  useEffect(() => {
    setQuedan(inicial);
    const hasta = Date.now() + inicial * 1000;
    let avisado = false;
    const t = window.setInterval(() => {
      const s = Math.max(0, Math.round((hasta - Date.now()) / 1000));
      setQuedan(s);
      if (s === 0 && !avisado) {
        avisado = true;
        fin.current();
      }
    }, 250);
    return () => window.clearInterval(t);
  }, [clave, inicial]);
  return quedan;
}

function Reloj({ quedan, total }: { quedan: number; total: number }) {
  const r = 22;
  const c = 2 * Math.PI * r;
  const frac = total ? quedan / total : 0;
  const color = frac < 0.2 ? "#dc2626" : frac < 0.5 ? "#f59e0b" : "#ff7a1a";
  const mm = Math.floor(quedan / 60);
  const ss = String(quedan % 60).padStart(2, "0");
  return (
    <div className="relative w-14 h-14 shrink-0" role="timer" aria-label={`Quedan ${quedan} segundos`}>
      <svg viewBox="0 0 52 52" className="w-14 h-14 -rotate-90">
        <circle cx="26" cy="26" r={r} fill="none" stroke="currentColor" strokeOpacity=".15" strokeWidth="4" />
        <circle cx="26" cy="26" r={r} fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - frac)} />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold">{total >= 120 ? `${mm}:${ss}` : quedan}</span>
    </div>
  );
}

function Objetiva({ p, alResponder, ocupado }: { p: PreguntaExamen; alResponder: (k: number) => void; ocupado: boolean }) {
  const [elegida, setElegida] = useState<number | null>(null);
  useEffect(() => setElegida(null), [p.id]);
  const quedan = useReloj(p.id, p.quedan, () => alResponder(-1));
  return (
    <div data-testid="examen-objetiva">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div>
          <p className="data-label">Parte A · Pregunta {p.n} de {p.de}</p>
          <div className="w-48 h-1.5 rounded-full bg-muted mt-2 overflow-hidden"><div className="h-full bg-orange-500" style={{ width: `${(100 * (p.n - 1)) / p.de}%` }} /></div>
        </div>
        <Reloj quedan={quedan} total={p.segundos} />
      </div>
      <h2 className="text-xl md:text-2xl font-semibold leading-snug mb-5" data-testid="examen-pregunta">{p.texto}</h2>
      <div className="grid gap-2.5">
        {p.opciones.map((op, k) => (
          <button
            key={k}
            type="button"
            onClick={() => setElegida(k)}
            disabled={ocupado}
            className={`text-left rounded-xl border px-4 py-3.5 text-[16px] flex gap-3 items-start min-h-[52px] transition ${elegida === k ? "border-orange-500 bg-orange-500/10" : "border-border hover:border-orange-400"}`}
            data-opcion={k}
          >
            <span className={`w-7 h-7 shrink-0 rounded-full border flex items-center justify-center text-sm font-semibold ${elegida === k ? "bg-orange-500 text-white border-orange-500" : ""}`}>{LETRAS[k]}</span>
            <span className="pt-0.5">{op}</span>
          </button>
        ))}
      </div>
      <div className="mt-5 flex justify-end">
        <Button size="lg" className="fire-btn-primary h-12 px-8" disabled={elegida == null || ocupado} onClick={() => elegida != null && alResponder(elegida)} data-testid="examen-responder">
          Responder
        </Button>
      </div>
      <p className="text-xs text-muted-foreground mt-3">No se dice si acertaste hasta terminar el examen. Si se acaba el tiempo, la pregunta cuenta como no respondida.</p>
    </div>
  );
}

function Escrita({ e, alEntregar, ocupado }: { e: EscritaExamen; alEntregar: (texto: string, pegado: boolean) => void; ocupado: boolean }) {
  const [texto, setTexto] = useState("");
  const [pegado, setPegado] = useState(false);
  const ref = useRef({ texto, pegado });
  ref.current = { texto, pegado };
  useEffect(() => {
    setTexto("");
    setPegado(false);
  }, [e.id]);
  const quedan = useReloj(e.id, e.quedan, () => alEntregar(ref.current.texto, ref.current.pegado));
  const palabras = texto.trim() ? texto.trim().split(/\s+/).length : 0;
  return (
    <div data-testid="examen-escrita">
      <div className="flex items-center justify-between gap-3 mb-4">
        <p className="data-label">Parte B · Respuesta escrita {e.n} de {e.de}</p>
        <Reloj quedan={quedan} total={e.minutos * 60} />
      </div>
      <h2 className="text-xl md:text-2xl font-semibold leading-snug mb-4" data-testid="examen-pregunta-escrita">{e.texto}</h2>
      <Textarea
        value={texto}
        onChange={(ev) => setTexto(ev.target.value.slice(0, 3000))}
        onPaste={() => setPegado(true)}
        rows={7}
        placeholder="Escribe con tus palabras. Puedes citar versículos (por ejemplo, Efesios 2:8)."
        className="text-[16px] leading-7"
        data-testid="examen-texto"
      />
      <div className="flex flex-wrap items-center justify-between gap-2 mt-2 text-sm">
        <span className={palabras < e.min ? "text-orange-600 dark:text-orange-300" : palabras > e.max ? "text-orange-600 dark:text-orange-300" : "text-emerald-700 dark:text-emerald-300"}>
          {palabras} palabras · entre {e.min} y {e.max}
        </span>
        {pegado && <span className="text-xs text-orange-700 dark:text-orange-300 flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5" /> Pegaste texto: quedará para revisión.</span>}
      </div>
      <div className="mt-5 flex justify-end">
        <Button size="lg" className="fire-btn-primary h-12 px-8" disabled={ocupado || palabras < 3} onClick={() => alEntregar(texto, pegado)} data-testid="examen-entregar">
          Entregar respuesta
        </Button>
      </div>
      <p className="text-xs text-muted-foreground mt-3">La corrige el sistema al instante, idea por idea. Si queda dudosa, la revisa la Dirección académica.</p>
    </div>
  );
}

function Resultado({ r, materiaId }: { r: ResultadoExamen; materiaId: string }) {
  return (
    <div data-testid="examen-resultado">
      <div className="glass-card p-6 text-center">
        <p className="data-label mb-3">Resultado del examen</p>
        <div className="flex justify-center"><NotaMedalla nota={r.nota} medalla={r.medalla} grande /></div>
        <p className="text-sm text-muted-foreground mt-4">Parte A: {r.aciertos} de {r.de} ({r.objetiva}) · Parte B escrita: {r.escrita}</p>
        {r.materia && (
          <div className={`mt-5 rounded-xl p-4 ${r.materia.aprobada ? "bg-emerald-500/10" : "bg-orange-500/10"}`}>
            {r.materia.aprobada ? (
              <p className="font-semibold flex justify-center items-center gap-2 text-emerald-700 dark:text-emerald-300"><CheckCircle2 className="w-5 h-5" /> ¡Aprobaste la materia con {r.materia.nota}!</p>
            ) : (
              <>
                <p className="font-semibold">Tu nota de la materia es {r.materia.nota}: se aprueba con {APRUEBA}.</p>
                <p className="text-sm mt-1">Repasa lo que falló y vuelve a intentarlo {r.espera ? `en ${tiempoTexto(r.espera)}` : "cuando quieras"}: el próximo intento trae otras preguntas.</p>
              </>
            )}
          </div>
        )}
        <div className="mt-5"><Link href={`/academia/materia/${materiaId}`}><Button variant="outline">Volver a la materia</Button></Link></div>
      </div>

      <h3 className="font-display text-2xl font-bold mt-10 mb-4">Revisión de la parte A</h3>
      <ol className="space-y-3">
        {r.revision.map((x, i) => (
          <li key={i} className="glass-card p-4" data-testid="revision-objetiva">
            <p className="font-medium mb-2 flex gap-2">{x.bien ? <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" /> : <XCircle className="w-5 h-5 text-red-500 shrink-0" />}<span>{i + 1}. {x.texto}</span></p>
            <ul className="space-y-1 text-sm ml-7">
              {x.opciones.map((op, k) => (
                <li key={k} className={k === x.correcta ? "text-emerald-700 dark:text-emerald-300 font-medium" : k === x.elegida ? "text-red-600 line-through" : "text-muted-foreground"}>
                  {LETRAS[k]}. {op}{k === x.correcta ? " ✓" : ""}
                </li>
              ))}
            </ul>
            {x.elegida < 0 && <p className="text-xs text-orange-700 dark:text-orange-300 ml-7 mt-1">{x.tarde ? "Se acabó el tiempo." : "No respondida."}</p>}
            <p className="text-sm mt-2 ml-7">{x.explica} <span className="text-muted-foreground">({x.ref})</span></p>
          </li>
        ))}
      </ol>

      {r.escritas.length > 0 && (
        <>
          <h3 className="font-display text-2xl font-bold mt-10 mb-4">Revisión de la parte B</h3>
          {r.escritas.map((w, i) => (
            <div key={i} className="glass-card p-5 mb-4" data-testid="revision-escrita">
              <p className="font-medium mb-2">{w.pregunta}</p>
              <blockquote className="border-l-4 border-orange-500/50 pl-3 text-[15px] italic mb-3 whitespace-pre-wrap">{w.texto || "(sin respuesta)"}</blockquote>
              <p className="font-semibold mb-2">Nota: {w.nota} <span className="text-muted-foreground font-normal">· {w.palabras} palabras</span></p>
              <ul className="space-y-1 text-sm mb-2">
                {w.ideas.map((idea) => (
                  <li key={idea.texto} className="flex items-start gap-2">{idea.ok ? <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" /> : <XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />}<span>{idea.texto}</span></li>
                ))}
                {w.cita.pedida && (
                  <li className="flex items-start gap-2">{w.cita.valida ? <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" /> : <XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />}<span>Una cita bíblica que lo enseñe{w.cita.encontrada ? `: ${w.cita.encontrada}` : ""}</span></li>
                )}
              </ul>
              {w.avisos.map((a) => <p key={a} className="text-sm text-orange-700 dark:text-orange-300">{a}</p>)}
              {w.revisar && <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> Quedó para que la revise la Dirección académica; la nota puede cambiar.</p>}
              {w.modelo && <p className="text-sm mt-3"><span className="font-semibold">Una respuesta modelo:</span> {w.modelo}</p>}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default function AcademiaExamen() {
  const { materiaId } = useParams<{ materiaId: string }>();
  const qc = useQueryClient();
  const q = useExamen(materiaId);
  const [paso, setPaso] = useState<PasoExamen | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [ocupado, setOcupado] = useState(false);
  const [compromiso, setCompromiso] = useState(false);
  const [verUltimo, setVerUltimo] = useState(false);
  const def = materiaId ? materiaPorId(materiaId) : undefined;

  // Al volver a la página con un examen en curso, retomarlo donde quedó.
  useEffect(() => {
    if (q.data?.estado.enCurso && !paso) {
      pasoExamen(materiaId!).then(setPaso).catch((e) => setError(e.message));
    }
  }, [q.data?.estado.enCurso]);

  useEffect(() => {
    if (paso?.paso === "fin") void qc.invalidateQueries({ queryKey: ["academia"] });
    window.scrollTo({ top: 0 });
  }, [paso?.paso === "fin" ? "fin" : paso?.paso === "objetiva" ? paso.pregunta.id : paso?.paso === "escrita" ? paso.escrita.id : ""]);

  if (q.isLoading) return <Cargando />;
  if (q.error?.status === 403) return <PantallaCerrada mensaje={q.error.message} />;
  if (!q.data || !def) {
    return (
      <Layout>
        <div className="max-w-xl mx-auto px-4 py-20 text-center">
          <p className="text-lg mb-5">{q.error?.message ?? "No se encontró el examen."}</p>
          <Link href="/academia"><Button variant="outline">Volver a la academia</Button></Link>
        </div>
      </Layout>
    );
  }
  const { estado, ultimo } = q.data;
  const medida = estado.medida;

  const accion = async (fn: () => Promise<PasoExamen>) => {
    if (ocupado) return;
    setOcupado(true);
    setError(null);
    try {
      setPaso(await fn());
    } catch (e: any) {
      setError(e.message);
      void q.refetch();
    } finally {
      setOcupado(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-16">
        <Link href={`/academia/materia/${def.id}`} className="text-sm text-muted-foreground hover:underline inline-flex items-center gap-1"><ArrowLeft className="w-4 h-4" /> {def.titulo}</Link>
        <h1 className="heading-display font-display text-3xl md:text-4xl mt-4 mb-6 flex items-center gap-3"><ClipboardCheck className="w-8 h-8 text-orange-500" /> Examen final</h1>

        {error && <div className="glass-card p-4 mb-5 border border-orange-500/40 text-sm" role="alert">{error}</div>}

        {paso?.paso === "objetiva" && <Objetiva p={paso.pregunta} ocupado={ocupado} alResponder={(k) => accion(() => responderExamen(def.id, k))} />}
        {paso?.paso === "escrita" && <Escrita e={paso.escrita} ocupado={ocupado} alEntregar={(t, pg) => accion(() => entregarEscrita(def.id, t, pg))} />}
        {paso?.paso === "fin" && <Resultado r={paso.resultado} materiaId={def.id} />}

        {!paso && !estado.enCurso && (
          <div className="space-y-5" data-testid="examen-inicio">
            {estado.aprobado ? (
              <div className="glass-card p-5"><p className="font-semibold flex items-center gap-2 text-emerald-700 dark:text-emerald-300"><CheckCircle2 className="w-5 h-5" /> Ya aprobaste esta materia.</p></div>
            ) : (
              <div className="glass-card p-5">
                <h2 className="font-semibold text-lg mb-3">Antes de empezar</h2>
                <ul className="space-y-2 text-[15px]">
                  <li className="flex gap-2"><Timer className="w-4 h-4 mt-1 text-orange-500 shrink-0" />Parte A: {medida.objetivas} preguntas, una por pantalla, con {medida.segundos} segundos cada una.</li>
                  <li className="flex gap-2"><PenLine className="w-4 h-4 mt-1 text-orange-500 shrink-0" />Parte B: {medida.escritas === 1 ? "una respuesta escrita" : `${medida.escritas} respuestas escritas`} con tus palabras, {medida.minutosEscrita} minutos cada una.</li>
                  <li className="flex gap-2"><Clock className="w-4 h-4 mt-1 text-orange-500 shrink-0" />Hazlo con tiempo y sin interrupciones: el reloj sigue aunque cierres la página.</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 mt-1 text-orange-500 shrink-0" />Se aprueba con {APRUEBA}. Al terminar verás la revisión completa, con la explicación de cada pregunta.</li>
                </ul>
                {estado.falta.length > 0 && <p className="mt-4 text-sm text-orange-700 dark:text-orange-300">Para darlo te falta {estado.falta.join(" y ")}.</p>}
                {estado.espera > 0 && <p className="mt-4 text-sm text-orange-700 dark:text-orange-300">Podrás intentarlo otra vez en {tiempoTexto(estado.espera)}.</p>}
                {estado.repasar.length > 0 && <p className="mt-4 text-sm text-orange-700 dark:text-orange-300">Antes de intentarlo otra vez, vuelve a leer las lecciones de la materia.</p>}
                {!estado.falta.length && !estado.espera && !estado.repasar.length && (
                  <>
                    <label className="mt-5 flex items-start gap-3 rounded-xl border border-border p-4 cursor-pointer" data-testid="examen-compromiso">
                      <Checkbox checked={compromiso} onCheckedChange={(v) => setCompromiso(v === true)} className="mt-0.5" />
                      <span className="text-[15px]">
                        <strong>Compromiso de honradez.</strong> Haré este examen yo solo, sin ayuda de otras personas ni copiar, de corazón, como para el Señor y no para los hombres (Colosenses 3:23).
                      </span>
                    </label>
                    <Button size="lg" className="fire-btn-primary h-12 px-8 mt-4" disabled={!compromiso || ocupado} onClick={() => accion(() => empezarExamen(def.id))} data-testid="examen-empezar">
                      Empezar el examen
                    </Button>
                  </>
                )}
                <p className="text-xs text-muted-foreground mt-4">Intentos: {estado.intentos}{estado.mejor != null ? ` · Mejor nota: ${estado.mejor}` : ""}</p>
              </div>
            )}
            {ultimo && (
              <div>
                <Button variant="outline" onClick={() => setVerUltimo(!verUltimo)}>{verUltimo ? "Ocultar" : "Ver"} la revisión del último intento</Button>
                {verUltimo && <div className="mt-6"><Resultado r={ultimo} materiaId={def.id} /></div>}
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
