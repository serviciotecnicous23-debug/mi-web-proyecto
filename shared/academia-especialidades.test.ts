// Pruebas de las especialidades: npx tsx --test shared/academia-especialidades.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { ESPECIALIDADES, EXAMEN_FINAL, PESOS_NIVEL, examenDe, materiaPorId, miniPruebasDe, pesosDe, requisitosMateria, tieneEscritoBreve } from "./academia";

const evangelismo = ESPECIALIDADES.find((e) => e.id === "evangelismo-misiones")!;
const alabanza = ESPECIALIDADES.find((e) => e.id === "alabanza")!;
const intercesion = ESPECIALIDADES.find((e) => e.id === "intercesion")!;

test("cada materia de especialidad se llama <especialidad>-<orden>, aunque ya tenga su definición completa", () => {
  for (const e of ESPECIALIDADES) {
    e.materias.forEach((m, i) => {
      assert.equal(m.id, `${e.id}-${i + 1}`, m.id);
      assert.equal(m.orden, i + 1, m.id);
      assert.equal(m.nivel, null, m.id);
      assert.equal(m.especialidad, e.id, m.id);
    });
  }
});

test("Evangelismo y misiones tiene sus cinco materias, con la medida del Nivel 3", () => {
  const materias = evangelismo.materias;
  assert.deepEqual(
    materias.map((m) => [m.titulo, m.memoria, m.lecciones.length, m.disponible, !!m.avanzada]),
    [
      ["Evangelismo personal avanzado", "Proverbios 11:30", 6, true, false],
      ["Campañas y cruzadas", "2 Timoteo 4:5", 6, true, false],
      ["Teología bíblica de las misiones", "Juan 20:21", 6, true, true],
      ["Misión transcultural", "Hechos 10:34-35", 6, true, true],
      ["Plantación de iglesias", "Mateo 16:18", 6, true, true],
    ],
  );
  for (const m of materias) {
    assert.ok(m.lecciones.every((l) => l.minutos === 10), m.id);
    assert.equal(m.silabo!.objetivos.length, 7, m.id);
    assert.deepEqual(examenDe(m), EXAMEN_FINAL[3], m.id);
    assert.deepEqual(pesosDe(m), PESOS_NIVEL[3], m.id);
    assert.deepEqual(miniPruebasDe(m), [{ n: 1, lecciones: [1, 2, 3] }, { n: 2, lecciones: [4, 5, 6] }], m.id);
    assert.equal(tieneEscritoBreve(m), true, m.id);
  }
  assert.equal(materias[0].antes, "Evangelismo 3");
  // la escatología y los cargos quedan para la declaración de fe
  assert.match(materias[2].silabo!.proposito, /declaración de fe por confirmar/);
  assert.match(materias[4].silabo!.proposito, /declaración de fe por confirmar/);
});

test("las materias de especialidad piden el Nivel 2, y las avanzadas, el Nivel 3", () => {
  const personal = materiaPorId("evangelismo-misiones-1")!;
  const misiones = materiaPorId("evangelismo-misiones-3")!;
  assert.deepEqual(requisitosMateria(personal, [1]), ["completar el Nivel 2 · Discipulado"]);
  assert.deepEqual(requisitosMateria(personal, [1, 2]), []);
  assert.deepEqual(requisitosMateria(misiones, [1, 2]), ["completar el Nivel 3 · Formación de obreros"]);
  assert.deepEqual(requisitosMateria(misiones, [1, 2, 3]), []);
  for (const id of ["evangelismo-misiones-4", "evangelismo-misiones-5"]) {
    assert.deepEqual(requisitosMateria(materiaPorId(id)!, [1, 2]), ["completar el Nivel 3 · Formación de obreros"], id);
  }
});

test("Alabanza y adoración tiene sus cinco materias, con la medida del Nivel 3 y el Nivel 2 como requisito", () => {
  const listas = alabanza.materias.filter((m) => m.disponible);
  assert.deepEqual(
    listas.map((m) => [m.titulo, m.memoria, m.lecciones.length, !!m.avanzada]),
    [
      ["Teología de la adoración", "Juan 4:23-24", 6, false],
      ["El adorador: carácter y vida", "Salmos 24:3-4", 6, false],
      ["Dirigir el ministerio de alabanza", "Salmos 33:3", 6, false],
      ["La música en la historia de la iglesia", "Salmos 145:4", 6, false],
      ["Sonido y técnica al servicio del culto", "1 Corintios 14:8", 6, false],
    ],
  );
  for (const m of listas) {
    assert.ok(m.lecciones.every((l) => l.minutos === 10), m.id);
    assert.equal(m.silabo!.objetivos.length, 7, m.id);
    assert.deepEqual(examenDe(m), EXAMEN_FINAL[3], m.id);
    assert.deepEqual(pesosDe(m), PESOS_NIVEL[3], m.id);
    assert.deepEqual(miniPruebasDe(m), [{ n: 1, lecciones: [1, 2, 3] }, { n: 2, lecciones: [4, 5, 6] }], m.id);
    assert.equal(tieneEscritoBreve(m), true, m.id);
    assert.deepEqual(requisitosMateria(m, [1]), ["completar el Nivel 2 · Discipulado"], m.id);
    assert.deepEqual(requisitosMateria(m, [1, 2]), [], m.id);
  }
  // quién dirige la alabanza queda para la declaración de fe
  assert.match(listas[2].silabo!.proposito, /declaración de fe por confirmar/);
  assert.equal(alabanza.materias.length, 5);
});

