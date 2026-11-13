// «¿Quién es sabio?» más vivo y para grupos: las tablas por partida, el suspenso que crece con la grada, la escena de
// la duda con Etán (que nunca depende de la respuesta) y las reglas de la noche de los sabios.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  DUDA_CADA, DUDA_SIN_REPETIR, FRASES_DUDA, GRADAS, comoTermino, fraseDeDuda, gradaEnQueQuedo, ordenTabla, puntosDuelo, suspensoMs, tardaMucho, tiempoCorto,
  tocaDuda,
} from "./sabio";
import {
  LETRAS_CODIGO, NOCHE_GOZO, NOCHE_GOZO_RESTO, NOCHE_MAX, NOCHE_MIN, NOCHE_PREGUNTAS, NOCHE_SEGUNDOS, codigoNuevo, codigoValido, gozoDePuesto, limpiarCodigo,
  puestosDeNoche, puntosNoche,
} from "./sabio-noche";

/** Un azar que se puede repetir (para probar sin depender de la suerte): mezcla bien desde el primer número. */
function azarFijo(semilla: number): () => number {
  let a = (semilla * 2654435761) >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

test("las tablas: más puntos primero; si empatan, menos tiempo; después, quien terminó antes", () => {
  const filas = [
    { id: 1, puntos: 1000, segundos: 300, at: 10 },
    { id: 2, puntos: 3000, segundos: 500, at: 20 },
    { id: 3, puntos: 1000, segundos: 120, at: 30 },
    { id: 4, puntos: 1000, segundos: 120, at: 5 },
    { id: 5, puntos: 500000, segundos: 900, at: 40 },
  ];
  assert.deepEqual([...filas].sort(ordenTabla).map((f) => f.id), [5, 2, 4, 3, 1]);
});

test("la grada en que quedó y cómo terminó", () => {
  assert.equal(gradaEnQueQuedo("gano", 15), 15);
  assert.equal(gradaEnQueQuedo("perdio", 7), 8);
  assert.equal(gradaEnQueQuedo("tiempo", 3), 4);
  assert.equal(gradaEnQueQuedo("retiro", 9), 9);
  assert.equal(comoTermino("perdio", 7), "Falló la 8");
  assert.equal(comoTermino("tiempo", 0), "Se le acabó el tiempo en la 1");
  assert.equal(comoTermino("retiro", 0), "Se retiró al empezar");
  assert.equal(comoTermino("retiro", 12), "Se retiró en la 12");
  assert.equal(comoTermino("gano", 15), "Subió las 15");
  assert.equal(tiempoCorto(45), "45 s");
  assert.equal(tiempoCorto(187), "3:07");
  assert.equal(tiempoCorto(3900), "1 h 05 min");
});

test("el suspenso crece con la grada: 1,5 s en la primera y 4 s en la última", () => {
  assert.equal(suspensoMs(1), 1500);
  assert.equal(suspensoMs(GRADAS), 4000);
  for (let n = 2; n <= GRADAS; n++) assert.ok(suspensoMs(n) > suspensoMs(n - 1), `grada ${n}`);
  assert.equal(suspensoMs(0), 1500);
  assert.equal(suspensoMs(99), 4000);
});

test("la duda: siempre en las gradas seguras y desde la 11; las demás, cada 2 o 3 preguntas", () => {
  for (const cada of DUDA_CADA) {
    assert.equal(tocaDuda(5, 4, cada), true);
    assert.equal(tocaDuda(10, 9, cada), true);
    for (let n = 11; n <= GRADAS; n++) assert.equal(tocaDuda(n, n - 1, cada), true);
    assert.equal(tocaDuda(3, 2, cada), false);
    assert.equal(tocaDuda(2 + cada, 2, cada), true);
  }
  // una partida entera con la regla del servidor: nunca pasan más de 3 preguntas sin la escena
  for (let s = 1; s <= 200; s++) {
    const azar = azarFijo(s);
    let ultima = 0;
    let cada = DUDA_CADA[Math.floor(azar() * 2)];
    for (let n = 1; n <= GRADAS; n++) {
      if (tocaDuda(n, ultima, cada)) {
        assert.ok(n - ultima <= 3, `semilla ${s}, grada ${n}`);
        ultima = n;
        cada = DUDA_CADA[Math.floor(azar() * 2)];
      }
    }
  }
  assert.equal(tardaMucho(18, 30), true);
  assert.equal(tardaMucho(17.9, 30), false);
  assert.equal(tardaMucho(10, 0), false);
});

test("la duda nunca depende de la respuesta: sus reglas no la reciben", () => {
  // tocaDuda, tardaMucho y fraseDeDuda solo miran la grada, el reloj y las frases de antes
  assert.equal(tocaDuda.length, 3);
  assert.equal(tardaMucho.length, 2);
  assert.ok(fraseDeDuda.length <= 3);
  // la misma grada y la misma suerte dan la misma frase, sea cual sea la respuesta elegida
  assert.equal(fraseDeDuda(7, [], azarFijo(9)).id, fraseDeDuda(7, [], azarFijo(9)).id);
});

test("las frases de Etán: muchas, sin repetir seguido y con las de su grada", () => {
  assert.ok(FRASES_DUDA.length >= 24);
  assert.equal(new Set(FRASES_DUDA.map((f) => f.id)).size, FRASES_DUDA.length);
  assert.equal(new Set(FRASES_DUDA.map((f) => f.texto)).size, FRASES_DUDA.length);
  for (let s = 1; s <= 50; s++) {
    const azar = azarFijo(s);
    const dichas: string[] = [];
    for (let n = 1; n <= 40; n++) {
      const f = fraseDeDuda(((n - 1) % GRADAS) + 1, dichas, azar);
      assert.ok(!dichas.slice(-DUDA_SIN_REPETIR).includes(f.id), `semilla ${s}: ${f.id} se repitió`);
      dichas.push(f.id);
    }
  }
  // las de la grada segura solo salen en la 5 y la 10; las altas, desde la 11
  for (let s = 1; s <= 300; s++) {
    for (const n of [1, 2, 3, 4, 6, 7, 8, 9]) assert.ok(!fraseDeDuda(n, [], azarFijo(s)).cuando, `grada ${n}`);
    assert.notEqual(fraseDeDuda(5, [], azarFijo(s)).cuando, "alta");
    assert.notEqual(fraseDeDuda(12, [], azarFijo(s)).cuando, "segura");
  }
  const enLaCinco = new Set(Array.from({ length: 300 }, (_, s) => fraseDeDuda(5, [], azarFijo(s + 1)).cuando ?? "general"));
  assert.ok(enLaCinco.has("segura") && enLaCinco.has("general"));
});

test("la noche: de 3 a 12 personas, 12 preguntas de 20 s y los mismos puntos del duelo", () => {
  assert.equal(NOCHE_MIN, 3);
  assert.equal(NOCHE_MAX, 12);
  assert.equal(NOCHE_PREGUNTAS, 12);
  assert.equal(NOCHE_SEGUNDOS, 20);
  assert.equal(puntosNoche(0), 200);
  assert.equal(puntosNoche(20_000), 100);
  assert.equal(puntosNoche(5_000), puntosDuelo(5_000));
  assert.ok(puntosNoche(4_000) > puntosNoche(9_000));
});

test("el código de la sala: seis letras, sin I ni O, y se entiende como se escriba", () => {
  for (let s = 1; s <= 200; s++) {
    const c = codigoNuevo(azarFijo(s));
    assert.ok(codigoValido(c), c);
    assert.ok(![...c].some((x) => x === "I" || x === "O"));
  }
  assert.ok(!LETRAS_CODIGO.includes("I") && !LETRAS_CODIGO.includes("O"));
  assert.equal(limpiarCodigo(" abc-def "), "ABCDEF");
  assert.equal(limpiarCodigo("ab cd ef"), "ABCDEF");
  assert.equal(codigoValido(limpiarCodigo("abcde")), false);
  assert.equal(codigoValido("ABCDEI"), false);
  assert.equal(limpiarCodigo(null), "");
});

test("los puestos de la noche: puntos, luego rapidez; quien se fue, al final; el gozo por puesto", () => {
  const p = puestosDeNoche([
    { u: 1, puntos: 900, ms: 40_000, orden: 0 },
    { u: 2, puntos: 1200, ms: 70_000, orden: 1 },
    { u: 3, puntos: 900, ms: 30_000, orden: 2 },
    { u: 4, puntos: 1500, ms: 10_000, orden: 3, fuera: true },
    { u: 5, puntos: 900, ms: 30_000, orden: 4 },
  ]);
  assert.deepEqual(p.map((x) => [x.u, x.puesto]), [[2, 1], [3, 2], [5, 2], [1, 4], [4, 5]]);
  assert.equal(gozoDePuesto(1), NOCHE_GOZO[0]);
  assert.equal(gozoDePuesto(3), NOCHE_GOZO[2]);
  assert.equal(gozoDePuesto(7), NOCHE_GOZO_RESTO);
  assert.ok(NOCHE_GOZO[0] > NOCHE_GOZO[1] && NOCHE_GOZO[1] > NOCHE_GOZO[2] && NOCHE_GOZO[2] > NOCHE_GOZO_RESTO);
});
