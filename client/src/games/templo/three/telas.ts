/**
 * Las telas con viento (docs/guia-visual.md, sección 7): las banderas de las tribus, los estandartes del rey y de los
 * barrios, los banderines. Cada paño se arma en cuadritos y el viento lo mece en la tarjeta de video (matteMatTela, en
 * three/builder.ts): más cuanto más lejos de donde está atado, con ondas que lo recorren y ráfagas. Todos los paños de un
 * lugar van en una sola malla.
 *
 * - "asta": la bandera atada a un palo por un costado; lo libre es la punta de afuera.
 * - "arriba": el estandarte o el banderín colgado de una vara (o de un muro); lo libre es la parte de abajo.
 */
import * as THREE from "three";
import { matteMatTela } from "./builder";

export type Atada = "asta" | "arriba";

export class Telas {
  private pos: number[] = [];
  private nor: number[] = [];
  private col: number[] = [];
  private tela: number[] = [];

  get vacia() {
    return this.pos.length === 0;
  }

  /**
   * Un paño. `amarre` es la esquina de arriba del lado atado (en una bandera, junto al asta; en un estandarte colgado,
   * la esquina de arriba de un lado). El paño va `largo` a lo largo de `eje` (horizontal, [x, z]) y `alto` hacia abajo.
   * Con `orla`, la franja de abajo es de ese color (el filo de oro); con `punta`, el paño se angosta hasta una punta abajo
   * (un banderín). `viento` (de 0 a 1) es cuánto se mueve: un estandarte pegado a un muro, poco.
   */
  pano(
    amarre: [number, number, number], eje: [number, number], largo: number, alto: number, color: THREE.ColorRepresentation, atada: Atada,
    o: { orla?: THREE.ColorRepresentation; punta?: boolean; viento?: number } = {},
  ) {
    const el = Math.hypot(eje[0], eje[1]) || 1;
    const ex = eje[0] / el, ez = eje[1] / el;
    const cuerpo = new THREE.Color(color), orla = o.orla != null ? new THREE.Color(o.orla) : null;
    // la normal del paño (horizontal) y su fase (cada paño ondea a su tiempo)
    const nx = ez, nz = -ex;
    const fase = ((amarre[0] * 12.9898 + amarre[2] * 78.233) % 6.283 + 6.283) % 6.283;
    const us = [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.88, 1];
    // las filas de arriba abajo; con orla, una fila doble en el filo para que la franja salga nítida
    const vs: { v: number; orla: boolean }[] = orla
      ? [{ v: 0, orla: false }, { v: 0.2, orla: false }, { v: 0.4, orla: false }, { v: 0.6, orla: false }, { v: 0.8, orla: false }, { v: 0.86, orla: false }, { v: 0.86, orla: true }, { v: 1, orla: true }]
      : [{ v: 0, orla: false }, { v: 0.2, orla: false }, { v: 0.4, orla: false }, { v: 0.6, orla: false }, { v: 0.8, orla: false }, { v: 1, orla: false }];
    const punto = (u: number, v: number) => {
      // el banderín se angosta hacia abajo, alrededor de su centro
      const uu = o.punta ? 0.5 + (u - 0.5) * (1 - v) : u;
      return [amarre[0] + ex * uu * largo, amarre[1] - v * alto, amarre[2] + ez * uu * largo];
    };
    const viento = o.viento ?? 1;
    const libre = (u: number, v: number) => (atada === "asta" ? u : v) * viento;
    const ejeTela = atada === "asta" ? [ex, ez] : [0, 0];
    const vert = (u: number, fila: { v: number; orla: boolean }) => {
      const p = punto(u, fila.v);
      this.pos.push(p[0], p[1], p[2]);
      this.nor.push(nx, 0, nz);
      const c = fila.orla && orla ? orla : cuerpo;
      // la tela un poco más oscura cerca de donde está atada (se arruga) y en el filo de abajo
      const k = 0.9 + 0.1 * Math.min(1, (atada === "asta" ? u : fila.v) * 3);
      this.col.push(c.r * k, c.g * k, c.b * k);
      this.tela.push(libre(u, fila.v), fase, ejeTela[0], ejeTela[1]);
    };
    // los triángulos, con el frente hacia la normal del paño
    const a0 = punto(0, 0), a1 = punto(1, 0), a2 = punto(0, 1);
    const e1 = [a1[0] - a0[0], a1[1] - a0[1], a1[2] - a0[2]], e2 = [a2[0] - a0[0], a2[1] - a0[1], a2[2] - a0[2]];
    const gx = e1[1] * e2[2] - e1[2] * e2[1], gz = e1[0] * e2[1] - e1[1] * e2[0];
    const alDerecho = gx * nx + gz * nz >= 0;
    for (let j = 0; j < vs.length - 1; j++)
      for (let i = 0; i < us.length - 1; i++) {
        const A: [number, (typeof vs)[number]] = [us[i], vs[j]], B: [number, (typeof vs)[number]] = [us[i + 1], vs[j]];
        const Cc: [number, (typeof vs)[number]] = [us[i], vs[j + 1]], D: [number, (typeof vs)[number]] = [us[i + 1], vs[j + 1]];
        const tris = alDerecho ? [A, B, Cc, B, D, Cc] : [A, Cc, B, B, Cc, D];
        for (const [u, f] of tris) vert(u, f);
      }
  }

