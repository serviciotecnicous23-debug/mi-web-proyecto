// Pruebas del análisis de preguntas: npx tsx --test server/academia-analisis.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { ANALISIS, banderasDe, biserial, cifrasDeEscritas, cifrasDePreguntas, gravedad, type IntentoRegistrado } from "./academia-analisis";

/** Un intento de 4 preguntas: cuáles acertó. */
const intento = (bien: Record<string, boolean>, extra: Partial<Record<string, { tarde?: boolean; elegida?: string }>> = {}): IntentoRegistrado => ({
  respuestas: Object.entries(bien).map(([id, b]) => ({ id, bien: b, tarde: !!extra[id]?.tarde, elegida: extra[id]?.elegida ?? null })),
});

test("la correlación punto biserial: positiva si la aciertan los que mejor van, negativa al revés", () => {
  assert.ok(biserial([1, 1, 0, 0], [0.9, 0.8, 0.2, 0.1])! > 0.9);
  assert.ok(biserial([0, 0, 1, 1], [0.9, 0.8, 0.2, 0.1])! < -0.9);
  assert.equal(biserial([1, 1, 1], [0.1, 0.5, 0.9]), null, "si todos la aciertan no se puede calcular");
  assert.equal(biserial([1, 0], [0.5, 0.5]), null, "con menos de 3 intentos tampoco");
  assert.equal(biserial([1, 0, 1, 0], [0.5, 0.5, 0.5, 0.5]), null, "ni si el resto no varía");
});

test("las cifras de cada pregunta: facilidad, discriminación, sin tiempo y la falsa más elegida", () => {
  const intentos: IntentoRegistrado[] = [];
  // 10 intentos: los 5 mejores aciertan «buena» y «a»; los 5 peores fallan «buena»; «reves» la aciertan solo los peores
  for (let k = 0; k < 5; k++) intentos.push(intento({ buena: true, a: true, b: true, reves: false }));
  for (let k = 0; k < 5; k++) intentos.push(intento({ buena: false, a: false, b: k < 3, reves: true }, { buena: { elegida: k < 4 ? "Con oro y plata" : "Con la ley" } }));
  const c = cifrasDePreguntas(intentos);
  const buena = c.get("buena")!;
  assert.equal(buena.n, 10);
  assert.equal(buena.facilidad, 50);
  assert.ok(buena.discriminacion! >= 0.4, `discrimina bien: ${buena.discriminacion}`);
  assert.deepEqual(buena.distractor, { texto: "Con oro y plata", veces: 4, parte: 80 });
  assert.deepEqual(buena.banderas, []);
  const reves = c.get("reves")!;
  assert.ok(reves.discriminacion! < 0, `la aciertan los que peor van: ${reves.discriminacion}`);
  assert.equal(reves.banderas[0], "Discrimina al revés");
});

test("los que se dejan vencer el reloj cuentan como malos y no como una opción elegida", () => {
  const intentos = Array.from({ length: 10 }, (_, k) => intento({ x: k < 5, y: true, z: k % 2 === 0 }, { x: k >= 5 ? { tarde: true } : {} }));
  const x = cifrasDePreguntas(intentos).get("x")!;
  assert.equal(x.tarde, 50);
  assert.equal(x.distractor, null);
  assert.ok(x.banderas.includes("Muchos se quedan sin tiempo"));
});

test("las banderas: pocos datos, muy difícil, muy fácil y discrimina poco", () => {
  assert.deepEqual(banderasDe(3, 50, 0.4, 0), ["Pocos datos (3 intentos)"]);
  assert.deepEqual(banderasDe(1, 50, null, 0), ["Pocos datos (1 intento)"]);
  assert.ok(banderasDe(ANALISIS.minimo, 10, 0.3, 0).includes("Muy difícil"));
  assert.ok(banderasDe(ANALISIS.minimo, 100, null, 0).includes("Muy fácil"));
  assert.ok(banderasDe(ANALISIS.minimo, 60, 0.05, 0).includes("Discrimina poco"));
  assert.deepEqual(banderasDe(ANALISIS.minimo, 60, 0.4, 0), []);
  assert.ok(gravedad(["Discrimina al revés"]) > gravedad(["Muy difícil", "Muy fácil"]));
});

test("un intento con una sola respuesta no cuenta (no hay «resto del examen»)", () => {
  const c = cifrasDePreguntas([{ respuestas: [{ id: "solo", bien: true, tarde: false }] }, { respuestas: [] }, { respuestas: null as any }]);
  assert.equal(c.size, 0);
});

test("las escritas: nota media, marcadas por el corrector y cambiadas por la revisión", () => {
  const filas = [
    ...Array.from({ length: 4 }, () => ({ pregunta_id: "e1", nota_auto: 40, nota_final: 80, marcas: 1 })),
    ...Array.from({ length: 6 }, () => ({ pregunta_id: "e1", nota_auto: 90, nota_final: null, marcas: 0 })),
    { pregunta_id: "e2", nota_auto: 70, nota_final: null, marcas: 1 },
  ];
  const c = cifrasDeEscritas(filas);
  const e1 = c.get("e1")!;
  assert.equal(e1.n, 10);
  assert.equal(e1.promedio, Math.round((4 * 80 + 6 * 90) / 10));
  assert.equal(e1.marcadas, 40);
  assert.equal(e1.cambiadas, 40);
  assert.equal(e1.cambioMedio, 40);
  assert.ok(e1.banderas[0].startsWith("La revisión la cambia seguido"));
  assert.deepEqual(c.get("e2")!.banderas, ["Pocos datos (1 respuesta)"]);
});
