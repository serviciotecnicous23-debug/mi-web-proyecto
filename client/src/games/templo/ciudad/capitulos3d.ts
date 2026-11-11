/**
 * Lo que se ve en la ciudad de la historia de la temporada (shared/capitulos.ts; las cuentas las da el servidor):
 * - Capítulo 1: las tres torres nuevas del muro del oriente, que suben con la meta de toda la ciudad.
 * - Capítulo 2: el conducto de Ezequías, de la fuente de Gihón al estanque de Siloé. Las estacas marcan por dónde irá;
 *   la zanja avanza con la meta y el agua la sigue; cuando se cumple, el estanque se llena.
 * - Capítulo 3: el campamento de los asirios en el monte, el Rabsaces gritando frente a la puerta (con palabras de
 *   2 Reyes 18), el rey Ezequías orando arriba de la escalinata y el pueblo que ora al pie (más gente cuanto más
 *   avanza la meta).
 * - Capítulo 4: el campamento vacío y la plaza de fiesta; en la fiesta, los cantores en la escalinata y el pueblo
 *   que alaba.
 * Todo se dibuja con figuras simples unidas en pocas mallas, como el resto de la ciudad. Nada con forma de cruz.
 */
import * as THREE from "three";
import { C, GeoBuilder } from "../three/builder";
import { Crowd, Figure, leviteColors, newRig, randomVisitor, type CrowdHandle, type Pose, type Rig } from "../three/characters";
import { jar } from "../three/structures";
import type { Overlay } from "../three/overlay";
import { alturaTerreno, liberar, meshes } from "./escenario";
import * as P from "./plano";
import type { CapitulosVista } from "@shared/capitulos";

const Y = P.SUELO;

/** Lo que hay que dibujar, sacado de lo que dice el servidor. */
export type EstadoHistoria = {
  /** Avance de las torres (0 a 1). */
  torres: number;
  /** Avance del conducto (0 a 1) y si ya llegó el agua al estanque. */
  canal: number;
  canalLleno: boolean;
  /** Si el capítulo 2 ya empezó (antes, solo se ven las estacas). */
  canalAbierto: boolean;
  /** El ejército de Asiria: no está, acampa frente a la ciudad (capítulo 3) o se fue (capítulo 4). */
  amenaza: "no" | "acampa" | "vacio";
  /** Avance de la oración de la ciudad (capítulo 3), o -1 si no es esa semana. */
  oracion: number;
  fiesta: "no" | "semana" | "fiesta" | "vivo";
};

const avance = (c: { meta: number | null; puntos: number; cumplido: boolean } | undefined) =>
  !c ? 0 : c.cumplido ? 1 : c.meta ? Math.max(0, Math.min(1, c.puntos / c.meta)) : 0;

export function estadoDeHistoria(v: CapitulosVista | null): EstadoHistoria {
  const nada: EstadoHistoria = { torres: 0, canal: 0, canalLleno: false, canalAbierto: false, amenaza: "no", oracion: -1, fiesta: "no" };
  if (!v) return nada;
  const c = (n: number) => v.capitulos.find((x) => x.n === n);
  const hoy = v.hoy?.n ?? 0;
  return {
    torres: avance(c(1)),
    canal: avance(c(2)),
    canalLleno: !!c(2)?.cumplido,
    canalAbierto: (c(2)?.estado ?? "proximo") !== "proximo",
    amenaza: hoy === 3 ? "acampa" : hoy === 4 ? "vacio" : "no",
    oracion: hoy === 3 ? avance(c(3)) : -1,
    fiesta: hoy === 4 ? (v.fiesta.momento === "vivo" ? "vivo" : v.fiesta.momento === "fiesta" ? "fiesta" : "semana") : "no",
  };
}

// ---------------------------------------------------------------- utilidades
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function vary(rnd: () => number, hex: string, amt = 0.06): THREE.Color {
  const c = new THREE.Color(hex);
  const k = 1 + (rnd() - 0.5) * 2 * amt;
  c.r = Math.min(1, c.r * k);
  c.g = Math.min(1, c.g * k);
  c.b = Math.min(1, c.b * k);
  return c;
}

/** Largo del conducto y un punto a cierta distancia desde la fuente. */
const TRAMOS = P.CONDUCTO.slice(1).map((b, i) => {
  const a = P.CONDUCTO[i];
  return { a, b, largo: Math.hypot(b[0] - a[0], b[1] - a[1]) };
});
const LARGO_CONDUCTO = TRAMOS.reduce((s, t) => s + t.largo, 0);
function puntoDelConducto(d: number): { x: number; z: number; dir: number } {
  let resto = Math.max(0, Math.min(LARGO_CONDUCTO, d));
  for (const t of TRAMOS) {
    if (resto <= t.largo) {
      const k = resto / t.largo;
      return { x: t.a[0] + (t.b[0] - t.a[0]) * k, z: t.a[1] + (t.b[1] - t.a[1]) * k, dir: Math.atan2(t.b[0] - t.a[0], t.b[1] - t.a[1]) };
    }
    resto -= t.largo;
  }
  const u = TRAMOS[TRAMOS.length - 1];
  return { x: u.b[0], z: u.b[1], dir: Math.atan2(u.b[0] - u.a[0], u.b[1] - u.a[1]) };
}

