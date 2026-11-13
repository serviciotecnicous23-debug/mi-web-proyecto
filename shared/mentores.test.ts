/**
 * Los mentores y los dichos de los ancianos (shared/mentores.ts, shared/dichos.ts): quién puede elegir mentor y quién
 * puede serlo, los pasos, el orden de los mentores sugeridos, el dicho de cada día, qué dicho se enseña, el manto y los
 * títulos del álbum.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  DIAS_APRENDIZ, MENTORES, PASOS, PASOS_DE_SIEMPRE, PRENDA_MENTOR, leerPasos, ordenarPosibles, pasosCumplidos, porQueNoElegir, porQueNoMentor, type DatosDePasos,
} from "./mentores";
import { CERCA_ANCIANOS, DICHOS, LUGAR_ANCIANOS, delTema, dicho, dichoDelDia, dichoParaEnsenar, leerDichos } from "./dichos";
import { ARTICULOS, articulo, ofertasDelDia } from "./mercado";
import { COLECCIONES, EN_EL_ALBUM, TITULOS_ESPECIALES, nombreDeTitulo, titulosGanados } from "./album";

const nuevo: DatosDePasos = { deber: false, instruccion: false, estudio: false, obra: false, dias: 1, diasDesdeLlegada: 0.5 };
const veterano: DatosDePasos = { deber: true, instruccion: true, estudio: true, obra: true, dias: 9, diasDesdeLlegada: 30 };

test("los seis pasos: ids distintos, «con tu mentor» es el único que no sale de otras tablas", () => {
  assert.equal(PASOS.length, 6);
  assert.equal(new Set(PASOS.map((p) => p.id)).size, 6);
  assert.deepEqual(PASOS_DE_SIEMPRE, ["deber", "instruccion", "estudio", "obra", "dias"]);
  assert.deepEqual(pasosCumplidos(nuevo), []);
  assert.deepEqual(pasosCumplidos(veterano), PASOS_DE_SIEMPRE);
  assert.deepEqual(pasosCumplidos({ ...nuevo, dias: DIAS_APRENDIZ - 1 }), []);
  assert.deepEqual(pasosCumplidos({ ...nuevo, dias: DIAS_APRENDIZ }), ["dias"]);
});

test("quién puede elegir mentor: solo quien acaba de llegar y no conoce todavía la ciudad", () => {
  const ninguno = { yaTermino: false, esMentor: false, cambios: 0 };
  assert.equal(porQueNoElegir(nuevo, ninguno), null);
  // con 3 de los 5 pasos de siempre, todavía; con 4, ya no
  assert.equal(porQueNoElegir({ ...nuevo, deber: true, instruccion: true, estudio: true }, ninguno), null);
  assert.match(porQueNoElegir({ ...nuevo, deber: true, instruccion: true, estudio: true, obra: true }, ninguno)!, /mentor de alguien/);
  // los primeros 14 días
  assert.equal(porQueNoElegir({ ...nuevo, diasDesdeLlegada: MENTORES.diasParaElegir - 0.1 }, ninguno), null);
  assert.match(porQueNoElegir({ ...nuevo, diasDesdeLlegada: MENTORES.diasParaElegir + 0.1 }, ninguno)!, /primeros 14 días/);
  assert.match(porQueNoElegir(nuevo, { ...ninguno, yaTermino: true })!, /Ya terminaste/);
  assert.match(porQueNoElegir(nuevo, { ...ninguno, esMentor: true })!, /Ya eres mentor/);
  assert.equal(porQueNoElegir(nuevo, { ...ninguno, cambios: MENTORES.maxCambios }), null);
  assert.match(porQueNoElegir(nuevo, { ...ninguno, cambios: MENTORES.maxCambios + 1 })!, /cambiaste/);
});

test("quién puede ser mentor: primeros pasos, un estudio y 3 días, y no estar haciendo sus propios pasos", () => {
  assert.equal(porQueNoMentor(veterano, { esAprendiz: false }), null);
  assert.equal(porQueNoMentor({ ...nuevo, instruccion: true, estudio: true, dias: MENTORES.diasMentor }, { esAprendiz: false }), null);
  assert.match(porQueNoMentor(veterano, { esAprendiz: true })!, /Primero termina/);
  const falta = porQueNoMentor(nuevo, { esAprendiz: false })!;
  assert.match(falta, /terminar tus primeros pasos, aprobar un estudio y jugar 3 días en Jerusalén \(llevas 1\)/);
  assert.match(porQueNoMentor({ ...veterano, estudio: false }, { esAprendiz: false })!, /te falta aprobar un estudio\.$/);
});

test("los pasos guardados: solo los que existen, con su fecha y si fueron de antes", () => {
  assert.deepEqual(leerPasos(null), {});
  assert.deepEqual(leerPasos({ deber: { at: "2026-11-12T10:00:00Z", antes: true }, juntos: { at: "x" }, raro: { at: "y" }, obra: 5 }), {
    deber: { at: "2026-11-12T10:00:00Z", antes: true },
    juntos: { at: "x" },
  });
});

test("el mentor sugerido: en línea, vecino y amigo, del mismo camino, el que ya guió a más", () => {
  const base = { personajeId: 1, titulo: null, donde: null, aprendices: 0, guiados: 0, dias: 5 };
  const l = ordenarPosibles(
    [
      { ...base, userId: 1, nombre: "Ana", camino: "sacerdocio", relacion: "amigo", enLinea: false },
      { ...base, userId: 2, nombre: "Beto", camino: "profecia", relacion: "vecino", enLinea: true },
      { ...base, userId: 3, nombre: "Caleb", camino: "sacerdocio", relacion: "ambos", enLinea: true },
      { ...base, userId: 4, nombre: "Dina", camino: "sacerdocio", relacion: "vecino", enLinea: true, guiados: 2 },
      { ...base, userId: 5, nombre: "Eli", camino: "sacerdocio", relacion: "vecino", enLinea: true },
    ],
    "sacerdocio",
  );
  assert.deepEqual(l.map((m) => m.userId), [3, 4, 5, 2, 1]);
  assert.deepEqual(l.map((m) => m.sugerido), [true, false, false, false, false]);
  assert.deepEqual(ordenarPosibles([], "sacerdocio"), []);
});

test("los dichos: 30 de Proverbios, ids distintos y lo que quiere decir de cada uno", () => {
  assert.equal(DICHOS.length, 30);
  assert.equal(new Set(DICHOS.map((d) => d.id)).size, DICHOS.length);
  assert.equal(new Set(DICHOS.map((d) => d.ref)).size, DICHOS.length, "sin versos repetidos");
  for (const d of DICHOS) {
    assert.match(d.ref, /^Proverbios \d+:\d+$/, d.id);
    assert.ok(d.tema.length > 3 && d.quiere.length > 15 && d.text.length > 20, d.id);
    assert.equal(dicho(d.id), d);
  }
  assert.equal(dicho("no-existe"), undefined);
  // «del orgullo», «de la hormiga»: nunca «de el»
  assert.equal(delTema("el orgullo"), "del orgullo");
  assert.equal(delTema("la hormiga"), "de la hormiga");
  for (const d of DICHOS) assert.ok(!/^de el /.test(delTema(d.tema)) && !/^(con|en) /.test(d.tema), d.tema);
  assert.deepEqual(LUGAR_ANCIANOS, [72.4, 0]);
  assert.ok(CERCA_ANCIANOS >= 5);
});

test("el dicho de cada día: el mismo para todos, uno tras otro, y vuelve a empezar después del último", () => {
  assert.equal(dichoDelDia("2026-11-09").id, DICHOS[0].id);
  assert.equal(dichoDelDia("2026-11-10").id, DICHOS[1].id);
  assert.equal(dichoDelDia("2026-11-12").id, DICHOS[3].id);
  // treinta días después vuelve el mismo
  assert.equal(dichoDelDia("2026-12-09").id, DICHOS[0].id);
  // y antes del primer día también hay uno
  assert.equal(dichoDelDia("2026-11-08").id, DICHOS[DICHOS.length - 1].id);
  // en un mes salen los treinta, sin repetir
  const mes = new Set<string>();
  for (let i = 0; i < 30; i++) mes.add(dichoDelDia(new Date(Date.UTC(2026, 10, 12 + i)).toISOString().slice(0, 10)).id);
  assert.equal(mes.size, 30);
});

test("qué dicho se enseña: el de hoy si lo tiene y al otro le falta; si no, el primero que le falte", () => {
  const hoy = "2026-11-12";
  const delDia = dichoDelDia(hoy).id;
  assert.equal(dichoParaEnsenar([DICHOS[5].id, delDia], [], hoy)?.id, delDia);
  assert.equal(dichoParaEnsenar([DICHOS[7].id, DICHOS[5].id, delDia], [delDia], hoy)?.id, DICHOS[5].id);
  assert.equal(dichoParaEnsenar([DICHOS[5].id], [DICHOS[5].id], hoy), null);
  assert.equal(dichoParaEnsenar([], [], hoy), null);
  assert.deepEqual(leerDichos(["vejez", "temor", "x", 3, "temor"]), ["temor", "vejez"]);
  assert.deepEqual(leerDichos(null), []);
});

test("el manto de Elías: exclusivo de los mentores, nunca en las ofertas, y en «Lo que se gana»", () => {
  const f = articulo(PRENDA_MENTOR.id);
  assert.ok(f, "está en el mercado");
  assert.equal(f!.exclusivo, "mentor");
  assert.equal(f!.categoria, "ropa");
  assert.match(f!.color ?? "", /^#[0-9a-f]{6}$/i);
  assert.equal(ARTICULOS.filter((a) => a.id === PRENDA_MENTOR.id).length, 1);
  for (let i = 0; i < 60; i++) {
    const dia = new Date(Date.UTC(2026, 10, 1 + i)).toISOString().slice(0, 10);
    assert.ok(!ofertasDelDia(dia).includes(PRENDA_MENTOR.id), dia);
  }
  const ganado = COLECCIONES.find((c) => c.id === "ganado")!;
  assert.ok(ganado.items.includes(PRENDA_MENTOR.id));
  assert.ok(EN_EL_ALBUM.has(PRENDA_MENTOR.id));
});

test("los títulos nuevos: «Idóneo para enseñar» y «Oído de sabio» (con los 30 dichos)", () => {
  assert.equal(nombreDeTitulo("idoneo"), "Idóneo para enseñar");
  assert.equal(nombreDeTitulo("oido-sabio"), "Oído de sabio");
  assert.ok(TITULOS_ESPECIALES.some((t) => t.id === "idoneo") && TITULOS_ESPECIALES.some((t) => t.id === "oido-sabio"));
  assert.deepEqual(titulosGanados(new Set(), { dador: false, amigo: false, mentor: true }), ["idoneo"]);
  assert.deepEqual(titulosGanados(new Set(), { dador: false, amigo: false, dichos: DICHOS.length - 1 }), []);
  assert.deepEqual(titulosGanados(new Set(), { dador: false, amigo: false, dichos: DICHOS.length }), ["oido-sabio"]);
  // sin los datos nuevos, como antes
  assert.deepEqual(titulosGanados(new Set(), { dador: true, amigo: true }), ["dador-alegre", "buen-amigo"]);
});
