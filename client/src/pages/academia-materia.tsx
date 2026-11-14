// Una materia de la academia. Sin inscripción, su presentación: lo que se aprende, cómo es, cómo se evalúa y para quién
// es, con «Inscribirme en esta materia». Inscrito: sus lecciones, el versículo de memoria, el examen final y la nota.
import { useState } from "react";
import { Link, useParams } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft, ArrowRight, Award, BookMarked, BookOpen, CheckCircle2, Circle, ClipboardCheck, ExternalLink, Eye, GraduationCap, Info, Library, Lock, RotateCcw,
  Sparkles, Target, Timer, Users, Video,
} from "lucide-react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { loginUrl } from "@/lib/login-redirect";
import { APRUEBA, NIVELES, NOMBRE_COMPONENTE, examenDe, leccionPublica, materiaPorId, type MateriaDetalle, type Pesos } from "@shared/academia";
import {
  inscribirmeEnMateria, responderVersiculo, tiempoTexto, useMateria, versiculoEstudio, versiculoPractica, type VersiculoEstudio, type VersiculoPractica,
} from "@/components/academia/api";
import { AvisoInscripcion, AvisoVistaPrevia, BarraAvance, Cargando, ChipEstado, Minutos, NotaMedalla, PantallaCerrada, enlaceInscripcion } from "@/components/academia/ui";
import { AsignacionDeMateria } from "@/components/academia/asignaciones";

const BLOOM: Record<string, string> = { recordar: "Recordar", comprender: "Comprender", aplicar: "Aplicar", analizar: "Analizar", evaluar: "Evaluar", crear: "Crear" };

