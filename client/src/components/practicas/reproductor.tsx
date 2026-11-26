// El reproductor de prácticas: una actividad por pantalla, a pantalla completa en el teléfono, con la llama de avance,
// los puntos y la devolución de cada respuesta (por qué, la frase de la lección y su cita). Cada actividad llega con su
// forma de jugar (shared/practicas.ts, `FORMATOS`) y cada intento con su modalidad (el camino de la llama, la escalera,
// la racha o el reloj): así ninguna práctica es igual a la anterior. La primera vez de cada forma se explica sola.
// Al terminar muestra el resultado con sus estrellas.
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { BookOpen, CircleHelp, Crown, Flag, Flame, Lightbulb, Loader2, Play, Timer, Volume2, VolumeX, X } from "lucide-react";
import { NOMBRE_MODO, type Devolucion, type Formato, type IntentoVista, type ItemVista, type Modalidad, type RespuestaPractica, type ResultadoPractica } from "@shared/practicas";
import { useConfirmar } from "@/components/confirmar";
import { pedirPista, responder, terminarIntento } from "./api";
import { cambiarSonido, sonarBien, sonarMal, sonarMedio, sonidoActivo } from "./sonido";
import { Clasifica, Completa, EncuentraError, Explica, Relaciona, Relampago, Situacion, Verdad, Ordena as OrdenaLista, type PropsPieza } from "./piezas";
import { Chat, CualFalsa, Desliza, Detective, DondeVa, EligePalabra, EligePareja, Escalones, Escribela, Intruso } from "./formas";
import { Caso, Escenario, Linea, Mapa, MapaIdeas, Pasaje } from "./piezas-avanzadas";
import { Adivina, Anagrama, ArmaLaFrase, Atrapalas, Crucigrama, Globos, Memoria, Sopa } from "./dinamicas";
import { AsiSeJuega, claveForma, iconoForma, nombreForma, TarjetaModalidad, useFormasVistas } from "./asi-se-juega";
import { Resultado } from "./resultado";

/** Las formas que se responden solas con un toque (no muestran «Comprobar»). */
const SOLAS = new Set<Formato>(["relampago", "elige-pareja", "desliza", "intruso", "escalones", "donde-va", "verdad-o-error", "cual-falsa", "memoria", "atrapa", "adivina", "globos"]);
/** Las que llevan su tiempo y no van contra el reloj (buscar en la sopa, escribir el crucigrama, ver caer las frases). */
const SIN_RELOJ = new Set<Formato>(["texto", "sopa", "crucigrama", "atrapa", "adivina", "globos"]);

/** La modalidad «Contra el reloj»: segundos para el premio y puntos que da. */
const RELOJ_SEGUNDOS = 20;
const RELOJ_PREMIO = 5;
/** La modalidad «Escalera de fuego»: escalones hasta la cima y el premio de llegar. */
const ESCALONES = 5;
const ESCALERA_PREMIO = 25;
/** La modalidad «Racha encendida»: el multiplicador según los aciertos seguidos. */
const multiplicador = (seguidas: number) => (seguidas >= 6 ? 3 : seguidas >= 3 ? 2 : 1);

