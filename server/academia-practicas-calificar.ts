/**
 * El corazón del motor de prácticas (sin base de datos: se prueba en academia-practicas-calificar.test.ts):
 * - arma cada actividad para un intento, en una de sus FORMAS DE JUGAR (shared/practicas.ts, `FORMATOS`): el mismo
 *   contenido de la lección se juega como «Relámpago», «Desliza», «¿Cuál no va?», «Escalones», «¿Cuál es falsa?»…;
 *   el orden mezclado y las rondas quedan fijos en su estado;
 * - la muestra como la ve el alumno, sin las respuestas, de a un paso en las formas por pasos;
 * - califica cada respuesta y devuelve la corrección, la explicación y la frase de la lección que la sostiene.
 * Los índices que manda el alumno son los del orden en que se le mostró; aquí se traducen al orden original.
 */
import { ordenDeOpciones } from "@shared/estudios";
import {
  CONSIGNA_PIEZA, COMO_SE_JUEGA, FORMATOS, FORMATOS_SOLO_PARA_APRENDER,
  type Correccion, type Devolucion, type Formato, type ItemVista, type ModoPractica, type Pieza, type RespuestaPractica,
} from "@shared/practicas";
import { ESCRITA } from "@shared/academia";
import { corregirEscrita, distancia, normalizar } from "./academia-correccion";
import { numeroDe } from "./orden-examen";
import { huecosDe } from "./academia/practicas/validar";
import type { Actividad, VersionCaso, VersionEscenario } from "./academia/practicas/tipos";

/** El estado de una actividad dentro de un intento (se guarda en el intento como JSON). */
export type EstadoItem = {
  leccion: string;
  actividad: string;
  version: number;
  /** La forma de jugar (los intentos de antes no la traen: la primera de su pieza). */
  formato?: Formato;
  /** Los órdenes mezclados: banco, derecha, frases, pasos, opciones, eventos, lugares, `esc:<id>` y `paso:<n>`. */
  orden: Record<string, number[]>;
  /** Las palabras para elegir (completa) o las relaciones (mapa de ideas), ya mezcladas. */
  banco?: string[];
  /** Las rondas de las formas por pasos (relámpago, elige la pareja, ¿cuál no va?, ¿qué falta?, ¿cuál es falsa?…). */
  rondas?: any[];
  /** Cuántos pasos tiene. */
  total?: number;
  paso: number;
  /** Escenario: la escena en la que está (null al terminar). */
  escena?: string | null;
  puntajes: number[];
  terminada: boolean;
  puntaje: number | null;
  pista: boolean;
};

/** Fin de un escenario: una opción con `siguiente: "fin"` termina antes de la última escena. */
export const FIN_ESCENARIO = "fin";

const mezclar = (n: number, semilla: number, clave: string) => ordenDeOpciones(n, (semilla ^ numeroDe(clave)) >>> 0);

/** La versión de una actividad (con su tipo según la pieza). */
function versionDe<A extends Actividad>(a: A, e: EstadoItem): A["versiones"][number] {
  return a.versiones[Math.max(0, Math.min(a.versiones.length - 1, e.version))] as A["versiones"][number];
}

/** La forma de jugar de un estado (los de antes de las formas: la primera de su pieza). */
export const formatoDe = (a: Actividad, e: EstadoItem): Formato => e.formato ?? (FORMATOS[a.pieza][0] as Formato);

/**
 * La lista en su orden de una actividad que se ordena: los pasos de `ordena` o los hechos de la `linea` (con su fecha,
 * que se muestra al corregir). Escalones y ¿Dónde va? juegan las dos.
 */
export function listaDe(a: Actividad, v: any): { textos: string[]; fechas: (string | null)[] } {
  if (a.pieza === "linea") return { textos: v.eventos.map((x: any) => x.texto as string), fechas: v.eventos.map((x: any) => x.fecha as string) };
  return { textos: (v.pasos ?? []) as string[], fechas: ((v.pasos ?? []) as string[]).map(() => null) };
}
/** El orden mezclado en que se muestran los pasos o los hechos. */
export const ordenDeLista = (a: Actividad, e: EstadoItem): number[] => (a.pieza === "linea" ? e.orden.eventos : e.orden.pasos) ?? [];
/** Un paso o un hecho para las explicaciones (el hecho, con su fecha). */
const conFecha = (l: { textos: string[]; fechas: (string | null)[] }, k: number) => (l.fechas[k] ? `${l.textos[k]} (${l.fechas[k]})` : l.textos[k]);

/** Las formas que se arman por rondas (`EstadoItem.rondas`). */
const POR_RONDAS = new Set<Formato>(["relampago", "elige", "elige-pareja", "intruso", "donde-va", "cual-falsa", "anagrama", "sopa", "crucigrama", "arma", "memoria", "atrapa", "adivina", "globos"]);

/** Todas las afirmaciones de una actividad de verdad o error (de todas sus versiones), con su versión. */
function afirmacionesDe(a: Actividad): { v: number; i: number; verdad: boolean }[] {
  if (a.pieza !== "verdad") return [];
  return a.versiones.flatMap((v, vi) => v.afirmaciones.map((x, i) => ({ v: vi, i, verdad: x.verdad })));
}

/** Si se puede jugar «¿Cuál no va?»: un grupo con 3 frases o más y otro grupo con alguna. */
function intrusoPosible(v: any): boolean {
  const porGrupo = (v.grupos ?? []).map((_: unknown, g: number) => (v.frases ?? []).filter((f: any) => f.grupo === g).length);
  return porGrupo.some((n: number, g: number) => n >= 3 && porGrupo.some((m: number, h: number) => h !== g && m >= 1));
}

/** Las formas de jugar que admite una actividad en este modo (la primera siempre se puede). */
export function formatosPosibles(a: Actividad, version: number, modo: ModoPractica): Formato[] {
  const v: any = a.versiones[version];
  const todas = FORMATOS[a.pieza] as readonly Formato[];
  return todas.filter((f) => {
    if (modo === "cuenta" && FORMATOS_SOLO_PARA_APRENDER.includes(f)) return false;
    switch (f) {
      case "relampago":
        return (v.tarjetas?.length ?? 0) >= 3;
      case "elige-pareja":
        return (v.pares?.length ?? 0) >= 3;
      case "desliza":
        return v.grupos?.length === 2;
      case "intruso":
        return intrusoPosible(v);
      case "escalones":
        return listaDe(a, v).textos.length >= 3;
      case "donde-va":
        return listaDe(a, v).textos.length >= 4;
      case "cual-falsa": {
        const af = afirmacionesDe(a);
        const f1 = af.filter((x) => !x.verdad).length;
        const v1 = af.length - f1;
        return (f1 >= 1 && v1 >= 2) || (f1 >= 2 && v1 >= 1);
      }
      case "anagrama":
        return huecosDe(v.texto).length <= 3 && !!palabrasSueltas(v, 3, 14);
      case "sopa":
        return huecosDe(v.texto).length <= 4 && !!palabrasSueltas(v, 3, LADO_SOPA);
      case "crucigrama": {
        const ps = palabrasSueltas(v, 3, 12);
        return !!ps && !!crucigramaDe(ps);
      }
      case "arma":
        return !!trozosDe(v.texto);
      case "memoria":
        return (v.pares?.length ?? 0) >= 3 && v.pares.length <= 5 && new Set((v.pares as string[][]).flat().map((x) => normalizar(x))).size === v.pares.length * 2;
      case "atrapa":
        return grupoParaAtrapar(v) != null;
      case "adivina":
        return adivinables(v.texto).length > 0;
      case "globos":
        return !!globosDe(a, 1, "posible");
      default:
        return true;
    }
  });
}

/** Las formas de cada pieza, de la más difícil a la más fácil (el reto de dominio usa la más difícil que se pueda). */
const DIFICULTAD: Partial<Record<Pieza, Formato[]>> = {
  completa: ["escribe", "crucigrama", "adivina", "anagrama", "elige", "sopa", "arma", "banco"],
  relaciona: ["parejas", "memoria", "elige-pareja"],
  clasifica: ["recuadros", "atrapa", "intruso", "desliza"],
  ordena: ["lista", "donde-va", "escalones"],
  linea: ["lista", "donde-va", "escalones"],
  verdad: ["cual-falsa", "globos", "verdad-o-error"],
  error: ["detective", "frases"],
  situacion: ["chat", "opciones"],
};

/** La forma más difícil de una actividad (para el reto de dominio). */
export function formatoDificil(a: Actividad, version: number): Formato {
  const posibles = formatosPosibles(a, version, "reto");
  return (DIFICULTAD[a.pieza] ?? []).find((f) => posibles.includes(f)) ?? posibles[0] ?? (FORMATOS[a.pieza][0] as Formato);
}

/** Cuántos pasos tiene una actividad en su forma de siempre (las que no van por pasos tienen 1). */
export function pasosDe(a: Actividad, version: number): number {
  const v: any = a.versiones[version];
  switch (a.pieza) {
    case "verdad":
      return v.afirmaciones.length;
    case "mapa":
      return v.lugares.length;
    case "caso":
      return v.pasos.length;
    case "escenario":
      return v.escenas.length;
    default:
      return 1;
  }
}

/** Un orden mezclado que nunca es el correcto (para ordenar no vale empezar ya resuelto). */
function desordenado(n: number, semilla: number, clave: string): number[] {
  for (let k = 0; k < 6; k++) {
    const o = mezclar(n, semilla + k * 7919, clave);
    if (o.some((x, i) => x !== i)) return o;
  }
  return Array.from({ length: n }, (_, i) => (i + 1) % n);
}

/** Toma `cuantos` elementos distintos de una lista, en un orden mezclado propio de la clave. */
function tomar<T>(lista: T[], cuantos: number, semilla: number, clave: string): T[] {
  return mezclar(lista.length, semilla, clave)
    .slice(0, cuantos)
    .map((i) => lista[i]);
}

// ---------------------------------------------------------------- las dinámicas del catálogo (26-nov)

