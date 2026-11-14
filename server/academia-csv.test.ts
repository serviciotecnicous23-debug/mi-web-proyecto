// Pruebas de los reportes en CSV de la academia: npx tsx --test server/academia-csv.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { aCsv, celda } from "./academia-csv";

test("el CSV lleva BOM y renglones de Windows, y las tildes tal cual", () => {
  const csv = aCsv([["Matrícula", "Nombre"], ["AAF-2026-00001", "José Pérez"]]);
  assert.ok(csv.startsWith("﻿"));
  assert.equal(csv, "﻿Matrícula,Nombre\r\nAAF-2026-00001,José Pérez\r\n");
});

test("las celdas con coma, punto y coma, comillas o saltos van entre comillas", () => {
  assert.equal(celda("Austin, TX"), '"Austin, TX"');
  assert.equal(celda("uno; dos"), '"uno; dos"');
  assert.equal(celda('el "pastor"'), '"el ""pastor"""');
  assert.equal(celda("línea 1\nlínea 2"), '"línea 1\nlínea 2"');
});

test("nada se toma como fórmula: = + - @ van como texto", () => {
  assert.equal(celda("=HYPERLINK(\"http://x\")"), '"\'=HYPERLINK(""http://x"")"');
  assert.equal(celda("+1 512 555 0123"), "'+1 512 555 0123");
  assert.equal(celda("-5"), "'-5");
  assert.equal(celda("@SUM(A1)"), "'@SUM(A1)");
});

test("los números y lo vacío", () => {
  assert.equal(celda(86), "86");
  assert.equal(celda(null), "");
  assert.equal(celda(undefined), "");
  assert.equal(celda(""), "");
});
