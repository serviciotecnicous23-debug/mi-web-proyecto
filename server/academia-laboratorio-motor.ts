/**
 * El motor del laboratorio ministerial, sin base de datos (server/academia-laboratorio.ts lo guarda): los pasos de una
 * práctica en su versión, el orden mezclado de las opciones, lo que pasa con cada respuesta y el perfil del final.
 * Las opciones se guardan por su lugar en la práctica (no por el lugar en que se mostraron).
 */
import { MAX_PASO, type EscenaDef, type OpcionDef, type PracticaDef, type RondaDef } from "./academia/laboratorio/tipos";
import {
  nivelConCritica, notaPractica, type CompetenciaResultado, type ConsecuenciaVista, type Medidor, type PasoVista, type ResultadoPractica,
} from "@shared/laboratorio";

export type Paso = { tipo: "escena"; e: EscenaDef } | { tipo: "ordenar"; r: RondaDef };

/** Una respuesta guardada: en una escena, [la opción]; en una ronda, el orden de la mejor a la peor. */
export type Decision = { paso: number; k: number[]; puntos: number; critica: boolean; ejemplar: boolean };

export type EstadoIntento = {
  variante: number;
  paso: number;
  /** Por paso, el lugar en la práctica de cada opción en el orden en que se muestra. */
  orden: number[][];
  decisiones: Decision[];
  medidores: Record<string, number>;
};

/** La versión que trae un intento: la 0 es la de la práctica; después, cada variante, y se vuelve a empezar. */
export function varianteDe(p: PracticaDef, intento: number): number {
  const n = 1 + (p.variantes?.length ?? 0);
  return (Math.max(1, intento) - 1) % n;
}

export function nombreVariante(p: PracticaDef, variante: number): string | null {
  return variante > 0 ? p.variantes?.[variante - 1]?.nombre ?? null : null;
}

export function pasosDe(p: PracticaDef, variante: number): Paso[] {
  if (p.formato === "ordenar") return (p.rondas ?? []).map((r) => ({ tipo: "ordenar", r }));
  const cambios = new Map((variante > 0 ? p.variantes?.[variante - 1]?.escenas ?? [] : []).map((e) => [e.id, e]));
  return (p.escenas ?? []).map((e) => ({ tipo: "escena", e: cambios.get(e.id) ?? e }));
}

const opcionesDe = (paso: Paso) => (paso.tipo === "escena" ? paso.e.opciones : paso.r.opciones);
const tituloDe = (paso: Paso) => (paso.tipo === "escena" ? paso.e.titulo : paso.r.titulo);
const competenciaDe = (paso: Paso) => (paso.tipo === "escena" ? paso.e.competencia : paso.r.competencia);
const caminoDe = (paso: Paso) => (paso.tipo === "escena" ? paso.e.camino : paso.r.camino);

