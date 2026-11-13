/**
 * Las mesas de los juegos de grupo tradicionales en el patio 3D (shared/mesa/juegos.ts, `MESAS_PATIO`): seis mesas
 * redondas de cedro con sus banquitos, y en cada una su juego (la lotería con su tabla y la baraja del cantor, los dados
 * y el cubilete, el tablero de las escaleras, la estrella de las damas chinas con sus canicas, las cartas de la memoria
 * y las hojas del «Basta»). Gente sentada juega en ellas (mundo.ts pone a los jugadores en `ASIENTOS_PATIO`), y al
 * acercarse se ve el nombre del juego. Nada con forma de cruz: la estrella es de seis puntas y las cartas no llevan
 * dibujos en cruz.
 */
import * as THREE from "three";
import { C, GeoBuilder } from "../three/builder";
import type { Overlay } from "../three/overlay";
import { meshes } from "./escenario";
import { SUELO } from "./plano";
import { JUEGOS_MESA, MESAS_PATIO, type JuegoMesaId } from "@shared/mesa/juegos";

const Y = SUELO;
const ALTO = 0.74;
const R = 0.68;

/** Dónde se sientan los jugadores de cada mesa (dos o tres, mirando al centro). */
export const ASIENTOS_PATIO: { x: number; z: number; yaw: number; mesa: JuegoMesaId }[] = MESAS_PATIO.flatMap((m, k) => {
  const angulos = k % 2 ? [0.4, 2.5, 4.4] : [1.2, 3.3, 5.3];
  return angulos.slice(0, k === 2 || k === 5 ? 2 : 3).map((a) => {
    const x = m.x + Math.cos(a) * 1.05;
    const z = m.z + Math.sin(a) * 1.05;
    return { x, z, yaw: Math.atan2(m.x - x, m.z - z), mesa: m.id };
  });
});

/** El azar fijo (las mesas se ven siempre igual). */
function azar(semilla: number) {
  let s = semilla;
  return () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
}

const COLORES = ["#d9483a", "#2f7fd0", "#2e9e5b", "#e0a21a", "#8a54b8", "#e06aa0"];

