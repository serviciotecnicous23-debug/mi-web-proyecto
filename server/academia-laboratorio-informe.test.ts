// Pruebas del informe del laboratorio para la Administración: npx tsx --test server/academia-laboratorio-informe.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { alcanceDe } from "@shared/academia-permisos";
import { PRACTICAS, practicaPorId } from "./academia/laboratorio/index";
import type { PracticaDef } from "./academia/laboratorio/tipos";
import { nuevoEstado, pasosDe, responder, resultado, terminado, type EstadoIntento } from "./academia-laboratorio-motor";
import { LLEVO, ULTIMOS, armarInforme, filasCsvLaboratorio, type FilaInforme } from "./academia-laboratorio-informe";
import { aCsv } from "./academia-csv";
import { practicaRevision } from "./academia-calidad";
import { nivelDe } from "@shared/laboratorio";

function azarFijo(semilla: number) {
  let x = semilla >>> 0;
  return () => {
    x = (x * 1664525 + 1013904223) >>> 0;
    return x / 2 ** 32;
  };
}

/** Hace una práctica: en cada paso, la opción que diga «elegir» (su lugar en la práctica). */
function hacer(p: PracticaDef, variante: number, elegir: (s: EstadoIntento) => number | number[]): EstadoIntento {
  let s = nuevoEstado(p, variante, azarFijo(variante + 3));
  while (!terminado(p, s)) {
    const orden = s.orden[s.paso];
    const quiero = elegir(s);
    const r = responder(p, s, Array.isArray(quiero) ? { orden: quiero.map((j) => orden.indexOf(j)) } : { k: orden.indexOf(quiero) });
    if ("error" in r) throw new Error(r.error);
    s = r.estado;
  }
  return s;
}

const ejemplar = (p: PracticaDef) => (s: EstadoIntento) => {
  const x = pasosDe(p, s.variante)[s.paso];
  return x.tipo === "escena" ? x.e.opciones.findIndex((o) => o.ejemplar) : x.r.opciones.map((_, j) => j);
};
/** La ejemplar en todo, menos en el primer paso con una crítica, donde elige la crítica. */
const conUnaCritica = (p: PracticaDef) => (s: EstadoIntento) => {
  const pasos = pasosDe(p, s.variante);
  const primera = pasos.findIndex((x) => (x.tipo === "escena" ? x.e.opciones.some((o) => o.critica) : x.r.opciones.some((o) => o.critica)));
  const x = pasos[s.paso];
  if (s.paso !== primera) return ejemplar(p)(s);
  if (x.tipo === "escena") return x.e.opciones.findIndex((o) => o.critica);
  const c = x.r.opciones.findIndex((o) => o.critica);
  return [c, ...x.r.opciones.map((_, j) => j).filter((j) => j !== c)];
};

let siguiente = 1;
function fila(p: PracticaDef, s: EstadoIntento, extra: Partial<FilaInforme> & { user_id: number; intento: number }): FilaInforme {
  const fin = terminado(p, s);
  const r = fin ? resultado(p, s) : null;
  return {
    id: siguiente++,
    practica_id: p.id,
    cuenta: true,
    estado: fin ? "terminado" : "en-curso",
    datos: JSON.parse(JSON.stringify(s)),
    nota: r?.nota ?? null,
    criticas: r?.criticas.length ?? 0,
    cierre: null,
    terminado_at: fin ? new Date(Date.UTC(2026, 10, 21, 10, siguiente)).toISOString() : null,
    nombre: `Alumno ${extra.user_id}`,
    ...extra,
  };
}

test("solo la Administración ve el informe", () => {
  assert.equal(alcanceDe("admin", "laboratorio"), "todos");
  for (const role of ["director", "staff_global", "maestro_ministerio", "obrero", "admin_iglesia", "maestro_iglesia", "miembro", null]) {
    assert.equal(alcanceDe(role, "laboratorio"), "no", String(role));
  }
});

test("sin intentos, cada práctica sale en cero", () => {
  const inf = armarInforme([]);
  assert.equal(inf.practicas.length, PRACTICAS.length);
  assert.deepEqual(inf.totales, { alumnos: 0, terminados: 0, promedio: null, conCritica: null });
  for (const p of inf.practicas) {
    assert.equal(p.alumnos, 0);
    assert.equal(p.primero, null);
    assert.equal(p.mejor, null);
    assert.ok(p.pasos.length > 0 && p.pasos.every((x) => x.respuestas === 0 && x.mejor === null));
    assert.ok(p.competencias.every((c) => c.pct === null));
  }
  assert.equal(inf.ultimos.length, 0);
});

