// La narración grabada de las lecciones de la academia («Escuchar la lección» con voz natural).
// - `guionDeLeccion`: lo que dice la voz, en el orden de la página y por partes, cada una con el lugar que la página
//   resalta mientras se oye (los mismos data-bloque del cuaderno, y data-narra para el título, los objetivos y «Para la
//   vida»).
// - `hablado`: el texto escrito convertido en lo que se dice: las citas bíblicas («Juan 3:16» → «Juan tres, dieciséis»),
//   los números, los años y las abreviaturas.
// - `huellaDeLeccion`: la huella del contenido de la lección. La grabación guarda la huella con que se hizo; si la
//   lección cambia, deja de valer y la página usa la voz del aparato hasta que se grabe de nuevo.
// No importa nada: sirve igual en el navegador, en el servidor, en las pruebas y en el guion que graba las voces.

/** Cambia cuando cambia la manera de armar el guion: todas las grabaciones anteriores dejan de valer. */
export const VERSION_GUION = 1;

/** Lo que dice la voz en un lugar de la página y la pausa que hace después (en segundos). */
export type ParteGuion = { lugar: string; texto: string; pausa: number };

/** Un bloque de la lección, como lo arma el servidor (los versículos ya con su texto de la RV1960). */
export type BloqueNarrable =
  | { t: "parrafo"; texto: string }
  | { t: "subtitulo"; texto: string }
  | { t: "lista"; items: string[] }
  | { t: "nota"; titulo?: string; texto: string }
  | { t: "versiculo"; ref: string; texto?: string | null }
  | { t: "video"; url: string; titulo: string; fuente: string; minutos?: number }
  | { t: "audio"; url: string; titulo: string }
  | { t: "imagen"; src: string; alt: string; pie?: string }
  | { t: "linea"; titulo: string; eventos: { fecha: string; texto: string; ref?: string }[] }
  | { t: "cuadro"; titulo: string; columnas: string[]; filas: string[][] }
  | { t: "pasos"; titulo: string; pasos: { titulo: string; texto: string }[] }
  | { t: string; [k: string]: unknown };

export type LeccionNarrable = {
  materia: string;
  titulo: string;
  /** Su número en la materia (1, 2, 3…). */
  n: number;
  objetivos: string[];
  paraEmpezar: string;
  bloques: BloqueNarrable[];
  ideaClave: string;
  paraLaVida: { texto: string; pregunta: string };
};

/** La grabación de una lección: el archivo, la huella con que se hizo, cuánto dura y dónde empieza cada lugar. */
export type Narracion = {
  archivo: string;
  huella: string;
  segundos: number;
  voz: string;
  /** [lugar, segundo en que empieza], en orden. */
  marcas: [string, number][];
};

/** La narración que recibe la página: la dirección del audio y sus marcas. */
export type NarracionVista = { url: string; segundos: number; marcas: [string, number][] };

// ---------------------------------------------------------------- los números en palabras