// ---------------------------------------------------------------- las piezas
function construirTorres(f: number): THREE.Group {
  const g = new THREE.Group();
  const rnd = mulberry32(4101);
  const lado = P.TORRE_MEDIO * 2;
  P.TORRES_NUEVAS.forEach((zt, i) => {
    // cada torre en su malla: si tapa al jugador, se aclara solo ella (como las casas)
    const b = new GeoBuilder();
    const cerrar = () => {
      for (const m of meshes(g, b, null, true)) m.userData.ocluye = true;
    };
    const fi = Math.max(0, Math.min(1, f * P.TORRES_NUEVAS.length - i));
    const x = P.TORRE_X;
    // los cimientos se ven siempre: aquí se alzará una torre
    b.box(lado + 0.1, 0.9, lado + 0.1, C.piedraOsc, { x, y: Y + 0.45, z: zt });
    if (fi <= 0) {
      for (let k = 0; k < 5; k++) b.box(0.55, 0.35, 0.4, vary(rnd, C.piedra, 0.06), { x: x - P.TORRE_MEDIO - 1.2 - rnd() * 1.2, y: Y + 0.18, z: zt + (rnd() - 0.5) * 2.6, ry: rnd() * 1.5 });
      cerrar();
      return;
    }
    const h = 1.0 + 7.2 * fi;
    b.box(lado, h, lado, vary(rnd, "#dccfae", 0.03), { x, y: Y + h / 2, z: zt });
    // hiladas más oscuras, cada metro y medio (se ve que son piedras nuevas)
    for (let y = 1.5; y < h - 0.2; y += 1.5) b.box(lado + 0.04, 0.12, lado + 0.04, "#cbb98f", { x, y: Y + y, z: zt });
    if (fi >= 1) {
      // terminada: almenas, banda de piedra y troneras
      b.box(lado + 0.2, 0.3, lado + 0.2, C.piedraOsc, { x, y: Y + h + 0.15, z: zt });
      for (const dz of [-1.4, 0, 1.4]) for (const dx of [-1.55, 1.55]) b.box(0.7, 0.75, 0.7, C.piedraClara, { x: x + dx, y: Y + h + 0.68, z: zt + dz });
      for (const dx of [-0.5, 0.5]) for (const dz of [-1.55, 1.55]) b.box(0.7, 0.75, 0.7, C.piedraClara, { x: x + dx, y: Y + h + 0.68, z: zt + dz });
      for (const y of [h * 0.45, h * 0.75]) {
        b.box(0.06, 0.9, 0.24, "#2e2418", { x: x - P.TORRE_MEDIO - 0.02, y: Y + y, z: zt });
        b.box(0.06, 0.9, 0.24, "#2e2418", { x: x + P.TORRE_MEDIO + 0.02, y: Y + y, z: zt });
      }
    } else {
      // en obra: andamio de cedro del lado de la ciudad (postes y tablones entre ellos) y piedras listas al pie
      const ax = x - P.TORRE_MEDIO - 0.9;
      for (const dz of [-1.7, 1.7]) b.cyl(0.07, 0.08, h + 1.4, C.cedroOsc, { x: ax, y: Y + (h + 1.4) / 2, z: zt + dz }, 5);
      for (let y = 1.6; y < h + 0.8; y += 1.6) b.box(1.0, 0.08, 3.3, C.cedro, { x: ax + 0.25, y: Y + y, z: zt });
      for (let k = 0; k < 7; k++) b.box(0.55, 0.35, 0.4, vary(rnd, C.piedra, 0.06), { x: ax - 1.0 - rnd() * 1.3, y: Y + 0.18, z: zt + (rnd() - 0.5) * 2.8, ry: rnd() * 1.5 });
      b.cyl(0.26, 0.3, 0.42, "#8a6a42", { x: ax - 0.6, y: Y + 0.21, z: zt + 1.2 }, 8);
    }
    cerrar();
  });
  return g;
}

