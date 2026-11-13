/**
 * El huerto de la casa (Jerusalén en línea): un lugar propio detrás de la casa, al que se entra por una puerta de la
 * casa por dentro. Tiene sus surcos (según la casa y la obra «ensanchar el huerto»), el agua (la cisterna de la casa o
 * el pozo), los olivos y el granero. Cada tarea se hace con su gesto y nada se hace solo:
 *
 * 1. Arar el surco con la azada (después de cada siega hay que volver a ararlo).
 * 2. Sembrar a lo largo del surco (trigo, cebada u olivo).
 * 3. Llenar el cántaro en el pozo y regar: el agua se cuenta (el cántaro lleva para 3 surcos; el grande, para 6).
 * 4. Arrancar las malas hierbas, que salen con las horas (Proverbios 24:30-31).
 * 5. Espantar las aves, que llegan por la semilla recién sembrada (Mateo 13:4) y por el grano maduro.
 * 6. Abonar con lo del redil (Lucas 13:8): las ovejas de la casa dan abono con las horas.
 * 7. Segar con la hoz y llevar las gavillas al granero (Salmos 126:6): recién ahí llegan al alfolí.
 *
 * La cosecha rinde más si el surco se cuidó: una estrella por el riego, otra por estar limpio de hierbas al segar y
 * otra por el abono, y lo que se comieron las aves se pierde. Las herramientas se mejoran con gozo y hay 3 tareas del
 * huerto por día, con gozo. Todo lo calcula el servidor con las horas, sin nada que corra de fondo: aquí están las
 * reglas (las usan la pantalla y el servidor) y server/huerto.ts las aplica.
 */
import { SEMILLAS, parcelasHuerto } from "./mercado";
import { ventajasDeColumna } from "./obras";
import { RIEGO } from "./economia";
import { diaEnJerusalen, factorCrecimiento, type DiaJerusalen } from "./anio";

export type Verso = { text: string; ref: string };
export type SemillaId = "trigo" | "cebada" | "olivo";
export const SEMILLAS_IDS: SemillaId[] = ["trigo", "cebada", "olivo"];
const esSemilla = (v: unknown): v is SemillaId => v === "trigo" || v === "cebada" || v === "olivo";

export const VERSOS_HUERTO = {
  labrar: { text: "Tomó, pues, Jehová Dios al hombre, y lo puso en el huerto de Edén, para que lo labrara y lo guardase.", ref: "Génesis 2:15" },
  arar: { text: "Y Jesús le dijo: Ninguno que poniendo su mano en el arado mira hacia atrás, es apto para el reino de Dios.", ref: "Lucas 9:62" },
  sembrar: { text: "Por la mañana siembra tu semilla, y a la tarde no dejes reposar tu mano; porque no sabes cuál es lo mejor, si esto o aquello, o si lo uno y lo otro es igualmente bueno.", ref: "Eclesiastés 11:6" },
  regar: { text: "Yo planté, Apolos regó; pero el crecimiento lo ha dado Dios.", ref: "1 Corintios 3:6" },
  crecer: { text: "Porque de suyo lleva fruto la tierra, primero hierba, luego espiga, después grano lleno en la espiga;", ref: "Marcos 4:28" },
  hierbas: {
    text: "Pasé junto al campo del hombre perezoso, Y junto a la viña del hombre falto de entendimiento; Y he aquí que por toda ella habían crecido los espinos, Ortigas habían ya cubierto su faz, Y su cerca de piedra estaba ya destruida.",
    ref: "Proverbios 24:30-31",
  },
  aves: { text: "Y mientras sembraba, parte de la semilla cayó junto al camino; y vinieron las aves y la comieron.", ref: "Mateo 13:4" },
  abono: { text: "El entonces, respondiendo, le dijo: Señor, déjala todavía este año, hasta que yo cave alrededor de ella, y la abone.", ref: "Lucas 13:8" },
  segar: { text: "No nos cansemos, pues, de hacer bien; porque a su tiempo segaremos, si no desmayamos.", ref: "Gálatas 6:9" },
  gavillas: { text: "Irá andando y llorando el que lleva la preciosa semilla; Mas volverá a venir con regocijo, trayendo sus gavillas.", ref: "Salmos 126:6" },
  granero: {
    text: "Dejad crecer juntamente lo uno y lo otro hasta la siega; y al tiempo de la siega yo diré a los segadores: Recoged primero la cizaña, y atadla en manojos para quemarla; pero recoged el trigo en mi granero.",
    ref: "Mateo 13:30",
  },
  rincon: {
    text: "Cuando segareis la mies de vuestra tierra, no segaréis hasta el último rincón de ella, ni espigarás tu siega; para el pobre y para el extranjero la dejarás. Yo Jehová vuestro Dios.",
    ref: "Levítico 23:22",
  },
  herramientas: { text: "Por lo cual todos los de Israel tenían que descender a los filisteos para afilar cada uno la reja de su arado, su azadón, su hacha o su hoz.", ref: "1 Samuel 13:20" },
  lluvia: {
    text: "Porque como desciende de los cielos la lluvia y la nieve, y no vuelve allá, sino que riega la tierra, y la hace germinar y producir, y da semilla al que siembra, y pan al que come,",
    ref: "Isaías 55:10",
  },
  estacion: { text: "Será como árbol plantado junto a corrientes de aguas, Que da su fruto en su tiempo, Y su hoja no cae; Y todo lo que hace, prosperará.", ref: "Salmos 1:3" },
} satisfies Record<string, Verso>;

