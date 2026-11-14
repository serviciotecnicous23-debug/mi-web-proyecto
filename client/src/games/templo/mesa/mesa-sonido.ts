/**
 * Los sonidos de los juegos de mesa del patio, sintetizados aquí (originales, sin archivos): el dado que rueda, la
 * ficha que salta, la escalera que sube y la serpiente que baja, la carta que vuela, el frijolito, la canica de vidrio,
 * el redoble del cantor, la campana del «¡Basta!», el tic del reloj y la fiesta al ganar. No es música: la banda
 * sonora del patio la pone `jer-musica`.
 */
const CLAVE = "jer-mesa-sonido";

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let apagado = (() => {
  try {
    return localStorage.getItem(CLAVE) === "0";
  } catch {
    return false;
  }
})();
const oyentes = new Set<() => void>();

export function sonidoMesaApagado() {
  return apagado;
}
export function ponerSonidoMesa(si: boolean) {
  apagado = !si;
  try {
    localStorage.setItem(CLAVE, si ? "1" : "0");
  } catch {
    /* sin almacenamiento */
  }
  for (const f of oyentes) f();
}
export function oirSonidoMesa(f: () => void) {
  oyentes.add(f);
  return () => {
    oyentes.delete(f);
  };
}

function audio(): AudioContext | null {
  if (apagado || typeof window === "undefined") return null;
  if (!ctx) {
    const C = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!C) return null;
    ctx = new C();
    master = ctx.createGain();
    master.gain.value = 0.5;
    master.connect(ctx.destination);
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function nota(freq: number, inicio: number, dur: number, tipo: OscillatorType = "sine", vol = 0.25, hasta?: number) {
  const c = audio();
  if (!c || !master) return;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = tipo;
  const t = c.currentTime + inicio;
  o.frequency.setValueAtTime(freq, t);
  if (hasta) o.frequency.exponentialRampToValueAtTime(hasta, t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g);
  g.connect(master);
  o.start(t);
  o.stop(t + dur + 0.05);
}

/** Un golpe de ruido filtrado (madera, dado, papel). */
function golpe(inicio: number, dur: number, frec: number, vol = 0.3, q = 1.2) {
  const c = audio();
  if (!c || !master) return;
  const n = Math.max(1, Math.floor(c.sampleRate * dur));
  const b = c.createBuffer(1, n, c.sampleRate);
  const d = b.getChannelData(0);
  for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n) ** 2;
  const s = c.createBufferSource();
  s.buffer = b;
  const f = c.createBiquadFilter();
  f.type = "bandpass";
  f.frequency.value = frec;
  f.Q.value = q;
  const g = c.createGain();
  g.gain.value = vol;
  s.connect(f);
  f.connect(g);
  g.connect(master);
  s.start(c.currentTime + inicio);
}

const azar = (a: number, b: number) => a + Math.random() * (b - a);

