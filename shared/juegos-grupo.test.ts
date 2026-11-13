// El patio de los juegos (shared/juegos-grupo.ts): el código de la sala, los puntos de «¿Quién soy?», el recorrido de la
// carrera (siempre por donde se puede caminar), el muro, las frases, las prendas que no se venden, su colección en el
// álbum, los logros y la copa del barrio.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  CANTERA, CARRERA, CODIGO_LETRAS, FRASES_SALA, GOZO_JUEGOS_DIA, GOZO_PUESTOS, JUEGOS, LLEGADA_CARRERA, LUGARES_CARRERA, MURO, ORDEN_JUEGOS, PATIO, PATIO_MESA,
  PATIO_SALIDA, PRENDAS_JUEGOS, QUIEN, QUIEN_RONDA_MS, TRAMO_CENTRO, TRIBUS_EQUIPOS, enElPatio, esJuego, limpiarCodigo, metaDelMuro, pistasVistas, puntosQuien,
  recorridoDeCarrera,
} from "./juegos-grupo";
import { ARTICULOS, ofertasDelDia } from "./mercado";
import { COLECCIONES, nombreDeTitulo } from "./album";
import { COPA_PUNTOS } from "./barrio-juntos";
import { LOGROS_EN_LINEA, ORDEN_LOGROS } from "./logros-en-linea";
import { ACTIVIDADES_CIUDAD, ACTIVIDAD_CIUDAD_TEXTO, LIMITES_CIUDAD, VERSICULOS_RAPIDOS, areaEn } from "./ciudad";
import { CALLES_DE_AREA } from "./parcelas";
import { caminable, obstaculosFijos, rellenoDeCasas } from "../client/src/games/templo/ciudad/plano";

const dentro = (x: number, z: number, r: [number, number, number, number], pad = 0) => x > r[0] - pad && x < r[2] + pad && z > r[1] - pad && z < r[3] + pad;

test("el código de la sala: 6 letras, sin I ni O, se limpia lo que escribe la persona", () => {
  assert.equal(limpiarCodigo("kxrmpt"), "KXRMPT");
  assert.equal(limpiarCodigo(" kx rm-pt "), "KXRMPT");
  assert.equal(limpiarCodigo("áBCDEF"), "ABCDEF");
  assert.equal(limpiarCodigo("ABCDE"), null);
  assert.equal(limpiarCodigo("ABCDEFG"), null);
  assert.equal(limpiarCodigo("ABCDEI"), null, "la I no está en los códigos");
  assert.equal(limpiarCodigo("OOOOOO"), null, "la O tampoco");
  assert.equal(limpiarCodigo(123456), null);
  assert.ok(!CODIGO_LETRAS.includes("I") && !CODIGO_LETRAS.includes("O") && CODIGO_LETRAS.length === 24);
});

test("los cinco juegos: de 2 a 12, con su versículo y su prenda (y los juegos de mesa, que eligen su juego)", () => {
  assert.deepEqual(ORDEN_JUEGOS, ["esgrima", "tribus", "quien", "carrera", "muro", "mesa"]);
  // los juegos de mesa: se puede empezar solo (con compañeros de la computadora) y no dan prenda
  assert.ok(JUEGOS.mesa.min === 1 && JUEGOS.mesa.max === 12 && JUEGOS.mesa.prenda === "" && JUEGOS.mesa.verso.ref === "Salmos 133:1");
  assert.ok(esJuego("mesa"));
  for (const id of ORDEN_JUEGOS.filter((j) => j !== "mesa")) {
    const j = JUEGOS[id];
    assert.equal(j.id, id);
    assert.ok(j.min >= 2 && j.max === 12, id);
    assert.ok(j.verso.text && j.verso.ref, id);
    assert.ok(PRENDAS_JUEGOS.some((p) => p.id === j.prenda && p.juego === id), `${id}: su prenda`);
    assert.ok(esJuego(id));
  }
  assert.ok(!esJuego("ajedrez"));
  assert.ok(JUEGOS.carrera.enLaCiudad && JUEGOS.muro.enLaCiudad && !JUEGOS.esgrima.enLaCiudad);
  assert.ok(JUEGOS.muro.cooperativo && !JUEGOS.carrera.cooperativo);
  assert.equal(TRIBUS_EQUIPOS.length, 4);
});

