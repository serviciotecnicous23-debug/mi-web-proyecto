// Los juegos de grupo tradicionales del patio (shared/mesa/*.ts): las reglas de cada uno, que lo oculto no se vea, y
// partidas enteras con compañeros de la computadora (con un azar con semilla, así cada prueba sale siempre igual).
import { test } from "node:test";
import assert from "node:assert/strict";
import { azarCon, puestosPor, nombreDeBot, type Nivel } from "./mesa/comun";
import { CARTAS_LOTERIA, TOTAL_CARTAS } from "./mesa/loteria-cartas";
import { LOTERIA, PATRONES_LOTERIA, faltanLoteria, loteria, patronCompleto, type EstadoLoteria } from "./mesa/loteria";
import { CATEGORIAS_GENERALA, GENERALA, decidirGenerala, generala, puntosGenerala, type EstadoGenerala } from "./mesa/generala";
import { ESCALERAS, ESCALERAS_JACOB, SERPIENTES, celdaDe, escaleras, moverEscaleras } from "./mesa/escaleras";
import {
  CELDAS, DAMAS_CHINAS, HOYOS, PUNTAS_POR_JUGADORES, VECINOS, celdaEn, damasChinas, enfrente, hoyosDePunta, jugadaValida, movimientosDe, todasLasJugadas,
} from "./mesa/damas-chinas";
import { PAREJAS, TAMANOS_MEMORIA, decidirMemoria, memoria, type EstadoMemoria } from "./mesa/memoria";
import { BASTA, CATEGORIAS_BASTA, LETRAS_BASTA, basta, normalizarBasta, palabrasDe, ponerListaBasta, revisarRespuesta, type EstadoBasta } from "./mesa/basta";
import * as LISTA_BASTA from "../server/mesa-basta-lista";

// la lista del «Basta» vive en el servidor: aquí se pone como lo hace él al arrancar
ponerListaBasta(LISTA_BASTA);

type Modulo<E> = {
  alTiempo(e: E, ahora: number, azar: () => number): E | null;
  proximoCambio(e: E, ahora: number): number | null;
  terminado(e: E): unknown;
};
/** Deja correr el reloj hasta que termine (o hasta `tope` ms), como si el servidor mirara la sala en cada cambio. */
function correrHastaElFin<E>(m: Modulo<E>, e: E, ahora: number, azar: () => number, tope = 6 * 3600_000): { e: E; ahora: number } {
  const fin = ahora + tope;
  for (let k = 0; k < 200_000 && ahora < fin; k++) {
    if (m.terminado(e)) break;
    const p = m.proximoCambio(e, ahora);
    if (p == null) break;
    ahora += Math.max(1, p);
    e = m.alTiempo(e, ahora, azar) ?? e;
  }
  return { e, ahora };
}

test("lo común: el azar con semilla se repite, los puestos con empate y los nombres de los compañeros con 🤖", () => {
  const a = azarCon(42);
  const b = azarCon(42);
  for (let i = 0; i < 20; i++) assert.equal(a(), b());
  assert.deepEqual(puestosPor([10, 30, 30, 5]), [3, 1, 1, 4]);
  assert.deepEqual(puestosPor([2, 2], [5, 1]), [1, 2], "el desempate decide");
  assert.ok(nombreDeBot(0).endsWith("🤖") && nombreDeBot(25).endsWith("🤖"));
});

// ================================================================ la lotería
test("lotería: 54 cartas propias, numeradas, con copla y versículo", () => {
  assert.equal(TOTAL_CARTAS, 54);
  assert.equal(new Set(CARTAS_LOTERIA.map((c) => c.id)).size, 54);
  CARTAS_LOTERIA.forEach((c, i) => {
    assert.equal(c.n, i + 1);
    assert.ok(c.nombre && c.copla.length > 10 && c.copla.length < 90, c.id);
    assert.ok(c.verso.text.length > 20 && /^[1-3]? ?[A-ZÉÁÍÓÚ][a-záéíóúñ]+ \d+:\d+$/.test(c.verso.ref), `${c.id}: ${c.verso.ref}`);
  });
  for (const t of ["personaje", "animal", "objeto", "lugar"]) assert.ok(CARTAS_LOTERIA.filter((c) => c.tipo === t).length >= 10, t);
});

test("lotería: tablas de 16 distintas, la baraja revuelta y la primera carta después de prepararse", () => {
  const azar = azarCon(7);
  const e = loteria.estadoInicial({ bots: [null, null, null] }, azar, 1000);
  assert.equal(e.tablas.length, 3);
  for (const t of e.tablas) assert.equal(new Set(t).size, 16);
  assert.deepEqual([...e.baraja].sort((a, b) => a - b), [...Array(54).keys()]);
  assert.equal(e.fase, "preparar");
  assert.equal(loteria.proximoCambio(e, 1000), LOTERIA.prepararMs);
  const e2 = loteria.alTiempo(e, 1000 + LOTERIA.prepararMs, azar)!;
  assert.equal(e2.fase, "cantando");
  assert.equal(e2.cantadas, 1);
  const e3 = loteria.alTiempo(e2, 1000 + LOTERIA.prepararMs + e2.ritmoMs * 3, azar)!;
  assert.equal(e3.cantadas, 4, "una carta cada ritmo");
  assert.equal(e.cantadas, 0, "el estado de antes no se toca");
});

