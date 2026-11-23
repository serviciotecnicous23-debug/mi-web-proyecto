// Mi cuaderno en la academia (/academia/cuaderno): el mismo cuaderno que en la Biblioteca (components/cuaderno). Con
// ?nota=<id> abre esa nota (lo usan los enlaces de las lecciones y de la Biblia) y con ?nueva=1, una nota nueva.
import { Link } from "wouter";
import { ArrowLeft, NotebookPen } from "lucide-react";
import { Layout } from "@/components/layout";
import { useTituloAcademia } from "@/components/academia/titulo";
import { Cuaderno } from "@/components/cuaderno/cuaderno";

export default function AcademiaCuaderno() {
  const params = new URLSearchParams(window.location.search);
  const nota = Number(params.get("nota")) || null;
  const nueva = params.get("nueva") === "1";
  useTituloAcademia("Mi cuaderno");
  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 pt-6 pb-16">
        <Link href="/academia" className="text-sm text-muted-foreground hover:underline inline-flex items-center gap-1"><ArrowLeft className="w-4 h-4" /> Academia</Link>
        <h1 className="heading-display font-display text-3xl md:text-4xl mt-4 mb-1 flex items-center gap-3"><NotebookPen className="w-8 h-8 text-orange-500" /> Mi cuaderno</h1>
        <p className="text-sm text-muted-foreground mb-5">
          Tus notas de las clases, tus resaltados y lo que guardas de la Biblia, en un solo lugar. Es solo tuyo, se guarda solo y lo ves igual en la
          Biblioteca y en todos tus equipos.
        </p>
        <Cuaderno modo="academia" notaInicial={nota} nuevaAlAbrir={nueva} />
      </div>
    </Layout>
  );
}
