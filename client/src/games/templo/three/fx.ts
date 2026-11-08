/**
 * Partículas: el fuego del altar, el humo, las chispas, el incienso, el agua del mar de bronce,
 * el polvo de las obras y las luces de gozo. Dos capas (luz que suma y humo que tapa), cada una
 * dibujada de una sola vez.
 */
import * as THREE from "three";

const VERT = `
attribute float size;
attribute vec4 rgba;
varying vec4 vC;
uniform float uScale;
void main() {
  vC = rgba;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = clamp(size * uScale / -mv.z, 1.0, 256.0);
  gl_Position = projectionMatrix * mv;
}`;

const FRAG = `
varying vec4 vC;
uniform float uSoft;
void main() {
  vec2 d = gl_PointCoord - 0.5;
  float r = length(d) * 2.0;
  float a = 1.0 - smoothstep(uSoft, 1.0, r);
  if (a <= 0.003) discard;
  gl_FragColor = vec4(vC.rgb, vC.a * a);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`;

type Opt = { gravity?: number; drag?: number; swirl?: number };

class Layer {
  points: THREE.Points;
  private max: number;
  private n = 0;
  // estado de cada partícula
  private px: Float32Array; private py: Float32Array; private pz: Float32Array;
  private vx: Float32Array; private vy: Float32Array; private vz: Float32Array;
  private life: Float32Array; private maxLife: Float32Array;
  private s0: Float32Array; private s1: Float32Array;
  private c0: Float32Array; private c1: Float32Array;
  private a0: Float32Array; private a1: Float32Array;
  private grav: Float32Array; private drag: Float32Array; private swirl: Float32Array;
  private pos: Float32Array; private size: Float32Array; private rgba: Float32Array;
  material: THREE.ShaderMaterial;

