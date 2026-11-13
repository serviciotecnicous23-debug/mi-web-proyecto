/**
 * Los mentores (docs/guion-del-juego.md, capítulo 8): un jugador con experiencia acompaña a uno, dos o tres nuevos en
 * sus primeros días. El nuevo elige a su mentor entre los vecinos de su barrio y sus amigos (el juego le sugiere uno), y
 * cada paso que cumple da gozo a los dos. Uno de los pasos es encontrarse en la ciudad: el mentor le enseña un dicho de
 * los ancianos (shared/dichos.ts). Cuando termina los seis, los dos reciben el manto de Elías y el mentor gana el título
 * «Idóneo para enseñar». El mentor ve el avance de sus aprendices y puede ir con ellos o invitarlos a venir.
 *
 * Todo lo decide el servidor (server/mentores.ts): quién es nuevo, quién puede ser mentor, los pasos (de lo que ya
 * guardan otras tablas) y si los dos están juntos en la ciudad. Solo cuentas aprobadas, nunca con un bloqueo.
 * «Lo que has oído de mí ante muchos testigos, esto encarga a hombres fieles que sean idóneos para enseñar también a
 * otros.» (2 Timoteo 2:2)
 */
import type { Camino } from "./caminos";

type Verso = { text: string; ref: string };

export const MENTORES = {
  /** Aprendices a la vez. */
  maxAprendices: 3,
  /** Hasta cuántos días después de llegar a Jerusalén se puede elegir mentor. */
  diasParaElegir: 14,
  /** Cuántos de los cinco pasos de siempre (sin «con tu mentor») puede tener hechos todavía quien elige mentor. */
  maxPasosParaElegir: 3,
  /** Lo que pide ser mentor: haber jugado estos días distintos (además de los primeros pasos y un estudio). */
  diasMentor: 3,
  /** Gozo por cada paso cumplido con el mentor: al aprendiz y al mentor. */
  gozoPaso: { aprendiz: 15, mentor: 10 },
  /** Gozo al terminar los seis pasos (y el manto de Elías para los dos). */
  gozoFin: { aprendiz: 50, mentor: 80 },
  /** Cuántos aprendices le dan gozo a un mismo mentor (después siguen contando, sin gozo). */
  maxPremiados: 10,
  /** Qué tan cerca (metros) tienen que estar en la ciudad para el paso «con tu mentor». */
  cerca: 6,
  /** Cuántas veces puede un aprendiz cambiar de mentor. */
  maxCambios: 2,
} as const;

export type PasoId = "deber" | "instruccion" | "juntos" | "estudio" | "obra" | "dias";
/** Adónde lleva el botón de cada paso (en la pantalla). */
export type IrPaso = "templo" | "instruccion" | "mentor" | "estudios" | "obras" | null;

export const PASOS: { id: PasoId; icono: string; titulo: string; como: string; ir: IrPaso }[] = [
  { id: "deber", icono: "🔥", titulo: "Tu primer servicio", como: "Cumple tu primer deber: en el templo, en la escuela de los profetas o en el palacio.", ir: "templo" },
  { id: "instruccion", icono: "📜", titulo: "Los primeros pasos", como: "Termina la instrucción de tu camino.", ir: "instruccion" },
  { id: "juntos", icono: "🤝", titulo: "Con tu mentor", como: "Encuéntrate con tu mentor en la ciudad: te enseñará un dicho de los ancianos.", ir: "mentor" },
  { id: "estudio", icono: "📚", titulo: "El primer estudio", como: "Aprueba un estudio de la escuela.", ir: "estudios" },
  { id: "obra", icono: "🧱", titulo: "La primera obra", como: "Termina una obra de tu casa (el cerco de piedra es la más sencilla).", ir: "obras" },
  { id: "dias", icono: "📅", titulo: "Tres días en Jerusalén", como: "Entra a Jerusalén tres días distintos.", ir: null },
];
/** Los pasos que se miran en lo que ya guardan otras tablas (todos menos «con tu mentor»). */
export const PASOS_DE_SIEMPRE: PasoId[] = PASOS.filter((p) => p.id !== "juntos").map((p) => p.id);
export const DIAS_APRENDIZ = 3;

