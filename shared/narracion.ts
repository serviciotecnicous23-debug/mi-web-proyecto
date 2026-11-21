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
  /**
   * Dónde está el audio, si no está en la web (por ejemplo en Cloudflare R2: «https://pub-….r2.dev/academia/…»). Sin
   * ella se sirve de client/public/voz/academia/ (o de NARRACION_URL_BASE).
   */
  url?: string;
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

/**
 * Las palabras tras las que un número romano es el de una materia o un curso y se dice con el cardinal
 * («Teología sistemática IV» → «cuatro»). Tras otro nombre propio es un rey o un papa y va con el ordinal
 * («Jeroboam II» → «segundo»).
 */
const ANTES_DE_CURSO = new Set(["sistemática", "iglesia", "cristiano", "homilética", "liderazgo", "griego", "hebreo", "tomo", "volumen", "parte", "nivel", "concilio"]);

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

// «1 Corintios», «1 y 2 Samuel», «1, 2 y 3 Juan», «1-3 Juan»: libros con número que no llevan capítulo detrás
const PATRON_LIBRO_CON_NUMERO = new RegExp(
  `(?<![\\p{L}\\d:.,])([123](?:\\s*(?:,|y|al|a|[-–])\\s*[123])*)\\s+(Samuel|Reyes|${conOSinTilde("Crónicas")}|Corintios|Tesalonicenses|Timoteo|Pedro|Juan)(?![\\p{L}\\d])(?!\\s*\\d)`,
  "gu",
);

