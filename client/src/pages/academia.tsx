// La portada de la Academia Avivando el Fuego (docs/academia.md): el camino de los 5 niveles con sus materias, las
// especialidades, cómo se estudia y se evalúa, y «Continuar» para el alumno.
import { Link } from "wouter";
import { motion } from "motion/react";
import {
  ArrowRight, Award, BookOpen, CheckCircle2, Flame, GraduationCap, IdCard, Layers, ListChecks, PenLine, PlayCircle, ScrollText, Sparkles, Timer, Users,
} from "lucide-react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { loginUrl } from "@/lib/login-redirect";
import { APRUEBA, HONORES, LEMA, NOMBRE_ACADEMIA, type MateriaResumen } from "@shared/academia";
import { useAcademiaEstado, useCertificados } from "@/components/academia/api";
import { AvisoVistaPrevia, BarraAvance, Cargando, ChipEstado, NotaMedalla, PantallaCerrada } from "@/components/academia/ui";
import { PestanasClases } from "@/components/academia/pestanas-clases";
import { MisAsignacionesPortada } from "@/components/academia/asignaciones";
import { TarjetaAcompanados } from "@/components/academia/mentores";
import { useAuth } from "@/hooks/use-auth";
import { alcanceDe } from "@shared/academia-permisos";

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
          {m.antes && <span className="text-xs text-muted-foreground">Renueva «{m.antes}»</span>}
          {m.avanzada && <span className="text-xs text-muted-foreground">Avanzada</span>}
        </div>
        {(m.estado === "en-curso" || m.estado === "aprobada") && m.lecciones > 0 && <BarraAvance valor={m.hechas} de={m.lecciones} etiqueta={`${m.hechas} de ${m.lecciones} lecciones`} />}
      </div>
    </div>
  );
  if (m.estado === "en-preparacion") return contenido;
  return <Link href={`/academia/materia/${m.id}`} className="block h-full">{contenido}</Link>;
}

const PASOS = [
  { icon: BookOpen, titulo: "Lecciones cortas", texto: "De 5 a 10 minutos, con versículos de la Biblia, videos y una aplicación para la vida." },
  { icon: ListChecks, titulo: "Repaso", texto: "Preguntas al final de cada lección, con la respuesta y la cita al instante." },
  { icon: Sparkles, titulo: "Versículo de memoria", texto: "Uno por materia, para guardarlo en el corazón." },
  { icon: PenLine, titulo: "Examen final", texto: "Parte objetiva con reloj y parte escrita desde el celular, con corrección automática." },
  { icon: Award, titulo: "Certificado", texto: "Cada materia aprobada da su certificado; cada nivel, su diploma." },
];