// (cada forma recibe su vista ya del tipo que le toca: el `switch` elige por `formato`)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Pieza(props: Omit<PropsPieza<any>, "vista" | "correccion"> & { vista: ItemVista; correccion: any }) {
  const v = props.vista;
  const p = props as any;
  switch (v.formato) {
    case "relampago":
      return <Relampago {...p} />;
    case "banco":
      return <Completa {...p} />;
    case "elige":
      return <EligePalabra {...p} />;
    case "escribe":
      return <Escribela {...p} />;
    case "parejas":
      return <Relaciona {...p} />;
    case "elige-pareja":
      return <EligePareja {...p} />;
    case "recuadros":
      return <Clasifica {...p} />;
    case "desliza":
      return <Desliza {...p} />;
    case "intruso":
      return <Intruso {...p} />;
    case "escalones":
      return <Escalones {...p} />;
    case "donde-va":
      return <DondeVa {...p} />;
    case "verdad-o-error":
      return <Verdad {...p} />;
    case "cual-falsa":
      return <CualFalsa {...p} />;
    case "frases":
      return <EncuentraError {...p} />;
    case "detective":
      return <Detective {...p} />;
    case "opciones":
      return <Situacion {...p} />;
    case "chat":
      return <Chat {...p} />;
    case "texto":
      return <Explica {...p} />;
    case "anagrama":
      return <Anagrama {...p} />;
    case "sopa":
      return <Sopa {...p} />;
    case "crucigrama":
      return <Crucigrama {...p} />;
    case "arma":
      return <ArmaLaFrase {...p} />;
    case "memoria":
      return <Memoria {...p} />;
    case "atrapa":
      return <Atrapalas {...p} />;
    case "adivina":
      return <Adivina {...p} />;
    case "globos":
      return <Globos {...p} />;
    default:
      break;
  }
  switch (v.pieza) {
    case "ordena":
      return (
        <div data-testid="pieza-ordena">
          <p className="font-bold text-lg mb-3">{v.consigna}</p>
          {v.formato === "lista" && (
            <OrdenaLista items={v.pasos} correcto={props.correccion?.correcto ?? null} bloqueado={props.bloqueado} alCambiar={(orden) => props.alCambiar({ pieza: "ordena", orden })} />
          )}
        </div>
      );
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
    default:
      return null;
  }
}

/** La consigna que va arriba de la actividad (las formas que ya la muestran adentro no la repiten). */
const ADENTRO = new Set<string>(["relampago", "escalones", "cual-falsa", "opciones", "chat", "texto"]);
function consignaArriba(v: ItemVista): string | null {
  if (ADENTRO.has(v.formato)) return null;
  if ((v.pieza === "ordena" && v.formato === "lista") || v.pieza === "escenario" || v.pieza === "caso") return null;
  return v.consigna;
}

// ---------------------------------------------------------------- lo que se ve de la modalidad arriba

function RelojDeArriba({ inicio, parado }: { inicio: number | null; parado: boolean }) {
  const [ahora, setAhora] = useState(() => Date.now());
  useEffect(() => {
    setAhora(Date.now());
    if (inicio == null || parado) return;
    const t = window.setInterval(() => setAhora(Date.now()), 250);
    return () => window.clearInterval(t);
  }, [inicio, parado]);
  const pasados = inicio == null ? 0 : Math.max(0, (ahora - inicio) / 1000);
  const quedan = Math.max(0, Math.min(RELOJ_SEGUNDOS, Math.ceil(RELOJ_SEGUNDOS - pasados)));
  const fraccion = quedan / RELOJ_SEGUNDOS;
  const color = quedan === 0 ? "text-muted-foreground" : quedan <= 5 ? "text-rose-500" : "text-amber-500";
  const r = 13;
  const c = 2 * Math.PI * r;
  return (
    <span className={`relative w-9 h-9 shrink-0 flex items-center justify-center ${color}`} aria-label={quedan > 0 ? `Quedan ${quedan} segundos para el premio` : "Se acabó el tiempo del premio"} data-testid="reloj">
      <svg viewBox="0 0 32 32" className="absolute inset-0 w-full h-full -rotate-90" aria-hidden>
        <circle cx="16" cy="16" r={r} fill="none" stroke="currentColor" strokeOpacity={0.18} strokeWidth="3" />
        <circle cx="16" cy="16" r={r} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - fraccion)} />
      </svg>
      {quedan > 0 ? <span className="text-[12px] font-black tabular-nums">{quedan}</span> : <Timer className="w-4 h-4" />}
    </span>
  );
}

