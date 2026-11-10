/**
 * Motor común: cómo quiere moverse cada jugador. Se elige en la pausa y se recuerda en el teléfono.
 *
 * - «Joystick donde toques» (el de siempre): se apoya el dedo en cualquier lugar y se arrastra.
 * - «Joystick fijo»: siempre en la esquina de abajo, como en un control de consola.
 * - «Botones de flechas»: cuatro flechas y un botón para correr, como teclas.
 * - «Solo tocar para ir»: sin joystick; se toca el lugar y el aprendiz va solo.
 * Además: controles a la derecha (para zurdos), botones grandes y tocar el piso para ir.
 * El teclado (W A S D, Mayús) y los mandos (Bluetooth o USB) funcionan siempre.
 */

export type Esquema = "flotante" | "fijo" | "cruceta" | "tocar";

export type Controles = {
  esquema: Esquema;
  /** Joystick o flechas a la derecha (para zurdos). */
  zurdo: boolean;
  /** Joystick y flechas más grandes. */
  grande: boolean;
  /** Un toque corto en el piso lleva al aprendiz hasta ahí (en «Solo tocar para ir» siempre). */
  tocarParaIr: boolean;
};

export const ESQUEMAS: { id: Esquema; nombre: string; texto: string }[] = [
  { id: "flotante", nombre: "Joystick donde toques", texto: "Apoya el dedo en cualquier lugar y arrastra; más lejos, corres." },
  { id: "fijo", nombre: "Joystick fijo", texto: "Siempre en la esquina de abajo, como en un control." },
  { id: "cruceta", nombre: "Botones de flechas", texto: "Cuatro flechas y un botón para correr, como teclas." },
  { id: "tocar", nombre: "Solo tocar para ir", texto: "Toca el lugar y el aprendiz va solo. El más sencillo." },
];

const CLAVE = "templo-controles";
const BASE: Controles = { esquema: "flotante", zurdo: false, grande: false, tocarParaIr: true };

export function leerControles(): Controles {
  try {
    const v = JSON.parse(localStorage.getItem(CLAVE) || "null") as Partial<Controles> | null;
    if (!v || typeof v !== "object") return { ...BASE };
    return {
      esquema: ESQUEMAS.some((e) => e.id === v.esquema) ? (v.esquema as Esquema) : BASE.esquema,
      zurdo: v.zurdo === true,
      grande: v.grande === true,
      tocarParaIr: v.tocarParaIr !== false,
    };
  } catch {
    return { ...BASE };
  }
}

const oyentes = new Set<(c: Controles) => void>();

export function guardarControles(c: Controles) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(c));
  } catch {
    /* modo privado: vale mientras dure la partida */
  }
  for (const fn of oyentes) fn(c);
}

/** Avisa cuando el jugador cambia sus controles (el mundo abierto los aplica en el momento). */
export function alCambiarControles(fn: (c: Controles) => void): () => void {
  oyentes.add(fn);
  return () => {
    oyentes.delete(fn);
  };
}

/** ¿Hay un mando conectado? (para mostrarlo en la pausa). */
export function mandoConectado(): string | null {
  try {
    const p = [...(navigator.getGamepads?.() ?? [])].find((g) => g && g.connected);
    return p ? p.id.replace(/\s*\(.*\)\s*$/, "").slice(0, 40) || "Mando" : null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------- orientación (pantalla completa)
export type Orientacion = "auto" | "horizontal" | "vertical";

type ConBloqueo = ScreenOrientation & { lock?: (o: string) => Promise<void>; unlock?: () => void };

/** ¿El navegador deja girar la pantalla desde el juego? (Android en pantalla completa; el iPhone no). */
export function puedeGirar(): boolean {
  try {
    return typeof (screen.orientation as ConBloqueo | undefined)?.lock === "function";
  } catch {
    return false;
  }
}

/** Gira la pantalla (solo en pantalla completa). Devuelve si se pudo. */
export async function girarPantalla(o: Orientacion): Promise<boolean> {
  const so = screen.orientation as ConBloqueo | undefined;
  try {
    if (o === "auto") {
      so?.unlock?.();
      return true;
    }
    if (!so?.lock) return false;
    await so.lock(o === "horizontal" ? "landscape" : "portrait");
    return true;
  } catch {
    return false;
  }
}

/** La orientación actual de la pantalla. */
export function orientacionActual(): "horizontal" | "vertical" {
  return typeof window !== "undefined" && window.innerWidth > window.innerHeight ? "horizontal" : "vertical";
}