/** Un generador de números al azar fijo por semilla y clave (la sopa de letras sale igual cada vez que se mira). */
function azar(semilla: number, clave: string): () => number {
  let s = (semilla ^ numeroDe(clave)) >>> 0 || 1;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Una palabra para la sopa o el crucigrama: en mayúsculas, sin tildes (la ñ queda) y sin espacios ni signos. */
export const enLetras = (s: string) =>
  s.normalize("NFD").replace(/[\u0300\u0301\u0308]/g, "").normalize("NFC").toUpperCase().replace(/[^A-ZÑ]/g, "");

/** Las palabras que faltan de una completa, si todas son una sola palabra (solo letras) de `min` a `max` y distintas. */
function palabrasSueltas(v: any, min: number, max: number): string[] | null {
  const hs = huecosDe(v.texto);
  const ok = hs.length > 0 && hs.every((h) => /^\p{L}+$/u.test(h.trim()) && enLetras(h).length >= min && enLetras(h).length <= max);
  return ok && new Set(hs.map(enLetras)).size === hs.length ? hs : null;
}

const LADO_SOPA = 9;
const RELLENO_SOPA = "AAABCDEEEFGILLMNNOOOPRRSSTTUUV";
/**
 * La sopa de letras: las palabras que faltan y hasta dos de las que no van (para que haya que saber cuáles completan
 * la frase), en línea recta y siempre para leerse de izquierda a derecha o hacia abajo (a la derecha, hacia abajo o
 * en diagonal, bajando o subiendo), y el resto con letras al azar. Si en 12 sopas no caben todas, null.
 */
function sopaDe(respuestas: string[], extras: string[], semilla: number, clave: string): { filas: string[]; colocadas: { texto: string; trazo: number[]; respuesta: boolean }[] } | null {
  for (let vez = 0; vez < 12; vez++) {
    const s = unaSopa(respuestas, extras, azar(semilla + vez * 7919, `${clave}:sopa`));
    if (s) return s;
  }
  return null;
}

function unaSopa(respuestas: string[], extras: string[], rnd: () => number): { filas: string[]; colocadas: { texto: string; trazo: number[]; respuesta: boolean }[] } | null {
  const N = LADO_SOPA;
  const celdas: string[] = Array(N * N).fill("");
  const dirs = [[0, 1], [1, 0], [1, 1], [-1, 1]];
  const colocadas: { texto: string; trazo: number[]; respuesta: boolean }[] = [];
  const poner = (texto: string, respuesta: boolean): boolean => {
    const w = enLetras(texto);
    if (w.length < 3 || w.length > N) return false;
    for (let intento = 0; intento < 500; intento++) {
      const [dr, dc] = dirs[Math.floor(rnd() * dirs.length)];
      // (la fila de comienzo: subiendo, desde abajo lo bastante para que quepa)
      const rMin = dr < 0 ? w.length - 1 : 0;
      const rMax = dr > 0 ? N - w.length : N - 1;
      const r0 = rMin + Math.floor(rnd() * (rMax - rMin + 1));
      const c0 = Math.floor(rnd() * (N - dc * (w.length - 1)));
      let ok = true;
      for (let k = 0; k < w.length && ok; k++) {
        const x = celdas[(r0 + dr * k) * N + c0 + dc * k];
        if (x && x !== w[k]) ok = false;
      }
      if (!ok) continue;
      for (let k = 0; k < w.length; k++) celdas[(r0 + dr * k) * N + c0 + dc * k] = w[k];
      colocadas.push({ texto, trazo: [r0, c0, r0 + dr * (w.length - 1), c0 + dc * (w.length - 1)], respuesta });
      return true;
    }
    return false;
  };
  for (const r of [...respuestas].sort((a, b) => enLetras(b).length - enLetras(a).length)) if (!poner(r, true)) return null;
  for (const x of extras) poner(x, false);
  for (let i = 0; i < celdas.length; i++) if (!celdas[i]) celdas[i] = RELLENO_SOPA[Math.floor(rnd() * RELLENO_SOPA.length)];
  return { filas: Array.from({ length: N }, (_, r) => celdas.slice(r * N, r * N + N).join("")), colocadas };
}

/** Las letras de un trazo de la sopa (de una punta a la otra, en línea recta), o null si no es una línea. */
function letrasDelTrazo(filas: string[], t: unknown): string | null {
  if (!Array.isArray(t) || t.length !== 4 || !t.every((x) => Number.isInteger(x))) return null;
  const [r0, c0, r1, c1] = t as number[];
  const dr = Math.sign(r1 - r0);
  const dc = Math.sign(c1 - c0);
  const largo = Math.max(Math.abs(r1 - r0), Math.abs(c1 - c0)) + 1;
  if (!(dr || dc) || (dr && dc && Math.abs(r1 - r0) !== Math.abs(c1 - c0))) return null;
  let s = "";
  for (let k = 0; k < largo; k++) {
    const fila = filas[r0 + dr * k];
    const x = fila?.[c0 + dc * k];
    if (!x) return null;
    s += x;
  }
  return s;
}

type Cruce = { i: number; fila: number; col: number; dir: "h" | "v" };
const cacheCrucigrama = new Map<string, { filas: number; columnas: number; colocadas: Cruce[] } | null>();
/**
 * El crucigrama de las palabras que faltan (de 2 a 4): la más larga en horizontal y cada una de las otras cruzando una
 * ya puesta en una letra igual, sin tocar a las demás. Sale siempre igual para el mismo texto (no usa la semilla); null
 * si alguna no se puede cruzar o no cabe en el teléfono (12 por 12).
 */
export function crucigramaDe(palabras: string[]): { filas: number; columnas: number; colocadas: Cruce[] } | null {
  const llave = palabras.join("|");
  if (cacheCrucigrama.has(llave)) return cacheCrucigrama.get(llave)!;
  const ws = palabras.map(enLetras);
  let out: { filas: number; columnas: number; colocadas: Cruce[] } | null = null;
  if (ws.length >= 2 && ws.length <= 4 && ws.every((w) => w.length >= 3 && w.length <= 12)) {
    const orden = ws.map((_, i) => i).sort((a, b) => ws[b].length - ws[a].length || a - b);
    const mapa = new Map<string, string>();
    // (en qué sentido va cada casilla puesta: una casilla se cruza una sola vez, nunca a lo largo de otra palabra)
    const sentidos = new Map<string, string>();
    const k = (f: number, c: number) => `${f},${c}`;
    const colocadas: Cruce[] = [];
    const cabe = (w: string, f: number, c: number, dir: "h" | "v"): boolean => {
      const df = dir === "v" ? 1 : 0;
      const dc = dir === "h" ? 1 : 0;
      if (mapa.has(k(f - df, c - dc)) || mapa.has(k(f + df * w.length, c + dc * w.length))) return false;
      let cruces = 0;
      for (let j = 0; j < w.length; j++) {
        const ff = f + df * j;
        const cc = c + dc * j;
        const x = mapa.get(k(ff, cc));
        if (x) {
          if (x !== w[j] || (sentidos.get(k(ff, cc)) ?? "").includes(dir)) return false;
          cruces++;
          continue;
        }
        if (mapa.has(k(ff + dc, cc + df)) || mapa.has(k(ff - dc, cc - df))) return false;
      }
      return cruces > 0;
    };
    const poner = (i: number, f: number, c: number, dir: "h" | "v") => {
      const df = dir === "v" ? 1 : 0;
      const dc = dir === "h" ? 1 : 0;
      for (let j = 0; j < ws[i].length; j++) {
        const kk = k(f + df * j, c + dc * j);
        mapa.set(kk, ws[i][j]);
        sentidos.set(kk, (sentidos.get(kk) ?? "") + dir);
      }
      colocadas.push({ i, fila: f, col: c, dir });
    };
    poner(orden[0], 0, 0, "h");
    let todas = true;
    for (const i of orden.slice(1)) {
      const w = ws[i];
      let hecho = false;
      for (const p of [...colocadas]) {
        const pw = ws[p.i];
        const dir: "h" | "v" = p.dir === "h" ? "v" : "h";
        for (let a = 0; a < pw.length && !hecho; a++)
          for (let b = 0; b < w.length && !hecho; b++) {
            if (pw[a] !== w[b]) continue;
            const fa = p.fila + (p.dir === "v" ? a : 0);
            const ca = p.col + (p.dir === "h" ? a : 0);
            const f = fa - (dir === "v" ? b : 0);
            const c = ca - (dir === "h" ? b : 0);
            if (cabe(w, f, c, dir)) {
              poner(i, f, c, dir);
              hecho = true;
            }
          }
        if (hecho) break;
      }
      if (!hecho) {
        todas = false;
        break;
      }
    }
    if (todas) {
      const fs = [...mapa.keys()].map((x) => Number(x.split(",")[0]));
      const cs = [...mapa.keys()].map((x) => Number(x.split(",")[1]));
      const f0 = Math.min(...fs);
      const c0 = Math.min(...cs);
      const filas = Math.max(...fs) - f0 + 1;
      const columnas = Math.max(...cs) - c0 + 1;
      if (filas <= 12 && columnas <= 12) out = { filas, columnas, colocadas: colocadas.map((x) => ({ ...x, fila: x.fila - f0, col: x.col - c0 })) };
    }
  }
  cacheCrucigrama.set(llave, out);
  return out;
}

/** Las palabras que piden la siguiente: un trozo de «Arma la frase» no termina en ellas («favor de» | «Dios»). */
const PIDEN_LA_SIGUIENTE = new Set(
  "y e o u ni de del al a en la el los las lo un una unos unas que por para con sin su sus se es son no mi tu nos le les como si sobre entre hasta desde hacia ante tras cada muy más".split(" "),
);

/** La oración de una completa que se arma: la que lleva más palabras clave (sus [[ ]]), de 8 a 32 palabras. */
export function oracionParaArmar(texto: string): string | null {
  // (se corta en el punto que sigue a una palabra de 2 letras o más: «a. C.» no corta)
  const oraciones = texto.replace(/\s+/g, " ").trim().split(/(?<=[^\s.]{2}[.!?…])\s+(?=[¿¡A-ZÁÉÍÓÚÑ[])/);
  const largo = (o: string) => o.split(" ").length;
  const claves = (o: string) => (o.match(/\[\[/g) ?? []).length;
  return oraciones.filter((o) => largo(o) >= 8 && largo(o) <= 32).sort((a, b) => claves(b) - claves(a))[0] ?? null;
}

/**
 * Los trozos de la idea para «Arma la frase» (3 si tiene hasta 12 palabras, 4 hasta 20 y 5 hasta 32): UNA oración de
 * una completa, con sus palabras puestas (con dos, el orden de las oraciones también podría ir al revés y no sería justo
 * calificarlo), cortada donde mejor se lee: de tamaños parecidos, en las comas cuando se puede y nunca después de una
 * palabra que pide la siguiente. Nunca con una cita entre « » (Luis: armar versículos no; con conceptos sí).
 */
export function trozosDe(texto: string): string[] | null {
  if (/[«»]/.test(texto)) return null;
  const oracion = oracionParaArmar(texto);
  if (!oracion) return null;
  const w = oracion.replace(/\[\[([^\]]+)\]\]/g, "$1").split(" ");
  const n = w.length;
  if (n < 8 || n > 32) return null;
  const m = n <= 12 ? 3 : n <= 20 ? 4 : 5;
  const ideal = n / m;
  const costo = (i: number, j: number) => {
    const s = j - i;
    if (s < 2) return Infinity;
    let x = (s - ideal) ** 2;
    if (j < n && /[,;:.]$/.test(w[j - 1])) x -= 3;
    if (j < n && PIDEN_LA_SIGUIENTE.has(w[j - 1].toLowerCase())) x += 3;
    return x;
  };
  // (lo mejor para cortar las primeras j palabras en k trozos, y desde dónde empieza el último)
  const mejor: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(Infinity));
  const desde: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(-1));
  mejor[0][0] = 0;
  for (let k = 1; k <= m; k++)
    for (let j = 1; j <= n; j++)
      for (let i = 0; i < j; i++) {
        const x = mejor[k - 1][i] + costo(i, j);
        if (x < mejor[k][j]) {
          mejor[k][j] = x;
          desde[k][j] = i;
        }
      }
  if (!Number.isFinite(mejor[m][n])) return null;
  const fines: number[] = [];
  for (let k = m, j = n; k > 0; j = desde[k][j], k--) fines.unshift(j);
  const out = fines.map((j, k) => w.slice(k ? fines[k - 1] : 0, j).join(" "));
  return new Set(out).size === out.length ? out : null;
}

/** El grupo de «¡Atrápalas!»: el que más frases tiene (con 2 o más, y con 2 o más de los otros grupos para dejar pasar). */
function grupoParaAtrapar(v: any): number | null {
  const cuantas = (v.grupos as string[]).map((_, g) => (v.frases as any[]).filter((f) => f.grupo === g).length);
  const g = cuantas.indexOf(Math.max(...cuantas));
  const otras = (v.frases as any[]).length - cuantas[g];
  return cuantas[g] >= 2 && otras >= 2 && (v.frases as any[]).length <= 8 ? g : null;
}

/** «Memoria»: los errores que se perdonan (destapar es también recordar) y la nota con los que pasan. */
const perdonadosMemoria = (pares: number) => Math.round(pares * 1.5);
export const notaMemoria = (pares: number, fallos: number) => Math.max(0.5, 1 - Math.max(0, fallos - perdonadosMemoria(pares)) * 0.1);

/**
 * «Adivina la palabra» (el ahorcado del catálogo, con una lámpara: nada de horca en la academia): cada letra que no está
 * gasta una gota de aceite; con 6 gastadas se apaga la lámpara y la palabra vale 0. Resuelta, se perdonan 2 gotas y
 * después cada una resta 0,15 (nunca menos de 0,4).
 */
export const GOTAS_LAMPARA = 6;
export const notaAdivina = (fallos: number) => (fallos >= GOTAS_LAMPARA ? 0 : Math.max(0.4, 1 - Math.max(0, fallos - 2) * 0.15));
const letrasDeAdivinar = (w: string) => new Set([...enLetras(w)]);
/**
 * Las palabras que se pueden adivinar de una completa (sus índices): una sola palabra (solo letras) de 4 a 12 letras que
 * no aparece en otra parte del texto (con las demás puestas, la delataría: «el [[Cristo]]… La palabra Cristo significa»).
 */
function adivinables(texto: string): number[] {
  const todas = texto.replace(/\[\[([^\]]+)\]\]/g, "$1").split(/[^\p{L}]+/u).map(enLetras);
  return huecosDe(texto)
    .map((h, k) => (/^\p{L}+$/u.test(h.trim()) && enLetras(h).length >= 4 && enLetras(h).length <= 12 && todas.filter((w) => w === enLetras(h)).length === 1 ? k : -1))
    .filter((k) => k >= 0);
}

