// Mi salón (/academia/salon): el espacio del alumno inscrito en la academia. Lo pidió Luis (15-nov): «su salón… su
// espacio con diferentes recursos». Junta lo que sigue, la agenda de hoy (versículos, mini pruebas, escritos, exámenes
// y asignaciones), el temporizador de estudio con su meta de la semana, el cuaderno, las materias en curso con sus
// recursos, los documentos y las herramientas. Casi todo sale de lo que la academia ya sabe; el tiempo de estudio se
// guarda en server/academia-salon.ts.
import { Link, useLocation } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import {
  ArrowRight, Award, BookOpen, BookOpenCheck, Brain, CalendarCheck2, CheckCircle2, ClipboardList, Compass, FileText, Flame, GraduationCap, Highlighter, IdCard,
  Layers, Library, ListChecks, NotebookPen, PenLine, PlayCircle, ScrollText, Sparkles, Timer, Users, Video,
} from "lucide-react";
import { Layout } from "@/components/layout";
import { useTituloAcademia } from "@/components/academia/titulo";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { loginUrl } from "@/lib/login-redirect";
import type { AcademiaEstado } from "@shared/academia-base";
import {
  cambiarMetaEstudio, sumarEstudio, useAcademiaEstado, useCarne, useCertificados, useDiagnostico, useEstudio, useMateria, useRepasoDelDia, useRepasoVersiculos,
} from "@/components/academia/api";
import { BarraAvance, Cargando, PantallaCerrada } from "@/components/academia/ui";
import { MisAsignacionesPortada } from "@/components/academia/asignaciones";
import { Temporizador } from "@/components/academia/salon/temporizador";
import { SemanaEstudio } from "@/components/academia/salon/semana";
import { crearNota, useCuaderno, useResaltados } from "@/components/cuaderno/api";

const enlaceContinuar = (c: NonNullable<AcademiaEstado["continuar"]>) =>
  c.nivel ? `/academia/nivel/${c.nivel}` : c.leccionId ? `/academia/leccion/${c.leccionId}` : `/academia/materia/${c.materiaId}`;
const iniciales = (n: string) =>
  n
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join("");

function Tarjeta({ titulo, icono: I, children, className = "", accion }: { titulo: string; icono: React.ComponentType<{ className?: string }>; children: React.ReactNode; className?: string; accion?: React.ReactNode }) {
  return (
    <section className={`glass-card p-5 ${className}`}>
      <div className="flex items-center justify-between gap-2 mb-3">
        <h2 className="data-label flex items-center gap-1.5"><I className="w-3.5 h-3.5" /> {titulo}</h2>
        {accion}
      </div>
      {children}
    </section>
  );
}

/** Lo que una materia en curso tiene listo para hoy: una mini prueba, el escrito breve o el examen final. */
function PendientesMateria({ id }: { id: string }) {
  const q = useMateria(id);
  const d = q.data;
  if (!d) return null;
  const items: { href: string; texto: string; icono: React.ComponentType<{ className?: string }> }[] = [];
  for (const m of d.minis) if (!m.falta.length && m.mejor == null && !m.cerrado) items.push({ href: `/academia/mini/${id}/${m.n}`, texto: `Mini prueba ${m.n} de «${d.materia.titulo}» lista`, icono: ListChecks });
  if (d.breve && !d.breve.falta.length && d.breve.entregas === 0) items.push({ href: `/academia/escrito/${id}`, texto: `El escrito breve de «${d.materia.titulo}»`, icono: PenLine });
  if (d.examen && !d.examen.falta.length && !d.examen.aprobado) items.push({ href: `/academia/examen/${id}`, texto: `El examen final de «${d.materia.titulo}» está listo`, icono: ClipboardList });
  if (!d.versiculo?.aprendido && d.materia.lecciones.every((l) => l.completada)) items.push({ href: `/academia/materia/${id}`, texto: `Aprender el versículo de «${d.materia.titulo}»`, icono: BookOpen });
  return (
    <>
      {items.map((x) => (
        <li key={x.href + x.texto}>
          <Link href={x.href} className="flex items-start gap-2 font-medium hover:underline" data-testid="salon-pendiente">
            <x.icono className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" /> {x.texto}
          </Link>
        </li>
      ))}
    </>
  );
}

