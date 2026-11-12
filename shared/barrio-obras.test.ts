// La fase 2 de la economía (mi barrio): las obras del barrio, los regalos, el banquete y las parcelas compartidas.
import { test } from "node:test";
import assert from "node:assert/strict";
import { APORTE_MAXIMO_DIA, OBRAS_BARRIO, obraBarrioActual, ventajasDelBarrio } from "./barrio-obras";
import { CATEGORIAS_REGALO, FRASES_REGALO, REGALOS_A_LA_MISMA, REGALOS_POR_DIA } from "./regalos";
import { BANQUETE } from "./banquete";
import { PARCELAS, parcelaDe } from "./parcelas";
import { AREAS, CASAS_POR_BARRIO } from "./ciudad";
import { estrellasDeCasa } from "./obras";

test("las obras del barrio: en orden, metas que suben y una a la vez", () => {
  assert.deepEqual(OBRAS_BARRIO.map((o) => o.id), ["pozo", "bancos", "horno", "arboles", "granero", "placa"]);
  for (let i = 1; i < OBRAS_BARRIO.length; i++) assert.ok(OBRAS_BARRIO[i].meta > OBRAS_BARRIO[i - 1].meta);
  const total = OBRAS_BARRIO.reduce((a, o) => a + o.meta, 0);
  assert.equal(total, 35000);
  assert.equal(obraBarrioActual([])?.id, "pozo");
  assert.equal(obraBarrioActual(["pozo"])?.id, "bancos");
  assert.equal(obraBarrioActual(OBRAS_BARRIO.map((o) => o.id)), null);
  // nadie la termina solo en un día: la primera pide al menos dos días de uno solo
  assert.ok(OBRAS_BARRIO[0].meta > APORTE_MAXIMO_DIA);
});

test("lo que dan las obras del barrio a todas sus casas", () => {
  assert.deepEqual(ventajasDelBarrio([]), { ritmo: 1, cupoReunion: 10, horno: 1, estrellas: 0, alfoli: 0 });
  const v = ventajasDelBarrio(OBRAS_BARRIO.map((o) => o.id));
  assert.deepEqual(v, { ritmo: 0.9, cupoReunion: 15, horno: 0.5, estrellas: 15, alfoli: 20 });
  // las estrellas: los puntos del barrio se suman a los de la casa
  const sin = estrellasDeCasa({ nivel: 1, obras: [], adornos: [], letrero: false, muebles: [] });
  const con = estrellasDeCasa({ nivel: 1, obras: [], adornos: [], letrero: false, muebles: [], barrio: v.estrellas });
  assert.equal(con.puntos - sin.puntos, 15);
  assert.ok(con.partes.some((p) => p.texto === "Las obras del barrio" && p.puntos === 15));
});

test("los regalos y el banquete: límites que no se pueden aprovechar", () => {
  assert.ok(FRASES_REGALO.length >= 6 && FRASES_REGALO.every((f) => f.length <= 40));
  assert.ok(REGALOS_A_LA_MISMA < REGALOS_POR_DIA);
  assert.deepEqual([...CATEGORIAS_REGALO].sort(), ["adorno", "mueble", "ropa", "semilla"]);
  // el banquete cuesta más gozo del que reparte aunque la mesa se llene
  assert.ok(BANQUETE.gozo > BANQUETE.gozoInvitado * BANQUETE.maxInvitados);
});

test("las parcelas compartidas: 40 por área, numeradas desde la entrada, con su umbral delante de la puerta", () => {
  assert.equal(PARCELAS.length, AREAS);
  for (const area of PARCELAS) {
    assert.equal(area.length, CASAS_POR_BARRIO);
    assert.deepEqual(area.map((p) => p.n), [...Array(CASAS_POR_BARRIO).keys()]);
    for (const p of area) {
      assert.equal(p.umbral[0], p.x);
      assert.ok(Math.abs(p.umbral[1] - (p.z + p.dir * 2.35)) < 1e-9);
      const [x0, z0, x1, z1] = p.rect;
      assert.ok(p.x > x0 && p.x < x1 && p.z > z0 && p.z < z1);
    }
  }
  // el barrio 5 está en la misma área que el 1 (los barrios se repiten por área)
  assert.deepEqual(parcelaDe(5, 3), parcelaDe(1, 3));
});
