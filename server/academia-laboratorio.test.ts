// Pruebas del laboratorio ministerial: npx tsx --test server/academia-laboratorio.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { materiaPorId } from "@shared/academia";
import { LABORATORIO, nivelConCritica, nivelDe, notaPractica } from "@shared/laboratorio";
import { PRACTICAS, practicaPorId } from "./academia/laboratorio/index";
import { MAX_PASO, type PracticaDef } from "./academia/laboratorio/tipos";
import {
  distanciaOrden, estadoValido, nuevoEstado, pasosDe, responder, resultado, terminado, varianteDe, vistaPaso, type EstadoIntento,
} from "./academia-laboratorio-motor";

/** Un azar fijo, para que las pruebas se repitan igual. */
function azarFijo(semilla: number) {
  let x = semilla >>> 0;
  return () => {
    x = (x * 1664525 + 1013904223) >>> 0;
    return x / 2 ** 32;
  };
}

const variantes = (p: PracticaDef) => Array.from({ length: 1 + (p.variantes?.length ?? 0) }, (_, i) => i);

/** Recorre la práctica eligiendo en cada paso con «elegir» (el lugar en la práctica, no el mostrado). */
function recorrer(p: PracticaDef, variante: number, elegir: (paso: number) => number | number[], semilla = 7): EstadoIntento {
  let s = nuevoEstado(p, variante, azarFijo(semilla));
  while (!terminado(p, s)) {
    const orden = s.orden[s.paso];
    const quiero = elegir(s.paso);
    const entrada = Array.isArray(quiero) ? { orden: quiero.map((j) => orden.indexOf(j)) } : { k: orden.indexOf(quiero) };
    const r = responder(p, s, entrada);
    assert.ok(!("error" in r), `${p.id}: ${"error" in r ? r.error : ""}`);
    if ("error" in r) break;
    s = r.estado;
  }
  return s;
}

function todosLosTextos(x: unknown, out: string[] = []): string[] {
  if (typeof x === "string") out.push(x);
  else if (Array.isArray(x)) x.forEach((y) => todosLosTextos(y, out));
  else if (x && typeof x === "object") Object.values(x).forEach((y) => todosLosTextos(y, out));
  return out;
}

