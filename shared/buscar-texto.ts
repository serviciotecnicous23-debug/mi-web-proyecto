// Buscar sin importar tildes ni mayúsculas y marcar lo encontrado en el texto original (el catálogo de la academia:
// client/src/pages/academia-catalogo.tsx). No importa nada: sirve igual en el navegador y en las pruebas.

/** El texto sin tildes y en minúsculas («Oración» → «oracion»). La ñ queda como n: así se encuentra escriba como escriba. */
export function normalizar(t: string): string {
  return t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

// Las palabras que están en casi todo («la», «de»…): no se buscan ni se marcan, salvo que no se haya escrito otra cosa.
const VACIAS = new Set([
  "de", "la", "el", "los", "las", "del", "al", "en", "un", "una", "unos", "unas", "por", "con", "para", "que", "mi", "mis", "su", "sus",
  "lo", "le", "se", "es", "y", "o", "a",
]);

/** Los términos de una búsqueda: palabras de 2 letras o más, sin tildes ni mayúsculas, sin repetir y sin las vacías (hasta 8). */
export function terminos(q: string): string[] {
  const todas = [...new Set(normalizar(q).split(/[^\p{L}\p{N}]+/u).filter((p) => p.length >= 2))];
  const llenas = todas.filter((p) => !VACIAS.has(p));
  return (llenas.length ? llenas : todas).slice(0, 8);
}

// Cada término se busca al comienzo de una palabra, como en los buscadores profesionales: «ora» encuentra «oración» y
// «oraciones», pero «oración» no encuentra «adoración».
const LETRA = /[\p{L}\p{N}]/u;
/** Dónde está el término al comienzo de una palabra del texto normalizado (desde `desde`), o -1. */
function hallar(n: string, t: string, desde = 0): number {
  for (let j = n.indexOf(t, desde); j >= 0; j = n.indexOf(t, j + 1)) if (j === 0 || !LETRA.test(n[j - 1])) return j;
  return -1;
}

/** ¿Están todos los términos en el texto? (Sin términos, sí.) */
export function contieneTodos(texto: string, ts: string[]): boolean {
  const n = normalizar(texto);
  return ts.every((t) => hallar(n, t) >= 0);
}

/** ¿Está alguno de los términos en el texto? */
export function contieneAlguno(texto: string, ts: string[]): boolean {
  const n = normalizar(texto);
  return ts.some((t) => hallar(n, t) >= 0);
}

export type Pedazo = { t: string; m: boolean };

/** El texto en pedazos, con `m` en los que coinciden con algún término, para pintarlos con <mark>. */
export function marcar(texto: string, ts: string[]): Pedazo[] {
  if (!texto) return [];
  if (!ts.length) return [{ t: texto, m: false }];
  // el texto normalizado letra por letra, con el lugar de cada letra en el original
  let norm = "";
  const origen: number[] = [];
  for (let i = 0; i < texto.length; ) {
    const ch = String.fromCodePoint(texto.codePointAt(i)!);
    const n = normalizar(ch);
    for (let k = 0; k < n.length; k++) {
      norm += n[k];
      origen.push(i);
    }
    i += ch.length;
  }
  origen.push(texto.length);
  const marcado = new Array<boolean>(texto.length).fill(false);
  for (const t of ts) {
    for (let j = hallar(norm, t); j >= 0; j = hallar(norm, t, j + t.length)) {
      for (let x = origen[j]; x < origen[j + t.length]; x++) marcado[x] = true;
    }
  }
  const out: Pedazo[] = [];
  let actual = "";
  let m = marcado[0];
  for (let i = 0; i < texto.length; i++) {
    if (marcado[i] !== m) {
      if (actual) out.push({ t: actual, m });
      actual = "";
      m = marcado[i];
    }
    actual += texto[i];
  }
  if (actual) out.push({ t: actual, m });
  return out;
}
