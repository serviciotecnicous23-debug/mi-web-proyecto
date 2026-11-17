import { test } from "node:test";
import assert from "node:assert/strict";
import { EXAMEN_FINAL, MEDIDA_MINI, MINI_PRUEBA, conTiempoExtra, segundosDePregunta, textoSegundos } from "./academia";

const corta = { texto: "¿Quién escribió la carta a los Romanos?", correcta: "Pablo", falsas: ["Pedro", "Juan", "Santiago"] as const, bloom: "recordar" as const };
const caso = {
  texto:
    "Un hermano de tu iglesia dice que como ya fue perdonado puede seguir en el mismo pecado sin problema, porque la gracia lo cubre todo. Según la enseñanza de Pablo sobre la gracia y la santidad, ¿qué le responderías con amor y con la Biblia?",
  correcta: "Que la gracia no es permiso para pecar: nos libra del pecado para vivir una vida nueva",
  falsas: ["Que tiene razón, porque la gracia cubre todo lo que haga", "Que debe ganarse otra vez la salvación con buenas obras", "Que el pecado ya no importa porque Dios no ve a los creyentes"] as const,
  bloom: "analizar" as const,
};

test("una pregunta corta de memoria sigue con el tiempo base del examen", () => {
  assert.equal(segundosDePregunta(corta, EXAMEN_FINAL[3]), 60);
  assert.equal(segundosDePregunta(corta, MEDIDA_MINI), 60);
});

test("un caso largo para analizar tiene más tiempo, sin pasar del doble", () => {
  const s = segundosDePregunta(caso, EXAMEN_FINAL[3]);
  assert.ok(s > 60 && s <= 120, `un caso pide más de 60 s (${s})`);
  assert.equal(s % 5, 0, "en múltiplos de 5 segundos");
  // un texto enorme no pasa del doble
  const enorme = { ...caso, texto: caso.texto.repeat(6) };
  assert.equal(segundosDePregunta(enorme, EXAMEN_FINAL[3]), 120);
});

test("con tiempo extra, cada pregunta da 1,5 veces más", () => {
  const extra = conTiempoExtra(EXAMEN_FINAL[3]);
  assert.equal(segundosDePregunta(corta, extra), 90);
  assert.ok(segundosDePregunta(caso, extra) > segundosDePregunta(caso, EXAMEN_FINAL[3]));
  assert.ok(segundosDePregunta(caso, extra) <= 180);
});

test("las mini pruebas dan 60 segundos de base, como el final, y el texto lo dice", () => {
  assert.equal(MINI_PRUEBA.segundos, 60);
  assert.equal(textoSegundos(EXAMEN_FINAL[1]), "de 60 a 120 segundos cada una, según su largo y su dificultad");
});
