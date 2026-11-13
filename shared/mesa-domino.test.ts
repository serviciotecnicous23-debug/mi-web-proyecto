// El dominó (shared/mesa/domino.ts): el reparto, quién abre la primera mano, casar en las puntas, robar y pasar, el
// dominó y el tranque, las parejas, la mano siguiente, la meta, que cada uno vea solo sus fichas y que la computadora
// juegue siempre algo que vale.
import { test } from "node:test";
import assert from "node:assert/strict";
import { azarConSemilla, jugadaValida, type AsientoMesa, type NivelBot } from "./mesa";
import { DOMINO, aplicarDomino, extremos, todasLasFichas, type EstadoDomino, type Ficha, type JugadaDomino } from "./mesa/domino";

const asientos = (n: number): AsientoMesa[] => Array.from({ length: n }, (_, i) => ({ n: i, nombre: `J${i}`, bot: i ? ("normal" as NivelBot) : null }));
const suma = (m: Ficha[]) => m.reduce((s, f) => s + f[0] + f[1], 0);

test("dominó: 28 fichas, 7 a cada uno, el pozo y quién abre", () => {
  assert.equal(todasLasFichas().length, 28);
  for (const n of [2, 3, 4]) {
    for (let semilla = 1; semilla <= 20; semilla++) {
      const e = DOMINO.estadoInicial(asientos(n), azarConSemilla(semilla));
      assert.equal(e.manos.length, n);
      assert.ok(e.manos.every((m) => m.length === 7));
      assert.equal(e.pozo.length, n < 4 ? 28 - 7 * n : 0);
      assert.equal(e.parejas, n === 4);
      assert.equal(e.puntos.length, n === 4 ? 2 : n);
      // abre quien tiene el doble más alto (con 4 jugadores, siempre el doble seis)
      const abre = e.abre!;
      assert.ok(e.manos[e.turno].some((f) => f[0] === abre[0] && f[1] === abre[1]));
      if (n === 4) assert.deepEqual(abre, [6, 6]);
      const js = DOMINO.jugadasValidas(e, e.turno);
      assert.ok(js.length >= 1 && js.every((j) => typeof j !== "string" && j.f[0] === abre[0] && j.f[1] === abre[1]), "la primera jugada es la ficha que abre");
      assert.equal(DOMINO.jugadasValidas(e, (e.turno + 1) % n).length, 0);
    }
  }
});

/** Un estado armado a mano (4 jugadores por parejas o 2 sin pozo). */
function con(manos: Ficha[][], mesa: [number, number][] = [], extra: Partial<EstadoDomino> = {}): EstadoDomino {
  const e = DOMINO.estadoInicial(asientos(manos.length), azarConSemilla(1));
  return {
    ...e,
    manos,
    pozo: [],
    mesa: mesa.map(([izq, der], n) => ({ izq, der, quien: 0, n })),
    abre: null,
    turno: 0,
    pases: 0,
    colocadas: mesa.length,
    faltan: manos.map(() => []),
    ...extra,
  };
}

test("dominó: casar en las puntas, de cada lado, y girar la ficha", () => {
  // en la mesa: 3|5 6|6? no: la fila 3-5, 5-6 → puntas 3 y 6
  const e = con(
    [
      [
        [6, 2],
        [3, 1],
        [4, 4],
      ],
      [[0, 0]],
    ],
    [
      [3, 5],
      [5, 6],
    ],
  );
  assert.deepEqual(extremos(e.mesa), [3, 6]);
  const js = DOMINO.jugadasValidas(e, 0) as Exclude<JugadaDomino, string>[];
  assert.deepEqual(
    js.map((j) => `${j.f.join("")}${j.lado}`),
    ["62der", "31izq"],
  );
  const a = aplicarDomino(e, 0, { f: [6, 2], lado: "der" }, azarConSemilla(1));
  assert.deepEqual(extremos(a.mesa), [3, 2], "el 6|2 se gira para casar el 6");
  assert.equal(a.mesa[a.mesa.length - 1].izq, 6);
  const b = aplicarDomino(e, 0, { f: [3, 1], lado: "izq" }, azarConSemilla(1));
  assert.deepEqual(extremos(b.mesa), [1, 6]);
  assert.equal(b.turno, 1);
  assert.ok(!jugadaValida(DOMINO, e, 0, { f: [4, 4], lado: "der" }), "el 4|4 no casa");
  assert.ok(!jugadaValida(DOMINO, e, 0, { f: [6, 2], lado: "izq" }), "el 6|2 no va a la izquierda");
  // con las dos puntas iguales, una sola jugada (no se repite el mismo lugar)
  const iguales = con([[[5, 1]], [[0, 0]]], [[5, 5]]);
  assert.equal(DOMINO.jugadasValidas(iguales, 0).length, 1);
});

test("dominó: robar del pozo, pasar y lo que se sabe del que pasa", () => {
  const conPozo = con([[[0, 1]], [[2, 2]]], [[6, 6]], { pozo: [[6, 3], [4, 4]] });
  assert.deepEqual(DOMINO.jugadasValidas(conPozo, 0), ["robar"]);
  const r = aplicarDomino(conPozo, 0, "robar", azarConSemilla(1));
  assert.equal(r.manos[0].length, 2);
  assert.equal(r.pozo.length, 1);
  assert.equal(r.turno, 0, "sigue jugando quien robó");
  assert.ok(r.faltan[0].includes(6), "se sabe que no tenía seises");
  assert.ok(DOMINO.jugadasValidas(r, 0).some((j) => typeof j !== "string" && j.f[0] === 6 && j.f[1] === 3));
  const sinPozo = con([[[0, 1]], [[6, 2]]], [[6, 6]]);
  assert.deepEqual(DOMINO.jugadasValidas(sinPozo, 0), ["pasar"]);
  const p = aplicarDomino(sinPozo, 0, "pasar", azarConSemilla(1));
  assert.equal(p.turno, 1);
  assert.equal(p.pases, 1);
});