test("cada práctica está bien armada", () => {
  assert.ok(PRACTICAS.length >= 4);
  assert.equal(new Set(PRACTICAS.map((p) => p.id)).size, PRACTICAS.length, "ids repetidos");
  for (const p of PRACTICAS) {
    assert.equal(practicaPorId(p.id), p);
    const m = materiaPorId(p.materia);
    assert.ok(m, `${p.id}: no existe la materia ${p.materia}`);
    assert.ok(m!.disponible, `${p.id}: la materia no está publicada`);
    assert.ok(p.lecciones.length > 0);
    for (const n of p.lecciones) assert.ok(n >= 1 && n <= m!.lecciones.length, `${p.id}: no hay lección ${n}`);
    assert.equal(p.competencias.reduce((a, c) => a + c.peso, 0), 100, `${p.id}: los pesos no suman 100`);
    assert.equal(new Set(p.competencias.map((c) => c.id)).size, p.competencias.length);
    const medidores = new Set((p.medidores ?? []).map((x) => x.id));
    if (p.formato === "ordenar") {
      assert.ok(p.rondas?.length && !p.escenas?.length, `${p.id}: ordenar lleva rondas`);
      for (const r of p.rondas!) {
        assert.equal(r.opciones.length, 4, `${p.id}/${r.id}: cuatro opciones`);
        assert.ok(!r.opciones[0].critica, `${p.id}/${r.id}: la mejor no puede ser crítica`);
        assert.ok(p.competencias.some((c) => c.id === r.competencia), `${p.id}/${r.id}: competencia ${r.competencia}`);
      }
    } else {
      assert.ok(p.escenas?.length && !p.rondas?.length, `${p.id}: lleva escenas`);
      const base = new Set(p.escenas!.map((e) => e.id));
      assert.equal(base.size, p.escenas!.length, `${p.id}: escenas repetidas`);
      for (const v of p.variantes ?? []) for (const e of v.escenas) assert.ok(base.has(e.id), `${p.id}/${v.id}: no reemplaza a ninguna escena (${e.id})`);
      for (const variante of variantes(p)) {
        const vistas: string[] = [];
        for (const x of pasosDe(p, variante)) {
          assert.equal(x.tipo, "escena");
          if (x.tipo !== "escena") continue;
          const e = x.e;
          assert.ok(p.competencias.some((c) => c.id === e.competencia), `${p.id}/${e.id}: competencia ${e.competencia}`);
          assert.ok(e.opciones.length >= 3 && e.opciones.length <= 4, `${p.id}/${e.id}: de 3 a 4 opciones`);
          const ejemplares = e.opciones.filter((o) => o.ejemplar);
          assert.equal(ejemplares.length, 1, `${p.id}/${e.id}: una sola ejemplar`);
          assert.equal(ejemplares[0].puntos, MAX_PASO, `${p.id}/${e.id}: la ejemplar vale ${MAX_PASO}`);
          assert.ok(!ejemplares[0].critica, `${p.id}/${e.id}: la ejemplar no es crítica`);
          for (const o of e.opciones) {
            if (!o.ejemplar) assert.ok(o.puntos >= 0 && o.puntos < MAX_PASO, `${p.id}/${e.id}: puntos de «${o.texto}»`);
            if (o.critica) assert.equal(o.puntos, 0, `${p.id}/${e.id}: una crítica vale 0`);
            for (const k of Object.keys(o.efectos ?? {})) assert.ok(medidores.has(k), `${p.id}/${e.id}: medidor ${k}`);
            if (p.formato === "conversacion") assert.ok(o.responde, `${p.id}/${e.id}: en una conversación, cada opción tiene respuesta`);
          }
          if (p.formato === "conversacion") assert.ok(e.quien && e.dice, `${p.id}/${e.id}: cada turno tiene quién habla`);
          if (e.segun) assert.ok(vistas.includes(e.segun.escena), `${p.id}/${e.id}: depende de una escena anterior`);
          vistas.push(e.id);
        }
        // cada competencia se mide en esta versión
        for (const c of p.competencias) assert.ok(pasosDe(p, variante).some((x) => x.tipo === "escena" && x.e.competencia === c.id), `${p.id}: ${c.id} sin escenas`);
      }
    }
    if (p.formato === "ordenar") for (const c of p.competencias) assert.ok(p.rondas!.some((r) => r.competencia === c.id), `${p.id}: ${c.id} sin rondas`);
    // los textos: sin comillas angulares (son de la RV1960), sin el plazo equivocado y sin espacios de más
    for (const t of todosLosTextos(p)) {
      assert.ok(!/[«»]/.test(t), `${p.id}: comillas angulares en «${t.slice(0, 60)}»`);
      assert.ok(!/48 horas/.test(t), `${p.id}: el plazo de Texas es de 24 horas`);
      assert.ok(t === t.trim() && !/ {2}/.test(t), `${p.id}: espacios de más en «${t.slice(0, 60)}»`);
    }
  }
});

test("el camino ejemplar da 100 y todo Ejemplar, en cada versión", () => {
  for (const p of PRACTICAS) {
    for (const variante of variantes(p)) {
      const pasos = pasosDe(p, variante);
      const s = recorrer(p, variante, (i) => {
        const x = pasos[i];
        return x.tipo === "escena" ? x.e.opciones.findIndex((o) => o.ejemplar) : x.r.opciones.map((_, j) => j);
      });
      const r = resultado(p, s);
      assert.equal(r.nota, 100, `${p.id} (versión ${variante})`);
      assert.equal(r.criticas.length, 0);
      assert.ok(r.competencias.every((c) => c.pct === 100 && c.nivel === "Ejemplar"), `${p.id}: ${JSON.stringify(r.competencias)}`);
      assert.ok(r.camino.every((c) => c.bien));
      assert.equal(r.distinto.length, 0);
      assert.equal(r.bien.length, pasos.length);
    }
  }
});