// ---------------------------------------------------------------- las etapas de la planta
/** Las etapas que se ven en 3D (Marcos 4:28: «primero hierba, luego espiga, después grano lleno en la espiga»). */
export type Etapa = 0 | 1 | 2 | 3 | 4;
export const ETAPAS: Record<SemillaId, [string, string, string, string, string]> = {
  trigo: ["Recién sembrado", "Brota la hierba", "Crece la caña", "Sale la espiga", "Grano lleno: ¡a segar!"],
  cebada: ["Recién sembrada", "Brota la hierba", "Crece la caña", "Sale la espiga", "Grano lleno: ¡a segar!"],
  olivo: ["Recién plantado", "Echa sus hojas", "Crece", "Florece", "Olivas maduras: ¡a cosechar!"],
};

/** La etapa según lo que lleva de crecimiento (de 0 a 1). */
export function etapaDe(frac: number): Etapa {
  if (frac >= 1) return 4;
  if (frac >= 0.66) return 3;
  if (frac >= 0.33) return 2;
  if (frac >= 0.06) return 1;
  return 0;
}

// ---------------------------------------------------------------- el surco guardado
/** Un surco tal como se guarda (columna `game_houses.huerto`, uno por surco; antes se llamaba «parcela»). */
export type Surco = {
  semilla: SemillaId | null;
  plantado: string | null;
  regado: boolean;
  /** cuánto dura el crecimiento regado (con la tinaja de la casa rinde más) */
  riego?: number;
  /** la regó la cisterna al sembrar */
  cisterna?: boolean;
  /** cuánto dura su crecimiento (el pozo del barrio: 0,9); se guarda al sembrar */
  ritmo?: number;
  /** arado con la azada (se pierde al segar) */
  arado?: string;
  /** abonado con lo del redil */
  abono?: true;
  /** la última vez que se arrancaron las malas hierbas */
  limpio?: string;
  /** las aves espantadas: «s» las de la siembra, «m» las del grano maduro */
  aves?: ("s" | "m")[];
};

const objeto = (v: unknown): Record<string, unknown> => (v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : {});
const fecha = (v: unknown): string | undefined => (typeof v === "string" && Number.isFinite(new Date(v).getTime()) ? v : undefined);

