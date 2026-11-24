// «Así se juega»: la primera vez que el alumno se encuentra con una forma de jugar se le explica en grande, paso a paso
// (y la puede volver a ver con el botón de ayuda). Así nadie pierde estrellas por no entender la mecánica, que fue lo
// que le pasó a Luis con «coloca en cada recuadro».
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Briefcase,
  CalendarRange,
  ChevronsUp,
  Clapperboard,
  Flame,
  LayoutGrid,
  Link2,
  ListOrdered,
  MapPin,
  MessageCircle,
  MoveHorizontal,
  Network,
  PencilLine,
  PenLine,
  Route,
  Scale,
  Search,
  SearchX,
  ShieldQuestion,
  Signpost,
  SpellCheck,
  SquareDashed,
  TextCursorInput,
  Timer,
  Footprints,
  Zap,
} from "lucide-react";
import { NOMBRE_FORMATO, NOMBRE_MODALIDAD, NOMBRE_PIEZA, type ItemVista, type Modalidad } from "@shared/practicas";

/** La clave de la forma de jugar de una actividad (las piezas de una sola forma usan su pieza). */
export function claveForma(v: ItemVista): string {
  return v.formato === "normal" || v.pieza === "linea" ? `pieza:${v.pieza}` : v.formato;
}

/** El nombre de la forma de jugar (la etiqueta de arriba de la actividad). */
export function nombreForma(v: ItemVista): string {
  return v.formato === "normal" || v.pieza === "linea" ? NOMBRE_PIEZA[v.pieza] : NOMBRE_FORMATO[v.formato];
}

/** Cómo se juega cada forma, paso a paso (lo que se ve la primera vez). */
const FORMAS: Record<string, { icono: LucideIcon; pasos: string[] }> = {
  relampago: { icono: Zap, pasos: ["Lee la pregunta de la tarjeta.", "Toca la respuesta correcta: solo una de las tres lo es.", "Al instante sabes si acertaste."] },
  banco: { icono: PenLine, pasos: ["Abajo hay un banco de palabras.", "Toca una palabra y después el espacio de la frase donde va.", "Cuando llenes todos los espacios, toca Comprobar."] },
  elige: { icono: TextCursorInput, pasos: ["Cada espacio de la frase trae dos palabras.", "Toca la que completa bien la idea.", "Cuando elijas en todos, toca Comprobar."] },
  escribe: { icono: PencilLine, pasos: ["Lee la frase: le faltan palabras.", "Escribe en cada espacio la que falta: te mostramos su primera letra y cuántas letras tiene.", "Las tildes y las mayúsculas no importan. Después toca Comprobar."] },
  parejas: { icono: Link2, pasos: ["A la izquierda hay ideas y a la derecha, lo que les corresponde.", "Toca una idea y después su pareja: quedan con el mismo color y número.", "Cuando unas todas, toca Comprobar."] },
  "elige-pareja": { icono: Link2, pasos: ["Arriba aparece una idea.", "Toca, de las opciones, la que le corresponde.", "Así con cada pareja, una por una."] },
  recuadros: { icono: LayoutGrid, pasos: ["Arriba están los recuadros: uno por cada grupo.", "Toca una frase de abajo y después el recuadro del grupo donde va.", "Cuando pongas todas, toca Comprobar."] },
  desliza: { icono: MoveHorizontal, pasos: ["Arriba están los dos grupos, uno a cada lado.", "Desliza la frase hacia el lado de su grupo, o toca el botón del grupo.", "Así con cada frase, una por una."] },
  intruso: { icono: SearchX, pasos: ["Aparecen cuatro frases.", "Tres son del mismo grupo y una no.", "Toca la que no va con las demás."] },
  lista: { icono: ListOrdered, pasos: ["Los pasos están revueltos.", "Arrástralos desde el asa o muévelos con las flechas.", "Cuando estén en orden, toca Comprobar."] },
  escalones: { icono: Footprints, pasos: ["Vas a armar una escalera, del primer paso al último.", "En cada escalón, toca lo que va ahí.", "Cada escalón queda puesto y sigues con el próximo."] },
  "donde-va": { icono: SquareDashed, pasos: ["Arriba está un paso que se salió de la lista.", "Abajo está la lista en su orden, con lugares marcados Aquí.", "Toca el lugar donde va ese paso."] },
  "verdad-o-error": { icono: Scale, pasos: ["Lee la afirmación.", "Toca Verdad o Error (o desliza: a la derecha es verdad, a la izquierda es error).", "Vienen una tras otra."] },
  "cual-falsa": { icono: ShieldQuestion, pasos: ["Aparecen tres frases.", "Fíjate en lo que se pide: la que NO es verdad o la que SÍ lo es.", "Toca esa frase."] },
  frases: { icono: SpellCheck, pasos: ["Lee todas las frases.", "Una tiene un error.", "Tócala y después toca Comprobar."] },
  detective: { icono: Search, pasos: ["Lee el texto completo, como un detective.", "Una de sus frases tiene un error.", "Toca esa frase y después Comprobar."] },
  opciones: { icono: Signpost, pasos: ["Lee la situación.", "Elige qué harías o qué dirías.", "Toca Comprobar y verás por qué cada opción es buena o no."] },
  chat: { icono: MessageCircle, pasos: ["Alguien te escribió un mensaje.", "Elige la respuesta que le darías.", "Toca Comprobar y verás por qué cada respuesta es buena o no."] },
  texto: { icono: PencilLine, pasos: ["Lee la pregunta.", "Respóndela con tus palabras, sin copiar.", "Toca Comprobar: verás qué ideas tocaste y una respuesta modelo."] },
  "pieza:linea": { icono: CalendarRange, pasos: ["Los hechos están revueltos.", "Ordénalos del primero al último: arrástralos o usa las flechas.", "Cuando estén en orden, toca Comprobar."] },
  "pieza:mapa-ideas": { icono: Network, pasos: ["Las ideas están unidas por líneas.", "Toca cada ¿? y elige cómo se une una idea con la otra.", "Cuando elijas todas, toca Comprobar."] },
  "pieza:mapa": { icono: MapPin, pasos: ["Arriba dice qué lugar buscar.", "Tócalo en el mapa.", "Toca Comprobar para ver dónde estaba."] },
  "pieza:pasaje": { icono: BookOpen, pasos: ["Lee el pasaje.", "Toca las palabras que responden (te decimos cuántas son).", "Toca Comprobar."] },
  "pieza:escenario": { icono: Clapperboard, pasos: ["Lee lo que pasa.", "En cada momento, elige qué harías.", "Cada decisión te lleva al momento siguiente."] },
  "pieza:caso": { icono: Briefcase, pasos: ["Lee el caso con calma (lo puedes volver a abrir).", "Responde cada paso: elige o escribe.", "Al final verás cómo te fue en el caso completo."] },
};

