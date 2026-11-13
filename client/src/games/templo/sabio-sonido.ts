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

/** Un ruido blanco de unos segundos, guardado (para el público). */
let ruido: AudioBuffer | null = null;
function ruidoBlanco(c: AudioContext): AudioBuffer {
  if (ruido && ruido.sampleRate === c.sampleRate) return ruido;
  const n = c.sampleRate * 2;
  ruido = c.createBuffer(1, n, c.sampleRate);
  const d = ruido.getChannelData(0);
  for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
  return ruido;
}

/** Muchas palmas a la vez: golpes cortos de ruido filtrado, cada uno en su momento. */
function palmas(dur: number, densidad: number, vol: number) {
  const c = audio();
  if (!c || !master) return;
  const buf = ruidoBlanco(c);
  const t0 = c.currentTime;
  const n = Math.round(dur * densidad);
  for (let i = 0; i < n; i++) {
    const t = t0 + Math.random() * dur;
    const s = c.createBufferSource();
    s.buffer = buf;
    const f = c.createBiquadFilter();
    f.type = "bandpass";
    f.frequency.value = 900 + Math.random() * 1800;
    f.Q.value = 0.9;
    const g = c.createGain();
    // las palmas bajan al final (el aplauso se apaga)
    const caida = 1 - Math.max(0, (t - t0) / dur - 0.6) * 2.2;
    g.gain.setValueAtTime(vol * Math.max(0.15, caida) * (0.6 + Math.random() * 0.4), t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
    s.connect(f);
    f.connect(g);
    g.connect(master);
    s.start(t, Math.random() * 1.5, 0.06);
  }
}

export const sonido = {
  activo: () => !apagado,
  /** El murmullo de la sala llena (sigue hasta que se llama a lo que devuelve). */
  murmullo(): () => void {
    const c = audio();
    if (!c || !master) return () => undefined;
    const s = c.createBufferSource();
    s.buffer = ruidoBlanco(c);
    s.loop = true;
    const f = c.createBiquadFilter();
    f.type = "bandpass";
    f.frequency.value = 420;
    f.Q.value = 0.7;
    const g = c.createGain();
    g.gain.value = 0.0001;
    g.gain.exponentialRampToValueAtTime(0.035, c.currentTime + 1.5);
    // sube y baja despacio, como la gente que conversa
    const lfo = c.createOscillator();
    lfo.frequency.value = 0.23;
    const lg = c.createGain();
    lg.gain.value = 0.012;
    lfo.connect(lg);
    lg.connect(g.gain);
    s.connect(f);
    f.connect(g);
    g.connect(master);
    s.start();
    lfo.start();
    return () => {
      const t = c.currentTime;
      g.gain.cancelScheduledValues(t);
      g.gain.setValueAtTime(Math.max(0.0001, g.gain.value), t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);
      s.stop(t + 0.7);
      lfo.stop(t + 0.7);
    };
  },
  /** La ovación del público: un aplauso largo y fuerte. */
  ovacion(seg = 2.6, fuerza = 1) {
    palmas(seg, 70 * fuerza, 0.05);
  },
  /** El «¡oh!» del público cuando se falla: voces que bajan. */
  oh() {
    const c = audio();
    if (!c || !master) return;
    const t = c.currentTime;
    for (let k = 0; k < 7; k++) {
      const o = c.createOscillator();
      o.type = "sawtooth";
      const f0 = 170 + Math.random() * 140;
      o.frequency.setValueAtTime(f0 * 1.12, t);
      o.frequency.exponentialRampToValueAtTime(f0 * 0.82, t + 1.1);
      const f = c.createBiquadFilter();
      f.type = "lowpass";
      f.frequency.value = 650;
      const g = c.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.018, t + 0.12);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 1.2);
      o.connect(f);
      f.connect(g);
      g.connect(master);
      o.start(t + Math.random() * 0.08);
      o.stop(t + 1.3);
    }
  },
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
  /**
   * El redoble de la última palabra: golpes de tambor cada vez más seguidos y más fuertes durante `ms`, y un golpe
   * grave al final (justo cuando se revela). Devuelve cómo pararlo.
   */
  redoble(ms: number): () => void {
    const c = audio();
    if (!c || !master) return () => undefined;
    const buf = ruidoBlanco(c);
    const t0 = c.currentTime;
    const dur = Math.max(0.6, ms / 1000);
    const fuentes: AudioScheduledSourceNode[] = [];
    let t = 0;
    let k = 0;
    while (t < dur - 0.02 && k < 400) {
      const avance = t / dur;
      const s = c.createBufferSource();
      s.buffer = buf;
      const f = c.createBiquadFilter();
      f.type = "bandpass";
      f.frequency.value = 1700 + Math.random() * 500;
      f.Q.value = 0.8;
      const g = c.createGain();
      const tt = t0 + t;
      const vol = (0.05 + 0.13 * avance) * (k % 2 ? 0.78 : 1);
      g.gain.setValueAtTime(vol, tt);
      g.gain.exponentialRampToValueAtTime(0.0001, tt + 0.06);
      s.connect(f);
      f.connect(g);
      g.connect(master);
      s.start(tt, Math.random() * 1.5, 0.07);
      fuentes.push(s);
      // el cuero del tambor (un tono grave muy corto)
      const o = c.createOscillator();
      o.type = "triangle";
      o.frequency.setValueAtTime(190 + 40 * avance, tt);
      o.frequency.exponentialRampToValueAtTime(120, tt + 0.05);
      const go = c.createGain();
      go.gain.setValueAtTime(0.035 + 0.05 * avance, tt);
      go.gain.exponentialRampToValueAtTime(0.0001, tt + 0.06);
      o.connect(go);
      go.connect(master);
      o.start(tt);
      o.stop(tt + 0.07);
      fuentes.push(o);
      // cada vez más seguido: de 9 golpes por segundo a 24
      t += 1 / (9 + 15 * avance);
      k++;
    }
    let parado = false;
    return () => {
      if (parado) return;
      parado = true;
      const ahora = c.currentTime;
      for (const s of fuentes)
        try {
          s.stop(ahora + 0.01);
        } catch {
          /* ya sonó */
        }
    };
  },
  /** El golpe de platillo y bombo con que termina el redoble. */
  golpe() {
    nota(70, 0, 0.7, "sine", 0.4);
    nota(140, 0, 0.35, "triangle", 0.2);
    palmas(0.35, 60, 0.05);
  },
  /** El latido de la duda con Etán: dos golpes graves, como un corazón (sigue hasta que se llama a lo que devuelve). */
  latido(): () => void {
    const c = audio();
    if (!c || !master) return () => undefined;
    let vivo = true;
    const golpe = (dt: number, fuerte: boolean) => {
      const t = c.currentTime + dt;
      const o = c.createOscillator();
      o.type = "sine";
      o.frequency.setValueAtTime(fuerte ? 62 : 54, t);
      o.frequency.exponentialRampToValueAtTime(38, t + 0.16);
      const g = c.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(fuerte ? 0.55 : 0.38, t + 0.015);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.2);
      o.connect(g);
      g.connect(master!);
      o.start(t);
      o.stop(t + 0.25);
    };
    const latir = () => {
      if (!vivo) return;
      golpe(0, true);
      golpe(0.22, false);
    };
    latir();
    const id = setInterval(latir, 830);
    return () => {
      vivo = false;
      clearInterval(id);
    };
  },
  /** Las chispas doradas de la respuesta buena: campanitas que suben. */
  destellos() {
    [1567.98, 1975.53, 2349.32, 2637.02, 3135.96].forEach((f, i) => nota(f, 0.12 + i * 0.07, 0.5, "sine", 0.05));
  },
  /** El apagón de la respuesta mala: un golpe grave y la luz que se va (un zumbido que baja). */
  apagon() {
    const c = audio();
    if (!c || !master) return;
    const t = c.currentTime;
    nota(55, 0, 1.2, "sine", 0.45);
    const o = c.createOscillator();
    o.type = "sawtooth";
    o.frequency.setValueAtTime(240, t + 0.05);
    o.frequency.exponentialRampToValueAtTime(40, t + 0.9);
    const f = c.createBiquadFilter();
    f.type = "lowpass";
    f.frequency.value = 500;
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.06, t + 0.08);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.95);
    o.connect(f);
    f.connect(g);
    g.connect(master);
    o.start(t);
    o.stop(t + 1);
  },
};

/** Para probar en el navegador (solo en desarrollo): cuántas veces sonó cada cosa. */
export const sonidosOidos: Record<string, number> = {};
if (import.meta.env?.DEV) {
  const todos = sonido as unknown as Record<string, (...a: unknown[]) => unknown>;
  for (const k of Object.keys(todos)) {
    const f = todos[k];
    if (typeof f !== "function" || k === "activo" || k === "alternar") continue;
    todos[k] = (...a: unknown[]) => {
      sonidosOidos[k] = (sonidosOidos[k] ?? 0) + 1;
      return f(...a);
    };
  }
  (window as unknown as { __sonidosSabio?: Record<string, number> }).__sonidosSabio = sonidosOidos;
}
