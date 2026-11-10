/**
 * Sonido de "El aprendiz del templo", hecho en el momento (sin descargar archivos).
 *
 * Reglas del diseño, como en los juegos clásicos que enganchan:
 *  - Todo suena en re (la misma escala de la música): nada desentona, todo "encaja".
 *  - Escaleras que suben: al cargar, al juntar gozo y al pagar una obra, cada nota es más
 *    alta que la anterior; el oído quiere seguir subiendo.
 *  - Un motivo propio del templo (seis notas) que vuelve en cada logro: se queda en la memoria.
 *  - Cada sonido tiene capas (golpe + cuerpo + cola) y pequeñas variaciones para no cansar.
 *  - Sonidos del propio relato: arpas y címbalos de David, trompetas de plata (Números 10:10),
 *    el shofar, las campanillas del manto (Éxodo 28:35), el corderito, las palomas, el fuego
 *    del altar, el agua del mar de bronce y el velo que se rasga de arriba abajo (Mateo 27:51).
 *  - Cuando suena un logro, la música baja un momento para que se escuche bien.
 */
import type { Speaker } from "./data";

// re dórico / pentatónico: re fa sol la do
const SCALE = [146.83, 174.61, 196.0, 220.0, 261.63, 293.66, 349.23, 392.0, 440.0, 523.25, 587.33, 698.46, 783.99, 880.0, 1046.5];
const BASS = [73.42, 65.41, 98.0, 73.42]; // re, do, sol, re
/** El motivo del templo (índices de SCALE). */
const MOTIF = [3, 5, 6, 8, 7, 10];
const SPEAKER_NOTE: Record<Speaker, number> = { azarias: 0, ezequias: 2, conanias: 3, narrador: 5, isaias: 1, eliaquim: 4, eleazar: 0 };

export type Ambience = { crowd: number; fire: number; water: number; night: boolean; day: number };

export class TempleAudio {
  private ctx: AudioContext | null = null;
  private master!: GainNode;
  private music!: GainNode;
  private musicDuck!: GainNode;
  private sfx!: GainNode;
  private amb!: GainNode;
  private verb!: ConvolverNode;
  private harp: AudioBuffer[] = [];
  private noise!: AudioBuffer;
  private brown!: AudioBuffer;
  private loops: { crowd: GainNode; fire: GainNode; water: GainNode; wind: GainNode } | null = null;
  private drone: OscillatorNode[] = [];
  private nextNote = 0;
  private step = 0;
  private lastPitch = 5;
  private motifAt = -1;
  private last = new Map<string, number>();
  private ambNext = { bird: 0, crackle: 0, owl: 0, bleat: 0 };
  muted = false;
  musicOn = true;
  /** La radio del ministerio está sonando: la música del juego se aparta. */
  radioOn = false;
  layers = { cantores: 0, night: false, event: false };
  private ambState: Ambience = { crowd: 0, fire: 0, water: 0, night: false, day: 1 };

  constructor(muted: boolean, musicOn: boolean) {
    this.muted = muted;
    this.musicOn = musicOn;
  }

  /** Se crea al primer toque (los navegadores no dejan sonar antes). */
  ensure() {
    if (this.ctx) {
      if (this.ctx.state === "suspended") void this.ctx.resume();
      return;
    }
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    let ctx: AudioContext;
    try {
      ctx = new AC({ latencyHint: "interactive" });
    } catch {
      return;
    }
    this.ctx = ctx;
    this.master = ctx.createGain();
    this.master.gain.value = this.muted ? 0 : 0.9;
    // un compresor suave: todo se oye parejo y nada lastima los oídos
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -16;
    comp.knee.value = 12;
    comp.ratio.value = 3.5;
    comp.attack.value = 0.004;
    comp.release.value = 0.25;
    this.master.connect(comp).connect(ctx.destination);
    this.music = ctx.createGain();
    this.music.gain.value = this.musicOn && !this.radioOn ? 0.5 : 0;
    this.musicDuck = ctx.createGain();
    this.musicDuck.gain.value = 1;
    this.sfx = ctx.createGain();
    this.sfx.gain.value = 0.85;
    this.amb = ctx.createGain();
    this.amb.gain.value = 0.8;
    // eco de piedra del atrio
    this.verb = ctx.createConvolver();
    this.verb.buffer = this.impulse(2.6);
    const verbGain = ctx.createGain();
    verbGain.gain.value = 0.28;
    this.music.connect(this.musicDuck).connect(this.master);
    this.sfx.connect(this.master);
    this.amb.connect(this.master);
    this.musicDuck.connect(this.verb);
    this.sfx.connect(this.verb);
    this.verb.connect(verbGain).connect(this.master);
    this.noise = this.makeNoise(2, false);
    this.brown = this.makeNoise(3, true);
    this.harp = SCALE.map((f) => this.pluck(f, f < 200 ? 3 : 2.2));
    this.startDrone();
    this.startLoops();
    this.nextNote = ctx.currentTime + 0.4;
    this.motif(0.3, 0.12);
  }

