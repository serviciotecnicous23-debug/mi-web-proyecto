// Las reglas del cuadro de honor (shared/academia-honor.ts): npx tsx --test shared/academia-honor.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { compararHonor, nombreDeCuadro, puntosDeHonor, type MateriaHonor } from "./academia-honor";

const m = (base: number, extra = 0, nivel: number | null = 1, fecha = "2026-11-01T00:00:00.000Z"): MateriaHonor => ({ base, extra, nivel, fecha });
const fila = (nombre: string, ms: MateriaHonor[], nivel: number | null = null) => ({ nombre, ...puntosDeHonor(ms, nivel) });
const ordenar = (filas: ReturnType<typeof fila>[]) => [...filas].sort(compararHonor).map((f) => f.nombre);

test("los puntos de honor: las notas sin extra más la mitad de los puntos extra", () => {
  const p = puntosDeHonor([m(90), m(80, 10)]);
  assert.deepEqual({ puntos: p.puntos, promedio: p.promedio, aprobadas: p.aprobadas, extra: p.extra }, { puntos: 175, promedio: 85, aprobadas: 2, extra: 10 });
  assert.deepEqual(puntosDeHonor([]), { puntos: 0, promedio: 0, aprobadas: 0, extra: 0, ultima: null });
});

test("quien respondió todo bien no queda debajo de quien llegó con práctica", () => {
  // los dos con 100 de nota: uno a la primera y otro con 5 puntos extra
  assert.deepEqual(ordenar([fila("Con retos", [m(95, 5)]), fila("A la primera", [m(100)])]), ["A la primera", "Con retos"]);
  // a igual puntaje de honor, va primero el mejor promedio sin extra
  assert.deepEqual(ordenar([fila("Con retos", [m(98, 4)]), fila("A la primera", [m(100)])]), ["A la primera", "Con retos"]);
});

test("más materias aprobadas suman más, y a igual todo va primero quien llegó antes", () => {
  assert.deepEqual(ordenar([fila("Una", [m(100)]), fila("Tres", [m(85), m(88), m(90)])]), ["Tres", "Una"]);
  const antes = [m(90, 0, 1, "2026-10-01T00:00:00.000Z")];
  const despues = [m(90, 0, 1, "2026-11-20T00:00:00.000Z")];
  assert.deepEqual(ordenar([fila("Después", despues), fila("Antes", antes)]), ["Antes", "Después"]);
});

test("por nivel cuentan solo las materias de ese nivel", () => {
  const ms = [m(90, 0, 1), m(80, 0, 2), m(70, 0, 2)];
  assert.equal(puntosDeHonor(ms, 1).puntos, 90);
  assert.equal(puntosDeHonor(ms, 2).puntos, 150);
  assert.equal(puntosDeHonor(ms, 3).aprobadas, 0);
});

test("el nombre del cuadro: el primer nombre y el primer apellido", () => {
  assert.equal(nombreDeCuadro("ruth elena", "MEJÍA LÓPEZ"), "Ruth Mejía");
  assert.equal(nombreDeCuadro("  Pedro ", ""), "Pedro");
  assert.equal(nombreDeCuadro("", ""), "Estudiante");
});
