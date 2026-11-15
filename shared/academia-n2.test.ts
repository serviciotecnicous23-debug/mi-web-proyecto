// Pruebas del Nivel 2: las mini pruebas, el escrito breve y la nota de la materia. npx tsx --test shared/academia-n2.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  ESCRITA, ESCRITO_BREVE, MEDIDA_MINI, MINI_PRUEBA, NIVELES, PESOS_NIVEL, materiaAprobada, materiaPorId, miniPruebasDe, notaMateria, pesosDe,
  tieneEscritoBreve,
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
  assert.deepEqual(n2.materias.filter((m) => m.disponible).map((m) => m.id), ["n2-panorama-at", "n2-panorama-nt", "n2-disciplinas"], "las demás siguen en preparación");
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
