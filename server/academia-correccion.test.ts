// Pruebas del corrector automático de respuestas escritas: npx tsx --test server/academia-correccion.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { buscarForma, citasEscritas, corregirEscrita, distancia, palabrasDe, problemasDeClave } from "./academia-correccion";
import { BANCOS } from "./academia/index";

const e1 = BANCOS.get("n1-salvacion")!.escritas.find((e) => e.id === "n1-salvacion-e1")!;
const e3 = BANCOS.get("n1-salvacion")!.escritas.find((e) => e.id === "n1-salvacion-e3")!;

test("las claves de los bancos están bien formadas y su respuesta modelo saca 90 o más", () => {
  for (const b of BANCOS.values()) for (const e of b.escritas) assert.deepEqual(problemasDeClave(e), [], e.id);
});

test("distancia y formas: tolera una letra en palabras largas y hasta 2 palabras de más", () => {
  assert.equal(distancia("salvacion", "salbacion"), 1);
  assert.equal(distancia("fe", "de", 0), 1);
  assert.ok(buscarForma(palabrasDe("es un regalo gratuito de Dios"), "regalo de dios").length === 1);
  assert.ok(buscarForma(palabrasDe("nos mereciamos la muerte"), "merec*").length === 1);
  assert.ok(buscarForma(palabrasDe("la salbacion es por fe"), "salvacion").length === 1, "una letra cambiada");
});

test("una buena respuesta, sin tildes y con faltas pequeñas, saca nota alta", () => {
  const r = corregirEscrita(e1, "la grasia es un regalo de dios que no merecemos, la salvacion no se gana con obras sino que la recibimos por fe en jesus, efesios 2:8");
  assert.ok(r.nota >= 90, `nota ${r.nota}`);
  assert.equal(r.revisar, false);
  assert.ok(r.cita.valida);
});

test("el concepto errado afirmado anula la idea y queda para revisar", () => {
  const r = corregirEscrita(e1, "La salvación se gana con buenas obras, portándose bien y siendo una buena persona delante de Dios todos los días.");
  assert.ok(r.detalle.errores.includes("por-obras"));
  assert.ok(!r.detalle.ideas.includes("no-obras"));
  assert.ok(r.revisar);
  assert.ok(r.nota < 50, `nota ${r.nota}`);
});

test("la negación cuenta: «no es un regalo» no suma la idea del regalo", () => {
  const r = corregirEscrita(e1, "Yo pienso que la salvación no es un regalo, hay que ganarla con mucho esfuerzo y sacrificio cada día delante de Dios.");
  assert.ok(!r.detalle.ideas.includes("regalo"));
  assert.ok(r.detalle.errores.length > 0);
});

test("«no por obras» cuenta a favor y no es un error", () => {
  const r = corregirEscrita(e1, "Es un favor de Dios que no merecemos. No es por obras para que nadie se gloríe, sino por medio de la fe en Cristo.");
  assert.ok(r.detalle.ideas.includes("no-obras"));
  assert.deepEqual(r.detalle.errores, []);
});

test("una lista de palabras sueltas no aprueba", () => {
  const r = corregirEscrita(e1, "regalo gracia fe obras dios favor gratis jesus cristo efesios inmerecido salvacion creer confianza");
  assert.ok(r.nota <= 50, `nota ${r.nota}`);
  assert.ok(r.detalle.marcas.includes("lista de palabras"));
});

test("copiar la pregunta da cero", () => {
  const r = corregirEscrita(e1, e1.pregunta);
  assert.equal(r.nota, 0);
  assert.ok(r.detalle.marcas.includes("copia de la pregunta"));
});

test("una respuesta corta baja en proporción", () => {
  const larga = corregirEscrita(e1, "Es un regalo de Dios que no merecemos y no se gana con obras, se recibe por fe en Jesús, como dice Efesios 2:8.");
  const corta = corregirEscrita(e1, "Es regalo de Dios por fe.");
  assert.ok(corta.nota < larga.nota);
  assert.ok(corta.avisos.some((a) => a.includes("corta")));
});

test("reconoce citas abreviadas y comprueba que existan", () => {
  assert.equal(citasEscritas("como dice Ef 2.8")[0]?.libro, "Efesios");
  assert.equal(citasEscritas("1 Juan 5:13 lo promete")[0]?.libro, "1 Juan");
  assert.equal(citasEscritas("Juan 99:1").length, 0, "Juan no tiene 99 capítulos");
  const r = corregirEscrita(e3, "Nacer de nuevo es recibir vida nueva del Espíritu, es obra de Dios; puedo estar seguro por su promesa, 1 Jn 5:12, aunque no siempre lo sienta.");
  assert.ok(r.cita.valida);
  assert.ok(r.nota >= 90, `nota ${r.nota}`);
});

test("la respuesta fuera de tiempo vale cero y la pegada queda para revisar", () => {
  assert.equal(corregirEscrita(e1, e1.modelo, { tarde: true }).nota, 0);
  const pegada = corregirEscrita(e1, e1.modelo, { pegado: true });
  assert.ok(pegada.revisar);
  assert.ok(pegada.nota >= 90);
});
