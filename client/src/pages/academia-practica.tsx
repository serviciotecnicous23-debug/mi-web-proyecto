// La práctica de una lección (server/academia-practicas.ts): una sola, la que cuenta, completa (el Relámpago, las
// actividades en muchas formas y la pista, que deja esa actividad en la mitad). Se repite cuando quiera y vale la
// mejor. Se abre al terminar la lección; con `?tras=1` saluda a quien acaba de completarla.
import { useState } from "react";
import { Link, useLocation, useParams } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import { motion, useReducedMotion } from "motion/react";
import { ArrowLeft, BookOpen, Clock, Crown, Flame, Lock, PartyPopper, Play, RotateCcw, ShieldCheck, Shuffle } from "lucide-react";
import { Layout } from "@/components/layout";
import { useTituloAcademia } from "@/components/academia/titulo";
import { Cargando, PantallaCerrada } from "@/components/academia/ui";
import { loginUrl } from "@/lib/login-redirect";
import { useToast } from "@/hooks/use-toast";
import { PRACTICAS, type IntentoVista } from "@shared/practicas";
import { empezarLeccion, empezarReto, usePracticaLeccion } from "@/components/practicas/api";
import { Reproductor } from "@/components/practicas/reproductor";
import { EstadoChip, Estrellas } from "@/components/practicas/resultado";