test("lotería: solo se marca lo que salió; la lotería falsa castiga dos cartas; la buena gana y el empate entra a tiempo", () => {
  const azar = azarCon(11);
  let e = loteria.estadoInicial({ bots: [null, null, null], opciones: { modo: "linea", ritmo: "rapido" } }, azar, 0);
  e = loteria.alTiempo(e, LOTERIA.prepararMs, azar)!;
  const t = LOTERIA.prepararMs;
  const salio = e.baraja[0];
  const otra = e.tablas[0].findIndex((c) => !e.baraja.slice(0, 1).includes(c));
  assert.equal(loteria.aplicar(e, 0, { t: "marcar", k: otra }, t, azar).ok, false, "no salió todavía");
  // la lotería falsa
  const falsa = loteria.aplicar(e, 0, { t: "loteria" }, t + 10, azar);
  assert.ok(falsa.ok);
  e = (falsa as { e: EstadoLoteria }).e;
  assert.equal(e.castigo[0], 1 + LOTERIA.castigoCartas);
  assert.equal(loteria.aplicar(e, 0, { t: "loteria" }, t + 20, azar).ok, false, "castigado");
  // armamos una línea para el asiento 1: ponemos sus cuatro primeras figuras al principio de la baraja
  const linea = PATRONES_LOTERIA.linea[0];
  const cartas1 = linea.map((k) => e.tablas[1][k]);
  const resto = e.baraja.filter((c) => !cartas1.includes(c) && c !== salio);
  e = { ...e, baraja: [salio, ...cartas1, ...resto] };
  const fin4 = t + e.ritmoMs * 4;
  e = loteria.alTiempo(e, fin4, azar)!;
  assert.equal(e.cantadas, 5);
  for (const k of linea) e = (loteria.aplicar(e, 1, { t: "marcar", k }, fin4 + 10, azar) as { e: EstadoLoteria }).e;
  assert.deepEqual(patronCompleto(e.marcas[1], "linea"), linea);
  // el asiento 2 tiene también la misma línea completa (para el empate)
  e = { ...e, tablas: e.tablas.map((tb, a) => (a === 2 ? [...cartas1, ...tb.filter((c) => !cartas1.includes(c)).slice(0, 12)] : tb)) };
  for (const k of [0, 1, 2, 3]) e = (loteria.aplicar(e, 2, { t: "marcar", k }, fin4 + 20, azar) as { e: EstadoLoteria }).e;
  const gana = loteria.aplicar(e, 1, { t: "loteria" }, fin4 + 30, azar);
  assert.ok(gana.ok);
  e = (gana as { e: EstadoLoteria }).e;
  assert.equal(e.fase, "revelar");
  const empata = loteria.aplicar(e, 2, { t: "loteria" }, fin4 + 30 + 500, azar);
  assert.ok(empata.ok, "dentro del segundo y medio, empata");
  e = (empata as { e: EstadoLoteria }).e;
  e = loteria.alTiempo(e, fin4 + 30 + LOTERIA.revelarMs + 5, azar)!;
  assert.equal(e.fase, "fin");
  const fin = loteria.terminado(e)!;
  assert.deepEqual([fin.puestos[1], fin.puestos[2]], [1, 1]);
  assert.ok(fin.puestos[0] > 1);
  assert.match(fin.titulo, /@1/);
});

test("lotería: lo que ve cada uno no trae la baraja (solo lo que ya salió)", () => {
  const azar = azarCon(3);
  let e = loteria.estadoInicial({ bots: [null, "normal"] }, azar, 0);
  e = loteria.alTiempo(e, LOTERIA.prepararMs + e.ritmoMs * 5, azar)!;
  const v = loteria.vistaPara(e, 0, LOTERIA.prepararMs + e.ritmoMs * 5);
  assert.equal(v.salidas.length, e.cantadas);
  assert.ok(!("baraja" in v));
  const texto = JSON.stringify(v);
  assert.ok(!texto.includes("pend") && !texto.includes("gritos"));
  assert.deepEqual(v.tabla, e.tablas[0]);
  assert.equal(loteria.vistaPara(e, null, 0).tabla, null, "quien mira no tiene tabla");
});

test("lotería: una partida entera de compañeros termina con alguien que cantó (y en la tabla llena también)", () => {
  for (const [semilla, modo] of [
    [1, "linea"],
    [2, "esquinas"],
    [3, "centro"],
    [4, "llena"],
  ] as const) {
    const azar = azarCon(semilla);
    const bots: Nivel[] = ["facil", "normal", "dificil", "normal"];
    const e0 = loteria.estadoInicial({ bots, opciones: { modo } }, azar, 0);
    const { e } = correrHastaElFin(loteria, e0, 0, azar);
    const fin = loteria.terminado(e)!;
    assert.ok(fin, modo);
    assert.ok(e.ganadores.length >= 1, `${modo}: alguien cantó`);
    for (const g of e.ganadores) assert.ok(patronCompleto(e.marcas[g], modo), `${modo}: la lotería de ${g} es de verdad`);
    // los compañeros nunca marcan lo que no salió
    const salidas = new Set(e.baraja.slice(0, e.cantadas));
    e.marcas.forEach((m, a) => m.forEach((x, k) => x && assert.ok(salidas.has(e.tablas[a][k]))));
    assert.equal(faltanLoteria(e.marcas[e.ganadores[0]], modo), 0);
  }
});

// ================================================================ la generala
test("generala: lo que vale cada casilla (escalera, full, póker, generala, doble y la servida)", () => {
  assert.equal(puntosGenerala("3", [3, 3, 1, 3, 6]), 9);
  assert.equal(puntosGenerala("escalera", [5, 3, 1, 2, 4]), 20);
  assert.equal(puntosGenerala("escalera", [6, 3, 5, 2, 4], true), 25);
  assert.equal(puntosGenerala("escalera", [1, 3, 4, 5, 6]), 0);
  assert.equal(puntosGenerala("full", [2, 2, 5, 5, 5]), 30);
  assert.equal(puntosGenerala("full", [2, 2, 5, 5, 5], true), 35);
  assert.equal(puntosGenerala("full", [5, 5, 5, 5, 5]), 0, "la generala no es full");
  assert.equal(puntosGenerala("poker", [4, 4, 4, 1, 4]), 40);
  assert.equal(puntosGenerala("generala", [6, 6, 6, 6, 6]), 50);
  assert.equal(puntosGenerala("doble", [6, 6, 6, 6, 6], false, false), 0, "sin la generala anotada no hay doble");
  assert.equal(puntosGenerala("doble", [6, 6, 6, 6, 6], false, true), 100);
  assert.equal(CATEGORIAS_GENERALA.length, 11);
});