test("Intercesión y oración tiene sus cinco materias, con la medida del Nivel 3 y la guerra espiritual como avanzada", () => {
  const listas = intercesion.materias.filter((m) => m.disponible);
  assert.deepEqual(
    listas.map((m) => [m.titulo, m.memoria, m.lecciones.length, !!m.avanzada]),
    [
      ["Teología de la oración", "Jeremías 33:3", 6, false],
      ["Intercesión bíblica", "1 Timoteo 2:1", 6, false],
      ["El ayuno bíblico", "Isaías 58:6", 6, false],
      ["Guerra espiritual bíblica y equilibrada", "Santiago 4:7", 6, true],
      ["La oración en los avivamientos", "2 Crónicas 7:14", 6, false],
    ],
  );
  for (const m of listas) {
    assert.ok(m.lecciones.every((l) => l.minutos === 10), m.id);
    assert.equal(m.silabo!.objetivos.length, 7, m.id);
    assert.deepEqual(examenDe(m), EXAMEN_FINAL[3], m.id);
    assert.deepEqual(pesosDe(m), PESOS_NIVEL[3], m.id);
    assert.deepEqual(miniPruebasDe(m), [{ n: 1, lecciones: [1, 2, 3] }, { n: 2, lecciones: [4, 5, 6] }], m.id);
    assert.equal(tieneEscritoBreve(m), true, m.id);
    assert.deepEqual(requisitosMateria(m, m.avanzada ? [1, 2] : [1]), [`completar el Nivel ${m.avanzada ? "3 · Formación de obreros" : "2 · Discipulado"}`], m.id);
  }
  // la oración en lenguas y la sanidad en la expiación quedan para la declaración de fe
  assert.match(listas[0].silabo!.proposito, /declaración de fe por confirmar/);
  assert.match(listas[1].silabo!.proposito, /declaración de fe por confirmar/);
  // el ayuno lleva su cautela de salud
  assert.match(listas[2].silabo!.proposito, /consulta a su médico/);
  // la guerra espiritual es avanzada: pide el Nivel 3
  assert.equal(intercesion.materias[3].avanzada, true);
  assert.deepEqual(requisitosMateria(intercesion.materias[3], [1, 2, 3]), []);
  // las lenguas y la doctrina del avivamiento quedan para la declaración de fe
  assert.match(listas[4].silabo!.proposito, /declaración de fe por confirmar/);
  assert.equal(intercesion.materias.length, 5);
});

test("Ministerio pastoral empieza con «El ministerio pastoral», avanzada, y Hechos 20:28 de memoria", () => {
  const e = ESPECIALIDADES.find((x) => x.id === "pastoral")!;
  const m = e.materias[0];
  assert.equal(m.id, "pastoral-1");
  assert.ok(m.disponible);
  assert.equal(m.avanzada, true);
  assert.equal(m.memoria, "Hechos 20:28");
  assert.equal(m.lecciones.length, 6);
  assert.equal(m.silabo!.objetivos.length, 7);
  assert.ok(m.silabo!.bibliografia.basica.length >= 2 && m.silabo!.bibliografia.complementaria.length >= 2, "2+2 fuentes como pide la auditoría");
});

test("Ministerio pastoral sigue con «Consejería pastoral», avanzada, e Isaías 50:4 de memoria", () => {
  const e = ESPECIALIDADES.find((x) => x.id === "pastoral")!;
  const m = e.materias[1];
  assert.equal(m.id, "pastoral-2");
  assert.ok(m.disponible);
  assert.equal(m.avanzada, true);
  assert.equal(m.memoria, "Isaías 50:4");
  assert.equal(m.lecciones.length, 6);
  assert.equal(m.silabo!.objetivos.length, 7);
  assert.ok(m.silabo!.bibliografia.basica.length >= 2 && m.silabo!.bibliografia.complementaria.length >= 2, "2+2 fuentes como pide la auditoría");
});

