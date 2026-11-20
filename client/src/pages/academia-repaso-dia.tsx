// «Repaso del día» (server/academia-repaso-dia.ts): las preguntas del repaso de las lecciones que ya terminaste vuelven
// en días espaciados (1, 3, 7, 21 y 60), de a lo más 10 por día y mezcladas entre materias. Acertada, vuelve más
// adelante; fallada, vuelve mañana; después de la última, queda dominada. No pone nota: es para no olvidar lo aprendido.
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowRight, Brain, CheckCircle2, RotateCcw, Sparkles, Trophy, XCircle } from "lucide-react";
import { Layout } from "@/components/layout";
import { useTituloAcademia } from "@/components/academia/titulo";
import { Button } from "@/components/ui/button";
import { loginUrl } from "@/lib/login-redirect";
import { REPASO_PREGUNTA_DIAS, type PreguntaDelDia, type RespuestaDelDia } from "@shared/repaso-del-dia";
import { responderRepasoDelDia, useRepasoDelDia } from "@/components/academia/api";
import { BarraAvance, Cargando, PantallaCerrada, enlaceInscripcion } from "@/components/academia/ui";

const cuando = (iso: string) => {
  const dias = Math.ceil((Date.parse(iso) - Date.now()) / 86_400_000);
  return dias <= 0 ? "hoy" : dias === 1 ? "mañana" : `en ${dias} días`;
};

