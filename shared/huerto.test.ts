// Las reglas del huerto de la casa (shared/huerto.ts): las etapas, las aves, las malas hierbas, el abono del redil, la
// cosecha con sus estrellas y las tareas del día.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  ABONO, AVES, CANTARO, GOZO_HUERTO, HERRAMIENTAS, HIERBAS, MISIONES_HUERTO, abonoDelRedil, anotarTarea, avesDe, calidadDe, duracion, etapaDe, faltan,
  hierbasDe, huertitoDe, leerHuerto, leerLabranza, misionesDeHoy, misionesDelDia, rindeDe, type Surco,
} from "./huerto";
import { SEMILLAS } from "./mercado";

// un día de verano (en verano no llueve en Jerusalén: el riego no lo hace la lluvia)
const T0 = Date.parse("2026-07-15T18:00:00Z");
const iso = (t: number) => new Date(t).toISOString();
const sembrado = (semilla: "trigo" | "cebada" | "olivo", hace: number, extra: Partial<Surco> = {}): Surco => ({ semilla, plantado: iso(T0 - hace * 1000), regado: false, arado: iso(T0 - hace * 1000 - 5000), ...extra });
const herr = { azada: 1, hoz: 1, molino: false, vasijas: false };

test("leer los surcos: lo viejo sigue y cuenta como arado; lo que falta queda vacío y sin arar", () => {
  const viejo = [{ semilla: "trigo", plantado: iso(T0 - 60_000), regado: true, riego: 0.75 }, { semilla: null, plantado: null, regado: false }];
  const s = leerHuerto(viejo, 3);
  assert.equal(s.length, 3);
  assert.equal(s[0].semilla, "trigo");
  assert.equal(s[0].arado, s[0].plantado, "lo sembrado antes de la azada cuenta como arado");
  assert.equal(s[1].arado, undefined);
  assert.equal(s[2].semilla, null);
  // basura: no rompe
  const raro = leerHuerto([{ semilla: "maiz", plantado: "ayer" }, 5, null, { semilla: "olivo", plantado: "no-es-fecha" }], 4);
  assert.ok(raro.every((p) => p.semilla === null && !p.arado));
  // las aves y el abono solo valen con algo sembrado
  const conAves = leerHuerto([{ semilla: "cebada", plantado: iso(T0), aves: ["s", "x", "s"], abono: true, limpio: iso(T0) }], 1)[0];
  assert.deepEqual(conAves.aves, ["s"]);
  assert.equal(conAves.abono, true);
});

test("las etapas: de recién sembrado a lista", () => {
  assert.equal(etapaDe(0), 0);
  assert.equal(etapaDe(0.1), 1);
  assert.equal(etapaDe(0.4), 2);
  assert.equal(etapaDe(0.7), 3);
  assert.equal(etapaDe(1), 4);
  const p = sembrado("trigo", 10);
  const d = duracion(p);
  assert.ok(d > 0);
  assert.ok(faltan(p, T0) > 0 && faltan(p, T0 + d * 1000) === 0);
});

test("las aves de la siembra: llegan, se espantan y, si nadie las espanta, comen", () => {
  const recien = sembrado("trigo", 5);
  const a0 = avesDe(recien, T0);
  assert.equal(a0.ahora, false);
  assert.equal(a0.llegan, AVES.siembra.llegan - 5);
  const conAves = sembrado("trigo", 60);
  assert.equal(avesDe(conAves, T0).ahora, true);
  assert.equal(avesDe(conAves, T0).cual, "s");
  // espantadas: ya no hay aves ni comen
  const espantadas = { ...conAves, aves: ["s" as const] };
  assert.equal(avesDe(espantadas, T0).ahora, false);
  assert.equal(avesDe(espantadas, T0).comidas, 0);
  // nadie las espantó en 10 minutos: comieron
  const tarde = sembrado("trigo", AVES.siembra.comen + 30);
  assert.equal(avesDe(tarde, T0).comidas, 1);
  assert.equal(avesDe(tarde, T0).ahora, false);
});

test("las aves del grano maduro: llegan después de que queda lista y se quedan hasta que alguien las espante", () => {
  const p = sembrado("cebada", 1, { aves: ["s"] });
  const listo = Date.parse(p.plantado!) + duracion(p) * 1000;
  assert.equal(avesDe(p, listo + 10_000).ahora, false);
  assert.ok((avesDe(p, listo + 10_000).llegan ?? 0) > 0);
  assert.equal(avesDe(p, listo + (AVES.maduro.llegan + 5) * 1000).cual, "m");
  assert.equal(avesDe(p, listo + 3_600_000).ahora, true, "se quedan");
  assert.equal(avesDe({ ...p, aves: ["s", "m"] }, listo + 3_600_000).ahora, false);
});

