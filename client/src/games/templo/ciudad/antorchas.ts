/**
 * Las antorchas de la ciudad (pedido de Luis: que al caer la noche la ciudad esté alumbrada). Cada antorcha es un
 * poste de madera con su tazón de bronce: los postes van en una sola malla; las llamas y su resplandor son puntos que
 * titilan (una sola llamada a la tarjeta de video para todas), y cada una deja un círculo de luz cálida en el piso.
 * Unas pocas luces de verdad siguen a las antorchas más cercanas a la cámara, para que las paredes de alrededor se
 * pinten de naranja. De día se apagan (y las luces se quitan, para no gastar).
 */
import * as THREE from "three";
import { GeoBuilder, meshPair } from "../three/builder";
import { AREA_RECT, CALLES_DE_AREA, ESCUELA, PALACIO, PLAZA, alturaCiudad, caminable, obstaculosFijos } from "./plano";
import type { Rect } from "../layout";

const ALTO = 2.05;

/** Dónde van las antorchas: el borde de la plaza, las calles de los barrios y los caminos entre ellos. */
export function lugaresAntorchas(): THREE.Vector3[] {
  const fijos = obstaculosFijos();
  const lejosDe = (x: number, z: number, r: Rect, pad: number) => x < r[0] - pad || x > r[2] + pad || z < r[1] - pad || z > r[3] + pad;
  const puntos: [number, number][] = [];
  const pon = (x: number, z: number) => {
    if (!caminable(x, z)) return;
    if (!fijos.rects.every((r) => lejosDe(x, z, r, 0.7))) return;
    if (!fijos.circles.every(([cx, cz, cr]) => Math.hypot(x - cx, z - cz) > cr + 0.8)) return;
    if (puntos.some(([a, b]) => (a - x) ** 2 + (b - z) ** 2 < 10)) return;
    puntos.push([x, z]);
  };
  // la plaza: su borde, cada seis metros (dejando libre la puerta y la escalinata)
  const [px0, pz0, px1, pz1] = PLAZA;
  for (let x = px0 + 4; x <= px1 - 2; x += 6) {
    pon(x, pz0 + 0.7);
    pon(x, pz1 - 0.7);
  }
  for (const z of [-9, 9]) pon(px1 - 1.4, z);
  // dentro de la plaza: alrededor del pozo, el camino a la puerta y el púlpito
  for (const [x, z] of [[52.6, 3.2], [59.4, 3.2], [56, -0.4], [48, 0], [64, 0], [69, 2.4], [69, -2.4], [54.6, -8.6], [61.4, -8.6], [46.5, -5.5], [46.5, 5.5]] as [number, number][]) pon(x, z);
  // al pie de la escalinata del templo y a las puertas de los edificios
  for (const [x, z] of [[44.4, 3.5], [44.4, -3.5], [43.0, 5.4], [43.0, 10.6], [41.8, -10.2], [41.8, -5.8], [14.6, -21.0], [19.4, -21.0]] as [number, number][]) pon(x, z);
  // las calles de cada barrio: una de cada lado, cada dos casas, en zigzag
  for (const [x0, z0] of AREA_RECT)
    for (const [a, b] of CALLES_DE_AREA)
      for (let k = 0; k <= 10; k += 2) {
        pon(x0 + k * 3.6 + 0.4, z0 + a + 0.45);
        pon(x0 + k * 3.6 + 3.6, z0 + b - 0.45);
      }
  // los caminos entre la plaza y los barrios, y el camino del poniente (al pie del monte)
  for (let x = 41; x <= 73; x += 7) {
    pon(x, 15);
    pon(x, -15);
  }
  for (let z = -68; z <= 68; z += 7) pon(35.8, z);
  // alrededor del palacio y de la escuela de los profetas
  for (let x = PALACIO[0]; x <= PALACIO[2]; x += 6.5) {
    pon(x, PALACIO[3] + 2.6);
    pon(x, ESCUELA[1] - 2.6);
  }
  for (let x = 1; x <= 31; x += 7.5) {
    pon(x, 37.2);
    pon(x, -37.2);
    pon(x, 17.6);
    pon(x, -19.4);
  }
  return puntos.map(([x, z]) => new THREE.Vector3(x, alturaCiudad(x, z), z));
}

const FLAMA_VERT = `
attribute float fase;
uniform float uT;
uniform float uNivel;
uniform float uEscala;
uniform float uTam;
varying float vFase;
void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  float titila = 1.0 + 0.13 * sin(uT * 13.0 + fase) + 0.08 * sin(uT * 7.3 + fase * 1.7);
  gl_PointSize = uTam * titila * uEscala / max(0.5, -mv.z) * uNivel;
  vFase = fase;
  gl_Position = projectionMatrix * mv;
}`;