export default function AcademiaPractica() {
  const { leccionId } = useParams<{ leccionId: string }>();
  const [ubicacion] = useLocation();
  const tras = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("tras") === "1";
  const qc = useQueryClient();
  const { toast } = useToast();
  const quieto = useReducedMotion();
  const q = usePracticaLeccion(leccionId);
  const [intento, setIntento] = useState<IntentoVista | null>(null);
  const [abriendo, setAbriendo] = useState<"practica" | "reto" | null>(null);
  const [ultimo, setUltimo] = useState<"practica" | "reto">("practica");
  useTituloAcademia(q.data ? `Práctica: ${q.data.leccion.titulo}` : "Práctica de la lección");
  void ubicacion;

  if (q.isLoading) return <Cargando />;
  if (q.error?.status === 403) return <PantallaCerrada mensaje={q.error.message} />;
  if (q.error || !q.data) {
    return (
      <Layout>
        <div className="max-w-xl mx-auto px-4 py-20 text-center">
          <p className="text-lg">{q.error?.message ?? "No se encontró la práctica."}</p>
          <Link href="/academia" className="mt-4 inline-block underline">Volver a la academia</Link>
        </div>
      </Layout>
    );
  }
  const p = q.data;

  const empezar = async (que: "practica" | "reto" = "practica") => {
    setAbriendo(que);
    setUltimo(que);
    try {
      setIntento(await (que === "reto" ? empezarReto(p.leccion.id) : empezarLeccion(p.leccion.id)));
    } catch (e: any) {
      toast({ title: "Todavía no", description: e?.message, variant: "destructive" });
    } finally {
      setAbriendo(null);
    }
  };
  const cerrar = () => {
    setIntento(null);
    void qc.invalidateQueries({ queryKey: ["practicas"] });
    void qc.invalidateQueries({ queryKey: ["academia"] });
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto px-4 pt-5 pb-16" data-testid="practica-leccion">
        <Link href={`/academia/leccion/${p.leccion.id}`} className="text-sm text-muted-foreground hover:underline inline-flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Lección {p.leccion.n}: {p.leccion.titulo}
        </Link>

        {tras && p.existe && !p.falta && (
          <motion.div initial={quieto ? false : { opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 rounded-3xl bg-gradient-to-r from-amber-500 to-orange-600 text-white p-4 flex items-center gap-3" data-testid="practica-tras-leccion">
            <PartyPopper className="w-8 h-8 shrink-0" />
            <div>
              <p className="font-extrabold text-lg leading-tight">¡Lección completada!</p>
              <p className="text-sm opacity-95">Ahora practica lo que aprendiste: es lo que hace que no se te olvide.</p>
            </div>
          </motion.div>
        )}

        <div className="mt-5 rounded-3xl border border-border bg-card p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-amber-700 dark:text-amber-300">{p.materia.titulo}</p>
          <h1 className="font-display text-2xl font-bold mt-1 leading-tight">Práctica de la lección {p.leccion.n}</h1>
          <p className="text-muted-foreground">{p.leccion.titulo}</p>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <Estrellas n={p.estrellas} />
            <span className="inline-flex items-center gap-1 text-muted-foreground"><Clock className="w-4 h-4" /> {p.minutos} min</span>
            {p.mejor != null && <span className="font-semibold">Tu mejor: {p.mejor}</span>}
          </div>
          {p.formas.length > 0 && (
            <div className="mt-3" data-testid="practica-formas">
              <p className="text-sm font-semibold flex items-center gap-1.5"><Shuffle className="w-4 h-4 text-amber-600" /> Cada vez se juega distinto. Te puede tocar:</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {p.formas.map((x) => (
                  <span key={x} className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold">{x}</span>
                ))}
              </div>
            </div>
          )}
          <p className="mt-3 text-sm flex items-start gap-1.5" data-testid="practica-regla">
            <ShieldCheck className="w-4 h-4 mt-0.5 shrink-0 text-emerald-600" />
            {p.obligatoria
              ? "Es obligatoria: el examen final pide la práctica de cada lección. Entra en tu nota y la puedes repetir cuando quieras: vale tu mejor intento."
              : p.aprobada
                ? "Ya aprobaste esta materia: practica cuando quieras. Tu nota no baja, y con el reto de dominio puedes subirla."
                : p.cuentaEnNota
                  ? "La práctica entra en tu nota de la materia. La puedes repetir cuando quieras: vale tu mejor intento."
                  : "Es para aprender y no olvidar: no cambia tu nota."}
          </p>
        </div>

        {p.prueba && <p className="mt-3 rounded-xl bg-sky-500/10 border border-sky-500/30 px-3 py-2 text-sm">Vista de la Administración: puedes probar las dos prácticas sin inscribirte; nada cuenta.</p>}

        {p.falta ? (
          <div className="mt-5 rounded-3xl border border-border p-5 text-center" data-testid="practica-falta">
            <Lock className="w-8 h-8 mx-auto text-muted-foreground" />
            <p className="mt-2 font-semibold">{p.falta}</p>
            {!p.conSesion ? (
              <a href={loginUrl(`/academia/practica/${p.leccion.id}`)} className="mt-4 inline-flex h-11 px-6 items-center rounded-2xl font-bold text-white bg-gradient-to-r from-amber-500 to-orange-600">Entrar</a>
            ) : (
              <Link href={`/academia/leccion/${p.leccion.id}`} className="mt-4 inline-flex h-11 px-6 items-center rounded-2xl font-bold border-2 border-border">Ir a la lección</Link>
            )}
          </div>
        ) : (
          <div className="mt-5">
            <button
              type="button"
              onClick={() => void empezar("practica")}
              disabled={!!abriendo}
              className="w-full text-left rounded-3xl border-2 border-orange-500 bg-orange-500/10 p-4 flex items-center gap-4 transition disabled:opacity-60"
              data-testid="empezar-practica"
            >
              <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 text-white flex items-center justify-center shrink-0">
                {p.guiada ? <RotateCcw className="w-6 h-6" /> : <Play className="w-6 h-6" fill="currentColor" />}
              </span>
              <span className="flex-1">
                <span className="block font-extrabold text-[17px]">
                  {p.guiada ? "Practicar otra vez" : "Empezar la práctica"}
                  {p.obligatoria && <span className="ml-2 align-middle rounded-full bg-orange-600 text-white px-2 py-0.5 text-[11px] font-bold" data-testid="cuenta-obligatoria">Obligatoria</span>}
                </span>
                <span className="block text-sm text-muted-foreground">
                  {p.actividades} actividades. Si te trabas, pide una pista (esa actividad vale la mitad). {p.guiada ? `Domina con ${PRACTICAS.domina} o más: vale tu mejor intento.` : `Con ${PRACTICAS.domina} o más dominas la lección.`}
                </span>
              </span>
              {abriendo === "practica" && <span className="text-sm">…</span>}
            </button>
            {p.reto && (
              <div className={`mt-3 rounded-3xl border-2 p-4 ${p.reto.abierto ? "border-amber-500/70 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/40 dark:to-yellow-950/20" : "border-dashed border-border"}`} data-testid="reto-dominio">
                <div className="flex items-start gap-3">
                  <span className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${p.reto.abierto ? "bg-gradient-to-br from-yellow-400 to-amber-600 text-white" : "bg-muted text-muted-foreground"}`}>
                    {p.reto.abierto ? <Crown className="w-6 h-6" /> : <Lock className="w-5 h-5" />}
                  </span>
                  <div className="flex-1">
                    <p className="font-extrabold text-[17px] leading-tight">
                      Reto de dominio: puntos extra
                      {p.reto.dominado && <span className="ml-2 align-middle rounded-full bg-emerald-600 text-white px-2 py-0.5 text-[11px] font-bold">Dominado</span>}
                    </p>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {p.reto.abierto
                        ? p.reto.dominado
                          ? `Ya lo dominaste${p.reto.mejor != null ? ` (tu mejor: ${p.reto.mejor})` : ""}: esta lección ya suma sus puntos extra a tu nota.`
                          : `Sin pistas y cada actividad en su forma más difícil. Con ${PRACTICAS.retoDomina} o más ${p.reto.puntos > 0 ? `sumas +${p.reto.puntos} a tu nota de la materia` : "lo dominas"}.${p.reto.mejor != null ? ` Tu mejor: ${p.reto.mejor}.` : ""}`
                        : p.reto.falta}
                    </p>
                    {p.reto.abierto && (
                      <button
                        type="button"
                        onClick={() => void empezar("reto")}
                        disabled={!!abriendo}
                        className="mt-3 h-11 px-5 rounded-2xl font-bold text-white bg-gradient-to-r from-yellow-500 to-amber-600 inline-flex items-center gap-2 disabled:opacity-60"
                        data-testid="empezar-reto"
                      >
                        <Crown className="w-4 h-4" /> {p.reto.mejor != null ? "Intentar el reto otra vez" : "Hacer el reto"}
                        {abriendo === "reto" && <span className="text-sm">…</span>}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {p.objetivos.length > 0 && (
          <div className="mt-6 rounded-3xl border border-border p-5">
            <p className="font-bold flex items-center gap-2"><Flame className="w-5 h-5 text-orange-500" /> Lo que practicas</p>
            <ul className="mt-3 space-y-2.5">
              {p.objetivos.map((o) => (
                <li key={o.n} className="flex items-start justify-between gap-3 text-[14px] leading-snug">
                  <span>{o.texto}</span>
                  <EstadoChip estado={o.estado} />
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-muted-foreground">Nuevo, Aprendiendo, Dominado (80 o más en la práctica) y Firme (lo recuerdas a los 30 días).</p>
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3 justify-center text-sm">
          <Link href={`/academia/leccion/${p.leccion.id}`} className="inline-flex items-center gap-1.5 text-amber-700 dark:text-amber-300 hover:underline"><BookOpen className="w-4 h-4" /> Volver a leer la lección</Link>
          <Link href="/academia/practicar" className="inline-flex items-center gap-1.5 text-amber-700 dark:text-amber-300 hover:underline"><Flame className="w-4 h-4" /> Practicar: el día, los juegos y las medallas</Link>
        </div>
      </div>
      {intento && (
        <Reproductor
          intento={intento}
          alSalir={cerrar}
          alOtraVez={() => {
            setIntento(null);
            void qc.invalidateQueries({ queryKey: ["practicas"] });
            void empezar(ultimo);
          }}
        />
      )}
    </Layout>
  );
}
