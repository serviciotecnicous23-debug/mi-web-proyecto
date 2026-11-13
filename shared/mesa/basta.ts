/**
 * El «Basta» bíblico (2 a 12): una letra y cuatro categorías (personaje, lugar, libro de la Biblia y objeto).
 *
 * - En cada ronda sale una letra y todos escriben una palabra de la Biblia que empiece con ella en cada categoría.
 * - El primero que llena las cuatro dice «¡Basta!»: los demás tienen unos segundos para terminar.
 * - El servidor comprueba cada respuesta con su lista (sin importar tildes ni mayúsculas, y perdona una letra de más o
 *   de menos en las palabras largas): una respuesta buena que nadie más puso vale 100; repetida, 50; si no está en la
 *   lista o no empieza con la letra, 0.
 * - Son 5 rondas con letras distintas; gana quien suma más.
 * - De los demás solo se ve lo que está en la lista (nunca lo que escribieron si no vale), y nada antes de cerrar la
 *   ronda: mientras se escribe, solo cuántas lleva cada uno.
 * - Los compañeros de la computadora «saben» palabras de la lista (más o menos según su nivel) y a veces dicen
 *   «¡Basta!» ellos.
 */
import {
  anotar, copiar, entero, entre, mal, mezclar, puestosPor,
  type Aplicado, type Azar, type ConEventos, type ConfigMesa, type FinMesa, type ModuloMesa, type Nivel,
} from "./comun";
import { BASTA, CATEGORIAS_BASTA, LETRAS_BASTA, limpiarRespuestaBasta, normalizarBasta, type CatBasta } from "./basta-reglas";

export * from "./basta-reglas";

// ---------------------------------------------------------------- la lista
type Entrada = { canon: string; norm: string };
const armar = (l: string[], otros: Record<string, string> = {}): Entrada[] => {
  const visto = new Set<string>();
  const out: Entrada[] = [];
  for (const canon of l) {
    const norm = normalizarBasta(canon);
    if (!norm || visto.has(norm)) continue;
    visto.add(norm);
    out.push({ canon, norm });
  }
  for (const [o, canon] of Object.entries(otros)) out.push({ canon, norm: normalizarBasta(o) });
  return out;
};
export type ListaBasta = { PERSONAJES_BASTA: string[]; LUGARES_BASTA: string[]; LIBROS_BASTA: string[]; LIBROS_OTROS: Record<string, string>; OBJETOS_BASTA: string[] };
let LISTA: Record<CatBasta, Entrada[]> = { personaje: [], lugar: [], libro: [], objeto: [] };
/** La lista vive solo en el servidor (server/mesa-basta-lista.ts): el servidor la pone al arrancar (y las pruebas). */
export function ponerListaBasta(l: ListaBasta) {
  LISTA = {
    personaje: armar(l.PERSONAJES_BASTA),
    lugar: armar(l.LUGARES_BASTA),
    libro: armar(l.LIBROS_BASTA, l.LIBROS_OTROS),
    objeto: armar(l.OBJETOS_BASTA),
  };
}
export const palabrasDe = (cat: CatBasta, letra: string) => [...new Set(LISTA[cat].filter((x) => x.norm.startsWith(letra.toLowerCase())).map((x) => x.canon))];

