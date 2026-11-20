// Pruebas del Nivel 3 · Formación de obreros: npx tsx --test shared/academia-n3.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { EXAMEN_FINAL, NIVELES, PESOS_NIVEL, REQUISITOS_POR_HACER, entraEnDiagnostico, examenDe, materiaPorId, miniPruebasDe, notaMateria, sugerenciaDiagnostico, tieneEscritoBreve } from "./academia";

const nivel3 = NIVELES.find((n) => n.n === 3)!;

test("«Hermenéutica» abre el Nivel 3: 6 lecciones de 10 minutos, su versículo y su sílabo", () => {
  const m = materiaPorId("n3-hermeneutica")!;
  assert.equal(m.disponible, true);
  assert.equal(m.nivel, 3);
  assert.equal(m.orden, 1);
  assert.equal(m.memoria, "2 Timoteo 2:15");
  assert.equal(m.lecciones.length, 6);
  assert.ok(m.lecciones.every((l) => l.minutos === 10));
  assert.deepEqual(m.lecciones.map((l) => l.id), [1, 2, 3, 4, 5, 6].map((k) => `n3-hermeneutica-${k}`));
  assert.equal(m.silabo!.objetivos.length, 6);
  assert.ok(m.silabo!.bibliografia.basica.some((b) => b.titulo === "La lectura eficaz de la Biblia"));
  assert.equal(nivel3.materias[0].id, "n3-hermeneutica");
});

test("«Métodos de estudio bíblico» sigue a Hermenéutica con la misma medida", () => {
  const m = materiaPorId("n3-metodos-estudio")!;
  assert.equal(m.disponible, true);
  assert.equal(m.orden, 2);
  assert.equal(m.memoria, "Salmos 119:18");
  assert.equal(m.lecciones.length, 6);
  assert.ok(m.lecciones.every((l) => l.minutos === 10));
  assert.ok(m.silabo!.bibliografia.basica.some((b) => b.titulo === "Nueva concordancia Strong exhaustiva"));
  assert.deepEqual(examenDe(m), EXAMEN_FINAL[3]);
  assert.equal(miniPruebasDe(m).length, 2);
});

test("«Pentateuco y libros históricos» va de Génesis a Ester, con el Shema de memoria", () => {
  const m = materiaPorId("n3-pentateuco-historicos")!;
  assert.equal(m.disponible, true);
  assert.equal(m.orden, 3);
  assert.equal(m.memoria, "Deuteronomio 6:4-5");
  assert.equal(m.lecciones.length, 6);
  assert.equal(m.silabo!.objetivos.length, 7);
  assert.ok(m.silabo!.bibliografia.basica.every((b) => b.autor === "Pablo Hoff"));
});

test("«Los Evangelios y Hechos», «Evangelismo y consolidación» y «Liderazgo cristiano I» siguen con la misma medida", () => {
  const casos: [string, number, string][] = [
    ["n3-evangelios-hechos", 4, "Mateo 16:16"],
    ["n3-evangelismo-consolidacion", 6, "Colosenses 1:28"],
    ["n3-liderazgo-1", 7, "Marcos 10:45"],
  ];
  for (const [id, orden, memoria] of casos) {
    const m = materiaPorId(id)!;
    assert.equal(m.disponible, true, id);
    assert.equal(m.orden, orden, id);
    assert.equal(m.memoria, memoria, id);
    assert.equal(m.lecciones.length, 6, id);
    assert.ok(m.lecciones.every((l) => l.minutos === 10), id);
    assert.deepEqual(examenDe(m), EXAMEN_FINAL[3], id);
  }
  // Evangelismo y consolidación viene de «Evangelismo 2»
  assert.equal(materiaPorId("n3-evangelismo-consolidacion")!.antes, "Evangelismo 2");
  // La persona y obra del Espíritu Santo sigue la declaración de fe y deja por confirmar las lenguas como señal
  const es = materiaPorId("n3-espiritu-santo")!;
  assert.ok(es.disponible);
  assert.equal(es.memoria, "Zacarías 4:6");
  assert.equal(es.silabo!.objetivos.length, 7);
  assert.match(es.silabo!.proposito, /declaración de fe por confirmar/);
});

test("«Homilética I» prepara la enseñanza grabada del Nivel 3, con 2 Timoteo 4:2 de memoria", () => {
  const m = materiaPorId("n3-homiletica-1")!;
  assert.equal(m.disponible, true);
  assert.equal(m.orden, 8);
  assert.equal(m.memoria, "2 Timoteo 4:2");
  assert.equal(m.lecciones.length, 6);
  assert.ok(m.lecciones.every((l) => l.minutos === 10));
  assert.deepEqual(examenDe(m), EXAMEN_FINAL[3]);
  assert.equal(m.silabo!.objetivos.length, 7);
  assert.ok(m.silabo!.proposito.includes("enseñanza grabada"));
  assert.deepEqual(m.silabo!.bibliografia.basica.map((b) => b.autor), ["Haddon W. Robinson", "James D. Crane"]);
});

