// La declaración de fe del Ministerio Avivando el Fuego (shared/academia-declaracion.ts): lo que la academia enseña.
// Mientras la Administración no la apruebe en el panel, se muestra como borrador, con los puntos que debe confirmar.
import { Link } from "wouter";
import { AlertTriangle, ArrowLeft, BookOpen, ShieldCheck } from "lucide-react";
import { Layout } from "@/components/layout";
import { NOMBRE_ACADEMIA } from "@shared/academia";
import { DECLARACION_FE } from "@shared/academia-declaracion";
import { useDeclaracion } from "@/components/academia/api";
import { Cargando, PantallaCerrada } from "@/components/academia/ui";

const fechaLarga = (iso: string) => new Date(iso).toLocaleDateString("es", { day: "numeric", month: "long", year: "numeric" });

export default function AcademiaDeclaracion() {
  const q = useDeclaracion();
  if (q.isLoading) return <Cargando />;
  if (q.error?.status === 403) return <PantallaCerrada mensaje={q.error.message} />;
  const aprobada = q.data?.aprobacion ?? null;
  return (
    <Layout>
      <article className="max-w-3xl mx-auto px-4 pt-6 pb-16" data-testid="declaracion-fe">
        <Link href="/academia" className="text-sm text-muted-foreground hover:underline inline-flex items-center gap-1"><ArrowLeft className="w-4 h-4" /> Academia</Link>
        <p className="data-label text-orange-600 dark:text-orange-300 mt-5">{NOMBRE_ACADEMIA}</p>
        <h1 className="heading-display font-display text-3xl md:text-4xl mt-1">{DECLARACION_FE.titulo}</h1>
        {aprobada ? (
          <p className="mt-3 text-sm flex items-center gap-2 text-emerald-700 dark:text-emerald-300" data-testid="declaracion-aprobada">
            <ShieldCheck className="w-4 h-4" /> Aprobada por {aprobada.por} el {fechaLarga(aprobada.fecha)}.
          </p>
        ) : (
          <div className="mt-4 glass-card p-4 border border-orange-500/40 text-sm flex items-start gap-2" role="note" data-testid="declaracion-borrador">
            <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
            <span>
              <strong>Borrador.</strong> {q.data?.cambio ? "El texto cambió después de su aprobación: falta aprobarlo otra vez." : "Falta que la Administración del Ministerio la apruebe."} Los
              puntos marcados «a confirmar» son en los que las iglesias pentecostales difieren: los decide el Ministerio antes de aprobarla.
            </span>
          </div>
        )}
        <p className="text-lg text-muted-foreground mt-6">{DECLARACION_FE.intro}</p>
        <ol className="mt-8 space-y-6">
          {DECLARACION_FE.articulos.map((a) => (
            <li key={a.n} className="glass-card p-5" data-testid="declaracion-articulo">
              <h2 className="font-display text-xl font-bold"><span className="text-orange-500 mr-1.5">{a.n}.</span>{a.titulo}</h2>
              <p className="mt-2 text-[16px] leading-7">{a.texto}</p>
              <p className="mt-2 text-sm text-muted-foreground flex items-start gap-1.5"><BookOpen className="w-4 h-4 mt-0.5 shrink-0" /> {a.refs.join(" · ")}</p>
              {!aprobada && "aConfirmar" in a && a.aConfirmar && (
                <p className="mt-3 rounded-lg bg-orange-500/10 p-3 text-sm" data-testid="declaracion-a-confirmar"><strong>A confirmar:</strong> {a.aConfirmar}</p>
              )}
            </li>
          ))}
        </ol>
        <p className="text-xs text-muted-foreground mt-8">Versión del {DECLARACION_FE.version}. Las citas son de la Reina-Valera 1960.</p>
      </article>
    </Layout>
  );
}
