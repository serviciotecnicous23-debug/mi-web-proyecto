// La fase 3 de la economía (el taller): la pieza fina del artesano, el redil, el telar, el fardo y el intercambio.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  FARDO_MAX, IGUALES, LANA, LANA_HORAS, LANA_TOPE_POR_OVEJA, PARA_EL_ARTESANO, TELAR, estudiosDeFina, finaDe, horasDeFina, jornalDeFina, lanaDelRedil,
  leerFardo, leerOficios, ovejasMax, porQueNoFina, rangoDeCosa, type Redil,
} from "./taller";
import { ARTICULOS, ROPA_DEL_ANIO, articulo, coloresDeIds, enTemporada, ofertasDelDia } from "./mercado";
import { MUEBLES, MUEBLES_FINOS, VALOR_FINA, mueble, muebleBase } from "./casa-interior";
import { JUEGOS_DE_MUEBLES, PUNTOS_CASA, estrellasDeCasa } from "./obras";
import { diaEnJerusalen, mediodiaDe } from "./anio";

const HORA = 3_600_000;

test("cada mueble del mercado y cada prenda que se vende tiene su pieza fina, que no se vende", () => {
  const muebles = MUEBLES.filter((m) => !m.fina);
  const ropa = ARTICULOS.filter((a) => a.categoria === "ropa" && !a.exclusivo);
  assert.equal(MUEBLES_FINOS.length, muebles.length);
  for (const a of [...muebles, ...ropa]) {
    const f = finaDe(a.id);
    assert.ok(f, `falta la fina de ${a.id}`);
    assert.equal(f!.fina, a.id);
    assert.equal(f!.exclusivo, "taller");
    assert.equal(f!.categoria, a.categoria);
    assert.equal(f!.precio, a.precio * VALOR_FINA);
    assert.equal(finaDe(f!.id), undefined, "no hay fina de una fina");
    assert.ok(PARA_EL_ARTESANO.includes(a));
  }
  assert.equal(PARA_EL_ARTESANO.length, muebles.length + ropa.length);
  // los nombres de las piezas finas no se repiten (ni con lo de antes) y la ropa fina sigue siendo manto o faja
  const finas = ARTICULOS.filter((a) => a.fina);
  const antes = new Set(ARTICULOS.filter((a) => !a.fina).map((a) => a.nombre));
  assert.equal(new Set(finas.map((a) => a.nombre)).size, finas.length);
  for (const a of finas) assert.ok(!antes.has(a.nombre), a.nombre);
  for (const a of ARTICULOS.filter((x) => x.categoria === "ropa" && x.fina)) assert.ok(/^(manto|faja)-.*-oro$/.test(a.id), a.id);
  // la ropa fina no es de temporada (no se vende, y quien la tiene la guarda)
  for (const a of ARTICULOS.filter((x) => x.fina)) assert.equal(a.deTemporada, undefined);
  // el mueble fino tiene el mismo tamaño y pide la misma casa
  for (const f of MUEBLES_FINOS) {
    const b = mueble(f.fina!)!;
    assert.deepEqual([f.w, f.d, f.capa, f.luz ?? false, f.nivelMin ?? 0], [b.w, b.d, b.capa, b.luz ?? false, b.nivelMin ?? 0]);
    assert.equal(muebleBase(f.id), b.id);
  }
  assert.equal(muebleBase("silla"), "silla");
});

test("las ofertas del día siguen iguales: no entran las piezas finas", () => {
  for (let i = 0; i < 60; i++) {
    const dia = new Date(Date.UTC(2026, 10, 1 + i)).toISOString().slice(0, 10);
    for (const id of ofertasDelDia(dia)) assert.ok(!articulo(id)?.exclusivo, `${dia}: ${id}`);
  }
});

test("lo que cobra y lo que pide el artesano", () => {
  for (const a of PARA_EL_ARTESANO) {
    assert.ok([1, 2, 3].includes(estudiosDeFina(a)), a.id);
    assert.equal(jornalDeFina(a), a.precio * 2);
    const h = horasDeFina(a);
    assert.ok(h >= 1 && h <= 6, a.id);
  }
  // lo más caro pide más estudios
  assert.equal(estudiosDeFina(articulo("estera")!), 1);
  assert.equal(estudiosDeFina(articulo("candelero")!), 2);
  assert.equal(estudiosDeFina(articulo("estante")!), 3);
  // hacer todas las piezas finas (las 4 iguales y el jornal) es un gasto grande: varias semanas de un jugador activo
  const total = PARA_EL_ARTESANO.reduce((s, a) => s + a.precio * IGUALES + jornalDeFina(a), 0);
  assert.equal(total, 10362);
});

