// Pruebas del cierre de sesiones (server/sesiones.ts): npx tsx --test server/sesiones.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { cerrarSesionesDe, consultaCerrarSesiones, esCuentaEliminada, type ConsultaSesiones } from "./sesiones";

test("la consulta borra las sesiones de la cuenta por el id que guarda passport, con o sin la sesión que se queda", () => {
  const todas = consultaCerrarSesiones(170);
  assert.match(todas.texto, /^DELETE FROM "user_sessions" WHERE/);
  assert.match(todas.texto, /"sess" -> 'passport' ->> 'user'\) = \$1/);
  assert.match(todas.texto, /\$2::text IS NULL OR "sid" <> \$2::text/);
  assert.deepEqual(todas.valores, ["170", null]);
  assert.deepEqual(consultaCerrarSesiones(170, "abc123").valores, ["170", "abc123"]);
});

test("cerrarSesionesDe usa la consulta, devuelve cuántas cerró y no rompe si la base falla", async () => {
  const vistas: Array<{ texto: string; valores: unknown[] }> = [];
  const base: ConsultaSesiones = {
    query: async (texto, valores) => {
      vistas.push({ texto, valores });
      return { rowCount: 2 };
    },
  };
  assert.equal(await cerrarSesionesDe(base, 7, "sid-actual"), 2);
  assert.deepEqual(vistas[0].valores, ["7", "sid-actual"]);

  // sin base de datos (sesiones en memoria) o con un id que no es válido, no hace nada
  assert.equal(await cerrarSesionesDe(null, 7), 0);
  assert.equal(await cerrarSesionesDe(base, 0), 0);
  assert.equal(await cerrarSesionesDe(base, Number.NaN), 0);
  assert.equal(vistas.length, 1);

  const rota: ConsultaSesiones = {
    query: async () => {
      throw new Error("sin conexión");
    },
  };
  const error = console.error;
  console.error = () => {};
  try {
    assert.equal(await cerrarSesionesDe(rota, 7), 0);
  } finally {
    console.error = error;
  }
});

test("solo la fila anónima que deja «Eliminar mi cuenta» cuenta como borrada", () => {
  assert.equal(esCuentaEliminada({ id: 170, username: "eliminada-170-be0865e4", isActive: false }), true);
  // una cuenta activa, otro id, otro formato o un nombre parecido no lo son
  assert.equal(esCuentaEliminada({ id: 170, username: "eliminada-170-be0865e4", isActive: true }), false);
  assert.equal(esCuentaEliminada({ id: 171, username: "eliminada-170-be0865e4", isActive: false }), false);
  assert.equal(esCuentaEliminada({ id: 170, username: "eliminada-170-xyz", isActive: false }), false);
  assert.equal(esCuentaEliminada({ id: 170, username: "Eliminada-170-be0865e4", isActive: false }), false);
  assert.equal(esCuentaEliminada({ id: 170, username: "eliminada-170-be0865e4x", isActive: false }), false);
  // una cuenta nueva pendiente de aprobación (inactiva) sigue siendo una cuenta normal
  assert.equal(esCuentaEliminada({ id: 12, username: "maria.lopez", isActive: false }), false);
  assert.equal(esCuentaEliminada(null), false);
  assert.equal(esCuentaEliminada(undefined), false);
});