function construirConducto(f: number, abierto: boolean, lleno: boolean): THREE.Group {
  const g = new THREE.Group();
  const b = new GeoBuilder();
  const rnd = mulberry32(5303);
  const cavado = abierto ? f * LARGO_CONDUCTO : 0;
  let recorrido = 0;
  for (const t of TRAMOS) {
    const dir = Math.atan2(t.b[0] - t.a[0], t.b[1] - t.a[1]);
    const ux = (t.b[0] - t.a[0]) / t.largo, uz = (t.b[1] - t.a[1]) / t.largo;
    const hecho = Math.max(0, Math.min(t.largo, cavado - recorrido));
    if (hecho > 0.05) {
      const cx = t.a[0] + ux * (hecho / 2), cz = t.a[1] + uz * (hecho / 2);
      // la zanja con sus bordes de piedra (no estorba al caminar: va al ras del suelo) y el agua que ya corre
      b.box(0.66, 0.04, hecho, "#5e4c38", { x: cx, y: Y - 0.005, z: cz, ry: dir });
      for (const sg of [-1, 1]) b.box(0.16, 0.14, hecho + 0.02, vary(rnd, C.piedraOsc, 0.03), { x: cx + Math.cos(dir) * 0.41 * sg, y: Y + 0.05, z: cz - Math.sin(dir) * 0.41 * sg, ry: dir });
      b.box(0.62, 0.02, hecho, C.agua, { x: cx, y: Y + 0.03, z: cz, ry: dir });
      // losas que lo cruzan cada tanto (por ahí se pasa sin mojarse)
      for (let d = 3; d < hecho - 0.5; d += 6) b.box(1.1, 0.07, 0.7, vary(rnd, C.piedra, 0.05), { x: t.a[0] + ux * d, y: Y + 0.1, z: t.a[1] + uz * d, ry: dir });
    }
    // lo que falta: estacas a los dos lados, cada dos metros y medio
    for (let d = hecho + 1; d < t.largo; d += 2.5)
      for (const sg of [-1, 1]) b.cyl(0.035, 0.045, 0.5, C.cedro, { x: t.a[0] + ux * d + Math.cos(dir) * 0.45 * sg, y: Y + 0.25, z: t.a[1] + uz * d - Math.sin(dir) * 0.45 * sg }, 5);
    recorrido += t.largo;
  }
  // el frente de la obra: tierra sacada, un cesto y una lámpara
  if (abierto && f > 0 && f < 1) {
    const p = puntoDelConducto(cavado);
    b.add(new THREE.IcosahedronGeometry(0.55, 1), "#8a7350", { x: p.x + Math.cos(p.dir) * 1.0, y: Y + 0.15, z: p.z - Math.sin(p.dir) * 1.0, sy: 0.5 });
    b.cyl(0.24, 0.28, 0.36, "#8a6a42", { x: p.x - Math.cos(p.dir) * 0.95, y: Y + 0.18, z: p.z + Math.sin(p.dir) * 0.95 }, 8);
    jar(b, p.x - Math.cos(p.dir) * 0.9 + 0.5, Y, p.z + Math.sin(p.dir) * 0.9, 0.9);
  }
  // por donde entra el agua: un arco oscuro al pie del muro del oriente y su dintel
  const [ex, ez] = P.CONDUCTO[0];
  b.box(0.12, 0.95, 1.1, "#2a2018", { x: ex + 0.18, y: Y + 0.47, z: ez });
  b.box(0.3, 0.28, 1.6, C.piedraOsc, { x: ex + 0.1, y: Y + 1.08, z: ez });
  // la fuente de Gihón, afuera del muro: la peña y la losa que la cubre (2 Crónicas 32:30)
  const [gx, gz] = P.GIHON;
  const gy = alturaTerreno(gx, gz);
  for (let k = 0; k < 4; k++) b.add(new THREE.IcosahedronGeometry(1.0 + rnd() * 0.5, 0), vary(rnd, "#9c8f78", 0.08), { x: gx + (rnd() - 0.5) * 2.2, y: gy + 0.3, z: gz + (rnd() - 0.5) * 2.4, sy: 0.6 });
  b.box(1.8, 0.3, 1.8, C.piedraOsc, { x: gx, y: gy + 0.85, z: gz });
  // el estanque de Siloé: un pilón de piedra con gradas, seco hasta que llega el agua
  const [x0, z0, x1, z1] = P.ESTANQUE;
  const cx = (x0 + x1) / 2, cz = (z0 + z1) / 2, w = x1 - x0, d = z1 - z0;
  const borde = 0.6;
  b.box(w, borde, 0.3, vary(rnd, C.piedra, 0.03), { x: cx, y: Y + borde / 2, z: z0 + 0.15 });
  b.box(w, borde, 0.3, vary(rnd, C.piedra, 0.03), { x: cx, y: Y + borde / 2, z: z1 - 0.15 });
  b.box(0.3, borde, d, vary(rnd, C.piedra, 0.03), { x: x0 + 0.15, y: Y + borde / 2, z: cz });
  b.box(0.3, borde, d, vary(rnd, C.piedra, 0.03), { x: x1 - 0.15, y: Y + borde / 2, z: cz });
  for (const [sx, sz] of [[x0, z0], [x1, z0], [x0, z1], [x1, z1]] as [number, number][]) b.box(0.42, borde + 0.12, 0.42, C.piedraClara, { x: sx + (sx === x0 ? 0.15 : -0.15), y: Y + (borde + 0.12) / 2, z: sz + (sz === z0 ? 0.15 : -0.15) });
  // gradas por dentro (de afuera hacia el centro)
  for (let k = 1; k <= 2; k++) {
    const iw = w - 0.6 - k * 0.5, id = d - 0.6 - k * 0.5;
    b.box(iw + 0.5, 0.1, id + 0.5, k === 1 ? C.piedraClara : C.piedra, { x: cx, y: Y + borde - 0.15 * k, z: cz });
  }
  // gradas por fuera, del lado de la calle
  for (let k = 0; k < 2; k++) b.box(2.2, 0.15 * (k + 1), 0.4, vary(rnd, C.piedra, 0.04), { x: cx - 0.6, y: Y + 0.075 * (k + 1), z: z0 - 0.55 + k * 0.38 });
  if (lleno) b.box(w - 0.62, 0.04, d - 0.62, C.agua, { x: cx, y: Y + borde - 0.1, z: cz });
  else b.box(w - 0.62, 0.04, d - 0.62, "#8a7350", { x: cx, y: Y + 0.12, z: cz });
  // el caño por donde llega el conducto
  b.box(0.36, 0.14, 0.6, C.piedraOsc, { x: P.CONDUCTO[2][0], y: Y + borde - 0.05, z: z0 + 0.1 });
  jar(b, x1 + 0.35, Y, z0 - 0.4, 1.2);
  jar(b, x0 - 0.3, Y, z0 - 0.35, 1.0, "#a85f35");
  meshes(g, b, null, true);
  return g;
}