test("«Historia de la iglesia I» va de Pentecostés a la víspera de la Reforma, con Hebreos 13:8 de memoria", () => {
  const m = materiaPorId("n3-historia-1")!;
  assert.equal(m.disponible, true);
  assert.equal(m.orden, 9);
  assert.equal(m.memoria, "Hebreos 13:8");
  assert.equal(m.lecciones.length, 6);
  assert.ok(m.lecciones.every((l) => l.minutos === 10));
  assert.deepEqual(examenDe(m), EXAMEN_FINAL[3]);
  assert.match(m.lecciones[0].titulo, /apóstoles/);
  assert.match(m.lecciones[5].titulo, /Reforma/);
  assert.deepEqual(m.silabo!.bibliografia.basica.map((b) => b.editorial), ["Unilit", "Vida"]);
});

test("«Cuidado y consejería básica» cierra el Nivel 3 con Gálatas 6:2; solo el Espíritu Santo sigue en preparación", () => {
  const m = materiaPorId("n3-consejeria-basica")!;
  assert.equal(m.disponible, true);
  assert.equal(m.orden, 10);
  assert.equal(m.memoria, "Gálatas 6:2");
  assert.equal(m.lecciones.length, 6);
  assert.ok(m.lecciones.every((l) => l.minutos === 10));
  assert.deepEqual(examenDe(m), EXAMEN_FINAL[3]);
  assert.match(m.lecciones[4].titulo, /derivar/);
  assert.deepEqual(m.silabo!.bibliografia.basica.map((b) => b.autor), ["Gary R. Collins", "Pablo Hoff"]);
  // el Nivel 3 tiene sus diez materias publicadas
  assert.deepEqual(nivel3.materias.filter((x) => !x.disponible).map((x) => x.id), []);
});

test("las materias del Nivel 3 se evalúan como pide el reglamento", () => {
  const m = materiaPorId("n3-hermeneutica")!;
  // 2 mini pruebas (lecciones 1-3 y 4-6) y el escrito breve
  assert.deepEqual(miniPruebasDe(m), [{ n: 1, lecciones: [1, 2, 3] }, { n: 2, lecciones: [4, 5, 6] }]);
  assert.equal(tieneEscritoBreve(m), true);
  // el final: 20 preguntas de un banco de 60, una corta y un escrito breve, 60/40
  const f = examenDe(m);
  assert.deepEqual(f, EXAMEN_FINAL[3]);
  assert.equal(f.objetivas, 20);
  assert.equal(f.banco, 60);
  assert.equal(f.escritas, 2);
  assert.equal(f.breves, 1);
  assert.equal(f.pesoObjetiva, 60);
  // la nota: mini pruebas 20 %, final 40 %, escritos 30 %, versículo 10 %
  assert.deepEqual(PESOS_NIVEL[3], { final: 40, repasos: 0, versiculo: 10, mini: 20, escritos: 30 });
  assert.equal(notaMateria(PESOS_NIVEL[3], { final: 80, mini: 90, escritos: 70, versiculo: 100 }), 81);
});

test("el Nivel 3 conserva su orden y lo que falta sigue en preparación", () => {
  assert.equal(nivel3.materias.length, 10);
  assert.deepEqual(nivel3.materias.map((m) => m.orden), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  for (const m of nivel3.materias.filter((x) => !x.disponible)) assert.equal(m.lecciones.length, 0, `${m.id} sin lecciones todavía`);
});

test("la diagnóstica mide los Niveles 1 y 2; a quien ya los completó le sugiere seguir con el Nivel 3", () => {
  assert.equal(entraEnDiagnostico(materiaPorId("n1-salvacion")!), true);
  assert.equal(entraEnDiagnostico(materiaPorId("n2-panorama-at")!), true);
  assert.equal(entraEnDiagnostico(materiaPorId("n3-hermeneutica")!), false);
  const s = sugerenciaDiagnostico([], [1, 2], []);
  assert.equal(s.nivel, 3);
  assert.equal(s.empezar?.materiaId, "n3-hermeneutica");
});

test("ya no queda ningún requisito del reglamento sin registrarse: los de los Niveles 3 a 5 son actividades del nivel", () => {
  for (const n of [1, 2, 3, 4, 5] as const) {
    assert.ok(NIVELES.some((x) => x.n === n));
    assert.equal(REQUISITOS_POR_HACER[n], undefined, `Nivel ${n}`);
  }
});
