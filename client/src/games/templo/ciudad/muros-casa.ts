/**
 * Los muros de las casas de los barrios (docs/guia-visual.md, sección 7). Se arman a mano, cara por cara, en una sola
 * geometría (como el enlosado de `tiles`), con su propio azar: el de la ciudad se gasta igual que antes y lo demás queda
 * como estaba.
 * - `sillares`: la piedra labrada en hiladas con las juntas trabadas. Cada piedra tiene su bisel y su tono, y las de las
 *   esquinas se traban con las de la cara de al lado (una larga y una corta, alternadas de hilada en hilada).
 * - `revoque`: el adobe revocado con barro, con manchas, el pie salpicado, lo alto gastado y los chorros de la lluvia.
 *   Donde se cayó el revoque se ven los ladrillos.
 */
import * as THREE from "three";

export type Azar = () => number;
type V3 = [number, number, number];

/** Un azar propio, con su semilla (el mismo de siempre: mulberry32). */
export function azarDe(semilla: number): Azar {
  let s = semilla | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Un ruido suave entre 0 y 1 que depende solo del punto (sin azar). */
export function ruido2(x: number, y: number): number {
  const xi = Math.floor(x), yi = Math.floor(y);
  const fx = x - xi, fy = y - yi;
  const h = (a: number, b: number) => {
    const n = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
    return n - Math.floor(n);
  };
  const sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
  const a = h(xi, yi), b = h(xi + 1, yi), c = h(xi, yi + 1), d = h(xi + 1, yi + 1);
  return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy;
}

export function suave(a: number, b: number, x: number) {
  const k = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return k * k * (3 - 2 * k);
}

function normal(a: V3, b: V3, c: V3): V3 {
  const e1 = [b[0] - a[0], b[1] - a[1], b[2] - a[2]], e2 = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
  const n: V3 = [e1[1] * e2[2] - e1[2] * e2[1], e1[2] * e2[0] - e1[0] * e2[2], e1[0] * e2[1] - e1[1] * e2[0]];
  const l = Math.hypot(n[0], n[1], n[2]) || 1;
  return [n[0] / l, n[1] / l, n[2] / l];
}

/** Donde se juntan los triángulos de los muros (posición, normal y color, sin índice: lo que espera `GeoBuilder.raw`). */
export class Lienzo {
  private pos: number[] = [];
  private nor: number[] = [];
  private col: number[] = [];

  /** Un cuadrilátero a, b, c, d en el orden contrario al reloj visto de frente, con un color por esquina. */
  quad(a: V3, b: V3, c: V3, d: V3, ca: THREE.Color, cb = ca, cc = ca, cd = ca, n?: V3) {
    const nn = n ?? normal(a, b, c);
    for (const [p, q] of [[a, ca], [b, cb], [c, cc], [a, ca], [c, cc], [d, cd]] as [V3, THREE.Color][]) {
      this.pos.push(p[0], p[1], p[2]);
      this.nor.push(nn[0], nn[1], nn[2]);
      this.col.push(q.r, q.g, q.b);
    }
  }

  /** Igual, con una normal por esquina (una superficie que se ondula suave). */
  quadN(a: V3, b: V3, c: V3, d: V3, ca: THREE.Color, cb: THREE.Color, cc: THREE.Color, cd: THREE.Color, na: V3, nb: V3, nc: V3, nd: V3) {
    for (const [p, q, n] of [[a, ca, na], [b, cb, nb], [c, cc, nc], [a, ca, na], [c, cc, nc], [d, cd, nd]] as [V3, THREE.Color, V3][]) {
      this.pos.push(p[0], p[1], p[2]);
      this.nor.push(n[0], n[1], n[2]);
      this.col.push(q.r, q.g, q.b);
    }
  }

  get vacio() {
    return this.pos.length === 0;
  }

  geometria(): THREE.BufferGeometry {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(this.pos, 3));
    g.setAttribute("normal", new THREE.Float32BufferAttribute(this.nor, 3));
    g.setAttribute("color", new THREE.Float32BufferAttribute(this.col, 3));
    return g;
  }
}

/**
 * Una cara de muro: su esquina de abajo a la izquierda vista de afuera (`o`), hacia dónde corre (`u`, horizontal y de
 * largo 1) y su largo. La normal mira hacia afuera.
 */
