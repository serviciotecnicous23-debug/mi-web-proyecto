/**
 * Caminos: una cuadrícula del monte del templo donde se marcan muros, columnas y muebles.
 * Los levitas y el pueblo buscan el camino más corto (A*) y lo suavizan en línea recta cuando
 * se puede. El aprendiz no usa caminos: choca suave con los obstáculos y se desliza por ellos.
 */
import { COURT, GATE, OUTER, OUTER_GATE, STAIRS_X, insideRect, type Circle, type Rect, type V2 } from "../layout";

export class NavGrid {
  readonly minX = COURT.minX - 0.5;
  readonly maxX = STAIRS_X + 6;
  readonly minZ = COURT.minZ - 0.5;
  readonly maxZ = COURT.maxZ + 0.5;
  readonly cell = 0.5;
  readonly nx: number;
  readonly nz: number;
  private blocked: Uint8Array;
  private cache = new Map<string, V2[]>();

  constructor(rects: Rect[], circles: Circle[], pad = 0.34) {
    this.nx = Math.ceil((this.maxX - this.minX) / this.cell);
    this.nz = Math.ceil((this.maxZ - this.minZ) / this.cell);
    this.blocked = new Uint8Array(this.nx * this.nz);
    this.rebuild(rects, circles, pad);
  }

  rebuild(rects: Rect[], circles: Circle[], pad = 0.34) {
    this.cache.clear();
    for (let i = 0; i < this.nx; i++)
      for (let j = 0; j < this.nz; j++) {
        const x = this.minX + (i + 0.5) * this.cell;
        const z = this.minZ + (j + 0.5) * this.cell;
        let b = !walkableArea(x, z);
        if (!b) for (const r of rects) if (insideRect(x, z, r, pad)) { b = true; break; }
        if (!b) for (const c of circles) if ((x - c[0]) ** 2 + (z - c[1]) ** 2 < (c[2] + pad) ** 2) { b = true; break; }
        this.blocked[j * this.nx + i] = b ? 1 : 0;
      }
  }

  private idx(x: number, z: number): [number, number] {
    return [Math.floor((x - this.minX) / this.cell), Math.floor((z - this.minZ) / this.cell)];
  }

  free(i: number, j: number) {
    return i >= 0 && j >= 0 && i < this.nx && j < this.nz && this.blocked[j * this.nx + i] === 0;
  }

  freeAt(x: number, z: number) {
    const [i, j] = this.idx(x, z);
    return this.free(i, j);
  }

  private nearestFree(i: number, j: number): [number, number] {
    if (this.free(i, j)) return [i, j];
    for (let r = 1; r < 8; r++)
      for (let di = -r; di <= r; di++)
        for (let dj = -r; dj <= r; dj++) {
          if (Math.abs(di) !== r && Math.abs(dj) !== r) continue;
          if (this.free(i + di, j + dj)) return [i + di, j + dj];
        }
    return [i, j];
  }

  /** ¿Se puede ir en línea recta? */
  lineFree(ax: number, az: number, bx: number, bz: number) {
    const d = Math.hypot(bx - ax, bz - az);
    const steps = Math.ceil(d / (this.cell * 0.5));
    for (let k = 1; k < steps; k++) {
      const t = k / steps;
      if (!this.freeAt(ax + (bx - ax) * t, az + (bz - az) * t)) return false;
    }
    return true;
  }

  /** Camino de (sx, sz) a (tx, tz). Devuelve los puntos a seguir (sin el de partida). */
  path(sx: number, sz: number, tx: number, tz: number): V2[] {
    if (this.lineFree(sx, sz, tx, tz)) return [[tx, tz]];
    const [si0, sj0] = this.idx(sx, sz);
    const [ti0, tj0] = this.idx(tx, tz);
    const [si, sj] = this.nearestFree(si0, sj0);
    const [ti, tj] = this.nearestFree(ti0, tj0);
    const key = `${si},${sj}>${ti},${tj}`;
    const cached = this.cache.get(key);
    if (cached) return [...cached.slice(0, -1), [tx, tz]];
    const raw = this.astar(si, sj, ti, tj);
    if (!raw) return [[tx, tz]];
    // suavizado: saltar puntos mientras se pueda ir derecho
    const pts: V2[] = raw.map(([i, j]) => [this.minX + (i + 0.5) * this.cell, this.minZ + (j + 0.5) * this.cell]);
    const out: V2[] = [];
    let cx = sx, cz = sz, k = 0;
    while (k < pts.length) {
      let far = k;
      for (let m = pts.length - 1; m > k; m--)
        if (this.lineFree(cx, cz, pts[m][0], pts[m][1])) {
          far = m;
          break;
        }
      out.push(pts[far]);
      cx = pts[far][0];
      cz = pts[far][1];
      k = far + 1;
    }
    out.push([tx, tz]);
    if (this.cache.size > 400) this.cache.clear();
    this.cache.set(key, out);
    return out;
  }

