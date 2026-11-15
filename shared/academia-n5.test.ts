// Pruebas del Nivel 5 · Liderazgo y docencia: npx tsx --test shared/academia-n5.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { EXAMEN_FINAL, NIVELES, PESOS_NIVEL, examenDe, materiaPorId, miniPruebasDe, requisitosMateria, tieneEscritoBreve } from "./academia";

const nivel5 = NIVELES.find((n) => n.n === 5)!;

test("«Didáctica: cómo enseñar» abre el Nivel 5 con la medida de los Niveles 3 y 4 y Esdras 7:10 de memoria", () => {
  const m = materiaPorId("n5-didactica")!;
  assert.equal(m.disponible, true);
  assert.equal(m.nivel, 5);
  assert.equal(m.orden, 3);
  assert.equal(m.memoria, "Esdras 7:10");
  assert.equal(m.lecciones.length, 6);
  assert.ok(m.lecciones.every((l) => l.minutos === 10));
  assert.equal(m.silabo!.objetivos.length, 7);
  assert.deepEqual(m.silabo!.bibliografia.basica.map((b) => b.autor), ["Howard G. Hendricks", "John Milton Gregory"]);
  // la misma medida que los Niveles 3 y 4: 20 de 60, una corta y un escrito breve, mini pruebas y escrito de la materia
  assert.deepEqual(examenDe(m), EXAMEN_FINAL[5]);
  assert.deepEqual(EXAMEN_FINAL[5], EXAMEN_FINAL[4]);
  assert.deepEqual(miniPruebasDe(m), [{ n: 1, lecciones: [1, 2, 3] }, { n: 2, lecciones: [4, 5, 6] }]);
  assert.equal(tieneEscritoBreve(m), true);
  assert.deepEqual(PESOS_NIVEL[5], PESOS_NIVEL[4]);
  assert.match(m.lecciones[5].titulo, /Acompañar/);
});

test("«Liderazgo II: formar líderes y equipos» enseña a multiplicar con 2 Timoteo 2:2 y deja los cargos a la declaración de fe", () => {
  const m = materiaPorId("n5-liderazgo-2")!;
  assert.equal(m.disponible, true);
  assert.equal(m.orden, 4);
  assert.equal(m.memoria, "2 Timoteo 2:2");
  assert.equal(m.lecciones.length, 6);
  assert.ok(m.lecciones.every((l) => l.minutos === 10));
  assert.deepEqual(examenDe(m), EXAMEN_FINAL[5]);
  assert.match(m.lecciones[2].titulo, /Delegar/);
  assert.match(m.lecciones[4].titulo, /conflictos/);
  assert.match(m.silabo!.proposito, /declaración de fe por confirmar/);
  assert.deepEqual(m.silabo!.bibliografia.basica.map((b) => b.editorial), ["CLIE", "Grupo Nelson"]);
});

test("«Griego y hebreo bíblicos para el estudio» va de los idiomas a los errores comunes, con Mateo 5:18 de memoria", () => {
  const m = materiaPorId("n5-idiomas")!;
  assert.equal(m.disponible, true);
  assert.equal(m.orden, 5);
  assert.equal(m.memoria, "Mateo 5:18");
  assert.equal(m.lecciones.length, 6);
  assert.ok(m.lecciones.every((l) => l.minutos === 10));
  assert.deepEqual(examenDe(m), EXAMEN_FINAL[5]);
  assert.match(m.lecciones[3].titulo, /herramientas/);
  assert.match(m.lecciones[5].titulo, /Errores/);
  assert.deepEqual(m.silabo!.bibliografia.complementaria.map((b) => b.autor), ["James Strong", "Francisco Lacueva", "Ricardo Cerni"]);
});

test("las materias del Nivel 5 piden el Nivel 4 completo", () => {
  for (const id of ["n5-didactica", "n5-liderazgo-2", "n5-idiomas"]) {
    const m = materiaPorId(id)!;
    assert.deepEqual(requisitosMateria(m, [1, 2, 3]), ["completar el Nivel 4 · Teología ministerial"], id);
    assert.deepEqual(requisitosMateria(m, [1, 2, 3, 4]), [], id);
  }
});

test("el Nivel 5 conserva su orden; las otras cinco materias siguen en preparación", () => {
  assert.equal(nivel5.materias.length, 8);
  assert.deepEqual(nivel5.materias.map((m) => m.orden), [1, 2, 3, 4, 5, 6, 7, 8]);
  assert.deepEqual(
    nivel5.materias.filter((m) => !m.disponible).map((m) => m.id),
    ["n5-teologia-pastoral", "n5-administracion", "n5-exegesis", "n5-avivamiento", "n5-seminario"],
  );
  for (const m of nivel5.materias.filter((x) => !x.disponible)) assert.equal(m.lecciones.length, 0, `${m.id} sin lecciones todavía`);
});
