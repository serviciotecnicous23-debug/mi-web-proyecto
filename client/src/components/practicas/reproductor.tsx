// El reproductor de prácticas: una pieza por pantalla, a pantalla completa en el teléfono, con la llama de avance,
// los puntos, la racha de aciertos seguidos y la devolución de cada respuesta (por qué, la frase de la lección y su
// cita). Al terminar muestra el resultado con sus estrellas.
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { BookOpen, Flag, Flame, Lightbulb, Loader2, Play, Volume2, VolumeX, X } from "lucide-react";
import { NOMBRE_PIEZA, type Devolucion, type IntentoVista, type ItemVista, type RespuestaPractica, type ResultadoPractica } from "@shared/practicas";
import { useConfirmar } from "@/components/confirmar";
import { pedirPista, responder, terminarIntento } from "./api";
import { cambiarSonido, sonarBien, sonarMal, sonarMedio, sonidoActivo } from "./sonido";
import { Clasifica, Completa, EncuentraError, Explica, Relaciona, Situacion, Tarjetas, Verdad, Ordena as OrdenaLista, type PropsPieza } from "./piezas";
import { Caso, Escenario, Linea, Mapa, MapaIdeas, Pasaje } from "./piezas-avanzadas";
import { Resultado } from "./resultado";

/** Las piezas que se responden solas con un toque (no muestran «Comprobar»). */
const SOLAS = new Set<ItemVista["pieza"]>(["tarjetas", "verdad"]);

// (cada pieza recibe su vista ya del tipo que le toca: el `switch` elige por `pieza`)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Pieza(props: Omit<PropsPieza<any>, "vista" | "correccion"> & { vista: ItemVista; correccion: any }) {
  const v = props.vista;
  const p = props as any;
  switch (v.pieza) {
    case "tarjetas":
      return <Tarjetas {...p} />;
    case "completa":
      return <Completa {...p} />;
    case "relaciona":
      return <Relaciona {...p} />;
    case "clasifica":
      return <Clasifica {...p} />;
    case "ordena":
      return (
        <div data-testid="pieza-ordena">
          <p className="font-bold text-lg mb-3">{v.consigna}</p>
          <OrdenaLista items={v.pasos} correcto={props.correccion?.correcto ?? null} bloqueado={props.bloqueado} alCambiar={(orden) => props.alCambiar({ pieza: "ordena", orden })} />
        </div>
      );
    case "verdad":
      return <Verdad {...p} />;
    case "error":
      return <EncuentraError {...p} />;
    case "situacion":
      return <Situacion {...p} />;
    case "explica":
      return <Explica {...p} />;
    case "linea":
      return <Linea {...p} />;
    case "mapa-ideas":
      return <MapaIdeas {...p} />;
    case "mapa":
      return <Mapa {...p} />;
    case "pasaje":
      return <Pasaje {...p} />;
    case "escenario":
      return <Escenario {...p} />;
    case "caso":
      return <Caso {...p} />;
  }
}

/** La consigna que va arriba de la pieza (las que ya la muestran adentro no la repiten). */
const consignaArriba = (v: ItemVista) => (["ordena", "linea", "situacion", "explica", "escenario", "caso", "tarjetas"].includes(v.pieza) ? (v.pieza === "linea" ? v.consigna : null) : v.consigna);