test("con una acción crítica la nota queda en 60 como máximo", () => {
  for (const p of PRACTICAS) {
    for (const variante of variantes(p)) {
      const pasos = pasosDe(p, variante);
      const hayCritica = pasos.some((x) => (x.tipo === "escena" ? x.e.opciones.some((o) => o.critica) : x.r.opciones.some((o) => o.critica)));
      if (!hayCritica) continue;
      // la ejemplar en todo, menos en el primer paso con una crítica
      const primera = pasos.findIndex((x) => (x.tipo === "escena" ? x.e.opciones.some((o) => o.critica) : x.r.opciones.some((o) => o.critica)));
      const s = recorrer(p, variante, (i) => {
        const x = pasos[i];
        if (x.tipo === "escena") return i === primera ? x.e.opciones.findIndex((o) => o.critica) : x.e.opciones.findIndex((o) => o.ejemplar);
        if (i !== primera) return x.r.opciones.map((_, j) => j);
        const c = x.r.opciones.findIndex((o) => o.critica);
        return [c, ...x.r.opciones.map((_, j) => j).filter((j) => j !== c)];
      });
      const r = resultado(p, s);
      assert.equal(r.criticas.length, 1, `${p.id} (versión ${variante})`);
      assert.ok(r.nota <= LABORATORIO.topeConCritica, `${p.id}: ${r.nota}`);
      const conCritica = r.competencias.filter((c) => c.conCritica);
      assert.equal(conCritica.length, 1);
      assert.notEqual(conCritica[0].nivel, "Ejemplar");
      assert.notEqual(conCritica[0].nivel, "Competente");
    }
  }
});

test("el peor camino no pasa de Inicial y muestra lo que haría distinto", () => {
  const p = practicaPorId("consejeria-mensaje-de-noche")!;
  const pasos = pasosDe(p, 0);
  const s = recorrer(p, 0, (i) => {
    const x = pasos[i];
    if (x.tipo !== "escena") return 0;
    let peor = 0;
    x.e.opciones.forEach((o, j) => {
      if (o.puntos < x.e.opciones[peor].puntos || (o.critica && !x.e.opciones[peor].critica)) peor = j;
    });
    return peor;
  });
  const r = resultado(p, s);
  assert.ok(r.nota <= 60);
  assert.ok(r.criticas.length >= 1);
  assert.equal(r.bien.length, 0);
  assert.equal(r.distinto.length, pasos.length);
  assert.ok(r.competencias.every((c) => c.nivel === "Inicial"));
});

test("las frases que dependen de lo que eligió antes", () => {
  const p = practicaPorId("consejeria-mensaje-de-noche")!;
  const pasos = pasosDe(p, 0);
  const llamada = pasos[1].tipo === "escena" ? pasos[1].e : null;
  assert.ok(llamada?.segun);
  // bien en la primera: la frase «si»
  let s = nuevoEstado(p, 0, azarFijo(3));
  const ejemplar = pasos[0].tipo === "escena" ? pasos[0].e.opciones.findIndex((o) => o.ejemplar) : 0;
  let r = responder(p, s, { k: s.orden[0].indexOf(ejemplar) });
  assert.ok(!("error" in r));
  if ("error" in r) return;
  let v = vistaPaso(p, r.estado);
  assert.ok(v?.tipo === "escena" && v.narra.includes(llamada!.segun!.si));
  // otra en la primera: la frase «no»
  s = nuevoEstado(p, 0, azarFijo(3));
  r = responder(p, s, { k: s.orden[0].indexOf(ejemplar === 0 ? 1 : 0) });
  assert.ok(!("error" in r));
  if ("error" in r) return;
  v = vistaPaso(p, r.estado);
  assert.ok(v?.tipo === "escena" && v.narra.includes(llamada!.segun!.no));
});

test("lo que ve el alumno no trae los puntos ni cuál es la ejemplar", () => {
  for (const p of PRACTICAS) {
    const s = nuevoEstado(p, 0, azarFijo(11));
    const v = vistaPaso(p, s);
    assert.ok(v);
    const json = JSON.stringify(v);
    assert.ok(!/puntos|ejemplar|critica|explica|porque/.test(json), `${p.id}: ${json.slice(0, 120)}`);
  }
});

test("las respuestas que no valen no cambian nada", () => {
  const p = practicaPorId("consejeria-mensaje-de-noche")!;
  const s = nuevoEstado(p, 0, azarFijo(5));
  for (const k of [-1, 4, 1.5, "1", null, undefined]) assert.ok("error" in responder(p, s, { k }));
  const z = practicaPorId("homiletica-devocional-zaqueo")!;
  const sz = nuevoEstado(z, 0, azarFijo(5));
  for (const orden of [[0, 1, 2], [0, 0, 1, 2], [0, 1, 2, 4], "0123", null]) assert.ok("error" in responder(z, sz, { orden }));
  assert.ok(!("error" in responder(z, sz, { orden: [3, 2, 1, 0] })));
});