/** «Globos»: las afirmaciones que suben (de todas las versiones y sin repetir: hasta 3 verdades y 3 errores, 2 o más de cada una). */
function globosDe(a: Actividad, semilla: number, clave: string): { v: number; i: number }[] | null {
  const vistas = new Set<string>();
  const todas = afirmacionesDe(a).filter((x) => {
    const t = normalizar((a.versiones[x.v] as any).afirmaciones[x.i].texto);
    if (vistas.has(t)) return false;
    vistas.add(t);
    return true;
  });
  const verdades = todas.filter((x) => x.verdad);
  const errores = todas.filter((x) => !x.verdad);
  if (verdades.length < 2 || errores.length < 2) return null;
  const elegidas = [...tomar(verdades, 3, semilla, `${clave}:globos:v`), ...tomar(errores, 3, semilla, `${clave}:globos:e`)];
  return mezclar(elegidas.length, semilla, `${clave}:globos`).map((k) => ({ v: elegidas[k].v, i: elegidas[k].i }));
}

/** Arma las rondas de una forma por pasos (null si la forma no las usa). */
function rondasDe(a: Actividad, v: any, f: Formato, semilla: number, clave: string): any[] | null {
  switch (f) {
    case "relampago": {
      const n = v.tarjetas.length;
      return mezclar(n, semilla, `${clave}:cartas`).map((i) => {
        const otras = tomar(
          Array.from({ length: n }, (_, k) => k).filter((k) => k !== i),
          2,
          semilla,
          `${clave}:otras:${i}`,
        );
        const opciones = [i, ...otras];
        return { i, opciones: mezclar(opciones.length, semilla, `${clave}:op:${i}`).map((k) => opciones[k]) };
      });
    }
    case "elige": {
      const buenas = huecosDe(v.texto);
      const malas = (v.distractores as string[]).filter((d) => !buenas.some((b) => normalizar(b) === normalizar(d)));
      return buenas.map((b, g) => {
        const otra = malas.length ? malas[g % malas.length] : buenas[(g + 1) % buenas.length];
        const par = [b, otra];
        return { opciones: mezclar(2, semilla, `${clave}:elige:${g}`).map((k) => par[k]) };
      });
    }
    case "elige-pareja": {
      const n = v.pares.length;
      return mezclar(n, semilla, `${clave}:parejas`)
        .slice(0, 4)
        .map((i) => {
          const otras = tomar(
            Array.from({ length: n }, (_, k) => k).filter((k) => k !== i),
            2,
            semilla,
            `${clave}:otras:${i}`,
          );
          const opciones = [i, ...otras];
          return { i, opciones: mezclar(opciones.length, semilla, `${clave}:op:${i}`).map((k) => opciones[k]) };
        });
    }
    case "intruso": {
      const grupos = v.grupos as string[];
      const porGrupo = grupos.map((_, g) => (v.frases as any[]).map((f, i) => ({ f, i })).filter((x) => x.f.grupo === g).map((x) => x.i));
      const principales = mezclar(grupos.length, semilla, `${clave}:principal`).filter((g) => porGrupo[g].length >= 3);
      const rondas: { frases: number[]; intruso: number }[] = [];
      for (let r = 0; r < 2 && principales.length; r++) {
        const g = principales[r % principales.length];
        const tres = tomar(porGrupo[g], 3, semilla, `${clave}:tres:${r}`);
        const otros = porGrupo.flatMap((l, h) => (h === g ? [] : l));
        if (!otros.length) break;
        const intruso = tomar(otros, 1, semilla, `${clave}:intruso:${r}`)[0];
        const cuatro = [...tres, intruso];
        rondas.push({ frases: mezclar(4, semilla, `${clave}:cuatro:${r}`).map((k) => cuatro[k]), intruso });
      }
      return rondas;
    }
    case "donde-va": {
      // (un paso sale de la lista y el alumno toca el lugar donde va: así nada se adivina por descarte)
      const n = listaDe(a, v).textos.length;
      return tomar(Array.from({ length: n }, (_, k) => k), 2, semilla, `${clave}:huecos`)
        .sort((x, y) => x - y)
        .map((hueco) => ({ hueco }));
    }
    case "cual-falsa": {
      const todas = afirmacionesDe(a);
      const falsas = todas.filter((x) => !x.verdad);
      const verdades = todas.filter((x) => x.verdad);
      const rondas: { busca: "falsa" | "verdad"; items: { v: number; i: number }[]; correcta: number }[] = [];
      const usadas = new Set<string>();
      const libres = (l: typeof todas) => {
        const sin = l.filter((x) => !usadas.has(`${x.v}:${x.i}`));
        return sin.length ? sin : l;
      };
      for (let r = 0; r < 2; r++) {
        const puedeFalsa = falsas.length >= 1 && verdades.length >= 2;
        const puedeVerdad = falsas.length >= 2 && verdades.length >= 1;
        if (!puedeFalsa && !puedeVerdad) break;
        // primero «¿cuál es falsa?»; la segunda ronda, si se puede, al revés
        const busca: "falsa" | "verdad" = r === 0 ? (puedeFalsa ? "falsa" : "verdad") : puedeVerdad && rondas[0]?.busca === "falsa" ? "verdad" : puedeFalsa ? "falsa" : "verdad";
        const objetivo = tomar(libres(busca === "falsa" ? falsas : verdades), 1, semilla, `${clave}:obj:${r}`)[0];
        const resto = tomar(libres(busca === "falsa" ? verdades : falsas).filter((x) => x !== objetivo), 2, semilla, `${clave}:resto:${r}`);
        if (resto.length < 2) break;
        const tres = [objetivo, ...resto];
        tres.forEach((x) => usadas.add(`${x.v}:${x.i}`));
        const orden = mezclar(3, semilla, `${clave}:tres:${r}`);
        const items = orden.map((k) => ({ v: tres[k].v, i: tres[k].i }));
        rondas.push({ busca, items, correcta: orden.indexOf(0) });
      }
      return rondas;
    }
    case "anagrama":
      // (una ronda por palabra: sus letras revueltas, nunca en su orden)
      return huecosDe(v.texto).map((h, k) => {
        const letras = [...h.trim().toLocaleUpperCase("es")];
        let revueltas = letras;
        for (let t = 0; t < 8 && revueltas.join("") === letras.join(""); t++) revueltas = desordenado(letras.length, semilla + t, `${clave}:anagrama:${k}`).map((i) => letras[i]);
        return { letras: revueltas };
      });
    case "sopa": {
      const respuestas = huecosDe(v.texto);
      const extras = ((v.distractores ?? []) as string[]).filter((d) => /^\p{L}+$/u.test(d.trim()) && enLetras(d).length >= 3 && enLetras(d).length <= LADO_SOPA && !respuestas.some((r) => enLetras(r) === enLetras(d))).slice(0, 2);
      const s = sopaDe(respuestas, extras, semilla, clave);
      return s ? [s] : null;
    }
    case "crucigrama": {
      const ps = palabrasSueltas(v, 3, 12);
      const c = ps ? crucigramaDe(ps) : null;
      if (!c) return null;
      // (numeradas como en el periódico: de arriba abajo y de izquierda a derecha; dos que empiezan en la misma casilla
      // llevan el mismo número)
      const enOrden = [...c.colocadas].sort((x, y) => x.fila - y.fila || x.col - y.col || (x.dir === "h" ? -1 : 1));
      const numeros = new Map<string, number>();
      for (const x of enOrden) if (!numeros.has(`${x.fila},${x.col}`)) numeros.set(`${x.fila},${x.col}`, numeros.size + 1);
      const palabras = enOrden.map((x) => ({ ...x, n: numeros.get(`${x.fila},${x.col}`)! }));
      return [{ filas: c.filas, columnas: c.columnas, palabras }];
    }
    case "arma": {
      const trozos = trozosDe(v.texto);
      return trozos ? [{ trozos, orden: desordenado(trozos.length, semilla, `${clave}:arma`) }] : null;
    }
    case "memoria": {
      const cartas = (v.pares as [string, string][]).flatMap((_, k) => [{ par: k, lado: 0 }, { par: k, lado: 1 }]);
      return [{ cartas: mezclar(cartas.length, semilla, `${clave}:memoria`).map((i) => cartas[i]) }];
    }
    case "atrapa": {
      const g = grupoParaAtrapar(v);
      return g == null ? null : [{ grupo: g, frases: mezclar(v.frases.length, semilla, `${clave}:atrapa`) }];
    }
    case "adivina": {
      // (una sola palabra, al azar entre las que se pueden adivinar; las demás se muestran puestas en la frase)
      const buenas = adivinables(v.texto);
      return buenas.length ? [{ hueco: buenas[mezclar(buenas.length, semilla, `${clave}:adivina`)[0]] }] : null;
    }
    case "globos": {
      const items = globosDe(a, semilla, clave);
      return items ? [{ items }] : null;
    }
    default:
      return null;
  }
}

