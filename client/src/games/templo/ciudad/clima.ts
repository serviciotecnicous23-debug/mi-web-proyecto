/**
 * La lluvia de Jerusalén (shared/anio.ts dice qué días llueve: muchos en el invierno, algunos con la lluvia temprana y
 * la tardía, ninguno en verano). Gotas finas que caen alrededor de la cámara; aparece y se va despacio. La ciudad usa
 * `intensidad` para nublar el cielo y bajar el sol mientras llueve.
 */
import * as THREE from "three";

const RADIO = 34;
const ALTO = 26;

export class Lluvia {
  readonly group = new THREE.Group();
  /** 0 sin lluvia, 1 lloviendo (sube y baja despacio). */
  intensidad = 0;
  private activa = false;
  private gotas: THREE.LineSegments;
  private pos: Float32Array;
  private vel: Float32Array;
  private n: number;
  private suelo: number;
  private mat: THREE.LineBasicMaterial;

  constructor(coarse: boolean, suelo: number) {
    this.n = coarse ? 700 : 1400;
    this.suelo = suelo;
    this.pos = new Float32Array(this.n * 6);
    this.vel = new Float32Array(this.n);
    for (let i = 0; i < this.n; i++) this.colocar(i, 0, 0, Math.random() * ALTO);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(this.pos, 3));
    this.mat = new THREE.LineBasicMaterial({ color: "#b9cde6", transparent: true, opacity: 0, depthWrite: false });
    this.gotas = new THREE.LineSegments(geo, this.mat);
    this.gotas.frustumCulled = false;
    this.group.add(this.gotas);
    this.group.visible = false;
  }

  /** Una gota nueva arriba, cerca de (cx, cz). */
  private colocar(i: number, cx: number, cz: number, alto = ALTO) {
    const a = Math.random() * Math.PI * 2, r = Math.sqrt(Math.random()) * RADIO;
    const x = cx + Math.cos(a) * r, z = cz + Math.sin(a) * r, y = this.suelo + alto;
    const largo = 0.45 + Math.random() * 0.35;
    const o = i * 6;
    this.pos[o] = x;
    this.pos[o + 1] = y;
    this.pos[o + 2] = z;
    this.pos[o + 3] = x + 0.06;
    this.pos[o + 4] = y - largo;
    this.pos[o + 5] = z + 0.03;
    this.vel[i] = 17 + Math.random() * 7;
  }

  /** Hoy llueve o no (cambia despacio). */
  setLluvia(llueve: boolean) {
    this.activa = llueve;
  }

  update(dt: number, cx: number, cz: number) {
    const meta = this.activa ? 1 : 0;
    this.intensidad += Math.sign(meta - this.intensidad) * Math.min(Math.abs(meta - this.intensidad), dt * 0.35);
    this.group.visible = this.intensidad > 0.01;
    if (!this.group.visible) return;
    this.mat.opacity = 0.5 * this.intensidad;
    // solo cae una parte de las gotas cuando empieza o termina de llover
    const activas = Math.floor(this.n * this.intensidad);
    for (let i = 0; i < this.n; i++) {
      const o = i * 6;
      if (i >= activas) {
        this.pos[o + 1] = this.pos[o + 4] = this.suelo - 50;
        continue;
      }
      const d = this.vel[i] * dt;
      this.pos[o + 1] -= d;
      this.pos[o + 4] -= d;
      this.pos[o] += d * 0.04;
      this.pos[o + 3] += d * 0.04;
      // al llegar al suelo (o si la cámara se alejó), vuelve a caer desde arriba cerca de la cámara
      if (this.pos[o + 4] < this.suelo || Math.abs(this.pos[o] - cx) > RADIO + 6 || Math.abs(this.pos[o + 2] - cz) > RADIO + 6) this.colocar(i, cx, cz, ALTO * (0.4 + Math.random() * 0.6));
    }
    (this.gotas.geometry.getAttribute("position") as THREE.BufferAttribute).needsUpdate = true;
  }

  dispose() {
    this.gotas.geometry.dispose();
    this.mat.dispose();
  }
}

/** Un punto suave (redondo y con borde difuminado) para los pétalos y las luces. */
let puntoSuave: THREE.CanvasTexture | null = null;
function texturaPunto(): THREE.CanvasTexture {
  if (puntoSuave) return puntoSuave;
  const c = document.createElement("canvas");
  c.width = c.height = 32;
  const g = c.getContext("2d")!;
  const r = g.createRadialGradient(16, 16, 0, 16, 16, 16);
  r.addColorStop(0, "rgba(255,255,255,1)");
  r.addColorStop(0.45, "rgba(255,255,255,0.85)");
  r.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = r;
  g.fillRect(0, 0, 32, 32);
  puntoSuave = new THREE.CanvasTexture(c);
  return puntoSuave;
}

