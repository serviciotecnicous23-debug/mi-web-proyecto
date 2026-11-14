// El parchís (shared/mesa/parchis.ts): la vuelta de cada color, sacar con 5, comer y contar 20, los seguros, las
// barreras (y abrirlas con 6), la meta con el número justo y contar 10, los tres seises, el turno que pasa solo, el final,
// lo que ve cada uno, lo que tarda la pantalla, y la computadora: que coma, que se ponga en seguro, que no deje fichas a
// tiro y que, en partidas enteras, juegue siempre algo que vale.
import { test } from "node:test";
import assert from "node:assert/strict";
import { azarConSemilla, jugadaValida, quienesJuegan, type AsientoMesa, type Azar, type NivelBot } from "./mesa";
import { MESAS, ORDEN_MESAS } from "./mesa/index";
import {
  ANIMA, CASA, META, PARCHIS, PARCHIS_MESA, ULTIMA_PISTA, aplicarParchis, casillaDe, coloresDe, esSeguro, estadoInicialParchis,
  jugadaBotParchis, mapaDePista, movimientos, type EstadoParchis, type EvParchis, type JugadaParchis,
} from "./mesa/parchis";

const asientos = (n: number, bots: (NivelBot | null)[] = []): AsientoMesa[] =>
  Array.from({ length: n }, (_, i) => ({ n: i, nombre: `J${i}`, bot: bots[i] ?? null }));
/** Un dado cargado: siempre sale `v`. */
const dado = (v: number): Azar => () => (v - 0.5) / 6;
/** El avance de un color para quedar en esa casilla de la pista. */
const posEn = (color: number, casilla: number) => (casilla - PARCHIS.salida[color] + PARCHIS.casillas) % PARCHIS.casillas;

/** Un estado armado a mano (las fichas de cada asiento, por su avance). */
function estado(fichas: number[][], extra: Partial<EstadoParchis> = {}): EstadoParchis {
  const e = estadoInicialParchis(asientos(fichas.length), fichas[0].length);
  return { ...e, fichas: fichas.map((l) => [...l]), llegada: fichas.map((l) => l.map(() => 0)), ...extra };
}
const tirar = (e: EstadoParchis, v: number) => aplicarParchis(e, e.turno, { t: "tirar" }, dado(v));
const mover = (e: EstadoParchis, f: number) => aplicarParchis(e, e.turno, { f, n: e.cuenta!.n }, dado(1));
const fichasQuePueden = (e: EstadoParchis) => movimientos(e, e.turno).map((m) => m.f);
const nuevos = (antes: EstadoParchis, despues: EstadoParchis): EvParchis[] => despues.eventos.filter((x) => x.n > antes.ev);
const tipos = (antes: EstadoParchis, despues: EstadoParchis) => nuevos(antes, despues).map((x) => x.t);

test("parchís: está en la mesa del patio, de 2 a 4, con su versículo y sus opciones", () => {
  assert.ok(ORDEN_MESAS.includes("parchis"));
  const j = MESAS.parchis;
  assert.equal(j, PARCHIS_MESA);
  assert.equal(j.min, 2);
  assert.equal(j.max, 4);
  assert.equal(j.modo, "turnos");
  assert.equal(j.verso.ref, "1 Corintios 9:24");
  assert.ok(j.como.length >= 4);
  assert.deepEqual(j.opciones?.map((o) => o.id), ["fichas"]);
  assert.equal(PARCHIS_MESA.estadoInicial(asientos(3), azarConSemilla(1), { fichas: "2" }).nFichas, 2);
  assert.equal(PARCHIS_MESA.estadoInicial(asientos(3), azarConSemilla(1), { fichas: "4" }).nFichas, 4);
});

test("parchís: la pista de 68, la vuelta de cada color y sus seguros", () => {
  assert.equal(META, 71);
  for (let c = 0; c < 4; c++) {
    assert.equal(casillaDe(c, 0), PARCHIS.salida[c], "empieza en su salida");
    assert.equal(casillaDe(c, ULTIMA_PISTA), PARCHIS.entrada[c], "termina la vuelta en su entrada");
    assert.ok(esSeguro(PARCHIS.salida[c]) && esSeguro(PARCHIS.entrada[c]));
    assert.equal(casillaDe(c, ULTIMA_PISTA + 1), null, "el camino de llegada ya no es pista");
    // da la vuelta entera sin repetir casillas
    const vistas = new Set(Array.from({ length: ULTIMA_PISTA + 1 }, (_, p) => casillaDe(c, p)));
    assert.equal(vistas.size, 64);
  }
  assert.equal(casillaDe(3, 12), 68);
  assert.equal(casillaDe(3, 13), 1, "después de la 68 viene la 1");
  assert.equal(PARCHIS.seguros.length, 12);
  assert.deepEqual(coloresDe(2), [0, 2], "con dos, frente a frente");
  assert.deepEqual(coloresDe(3), [0, 1, 2]);
  assert.deepEqual(coloresDe(4), [0, 1, 2, 3]);
});

