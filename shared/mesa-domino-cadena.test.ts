// Dónde va cada ficha del dominó en la mesa (shared/mesa/domino-cadena.ts): en partidas al azar ninguna ficha pisa a
// otra, una ficha nueva no mueve a las que ya están, las fichas que se tocan casan, la sombra de la ficha que se va a
// poner queda justo donde después queda la ficha, y la fila dobla antes de pasar la orilla.
import { test } from "node:test";
import assert from "node:assert/strict";
import { azarConSemilla } from "./mesa";
import { todasLasFichas, type EnMesa, type Ficha } from "./mesa/domino";
import { caja, cadenaDomino, dondeIria, type FichaPuesta } from "./mesa/domino-cadena";

/** Una fila al azar, como se arma en una mano: la primera ficha y después, a una punta o a la otra, las que casan. */
function filaAlAzar(semilla: number, largo = 28): EnMesa[] {
  const azar = azarConSemilla(semilla);
  const quedan = [...todasLasFichas()];
  const sacar = (i: number) => quedan.splice(i, 1)[0];
  const f0 = sacar(Math.floor(azar() * quedan.length));
  const mesa: EnMesa[] = [{ izq: f0[0], der: f0[1], quien: 0, n: 0 }];
  for (let n = 1; n < largo; n++) {
    const izq = mesa[0].izq, der = mesa[mesa.length - 1].der;
    const casan = quedan.map((f, i) => ({ f, i })).filter(({ f }) => f[0] === izq || f[1] === izq || f[0] === der || f[1] === der);
    if (!casan.length) break;
    const { f, i } = casan[Math.floor(azar() * casan.length)];
    sacar(i);
    const vaIzq = (f[0] === izq || f[1] === izq) && (!(f[0] === der || f[1] === der) || azar() < 0.5);
    if (vaIzq) mesa.unshift({ izq: f[0] === izq ? f[1] : f[0], der: izq, quien: n % 4, n });
    else mesa.push({ izq: der, der: f[0] === der ? f[1] : f[0], quien: n % 4, n });
  }
  return mesa;
}

const pisa = (p: FichaPuesta, q: FichaPuesta) => {
  const a = caja(p), b = caja(q);
  return a.x0 < b.x1 - 1e-6 && b.x0 < a.x1 - 1e-6 && a.y0 < b.y1 - 1e-6 && b.y0 < a.y1 - 1e-6;
};

test("dominó en la mesa: ninguna ficha pisa a otra, en partidas al azar y en mesas de todo ancho", () => {
  for (let semilla = 1; semilla <= 400; semilla++) {
    const mesa = filaAlAzar(semilla);
    for (const limite of [3, 4, 5, 6, 7, 8, 9]) {
      const { fichas } = cadenaDomino(mesa, limite);
      assert.equal(fichas.length, mesa.length);
      for (let i = 0; i < fichas.length; i++)
        for (let j = i + 1; j < fichas.length; j++) assert.ok(!pisa(fichas[i], fichas[j]), `semilla ${semilla}, límite ${limite}: las fichas ${fichas[i].n} y ${fichas[j].n} se pisan`);
    }
  }
});

test("dominó en la mesa: una ficha nueva no mueve a las que ya están, y su sombra queda donde va", () => {
  for (let semilla = 1; semilla <= 120; semilla++) {
    const mesa = filaAlAzar(semilla);
    for (const limite of [4, 6, 8]) {
      for (let k = 1; k < mesa.length; k++) {
        // la mesa como estaba antes de la ficha k (por orden de llegada)
        const antes = mesa.filter((f) => f.n < k);
        const nueva = mesa.find((f) => f.n === k)!;
        const ahora = mesa.filter((f) => f.n <= k);
        const a = new Map(cadenaDomino(antes, limite).fichas.map((p) => [p.n, p]));
        const b = cadenaDomino(ahora, limite).fichas;
        for (const p of b) if (p.n !== k) assert.deepEqual(p, a.get(p.n));
        // la sombra: la ficha nueva en su punta
        const lado = ahora[0].n === k ? "izq" : "der";
        const f: Ficha = [nueva.izq, nueva.der];
        const sombra = dondeIria(antes, limite, f, lado);
        const puesta = b.find((p) => p.n === k)!;
        assert.deepEqual([sombra.x, sombra.y, sombra.acostada, sombra.a, sombra.b], [puesta.x, puesta.y, puesta.acostada, puesta.a, puesta.b]);
      }
    }
  }
});

test("dominó en la mesa: las fichas que se tocan casan, y la fila no pasa la orilla", () => {
  for (let semilla = 1; semilla <= 200; semilla++) {
    const mesa = filaAlAzar(semilla);
    const limite = 5;
    const { fichas } = cadenaDomino(mesa, limite);
    const porN = new Map(fichas.map((p) => [p.n, p]));
    // la mitad de cada ficha en su lugar: el número que muestra cada media ficha (el doble, atravesado, toca por el
    // costado: se mide desde su centro)
    const mitades = (p: FichaPuesta): { x: number; y: number; v: number }[] =>
      p.doble
        ? [{ x: p.x, y: p.y, v: p.a }]
        : p.acostada
          ? [{ x: p.x - 0.5, y: p.y, v: p.a }, { x: p.x + 0.5, y: p.y, v: p.b }]
          : [{ x: p.x, y: p.y - 0.5, v: p.a }, { x: p.x, y: p.y + 0.5, v: p.b }];
    for (let i = 0; i + 1 < mesa.length; i++) {
      const p = porN.get(mesa[i].n)!, q = porN.get(mesa[i + 1].n)!;
      // donde se tocan dos fichas vecinas de la fila (sus mitades más cercanas), el número es el mismo
      let mejor = Infinity, iguales = false;
      for (const m of mitades(p))
        for (const o of mitades(q)) {
          const d = Math.hypot(m.x - o.x, m.y - o.y);
          if (d < mejor - 1e-6) {
            mejor = d;
            iguales = m.v === o.v;
          } else if (Math.abs(d - mejor) < 1e-6 && m.v === o.v) iguales = true;
        }
      assert.ok(mejor <= 1.0001, `semilla ${semilla}: las fichas ${mesa[i].n} y ${mesa[i + 1].n} no se tocan (${mejor})`);
      assert.ok(iguales, `semilla ${semilla}: las fichas ${mesa[i].n} y ${mesa[i + 1].n} no casan donde se tocan`);
    }
    // ninguna pasa la orilla más que lo que ocupan un doble en la orilla y la esquina que le sigue (con otro doble
    // atravesado en la esquina)
    for (const p of fichas) {
      const c = caja(p);
      assert.ok(c.x1 <= limite + 2.5001 && c.x0 >= -limite - 2.5001, `semilla ${semilla}: la ficha ${p.n} pasa la orilla`);
    }
  }
});
