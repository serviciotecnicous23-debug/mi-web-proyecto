// El cierre de un nivel de la academia (server/academia-nivel.ts): los requisitos con su avance, el examen integral, el
// pacto y, al completarlo, el promedio del nivel.
import { useState } from "react";
import { Link, useParams } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Award, CheckCircle2, Circle, ClipboardCheck, GraduationCap, HandHeart, Sparkles } from "lucide-react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { loginUrl } from "@/lib/login-redirect";
import { HONORES, type NivelEstado } from "@shared/academia";
import { aceptarPacto, tiempoTexto, useNivel } from "@/components/academia/api";
import { AvisoVistaPrevia, BarraAvance, Cargando, PantallaCerrada } from "@/components/academia/ui";

const fecha = (iso: string) => new Date(iso).toLocaleDateString("es", { day: "numeric", month: "long", year: "numeric" });

function Integral({ e }: { e: NivelEstado }) {
  const n = e.nivel.n;
  const ex = e.integral;
  return (
    <section className="glass-card p-5 md:p-6" data-testid="nivel-integral">
      <h2 className="font-display text-2xl font-bold flex items-center gap-2"><ClipboardCheck className="w-6 h-6 text-orange-500" /> Examen integral</h2>
      {!ex ? (
        <p className="text-muted-foreground mt-3">Estará disponible cuando todas las materias del nivel estén listas.</p>
      ) : (
        <>
          <p className="text-[15px] mt-3">
            {ex.medida.objetivas} preguntas de las {e.materias.total} materias del nivel, repartidas por materia, y {ex.medida.escritas} respuestas escritas.
            Se aprueba con {ex.aprueba}.
          </p>
          {ex.aprobado ? (
            <p className="mt-4 font-semibold flex items-center gap-2 text-emerald-700 dark:text-emerald-300"><CheckCircle2 className="w-5 h-5" /> Aprobado con {ex.mejor}.</p>
          ) : ex.falta.length ? (
            <p className="mt-4 text-sm text-orange-700 dark:text-orange-300">Para darlo te falta {ex.falta.join(" y ")}.</p>
          ) : ex.espera > 0 ? (
            <p className="mt-4 text-sm text-orange-700 dark:text-orange-300">Podrás intentarlo otra vez en {tiempoTexto(ex.espera)}.</p>
          ) : null}
          {e.conSesion && (
            <Link href={`/academia/integral/${n}`}>
              <Button size="lg" className={`${ex.aprobado ? "" : "fire-btn-primary"} h-12 px-7 mt-4`} variant={ex.aprobado ? "outline" : "default"} data-testid="nivel-ir-integral">
                {ex.aprobado ? "Ver el examen integral" : ex.enCurso ? "Seguir con el examen integral" : "Ir al examen integral"}
              </Button>
            </Link>
          )}
          {ex.intentos > 0 && <p className="text-xs text-muted-foreground mt-3">Intentos: {ex.intentos}{ex.mejor != null ? ` · Mejor nota: ${ex.mejor}` : ""}</p>}
        </>
      )}
    </section>
  );
}

function Pacto({ e, alAceptar }: { e: NivelEstado; alAceptar: (nuevo: NivelEstado) => void }) {
  const p = e.pacto!;
  const [acepto, setAcepto] = useState(false);
  const [ocupado, setOcupado] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const puede = !!e.integral?.aprobado && !p.aceptado && e.conSesion;
  const aceptar = async () => {
    setOcupado(true);
    setError(null);
    try {
      alAceptar(await aceptarPacto(e.nivel.n));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setOcupado(false);
    }
  };
  return (
    <section className="glass-card p-5 md:p-6" data-testid="nivel-pacto">
      <h2 className="font-display text-2xl font-bold flex items-center gap-2"><HandHeart className="w-6 h-6 text-orange-500" /> {p.titulo}</h2>
      <p className="text-[15px] mt-3">{p.intro}</p>
      <ol className="mt-3 space-y-2">
        {p.compromisos.map((c, i) => (
          <li key={c.ref} className="flex gap-3 text-[15px]">
            <span className="w-6 h-6 shrink-0 rounded-full bg-orange-500/15 text-orange-700 dark:text-orange-300 text-xs font-semibold flex items-center justify-center">{i + 1}</span>
            <span>{c.texto} <span className="text-muted-foreground">({c.ref})</span></span>
          </li>
        ))}
      </ol>
      <p className="accent-serif text-lg mt-4">{p.cierre}</p>
      {p.aceptado ? (
        <p className="mt-4 font-semibold flex items-center gap-2 text-emerald-700 dark:text-emerald-300" data-testid="pacto-aceptado"><CheckCircle2 className="w-5 h-5" /> Aceptado el {fecha(p.aceptado)}.</p>
      ) : puede ? (
        <>
          <label className="mt-5 flex items-start gap-3 rounded-xl border border-border p-4 cursor-pointer">
            <Checkbox checked={acepto} onCheckedChange={(v) => setAcepto(v === true)} className="mt-0.5" data-testid="pacto-acepto" />
            <span className="text-[15px]">Con la ayuda de Dios, hago mío este pacto.</span>
          </label>
          <Button size="lg" className="fire-btn-primary h-12 px-7 mt-4" disabled={!acepto || ocupado} onClick={aceptar} data-testid="pacto-aceptar">Aceptar el pacto</Button>
          {error && <p className="text-sm text-orange-700 dark:text-orange-300 mt-3" role="alert">{error}</p>}
        </>
      ) : (
        <p className="text-sm text-muted-foreground mt-4">Lo aceptarás al final del nivel, después de aprobar el examen integral.</p>
      )}
    </section>
  );
}

