// Pruebas del Nivel 2: las mini pruebas, el escrito breve y la nota de la materia. npx tsx --test shared/academia-n2.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  ESCRITA, ESCRITO_BREVE, MEDIDA_MINI, MINI_PRUEBA, NIVELES, PESOS_NIVEL, materiaAprobada, materiaPorId, miniPruebasDe, notaMateria, pesosDe,
  tieneEscritoBreve, EXAMEN_FINAL, EXAMEN_INTEGRAL, parteEscrita, minutosDe,
} from "./academia";

const panorama = materiaPorId("n2-panorama-at")!;
const salvacion = materiaPorId("n1-salvacion")!;

test("la primera materia del Nivel 2 está publicada, con 6 lecciones, su versículo y su sílabo", () => {
  assert.ok(panorama.disponible);
  assert.equal(panorama.nivel, 2);
  assert.equal(panorama.lecciones.length, 6);
  assert.equal(panorama.memoria, "Romanos 15:4");
  assert.equal(panorama.silabo?.objetivos.length, 5);
  const n2 = NIVELES.find((n) => n.n === 2)!;
  assert.equal(n2.materias[0].id, "n2-panorama-at");
  assert.deepEqual(n2.materias.filter((m) => m.disponible).map((m) => m.id), ["n2-panorama-at", "n2-panorama-nt", "n2-disciplinas", "n2-sermon-monte", "n2-mayordomia", "n2-familia", "n2-evangelismo-personal", "n2-dones"], "solo Doctrinas fundamentales sigue en preparación");
});

test("la segunda materia del Nivel 2, «Panorama del Nuevo Testamento», está publicada con su sílabo", () => {
  const nt = materiaPorId("n2-panorama-nt")!;
  assert.ok(nt.disponible);
  assert.equal(nt.nivel, 2);
  assert.equal(nt.orden, 2);
  assert.equal(nt.lecciones.length, 6);
  assert.equal(nt.memoria, "Juan 20:31");
  assert.equal(nt.silabo?.objetivos.length, 5);
  assert.ok(nt.silabo?.bibliografia.basica.some((b) => b.autor === "Merrill C. Tenney"));
  assert.deepEqual(miniPruebasDe(nt), [{ n: 1, lecciones: [1, 2, 3] }, { n: 2, lecciones: [4, 5, 6] }]);
  assert.ok(tieneEscritoBreve(nt));
});

test("la cuarta materia del Nivel 2, «Disciplinas espirituales», está publicada con su sílabo", () => {
  const d = materiaPorId("n2-disciplinas")!;
  assert.ok(d.disponible);
  assert.equal(d.nivel, 2);
  assert.equal(d.orden, 4);
  assert.equal(d.lecciones.length, 6);
  assert.equal(d.memoria, "1 Timoteo 4:8");
  assert.equal(d.silabo?.objetivos.length, 5);
  assert.ok(d.silabo?.bibliografia.basica.some((b) => b.autor === "Donald S. Whitney"));
  assert.ok(d.silabo?.bibliografia.complementaria.find((b) => b.autor === "Richard J. Foster")?.nota, "Foster lleva su nota de discernimiento");
  assert.deepEqual(miniPruebasDe(d), [{ n: 1, lecciones: [1, 2, 3] }, { n: 2, lecciones: [4, 5, 6] }]);
  assert.ok(tieneEscritoBreve(d));
  const n2 = NIVELES.find((n) => n.n === 2)!;
  assert.equal(n2.materias.findIndex((m) => m.id === "n2-disciplinas"), 3, "va en el cuarto lugar, después de Doctrinas fundamentales");
});

test("la quinta materia del Nivel 2, «El Sermón del monte», está publicada con su sílabo", () => {
  const s = materiaPorId("n2-sermon-monte")!;
  assert.ok(s.disponible);
  assert.equal(s.nivel, 2);
  assert.equal(s.orden, 5);
  assert.equal(s.lecciones.length, 6);
  assert.equal(s.memoria, "Mateo 6:33");
  assert.equal(s.silabo?.objetivos.length, 5);
  assert.ok(s.silabo?.bibliografia.basica.some((b) => b.autor === "John R. W. Stott"));
  assert.deepEqual(miniPruebasDe(s), [{ n: 1, lecciones: [1, 2, 3] }, { n: 2, lecciones: [4, 5, 6] }]);
  assert.ok(tieneEscritoBreve(s));
  const n2 = NIVELES.find((n) => n.n === 2)!;
  assert.equal(n2.materias.findIndex((m) => m.id === "n2-sermon-monte"), 4, "va en el quinto lugar");
});

test("la sexta materia del Nivel 2, «Mayordomía cristiana», está publicada con su sílabo", () => {
  const m = materiaPorId("n2-mayordomia")!;
  assert.ok(m.disponible);
  assert.equal(m.nivel, 2);
  assert.equal(m.orden, 6);
  assert.equal(m.lecciones.length, 6);
  assert.equal(m.memoria, "1 Corintios 4:2");
  assert.equal(m.silabo?.objetivos.length, 5);
  assert.ok(m.silabo?.bibliografia.basica.some((b) => b.autor === "Andrés Panasiuk"));
  assert.deepEqual(miniPruebasDe(m), [{ n: 1, lecciones: [1, 2, 3] }, { n: 2, lecciones: [4, 5, 6] }]);
  assert.ok(tieneEscritoBreve(m));
  const n2 = NIVELES.find((n) => n.n === 2)!;
  assert.equal(n2.materias.findIndex((x) => x.id === "n2-mayordomia"), 5, "va en el sexto lugar");
});

