// La página de salud para los vigilantes de afuera. npx tsx --test server/salud.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { estadoDeSalud } from "./salud";

test("si la base contesta: 200 y ok", async () => {
  const s = await estadoDeSalud(async () => ({ rows: [{ "?column?": 1 }] }));
  assert.equal(s.status, 200);
  assert.equal(s.cuerpo.ok, true);
  assert.equal(s.cuerpo.base, "ok");
  assert.ok(s.cuerpo.uptime >= 0);
});

test("si la base falla: 503 y no ok", async () => {
  const s = await estadoDeSalud(() => Promise.reject(new Error("conexión rechazada")));
  assert.equal(s.status, 503);
  assert.equal(s.cuerpo.ok, false);
  assert.equal(s.cuerpo.base, "sin respuesta");
});

test("si la base se cuelga: 503 al vencer el plazo, sin esperar de más", async () => {
  const inicio = Date.now();
  const s = await estadoDeSalud(() => new Promise(() => {}), 150);
  assert.equal(s.status, 503);
  assert.ok(Date.now() - inicio < 1500, "no espera más que el plazo");
});

test("lo que busca el vigilante («\"ok\":true») aparece solo cuando todo anda", async () => {
  const bien = JSON.stringify((await estadoDeSalud(async () => 1)).cuerpo);
  const mal = JSON.stringify((await estadoDeSalud(() => Promise.reject(new Error("x")))).cuerpo);
  assert.ok(bien.includes('"ok":true'));
  assert.ok(!mal.includes('"ok":true'));
});
