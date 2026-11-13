// Los juegos de mesa clásicos (shared/mesa/): el ajedrez (todas las jugadas con las cuentas «perft» conocidas, el mate, el
// ahogado, el enroque, al paso, la coronación y las tablas), las damas (comer es obligatorio y la mayor cantidad, el peón no
// come hacia atrás, la dama vuela, la coronación) y el cuatro en raya; y que la computadora juegue siempre algo que vale,
// vea el mate o la línea y piense rápido.
import { test } from "node:test";
import assert from "node:assert/strict";
import { azarConSemilla, jugadaValida, quienesJuegan, type AsientoMesa, type NivelBot } from "./mesa";
import { MESAS, ORDEN_MESAS } from "./mesa/index";
import { AJEDREZ, desdeFen, estadoDesde, jugadasDe, mejorJugadaAjedrez, perft, type EstadoAjedrez } from "./mesa/ajedrez";
import { DAMAS, jugadasDamas, mejorJugadaDamas, tableroInicial, type EstadoDamas } from "./mesa/damas";
import { COLUMNAS, CUATRO_EN_RAYA, mejorColumna, type EstadoCuatro, type Ficha } from "./mesa/cuatro-en-raya";

const asientos: AsientoMesa[] = [
  { n: 0, nombre: "Ana", bot: null },
  { n: 1, nombre: "Rubén 🤖", bot: "normal" },
];

test("el registro: los clásicos están, con su versículo y para dos", () => {
  for (const id of ["ajedrez", "damas", "cuatro-en-raya", "tres-en-raya"]) assert.ok(ORDEN_MESAS.includes(id), id);
  for (const id of ["ajedrez", "damas", "cuatro-en-raya"]) {
    const j = MESAS[id];
    assert.equal(j.min, 2);
    assert.equal(j.max, 2);
    assert.ok(j.verso.ref && j.verso.text.length > 20, id);
    assert.ok(j.como.length >= 3, id);
  }
});

// ---------------------------------------------------------------- ajedrez
test("ajedrez: todas las jugadas (perft de posiciones conocidas)", () => {
  const casos: [string, number[]][] = [
    ["rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -", [20, 400, 8902]],
    ["r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq -", [48, 2039]],
    ["8/2p5/3p4/KP5r/1R3p1k/8/4P1P1/8 w - -", [14, 191, 2812]],
    ["r3k2r/Pppp1ppp/1b3nbN/nP6/BBP1P3/q4N2/Pp1P2PP/R2Q1RK1 w kq -", [6, 264, 9467]],
    ["rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPP1NnPP/RNBQK2R w KQ -", [44, 1486]],
  ];
  for (const [fen, cuentas] of casos) cuentas.forEach((n, k) => assert.equal(perft(desdeFen(fen), k + 1), n, `${fen} a ${k + 1}`));
});

const jugar = (e: EstadoAjedrez, ...js: string[]) =>
  js.reduce((x, j) => {
    assert.ok(jugadaValida(AJEDREZ, x, x.turno, j), `${j} debería valer`);
    return AJEDREZ.aplicar(x, x.turno, j, azarConSemilla(1));
  }, e);

