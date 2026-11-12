// Las reglas de las obras de la casa y de sus estrellas (shared/obras.ts).
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  ESTRELLAS_PUNTOS, JUEGOS_DE_MUEBLES, MAS_OBREROS, OBRAS, asentarObras, costoDeObra, estrellasDeCasa, estrellasDeFila,
  estrellasDePuntos, leerObras, obra, obrasHechas, porQueNoSePuede, ventajasDeColumna, ventajasDeObras,
} from "./obras";
import { HORNO_GRANDE, HORNO_MAX, articulo } from "./mercado";

test("las obras: ids únicos, precios que suben y verso en cada una", () => {
  assert.equal(new Set(OBRAS.map((o) => o.id)).size, OBRAS.length);
  for (const o of OBRAS) {
    assert.ok(o.gozo > 0 && o.horas > 0 && o.puntos > 0, o.id);
    assert.ok(o.verso.text.length > 10 && /\d+:\d+/.test(o.verso.ref), o.id);
    assert.ok(o.nivelMin >= 0 && o.nivelMin <= 3, o.id);
  }
  // lo que piden estudios son las obras finas, de las más caras
  const finas = OBRAS.filter((o) => o.grupo === "fina");
  assert.ok(finas.every((o) => (o.estudios ?? 0) >= 2));
  const total = OBRAS.reduce((a, o) => a + o.gozo, 0);
  assert.ok(total >= 4000 && total <= 6000, `todas las obras cuestan ${total}`);
  // cuatro obras se pueden desde la tienda
  assert.ok(OBRAS.filter((o) => o.nivelMin === 0).length >= 4);
});

test("con más obreros: la mitad más de gozo y la mitad del tiempo; la harina no cambia", () => {
  const o = obra("cisterna")!;
  assert.deepEqual(costoDeObra(o), { gozo: 240, harina: 6, aceite: 0, horas: 8 });
  const r = costoDeObra(o, true);
  assert.equal(r.gozo, Math.round(240 * MAS_OBREROS.costo));
  assert.equal(r.horas, 4);
  assert.equal(r.harina, 6);
});

test("leer lo guardado: descarta lo que no es obra y la que ya está hecha", () => {
  assert.deepEqual(leerObras(null), { hechas: [], curso: null });
  assert.deepEqual(leerObras({ hechas: ["cerco", "nada", "cerco", 3] }), { hechas: ["cerco"], curso: null });
  const g = leerObras({ hechas: ["cerco"], curso: { id: "cerco", desde: "2026-11-11T10:00:00Z", lista: "2026-11-11T12:00:00Z" } });
  assert.equal(g.curso, null);
  const c = leerObras({ hechas: [], curso: { id: "horno", desde: "2026-11-11T10:00:00Z", lista: "2026-11-11T18:00:00Z", rapido: true } });
  assert.deepEqual(c.curso, { id: "horno", desde: "2026-11-11T10:00:00Z", lista: "2026-11-11T18:00:00Z", rapido: true });
});

test("la obra en curso cuenta en cuanto llega su hora, y se asienta una vez", () => {
  const g = leerObras({ hechas: ["cerco"], curso: { id: "cisterna", desde: "2026-11-11T10:00:00Z", lista: "2026-11-11T18:00:00Z" } });
  const antes = Date.parse("2026-11-11T17:59:59Z"), despues = Date.parse("2026-11-11T18:00:00Z");
  assert.deepEqual(obrasHechas(g, antes), ["cerco"]);
  assert.deepEqual(obrasHechas(g, despues), ["cerco", "cisterna"]);
  assert.equal(asentarObras(g, antes), null);
  assert.deepEqual(asentarObras(g, despues), { hechas: ["cerco", "cisterna"], curso: null });
  assert.equal(ventajasDeColumna(g, antes).cisterna, false);
  assert.equal(ventajasDeColumna(g, despues).cisterna, true);
});

test("las ventajas de las obras", () => {
  assert.deepEqual(ventajasDeObras([]), { parcelas: 0, alfoli: 0, horno: HORNO_MAX, cisterna: false });
  const v = ventajasDeObras(["ensanchar", "granero", "horno", "cisterna"]);
  assert.equal(v.parcelas, 1);
  assert.equal(v.alfoli, 30);
  assert.equal(v.horno, HORNO_GRANDE);
  assert.equal(v.cisterna, true);
});

