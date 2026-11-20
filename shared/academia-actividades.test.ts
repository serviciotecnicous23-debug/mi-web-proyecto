// Las actividades del nivel: validar lo que registra el alumno y contar lo confirmado. npx tsx --test shared/academia-actividades.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  ACTIVIDADES_NIVEL, PASOS_CONSOLIDACION, PASOS_MINIMOS, detalleConsolidacion, detalleEnsenanza, detalleEvangelismo, detallePractica, detalleServicio,
  diasDeServicio, diasEntre, enlaceValido, fechaValida, horasDe, horasTexto, requisitosDeActividades, resumirActividades, tiposDe, validarActividad,
} from "./academia-actividades";
import { NIVELES, PACTOS, REGLAMENTO, REQUISITOS_POR_HACER, VERSICULOS_NIVEL } from "./academia";

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

test("el Nivel 3 pide 20 horas de práctica, una enseñanza grabada y una consolidación, con los textos de sus requisitos", () => {
  assert.deepEqual(ACTIVIDADES_NIVEL[3], { practicaHoras: 20, ensenanza: 1, consolidacion: 1 });
  assert.deepEqual(tiposDe(ACTIVIDADES_NIVEL[3]!), ["practica", "ensenanza", "consolidacion"]);
  assert.deepEqual(tiposDe(ACTIVIDADES_NIVEL[2]!), ["evangelismo", "servicio"]);
  for (const n of [2, 3] as const) {
    const nv = NIVELES.find((x) => x.n === n)!;
    for (const r of requisitosDeActividades(ACTIVIDADES_NIVEL[n]!, null)) {
      assert.ok(nv.requisitos.includes(r.texto), `Nivel ${n}: «${r.texto}» está en sus requisitos`);
      assert.equal(r.hecho, false, "sin sesión, pendiente");
      assert.equal(r.detalle, "Pendiente");
    }
  }
});

test("cada requisito de los niveles sale de algo que la academia registra", () => {
  for (const nv of NIVELES) {
    const salen = [
      `Las ${nv.materias.length} materias aprobadas`,
      "El examen integral del nivel",
      ...(VERSICULOS_NIVEL[nv.n] ? [`${VERSICULOS_NIVEL[nv.n]} versículos de memoria`] : []),
      ...requisitosDeActividades(ACTIVIDADES_NIVEL[nv.n] ?? {}, null).map((r) => r.texto),
      ...(PACTOS[nv.n] ? [PACTOS[nv.n]!.titulo] : []),
      ...(REQUISITOS_POR_HACER[nv.n] ?? []).map((r) => r.texto),
    ];
    for (const t of nv.requisitos) assert.ok(salen.includes(t), `Nivel ${nv.n}: «${t}»`);
  }
});