/** Lee los surcos guardados (los que faltan quedan vacíos y sin arar). */
export function leerHuerto(v: unknown, n: number): Surco[] {
  const a = Array.isArray(v) ? v : [];
  return Array.from({ length: n }, (_, i) => {
    const p = objeto(a[i]);
    const s = esSemilla(p.semilla) ? p.semilla : null;
    const plantado = s ? fecha(p.plantado) ?? null : null;
    const semilla = plantado ? s : null;
    const riego = typeof p.riego === "number" && p.riego >= 0.5 && p.riego <= 1 ? p.riego : undefined;
    const ritmo = typeof p.ritmo === "number" && p.ritmo >= 0.5 && p.ritmo < 1 ? p.ritmo : undefined;
    const aves = Array.isArray(p.aves) ? [...new Set(p.aves.filter((x): x is "s" | "m" => x === "s" || x === "m"))] : [];
    const arado = fecha(p.arado);
    const limpio = fecha(p.limpio);
    return {
      semilla,
      plantado: semilla ? plantado : null,
      regado: semilla ? p.regado === true : false,
      ...(semilla && riego ? { riego } : {}),
      ...(semilla && p.cisterna === true ? { cisterna: true } : {}),
      ...(semilla && ritmo ? { ritmo } : {}),
      // lo que estaba sembrado antes de que hubiera azada cuenta como arado
      ...(arado || semilla ? { arado: arado ?? plantado ?? undefined } : {}),
      ...(semilla && p.abono === true ? { abono: true as const } : {}),
      ...(semilla && limpio ? { limpio } : {}),
      ...(semilla && aves.length ? { aves } : {}),
    } as Surco;
  });
}

/** Un surco vacío y sin arar (después de segar). */
export const SURCO_VACIO: Surco = { semilla: null, plantado: null, regado: false };

/** El día en que se sembró (su estación y si llovió). */
function diaDeSiembra(p: Surco): DiaJerusalen | null {
  return p.semilla && p.plantado ? diaEnJerusalen(new Date(p.plantado).getTime()) : null;
}

/** ¿Llovió el día en que se sembró? Entonces el surco quedó regado (shared/anio.ts). */
export function llovio(p: Surco): boolean {
  return !!diaDeSiembra(p)?.llueve;
}

/** Cuántos segundos dura el crecimiento de lo sembrado: regado crece 25 % más rápido (35 % con la tinaja). */
export function duracion(p: Surco): number {
  const d = diaDeSiembra(p);
  if (!p.semilla || !d) return 0;
  const regado = p.regado || d.llueve;
  return SEMILLAS[p.semilla].minutos * 60 * (regado ? (p.riego ?? RIEGO.normal) : 1) * factorCrecimiento(p.semilla, d) * (p.ritmo ?? 1);
}

/** ¿Cuánto le falta (en segundos) a un surco? */
export function faltan(p: Surco, ahora = Date.now()): number {
  if (!p.semilla || !p.plantado) return 0;
  return Math.max(0, Math.ceil((new Date(p.plantado).getTime() + duracion(p) * 1000 - ahora) / 1000));
}

// ---------------------------------------------------------------- las aves y las malas hierbas (con las horas)
/**
 * Las aves: las de la siembra llegan a los 25 s de sembrar y, si nadie las espanta, a los 10 min ya se comieron parte
 * de la semilla. Las del grano maduro llegan 90 s después de que queda listo y se quedan hasta que alguien las espante;
 * si se siega con ellas encima, se comen parte.
 */
export const AVES = { siembra: { llegan: 25, comen: 600 }, maduro: { llegan: 90 } };

export type AvesDelSurco = {
  /** hay aves ahora en el surco */
  ahora: boolean;
  /** cuál visita es («s» de la siembra o «m» del grano maduro) */
  cual: "s" | "m" | null;
  /** en cuántos segundos llegan (null si ya no vienen) */
  llegan: number | null;
  /** lo que ya se comieron (las de la siembra que nadie espantó) */
  comidas: number;
  /** cuántos segundos se quedan las que están (las de la siembra se van al comer; null: hasta que alguien las espante) */
  quedan: number | null;
};

