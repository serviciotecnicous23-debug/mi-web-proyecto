// El tiempo de estudio del salón (server/academia-salon.ts): los días de Texas, la semana y los días seguidos, también
// con los cambios de horario. npx tsx --test server/academia-salon.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { moverDia, rachaDe, ultimosDias } from "./academia-salon";

test("mover un día no se descuadra con los cambios de horario", () => {
  assert.equal(moverDia("2026-03-08", -1), "2026-03-07"); // empieza el horario de verano en EE. UU.
  assert.equal(moverDia("2026-03-08", 1), "2026-03-09");
  assert.equal(moverDia("2026-11-01", 1), "2026-11-02"); // termina
  assert.equal(moverDia("2026-12-31", 1), "2027-01-01");
  assert.equal(moverDia("2028-03-01", -1), "2028-02-29");
});

test("los últimos 7 días terminan en el día de Texas", () => {
  const dias = ultimosDias(7, new Date("2026-11-15T18:00:00Z"));
  assert.deepEqual(dias, ["2026-11-09", "2026-11-10", "2026-11-11", "2026-11-12", "2026-11-13", "2026-11-14", "2026-11-15"]);
  // las 9 de la noche del 15 en Texas ya son el 16 en UTC: cuenta el 15
  assert.equal(ultimosDias(7, new Date("2026-11-16T03:00:00Z")).at(-1), "2026-11-15");
  // la semana del cambio de horario tiene sus 7 días
  assert.equal(new Set(ultimosDias(7, new Date("2026-03-10T18:00:00Z"))).size, 7);
});

test("los días seguidos cuentan desde hoy, o desde ayer si hoy todavía no estudió", () => {
  const hoy = new Date("2026-11-15T18:00:00Z");
  assert.equal(rachaDe(new Set(["2026-11-13", "2026-11-14", "2026-11-15"]), hoy), 3);
  assert.equal(rachaDe(new Set(["2026-11-13", "2026-11-14"]), hoy), 2, "hoy todavía puede estudiar");
  assert.equal(rachaDe(new Set(["2026-11-12", "2026-11-13"]), hoy), 0, "ayer no estudió: se cortó");
  assert.equal(rachaDe(new Set(), hoy), 0);
});
