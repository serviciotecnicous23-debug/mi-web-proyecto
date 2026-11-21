// Las reglas del perfil completo del alumno (shared/academia-perfil.ts): las semanas, la racha, las alertas y los tipos de examen.
import { test } from "node:test";
import assert from "node:assert/strict";
import { UMBRALES, alertasDe, agruparAciertos, diasRecientes, lunesDe, porciento, rachaVigente, semanasDe, tipoDeClave, type DatosAlertas } from "./academia-perfil";

const base: DatosAlertas = {
  diasSinEstudiar: 0, enCurso: [], lecciones: 10, diasInscrito: 30, reprobadas: [], notasRecientes: [], abiertas: [], minutosSemanas: [], metaSemanal: 120,
  repasoVencido: 0, sinMentorEnNivel1: false, porRevisar: { escritas: 0, actividades: 0 },
};

test("el lunes de cada semana y los últimos días con sus minutos", () => {
  assert.equal(lunesDe("2026-11-20"), "2026-11-16"); // viernes
  assert.equal(lunesDe("2026-11-16"), "2026-11-16"); // lunes
  assert.equal(lunesDe("2026-11-22"), "2026-11-16"); // domingo
  const dias = diasRecientes([{ dia: "2026-11-19", minutos: 25 }], "2026-11-20", 3);
  assert.deepEqual(dias, [{ dia: "2026-11-18", minutos: 0 }, { dia: "2026-11-19", minutos: 25 }, { dia: "2026-11-20", minutos: 0 }]);
});

test("las semanas suman los minutos y las lecciones de lunes a domingo, la actual al final", () => {
  const s = semanasDe([{ dia: "2026-11-16", minutos: 30 }, { dia: "2026-11-20", minutos: 15 }, { dia: "2026-11-15", minutos: 40 }, { dia: "2026-01-01", minutos: 99 }], ["2026-11-17", "2026-11-09"], "2026-11-20", 3);
  assert.deepEqual(s.map((x) => x.inicio), ["2026-11-02", "2026-11-09", "2026-11-16"]);
  assert.deepEqual(s.map((x) => x.minutos), [0, 40, 45]);
  assert.deepEqual(s.map((x) => x.lecciones), [0, 1, 1]);
});

test("la racha vale si su último día es hoy o ayer", () => {
  assert.equal(rachaVigente(5, "2026-11-20", "2026-11-20"), 5);
  assert.equal(rachaVigente(5, "2026-11-19", "2026-11-20"), 5);
  assert.equal(rachaVigente(5, "2026-11-18", "2026-11-20"), 0);
  assert.equal(rachaVigente(0, "2026-11-20", "2026-11-20"), 0);
  assert.equal(rachaVigente(3, null, "2026-11-20"), 0);
});

test("sin nada raro, no hay alertas", () => {
  assert.deepEqual(alertasDe(base), []);
});

test("los días sin estudiar con materias en curso: media desde 7 y alta desde 14; sin materias en curso, nada", () => {
  assert.equal(alertasDe({ ...base, enCurso: ["Hermenéutica"], diasSinEstudiar: UMBRALES.inactivoMedia })[0].gravedad, "media");
  const alta = alertasDe({ ...base, enCurso: ["Hermenéutica"], diasSinEstudiar: UMBRALES.inactivoAlta });
  assert.equal(alta[0].gravedad, "alta");
  assert.match(alta[0].detalle, /Hermenéutica/);
  assert.deepEqual(alertasDe({ ...base, diasSinEstudiar: 40 }), []);
});

test("quien no completó ninguna lección no recibe también la alerta de los días sin estudiar", () => {
  const a = alertasDe({ ...base, enCurso: ["La salvación"], lecciones: 0, diasSinEstudiar: 20, diasInscrito: 20 });
  assert.deepEqual(a.map((x) => x.clave), ["sin-empezar"]);
});

test("el final reprobado dos veces, el promedio bajo, la lección detenida, la meta y quien no empezó", () => {
  const a = alertasDe({
    ...base,
    enCurso: ["Pentateuco"],
    reprobadas: [{ titulo: "Pentateuco", veces: 2 }, { titulo: "Otra", veces: 1 }],
    notasRecientes: [60, 55, 65, 70, 50, 99],
    abiertas: [{ titulo: "Génesis", materia: "Pentateuco", dias: 20 }, { titulo: "Éxodo", materia: "Pentateuco", dias: 15 }],
    minutosSemanas: [30, 0, 100, 200],
    lecciones: 0,
    diasInscrito: 10,
  });
  const claves = a.map((x) => x.clave);
  assert.ok(claves.includes("reprobado-Pentateuco") && !claves.includes("reprobado-Otra"));
  assert.ok(claves.includes("promedio"), "los últimos cinco (60, 55, 65, 70 y 50) promedian 60");
  assert.ok(claves.includes("atorado"));
  assert.match(a.find((x) => x.clave === "atorado")!.titulo, /Génesis/);
  assert.ok(claves.includes("meta"));
  assert.ok(claves.includes("sin-empezar"));
  // las altas van primero
  assert.equal(a[0].gravedad, "alta");
});

test("el promedio bajo mira los últimos cinco exámenes y pide al menos tres", () => {
  assert.ok(!alertasDe({ ...base, notasRecientes: [50, 60] }).some((x) => x.clave === "promedio"));
  assert.ok(alertasDe({ ...base, notasRecientes: [50, 60, 69] }).some((x) => x.clave === "promedio"));
  assert.ok(!alertasDe({ ...base, notasRecientes: [80, 75, 70, 72, 90, 10] }).some((x) => x.clave === "promedio"));
});

test("las de solo saber: repaso vencido, sin mentor y lo que espera revisión", () => {
  const a = alertasDe({ ...base, repasoVencido: 25, sinMentorEnNivel1: true, porRevisar: { escritas: 1, actividades: 2 } });
  assert.deepEqual(a.map((x) => x.gravedad), ["info", "info", "info"]);
  assert.match(a.find((x) => x.clave === "revision")!.titulo, /1 respuesta escrita y 2 actividades/);
});

test("los aciertos agrupados, el porcentaje y el tipo de examen por su clave", () => {
  const g = agruparAciertos([{ clave: "a", bien: true }, { clave: "a", bien: false }, { clave: "b", bien: true }]);
  assert.deepEqual(g.get("a"), { bien: 1, total: 2 });
  assert.equal(porciento(1, 3), 33);
  assert.equal(porciento(0, 0), 0);
  assert.equal(tipoDeClave("n1-biblia:final"), "final");
  assert.equal(tipoDeClave("n2-x:mini-2"), "mini");
  assert.equal(tipoDeClave("n3-x:breve"), "breve");
  assert.equal(tipoDeClave("n1-x:suficiencia"), "suficiencia");
  assert.equal(tipoDeClave("nivel-3:integral"), "integral");
  assert.equal(tipoDeClave("especialidad-alabanza:trabajo"), "trabajo");
  assert.equal(tipoDeClave("raro"), "otro");
});

test("las duraciones en palabras cortas", async () => {
  const { duracion } = await import("./academia-perfil");
  assert.equal(duracion(null), "—");
  assert.equal(duracion(45), "45 s");
  assert.equal(duracion(60), "1 min");
  assert.equal(duracion(18 * 60 + 20), "18 min");
  assert.equal(duracion(65 * 60), "1 h 05 min");
});