test("generala: tres tiros como mucho, anotar después de tirar, una casilla una vez y el turno pasa", () => {
  const azar = azarCon(5);
  let e = generala.estadoInicial({ bots: [null, null] }, azar, 0);
  e = generala.alTiempo(e, GENERALA.prepararMs, azar)!;
  const yo = e.turno;
  const otro = 1 - yo;
  const t = GENERALA.prepararMs + 10;
  assert.equal(generala.aplicar(e, otro, { t: "tirar", guardar: [false, false, false, false, false] }, t, azar).ok, false, "no es su turno");
  assert.equal(generala.aplicar(e, yo, { t: "anotar", cat: "1" }, t, azar).ok, false, "primero se tira");
  for (let k = 0; k < 3; k++) {
    const r = generala.aplicar(e, yo, { t: "tirar", guardar: [true, false, false, false, false] }, t + k, azar);
    assert.ok(r.ok, `tiro ${k + 1}`);
    e = (r as { e: EstadoGenerala }).e;
    if (e.fase === "fin") return; // ¡generala servida!
  }
  assert.equal(e.tiros, 3);
  assert.equal(generala.aplicar(e, yo, { t: "tirar", guardar: [false, false, false, false, false] }, t + 5, azar).ok, false, "el cuarto no");
  const r = generala.aplicar(e, yo, { t: "anotar", cat: "6" }, t + 6, azar);
  assert.ok(r.ok);
  e = (r as { e: EstadoGenerala }).e;
  assert.notEqual(e.planilla[yo][5], null);
  assert.equal(e.turno, otro);
  assert.equal(e.tiros, 0);
});

test("generala: el dado guardado se queda, y la servida gana en el acto", () => {
  const azar = azarCon(9);
  let e = generala.estadoInicial({ bots: [null, null] }, azar, 0);
  e = generala.alTiempo(e, GENERALA.prepararMs, azar)!;
  const a = e.turno;
  e = (generala.aplicar(e, a, { t: "tirar", guardar: [] }, 3000, azar) as { e: EstadoGenerala }).e;
  if (e.fase === "fin") return;
  const antes = [...e.dados];
  e = (generala.aplicar(e, a, { t: "tirar", guardar: [true, true, false, false, false] }, 3100, azar) as { e: EstadoGenerala }).e;
  assert.deepEqual(e.dados.slice(0, 2), antes.slice(0, 2));
  // la servida: el azar que da siempre el mismo dado
  const siempre = () => 0.5;
  let s = generala.estadoInicial({ bots: [null, null] }, siempre, 0);
  s = generala.alTiempo(s, GENERALA.prepararMs, siempre)!;
  s = (generala.aplicar(s, s.turno, { t: "tirar", guardar: [] }, 3000, siempre) as { e: EstadoGenerala }).e;
  assert.equal(s.fase, "fin");
  assert.equal(s.servida, s.turno);
  assert.equal(generala.terminado(s)!.puestos[s.turno], 1);
});

test("generala: el compañero difícil suma más que el fácil (cuenta las probabilidades)", () => {
  const jugarSolo = (nivel: Nivel, semilla: number) => {
    const azar = azarCon(semilla);
    const fila = new Array<number | null>(11).fill(null);
    for (let ronda = 0; ronda < 11; ronda++) {
      let dados = [0, 0, 0, 0, 0];
      let tiros = 0;
      for (;;) {
        const j = decidirGenerala(fila, dados, tiros, nivel, azar);
        if (j.t === "tirar") {
          dados = dados.map((d, i) => (tiros > 0 && j.guardar[i] ? d : 1 + Math.floor(azar() * 6)));
          tiros++;
        } else {
          const i = CATEGORIAS_GENERALA.indexOf(j.cat);
          assert.equal(fila[i], null);
          fila[i] = puntosGenerala(j.cat, dados, tiros === 1, (fila[9] ?? 0) > 0);
          break;
        }
      }
    }
    return fila.reduce<number>((s, x) => s + (x ?? 0), 0);
  };
  let facil = 0;
  let dificil = 0;
  const N = 14;
  const t0 = Date.now();
  for (let k = 0; k < N; k++) {
    facil += jugarSolo("facil", 100 + k);
    dificil += jugarSolo("dificil", 100 + k);
  }
  assert.ok(dificil / N > facil / N + 15, `difícil ${(dificil / N).toFixed(0)} y fácil ${(facil / N).toFixed(0)}`);
  assert.ok(Date.now() - t0 < 20_000, "piensa rápido");
});

test("generala: una partida de compañeros llena las planillas (o termina con la servida)", () => {
  const azar = azarCon(21);
  const e0 = generala.estadoInicial({ bots: ["facil", "normal", "dificil"] }, azar, 0);
  const { e } = correrHastaElFin(generala, e0, 0, azar);
  const fin = generala.terminado(e)!;
  assert.ok(fin);
  if (e.servida == null) for (const f of e.planilla) assert.ok(f.every((x) => x != null));
  assert.equal(fin.puestos.filter((p) => p === 1).length >= 1, true);
});

test("generala: a quien se le acaba el reloj, la computadora le juega el turno", () => {
  const azar = azarCon(31);
  let e = generala.estadoInicial({ bots: [null, null] }, azar, 0);
  e = generala.alTiempo(e, GENERALA.prepararMs, azar)!;
  const a = e.turno;
  e = generala.alTiempo(e, GENERALA.prepararMs + GENERALA.turnoMs + 5, azar)!;
  if (e.fase === "fin") return;
  assert.notEqual(e.turno, a, "el turno pasó");
  assert.equal(e.planilla[a].filter((x) => x != null).length, 1, "y se anotó algo");
});

