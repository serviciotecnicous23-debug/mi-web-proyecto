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
const POR_RONDAS = new Set<Formato>(["relampago", "elige", "elige-pareja", "intruso", "donde-va", "cual-falsa"]);

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
      default:
        return true;
    }
  });
}

/** Las formas de cada pieza, de la más difícil a la más fácil (el reto de dominio usa la más difícil que se pueda). */
const DIFICULTAD: Partial<Record<Pieza, Formato[]>> = {
  completa: ["escribe", "elige", "banco"],
  relaciona: ["parejas", "elige-pareja"],
  clasifica: ["recuadros", "intruso", "desliza"],
  ordena: ["lista", "donde-va", "escalones"],
  linea: ["lista", "donde-va", "escalones"],
  verdad: ["cual-falsa", "verdad-o-error"],
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

type Calificado = { puntaje: number; correccion: Correccion; explica: string; apoyo: string; ref: string | null };

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
  let paso = e.paso + 1;
  let escena = e.escena;
  let terminada: boolean;
  if (a.pieza === "escenario") {
    escena = siguienteEscena ?? null;
    terminada = !escena || paso >= total;
  } else terminada = paso >= total;
  if (terminada) paso = Math.min(paso, total);
  const puntaje = terminada ? puntajes.reduce((x, y) => x + y, 0) / puntajes.length : null;
  const estado: EstadoItem = { ...e, paso, ...(a.pieza === "escenario" ? { escena } : {}), puntajes, terminada, puntaje };
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