test("la octava materia del Nivel 2, «Evangelismo personal», está publicada y dice de qué cursos viene", () => {
  const e = materiaPorId("n2-evangelismo-personal")!;
  assert.ok(e.disponible);
  assert.equal(e.nivel, 2);
  assert.equal(e.orden, 8);
  assert.equal(e.antes, "Evangelismo 1 y 2");
  assert.equal(e.lecciones.length, 6);
  assert.equal(e.memoria, "Romanos 1:16");
  assert.equal(e.silabo?.objetivos.length, 5);
  assert.ok(e.silabo?.bibliografia.basica.some((b) => b.autor === "Robert E. Coleman"));
  assert.deepEqual(miniPruebasDe(e), [{ n: 1, lecciones: [1, 2, 3] }, { n: 2, lecciones: [4, 5, 6] }]);
  assert.ok(tieneEscritoBreve(e));
  const n2 = NIVELES.find((n) => n.n === 2)!;
  assert.equal(n2.materias.findIndex((x) => x.id === "n2-evangelismo-personal"), 7, "va en el octavo lugar");
});

test("«Familia y relaciones» y «Dones espirituales y servicio» están publicadas con su sílabo", () => {
  const f = materiaPorId("n2-familia")!;
  assert.ok(f.disponible);
  assert.equal(f.orden, 7);
  assert.equal(f.memoria, "Salmos 127:1");
  assert.equal(f.lecciones.length, 6);
  assert.ok(f.silabo?.bibliografia.basica.some((b) => b.autor === "Emerson Eggerichs"));
  const d = materiaPorId("n2-dones")!;
  assert.ok(d.disponible);
  assert.equal(d.orden, 9);
  assert.equal(d.memoria, "1 Corintios 12:7");
  assert.equal(d.lecciones.length, 6);
  assert.ok(d.silabo?.bibliografia.basica.some((b) => b.autor === "Stanley M. Horton"));
  for (const m of [f, d]) {
    assert.equal(m.silabo?.objetivos.length, 5);
    assert.deepEqual(miniPruebasDe(m), [{ n: 1, lecciones: [1, 2, 3] }, { n: 2, lecciones: [4, 5, 6] }]);
    assert.ok(tieneEscritoBreve(m));
  }
  const n2 = NIVELES.find((n) => n.n === 2)!;
  assert.deepEqual(n2.materias.filter((m) => !m.disponible).map((m) => m.id), ["n2-doctrinas"], "solo falta Doctrinas, que espera la declaración de fe");
});

test("las mini pruebas: una cada 3 lecciones en el Nivel 2, ninguna en el Nivel 1", () => {
  assert.deepEqual(miniPruebasDe(panorama), [{ n: 1, lecciones: [1, 2, 3] }, { n: 2, lecciones: [4, 5, 6] }]);
  assert.deepEqual(miniPruebasDe(salvacion), []);
  assert.equal(MINI_PRUEBA.intentos, 3);
  assert.deepEqual(
    { objetivas: MEDIDA_MINI.objetivas, banco: MEDIDA_MINI.banco, escritas: MEDIDA_MINI.escritas, segundos: MEDIDA_MINI.segundos, peso: MEDIDA_MINI.pesoObjetiva },
    { objetivas: 6, banco: 18, escritas: 0, segundos: 45, peso: 100 },
  );
});

test("el escrito breve: de 80 a 300 palabras, 2 entregas, desde el Nivel 2", () => {
  assert.ok(tieneEscritoBreve(panorama));
  assert.ok(!tieneEscritoBreve(salvacion));
  assert.deepEqual(ESCRITA.breve, { min: 80, max: 300 });
  assert.equal(ESCRITO_BREVE.entregas, 2);
});

test("la nota del Nivel 2: final 50 %, mini pruebas 25 %, escrito breve 15 % y versículo 10 %", () => {
  assert.deepEqual(pesosDe(panorama), PESOS_NIVEL[2]);
  assert.equal(notaMateria(pesosDe(panorama), { final: 80, versiculo: 100, mini: 90, escritos: 70 }), 83);
  // sin mini pruebas ni escrito no alcanza: con 100 en el final y en el versículo llega a 60
  assert.equal(notaMateria(pesosDe(panorama), { final: 100, versiculo: 100 }), 60);
  assert.ok(!materiaAprobada(60, 100));
  // y el final sigue siendo necesario aunque lo demás sea perfecto
  assert.ok(!materiaAprobada(notaMateria(pesosDe(panorama), { final: 60, versiculo: 100, mini: 100, escritos: 100 }), 60));
});

test("la parte escrita del final: Niveles 1 y 2 con cortas; Niveles 3 a 5 con una corta y un escrito breve", () => {
  assert.equal(parteEscrita(EXAMEN_FINAL[1]), "una respuesta escrita (6 minutos)");
  assert.equal(parteEscrita(EXAMEN_FINAL[2]), "2 respuestas escritas (6 minutos cada una)");
  for (const n of [3, 4, 5] as const) {
    assert.equal(parteEscrita(EXAMEN_FINAL[n]), "una respuesta corta (6 minutos) y un escrito breve de 80 a 300 palabras (15 minutos)");
    assert.equal(minutosDe(EXAMEN_FINAL[n], "breve"), 15);
    assert.equal(minutosDe(EXAMEN_FINAL[n], "corta"), 6);
    assert.equal(EXAMEN_INTEGRAL[n].breves ?? 0, 0, "el integral solo trae respuestas cortas");
  }
});