export function paso(id: PasoId) {
  return PASOS.find((p) => p.id === id)!;
}

/**
 * El manto de los dos: no se vende, se gana. Elías echó su manto sobre Eliseo cuando lo llamó a seguirlo, y Eliseo fue
 * tras él y le servía (1 Reyes 19:19-21): lo reciben el mentor y su aprendiz cuando el aprendiz termina sus pasos.
 */
export const PRENDA_MENTOR = { id: "manto-elias", nombre: "Manto de Elías", color: "#7d5a3a" } as const;

export const VERSO_MENTOR: Verso = {
  text: "Lo que has oído de mí ante muchos testigos, esto encarga a hombres fieles que sean idóneos para enseñar también a otros.",
  ref: "2 Timoteo 2:2",
};
export const VERSO_APRENDIZ: Verso = {
  text: "Ninguno tenga en poco tu juventud, sino sé ejemplo de los creyentes en palabra, conducta, amor, espíritu, fe y pureza.",
  ref: "1 Timoteo 4:12",
};
export const VERSO_JUNTOS: Verso = {
  text: "Mejores son dos que uno; porque tienen mejor paga de su trabajo. Porque si cayeren, el uno levantará a su compañero; pero ¡ay del solo! que cuando cayere, no habrá segundo que lo levante.",
  ref: "Eclesiastés 4:9-10",
};
export const VERSO_MANTO: Verso = { text: "Y pasando Elías por delante de él, echó sobre él su manto.", ref: "1 Reyes 19:19" };

// ---------------------------------------------------------------- reglas
export type PasosGuardados = Partial<Record<PasoId, { at: string; antes?: boolean }>>;

/** Lo guardado de los pasos de un aprendiz (solo los pasos que existen). */
export function leerPasos(v: unknown): PasosGuardados {
  const o = v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : {};
  const out: PasosGuardados = {};
  for (const p of PASOS) {
    const x = o[p.id];
    if (x && typeof x === "object" && typeof (x as { at?: unknown }).at === "string") out[p.id] = { at: (x as { at: string }).at, ...((x as { antes?: unknown }).antes === true ? { antes: true } : {}) };
  }
  return out;
}

/** Lo que dicen las otras tablas de una persona (para los pasos y para saber si es nueva o puede ser mentor). */
export type DatosDePasos = { deber: boolean; instruccion: boolean; estudio: boolean; obra: boolean; dias: number; diasDesdeLlegada: number };

/** Los pasos de siempre que ya cumplió. */
export function pasosCumplidos(d: DatosDePasos): PasoId[] {
  const out: PasoId[] = [];
  if (d.deber) out.push("deber");
  if (d.instruccion) out.push("instruccion");
  if (d.estudio) out.push("estudio");
  if (d.obra) out.push("obra");
  if (d.dias >= DIAS_APRENDIZ) out.push("dias");
  return out;
}

/**
 * Si una persona puede elegir mentor (y si no, por qué): `yaTermino` = ya terminó sus pasos con un mentor; `esMentor` =
 * tiene o tuvo aprendices; `cambios` = cuántas veces dejó a un mentor.
 */
export function porQueNoElegir(d: DatosDePasos, o: { yaTermino: boolean; esMentor: boolean; cambios: number }): string | null {
  if (o.yaTermino) return "Ya terminaste tus pasos con tu mentor. ¡Ahora puedes ser mentor de otros!";
  if (o.esMentor) return "Ya eres mentor: tú enseñas a quienes llegan.";
  if (o.cambios > MENTORES.maxCambios) return "Ya cambiaste de mentor muchas veces.";
  if (d.diasDesdeLlegada > MENTORES.diasParaElegir) return `Los mentores son para quienes acaban de llegar (sus primeros ${MENTORES.diasParaElegir} días en Jerusalén).`;
  if (pasosCumplidos(d).length > MENTORES.maxPasosParaElegir) return "Ya conoces Jerusalén: mejor sé mentor de alguien que llega.";
  return null;
}

