// El catálogo de fábrica del carro (capacitor.config.ts) cumple lo que pide el complemento «Carro»:
// node --test pruebas/*.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import config from "../capacitor.config.ts";

const carro = config.plugins.Carro;
const todos = (nodos) => nodos.flatMap((n) => [n, ...todos(n.hijos ?? [])]);

test("la app abre la web oficial y pide el catálogo al servidor", () => {
  assert.equal(config.appId, "com.ministerioavivandoelfuego.app");
  assert.equal(config.server.url, "https://ministerioavivandoelfuego.com");
  assert.equal(carro.catalogoUrl, "https://ministerioavivandoelfuego.com/api/carro/catalogo");
  assert.equal(carro.coordinarWeb, true);
  for (const origen of carro.origenesWeb) assert.match(origen, /^https:\/\/[^/]+$/);
});

test("el de fábrica: radio, academia y prédicas; ids únicos y todo por https", () => {
  const raiz = carro.catalogo.raiz;
  assert.deepEqual(raiz.map((n) => n.id), ["radio", "academia", "predicas"]);
  const nodos = todos(raiz);
  assert.equal(new Set(nodos.map((n) => n.id)).size, nodos.length);
  for (const n of nodos) {
    assert.ok(!!n.audio !== !!n.hijos, `${n.id}: suena o es carpeta`);
    for (const url of [...(n.audio?.urls ?? []), ...(n.audio?.metadatos ?? [])]) assert.match(url, /^https:\/\//, n.id);
  }
  const radio = nodos.find((n) => n.id === "radio:normal");
  assert.equal(radio.audio.enVivo, true);
  assert.equal(radio.audio.urls.length, 2);
});
