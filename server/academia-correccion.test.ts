// Pruebas del corrector automático de respuestas escritas: npx tsx --test server/academia-correccion.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { buscarForma, citasEscritas, corregirEscrita, distancia, palabrasDe, problemasDeClave, type ClaveEscrita } from "./academia-correccion";
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

test("«basta»: si la pregunta pide tres de cinco ideas, tres ya dan la nota completa", () => {
  const e2 = BANCOS.get("n1-espiritu")!.escritas.find((e) => e.id === "n1-espiritu-e2")!;
  assert.equal(e2.basta, 60);
  const tres = corregirEscrita(e2, "El Espíritu Santo nos convence de pecado, nos hace nacer de nuevo con una vida nueva y nos da testimonio de que somos hijos de Dios.");
  assert.ok(tres.nota >= 95, `nota ${tres.nota}`);
  const dos = corregirEscrita(e2, "El Espíritu Santo nos convence de pecado y también nos hace nacer de nuevo cuando creemos en Jesús.");
  assert.ok(dos.nota < tres.nota && dos.nota >= 55, `nota ${dos.nota}`);
});

test("una negación metida en medio no es un concepto errado: «el bautismo no salva» ≠ «el bautismo salva»", () => {
  const b1 = BANCOS.get("n1-bautismo-cena")!.escritas.find((e) => e.id === "n1-bautismo-cena-e1")!;
  const bien = corregirEscrita(b1, "El bautismo no salva, porque somos salvos por gracia; el agua no lava los pecados. Simboliza que morimos y resucitamos con Cristo a una vida nueva.");
  assert.deepEqual(bien.detalle.errores, [], "sin conceptos errados");
  assert.ok(bien.detalle.ideas.includes("no-salva") && bien.nota >= 75, `nota ${bien.nota}`);
  const mal = corregirEscrita(b1, "El bautismo salva porque el agua lava los pecados, y simboliza que morimos y resucitamos con Cristo a una vida nueva.");
  assert.ok(mal.detalle.errores.includes("bautismo-salva"));
  assert.ok(!mal.detalle.ideas.includes("no-salva") && mal.revisar);
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

// (una clave de prueba con ideas de varias palabras: las que el orden puede cambiar)
const cruz: ClaveEscrita = {
  id: "prueba-cruz",
  tipo: "corta",
  pregunta: "¿Qué hizo Jesús por nosotros en la cruz?",
  ideas: [
    { id: "murio", peso: 50, texto: "Que murió en nuestro lugar.", formas: ["murio en nuestro lugar", "murio por nosotros"] },
    { id: "pago", peso: 50, texto: "Que pagó el precio del pecado.", formas: ["pago el precio del pecado"] },
  ],
  modelo: "Jesús murió en nuestro lugar y pagó el precio del pecado en la cruz.",
};

test("lo mismo con las palabras en otro orden vale entero", () => {
  const r = corregirEscrita(cruz, "En la cruz, por nosotros Jesús murió; el precio de nuestro pecado lo pagó él completo para darnos vida eterna.");
  assert.ok(r.nota >= 90, `nota ${r.nota}`);
  assert.deepEqual(r.ideas.map((i) => i.ok), [true, true]);
});

test("una idea a medias vale la mitad y se marca en amarillo", () => {
  const r = corregirEscrita(cruz, "Jesús pagó todo por nuestro pecado cuando estuvo en la cruz, y así nos dio una vida nueva con Dios para siempre.");
  assert.equal(r.ideas[0].ok, false);
  assert.ok(!r.ideas[0].medio, "de morir no dijo nada");
  assert.equal(r.ideas[1].ok, false);
  assert.equal(r.ideas[1].medio, true);
  assert.equal(r.nota, 25);
  assert.deepEqual(r.detalle.medias, ["pago"]);
});

test("con una negación cerca, ni entera ni a medias", () => {
  const r = corregirEscrita(cruz, "Hay quienes dicen que Jesús no murió por nosotros ni pagó el precio del pecado, pero eso no es lo que enseña la Biblia.");
  assert.deepEqual(r.ideas.map((i) => i.ok || !!i.medio), [false, false]);
});

test("una forma con su «no» no le da media idea a lo contrario", () => {
  const gozo: ClaveEscrita = {
    id: "prueba-gozo",
    tipo: "corta",
    pregunta: "¿De qué depende el gozo del creyente?",
    ideas: [
      { id: "no-circ", peso: 50, texto: "Que no depende de las circunstancias.", formas: ["no depende de las circunstancias"] },
      { id: "cristo", peso: 50, texto: "Que viene de Cristo.", formas: ["viene de cristo", "esta en cristo"] },
    ],
    modelo: "El gozo del creyente no depende de las circunstancias: viene de Cristo y de su presencia.",
  };
  const contrario = corregirEscrita(gozo, "Pienso que el gozo depende de las circunstancias que uno vive cada día, si te va bien estás feliz y si no, no.");
  assert.equal(contrario.ideas[0].ok, false);
  assert.ok(!contrario.ideas[0].medio, "lo contrario no se lleva media idea");
  const bien = corregirEscrita(gozo, "El gozo verdadero de las circunstancias no depende, porque Cristo nos lo da y viene de él aunque todo vaya mal en la vida.");
  assert.ok(bien.ideas[0].ok || bien.ideas[0].medio, "con su negación y en otro orden sí cuenta");
});