  private astar(si: number, sj: number, ti: number, tj: number): [number, number][] | null {
    const n = this.nx * this.nz;
    const g = new Float32Array(n).fill(Infinity);
    const came = new Int32Array(n).fill(-1);
    const closed = new Uint8Array(n);
    // montículo binario de (costo estimado, celda)
    const hf: number[] = [];
    const hi: number[] = [];
    const swap = (a: number, b: number) => {
      const tf = hf[a]; hf[a] = hf[b]; hf[b] = tf;
      const ti2 = hi[a]; hi[a] = hi[b]; hi[b] = ti2;
    };
    const push = (f: number, id: number) => {
      let k = hf.length;
      hf.push(f);
      hi.push(id);
      while (k > 0) {
        const up = (k - 1) >> 1;
        if (hf[up] <= hf[k]) break;
        swap(up, k);
        k = up;
      }
    };
    const pop = (): number => {
      const top = hi[0];
      const lf = hf.pop() as number;
      const li = hi.pop() as number;
      if (hf.length) {
        hf[0] = lf;
        hi[0] = li;
        let k = 0;
        for (;;) {
          const l = 2 * k + 1, r = l + 1;
          let m = k;
          if (l < hf.length && hf[l] < hf[m]) m = l;
          if (r < hf.length && hf[r] < hf[m]) m = r;
          if (m === k) break;
          swap(m, k);
          k = m;
        }
      }
      return top;
    };
    const s = sj * this.nx + si, t = tj * this.nx + ti;
    const h = (i: number, j: number) => {
      const dx = Math.abs(i - ti), dz = Math.abs(j - tj);
      return Math.max(dx, dz) + 0.414 * Math.min(dx, dz);
    };
    g[s] = 0;
    push(h(si, sj), s);
    let guard = 0;
    while (hf.length && guard++ < 40000) {
      const cur = pop();
      if (cur === t) {
        const out: [number, number][] = [];
        let c = cur;
        while (c !== -1) {
          out.push([c % this.nx, Math.floor(c / this.nx)]);
          c = came[c];
        }
        return out.reverse();
      }
      if (closed[cur]) continue;
      closed[cur] = 1;
      const ci = cur % this.nx, cj = Math.floor(cur / this.nx);
      for (let di = -1; di <= 1; di++)
        for (let dj = -1; dj <= 1; dj++) {
          if (!di && !dj) continue;
          const ni = ci + di, nj = cj + dj;
          if (!this.free(ni, nj)) continue;
          if (di && dj && (!this.free(ci + di, cj) || !this.free(ci, cj + dj))) continue; // sin cortar esquinas
          const nId = nj * this.nx + ni;
          if (closed[nId]) continue;
          const ng = g[cur] + (di && dj ? 1.414 : 1);
          if (ng < g[nId]) {
            g[nId] = ng;
            came[nId] = cur;
            push(ng + h(ni, nj), nId);
          }
        }
    }
    return null;
  }
}

/** Zonas donde se puede caminar: el atrio de los sacerdotes, la puerta, el gran atrio y la escalinata. */
export function walkableArea(x: number, z: number) {
  if (x > COURT.minX && x < COURT.maxX && z > COURT.minZ && z < COURT.maxZ) return true;
  if (x >= COURT.maxX - 0.1 && x <= OUTER.minX + 0.1 && Math.abs(z) < GATE.halfWidth) return true;
  if (x > OUTER.minX - 0.1 && x < OUTER.maxX && z > OUTER.minZ && z < OUTER.maxZ) return true;
  if (x >= OUTER.maxX - 0.1 && x < STAIRS_X + 6 && Math.abs(z) < OUTER_GATE.halfWidth) return true;
  return false;
}

/** Empuja un círculo fuera de cajas y círculos (choque suave, se desliza por las paredes). */
export function collide(x: number, z: number, r: number, rects: Rect[], circles: Circle[]): V2 {
  for (let pass = 0; pass < 2; pass++) {
    for (const b of rects) {
      const cx = Math.max(b[0], Math.min(x, b[2]));
      const cz = Math.max(b[1], Math.min(z, b[3]));
      const dx = x - cx, dz = z - cz;
      const d2 = dx * dx + dz * dz;
      if (d2 < r * r) {
        if (d2 > 1e-8) {
          const d = Math.sqrt(d2);
          x = cx + (dx / d) * r;
          z = cz + (dz / d) * r;
        } else {
          // el centro quedó adentro: salir por el lado más cercano
          const opts = [x - b[0], b[2] - x, z - b[1], b[3] - z];
          const m = Math.min(...opts);
          if (m === opts[0]) x = b[0] - r;
          else if (m === opts[1]) x = b[2] + r;
          else if (m === opts[2]) z = b[1] - r;
          else z = b[3] + r;
        }
      }
    }
    for (const c of circles) {
      const dx = x - c[0], dz = z - c[1];
      const rr = c[2] + r;
      const d2 = dx * dx + dz * dz;
      if (d2 < rr * rr && d2 > 1e-8) {
        const d = Math.sqrt(d2);
        x = c[0] + (dx / d) * rr;
        z = c[1] + (dz / d) * rr;
      }
    }
  }
  return [x, z];
}
