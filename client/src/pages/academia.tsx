// La portada de la Academia Avivando el Fuego (docs/academia.md), ordenada en partes con su título:
// - «Mi escritorio», para el alumno: continuar, su nivel, lo de hoy (versículos, prueba diagnóstica) y sus documentos;
// - «Plan de estudios»: cada nivel plegado, con «Ver las materias»; viene abierto el nivel del alumno;
// - «Especialidades», plegadas;
// - «Cómo se estudia y se evalúa».
// Es solo para estudiar: la administración de la academia se abre desde el panel de administración de la web.
import { useState, type ReactNode } from "react";
import { Link } from "wouter";
import { motion } from "motion/react";
import {
  ArrowRight, Award, BookOpen, CheckCircle2, ChevronDown, Compass, FileText, Flame, GraduationCap, IdCard, Layers, ListChecks, PenLine, PlayCircle, ScrollText,
  Sparkles, Timer,
} from "lucide-react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { loginUrl } from "@/lib/login-redirect";
import { APRUEBA, HONORES, LEMA, NOMBRE_ACADEMIA, type AcademiaEstado, type MateriaResumen } from "@shared/academia";
import { useAcademiaEstado, useCertificados, useDiagnostico, useRepasoVersiculos } from "@/components/academia/api";
import { AvisoVistaPrevia, BarraAvance, Cargando, ChipEstado, NotaMedalla, PantallaCerrada } from "@/components/academia/ui";
import { PestanasClases } from "@/components/academia/pestanas-clases";
import { MisAsignacionesPortada } from "@/components/academia/asignaciones";
import { TarjetaAcompanados } from "@/components/academia/mentores";

type Nivel = AcademiaEstado["niveles"][number];

function TarjetaMateria({ m }: { m: MateriaResumen }) {
  const contenido = (
    <div className={`glass-card h-full p-4 flex flex-col gap-3 transition ${m.estado === "en-preparacion" ? "opacity-70" : "hover:-translate-y-0.5"}`} data-testid={`materia-${m.id}`}>
      <div className="flex items-start justify-between gap-2">
        <h4 className="font-semibold leading-snug">{m.titulo}</h4>
        {m.estado === "aprobada" && m.nota != null ? <NotaMedalla nota={m.nota} medalla={m.medalla} /> : null}
      </div>
      {m.resumen && <p className="text-sm text-muted-foreground leading-6">{m.resumen}</p>}
      <div className="mt-auto space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <ChipEstado estado={m.estado} />
          {m.lecciones > 0 && <span className="text-xs text-muted-foreground">{m.lecciones} lecciones</span>}
          {m.avanzada && <span className="text-xs text-muted-foreground">Avanzada</span>}
        </div>
        {(m.estado === "en-curso" || m.estado === "aprobada") && m.lecciones > 0 && <BarraAvance valor={m.hechas} de={m.lecciones} etiqueta={`${m.hechas} de ${m.lecciones} lecciones`} />}
      </div>
    </div>
  );
  if (m.estado === "en-preparacion") return contenido;
  return <Link href={`/academia/materia/${m.id}`} className="block h-full">{contenido}</Link>;
}

/** El título de cada parte de la portada. */
function Seccion({ id, antetitulo, titulo, texto, children, className = "" }: { id?: string; antetitulo: string; titulo: string; texto?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`max-w-6xl mx-auto px-4 py-10 md:py-12 scroll-mt-24 ${className}`}>
      <p className="data-label text-orange-600 dark:text-orange-300">{antetitulo}</p>
      <h2 className="heading-display font-display text-3xl md:text-4xl mt-1">{titulo}</h2>
      {texto && <p className="text-muted-foreground mt-2 max-w-3xl">{texto}</p>}
      <div className="mt-6">{children}</div>
    </section>
  );
}