/** Si una persona puede ser mentor (y si no, por qué). */
export function porQueNoMentor(d: DatosDePasos, o: { esAprendiz: boolean }): string | null {
  if (o.esAprendiz) return "Primero termina tus pasos con tu mentor.";
  const falta: string[] = [];
  if (!d.instruccion) falta.push("terminar tus primeros pasos");
  if (!d.estudio) falta.push("aprobar un estudio");
  if (d.dias < MENTORES.diasMentor) falta.push(`jugar ${MENTORES.diasMentor} días en Jerusalén (llevas ${d.dias})`);
  if (!falta.length) return null;
  const lista = falta.length > 1 ? `${falta.slice(0, -1).join(", ")} y ${falta[falta.length - 1]}` : falta[0];
  return `Para ser mentor te falta ${lista}.`;
}

export type Relacion = "vecino" | "amigo" | "ambos";
export type MentorPosible = {
  userId: number;
  personajeId: number;
  nombre: string;
  camino: Camino;
  titulo: string | null;
  relacion: Relacion;
  enLinea: boolean;
  donde: string | null;
  /** Aprendices que tiene ahora y los que ya terminaron con él. */
  aprendices: number;
  guiados: number;
  dias: number;
  sugerido: boolean;
};

/**
 * El orden de los mentores que se le muestran a un nuevo: primero el que está en línea, después el vecino que además es
 * amigo, el del mismo camino, el que ya guió a más y el que tiene menos aprendices. El primero es el sugerido.
 */
export function ordenarPosibles(l: Omit<MentorPosible, "sugerido">[], camino: Camino): MentorPosible[] {
  const rel: Record<Relacion, number> = { ambos: 0, vecino: 1, amigo: 2 };
  const out = [...l].sort(
    (a, b) =>
      Number(b.enLinea) - Number(a.enLinea) ||
      rel[a.relacion] - rel[b.relacion] ||
      Number(b.camino === camino) - Number(a.camino === camino) ||
      b.guiados - a.guiados ||
      a.aprendices - b.aprendices ||
      b.dias - a.dias ||
      a.nombre.localeCompare(b.nombre, "es"),
  );
  return out.map((m, i) => ({ ...m, sugerido: i === 0 }));
}

// ---------------------------------------------------------------- respuestas de la API
export type PasoVista = { id: PasoId; hecho: boolean; antes: boolean };
export type Companero = { userId: number; personajeId: number; nombre: string; camino: Camino; enLinea: boolean; donde: string | null; enCiudad: boolean };
export type AprendizVista = Companero & { desde: string; pasos: PasoVista[]; hechos: number; juntosHoy: boolean };
export type MentoresEstado = {
  yo: {
    /** Si puede elegir mentor ahora (y si no, por qué). */
    puedeElegir: boolean;
    motivoElegir: string | null;
    puedeSerMentor: boolean;
    motivoMentor: string | null;
    /** Si recibe aprendices (lo puede apagar). */
    recibe: boolean;
    dias: number;
  };
  /** Su mentor, mientras hace sus pasos. */
  miMentor: (Companero & { desde: string; pasos: PasoVista[]; hechos: number; juntosHoy: boolean }) | null;
  /** Con quién terminó sus pasos (si ya terminó). */
  terminoCon: { nombre: string; cuando: string } | null;
  /** Los mentores que puede elegir (solo si puede elegir y no tiene). */
  posibles: MentorPosible[];
  /** Sus aprendices (si es mentor). */
  aprendices: AprendizVista[];
  /** Aprendices que terminaron con él, y cuántos le dieron gozo. */
  guiados: number;
  premiados: number;
};

/** El aviso en vivo a un mentor o a su aprendiz (por la red de la ciudad). */
export type AvisoMentor = {
  texto: string;
  gozo: number;
  gozoTotal: number | null;
  /** El dicho que se aprendió al encontrarse (si hubo). */
  dicho?: { text: string; ref: string } | null;
  /** Si terminó los seis pasos (el manto para los dos). */
  fin?: boolean;
};