test("ajedrez: el mate del loco, el ahogado, el enroque, al paso y la coronación", () => {
  const azar = azarConSemilla(3);
  let e = AJEDREZ.estadoInicial(asientos, azar);
  assert.equal(AJEDREZ.turnoDe(e), 0);
  assert.equal(AJEDREZ.jugadasValidas(e, 1).length, 0, "las negras no juegan en el turno de las blancas");
  assert.ok(!jugadaValida(AJEDREZ, e, 0, "e2e5"));
  e = jugar(e, "f2f3", "e7e5", "g2g4", "d8h4");
  const r = AJEDREZ.terminado(e);
  assert.ok(r && r.ganadores[0] === 1 && /mate/i.test(r.titulo), JSON.stringify(r));
  assert.equal(AJEDREZ.vistaPara(e, null).jaque, 60, "el rey blanco, en jaque mate");
  assert.equal(AJEDREZ.turnoDe(e), null);

  const ahogado = estadoDesde(desdeFen("7k/5Q2/6K1/8/8/8/8/8 b - -"), asientos);
  assert.equal(ahogado.fin?.como, "ahogado");
  assert.deepEqual(AJEDREZ.terminado(ahogado)?.ganadores, []);

  let en = estadoDesde(desdeFen("r3k2r/8/8/8/8/8/8/R3K2R w KQkq -"), asientos);
  assert.ok(jugadasDe(desdeFen("r3k2r/8/8/8/8/8/8/R3K2R w KQkq -")).includes("e1g1"));
  en = jugar(en, "e1g1");
  assert.equal(en.t[62], 6, "el rey en g1");
  assert.equal(en.t[61], 4, "la torre en f1");
  assert.equal(en.enroques, "kq");
  en = jugar(en, "e8c8");
  assert.equal(en.t[2], -6);
  assert.equal(en.t[3], -4);
  // no se enroca en jaque ni pasando por una casilla atacada
  assert.ok(!jugadasDe(desdeFen("r3k2r/8/8/8/8/8/8/R3K1qR w KQkq -")).includes("e1g1"));
  assert.ok(!jugadasDe(desdeFen("r3k2r/8/8/8/8/8/5r2/R3K2R w KQkq -")).includes("e1g1"));

  let ap = estadoDesde(desdeFen("4k3/8/8/8/1p6/8/P7/4K3 w - -"), asientos);
  ap = jugar(ap, "a2a4");
  assert.equal(ap.alPaso, 40, "se puede comer al paso en a3");
  ap = jugar(ap, "b4a3");
  assert.equal(ap.t[32], 0, "el peón blanco de a4 se fue");
  assert.equal(ap.t[40], -1);

  let co = estadoDesde(desdeFen("4k3/1P6/8/8/8/8/8/4K3 w - -"), asientos);
  const coronas = AJEDREZ.jugadasValidas(co, 0).filter((j) => j.startsWith("b7b8"));
  assert.deepEqual([...coronas].sort(), ["b7b8b", "b7b8n", "b7b8q", "b7b8r"]);
  co = jugar(co, "b7b8n");
  assert.equal(co.t[1], 2, "coronó un caballo");
  assert.ok(co.ultima?.corona === 2);

  const solos = estadoDesde(desdeFen("4k3/8/8/8/8/8/8/4K2N w - -"), asientos);
  assert.equal(solos.fin?.como, "material", "rey y caballo no dan mate");
  // la misma posición tres veces
  let rep = AJEDREZ.estadoInicial(asientos, azar);
  rep = jugar(rep, "g1f3", "g8f6", "f3g1", "f6g8", "g1f3", "g8f6", "f3g1", "f6g8");
  assert.equal(rep.fin?.como, "repeticion");
});

test("ajedrez: la computadora ve el mate y la pieza colgada, y piensa rápido", () => {
  const azar = azarConSemilla(9);
  const mate = desdeFen("6k1/5ppp/8/8/8/8/8/R5K1 w - -");
  for (const nivel of ["normal", "dificil"] as NivelBot[]) {
    const t0 = Date.now();
    assert.equal(mejorJugadaAjedrez(mate, nivel, azar), "a1a8", nivel);
    assert.ok(Date.now() - t0 < 900, `${nivel}: ${Date.now() - t0} ms`);
  }
  assert.equal(mejorJugadaAjedrez(desdeFen("4k3/8/8/3q4/4P3/8/8/4K3 w - -"), "dificil", azar), "e4d5");
  // desde el principio, en cada nivel: una jugada que vale y a tiempo
  for (const nivel of ["facil", "normal", "dificil"] as NivelBot[]) {
    const e = AJEDREZ.estadoInicial(asientos, azar);
    const t0 = Date.now();
    const j = AJEDREZ.jugadaDeBot(e, 0, nivel, azar);
    assert.ok(jugadaValida(AJEDREZ, e, 0, j), `${nivel}: ${j}`);
    assert.ok(Date.now() - t0 < 900, `${nivel}: ${Date.now() - t0} ms`);
  }
});

test("ajedrez: 40 jugadas entre la computadora fácil y la normal, todas válidas", () => {
  const azar = azarConSemilla(21);
  let e = AJEDREZ.estadoInicial(asientos, azar);
  for (let k = 0; k < 40 && !AJEDREZ.terminado(e); k++) {
    const a = AJEDREZ.turnoDe(e)!;
    const j = AJEDREZ.jugadaDeBot(e, a, a === 0 ? "facil" : "normal", azar);
    assert.ok(jugadaValida(AJEDREZ, e, a, j), j);
    e = AJEDREZ.aplicar(e, a, j, azar);
  }
  const v = AJEDREZ.vistaPara(e, 0);
  assert.equal(v.t.length, 64);
});