/** El campamento de los asirios en el monte, al oriente (las tiendas; de noche, sus fogatas). */
function construirCampamento(vacio: boolean): { grupo: THREE.Group; fogatas: THREE.Mesh | null } {
  const g = new THREE.Group();
  const b = new GeoBuilder();
  const s = new GeoBuilder();
  const rnd = mulberry32(7717);
  const TIENDAS = ["#5b4a3a", "#6e5a44", "#4a3c30", "#7a6a50", "#3f342a"];
  const fuegos = new GeoBuilder();
  let fogatas = 0;
  for (let i = 0; i < 46; i++) {
    const x = 118 + rnd() * 34, z = -50 + rnd() * 84;
    const y = alturaTerreno(x, z);
    const r = 1.3 + rnd() * 0.8, h = 2.1 + rnd() * 1.0;
    const color = vary(rnd, TIENDAS[i % TIENDAS.length], 0.06);
    if (vacio) {
      // se fueron de noche: las tiendas caídas y vacías, y de cada tres, una ya no está
      if (i % 3 === 0) continue;
      b.cone(r, h * 0.3, color, { x, y: y + 0.15, z, rz: (rnd() - 0.5) * 0.6, rx: (rnd() - 0.5) * 0.5 }, 8);
      continue;
    }
    if (i % 7 === 0) {
      // las tiendas grandes de los jefes, con su estandarte: un disco de bronce en lo alto de un asta
      b.cyl(r * 1.4, r * 1.4, h * 0.6, color, { x, y: y + h * 0.3, z }, 8);
      b.cone(r * 1.6, h * 0.7, vary(rnd, "#2f2620", 0.05), { x, y: y + h * 0.6 + h * 0.35, z }, 8);
      b.cyl(0.05, 0.06, 4.6, C.cedroOsc, { x: x - r * 1.8, y: y + 2.3, z }, 5);
      s.cyl(0.5, 0.5, 0.07, C.bronce, { x: x - r * 1.8, y: y + 4.9, z, rz: Math.PI / 2 }, 14);
    } else b.cone(r, h, color, { x, y: y + h / 2, z }, 8);
    if (i % 3 === 1) {
      const fx = x - r - 1.4, fz = z + (rnd() - 0.5) * 2;
      const fy = alturaTerreno(fx, fz);
      for (let k = 0; k < 6; k++) b.box(0.22, 0.14, 0.22, "#6b6258", { x: fx + Math.cos(k) * 0.45, y: fy + 0.07, z: fz + Math.sin(k) * 0.45 });
      fuegos.add(new THREE.IcosahedronGeometry(0.32, 1), "#ffb347", { x: fx, y: fy + 0.3, z: fz, sy: 1.4 });
      fogatas++;
    }
  }
  meshes(g, b, s, true);
  let fogatasMesh: THREE.Mesh | null = null;
  if (fogatas) {
    fogatasMesh = new THREE.Mesh(fuegos.build(), new THREE.MeshBasicMaterial({ vertexColors: true, toneMapped: false }));
    fogatasMesh.visible = false;
    g.add(fogatasMesh);
  }
  return { grupo: g, fogatas: fogatasMesh };
}

