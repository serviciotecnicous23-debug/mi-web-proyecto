// Las herramientas de lectura de una lección (entrega 3 del «cableado» de la academia):
// - «Escuchar la lección»: si la lección tiene su narración grabada con la voz de la academia (escuchar.tsx), suena
//   esa; si no, la lee la voz en español del teléfono o la computadora (la API de voz del navegador, sin costo ni
//   servidor), párrafo por párrafo, resaltando el que va leyendo; con pausa, detener y velocidad.
// - El tamaño de la letra (A− y A+), que se recuerda en este aparato.
// Lee los bloques marcados con data-bloque (los mismos que usa el cuaderno), en el orden de la página.
import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { Minus, Pause, Play, Plus, Square, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { trozosDeLectura } from "@shared/lectura-voz";
import type { NarracionVista } from "@shared/narracion";
import { EscucharGrabada } from "./escuchar";
import { resaltar } from "./resaltar";

const TAMANOS = [1, 1.1, 1.2, 1.35] as const;
const VELOCIDADES = [0.85, 1, 1.15, 1.3] as const;
const CLAVE_TAMANO = "academia:tamano-letra";
const CLAVE_VELOCIDAD = "academia:velocidad-voz";

const leer = (clave: string, lista: readonly number[], porDefecto: number) => {
  try {
    const v = Number(localStorage.getItem(clave));
    return lista.includes(v) ? v : porDefecto;
  } catch {
    return porDefecto;
  }
};
const guardar = (clave: string, v: number) => {
  try {
    localStorage.setItem(clave, String(v));
  } catch {
    // (sin almacenamiento: vale para esta visita)
  }
};

/** El tamaño de la letra de las lecciones (1 = normal), recordado en este aparato. */
export function useTamanoLetra(): [number, (n: number) => void] {
  const [tamano, setTamano] = useState(() => leer(CLAVE_TAMANO, TAMANOS, 1));
  const cambiar = useCallback((n: number) => {
    setTamano(n);
    guardar(CLAVE_TAMANO, n);
  }, []);
  return [tamano, cambiar];
}

/** La voz en español que mejor suena: primero las naturales (en línea), después las de América. */
function vozEspanol(): SpeechSynthesisVoice | null {
  const es = window.speechSynthesis.getVoices().filter((v) => v.lang?.toLowerCase().startsWith("es"));
  const puntos = (v: SpeechSynthesisVoice) => (/natural|online|neural|premium|enhanced/i.test(v.name) ? 0 : 2) + (/es[-_](us|mx|419|co|ar|cl|pe|ve)/i.test(v.lang) ? 0 : 1);
  return es.sort((a, b) => puntos(a) - puntos(b))[0] ?? null;
}

type Estado = "parado" | "leyendo" | "pausa";

/**
 * La barra de lectura de la lección: escuchar (con pausa, detener y velocidad) y el tamaño de la letra.
 * `contenedor`: donde están los bloques con data-bloque. `narracion`: la grabación con la voz de la academia (si la
 * lección la tiene); mientras suena, la barra queda fija arriba de la lectura.
 */
export function HerramientasLectura({
  contenedor,
  tamano,
  alCambiarTamano,
  narracion = null,
  leccion,
}: {
  contenedor: RefObject<HTMLElement | null>;
  tamano: number;
  alCambiarTamano: (n: number) => void;
  narracion?: NarracionVista | null;
  leccion?: { id: string; titulo: string; materia: string };
}) {
  const { toast } = useToast();
  // la voz grabada, mientras cargue bien; si falla, la del aparato
  const [grabada, setGrabada] = useState(!!narracion && !!leccion);
  const [activo, setActivo] = useState(false);
  useEffect(() => setGrabada(!!narracion && !!leccion), [narracion?.url, leccion?.id]);
  const [soportado, setSoportado] = useState(false);
  const [estado, setEstado] = useState<Estado>("parado");
  const [velocidad, setVelocidad] = useState(() => leer(CLAVE_VELOCIDAD, VELOCIDADES, 1));
  const [lugar, setLugar] = useState<{ n: number; de: number } | null>(null);
  // la lectura en curso: los bloques, el que se lee y una marca para cancelar lo que quedó en la cola
  const bloques = useRef<HTMLElement[]>([]);
  const indice = useRef(0);
  const vuelta = useRef(0);
  const velocidadRef = useRef(velocidad);
  velocidadRef.current = velocidad;

  useEffect(() => {
    const hay = typeof window !== "undefined" && "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
    setSoportado(hay);
    if (!hay) return;
    // algunas voces llegan tarde (Chrome): se piden ya para que estén al tocar «Escuchar»
    window.speechSynthesis.getVoices();
    return () => {
      vuelta.current++;
      window.speechSynthesis.cancel();
      bloques.current.forEach((b) => resaltar(b, false));
    };
  }, []);

  const leerDesde = useCallback((k: number) => {
    const sintesis = window.speechSynthesis;
    const mia = ++vuelta.current;
    sintesis.cancel();
    bloques.current.forEach((b) => resaltar(b, false));
    const lista = bloques.current;
    if (k >= lista.length) {
      setEstado("parado");
      setLugar(null);
      indice.current = 0;
      return;
    }
    indice.current = k;
    const el = lista[k];
    resaltar(el, true);
    const r = el.getBoundingClientRect();
    if (r.top < 80 || r.bottom > window.innerHeight - 80) el.scrollIntoView({ block: "center", behavior: "smooth" });
    setLugar({ n: k + 1, de: lista.length });
    const partes = trozosDeLectura(el.innerText);
    if (!partes.length) {
      leerDesde(k + 1);
      return;
    }
    const voz = vozEspanol();
    partes.forEach((texto, j) => {
      const u = new SpeechSynthesisUtterance(texto);
      u.lang = voz?.lang ?? "es-US";
      if (voz) u.voice = voz;
      u.rate = velocidadRef.current;
      if (j === partes.length - 1) {
        u.onend = () => {
          if (vuelta.current === mia) leerDesde(k + 1);
        };
      }
      u.onerror = (e) => {
        // «interrupted» y «canceled» son de detener o saltar: no es un error del alumno
        if (vuelta.current === mia && e.error !== "interrupted" && e.error !== "canceled") {
          setEstado("parado");
          resaltar(el, false);
        }
      };
      sintesis.speak(u);
    });
  }, []);

  const empezar = () => {
    const caja = contenedor.current;
    if (!caja) return;
    // en el orden de la página: «Para empezar», cada bloque y «La idea clave» (los que tienen texto)
    bloques.current = [...caja.querySelectorAll<HTMLElement>("[data-bloque]")].filter((b) => b.innerText.trim().length > 0);
    if (!bloques.current.length) return;
    setEstado("leyendo");
    leerDesde(estado === "pausa" ? indice.current : 0);
  };
  const pausar = () => {
    // (pausar y seguir no funciona igual en todos los teléfonos: se detiene y después sigue desde el mismo párrafo)
    vuelta.current++;
    window.speechSynthesis.cancel();
    setEstado("pausa");
  };
  const detener = () => {
    vuelta.current++;
    window.speechSynthesis.cancel();
    bloques.current.forEach((b) => resaltar(b, false));
    indice.current = 0;
    setEstado("parado");
    setLugar(null);
  };
  const cambiarVelocidad = () => {
    const i = VELOCIDADES.indexOf(velocidad as (typeof VELOCIDADES)[number]);
    const nueva = VELOCIDADES[(i + 1) % VELOCIDADES.length];
    setVelocidad(nueva);
    velocidadRef.current = nueva;
    guardar(CLAVE_VELOCIDAD, nueva);
    // si está leyendo, el párrafo de ahora sigue con la velocidad nueva
    if (estado === "leyendo") leerDesde(indice.current);
  };
  const iTamano = TAMANOS.indexOf(tamano as (typeof TAMANOS)[number]);
  const alFallar = useCallback(() => {
    setGrabada(false);
    setActivo(false);
    toast({ title: "No se pudo cargar la voz grabada", description: "Puedes escucharla con la voz de tu aparato." });
  }, [toast]);

  if (grabada && narracion && leccion) {
    return (
      <div
        className={
          activo
            ? "sticky z-30 top-[calc(var(--app-nav-h)+0.5rem)] mb-6 rounded-2xl border border-orange-500/30 bg-background/90 backdrop-blur-md shadow-lg px-2 py-1.5 flex flex-wrap items-center gap-2"
            : "flex flex-wrap items-center gap-2 mb-6"
        }
        role="toolbar"
        aria-label="Herramientas de lectura"
        data-testid="herramientas-lectura"
      >
        <EscucharGrabada
          narracion={narracion}
          leccion={leccion}
          contenedor={contenedor}
          velocidad={velocidad}
          alCambiarVelocidad={cambiarVelocidad}
          alCambiarActivo={setActivo}
          alFallar={alFallar}
        />
        {!activo && (
          <>
            <span className="w-px h-6 bg-border mx-1" aria-hidden="true" />
            <TamanoLetra tamano={tamano} iTamano={iTamano} alCambiarTamano={alCambiarTamano} />
          </>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6" role="toolbar" aria-label="Herramientas de lectura" data-testid="herramientas-lectura">
      {soportado && (
        <>
          {estado === "leyendo" ? (
            <Button size="sm" variant="outline" onClick={pausar} data-testid="lectura-pausar"><Pause className="w-4 h-4 mr-1.5" /> Pausar</Button>
          ) : (
            <Button size="sm" variant="outline" onClick={empezar} data-testid="lectura-escuchar">
              {estado === "pausa" ? <><Play className="w-4 h-4 mr-1.5" /> Seguir escuchando</> : <><Volume2 className="w-4 h-4 mr-1.5" /> Escuchar la lección</>}
            </Button>
          )}
          {estado !== "parado" && (
            <Button size="sm" variant="ghost" onClick={detener} aria-label="Detener la lectura" data-testid="lectura-detener"><Square className="w-4 h-4" /></Button>
          )}
          <Button size="sm" variant="ghost" onClick={cambiarVelocidad} aria-label={`Velocidad de la voz: ${velocidad}×. Tocar para cambiarla`} data-testid="lectura-velocidad">
            {String(velocidad).replace(".", ",")}×
          </Button>
          {lugar && <span className="text-xs text-muted-foreground" aria-live="polite" data-testid="lectura-lugar">Párrafo {lugar.n} de {lugar.de}</span>}
          <span className="w-px h-6 bg-border mx-1" aria-hidden="true" />
        </>
      )}
      <TamanoLetra tamano={tamano} iTamano={iTamano} alCambiarTamano={alCambiarTamano} />
    </div>
  );
}

function TamanoLetra({ iTamano, alCambiarTamano }: { tamano: number; iTamano: number; alCambiarTamano: (n: number) => void }) {
  return (
    <span className="inline-flex items-center gap-1" role="group" aria-label="Tamaño de la letra">
      <Button size="sm" variant="ghost" className="px-2" onClick={() => alCambiarTamano(TAMANOS[Math.max(0, iTamano - 1)])} disabled={iTamano <= 0} aria-label="Letra más pequeña" data-testid="letra-menos">
        <Minus className="w-3.5 h-3.5" /><span className="text-xs font-semibold">A</span>
      </Button>
      <Button size="sm" variant="ghost" className="px-2" onClick={() => alCambiarTamano(TAMANOS[Math.min(TAMANOS.length - 1, iTamano + 1)])} disabled={iTamano >= TAMANOS.length - 1} aria-label="Letra más grande" data-testid="letra-mas">
        <Plus className="w-3.5 h-3.5" /><span className="text-base font-semibold">A</span>
      </Button>
    </span>
  );
}