test("el primer intento, el mejor, los niveles y las acciones críticas", () => {
  const p = practicaPorId("ninez-lo-que-conto-ana")!;
  const critico = hacer(p, 0, conUnaCritica(p));
  const bien = hacer(p, 0, ejemplar(p));
  const filas = [
    // Ana: primero con una crítica (hasta 60), después perfecto
    fila(p, critico, { user_id: 1, intento: 1, cierre: { sentir: "Con nervios", llevo: "  Creerle siempre y reportar de inmediato.  " } }),
    fila(p, bien, { user_id: 1, intento: 2, cierre: { sentir: "En calma", llevo: "" } }),
    // Beto: perfecto a la primera
    fila(p, bien, { user_id: 2, intento: 1 }),
    // un intento abierto y uno de práctica libre (no cuenta para los promedios)
    fila(p, nuevoEstado(p, 0, azarFijo(9)), { user_id: 3, intento: 1 }),
    fila(p, critico, { user_id: 2, intento: 4, cuenta: false }),
  ];
  const inf = armarInforme(filas);
  const x = inf.practicas.find((y) => y.id === p.id)!;
  const notaCritica = resultado(p, critico).nota;
  assert.ok(notaCritica <= 60);
  assert.equal(x.alumnos, 2);
  assert.equal(x.terminados, 4);
  assert.equal(x.enCurso, 1);
  assert.equal(x.primero, Math.round((notaCritica + 100) / 2));
  assert.equal(x.mejor, 100);
  assert.deepEqual(x.niveles, { Ejemplar: 2, Competente: 0, "En desarrollo": 0, Inicial: 0 });
  assert.equal(x.conCritica, 50);
  assert.equal(x.criticas.length, 1);
  assert.equal(x.criticas[0].veces, 2);
  assert.equal(x.criticas[0].paso, "Lo que cuenta");
  // el paso de la crítica: 2 de 4 eligieron lo mejor; los demás, todos
  const cuenta = x.pasos.find((y) => y.titulo === "Lo que cuenta")!;
  assert.deepEqual([cuenta.respuestas, cuenta.mejor], [4, 50]);
  assert.ok(x.pasos.filter((y) => y.titulo !== "Lo que cuenta").every((y) => y.respuestas === 4 && y.mejor === 100));
  assert.deepEqual(x.sentir, [{ sentir: "Con nervios", n: 1 }, { sentir: "En calma", n: 1 }].sort((a, b) => b.n - a.n || 0));
  assert.deepEqual(x.llevo, ["Creerle siempre y reportar de inmediato."]);
  assert.deepEqual(inf.totales, { alumnos: 2, terminados: 4, promedio: 100, conCritica: 50 });
  // los últimos: del más reciente al más viejo, con su nivel
  assert.equal(inf.ultimos.length, 4);
  assert.equal(inf.ultimos[0].alumno.nombre, "Alumno 2");
  assert.equal(inf.ultimos[0].cuenta, false);
  assert.ok(inf.ultimos.every((u) => u.practica === p.titulo && u.nivel !== null));
});

test("los pasos de otra versión del caso salen aparte", () => {
  const p = practicaPorId("consejeria-mensaje-de-noche")!;
  const inf = armarInforme([fila(p, hacer(p, 0, ejemplar(p)), { user_id: 1, intento: 1 }), fila(p, hacer(p, 1, ejemplar(p)), { user_id: 1, intento: 2 })]);
  const x = inf.practicas.find((y) => y.id === p.id)!;
  const peligro = x.pasos.filter((y) => y.titulo === "Peligro inmediato" || y.titulo === "¿Hay peligro inmediato?");
  assert.equal(peligro.length, 2);
  assert.deepEqual(peligro.map((y) => [y.version, y.respuestas]), [[null, 1], ["Sin peligro inmediato", 1]]);
  // los pasos que no cambian juntan las dos versiones
  assert.equal(x.pasos.find((y) => y.titulo === "El mensaje")!.respuestas, 2);
  assert.equal(x.pasos.length, pasosDe(p, 0).length + 1);
});

test("al ordenar, la crítica es la que puso primero", () => {
  const p = practicaPorId("homiletica-devocional-zaqueo")!;
  const inf = armarInforme([fila(p, hacer(p, 0, conUnaCritica(p)), { user_id: 5, intento: 1 })]);
  const x = inf.practicas.find((y) => y.id === p.id)!;
  assert.equal(x.criticas.length, 1);
  assert.ok(x.criticas[0].texto.startsWith("Si das la mitad"), x.criticas[0].texto);
  assert.equal(x.conCritica, 100);
});