/**
 * Los pétalos del almendro en la siega de la cebada: caen despacio, meciéndose, alrededor de la cámara.
 * «¿Qué ves tú, Jeremías? Y dije: Veo una vara de almendro» (Jeremías 1:11).
 */
export class Petalos {
  readonly group = new THREE.Group();
  private activa = false;
  private nivel = 0;
  private reloj = 0;
  private pts: THREE.Points;
  private pos: Float32Array;
  private fase: Float32Array;
  private n: number;
  private suelo: number;
  private mat: THREE.PointsMaterial;

  constructor(coarse: boolean, suelo: number) {
    this.n = coarse ? 140 : 280;
    this.suelo = suelo;
    this.pos = new Float32Array(this.n * 3);
    this.fase = new Float32Array(this.n);
    for (let i = 0; i < this.n; i++) this.colocar(i, 0, 0, Math.random() * 12);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(this.pos, 3));
    this.mat = new THREE.PointsMaterial({ color: "#f7d6e4", size: 0.24, map: texturaPunto(), transparent: true, opacity: 0, depthWrite: false, alphaTest: 0.02 });
    this.pts = new THREE.Points(geo, this.mat);
    this.pts.frustumCulled = false;
    this.group.add(this.pts);
    this.group.visible = false;
  }

  private colocar(i: number, cx: number, cz: number, alto: number) {
    const a = Math.random() * Math.PI * 2, r = Math.sqrt(Math.random()) * 24;
    this.pos[i * 3] = cx + Math.cos(a) * r;
    this.pos[i * 3 + 1] = this.suelo + alto;
    this.pos[i * 3 + 2] = cz + Math.sin(a) * r;
    this.fase[i] = Math.random() * Math.PI * 2;
  }

  setActivo(si: boolean) {
    this.activa = si;
  }

  update(dt: number, cx: number, cz: number) {
    this.nivel += Math.sign((this.activa ? 1 : 0) - this.nivel) * Math.min(Math.abs((this.activa ? 1 : 0) - this.nivel), dt * 0.3);
    this.group.visible = this.nivel > 0.01;
    if (!this.group.visible) return;
    this.reloj += dt;
    this.mat.opacity = 0.9 * this.nivel;
    for (let i = 0; i < this.n; i++) {
      const o = i * 3, f = this.fase[i];
      this.pos[o] += (0.35 + Math.sin(this.reloj * 0.9 + f) * 0.55) * dt;
      this.pos[o + 1] -= (0.55 + (i % 5) * 0.08) * dt;
      this.pos[o + 2] += Math.cos(this.reloj * 0.7 + f) * 0.45 * dt;
      if (this.pos[o + 1] < this.suelo + 0.05 || Math.abs(this.pos[o] - cx) > 30 || Math.abs(this.pos[o + 2] - cz) > 30) this.colocar(i, cx, cz, 6 + Math.random() * 7);
    }
    (this.pts.geometry.getAttribute("position") as THREE.BufferAttribute).needsUpdate = true;
  }

  dispose() {
    this.pts.geometry.dispose();
    this.mat.dispose();
  }
}

/**
 * El polvo que flota en la luz del sol (docs/guia-visual.md, sección 7: partículas con sentido): motas finas alrededor de
 * donde estás, que el viento lleva despacio hacia el poniente y que brillan cuando les da el sol. Solo de día y sin
 * lluvia: de noche y cuando llueve se apagan despacio.
 */
export class Polvo {
  readonly group = new THREE.Group();
  private nivel = 0;
  private reloj = 0;
  private pts: THREE.Points;
  private pos: Float32Array;
  private col: Float32Array;
  private fase: Float32Array;
  private n: number;
  private suelo: number;
  private mat: THREE.PointsMaterial;

  constructor(coarse: boolean, suelo: number) {
    this.n = coarse ? 70 : 160;
    this.suelo = suelo;
    this.pos = new Float32Array(this.n * 3);
    this.col = new Float32Array(this.n * 3);
    this.fase = new Float32Array(this.n);
    for (let i = 0; i < this.n; i++) this.colocar(i, 0, 0);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(this.pos, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(this.col, 3));
    this.mat = new THREE.PointsMaterial({ size: 0.15, map: texturaPunto(), vertexColors: true, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending });
    this.pts = new THREE.Points(geo, this.mat);
    this.pts.frustumCulled = false;
    this.group.add(this.pts);
    this.group.visible = false;
  }

