/**
 * El corrector automático de las respuestas escritas de la academia (docs/academia.md, «El corrector»).
 *
 * Sigue la idea de dos sistemas académicos de Moodle: la pregunta «Pattern-match» de la Open University (respuestas
 * cortas comparadas con patrones) y el «Essay (auto-grade)» (nota preliminar por palabras y frases clave, que el
 * profesor puede cambiar). Cada pregunta escrita tiene una CLAVE DE CORRECCIÓN con las ideas que una buena respuesta
 * debe tener, cada una con sus formas aceptadas y su peso. El corrector:
 *
 * - normaliza lo escrito (sin mayúsculas, tildes ni signos) y tolera faltas pequeñas (se escribe en el teléfono);
 * - busca cada idea, con hasta 2 palabras de más entre las palabras de una forma;
 * - entiende la negación: «no es un regalo» no cuenta como «es un regalo»; «no es por obras» sí cuenta cuando la idea
 *   es justamente esa (idea `negativa`);
 * - marca los conceptos errados afirmados («es por obras») y anula la idea que contradicen;
 * - reconoce las citas bíblicas que escribe el alumno (también abreviadas: «Ef 2:8») y comprueba que existan;
 * - cuida la forma: mínimo de palabras, respuestas que copian la pregunta o que son solo palabras sueltas;
 * - devuelve la nota y una explicación idea por idea, y marca «para revisar» lo dudoso (la nota automática vale
 *   mientras quien tenga el cargo no la cambie).
 *
 * Las claves viven SOLO en el servidor (server/academia/bancos/): el alumno nunca ve las formas aceptadas.
 */
import { BIBLE_BOOK_CHAPTERS, bibleBookLabel } from "@shared/bible";
import { ESCRITA, type CorreccionVista, type TipoEscrita } from "@shared/academia";

export type Idea = {
  id: string;
  peso: number;
  /** Lo que se le devuelve al alumno: la idea en una frase. */
  texto: string;
  /**
   * Las formas aceptadas. Cada forma es una frase de palabras separadas por espacios:
   * - `palabra`: esa palabra (sin tildes; tolera una letra de diferencia desde 5 letras y dos desde 9);
   * - `raiz*`: cualquier palabra que empiece así (`merec*` = merece, merecemos, merecido…);
   * - `(a|b|c*)`: cualquiera de esas.
   * Entre dos palabras de la forma puede haber hasta 2 palabras más.
   */
  formas: string[];
  /** La idea ya es una negación («no es por obras»): no se descarta por llevar un «no» delante. */
  negativa?: boolean;
};

export type ConceptoErrado = {
  id: string;
  /** Lo que se le explica al alumno si lo afirma. */
  texto: string;
  formas: string[];
  /** La idea que contradice: si el error aparece afirmado, esa idea no cuenta. */
  anula?: string;
};

export type ClaveEscrita = {
  id: string;
  tipo: TipoEscrita;
  pregunta: string;
  ideas: Idea[];
  /** Citas que sostienen la respuesta. Una de estas (o una que se cruce) gana `pesoCita`; otra cita válida, la mitad. */
  citas?: string[];
  pesoCita?: number;
  errores?: ConceptoErrado[];
  /** Una respuesta modelo, para la revisión al terminar y para el profesor. */
  modelo: string;
};

export type ResultadoCorreccion = CorreccionVista & {
  /** Para la Dirección académica: qué ideas y errores encontró, y por qué la marcó. */
  detalle: { ideas: string[]; errores: string[]; marcas: string[]; puntos: number; total: number };
};

// ---------------------------------------------------------------- normalización

/** Sin tildes, en minúsculas; la ñ queda como n (igual en lo escrito y en las claves). */
export function normalizar(s: string): string {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

export function palabrasDe(s: string): string[] {
  return normalizar(s).replace(/[^a-z0-9]+/g, " ").trim().split(" ").filter(Boolean);
}

const NEGADORES = new Set(["no", "ni", "nunca", "jamas", "sin", "tampoco", "nadie", "nada", "ningun", "ninguna", "ninguno"]);

/** Las palabras más comunes del español: una respuesta casi sin ellas es una lista de palabras sueltas. */
const FUNCIONALES = new Set(
  ("a al algo algun alguna algunas algunos ante antes aqui asi aun aunque cada como con contra cual cuando de del desde donde dos e el ella ellas ellos " +
    "en entre era eres es esa ese eso esta este esto estos estas fue ha han hasta hay he la las le les lo los mas me mi mis mucho muy nada ni no nos nosotros " +
    "o otra otro para pero poco por porque que quien se ser si sin sino sobre solo somos son su sus tambien tan tanto te ti tiene tienen todo todos tu tus " +
    "un una uno unos y ya yo nuestra nuestro nuestras nuestros vamos va van hace hacer puede pueden debe deben estar esta estan").split(" "),
);

/** Distancia de edición (Levenshtein) acotada: devuelve tope+1 en cuanto se pasa. */
export function distancia(a: string, b: string, tope = 2): number {
  if (Math.abs(a.length - b.length) > tope) return tope + 1;
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    let min = i;
    for (let j = 1; j <= b.length; j++) {
      const v = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      cur.push(v);
      if (v < min) min = v;
    }
    if (min > tope) return tope + 1;
    prev = cur;
  }
  return prev[b.length];
}