function Devolucion_({ d, alSeguir, ultimo }: { d: Devolucion; alSeguir: () => void; ultimo: boolean }) {
  const quieto = useReducedMotion();
  const tono = d.bien ? "bien" : d.puntaje >= 0.5 ? "medio" : "mal";
  const titulo = tono === "bien" ? ["¡Muy bien!", "¡Excelente!", "¡Así es!"][Math.floor(d.puntaje * 10) % 3] : tono === "medio" ? "Casi: mira lo que faltó" : "Repasemos esto";
  const cls =
    tono === "bien"
      ? "bg-emerald-50 dark:bg-emerald-950/70 border-emerald-500/60 text-emerald-950 dark:text-emerald-50"
      : tono === "medio"
        ? "bg-amber-50 dark:bg-amber-950/70 border-amber-500/60 text-amber-950 dark:text-amber-50"
        : "bg-rose-50 dark:bg-rose-950/70 border-rose-500/60 text-rose-950 dark:text-rose-50";
  const error = d.correccion.pieza === "completa" ? d.correccion.error : null;
  const sinTexto = d.correccion.pieza === "tarjetas";
  return (
    <motion.div
      initial={quieto ? false : { y: "100%" }}
      animate={{ y: 0 }}
      exit={quieto ? undefined : { y: "100%" }}
      transition={{ type: "spring", stiffness: 320, damping: 32 }}
      className={`border-t-2 ${cls} px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]`}
      role="status"
      data-testid="devolucion"
    >
      <div className="max-w-xl mx-auto">
        {!sinTexto && <p className="text-lg font-extrabold">{titulo}</p>}
        {sinTexto && <p className="text-lg font-extrabold">Repasaste las tarjetas</p>}
        {error && <p className="mt-1 text-[15px] leading-snug">{error}</p>}
        {d.explica && <p className="mt-1 text-[15px] leading-snug">{d.explica}</p>}
        {d.apoyo && (
          <div className="mt-2 rounded-xl bg-white/60 dark:bg-black/25 px-3 py-2">
            <p className="text-[11px] font-bold uppercase tracking-wide opacity-70 flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> Lo dice la lección</p>
            <p className="text-[14px] italic leading-snug">{d.apoyo}</p>
            {d.ref && <p className="text-[12px] font-semibold mt-1 opacity-80">{d.ref}</p>}
          </div>
        )}
        <button
          type="button"
          onClick={alSeguir}
          autoFocus
          className={`mt-3 w-full h-12 rounded-2xl font-bold text-white text-[16px] ${tono === "bien" ? "bg-emerald-600 hover:bg-emerald-700" : tono === "medio" ? "bg-amber-600 hover:bg-amber-700" : "bg-rose-600 hover:bg-rose-700"}`}
          data-testid="continuar"
        >
          {d.siguiente ? "Siguiente" : ultimo ? "Ver mi resultado" : "Continuar"}
        </button>
      </div>
    </motion.div>
  );
}