  private colocar(i: number, cx: number, cz: number) {
    const a = Math.random() * Math.PI * 2, r = Math.sqrt(Math.random()) * 12;
    this.pos[i * 3] = cx + Math.cos(a) * r;
    this.pos[i * 3 + 1] = this.suelo + 0.3 + Math.random() * 4.2;
    this.pos[i * 3 + 2] = cz + Math.sin(a) * r;
    this.fase[i] = Math.random() * Math.PI * 2;
  }

  /** `dia`: 1 de día con sol, 0 de noche o con lluvia (cambia despacio). */
  update(dt: number, dia: number, cx: number, cz: number) {
    const meta = Math.max(0, Math.min(1, dia));
    this.nivel += Math.sign(meta - this.nivel) * Math.min(Math.abs(meta - this.nivel), dt * 0.4);
    this.group.visible = this.nivel > 0.01;
    if (!this.group.visible) return;
    this.reloj += dt;
    this.mat.opacity = 0.75 * this.nivel;
    const t = this.reloj;
    for (let i = 0; i < this.n; i++) {
      const o = i * 3, f = this.fase[i];
      // el viento las lleva despacio hacia el poniente; suben y bajan sin apuro
      this.pos[o] -= (0.1 + Math.sin(t * 0.31 + f) * 0.16) * dt;
      this.pos[o + 1] += Math.sin(t * 0.5 + f * 1.7) * 0.07 * dt;
      this.pos[o + 2] += Math.cos(t * 0.27 + f) * 0.12 * dt;
      // brillan a ratos, cuando el sol les da de lado
      const b = Math.max(0, Math.sin(t * (0.6 + (i % 7) * 0.09) + f * 3.1));
      const k = 0.25 + 0.75 * b * b;
      this.col[o] = k;
      this.col[o + 1] = k * 0.93;
      this.col[o + 2] = k * 0.74;
      if (Math.abs(this.pos[o] - cx) > 13 || Math.abs(this.pos[o + 2] - cz) > 13 || this.pos[o + 1] < this.suelo + 0.1 || this.pos[o + 1] > this.suelo + 5) this.colocar(i, cx, cz);
    }
    (this.pts.geometry.getAttribute("position") as THREE.BufferAttribute).needsUpdate = true;
    (this.pts.geometry.getAttribute("color") as THREE.BufferAttribute).needsUpdate = true;
  }

  dispose() {
    this.pts.geometry.dispose();
    this.mat.dispose();
  }
}

/**
 * Las lámparas de fiesta en las calles (Navidad y año nuevo): tres por lugar, colgadas a distintas alturas; de noche
 * brillan del todo y titilan un poco.
 */
export class Lamparas {
  readonly group = new THREE.Group();
  private activa = false;
  private nivel = 0;
  private reloj = 0;
  private pts: THREE.Points;
  private mat: THREE.PointsMaterial;

  constructor(lugares: [number, number][], suelo: number) {
    const pos: number[] = [];
    for (const [x, z] of lugares) {
      for (let k = 0; k < 3; k++) {
        const a = (k / 3) * Math.PI * 2 + x * 0.37;
        pos.push(x + Math.cos(a) * 0.9, suelo + 2.5 + k * 0.45, z + Math.sin(a) * 0.9);
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    this.mat = new THREE.PointsMaterial({ color: "#ffd27a", size: 0.75, map: texturaPunto(), transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending });
    this.pts = new THREE.Points(geo, this.mat);
    this.group.add(this.pts);
    this.group.visible = false;
  }

  setActivo(si: boolean) {
    this.activa = si;
  }

  update(dt: number, noche: boolean) {
    this.nivel += Math.sign((this.activa ? 1 : 0) - this.nivel) * Math.min(Math.abs((this.activa ? 1 : 0) - this.nivel), dt * 0.5);
    this.group.visible = this.nivel > 0.01;
    if (!this.group.visible) return;
    this.reloj += dt;
    this.mat.opacity = this.nivel * (noche ? 1 : 0.45);
    this.mat.size = 0.75 + Math.sin(this.reloj * 3.1) * 0.05;
  }

  dispose() {
    this.pts.geometry.dispose();
    this.mat.dispose();
  }
}
