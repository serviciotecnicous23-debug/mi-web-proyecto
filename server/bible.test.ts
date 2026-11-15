// La espera antes de reintentar cuando Bolls responde 429. npx tsx --test server/bible.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { esperaTras429 } from "./bible";

test("ante un 429 se espera lo que pide el proveedor, entre 0,3 y 2 segundos", () => {
  assert.equal(esperaTras429(null), 800, "sin Retry-After, 0,8 s");
  assert.equal(esperaTras429("1"), 1000);
  assert.equal(esperaTras429("5"), 2000, "nunca más de 2 s: la persona está esperando");
  assert.equal(esperaTras429("0.1"), 300, "nunca menos de 0,3 s");
  assert.equal(esperaTras429("Wed, 21 Oct 2026 07:28:00 GMT"), 800, "una fecha en vez de segundos: 0,8 s");
  assert.equal(esperaTras429("0"), 800);
});
