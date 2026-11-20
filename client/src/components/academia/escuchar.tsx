// La lección con la voz de la academia (la narración grabada, docs/academia.md, «La voz de las lecciones»):
// - empieza presentando la materia, el título y los objetivos (la entrada narrada) y sigue con toda la lectura;
// - resalta el lugar que se oye y lo lleva a la vista (si el alumno no está moviendo la página);
// - controles en la pantalla de bloqueo y en los audífonos (Media Session): pausa, 10 s atrás o adelante, parte
//   anterior o siguiente;
// - sigue donde se quedó (en este aparato) y al terminar lleva al repaso.
// Si el audio no carga, la página vuelve a la voz del aparato (`alFallar`).
import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { ArrowDown, Headphones, Pause, Play, RotateCcw, RotateCw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { NarracionVista } from "@shared/narracion";
import { elementoDeLugar, llevarALaVista, resaltar } from "./resaltar";

type Estado = "parado" | "cargando" | "sonando" | "pausa" | "fin";

const reloj = (s: number) => {
  const t = Math.max(0, Math.floor(s));
  return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`;
};
const dicho = (s: number) => {
  const t = Math.max(0, Math.floor(s));
  const m = Math.floor(t / 60);
  return `${m} ${m === 1 ? "minuto" : "minutos"} ${t % 60} segundos`;
};
/** La marca que suena en un segundo (copia de `lugarEn` de shared/narracion, que trae expresiones que no hacen falta aquí). */
function lugarEn(marcas: readonly [string, number][], segundo: number): number {
  let k = -1;
  for (let i = 0; i < marcas.length; i++) {
    if (marcas[i][1] <= segundo + 0.05) k = i;
    else break;
  }
  return k;
}

const claveLugar = (url: string) => `academia:escucha:${url}`;
const leerLugar = (url: string) => {
  try {
    return Number(localStorage.getItem(claveLugar(url))) || 0;
  } catch {
    return 0;
  }
};
const guardarLugar = (url: string, s: number | null) => {
  try {
    if (s == null) localStorage.removeItem(claveLugar(url));
    else localStorage.setItem(claveLugar(url), String(Math.floor(s)));
  } catch {
    // (sin almacenamiento: vale para esta visita)
  }
};

export function EscucharGrabada({
  narracion,
  leccion,
  contenedor,
  velocidad,
  alCambiarVelocidad,
  alCambiarActivo,
  alFallar,
}: {
  narracion: NarracionVista;
  leccion: { id: string; titulo: string; materia: string };
  contenedor: RefObject<HTMLElement | null>;
  velocidad: number;
  alCambiarVelocidad: () => void;
  alCambiarActivo: (activo: boolean) => void;
  alFallar: () => void;
}) {
  const audio = useRef<HTMLAudioElement | null>(null);
  const [estado, setEstado] = useState<Estado>("parado");
  const [tiempo, setTiempo] = useState(0);
  const [duracion, setDuracion] = useState(narracion.segundos);
  const [guardado, setGuardado] = useState(() => leerLugar(narracion.url));
  const lugar = useRef(-1);
  const pendiente = useRef<number | null>(null);
  const gesto = useRef(0);
  const ultimoGuardado = useRef(0);
  const ultimaPosicion = useRef(0);
  const marcas = narracion.marcas;
  const activo = estado !== "parado";

  useEffect(() => alCambiarActivo(activo), [activo, alCambiarActivo]);

  // el alumno mueve la página: por un rato no se la movemos
  useEffect(() => {
    const marcar = () => (gesto.current = Date.now());
    const teclas = (e: KeyboardEvent) => ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(e.key) && marcar();
    window.addEventListener("wheel", marcar, { passive: true });
    window.addEventListener("touchmove", marcar, { passive: true });
    window.addEventListener("keydown", teclas);
    return () => {
      window.removeEventListener("wheel", marcar);
      window.removeEventListener("touchmove", marcar);
      window.removeEventListener("keydown", teclas);
    };
  }, []);

  const quitarResaltado = useCallback(() => {
    if (lugar.current >= 0) resaltar(elementoDeLugar(contenedor.current, marcas[lugar.current]?.[0] ?? ""), false);
    lugar.current = -1;
  }, [contenedor, marcas]);

  const seguirLugar = useCallback(
    (t: number) => {
      const k = lugarEn(marcas, t);
      if (k === lugar.current) return;
      quitarResaltado();
      lugar.current = k;
      if (k < 0) return;
      const el = elementoDeLugar(contenedor.current, marcas[k][0]);
      resaltar(el, true);
      if (el && Date.now() - gesto.current > 4000) llevarALaVista(el, 150);
    },
    [contenedor, marcas, quitarResaltado],
  );

  // la velocidad se cambia también mientras suena
  useEffect(() => {
    if (audio.current) audio.current.playbackRate = velocidad;
  }, [velocidad]);

  const irA = useCallback(
    (s: number) => {
      const a = audio.current;
      if (!a) return;
      const t = Math.min(Math.max(0, s), (Number.isFinite(a.duration) ? a.duration : duracion) - 0.25);
      if (a.readyState >= 1) a.currentTime = t;
      else pendiente.current = t;
      setTiempo(t);
      seguirLugar(t);
    },
    [duracion, seguirLugar],
  );
  const saltar = useCallback((d: number) => irA((audio.current?.currentTime ?? 0) + d), [irA]);
  /** La parte anterior (o el comienzo de esta, si ya pasaron 3 s) o la siguiente. */
  const parte = useCallback(
    (dir: -1 | 1) => {
      const t = audio.current?.currentTime ?? 0;
      const k = lugarEn(marcas, t);
      if (dir < 0) {
        const desde = k >= 0 ? marcas[k][1] : 0;
        irA(t - desde > 3 || k <= 0 ? desde : marcas[k - 1][1]);
      } else if (k + 1 < marcas.length) irA(marcas[k + 1][1]);
    },
    [irA, marcas],
  );

  const empezar = async (desde: number) => {
    const a = audio.current;
    if (!a) return;
    setEstado("cargando");
    a.preload = "auto";
    a.defaultPlaybackRate = velocidad;
    a.playbackRate = velocidad;
    if (desde > 0) {
      if (a.readyState >= 1) a.currentTime = desde;
      else pendiente.current = desde;
    }
    try {
      await a.play();
    } catch (e: any) {
      // NotAllowedError: el navegador no dejó empezar; se queda en pausa para tocar otra vez
      if (e?.name === "NotAllowedError") setEstado("pausa");
      else if (e?.name !== "AbortError") alFallar();
    }
  };
  const pausar = () => audio.current?.pause();
  const cerrar = () => {
    const a = audio.current;
    if (a) {
      if (a.currentTime > 5 && estado !== "fin") {
        guardarLugar(narracion.url, a.currentTime);
        setGuardado(a.currentTime);
      }
      a.pause();
    }
    quitarResaltado();
    setEstado("parado");
  };
  const alRepaso = () => {
    cerrar();
    document.querySelector<HTMLElement>('[data-testid="repaso"]')?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // los controles de la pantalla de bloqueo y de los audífonos
  useEffect(() => {
    const ms = typeof navigator !== "undefined" && "mediaSession" in navigator ? navigator.mediaSession : null;
    if (!ms || !activo) return;
    try {
      ms.metadata = new MediaMetadata({
        title: leccion.titulo,
        artist: "Academia Avivando el Fuego",
        album: leccion.materia,
        artwork: [
          { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
        ],
      });
    } catch {
      // (un navegador sin MediaMetadata)
    }
    const acciones: [MediaSessionAction, MediaSessionActionHandler][] = [
      ["play", () => void audio.current?.play()],
      ["pause", () => audio.current?.pause()],
      ["seekbackward", (d) => saltar(-(d.seekOffset || 10))],
      ["seekforward", (d) => saltar(d.seekOffset || 10)],
      ["seekto", (d) => d.seekTime != null && irA(d.seekTime)],
      ["previoustrack", () => parte(-1)],
      ["nexttrack", () => parte(1)],
    ];
    for (const [accion, fn] of acciones) {
      try {
        ms.setActionHandler(accion, fn);
      } catch {
        // (esa acción no existe en este navegador)
      }
    }
    return () => {
      for (const [accion] of acciones) {
        try {
          ms.setActionHandler(accion, null);
        } catch {
          // (igual que arriba)
        }
      }
      ms.metadata = null;
    };
  }, [activo, irA, leccion.materia, leccion.titulo, parte, saltar]);

  // al salir de la lección: se detiene y recuerda dónde iba
  useEffect(() => {
    const a = audio.current;
    return () => {
      if (a && !a.paused && a.currentTime > 5 && !a.ended) guardarLugar(narracion.url, a.currentTime);
      a?.pause();
    };
  }, [narracion.url]);

  const posicion = (a: HTMLAudioElement) => {
    const ms = "mediaSession" in navigator ? navigator.mediaSession : null;
    if (!ms?.setPositionState || !Number.isFinite(a.duration)) return;
    try {
      ms.setPositionState({ duration: a.duration, playbackRate: a.playbackRate, position: Math.min(a.currentTime, a.duration) });
    } catch {
      // (posición fuera de rango mientras carga)
    }
  };

  const hayGuardado = guardado > 10 && guardado < duracion - 20;
  const fraccion = duracion > 0 ? Math.min(1, tiempo / duracion) : 0;

  return (
    <>
      <audio
        ref={audio}
        src={narracion.url}
        preload="none"
        onLoadedMetadata={(e) => {
          const a = e.currentTarget;
          if (Number.isFinite(a.duration)) setDuracion(a.duration);
          if (pendiente.current != null) {
            a.currentTime = pendiente.current;
            pendiente.current = null;
          }
        }}
        onPlaying={(e) => {
          // (Safari en el iPhone vuelve a 1× al cargar el audio)
          if (e.currentTarget.playbackRate !== velocidad) e.currentTarget.playbackRate = velocidad;
          setEstado("sonando");
          if ("mediaSession" in navigator) navigator.mediaSession.playbackState = "playing";
          posicion(e.currentTarget);
        }}
        onWaiting={() => setEstado((s) => (s === "sonando" ? "cargando" : s))}
        onPause={(e) => {
          const a = e.currentTarget;
          if (a.ended) return;
          setEstado((s) => (s === "parado" ? s : "pausa"));
          if ("mediaSession" in navigator) navigator.mediaSession.playbackState = "paused";
          if (a.currentTime > 5) guardarLugar(narracion.url, a.currentTime);
        }}
        onTimeUpdate={(e) => {
          const a = e.currentTarget;
          setTiempo(a.currentTime);
          seguirLugar(a.currentTime);
          if (Math.abs(a.currentTime - ultimoGuardado.current) > 5) {
            ultimoGuardado.current = a.currentTime;
            if (a.currentTime > 5) guardarLugar(narracion.url, a.currentTime);
          }
          if (Math.abs(a.currentTime - ultimaPosicion.current) > 1) {
            ultimaPosicion.current = a.currentTime;
            posicion(a);
          }
        }}
        onRateChange={(e) => posicion(e.currentTarget)}
        onEnded={() => {
          guardarLugar(narracion.url, null);
          setGuardado(0);
          quitarResaltado();
          setEstado("fin");
          if ("mediaSession" in navigator) navigator.mediaSession.playbackState = "none";
        }}
        onError={() => {
          if (estado !== "parado") alFallar();
        }}
      />
      {!activo ? (
        <span className="inline-flex flex-wrap items-center gap-2">
          <Button size="sm" className="fire-btn-primary" onClick={() => void empezar(hayGuardado ? guardado : 0)} data-testid="lectura-escuchar" data-voz="grabada">
            {hayGuardado ? <Play className="w-4 h-4 mr-1.5" /> : <Headphones className="w-4 h-4 mr-1.5" />}
            {hayGuardado ? `Seguir escuchando (${reloj(guardado)})` : `Escuchar la lección · ${Math.max(1, Math.round(duracion / 60))} min`}
          </Button>
          {hayGuardado && (
            <Button size="sm" variant="ghost" onClick={() => void empezar(0)} data-testid="lectura-desde-el-principio">
              Desde el principio
            </Button>
          )}
        </span>
      ) : estado === "fin" ? (
        <div className="flex flex-wrap items-center gap-2 w-full" role="status" data-testid="lectura-fin">
          <p className="text-sm font-medium mr-auto">Terminaste de escuchar la lección.</p>
          <Button size="sm" className="fire-btn-primary" onClick={alRepaso} data-testid="lectura-ir-repaso"><ArrowDown className="w-4 h-4 mr-1.5" /> Ir al repaso</Button>
          <Button size="sm" variant="outline" onClick={() => void empezar(0)}><RotateCcw className="w-4 h-4 mr-1.5" /> Otra vez</Button>
          <Button size="sm" variant="ghost" onClick={cerrar} aria-label="Cerrar el reproductor"><X className="w-4 h-4" /></Button>
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-x-1 gap-y-1.5 w-full" data-testid="lectura-reproductor">
          <span className="inline-flex items-center gap-0.5">
            <Button size="sm" variant="ghost" className="px-2" onClick={() => saltar(-10)} aria-label="10 segundos atrás" data-testid="lectura-atras"><RotateCcw className="w-4 h-4" /></Button>
            {estado === "pausa" ? (
              <Button size="sm" className="fire-btn-primary w-10 px-0" onClick={() => void empezar(0)} aria-label="Seguir escuchando" data-testid="lectura-seguir"><Play className="w-4 h-4" /></Button>
            ) : (
              <Button size="sm" className="fire-btn-primary w-10 px-0" onClick={pausar} aria-label="Pausar" disabled={estado === "cargando"} data-testid="lectura-pausar"><Pause className="w-4 h-4" /></Button>
            )}
            <Button size="sm" variant="ghost" className="px-2" onClick={() => saltar(10)} aria-label="10 segundos adelante" data-testid="lectura-adelante"><RotateCw className="w-4 h-4" /></Button>
          </span>
          <span className="order-last sm:order-none basis-full sm:basis-auto sm:flex-1 flex items-center gap-2 min-w-0 px-1">
            <span className="text-xs tabular-nums text-muted-foreground w-9 text-right" aria-hidden="true">{reloj(tiempo)}</span>
            <input
              type="range"
              min={0}
              max={Math.max(1, Math.floor(duracion))}
              step={1}
              value={Math.floor(tiempo)}
              onChange={(e) => irA(Number(e.target.value))}
              className="flex-1 min-w-0 accent-orange-500 h-1.5 cursor-pointer"
              style={{ background: `linear-gradient(to right, rgb(249 115 22) ${fraccion * 100}%, rgb(249 115 22 / 0.2) ${fraccion * 100}%)`, borderRadius: 9999 }}
              aria-label="Avance de la lección"
              aria-valuetext={`${dicho(tiempo)} de ${dicho(duracion)}`}
              data-testid="lectura-avance"
            />
            <span className="text-xs tabular-nums text-muted-foreground w-9" aria-hidden="true">{reloj(duracion)}</span>
          </span>
          <span className="inline-flex items-center gap-0.5 ml-auto sm:ml-0">
            <Button size="sm" variant="ghost" className="px-2" onClick={alCambiarVelocidad} aria-label={`Velocidad: ${velocidad}×. Tocar para cambiarla`} data-testid="lectura-velocidad">
              {String(velocidad).replace(".", ",")}×
            </Button>
            <Button size="sm" variant="ghost" className="px-2" onClick={cerrar} aria-label="Cerrar el reproductor" data-testid="lectura-detener"><X className="w-4 h-4" /></Button>
          </span>
        </div>
      )}
    </>
  );
}
