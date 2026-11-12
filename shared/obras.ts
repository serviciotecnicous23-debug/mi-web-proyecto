/**
 * Las obras de la casa (Jerusalén en línea): con el gozo que se gana sirviendo, cada uno edifica su casa.
 * - Cada obra se paga con gozo y con flor de harina para el pan de los obreros; tarda unas horas y se hace una a
 *   la vez. Con más obreros (Mateo 20:1) cuesta la mitad más y termina en la mitad del tiempo.
 * - Se ve en la ciudad (la ven los vecinos) y casi todas sirven para algo: más huerto, riego, horno o alfolí.
 * - Algunas piden una casa más grande (la honra de servir) o estudios aprobados: lo más fino se gana estudiando.
 * - Las estrellas de la casa (de 1 a 5) suman la casa, sus obras, sus muebles (y los juegos completos), sus
 *   adornos y su letrero. Las ven los vecinos.
 * El gozo nunca compra mérito ni cargos: solo la casa, su belleza y su comodidad. Precios fijos y nada al azar.
 */
import { HORNO_GRANDE, HORNO_MAX } from "./mercado";
import { leerInterior, muebleBase } from "./casa-interior";

export type Verso = { text: string; ref: string };
export type ObraId =
  | "cerco" | "lamparas" | "ensanchar" | "cisterna" | "horno" | "puerta"
  | "palabras" | "emparrado" | "granero" | "portico" | "fuente" | "torre";
export type GrupoObra = "patio" | "casa" | "fina";

export type Obra = {
  id: ObraId;
  nombre: string;
  icono: string;
  grupo: GrupoObra;
  /** Lo que cuesta: gozo, y flor de harina (y a veces aceite) del alfolí para los obreros. */
  gozo: number;
  harina: number;
  aceite?: number;
  /** Horas de obra (con más obreros, la mitad). */
  horas: number;
  /** Nivel de la casa que pide (0 tienda, 1 adobe, 2 piedra con patio, 3 aposento alto). */
  nivelMin: number;
  /** Estudios aprobados que pide (de la escuela). */
  estudios?: number;
  /** Lo que suma a las estrellas de la casa. */
  puntos: number;
  /** Lo que da, además de verse. */
  ventaja?: string;
  detalle: string;
  verso: Verso;
};

