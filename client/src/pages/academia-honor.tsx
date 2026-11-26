// El cuadro de honor de la academia (server/academia-honor.ts): la clasificación de los estudiantes (general y por
// nivel), la comunidad (activos y egresados, con buscador) y el lugar de quien mira, que puede ocultarse. Lo ven los
// estudiantes inscritos y la Administración. Diseñado primero para el teléfono.
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion, useReducedMotion } from "motion/react";
import { ArrowLeft, Award, ChevronRight, Crown, Eye, EyeOff, Info, Medal, Search, Trophy, Users } from "lucide-react";
import { Layout } from "@/components/layout";
import { useTituloAcademia } from "@/components/academia/titulo";
import { Cargando, PantallaCerrada } from "@/components/academia/ui";
import { pedir, type ErrorAcademia } from "@/components/academia/api";
import { useToast } from "@/hooks/use-toast";
import { loginUrl } from "@/lib/login-redirect";
import type { CuadroHonor, EstudianteCuadro, FilaHonor } from "@shared/academia-honor";

const COLOR_PUESTO = ["from-yellow-300 to-amber-500 text-amber-950", "from-slate-200 to-slate-400 text-slate-900", "from-orange-300 to-amber-700 text-orange-950"];

function Puesto({ n, chico = false }: { n: number; chico?: boolean }) {
  const podio = n <= 3;
  return (
    <span
      className={`${chico ? "w-8 h-8 text-sm" : "w-10 h-10 text-base"} shrink-0 rounded-full flex items-center justify-center font-black ${
        podio ? `bg-gradient-to-br ${COLOR_PUESTO[n - 1]} shadow` : "bg-muted text-muted-foreground"
      }`}
      aria-label={`Puesto ${n}`}
    >
      {n}
    </span>
  );
}