export function avesDe(p: Surco, ahora = Date.now()): AvesDelSurco {
  if (!p.semilla || !p.plantado) return { ahora: false, cual: null, llegan: null, comidas: 0, quedan: null };
  const t0 = new Date(p.plantado).getTime();
  const espantadas = new Set(p.aves ?? []);
  const seg = (ahora - t0) / 1000;
  let comidas = 0;
  // las de la siembra
  if (!espantadas.has("s")) {
    if (seg < AVES.siembra.llegan) return { ahora: false, cual: null, llegan: Math.ceil(AVES.siembra.llegan - seg), comidas: 0, quedan: null };
    if (seg < AVES.siembra.comen) return { ahora: true, cual: "s", llegan: null, comidas: 0, quedan: Math.ceil(AVES.siembra.comen - seg) };
    comidas = 1;
  }
  // las del grano maduro
  const listo = t0 + duracion(p) * 1000;
  if (espantadas.has("m")) return { ahora: false, cual: null, llegan: null, comidas, quedan: null };
  const desdeListo = (ahora - listo) / 1000;
  if (desdeListo < AVES.maduro.llegan) return { ahora: false, cual: null, llegan: Math.ceil(AVES.maduro.llegan - desdeListo), comidas, quedan: null };
  return { ahora: true, cual: "m", llegan: null, comidas, quedan: null };
}

/** Las malas hierbas: sale una cada 12 min (en las estaciones de lluvia, antes; con la azada de hierro, el doble). */
export const HIERBAS = { minutos: 12, max: 3 };

/** Cada cuántos segundos sale una mala hierba en ese surco. */
export function cadaHierba(p: Surco, azada: number): number {
  const d = diaDeSiembra(p);
  return HIERBAS.minutos * 60 * (azada >= 2 ? 2 : 1) * (d && d.estacion.lluvia >= 0.3 ? 0.8 : 1);
}

/** Las malas hierbas que hay ahora y en cuántos segundos sale la siguiente (null si ya no salen más). */
export function hierbasDe(p: Surco, azada: number, ahora = Date.now()): { n: number; proxima: number | null } {
  if (!p.semilla || !p.plantado) return { n: 0, proxima: null };
  const desde = Math.max(new Date(p.plantado).getTime(), p.limpio ? new Date(p.limpio).getTime() : 0);
  const cada = cadaHierba(p, azada);
  const pasado = Math.max(0, (ahora - desde) / 1000);
  const n = Math.min(HIERBAS.max, Math.floor(pasado / cada));
  return { n, proxima: n >= HIERBAS.max ? null : Math.max(1, Math.ceil(cada - (pasado % cada))) };
}

// ---------------------------------------------------------------- la cosecha
export type Calidad = { estrellas: number; regado: boolean; limpio: boolean; abono: boolean };

/** Las estrellas que lleva un surco ahora: el riego (o la lluvia, o la cisterna), sin malas hierbas y el abono. */
export function calidadDe(p: Surco, azada: number, ahora = Date.now()): Calidad {
  const regado = !!p.semilla && (p.regado || llovio(p));
  const limpio = !!p.semilla && hierbasDe(p, azada, ahora).n === 0;
  const abono = !!p.semilla && !!p.abono;
  return { estrellas: Number(regado) + Number(limpio) + Number(abono), regado, limpio, abono };
}

export const NOMBRE_CALIDAD = ["Cosecha flaca", "Buena cosecha", "Muy buena cosecha", "¡Cosecha excelente!"];