test("¿Quién soy?: con menos pistas, más puntos; las pistas salen una cada 7 s", () => {
  assert.deepEqual([1, 2, 3, 4, 5].map(puntosQuien), [100, 80, 60, 40, 20]);
  assert.equal(puntosQuien(0), 100);
  assert.equal(puntosQuien(9), 20);
  assert.equal(pistasVistas(0), 1);
  assert.equal(pistasVistas(QUIEN.pistaMs - 1), 1);
  assert.equal(pistasVistas(QUIEN.pistaMs), 2);
  assert.equal(pistasVistas(4 * QUIEN.pistaMs), 5);
  assert.equal(pistasVistas(10 * QUIEN.pistaMs), 5);
  assert.equal(QUIEN_RONDA_MS, 4 * QUIEN.pistaMs + QUIEN.finalMs);
});

test("el recorrido de la carrera: cinco lugares distintos, tramos de 22 a 90 m y la vuelta al patio", () => {
  for (let semilla = 1; semilla < 400; semilla++) {
    const r = recorridoDeCarrera(semilla * 7919);
    assert.equal(r.length, CARRERA.puntos + 1, `semilla ${semilla}`);
    assert.deepEqual(r[r.length - 1], LLEGADA_CARRERA);
    assert.equal(new Set(r.map((l) => l.id)).size, r.length, "sin repetir");
    let desde = { x: PATIO_SALIDA[0], z: PATIO_SALIDA[1] };
    for (const l of r.slice(0, -1)) {
      const d = Math.hypot(l.x - desde.x, l.z - desde.z);
      assert.ok(d >= 22 && d <= 90, `semilla ${semilla}: ${l.id} a ${d.toFixed(1)} m`);
      desde = l;
    }
  }
  assert.deepEqual(recorridoDeCarrera(42), recorridoDeCarrera(42), "la misma semilla, el mismo recorrido");
  const distintos = new Set(Array.from({ length: 40 }, (_, i) => recorridoDeCarrera(i * 104729 + 3).map((l) => l.id).join()));
  assert.ok(distintos.size > 20, "las carreras cambian");
});

test("cada lugar de la carrera se puede pisar (calles y plazas, sin edificios ni casas)", () => {
  const { rects, circles } = obstaculosFijos();
  const relleno = rellenoDeCasas();
  for (const l of [...LUGARES_CARRERA, LLEGADA_CARRERA]) {
    assert.ok(caminable(l.x, l.z), `${l.id}: caminable`);
    assert.ok(l.x >= LIMITES_CIUDAD.minX && l.x <= LIMITES_CIUDAD.maxX && l.z >= LIMITES_CIUDAD.minZ && l.z <= LIMITES_CIUDAD.maxZ, l.id);
    for (const r of rects) assert.ok(!dentro(l.x, l.z, r, 0.3), `${l.id}: dentro de un edificio ${r}`);
    for (const [cx, cz, cr] of circles) assert.ok(Math.hypot(l.x - cx, l.z - cz) > cr + 0.3, `${l.id}: en un árbol o el pozo`);
    for (const o of relleno) assert.ok(!dentro(l.x, l.z, [o.x - o.w / 2, o.z - o.d / 2, o.x + o.w / 2, o.z + o.d / 2], 0.3), `${l.id}: en una casa sin dueño`);
    // en los barrios, en sus calles (no en las parcelas de las casas)
    const area = areaEn(l.x, l.z);
    if (area) {
      const z0 = [18, -46.5, 40, -68.5][area - 1];
      assert.ok(CALLES_DE_AREA.some(([a, b]) => l.z >= z0 + a && l.z <= z0 + b), `${l.id}: en la calle de su barrio`);
    }
  }
});

