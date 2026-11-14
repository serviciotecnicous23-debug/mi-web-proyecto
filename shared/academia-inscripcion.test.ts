// Pruebas de la ficha de inscripción y de la inscripción en cada materia: npx tsx --test shared/academia-inscripcion.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { DIAS_APELACION, NIVELES, REGLAMENTO, ESPECIALIDADES, requisitosMateria } from "./academia";
import { EDAD_MINIMA, FICHA_VACIA, PAISES, edadEn, limpiarNombre, nombreCompleto, nombrePropio, paisDeCuenta, repartirNombre, validarFicha } from "./academia-inscripcion";

const HOY = new Date(Date.UTC(2026, 10, 14));
const buena = { ...FICHA_VACIA, nombres: "Luis Alberto", apellidos: "Rodríguez Pérez", pais: "Estados Unidos", tiempoFe: "1-3" };

test("una ficha con lo obligatorio pasa, y lo opcional queda vacío", () => {
  const v = validarFicha(buena, HOY);
  assert.ok(v.ok);
  if (v.ok) {
    assert.equal(nombreCompleto(v.ficha), "Luis Alberto Rodríguez Pérez");
    assert.equal(v.ficha.telefono, "");
    assert.equal(v.ficha.iglesiaId, null);
  }
});

test("sin nombres, apellidos, país ni tiempo en la fe, marca cada campo", () => {
  const v = validarFicha({}, HOY);
  assert.equal(v.ok, false);
  if (!v.ok) assert.deepEqual(Object.keys(v.errores).sort(), ["apellidos", "nombres", "pais", "tiempoFe"]);
  const basura = validarFicha("hola", HOY);
  assert.equal(basura.ok, false);
});

test("los nombres: solo letras, con mayúsculas bien puestas si vienen todo en minúscula o en mayúscula", () => {
  assert.equal(nombrePropio("luis alberto"), "Luis Alberto");
  assert.equal(nombrePropio("MARÍA DE LOS ÁNGELES"), "María de los Ángeles");
  assert.equal(nombrePropio("  josé   maría "), "José María");
  assert.equal(nombrePropio("o'brien-smith"), "O'Brien-Smith");
  assert.equal(nombrePropio("McDonald"), "McDonald", "si ya trae mayúsculas y minúsculas, se respeta");
  const v = validarFicha({ ...buena, nombres: "luis", apellidos: "RODRÍGUEZ" }, HOY);
  assert.ok(v.ok && v.ficha.nombres === "Luis" && v.ficha.apellidos === "Rodríguez");
  const malos = validarFicha({ ...buena, nombres: "Luis2", apellidos: "@@" }, HOY);
  assert.ok(!malos.ok && malos.errores.nombres && malos.errores.apellidos);
  const corto = validarFicha({ ...buena, nombres: "L" }, HOY);
  assert.ok(!corto.ok && corto.errores.nombres);
});

test("el país sale de la lista, y el de la cuenta (sin tildes) se reconoce", () => {
  assert.ok(!validarFicha({ ...buena, pais: "Narnia" }, HOY).ok);
  assert.equal(paisDeCuenta("Peru"), "Perú");
  assert.equal(paisDeCuenta("Espana"), "España");
  assert.equal(paisDeCuenta("Republica Dominicana"), "República Dominicana");
  assert.equal(paisDeCuenta("Atlantis"), "");
  assert.ok(PAISES.includes("Estados Unidos"));
});

test("el teléfono: dígitos de verdad, con o sin código de país", () => {
  for (const t of ["+1 512 555 0123", "(512) 555-0123", "+58 414 1234567"]) assert.ok(validarFicha({ ...buena, telefono: t }, HOY).ok, t);
  for (const t of ["123", "hola", "+1 512 555 0123 444 555 666"]) assert.ok(!validarFicha({ ...buena, telefono: t }, HOY).ok, t);
});

test("la fecha de nacimiento: real, pasada y con la edad mínima", () => {
  assert.equal(edadEn("2000-11-14", HOY), 26);
  assert.equal(edadEn("2000-11-15", HOY), 25);
  assert.equal(edadEn("2026-02-30", HOY), null);
  assert.ok(validarFicha({ ...buena, nacimiento: "1990-03-12" }, HOY).ok);
  const menor = validarFicha({ ...buena, nacimiento: "2015-01-01" }, HOY);
  assert.ok(!menor.ok && menor.errores.nacimiento?.includes(String(EDAD_MINIMA)));
  assert.ok(!validarFicha({ ...buena, nacimiento: "2027-01-01" }, HOY).ok, "en el futuro");
  assert.ok(!validarFicha({ ...buena, nacimiento: "1850-01-01" }, HOY).ok, "antes de 1900");
  assert.ok(!validarFicha({ ...buena, nacimiento: "12/03/1990" }, HOY).ok, "otro formato");
});