/** Cuánto se lleva al segar: lo de la semilla, una más por estrella, lo de los muebles útiles y la hoz, menos lo que se comieron las aves (nunca menos de 1). */
export function rindeDe(p: Surco, c: { azada: number; hoz: number; molino: boolean; vasijas: boolean }, ahora = Date.now()): { cuanto: number; calidad: Calidad; comidas: number; hoz: number } {
  if (!p.semilla) return { cuanto: 0, calidad: { estrellas: 0, regado: false, limpio: false, abono: false }, comidas: 0, hoz: 0 };
  const s = SEMILLAS[p.semilla];
  const calidad = calidadDe(p, c.azada, ahora);
  const aves = avesDe(p, ahora);
  const comidas = aves.comidas + (aves.ahora && aves.cual === "m" ? 1 : 0);
  const extra = (s.da === "harina" && c.molino) || (s.da === "aceite" && c.vasijas) ? 1 : 0;
  const hoz = c.hoz >= 2 && calidad.estrellas >= 3 ? 1 : 0;
  return { cuanto: Math.max(1, s.cuanto + calidad.estrellas + extra + hoz - comidas), calidad, comidas, hoz };
}

/** Dejar el rincón del surco para el pobre y el extranjero (Levítico 23:22): uno menos para ti y gozo, hasta 3 por día. */
export const RINCON = { gozo: 3, dia: 3 };

// ---------------------------------------------------------------- el agua, el abono y las herramientas
/** Riegos que lleva el cántaro (el de barro y el grande). */
export const CANTARO = [0, 3, 6];
/** Cántaros por día del pozo (con el pozo del barrio, más). Con la cisterna de la casa o en un día de lluvia, sin tope. */
export const POZO = { dia: 6, conPozoDelBarrio: 10 };
export type FuenteAgua = "cisterna" | "pozo-barrio" | "pozo";
export const NOMBRE_FUENTE: Record<FuenteAgua, string> = { cisterna: "Tu cisterna", "pozo-barrio": "El pozo del barrio", pozo: "El pozo del camino" };

/** El abono del redil: cada oveja da 1 cada 3 horas, y se junta hasta 6. */
export const ABONO = { horasPorOveja: 3, tope: 6, alEmpezar: 2 };
const HORA = 3_600_000;

export type AbonoGuardado = { n: number; desde: string | null };

/** El abono que hay ahora con las ovejas del redil (`asentado`: para guardarlo al día). */
export function abonoDelRedil(a: AbonoGuardado, ovejas: number, ahora = Date.now()): { hay: number; proxima: number | null; asentado: AbonoGuardado } {
  const n = Math.max(0, Math.min(ABONO.tope, Math.floor(a.n || 0)));
  if (ovejas <= 0) return { hay: n, proxima: null, asentado: { n, desde: null } };
  const cada = (ABONO.horasPorOveja * HORA) / ovejas;
  const desde = a.desde ? new Date(a.desde).getTime() : NaN;
  if (!Number.isFinite(desde) || desde > ahora) return { hay: n, proxima: n >= ABONO.tope ? null : Math.ceil(cada / 1000), asentado: { n, desde: new Date(ahora).toISOString() } };
  const vueltas = Math.floor((ahora - desde) / cada);
  const hay = Math.min(ABONO.tope, n + vueltas);
  const nuevo = hay >= ABONO.tope ? ahora : desde + vueltas * cada;
  return { hay, proxima: hay >= ABONO.tope ? null : Math.max(1, Math.ceil((nuevo + cada - ahora) / 1000)), asentado: { n: hay, desde: new Date(nuevo).toISOString() } };
}

export type HerramientaId = "azada" | "cantaro" | "hoz";
export type Herramienta = { nombre: string; icono: string; mejor: { nombre: string; precio: number; ventaja: string } };
/** Las herramientas: se empieza con las de madera, piedra y barro; el herrero las mejora con gozo (1 Samuel 13:20). */
export const HERRAMIENTAS: Record<HerramientaId, Herramienta> = {
  azada: { nombre: "Azada de madera", icono: "⛏️", mejor: { nombre: "Azada de hierro", precio: 120, ventaja: "La tierra queda bien removida: las malas hierbas tardan el doble en salir." } },
  cantaro: { nombre: "Cántaro de barro", icono: "🏺", mejor: { nombre: "Cántaro grande", precio: 80, ventaja: "Lleva agua para 6 surcos en vez de 3." } },
  hoz: { nombre: "Hoz de piedra", icono: "🌾", mejor: { nombre: "Hoz de hierro", precio: 160, ventaja: "Una gavilla más cuando el surco tiene las 3 estrellas." } },
};
export const HERRAMIENTAS_IDS: HerramientaId[] = ["azada", "cantaro", "hoz"];

