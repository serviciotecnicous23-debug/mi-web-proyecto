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

test("Evangelismo y misiones tiene sus cinco materias, con la medida del Nivel 3", () => {
  const materias = evangelismo.materias;
  assert.deepEqual(
    materias.map((m) => [m.titulo, m.memoria, m.lecciones.length, m.disponible, !!m.avanzada]),
    [
      ["Evangelismo personal avanzado", "Proverbios 11:30", 6, true, false],
      ["Campañas y cruzadas", "2 Timoteo 4:5", 6, true, false],
      ["Teología bíblica de las misiones", "Juan 20:21", 6, true, true],
      ["Misión transcultural", "Hechos 10:34-35", 6, true, true],
      ["Plantación de iglesias", "Mateo 16:18", 6, true, true],
    ],
  );
  for (const m of materias) {
    assert.ok(m.lecciones.every((l) => l.minutos === 10), m.id);
    assert.equal(m.silabo!.objetivos.length, 7, m.id);
    assert.deepEqual(examenDe(m), EXAMEN_FINAL[3], m.id);
    assert.deepEqual(pesosDe(m), PESOS_NIVEL[3], m.id);
    assert.deepEqual(miniPruebasDe(m), [{ n: 1, lecciones: [1, 2, 3] }, { n: 2, lecciones: [4, 5, 6] }], m.id);
    assert.equal(tieneEscritoBreve(m), true, m.id);
  }
  assert.equal(materias[0].antes, "Evangelismo 3");
  // la escatología y los cargos quedan para la declaración de fe
  assert.match(materias[2].silabo!.proposito, /declaración de fe por confirmar/);
  assert.match(materias[4].silabo!.proposito, /declaración de fe por confirmar/);
});

test("las materias de especialidad piden el Nivel 2, y las avanzadas, el Nivel 3", () => {
  const personal = materiaPorId("evangelismo-misiones-1")!;
  const misiones = materiaPorId("evangelismo-misiones-3")!;
  assert.deepEqual(requisitosMateria(personal, [1]), ["completar el Nivel 2 · Discipulado"]);
  assert.deepEqual(requisitosMateria(personal, [1, 2]), []);
  assert.deepEqual(requisitosMateria(misiones, [1, 2]), ["completar el Nivel 3 · Formación de obreros"]);
  assert.deepEqual(requisitosMateria(misiones, [1, 2, 3]), []);
  for (const id of ["evangelismo-misiones-4", "evangelismo-misiones-5"]) {
    assert.deepEqual(requisitosMateria(materiaPorId(id)!, [1, 2]), ["completar el Nivel 3 · Formación de obreros"], id);
  }
});

test("las otras once especialidades siguen en preparación", () => {
  for (const e of ESPECIALIDADES.filter((x) => x.id !== "evangelismo-misiones")) {
    for (const m of e.materias) {
      assert.equal(m.disponible, false, m.id);
      assert.equal(m.lecciones.length, 0, m.id);
    }
  }
});