test("dominó: el dominó (quedarse sin fichas) anota lo que les queda a los demás", () => {
  const e = con(
    [
      [[6, 4]],
      [
        [1, 1],
        [2, 3],
      ],
    ],
    [[6, 6]],
  );
  const d = aplicarDomino(e, 0, { f: [6, 4], lado: "der" }, azarConSemilla(1));
  assert.equal(d.fase, "finMano");
  assert.equal(d.finMano?.como, "domino");
  assert.equal(d.finMano?.ganador, 0);
  assert.equal(d.finMano?.puntos, 7);
  assert.deepEqual(d.puntos, [7, 0]);
  // la mano siguiente: solo quien ganó toca «seguir», y empieza él con cualquier ficha
  assert.deepEqual(DOMINO.jugadasValidas(d, 0), ["seguir"]);
  assert.deepEqual(DOMINO.jugadasValidas(d, 1), []);
  const s = aplicarDomino(d, 0, "seguir", azarConSemilla(7));
  assert.equal(s.fase, "jugando");
  assert.equal(s.mano, 2);
  assert.equal(s.turno, 0);
  assert.equal(s.abre, null);
  assert.ok(s.manos.every((m) => m.length === 7));
  assert.deepEqual(s.puntos, [7, 0], "los puntos siguen");
});

test("dominó: el tranque, por parejas, y la meta", () => {
  // 4 jugadores por parejas; las puntas 0 y 0 y nadie tiene ceros: pasan los cuatro → tranque
  const manos: Ficha[][] = [
    [
      [1, 1],
      [2, 1],
    ], // 5
    [[6, 6]], // 12
    [[1, 2]], // 3  → pareja 0 (asientos 0 y 2): 8
    [
      [5, 5],
      [3, 4],
    ], // 17 → pareja 1: 29
  ];
  let e = con(manos, [[0, 0]]);
  assert.ok(e.parejas);
  for (let k = 0; k < 4; k++) e = aplicarDomino(e, e.turno, "pasar", azarConSemilla(1));
  assert.equal(e.finMano?.como, "tranque");
  assert.equal(e.finMano?.equipo, 0, "gana la pareja con menos puntos");
  assert.equal(e.finMano?.ganador, 2, "y dentro de ella, quien tiene menos");
  assert.equal(e.finMano?.puntos, suma(manos[0]) + suma(manos[1]) + suma(manos[3]));
  assert.deepEqual(e.puntos, [34, 0]);
  // la meta: con 95 y un dominó de 10, la pareja llega a 100 y la partida termina
  const meta = con([[[6, 4]], [[5, 5]], [[0, 1]], [[2, 2]]], [[6, 6]], { puntos: [95, 40] });
  const fin = aplicarDomino(meta, 0, { f: [6, 4], lado: "der" }, azarConSemilla(1));
  assert.equal(fin.fase, "fin");
  const r = DOMINO.terminado(fin);
  assert.deepEqual(r?.ganadores, [0, 2]);
  assert.match(r!.titulo, /pareja/);
  assert.equal(DOMINO.turnoDe(fin), null);
});

test("dominó: cada uno ve solo sus fichas (y al terminar la mano se destapan)", () => {
  const e = DOMINO.estadoInicial(asientos(3), azarConSemilla(11));
  const v = DOMINO.vistaPara(e, 1);
  assert.deepEqual(v.miMano, e.manos[1]);
  assert.deepEqual(v.cuantas, [7, 7, 7]);
  assert.equal(v.pozo, 7);
  assert.equal(v.finMano, null);
  assert.ok(!JSON.stringify(v).includes(JSON.stringify(e.manos[0])) || e.manos[0].length === 0, "no van las fichas de otro");
  assert.deepEqual(DOMINO.vistaPara(e, null).miMano, []);
});

test("dominó: partidas enteras entre computadoras, con jugadas que valen", () => {
  for (const n of [2, 3, 4]) {
    const azar = azarConSemilla(100 + n);
    let e = DOMINO.estadoInicial(asientos(n), azar);
    let pasos = 0;
    while (!DOMINO.terminado(e) && pasos < 3000) {
      const a = DOMINO.turnoDe(e)!;
      const nivel: NivelBot = (["facil", "normal", "dificil"] as const)[a % 3];
      const j = DOMINO.jugadaDeBot(e, a, nivel, azar);
      assert.ok(jugadaValida(DOMINO, e, a, j), JSON.stringify(j));
      e = DOMINO.aplicar(e, a, j, azar);
      pasos++;
      // nunca se pierde ni se repite una ficha
      if (e.fase === "jugando") {
        const todas = [...e.manos.flat(), ...e.pozo, ...e.mesa.map((m) => [Math.min(m.izq, m.der), Math.max(m.izq, m.der)] as Ficha)];
        assert.equal(new Set(todas.map((f) => `${Math.min(...f)}${Math.max(...f)}`)).size, 28);
      }
    }
    const r = DOMINO.terminado(e);
    assert.ok(r && r.ganadores.length >= 1, `${n} jugadores: terminó`);
    assert.ok(Math.max(...e.puntos) >= 100);
  }
});