/** La plaza de fiesta: el arco de ramas sobre la puerta, el toldo sobre el púlpito y cántaros con palmas. */
function construirFiesta(): THREE.Group {
  const g = new THREE.Group();
  const b = new GeoBuilder();
  const rnd = mulberry32(9131);
  // la guirnalda de ramas de olivo y flores colgada por dentro de la puerta (cae en curva, sin estorbar el paso)
  const gx = P.MURO_ORIENTE - 1.5, alto = Y + 4.5, cae = 0.35;
  const arco = new THREE.TorusGeometry(P.PUERTA.half, 0.2, 6, 20, Math.PI);
  b.add(arco, "#5f7a3a", { x: gx, y: alto, z: 0, rz: Math.PI, ry: Math.PI / 2, sy: cae });
  for (let k = 0; k <= 8; k++) {
    const a = (k / 8) * Math.PI;
    b.sphere(0.16, ["#e8c56a", "#e0782f", "#f2efe6", "#c9455a"][k % 4], { x: gx - 0.15, y: alto - Math.sin(a) * P.PUERTA.half * cae, z: Math.cos(a) * P.PUERTA.half }, 6, 5);
  }
  // el toldo de colores sobre el púlpito (cuatro postes y la tela; Nehemías 8:4 habla del púlpito)
  const [ux, uz] = P.PULPITO;
  for (const dx of [-1.75, 1.75]) for (const dz of [-1.25, 1.25]) b.cyl(0.06, 0.07, 3.3, C.cedroOsc, { x: ux + dx, y: Y + 1.65, z: uz + dz }, 6);
  const telas = ["#c9455a", "#e8c56a", "#2f6fb8", "#f2efe6"];
  for (let k = 0; k < 4; k++) b.box(0.9, 0.06, 2.7, telas[k], { x: ux - 1.35 + k * 0.9, y: Y + 3.32 + (k % 2) * 0.05, z: uz });
  // cántaros con ramas de palmera alrededor de la plaza
  const lugares: [number, number][] = [[50.5, -10.8], [66.0, -10.8], [70.6, -5.0], [70.6, 5.0], [45.6, -9.6]];
  for (const [x, z] of lugares) {
    jar(b, x, Y, z, 1.6, "#b8673a");
    for (let k = 0; k < 5; k++) {
      const a = (k / 5) * Math.PI * 2 + rnd();
      b.cone(0.09, 1.5, vary(rnd, C.hoja, 0.1), { x: x + Math.cos(a) * 0.25, y: Y + 1.25, z: z + Math.sin(a) * 0.25, rx: Math.sin(a) * 0.45, rz: -Math.cos(a) * 0.45 }, 4);
    }
  }
  meshes(g, b, null, true);
  return g;
}

// ---------------------------------------------------------------- la escena
type Persona = { handle: CrowdHandle; rig: Rig; hace: "ora" | "alaba" | "canta" | "cava" };
type Etiqueta = { el: HTMLDivElement; p: THREE.Vector3; r: number };

/** Lo que grita el Rabsaces (2 Reyes 18, RVR1960). */
const GRITOS: { text: string; ref: string }[] = [
  { text: "¿Qué confianza es esta en que te apoyas?", ref: "2 Reyes 18:19" },
  { text: "No os engañe Ezequías, porque no os podrá librar de mi mano.", ref: "2 Reyes 18:29" },
  { text: "¿Qué dios de todos los dioses de estas tierras ha librado su tierra de mi mano, para que Jehová libre de mi mano a Jerusalén?", ref: "2 Reyes 18:35" },
];

/** Lo que hay en la plaza (el pozo, el púlpito, el tablero, las antorchas y los puestos): la gente de la fiesta no se para encima. */
const ESTORBOS_PLAZA: [number, number, number][] = [
  [P.POZO[0], P.POZO[1], 1.9], [P.PULPITO[0], P.PULPITO[1], 2.7], [P.ANUNCIOS[0], P.ANUNCIOS[1], 1.3],
  [52.6, 3.2, 0.9], [59.4, 3.2, 0.9], [56, -0.4, 0.9], [48, 0, 0.9], [64, 0, 0.9], [69, 2.4, 0.9], [69, -2.4, 0.9], [54.6, -8.6, 0.9], [61.4, -8.6, 0.9], [46.5, 5.5, 0.9], [46.5, -5.5, 0.9],
  ...P.PUESTOS.map(([x, z]) => [x, z, 1.8] as [number, number, number]),
];

/** Donde se arrodilla el pueblo a orar, al pie de la escalinata (sin tapar el camino del medio ni las antorchas). */
const LUGARES_ORACION: [number, number][] = [];
for (const x of [45.6, 47.2, 48.8, 50.4]) for (const z of [2.2, 3.3, 4.4]) for (const sg of [-1, 1]) LUGARES_ORACION.push([x, z * sg]);

