import { test } from "node:test";
import assert from "node:assert/strict";
import { endpointLimpio } from "./file-storage";

test("la dirección de R2 queda limpia aunque se copie con el depósito, barras o espacios", () => {
  const bien = "https://909d31d32ad158080188fac89aa7c8a1.r2.cloudflarestorage.com";
  assert.equal(endpointLimpio(bien, "avivando-archivos"), bien);
  assert.equal(endpointLimpio(`${bien}/avivando-archivos`, "avivando-archivos"), bien);
  assert.equal(endpointLimpio(`  ${bien}/avivando-archivos/  `, "avivando-archivos"), bien);
  assert.equal(endpointLimpio(`${bien}/`, "avivando-archivos"), bien);
  // otro camino no se toca
  assert.equal(endpointLimpio(`${bien}/otra-cosa`, "avivando-archivos"), `${bien}/otra-cosa`);
});
