// Pruebas del trabajo final y del certificado de especialidad: npx tsx --test server/academia-especialidad.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { ESCRITA, ESPECIALIDADES, TRABAJO_ESPECIALIDAD, notaEspecialidad, tituloEspecialidad } from "@shared/academia";
import { BANCOS, escritaPorId } from "./academia/index";
import { TRABAJOS } from "./academia/trabajos";
import { claveTrabajo, contextoExamen } from "./academia-comun";
import { corregirEscrita, problemasDeClave } from "./academia-correccion";
import { especialidadPorId, tieneTrabajo } from "./academia-especialidad";

const palabras = (t: string) => t.split(/\s+/).filter(Boolean).length;

test("el trabajo final de cada especialidad: de tipo «trabajo», bien formado y con un id que no se repite", () => {
  const otros = new Set([...BANCOS.values()].flatMap((b) => [...b.escritas.map((e) => e.id), ...(b.breve ? [b.breve.id] : [])]));
  for (const [id, t] of TRABAJOS) {
    const e = especialidadPorId(id);
    assert.ok(e, id);
    assert.equal(t.tipo, "trabajo", t.id);
    assert.deepEqual(problemasDeClave(t), [], t.id);
    const n = palabras(t.modelo);
    assert.ok(n >= ESCRITA.trabajo.min && n <= ESCRITA.trabajo.max, `${t.id}: ${n} palabras`);
    assert.equal(corregirEscrita(t, t.modelo).nota, 100, t.id);
    assert.ok(!otros.has(t.id), `${t.id} repite el id de una escrita de un banco`);
    // la revisión la encuentra como a cualquier escrita
    assert.equal(escritaPorId(t.id), t);
  }
});

test("solo Evangelismo y misiones tiene su trabajo final: las demás todavía no tienen sus materias", () => {
  for (const e of ESPECIALIDADES) assert.equal(tieneTrabajo(e), e.id === "evangelismo-misiones", e.id);
});

test("el trabajo final tiene su contexto para la revisión: una sola escrita que vale toda la nota", () => {
  const k = claveTrabajo("evangelismo-misiones");
  assert.equal(k, "especialidad-evangelismo-misiones:trabajo");
  const ctx = contextoExamen(k)!;
  assert.equal(ctx.tipo, "trabajo");
  assert.equal(ctx.especialidad?.id, "evangelismo-misiones");
  assert.equal(ctx.materia, null);
  assert.equal(ctx.nivel, null);
  assert.equal(ctx.medida.pesoObjetiva, 0);
  assert.equal(ctx.medida.escritas, 1);
  assert.equal(ctx.aprueba, 70);
  assert.equal(ctx.ruta, "/academia/especialidad/evangelismo-misiones");
  assert.equal(ctx.titulo, "Trabajo final de la especialidad en Evangelismo y misiones");
  assert.equal(contextoExamen("especialidad-no-existe:trabajo"), null);
  // las claves de las materias de la especialidad siguen siendo las suyas
  assert.equal(contextoExamen("evangelismo-misiones-1:breve")?.tipo, "breve");
});

test("la nota y el título del certificado de especialidad; 3 entregas del trabajo", () => {
  assert.equal(notaEspecialidad([90, 80, 85, 95, 100], 70), 87);
  assert.equal(notaEspecialidad([70, 70, 70, 70, 70], 70), 70);
  assert.equal(tituloEspecialidad("Evangelismo y misiones"), "Certificado de Especialidad en Evangelismo y misiones");
  assert.equal(TRABAJO_ESPECIALIDAD.entregas, 3);
  assert.deepEqual(ESCRITA.trabajo, { min: 300, max: 1200 });
});

test("el corrector del trabajo: un plan a medias no aprueba y uno fuera de tema saca casi nada", () => {
  const t = TRABAJOS.get("evangelismo-misiones")!;
  const relleno =
    " Para eso necesitamos organizarnos bien: conseguir el sonido, las sillas, el permiso de la ciudad y la comida para los voluntarios, y hacer una reunión cada mes para repartir las tareas entre todos.";
  const medias =
    "Mi plan para el año es evangelizar más. Quiero que cada hermano tenga una lista de oración con sus amigos y que oremos por ellos cada semana, porque el amor de Cristo nos constriñe (2 Corintios 5:14). También haremos una campaña en el verano y prepararemos consejeros para el seguimiento." +
    relleno.repeat(8);
  const r = corregirEscrita(t, medias);
  assert.ok(r.nota >= 25 && r.nota < 70, `a medias: ${r.nota}`);
  assert.ok(r.revisar, "una nota dudosa queda para revisar");
  const fuera =
    "Este año queremos arreglar el edificio de la iglesia: pintar las paredes del salón, cambiar las sillas, arreglar el techo que gotea y cuidar las plantas del jardín de la entrada cada sábado. " +
    "También queremos mejorar el estacionamiento y comprar una estufa nueva para la cocina, y el tesorero dirá cada mes cuánto dinero se juntó y en qué se gastó. ".repeat(10);
  assert.ok(palabras(fuera) >= 300);
  assert.ok(corregirEscrita(t, fuera).nota < 30, "fuera de tema");
});
