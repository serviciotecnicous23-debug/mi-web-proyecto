/**
 * Lo que la pantalla necesita saber del «Basta» bíblico (sin la lista de palabras, que es solo del servidor).
 */
export const CATEGORIAS_BASTA = ["personaje", "lugar", "libro", "objeto"] as const;
export type CatBasta = (typeof CATEGORIAS_BASTA)[number];
export const NOMBRE_CAT_BASTA: Record<CatBasta, { nombre: string; icono: string; ejemplo: string }> = {
  personaje: { nombre: "Personaje", icono: "🧔", ejemplo: "Moisés" },
  lugar: { nombre: "Lugar", icono: "🏞️", ejemplo: "Belén" },
  libro: { nombre: "Libro de la Biblia", icono: "📖", ejemplo: "Génesis" },
  objeto: { nombre: "Objeto", icono: "🏺", ejemplo: "Cántaro" },
};
/** Las letras que tienen respuesta en las cuatro categorías. */
export const LETRAS_BASTA = ["A", "C", "D", "E", "F", "G", "H", "J", "L", "M", "N", "O", "P", "R", "S", "T"] as const;

export const BASTA = {
  rondas: 5,
  escribirMs: 90_000,
  /** Después del «¡Basta!», lo que tienen los demás para terminar de escribir. */
  bastaMs: 6000,
  revisarMs: 9500,
  prepararMs: 3500,
  unica: 100,
  repetida: 50,
  largoMax: 32,
} as const;

/** Cómo se compara una respuesta: sin tildes ni mayúsculas, sin «el/la», sin «1» o «primera de», sin «monte», «río»… */
export function normalizarBasta(s: string): string {
  let t = String(s ?? "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9 ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const prefijos = /^(el|la|los|las|un|una|san|santo|santa|1|2|3|i|ii|iii|1a|2a|3a|1ra|2da|3ra|1ro|2do|primera|segunda|tercera|primero|segundo|tercero|monte|rio|libro|evangelio|carta|epistola|tierra|valle|de|del|a|al|los)\s+/;
  for (let k = 0; k < 6 && prefijos.test(t); k++) t = t.replace(prefijos, "");
  return t;
}

/** Lo que se ve de una respuesta mientras se escribe: sin saltos de línea ni signos raros, y no muy larga. */
export const limpiarRespuestaBasta = (s: unknown) =>
  String(typeof s === "string" ? s : "")
    .replace(/[^\p{L}\p{N} '.-]+/gu, " ")
    .replace(/\s+/g, " ")
    .trimStart()
    .slice(0, BASTA.largoMax);
