// Mi expediente académico (kárdex): las materias en las que me inscribí con su avance y su nota, mis niveles y mis
// certificados (GET /api/academia/expediente). Se imprime tal cual.
import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, BookOpen, Download, FileText, IdCard } from "lucide-react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { loginUrl } from "@/lib/login-redirect";
import { ACLARACION_DOCUMENTOS, NOMBRE_ACADEMIA } from "@shared/academia";
import { useExpediente } from "@/components/academia/api";
import { Cargando, PantallaCerrada } from "@/components/academia/ui";
import { ChipEstatus, NivelesYCertificados, TablaAvance, fecha } from "@/components/academia/seguimiento";
import { descargarExpedientePdf } from "@/components/academia/expediente-pdf";
import { useToast } from "@/hooks/use-toast";

export default function AcademiaExpediente() {
  const q = useExpediente();
  const { toast } = useToast();
  const [bajando, setBajando] = useState(false);
  if (q.isLoading) return <Cargando />;
  if (q.error?.status === 403) return <PantallaCerrada mensaje={q.error.message} />;
  if (!q.data) {
    const sinInscripcion = q.error?.status === 409;
    return (
      <Layout>
        <div className="max-w-xl mx-auto px-4 py-20 text-center">
          <FileText className="w-12 h-12 mx-auto text-orange-500" />
          <p className="text-lg mt-4 mb-6">{sinInscripcion ? "Tu expediente empieza al inscribirte en la academia." : q.error?.message ?? "No se pudo cargar tu expediente."}</p>
          {sinInscripcion && <Link href="/academia/inscripcion?volver=%2Facademia%2Fexpediente"><Button className="fire-btn-primary h-12 px-7">Inscribirme en la academia</Button></Link>}
          {q.error?.status === 401 && <a href={loginUrl("/academia/expediente")}><Button className="fire-btn-primary h-12 px-7">Entrar</Button></a>}
        </div>
      </Layout>
    );
  }
  const d = q.data;
  const a = d.fila;
  const aprobadas = d.materias.filter((m) => m.estado === "aprobada");
  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 pt-6 pb-16 space-y-6" id="expediente-academia">
        <Link href="/academia" className="text-sm text-muted-foreground hover:underline inline-flex items-center gap-1 print:hidden"><ArrowLeft className="w-4 h-4" /> Academia</Link>
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="data-label text-orange-600 dark:text-orange-300">{NOMBRE_ACADEMIA}</p>
            <h1 className="heading-display font-display text-3xl md:text-4xl mt-1">Expediente académico</h1>
            <p className="text-lg font-semibold mt-2" data-testid="expediente-nombre">{a.nombre}</p>
            <div className="flex flex-wrap items-center gap-2 mt-1 text-sm">
              <span className="tracking-wider">Matrícula {a.matricula}</span>
              <span className="text-muted-foreground">· Promoción {a.promocion} · desde el {fecha(a.desde)}</span>
              <ChipEstatus e={a.estatus} />
            </div>
            {d.mentor && <p className="text-sm text-muted-foreground mt-1" data-testid="expediente-mentor">Tu mentor en la academia: <strong className="text-foreground">{d.mentor.nombre}</strong></p>}
          </div>
          <div className="flex flex-wrap gap-2 print:hidden">
            <Link href="/academia/carne"><Button variant="outline" size="sm"><IdCard className="w-4 h-4 mr-1.5" /> Mi carné</Button></Link>
            <Button
              size="sm"
              className="fire-btn-primary"
              disabled={bajando}
              data-testid="expediente-pdf"
              onClick={async () => {
                setBajando(true);
                try {
                  await descargarExpedientePdf(d);
                } catch (e: any) {
                  toast({ title: "No se pudo descargar", description: e?.message ?? "Inténtalo otra vez.", variant: "destructive" });
                } finally {
                  setBajando(false);
                }
              }}
            >
              <Download className="w-4 h-4 mr-1.5" /> {bajando ? "Preparando…" : "Descargar PDF"}
            </Button>
            <Button variant="outline" size="sm" onClick={() => window.print()}><FileText className="w-4 h-4 mr-1.5" /> Imprimir</Button>
          </div>
        </header>

        <section className="glass-card p-5">
          <h2 className="font-semibold flex items-center gap-2 mb-1"><BookOpen className="w-4 h-4 text-orange-600" /> Materias</h2>
          <p className="text-sm text-muted-foreground mb-3">
            {d.materias.length
              ? `${aprobadas.length} ${aprobadas.length === 1 ? "aprobada" : "aprobadas"} de ${d.materias.length} ${d.materias.length === 1 ? "inscrita" : "inscritas"}.`
              : "Todavía no te inscribiste en ninguna materia."}
          </p>
          <TablaAvance materias={d.materias} propio />
        </section>

        <NivelesYCertificados d={d} propio />

        <p className="text-xs text-muted-foreground">Expediente al {fecha(new Date().toISOString())}. {ACLARACION_DOCUMENTOS}</p>
      </div>
    </Layout>
  );
}