export const mesaSonido = {
  /** Los dados que ruedan en el cubilete y caen en la mesa. */
  dados(n = 5) {
    for (let i = 0; i < 9; i++) golpe(i * 0.045 + azar(0, 0.02), 0.04, azar(1800, 3200), 0.18);
    for (let i = 0; i < n; i++) golpe(0.45 + i * 0.07 + azar(0, 0.04), 0.07, azar(900, 1500), 0.32, 2);
  },
  /** Un dado grande que rueda (las escaleras). */
  dado() {
    for (let i = 0; i < 6; i++) golpe(i * 0.07, 0.05, azar(700, 1300), 0.28, 2);
    golpe(0.5, 0.09, 600, 0.4, 3);
  },
  /** La ficha que salta una casilla. */
  salto(k = 0) {
    nota(520 + k * 18, 0, 0.09, "triangle", 0.12, 760 + k * 18);
    golpe(0.08, 0.03, 1400, 0.12, 3);
  },
  /** Sube por la escalera: un arpegio que sube. */
  sube() {
    [523, 659, 784, 1047, 1319].forEach((f, i) => nota(f, i * 0.09, 0.28, "triangle", 0.14));
  },
  /** Baja por la serpiente: un deslizamiento hacia abajo. */
  baja() {
    nota(880, 0, 0.9, "sawtooth", 0.06, 160);
    nota(660, 0.05, 0.85, "sine", 0.1, 130);
  },
  /** Una carta que vuela o se da vuelta. */
  carta() {
    golpe(0, 0.12, 3800, 0.16, 0.7);
  },
  /** El frijolito que cae en la tabla. */
  frijol() {
    golpe(0, 0.05, 1100, 0.3, 4);
    nota(300, 0.01, 0.08, "sine", 0.1, 180);
  },
  /** La canica de vidrio (damas chinas). */
  canica(k = 0) {
    nota(2400 + k * 60, 0, 0.12, "sine", 0.12);
    nota(3600 + k * 80, 0.004, 0.08, "sine", 0.06);
  },
  /** El redoble del cantor antes de cada carta. */
  redoble() {
    for (let i = 0; i < 10; i++) golpe(i * 0.035, 0.03, 260 + i * 6, 0.16 + i * 0.012, 1.6);
  },
  /** Un acierto (pareja, buena casilla). */
  bien() {
    nota(784, 0, 0.16, "triangle", 0.16);
    nota(1175, 0.1, 0.26, "triangle", 0.16);
  },
  /** Un error suave. */
  mal() {
    nota(330, 0, 0.18, "square", 0.06, 250);
    nota(247, 0.12, 0.26, "square", 0.05, 200);
  },
  /** La campana del «¡Basta!» (o de «¡Lotería!»). */
  campana() {
    [880, 1320, 1760].forEach((f, i) => nota(f, 0, 1.4 - i * 0.3, "sine", 0.18 - i * 0.04));
    nota(660, 0.25, 1.2, "sine", 0.12);
  },
  /** El tic del reloj cuando queda poco. */
  tic() {
    golpe(0, 0.02, 2600, 0.12, 6);
  },
  /** Tu turno. */
  turno() {
    nota(659, 0, 0.12, "triangle", 0.14);
    nota(988, 0.09, 0.2, "triangle", 0.14);
  },
  /** Una pieza de madera que se posa en el tablero. */
  pieza() {
    golpe(0, 0.05, 950, 0.34, 3);
    golpe(0.028, 0.035, 1700, 0.12, 4);
  },
  /** Comer: un golpe más hondo y la pieza que se va deslizando. */
  comer() {
    golpe(0, 0.08, 520, 0.42, 2);
    golpe(0.05, 0.05, 1100, 0.18, 3);
    nota(440, 0.03, 0.2, "triangle", 0.07, 250);
  },
  /** ¡Jaque! Dos notas de aviso. */
  jaque() {
    nota(880, 0, 0.16, "square", 0.07);
    nota(698, 0.14, 0.26, "square", 0.07);
  },
  /** La ficha que cae por la columna y rebota en el fondo. */
  cae() {
    golpe(0, 0.03, 2300, 0.14, 4);
    golpe(0.04, 0.06, 1150, 0.34, 3);
    golpe(0.13, 0.035, 1500, 0.12, 4);
  },
  /** Una ficha de dominó que se asienta en la mesa. */
  ficha() {
    golpe(0, 0.035, 1900, 0.32, 5);
    golpe(0.045, 0.03, 2500, 0.14, 6);
  },
  /** La línea ganadora: un brillo que sube. */
  linea() {
    [784, 988, 1175, 1568].forEach((f, i) => nota(f, i * 0.07, 0.32, "triangle", 0.12));
  },
  /** ¡Ganó! Una fanfarria corta con aplausos. */
  fiesta() {
    [523, 659, 784, 1047].forEach((f, i) => nota(f, i * 0.12, 0.5, "triangle", 0.15));
    [1047, 1319, 1568].forEach((f) => nota(f, 0.55, 0.9, "triangle", 0.1));
    for (let i = 0; i < 26; i++) golpe(0.5 + i * 0.05 + azar(0, 0.04), 0.03, azar(900, 2600), 0.08, 1);
  },
};
