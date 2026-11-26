// El perfil de un estudiante en el cuadro de honor (server/academia-honor.ts): su puesto, sus números, los niveles que
// cerró, su vitrina de insignias y sus medallas. Solo lo ven los estudiantes inscritos y la Administración; nunca muestra
// el teléfono ni el correo.
import { Link, useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Award, Crown, GraduationCap, Medal, Trophy } from "lucide-react";
import { Layout } from "@/components/layout";
import { useTituloAcademia } from "@/components/academia/titulo";
import { Cargando } from "@/components/academia/ui";
import { pedir, type ErrorAcademia } from "@/components/academia/api";
import { VitrinaInsignias } from "@/components/academia/insignias";
import type { PerfilHonor } from "@shared/academia-honor";

const fecha = (iso: string) => new Date(iso).toLocaleDateString("es", { day: "numeric", month: "long", year: "numeric" });

function Dato({ valor, texto, destacado = false }: { valor: string | number; texto: string; destacado?: boolean }) {
  return (
    <div className={`rounded-2xl border p-3 text-center ${destacado ? "border-amber-400/70 bg-amber-500/10" : "border-border bg-card"}`}>
      <p className={`text-2xl font-black tabular-nums ${destacado ? "text-amber-600" : ""}`}>{valor}</p>
      <p className="text-[11px] text-muted-foreground leading-tight mt-0.5">{texto}</p>
    </div>
  );
}

export default function AcademiaHonorAlumno() {
  const { id } = useParams<{ id: string }>();
  const q = useQuery<PerfilHonor, ErrorAcademia>({
    queryKey: ["honor", "alumno", id],
    queryFn: () => pedir("GET", `/api/academia/honor/alumno/${encodeURIComponent(id!)}`),
    enabled: !!id,
    retry: false,
  });
  useTituloAcademia(q.data ? `${q.data.nombre} · Cuadro de honor` : "Cuadro de honor");
  if (q.isLoading) return <Cargando />;
  const p = q.data;
  return (
    <Layout>
      <div className="max-w-xl mx-auto px-4 pt-5 pb-16" data-testid="honor-perfil">
        <Link href="/academia/cuadro-de-honor" className="text-sm text-muted-foreground hover:underline inline-flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Cuadro de honor
        </Link>
        {!p ? (
          <p className="mt-6 rounded-3xl border border-border p-6 text-center">{q.error?.message ?? "No se encontró ese estudiante."}</p>
        ) : (
          <>
            <div className="mt-5 flex items-center gap-4">
              <span className="w-16 h-16 shrink-0 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 text-white flex items-center justify-center text-2xl font-black shadow-lg">
                {p.nombre.charAt(0)}
              </span>
              <div className="min-w-0">
                <h1 className="font-display text-2xl font-bold leading-tight">
                  {p.nombre}
                  {p.propio && <span className="ml-2 align-middle rounded-full bg-amber-500 text-white px-2 py-0.5 text-[11px] font-bold">Tú</span>}
                </h1>
                <p className="text-sm text-muted-foreground leading-snug">{p.estatusTexto}</p>
                <p className="text-xs text-muted-foreground">{[p.pais, p.iglesia].filter(Boolean).join(" · ")}</p>
              </div>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">En la academia desde el {fecha(p.desde)}.</p>

            {p.puesto != null && (
              <div className="mt-4 rounded-3xl bg-gradient-to-r from-yellow-400 to-amber-600 text-white p-4 flex items-center gap-3 shadow-md" data-testid="perfil-puesto">
                <Trophy className="w-9 h-9 shrink-0" />
                <div>
                  <p className="text-xl font-black leading-tight">Puesto {p.puesto} en la academia</p>
                  {p.puestoNivel != null && <p className="text-sm font-semibold opacity-95">Puesto {p.puestoNivel} en el Nivel {p.nivel}</p>}
                </div>
              </div>
            )}

            <div className="mt-4 grid grid-cols-3 gap-2">
              <Dato valor={p.puntos} texto="puntos de honor" destacado />
              <Dato valor={p.aprobadas ? p.promedio : "—"} texto="promedio (sin extra)" />
              <Dato valor={p.aprobadas} texto={p.aprobadas === 1 ? "materia aprobada" : "materias aprobadas"} />
            </div>
            {p.extra > 0 && (
              <p className="mt-2 text-sm text-amber-700 dark:text-amber-300 flex items-center gap-1.5"><Crown className="w-4 h-4" /> +{p.extra} puntos extra ganados con los retos de dominio.</p>
            )}

            {p.niveles.length > 0 && (
              <section className="mt-6">
                <h2 className="font-display text-xl font-bold mb-2 flex items-center gap-2"><GraduationCap className="w-5 h-5 text-orange-500" /> Niveles completos</h2>
                <div className="flex flex-wrap gap-2">
                  {p.niveles.map((n) => (
                    <span key={n.nivel} className={`rounded-full px-3 py-1 text-sm font-bold ${n.honores ? "bg-gradient-to-r from-yellow-400 to-amber-600 text-white" : "bg-muted"}`}>
                      Nivel {n.nivel}{n.honores ? " · con honores" : ""}
                    </span>
                  ))}
                </div>
              </section>
            )}

            <div className="mt-6">
              <VitrinaInsignias insignias={p.insignias} propio={p.propio} />
            </div>

            <section className="mt-2">
              <h2 className="font-display text-xl font-bold mb-2 flex items-center gap-2"><Medal className="w-5 h-5 text-orange-500" /> Medallas de práctica</h2>
              {p.medallas.length === 0 ? (
                <p className="rounded-2xl border border-dashed border-border p-4 text-center text-sm text-muted-foreground">
                  {p.propio ? "Practica para ganar tus primeras medallas." : "Todavía no tiene medallas de práctica."}
                </p>
              ) : (
                <ul className="grid gap-2">
                  {p.medallas.map((m) => (
                    <li key={m.clave} className="rounded-2xl border border-amber-400/50 bg-amber-50/60 dark:bg-amber-950/20 p-3 flex items-start gap-3">
                      <Award className="w-6 h-6 text-amber-600 shrink-0" />
                      <span>
                        <span className="block font-bold leading-tight">{m.nombre}</span>
                        <span className="block text-xs text-muted-foreground">{m.detalle} · {fecha(m.fecha)}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </>
        )}
      </div>
    </Layout>
  );
}
