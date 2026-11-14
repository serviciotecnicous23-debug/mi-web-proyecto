// Un alumno en el panel de seguimiento: su ficha (con permiso de ver el contacto), su avance en cada materia, sus
// niveles, sus certificados y su actividad (server/academia-direccion.ts). Aquí llevan los avisos de cada inscripción.
import { Link, useParams } from "wouter";
import { ArrowLeft, BookOpen, History, Lock, UserRound } from "lucide-react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { loginUrl } from "@/lib/login-redirect";
import { BAUTISMO, COMO_CONOCIO, TIEMPO_FE, etiquetaDe } from "@shared/academia-inscripcion";
import type { AlumnoDetalle } from "@shared/academia-direccion";
import { useDireccionAlumno } from "@/components/academia/api";
import { Cargando } from "@/components/academia/ui";
import { ChipEstatus, ListaActividad, NivelesYCertificados, TablaAvance, fecha, hace } from "@/components/academia/seguimiento";

const fechaNacimiento = (f: string) => new Date(`${f}T12:00:00Z`).toLocaleDateString("es", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

function Ficha({ d }: { d: AlumnoDetalle }) {
  const f = d.ficha;
  const a = d.fila;
  const filas: [string, string][] = f
    ? [
        ["Teléfono o WhatsApp", f.telefono],
        ["Correo", a.correo ?? ""],
        ["Fecha de nacimiento", f.nacimiento ? fechaNacimiento(f.nacimiento) : ""],
        ["País y ciudad", [f.pais, f.ciudad].filter(Boolean).join(" · ")],
        ["Iglesia", f.iglesiaNombre ?? f.iglesiaOtra],
        ["Pastor o líder", f.pastor],
        ["Tiempo en la fe", etiquetaDe(TIEMPO_FE, f.tiempoFe)],
        ["Bautismo en agua", etiquetaDe(BAUTISMO, f.bautismo)],
        ["Sirve en", f.ministerio],
        ["Conoció la academia por", etiquetaDe(COMO_CONOCIO, f.comoConocio)],
        ["Lo que espera aprender", f.espera],
      ]
    : [
        ["País y ciudad", [a.pais, a.ciudad].filter(Boolean).join(" · ")],
        ["Iglesia", a.iglesia],
      ];
  return (
    <section className="glass-card p-5" data-testid="alumno-ficha">
      <h2 className="font-semibold flex items-center gap-2 mb-3"><UserRound className="w-4 h-4 text-orange-600" /> Ficha de inscripción</h2>
      <dl className="grid gap-3 sm:grid-cols-2 text-[15px]">
        {filas.map(([k, v]) => (
          <div key={k} className={k === "Lo que espera aprender" ? "sm:col-span-2" : ""}>
            <dt className="text-xs text-muted-foreground">{k}</dt>
            <dd className={v ? "whitespace-pre-line break-words" : "text-muted-foreground"}>{v || "—"}</dd>
          </div>
        ))}
      </dl>
      {!f && <p className="text-xs text-muted-foreground mt-4 flex items-center gap-1.5"><Lock className="w-3.5 h-3.5" /> Los datos de contacto los ven la Dirección académica y la iglesia del alumno.</p>}
      {f && <p className="text-xs text-muted-foreground mt-4">Ficha actualizada el {fecha(f.actualizada)}.</p>}
    </section>
  );
}

export default function AcademiaDireccionAlumno() {
  const { alumnoId } = useParams<{ alumnoId: string }>();
  const q = useDireccionAlumno(alumnoId);
  if (q.isLoading) return <Cargando />;
  if (!q.data) {
    return (
      <Layout>
        <div className="max-w-xl mx-auto px-4 py-20 text-center">
          <p className="text-lg mb-6">{q.error?.message ?? "No se pudo cargar al alumno."}</p>
          {q.error?.status === 401 ? (
            <a href={loginUrl()}><Button className="fire-btn-primary h-12 px-7">Entrar</Button></a>
          ) : (
            <Link href="/academia/direccion"><Button variant="outline" className="h-12 px-7">Volver al panel</Button></Link>
          )}
        </div>
      </Layout>
    );
  }
  const d = q.data;
  const a = d.fila;
  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 pt-6 pb-16 space-y-6">
        <Link href="/academia/direccion?tab=alumnos" className="text-sm text-muted-foreground hover:underline inline-flex items-center gap-1"><ArrowLeft className="w-4 h-4" /> Panel de seguimiento</Link>
        <header className="flex items-start gap-4">
          {d.ficha?.foto && <img src={d.ficha.foto} alt={`Foto del carné de ${a.nombre}`} className="w-20 h-[100px] rounded-xl object-cover border border-orange-500/40 shrink-0" data-testid="alumno-foto" />}
          <div className="min-w-0">
          <p className="data-label text-orange-600 dark:text-orange-300">Alumno · Matrícula {a.matricula}</p>
          <h1 className="heading-display font-display text-3xl md:text-4xl mt-1" data-testid="alumno-nombre">{a.nombre}</h1>
          <div className="flex flex-wrap items-center gap-2 mt-3 text-sm">
            <ChipEstatus e={a.estatus} />
            <span className="text-muted-foreground">Promoción {a.promocion} · inscrito el {fecha(a.desde)} · última actividad {hace(a.ultima)}</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{[a.iglesia, a.pais].filter(Boolean).join(" · ")}</p>
          </div>
        </header>

        <Ficha d={d} />

        <section className="glass-card p-5">
          <h2 className="font-semibold flex items-center gap-2 mb-3"><BookOpen className="w-4 h-4 text-orange-600" /> Materias: por dónde va</h2>
          <TablaAvance materias={d.materias} />
        </section>

        <NivelesYCertificados d={d} />

        <section className="glass-card p-5">
          <h2 className="font-semibold flex items-center gap-2 mb-3"><History className="w-4 h-4 text-orange-600" /> Su actividad</h2>
          <ListaActividad items={d.actividad} />
        </section>
      </div>
    </Layout>
  );
}