/** El nivel que le toca al alumno: el primero que no completó y que ya tiene materias. */
function nivelActual(e: AcademiaEstado): Nivel | null {
  return e.niveles.find((n) => !n.cierre?.completado && n.materias.some((m) => m.estado !== "en-preparacion")) ?? null;
}

const enlaceContinuar = (c: NonNullable<AcademiaEstado["continuar"]>) =>
  c.nivel ? `/academia/nivel/${c.nivel}` : c.leccionId ? `/academia/leccion/${c.leccionId}` : `/academia/materia/${c.materiaId}`;
const textoContinuar = (c: NonNullable<AcademiaEstado["continuar"]>, aprobadas: number) =>
  c.nivel
    ? `Cerrar el nivel: ${c.titulo.toLowerCase()}`
    : c.inscribirse
      ? aprobadas ? "Inscribirme en la siguiente materia" : "Inscribirme en mi primera materia"
      : c.leccionId
        ? `Continuar: lección ${c.n} de ${c.de}`
        : "Ir al examen final";

// ---------------------------------------------------------------- mi escritorio

function Escritorio({ e }: { e: AcademiaEstado }) {
  const docs = useCertificados(!!e.alumno);
  const versos = useRepasoVersiculos(true);
  const diag = useDiagnostico(true);
  const actual = nivelActual(e);
  const aprobadasNivel = actual ? actual.materias.filter((m) => m.estado === "aprobada").length : 0;
  const pendientes = versos.data?.pendientes ?? 0;
  return (
    <Seccion antetitulo="Para ti" titulo="Mi escritorio">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" data-testid="academia-escritorio">
        {/* lo que sigue */}
        <div className="glass-card p-5 border border-orange-500/40 lg:col-span-2 flex flex-col">
          <p className="data-label flex items-center gap-1.5"><PlayCircle className="w-3.5 h-3.5" /> Lo que sigue</p>
          {e.continuar ? (
            <>
              <p className="font-display text-xl md:text-2xl font-bold mt-2">{e.continuar.titulo}</p>
              <p className="text-sm text-muted-foreground">{e.continuar.materia}</p>
              <Link href={enlaceContinuar(e.continuar)} className="mt-4">
                <Button size="lg" className="fire-btn-primary h-12 px-7" data-testid="academia-continuar">
                  <PlayCircle className="w-5 h-5 mr-2" /> {textoContinuar(e.continuar, e.alumno?.materiasAprobadas ?? 0)}
                </Button>
              </Link>
            </>
          ) : (
            <p className="mt-2 text-muted-foreground">No tienes nada pendiente por ahora. ¡Buen trabajo!</p>
          )}
          {e.alumno && (
            <p className="text-sm text-muted-foreground mt-4" data-testid="academia-alumno">
              <Flame className="w-4 h-4 inline -mt-0.5 text-orange-500" /> Racha de estudio: {e.alumno.racha} {e.alumno.racha === 1 ? "día" : "días"} · {e.alumno.leccionesHechas}{" "}
              {e.alumno.leccionesHechas === 1 ? "lección" : "lecciones"} · {e.alumno.materiasAprobadas} {e.alumno.materiasAprobadas === 1 ? "materia aprobada" : "materias aprobadas"}
            </p>
          )}
        </div>

        {/* mi nivel */}
        {actual && (
          <Link href={`/academia/nivel/${actual.n}`}>
            <span className="glass-card p-5 h-full flex flex-col hover:-translate-y-0.5 transition cursor-pointer" data-testid="academia-mi-nivel">
              <span className="data-label flex items-center gap-1.5"><GraduationCap className="w-3.5 h-3.5" /> Mi nivel</span>
              <span className="font-display text-xl font-bold mt-2">Nivel {actual.n} · {actual.nombre}</span>
              <span className="text-sm text-muted-foreground mt-1">{aprobadasNivel} de {actual.materias.length} materias aprobadas</span>
              <span className="mt-3"><BarraAvance valor={aprobadasNivel} de={actual.materias.length} etiqueta={`${aprobadasNivel} de ${actual.materias.length} materias aprobadas`} /></span>
              <span className="mt-auto pt-3 text-sm text-orange-600 dark:text-orange-300 inline-flex items-center gap-1">Ver el nivel y lo que pide <ArrowRight className="w-4 h-4" /></span>
            </span>
          </Link>
        )}

        {/* lo de hoy */}
        <div className="glass-card p-5" data-testid="academia-lo-de-hoy">
          <p className="data-label flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5" /> Lo de hoy</p>
          <ul className="mt-3 space-y-3 text-sm">
            <li>
              {pendientes > 0 ? (
                <Link href="/academia/repaso" className="flex items-start gap-2 font-medium hover:underline" data-testid="academia-repasar-versiculos">
                  <BookOpen className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" /> Repasar {pendientes === 1 ? "1 versículo" : `${pendientes} versículos`} de memoria
                </Link>
              ) : (
                <span className="flex items-start gap-2 text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span>Sin versículos para repasar hoy{versos.data?.dominados ? ` · ${versos.data.dominados} ${versos.data.dominados === 1 ? "dominado" : "dominados"}` : ""}</span>
                </span>
              )}
            </li>
            <li>
              {diag.data?.ultimo ? (
                <Link href="/academia/diagnostico" className="flex items-start gap-2 hover:underline">
                  <Compass className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" /> <span><strong>Tu prueba diagnóstica:</strong> {diag.data.ultimo.sugerencia.texto}</span>
                </Link>
              ) : (
                <Link href="/academia/diagnostico" className="flex items-start gap-2 font-medium hover:underline" data-testid="academia-diagnostica">
                  <Compass className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" /> ¿Por dónde empiezo? Haz la prueba diagnóstica{diag.data ? ` (${diag.data.preguntas} preguntas)` : ""}
                </Link>
              )}
            </li>
          </ul>
        </div>

        {/* mis documentos */}
        {e.matricula && (
          <div className="glass-card p-5" data-testid="academia-matricula">
            <p className="data-label flex items-center gap-1.5"><IdCard className="w-3.5 h-3.5" /> Mi matrícula</p>
            <p className="font-semibold mt-2 tracking-wider">{e.matricula.numero}</p>
            <p className="text-sm text-muted-foreground">{e.matricula.estatus.texto}{e.matricula.estatus.honores ? " · Cuadro de honor" : ""}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link href="/academia/carne"><Button size="sm" variant="outline"><IdCard className="w-4 h-4 mr-1.5" /> Mi carné</Button></Link>
              <Link href="/academia/expediente"><Button size="sm" variant="outline" data-testid="academia-mi-expediente"><FileText className="w-4 h-4 mr-1.5" /> Mi expediente</Button></Link>
              <Link href="/academia/inscripcion"><Button size="sm" variant="ghost" data-testid="academia-mi-inscripcion">Mi inscripción</Button></Link>
            </div>
          </div>
        )}
        {docs.data && docs.data.length > 0 && (
          <div className="glass-card p-5" data-testid="mis-certificados">
            <p className="data-label flex items-center gap-1.5"><Award className="w-3.5 h-3.5" /> Mis certificados</p>
            <ul className="mt-3 space-y-2">
              {docs.data.slice(0, 5).map((d) => (
                <li key={d.codigo}>
                  <Link href={`/academia/certificado/${d.codigo}`} className="text-sm inline-flex items-center gap-1.5 hover:underline" data-testid="certificado-enlace">
                    {d.tipo === "nivel" ? <GraduationCap className="w-4 h-4 text-orange-500" /> : <Award className="w-4 h-4 text-orange-500" />} {d.titulo}
                  </Link>
                </li>
              ))}
            </ul>
            {docs.data.length > 5 && <p className="text-xs text-muted-foreground mt-2">Y {docs.data.length - 5} más en tu expediente.</p>}
          </div>
        )}
      </div>
    </Seccion>
  );
}