test("la práctica: el ministerio, quién la supervisó y sus horas, por día o por período", () => {
  const base = { tipo: "practica", fecha: "2026-11-08", lugar: "Grupo de jóvenes", lider: "Pastor Daniel", horas: "2,5", detalle: "Dirigí el estudio bíblico del grupo y oré con dos jóvenes al final." };
  const r = validarActividad(base, HOY, ["practica"]);
  assert.ok(r.ok && r.datos.horas === 2.5 && r.datos.hasta === null && r.datos.lider === "Pastor Daniel");
  assert.ok(!validarActividad({ ...base, horas: "13" }, HOY).ok, "más de 12 horas en un día");
  assert.ok(validarActividad({ ...base, hasta: "2026-11-14", horas: 30 }, HOY).ok, "30 horas en una semana");
  assert.ok(!validarActividad({ ...base, hasta: "2026-11-09", horas: 30 }, HOY).ok, "30 horas en dos días");
  assert.ok(!validarActividad({ ...base, fecha: "2026-10-01", hasta: "2026-11-14", horas: 41 }, HOY).ok, "más de 40 en un período");
  assert.ok(!validarActividad({ ...base, horas: "1,25" }, HOY).ok, "de media en media hora");
  assert.ok(!validarActividad({ ...base, horas: "0" }, HOY).ok);
  assert.ok(!validarActividad({ ...base, horas: "" }, HOY).ok);
  assert.ok(!validarActividad({ ...base, lider: "" }, HOY).ok, "sin quién la supervisó");
  assert.ok(!validarActividad({ ...base, lugar: "" }, HOY).ok, "sin el ministerio");
  assert.ok(!validarActividad({ ...base, hasta: "2026-11-20" }, HOY).ok, "el período termina en el futuro");
  const mismoDia = validarActividad({ ...base, hasta: base.fecha }, HOY);
  assert.ok(mismoDia.ok && mismoDia.datos.hasta === null, "el mismo día no es un período");
  assert.ok(!validarActividad(base, HOY, ["evangelismo", "servicio"]).ok, "el Nivel 2 no pide práctica");
  assert.equal(horasDe("1,5"), 1.5);
  assert.equal(horasDe(3), 3);
  assert.equal(horasDe("dos"), null);
  assert.equal(horasTexto(1.5), "1,5");
  assert.equal(horasTexto(20), "20");
});

test("la enseñanza grabada: el pasaje y el tema, un enlace https y la idea central", () => {
  const base = {
    tipo: "ensenanza",
    fecha: "2026-11-12",
    titulo: "Juan 4:1-26 · El agua que da vida",
    enlace: "https://youtu.be/abc123",
    detalle: "Idea central: Jesús ofrece a todos el agua viva. Propósito: que los oyentes vengan a él.",
  };
  const r = validarActividad(base, HOY);
  assert.ok(r.ok && r.datos.enlace === "https://youtu.be/abc123" && r.datos.lugar === null && r.datos.horas === null);
  for (const enlace of ["http://youtu.be/abc", "javascript:alert(1)", "youtu.be/abc", "https://localhost/x", "https://alguien:secreto@sitio.com/v", "https://sitio.com/a b", ""]) {
    assert.ok(!validarActividad({ ...base, enlace }, HOY).ok, `enlace no válido: ${enlace}`);
  }
  assert.ok(!validarActividad({ ...base, titulo: "Juan" }, HOY).ok, "sin el pasaje y el tema");
  assert.ok(!validarActividad({ ...base, detalle: "Muy buena." }, HOY).ok, "sin la idea central");
  assert.equal(enlaceValido("  https://drive.google.com/file/d/xyz/view  "), "https://drive.google.com/file/d/xyz/view");
  assert.equal(enlaceValido("https://" + "a".repeat(300) + ".com"), null, "demasiado largo");
});

test("la consolidación: a quién, quién la coordinó y al menos 4 pasos del plan", () => {
  const base = {
    tipo: "consolidacion",
    fecha: "2026-09-20",
    persona: "Un joven de la célula",
    lider: "Pastora Ruth",
    pasos: ["integracion", "contacto", "visita", "seguridad", "inventado"],
    detalle: "Lo llamé al día siguiente, lo visité con mi esposa y estudiamos 1 Juan 5. Ya va al grupo.",
  };
  const r = validarActividad(base, HOY);
  assert.ok(r.ok);
  if (r.ok) assert.deepEqual(r.datos.pasos, ["contacto", "visita", "seguridad", "integracion"], "solo los pasos del plan, en su orden");
  assert.equal(PASOS_CONSOLIDACION.length, 7);
  assert.equal(PASOS_MINIMOS, 4);
  assert.ok(!validarActividad({ ...base, pasos: ["contacto", "visita", "seguridad"] }, HOY).ok, "menos de 4 pasos");
  assert.ok(!validarActividad({ ...base, pasos: "contacto,visita,seguridad,bautismo" }, HOY).ok, "los pasos van en una lista");
  assert.ok(!validarActividad({ ...base, lider: "" }, HOY).ok, "sin quién la coordinó");
  assert.ok(!validarActividad({ ...base, persona: "" }, HOY).ok, "sin la persona");
  assert.ok(validarActividad({ ...base, hasta: "2026-11-01" }, HOY).ok);
  assert.ok(!validarActividad({ ...base, hasta: "2026-12-01" }, HOY).ok, "termina en el futuro");
});