/** Arma una actividad para un intento: la versión, la forma de jugar y el orden mezclado de todo lo que se muestra. */
export function nuevoEstado(leccion: string, a: Actividad, version: number, semilla: number, formato?: Formato): EstadoItem {
  const v: any = a.versiones[version];
  const clave = `${leccion}:${a.id}:${version}`;
  const posibles = FORMATOS[a.pieza] as readonly Formato[];
  const f: Formato = formato && posibles.includes(formato) ? formato : posibles[0];
  const orden: Record<string, number[]> = {};
  let banco: string[] | undefined;
  switch (a.pieza) {
    case "completa": {
      const todas = [...huecosDe(v.texto), ...v.distractores];
      banco = mezclar(todas.length, semilla, `${clave}:banco`).map((i) => todas[i]);
      break;
    }
    case "relaciona":
      orden.derecha = mezclar(v.pares.length, semilla, `${clave}:derecha`);
      break;
    case "clasifica":
      orden.frases = mezclar(v.frases.length, semilla, `${clave}:frases`);
      break;
    case "ordena":
      orden.pasos = desordenado(v.pasos.length, semilla, `${clave}:pasos`);
      break;
    case "linea":
      orden.eventos = desordenado(v.eventos.length, semilla, `${clave}:eventos`);
      break;
    case "error":
      orden.frases = mezclar(v.frases.length, semilla, `${clave}:frases`);
      break;
    case "situacion":
      orden.opciones = mezclar(v.opciones.length, semilla, `${clave}:opciones`);
      break;
    case "mapa-ideas": {
      const todas = [...new Set<string>([...v.enlaces.map((x: any) => x.relacion), ...(v.distractores ?? [])])];
      banco = mezclar(todas.length, semilla, `${clave}:relaciones`).map((i) => todas[i]);
      break;
    }
    case "mapa":
      orden.lugares = mezclar(v.lugares.length, semilla, `${clave}:lugares`);
      break;
    case "escenario":
      for (const esc of (v as VersionEscenario).escenas) orden[`esc:${esc.id}`] = mezclar(esc.opciones.length, semilla, `${clave}:esc:${esc.id}`);
      break;
    case "caso":
      (v as VersionCaso).pasos.forEach((p, i) => {
        if (p.tipo === "situacion") orden[`paso:${i}`] = mezclar(p.opciones.length, semilla, `${clave}:paso:${i}`);
      });
      break;
    default:
      break;
  }
  const rondas = rondasDe(a, v, f, semilla, clave);
  // (si la sopa, el crucigrama o los trozos no se pudieron armar, la actividad va en su forma de siempre)
  if (!rondas && (f === "sopa" || f === "crucigrama" || f === "arma" || f === "atrapa" || f === "globos" || f === "adivina") && f !== posibles[0]) return nuevoEstado(leccion, a, version, semilla, posibles[0]);
  if (f === "adivina") {
    orden.dichas = [];
    orden.fallos = [0];
    orden.notas = [];
  }
  if (f === "memoria") {
    orden.descubiertas = [];
    orden.fallos = [0];
  }
  let total: number;
  switch (f) {
    case "relampago":
    case "elige-pareja":
    case "intruso":
    case "donde-va":
    case "cual-falsa":
      total = rondas?.length ?? 1;
      break;
    case "desliza":
      total = v.frases.length;
      break;
    case "escalones":
      total = Math.max(1, listaDe(a, v).textos.length - 1);
      break;
    case "anagrama":
      total = rondas?.length ?? 1;
      break;
    case "memoria":
      total = v.pares.length;
      break;
    case "globos":
      total = 1;
      break;
    default:
      total = pasosDe(a, version);
  }
  return {
    leccion,
    actividad: a.id,
    version,
    formato: f,
    orden,
    ...(banco ? { banco } : {}),
    ...(rondas ? { rondas } : {}),
    total,
    paso: 0,
    ...(a.pieza === "escenario" ? { escena: (v as VersionEscenario).escenas[0]?.id ?? null } : {}),
    puntajes: [],
    terminada: false,
    puntaje: null,
    pista: false,
  };
}

/** Las palabras de un pasaje y cuáles hay que tocar (las que estaban entre [[ ]]). */
export function palabrasDePasaje(texto: string): { palabras: string[]; marcadas: number[] } {
  const palabras: string[] = [];
  const marcadas: number[] = [];
  const partes = texto.split(/(\[\[[^\]]+\]\])/g);
  for (const parte of partes) {
    const marcada = parte.startsWith("[[") && parte.endsWith("]]");
    const limpio = marcada ? parte.slice(2, -2) : parte;
    for (const w of limpio.split(/\s+/).filter(Boolean)) {
      // la puntuación pegada a una marca («[[Verbo]],») queda con la palabra anterior
      if (!marcada && /^[,.;:!?»)]+$/.test(w) && palabras.length) {
        palabras[palabras.length - 1] += w;
        continue;
      }
      if (marcada) marcadas.push(palabras.length);
      palabras.push(w);
    }
  }
  return { palabras, marcadas };
}

/**
 * La pregunta de una consigna (hasta el primer signo de cierre): «¿Es ayuno bíblico o no? Lleva cada frase a su
 * recuadro.» da «¿Es ayuno bíblico o no?». Sirve a las formas que cambian la instrucción y conservan el criterio.
 */
export function preguntaDe(consigna: string | undefined): string | null {
  if (!consigna) return null;
  const k = consigna.indexOf("?");
  return k > 0 && consigna.includes("¿") ? consigna.slice(0, k + 1).trim() : null;
}

/** El texto de una completa partido en trozos y huecos. */
function partesDe(texto: string): (string | { hueco: number })[] {
  const partes: (string | { hueco: number })[] = [];
  let n = 0;
  for (const trozo of texto.split(/(\[\[[^\]]+\]\])/g)) {
    if (!trozo) continue;
    if (trozo.startsWith("[[") && trozo.endsWith("]]")) partes.push({ hueco: n++ });
    else partes.push(trozo);
  }
  return partes;
}