export type Cara = { o: V3; u: [number, number]; largo: number };

/** Un punto de la cara: `u` a lo largo, `v` hacia arriba (desde la altura de `o`) y `e` hacia afuera. */
export function enCara(c: Cara, u: number, v: number, e: number): V3 {
  const [ux, uz] = c.u;
  return [c.o[0] + ux * u - uz * e, c.o[1] + v, c.o[2] + uz * u + ux * e];
}

/** Un rectángulo de la cara (en `u` y `v`): una puerta, una ventana, un marco, un pedazo sin revoque. */
export type Hueco = { u0: number; u1: number; v0: number; v1: number };

export type OpcionesSillares = {
  /** Las hiladas, de abajo hacia arriba ([desde, hasta] en `v`). */
  hiladas: [number, number][];
  color: THREE.Color;
  azar: Azar;
  /** Lo que no lleva piedras (las puertas, las ventanas y sus marcos). */
  huecos?: Hueco[];
  /** Solo un tramo de la cara (por defecto, toda). */
  desde?: number;
  hasta?: number;
  /** Cuánto miden las piedras a lo largo (de, a). */
  largos?: [number, number];
  /** Las esquinas trabadas: el número de la cara (0 a 3, dando la vuelta) y el largo de la piedra larga y de la corta. */
  esquinas?: { cara: number; largo: number; corto: number };
  /** Cuánto sale la piedra de la cara (0: al ras), lo hondo de la junta, el bisel y la separación entre piedras. */
  sale?: number;
  hondo?: number;
  bisel?: number;
  junta?: number;
  /**
   * Con bisel también a los lados (las juntas derechas). Sin él, cada piedra se distingue por su tono y la separación:
   * a la distancia de la cámara no se nota y la cara pesa casi la mitad.
   */
  biselLados?: boolean;
  /** Un tono por hilada (el zócalo, más oscuro). */
  tonoHilada?: (k: number) => number;
  /** Un tono por punto de la cara (las manchas de la lluvia: ver `manchasDeMuro`). */
  tonoPunto?: (u: number, v: number) => number;
  /**
   * La almohadilla: la cara de la piedra levantada en el medio (`alto`), con un margen labrado alrededor (`margen`),
   * como las piedras grandes de los muros de Jerusalén.
   */
  almohadilla?: { alto: number; margen: number };
};

/**
 * Las manchas de un muro al aire libre, como un tono por punto de la cara: manchas grandes y chicas, el pie salpicado
 * por la lluvia, lo alto gastado y los chorros que bajan desde arriba. Cada cara con las suyas.
 */
export function manchasDeMuro(o: { largo: number; v0: number; v1: number; azar: Azar; fuerza?: number }): (u: number, v: number) => number {
  const az = o.azar, f = o.fuerza ?? 1;
  const ox = az() * 60, oy = az() * 60;
  const chorros = Array.from({ length: 1 + Math.floor(az() * 3) }, () => ({ u: az() * o.largo, ancho: 0.08 + az() * 0.16, largo: 0.6 + az() * 1.3, fuerza: 0.07 + az() * 0.08 }));
  return (u, v) => {
    let k = (0.95 + ruido2(u * 1.3 + ox, v * 1.3 + oy) * 0.1) * (0.97 + ruido2(u * 4.6 + oy, v * 4.6 + ox) * 0.06);
    k *= 0.84 + 0.16 * suave(o.v0, o.v0 + 0.55, v);
    k *= 1 - 0.06 * suave(o.v1 - 0.3, o.v1, v);
    for (const ch of chorros) {
      const d = (u - ch.u) / ch.ancho;
      k *= 1 - ch.fuerza * Math.exp(-d * d) * suave(o.v1 - ch.largo, o.v1 - 0.1, v);
    }
    return 1 + (k - 1) * f;
  };
}