function distancia(a: string, b: string, tope = 2): number {
  if (Math.abs(a.length - b.length) > tope) return tope + 1;
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...new Array<number>(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
}

/** La respuesta como queda en la lista (o null si no vale con esa letra). */
export function revisarRespuesta(cat: CatBasta, letra: string, texto: string): string | null {
  const n = normalizarBasta(texto);
  const l = letra.toLowerCase();
  if (!n || !n.startsWith(l)) return null;
  const exacta = LISTA[cat].find((x) => x.norm === n);
  if (exacta) return exacta.canon;
  if (n.length < 5) return null;
  const cerca = LISTA[cat].filter((x) => x.norm.startsWith(l) && distancia(x.norm, n, 1) <= 1);
  const unicas = [...new Set(cerca.map((x) => x.canon))];
  return unicas.length === 1 ? unicas[0] : null;
}

// ---------------------------------------------------------------- el estado
type Resp = Record<CatBasta, string>;
const vacio = (): Resp => ({ personaje: "", lugar: "", libro: "", objeto: "" });
type Plan = { cat: CatBasta; en: number; palabra: string };
export type CasillaBasta = { canon: string | null; puntos: number; repetida: boolean };
export type RondaBasta = { letra: string; dijoBasta: number | null; casillas: Record<CatBasta, CasillaBasta>[]; total: number[]; crudo: Resp[] };

export type EvBasta =
  | { t: "letra"; ronda: number; letra: string }
  | { t: "basta"; a: number }
  | { t: "tiempo" }
  | { t: "ronda"; ronda: number }
  | { t: "fin" };

export type EstadoBasta = ConEventos<EvBasta> & {
  juego: "basta";
  n: number;
  bots: (Nivel | null)[];
  letras: string[];
  ronda: number;
  fase: "preparar" | "escribir" | "basta" | "revisar" | "fin";
  faseHasta: number;
  respuestas: Resp[];
  dijoBasta: number | null;
  planes: Plan[][];
  bastaBot: (number | null)[];
  rondas: RondaBasta[];
  puntos: number[];
  terminoAt: number | null;
};

export type JugadaBasta = { t: "respuestas"; r: Partial<Resp> } | { t: "basta" };

export type BastaVista = {
  juego: "basta";
  fase: EstadoBasta["fase"];
  ronda: number;
  rondas: number;
  letra: string | null;
  restanteMs: number;
  yo: number | null;
  /** Lo que escribí (como lo tiene el servidor). */
  mias: Resp | null;
  /** Cuántas categorías lleva escritas cada uno (mientras se escribe). */
  llevan: number[];
  dijoBasta: number | null;
  /** La última ronda cerrada (al revisar y al final): de los demás, solo lo que vale. */
  revisada: null | { letra: string; dijoBasta: number | null; casillas: Record<CatBasta, CasillaBasta>[]; total: number[]; miCrudo: Resp | null };
  /** Lo de cada ronda: la letra y los puntos de cada uno. */
  historial: { letra: string; total: number[] }[];
  puntos: number[];
  eventos: EstadoBasta["eventos"];
};

// ---------------------------------------------------------------- los compañeros
const SABE: Record<Nivel, { p: number; a: number; b: number }> = {
  facil: { p: 0.5, a: 16_000, b: 70_000 },
  normal: { p: 0.76, a: 10_000, b: 46_000 },
  dificil: { p: 0.93, a: 6000, b: 30_000 },
};

function planear(e: EstadoBasta, t: number, azar: Azar) {
  const letra = e.letras[e.ronda - 1];
  e.planes = e.bots.map((nivel) => {
    if (!nivel) return [];
    const s = SABE[nivel];
    const plan: Plan[] = [];
    for (const cat of CATEGORIAS_BASTA) {
      const l = palabrasDe(cat, letra);
      if (!l.length || azar() >= s.p) continue;
      // las más conocidas salen más (y a veces se repiten con las de otros)
      const palabra = azar() < 0.6 ? l[entero(azar, Math.min(3, l.length))] : l[entero(azar, l.length)];
      plan.push({ cat, en: Math.round(t + entre(azar, s.a, s.b)), palabra });
    }
    return plan;
  });
  e.bastaBot = e.bots.map((nivel, a) => {
    if (!nivel || e.planes[a].length < CATEGORIAS_BASTA.length) return null;
    const ultimo = Math.max(...e.planes[a].map((p) => p.en));
    return Math.round(ultimo + entre(azar, 900, 2600));
  });
}

// ---------------------------------------------------------------- jugar
function empezarRonda(e: EstadoBasta, t: number, azar: Azar) {
  e.fase = "escribir";
  e.faseHasta = t + BASTA.escribirMs;
  e.respuestas = e.bots.map(vacio);
  e.dijoBasta = null;
  planear(e, t, azar);
  anotar(e, t, { t: "letra", ronda: e.ronda, letra: e.letras[e.ronda - 1] });
}

function cerrarRonda(e: EstadoBasta, t: number) {
  const letra = e.letras[e.ronda - 1];
  const canon = e.respuestas.map((r) => Object.fromEntries(CATEGORIAS_BASTA.map((c) => [c, revisarRespuesta(c, letra, r[c])])) as Record<CatBasta, string | null>);
  const casillas = canon.map((fila, a) =>
    Object.fromEntries(
      CATEGORIAS_BASTA.map((c) => {
        const v = fila[c];
        const repetida = v != null && canon.some((o, b) => b !== a && o[c] === v);
        return [c, { canon: v, puntos: v == null ? 0 : repetida ? BASTA.repetida : BASTA.unica, repetida }];
      }),
    ) as Record<CatBasta, CasillaBasta>,
  );
  const total = casillas.map((f) => CATEGORIAS_BASTA.reduce((s, c) => s + f[c].puntos, 0));
  total.forEach((x, a) => (e.puntos[a] += x));
  e.rondas.push({ letra, dijoBasta: e.dijoBasta, casillas, total, crudo: e.respuestas.map((r) => ({ ...r })) });
  e.fase = "revisar";
  e.faseHasta = t + BASTA.revisarMs;
  e.planes = e.bots.map(() => []);
  e.bastaBot = e.bots.map(() => null);
  anotar(e, t, { t: "ronda", ronda: e.ronda });
}

function decirBasta(e: EstadoBasta, a: number, t: number): string | null {
  if (e.fase !== "escribir") return e.fase === "basta" ? null : "Ahora no se puede decir «¡Basta!».";
  const r = e.respuestas[a];
  if (CATEGORIAS_BASTA.some((c) => !r[c].trim())) return "Para decir «¡Basta!» llena las cuatro.";
  e.fase = "basta";
  e.dijoBasta = a;
  e.faseHasta = t + BASTA.bastaMs;
  e.bastaBot = e.bots.map(() => null);
  anotar(e, t, { t: "basta", a });
  return null;
}

type Hora = { en: number; que: "fase" | "plan" | "basta"; a?: number; k?: number };
function siguiente(e: EstadoBasta): Hora | null {
  if (e.fase === "fin") return null;
  let m: Hora = { en: e.faseHasta, que: "fase" };
  if (e.fase === "escribir" || e.fase === "basta") {
    e.planes.forEach((l, a) => l.forEach((p, k) => p.en < m.en && (m = { en: p.en, que: "plan", a, k })));
  }
  if (e.fase === "escribir") e.bastaBot.forEach((x, a) => x != null && x < m.en && (m = { en: x, que: "basta", a }));
  return m;
}

function correr(e: EstadoBasta, ahora: number, azar: Azar): boolean {
  let cambio = false;
  for (let vueltas = 0; vueltas < 500; vueltas++) {
    const h = siguiente(e);
    if (!h || h.en > ahora) break;
    cambio = true;
    if (h.que === "plan") {
      const p = e.planes[h.a!].splice(h.k!, 1)[0];
      if (e.bots[h.a!]) e.respuestas[h.a!][p.cat] = p.palabra;
      continue;
    }
    if (h.que === "basta") {
      e.bastaBot[h.a!] = null;
      if (e.bots[h.a!]) decirBasta(e, h.a!, h.en);
      continue;
    }
    // cambia la fase
    if (e.fase === "preparar") empezarRonda(e, h.en, azar);
    else if (e.fase === "escribir") {
      anotar(e, h.en, { t: "tiempo" });
      cerrarRonda(e, h.en);
    } else if (e.fase === "basta") cerrarRonda(e, h.en);
    else if (e.fase === "revisar") {
      if (e.ronda >= e.letras.length) {
        e.fase = "fin";
        e.terminoAt = h.en;
        anotar(e, h.en, { t: "fin" });
      } else {
        e.ronda += 1;
        empezarRonda(e, h.en, azar);
      }
    }
  }
  return cambio;
}

export const basta: ModuloMesa<EstadoBasta, JugadaBasta, BastaVista, { rondas: number }> & {
  vistaPara(e: EstadoBasta, asiento: number | null, ahora: number): BastaVista;
  jugadaDeBot(e: EstadoBasta, asiento: number, nivel: Nivel, azar: Azar): JugadaBasta | null;
} = {
  id: "basta",
  min: 2,
  max: 12,

  estadoInicial(cfg: ConfigMesa<{ rondas: number }>, azar: Azar, ahora: number): EstadoBasta {
    const n = cfg.bots.length;
    const rondas = Math.max(1, Math.min(LETRAS_BASTA.length, Math.round(cfg.opciones?.rondas ?? BASTA.rondas)));
    return {
      juego: "basta",
      n,
      bots: [...cfg.bots],
      letras: mezclar([...LETRAS_BASTA], azar).slice(0, rondas),
      ronda: 1,
      fase: "preparar",
      faseHasta: ahora + BASTA.prepararMs,
      respuestas: cfg.bots.map(vacio),
      dijoBasta: null,
      planes: cfg.bots.map(() => []),
      bastaBot: cfg.bots.map(() => null),
      rondas: [],
      puntos: new Array<number>(n).fill(0),
      terminoAt: null,
      ev: 0,
      eventos: [],
    };
  },

  turnoDe: () => null,

  jugadasValidas(e, a) {
    if (e.fase !== "escribir" && e.fase !== "basta") return [];
    const out: JugadaBasta[] = [{ t: "respuestas", r: {} }];
    if (e.fase === "escribir" && CATEGORIAS_BASTA.every((c) => e.respuestas[a][c].trim())) out.push({ t: "basta" });
    return out;
  },

  leerJugada(x) {
    if (!x || typeof x !== "object") return null;
    const o = x as Record<string, unknown>;
    if (o.t === "basta") return { t: "basta" };
    if (o.t === "respuestas" && o.r && typeof o.r === "object") {
      const r: Partial<Resp> = {};
      for (const c of CATEGORIAS_BASTA) {
        const v = (o.r as Record<string, unknown>)[c];
        if (typeof v === "string") r[c] = limpiarRespuestaBasta(v);
      }
      return { t: "respuestas", r };
    }
    return null;
  },

  aplicar(e0, a, j, ahora, azar): Aplicado<EstadoBasta> {
    if (a < 0 || a >= e0.n) return mal("No juegas en esta partida.");
    const e = copiar(e0);
    correr(e, ahora, azar);
    if (j.t === "basta") {
      const m = decirBasta(e, a, ahora);
      return m ? mal(m) : { ok: true, e };
    }
    if (e.fase !== "escribir" && e.fase !== "basta") return mal(e.fase === "revisar" ? "La ronda ya se cerró." : "Ahora no se escribe.");
    for (const c of CATEGORIAS_BASTA) if (typeof j.r[c] === "string") e.respuestas[a][c] = limpiarRespuestaBasta(j.r[c]);
    return { ok: true, e };
  },

  alTiempo(e0, ahora, azar) {
    const h = siguiente(e0);
    if (!h || h.en > ahora) return null;
    const e = copiar(e0);
    return correr(e, ahora, azar) ? e : null;
  },

  proximoCambio(e, ahora) {
    const h = siguiente(e);
    return h ? Math.max(0, h.en - ahora) : null;
  },

  terminado(e): FinMesa | null {
    if (e.fase !== "fin") return null;
    const puestos = puestosPor(e.puntos);
    const top = Math.max(...e.puntos);
    const primeros = puestos.map((p, a) => (p === 1 ? a : -1)).filter((a) => a >= 0);
    const titulo = primeros.length === 1 ? `¡Ganó @${primeros[0]} con ${top} puntos!` : `¡Empate! ${primeros.map((a) => `@${a}`).join(" y ")}, con ${top}.`;
    return { puestos, puntos: [...e.puntos], titulo, detalle: e.puntos.map((p) => `${p} puntos`) };
  },

  ponerBot(e0, a, nivel) {
    const e = copiar(e0);
    e.bots[a] = nivel;
    if (!nivel) {
      e.planes[a] = [];
      e.bastaBot[a] = null;
    }
    return e;
  },

  vistaPara(e, yo, ahora): BastaVista {
    const soy = yo != null && yo >= 0 && yo < e.n ? yo : null;
    const ult = e.rondas[e.rondas.length - 1];
    const mostrar = (e.fase === "revisar" || e.fase === "fin") && ult;
    return {
      juego: "basta",
      fase: e.fase,
      ronda: e.ronda,
      rondas: e.letras.length,
      letra: e.fase === "preparar" ? null : e.letras[e.ronda - 1],
      restanteMs: Math.max(0, e.faseHasta - ahora),
      yo: soy,
      mias: soy != null ? { ...e.respuestas[soy] } : null,
      llevan: e.respuestas.map((r) => CATEGORIAS_BASTA.filter((c) => r[c].trim()).length),
      dijoBasta: e.dijoBasta,
      revisada: mostrar ? { letra: ult.letra, dijoBasta: ult.dijoBasta, casillas: ult.casillas, total: ult.total, miCrudo: soy != null ? ult.crudo[soy] : null } : null,
      historial: e.rondas.map((r) => ({ letra: r.letra, total: r.total })),
      puntos: [...e.puntos],
      eventos: e.eventos,
    };
  },

  jugadaDeBot(e, a, nivel, azar) {
    if (e.fase !== "escribir") return null;
    const letra = e.letras[e.ronda - 1];
    const r = e.respuestas[a];
    const falta = CATEGORIAS_BASTA.find((c) => !r[c].trim());
    if (!falta) return { t: "basta" };
    const l = palabrasDe(falta, letra);
    if (!l.length || azar() > SABE[nivel].p) return null;
    return { t: "respuestas", r: { [falta]: l[entero(azar, l.length)] } };
  },
};

