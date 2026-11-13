/**
 * El patio de los juegos en 3D (shared/juegos-grupo.ts): en la franja del norte de la ciudad, junto al muro norte.
 * - `construirPatio`: lo que siempre está: el empedrado, los muros bajos con su portada y sus banderas de las tribus, los
 *   bancos, la grada, la mesa de los juegos con su toldo y la cantera de piedras. Nada con forma de cruz: las banderas
 *   cuelgan de un solo palo, y la portada es de dos pilares con su dintel.
 * - `EscenaJuegos`: lo que cambia con la partida: en la carrera, la luz dorada del lugar que toca y los círculos del
 *   recorrido; en el muro, el tramo que sube piedra por piedra, la cantera y el muro que brillan según lo que toca, y la
 *   piedra en las manos de quien la lleva.
 */
import * as THREE from "three";
import { C, GeoBuilder, matteMat } from "../three/builder";
import { oliveTree, tiles } from "../three/structures";
import { Ring, type Overlay } from "../three/overlay";
import { meshes } from "./escenario";
import { SUELO } from "./plano";
import {
  CANTERA, CARRERA, MURO, PATIO, PATIO_MESA, PATIO_PUERTA, PATIO_PUERTA_ANCHO, TRAMO, TRIBUS_EQUIPOS, type CarreraVista, type MuroVista,
} from "@shared/juegos-grupo";

const Y = SUELO;
const ALTO_MURO = 1.25;
const GRUESO = 0.45;

/** El azar fijo del patio (siempre se dibuja igual). */
function azar(semilla: number) {
  let s = semilla;
  return () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
}

