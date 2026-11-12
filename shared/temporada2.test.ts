// La historia de la temporada 2, la gran Pascua de Ezequías: el orden de las historias, sus fechas, sus recados, sus
// prendas y su colección en el álbum.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  ARCOS, PASCUA_EZEQUIAS, PRENDAS_CAPITULOS, PROGRAMA, SENAQUERIB, arcoDeCapitulo, arcoDeTemporada, capituloDelDia, diaDeTemporada, enLaTemporada,
  fechaEnPalabras, momentoDeFiesta, prendasDeArco,
} from "./capitulos";
import { PERSONAJES_CIUDAD, RECADOS, recadoDelDia } from "./personajes";
import { ARTICULOS, ofertasDelDia } from "./mercado";
import { COLECCIONES, EN_EL_ALBUM, nombreDeTitulo, titulosGanados } from "./album";

test("las historias se turnan: Senaquerib, la Pascua, y otra vez desde la primera", () => {
  assert.equal(arcoDeTemporada(1)?.id, SENAQUERIB.id);
  assert.equal(arcoDeTemporada(2)?.id, PASCUA_EZEQUIAS.id);
  assert.equal(arcoDeTemporada(3)?.id, SENAQUERIB.id);
  assert.equal(arcoDeTemporada(4)?.id, PASCUA_EZEQUIAS.id);
  assert.equal(arcoDeTemporada(5)?.id, SENAQUERIB.id);
  assert.equal(arcoDeTemporada(2.7)?.id, PASCUA_EZEQUIAS.id);
  assert.equal(arcoDeTemporada(0), null);
  assert.equal(arcoDeTemporada(Number.NaN), null);
  // el programa va en orden y cada historia tiene su nombre
  for (let i = 1; i < PROGRAMA.length; i++) assert.ok(PROGRAMA[i].desde > PROGRAMA[i - 1].desde);
  assert.equal(new Set(ARCOS.map((a) => a.id)).size, ARCOS.length);
});

test("agregar una historia nueva para la temporada 5 no cambia ninguna de las anteriores", () => {
  const antes = [1, 2, 3, 4].map((t) => arcoDeTemporada(t)?.id);
  const nueva = { ...PASCUA_EZEQUIAS, id: "nueva" };
  PROGRAMA.push({ desde: 5, arco: nueva });
  try {
    assert.deepEqual([1, 2, 3, 4].map((t) => arcoDeTemporada(t)?.id), antes);
    assert.equal(arcoDeTemporada(5)?.id, "nueva");
    assert.equal(arcoDeTemporada(6)?.id, SENAQUERIB.id);
  } finally {
    PROGRAMA.pop();
  }
});

test("la temporada 2: del lunes 7 de diciembre al domingo 3 de enero, un capítulo por semana", () => {
  assert.deepEqual(enLaTemporada("2026-12-07"), { temporada: 2, indice: 0 });
  assert.equal(diaDeTemporada(2, 27), "2027-01-03");
  const caps: [string, string, number][] = [
    ["2026-12-07", "puertas", 1], ["2026-12-13", "puertas", 7], ["2026-12-14", "cantico", 1], ["2026-12-21", "cartas", 1],
    ["2026-12-25", "cartas", 5], ["2026-12-28", "pascua", 1], ["2027-01-03", "pascua", 7],
  ];
  for (const [dia, id, d] of caps) {
    const c = capituloDelDia(dia);
    assert.ok(c, dia);
    assert.equal(c.arco.id, PASCUA_EZEQUIAS.id, dia);
    assert.equal(c.capitulo.id, id, dia);
    assert.equal(c.diaDelCapitulo, d, dia);
  }
  // la temporada 1 sigue igual, y la 3 vuelve a contar la primera historia
  assert.equal(capituloDelDia("2026-11-12")?.capitulo.id, "muro");
  assert.equal(capituloDelDia("2026-12-06")?.capitulo.id, "liberacion");
  assert.equal(capituloDelDia("2027-01-04")?.capitulo.id, "muro");
});

test("el gran regocijo: del viernes 1 al domingo 3 de enero, con la gran alabanza el domingo de 6 a 7 de la tarde", () => {
  const m = (iso: string) => momentoDeFiesta(new Date(iso))?.momento;
  assert.equal(fechaEnPalabras(diaDeTemporada(2, PASCUA_EZEQUIAS.fiesta.dias[0])), "viernes 1 de enero");
  assert.equal(m("2026-12-31T20:00:00-06:00"), "antes");
  assert.equal(m("2027-01-01T00:01:00-06:00"), "fiesta");
  assert.equal(m("2027-01-02T12:00:00-06:00"), "fiesta");
  assert.equal(m("2027-01-03T17:59:00-06:00"), "fiesta");
  assert.equal(m("2027-01-03T18:00:00-06:00"), "vivo");
  assert.equal(m("2027-01-03T18:59:00-06:00"), "vivo");
  assert.equal(m("2027-01-03T19:00:00-06:00"), "fiesta");
  assert.equal(m("2027-01-04T09:00:00-06:00"), "antes");
});

