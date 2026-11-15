// Pruebas de las especialidades: npx tsx --test shared/academia-especialidades.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { ESPECIALIDADES, EXAMEN_FINAL, PESOS_NIVEL, examenDe, materiaPorId, miniPruebasDe, pesosDe, requisitosMateria, tieneEscritoBreve } from "./academia";

const evangelismo = ESPECIALIDADES.find((e) => e.id === "evangelismo-misiones")!;

test("cada materia de especialidad se llama <especialidad>-<orden>, aunque ya tenga su definición completa", () => {
  for (const e of ESPECIALIDADES) {
    e.materias.forEach((m, i) => {
      assert.equal(m.id, `${e.id}-${i + 1}`, m.id);
      assert.equal(m.orden, i + 1, m.id);
      assert.equal(m.nivel, null, m.id);
      assert.equal(m.especialidad, e.id, m.id);
    });
  }
});

test("Evangelismo y misiones abre con sus tres primeras materias, con la medida del Nivel 3", () => {
  const [personal, campanas, misiones, transcultural, plantacion] = evangelismo.materias;
  assert.deepEqual(
    [personal, campanas, misiones].map((m) => [m.titulo, m.memoria, m.lecciones.length, m.disponible]),
    [
      ["Evangelismo personal avanzado", "Proverbios 11:30", 6, true],
      ["Campañas y cruzadas", "2 Timoteo 4:5", 6, true],
      ["Teología bíblica de las misiones", "Juan 20:21", 6, true],
    ],
  );
  for (const m of [personal, campanas, misiones]) {
    assert.ok(m.lecciones.every((l) => l.minutos === 10), m.id);
    assert.equal(m.silabo!.objetivos.length, 7, m.id);
    assert.deepEqual(examenDe(m), EXAMEN_FINAL[3], m.id);
    assert.deepEqual(pesosDe(m), PESOS_NIVEL[3], m.id);
    assert.deepEqual(miniPruebasDe(m), [{ n: 1, lecciones: [1, 2, 3] }, { n: 2, lecciones: [4, 5, 6] }], m.id);
    assert.equal(tieneEscritoBreve(m), true, m.id);
  }
  assert.equal(personal.antes, "Evangelismo 3");
  assert.equal(misiones.avanzada, true);
  assert.match(misiones.silabo!.proposito, /declaración de fe por confirmar/);
  // las dos que faltan siguen en preparación, sin lecciones
  for (const m of [transcultural, plantacion]) {
    assert.equal(m.disponible, false, m.id);
    assert.equal(m.lecciones.length, 0, m.id);
    assert.equal(m.avanzada, true, m.id);
  }
});

test("las materias de especialidad piden el Nivel 2, y las avanzadas, el Nivel 3", () => {
  const personal = materiaPorId("evangelismo-misiones-1")!;
  const misiones = materiaPorId("evangelismo-misiones-3")!;
  assert.deepEqual(requisitosMateria(personal, [1]), ["completar el Nivel 2 · Discipulado"]);
  assert.deepEqual(requisitosMateria(personal, [1, 2]), []);
  assert.deepEqual(requisitosMateria(misiones, [1, 2]), ["completar el Nivel 3 · Formación de obreros"]);
  assert.deepEqual(requisitosMateria(misiones, [1, 2, 3]), []);
});

test("las otras once especialidades siguen en preparación", () => {
  for (const e of ESPECIALIDADES.filter((x) => x.id !== "evangelismo-misiones")) {
    for (const m of e.materias) {
      assert.equal(m.disponible, false, m.id);
      assert.equal(m.lecciones.length, 0, m.id);
    }
  }
});
