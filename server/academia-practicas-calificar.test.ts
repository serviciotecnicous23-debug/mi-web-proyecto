// El calificador del motor de prácticas: cada pieza se muestra sin sus respuestas y se califica bien en el orden en que
// se le mostró al alumno (server/academia-practicas-calificar.ts).
import { test } from "node:test";
import assert from "node:assert/strict";
import { contestar, nuevoEstado, palabrasDePasaje, pasosDe, pistaDe, puntajeDeOrden, vistaDe } from "./academia-practicas-calificar";
import { actividadPorId } from "./academia/practicas/index";
import type { Actividad } from "./academia/practicas/tipos";
import { siguienteEscalon, intercalarPorLeccion, estrellasDe, estadoObjetivo, componentePracticas, problemaDePesos, PESOS_CON_PRACTICAS } from "@shared/practicas";
import { PESOS_NIVEL } from "@shared/academia-base";

const act = (leccion: string, id: string) => {
  const a = actividadPorId(leccion, id);
  assert.ok(a, `falta ${leccion}/${id}`);
  return a!;
};

test("completa: se califica cada hueco y explica la equivocación típica", () => {
  const a = act("n1-salvacion-1", "a2");
  const e = nuevoEstado("n1-salvacion-1", a, 0, 123);
  const vista = vistaDe(a, e);
  assert.equal(vista.pieza, "completa");
  if (vista.pieza !== "completa") return;
  assert.equal(vista.partes.filter((p) => typeof p !== "string").length, 3);
  assert.equal(vista.banco.length, 6, "las 3 respuestas y las 3 que no van");
  assert.ok(!JSON.stringify(vista).includes("[["), "el texto no deja ver los huecos");
  const bien = contestar(a, e, { pieza: "completa", huecos: ["Cristo", "viviente", "Mesías"] });
  assert.equal(bien.devolucion.puntaje, 1);
  assert.equal(bien.devolucion.terminada, true);
  const mal = contestar(a, e, { pieza: "completa", huecos: ["profeta", "viviente", "Mesías"] });
  assert.ok(Math.abs(mal.devolucion.puntaje - 2 / 3) < 1e-9);
  assert.equal(mal.devolucion.bien, false);
  if (mal.devolucion.correccion.pieza !== "completa") return;
  assert.match(mal.devolucion.correccion.error ?? "", /profetas/);
  assert.deepEqual(mal.devolucion.correccion.marcas, [false, true, true]);
});

test("clasifica: las frases se mezclan y se corrigen en el orden mostrado", () => {
  const a = act("n1-salvacion-1", "a4");
  const e = nuevoEstado("n1-salvacion-1", a, 0, 77);
  const vista = vistaDe(a, e);
  if (vista.pieza !== "clasifica") return assert.fail("no es clasifica");
  const v: any = a.versiones[0];
  const grupos = vista.frases.map((f) => v.frases.find((x: any) => x.texto === f).grupo);
  assert.equal(contestar(a, e, { pieza: "clasifica", grupos }).devolucion.puntaje, 1);
  const todasCero = contestar(a, e, { pieza: "clasifica", grupos: grupos.map(() => 0) });
  assert.equal(todasCero.devolucion.puntaje, 0.5);
});

test("verdad: va de a una afirmación, con su propia explicación, y termina con el promedio", () => {
  const a = act("n1-salvacion-1", "a3");
  let e = nuevoEstado("n1-salvacion-1", a, 0, 5);
  assert.equal(pasosDe(a, 0), 3);
  const v1 = vistaDe(a, e);
  if (v1.pieza !== "verdad") return assert.fail("no es verdad");
  assert.equal(v1.afirmacion, "Jesús empezó a existir cuando nació en Belén.");
  assert.equal(pistaDe(a, e), "Jesús no empezó a existir en Belén.");
  let r = contestar(a, e, { pieza: "verdad", verdad: false });
  assert.equal(r.devolucion.bien, true);
  assert.equal(r.devolucion.terminada, false);
  assert.equal(r.devolucion.siguiente?.pieza, "verdad");
  e = r.estado;
  r = contestar(a, e, { pieza: "verdad", verdad: false });
  assert.equal(r.devolucion.bien, false, "la segunda es verdadera");
  e = r.estado;
  r = contestar(a, e, { pieza: "verdad", verdad: true });
  assert.equal(r.devolucion.terminada, true);
  assert.ok(Math.abs((r.devolucion.puntajeActividad ?? 0) - 2 / 3) < 1e-9);
  assert.throws(() => contestar(a, r.estado, { pieza: "verdad", verdad: true }), /terminó/);
});

