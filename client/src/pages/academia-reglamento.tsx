// El reglamento académico de la academia (shared/academia.ts, REGLAMENTO): página pública, sin cuenta.
import { Link } from "wouter";
import { ArrowLeft, ScrollText } from "lucide-react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { LEMA, NOMBRE_ACADEMIA, REGLAMENTO } from "@shared/academia";

export default function AcademiaReglamento() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-16">
        <Link href="/academia" className="text-sm text-muted-foreground hover:underline inline-flex items-center gap-1"><ArrowLeft className="w-4 h-4" /> Academia</Link>
        <p className="data-label text-orange-600 dark:text-orange-300 mt-5">{NOMBRE_ACADEMIA}</p>
        <h1 className="heading-display font-display text-3xl md:text-5xl mt-1 flex items-center gap-3" data-testid="reglamento-titulo"><ScrollText className="w-9 h-9 text-orange-500" /> {REGLAMENTO.titulo}</h1>
        <p className="accent-serif text-lg mt-4">«{LEMA.frase}» <span className="text-sm not-italic text-muted-foreground">({LEMA.ref})</span></p>
        <p className="text-muted-foreground mt-4">{REGLAMENTO.intro}</p>
        <div className="mt-8 space-y-7">
          {REGLAMENTO.secciones.map((s) => (
            <section key={s.titulo} data-testid="reglamento-seccion">
              <h2 className="font-display text-xl md:text-2xl font-bold">{s.titulo}</h2>
              <ul className="mt-3 space-y-2 list-disc pl-5 text-[15px] leading-7 marker:text-orange-500">
                {s.puntos.map((p) => <li key={p}>{p}</li>)}
              </ul>
            </section>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-10">Versión {REGLAMENTO.version} del reglamento académico.</p>
        <Link href="/academia/inscripcion"><Button className="fire-btn-primary mt-4 h-12 px-7">Inscribirme en la academia</Button></Link>
      </div>
    </Layout>
  );
}