export default function AcademiaNivel() {
  const { n } = useParams<{ n: string }>();
  const qc = useQueryClient();
  const q = useNivel(n);
  if (q.isLoading) return <Cargando />;
  if (q.error?.status === 403) return <PantallaCerrada mensaje={q.error.message} />;
  if (!q.data) {
    return (
      <Layout>
        <div className="max-w-xl mx-auto px-4 py-20 text-center">
          <p className="text-lg mb-5">{q.error?.message ?? "No se encontró el nivel."}</p>
          <Link href="/academia"><Button variant="outline">Volver a la academia</Button></Link>
        </div>
      </Layout>
    );
  }
  const e = q.data;
  const nv = e.nivel;
  const alAceptar = (nuevo: NivelEstado) => {
    qc.setQueryData(["academia", "nivel", n], nuevo);
    void qc.invalidateQueries({ queryKey: ["academia", "estado"] });
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-16 space-y-6">
        <div>
          <Link href="/academia#camino" className="text-sm text-muted-foreground hover:underline inline-flex items-center gap-1"><ArrowLeft className="w-4 h-4" /> Academia</Link>
          <p className="data-label mt-4">Nivel {nv.n} · {nv.para}</p>
          <h1 className="heading-display font-display text-3xl md:text-5xl mt-1">{nv.nombre}</h1>
          <p className="text-muted-foreground mt-2 flex items-center gap-1.5"><Award className="w-4 h-4 text-orange-500" /> {nv.recibe}</p>
        </div>

        {e.vistaPrevia && <AvisoVistaPrevia />}

        {e.completado && (
          <section className="glass-card p-6 text-center border border-emerald-500/30" data-testid="nivel-completado">
            <GraduationCap className="w-12 h-12 mx-auto text-orange-500" />
            <h2 className="font-display text-2xl md:text-3xl font-bold mt-3">¡Completaste el Nivel {nv.n}!</h2>
            <p className="text-muted-foreground mt-2">El {fecha(e.completado)}, con un promedio de <strong className="text-foreground">{e.promedio}</strong>{e.honores ? ", con honores" : ""}.</p>
            {e.honores && <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-orange-700 dark:text-orange-300"><Sparkles className="w-4 h-4" /> Cuadro de honor: promedio de {HONORES} o más</p>}
            <p className="text-sm mt-4">Pronto podrás descargar tu documento del nivel, con su código de verificación.</p>
          </section>
        )}

        <section className="glass-card p-5 md:p-6" data-testid="nivel-requisitos">
          <h2 className="font-display text-2xl font-bold">Para cerrar el nivel</h2>
          <ul className="mt-4 space-y-3">
            {e.requisitos.map((r) => (
              <li key={r.id} className="flex items-start gap-3" data-testid={`requisito-${r.id}`} data-hecho={r.hecho}>
                {r.hecho ? <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" /> : <Circle className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />}
                <span className="flex-1">
                  <span className="font-medium">{r.texto}</span>
                  {e.conSesion && <span className="block text-sm text-muted-foreground">{r.detalle}</span>}
                </span>
              </li>
            ))}
          </ul>
          {e.conSesion && e.materias.total > 0 && (
            <div className="mt-5 max-w-md">
              <BarraAvance valor={e.materias.aprobadas} de={e.materias.total} etiqueta={`${e.materias.aprobadas} de ${e.materias.total} materias aprobadas${e.materias.promedio != null ? ` · promedio ${e.materias.promedio}` : ""}`} />
            </div>
          )}
          {!e.conSesion && (
            <a href={loginUrl(`/academia/nivel/${nv.n}`)}><Button className="fire-btn-primary mt-5">Entrar para estudiar</Button></a>
          )}
        </section>

        <Integral e={e} />
        {e.pacto && <Pacto e={e} alAceptar={alAceptar} />}
      </div>
    </Layout>
  );
}