function mezclar(n: number, azar: () => number): number[] {
  const a = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(azar() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const enOrden = (a: number[]) => a.every((x, i) => x === i);

/** Al ordenar, las opciones nunca se muestran ya en el orden de quien sabe (bastaría tocarlas de arriba abajo). */
function mezclarPaso(paso: Paso, azar: () => number): number[] {
  const n = opcionesDe(paso).length;
  let a = mezclar(n, azar);
  for (let i = 0; paso.tipo === "ordenar" && enOrden(a) && i < 10; i++) a = mezclar(n, azar);
  return paso.tipo === "ordenar" && enOrden(a) ? a.reverse() : a;
}

export function nuevoEstado(p: PracticaDef, variante: number, azar: () => number = Math.random): EstadoIntento {
  const pasos = pasosDe(p, variante);
  const medidores: Record<string, number> = {};
  for (const m of p.medidores ?? []) medidores[m.id] = m.inicial;
  return { variante, paso: 0, orden: pasos.map((x) => mezclarPaso(x, azar)), decisiones: [], medidores };
}

export const terminado = (p: PracticaDef, s: EstadoIntento) => s.paso >= pasosDe(p, s.variante).length;

export function medidoresVista(p: PracticaDef, s: EstadoIntento): Medidor[] {
  return (p.medidores ?? []).map((m) => ({ id: m.id, nombre: m.nombre, explica: m.explica, valor: s.medidores[m.id] ?? m.inicial }));
}

/** La frase que depende de lo que eligió antes (si ya pasó por esa escena). */
function fraseSegun(p: PracticaDef, s: EstadoIntento, e: EscenaDef): string | null {
  if (!e.segun) return null;
  const pasos = pasosDe(p, s.variante);
  const i = pasos.findIndex((x) => x.tipo === "escena" && x.e.id === e.segun!.escena);
  const d = s.decisiones.find((x) => x.paso === i);
  if (!d) return null;
  return d.ejemplar ? e.segun.si : e.segun.no;
}

export function vistaPaso(p: PracticaDef, s: EstadoIntento): PasoVista | null {
  const pasos = pasosDe(p, s.variante);
  const paso = pasos[s.paso];
  if (!paso) return null;
  const orden = s.orden[s.paso];
  const comun = { n: s.paso + 1, de: pasos.length, titulo: tituloDe(paso) };
  if (paso.tipo === "escena") {
    const e = paso.e;
    const segun = fraseSegun(p, s, e);
    return {
      tipo: "escena",
      ...comun,
      narra: [...e.narra, ...(segun ? [segun] : [])],
      quien: e.quien ?? null,
      dice: e.dice ?? null,
      pregunta: e.pregunta ?? "¿Qué haces?",
      opciones: orden.map((j, k) => ({ k, texto: e.opciones[j].texto })),
    };
  }
  const r = paso.r;
  return { tipo: "ordenar", ...comun, situacion: r.situacion, pregunta: r.pregunta, opciones: orden.map((j, k) => ({ k, texto: r.opciones[j].texto })) };
}

/** La distancia entre dos órdenes (la suma de cuánto se movió cada opción) y la mayor posible. */
export function distanciaOrden(lugares: number[]): { d: number; max: number } {
  const n = lugares.length;
  let d = 0;
  lugares.forEach((j, pos) => (d += Math.abs(pos - j)));
  return { d, max: Math.floor((n * n) / 2) };
}

const redondear = (x: number) => Math.round(x * 100) / 100;
const limitar = (x: number) => Math.max(0, Math.min(100, x));

export type Entrada = { k?: unknown; orden?: unknown };

/** Responde el paso actual. Devuelve el estado nuevo y lo que pasó, o el error (sin cambiar nada). */
export function responder(p: PracticaDef, s: EstadoIntento, entrada: Entrada): { estado: EstadoIntento; consecuencia: ConsecuenciaVista } | { error: string } {
  const pasos = pasosDe(p, s.variante);
  const paso = pasos[s.paso];
  if (!paso) return { error: "La práctica ya terminó." };
  const orden = s.orden[s.paso];
  const comun = { n: s.paso + 1, titulo: tituloDe(paso) };
  if (paso.tipo === "escena") {
    const k = entrada.k;
    if (typeof k !== "number" || !Number.isInteger(k) || k < 0 || k >= orden.length) return { error: "Escoge una de las opciones." };
    const j = orden[k];
    const o: OpcionDef = paso.e.opciones[j];
    const medidores = { ...s.medidores };
    const cambios: { nombre: string; delta: number }[] = [];
    for (const m of p.medidores ?? []) {
      const delta = o.efectos?.[m.id] ?? 0;
      if (!delta) continue;
      const antes = medidores[m.id] ?? m.inicial;
      medidores[m.id] = limitar(antes + delta);
      cambios.push({ nombre: m.nombre, delta: medidores[m.id] - antes });
    }
    const mejor = paso.e.opciones.find((x) => x.ejemplar);
    const decision: Decision = { paso: s.paso, k: [j], puntos: o.puntos, critica: !!o.critica, ejemplar: !!o.ejemplar };
    return {
      estado: { ...s, paso: s.paso + 1, decisiones: [...s.decisiones, decision], medidores },
      consecuencia: {
        ...comun,
        elegida: [o.texto],
        pasa: o.pasa,
        responde: o.responde ?? null,
        quien: paso.e.quien ?? null,
        explica: o.explica,
        mejor: o.ejemplar ? null : mejor?.texto ?? null,
        ejemplar: !!o.ejemplar,
        puntos: o.puntos,
        max: MAX_PASO,
        critica: o.critica ?? null,
        cambios,
        orden: null,
      },
    };
  }
  // ordenar: los lugares mostrados, de la mejor a la peor, sin repetir ninguno
  const r = paso.r;
  const dado = entrada.orden;
  if (!Array.isArray(dado) || dado.length !== orden.length || new Set(dado).size !== orden.length) return { error: "Ordena todas las opciones antes de confirmar." };
  if (!dado.every((x) => typeof x === "number" && Number.isInteger(x) && x >= 0 && x < orden.length)) return { error: "Ordena todas las opciones antes de confirmar." };
  const lugares = (dado as number[]).map((k) => orden[k]);
  const { d, max } = distanciaOrden(lugares);
  const puntos = redondear(MAX_PASO * (1 - d / max));
  const primera = r.opciones[lugares[0]];
  const critica = primera.critica ?? null;
  const decision: Decision = { paso: s.paso, k: lugares, puntos, critica: !!critica, ejemplar: d === 0 };
  const pct = Math.round((100 * puntos) / MAX_PASO);
  return {
    estado: { ...s, paso: s.paso + 1, decisiones: [...s.decisiones, decision] },
    consecuencia: {
      ...comun,
      elegida: lugares.map((j) => r.opciones[j].texto),
      pasa: d === 0 ? "Tu orden es el mismo de quien sabe." : `Tu orden se parece en un ${pct} % al de quien sabe.`,
      responde: null,
      quien: null,
      explica: r.camino.porque,
      mejor: null,
      ejemplar: d === 0,
      puntos,
      max: MAX_PASO,
      critica,
      cambios: [],
      orden: r.opciones.map((o, j) => ({ texto: o.texto, porque: o.porque, tuLugar: lugares.indexOf(j) + 1 })),
    },
  };
}

/** El perfil del final: cada competencia con su nivel, la nota, las acciones críticas y el camino ejemplar. */
export function resultado(p: PracticaDef, s: EstadoIntento): ResultadoPractica {
  const pasos = pasosDe(p, s.variante);
  const porPaso = new Map(s.decisiones.map((d) => [d.paso, d]));
  const competencias: CompetenciaResultado[] = p.competencias.map((c) => {
    let pts = 0;
    let max = 0;
    let conCritica = false;
    pasos.forEach((x, i) => {
      if (competenciaDe(x) !== c.id) return;
      max += MAX_PASO;
      const d = porPaso.get(i);
      if (d) {
        pts += d.puntos;
        if (d.critica) conCritica = true;
      }
    });
    const pct = max ? Math.round((100 * pts) / max) : 0;
    return { id: c.id, nombre: c.nombre, leccion: c.leccion, pct, nivel: nivelConCritica(pct, conCritica), conCritica };
  });
  const criticas: ResultadoPractica["criticas"] = [];
  const camino: ResultadoPractica["camino"] = [];
  const bien: string[] = [];
  const distinto: string[] = [];
  pasos.forEach((x, i) => {
    const d = porPaso.get(i);
    const ruta = caminoDe(x);
    if (x.tipo === "escena") {
      const o = d ? x.e.opciones[d.k[0]] : null;
      camino.push({ titulo: ruta.titulo, porque: ruta.porque, elegida: o?.texto ?? "Sin responder", bien: !!o?.ejemplar });
      if (o?.critica) criticas.push({ titulo: x.e.titulo, texto: o.critica });
      if (o) (o.ejemplar ? bien : distinto).push(o.explica);
    } else {
      const primera = d ? x.r.opciones[d.k[0]] : null;
      camino.push({ titulo: ruta.titulo, porque: ruta.porque, elegida: primera?.texto ?? "Sin responder", bien: !!d?.ejemplar });
      if (primera?.critica) criticas.push({ titulo: x.r.titulo, texto: primera.critica });
      if (d) (d.ejemplar ? bien : distinto).push(d.ejemplar ? `${x.r.titulo}: tu orden fue el de quien sabe.` : `${x.r.titulo}: ${ruta.porque}`);
    }
  });
  const nota = notaPractica(
    competencias.map((c) => ({ pct: c.pct, peso: p.competencias.find((x) => x.id === c.id)!.peso })),
    criticas.length,
  );
  return { nota, competencias, criticas, camino, bien, distinto };
}

/** Lee un estado guardado (jsonb) con cuidado: si algo no cuadra con la práctica, null. */
export function estadoValido(p: PracticaDef, x: any): EstadoIntento | null {
  if (!x || typeof x !== "object") return null;
  const variante = Number(x.variante);
  if (!Number.isInteger(variante) || variante < 0 || variante > (p.variantes?.length ?? 0)) return null;
  const pasos = pasosDe(p, variante);
  const paso = Number(x.paso);
  if (!Number.isInteger(paso) || paso < 0 || paso > pasos.length) return null;
  if (!Array.isArray(x.orden) || x.orden.length !== pasos.length) return null;
  for (let i = 0; i < pasos.length; i++) {
    const o = x.orden[i];
    const n = opcionesDe(pasos[i]).length;
    if (!Array.isArray(o) || o.length !== n || new Set(o).size !== n || !o.every((j: unknown) => typeof j === "number" && j >= 0 && j < n)) return null;
  }
  if (!Array.isArray(x.decisiones)) return null;
  const medidores = x.medidores && typeof x.medidores === "object" ? x.medidores : {};
  return { variante, paso, orden: x.orden, decisiones: x.decisiones, medidores };
}