export function construirPatio(): THREE.Group {
  const g = new THREE.Group();
  g.name = "patio-juegos";
  const m = new GeoBuilder();
  const s = new GeoBuilder();
  const r = azar(5207);
  const [x0, z0, x1, z1] = PATIO;
  // el empedrado, con un dibujo de dos colores en el centro (la pista de la carrera sale de ahí)
  m.raw(tiles(x0, z0, x1, z1, 1.3, ["#d9c39a", "#cfb68b", "#e2cfa8", "#c9ae83"], Y + 0.014, 0.05, 0.08));
  m.box(x1 - x0, 0.05, z1 - z0, "#a78f68", { x: (x0 + x1) / 2, y: Y - 0.01, z: (z0 + z1) / 2 });
  for (let k = 0; k < 4; k++) m.cyl(3.6 - k * 0.8, 3.6 - k * 0.8, 0.02, k % 2 ? "#c79a5a" : "#e9d7b0", { x: (x0 + x1) / 2, y: Y + 0.03 + k * 0.004, z: -60 }, 28);
  // los muros bajos, con su remate, y la puerta al sur
  const muro = (ax: "x" | "z", desde: number, hasta: number, en: number) => {
    const len = hasta - desde, mid = (desde + hasta) / 2;
    if (ax === "x") {
      m.box(len, ALTO_MURO, GRUESO, C.piedra, { x: mid, y: Y + ALTO_MURO / 2, z: en });
      m.box(len + 0.08, 0.12, GRUESO + 0.12, C.piedraClara, { x: mid, y: Y + ALTO_MURO + 0.06, z: en });
    } else {
      m.box(GRUESO, ALTO_MURO, len, C.piedra, { x: en, y: Y + ALTO_MURO / 2, z: mid });
      m.box(GRUESO + 0.12, 0.12, len + 0.08, C.piedraClara, { x: en, y: Y + ALTO_MURO + 0.06, z: mid });
    }
  };
  const p0 = PATIO_PUERTA[0] - PATIO_PUERTA_ANCHO / 2, p1 = PATIO_PUERTA[0] + PATIO_PUERTA_ANCHO / 2;
  muro("x", x0, x1, z0);
  muro("z", z0, z1, x0);
  muro("z", z0, z1, x1);
  muro("x", x0, p0, z1);
  muro("x", p1, x1, z1);
  // la portada: dos pilares y su dintel de cedro, con una guirnalda de banderines de las tribus
  for (const px of [p0 - 0.45, p1 + 0.45]) {
    m.box(0.9, 3.0, 0.9, C.piedraOsc, { x: px, y: Y + 1.5, z: z1 });
    m.box(1.05, 0.22, 1.05, C.piedraClara, { x: px, y: Y + 3.1, z: z1 });
    s.sphere(0.16, C.oro, { x: px, y: Y + 3.36, z: z1 }, 10, 8);
  }
  m.box(p1 - p0 + 1.8, 0.32, 0.5, C.cedro, { x: PATIO_PUERTA[0], y: Y + 2.85, z: z1 });
  for (let k = 0; k < 9; k++) {
    const t = TRIBUS_EQUIPOS[k % TRIBUS_EQUIPOS.length];
    const x = p0 + 0.2 + (k * (p1 - p0 - 0.4)) / 8;
    const caida = Math.sin((k / 8) * Math.PI) * 0.35;
    m.cone(0.17, 0.42, t.color, { x, y: Y + 2.42 - caida, z: z1 - 0.28, rx: Math.PI }, 3);
  }
  // las banderas de las cuatro tribus, cada una en su palo (en las esquinas de adentro)
  const esquinas: [number, number][] = [
    [x0 + 0.9, z0 + 0.9],
    [x1 - 0.9, z0 + 0.9],
    [x0 + 0.9, z1 - 0.9],
    [x1 - 0.9, z1 - 0.9],
  ];
  esquinas.forEach(([x, z], i) => {
    const t = TRIBUS_EQUIPOS[i];
    m.cyl(0.06, 0.07, 4.4, C.cedroOsc, { x, y: Y + 2.2, z }, 6);
    s.sphere(0.1, C.oro, { x, y: Y + 4.45, z }, 8, 6);
    const lado = x < (x0 + x1) / 2 ? 1 : -1;
    m.box(1.15, 0.7, 0.04, t.color, { x: x + lado * 0.62, y: Y + 3.95, z });
    m.box(1.15, 0.08, 0.05, C.oro, { x: x + lado * 0.62, y: Y + 3.56, z });
  });
  // bancos de piedra junto al muro del poniente
  for (const bz of [-64.5, -60.5, -56.5]) {
    m.box(0.5, 0.12, 2.2, C.piedraClara, { x: x0 + 0.75, y: Y + 0.46, z: bz });
    for (const dz of [-0.8, 0.8]) m.box(0.42, 0.42, 0.3, C.piedraOsc, { x: x0 + 0.75, y: Y + 0.21, z: bz + dz });
  }
  // la grada de madera del oriente, para mirar los juegos
  for (let k = 0; k < 3; k++) {
    const h = 0.4 + k * 0.4;
    m.box(1.0, h, 5.8, k % 2 ? C.cedro : C.cedroOsc, { x: 66.9 + k * 1.0, y: Y + h / 2, z: -61.3 });
  }
  // la mesa de los juegos con su toldo de colores (su círculo abre el patio)
  const [mx, mz] = PATIO_MESA;
  m.box(1.9, 0.08, 0.95, C.cedro, { x: mx, y: Y + 0.86, z: mz - 1.65 });
  for (const dx of [-0.82, 0.82]) for (const dz of [-0.38, 0.38]) m.box(0.08, 0.84, 0.08, C.cedroOsc, { x: mx + dx, y: Y + 0.42, z: mz - 1.65 + dz });
  // el tablero (casillas de dos colores) y dos rollos
  for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) m.box(0.12, 0.012, 0.12, (i + j) % 2 ? "#f3ead2" : "#6b4a2b", { x: mx - 0.55 + i * 0.12, y: Y + 0.907, z: mz - 1.83 + j * 0.12 });
  for (const dx of [0.35, 0.62]) m.cyl(0.05, 0.05, 0.5, C.lino, { x: mx + dx, y: Y + 0.95, z: mz - 1.62, rx: Math.PI / 2 }, 8);
  for (const dx of [-1.25, 1.25]) for (const dz of [-0.75, -2.55]) m.cyl(0.05, 0.05, 2.5, C.cedroOsc, { x: mx + dx, y: Y + 1.25, z: mz + dz }, 6);
  for (let k = 0; k < 6; k++) m.box(2.6 / 6, 0.05, 2.0, k % 2 ? "#c8452f" : "#efd9a5", { x: mx - 1.3 + (k + 0.5) * (2.6 / 6), y: Y + 2.52, z: mz - 1.65 });
  // la cantera: el montón de piedras labradas, junto al muro del oriente
  const [cx, cz] = CANTERA;
  for (let k = 0; k < 16; k++) {
    const capa = Math.floor(k / 6);
    m.box(0.62, 0.36, 0.44, r() < 0.5 ? C.piedra : C.piedraOsc, { x: cx + 1.3 + (r() - 0.5) * 1.1, y: Y + 0.18 + capa * 0.36, z: cz + (r() - 0.5) * 1.8, ry: (r() - 0.5) * 0.6 });
  }
  m.cyl(0.32, 0.36, 0.42, "#8a6a42", { x: cx + 0.7, y: Y + 0.21, z: cz - 1.25 }, 10); // el cesto
  // dos olivos en los rincones del norte
  oliveTree(m, x0 + 1.4, Y, z0 + 1.5, 0.8);
  oliveTree(m, x1 - 1.4, Y, z0 + 1.5, 0.8);
  meshes(g, m, s, true);
  return g;
}

