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
  /** La copia quieta de los toldos, que solo tapa el sol (la tela que se mueve no da sombra). */
  private sombra: number[] = [];

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
   * - Con varios colores es de franjas a lo largo, de unos 30 cm (al menos una de cada color).
   * - Con `caida`, baja hacia `bajo` (un rumbo horizontal) tanto como `caida` de un borde al otro, y con `faldon`, del
   *   borde bajo cuelga una franja con un diente por franja, de su color (`faldon` es lo que cuelga).
   * - Da sombra (salvo con `sombra: false`): una copia quieta, 10 cm más abajo que la tela, que solo tapa el sol.
   * - `cuelga` es cuánto baja en el medio (7 cm si no se dice) y `franja`, el ancho de cada franja (30 cm si no se dice).
   */
  toldo(
    centro: [number, number, number], eje: [number, number], largo: number, ancho: number,
    color: THREE.ColorRepresentation | THREE.ColorRepresentation[], viento = 0.7,
    o: { caida?: number; bajo?: [number, number]; faldon?: number; sombra?: boolean; cuelga?: number; franja?: number } = {},
  ) {
    const el = Math.hypot(eje[0], eje[1]) || 1;
    const ex = eje[0] / el, ez = eje[1] / el;
    // el otro lado del toldo (al través) y la fase
    const tx = -ez, tz = ex;
    const colores = (Array.isArray(color) ? color : [color]).map((q) => new THREE.Color(q));
    const nu = Array.isArray(color) ? Math.max(colores.length, Math.round(largo / (o.franja ?? 0.3))) : 6, nv = 6;
    const cuelga = o.cuelga ?? 0.07;
    const fase = ((centro[0] * 12.9898 + centro[2] * 78.233) % 6.283 + 6.283) % 6.283;
    // la caída hacia `bajo`: cuánto baja por metro hacia ese lado, y la normal del paño, inclinada hacia allá
    const bl = o.bajo ? Math.hypot(o.bajo[0], o.bajo[1]) || 1 : 1;
    const bx = o.bajo ? o.bajo[0] / bl : 0, bz = o.bajo ? o.bajo[1] / bl : 0;
    const alcance = (Math.abs(bx * ex + bz * ez) * largo) / 2 + (Math.abs(bx * tx + bz * tz) * ancho) / 2;
    const pend = o.caida && alcance > 0 ? o.caida / 2 / alcance : 0;
    const nl = Math.hypot(pend * bx, 1, pend * bz);
    const nrm = [(pend * bx) / nl, 1 / nl, (pend * bz) / nl];
    const punto = (i: number, j: number, baja = 0) => {
      const u = i / nu, v = j / nv;
      const libre = Math.sin(Math.PI * u) * Math.sin(Math.PI * v);
      const dx = ex * (u - 0.5) * largo + tx * (v - 0.5) * ancho, dz = ez * (u - 0.5) * largo + tz * (v - 0.5) * ancho;
      return { p: [centro[0] + dx, centro[1] - cuelga * libre - pend * (dx * bx + dz * bz) - baja, centro[2] + dz], libre };
    };
    const vert = (i: number, j: number, c: THREE.Color) => {
      const { p, libre } = punto(i, j);
      this.pos.push(p[0], p[1], p[2]);
      this.nor.push(nrm[0], nrm[1], nrm[2]);
      const k = 0.92 + 0.08 * libre;
      this.col.push(c.r * k, c.g * k, c.b * k);
      this.tela.push(libre * viento, fase, ex, ez);
    };
    // el frente hacia arriba (la normal del toldo); cada cuadrito con el color de su franja (las franjas salen nítidas)
    const a0 = punto(0, 0).p, a1 = punto(1, 0).p, a2 = punto(0, 1).p;
    const gy = (a1[2] - a0[2]) * (a2[0] - a0[0]) - (a1[0] - a0[0]) * (a2[2] - a0[2]);
    const arriba = gy >= 0;
    for (let i = 0; i < nu; i++)
      for (let j = 0; j < nv; j++) {
        const q: [number, number][] = arriba ? [[i, j], [i + 1, j], [i, j + 1], [i + 1, j], [i + 1, j + 1], [i, j + 1]] : [[i, j], [i, j + 1], [i + 1, j], [i + 1, j], [i, j + 1], [i + 1, j + 1]];
        for (const [a, b] of q) vert(a, b, colores[i % colores.length]);
      }
    // el faldón, del borde que mira a `bajo`: una franja con un diente abajo por cada franja del toldo
    if (o.faldon && (bx || bz)) {
      const alto = o.faldon;
      const haciaT = bx * tx + bz * tz;
      const jBorde = haciaT > 0 ? nv : 0;
      const nf = haciaT > 0 ? [tx, tz] : [-tx, -tz];
      const vf = viento * 0.8, banda = 0.45;
      const borde = (u: number, v: number) => {
        const q = punto(u * nu, jBorde).p;
        return [q[0], q[1] - v * alto, q[2]];
      };
      const tri = (pts: [number, number][], c: THREE.Color) => {
        const ps = pts.map(([u, v]) => borde(u, v));
        // el orden para que el frente mire hacia afuera
        const e1 = [ps[1][0] - ps[0][0], ps[1][1] - ps[0][1], ps[1][2] - ps[0][2]], e2 = [ps[2][0] - ps[0][0], ps[2][1] - ps[0][1], ps[2][2] - ps[0][2]];
        const gx = e1[1] * e2[2] - e1[2] * e2[1], gz = e1[0] * e2[1] - e1[1] * e2[0];
        for (const k of gx * nf[0] + gz * nf[1] >= 0 ? [0, 1, 2] : [0, 2, 1]) {
          const v = pts[k][1], pp = ps[k];
          this.pos.push(pp[0], pp[1], pp[2]);
          this.nor.push(nf[0], 0, nf[1]);
          const sk = 0.95 - 0.08 * v;
          this.col.push(c.r * sk, c.g * sk, c.b * sk);
          this.tela.push(v * vf, fase, 0, 0);
        }
      };
      for (let i = 0; i < nu; i++) {
        const ua = i / nu, ub = (i + 1) / nu, um = (i + 0.5) / nu, c = colores[i % colores.length];
        tri([[ua, 0], [ub, 0], [ua, banda]], c);
        tri([[ub, 0], [ub, banda], [ua, banda]], c);
        tri([[ua, banda], [ub, banda], [um, 1]], c);
      }
    }
    // la sombra: el mismo paño quieto y 10 cm más abajo (la onda no baja tanto), así la tela no se hace sombra a sí misma
    if (o.sombra !== false) {
      const n = 3;
      const sp = (a: number, b: number) => punto((a / n) * nu, (b / n) * nv, 0.1).p;
      for (let a = 0; a < n; a++)
        for (let b = 0; b < n; b++) for (const q of [sp(a, b), sp(a + 1, b), sp(a, b + 1), sp(a + 1, b), sp(a + 1, b + 1), sp(a, b + 1)]) this.sombra.push(q[0], q[1], q[2]);
    }
  }

  /**
   * Suma los paños de otra (armados en las medidas de una casa), llevados con `mat` (la casa en su lugar: girada y
   * movida). Cada casa ondea a su tiempo.
   */
  juntar(otra: Telas, mat: THREE.Matrix4) {
    const v = new THREE.Vector3(), giro = new THREE.Matrix3().setFromMatrix4(mat);
    const corre = ((mat.elements[12] * 12.9898 + mat.elements[14] * 78.233) % 6.283 + 6.283) % 6.283;
    for (let i = 0; i < otra.pos.length; i += 3) {
      v.fromArray(otra.pos, i).applyMatrix4(mat);
      this.pos.push(v.x, v.y, v.z);
      v.fromArray(otra.nor, i).applyMatrix3(giro).normalize();
      this.nor.push(v.x, v.y, v.z);
      this.col.push(otra.col[i], otra.col[i + 1], otra.col[i + 2]);
    }
    for (let i = 0; i < otra.tela.length; i += 4) {
      v.set(otra.tela[i + 2], 0, otra.tela[i + 3]).applyMatrix3(giro);
      this.tela.push(otra.tela[i], otra.tela[i + 1] + corre, v.x, v.z);
    }
    for (let i = 0; i < otra.sombra.length; i += 3) {
      v.fromArray(otra.sombra, i).applyMatrix4(mat);
      this.sombra.push(v.x, v.y, v.z);
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
    // la sombra de los toldos: una copia quieta que no se ve, solo tapa el sol
    if (this.sombra.length) {
      const gs = new THREE.BufferGeometry();
      gs.setAttribute("position", new THREE.Float32BufferAttribute(this.sombra, 3));
      gs.computeBoundingSphere();
      const s = new THREE.Mesh(gs, soloSombra());
      s.castShadow = true;
      s.receiveShadow = false;
      s.name = "telas-sombra";
      m.add(s);
    }
    return m;
  }
}

let soloSombraMat: THREE.MeshBasicMaterial | null = null;
/** Lo que no se ve pero tapa el sol: no pinta ni ocupa lugar en la imagen, y se dibuja (por las dos caras) en la sombra. */
function soloSombra() {
  soloSombraMat ??= new THREE.MeshBasicMaterial({ colorWrite: false, depthWrite: false, side: THREE.DoubleSide });
  return soloSombraMat;
}
