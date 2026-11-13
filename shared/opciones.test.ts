// El orden de las opciones: la buena no puede quedar siempre en el mismo lugar. En la práctica de las secciones
// de los estudios era la primera en 41 de 46 preguntas, y las reuniones en las casas usan esas mismas preguntas:
// quien respondía siempre la primera acertaba casi todo.
import { test } from "node:test";
import assert from "node:assert/strict";
import { ESTUDIOS, opcionesEnOrden, ordenDeOpciones } from "./estudios";

const practica = ESTUDIOS.flatMap((e) => e.secciones.flatMap((s) => s.preguntas));

test("cada orden es una permutación de las opciones", () => {
  for (let n = 1; n <= 6; n++) {
    for (let semilla = 0; semilla < 200; semilla++) {
      const o = ordenDeOpciones(n, semilla);
      assert.equal(o.length, n);
      assert.deepEqual([...o].sort((a, b) => a - b), Array.from({ length: n }, (_, i) => i));
    }
  }
  assert.deepEqual(ordenDeOpciones(0, 7), []);
});

test("con la misma semilla sale el mismo orden (pedirla otra vez no lo cambia)", () => {
  for (let semilla = 0; semilla < 100; semilla++) assert.deepEqual(ordenDeOpciones(4, semilla), ordenDeOpciones(4, semilla));
  // y semillas distintas dan órdenes distintos
  const distintos = new Set(Array.from({ length: 60 }, (_, s) => ordenDeOpciones(4, s).join("")));
  assert.ok(distintos.size >= 18, `solo ${distintos.size} órdenes distintos`);
});

test("la buena cae en cualquier lugar por igual, también con semillas seguidas (los ids de las reuniones)", () => {
  for (const n of [3, 4]) {
    const veces = Array(n).fill(0);
    const N = 3000;
    for (let semilla = 1; semilla <= N; semilla++) veces[ordenDeOpciones(n, semilla).indexOf(0)]++;
    const esperado = 1 / n;
    for (const v of veces) {
      const parte = v / N;
      assert.ok(Math.abs(parte - esperado) < 0.05, `con ${n} opciones un lugar sale ${(parte * 100).toFixed(1)} % (lo justo es ${(esperado * 100).toFixed(1)} %)`);
    }
  }
});

test("la práctica de los estudios: la buena ya no está siempre primera", () => {
  // en los datos casi siempre es la primera (por eso hace falta revolver)
  const primeras = practica.filter((q) => q.ok === 0).length;
  assert.ok(primeras > practica.length / 2, "los datos cambiaron: revisar esta prueba");
  // revuelta, «siempre la primera» acierta como al azar, en una reunión cualquiera o al abrir la sección
  let aciertos = 0;
  let total = 0;
  for (let semilla = 1; semilla <= 120; semilla++) {
    for (const q of practica) {
      const v = opcionesEnOrden(q, semilla * 7919 + total);
      if (v.ok === 0) aciertos++;
      total++;
    }
  }
  const parte = aciertos / total;
  assert.ok(parte > 0.25 && parte < 0.42, `«siempre la primera» acierta el ${(parte * 100).toFixed(1)} %`);
});

test("opcionesEnOrden: la buena sigue siendo la misma respuesta, en su nuevo lugar", () => {
  for (const q of practica) {
    for (let semilla = 0; semilla < 25; semilla++) {
      const v = opcionesEnOrden(q, semilla);
      assert.equal(v.ops[v.ok], q.ops[q.ok]);
      assert.deepEqual([...v.ops].sort(), [...q.ops].sort());
      assert.equal(v.orden[v.ok], q.ok);
    }
  }
});