// ================================================================ las escaleras de Jacob
test("escaleras: el tablero (suben las escaleras, bajan las serpientes, nada se pisa) y el zigzag", () => {
  const inicios = new Set<number>();
  for (const x of [...ESCALERAS_JACOB, ...SERPIENTES]) {
    assert.ok(x.de > 1 && x.de < 100 && x.a >= 1 && x.a <= 100, x.id);
    assert.ok(!inicios.has(x.de), `${x.id}: una casilla, un atajo`);
    inicios.add(x.de);
    assert.ok(x.verso.text && x.verso.ref && x.leccion, x.id);
  }
  for (const x of ESCALERAS_JACOB) assert.ok(x.a > x.de, x.id);
  for (const x of SERPIENTES) assert.ok(x.a < x.de, x.id);
  for (const x of [...ESCALERAS_JACOB, ...SERPIENTES]) assert.ok(!inicios.has(x.a), `${x.id}: no termina en otro atajo`);
  assert.equal(ESCALERAS_JACOB[0].verso.ref, "Génesis 28:12");
  assert.deepEqual(celdaDe(1), { fila: 0, col: 0 });
  assert.deepEqual(celdaDe(10), { fila: 0, col: 9 });
  assert.deepEqual(celdaDe(11), { fila: 1, col: 9 });
  assert.deepEqual(celdaDe(20), { fila: 1, col: 0 });
  assert.deepEqual(celdaDe(100), { fila: 9, col: 0 });
});

test("escaleras: casilla por casilla, la escalera sube, la serpiente baja y lo que sobra de 100 se devuelve", () => {
  assert.deepEqual(moverEscaleras(0, 4), { camino: [1, 2, 3, 4], atajo: { ...ESCALERAS_JACOB[0], sube: true }, fin: 25 });
  assert.equal(moverEscaleras(14, 3).fin, 7, "el enojo de Caín");
  assert.deepEqual(moverEscaleras(97, 5).camino, [98, 99, 100, 99, 98]);
  assert.equal(moverEscaleras(97, 5).fin, 79, "rebota y cae en la 98");
  assert.equal(moverEscaleras(97, 3).fin, 100);
  assert.equal(moverEscaleras(99, 6).fin, 75, "rebota a la 95: el becerro de oro");
});

test("escaleras: por turnos, y una partida de compañeros llega a la 100", () => {
  const azar = azarCon(8);
  let e = escaleras.estadoInicial({ bots: [null, "normal", "dificil"] }, azar, 0);
  e = escaleras.alTiempo(e, ESCALERAS.prepararMs, azar)!;
  assert.equal(escaleras.aplicar(e, 1, { t: "tirar" }, 2600, azar).ok, false, "no es su turno");
  const r = escaleras.aplicar(e, 0, { t: "tirar" }, 2600, azar);
  assert.ok(r.ok);
  const bots = escaleras.estadoInicial({ bots: ["facil", "normal", "dificil", "facil"] }, azar, 0);
  const { e: fin } = correrHastaElFin(escaleras, bots, 0, azar);
  assert.ok(escaleras.terminado(fin));
  assert.ok(fin.ganador != null && fin.pos[fin.ganador] === 100);
});

// ================================================================ las damas chinas
test("damas chinas: la estrella tiene 121 hoyos, 10 en cada punta y 61 en el centro", () => {
  assert.equal(HOYOS, 121);
  for (let p = 0; p < 6; p++) assert.equal(hoyosDePunta(p).length, 10, `punta ${p}`);
  assert.equal(CELDAS.filter((c) => c.punta == null).length, 61);
  // vecinos de ida y vuelta
  VECINOS.forEach((l, i) => l.forEach((v) => v >= 0 && assert.ok(VECINOS[v].includes(i))));
  // enfrente
  for (let p = 0; p < 6; p++) assert.equal(enfrente(enfrente(p)), p);
});

test("damas chinas: de 2 a 6, cada uno con sus diez canicas en su punta", () => {
  for (let n = 2; n <= 6; n++) {
    const e = damasChinas.estadoInicial({ bots: new Array(n).fill(null) }, azarCon(n), 0);
    assert.deepEqual(e.puntas, PUNTAS_POR_JUGADORES[n]);
    for (let a = 0; a < n; a++) {
      assert.equal(e.hoyos.filter((q) => q === a).length, 10);
      for (const i of hoyosDePunta(e.puntas[a])) assert.equal(e.hoyos[i], a);
    }
  }
});

test("damas chinas: pasos, saltos encadenados, nunca sobre el hoyo de donde salió, y la meta no se deja", () => {
  const h = new Array<number>(HOYOS).fill(-1);
  const c = celdaEn(0, 0);
  const derecha = (x: number, z: number) => celdaEn(x, z);
  // una canica en el centro con otra a su derecha (x+1) y otra más allá: salta dos veces
  h[c] = 0;
  h[derecha(1, 0)] = 1;
  h[derecha(3, 0)] = 1;
  const movs = movimientosDe(h, c, 3);
  const llegaA4 = movs.find((m) => m.camino[m.camino.length - 1] === derecha(4, 0));
  assert.ok(llegaA4, "salta dos veces");
  assert.deepEqual(llegaA4!.camino, [derecha(2, 0), derecha(4, 0)]);
  assert.ok(jugadaValida(h, 0, 3, llegaA4!));
  assert.ok(!jugadaValida(h, 0, 3, { desde: c, camino: [derecha(3, 0)] }), "no se salta lo que no está al lado");
  assert.ok(!jugadaValida(h, 1, 3, { desde: c, camino: [derecha(-1, 0)] }), "no es su canica");
  // no se salta sobre el hoyo de salida: c → (2,0) sobre (1,0) y de vuelta sobre c no vale (c quedó vacío)
  const h2 = new Array<number>(HOYOS).fill(-1);
  h2[c] = 0;
  h2[derecha(1, 0)] = 1;
  const vuelta = movimientosDe(h2, c, 3).some((m) => m.camino.includes(derecha(-2, 0)));
  assert.ok(!vuelta, "el hoyo de salida queda vacío al saltar");
  // en la meta no se sale
  const meta = hoyosDePunta(3);
  const h3 = new Array<number>(HOYOS).fill(-1);
  h3[meta[meta.length - 1]] = 0;
  for (const m of movimientosDe(h3, meta[meta.length - 1], 3)) assert.equal(CELDAS[m.camino[m.camino.length - 1]].punta, 3);
});

