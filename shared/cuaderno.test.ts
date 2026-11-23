// El cuaderno de apuntes (shared/cuaderno.ts): el formato, las citas bíblicas, lo que se guarda y las plantillas.
// npx tsx --test shared/cuaderno.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  LIMITES, PLANTILLAS, bloque, bloquesValidos, citaEscrita, citaGuardada, citasDeNota, etiquetasValidas, grupoDeFecha, paraBuscar, sinMarcas, textoPlano, trozosDe,
} from "./cuaderno";

test("las marcas: negrita, cursiva y resaltado, sin tocar el resto", () => {
  const z = trozosDe("La **gracia** es un _regalo_ de ==Dios==.");
  assert.deepEqual(
    z.map((x) => [x.t, !!x.negrita, !!x.cursiva, !!x.resaltado]),
    [["La ", false, false, false], ["gracia", true, false, false], [" es un ", false, false, false], ["regalo", false, true, false], [" de ", false, false, false], ["Dios", false, false, true], [".", false, false, false]],
  );
  // un guion bajo dentro de una palabra no es cursiva
  assert.equal(trozosDe("mi_archivo_final").length, 1);
  assert.equal(sinMarcas("**Fe** y ==obras=="), "Fe y obras");
});

test("las citas bíblicas escritas a mano se reconocen, también en minúscula y con rangos", () => {
  const z = trozosDe("Lee Juan 3:16, 1 Corintios 13:4-7 y salmo 23:1; no versículo 3:16.");
  const citas = z.filter((x) => x.cita).map((x) => [x.t, x.cita!.libro, x.cita!.capitulo, x.cita!.desde, x.cita!.hasta]);
  assert.deepEqual(citas, [
    ["Juan 3:16", "Juan", 3, 16, 16],
    ["1 Corintios 13:4-7", "1 Corintios", 13, 4, 7],
    ["salmo 23:1", "Salmos", 23, 1, 1],
  ]);
  assert.equal(citaEscrita("Juan 99:1"), null, "un capítulo que no existe no es cita");
  assert.equal(citaEscrita("Libro 3:16"), null);
  assert.equal(citaEscrita("gálatas 5:22-23")?.libro, "Galatas");
});

test("las citas de una nota: las escritas, los versículos y lo copiado de la Biblia, sin repetir", () => {
  const bloques = [
    bloque("texto", "Como dice Juan 3:16 y también **Juan 3:16**."),
    bloque("versiculo", "", { ref: "Romanos 5:1" }),
    bloque("cita", "Por gracia sois salvos", { fuente: { tipo: "biblia", ref: "Efesios 2:8" } }),
  ];
  assert.deepEqual(citasDeNota(bloques).map(citaGuardada).sort(), ["Efesios|2|8|8", "Juan|3|16|16", "Romanos|5|1|1"]);
  assert.equal(textoPlano(bloques), "Como dice Juan 3:16 y también Juan 3:16.\nRomanos 5:1\nPor gracia sois salvos");
});

test("lo que llega al servidor se limpia: tipos, ids, colores, tareas y límites", () => {
  const r = bloquesValidos([
    { id: "a1", t: "tarea", texto: "Leer Hechos 2", hecho: 1, extra: "no" },
    { id: "a1", t: "aviso", texto: "Importante", color: "verde" },
    { t: "versiculo", texto: "", ref: "Juan 20:31" },
    { t: "lista", texto: "uno", nivel: 2 },
    { t: "lista", texto: "dos", nivel: 9, color: "morado" },
    { t: "cita", texto: "x", fuente: { tipo: "leccion", id: "n1-salvacion-1", titulo: "¿Quién es Jesús?" } },
  ]);
  assert.ok("bloques" in r);
  const b = (r as { bloques: any[] }).bloques;
  assert.equal(b[0].hecho, true);
  assert.equal(b[0].extra, undefined, "lo desconocido se quita");
  assert.notEqual(b[1].id, "a1", "un id repetido se cambia");
  assert.equal(b[1].color, "verde");
  assert.equal(b[2].ref, "Juan 20:31");
  assert.equal(b[3].nivel, 2);
  assert.equal(b[4].nivel, undefined);
  assert.equal(b[4].color, undefined);
  assert.deepEqual(b[5].fuente, { tipo: "leccion", id: "n1-salvacion-1", titulo: "¿Quién es Jesús?" });
  assert.ok("error" in bloquesValidos([{ t: "script", texto: "x" }]));
  assert.ok("error" in bloquesValidos("hola"));
  assert.ok("error" in bloquesValidos([{ t: "texto", texto: "x".repeat(LIMITES.textoBloque + 1) }]));
  assert.ok("error" in bloquesValidos(Array.from({ length: LIMITES.bloques + 1 }, () => ({ t: "texto", texto: "" }))));
});

test("las etiquetas: sin «#», sin repetir (sin importar tildes) y como mucho 12", () => {
  assert.deepEqual(etiquetasValidas(["#Oración", "oracion", "  fe  ", 3, "Evangelismo"]), ["Oración", "fe", "Evangelismo"]);
  assert.equal(etiquetasValidas(Array.from({ length: 20 }, (_, i) => `e${i}`)).length, LIMITES.etiquetas);
  assert.equal(paraBuscar("Oración y GRACIA"), "oracion y gracia");
});

test("las plantillas traen bloques válidos y nuevos cada vez", () => {
  for (const p of PLANTILLAS) {
    const a = p.bloques();
    const b = p.bloques();
    assert.ok(a.length >= 3, p.id);
    assert.ok("bloques" in bloquesValidos(a), p.id);
    assert.notEqual(a[0].id, b[0].id, `${p.id}: ids nuevos en cada nota`);
  }
});

test("el subrayado y el tachado, como en Notas, sin confundirse con la cursiva", () => {
  const z = trozosDe("Es ++importante++ y ya no ~~pendiente~~, con _fe_.");
  assert.deepEqual(z.filter((x) => x.subrayado).map((x) => x.t), ["importante"]);
  assert.deepEqual(z.filter((x) => x.tachado).map((x) => x.t), ["pendiente"]);
  assert.deepEqual(z.filter((x) => x.cursiva).map((x) => x.t), ["fe"]);
  assert.equal(sinMarcas("Es ++importante++ y ~~no~~"), "Es importante y no");
  // un signo suelto no se toma como marca
  assert.equal(trozosDe("2 + 2 = 4 y ~ 5").length, 1);
});

test("los grupos de la lista por fecha: hoy, ayer, los últimos 7 y 30 días, el mes y el año", () => {
  const ahora = new Date(2026, 10, 23, 10, 0);
  const hace = (d: number) => new Date(2026, 10, 23 - d, 9, 0).toISOString();
  assert.equal(grupoDeFecha(hace(0), ahora), "Hoy");
  assert.equal(grupoDeFecha(hace(1), ahora), "Ayer");
  assert.equal(grupoDeFecha(hace(3), ahora), "Últimos 7 días");
  assert.equal(grupoDeFecha(hace(20), ahora), "Últimos 30 días");
  assert.equal(grupoDeFecha(new Date(2026, 2, 5).toISOString(), ahora), "Marzo");
  assert.equal(grupoDeFecha(new Date(2025, 6, 1).toISOString(), ahora), "2025");
});