export const OBRAS: Obra[] = [
  // ------------------------------------------------ el patio: delante de la casa
  {
    id: "cerco", nombre: "Cerco de piedra", icono: "🧱", grupo: "patio", gozo: 60, harina: 3, horas: 2, nivelMin: 0, puntos: 6,
    detalle: "Un cerco bajo de piedras alrededor de tu parcela, con su portón de madera hacia la calle.",
    verso: { text: "¿No le has cercado alrededor a él y a su casa y a todo lo que tiene? Al trabajo de sus manos has dado bendición; por tanto, sus bienes han aumentado sobre la tierra.", ref: "Job 1:10" },
  },
  {
    id: "ensanchar", nombre: "Ensanchar el huerto", icono: "🌱", grupo: "patio", gozo: 180, harina: 5, horas: 6, nivelMin: 0, puntos: 8,
    ventaja: "Una parcela más en tu huerto.",
    detalle: "Surcos nuevos junto al cerco, con sus estacas y sus cuerdas.",
    verso: { text: "Ensancha el sitio de tu tienda, y las cortinas de tus habitaciones sean extendidas; no seas escasa; alarga tus cuerdas, y refuerza tus estacas.", ref: "Isaías 54:2" },
  },
  {
    id: "cisterna", nombre: "Cisterna", icono: "💧", grupo: "patio", gozo: 240, harina: 6, horas: 8, nivelMin: 0, puntos: 10,
    ventaja: "Lo que siembras queda regado, como si lloviera.",
    detalle: "Un pozo de piedra que guarda el agua de la lluvia, con su tapa y su cubo.",
    verso: { text: "Bebe el agua de tu misma cisterna, Y los raudales de tu propio pozo.", ref: "Proverbios 5:15" },
  },
  {
    id: "horno", nombre: "Horno de barro", icono: "🫓", grupo: "patio", gozo: 280, harina: 8, horas: 8, nivelMin: 0, puntos: 10,
    ventaja: "Caben 5 en el horno, en vez de 3.",
    detalle: "Un horno redondo de barro en el patio, para cocer más tortas a la vez.",
    verso: { text: "Cuando ofrecieres ofrenda cocida en horno, será de tortas de flor de harina sin levadura amasadas con aceite, y hojaldres sin levadura untadas con aceite.", ref: "Levítico 2:4" },
  },
  {
    id: "emparrado", nombre: "Emparrado del patio", icono: "🍇", grupo: "patio", gozo: 220, harina: 6, horas: 6, nivelMin: 1, puntos: 10,
    detalle: "Una vid sobre varas que da sombra a todo el patio, con sus racimos.",
    verso: { text: "Tu mujer será como vid que lleva fruto a los lados de tu casa; Tus hijos como plantas de olivo alrededor de tu mesa.", ref: "Salmos 128:3" },
  },
  // ------------------------------------------------ la casa: la puerta, las paredes y el terrado
  {
    id: "lamparas", nombre: "Lámparas en la puerta", icono: "🪔", grupo: "casa", gozo: 90, harina: 0, aceite: 3, horas: 3, nivelMin: 0, puntos: 6,
    ventaja: "De noche alumbran tu puerta: se ven desde lejos.",
    detalle: "Dos lámparas de barro a los lados de la puerta.",
    verso: { text: "Ve que van bien sus negocios; Su lámpara no se apaga de noche.", ref: "Proverbios 31:18" },
  },
  {
    id: "puerta", nombre: "Puerta de cedro labrada", icono: "🚪", grupo: "casa", gozo: 150, harina: 4, horas: 4, nivelMin: 1, puntos: 8,
    detalle: "Una puerta de cedro con su marco labrado y su aldaba de bronce.",
    verso: { text: "He aquí, yo estoy a la puerta y llamo; si alguno oye mi voz y abre la puerta, entraré a él, y cenaré con él, y él conmigo.", ref: "Apocalipsis 3:20" },
  },
  {
    id: "palabras", nombre: "Las palabras en los postes", icono: "📜", grupo: "casa", gozo: 120, harina: 2, horas: 3, nivelMin: 1, estudios: 1, puntos: 10,
    detalle: "Los mandamientos escritos en los postes de la puerta. Pide un estudio aprobado en la escuela.",
    verso: { text: "y las escribirás en los postes de tu casa, y en tus puertas.", ref: "Deuteronomio 6:9" },
  },
  {
    id: "granero", nombre: "Granero en el terrado", icono: "🌾", grupo: "casa", gozo: 360, harina: 10, horas: 10, nivelMin: 1, puntos: 12,
    ventaja: "Tu alfolí guarda 30 más de cada cosa.",
    detalle: "Tinajas grandes y sacos de grano sobre el terrado.",
    verso: { text: "Y serán llenos tus graneros con abundancia, Y tus lagares rebosarán de mosto.", ref: "Proverbios 3:10" },
  },
  // ------------------------------------------------ las obras finas: para las casas grandes, con estudios
  {
    id: "portico", nombre: "Pórtico con columnas", icono: "🏛️", grupo: "fina", gozo: 600, harina: 15, aceite: 3, horas: 12, nivelMin: 2, estudios: 2, puntos: 20,
    detalle: "Dos columnas de piedra con su dintel delante de la puerta. Pide dos estudios aprobados.",
    verso: { text: "También hizo un pórtico de columnas, que tenía cincuenta codos de largo y treinta codos de ancho; y este pórtico estaba delante de las primeras, con sus columnas y maderos correspondientes.", ref: "1 Reyes 7:6" },
  },
  {
    id: "fuente", nombre: "Fuente del patio", icono: "⛲", grupo: "fina", gozo: 800, harina: 20, horas: 16, nivelMin: 2, estudios: 3, puntos: 24,
    detalle: "Una fuente de piedra en medio del patio, con su agua que corre. Pide tres estudios aprobados.",
    verso: { text: "Fuente de huertos, Pozo de aguas vivas, Que corren del Líbano.", ref: "Cantares 4:15" },
  },
  {
    id: "torre", nombre: "Torre del terrado", icono: "🗼", grupo: "fina", gozo: 1200, harina: 25, aceite: 5, horas: 24, nivelMin: 3, estudios: 4, puntos: 30,
    detalle: "Una torre de piedra sobre la casa: desde lejos se sabe que es tu casa. Pide cuatro estudios aprobados.",
    verso: { text: "Porque ¿quién de vosotros, queriendo edificar una torre, no se sienta primero y calcula los gastos, a ver si tiene lo que necesita para acabarla?", ref: "Lucas 14:28" },
  },
];

