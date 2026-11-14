// Pruebas del catálogo y de las reglas de la academia: npx tsx --test shared/academia.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  APRUEBA, ESPECIALIDADES, NIVELES, PESOS_NIVEL, calificacion, citaVisible, enlaceBiblia, esperaFinalMin, leccionPublica, materiaAprobada,
  medallaDe, notaExamen, notaMateria, parsearCita, puntajeVersiculo, todasLasMaterias, veVistaPrevia,
} from "./academia";

test("el catálogo: 5 niveles con 8, 9, 10, 10 y 8 materias, y 12 especialidades de 5", () => {
  assert.deepEqual(NIVELES.map((n) => n.materias.length), [8, 9, 10, 10, 8]);
  assert.equal(ESPECIALIDADES.length, 12);
  for (const e of ESPECIALIDADES) assert.equal(e.materias.length, 5, e.id);
});

test("los ids de materias y lecciones son únicos", () => {
  const materias = todasLasMaterias().map((m) => m.id);
  assert.equal(new Set(materias).size, materias.length);
  const lecciones = todasLasMaterias().flatMap((m) => m.lecciones.map((l) => l.id));
  assert.equal(new Set(lecciones).size, lecciones.length);
});

test("cada materia del Nivel 1 tiene 4 lecciones y su versículo de memoria, y las disponibles tienen sílabo", () => {
  for (const m of NIVELES[0].materias) {
    assert.equal(m.lecciones.length, 4, m.id);
    assert.ok(m.memoria && parsearCita(m.memoria), `${m.id}: versículo ${m.memoria}`);
  }
  for (const m of todasLasMaterias().filter((x) => x.disponible)) {
    assert.ok(m.silabo && m.silabo.objetivos.length >= 3, m.id);
    assert.ok(m.silabo.bibliografia.basica.length >= 1, m.id);
  }
});

test("los pesos de cada nivel suman 100", () => {
  for (const p of Object.values(PESOS_NIVEL)) assert.equal(p.final + p.repasos + p.versiculo + p.mini + p.escritos, 100);
});

test("la nota de la materia es el promedio ponderado y se aprueba con 70 y el final aprobado", () => {
  const p = PESOS_NIVEL[1];
  assert.equal(notaMateria(p, { final: 80, repasos: 90, versiculo: 100 }), 85);
  assert.equal(notaMateria(p, {}), 0);
  assert.ok(materiaAprobada(75, 72));
  assert.ok(!materiaAprobada(75, 65), "sin el final aprobado no se aprueba");
  assert.ok(!materiaAprobada(69, 90));
  assert.equal(notaExamen(90, 100, 80), 92);
});

test("calificación, medallas, esperas y versículo", () => {
  assert.equal(calificacion(95), "Excelente");
  assert.equal(calificacion(APRUEBA), "Bien");
  assert.equal(calificacion(69), "No aprobado");
  assert.equal(medallaDe(95), "oro");
  assert.equal(medallaDe(85), "plata");
  assert.equal(medallaDe(70), "bronce");
  assert.equal(medallaDe(69), null);
  assert.deepEqual([0, 1, 2, 5].map(esperaFinalMin), [0, 30, 1440, 1440]);
  assert.deepEqual([0, 1, 2, 9].map(puntajeVersiculo), [100, 80, 60, 60]);
});

test("las citas: con tilde o sin ella, con números de libro y con rangos", () => {
  assert.deepEqual(parsearCita("Juan 3:16"), { libro: "Juan", capitulo: 3, desde: 16, hasta: 16 });
  assert.deepEqual(parsearCita("1 Juan 5:11-13"), { libro: "1 Juan", capitulo: 5, desde: 11, hasta: 13 });
  assert.deepEqual(parsearCita("Gálatas 5:16-25"), { libro: "Galatas", capitulo: 5, desde: 16, hasta: 25 });
  assert.equal(parsearCita("Juan 22:1"), null, "Juan tiene 21 capítulos");
  assert.equal(parsearCita("Hechos 2:1-4, 38-39"), null, "dos rangos no son un bloque");
  assert.equal(citaVisible(parsearCita("Galatas 2:20")!), "Gálatas 2:20");
  assert.equal(enlaceBiblia(parsearCita("1 Juan 1:9")!), "/biblioteca?libro=1%20Juan&cap=1");
});

test("la primera lección de cada materia del Nivel 1 es pública; las demás, no", () => {
  assert.ok(leccionPublica("n1-salvacion-1"));
  assert.ok(!leccionPublica("n1-salvacion-2"));
  for (const id of ["n1-oracion", "n1-biblia", "n1-espiritu"]) {
    assert.ok(leccionPublica(`${id}-1`), id);
    assert.ok(!leccionPublica(`${id}-4`), id);
  }
});

test("la vista previa es para administración y profesores", () => {
  assert.ok(veVistaPrevia("director"));
  assert.ok(veVistaPrevia("maestro_ministerio"));
  assert.ok(!veVistaPrevia("miembro"));
  assert.ok(!veVistaPrevia(undefined));
});