export function Reproductor({ intento, alSalir, alOtraVez }: { intento: IntentoVista; alSalir: () => void; alOtraVez?: (modo: "guiada" | "cuenta") => void }) {
  const quieto = useReducedMotion();
  const { pedir: confirmar, ventana } = useConfirmar();
  const [vistas, setVistas] = useState<ItemVista[]>(() => intento.items.map((i) => i.vista));
  const [hechas, setHechas] = useState<boolean[]>(() => intento.items.map((i) => i.hecha));
  const [n, setN] = useState(() => {
    const k = intento.items.findIndex((i) => !i.hecha);
    return k < 0 ? intento.items.length : k;
  });
  const [paso, setPaso] = useState(0);
  const [respuesta, setRespuesta] = useState<RespuestaPractica | null>(null);
  const [devolucion, setDevolucion] = useState<Devolucion | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [pista, setPista] = useState<string | null>(null);
  const [puntos, setPuntos] = useState(intento.puntos ?? 0);
  const [seguidas, setSeguidas] = useState(0);
  const [festejo, setFestejo] = useState<string | null>(null);
  const [resultado, setResultado] = useState<ResultadoPractica | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sonido, setSonido] = useState(sonidoActivo());
  const total = intento.items.length;
  // la misión y la práctica del día empiezan con su portada (la historia de la misión), si no se empezó todavía
  const [portada, setPortada] = useState(() => (intento.modo === "mision" || intento.modo === "dia") && intento.items.every((i) => !i.hecha));
  const zona = useRef<HTMLDivElement>(null);

  // con la devolución abierta, lo primero que quedó mal se acerca a la vista (para que el alumno vea su corrección)
  useEffect(() => {
    if (!devolucion || devolucion.bien) return;
    const t = window.setTimeout(() => {
      const malo = zona.current?.querySelector<HTMLElement>(".border-rose-500");
      malo?.scrollIntoView({ block: "nearest", behavior: quieto ? "auto" : "smooth" });
    }, 350);
    return () => window.clearTimeout(t);
  }, [devolucion, quieto]);

  useEffect(() => {
    const antes = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = antes;
    };
  }, []);

  const terminar = useCallback(async () => {
    setEnviando(true);
    setError(null);
    try {
      setResultado(await terminarIntento(intento.id));
    } catch (e: any) {
      setError(e?.message || "No se pudo guardar. Revisa tu conexión e inténtalo otra vez.");
    } finally {
      setEnviando(false);
    }
  }, [intento.id]);

  // al volver a un intento ya respondido entero, se va directo al resultado
  useEffect(() => {
    if (n >= total && !resultado && !enviando) void terminar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const enviar = async (r: RespuestaPractica) => {
    if (enviando || devolucion) return;
    setEnviando(true);
    setError(null);
    try {
      const d = await responder(intento.id, n, r);
      setDevolucion(d);
      if (d.correccion.pieza !== "tarjetas") {
        if (d.bien) sonarBien();
        else if (d.puntaje >= 0.5) sonarMedio();
        else sonarMal();
        setPuntos((p) => p + Math.round(d.puntaje * 10));
        const s = d.bien ? seguidas + 1 : 0;
        setSeguidas(s);
        if (d.bien && (s === 3 || s === 5 || s === 10)) {
          setFestejo(`¡${s} seguidas!`);
          window.setTimeout(() => setFestejo(null), 1600);
        }
      }
    } catch (e: any) {
      setError(e?.message || "No se pudo enviar. Revisa tu conexión e inténtalo otra vez.");
    } finally {
      setEnviando(false);
    }
  };

  const seguir = () => {
    if (!devolucion) return;
    const d = devolucion;
    setDevolucion(null);
    setRespuesta(null);
    setPista(null);
    if (d.siguiente) {
      const vs = [...vistas];
      vs[n] = d.siguiente;
      setVistas(vs);
      setPaso((p) => p + 1);
      return;
    }
    const hs = [...hechas];
    hs[n] = true;
    setHechas(hs);
    setPaso(0);
    if (n + 1 >= total) {
      setN(total);
      void terminar();
    } else setN(n + 1);
  };

  const salir = () => {
    if (resultado || (n === 0 && !devolucion && paso === 0)) return alSalir();
    confirmar({
      titulo: "¿Salir de la práctica?",
      detalle: "Lo que ya respondiste queda guardado: puedes seguir hoy desde donde quedaste.",
      boton: "Salir",
      accion: alSalir,
    });
  };

  const vista = n < total ? vistas[n] : null;
  const progreso = useMemo(() => {
    const hechasN = hechas.filter(Boolean).length;
    const parcial = vista && "pasos" in vista && typeof (vista as any).pasos === "number" && (vista as any).pasos > 0 ? paso / (vista as any).pasos : 0;
    return Math.min(1, (hechasN + (devolucion && !devolucion.siguiente ? 1 : parcial)) / Math.max(1, total));
  }, [hechas, vista, paso, devolucion, total]);

  useEffect(() => {
    const tecla = (e: KeyboardEvent) => {
      if (e.key !== "Enter" || e.shiftKey || (e.target as HTMLElement)?.tagName === "TEXTAREA") return;
      if (devolucion) {
        e.preventDefault();
        seguir();
      } else if (respuesta && vista && !SOLAS.has(vista.pieza)) {
        e.preventDefault();
        void enviar(respuesta);
      }
    };
    window.addEventListener("keydown", tecla);
    return () => window.removeEventListener("keydown", tecla);
  });

  const item = n < total ? intento.items[n] : null;
  const contenido = (
    <div className="fixed inset-0 z-50 bg-background text-foreground flex flex-col" role="dialog" aria-modal="true" aria-label={intento.titulo} data-testid="reproductor">
      {/* arriba: salir, la llama de avance y los puntos */}
      <div className="shrink-0 px-3 pt-[max(0.5rem,env(safe-area-inset-top))] pb-2 border-b border-border/60">
        <div className="max-w-xl mx-auto flex items-center gap-2">
          <button type="button" onClick={salir} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-muted" aria-label="Salir de la práctica" data-testid="salir-practica">
            <X className="w-6 h-6" />
          </button>
          <div className="flex-1 relative h-4 rounded-full bg-foreground/10 overflow-visible" role="progressbar" aria-valuenow={Math.round(progreso * 100)} aria-valuemin={0} aria-valuemax={100} aria-label="Avance">
            <motion.div className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-red-500" initial={false} animate={{ width: `${Math.max(4, progreso * 100)}%` }} transition={{ type: "spring", stiffness: 120, damping: 20 }} />
            <motion.span className="absolute -top-[7px] text-orange-500 drop-shadow" initial={false} animate={{ left: `calc(${Math.max(4, progreso * 100)}% - 14px)` }} transition={{ type: "spring", stiffness: 120, damping: 20 }} aria-hidden>
              <Flame className="w-7 h-7" fill="currentColor" fillOpacity={0.35} />
            </motion.span>
          </div>
          <motion.span key={puntos} initial={quieto ? false : { scale: 1.35 }} animate={{ scale: 1 }} className="min-w-[52px] text-right font-black text-amber-600 tabular-nums" aria-label={`${puntos} puntos`} data-testid="puntos">
            {puntos}
          </motion.span>
          <button
            type="button"
            onClick={() => {
              cambiarSonido(!sonido);
              setSonido(!sonido);
            }}
            className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted"
            aria-label={sonido ? "Silenciar los sonidos" : "Activar los sonidos"}
          >
            {sonido ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* en medio: la pieza */}
      <div ref={zona} className="flex-1 overflow-y-auto overscroll-contain">
        <div className="max-w-xl mx-auto px-4 pt-4 pb-6">
          {intento.prueba && <p className="mb-3 rounded-xl bg-sky-500/10 border border-sky-500/30 px-3 py-2 text-xs text-sky-900 dark:text-sky-100">Vista de la Administración: pruebas la práctica y nada cuenta.</p>}
          {portada && !resultado ? (
            <motion.div initial={quieto ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center pt-6" data-testid="portada-practica">
              <span className="inline-flex w-24 h-24 rounded-3xl bg-gradient-to-br from-orange-500 to-red-600 text-white items-center justify-center shadow-xl rotate-3">
                {intento.modo === "mision" ? <Flag className="w-12 h-12" /> : <Flame className="w-12 h-12" fill="currentColor" fillOpacity={0.3} />}
              </span>
              <p className="mt-5 text-xs font-bold uppercase tracking-wide text-amber-700 dark:text-amber-300">{intento.modo === "mision" ? `Misión · ${intento.materia.titulo}` : "Práctica del día"}</p>
              <h2 className="mt-1 text-3xl font-black leading-tight">{intento.titulo}</h2>
              <p className="mt-3 text-[16px] leading-relaxed text-muted-foreground max-w-md mx-auto">{intento.subtitulo}</p>
              <p className="mt-4 text-sm font-semibold">{total} {total === 1 ? "actividad" : "actividades"}{intento.modo === "mision" ? " de todas las lecciones" : ""}</p>
              <button type="button" onClick={() => setPortada(false)} className="mt-6 h-14 px-8 rounded-2xl font-black text-lg text-white bg-gradient-to-r from-amber-500 to-orange-600 inline-flex items-center gap-2 shadow-lg shadow-orange-500/25" data-testid="empezar-portada">
                <Play className="w-5 h-5" fill="currentColor" /> {intento.modo === "mision" ? "Empezar la misión" : "Empezar"}
              </button>
            </motion.div>
          ) : resultado ? (
            <Resultado
              r={resultado}
              intento={intento}
              alSalir={alSalir}
              alOtraVez={alOtraVez}
            />
          ) : vista && item ? (
            <AnimatePresence mode="wait">
              <motion.div key={`${n}-${paso}`} initial={quieto ? false : { opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={quieto ? undefined : { opacity: 0, x: -30 }} transition={{ duration: 0.22 }}>
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <span className="rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-200 px-2.5 py-0.5 text-xs font-bold">{NOMBRE_PIEZA[vista.pieza]}</span>
                  <span className="text-xs text-muted-foreground">{n + 1} de {total}</span>
                  {item.leccion && <span className="text-xs text-muted-foreground truncate max-w-[60%]">· {item.leccion}</span>}
                </div>
                {consignaArriba(vista) && <p className="text-[17px] font-bold leading-snug mb-4">{consignaArriba(vista)}</p>}
                {intento.pistas && !devolucion && vista.pieza !== "tarjetas" && (
                  <div className="mb-3">
                    {pista ? (
                      <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-amber-400/60 bg-amber-50 dark:bg-amber-950/40 px-3 py-2">
                        <p className="text-[11px] font-bold uppercase tracking-wide text-amber-800 dark:text-amber-200 flex items-center gap-1"><Lightbulb className="w-3.5 h-3.5" /> Pista: lo dice la lección</p>
                        <p className="text-[14px] italic leading-snug">{pista}</p>
                      </motion.div>
                    ) : (
                      <button
                        type="button"
                        onClick={async () => {
                          try {
                            setPista((await pedirPista(intento.id, n)).apoyo);
                          } catch (e: any) {
                            setError(e?.message || "No se pudo traer la pista.");
                          }
                        }}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-700 dark:text-amber-300 hover:underline"
                        data-testid="pista"
                      >
                        <Lightbulb className="w-4 h-4" /> Ver una pista
                      </button>
                    )}
                  </div>
                )}
                <Pieza
                  key={`${n}-${paso}`}
                  vista={vista}
                  correccion={devolucion?.correccion ?? null}
                  devolucion={devolucion}
                  bloqueado={!!devolucion || enviando}
                  alCambiar={setRespuesta}
                  alEnviar={(r) => void enviar(r)}
                />
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
              <Loader2 className="w-8 h-8 animate-spin" />
              <p>Guardando tu práctica…</p>
            </div>
          )}
          {error && (
            <div className="mt-4 rounded-xl border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-sm" role="alert">
              {error}
              {n >= total && !resultado && (
                <button type="button" onClick={() => void terminar()} className="ml-2 font-semibold underline">Intentar otra vez</button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* abajo: comprobar o la devolución */}
      <AnimatePresence initial={false}>
        {devolucion ? (
          <Devolucion_ key="d" d={devolucion} alSeguir={seguir} ultimo={n + 1 >= total} />
        ) : vista && !resultado && !portada && !SOLAS.has(vista.pieza) ? (
          <motion.div key="c" initial={false} className="shrink-0 border-t border-border/60 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            <div className="max-w-xl mx-auto">
              <button
                type="button"
                disabled={!respuesta || enviando}
                onClick={() => respuesta && void enviar(respuesta)}
                className="w-full h-13 min-h-[52px] rounded-2xl font-bold text-[17px] text-white bg-gradient-to-r from-amber-500 to-orange-600 shadow-lg shadow-orange-500/20 disabled:from-muted disabled:to-muted disabled:text-muted-foreground disabled:shadow-none transition-colors"
                data-testid="comprobar"
              >
                {enviando ? "Revisando…" : "Comprobar"}
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* el festejo de los aciertos seguidos */}
      <AnimatePresence>
        {festejo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            className="pointer-events-none fixed left-1/2 top-24 -translate-x-1/2 z-[80] rounded-full bg-gradient-to-r from-amber-500 to-red-500 text-white px-5 py-2 font-black text-lg shadow-xl flex items-center gap-2"
            aria-live="polite"
          >
            <Flame className="w-5 h-5" fill="currentColor" /> {festejo}
          </motion.div>
        )}
      </AnimatePresence>
      {ventana}
    </div>
  );
  return createPortal(contenido, document.body);
}