/** Encima de cada mesa, su juego (en pequeño). */
function juegoEncima(id: JuegoMesaId, m: GeoBuilder, s: GeoBuilder, x: number, z: number, r: () => number) {
  const y = Y + ALTO + 0.035;
  switch (id) {
    case "loteria": {
      // la tabla de 4 × 4 con sus figuras de colores y algunos frijolitos; la baraja del cantor y una carta parada
      for (let i = 0; i < 4; i++)
        for (let j = 0; j < 4; j++) {
          const cx = x - 0.24 + i * 0.1;
          const cz = z - 0.05 + j * 0.13;
          m.box(0.085, 0.006, 0.115, "#fbf3df", { x: cx, y, z: cz });
          m.box(0.06, 0.007, 0.07, COLORES[(i * 4 + j) % COLORES.length], { x: cx, y: y + 0.002, z: cz - 0.008 });
          if ((i * 7 + j * 3) % 5 === 0) s.sphere(0.018, "#7a2e1c", { x: cx, y: y + 0.016, z: cz, sy: 0.6 }, 6, 4);
        }
      m.box(0.1, 0.05, 0.14, "#8a2b2b", { x: x + 0.3, y: y + 0.022, z: z - 0.22 });
      m.box(0.12, 0.17, 0.008, "#fbf3df", { x: x + 0.28, y: y + 0.1, z: z + 0.2, rx: -0.25 });
      m.box(0.085, 0.09, 0.009, "#2f7fd0", { x: x + 0.28, y: y + 0.11, z: z + 0.198, rx: -0.25 });
      s.cyl(0.05, 0.04, 0.04, "#a8572b", { x: x - 0.32, y: y + 0.02, z: z - 0.25 }, 10); // el platito de los frijoles
      break;
    }
    case "generala": {
      // los cinco dados, el cubilete de cuero y la planilla
      for (let k = 0; k < 5; k++) {
        const a = k * 1.25 + r() * 0.4;
        s.box(0.07, 0.07, 0.07, "#f7f2e6", { x: x + Math.cos(a) * 0.18, y: y + 0.035, z: z + Math.sin(a) * 0.15, ry: r() * Math.PI, rx: r() < 0.3 ? 0.4 : 0 });
      }
      m.cyl(0.075, 0.065, 0.16, "#6a3a1c", { x: x - 0.3, y: y + 0.08, z: z - 0.18 }, 12);
      m.cyl(0.078, 0.078, 0.02, "#8a5428", { x: x - 0.3, y: y + 0.16, z: z - 0.18 }, 12);
      m.box(0.2, 0.004, 0.28, "#fbf3df", { x: x + 0.3, y, z: z + 0.15, ry: 0.3 });
      s.cyl(0.006, 0.006, 0.18, "#c9a227", { x: x + 0.38, y: y + 0.01, z: z + 0.05, rz: Math.PI / 2, ry: 0.6 }, 5);
      break;
    }
    case "escaleras": {
      // el tablero de casillas, una escalera dorada, una serpiente verde y dos fichas
      for (let i = 0; i < 6; i++)
        for (let j = 0; j < 6; j++) m.box(0.075, 0.006, 0.075, (i + j) % 2 ? "#f6e7c4" : "#ead2a0", { x: x - 0.19 + i * 0.075, y, z: z - 0.19 + j * 0.075 });
      m.box(0.48, 0.004, 0.48, "#7a4a22", { x, y: y - 0.004, z });
      for (const d of [-0.025, 0.025]) s.box(0.012, 0.012, 0.3, C.oro, { x: x - 0.06 + d, y: y + 0.012, z, ry: 0.5 });
      for (let k = 0; k < 6; k++) s.box(0.06, 0.008, 0.008, C.oro, { x: x - 0.06 - 0.07 * Math.sin(0.5) + k * 0.025 * Math.sin(0.5), y: y + 0.014, z: z - 0.12 + k * 0.05 * Math.cos(0.5) });
      for (let k = 0; k < 7; k++) s.sphere(0.016, "#5f9e3a", { x: x + 0.1 + Math.sin(k * 0.9) * 0.04, y: y + 0.014, z: z - 0.15 + k * 0.045 }, 6, 4);
      s.sphere(0.022, "#5f9e3a", { x: x + 0.1, y: y + 0.016, z: z - 0.17 }, 6, 4);
      for (const [dx, dz, c] of [
        [-0.15, 0.15, "#d9483a"],
        [0.15, 0.17, "#2f7fd0"],
      ] as [number, number, string][]) {
        s.cone(0.025, 0.06, c, { x: x + dx, y: y + 0.03, z: z + dz }, 8);
        s.sphere(0.02, c, { x: x + dx, y: y + 0.07, z: z + dz }, 8, 6);
      }
      break;
    }
    case "damas-chinas": {
      // la estrella de seis puntas (dos triángulos) con las canicas de colores en sus puntas
      m.cyl(0.3, 0.3, 0.02, "#c98b4e", { x, y: y + 0.004, z }, 3);
      m.cyl(0.3, 0.3, 0.02, "#c98b4e", { x, y: y + 0.004, z, ry: Math.PI / 3 }, 3);
      for (let p = 0; p < 6; p++) {
        const a = (p * Math.PI) / 3 + Math.PI / 6;
        for (let k = 0; k < 3; k++) {
          const rr = 0.2 + k * 0.035;
          s.sphere(0.013, COLORES[p], { x: x + Math.cos(a) * rr + (k - 1) * 0.012, y: y + 0.024, z: z + Math.sin(a) * rr }, 6, 4);
        }
      }
      break;
    }
    case "memoria": {
      // las cartas boca abajo (rojas con su borde de oro), dos abiertas
      for (let i = 0; i < 6; i++)
        for (let j = 0; j < 4; j++) {
          const abierta = (i === 1 && j === 2) || (i === 4 && j === 1);
          m.box(0.07, 0.005, 0.095, abierta ? "#fbf3df" : "#8a2b2b", { x: x - 0.19 + i * 0.076, y, z: z - 0.16 + j * 0.105, ry: (r() - 0.5) * 0.12 });
          if (abierta) m.box(0.05, 0.006, 0.05, COLORES[(i + j) % 6], { x: x - 0.19 + i * 0.076, y: y + 0.001, z: z - 0.17 + j * 0.105 });
        }
      break;
    }
    case "basta": {
      // las hojas de cada uno, los lápices y la letra grande de la ronda
      for (let k = 0; k < 3; k++) {
        const a = k * 2.1 + 0.3;
        m.box(0.16, 0.003, 0.21, "#fbf3df", { x: x + Math.cos(a) * 0.3, y, z: z + Math.sin(a) * 0.3, ry: -a });
        for (let l = 0; l < 4; l++) m.box(0.11, 0.004, 0.006, "#8a7458", { x: x + Math.cos(a) * 0.3, y: y + 0.002, z: z + Math.sin(a) * 0.3 - 0.06 + l * 0.04, ry: -a });
        s.cyl(0.007, 0.007, 0.15, "#e0a21a", { x: x + Math.cos(a) * 0.2, y: y + 0.01, z: z + Math.sin(a) * 0.2, rz: Math.PI / 2, ry: -a + 0.4 }, 6);
      }
      s.box(0.12, 0.12, 0.12, "#f1c232", { x, y: y + 0.06, z, ry: 0.4 });
      break;
    }
  }
}