  /**
   * Un toldo: el paño tendido sobre postes, que cuelga un poco en el medio y se mece en el centro (los bordes quedan
   * atados). `centro` es el medio del toldo a la altura de los postes; va `largo` a lo largo de `eje` y `ancho` al través.
   */
  toldo(centro: [number, number, number], eje: [number, number], largo: number, ancho: number, color: THREE.ColorRepresentation, viento = 0.7) {
    const el = Math.hypot(eje[0], eje[1]) || 1;
    const ex = eje[0] / el, ez = eje[1] / el;
    // el otro lado del toldo (al través) y la fase
    const tx = -ez, tz = ex;
    const c = new THREE.Color(color);
    const fase = ((centro[0] * 12.9898 + centro[2] * 78.233) % 6.283 + 6.283) % 6.283;
    const n = 6;
    const punto = (i: number, j: number) => {
      const u = i / n, v = j / n;
      const libre = Math.sin(Math.PI * u) * Math.sin(Math.PI * v);
      const cuelga = -0.07 * libre;
      return { p: [centro[0] + ex * (u - 0.5) * largo + tx * (v - 0.5) * ancho, centro[1] + cuelga, centro[2] + ez * (u - 0.5) * largo + tz * (v - 0.5) * ancho], libre };
    };
    const vert = (i: number, j: number) => {
      const { p, libre } = punto(i, j);
      this.pos.push(p[0], p[1], p[2]);
      this.nor.push(0, 1, 0);
      const k = 0.92 + 0.08 * libre;
      this.col.push(c.r * k, c.g * k, c.b * k);
      this.tela.push(libre * viento, fase, ex, ez);
    };
    // el frente hacia arriba (la normal del toldo)
    const a0 = punto(0, 0).p, a1 = punto(1, 0).p, a2 = punto(0, 1).p;
    const gy = (a1[2] - a0[2]) * (a2[0] - a0[0]) - (a1[0] - a0[0]) * (a2[2] - a0[2]);
    const arriba = gy >= 0;
    for (let i = 0; i < n; i++)
      for (let j = 0; j < n; j++) {
        const q: [number, number][] = arriba ? [[i, j], [i + 1, j], [i, j + 1], [i + 1, j], [i + 1, j + 1], [i, j + 1]] : [[i, j], [i, j + 1], [i + 1, j], [i + 1, j], [i, j + 1], [i + 1, j + 1]];
        for (const [a, b] of q) vert(a, b);
      }
  }

  /** La malla con todos los paños (sin sombra: la tela se mueve y su sombra no la seguiría). */
  malla(): THREE.Mesh {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(this.pos, 3));
    g.setAttribute("normal", new THREE.Float32BufferAttribute(this.nor, 3));
    g.setAttribute("color", new THREE.Float32BufferAttribute(this.col, 3));
    g.setAttribute("aTela", new THREE.Float32BufferAttribute(this.tela, 4));
    g.computeBoundingSphere();
    const m = new THREE.Mesh(g, matteMatTela());
    m.castShadow = false;
    m.receiveShadow = true;
    m.name = "telas";
    return m;
  }
}