/** Lo que ve el alumno de la actividad en el paso en que va. */
export function vistaDe(a: Actividad, e: EstadoItem): ItemVista {
  const f = formatoDe(a, e);
  // la consigna de la actividad (dice el criterio) o, si no trae, cómo se juega la forma
  const consigna = (v: any) => (v.consigna as string | undefined) || COMO_SE_JUEGA[f] || CONSIGNA_PIEZA[a.pieza];
  const total = e.total ?? 1;
  const p = Math.min(e.paso, Math.max(0, total - 1));
  // ---------------- las formas por rondas (un intento de antes de las formas no trae rondas: va por las de siempre)
  switch (POR_RONDAS.has(f) && !e.rondas ? null : f) {
    case "relampago": {
      const v: any = versionDe(a, e);
      const r = e.rondas![p];
      return { pieza: "tarjetas", formato: "relampago", consigna: COMO_SE_JUEGA.relampago, pregunta: v.tarjetas[r.i].frente, opciones: r.opciones.map((k: number) => v.tarjetas[k].reverso), paso: p, pasos: total };
    }
    case "elige": {
      const v: any = versionDe(a, e);
      return { pieza: "completa", formato: "elige", consigna: consigna(v), partes: partesDe(v.texto), opciones: e.rondas!.map((r) => r.opciones) };
    }
    case "escribe": {
      const v: any = versionDe(a, e);
      const huecos = huecosDe(v.texto);
      return { pieza: "completa", formato: "escribe", consigna: consigna(v), partes: partesDe(v.texto), letras: huecos.map((h) => h.length), iniciales: huecos.map((h) => h.trim().charAt(0)) };
    }
    case "elige-pareja": {
      const v: any = versionDe(a, e);
      const r = e.rondas![p];
      return { pieza: "relaciona", formato: "elige-pareja", consigna: COMO_SE_JUEGA["elige-pareja"], idea: v.pares[r.i][0], opciones: r.opciones.map((k: number) => v.pares[k][1]), paso: p, pasos: total };
    }
    case "desliza": {
      const v: any = versionDe(a, e);
      const i = e.orden.frases[p];
      const pregunta = preguntaDe(v.consigna);
      return { pieza: "clasifica", formato: "desliza", consigna: pregunta ? `${pregunta} Lleva cada frase a su lado.` : COMO_SE_JUEGA.desliza, grupos: v.grupos, frase: v.frases[i].texto, paso: p, pasos: total };
    }
    case "intruso": {
      const v: any = versionDe(a, e);
      const r = e.rondas![p];
      const pregunta = preguntaDe(v.consigna);
      return { pieza: "clasifica", formato: "intruso", consigna: pregunta ? `${pregunta} ${COMO_SE_JUEGA.intruso}` : COMO_SE_JUEGA.intruso, frases: r.frases.map((k: number) => v.frases[k].texto), paso: p, pasos: total };
    }
    case "escalones": {
      const v: any = versionDe(a, e);
      const l = listaDe(a, v).textos;
      const colocados = l.slice(0, p);
      const opciones = ordenDeLista(a, e)
        .filter((k) => k >= p)
        .map((k) => l[k]);
      return { pieza: a.pieza === "linea" ? "linea" : "ordena", formato: "escalones", consigna: v.consigna || COMO_SE_JUEGA.escalones, colocados, opciones, paso: p, pasos: total };
    }
    case "donde-va": {
      const v: any = versionDe(a, e);
      const r = e.rondas![p];
      const l = listaDe(a, v).textos;
      const consigna = a.pieza === "linea" ? "Un hecho se salió de la línea del tiempo. Toca el lugar donde va." : COMO_SE_JUEGA["donde-va"];
      return { pieza: a.pieza === "linea" ? "linea" : "ordena", formato: "donde-va", consigna, suelto: l[r.hueco], lista: l.filter((_, k) => k !== r.hueco), paso: p, pasos: total };
    }
    case "cual-falsa": {
      const r = e.rondas![p];
      const afirm = (x: { v: number; i: number }) => (a.versiones[x.v] as any).afirmaciones[x.i].texto as string;
      return {
        pieza: "verdad",
        formato: "cual-falsa",
        consigna: r.busca === "falsa" ? "Toca la frase que NO es verdad." : "Dos de estas frases son errores. Toca la que SÍ es verdad.",
        busca: r.busca,
        afirmaciones: r.items.map(afirm),
        paso: p,
        pasos: total,
      };
    }
    case "anagrama": {
      const v: any = versionDe(a, e);
      return { pieza: "completa", formato: "anagrama", consigna: consigna(v), partes: partesDe(v.texto), hueco: p, hechas: huecosDe(v.texto).slice(0, p), letras: e.rondas![p].letras, paso: p, pasos: total };
    }
    case "sopa": {
      const v: any = versionDe(a, e);
      return { pieza: "completa", formato: "sopa", consigna: consigna(v), partes: partesDe(v.texto), filas: e.rondas![0].filas, buscar: huecosDe(v.texto).length };
    }
    case "crucigrama": {
      const v: any = versionDe(a, e);
      const c = e.rondas![0];
      const hs = huecosDe(v.texto);
      return {
        pieza: "completa",
        formato: "crucigrama",
        consigna: consigna(v),
        partes: partesDe(v.texto),
        filas: c.filas,
        columnas: c.columnas,
        palabras: c.palabras.map((x: any) => ({ n: x.n, hueco: x.i, fila: x.fila, col: x.col, dir: x.dir, largo: enLetras(hs[x.i]).length })),
      };
    }
    case "arma": {
      const r = e.rondas![0];
      return { pieza: "completa", formato: "arma", consigna: COMO_SE_JUEGA.arma, trozos: (r.orden as number[]).map((i) => r.trozos[i]) };
    }
    case "memoria": {
      const v: any = versionDe(a, e);
      const r = e.rondas![0];
      return {
        pieza: "relaciona",
        formato: "memoria",
        consigna: COMO_SE_JUEGA.memoria,
        cartas: (r.cartas as { par: number; lado: number }[]).map((x) => v.pares[x.par][x.lado] as string),
        descubiertas: e.orden.descubiertas ?? [],
        fallos: e.orden.fallos?.[0] ?? 0,
        paso: e.paso,
        pasos: total,
      };
    }
    case "atrapa": {
      const v: any = versionDe(a, e);
      const r = e.rondas![0];
      return { pieza: "clasifica", formato: "atrapa", consigna: COMO_SE_JUEGA.atrapa, pregunta: preguntaDe(v.consigna), grupo: v.grupos[r.grupo], frases: (r.frases as number[]).map((i) => v.frases[i].texto) };
    }
    case "adivina": {
      const v: any = versionDe(a, e);
      const hs = huecosDe(v.texto);
      const k = e.rondas![0].hueco as number;
      const dichas = (e.orden.dichas ?? []).map((x) => String.fromCodePoint(x));
      return {
        pieza: "completa",
        formato: "adivina",
        consigna: consigna(v),
        // (las otras palabras que faltan van puestas: se adivina una sola)
        partes: partesDe(v.texto).map((x) => (typeof x === "string" || x.hueco === k ? x : hs[x.hueco])),
        hueco: k,
        patron: [...hs[k].trim()].map((ch) => (dichas.includes(enLetras(ch)) ? ch : null)),
        dichas,
        fallos: e.orden.fallos?.[0] ?? 0,
        gotas: GOTAS_LAMPARA,
      };
    }
    case "globos": {
      const r = e.rondas![0];
      return { pieza: "verdad", formato: "globos", consigna: COMO_SE_JUEGA.globos, frases: (r.items as { v: number; i: number }[]).map((x) => (a.versiones[x.v] as any).afirmaciones[x.i].texto as string) };
    }
    default:
      break;
  }
  // ---------------- las formas de siempre
  switch (a.pieza) {
    case "tarjetas": {
      // (un intento de antes de las formas: se juega como relámpago con la primera tarjeta)
      const v = versionDe(a, e);
      return { pieza: "tarjetas", formato: "relampago", consigna: COMO_SE_JUEGA.relampago, pregunta: v.tarjetas[0].frente, opciones: [v.tarjetas[0].reverso], paso: 0, pasos: 1 };
    }
    case "completa": {
      const v = versionDe(a, e);
      return { pieza: "completa", formato: "banco", consigna: consigna(v), partes: partesDe(v.texto), banco: e.banco ?? [] };
    }
    case "relaciona": {
      const v = versionDe(a, e);
      return { pieza: "relaciona", formato: "parejas", consigna: consigna(v), izquierda: v.pares.map((x) => x[0]), derecha: e.orden.derecha.map((i) => v.pares[i][1]) };
    }
    case "clasifica": {
      const v = versionDe(a, e);
      return { pieza: "clasifica", formato: "recuadros", consigna: consigna(v), grupos: v.grupos, frases: e.orden.frases.map((i) => v.frases[i].texto) };
    }
    case "ordena": {
      const v = versionDe(a, e);
      return { pieza: "ordena", formato: "lista", consigna: v.consigna, pasos: e.orden.pasos.map((i) => v.pasos[i]) };
    }
    case "verdad": {
      const v = versionDe(a, e);
      const k = Math.min(e.paso, v.afirmaciones.length - 1);
      return { pieza: "verdad", formato: "verdad-o-error", consigna: consigna(v), afirmacion: v.afirmaciones[k].texto, paso: k, pasos: v.afirmaciones.length };
    }
    case "error": {
      const v = versionDe(a, e);
      return { pieza: "error", formato: f === "detective" ? "detective" : "frases", consigna: consigna(v), frases: e.orden.frases.map((i) => v.frases[i]) };
    }
    case "situacion": {
      const v = versionDe(a, e);
      return { pieza: "situacion", formato: f === "chat" ? "chat" : "opciones", consigna: COMO_SE_JUEGA[f === "chat" ? "chat" : "opciones"], caso: v.caso, pregunta: v.pregunta, opciones: e.orden.opciones.map((i) => v.opciones[i].texto) };
    }
    case "explica": {
      const v = versionDe(a, e);
      const { min, max } = ESCRITA.corta;
      return { pieza: "explica", formato: "texto", consigna: CONSIGNA_PIEZA.explica, pregunta: v.clave.pregunta, min, max };
    }
    case "linea": {
      const v = versionDe(a, e);
      return { pieza: "linea", formato: "lista", consigna: v.consigna, eventos: e.orden.eventos.map((i) => v.eventos[i].texto) };
    }
    case "mapa-ideas": {
      const v = versionDe(a, e);
      return {
        pieza: "mapa-ideas",
        formato: "normal",
        consigna: consigna(v),
        nodos: v.nodos.map((n) => ({ id: n.id, texto: n.texto, x: n.x, y: n.y })),
        enlaces: v.enlaces.map((x) => ({ de: x.de, a: x.a })),
        relaciones: e.banco ?? [],
      };
    }
    case "mapa": {
      const v = versionDe(a, e);
      const k = Math.min(e.paso, v.lugares.length - 1);
      return { pieza: "mapa", formato: "normal", consigna: consigna(v), imagen: v.imagen, alt: v.alt, lugar: v.lugares[e.orden.lugares[k]].nombre, paso: k, pasos: v.lugares.length };
    }
    case "pasaje": {
      const v = versionDe(a, e);
      const { palabras, marcadas } = palabrasDePasaje(v.texto);
      return { pieza: "pasaje", formato: "normal", consigna: v.consigna, ref: v.ref, palabras, cuantas: marcadas.length };
    }
    case "escenario": {
      const v = versionDe(a, e);
      const esc = v.escenas.find((x) => x.id === e.escena) ?? v.escenas[v.escenas.length - 1];
      return {
        pieza: "escenario",
        formato: "normal",
        consigna: CONSIGNA_PIEZA.escenario,
        situacion: v.situacion,
        escena: { id: esc.id, narra: esc.narra, pregunta: esc.pregunta, opciones: e.orden[`esc:${esc.id}`].map((i) => esc.opciones[i].texto) },
        paso: e.paso,
      };
    }
    case "caso": {
      const v = versionDe(a, e);
      const k = Math.min(e.paso, v.pasos.length - 1);
      const paso = v.pasos[k];
      const { min, max } = ESCRITA.corta;
      return {
        pieza: "caso",
        formato: "normal",
        consigna: CONSIGNA_PIEZA.caso,
        titulo: v.titulo,
        relato: v.relato,
        actual: paso.tipo === "situacion" ? { tipo: "situacion", pregunta: paso.pregunta, opciones: e.orden[`paso:${k}`].map((i) => paso.opciones[i].texto) } : { tipo: "explica", pregunta: paso.clave.pregunta, min, max },
        paso: k,
        pasos: v.pasos.length,
      };
    }
  }
}