// ---------------------------------------------------------------- las tareas del huerto de cada día
export type TareaHuerto = "arar" | "sembrar" | "tiempo" | "regar" | "llenar" | "hierbas" | "aves" | "abonar" | "segar" | "estrellas" | "gavillas" | "rincon";
export type MisionHuerto = { id: string; tarea: TareaHuerto; meta: number; titulo: string; icono: string };

export const MISIONES_HUERTO: MisionHuerto[] = [
  { id: "arar3", tarea: "arar", meta: 3, titulo: "Ara 3 surcos con la azada", icono: "⛏️" },
  { id: "sembrar3", tarea: "sembrar", meta: 3, titulo: "Siembra 3 surcos", icono: "🌱" },
  { id: "tiempo2", tarea: "tiempo", meta: 2, titulo: "Siembra 2 surcos con el cultivo de la estación", icono: "🗓️" },
  { id: "regar3", tarea: "regar", meta: 3, titulo: "Riega 3 surcos con tu cántaro", icono: "💧" },
  { id: "llenar2", tarea: "llenar", meta: 2, titulo: "Llena tu cántaro 2 veces en el pozo", icono: "🏺" },
  { id: "hierbas4", tarea: "hierbas", meta: 4, titulo: "Arranca 4 malas hierbas", icono: "🌿" },
  { id: "aves2", tarea: "aves", meta: 2, titulo: "Espanta las aves de 2 surcos", icono: "🐦" },
  { id: "abonar2", tarea: "abonar", meta: 2, titulo: "Abona 2 surcos con lo de tu redil", icono: "🐑" },
  { id: "segar3", tarea: "segar", meta: 3, titulo: "Siega 3 surcos", icono: "🌾" },
  { id: "estrellas1", tarea: "estrellas", meta: 1, titulo: "Siega un surco bien cuidado (2 estrellas o más)", icono: "⭐" },
  { id: "gavillas8", tarea: "gavillas", meta: 8, titulo: "Lleva 8 gavillas al granero", icono: "🧺" },
  { id: "rincon1", tarea: "rincon", meta: 1, titulo: "Deja el rincón de un surco para el pobre", icono: "🤲" },
];
/** Gozo de cada tarea del huerto, y de más al cumplir las tres. */
export const GOZO_HUERTO = { mision: 8, todas: 10 };

function hash(s: string): number {
  let h = 2166136261;
  for (const ch of s) h = Math.imul(h ^ ch.charCodeAt(0), 16777619) >>> 0;
  return h >>> 0;
}

/**
 * Las 3 tareas del huerto de un día para una casa (sin azar al pedirlas otra vez: dependen del día y de la casa). Solo
 * las que se pueden hacer: sin regar ni llenar con la cisterna o si hoy llueve, sin abonar si no hay ovejas y sin el
 * cultivo de la estación si la estación no tiene.
 */
export function misionesDelDia(dia: string, casa: number, c: { cisterna: boolean; ovejas: boolean; cultivo: boolean; llueve: boolean }): MisionHuerto[] {
  const posibles = MISIONES_HUERTO.filter((m) => {
    if ((m.tarea === "regar" || m.tarea === "llenar") && (c.cisterna || c.llueve)) return false;
    if (m.tarea === "abonar" && !c.ovejas) return false;
    if (m.tarea === "tiempo" && !c.cultivo) return false;
    return true;
  });
  const orden = posibles.map((m) => ({ m, k: hash(`${dia}:${casa}:${m.id}`) })).sort((a, b) => a.k - b.k);
  return orden.slice(0, 3).map((x) => x.m);
}