export default function AcademiaPage() {
  const { user } = useAuth();
  const conPanel = alcanceDe(user?.role, "panel") !== "no" && !!user?.isActive;
  const q = useAcademiaEstado();
  const docs = useCertificados(!!q.data?.conSesion && !!q.data?.alumno);
  if (q.isLoading) return <Cargando />;
  if (q.error?.status === 403 || !q.data) return <PantallaCerrada mensaje={q.error?.message} />;
  const e = q.data;
  const totalMaterias = e.niveles.reduce((a, n) => a + n.materias.length, 0);
  const totalEspecialidades = e.especialidades.length;

  return (
    <Layout>
      {/* ═══ PORTADA ═══ */}
      <section className="relative overflow-hidden section-aurora pt-14 pb-16 md:pt-20 md:pb-20">
        <div className="hero-grid-bg absolute inset-0" />
        <div className="glow-orb w-[420px] h-[420px] -top-40 left-1/2 -translate-x-1/2 bg-orange-600/20" />
        <motion.div className="relative z-10 max-w-5xl mx-auto px-4 text-center" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {e.conSesion && <PestanasClases actual="academia" className="mb-8" />}
          <span className="glass-pill inline-flex items-center gap-2 mb-5 text-xs"><GraduationCap className="w-3.5 h-3.5" /> Instituto de formación ministerial</span>
          <h1 className="heading-display font-display text-4xl md:text-6xl mb-5" data-testid="academia-titulo">
            Academia <span className="fire-text">Avivando el Fuego</span>
          </h1>
          <p className="accent-serif text-xl md:text-2xl">«{LEMA.frase}»</p>
          <p className="data-label mt-2 mb-6">{LEMA.ref}</p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Formación bíblica por niveles, desde los primeros pasos de la fe hasta el ministerio: lecciones cortas, exámenes con corrección automática y
            certificados que se pueden verificar.
          </p>
          <dl className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-2xl mx-auto">
            {[
              { v: "5", t: "Niveles" },
              { v: String(totalMaterias), t: "Materias" },
              { v: String(totalEspecialidades), t: "Especialidades" },
              { v: "$0", t: "Gratis" },
            ].map((c) => (
              <div key={c.t} className="glass-card px-2 py-3">
                <dt className="sr-only">{c.t}</dt>
                <dd className="font-display font-bold text-2xl fire-text leading-none">{c.v}</dd>
                <dd className="data-label mt-1.5 text-[10px] opacity-75">{c.t}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            {e.conSesion && (!e.matricula || !e.ficha) ? (
              <Link href="/academia/inscripcion">
                <Button size="lg" className="fire-btn-primary w-full sm:w-auto h-12 px-7 text-base" data-testid="academia-inscribirme">
                  <IdCard className="w-5 h-5 mr-2" /> {e.matricula ? "Completar mi inscripción" : "Inscribirme en la academia"}
                </Button>
              </Link>
            ) : e.continuar ? (
              <Link
                href={
                  e.continuar.nivel
                    ? `/academia/nivel/${e.continuar.nivel}`
                    : e.continuar.leccionId
                      ? `/academia/leccion/${e.continuar.leccionId}`
                      : `/academia/materia/${e.continuar.materiaId}`
                }
              >
                <Button size="lg" className="fire-btn-primary w-full sm:w-auto h-12 px-7 text-base" data-testid="academia-continuar">
                  <PlayCircle className="w-5 h-5 mr-2" />
                  {e.continuar.nivel
                    ? `Cerrar el nivel: ${e.continuar.titulo.toLowerCase()}`
                    : e.continuar.inscribirse
                      ? e.alumno?.materiasAprobadas
                        ? "Inscribirme en la siguiente materia"
                        : "Inscribirme en mi primera materia"
                      : e.continuar.leccionId
                        ? `Continuar: lección ${e.continuar.n} de ${e.continuar.de}`
                        : "Ir al examen final"}
                </Button>
              </Link>
            ) : !e.conSesion ? (
              <a href={loginUrl("/academia")}>
                <Button size="lg" className="fire-btn-primary w-full sm:w-auto h-12 px-7 text-base">Entrar para estudiar <ArrowRight className="w-4 h-4 ml-2" /></Button>
              </a>
            ) : null}
            <a href="#camino">
              <Button variant="outline" size="lg" className="btn-fire-glow w-full sm:w-auto h-12">Ver el plan de estudios</Button>
            </a>
          </div>
          {e.continuar && e.matricula && e.ficha && <p className="text-sm text-muted-foreground mt-3">{e.continuar.materia} · {e.continuar.titulo}</p>}
          {e.alumno && (
            <p className="text-sm text-muted-foreground mt-2" data-testid="academia-alumno">
              <Flame className="w-4 h-4 inline -mt-0.5 text-orange-500" /> Racha de estudio: {e.alumno.racha} {e.alumno.racha === 1 ? "día" : "días"} · {e.alumno.leccionesHechas} {e.alumno.leccionesHechas === 1 ? "lección" : "lecciones"} · {e.alumno.materiasAprobadas}{" "}
              {e.alumno.materiasAprobadas === 1 ? "materia aprobada" : "materias aprobadas"}
            </p>
          )}
          {e.matricula && (
            <p className="text-sm text-muted-foreground mt-2" data-testid="academia-matricula">
              <IdCard className="w-4 h-4 inline -mt-0.5 text-orange-500" /> Matrícula {e.matricula.numero} · {e.matricula.estatus.texto}
              {e.matricula.estatus.honores ? " · Cuadro de honor" : ""} · <Link href="/academia/carne" className="underline">Mi carné</Link> ·{" "}
              <Link href="/academia/inscripcion" className="underline" data-testid="academia-mi-inscripcion">Mi inscripción</Link> ·{" "}
              <Link href="/academia/expediente" className="underline" data-testid="academia-mi-expediente">Mi expediente</Link>
            </p>
          )}
        </motion.div>
      </section>

      {e.vistaPrevia && <AvisoVistaPrevia />}

      {conPanel && (
        <div className="max-w-6xl mx-auto px-4 mt-6">
          <Link href="/academia/direccion">
            <span className="glass-card p-4 flex items-center gap-3 hover:-translate-y-0.5 transition cursor-pointer" data-testid="academia-panel">
              <Users className="w-5 h-5 text-orange-500 shrink-0" />
              <span className="flex-1 text-sm"><strong>Panel de seguimiento.</strong> Quiénes están inscritos, por dónde va cada uno, el registro de inscripciones y los reportes.</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </span>
          </Link>
        </div>
      )}

      {e.conSesion && <TarjetaAcompanados activo />}
      {e.conSesion && <MisAsignacionesPortada activo />}

      {/* ═══ LA INSCRIPCIÓN ═══ */}
      {e.conSesion && (!e.matricula || !e.ficha) && (
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
            </div>
            <Link href="/academia/inscripcion"><Button className="fire-btn-primary h-12 px-7" data-testid="academia-inscripcion">{e.matricula ? "Completar mi ficha" : "Inscribirme"}</Button></Link>
          </div>
        </section>
      )}

      {/* ═══ MIS CERTIFICADOS ═══ */}
      {docs.data && docs.data.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pt-10" data-testid="mis-certificados">
          <p className="data-label text-orange-600 dark:text-orange-300">Tus documentos</p>
          <h2 className="font-display text-2xl md:text-3xl font-bold mt-1 mb-4 flex items-center gap-2"><Award className="w-6 h-6 text-orange-500" /> Mis certificados</h2>
          <div className="flex flex-wrap gap-2">
            {docs.data.map((d) => (
              <Link key={d.codigo} href={`/academia/certificado/${d.codigo}`}>
                <span className="glass-pill inline-flex items-center gap-1.5 text-sm cursor-pointer hover:-translate-y-0.5 transition" data-testid="certificado-enlace">
                  {d.tipo === "nivel" ? <GraduationCap className="w-4 h-4 text-orange-500" /> : <Award className="w-4 h-4 text-orange-500" />}
                  {d.titulo}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ═══ EL CAMINO ═══ */}
      <section id="camino" className="max-w-6xl mx-auto px-4 py-14 scroll-mt-24">
        <p className="data-label text-orange-600 dark:text-orange-300">Plan de estudios</p>
        <h2 className="heading-display font-display text-3xl md:text-5xl mt-2 mb-10">Tu camino de formación</h2>
        <div className="space-y-14">
          {e.etapas.map((etapa) => (
            <div key={etapa.id}>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-6 border-b border-border pb-3">
                <h3 className="font-display text-2xl font-bold">Etapa · {etapa.nombre}</h3>
                <span className="text-sm text-muted-foreground">{etapa.idea} ({etapa.base})</span>
              </div>
              <div className="space-y-10">
                {e.niveles.filter((n) => n.etapa === etapa.id).map((n) => {
                  const aprobadas = n.materias.filter((m) => m.estado === "aprobada").length;
                  return (
                    <div key={n.n} data-testid={`nivel-${n.n}`}>
                      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-4">
                        <div>
                          <p className="data-label">Nivel {n.n} · {n.para}</p>
                          <h4 className="font-display text-2xl md:text-3xl font-bold mt-1">{n.nombre}</h4>
                          <p className="text-muted-foreground mt-1 max-w-3xl">{n.descripcion}</p>
                        </div>
                        <div className="text-sm md:text-right shrink-0">
                          <p className="flex md:justify-end items-center gap-1.5"><Award className="w-4 h-4 text-orange-500" /> {n.recibe}</p>
                          <p className="text-muted-foreground flex md:justify-end items-center gap-1.5"><Timer className="w-4 h-4" /> {n.ritmo}</p>
                        </div>
                      </div>
                      {e.conSesion && aprobadas > 0 && <div className="mb-4 max-w-md"><BarraAvance valor={aprobadas} de={n.materias.length} etiqueta={`${aprobadas} de ${n.materias.length} materias aprobadas`} /></div>}
                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {n.materias.map((m) => <TarjetaMateria key={m.id} m={m} />)}
                      </div>
                      {n.cierre && (
                        <Link href={`/academia/nivel/${n.n}`} className="block mt-3" data-testid={`cierre-nivel-${n.n}`}>
                          <div className="glass-card p-4 flex flex-col sm:flex-row sm:items-center gap-3 hover:-translate-y-0.5 transition">
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
                      <p className="text-xs text-muted-foreground mt-3">Para el {n.recibe.toLowerCase().startsWith("diplomado") ? "diplomado" : n.recibe.toLowerCase().startsWith("diploma") ? "diploma" : "certificado"}: {n.requisitos.join(" · ")}.</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ ESPECIALIDADES ═══ */}
      <section className="py-14 section-aurora">
        <div className="max-w-6xl mx-auto px-4">
          <p className="data-label text-orange-600 dark:text-orange-300">Sin límite</p>
          <h2 className="heading-display font-display text-3xl md:text-5xl mt-2 mb-3">Especialidades</h2>
          <p className="text-muted-foreground max-w-3xl mb-8">
            Se abren al terminar el Nivel 2 y puedes sacar todas las que quieras. Cada una tiene 5 materias y un trabajo final, y da su certificado de
            especialidad. Las marcadas «avanzada» piden el Nivel 3.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
        </div>
      </section>

      {/* ═══ CÓMO SE ESTUDIA ═══ */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <p className="data-label text-orange-600 dark:text-orange-300">Método</p>
        <h2 className="heading-display font-display text-3xl md:text-5xl mt-2 mb-8">Cómo se estudia</h2>
        <ol className="grid gap-3 md:grid-cols-5">
          {PASOS.map((p, i) => (
            <li key={p.titulo} className="glass-card p-4">
              <p className="data-label mb-2">Paso {i + 1}</p>
              <p className="font-semibold flex items-center gap-2"><p.icon className="w-4 h-4 text-orange-500" />{p.titulo}</p>
              <p className="text-sm text-muted-foreground mt-1.5">{p.texto}</p>
            </li>
          ))}
        </ol>
        <div className="grid gap-4 md:grid-cols-2 mt-8">
          <div className="glass-card p-5">
            <h3 className="font-semibold flex items-center gap-2 mb-2"><ScrollText className="w-4 h-4 text-orange-500" /> Así se evalúa</h3>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>Las notas van de 0 a 100: se aprueba con {APRUEBA} y desde {HONORES} es con honores.</li>
              <li>Las preguntas viven en el servidor y llegan de a una, con su reloj y sus opciones en otro orden en cada intento.</li>
              <li>Lo escrito lo corrige el sistema al instante, idea por idea; la Dirección académica puede revisarlo.</li>
              <li>Si no apruebas, repasas y vuelves a intentarlo con otras preguntas.</li>
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
          <Link href="/academia/verificar" className="inline-flex items-center gap-1.5 underline"><Award className="w-4 h-4" /> Verificar un documento</Link>
        </p>
      </section>
    </Layout>
  );
}