function EscaleraDeArriba({ escalon }: { escalon: number }) {
  const quieto = useReducedMotion();
  return (
    <span className="flex items-end gap-[3px] h-7 shrink-0" aria-label={`Escalón ${escalon} de ${ESCALONES}`} data-testid="escalera">
      {Array.from({ length: ESCALONES }, (_, k) => (
        <motion.span
          key={k}
          initial={false}
          animate={{ scale: !quieto && k === escalon - 1 ? [1, 1.25, 1] : 1 }}
          className={`w-[7px] rounded-sm ${k < escalon ? "bg-gradient-to-t from-orange-500 to-amber-400" : "bg-foreground/15"}`}
          style={{ height: `${8 + k * 4.5}px` }}
        />
      ))}
    </span>
  );
}

function RachaDeArriba({ seguidas }: { seguidas: number }) {
  const x = multiplicador(seguidas);
  return (
    <span
      className={`shrink-0 h-7 px-2 rounded-full flex items-center gap-0.5 text-[13px] font-black tabular-nums ${x === 3 ? "bg-gradient-to-r from-orange-500 to-red-600 text-white" : x === 2 ? "bg-amber-500 text-white" : "bg-foreground/10 text-muted-foreground"}`}
      aria-label={`Racha de ${seguidas}: tus puntos valen por ${x}`}
      data-testid="racha"
    >
      <Flame className="w-3.5 h-3.5" fill="currentColor" fillOpacity={0.35} />×{x}
    </span>
  );
}

