/**
 * Dónde va cada ficha del dominó en la mesa, para dibujarla (las reglas están en domino.ts). Como en los juegos de dominó
 * de siempre:
 * - la primera ficha va en el medio y la fila crece hacia los dos lados;
 * - al llegar a la orilla la fila dobla: una ficha parada en la esquina y otra que vuelve, y sigue en el renglón de
 *   abajo (la punta derecha) o de arriba (la izquierda), como una serpiente;
 * - los dobles van atravesados;
 * - ninguna ficha pisa a otra y las dos puntas quedan siempre a la vista (la mesa se aleja para que entre todo).
 * Una ficha nueva nunca mueve a las que ya están.
 *
 * Las medidas van en medias fichas: una ficha mide 2 × 1.
 */
import type { EnMesa, Ficha } from "./domino";

export type FichaPuesta = {
  n: number;
  quien: number;
  /** El centro, y si va acostada (2 de ancho por 1 de alto) o parada (1 por 2). */
  x: number;
  y: number;
  acostada: boolean;
  /** El número de la mitad de la izquierda (o de arriba) y el de la otra. */
  a: number;
  b: number;
  doble: boolean;
};

/** Una punta de la fila: dónde se pega la ficha que sigue y hacia dónde va. */
export type Brazo = {
  /** El medio del borde libre de la última ficha. */
  px: number;
  py: number;
  /** Hacia qué lado van los renglones (1: derecha) y hacia dónde dobla (1: abajo). */
  h: 1 | -1;
  v: 1 | -1;
  /** En la esquina: la ficha que sigue vuelve hacia el otro lado. */
  girando: boolean;
};

export type CadenaDomino = { fichas: FichaPuesta[]; izq: Brazo | null; der: Brazo | null };

/** Pone una ficha en una punta (`atras` es el número que casa; `punta`, el que queda libre) y mueve la punta. */
function poner(b: Brazo, atras: number, punta: number, limite: number): Omit<FichaPuesta, "n" | "quien"> {
  const doble = atras === punta;
  if (!b.girando) {
    // en el renglón: el doble atravesado (aunque se pase un poco de la orilla: así los renglones quedan siempre a la
    // misma distancia y ningún doble choca con los del renglón de al lado); la ficha acostada, si cabe antes de la orilla
    if (doble) {
      const x = b.px + b.h * 0.5;
      b.px += b.h;
      return { x, y: b.py, acostada: false, a: atras, b: punta, doble };
    }
    if (Math.abs(b.px + b.h * 2) <= limite + 1e-6) {
      const x = b.px + b.h;
      b.px += 2 * b.h;
      return { x, y: b.py, acostada: true, a: b.h > 0 ? atras : punta, b: b.h > 0 ? punta : atras, doble };
    }
    // la esquina: parada, con su primera mitad en el renglón y la otra hacia donde dobla
    const x = b.px + b.h * 0.5, y1 = b.py, y2 = b.py + b.v;
    b.px = x;
    b.py = y2 + b.v * 0.5;
    b.girando = true;
    return { x, y: (y1 + y2) / 2, acostada: false, a: b.v > 0 ? atras : punta, b: b.v > 0 ? punta : atras, doble };
  }
  // en la esquina, un doble va atravesado (acostado) y la vuelta queda para la que sigue
  if (doble) {
    const y = b.py + b.v * 0.5;
    b.py += b.v;
    return { x: b.px, y, acostada: true, a: atras, b: punta, doble };
  }
  // la vuelta: acostada hacia el otro lado, con su primera mitad debajo (o arriba) de la esquina
  const nh = (b.h > 0 ? -1 : 1) as 1 | -1;
  const x1 = b.px, y = b.py + b.v * 0.5, x2 = x1 + nh;
  b.px = x2 + nh * 0.5;
  b.py = y;
  b.h = nh;
  b.girando = false;
  return { x: (x1 + x2) / 2, y, acostada: true, a: nh > 0 ? atras : punta, b: nh > 0 ? punta : atras, doble };
}

/**
 * Las fichas de la mesa en su lugar. `limite` es hasta dónde llega cada renglón desde el medio (en medias fichas): más
 * chico en una pantalla angosta, para que la fila doble antes.
 */
export function cadenaDomino(mesa: EnMesa[], limite = 8): CadenaDomino {
  if (!mesa.length) return { fichas: [], izq: null, der: null };
  // la primera que se puso (la de número más chico) va en el medio; las de su derecha y las de su izquierda, en orden
  let k0 = 0;
  for (let i = 1; i < mesa.length; i++) if (mesa[i].n < mesa[k0].n) k0 = i;
  const f0 = mesa[k0];
  const doble0 = f0.izq === f0.der;
  const fichas: FichaPuesta[] = [{ n: f0.n, quien: f0.quien, x: 0, y: 0, acostada: !doble0, a: f0.izq, b: f0.der, doble: doble0 }];
  const media = doble0 ? 0.5 : 1;
  const der: Brazo = { px: media, py: 0, h: 1, v: 1, girando: false };
  const izq: Brazo = { px: -media, py: 0, h: -1, v: -1, girando: false };
  for (let i = k0 + 1; i < mesa.length; i++) fichas.push({ n: mesa[i].n, quien: mesa[i].quien, ...poner(der, mesa[i].izq, mesa[i].der, limite) });
  for (let i = k0 - 1; i >= 0; i--) fichas.push({ n: mesa[i].n, quien: mesa[i].quien, ...poner(izq, mesa[i].der, mesa[i].izq, limite) });
  return { fichas, izq, der };
}

/** Dónde quedaría una ficha si se pone en esa punta (la sombra que se ve antes de soltarla). */
export function dondeIria(mesa: EnMesa[], limite: number, f: Ficha, lado: "izq" | "der"): FichaPuesta {
  if (!mesa.length) {
    const doble = f[0] === f[1];
    return { n: -1, quien: -1, x: 0, y: 0, acostada: !doble, a: f[0], b: f[1], doble };
  }
  const c = cadenaDomino(mesa, limite);
  const fin = lado === "izq" ? mesa[0].izq : mesa[mesa.length - 1].der;
  const otro = f[0] === fin ? f[1] : f[0];
  const brazo = { ...(lado === "izq" ? c.izq! : c.der!) };
  return { n: -1, quien: -1, ...poner(brazo, fin, otro, limite) };
}

/** El medio de la mitad libre de cada punta (donde se marca que se puede jugar). */
export function mitadLibre(b: Brazo): { x: number; y: number } {
  const dx = b.girando ? 0 : b.h, dy = b.girando ? b.v : 0;
  return { x: b.px - dx * 0.5, y: b.py - dy * 0.5 };
}

/** El rectángulo de una ficha puesta (para saber cuánto ocupa la mesa). */
export function caja(p: FichaPuesta): { x0: number; y0: number; x1: number; y1: number } {
  const w = p.acostada ? 1 : 0.5, h = p.acostada ? 0.5 : 1;
  return { x0: p.x - w, y0: p.y - h, x1: p.x + w, y1: p.y + h };
}
