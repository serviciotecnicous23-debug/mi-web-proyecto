/**
 * Los muebles de la casa por dentro, dibujados en código (shared/casa-interior.ts): cada uno es un
 * grupo con su base en y = 0 y centrado en las celdas que ocupa sin girar (ancho × fondo).
 * Nada aquí parece una cruz ni el candelero del templo: el candelero de casa es una sola lámpara
 * en lo alto de su pie.
 */
import * as THREE from "three";
import { C, GeoBuilder, meshPair, shinyMat } from "../three/builder";
import { CELDA, pieza } from "@shared/casa-interior";

const MADERA = "#8a5a32";
const MADERA_OSC = "#5e3a1f";
const BARRO = "#b8673e";
const BARRO_CLARO = "#c98a5a";
const LINO = "#ece3cf";
const PIEDRA = "#8f8a82";

/** Dónde queda la llama de cada mueble que alumbra (para su luz y su brillo). */
export const LLAMA: Record<string, number> = { "lampara-casa": 0.42, candelero: 1.22, brasero: 0.5, olla: 0.18, fogon: 0.12 };

/**
 * Los muebles que se usan (shared/casa-interior.ts, usoDe): a qué altura se sienta uno (silla, banco, cojines, estera) o
 * se acuesta (los lechos). Las piezas finas, como el mueble de donde salen.
 */
export const ASIENTO: Record<string, number> = { silla: 0.25, "banco-cedro": 0.23, cojines: 0.04, estera: 0.0 };
export const LECHO_ALTO: Record<string, number> = { lecho: 0.36, "lecho-cobertor": 0.41 };

function patas(g: GeoBuilder, w: number, d: number, h: number, color: string, grosor = 0.05) {
  const x = w / 2 - grosor, z = d / 2 - grosor;
  for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) g.box(grosor, h, grosor, color, { x: sx * x, y: h / 2, z: sz * z });
}

function vasija(g: GeoBuilder, alto: number, ancho: number, color: string, t: { x?: number; z?: number } = {}) {
  const a = ancho, h = alto;
  g.lathe(
    [[0, 0], [a * 0.55, 0.01], [a * 0.9, h * 0.25], [a, h * 0.5], [a * 0.8, h * 0.78], [a * 0.38, h * 0.9], [a * 0.42, h], [a * 0.3, h]],
    color,
    { x: t.x ?? 0, z: t.z ?? 0 },
    12,
  );
}

const ORO = new THREE.Color("#d9a93a");

/**
 * La pieza fina del artesano (shared/taller.ts): el mismo mueble, dorado. Cada color se acerca al oro y todo brilla
 * (como el metal), para que se note a primera vista cuál es la fina.
 */
function dorar(g: THREE.Group): THREE.Group {
  const tmp = new THREE.Color();
  g.traverse((o) => {
    const mesh = o as THREE.Mesh;
    const col = mesh.geometry?.getAttribute("color") as THREE.BufferAttribute | undefined;
    if (!col) return;
    for (let i = 0; i < col.count; i++) {
      tmp.setRGB(col.getX(i), col.getY(i), col.getZ(i)).lerp(ORO, 0.55);
      col.setXYZ(i, tmp.r, tmp.g, tmp.b);
    }
    col.needsUpdate = true;
    mesh.material = shinyMat();
  });
  g.userData.fina = true;
  return g;
}

