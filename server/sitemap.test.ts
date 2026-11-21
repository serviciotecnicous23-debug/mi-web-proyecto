// El mapa del sitio y las respuestas 404. npx tsx --test server/sitemap.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { armarSitemap, paginasDelSitemap } from "./sitemap";
import { esRutaInexistente } from "./seo";
import { ESPECIALIDADES, NIVELES, todasLasMaterias } from "@shared/academia";

const CERRADAS_EN_ROBOTS = ["/admin", "/api/", "/perfil", "/mensajes", "/mis-capacitaciones", "/maestro", "/aula/", "/radio-live-scene"];

test("con la academia cerrada: solo las páginas públicas y la portada de la academia", () => {
  const locs = paginasDelSitemap(false).map((p) => p.loc);
  assert.ok(locs.includes("/") && locs.includes("/radio") && locs.includes("/academia"));
  assert.ok(!locs.some((l) => l.startsWith("/academia/")), "nada de adentro de la academia si no se ve sin cuenta");
});

test("con la academia abierta: cada nivel, cada especialidad y cada materia que ya se puede estudiar", () => {
  const locs = paginasDelSitemap(true).map((p) => p.loc);
  for (const n of NIVELES) assert.ok(locs.includes(`/academia/nivel/${n.n}`), `nivel ${n.n}`);
  for (const e of ESPECIALIDADES) assert.ok(locs.includes(`/academia/especialidad/${e.id}`), e.id);
  const disponibles = todasLasMaterias().filter((m) => m.disponible);
  assert.ok(disponibles.length > 50);
  for (const m of disponibles) assert.ok(locs.includes(`/academia/materia/${m.id}`), m.id);
  for (const m of todasLasMaterias().filter((x) => !x.disponible)) assert.ok(!locs.includes(`/academia/materia/${m.id}`), `${m.id} aún no se estudia`);
  assert.equal(new Set(locs).size, locs.length, "sin repetidas");
});

test("nada de lo que robots.txt cierra, y toda página del mapa existe (no responde 404)", () => {
  for (const { loc } of paginasDelSitemap(true)) {
    assert.ok(!CERRADAS_EN_ROBOTS.some((c) => loc === c || loc.startsWith(c.endsWith("/") ? c : `${c}/`)), `${loc} está cerrada en robots.txt`);
    assert.equal(esRutaInexistente(loc), false, `${loc} respondería 404`);
  }
});

test("el XML lleva direcciones completas, sin fechas inventadas", () => {
  const xml = armarSitemap("https://ejemplo.org/", true);
  assert.ok(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>'));
  assert.ok(xml.includes("<loc>https://ejemplo.org/academia/nivel/1</loc>"));
  assert.ok(xml.includes("<loc>https://ejemplo.org/</loc>"), "la portada con su barra");
  assert.ok(!xml.includes("//academia"), "sin barras dobles");
  assert.ok(!xml.includes("<lastmod>"));
  assert.equal((xml.match(/<url>/g) ?? []).length, paginasDelSitemap(true).length);
});

test("las direcciones que no son ninguna página responden 404; las de verdad, no", () => {
  for (const ruta of ["/esta-pagina-no-existe", "/eventos/123", "/radio/escuchar", "/index.html"]) {
    assert.equal(esRutaInexistente(ruta), true, ruta);
  }
  for (const ruta of [
    "/", "/radio", "/Radio/", "/radio?source=shortcut", "/?source=pwa", "/aula/5", "/capacitaciones/3",
    "/academia", "/academia/materia/n1-salvacion", "/academia/leccion/n1-salvacion-1", "/juegos", "/juegos/el-aprendiz",
    "/mensajes", "/admin/academia/alumno/3", "/ficha-ministerial/12", "/reset-password?token=x",
  ]) {
    assert.equal(esRutaInexistente(ruta), false, ruta);
  }
});
