import { test } from "node:test";
import assert from "node:assert/strict";
import { contieneAlguno, contieneTodos, marcar, normalizar, terminos } from "./buscar-texto";

test("normalizar quita tildes y mayúsculas", () => {
  assert.equal(normalizar("Oración y Ayuno"), "oracion y ayuno");
  assert.equal(normalizar("Niñez"), "ninez");
  assert.equal(normalizar("ÉXODO"), "exodo");
});

test("terminos: palabras de 2 letras o más, sin repetir y sin las vacías", () => {
  assert.deepEqual(terminos("  La oración, la ORACION y el a  "), ["oracion"]);
  assert.deepEqual(terminos("Juan 3:16"), ["juan", "16"]);
  // si solo se escribieron palabras vacías, se buscan esas
  assert.deepEqual(terminos("la el"), ["la", "el"]);
  assert.deepEqual(terminos(""), []);
  assert.deepEqual(terminos("a b c"), []);
  assert.equal(terminos("uno dos tres cuatro cinco seis siete ocho nueve diez").length, 8);
});

test("contieneTodos y contieneAlguno no miran tildes", () => {
  assert.equal(contieneTodos("El Espíritu Santo en mi vida", terminos("espiritu vida")), true);
  assert.equal(contieneTodos("El Espíritu Santo en mi vida", terminos("espiritu iglesia")), false);
  assert.equal(contieneTodos("cualquier cosa", []), true);
  assert.equal(contieneAlguno("Hermenéutica", terminos("hermeneutica griego")), true);
  assert.equal(contieneAlguno("Hermenéutica", terminos("griego")), false);
});

test("cada término va al comienzo de una palabra", () => {
  assert.equal(contieneTodos("La adoración y el día del Señor", terminos("oración")), false);
  assert.equal(contieneTodos("Las oraciones de Pablo", terminos("oracion")), true);
  assert.equal(contieneTodos("Teología de la oración", terminos("ora")), true);
  assert.equal(contieneTodos("Juan 3:16", terminos("16")), true);
  assert.equal(contieneTodos("Juan 3:160", terminos("60")), false);
});

test("marcar respeta el texto original con sus tildes", () => {
  assert.deepEqual(marcar("La oración del Señor", terminos("oracion senor")), [
    { t: "La ", m: false },
    { t: "oración", m: true },
    { t: " del ", m: false },
    { t: "Señor", m: true },
  ]);
  assert.deepEqual(marcar("Fe", []), [{ t: "Fe", m: false }]);
  assert.deepEqual(marcar("", ["fe"]), []);
  // varias veces, solo al comienzo de cada palabra
  assert.deepEqual(marcar("Fe, fefe y café", ["fe"]), [
    { t: "Fe", m: true },
    { t: ", ", m: false },
    { t: "fe", m: true },
    { t: "fe y café", m: false },
  ]);
  assert.deepEqual(marcar("La adoración y la oración", terminos("oracion")), [
    { t: "La adoración y la ", m: false },
    { t: "oración", m: true },
  ]);
  // un emoji (dos unidades) no se parte
  const p = marcar("✝️ Cruz 🙏 cruz", ["cruz"]);
  assert.equal(p.map((x) => x.t).join(""), "✝️ Cruz 🙏 cruz");
  assert.deepEqual(p.filter((x) => x.m).map((x) => x.t), ["Cruz", "cruz"]);
});
