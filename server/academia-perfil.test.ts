// El perfil completo del alumno (server/academia-perfil.ts): el índice de las preguntas y los títulos de los exámenes.
import { test } from "node:test";
import assert from "node:assert/strict";
import { ESPECIALIDADES, NIVELES } from "@shared/academia";
import { BANCOS } from "./academia/index";
import { _interno } from "./academia-perfil";

test("el índice de las preguntas tiene cada pregunta objetiva de los bancos, con su tipo, su materia y una lección que existe", () => {
  const idx = _interno.indicePreguntas();
  const finales = [...BANCOS.values()].reduce((s, b) => s + b.final.length, 0);
  assert.ok(idx.size >= finales, "al menos todas las de los finales");
  for (const [id, info] of idx) {
    assert.ok(["recordar", "comprender", "aplicar", "analizar", "evaluar", "crear"].includes(info.bloom), `${id}: tipo`);
    assert.ok(info.leccion >= 1 && info.leccion <= info.materia.lecciones.length, `${id}: lección ${info.leccion} de ${info.materia.id}`);
    assert.ok(info.texto.length > 5, `${id}: texto`);
  }
});

test("los títulos de los exámenes salen de su clave", () => {
  const m = NIVELES[0].materias[0];
  const e = ESPECIALIDADES[0];
  assert.equal(_interno.tituloExamen(`${m.id}:final`), `Examen final · ${m.titulo}`);
  assert.equal(_interno.tituloExamen(`${m.id}:mini-2`), `Mini prueba 2 · ${m.titulo}`);
  assert.equal(_interno.tituloExamen(`${m.id}:suficiencia`), `Examen de suficiencia · ${m.titulo}`);
  assert.equal(_interno.tituloExamen("nivel-3:integral"), "Examen integral del Nivel 3");
  assert.equal(_interno.tituloExamen(`especialidad-${e.id}:trabajo`), `Trabajo final · ${e.nombre}`);
});
