// Los juegos libres de «Practicar» (/academia/practicar/juego/:juego): con las preguntas de las lecciones que ya
// terminaste. «Carrera de la luz»: 90 segundos; cada acierto enciende la luz y cinco seguidos duplican los puntos.
// «Racha»: preguntas seguidas hasta que se apaguen las tres llamas. Al final, lo que fallaste con su explicación
// (repasar el error es lo que enseña). Compites contra tu propia marca; no cambia la nota.
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useParams } from "wouter";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, Check, Flame, Heart, Play, RotateCcw, Timer, Trophy, X } from "lucide-react";
import { Layout } from "@/components/layout";
import { useTituloAcademia } from "@/components/academia/titulo";
import { PRACTICAS, type JuegoPregunta, type JuegoVista } from "@shared/practicas";
import { cargarJuego, guardarMarca } from "@/components/practicas/api";
import { sonarBien, sonarFinal, sonarMal } from "@/components/practicas/sonido";

type Juego = "carrera" | "racha";
const NOMBRE: Record<Juego, string> = { carrera: "Carrera de la luz", racha: "Racha" };

function Pregunta({ p, alResponder, bloqueado, marca }: { p: JuegoPregunta; alResponder: (ok: boolean, k: number) => void; bloqueado: boolean; marca: { k: number; ok: boolean } | null }) {
  if (p.tipo === "verdad") {
    const elegir = (v: boolean) => !bloqueado && alResponder(v === p.verdad, v ? 1 : 0);
    return (
      <div>
        <p className="text-xl font-bold leading-snug min-h-[96px]">{p.texto}</p>
        <div className="grid grid-cols-2 gap-3 mt-5">
          {[false, true].map((v) => {
            const k = v ? 1 : 0;
            const cls = marca ? (v === p.verdad ? "border-emerald-500 bg-emerald-500/15" : marca.k === k ? "border-rose-500 bg-rose-500/15" : "border-border opacity-60") : v ? "border-emerald-500/70" : "border-rose-400/70";
            return (
              <motion.button key={k} type="button" whileTap={{ scale: 0.94 }} onClick={() => elegir(v)} disabled={bloqueado} className={`h-16 rounded-2xl border-2 font-black text-lg flex items-center justify-center gap-2 ${cls}`} data-testid={v ? "juego-verdad" : "juego-error"}>
                {v ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />} {v ? "Verdad" : "Error"}
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  }
  return (
    <div>
      <p className="text-xl font-bold leading-snug min-h-[72px]">{p.texto}</p>
      <div className="grid gap-2 mt-4">
        {p.opciones.map((o, k) => {
          const cls = marca ? (k === p.correcta ? "border-emerald-500 bg-emerald-500/15" : marca.k === k ? "border-rose-500 bg-rose-500/15" : "border-border opacity-60") : "border-border bg-card";
          return (
            <motion.button key={k} type="button" whileTap={{ scale: 0.97 }} onClick={() => !bloqueado && alResponder(k === p.correcta, k)} disabled={bloqueado} className={`min-h-[52px] text-left rounded-2xl border-2 px-4 py-2 text-[15px] font-semibold ${cls}`} data-testid={`juego-opcion-${k}`}>
              {o}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function Partida({ juego, datos, materia, alTerminar, alSalir }: { juego: Juego; datos: JuegoVista; materia: string | null; alTerminar: (r: { puntos: number; aciertos: number; falladas: JuegoPregunta[]; mejor: number; nueva: boolean }) => void; alSalir: () => void }) {
  const quieto = useReducedMotion();
  const [i, setI] = useState(0);
  const [puntos, setPuntos] = useState(0);
  const [aciertos, setAciertos] = useState(0);
  const [seguidas, setSeguidas] = useState(0);
  const [vidas, setVidas] = useState<number>(PRACTICAS.rachaVidas);
  const [quedan, setQuedan] = useState<number>(PRACTICAS.carreraSegundos);
  const [marca, setMarca] = useState<{ k: number; ok: boolean } | null>(null);
  const falladas = useRef<JuegoPregunta[]>([]);
  const fin = useRef(false);
  const multiplicador = seguidas >= 5 ? 2 : 1;

  useEffect(() => {
    const antes = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = antes;
    };
  }, []);

  const terminar = useCallback(
    async (p: number, a: number) => {
      if (fin.current) return;
      fin.current = true;
      const valor = juego === "carrera" ? p : a;
      let mejor = valor;
      let nueva = false;
      try {
        const r = await guardarMarca(juego, valor, materia);
        mejor = r.mejor;
        nueva = r.nueva;
      } catch {
        // sin conexión: la partida igual termina
      }
      sonarFinal(nueva ? 3 : 1);
      alTerminar({ puntos: p, aciertos: a, falladas: falladas.current, mejor, nueva });
    },
    [juego, materia, alTerminar],
  );

  // el reloj de la carrera
  useEffect(() => {
    if (juego !== "carrera") return;
    const t = window.setInterval(() => setQuedan((s) => Math.max(0, s - 1)), 1000);
    return () => window.clearInterval(t);
  }, [juego]);
  useEffect(() => {
    if (juego === "carrera" && quedan <= 0) void terminar(puntos, aciertos);
  }, [quedan, juego, puntos, aciertos, terminar]);

  const p = datos.preguntas[i % datos.preguntas.length];
  const responder = (ok: boolean, k: number) => {
    if (marca || fin.current) return;
    setMarca({ k, ok });
    let np = puntos;
    let na = aciertos;
    let nv = vidas;
    if (ok) {
      sonarBien();
      np = puntos + 10 * multiplicador;
      na = aciertos + 1;
      setSeguidas((s) => s + 1);
    } else {
      sonarMal();
      setSeguidas(0);
      falladas.current.push(p);
      nv = vidas - 1;
    }
    setPuntos(np);
    setAciertos(na);
    setVidas(nv);
    window.setTimeout(
      () => {
        setMarca(null);
        const sinPreguntas = juego === "racha" && i + 1 >= datos.preguntas.length;
        if ((juego === "racha" && nv <= 0) || sinPreguntas) void terminar(np, na);
        else setI((x) => x + 1);
      },
      ok ? 450 : 1100,
    );
  };

  return createPortal(
    <div className="fixed inset-0 z-50 bg-background flex flex-col" role="dialog" aria-modal="true" aria-label={NOMBRE[juego]} data-testid="partida">
      <div className="shrink-0 px-3 pt-[max(0.5rem,env(safe-area-inset-top))] pb-2 border-b border-border/60">
        <div className="max-w-xl mx-auto flex items-center gap-3">
          <button type="button" onClick={alSalir} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-muted" aria-label="Salir del juego"><X className="w-6 h-6" /></button>
          {juego === "carrera" ? (
            <div className="flex-1 flex items-center gap-2">
              <Timer className="w-5 h-5 text-orange-500" />
              <div className="flex-1 h-3 rounded-full bg-muted overflow-hidden">
                <motion.div className="h-full bg-gradient-to-r from-yellow-400 to-orange-600" animate={{ width: `${(quedan / PRACTICAS.carreraSegundos) * 100}%` }} transition={{ ease: "linear", duration: 1 }} />
              </div>
              <span className="w-8 text-right font-black tabular-nums" aria-label={`${quedan} segundos`}>{quedan}</span>
            </div>
          ) : (
            <div className="flex-1 flex items-center gap-1" aria-label={`${vidas} llamas`}>
              {Array.from({ length: PRACTICAS.rachaVidas }, (_, k) => (
                <motion.span key={k} animate={{ scale: k < vidas ? 1 : 0.7, opacity: k < vidas ? 1 : 0.25 }}>
                  <Flame className="w-7 h-7 text-orange-500" fill={k < vidas ? "currentColor" : "none"} />
                </motion.span>
              ))}
            </div>
          )}
          <motion.span key={puntos} initial={quieto ? false : { scale: 1.4 }} animate={{ scale: 1 }} className="font-black text-xl text-amber-600 tabular-nums" data-testid="juego-puntos">
            {juego === "carrera" ? puntos : aciertos}
          </motion.span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-xl mx-auto px-4 pt-6 pb-10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-muted-foreground truncate">{p.leccion}</span>
            {multiplicador > 1 && <span className="rounded-full bg-gradient-to-r from-amber-500 to-red-500 text-white text-xs font-black px-2.5 py-0.5 flex items-center gap-1"><Flame className="w-3.5 h-3.5" fill="currentColor" /> ×2</span>}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={quieto ? false : { opacity: 0, x: 40 }} animate={marca && !marca.ok && !quieto ? { opacity: 1, x: [0, -10, 10, -6, 6, 0] } : { opacity: 1, x: 0 }} exit={quieto ? undefined : { opacity: 0, x: -40 }} transition={{ duration: 0.25 }}>
              <Pregunta p={p} alResponder={responder} bloqueado={!!marca} marca={marca} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default function AcademiaJuego() {
  const { juego: param } = useParams<{ juego: string }>();
  const juego: Juego = param === "racha" ? "racha" : "carrera";
  const materia = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("materia") : null;
  useTituloAcademia(NOMBRE[juego]);
  const [datos, setDatos] = useState<JuegoVista | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [jugando, setJugando] = useState(false);
  const [final, setFinal] = useState<{ puntos: number; aciertos: number; falladas: JuegoPregunta[]; mejor: number; nueva: boolean } | null>(null);

  const cargar = useCallback(async () => {
    setError(null);
    try {
      setDatos(await cargarJuego(materia));
    } catch (e: any) {
      setError(e?.message || "No se pudo cargar el juego.");
    }
  }, [materia]);
  useEffect(() => {
    void cargar();
  }, [cargar]);

  const empezar = async () => {
    setFinal(null);
    await cargar();
    setJugando(true);
  };
  const marca = datos ? (juego === "carrera" ? datos.marcas.carrera : datos.marcas.racha) : null;
  return (
    <Layout>
      <div className="max-w-xl mx-auto px-4 pt-6 pb-16" data-testid="juego">
        <Link href="/academia/practicar" className="text-sm text-muted-foreground hover:underline inline-flex items-center gap-1"><ArrowLeft className="w-4 h-4" /> Practicar</Link>
        <div className="mt-5 rounded-3xl p-6 text-white bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 text-center shadow-lg shadow-orange-500/25">
          {juego === "carrera" ? <Timer className="w-12 h-12 mx-auto" /> : <Heart className="w-12 h-12 mx-auto" />}
          <h1 className="font-display text-3xl font-black mt-2">{NOMBRE[juego]}</h1>
          <p className="mt-2 text-[15px] opacity-95">
            {juego === "carrera"
              ? `${PRACTICAS.carreraSegundos} segundos para acertar todo lo que puedas. Cada acierto suma 10; con 5 seguidos, los puntos se duplican.`
              : `Responde sin parar: cada error apaga una de tus ${PRACTICAS.rachaVidas} llamas. ¿Cuántas aciertas?`}
          </p>
          {datos && <p className="mt-2 text-sm opacity-90">Con: {datos.alcance}</p>}
          {marca != null && <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-sm font-bold"><Trophy className="w-4 h-4" /> Tu mejor marca: {marca}</p>}
        </div>

        {error && <p className="mt-4 text-center text-rose-600">{error}</p>}
        {datos && datos.preguntas.length < 5 ? (
          <p className="mt-6 text-center text-muted-foreground">Termina tu primera lección para tener preguntas con que jugar.</p>
        ) : (
          <button type="button" onClick={empezar} disabled={!datos} className="mt-6 w-full h-14 rounded-2xl font-black text-lg text-white bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center gap-2 disabled:opacity-60" data-testid="juego-empezar">
            {final ? <RotateCcw className="w-5 h-5" /> : <Play className="w-5 h-5" fill="currentColor" />} {final ? "Jugar otra vez" : "Empezar"}
          </button>
        )}

        {final && (
          <div className="mt-6 rounded-3xl border border-border p-5" data-testid="juego-final">
            <p className="text-center text-4xl font-black text-amber-600">{juego === "carrera" ? final.puntos : final.aciertos}</p>
            <p className="text-center text-sm text-muted-foreground">{juego === "carrera" ? `puntos · ${final.aciertos} aciertos` : `${final.aciertos === 1 ? "acierto" : "aciertos"} antes de que se apagaran tus llamas`}</p>
            {final.nueva && <p className="text-center mt-2 font-bold text-emerald-700 dark:text-emerald-300 flex items-center justify-center gap-1.5"><Trophy className="w-5 h-5" /> ¡Nueva marca personal!</p>}
            {!final.nueva && <p className="text-center mt-2 text-sm">Tu mejor marca: {final.mejor}</p>}
            {final.falladas.length > 0 && (
              <div className="mt-5">
                <p className="font-bold mb-2">Para repasar</p>
                <ul className="space-y-3">
                  {final.falladas.slice(0, 8).map((p, k) => (
                    <li key={k} className="rounded-2xl bg-muted/40 p-3 text-[14px]">
                      <p className="font-semibold">{p.texto}</p>
                      <p className="mt-1 text-emerald-800 dark:text-emerald-200 font-semibold">{p.tipo === "verdad" ? (p.verdad ? "Es verdad." : "Es un error.") : `Respuesta: ${p.opciones[p.correcta]}`}</p>
                      <p className="mt-1 text-muted-foreground">{p.explica}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{p.leccion}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
      {jugando && datos && (
        <Partida
          juego={juego}
          datos={datos}
          materia={materia}
          alTerminar={(r) => {
            setJugando(false);
            setFinal(r);
            void cargar();
          }}
          alSalir={() => setJugando(false)}
        />
      )}
    </Layout>
  );
}