/** El tramo del muro: tantas piedras como se pusieron (de abajo hacia arriba), sobre su cimiento. */
const POR_HILERA = 20;
const HILERAS = 6;
function construirTramo(fraccion: number): THREE.Group {
  const g = new THREE.Group();
  const m = new GeoBuilder();
  const r = azar(811);
  const largo = TRAMO.x1 - TRAMO.x0;
  const ancho = largo / POR_HILERA;
  const alto = 0.4;
  // el cimiento y las piedras caídas de siempre
  m.box(largo + 0.3, 0.22, 0.95, C.piedraOsc, { x: (TRAMO.x0 + TRAMO.x1) / 2, y: Y + 0.11, z: TRAMO.z });
  const n = Math.round(Math.max(0, Math.min(1, fraccion)) * POR_HILERA * HILERAS);
  for (let k = 0; k < n; k++) {
    const fila = Math.floor(k / POR_HILERA), col = k % POR_HILERA;
    // las hileras van trabadas (media piedra corrida una sí y otra no)
    const corre = fila % 2 ? ancho / 2 : 0;
    const x = TRAMO.x0 + ancho / 2 + col * ancho + corre;
    if (x > TRAMO.x1) continue;
    const tono = r();
    m.box(ancho - 0.04, alto - 0.03, 0.8, tono < 0.33 ? "#e0d2b2" : tono < 0.66 ? "#d6c6a2" : "#cbb990", { x, y: Y + 0.22 + alto / 2 + fila * alto, z: TRAMO.z });
  }
  // el andamio de cedro, mientras no esté terminado
  if (n < POR_HILERA * HILERAS) {
    for (const x of [TRAMO.x0 + 0.6, (TRAMO.x0 + TRAMO.x1) / 2, TRAMO.x1 - 0.6]) m.cyl(0.05, 0.06, 2.9, C.cedroOsc, { x, y: Y + 1.45, z: TRAMO.z + 0.9 }, 5);
    m.box(largo, 0.07, 0.5, C.cedro, { x: (TRAMO.x0 + TRAMO.x1) / 2, y: Y + 1.6, z: TRAMO.z + 0.9 });
  } else {
    // terminado: el remate de piedra clara y una banda de oro
    m.box(largo + 0.1, 0.16, 0.9, C.piedraClara, { x: (TRAMO.x0 + TRAMO.x1) / 2, y: Y + 0.22 + HILERAS * alto + 0.08, z: TRAMO.z });
  }
  meshes(g, m, null, true);
  return g;
}