// ---------------------------------------------------------------- la columna `labranza` de la casa
export type MisionesGuardadas = { dia: string; ids: string[]; cuenta: Partial<Record<TareaHuerto, number>>; premiadas: string[]; todas: boolean };
export type LabranzaGuardada = {
  /** riegos que quedan en el cántaro */
  agua: number;
  /** cántaros sacados del pozo hoy */
  pozo: { dia: string; n: number };
  herramientas: Record<HerramientaId, 1 | 2>;
  /** la cosecha segada que espera en el huerto para ir al granero */
  gavillas: { harina: number; aceite: number };
  abono: AbonoGuardado;
  misiones: MisionesGuardadas | null;
  /** rincones dejados para el pobre hoy */
  rincones: { dia: string; n: number };
  /** lo que se usó hoy en la casa por dentro: descansar, cocinar en el fogón y leer el rollo (shared/casa-interior.ts) */
  usos: { dia: string; hechos: string[] };
};

const entero = (v: unknown, max = 1_000_000) => Math.max(0, Math.min(max, Math.floor(Number(v) || 0)));
const nivel12 = (v: unknown): 1 | 2 => (Number(v) >= 2 ? 2 : 1);
const textoDia = (v: unknown) => (typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : "");

/** Lee la columna `labranza` (lo que falta queda como al empezar: cántaro lleno, herramientas sencillas, 2 de abono). */
export function leerLabranza(v: unknown): LabranzaGuardada {
  const o = objeto(v);
  const h = objeto(o.herramientas);
  const pozo = objeto(o.pozo);
  const g = objeto(o.gavillas);
  const ab = objeto(o.abono);
  const m = o.misiones && typeof o.misiones === "object" ? objeto(o.misiones) : null;
  const r = objeto(o.rincones);
  const u = objeto(o.usos);
  const herramientas = { azada: nivel12(h.azada), cantaro: nivel12(h.cantaro), hoz: nivel12(h.hoz) };
  const nuevo = !("agua" in o);
  return {
    agua: nuevo ? CANTARO[herramientas.cantaro] : entero(o.agua, CANTARO[herramientas.cantaro]),
    pozo: { dia: textoDia(pozo.dia), n: entero(pozo.n, 1000) },
    herramientas,
    gavillas: { harina: entero(g.harina, 10_000), aceite: entero(g.aceite, 10_000) },
    abono: "n" in ab ? { n: entero(ab.n, ABONO.tope), desde: fecha(ab.desde) ?? null } : { n: ABONO.alEmpezar, desde: null },
    misiones: m && textoDia(m.dia)
      ? {
          dia: textoDia(m.dia),
          ids: Array.isArray(m.ids) ? m.ids.filter((x): x is string => typeof x === "string" && MISIONES_HUERTO.some((mm) => mm.id === x)).slice(0, 3) : [],
          cuenta: Object.fromEntries(Object.entries(objeto(m.cuenta)).filter(([k]) => MISIONES_HUERTO.some((mm) => mm.tarea === k)).map(([k, n]) => [k, entero(n, 1000)])),
          premiadas: Array.isArray(m.premiadas) ? m.premiadas.filter((x): x is string => typeof x === "string") : [],
          todas: m.todas === true,
        }
      : null,
    rincones: { dia: textoDia(r.dia), n: entero(r.n, 100) },
    usos: { dia: textoDia(u.dia), hechos: Array.isArray(u.hechos) ? u.hechos.filter((x): x is string => x === "descansar" || x === "cocinar" || x === "leer") : [] },
  };
}

/** Las tareas de hoy (si cambió el día, empiezan de nuevo con las del día). */
export function misionesDeHoy(lab: LabranzaGuardada, dia: string, casa: number, c: Parameters<typeof misionesDelDia>[2]): MisionesGuardadas {
  if (lab.misiones && lab.misiones.dia === dia && lab.misiones.ids.length) return lab.misiones;
  return { dia, ids: misionesDelDia(dia, casa, c).map((m) => m.id), cuenta: {}, premiadas: [], todas: false };
}

