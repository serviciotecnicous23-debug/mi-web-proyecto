// Un documento de la academia (certificado de materia o de nivel): verlo, descargarlo en PDF, imprimirlo y compartir su
// enlace de verificación (server/academia-documentos.ts).
import { useState } from "react";
import { Link, useParams } from "wouter";
import { ArrowLeft, Award, Check, Copy, Download, FileText, ShieldCheck } from "lucide-react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { useCertificado } from "@/components/academia/api";
import { Cargando, PantallaCerrada } from "@/components/academia/ui";
import { DocumentoAjustado, DocumentoVista, imprimirDocumento } from "@/components/academia/documento";
import { descargarCertificadoPdf } from "@/components/academia/certificado-pdf";

export default function AcademiaCertificado() {
  const { codigo } = useParams<{ codigo: string }>();
  const q = useCertificado(codigo);
  const [generando, setGenerando] = useState(false);
  const [copiado, setCopiado] = useState(false);
  if (q.isLoading) return <Cargando />;
  if (q.error?.status === 403) return <PantallaCerrada mensaje={q.error.message} />;
  if (!q.data) {
    return (
      <Layout>
        <div className="max-w-xl mx-auto px-4 py-20 text-center">
          <p className="text-lg mb-5">{q.error?.message ?? "No encontramos ese documento."}</p>
          <Link href="/academia"><Button variant="outline">Volver a la academia</Button></Link>
        </div>
      </Layout>
    );
  }
  const d = q.data;
  const volver = d.tipo === "nivel" ? { href: `/academia/nivel/${d.ref}`, texto: d.nivel ? `Nivel ${d.nivel.n} · ${d.nivel.nombre}` : "El nivel" } : { href: `/academia/materia/${d.ref}`, texto: d.titulo };
  const archivo = `academia-${d.tipo === "nivel" ? `nivel-${d.ref}` : d.ref}-${d.codigo}.pdf`.toLowerCase();
  const pdf = async () => {
    setGenerando(true);
    try {
      await descargarCertificadoPdf(d, archivo);
    } catch {
      imprimirDocumento();
    } finally {
      setGenerando(false);
    }
  };
  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(d.verificar);
      setCopiado(true);
      window.setTimeout(() => setCopiado(false), 2500);
    } catch {
      window.prompt("Copia el enlace de verificación:", d.verificar);
    }
  };
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 pt-6 pb-16">
        <Link href={volver.href} className="text-sm text-muted-foreground hover:underline inline-flex items-center gap-1"><ArrowLeft className="w-4 h-4" /> {volver.texto}</Link>
        <h1 className="heading-display font-display text-3xl md:text-4xl mt-4 mb-2 flex items-center gap-3"><Award className="w-8 h-8 text-orange-500" /> {d.tipo === "nivel" ? d.titulo : "Certificado de la materia"}</h1>
        <p className="text-muted-foreground mb-5">Código de verificación: <strong className="text-foreground tracking-wider" data-testid="certificado-codigo">{d.codigo}</strong></p>
        {d.revocado && (
          <div className="glass-card p-4 mb-5 border border-red-500/40 text-sm" role="alert">Este documento fue revocado{d.motivo ? `: ${d.motivo}` : "."}</div>
        )}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button onClick={pdf} disabled={generando} className="fire-btn-primary" data-testid="certificado-pdf"><Download className="w-4 h-4 mr-1.5" /> {generando ? "Generando…" : "Descargar PDF"}</Button>
          <Button variant="outline" onClick={() => imprimirDocumento()}><FileText className="w-4 h-4 mr-1.5" /> Imprimir</Button>
          <Button variant="outline" onClick={copiar}>{copiado ? <Check className="w-4 h-4 mr-1.5" /> : <Copy className="w-4 h-4 mr-1.5" />} {copiado ? "Enlace copiado" : "Copiar el enlace de verificación"}</Button>
        </div>
        <DocumentoAjustado>
          <DocumentoVista d={d} />
        </DocumentoAjustado>
        <p className="text-sm text-muted-foreground mt-6 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 mt-0.5 text-emerald-600 shrink-0" />
          <span>Cualquiera puede comprobar este documento con el código QR o en <Link href={`/academia/verificar/${d.codigo}`} className="underline">la página de verificación</Link>. La verificación muestra tu nombre, el documento y la fecha, sin la nota.</span>
        </p>
      </div>
    </Layout>
  );
}