test("parchís: al empezar todos en casa; sin un 5 no sale nadie y el turno pasa solo", () => {
  for (const n of [2, 3, 4]) {
    const e = PARCHIS_MESA.estadoInicial(asientos(n), azarConSemilla(n));
    assert.ok(e.fichas.every((l) => l.length === 4 && l.every((p) => p === CASA)));
    assert.deepEqual(PARCHIS_MESA.jugadasValidas(e, 0), [{ t: "tirar" }]);
    for (let a = 1; a < n; a++) assert.deepEqual(PARCHIS_MESA.jugadasValidas(e, a), []);
    assert.deepEqual(quienesJuegan(PARCHIS_MESA, e), [0]);
    const t = tirar(e, 3);
    assert.deepEqual(tipos(e, t), ["dado", "sin", "turno"]);
    assert.equal(t.turno, 1);
    assert.equal(t.fase, "tirar");
    // con un 6 sin poder mover, vuelve a tirar
    const s = tirar(e, 6);
    assert.deepEqual(tipos(e, s), ["dado", "sin", "turno"]);
    assert.equal(s.turno, 0);
    assert.equal(s.fase, "tirar");
    assert.equal(s.seises, 1);
  }
});

test("parchís: con un 5 se saca una ficha (y es obligatorio)", () => {
  const e = estado([
    [CASA, CASA, CASA, CASA],
    [CASA, CASA, CASA, CASA],
  ]);
  const t = tirar(e, 5);
  assert.equal(t.fase, "mover");
  assert.deepEqual(PARCHIS_MESA.jugadasValidas(t, 0), [0, 1, 2, 3].map((f) => ({ f, n: 5 })));
  const m = mover(t, 2);
  assert.equal(m.fichas[0][2], 0);
  assert.equal(casillaDe(0, 0), 5);
  assert.equal(m.turno, 1, "un 5 no repite");
  // con una ficha afuera y otras en casa, el 5 es para sacar
  const o = tirar(estado([[10, CASA, CASA, CASA], [CASA, CASA, CASA, CASA]]), 5);
  assert.deepEqual(fichasQuePueden(o), [1, 2, 3]);
  assert.ok(!jugadaValida(PARCHIS_MESA, o, 0, { f: 0, n: 5 }), "no se puede mover otra si se puede sacar");
  // con dos fichas mías en la salida no se puede sacar: se juega el 5 con otra
  const b = tirar(estado([[0, 0, CASA, CASA], [CASA, CASA, CASA, CASA]]), 5);
  assert.deepEqual(fichasQuePueden(b), [0, 1]);
  // con otro número, las de casa no salen
  const x = tirar(estado([[10, CASA, CASA, CASA], [CASA, CASA, CASA, CASA]]), 4);
  assert.deepEqual(fichasQuePueden(x), [0]);
});

test("parchís: al salir con dos fichas en la salida, se come a la ajena que llegó última", () => {
  // azul (asiento 1) y rojo (asiento 2) están en la salida del amarillo, que es seguro
  const e = estado([
    [CASA, CASA, CASA, CASA],
    [posEn(1, 5), CASA, CASA, CASA],
    [posEn(2, 5), CASA, CASA, CASA],
    [CASA, CASA, CASA, CASA],
  ]);
  e.llegada[1][0] = 3;
  e.llegada[2][0] = 7;
  const t = tirar(e, 5);
  const m = mover(t, 0);
  assert.equal(m.fichas[0][0], 0);
  assert.equal(m.fichas[2][0], CASA, "el rojo llegó último");
  assert.equal(m.fichas[1][0], posEn(1, 5), "el azul sigue ahí");
  assert.deepEqual(tipos(t, m), ["mueve", "come"]);
  assert.deepEqual(m.cuenta, { n: 20, tipo: "comer" });
  assert.deepEqual(fichasQuePueden(m), [0], "las de casa no cuentan 20");
  const c = mover(m, 0);
  assert.equal(c.fichas[0][0], 20);
  assert.equal(c.turno, 1);
  assert.equal(c.comio[0], 1);
  assert.equal(c.comidas[2], 1);
});