// ---------------------------------------------------------------- la devolución

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
  const error = d.correccion.pieza === "completa" && "error" in d.correccion ? d.correccion.error : null;
  return (
    <motion.div
      initial={quieto ? false : { y: "100%" }}
      animate={{ y: 0 }}
      exit={quieto ? undefined : { y: "100%" }}
      transition={{ type: "spring", stiffness: 320, damping: 32 }}
      className={`border-t-2 ${cls} px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] max-h-[55vh] overflow-y-auto`}
      role="status"
      data-testid="devolucion"
    >
      <div className="max-w-xl mx-auto">
        <p className="text-lg font-extrabold">{titulo}</p>
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

// ---------------------------------------------------------------- los puntos de más de la modalidad (en este teléfono)

const leerBono = (clave: string) => {
  try {
    return Math.max(0, Number(sessionStorage.getItem(clave)) || 0);
  } catch {
    return 0;
  }
};
const guardarBono = (clave: string, valor: number) => {
  try {
    sessionStorage.setItem(clave, String(valor));
  } catch {
    /* (sin almacenamiento: los puntos de más solo se ven mientras dura la práctica) */
  }
};

// ---------------------------------------------------------------- el reproductor

export function Reproductor({ intento, alSalir, alOtraVez }: { intento: IntentoVista; alSalir: () => void; alOtraVez?: () => void }) {
  const quieto = useReducedMotion();
  const { pedir: confirmar, ventana } = useConfirmar();
  const modalidad: Modalidad = intento.modalidad ?? "camino";
  const claveBono = `academia:bono:${intento.id}`;
  const [vistas, setVistas] = useState<ItemVista[]>(() => intento.items.map((i) => i.vista));
  const [hechas, setHechas] = useState<boolean[]>(() => intento.items.map((i) => i.hecha));
  const [n, setN] = useState(() => {
    const k = intento.items.findIndex((i) => !i.hecha);
    return k < 0 ? intento.items.length : k;
  });
  const [paso, setPaso] = useState(0);
  const [respuesta, setRespuesta] = useState<RespuestaPractica | null>(null);
  const [devolucion, setDevolucion] = useState<Devolucion | null>(null);
  /** La memoria entre volteo y volteo, y «Adivina la palabra» entre letra y letra: la devolución no abre su panel y se sigue sola. */
  const [callada, setCallada] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [pista, setPista] = useState<string | null>(null);
  const [puntos, setPuntos] = useState(() => (intento.puntos ?? 0) + leerBono(claveBono));
  const [seguidas, setSeguidas] = useState(0);
  const [escalon, setEscalon] = useState(0);
  const [inicio, setInicio] = useState<number | null>(null);
  const [festejo, setFestejo] = useState<string | null>(null);
  const [resultado, setResultado] = useState<ResultadoPractica | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sonido, setSonido] = useState(sonidoActivo());
  const [ayuda, setAyuda] = useState<"primera" | "ver" | null>(null);
  const { conocida, conocer } = useFormasVistas();
  const total = intento.items.length;
  // cada intento empieza con su portada (qué se juega y con qué modalidad), si no se empezó todavía
  const [portada, setPortada] = useState(() => intento.items.every((i) => !i.hecha));
  const zona = useRef<HTMLDivElement>(null);
  const vista = n < total ? vistas[n] : null;
  // (escribir con sus palabras no va contra el reloj: nadie escribe 15 palabras en 20 segundos)
  const sinReloj = !!vista && (SIN_RELOJ.has(vista.formato) || vista.pieza === "caso");
  // (la memoria no cambia de pantalla entre volteos, ni «Adivina la palabra» entre letras de la misma palabra)
  const clavePaso = vista?.formato === "memoria" || vista?.formato === "adivina" ? vista.formato : paso;

  // las formas de jugar distintas de este intento (para la portada)
  const formas = useMemo(() => new Set(intento.items.map((i) => claveForma(i.vista))).size, [intento.items]);

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

  // la primera vez de cada forma de jugar, se explica sola
  useEffect(() => {
    if (portada || resultado || !vista) return;
    if (!conocida(claveForma(vista))) setAyuda("primera");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n, portada, resultado]);

  // el reloj de la modalidad: corre desde que se ve el paso (con la explicación abierta, no)
  useEffect(() => {
    if (portada || ayuda || resultado || n >= total) {
      setInicio(null);
      return;
    }
    setInicio(Date.now());
  }, [n, paso, portada, ayuda, resultado, total]);

  const cerrarAyuda = () => {
    if (vista) conocer(claveForma(vista));
    setAyuda(null);
  };

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

  const festejar = (texto: string) => {
    setFestejo(texto);
    window.setTimeout(() => setFestejo((f) => (f === texto ? null : f)), 1700);
  };

  const enviar = async (r: RespuestaPractica) => {
    if (enviando || devolucion) return;
    const rapido = inicio != null && Date.now() - inicio <= RELOJ_SEGUNDOS * 1000;
    setEnviando(true);
    setError(null);
    try {
      const d = await responder(intento.id, n, r);
      // (un volteo de la memoria que no fue pareja, o una letra que no está, no es un error: es parte del juego)
      const volteo = !!d.siguiente && (vista?.formato === "memoria" || (vista?.formato === "adivina" && !(d.correccion as { palabra?: string | null }).palabra));
      setCallada(volteo);
      setDevolucion(d);
      if (d.bien) sonarBien();
      else if (d.puntaje >= 0.5 || volteo) sonarMedio();
      else sonarMal();
      // los puntos: los del paso y, según la modalidad, los de más (nunca cambian la nota)
      const base = volteo && vista?.formato === "adivina" ? (d.bien ? 2 : 0) : Math.round(d.puntaje * 10);
      const s = d.bien ? seguidas + 1 : volteo ? seguidas : 0;
      setSeguidas(s);
      let bono = 0;
      let aviso: string | null = null;
      if (modalidad === "racha" && d.bien) {
        bono += base * (multiplicador(s) - 1);
        if (s === 3) aviso = "¡Racha! Tus puntos valen ×2";
        else if (s === 6) aviso = "¡Racha de fuego! Tus puntos valen ×3";
      }
      if (modalidad === "reloj" && d.bien && rapido && !sinReloj) {
        bono += RELOJ_PREMIO;
        aviso = `¡Rápido! +${RELOJ_PREMIO}`;
      }
      if (modalidad === "escalera") {
        const e = d.bien ? escalon + 1 : d.puntaje >= 0.5 || volteo ? escalon : Math.max(0, escalon - 1);
        if (e >= ESCALONES) {
          bono += ESCALERA_PREMIO;
          aviso = `¡Llegaste a la cima! +${ESCALERA_PREMIO}`;
          setEscalon(0);
        } else setEscalon(e);
      }
      if (!aviso && d.bien && (s === 3 || s === 5 || s === 10)) aviso = `¡${s} seguidas!`;
      setPuntos((p) => p + base + bono);
      if (bono) guardarBono(claveBono, leerBono(claveBono) + bono);
      if (aviso) festejar(aviso);
    } catch (e: any) {
      setError(e?.message || "No se pudo enviar. Revisa tu conexión e inténtalo otra vez.");
    } finally {
      setEnviando(false);
    }
  };

  const seguir = () => {
    if (!devolucion) return;
    const d = devolucion;
    setCallada(false);
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

  // la memoria se sigue sola entre volteos (un momento para ver las dos cartas)
  useEffect(() => {
    if (!devolucion || !callada) return;
    const t = window.setTimeout(seguir, vista?.formato === "adivina" ? 280 : devolucion.bien ? 650 : 1150);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [devolucion, callada]);

  const salir = () => {
    if (resultado || portada || (n === 0 && !devolucion && paso === 0 && hechas.every((h) => !h))) return alSalir();
    confirmar({
      titulo: "¿Salir de la práctica?",
      detalle: "Lo que ya respondiste queda guardado: puedes seguir hoy desde donde quedaste.",
      boton: "Salir",
      accion: alSalir,
    });
  };

  const progreso = useMemo(() => {
    const hechasN = hechas.filter(Boolean).length;
    const parcial = vista && "pasos" in vista && typeof (vista as any).pasos === "number" && (vista as any).pasos > 0 ? (vista as any).paso / (vista as any).pasos : 0;
    return Math.min(1, (hechasN + (devolucion && !devolucion.siguiente ? 1 : parcial)) / Math.max(1, total));
  }, [hechas, vista, devolucion, total]);

  useEffect(() => {
    const tecla = (e: KeyboardEvent) => {
      if (ayuda || e.key !== "Enter" || e.shiftKey || (e.target as HTMLElement)?.tagName === "TEXTAREA" || (e.target as HTMLElement)?.tagName === "BUTTON") return;
      if (devolucion) {
        e.preventDefault();
        seguir();
      } else if (respuesta && vista && !SOLAS.has(vista.formato)) {
        e.preventDefault();
        void enviar(respuesta);
      }
    };
    window.addEventListener("keydown", tecla);
    return () => window.removeEventListener("keydown", tecla);
  });

  const item = n < total ? intento.items[n] : null;
  const IconoForma = vista ? iconoForma(vista) : null;
  const etiquetaModo =
    intento.modo === "mision"
      ? `Misión · ${intento.materia.titulo}`
      : intento.modo === "dia"
        ? "Práctica del día"
        : intento.modo === "reto"
          ? `${intento.leccion ? `Lección ${intento.leccion.n} · ` : ""}Reto de dominio`
          : intento.modo === "cuenta"
          ? `${intento.leccion ? `Lección ${intento.leccion.n} · ` : ""}Cuenta para tu nota`
          : `${NOMBRE_MODO[intento.modo]}${intento.leccion ? ` · Lección ${intento.leccion.n}` : ""}`;
  const contenido = (
    <div className="fixed inset-0 z-50 bg-background text-foreground flex flex-col" role="dialog" aria-modal="true" aria-label={intento.titulo} data-testid="reproductor" data-modalidad={modalidad}>
      {/* arriba: salir, la llama de avance, la modalidad y los puntos */}
      <div className="shrink-0 px-3 pt-[max(0.5rem,env(safe-area-inset-top))] pb-2 border-b border-border/60">
        <div className="max-w-xl mx-auto flex items-center gap-2">
          <button type="button" onClick={salir} className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center hover:bg-muted" aria-label="Salir de la práctica" data-testid="salir-practica">
            <X className="w-6 h-6" />
          </button>
          <div className="flex-1 relative h-4 rounded-full bg-foreground/10 overflow-visible" role="progressbar" aria-valuenow={Math.round(progreso * 100)} aria-valuemin={0} aria-valuemax={100} aria-label="Avance">
            <motion.div className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-red-500" initial={false} animate={{ width: `${Math.max(4, progreso * 100)}%` }} transition={{ type: "spring", stiffness: 120, damping: 20 }} />
            <motion.span className="absolute -top-[7px] text-orange-500 drop-shadow" initial={false} animate={{ left: `calc(${Math.max(4, progreso * 100)}% - 14px)` }} transition={{ type: "spring", stiffness: 120, damping: 20 }} aria-hidden>
              <Flame className="w-7 h-7" fill="currentColor" fillOpacity={0.35} />
            </motion.span>
          </div>
          {!portada && !resultado && modalidad === "reloj" && !sinReloj && <RelojDeArriba inicio={inicio} parado={!!devolucion || enviando} />}
          {!portada && !resultado && modalidad === "escalera" && <EscaleraDeArriba escalon={escalon} />}
          {!portada && !resultado && modalidad === "racha" && <RachaDeArriba seguidas={seguidas} />}
          <motion.span key={puntos} initial={quieto ? false : { scale: 1.35 }} animate={{ scale: 1 }} className="min-w-[44px] text-right font-black text-amber-600 tabular-nums" aria-label={`${puntos} puntos`} data-testid="puntos">
            {puntos}
          </motion.span>
          <button
            type="button"
            onClick={() => {
              cambiarSonido(!sonido);
              setSonido(!sonido);
            }}
            className="w-9 h-9 shrink-0 rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted"
            aria-label={sonido ? "Silenciar los sonidos" : "Activar los sonidos"}
          >
            {sonido ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* en medio: la actividad */}
      <div ref={zona} className="flex-1 overflow-y-auto overscroll-contain">
        <div className="max-w-xl mx-auto px-4 pt-4 pb-6">
          {intento.prueba && <p className="mb-3 rounded-xl bg-sky-500/10 border border-sky-500/30 px-3 py-2 text-xs text-sky-900 dark:text-sky-100">Vista de la Administración: pruebas la práctica y nada cuenta.</p>}
          {portada && !resultado ? (
            <motion.div initial={quieto ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center pt-4" data-testid="portada-practica">
              <span className={`inline-flex w-20 h-20 rounded-3xl text-white items-center justify-center shadow-xl rotate-3 ${intento.modo === "reto" ? "bg-gradient-to-br from-yellow-400 to-amber-600" : "bg-gradient-to-br from-orange-500 to-red-600"}`}>
                {intento.modo === "mision" ? <Flag className="w-10 h-10" /> : intento.modo === "reto" ? <Crown className="w-10 h-10" /> : <Flame className="w-10 h-10" fill="currentColor" fillOpacity={0.3} />}
              </span>
              <p className="mt-4 text-xs font-bold uppercase tracking-wide text-amber-700 dark:text-amber-300">{etiquetaModo}</p>
              <h2 className="mt-1 text-[28px] font-black leading-tight">{intento.titulo}</h2>
              {(intento.modo === "mision" || intento.modo === "dia" || intento.modo === "reto") && <p className="mt-3 text-[16px] leading-relaxed text-muted-foreground max-w-md mx-auto">{intento.subtitulo}</p>}
              <p className="mt-3 text-sm font-semibold">
                {total} {total === 1 ? "actividad" : "actividades"}
                {formas > 1 ? ` · ${formas} formas de jugar` : ""}
                {intento.modo === "mision" ? " de todas las lecciones" : ""}
              </p>
              {intento.modo === "cuenta" && !intento.prueba && <p className="mt-1 text-sm text-muted-foreground">Vale tu mejor intento: la puedes repetir cuando quieras.</p>}
              {intento.modo !== "reto" && <TarjetaModalidad modalidad={modalidad} />}
              <button type="button" onClick={() => setPortada(false)} className="mt-6 h-14 px-8 rounded-2xl font-black text-lg text-white bg-gradient-to-r from-amber-500 to-orange-600 inline-flex items-center gap-2 shadow-lg shadow-orange-500/25" data-testid="empezar-portada">
                <Play className="w-5 h-5" fill="currentColor" /> {intento.modo === "mision" ? "Empezar la misión" : "Empezar"}
              </button>
            </motion.div>
          ) : resultado ? (
            <Resultado r={resultado} intento={intento} puntos={puntos} alSalir={alSalir} alOtraVez={alOtraVez} />
          ) : vista && item ? (
            <AnimatePresence mode="wait">
              <motion.div key={`${n}-${clavePaso}`} initial={quieto ? false : { opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={quieto ? undefined : { opacity: 0, x: -30 }} transition={{ duration: 0.22 }}>
                <div className="flex items-center gap-2 mb-2 min-w-0">
                  <button
                    type="button"
                    onClick={() => setAyuda("ver")}
                    className="shrink-0 inline-flex items-center gap-1 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-200 pl-2 pr-1.5 py-0.5 text-xs font-bold hover:bg-amber-500/25"
                    aria-label={`${nombreForma(vista)}: ver cómo se juega`}
                    data-testid="forma"
                  >
                    {IconoForma && <IconoForma className="w-3.5 h-3.5" />}
                    {nombreForma(vista)}
                    <CircleHelp className="w-3.5 h-3.5 opacity-70" />
                  </button>
                  <span className="shrink-0 text-xs text-muted-foreground">{n + 1} de {total}</span>
                  {item.leccion && <span className="text-xs text-muted-foreground truncate">· {item.leccion}</span>}
                </div>
                {consignaArriba(vista) && <p className="text-[17px] font-bold leading-snug mb-4">{consignaArriba(vista)}</p>}
                {intento.pistas && !devolucion && (
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
                        <Lightbulb className="w-4 h-4" /> Ver una pista{intento.modo === "cuenta" && <span className="font-normal text-muted-foreground"> (esta actividad valdrá la mitad)</span>}
                      </button>
                    )}
                  </div>
                )}
                <Pieza
                  key={`${n}-${clavePaso}`}
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
        {devolucion && callada ? null : devolucion ? (
          <Devolucion_ key="d" d={devolucion} alSeguir={seguir} ultimo={n + 1 >= total} />
        ) : vista && !resultado && !portada && !SOLAS.has(vista.formato) ? (
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

      {/* el festejo de los aciertos seguidos y de los premios de la modalidad */}
      <AnimatePresence>
        {festejo && (
          <motion.div
            key={festejo}
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            className="pointer-events-none fixed left-1/2 top-24 -translate-x-1/2 z-[80] rounded-full bg-gradient-to-r from-amber-500 to-red-500 text-white px-5 py-2 font-black text-lg shadow-xl flex items-center gap-2 whitespace-nowrap"
            aria-live="polite"
          >
            <Flame className="w-5 h-5" fill="currentColor" /> {festejo}
          </motion.div>
        )}
      </AnimatePresence>

      {/* la explicación de la forma de jugar (sola la primera vez; después, con el botón de la etiqueta) */}
      <AnimatePresence>{ayuda && vista && !portada && !resultado && <AsiSeJuega key="ayuda" vista={vista} primera={ayuda === "primera"} alCerrar={cerrarAyuda} />}</AnimatePresence>
      {ventana}
    </div>
  );
  return createPortal(contenido, document.body);
}
