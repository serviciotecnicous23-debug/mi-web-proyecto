/**
 * El aula (shared/aula.ts) y el orden de las opciones de los exámenes que corrige el servidor
 * (server/orden-examen.ts): «siempre la A» no debe aprobar, ni la buena debe caer en la misma letra en todo un examen.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { AULAS, AULAS_LISTA, FRASES, aulaDeCamino, aulaDeCatedra, aulaDeEstudio, burbujasDeSeccion, burbujasDeTexto, conNombre, frase, medallaDeNota } from "./aula";
import { ESTUDIOS, EXAMEN_APRUEBA, EXAMEN_PREGUNTAS } from "./estudios";
import { EXAMENES } from "../server/estudios-examen";
import { numeroDe, opcionesDeExamen } from "../server/orden-examen";

test("cada aula tiene su maestro, su cátedra, 8 compañeros con nombre distinto y su versículo", () => {
  for (const id of AULAS_LISTA) {
    const a = AULAS[id];
    assert.equal(a.id, id);
    assert.ok(a.maestro.nombre && a.catedra.maestro.nombre);
    assert.equal(a.companeros.length, 8);
    assert.equal(new Set(a.companeros.map((c) => c.nombre)).size, 8, `nombres repetidos en ${id}`);
    assert.ok(a.verso.text.length > 20 && /\d+:\d+/.test(a.verso.ref));
  }
  assert.equal(AULAS.escuela.catedra.maestro.id, "miqueas");
  assert.equal(AULAS.camara.maestro.id, "eleazar");
  assert.equal(AULAS.palacio.maestro.id, "eliaquim");
});

test("cada estudio y cada cátedra tienen su aula", () => {
  assert.equal(aulaDeEstudio("sacerdocio", "profecia"), "camara");
  assert.equal(aulaDeEstudio("realeza", "sacerdocio"), "palacio");
  assert.equal(aulaDeEstudio("profecia", "realeza"), "escuela");
  // los «para todos», en el aula del camino de quien estudia
  assert.equal(aulaDeEstudio("comun", "realeza"), "palacio");
  assert.equal(aulaDeEstudio("comun", "sacerdocio"), "camara");
  assert.equal(aulaDeCamino("profecia"), "escuela");
  assert.equal(aulaDeCatedra("oficios"), "escuela");
  assert.equal(aulaDeCatedra("sacerdotal"), "camara");
  assert.equal(aulaDeCatedra("reyes"), "palacio");
  assert.equal(aulaDeCatedra("oracion"), null);
});

test("la enseñanza de cada sección va en 3 a 5 burbujas, con sus versículos y la idea clave al final", () => {
  for (const e of ESTUDIOS)
    for (const s of e.secciones) {
      const b = burbujasDeSeccion(s);
      assert.ok(b.length >= 3 && b.length <= 5, `${e.id}/${s.id}: ${b.length} burbujas`);
      assert.equal(b[b.length - 1].tipo, "clave");
      assert.equal(b.filter((x) => x.tipo === "verso").length, Math.min(2, s.versos.length));
      // no se pierde nada de la lectura
      assert.equal(b.filter((x) => x.tipo === "lectura").map((x) => x.texto).join(" "), s.lectura.join(" "));
    }
});

test("la enseñanza de una cátedra se parte por oraciones (sin perder texto ni los signos de apertura)", () => {
  const t = "Orar es hablar con Dios. ¿Quién escucha? Él responde: «Clama a mí». Y enseña.";
  const b = burbujasDeTexto(t, 3);
  assert.ok(b.length <= 3);
  assert.equal(b.join(" "), t);
  assert.ok(b.some((x) => x.startsWith("¿")));
  assert.deepEqual(burbujasDeTexto("Una sola oración sin punto"), ["Una sola oración sin punto"]);
});

test("las frases del maestro llevan el nombre y son de lenguaje neutro", () => {
  assert.equal(conNombre("¡Bien dicho, {n}!", "Rut"), "¡Bien dicho, Rut!");
  assert.equal(frase(FRASES.bien, 7), frase(FRASES.bien, 7));
  const todas = Object.values(FRASES).flat().join(" ").toLowerCase();
  for (const palabra of ["bienvenido", "bienvenida", "atento", "atenta", "listo", "lista"]) assert.ok(!new RegExp(`\\b${palabra}\\b`).test(todas), palabra);
});

test("la medalla de la nota: oro todas, plata aprobado, bronce si faltó una", () => {
  assert.equal(medallaDeNota(6, 6, 5), 3);
  assert.equal(medallaDeNota(5, 6, 5), 2);
  assert.equal(medallaDeNota(4, 6, 5), 1);
  assert.equal(medallaDeNota(3, 6, 5), 0);
  assert.equal(medallaDeNota(0, 0, 5), 0);
});

test("el orden de las opciones del examen: fijo por intento, con todas las opciones y la buena en cualquier letra", () => {
  const f = EXAMENES["sacerdocio-aaron"][0];
  const a = opcionesDeExamen(f[0], f[2], f[3], 1234, 0);
  assert.deepEqual(a, opcionesDeExamen(f[0], f[2], f[3], 1234, 0));
  assert.deepEqual([...a].sort(), [f[2], ...f[3]].sort());
  assert.notEqual(numeroDe("sa1"), numeroDe("sa2"));
});

test("en un mismo examen la buena cambia de letra y «siempre la A» casi nunca aprueba", () => {
  let examenes = 0;
  let mismaLetra = 0;
  let siempreA = 0;
  const lugar = [0, 0, 0, 0];
  for (const [estudio, banco] of Object.entries(EXAMENES))
    for (let titular = 1; titular <= 250; titular++)
      for (let intentos = 0; intentos < 5; intentos++) {
        // la misma semilla que server/estudios.ts
        const semilla = titular * 131 + intentos * 977 + estudio.length;
        const desde = (intentos * EXAMEN_PREGUNTAS) % banco.length;
        const preguntas = banco.slice(desde, desde + EXAMEN_PREGUNTAS);
        const pos = preguntas.map((f, i) => opcionesDeExamen(f[0], f[2], f[3], semilla, i).indexOf(f[2]));
        pos.forEach((p) => lugar[p]++);
        examenes++;
        if (new Set(pos).size === 1) mismaLetra++;
        if (pos.filter((p) => p === 0).length >= EXAMEN_APRUEBA) siempreA++;
      }
  const total = lugar.reduce((x, y) => x + y, 0);
  for (const v of lugar) assert.ok(v / total > 0.2 && v / total < 0.3, `lugar de la buena: ${lugar.map((x) => ((100 * x) / total).toFixed(1)).join(" ")}`);
  // al azar: todas en la misma letra ~0,1 % y «siempre la A» aprueba ~0,5 %
  assert.ok(mismaLetra / examenes < 0.005, `misma letra en ${((100 * mismaLetra) / examenes).toFixed(2)} %`);
  assert.ok(siempreA / examenes < 0.012, `«siempre la A» aprueba ${((100 * siempreA) / examenes).toFixed(2)} %`);
});