test("parchís: comer manda a casa y da 20; en los seguros no se come", () => {
  // amarillo en la 15 saca 3 y cae en la 18, donde está el rojo solo
  const e = estado([
    [posEn(0, 15), posEn(0, 30), CASA, CASA],
    [posEn(2, 18), CASA, CASA, CASA],
  ]);
  const t = tirar(e, 3);
  const m = mover(t, 0);
  assert.equal(m.fichas[1][0], CASA);
  assert.deepEqual(m.cuenta, { n: 20, tipo: "comer" });
  assert.equal(m.turno, 0, "todavía cuenta las 20");
  assert.deepEqual(fichasQuePueden(m), [0, 1], "cualquiera de las de la pista");
  const c = mover(m, 1);
  assert.equal(casillaDe(0, c.fichas[0][1]), 50);
  assert.equal(c.turno, 1);
  // en un seguro (la 17) caben dos de distinto color y nadie come
  const s = mover(tirar(estado([[posEn(0, 14), posEn(0, 13), CASA, CASA], [posEn(2, 17), CASA, CASA, CASA]]), 3), 0);
  assert.equal(s.fichas[1][0], posEn(2, 17));
  assert.equal(s.cuenta, null);
  assert.equal(mapaDePista(s).get(17)?.length, 2);
  // y ahí ya no cabe otra, pero se puede pasar (no es barrera: son de distinto color)
  const lleno = estado([[posEn(0, 17), posEn(0, 13), posEn(0, 15), CASA], [posEn(2, 17), CASA, CASA, CASA]]);
  const l4 = tirar(lleno, 4);
  assert.ok(!fichasQuePueden(l4).includes(1), "la 13 + 4 caería en la 17 llena");
  assert.ok(fichasQuePueden(l4).includes(2), "la 15 + 4 pasa por la 17");
});

test("parchís: las barreras no se pasan, y con un 6 hay que abrirlas", () => {
  // el rojo tiene barrera en la 20
  const e = estado([
    [posEn(0, 17), CASA, CASA, CASA],
    [posEn(2, 20), posEn(2, 20), CASA, CASA],
  ]);
  assert.deepEqual(fichasQuePueden(tirar(e, 4)), [], "la barrera no se pasa");
  assert.deepEqual(fichasQuePueden(tirar(e, 3)), [], "ni se cae en ella");
  assert.deepEqual(fichasQuePueden(tirar(e, 2)), [0]);
  assert.deepEqual(tipos(e, tirar(e, 4)), ["dado", "sin", "turno"]);
  // la barrera propia también frena a las propias
  const p = estado([[posEn(0, 20), posEn(0, 20), posEn(0, 18), CASA], [CASA, CASA, CASA, CASA]]);
  assert.ok(!fichasQuePueden(tirar(p, 4)).includes(2));
  // con un 6 se abre la barrera
  const b = estado([[posEn(0, 20), posEn(0, 20), posEn(0, 40), CASA], [CASA, CASA, CASA, CASA]]);
  assert.deepEqual(fichasQuePueden(tirar(b, 6)), [0, 1]);
  assert.deepEqual(fichasQuePueden(tirar(b, 4)), [0, 1, 2], "con otro número, cualquiera");
  // si la barrera no puede moverse 6, se juega con otra
  const f = estado([[posEn(0, 20), posEn(0, 20), posEn(0, 40), CASA], [posEn(2, 24), posEn(2, 24), CASA, CASA]]);
  assert.deepEqual(fichasQuePueden(tirar(f, 6)), [2]);
  // al formarla se avisa
  const fo = mover(tirar(estado([[posEn(0, 20), posEn(0, 16), CASA, CASA], [CASA, CASA, CASA, CASA]]), 4), 1);
  const ev = nuevos(e, fo).find((x) => x.t === "mueve");
  assert.ok(ev && ev.t === "mueve" && ev.barrera);
});