test("la iglesia: aliada por su número o escrita a mano; las opciones salen de su lista", () => {
  const aliada = validarFicha({ ...buena, iglesiaId: 7, iglesiaOtra: "no se guarda" }, HOY);
  assert.ok(aliada.ok && aliada.ficha.iglesiaId === 7 && aliada.ficha.iglesiaOtra === "");
  const otra = validarFicha({ ...buena, iglesiaId: "x", iglesiaOtra: "Iglesia Cristiana Betel" }, HOY);
  assert.ok(otra.ok && otra.ficha.iglesiaId === null && otra.ficha.iglesiaOtra === "Iglesia Cristiana Betel");
  assert.ok(!validarFicha({ ...buena, bautismo: "talvez" }, HOY).ok);
  assert.ok(!validarFicha({ ...buena, tiempoFe: "siempre" }, HOY).ok);
});

test("los textos largos se recortan y se limpian los caracteres de control", () => {
  const v = validarFicha({ ...buena, espera: `Crecer\u0000 en la fe\n\n\n\ny servir ${"x".repeat(900)}`, ciudad: "  San\tAntonio  " }, HOY);
  assert.ok(v.ok);
  if (v.ok) {
    assert.ok(v.ficha.espera.length <= 500);
    assert.ok(!v.ficha.espera.includes("\u0000") && !v.ficha.espera.includes("\n\n\n"));
    assert.equal(v.ficha.ciudad, "San Antonio");
  }
});

test("el nombre de la cuenta se reparte en nombres y apellidos como sugerencia", () => {
  assert.deepEqual(repartirNombre("Luis Rodríguez"), { nombres: "Luis", apellidos: "Rodríguez" });
  assert.deepEqual(repartirNombre("juan pérez garcía"), { nombres: "Juan", apellidos: "Pérez García" });
  assert.deepEqual(repartirNombre("María José Pérez García"), { nombres: "María José", apellidos: "Pérez García" });
  assert.deepEqual(repartirNombre("Luis"), { nombres: "Luis", apellidos: "" });
});

test("los requisitos de cada materia: el Nivel 1 no pide nada; los demás, el nivel anterior", () => {
  const n1 = NIVELES[0].materias[0];
  const n2 = NIVELES[1].materias[0];
  const n4 = NIVELES[3].materias[0];
  assert.deepEqual(requisitosMateria(n1, []), []);
  assert.equal(requisitosMateria(n2, []).length, 1);
  assert.ok(requisitosMateria(n2, [])[0].includes("Nivel 1"));
  assert.deepEqual(requisitosMateria(n2, [1]), []);
  assert.ok(requisitosMateria(n4, [1, 2])[0].includes("Nivel 3"));
  const esp = ESPECIALIDADES[0].materias.find((m) => !m.avanzada)!;
  assert.ok(requisitosMateria(esp, [1])[0].includes("Nivel 2"));
  assert.deepEqual(requisitosMateria(esp, [1, 2]), []);
  const avanzada = ESPECIALIDADES.flatMap((e) => e.materias).find((m) => m.avanzada);
  if (avanzada) assert.ok(requisitosMateria(avanzada, [1, 2])[0].includes("Nivel 3"));
});

test("el reglamento habla de la inscripción, de la aprobación al instante y de quién ve la ficha", () => {
  const todo = REGLAMENTO.secciones.flatMap((s) => s.puntos).join(" ");
  assert.ok(REGLAMENTO.secciones.some((s) => s.titulo.includes("La inscripción")));
  assert.ok(todo.includes("ficha de inscripción"));
  assert.ok(todo.includes("aprobada al instante"));
  assert.ok(todo.includes("iglesia aliada"));
  assert.ok(!/matric[uú]l(ate|arse|arte)/i.test(todo), "ya no pide «matricularse»: se inscribe");
});

test("limpiar un nombre (lo usa también la Dirección académica al corregirlo)", () => {
  assert.deepEqual(limpiarNombre("  ana   maría ", "los nombres"), { valor: "Ana María", error: null });
  assert.equal(limpiarNombre("", "los nombres").error, "Escribe los nombres.");
  assert.equal(limpiarNombre("A", "los apellidos").error, "Los apellidos parecen incompletos.");
  assert.ok(limpiarNombre("Ana2", "los nombres").error);
  assert.ok(limpiarNombre("x".repeat(70), "los nombres").error);
});

test("el reglamento dice el plazo para pedir la revisión de un examen", () => {
  const todo = REGLAMENTO.secciones.flatMap((s) => s.puntos).join(" ");
  assert.ok(todo.includes(`dentro de los ${DIAS_APELACION} días`));
});
