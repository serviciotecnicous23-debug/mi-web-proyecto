// Pruebas de lo nuevo del Nivel 2 (parte 1): suficiencia, prueba diagnóstica, repaso espaciado del versículo y lo que
// pide una lección antes de su repaso. npx tsx --test shared/academia-a4.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  CAJA_DOMINADO, LECTURA, NIVELES, REPASO_VERSICULO_DIAS, SUFICIENCIA, apruebaSuficiencia, idYouTube, segundosDeLectura, siguienteRepaso,
  sugerenciaDiagnostico, videoQuePide, type DiagnosticoMateria,
} from "./academia";
import { DECLARACION_FE, PUNTOS_A_CONFIRMAR } from "./academia-declaracion";

test("la suficiencia pide las dos partes a la vez: 85 la objetiva y 75 la escrita", () => {
  assert.equal(SUFICIENCIA.intentos, 1);
  assert.ok(apruebaSuficiencia(85, 75));
  assert.ok(apruebaSuficiencia(100, 100));
  assert.ok(!apruebaSuficiencia(84.9, 100));
  assert.ok(!apruebaSuficiencia(100, 74));
});

const nivel1 = NIVELES.find((n) => n.n === 1)!.materias.filter((m) => m.disponible);
const perfecta = (id: string): DiagnosticoMateria => ({ id, titulo: id, nivel: 1, aciertos: 2, de: 2 });
const floja = (id: string): DiagnosticoMateria => ({ id, titulo: id, nivel: 1, aciertos: 1, de: 2 });

test("la diagnóstica sin nada aprobado sugiere empezar el Nivel 1 por su primera materia", () => {
  assert.ok(nivel1.length >= 2, "el Nivel 1 tiene materias con contenido");
  const s = sugerenciaDiagnostico(nivel1.map((m) => floja(m.id)), [], []);
  assert.equal(s.nivel, 1);
  assert.equal(s.empezar?.materiaId, nivel1[0].id);
  assert.deepEqual(s.suficiencia, []);
  assert.match(s.texto, /Empieza por/);
});

test("las materias que respondió todas bien quedan para la suficiencia, y empieza por la primera que no", () => {
  const s = sugerenciaDiagnostico([perfecta(nivel1[0].id), floja(nivel1[1].id)], [], []);
  assert.deepEqual(s.suficiencia.map((x) => x.materiaId), [nivel1[0].id]);
  assert.equal(s.empezar?.materiaId, nivel1[1].id);
  assert.match(s.texto, /suficiencia/);
});

test("si domina todo el nivel, no sugiere por dónde empezar: todas por suficiencia y el integral igual", () => {
  const s = sugerenciaDiagnostico(nivel1.map((m) => perfecta(m.id)), [], []);
  assert.equal(s.empezar, null);
  assert.equal(s.suficiencia.length, nivel1.length);
  assert.match(s.texto, /integral/);
});

test("lo aprobado no se sugiere otra vez, y sin nada pendiente pide cerrar el nivel", () => {
  const s = sugerenciaDiagnostico([], [], [nivel1[0].id]);
  assert.equal(s.empezar?.materiaId, nivel1[1].id);
  const todo = sugerenciaDiagnostico([], [], nivel1.map((m) => m.id));
  assert.equal(todo.empezar, null);
  assert.match(todo.texto, /examen integral/);
});

test("con el Nivel 1 completo, sugiere el siguiente nivel que tenga contenido", () => {
  const s = sugerenciaDiagnostico([], [1], nivel1.map((m) => m.id));
  assert.equal(s.nivel, 2);
  const n2 = NIVELES.find((n) => n.n === 2)!.materias.filter((m) => m.disponible);
  if (!n2.length) assert.equal(s.empezar, null);
  else assert.equal(s.empezar?.materiaId, n2[0].id);
});

test("el versículo vuelve a los 1, 3, 7 y 21 días; al pasar el último queda dominado", () => {
  assert.deepEqual([...REPASO_VERSICULO_DIAS], [1, 3, 7, 21]);
  assert.deepEqual(siguienteRepaso(1, true), { caja: 2, dias: 3 });
  assert.deepEqual(siguienteRepaso(2, true), { caja: 3, dias: 7 });
  assert.deepEqual(siguienteRepaso(3, true), { caja: 4, dias: 21 });
  assert.deepEqual(siguienteRepaso(4, true), { caja: CAJA_DOMINADO, dias: null });
  assert.deepEqual(siguienteRepaso(CAJA_DOMINADO, true), { caja: CAJA_DOMINADO, dias: null });
  assert.deepEqual(siguienteRepaso(0, true), { caja: 2, dias: 3 });
});

test("si falla el repaso, el versículo vuelve a la primera caja y mañana", () => {
  for (const caja of [1, 2, 3, 4]) assert.deepEqual(siguienteRepaso(caja, false), { caja: 1, dias: 1 }, `caja ${caja}`);
});

test("el repaso de la lección se abre tras leer el 40 % de sus minutos, entre 1 y 3 minutos", () => {
  assert.equal(segundosDeLectura(1), LECTURA.minimo);
  assert.equal(segundosDeLectura(5), 120);
  assert.equal(segundosDeLectura(6), 144);
  assert.equal(segundosDeLectura(10), LECTURA.maximo);
  assert.equal(segundosDeLectura(0), LECTURA.minimo);
});

test("reconoce los videos de YouTube en sus formas de enlace", () => {
  const id = "dQw4w9WgXcQ";
  for (const url of [
    `https://www.youtube.com/watch?v=${id}`,
    `https://youtube.com/watch?feature=share&v=${id}`,
    `https://youtu.be/${id}?t=30`,
    `https://www.youtube.com/embed/${id}`,
    `https://www.youtube.com/shorts/${id}`,
  ]) assert.equal(idYouTube(url), id, url);
  assert.equal(idYouTube("https://vimeo.com/123456"), null);
  assert.equal(idYouTube("https://www.facebook.com/watch/?v=123"), null);
});

test("el video pide sus primeros 2 minutos, o entero si dura menos", () => {
  const yt = "https://youtu.be/dQw4w9WgXcQ";
  assert.equal(videoQuePide([]), null);
  assert.equal(videoQuePide([{ t: "parrafo" }]), null);
  assert.equal(videoQuePide([{ t: "video", url: "https://vimeo.com/1" }]), null);
  assert.equal(videoQuePide([{ t: "video", url: yt, minutos: 10 }]), LECTURA.video);
  assert.equal(videoQuePide([{ t: "video", url: yt }]), LECTURA.video);
  assert.equal(videoQuePide([{ t: "video", url: yt, minutos: 1.5 }]), 90);
});

test("la declaración de fe: artículos numerados en orden, con citas, y sus puntos a confirmar", () => {
  DECLARACION_FE.articulos.forEach((a, i) => {
    assert.equal(a.n, i + 1);
    assert.ok(a.titulo && a.texto.length > 40, `artículo ${a.n}`);
    assert.ok(a.refs.length > 0, `artículo ${a.n} sin citas`);
  });
  assert.deepEqual(PUNTOS_A_CONFIRMAR.map((p) => p.n), [6, 9, 11, 13, 16]);
  for (const p of PUNTOS_A_CONFIRMAR) assert.ok(p.aConfirmar.length > 20, `artículo ${p.n}`);
});