test("cuentan las horas confirmadas y la enseñanza y la consolidación confirmadas", () => {
  const pide = ACTIVIDADES_NIVEL[3]!;
  type E = "pendiente" | "confirmada" | "rechazada";
  const pr = (estado: E, horas: number) => ({ tipo: "practica" as const, estado, fecha: "2026-11-01", hasta: null, horas });
  const en = (estado: E) => ({ tipo: "ensenanza" as const, estado, fecha: "2026-11-01", hasta: null });
  const co = (estado: E) => ({ tipo: "consolidacion" as const, estado, fecha: "2026-10-01", hasta: null });

  let r = resumirActividades(pide, [pr("confirmada", 12), pr("confirmada", 6.5), pr("pendiente", 3), pr("rechazada", 8)], HOY);
  assert.equal(r.practica.horas, 18.5);
  assert.equal(r.practica.porConfirmar, 3);
  assert.equal(r.practica.hecho, false);
  assert.equal(detallePractica(r), "18,5 de 20 horas confirmadas · 3 por confirmar");
  assert.equal(detalleEnsenanza(r), "Sin enviar");
  assert.equal(detalleConsolidacion(r), "Sin registrar");
  const req = requisitosDeActividades(pide, r);
  assert.deepEqual(req.map((x) => x.id), ["practica", "ensenanza", "consolidacion"]);
  assert.ok(req.every((x) => !x.hecho));

  r = resumirActividades(pide, [pr("confirmada", 12), pr("confirmada", 8), en("rechazada"), co("pendiente")], HOY);
  assert.ok(r.practica.hecho, "20 horas confirmadas");
  assert.equal(detallePractica(r), "20 de 20 horas confirmadas");
  assert.equal(detalleEnsenanza(r), "Devuelta · corrígela y envíala otra vez");
  assert.equal(detalleConsolidacion(r), "Registrada · por confirmar");

  r = resumirActividades(pide, [pr("confirmada", 25), en("rechazada"), en("confirmada"), co("confirmada")], HOY);
  assert.equal(detallePractica(r), "20 de 20 horas confirmadas", "las horas de más no pasan de lo que pide");
  assert.equal(detalleEnsenanza(r), "Aprobada");
  assert.equal(detalleConsolidacion(r), "Confirmada");
  assert.ok(requisitosDeActividades(pide, r).every((x) => x.hecho));
});

test("el reglamento dice lo que pide cada nivel, con los números del sistema", () => {
  const sec = REGLAMENTO.secciones.find((x) => x.titulo === "11. Las actividades de los niveles");
  assert.ok(sec, "la sección 11");
  const todo = sec!.puntos.join(" ");
  assert.ok(todo.includes("Nivel 2: 3 conversaciones de evangelismo y servir 1 mes (28 días)"));
  assert.ok(todo.includes("Nivel 3: 20 horas de práctica ministerial"));
  assert.ok(todo.includes(`al menos en ${PASOS_MINIMOS} de los ${PASOS_CONSOLIDACION.length} pasos`));
  assert.ok(todo.includes("hasta 12 en un día y 40 en un período"));
  assert.ok(todo.includes("de 10 a 15 minutos"));
  assert.ok(todo.includes("se avisa de inmediato al pastor y a las autoridades"));
  assert.ok(!todo.includes("48 horas"));
  assert.ok(REGLAMENTO.secciones[2].puntos.some((x) => x.includes("(sección 11)")), "la sección 3 la nombra");
});