test("parchís: a la meta con el número justo, y llegar da 10", () => {
  const e = estado([
    [68, 20, CASA, CASA],
    [CASA, CASA, CASA, CASA],
  ]);
  assert.deepEqual(fichasQuePueden(tirar(e, 4)), [1], "68 + 4 se pasa de la meta");
  const t = tirar(e, 3);
  const m = mover(t, 0);
  assert.equal(m.fichas[0][0], META);
  assert.deepEqual(tipos(t, m), ["mueve", "meta"]);
  assert.deepEqual(m.cuenta, { n: 10, tipo: "meta" });
  const c = mover(m, 1);
  assert.equal(c.fichas[0][1], 30);
  // si nadie puede contar las 10, se pierden
  const sola = estado([[68, CASA, CASA, CASA], [CASA, CASA, CASA, CASA]]);
  const s = mover(tirar(sola, 3), 0);
  assert.deepEqual(tipos(sola, s), ["dado", "mueve", "meta", "pierde", "turno"]);
  assert.equal(s.turno, 1);
  // en el camino de llegada caben dos por casilla
  const lleno = estado([[66, 66, 64, CASA], [CASA, CASA, CASA, CASA]]);
  assert.ok(!fichasQuePueden(tirar(lleno, 2)).includes(2));
  assert.ok(fichasQuePueden(tirar(lleno, 3)).includes(2), "pero se puede pasar");
  // del final de la vuelta se entra al camino
  const entra = mover(tirar(estado([[61, CASA, CASA, CASA], [CASA, CASA, CASA, CASA]]), 4), 0);
  assert.equal(entra.fichas[0][0], 65);
  assert.equal(casillaDe(0, 65), null);
});

test("parchís: con 6 se repite; con tres seises la última ficha movida vuelve a casa", () => {
  let e = estado([
    [10, CASA, CASA, CASA],
    [CASA, CASA, CASA, CASA],
  ]);
  e = mover(tirar(e, 6), 0);
  assert.equal(e.turno, 0, "con 6 vuelve a tirar");
  assert.equal(e.fase, "tirar");
  assert.equal(e.fichas[0][0], 16);
  e = mover(tirar(e, 6), 0);
  assert.equal(e.fichas[0][0], 22);
  const antes = e;
  e = tirar(e, 6);
  assert.deepEqual(tipos(antes, e), ["dado", "tres", "turno"]);
  assert.equal(e.fichas[0][0], CASA);
  assert.equal(e.turno, 1);
  const tres = nuevos(antes, e).find((x) => x.t === "tres");
  assert.deepEqual(tres && tres.t === "tres" ? [tres.f, tres.desde] : null, [0, 22]);
  // si la última ya está en su camino de llegada, se queda
  let l = estado([[52, CASA, CASA, CASA], [CASA, CASA, CASA, CASA]]);
  l = mover(tirar(l, 6), 0);
  l = mover(tirar(l, 6), 0);
  assert.equal(l.fichas[0][0], 64);
  l = tirar(l, 6);
  assert.equal(l.fichas[0][0], 64, "en su camino ya no vuelve");
  assert.equal(l.turno, 1);
});

test("parchís: gana quien mete todas sus fichas", () => {
  const e = estado([
    [META, META, META, 69],
    [10, 30, CASA, CASA],
  ]);
  e.comio[0] = 2;
  const t = tirar(e, 2);
  const m = mover(t, 3);
  assert.equal(m.fase, "fin");
  assert.equal(m.ganador, 0);
  assert.equal(PARCHIS_MESA.turnoDe(m), null);
  assert.deepEqual(PARCHIS_MESA.jugadasValidas(m, 0), []);
  assert.deepEqual(PARCHIS_MESA.jugadasValidas(m, 1), []);
  const r = PARCHIS_MESA.terminado(m)!;
  assert.deepEqual(r.ganadores, [0]);
  assert.match(r.titulo, /J0/);
  assert.match(r.detalle[0], /todas en la corona/);
  assert.match(r.detalle[1], /0 de 4/);
  assert.ok(r.puntos[0] > r.puntos[1]);
  assert.equal(PARCHIS_MESA.terminado(t), null);
  // con dos fichas, bastan dos
  const corta = estado([[META, 70], [CASA, CASA]]);
  const c = mover(tirar(corta, 1), 1);
  assert.equal(c.ganador, 0);
});