type Comparador = (w: string) => boolean;

function comparadorDe(token: string): Comparador {
  if (token.startsWith("(") && token.endsWith(")")) {
    const alternativas = token.slice(1, -1).split("|").filter(Boolean).map(comparadorDe);
    return (w) => alternativas.some((c) => c(w));
  }
  if (token.endsWith("*")) {
    const raiz = token.slice(0, -1);
    return (w) => w.startsWith(raiz) || (raiz.length >= 5 && w.length >= raiz.length && w[0] === raiz[0] && distancia(w.slice(0, raiz.length), raiz, 1) <= 1);
  }
  const tolera = token.length >= 9 ? 2 : token.length >= 5 ? 1 : 0;
  return (w) => w === token || (tolera > 0 && w[0] === token[0] && distancia(w, token, tolera) <= tolera);
}

const formaCache = new Map<string, Comparador[]>();
function comparadoresDe(forma: string): Comparador[] {
  let c = formaCache.get(forma);
  if (!c) {
    c = normalizar(forma).trim().split(/\s+/).filter(Boolean).map(comparadorDe);
    formaCache.set(forma, c);
  }
  return c;
}

/** Dónde empieza cada aparición de la forma (con hasta 2 palabras de más entre sus palabras). */
export function buscarForma(ws: string[], forma: string): { desde: number; hasta: number }[] {
  const cs = comparadoresDe(forma);
  const out: { desde: number; hasta: number }[] = [];
  if (!cs.length) return out;
  for (let i = 0; i < ws.length; i++) {
    if (!cs[0](ws[i])) continue;
    let pos = i;
    let ok = true;
    for (let k = 1; k < cs.length; k++) {
      let hallado = -1;
      for (let j = pos + 1; j <= Math.min(ws.length - 1, pos + 3); j++) {
        if (cs[k](ws[j])) {
          hallado = j;
          break;
        }
      }
      if (hallado < 0) {
        ok = false;
        break;
      }
      pos = hallado;
    }
    if (ok) out.push({ desde: i, hasta: pos });
  }
  return out;
}

/** ¿Hay una negación en las 3 palabras de antes? */
function negada(ws: string[], desde: number): boolean {
  for (let j = Math.max(0, desde - 3); j < desde; j++) if (NEGADORES.has(ws[j])) return true;
  return false;
}

/** La idea aparece afirmada (o, si es una idea negativa, aparece tal cual). */
function aparece(ws: string[], formas: string[], negativa: boolean): boolean {
  for (const f of formas) {
    for (const m of buscarForma(ws, f)) {
      if (negativa || !negada(ws, m.desde)) return true;
    }
  }
  return false;
}

// ---------------------------------------------------------------- citas bíblicas