test("situación y error: la opción buena se encuentra en el orden mezclado", () => {
  const s = act("n1-salvacion-1", "a5");
  const e = nuevoEstado("n1-salvacion-1", s, 1, 999);
  const vista = vistaDe(s, e);
  if (vista.pieza !== "situacion") return assert.fail("no es situación");
  const k = vista.opciones.findIndex((o) => o.startsWith("Sí: antes de nacer"));
  const r = contestar(s, e, { pieza: "situacion", opcion: k });
  assert.equal(r.devolucion.bien, true);
  if (r.devolucion.correccion.pieza !== "situacion") return;
  assert.equal(r.devolucion.correccion.correcta, k);
  assert.equal(r.devolucion.correccion.explicas.length, 4);
  assert.ok(!JSON.stringify(vista).includes("bien"), "la vista no dice cuál es la buena");

  const err = act("n1-salvacion-2", "a2");
  const ee = nuevoEstado("n1-salvacion-2", err, 0, 31);
  const ve = vistaDe(err, ee);
  if (ve.pieza !== "error") return assert.fail("no es error");
  const malo = ve.frases.findIndex((f) => f.startsWith("Solo las personas"));
  assert.equal(contestar(err, ee, { pieza: "error", frase: malo }).devolucion.puntaje, 1);
  assert.equal(contestar(err, ee, { pieza: "error", frase: (malo + 1) % 4 }).devolucion.puntaje, 0);
});

test("ordena: nunca empieza resuelto y da puntos por lo que quedó en orden", () => {
  const a = act("n1-salvacion-2", "a4");
  for (let semilla = 0; semilla < 40; semilla++) {
    const e = nuevoEstado("n1-salvacion-2", a, 0, semilla);
    assert.ok(e.orden.pasos.some((x, i) => x !== i), "no se muestra ya ordenado");
  }
  const e = nuevoEstado("n1-salvacion-2", a, 0, 8);
  const correcto = [0, 1, 2, 3].map((i) => e.orden.pasos.indexOf(i));
  assert.equal(contestar(a, e, { pieza: "ordena", orden: correcto }).devolucion.puntaje, 1);
  assert.equal(contestar(a, e, { pieza: "ordena", orden: [...correcto].reverse() }).devolucion.puntaje, 0);
  assert.equal(contestar(a, e, { pieza: "ordena", orden: [0, 0, 1, 2] }).devolucion.puntaje, 0, "un orden con repetidos no vale");
  assert.equal(puntajeDeOrden([1, 0, 2, 3]), 5 / 6);
});

test("relaciona: cada idea con la suya, aunque la derecha esté mezclada", () => {
  const a = act("n1-salvacion-3", "a4");
  const e = nuevoEstado("n1-salvacion-3", a, 0, 4242);
  const pares = [0, 1, 2, 3].map((i) => e.orden.derecha.indexOf(i));
  assert.equal(contestar(a, e, { pieza: "relaciona", pares }).devolucion.puntaje, 1);
  const cruzados = [pares[1], pares[0], pares[2], pares[3]];
  assert.equal(contestar(a, e, { pieza: "relaciona", pares: cruzados }).devolucion.puntaje, 0.5);
});

test("explica: se corrige con la clave y devuelve la respuesta modelo", () => {
  const a = act("n1-salvacion-1", "a6");
  const e = nuevoEstado("n1-salvacion-1", a, 0, 1);
  const r = contestar(a, e, { pieza: "explica", texto: "Porque como Dios Jesús puede salvarnos y como hombre pudo tomar nuestro lugar en la cruz por todos nosotros." });
  assert.ok(r.devolucion.puntaje >= 0.9, `sacó ${r.devolucion.puntaje}`);
  if (r.devolucion.correccion.pieza !== "explica") return;
  assert.ok(r.devolucion.correccion.modelo.length > 20);
  const flojo = contestar(a, e, { pieza: "explica", texto: "No sé, creo que es algo importante para la iglesia y para todos los hermanos de la congregación." });
  assert.ok(flojo.devolucion.puntaje < 0.5);
  assert.equal(flojo.devolucion.bien, false);
});

