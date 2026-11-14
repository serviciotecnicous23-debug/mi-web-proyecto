// Mis acompañados (server/academia-mentores.ts): las personas que acompaño como mentor en la academia, con su avance
// —su estatus, sus materias en curso y sus lecciones—, sin notas ni datos de contacto, y quién se detuvo.
import { Link } from "wouter";
import { AlertTriangle, ArrowLeft, BookOpen, CheckCircle2, HeartHandshake } from "lucide-react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { loginUrl } from "@/lib/login-redirect";
import { NOMBRE_ACADEMIA } from "@shared/academia";
import { useAcompanados } from "@/components/academia/api";
import { Cargando, PantallaCerrada } from "@/components/academia/ui";
import { Medidor, hace } from "@/components/academia/seguimiento";

export default function AcademiaAcompanados() {
  const q = useAcompanados();
  if (q.isLoading) return <Cargando />;
  if (q.error?.status === 403) return <PantallaCerrada mensaje={q.error.message} />;
  if (!q.data) {
    return (
      <Layout>
        <div className="max-w-xl mx-auto px-4 py-20 text-center">
          <p className="text-lg mb-6">{q.error?.message ?? "No se pudo cargar."}</p>
          {q.error?.status === 401 && <a href={loginUrl("/academia/acompanados")}><Button className="fire-btn-primary h-12 px-7">Entrar</Button></a>}
        </div>
      </Layout>
    );
  }
  const { acompanados, umbral } = q.data;
  const detenidos = acompanados.filter((a) => a.detenido != null).length;
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 pt-6 pb-16 space-y-6">
        <Link href="/academia" className="text-sm text-muted-foreground hover:underline inline-flex items-center gap-1"><ArrowLeft className="w-4 h-4" /> Academia</Link>
        <header>
          <p className="data-label text-orange-600 dark:text-orange-300">{NOMBRE_ACADEMIA} · Mentor</p>
          <h1 className="heading-display font-display text-3xl md:text-4xl mt-1" data-testid="acompanados-titulo">Mis acompañados</h1>
          <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
            Las personas que acompañas en la academia. Ves su avance, no sus notas ni sus datos de contacto. Si alguien tiene materias en curso y
            no estudia hace {umbral} días o más, aparece primero, para que le des una palabra de ánimo.
          </p>
        </header>
        {acompanados.length === 0 ? (
          <p className="glass-card p-6 text-sm text-muted-foreground" data-testid="acompanados-vacio">
            <HeartHandshake className="w-5 h-5 inline -mt-0.5 mr-1.5 text-orange-500" aria-hidden="true" />
            Todavía no acompañas a nadie. La Dirección académica o tu iglesia te pueden elegir como mentor de un alumno.
          </p>
        ) : (
          <>
            {detenidos > 0 && (
              <p className="glass-card p-4 text-sm border border-orange-500/40" role="status" data-testid="acompanados-detenidos">
                <AlertTriangle className="w-4 h-4 inline -mt-0.5 mr-1 text-orange-500" aria-hidden="true" /> {detenidos} {detenidos === 1 ? "persona se detuvo" : "personas se detuvieron"}.
              </p>
            )}
            <ul className="space-y-3">
              {acompanados.map((a) => (
                <li key={a.userId} className={`glass-card p-5 space-y-3 ${a.detenido != null ? "border border-orange-500/40" : ""}`} data-testid="acompanado" data-detenido={a.detenido != null}>
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-semibold">{a.nombre}</p>
                      <p className="text-xs text-muted-foreground">{[a.matricula ? `Matrícula ${a.matricula}` : null, a.estatus.texto, a.iglesia || null].filter(Boolean).join(" · ")}</p>
                    </div>
                    {a.detenido != null ? (
                      <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs bg-orange-500/15 font-medium whitespace-nowrap" data-testid="acompanado-detenido">
                        <AlertTriangle className="w-3 h-3" aria-hidden="true" /> Se detuvo hace {a.detenido} días
                      </span>
                    ) : (
                      a.ultima && <span className="text-xs text-muted-foreground whitespace-nowrap">Estudió {hace(a.ultima)}</span>
                    )}
                  </div>
                  <p className="text-sm">
                    <BookOpen className="w-4 h-4 inline -mt-0.5 mr-1 text-orange-600" aria-hidden="true" /> {a.lecciones} {a.lecciones === 1 ? "lección" : "lecciones"} ·{" "}
                    <CheckCircle2 className="w-4 h-4 inline -mt-0.5 mr-1 text-emerald-600" aria-hidden="true" /> {a.aprobadas} {a.aprobadas === 1 ? "materia aprobada" : "materias aprobadas"}
                  </p>
                  {a.enCurso.length > 0 && (
                    <ul className="space-y-2">
                      {a.enCurso.map((m) => (
                        <li key={m.materiaId} className="flex items-center gap-3 text-sm">
                          <span className="flex-1 min-w-0 truncate">{m.titulo}</span>
                          <span className="w-28 sm:w-40"><Medidor valor={m.lecciones} de={m.de} etiqueta={`${m.lecciones} de ${m.de} lecciones`} /></span>
                          <span className="tabular-nums text-xs w-10 text-right">{m.lecciones}/{m.de}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </Layout>
  );
}