/** Arma un mueble. Devuelve null si no existe. */
export function construirMueble(id: string): THREE.Group | null {
  const mu = pieza(id);
  if (!mu) return null;
  if (mu.fina) {
    const base = construirMueble(mu.fina);
    return base ? dorar(base) : null;
  }
  const W = mu.w * CELDA, D = mu.d * CELDA;
  const g = new GeoBuilder();
  const brillo = new GeoBuilder();
  switch (id) {
    case "estera": {
      // juncos tejidos: franjas que se alternan, el borde y las puntas sueltas
      g.box(W - 0.06, 0.02, D - 0.08, "#c9a96a", { y: 0.01 }, 0.06);
      for (let i = 0; i < 9; i++) g.box(W - 0.12, 0.023, 0.03, i % 2 ? "#b8955a" : "#d8bd80", { y: 0.012, z: -D / 2 + 0.08 + i * ((D - 0.16) / 8) });
      for (const sz of [-1, 1]) g.box(W - 0.04, 0.026, 0.03, "#8f6e3c", { y: 0.013, z: sz * (D / 2 - 0.05) });
      for (let i = 0; i < 10; i++) for (const sx of [-1, 1]) g.box(0.06, 0.008, 0.012, "#c9a96a", { x: sx * (W / 2 - 0.01), y: 0.006, z: -D / 2 + 0.07 + i * ((D - 0.14) / 9), ry: sx * 0.2 });
      break;
    }
    case "alfombra": {
      // lana teñida: borde ocre, campo rojo, una cenefa de puntos, el medallón de rombos y los flecos
      g.box(W - 0.04, 0.014, D - 0.04, "#c98a2b", { y: 0.007 });
      g.box(W - 0.16, 0.018, D - 0.16, "#a33a2c", { y: 0.009 }, 0.04);
      g.box(W - 0.3, 0.019, D - 0.3, "#8a2a24", { y: 0.0095 });
      g.box(W - 0.36, 0.02, D - 0.36, "#a33a2c", { y: 0.01 });
      for (let i = 0; i < 12; i++) {
        const t = i / 12;
        for (const [x, z] of [[-W / 2 + 0.12 + t * (W - 0.24), -D / 2 + 0.12], [-W / 2 + 0.12 + t * (W - 0.24), D / 2 - 0.12], [-W / 2 + 0.12, -D / 2 + 0.12 + t * (D - 0.24)], [W / 2 - 0.12, -D / 2 + 0.12 + t * (D - 0.24)]] as [number, number][])
          g.sphere(0.018, "#e2c27a", { x, y: 0.02, z, sy: 0.3 }, 5, 3);
      }
      g.box(0.36, 0.022, 0.36, "#e2c27a", { y: 0.012, ry: Math.PI / 4 });
      g.box(0.24, 0.024, 0.24, "#27468f", { y: 0.013, ry: Math.PI / 4 });
      g.box(0.1, 0.026, 0.1, "#e2c27a", { y: 0.014, ry: Math.PI / 4 });
      for (const sx of [-1, 1]) for (let i = 0; i < 14; i++) g.box(0.07, 0.006, 0.012, "#e8d9b0", { x: sx * (W / 2 + 0.01), y: 0.004, z: -D / 2 + 0.06 + i * ((D - 0.12) / 13) });
      break;
    }
    case "cojines": {
      // tres cojines con su ribete y sus borlas
      for (const [x, z, r, c, y] of [[-0.06, -0.04, 0.2, "#8a2f3a", 0.09], [0.09, 0.08, 0.17, "#c98a2b", 0.08], [0.02, 0.0, 0.12, "#27468f", 0.19]] as [number, number, number, string, number][]) {
        g.sphere(r, c, { x, y, z, sy: 0.45 });
        g.torus(r * 0.95, 0.012, "#e2c27a", { x, y, z, rx: Math.PI / 2, sx: 1, sy: 1 }, 3, 16);
        for (const a of [0.7, 2.3, 3.9, 5.5]) g.sphere(0.018, "#e2c27a", { x: x + Math.cos(a) * r, y: y - 0.02, z: z + Math.sin(a) * r }, 4, 3);
      }
      break;
    }
    case "mesa": {
      // acacia con el canto redondeado, el faldón y las patas torneadas; encima, el mantel, el pan, el aceite y las olivas
      g.box(W - 0.12, 0.05, D - 0.16, MADERA, { y: 0.39 });
      g.box(W - 0.1, 0.025, D - 0.14, MADERA_OSC, { y: 0.358 });
      for (const sz of [-1, 1]) g.box(W - 0.26, 0.07, 0.025, MADERA_OSC, { y: 0.31, z: sz * (D / 2 - 0.12) });
      for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
        const x = sx * (W / 2 - 0.12), z = sz * (D / 2 - 0.12);
        g.cyl(0.025, 0.03, 0.34, MADERA_OSC, { x, y: 0.17, z }, 8);
        g.sphere(0.035, MADERA_OSC, { x, y: 0.22, z }, 8, 6);
      }
      g.box(W * 0.62, 0.006, D - 0.06, "#e8dcc0", { y: 0.418 });
      g.box(W * 0.62, 0.007, 0.03, "#2f5aa8", { y: 0.419, z: -(D / 2 - 0.08) });
      vasija(g, 0.17, 0.07, BARRO_CLARO, { x: 0.3, z: -0.02 });
      g.cyl(0.11, 0.1, 0.03, "#d9a95a", { x: -0.22, y: 0.43 }, 14);
      g.sphere(0.07, "#c98a3a", { x: -0.22, y: 0.45, sy: 0.5 }, 10, 6);
      g.lathe([[0, 0], [0.07, 0], [0.09, 0.04], [0.085, 0.045]], BARRO, { x: 0.05, y: 0.42, z: 0.06 }, 12);
      for (let i = 0; i < 7; i++) g.sphere(0.014, i % 2 ? "#3b2a3f" : "#556b2f", { x: 0.05 + Math.cos(i) * 0.04, y: 0.455, z: 0.06 + Math.sin(i) * 0.04 }, 4, 3);
      break;
    }
    case "silla": {
      // el asiento de varillas tejidas, el respaldo de tres tablillas y los travesaños
      g.box(0.42, 0.04, 0.4, MADERA, { y: 0.42 });
      for (let i = 0; i < 6; i++) g.box(0.36, 0.012, 0.035, i % 2 ? "#b39466" : "#c9a77c", { y: 0.446, z: -0.15 + i * 0.06 });
      for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) g.cyl(0.022, 0.026, 0.42, MADERA_OSC, { x: sx * 0.18, y: 0.21, z: sz * 0.17 }, 8);
      for (const sx of [-1, 1]) g.box(0.03, 0.03, 0.34, MADERA_OSC, { x: sx * 0.18, y: 0.12, z: 0 });
      g.box(0.36, 0.03, 0.03, MADERA_OSC, { y: 0.14, z: 0.17 });
      for (const sx of [-1, 1]) g.cyl(0.022, 0.024, 0.46, MADERA_OSC, { x: sx * 0.18, y: 0.65, z: -0.18 }, 8);
      g.box(0.4, 0.06, 0.04, MADERA, { y: 0.88, z: -0.18 });
      for (const x of [-0.09, 0, 0.09]) g.box(0.05, 0.3, 0.02, MADERA, { x, y: 0.66, z: -0.18 });
      break;
    }
    case "lecho": {
      // la cama de madera con sus cuatro postes, la cabecera tallada, el colchón, la manta con franjas y la almohada
      g.box(W - 0.06, 0.12, D - 0.06, MADERA, { y: 0.17 });
      for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
        const x = sx * (W / 2 - 0.05), z = sz * (D / 2 - 0.05);
        g.cyl(0.03, 0.035, sx < 0 ? 0.62 : 0.34, MADERA_OSC, { x, y: sx < 0 ? 0.31 : 0.17, z }, 8);
        g.sphere(0.04, MADERA_OSC, { x, y: sx < 0 ? 0.63 : 0.35, z }, 8, 6);
      }
      g.box(0.05, 0.3, D - 0.12, MADERA_OSC, { x: -W / 2 + 0.05, y: 0.42 });
      g.box(0.055, 0.05, D - 0.16, MADERA, { x: -W / 2 + 0.05, y: 0.5 });
      g.box(W - 0.14, 0.1, D - 0.14, LINO, { y: 0.28 });
      g.box(W * 0.58, 0.035, D - 0.1, "#7a8a4a", { x: W * 0.16, y: 0.345 }, 0.04);
      for (const t of [-0.32, 0, 0.32]) g.box(W * 0.58, 0.037, 0.04, "#e2c27a", { x: W * 0.16, y: 0.346, z: t * (D - 0.1) });
      g.box(0.28, 0.08, D - 0.26, "#f5f1e6", { x: -W / 2 + 0.24, y: 0.37 });
      break;
    }
    case "arcon": {
      // cedro con sus tableros, las esquinas de bronce, la tapa redondeada y el cerrojo
      g.box(0.52, 0.34, 0.38, MADERA_OSC, { y: 0.19 });
      for (const sz of [-1, 1]) for (const sx of [-1, 1]) g.box(0.2, 0.22, 0.012, MADERA, { x: sx * 0.12, y: 0.19, z: sz * 0.192 });
      g.add(new THREE.CylinderGeometry(0.19, 0.19, 0.53, 14, 1, false, 0, Math.PI), MADERA, { y: 0.36, rz: Math.PI / 2, sx: 0.4 });
      for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) brillo.box(0.05, 0.36, 0.05, C.bronce, { x: sx * 0.25, y: 0.19, z: sz * 0.18 });
      brillo.box(0.54, 0.03, 0.4, C.bronce, { y: 0.06 });
      brillo.box(0.07, 0.09, 0.02, C.oroOsc, { y: 0.33, z: 0.2 });
      brillo.torus(0.025, 0.006, C.oroOsc, { y: 0.28, z: 0.205 }, 3, 8);
      for (const sx of [-1, 1]) g.box(0.06, 0.04, 0.06, MADERA_OSC, { x: sx * 0.22, y: 0.02, z: 0.15 });
      break;
    }
    case "tinaja": {
      // la tinaja grande con sus dos asas, la tapa de madera y el cazo colgado
      vasija(g, 0.62, 0.21, BARRO);
      for (const sx of [-1, 1]) g.torus(0.06, 0.016, BARRO, { x: sx * 0.2, y: 0.44, rz: Math.PI / 2 }, 4, 10);
      g.torus(0.2, 0.008, "#8a4a2a", { y: 0.32, rx: Math.PI / 2 }, 3, 18);
      g.cyl(0.085, 0.085, 0.02, MADERA, { y: 0.63 }, 12);
      g.sphere(0.02, MADERA_OSC, { y: 0.65 }, 6, 4);
      g.cyl(0.006, 0.006, 0.22, MADERA_OSC, { x: 0.08, y: 0.7, z: 0.06, rz: -0.6 }, 4);
      g.sphere(0.03, BARRO_CLARO, { x: 0.15, y: 0.62, z: 0.06, sy: 0.6 }, 6, 4);
      break;
    }
    case "vasijas": {
      // tres vasijas de aceite con su tapón; una con asa
      vasija(g, 0.44, 0.13, BARRO_CLARO, { x: -0.1, z: -0.06 });
      vasija(g, 0.32, 0.1, BARRO, { x: 0.12, z: 0.02 });
      vasija(g, 0.22, 0.08, "#a8744a", { x: -0.02, z: 0.15 });
      for (const [x, z, y, r] of [[-0.1, -0.06, 0.45, 0.04], [0.12, 0.02, 0.33, 0.032], [-0.02, 0.15, 0.23, 0.026]] as [number, number, number, number][]) g.cyl(r, r * 1.1, 0.04, MADERA_OSC, { x, y, z }, 8);
      g.torus(0.045, 0.012, BARRO_CLARO, { x: -0.22, y: 0.3, z: -0.06, rz: Math.PI / 2 }, 4, 8);
      g.torus(0.13, 0.006, "#7a3f22", { x: -0.1, y: 0.25, z: -0.06, rx: Math.PI / 2 }, 3, 14);
      break;
    }
    case "cesta": {
      // la canasta tejida (con sus vueltas) llena de higos, uvas y granadas
      g.lathe([[0, 0], [0.16, 0.01], [0.2, 0.08], [0.22, 0.16], [0.2, 0.16]], "#b08a4a", {}, 14);
      for (const y of [0.04, 0.08, 0.12]) g.torus(0.18 + y * 0.25, 0.008, "#8f6e3c", { y, rx: Math.PI / 2 }, 3, 16);
      g.torus(0.21, 0.014, "#8f6e3c", { y: 0.16, rx: Math.PI / 2 }, 4, 16);
      for (let i = 0; i < 9; i++) g.sphere(0.022, "#5b2a6e", { x: -0.06 + (i % 3) * 0.03, y: 0.18 + Math.floor(i / 3) * 0.02, z: -0.05 + (i % 2) * 0.02 }, 5, 4);
      for (const [x, z] of [[0.08, 0.02], [0.02, 0.09]] as [number, number][]) {
        g.sphere(0.055, "#a33a2c", { x, y: 0.19, z }, 8, 6);
        g.cone(0.018, 0.03, "#7a2a22", { x, y: 0.25, z }, 5);
      }
      for (const [x, z] of [[-0.1, 0.06], [0.1, -0.08]] as [number, number][]) g.sphere(0.035, "#6f7a3a", { x, y: 0.18, z, sy: 1.2 }, 6, 5);
      break;
    }
    case "planta": {
      // la maceta pintada con su franja y la menta y el eneldo
      g.lathe([[0, 0], [0.12, 0.0], [0.14, 0.18], [0.17, 0.2], [0.17, 0.23], [0.0, 0.22]], BARRO, {}, 14);
      g.torus(0.145, 0.01, "#e2c27a", { y: 0.12, rx: Math.PI / 2 }, 3, 14);
      g.cyl(0.15, 0.15, 0.01, "#4a3826", { y: 0.215 }, 12);
      for (let i = 0; i < 9; i++) {
        const a = (i / 9) * Math.PI * 2;
        g.cone(0.05, 0.26 + (i % 3) * 0.06, i % 2 ? C.hoja : C.hojaClara, { x: Math.cos(a) * 0.06, y: 0.35, z: Math.sin(a) * 0.06, rx: Math.sin(a) * 0.4, rz: -Math.cos(a) * 0.4 }, 5);
      }
      for (let i = 0; i < 5; i++) g.sphere(0.02, "#e8d44a", { x: Math.cos(i * 1.3) * 0.08, y: 0.5 + (i % 2) * 0.05, z: Math.sin(i * 1.3) * 0.08 }, 4, 3);
      break;
    }
    case "lampara-casa": {
      // el banquito de madera y la lámpara de barro con su pico y su llama
      g.box(0.32, 0.04, 0.32, MADERA, { y: 0.29 });
      for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) g.cyl(0.018, 0.022, 0.28, MADERA_OSC, { x: sx * 0.12, y: 0.14, z: sz * 0.12 }, 6);
      g.lathe([[0, 0], [0.07, 0.0], [0.09, 0.025], [0.07, 0.045], [0.02, 0.05], [0, 0.05]], BARRO_CLARO, { y: 0.31 }, 12);
      g.box(0.08, 0.025, 0.035, BARRO_CLARO, { x: 0.09, y: 0.34 });
      g.cyl(0.012, 0.012, 0.04, BARRO, { x: -0.06, y: 0.36 }, 5);
      g.cone(0.022, 0.07, "#ffd36b", { x: 0.12, y: 0.39 }, 6);
      break;
    }
    case "candelero": {
      // el pie de madera, la columna de bronce con sus anillos y la lámpara arriba
      g.cyl(0.16, 0.18, 0.05, MADERA_OSC, { y: 0.025 });
      g.cyl(0.12, 0.14, 0.04, MADERA, { y: 0.07 });
      brillo.cyl(0.025, 0.035, 1.02, C.bronce, { y: 0.6 }, 8);
      for (const y of [0.32, 0.62, 0.92]) brillo.torus(0.04, 0.012, C.bronceOsc, { y, rx: Math.PI / 2 }, 4, 10);
      brillo.cyl(0.09, 0.05, 0.05, C.bronce, { y: 1.12 }, 10);
      g.lathe([[0, 0], [0.07, 0.0], [0.085, 0.025], [0.06, 0.045], [0, 0.045]], BARRO_CLARO, { y: 1.15 }, 12);
      g.cone(0.025, 0.07, "#ffd36b", { x: 0.07, y: 1.22 }, 6);
      break;
    }
    case "molino": {
      // las dos piedras (la de arriba con su agujero y su mango), la harina y un saco
      g.cyl(0.26, 0.28, 0.12, PIEDRA, { y: 0.06 }, 16);
      g.cyl(0.22, 0.23, 0.1, "#a39d94", { y: 0.17 }, 16);
      g.cyl(0.04, 0.04, 0.02, "#2a2420", { y: 0.225 }, 10);
      g.cyl(0.02, 0.02, 0.2, MADERA_OSC, { x: 0.15, y: 0.31 }, 6);
      g.cone(0.1, 0.06, "#e9dcc0", { x: -0.2, y: 0.03, z: 0.2 }, 10);
      g.sphere(0.1, "#d4bf94", { x: 0.26, y: 0.1, z: 0.14, sy: 1.1 }, 8, 6);
      g.cyl(0.035, 0.05, 0.05, "#b39a6e", { x: 0.26, y: 0.22, z: 0.14 }, 8);
      break;
    }
    case "banco-cedro": {
      // el banco con su respaldo, sus patas de tabla y un cojín
      g.box(W - 0.1, 0.06, 0.36, MADERA, { y: 0.4 });
      g.box(W - 0.1, 0.025, 0.37, MADERA_OSC, { y: 0.368 });
      for (const sx of [-1, 1]) {
        g.box(0.06, 0.37, 0.3, MADERA_OSC, { x: sx * (W / 2 - 0.14), y: 0.185 });
        g.box(0.06, 0.4, 0.05, MADERA_OSC, { x: sx * (W / 2 - 0.08), y: 0.62, z: -0.16 });
      }
      g.box(W - 0.12, 0.12, 0.04, MADERA, { y: 0.74, z: -0.16 });
      g.box(W * 0.4, 0.06, 0.28, "#8a2f3a", { x: -W * 0.15, y: 0.46 }, 0.04);
      break;
    }
    case "mesa-pan": {
      // la mesa con el mantel, los panes redondos, una canasta y una jarra
      g.box(W - 0.12, 0.05, D - 0.16, MADERA, { y: 0.39 });
      for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) g.cyl(0.025, 0.03, 0.37, MADERA_OSC, { x: sx * (W / 2 - 0.12), y: 0.185, z: sz * (D / 2 - 0.12) }, 8);
      g.box(W - 0.2, 0.006, D - 0.1, "#efe6cf", { y: 0.418 });
      for (const [x, z] of [[-0.34, -0.05], [-0.12, 0.06], [0.1, -0.04]]) {
        g.cyl(0.1, 0.1, 0.035, "#d9a95a", { x, y: 0.437, z }, 14);
        g.sphere(0.085, "#c98a3a", { x, y: 0.455, z, sy: 0.35 }, 10, 6);
      }
      g.lathe([[0, 0], [0.1, 0.01], [0.12, 0.08], [0.11, 0.08]], "#b08a4a", { x: 0.33, y: 0.42, z: 0.02 }, 12);
      for (let i = 0; i < 4; i++) g.sphere(0.035, "#d9a95a", { x: 0.33 + Math.cos(i * 1.6) * 0.04, y: 0.5, z: 0.02 + Math.sin(i * 1.6) * 0.04 }, 6, 4);
      vasija(g, 0.16, 0.06, BARRO_CLARO, { x: 0.15, z: 0.1 });
      break;
    }
    case "telar-casa": {
      // el telar con su marco, los hilos de la urdimbre, la tela tejida con sus franjas, la lanzadera y las pesas
      for (const sx of [-1, 1]) {
        g.box(0.07, 1.45, 0.07, MADERA_OSC, { x: sx * (W / 2 - 0.12), y: 0.725 });
        g.box(0.18, 0.05, 0.3, MADERA_OSC, { x: sx * (W / 2 - 0.12), y: 0.025 });
      }
      g.box(W - 0.16, 0.07, 0.07, MADERA, { y: 1.42 });
      g.box(W - 0.2, 0.06, 0.08, MADERA, { y: 0.28 });
      for (let i = 0; i < 13; i++) g.box(0.008, 1.08, 0.008, LINO, { x: -(W / 2 - 0.22) + i * ((W - 0.44) / 12), y: 0.86 });
      g.box(W - 0.32, 0.42, 0.02, "#27468f", { y: 0.53 }, 0.05);
      for (const [y, c] of [[0.42, "#e2c27a"], [0.5, "#b3242f"], [0.62, "#e2c27a"], [0.68, "#b3242f"]] as [number, string][]) g.box(W - 0.32, 0.035, 0.022, c, { y });
      g.box(0.3, 0.025, 0.04, MADERA, { x: 0.1, y: 0.76, z: 0.03 });
      for (let i = 0; i < 6; i++) g.sphere(0.035, PIEDRA, { x: -(W / 2 - 0.3) + i * ((W - 0.6) / 5), y: 0.12 }, 6, 5);
      break;
    }
    case "palomar": {
      // la casita de las palomas con su techo a dos aguas, sus entradas con percha y dos palomas
      g.box(0.46, 0.5, 0.42, MADERA, { y: 0.27 });
      for (const sz of [-1, 1]) g.box(0.5, 0.04, 0.28, MADERA_OSC, { y: 0.6, z: sz * 0.11, rx: sz * -0.55 });
      for (const [x, y] of [[-0.12, 0.38], [0.12, 0.38], [0, 0.18]]) {
        g.cyl(0.05, 0.05, 0.02, "#2a1d12", { x, y, z: 0.215, rx: Math.PI / 2 }, 10);
        g.box(0.12, 0.012, 0.05, MADERA_OSC, { x, y: y - 0.06, z: 0.235 });
      }
      g.box(0.5, 0.06, 0.46, MADERA_OSC, { y: 0.03 });
      for (const [x, y, z] of [[0.05, 0.66, 0.02], [-0.13, 0.34, 0.26]] as [number, number, number][]) {
        g.sphere(0.065, "#f2f0ea", { x, y, z, sx: 1.4 }, 8, 6);
        g.sphere(0.032, "#f2f0ea", { x: x + 0.09, y: y + 0.04, z }, 6, 5);
        g.cone(0.01, 0.025, "#e0a030", { x: x + 0.125, y: y + 0.04, z, rz: -Math.PI / 2 }, 4);
      }
      break;
    }
    case "estante": {
      // el estante de cedro con su cornisa; en él, muchos rollos atados con cinta, tablillas y un tintero
      for (const sx of [-1, 1]) g.box(0.05, 1.3, 0.3, MADERA_OSC, { x: sx * (W / 2 - 0.08), y: 0.65 });
      for (const y of [0.05, 0.45, 0.85, 1.24]) g.box(W - 0.14, 0.04, 0.3, MADERA, { y });
      g.box(W - 0.04, 0.07, 0.34, MADERA_OSC, { y: 1.3 });
      g.box(W - 0.14, 1.2, 0.02, "#6e4a2a", { y: 0.64, z: -0.14 });
      for (const [y, n] of [[0.52, 5], [0.92, 4], [0.12, 3]] as [number, number][])
        for (let i = 0; i < n; i++) {
          const x = -(W / 2 - 0.24) + i * ((W - 0.48) / Math.max(1, n - 1));
          g.cyl(0.05, 0.05, 0.24, "#efe1bd", { x, y: y + 0.03, rx: Math.PI / 2 }, 8);
          g.cyl(0.015, 0.015, 0.3, MADERA_OSC, { x, y: y + 0.03, rx: Math.PI / 2 }, 5);
          g.torus(0.051, 0.007, i % 2 ? C.carmesi : C.azul, { x, y: y + 0.03, z: 0.03 }, 3, 10);
        }
      g.box(0.16, 0.02, 0.12, "#b89a72", { x: W / 2 - 0.22, y: 0.88, ry: 0.2 });
      vasija(g, 0.07, 0.04, "#2a1d12", { x: -(W / 2 - 0.2), z: 0.02 });
      break;
    }
    case "brasero": {
      // el brasero de bronce en sus tres patas, la rejilla y las brasas
      for (let i = 0; i < 3; i++) {
        const a = (i / 3) * Math.PI * 2;
        brillo.box(0.03, 0.3, 0.03, C.bronceOsc, { x: Math.cos(a) * 0.15, y: 0.15, z: Math.sin(a) * 0.15 });
        brillo.sphere(0.03, C.bronceOsc, { x: Math.cos(a) * 0.16, y: 0.015, z: Math.sin(a) * 0.16 }, 6, 4);
      }
      brillo.lathe([[0, 0], [0.12, 0.0], [0.22, 0.1], [0.24, 0.14], [0.22, 0.14]], C.bronce, { y: 0.28 }, 14);
      for (const sg of [-1, 1]) brillo.torus(0.04, 0.008, C.bronceOsc, { x: sg * 0.24, y: 0.4, rz: Math.PI / 2 }, 3, 8);
      for (let i = 0; i < 9; i++) {
        const a = i * 2.4;
        g.sphere(0.045, i % 2 ? "#ff7a1a" : "#ffb347", { x: Math.cos(a) * 0.09 * (i % 3), y: 0.44, z: Math.sin(a) * 0.09 * (i % 3) }, 6, 5);
      }
      break;
    }
    // ---- la casa viva: muebles nuevos
    case "fogon": {
      // el anillo de piedras, la leña, las brasas y la olla de barro con su tapa
      for (let i = 0; i < 7; i++) {
        const a = (i / 7) * Math.PI * 2;
        g.add(new THREE.IcosahedronGeometry(0.075, 0), i % 2 ? PIEDRA : "#a39d94", { x: Math.cos(a) * 0.2, y: 0.05, z: Math.sin(a) * 0.2, ry: a });
      }
      for (let i = 0; i < 3; i++) g.cyl(0.022, 0.022, 0.32, i % 2 ? "#7a5634" : "#5a3d26", { y: 0.04, rz: Math.PI / 2, ry: i * 1.05 }, 6);
      for (let i = 0; i < 6; i++) g.sphere(0.035, i % 2 ? C.brasa : "#ffb347", { x: Math.cos(i * 2.2) * 0.06, y: 0.05, z: Math.sin(i * 2.2) * 0.06 }, 6, 5);
      g.lathe([[0, 0.1], [0.11, 0.11], [0.16, 0.18], [0.16, 0.27], [0.12, 0.32], [0.13, 0.34], [0.11, 0.34]], BARRO, {}, 14);
      g.cyl(0.12, 0.12, 0.02, BARRO_CLARO, { y: 0.345 }, 14);
      g.sphere(0.025, BARRO, { y: 0.37 }, 6, 4);
      for (const sg of [-1, 1]) g.torus(0.03, 0.01, BARRO, { x: sg * 0.16, y: 0.26, rz: Math.PI / 2 }, 3, 8);
      break;
    }
    case "cantaros": {
      // tres cántaros con asa en su repisa de madera; uno con su cazo
      g.box(0.5, 0.05, 0.42, MADERA, { y: 0.06 });
      for (const sx of [-1, 1]) g.box(0.05, 0.06, 0.4, MADERA_OSC, { x: sx * 0.22, y: 0.03 });
      for (const [x, z, h, a, c] of [[-0.12, -0.07, 0.42, 0.12, BARRO], [0.12, -0.05, 0.34, 0.1, BARRO_CLARO], [0.0, 0.12, 0.26, 0.085, "#a8744a"]] as [number, number, number, number, string][]) {
        g.lathe([[0, 0], [a * 0.55, 0.01], [a * 0.95, h * 0.3], [a, h * 0.5], [a * 0.7, h * 0.8], [a * 0.42, h * 0.9], [a * 0.48, h], [a * 0.36, h]], c, { x, y: 0.085, z }, 12);
        g.torus(a * 0.45, 0.012, c, { x: x + a * 0.85, y: 0.085 + h * 0.62, z, rz: Math.PI / 2 }, 4, 8);
        g.torus(a * 0.9, 0.006, "#7a3f22", { x, y: 0.085 + h * 0.45, z, rx: Math.PI / 2 }, 3, 12);
      }
      g.cyl(0.006, 0.006, 0.2, MADERA_OSC, { x: -0.07, y: 0.6, z: -0.07, rz: 0.5 }, 4);
      break;
    }
    case "baul": {
      // el baúl de acacia con la tapa en arco, las bandas de bronce, las argollas y sus patas
      const w = W - 0.16, d = D - 0.18;
      g.box(w, 0.3, d, MADERA_OSC, { y: 0.21 });
      g.add(new THREE.CylinderGeometry(d / 2, d / 2, w, 16, 1, false, 0, Math.PI), MADERA, { y: 0.36, rz: Math.PI / 2, sx: 0.7 });
      // dos bandas de bronce a los lados; la chapa de la cerradura, sobre la madera del medio (nada en forma de cruz)
      for (const t of [-0.34, 0.34]) {
        brillo.box(0.04, 0.31, d + 0.01, C.bronce, { x: t * w, y: 0.21 });
        brillo.add(new THREE.TorusGeometry(d / 2 + 0.005, 0.012, 3, 12, Math.PI), C.bronce, { x: t * w, y: 0.36, ry: Math.PI / 2, sy: 0.7 });
      }
      for (const sx of [-1, 1]) brillo.torus(0.04, 0.009, C.bronceOsc, { x: sx * (w / 2 + 0.01), y: 0.26, ry: Math.PI / 2 }, 3, 10);
      brillo.box(0.08, 0.1, 0.02, C.oroOsc, { y: 0.32, z: d / 2 + 0.01 });
      for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) g.box(0.07, 0.06, 0.07, MADERA_OSC, { x: sx * (w / 2 - 0.05), y: 0.03, z: sz * (d / 2 - 0.05) });
      break;
    }
    case "lecho-cobertor": {
      // la cama ancha de cedro: cabecera en arco, cuatro postes, el colchón, el cobertor de franjas de colores y dos almohadas
      g.box(W - 0.06, 0.14, D - 0.06, MADERA, { y: 0.18 });
      for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
        const x = sx * (W / 2 - 0.05), z = sz * (D / 2 - 0.05);
        g.cyl(0.035, 0.04, sx < 0 ? 0.72 : 0.4, MADERA_OSC, { x, y: sx < 0 ? 0.36 : 0.2, z }, 8);
        g.sphere(0.045, MADERA_OSC, { x, y: sx < 0 ? 0.73 : 0.41, z }, 8, 6);
      }
      g.box(0.05, 0.32, D - 0.14, MADERA_OSC, { x: -W / 2 + 0.05, y: 0.44 });
      g.add(new THREE.CylinderGeometry(0.28, 0.28, 0.05, 16, 1, false, 0, Math.PI), MADERA, { x: -W / 2 + 0.05, y: 0.6, rz: Math.PI / 2 });
      g.box(W - 0.14, 0.12, D - 0.14, LINO, { y: 0.31 });
      const colores = ["#a33a2c", "#e2c27a", "#27468f", "#e2c27a", "#7a8a4a", "#e2c27a", "#a33a2c"];
      const ancho = (W * 0.66) / colores.length;
      colores.forEach((c, i) => g.box(ancho + 0.002, 0.04, D - 0.08, c, { x: -W * 0.12 + i * ancho, y: 0.385 }));
      g.box(W * 0.66, 0.012, D - 0.07, "#e8d9b0", { x: -W * 0.12 + ancho * 3, y: 0.364 });
      for (const sz of [-1, 1]) g.box(0.24, 0.09, D / 2 - 0.12, "#f5f1e6", { x: -W / 2 + 0.22, y: 0.41, z: sz * (D / 4 - 0.02) });
      g.box(0.18, 0.06, D - 0.2, "#8a2f3a", { x: W / 2 - 0.16, y: 0.42 });
      break;
    }
    case "tapiz": {
      // el bastidor de cedro y el tapiz de lana: cenefas, granadas bordadas, una vid y los flecos (nada en forma de cruz)
      // los postes terminan bajo la vara (no sobresalen por arriba)
      for (const sx of [-1, 1]) {
        g.box(0.06, 1.29, 0.06, MADERA_OSC, { x: sx * (W / 2 - 0.08), y: 0.645 });
        g.box(0.06, 0.05, 0.34, MADERA_OSC, { x: sx * (W / 2 - 0.08), y: 0.025 });
      }
      g.cyl(0.025, 0.025, W - 0.04, MADERA, { y: 1.3, rz: Math.PI / 2 }, 8);
      for (const sx of [-1, 1]) g.sphere(0.04, MADERA_OSC, { x: sx * (W / 2 - 0.01), y: 1.3 }, 8, 6);
      const tw = W - 0.3, th = 0.98;
      g.box(tw, th, 0.02, "#8a2a24", { y: 0.78 }, 0.03);
      g.box(tw - 0.08, th - 0.08, 0.022, "#27468f", { y: 0.78 });
      g.box(tw - 0.16, th - 0.16, 0.024, "#e8d9b0", { y: 0.78 });
      for (const fila of [0, 1])
        for (let i = 0; i < 3; i++) {
          const x = -tw / 2 + 0.2 + i * ((tw - 0.4) / 2), y = 0.62 + fila * 0.32;
          g.sphere(0.055, "#a33a2c", { x, y, z: 0.018, sz: 0.3 }, 8, 6);
          g.cone(0.025, 0.04, "#7a2a22", { x, y: y + 0.06, z: 0.018 }, 5);
          g.box(0.012, 0.06, 0.008, "#4f7a37", { x: x - 0.05, y: y + 0.02, z: 0.018, rz: 0.6 });
        }
      g.box(tw - 0.2, 0.012, 0.026, "#4f7a37", { y: 0.78 });
      for (let i = 0; i < 16; i++) g.box(0.012, 0.07, 0.01, "#e2c27a", { x: -tw / 2 + 0.04 + i * ((tw - 0.08) / 15), y: 0.255 });
      break;
    }
    // ---- las piezas de los edificios (no se venden)
    case "atril": {
      // pie de cedro y la tabla inclinada con el rollo abierto
      g.box(0.1, 0.95, 0.1, MADERA_OSC, { y: 0.475 });
      g.box(0.36, 0.04, 0.3, MADERA_OSC, { y: 0.02 });
      g.box(0.5, 0.035, 0.36, MADERA, { y: 1.0, rx: -0.42 });
      g.box(0.42, 0.012, 0.26, "#efe1bd", { y: 1.03, z: 0.01, rx: -0.42 });
      for (const sx of [-1, 1]) g.cyl(0.035, 0.035, 0.3, "#efe1bd", { x: sx * 0.22, y: 1.04, z: 0.01, rx: Math.PI / 2 - 0.42 }, 8);
      break;
    }
    case "trono": {
      // gradas, el asiento de marfil cubierto de oro, el respaldo redondo y dos leones junto a los brazos
      g.box(W - 0.02, 0.12, D - 0.02, C.piedraClara, { y: 0.06 });
      g.box(W - 0.24, 0.12, D - 0.3, C.piedraOsc, { y: 0.18, z: -0.06 });
      g.box(W - 0.46, 0.12, D - 0.58, C.piedraClara, { y: 0.3, z: -0.14 });
      brillo.box(0.62, 0.42, 0.52, C.oro, { y: 0.57, z: -0.18 });
      g.box(0.56, 0.06, 0.46, "#f3ead6", { y: 0.8, z: -0.16 });
      brillo.box(0.62, 0.95, 0.1, C.oro, { y: 1.15, z: -0.42 });
      brillo.cyl(0.31, 0.31, 0.1, C.oro, { y: 1.62, z: -0.42, rx: Math.PI / 2 }, 16);
      g.box(0.5, 0.7, 0.04, C.purpura, { y: 1.12, z: -0.36 });
      for (const sx of [-1, 1]) {
        brillo.box(0.08, 0.2, 0.46, C.oroOsc, { x: sx * 0.34, y: 0.86, z: -0.16 });
        // un león echado junto al brazo
        brillo.sphere(0.13, C.oroOsc, { x: sx * 0.52, y: 0.5, z: 0.0, sx: 0.9, sy: 0.8, sz: 1.3 }, 8, 6);
        brillo.sphere(0.1, C.oroOsc, { x: sx * 0.52, y: 0.64, z: 0.15 }, 8, 6);
      }
      break;
    }
    case "columna": {
      g.box(0.5, 0.18, 0.5, C.piedraClara, { y: 0.09 });
      g.cyl(0.17, 0.2, 2.5, C.cedro, { y: 1.42 }, 12);
      brillo.box(0.46, 0.16, 0.46, C.oroOsc, { y: 2.74 });
      g.box(0.56, 0.1, 0.56, C.cedroOsc, { y: 2.87 });
      break;
    }
    case "pupitre": {
      g.box(W - 0.14, 0.05, D - 0.2, MADERA, { y: 0.56 });
      patas(g, W - 0.2, D - 0.26, 0.54, MADERA_OSC);
      for (let i = 0; i < 3; i++) g.cyl(0.05, 0.05, 0.28, "#efe1bd", { x: 0.32 + i * 0.12, y: 0.62, z: -0.05, rx: Math.PI / 2 }, 8);
      g.box(0.46, 0.008, 0.3, "#efe1bd", { x: -0.25, y: 0.59 });
      vasija(g, 0.07, 0.04, "#2a1d12", { x: 0.05, z: 0.08 });
      g.cyl(0.006, 0.006, 0.2, "#d9c49a", { x: 0.08, y: 0.68, z: 0.08, rz: 0.4 }, 4);
      break;
    }
    case "olla": {
      // tres piedras, las brasas y la olla grande de bronce
      for (let i = 0; i < 3; i++) {
        const a = (i / 3) * Math.PI * 2;
        g.sphere(0.09, PIEDRA, { x: Math.cos(a) * 0.17, y: 0.06, z: Math.sin(a) * 0.17 }, 6, 5);
      }
      for (let i = 0; i < 5; i++) g.sphere(0.04, i % 2 ? C.brasa : "#ffb347", { x: Math.cos(i * 2.4) * 0.06, y: 0.05, z: Math.sin(i * 2.4) * 0.06 }, 6, 5);
      brillo.lathe([[0, 0.12], [0.16, 0.13], [0.24, 0.24], [0.25, 0.36], [0.22, 0.44], [0.23, 0.46], [0.2, 0.46]], C.bronce, {}, 14);
      g.cyl(0.19, 0.19, 0.02, "#8a6a3a", { y: 0.43 }, 14);
      break;
    }
    // ---- las salas en ruinas: lo que se quita al restaurarlas (shared/restauracion.ts)
    case "escombros": {
      // un montón de piedras y tierra del techo caído
      g.add(new THREE.IcosahedronGeometry(0.24, 0), "#9c8f78", { y: 0.1, sx: 1.3, sy: 0.55, sz: 1.1 });
      for (const [x, z, r] of [[-0.14, 0.1, 0.09], [0.15, -0.06, 0.08], [0.02, -0.16, 0.07], [0.17, 0.14, 0.06], [-0.18, -0.12, 0.06]] as [number, number, number][])
        g.add(new THREE.IcosahedronGeometry(r, 0), PIEDRA, { x, y: r * 0.6, z, ry: x * 9 });
      g.box(0.22, 0.04, 0.05, MADERA_OSC, { x: -0.05, y: 0.2, z: 0.05, ry: 0.6, rz: 0.2 });
      break;
    }
    case "viga-caida": {
      // una viga del techo tirada en diagonal, con un poco de tierra
      g.box(W - 0.15, 0.13, 0.15, MADERA_OSC, { y: 0.09, ry: 0.22, rz: 0.06 });
      g.add(new THREE.IcosahedronGeometry(0.12, 0), "#9c8f78", { x: W / 2 - 0.25, y: 0.05, z: 0.12, sy: 0.5 });
      g.add(new THREE.IcosahedronGeometry(0.09, 0), PIEDRA, { x: -W / 2 + 0.3, y: 0.05, z: -0.1 });
      break;
    }
    case "estante-roto": {
      // el estante caído hacia atrás, con dos tablas sueltas en el piso
      g.box(0.05, 1.1, 0.26, MADERA_OSC, { x: -(W / 2 - 0.1), y: 0.5, z: -0.06, rz: -0.35 });
      g.box(0.05, 0.7, 0.26, MADERA_OSC, { x: W / 2 - 0.12, y: 0.32, z: -0.06, rz: 0.2 });
      g.box(W - 0.3, 0.04, 0.26, MADERA, { y: 0.4, z: -0.05, rz: -0.25 });
      g.box(W * 0.45, 0.03, 0.2, MADERA, { x: 0.15, y: 0.02, z: 0.16, ry: 0.4 });
      g.box(W * 0.35, 0.03, 0.18, MADERA, { x: -0.25, y: 0.02, z: 0.12, ry: -0.3 });
      break;
    }
    case "vasija-rota": {
      // pedazos de barro en el piso (se camina por encima)
      for (const [x, z, ry] of [[-0.12, 0.05, 0.3], [0.1, -0.08, 1.2], [0.05, 0.14, 2.1], [-0.08, -0.15, 2.8]] as [number, number, number][])
        g.sphere(0.09, BARRO, { x, y: 0.02, z, ry, sy: 0.35 }, 7, 4, Math.PI, Math.PI / 2);
      g.cyl(0.07, 0.1, 0.12, BARRO_CLARO, { x: 0.02, y: 0.06, z: -0.02, rz: 1.3 }, 8, true);
      break;
    }
    case "rollos-tirados": {
      for (const [x, z, ry] of [[-0.1, 0.05, 0.4], [0.12, -0.06, -0.8], [0.0, 0.16, 1.5]] as [number, number, number][]) {
        g.cyl(0.04, 0.04, 0.26, "#efe1bd", { x, y: 0.04, z, rx: Math.PI / 2, rz: ry }, 8);
        g.cyl(0.012, 0.012, 0.32, MADERA_OSC, { x, y: 0.04, z, rx: Math.PI / 2, rz: ry }, 5);
      }
      g.box(0.16, 0.03, 0.11, "#b89a72", { x: 0.12, y: 0.015, z: 0.14, ry: 0.5 });
      break;
    }
    case "polvo": {
      // manchas de tierra y polvo en el piso
      g.cyl(W * 0.42, W * 0.42, 0.01, "#9a8566", { y: 0.006, sx: 1, sz: 0.8 }, 14);
      g.cyl(W * 0.22, W * 0.22, 0.012, "#8a7556", { x: 0.2, y: 0.008, z: -0.15 }, 10);
      g.cyl(W * 0.16, W * 0.16, 0.012, "#a89274", { x: -0.25, y: 0.008, z: 0.22 }, 10);
      break;
    }
    // ---- lo que se pone al restaurarlas
    case "arpa": {
      // el arpa de los levitas: marco en triángulo con sus cuerdas, sobre su pie
      g.box(0.22, 0.06, 0.18, MADERA_OSC, { y: 0.03 });
      g.box(0.05, 0.8, 0.05, MADERA, { x: -0.1, y: 0.45, rz: 0.08 });
      g.box(0.05, 0.62, 0.05, MADERA, { x: 0.06, y: 0.4, rz: -0.38 });
      g.box(0.3, 0.05, 0.05, MADERA, { x: -0.02, y: 0.82, rz: -0.25 });
      for (let i = 0; i < 6; i++) brillo.box(0.006, 0.42 + i * 0.05, 0.006, "#e8d9a8", { x: -0.07 + i * 0.03, y: 0.36 + i * 0.03 });
      break;
    }
    case "pila": {
      // la fuente de bronce con su base, llena de agua (Éxodo 30:18)
      brillo.lathe([[0, 0], [0.16, 0], [0.13, 0.06], [0.07, 0.12], [0.06, 0.42], [0.1, 0.46]], C.bronceOsc, {}, 14);
      brillo.lathe([[0.06, 0.46], [0.24, 0.5], [0.3, 0.62], [0.31, 0.7], [0.27, 0.7]], C.bronce, {}, 18);
      g.cyl(0.27, 0.27, 0.02, C.agua, { y: 0.67 }, 18);
      break;
    }
    case "pozo-patio": {
      // brocal de piedra, el agua, dos postes y la roldana
      g.cyl(0.44, 0.48, 0.55, PIEDRA, { y: 0.275 }, 16, true);
      g.cyl(0.4, 0.4, 0.02, C.agua, { y: 0.4 }, 16);
      g.cyl(0.46, 0.46, 0.06, C.piedraClara, { y: 0.56 }, 16);
      for (const sx of [-1, 1]) g.box(0.07, 0.9, 0.07, MADERA_OSC, { x: sx * 0.42, y: 1.0 });
      g.box(0.92, 0.07, 0.07, MADERA_OSC, { y: 1.45 });
      g.cyl(0.07, 0.07, 0.12, MADERA, { y: 1.36, rz: Math.PI / 2 }, 10);
      vasija(g, 0.16, 0.08, BARRO, { x: 0.18, z: 0.3 });
      break;
    }
    case "sacos": {
      // dos sacos de grano atados y uno abierto
      for (const [x, z] of [[-0.09, -0.05], [0.1, 0.03]] as [number, number][]) {
        g.sphere(0.15, "#c9b48a", { x, y: 0.17, z, sy: 1.3 }, 10, 8);
        g.cyl(0.05, 0.07, 0.07, "#b39a6e", { x, y: 0.38, z }, 8);
      }
      g.cyl(0.1, 0.12, 0.16, "#d4bf94", { x: 0.0, y: 0.08, z: 0.16 }, 10, true);
      g.cyl(0.095, 0.095, 0.01, "#e8d7a0", { x: 0.0, y: 0.15, z: 0.16 }, 10);
      break;
    }
    default:
      g.box(W * 0.7, 0.4, D * 0.7, MADERA, { y: 0.2 });
  }
  return meshPair(g, brillo);
}
