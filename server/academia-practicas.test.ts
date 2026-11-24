// Las prácticas de las lecciones (server/academia/practicas/): cada frase de apoyo está en su lección, cada objetivo
// tiene su actividad, cada actividad dos versiones bien armadas y cada respuesta modelo saca 90 o más.
import { test } from "node:test";
import assert from "node:assert/strict";
import { materiaPorId } from "@shared/academia";
import { CONTENIDO } from "./academia/index";
import { TODAS_LAS_PRACTICAS, materiaConPracticas } from "./academia/practicas/index";
import { problemasDePracticas, estaEnLeccion } from "./academia/practicas/validar";

for (const p of TODAS_LAS_PRACTICAS) {
  test(`las prácticas de ${p.materia} están bien armadas`, () => {
    const m = materiaPorId(p.materia);
    assert.ok(m, `no existe la materia ${p.materia}`);
    const problemas = problemasDePracticas(p, CONTENIDO, m!.lecciones.map((l) => l.id));
    assert.deepEqual(problemas, []);
  });
}

test("la materia modelo tiene todas sus prácticas", () => {
  assert.equal(materiaConPracticas("n1-salvacion"), true);
});

test("la frase de apoyo se busca sin mayúsculas ni punto final, pero entera", () => {
  const texto = "Jesús no empezó a existir en Belén. Antes de nacer como hombre ya era el Hijo eterno.";
  assert.equal(estaEnLeccion("jesús no empezó a existir en Belén", texto), true);
  assert.equal(estaEnLeccion("Jesús empezó a existir en Belén.", texto), false);
  assert.equal(estaEnLeccion("Belén", texto), false, "una palabra suelta no basta");
});