test("cada historia: cuatro capítulos con sus guías, chismes y dos recados que van por tres casas de la calle", () => {
  const ids = new Set(PERSONAJES_CIUDAD.map((p) => p.id));
  for (const a of ARCOS) {
    assert.deepEqual(a.capitulos.map((c) => c.n), [1, 2, 3, 4], a.id);
    for (const c of a.capitulos) {
      assert.ok(ids.has(c.guia), `${c.id}: guía`);
      assert.equal(c.unidad.length, 2);
      assert.ok(c.historia.length >= 2 && c.dialogo.length >= 2, c.id);
      for (const k of Object.keys(c.chismes)) assert.ok(ids.has(k as never), `${c.id}: chisme de ${k}`);
      assert.equal(c.recados.length, 2, c.id);
      for (const r of c.recados) {
        assert.ok(r.cadena.every((p) => ids.has(p)) && new Set(r.cadena).size === 3, r.id);
        assert.equal(r.dice.length, 3, r.id);
        assert.equal(r.lleva.length, 2, r.id);
      }
    }
  }
  // los nombres de los capítulos y de los recados no se repiten entre historias
  const caps = ARCOS.flatMap((a) => a.capitulos.map((c) => c.id));
  assert.equal(new Set(caps).size, caps.length);
  const recados = [...RECADOS.map((r) => r.id), ...ARCOS.flatMap((a) => a.capitulos.flatMap((c) => c.recados.map((r) => r.id)))];
  assert.equal(new Set(recados).size, recados.length);
  assert.equal(arcoDeCapitulo("cartas")?.id, PASCUA_EZEQUIAS.id);
  assert.equal(arcoDeCapitulo("rabsaces")?.id, SENAQUERIB.id);
  assert.equal(arcoDeCapitulo(null), null);
});

test("en la temporada 2, cerca de la mitad tiene el recado del capítulo de la semana", () => {
  for (const [dia, n] of [["2026-12-08", 1], ["2026-12-16", 2], ["2026-12-22", 3], ["2026-12-30", 4]] as [string, number][]) {
    const ids = new Set(PASCUA_EZEQUIAS.capitulos[n - 1].recados.map((r) => r.id));
    let deLaSemana = 0;
    for (let t = 1; t <= 2000; t++) if (ids.has(recadoDelDia(dia, t).id)) deLaSemana++;
    assert.ok(deLaSemana > 800 && deLaSemana < 1200, `${dia}: ${deLaSemana}`);
  }
});

test("las prendas de las dos historias: exclusivas, que no se venden ni salen en las ofertas, con colores propios", () => {
  assert.equal(PRENDAS_CAPITULOS.length, 10);
  for (const p of PRENDAS_CAPITULOS) {
    const a = ARTICULOS.find((x) => x.id === p.id);
    assert.ok(a, p.id);
    assert.equal(a.exclusivo, "temporada");
    assert.equal(a.categoria, "ropa");
    assert.ok(p.id.startsWith("manto-") || p.id.startsWith("faja-"), p.id);
    assert.equal(ARTICULOS.filter((x) => x.color === p.color).length, 1, `${p.id}: color repetido`);
  }
  for (const a of ARCOS) {
    const prendas = prendasDeArco(a);
    assert.equal(new Set(prendas).size, 5, a.id);
    for (const id of prendas) assert.ok(PRENDAS_CAPITULOS.some((p) => p.id === id), id);
  }
  for (let d = 0; d < 60; d++) {
    const dia = diaDeTemporada(2, d % 28);
    assert.ok(!ofertasDelDia(dia).some((id) => PRENDAS_CAPITULOS.some((p) => p.id === id)), dia);
  }
});

test("el álbum: una colección por historia con su título, y «lo que se gana» ya no las pide", () => {
  const ganado = COLECCIONES.find((c) => c.id === "ganado")!;
  assert.ok(!ganado.items.some((id) => PRENDAS_CAPITULOS.some((p) => p.id === id)));
  const pascua = COLECCIONES.find((c) => c.id === `historia-${PASCUA_EZEQUIAS.id}`)!;
  const senaquerib = COLECCIONES.find((c) => c.id === `historia-${SENAQUERIB.id}`)!;
  assert.deepEqual(pascua.items, prendasDeArco(PASCUA_EZEQUIAS));
  assert.deepEqual(senaquerib.items, prendasDeArco(SENAQUERIB));
  assert.equal(nombreDeTitulo(pascua.id), "De un solo corazón");
  assert.equal(nombreDeTitulo(senaquerib.id), "Atalaya de Sion");
  for (const id of pascua.items) assert.ok(EN_EL_ALBUM.has(id));
  const casi = new Set(pascua.items.slice(1));
  assert.ok(!titulosGanados(casi, { dador: false, amigo: false }).includes(pascua.id));
  assert.ok(titulosGanados(new Set(pascua.items), { dador: false, amigo: false }).includes(pascua.id));
  // los títulos no se repiten
  const titulos = COLECCIONES.map((c) => c.titulo);
  assert.equal(new Set(titulos).size, titulos.length);
});