export class EscenaHistoria {
  group = new THREE.Group();
  private crowd = new Crowd(28);
  private torres: THREE.Group | null = null;
  private conducto: THREE.Group | null = null;
  private campamento: THREE.Group | null = null;
  private fogatas: THREE.Mesh | null = null;
  private fiesta: THREE.Group | null = null;
  private claves = { torres: "", conducto: "", campamento: "", fiesta: "", gente: "" };
  private gente: Persona[] = [];
  private figuras: { fig: Figure; rig: Rig; quien: "rabsaces" | "acompana" | "rey" }[] = [];
  private etiquetas: Etiqueta[] = [];
  private etiquetaRabsaces: Etiqueta | null = null;
  private etiquetaRey: Etiqueta | null = null;
  private etiquetaFiesta: Etiqueta | null = null;
  private grito: { el: HTMLDivElement | null; hasta: number; siguiente: number; i: number } = { el: null, hasta: 0, siguiente: 0, i: 0 };
  private estado: EstadoHistoria | null = null;
  /** Se rehicieron las torres (lo que puede tapar al jugador): la ciudad vuelve a armar sus cajas. */
  torresNuevas = false;

  constructor(
    private overlay: Overlay,
    private sombra: (x: number, y: number, z: number, s: number) => void,
    /** Al tocar el letrero de la fiesta (abre la historia para dar gracias). */
    private alTocarFiesta: () => void,
  ) {
    this.group.add(this.crowd.group);
  }

  /** Pone lo que dice el servidor. Devuelve si cambió algo que da sombra. */
  poner(e: EstadoHistoria): boolean {
    this.estado = e;
    let cambio = false;
    const ct = `${Math.floor(e.torres * 30)}`;
    if (ct !== this.claves.torres) {
      this.claves.torres = ct;
      this.torres = this.cambiar(this.torres, construirTorres(e.torres));
      this.torresNuevas = true;
      cambio = true;
    }
    const cc = `${e.canalAbierto}:${Math.floor(e.canal * 40)}:${e.canalLleno}`;
    if (cc !== this.claves.conducto) {
      this.claves.conducto = cc;
      this.conducto = this.cambiar(this.conducto, construirConducto(e.canal, e.canalAbierto, e.canalLleno));
      cambio = true;
    }
    if (e.amenaza !== this.claves.campamento) {
      this.claves.campamento = e.amenaza;
      if (e.amenaza === "no") {
        this.campamento = this.cambiar(this.campamento, null);
        this.fogatas = null;
      } else {
        const c = construirCampamento(e.amenaza === "vacio");
        this.campamento = this.cambiar(this.campamento, c.grupo);
        this.fogatas = c.fogatas;
      }
      this.ponerFiguras(e.amenaza === "acampa");
    }
    const cf = e.fiesta === "no" ? "no" : "si";
    if (cf !== this.claves.fiesta) {
      this.claves.fiesta = cf;
      this.fiesta = this.cambiar(this.fiesta, cf === "si" ? construirFiesta() : null);
      cambio = true;
    }
    const orando = e.oracion >= 0 ? Math.min(LUGARES_ORACION.length, 4 + Math.round(e.oracion * (LUGARES_ORACION.length - 4))) : 0;
    const cavando = e.canalAbierto && e.canal > 0 && e.canal < 1 ? 2 : 0;
    const cg = `${orando}:${cavando}:${Math.floor(e.canal * 40)}:${e.fiesta}`;
    if (cg !== this.claves.gente) {
      this.claves.gente = cg;
      this.ponerGente(orando, cavando, e);
    }
    this.ponerEtiquetas(e);
    return cambio;
  }

  private cambiar(viejo: THREE.Group | null, nuevo: THREE.Group | null): THREE.Group | null {
    if (viejo) {
      this.group.remove(viejo);
      liberar(viejo);
    }
    if (nuevo) this.group.add(nuevo);
    return nuevo;
  }

  private ponerFiguras(acampa: boolean) {
    for (const f of this.figuras) {
      this.group.remove(f.fig.root);
      f.fig.dispose();
    }
    this.figuras = [];
    if (!acampa) return;
    // el Rabsaces y los suyos, frente a la puerta (2 Reyes 18:17)
    const [rx, rz] = P.RABSACES;
    const pon = (x: number, z: number, quien: "rabsaces" | "acompana", manto: string) => {
      const fig = new Figure("oficial");
      fig.setRopa({ manto, faja: "#c99a3b" });
      const rig = newRig(x, z, quien === "rabsaces" ? 1.06 : 1);
      rig.y = alturaTerreno(x, z);
      rig.yaw = -Math.PI / 2;
      rig.pose = quien === "rabsaces" ? "talk" : "idle";
      this.group.add(fig.root);
      this.figuras.push({ fig, rig, quien });
    };
    pon(rx, rz, "rabsaces", "#3a2c4f");
    pon(rx + 1.3, rz - 1.8, "acompana", "#5a2a2a");
    pon(rx + 1.3, rz + 1.9, "acompana", "#2f3f2a");
    // el rey Ezequías ora ante la casa de Jehová, arriba de la escalinata (2 Reyes 19:14-15)
    const rey = new Figure("rey");
    const rr = newRig(P.REY_ORA[0], P.REY_ORA[1], 1);
    rr.y = 0;
    rr.yaw = -Math.PI / 2;
    rr.pose = "kneel";
    this.group.add(rey.root);
    this.figuras.push({ fig: rey, rig: rr, quien: "rey" });
  }