/** Las piedras labradas de una cara (ver arriba). */
export function sillares(l: Lienzo, cara: Cara, o: OpcionesSillares) {
  const az = o.azar;
  const sale = o.sale ?? 0, hondo = o.hondo ?? 0.025, bisel = o.bisel ?? 0.025, junta = o.junta ?? 0.012;
  const ua = o.desde ?? 0, ub = o.hasta ?? cara.largo;
  const [lmin, lmax] = o.largos ?? [0.55, 0.95];
  // si las piedras salen, las de las puntas se alargan eso mismo: así se juntan con las de la cara de al lado
  const ext = o.desde === undefined && o.hasta === undefined ? Math.max(0, sale) : 0;
  const huecos = o.huecos ?? [];
  const [ux, uz] = cara.u;
  const N: V3 = [-uz, 0, ux], U: V3 = [ux, 0, uz];

  const piedra = (a: number, b: number, p: number, q: number, hk: number, esquina: boolean) => {
    const puntaIzq = a <= ua + 1e-3, puntaDer = b >= ub - 1e-3;
    // en las puntas de la cara no hay junta ni bisel: ahí la piedra se junta con la de la cara de al lado
    const u0 = a + (puntaIzq ? -ext : junta / 2), u1 = b - (puntaDer ? -ext : junta / 2);
    const v0 = p + junta / 2, v1 = q - junta / 2;
    if (u1 - u0 < 0.03 || v1 - v0 < 0.03) return;
    const conLados = o.biselLados ?? false;
    const bl = puntaIzq || !conLados ? 0 : Math.min(bisel, (u1 - u0) / 3), br = puntaDer || !conLados ? 0 : Math.min(bisel, (u1 - u0) / 3);
    const bv = Math.min(bisel, (v1 - v0) / 3);
    // el tono: unas más gastadas, otras repuestas, unas apenas más doradas y otras más frías; las de las esquinas, más
    // claras; y encima las manchas de la cara (la lluvia)
    const r = az();
    const f = (0.91 + az() * 0.18) * hk * (r < 0.08 ? 0.88 : r > 0.95 ? 1.06 : 1) * (esquina ? 1.05 : 1);
    const c = o.color.clone().multiplyScalar(f);
    c.r *= 1 + (az() - 0.5) * 0.05;
    c.b *= 1 + (az() - 0.5) * 0.09;
    const K = (u: number, v: number, k = 1) => (o.tonoPunto ? c.clone().multiplyScalar(o.tonoPunto(u, v) * k) : k === 1 ? c : c.clone().multiplyScalar(k));
    const I = (u: number, v: number) => enCara(cara, u, v, sale), O = (u: number, v: number) => enCara(cara, u, v, sale - hondo);
    const iu0 = u0 + bl, iu1 = u1 - br, iv0 = v0 + bv, iv1 = v1 - bv;
    // la cara de la piedra, apenas inclinada: cada una recibe la luz a su modo
    const t1 = (az() - 0.5) * 0.06, t2 = (az() - 0.5) * 0.06;
    const n0 = [N[0] + U[0] * t1, t2, N[2] + U[2] * t1], nl = Math.hypot(n0[0], n0[1], n0[2]);
    const alm = o.almohadilla;
    if (alm && iu1 - iu0 > 2 * alm.margen + 0.08 && iv1 - iv0 > 2 * alm.margen + 0.08) {
      // el margen labrado (al ras, más liso y claro) y la almohadilla levantada en el medio, con su bisel
      const bu0 = iu0 + alm.margen, bu1 = iu1 - alm.margen, bv0 = iv0 + alm.margen, bv1 = iv1 - alm.margen;
      const ib = Math.min(alm.alto * 1.2, (bu1 - bu0) / 4, (bv1 - bv0) / 4);
      const T = (u: number, v: number) => enCara(cara, u, v, sale + alm.alto);
      const lm = 1.03;
      l.quad(I(iu0, iv0), I(iu1, iv0), I(bu1, bv0), I(bu0, bv0), K(iu0, iv0, lm), K(iu1, iv0, lm), K(bu1, bv0, lm), K(bu0, bv0, lm), N);
      l.quad(I(bu0, bv1), I(bu1, bv1), I(iu1, iv1), I(iu0, iv1), K(bu0, bv1, lm), K(bu1, bv1, lm), K(iu1, iv1, lm), K(iu0, iv1, lm), N);
      l.quad(I(iu0, iv0), I(bu0, bv0), I(bu0, bv1), I(iu0, iv1), K(iu0, iv0, lm), K(bu0, bv0, lm), K(bu0, bv1, lm), K(iu0, iv1, lm), N);
      l.quad(I(bu1, bv0), I(iu1, iv0), I(iu1, iv1), I(bu1, bv1), K(bu1, bv0, lm), K(iu1, iv0, lm), K(iu1, iv1, lm), K(bu1, bv1, lm), N);
      const tu0 = bu0 + ib, tu1 = bu1 - ib, tv0 = bv0 + ib, tv1 = bv1 - ib, cb = 0.95;
      l.quad(I(bu0, bv0), I(bu1, bv0), T(tu1, tv0), T(tu0, tv0), K(bu0, bv0, 0.9), K(bu1, bv0, 0.9), K(tu1, tv0, cb), K(tu0, tv0, cb));
      l.quad(T(tu0, tv1), T(tu1, tv1), I(bu1, bv1), I(bu0, bv1), K(tu0, tv1, cb), K(tu1, tv1, cb), K(bu1, bv1, 0.9), K(bu0, bv1, 0.9));
      l.quad(I(bu0, bv0), T(tu0, tv0), T(tu0, tv1), I(bu0, bv1), K(bu0, bv0, 0.9), K(tu0, tv0, cb), K(tu0, tv1, cb), K(bu0, bv1, 0.9));
      l.quad(T(tu1, tv0), I(bu1, bv0), I(bu1, bv1), T(tu1, tv1), K(tu1, tv0, cb), K(bu1, bv0, 0.9), K(bu1, bv1, 0.9), K(tu1, tv1, cb));
      l.quad(T(tu0, tv0), T(tu1, tv0), T(tu1, tv1), T(tu0, tv1), K(tu0, tv0, cb), K(tu1, tv0, cb), K(tu1, tv1, cb), K(tu0, tv1, cb), [n0[0] / nl, n0[1] / nl, n0[2] / nl]);
    } else l.quad(I(iu0, iv0), I(iu1, iv0), I(iu1, iv1), I(iu0, iv1), K(iu0, iv0), K(iu1, iv0), K(iu1, iv1), K(iu0, iv1), [n0[0] / nl, n0[1] / nl, n0[2] / nl]);
    // los biseles, más oscuros hacia la junta
    const j = 0.84;
    l.quad(O(u0, v0), O(u1, v0), I(iu1, iv0), I(iu0, iv0), K(u0, v0, j), K(u1, v0, j), K(iu1, iv0), K(iu0, iv0));
    l.quad(I(iu0, iv1), I(iu1, iv1), O(u1, v1), O(u0, v1), K(iu0, iv1), K(iu1, iv1), K(u1, v1, j), K(u0, v1, j));
    if (bl > 0) l.quad(O(u0, v0), I(iu0, iv0), I(iu0, iv1), O(u0, v1), K(u0, v0, j), K(iu0, iv0), K(iu0, iv1), K(u0, v1, j));
    if (br > 0) l.quad(I(iu1, iv0), O(u1, v0), O(u1, v1), I(iu1, iv1), K(iu1, iv0), K(u1, v0, j), K(u1, v1, j), K(iu1, iv1));
  };

  o.hiladas.forEach(([v0, v1], k) => {
    const hk = o.tonoHilada ? o.tonoHilada(k) : 1;
    // los huecos que tocan esta hilada parten la hilada en tramos
    const enHilada = huecos.filter((h) => h.v1 > v0 + 1e-3 && h.v0 < v1 - 1e-3 && h.u1 > ua && h.u0 < ub);
    const marcas = [ua, ub, ...enHilada.flatMap((h) => [h.u0, h.u1])].filter((u) => u >= ua - 1e-6 && u <= ub + 1e-6).sort((p, q) => p - q);
    const enteros: [number, number][] = [];
    for (let i = 0; i < marcas.length - 1; i++) {
      const a = marcas[i], b = marcas[i + 1];
      if (b - a < 1e-3) continue;
      const tapan = enHilada.filter((h) => h.u0 <= a + 1e-3 && h.u1 >= b - 1e-3);
      if (!tapan.length) {
        const ult = enteros[enteros.length - 1];
        if (ult && Math.abs(ult[1] - a) < 1e-3) ult[1] = b;
        else enteros.push([a, b]);
        continue;
      }
      // en este pedazo, lo que queda arriba y abajo de los huecos (una piedra más baja)
      let libres: [number, number][] = [[v0, v1]];
      for (const h of tapan)
        libres = libres.flatMap(([p, q]): [number, number][] => [[p, Math.min(q, h.v0)], [Math.max(p, h.v1), q]]).filter(([p, q]) => q - p > 1e-3);
      for (const [p, q] of libres) if (q - p >= 0.05) piedra(a, b, p, q, hk, false);
    }
    for (const [a, b] of enteros) {
      // en las puntas de la cara, la piedra de la esquina (larga o corta); en el medio, piedras de largo distinto
      const esq = o.esquinas;
      const izqEsq = !!esq && a <= ua + 1e-3, derEsq = !!esq && b >= ub - 1e-3;
      const largoEsq = esq ? ((k + esq.cara) % 2 === 0 ? esq.largo : esq.corto) : 0;
      const cortes = [a];
      let u = a;
      if (izqEsq) {
        u = Math.min(b, a + largoEsq);
        if (u < b - 1e-3) cortes.push(u);
      }
      const fin = derEsq ? Math.max(u, b - largoEsq) : b;
      while (fin - u > lmax) {
        let paso = lmin + (lmax - lmin) * az();
        // sin dejar una piedrita al final
        if (fin - u - paso < lmin * 0.6) paso = (fin - u) / 2;
        u += paso;
        cortes.push(u);
      }
      if (fin > u + 1e-3 && fin < b - 1e-3) cortes.push(fin);
      if (cortes[cortes.length - 1] < b - 1e-3) cortes.push(b);
      for (let i = 0; i < cortes.length - 1; i++) piedra(cortes[i], cortes[i + 1], v0, v1, hk, (i === 0 && izqEsq) || (i === cortes.length - 2 && derEsq));
    }
  });
}

