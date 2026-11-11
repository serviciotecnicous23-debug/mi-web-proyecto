// Las reglas del año de Jerusalén (shared/anio.ts) con fechas reales conocidas.
import { test } from "node:test";
import assert from "node:assert/strict";
import { EVENTOS_DEL_ANIO, bonoDelMomento, diaEnJerusalen, domingoDeResurreccion, encargoDeFiesta, factorCrecimiento, factorPrecio, mediodiaDe, proximaFiestaGrande, proximosEventos } from "./anio";
import { ENCARGOS, ENCARGOS_DE_FIESTA, encargoDef, esEncargoDeFiesta } from "./misiones";

const dia = (iso: string) => diaEnJerusalen(mediodiaDe(iso));
const ids = (iso: string) => dia(iso).eventos.map((e) => e.evento.id);

test("la fecha hebrea real", () => {
  assert.equal(dia("2026-11-11").hebreo.texto, "1 de Quisleu");
  assert.equal(dia("2027-04-21").hebreo.texto, "14 de Abib");
  assert.equal(dia("2027-03-09").hebreo.texto, "30 de Adar");
  assert.equal(dia("2027-03-10").hebreo.texto, "1 de Adar segundo");
  assert.equal(dia("2027-10-02").hebreo.texto, "1 de Etanim");
});

test("las fiestas de Levítico 23 en sus fechas reales", () => {
  assert.ok(ids("2027-04-21").includes("pascua"));
  assert.deepEqual(ids("2027-04-22").filter((x) => x === "panes"), ["panes"]);
  assert.ok(ids("2027-04-23").includes("primicias"));
  assert.equal(dia("2027-04-28").eventos.find((e) => e.evento.id === "panes")?.ultimo, true);
  assert.ok(ids("2027-06-11").includes("pentecostes"));
  assert.ok(ids("2027-10-02").includes("trompetas"));
  assert.ok(ids("2027-10-11").includes("expiacion"));
  assert.ok(ids("2027-10-16").includes("tabernaculos"));
  assert.ok(ids("2027-10-23").includes("asamblea"));
  // las fiestas de la ciudad (la forma vieja) también
  assert.equal(dia("2027-04-21").fecha.fiestas[0]?.fiesta.id, "pascua");
});

test("la luna nueva de cada mes, con su hora de las trompetas", () => {
  assert.ok(ids("2026-11-11").includes("lunaNueva"));
  assert.ok(!ids("2026-11-12").includes("lunaNueva"));
  const d = dia("2026-11-11");
  // a las 8 de la noche de Texas (2 de la mañana del día siguiente en UTC) es la hora de las trompetas
  const noche = Date.UTC(2026, 10, 12, 2, 0, 0);
  const b = bonoDelMomento(noche, d);
  assert.equal(b.hora, "La hora de las trompetas");
  assert.equal(b.merito, 1.5);
  assert.equal(bonoDelMomento(mediodiaDe("2026-11-11"), d).hora, null);
});

test("el día de reposo cada sábado", () => {
  assert.ok(ids("2026-11-14").includes("reposo"));
  assert.ok(!ids("2026-11-15").includes("reposo"));
});

test("las fiestas del ministerio", () => {
  assert.equal(domingoDeResurreccion(2027), "2027-03-28");
  assert.equal(domingoDeResurreccion(2026), "2026-04-05");
  assert.ok(ids("2027-03-26").includes("semanaSanta"));
  assert.ok(ids("2027-03-28").includes("semanaSanta"));
  assert.ok(!ids("2027-03-29").includes("semanaSanta"));
  assert.ok(ids("2026-12-24").includes("navidad"));
  assert.ok(ids("2026-12-25").includes("navidad"));
  assert.ok(!ids("2026-12-26").includes("navidad"));
  assert.ok(ids("2027-01-01").includes("anioNuevo"));
});

test("las estaciones de la tierra de Israel", () => {
  assert.equal(dia("2026-11-11").estacion.id, "invierno");
  assert.equal(dia("2026-10-20").estacion.id, "siembra");
  assert.equal(dia("2027-03-20").estacion.id, "cebada");
  assert.equal(dia("2027-05-20").estacion.id, "trigo");
  assert.equal(dia("2027-07-20").estacion.id, "verano");
  assert.equal(dia("2027-10-05").estacion.id, "cosecha");
  // en verano nunca llueve; en invierno, muchos días
  let lluvia = 0;
  for (let k = 0; k < 60; k++) if (diaEnJerusalen(mediodiaDe("2026-11-11") + k * 86400000).llueve) lluvia++;
  assert.ok(lluvia > 15 && lluvia < 50, `días de lluvia en invierno: ${lluvia}`);
  for (let k = 0; k < 60; k++) assert.equal(diaEnJerusalen(mediodiaDe("2027-07-06") + k * 86400000).llueve, false);
});

test("el huerto y el mercado según la estación", () => {
  assert.equal(factorCrecimiento("cebada", dia("2027-03-20")), 0.75);
  assert.equal(factorCrecimiento("trigo", dia("2027-05-20")), 0.75);
  assert.equal(factorCrecimiento("olivo", dia("2027-10-05")), 0.75);
  assert.equal(factorCrecimiento("trigo", dia("2026-11-20")), 1.15);
  assert.equal(factorPrecio("harina", dia("2027-05-20")), 0.8);
  assert.equal(factorPrecio("harina", dia("2026-11-20")), 1.2);
  assert.equal(factorPrecio("aceite", dia("2027-07-20")), 1.15);
});

test("lo que viene", () => {
  const p = proximosEventos(mediodiaDe("2026-11-11"), 6);
  assert.ok(p.length === 6 && p[0].enDias >= 1, JSON.stringify(p.map((x) => x.evento.id)));
  assert.ok(p.some((x) => x.evento.id === "reposo"));
  const g = proximaFiestaGrande(mediodiaDe("2026-11-11"));
  assert.equal(g?.evento.id, "navidad");
  assert.equal(g?.iso, "2026-12-24");
});

test("el encargo de la fiesta", () => {
  // cada evento del año trae su encargo, de los que pueden hacer los tres caminos
  assert.equal(ENCARGOS_DE_FIESTA.length, EVENTOS_DEL_ANIO.length);
  for (const e of ENCARGOS_DE_FIESTA) {
    assert.ok(esEncargoDeFiesta(e.id) && encargoDef(e.id) === e, e.id);
    assert.deepEqual(e.caminos, ["sacerdocio", "profecia", "realeza"]);
    // el tipo es uno de los que ya cuentan en el juego (los del banco de encargos para los tres caminos)
    assert.ok(ENCARGOS.some((x) => x.tipo === e.tipo && (x.caminos ?? []).length === 3), e.id);
  }
  assert.ok(!ENCARGOS.some((x) => esEncargoDeFiesta(x.id)), "los encargos de fiesta no se sortean");
  assert.equal(encargoDeFiesta("2026-11-11")?.id, "ev-lunaNueva");
  assert.equal(encargoDeFiesta("2026-11-14")?.id, "ev-reposo");
  assert.equal(encargoDeFiesta("2026-11-12"), null);
  assert.equal(encargoDeFiesta("2026-12-24")?.id, "ev-navidad");
  assert.equal(encargoDeFiesta("2027-01-01")?.id, "ev-anioNuevo");
  assert.equal(encargoDeFiesta("2027-03-26")?.id, "ev-semanaSanta");
});