test("parchís: todo está a la vista, y la pantalla sabe cuánto tarda cada jugada", () => {
  const e = estado([
    [10, CASA, CASA, CASA],
    [CASA, CASA, CASA, CASA],
  ]);
  const v = PARCHIS_MESA.vistaPara(e, 1) as unknown as Record<string, unknown>;
  for (const k of ["fichas", "colores", "turno", "fase", "dado", "cuenta", "eventos", "nFichas"]) assert.ok(k in v, k);
  for (const k of ["asientos", "llegada", "orden", "animaMs"]) assert.ok(!(k in v), k);
  assert.deepEqual(PARCHIS_MESA.vistaPara(e, null), PARCHIS_MESA.vistaPara(e, 0));
  const t = tirar(e, 4);
  assert.ok(PARCHIS_MESA.esperaMs!(t) >= ANIMA.dado);
  const m = mover(t, 0);
  assert.ok(PARCHIS_MESA.esperaMs!(m) >= 4 * ANIMA.paso);
  // una jugada que no vale no cambia nada
  assert.equal(aplicarParchis(t, 1, { t: "tirar" }, dado(3)), t, "no es su turno");
  assert.equal(aplicarParchis(t, 0, { t: "tirar" }, dado(3)), t, "ya tiró");
  assert.equal(aplicarParchis(t, 0, { f: 1, n: 4 }, dado(3)), t, "esa ficha no puede");
  assert.equal(aplicarParchis(t, 0, { f: 0, n: 20 }, dado(3)), t, "no es esa cuenta");
  assert.ok(!jugadaValida(PARCHIS_MESA, t, 0, "pasar" as unknown as JugadaParchis));
  // y se dice por qué
  const por = (x: EstadoParchis, a: number, j: unknown) => PARCHIS_MESA.porQueNo!(x, a, j as JugadaParchis, 0);
  assert.equal(por(e, 0, { f: 0, n: 4 }), "Primero toca el dado.");
  assert.equal(por(e, 0, { t: "tirar" }), null);
  assert.equal(por(t, 0, { t: "tirar" }), "Ya tiraste: elige la ficha que mueves.");
  assert.equal(por(t, 0, { f: 1, n: 4 }), "Esa ficha no puede moverse con ese número.");
  assert.equal(por(t, 0, { f: 0, n: 20 }), "Ahora se cuentan 4.");
  assert.equal(por(t, 0, { f: 7, n: 4 }), "Esa ficha no existe.");
  assert.equal(por(t, 1, { f: 0, n: 4 }), "Todavía no es tu turno.");
  assert.equal(por(t, 0, "pasar"), "Esa jugada no vale.");
  assert.equal(por(t, 0, { f: 0, n: 4 }), null);
});

test("parchís: la computadora come, se pone en seguro y no deja fichas a tiro", () => {
  // puede comer con una o solo avanzar con otra
  const e = tirar(
    estado([
      [posEn(0, 15), posEn(0, 40), CASA, CASA],
      [posEn(2, 18), CASA, CASA, CASA],
    ]),
    3,
  );
  for (const nivel of ["normal", "dificil"] as NivelBot[])
    for (let s = 1; s <= 20; s++) assert.deepEqual(jugadaBotParchis(e, 0, nivel, azarConSemilla(s)), { f: 0, n: 3 }, `${nivel} come`);
  let comeFacil = 0;
  for (let s = 1; s <= 40; s++) if (jugadaBotParchis(e, 0, "facil", azarConSemilla(s)).f === 0) comeFacil++;
  assert.ok(comeFacil >= 30, `el fácil también come casi siempre (${comeFacil} de 40)`);
  // a un seguro (la 12) antes que quedar a tiro (la 43 con el rojo en la 41)
  const s = tirar(
    estado([
      [posEn(0, 9), posEn(0, 40), CASA, CASA],
      [posEn(2, 41), CASA, CASA, CASA],
    ]),
    3,
  );
  for (const nivel of ["normal", "dificil"] as NivelBot[])
    for (let k = 1; k <= 20; k++) assert.deepEqual(jugadaBotParchis(s, 0, nivel, azarConSemilla(k)), { f: 0, n: 3 }, `${nivel} se pone en seguro`);
  // el difícil no abre la barrera que protege a una ficha que quedaría a tiro: mueve la que está lejos de todo
  const b = tirar(
    estado([
      [posEn(0, 30), posEn(0, 30), posEn(0, 50), CASA],
      [posEn(2, 26), posEn(2, 45), CASA, CASA],
    ]),
    2,
  );
  for (let k = 1; k <= 20; k++) assert.deepEqual(jugadaBotParchis(b, 0, "dificil", azarConSemilla(k)), { f: 2, n: 2 }, "el difícil no deja a tiro");
  // tirar cuando le toca tirar
  assert.deepEqual(jugadaBotParchis(estado([[CASA, CASA, CASA, CASA], [CASA, CASA, CASA, CASA]]), 0, "facil", azarConSemilla(1)), { t: "tirar" });
});