test("damas chinas: los compañeros terminan la partida (dos difíciles, y tres de todos los niveles)", () => {
  for (const bots of [
    ["dificil", "dificil"],
    ["facil", "normal", "dificil"],
  ] as Nivel[][]) {
    const azar = azarCon(bots.length * 13);
    const e0 = damasChinas.estadoInicial({ bots }, azar, 0);
    const { e } = correrHastaElFin(damasChinas, e0, 0, azar);
    const fin = damasChinas.terminado(e)!;
    assert.ok(fin, bots.join(","));
    assert.ok(e.ganador != null, `${bots.join(",")}: alguien llegó (jugadas ${e.jugadas})`);
    assert.ok(e.jugadas < DAMAS_CHINAS.maxJugadasPorJugador * e.n);
    const meta = hoyosDePunta(enfrente(e.puntas[e.ganador!]));
    assert.ok(meta.every((i) => e.hoyos[i] >= 0));
  }
});

test("damas chinas: la jugada que llega por la red se revisa entera", () => {
  const azar = azarCon(77);
  let e = damasChinas.estadoInicial({ bots: [null, null] }, azar, 0);
  e = damasChinas.alTiempo(e, DAMAS_CHINAS.prepararMs, azar)!;
  const a = e.turno;
  const j = todasLasJugadas(e, a)[0];
  assert.equal(damasChinas.aplicar(e, 1 - a, { t: "mover", ...j }, 3000, azar).ok, false, "no es su turno");
  assert.equal(damasChinas.aplicar(e, a, { t: "mover", desde: j.desde, camino: [0] }, 3000, azar).ok, false);
  assert.equal(damasChinas.leerJugada({ t: "mover", desde: 3, camino: ["x"] }), null);
  assert.ok(damasChinas.aplicar(e, a, { t: "mover", ...j }, 3000, azar).ok);
});

// ================================================================ la memoria
test("memoria: parejas de personaje y versículo; lo de abajo no se ve", () => {
  assert.ok(PAREJAS.length >= TAMANOS_MEMORIA.grande.parejas);
  assert.equal(new Set(PAREJAS.map((p) => p.id)).size, PAREJAS.length);
  const azar = azarCon(4);
  const e = memoria.estadoInicial({ bots: [null, null], opciones: { tamano: "chico" } }, azar, 0);
  assert.equal(e.cartas.length, 24);
  const v = memoria.vistaPara(e, 0, 0);
  assert.ok(v.cartas.every((c) => c.estado === "oculta" && !("par" in c)));
  const porPar = new Map<number, string[]>();
  for (const c of e.cartas) porPar.set(c.par, [...(porPar.get(c.par) ?? []), c.cara]);
  for (const l of porPar.values()) assert.deepEqual(l.sort(), ["figura", "verso"]);
});

test("memoria: dos que no son pareja se ven y se tapan; la pareja suma y se vuelve a jugar", () => {
  const azar = azarCon(6);
  let e = memoria.estadoInicial({ bots: [null, null] }, azar, 0);
  e = memoria.alTiempo(e, 2500, azar)!;
  const a = e.turno;
  const x = 0;
  const pareja = e.cartas.findIndex((c, i) => i !== x && c.par === e.cartas[x].par);
  const otra = e.cartas.findIndex((c, i) => i !== x && c.par !== e.cartas[x].par);
  e = (memoria.aplicar(e, a, { t: "voltear", c: x }, 3000, azar) as { e: EstadoMemoria }).e;
  const v = memoria.vistaPara(e, 1 - a, 3000);
  assert.equal(v.cartas[x].estado, "abierta", "todos la ven");
  e = (memoria.aplicar(e, a, { t: "voltear", c: otra }, 3500, azar) as { e: EstadoMemoria }).e;
  assert.ok(e.taparEn != null);
  assert.equal(memoria.aplicar(e, a, { t: "voltear", c: pareja }, 3600, azar).ok, false, "espera a que se tapen");
  e = memoria.alTiempo(e, e.taparEn! + 1, azar)!;
  assert.equal(e.turno, 1 - a);
  assert.equal(memoria.vistaPara(e, a, 6000).cartas[x].estado, "oculta");
  // ahora el otro voltea la pareja
  const b = e.turno;
  e = (memoria.aplicar(e, b, { t: "voltear", c: x }, 6000, azar) as { e: EstadoMemoria }).e;
  e = (memoria.aplicar(e, b, { t: "voltear", c: pareja }, 6200, azar) as { e: EstadoMemoria }).e;
  assert.equal(e.puntos[b], 1);
  assert.equal(e.turno, b, "vuelve a jugar");
  assert.equal(memoria.vistaPara(e, a, 6300).cartas[pareja].estado, "tomada");
});