test("por qué no se puede llevar al artesano (en orden)", () => {
  const silla = articulo("silla")!;
  const base = { tengo: 4, estudios: 3, ocupado: false, gozo: 999, cabe: true };
  assert.equal(porQueNoFina(silla, base), null);
  assert.match(porQueNoFina(silla, { ...base, ocupado: true })!, /otra pieza/);
  assert.match(porQueNoFina(silla, { ...base, tengo: 3 })!, /falta 1/);
  assert.match(porQueNoFina(articulo("faja-azul")!, { ...base, tengo: 1 })!, /fardo: te faltan 3/);
  assert.match(porQueNoFina(articulo("estante")!, { ...base, estudios: 2 })!, /3 estudios aprobados/);
  assert.match(porQueNoFina(silla, { ...base, estudios: 0 })!, /un estudio aprobado/);
  assert.match(porQueNoFina(silla, { ...base, cabe: false })!, /no te cabe/);
  assert.match(porQueNoFina(silla, { ...base, gozo: 49 })!, /jornal del artesano es de 50/);
});

test("el redil: cada oveja da lana cada 8 horas, hasta 3, y nada se pierde al trasquilar", () => {
  assert.deepEqual([0, 1, 2, 3].map(ovejasMax), [2, 3, 4, 6]);
  const t0 = Date.UTC(2026, 10, 12, 12);
  const r: Redil = { ovejas: 2, desde: new Date(t0).toISOString(), pendiente: 0 };
  assert.equal(lanaDelRedil(r, t0 + 7 * HORA).lista, 0);
  assert.equal(lanaDelRedil(r, t0 + 7 * HORA).proxima, 3600);
  assert.equal(lanaDelRedil(r, t0 + LANA_HORAS * HORA).lista, 2);
  assert.equal(lanaDelRedil(r, t0 + 17 * HORA).lista, 4);
  // se junta hasta 3 por oveja y ahí se para (hay que trasquilar)
  const lleno = lanaDelRedil(r, t0 + 100 * HORA);
  assert.equal(lleno.lista, 2 * LANA_TOPE_POR_OVEJA);
  assert.equal(lleno.proxima, null);
  // trasquilar solo lo que cabe: el resto queda en las ovejas, exacto
  const a = lanaDelRedil(r, t0 + 17 * HORA);
  const queda: Redil = { ...a.asentado, pendiente: a.lista - 3 };
  assert.equal(lanaDelRedil(queda, t0 + 17 * HORA).lista, 1);
  // y sigue contando desde la última vuelta (a las 24 h, una vuelta más: 2 más)
  assert.equal(lanaDelRedil(queda, t0 + 24 * HORA).lista, 3);
  // sin ovejas no hay lana
  assert.equal(lanaDelRedil({ ovejas: 0, desde: null, pendiente: 0 }, t0).lista, 0);
});

test("el telar teje con lana lo que también vende el mercado", () => {
  for (const r of Object.values(TELAR)) {
    const a = articulo(r.da);
    assert.ok(a && !a.exclusivo && !a.deTemporada, r.da);
    assert.ok(r.lana >= 1 && r.minutos >= 10);
  }
});

