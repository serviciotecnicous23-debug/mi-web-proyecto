// El carné digital de la academia: acredita la matrícula y se verifica con su QR (server/academia-matricula.ts).
// Se dibuja en alta resolución con el diseño de Avivando el Fuego (components/academia/carne-lienzo.ts): lo que se ve
// es lo mismo que se descarga en PDF (hoja carta con el frente y el reverso a tamaño real) o en imagen.
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Download, FileText, IdCard, ImageDown, Printer, ShieldCheck } from "lucide-react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { loginUrl } from "@/lib/login-redirect";
import type { CarneVista } from "@shared/academia";
import { useCarne } from "@/components/academia/api";
import { Cargando, PantallaCerrada } from "@/components/academia/ui";
import { FotoCarne } from "@/components/academia/foto-carne";
import { descargarCarneImagen, descargarCarnePdf, dibujarFrente, dibujarReverso, imprimirCarne } from "@/components/academia/carne-lienzo";

const iniciales = (nombre: string) =>
  nombre
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join("");

/** El frente y el reverso, tal como se descargan. */
function CarneDibujado({ c }: { c: CarneVista }) {
  const [caras, setCaras] = useState<{ frente: string; reverso: string } | null>(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    let vivo = true;
    setCaras(null);
    Promise.all([dibujarFrente(c), dibujarReverso(c)])
      .then(([f, r]) => vivo && setCaras({ frente: f.toDataURL("image/png"), reverso: r.toDataURL("image/png") }))
      .catch(() => vivo && setError(true));
    return () => {
      vivo = false;
    };
  }, [c.foto, c.numero, c.estatus.texto, c.nombre]);
  if (error) return <p className="text-sm text-red-600 dark:text-red-400" role="alert">No se pudo dibujar el carné. Vuelve a cargar la página.</p>;
  if (!caras) return <div className="aspect-[1012/638] w-full rounded-2xl bg-muted animate-pulse" aria-label="Dibujando el carné" />;
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <figure>
        <img src={caras.frente} alt={`Frente del carné de ${c.nombre}`} className="w-full rounded-2xl shadow-lg" data-testid="carne-frente" />
        <figcaption className="text-xs text-muted-foreground mt-1.5 text-center">Frente</figcaption>
      </figure>
      <figure>
        <img src={caras.reverso} alt="Reverso del carné" className="w-full rounded-2xl shadow-lg" data-testid="carne-reverso" />
        <figcaption className="text-xs text-muted-foreground mt-1.5 text-center">Reverso</figcaption>
      </figure>
    </div>
  );
}

export default function AcademiaCarne() {
  const qc = useQueryClient();
  const { toast } = useToast();
  const q = useCarne();
  const [haciendo, setHaciendo] = useState<"" | "pdf" | "imagen" | "imprimir">("");
  if (q.isLoading) return <Cargando />;
  if (q.error?.status === 403) return <PantallaCerrada mensaje={q.error.message} />;
  if (!q.data) {
    const sinMatricula = q.error?.status === 409;
    const sinSesion = q.error?.status === 401;
    return (
      <Layout>
        <div className="max-w-xl mx-auto px-4 py-20 text-center">
          <IdCard className="w-12 h-12 mx-auto text-orange-500" />
          <p className="text-lg mt-4 mb-5">{sinMatricula ? "Tu carné se entrega al inscribirte en la academia." : q.error?.message ?? "No se pudo cargar tu carné."}</p>
          {sinMatricula && <Link href="/academia/inscripcion?volver=%2Facademia%2Fcarne"><Button className="fire-btn-primary h-12 px-7">Inscribirme en la academia</Button></Link>}
          {sinSesion && <a href={loginUrl("/academia/carne")}><Button className="fire-btn-primary h-12 px-7">Entrar</Button></a>}
        </div>
      </Layout>
    );
  }
  const c = q.data;
  const hacer = async (que: "pdf" | "imagen" | "imprimir") => {
    setHaciendo(que);
    try {
      if (que === "pdf") await descargarCarnePdf(c);
      else if (que === "imagen") await descargarCarneImagen(c);
      else await imprimirCarne(c);
      if (que !== "imprimir") toast({ title: que === "pdf" ? "Carné descargado en PDF" : "Carné descargado como imagen", description: que === "pdf" ? "Una hoja carta con el frente y el reverso a tamaño real, lista para imprimir." : "Guárdalo en tu teléfono para mostrarlo." });
    } catch (e: any) {
      toast({ title: "No se pudo", description: e?.message ?? "Inténtalo otra vez.", variant: "destructive" });
    } finally {
      setHaciendo("");
    }
  };
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 pt-6 pb-16">
        <Link href="/academia" className="text-sm text-muted-foreground hover:underline inline-flex items-center gap-1"><ArrowLeft className="w-4 h-4" /> Academia</Link>
        <h1 className="heading-display font-display text-3xl md:text-4xl mt-4 mb-2 flex items-center gap-3"><IdCard className="w-8 h-8 text-orange-500" /> Mi carné</h1>
        <p className="text-sm text-muted-foreground mb-5">Tu carné de estudiante de la academia, con su código QR para verificarlo.</p>
        <div className="flex flex-wrap gap-2 mb-6">
          <Button onClick={() => hacer("pdf")} disabled={!!haciendo} className="fire-btn-primary" data-testid="carne-pdf">
            <Download className="w-4 h-4 mr-1.5" /> {haciendo === "pdf" ? "Preparando…" : "Descargar PDF para imprimir"}
          </Button>
          <Button variant="outline" onClick={() => hacer("imagen")} disabled={!!haciendo} data-testid="carne-imagen">
            <ImageDown className="w-4 h-4 mr-1.5" /> {haciendo === "imagen" ? "Preparando…" : "Descargar imagen"}
          </Button>
          <Button variant="outline" onClick={() => hacer("imprimir")} disabled={!!haciendo} data-testid="carne-imprimir">
            <Printer className="w-4 h-4 mr-1.5" /> Imprimir
          </Button>
        </div>
        <CarneDibujado c={c} />
        <p className="text-xs text-muted-foreground mt-3 flex items-start gap-1.5">
          <FileText className="w-3.5 h-3.5 mt-0.5 shrink-0" />
          El PDF es una hoja carta con el frente y el reverso a tamaño real (85,6 × 54 mm, como una tarjeta), con marcas para recortar. Imprímelo al 100 %.
        </p>
        <div className="max-w-[540px] mt-8">
          <FotoCarne foto={c.foto} propia={c.fotoPropia} iniciales={iniciales(c.nombre)} alGuardar={() => void qc.invalidateQueries({ queryKey: ["academia"] })} />
        </div>
        <p className="text-sm text-muted-foreground mt-6 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 mt-0.5 text-emerald-600 shrink-0" />
          <span>
            El QR lleva a <Link href={`/academia/verificar/${c.codigo}`} className="underline">la verificación de tu carné</Link>: muestra tu nombre, tu matrícula y
            tu estatus de hoy, sin notas.
          </span>
        </p>
      </div>
    </Layout>
  );
}
