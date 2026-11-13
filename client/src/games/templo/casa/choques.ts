/**
 * Lo que no deja pasar en la casa por dentro y en los edificios (la escuela, el palacio y la cámara), en metros: los muros
 * con sus aberturas, la puerta de la calle, el horno, la higuera, la escalera, su llegada arriba, la puerta del huerto, los
 * muebles y las personas. Lo usan el motor (casa/mundo-casa.ts) y la prueba de los pasos (shared/pasos-libres.test.ts):
 * así la prueba mide exactamente lo mismo que el juego. Sin three.js.
 */
import { CELDA, abierto, cuartoEn, medidas, pieza, type Colocado, type Cuarto, type Plano } from "@shared/casa-interior";
import { NavGrid } from "../three/nav";
import type { Circle, Rect, V2 } from "../layout";

/** El cuerpo de quien camina (para chocar). */
export const PLAYER_R = 0.22;
/**
 * Lo que el buscador de caminos se aparta de cada choque: apenas más que el cuerpo. Con 0,26 m y muestras cada 0,15 m, un
 * paso de una celda entre un mueble y la pared (0,6 m) podía quedar sin ninguna muestra libre y no se llegaba tocando.
 */
export const NAV_PAD = PLAYER_R + 0.01;
/** Cada cuánto mira el buscador de caminos (en metros). */
export const NAV_CELDA = 0.1;
/** El grueso de los muros. */
export const GROSOR = 0.12;

export type Lado = "N" | "S" | "E" | "O";
export const LADOS: [Lado, number, number][] = [
  ["N", 0, -1],
  ["S", 0, 1],
  ["O", -1, 0],
  ["E", 1, 0],
];
export const OPUESTO: Record<Lado, Lado> = { N: "S", S: "N", E: "O", O: "E" };

/** De celda a metros (el centro del plano queda en el origen) y al revés. */
export function medidasPlano(pl: Plano) {
  const wx = (x: number) => (x - pl.W / 2) * CELDA;
  const wz = (z: number) => (z - pl.D / 2) * CELDA;
  const celda = (x: number, z: number): [number, number] => [Math.floor(x / CELDA + pl.W / 2), Math.floor(z / CELDA + pl.D / 2)];
  return { wx, wz, celda };
}

/** Un borde de un cuarto que no da al mismo cuarto: un muro (con su choque) o una abertura (sin choque). */
export type TramoMuro = { cu: Cuarto; otro: Cuarto | null; lado: Lado; x: number; z: number; abierto: boolean; huerto: boolean; rect: Rect | null };

/**
 * Los tramos de muro de un piso, cada uno una sola vez. La puerta del huerto (en el muro del fondo de las casas) no lleva
 * tramo: se dibuja y choca aparte.
 */
export function tramosDeMuro(pl: Plano, p: 0 | 1, esPuertaHuerto: (x: number, z: number) => boolean): TramoMuro[] {
  const { wx, wz } = medidasPlano(pl);
  const out: TramoMuro[] = [];
  const vistos = new Set<string>();
  for (const cu of pl.cuartos.filter((c) => c.piso === p))
    for (let x = cu.x; x < cu.x + cu.w; x++)
      for (let z = cu.z; z < cu.z + cu.d; z++)
        for (const [lado, dx, dz] of LADOS) {
          const nx = x + dx, nz = z + dz;
          const otro = cuartoEn(pl, nx, nz, p);
          if (otro === cu) continue;
          const k = lado === "N" || lado === "S" ? `H${x},${lado === "N" ? z : z + 1}` : `V${lado === "O" ? x : x + 1},${z}`;
          if (vistos.has(k)) continue;
          vistos.add(k);
          const huerto = p === 0 && lado === "N" && !otro && esPuertaHuerto(x, z);
          const ab = !huerto && (abierto(pl, x, z, lado, p) || abierto(pl, nx, nz, OPUESTO[lado], p));
          let rect: Rect | null = null;
          if (!huerto && !ab) {
            if (lado === "N" || lado === "S") {
              const zz = wz(lado === "N" ? z : z + 1);
              rect = [wx(x) - GROSOR / 2, zz - GROSOR / 2, wx(x + 1) + GROSOR / 2, zz + GROSOR / 2];
            } else {
              const xx = wx(lado === "O" ? x : x + 1);
              rect = [xx - GROSOR / 2, wz(z) - GROSOR / 2, xx + GROSOR / 2, wz(z + 1) + GROSOR / 2];
            }
          }
          out.push({ cu, otro, lado, x, z, abierto: ab, huerto, rect });
        }
  return out;
}

export type Choques = { rects: [Rect[], Rect[]]; circles: [Circle[], Circle[]] };

/** Las celdas de la puerta del huerto (solo en las casas; los edificios no tienen). */
export function celdasHuerto(pl: Plano, edificio: boolean): [number, number][] {
  return edificio ? [] : pl.huerto ?? [];
}

