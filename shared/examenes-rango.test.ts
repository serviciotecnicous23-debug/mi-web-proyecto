/**
 * Los exámenes de rango (shared/examenes-rango.ts, banco en server/examenes-rango-banco.ts): 12 exámenes de 3 o 4 partes,
 * bancos que alcanzan para repetir con preguntas nuevas, ids que no se repiten, las prendas que no se venden y el orden
 * de las opciones: «siempre la A» no debe aprobar.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { CAMINOS_LISTA } from "./caminos";
import { ARTICULOS, ofertasDelDia } from "./mercado";
import { COLECCIONES } from "./album";
import { ESCALONES_EXAMEN, EXAMENES_RANGO, MEDIDA_RANGO, PRENDAS_RANGO, REPASO_RANGO, esperaParteMin, examenRango, examenesDeCamino, idExamen } from "./examenes-rango";
import { BANCO_RANGO } from "../server/examenes-rango-banco";
import { opcionesDeExamen } from "../server/orden-examen";

test("hay un examen por camino para cada escalón del 2 al 5, con 3 o 4 partes", () => {
  assert.equal(EXAMENES_RANGO.length, 12);
  for (const c of CAMINOS_LISTA) {
    const lista = examenesDeCamino(c);
    assert.deepEqual(lista.map((e) => e.escalon), ESCALONES_EXAMEN);
    for (const e of lista) {
      assert.equal(e.id, idExamen(c, e.escalon));
      assert.equal(e.partes.length, e.escalon <= 3 ? 3 : 4, e.id);
      for (const p of e.partes) {
        assert.ok(p.titulo && p.tema, `${e.id} parte ${p.n}`);
        assert.ok(p.preguntas >= 6 && p.preguntas <= 8 && p.aprueba < p.preguntas, `${e.id} parte ${p.n}`);
      }
    }
  }
  assert.equal(examenRango("sacerdocio-5")?.rango, "Sumo sacerdote");
  assert.equal(examenRango("profecia-2")?.rango, "Vidente");
  assert.equal(examenRango("realeza-4")?.rango, "Consejero del rey");
  assert.equal(examenRango("nada"), undefined);
});

test("cada parte tiene banco para repetir con preguntas nuevas, y los ids no se repiten nunca", () => {
  const ids = new Set<string>();
  let total = 0;
  for (const e of EXAMENES_RANGO) {
    const partes = BANCO_RANGO[e.id];
    assert.equal(partes.length, e.partes.length, e.id);
    partes.forEach((banco, k) => {
      assert.ok(banco.length >= MEDIDA_RANGO[e.escalon].preguntas + 3, `${e.id} parte ${k + 1}: ${banco.length}`);
      for (const [id, pregunta, buena, falsas, explica, ref] of banco) {
        total++;
        assert.ok(!ids.has(id), `id repetido: ${id}`);
        ids.add(id);
        assert.ok(pregunta && buena && explica.includes("«") && /\d+:\d+/.test(ref), id);
        assert.equal(new Set([buena, ...falsas]).size, 4, `${id}: opciones repetidas`);
      }
    });
  }
  assert.equal(total, 423);
  // el repaso sale de los bancos 4 (y 5): alcanzan de sobra
  for (const c of CAMINOS_LISTA) assert.ok(BANCO_RANGO[idExamen(c, 4)].flat().length >= REPASO_RANGO.preguntas * 3);
});

test("la espera después de fallar una parte crece: 15, 30 y después 60 minutos", () => {
  assert.equal(esperaParteMin(0), 0);
  assert.equal(esperaParteMin(1), 15);
  assert.equal(esperaParteMin(2), 30);
  assert.equal(esperaParteMin(3), 60);
  assert.equal(esperaParteMin(9), 60);
});

test("cada examen abre lo de su rango y da su prenda, que no se vende ni sale en las ofertas", () => {
  const prendas = Object.values(PRENDAS_RANGO);
  assert.equal(new Set(prendas.map((p) => p.id)).size, 12);
  for (const e of EXAMENES_RANGO) {
    const a = ARTICULOS.find((x) => x.id === e.prenda.id);
    assert.ok(a && a.categoria === "ropa" && a.exclusivo === "rango" && a.precio === 0, e.prenda.id);
    assert.ok(/^(manto|faja)-/.test(e.prenda.id), e.prenda.id);
    assert.ok(e.abre.some((x) => x.includes(e.prenda.nombre)));
    if (e.escalon === 2) assert.ok(e.abre[0].startsWith("Ser «"), e.id);
    else assert.ok(e.abre[0].includes("recibir el cargo"), e.id);
    if (e.escalon === 3) assert.ok(e.abre.some((x) => x.includes("reuniones")), e.id);
    assert.equal(e.abre.some((x) => x.startsWith("Dar el examen")), e.escalon < 5, e.id);
  }
  for (let dia = 0; dia < 60; dia++) for (const p of prendas) assert.ok(!ofertasDelDia(`2026-12-${String((dia % 28) + 1).padStart(2, "0")}`).includes(p.id));
  const col = COLECCIONES.find((c) => c.id === "rangos");
  assert.equal(col?.items.length, 12);
});

test("en las partes de rango la buena cae en cualquier letra y «siempre la A» casi nunca aprueba", () => {
  const lugar = [0, 0, 0, 0];
  let intentos = 0;
  let aprobadasA = 0;
  for (const e of EXAMENES_RANGO)
    BANCO_RANGO[e.id].forEach((banco, k) => {
      const { preguntas, aprueba } = MEDIDA_RANGO[e.escalon];
      for (let personaje = 1; personaje <= 60; personaje++) {
        // como el servidor: cada intento con su semilla y sus preguntas, cada una con su propio orden
        const semilla = (Math.imul(personaje, 7919) + k * 104729) | 0;
        const elegidas = banco.slice(personaje % (banco.length - preguntas + 1), (personaje % (banco.length - preguntas + 1)) + preguntas);
        let buenasA = 0;
        elegidas.forEach((f, i) => {
          const pos = opcionesDeExamen(f[0], f[2], f[3], semilla, i).indexOf(f[2]);
          lugar[pos]++;
          if (pos === 0) buenasA++;
        });
        intentos++;
        if (buenasA >= aprueba) aprobadasA++;
      }
    });
  const total = lugar.reduce((a, b) => a + b, 0);
  for (const v of lugar) assert.ok(v / total > 0.2 && v / total < 0.3, `la buena en A,B,C,D: ${lugar.map((x) => ((100 * x) / total).toFixed(1)).join(" ")}`);
  assert.ok(aprobadasA / intentos < 0.01, `«siempre la A» aprueba ${((100 * aprobadasA) / intentos).toFixed(2)} %`);
});