/** La llama: una gota con el centro casi blanco, amarilla y naranja en el borde, que se mueve un poco. */
const FLAMA_FRAG = `
uniform float uT;
uniform float uNivel;
varying float vFase;
void main() {
  vec2 p = gl_PointCoord * 2.0 - 1.0;
  p.x += sin(uT * 9.0 + vFase + p.y * 3.0) * 0.08 * (1.0 - p.y);
  // gota: angosta arriba (y = -1) y redonda abajo
  float ancho = mix(0.25, 0.75, clamp((p.y + 1.0) * 0.5, 0.0, 1.0));
  float d = length(vec2(p.x / ancho, (p.y - 0.15) * 0.9));
  float a = smoothstep(1.0, 0.25, d);
  vec3 c = mix(vec3(1.0, 0.45, 0.08), vec3(1.0, 0.86, 0.45), smoothstep(0.9, 0.2, d));
  c = mix(c, vec3(1.0, 0.98, 0.85), smoothstep(0.35, 0.0, d));
  gl_FragColor = vec4(c * 1.4, a * uNivel);
}`;

/** El resplandor alrededor de la llama: suave y anaranjado. */
const BRILLO_FRAG = `
uniform float uNivel;
void main() {
  vec2 p = gl_PointCoord * 2.0 - 1.0;
  float a = pow(max(0.0, 1.0 - length(p)), 2.2);
  gl_FragColor = vec4(vec3(1.0, 0.58, 0.22) * a * 0.55 * uNivel, a * uNivel);
}`;

