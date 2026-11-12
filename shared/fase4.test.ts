// La fase 4 de la economía (la ciudad y el mundo): el arca de Joás, invitar a un amigo y el álbum.
import { test } from "node:test";
import assert from "node:assert/strict";
import { ARCA_MAXIMO_DIA, ARCA_MINIMO, ARCA_TITULO_DESDE, cuantoSeEcha, metaDelArca } from "./arca";
import { ALFABETO_CODIGO, INVITAR, LARGO_CODIGO, PRENDA_AMIGO, enlaceDeInvitacion, normalizarCodigo } from "./invitar";
import { COLECCIONES, COLECCIONISTA, EN_EL_ALBUM, GRAN_COLECCIONISTA, TITULOS_ESPECIALES, leerAlbum, nombreDeTitulo, titulosGanados } from "./album";
import { ARTICULOS, ROPA_DEL_ANIO, articulo } from "./mercado";
import { rangoDeCosa } from "./taller";
import { COPA_PUNTOS } from "./barrio-juntos";

test("el arca de Joás: la meta según la gente, de 3.000 a 300.000", () => {
  assert.equal(metaDelArca(0), 3000);
  assert.equal(metaDelArca(1), 3000);
  assert.equal(metaDelArca(10), 15000);
  assert.equal(metaDelArca(33), 49500);
  assert.equal(metaDelArca(10_000), 300000);
  // nadie la llena solo en un día, ni con la meta más chica
  assert.ok(metaDelArca(0) > ARCA_MAXIMO_DIA * 5);
  assert.ok(ARCA_MINIMO <= ARCA_TITULO_DESDE && ARCA_TITULO_DESDE <= ARCA_MAXIMO_DIA);
  assert.equal(COPA_PUNTOS.arca, 1);
});

test("lo que se echa en el arca: sin pasar de lo que falta, de lo que queda hoy ni del gozo", () => {
  assert.equal(cuantoSeEcha(100, { falta: 5000, quedaHoy: 500, gozo: 900 }), 100);
  assert.equal(cuantoSeEcha(800, { falta: 5000, quedaHoy: 500, gozo: 900 }), 500);
  assert.equal(cuantoSeEcha(800, { falta: 5000, quedaHoy: 300, gozo: 900 }), 300);
  assert.equal(cuantoSeEcha(800, { falta: 120, quedaHoy: 500, gozo: 900 }), 120);
  assert.equal(cuantoSeEcha(800, { falta: 5000, quedaHoy: 500, gozo: 70 }), 70);
  assert.equal(cuantoSeEcha(50.9, { falta: 5000, quedaHoy: 500, gozo: 900 }), 50);
  assert.equal(cuantoSeEcha(-3, { falta: 5000, quedaHoy: 500, gozo: 900 }), 0);
});

test("invita a un amigo: los códigos y el enlace", () => {
  assert.equal(LARGO_CODIGO, 6);
  for (const ch of "0O1I") assert.ok(!ALFABETO_CODIGO.includes(ch), `sin ${ch}`);
  assert.equal(normalizarCodigo("abcd-23x"), null, "7 letras");
  assert.equal(normalizarCodigo("abc-23x"), "ABC23X", "el guion no cuenta");
  assert.equal(normalizarCodigo(" ab c23x "), "ABC23X");
  assert.equal(normalizarCodigo("ab-c2-3x"), "ABC23X");
  assert.equal(normalizarCodigo("ABC2O3"), null, "con O");
  assert.equal(normalizarCodigo(123456), null);
  assert.equal(enlaceDeInvitacion("https://ministerioavivandoelfuego.com/", "ABC23X"), "https://ministerioavivandoelfuego.com/juegos/aprendiz-del-templo?invita=ABC23X");
  assert.deepEqual([INVITAR.dias, INVITAR.gozoInvitado, INVITAR.gozoQuienInvita, INVITAR.maxPremiados, INVITAR.diasParaUsar], [3, 100, 150, 10, 14]);
});

test("la faja del buen amigo: no se vende ni se cambia", () => {
  const f = articulo(PRENDA_AMIGO.id);
  assert.ok(f);
  assert.equal(f!.exclusivo, "amigo");
  assert.equal(f!.categoria, "ropa");
  assert.ok(f!.id.startsWith("faja-"), "es una faja (se pone en la cintura)");
  assert.equal(rangoDeCosa(f!.id), null);
});

test("el álbum: las colecciones salen del mercado y no se repiten", () => {
  const vistos = new Set<string>();
  for (const c of COLECCIONES) {
    assert.ok(c.items.length > 0, c.id);
    for (const i of c.items) {
      assert.ok(articulo(i), i);
      assert.ok(!vistos.has(i), `${i} en dos colecciones`);
      vistos.add(i);
    }
  }
  const n = (id: string) => COLECCIONES.find((c) => c.id === id)!.items.length;
  assert.equal(n("muebles"), 20);
  assert.equal(n("muebles-finos"), 20);
  assert.equal(n("ropa"), 7);
  assert.equal(n("ropa-del-anio"), ROPA_DEL_ANIO.length);
  assert.equal(n("ropa-fina"), 19);
  assert.equal(n("adornos"), ARTICULOS.filter((a) => a.categoria === "adorno").length);
  assert.ok(COLECCIONES.find((c) => c.id === "ganado")!.items.includes(PRENDA_AMIGO.id));
  // lo que no va en el álbum: las semillas y el letrero
  assert.ok(!EN_EL_ALBUM.has("trigo") && !EN_EL_ALBUM.has("letrero"));
  assert.ok(GRAN_COLECCIONISTA <= EN_EL_ALBUM.size && COLECCIONISTA < GRAN_COLECCIONISTA);
});

test("los títulos del álbum", () => {
  assert.deepEqual(titulosGanados(new Set(), { dador: false, amigo: false }), []);
  const ropa = COLECCIONES.find((c) => c.id === "ropa")!;
  assert.deepEqual(titulosGanados(new Set(ropa.items), { dador: false, amigo: false }), ["ropa"]);
  assert.deepEqual(titulosGanados(new Set(ropa.items.slice(1)), { dador: true, amigo: true }), ["dador-alegre", "buen-amigo"]);
  const todo = new Set(EN_EL_ALBUM);
  const t = titulosGanados(todo, { dador: false, amigo: false });
  for (const c of COLECCIONES) assert.ok(t.includes(c.id), c.id);
  assert.ok(t.includes("coleccionista") && t.includes("gran-coleccionista"));
  // cuarenta cosas cualesquiera ya son «Coleccionista»
  assert.ok(titulosGanados(new Set([...EN_EL_ALBUM].slice(0, COLECCIONISTA)), { dador: false, amigo: false }).includes("coleccionista"));
  assert.equal(nombreDeTitulo("ropa-fina"), "Bordador de oro");
  assert.equal(nombreDeTitulo("dador-alegre"), "Dador alegre");
  assert.equal(nombreDeTitulo("no-existe"), null);
  assert.equal(nombreDeTitulo(null), null);
  // los nombres de los títulos no se repiten
  const nombres = [...COLECCIONES.map((c) => c.titulo), ...TITULOS_ESPECIALES.map((x) => x.titulo)];
  assert.equal(new Set(nombres).size, nombres.length);
  // lo guardado se lee con cuidado
  assert.deepEqual(leerAlbum(["silla", "silla", "trigo", 3, "nada"]), ["silla"]);
  assert.deepEqual(leerAlbum(null), []);
});