// ---------------------------------------------------------------- damas
const damasCon = (fichas: Record<number, number>, turno: 0 | 1 = 0): EstadoDamas => {
  const t = Array(64).fill(0);
  for (const [i, v] of Object.entries(fichas)) t[Number(i)] = v;
  return { ...DAMAS.estadoInicial(asientos, azarConSemilla(1)), t, turno };
};

test("damas: la salida, comer obligatorio y la mayor cantidad", () => {
  const e = DAMAS.estadoInicial(asientos, azarConSemilla(1));
  assert.equal(e.t.filter((v) => v === 1).length, 12);
  assert.equal(e.t.filter((v) => v === -1).length, 12);
  assert.ok(e.t.every((v, i) => !v || ((i >> 3) + (i & 7)) % 2 === 1), "todo en casillas oscuras");
  assert.equal(DAMAS.jugadasValidas(e, 0).length, 7);
  assert.equal(DAMAS.jugadasValidas(e, 1).length, 0);

  // blanca en (5,2)=42 con negra en (4,3)=35: puede comer saltando a (3,4)=28; además tiene un paso libre en (4,1)
  const come = damasCon({ 42: 1, 35: -1, 0: -1 });
  assert.deepEqual(DAMAS.jugadasValidas(come, 0), [[42, 28]], "si se puede comer, hay que comer");
  // dos caminos: comer una (42→28) o dos seguidas con la otra ficha (46→28? no): 46=(5,6) come (4,5)=37 → (3,4)=28, y luego (2,3)=19 → (1,2)=10
  const mayor = damasCon({ 42: 1, 35: -1, 46: 1, 37: -1, 19: -1, 63: -1 });
  assert.deepEqual(DAMAS.jugadasValidas(mayor, 0), [[46, 28, 10]], "hay que comer la mayor cantidad");
  const despues = DAMAS.aplicar(mayor, 0, [46, 28, 10], azarConSemilla(1));
  assert.equal(despues.t[37], 0);
  assert.equal(despues.t[19], 0);
  assert.equal(despues.t[10], 1);
  assert.deepEqual([...despues.ultima!.comidas].sort((a, b) => a - b), [19, 37]);
});

test("damas: el peón no come hacia atrás, la dama vuela y se corona al llegar al fondo", () => {
  // blanca en (3,4)=28 con una negra detrás, en (4,3)=35, y (5,2)=42 libre: el peón no puede comerla
  const atras = damasCon({ 28: 1, 35: -1, 7: -1 });
  assert.ok(DAMAS.jugadasValidas(atras, 0).every((j) => j.length === 2 && j[1] >> 3 === 2), "solo pasos hacia adelante");
  // la dama blanca en (7,0)=56 vuela por la diagonal y come a distancia: negra en (4,3)=35, cae en (3,4)=28, (2,5)=21 o (1,6)=14
  const dama = damasCon({ 56: 2, 35: -1, 6: -1 });
  const js = DAMAS.jugadasValidas(dama, 0);
  assert.deepEqual(js.map((j) => j[1]).sort((a, b) => a - b), [14, 21, 28]);
  assert.ok(js.every((j) => j[0] === 56 && j.length === 2));
  const sinComer = damasCon({ 56: 2, 7: -1 });
  assert.equal(DAMAS.jugadasValidas(sinComer, 0).length, 6, "vuela hasta la otra punta");
  // el peón blanco en (1,2)=10 llega al fondo y se corona
  const corona = DAMAS.aplicar(damasCon({ 10: 1, 63: -1 }), 0, [10, 1], azarConSemilla(1));
  assert.equal(corona.t[1], 2);
  assert.ok(corona.ultima?.corona);
  // sin fichas el otro, gana
  const gana = DAMAS.aplicar(damasCon({ 42: 1, 35: -1 }), 0, [42, 28], azarConSemilla(1));
  assert.equal(DAMAS.terminado(gana)?.ganadores[0], 0);
});

