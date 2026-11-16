import { test } from "node:test";
import assert from "node:assert/strict";
import { trozosDeLectura } from "./lectura-voz";

test("un texto corto queda en un solo trozo, sin espacios de más", () => {
  assert.deepEqual(trozosDeLectura("  Dios es amor.   Él nos amó primero.  "), ["Dios es amor. Él nos amó primero."]);
  assert.deepEqual(trozosDeLectura(""), []);
  assert.deepEqual(trozosDeLectura("   \n  "), []);
});

test("los trozos no pasan del máximo y no se pierde ninguna palabra", () => {
  const oracion = "La gracia es el favor de Dios que no merecemos y que recibimos por la fe en Jesucristo. ";
  const texto = oracion.repeat(8);
  const trozos = trozosDeLectura(texto, 220);
  assert.ok(trozos.length >= 3, `se divide (${trozos.length})`);
  for (const t of trozos) assert.ok(t.length <= 220, `«${t.slice(0, 30)}…» mide ${t.length}`);
  assert.equal(trozos.join(" ").replace(/\s+/g, " "), texto.trim().replace(/\s+/g, " "));
});

test("una oración muy larga se corta por sus comas", () => {
  const larga = Array.from({ length: 12 }, (_, i) => `la parte número ${i + 1} de una frase muy larga`).join(", ") + ".";
  const trozos = trozosDeLectura(larga, 120);
  assert.ok(trozos.length > 1);
  for (const t of trozos) assert.ok(t.length <= 125, `mide ${t.length}`);
  assert.equal(trozos.join(" ").replace(/\s+/g, " "), larga);
});

test("respeta las preguntas y exclamaciones del español", () => {
  const trozos = trozosDeLectura("¿Quién es Jesús? ¡Es el Hijo de Dios! Él vino a salvarnos.", 20);
  assert.ok(trozos.some((t) => t.startsWith("¿Quién es Jesús?")), JSON.stringify(trozos));
  assert.equal(trozos.join(" "), "¿Quién es Jesús? ¡Es el Hijo de Dios! Él vino a salvarnos.");
});
