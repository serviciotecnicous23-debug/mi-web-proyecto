// El repaso espaciado de los versículos de memoria (server/academia-versiculos.ts): cada versículo aprendido vuelve a
// los 1, 3, 7 y 21 días; se repasa armando sus fichas en orden. Bien: pasa al siguiente repaso; mal: vuelve mañana.
// Al pasar el de los 21 días, queda dominado.
import { useState } from "react";
import { Link } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, BookOpen, CheckCircle2, Clock, Sparkles, Trophy } from "lucide-react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { CAJA_DOMINADO, NOMBRE_ACADEMIA, REPASO_VERSICULO_DIAS, type VersiculoRepaso } from "@shared/academia";
import { responderRepasoVersiculo, useRepasoVersiculos, versiculoEstudio, versiculoParaRepasar, type VersiculoParaRepasar } from "@/components/academia/api";
import { Cargando, PantallaCerrada } from "@/components/academia/ui";

const cuando = (iso: string) => {
  const dias = Math.ceil((Date.parse(iso) - Date.now()) / 86_400_000);
  return dias <= 0 ? "hoy" : dias === 1 ? "mañana" : `en ${dias} días`;
};

function Repasar({ v, alTerminar }: { v: VersiculoRepaso; alTerminar: (materiaId: string) => void }) {
  const [datos, setDatos] = useState<VersiculoParaRepasar | null>(null);
  const [elegidas, setElegidas] = useState<string[]>([]);
  const [resultado, setResultado] = useState<{ bien: boolean; dominado: boolean; dias: number | null; texto?: string } | null>(null);
  const [ocupado, setOcupado] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const empezar = async () => {
    setOcupado(true);
    setError(null);
    try {
      setDatos(await versiculoParaRepasar(v.materiaId));
      setElegidas([]);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setOcupado(false);
    }
  };
  const comprobar = async () => {
    setOcupado(true);
    setError(null);
    try {
      const r = await responderRepasoVersiculo(v.materiaId, elegidas);
      let texto: string | undefined;
      if (!r.bien) texto = (await versiculoEstudio(v.materiaId).catch(() => null))?.texto;
      setResultado({ bien: r.bien, dominado: r.dominado, dias: r.dias, texto });
      alTerminar(v.materiaId);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setOcupado(false);
    }
  };
  const fichas = datos?.fichas ?? [];
  const texto = (id: string) => fichas.find((f) => f.id === id)?.t ?? "";
  const libres = fichas.filter((f) => !elegidas.includes(f.id));
  if (resultado) {
    return (
      <div className={`rounded-xl p-4 mt-3 ${resultado.bien ? "bg-emerald-500/10" : "bg-orange-500/10"}`} role="status" data-testid="repaso-resultado">
        {resultado.bien ? (
          <p className="font-semibold flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
            {resultado.dominado ? <Trophy className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
            {resultado.dominado ? "¡Dominado! Ya lo tienes guardado en el corazón." : `¡Bien! Vuelve en ${resultado.dias} ${resultado.dias === 1 ? "día" : "días"}.`}
          </p>
        ) : (
          <>
            <p className="font-semibold">Casi: vuelve a repasarlo mañana.</p>
            {resultado.texto && <blockquote className="accent-serif text-lg leading-7 mt-2">{resultado.texto}</blockquote>}
          </>
        )}
      </div>
    );
  }
  if (!datos) {
    return (
      <Button size="sm" className="fire-btn-primary mt-3" onClick={empezar} disabled={ocupado} data-testid="repaso-empezar">
        {ocupado ? "Cargando…" : "Repasarlo ahora"}
      </Button>
    );
  }
  return (
    <div className="mt-3">
      <p className="text-sm text-muted-foreground mb-2">Arma el versículo tocando las fichas en orden, sin mirarlo. Toca una ficha de arriba para quitarla.</p>
      <div className="min-h-[56px] rounded-xl border border-dashed border-orange-500/40 p-2 flex flex-wrap gap-2 mb-3" data-testid="repaso-armado">
        {elegidas.map((id) => (
          <button key={id} type="button" onClick={() => setElegidas(elegidas.filter((x) => x !== id))} className="rounded-lg px-3 py-2 text-sm bg-orange-500/15 hover:bg-orange-500/25">{texto(id)}</button>
        ))}
        {!elegidas.length && <span className="text-sm text-muted-foreground px-1 py-2">Tu versículo aparecerá aquí.</span>}
      </div>
      <div className="flex flex-wrap gap-2 mb-3" data-testid="repaso-fichas">
        {libres.map((f) => (
          <button key={f.id} type="button" onClick={() => setElegidas([...elegidas, f.id])} className="rounded-lg px-3 py-2 text-sm border border-border hover:border-orange-500" data-ficha={f.id}>{f.t}</button>
        ))}
      </div>
      <Button onClick={comprobar} disabled={ocupado || elegidas.length !== fichas.length} className="fire-btn-primary" data-testid="repaso-comprobar">Comprobar</Button>
      {error && <p className="text-sm text-red-600 dark:text-red-400 mt-2" role="alert">{error}</p>}
    </div>
  );
}

export default function AcademiaRepaso() {
  const qc = useQueryClient();
  const q = useRepasoVersiculos();
  // los que ya repasó en esta visita siguen arriba con su resultado, aunque la lista nueva diga que ya no tocan
  const [hechos, setHechos] = useState<string[]>([]);
  if (q.isLoading) return <Cargando />;
  if (q.error?.status === 403) return <PantallaCerrada mensaje={q.error.message} />;
  const d = q.data;
  const versiculos = d?.versiculos ?? [];
  const tocan = versiculos.filter((v) => v.toca || hechos.includes(v.materiaId));
  const otros = versiculos.filter((v) => !v.toca && !hechos.includes(v.materiaId));
  const faltan = tocan.filter((v) => !hechos.includes(v.materiaId)).length;
  const refrescar = (materiaId: string) => {
    setHechos((h) => (h.includes(materiaId) ? h : [...h, materiaId]));
    void qc.invalidateQueries({ queryKey: ["academia", "repaso-versiculos"] });
  };
  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-16 space-y-6">
        <Link href="/academia" className="text-sm text-muted-foreground hover:underline inline-flex items-center gap-1"><ArrowLeft className="w-4 h-4" /> Academia</Link>
        <header>
          <p className="data-label text-orange-600 dark:text-orange-300">{NOMBRE_ACADEMIA}</p>
          <h1 className="heading-display font-display text-3xl md:text-4xl mt-1 flex items-center gap-3"><Sparkles className="w-8 h-8 text-orange-500" /> Mis versículos</h1>
          <p className="text-muted-foreground mt-2">
            Cada versículo que aprendes vuelve a los {REPASO_VERSICULO_DIAS.join(", ").replace(/, (\d+)$/, " y $1")} días, para que no se olvide. Si lo armas bien,
            pasa al siguiente repaso; si no, vuelve mañana. Al pasar el último, queda dominado.
          </p>
        </header>
        {versiculos.length === 0 ? (
          <p className="glass-card p-6 text-sm text-muted-foreground">Todavía no aprendiste ningún versículo. Cada materia tiene el suyo: lo aprendes después de sus lecciones.</p>
        ) : (
          <>
            <section className="space-y-3" data-testid="repaso-hoy">
              <h2 className="font-semibold text-lg flex items-center gap-2"><BookOpen className="w-5 h-5 text-orange-500" /> Para repasar hoy ({faltan})</h2>
              {tocan.length === 0 && <p className="text-sm text-muted-foreground">Nada para hoy. ¡Vuelve cuando toque!</p>}
              {tocan.map((v) => (
                <article key={v.materiaId} className="glass-card p-5" data-testid="repaso-versiculo" data-materia={v.materiaId}>
                  <p className="font-semibold">{v.ref}</p>
                  <p className="text-xs text-muted-foreground">{v.materia} · repaso {Math.min(v.caja, REPASO_VERSICULO_DIAS.length)} de {REPASO_VERSICULO_DIAS.length}</p>
                  <Repasar v={v} alTerminar={refrescar} />
                </article>
              ))}
            </section>
            {otros.length > 0 && (
              <section className="space-y-2">
                <h2 className="font-semibold text-lg">Los demás</h2>
                <ul className="glass-card divide-y divide-border/60">
                  {otros.map((v) => (
                    <li key={v.materiaId} className="p-4 flex flex-wrap items-center justify-between gap-2 text-sm">
                      <span><strong>{v.ref}</strong> <span className="text-muted-foreground">· {v.materia}</span></span>
                      {v.caja >= CAJA_DOMINADO ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-medium"><Trophy className="w-3 h-3" /> Dominado</span>
                      ) : v.proximo ? (
                        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground"><Clock className="w-3 h-3" /> Vuelve {cuando(v.proximo)}</span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