// las piezas de los niveles siguientes, con actividades de ejemplo
const linea: Actividad = {
  id: "x1", objetivo: 0, pieza: "linea",
  versiones: [{ consigna: "Ordena", apoyo: "x", explica: "x", eventos: [{ texto: "Abraham", fecha: "2000 a. C." }, { texto: "Moisés", fecha: "1440 a. C." }, { texto: "David", fecha: "1000 a. C." }, { texto: "El exilio", fecha: "586 a. C." }] }],
};
const mapaIdeas: Actividad = {
  id: "x2", objetivo: 0, pieza: "mapa-ideas",
  versiones: [{
    apoyo: "x", explica: "x",
    nodos: [{ id: "g", texto: "Gracia", x: 10, y: 10 }, { id: "f", texto: "Fe", x: 50, y: 50 }, { id: "s", texto: "Salvación", x: 90, y: 90 }],
    enlaces: [{ de: "g", a: "s", relacion: "da" }, { de: "f", a: "s", relacion: "recibe" }],
    distractores: ["compra"],
  }],
};
const mapa: Actividad = {
  id: "x3", objetivo: 0, pieza: "mapa",
  versiones: [{ apoyo: "x", explica: "x", imagen: "/mapas/israel.svg", alt: "Mapa", lugares: [{ nombre: "Belén", x: 40, y: 60 }, { nombre: "Nazaret", x: 45, y: 25, radio: 5 }] }],
};
const pasaje: Actividad = {
  id: "x4", objetivo: 0, pieza: "pasaje",
  versiones: [{ apoyo: "x", explica: "x", ref: "Juan 1:1", consigna: "Toca cómo llama Juan a Jesús.", texto: "En el principio era el [[Verbo]], y el [[Verbo]] era con Dios." }],
};
const escenario: Actividad = {
  id: "x5", objetivo: 0, pieza: "escenario",
  versiones: [{
    apoyo: "x", situacion: "Una visita.",
    escenas: [
      { id: "e1", narra: "Llegas.", pregunta: "¿Qué haces?", opciones: [{ texto: "Escuchar", valor: 2, explica: "Bien" }, { texto: "Irte", valor: 0, explica: "Mal", siguiente: "fin" }] },
      { id: "e2", narra: "Te cuenta.", pregunta: "¿Qué dices?", opciones: [{ texto: "Orar", valor: 2, explica: "Bien" }, { texto: "Juzgar", valor: 0, explica: "Mal" }] },
    ],
  }],
};

test("línea del tiempo: devuelve las fechas al corregir", () => {
  const e = nuevoEstado("l", linea, 0, 3);
  const correcto = [0, 1, 2, 3].map((i) => e.orden.eventos.indexOf(i));
  const r = contestar(linea, e, { pieza: "linea", orden: correcto });
  assert.equal(r.devolucion.puntaje, 1);
  if (r.devolucion.correccion.pieza !== "linea") return;
  assert.equal(r.devolucion.correccion.fechas.length, 4);
  assert.ok(!JSON.stringify(vistaDe(linea, e)).includes("a. C."), "las fechas no se ven antes de contestar");
});

test("mapa de ideas: se elige la relación de cada enlace", () => {
  const e = nuevoEstado("l", mapaIdeas, 0, 9);
  const vista = vistaDe(mapaIdeas, e);
  if (vista.pieza !== "mapa-ideas") return assert.fail("no es mapa de ideas");
  assert.equal(vista.relaciones.length, 3);
  const relaciones = ["da", "recibe"].map((x) => vista.relaciones.indexOf(x));
  assert.equal(contestar(mapaIdeas, e, { pieza: "mapa-ideas", relaciones }).devolucion.puntaje, 1);
});

test("mapa bíblico: vale tocar cerca del lugar", () => {
  let e = nuevoEstado("l", mapa, 0, 2);
  const primero = (mapa.versiones[0] as any).lugares[e.orden.lugares[0]];
  let r = contestar(mapa, e, { pieza: "mapa", x: primero.x + 3, y: primero.y - 3 });
  assert.equal(r.devolucion.bien, true);
  e = r.estado;
  r = contestar(mapa, e, { pieza: "mapa", x: 0, y: 0 });
  assert.equal(r.devolucion.bien, false);
  assert.equal(r.devolucion.puntajeActividad, 0.5);
});

