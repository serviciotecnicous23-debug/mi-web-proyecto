/**
 * Los sonidos de «¿Quién es sabio?», todos sintetizados aquí (originales): el pulso de suspenso que sube con
 * las gradas, el golpe de la última palabra, la fanfarria de la respuesta buena (como de shofar), el tono de
 * la mala, el tic del reloj, la campana de la grada segura y la gran fanfarria del que sube las quince.
 */
const CLAVE = "jer-sabio-sonido";

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let apagado = (() => {
  try {
    return localStorage.getItem(CLAVE) === "0";
  } catch {
    return false;
  }
})();

function audio(): AudioContext | null {
  if (apagado) return null;
  if (!ctx) {
    const C = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!C) return null;
    ctx = new C();
    master = ctx.createGain();
    master.gain.value = 0.55;
    master.connect(ctx.destination);
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function nota(freq: number, inicio: number, dur: number, tipo: OscillatorType = "sine", vol = 0.3) {
  const c = audio();
  if (!c || !master) return;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = tipo;
  o.frequency.value = freq;
  const t = c.currentTime + inicio;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g);
  g.connect(master);
  o.start(t);
  o.stop(t + dur + 0.05);
}

/** Como un cuerno: diente de sierra suavizado que sube un poco al empezar. */
function cuerno(freq: number, inicio: number, dur: number, vol = 0.2) {
  const c = audio();
  if (!c || !master) return;
  const o = c.createOscillator();
  o.type = "sawtooth";
  const f = c.createBiquadFilter();
  f.type = "lowpass";
  f.frequency.value = 1400;
  f.Q.value = 1.5;
  const g = c.createGain();
  const t = c.currentTime + inicio;
  o.frequency.setValueAtTime(freq * 0.94, t);
  o.frequency.exponentialRampToValueAtTime(freq, t + 0.12);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + 0.05);
  g.gain.setValueAtTime(vol, t + dur * 0.7);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(f);
  f.connect(g);
  g.connect(master);
  o.start(t);
  o.stop(t + dur + 0.05);
}

export const sonido = {
  activo: () => !apagado,
  alternar(): boolean {
    apagado = !apagado;
    try {
      localStorage.setItem(CLAVE, apagado ? "0" : "1");
    } catch {
      /* sin almacenamiento */
    }
    if (apagado && ctx) void ctx.suspend();
    return !apagado;
  },
  /** El tema corto de la casa de la sabiduría. */
  entrada() {
    [392, 523.25, 659.25, 783.99].forEach((f, i) => cuerno(f, i * 0.16, 0.6, 0.14));
    nota(196, 0, 1.4, "triangle", 0.12);
  },
  /** El suspenso mientras se piensa: un pulso grave que sube y se apura con las gradas. Devuelve cómo pararlo. */
  suspenso(grada: number): () => void {
    const c = audio();
    if (!c || !master) return () => undefined;
    const base = 55 * Math.pow(2, ((grada - 1) * 0.7) / 12);
    const a = c.createOscillator();
    const b = c.createOscillator();
    a.type = "triangle";
    b.type = "sine";
    a.frequency.value = base;
    b.frequency.value = base * 1.5;
    const g = c.createGain();
    const lfo = c.createOscillator();
    const lfoG = c.createGain();
    lfo.frequency.value = 0.9 + grada * 0.09;
    lfoG.gain.value = 0.035;
    lfo.connect(lfoG);
    lfoG.connect(g.gain);
    a.connect(g);
    b.connect(g);
    g.connect(master);
    const t = c.currentTime;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.06, t + 1.5);
    a.start();
    b.start();
    lfo.start();
    let parado = false;
    return () => {
      if (parado) return;
      parado = true;
      const t2 = c.currentTime;
      g.gain.cancelScheduledValues(t2);
      g.gain.setValueAtTime(Math.max(0.0001, g.gain.value), t2);
      g.gain.exponentialRampToValueAtTime(0.0001, t2 + 0.35);
      for (const o of [a, b, lfo]) o.stop(t2 + 0.4);
    };
  },
  /** La última palabra: un golpe grave. */
  fijar() {
    nota(110, 0, 0.55, "triangle", 0.4);
    nota(55, 0, 0.8, "sine", 0.35);
  },
  bien() {
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => cuerno(f, i * 0.1, 0.45 + i * 0.06, 0.16));
  },
  mal() {
    [311.13, 293.66, 246.94].forEach((f, i) => nota(f, i * 0.22, 0.5, "triangle", 0.26));
  },
  tic(urgente = false) {
    nota(urgente ? 1320 : 990, 0, 0.05, "square", urgente ? 0.07 : 0.045);
  },
  segura() {
    [784, 987.77, 1174.66, 1567.98].forEach((f, i) => nota(f, i * 0.09, 1.3, "sine", 0.15));
  },
  comodin() {
    const c = audio();
    if (!c || !master) return;
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = "sine";
    const t = c.currentTime;
    o.frequency.setValueAtTime(300, t);
    o.frequency.exponentialRampToValueAtTime(1200, t + 0.35);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.12, t + 0.05);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);
    o.connect(g);
    g.connect(master);
    o.start(t);
    o.stop(t + 0.45);
  },
  ganar() {
    const melodia = [523.25, 659.25, 783.99, 1046.5, 783.99, 1046.5, 1318.5];
    melodia.forEach((f, i) => cuerno(f, i * 0.16, 0.5, 0.15));
    [261.63, 329.63, 392, 523.25].forEach((f) => nota(f, 1.1, 2.4, "triangle", 0.09));
  },
  /** El timbre de la llamada de un amigo o vecino: dos tonos que se repiten. */
  llamada() {
    for (let k = 0; k < 3; k++) {
      nota(880, k * 0.55, 0.16, "sine", 0.13);
      nota(1174.66, k * 0.55 + 0.18, 0.16, "sine", 0.13);
    }
  },
  /** El reto de un duelo: dos toques de cuerno. */
  reto() {
    cuerno(392, 0, 0.35, 0.16);
    cuerno(523.25, 0.3, 0.35, 0.16);
    cuerno(659.25, 0.6, 0.7, 0.16);
  },
  /** Un aplauso del público: unas palmadas cortas. */
  aplauso() {
    [0, 0.08, 0.15, 0.24].forEach((t) => nota(1800 + Math.random() * 900, t, 0.035, "square", 0.025));
  },
};