  constructor(max: number, additive: boolean) {
    this.max = max;
    const f = () => new Float32Array(max);
    this.px = f(); this.py = f(); this.pz = f();
    this.vx = f(); this.vy = f(); this.vz = f();
    this.life = f(); this.maxLife = f();
    this.s0 = f(); this.s1 = f();
    this.c0 = new Float32Array(max * 3); this.c1 = new Float32Array(max * 3);
    this.a0 = f(); this.a1 = f();
    this.grav = f(); this.drag = f(); this.swirl = f();
    this.pos = new Float32Array(max * 3);
    this.size = f();
    this.rgba = new Float32Array(max * 4);
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(this.pos, 3).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute("size", new THREE.BufferAttribute(this.size, 1).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute("rgba", new THREE.BufferAttribute(this.rgba, 4).setUsage(THREE.DynamicDrawUsage));
    g.setDrawRange(0, 0);
    this.material = new THREE.ShaderMaterial({
      uniforms: { uScale: { value: 400 }, uSoft: { value: additive ? 0.05 : 0.25 } },
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      depthWrite: false,
      blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
    });
    this.points = new THREE.Points(g, this.material);
    this.points.frustumCulled = false;
    this.points.renderOrder = additive ? 3 : 2;
  }

  emit(x: number, y: number, z: number, vx: number, vy: number, vz: number, life: number, s0: number, s1: number, c0: THREE.Color, c1: THREE.Color, a0: number, a1: number, o: Opt = {}) {
    if (this.n >= this.max) return;
    const i = this.n++;
    this.px[i] = x; this.py[i] = y; this.pz[i] = z;
    this.vx[i] = vx; this.vy[i] = vy; this.vz[i] = vz;
    this.life[i] = 0; this.maxLife[i] = life;
    this.s0[i] = s0; this.s1[i] = s1;
    this.c0[i * 3] = c0.r; this.c0[i * 3 + 1] = c0.g; this.c0[i * 3 + 2] = c0.b;
    this.c1[i * 3] = c1.r; this.c1[i * 3 + 1] = c1.g; this.c1[i * 3 + 2] = c1.b;
    this.a0[i] = a0; this.a1[i] = a1;
    this.grav[i] = o.gravity || 0; this.drag[i] = o.drag || 0; this.swirl[i] = o.swirl || 0;
  }

  private kill(i: number) {
    const j = --this.n;
    if (i === j) return;
    this.px[i] = this.px[j]; this.py[i] = this.py[j]; this.pz[i] = this.pz[j];
    this.vx[i] = this.vx[j]; this.vy[i] = this.vy[j]; this.vz[i] = this.vz[j];
    this.life[i] = this.life[j]; this.maxLife[i] = this.maxLife[j];
    this.s0[i] = this.s0[j]; this.s1[i] = this.s1[j];
    for (let k = 0; k < 3; k++) {
      this.c0[i * 3 + k] = this.c0[j * 3 + k];
      this.c1[i * 3 + k] = this.c1[j * 3 + k];
    }
    this.a0[i] = this.a0[j]; this.a1[i] = this.a1[j];
    this.grav[i] = this.grav[j]; this.drag[i] = this.drag[j]; this.swirl[i] = this.swirl[j];
  }

  update(dt: number, time: number) {
    for (let i = 0; i < this.n; i++) {
      this.life[i] += dt;
      if (this.life[i] >= this.maxLife[i]) {
        this.kill(i);
        i--;
        continue;
      }
      const d = 1 - Math.min(1, this.drag[i] * dt);
      this.vx[i] *= d; this.vz[i] *= d; this.vy[i] = this.vy[i] * d - this.grav[i] * dt;
      if (this.swirl[i]) {
        const w = this.swirl[i];
        this.vx[i] += Math.sin(time * 2.3 + this.py[i] * 3) * w * dt;
        this.vz[i] += Math.cos(time * 1.9 + this.py[i] * 2.5) * w * dt;
      }
      this.px[i] += this.vx[i] * dt; this.py[i] += this.vy[i] * dt; this.pz[i] += this.vz[i] * dt;
    }
    for (let i = 0; i < this.n; i++) {
      const t = this.life[i] / this.maxLife[i];
      this.pos[i * 3] = this.px[i]; this.pos[i * 3 + 1] = this.py[i]; this.pos[i * 3 + 2] = this.pz[i];
      this.size[i] = this.s0[i] + (this.s1[i] - this.s0[i]) * t;
      for (let k = 0; k < 3; k++) this.rgba[i * 4 + k] = this.c0[i * 3 + k] + (this.c1[i * 3 + k] - this.c0[i * 3 + k]) * t;
      // aparece suave y se apaga al final
      const fadeIn = Math.min(1, t * 8);
      this.rgba[i * 4 + 3] = (this.a0[i] + (this.a1[i] - this.a0[i]) * t) * fadeIn;
    }
    const g = this.points.geometry;
    g.setDrawRange(0, this.n);
    (g.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    (g.attributes.size as THREE.BufferAttribute).needsUpdate = true;
    (g.attributes.rgba as THREE.BufferAttribute).needsUpdate = true;
  }

  get count() {
    return this.n;
  }
}

const col = (h: string) => new THREE.Color(h);
const FIRE_A = col("#fff1a8"), FIRE_B = col("#ff5a12"), EMBER = col("#ffb347"), EMBER_B = col("#ff3d00");
const SMOKE_A = col("#6b625a"), SMOKE_B = col("#a39b92");
const INC_A = col("#f4eefc"), INC_B = col("#d9cdea");
const GOLD = col("#ffd66b"), GOLD_B = col("#ff9f1c"), WHITE = col("#ffffff");
const WATER = col("#bfe6ff"), WATER_B = col("#6fb8e0");
const DUST = col("#d8c8a4"), DUST_B = col("#bfae8a");
const LAMP = col("#ffe9a8"), LAMP_B = col("#ff8a2a");

const R = Math.random;
const rs = (a: number) => (R() - 0.5) * 2 * a;

export class Fx {
  group = new THREE.Group();
  glow = new Layer(2600, true);
  haze = new Layer(1600, false);
  private time = 0;
  private acc = new Map<string, number>();

  constructor() {
    this.group.add(this.haze.points, this.glow.points);
  }

  setScale(px: number) {
    this.glow.material.uniforms.uScale.value = px;
    this.haze.material.uniforms.uScale.value = px;
  }

  /** Cuántas partículas toca emitir este cuadro (para un ritmo por segundo). */
  private rate(key: string, perSec: number, dt: number) {
    const v = (this.acc.get(key) || 0) + perSec * dt;
    const n = Math.floor(v);
    this.acc.set(key, v - n);
    return n;
  }

  update(dt: number) {
    this.time += dt;
    this.glow.update(dt, this.time);
    this.haze.update(dt, this.time);
  }

  /** Fuego continuo del altar (intensidad 0..1). */
  fire(key: string, p: THREE.Vector3, intensity: number, dt: number, spread = 1.1) {
    if (intensity <= 0) return;
    const n = this.rate(key, 46 * intensity + 6, dt);
    for (let i = 0; i < n; i++) {
      this.glow.emit(p.x + rs(spread), p.y + R() * 0.1, p.z + rs(spread), rs(0.2), 1.1 + R() * 1.2 * intensity, rs(0.2), 0.45 + R() * 0.4, 0.7 + R() * 0.5 * intensity, 0.12, FIRE_A, FIRE_B, 0.85, 0.0, { swirl: 1.2, drag: 0.5 });
    }
    const e = this.rate(key + "e", 9 * intensity, dt);
    for (let i = 0; i < e; i++) this.glow.emit(p.x + rs(spread), p.y + 0.2, p.z + rs(spread), rs(0.6), 1.6 + R() * 1.6, rs(0.6), 1.2 + R(), 0.09, 0.04, EMBER, EMBER_B, 1, 0, { gravity: 0.3, swirl: 2.5 });
    const s = this.rate(key + "s", 7 * intensity + 1, dt);
    for (let i = 0; i < s; i++) this.haze.emit(p.x + rs(spread * 0.6), p.y + 0.8, p.z + rs(spread * 0.6), rs(0.15), 0.9 + R() * 0.5, rs(0.15), 3.2 + R() * 1.5, 0.6, 2.4, SMOKE_A, SMOKE_B, 0.35, 0.0, { swirl: 0.8, drag: 0.2 });
  }

  /** Llamita de una lámpara o antorcha. */
  flame(key: string, p: THREE.Vector3, dt: number, scale = 1) {
    const n = this.rate(key, 16 * scale, dt);
    for (let i = 0; i < n; i++) this.glow.emit(p.x + rs(0.02 * scale), p.y, p.z + rs(0.02 * scale), rs(0.05), 0.4 + R() * 0.3, rs(0.05), 0.35 + R() * 0.2, 0.22 * scale, 0.05, LAMP, LAMP_B, 0.9, 0, { swirl: 0.6 });
  }

  /** Columna de incienso que sube (Salmo 141:2). */
  incense(key: string, p: THREE.Vector3, dt: number, strength = 1) {
    const n = this.rate(key, 9 * strength, dt);
    for (let i = 0; i < n; i++) this.haze.emit(p.x + rs(0.06), p.y, p.z + rs(0.06), rs(0.05), 0.55 + R() * 0.3, rs(0.05), 4 + R() * 2, 0.18, 1.6, INC_A, INC_B, 0.5, 0, { swirl: 0.5, drag: 0.1 });
  }

  /** Estallido de llamas al presentar una ofrenda. */
  burst(p: THREE.Vector3, big = 1) {
    for (let i = 0; i < 26 * big; i++) {
      const a = R() * Math.PI * 2, sp = 0.8 + R() * 1.8;
      this.glow.emit(p.x, p.y, p.z, Math.cos(a) * sp * 0.5, 1.5 + R() * 2.5, Math.sin(a) * sp * 0.5, 0.5 + R() * 0.5, 0.9 * big, 0.2, FIRE_A, FIRE_B, 1, 0, { drag: 1.5, swirl: 1 });
    }
    for (let i = 0; i < 10 * big; i++) this.haze.emit(p.x + rs(0.3), p.y + 0.6, p.z + rs(0.3), rs(0.3), 1.2 + R(), rs(0.3), 2.5 + R(), 0.8, 2.6, SMOKE_A, SMOKE_B, 0.4, 0, { swirl: 0.8, drag: 0.4 });
  }

  /** Destellos dorados (bendición, obra terminada, rango). */
  sparkle(p: THREE.Vector3, count = 24, radius = 0.6, up = 1.4) {
    for (let i = 0; i < count; i++) {
      const a = R() * Math.PI * 2, r = R() * radius;
      this.glow.emit(p.x + Math.cos(a) * r, p.y + R() * 0.4, p.z + Math.sin(a) * r, Math.cos(a) * 0.4, up * (0.5 + R()), Math.sin(a) * 0.4, 0.8 + R() * 0.7, 0.22, 0.02, GOLD, GOLD_B, 1, 0, { drag: 1.2, swirl: 0.8 });
    }
  }

  /** Lluvia de luz desde arriba (consagración). */
  rain(p: THREE.Vector3, dt: number, radius = 0.9) {
    const n = this.rate("rain", 60, dt);
    for (let i = 0; i < n; i++) {
      const a = R() * Math.PI * 2, r = R() * radius;
      this.glow.emit(p.x + Math.cos(a) * r, p.y + 2.6 + R(), p.z + Math.sin(a) * r, 0, -1.4 - R(), 0, 1.6, 0.18, 0.05, WHITE, GOLD, 0.9, 0.2, { swirl: 0.6 });
    }
  }

  splash(p: THREE.Vector3, count = 30) {
    for (let i = 0; i < count; i++) {
      const a = R() * Math.PI * 2, sp = 0.6 + R() * 1.4;
      this.haze.emit(p.x + rs(0.3), p.y, p.z + rs(0.3), Math.cos(a) * sp, 1.6 + R() * 1.6, Math.sin(a) * sp, 0.6 + R() * 0.4, 0.14, 0.05, WATER, WATER_B, 0.9, 0.1, { gravity: 6 });
    }
    for (let i = 0; i < 8; i++) this.glow.emit(p.x + rs(0.4), p.y + 0.3, p.z + rs(0.4), 0, 0.6, 0, 0.6, 0.3, 0.05, WATER, WHITE, 0.5, 0);
  }

  dust(p: THREE.Vector3, radius = 1.6, count = 40) {
    for (let i = 0; i < count; i++) {
      const a = R() * Math.PI * 2, r = R() * radius;
      this.haze.emit(p.x + Math.cos(a) * r, p.y + R() * 0.3, p.z + Math.sin(a) * r, Math.cos(a) * 0.8, 0.4 + R() * 0.8, Math.sin(a) * 0.8, 1.2 + R(), 0.5, 1.8, DUST, DUST_B, 0.55, 0, { drag: 1.2 });
    }
  }

  /** Brillo de un instante (para dibujar una luz de gozo que vuela). */
  orb(x: number, y: number, z: number, s = 1) {
    this.glow.emit(x, y, z, 0, 0, 0, 0.016, 0.42 * s, 0.42 * s, GOLD, GOLD, 0.95, 0.95);
    this.glow.emit(x, y, z, 0, 0, 0, 0.016, 0.16 * s, 0.16 * s, WHITE, WHITE, 1, 1);
    if (R() < 0.5) this.glow.emit(x + rs(0.05), y + rs(0.05), z + rs(0.05), 0, 0.2, 0, 0.35, 0.12 * s, 0.02, GOLD, GOLD_B, 0.8, 0);
  }

  /** Brillo suave y fijo (sobre la fuente del gozo, encima de un lugar listo...). */
  shimmer(key: string, p: THREE.Vector3, dt: number, radius = 0.4, perSec = 6) {
    const n = this.rate(key, perSec, dt);
    for (let i = 0; i < n; i++) {
      const a = R() * Math.PI * 2, r = R() * radius;
      this.glow.emit(p.x + Math.cos(a) * r, p.y, p.z + Math.sin(a) * r, 0, 0.5 + R() * 0.4, 0, 1.0 + R() * 0.6, 0.14, 0.02, GOLD, GOLD_B, 0.9, 0, { swirl: 0.3 });
    }
  }

  /** Nube de la gloria que llena la casa (1 Reyes 8:10-11). */
  cloud(p: THREE.Vector3, dt: number, radius = 2) {
    const n = this.rate("cloud", 40, dt);
    for (let i = 0; i < n; i++) {
      const a = R() * Math.PI * 2, r = R() * radius;
      this.haze.emit(p.x + Math.cos(a) * r * 0.5, p.y + R() * 0.5, p.z + Math.sin(a) * r, rs(0.2), 0.3 + R() * 0.3, rs(0.2), 3 + R() * 2, 0.6, 2.8, INC_A, WHITE, 0.55, 0, { swirl: 0.4, drag: 0.2 });
    }
  }

  dispose() {
    this.glow.points.geometry.dispose();
    this.haze.points.geometry.dispose();
    this.glow.material.dispose();
    this.haze.material.dispose();
  }
}
