// Pruebas de dónde queda la respuesta buena: npx tsx --test server/academia-orden.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { lugaresDeLaBuena, opcionesConBuenaEn } from "./academia-orden";

test("en el repaso de una lección (3 preguntas) la buena nunca se repite de lugar", () => {
  for (let semilla = 1; semilla < 500; semilla++) {
    const l = lugaresDeLaBuena(3, semilla * 7919);
    assert.equal(new Set(l).size, 3, `semilla ${semilla}: ${l}`);
    assert.ok(l.every((x) => x >= 0 && x < 4));
  }
});

test("en un examen, cada 4 preguntas seguidas usan los 4 lugares", () => {
  const l = lugaresDeLaBuena(10, 12345);
  assert.equal(l.length, 10);
  assert.deepEqual([...l.slice(0, 4)].sort(), [0, 1, 2, 3]);
  assert.deepEqual([...l.slice(4, 8)].sort(), [0, 1, 2, 3]);
  // en muchos intentos, la buena cae parejo en las 4 letras
  const cuenta = [0, 0, 0, 0];
  for (let s = 0; s < 400; s++) for (const x of lugaresDeLaBuena(3, s * 104729 + 17)) cuenta[x]++;
  for (const c of cuenta) assert.ok(c > 240 && c < 360, `reparto parejo: ${cuenta}`);
});

test("las opciones llevan la buena en su lugar y las falsas una sola vez", () => {
  const falsas = ["b", "c", "d"] as const;
  for (let lugar = 0; lugar < 4; lugar++) {
    const ops = opcionesConBuenaEn("p1", "buena", falsas, 99, lugar);
    assert.equal(ops.length, 4);
    assert.equal(ops[lugar], "buena");
    assert.deepEqual([...ops].sort(), ["b", "buena", "c", "d"]);
  }
  // una falsa repetida o igual a la buena no se duplica
  assert.deepEqual([...opcionesConBuenaEn("p2", "x", ["y", "y", "x"], 5, 1)].sort(), ["x", "y"]);
});