test("ordenar: la distancia y los puntos", () => {
  assert.deepEqual(distanciaOrden([0, 1, 2, 3]), { d: 0, max: 8 });
  assert.deepEqual(distanciaOrden([3, 2, 1, 0]), { d: 8, max: 8 });
  assert.deepEqual(distanciaOrden([1, 0, 2, 3]), { d: 2, max: 8 });
  const z = practicaPorId("homiletica-devocional-zaqueo")!;
  const s = nuevoEstado(z, 0, azarFijo(9));
  // la mejor y la segunda cambiadas de lugar: 1,5 de 2 puntos
  const r = responder(z, s, { orden: [1, 0, 2, 3].map((j) => s.orden[0].indexOf(j)) });
  assert.ok(!("error" in r));
  if ("error" in r) return;
  assert.equal(r.consecuencia.puntos, 1.5);
  assert.equal(r.consecuencia.orden?.[0].tuLugar, 2);
  assert.equal(r.consecuencia.critica, null);
});

test("al ordenar, las opciones nunca se muestran ya ordenadas", () => {
  const z = practicaPorId("homiletica-devocional-zaqueo")!;
  for (let semilla = 1; semilla < 400; semilla++) {
    const s = nuevoEstado(z, 0, azarFijo(semilla));
    for (const o of s.orden) {
      assert.ok(!o.every((x, i) => x === i), `semilla ${semilla}: ${o}`);
      assert.deepEqual([...o].sort(), [0, 1, 2, 3]);
    }
  }
  // un azar que siempre da lo mismo tampoco las deja en orden
  const fijo = nuevoEstado(z, 0, () => 0.999999);
  assert.ok(fijo.orden.every((o) => !o.every((x, i) => x === i)));
});

test("cada intento trae la versión siguiente", () => {
  const p = practicaPorId("consejeria-mensaje-de-noche")!;
  assert.deepEqual([1, 2, 3, 4].map((i) => varianteDe(p, i)), [0, 1, 0, 1]);
  const z = practicaPorId("homiletica-devocional-zaqueo")!;
  assert.deepEqual([1, 2, 3].map((i) => varianteDe(z, i)), [0, 0, 0]);
  const base = pasosDe(p, 0).find((x) => x.tipo === "escena" && x.e.id === "peligro");
  const otra = pasosDe(p, 1).find((x) => x.tipo === "escena" && x.e.id === "peligro");
  assert.ok(base?.tipo === "escena" && otra?.tipo === "escena");
  if (base?.tipo !== "escena" || otra?.tipo !== "escena") return;
  assert.notEqual(otra.e.titulo, base.e.titulo);
  assert.equal(pasosDe(p, 1).length, pasosDe(p, 0).length);
});

test("el estado guardado se vuelve a leer igual, y uno roto no", () => {
  const p = practicaPorId("ninez-lo-que-conto-ana")!;
  const s = nuevoEstado(p, 0, azarFijo(21));
  const leido = estadoValido(p, JSON.parse(JSON.stringify(s)));
  assert.deepEqual(leido, s);
  assert.equal(estadoValido(p, { ...s, variante: 9 }), null);
  assert.equal(estadoValido(p, { ...s, orden: s.orden.slice(1) }), null);
  assert.equal(estadoValido(p, null), null);
});

test("los niveles y la nota", () => {
  assert.equal(nivelDe(95), "Ejemplar");
  assert.equal(nivelDe(70), "Competente");
  assert.equal(nivelDe(45), "En desarrollo");
  assert.equal(nivelDe(10), "Inicial");
  assert.equal(nivelConCritica(100, true), "En desarrollo");
  assert.equal(nivelConCritica(20, true), "Inicial");
  assert.equal(notaPractica([{ pct: 100, peso: 50 }, { pct: 50, peso: 50 }], 0), 75);
  assert.equal(notaPractica([{ pct: 100, peso: 50 }, { pct: 100, peso: 50 }], 1), 60);
});
