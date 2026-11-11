/**
 * Palomas que vuelan en círculos sobre el monte del templo y sobre la plaza (vida en el cielo de Jerusalén). Cada
 * paloma es un cuerpo y dos alas que aletean; todas van en tres mallas con instancias (tres llamadas en total).
 * De noche se posan (no se ven).
 */
import * as THREE from "three";

type Paloma = { cx: number; cz: number; r: number; y: number; vel: number; fase: number; aleteo: number; sube: number; sigue: boolean; dx: number; dz: number };

const tmpM = new THREE.Matrix4();
const tmpQ = new THREE.Quaternion();
const tmpE = new THREE.Euler();
const tmpV = new THREE.Vector3();
const tmpS = new THREE.Vector3(1, 1, 1);
const tmpL = new THREE.Matrix4();
const tmpW = new THREE.Matrix4();

export class Palomas {
  readonly group = new THREE.Group();
  private cuerpos: THREE.InstancedMesh;
  private alaI: THREE.InstancedMesh;
  private alaD: THREE.InstancedMesh;
  private palomas: Paloma[] = [];
  private t = 0;
  private empezo = false;

  /** `bandadas`: centro (x, z), radio y altura de cada bandada; `sigue`: ronda cerca de la cámara (despacio). */
  constructor(bandadas: { x: number; z: number; r: number; y: number; n: number; sigue?: boolean }[]) {
    const mat = new THREE.MeshLambertMaterial({ color: "#ffffff" });
    const cuerpo = new THREE.SphereGeometry(0.11, 8, 6);
    cuerpo.scale(0.8, 0.7, 1.7);
    const cola = new THREE.ConeGeometry(0.07, 0.16, 6);
    cola.rotateX(Math.PI / 2);
    cola.translate(0, 0, -0.2);
    const cabeza = new THREE.SphereGeometry(0.06, 6, 5);
    cabeza.translate(0, 0.05, 0.17);
    const geoCuerpo = mergeSimple([cuerpo, cola, cabeza]);
    // más grandes que de verdad, para que se vean desde la cámara de la ciudad
    const TAM = 1.55;
    geoCuerpo.scale(TAM, TAM, TAM);
    // el ala sale del costado del cuerpo (la bisagra queda en x = 0) y termina en punta, hacia atrás
    const forma = new THREE.Shape();
    forma.moveTo(0, 0.08);
    forma.lineTo(0.2, 0.05);
    forma.lineTo(0.38, -0.05);
    forma.lineTo(0.18, -0.06);
    forma.lineTo(0, -0.07);
    forma.closePath();
    const alaD = new THREE.ShapeGeometry(forma);
    alaD.rotateX(-Math.PI / 2);
    alaD.scale(TAM, TAM, TAM);
    const alaI = alaD.clone();
    alaI.scale(-1, 1, 1);
    const total = bandadas.reduce((a, b) => a + b.n, 0);
    const matAla = new THREE.MeshLambertMaterial({ color: "#ffffff", side: THREE.DoubleSide });
    this.cuerpos = new THREE.InstancedMesh(geoCuerpo, mat, total);
    this.alaI = new THREE.InstancedMesh(alaI, matAla, total);
    this.alaD = new THREE.InstancedMesh(alaD, matAla, total);
    for (const m of [this.cuerpos, this.alaI, this.alaD]) {
      m.frustumCulled = false;
      m.castShadow = false;
      this.group.add(m);
    }
    // palomas grises como las de verdad (y alguna blanca), con las alas más oscuras: se ven sobre el piso claro
    const gris = new THREE.Color("#7c8494"), grisAla = new THREE.Color("#596070"), blanca = new THREE.Color("#f2efe8"), blancaAla = new THREE.Color("#d9d3c7");
    for (let i = 0; i < total; i++) {
      const esBlanca = Math.random() < 0.25;
      this.cuerpos.setColorAt(i, esBlanca ? blanca : gris);
      this.alaI.setColorAt(i, esBlanca ? blancaAla : grisAla);
      this.alaD.setColorAt(i, esBlanca ? blancaAla : grisAla);
    }
    for (const b of bandadas)
      for (let i = 0; i < b.n; i++)
        this.palomas.push({
          cx: b.x + (Math.random() - 0.5) * 3,
          cz: b.z + (Math.random() - 0.5) * 3,
          r: b.r * (0.7 + Math.random() * 0.5),
          y: b.y + Math.random() * 2.5,
          vel: (0.35 + Math.random() * 0.2) * (Math.random() < 0.5 ? 1 : -1),
          fase: Math.random() * Math.PI * 2,
          aleteo: 10 + Math.random() * 4,
          sube: Math.random() * 6,
          sigue: !!b.sigue,
          dx: b.x,
          dz: b.z,
        });
  }

