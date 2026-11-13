/**
 * Los sonidos del aula, todos sintetizados aquí (originales): la campanilla que llama a clase, la pluma de caña que
 * escribe en el rollo, el rollo que se desenrolla, el murmullo de los compañeros, sus palmas, el «mmm» de quien
 * asiente, el tic del reloj, el redoble con el latido de la última pregunta, la cuerda del arpa cuando se acierta,
 * el tono suave cuando no, y la fanfarria de la medalla.
 */
const CLAVE = "jer-aula-sonido";

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
    try {
      ctx = new C();
    } catch {
      return null;
    }
    master = ctx.createGain();
    master.gain.value = 0.5;
    master.connect(ctx.destination);
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function nota(freq: number, inicio: number, dur: number, tipo: OscillatorType = "sine", vol = 0.25, ataque = 0.01) {
  const c = audio();
  if (!c || !master) return;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = tipo;
  o.frequency.value = freq;
  const t = c.currentTime + inicio;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + ataque);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g);
  g.connect(master);
  o.start(t);
  o.stop(t + dur + 0.05);
}

/** Una cuerda pulsada (como un arpa o un kinor): triángulo que cae rápido con un armónico. */
function cuerda(freq: number, inicio: number, vol = 0.18) {
  nota(freq, inicio, 1.1, "triangle", vol, 0.004);
  nota(freq * 2, inicio, 0.5, "sine", vol * 0.35, 0.004);
}

let ruido: AudioBuffer | null = null;
function ruidoBlanco(c: AudioContext): AudioBuffer {
  if (ruido && ruido.sampleRate === c.sampleRate) return ruido;
  const n = c.sampleRate * 2;
  ruido = c.createBuffer(1, n, c.sampleRate);
  const d = ruido.getChannelData(0);
  for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
  return ruido;
}