test("un estado que no cuadra se salta, y el informe se corta en sus límites", () => {
  const p = practicaPorId("consejeria-visita-de-duelo")!;
  const bien = hacer(p, 0, ejemplar(p));
  const filas: FilaInforme[] = [fila(p, bien, { user_id: 1, intento: 1, datos: { roto: true } })];
  for (let i = 0; i < ULTIMOS + 5; i++) filas.push(fila(p, bien, { user_id: 100 + i, intento: 1, cierre: { llevo: `Me llevo la idea ${i}` } }));
  const inf = armarInforme(filas);
  const x = inf.practicas.find((y) => y.id === p.id)!;
  assert.equal(x.terminados, ULTIMOS + 5);
  assert.equal(x.llevo.length, LLEVO);
  assert.equal(inf.ultimos.length, ULTIMOS);
});

test("el CSV del laboratorio: un renglón por intento, con su nivel y sin fórmulas", () => {
  const p = PRACTICAS[0];
  const filas = [
    {
      id: 1, user_id: 7, practica_id: p.id, materia_id: p.materia, intento: 1, cuenta: true, estado: "terminado", datos: null, nota: 84, criticas: 0,
      cierre: { sentir: "Seguro", llevo: "=Escuchar primero" }, created_at: "2026-11-20T14:40:00Z", terminado_at: "2026-11-20T15:00:00Z", nombre: "Ana Pérez",
      matricula: "AF-2026-0007",
    },
    {
      id: 2, user_id: 7, practica_id: p.id, materia_id: p.materia, intento: 4, cuenta: false, estado: "en-curso", datos: null, nota: null, criticas: 0,
      cierre: null, created_at: "2026-11-21T10:00:00Z", terminado_at: null, nombre: "Ana Pérez", matricula: null,
    },
  ];
  const datos = filasCsvLaboratorio(filas);
  assert.equal(datos.length, 3);
  assert.deepEqual(datos[0].slice(0, 4), ["Matrícula", "Alumno", "Materia", "Práctica"]);
  const [, hecho, abierto] = datos;
  assert.equal(hecho[0], "AF-2026-0007");
  assert.equal(hecho[3], p.titulo);
  assert.deepEqual(hecho.slice(4, 9), [1, "Cuenta", "Terminada", 84, nivelDe(84)]);
  assert.equal(hecho[13], "2026-11-20");
  assert.deepEqual(abierto.slice(4, 9), [4, "Práctica libre", "Sin terminar", "", ""]);
  assert.equal(abierto[12], "2026-11-21");
  assert.equal(abierto[13], "");
  // lo que escribió no se toma como fórmula en Excel
  assert.ok(aCsv(datos).includes("'=Escuchar primero"));
});

test("la revisión doctrinal de cada práctica trae todo su texto: escenas, versiones, críticas y el orden de quien sabe", () => {
  for (const p of PRACTICAS) {
    const r = practicaRevision(p);
    assert.equal(r.titulo, p.titulo);
    assert.equal(r.escenas.filter((e) => !e.version).length, p.escenas?.length ?? 0, p.id);
    const cambiadas = (p.variantes ?? []).reduce((s, v) => s + v.escenas.filter((e) => (p.escenas ?? []).some((b) => b.id === e.id)).length, 0);
    assert.equal(r.escenas.filter((e) => e.version).length, cambiadas, p.id);
    const nombres = new Set(p.competencias.map((c) => c.nombre));
    for (const e of r.escenas) {
      // cada escena dice su competencia por su nombre y tiene su mejor opción
      assert.ok(nombres.has(e.competencia), `${p.id}/${e.id}: ${e.competencia}`);
      assert.ok(e.opciones.some((o) => o.ejemplar), `${p.id}/${e.id}`);
    }
    const criticas = (p.escenas ?? []).flatMap((e) => e.opciones).filter((o) => o.critica).length;
    assert.equal(r.escenas.filter((e) => !e.version).flatMap((e) => e.opciones).filter((o) => o.critica).length, criticas, p.id);
    // las rondas, en el orden de quien sabe (el alumno las ve mezcladas)
    assert.equal(r.rondas.length, p.rondas?.length ?? 0, p.id);
    (p.rondas ?? []).forEach((x, i) => assert.deepEqual(r.rondas[i].opciones.map((o) => o.texto), x.opciones.map((o) => o.texto)));
  }
});
