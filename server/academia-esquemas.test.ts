import { test } from "node:test";
import assert from "node:assert/strict";
import { leccionPorId, materiaPorId, parsearCita, type MateriaDef } from "@shared/academia";
import { COMPLEMENTOS, aplicarComplementos } from "@shared/academia-complementos";
import { BANCOS, CONTENIDO } from "./academia/index";
import { BLOQUES_EXTRA } from "./academia/esquemas";
import { CASOS } from "./academia/casos";
import { problemasDeBloque } from "./academia/validar-bloques";
import type { Bloque } from "./academia/tipos";

test("un esquema bien hecho no tiene problemas; uno mal hecho dice qué le falta", () => {
  const linea: Bloque = {
    t: "linea",
    titulo: "Del éxodo al exilio",
    eventos: [
      { fecha: "c. 1446 a. C.", texto: "Salida de Egipto", ref: "Éxodo 12:41" },
      { fecha: "c. 1010 a. C.", texto: "David, rey de Israel" },
      { fecha: "722 a. C.", texto: "Caída de Samaria" },
      { fecha: "586 a. C.", texto: "Caída de Jerusalén" },
    ],
  };
  assert.deepEqual(problemasDeBloque(linea), []);
  const corta: Bloque = { ...linea, eventos: linea.eventos.slice(0, 2) };
  assert.ok(problemasDeBloque(corta).some((p) => p.includes("los eventos")));
  const cuadro: Bloque = { t: "cuadro", titulo: "Bautismo y Santa Cena", columnas: ["", "Bautismo", "Santa Cena"], filas: [["Qué es", "a", "b"], ["Cuántas veces", "Una", "Muchas"], ["Quién", "El que cree"]] };
  const pc = problemasDeBloque(cuadro);
  assert.ok(pc.some((p) => p.includes("la columna 1 vacío")), "una columna vacía");
  assert.ok(pc.some((p) => p.includes("la fila 3 tiene 2 celdas")), "una fila corta");
  const pasos: Bloque = { t: "pasos", titulo: "Estudiar un pasaje", pasos: [{ titulo: "Observar", texto: "¿Qué dice?" }, { titulo: "Interpretar", texto: "¿Qué significa?" }, { titulo: "Aplicar", texto: "Dice «haz esto»" }] };
  assert.ok(problemasDeBloque(pasos).some((p) => p.includes("comillas")), "sin texto bíblico entre comillas");
  // los demás bloques no se revisan aquí
  assert.deepEqual(problemasDeBloque({ t: "parrafo", texto: "x" }), []);
});

test("los complementos agregan libros sin repetir y la lectura ampliada", () => {
  const m = { id: "x", silabo: { bibliografia: { basica: [{ autor: "A", titulo: "Uno" }], complementaria: [] as { autor: string; titulo: string }[] } } } as unknown as MateriaDef;
  aplicarComplementos(new Map([["x", m]]), {
    x: {
      basica: [{ autor: "A", titulo: "Uno" }, { autor: "B", titulo: "Dos", editorial: "Vida" }],
      complementaria: [{ autor: "C", titulo: "Tres", editorial: "CLIE" }],
      ampliada: { lectura: "Romanos 1–8", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Romanos&cap=1", minutos: 45, reporte: ["a", "b", "c"] },
    },
    noexiste: { basica: [{ autor: "Z", titulo: "Z" }] },
  });
  assert.deepEqual(m.silabo!.bibliografia.basica.map((l) => l.titulo), ["Uno", "Dos"]);
  assert.deepEqual(m.silabo!.bibliografia.complementaria.map((l) => l.titulo), ["Tres"]);
  assert.equal(m.silabo!.ampliada?.minutos, 45);
});

test("los esquemas y videos agregados van al final de su lección y están bien hechos", () => {
  for (const [leccionId, bloques] of Object.entries(BLOQUES_EXTRA)) {
    const l = leccionPorId(leccionId);
    assert.ok(l, `la lección ${leccionId} existe`);
    const c = CONTENIDO.get(leccionId)!;
    assert.deepEqual(c.bloques.slice(-bloques.length), bloques, `${leccionId}: los agregados quedan al final`);
    for (const b of bloques) {
      assert.deepEqual(problemasDeBloque(b), [], `${leccionId}: ${JSON.stringify(b).slice(0, 80)}`);
      if (b.t === "video") assert.match(b.url, /^https:\/\/www\.youtube\.com\/watch\?v=[\w-]{11}$/, `${leccionId}: video de YouTube`);
      if (b.t === "linea") for (const e of b.eventos) if (e.ref) assert.ok(parsearCita(e.ref), `${leccionId}: referencia válida «${e.ref}»`);
    }
  }
});

test("las preguntas de casos están en el banco del final, bien formadas y sin repetir ids", () => {
  const ids = new Set<string>();
  for (const [materiaId, casos] of Object.entries(CASOS)) {
    const m = materiaPorId(materiaId);
    assert.ok(m, `la materia ${materiaId} existe`);
    const objetivos = new Set((m!.silabo?.objetivos ?? []).map((o) => o.id));
    const final = BANCOS.get(materiaId)!.final;
    for (const p of casos) {
      assert.ok(final.includes(p), `${p.id} está en el banco del final`);
      assert.ok(!ids.has(p.id), `${p.id} no se repite`);
      ids.add(p.id);
      assert.match(p.id, new RegExp(`^${materiaId}-caso-\\d+$`));
      assert.ok(objetivos.has(p.objetivo), `${p.id}: el objetivo ${p.objetivo} existe`);
      assert.ok(p.leccion >= 1 && p.leccion <= m!.lecciones.length, `${p.id}: lección válida`);
      assert.ok(["aplicar", "analizar", "evaluar"].includes(p.bloom), `${p.id}: nivel de Bloom de aplicación`);
      assert.equal(new Set([p.correcta, ...p.falsas].map((x) => x.trim().toLowerCase())).size, 4, `${p.id}: 4 opciones distintas`);
      assert.ok(parsearCita(p.ref), `${p.id}: cita válida`);
      assert.ok(!/[«»]/.test(p.texto + p.correcta + p.falsas.join("")), `${p.id}: sin comillas bíblicas en el caso ni en las opciones`);
    }
  }
});

test("los complementos son de materias que existen y la lectura ampliada enlaza bien", () => {
  for (const [id, c] of Object.entries(COMPLEMENTOS)) {
    assert.ok(materiaPorId(id), `la materia ${id} existe`);
    for (const l of [...(c.basica ?? []), ...(c.complementaria ?? [])]) assert.ok(l.autor && l.titulo && l.editorial, `${id}: libro completo (${l.titulo})`);
    if (c.ampliada) {
      assert.equal(c.ampliada.reporte.length, 3, `${id}: 3 preguntas guía`);
      if (c.ampliada.url) assert.match(c.ampliada.url, /^\/biblioteca\?libro=[^&]+&cap=\d+$/, `${id}: enlace a la Biblioteca`);
    }
  }
});
