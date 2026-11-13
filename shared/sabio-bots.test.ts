// Los compañeros de la computadora de «¿Quién es sabio?»: los de la noche de los sabios y el rival del duelo de práctica
// contestan con el mismo método (`respuestaDeBot`, un azar fijo por partida, ronda y quién), el rival nunca se llama
// como quien juega y la práctica da poco gozo.
import { test } from "node:test";
import assert from "node:assert/strict";
import { NOMBRES_BOT, nombreDeBot, type NivelBot } from "./mesa";
import { BOT_SABIO, GOZO_DUELO, GOZO_PRACTICA_DUELO, azarFijo, nombreDeRival, numeroDeRival, respuestaDeBot } from "./sabio";

const NIVELES: NivelBot[] = ["facil", "normal", "dificil"];
const OPCIONES = ["Moisés", "Aarón", "Josué", "Caleb"];
const BUENA = "Josué";

test("azarFijo: siempre el mismo número para los mismos datos, entre 0 y 1", () => {
  for (let id = 1; id < 200; id++)
    for (const quien of [-1, -7, -12, 3, 40_000]) {
      const x = azarFijo(id, 4, quien, 2);
      assert.equal(x, azarFijo(id, 4, quien, 2));
      assert.ok(x >= 0 && x < 1, `${x}`);
    }
  assert.notEqual(azarFijo(10, 1, -1, 1), azarFijo(10, 2, -1, 1), "otra ronda, otro número");
  assert.notEqual(azarFijo(10, 1, -1, 1), azarFijo(11, 1, -1, 1), "otra partida, otro número");
});

test("respuestaDeBot es el mismo método de la noche de los sabios (#138): el mismo tiempo y la misma respuesta", () => {
  // así contestaban los compañeros de la noche antes de pasar el método a shared/sabio.ts
  const deLaNoche = (nivel: NivelBot, id: number, ronda: number, u: number, opciones: string[], correcta: string) => {
    const b = { facil: { ms: [6000, 17000], acierta: 0.45 }, normal: { ms: [4500, 13000], acierta: 0.66 }, dificil: { ms: [3000, 9500], acierta: 0.84 } }[nivel];
    const ms = b.ms[0] + (b.ms[1] - b.ms[0]) * azarFijo(id, ronda, u, 1);
    const malas = opciones.filter((o) => o !== correcta);
    const o = azarFijo(id, ronda, u, 2) < b.acierta || !malas.length ? correcta : malas[Math.floor(azarFijo(id, ronda, u, 3) * malas.length)];
    return { o, ms };
  };
  for (const nivel of NIVELES)
    for (let id = 1; id <= 60; id++)
      for (let ronda = 1; ronda <= 12; ronda++)
        for (const u of [-1, -2, -5]) assert.deepEqual(respuestaDeBot(nivel, id, ronda, u, OPCIONES, BUENA), deLaNoche(nivel, id, ronda, u, OPCIONES, BUENA));
});

test("cada nivel contesta en su tiempo y acierta como dice su nivel (fácil 45 %, normal 66 %, difícil 84 %)", () => {
  const promedio: Record<string, number> = {};
  for (const nivel of NIVELES) {
    const b = BOT_SABIO[nivel];
    let bien = 0;
    let n = 0;
    let suma = 0;
    for (let id = 1; id <= 400; id++)
      for (let ronda = 1; ronda <= 10; ronda++) {
        const r = respuestaDeBot(nivel, id, ronda, -((id % 12) + 1), OPCIONES, BUENA);
        assert.ok(r.ms >= b.ms[0] && r.ms <= b.ms[1], `${nivel}: ${r.ms} ms`);
        assert.ok(OPCIONES.includes(r.o), `${nivel}: «${r.o}» no está entre las opciones`);
        if (r.o === BUENA) bien++;
        suma += r.ms;
        n++;
      }
    const tasa = bien / n;
    assert.ok(Math.abs(tasa - b.acierta) < 0.03, `${nivel}: acierta ${(tasa * 100).toFixed(1)} % y debía ${(b.acierta * 100).toFixed(0)} %`);
    promedio[nivel] = suma / n;
  }
  assert.ok(promedio.dificil < promedio.normal && promedio.normal < promedio.facil, JSON.stringify(promedio));
  // y siempre dentro de los 20 s de la ronda (el fácil, a más tardar a los 17 s)
  for (const nivel of NIVELES) assert.ok(BOT_SABIO[nivel].ms[1] <= 17_000);
});

test("cuando se equivoca elige una de las malas, y con una sola opción siempre la buena", () => {
  let malas = 0;
  for (let id = 1; id <= 300; id++) {
    const r = respuestaDeBot("facil", id, 3, -4, OPCIONES, BUENA);
    if (r.o !== BUENA) {
      malas++;
      assert.ok(["Moisés", "Aarón", "Caleb"].includes(r.o));
    }
    assert.equal(respuestaDeBot("facil", id, 3, -4, [BUENA], BUENA).o, BUENA);
  }
  assert.ok(malas > 100, `el fácil se equivocó ${malas} de 300`);
});

test("el número del rival del duelo dice su nombre, siempre con 🤖", () => {
  assert.equal(nombreDeRival(-1), nombreDeBot(0));
  assert.equal(nombreDeRival(-1), `${NOMBRES_BOT[0]} 🤖`);
  assert.equal(nombreDeRival(-NOMBRES_BOT.length), `${NOMBRES_BOT[NOMBRES_BOT.length - 1]} 🤖`);
  for (let k = 0; k < NOMBRES_BOT.length; k++) {
    const numero = numeroDeRival("Luis", () => k / NOMBRES_BOT.length);
    assert.ok(numero <= -1 && numero >= -NOMBRES_BOT.length, `${numero}`);
    assert.equal(numero, -(k + 1), "sin choque, sale el que tocó al azar");
    assert.ok(nombreDeRival(numero).endsWith(" 🤖"));
  }
});

test("el rival del duelo nunca se llama como quien juega (con o sin tildes, mayúsculas o apellido)", () => {
  const sinTildes = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  for (const nombre of NOMBRES_BOT) {
    const formas = [nombre, nombre.toUpperCase(), sinTildes(nombre), `${nombre} López`, `María ${nombre}`];
    for (const forma of formas)
      for (let k = 0; k < NOMBRES_BOT.length; k++) {
        const rival = nombreDeRival(numeroDeRival(forma, () => k / NOMBRES_BOT.length)).replace(/ 🤖$/, "");
        assert.notEqual(sinTildes(rival), sinTildes(nombre), `«${forma}» jugó contra «${rival} 🤖»`);
      }
  }
});

test("contra la computadora el duelo es de práctica: como mucho 4 de gozo, y menos que contra una persona", () => {
  assert.ok(GOZO_PRACTICA_DUELO.gana <= 4);
  assert.ok(GOZO_PRACTICA_DUELO.pierde < GOZO_PRACTICA_DUELO.empate && GOZO_PRACTICA_DUELO.empate < GOZO_PRACTICA_DUELO.gana);
  assert.ok(GOZO_PRACTICA_DUELO.gana < GOZO_DUELO.gana && GOZO_PRACTICA_DUELO.empate < GOZO_DUELO.empate && GOZO_PRACTICA_DUELO.pierde < GOZO_DUELO.pierde);
});