export const GRUPOS_OBRA: Record<GrupoObra, { nombre: string; icono: string; texto: string }> = {
  patio: { nombre: "El patio", icono: "🌿", texto: "Lo de delante de tu casa: lo ve quien pasa por la calle." },
  casa: { nombre: "La casa", icono: "🏠", texto: "La puerta, los postes y el terrado." },
  fina: { nombre: "Las obras finas", icono: "🏛️", texto: "Para las casas grandes: piden estudios aprobados en la escuela." },
};

export const VERSO_OBRAS: Verso = {
  text: "Si Jehová no edificare la casa, En vano trabajan los que la edifican; Si Jehová no guardare la ciudad, En vano vela la guardia.",
  ref: "Salmos 127:1",
};
/** Las obras piden flor de harina: primero el huerto, después la casa. */
export const VERSO_HARINA: Verso = { text: "Prepara tus labores fuera, Y disponlas en tus campos, Y después edificarás tu casa.", ref: "Proverbios 24:27" };
/** Con más obreros: cuesta la mitad más y termina en la mitad del tiempo. */
export const MAS_OBREROS = {
  costo: 1.5,
  tiempo: 0.5,
  verso: { text: "Porque el reino de los cielos es semejante a un hombre, padre de familia, que salió por la mañana a contratar obreros para su viña.", ref: "Mateo 20:1" },
};
export { HORNO_GRANDE };
/** Lo que guarda de más el granero (de cada cosa). */
export const GRANERO_EXTRA = 30;

export function obra(id: string): Obra | undefined {
  return OBRAS.find((o) => o.id === id);
}
const esObra = (x: unknown): x is ObraId => typeof x === "string" && OBRAS.some((o) => o.id === x);

/** Lo que cuesta una obra (con más obreros, la mitad más de gozo y la mitad del tiempo; la harina no cambia). */
export function costoDeObra(o: Obra, rapido = false): { gozo: number; harina: number; aceite: number; horas: number } {
  return {
    gozo: rapido ? Math.round(o.gozo * MAS_OBREROS.costo) : o.gozo,
    harina: o.harina,
    aceite: o.aceite ?? 0,
    horas: rapido ? o.horas * MAS_OBREROS.tiempo : o.horas,
  };
}

// ---------------------------------------------------------------- lo guardado en la casa (columna `obras`)
export type ObraEnCurso = { id: ObraId; desde: string; lista: string; rapido?: boolean };
export type ObrasGuardadas = { hechas: ObraId[]; curso: ObraEnCurso | null };

export function leerObras(v: unknown): ObrasGuardadas {
  const o = v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : {};
  const hechas = Array.isArray(o.hechas) ? [...new Set(o.hechas.filter(esObra))] : [];
  const c = o.curso && typeof o.curso === "object" && !Array.isArray(o.curso) ? (o.curso as Record<string, unknown>) : null;
  const curso =
    c && esObra(c.id) && typeof c.desde === "string" && typeof c.lista === "string" && !hechas.includes(c.id)
      ? { id: c.id, desde: c.desde, lista: c.lista, ...(c.rapido === true ? { rapido: true } : {}) }
      : null;
  return { hechas, curso };
}

/** Las obras ya terminadas (la que estaba en obra cuenta en cuanto llega su hora). */
export function obrasHechas(g: ObrasGuardadas, ahora = Date.now()): ObraId[] {
  return g.curso && new Date(g.curso.lista).getTime() <= ahora ? [...g.hechas, g.curso.id] : g.hechas;
}

/** Pasa a «hechas» la obra que ya terminó (para guardar). Devuelve null si no cambió nada. */
export function asentarObras(g: ObrasGuardadas, ahora = Date.now()): ObrasGuardadas | null {
  if (!g.curso || new Date(g.curso.lista).getTime() > ahora) return null;
  return { hechas: [...g.hechas, g.curso.id], curso: null };
}

