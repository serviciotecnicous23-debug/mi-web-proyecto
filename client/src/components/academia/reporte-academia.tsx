// La pestaña «Academia» de Reportes: el resumen del panel de seguimiento y sus reportes en CSV. Se carga aparte
// (React.lazy), así Reportes no carga el catálogo de la academia hasta que se abre esta pestaña.
import { Link } from "wouter";
import { Download, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NOMBRE_ESTATUS, type EstatusAlumno } from "@shared/academia";
import { enlaceReporte, useDireccionResumen, type ReporteCsv } from "@/components/academia/api";
import { Barras, Indicador, ListaActividad, TablaMaterias, numero } from "@/components/academia/seguimiento";

const ORDEN_ESTATUS: EstatusAlumno[] = ["aspirante", "activo", "pausa", "egresado", "graduado", "retirado"];
const REPORTES: { archivo: ReporteCsv; texto: string }[] = [
  { archivo: "alumnos.csv", texto: "Alumnos" },
  { archivo: "avance.csv", texto: "Avance por materia" },
  { archivo: "materias.csv", texto: "Resumen por materia" },
];

export default function ReporteAcademia() {
  const q = useDireccionResumen();
  if (q.isLoading) return <p className="text-muted-foreground py-6">Cargando el reporte de la academia…</p>;
  if (!q.data) return <p className="text-sm text-red-600 py-6">{q.error?.message ?? "No se pudo cargar el reporte de la academia."}</p>;
  const d = q.data;
  const t = d.totales;
  return (
    <div className="space-y-5" data-testid="reporte-academia">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <p className="text-sm text-muted-foreground">Academia Avivando el Fuego: inscripciones, avance y notas de los alumnos.</p>
        <div className="flex flex-wrap gap-2">
          <Link href="/academia/direccion"><Button size="sm" className="fire-btn-primary"><GraduationCap className="w-4 h-4 mr-1.5" /> Abrir el panel de seguimiento</Button></Link>
          {d.puede.exportar &&
            REPORTES.map((r) => (
              <a key={r.archivo} href={enlaceReporte(r.archivo)} download>
                <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-1.5" /> {r.texto}</Button>
              </a>
            ))}
        </div>
      </div>
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        <Indicador etiqueta="Inscritos" valor={t.inscritos} nota={`${numero(t.nuevosSemana)} esta semana · ${numero(t.nuevosMes)} en 30 días`} />
        <Indicador etiqueta="Estudiantes activos" valor={d.estatus.activo} nota={`${numero(d.estatus.pausa)} en pausa`} />
        <Indicador etiqueta="Materias aprobadas" valor={t.aprobadas} nota={`${numero(t.lecciones)} lecciones completadas`} />
        <Indicador etiqueta="Promedio general" valor={t.promedio ?? "—"} nota="de las materias aprobadas" />
      </div>
      <section className="glass-card p-5">
        <h3 className="font-semibold mb-3">Materias</h3>
        <TablaMaterias materias={d.materias} enlace={(id) => `/academia/direccion/materia/${id}`} />
      </section>
      <div className="grid gap-5 lg:grid-cols-2">
        <Barras titulo="Alumnos por estatus" filas={ORDEN_ESTATUS.map((k) => ({ nombre: NOMBRE_ESTATUS[k], n: d.estatus[k] }))} />
        <section className="glass-card p-5">
          <h3 className="font-semibold mb-3">Actividad reciente</h3>
          <ListaActividad items={d.actividad.slice(0, 8)} enlaceAlumno={(id) => `/academia/direccion/alumno/${id}`} />
        </section>
      </div>
    </div>
  );
}
