/**
 * Los 66 libros de la Biblia, en orden. Viven aparte del esquema de la base de datos (shared/schema.ts los reexporta)
 * para que la portada y shared/bible.ts no carguen drizzle ni zod.
 */
export const BIBLE_BOOKS = [
  "Genesis", "Exodo", "Levitico", "Numeros", "Deuteronomio",
  "Josue", "Jueces", "Rut", "1 Samuel", "2 Samuel",
  "1 Reyes", "2 Reyes", "1 Cronicas", "2 Cronicas",
  "Esdras", "Nehemias", "Ester", "Job", "Salmos",
  "Proverbios", "Eclesiastes", "Cantares", "Isaias", "Jeremias",
  "Lamentaciones", "Ezequiel", "Daniel", "Oseas", "Joel",
  "Amos", "Abdias", "Jonas", "Miqueas", "Nahum",
  "Habacuc", "Sofonias", "Hageo", "Zacarias", "Malaquias",
  "Mateo", "Marcos", "Lucas", "Juan", "Hechos",
  "Romanos", "1 Corintios", "2 Corintios", "Galatas", "Efesios",
  "Filipenses", "Colosenses", "1 Tesalonicenses", "2 Tesalonicenses",
  "1 Timoteo", "2 Timoteo", "Tito", "Filemon", "Hebreos",
  "Santiago", "1 Pedro", "2 Pedro", "1 Juan", "2 Juan",
  "3 Juan", "Judas", "Apocalipsis",
] as const;
