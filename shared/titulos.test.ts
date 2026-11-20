import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { PAGE_META, canonicalPath, renderPageHtml } from "../server/seo";
import { MARCA, TITULOS, TITULO_GENERAL, TITULO_NO_ENCONTRADA, normalizarRuta, tituloDeRuta } from "./titulos";

const leer = (ruta: string) => readFileSync(new URL(ruta, import.meta.url), "utf8");
const INDEX_HTML = leer("../client/index.html");
/** Las rutas de client/src/App.tsx, escritas como allí («/aula/:id»). */
const RUTAS_DE_LA_APP = [...leer("../client/src/App.tsx").matchAll(/<Route path="([^"]+)"/g)].map((m) => m[1]);
const conParametros = (ruta: string) => ruta.replace(/:[^/]+/g, "1");

function tituloDelHtml(html: string): string {
  const m = html.match(/<title>([\s\S]*?)<\/title>/);
  assert.ok(m, "el html no tiene <title>");
  return m[1].replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
}

test("los títulos de server/seo.ts son los de shared/titulos.ts", () => {
  assert.equal(Object.keys(PAGE_META).length, 16);
  for (const [ruta, meta] of Object.entries(PAGE_META)) {
    assert.equal(meta.title, TITULOS[ruta as keyof typeof TITULOS], ruta);
    assert.equal(meta.title, tituloDeRuta(ruta), ruta);
  }
});

test("la primera carga (server/seo.ts) y la navegación dentro de la web dan el mismo título", () => {
  assert.equal(tituloDelHtml(INDEX_HTML), TITULO_GENERAL);
  for (const ruta of ["/", ...Object.keys(PAGE_META)]) {
    assert.equal(tituloDelHtml(renderPageHtml(INDEX_HTML, ruta)), tituloDeRuta(ruta), ruta);
    assert.equal(tituloDelHtml(renderPageHtml(INDEX_HTML, `${ruta}?desde=prueba`)), tituloDeRuta(ruta), ruta);
  }
});

test("cada ruta de App.tsx tiene su título, o su página pone el suyo", () => {
  assert.ok(RUTAS_DE_LA_APP.length > 80, `solo ${RUTAS_DE_LA_APP.length} rutas en App.tsx`);
  for (const ruta of RUTAS_DE_LA_APP) {
    assert.notEqual(tituloDeRuta(conParametros(ruta)), TITULO_NO_ENCONTRADA, ruta);
  }
  // y la tabla no guarda rutas que ya no existen
  for (const ruta of Object.keys(TITULOS)) assert.ok(RUTAS_DE_LA_APP.includes(ruta), `${ruta} no está en App.tsx`);
});

test("no pisa el título de las páginas que ponen el suyo", () => {
  for (const ruta of [
    "/academia",
    "/academia/leccion/7",
    "/academia/verificar/ABC123",
    "/admin/academia",
    "/admin/academia/alumno/3",
    "/maestro/academia/materia/a1",
    "/mi-iglesia/academia",
    "/academia/direccion",
    "/juegos",
    "/juegos/memoria",
    "/mensajes",
  ]) {
    assert.equal(tituloDeRuta(ruta), null, ruta);
  }
  // los paneles de al lado sí llevan el de la tabla
  assert.equal(tituloDeRuta("/admin"), TITULOS["/admin"]);
  assert.equal(tituloDeRuta("/maestro"), TITULOS["/maestro"]);
  assert.equal(tituloDeRuta("/mi-iglesia"), TITULOS["/mi-iglesia"]);
  // la radio pone el mismo de la tabla (y el de server/seo.ts)
  assert.equal(tituloDeRuta("/radio"), PAGE_META["/radio"].title);
});

test("busca la ruta como la encuentra wouter", () => {
  assert.equal(tituloDeRuta("/"), TITULO_GENERAL);
  assert.equal(tituloDeRuta(""), TITULO_GENERAL);
  assert.equal(tituloDeRuta("/contacto/"), TITULOS["/contacto"]);
  assert.equal(tituloDeRuta("/Contacto"), TITULOS["/contacto"]);
  assert.equal(tituloDeRuta("/contacto?tema=oracion#formulario"), TITULOS["/contacto"]);
  assert.equal(tituloDeRuta("//contacto"), TITULOS["/contacto"]);
  assert.equal(tituloDeRuta("/capacitaciones/12"), TITULOS["/capacitaciones/:id"]);
  assert.equal(tituloDeRuta("/planillas/ejemplo"), TITULOS["/planillas/:id"]);
  assert.equal(tituloDeRuta("/ficha-ministerial/8"), TITULOS["/ficha-ministerial/:userId"]);
  assert.equal(tituloDeRuta("/capacitaciones/12/otra"), TITULO_NO_ENCONTRADA);
  assert.equal(tituloDeRuta("/aula"), TITULO_NO_ENCONTRADA);
  assert.equal(tituloDeRuta("/no-existe"), TITULO_NO_ENCONTRADA);
  assert.equal(tituloDeRuta("/academiax"), TITULO_NO_ENCONTRADA);
  assert.equal(tituloDeRuta("/juegosx"), TITULO_NO_ENCONTRADA);
});

test("la ruta se arregla igual que la canónica de server/seo.ts", () => {
  for (const ruta of ["", "/", "/radio/", "//radio//", "/radio?x=1", "/radio#y", "/a/b/", "/?x", "///"]) {
    assert.equal(normalizarRuta(ruta), canonicalPath(ruta), ruta);
  }
  assert.equal(normalizarRuta("//radio//"), "/radio");
});

test("todos los títulos dicen la marca y tienen bien las tildes", () => {
  for (const titulo of [...Object.values(TITULOS), TITULO_NO_ENCONTRADA]) {
    assert.ok(titulo.includes(MARCA), titulo);
    assert.doesNotMatch(titulo, /Ã|Â|â€|�/, titulo);
  }
  assert.ok(Object.values(TITULOS).some((t) => t.includes("é")));
});

test("shared/titulos.ts no importa nada (lo cargan el menú y la portada)", () => {
  assert.doesNotMatch(leer("./titulos.ts"), /^\s*(import|export \* from|export \{[^}]*\} from)/m);
});
