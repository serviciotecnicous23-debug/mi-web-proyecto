// El panel de la academia cuenta todas las materias del plan (revisión del panel del 20-nov-2026): antes, el informe de
// materias, la pestaña «Materias», el archivo para descargar y la revisión doctrinal tomaban solo las de los cinco
// niveles, así que las 60 de las especialidades no tenían dónde aprobarse y su página de seguimiento se rompía.
import { test } from "node:test";
import assert from "node:assert/strict";
import { ESPECIALIDADES, NIVELES } from "@shared/academia";
import { materiasDelPlan } from "./academia-direccion";

test("el plan del panel tiene las materias de los niveles y de las especialidades, cada una con su grupo y sin repetir", () => {
  const plan = materiasDelPlan();
  const total = NIVELES.reduce((s, n) => s + n.materias.length, 0) + ESPECIALIDADES.reduce((s, e) => s + e.materias.length, 0);
  assert.equal(plan.length, total);
  assert.equal(new Set(plan.map((x) => x.m.id)).size, plan.length, "sin materias repetidas");
  for (const n of NIVELES) assert.equal(plan.filter((x) => x.grupo === `Nivel ${n.n}`).length, n.materias.length, `Nivel ${n.n}`);
  for (const e of ESPECIALIDADES) {
    const suyas = plan.filter((x) => x.grupo === e.nombre);
    assert.equal(suyas.length, e.materias.length, e.nombre);
    assert.ok(suyas.every((x) => x.m.especialidad === e.id), `${e.nombre}: cada materia es de su especialidad`);
  }
  // los niveles van primero, en el orden del catálogo
  assert.deepEqual(plan.slice(0, NIVELES[0].materias.length).map((x) => x.m.id), NIVELES[0].materias.map((m) => m.id));
});
