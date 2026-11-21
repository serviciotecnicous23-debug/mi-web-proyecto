// Una materia en el panel de seguimiento: quiénes están inscritos y por dónde va cada uno (lecciones, versículo,
// examen y nota), con sus cifras (server/academia-direccion.ts).
import { Link, useParams } from "wouter";
import { ArrowLeft, CheckCircle2, Download, Sparkles } from "lucide-react";
import { Layout } from "@/components/layout";
import { useTituloAcademia } from "@/components/academia/titulo";
import { Button } from "@/components/ui/button";
import { loginUrl } from "@/lib/login-redirect";
import { enlaceReporte, useDireccionMateria } from "@/components/academia/api";
import { Cargando } from "@/components/academia/ui";
import { ChipEstatus, Indicador, Medidor, fecha, hace } from "@/components/academia/seguimiento";
import { useArea } from "@/components/academia/area";

export default function AcademiaDireccionMateria() {
  const { materiaId } = useParams<{ materiaId: string }>();
  const area = useArea();
  const q = useDireccionMateria(materiaId);
  useTituloAcademia(q.data ? `Seguimiento · ${q.data.materia.titulo}` : "Seguimiento de la materia");
  if (q.isLoading) return <Cargando />;
  if (!q.data) {
    return (
      <Layout>
        <div className="max-w-xl mx-auto px-4 py-20 text-center">
          <p className="text-lg mb-6">{q.error?.message ?? "No se pudo cargar la materia."}</p>
          {q.error?.status === 401 ? (
            <a href={loginUrl()}><Button className="fire-btn-primary h-12 px-7">Entrar</Button></a>
          ) : (
            <Link href={`${area.base}?tab=materias`}><Button variant="outline" className="h-12 px-7">Volver al panel</Button></Link>
          )}
        </div>
      </Layout>
    );
  }
  const { materia: m, alumnos, puede } = q.data;
  const embudo = q.data.embudo ?? [];
  // la lección donde más alumnos se quedan (la mayor caída respecto a la anterior, si son al menos 2)
  let masCae = -1;
  for (let i = 1; i < embudo.length; i++) {
    const cae = embudo[i - 1].completaron - embudo[i].completaron;
    if (cae >= 2 && (masCae < 0 || cae > embudo[masCae - 1].completaron - embudo[masCae].completaron)) masCae = i;
  }
  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 pt-4 sm:pt-6 pb-28 space-y-5">
        <Link href={`${area.base}?tab=materias`} className="text-sm text-muted-foreground hover:underline inline-flex items-center gap-1"><ArrowLeft className="w-4 h-4" /> Las materias</Link>
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            <p className="data-label text-orange-600 dark:text-orange-300">{m.grupo ?? (m.nivel ? `Nivel ${m.nivel}` : "Especialidad")} · Seguimiento de la materia</p>
            <h1 className="heading-display font-display text-2xl sm:text-4xl mt-1 leading-tight" data-testid="materia-seguimiento-titulo">{m.titulo}</h1>
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

        {embudo.length > 0 && m.inscritos > 0 && (
          <section className="glass-card p-5" data-testid="materia-embudo">
            <h2 className="font-semibold">Hasta dónde llegan</h2>
            <p className="text-xs text-muted-foreground mt-1 mb-3">
              Cuántos de los {m.inscritos} inscritos completaron cada lección. Donde baja de golpe, conviene mirar esa lección: puede ser larga o difícil.
            </p>
            <ul className="space-y-2.5">
              {embudo.map((l, i) => (
                <li key={l.n} className="grid grid-cols-[minmax(0,1fr)_7rem_3rem] sm:grid-cols-[minmax(0,1fr)_12rem_3rem] items-center gap-3 text-sm">
                  <span className="min-w-0">
                    <span className="block truncate">Lección {l.n}: {l.titulo}</span>
                    {i === masCae && <span className="block text-xs text-orange-700 dark:text-orange-300">Aquí se detienen más: {embudo[i - 1].completaron - l.completaron} no la completaron</span>}
                  </span>
                  <Medidor valor={l.completaron} de={m.inscritos} etiqueta={`${l.completaron} de ${m.inscritos} completaron la lección ${l.n}`} />
                  <span className="tabular-nums text-right">{l.completaron}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* en el teléfono: una tarjeta por alumno (la tabla, en la computadora) */}
        <ul className="space-y-2 md:hidden" data-testid="tarjetas-materia-alumnos">
          {alumnos.map((a) => (
            <li key={a.userId}>
              <Link href={`${area.base}/alumno/${a.userId}?tab=informe`} className="block glass-card p-4 border border-transparent hover:border-orange-500/50 transition">
                <span className="flex items-start justify-between gap-2">
                  <span className="min-w-0">
                    <span className="block font-semibold leading-snug">{a.nombre}</span>
                    <span className="block text-xs text-muted-foreground">{[a.matricula, a.iglesia].filter(Boolean).join(" · ")}</span>
                  </span>
                  <span className="text-sm font-semibold tabular-nums shrink-0">{a.avance.estado === "aprobada" && a.avance.nota != null ? a.avance.nota : ""}</span>
                </span>
                <span className="mt-2 block"><Medidor valor={a.avance.lecciones} de={a.avance.de} etiqueta={`${a.avance.lecciones} de ${a.avance.de} lecciones`} /></span>
                <span className="block text-xs mt-1.5">
                  {a.avance.estado === "aprobada" ? "Aprobada" : "En curso"} · {a.avance.lecciones} de {a.avance.de} lecciones · versículo {a.avance.versiculo ? "aprendido" : "pendiente"} · {a.avance.intentos ? `final: ${a.avance.intentos} ${a.avance.intentos === 1 ? "intento" : "intentos"}, mejor ${a.avance.mejor ?? "—"}` : "sin dar el final"}
                </span>
                <span className="block text-xs text-muted-foreground mt-1">Última actividad {hace(a.ultima)} · toca para ver su informe</span>
              </Link>
            </li>
          ))}
          {!alumnos.length && <li className="glass-card p-6 text-center text-sm text-muted-foreground">Todavía no hay alumnos inscritos en esta materia.</li>}
        </ul>
        <div className="glass-card p-0 overflow-x-auto hidden md:block">
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
                    <Link href={`${area.base}/alumno/${a.userId}?tab=informe`} className="font-medium hover:underline">{a.nombre}</Link>
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