export class EscenaJuegos {
  readonly group = new THREE.Group();
  private overlay: Overlay;
  private rings: Ring[] = [];
  private haz: THREE.Mesh;
  private hazMat: THREE.MeshBasicMaterial;
  private etiqueta: HTMLDivElement;
  private etiquetaPos = new THREE.Vector3();
  private tramo: THREE.Group | null = null;
  private tramoN = -1;
  private ringCantera: Ring;
  private ringMuro: Ring;
  private etiquetaCantera: HTMLDivElement;
  private etiquetaMuro: HTMLDivElement;
  private piedra: THREE.Mesh;
  private vista: CarreraVista | MuroVista | null = null;

  constructor(overlay: Overlay) {
    this.overlay = overlay;
    this.hazMat = new THREE.MeshBasicMaterial({ color: "#ffd25a", transparent: true, opacity: 0.32, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, toneMapped: false });
    this.haz = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 1.1, 34, 18, 1, true), this.hazMat);
    this.haz.visible = false;
    this.haz.renderOrder = 2;
    this.group.add(this.haz);
    this.etiqueta = overlay.make("tpl-pad", "");
    this.etiqueta.style.display = "none";
    this.ringCantera = new Ring(MURO.radioCantera, "#f0b45a", false);
    this.ringCantera.set(CANTERA[0], Y, CANTERA[1]);
    this.ringMuro = new Ring(MURO.radioTramo, "#ffd25a", false);
    this.ringMuro.set((TRAMO.x0 + TRAMO.x1) / 2, Y, TRAMO.z + 1.6);
    this.ringMuro.mesh.scale.set((TRAMO.x1 - TRAMO.x0 + 2 * MURO.radioTramo) / (2 * MURO.radioTramo), 1, 1);
    this.ringCantera.mesh.visible = this.ringMuro.mesh.visible = false;
    this.group.add(this.ringCantera.mesh, this.ringMuro.mesh);
    this.etiquetaCantera = overlay.make("tpl-pad", "🪨 La cantera<small>Toma una piedra</small>");
    this.etiquetaMuro = overlay.make("tpl-pad", "🧱 El muro<small>Pon aquí la piedra</small>");
    this.etiquetaCantera.style.display = this.etiquetaMuro.style.display = "none";
    const pg = new GeoBuilder();
    pg.box(0.42, 0.3, 0.32, "#d8c9a6");
    pg.box(0.44, 0.04, 0.34, "#b9a37a", { y: -0.13 });
    this.piedra = new THREE.Mesh(pg.build(), matteMat());
    this.piedra.castShadow = true;
    this.piedra.visible = false;
    this.group.add(this.piedra);
    this.ponerTramo(0);
  }

  private ponerTramo(fraccion: number) {
    const n = Math.round(Math.max(0, Math.min(1, fraccion)) * POR_HILERA * HILERAS);
    if (n === this.tramoN) return;
    this.tramoN = n;
    if (this.tramo) {
      this.group.remove(this.tramo);
      this.tramo.traverse((o) => (o as THREE.Mesh).geometry?.dispose());
    }
    this.tramo = construirTramo(fraccion);
    this.group.add(this.tramo);
  }

  /** Lo que muestra la partida de ahora (la carrera o el muro), o nada. */
  poner(v: CarreraVista | MuroVista | null) {
    this.vista = v;
    // la carrera: un círculo por lugar (el que toca, dorado; los que siguen, tenues)
    const n = v?.juego === "carrera" ? v.puntos.length : 0;
    while (this.rings.length < n) {
      const ring = new Ring(CARRERA.radio, "#ffd25a", false);
      this.group.add(ring.mesh);
      this.rings.push(ring);
    }
    this.rings.forEach((ring, i) => {
      if (v?.juego !== "carrera" || i >= n) {
        ring.mesh.visible = false;
        return;
      }
      const l = v.puntos[i];
      ring.set(l.x, Y, l.z);
      ring.mesh.visible = i >= v.miSiguiente && v.miTiempo == null;
    });
    const sig = v?.juego === "carrera" && v.miTiempo == null ? v.puntos[v.saltoMio ? Math.max(0, v.miSiguiente - 1) : v.miSiguiente] : null;
    if (sig) {
      this.haz.position.set(sig.x, Y + 17, sig.z);
      this.etiquetaPos.set(sig.x, Y + 3.2, sig.z);
      this.etiqueta.innerHTML = `🏃 ${v?.juego === "carrera" && v.saltoMio ? "Vuelve aquí" : `${(v as CarreraVista).miSiguiente + 1}`} · ${sig.nombre}<small>${v?.juego === "carrera" && v.fase === "preparar" ? "Espera la salida" : "¡Corre hasta la luz!"}</small>`;
    }
    this.haz.visible = !!sig;
    if (!sig) this.etiqueta.style.display = "none";
    // el muro
    const muro = v?.juego === "muro" ? v : null;
    this.ponerTramo(muro ? muro.puestas / Math.max(1, muro.meta) : 0);
    this.ringCantera.mesh.visible = !!muro && !muro.llevo;
    this.ringMuro.mesh.visible = !!muro && muro.llevo;
    if (!muro) this.etiquetaCantera.style.display = this.etiquetaMuro.style.display = "none";
    this.piedra.visible = !!muro?.llevo;
  }

  /** Cada cuadro: el brillo de la luz y los círculos, las etiquetas y la piedra en las manos. */
  animar(dt: number, tiempo: number, jugador: { x: number; y: number; z: number; yaw: number }) {
    void dt;
    if (this.haz.visible) {
      this.hazMat.opacity = 0.24 + 0.12 * Math.sin(tiempo * 3.2);
      this.overlay.place(this.etiqueta, this.etiquetaPos);
    }
    for (const ring of this.rings) {
      if (!ring.mesh.visible) continue;
      const u = ring.mat.uniforms;
      u.uTime.value = tiempo;
      u.uPulse.value = 1;
      u.uOpacity.value = 0.9;
    }
    for (const ring of [this.ringCantera, this.ringMuro]) {
      if (!ring.mesh.visible) continue;
      const u = ring.mat.uniforms;
      u.uTime.value = tiempo;
      u.uPulse.value = 1;
      u.uOpacity.value = 0.9;
    }
    const muro = this.vista?.juego === "muro" ? this.vista : null;
    if (muro) {
      const cerca = (x: number, z: number) => Math.hypot(jugador.x - x, jugador.z - z) < 26;
      if (cerca(CANTERA[0], CANTERA[1])) this.overlay.place(this.etiquetaCantera, new THREE.Vector3(CANTERA[0] + 1.2, Y + 2.2, CANTERA[1]));
      else this.etiquetaCantera.style.display = "none";
      const mx = (TRAMO.x0 + TRAMO.x1) / 2;
      if (cerca(mx, TRAMO.z)) this.overlay.place(this.etiquetaMuro, new THREE.Vector3(mx, Y + 3.2, TRAMO.z));
      else this.etiquetaMuro.style.display = "none";
    }
    if (this.piedra.visible) {
      this.piedra.position.set(jugador.x + Math.sin(jugador.yaw) * 0.34, jugador.y + 1.02, jugador.z + Math.cos(jugador.yaw) * 0.34);
      this.piedra.rotation.y = jugador.yaw;
    }
  }

  destroy() {
    for (const ring of [...this.rings, this.ringCantera, this.ringMuro]) ring.dispose();
    this.haz.geometry.dispose();
    this.hazMat.dispose();
    this.piedra.geometry.dispose();
    this.tramo?.traverse((o) => (o as THREE.Mesh).geometry?.dispose());
    for (const el of [this.etiqueta, this.etiquetaCantera, this.etiquetaMuro]) el.remove();
  }
}
