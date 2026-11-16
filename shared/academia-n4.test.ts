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

test("«Homilética II: predicación expositiva» prepara el sermón con rúbrica, con 1 Corintios 2:2 de memoria", () => {
  const m = materiaPorId("n4-homiletica-2")!;
  assert.equal(m.disponible, true);
  assert.equal(m.orden, 7);
  assert.equal(m.memoria, "1 Corintios 2:2");
  assert.equal(m.lecciones.length, 6);
  assert.ok(m.lecciones.every((l) => l.minutos === 10));
  assert.deepEqual(examenDe(m), EXAMEN_FINAL[4]);
  assert.match(m.lecciones[5].titulo, /rúbrica/);
  assert.deepEqual(m.silabo!.bibliografia.basica.map((b) => b.autor), ["Haddon W. Robinson", "Gordon D. Fee y Douglas Stuart"]);
  assert.match(m.silabo!.dimensiones.hacer, /20 a 30 minutos/);
});

test("«Historia de la iglesia II» va de la Reforma a América Latina, con Romanos 1:17 de memoria", () => {
  const m = materiaPorId("n4-historia-2")!;
  assert.equal(m.disponible, true);
  assert.equal(m.orden, 8);
  assert.equal(m.memoria, "Romanos 1:17");
  assert.equal(m.lecciones.length, 6);
  assert.deepEqual(examenDe(m), EXAMEN_FINAL[4]);
  assert.match(m.lecciones[0].titulo, /Lutero/);
  assert.match(m.lecciones[4].titulo, /pentecostal/);
  assert.match(m.lecciones[5].titulo, /América Latina/);
  assert.deepEqual(m.silabo!.bibliografia.basica.map((b) => b.editorial), ["Unilit", "Mundo Hispano"]);
});

test("«Ética cristiana y ministerial» cierra el Nivel 4 con Romanos 12:2 de memoria y deja los cargos a la declaración de fe", () => {
  const m = materiaPorId("n4-etica")!;
  assert.equal(m.disponible, true);
  assert.equal(m.orden, 10);
  assert.equal(m.memoria, "Romanos 12:2");
  assert.equal(m.lecciones.length, 6);
  assert.deepEqual(examenDe(m), EXAMEN_FINAL[4]);
  assert.match(m.lecciones[5].titulo, /ministro/);
  assert.match(m.silabo!.proposito, /declaración de fe por confirmar/);
});

test("las materias del Nivel 4 piden el Nivel 3 completo", () => {
  const m = materiaPorId("n4-sistematica-1")!;
  assert.deepEqual(requisitosMateria(m, [1, 2]), ["completar el Nivel 3 · Formación de obreros"]);
  assert.deepEqual(requisitosMateria(m, [1, 2, 3]), []);
});

test("el Nivel 4 conserva su orden, y sus materias salen con los puntos de la declaración de fe por confirmar", () => {
  assert.equal(nivel4.materias.length, 10);
  assert.deepEqual(nivel4.materias.map((m) => m.orden), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  assert.deepEqual(
    nivel4.materias.filter((m) => !m.disponible).map((m) => m.id),
    [],
    "el Nivel 4 está completo",
  );
  const ea = materiaPorId("n4-epistolas-apocalipsis")!;
  assert.equal(ea.memoria, "Hebreos 1:1-2");
  assert.equal(ea.lecciones.length, 6);
  assert.equal(ea.silabo!.objetivos.length, 7);
  assert.match(ea.silabo!.proposito, /declaración de fe por confirmar/);
  const s4 = materiaPorId("n4-sistematica-4")!;
  assert.ok(s4.disponible);
  assert.equal(s4.memoria, "Tito 2:13");
  assert.equal(s4.lecciones.length, 6);
  assert.equal(s4.silabo!.objetivos.length, 7);
  assert.match(s4.silabo!.proposito, /declaración de fe por confirmar/);
  const s3 = materiaPorId("n4-sistematica-3")!;
  assert.ok(s3.disponible);
  assert.equal(s3.memoria, "Romanos 5:1");
  assert.equal(s3.lecciones.length, 6);
  assert.equal(s3.silabo!.objetivos.length, 7);
  assert.match(s3.silabo!.proposito, /declaración de fe por confirmar/);
  const s2 = materiaPorId("n4-sistematica-2")!;
  assert.ok(s2.disponible);
  assert.equal(s2.memoria, "Colosenses 2:9");
  assert.equal(s2.lecciones.length, 6);
  assert.equal(s2.silabo!.objetivos.length, 7);
  assert.match(s2.silabo!.proposito, /declaración de fe por confirmar/);
  for (const m of nivel4.materias.filter((x) => !x.disponible)) assert.equal(m.lecciones.length, 0, `${m.id} sin lecciones todavía`);
});