test("los precios del intercambio: pesa cabal", () => {
  const d = diaEnJerusalen();
  assert.deepEqual(rangoDeCosa(LANA, d), { min: 1, max: 6, fueraDeTiempo: false });
  // lo que se vende siempre no pasa de su precio del mercado
  assert.deepEqual(rangoDeCosa("silla", d), { min: 13, max: 25, fueraDeTiempo: false });
  assert.deepEqual(rangoDeCosa("manto-cielo", d), { min: 25, max: 50, fueraDeTiempo: false });
  // la pieza fina: de 4 a 8 veces la pieza de donde sale
  assert.deepEqual(rangoDeCosa("silla-oro", d), { min: 100, max: 200, fueraDeTiempo: false });
  // lo que no se vende no se cambia (ni los adornos, ni las semillas)
  assert.equal(rangoDeCosa("manto-sabio", d), null);
  assert.equal(rangoDeCosa("maceta", d), null);
  assert.equal(rangoDeCosa("trigo", d), null);
  assert.equal(rangoDeCosa("no-existe", d), null);
  // la ropa de temporada: en su tiempo como cualquiera; fuera de su tiempo vale de 1 a 3 veces su precio
  const lagar = articulo("manto-lagar")!;
  let dentro: ReturnType<typeof diaEnJerusalen> | null = null;
  let fuera: ReturnType<typeof diaEnJerusalen> | null = null;
  const base = mediodiaDe(diaEnJerusalen().iso);
  for (let i = 0; i < 400 && (!dentro || !fuera); i++) {
    const x = diaEnJerusalen(base + i * 86_400_000);
    if (enTemporada(lagar, x)) dentro ??= x;
    else fuera ??= x;
  }
  assert.deepEqual(rangoDeCosa("manto-lagar", dentro!), { min: 35, max: 70, fueraDeTiempo: false });
  assert.deepEqual(rangoDeCosa("manto-lagar", fuera!), { min: 70, max: 210, fueraDeTiempo: true });
  // toda la ropa del año se puede cambiar entre vecinos
  for (const a of ROPA_DEL_ANIO) assert.ok(rangoDeCosa(a.id, d), a.id);
});

test("las estrellas: la pieza fina cuenta como su mueble y suma aparte", () => {
  const c = { nivel: 1, obras: [], adornos: [], letrero: false };
  const base = estrellasDeCasa({ ...c, muebles: ["silla"] });
  const fina = estrellasDeCasa({ ...c, muebles: ["silla-oro"] });
  const las2 = estrellasDeCasa({ ...c, muebles: ["silla", "silla-oro"] });
  assert.equal(fina.puntos - base.puntos, PUNTOS_CASA.fina);
  assert.equal(las2.puntos, fina.puntos);
  // un juego de muebles se completa también con la fina
  const j = JUEGOS_DE_MUEBLES.find((x) => x.id === "cocina")!;
  const conFina = estrellasDeCasa({ ...c, muebles: j.muebles.map((m, i) => (i === 0 ? `${m}-oro` : m)) });
  assert.ok(conFina.juegos.find((x) => x.id === "cocina")!.completo);
});

test("la ropa fina se ve con su orla de oro", () => {
  assert.deepEqual(coloresDeIds({ manto: "manto-cielo-oro", faja: "faja-azul" }), { manto: "#7fb2d9", mantoOro: true, faja: "#2f5aa8" });
  assert.deepEqual(coloresDeIds({ manto: null, faja: "faja-ocre-oro" }), { faja: "#c98a2b", fajaOro: true });
});

test("lo guardado se lee con cuidado", () => {
  assert.deepEqual(leerOficios(null), { redil: { ovejas: 0, desde: null, pendiente: 0 }, lana: 0, telar: null, artesano: null });
  const o = leerOficios({
    redil: { ovejas: 3, desde: "2026-11-12T10:00:00.000Z", pendiente: 2 },
    lana: 7.9,
    telar: { receta: "alfombra", desde: "2026-11-12T10:00:00.000Z", lista: "2026-11-12T12:00:00.000Z" },
    artesano: { pieza: "silla-oro", desde: "2026-11-12T10:00:00.000Z", lista: "2026-11-12T12:00:00.000Z", lugar: { m: "silla", x: 2, z: 3, r: 1, p: 0 } },
  });
  assert.equal(o.lana, 7);
  assert.equal(o.telar?.receta, "alfombra");
  assert.deepEqual(o.artesano?.lugar, { m: "silla", x: 2, z: 3, r: 1, p: 0 });
  // lo que no es de verdad se descarta
  assert.equal(leerOficios({ telar: { receta: "pan", desde: "x", lista: "y" }, artesano: { pieza: "silla", desde: "x", lista: "y" } }).telar, null);
  assert.equal(leerOficios({ artesano: { pieza: "silla", desde: "2026-11-12T10:00:00.000Z", lista: "2026-11-12T12:00:00.000Z" } }).artesano, null);
  assert.deepEqual(leerFardo({ "manto-lagar": 2, silla: 3, "faja-azul": 0, nada: 1 }), { "manto-lagar": 2 });
  assert.ok(FARDO_MAX >= IGUALES, "en el fardo caben las 4 iguales para el artesano");
});