test("memoria: el compañero difícil recuerda lo que todos vieron (y no lo que nadie vio)", () => {
  const azar = azarCon(12);
  let e = memoria.estadoInicial({ bots: [null, "dificil"] }, azar, 0);
  const x = 2;
  const y = e.cartas.findIndex((c, i) => i !== x && c.par === e.cartas[x].par);
  // las dos se vieron hace poco
  e = { ...e, fase: "jugando", turno: 1, vueltas: 2, vistaEn: e.vistaEn.map((_, i) => (i === x ? 1 : i === y ? 2 : null)) };
  const elige = decidirMemoria(e, 1, "dificil", azar);
  assert.ok(elige === x || elige === y, "va por la pareja que vio");
  // sin haberlas visto, no sabe nada
  const ciego = { ...e, vistaEn: e.vistaEn.map(() => null) } as EstadoMemoria;
  let acierta = 0;
  for (let k = 0; k < 40; k++) {
    const c = decidirMemoria(ciego, 1, "dificil", azarCon(500 + k));
    if (c === x || c === y) acierta++;
  }
  assert.ok(acierta < 12, `no adivina lo oculto (${acierta} de 40)`);
});

test("memoria: una partida de compañeros se lleva todas las parejas; y se puede jugar solo", () => {
  for (const bots of [["facil", "dificil", "normal"], ["normal"]] as Nivel[][]) {
    const azar = azarCon(bots.length * 3);
    const e0 = memoria.estadoInicial({ bots, opciones: { tamano: "grande" } }, azar, 0);
    const { e } = correrHastaElFin(memoria, e0, 0, azar);
    assert.ok(memoria.terminado(e));
    assert.equal(e.puntos.reduce((s, x) => s + x, 0), 18);
    assert.ok(e.tomada.every((q) => q != null));
  }
});

// ================================================================ el «Basta» bíblico
test("basta: se compara sin tildes, sin «el», sin «1» o «monte», y perdona una letra en las largas", () => {
  assert.equal(normalizarBasta("El Moisés"), "moises");
  assert.equal(normalizarBasta("1 Samuel"), "samuel");
  assert.equal(normalizarBasta("Primera de Corintios"), "corintios");
  assert.equal(normalizarBasta("Monte Sinaí"), "sinai");
  assert.equal(revisarRespuesta("personaje", "M", "moises"), "Moisés");
  assert.equal(revisarRespuesta("personaje", "M", "Moices"), "Moisés", "una letra cambiada");
  assert.equal(revisarRespuesta("personaje", "A", "Moisés"), null, "otra letra");
  assert.equal(revisarRespuesta("lugar", "B", "belen"), "Belén");
  assert.equal(revisarRespuesta("libro", "S", "1 Samuel"), "Samuel");
  assert.equal(revisarRespuesta("libro", "S", "Salmo"), "Salmos");
  assert.equal(revisarRespuesta("objeto", "C", "cantaro"), "Cántaro");
  assert.equal(revisarRespuesta("objeto", "C", "computadora"), null);
  assert.equal(revisarRespuesta("lugar", "M", "Mar Rojo"), "Mar Rojo");
});

test("basta: cada letra tiene respuestas en las cuatro categorías", () => {
  for (const l of LETRAS_BASTA)
    for (const c of CATEGORIAS_BASTA) {
      const p = palabrasDe(c, l);
      assert.ok(p.length >= 1, `${l} · ${c}`);
      for (const w of p) assert.equal(revisarRespuesta(c, l, w), w, `${w} vale en ${c} con ${l}`);
    }
});

test("basta: «¡Basta!» con las cuatro llenas, los demás alcanzan a terminar, y 100 / 50 / 0", () => {
  const azar = azarCon(19);
  let e = basta.estadoInicial({ bots: [null, null, null] }, azar, 0);
  e = basta.alTiempo(e, BASTA.prepararMs, azar)!;
  assert.equal(e.fase, "escribir");
  const letra = e.letras[0];
  const w = (c: (typeof CATEGORIAS_BASTA)[number], k = 0) => palabrasDe(c, letra)[k] ?? palabrasDe(c, letra)[0];
  const t = BASTA.prepararMs + 1000;
  assert.equal(basta.aplicar(e, 0, { t: "basta" }, t, azar).ok, false, "faltan casillas");
  const llenar = (a: number, r: Record<string, string>, at: number) => {
    const x = basta.aplicar(e, a, { t: "respuestas", r }, at, azar);
    assert.ok(x.ok);
    e = (x as { e: EstadoBasta }).e;
  };
  llenar(0, { personaje: w("personaje"), lugar: w("lugar"), libro: w("libro"), objeto: "zzzz no vale" }, t);
  llenar(1, { personaje: w("personaje"), lugar: w("lugar", 1) }, t + 10);
  // mientras se escribe, nadie ve lo del otro
  const v = basta.vistaPara(e, 1, t + 20);
  assert.ok(!JSON.stringify(v).includes("zzzz"));
  assert.equal(v.llevan[0], 4);
  const b = basta.aplicar(e, 0, { t: "basta" }, t + 30, azar);
  assert.ok(b.ok);
  e = (b as { e: EstadoBasta }).e;
  assert.equal(e.fase, "basta");
  llenar(1, { objeto: w("objeto") }, t + 30 + BASTA.bastaMs - 100);
  e = basta.alTiempo(e, t + 30 + BASTA.bastaMs + 1, azar)!;
  assert.equal(e.fase, "revisar");
  const r = e.rondas[0];
  assert.equal(r.casillas[0].personaje.puntos, BASTA.repetida, "repetida con el 1");
  assert.equal(r.casillas[1].personaje.puntos, BASTA.repetida);
  assert.equal(r.casillas[0].objeto.puntos, 0, "no está en la lista");
  assert.equal(r.casillas[0].libro.puntos, BASTA.unica);
  assert.equal(r.casillas[1].objeto.puntos, BASTA.unica);
  assert.equal(r.casillas[2].lugar.puntos, 0, "vacía");
  // al revisar, de los demás solo se ve lo que vale
  const vr = basta.vistaPara(e, 2, t + 40 + BASTA.bastaMs);
  assert.ok(!JSON.stringify(vr).includes("zzzz"));
  assert.equal(basta.vistaPara(e, 0, t + 40 + BASTA.bastaMs).revisada!.miCrudo!.objeto, "zzzz no vale", "cada uno ve lo suyo");
});