test("Ministerio pastoral sigue con «Ordenanzas y ceremonias» y 1 Corintios 11:26 de memoria", () => {
  const e = ESPECIALIDADES.find((x) => x.id === "pastoral")!;
  const m = e.materias[2];
  assert.equal(m.id, "pastoral-3");
  assert.ok(m.disponible);
  assert.ok(!m.avanzada);
  assert.equal(m.memoria, "1 Corintios 11:26");
  assert.equal(m.lecciones.length, 6);
  assert.equal(m.silabo!.objetivos.length, 7);
  assert.ok(m.silabo!.bibliografia.basica.length >= 2 && m.silabo!.bibliografia.complementaria.length >= 2, "2+2 fuentes como pide la auditoría");
});

test("Ministerio pastoral sigue con «Visitación y cuidado del rebaño» y Proverbios 27:23 de memoria", () => {
  const e = ESPECIALIDADES.find((x) => x.id === "pastoral")!;
  const m = e.materias[3];
  assert.equal(m.id, "pastoral-4");
  assert.ok(m.disponible);
  assert.ok(!m.avanzada);
  assert.equal(m.memoria, "Proverbios 27:23");
  assert.equal(m.lecciones.length, 6);
  assert.equal(m.silabo!.objetivos.length, 7);
  assert.ok(m.silabo!.bibliografia.basica.length >= 2 && m.silabo!.bibliografia.complementaria.length >= 2, "2+2 fuentes como pide la auditoría");
});

test("Ministerio pastoral termina con «Predicación pastoral», avanzada, y tiene sus cinco materias listas", () => {
  const e = ESPECIALIDADES.find((x) => x.id === "pastoral")!;
  const m = e.materias[4];
  assert.equal(m.id, "pastoral-5");
  assert.ok(m.disponible);
  assert.equal(m.avanzada, true);
  assert.equal(m.memoria, "Hechos 20:27");
  assert.equal(m.lecciones.length, 6);
  assert.equal(m.silabo!.objetivos.length, 7);
  assert.ok(m.silabo!.bibliografia.basica.length >= 2 && m.silabo!.bibliografia.complementaria.length >= 2, "2+2 fuentes como pide la auditoría");
  assert.equal(e.materias.length, 5);
  for (const x of e.materias) assert.ok(x.disponible, x.id);
});

test("Niñez tiene sus cinco materias, con la medida del Nivel 3 y el Nivel 2 como requisito", () => {
  const ninez = ESPECIALIDADES.find((x) => x.id === "ninez")!;
  const listas = ninez.materias.filter((m) => m.disponible);
  assert.deepEqual(
    listas.map((m) => [m.id, m.titulo, m.memoria, m.lecciones.length, !!m.avanzada]),
    [
      ["ninez-1", "Educación cristiana de la niñez", "Salmos 78:4", 6, false],
      ["ninez-2", "El niño y su fe", "Juan 1:12", 6, false],
      ["ninez-3", "Métodos para enseñar a niños", "Nehemías 8:8", 6, false],
      ["ninez-4", "Protección de menores", "Salmos 82:3", 6, false],
      ["ninez-5", "Organizar el ministerio infantil", "Habacuc 2:2", 6, false],
    ],
  );
  for (const m of listas) {
    assert.ok(m.lecciones.every((l) => l.minutos === 10), m.id);
    assert.equal(m.silabo!.objetivos.length, 7, m.id);
    assert.ok(m.silabo!.bibliografia.basica.length >= 2 && m.silabo!.bibliografia.complementaria.length >= 2, `${m.id}: 2+2 fuentes como pide la auditoría`);
    assert.deepEqual(examenDe(m), EXAMEN_FINAL[3], m.id);
    assert.deepEqual(pesosDe(m), PESOS_NIVEL[3], m.id);
    assert.deepEqual(miniPruebasDe(m), [{ n: 1, lecciones: [1, 2, 3] }, { n: 2, lecciones: [4, 5, 6] }], m.id);
    assert.equal(tieneEscritoBreve(m), true, m.id);
    assert.deepEqual(requisitosMateria(m, [1]), ["completar el Nivel 2 · Discipulado"], m.id);
  }
  // las lenguas como señal inicial quedan para la declaración de fe
  assert.match(listas[1].silabo!.proposito, /declaración de fe por confirmar/);
  // la protección de menores trae la ley de Texas y aclara que no es un consejo legal
  assert.match(listas[3].silabo!.proposito, /Texas/);
  assert.match(listas[3].silabo!.proposito, /no un consejo legal/);
  assert.equal(ninez.materias.length, 5);
});

test("las otras siete especialidades siguen en preparación", () => {
  for (const e of ESPECIALIDADES.filter((x) => !["evangelismo-misiones", "alabanza", "intercesion", "pastoral", "ninez"].includes(x.id))) {
    for (const m of e.materias) {
      assert.equal(m.disponible, false, m.id);
      assert.equal(m.lecciones.length, 0, m.id);
    }
  }
});
