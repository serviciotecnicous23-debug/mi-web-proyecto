// Las reglas del regreso a Jerusalén en línea (shared/regreso.ts): cuándo es una vuelta, qué trae el regalo y cuándo
// se puede recibir.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  PRENDA_REGRESO, REGALOS_DE_REGRESO, REGRESO_CADA, REGRESO_VALIDO, diasEntre, esVuelta, puedeRecibir, regaloDeRegreso, semillaDeRegreso, yaRecibido,
} from "./regreso";
import { ARTICULOS, articulo, ofertasDelDia } from "./mercado";
import { diaEnJerusalen, mediodiaDe } from "./anio";

test("los días entre dos fechas", () => {
  assert.equal(diasEntre("2026-11-09", "2026-11-11"), 2);
  assert.equal(diasEntre("2026-11-11", "2026-11-11"), 0);
  assert.equal(diasEntre("2026-12-30", "2027-01-02"), 3);
  // el cambio de hora de Texas (1 de noviembre) no corre los días
  assert.equal(diasEntre("2026-10-31", "2026-11-02"), 2);
  assert.equal(diasEntre("2027-03-13", "2027-03-15"), 2);
});

test("una vuelta es de dos días o más", () => {
  assert.equal(esVuelta(null, "2026-11-11"), false);
  assert.equal(esVuelta("2026-11-11", "2026-11-11"), false);
  assert.equal(esVuelta("2026-11-10", "2026-11-11"), false, "ayer no es irse");
  assert.equal(esVuelta("2026-11-09", "2026-11-11"), true);
});

test("el regalo crece con los días fuera, pero poco", () => {
  assert.equal(regaloDeRegreso(1), null);
  assert.deepEqual(regaloDeRegreso(2), { gozo: 10, semillas: 2 });
  assert.deepEqual(regaloDeRegreso(3), { gozo: 10, semillas: 2 });
  assert.deepEqual(regaloDeRegreso(4), { gozo: 20, semillas: 3 });
  assert.deepEqual(regaloDeRegreso(6), { gozo: 20, semillas: 3 });
  assert.deepEqual(regaloDeRegreso(7), { gozo: 35, semillas: 4 });
  assert.deepEqual(regaloDeRegreso(13), { gozo: 35, semillas: 4 });
  assert.deepEqual(regaloDeRegreso(14), { gozo: 50, semillas: 5 });
  assert.deepEqual(regaloDeRegreso(400), { gozo: 50, semillas: 5 });
  assert.equal(regaloDeRegreso(Number.NaN), null);
  // irse no conviene: el regalo de una semana fuera es menos que una semana de racha (2 + 4 + … + 14 = 56)
  assert.ok(REGALOS_DE_REGRESO.every((r) => r.gozo <= 50));
  assert.ok(REGALOS_DE_REGRESO[1].gozo < 56);
});

test("las semillas son las de la estación (o cebada, la más rápida)", () => {
  assert.equal(semillaDeRegreso("trigo"), "trigo");
  assert.equal(semillaDeRegreso("olivo"), "olivo");
  assert.equal(semillaDeRegreso(null), "cebada");
  // hoy es invierno (sin cultivo propio): cebada; en la siega del trigo, trigo
  assert.equal(semillaDeRegreso(diaEnJerusalen(mediodiaDe("2026-11-11")).estacion.cultivo), "cebada");
  assert.equal(semillaDeRegreso(diaEnJerusalen(mediodiaDe("2027-05-20")).estacion.cultivo), "trigo");
});

test("cuándo se puede recibir", () => {
  const f = (vuelta: string | null, ausencia: number | null, reclamado: string | null = null) => ({ vuelta, ausencia, reclamado });
  // el día que vuelve y hasta 3 días después
  assert.equal(puedeRecibir(f("2026-11-11", 3), "2026-11-11"), true);
  assert.equal(puedeRecibir(f("2026-11-11", 3), "2026-11-14"), true);
  assert.equal(puedeRecibir(f("2026-11-11", 3), "2026-11-15"), false, `vence a los ${REGRESO_VALIDO} días`);
  assert.equal(puedeRecibir(f("2026-11-11", 3), "2026-11-10"), false);
  // sin vuelta o con una ausencia corta, no hay regalo
  assert.equal(puedeRecibir(f(null, null), "2026-11-11"), false);
  assert.equal(puedeRecibir(f("2026-11-11", 1), "2026-11-11"), false);
  // una vez por vuelta
  assert.equal(puedeRecibir(f("2026-11-11", 3, "2026-11-11"), "2026-11-11"), false);
  assert.equal(yaRecibido(f("2026-11-11", 3, "2026-11-12")), true);
  // como mucho uno cada 7 días (de la vuelta del último regalo a esta)
  assert.equal(puedeRecibir(f("2026-11-15", 2, "2026-11-11"), "2026-11-15"), false, `uno cada ${REGRESO_CADA} días`);
  assert.equal(puedeRecibir(f("2026-11-18", 3, "2026-11-11"), "2026-11-18"), true);
  assert.equal(yaRecibido(f("2026-11-18", 3, "2026-11-11")), false);
});

test("el mejor vestido no se vende", () => {
  const a = articulo(PRENDA_REGRESO.id);
  assert.ok(a, "está en el mercado como exclusivo");
  assert.equal(a!.exclusivo, "regreso");
  assert.equal(a!.categoria, "ropa");
  assert.ok(/^manto-/.test(a!.id) && /^#[0-9a-f]{6}$/i.test(a!.color ?? ""));
  assert.equal(ARTICULOS.filter((x) => x.id === PRENDA_REGRESO.id).length, 1);
  // nunca sale en las ofertas del día
  for (const d of ["2026-11-11", "2026-12-25", "2027-04-21"]) assert.ok(!ofertasDelDia(d).includes(PRENDA_REGRESO.id), d);
});