function Podio({ filas }: { filas: FilaHonor[] }) {
  const quieto = useReducedMotion();
  // el primero en el medio, más alto
  const orden = [filas[1], filas[0], filas[2]].filter(Boolean) as FilaHonor[];
  const alto: Record<number, string> = { 1: "h-24", 2: "h-16", 3: "h-12" };
  return (
    <div className="grid grid-cols-3 gap-2 items-end mb-5" data-testid="honor-podio">
      {orden.map((f, k) => (
        <motion.div key={f.userId} initial={quieto ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: quieto ? 0 : 0.1 * k }}>
          <Link href={`/academia/cuadro-de-honor/${f.userId}`} className="block text-center">
            {f.puesto === 1 && <Crown className="w-6 h-6 mx-auto text-amber-500 mb-0.5" fill="currentColor" fillOpacity={0.3} />}
            <span className={`mx-auto w-12 h-12 rounded-full bg-gradient-to-br ${COLOR_PUESTO[f.puesto - 1]} flex items-center justify-center text-lg font-black shadow-md`}>
              {f.nombre.charAt(0)}
            </span>
            <p className="mt-1 text-[13px] font-bold leading-tight line-clamp-2">{f.nombre}</p>
            <p className="text-[11px] text-muted-foreground">{f.puntos} puntos</p>
            <div className={`mt-1 rounded-t-xl bg-gradient-to-b ${COLOR_PUESTO[f.puesto - 1]} ${alto[f.puesto]} flex items-start justify-center pt-1 font-black text-xl opacity-90`}>{f.puesto}</div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

function FilaCuadro({ f }: { f: FilaHonor }) {
  return (
    <li>
      <Link
        href={`/academia/cuadro-de-honor/${f.userId}`}
        className={`flex items-center gap-3 rounded-2xl border p-3 hover:bg-muted/40 transition ${f.propio ? "border-amber-500 bg-amber-500/10" : "border-border bg-card"}`}
        data-testid="honor-fila"
      >
        <Puesto n={f.puesto} />
        <span className="flex-1 min-w-0">
          <span className="block font-bold leading-tight truncate">
            {f.nombre}
            {f.propio && <span className="ml-1.5 align-middle rounded-full bg-amber-500 text-white px-1.5 py-0.5 text-[10px] font-bold">Tú</span>}
          </span>
          <span className="block text-xs text-muted-foreground truncate">
            Nivel {f.nivel} · promedio {f.promedio} · {f.aprobadas} {f.aprobadas === 1 ? "materia" : "materias"}
            {f.pais ? ` · ${f.pais}` : ""}
          </span>
          {f.extra > 0 && <span className="mt-0.5 inline-flex items-center gap-1 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-200 px-1.5 py-0.5 text-[10px] font-bold"><Crown className="w-3 h-3" /> +{f.extra} con retos</span>}
        </span>
        <span className="text-right shrink-0">
          <span className="block text-lg font-black tabular-nums text-amber-600">{f.puntos}</span>
          <span className="block text-[10px] text-muted-foreground -mt-0.5">puntos</span>
        </span>
      </Link>
    </li>
  );
}

function Clasificacion() {
  const [nivel, setNivel] = useState<number | null>(null);
  const qc = useQueryClient();
  const { toast } = useToast();
  const q = useQuery<CuadroHonor, ErrorAcademia>({
    queryKey: ["honor", "cuadro", nivel],
    queryFn: () => pedir("GET", `/api/academia/honor${nivel ? `?nivel=${nivel}` : ""}`),
    retry: false,
  });
  const cambiarVisible = async (visible: boolean) => {
    try {
      await pedir("POST", "/api/academia/honor/visible", { visible });
      await qc.invalidateQueries({ queryKey: ["honor"] });
      toast({ title: visible ? "Ya apareces en el cuadro de honor" : "Ya no apareces en el cuadro de honor", description: visible ? undefined : "Puedes volver a mostrarte cuando quieras." });
    } catch (e: any) {
      toast({ title: "No se pudo cambiar", description: e?.message, variant: "destructive" });
    }
  };
  const c = q.data;
  return (
    <div>
      {c?.yo && (
        <div className="rounded-3xl border-2 border-amber-400/60 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/20 p-4 mb-5" data-testid="honor-yo">
          <p className="text-xs font-bold uppercase tracking-wide text-amber-800 dark:text-amber-200">Tu lugar</p>
          {c.yo.visible ? (
            c.yo.puesto ? (
              <p className="mt-1 text-[17px] font-black leading-snug">
                Puesto {c.yo.puesto} en la academia{c.yo.puestoNivel ? ` · ${c.yo.puestoNivel} en el Nivel ${c.yo.nivel}` : ""}
              </p>
            ) : (
              <p className="mt-1 text-[15px] font-semibold">Aprueba tu primera materia para entrar al cuadro.</p>
            )
          ) : (
            <p className="mt-1 text-[15px] font-semibold">Estás oculto: los demás no te ven en el cuadro.</p>
          )}
          <p className="text-sm text-muted-foreground">{c.yo.puntos} puntos de honor</p>
          <button
            type="button"
            onClick={() => void cambiarVisible(!c.yo!.visible)}
            className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-800 dark:text-amber-200 hover:underline"
            data-testid="honor-visible"
          >
            {c.yo.visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />} {c.yo.visible ? "Ocultarme del cuadro" : "Mostrarme en el cuadro"}
          </button>
        </div>
      )}

      <div className="flex gap-1.5 overflow-x-auto pb-1 mb-4 -mx-1 px-1" role="tablist" aria-label="Clasificación">
        {[null, 1, 2, 3, 4, 5].map((n) => (
          <button
            key={String(n)}
            type="button"
            role="tab"
            aria-selected={nivel === n}
            onClick={() => setNivel(n)}
            className={`shrink-0 h-9 px-3.5 rounded-full text-sm font-semibold border ${nivel === n ? "bg-orange-600 text-white border-orange-600" : "border-border bg-card"}`}
            data-testid={`honor-nivel-${n ?? "general"}`}
          >
            {n == null ? "General" : `Nivel ${n}`}
          </button>
        ))}
      </div>

      {q.isLoading ? (
        <p className="text-center text-muted-foreground py-10">Cargando…</p>
      ) : q.error ? (
        <p className="rounded-2xl border border-border p-5 text-center">{q.error.message}</p>
      ) : !c?.filas.length ? (
        <p className="rounded-2xl border border-dashed border-border p-6 text-center text-muted-foreground">
          {nivel ? `Todavía nadie aprobó materias del Nivel ${nivel}.` : "Todavía nadie aprobó una materia. ¡El primer lugar está libre!"}
        </p>
      ) : (
        <>
          {c.filas.length >= 3 && <Podio filas={c.filas.slice(0, 3)} />}
          <ol className="space-y-2" data-testid="honor-lista">
            {(c.filas.length >= 3 ? c.filas.slice(3) : c.filas).map((f) => (
              <FilaCuadro key={f.userId} f={f} />
            ))}
          </ol>
          {c.total > c.filas.length && <p className="mt-3 text-center text-xs text-muted-foreground">Se muestran los primeros {c.filas.length} de {c.total}.</p>}
        </>
      )}

      <details className="mt-6 rounded-2xl border border-border p-4 text-sm">
        <summary className="font-semibold cursor-pointer flex items-center gap-1.5"><Info className="w-4 h-4 text-amber-600" /> ¿Cómo se ordena?</summary>
        <ul className="mt-2 space-y-1.5 text-muted-foreground list-disc pl-5">
          <li>Los puntos de honor son la suma de tus notas de las materias aprobadas, sin los puntos extra, más la mitad de los puntos extra que ganaste con los retos de dominio.</li>
          <li>Así, lo logrado con el curso y el examen pesa más que lo completado con práctica, pero practicar también suma.</li>
          <li>A igual puntaje va primero quien tiene mejor promedio sin puntos extra; después, quien aprobó más materias; y después, quien llegó antes.</li>
          <li>Cada estudiante decide si aparece en el cuadro. Solo se ve tu nombre corto, tu nivel, tu país y tu iglesia.</li>
        </ul>
      </details>
    </div>
  );
}

function Comunidad() {
  const [estado, setEstado] = useState<"activos" | "egresados">("activos");
  const [texto, setTexto] = useState("");
  const [buscar, setBuscar] = useState("");
  useEffect(() => {
    const t = window.setTimeout(() => setBuscar(texto.trim()), 300);
    return () => window.clearTimeout(t);
  }, [texto]);
  const q = useQuery<{ estudiantes: EstudianteCuadro[] }, ErrorAcademia>({
    queryKey: ["honor", "estudiantes", estado, buscar],
    queryFn: () => pedir("GET", `/api/academia/honor/estudiantes?estado=${estado}${buscar ? `&q=${encodeURIComponent(buscar)}` : ""}`),
    retry: false,
  });
  return (
    <div>
      <div className="grid grid-cols-2 gap-2 mb-3">
        {(["activos", "egresados"] as const).map((e) => (
          <button
            key={e}
            type="button"
            onClick={() => setEstado(e)}
            className={`h-10 rounded-2xl text-sm font-bold border ${estado === e ? "bg-orange-600 text-white border-orange-600" : "border-border bg-card"}`}
            data-testid={`honor-${e}`}
          >
            {e === "activos" ? "Estudiantes activos" : "Egresados"}
          </button>
        ))}
      </div>
      <label className="relative block mb-4">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden />
        <input
          type="search"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Buscar por nombre"
          className="w-full h-11 rounded-2xl border border-border bg-card pl-9 pr-3 text-[16px] focus:outline-none focus:border-amber-500"
          aria-label="Buscar un estudiante por su nombre"
          data-testid="honor-buscar"
        />
      </label>
      {q.isLoading ? (
        <p className="text-center text-muted-foreground py-8">Cargando…</p>
      ) : q.error ? (
        <p className="rounded-2xl border border-border p-5 text-center">{q.error.message}</p>
      ) : !q.data?.estudiantes.length ? (
        <p className="rounded-2xl border border-dashed border-border p-6 text-center text-muted-foreground">
          {buscar ? "No encontramos a nadie con ese nombre." : estado === "egresados" ? "Todavía no hay egresados." : "Todavía no hay estudiantes activos."}
        </p>
      ) : (
        <ul className="space-y-2" data-testid="honor-estudiantes">
          {q.data.estudiantes.map((e) => (
            <li key={e.userId}>
              <Link href={`/academia/cuadro-de-honor/${e.userId}`} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3 hover:bg-muted/40 transition">
                <span className="w-10 h-10 shrink-0 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 text-white flex items-center justify-center font-black">{e.nombre.charAt(0)}</span>
                <span className="flex-1 min-w-0">
                  <span className="block font-bold leading-tight truncate">{e.nombre}</span>
                  <span className="block text-xs text-muted-foreground truncate">{e.estatusTexto}</span>
                  <span className="block text-xs text-muted-foreground truncate">{[e.pais, e.iglesia].filter(Boolean).join(" · ")}</span>
                </span>
                <span className="shrink-0 flex flex-col items-end gap-0.5 text-[11px] font-semibold text-muted-foreground">
                  {e.puesto != null && <span className="inline-flex items-center gap-0.5 text-amber-700 dark:text-amber-300"><Trophy className="w-3 h-3" /> {e.puesto}</span>}
                  <span className="inline-flex items-center gap-0.5"><Award className="w-3 h-3" /> {e.insignias}</span>
                  {e.medallas > 0 && <span className="inline-flex items-center gap-0.5"><Medal className="w-3 h-3" /> {e.medallas}</span>}
                </span>
                <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function AcademiaHonor() {
  useTituloAcademia("Cuadro de honor");
  const [tab, setTab] = useState<"clasificacion" | "comunidad">("clasificacion");
  const prueba = useQuery<CuadroHonor, ErrorAcademia>({ queryKey: ["honor", "cuadro", null], queryFn: () => pedir("GET", "/api/academia/honor"), retry: false });
  if (prueba.isLoading) return <Cargando />;
  if (prueba.error?.status === 403 && /cerrada/i.test(prueba.error.message)) return <PantallaCerrada mensaje={prueba.error.message} />;
  return (
    <Layout>
      <div className="max-w-xl mx-auto px-4 pt-5 pb-16" data-testid="academia-honor">
        <Link href="/academia/salon" className="text-sm text-muted-foreground hover:underline inline-flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Mi salón
        </Link>
        <div className="mt-4 flex items-center gap-3">
          <span className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-600 text-white flex items-center justify-center shadow-lg"><Trophy className="w-8 h-8" /></span>
          <div>
            <h1 className="font-display text-3xl font-bold leading-tight">Cuadro de honor</h1>
            <p className="text-sm text-muted-foreground">Los estudiantes de la academia y sus logros</p>
          </div>
        </div>
        {prueba.error ? (
          <div className="mt-6 rounded-3xl border border-border p-5 text-center" data-testid="honor-sin-acceso">
            <Users className="w-8 h-8 mx-auto text-muted-foreground" />
            <p className="mt-2 font-semibold">{prueba.error.message}</p>
            {prueba.error.status === 401 ? (
              <a href={loginUrl("/academia/cuadro-de-honor")} className="mt-4 inline-flex h-11 px-6 items-center rounded-2xl font-bold text-white bg-gradient-to-r from-amber-500 to-orange-600">Entrar</a>
            ) : (
              <Link href="/academia" className="mt-4 inline-flex h-11 px-6 items-center rounded-2xl font-bold text-white bg-gradient-to-r from-amber-500 to-orange-600">Ir a la academia</Link>
            )}
          </div>
        ) : (
          <>
            <div className="mt-5 grid grid-cols-2 gap-1 rounded-2xl bg-muted p-1 mb-5" role="tablist">
              {(["clasificacion", "comunidad"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  role="tab"
                  aria-selected={tab === t}
                  onClick={() => setTab(t)}
                  className={`h-10 rounded-xl text-sm font-bold flex items-center justify-center gap-1.5 ${tab === t ? "bg-card shadow" : "text-muted-foreground"}`}
                  data-testid={`honor-tab-${t}`}
                >
                  {t === "clasificacion" ? <Trophy className="w-4 h-4" /> : <Users className="w-4 h-4" />} {t === "clasificacion" ? "Clasificación" : "Comunidad"}
                </button>
              ))}
            </div>
            {tab === "clasificacion" ? <Clasificacion /> : <Comunidad />}
          </>
        )}
      </div>
    </Layout>
  );
}
