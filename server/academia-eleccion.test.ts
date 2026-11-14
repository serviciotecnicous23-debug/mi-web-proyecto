// Pruebas de la elección de preguntas de los exámenes: npx tsx --test server/academia-eleccion.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { EXAMEN_FINAL, EXAMEN_INTEGRAL, NIVELES } from "@shared/academia";
import { BANCOS, materiaDe } from "./academia/index";
import { elegirEscritas, elegirFinal } from "./academia-eleccion";

const n1 = NIVELES[0].materias.map((m) => BANCOS.get(m.id)!);
const finalN1 = n1.flatMap((b) => b.final);
const escritasN1 = n1.flatMap((b) => b.escritas);

test("el final de una materia sale repartido por sus 4 lecciones, como siempre", () => {
  for (const b of n1) {
    for (const semilla of [1, 77, -4021, 123456]) {
      const ids = elegirFinal(b.final, new Set(), EXAMEN_FINAL[1].objetivas, semilla);
      assert.equal(ids.length, 10, b.materia);
      assert.equal(new Set(ids).size, 10, `${b.materia}: sin repetidas`);
      const porLeccion = new Map<number, number>();
      for (const id of ids) {
        const p = b.final.find((x) => x.id === id)!;
        porLeccion.set(p.leccion, (porLeccion.get(p.leccion) ?? 0) + 1);
      }
      assert.deepEqual([...porLeccion.keys()].sort(), [1, 2, 3, 4], b.materia);
      assert.ok(Math.min(...porLeccion.values()) >= 2, `${b.materia}: ${[...porLeccion.values()]}`);
    }
  }
});

test("el integral del Nivel 1: 40 preguntas, 5 de cada una de las 8 materias", () => {
  assert.ok(finalN1.length >= EXAMEN_INTEGRAL[1].banco, `banco de ${finalN1.length}`);
  for (const semilla of [3, 9001, -77]) {
    const ids = elegirFinal(finalN1, new Set(), EXAMEN_INTEGRAL[1].objetivas, semilla, (p) => materiaDe(p.id)!);
    assert.equal(ids.length, 40);
    assert.equal(new Set(ids).size, 40);
    const porMateria = new Map<string, number>();
    for (const id of ids) porMateria.set(materiaDe(id)!, (porMateria.get(materiaDe(id)!) ?? 0) + 1);
    assert.equal(porMateria.size, 8);
    assert.deepEqual([...new Set(porMateria.values())], [5]);
  }
});

test("el siguiente intento del integral trae preguntas nuevas", () => {
  const grupo = (p: { id: string }) => materiaDe(p.id)!;
  const primero = elegirFinal(finalN1, new Set(), 40, 11, grupo);
  const segundo = elegirFinal(finalN1, new Set(primero), 40, 12, grupo);
  assert.equal(segundo.filter((id) => primero.includes(id)).length, 0);
});

test("las 2 escritas del integral salen de materias distintas", () => {
  for (const semilla of [5, 6, 7, 8, 9]) {
    const ids = elegirEscritas(escritasN1, new Set(), 2, semilla, (e) => materiaDe(e.id)!);
    assert.equal(ids.length, 2);
    assert.notEqual(materiaDe(ids[0]), materiaDe(ids[1]));
  }
  // y sin grupo (el final de una materia), la de siempre
  assert.equal(elegirEscritas(n1[0].escritas, new Set(), 1, 5).length, 1);
});
