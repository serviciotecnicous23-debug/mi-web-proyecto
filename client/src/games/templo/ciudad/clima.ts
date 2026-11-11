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
