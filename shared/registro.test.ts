// El registro de cada jugador: el tiempo en palabras y el resumen de la cabecera.
import { test } from "node:test";
import assert from "node:assert/strict";
import { NOMBRE_FIN, VERSO_REGISTRO, duracion, resumenRegistro, type RegistroJugador } from "./registro";

function vacio(): RegistroJugador {
  return {
    personajeId: 1,
    nombre: "Eleazar",
    titulo: null,
    esMio: false,
    desde: "2026-11-09",
    diasJugados: 0,
    racha: { actual: 0, mejor: 0, total: 0 },
    barrio: 1,
    personajes: [],
    estudios: { aprobados: [], enCurso: [], instruccion: { partes: 0, de: 3 }, catedras: [] },
    juegos: {
      sabio: { partidas: 0, mejor: 0, ganadas: 0, total: 0, ultimas: [] },
      duelos: { jugados: 0, ganados: 0 },
      concurso: { semanas: 0, mejor: null },
      consejos: { dados: 0, buenos: 0 },
    },
    casa: null,
    barrioHecho: { ayudas: 0, reuniones: 0, asistencias: 0, banquetes: 0, regalosDados: 0, regalosRecibidos: 0, piedras: 0, arca: 0, historia: 0, recados: 0 },
    logros: [],
    album: { cosas: 0, colecciones: [] },
  };
}

test("duracion: segundos, minutos y horas en palabras", () => {
  assert.equal(duracion(0), "0 s");
  assert.equal(duracion(45), "45 s");
  assert.equal(duracion(60), "1 min");
  assert.equal(duracion(200), "3 min 20 s");
  assert.equal(duracion(3600), "1 h");
  assert.equal(duracion(3720), "1 h 2 min");
  assert.equal(duracion(-5), "0 s");
});

test("resumen: quien recién llega no tiene nada que mostrar", () => {
  assert.deepEqual(resumenRegistro(vacio()), []);
});

test("resumen: lo más llamativo, como mucho cuatro cosas", () => {
  const r = vacio();
  r.personajes = [
    { id: 1, nombre: "Eleazar", camino: "sacerdocio", escalon: "Sacerdote de turno", merito: 200, puesto: 2, meritoSiempre: 1500, temporadas: 2, cargos: [] },
    { id: 2, nombre: "Samuel", camino: "profecia", escalon: "Vidente", merito: 50, puesto: 9, meritoSiempre: 300, temporadas: 1, cargos: [] },
  ];
  r.estudios.aprobados = [{ id: "a", titulo: "A", icono: "📖", fecha: "2026-11-10", perfecto: true, nota: 6, de: 6 }];
  r.juegos.sabio.mejor = 9;
  r.racha.mejor = 12;
  r.casa = { nivel: 1, estrellas: 3, obras: [], bendiciones: 4 };
  const res = resumenRegistro(r);
  assert.equal(res.length, 4);
  assert.match(res[0], /^Sacerdote de turno · 1\.?500 de mérito en total$/);
  assert.equal(res[1], "1 estudio aprobado");
  assert.equal(res[2], "Llegó a la grada 9 en «¿Quién es sabio?»");
  assert.equal(res[3], "Racha de 12 días");
});

test("los nombres de cómo terminó cada partida y el versículo", () => {
  assert.deepEqual(Object.keys(NOMBRE_FIN).sort(), ["gano", "perdio", "retiro", "tiempo"]);
  assert.equal(VERSO_REGISTRO.ref, "Apocalipsis 2:19");
  assert.ok(VERSO_REGISTRO.text.startsWith("Yo conozco tus obras"));
});