/**
 * Anota lo que se hizo (`tarea`, `n` veces) en las tareas de hoy y dice cuáles se cumplieron ahora (para darles su
 * gozo). Cambia `m`.
 */
export function anotarTarea(m: MisionesGuardadas, tarea: TareaHuerto, n = 1): { cumplidas: MisionHuerto[]; todas: boolean } {
  if (n <= 0) return { cumplidas: [], todas: false };
  m.cuenta[tarea] = (m.cuenta[tarea] ?? 0) + n;
  const cumplidas: MisionHuerto[] = [];
  for (const id of m.ids) {
    const mi = MISIONES_HUERTO.find((x) => x.id === id);
    if (!mi || m.premiadas.includes(id)) continue;
    if ((m.cuenta[mi.tarea] ?? 0) >= mi.meta) {
      m.premiadas.push(id);
      cumplidas.push(mi);
    }
  }
  let todas = false;
  if (!m.todas && m.ids.length && m.ids.every((id) => m.premiadas.includes(id))) {
    m.todas = true;
    todas = true;
  }
  return { cumplidas, todas };
}

// ---------------------------------------------------------------- respuestas de la API
export type MisionHuertoVista = MisionHuerto & { hecho: number; cumplida: boolean };

export type LabranzaVista = {
  agua: number;
  carga: number;
  fuente: FuenteAgua;
  /** cántaros sacados hoy y cuántos se pueden (null: sin tope, con la cisterna o con lluvia) */
  pozo: { hoy: number; max: number | null };
  abono: { hay: number; tope: number; proxima: number | null; ovejas: number };
  herramientas: Record<HerramientaId, 1 | 2>;
  gavillas: { harina: number; aceite: number };
  misiones: MisionHuertoVista[];
  /** las tres tareas de hoy cumplidas (y su gozo de más ya dado) */
  todas: boolean;
  rincones: { hoy: number; max: number };
  /** cuánto cabe todavía en el alfolí de cada cosa */
  libre: { harina: number; aceite: number };
  /** la casa tiene el granero de las obras (se ve más grande) */
  granero: boolean;
  /** el huerto está ensanchado (shared/obras.ts) */
  ensanchado: boolean;
  /** hoy llueve en Jerusalén: lo que se siembra hoy queda regado */
  llueve: boolean;
};

export function vistaMisiones(m: MisionesGuardadas): MisionHuertoVista[] {
  return m.ids
    .map((id) => MISIONES_HUERTO.find((x) => x.id === id))
    .filter((x): x is MisionHuerto => !!x)
    .map((mi) => ({ ...mi, hecho: Math.min(mi.meta, m.cuenta[mi.tarea] ?? 0), cumplida: m.premiadas.includes(mi.id) }));
}

/** Lo que se puede hacer ahora en un surco (para la pantalla y el servidor). */
export type AccionSurco = "arar" | "sembrar" | "regar" | "hierbas" | "aves" | "abonar" | "segar";

/** El huertito de una casa para la ciudad: lo sembrado en cada surco (hasta 4) y su etapa (-1 arado y vacío, -2 sin arar). */
export function huertitoDe(huerto: unknown, nivel: number, obras: unknown, ahora = Date.now()): { s: SemillaId | null; e: number }[] {
  const surcos = leerHuerto(huerto, parcelasHuerto(nivel) + ventajasDeColumna(obras).parcelas).slice(0, 4);
  return surcos.map((p) => {
    if (!p.semilla) return { s: null, e: p.arado ? -1 : -2 };
    const total = duracion(p);
    const f = faltan(p, ahora);
    return { s: p.semilla, e: etapaDe(total > 0 ? 1 - f / total : 1) };
  });
}