export type VentajasObras = { parcelas: number; alfoli: number; horno: number; cisterna: boolean };
/** Lo que dan las obras terminadas. */
export function ventajasDeObras(hechas: readonly string[]): VentajasObras {
  const s = new Set(hechas);
  return {
    parcelas: s.has("ensanchar") ? 1 : 0,
    alfoli: s.has("granero") ? GRANERO_EXTRA : 0,
    horno: s.has("horno") ? HORNO_GRANDE : HORNO_MAX,
    cisterna: s.has("cisterna"),
  };
}
/** Lo que dan las obras de una casa, desde su columna `obras` (para el mercado, el huerto, el horno y el alfolí). */
export function ventajasDeColumna(v: unknown, ahora = Date.now()): VentajasObras {
  return ventajasDeObras(obrasHechas(leerObras(v), ahora));
}

/** Por qué no se puede empezar una obra ahora (o null si se puede). No mira el gozo ni el alfolí. */
export function porQueNoSePuede(o: Obra, c: { nivel: number; estudios: number; hechas: readonly string[]; curso: ObraEnCurso | null }): string | null {
  if (c.hechas.includes(o.id)) return "Ya la edificaste.";
  if (c.curso?.id === o.id) return "Ya está en obra.";
  if (c.curso) return "Los obreros están en otra obra: espera a que la terminen.";
  if (o.nivelMin > c.nivel) return `Pide ${["", "una casa de adobe", "una casa de piedra con patio", "una casa con aposento alto"][o.nivelMin]} o mayor: sirve y tu casa crecerá.`;
  if ((o.estudios ?? 0) > c.estudios) {
    const n = o.estudios ?? 0;
    return `Pide ${n === 1 ? "un estudio aprobado" : `${n} estudios aprobados`} en la escuela (tienes ${c.estudios}).`;
  }
  return null;
}

// ---------------------------------------------------------------- las estrellas de la casa
/** Los juegos de muebles: puestos todos dentro de la casa, valen más. */
export const JUEGOS_DE_MUEBLES: { id: string; nombre: string; icono: string; muebles: string[] }[] = [
  { id: "mesa", nombre: "La mesa de la familia", icono: "🍽️", muebles: ["mesa", "silla", "cojines", "estera", "cesta"] },
  { id: "aposento", nombre: "El aposento del profeta", icono: "🕯️", muebles: ["lecho", "mesa", "silla", "candelero"] },
  { id: "cocina", nombre: "La cocina de la casa", icono: "🫓", muebles: ["molino", "vasijas", "tinaja", "mesa-pan"] },
  { id: "escrituras", nombre: "El rincón de las Escrituras", icono: "📜", muebles: ["estante", "lampara-casa", "banco-cedro", "alfombra"] },
  { id: "manos", nombre: "El trabajo de las manos", icono: "🧶", muebles: ["telar-casa", "arcon", "brasero", "planta"] },
];

export const PUNTOS_CASA = { nivel: [0, 10, 20, 30], adorno: 3, letrero: 5, mueble: 2, juego: 10, /** cada pieza fina distinta puesta (shared/taller.ts) */ fina: 6 };
/** Puntos para cada estrella (la primera la tiene toda casa). */
export const ESTRELLAS_PUNTOS = [0, 40, 90, 160, 240];

export type EstrellasCasa = {
  puntos: number;
  estrellas: number;
  /** Puntos que faltan para la siguiente estrella (null con 5). */
  faltan: number | null;
  partes: { texto: string; puntos: number }[];
  juegos: { id: string; nombre: string; icono: string; completo: boolean; faltan: string[] }[];
};

export function estrellasDePuntos(puntos: number): number {
  let e = 1;
  for (let i = 0; i < ESTRELLAS_PUNTOS.length; i++) if (puntos >= ESTRELLAS_PUNTOS[i]) e = i + 1;
  return e;
}

