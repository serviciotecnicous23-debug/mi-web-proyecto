// Las páginas de la academia no bajan el catálogo (20-nov-2026). Antes, cada página bajaba shared/academia.ts entero
// (467 kB: los sílabos de todas las materias) aunque solo usara una constante. Ahora toman lo liviano de
// shared/academia-base.ts (y el reglamento, de shared/academia-reglamento.ts), y lo del catálogo, de la API.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import * as academia from "./academia";
import * as base from "./academia-base";
import * as reglamento from "./academia-reglamento";

const raiz = path.resolve(import.meta.dirname, "..");
const archivos = (dir: string): string[] =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? archivos(p) : /\.(ts|tsx)$/.test(e.name) ? [p] : [];
  });

test("ninguna página importa el catálogo (shared/academia.ts): lo liviano está en academia-base", () => {
  const malos = archivos(path.join(raiz, "client", "src")).filter((f) =>
    /(?:from\s*|import\s*\(\s*)["'](?:@shared|(?:\.\.\/)+shared)\/academia["']/.test(fs.readFileSync(f, "utf8")),
  );
  assert.deepEqual(malos.map((f) => path.relative(raiz, f)), []);
});

test("lo liviano y el reglamento no importan el catálogo", () => {
  for (const nombre of ["academia-base.ts", "academia-reglamento.ts"]) {
    const texto = fs.readFileSync(path.join(raiz, "shared", nombre), "utf8");
    assert.doesNotMatch(texto, /from\s*["']\.\/academia["']/, nombre);
  }
});

test("shared/academia.ts vuelve a exportar todo lo liviano y el reglamento (el servidor importa de allí)", () => {
  for (const [nombre, valor] of [...Object.entries(base), ...Object.entries(reglamento)]) {
    assert.equal((academia as Record<string, unknown>)[nombre], valor, nombre);
  }
});

test("las especialidades y los niveles de lo liviano son los del catálogo", () => {
  assert.deepEqual([...base.ESPECIALIDAD_IDS].sort(), academia.ESPECIALIDADES.map((e) => e.id).sort());
  assert.deepEqual(base.NIVELES_N, academia.NIVELES.map((n) => n.n));
  assert.deepEqual(base.ETAPAS.flatMap((e) => e.niveles), base.NIVELES_N);
  // el reglamento cuenta los niveles y las etapas
  const intro = reglamento.REGLAMENTO.secciones.flatMap((s) => s.puntos).find((p) => p.startsWith("La academia tiene"));
  assert.ok(intro?.startsWith(`La academia tiene ${academia.NIVELES.length} niveles en ${base.ETAPAS.length} etapas.`), intro);
});

test("las reglas que las páginas usan sin el catálogo dan lo mismo que con él", () => {
  for (const m of academia.todasLasMaterias()) {
    m.lecciones.forEach((l, i) => assert.equal(base.esLeccionPublica(m.nivel, i), academia.leccionPublica(l.id), l.id));
    // las mini pruebas, con las lecciones o solo con cuántas son (el mapa de la API)
    assert.deepEqual(base.miniPruebasDe({ nivel: m.nivel, lecciones: m.lecciones.length }), base.miniPruebasDe(m), m.id);
  }
  assert.deepEqual(base.miniPruebasDe({ nivel: 2, lecciones: 7 }), [
    { n: 1, lecciones: [1, 2, 3] },
    { n: 2, lecciones: [4, 5, 6] },
    { n: 3, lecciones: [7] },
  ]);
  assert.deepEqual(base.miniPruebasDe({ nivel: 1, lecciones: 7 }), []);
});