export type OpcionesRevoque = {
  /** De dónde a dónde va el revoque (en `v`). */
  v0: number;
  v1: number;
  color: THREE.Color;
  azar: Azar;
  /** Las puertas y las ventanas: el revoque las rodea y se ve su canto (lo hondo del revoque). */
  huecos?: Hueco[];
  /** Donde se cayó el revoque: se ven los ladrillos. */
  parches?: Hueco[];
  ladrillo?: THREE.Color;
  /** Lo grueso del revoque (el canto de los huecos y de los parches). */
  grueso?: number;
  paso?: number;
  /** Cuánto se ondula el barro hecho a mano (en metros; quieto junto a las esquinas, los huecos y los bordes). */
  ondula?: number;
};

/** El revoque de barro de una cara (ver arriba). */
export function revoque(l: Lienzo, cara: Cara, o: OpcionesRevoque) {
  const az = o.azar;
  const L = cara.largo, paso = o.paso ?? 0.5, grueso = o.grueso ?? 0.02, ondula = o.ondula ?? 0;
  const huecos = o.huecos ?? [], parches = o.parches ?? [];
  // la grilla, con cortes justo en los bordes de los huecos y de los parches
  const cortes = (a: number, b: number, extra: number[]) => {
    const n = Math.max(1, Math.round((b - a) / paso));
    const fijos = extra.filter((x) => x > a + 1e-3 && x < b - 1e-3);
    const xs = [...Array.from({ length: n + 1 }, (_, i) => a + ((b - a) * i) / n), ...fijos].sort((p, q) => p - q);
    const out: number[] = [];
    for (const x of xs) {
      if (!out.length || x - out[out.length - 1] > 0.035) out.push(x);
      else if (fijos.includes(x)) out[out.length - 1] = x;
    }
    if (Math.abs(out[out.length - 1] - b) < 0.035) out[out.length - 1] = b;
    else out.push(b);
    out[0] = a;
    return out;
  };
  const todos = [...huecos, ...parches];
  const us = cortes(0, L, todos.flatMap((h) => [h.u0, h.u1]));
  const vs = cortes(o.v0, o.v1, todos.flatMap((h) => [h.v0, h.v1]));
  // las manchas (cada cara con las suyas), más marcadas que en la piedra: el barro se mancha más
  const manchas = manchasDeMuro({ largo: L, v0: o.v0, v1: o.v1, azar: az, fuerza: 2.6 });
  // sin pasar de un tono (más oscuro, el sombreador lo tomaría por madera)
  const tono = (u: number, v: number) => o.color.clone().multiplyScalar(Math.max(0.68, manchas(u, v)));
  const [ux, uz] = cara.u;
  const N: V3 = [-uz, 0, ux], U: V3 = [ux, 0, uz];
  const dentro = (u: number, v: number) => todos.some((h) => u > h.u0 && u < h.u1 && v > h.v0 && v < h.v1);
  // el barro ondulado: lomas suaves que la luz marca, quietas en los bordes (así las esquinas y los cantos cierran)
  const fx = az() * 30, fy = az() * 30;
  const quieto = (u: number, v: number) => {
    let d = Math.min(u, L - u, v - o.v0, o.v1 - v);
    for (const h of todos) d = Math.min(d, Math.hypot(Math.max(h.u0 - u, 0, u - h.u1), Math.max(h.v0 - v, 0, v - h.v1)));
    return suave(0, 0.2, d);
  };
  const alto = (u: number, v: number) => (ondula ? ondula * quieto(u, v) * (ruido2(u * 1.1 + fx, v * 1.1 + fy) * 2 - 1) : 0);
  const nor = (u: number, v: number): V3 => {
    if (!ondula) return N;
    const dd = 0.06;
    const gu = (alto(u + dd, v) - alto(u - dd, v)) / (2 * dd), gv = (alto(u, v + dd) - alto(u, v - dd)) / (2 * dd);
    const n = [N[0] - U[0] * gu, -gv, N[2] - U[2] * gu], nl = Math.hypot(n[0], n[1], n[2]);
    return [n[0] / nl, n[1] / nl, n[2] / nl];
  };
  for (let i = 0; i < us.length - 1; i++)
    for (let j = 0; j < vs.length - 1; j++) {
      const u0 = us[i], u1 = us[i + 1], v0 = vs[j], v1 = vs[j + 1];
      if (dentro((u0 + u1) / 2, (v0 + v1) / 2)) continue;
      const P = (u: number, v: number) => enCara(cara, u, v, alto(u, v));
      l.quadN(P(u0, v0), P(u1, v0), P(u1, v1), P(u0, v1), tono(u0, v0), tono(u1, v0), tono(u1, v1), tono(u0, v1), nor(u0, v0), nor(u1, v0), nor(u1, v1), nor(u0, v1));
    }
  // el canto del revoque alrededor de los huecos y de los parches (se ve que es grueso)
  const canto = (h: Hueco, hondo: number, abajo: boolean) => {
    const P = (u: number, v: number, e: number) => enCara(cara, u, v, e);
    const c = tono((h.u0 + h.u1) / 2, (h.v0 + h.v1) / 2).multiplyScalar(0.8);
    if (abajo && h.v0 > o.v0 + 1e-3) l.quad(P(h.u0, h.v0, 0), P(h.u1, h.v0, 0), P(h.u1, h.v0, -hondo), P(h.u0, h.v0, -hondo), c);
    if (h.v1 < o.v1 - 1e-3) l.quad(P(h.u0, h.v1, -hondo), P(h.u1, h.v1, -hondo), P(h.u1, h.v1, 0), P(h.u0, h.v1, 0), c);
    l.quad(P(h.u0, h.v0, -hondo), P(h.u0, h.v1, -hondo), P(h.u0, h.v1, 0), P(h.u0, h.v0, 0), c);
    l.quad(P(h.u1, h.v0, 0), P(h.u1, h.v1, 0), P(h.u1, h.v1, -hondo), P(h.u1, h.v0, -hondo), c);
  };
  for (const h of huecos) canto(h, grueso, true);
  // en los parches, los ladrillos de adobe (más adentro que el revoque)
  const ladrillo = o.ladrillo ?? new THREE.Color("#ad916e");
  for (const p of parches) {
    canto(p, grueso * 0.6, true);
    const filas: [number, number][] = [];
    const n = Math.max(1, Math.round((p.v1 - p.v0) / 0.085));
    for (let k = 0; k < n; k++) filas.push([p.v0 + ((p.v1 - p.v0) * k) / n, p.v0 + ((p.v1 - p.v0) * (k + 1)) / n]);
    sillares(l, cara, { hiladas: filas, color: ladrillo, azar: az, desde: p.u0, hasta: p.u1, largos: [0.16, 0.26], sale: -grueso * 0.6, hondo: 0.01, bisel: 0.01, junta: 0.014 });
  }
}
