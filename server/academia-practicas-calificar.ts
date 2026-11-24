/**
 * El corazón del motor de prácticas (sin base de datos: se prueba en academia-practicas-calificar.test.ts):
 * - arma cada actividad para un intento (el orden mezclado de sus opciones queda fijo en su estado);
 * - la muestra como la ve el alumno, sin las respuestas, de a un paso en las piezas por pasos;
 * - califica cada respuesta y devuelve la corrección, la explicación y la frase de la lección que la sostiene.
 * Los índices que manda el alumno son los del orden en que se le mostró; aquí se traducen al orden original.
 */
import { ordenDeOpciones } from "@shared/estudios";
import { CONSIGNA_PIEZA, type Correccion, type Devolucion, type ItemVista, type RespuestaPractica } from "@shared/practicas";
import { ESCRITA } from "@shared/academia";
import { corregirEscrita, normalizar } from "./academia-correccion";
import { numeroDe } from "./orden-examen";
import { huecosDe } from "./academia/practicas/validar";
import type { Actividad, VersionCaso, VersionEscenario } from "./academia/practicas/tipos";

/** El estado de una actividad dentro de un intento (se guarda en el intento como JSON). */
export type EstadoItem = {
  leccion: string;
  actividad: string;
  version: number;
  /** Los órdenes mezclados: banco, derecha, frases, pasos, opciones, eventos, lugares, `esc:<id>` y `paso:<n>`. */
  orden: Record<string, number[]>;
  /** Las palabras para elegir (completa) o las relaciones (mapa de ideas), ya mezcladas. */
  banco?: string[];
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

/** Cuántos pasos tiene una actividad (las que no van por pasos tienen 1). */
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

/** Arma una actividad para un intento: elige la versión y deja fijo el orden mezclado de todo lo que se muestra. */
export function nuevoEstado(leccion: string, a: Actividad, version: number, semilla: number): EstadoItem {
  const v: any = a.versiones[version];
  const clave = `${leccion}:${a.id}:${version}`;
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
  return {
    leccion,
    actividad: a.id,
    version,
    orden,
    ...(banco ? { banco } : {}),
    paso: 0,
    ...(a.pieza === "escenario" ? { escena: (v as VersionEscenario).escenas[0]?.id ?? null } : {}),
    puntajes: [],
    terminada: false,
    puntaje: null,
    pista: false,
  };
}

/** Un orden mezclado que nunca es el correcto (para ordenar no vale empezar ya resuelto). */
function desordenado(n: number, semilla: number, clave: string): number[] {
  for (let k = 0; k < 6; k++) {
    const o = mezclar(n, semilla + k * 7919, clave);
    if (o.some((x, i) => x !== i)) return o;
  }
  return Array.from({ length: n }, (_, i) => (i + 1) % n);
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

/** Lo que ve el alumno de la actividad en el paso en que va. */
export function vistaDe(a: Actividad, e: EstadoItem): ItemVista {
  const consigna = (v: any) => (v.consigna as string | undefined) || CONSIGNA_PIEZA[a.pieza];
  switch (a.pieza) {
    case "tarjetas": {
      const v = versionDe(a, e);
      return { pieza: "tarjetas", consigna: CONSIGNA_PIEZA.tarjetas, tarjetas: v.tarjetas.map((t) => ({ frente: t.frente, reverso: t.reverso })) };
    }
    case "completa": {
      const v = versionDe(a, e);
      const partes: (string | { hueco: number })[] = [];
      let n = 0;
      for (const trozo of v.texto.split(/(\[\[[^\]]+\]\])/g)) {
        if (!trozo) continue;
        if (trozo.startsWith("[[") && trozo.endsWith("]]")) partes.push({ hueco: n++ });
        else partes.push(trozo);
      }
      return { pieza: "completa", consigna: consigna(v), partes, banco: e.banco ?? [] };
    }
    case "relaciona": {
      const v = versionDe(a, e);
      return { pieza: "relaciona", consigna: consigna(v), izquierda: v.pares.map((p) => p[0]), derecha: e.orden.derecha.map((i) => v.pares[i][1]) };
    }
    case "clasifica": {
      const v = versionDe(a, e);
      return { pieza: "clasifica", consigna: consigna(v), grupos: v.grupos, frases: e.orden.frases.map((i) => v.frases[i].texto) };
    }
    case "ordena": {
      const v = versionDe(a, e);
      return { pieza: "ordena", consigna: v.consigna, pasos: e.orden.pasos.map((i) => v.pasos[i]) };
    }
    case "verdad": {
      const v = versionDe(a, e);
      const p = Math.min(e.paso, v.afirmaciones.length - 1);
      return { pieza: "verdad", consigna: consigna(v), afirmacion: v.afirmaciones[p].texto, paso: p, pasos: v.afirmaciones.length };
    }
    case "error": {
      const v = versionDe(a, e);
      return { pieza: "error", consigna: consigna(v), frases: e.orden.frases.map((i) => v.frases[i]) };
    }
    case "situacion": {
      const v = versionDe(a, e);
      return { pieza: "situacion", consigna: CONSIGNA_PIEZA.situacion, caso: v.caso, pregunta: v.pregunta, opciones: e.orden.opciones.map((i) => v.opciones[i].texto) };
    }
    case "explica": {
      const v = versionDe(a, e);
      const { min, max } = ESCRITA.corta;
      return { pieza: "explica", consigna: CONSIGNA_PIEZA.explica, pregunta: v.clave.pregunta, min, max };
    }
    case "linea": {
      const v = versionDe(a, e);
      return { pieza: "linea", consigna: v.consigna, eventos: e.orden.eventos.map((i) => v.eventos[i].texto) };
    }
    case "mapa-ideas": {
      const v = versionDe(a, e);
      return {
        pieza: "mapa-ideas",
        consigna: consigna(v),
        nodos: v.nodos.map((n) => ({ id: n.id, texto: n.texto, x: n.x, y: n.y })),
        enlaces: v.enlaces.map((x) => ({ de: x.de, a: x.a })),
        relaciones: e.banco ?? [],
      };
    }
    case "mapa": {
      const v = versionDe(a, e);
      const p = Math.min(e.paso, v.lugares.length - 1);
      return { pieza: "mapa", consigna: consigna(v), imagen: v.imagen, alt: v.alt, lugar: v.lugares[e.orden.lugares[p]].nombre, paso: p, pasos: v.lugares.length };
    }
    case "pasaje": {
      const v = versionDe(a, e);
      const { palabras, marcadas } = palabrasDePasaje(v.texto);
      return { pieza: "pasaje", consigna: v.consigna, ref: v.ref, palabras, cuantas: marcadas.length };
    }
    case "escenario": {
      const v = versionDe(a, e);
      const esc = v.escenas.find((x) => x.id === e.escena) ?? v.escenas[v.escenas.length - 1];
      return {
        pieza: "escenario",
        consigna: CONSIGNA_PIEZA.escenario,
        situacion: v.situacion,
        escena: { id: esc.id, narra: esc.narra, pregunta: esc.pregunta, opciones: e.orden[`esc:${esc.id}`].map((i) => esc.opciones[i].texto) },
        paso: e.paso,
      };
    }
    case "caso": {
      const v = versionDe(a, e);
      const p = Math.min(e.paso, v.pasos.length - 1);
      const paso = v.pasos[p];
      const { min, max } = ESCRITA.corta;
      return {
        pieza: "caso",
        consigna: CONSIGNA_PIEZA.caso,
        titulo: v.titulo,
        relato: v.relato,
        actual: paso.tipo === "situacion" ? { tipo: "situacion", pregunta: paso.pregunta, opciones: e.orden[`paso:${p}`].map((i) => paso.opciones[i].texto) } : { tipo: "explica", pregunta: paso.clave.pregunta, min, max },
        paso: p,
        pasos: v.pasos.length,
      };
    }
  }
}

/** La frase de la lección para la pista (en las piezas por pasos, la del paso en que va). */
export function pistaDe(a: Actividad, e: EstadoItem): string {
  const v: any = versionDe(a, e);
  if (a.pieza === "verdad") return v.afirmaciones[Math.min(e.paso, v.afirmaciones.length - 1)].apoyo;
  if (a.pieza === "tarjetas") return v.tarjetas[0]?.apoyo ?? "";
  return v.apoyo ?? "";
}

const igual = (a: string, b: string) => normalizar(a) === normalizar(b);
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

/**
 * Califica la respuesta del paso en que va la actividad. Devuelve la devolución y el estado nuevo (el estado que se
 * recibe no se cambia). Si la respuesta no corresponde a la pieza, lanza un error.
 */
export function contestar(a: Actividad, e: EstadoItem, r: RespuestaPractica): { devolucion: Devolucion; estado: EstadoItem } {
  if (e.terminada) throw new Error("Esa actividad ya terminó.");
  if (r.pieza !== a.pieza) throw new Error("La respuesta no corresponde a la actividad.");
  const v: any = versionDe(a, e);
  const total = pasosDe(a, e.version);
  let c: Calificado;
  let siguienteEscena: string | null | undefined;
  switch (a.pieza) {
    case "tarjetas": {
      const calif = (r as any).calif as string[];
      const puntos = v.tarjetas.map((_: unknown, i: number) => (calif?.[i] === "bien" ? 1 : calif?.[i] === "duda" ? 0.5 : 0));
      c = { puntaje: puntos.reduce((x: number, y: number) => x + y, 0) / Math.max(1, puntos.length), correccion: { pieza: "tarjetas" }, explica: "", apoyo: "", ref: null };
      break;
    }
    case "completa": {
      const buenas = huecosDe(v.texto);
      const dadas = ((r as any).huecos ?? []) as string[];
      const marcas = buenas.map((b, i) => typeof dadas[i] === "string" && igual(dadas[i], b));
      const malo = dadas.find((d, i) => !marcas[i] && typeof d === "string" && Object.keys(v.errores ?? {}).some((k) => igual(k, d)));
      const error = malo ? Object.entries(v.errores as Record<string, string>).find(([k]) => igual(k, malo))?.[1] ?? null : null;
      c = { puntaje: marcas.filter(Boolean).length / buenas.length, correccion: { pieza: "completa", correctas: buenas, marcas, error }, explica: v.explica, apoyo: v.apoyo, ref: v.ref ?? null };
      break;
    }
    case "relaciona": {
      const n = v.pares.length;
      const dadas = ((r as any).pares ?? []) as number[];
      const marcas = Array.from({ length: n }, (_, i) => e.orden.derecha[entero(dadas[i], n)] === i);
      const correctas = Array.from({ length: n }, (_, i) => e.orden.derecha.indexOf(i));
      c = { puntaje: marcas.filter(Boolean).length / n, correccion: { pieza: "relaciona", correctas, marcas }, explica: v.explica, apoyo: v.apoyo, ref: v.ref ?? null };
      break;
    }
    case "clasifica": {
      const dadas = ((r as any).grupos ?? []) as number[];
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
      const dadas = ((r as any).orden ?? []) as number[];
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
      const bien = (r as any).verdad === af.verdad;
      c = { puntaje: bien ? 1 : 0, correccion: { pieza: "verdad", verdad: af.verdad }, explica: af.explica, apoyo: af.apoyo, ref: af.ref ?? null };
      break;
    }
    case "error": {
      const k = entero((r as any).frase, v.frases.length);
      const bien = k >= 0 && e.orden.frases[k] === v.malo;
      c = { puntaje: bien ? 1 : 0, correccion: { pieza: "error", malo: e.orden.frases.indexOf(v.malo), correccion: v.correccion }, explica: v.explica, apoyo: v.apoyo, ref: v.ref ?? null };
      break;
    }
    case "situacion": {
      const k = entero((r as any).opcion, v.opciones.length);
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
      const texto = String((r as any).texto ?? "").slice(0, 2000);
      const res = corregirEscrita(v.clave, texto);
      c = {
        puntaje: res.nota / 100,
        correccion: { pieza: "explica", nota: res.nota, ideas: res.ideas, avisos: res.avisos, modelo: v.clave.modelo },
        explica: "",
        apoyo: v.apoyo,
        ref: v.ref ?? null,
      };
      break;
    }
    case "mapa-ideas": {
      const banco = e.banco ?? [];
      const dadas = ((r as any).relaciones ?? []) as number[];
      const marcas = v.enlaces.map((x: any, i: number) => banco[entero(dadas[i], banco.length)] === x.relacion);
      const correctas = v.enlaces.map((x: any) => banco.indexOf(x.relacion));
      c = { puntaje: marcas.filter(Boolean).length / v.enlaces.length, correccion: { pieza: "mapa-ideas", correctas, marcas }, explica: v.explica, apoyo: v.apoyo, ref: v.ref ?? null };
      break;
    }
    case "mapa": {
      const lugar = v.lugares[e.orden.lugares[e.paso]];
      const x = Number((r as any).x);
      const y = Number((r as any).y);
      const radio = lugar.radio ?? 8;
      const bien = Number.isFinite(x) && Number.isFinite(y) && Math.hypot(x - lugar.x, y - lugar.y) <= radio;
      c = { puntaje: bien ? 1 : 0, correccion: { pieza: "mapa", x: lugar.x, y: lugar.y, bien }, explica: lugar.explica ?? v.explica, apoyo: v.apoyo, ref: v.ref ?? null };
      break;
    }
    case "pasaje": {
      const { palabras, marcadas } = palabrasDePasaje(v.texto);
      const dadas = new Set((((r as any).palabras ?? []) as number[]).filter((k) => entero(k, palabras.length) >= 0));
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
      const k = entero((r as any).opcion, esc.opciones.length);
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
        const k = entero((r as any).opcion, paso.opciones.length);
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
        const res = corregirEscrita(paso.clave, String((r as any).texto ?? "").slice(0, 2000));
        c = {
          puntaje: res.nota / 100,
          correccion: { pieza: "caso", nota: res.nota, ideas: res.ideas, modelo: paso.clave.modelo },
          explica: "",
          apoyo: paso.apoyo || ver.apoyo,
          ref: paso.ref ?? ver.ref ?? null,
        };
      }
      break;
    }
  }
  const puntajes = [...e.puntajes, Math.max(0, Math.min(1, c.puntaje))];
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
    puntaje: c.puntaje,
    bien: c.puntaje >= 0.999 || (a.pieza === "explica" && c.puntaje >= 0.8) || (a.pieza === "tarjetas"),
    explica: c.explica,
    apoyo: c.apoyo,
    ref: c.ref,
    correccion: c.correccion,
    siguiente: terminada ? null : vistaDe(a, estado),
    terminada,
    puntajeActividad: puntaje,
  };
  return { devolucion, estado };
}