export default function AcademiaRepasoDia() {
  const qc = useQueryClient();
  const q = useRepasoDelDia(true);
  useTituloAcademia("Repaso del día");
  // las preguntas de esta tanda quedan fijas mientras se responden (al terminar se pide otra)
  const [lista, setLista] = useState<PreguntaDelDia[] | null>(null);
  const [i, setI] = useState(0);
  const [respuesta, setRespuesta] = useState<{ elegida: number; r: RespuestaDelDia } | null>(null);
  const [aciertos, setAciertos] = useState(0);
  const [ocupado, setOcupado] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (q.data && lista === null) setLista(q.data.preguntas);
  }, [q.data, lista]);

  if (q.isLoading || (q.data && lista === null)) return <Cargando />;
  if (q.error?.status === 403) return <PantallaCerrada mensaje={q.error.message} />;
  if (q.error) {
    return (
      <Layout>
        <div className="max-w-xl mx-auto px-4 py-20 text-center">
          <Brain className="w-12 h-12 mx-auto text-orange-500" />
          <h1 className="font-display text-2xl font-bold mt-4">Repaso del día</h1>
          <p className="text-lg mt-3 mb-6">{q.error.message}</p>
          {/* siempre con salida: entrar (sin cuenta), inscribirse (sin inscripción) o volver a la academia */}
          <div className="flex flex-wrap justify-center gap-3">
            {q.error.status === 401 && <Button asChild className="fire-btn-primary h-12 px-7"><a href={loginUrl("/academia/repaso-del-dia")}>Entrar</a></Button>}
            {q.error.status === 409 && <Button asChild className="fire-btn-primary h-12 px-7"><Link href={enlaceInscripcion("/academia/repaso-del-dia")}>Inscribirme en la academia</Link></Button>}
            <Button asChild variant="outline" className="h-12 px-7"><Link href="/academia">Volver a la academia</Link></Button>
          </div>
        </div>
      </Layout>
    );
  }
  const d = q.data!;
  const preguntas = lista ?? [];
  const p = preguntas[i];
  const terminado = preguntas.length > 0 && i >= preguntas.length;

  const responder = async (k: number) => {
    if (!p || respuesta || ocupado) return;
    setOcupado(true);
    setError(null);
    try {
      const r = await responderRepasoDelDia(p.id, k);
      setRespuesta({ elegida: k, r });
      if (r.bien) setAciertos((n) => n + 1);
    } catch (e: any) {
      setError(e?.message ?? "No se pudo guardar la respuesta.");
    } finally {
      setOcupado(false);
    }
  };
  const siguiente = () => {
    setRespuesta(null);
    setError(null);
    setI((n) => n + 1);
    if (i + 1 >= preguntas.length) void qc.invalidateQueries({ queryKey: ["academia", "repaso-del-dia"] });
  };
  const otraTanda = async () => {
    const r = await q.refetch();
    setLista(r.data?.preguntas ?? []);
    setI(0);
    setAciertos(0);
    setRespuesta(null);
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 pt-6 pb-16" data-testid="repaso-del-dia">
        <Link href="/academia/salon" className="text-sm text-muted-foreground hover:underline">← Mi salón</Link>
        <h1 className="heading-display font-display text-3xl md:text-4xl mt-3 flex items-center gap-2"><Brain className="w-8 h-8 text-orange-500" /> Repaso del día</h1>
        <p className="text-muted-foreground mt-2">
          Las preguntas de las lecciones que ya terminaste vuelven a los {REPASO_PREGUNTA_DIAS.slice(0, -1).join(", ")} y {REPASO_PREGUNTA_DIAS[REPASO_PREGUNTA_DIAS.length - 1]} días,
          mezcladas entre materias: recordar en días espaciados es lo que más ayuda a no olvidar. No pone nota.
        </p>
        <p className="text-sm mt-3 flex flex-wrap gap-x-4 gap-y-1" data-testid="repaso-dia-cifras">
          <span><strong>{d.pendientes}</strong> {d.pendientes === 1 ? "pregunta toca" : "preguntas tocan"} hoy</span>
          <span><Trophy className="w-4 h-4 inline -mt-0.5 text-amber-500" /> <strong>{d.dominadas}</strong> dominadas de {d.total}</span>
        </p>

        {preguntas.length === 0 ? (
          <div className="glass-card p-6 mt-6 text-center" data-testid="repaso-dia-vacio">
            <Sparkles className="w-10 h-10 mx-auto text-orange-500" />
            {d.total === 0 ? (
              <p className="mt-3">Cuando termines tu primera lección, sus preguntas aparecerán aquí al día siguiente.</p>
            ) : (
              <p className="mt-3">¡Estás al día! Hoy no te toca ninguna pregunta.{d.proxima ? ` La próxima vuelve ${cuando(d.proxima)}.` : ""}</p>
            )}
            <Link href="/academia/salon"><Button variant="outline" className="mt-4">Volver a mi salón</Button></Link>
          </div>
        ) : terminado ? (
          <div className="glass-card p-6 mt-6 text-center" data-testid="repaso-dia-fin">
            <Trophy className="w-10 h-10 mx-auto text-amber-500" />
            <p className="font-display text-2xl font-bold mt-3">Repaso terminado</p>
            <p className="mt-1">Acertaste {aciertos} de {preguntas.length}. Las que fallaste vuelven mañana; las demás, más adelante.</p>
            <div className="mt-5 flex flex-col sm:flex-row justify-center gap-3">
              {d.pendientes > preguntas.length && (
                <Button className="fire-btn-primary" onClick={otraTanda} data-testid="repaso-dia-otra"><RotateCcw className="w-4 h-4 mr-2" /> Otra tanda</Button>
              )}
              <Link href="/academia/salon"><Button variant="outline" className="w-full">Volver a mi salón</Button></Link>
            </div>
          </div>
        ) : p ? (
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <span>Pregunta {i + 1} de {preguntas.length}</span>
              <span>Aciertos: {aciertos}</span>
            </div>
            <BarraAvance valor={i} de={preguntas.length} />
            <div className="glass-card p-5 mt-4" data-testid="repaso-dia-pregunta">
              <p className="data-label text-orange-600 dark:text-orange-300">{p.materia.titulo} · Lección {p.leccion.n}</p>
              <p className="font-medium text-lg mt-2 mb-4">{p.texto}</p>
              <div className="grid gap-2">
                {p.opciones.map((op, k) => {
                  const esLaElegida = respuesta?.elegida === k;
                  const esLaBuena = !!respuesta && op === respuesta.r.correcta;
                  return (
                    <button
                      key={k}
                      type="button"
                      disabled={!!respuesta || ocupado}
                      onClick={() => responder(k)}
                      className={`text-left rounded-xl border px-4 py-3 text-[15px] transition min-h-[48px] ${
                        esLaBuena ? "border-emerald-500 bg-emerald-500/10" : esLaElegida ? "border-red-400/60 bg-red-500/5" : "border-border hover:border-orange-500"
                      }`}
                      data-opcion={k}
                    >
                      {op}
                    </button>
                  );
                })}
              </div>
              {respuesta && (
                <div className={`mt-4 rounded-xl p-3 text-sm ${respuesta.r.bien ? "bg-emerald-500/10" : "bg-orange-500/10"}`} role="status" data-testid="repaso-dia-respuesta">
                  <p className="font-semibold flex items-center gap-1.5 mb-1">
                    {respuesta.r.bien ? (
                      respuesta.r.dominada ? <><Trophy className="w-4 h-4 text-amber-500" /> ¡Dominada! Ya no vuelve.</> : <><CheckCircle2 className="w-4 h-4 text-emerald-600" /> ¡Correcto! Vuelve en {respuesta.r.dias} días.</>
                    ) : (
                      <><XCircle className="w-4 h-4 text-orange-600" /> La respuesta es: «{respuesta.r.correcta}». Vuelve mañana.</>
                    )}
                  </p>
                  <p>{respuesta.r.explica} <span className="text-muted-foreground">({respuesta.r.ref})</span></p>
                  <Link href={`/academia/leccion/${p.leccion.id}`} className="text-xs text-orange-700 dark:text-orange-300 hover:underline mt-1 inline-block">Volver a leer la lección: {p.leccion.titulo}</Link>
                </div>
              )}
              {error && <p className="mt-2 text-sm text-red-600" role="alert">{error}</p>}
            </div>
            {respuesta && (
              <div className="mt-4 flex justify-end">
                <Button className="fire-btn-primary h-12 px-7" onClick={siguiente} data-testid="repaso-dia-siguiente">
                  {i + 1 >= preguntas.length ? "Terminar" : "Siguiente"} <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </Layout>
  );
}