/** Una materia en curso: su avance, la lección que sigue y sus recursos (videos y lecturas del sílabo). */
function MateriaEnCurso({ id }: { id: string }) {
  const q = useMateria(id);
  const d = q.data;
  if (!d) return <div className="glass-card p-5 animate-pulse h-40" />;
  const hechas = d.materia.lecciones.filter((l) => l.completada).length;
  const siguiente = d.materia.lecciones.find((l) => !l.completada);
  const recursos = (d.materia.silabo?.recursos ?? []).filter((r): r is typeof r & { url: string } => !!r.url);
  return (
    <div className="glass-card p-5 flex flex-col gap-3" data-testid={`salon-materia-${id}`}>
      <div>
        <p className="text-xs text-muted-foreground">Nivel {d.materia.nivel}</p>
        <Link href={`/academia/materia/${id}`} className="font-semibold leading-snug hover:underline">{d.materia.titulo}</Link>
      </div>
      <BarraAvance valor={hechas} de={d.materia.lecciones.length} etiqueta={`${hechas} de ${d.materia.lecciones.length} lecciones`} />
      {siguiente ? (
        <Link href={`/academia/leccion/${siguiente.id}`} className="text-sm inline-flex items-center gap-1.5 text-orange-700 dark:text-orange-300 hover:underline">
          <PlayCircle className="w-4 h-4" /> Sigue: {siguiente.titulo}
        </Link>
      ) : (
        <Link href={`/academia/materia/${id}`} className="text-sm inline-flex items-center gap-1.5 text-orange-700 dark:text-orange-300 hover:underline">
          <CheckCircle2 className="w-4 h-4" /> Lecciones terminadas: mira lo que falta
        </Link>
      )}
      {recursos.length > 0 && (
        <div className="border-t border-border/60 pt-2">
          <p className="text-xs text-muted-foreground mb-1">Recursos de la materia</p>
          <ul className="space-y-1">
            {recursos.slice(0, 4).map((r) => (
              <li key={r.url}>
                <a href={r.url} target={r.url.startsWith("/") ? undefined : "_blank"} rel="noopener noreferrer" className="text-sm inline-flex items-start gap-1.5 hover:underline">
                  {r.tipo === "video" ? <Video className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" /> : <BookOpenCheck className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />}
                  <span>{r.titulo}{r.fuente ? <span className="text-muted-foreground"> · {r.fuente}</span> : null}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function MiCuaderno() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const notas = useCuaderno({ vista: "todas" });
  const res = useResaltados();
  const nueva = async () => {
    try {
      const n = await crearNota({ plantilla: "clase" });
      setLocation(`/academia/cuaderno?nota=${n.id}`);
    } catch (e: any) {
      toast({ title: "No se pudo crear la nota", description: e?.message, variant: "destructive" });
    }
  };
  const lista = (notas.data?.notas ?? []).slice(0, 4);
  return (
    <Tarjeta
      titulo="Mi cuaderno"
      icono={NotebookPen}
      accion={<Link href="/academia/cuaderno" className="text-xs text-orange-700 dark:text-orange-300 hover:underline">Abrir</Link>}
    >
      {lista.length ? (
        <ul className="space-y-2" data-testid="salon-cuaderno">
          {lista.map((n) => (
            <li key={n.id}>
              <Link href={`/academia/cuaderno?nota=${n.id}`} className="block rounded-lg px-2 py-1.5 -mx-2 hover:bg-muted/60">
                <span className="font-medium text-sm block truncate">{n.titulo || "Sin título"}</span>
                {n.extracto && <span className="text-xs text-muted-foreground line-clamp-1">{n.extracto}</span>}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted-foreground">Toma apuntes de tus clases, resalta las lecciones y guarda lo que Dios te habla. Se guarda solo y lo ves en todos tus equipos.</p>
      )}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Button size="sm" className="fire-btn-primary" onClick={nueva} data-testid="salon-nueva-nota"><NotebookPen className="w-4 h-4 mr-1.5" /> Notas de clase</Button>
        {!!res.data?.length && (
          <Link href="/academia/cuaderno" className="text-xs text-muted-foreground inline-flex items-center gap-1 hover:underline">
            <Highlighter className="w-3.5 h-3.5" /> {res.data.length} {res.data.length === 1 ? "resaltado" : "resaltados"}
          </Link>
        )}
      </div>
    </Tarjeta>
  );
}

function Herramienta({ href, icono: I, titulo, texto }: { href: string; icono: React.ComponentType<{ className?: string }>; titulo: string; texto: string }) {
  return (
    <Link href={href} className="glass-card p-4 flex items-start gap-3 hover:-translate-y-0.5 transition" data-testid="salon-herramienta">
      <span className="w-10 h-10 rounded-xl bg-orange-500/15 flex items-center justify-center shrink-0"><I className="w-5 h-5 text-orange-600 dark:text-orange-300" /></span>
      <span className="min-w-0">
        <span className="font-semibold block leading-snug">{titulo}</span>
        <span className="text-xs text-muted-foreground">{texto}</span>
      </span>
    </Link>
  );
}

export default function AcademiaSalon() {
  const qc = useQueryClient();
  const { toast } = useToast();
  const q = useAcademiaEstado();
  useTituloAcademia("Mi salón");
  const e = q.data;
  const inscrito = !!e?.matricula && !!e?.ficha;
  const carne = useCarne();
  const estudio = useEstudio(inscrito);
  const versos = useRepasoVersiculos(inscrito);
  const repasoDia = useRepasoDelDia(inscrito);
  const diag = useDiagnostico(inscrito);
  const docs = useCertificados(inscrito);
  if (q.isLoading) return <Cargando />;
  if (q.error?.status === 403) return <PantallaCerrada mensaje={q.error.message} />;
  if (!e) return <Cargando />;
  if (!e.conSesion || !inscrito) {
    return (
      <Layout>
        <div className="max-w-xl mx-auto px-4 py-20 text-center">
          <GraduationCap className="w-12 h-12 mx-auto text-orange-500" />
          <h1 className="font-display text-2xl font-bold mt-4">Tu salón de la academia</h1>
          <p className="text-muted-foreground mt-2 mb-6">
            {e.conSesion
              ? "Tu salón se abre al inscribirte: ahí tienes lo que sigue, tu agenda, tu cuaderno, tu tiempo de estudio y tus documentos."
              : "Entra con tu cuenta para abrir tu salón."}
          </p>
          {e.conSesion ? (
            <Link href="/academia/inscripcion?volver=%2Facademia%2Fsalon"><Button className="fire-btn-primary h-12 px-7">Inscribirme en la academia</Button></Link>
          ) : (
            <a href={loginUrl("/academia/salon")}><Button className="fire-btn-primary h-12 px-7">Entrar</Button></a>
          )}
        </div>
      </Layout>
    );
  }

  const materiasEnCurso = e.niveles.flatMap((n) => n.materias).filter((m) => m.estado === "en-curso").map((m) => m.id);
  const nombre = carne.data?.nombre ?? "";
  const primerNombre = nombre.split(/\s+/)[0] ?? "";
  const pendientesVersos = versos.data?.pendientes ?? 0;
  const alSumar = async (minutos: number) => {
    const r = await sumarEstudio(minutos);
    qc.setQueryData(["academia", "estudio"], r);
  };
  const alCambiarMeta = async (meta: number) => {
    try {
      const r = await cambiarMetaEstudio(meta);
      qc.setQueryData(["academia", "estudio"], r);
    } catch (err: any) {
      toast({ title: "No se pudo cambiar la meta", description: err?.message, variant: "destructive" });
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 pt-6 pb-16" data-testid="salon">
        <Link href="/academia" className="text-sm text-muted-foreground hover:underline">← Academia</Link>

        {/* quién soy en la academia */}
        <header className="mt-4 rounded-3xl p-5 md:p-7 bg-gradient-to-br from-[#2a1207] via-[#3b1606] to-[#160b05] text-white relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-56 h-56 rounded-full bg-orange-500/25 blur-3xl" aria-hidden="true" />
          <div className="relative flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-16 h-20 rounded-xl overflow-hidden border-2 border-amber-300/70 bg-orange-900/60 flex items-center justify-center shrink-0">
              {carne.data?.foto ? <img src={carne.data.foto} alt="" className="w-full h-full object-cover" /> : <span className="font-bold text-xl text-orange-100">{iniciales(nombre || "A")}</span>}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-amber-200/90 text-sm">Mi salón · {e.matricula!.numero}</p>
              <h1 className="font-display text-2xl md:text-3xl font-bold mt-0.5">{primerNombre ? `Hola, ${primerNombre}` : "Mi salón"}</h1>
              <p className="text-orange-100/90 text-sm mt-0.5">{e.matricula!.estatus.texto}{e.matricula!.estatus.honores ? " · Cuadro de honor" : ""}</p>
            </div>
            <dl className="grid grid-cols-3 gap-3 text-center sm:text-right" data-testid="salon-cifras">
              <div>
                <dt className="text-[11px] text-orange-100/80">Racha</dt>
                <dd className="font-display text-xl font-bold flex items-center justify-center sm:justify-end gap-1"><Flame className="w-4 h-4 text-orange-300" />{e.alumno?.racha ?? 0}</dd>
              </div>
              <div>
                <dt className="text-[11px] text-orange-100/80">Lecciones</dt>
                <dd className="font-display text-xl font-bold">{e.alumno?.leccionesHechas ?? 0}</dd>
              </div>
              <div>
                <dt className="text-[11px] text-orange-100/80">Esta semana</dt>
                <dd className="font-display text-xl font-bold">{estudio.data ? `${estudio.data.totalSemana}′` : "—"}</dd>
              </div>
            </dl>
          </div>
        </header>

        <div className="grid gap-4 mt-5 lg:grid-cols-3">
          {/* lo que sigue */}
          <Tarjeta titulo="Lo que sigue" icono={PlayCircle} className="lg:col-span-2 border border-orange-500/40">
            {e.continuar ? (
              <>
                <p className="font-display text-xl md:text-2xl font-bold">{e.continuar.titulo}</p>
                <p className="text-sm text-muted-foreground">{e.continuar.materia}</p>
                <Link href={enlaceContinuar(e.continuar)}>
                  <Button size="lg" className="fire-btn-primary h-12 px-7 mt-4" data-testid="salon-continuar">
                    <PlayCircle className="w-5 h-5 mr-2" /> {e.continuar.leccionId ? `Continuar: lección ${e.continuar.n} de ${e.continuar.de}` : e.continuar.inscribirse ? "Inscribirme en la siguiente materia" : e.continuar.nivel ? "Cerrar el nivel" : "Ir al examen final"}
                  </Button>
                </Link>
              </>
            ) : (
              <p className="text-muted-foreground">No tienes nada pendiente por ahora. ¡Buen trabajo!</p>
            )}
          </Tarjeta>

          {/* para hoy */}
          <Tarjeta titulo="Para hoy" icono={CalendarCheck2}>
            <ul className="space-y-3 text-sm" data-testid="salon-para-hoy">
              {pendientesVersos > 0 && (
                <li>
                  <Link href="/academia/repaso" className="flex items-start gap-2 font-medium hover:underline">
                    <BookOpen className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" /> Repasar {pendientesVersos === 1 ? "1 versículo" : `${pendientesVersos} versículos`} de memoria
                  </Link>
                </li>
              )}
              {(repasoDia.data?.pendientes ?? 0) > 0 && (
                <li>
                  <Link href="/academia/repaso-del-dia" className="flex items-start gap-2 font-medium hover:underline" data-testid="salon-repaso-del-dia">
                    <Brain className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" /> Repaso del día: {Math.min(repasoDia.data?.pendientes ?? 0, 10)} {repasoDia.data?.pendientes === 1 ? "pregunta" : "preguntas"} de tus lecciones
                  </Link>
                </li>
              )}
              {materiasEnCurso.map((id) => <PendientesMateria key={id} id={id} />)}
              {!diag.data?.ultimo && (
                <li>
                  <Link href="/academia/diagnostico" className="flex items-start gap-2 hover:underline">
                    <Compass className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" /> ¿Por dónde sigo? La prueba diagnóstica
                  </Link>
                </li>
              )}
              <li className="text-muted-foreground flex items-start gap-2">
                <Sparkles className="w-4 h-4 mt-0.5 shrink-0" /> Una sesión de estudio de 25 minutos, con el temporizador de aquí abajo.
              </li>
            </ul>
          </Tarjeta>
        </div>

        <div className="grid gap-4 mt-4 lg:grid-cols-3">
          {/* el tiempo de estudio */}
          <Tarjeta titulo="Sesión de estudio" icono={Timer} className="lg:col-span-2">
            <Temporizador alSumar={alSumar} />
            {estudio.data && (
              <div className="mt-5 pt-4 border-t border-border/60">
                <SemanaEstudio e={estudio.data} alCambiarMeta={alCambiarMeta} />
              </div>
            )}
          </Tarjeta>
          <MiCuaderno />
        </div>

        {/* las asignaciones de los cursos de la Escuela (si tiene) */}
        <div className="mt-4">
          <MisAsignacionesPortada activo />
        </div>

        {materiasEnCurso.length > 0 && (
          <section className="mt-8">
            <h2 className="font-display text-2xl font-bold mb-3 flex items-center gap-2"><GraduationCap className="w-6 h-6 text-orange-500" /> Mis materias en curso</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {materiasEnCurso.map((id) => <MateriaEnCurso key={id} id={id} />)}
            </div>
          </section>
        )}

        <section className="mt-8">
          <h2 className="font-display text-2xl font-bold mb-3 flex items-center gap-2"><Sparkles className="w-6 h-6 text-orange-500" /> Mis herramientas</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Herramienta href="/academia/cuaderno" icono={NotebookPen} titulo="Mi cuaderno" texto="Apuntes, resaltados y lo de la Biblia" />
            <Herramienta href="/biblioteca" icono={Library} titulo="La Biblia" texto="Lee, resalta y lleva tus notas al cuaderno" />
            <Herramienta href="/academia/recursos" icono={BookOpenCheck} titulo="Recursos de estudio" texto="Videos, lecturas y lecturas ampliadas de todas las materias" />
            <Herramienta href="/academia/repaso-del-dia" icono={Brain} titulo="Repaso del día" texto={repasoDia.data ? `${repasoDia.data.dominadas} dominadas · ${repasoDia.data.pendientes} para hoy` : "Las preguntas de tus lecciones vuelven para no olvidarlas"} />
            <Herramienta href="/academia/repaso" icono={BookOpen} titulo="Mis versículos" texto={versos.data ? `${versos.data.dominados} dominados · ${pendientesVersos} para hoy` : "El repaso de los versículos de memoria"} />
            <Herramienta href="/academia/diagnostico" icono={Compass} titulo="Prueba diagnóstica" texto="Te sugiere por dónde seguir" />
            <Herramienta href="/academia/carne" icono={IdCard} titulo="Mi carné" texto="Para mostrarlo o descargarlo en PDF" />
            <Herramienta href="/academia/expediente" icono={FileText} titulo="Mi expediente" texto="Tus materias, notas y certificados" />
            <Herramienta href="/capacitaciones" icono={Users} titulo="Clases en vivo" texto="Los cursos de la Escuela" />
            <Herramienta href="/academia/reglamento" icono={ScrollText} titulo="Reglamento" texto="Cómo se estudia y se evalúa" />
          </div>
        </section>

        {!!docs.data?.length && (
          <section className="mt-8">
            <h2 className="font-display text-2xl font-bold mb-3 flex items-center gap-2"><Award className="w-6 h-6 text-orange-500" /> Mis certificados</h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {docs.data.slice(0, 6).map((d) => (
                <li key={d.codigo}>
                  <Link href={`/academia/certificado/${d.codigo}`} className="glass-card p-3 flex items-center gap-2 hover:-translate-y-0.5 transition">
                    {d.tipo === "nivel" ? <GraduationCap className="w-5 h-5 text-orange-500" /> : d.tipo === "especialidad" ? <Layers className="w-5 h-5 text-orange-500" /> : <Award className="w-5 h-5 text-orange-500" />}
                    <span className="text-sm font-medium flex-1 min-w-0 truncate">{d.titulo}</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </Layout>
  );
}