function texturaPiso(): THREE.CanvasTexture {
  const cv = document.createElement("canvas");
  cv.width = cv.height = 128;
  const g = cv.getContext("2d")!;
  const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  gr.addColorStop(0, "rgba(255,170,90,0.75)");
  gr.addColorStop(0.45, "rgba(255,130,60,0.28)");
  gr.addColorStop(1, "rgba(255,110,40,0)");
  g.fillStyle = gr;
  g.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(cv);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export class Antorchas {
  readonly group = new THREE.Group();
  readonly lugares: THREE.Vector3[];
  private llamas: THREE.Points;
  private brillos: THREE.Points;
  private piso: THREE.Mesh;
  private pisoMat: THREE.MeshBasicMaterial;
  private uni: { uT: { value: number }; uNivel: { value: number }; uEscala: { value: number }; uTam: { value: number } };
  private uniB: { uT: { value: number }; uNivel: { value: number }; uEscala: { value: number }; uTam: { value: number } };
  private luces: { luz: THREE.PointLight; i: number; sube: number }[] = [];
  private t = 0;
  private cada = 0;
  private prendidas = false;
  private recursos: { dispose: () => void }[] = [];

  constructor(lugares: THREE.Vector3[], nLuces = 6) {
    this.lugares = lugares;
    // los postes: madera, un tazón de bronce y una piedra al pie
    const m = new GeoBuilder(), s = new GeoBuilder();
    for (const p of lugares) {
      m.cyl(0.16, 0.2, 0.18, "#8a7d68", { x: p.x, y: p.y + 0.09, z: p.z }, 7);
      m.cyl(0.045, 0.06, ALTO, "#5e3a1f", { x: p.x, y: p.y + ALTO / 2, z: p.z }, 6);
      s.lathe([[0.02, 0], [0.16, 0.04], [0.21, 0.16], [0.18, 0.2], [0.05, 0.2]], "#b8763b", { x: p.x, y: p.y + ALTO - 0.02, z: p.z }, 10);
      m.cyl(0.1, 0.12, 0.06, "#2a1a10", { x: p.x, y: p.y + ALTO + 0.14, z: p.z }, 8);
    }
    const postes = meshPair(m, s, false);
    this.group.add(postes);
    postes.traverse((o) => this.recursos.push((o as THREE.Mesh).geometry ?? { dispose: () => undefined }));

    // las llamas y su resplandor: puntos con su propia forma
    const pos = new Float32Array(lugares.length * 3);
    const fase = new Float32Array(lugares.length);
    lugares.forEach((p, i) => {
      pos.set([p.x, p.y + ALTO + 0.42, p.z], i * 3);
      fase[i] = Math.random() * 6.28;
    });
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("fase", new THREE.BufferAttribute(fase, 1));
    this.uni = { uT: { value: 0 }, uNivel: { value: 0 }, uEscala: { value: 400 }, uTam: { value: 0.75 } };
    this.uniB = { uT: { value: 0 }, uNivel: { value: 0 }, uEscala: { value: 400 }, uTam: { value: 3.4 } };
    const matLlama = new THREE.ShaderMaterial({ uniforms: this.uni, vertexShader: FLAMA_VERT, fragmentShader: FLAMA_FRAG, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
    const matBrillo = new THREE.ShaderMaterial({ uniforms: this.uniB, vertexShader: FLAMA_VERT, fragmentShader: BRILLO_FRAG, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
    this.llamas = new THREE.Points(geo, matLlama);
    this.brillos = new THREE.Points(geo, matBrillo);
    this.llamas.frustumCulled = this.brillos.frustumCulled = false;
    this.llamas.renderOrder = this.brillos.renderOrder = 5;
    this.group.add(this.brillos, this.llamas);
    this.recursos.push(geo, matLlama, matBrillo);

    // el círculo de luz en el piso de cada antorcha (una sola malla)
    const pb = new GeoBuilder();
    for (const p of lugares) pb.add(new THREE.PlaneGeometry(5.2, 5.2), "#ffffff", { x: p.x, y: p.y + 0.03, z: p.z, rx: -Math.PI / 2 });
    const pisoGeo = pb.build();
    // GeoBuilder no guarda las coordenadas de textura: se ponen de nuevo, cuadro por cuadro
    const uv = new Float32Array((pisoGeo.attributes.position.count / 6) * 12);
    for (let q = 0; q < pisoGeo.attributes.position.count / 6; q++) uv.set([0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1], q * 12);
    pisoGeo.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
    const tex = texturaPiso();
    this.pisoMat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false });
    this.piso = new THREE.Mesh(pisoGeo, this.pisoMat);
    this.piso.renderOrder = 2;
    this.group.add(this.piso);
    this.recursos.push(pisoGeo, tex, this.pisoMat);

    // las luces de verdad que siguen a las antorchas cercanas
    for (let k = 0; k < nLuces; k++) {
      const luz = new THREE.PointLight("#ffa45c", 0, 10, 1.5);
      luz.visible = false;
      this.group.add(luz);
      this.luces.push({ luz, i: -1, sube: 0 });
    }
    this.llamas.visible = this.brillos.visible = this.piso.visible = false;
  }

  /** Los píxeles por metro a un metro de la cámara (para que las llamas midan lo mismo en cualquier pantalla). */
  setPantalla(px: number) {
    this.uni.uEscala.value = this.uniB.uEscala.value = px;
  }

  /** `nivel`: 0 de día, 1 de noche cerrada. */
  update(dt: number, nivel: number, camX: number, camZ: number) {
    this.t += dt;
    this.uni.uT.value = this.uniB.uT.value = this.t;
    this.uni.uNivel.value = this.uniB.uNivel.value = nivel;
    this.pisoMat.opacity = nivel * 0.62;
    const prender = nivel > 0.01;
    if (prender !== this.prendidas) {
      this.prendidas = prender;
      this.llamas.visible = this.brillos.visible = this.piso.visible = prender;
      for (const l of this.luces) {
        l.luz.visible = prender;
        l.i = -1;
      }
    }
    if (!prender) return;
    // cada tanto, las luces de verdad van a las antorchas más cercanas a la cámara
    this.cada -= dt;
    if (this.cada <= 0) {
      this.cada = 0.45;
      const cerca = this.lugares
        .map((p, i) => ({ i, d: (p.x - camX) ** 2 + (p.z - camZ) ** 2 }))
        .sort((a, b) => a.d - b.d)
        .slice(0, this.luces.length)
        .map((x) => x.i);
      const libres = this.luces.filter((l) => !cerca.includes(l.i));
      for (const i of cerca) {
        if (this.luces.some((l) => l.i === i)) continue;
        const l = libres.shift();
        if (!l) break;
        l.i = i;
        l.sube = 0;
        const p = this.lugares[i];
        l.luz.position.set(p.x, p.y + ALTO + 0.5, p.z);
      }
    }
    for (const [k, l] of this.luces.entries()) {
      if (l.i < 0) continue;
      l.sube = Math.min(1, l.sube + dt * 2.5);
      const titila = 0.88 + Math.sin(this.t * 15 + k * 1.7) * 0.06 + Math.sin(this.t * 6.1 + k) * 0.06;
      l.luz.intensity = 7 * nivel * l.sube * titila;
    }
  }

  dispose() {
    for (const r of this.recursos) r.dispose();
    this.group.removeFromParent();
  }
}