function Versiculo({ materiaId, estado }: { materiaId: string; estado: NonNullable<MateriaDetalle["versiculo"]> }) {
  const qc = useQueryClient();
  const [fase, setFase] = useState<"inicio" | "estudio" | "practica" | "bien">(estado.aprendido ? "bien" : "inicio");
  const [estudio, setEstudio] = useState<VersiculoEstudio | null>(null);
  const [practica, setPractica] = useState<VersiculoPractica | null>(null);
  const [elegidas, setElegidas] = useState<string[]>([]);
  const [aviso, setAviso] = useState<string | null>(null);
  const [puntaje, setPuntaje] = useState<number | null>(estado.puntaje);
  const [ocupado, setOcupado] = useState(false);

  const estudiar = async () => {
    setOcupado(true);
    setAviso(null);
    try {
      setEstudio(await versiculoEstudio(materiaId));
      setFase("estudio");
    } catch (e: any) {
      setAviso(e.message);
    } finally {
      setOcupado(false);
    }
  };
  const practicar = async () => {
    setOcupado(true);
    setAviso(null);
    try {
      setPractica(await versiculoPractica(materiaId));
      setElegidas([]);
      setFase("practica");
    } catch (e: any) {
      setAviso(e.message);
    } finally {
      setOcupado(false);
    }
  };
  const comprobar = async () => {
    setOcupado(true);
    try {
      const r = await responderVersiculo(materiaId, elegidas);
      if (r.bien) {
        setPuntaje(r.puntaje);
        setFase("bien");
        void qc.invalidateQueries({ queryKey: ["academia"] });
      } else {
        setAviso(r.hasta > 0 ? `Vas bien hasta la ficha ${r.hasta}. Revisa el orden desde ahí.` : "Revisa el orden desde el principio.");
        setElegidas(elegidas.slice(0, r.hasta));
      }
    } catch (e: any) {
      setAviso(e.message);
    } finally {
      setOcupado(false);
    }
  };
  const fichas = practica?.fichas ?? [];
  const texto = (id: string) => fichas.find((f) => f.id === id)?.t ?? "";
  const libres = fichas.filter((f) => !elegidas.includes(f.id));

  return (
    <div className="glass-card p-5" data-testid="versiculo-memoria">
      <h3 className="font-semibold flex items-center gap-2 mb-1"><Sparkles className="w-4 h-4 text-orange-500" /> Versículo de memoria · {estado.ref}</h3>
      {fase === "inicio" && (
        <>
          <p className="text-sm text-muted-foreground mb-4">Primero lo lees varias veces en voz alta; después lo armas en orden, sin mirarlo.</p>
          <Button onClick={estudiar} disabled={ocupado} className="fire-btn-primary" data-testid="versiculo-estudiar">Estudiar el versículo</Button>
        </>
      )}
      {fase === "estudio" && estudio && (
        <>
          <blockquote className="accent-serif text-xl leading-8 my-4">{estudio.texto}</blockquote>
          <p className="text-sm text-muted-foreground mb-4">Léelo tres veces en voz alta. Cuando estés listo, ármalo sin mirar.</p>
          <Button onClick={practicar} disabled={ocupado} className="fire-btn-primary" data-testid="versiculo-practicar">Ya lo leí: armarlo</Button>
        </>
      )}
      {fase === "practica" && (
        <>
          <p className="text-sm text-muted-foreground mt-1 mb-3">Toca las fichas en el orden correcto. Toca una ficha de arriba para quitarla.</p>
          <div className="min-h-[56px] rounded-xl border border-dashed border-orange-500/40 p-2 flex flex-wrap gap-2 mb-3" data-testid="versiculo-armado">
            {elegidas.map((id) => (
              <button key={id} type="button" onClick={() => setElegidas(elegidas.filter((x) => x !== id))} className="rounded-lg px-3 py-2 text-sm bg-orange-500/15 hover:bg-orange-500/25">
                {texto(id)}
              </button>
            ))}
            {!elegidas.length && <span className="text-sm text-muted-foreground px-1 py-2">Tu versículo aparecerá aquí.</span>}
          </div>
          <div className="flex flex-wrap gap-2 mb-4" data-testid="versiculo-fichas">
            {libres.map((f) => (
              <button key={f.id} type="button" onClick={() => setElegidas([...elegidas, f.id])} className="rounded-lg px-3 py-2 text-sm border border-border hover:border-orange-500" data-ficha={f.id}>
                {f.t}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={comprobar} disabled={ocupado || elegidas.length !== fichas.length} className="fire-btn-primary" data-testid="versiculo-comprobar">Comprobar</Button>
            <Button variant="outline" onClick={estudiar} disabled={ocupado}>Volver a leerlo</Button>
          </div>
        </>
      )}
      {fase === "bien" && (
        <div className="mt-2">
          <p className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-medium"><CheckCircle2 className="w-5 h-5" /> ¡Lo aprendiste!{puntaje != null ? ` Puntaje: ${puntaje}.` : ""}</p>
          <p className="text-sm text-muted-foreground mt-1">Volverá a pedirse en unos días para que no se olvide.</p>
          <Button variant="outline" size="sm" className="mt-3" onClick={estudiar} disabled={ocupado}><RotateCcw className="w-4 h-4 mr-1" /> Repasarlo</Button>
        </div>
      )}
      {aviso && <p className="text-sm mt-3 text-orange-700 dark:text-orange-300" role="status">{aviso}</p>}
    </div>
  );
}

function Nota({ d }: { d: MateriaDetalle }) {
  const filas = (Object.keys(d.pesos) as (keyof Pesos)[]).filter((k) => d.pesos[k] > 0);
  return (
    <div className="glass-card p-5">
      <h3 className="font-semibold flex items-center gap-2 mb-3"><ClipboardCheck className="w-4 h-4 text-orange-500" /> Cómo sale tu nota</h3>
      <table className="w-full text-sm">
        <tbody>
          {filas.map((k) => (
            <tr key={k} className="border-b border-border/60 last:border-0">
              <td className="py-2">{NOMBRE_COMPONENTE[k]}</td>
              <td className="py-2 text-muted-foreground text-right">{d.pesos[k]} %</td>
              <td className="py-2 text-right font-semibold w-16">{d.componentes[k] != null && d.inscrita ? d.componentes[k] : "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-xs text-muted-foreground mt-3">Se aprueba con {APRUEBA} de nota y el examen final aprobado. Repasos: 60 por hacerlos todos y hasta 40 más por los aciertos a la primera.</p>
    </div>
  );
}

const fechaLarga = (iso: string) => new Date(iso).toLocaleDateString("es", { day: "numeric", month: "long", year: "numeric" });

/** La presentación de la materia: lo que se aprende, cómo es, cómo se evalúa y para quién es (antes de inscribirse). */
function Presentacion({ d }: { d: MateriaDetalle }) {
  const m = d.materia;
  const def = materiaPorId(m.id);
  const medida = def ? examenDe(def) : null;
  const minutos = m.lecciones.reduce((a, l) => a + l.minutos, 0);
  const nivel = m.nivel ? NIVELES[m.nivel - 1] : null;
  return (
    <section className="space-y-5" data-testid="materia-presentacion">
      <div>
        <p className="data-label text-orange-600 dark:text-orange-300">Presentación de la materia</p>
        <h2 className="font-display text-2xl md:text-3xl font-bold mt-1">Lo que vas a aprender</h2>
      </div>
      {m.silabo && (
        <div className="glass-card p-5">
          <p className="text-[15px] leading-7 mb-4">{m.silabo.proposito}</p>
          <ul className="space-y-2.5">
            {m.silabo.objetivos.map((o) => (
              <li key={o.id} className="flex items-start gap-2.5 text-[15px]"><CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" /><span>{o.texto}</span></li>
            ))}
          </ul>
        </div>
      )}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="glass-card p-5">
          <BookOpen className="w-6 h-6 text-orange-500" />
          <p className="font-semibold mt-2">{m.lecciones.length} lecciones</p>
          <p className="text-sm text-muted-foreground mt-1">Cortas, de unos {Math.round(minutos / Math.max(1, m.lecciones.length))} minutos cada una (unos {minutos} en total), con lectura de la Biblia y un repaso al final.</p>
        </div>
        {m.memoria && (
          <div className="glass-card p-5">
            <Sparkles className="w-6 h-6 text-orange-500" />
            <p className="font-semibold mt-2">Versículo de memoria</p>
            <p className="text-sm text-muted-foreground mt-1">{m.memoria}: lo lees varias veces y después lo armas sin mirar.</p>
          </div>
        )}
        {medida && (
          <div className="glass-card p-5">
            <ClipboardCheck className="w-6 h-6 text-orange-500" />
            <p className="font-semibold mt-2">Examen final</p>
            <p className="text-sm text-muted-foreground mt-1">
              {medida.objetivas} preguntas con reloj y {medida.escritas === 1 ? "una respuesta escrita" : `${medida.escritas} respuestas escritas`} desde tu celular,
              con corrección automática. Se aprueba con {APRUEBA}.
            </p>
          </div>
        )}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Nota d={d} />
        <div className="glass-card p-5 space-y-4">
          {nivel && (
            <div>
              <h3 className="font-semibold flex items-center gap-2"><Users className="w-4 h-4 text-orange-500" /> Para quién es</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {nivel.para}. Es una materia del Nivel {nivel.n} · {nivel.nombre}
                {d.requisitos.length ? `; para inscribirte hace falta ${d.requisitos.join(" y ")}.` : nivel.n === 1 ? ", sin requisitos previos." : "."}
              </p>
            </div>
          )}
          <div>
            <h3 className="font-semibold flex items-center gap-2"><Award className="w-4 h-4 text-orange-500" /> Lo que recibes</h3>
            <p className="text-sm text-muted-foreground mt-1">Al aprobarla, el certificado de la materia, con un código QR que cualquiera puede verificar.</p>
          </div>
          <div>
            <h3 className="font-semibold flex items-center gap-2"><GraduationCap className="w-4 h-4 text-orange-500" /> A tu ritmo</h3>
            <p className="text-sm text-muted-foreground mt-1">Estudias cuando puedas, desde el teléfono o la computadora. Te recomendamos llevar una o dos materias a la vez.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AcademiaMateria() {
  const { materiaId } = useParams<{ materiaId: string }>();
  const qc = useQueryClient();
  const q = useMateria(materiaId);
  const [inscribiendo, setInscribiendo] = useState(false);
  const [aviso, setAviso] = useState<string | null>(null);
  const [recien, setRecien] = useState(false);
  if (q.isLoading) return <Cargando />;
  if (q.error?.status === 403) return <PantallaCerrada mensaje={q.error.message} />;
  if (!q.data) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <p className="text-lg mb-4">{q.error?.message ?? "No se encontró la materia."}</p>
          <Link href="/academia"><Button variant="outline"><ArrowLeft className="w-4 h-4 mr-1" /> Volver a la academia</Button></Link>
        </div>
      </Layout>
    );
  }
  const d = q.data;
  const m = d.materia;
  const def = materiaPorId(m.id);
  const hechas = m.lecciones.filter((l) => l.completada).length;
  const siguiente = m.lecciones.find((l) => !l.completada);
  const medida = def ? examenDe(def) : null;
  const ex = d.examen;
  const inscrito = !!d.inscrita;
  const verLecciones = inscrito || d.docente;
  const primera = m.lecciones[0] && leccionPublica(m.lecciones[0].id) ? m.lecciones[0] : null;
  const aqui = `/academia/materia/${m.id}`;

  const inscribir = async () => {
    setInscribiendo(true);
    setAviso(null);
    try {
      await inscribirmeEnMateria(m.id);
      await qc.invalidateQueries({ queryKey: ["academia"] });
      setRecien(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e: any) {
      setAviso(e.message);
    } finally {
      setInscribiendo(false);
    }
  };

  return (
    <Layout>
      <section className="relative overflow-hidden section-aurora pt-10 pb-12">
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <Link href="/academia" className="text-sm text-muted-foreground hover:underline inline-flex items-center gap-1"><ArrowLeft className="w-4 h-4" /> Academia</Link>
          <p className="data-label mt-5">{m.nivel ? `Nivel ${m.nivel}` : "Especialidad"} · Materia {m.orden}</p>
          <h1 className="heading-display font-display text-3xl md:text-5xl mt-2 mb-3" data-testid="materia-titulo">{m.titulo}</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">{m.resumen}</p>
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <ChipEstado estado={d.estado} />
            {m.lecciones.length > 0 && <span className="text-sm text-muted-foreground">{m.lecciones.length} lecciones · unos {m.lecciones.reduce((a, l) => a + l.minutos, 0)} minutos</span>}
            {m.memoria && <span className="text-sm text-muted-foreground">Versículo: {m.memoria}</span>}
          </div>
          {d.estado === "aprobada" && d.nota != null && <div className="mt-5"><NotaMedalla nota={d.nota} medalla={d.medalla} grande /></div>}
          {m.disponible && inscrito && m.lecciones.length > 0 && (
            <div className="mt-5 max-w-md"><BarraAvance valor={hechas} de={m.lecciones.length} etiqueta={`${hechas} de ${m.lecciones.length} lecciones`} /></div>
          )}
          <AsignacionDeMateria materiaId={m.id} activo={!!d.conSesion} />
          {recien && (
            <p className="mt-5 glass-card p-4 border border-emerald-500/30 text-sm flex items-start gap-2 max-w-2xl" role="status" data-testid="materia-inscrita-aviso">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>¡Listo! Ya estás inscrito en «{m.titulo}». Empieza por la primera lección: al terminar cada una, responde su repaso.</span>
            </p>
          )}
          <div className="mt-6 flex flex-wrap gap-3">
            {d.certificado && (
              <Link href={`/academia/certificado/${d.certificado}`}>
                <Button size="lg" className="fire-btn-primary h-12" data-testid="materia-certificado"><Award className="w-4 h-4 mr-2" /> Ver tu certificado</Button>
              </Link>
            )}
            {m.disponible && inscrito && siguiente && (
              <Link href={`/academia/leccion/${siguiente.id}`}>
                <Button size="lg" className="fire-btn-primary h-12" data-testid="materia-continuar">{hechas ? "Continuar" : "Empezar"}: {siguiente.titulo} <ArrowRight className="w-4 h-4 ml-2" /></Button>
              </Link>
            )}
            {m.disponible && !inscrito && (
              !d.conSesion ? (
                <a href={loginUrl(aqui)}><Button size="lg" className="fire-btn-primary h-12" data-testid="materia-entrar">Entrar para inscribirme</Button></a>
              ) : !d.matriculado ? (
                <Link href={enlaceInscripcion(aqui)}>
                  <Button size="lg" className="fire-btn-primary h-12" data-testid="materia-inscribirme-academia">Inscribirme en la academia <ArrowRight className="w-4 h-4 ml-2" /></Button>
                </Link>
              ) : (
                <Button size="lg" className="fire-btn-primary h-12" onClick={inscribir} disabled={inscribiendo || d.requisitos.length > 0} data-testid="materia-inscribirme">
                  {inscribiendo ? "Inscribiendo…" : "Inscribirme en esta materia"}
                </Button>
              )
            )}
            {m.disponible && !inscrito && primera && (
              <Link href={`/academia/leccion/${primera.id}`}>
                <Button variant="outline" size="lg" className="h-12" data-testid="materia-primera-gratis"><BookOpen className="w-4 h-4 mr-2" /> Leer la primera lección</Button>
              </Link>
            )}
          </div>
          {m.disponible && !inscrito && d.conSesion && !d.matriculado && (
            <p className="text-sm text-muted-foreground mt-3 max-w-2xl">Primero te inscribes en la academia (unos 2 minutos) y después, aquí mismo, en la materia. Ambas quedan aprobadas al instante.</p>
          )}
          {m.disponible && !inscrito && d.requisitos.length > 0 && d.matriculado && (
            <p className="text-sm text-orange-700 dark:text-orange-300 mt-3">Para inscribirte te falta {d.requisitos.join(" y ")}.</p>
          )}
          {aviso && <p className="text-sm text-orange-700 dark:text-orange-300 mt-3" role="alert">{aviso}</p>}
          {inscrito && d.inscrita && <p className="text-xs text-muted-foreground mt-4" data-testid="materia-inscrita-desde">Inscrito desde el {fechaLarga(d.inscrita)}.</p>}
        </div>
      </section>

      {d.vistaPrevia && <AvisoVistaPrevia />}

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        {!m.disponible && (
          <div className="glass-card p-5 flex items-start gap-3"><Info className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" /><p className="text-sm">Esta materia está en preparación: su contenido se está escribiendo y revisando. Estas son sus lecciones.</p></div>
        )}
        {m.disponible && !inscrito && d.docente && (
          <div className="glass-card p-4 flex items-start gap-3 border border-sky-500/30" role="note" data-testid="materia-vista-docente">
            <Eye className="w-5 h-5 text-sky-600 mt-0.5 shrink-0" />
            <p className="text-sm">
              <strong>Vista docente.</strong> Como Dirección académica o profesor, puedes leer todas las lecciones sin inscribirte; no se guarda tu avance. Para
              cursarla como alumno, inscríbete en la materia.
            </p>
          </div>
        )}

        {m.disponible && !inscrito && <Presentacion d={d} />}

        {/* Lecciones */}
        <section>
          <h2 className="font-display text-2xl font-bold mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-orange-500" /> Lecciones</h2>
          <ol className="space-y-2">
            {m.lecciones.map((l, i) => {
              const abre = m.disponible && (verLecciones || (primera?.id === l.id));
              const fila = (
                <div className={`glass-card p-4 flex items-center gap-3 ${abre ? "" : "opacity-80"}`} data-testid={`leccion-${l.id}`}>
                  {l.completada ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  ) : abre ? (
                    <Circle className="w-5 h-5 text-muted-foreground shrink-0" />
                  ) : (
                    <Lock className="w-5 h-5 text-muted-foreground shrink-0" aria-label="Se abre al inscribirte" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{i + 1}. {l.titulo}</p>
                    <p className="text-xs text-muted-foreground">{l.base}</p>
                  </div>
                  {!inscrito && primera?.id === l.id && <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300 shrink-0">Abierta</span>}
                  <Minutos min={l.minutos} />
                </div>
              );
              return <li key={l.id}>{abre ? <Link href={`/academia/leccion/${l.id}`} className="block">{fila}</Link> : fila}</li>;
            })}
          </ol>
          {m.disponible && !inscrito && !d.docente && <p className="text-xs text-muted-foreground mt-2">Las lecciones se abren al inscribirte en la materia.</p>}
        </section>

        {m.disponible && inscrito && d.versiculo && d.matriculado && <Versiculo materiaId={m.id} estado={d.versiculo} />}
        {m.disponible && inscrito && d.versiculo && !d.matriculado && (
          <AvisoInscripcion
            texto={`Versículo de memoria · ${d.versiculo.ref}. Para practicarlo y guardar tu puntaje, completa tu inscripción en la academia.`}
            volver={aqui}
            boton="Completar mi inscripción"
          />
        )}

        {/* Examen final */}
        {m.disponible && inscrito && medida && (
          <section className="glass-card p-5" data-testid="materia-examen">
            <h2 className="font-display text-xl font-bold mb-2 flex items-center gap-2"><ClipboardCheck className="w-5 h-5 text-orange-500" /> Examen final</h2>
            <ul className="text-sm text-muted-foreground space-y-1 mb-4">
              <li>Parte A: {medida.objetivas} preguntas objetivas, {medida.segundos} segundos cada una, repartidas por todas las lecciones.</li>
              <li>Parte B: {medida.escritas === 1 ? `una respuesta escrita desde tu celular (${medida.minutosEscrita} minutos)` : `${medida.escritas} respuestas escritas desde tu celular (${medida.minutosEscrita} minutos cada una)`}, con corrección automática.</li>
              <li>Pesa {medida.pesoObjetiva} % la parte objetiva y {100 - medida.pesoObjetiva} % la escrita. Se aprueba con {APRUEBA}.</li>
            </ul>
            {ex ? (
              <>
                {ex.aprobado ? (
                  <p className="text-emerald-700 dark:text-emerald-300 font-medium flex items-center gap-2"><CheckCircle2 className="w-5 h-5" /> Aprobaste el examen y la materia.</p>
                ) : ex.falta.length ? (
                  <p className="text-sm">Para darlo te falta {ex.falta.join(" y ")}.</p>
                ) : ex.espera > 0 ? (
                  <p className="text-sm flex items-center gap-2"><Timer className="w-4 h-4" /> Podrás intentarlo otra vez en {tiempoTexto(ex.espera)}. Aprovecha para repasar.</p>
                ) : ex.repasar.length ? (
                  <p className="text-sm">Antes de intentarlo otra vez, vuelve a leer {ex.repasar.length === 1 ? "una lección" : `${ex.repasar.length} lecciones`} de la materia.</p>
                ) : null}
                <p className="text-xs text-muted-foreground mt-2">Intentos: {ex.intentos}{ex.mejor != null ? ` · Mejor nota: ${ex.mejor}` : ""}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link href={`/academia/examen/${m.id}`}>
                    <Button className="fire-btn-primary" data-testid="materia-ir-examen" disabled={!ex.enCurso && !ex.aprobado && (ex.falta.length > 0 || ex.espera > 0)}>
                      {ex.enCurso ? "Seguir con el examen" : ex.aprobado || ex.intentos ? "Ver el examen" : "Ir al examen"}
                    </Button>
                  </Link>
                </div>
              </>
            ) : (
              <p className="text-sm">Entra con tu cuenta para dar el examen.</p>
            )}
          </section>
        )}

        {m.disponible && inscrito && <Nota d={d} />}

        {/* Sílabo */}
        {m.silabo && (
          <section>
            <h2 className="font-display text-2xl font-bold mb-4 flex items-center gap-2"><BookMarked className="w-5 h-5 text-orange-500" /> Sílabo de la materia</h2>
            <Accordion type="multiple" defaultValue={inscrito || !m.disponible ? ["proposito", "objetivos"] : []} className="glass-card px-4">
              <AccordionItem value="proposito">
                <AccordionTrigger>Propósito</AccordionTrigger>
                <AccordionContent><p className="text-[15px] leading-7">{m.silabo.proposito}</p></AccordionContent>
              </AccordionItem>
              <AccordionItem value="objetivos">
                <AccordionTrigger>Objetivos de aprendizaje</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2">
                    {m.silabo.objetivos.map((o) => (
                      <li key={o.id} className="flex items-start gap-2 text-[15px]"><Target className="w-4 h-4 text-orange-500 mt-1 shrink-0" /><span>{o.texto} <span className="text-xs text-muted-foreground">({BLOOM[o.bloom]})</span></span></li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="dimensiones">
                <AccordionTrigger>Lo que forma: conocer, ser y hacer</AccordionTrigger>
                <AccordionContent>
                  <dl className="space-y-2 text-[15px]">
                    <div><dt className="font-semibold">Conocer</dt><dd className="text-muted-foreground">{m.silabo.dimensiones.conocer}</dd></div>
                    <div><dt className="font-semibold">Ser</dt><dd className="text-muted-foreground">{m.silabo.dimensiones.ser}</dd></div>
                    <div><dt className="font-semibold">Hacer</dt><dd className="text-muted-foreground">{m.silabo.dimensiones.hacer}</dd></div>
                  </dl>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="bibliografia">
                <AccordionTrigger>Bibliografía</AccordionTrigger>
                <AccordionContent>
                  <p className="data-label mb-2">Básica</p>
                  <ul className="space-y-1 mb-4 text-[15px]">{m.silabo.bibliografia.basica.map((b) => <li key={b.titulo} className="flex gap-2"><Library className="w-4 h-4 mt-1 text-orange-500 shrink-0" /><span>{b.autor}, <em>{b.titulo}</em>{b.editorial ? ` (${b.editorial})` : ""}{b.nota ? `. ${b.nota}` : ""}</span></li>)}</ul>
                  <p className="data-label mb-2">Complementaria</p>
                  <ul className="space-y-1 text-[15px]">{m.silabo.bibliografia.complementaria.map((b) => <li key={b.titulo} className="flex gap-2"><Library className="w-4 h-4 mt-1 text-muted-foreground shrink-0" /><span>{b.autor}, <em>{b.titulo}</em>{b.editorial ? ` (${b.editorial})` : ""}{b.nota ? `. ${b.nota}` : ""}</span></li>)}</ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="recursos">
                <AccordionTrigger>Recursos</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 text-[15px]">
                    {m.silabo.recursos.map((r) => (
                      <li key={r.titulo} className="flex items-start gap-2">
                        {r.tipo === "video" ? <Video className="w-4 h-4 mt-1 text-orange-500 shrink-0" /> : <BookOpen className="w-4 h-4 mt-1 text-orange-500 shrink-0" />}
                        <span>
                          {r.url ? (
                            r.url.startsWith("/") ? <Link href={r.url} className="hover:underline">{r.titulo}</Link> : <a href={r.url} target="_blank" rel="noopener noreferrer" className="hover:underline inline-flex items-center gap-1">{r.titulo} <ExternalLink className="w-3 h-3" /></a>
                          ) : r.titulo}
                          <span className="text-muted-foreground"> · {r.fuente}{r.minutos ? ` · ${r.minutos} min` : ""}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        )}
      </div>
    </Layout>
  );
}
