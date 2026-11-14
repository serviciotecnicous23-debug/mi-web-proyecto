// Pruebas del catálogo y de las reglas de la academia: npx tsx --test shared/academia.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  APRUEBA, APRUEBA_INTEGRAL, CODIGO_HONOR, DIAS_PAUSA, ESPECIALIDADES, EXAMEN_INTEGRAL, HONORES, NIVELES, PACTOS, PATRON_CODIGO, PESOS_NIVEL, REGLAMENTO,
  VERSICULOS_NIVEL, calificacion, citaVisible, codigoDe, enlaceBiblia, esperaFinalMin, estatusDe, leccionPublica, materiaAprobada, medallaDe, normalizarCodigo,
  notaExamen, notaMateria, numeroMatricula, parsearCita, puntajeVersiculo, todasLasMaterias, veVistaPrevia,
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

test("el cierre del Nivel 1: integral de 40 con 75 para aprobar, 4 versículos y el pacto con sus citas", () => {
  assert.equal(EXAMEN_INTEGRAL[1].objetivas, 40);
  assert.equal(EXAMEN_INTEGRAL[1].escritas, 2);
  assert.equal(APRUEBA_INTEGRAL, 75);
  assert.equal(VERSICULOS_NIVEL[1], 4);
  const pacto = PACTOS[1]!;
  assert.ok(pacto.compromisos.length >= 5);
  assert.ok(parsearCita(pacto.base), pacto.base);
  for (const c of pacto.compromisos) assert.ok(parsearCita(c.ref), c.ref);
  // los requisitos que se muestran del Nivel 1 son los que se comprueban
  assert.deepEqual(NIVELES[0].requisitos, ["Las 8 materias aprobadas", "El examen integral del nivel", "4 versículos de memoria", "El pacto del creyente"]);
});

test("los códigos de los documentos: AAF-XXXX-XXXX en base 32 sin letras confusas, y se corrige lo que se escribe", () => {
  assert.equal(codigoDe(new Uint8Array([0, 0, 0, 0, 0])), "AAF-0000-0000");
  assert.equal(codigoDe(new Uint8Array([255, 255, 255, 255, 255])), "AAF-ZZZZ-ZZZZ");
  assert.equal(codigoDe(new Uint8Array([0x08, 0x42, 0x10, 0x84, 0x21])), "AAF-1111-1111");
  for (let i = 0; i < 200; i++) {
    const c = codigoDe(Uint8Array.from({ length: 5 }, (_, k) => (i * 37 + k * 101) % 256));
    assert.match(c, PATRON_CODIGO);
    assert.doesNotMatch(c.slice(4), /[ILOU]/);
  }
  assert.equal(normalizarCodigo(" aaf-7k2m-q9xd "), "AAF-7K2M-Q9XD");
  assert.equal(normalizarCodigo("AAF 7K2M Q9XD"), "AAF-7K2M-Q9XD");
  assert.equal(normalizarCodigo("aaf7k2mq9xd"), "AAF-7K2M-Q9XD");
  assert.equal(normalizarCodigo("AAF-OIL0-1234"), "AAF-0110-1234", "la O es 0; la I y la L son 1");
  assert.ok(!PATRON_CODIGO.test(normalizarCodigo("CERT-ABC123")));
});

test("la matrícula y el estatus: número AAF-año-número y el estatus sale del avance", () => {
  assert.equal(numeroMatricula(2026, 42), "AAF-2026-00042");
  const base = { retirado: false, nivelActual: 1, completados: [] as number[], honores: false, lecciones: 0, diasSinEstudiar: 0, siguienteDisponible: false };
  assert.equal(estatusDe(base).clave, "aspirante");
  assert.equal(estatusDe(base).texto, "Aspirante · Nivel 1 · Fundamentos de la fe");
  assert.equal(estatusDe({ ...base, lecciones: 3 }).texto, "Estudiante · Nivel 1 · Fundamentos de la fe");
  assert.equal(estatusDe({ ...base, lecciones: 3, diasSinEstudiar: 31 }).clave, "pausa");
  assert.equal(estatusDe({ ...base, lecciones: 3, diasSinEstudiar: 30 }).clave, "activo", "a los 30 días todavía está activo");
  const egresado = estatusDe({ ...base, lecciones: 32, completados: [1], nivelActual: 2, honores: true });
  assert.deepEqual(egresado, { clave: "egresado", texto: "Egresado del Nivel 1 · Fundamentos de la fe", nivel: 1, honores: true });
  assert.equal(estatusDe({ ...base, lecciones: 40, completados: [1], nivelActual: 2, siguienteDisponible: true }).texto, "Estudiante · Nivel 2 · Discipulado");
  assert.equal(estatusDe({ ...base, lecciones: 200, completados: [1, 2, 3, 4, 5], nivelActual: 5 }).texto, "Graduado de la Academia");
  assert.equal(estatusDe({ ...base, retirado: true, lecciones: 5 }).clave, "retirado");
});

test("el reglamento académico dice los mismos números que el sistema", () => {
  assert.equal(REGLAMENTO.secciones.length, 10);
  const todo = REGLAMENTO.secciones.flatMap((s) => s.puntos).join(" ");
  for (const dato of [`aprueba con ${APRUEBA}`, `con ${APRUEBA_INTEGRAL}`, "30 minutos", "24 horas", `${DIAS_PAUSA} días`, `${HONORES} o más`, "examen final (70 %)", "tercer fallo", CODIGO_HONOR]) {
    assert.ok(todo.includes(dato), `el reglamento debe decir «${dato}»`);
  }
  assert.ok(todo.includes("No es un título universitario oficial"));
  assert.ok(CODIGO_HONOR.includes("Colosenses 3:23"));
});

test("la vista previa es para administración y profesores", () => {
  assert.ok(veVistaPrevia("director"));
  assert.ok(veVistaPrevia("maestro_ministerio"));
  assert.ok(!veVistaPrevia("miembro"));
  assert.ok(!veVistaPrevia(undefined));
});