const LIBRO_NORMAL = new Map(Object.keys(BIBLE_BOOK_CHAPTERS).map((k) => [normalizar(k).replace(/\s+/g, ""), k]));
const ABREVIATURAS: Record<string, string> = {
  gn: "Genesis", gen: "Genesis", ex: "Exodo", exo: "Exodo", lv: "Levitico", lev: "Levitico", nm: "Numeros", num: "Numeros", dt: "Deuteronomio", deut: "Deuteronomio",
  jos: "Josue", jue: "Jueces", rt: "Rut", "1s": "1 Samuel", "1sa": "1 Samuel", "1sam": "1 Samuel", "2s": "2 Samuel", "2sa": "2 Samuel", "2sam": "2 Samuel",
  "1r": "1 Reyes", "1re": "1 Reyes", "2r": "2 Reyes", "2re": "2 Reyes", "1cr": "1 Cronicas", "2cr": "2 Cronicas", esd: "Esdras", neh: "Nehemias", est: "Ester",
  sal: "Salmos", sl: "Salmos", salmo: "Salmos", pr: "Proverbios", prov: "Proverbios", ec: "Eclesiastes", ecl: "Eclesiastes", cnt: "Cantares", cant: "Cantares",
  is: "Isaias", isa: "Isaias", jer: "Jeremias", lm: "Lamentaciones", lam: "Lamentaciones", ez: "Ezequiel", eze: "Ezequiel", dn: "Daniel", dan: "Daniel",
  os: "Oseas", jl: "Joel", am: "Amos", abd: "Abdias", jon: "Jonas", mi: "Miqueas", miq: "Miqueas", nah: "Nahum", hab: "Habacuc", sof: "Sofonias",
  hag: "Hageo", zac: "Zacarias", mal: "Malaquias",
  mt: "Mateo", mat: "Mateo", mc: "Marcos", mr: "Marcos", mar: "Marcos", lc: "Lucas", luc: "Lucas", jn: "Juan", jua: "Juan", hch: "Hechos", hech: "Hechos",
  ro: "Romanos", rom: "Romanos", "1co": "1 Corintios", "1cor": "1 Corintios", "2co": "2 Corintios", "2cor": "2 Corintios", ga: "Galatas", gal: "Galatas",
  ef: "Efesios", efe: "Efesios", fil: "Filipenses", flp: "Filipenses", col: "Colosenses", "1ts": "1 Tesalonicenses", "1tes": "1 Tesalonicenses",
  "2ts": "2 Tesalonicenses", "2tes": "2 Tesalonicenses", "1ti": "1 Timoteo", "1tim": "1 Timoteo", "2ti": "2 Timoteo", "2tim": "2 Timoteo", tit: "Tito",
  flm: "Filemon", heb: "Hebreos", stg: "Santiago", sant: "Santiago", "1p": "1 Pedro", "1pe": "1 Pedro", "1ped": "1 Pedro", "2p": "2 Pedro", "2pe": "2 Pedro",
  "2ped": "2 Pedro", "1jn": "1 Juan", "1ju": "1 Juan", "2jn": "2 Juan", "3jn": "3 Juan", jud: "Judas", ap: "Apocalipsis", apoc: "Apocalipsis",
};

type CitaEscrita = { libro: string; capitulo: number; desde: number; hasta: number; texto: string };

/** Las citas bíblicas que escribió el alumno («Efesios 2:8», «ef 2.8-9», «1 Juan 5:13»), solo las que existen. */
export function citasEscritas(texto: string): CitaEscrita[] {
  const t = normalizar(texto);
  const re = /(?:^|[^a-z0-9])((?:[123]\s*)?[a-z]{1,15})\.?\s+(\d{1,3})\s*[:.,]\s*(\d{1,3})(?:\s*[-–]\s*(\d{1,3}))?/g;
  const out: CitaEscrita[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(t))) {
    const clave = m[1].replace(/\s+/g, "");
    const libro = LIBRO_NORMAL.get(clave) ?? ABREVIATURAS[clave];
    if (!libro) continue;
    const capitulo = Number(m[2]);
    const desde = Number(m[3]);
    const hasta = m[4] ? Math.max(desde, Number(m[4])) : desde;
    if (capitulo < 1 || capitulo > BIBLE_BOOK_CHAPTERS[libro] || desde < 1) continue;
    out.push({ libro, capitulo, desde, hasta, texto: `${bibleBookLabel(libro)} ${capitulo}:${desde}${hasta > desde ? `-${hasta}` : ""}` });
  }
  return out;
}

function citaDeClave(ref: string): { libro: string; capitulo: number; desde: number; hasta: number } | null {
  const c = citasEscritas(ref)[0];
  return c ? { libro: c.libro, capitulo: c.capitulo, desde: c.desde, hasta: c.hasta } : null;
}

// ---------------------------------------------------------------- la corrección

export type OpcionesCorreccion = { pegado?: boolean; tarde?: boolean };