const UNIDADES = ["cero", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez", "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve", "veinte", "veintiuno", "veintidós", "veintitrés", "veinticuatro", "veinticinco", "veintiséis", "veintisiete", "veintiocho", "veintinueve"];
const DECENAS = ["", "", "", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"];
const CENTENAS = ["", "ciento", "doscientos", "trescientos", "cuatrocientos", "quinientos", "seiscientos", "setecientos", "ochocientos", "novecientos"];

function menosDeMil(n: number): string {
  if (n === 100) return "cien";
  const c = Math.floor(n / 100);
  const r = n % 100;
  const partes: string[] = [];
  if (c) partes.push(CENTENAS[c]);
  if (r) partes.push(r < 30 ? UNIDADES[r] : DECENAS[Math.floor(r / 10)] + (r % 10 ? ` y ${UNIDADES[r % 10]}` : ""));
  return partes.join(" ");
}

/** Un número entero en palabras («1960» → «mil novecientos sesenta»). */
export function enPalabras(n: number): string {
  if (!Number.isFinite(n)) return String(n);
  if (n < 0) return `menos ${enPalabras(-n)}`;
  n = Math.floor(n);
  if (n < 1000) return n === 0 ? "cero" : menosDeMil(n);
  if (n < 1_000_000) {
    const miles = Math.floor(n / 1000);
    const r = n % 1000;
    const m = miles === 1 ? "mil" : `${apocopar(enPalabras(miles))} mil`;
    return r ? `${m} ${menosDeMil(r)}` : m;
  }
  const millones = Math.floor(n / 1_000_000);
  const r = n % 1_000_000;
  const m = millones === 1 ? "un millón" : `${apocopar(enPalabras(millones))} millones`;
  return r ? `${m} ${enPalabras(r)}` : m;
}
/** «uno» delante de un sustantivo: «un», «veintiún», «treinta y un». */
function apocopar(palabras: string): string {
  return palabras.replace(/veintiuno$/, "veintiún").replace(/uno$/, "un");
}
/** «una» delante de un sustantivo femenino: «una», «veintiuna», «treinta y una». */
function femenino(palabras: string): string {
  return palabras.replace(/veintiuno$/, "veintiuna").replace(/uno$/, "una").replace(/ientos\b/g, "ientas");
}

const ROMANOS: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
function deRomano(r: string): number | null {
  let total = 0;
  for (let i = 0; i < r.length; i++) {
    const v = ROMANOS[r[i]];
    if (!v) return null;
    const sig = ROMANOS[r[i + 1]] ?? 0;
    total += v < sig ? -v : v;
  }
  return total || null;
}

/** Dos cifras de un teléfono: «54» → «cincuenta y cuatro»; «00» → «cero cero». */
const porCifras = (g: string) => (g.startsWith("0") ? g.split("").map((d) => enPalabras(Number(d))).join(" ") : enPalabras(Number(g)));

const ORDINALES_M = ["", "primero", "segundo", "tercero", "cuarto", "quinto", "sexto", "séptimo", "octavo", "noveno", "décimo"];

// ---------------------------------------------------------------- las citas bíblicas

/** Los libros como se escriben en las lecciones (con o sin tilde) y como se dicen. */
const LIBROS: [string, string][] = [
  ["Génesis", "Génesis"], ["Éxodo", "Éxodo"], ["Levítico", "Levítico"], ["Números", "Números"], ["Deuteronomio", "Deuteronomio"],
  ["Josué", "Josué"], ["Jueces", "Jueces"], ["Rut", "Rut"], ["Samuel", "Samuel"], ["Reyes", "Reyes"], ["Crónicas", "Crónicas"],
  ["Esdras", "Esdras"], ["Nehemías", "Nehemías"], ["Ester", "Ester"], ["Job", "Job"], ["Salmos", "Salmo"], ["Salmo", "Salmo"],
  ["Proverbios", "Proverbios"], ["Eclesiastés", "Eclesiastés"], ["Cantares", "Cantares"], ["Isaías", "Isaías"],
  ["Jeremías", "Jeremías"], ["Lamentaciones", "Lamentaciones"], ["Ezequiel", "Ezequiel"], ["Daniel", "Daniel"],
  ["Oseas", "Oseas"], ["Joel", "Joel"], ["Amós", "Amós"], ["Abdías", "Abdías"], ["Jonás", "Jonás"], ["Miqueas", "Miqueas"],
  ["Nahúm", "Nahúm"], ["Habacuc", "Habacuc"], ["Sofonías", "Sofonías"], ["Hageo", "Hageo"], ["Zacarías", "Zacarías"],
  ["Malaquías", "Malaquías"], ["Mateo", "Mateo"], ["Marcos", "Marcos"], ["Lucas", "Lucas"], ["Juan", "Juan"],
  ["Hechos", "Hechos"], ["Romanos", "Romanos"], ["Corintios", "Corintios"], ["Gálatas", "Gálatas"], ["Efesios", "Efesios"],
  ["Filipenses", "Filipenses"], ["Colosenses", "Colosenses"], ["Tesalonicenses", "Tesalonicenses"], ["Timoteo", "Timoteo"],
  ["Tito", "Tito"], ["Filemón", "Filemón"], ["Hebreos", "Hebreos"], ["Santiago", "Santiago"], ["Pedro", "Pedro"],
  ["Judas", "Judas"], ["Apocalipsis", "Apocalipsis"],
];
/** Los libros con número que se dicen en masculino («Primero de Samuel»); los demás son cartas («Primera de Juan»). */
const MASCULINOS = new Set(["Samuel", "Reyes", "Crónicas"]);
const ORDEN_LIBRO = { m: ["", "Primero", "Segundo", "Tercero"], f: ["", "Primera", "Segunda", "Tercera"] };

const sinTilde = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "");
/** El patrón de un nombre que acepta las vocales con o sin tilde. */
const conOSinTilde = (s: string) =>
  sinTilde(s).replace(/[aeiou]/gi, (v) => ({ a: "[aá]", e: "[eé]", i: "[ií]", o: "[oó]", u: "[uúü]", A: "[AÁ]", E: "[EÉ]", I: "[IÍ]", O: "[OÓ]", U: "[UÚ]" })[v as "a"] ?? v);
const DICHO = new Map(LIBROS.map(([escrito, dicho]) => [sinTilde(escrito).toLowerCase(), dicho]));
const PATRON_LIBRO = LIBROS.map(([escrito]) => conOSinTilde(escrito)).sort((a, b) => b.length - a.length).join("|");

/** Un versículo o un tramo: «16», «15-17» → «dieciséis», «quince al diecisiete» (dos seguidos: «nueve y diez»). */
function versosDichos(v: string): string {
  const grupos = v.split(/\s*,\s*/).map((g) => {
    const [a, b] = g.split(/\s*[-–]\s*/).map(Number);
    if (b == null || Number.isNaN(b)) return enPalabras(a);
    return b === a + 1 ? `${enPalabras(a)} y ${enPalabras(b)}` : `${enPalabras(a)} al ${enPalabras(b)}`;
  });
  return grupos.length > 1 ? `${grupos.slice(0, -1).join(", ")} y ${grupos[grupos.length - 1]}` : grupos[0];
}

/** El nombre del libro como se dice («1 Juan» → «Primera de Juan»; «Salmos 23» → «Salmo veintitrés»). */
function libroDicho(numero: string | undefined, libro: string): string {
  const dicho = DICHO.get(sinTilde(libro).toLowerCase()) ?? libro;
  if (!numero) return dicho;
  const g = MASCULINOS.has(dicho) ? "m" : "f";
  return `${ORDEN_LIBRO[g][Number(numero)] ?? numero} de ${dicho}`;
}

// «1 Juan 1:9», «Mateo 16:15-17», «Juan 3:16, 18», «Juan 14», «Mateo 5:1-7:29»
const PATRON_CITA = new RegExp(
  `(?<![\\p{L}\\d])(?:([123])\\s+)?(${PATRON_LIBRO})\\s+(\\d{1,3})(?:\\s*:\\s*(\\d{1,3}(?:\\s*[-–]\\s*\\d{1,3}(?!\\s*:))?(?:\\s*,\\s*\\d{1,3}(?:\\s*[-–]\\s*\\d{1,3})?)*)(?:\\s*[-–]\\s*(\\d{1,3})\\s*:\\s*(\\d{1,3}))?)?(?![\\p{L}\\d])`,
  "gu",
);

/** Una cita como se dice dentro de un párrafo: «Juan 3:16» → «Juan tres, dieciséis». */
export function citaDicha(texto: string): string {
  return texto.replace(PATRON_CITA, (_m, numero, libro, cap, versos, cap2, verso2) => {
    const nombre = libroDicho(numero, libro);
    if (cap2) return `${nombre} ${enPalabras(Number(cap))}, ${versosDichos(versos)}, al ${enPalabras(Number(cap2))}, ${enPalabras(Number(verso2))}`;
    if (!versos) return `${nombre} ${enPalabras(Number(cap))}`;
    return `${nombre} ${enPalabras(Number(cap))}, ${versosDichos(versos)}`;
  });
}

/** La cita de un bloque de versículo, dicha con calma: «Mateo, capítulo dieciséis, versículos quince al diecisiete». */
export function encabezadoDeCita(ref: string): string {
  const limpia = ref.replace(/\s*\(.*\)\s*$/, "").trim();
  const m = new RegExp(`^(?:([123])\\s+)?(${PATRON_LIBRO})\\s+(\\d{1,3})(?:\\s*:\\s*([\\d\\s,–-]+))?$`, "u").exec(limpia);
  if (!m) return hablado(limpia);
  const [, numero, libro, cap, versos] = m;
  const nombre = libroDicho(numero, libro);
  if (!versos) return `${nombre}, capítulo ${enPalabras(Number(cap))}`;
  const varios = /[-–,]/.test(versos);
  return `${nombre}, capítulo ${enPalabras(Number(cap))}, ${varios ? "versículos" : "versículo"} ${versosDichos(versos.trim())}`;
}

// ---------------------------------------------------------------- el texto dicho

const ABREVIATURAS: [RegExp, string][] = [
  [/\bRVR?\s?1960\b/g, "Reina-Valera mil novecientos sesenta"],
  [/\bRVR?\s?1909\b/g, "Reina-Valera mil novecientos nueve"],
  [/\bNVI\b/g, "Nueva Versión Internacional"],
  [/\bNTV\b/g, "Nueva Traducción Viviente"],
  [/\bLBLA\b/g, "La Biblia de las Américas"],
  [/\bDHH\b/g, "Dios Habla Hoy"],
  [/\ba\.\s?C\./g, "antes de Cristo"],
  [/\bd\.\s?C\./g, "después de Cristo"],
  [/\bp\.\s?ej\./g, "por ejemplo"],
  [/\betc\./g, "etcétera"],
  [/\bEE\.\s?UU\./g, "Estados Unidos"],
  [/\bDr\.\s/g, "doctor "],
  [/\bDra\.\s/g, "doctora "],
  [/\bSr\.\s/g, "señor "],
  [/\bSra\.\s/g, "señora "],
  [/\bpág\.\s?/g, "página "],
  [/\bcap\.\s?/g, "capítulo "],
  [/\bvv\.\s?/g, "versículos "],
  [/\bn\.º\s?/gi, "número "],
];

/**
 * Frases que la voz dice mejor con una pausa (lo comprobó whisper al grabar): los imperativos antiguos cortos de la
 * RV1960, como «Id y haced discípulos», se le mezclan si van seguidos.
 */
const PRONUNCIACION: [RegExp, string][] = [[/\bId y haced\b/g, "Id, y haced"]];

/** Palabras femeninas comunes que siguen a un número (para decir «una vez», «veintiuna semanas»). */
const FEMENINAS = new Set(["vez", "veces", "semana", "semanas", "hora", "horas", "noche", "noches", "persona", "personas", "cosa", "cosas", "carta", "cartas", "iglesia", "iglesias", "lección", "lecciones", "parte", "partes", "pregunta", "preguntas", "palabra", "palabras", "materia", "materias", "mujer", "mujeres", "familia", "familias"]);
const esFemenina = (palabra: string) => FEMENINAS.has(palabra.toLowerCase()) || /^[a-záéíóúñ]+(as?|ión|iones|dad|dades)$/i.test(palabra) && !/^(día|días|mapa|mapas|programa|programas|problema|problemas|sistema|sistemas|tema|temas|idioma|idiomas|planeta|profeta|profetas|poema|poemas)$/i.test(palabra);

/**
 * El texto como se dice en voz alta: las citas bíblicas, los números (con «un» y «una» delante de un sustantivo), los
 * siglos en romanos, los ordinales, los porcentajes, las abreviaturas y los signos que la voz no debe leer.
 */
export function hablado(texto: string): string {
  let t = ` ${texto} `;
  // los signos que no se leen
  t = t.replace(/[«»“”"]/g, "").replace(/[‘’]/g, "'").replace(/\s*[—–]\s*(?=\D)/g, ", ").replace(/\s*\/\s*/g, " o ").replace(/&/g, " y ");
  for (const [p, r] of ABREVIATURAS) t = t.replace(p, r);
  for (const [p, r] of PRONUNCIACION) t = t.replace(p, r);
  // las citas, antes que los demás números; después, las que siguen sin el libro («Éxodo 12:14; 13:3»)
  t = citaDicha(t);
  t = t.replace(/\b(\d{1,3}):(\d{1,3}(?:\s*[-–]\s*\d{1,3})?)\b/g, (_m, cap, versos) => `${enPalabras(Number(cap))}, ${versosDichos(versos)}`);
  // los paréntesis se dicen como una pausa corta
  t = t.replace(/\s*\(\s*/g, ", ").replace(/\s*\)\s*([.,;:!?])/g, "$1").replace(/\s*\)\s*/g, ", ");
  // siglos y nombres con número romano
  t = t.replace(/\b([Ss]iglos?)\s+([IVXLC]+)\b/g, (m, s, r) => {
    const n = deRomano(r);
    return n ? `${s} ${enPalabras(n)}` : m;
  });
  // ordinales: 1.º, 2.ª, 3.er
  t = t.replace(/\b(\d{1,2})\.?\s?(º|ª|er|°)(?=\s|[.,;:])/g, (m, n, s) => {
    const k = Number(n);
    const base = ORDINALES_M[k];
    if (!base) return m;
    if (s === "ª") return base.replace(/o$/, "a");
    if (s === "er") return base.replace(/ero$/, "er");
    return base;
  });
  // los teléfonos de emergencia y de ayuda se dicen cifra por cifra; los largos, por grupos
  t = t.replace(/\b(911|988)\b/g, (n) => n.split("").map((d) => enPalabras(Number(d))).join(" "));
  t = t.replace(/\b\d{1,3}(?:-\d{3,4}){2,}\b/g, (tel) =>
    tel
      .split("-")
      .map((g) => (g.length === 4 ? `${porCifras(g.slice(0, 2))}, ${porCifras(g.slice(2))}` : enPalabras(Number(g))))
      .join(", "),
  );
  // porcentajes y decimales
  t = t.replace(/(\d+(?:,\d+)?)\s?%/g, (_m, n) => `${n} por ciento`);
  t = t.replace(/\b(\d+),(\d+)\b/g, (_m, a, b: string) => `${enPalabras(Number(a))} coma ${b.startsWith("0") ? b.split("").map((d) => enPalabras(Number(d))).join(" ") : enPalabras(Number(b))}`);
  // miles con punto («5.674»)
  t = t.replace(/\b(\d{1,3}(?:\.\d{3})+)\b/g, (m) => m.replace(/\./g, ""));
  // un tramo que empieza en una fecha con palabras («27 antes de Cristo-14 después de Cristo»)
  t = t.replace(/([a-záéíóúñ])\s?[-–]\s?(\d)/gi, "$1 a $2");
  // un tramo de números («1569–1602», «1-3»)
  t = t.replace(/\b(\d+)\s?[-–]\s?(\d+)\b/g, (_m, a, b) => `${enPalabras(Number(a))} a ${enPalabras(Number(b))}`);
  // un número delante de un sustantivo: «1 libro» → «un libro», «21 semanas» → «veintiuna semanas»
  t = t.replace(/\b(\d+)(\s+)([a-záéíóúñ]+)/gi, (m, n, esp, palabra) => {
    const dicho = enPalabras(Number(n));
    if (!/uno$|ientos$/.test(dicho) || /^(de|y|o|a|al|por|para|en|con)$/i.test(palabra)) return `${dicho}${esp}${palabra}`;
    return `${esFemenina(palabra) ? femenino(dicho) : apocopar(dicho)}${esp}${palabra}`;
  });
  t = t.replace(/\b\d+\b/g, (n) => enPalabras(Number(n)));
  // espacios y puntuación
  t = t.replace(/\s+([.,;:!?])/g, "$1").replace(/([,;:])(?=[^\s\d])/g, "$1 ").replace(/,\s*,/g, ",").replace(/\s+/g, " ").trim();
  // una coma justo después del fin de una oración («…Testamento., Malaquías…»): sobra
  t = t.replace(/([.!?…])\s*,\s*/g, "$1 ");
  t = t.replace(/^[,;:]\s*/, "").replace(/\s*[,;:]$/, "");
  return t;
}

/** Termina con punto si no termina ya con un signo (así la voz baja el tono al final). */
const conPunto = (s: string) => (/[.!?…:;]$/.test(s.trim()) ? s.trim() : `${s.trim()}.`);
/** «Explicar qué…» → «explicar qué…» (para decir los objetivos seguidos). */
const enMinuscula = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);
/** El texto de un versículo sin los números de verso que la página pone delante de cada uno. */
export const sinNumerosDeVerso = (texto: string) => texto.replace(/(^|\s)\d{1,3}\s+(?=\S)/g, "$1").replace(/\s+/g, " ").trim();
const sinPuntoFinal = (s: string) => s.trim().replace(/[.;:]+$/, "");

/** Lo que se dice de un bloque (vacío: no se dice nada) y la pausa después. */
function parteDeBloque(b: BloqueNarrable): { texto: string; pausa: number } {
  switch (b.t) {
    case "subtitulo":
      return { texto: conPunto(hablado(String(b.texto ?? ""))), pausa: 0.8 };
    case "parrafo":
      return { texto: hablado(String(b.texto ?? "")), pausa: 0.7 };
    case "lista": {
      const items = Array.isArray(b.items) ? (b.items as unknown[]).map((x) => conPunto(hablado(String(x)))) : [];
      return { texto: items.join(" "), pausa: 0.7 };
    }
    case "nota": {
      const titulo = typeof b.titulo === "string" && b.titulo.trim() ? `${conPunto(hablado(b.titulo))} ` : "";
      return { texto: `${titulo}${hablado(String(b.texto ?? ""))}`, pausa: 0.8 };
    }
    case "versiculo": {
      const texto = typeof b.texto === "string" ? sinNumerosDeVerso(b.texto) : "";
      if (!texto) return { texto: "", pausa: 0 };
      // las palabras de la RV1960 tal cual; para la voz, sin comillas ni números de verso, y los paréntesis como pausa
      const dicho = texto.replace(/[«»“”"]/g, "").replace(/\s*\(\s*/g, ", ").replace(/\s*\)\s*([.,;:!?])/g, "$1").replace(/\s*\)\s*/g, ", ").replace(/,\s*,/g, ",");
      return { texto: `${conPunto(encabezadoDeCita(String(b.ref)))} ${conPunto(dicho)}`, pausa: 0.9 };
    }
    case "video":
      return { texto: conPunto(hablado(`En la página tienes el video ${sinPuntoFinal(String(b.titulo ?? ""))}`)), pausa: 0.6 };
    case "audio":
      return { texto: conPunto(hablado(`En la página tienes el audio ${sinPuntoFinal(String(b.titulo ?? ""))}`)), pausa: 0.6 };
    case "imagen":
      return { texto: typeof b.pie === "string" && b.pie.trim() ? conPunto(hablado(b.pie)) : "", pausa: 0.6 };
    case "linea": {
      const eventos = Array.isArray(b.eventos) ? (b.eventos as { fecha?: string; texto?: string; ref?: string }[]) : [];
      const dichos = eventos.map((e) => conPunto(hablado(`${e.fecha ?? ""}: ${sinPuntoFinal(e.texto ?? "")}${e.ref ? ` (${e.ref})` : ""}`)));
      return { texto: `Línea de tiempo: ${conPunto(hablado(String(b.titulo ?? "")))} ${dichos.join(" ")}`, pausa: 0.9 };
    }
    case "cuadro": {
      const columnas = Array.isArray(b.columnas) ? (b.columnas as string[]) : [];
      const filas = Array.isArray(b.filas) ? (b.filas as string[][]) : [];
      // cada fila se dice por su primera celda, y después cada dato con el nombre de su columna
      const dichas = filas.map((f) => {
        const [primera, ...resto] = f;
        // el nombre de la columna sin lo que tenga entre paréntesis («La Pascua (Éxodo 12)» → «La Pascua»)
        const nombre = (c: string | undefined) => (c ? sinPuntoFinal(c.replace(/\s*\([^)]*\)/g, "")) : "");
        const datos = resto.map((x, i) => (x?.trim() ? `${nombre(columnas[i + 1]) ? `${nombre(columnas[i + 1])}: ` : ""}${conPunto(x)}` : "")).filter(Boolean);
        return conPunto(hablado(`${conPunto(primera ?? "")} ${datos.join(" ")}`));
      });
      return { texto: `Cuadro comparativo: ${conPunto(hablado(String(b.titulo ?? "")))} ${dichas.join(" ")}`, pausa: 0.9 };
    }
    case "pasos": {
      const pasos = Array.isArray(b.pasos) ? (b.pasos as { titulo?: string; texto?: string }[]) : [];
      const dichos = pasos.map((x, i) => `Paso ${enPalabras(i + 1)}: ${conPunto(hablado(x.titulo ?? ""))} ${conPunto(hablado(x.texto ?? ""))}`);
      return { texto: `${conPunto(hablado(String(b.titulo ?? "")))} ${dichos.join(" ")}`, pausa: 0.9 };
    }
    default: {
      // un bloque de otro tipo: se dice lo que tenga escrito
      const x = b as Record<string, unknown>;
      const partes = [x.titulo, x.texto, ...(Array.isArray(x.items) ? x.items : [])].filter((v): v is string => typeof v === "string" && !!v.trim());
      return { texto: partes.map((x) => conPunto(hablado(x))).join(" "), pausa: 0.7 };
    }
  }
}

/** Los objetivos dichos en una frase: «Al terminar esta lección podrás explicar…, explicar… y distinguir…». */
function objetivosDichos(objetivos: string[]): string {
  const xs = objetivos.map((o) => enMinuscula(sinPuntoFinal(hablado(o)))).filter(Boolean);
  if (!xs.length) return "";
  const lista = xs.length === 1 ? xs[0] : `${xs.slice(0, -1).join("; ")}; y ${xs[xs.length - 1]}`;
  return `Al terminar esta lección podrás ${lista}.`;
}

/**
 * Lo que dice la voz, en el orden de la página: el título (con la materia y el número), los objetivos, «Para empezar»,
 * cada bloque, la idea clave y «Para la vida». Cada parte lleva el lugar de la página que se resalta mientras se oye.
 */
export function guionDeLeccion(l: LeccionNarrable): ParteGuion[] {
  const partes: ParteGuion[] = [];
  const poner = (lugar: string, texto: string, pausa: number) => {
    const limpio = texto.replace(/\s+/g, " ").trim();
    if (limpio) partes.push({ lugar, texto: limpio, pausa });
  };
  poner("titulo", `${conPunto(hablado(l.materia))} Lección ${enPalabras(l.n)}: ${conPunto(hablado(l.titulo))}`, 0.9);
  poner("objetivos", objetivosDichos(l.objetivos), 0.9);
  poner("-1", `Para empezar. ${hablado(l.paraEmpezar)}`, 0.9);
  l.bloques.forEach((b, i) => {
    const p = parteDeBloque(b);
    poner(String(i), p.texto, p.pausa);
  });
  poner("-2", `La idea clave. ${conPunto(hablado(l.ideaClave))}`, 1);
  poner("vida", `Para la vida. ${hablado(l.paraLaVida.texto)} ${conPunto(hablado(l.paraLaVida.pregunta))} Cuando estés listo, responde el repaso de la lección.`, 0);
  return partes;
}

/** FNV-1a de 32 bits, en hexadecimal (8 cifras): basta para saber si el texto cambió. */
function fnv1a(texto: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < texto.length; i++) {
    h ^= texto.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, "0");
}

/**
 * La huella del contenido de una lección tal como se narra (con las citas, no con el texto que se trae de la Biblia,
 * que no cambia). Si cambia el texto, el orden, el título o la manera de armar el guion, cambia la huella.
 */
export function huellaDeLeccion(l: LeccionNarrable): string {
  const bloques = l.bloques.map((b) => (b.t === "versiculo" ? { t: b.t, ref: b.ref } : b));
  return fnv1a(JSON.stringify([VERSION_GUION, l.materia, l.titulo, l.n, l.objetivos, l.paraEmpezar, bloques, l.ideaClave, l.paraLaVida]));
}

/** La marca que corresponde a un segundo del audio (el último lugar que ya empezó). */
export function lugarEn(marcas: readonly [string, number][], segundo: number): number {
  let k = -1;
  for (let i = 0; i < marcas.length; i++) {
    if (marcas[i][1] <= segundo + 0.05) k = i;
    else break;
  }
  return k;
}