// ---------------------------------------------------------------- el plan de estudios

function NivelPlegable({ n, abiertoAlInicio, conSesion }: { n: Nivel; abiertoAlInicio: boolean; conSesion: boolean }) {
  const [abierto, setAbierto] = useState(abiertoAlInicio);
  const disponibles = n.materias.filter((m) => m.estado !== "en-preparacion").length;
  const aprobadas = n.materias.filter((m) => m.estado === "aprobada").length;
  const estado = n.cierre?.completado
    ? { texto: "Completado", clase: "bg-emerald-500/15" }
    : !disponibles
      ? { texto: "En preparación", clase: "bg-muted" }
      : aprobadas
        ? { texto: `${aprobadas} de ${n.materias.length} aprobadas`, clase: "bg-orange-500/15" }
        : { texto: "Abierto", clase: "bg-orange-500/15" };
  const documento = n.recibe.toLowerCase().startsWith("diplomado") ? "diplomado" : n.recibe.toLowerCase().startsWith("diploma") ? "diploma" : "certificado";
  return (
    <div className="glass-card overflow-hidden" data-testid={`nivel-${n.n}`}>
      <button type="button" onClick={() => setAbierto(!abierto)} className="w-full text-left p-5 flex flex-col md:flex-row md:items-center gap-3" aria-expanded={abierto} data-testid={`nivel-${n.n}-abrir`}>
        <span className="flex-1 min-w-0">
          <span className="data-label">Nivel {n.n} · {n.para}</span>
          <span className="block font-display text-xl md:text-2xl font-bold mt-1">{n.nombre}</span>
          <span className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mt-1">
            <span className="inline-flex items-center gap-1"><Award className="w-4 h-4 text-orange-500" /> {n.recibe}</span>
            <span className="inline-flex items-center gap-1"><Timer className="w-4 h-4" /> {n.ritmo}</span>
            <span className="inline-flex items-center gap-1"><BookOpen className="w-4 h-4" /> {n.materias.length} materias</span>
          </span>
        </span>
        <span className="flex items-center gap-3 shrink-0">
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${estado.clase}`}>{estado.texto}</span>
          <span className="inline-flex items-center gap-1 text-sm text-orange-600 dark:text-orange-300">
            {abierto ? "Ocultar" : "Ver las materias"} <ChevronDown className={`w-4 h-4 transition ${abierto ? "rotate-180" : ""}`} />
          </span>
        </span>
      </button>
      {abierto && (
        <div className="px-5 pb-5 border-t border-border/60 pt-4">
          <p className="text-muted-foreground max-w-3xl mb-4">{n.descripcion}</p>
          {conSesion && aprobadas > 0 && <div className="mb-4 max-w-md"><BarraAvance valor={aprobadas} de={n.materias.length} etiqueta={`${aprobadas} de ${n.materias.length} materias aprobadas`} /></div>}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {n.materias.map((m) => <TarjetaMateria key={m.id} m={m} />)}
          </div>
          {n.cierre && (
            <Link href={`/academia/nivel/${n.n}`} className="block mt-3" data-testid={`cierre-nivel-${n.n}`}>
              <div className="rounded-xl border border-border p-4 flex flex-col sm:flex-row sm:items-center gap-3 hover:-translate-y-0.5 transition">
                <div className="flex items-center gap-2 font-semibold">
                  {n.cierre.completado ? <GraduationCap className="w-5 h-5 text-emerald-600" /> : <ScrollText className="w-5 h-5 text-orange-500" />}
                  {n.cierre.completado ? `Nivel ${n.n} completado` : "Cierre del nivel"}
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground sm:ml-2">
                  <span className="inline-flex items-center gap-1">{n.cierre.integralAprobado ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <ListChecks className="w-4 h-4" />} Examen integral</span>
                  <span className="inline-flex items-center gap-1">{n.cierre.pacto ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <ListChecks className="w-4 h-4" />} Pacto</span>
                </div>
                <span className="sm:ml-auto text-sm text-orange-600 dark:text-orange-300 inline-flex items-center gap-1">Ver los requisitos <ArrowRight className="w-4 h-4" /></span>
              </div>
            </Link>
          )}
          <p className="text-xs text-muted-foreground mt-3">Para el {documento}: {n.requisitos.join(" · ")}.</p>
        </div>
      )}
    </div>
  );
}

function Especialidades({ e }: { e: AcademiaEstado }) {
  const [abierto, setAbierto] = useState(false);
  return (
    <Seccion
      antetitulo="Sin límite"
      titulo="Especialidades"
      texto="Se abren al terminar el Nivel 2 y puedes sacar todas las que quieras. Cada una tiene 5 materias y un trabajo final, y da su certificado de especialidad."
    >
      <Button variant="outline" onClick={() => setAbierto(!abierto)} aria-expanded={abierto} data-testid="especialidades-abrir">
        <Layers className="w-4 h-4 mr-1.5" /> {abierto ? "Ocultar las especialidades" : `Ver las ${e.especialidades.length} especialidades`}
        <ChevronDown className={`w-4 h-4 ml-1.5 transition ${abierto ? "rotate-180" : ""}`} />
      </Button>
      {abierto && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mt-5">
          {e.especialidades.map((esp) => (
            <div key={esp.id} className="glass-card p-4" data-testid={`especialidad-${esp.id}`}>
              <div className="flex items-center gap-2 mb-1"><Layers className="w-4 h-4 text-orange-500" /><h3 className="font-semibold">{esp.nombre}</h3></div>
              <p className="text-sm text-muted-foreground mb-3">{esp.resumen}</p>
              <ul className="space-y-1">
                {esp.materias.map((m) => (
                  <li key={m.id} className="text-sm flex items-start gap-1.5">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>{m.titulo}{m.avanzada ? <span className="text-xs text-muted-foreground"> · avanzada</span> : null}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3"><ChipEstado estado="en-preparacion" /></p>
            </div>
          ))}
        </div>
      )}
    </Seccion>
  );
}

const PASOS = [
  { icon: BookOpen, titulo: "Lecciones cortas", texto: "De 5 a 10 minutos, con versículos de la Biblia, videos y una aplicación para la vida." },
  { icon: ListChecks, titulo: "Repaso", texto: "Al terminar de leer cada lección: preguntas con la respuesta y la cita al instante." },
  { icon: Sparkles, titulo: "Versículo de memoria", texto: "Uno por materia; vuelve a los 1, 3, 7 y 21 días para quedar en el corazón." },
  { icon: PenLine, titulo: "Examen final", texto: "Parte objetiva con reloj y parte escrita desde el celular, con corrección automática." },
  { icon: Award, titulo: "Certificado", texto: "Cada materia aprobada da su certificado; cada nivel, su diploma." },
];

export default function AcademiaPage() {
  const q = useAcademiaEstado();
  if (q.isLoading) return <Cargando />;
  if (q.error?.status === 403 || !q.data) return <PantallaCerrada mensaje={q.error?.message} />;
  const e = q.data;
  const totalMaterias = e.niveles.reduce((a, n) => a + n.materias.length, 0);
  const inscrito = !!e.matricula && e.ficha;
  const actual = nivelActual(e);

  return (
    <Layout>
      {/* ═══ PORTADA ═══ */}
      <section className="relative overflow-hidden section-aurora pt-12 pb-12 md:pt-16 md:pb-14">
        <div className="hero-grid-bg absolute inset-0" />
        <div className="glow-orb w-[420px] h-[420px] -top-40 left-1/2 -translate-x-1/2 bg-orange-600/20" />
        <motion.div className="relative z-10 max-w-5xl mx-auto px-4 text-center" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {e.conSesion && <PestanasClases actual="academia" className="mb-8" />}
          <span className="glass-pill inline-flex items-center gap-2 mb-5 text-xs"><GraduationCap className="w-3.5 h-3.5" /> Instituto de formación ministerial</span>
          <h1 className="heading-display font-display text-4xl md:text-6xl mb-4" data-testid="academia-titulo">
            Academia <span className="fire-text">Avivando el Fuego</span>
          </h1>
          <p className="accent-serif text-xl md:text-2xl">«{LEMA.frase}»</p>
          <p className="data-label mt-2 mb-5">{LEMA.ref}</p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Formación bíblica por niveles, desde los primeros pasos de la fe hasta el ministerio: lecciones cortas, exámenes con corrección automática y
            certificados que se pueden verificar.
          </p>
          <dl className="mt-7 grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-2xl mx-auto">
            {[
              { v: String(e.niveles.length), t: "Niveles" },
              { v: String(totalMaterias), t: "Materias" },
              { v: String(e.especialidades.length), t: "Especialidades" },
              { v: "$0", t: "Gratis" },
            ].map((c) => (
              <div key={c.t} className="glass-card px-2 py-3">
                <dt className="sr-only">{c.t}</dt>
                <dd className="font-display font-bold text-2xl fire-text leading-none">{c.v}</dd>
                <dd className="data-label mt-1.5 text-[10px] opacity-75">{c.t}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-7 flex flex-col sm:flex-row justify-center gap-3">
            {e.conSesion && !inscrito ? (
              <Link href="/academia/inscripcion">
                <Button size="lg" className="fire-btn-primary w-full sm:w-auto h-12 px-7 text-base" data-testid="academia-inscribirme">
                  <IdCard className="w-5 h-5 mr-2" /> {e.matricula ? "Completar mi inscripción" : "Inscribirme en la academia"}
                </Button>
              </Link>
            ) : !e.conSesion ? (
              <a href={loginUrl("/academia")}>
                <Button size="lg" className="fire-btn-primary w-full sm:w-auto h-12 px-7 text-base">Entrar para estudiar <ArrowRight className="w-4 h-4 ml-2" /></Button>
              </a>
            ) : null}
            <a href="#plan">
              <Button variant="outline" size="lg" className="btn-fire-glow w-full sm:w-auto h-12">Ver el plan de estudios</Button>
            </a>
          </div>
        </motion.div>
      </section>

      {e.vistaPrevia && <AvisoVistaPrevia />}

      {/* ═══ MI ESCRITORIO (el alumno inscrito) ═══ */}
      {inscrito && <Escritorio e={e} />}

      {/* ═══ LA INSCRIPCIÓN ═══ */}
      {e.conSesion && !inscrito && (
        <section className="max-w-6xl mx-auto px-4 pt-8" data-testid="inscripcion-invitacion">
          <div className="glass-card p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-4 border border-orange-500/30">
            <IdCard className="w-10 h-10 text-orange-500 shrink-0" />
            <div className="flex-1">
              <h2 className="font-display text-xl md:text-2xl font-bold">{e.matricula ? "Completa tu inscripción" : "Inscríbete en la academia"}</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {e.matricula
                  ? `Ya tienes tu matrícula ${e.matricula.numero}. Llena tu ficha de inscripción para seguir guardando tu avance: tus certificados llevarán ese nombre.`
                  : "Llena tu ficha, acepta el reglamento académico y el código de honor, y recibe tu número de matrícula y tu carné. Es gratuita y queda aprobada al instante. Sin inscripción puedes leer la primera lección de cada materia, pero no guardar tu avance."}
              </p>
              <p className="text-sm mt-2">
                <Link href="/academia/diagnostico" className="inline-flex items-center gap-1 text-orange-600 dark:text-orange-300 hover:underline">
                  <Compass className="w-4 h-4" /> ¿No sabes por dónde empezar? Haz la prueba diagnóstica
                </Link>
              </p>
            </div>
            <Link href="/academia/inscripcion"><Button className="fire-btn-primary h-12 px-7" data-testid="academia-inscripcion">{e.matricula ? "Completar mi ficha" : "Inscribirme"}</Button></Link>
          </div>
        </section>
      )}

      {e.conSesion && <TarjetaAcompanados activo />}
      {e.conSesion && <MisAsignacionesPortada activo />}

      {/* ═══ PLAN DE ESTUDIOS ═══ */}
      <Seccion
        id="plan"
        antetitulo="Plan de estudios"
        titulo="Tu camino de formación"
        texto="Cinco niveles en tres etapas. Toca un nivel para ver sus materias; el tuyo ya viene abierto."
      >
        <div className="space-y-8">
          {e.etapas.map((etapa) => (
            <div key={etapa.id}>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3">
                <h3 className="font-display text-xl font-bold">Etapa · {etapa.nombre}</h3>
                <span className="text-sm text-muted-foreground">{etapa.idea} ({etapa.base})</span>
              </div>
              <div className="space-y-3">
                {e.niveles.filter((n) => n.etapa === etapa.id).map((n) => (
                  <NivelPlegable key={n.n} n={n} conSesion={e.conSesion} abiertoAlInicio={actual ? n.n === actual.n : n.n === 1} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Seccion>

      {/* ═══ ESPECIALIDADES ═══ */}
      <Especialidades e={e} />

      {/* ═══ CÓMO SE ESTUDIA ═══ */}
      <Seccion antetitulo="Método" titulo="Cómo se estudia y se evalúa">
        <ol className="grid gap-3 md:grid-cols-5">
          {PASOS.map((p, i) => (
            <li key={p.titulo} className="glass-card p-4">
              <p className="data-label mb-2">Paso {i + 1}</p>
              <p className="font-semibold flex items-center gap-2"><p.icon className="w-4 h-4 text-orange-500" />{p.titulo}</p>
              <p className="text-sm text-muted-foreground mt-1.5">{p.texto}</p>
            </li>
          ))}
        </ol>
        <div className="grid gap-4 md:grid-cols-2 mt-6">
          <div className="glass-card p-5">
            <h3 className="font-semibold flex items-center gap-2 mb-2"><ScrollText className="w-4 h-4 text-orange-500" /> Así se evalúa</h3>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>Las notas van de 0 a 100: se aprueba con {APRUEBA} y desde {HONORES} es con honores.</li>
              <li>Las preguntas viven en el servidor y llegan de a una, con su reloj y sus opciones en otro orden en cada intento.</li>
              <li>Lo escrito lo corrige el sistema al instante, idea por idea; la academia puede revisarlo.</li>
              <li>Si no apruebas, repasas y vuelves a intentarlo con otras preguntas. Si ya sabes una materia, puedes dar su examen de suficiencia.</li>
            </ul>
          </div>
          <div className="glass-card p-5">
            <h3 className="font-semibold flex items-center gap-2 mb-2"><CheckCircle2 className="w-4 h-4 text-orange-500" /> Con la Biblia en la mano</h3>
            <p className="text-sm text-muted-foreground">
              Cada lección se apoya en la Escritura: los versículos salen de la Reina-Valera 1960 de la Biblioteca de la web, y cada materia trae su
              sílabo, sus objetivos y su bibliografía. {NOMBRE_ACADEMIA} es formación ministerial del ministerio; no es un título universitario oficial.
            </p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-6 flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/academia/reglamento" className="inline-flex items-center gap-1.5 underline" data-testid="academia-reglamento"><ScrollText className="w-4 h-4" /> Reglamento académico</Link>
          <Link href="/academia/declaracion-de-fe" className="inline-flex items-center gap-1.5 underline" data-testid="academia-declaracion"><BookOpen className="w-4 h-4" /> Declaración de fe</Link>
          <Link href="/academia/verificar" className="inline-flex items-center gap-1.5 underline"><Award className="w-4 h-4" /> Verificar un documento</Link>
        </p>
      </Seccion>
    </Layout>
  );
}