  private ponerGente(orando: number, cavando: number, e: EstadoHistoria) {
    for (const p of this.gente) this.crowd.remove(p.handle);
    this.gente = [];
    const agregar = (x: number, z: number, yaw: number, hace: Persona["hace"], levita = false) => {
      const look = levita ? { variant: "levita" as const, colors: leviteColors("#1e4d8c"), scale: 1 } : randomVisitor();
      const handle = this.crowd.add(look.variant, look.colors);
      if (!handle) return;
      const rig = newRig(x, z, look.scale);
      rig.y = P.alturaCiudad(x, z);
      rig.yaw = yaw;
      rig.pose = hace === "ora" ? "kneel" : hace === "cava" ? "kneel" : "cheer";
      this.gente.push({ handle, rig, hace });
    };
    // el pueblo que ora al pie de la escalinata, mirando a la casa de Jehová
    for (let i = 0; i < orando; i++) agregar(LUGARES_ORACION[i][0], LUGARES_ORACION[i][1], -Math.PI / 2, "ora");
    // los que cavan el conducto, en el frente de la obra
    if (cavando) {
      const p = puntoDelConducto(e.canal * LARGO_CONDUCTO);
      agregar(p.x + Math.cos(p.dir) * 0.75 - Math.sin(p.dir) * 0.3, p.z - Math.sin(p.dir) * 0.75 - Math.cos(p.dir) * 0.3, p.dir + Math.PI, "cava");
      agregar(p.x - Math.cos(p.dir) * 0.75 - Math.sin(p.dir) * 0.6, p.z + Math.sin(p.dir) * 0.75 - Math.cos(p.dir) * 0.6, p.dir + Math.PI, "cava");
    }
    // la fiesta: los cantores en la escalinata y el pueblo que alaba en la plaza
    if (e.fiesta === "fiesta" || e.fiesta === "vivo") {
      for (const x of [40.4, 41.6]) for (const z of [-2.2, -1.4, 1.4, 2.2]) agregar(x, z, Math.PI / 2, "canta", true);
      let puestos = 0;
      for (let k = 0; k < 24 && puestos < 12; k++) {
        const a = (k / 12) * Math.PI * 2 + (k >= 12 ? 0.26 : 0);
        const r = k >= 12 ? 6.4 : 4.7;
        const x = 56 + Math.cos(a) * r, z = -2 + Math.sin(a) * r;
        if (ESTORBOS_PLAZA.some(([ex, ez, er]) => Math.hypot(x - ex, z - ez) < er)) continue;
        agregar(x, z, Math.atan2(56 - x, -2 - z), "alaba");
        puestos++;
      }
    }
  }

  private ponerEtiquetas(e: EstadoHistoria) {
    for (const t of this.etiquetas) this.overlay.remove(t.el);
    this.etiquetas = [];
    // si el Rabsaces ya no está (o cambió el capítulo), su último grito se borra
    if (e.amenaza !== "acampa" && this.grito.el) {
      this.overlay.remove(this.grito.el);
      this.grito.el = null;
    }
    const pon = (texto: string, p: THREE.Vector3, r: number) => {
      const el = this.overlay.make("tpl-tag");
      el.textContent = texto;
      el.style.display = "none";
      const t = { el, p, r };
      this.etiquetas.push(t);
      return t;
    };
    P.TORRES_NUEVAS.forEach((zt, i) => {
      const fi = Math.max(0, Math.min(1, e.torres * P.TORRES_NUEVAS.length - i));
      const alto = 1.0 + 7.2 * fi;
      pon(fi >= 1 ? "Torre nueva (2 Crónicas 32:5)" : fi > 0 ? `Torre nueva: se levanta (${Math.round(fi * 100)} %)` : "Aquí se alzará una torre nueva", new THREE.Vector3(P.TORRE_X - 2.2, Y + alto + 1.4, zt), 24);
    });
    pon(
      e.canalLleno ? "El conducto de Ezequías: ¡el agua llegó!" : e.canalAbierto ? `El conducto de Ezequías (${Math.round(e.canal * 100)} %)` : "Por aquí pasará el conducto de Ezequías",
      new THREE.Vector3(58, Y + 1.6, P.CONDUCTO[0][1]),
      15,
    );
    pon(e.canalLleno ? "El estanque de Siloé" : "El estanque de Siloé (todavía seco)", new THREE.Vector3((P.ESTANQUE[0] + P.ESTANQUE[2]) / 2, Y + 2.0, (P.ESTANQUE[1] + P.ESTANQUE[3]) / 2), 16);
    this.etiquetaRabsaces = e.amenaza === "acampa" ? pon("El Rabsaces, enviado de Senaquerib", new THREE.Vector3(P.RABSACES[0], alturaTerreno(P.RABSACES[0], P.RABSACES[1]) + 2.6, P.RABSACES[1]), 30) : null;
    this.etiquetaRey = e.amenaza === "acampa" ? pon("El rey Ezequías ora ante Jehová", new THREE.Vector3(P.REY_ORA[0], 2.1, P.REY_ORA[1]), 34) : null;
    this.etiquetaFiesta = null;
    if (e.fiesta === "fiesta" || e.fiesta === "vivo") {
      const t = pon(e.fiesta === "vivo" ? "🎺 ¡La gran alabanza! Toca para dar gracias" : "🎺 La fiesta de la liberación: toca para dar gracias", new THREE.Vector3(P.PULPITO[0], Y + 4.2, P.PULPITO[1]), 28);
      t.el.style.pointerEvents = "auto";
      t.el.style.cursor = "pointer";
      t.el.style.background = "rgba(200,90,20,.92)";
      t.el.addEventListener("click", () => this.alTocarFiesta());
      this.etiquetaFiesta = t;
    }
  }