test("basta: una partida de compañeros juega las cinco rondas", () => {
  const azar = azarCon(23);
  const e0 = basta.estadoInicial({ bots: ["facil", "normal", "dificil", "dificil"] }, azar, 0);
  const { e } = correrHastaElFin(basta, e0, 0, azar);
  assert.ok(basta.terminado(e));
  assert.equal(e.rondas.length, BASTA.rondas);
  assert.equal(new Set(e.letras).size, BASTA.rondas);
  assert.ok(e.rondas.some((r) => r.dijoBasta != null), "alguna vez dijeron «¡Basta!»");
  assert.ok(e.puntos[3] + e.puntos[2] > e.puntos[0], "los difíciles saben más");
});

// ================================================================ dentro del marco de mesas del patio
import { MESAS_TRADICIONALES, MESA_TRADICIONAL, tituloConNombres } from "./mesa/tradicionales";
import { JUEGOS_MESA, MESAS_PATIO, ORDEN_MESAS, opcionesValidas } from "./mesa/juegos";

test("en la sala: los siete juegos con su nombre, su versículo y sus opciones; nadie «tiene que jugar» (el módulo lleva su reloj)", () => {
  assert.deepEqual(MESAS_TRADICIONALES.map((j) => j.id), ORDEN_MESAS);
  for (const j of MESAS_TRADICIONALES) {
    assert.ok(j.nombre && j.icono && j.verso.text && j.verso.ref && j.como.length === 3, j.id);
    assert.equal(j.modo, "todos");
    assert.ok(j.relojPropio);
    const e = j.estadoInicial([{ n: 0, nombre: "Ana", bot: null }, { n: 1, nombre: "Rubén 🤖", bot: "normal" }], azarCon(1), {}, 0);
    assert.deepEqual(j.pendientes(e), []);
    assert.equal(j.turnoDe(e), null);
    assert.ok(j.proximoCambio(e, 0) != null, `${j.id}: algo cambia solo`);
  }
  assert.deepEqual(opcionesValidas("loteria", { modo: "llena", ritmo: "nada", otra: 1 }), { modo: "llena", ritmo: "normal" });
  assert.equal(MESAS_PATIO.length, 6);
  assert.deepEqual(MESAS_PATIO.map((m) => m.id).sort(), ORDEN_MESAS.filter((id) => id !== "dibuja").sort(), "una mesa por juego (dibujar se juega en la mesa de los juegos)");
  assert.equal(tituloConNombres("¡Lotería de @1!", ["Ana", "Rubén 🤖"]), "¡Lotería de Rubén 🤖!");
  assert.ok(JUEGOS_MESA.memoria.min === 1, "la memoria se juega solo");
});

test("en la sala: una persona con compañeros juega la lotería entera (marca, canta, y el título lleva los nombres)", () => {
  const j = MESA_TRADICIONAL.loteria;
  const azar = azarCon(55);
  let e = j.estadoInicial(
    [
      { n: 0, nombre: "Luis", bot: null },
      { n: 1, nombre: "Rubén 🤖", bot: "dificil" },
      { n: 2, nombre: "Débora 🤖", bot: "normal" },
    ],
    azar,
    { modo: "linea", ritmo: "rapido" },
    0,
  );
  let ahora = 0;
  let cante = false;
  for (let k = 0; k < 5000 && !j.terminado(e); k++) {
    const p = j.proximoCambio(e, ahora);
    if (p == null) break;
    ahora += Math.max(1, Math.min(p, 700));
    e = j.alTiempo(e, ahora, azar) ?? e;
    // la persona marca todo lo que salió y canta cuando la tiene
    for (const x of j.jugadasValidas(e, 0) as { t: string; k?: number }[]) {
      if (x.t !== "marcar") continue;
      assert.equal(j.porQueNo(e, 0, x, ahora), null);
      e = j.aplicar(e, 0, x, azar, ahora);
    }
    const v = j.vistaPara(e, 0, ahora) as { marcas: boolean[]; ganadores: number[] };
    if (!cante && v.marcas && j.porQueNo(e, 0, { t: "loteria" }, ahora) === null) {
      const m = e.m as EstadoLoteria;
      if (patronCompleto(m.marcas[0], "linea")) {
        e = j.aplicar(e, 0, { t: "loteria" }, azar, ahora);
        cante = true;
      }
    }
  }
  const fin = j.terminado(e)!;
  assert.ok(fin);
  assert.ok(fin.ganadores.length >= 1);
  assert.ok(!/@\d/.test(fin.titulo), fin.titulo);
  assert.equal(j.porQueNo(e, 0, { t: "marcar", k: 99 }), "Esa jugada no se entiende.");
});

test("en la sala: lo que no vale se explica (y lo que no se entiende, también)", () => {
  const j = MESA_TRADICIONAL.generala;
  const e = j.estadoInicial([{ n: 0, nombre: "Ana", bot: null }, { n: 1, nombre: "Luis", bot: null }], azarCon(3), {}, 0);
  const e2 = j.alTiempo(e, GENERALA.prepararMs, azarCon(3))!;
  const turno = (e2.m as EstadoGenerala).turno;
  assert.match(j.porQueNo(e2, 1 - turno, { t: "tirar", guardar: [] }, GENERALA.prepararMs + 5) ?? "", /No es tu turno/);
  assert.match(j.porQueNo(e2, turno, { t: "anotar", cat: "full" }, GENERALA.prepararMs + 5) ?? "", /Primero tira/);
  assert.equal(j.porQueNo(e2, turno, { t: "volar" }, GENERALA.prepararMs + 5), "Esa jugada no se entiende.");
  assert.equal(j.porQueNo(e2, turno, { t: "tirar", guardar: [] }, GENERALA.prepararMs + 5), null);
});