/** Las estrellas de una casa: su nivel, sus obras, sus muebles puestos (y los juegos completos), sus adornos y su letrero. */
export function estrellasDeCasa(c: { nivel: number; obras: readonly string[]; adornos: readonly string[]; letrero: boolean; muebles: readonly string[]; barrio?: number }): EstrellasCasa {
  const partes: EstrellasCasa["partes"] = [];
  const nivel = PUNTOS_CASA.nivel[Math.max(0, Math.min(3, Math.floor(c.nivel)))] ?? 0;
  if (nivel) partes.push({ texto: "La casa", puntos: nivel });
  const obras = OBRAS.filter((o) => c.obras.includes(o.id)).reduce((a, o) => a + o.puntos, 0);
  if (obras) partes.push({ texto: "Las obras", puntos: obras });
  // la pieza fina cuenta como el mueble de donde sale (en los distintos y en los juegos) y suma aparte
  const distintos = new Set(c.muebles.map(muebleBase));
  const muebles = distintos.size * PUNTOS_CASA.mueble;
  if (muebles) partes.push({ texto: "Los muebles (distintos)", puntos: muebles });
  const finas = new Set(c.muebles.filter((m) => muebleBase(m) !== m)).size * PUNTOS_CASA.fina;
  if (finas) partes.push({ texto: "Las piezas finas del artesano", puntos: finas });
  const juegos = JUEGOS_DE_MUEBLES.map((j) => {
    const faltan = j.muebles.filter((m) => !distintos.has(m));
    return { id: j.id, nombre: j.nombre, icono: j.icono, completo: faltan.length === 0, faltan };
  });
  const completos = juegos.filter((j) => j.completo).length * PUNTOS_CASA.juego;
  if (completos) partes.push({ texto: "Los juegos de muebles completos", puntos: completos });
  const adornos = new Set(c.adornos).size * PUNTOS_CASA.adorno;
  if (adornos) partes.push({ texto: "Los adornos", puntos: adornos });
  if (c.letrero) partes.push({ texto: "El letrero", puntos: PUNTOS_CASA.letrero });
  // lo que suman las obras del barrio a todas sus casas (shared/barrio-obras.ts)
  if (c.barrio) partes.push({ texto: "Las obras del barrio", puntos: c.barrio });
  const puntos = partes.reduce((a, p) => a + p.puntos, 0);
  const estrellas = estrellasDePuntos(puntos);
  return { puntos, estrellas, faltan: estrellas >= 5 ? null : ESTRELLAS_PUNTOS[estrellas] - puntos, partes, juegos };
}

/** Las estrellas de una fila de `game_houses` (con level, obras, adornos, letrero e interior). */
export function estrellasDeFila(r: Record<string, unknown>, ahora = Date.now(), barrio = 0): EstrellasCasa {
  return estrellasDeCasa({
    barrio,
    nivel: Number(r.level || 0),
    obras: obrasHechas(leerObras(r.obras), ahora),
    adornos: Array.isArray(r.adornos) ? (r.adornos as unknown[]).filter((x): x is string => typeof x === "string") : [],
    letrero: typeof r.letrero === "string" && r.letrero.length > 0,
    muebles: leerInterior(r.interior).map((c) => c.m),
  });
}

// ---------------------------------------------------------------- respuestas de la API
/** El termómetro del gozo (administración): lo que entró y salió cada día, por fuente, y lo guardado. */
export type TermometroGozo = {
  dias: { dia: string; entra: number; sale: number; fuentes: { fuente: string; entra: number; sale: number; veces: number }[] }[];
  guardado: { personas: number; total: number; mediana: number; maximo: number; conMil: number };
  tesoro: number;
};

export type EstadoObra = "hecha" | "en-obra" | "se-puede" | "bloqueada";
export type ObraVista = { id: ObraId; estado: EstadoObra; motivo: string | null };
export type ObrasEstado = {
  obras: ObraVista[];
  hechas: ObraId[];
  /** La obra que se está haciendo (`faltan` y `total` en segundos). */
  curso: { id: ObraId; faltan: number; total: number; rapido: boolean } | null;
  /** La obra que terminó desde la última vez (para avisar). */
  terminada: ObraId | null;
  gozo: number;
  harina: number;
  aceite: number;
  nivel: number;
  estudios: number;
  estrellas: EstrellasCasa;
  ventajas: VentajasObras;
};