test("las malas hierbas salen con las horas, se arrancan y la azada de hierro las retrasa", () => {
  const p = sembrado("olivo", 0);
  assert.equal(hierbasDe(p, 1, T0).n, 0);
  const cada = HIERBAS.minutos * 60_000;
  // con 2 veces su tiempo ya hay 2
  assert.ok(hierbasDe(p, 1, T0 + 2 * cada + 1000).n >= 2);
  assert.equal(hierbasDe(p, 1, T0 + 10 * cada).n, HIERBAS.max, "hasta 3");
  assert.equal(hierbasDe(p, 1, T0 + 10 * cada).proxima, null);
  // arrancadas: vuelven a contar desde ahí
  const limpio = { ...p, limpio: iso(T0 + 10 * cada) };
  assert.equal(hierbasDe(limpio, 1, T0 + 10 * cada + 1000).n, 0);
  // con la azada de hierro tardan el doble
  assert.ok(hierbasDe(p, 2, T0 + 2 * cada + 1000).n < hierbasDe(p, 1, T0 + 2 * cada + 1000).n);
});

test("la cosecha: una estrella por el riego, otra sin hierbas y otra por el abono; las aves se comen parte", () => {
  const base = SEMILLAS.trigo.cuanto;
  const p = sembrado("trigo", 1, { aves: ["s"] });
  const listo = Date.parse(p.plantado!) + duracion(p) * 1000;
  // sin cuidar: hierbas y sin riego ni abono
  const flaca = rindeDe(p, herr, listo + 30_000);
  assert.equal(flaca.calidad.regado, false);
  assert.equal(flaca.calidad.abono, false);
  // cuidado: regado, abonado y limpio justo antes de segar
  const cuidado: Surco = { ...p, regado: true, abono: true };
  const listoC = Date.parse(cuidado.plantado!) + duracion(cuidado) * 1000;
  const r = rindeDe({ ...cuidado, limpio: iso(listoC) }, herr, listoC + 1000);
  assert.equal(r.calidad.estrellas, 3);
  assert.equal(r.cuanto, base + 3);
  // con la hoz de hierro y las 3 estrellas, una más; con el molino, otra
  assert.equal(rindeDe({ ...cuidado, limpio: iso(listoC) }, { ...herr, hoz: 2, molino: true }, listoC + 1000).cuanto, base + 5);
  // las aves del grano maduro encima al segar: una menos
  const conAves = rindeDe({ ...cuidado, limpio: iso(listoC + 200_000) }, herr, listoC + 200_000);
  assert.equal(conAves.comidas, 1);
  assert.equal(conAves.cuanto, base + 3 - 1);
  // nunca menos de 1
  const nada = rindeDe({ semilla: "cebada", plantado: iso(T0 - 9_000_000), regado: false, arado: iso(T0 - 9_100_000) }, herr, T0);
  assert.ok(nada.cuanto >= 1);
  assert.equal(calidadDe({ semilla: null, plantado: null, regado: false }, 1, T0).estrellas, 0);
});

test("el abono del redil: con ovejas sale con las horas, hasta 6; sin ovejas no sale", () => {
  const sin = abonoDelRedil({ n: 2, desde: null }, 0, T0);
  assert.equal(sin.hay, 2);
  assert.equal(sin.proxima, null);
  const empieza = abonoDelRedil({ n: 0, desde: null }, 3, T0);
  assert.equal(empieza.hay, 0);
  assert.ok(empieza.asentado.desde);
  const hora = 3_600_000;
  const luego = abonoDelRedil(empieza.asentado, 3, T0 + 2 * hora + 1000);
  assert.equal(luego.hay, 2, "3 ovejas: una cada hora");
  assert.equal(abonoDelRedil(empieza.asentado, 3, T0 + 100 * hora).hay, ABONO.tope);
  assert.equal(abonoDelRedil(empieza.asentado, 3, T0 + 100 * hora).proxima, null);
});

test("la labranza: al empezar el cántaro lleno, herramientas sencillas y 2 de abono; lo raro no rompe", () => {
  const l = leerLabranza({});
  assert.equal(l.agua, CANTARO[1]);
  assert.deepEqual(l.herramientas, { azada: 1, cantaro: 1, hoz: 1 });
  assert.equal(l.abono.n, ABONO.alEmpezar);
  assert.deepEqual(l.gavillas, { harina: 0, aceite: 0 });
  const raro = leerLabranza({ agua: 99, herramientas: { azada: 7, cantaro: 2 }, gavillas: { harina: -4 }, misiones: { dia: "x" } });
  assert.equal(raro.herramientas.azada, 2);
  assert.equal(raro.agua, CANTARO[2], "no más de lo que lleva el cántaro");
  assert.equal(raro.gavillas.harina, 0);
  assert.equal(raro.misiones, null);
  for (const h of Object.values(HERRAMIENTAS)) assert.ok(h.mejor.precio > 0 && h.mejor.ventaja.length > 10);
});

