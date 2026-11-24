// «Practicar» (server/academia-practicas.ts): la práctica del día (lo que el motor trae para no olvidar), los juegos
// libres (Carrera de la luz y Racha), el camino de cada materia y las medallas. Las medallas se ganan aprendiendo,
// nunca por entrar.
import { Link } from "wouter";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Award, Brain, Flame, Heart, Lock, Map as MapaIcono, Timer } from "lucide-react";
import { Layout } from "@/components/layout";
import { useTituloAcademia } from "@/components/academia/titulo";
import { Cargando, PantallaCerrada } from "@/components/academia/ui";
import { useAcademiaEstado } from "@/components/academia/api";
import { loginUrl } from "@/lib/login-redirect";
import { MEDALLAS_PRACTICA, PRACTICAS } from "@shared/practicas";
import { useMedallas, useResumenDelDia } from "@/components/practicas/api";

const cuando = (iso: string) => {
  const dias = Math.ceil((Date.parse(iso) - Date.now()) / 86_400_000);
  return dias <= 0 ? "hoy" : dias === 1 ? "mañana" : `en ${dias} días`;
};

export default function AcademiaPracticar() {
  useTituloAcademia("Practicar");
  const quieto = useReducedMotion();
  const e = useAcademiaEstado();
  const conSesion = !!e.data?.conSesion;
  const dia = useResumenDelDia(conSesion);
  const med = useMedallas(conSesion);
  if (e.isLoading) return <Cargando />;
  if (e.error?.status === 403 || (e.data && !e.data.abierta && !e.data.vistaPrevia)) return <PantallaCerrada />;
  const materias = (e.data?.niveles ?? []).flatMap((n) => n.materias).concat((e.data?.especialidades ?? []).flatMap((x) => x.materias)).filter((m) => m.estado === "en-curso" || m.estado === "aprobada");
  const d = dia.data;
  const ganadas = new Set((med.data?.medallas ?? []).map((m) => m.clave.split(":")[0]));
  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 pt-6 pb-16" data-testid="practicar">
        <Link href="/academia/salon" className="text-sm text-muted-foreground hover:underline">← Mi salón</Link>
        <h1 className="heading-display font-display text-3xl md:text-4xl mt-3 flex items-center gap-2">
          <Flame className="w-8 h-8 text-orange-500" fill="currentColor" fillOpacity={0.25} /> Practicar
        </h1>
        <p className="text-muted-foreground mt-2">Recordar lo aprendido, en días espaciados y jugando, es lo que hace que no se te olvide.</p>
        {e.data?.alumno && (
          <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-orange-500/10 px-3 py-1 text-sm font-semibold">
            <Flame className="w-4 h-4 text-orange-500" fill="currentColor" /> Racha de {e.data.alumno.racha} {e.data.alumno.racha === 1 ? "día" : "días"}
          </p>
        )}

        {!conSesion ? (
          <div className="mt-6 rounded-3xl border border-border p-6 text-center">
            <Lock className="w-8 h-8 mx-auto text-muted-foreground" />
            <p className="mt-2">Entra con tu cuenta para practicar.</p>
            <a href={loginUrl("/academia/practicar")} className="mt-4 inline-flex h-11 px-6 items-center rounded-2xl font-bold text-white bg-gradient-to-r from-amber-500 to-orange-600">Entrar</a>
          </div>
        ) : (
          <>
            <motion.div initial={quieto ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 rounded-3xl p-5 text-white bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 shadow-lg shadow-orange-500/20" data-testid="practica-del-dia">
              <p className="text-xs font-bold uppercase tracking-wide opacity-90 flex items-center gap-1.5"><Brain className="w-4 h-4" /> Práctica del día</p>
              {d && d.pendientes > 0 ? (
                <>
                  <p className="text-2xl font-black mt-1">Hoy te tocan {Math.min(d.pendientes, PRACTICAS.porDia)} {Math.min(d.pendientes, PRACTICAS.porDia) === 1 ? "actividad" : "actividades"}</p>
                  <p className="text-sm opacity-95 mt-1">Lo que ya practicaste vuelve, mezclado, para que quede firme. Unos 5 minutos.</p>
                  <Link href="/academia/practicar/dia" className="mt-4 inline-flex h-12 px-6 items-center gap-2 rounded-2xl bg-white text-orange-700 font-extrabold" data-testid="empezar-dia">
                    Empezar <ArrowRight className="w-4 h-4" />
                  </Link>
                </>
              ) : (
                <>
                  <p className="text-2xl font-black mt-1">{d && d.total > 0 ? "¡Estás al día!" : "Todavía no hay repasos"}</p>
                  <p className="text-sm opacity-95 mt-1">
                    {d && d.total > 0 ? `El próximo repaso llega ${d.proxima ? cuando(d.proxima) : "pronto"}.` : "Cuando hagas la práctica guiada de una lección, sus actividades vuelven aquí a los 1, 3, 7, 15, 30 y 60 días."}
                  </p>
                </>
              )}
              {d && d.total > 0 && <p className="text-xs mt-3 opacity-90">{d.firmes} de {d.total} actividades ya están firmes (las recuerdas después de 30 días).</p>}
            </motion.div>
            <p className="mt-2 text-sm text-muted-foreground">
              También tienes el <Link href="/academia/repaso-del-dia" className="underline">Repaso del día</Link> con las preguntas de tus lecciones.
            </p>

            <h2 className="font-display text-xl font-bold mt-8 mb-3">Juegos</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <Link href="/academia/practicar/juego/carrera" className="rounded-3xl border-2 border-border p-4 hover:border-amber-500 transition" data-testid="juego-carrera">
                <span className="w-11 h-11 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 text-white flex items-center justify-center"><Timer className="w-6 h-6" /></span>
                <p className="font-extrabold text-lg mt-2">Carrera de la luz</p>
                <p className="text-sm text-muted-foreground">{PRACTICAS.carreraSegundos} segundos para acertar todo lo que puedas de lo que ya estudiaste.</p>
              </Link>
              <Link href="/academia/practicar/juego/racha" className="rounded-3xl border-2 border-border p-4 hover:border-amber-500 transition" data-testid="juego-racha">
                <span className="w-11 h-11 rounded-2xl bg-gradient-to-br from-rose-400 to-red-600 text-white flex items-center justify-center"><Heart className="w-6 h-6" /></span>
                <p className="font-extrabold text-lg mt-2">Racha</p>
                <p className="text-sm text-muted-foreground">Preguntas seguidas hasta que se apaguen tus {PRACTICAS.rachaVidas} llamas.</p>
              </Link>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Los juegos son libres: compites contra tu propia marca y no cambian tu nota.</p>

            {materias.length > 0 && (
              <>
                <h2 className="font-display text-xl font-bold mt-8 mb-3">El camino de tus materias</h2>
                <div className="grid gap-2">
                  {materias.map((m) => (
                    <Link key={m.id} href={`/academia/materia/${m.id}#camino-practicas`} className="flex items-center gap-3 rounded-2xl border border-border p-3 hover:border-amber-500">
                      <MapaIcono className="w-5 h-5 text-amber-600 shrink-0" />
                      <span className="flex-1 font-semibold text-[15px]">{m.titulo}</span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    </Link>
                  ))}
                </div>
              </>
            )}

            <h2 className="font-display text-xl font-bold mt-8 mb-3 flex items-center gap-2"><Award className="w-5 h-5 text-amber-600" /> Medallas</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3" data-testid="medallas">
              {Object.entries(MEDALLAS_PRACTICA).map(([clave, m]) => {
                const tiene = ganadas.has(clave);
                const veces = (med.data?.medallas ?? []).filter((x) => x.clave.split(":")[0] === clave).length;
                return (
                  <div key={clave} className={`rounded-2xl border p-3 text-center ${tiene ? "border-amber-400 bg-amber-50 dark:bg-amber-950/30" : "border-border opacity-60"}`}>
                    <Award className={`w-8 h-8 mx-auto ${tiene ? "text-amber-600" : "text-muted-foreground"}`} />
                    <p className="font-bold text-sm mt-1 leading-tight">{m.nombre}</p>
                    <p className="text-[11px] text-muted-foreground leading-snug mt-0.5">{m.detalle}</p>
                    {veces > 1 && <p className="text-xs font-bold mt-1">×{veces}</p>}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
