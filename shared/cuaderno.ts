/**
 * El cuaderno de apuntes: el de la academia y el de la Biblioteca son el mismo (docs/academia.md, «El cuaderno»).
 *
 * Cada persona tiene su cuaderno, con notas hechas de bloques, como un cuaderno digital moderno: párrafos, títulos,
 * listas, tareas, citas copiadas de las lecciones, versículos que traen su texto de la RV1960, resaltados y avisos. El
 * texto lleva marcas ligeras (**negrita**, _cursiva_, ==resaltado==) y las citas bíblicas que se escriben («Juan 3:16»,
 * también en minúscula desde el teléfono) se vuelven enlaces a la Biblia de la web. Se guarda en la cuenta: se ve igual
 * en todos los equipos. Este módulo es liviano (no carga el catálogo de la academia): lo usan el servidor y la página.
 */
import { parsearCita, type Cita } from "./citas";

export const TIPOS_BLOQUE = ["texto", "titulo", "subtitulo", "lista", "numerada", "tarea", "cita", "versiculo", "resaltado", "aviso", "separador"] as const;
export type TipoBloque = (typeof TIPOS_BLOQUE)[number];
export const COLORES = ["amarillo", "verde", "azul", "rosa", "naranja"] as const;
export type ColorCuaderno = (typeof COLORES)[number];

/** De dónde vino un bloque copiado: una lección de la academia o un pasaje de la Biblia. */
export type FuenteBloque = { tipo: "leccion"; id: string; titulo: string } | { tipo: "biblia"; ref: string };

export type BloqueCuaderno = {
  /** Corto y al azar: identifica el bloque al moverlo o editarlo. */
  id: string;
  t: TipoBloque;
  /** El texto, con marcas ligeras: **negrita**, _cursiva_, ==resaltado==. */
  texto: string;
  /** Tarea hecha. */
  hecho?: boolean;
  /** El versículo («Juan 3:16») de un bloque de versículo. */
  ref?: string;
  fuente?: FuenteBloque;
  color?: ColorCuaderno;
  /** Sangría de las listas y las tareas (0 a 2). */
  nivel?: number;
};

export const LIMITES = {
  notas: 3000,
  bloques: 600,
  textoBloque: 6000,
  titulo: 160,
  etiquetas: 12,
  etiqueta: 32,
  resaltados: 5000,
  textoResaltado: 1200,
  /** El JSON entero de una nota. */
  bytes: 300_000,
  /** Días que una nota queda en la papelera antes de borrarse sola. */
  papelera: 30,
} as const;

/** Lo que se ve de una nota en la lista. */
export type NotaResumen = {
  id: number;
  titulo: string;
  extracto: string;
  materiaId: string | null;
  materiaTitulo: string | null;
  leccionId: string | null;
  leccionTitulo: string | null;
  etiquetas: string[];
  color: ColorCuaderno | null;
  fijada: boolean;
  actualizada: string;
  /** En la papelera desde esta fecha (null si no está). */
  borrada: string | null;
};
export type NotaCompleta = NotaResumen & { bloques: BloqueCuaderno[]; version: number; creada: string };

/** Un resaltado de una lección: el texto marcado, su color y una nota opcional. */
export type ResaltadoLeccion = {
  id: number;
  leccionId: string;
  leccionTitulo: string | null;
  materiaId: string | null;
  materiaTitulo: string | null;
  /** El bloque de la lección donde está: el orden de sus bloques (-1 «Para empezar» y -2 «La idea clave»). */
  bloque: number;
  texto: string;
  color: ColorCuaderno;
  nota: string | null;
  creado: string;
};

export type CuadernoLista = {
  notas: NotaResumen[];
  /** Las materias que tienen notas (para filtrar). */
  materias: { id: string; titulo: string; notas: number }[];
  etiquetas: string[];
  enPapelera: number;
};

/** Un id corto al azar para un bloque. */
export function idBloque(): string {
  return Math.random().toString(36).slice(2, 10);
}

export function bloque(t: TipoBloque, texto = "", extra: Partial<BloqueCuaderno> = {}): BloqueCuaderno {
  return { id: idBloque(), t, texto, ...extra };
}

// ---------------------------------------------------------------- las marcas de formato y las citas

export type Trozo = { t: string; negrita?: boolean; cursiva?: boolean; resaltado?: boolean; cita?: Cita };

const MARCAS = /(\*\*[^*\n]+\*\*|==[^=\n]+==|(?<![\p{L}\p{N}])_[^_\n]+_(?![\p{L}\p{N}]))/gu;

