// La prueba diagnóstica (server/academia-diagnostico.ts): qué es, mi último resultado con la sugerencia de por dónde
// empezar y qué materias podría aprobar por suficiencia. La prueba misma está en /academia/diagnostico/prueba.
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Award, CheckCircle2, Compass, RotateCcw } from "lucide-react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { loginUrl } from "@/lib/login-redirect";
import { DIAGNOSTICO, NOMBRE_ACADEMIA } from "@shared/academia";
import { baseDiagnostico, useDiagnostico } from "@/components/academia/api";
import { PantallaExamen } from "@/components/academia/examen";
import { Cargando, PantallaCerrada } from "@/components/academia/ui";
import { Medidor } from "@/components/academia/seguimiento";

const fechaLarga = (iso: string) => new Date(iso).toLocaleDateString("es", { day: "numeric", month: "long", year: "numeric" });

export function AcademiaDiagnosticoPrueba() {
  return (
    <PantallaExamen
      destino={{
        base: baseDiagnostico,
        tipo: "diagnostico",
        titulo: "Prueba diagnóstica",
        volver: { href: "/academia/diagnostico", texto: "La prueba diagnóstica" },
        detalle: `${DIAGNOSTICO.porMateria} preguntas de cada materia, para saber por dónde te conviene empezar.`,
      }}
    />
  );
}

export default function AcademiaDiagnostico() {
  const q = useDiagnostico();
  if (q.isLoading) return <Cargando />;
  if (q.error?.status === 403) return <PantallaCerrada mensaje={q.error.message} />;
  if (q.error?.status === 401) {
    return (
      <Layout>
        <div className="max-w-xl mx-auto px-4 py-20 text-center">
          <Compass className="w-12 h-12 mx-auto text-orange-500" />
          <p className="text-lg mt-4 mb-6">Entra con tu cuenta para hacer la prueba diagnóstica.</p>
          <a href={loginUrl("/academia/diagnostico")}><Button className="fire-btn-primary h-12 px-7">Entrar</Button></a>
        </div>
      </Layout>
    );
  }
  const d = q.data;
  const u = d?.ultimo ?? null;
  const minutos = d ? Math.ceil((d.preguntas * DIAGNOSTICO.segundos) / 60) : 0;
  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-16 space-y-6">
        <Link href="/academia" className="text-sm text-muted-foreground hover:underline inline-flex items-center gap-1"><ArrowLeft className="w-4 h-4" /> Academia</Link>
        <header>
          <p className="data-label text-orange-600 dark:text-orange-300">{NOMBRE_ACADEMIA}</p>
          <h1 className="heading-display font-display text-3xl md:text-4xl mt-1 flex items-center gap-3"><Compass className="w-8 h-8 text-orange-500" /> Prueba diagnóstica</h1>
          <p className="text-muted-foreground mt-2">
            Unas preguntas de cada materia para saber por dónde te conviene empezar y qué materias ya conoces. Solo sugiere: no aprueba nada ni cambia tu
            avance.
          </p>
        </header>

        {u && (
          <section className="glass-card p-5 space-y-4" data-testid="diagnostico-resultado">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-semibold text-lg">Tu resultado del {fechaLarga(u.fecha)}</h2>
              <p className="text-sm text-muted-foreground">{u.aciertos} de {u.de} bien</p>
            </div>
            <p className="rounded-xl bg-orange-500/10 p-4" data-testid="diagnostico-sugerencia">{u.sugerencia.texto}</p>
            <div className="flex flex-wrap gap-2">
              {u.sugerencia.empezar && (
                <Link href={`/academia/materia/${u.sugerencia.empezar.materiaId}`}>
                  <Button className="fire-btn-primary">Empezar por «{u.sugerencia.empezar.titulo}» <ArrowRight className="w-4 h-4 ml-1.5" /></Button>
                </Link>
              )}
            </div>
            {u.sugerencia.suficiencia.length > 0 && (
              <div>
                <p className="text-sm font-semibold mb-2 flex items-center gap-1.5"><Award className="w-4 h-4 text-orange-500" /> Podrías aprobarlas por suficiencia</p>
                <ul className="space-y-1.5">
                  {u.sugerencia.suficiencia.map((m) => (
                    <li key={m.materiaId}>
                      <Link href={`/academia/suficiencia/${m.materiaId}`} className="text-sm inline-flex items-center gap-1 text-orange-600 dark:text-orange-300 hover:underline">
                        {m.titulo}: ver su examen de suficiencia <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div>
              <p className="text-sm font-semibold mb-2">Cómo te fue en cada materia</p>
              <ul className="space-y-2">
                {u.porMateria.map((m) => (
                  <li key={m.id} className="flex items-center gap-3 text-sm">
                    <span className="flex-1 min-w-0 truncate">{m.nivel ? `Nivel ${m.nivel} · ` : ""}{m.titulo}</span>
                    <span className="w-24 sm:w-32"><Medidor valor={m.aciertos} de={m.de} etiqueta={`${m.aciertos} de ${m.de}`} /></span>
                    <span className="tabular-nums w-10 text-right">{m.aciertos}/{m.de}</span>
                    {m.aciertos === m.de && <CheckCircle2 className="w-4 h-4 text-emerald-600" aria-label="Todas bien" />}
                  </li>
                ))}
              </ul>
            </div>
            {u.repetirDesde && <p className="text-xs text-muted-foreground">La puedes repetir desde el {fechaLarga(u.repetirDesde)}.</p>}
          </section>
        )}

        {(!u || !u.repetirDesde) && (
          <section className="glass-card p-5">
            <h2 className="font-semibold text-lg">{u ? "Repetir la prueba" : "Cómo es"}</h2>
            <ul className="text-sm text-muted-foreground mt-2 space-y-1.5 list-disc pl-5">
              <li>{d?.preguntas ?? 0} preguntas ({DIAGNOSTICO.porMateria} de cada materia), {DIAGNOSTICO.segundos} segundos cada una: unos {minutos} minutos.</li>
              <li>No tiene nota para aprobar: al terminar verás por dónde empezar y qué materias ya conoces.</li>
              <li>Se puede repetir cada {DIAGNOSTICO.diasEntre} días.</li>
            </ul>
            <Link href="/academia/diagnostico/prueba">
              <Button className="fire-btn-primary mt-4 h-12 px-7" data-testid="diagnostico-empezar">
                {u ? <><RotateCcw className="w-4 h-4 mr-2" /> Repetir la prueba</> : <>Hacer la prueba <ArrowRight className="w-4 h-4 ml-2" /></>}
              </Button>
            </Link>
          </section>
        )}
      </div>
    </Layout>
  );
}
