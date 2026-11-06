import type { ReactNode } from "react";
import { Link } from "wouter";
import { Layout } from "@/components/layout";

export type LegalSection = { id: string; title: string; body: ReactNode };

/** Página de texto legal (privacidad, términos): índice arriba y secciones numeradas. */
export function LegalPage({
  kicker,
  title,
  updated,
  intro,
  sections,
}: {
  kicker: string;
  title: ReactNode;
  updated: string;
  intro: ReactNode;
  sections: LegalSection[];
}) {
  return (
    <Layout>
      <section className="section-aurora py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4">
          <span className="glass-pill inline-block mb-5 text-xs">{kicker}</span>
          <h1 className="heading-display font-display text-4xl md:text-6xl">{title}</h1>
          <p className="data-label mt-4">Última actualización: {updated}</p>
          <div className="mt-6 text-muted-foreground md:text-lg leading-relaxed">{intro}</div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 pb-24">
        <nav aria-label="Contenido" className="glass-card p-5 mb-10">
          <p className="data-label mb-3">Contenido</p>
          <ol className="grid gap-1.5 sm:grid-cols-2 text-sm">
            {sections.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-muted-foreground hover:text-primary">
                  {i + 1}. {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="space-y-10">
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} className="scroll-mt-24">
              <h2 className="font-display font-bold uppercase tracking-wide text-lg md:text-xl mb-3">
                <span className="fire-text mr-2">{String(i + 1).padStart(2, "0")}</span>
                {s.title}
              </h2>
              <div className="legal-body space-y-3 text-muted-foreground leading-relaxed">{s.body}</div>
            </section>
          ))}
        </div>

        <p className="mt-14 text-sm text-muted-foreground">
          ¿Preguntas? Escríbenos desde{" "}
          <Link href="/contacto" className="text-primary font-semibold hover:underline">
            Contacto
          </Link>
          .
        </p>
      </div>
    </Layout>
  );
}