/** Parte el texto en trozos con su formato (las marcas no se anidan: es un cuaderno, no un procesador de texto). */
export function trozosDe(texto: string): Trozo[] {
  const out: Trozo[] = [];
  let ultimo = 0;
  for (const m of texto.matchAll(MARCAS)) {
    if (m.index! > ultimo) out.push(...conCitas(texto.slice(ultimo, m.index)));
    const s = m[0];
    if (s.startsWith("**")) out.push(...conCitas(s.slice(2, -2), { negrita: true }));
    else if (s.startsWith("==")) out.push(...conCitas(s.slice(2, -2), { resaltado: true }));
    else out.push(...conCitas(s.slice(1, -1), { cursiva: true }));
    ultimo = m.index! + s.length;
  }
  if (ultimo < texto.length) out.push(...conCitas(texto.slice(ultimo)));
  return out.filter((z) => z.t);
}

/**
 * Las citas bíblicas que se escriben a mano: «Juan 3:16», «1 Corintios 13:4-7», «salmos 23:1» (en minúscula desde el
 * teléfono). Solo cuentan las que existen (parsearCita revisa el libro y el capítulo).
 */
const CITA = /(?<![\p{L}\p{N}])((?:[123]\s?)?\p{L}+)\s(\d{1,3}):(\d{1,3})(?:\s?[-–]\s?(\d{1,3}))?(?![\p{L}\p{N}:])/gu;

/** Una cita escrita a mano, si es de verdad («Salmo» también vale por «Salmos»). */
export function citaEscrita(s: string): Cita | null {
  const limpia = s.replace(/\s?[-–]\s?/, "-").replace(/^([123])(\p{L})/u, "$1 $2");
  return parsearCita(limpia) ?? parsearCita(limpia.replace(/^salmo\b/i, "Salmos"));
}

function conCitas(texto: string, marca: Omit<Trozo, "t" | "cita"> = {}): Trozo[] {
  const out: Trozo[] = [];
  let ultimo = 0;
  for (const m of texto.matchAll(CITA)) {
    const c = citaEscrita(m[0]);
    if (!c) continue;
    if (m.index! > ultimo) out.push({ t: texto.slice(ultimo, m.index), ...marca });
    out.push({ t: m[0], ...marca, cita: c });
    ultimo = m.index! + m[0].length;
  }
  if (ultimo < texto.length) out.push({ t: texto.slice(ultimo), ...marca });
  return out.length ? out : [{ t: texto, ...marca }];
}

const claveCita = (c: Cita) => `${c.libro}|${c.capitulo}|${c.desde}|${c.hasta}`;

/** Las citas bíblicas de una nota (para enlazarla desde la Biblia: «tus apuntes sobre este capítulo»). */
export function citasDeNota(bloques: BloqueCuaderno[]): Cita[] {
  const vistas = new Map<string, Cita>();
  for (const b of bloques) {
    if (b.t === "versiculo" && b.ref) {
      const c = citaEscrita(b.ref);
      if (c) vistas.set(claveCita(c), c);
    }
    if (b.fuente?.tipo === "biblia") {
      const c = citaEscrita(b.fuente.ref);
      if (c) vistas.set(claveCita(c), c);
    }
    for (const z of trozosDe(b.texto)) if (z.cita) vistas.set(claveCita(z.cita), z.cita);
  }
  return [...vistas.values()];
}

/** La cita guardada para buscar por capítulo: «Juan|3|16|16». */
export const citaGuardada = claveCita;

/** El texto sin marcas (para buscar, para el extracto y para el PDF). */
export function sinMarcas(texto: string): string {
  return trozosDe(texto)
    .map((z) => z.t)
    .join("");
}

/** El texto plano de una nota, una línea por bloque. */
export function textoPlano(bloques: BloqueCuaderno[]): string {
  return bloques
    .map((b) => (b.t === "versiculo" ? [b.ref ?? "", sinMarcas(b.texto)].filter(Boolean).join(" ") : sinMarcas(b.texto)))
    .filter((t) => t.trim())
    .join("\n");
}