/** Un golpe corto de ruido filtrado (palma, roce, tambor). */
function golpeRuido(t: number, frec: number, q: number, vol: number, dur: number, tipo: BiquadFilterType = "bandpass") {
  const c = audio();
  if (!c || !master) return;
  const s = c.createBufferSource();
  s.buffer = ruidoBlanco(c);
  const f = c.createBiquadFilter();
  f.type = tipo;
  f.frequency.value = frec;
  f.Q.value = q;
  const g = c.createGain();
  g.gain.setValueAtTime(vol, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  s.connect(f);
  f.connect(g);
  g.connect(master);
  s.start(t, Math.random() * 1.5, dur + 0.02);
}

function palmas(dur: number, densidad: number, vol: number) {
  const c = audio();
  if (!c) return;
  const t0 = c.currentTime;
  const n = Math.round(dur * densidad);
  for (let i = 0; i < n; i++) {
    const t = t0 + Math.random() * dur;
    const caida = 1 - Math.max(0, (t - t0) / dur - 0.55) * 2;
    golpeRuido(t, 1000 + Math.random() * 1700, 0.9, vol * Math.max(0.15, caida) * (0.6 + Math.random() * 0.4), 0.05);
  }
}

/** Algo que suena mientras dura y se apaga al llamar lo que devuelve. */
type Parar = () => void;
const nada: Parar = () => undefined;

export const sonidoAula = {
  activo: () => !apagado,
  alternar(): boolean {
    apagado = !apagado;
    try {
      localStorage.setItem(CLAVE, apagado ? "0" : "1");
    } catch {
      /* sin almacenamiento */
    }
    if (apagado && ctx) void ctx.suspend();
    if (!apagado) audio();
    return !apagado;
  },
  /** La campanilla que llama a clase: tres toques de bronce. */
  campana() {
    [0, 0.32, 0.64].forEach((t, i) => {
      const f = i === 2 ? 784 : 880;
      nota(f, t, 1.6, "sine", 0.16, 0.003);
      nota(f * 2.76, t, 0.6, "sine", 0.05, 0.003);
      nota(f * 5.4, t, 0.25, "sine", 0.02, 0.003);
    });
  },
  /** El rollo que se desenrolla: un roce que sube. */
  pagina() {
    const c = audio();
    if (!c || !master) return;
    const s = c.createBufferSource();
    s.buffer = ruidoBlanco(c);
    const f = c.createBiquadFilter();
    f.type = "bandpass";
    f.Q.value = 1.2;
    const t = c.currentTime;
    f.frequency.setValueAtTime(700, t);
    f.frequency.exponentialRampToValueAtTime(2600, t + 0.45);
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.07, t + 0.08);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.55);
    s.connect(f);
    f.connect(g);
    g.connect(master);
    s.start(t, 0.2, 0.6);
  },
  /** La pluma de caña que escribe en el pergamino: roces cortos mientras dura. */
  pluma(segundos: number): Parar {
    const c = audio();
    if (!c) return nada;
    let vivo = true;
    const t0 = c.currentTime;
    let t = t0;
    while (t < t0 + segundos) {
      const trazo = 0.04 + Math.random() * 0.09;
      golpeRuido(t, 3200 + Math.random() * 2400, 2.5, 0.025 + Math.random() * 0.02, trazo, "bandpass");
      t += trazo + (Math.random() < 0.18 ? 0.12 + Math.random() * 0.12 : 0.02);
    }
    return () => {
      if (!vivo) return;
      vivo = false;
    };
  },
  /** El murmullo de los compañeros (sigue hasta que se llama a lo que devuelve). */
  murmullo(fuerza = 1): Parar {
    const c = audio();
    if (!c || !master) return nada;
    const s = c.createBufferSource();
    s.buffer = ruidoBlanco(c);
    s.loop = true;
    const f = c.createBiquadFilter();
    f.type = "bandpass";
    f.frequency.value = 380;
    f.Q.value = 0.8;
    const g = c.createGain();
    g.gain.value = 0.0001;
    g.gain.exponentialRampToValueAtTime(0.018 * fuerza, c.currentTime + 1.2);
    const lfo = c.createOscillator();
    lfo.frequency.value = 0.31;
    const lg = c.createGain();
    lg.gain.value = 0.008 * fuerza;
    lfo.connect(lg);
    lg.connect(g.gain);
    s.connect(f);
    f.connect(g);
    g.connect(master);
    s.start();
    lfo.start();
    let parado = false;
    return () => {
      if (parado) return;
      parado = true;
      const t = c.currentTime;
      g.gain.cancelScheduledValues(t);
      g.gain.setValueAtTime(Math.max(0.0001, g.gain.value), t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
      s.stop(t + 0.6);
      lfo.stop(t + 0.6);
    };
  },
  /** Las palmas de la clase (de unas pocas a toda la clase de pie). */
  aplauso(fuerza = 1) {
    palmas(1.4 + fuerza * 1.2, 26 + fuerza * 34, 0.045);
  },
  /** El «mmm» de los que asienten. */
  asentir() {
    nota(196, 0, 0.5, "sine", 0.05, 0.08);
    nota(247, 0.05, 0.45, "sine", 0.035, 0.08);
  },
  /** El cuchicheo: unos roces suaves. */
  cuchicheo() {
    const c = audio();
    if (!c) return;
    const t0 = c.currentTime;
    for (let i = 0; i < 10; i++) golpeRuido(t0 + Math.random() * 0.9, 2400 + Math.random() * 1800, 3, 0.012, 0.08);
  },
  tic(urgente = false) {
    nota(urgente ? 1250 : 930, 0, 0.045, "square", urgente ? 0.05 : 0.03);
  },
  /** Se elige una respuesta: un toque de madera. */
  elegir() {
    nota(520, 0, 0.12, "triangle", 0.12, 0.003);
    golpeRuido((audio()?.currentTime ?? 0) + 0.001, 900, 1.5, 0.05, 0.05);
  },
  /** La última pregunta: el redoble que crece y el latido de fondo. */
  suspenso(): Parar {
    const c = audio();
    if (!c || !master) return nada;
    let vivo = true;
    let k = 0;
    const latir = () => {
      if (!vivo) return;
      const t = c.currentTime;
      // el latido: dos golpes graves
      nota(58, 0, 0.22, "sine", 0.22, 0.004);
      nota(52, 0.2, 0.25, "sine", 0.16, 0.004);
      // el redoble: golpes de tambor que se apuran
      const n = 6 + Math.min(10, k * 2);
      for (let i = 0; i < n; i++) golpeRuido(t + (i / n) * 0.75, 180 + Math.random() * 60, 0.9, 0.05 + Math.min(0.08, k * 0.012), 0.07, "lowpass");
      k++;
      tiempo = window.setTimeout(latir, Math.max(520, 850 - k * 40));
    };
    let tiempo = window.setTimeout(latir, 0);
    return () => {
      vivo = false;
      window.clearTimeout(tiempo);
    };
  },
  /** El golpe de la revelación. */
  golpe() {
    nota(98, 0, 0.7, "triangle", 0.3, 0.003);
    nota(49, 0, 0.9, "sine", 0.3, 0.003);
  },
  /** ¡Bien!: tres cuerdas que suben. */
  bien() {
    [523.25, 659.25, 783.99].forEach((f, i) => cuerda(f, i * 0.09, 0.16));
    cuerda(1046.5, 0.3, 0.12);
  },
  /** No era: dos notas suaves que bajan (sin castigo). */
  mal() {
    nota(392, 0, 0.45, "triangle", 0.13, 0.01);
    nota(330, 0.22, 0.6, "triangle", 0.12, 0.01);
  },
  /** La medalla de la nota: más alta y más larga cuanto mejor. */
  medalla(metal: 0 | 1 | 2 | 3) {
    if (metal <= 0) {
      nota(294, 0, 0.6, "triangle", 0.1);
      nota(392, 0.2, 0.8, "triangle", 0.1);
      return;
    }
    const escala = [392, 523.25, 659.25, 783.99, 1046.5, 1318.5];
    const n = 2 + metal;
    for (let i = 0; i < n; i++) cuerda(escala[i], i * 0.12, 0.16);
    nota(escala[n - 1], n * 0.12, 1.6, "sine", 0.09, 0.05);
    if (metal === 3) [261.63, 329.63, 392].forEach((f) => nota(f, 0.5, 2.2, "triangle", 0.07, 0.2));
  },
};
