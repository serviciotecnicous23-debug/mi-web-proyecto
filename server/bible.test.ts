// La espera antes de reintentar cuando Bolls responde 429. npx tsx --test server/bible.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { BIBLE_BOOK_CHAPTERS, bibleBookNumber } from "@shared/bible";
import { capituloRv1909Local, esperaTras429, getBibleChapter } from "./bible";

test("la RV1909 de la web trae los 66 libros con todos sus capítulos", () => {
  for (const [libro, capitulos] of Object.entries(BIBLE_BOOK_CHAPTERS)) {
    const n = bibleBookNumber(libro);
    assert.ok(n >= 1 && n <= 66, libro);
    for (let c = 1; c <= capitulos; c++) {
      const versos = capituloRv1909Local(n, c);
      assert.ok(versos && versos.length > 0, `${libro} ${c} sin versículos`);
      assert.ok(versos!.every((v) => Number.isInteger(v.verse) && v.verse > 0 && v.text.trim().length > 0), `${libro} ${c}`);
    }
    assert.equal(capituloRv1909Local(n, capitulos + 1), null, `${libro} no tiene capítulo ${capitulos + 1}`);
  }
});

test("la RV1909 de la web tiene el texto de 1909, con sus tildes, y los salmos sin el título dentro del versículo 1", () => {
  const juan3 = capituloRv1909Local(bibleBookNumber("Juan"), 3)!;
  assert.equal(juan3.length, 36);
  assert.equal(
    juan3.find((v) => v.verse === 16)?.text,
    "Porque de tal manera amó Dios al mundo, que ha dado á su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.",
  );
  assert.equal(capituloRv1909Local(bibleBookNumber("Genesis"), 1)![0].text, "EN el principio crió Dios los cielos y la tierra.");
  assert.equal(capituloRv1909Local(bibleBookNumber("Salmos"), 23)![0].text, "JEHOVÁ es mi pastor; nada me faltará.");
  assert.ok(capituloRv1909Local(bibleBookNumber("Salmos"), 3)![0].text.startsWith("¡OH Jehová"), "sin «Salmo de David…»");
});

test("pedir la RV1909 no sale a internet ni a la base: responde con la de la web", async () => {
  const antes = globalThis.fetch;
  globalThis.fetch = (() => Promise.reject(new Error("sin internet en la prueba"))) as typeof fetch;
  try {
    const c = await getBibleChapter("rv1909", "Romanos", 8);
    assert.equal(c.verses.length, 39);
    assert.equal(c.fallbackFrom, undefined);
  } finally {
    globalThis.fetch = antes;
  }
});

test("ante un 429 se espera lo que pide el proveedor, entre 0,3 y 2 segundos", () => {
  assert.equal(esperaTras429(null), 800, "sin Retry-After, 0,8 s");
  assert.equal(esperaTras429("1"), 1000);
  assert.equal(esperaTras429("5"), 2000, "nunca más de 2 s: la persona está esperando");
  assert.equal(esperaTras429("0.1"), 300, "nunca menos de 0,3 s");
  assert.equal(esperaTras429("Wed, 21 Oct 2026 07:28:00 GMT"), 800, "una fecha en vez de segundos: 0,8 s");
  assert.equal(esperaTras429("0"), 800);
});