export class MesasPatio {
  readonly group = new THREE.Group();
  private overlay: Overlay;
  private etiquetas: { el: HTMLDivElement; p: THREE.Vector3; x: number; z: number }[] = [];

  constructor(overlay: Overlay) {
    this.overlay = overlay;
    this.group.name = "mesas-patio";
    const m = new GeoBuilder();
    const s = new GeoBuilder();
    const r = azar(4211);
    for (const mesa of MESAS_PATIO) {
      const { x, z } = mesa;
      // la mesa redonda de cedro, con su pata y su pie
      m.cyl(R, R, 0.06, C.cedro, { x, y: Y + ALTO, z }, 24);
      m.cyl(R + 0.02, R + 0.02, 0.02, C.cedroOsc, { x, y: Y + ALTO - 0.04, z }, 24);
      m.cyl(0.07, 0.09, ALTO - 0.04, C.cedroOsc, { x, y: Y + (ALTO - 0.04) / 2, z }, 10);
      m.cyl(0.3, 0.34, 0.05, C.cedroOsc, { x, y: Y + 0.025, z }, 14);
      // un mantelito del color del juego
      m.cyl(R * 0.82, R * 0.82, 0.008, JUEGOS_MESA[mesa.id].color, { x, y: Y + ALTO + 0.032, z }, 24);
      m.cyl(R * 0.78, R * 0.78, 0.009, "#f3e3bd", { x, y: Y + ALTO + 0.034, z }, 24);
      // los banquitos alrededor
      for (let k = 0; k < 4; k++) {
        const a = (k / 4) * Math.PI * 2 + (mesa.x < 55 ? 0.2 : 0.6);
        const bx = x + Math.cos(a) * 1.08;
        const bz = z + Math.sin(a) * 1.08;
        m.cyl(0.21, 0.21, 0.06, C.cedro, { x: bx, y: Y + 0.44, z: bz }, 12);
        m.cyl(0.05, 0.07, 0.42, C.cedroOsc, { x: bx, y: Y + 0.21, z: bz }, 8);
      }
      juegoEncima(mesa.id, m, s, x, z, r);
      const el = overlay.make("tpl-pad", `${JUEGOS_MESA[mesa.id].icono} ${JUEGOS_MESA[mesa.id].nombre}<small>Se juega en la mesa de los juegos</small>`);
      el.style.display = "none";
      this.etiquetas.push({ el, p: new THREE.Vector3(x, Y + 1.85, z), x, z });
    }
    meshes(this.group, m, s, true);
  }

  /** Al acercarse a una mesa, se ve el nombre de su juego. */
  animar(jx: number, jz: number) {
    for (const e of this.etiquetas) {
      const cerca = Math.hypot(e.x - jx, e.z - jz) < 5.5;
      if (!cerca) {
        if (e.el.style.display !== "none") e.el.style.display = "none";
        continue;
      }
      this.overlay.place(e.el, e.p);
    }
  }
}