test("marca en el pasaje: las palabras con su puntuación y la nota por aciertos y sobras", () => {
  const { palabras, marcadas } = palabrasDePasaje("En el principio era el [[Verbo]], y el [[Verbo]] era con Dios.");
  assert.equal(palabras[5], "Verbo,");
  assert.deepEqual(marcadas, [5, 8]);
  const e = nuevoEstado("l", pasaje, 0, 1);
  assert.equal(contestar(pasaje, e, { pieza: "pasaje", palabras: [5, 8] }).devolucion.puntaje, 1);
  assert.ok(Math.abs(contestar(pasaje, e, { pieza: "pasaje", palabras: [5, 8, 0] }).devolucion.puntaje - 0.8) < 1e-9);
});

test("escenario: cada decisión lleva a su escena y «fin» termina antes", () => {
  const e = nuevoEstado("l", escenario, 0, 6);
  const v = vistaDe(escenario, e);
  if (v.pieza !== "escenario") return assert.fail("no es escenario");
  const escuchar = v.escena.opciones.indexOf("Escuchar");
  const r1 = contestar(escenario, e, { pieza: "escenario", opcion: escuchar });
  assert.equal(r1.devolucion.terminada, false);
  assert.equal(r1.devolucion.siguiente?.pieza === "escenario" && r1.devolucion.siguiente.escena.id, "e2");
  const irse = contestar(escenario, e, { pieza: "escenario", opcion: v.escena.opciones.indexOf("Irte") });
  assert.equal(irse.devolucion.terminada, true);
  assert.equal(irse.devolucion.puntajeActividad, 0);
  assert.ok(!JSON.stringify(v).includes("valor"), "la vista no dice cuánto vale cada opción");
});

test("el calendario: sube con lo bien, repite a medias y vuelve mañana con lo mal", () => {
  assert.deepEqual(siguienteEscalon(0, 1), { escalon: 1, dias: 3 });
  assert.deepEqual(siguienteEscalon(3, 0.9), { escalon: 4, dias: 30 });
  assert.deepEqual(siguienteEscalon(4, 1), { escalon: 5, dias: 60 });
  assert.deepEqual(siguienteEscalon(5, 1), { escalon: 6, dias: null });
  assert.deepEqual(siguienteEscalon(2, 0.6), { escalon: 2, dias: 7 });
  assert.deepEqual(siguienteEscalon(4, 0), { escalon: 2, dias: 1 });
  assert.deepEqual(siguienteEscalon(1, 0.2), { escalon: 0, dias: 1 });
});

test("la práctica del día no pone más de dos seguidas de la misma lección", () => {
  const lista = ["a", "a", "a", "a", "b", "c"].map((leccion, i) => ({ leccion, i }));
  const out = intercalarPorLeccion(lista, 6);
  for (let i = 2; i < out.length; i++) assert.ok(!(out[i].leccion === out[i - 1].leccion && out[i].leccion === out[i - 2].leccion), JSON.stringify(out));
  assert.equal(out.length, 6);
});

test("estrellas, estados, componente y pesos", () => {
  assert.equal(estrellasDe(false, 100), 0);
  assert.equal(estrellasDe(true, null), 1);
  assert.equal(estrellasDe(true, 85), 2);
  assert.equal(estrellasDe(true, 100), 3);
  assert.equal(estadoObjetivo(true, 90, true), "firme");
  assert.equal(estadoObjetivo(true, 90, false), "dominado");
  assert.equal(estadoObjetivo(true, 60, true), "aprendiendo");
  assert.equal(componentePracticas([100, 80, null, 60]), 60);
  for (const n of [1, 2, 3, 4, 5] as const) {
    assert.equal(problemaDePesos(PESOS_CON_PRACTICAS[n], PESOS_NIVEL[n]), null, `nivel ${n}`);
    assert.equal(Object.values(PESOS_CON_PRACTICAS[n]).reduce((a, b) => a + b, 0), 100);
  }
  assert.match(problemaDePesos({ ...PESOS_CON_PRACTICAS[1], final: 40 }, PESOS_NIVEL[1]) ?? "", /sumar 100/);
  assert.match(problemaDePesos({ ...PESOS_CON_PRACTICAS[1], final: 45, mini: 5 }, PESOS_NIVEL[1]) ?? "", /no tiene/);
});
