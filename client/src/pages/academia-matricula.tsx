// La matrícula en la academia: aceptar el reglamento académico y el código de honor, y recibir el número de
// matrícula, la promoción y el carné (server/academia-matricula.ts).
import { useState } from "react";
import { Link } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, CheckCircle2, IdCard, ScrollText, ShieldCheck } from "lucide-react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { loginUrl } from "@/lib/login-redirect";
import { CODIGO_HONOR, NOMBRE_ACADEMIA, REGLAMENTO, type MatriculaInfo } from "@shared/academia";
import { matricularme, useMatricula } from "@/components/academia/api";
import { Cargando, PantallaCerrada } from "@/components/academia/ui";

const fecha = (iso: string) => new Date(iso).toLocaleDateString("es", { day: "numeric", month: "long", year: "numeric" });

function Matriculado({ m, recien }: { m: MatriculaInfo; recien: boolean }) {
  return (
    <section className="glass-card p-6 text-center border border-emerald-500/30" data-testid="matricula-lista">
      <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-600" />
      <h2 className="font-display text-2xl md:text-3xl font-bold mt-3">{recien ? "¡Bienvenido a la academia!" : "Ya estás matriculado"}</h2>
      <p className="text-muted-foreground mt-2">Tu número de matrícula es</p>
      <p className="font-display text-3xl font-bold tracking-wider fire-text mt-1" data-testid="matricula-numero">{m.numero}</p>
      <p className="text-sm text-muted-foreground mt-2">Promoción {m.promocion} · desde el {fecha(m.desde)}</p>
      <p className="mt-2 font-semibold">{m.estatus.texto}</p>
      <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
        <Link href="/academia/carne"><Button className="fire-btn-primary h-12 px-7 w-full sm:w-auto" data-testid="matricula-ver-carne"><IdCard className="w-4 h-4 mr-2" /> Ver mi carné</Button></Link>
        <Link href="/academia#camino"><Button variant="outline" className="h-12 px-7 w-full sm:w-auto">Ir a estudiar</Button></Link>
      </div>
    </section>
  );
}

export default function AcademiaMatricula() {
  const qc = useQueryClient();
  const q = useMatricula();
  const [reglamento, setReglamento] = useState(false);
  const [honor, setHonor] = useState(false);
  const [ocupado, setOcupado] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nueva, setNueva] = useState<MatriculaInfo | null>(null);

  if (q.isLoading) return <Cargando />;
  if (q.error?.status === 403) return <PantallaCerrada mensaje={q.error.message} />;
  const sinSesion = q.error?.status === 401;
  const m = nueva ?? q.data?.matricula ?? null;

  const enviar = async () => {
    setOcupado(true);
    setError(null);
    try {
      const r = await matricularme();
      setNueva(r);
      void qc.invalidateQueries({ queryKey: ["academia"] });
    } catch (e: any) {
      setError(e.message);
    } finally {
      setOcupado(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 pt-6 pb-16">
        <Link href="/academia" className="text-sm text-muted-foreground hover:underline inline-flex items-center gap-1"><ArrowLeft className="w-4 h-4" /> Academia</Link>
        <p className="data-label text-orange-600 dark:text-orange-300 mt-5">{NOMBRE_ACADEMIA}</p>
        <h1 className="heading-display font-display text-3xl md:text-5xl mt-1 mb-6">Matrícula</h1>

        {m ? (
          <Matriculado m={m} recien={!!nueva} />
        ) : sinSesion ? (
          <section className="glass-card p-6 text-center">
            <p className="text-lg">Para matricularte, entra con tu cuenta de la web.</p>
            <a href={loginUrl("/academia/matricula")}><Button className="fire-btn-primary mt-5 h-12 px-7">Entrar</Button></a>
          </section>
        ) : (
          <section className="glass-card p-5 md:p-6 space-y-5" data-testid="matricula-formulario">
            <p className="text-[15px]">
              La matrícula es gratuita. Te da un número personal, tu promoción y un carné digital que se puede verificar. Sin matrícula puedes leer las lecciones, pero
              no guardar tu avance.
            </p>
            <div className="rounded-xl border border-border p-4">
              <p className="font-semibold flex items-center gap-2"><ScrollText className="w-4 h-4 text-orange-500" /> {REGLAMENTO.titulo}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Cómo se avanza, cómo se evalúa, el estatus, los documentos y la privacidad.{" "}
                <a href="/academia/reglamento" target="_blank" rel="noreferrer" className="underline">Leer el reglamento completo</a>
              </p>
            </div>
            <div className="rounded-xl border border-border p-4">
              <p className="font-semibold flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-orange-500" /> El código de honor</p>
              <p className="text-[15px] mt-1 accent-serif">{CODIGO_HONOR}</p>
            </div>
            <label className="flex items-start gap-3 cursor-pointer">
              <Checkbox checked={reglamento} onCheckedChange={(v) => setReglamento(v === true)} className="mt-0.5" data-testid="matricula-acepto-reglamento" />
              <span className="text-[15px]">Leí y acepto el reglamento académico.</span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <Checkbox checked={honor} onCheckedChange={(v) => setHonor(v === true)} className="mt-0.5" data-testid="matricula-acepto-honor" />
              <span className="text-[15px]">Hago mío el código de honor.</span>
            </label>
            {error && <p className="text-sm text-orange-700 dark:text-orange-300" role="alert">{error}</p>}
            <Button size="lg" className="fire-btn-primary h-12 px-8" disabled={!reglamento || !honor || ocupado} onClick={enviar} data-testid="matricula-enviar">
              {ocupado ? "Matriculando…" : "Matricularme"}
            </Button>
          </section>
        )}
      </div>
    </Layout>
  );
}