export const iconoForma = (v: ItemVista): LucideIcon => FORMAS[claveForma(v)]?.icono ?? Zap;
export const ICONO_MODALIDAD: Record<Modalidad, LucideIcon> = { camino: Route, escalera: ChevronsUp, racha: Flame, reloj: Timer };

// ---------------------------------------------------------------- lo que ya vio el alumno (en este teléfono)

const CLAVE = "academia:formas-vistas";

function vistas(): Set<string> {
  try {
    const x = JSON.parse(localStorage.getItem(CLAVE) || "[]");
    return new Set(Array.isArray(x) ? x.map(String) : []);
  } catch {
    return new Set();
  }
}

/** Las formas que el alumno ya conoce: la primera vez de cada una se explica sola. */
export function useFormasVistas() {
  const [conocidas, setConocidas] = useState<Set<string>>(vistas);
  const conocer = (clave: string) => {
    const s = new Set(vistas());
    s.add(clave);
    try {
      localStorage.setItem(CLAVE, JSON.stringify([...s]));
    } catch {
      /* (sin almacenamiento: se vuelve a explicar la próxima vez) */
    }
    setConocidas(s);
  };
  return { conocida: (clave: string) => conocidas.has(clave), conocer };
}

// ---------------------------------------------------------------- la ventana

export function AsiSeJuega({ vista, primera, alCerrar }: { vista: ItemVista; primera: boolean; alCerrar: () => void }) {
  const quieto = useReducedMotion();
  const forma = FORMAS[claveForma(vista)];
  const Icono = forma?.icono ?? Zap;
  return (
    <motion.div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center bg-black/45" initial={quieto ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={quieto ? undefined : { opacity: 0 }} onClick={alCerrar}>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`Así se juega: ${nombreForma(vista)}`}
        initial={quieto ? false : { y: "100%" }}
        animate={{ y: 0 }}
        exit={quieto ? undefined : { y: "100%" }}
        transition={{ type: "spring", stiffness: 320, damping: 32 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl bg-background border border-border px-5 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-2xl"
        data-testid="asi-se-juega"
      >
        <div className="flex items-center gap-3">
          <span className="w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 text-white flex items-center justify-center shadow-lg shadow-orange-500/25">
            <Icono className="w-7 h-7" />
          </span>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wide text-amber-700 dark:text-amber-300">{primera ? "Nueva forma de jugar" : "Así se juega"}</p>
            <p className="text-2xl font-black leading-tight">{nombreForma(vista)}</p>
          </div>
        </div>
        <ol className="mt-4 space-y-2.5">
          {(forma?.pasos ?? []).map((p, k) => (
            <motion.li key={k} initial={quieto ? false : { opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: quieto ? 0 : 0.12 + k * 0.12 }} className="flex items-start gap-3">
              <span className="w-7 h-7 shrink-0 rounded-full bg-amber-500 text-white text-sm font-black flex items-center justify-center">{k + 1}</span>
              <span className="text-[16px] leading-snug pt-0.5">{p}</span>
            </motion.li>
          ))}
        </ol>
        <button type="button" onClick={alCerrar} autoFocus className="mt-5 w-full h-12 rounded-2xl font-black text-[17px] text-white bg-gradient-to-r from-amber-500 to-orange-600" data-testid="entendido">
          {primera ? "¡Entendido, a jugar!" : "Entendido"}
        </button>
      </motion.div>
    </motion.div>
  );
}

/** La tarjeta de la modalidad del intento (en la portada). */
export function TarjetaModalidad({ modalidad }: { modalidad: Modalidad }) {
  const Icono = ICONO_MODALIDAD[modalidad];
  const m = NOMBRE_MODALIDAD[modalidad];
  return (
    <div className="mt-5 mx-auto max-w-sm rounded-2xl border-2 border-amber-400/60 bg-amber-50/70 dark:bg-amber-950/30 px-4 py-3 text-left flex items-start gap-3" data-testid="modalidad">
      <span className="w-10 h-10 shrink-0 rounded-xl bg-amber-500 text-white flex items-center justify-center">
        <Icono className="w-5 h-5" />
      </span>
      <div>
        <p className="text-[11px] font-bold uppercase tracking-wide text-amber-800 dark:text-amber-200">Modalidad de esta vez</p>
        <p className="font-black leading-tight">{m.nombre}</p>
        <p className="text-sm text-muted-foreground leading-snug mt-0.5">{m.regla}</p>
      </div>
    </div>
  );
}