/** Juega una partida entera entre computadoras (con el azar de la semilla) y revisa cada jugada y cada casilla. */
function partida(n: number, niveles: NivelBot[], semilla: number, nFichas = 4) {
  const azar = azarConSemilla(semilla);
  let e = PARCHIS_MESA.estadoInicial(asientos(n, niveles), azar, { fichas: String(nFichas) });
  let jugadas = 0;
  let comidas = 0;
  let barreras = 0;
  while (!PARCHIS_MESA.terminado(e) && jugadas < 20_000) {
    const [a] = quienesJuegan(PARCHIS_MESA, e);
    const j = PARCHIS_MESA.jugadaDeBot(e, a, niveles[a], azar);
    assert.ok(jugadaValida(PARCHIS_MESA, e, a, j), `jugada que vale (semilla ${semilla}, jugada ${jugadas})`);
    const sig = PARCHIS_MESA.aplicar(e, a, j, azar);
    assert.notEqual(sig, e, "la jugada cambia algo");
    for (const x of nuevos(e, sig)) {
      if (x.t === "come") comidas++;
      if (x.t === "mueve" && x.barrera) barreras++;
    }
    e = sig;
    jugadas++;
    // nunca más de dos por casilla, ni dos colores fuera de un seguro, ni más de dos en una casilla del camino
    for (const [c, o] of mapaDePista(e)) {
      assert.ok(o.length <= 2, `casilla ${c} con ${o.length}`);
      if (o.length === 2 && o[0].a !== o[1].a) assert.ok(esSeguro(c), `dos colores en la ${c}, que no es seguro`);
    }
    e.fichas.forEach((l) => {
      for (let p = ULTIMA_PISTA + 1; p < META; p++) assert.ok(l.filter((x) => x === p).length <= 2);
      assert.ok(l.every((p) => p >= CASA && p <= META));
    });
  }
  return { e, jugadas, comidas, barreras };
}

test("parchís: partidas enteras entre computadoras, siempre con jugadas que valen y con ganador", () => {
  const niveles: NivelBot[][] = [
    ["facil", "facil", "facil", "facil"],
    ["normal", "dificil", "facil", "normal"],
    ["dificil", "dificil", "dificil", "dificil"],
  ];
  let total = 0;
  let comidas = 0;
  let barreras = 0;
  for (const n of [2, 3, 4]) {
    for (let semilla = 1; semilla <= 6; semilla++) {
      const r = partida(n, niveles[semilla % 3], semilla * 97 + n);
      const fin = PARCHIS_MESA.terminado(r.e);
      assert.ok(fin, `terminó (n ${n}, semilla ${semilla})`);
      assert.equal(fin.ganadores.length, 1);
      const g = fin.ganadores[0];
      assert.ok(r.e.fichas[g].every((p) => p === META), "el ganador metió todas");
      assert.ok(r.e.tiradas < PARCHIS.maxTiradas);
      total += r.jugadas;
      comidas += r.comidas;
      barreras += r.barreras;
    }
  }
  assert.ok(comidas > 20, `se comen fichas (${comidas})`);
  assert.ok(barreras > 10, `se hacen barreras (${barreras})`);
  assert.ok(total > 1000);
  // la partida corta, con dos fichas
  for (let semilla = 1; semilla <= 6; semilla++) {
    const r = partida(4, ["normal", "normal", "normal", "normal"], semilla, 2);
    assert.ok(PARCHIS_MESA.terminado(r.e));
    assert.ok(r.e.fichas[r.e.ganador!].length === 2 && r.e.fichas[r.e.ganador!].every((p) => p === META));
  }
});

test("parchís: el difícil le gana al fácil más veces", () => {
  let gana = 0;
  const veces = 40;
  for (let s = 1; s <= veces; s++) {
    // se turnan quién empieza
    const niveles: NivelBot[] = s % 2 ? ["dificil", "facil"] : ["facil", "dificil"];
    const r = partida(2, niveles, 5000 + s);
    if (niveles[r.e.ganador!] === "dificil") gana++;
  }
  assert.ok(gana > veces / 2, `el difícil ganó ${gana} de ${veces}`);
});
