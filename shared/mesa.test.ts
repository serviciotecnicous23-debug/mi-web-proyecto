// El marco de los juegos de mesa (shared/mesa.ts) y su juego de ejemplo, el tres en raya: las jugadas válidas, quién
// juega, cómo termina, que la computadora en «difícil» no pierda y que el azar con semilla sea repetible.
import { test } from "node:test";
import assert from "node:assert/strict";
import { azarConSemilla, jugadaValida, mismaJugada, nombreDeBot, quienesJuegan, type AsientoMesa } from "./mesa";
import { MESAS, ORDEN_MESAS, esMesa } from "./mesa/index";
import { TRES_EN_RAYA, lineaGanadora, type EstadoTres } from "./mesa/tres-en-raya";

const asientos: AsientoMesa[] = [
  { n: 0, nombre: "Ana", bot: null },
  { n: 1, nombre: nombreDeBot(0), bot: "dificil" },
];

test("el azar con semilla es repetible y queda entre 0 y 1", () => {
  const a = azarConSemilla(42);
  const b = azarConSemilla(42);
  const xs = Array.from({ length: 50 }, () => a());
  assert.deepEqual(xs, Array.from({ length: 50 }, () => b()));
  assert.ok(xs.every((x) => x >= 0 && x < 1));
  assert.notDeepEqual(xs, Array.from({ length: 50 }, azarConSemilla(43)));
});

test("los compañeros de la computadora siempre llevan 🤖", () => {
  for (let i = -3; i < 30; i++) assert.match(nombreDeBot(i), / 🤖$/);
});

test("el registro de juegos de mesa", () => {
  assert.ok(esMesa("tres-en-raya"));
  assert.ok(!esMesa("monopoly"));
  assert.ok(ORDEN_MESAS.every((id) => MESAS[id].id === id));
  for (const id of ORDEN_MESAS) {
    const j = MESAS[id];
    assert.ok(j.min >= 1 && j.max >= j.min, id);
    assert.ok(j.relojMs >= 5_000, id);
    assert.ok(j.verso.text && j.verso.ref, id);
  }
});

test("tres en raya: turnos, jugadas válidas y la línea que gana", () => {
  const azar = azarConSemilla(1);
  let e: EstadoTres = TRES_EN_RAYA.estadoInicial(asientos, azar);
  assert.deepEqual(quienesJuegan(TRES_EN_RAYA, e), [0]);
  assert.equal(TRES_EN_RAYA.jugadasValidas(e, 1).length, 0, "no le toca al otro");
  assert.ok(jugadaValida(TRES_EN_RAYA, e, 0, 4));
  for (const [asiento, celda] of [[0, 0], [1, 3], [0, 1], [1, 4]] as const) e = TRES_EN_RAYA.aplicar(e, asiento, celda, azar);
  assert.ok(!jugadaValida(TRES_EN_RAYA, e, 0, 0), "la celda ya está ocupada");
  assert.equal(TRES_EN_RAYA.terminado(e), null);
  e = TRES_EN_RAYA.aplicar(e, 0, 2, azar);
  const r = TRES_EN_RAYA.terminado(e);
  assert.ok(r);
  assert.deepEqual(r!.ganadores, [0]);
  assert.deepEqual(lineaGanadora(e.tablero), [0, 1, 2]);
  assert.deepEqual(quienesJuegan(TRES_EN_RAYA, e), []);
  assert.deepEqual(TRES_EN_RAYA.vistaPara(e, null).linea, [0, 1, 2]);
});

test("tres en raya: empate con el tablero lleno", () => {
  const azar = azarConSemilla(2);
  let e = TRES_EN_RAYA.estadoInicial(asientos, azar);
  // X O X / X O O / O X X → sin línea
  for (const [a, c] of [[0, 0], [1, 1], [0, 2], [1, 4], [0, 3], [1, 5], [0, 7], [1, 6], [0, 8]] as const) e = TRES_EN_RAYA.aplicar(e, a, c, azar);
  const r = TRES_EN_RAYA.terminado(e);
  assert.ok(r && r.ganadores.length === 0 && /Empate/.test(r.titulo), JSON.stringify(r));
});

test("tres en raya: la computadora en «difícil» nunca pierde (contra jugadas al azar, 200 partidas)", () => {
  for (let partida = 0; partida < 200; partida++) {
    const azar = azarConSemilla(1000 + partida);
    let e = TRES_EN_RAYA.estadoInicial(asientos, azar);
    while (!TRES_EN_RAYA.terminado(e)) {
      const t = TRES_EN_RAYA.turnoDe(e)!;
      const ls = TRES_EN_RAYA.jugadasValidas(e, t);
      const j = t === 1 ? TRES_EN_RAYA.jugadaDeBot(e, 1, "dificil", azar) : ls[Math.floor(azar() * ls.length)];
      assert.ok(ls.some((x) => mismaJugada(x, j)), "la computadora juega solo jugadas válidas");
      e = TRES_EN_RAYA.aplicar(e, t, j, azar);
    }
    assert.ok(!TRES_EN_RAYA.terminado(e)!.ganadores.includes(0), `perdió la computadora en la partida ${partida}`);
  }
});

test("tres en raya: en «fácil» la computadora se equivoca a veces", () => {
  let gana0 = 0;
  for (let partida = 0; partida < 200; partida++) {
    const azar = azarConSemilla(5000 + partida);
    let e = TRES_EN_RAYA.estadoInicial(asientos, azar);
    while (!TRES_EN_RAYA.terminado(e)) {
      const t = TRES_EN_RAYA.turnoDe(e)!;
      const j = TRES_EN_RAYA.jugadaDeBot(e, t, t === 0 ? "dificil" : "facil", azar);
      e = TRES_EN_RAYA.aplicar(e, t, j, azar);
    }
    if (TRES_EN_RAYA.terminado(e)!.ganadores.includes(0)) gana0++;
  }
  assert.ok(gana0 > 40, `el difícil le ganó al fácil solo ${gana0} de 200`);
});
