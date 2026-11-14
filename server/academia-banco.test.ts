// Pruebas de las reglas del banco: npx tsx --test server/academia-banco.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { examenDe, materiaPorId } from "@shared/academia";
import { BANCOS } from "./academia/index";
import { calcularHuella, huellaDe, porQueNoSeRetira } from "./academia-banco";

const banco = BANCOS.get("n1-salvacion")!;
const materia = materiaPorId("n1-salvacion")!;
const medida = examenDe(materia);

test("se puede retirar una pregunta mientras el banco no quede corto", () => {
  assert.equal(porQueNoSeRetira(banco.final[0].id, new Set()), null);
  // retirar repartiendo por lecciones hasta que no se pueda más
  const porLeccion = new Map<number, string[]>();
  for (const p of banco.final) porLeccion.set(p.leccion, [...(porLeccion.get(p.leccion) ?? []), p.id]);
  const turnos = [...porLeccion.values()];
  const retiradas = new Set<string>();
  for (let vuelta = 0; vuelta < 20; vuelta++) {
    for (const ids of turnos) {
      const id = ids[vuelta];
      if (id && porQueNoSeRetira(id, retiradas) === null) retiradas.add(id);
    }
  }
  const activas = banco.final.filter((p) => !retiradas.has(p.id));
  assert.ok(retiradas.size > 0);
  assert.ok(activas.length >= medida.objetivas * 2, `quedan ${activas.length}`);
  const cupo = Math.ceil(medida.objetivas / porLeccion.size);
  for (const n of porLeccion.keys()) assert.ok(activas.filter((p) => p.leccion === n).length > cupo, `la lección ${n} queda con más de ${cupo}`);
  // y la que sigue ya no se puede
  const otra = activas[0];
  assert.ok(porQueNoSeRetira(otra.id, retiradas));
});

test("una lección nunca queda con menos preguntas de las que el examen saca de ella", () => {
  const deLaUno = banco.final.filter((p) => p.leccion === 1).map((p) => p.id);
  const retiradas = new Set<string>();
  let mensaje: string | null = null;
  for (const id of deLaUno) {
    mensaje = porQueNoSeRetira(id, retiradas);
    if (mensaje) break;
    retiradas.add(id);
  }
  assert.ok(mensaje && mensaje.startsWith("La lección 1 quedaría con"), String(mensaje));
});

test("las escritas: siempre quedan al menos 2 (el doble de las que pide el examen)", () => {
  const [a, b] = banco.escritas;
  assert.equal(porQueNoSeRetira(a.id, new Set()), null);
  const no = porQueNoSeRetira(b.id, new Set([a.id]));
  assert.ok(no && no.includes("al menos 2"), String(no));
});

test("las del repaso y las que no existen no se retiran", () => {
  const repaso = Object.values(banco.repaso)[0][0];
  assert.ok(porQueNoSeRetira(repaso.id, new Set())?.includes("no está en el banco"));
  assert.ok(porQueNoSeRetira("no-existe", new Set()));
});

test("la huella del contenido: estable, distinta por materia y sin contar «disponible»", () => {
  const h = huellaDe(materia);
  assert.match(h, /^[0-9a-f]{32}$/);
  assert.equal(huellaDe(materia), h);
  assert.equal(calcularHuella(materia), h);
  assert.notEqual(huellaDe(materiaPorId("n1-oracion")!), h);
  // abrir la materia no cambia la huella; cambiar su texto, sí
  assert.equal(calcularHuella({ ...materia, disponible: !materia.disponible }), h);
  assert.notEqual(calcularHuella({ ...materia, resumen: `${materia.resumen} ` }), h);
  assert.notEqual(calcularHuella({ ...materia, lecciones: materia.lecciones.slice(1) }), h);
});