/** La frase de la lección para la pista (en las formas por pasos, la del paso en que va, sin dar la respuesta). */
export function pistaDe(a: Actividad, e: EstadoItem): string {
  const v: any = versionDe(a, e);
  const f = formatoDe(a, e);
  if (f === "relampago" && e.rondas) return v.tarjetas[e.rondas![Math.min(e.paso, e.rondas!.length - 1)].i]?.apoyo ?? "";
  if (f === "cual-falsa" && e.rondas) {
    // la de una de las frases que no son la buscada (la de la buscada la delataría)
    const r = e.rondas![Math.min(e.paso, e.rondas!.length - 1)];
    const otra = r.items.find((_: unknown, k: number) => k !== r.correcta);
    return (a.versiones[otra.v] as any).afirmaciones[otra.i].apoyo ?? "";
  }
  if (f === "globos" && e.rondas) {
    // (la de una afirmación que no sube: la de una que sube la delataría)
    const suben = new Set((e.rondas[0].items as { v: number; i: number }[]).map((x) => `${x.v}:${x.i}`));
    const otra = afirmacionesDe(a).find((x) => !suben.has(`${x.v}:${x.i}`));
    return otra ? ((a.versiones[otra.v] as any).afirmaciones[otra.i].apoyo ?? "") : "";
  }
  if (a.pieza === "verdad") return v.afirmaciones[Math.min(e.paso, v.afirmaciones.length - 1)].apoyo;
  return v.apoyo ?? "";
}

const igual = (a: string, b: string) => normalizar(a) === normalizar(b);

/** Escrito a mano: lo mismo sin tildes ni mayúsculas, con una letra de diferencia desde 5 letras y dos desde 9. */
export function escritoIgual(dado: string, bueno: string): boolean {
  const x = normalizar(dado).trim();
  const y = normalizar(bueno).trim();
  if (!x) return false;
  if (x === y) return true;
  const tope = y.length >= 9 ? 2 : y.length >= 5 ? 1 : 0;
  return tope > 0 && distancia(x, y, tope) <= tope;
}

/** De 0 a 1: qué tanto de un orden quedó bien (los pares que quedaron en el orden correcto). */
export function puntajeDeOrden(orden: number[]): number {
  const n = orden.length;
  if (n < 2) return 1;
  let bien = 0;
  let total = 0;
  for (let i = 0; i < n; i++)
    for (let j = i + 1; j < n; j++) {
      total++;
      if (orden[i] < orden[j]) bien++;
    }
  return bien / total;
}

const entero = (x: unknown, max: number) => (Number.isInteger(x) && (x as number) >= 0 && (x as number) < max ? (x as number) : -1);

type Calificado = {
  puntaje: number;
  correccion: Correccion;
  explica: string;
  apoyo: string;
  ref: string | null;
  /** (la memoria) el paso que sigue, el orden nuevo, la nota final y si termina */
  pasoNuevo?: number;
  ordenNuevo?: Record<string, number[]>;
  puntajeFinal?: number;
  terminar?: boolean;
};

/** La corrección de una completa (banco, elige o escribe): cada hueco y la equivocación típica, si la hay. */
function corregirCompleta(v: any, dadas: string[], escrita: boolean): Calificado {
  const buenas = huecosDe(v.texto);
  const marcas = buenas.map((b, i) => typeof dadas[i] === "string" && (escrita ? escritoIgual(dadas[i], b) : igual(dadas[i], b)));
  const malo = dadas.find((d, i) => !marcas[i] && typeof d === "string" && Object.keys(v.errores ?? {}).some((k) => igual(k, d)));
  const error = malo ? Object.entries(v.errores as Record<string, string>).find(([k]) => igual(k, malo))?.[1] ?? null : null;
  return { puntaje: marcas.filter(Boolean).length / buenas.length, correccion: { pieza: "completa", correctas: buenas, marcas, error }, explica: v.explica, apoyo: v.apoyo, ref: v.ref ?? null };
}

/**
 * Califica la respuesta del paso en que va la actividad. Devuelve la devolución y el estado nuevo (el estado que se
 * recibe no se cambia). Si la respuesta no corresponde a la pieza, lanza un error.
 */