test("las tareas del día: 3 distintas, las mismas al pedirlas otra vez y solo las que se pueden hacer", () => {
  const c = { cisterna: false, ovejas: true, cultivo: true, llueve: false };
  const a = misionesDelDia("2026-11-12", 7, c);
  assert.equal(a.length, 3);
  assert.equal(new Set(a.map((m) => m.id)).size, 3);
  assert.deepEqual(misionesDelDia("2026-11-12", 7, c), a);
  // cambian con los días y las casas
  const variadas = new Set<string>();
  for (let d = 1; d <= 28; d++) for (const casa of [1, 2, 3]) variadas.add(misionesDelDia(`2026-11-${String(d).padStart(2, "0")}`, casa, c).map((m) => m.id).join());
  assert.ok(variadas.size > 40);
  // con la cisterna o lluvia no se pide regar ni llenar; sin ovejas, no abonar; sin cultivo de la estación, no «tiempo»
  for (let d = 1; d <= 28; d++) {
    const dia = `2026-12-${String(d).padStart(2, "0")}`;
    assert.ok(!misionesDelDia(dia, 3, { ...c, cisterna: true }).some((m) => m.tarea === "regar" || m.tarea === "llenar"));
    assert.ok(!misionesDelDia(dia, 3, { ...c, llueve: true }).some((m) => m.tarea === "regar" || m.tarea === "llenar"));
    assert.ok(!misionesDelDia(dia, 3, { ...c, ovejas: false }).some((m) => m.tarea === "abonar"));
    assert.ok(!misionesDelDia(dia, 3, { ...c, cultivo: false }).some((m) => m.tarea === "tiempo"));
  }
  assert.equal(new Set(MISIONES_HUERTO.map((m) => m.id)).size, MISIONES_HUERTO.length);
});

test("anotar las tareas: se cumplen al llegar a su meta, una sola vez, y las tres dan el gozo de más", () => {
  const lab = leerLabranza({});
  const m = misionesDeHoy(lab, "2026-11-12", 4, { cisterna: false, ovejas: true, cultivo: true, llueve: false });
  assert.equal(m.ids.length, 3);
  const metas = m.ids.map((id) => MISIONES_HUERTO.find((x) => x.id === id)!);
  let cumplidas = 0;
  let todas = false;
  for (const mi of metas) {
    const r1 = anotarTarea(m, mi.tarea, mi.meta - 1);
    assert.ok(!r1.cumplidas.some((x) => x.id === mi.id) || mi.meta - 1 >= mi.meta);
    const r2 = anotarTarea(m, mi.tarea, 1);
    cumplidas += r2.cumplidas.length;
    todas = todas || r2.todas;
    // otra vez: ya no se premia
    assert.equal(anotarTarea(m, mi.tarea, 5).cumplidas.length, 0);
  }
  assert.ok(cumplidas >= 1 && cumplidas <= 3);
  assert.equal(m.premiadas.length, 3);
  assert.equal(todas, true);
  assert.equal(m.todas, true);
  assert.equal(anotarTarea(m, "arar", 1).todas, false, "el gozo de las tres, una sola vez");
  assert.ok(GOZO_HUERTO.mision * 3 + GOZO_HUERTO.todas <= 40, "el huerto no da demasiado gozo por día");
  // otro día empiezan de nuevo
  const otra = misionesDeHoy({ ...lab, misiones: m }, "2026-11-13", 4, { cisterna: false, ovejas: true, cultivo: true, llueve: false });
  assert.deepEqual(otra.premiadas, []);
});

test("el huertito de la ciudad: hasta 4 surcos con su etapa", () => {
  const h = huertitoDe([{ semilla: "trigo", plantado: iso(Date.now() - 1000), regado: false }, { semilla: null, plantado: null, regado: false, arado: iso(Date.now()) }, {}], 0, {});
  assert.equal(h.length, 2, "la tienda tiene 2 surcos");
  assert.equal(h[0].s, "trigo");
  assert.ok(h[0].e >= 0 && h[0].e <= 1);
  assert.equal(h[1].e, -1);
  assert.equal(huertitoDe([], 3, {}).length, 4, "hasta 4");
});
