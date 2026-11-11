import { BIBLE_BOOKS } from "./libros-biblia";

// Los nombres de BIBLE_BOOKS van sin tilde porque así están GUARDADOS en notas,
// resaltados y planes de lectura: no cambiarlos. Para mostrarlos, bibleBookLabel().

export const BIBLE_BOOK_CHAPTERS: Record<string, number> = {
  "Genesis": 50, "Exodo": 40, "Levitico": 27, "Numeros": 36, "Deuteronomio": 34,
  "Josue": 24, "Jueces": 21, "Rut": 4, "1 Samuel": 31, "2 Samuel": 24,
  "1 Reyes": 22, "2 Reyes": 25, "1 Cronicas": 29, "2 Cronicas": 36,
  "Esdras": 10, "Nehemias": 13, "Ester": 10, "Job": 42, "Salmos": 150,
  "Proverbios": 31, "Eclesiastes": 12, "Cantares": 8, "Isaias": 66, "Jeremias": 52,
  "Lamentaciones": 5, "Ezequiel": 48, "Daniel": 12, "Oseas": 14, "Joel": 3,
  "Amos": 9, "Abdias": 1, "Jonas": 4, "Miqueas": 7, "Nahum": 3,
  "Habacuc": 3, "Sofonias": 3, "Hageo": 2, "Zacarias": 14, "Malaquias": 4,
  "Mateo": 28, "Marcos": 16, "Lucas": 24, "Juan": 21, "Hechos": 28,
  "Romanos": 16, "1 Corintios": 16, "2 Corintios": 13, "Galatas": 6, "Efesios": 6,
  "Filipenses": 4, "Colosenses": 4, "1 Tesalonicenses": 5, "2 Tesalonicenses": 3,
  "1 Timoteo": 6, "2 Timoteo": 4, "Tito": 3, "Filemon": 1, "Hebreos": 13,
  "Santiago": 5, "1 Pedro": 5, "2 Pedro": 3, "1 Juan": 5, "2 Juan": 1,
  "3 Juan": 1, "Judas": 1, "Apocalipsis": 22,
};

// Solo los que cambian; el resto se muestra tal cual (nombres de la RV1960).
const BIBLE_BOOK_LABELS: Record<string, string> = {
  "Genesis": "Génesis", "Exodo": "Éxodo", "Levitico": "Levítico", "Numeros": "Números",
  "Josue": "Josué", "1 Cronicas": "1 Crónicas", "2 Cronicas": "2 Crónicas",
  "Nehemias": "Nehemías", "Eclesiastes": "Eclesiastés", "Isaias": "Isaías",
  "Jeremias": "Jeremías", "Amos": "Amós", "Abdias": "Abdías", "Jonas": "Jonás",
  "Sofonias": "Sofonías", "Zacarias": "Zacarías", "Malaquias": "Malaquías",
  "Galatas": "Gálatas", "Filemon": "Filemón",
};

export function bibleBookLabel(book: string): string {
  return BIBLE_BOOK_LABELS[book] ?? book;
}

/** Número canónico del libro (Génesis = 1 … Apocalipsis = 66), o 0 si no existe. */
export function bibleBookNumber(book: string): number {
  return (BIBLE_BOOKS as readonly string[]).indexOf(book) + 1;
}

export const NEW_TESTAMENT_START = "Mateo";

// Versiones que hoy se pueden servir. La NVI ya no está disponible en ningún
// proveedor gratuito (Biblica lo prohíbe) y la RV1995 tampoco.
export const BIBLE_VERSIONS = {
  rv1960: { label: "RV1960", desc: "Reina-Valera 1960" },
  ntv: { label: "NTV", desc: "Nueva Traducción Viviente" },
  lbla: { label: "LBLA", desc: "La Biblia de las Américas" },
  rv1909: { label: "RV1909", desc: "Reina-Valera 1909 (dominio público)" },
} as const;

export type BibleVersion = keyof typeof BIBLE_VERSIONS;
export const DEFAULT_BIBLE_VERSION: BibleVersion = "rv1960";

export function isBibleVersion(value: string): value is BibleVersion {
  return Object.prototype.hasOwnProperty.call(BIBLE_VERSIONS, value);
}

export type BibleChapterPayload = {
  version: BibleVersion;
  /** Si la versión pedida no respondió y se sirvió el respaldo de dominio público. */
  fallbackFrom?: BibleVersion;
  book: string;
  chapter: number;
  verses: { verse: number; text: string }[];
};