  /** Lo que puede tapar al jugador (las torres): la ciudad lo aclara si queda entre la cámara y él. */
  ocluyentes(): THREE.Object3D[] {
    return this.torres ? [this.torres] : [];
  }

  /** Cada cuadro: la gente se mueve, el Rabsaces grita si estás cerca de la puerta y de noche arden las fogatas. */
  animar(dt: number, now: number, jx: number, jz: number, noche: boolean) {
    if (this.fogatas) this.fogatas.visible = noche;
    for (const p of this.gente) {
      const r = p.rig;
      r.t += dt;
      if (p.hace === "cava") r.pose = Math.sin(r.t * 2.4) > 0 ? "kneel" : "offer";
      else if (p.hace === "ora") r.pose = Math.sin(r.t * 0.5 + r.x) > 0.85 ? "bow" : "kneel";
      else if (p.hace === "canta") r.pose = this.estado?.fiesta === "vivo" ? (Math.sin(r.t * 3) > 0 ? "cheer" : "clap") : "talk";
      else r.pose = this.estado?.fiesta === "vivo" || Math.sin(r.t * 0.9 + r.z) > 0.2 ? "cheer" : "clap";
      this.crowd.update(p.handle, r);
      this.sombra(r.x, r.y, r.z, r.scale);
    }
    this.crowd.flush();
    for (const f of this.figuras) {
      f.rig.t += dt;
      f.fig.update(f.rig);
      if (f.quien !== "rey") this.sombra(f.rig.x, f.rig.y, f.rig.z, f.rig.scale);
    }
    // el Rabsaces grita a los muros (y el pueblo no le responde: 2 Reyes 18:36)
    if (this.etiquetaRabsaces) {
      const cerca = Math.hypot(jx - 76, jz) < 26;
      if (this.grito.el && (now > this.grito.hasta || !cerca)) {
        this.overlay.remove(this.grito.el);
        this.grito.el = null;
      }
      if (cerca && !this.grito.el && now > this.grito.siguiente) {
        const g = GRITOS[this.grito.i++ % GRITOS.length];
        const el = this.overlay.make("tpl-frase npc");
        const span = document.createElement("span");
        span.className = "tpl-habla";
        span.textContent = `El Rabsaces grita desde afuera: «${g.text}» (${g.ref})`;
        el.appendChild(span);
        this.grito = { el, hasta: now + 6500, siguiente: now + 11000, i: this.grito.i };
      }
      if (this.grito.el) {
        // sobre el Rabsaces si se ve (con la cámara de cine); si no, en la puerta, que es por donde se oye
        const [rx, rz] = P.RABSACES;
        if (!this.overlay.place(this.grito.el, new THREE.Vector3(rx, alturaTerreno(rx, rz) + 2.4, rz))) this.overlay.place(this.grito.el, new THREE.Vector3(P.MURO_ORIENTE - 1.6, Y + 3.4, 0));
      }
    }
    for (const t of this.etiquetas) {
      if (t === this.etiquetaRabsaces && this.grito.el) {
        t.el.style.display = "none";
        continue;
      }
      if (Math.hypot(jx - t.p.x, jz - t.p.z) < t.r) this.overlay.place(t.el, t.p);
      else t.el.style.display = "none";
    }
  }

  destroy() {
    for (const t of this.etiquetas) this.overlay.remove(t.el);
    this.overlay.remove(this.grito.el);
    for (const f of this.figuras) f.fig.dispose();
    for (const g of [this.torres, this.conducto, this.campamento, this.fiesta]) if (g) liberar(g);
    this.crowd.dispose();
  }
}
