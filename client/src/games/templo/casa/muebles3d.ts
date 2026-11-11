/**
 * Los muebles de la casa por dentro, dibujados en código (shared/casa-interior.ts): cada uno es un
 * grupo con su base en y = 0 y centrado en las celdas que ocupa sin girar (ancho × fondo).
 * Nada aquí parece una cruz ni el candelero del templo: el candelero de casa es una sola lámpara
 * en lo alto de su pie.
 */
import * as THREE from "three";
import { C, GeoBuilder, meshPair } from "../three/builder";
import { CELDA, pieza } from "@shared/casa-interior";

const MADERA = "#8a5a32";
const MADERA_OSC = "#5e3a1f";
const BARRO = "#b8673e";
const BARRO_CLARO = "#c98a5a";
const LINO = "#ece3cf";
const PIEDRA = "#8f8a82";

/** Dónde queda la llama de cada mueble que alumbra (para su luz y su brillo). */
export const LLAMA: Record<string, number> = { "lampara-casa": 0.42, candelero: 1.22, brasero: 0.5, olla: 0.18 };

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

/** Arma un mueble. Devuelve null si no existe. */
export function construirMueble(id: string): THREE.Group | null {
  const mu = pieza(id);
  if (!mu) return null;
  const W = mu.w * CELDA, D = mu.d * CELDA;
  const g = new GeoBuilder();
  const brillo = new GeoBuilder();
  switch (id) {
    case "estera": {
      g.box(W - 0.06, 0.02, D - 0.08, "#c9a96a", { y: 0.01 }, 0.06);
      for (let i = -2; i <= 2; i++) g.box(W - 0.1, 0.022, 0.025, "#a8874c", { y: 0.012, z: i * (D / 6) });
      break;
    }
    case "alfombra": {
      g.box(W - 0.04, 0.014, D - 0.04, "#c98a2b", { y: 0.007 });
      g.box(W - 0.16, 0.018, D - 0.16, "#a33a2c", { y: 0.009 }, 0.04);
      g.box(0.34, 0.02, 0.34, "#e2c27a", { y: 0.011, ry: Math.PI / 4 });
      g.box(0.18, 0.022, 0.18, "#27468f", { y: 0.012, ry: Math.PI / 4 });
      break;
    }
    case "cojines": {
      g.sphere(0.2, "#8a2f3a", { x: -0.06, y: 0.09, z: -0.04, sy: 0.45 });
      g.sphere(0.17, "#c98a2b", { x: 0.09, y: 0.08, z: 0.08, sy: 0.45 });
      g.sphere(0.12, "#27468f", { x: 0.02, y: 0.19, z: 0.0, sy: 0.5 });
      break;
    }
    case "mesa": {
      g.box(W - 0.12, 0.06, D - 0.16, MADERA, { y: 0.38 });
      patas(g, W - 0.18, D - 0.22, 0.35, MADERA_OSC);
      vasija(g, 0.16, 0.07, BARRO_CLARO, { x: 0.2, z: 0 });
      g.cyl(0.11, 0.11, 0.025, "#d9a95a", { x: -0.2, y: 0.425 });
      break;
    }
    case "silla": {
      g.box(0.4, 0.05, 0.4, MADERA, { y: 0.42 });
      patas(g, 0.4, 0.4, 0.42, MADERA_OSC);
      g.box(0.4, 0.42, 0.05, MADERA, { y: 0.66, z: -0.18 });
      g.box(0.32, 0.03, 0.3, "#7a8a4a", { y: 0.46 });
      break;
    }
    case "lecho": {
      g.box(W - 0.08, 0.24, D - 0.08, MADERA, { y: 0.12 });
      g.box(W - 0.14, 0.12, D - 0.14, LINO, { y: 0.3 });
      g.box(W * 0.55, 0.13, D - 0.12, "#7a8a4a", { x: W * 0.17, y: 0.31 }, 0.04);
      g.box(0.26, 0.09, D - 0.26, "#f5f1e6", { x: -W / 2 + 0.22, y: 0.39 });
      g.box(0.06, 0.4, D - 0.08, MADERA_OSC, { x: -W / 2 + 0.07, y: 0.2 });
      break;
    }
    case "arcon": {
      g.box(0.5, 0.36, 0.38, MADERA_OSC, { y: 0.18 });
      g.box(0.52, 0.06, 0.4, MADERA, { y: 0.39 });
      brillo.box(0.53, 0.035, 0.41, C.bronce, { y: 0.27 });
      brillo.box(0.07, 0.08, 0.02, C.oroOsc, { y: 0.3, z: 0.2 });
      break;
    }
    case "tinaja": {
      vasija(g, 0.62, 0.21, BARRO);
      g.cyl(0.075, 0.075, 0.012, C.agua, { y: 0.6 });
      break;
    }
    case "vasijas": {
      vasija(g, 0.42, 0.13, BARRO_CLARO, { x: -0.1, z: -0.06 });
      vasija(g, 0.3, 0.1, BARRO, { x: 0.12, z: 0.02 });
      vasija(g, 0.22, 0.08, "#a8744a", { x: -0.02, z: 0.14 });
      break;
    }
    case "cesta": {
      g.lathe([[0, 0], [0.16, 0.01], [0.2, 0.08], [0.22, 0.16], [0.2, 0.16]], "#b08a4a", {}, 14);
      for (const [x, z, c, r] of [[-0.06, -0.04, "#5b2a6e", 0.06], [0.07, 0.02, "#6f7a3a", 0.06], [0.0, 0.08, "#a33a2c", 0.07], [-0.08, 0.07, "#5b2a6e", 0.05]] as [number, number, string, number][])
        g.sphere(r, c, { x, y: 0.17, z }, 8, 6);
      break;
    }
    case "planta": {
      g.lathe([[0, 0], [0.13, 0.0], [0.15, 0.2], [0.17, 0.22], [0.0, 0.22]], BARRO, {}, 12);
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        g.cone(0.07, 0.3, i % 2 ? C.hoja : C.hojaClara, { x: Math.cos(a) * 0.06, y: 0.36, z: Math.sin(a) * 0.06, rx: Math.sin(a) * 0.35, rz: -Math.cos(a) * 0.35 }, 6);
      }
      break;
    }
    case "lampara-casa": {
      g.box(0.32, 0.3, 0.32, MADERA, { y: 0.15 });
      g.sphere(0.09, BARRO_CLARO, { y: 0.35, sy: 0.45 }, 10, 6);
      g.box(0.08, 0.03, 0.03, BARRO_CLARO, { x: 0.09, y: 0.36 });
      g.cone(0.025, 0.07, "#ffd36b", { x: 0.12, y: 0.41 }, 6);
      break;
    }
    case "candelero": {
      g.cyl(0.16, 0.18, 0.05, MADERA_OSC, { y: 0.025 });
      brillo.cyl(0.025, 0.035, 1.05, C.bronce, { y: 0.58 }, 8);
      brillo.cyl(0.09, 0.05, 0.05, C.bronce, { y: 1.12 }, 10);
      g.sphere(0.08, BARRO_CLARO, { y: 1.17, sy: 0.45 }, 10, 6);
      g.cone(0.025, 0.07, "#ffd36b", { x: 0.07, y: 1.22 }, 6);
      break;
    }
    case "molino": {
      g.cyl(0.24, 0.26, 0.12, PIEDRA, { y: 0.06 }, 14);
      g.cyl(0.21, 0.22, 0.1, "#a39d94", { y: 0.17 }, 14);
      g.cyl(0.02, 0.02, 0.18, MADERA_OSC, { x: 0.14, y: 0.3 }, 6);
      g.cone(0.08, 0.05, "#e9dcc0", { x: -0.2, y: 0.03, z: 0.18 }, 8);
      break;
    }
    case "banco-cedro": {
      g.box(W - 0.12, 0.06, 0.34, MADERA, { y: 0.4 });
      g.box(0.06, 0.37, 0.3, MADERA_OSC, { x: -(W / 2 - 0.16), y: 0.185 });
      g.box(0.06, 0.37, 0.3, MADERA_OSC, { x: W / 2 - 0.16, y: 0.185 });
      break;
    }
    case "mesa-pan": {
      g.box(W - 0.12, 0.06, D - 0.16, MADERA, { y: 0.38 });
      patas(g, W - 0.18, D - 0.22, 0.35, MADERA_OSC);
      for (const [x, z] of [[-0.32, -0.05], [-0.1, 0.06], [0.12, -0.04], [0.32, 0.05]]) g.cyl(0.1, 0.1, 0.04, "#d9a95a", { x, y: 0.43, z }, 12);
      g.cyl(0.08, 0.08, 0.035, "#c98a3a", { x: -0.2, y: 0.47, z: 0.0 }, 12);
      break;
    }
    case "telar-casa": {
      for (const sx of [-1, 1]) g.box(0.07, 1.45, 0.07, MADERA_OSC, { x: sx * (W / 2 - 0.12), y: 0.725 });
      g.box(W - 0.16, 0.07, 0.07, MADERA, { y: 1.42 });
      g.box(W - 0.2, 0.06, 0.08, MADERA, { y: 0.28 });
      for (let i = 0; i < 9; i++) g.box(0.012, 1.08, 0.012, LINO, { x: -(W / 2 - 0.25) + i * ((W - 0.5) / 8), y: 0.86 });
      g.box(W - 0.32, 0.4, 0.02, "#27468f", { y: 0.52 }, 0.05);
      g.box(W - 0.32, 0.08, 0.022, "#b3242f", { y: 0.62 });
      for (let i = 0; i < 4; i++) g.sphere(0.035, PIEDRA, { x: -(W / 2 - 0.3) + i * ((W - 0.6) / 3), y: 0.12 }, 6, 5);
      break;
    }
    case "palomar": {
      g.box(0.46, 0.5, 0.42, MADERA, { y: 0.25 });
      g.box(0.5, 0.05, 0.48, MADERA_OSC, { y: 0.53, rz: 0.12 });
      for (const [x, y] of [[-0.12, 0.34], [0.12, 0.34], [0, 0.16]]) g.box(0.12, 0.1, 0.02, "#2a1d12", { x, y, z: 0.215 });
      g.sphere(0.07, "#f2f0ea", { x: 0.05, y: 0.62, z: 0.02, sx: 1.4 }, 8, 6);
      g.sphere(0.035, "#f2f0ea", { x: 0.15, y: 0.66, z: 0.02 }, 6, 5);
      break;
    }
    case "estante": {
      for (const sx of [-1, 1]) g.box(0.05, 1.25, 0.3, MADERA_OSC, { x: sx * (W / 2 - 0.08), y: 0.625 });
      for (const y of [0.05, 0.45, 0.85, 1.22]) g.box(W - 0.14, 0.04, 0.3, MADERA, { y });
      for (const [y, n] of [[0.52, 4], [0.92, 3], [0.12, 2]] as [number, number][])
        for (let i = 0; i < n; i++) {
          const x = -(W / 2 - 0.28) + i * 0.22;
          g.cyl(0.05, 0.05, 0.24, "#efe1bd", { x, y: y + 0.03, rx: Math.PI / 2 }, 8);
          g.cyl(0.015, 0.015, 0.3, MADERA_OSC, { x, y: y + 0.03, rx: Math.PI / 2 }, 5);
        }
      break;
    }
    case "brasero": {
      for (let i = 0; i < 3; i++) {
        const a = (i / 3) * Math.PI * 2;
        brillo.box(0.03, 0.3, 0.03, C.bronceOsc, { x: Math.cos(a) * 0.15, y: 0.15, z: Math.sin(a) * 0.15 });
      }
      brillo.lathe([[0, 0], [0.12, 0.0], [0.22, 0.1], [0.24, 0.14], [0.22, 0.14]], C.bronce, { y: 0.28 }, 14);
      for (let i = 0; i < 7; i++) {
        const a = i * 2.4;
        g.sphere(0.045, i % 2 ? "#ff7a1a" : "#ffb347", { x: Math.cos(a) * 0.09 * (i % 3), y: 0.44, z: Math.sin(a) * 0.09 * (i % 3) }, 6, 5);
      }
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