/** Sin tildes y en minúsculas: así se busca («oracion» encuentra «oración»). */
export function paraBuscar(s: string): string {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

// ---------------------------------------------------------------- revisar lo que llega

const TIPOS = new Set<string>(TIPOS_BLOQUE);
const COLOR = new Set<string>(COLORES);

/**
 * Deja solo lo que un bloque puede tener (quita lo demás) o dice por qué no sirve. Lo usa el servidor antes de guardar.
 */
export function bloquesValidos(entrada: unknown): { bloques: BloqueCuaderno[] } | { error: string } {
  if (!Array.isArray(entrada)) return { error: "La nota no tiene el formato esperado." };
  if (entrada.length > LIMITES.bloques) return { error: `Una nota puede tener hasta ${LIMITES.bloques} bloques.` };
  const out: BloqueCuaderno[] = [];
  const ids = new Set<string>();
  for (const x of entrada as any[]) {
    if (!x || typeof x !== "object" || !TIPOS.has(x.t)) return { error: "La nota tiene un bloque que no se reconoce." };
    const texto = typeof x.texto === "string" ? x.texto : "";
    if (texto.length > LIMITES.textoBloque) return { error: `Un bloque puede tener hasta ${LIMITES.textoBloque} letras.` };
    let id = typeof x.id === "string" && /^[a-z0-9]{1,16}$/i.test(x.id) ? x.id : idBloque();
    while (ids.has(id)) id = idBloque();
    ids.add(id);
    const b: BloqueCuaderno = { id, t: x.t, texto };
    if (x.t === "tarea") b.hecho = !!x.hecho;
    if (typeof x.ref === "string" && x.ref.length <= 40) b.ref = x.ref.trim();
    if (typeof x.color === "string" && COLOR.has(x.color)) b.color = x.color;
    if (Number.isInteger(x.nivel) && x.nivel > 0 && x.nivel <= 2) b.nivel = x.nivel;
    const f = x.fuente;
    if (f && typeof f === "object") {
      if (f.tipo === "leccion" && typeof f.id === "string" && f.id.length <= 60 && typeof f.titulo === "string") b.fuente = { tipo: "leccion", id: f.id, titulo: f.titulo.slice(0, 160) };
      else if (f.tipo === "biblia" && typeof f.ref === "string" && f.ref.length <= 40) b.fuente = { tipo: "biblia", ref: f.ref };
    }
    out.push(b);
  }
  return { bloques: out };
}

/** Las etiquetas limpias: cortas, sin repetir y sin el «#» delante. */
export function etiquetasValidas(entrada: unknown): string[] {
  if (!Array.isArray(entrada)) return [];
  const out: string[] = [];
  for (const e of entrada) {
    if (typeof e !== "string") continue;
    const t = e.replace(/^#+/, "").replace(/\s+/g, " ").trim().slice(0, LIMITES.etiqueta);
    if (t && !out.some((o) => paraBuscar(o) === paraBuscar(t))) out.push(t);
    if (out.length >= LIMITES.etiquetas) break;
  }
  return out;
}

// ---------------------------------------------------------------- las plantillas de estudio

export type Plantilla = { id: string; nombre: string; para: string; bloques: () => BloqueCuaderno[] };

export const PLANTILLAS: Plantilla[] = [
  {
    id: "clase",
    nombre: "Notas de clase (método Cornell)",
    para: "Para una lección o una clase: las preguntas clave, tus apuntes y un resumen con tus palabras.",
    bloques: () => [
      bloque("subtitulo", "Preguntas clave"),
      bloque("lista"),
      bloque("subtitulo", "Mis apuntes"),
      bloque("texto"),
      bloque("subtitulo", "Resumen con mis palabras"),
      bloque("texto"),
    ],
  },
  {
    id: "inductivo",
    nombre: "Estudio inductivo",
    para: "Un pasaje en tres pasos: lo que dice, lo que significa y lo que harás.",
    bloques: () => [
      bloque("versiculo", "", { ref: "" }),
      bloque("subtitulo", "Observación: ¿qué dice?"),
      bloque("lista"),
      bloque("subtitulo", "Interpretación: ¿qué significa?"),
      bloque("texto"),
      bloque("subtitulo", "Aplicación: ¿qué haré?"),
      bloque("tarea"),
    ],
  },
  {
    id: "devocional",
    nombre: "Devocional",
    para: "Tu tiempo diario con Dios: la Escritura, lo que observas, cómo la aplicas y tu oración.",
    bloques: () => [
      bloque("subtitulo", "Escritura"),
      bloque("versiculo", "", { ref: "" }),
      bloque("subtitulo", "Observación"),
      bloque("texto"),
      bloque("subtitulo", "Aplicación"),
      bloque("texto"),
      bloque("subtitulo", "Oración"),
      bloque("texto"),
    ],
  },
  {
    id: "predica",
    nombre: "Notas de una prédica",
    para: "Para el culto o una enseñanza: el pasaje, los puntos y lo que Dios te habló.",
    bloques: () => [bloque("versiculo", "", { ref: "" }), bloque("subtitulo", "Los puntos"), bloque("numerada"), bloque("subtitulo", "Lo que Dios me habló"), bloque("aviso", "", { color: "naranja" })],
  },
  {
    id: "oracion",
    nombre: "Lista de oración",
    para: "Tus peticiones y las respuestas de Dios: marca cada una cuando llegue la respuesta.",
    bloques: () => [bloque("subtitulo", "Peticiones"), bloque("tarea"), bloque("subtitulo", "Respuestas y gratitud"), bloque("lista")],
  },
];