// ================================================================ dibuja y adivina
import { DIBUJA, PALABRAS_DIBUJA, dibuja, type EstadoDibuja } from "./mesa/dibuja";

test("dibuja: quien dibuja ve su palabra, los demás ocho opciones; aciertan en orden y la ronda se cierra cuando todos eligen", () => {
  const azar = azarCon(31);
  let e = dibuja.estadoInicial({ bots: [null, null, null] }, azar, 0);
  e = dibuja.alTiempo(e, DIBUJA.prepararMs, azar)!;
  const d = e.orden[0];
  const otros = [0, 1, 2].filter((a) => a !== d);
  const palabra = PALABRAS_DIBUJA[e.palabra];
  assert.equal(dibuja.vistaPara(e, d, 4000).palabra, palabra);
  const vo = dibuja.vistaPara(e, otros[0], 4000);
  assert.equal(vo.palabra, null, "quien adivina no ve la palabra");
  assert.equal(vo.opciones!.length, DIBUJA.opciones);
  assert.ok(vo.opciones!.some((x) => x.texto === palabra));
  assert.ok(!JSON.stringify(vo).includes(`"palabra":${e.palabra}`));
  // el dibujo: solo quien dibuja, con colores y grosores de la lista
  assert.equal(dibuja.aplicar(e, otros[0], { t: "trazo", c: 0, g: 6, p: [0, 0, 10, 10] }, 4100, azar).ok, false);
  assert.equal(dibuja.leerJugada({ t: "trazo", c: 99, g: 6, p: [0, 0, 1, 1] }), null);
  assert.equal(dibuja.leerJugada({ t: "trazo", c: 1, g: 5, p: [0, 0, 1, 1] }), null);
  e = (dibuja.aplicar(e, d, { t: "trazo", c: 1, g: 6, p: [100, 100, 500, 500, 900, 120] }, 4200, azar) as { e: EstadoDibuja }).e;
  assert.equal(dibuja.vistaPara(e, otros[1], 4300).trazos.length, 1);
  assert.equal(dibuja.aplicar(e, d, { t: "adivinar", o: e.palabra }, 4300, azar).ok, false, "quien dibuja no adivina");
  // uno acierta y otro falla: se cierra la ronda
  const mala = e.opciones.find((o) => o !== e.palabra)!;
  e = (dibuja.aplicar(e, otros[0], { t: "adivinar", o: e.palabra }, 5000, azar) as { e: EstadoDibuja }).e;
  assert.equal(e.puntos[otros[0]], DIBUJA.acierto[0]);
  assert.equal(dibuja.aplicar(e, otros[0], { t: "adivinar", o: mala }, 5100, azar).ok, false, "una vez por ronda");
  assert.equal(dibuja.vistaPara(e, otros[1], 5100).aciertos[0], otros[0], "se ve quién acertó");
  e = (dibuja.aplicar(e, otros[1], { t: "adivinar", o: mala }, 5200, azar) as { e: EstadoDibuja }).e;
  assert.equal(e.fase, "revelar");
  assert.equal(e.puntos[d], DIBUJA.porAcierto, "quien dibuja gana por cada acierto");
  assert.equal(dibuja.vistaPara(e, otros[1], 5300).palabra, palabra, "al revelar todos la ven");
});

test("dibuja: solo (o con compañeros de la computadora, que solo miran) es práctica de tres palabras; y en grupo cada uno dibuja una vez", () => {
  const azar = azarCon(8);
  let e = dibuja.estadoInicial({ bots: [null, "normal", "facil"] }, azar, 0);
  assert.deepEqual(e.orden, [0]);
  e = dibuja.alTiempo(e, DIBUJA.prepararMs, azar)!;
  assert.equal(dibuja.vistaPara(e, 0, 4000).practica, true);
  assert.equal(dibuja.aplicar(e, 1, { t: "adivinar", o: e.palabra }, 4000, azar).ok, false, "el compañero solo mira");
  e = (dibuja.aplicar(e, 0, { t: "listo" }, 9000, azar) as { e: EstadoDibuja }).e;
  assert.equal(e.fase, "revelar");
  let t = 9000;
  for (let k = 0; k < 20 && e.fase !== "fin"; k++) {
    t = Math.max(t, e.faseHasta);
    e = dibuja.alTiempo(e, t, azar) ?? e;
  }
  assert.equal(e.fase, "fin");
  assert.equal(e.usadas.length, DIBUJA.rondasPractica);
  assert.equal(new Set(e.usadas).size, e.usadas.length, "sin repetir palabras");
  const g = dibuja.estadoInicial({ bots: [null, null, null, null] }, azar, 0);
  assert.equal(new Set(g.orden).size, 4);
});

test("en la sala: si alguien se va a mitad de partida, la computadora sigue en su asiento (y juega)", () => {
  const j = MESA_TRADICIONAL.escaleras;
  const azar = azarCon(71);
  let e = j.estadoInicial([{ n: 0, nombre: "Ana", bot: null }, { n: 1, nombre: "Luis", bot: null }], azar, {}, 0);
  e = j.cambiarAsiento(e, 1, { n: 1, nombre: "Rubén 🤖", bot: "normal" });
  assert.equal(e.nombres[1], "Rubén 🤖");
  // Ana se va también: ya juega la computadora en los dos asientos, y la partida termina sola
  e = j.cambiarAsiento(e, 0, { n: 0, nombre: "Débora 🤖", bot: "facil" });
  let ahora = 0;
  for (let k = 0; k < 20000 && !j.terminado(e); k++) {
    const p = j.proximoCambio(e, ahora);
    if (p == null) break;
    ahora += Math.max(1, p);
    e = j.alTiempo(e, ahora, azar) ?? e;
  }
  const fin = j.terminado(e)!;
  assert.ok(fin && fin.ganadores.length === 1);
  assert.match(fin.titulo, /Rubén 🤖|Débora 🤖/);
});