  private impulse(sec: number) {
    const ctx = this.ctx!;
    const len = Math.floor(ctx.sampleRate * sec);
    const buf = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3.4) * (i < 600 ? i / 600 : 1);
    }
    return buf;
  }

  private makeNoise(sec: number, brown: boolean) {
    const ctx = this.ctx!;
    const buf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * sec), ctx.sampleRate);
    const d = buf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < d.length; i++) {
      const w = Math.random() * 2 - 1;
      if (brown) {
        last = (last + 0.02 * w) / 1.02;
        d[i] = last * 3.5;
      } else d[i] = w;
    }
    return buf;
  }

  /** Cuerda pulsada (Karplus-Strong): suena como un arpa de verdad. */
  private pluck(freq: number, sec: number) {
    const ctx = this.ctx!;
    const sr = ctx.sampleRate;
    const len = Math.floor(sr * sec);
    const buf = ctx.createBuffer(1, len, sr);
    const d = buf.getChannelData(0);
    const n = Math.max(2, Math.round(sr / freq));
    const ring = new Float32Array(n);
    for (let i = 0; i < n; i++) ring[i] = (Math.random() * 2 - 1) * 0.9 + Math.sin((i / n) * Math.PI * 2) * 0.3;
    let p = 0;
    const decay = freq < 200 ? 0.9975 : 0.996;
    for (let i = 0; i < len; i++) {
      const a = ring[p];
      const b = ring[(p + 1) % n];
      ring[p] = (a + b) * 0.5 * decay;
      d[i] = a * (i < 30 ? i / 30 : 1);
      p = (p + 1) % n;
    }
    return buf;
  }

  private startDrone() {
    const ctx = this.ctx!;
    const gain = ctx.createGain();
    gain.gain.value = 0;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 360;
    filter.Q.value = 0.8;
    this.drone = [73.42, 110.0, 146.83].map((f, i) => {
      const o = ctx.createOscillator();
      o.type = i === 2 ? "triangle" : "sawtooth";
      o.frequency.value = f;
      o.detune.value = (i - 1) * 5;
      o.connect(filter);
      o.start();
      return o;
    });
    const lfo = ctx.createOscillator();
    const lfoG = ctx.createGain();
    lfo.frequency.value = 0.06;
    lfoG.gain.value = 110;
    lfo.connect(lfoG).connect(filter.frequency);
    lfo.start();
    this.drone.push(lfo);
    filter.connect(gain).connect(this.music);
    gain.gain.setTargetAtTime(0.055, ctx.currentTime, 3);
  }

  /** Sonidos de fondo continuos: viento, murmullo del pueblo, fuego del altar y agua. */
  private startLoops() {
    const ctx = this.ctx!;
    const loop = (buf: AudioBuffer, type: BiquadFilterType, freq: number, q: number) => {
      const src = ctx.createBufferSource();
      src.buffer = buf;
      src.loop = true;
      const f = ctx.createBiquadFilter();
      f.type = type;
      f.frequency.value = freq;
      f.Q.value = q;
      const g = ctx.createGain();
      g.gain.value = 0;
      src.connect(f).connect(g).connect(this.amb);
      src.start(0, Math.random() * buf.duration);
      return { g, f };
    };
    const wind = loop(this.brown, "lowpass", 420, 0.5);
    const crowd = loop(this.noise, "bandpass", 520, 1.4);
    const fire = loop(this.brown, "lowpass", 220, 0.7);
    const water = loop(this.noise, "lowpass", 900, 0.6);
    // el murmullo sube y baja como voces
    const lfo = ctx.createOscillator();
    const lg = ctx.createGain();
    lfo.frequency.value = 0.35;
    lg.gain.value = 140;
    lfo.connect(lg).connect(crowd.f.frequency);
    lfo.start();
    const wlfo = ctx.createOscillator();
    const wg = ctx.createGain();
    wlfo.frequency.value = 0.18;
    wg.gain.value = 260;
    wlfo.connect(wg).connect(water.f.frequency);
    wlfo.start();
    this.drone.push(lfo, wlfo);
    wind.g.gain.value = 0.035;
    this.loops = { crowd: crowd.g, fire: fire.g, water: water.g, wind: wind.g };
  }

  setMuted(m: boolean) {
    this.muted = m;
    if (this.ctx) this.master.gain.setTargetAtTime(m ? 0 : 0.9, this.ctx.currentTime, 0.05);
  }

  setMusic(on: boolean) {
    this.musicOn = on;
    this.applyMusic();
  }

  /** Con la radio abierta, la música del juego calla y el ambiente baja; los efectos siguen. */
  setRadio(on: boolean) {
    if (this.radioOn === on) return;
    this.radioOn = on;
    this.applyMusic();
  }

  private applyMusic() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    this.music.gain.setTargetAtTime(this.musicOn && !this.radioOn ? 0.5 : 0, t, 0.4);
    this.amb.gain.setTargetAtTime(this.radioOn ? 0.45 : 0.8, t, 0.4);
  }

  suspend() {
    if (this.ctx && this.ctx.state === "running") void this.ctx.suspend();
  }

  resume() {
    if (this.ctx && this.ctx.state === "suspended") void this.ctx.resume();
  }

  /** Baja la música un momento para que se luzca un logro. */
  private duck(amount = 0.35, sec = 1.6) {
    const ctx = this.ctx;
    if (!ctx) return;
    const g = this.musicDuck.gain;
    g.cancelScheduledValues(ctx.currentTime);
    g.setTargetAtTime(amount, ctx.currentTime, 0.04);
    g.setTargetAtTime(1, ctx.currentTime + sec, 0.5);
  }

  /** Evita que un mismo sonido se amontone. */
  private gate(key: string, minGap: number) {
    const now = this.ctx?.currentTime ?? 0;
    if (now - (this.last.get(key) ?? -9) < minGap) return false;
    this.last.set(key, now);
    return true;
  }

  private get on() {
    return !!this.ctx && !this.muted;
  }

  // ---------------------------------------------------------------- ambiente
  /** Lo llama el mundo en cada cuadro: cuánta gente hay, qué tan cerca está el fuego y el agua. */
  ambience(a: Ambience) {
    this.ambState = a;
    const ctx = this.ctx;
    if (!ctx || !this.loops) return;
    const t = ctx.currentTime;
    this.loops.crowd.gain.setTargetAtTime(Math.min(0.05, a.crowd * 0.0016), t, 0.6);
    this.loops.fire.gain.setTargetAtTime(a.fire * 0.12, t, 0.3);
    this.loops.water.gain.setTargetAtTime(a.water * 0.05, t, 0.4);
    this.loops.wind.gain.setTargetAtTime(a.night ? 0.05 : 0.03, t, 1);
    if (this.muted) return;
    // chasquidos del fuego cerca del altar
    if (a.fire > 0.05 && t > this.ambNext.crackle) {
      this.ambNext.crackle = t + 0.04 + Math.random() * (0.35 / (0.3 + a.fire));
      this.crackle(a.fire);
    }
    // de día, palomas del templo; de noche, un búho de vez en cuando
    if (t > this.ambNext.bird) {
      this.ambNext.bird = t + 7 + Math.random() * 9;
      if (!a.night) {
        if (Math.random() < 0.6) this.coo(0.35);
        else this.chirp();
      }
    }
    if (a.night && t > this.ambNext.owl) {
      this.ambNext.owl = t + 18 + Math.random() * 20;
      this.owl();
    }
  }

  /** Corderitos en la fila que balan de vez en cuando. */
  ambientBleat(n: number) {
    const ctx = this.ctx;
    if (!ctx || n <= 0 || this.muted) return;
    if (ctx.currentTime > this.ambNext.bleat) {
      this.ambNext.bleat = ctx.currentTime + 6 + Math.random() * 10 / Math.min(3, n);
      this.bleat(0.45);
    }
  }

  private crackle(k: number) {
    const ctx = this.ctx!;
    const t = ctx.currentTime;
    const n = ctx.createBufferSource();
    n.buffer = this.noise;
    const f = ctx.createBiquadFilter();
    f.type = "bandpass";
    f.frequency.value = 1500 + Math.random() * 3500;
    f.Q.value = 2;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.05 + 0.1 * k * Math.random(), t + 0.003);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.03 + Math.random() * 0.04);
    n.connect(f).connect(g).connect(this.amb);
    n.start(t, Math.random() * 1.5);
    n.stop(t + 0.1);
  }

  // ---------------------------------------------------------------- música
  /** Programa las notas que vienen (se llama en cada cuadro). */
  update() {
    const ctx = this.ctx;
    if (!ctx || !this.musicOn || this.muted || this.radioOn) return;
    const bpm = this.layers.event ? 76 : 66;
    const beat = 60 / bpm / 2;
    while (this.nextNote < ctx.currentTime + 0.25) {
      this.playStep(this.nextNote, this.step);
      this.nextNote += beat * (this.step % 2 === 0 ? 1.05 : 0.95);
      this.step++;
    }
  }

  private playStep(t: number, step: number) {
    const bar = Math.floor(step / 8);
    const pos = step % 8;
    const chord = BASS[Math.floor(bar / 2) % BASS.length];
    const { cantores, night, event } = this.layers;
    if (pos === 0) this.harpNote(t, 0, chord / 146.83, 0.22);
    // cada 16 compases, el motivo del templo en el arpa
    if (pos === 0 && bar % 16 === 8 && !night) this.motifAt = step;
    if (this.motifAt >= 0) {
      const k = step - this.motifAt;
      if (k < MOTIF.length * 2 && k % 2 === 0) this.harpNote(t, MOTIF[k / 2], 1, 0.2, undefined, true);
      if (k >= MOTIF.length * 2) this.motifAt = -1;
    } else {
      const density = night ? 0.26 : event ? 0.6 : 0.42;
      if (Math.random() < density || pos === 0) {
        this.lastPitch = Math.max(2, Math.min(11, this.lastPitch + Math.round((Math.random() - 0.5) * 3.2)));
        this.harpNote(t, this.lastPitch, 1, night ? 0.12 : 0.16);
      }
    }
    if (cantores >= 1 && (pos === 2 || pos === 6)) this.harpNote(t, Math.min(12, 5 + ((bar + pos) % 5)), 1, 0.09);
    if ((cantores >= 1 || event) && (pos === 0 || pos === 4)) this.drum(t, pos === 0 ? 0.3 : 0.18);
    if ((cantores >= 1 || event) && pos === 6) this.drum(t, 0.1, true);
    if (event && (pos === 3 || pos === 7)) this.jingle(t, 0.035);
    if (cantores >= 2 && pos === 0 && bar % 2 === 0) this.cymbal(t, 0.045, this.music);
    if (cantores >= 3 && pos === 0 && bar % 2 === 0) this.choir(t, chord * 4, 3.6, 0.028, this.music);
    if (night && Math.random() < 0.09) this.cricket(t + Math.random() * 0.3);
  }

  private harpNote(t: number, idx: number, rate: number, vol: number, dest?: AudioNode, bright = false) {
    const ctx = this.ctx!;
    const src = ctx.createBufferSource();
    src.buffer = this.harp[Math.max(0, Math.min(this.harp.length - 1, idx))];
    src.playbackRate.value = rate;
    const g = ctx.createGain();
    g.gain.value = vol;
    if (bright) {
      const f = ctx.createBiquadFilter();
      f.type = "peaking";
      f.frequency.value = 2400;
      f.gain.value = 5;
      src.connect(f).connect(g);
    } else src.connect(g);
    g.connect(dest || this.music);
    src.start(t);
    src.stop(t + 3);
  }

  private drum(t: number, vol: number, rim = false, dest?: AudioNode) {
    const ctx = this.ctx!;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.frequency.setValueAtTime(rim ? 230 : 115, t);
    o.frequency.exponentialRampToValueAtTime(rim ? 160 : 52, t + 0.2);
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.38);
    o.connect(g).connect(dest || this.music);
    o.start(t);
    o.stop(t + 0.42);
    const n = ctx.createBufferSource();
    n.buffer = this.noise;
    const f = ctx.createBiquadFilter();
    f.type = "bandpass";
    f.frequency.value = rim ? 2400 : 900;
    const ng = ctx.createGain();
    ng.gain.setValueAtTime(vol * 0.55, t);
    ng.gain.exponentialRampToValueAtTime(0.001, t + 0.07);
    n.connect(f).connect(ng).connect(dest || this.music);
    n.start(t, Math.random());
    n.stop(t + 0.09);
  }

  private jingle(t: number, vol: number) {
    // pandero con sonajas
    const ctx = this.ctx!;
    for (let k = 0; k < 3; k++) {
      const n = ctx.createBufferSource();
      n.buffer = this.noise;
      const f = ctx.createBiquadFilter();
      f.type = "highpass";
      f.frequency.value = 7000;
      const g = ctx.createGain();
      const s = t + k * 0.018;
      g.gain.setValueAtTime(vol, s);
      g.gain.exponentialRampToValueAtTime(0.0001, s + 0.12);
      n.connect(f).connect(g).connect(this.music);
      n.start(s, Math.random());
      n.stop(s + 0.14);
    }
  }

  private cymbal(t: number, vol: number, dest: AudioNode) {
    const ctx = this.ctx!;
    const n = ctx.createBufferSource();
    n.buffer = this.noise;
    const f = ctx.createBiquadFilter();
    f.type = "highpass";
    f.frequency.value = 5500;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 2.2);
    n.connect(f).connect(g).connect(dest);
    n.start(t, Math.random());
    n.stop(t + 2.3);
  }

  /** Coro de voces ("ah") con dos formantes. */
  private choir(t: number, freq: number, dur: number, vol: number, dest: AudioNode) {
    const ctx = this.ctx!;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + Math.min(0.8, dur * 0.3));
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    const f1 = ctx.createBiquadFilter();
    f1.type = "bandpass";
    f1.frequency.value = 760;
    f1.Q.value = 4;
    const f2 = ctx.createBiquadFilter();
    f2.type = "bandpass";
    f2.frequency.value = 1180;
    f2.Q.value = 5;
    for (const [mul, det] of [[1, -7], [1.5, 5], [2, 0], [1.25, 3]]) {
      const o = ctx.createOscillator();
      o.type = "sawtooth";
      o.frequency.value = freq * mul * 0.5;
      o.detune.value = det;
      const vib = ctx.createOscillator();
      const vg = ctx.createGain();
      vib.frequency.value = 4.6 + Math.random();
      vg.gain.value = 3;
      vib.connect(vg).connect(o.detune);
      o.connect(f1);
      o.connect(f2);
      o.start(t);
      vib.start(t);
      o.stop(t + dur + 0.1);
      vib.stop(t + dur + 0.1);
    }
    f1.connect(g);
    f2.connect(g);
    g.connect(dest);
  }

  private cricket(t: number) {
    const ctx = this.ctx!;
    for (let k = 0; k < 3; k++) {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.frequency.value = 4200 + Math.random() * 300;
      const s = t + k * 0.06;
      g.gain.setValueAtTime(0.0001, s);
      g.gain.exponentialRampToValueAtTime(0.01, s + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, s + 0.04);
      o.connect(g).connect(this.amb);
      o.start(s);
      o.stop(s + 0.05);
    }
  }

  /** El motivo del templo, en arpa (y con más fuerza en los logros grandes). */
  private motif(when = 0, vol = 0.22, dest?: AudioNode, gap = 0.13) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime + when;
    MOTIF.forEach((n, k) => this.harpNote(t + k * gap, n, 1, vol * (k === MOTIF.length - 1 ? 1.3 : 1), dest || this.sfx, true));
  }

  // ---------------------------------------------------------------- piezas de sonido
  private tone(freq: number, dur: number, vol: number, type: OscillatorType = "sine", when = 0, slideTo?: number, dest?: AudioNode) {
    const ctx = this.ctx;
    if (!ctx || this.muted) return;
    const t = ctx.currentTime + when;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(dest || this.sfx);
    o.start(t);
    o.stop(t + dur + 0.05);
  }

  private noiseHit(dur: number, vol: number, type: BiquadFilterType, from: number, to: number, when = 0, q = 1, dest?: AudioNode, buf?: AudioBuffer) {
    const ctx = this.ctx;
    if (!ctx || this.muted) return;
    const t = ctx.currentTime + when;
    const n = ctx.createBufferSource();
    n.buffer = buf || this.noise;
    const f = ctx.createBiquadFilter();
    f.type = type;
    f.Q.value = q;
    f.frequency.setValueAtTime(from, t);
    f.frequency.exponentialRampToValueAtTime(Math.max(20, to), t + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + Math.min(0.03, dur / 4));
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    n.connect(f).connect(g).connect(dest || this.sfx);
    n.start(t, Math.random() * 1.2);
    n.stop(t + dur + 0.05);
  }

  /** Campanita de oro (parciales de campana). */
  private bell(freq: number, vol: number, when = 0, dur = 0.9) {
    [1, 2.0, 2.76, 4.07, 5.4].forEach((m, k) => this.tone(freq * m, dur / (1 + k * 0.7), vol / (1 + k * 1.3), "sine", when));
  }

  // ---------------------------------------------------------------- efectos del juego
  /** Al levantar algo: una nota de arpa que sube con la pila, más el sonido del material. */
  pickup(i: number, material?: "lena" | "aceite" | "pan" | "incienso" | "diezmo" | "ofrenda") {
    if (!this.on) return;
    const idx = 3 + (i % 10);
    this.harpNote(this.ctx!.currentTime, idx, 1 + (Math.random() - 0.5) * 0.004, 0.17, this.sfx, true);
    switch (material) {
      case "lena":
        this.tone(210 + Math.random() * 30, 0.09, 0.12, "triangle", 0, 150);
        this.noiseHit(0.05, 0.06, "bandpass", 1400, 900, 0, 3);
        break;
      case "aceite":
        this.tone(920 + Math.random() * 60, 0.12, 0.05, "triangle");
        this.tone(1650, 0.08, 0.025, "sine", 0.01);
        break;
      case "pan":
        this.noiseHit(0.06, 0.07, "lowpass", 500, 200);
        break;
      case "incienso":
        this.tone(2093, 0.25, 0.03, "sine");
        this.tone(2637, 0.3, 0.02, "sine", 0.03);
        break;
      case "diezmo":
        this.sack();
        break;
      default:
        break;
    }
  }

  /** Lo que se entrega en su lugar (golpe suave). */
  drop() {
    if (!this.on) return;
    this.tone(170, 0.14, 0.15, "sine", 0, 95);
    this.noiseHit(0.08, 0.05, "lowpass", 900, 300);
  }

  sack() {
    this.tone(95, 0.18, 0.16, "sine", 0, 60);
    this.noiseHit(0.22, 0.05, "bandpass", 2600, 1400, 0.02, 1.5);
  }

  /** Gozo recogido: campanitas de oro que suben mientras sigues juntando. */
  coin(streak: number) {
    if (!this.on || !this.gate("coin", 0.035)) return;
    const f = SCALE[Math.min(SCALE.length - 1, 6 + (streak % 9))] * 2;
    this.bell(f, 0.07, 0, 0.7);
    this.noiseHit(0.05, 0.015, "highpass", 8000, 9000);
  }

  /** Pagar una obra: la escalera sube con lo pagado. */
  payTick(progress: number) {
    if (!this.on || !this.gate("pay", 0.06)) return;
    const idx = 3 + Math.min(11, Math.floor(progress * 11));
    this.harpNote(this.ctx!.currentTime, idx, 1, 0.13, this.sfx, true);
    this.tone(SCALE[idx] * 4, 0.12, 0.012, "sine");
  }

  /** Presentar una ofrenda: llamarada, chasquidos y la alegría del pueblo. */
  offering(kind?: string) {
    if (!this.on) return;
    this.noiseHit(0.75, 0.22, "lowpass", 220, 2600, 0, 1, undefined, this.brown);
    this.noiseHit(0.5, 0.08, "bandpass", 600, 3000, 0.05, 1.2);
    this.tone(78, 0.5, 0.18, "sine", 0, 48);
    for (let k = 0; k < 6; k++) this.noiseHit(0.03, 0.06, "bandpass", 2000 + Math.random() * 3000, 1500, 0.08 + Math.random() * 0.5, 3);
    if (this.gate("joy", 0.5)) this.choir(this.ctx!.currentTime + 0.18, kind === "cordero" ? 220 : 293.66, 1.1, 0.022, this.sfx);
  }

  /** Se enciende el fuego (o se aviva cuando estaba apagado). */
  ignite() {
    if (!this.on) return;
    this.noiseHit(1.1, 0.26, "lowpass", 150, 3200, 0, 0.8, undefined, this.brown);
    this.tone(60, 0.9, 0.2, "sine", 0, 90);
    this.harpNote(this.ctx!.currentTime + 0.1, 5, 1, 0.16, this.sfx, true);
    this.harpNote(this.ctx!.currentTime + 0.22, 8, 1, 0.16, this.sfx, true);
  }

  /** Se apagó el fuego: siseo y nota de aviso. */
  fireOut() {
    if (!this.on) return;
    this.noiseHit(1.2, 0.12, "highpass", 3000, 6000);
    this.tone(220, 0.5, 0.09, "triangle", 0.1, 196);
    this.tone(174.61, 0.7, 0.09, "triangle", 0.45, 164.81);
  }

  /** Agua del mar de bronce: chapoteo, gotas y una nota limpia. */
  water() {
    if (!this.on) return;
    this.noiseHit(0.55, 0.16, "lowpass", 2600, 500);
    for (let k = 0; k < 5; k++) this.tone(500 + Math.random() * 500, 0.08, 0.05, "sine", k * 0.06 + Math.random() * 0.05, 1000);
    this.bell(SCALE[10] * 2, 0.04, 0.25, 1.2);
  }

  /** Lámpara encendida o aceite en el candelero. */
  lamp() {
    if (!this.on || !this.gate("lamp", 0.08)) return;
    this.bell(SCALE[9 + Math.floor(Math.random() * 4)] * 2, 0.035, 0, 0.8);
    this.noiseHit(0.2, 0.03, "bandpass", 1200, 3000, 0, 2);
  }

  /** Obra restaurada: el motivo del templo, un gong y un coro. */
  build() {
    if (!this.on) return;
    this.duck(0.3, 2.2);
    this.motif(0, 0.24);
    [1, 1.48, 2.02, 2.76].forEach((m, k) => this.tone(73.42 * m, 2.6 - k * 0.4, 0.12 / (1 + k), "sine"));
    this.choir(this.ctx!.currentTime + 0.5, 293.66, 2.6, 0.03, this.sfx);
    this.cymbal(this.ctx!.currentTime + 0.78, 0.05, this.sfx);
    this.noiseHit(0.6, 0.06, "lowpass", 500, 150, 0, 1, undefined, this.brown);
  }

  /** Llega un levita: arpegio y tamborcito. */
  hire() {
    if (!this.on) return;
    this.duck(0.5, 1.2);
    const t = this.ctx!.currentTime;
    [5, 7, 8, 10].forEach((n, k) => this.harpNote(t + k * 0.08, n, 1, 0.18, this.sfx, true));
    this.drum(t + 0.32, 0.25, false, this.sfx);
  }

  correct() {
    if (!this.on) return;
    this.bell(587.33, 0.08, 0, 0.8);
    this.bell(880, 0.08, 0.12, 1.0);
    this.harpNote(this.ctx!.currentTime + 0.24, 10, 1, 0.14, this.sfx, true);
  }

  wrong() {
    if (!this.on) return;
    this.tone(196, 0.25, 0.08, "triangle", 0, 185);
    this.tone(164.81, 0.45, 0.08, "triangle", 0.18, 155);
  }

  click() {
    if (!this.on) return;
    this.tone(1400 + Math.random() * 100, 0.035, 0.035, "triangle");
    this.noiseHit(0.02, 0.02, "bandpass", 3000, 2500, 0, 4);
  }

  /** Hoja que pasa (libro y lecciones). */
  page() {
    if (!this.on || !this.gate("page", 0.15)) return;
    this.noiseHit(0.28, 0.06, "bandpass", 1800, 5200, 0, 0.9);
    this.noiseHit(0.18, 0.03, "highpass", 4000, 7000, 0.08);
  }

  /** Letras del diálogo: una notita suave con la voz de cada personaje. */
  blip(who: Speaker) {
    if (!this.on || !this.gate("blip", 0.055)) return;
    const idx = SPEAKER_NOTE[who] + Math.floor(Math.random() * 3);
    this.harpNote(this.ctx!.currentTime, idx + 3, 1, 0.045, this.sfx);
  }

  /** Paso suave sobre la piedra. */
  footstep(alt: boolean) {
    if (!this.on || !this.gate("step", 0.12)) return;
    this.noiseHit(0.045, 0.018, "bandpass", alt ? 900 : 760, 500, 0, 1.6);
  }

  /** Trompetas de plata (Números 10:2, 10). */
  trumpet(long = false) {
    const ctx = this.ctx;
    if (!ctx || this.muted) return;
    this.duck(0.4, long ? 3 : 2);
    const notes = long ? [[293.66, 0.5], [440, 0.5], [587.33, 1.5]] : [[440, 0.35], [587.33, 1.0]];
    let t = ctx.currentTime;
    for (const [f, d] of notes) {
      for (const [mul, vol] of [[1, 0.065], [1.5, 0.03], [1.003, 0.05]]) {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        const flt = ctx.createBiquadFilter();
        flt.type = "lowpass";
        flt.frequency.setValueAtTime(900, t);
        flt.frequency.linearRampToValueAtTime(2600, t + 0.08);
        o.type = "sawtooth";
        o.frequency.setValueAtTime(f * mul * 0.97, t);
        o.frequency.linearRampToValueAtTime(f * mul, t + 0.07);
        const vib = ctx.createOscillator();
        const vg = ctx.createGain();
        vib.frequency.value = 5.4;
        vg.gain.value = 3.5;
        vib.connect(vg).connect(o.frequency);
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(vol, t + 0.05);
        g.gain.setValueAtTime(vol, t + d - 0.08);
        g.gain.exponentialRampToValueAtTime(0.0001, t + d);
        o.connect(flt).connect(g).connect(this.sfx);
        o.start(t);
        vib.start(t);
        o.stop(t + d + 0.05);
        vib.stop(t + d + 0.05);
      }
      this.noiseHit(0.08, 0.02, "bandpass", 1500, 1200, t - ctx.currentTime, 2);
      t += d * 0.92;
    }
  }

  /** Shofar: el cuerno de carnero, con su subida y su aliento. */
  private shofar(when = 0) {
    const ctx = this.ctx!;
    const t = ctx.currentTime + when;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    const flt = ctx.createBiquadFilter();
    flt.type = "lowpass";
    flt.frequency.value = 1600;
    flt.Q.value = 2;
    o.type = "sawtooth";
    o.frequency.setValueAtTime(196, t);
    o.frequency.exponentialRampToValueAtTime(293.66, t + 0.35);
    o.frequency.setValueAtTime(293.66, t + 1.2);
    o.frequency.exponentialRampToValueAtTime(311, t + 1.5);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.09, t + 0.12);
    g.gain.setValueAtTime(0.09, t + 1.3);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 1.7);
    o.connect(flt).connect(g).connect(this.sfx);
    o.start(t);
    o.stop(t + 1.75);
    this.noiseHit(1.6, 0.03, "bandpass", 1200, 1500, when, 1.5);
  }

  /** Subir de rango: shofar, motivo del templo, redoble, coro y címbalo. */
  rank() {
    if (!this.on) return;
    this.duck(0.2, 4.5);
    this.shofar(0);
    const t = this.ctx!.currentTime;
    for (let k = 0; k < 10; k++) this.drum(t + 1.4 + k * 0.06, 0.06 + k * 0.012, false, this.sfx);
    this.motif(2.0, 0.26, undefined, 0.15);
    this.choir(t + 2.0, 293.66, 3.6, 0.04, this.sfx);
    this.cymbal(t + 2.0, 0.08, this.sfx);
  }

  /** La hora del incienso: el pueblo ora (Lucas 1:10). */
  pray() {
    if (!this.on) return;
    this.choir(this.ctx!.currentTime, 220, 3.4, 0.03, this.sfx);
    this.bell(SCALE[8] * 2, 0.04, 0.3, 1.6);
  }

  /** Llega el rey Ezequías: fanfarria con tambores. */
  king() {
    if (!this.on) return;
    this.trumpet(true);
    const t = this.ctx!.currentTime;
    for (let k = 0; k < 6; k++) this.drum(t + k * 0.22, 0.22, k % 2 === 1, this.sfx);
  }

  /** Jornada cumplida: una campana por estrella, subiendo, y el motivo del templo. */
  jornada(stars: number) {
    if (!this.on) return;
    this.duck(0.3, 2.6);
    for (let k = 0; k < stars; k++) this.bell(SCALE[8 + k * 2] * 2, 0.09, 0.15 + k * 0.32, 1.1);
    this.motif(0.25 + stars * 0.32, 0.22, undefined, 0.11);
    this.cymbal(this.ctx!.currentTime + 0.25 + stars * 0.32, 0.045, this.sfx);
  }

  /** Logro: el tintineo de una copa (más rico si es de oro). */
  logro(nivel: number) {
    if (!this.on) return;
    this.duck(0.45, 1.6);
    const base = [523.25, 659.25, 783.99][Math.max(0, Math.min(2, nivel - 1))];
    this.bell(base, 0.08, 0, 1.2);
    this.bell(base * 1.5, 0.06, 0.12, 1.2);
    if (nivel >= 3) {
      this.bell(base * 2, 0.06, 0.24, 1.6);
      this.choir(this.ctx!.currentTime + 0.2, 293.66, 2.2, 0.025, this.sfx);
    }
  }

  /** Corderito (bee). */
  bleat(vol = 1) {
    if (!this.on || !this.gate("bleat", 0.6)) return;
    const ctx = this.ctx!;
    const t = ctx.currentTime;
    const o = ctx.createOscillator();
    o.type = "sawtooth";
    const f0 = 360 + Math.random() * 60;
    o.frequency.setValueAtTime(f0, t);
    o.frequency.linearRampToValueAtTime(f0 * 0.9, t + 0.45);
    const vib = ctx.createOscillator();
    const vg = ctx.createGain();
    vib.frequency.value = 7.5;
    vg.gain.value = 22;
    vib.connect(vg).connect(o.frequency);
    const f1 = ctx.createBiquadFilter();
    f1.type = "bandpass";
    f1.frequency.value = 850;
    f1.Q.value = 3;
    const f2 = ctx.createBiquadFilter();
    f2.type = "bandpass";
    f2.frequency.value = 1700;
    f2.Q.value = 4;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.09 * vol, t + 0.04);
    g.gain.setValueAtTime(0.08 * vol, t + 0.35);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.55);
    o.connect(f1).connect(g);
    o.connect(f2).connect(g);
    g.connect(this.sfx);
    o.start(t);
    vib.start(t);
    o.stop(t + 0.6);
    vib.stop(t + 0.6);
  }

  /** Paloma (cu-cuuu). */
  coo(vol = 1) {
    if (!this.on || !this.gate("coo", 0.5)) return;
    const ctx = this.ctx!;
    const t0 = ctx.currentTime;
    [[0, 0.16, 380, 430], [0.22, 0.42, 400, 470]].forEach(([d, len, a, b]) => {
      const t = t0 + d;
      const o = ctx.createOscillator();
      o.type = "sine";
      o.frequency.setValueAtTime(a, t);
      o.frequency.linearRampToValueAtTime(b, t + len * 0.4);
      o.frequency.linearRampToValueAtTime(a * 0.95, t + len);
      const am = ctx.createOscillator();
      const ag = ctx.createGain();
      am.frequency.value = 26;
      ag.gain.value = 0.3;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.06 * vol, t + 0.05);
      g.gain.exponentialRampToValueAtTime(0.0001, t + len);
      am.connect(ag).connect(g.gain);
      o.connect(g).connect(this.sfx);
      o.start(t);
      am.start(t);
      o.stop(t + len + 0.05);
      am.stop(t + len + 0.05);
    });
  }

  /** Flor de harina (ofrenda de cereal): un "shhh" suave. */
  flour() {
    if (!this.on) return;
    this.noiseHit(0.3, 0.04, "highpass", 3000, 6000, 0, 0.7);
  }

  private chirp() {
    for (let k = 0; k < 3; k++) this.tone(3200 + Math.random() * 800, 0.06, 0.012, "sine", k * 0.09, 4200, this.amb);
  }

  private owl() {
    this.tone(360, 0.35, 0.03, "sine", 0, 330, this.amb);
    this.tone(350, 0.6, 0.03, "sine", 0.5, 320, this.amb);
  }

  /** Campanillas de oro del manto (al caminar como sumo sacerdote). */
  bells() {
    if (!this.on || !this.gate("robe", 0.1)) return;
    this.tone(2349 + Math.random() * 200, 0.14, 0.02, "sine");
    this.tone(5600 + Math.random() * 300, 0.07, 0.009, "sine");
  }

  /** El velo se rasga de arriba abajo y la tierra tiembla (Mateo 27:51); después, el coro. */
  veilTear() {
    if (!this.on) return;
    const ctx = this.ctx!;
    this.duck(0.15, 6);
    const t = ctx.currentTime;
    // desgarro: ruido con "dientes" que baja de agudo a grave
    const n = ctx.createBufferSource();
    n.buffer = this.noise;
    const f = ctx.createBiquadFilter();
    f.type = "bandpass";
    f.Q.value = 1.2;
    f.frequency.setValueAtTime(6000, t);
    f.frequency.exponentialRampToValueAtTime(250, t + 1.3);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.28, t + 0.05);
    g.gain.setValueAtTime(0.25, t + 1.1);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 1.5);
    const am = ctx.createOscillator();
    const ag = ctx.createGain();
    am.type = "square";
    am.frequency.value = 38;
    ag.gain.value = 0.12;
    am.connect(ag).connect(g.gain);
    n.connect(f).connect(g).connect(this.sfx);
    n.start(t);
    am.start(t);
    n.stop(t + 1.6);
    am.stop(t + 1.6);
    // temblor
    this.noiseHit(3.2, 0.3, "lowpass", 120, 40, 0.4, 0.8, undefined, this.brown);
    this.tone(38, 3, 0.25, "sine", 0.4, 30);
    // la gloria: coro en re mayor que crece
    for (const fr of [146.83, 185, 220, 293.66]) this.choir(t + 1.8, fr * 2, 5.5, 0.022, this.sfx);
    this.cymbal(t + 1.8, 0.06, this.sfx);
    this.motif(2.6, 0.22, undefined, 0.2);
  }

  dispose() {
    const ctx = this.ctx;
    this.ctx = null;
    if (!ctx) return;
    try {
      this.drone.forEach((o) => o.stop());
    } catch {
      /* ya detenidos */
    }
    void ctx.close();
  }
}