/** Lo fijo de un plano: muros, puerta de la calle, horno, higuera, escalera, su llegada y la puerta del huerto. */
export function choquesFijos(pl: Plano, o: { edificio: boolean }): Choques {
  const { wx, wz } = medidasPlano(pl);
  const rects: [Rect[], Rect[]] = [[], []];
  const circles: [Circle[], Circle[]] = [[], []];
  const huerto = celdasHuerto(pl, o.edificio);
  const esPuertaHuerto = (x: number, z: number) => huerto.some(([hx, hz]) => hx === x && hz === z);
  for (const p of [0, 1] as const) {
    if (!pl.cuartos.some((c) => c.piso === p)) continue;
    for (const t of tramosDeMuro(pl, p, esPuertaHuerto)) if (t.rect) rects[p].push(t.rect);
    if (p === 0) {
      // la puerta de la calle no deja salir caminando: se sale por el círculo
      const [px, pz] = pl.puerta;
      rects[0].push([wx(px) - 0.2, wz(pz + 1) + 0.18, wx(px + 2) + 0.2, wz(pz + 1) + 0.5]);
      const [hx, hz] = pl.horno;
      circles[0].push([wx(hx + 0.5), wz(hz + 0.5), 0.3]);
      if (pl.arbol) circles[0].push([wx(pl.arbol[0] + 0.5), wz(pl.arbol[1] + 0.5), 0.2]);
      if (huerto.length) {
        const xs = huerto.map(([x]) => x);
        const z = wz(huerto[0][1]);
        rects[0].push([wx(Math.min(...xs)) - GROSOR / 2, z - 0.6, wx(Math.max(...xs) + 1) + GROSOR / 2, z - GROSOR / 2]);
      }
      if (pl.escalera) {
        const e = pl.escalera;
        const xs = e.celdas.map((c) => c[0]), zs = e.celdas.map((c) => c[1]);
        rects[0].push([wx(Math.min(...xs)), wz(Math.min(...zs)), wx(Math.max(...xs) + 1), wz(Math.max(...zs) + 1)]);
      }
    } else if (pl.escalera) {
      // la llegada de la escalera arriba no tiene pretil, pero tampoco se baja caminando
      const [ax, az] = pl.escalera.arriba;
      rects[1].push([wx(ax), wz(az + 1) + 0.12, wx(ax + 1), wz(az + 1) + 0.45]);
    }
  }
  return { rects, circles };
}

/** Los muebles también estorban al caminar (las esteras y las alfombras no: capa 0). */
export function choquesMuebles(pl: Plano, items: Colocado[]): [Rect[], Rect[]] {
  const { wx, wz } = medidasPlano(pl);
  const out: [Rect[], Rect[]] = [[], []];
  for (const c of items) {
    const mu = pieza(c.m);
    if (!mu || mu.capa === 0) continue;
    const [w, d] = medidas(mu, c.r);
    out[c.p].push([wx(c.x) + 0.06, wz(c.z) + 0.06, wx(c.x + w) - 0.06, wz(c.z + d) - 0.06]);
  }
  return out;
}

/** El buscador de caminos de un piso, con las mismas medidas que usa el motor. */
export function navDe(pl: Plano, p: 0 | 1, rects: Rect[], circles: Circle[]): NavGrid {
  const { wx, wz, celda } = medidasPlano(pl);
  return new NavGrid(rects, circles, NAV_PAD, {
    minX: wx(0) - 0.3,
    maxX: wx(pl.W) + 0.3,
    minZ: wz(0) - 0.3,
    maxZ: wz(pl.D) + 0.3,
    cell: NAV_CELDA,
    walkable: (x, z) => {
      const [cx, cz] = celda(x, z);
      return !!cuartoEn(pl, cx, cz, p);
    },
  });
}

/** Todo lo que se alcanza caminando desde un punto (en 8 direcciones, sin cortar esquinas, como el buscador). */
export function alcanzable(nav: NavGrid, desde: V2): (x: number, z: number, radio?: number) => boolean {
  const i0 = Math.floor((desde[0] - nav.minX) / nav.cell), j0 = Math.floor((desde[1] - nav.minZ) / nav.cell);
  const visto = new Uint8Array(nav.nx * nav.nz);
  const cola: number[] = [];
  // si el punto de partida cae justo en un choque, se parte de la celda libre más cercana
  let ini: [number, number] | null = null;
  for (let r = 0; r < 6 && !ini; r++)
    for (let di = -r; di <= r && !ini; di++)
      for (let dj = -r; dj <= r && !ini; dj++) if (nav.free(i0 + di, j0 + dj)) ini = [i0 + di, j0 + dj];
  if (ini) {
    visto[ini[1] * nav.nx + ini[0]] = 1;
    cola.push(ini[1] * nav.nx + ini[0]);
  }
  while (cola.length) {
    const c = cola.pop()!;
    const ci = c % nav.nx, cj = Math.floor(c / nav.nx);
    for (let di = -1; di <= 1; di++)
      for (let dj = -1; dj <= 1; dj++) {
        if (!di && !dj) continue;
        const ni = ci + di, nj = cj + dj;
        if (!nav.free(ni, nj)) continue;
        if (di && dj && (!nav.free(ci + di, cj) || !nav.free(ci, cj + dj))) continue;
        const id = nj * nav.nx + ni;
        if (visto[id]) continue;
        visto[id] = 1;
        cola.push(id);
      }
  }
  // ¿hay algún punto alcanzable a menos de `radio` de (x, z)?
  return (x, z, radio = 0.3) => {
    const r = Math.ceil(radio / nav.cell);
    const ic = Math.floor((x - nav.minX) / nav.cell), jc = Math.floor((z - nav.minZ) / nav.cell);
    for (let di = -r; di <= r; di++)
      for (let dj = -r; dj <= r; dj++) {
        const i = ic + di, j = jc + dj;
        if (i < 0 || j < 0 || i >= nav.nx || j >= nav.nz) continue;
        const px = nav.minX + (i + 0.5) * nav.cell, pz = nav.minZ + (j + 0.5) * nav.cell;
        if ((px - x) ** 2 + (pz - z) ** 2 > radio * radio) continue;
        if (visto[j * nav.nx + i]) return true;
      }
    return false;
  };
}
