// Pruebas del estado de las asignaciones: npx tsx --test shared/academia-escuela.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { estadoAsignacion, textoAvance } from "./academia-escuela";

const HOY = Date.parse("2026-11-14T12:00:00Z");
const MANANA = "2026-11-15T23:59:59.000Z";
const AYER = "2026-11-13T23:59:59.000Z";

test("sin nada, sin empezar; con una lección o inscrita, en curso", () => {
  assert.equal(estadoAsignacion(null, 4, MANANA, HOY).estado, "sin-empezar");
  assert.equal(estadoAsignacion({ estado: null, lecciones: 1, nota: null, aprobadaAt: null }, 4, MANANA, HOY).estado, "en-curso");
  assert.equal(estadoAsignacion({ estado: "en-curso", lecciones: 0, nota: null, aprobadaAt: null }, 4, null, HOY).estado, "en-curso");
});

test("pasada la fecha sin aprobarla, vencida (con lo que llevaba)", () => {
  const a = estadoAsignacion({ estado: "en-curso", lecciones: 2, nota: null, aprobadaAt: null }, 4, AYER, HOY);
  assert.deepEqual(a, { estado: "vencida", lecciones: 2, de: 4, nota: null, aprobada: null, aTiempo: null });
  assert.equal(estadoAsignacion(null, 4, AYER, HOY).estado, "vencida");
  assert.equal(textoAvance(a), "Vencida (2/4)");
});

test("aprobada: con su nota, a tiempo o después de la fecha", () => {
  const a = estadoAsignacion({ estado: "aprobada", lecciones: 4, nota: 92, aprobadaAt: "2026-11-13T10:00:00Z" }, 4, MANANA, HOY);
  assert.equal(a.estado, "aprobada");
  assert.equal(a.nota, 92);
  assert.equal(a.aTiempo, true);
  assert.equal(textoAvance(a), "92");
  const tarde = estadoAsignacion({ estado: "aprobada", lecciones: 4, nota: 75, aprobadaAt: "2026-11-14T10:00:00Z" }, 4, AYER, HOY);
  assert.equal(tarde.estado, "aprobada", "aprobada aunque sea tarde: no queda vencida");
  assert.equal(tarde.aTiempo, false);
  assert.equal(estadoAsignacion({ estado: "aprobada", lecciones: 4, nota: 80, aprobadaAt: "2026-11-10T10:00:00Z" }, 4, null, HOY).aTiempo, null);
});

test("el texto corto de cada estado", () => {
  assert.equal(textoAvance(null), "");
  assert.equal(textoAvance(estadoAsignacion(null, 4, null, HOY)), "Sin empezar");
  assert.equal(textoAvance(estadoAsignacion({ estado: "en-curso", lecciones: 3, nota: null, aprobadaAt: null }, 4, null, HOY)), "En curso (3/4)");
  assert.equal(estadoAsignacion({ estado: "en-curso", lecciones: 9, nota: null, aprobadaAt: null }, 4, null, HOY).lecciones, 4, "nunca más lecciones que las de la materia");
});
