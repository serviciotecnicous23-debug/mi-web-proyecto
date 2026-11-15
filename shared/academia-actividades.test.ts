// Las actividades del nivel: validar lo que registra el alumno y contar lo confirmado. npx tsx --test shared/academia-actividades.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  ACTIVIDADES_NIVEL, detalleEvangelismo, detalleServicio, diasDeServicio, diasEntre, fechaValida, resumirActividades, validarActividad,
} from "./academia-actividades";

const HOY = "2026-11-15";
const detalle = "Le conté mi testimonio en el almuerzo y oramos juntos por su familia.";

test("el Nivel 2 pide 3 conversaciones de evangelismo y 28 días de servicio", () => {
  assert.deepEqual(ACTIVIDADES_NIVEL[2], { evangelismo: 3, servicioDias: 28 });
  assert.equal(ACTIVIDADES_NIVEL[1], undefined, "el Nivel 1 no pide actividades");
});

test("las fechas AAAA-MM-DD, sin zonas horarias", () => {
  assert.ok(fechaValida("2026-02-28"));
  assert.ok(!fechaValida("2026-02-30"), "un día que no existe");
  assert.ok(!fechaValida("15/11/2026"));
  assert.equal(diasEntre("2026-10-18", "2026-11-15"), 28);
  assert.equal(diasEntre("2026-03-01", "2026-03-15"), 14, "el cambio de hora de marzo no mueve la cuenta");
  assert.equal(diasDeServicio({ fecha: "2026-10-01", hasta: null }, HOY), 45, "si sigue sirviendo, cuenta hasta hoy");
  assert.equal(diasDeServicio({ fecha: "2026-10-01", hasta: "2026-10-20" }, HOY), 19);
});

test("una conversación de evangelismo: con quién, cuándo y qué pasó", () => {
  const r = validarActividad({ tipo: "evangelismo", fecha: "2026-11-10", persona: "Un compañero de trabajo", resultado: "Oramos juntos", detalle }, HOY);
  assert.ok(r.ok);
  if (r.ok) {
    assert.equal(r.datos.persona, "Un compañero de trabajo");
    assert.equal(r.datos.resultado, "Oramos juntos");
    assert.equal(r.datos.lugar, null);
  }
  const otro = validarActividad({ tipo: "evangelismo", fecha: "2026-11-10", persona: "M. R.", resultado: "inventado", detalle }, HOY);
  assert.ok(otro.ok && otro.datos.resultado === null, "un resultado que no está en la lista se ignora");
  assert.ok(!validarActividad({ tipo: "evangelismo", fecha: "2026-11-20", persona: "Vecina", detalle }, HOY).ok, "fecha futura");
  assert.ok(!validarActividad({ tipo: "evangelismo", fecha: "2023-11-10", persona: "Vecina", detalle }, HOY).ok, "más de dos años atrás");
  assert.ok(!validarActividad({ tipo: "evangelismo", fecha: "2026-11-10", persona: "", detalle }, HOY).ok, "sin la persona");
  assert.ok(!validarActividad({ tipo: "evangelismo", fecha: "2026-11-10", persona: "Vecina", detalle: "Hablamos." }, HOY).ok, "un detalle demasiado corto");
  assert.ok(!validarActividad({ tipo: "otro", fecha: "2026-11-10", detalle }, HOY).ok, "un tipo que no existe");
});

test("un servicio: el ministerio, el líder y las fechas", () => {
  const base = { tipo: "servicio", fecha: "2026-10-01", lugar: "Ministerio de niños", lider: "Hna. Carmen", detalle: "Enseño la clase de los niños de 6 a 9 años cada domingo." };
  const r = validarActividad(base, HOY);
  assert.ok(r.ok && r.datos.hasta === null && r.datos.lugar === "Ministerio de niños");
  assert.ok(validarActividad({ ...base, hasta: "2026-11-01" }, HOY).ok);
  assert.ok(!validarActividad({ ...base, hasta: "2026-09-01" }, HOY).ok, "termina antes de empezar");
  assert.ok(!validarActividad({ ...base, hasta: "2026-12-01" }, HOY).ok, "termina en el futuro");
  assert.ok(!validarActividad({ ...base, lider: "" }, HOY).ok, "sin el líder");
  assert.ok(!validarActividad({ ...base, lugar: "" }, HOY).ok, "sin el ministerio");
});

test("cuentan las conversaciones confirmadas y el servicio confirmado con sus 28 días", () => {
  const pide = ACTIVIDADES_NIVEL[2]!;
  const ev = (estado: "pendiente" | "confirmada" | "rechazada") => ({ tipo: "evangelismo" as const, estado, fecha: "2026-11-01", hasta: null });
  let r = resumirActividades(pide, [ev("confirmada"), ev("confirmada"), ev("pendiente"), ev("rechazada")], HOY);
  assert.equal(r.evangelismo.confirmadas, 2);
  assert.equal(r.evangelismo.hecho, false);
  assert.equal(detalleEvangelismo(r), "2 de 3 confirmadas · 1 por confirmar");
  assert.equal(detalleServicio(r), "Sin registrar");

  r = resumirActividades(pide, [ev("confirmada"), ev("confirmada"), ev("confirmada"), { tipo: "servicio", estado: "pendiente", fecha: "2026-09-01", hasta: null }], HOY);
  assert.ok(r.evangelismo.hecho);
  assert.equal(r.servicio.hecho, false, "un servicio sin confirmar no cuenta");
  assert.equal(detalleServicio(r), "Registrado · por confirmar");

  r = resumirActividades(pide, [{ tipo: "servicio", estado: "confirmada", fecha: "2026-11-01", hasta: null }], HOY);
  assert.equal(r.servicio.hecho, false, "confirmado, pero con 14 días");
  assert.equal(detalleServicio(r), "Confirmado · 14 de 28 días");

  r = resumirActividades(pide, [{ tipo: "servicio", estado: "confirmada", fecha: "2026-10-18", hasta: null }], HOY);
  assert.ok(r.servicio.hecho, "28 días cumplidos");
  assert.equal(detalleServicio(r), "Confirmado");
});