/** Corrige una respuesta escrita con su clave. Devuelve la nota (0–100), la explicación y si hay que revisarla. */
export function corregirEscrita(clave: ClaveEscrita, texto: string, op: OpcionesCorreccion = {}): ResultadoCorreccion {
  const { min, max } = ESCRITA[clave.tipo];
  const todas = palabrasDe(texto);
  const ws = todas.slice(0, Math.ceil(max * 1.5));
  const avisos: string[] = [];
  const marcas: string[] = [];

  // conceptos errados afirmados (anulan la idea que contradicen)
  const errores = (clave.errores ?? []).filter((e) => aparece(ws, e.formas, false));
  const anuladas = new Set(errores.map((e) => e.anula).filter(Boolean) as string[]);
  for (const e of errores) {
    avisos.push(e.texto);
    marcas.push(`concepto errado: ${e.id}`);
  }

  // las ideas
  const encontradas = new Set<string>();
  for (const idea of clave.ideas) {
    if (!anuladas.has(idea.id) && aparece(ws, idea.formas, !!idea.negativa)) encontradas.add(idea.id);
  }
  let puntos = clave.ideas.filter((i) => encontradas.has(i.id)).reduce((a, i) => a + i.peso, 0);
  let total = clave.ideas.reduce((a, i) => a + i.peso, 0);

  // la cita
  const pesoCita = clave.citas?.length ? clave.pesoCita ?? 10 : 0;
  const escritas = citasEscritas(texto);
  let citaEncontrada: string | null = null;
  let citaValida = false;
  if (pesoCita) {
    total += pesoCita;
    const pedidas = (clave.citas ?? []).map(citaDeClave).filter(Boolean) as NonNullable<ReturnType<typeof citaDeClave>>[];
    const buena = escritas.find((c) => pedidas.some((p) => p.libro === c.libro && p.capitulo === c.capitulo && c.desde <= p.hasta && c.hasta >= p.desde));
    if (buena) {
      puntos += pesoCita;
      citaEncontrada = buena.texto;
      citaValida = true;
    } else if (escritas.length) {
      puntos += pesoCita / 2;
      citaEncontrada = escritas[0].texto;
      citaValida = true;
      avisos.push("La cita existe, pero no es de las que mejor enseñan esta verdad.");
    }
  }

  let nota = total ? (100 * puntos) / total : 0;

  // la forma de la respuesta
  if (todas.length < 3) {
    nota = 0;
    avisos.push("Escribe tu respuesta con tus palabras.");
  } else {
    if (todas.length < min) {
      nota *= todas.length / min;
      avisos.push(`Tu respuesta es corta: escribe al menos ${min} palabras.`);
    }
    if (todas.length > max * 1.5) avisos.push(`Tu respuesta es muy larga: se corrigieron las primeras ${Math.ceil(max * 1.5)} palabras.`);
    const funcionales = ws.filter((w) => FUNCIONALES.has(w)).length;
    if (ws.length >= 8 && funcionales / ws.length < 0.18) {
      nota = Math.min(nota, 50);
      avisos.push("Escribe frases completas, no solo palabras sueltas.");
      marcas.push("lista de palabras");
    }
    // solo las palabras con contenido (sin «de», «que», «la»…): una respuesta honesta repite algunas de la pregunta
    const pregunta = new Set(palabrasDe(clave.pregunta).filter((w) => !FUNCIONALES.has(w)));
    const propias = new Set(ws.filter((w) => !FUNCIONALES.has(w)));
    const iguales = [...propias].filter((w) => pregunta.has(w)).length;
    if (propias.size >= 4 && iguales / propias.size > 0.8) {
      nota = 0;
      avisos.push("Respondiste con las mismas palabras de la pregunta.");
      marcas.push("copia de la pregunta");
    }
  }
  if (op.pegado) {
    marcas.push("texto pegado");
    avisos.push("Pegaste texto en la respuesta: quedará para revisión.");
  }
  if (op.tarde) {
    nota = 0;
    marcas.push("fuera de tiempo");
    avisos.push("La respuesta llegó fuera de tiempo.");
  }

  nota = Math.round(Math.max(0, Math.min(100, nota)));
  const dudosa = nota >= 40 && nota < 75;
  if (dudosa) marcas.push("nota dudosa");
  return {
    nota,
    ideas: clave.ideas.map((i) => ({ texto: i.texto, ok: encontradas.has(i.id) })),
    cita: { pedida: !!pesoCita, encontrada: citaEncontrada, valida: citaValida },
    avisos,
    revisar: marcas.length > 0,
    palabras: todas.length,
    detalle: { ideas: [...encontradas], errores: errores.map((e) => e.id), marcas, puntos, total },
  };
}

/** Revisión de la clave al cargarla: pesos positivos, formas no vacías e ids únicos (lo usa el verificador). */
export function problemasDeClave(clave: ClaveEscrita): string[] {
  const out: string[] = [];
  const ids = new Set<string>();
  for (const i of clave.ideas) {
    if (ids.has(i.id)) out.push(`${clave.id}: idea repetida ${i.id}`);
    ids.add(i.id);
    if (!(i.peso > 0)) out.push(`${clave.id}: la idea ${i.id} no tiene peso`);
    if (!i.formas.length) out.push(`${clave.id}: la idea ${i.id} no tiene formas`);
  }
  for (const e of clave.errores ?? []) if (e.anula && !ids.has(e.anula)) out.push(`${clave.id}: el error ${e.id} anula una idea que no existe (${e.anula})`);
  for (const c of clave.citas ?? []) if (!citaDeClave(c)) out.push(`${clave.id}: cita no válida ${c}`);
  const modelo = corregirEscrita(clave, clave.modelo);
  if (modelo.nota < 90) out.push(`${clave.id}: la respuesta modelo saca ${modelo.nota} (debe sacar 90 o más)`);
  return out;
}
