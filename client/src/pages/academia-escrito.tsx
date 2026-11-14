// El escrito breve de una materia del Nivel 2 en adelante (server/academia-escrito.ts): la consigna, escribir con el
// contador de palabras, entregar y ver la corrección idea por idea. Hay 2 entregas y cuenta la mejor; la respuesta
// modelo se ve después de la última.
import { useState } from "react";
import { Link, useParams } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, PenLine, Send } from "lucide-react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { NOMBRE_ACADEMIA } from "@shared/academia";
import { entregarEscrito, useEscrito } from "@/components/academia/api";
import { EscritaCorregida } from "@/components/academia/examen";
import { Cargando, NotaMedalla, PantallaCerrada } from "@/components/academia/ui";

const palabras = (t: string) => t.split(/\s+/).filter(Boolean).length;

export default function AcademiaEscrito() {
  const { materiaId } = useParams<{ materiaId: string }>();
  const qc = useQueryClient();
  const q = useEscrito(materiaId);
  const [texto, setTexto] = useState("");
  const [pegado, setPegado] = useState(false);
  const [ocupado, setOcupado] = useState(false);
  const [error, setError] = useState<string | null>(null);
  if (q.isLoading) return <Cargando />;
  if (q.error?.status === 403) return <PantallaCerrada mensaje={q.error.message} />;
  if (!q.data) {
    return (
      <Layout>
        <div className="max-w-xl mx-auto px-4 py-20 text-center">
          <p className="text-lg mb-5">{q.error?.message ?? "No se encontró el escrito."}</p>
          <Link href={materiaId ? `/academia/materia/${materiaId}` : "/academia"}><Button variant="outline">Volver a la materia</Button></Link>
        </div>
      </Layout>
    );
  }
  const v = q.data;
  const n = palabras(texto);
  const puede = !v.falta.length && !v.cerrado;
  const entregar = async () => {
    setOcupado(true);
    setError(null);
    try {
      const nueva = await entregarEscrito(v.materia.id, texto, pegado);
      qc.setQueryData(["academia", "escrito", materiaId], nueva);
      void qc.invalidateQueries({ queryKey: ["academia", "materia", v.materia.id] });
      setTexto("");
      setPegado(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e: any) {
      setError(e.message);
    } finally {
      setOcupado(false);
    }
  };
  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-16 space-y-6">
        <Link href={`/academia/materia/${v.materia.id}`} className="text-sm text-muted-foreground hover:underline inline-flex items-center gap-1"><ArrowLeft className="w-4 h-4" /> {v.materia.titulo}</Link>
        <header>
          <p className="data-label text-orange-600 dark:text-orange-300">{NOMBRE_ACADEMIA}</p>
          <h1 className="heading-display font-display text-3xl md:text-4xl mt-1 flex items-center gap-3"><PenLine className="w-8 h-8 text-orange-500" /> Escrito breve</h1>
          <p className="text-muted-foreground mt-2">
            Una respuesta de {v.min} a {v.max} palabras, con tus palabras y con citas de la Biblia. La corrige el sistema idea por idea y la puede revisar la
            Administración. Tienes {v.maxEntregas} entregas y cuenta la mejor. No tiene reloj: escríbelo con calma.
          </p>
        </header>

        <section className="glass-card p-5" data-testid="escrito-consigna">
          <p className="data-label mb-2">La consigna</p>
          <p className="text-[16px] leading-7">{v.pregunta}</p>
          <p className="text-xs text-muted-foreground mt-3">Entregas: {v.entregas} de {v.maxEntregas}{v.mejor != null ? ` · Mejor nota: ${v.mejor}` : ""}</p>
        </section>

        {v.ultimo && (
          <section data-testid="escrito-resultado">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <h2 className="font-display text-xl font-bold">{v.entregas >= v.maxEntregas ? "Tu última entrega" : "Tu primera entrega"}</h2>
              <NotaMedalla nota={v.ultimo.nota} medalla={v.ultimo.medalla} />
            </div>
            {v.ultimo.escritas.map((w, i) => <EscritaCorregida key={i} w={w} />)}
            {v.entregas < v.maxEntregas && (
              <p className="text-sm text-muted-foreground">Mira qué ideas faltaron y vuelve a escribirlo: cuenta la mejor de tus dos entregas. La respuesta modelo se muestra después de la última.</p>
            )}
          </section>
        )}

        {v.falta.length > 0 && <p className="glass-card p-4 text-sm" data-testid="escrito-falta">Para entregarlo te falta {v.falta.join(" y ")}.</p>}
        {v.cerrado && <p className="glass-card p-4 text-sm" data-testid="escrito-cerrado">{v.cerrado}</p>}

        {puede && (
          <section className="glass-card p-5 space-y-3" data-testid="escrito-formulario">
            <label className="text-sm font-medium block" htmlFor="escrito-texto">{v.entregas ? "Tu segunda entrega" : "Tu respuesta"}</label>
            <Textarea
              id="escrito-texto"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              onPaste={() => setPegado(true)}
              rows={12}
              maxLength={4000}
              className="text-[16px] leading-7"
              data-testid="escrito-texto"
            />
            <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
              <span className={n < v.min || n > v.max ? "text-orange-700 dark:text-orange-300" : "text-emerald-700 dark:text-emerald-300"} data-testid="escrito-palabras">
                {n} palabras (de {v.min} a {v.max})
              </span>
              {pegado && <span className="text-xs text-muted-foreground">Pegaste texto: queda anotado para la revisión.</span>}
            </div>
            <Button className="fire-btn-primary" disabled={ocupado || n < v.min || n > v.max} onClick={entregar} data-testid="escrito-entregar">
              <Send className="w-4 h-4 mr-1.5" /> {ocupado ? "Corrigiendo…" : "Entregar"}
            </Button>
            {error && <p role="alert" className="text-sm text-red-600 dark:text-red-400">{error}</p>}
          </section>
        )}
      </div>
    </Layout>
  );
}