export function contestar(a: Actividad, e: EstadoItem, r: RespuestaPractica): { devolucion: Devolucion; estado: EstadoItem } {
  if (e.terminada) throw new Error("Esa actividad ya terminó.");
  if (r.pieza !== a.pieza) throw new Error("La respuesta no corresponde a la actividad.");
  const v: any = versionDe(a, e);
  const f = formatoDe(a, e);
  const total = e.total ?? pasosDe(a, e.version);
  const ultimo = e.paso + 1 >= total;
  const res = r as any;
  let c: Calificado | null = null;
  let siguienteEscena: string | null | undefined;
  // ---------------- las formas por rondas (un intento de antes de las formas no trae rondas: va por las de siempre)
  switch (POR_RONDAS.has(f) && !e.rondas ? null : f) {
    case "relampago": {
      const ronda = e.rondas![e.paso];
      const k = entero(res.opcion, ronda.opciones.length);
      const bien = k >= 0 && ronda.opciones[k] === ronda.i;
      const t = v.tarjetas[ronda.i];
      c = { puntaje: bien ? 1 : 0, correccion: { pieza: "tarjetas", correcta: ronda.opciones.indexOf(ronda.i) }, explica: bien ? "" : `La respuesta es: ${t.reverso}`, apoyo: t.apoyo, ref: null };
      break;
    }
    case "elige":
    case "escribe":
      c = corregirCompleta(v, (res.huecos ?? []) as string[], f === "escribe");
      break;
    case "elige-pareja": {
      const ronda = e.rondas![e.paso];
      const k = entero(res.opcion, ronda.opciones.length);
      const bien = k >= 0 && ronda.opciones[k] === ronda.i;
      const par = v.pares[ronda.i];
      c = {
        puntaje: bien ? 1 : 0,
        correccion: { pieza: "relaciona", formato: "elige-pareja", correcta: ronda.opciones.indexOf(ronda.i) },
        explica: [bien ? "" : `${par[0]} va con: ${par[1]}.`, ultimo ? v.explica : ""].filter(Boolean).join(" "),
        apoyo: v.apoyo,
        ref: v.ref ?? null,
      };
      break;
    }
    case "desliza": {
      const frase = v.frases[e.orden.frases[e.paso]];
      const bien = res.grupo === frase.grupo;
      c = {
        puntaje: bien ? 1 : 0,
        correccion: { pieza: "clasifica", formato: "desliza", grupo: frase.grupo, explica: frase.explica ?? null },
        explica: [bien ? "" : `Va en: ${v.grupos[frase.grupo]}.`, frase.explica ?? "", ultimo ? v.explica : ""].filter(Boolean).join(" "),
        apoyo: v.apoyo,
        ref: v.ref ?? null,
      };
      break;
    }
    case "intruso": {
      const ronda = e.rondas![e.paso];
      const k = entero(res.frase, ronda.frases.length);
      const bien = k >= 0 && ronda.frases[k] === ronda.intruso;
      const grupoDe = v.grupos[v.frases[ronda.intruso].grupo];
      const otras = ronda.frases.find((x: number) => x !== ronda.intruso);
      const grupoDeLasOtras = v.grupos[v.frases[otras].grupo];
      c = {
        puntaje: bien ? 1 : 0,
        correccion: { pieza: "clasifica", formato: "intruso", intruso: ronda.frases.indexOf(ronda.intruso), grupoDe, grupoDeLasOtras },
        explica: [`No va: ${v.frases[ronda.intruso].texto}. Su grupo es: ${grupoDe}. Las otras van en: ${grupoDeLasOtras}.`, ultimo ? v.explica : ""].filter(Boolean).join(" "),
        apoyo: v.apoyo,
        ref: v.ref ?? null,
      };
      break;
    }
    case "escalones": {
      const l = listaDe(a, v);
      const opciones = ordenDeLista(a, e).filter((k) => k >= e.paso);
      const k = entero(res.opcion, opciones.length);
      const bien = k >= 0 && opciones[k] === e.paso;
      c = {
        puntaje: bien ? 1 : 0,
        correccion: { pieza: a.pieza === "linea" ? "linea" : "ordena", formato: "escalones", correcta: opciones.indexOf(e.paso) },
        explica: [bien ? (l.fechas[e.paso] ? `Así es: ${conFecha(l, e.paso)}.` : "") : `En el escalón ${e.paso + 1} va: ${conFecha(l, e.paso)}.`, ultimo ? v.explica : ""].filter(Boolean).join(" "),
        apoyo: v.apoyo,
        ref: v.ref ?? null,
      };
      break;
    }
    case "donde-va": {
      // (los lugares van del 0, antes del primero, al último, después del último)
      const ronda = e.rondas![e.paso];
      const l = listaDe(a, v);
      const k = entero(res.opcion, l.textos.length);
      const bien = k === ronda.hueco;
      const donde = ronda.hueco === 0 ? "al comienzo" : `después de: ${conFecha(l, ronda.hueco - 1)}`;
      c = {
        puntaje: bien ? 1 : 0,
        correccion: { pieza: a.pieza === "linea" ? "linea" : "ordena", formato: "donde-va", correcta: ronda.hueco },
        explica: [bien ? (l.fechas[ronda.hueco] ? `Así es: ${conFecha(l, ronda.hueco)}.` : "") : `Va en el lugar ${ronda.hueco + 1}, ${donde}.`, ultimo ? v.explica : ""].filter(Boolean).join(" "),
        apoyo: v.apoyo,
        ref: v.ref ?? null,
      };
      break;
    }
    case "cual-falsa": {
      const ronda = e.rondas![e.paso];
      const k = entero(res.frase, ronda.items.length);
      const bien = k === ronda.correcta;
      const x = (a.versiones[ronda.items[ronda.correcta].v] as any).afirmaciones[ronda.items[ronda.correcta].i];
      c = { puntaje: bien ? 1 : 0, correccion: { pieza: "verdad", formato: "cual-falsa", correcta: ronda.correcta }, explica: x.explica, apoyo: x.apoyo, ref: x.ref ?? null };
      break;
    }
    case "anagrama": {
      const h = huecosDe(v.texto)[e.paso];
      const dado = String((res.huecos ?? [])[0] ?? "");
      const bien = normalizar(dado.replace(/\s+/g, "")) === normalizar(h.replace(/\s+/g, ""));
      c = {
        puntaje: bien ? 1 : 0,
        correccion: { pieza: "completa", formato: "anagrama", correcta: h, bien },
        explica: [bien ? "" : `Era: ${h}.`, ultimo ? v.explica : ""].filter(Boolean).join(" "),
        apoyo: v.apoyo,
        ref: v.ref ?? null,
      };
      break;
    }
    case "sopa": {
      const s = e.rondas![0];
      const respuestas = (s.colocadas as { texto: string; trazo: number[]; respuesta: boolean }[]).filter((x) => x.respuesta);
      const buscar = huecosDe(v.texto).length;
      const trazos = (Array.isArray(res.trazos) ? res.trazos : []).slice(0, buscar + 2);
      const halladas = new Set<string>();
      const elegidas = trazos.map((t: unknown) => {
        const letras = letrasDelTrazo(s.filas, t) ?? "";
        const reves = [...letras].reverse().join("");
        const r = respuestas.find((x) => !halladas.has(x.texto) && (enLetras(x.texto) === letras || enLetras(x.texto) === reves));
        if (r) halladas.add(r.texto);
        return { texto: r?.texto ?? letras, trazo: Array.isArray(t) ? (t as number[]).slice(0, 4) : [], bien: !!r };
      });
      const faltan = respuestas.filter((x) => !halladas.has(x.texto)).map((x) => ({ texto: x.texto, trazo: x.trazo }));
      c = {
        puntaje: halladas.size / buscar,
        correccion: { pieza: "completa", formato: "sopa", elegidas, faltan, palabras: huecosDe(v.texto) },
        explica: [faltan.length ? `Faltó: ${faltan.map((x) => x.texto).join(", ")}.` : "", v.explica].filter(Boolean).join(" "),
        apoyo: v.apoyo,
        ref: v.ref ?? null,
      };
      break;
    }
    case "crucigrama": {
      const cr = e.rondas![0];
      const hs = huecosDe(v.texto);
      const dadas = (res.huecos ?? []) as string[];
      const correctas = (cr.palabras as { i: number }[]).map((x) => hs[x.i]);
      const marcas = correctas.map((b, j) => typeof dadas[j] === "string" && enLetras(dadas[j]) === enLetras(b));
      c = { puntaje: marcas.filter(Boolean).length / correctas.length, correccion: { pieza: "completa", correctas, marcas, error: null }, explica: v.explica, apoyo: v.apoyo, ref: v.ref ?? null };
      break;
    }
    case "arma": {
      const r = e.rondas![0];
      const n = r.trozos.length;
      const dado = (Array.isArray(res.orden) ? res.orden : []) as number[];
      const valido = dado.length === n && new Set(dado).size === n && dado.every((d) => Number.isInteger(d) && d >= 0 && d < n);
      // (el orden elegido, en los trozos de verdad: cuántos pares quedaron en su orden)
      const elegido = valido ? dado.map((d) => (r.orden as number[])[d]) : [];
      const correcto = Array.from({ length: n }, (_, i) => (r.orden as number[]).indexOf(i));
      c = {
        puntaje: valido ? puntajeDeOrden(elegido) : 0,
        correccion: { pieza: "completa", formato: "arma", correcto, texto: (r.trozos as string[]).join(" ") },
        explica: v.explica,
        apoyo: v.apoyo,
        ref: v.ref ?? null,
      };
      break;
    }
    case "memoria": {
      const r = e.rondas![0];
      const cartas = r.cartas as { par: number; lado: number }[];
      const descubiertas = [...(e.orden.descubiertas ?? [])];
      const fallos = e.orden.fallos?.[0] ?? 0;
      const [i, j] = (Array.isArray(res.cartas) ? res.cartas : []).map((x: unknown) => entero(x, cartas.length));
      const validas = i >= 0 && j >= 0 && i !== j && !descubiertas.includes(i) && !descubiertas.includes(j);
      const par = validas && cartas[i].par === cartas[j].par;
      if (par) descubiertas.push(i, j);
      const pares = v.pares.length;
      const termina = descubiertas.length >= cartas.length;
      const nuevosFallos = par ? fallos : fallos + 1;
      const parDe = par ? v.pares[cartas[i].par] : null;
      c = {
        puntaje: par ? 1 : 0,
        correccion: { pieza: "relaciona", formato: "memoria", cartas: validas ? [i, j] : [], par },
        explica: [parDe ? `${parDe[0]} va con: ${parDe[1]}.` : "No van juntas.", termina ? v.explica : ""].filter(Boolean).join(" "),
        apoyo: v.apoyo,
        ref: v.ref ?? null,
        pasoNuevo: par ? e.paso + 1 : e.paso,
        ordenNuevo: { ...e.orden, descubiertas, fallos: [nuevosFallos] },
        terminar: termina,
        puntajeFinal: notaMemoria(pares, nuevosFallos),
      };
      break;
    }
    case "atrapa": {
      const r = e.rondas![0];
      const frases = r.frases as number[];
      const atrapadas = [...new Set(((Array.isArray(res.atrapadas) ? res.atrapadas : []) as unknown[]).map((x) => entero(x, frases.length)).filter((x) => x >= 0))];
      const deGrupo = frases.map((k) => v.frases[k].grupo === r.grupo);
      const bien = deGrupo.filter((g, d) => g === atrapadas.includes(d)).length;
      const del = frases.filter((k) => v.frases[k].grupo === r.grupo).map((k) => v.frases[k].texto);
      c = {
        puntaje: bien / frases.length,
        correccion: { pieza: "clasifica", formato: "atrapa", deGrupo, atrapadas },
        explica: [bien < frases.length ? `Las del grupo ${v.grupos[r.grupo]} eran: ${del.map((x: string) => x.replace(/[.]+$/, "")).join("; ")}.` : "", v.explica].filter(Boolean).join(" "),
        apoyo: v.apoyo,
        ref: v.ref ?? null,
      };
      break;
    }
    case "adivina": {
      // (cada letra es un paso; termina con la palabra resuelta o con la lámpara apagada)
      const palabra = huecosDe(v.texto)[e.rondas![0].hueco as number].trim();
      const letra = enLetras(String(res.letra ?? "")).slice(0, 1);
      const dichas = [...(e.orden.dichas ?? [])];
      const notas = [...(e.orden.notas ?? [])];
      const nueva = !!letra && !dichas.includes(letra.codePointAt(0)!);
      const acierto = nueva && letrasDeAdivinar(palabra).has(letra);
      if (nueva) dichas.push(letra.codePointAt(0)!);
      const fallos = (e.orden.fallos?.[0] ?? 0) + (nueva && !acierto ? 1 : 0);
      const dichasTexto = new Set(dichas.map((x) => String.fromCodePoint(x)));
      const resuelta = [...letrasDeAdivinar(palabra)].every((x) => dichasTexto.has(x));
      const termina = resuelta || fallos >= GOTAS_LAMPARA;
      if (termina) notas.push(Math.round(notaAdivina(resuelta ? fallos : GOTAS_LAMPARA) * 100));
      const pasoNuevo = termina ? e.paso + 1 : e.paso;
      const fin = pasoNuevo >= total;
      c = {
        puntaje: acierto ? 1 : 0,
        correccion: { pieza: "completa", formato: "adivina", letra, acierto, palabra: termina ? palabra : null, resuelta: termina ? resuelta : null },
        explica: termina ? [resuelta ? "" : `Se apagó la lámpara. Era: ${palabra}.`, fin ? v.explica : ""].filter(Boolean).join(" ") : "",
        apoyo: termina ? v.apoyo : "",
        ref: termina ? (v.ref ?? null) : null,
        pasoNuevo,
        ordenNuevo: { ...e.orden, dichas: termina ? [] : dichas, fallos: [termina ? 0 : fallos], notas },
        terminar: fin,
        puntajeFinal: notas.reduce((x, y) => x + y, 0) / Math.max(1, notas.length) / 100,
      };
      break;
    }
    case "globos": {
      const items = e.rondas![0].items as { v: number; i: number }[];
      const afirm = (x: { v: number; i: number }) => (a.versiones[x.v] as any).afirmaciones[x.i];
      const reventadas = [...new Set(((Array.isArray(res.reventadas) ? res.reventadas : []) as unknown[]).map((x) => entero(x, items.length)).filter((x) => x >= 0))];
      const verdaderas = items.map((x) => !!afirm(x).verdad);
      const bien = verdaderas.filter((ver, d) => ver === reventadas.includes(d)).length;
      const primeraMal = verdaderas.findIndex((ver, d) => ver !== reventadas.includes(d));
      const base = afirm(items[primeraMal >= 0 ? primeraMal : 0]);
      c = {
        puntaje: bien / items.length,
        correccion: { pieza: "verdad", formato: "globos", verdaderas, reventadas, explicas: items.map((x) => afirm(x).explica as string) },
        // (cada afirmación sin su punto final: «Eran verdad: una; otra.»)
        explica: bien < items.length ? `Eran verdad: ${items.filter((_, d) => verdaderas[d]).map((x) => String(afirm(x).texto).replace(/[.。]+$/, "")).join("; ")}.` : "",
        apoyo: base.apoyo,
        ref: base.ref ?? null,
      };
      break;
    }
    default:
      break;
  }
  // ---------------- las formas de siempre
  if (!c) {
    switch (a.pieza) {
      case "tarjetas":
        c = { puntaje: 1, correccion: { pieza: "tarjetas", correcta: 0 }, explica: "", apoyo: v.tarjetas[0]?.apoyo ?? "", ref: null };
        break;
      case "completa":
        c = corregirCompleta(v, (res.huecos ?? []) as string[], false);
        break;
      case "relaciona": {
        const n = v.pares.length;
        const dadas = (res.pares ?? []) as number[];
        const marcas = Array.from({ length: n }, (_, i) => e.orden.derecha[entero(dadas[i], n)] === i);
        const correctas = Array.from({ length: n }, (_, i) => e.orden.derecha.indexOf(i));
        c = { puntaje: marcas.filter(Boolean).length / n, correccion: { pieza: "relaciona", correctas, marcas }, explica: v.explica, apoyo: v.apoyo, ref: v.ref ?? null };
        break;
      }
      case "clasifica": {
        const dadas = (res.grupos ?? []) as number[];
        const correctas = e.orden.frases.map((i) => v.frases[i].grupo as number);
        const marcas = correctas.map((g, k) => dadas[k] === g);
        const explicas = e.orden.frases.map((i) => (v.frases[i].explica as string | undefined) ?? null);
        c = { puntaje: marcas.filter(Boolean).length / correctas.length, correccion: { pieza: "clasifica", correctas, marcas, explicas }, explica: v.explica, apoyo: v.apoyo, ref: v.ref ?? null };
        break;
      }
      case "ordena":
      case "linea": {
        const clave = a.pieza === "ordena" ? "pasos" : "eventos";
        const perm = e.orden[clave];
        const n = perm.length;
        const dadas = (res.orden ?? []) as number[];
        const valida = dadas.length === n && new Set(dadas).size === n && dadas.every((x) => entero(x, n) >= 0);
        const originales = valida ? dadas.map((j) => perm[j]) : [];
        const puntaje = valida ? puntajeDeOrden(originales) : 0;
        const correcto = Array.from({ length: n }, (_, i) => perm.indexOf(i));
        const correccion: Correccion =
          a.pieza === "ordena" ? { pieza: "ordena", correcto } : { pieza: "linea", correcto, fechas: perm.map((i) => v.eventos[i].fecha as string) };
        c = { puntaje, correccion, explica: v.explica, apoyo: v.apoyo, ref: v.ref ?? null };
        break;
      }
      case "verdad": {
        const af = v.afirmaciones[e.paso];
        const bien = res.verdad === af.verdad;
        c = { puntaje: bien ? 1 : 0, correccion: { pieza: "verdad", verdad: af.verdad }, explica: af.explica, apoyo: af.apoyo, ref: af.ref ?? null };
        break;
      }
      case "error": {
        const k = entero(res.frase, v.frases.length);
        const bien = k >= 0 && e.orden.frases[k] === v.malo;
        c = { puntaje: bien ? 1 : 0, correccion: { pieza: "error", malo: e.orden.frases.indexOf(v.malo), correccion: v.correccion }, explica: v.explica, apoyo: v.apoyo, ref: v.ref ?? null };
        break;
      }
      case "situacion": {
        const k = entero(res.opcion, v.opciones.length);
        const buena = v.opciones.findIndex((o: any) => o.bien);
        const bien = k >= 0 && e.orden.opciones[k] === buena;
        c = {
          puntaje: bien ? 1 : 0,
          correccion: { pieza: "situacion", correcta: e.orden.opciones.indexOf(buena), explicas: e.orden.opciones.map((i) => v.opciones[i].explica as string) },
          explica: v.explica,
          apoyo: v.apoyo,
          ref: v.ref ?? null,
        };
        break;
      }
      case "explica": {
        const texto = String(res.texto ?? "").slice(0, 2000);
        const corr = corregirEscrita(v.clave, texto);
        c = {
          puntaje: corr.nota / 100,
          correccion: { pieza: "explica", nota: corr.nota, ideas: corr.ideas, avisos: corr.avisos, modelo: v.clave.modelo },
          explica: "",
          apoyo: v.apoyo,
          ref: v.ref ?? null,
        };
        break;
      }
      case "mapa-ideas": {
        const banco = e.banco ?? [];
        const dadas = (res.relaciones ?? []) as number[];
        const marcas = v.enlaces.map((x: any, i: number) => banco[entero(dadas[i], banco.length)] === x.relacion);
        const correctas = v.enlaces.map((x: any) => banco.indexOf(x.relacion));
        c = { puntaje: marcas.filter(Boolean).length / v.enlaces.length, correccion: { pieza: "mapa-ideas", correctas, marcas }, explica: v.explica, apoyo: v.apoyo, ref: v.ref ?? null };
        break;
      }
      case "mapa": {
        const lugar = v.lugares[e.orden.lugares[e.paso]];
        const x = Number(res.x);
        const y = Number(res.y);
        const radio = lugar.radio ?? 8;
        const bien = Number.isFinite(x) && Number.isFinite(y) && Math.hypot(x - lugar.x, y - lugar.y) <= radio;
        c = { puntaje: bien ? 1 : 0, correccion: { pieza: "mapa", x: lugar.x, y: lugar.y, bien }, explica: lugar.explica ?? v.explica, apoyo: v.apoyo, ref: v.ref ?? null };
        break;
      }
      case "pasaje": {
        const { palabras, marcadas } = palabrasDePasaje(v.texto);
        const dadas = new Set(((res.palabras ?? []) as number[]).filter((k) => entero(k, palabras.length) >= 0));
        const buenas = new Set(marcadas);
        const tp = [...dadas].filter((k) => buenas.has(k)).length;
        const fp = dadas.size - tp;
        const fn = buenas.size - tp;
        c = { puntaje: tp + fp + fn ? (2 * tp) / (2 * tp + fp + fn) : 1, correccion: { pieza: "pasaje", correctas: marcadas }, explica: v.explica, apoyo: v.apoyo, ref: v.ref ?? null };
        break;
      }
      case "escenario": {
        const ver = v as VersionEscenario;
        const idx = ver.escenas.findIndex((x) => x.id === e.escena);
        const esc = ver.escenas[idx];
        if (!esc) throw new Error("Ese escenario ya terminó.");
        const perm = e.orden[`esc:${esc.id}`];
        const k = entero(res.opcion, esc.opciones.length);
        const op = k >= 0 ? esc.opciones[perm[k]] : null;
        const valor = (op?.valor ?? 0) as 0 | 1 | 2;
        const mejor = perm.findIndex((i) => esc.opciones[i].valor === 2);
        siguienteEscena = op?.siguiente === FIN_ESCENARIO ? null : op?.siguiente ? op.siguiente : ver.escenas[idx + 1]?.id ?? null;
        c = {
          puntaje: valor / 2,
          correccion: { pieza: "escenario", valor, mejor, explicas: perm.map((i) => esc.opciones[i].explica) },
          explica: op?.explica ?? "",
          apoyo: ver.apoyo,
          ref: ver.ref ?? null,
        };
        break;
      }
      case "caso": {
        const ver = v as VersionCaso;
        const paso = ver.pasos[e.paso];
        if (paso.tipo === "situacion") {
          const perm = e.orden[`paso:${e.paso}`];
          const k = entero(res.opcion, paso.opciones.length);
          const buena = paso.opciones.findIndex((o) => o.bien);
          const bien = k >= 0 && perm[k] === buena;
          c = {
            puntaje: bien ? 1 : 0,
            correccion: { pieza: "caso", correcta: perm.indexOf(buena), explicas: perm.map((i) => paso.opciones[i].explica) },
            explica: paso.explica,
            apoyo: paso.apoyo || ver.apoyo,
            ref: paso.ref ?? ver.ref ?? null,
          };
        } else {
          const corr = corregirEscrita(paso.clave, String(res.texto ?? "").slice(0, 2000));
          c = {
            puntaje: corr.nota / 100,
            correccion: { pieza: "caso", nota: corr.nota, ideas: corr.ideas, modelo: paso.clave.modelo },
            explica: "",
            apoyo: paso.apoyo || ver.apoyo,
            ref: paso.ref ?? ver.ref ?? null,
          };
        }
        break;
      }
    }
  }
  const cal = c!;
  const puntajes = [...e.puntajes, Math.max(0, Math.min(1, cal.puntaje))];
  let paso = cal.pasoNuevo ?? e.paso + 1;
  let escena = e.escena;
  let terminada: boolean;
  if (a.pieza === "escenario") {
    escena = siguienteEscena ?? null;
    terminada = !escena || paso >= total;
  } else terminada = cal.terminar ?? paso >= total;
  if (terminada) paso = Math.min(paso, total);
  const puntaje = terminada ? cal.puntajeFinal ?? puntajes.reduce((x, y) => x + y, 0) / puntajes.length : null;
  const estado: EstadoItem = { ...e, ...(cal.ordenNuevo ? { orden: cal.ordenNuevo } : {}), paso, ...(a.pieza === "escenario" ? { escena } : {}), puntajes, terminada, puntaje };
  const devolucion: Devolucion = {
    puntaje: cal.puntaje,
    bien: cal.puntaje >= 0.999 || (a.pieza === "explica" && cal.puntaje >= 0.8),
    explica: cal.explica,
    apoyo: cal.apoyo,
    ref: cal.ref,
    correccion: cal.correccion,
    siguiente: terminada ? null : vistaDe(a, estado),
    terminada,
    puntajeActividad: puntaje,
  };
  return { devolucion, estado };
}
