// La banda sonora: qué pista suena en cada lugar y en cada juego, cómo se alternan las variantes, y que cada pista
// exista como archivo en client/public/musica (y no pese de más).
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, statSync } from "node:fs";
import { join } from "node:path";
import {
  PISTAS, ZONAS_MUSICA, lugarDeCiudad, lugarDeEdificio, lugarDeJuego, lugarDelTemplo, lugarDeVentana, rutaDePista, siguientePista,
  type LugarMusica,
} from "../client/src/games/templo/banda-sonora";

const CARPETA = join(process.cwd(), "client", "public", "musica");

test("cada lugar tiene al menos una pista, y cada pista existe y pesa menos de 3 MB", () => {
  const todas = Object.values(PISTAS).flat();
  assert.ok(todas.length >= 25, `solo ${todas.length} pistas`);
  for (const pista of [...todas, "victoria", "derrota"]) {
    const ruta = join(CARPETA, `${pista}.m4a`);
    assert.ok(existsSync(ruta), `falta ${pista}.m4a`);
    const kb = statSync(ruta).size / 1024;
    assert.ok(kb > 8 && kb < 3 * 1024, `${pista}.m4a pesa ${Math.round(kb)} KB`);
  }
  assert.equal(rutaDePista("casa"), "/musica/casa.m4a");
});

test("la ciudad: cada zona con su música, de día y de noche, y la fiesta en la plaza", () => {
  const centro = (r: readonly number[]) => [(r[0] + r[2]) / 2, (r[1] + r[3]) / 2] as const;
  const [px, pz] = centro(ZONAS_MUSICA.patio);
  const [sx, sz] = centro(ZONAS_MUSICA.siervos);
  const [mx, mz] = centro(ZONAS_MUSICA.mercado);
  assert.equal(lugarDeCiudad(px, pz, false, false), "patio");
  assert.equal(lugarDeCiudad(px, pz, true, true), "patio");
  assert.equal(lugarDeCiudad(sx, sz, false, false), "siervos");
  assert.equal(lugarDeCiudad(sx, sz, true, false), "ciudad-noche");
  assert.equal(lugarDeCiudad(mx, mz, false, false), "mercado");
  assert.equal(lugarDeCiudad(mx, mz, false, true), "fiesta");
  assert.equal(lugarDeCiudad(56, -6, false, false), "ciudad-dia");
  assert.equal(lugarDeCiudad(56, -6, true, false), "ciudad-noche");
  assert.equal(lugarDeCiudad(56, -6, false, true), "fiesta");
  // las calles de los barrios
  assert.equal(lugarDeCiudad(110, 40, false, false), "barrio");
  assert.equal(lugarDeCiudad(110, 40, true, false), "ciudad-noche");
});

test("el templo, los edificios y las casas", () => {
  assert.equal(lugarDelTemplo(false, false), "templo-dia");
  assert.equal(lugarDelTemplo(true, false), "templo-noche");
  assert.equal(lugarDelTemplo(true, true), "fiesta");
  assert.equal(lugarDeEdificio("escuela"), "escuela");
  assert.equal(lugarDeEdificio("palacio"), "palacio");
  assert.equal(lugarDeEdificio("camara"), "camara");
  assert.equal(lugarDeEdificio(undefined), "casa");
});

test("cada juego con su estilo: los de mesa piensan, los de grupo se ríen, los rápidos corren", () => {
  const casos: [string, LugarMusica][] = [
    ["ajedrez", "juegos-mesa"],
    ["damas", "juegos-mesa"],
    ["domino", "juegos-mesa"],
    ["parchis", "juegos-mesa"],
    ["cuatro-en-raya", "juegos-mesa"],
    ["damas-chinas", "juegos-mesa"],
    ["memoria", "juegos-mesa"],
    ["esgrima", "juegos-rapidos"],
    ["carrera", "juegos-rapidos"],
    ["muro", "juegos-fiesta"],
    ["loteria", "juegos-grupo"],
    ["generala", "juegos-grupo"],
    ["escaleras", "juegos-grupo"],
    ["basta", "juegos-grupo"],
    ["dibuja", "juegos-grupo"],
    ["tribus", "juegos-grupo"],
    ["quien", "juegos-grupo"],
    ["noche-de-los-sabios", "sabio-tema"],
    ["duelo", "sabio-tema"],
    ["rango", "examen"],
    ["clase", "aula"],
    ["algo-nuevo", "patio"],
    ["sabio-suspenso", "sabio-suspenso"],
  ];
  for (const [juego, lugar] of casos) assert.equal(lugarDeJuego(juego), lugar, juego);
  assert.equal(lugarDeJuego(null), null);
  assert.equal(lugarDeJuego(""), null);
});

test("las ventanas con su música (las demás dejan sonar la del lugar)", () => {
  assert.equal(lugarDeVentana("sabio"), "sabio-tema");
  assert.equal(lugarDeVentana("aula"), "aula");
  assert.equal(lugarDeVentana("concurso"), "examen");
  assert.equal(lugarDeVentana("mercado"), null);
  assert.equal(lugarDeVentana(null), null);
});

test("las variantes se alternan para que la vuelta no se note", () => {
  assert.equal(siguientePista("ciudad-dia", null), "ciudad-dia-1");
  assert.equal(siguientePista("ciudad-dia", "ciudad-dia-1"), "ciudad-dia-2");
  assert.equal(siguientePista("ciudad-dia", "ciudad-dia-2"), "ciudad-dia-1");
  assert.equal(siguientePista("casa", "casa"), "casa");
  // una pista de otro lugar empieza por la primera
  assert.equal(siguientePista("patio", "casa"), "patio-1");
});
