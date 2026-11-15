// Pruebas del orden de las fichas del versículo de memoria: npx tsx --test server/academia-fichas.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { fichasDe, revisarOrdenFichas } from "./academia-comun";

// Juan 4:23-24 como lo arma la academia (con el número de cada versículo): «en espíritu y» sale dos veces
const JUAN_4_23_24 =
  "23 Mas la hora viene, y ahora es, cuando los verdaderos adoradores adorarán al Padre en espíritu y en verdad; porque también el Padre tales adoradores busca que le adoren. 24 Dios es Espíritu; y los que le adoran, en espíritu y en verdad es necesario que adoren.";

test("las fichas repetidas valen en cualquiera de sus lugares, y cada ficha se usa una sola vez", () => {
  const fichas = fichasDe(JUAN_4_23_24);
  const ids = fichas.map((_, i) => `f${i}`);
  const repetidas = fichas.map((f, i) => [f, i] as const).filter(([f]) => fichas.filter((x) => x === f).length > 1).map(([, i]) => i);
  assert.deepEqual(repetidas.map((i) => fichas[i]), ["en espíritu y", "en espíritu y"]);
  // el orden de siempre
  assert.deepEqual(revisarOrdenFichas(fichas, ids, ids), { hasta: fichas.length, bien: true });
  // las dos fichas iguales intercambiadas también valen (el alumno no las puede distinguir)
  const cambiado = [...ids];
  [cambiado[repetidas[0]], cambiado[repetidas[1]]] = [cambiado[repetidas[1]], cambiado[repetidas[0]]];
  assert.deepEqual(revisarOrdenFichas(fichas, ids, cambiado), { hasta: fichas.length, bien: true });
  // dos fichas distintas intercambiadas no valen, y se dice hasta dónde iba bien
  const mal = [...ids];
  [mal[1], mal[2]] = [mal[2], mal[1]];
  assert.deepEqual(revisarOrdenFichas(fichas, ids, mal), { hasta: 1, bien: false });
  // repetir la misma ficha no vale
  const doble = [...ids];
  doble[repetidas[1]] = ids[repetidas[0]];
  assert.deepEqual(revisarOrdenFichas(fichas, ids, doble), { hasta: repetidas[1], bien: false });
  // incompleto, o con fichas de más
  assert.deepEqual(revisarOrdenFichas(fichas, ids, ids.slice(0, 3)), { hasta: 3, bien: false });
  assert.equal(revisarOrdenFichas(fichas, ids, [...ids, "otra"]).bien, false);
});