  /** `dia`: 0 de noche (se posan), 1 de día. `camX`, `camZ`: hacia dónde mira la cámara (la bandada que sigue). */
  update(dt: number, dia: number, camX = 0, camZ = 0) {
    this.t += dt;
    this.group.visible = dia > 0.2;
    if (!this.group.visible) return;
    // la primera vez, la bandada que sigue aparece ya cerca (después se acerca despacio)
    const k = this.empezo ? 1 - Math.exp(-dt * 0.12) : 1;
    this.empezo = true;
    this.palomas.forEach((p, i) => {
      if (p.sigue) {
        // ronda un poco delante de donde estás, y se va acercando despacio
        p.cx += (camX + p.dx - p.cx) * k;
        p.cz += (camZ + p.dz - p.cz) * k;
      }
      const a = p.fase + this.t * p.vel;
      const x = p.cx + Math.cos(a) * p.r;
      const z = p.cz + Math.sin(a) * p.r * 0.8;
      const y = p.y + Math.sin(this.t * 0.4 + p.sube) * 0.8;
      // mira hacia donde vuela (la tangente del círculo) y se inclina en la curva
      const yaw = Math.atan2(-Math.sin(a) * p.vel, Math.cos(a) * p.vel * 0.8);
      tmpE.set(0, yaw, -Math.sign(p.vel) * 0.35, "YXZ");
      tmpQ.setFromEuler(tmpE);
      tmpV.set(x, y, z);
      tmpM.compose(tmpV, tmpQ, tmpS);
      this.cuerpos.setMatrixAt(i, tmpM);
      // aleteo (a ratos planea)
      const planea = Math.sin(this.t * 0.7 + p.sube) > 0.6;
      const ang = planea ? 0.15 : Math.sin(this.t * p.aleteo + p.fase) * 0.75;
      tmpL.makeRotationZ(ang);
      tmpW.multiplyMatrices(tmpM, tmpL);
      this.alaI.setMatrixAt(i, tmpW);
      tmpL.makeRotationZ(-ang);
      tmpW.multiplyMatrices(tmpM, tmpL);
      this.alaD.setMatrixAt(i, tmpW);
    });
    this.cuerpos.instanceMatrix.needsUpdate = true;
    this.alaI.instanceMatrix.needsUpdate = true;
    this.alaD.instanceMatrix.needsUpdate = true;
  }

  dispose() {
    for (const m of [this.cuerpos, this.alaI, this.alaD]) {
      m.geometry.dispose();
      (m.material as THREE.Material).dispose();
    }
    this.group.removeFromParent();
  }
}

/** Junta geometrías simples (posición y normal) en una. */
function mergeSimple(geos: THREE.BufferGeometry[]): THREE.BufferGeometry {
  const partes = geos.map((g) => (g.index ? g.toNonIndexed() : g));
  let n = 0;
  for (const g of partes) n += g.attributes.position.count;
  const pos = new Float32Array(n * 3), nor = new Float32Array(n * 3);
  let o = 0;
  for (const g of partes) {
    pos.set(g.attributes.position.array as Float32Array, o * 3);
    nor.set(g.attributes.normal.array as Float32Array, o * 3);
    o += g.attributes.position.count;
  }
  for (const g of geos) g.dispose();
  const out = new THREE.BufferGeometry();
  out.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  out.setAttribute("normal", new THREE.BufferAttribute(nor, 3));
  return out;
}
