// Los sonidos del motor de prácticas: tonos cortos hechos con el navegador (sin archivos que descargar) y una
// vibración suave en el teléfono. Se apagan con un toque y la elección se recuerda en este equipo.
const CLAVE = "practicas:sonido";
let ctx: AudioContext | null = null;

export function sonidoActivo(): boolean {
  try {
    return localStorage.getItem(CLAVE) !== "no";
  } catch {
    return true;
  }
}

export function cambiarSonido(activo: boolean) {
  try {
    localStorage.setItem(CLAVE, activo ? "si" : "no");
  } catch {
    // sin almacenamiento: queda como estaba
  }
}

function contexto(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const C = window.AudioContext || (window as any).webkitAudioContext;
  if (!C) return null;
  if (!ctx) ctx = new C();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function tono(frecuencia: number, desde: number, dura: number, tipo: OscillatorType = "sine", volumen = 0.08) {
  const c = contexto();
  if (!c) return;
  const t = c.currentTime + desde;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = tipo;
  o.frequency.setValueAtTime(frecuencia, t);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(volumen, t + 0.015);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dura);
  o.connect(g).connect(c.destination);
  o.start(t);
  o.stop(t + dura + 0.02);
}

function vibrar(patron: number | number[]) {
  try {
    navigator.vibrate?.(patron);
  } catch {
    // no todos los teléfonos vibran
  }
}

/** Respuesta correcta: dos notas que suben. */
export function sonarBien() {
  if (!sonidoActivo()) return;
  tono(660, 0, 0.12);
  tono(990, 0.09, 0.18);
  vibrar(18);
}

/** A medias: una nota suave. */
export function sonarMedio() {
  if (!sonidoActivo()) return;
  tono(560, 0, 0.16, "triangle", 0.07);
  vibrar(14);
}

/** Respuesta equivocada: una nota grave y corta (sin castigo, solo aviso). */
export function sonarMal() {
  if (!sonidoActivo()) return;
  tono(200, 0, 0.18, "triangle", 0.09);
  vibrar([22, 40, 22]);
}

/** El final de una práctica: un pequeño acorde. */
export function sonarFinal(estrellas: number) {
  if (!sonidoActivo()) return;
  const notas = [523, 659, 784, 1047].slice(0, Math.max(2, estrellas + 1));
  notas.forEach((f, i) => tono(f, i * 0.11, 0.32, "sine", 0.07));
  vibrar([16, 60, 16, 60, 30]);
}