test("el patio: libre de casas sin dueño, con la mesa, la cantera y el muro adentro y sin chocar", () => {
  const { rects } = obstaculosFijos();
  for (const o of rellenoDeCasas()) assert.ok(!dentro(o.x, o.z, [PATIO[0] - 1, PATIO[1] - 1, PATIO[2] + 1, PATIO[3] + 3], o.w / 2), "una casa sin dueño en el patio");
  for (const [x, z] of [PATIO_MESA, PATIO_SALIDA, CANTERA, TRAMO_CENTRO] as [number, number][]) {
    assert.ok(enElPatio(x, z), `${x},${z} en el patio`);
    assert.ok(caminable(x, z));
    for (const r of rects) assert.ok(!dentro(x, z, r, 0.25), `${x},${z} choca con ${r}`);
  }
  assert.ok(!enElPatio(56, 0), "la plaza no es el patio");
  // de la cantera al muro hay un trecho (para que llevar piedras sea un juego)
  assert.ok(Math.hypot(CANTERA[0] - TRAMO_CENTRO[0], CANTERA[1] - TRAMO_CENTRO[1]) > 12);
});

test("el muro pide 15 piedras por persona (de 30 a 180)", () => {
  assert.equal(metaDelMuro(1), 30);
  assert.equal(metaDelMuro(2), 30);
  assert.equal(metaDelMuro(3), 45);
  assert.equal(metaDelMuro(12), 180);
  assert.equal(metaDelMuro(40), 180);
  assert.equal(MURO.ms, 300_000);
});

test("las frases de la sala: fijas, sin repetir, y los versículos rápidos no chocan con ellas", () => {
  const ids = FRASES_SALA.map((f) => f.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const f of FRASES_SALA) assert.ok(f.id.startsWith("s-") && f.texto.length > 2 && f.texto.length < 40, f.id);
  for (const v of VERSICULOS_RAPIDOS) assert.ok(!ids.includes(v.id));
});

test("las prendas del patio no se venden, no están en las ofertas y forman su colección del álbum", () => {
  for (const p of PRENDAS_JUEGOS) {
    const a = ARTICULOS.find((x) => x.id === p.id);
    assert.ok(a, p.id);
    assert.equal(a!.exclusivo, "juegos");
    assert.equal(a!.categoria, "ropa");
    assert.ok(/^(manto|faja)-/.test(p.id) && /^#[0-9a-f]{6}$/i.test(p.color), p.id);
    assert.equal(ARTICULOS.filter((x) => x.id === p.id).length, 1);
  }
  for (const dia of ["2026-11-13", "2026-12-25", "2027-04-21", "2027-09-30"]) for (const id of ofertasDelDia(dia)) assert.ok(!PRENDAS_JUEGOS.some((p) => p.id === id), `${dia}: ${id}`);
  const c = COLECCIONES.find((x) => x.id === "juegos");
  assert.ok(c);
  assert.deepEqual([...c!.items].sort(), PRENDAS_JUEGOS.map((p) => p.id).sort());
  assert.equal(nombreDeTitulo("juegos"), "Gozo del patio");
  // las del patio no entran en «Lo que se gana» (esa colección no cambia)
  assert.ok(!COLECCIONES.find((x) => x.id === "ganado")!.items.some((id) => PRENDAS_JUEGOS.some((p) => p.id === id)));
});

test("los premios: tope de 60 por día, la copa del barrio y los dos logros del patio", () => {
  assert.equal(GOZO_JUEGOS_DIA, 60);
  assert.deepEqual([...GOZO_PUESTOS], [12, 8, 6]);
  assert.equal(COPA_PUNTOS.juego, 2);
  assert.equal(COPA_PUNTOS.juegoGanado, 3);
  assert.ok(ORDEN_LOGROS.includes("alegriaPatio") && ORDEN_LOGROS.includes("coronaPatio"));
  assert.ok(LOGROS_EN_LINEA.alegriaPatio.nombre && LOGROS_EN_LINEA.coronaPatio.nombre);
});

test("lo que ven los vecinos: la piedra, la carrera y el patio", () => {
  assert.equal(ACTIVIDADES_CIUDAD.length, ACTIVIDAD_CIUDAD_TEXTO.length);
  assert.equal(ACTIVIDADES_CIUDAD[9], "🪨");
  assert.equal(ACTIVIDADES_CIUDAD[10], "🏃");
  assert.equal(ACTIVIDADES_CIUDAD[11], "🎲");
});