/** Los libros con número sin capítulo: «1 y 2 Samuel» → «Primero y Segundo de Samuel»; «1-3 Juan» → «Primera a Tercera de Juan». */
export function librosConNumero(texto: string): string {
  return texto.replace(PATRON_LIBRO_CON_NUMERO, (_m, numeros: string, libro: string) => {
    const dicho = DICHO.get(sinTilde(libro).toLowerCase()) ?? libro;
    const orden = ORDEN_LIBRO[MASCULINOS.has(dicho) ? "m" : "f"];
    const dichos = numeros
      .split(/\s*(,|y|al|a|[-–])\s*/)
      .map((p, i) => (i % 2 === 0 ? orden[Number(p)] : p === "," ? ", " : p === "y" ? " y " : " a "));
    return `${dichos.join("")} de ${dicho}`;
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
const PRONUNCIACION: [RegExp, string][] = [
  [/\bId y haced\b/g, "Id, y haced"],
  // el nombre de Dios en sus cuatro letras hebreas: la voz no lo dice si se le da escrito
  [/\bYHWH\b/g, "i griega, hache, doble ve, hache"],
];

/** Las siglas de verdad, que se dicen letra por letra: no se pasan a minúsculas. */
const SIGLAS = new Set([
  "ONU", "VIH", "ADN", "ARN", "OMS", "FBI", "ICE", "USA", "CCLI", "COMIBAM", "ID", "CDC", "FTC", "RLUIPA",
  // las de las especialidades: impuestos, leyes, radio, salud, capellanía y música
  "IRS", "EIN", "FEMA", "VOAD", "OCHA", "USCIS", "EEOC", "FDA", "TDCJ", "DWC", "CFR", "FR", "AP", "FCC", "AM", "FM",
  "HCJB", "KDKA", "COPPA", "CISA", "HIPAA", "ADA", "SAMHSA", "NIDA", "NCMEC", "DSM", "TR", "APC", "CPE", "PMBOK", "PMI",
  "ASCAP", "BMI", "SESAC", "GMR",
]);

/** El nombre de cada letra, para decir «P52» («pe cincuenta y dos») o «ic3» («i ce tres»). */
const LETRAS: Record<string, string> = {
  a: "a", b: "be", c: "ce", d: "de", e: "e", f: "efe", g: "ge", h: "hache", i: "i", j: "jota", k: "ka", l: "ele", m: "eme",
  n: "ene", ñ: "eñe", o: "o", p: "pe", q: "cu", r: "erre", s: "ese", t: "te", u: "u", v: "uve", w: "doble uve", x: "equis",
  y: "ye", z: "zeta",
};
const deletreo = (s: string) => s.toLowerCase().split("").map((c) => (/\d/.test(c) ? enPalabras(Number(c)) : LETRAS[c] ?? c)).join(" ");
/** Una parte de una dirección web: la palabra tal cual, o deletreada si es una sigla («ftc», «ic3»). */
const parteDeDireccion = (p: string) => (/\d/.test(p) || !/[aeiouáéíóú]/i.test(p) || p.length <= 3 && p !== "gov" ? deletreo(p) : p);
/**
 * Las palabras en mayúsculas sostenidas («YO SOY EL QUE SOY», «AL DIOS NO CONOCIDO» de la RV1960) se dicen como
 * palabras y no como siglas. Quedan igual los números romanos y las siglas de `SIGLAS`.
 */
export function sinMayusculas(texto: string): string {
  return texto.replace(/(?<!\p{L})(\p{Lu})(\p{Lu}+)(?!\p{L})/gu, (m, a: string, b: string) =>
    /^[IVXLCDM]+$/.test(m) || SIGLAS.has(m) ? m : a + b.toLowerCase(),
  );
}

/** Palabras femeninas comunes que siguen a un número (para decir «una vez», «veintiuna semanas»). */
const FEMENINAS = new Set(["vez", "veces", "semana", "semanas", "hora", "horas", "noche", "noches", "persona", "personas", "cosa", "cosas", "carta", "cartas", "iglesia", "iglesias", "lección", "lecciones", "parte", "partes", "pregunta", "preguntas", "palabra", "palabras", "materia", "materias", "mujer", "mujeres", "familia", "familias"]);
const esFemenina = (palabra: string) => FEMENINAS.has(palabra.toLowerCase()) || /^[a-záéíóúñ]+(as?|ión|iones|dad|dades)$/i.test(palabra) && !/^(día|días|mapa|mapas|programa|programas|problema|problemas|sistema|sistemas|tema|temas|idioma|idiomas|planeta|profeta|profetas|poema|poemas)$/i.test(palabra);

/** Un número dicho cifra por cifra: «005» → «cero cero cinco». */
const cifraPorCifra = (d: string) => d.split("").map((x) => enPalabras(Number(x))).join(" ");

/** Lo que sigue a un número sin ser lo que se cuenta: ahí «uno» se dice entero («el Nivel 1 antes de…»). */
const NO_SUSTANTIVO =
  /^(de|del|y|e|o|u|a|al|por|para|en|con|sin|sobre|entre|hasta|desde|hacia|según|tras|antes|después|más|menos|que|como|cuando|donde|ni|pero|ya|no|se|lo|la|las|los|le|les|es|son|fue|era)$/i;

/**
 * El texto como se dice en voz alta: las citas bíblicas, los números (con «un» y «una» delante de un sustantivo), los
 * siglos en romanos, los ordinales, los porcentajes, las abreviaturas y los signos que la voz no debe leer.
 */
export function hablado(texto: string): string {
  let t = ` ${texto} `;
  // los signos que no se leen
  t = t.replace(/[«»“”"]/g, "").replace(/[‘’]/g, "'").replace(/\s*[—–]\s*(?=\D)/g, ", ").replace(/\s*\/\s*/g, " o ").replace(/&/g, " y ");
  // «c. 48 d. C.» y «ca. 1000 a. C.» (circa): «hacia el año…»
  t = t.replace(/(?<!\p{L})c(?:a)?\.\s*(?=siglos\b)/giu, "hacia los ");
  t = t.replace(/(?<!\p{L})c(?:a)?\.\s*(?=siglo\b)/giu, "hacia el ");
  t = t.replace(/(?<!\p{L})c(?:a)?\.\s*(?=\d)/gu, "hacia el año ");
  for (const [p, r] of ABREVIATURAS) t = t.replace(p, r);
  for (const [p, r] of PRONUNCIACION) t = t.replace(p, r);
  // las citas, antes que los demás números; después, las que siguen sin el libro («Éxodo 12:14; 13:3»)
  t = citaDicha(t);
  t = librosConNumero(t);
  // un formulario o un código con guion («AP-209», «I-9», «DWC-005»): el guion no se dice («a»)
  t = t.replace(/\b([A-Z]{1,6})-(\d+)\b/g, (_m, l: string, d: string) => `${l} ${d.startsWith("0") ? cifraPorCifra(d) : d}`);
  // una hora de un horario, al empezar una frase («7:00, bienvenida», «7:10, juego»): no es una cita
  t = t.replace(/(?<=(?:^|[.;:!?])\s*)(\d{1,2}):([0-5]\d)(?=,\s(?!\d))/g, (_m, h: string, mm: string) =>
    mm === "00" ? `${enPalabras(Number(h))} en punto` : `${enPalabras(Number(h))} y ${enPalabras(Number(mm))}`,
  );
  t = t.replace(/\b(\d{1,3}):(\d{1,3}(?:\s*[-–]\s*\d{1,3})?)\b/g, (_m, cap, versos) => `${enPalabras(Number(cap))}, ${versosDichos(versos)}`);
  // los paréntesis se dicen como una pausa corta
  t = t.replace(/\s*\(\s*/g, ", ").replace(/\s*\)\s*([.,;:!?])/g, "$1").replace(/\s*\)\s*/g, ", ");
  // siglos y nombres con número romano
  // un tramo de siglos («siglos I al XV»): los dos números
  t = t.replace(/\b([Ss]iglos)\s+([IVXLC]+)(\s*(?:al|a|y|[-–])\s*)([IVXLC]+)\b/g, (m, s, r1, medio, r2) => {
    const a = deRomano(r1);
    const b = deRomano(r2);
    return a && b ? `${s} ${enPalabras(a)}${/[-–]/.test(medio) ? " al " : medio}${enPalabras(b)}` : m;
  });
  t = t.replace(/\b([Ss]iglos?)\s+([IVXLC]+)\b/g, (m, s, r) => {
    const n = deRomano(r);
    return n ? `${s} ${enPalabras(n)}` : m;
  });
  // los demás números romanos (I a X): de una materia o de un rey (no la letra de un formulario: «Formulario I 9»)
  t = t.replace(/(?<!\p{L})(\p{L}+)\s+(I{1,3}|IV|V|VI{1,3}|IX|X)(?![\p{L}\d]|\s+\d)/gu, (m, antes: string, r: string) => {
    const n = deRomano(r);
    if (!n) return m;
    const rey = /^\p{Lu}/u.test(antes) && !ANTES_DE_CURSO.has(antes.toLowerCase());
    return `${antes} ${rey && ORDINALES_M[n] ? ORDINALES_M[n] : enPalabras(n)}`;
  });
  t = sinMayusculas(t);
  // ordinales: 1.º, 2.ª, 3.er
  t = t.replace(/\b(\d{1,2})\.?\s?(º|ª|er|°)(?=\s|[.,;:])/g, (m, n, s) => {
    const k = Number(n);
    const base = ORDINALES_M[k];
    if (!base) return m;
    if (s === "ª") return base.replace(/o$/, "a");
    if (s === "er") return base.replace(/ero$/, "er");
    return base;
  });
  // las direcciones web («reportfraud.ftc.gov», «ic3.gov»)
  t = t.replace(/\b((?:[a-z0-9-]+\.)+(?:gov|org|com|net|edu))\b/g, (d) => d.split(".").map(parteDeDireccion).join(" punto "));
  // las leyes de Estados Unidos («42 U.S.C. 2000cc»)
  t = t.replace(/\bU\.\s?S\.\s?C\.\s?/g, "del Código de los Estados Unidos, sección ");
  // una letra con número («P52», «G4697» de Strong) y un número con letras («2000cc»)
  t = t.replace(/\b([A-Z])(\d{1,5})\b/g, (_m, l: string, n: string) => `${LETRAS[l.toLowerCase()]} ${enPalabras(Number(n))}`);
  t = t.replace(/\b(\d{1,5})([a-z]{1,3})\b/g, (m, n: string, l: string) => (/^(er|o|a|os|as|do|da|ro|ra|to|ta|vo|va|no|na|mo|ma)$/.test(l) ? m : `${enPalabras(Number(n))} ${deletreo(l)}`));
  // los teléfonos de emergencia y de ayuda se dicen cifra por cifra; los largos, por grupos
  t = t.replace(/\b(911|988)\b/g, (n) => n.split("").map((d) => enPalabras(Number(d))).join(" "));
  t = t.replace(/\b([2-9])-1-1\b/g, (_m, d: string) => `${enPalabras(Number(d))} uno uno`);
  // un número para mensajes de texto («escribir START al 88788»): cifra por cifra
  t = t.replace(/(\b(?:escrib|env[ií]|mand|textea)\p{L}*[^.]{0,40}?\bal\s)(\d{5,6})\b/giu, (_m, antes: string, d: string) => `${antes}${cifraPorCifra(d)}`);
  t = t.replace(/\b\d{1,3}(?:-\d{3,4}){2,}\b/g, (tel) =>
    tel
      .split("-")
      .map((g) => (g.length === 4 ? `${porCifras(g.slice(0, 2))}, ${porCifras(g.slice(2))}` : enPalabras(Number(g))))
      .join(", "),
  );
  // los artículos de ley («Código de Familia, sección 261.101», «secciones 261.106 y 261.109», «Código Penal 22.011»,
  // «47 CFR 73.1201»): el punto se dice «punto», con los ceros de después; no son miles («doscientos sesenta y un mil»)
  t = t.replace(
    /((?<!\p{L})(?:secci[oó]n(?:es)?|C[oó]digo(?:\s+(?:de\s+)?\p{L}+){0,3}|CFR|§§?))((?:[\s,]+(?:y\s+|o\s+|a\s+)?\d+\.\d+(?!\d|\.\d))+)/gu,
    (_m, antes: string, numeros: string) => antes + numeros.replace(/(\d+)\.(\d+)/g, (_n, a: string, b: string) => {
      const ceros = /^0*/.exec(b)![0].length;
      return `${enPalabras(Number(a))} punto ${"cero ".repeat(ceros)}${ceros < b.length ? enPalabras(Number(b.slice(ceros))) : ""}`.trim();
    }),
  );
  // miles con coma, como en los Estados Unidos («120,000 dólares»): no es un decimal
  t = t.replace(/\b(\d{1,3})((?:,\d{3})+)\b(?!,\d)/g, (_m, a: string, b: string) => a + b.replace(/,/g, ""));
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
    // no cambia delante de un nombre propio («en 1791 Juan Wesley»), de lo que no se cuenta («701 antes de Cristo») ni
    // si es un año («en 1521 se negó», «en 1961 lleva»)
    const anio = Number(n) >= 1000 && Number(n) <= 2100;
    if (!/uno$|ientos$/.test(dicho) || NO_SUSTANTIVO.test(palabra) || /^[A-ZÁÉÍÓÚÑ]/.test(palabra) || anio) return `${dicho}${esp}${palabra}`;
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
      const dicho = sinMayusculas(texto).replace(/[«»“”"]/g, "").replace(/\s*\(\s*/g, ", ").replace(/\s*\)\s*([.,;:!?])/g, "$1").replace(/\s*\)\s*/g, ", ").replace(/,\s*,/g, ",");
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