test("damas: la computadora come cuando conviene y una partida entera termina bien", () => {
  const azar = azarConSemilla(5);
  assert.deepEqual(mejorJugadaDamas(damasCon({ 42: 1, 35: -1, 46: 1, 37: -1, 19: -1, 63: -1 }).t, 0, "dificil", azar), [46, 28, 10]);
  let e = DAMAS.estadoInicial(asientos, azar);
  for (let k = 0; k < 220 && !DAMAS.terminado(e); k++) {
    const a = DAMAS.turnoDe(e)!;
    const t0 = Date.now();
    const j = DAMAS.jugadaDeBot(e, a, a === 0 ? "dificil" : "facil", azar);
    assert.ok(Date.now() - t0 < 900, `${Date.now() - t0} ms`);
    assert.ok(jugadaValida(DAMAS, e, a, j), JSON.stringify(j));
    e = DAMAS.aplicar(e, a, j, azar);
  }
  const r = DAMAS.terminado(e);
  if (r) assert.ok(r.ganadores.length <= 1 && r.titulo, JSON.stringify(r));
  assert.ok(jugadasDamas(tableroInicial(), 1).length === 7);
});

// ---------------------------------------------------------------- cuatro en raya
const cuatroCon = (cols: number[]): EstadoCuatro => cols.reduce((e, c) => CUATRO_EN_RAYA.aplicar(e, e.turno, c, azarConSemilla(1)), CUATRO_EN_RAYA.estadoInicial(asientos, azarConSemilla(1)));

test("cuatro en raya: las fichas caen, la línea que gana y el empate", () => {
  let e = cuatroCon([3, 3]);
  assert.equal(e.t[3], 0, "la primera abajo");
  assert.equal(e.t[COLUMNAS + 3], 1, "la segunda encima");
  e = cuatroCon([0, 1, 0, 1, 0, 1, 0]);
  assert.equal(e.ganador, 0, "cuatro de arriba abajo");
  assert.deepEqual(e.linea, [0, 7, 14, 21]);
  assert.deepEqual(quienesJuegan(CUATRO_EN_RAYA, e), []);
  e = cuatroCon([0, 0, 1, 1, 2, 2, 3]);
  assert.equal(e.ganador, 0, "cuatro de lado");
  // la diagonal
  e = cuatroCon([0, 1, 1, 2, 2, 3, 2, 3, 3, 6, 3]);
  assert.equal(e.ganador, 0, "cuatro en diagonal");
  // una columna llena no vale
  const llena = cuatroCon([5, 5, 5, 5, 5, 5]);
  assert.ok(!CUATRO_EN_RAYA.jugadasValidas(llena, llena.turno).includes(5));
  // el tablero lleno sin línea es empate
  const t: Ficha[] = [];
  for (let f = 0; f < 6; f++) for (let c = 0; c < 7; c++) t.push(((Math.floor(c / 2) + f) % 2) as 0 | 1);
  const lleno: EstadoCuatro = { ...CUATRO_EN_RAYA.estadoInicial(asientos, azarConSemilla(1)), t, jugadas: 42 };
  assert.deepEqual(CUATRO_EN_RAYA.terminado(lleno)?.ganadores, []);
});

test("cuatro en raya: la computadora gana cuando puede, tapa y piensa rápido", () => {
  const azar = azarConSemilla(4);
  // las rojas (0) tienen tres abajo (0, 1, 2): ganan en la 3
  const gana = cuatroCon([0, 0, 1, 1, 2, 2]);
  for (const nivel of ["facil", "normal", "dificil"] as NivelBot[]) assert.equal(mejorColumna(gana.t, 0, nivel, azar), 3, nivel);
  // al revés, las amarillas (1) deben tapar la 3
  const tapa = cuatroCon([0, 6, 1, 6, 2]);
  for (const nivel of ["normal", "dificil"] as NivelBot[]) assert.equal(mejorColumna(tapa.t, 1, nivel, azar), 3, nivel);
  const t0 = Date.now();
  mejorColumna(CUATRO_EN_RAYA.estadoInicial(asientos, azar).t, 0, "dificil", azar);
  assert.ok(Date.now() - t0 < 600, `${Date.now() - t0} ms`);
  // una partida entera: difícil contra fácil
  let e = CUATRO_EN_RAYA.estadoInicial(asientos, azar);
  while (!CUATRO_EN_RAYA.terminado(e)) {
    const a = CUATRO_EN_RAYA.turnoDe(e)!;
    const j = CUATRO_EN_RAYA.jugadaDeBot(e, a, a === 0 ? "dificil" : "facil", azar);
    assert.ok(jugadaValida(CUATRO_EN_RAYA, e, a, j));
    e = CUATRO_EN_RAYA.aplicar(e, a, j, azar);
  }
  assert.ok(CUATRO_EN_RAYA.terminado(e));
});
