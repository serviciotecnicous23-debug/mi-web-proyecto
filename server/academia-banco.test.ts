// Pruebas de las reglas del banco: npx tsx --test server/academia-banco.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { examenDe, materiaPorId } from "@shared/academia";
import { createHash } from "node:crypto";
import { BANCOS, CONTENIDO } from "./academia/index";
import { PRACTICAS } from "./academia/laboratorio/index";
import { PRACTICAS_POR_MATERIA } from "./academia/practicas/index";
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

test("la huella incluye las prácticas de las lecciones: si cambia una frase, la aprobación deja de estar vigente", () => {
  const pm = PRACTICAS_POR_MATERIA.get(materia.id)!;
  assert.ok(Object.keys(pm.lecciones).length > 0);
  // con prácticas, la huella ya no es la de antes
  assert.notEqual(calcularHuella(materia), huellaSinLaboratorio(materia));
  const a = pm.lecciones["n1-salvacion-1"][1] as any;
  const antes = calcularHuella(materia);
  const texto = a.versiones[0].explica;
  a.versiones[0].explica = `${texto} `;
  try {
    assert.notEqual(calcularHuella(materia), antes);
  } finally {
    a.versiones[0].explica = texto;
  }
  assert.equal(calcularHuella(materia), antes);
});

/** La huella como era antes del laboratorio: la ficha, las lecciones y el banco. */
function huellaSinLaboratorio(m: NonNullable<ReturnType<typeof materiaPorId>>): string {
  const { disponible: _disponible, ...ficha } = m;
  const lecciones = m.lecciones.map((l) => CONTENIDO.get(l.id) ?? null);
  return createHash("sha256").update(JSON.stringify({ ficha, lecciones, banco: BANCOS.get(m.id) ?? null })).digest("hex").slice(0, 32);
}

test("la huella incluye las prácticas del laboratorio solo en las materias que las tienen", () => {
  const conPracticas = new Set(PRACTICAS.map((p) => p.materia));
  assert.ok(conPracticas.size >= 1);
  // las materias sin prácticas (ni del laboratorio ni de las lecciones) guardan la misma huella: sus aprobaciones siguen
  // vigentes
  const sinNada = materiaPorId("n3-hermeneutica")!;
  assert.ok(!conPracticas.has(sinNada.id) && !PRACTICAS_POR_MATERIA.has(sinNada.id));
  assert.equal(calcularHuella(sinNada), huellaSinLaboratorio(sinNada));
  for (const id of Array.from(conPracticas)) {
    const m = materiaPorId(id)!;
    assert.notEqual(calcularHuella(m), huellaSinLaboratorio(m), id);
    // si cambia una práctica, cambia la huella (y la aprobación deja de estar vigente)
    const p = PRACTICAS.find((x) => x.materia === id)!;
    const antes = calcularHuella(m);
    const titulo = p.titulo;
    p.titulo = `${titulo} `;
    try {
      assert.notEqual(calcularHuella(m), antes, id);
    } finally {
      p.titulo = titulo;
    }
    assert.equal(calcularHuella(m), antes, id);
  }
});
