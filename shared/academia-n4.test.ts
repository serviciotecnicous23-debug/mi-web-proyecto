// Pruebas del Nivel 4 · Teología ministerial: npx tsx --test shared/academia-n4.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { EXAMEN_FINAL, NIVELES, PESOS_NIVEL, examenDe, materiaPorId, miniPruebasDe, requisitosMateria, tieneEscritoBreve } from "./academia";

const nivel4 = NIVELES.find((n) => n.n === 4)!;

test("«Teología sistemática I: la Biblia y Dios» abre el Nivel 4 con la medida del nivel y 2 Timoteo 3:16 de memoria", () => {
  const m = materiaPorId("n4-sistematica-1")!;
  assert.equal(m.disponible, true);
  assert.equal(m.nivel, 4);
  assert.equal(m.orden, 1);
  assert.equal(m.memoria, "2 Timoteo 3:16");
  assert.equal(m.lecciones.length, 6);
  assert.ok(m.lecciones.every((l) => l.minutos === 10));
  assert.equal(m.silabo!.objetivos.length, 7);
  assert.deepEqual(m.silabo!.bibliografia.basica.map((b) => b.editorial), ["Vida", "Foursquare Media"]);
  // la misma medida que el Nivel 3: 20 de 60, una corta y un escrito breve, mini pruebas y escrito de la materia
  assert.deepEqual(examenDe(m), EXAMEN_FINAL[3]);
  assert.deepEqual(miniPruebasDe(m), [{ n: 1, lecciones: [1, 2, 3] }, { n: 2, lecciones: [4, 5, 6] }]);
  assert.equal(tieneEscritoBreve(m), true);
  assert.deepEqual(PESOS_NIVEL[4], PESOS_NIVEL[3]);
});

test("«Libros poéticos y proféticos» va de Job a Malaquías, con Miqueas 6:8 de memoria", () => {
  const m = materiaPorId("n4-poeticos-profeticos")!;
  assert.equal(m.disponible, true);
  assert.equal(m.orden, 5);
  assert.equal(m.memoria, "Miqueas 6:8");
  assert.equal(m.lecciones.length, 6);
  assert.ok(m.lecciones.every((l) => l.minutos === 10));
  assert.deepEqual(examenDe(m), EXAMEN_FINAL[4]);
  assert.match(m.lecciones[5].titulo, /Mesías/);
  // el milenio y el rapto no se deciden aquí
  assert.match(m.silabo!.proposito, /Teología sistemática IV/);
});

test("«Apologética» da razones de la fe con 1 Pedro 3:15 de memoria", () => {
  const m = materiaPorId("n4-apologetica")!;
  assert.equal(m.disponible, true);
  assert.equal(m.orden, 9);
  assert.equal(m.memoria, "1 Pedro 3:15");
  assert.equal(m.lecciones.length, 6);
  assert.deepEqual(examenDe(m), EXAMEN_FINAL[4]);
  assert.match(m.lecciones[3].titulo, /Resucitó/);
  assert.deepEqual(m.silabo!.bibliografia.basica.map((b) => b.autor), ["Lee Strobel", "Pablo Hoff"]);
});

test("las materias del Nivel 4 piden el Nivel 3 completo", () => {
  const m = materiaPorId("n4-sistematica-1")!;
  assert.deepEqual(requisitosMateria(m, [1, 2]), ["completar el Nivel 3 · Formación de obreros"]);
  assert.deepEqual(requisitosMateria(m, [1, 2, 3]), []);
});

test("el Nivel 4 conserva su orden; las sistemáticas II a IV y Epístolas y Apocalipsis esperan la declaración de fe", () => {
  assert.equal(nivel4.materias.length, 10);
  assert.deepEqual(nivel4.materias.map((m) => m.orden), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  for (const id of ["n4-sistematica-2", "n4-sistematica-3", "n4-sistematica-4", "n4-epistolas-apocalipsis"]) {
    assert.equal(materiaPorId(id)!.disponible, false, `${id} espera la declaración de fe`);
  }
  for (const m of nivel4.materias.filter((x) => !x.disponible)) assert.equal(m.lecciones.length, 0, `${m.id} sin lecciones todavía`);
});
