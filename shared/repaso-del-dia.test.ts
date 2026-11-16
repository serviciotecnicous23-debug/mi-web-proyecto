import { test } from "node:test";
import assert from "node:assert/strict";
import { CAJA_PREGUNTA_DOMINADA, REPASO_PREGUNTA_DIAS, intercalar, siguientePregunta } from "./repaso-del-dia";
import { PALABRAS_POR_MINUTO, contarPalabras, minutosDeLeccion } from "./academia-carga";

test("una pregunta acertada vuelve a los 1, 3, 7, 21 y 60 días y después queda dominada", () => {
  assert.deepEqual([...REPASO_PREGUNTA_DIAS], [1, 3, 7, 21, 60]);
  let caja = 1;
  const dias: (number | null)[] = [];
  for (let i = 0; i < 6; i++) {
    const s = siguientePregunta(caja, true);
    caja = s.caja;
    dias.push(s.dias);
  }
  assert.deepEqual(dias, [3, 7, 21, 60, null, null]);
  assert.equal(caja, CAJA_PREGUNTA_DOMINADA);
});

test("una pregunta fallada vuelve a la primera caja y a mañana", () => {
  assert.deepEqual(siguientePregunta(4, false), { caja: 1, dias: 1 });
  assert.deepEqual(siguientePregunta(1, false), { caja: 1, dias: 1 });
  // una caja rara (0 o negativa) cuenta como la primera
  assert.deepEqual(siguientePregunta(0, true), { caja: 2, dias: 3 });
});

test("intercalar mezcla una de cada materia por vuelta, en orden, hasta el máximo", () => {
  const lista = [
    { id: "a1", materiaId: "a" }, { id: "a2", materiaId: "a" }, { id: "a3", materiaId: "a" },
    { id: "b1", materiaId: "b" },
    { id: "c1", materiaId: "c" }, { id: "c2", materiaId: "c" },
  ];
  assert.deepEqual(intercalar(lista, 10).map((x) => x.id), ["a1", "b1", "c1", "a2", "c2", "a3"]);
  assert.deepEqual(intercalar(lista, 4).map((x) => x.id), ["a1", "b1", "c1", "a2"]);
  assert.deepEqual(intercalar([], 10), []);
});

test("los minutos de una lección salen de lo que de verdad pide", () => {
  assert.equal(contarPalabras("  Dios   es amor "), 3);
  assert.equal(contarPalabras(undefined), 0);
  // 450 palabras y 2 versículos en el Nivel 1 (150 ppm): 3,4 min; 3 preguntas: 2 min; para la vida: 2 → 7
  assert.equal(minutosDeLeccion({ palabras: 450, versiculos: 2, videos: [], preguntasRepaso: 3, nivel: 1 }), 7);
  // con un video de 6 minutos: 13
  assert.equal(minutosDeLeccion({ palabras: 450, versiculos: 2, videos: [6], preguntasRepaso: 3, nivel: 1 }), 13);
  // el mismo texto en el Nivel 4 se lee más despacio
  assert.ok(minutosDeLeccion({ palabras: 900, versiculos: 5, videos: [], preguntasRepaso: 3, nivel: 4 }) > minutosDeLeccion({ palabras: 900, versiculos: 5, videos: [], preguntasRepaso: 3, nivel: 1 }));
  // un video sin duración cuenta 3 minutos; una especialidad lee como el Nivel 3
  assert.equal(minutosDeLeccion({ palabras: 0, versiculos: 0, videos: [null], preguntasRepaso: 0, nivel: null }), 5);
  assert.equal(PALABRAS_POR_MINUTO[3], 130);
  // nunca menos de 5
  assert.equal(minutosDeLeccion({ palabras: 10, versiculos: 0, videos: [], preguntasRepaso: 0, nivel: 1 }), 5);
});
