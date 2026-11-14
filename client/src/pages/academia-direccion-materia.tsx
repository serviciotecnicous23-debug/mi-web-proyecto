// Una materia en el panel de seguimiento: quiénes están inscritos y por dónde va cada uno (lecciones, versículo,
// examen y nota), con sus cifras (server/academia-direccion.ts).
import { Link, useParams } from "wouter";
import { ArrowLeft, CheckCircle2, Download, Sparkles } from "lucide-react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { loginUrl } from "@/lib/login-redirect";
import { enlaceReporte, useDireccionMateria } from "@/components/academia/api";
import { Cargando } from "@/components/academia/ui";
import { ChipEstatus, Indicador, Medidor, fecha, hace } from "@/components/academia/seguimiento";

export default function AcademiaDireccionMateria() {
  const { materiaId } = useParams<{ materiaId: string }>();
  const q = useDireccionMateria(materiaId);
  if (q.isLoading) return <Cargando />;
  if (!q.data) {
    return (
      <Layout>
        <div className="max-w-xl mx-auto px-4 py-20 text-center">
          <p className="text-lg mb-6">{q.error?.message ?? "No se pudo cargar la materia."}</p>
          {q.error?.status === 401 ? (
            <a href={loginUrl()}><Button className="fire-btn-primary h-12 px-7">Entrar</Button></a>
          ) : (
            <Link href="/academia/direccion?tab=materias"><Button variant="outline" className="h-12 px-7">Volver al panel</Button></Link>
          )}
        </div>
      </Layout>
    );
  }
  const { materia: m, alumnos, puede } = q.data;
  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 pt-6 pb-16 space-y-6">
        <Link href="/academia/direccion?tab=materias" className="text-sm text-muted-foreground hover:underline inline-flex items-center gap-1"><ArrowLeft className="w-4 h-4" /> Panel de seguimiento</Link>
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            <p className="data-label text-orange-600 dark:text-orange-300">{m.nivel ? `Nivel ${m.nivel}` : "Especialidad"} · Seguimiento de la materia</p>
            <h1 className="heading-display font-display text-3xl md:text-4xl mt-1" data-testid="materia-seguimiento-titulo">{m.titulo}</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href={`/academia/materia/${m.id}`}><Button variant="outline" size="sm">Ver la materia</Button></Link>
            {puede.exportar && <a href={enlaceReporte("avance.csv")} download><Button variant="outline" size="sm"><Download className="w-4 h-4 mr-1.5" /> Avance por materia</Button></a>}
          </div>
        </header>

        <div className="grid gap-3 grid-cols-2 lg:grid-cols-5">
          <Indicador etiqueta="Inscritos" valor={m.inscritos} />
          <Indicador etiqueta="En curso" valor={m.enCurso} />
          <Indicador etiqueta="Aprobadas" valor={m.aprobadas} />
          <Indicador etiqueta="Promedio" valor={m.promedio ?? "—"} nota="de quienes la aprobaron" />
          <Indicador etiqueta="Avance medio" valor={`${m.avance} %`} nota="de las lecciones" />
        </div>

        <div className="glass-card p-0 overflow-x-auto">
          <table className="w-full text-sm" data-testid="tabla-materia-alumnos">
            <thead>
              <tr className="text-left text-xs text-muted-foreground border-b border-border">
                <th className="py-2.5 px-4 font-medium">Alumno</th>
                <th className="py-2.5 px-3 font-medium">Inscrito</th>
                <th className="py-2.5 px-3 font-medium w-[18%]">Lecciones</th>
                <th className="py-2.5 px-3 font-medium">Versículo</th>
                <th className="py-2.5 px-3 font-medium">Examen</th>
                <th className="py-2.5 px-3 font-medium text-right">Nota</th>
                <th className="py-2.5 px-3 font-medium">Estado</th>
                <th className="py-2.5 px-4 font-medium">Última actividad</th>
              </tr>
            </thead>
            <tbody>
              {alumnos.map((a) => (
                <tr key={a.userId} className="border-b border-border/60 last:border-0 align-top">
                  <td className="py-2.5 px-4">
                    <Link href={`/academia/direccion/alumno/${a.userId}`} className="font-medium hover:underline">{a.nombre}</Link>
                    <span className="block text-xs text-muted-foreground">{[a.matricula, a.iglesia].filter(Boolean).join(" · ")}</span>
                    <span className="block mt-1"><ChipEstatus e={a.estatus} /></span>
                  </td>
                  <td className="py-2.5 px-3 whitespace-nowrap">{fecha(a.avance.inscrita)}</td>
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-2">
                      <Medidor valor={a.avance.lecciones} de={a.avance.de} etiqueta={`${a.avance.lecciones} de ${a.avance.de} lecciones`} />
                      <span className="tabular-nums whitespace-nowrap">{a.avance.lecciones}/{a.avance.de}</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3">{a.avance.versiculo ? <span className="inline-flex items-center gap-1"><Sparkles className="w-3.5 h-3.5 text-orange-600" aria-hidden="true" /> Sí</span> : <span className="text-muted-foreground">No</span>}</td>
                  <td className="py-2.5 px-3 whitespace-nowrap">{a.avance.intentos ? `${a.avance.intentos} · mejor ${a.avance.mejor ?? "—"}` : <span className="text-muted-foreground">Sin dar</span>}</td>
                  <td className="py-2.5 px-3 text-right tabular-nums font-semibold">{a.avance.estado === "aprobada" && a.avance.nota != null ? a.avance.nota : "—"}</td>
                  <td className="py-2.5 px-3">{a.avance.estado === "aprobada" ? <span className="inline-flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" /> Aprobada</span> : "En curso"}</td>
                  <td className="py-2.5 px-4 whitespace-nowrap">{hace(a.ultima)}</td>
                </tr>
              ))}
              {!alumnos.length && (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-muted-foreground">Todavía no hay alumnos inscritos en esta materia.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