test("por qué no se puede: hecha, en obra, otra en obra, casa chica y estudios", () => {
  const base = { nivel: 1, estudios: 0, hechas: [] as string[], curso: null };
  assert.equal(porQueNoSePuede(obra("cerco")!, base), null);
  assert.match(porQueNoSePuede(obra("cerco")!, { ...base, hechas: ["cerco"] })!, /Ya la edificaste/);
  const curso = { id: "horno" as const, desde: "x", lista: "y" };
  assert.match(porQueNoSePuede(obra("horno")!, { ...base, curso })!, /Ya está en obra/);
  assert.match(porQueNoSePuede(obra("cerco")!, { ...base, curso })!, /otra obra/);
  assert.match(porQueNoSePuede(obra("emparrado")!, { ...base, nivel: 0 })!, /casa de adobe/);
  assert.match(porQueNoSePuede(obra("palabras")!, base)!, /un estudio aprobado/);
  assert.equal(porQueNoSePuede(obra("palabras")!, { ...base, estudios: 1 }), null);
  assert.match(porQueNoSePuede(obra("portico")!, { ...base, nivel: 2, estudios: 1 })!, /2 estudios aprobados en la escuela \(tienes 1\)/);
  assert.match(porQueNoSePuede(obra("torre")!, { ...base, nivel: 2, estudios: 9 })!, /aposento alto/);
});

test("las estrellas de la casa", () => {
  assert.equal(estrellasDePuntos(0), 1);
  assert.equal(estrellasDePuntos(ESTRELLAS_PUNTOS[1] - 1), 1);
  assert.equal(estrellasDePuntos(ESTRELLAS_PUNTOS[1]), 2);
  assert.equal(estrellasDePuntos(ESTRELLAS_PUNTOS[4]), 5);
  assert.equal(estrellasDePuntos(9999), 5);
  // una tienda vacía tiene una estrella y le faltan 40 para la segunda
  const vacia = estrellasDeCasa({ nivel: 0, obras: [], adornos: [], letrero: false, muebles: [] });
  assert.deepEqual([vacia.puntos, vacia.estrellas, vacia.faltan], [0, 1, ESTRELLAS_PUNTOS[1]]);
  // una casa de adobe con letrero, 4 adornos, 6 muebles distintos (dos repetidos) y el cerco
  const c = estrellasDeCasa({
    nivel: 1, obras: ["cerco"], adornos: ["maceta", "cantaro", "banco", "lampara"], letrero: true,
    muebles: ["mesa", "silla", "cojines", "estera", "cesta", "lecho", "mesa", "silla"],
  });
  // 10 casa + 6 cerco + 6×2 muebles + 10 la mesa de la familia completa + 4×3 adornos + 5 letrero = 55
  assert.equal(c.puntos, 55);
  assert.equal(c.estrellas, 2);
  assert.ok(c.juegos.find((j) => j.id === "mesa")!.completo);
  assert.deepEqual(c.juegos.find((j) => j.id === "aposento")!.faltan, ["candelero"]);
  // todo: cinco estrellas
  const todo = estrellasDeCasa({
    nivel: 3, obras: OBRAS.map((o) => o.id), adornos: ["maceta", "cantaro", "banco", "lampara", "toldo", "telar", "parra", "higuera"], letrero: true,
    muebles: JUEGOS_DE_MUEBLES.flatMap((j) => j.muebles),
  });
  assert.equal(todo.estrellas, 5);
  assert.equal(todo.faltan, null);
});

test("los muebles de los juegos existen y las estrellas salen de la fila de la casa", () => {
  for (const j of JUEGOS_DE_MUEBLES) for (const m of j.muebles) assert.equal(articulo(m)?.categoria, "mueble", `${j.id}: ${m}`);
  const e = estrellasDeFila(
    {
      level: 2, letrero: "Casa de paz", adornos: ["maceta"],
      obras: { hechas: ["cerco"], curso: { id: "fuente", desde: "2026-11-11T00:00:00Z", lista: "2026-11-11T16:00:00Z" } },
      interior: [{ m: "mesa", x: 1, z: 1, r: 0 }],
    },
    Date.parse("2026-11-11T20:00:00Z"),
  );
  // 20 casa + 6 cerco + 24 fuente + 2 mueble + 3 adorno + 5 letrero = 60
  assert.equal(e.puntos, 60);
  assert.equal(e.estrellas, 2);
});
