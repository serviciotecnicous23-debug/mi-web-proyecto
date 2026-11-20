// El mapa de la academia y lo que encuentra el buscador del catálogo (server/academia-mapa.ts): lo que las páginas
// necesitan del catálogo, sacado del mismo catálogo.
import { test } from "node:test";
import assert from "node:assert/strict";
import { ESPECIALIDADES, NIVELES, todasLasMaterias } from "@shared/academia";
import { abiertasJunto, buscadorDeLaAcademia, lugarDeMateria, mapaDeLaAcademia } from "./academia-mapa";

test("con la materia llegan su nivel o su especialidad y las que ya se pueden estudiar, como las calculaba la página", () => {
  for (const m of todasLasMaterias()) {
    // (lo que hacía la página con el catálogo, antes de pedirlo a la API)
    const nivel = m.nivel ? NIVELES[m.nivel - 1] : null;
    const especialidad = !m.nivel && m.especialidad ? ESPECIALIDADES.find((e) => e.id === m.especialidad) : undefined;
    assert.deepEqual(lugarDeMateria(m), {
      nivel: nivel ? { n: nivel.n, nombre: nivel.nombre, para: nivel.para } : null,
      especialidad: especialidad ? { id: especialidad.id, nombre: especialidad.nombre } : null,
    }, m.id);
    const grupo = m.nivel ? NIVELES.find((n) => n.n === m.nivel)?.materias : ESPECIALIDADES.find((e) => e.id === m.especialidad)?.materias;
    const listas = (grupo ?? []).filter((x) => x.disponible && x.id !== m.id);
    assert.deepEqual(abiertasJunto(m), listas.map((x) => ({ id: x.id, titulo: x.titulo })), m.id);
  }
  // una materia en preparación (hoy no queda ninguna): las abiertas de su nivel, sin ella
  const n1 = NIVELES[0].materias;
  const enPreparacion = { ...n1[0], disponible: false };
  assert.deepEqual(abiertasJunto(enPreparacion).map((x) => x.id), n1.filter((x) => x.disponible && x.id !== n1[0].id).map((x) => x.id));
});

test("el mapa trae cada materia con su título, su nivel y sus lecciones, y cada nivel con su nombre", () => {
  const mapa = mapaDeLaAcademia();
  const todas = todasLasMaterias();
  assert.equal(Object.keys(mapa.materias).length, todas.length);
  for (const m of todas) assert.deepEqual(mapa.materias[m.id], { titulo: m.titulo, nivel: m.nivel, lecciones: m.lecciones.length }, m.id);
  assert.deepEqual(mapa.niveles, NIVELES.map((n) => ({ n: n.n, nombre: n.nombre, materias: n.materias.length })));
});

test("el buscador trae de cada materia sus lecciones, su versículo, sus pasajes, su propósito y su bibliografía", () => {
  const buscador = buscadorDeLaAcademia();
  const todas = todasLasMaterias();
  assert.equal(Object.keys(buscador).length, todas.length);
  for (const m of todas) {
    const b = buscador[m.id];
    assert.deepEqual(b.lecciones, m.lecciones.map((l) => l.titulo), m.id);
    assert.equal(b.memoria, m.memoria, m.id);
    assert.equal(b.base, m.base, m.id);
    assert.equal(b.proposito, m.silabo?.proposito, m.id);
    // la básica y después la complementaria, con lo que agregó la revisión del sistema de estudio
    const libros = [...(m.silabo?.bibliografia.basica ?? []), ...(m.silabo?.bibliografia.complementaria ?? [])];
    assert.deepEqual(b.libros, libros.map((l) => ({ autor: l.autor, titulo: l.titulo })), m.id);
  }
  // (lo que busca el catálogo: un autor de la bibliografía y una lección)
  assert.ok(Object.values(buscador).some((b) => b.libros.some((l) => /Pearlman/.test(l.autor))), "Pearlman");
  assert.ok(Object.values(buscador).some((b) => b.lecciones.includes("¿Quién es Jesús?")), "¿Quién es Jesús?");
});
