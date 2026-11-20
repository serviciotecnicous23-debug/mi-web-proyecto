/**
 * La Academia Avivando el Fuego (docs/academia.md): el instituto de formación de la web, dentro de Clases.
 *
 * Aquí van las reglas que comparten la pantalla y el servidor: las etapas, los niveles, las materias con sus lecciones
 * y sus sílabos, las especialidades, las notas, los exámenes y la suficiencia.
 *
 * - Sin drizzle ni zod: lo importan solo las páginas de la academia (nunca el menú ni la portada).
 * - El texto de las lecciones vive en server/academia/contenido/ y se pide por API.
 * - Las preguntas, sus respuestas y las claves de corrección de lo escrito viven SOLO en el servidor
 *   (server/academia/bancos/).
 *
 * La estructura y la evaluación vienen de los institutos bíblicos y de las plataformas académicas (Moodle, la Open
 * University); del juego solo se toma la seguridad técnica de los exámenes (preguntas en el servidor y reloj).
 */

import type { NarracionVista } from "./narracion";
import {
  ACTIVIDADES_NIVEL, APRUEBA_PROYECTO, APRUEBA_SERMON, LIMITES_ACTIVIDAD, MINUTOS_ENSENANZA, MINUTOS_SERMON, PARTES_PLAN, PASOS_CONSOLIDACION, PASOS_MINIMOS,
  PROFESORES_DEFENSA, RUBRICA_PROYECTO, RUBRICA_SERMON,
} from "./academia-actividades";

export const NOMBRE_ACADEMIA = "Academia Avivando el Fuego";
/** El lema: 2 Timoteo 2:15 (RV1960, frase literal comprobada con la Biblia de la web). */
export const LEMA = { frase: "Procura con diligencia presentarte a Dios aprobado", ref: "2 Timoteo 2:15" };
/** La aclaración que llevan todos los documentos (no es un título universitario: ver docs/academia.md). */
export const ACLARACION_DOCUMENTOS =
  "Formación ministerial del Ministerio Avivando el Fuego. No es un título universitario oficial.";

// ---------------------------------------------------------------- tipos

export type NivelN = 1 | 2 | 3 | 4 | 5;
export const NIVELES_N: NivelN[] = [1, 2, 3, 4, 5];
export type EtapaId = "raices" | "servicio" | "ministerio";
export type Dimension = "conocer" | "ser" | "hacer";
/** La taxonomía de Bloom (revisada): los verbos con que se escriben y se miden los objetivos. */
export type Bloom = "recordar" | "comprender" | "aplicar" | "analizar" | "evaluar" | "crear";

export type LeccionDef = { id: string; titulo: string; minutos: number; base: string };
export type Libro = { autor: string; titulo: string; editorial?: string; nota?: string };
export type ObjetivoDef = { id: string; texto: string; bloom: Bloom };
export type RecursoDef = { tipo: "video" | "audio" | "lectura" | "guia"; titulo: string; fuente: string; url?: string; minutos?: number };

/** El sílabo de una materia: lo que el alumno ve y descarga antes de empezar. */
export type Silabo = {
  proposito: string;
  objetivos: ObjetivoDef[];
  dimensiones: Record<Dimension, string>;
  bibliografia: { basica: Libro[]; complementaria: Libro[] };
  recursos: RecursoDef[];
  /** Niveles 4 y 5: una lectura ampliada con su reporte (shared/academia-complementos.ts). */
  ampliada?: LecturaAmpliada;
};

/** Una lectura ampliada: qué leer, de dónde, cuánto pide y las preguntas guía de su reporte (en el cuaderno). */
export type LecturaAmpliada = { lectura: string; fuente: string; url?: string; minutos: number; reporte: string[] };

export type EspecialidadId =
  | "evangelismo-misiones" | "pastoral" | "alabanza" | "ninez" | "juventud" | "familia-consejeria"
  | "intercesion" | "comunicaciones" | "capellania" | "biblicos-avanzados" | "liderazgo-administracion" | "obra-social";

export type MateriaDef = {
  id: string;
  /** El nivel al que pertenece (null en las materias de una especialidad). */
  nivel: NivelN | null;
  especialidad?: EspecialidadId;
  /** Materia de especialidad que pide el Nivel 3 terminado. */
  avanzada?: boolean;
  orden: number;
  titulo: string;
  resumen: string;
  /** Pasajes centrales (solo para mostrar). */
  base?: string;
  /** El versículo de memoria de la materia. */
  memoria?: string;
  /** El curso de la Escuela que esta materia renueva. */
  antes?: string;
  lecciones: LeccionDef[];
  silabo?: Silabo;
  /** Con su contenido escrito, revisado y publicado. Las demás se muestran «en preparación». */
  disponible: boolean;
};

export type EtapaDef = { id: EtapaId; nombre: string; base: string; idea: string; niveles: NivelN[] };
export type NivelDef = {
  n: NivelN;
  nombre: string;
  etapa: EtapaId;
  para: string;
  base: string;
  ritmo: string;
  /** El documento que recibe al terminar el nivel. */
  recibe: string;
  descripcion: string;
  requisitos: string[];
  materias: MateriaDef[];
};
export type EspecialidadDef = { id: EspecialidadId; nombre: string; resumen: string; materias: MateriaDef[] };

// ---------------------------------------------------------------- notas y exámenes

/** Se aprueba con 70 sobre 100 (la materia y también su examen final). */
export const APRUEBA = 70;
/** «Con honores» y Cuadro de honor: promedio del nivel desde 90. */
export const HONORES = 90;

export type Calificacion = "Excelente" | "Muy bien" | "Bien" | "No aprobado";
export function calificacion(nota: number): Calificacion {
  if (nota >= 90) return "Excelente";
  if (nota >= 80) return "Muy bien";
  if (nota >= APRUEBA) return "Bien";
  return "No aprobado";
}

export type Medalla = "oro" | "plata" | "bronce";
/** La medalla académica de un examen o de una materia (oro desde 95, plata desde 85, bronce desde 70). */
export function medallaDe(nota: number): Medalla | null {
  if (nota >= 95) return "oro";
  if (nota >= 85) return "plata";
  if (nota >= APRUEBA) return "bronce";
  return null;
}
export const NOMBRE_MEDALLA: Record<Medalla, string> = { oro: "Medalla de oro", plata: "Medalla de plata", bronce: "Medalla de bronce" };

/** Los pesos de la nota de una materia (suman 100). */
export type Pesos = { final: number; repasos: number; versiculo: number; mini: number; escritos: number };
export const PESOS_NIVEL: Record<NivelN, Pesos> = {
  1: { final: 70, repasos: 15, versiculo: 15, mini: 0, escritos: 0 },
  2: { final: 50, repasos: 0, versiculo: 10, mini: 25, escritos: 15 },
  3: { final: 40, repasos: 0, versiculo: 10, mini: 20, escritos: 30 },
  4: { final: 40, repasos: 0, versiculo: 10, mini: 20, escritos: 30 },
  5: { final: 40, repasos: 0, versiculo: 10, mini: 20, escritos: 30 },
};
export const NOMBRE_COMPONENTE: Record<keyof Pesos, string> = {
  final: "Examen final",
  repasos: "Repasos de las lecciones",
  versiculo: "Versículo de memoria",
  mini: "Mini pruebas",
  escritos: "Escritos",
};

export function pesosDe(m: MateriaDef): Pesos {
  return PESOS_NIVEL[m.nivel ?? 3];
}

export type Componentes = Partial<Record<keyof Pesos, number>>;
/** La nota de la materia: el promedio ponderado de sus componentes (0 a 100, redondeada). */
export function notaMateria(pesos: Pesos, c: Componentes): number {
  let suma = 0;
  let total = 0;
  for (const k of Object.keys(pesos) as (keyof Pesos)[]) {
    const p = pesos[k];
    if (!p) continue;
    total += p;
    suma += p * Math.max(0, Math.min(100, c[k] ?? 0));
  }
  return total ? Math.round(suma / total) : 0;
}

/** La materia se aprueba con 70 de nota y con el examen final aprobado. */
export function materiaAprobada(nota: number, final: number): boolean {
  return nota >= APRUEBA && final >= APRUEBA;
}

/** El promedio de un nivel (de las notas de sus materias aprobadas). */
export function promedio(notas: number[]): number {
  return notas.length ? Math.round(notas.reduce((a, b) => a + b, 0) / notas.length) : 0;
}

/** El examen final de cada nivel: Parte A objetiva y Parte B escrita. */
export type MedidaExamen = {
  /** Preguntas objetivas del examen y tamaño mínimo del banco (3 veces el examen). */
  objetivas: number;
  banco: number;
  /** Respuestas escritas del examen (cortas; en los Niveles 3–5, una es un escrito breve). */
  escritas: number;
  /** Peso de la parte objetiva (la escrita es el resto). */
  pesoObjetiva: number;
  /** Segundos de cada pregunta objetiva (el reloj lo lleva el servidor). */
  segundos: number;
  /** Minutos para cada respuesta escrita corta. */
  minutosEscrita: number;
  /** Cuántas de las escritas son escritos breves (80 a 300 palabras): en el final de los Niveles 3 a 5, una. */
  breves?: number;
  /** Minutos para cada escrito breve del examen. */
  minutosBreve?: number;
  /** El tiempo extra (×1,5) que dio la Administración: lo usa también el tiempo de cada pregunta. */
  factor?: number;
};
export const EXAMEN_FINAL: Record<NivelN, MedidaExamen> = {
  1: { objetivas: 10, banco: 30, escritas: 1, pesoObjetiva: 80, segundos: 60, minutosEscrita: 6 },
  2: { objetivas: 15, banco: 45, escritas: 2, pesoObjetiva: 70, segundos: 60, minutosEscrita: 6 },
  3: { objetivas: 20, banco: 60, escritas: 2, breves: 1, pesoObjetiva: 60, segundos: 60, minutosEscrita: 6, minutosBreve: 15 },
  4: { objetivas: 20, banco: 60, escritas: 2, breves: 1, pesoObjetiva: 60, segundos: 60, minutosEscrita: 6, minutosBreve: 15 },
  5: { objetivas: 20, banco: 60, escritas: 2, breves: 1, pesoObjetiva: 60, segundos: 60, minutosEscrita: 6, minutosBreve: 15 },
};
export function examenDe(m: MateriaDef): MedidaExamen {
  return EXAMEN_FINAL[m.nivel ?? 3];
}
/** Los minutos de una respuesta escrita del examen según su tipo (corta o escrito breve). */
export function minutosDe(medida: MedidaExamen, tipo: TipoEscrita): number {
  // (el trabajo final de una especialidad no entra en los exámenes)
  return tipo === "corta" ? medida.minutosEscrita : (medida.minutosBreve ?? medida.minutosEscrita);
}
/** La parte escrita de un examen dicha para el alumno, por ejemplo «una respuesta corta (6 minutos) y un escrito breve…». */
export function parteEscrita(medida: MedidaExamen): string {
  const breves = Math.min(medida.breves ?? 0, medida.escritas);
  const cortas = medida.escritas - breves;
  const partes: string[] = [];
  if (cortas === 1) partes.push(breves ? `una respuesta corta (${medida.minutosEscrita} minutos)` : `una respuesta escrita (${medida.minutosEscrita} minutos)`);
  else if (cortas > 1) partes.push(`${cortas} respuestas ${breves ? "cortas" : "escritas"} (${medida.minutosEscrita} minutos cada una)`);
  const mb = minutosDe(medida, "breve");
  if (breves === 1) partes.push(`un escrito breve de ${ESCRITA.breve.min} a ${ESCRITA.breve.max} palabras (${mb} minutos)`);
  else if (breves > 1) partes.push(`${breves} escritos breves de ${ESCRITA.breve.min} a ${ESCRITA.breve.max} palabras (${mb} minutos cada uno)`);
  return partes.join(" y ");
}

/**
 * Las mini pruebas (Nivel 2 en adelante): cada 3 lecciones, 6 preguntas de un banco de 18, de 60 a 120 segundos cada una, sin
 * escritas. Hay 3 intentos (cada uno con preguntas nuevas) y cuenta el mejor. Muestran la revisión al terminar: sirven
 * para aprender. Su nota, en promedio, es el componente «mini» de la materia (las que no se dieron cuentan 0).
 */
// (desde la revisión del 16-nov dan 60 segundos de base, como el examen final: son de práctica, no de velocidad)
export const MINI_PRUEBA = { objetivas: 6, banco: 18, segundos: 60, intentos: 3, cada: 3 } as const;
export const MEDIDA_MINI: MedidaExamen = {
  objetivas: MINI_PRUEBA.objetivas, banco: MINI_PRUEBA.banco, escritas: 0, pesoObjetiva: 100, segundos: MINI_PRUEBA.segundos, minutosEscrita: 0,
};
/** Las mini pruebas de una materia: su número y las lecciones que mide (de 3 en 3). Ninguna si el nivel no las pesa. */
export function miniPruebasDe(m: MateriaDef): { n: number; lecciones: number[] }[] {
  if (!pesosDe(m).mini) return [];
  const out: { n: number; lecciones: number[] }[] = [];
  for (let i = 0; i < m.lecciones.length; i += MINI_PRUEBA.cada) {
    out.push({ n: out.length + 1, lecciones: m.lecciones.slice(i, i + MINI_PRUEBA.cada).map((_, j) => i + j + 1) });
  }
  return out;
}

/**
 * El escrito breve (Nivel 2 en adelante): de 80 a 300 palabras, con ideas y citas, que corrige el sistema (y puede
 * revisar la Administración). Se entrega después de las lecciones; hay 2 entregas y cuenta la mejor. Es el componente
 * «escritos» de la materia.
 */
export const ESCRITO_BREVE = { entregas: 2 } as const;
/**
 * El trabajo final de una especialidad (docs/academia.md, «El certificado de especialidad»): un escrito de 300 a 1.200
 * palabras que integra sus cinco materias. Se entrega con las cinco aprobadas; hay 3 entregas y cuenta la mejor (sin
 * él aprobado no hay certificado, por eso tiene una entrega más que el escrito breve).
 */
export const TRABAJO_ESPECIALIDAD = { entregas: 3 } as const;
/** La nota del certificado de especialidad: el promedio de sus materias y del trabajo final, todos con el mismo peso. */
export function notaEspecialidad(materias: number[], trabajo: number): number {
  const todas = [...materias, trabajo];
  return Math.round(todas.reduce((s, n) => s + n, 0) / todas.length);
}
/** El título del certificado de una especialidad completa. */
export const tituloEspecialidad = (nombre: string) => `Certificado de Especialidad en ${nombre}`;
export function tieneEscritoBreve(m: MateriaDef): boolean {
  return pesosDe(m).escritos > 0;
}

/** Una mini prueba en la página de la materia. */
export type MiniEstado = { n: number; lecciones: number[]; intentos: number; mejor: number | null; enCurso: boolean; falta: string[]; cerrado: string | null };
/** El escrito breve en la página de la materia. */
export type BreveEstado = { entregas: number; maxEntregas: number; mejor: number | null; falta: string[] };
/**
 * El tiempo extra (lo activa la Administración para quien lo necesita: docs/academia.md, «Tiempo y honradez»): el mismo
 * examen, con cada reloj 1,5 veces más largo.
 */
export const FACTOR_TIEMPO_EXTRA = 1.5;
export function conTiempoExtra(medida: MedidaExamen): MedidaExamen {
  return {
    ...medida,
    segundos: Math.round(medida.segundos * FACTOR_TIEMPO_EXTRA),
    minutosEscrita: Math.ceil(medida.minutosEscrita * FACTOR_TIEMPO_EXTRA),
    ...(medida.minutosBreve ? { minutosBreve: Math.ceil(medida.minutosBreve * FACTOR_TIEMPO_EXTRA) } : {}),
    factor: FACTOR_TIEMPO_EXTRA,
  };
}

/**
 * El tiempo de cada pregunta objetiva (docs/academia.md, «El tiempo de cada pregunta»; revisión del 16-nov en
 * docs/academia-auditoria.md): lo que pide leerla con calma
 * (130 palabras por minuto, el ritmo de un lector promedio en el teléfono), decidir (25 s) y pensar según su nivel de
 * Bloom. Nunca menos que el tiempo base del examen ni más del doble; con tiempo extra, por 1,5. Así una pregunta corta de
 * memoria sigue con el tiempo base y un caso largo para analizar tiene más.
 */
export const PALABRAS_POR_MINUTO_EXAMEN = 130;
export const SEGUNDOS_PARA_DECIDIR = 25;
export const SEGUNDOS_POR_BLOOM: Record<Bloom, number> = { recordar: 0, comprender: 5, aplicar: 20, analizar: 30, evaluar: 30, crear: 30 };
export function segundosDePregunta(p: { texto: string; correcta: string; falsas: readonly string[]; bloom?: Bloom }, medida: Pick<MedidaExamen, "segundos" | "factor">): number {
  const palabras = [p.texto, p.correcta, ...p.falsas].reduce((a, t) => a + t.split(/\s+/).filter(Boolean).length, 0);
  const pide = (palabras / PALABRAS_POR_MINUTO_EXAMEN) * 60 + SEGUNDOS_PARA_DECIDIR + (p.bloom ? SEGUNDOS_POR_BLOOM[p.bloom] ?? 0 : 0);
  const conFactor = Math.ceil((pide * (medida.factor ?? 1)) / 5) * 5;
  return Math.min(2 * medida.segundos, Math.max(medida.segundos, conFactor));
}
/** El tiempo de las preguntas dicho para el alumno: «de 60 a 120 segundos cada una, según su largo y su dificultad». */
export const textoSegundos = (medida: Pick<MedidaExamen, "segundos">) => `de ${medida.segundos} a ${2 * medida.segundos} segundos cada una, según su largo y su dificultad`;
/** Margen por la conexión: una respuesta que llega hasta 6 s después del tiempo todavía vale. */
export const MARGEN_SEGUNDOS = 6;
/** Margen de la parte escrita (escribir en el teléfono). */
export const MARGEN_ESCRITA_SEGUNDOS = 45;

/** La nota del examen: el promedio ponderado de sus dos partes. */
export function notaExamen(objetiva: number, escrita: number, pesoObjetiva: number): number {
  return Math.round((objetiva * pesoObjetiva + escrita * (100 - pesoObjetiva)) / 100);
}

/** Minutos de espera para repetir un examen final reprobado: después del 1.er intento y del 2.º en adelante. */
export const ESPERA_FINAL_MIN = [30, 1440] as const;
/** Desde el tercer fallo hay que volver a abrir todas las lecciones antes de intentar de nuevo. */
export const FALLOS_PARA_REPASAR = 3;
export function esperaFinalMin(fallos: number): number {
  if (fallos <= 0) return 0;
  return ESPERA_FINAL_MIN[Math.min(ESPERA_FINAL_MIN.length - 1, fallos - 1)];
}

/** Los límites de palabras de las respuestas escritas (se escriben desde el teléfono). */
export const ESCRITA = { corta: { min: 15, max: 60 }, breve: { min: 80, max: 300 }, trabajo: { min: 300, max: 1200 } } as const;
export type TipoEscrita = keyof typeof ESCRITA;

// ---------------------------------------------------------------- el cierre de cada nivel

/**
 * El examen integral de cada nivel: preguntas de los bancos de todas sus materias, repartidas por materia, y respuestas
 * escritas de materias distintas. Se da con todas las materias del nivel aprobadas y repasa el nivel entero.
 */
export const EXAMEN_INTEGRAL: Record<NivelN, MedidaExamen> = {
  1: { objetivas: 40, banco: 120, escritas: 2, pesoObjetiva: 80, segundos: 60, minutosEscrita: 6 },
  2: { objetivas: 40, banco: 120, escritas: 2, pesoObjetiva: 70, segundos: 60, minutosEscrita: 6 },
  3: { objetivas: 40, banco: 120, escritas: 2, pesoObjetiva: 60, segundos: 60, minutosEscrita: 6 },
  4: { objetivas: 40, banco: 120, escritas: 2, pesoObjetiva: 60, segundos: 60, minutosEscrita: 6 },
  5: { objetivas: 40, banco: 120, escritas: 2, pesoObjetiva: 60, segundos: 60, minutosEscrita: 6 },
};
/** El examen integral se aprueba con 75 (más que una materia: abarca todo el nivel). */
export const APRUEBA_INTEGRAL = 75;
/** Versículos de memoria aprendidos que pide cada nivel para cerrarlo. */
export const VERSICULOS_NIVEL: Record<NivelN, number> = { 1: 4, 2: 8, 3: 0, 4: 0, 5: 0 };

/** El pacto con que se cierra un nivel (como el pacto de cada clase de Saddleback CLASS). */
export type PactoDef = { titulo: string; base: string; intro: string; compromisos: { texto: string; ref: string }[]; cierre: string };
export const PACTOS: Partial<Record<NivelN, PactoDef>> = {
  1: {
    titulo: "El pacto del creyente",
    base: "Josué 24:15",
    intro: "Con gratitud por lo que Dios hizo en mi vida por medio de Jesucristo, y con la ayuda del Espíritu Santo, me comprometo a:",
    compromisos: [
      { texto: "Seguir a Jesucristo como mi Señor y Salvador todos los días de mi vida.", ref: "Lucas 9:23" },
      { texto: "Buscar a Dios cada día en la oración y en la lectura de su Palabra.", ref: "Josué 1:8" },
      { texto: "Obedecer al Señor en el bautismo y participar de la Santa Cena con un corazón preparado.", ref: "Mateo 28:19" },
      { texto: "Congregarme con fidelidad, servir con mis dones y dar con alegría.", ref: "Hebreos 10:25" },
      { texto: "Vivir en santidad, confesar pronto mis pecados y perdonar como fui perdonado.", ref: "Efesios 4:32" },
      { texto: "Compartir mi fe y acompañar a otros en sus primeros pasos con Cristo.", ref: "Marcos 16:15" },
    ],
    cierre: "Pero yo y mi casa serviremos a Jehová (Josué 24:15).",
  },
};

/** El examen de suficiencia: la única manera de aprobar una materia sin cursarla (más exigente que el final). */
export const SUFICIENCIA = {
  objetivas: 25,
  escritas: 2,
  apruebaObjetiva: 85,
  apruebaEscrita: 75,
  /** Una sola oportunidad por materia: si no aprueba, la cursa. */
  intentos: 1,
  /** En los Niveles 3 a 5, como máximo la mitad de las materias por suficiencia o convalidación. */
  topeNivelesAltos: 0.5,
} as const;

/** La suficiencia se aprueba con las dos partes a la vez: 85 la objetiva y 75 la escrita. */
export function apruebaSuficiencia(objetiva: number, escrita: number): boolean {
  return objetiva >= SUFICIENCIA.apruebaObjetiva && escrita >= SUFICIENCIA.apruebaEscrita;
}

// ---------------------------------------------------------------- la prueba diagnóstica

/**
 * La prueba diagnóstica: 2 preguntas de cada materia con contenido, de 45 a 90 segundos cada una según su largo y su
 * dificultad. Solo sugiere por dónde
 * empezar y qué materias se podrían aprobar por suficiencia: no da nada por aprobado. Se repite cada 30 días.
 */
/**
 * La prueba diagnóstica mide la etapa Raíces (Niveles 1 y 2), la de quien llega a la academia: así no crece con cada
 * materia nueva de los niveles altos. Quien ya completó el Nivel 2 recibe la sugerencia de seguir con el Nivel 3.
 */
export const DIAGNOSTICO = { porMateria: 2, segundos: 45, diasEntre: 30, niveles: [1, 2] } as const;
export function entraEnDiagnostico(m: MateriaDef): boolean {
  return m.nivel != null && (DIAGNOSTICO.niveles as readonly number[]).includes(m.nivel);
}

export type DiagnosticoMateria = { id: string; titulo: string; nivel: number | null; aciertos: number; de: number };
export type SugerenciaDiagnostico = {
  texto: string;
  /** El nivel que le toca (el siguiente al último completo). */
  nivel: number | null;
  empezar: { materiaId: string; titulo: string } | null;
  /** Las materias de ese nivel que respondió todas bien: podría aprobarlas por suficiencia. */
  suficiencia: { materiaId: string; titulo: string }[];
};
export type DiagnosticoVista = {
  fecha: string;
  aciertos: number;
  de: number;
  porMateria: DiagnosticoMateria[];
  sugerencia: SugerenciaDiagnostico;
  /** Desde cuándo se puede repetir (null si ya se puede). */
  repetirDesde: string | null;
};

const listaY = (xs: string[]) => (xs.length <= 1 ? xs.join("") : `${xs.slice(0, -1).join(", ")} y ${xs[xs.length - 1]}`);

/**
 * La sugerencia de la prueba diagnóstica: el nivel que le toca, por qué materia empezar (la primera que ni domina ni
 * aprobó) y cuáles podría aprobar por suficiencia (las que respondió todas bien y todavía puede darla: no la dio ni dio
 * su examen final; las de `sinSuficiencia` se cursan aunque las domine). Sin base de datos.
 */
export function sugerenciaDiagnostico(
  porMateria: DiagnosticoMateria[],
  nivelesCompletos: number[],
  aprobadas: string[],
  sinSuficiencia: readonly string[] = [],
): SugerenciaDiagnostico {
  const hecho = nivelesCompletos.length ? Math.max(...nivelesCompletos) : 0;
  const nivel = NIVELES.find((n) => n.n === hecho + 1);
  if (!nivel || !nivel.materias.some((m) => m.disponible)) {
    return { texto: "Ya completaste los niveles que tienen contenido. Te avisaremos cuando se abra el siguiente.", nivel: nivel?.n ?? null, empezar: null, suficiencia: [] };
  }
  const aprob = new Set(aprobadas);
  const pendientes = nivel.materias.filter((m) => m.disponible && !aprob.has(m.id));
  if (!pendientes.length) {
    return { texto: `Ya aprobaste las materias del Nivel ${nivel.n}: te falta cerrar el nivel con su examen integral y lo que pide.`, nivel: nivel.n, empezar: null, suficiencia: [] };
  }
  const res = new Map(porMateria.map((r) => [r.id, r]));
  const cerradas = new Set(sinSuficiencia);
  const domina = pendientes.filter((m) => {
    const r = res.get(m.id);
    return !!r && r.de > 0 && r.aciertos === r.de && !cerradas.has(m.id);
  });
  const suficiencia = domina.map((m) => ({ materiaId: m.id, titulo: m.titulo }));
  const primera = pendientes.find((m) => !domina.includes(m));
  const empezar = primera ? { materiaId: primera.id, titulo: primera.titulo } : null;
  const nombre = `el Nivel ${nivel.n} · ${nivel.nombre}`;
  let texto: string;
  if (!empezar) {
    texto = `Respondiste bien todas las preguntas de ${nombre}. Puedes aprobar sus materias por suficiencia: una sola vez por materia, con ${SUFICIENCIA.objetivas} preguntas y ${SUFICIENCIA.escritas} respuestas escritas (se aprueba con ${SUFICIENCIA.apruebaObjetiva} y ${SUFICIENCIA.apruebaEscrita}). El examen integral del nivel se da igual.`;
  } else if (domina.length) {
    texto = `Empieza por «${empezar.titulo}». Parece que ya conoces ${listaY(domina.map((m) => `«${m.titulo}»`))}: si quieres, da su examen de suficiencia; si no, cúrsala como las demás.`;
  } else {
    texto = `Empieza por «${empezar.titulo}» y sigue en orden: ${nombre} es para ti.`;
  }
  return { texto, nivel: nivel.n, empezar, suficiencia };
}

// ---------------------------------------------------------------- el repaso espaciado del versículo

/** El versículo de memoria vuelve a los 1, 3, 7 y 21 días de aprenderlo; al pasar el último repaso queda dominado. */
export const REPASO_VERSICULO_DIAS = [1, 3, 7, 21] as const;
/** La caja de quien pasó todos los repasos. */
export const CAJA_DOMINADO = REPASO_VERSICULO_DIAS.length + 1;

/** La caja después de un repaso (bien: la siguiente; mal: vuelve a la primera) y en cuántos días vuelve (null: dominado). */
export function siguienteRepaso(caja: number, bien: boolean): { caja: number; dias: number | null } {
  if (!bien) return { caja: 1, dias: REPASO_VERSICULO_DIAS[0] };
  const nueva = Math.min(Math.max(1, caja) + 1, CAJA_DOMINADO);
  return { caja: nueva, dias: nueva >= CAJA_DOMINADO ? null : REPASO_VERSICULO_DIAS[nueva - 1] };
}

/** Un versículo aprendido, con su repaso. */
export type VersiculoRepaso = { materiaId: string; materia: string; ref: string; caja: number; toca: boolean; proximo: string | null; dominado: string | null };
export type RepasoVersiculos = { versiculos: VersiculoRepaso[]; pendientes: number; dominados: number };

/** El versículo de memoria: puntaje según los intentos para ordenarlo (100, 80, 60 como mínimo). */
export function puntajeVersiculo(intentosFallidos: number): number {
  return Math.max(60, 100 - 20 * Math.max(0, intentosFallidos));
}

// ---------------------------------------------------------------- estatus

export type EstatusAlumno = "aspirante" | "activo" | "pausa" | "egresado" | "graduado" | "retirado";
export const NOMBRE_ESTATUS: Record<EstatusAlumno, string> = {
  aspirante: "Aspirante",
  activo: "Estudiante activo",
  pausa: "Estudiante en pausa",
  egresado: "Egresado",
  graduado: "Graduado de la Academia",
  retirado: "Retirado",
};
/** Días sin estudiar para pasar a «en pausa» (vuelve a activo solo con estudiar). */
export const DIAS_PAUSA = 30;
/** Días para pedir la revisión de un examen (una vez por examen), desde que se cerró el intento. */
export const DIAS_APELACION = 7;

/** Mientras la academia está en vista previa, la ven estos roles (shared/roles.ts). */
export { ROLES_VISTA_PREVIA, veVistaPrevia } from "./academia-acceso";
/** Quienes administran la academia: revisan y cambian notas y leen las lecciones sin inscribirse (solo la Administración). */
export const ROLES_REVISION = ["admin"] as const;
export function puedeRevisar(role: string | null | undefined): boolean {
  return !!role && (ROLES_REVISION as readonly string[]).includes(role);
}

// ---------------------------------------------------------------- citas bíblicas

// Viven en shared/citas.ts (liviano: lo usan también el cuaderno y la Biblioteca sin cargar el catálogo).
export { citaVisible, enlaceBiblia, parsearCita, type Cita } from "./citas";
import { aplicarComplementos } from "./academia-complementos";

// ---------------------------------------------------------------- el catálogo

const lecciones = (materia: string, defs: [titulo: string, base: string][], minutos = 7): LeccionDef[] =>
  defs.map(([titulo, base], i) => ({ id: `${materia}-${i + 1}`, titulo, minutos, base }));

const enPreparacion = (nivel: NivelN, orden: number, id: string, titulo: string, resumen: string, extra: Partial<MateriaDef> = {}): MateriaDef => ({
  id, nivel, orden, titulo, resumen, lecciones: [], disponible: false, ...extra,
});

export const ETAPAS: EtapaDef[] = [
  { id: "raices", nombre: "Raíces", base: "Colosenses 2:7", idea: "Arraigados en Cristo: lo que todo creyente necesita.", niveles: [1, 2] },
  { id: "servicio", nombre: "Servicio", base: "Efesios 4:12", idea: "Preparados para la obra del ministerio.", niveles: [3] },
  { id: "ministerio", nombre: "Ministerio", base: "2 Timoteo 2:2", idea: "Formados para enseñar también a otros.", niveles: [4, 5] },
];

const SALVACION: MateriaDef = {
  id: "n1-salvacion",
  nivel: 1,
  orden: 1,
  titulo: "La salvación: nueva vida en Cristo",
  resumen: "Quién es Jesús, qué es el evangelio, cómo se recibe la salvación y por qué puedes estar seguro.",
  base: "Juan 3:16; Efesios 2:8-9",
  memoria: "Juan 3:16",
  lecciones: lecciones("n1-salvacion", [
    ["¿Quién es Jesús?", "Juan 1:1-14; Mateo 16:13-17"],
    ["El evangelio: el pecado y el regalo de Dios", "Romanos 3:23; 6:23; Juan 3:16"],
    ["Arrepentimiento y fe", "Hechos 3:19; Efesios 2:8-9; Romanos 10:9-10"],
    ["La seguridad de la salvación y el nuevo nacimiento", "Juan 3:3-7; 2 Corintios 5:17; 1 Juan 5:11-13"],
  ]),
  silabo: {
    proposito:
      "Que el nuevo creyente entienda quién es Jesús, qué es el evangelio y cómo se recibe la salvación, y que viva con la seguridad que da la Palabra de Dios. Es el cimiento de todo lo demás: sin él no hay edificio (1 Corintios 3:11).",
    objetivos: [
      { id: "o1", texto: "Explicar quién es Jesús según Juan 1 y la confesión de Pedro.", bloom: "comprender" },
      { id: "o2", texto: "Describir el problema del pecado y el regalo de Dios en Cristo.", bloom: "comprender" },
      { id: "o3", texto: "Explicar con sus palabras qué son el arrepentimiento y la fe y cómo se recibe la salvación.", bloom: "aplicar" },
      { id: "o4", texto: "Explicar qué es nacer de nuevo y en qué se basa la seguridad de la salvación.", bloom: "comprender" },
      { id: "o5", texto: "Recitar Juan 3:16 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "Las verdades centrales del evangelio: Cristo, el pecado, la gracia, la fe y el nuevo nacimiento.",
      ser: "Una fe personal en Jesús y la paz de saberse hijo de Dios.",
      hacer: "Explicar el evangelio con sus propias palabras y con la Biblia en la mano.",
    },
    bibliografia: {
      basica: [
        { autor: "John Stott", titulo: "Cristianismo básico", editorial: "Certeza" },
        { autor: "Billy Graham", titulo: "Paz con Dios" },
      ],
      complementaria: [
        { autor: "Myer Pearlman", titulo: "Teología bíblica y sistemática", editorial: "Vida", nota: "Capítulos de Cristo y de la salvación" },
        { autor: "Pablo Hoff", titulo: "Teología evangélica", editorial: "Vida" },
        { autor: "Donald C. Stamps (ed.)", titulo: "Biblia de estudio Vida Plena (RVR1960)", editorial: "Vida" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Juan (parte 1)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=OU16-2Sg_CQ", minutos: 10 },
      { tipo: "lectura", titulo: "El Evangelio de Juan, capítulos 1 a 3", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Juan&cap=1" },
    ],
  },
  disponible: true,
};

const ORACION: MateriaDef = {
  id: "n1-oracion",
  nivel: 1,
  orden: 2,
  titulo: "La oración: hablar con Dios",
  resumen: "Qué es orar, el modelo del Padre Nuestro, la oración de fe y el tiempo diario con Dios.",
  base: "Mateo 6:5-13; Filipenses 4:6-7",
  memoria: "Filipenses 4:6",
  lecciones: lecciones("n1-oracion", [
    ["Qué es orar", "Mateo 6:5-8"],
    ["El Padre Nuestro", "Mateo 6:9-13"],
    ["Orar con fe y perseverar", "Lucas 18:1-8; Marcos 11:24"],
    ["Mi tiempo diario con Dios y el ayuno", "Marcos 1:35; Mateo 6:16-18"],
  ]),
  silabo: {
    proposito:
      "Que el nuevo creyente aprenda a hablar con Dios como su Padre: qué es orar, cómo orar según el modelo que dio Jesús, cómo perseverar con fe y cómo tener un tiempo diario con Dios, incluido el ayuno bíblico. La oración es la respiración de la vida cristiana (1 Tesalonicenses 5:17).",
    objetivos: [
      { id: "o1", texto: "Explicar qué es la oración y las actitudes que enseñó Jesús para orar (Mateo 6:5-8).", bloom: "comprender" },
      { id: "o2", texto: "Describir las partes del Padre Nuestro y lo que enseña cada una.", bloom: "comprender" },
      { id: "o3", texto: "Aplicar los principios de la oración con fe y la perseverancia (Lucas 18:1-8; Marcos 11:22-24).", bloom: "aplicar" },
      { id: "o4", texto: "Organizar un tiempo diario con Dios y explicar el propósito bíblico del ayuno.", bloom: "aplicar" },
      { id: "o5", texto: "Recitar Filipenses 4:6 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "Lo que la Biblia enseña sobre la oración, el Padre Nuestro y el ayuno.",
      ser: "Una relación diaria y confiada con Dios como Padre.",
      hacer: "Orar cada día con un plan sencillo e interceder por otros.",
    },
    bibliografia: {
      basica: [
        { autor: "Richard J. Foster", titulo: "Celebración de la disciplina", editorial: "Peniel", nota: "Capítulos de la oración y el ayuno" },
        { autor: "E. M. Bounds", titulo: "El poder a través de la oración" },
      ],
      complementaria: [
        { autor: "Donald C. Stamps (ed.)", titulo: "Biblia de estudio Vida Plena (RVR1960)", editorial: "Vida" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Mateo (parte 1)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=3jUPGTb80ms", minutos: 8 },
      { tipo: "lectura", titulo: "El Sermón del monte: Mateo 6", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Mateo&cap=6" },
    ],
  },
  disponible: true,
};

const BIBLIA: MateriaDef = {
  id: "n1-biblia",
  nivel: 1,
  orden: 3,
  titulo: "La Biblia, Palabra de Dios",
  resumen: "Qué es la Biblia, cómo nos llegó, cómo está organizada y cómo leerla y obedecerla cada día.",
  base: "2 Timoteo 3:16-17; Salmos 119:105",
  memoria: "Salmos 119:105",
  lecciones: lecciones("n1-biblia", [
    ["Qué es la Biblia y cómo nos llegó", "2 Timoteo 3:16-17; 2 Pedro 1:20-21"],
    ["Cómo está organizada", "Lucas 24:44"],
    ["Leerla cada día", "Salmos 1:1-3; Josué 1:8"],
    ["Meditar y obedecer", "Santiago 1:22-25"],
  ]),
  silabo: {
    proposito:
      "Que el nuevo creyente conozca qué es la Biblia, cómo nos llegó y cómo está organizada, y que adquiera el hábito de leerla, meditarla y obedecerla cada día. La Palabra es el alimento del alma (Mateo 4:4).",
    objetivos: [
      { id: "o1", texto: "Explicar qué significa que la Biblia es inspirada por Dios y para qué nos fue dada.", bloom: "comprender" },
      { id: "o2", texto: "Describir cómo está organizada la Biblia y encontrar una cita por libro, capítulo y versículo.", bloom: "recordar" },
      { id: "o3", texto: "Aplicar un plan sencillo para leer la Biblia cada día.", bloom: "aplicar" },
      { id: "o4", texto: "Explicar por qué hay que meditar la Palabra y ponerla por obra (Santiago 1:22-25).", bloom: "comprender" },
      { id: "o5", texto: "Recitar Salmos 119:105 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "Qué es la Biblia, cómo nos llegó y cómo está organizada.",
      ser: "Amor por la Palabra y confianza en lo que Dios dice.",
      hacer: "Leer, meditar y obedecer la Biblia cada día.",
    },
    bibliografia: {
      basica: [
        { autor: "Henrietta C. Mears", titulo: "Lo que nos dice la Biblia", editorial: "Vida" },
        { autor: "Gordon Fee y Douglas Stuart", titulo: "La lectura eficaz de la Biblia", editorial: "Vida" },
      ],
      complementaria: [
        { autor: "Henry H. Halley", titulo: "Compendio manual de la Biblia" },
        { autor: "Josh McDowell", titulo: "Nueva evidencia que demanda un veredicto", editorial: "Mundo Hispano", nota: "Sobre la confiabilidad de la Biblia" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "¿Qué es la Biblia? ¿Cómo se formó?", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=uMOc-YI0iaM" },
      { tipo: "lectura", titulo: "El Salmo 1", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Salmos&cap=1" },
    ],
  },
  disponible: true,
};

const ESPIRITU: MateriaDef = {
  id: "n1-espiritu",
  nivel: 1,
  orden: 4,
  titulo: "El Espíritu Santo en mi vida",
  resumen: "Quién es el Espíritu Santo, lo que hace en el creyente, la promesa del poder y cómo andar en el Espíritu.",
  base: "Juan 14:16-17; Hechos 1:8",
  memoria: "Hechos 1:8",
  lecciones: lecciones("n1-espiritu", [
    ["Quién es el Espíritu Santo", "Juan 14:16-17, 26"],
    ["Su obra en el creyente", "Juan 16:7-13; Romanos 8:14-16"],
    ["La promesa del poder", "Hechos 1:8; 2:1-4, 38-39"],
    ["Andar en el Espíritu", "Gálatas 5:16-25"],
  ]),
  silabo: {
    proposito:
      "Que el nuevo creyente conozca al Espíritu Santo como una Persona divina, entienda su obra en la vida del creyente, reciba la promesa del poder para ser testigo y aprenda a andar en el Espíritu.",
    objetivos: [
      { id: "o1", texto: "Explicar quién es el Espíritu Santo: una Persona divina, el Consolador prometido.", bloom: "comprender" },
      { id: "o2", texto: "Describir la obra del Espíritu en el creyente: convencer, regenerar, dar testimonio, guiar y ayudar.", bloom: "comprender" },
      { id: "o3", texto: "Explicar la promesa del bautismo con el Espíritu Santo y lo que ocurrió en Pentecostés.", bloom: "comprender" },
      { id: "o4", texto: "Aplicar lo que significa andar en el Espíritu y reconocer su fruto.", bloom: "aplicar" },
      { id: "o5", texto: "Recitar Hechos 1:8 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "La persona y la obra del Espíritu Santo según la Escritura.",
      ser: "Una vida llena del Espíritu, que da su fruto.",
      hacer: "Testificar de Cristo con el poder del Espíritu y caminar guiado por Él.",
    },
    bibliografia: {
      basica: [
        { autor: "Stanley M. Horton", titulo: "El Espíritu Santo revelado en la Biblia", editorial: "Vida" },
        { autor: "Ralph M. Riggs", titulo: "El Espíritu mismo" },
      ],
      complementaria: [
        { autor: "Myer Pearlman", titulo: "Teología bíblica y sistemática", editorial: "Vida", nota: "Capítulo del Espíritu Santo" },
        { autor: "Guy P. Duffield y Nathaniel M. Van Cleave", titulo: "Fundamentos de teología pentecostal", editorial: "Foursquare Media" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Hechos (parte 1)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=5h7Q0EK-m8I" },
      { tipo: "lectura", titulo: "Hechos 1: la promesa del Espíritu", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Hechos&cap=1" },
    ],
  },
  disponible: true,
};

const BAUTISMO_CENA: MateriaDef = {
  id: "n1-bautismo-cena",
  nivel: 1,
  orden: 5,
  titulo: "El bautismo y la Santa Cena",
  resumen: "Las dos ordenanzas que Jesús dejó a su iglesia: qué significan y cómo se viven.",
  base: "Mateo 28:19; 1 Corintios 11:23-26",
  memoria: "Romanos 6:4",
  lecciones: lecciones("n1-bautismo-cena", [
    ["El bautismo en agua", "Mateo 28:19; Romanos 6:3-4"],
    ["Quién se bautiza y cómo", "Hechos 2:38-41; 8:36-38"],
    ["La Santa Cena", "Lucas 22:19-20"],
    ["Participar con el corazón preparado", "1 Corintios 11:23-29"],
  ]),
  silabo: {
    proposito:
      "Que el nuevo creyente entienda las dos ordenanzas que Jesús dejó a su iglesia, el bautismo en agua y la Santa Cena: lo que significan según la Escritura y cómo vivirlas con fe y obediencia. No salvan por sí mismas: son actos de obediencia que proclaman lo que Cristo hizo por nosotros (Romanos 6:4; 1 Corintios 11:26).",
    objetivos: [
      { id: "o1", texto: "Explicar qué es el bautismo en agua y lo que simboliza según Romanos 6:3-4.", bloom: "comprender" },
      { id: "o2", texto: "Describir quién debe bautizarse y cómo, según los ejemplos del libro de los Hechos.", bloom: "comprender" },
      { id: "o3", texto: "Explicar qué es la Santa Cena, quién la instituyó y qué representan el pan y la copa.", bloom: "comprender" },
      { id: "o4", texto: "Prepararse para participar de la Santa Cena examinándose a sí mismo (1 Corintios 11:28).", bloom: "aplicar" },
      { id: "o5", texto: "Recitar Romanos 6:4 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "Lo que la Biblia enseña sobre el bautismo en agua y la Santa Cena.",
      ser: "Un corazón obediente y agradecido por la obra de Cristo.",
      hacer: "Bautizarse como testimonio público y participar de la Cena con reverencia.",
    },
    bibliografia: {
      basica: [
        { autor: "Myer Pearlman", titulo: "Teología bíblica y sistemática", editorial: "Vida", nota: "Capítulo de la iglesia: las ordenanzas" },
        { autor: "Guy P. Duffield y Nathaniel M. Van Cleave", titulo: "Fundamentos de teología pentecostal", editorial: "Foursquare Media", nota: "Las ordenanzas de la iglesia" },
      ],
      complementaria: [
        { autor: "Stanley M. Horton (ed.)", titulo: "Teología sistemática: una perspectiva pentecostal", editorial: "Vida" },
        { autor: "Donald C. Stamps (ed.)", titulo: "Biblia de estudio Vida Plena (RVR1960)", editorial: "Vida" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Lucas (parte 2)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=CxiSs-SHTuI" },
      { tipo: "lectura", titulo: "Romanos 6: sepultados y resucitados con Cristo", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Romanos&cap=6" },
    ],
  },
  disponible: true,
};

const IGLESIA: MateriaDef = {
  id: "n1-iglesia",
  nivel: 1,
  orden: 6,
  titulo: "La iglesia, mi nueva familia",
  resumen: "Qué es la iglesia, por qué congregarse, cómo servir con tus dones y dar con alegría.",
  base: "Efesios 2:19-22; Hechos 2:42",
  memoria: "Hebreos 10:25",
  lecciones: lecciones("n1-iglesia", [
    ["Qué es la iglesia", "Efesios 2:19-22"],
    ["Congregarse", "Hechos 2:42-47; Hebreos 10:24-25"],
    ["Servir con mis dones", "1 Pedro 4:10"],
    ["Dar con alegría", "Malaquías 3:10; 2 Corintios 9:6-7"],
  ]),
  silabo: {
    proposito:
      "Que el nuevo creyente entienda que la iglesia es la familia de Dios y el cuerpo de Cristo, y que se integre a ella: congregándose con fidelidad, sirviendo con los dones que Dios le dio y dando con alegría y generosidad. Nadie crece solo: Dios nos puso en un cuerpo (1 Corintios 12:27).",
    objetivos: [
      { id: "o1", texto: "Explicar qué es la iglesia según la Biblia: la familia de Dios, el cuerpo de Cristo y el templo del Espíritu.", bloom: "comprender" },
      { id: "o2", texto: "Describir las prácticas de la primera iglesia (Hechos 2:42-47) y por qué es importante congregarse.", bloom: "comprender" },
      { id: "o3", texto: "Identificar sus dones y un lugar donde servir en la iglesia (1 Pedro 4:10).", bloom: "aplicar" },
      { id: "o4", texto: "Explicar lo que la Biblia enseña sobre el diezmo y la ofrenda, y dar con alegría (2 Corintios 9:7).", bloom: "aplicar" },
      { id: "o5", texto: "Recitar Hebreos 10:25 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "Qué es la iglesia según la Biblia y cómo vivía la iglesia del principio.",
      ser: "Sentido de pertenencia a la familia de Dios y un corazón generoso.",
      hacer: "Congregarse con fidelidad, servir con sus dones y dar con alegría.",
    },
    bibliografia: {
      basica: [
        { autor: "Rick Warren", titulo: "Una vida con propósito", editorial: "Vida", nota: "Los propósitos de la familia de Dios y del servicio" },
        { autor: "Myer Pearlman", titulo: "Teología bíblica y sistemática", editorial: "Vida", nota: "Capítulo de la iglesia" },
      ],
      complementaria: [
        { autor: "Guy P. Duffield y Nathaniel M. Van Cleave", titulo: "Fundamentos de teología pentecostal", editorial: "Foursquare Media" },
        { autor: "Donald C. Stamps (ed.)", titulo: "Biblia de estudio Vida Plena (RVR1960)", editorial: "Vida" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Efesios", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=yJgym5MGzM4", minutos: 10 },
      { tipo: "lectura", titulo: "Hechos 2: la primera iglesia", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Hechos&cap=2" },
    ],
  },
  disponible: true,
};

const VIDA_NUEVA: MateriaDef = {
  id: "n1-vida-nueva",
  nivel: 1,
  orden: 7,
  titulo: "Una vida nueva: santidad y victoria",
  resumen: "La nueva identidad en Cristo, cómo vencer la tentación, levantarse cuando se cae y vivir perdonando.",
  base: "2 Corintios 5:17; 1 Corintios 10:13",
  memoria: "1 Corintios 10:13",
  lecciones: lecciones("n1-vida-nueva", [
    ["La nueva identidad", "2 Corintios 5:17; Gálatas 2:20"],
    ["Vencer la tentación", "1 Corintios 10:13; Mateo 4:1-11"],
    ["Cuando caigo: confesar y levantarme", "1 Juan 1:9; Salmos 51"],
    ["Perdonar y vivir en paz", "Efesios 4:31-32"],
  ]),
  silabo: {
    proposito:
      "Que el nuevo creyente entienda quién es en Cristo, aprenda a vencer la tentación con las armas que Dios da, sepa qué hacer cuando cae (confesar y levantarse) y viva perdonando como Dios lo perdonó. La santidad no es perfección inmediata, sino una vida nueva que crece cada día por el poder de Dios (Filipenses 1:6).",
    objetivos: [
      { id: "o1", texto: "Explicar lo que significa ser una nueva criatura en Cristo (2 Corintios 5:17; Gálatas 2:20).", bloom: "comprender" },
      { id: "o2", texto: "Aplicar las armas con que Jesús venció la tentación: la Palabra, la oración y la huida del pecado.", bloom: "aplicar" },
      { id: "o3", texto: "Explicar y practicar el camino de regreso cuando se cae: confesar, recibir el perdón y levantarse (1 Juan 1:9).", bloom: "aplicar" },
      { id: "o4", texto: "Explicar por qué el creyente perdona y cómo vivir en paz con los demás (Efesios 4:31-32).", bloom: "aplicar" },
      { id: "o5", texto: "Recitar 1 Corintios 10:13 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "Lo que la Biblia enseña sobre la nueva identidad, la tentación, la confesión y el perdón.",
      ser: "Una identidad firme en Cristo y un corazón limpio y perdonador.",
      hacer: "Resistir la tentación, confesar pronto y perdonar a quien le ofende.",
    },
    bibliografia: {
      basica: [
        { autor: "Neil T. Anderson", titulo: "Victoria sobre la oscuridad", editorial: "Unilit", nota: "La identidad en Cristo" },
        { autor: "Jerry Bridges", titulo: "En pos de la santidad" },
      ],
      complementaria: [
        { autor: "John Stott", titulo: "Cristianismo básico", editorial: "Certeza" },
        { autor: "Donald C. Stamps (ed.)", titulo: "Biblia de estudio Vida Plena (RVR1960)", editorial: "Vida" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Gálatas", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=kMJLgLOWb3I" },
      { tipo: "lectura", titulo: "Colosenses 3: la vida nueva en Cristo", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Colosenses&cap=3" },
    ],
  },
  disponible: true,
};

const COMPARTIR_FE: MateriaDef = {
  id: "n1-compartir-fe",
  nivel: 1,
  orden: 8,
  titulo: "Compartir mi fe",
  resumen: "La gran comisión, tu testimonio y cómo explicar el evangelio y acompañar a quien cree.",
  base: "Marcos 16:15; Hechos 1:8",
  memoria: "Marcos 16:15",
  antes: "Evangelismo 1",
  lecciones: lecciones("n1-compartir-fe", [
    ["La gran comisión es para mí", "Marcos 16:15; Mateo 28:18-20"],
    ["Mi testimonio en 3 partes", "Hechos 26; 1 Pedro 3:15"],
    ["El evangelio en 5 minutos", "Romanos 5:8; 10:9"],
    ["Orar por alguien y acompañarlo", "Juan 1:40-42"],
  ]),
  silabo: {
    proposito:
      "Que el nuevo creyente entienda que la gran comisión es para todo discípulo y aprenda a compartir su fe con sencillez: contar su testimonio, explicar el evangelio con la Biblia, orar por las personas y acompañar a quien cree. Marcos 16:15-16 es el corazón de la misión de nuestro ministerio.",
    objetivos: [
      { id: "o1", texto: "Explicar la gran comisión y por qué es para todo creyente (Mateo 28:18-20; Marcos 16:15).", bloom: "comprender" },
      { id: "o2", texto: "Preparar su testimonio personal en tres partes: antes, el encuentro con Cristo y después (Hechos 26; 1 Pedro 3:15).", bloom: "aplicar" },
      { id: "o3", texto: "Explicar el evangelio en pocos minutos con versículos clave (Romanos 3:23; 6:23; 5:8; 10:9).", bloom: "aplicar" },
      { id: "o4", texto: "Orar por personas concretas y acompañar a un nuevo creyente en sus primeros pasos (Juan 1:40-42).", bloom: "aplicar" },
      { id: "o5", texto: "Recitar Marcos 16:15 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "La gran comisión, el mensaje del evangelio y cómo se acompaña a un nuevo creyente.",
      ser: "Un corazón compasivo por los que no conocen a Cristo y valentía para hablar de Él.",
      hacer: "Compartir su testimonio y el evangelio, orar por otros y acompañar a quien cree.",
    },
    bibliografia: {
      basica: [
        { autor: "Robert E. Coleman", titulo: "Plan supremo de evangelización", editorial: "Casa Bautista" },
        { autor: "Rebecca Manley Pippert", titulo: "Fuera del salero" },
      ],
      complementaria: [
        { autor: "Billy Graham", titulo: "Paz con Dios" },
        { autor: "Donald C. Stamps (ed.)", titulo: "Biblia de estudio Vida Plena (RVR1960)", editorial: "Vida" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Hechos (parte 2)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=ZKaaHQUdVCY" },
      { tipo: "lectura", titulo: "Hechos 8: Felipe y el etíope", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Hechos&cap=8" },
    ],
  },
  disponible: true,
};

/** Nivel 2 · materia 1: la primera del Nivel 2, con mini pruebas y escrito breve. */
const PANORAMA_AT: MateriaDef = {
  id: "n2-panorama-at",
  nivel: 2,
  orden: 1,
  titulo: "Panorama del Antiguo Testamento",
  resumen: "La historia de la redención de Génesis a Malaquías: creación, patriarcas, éxodo, ley, reyes, profetas, exilio y regreso.",
  base: "Lucas 24:27; Romanos 15:4",
  memoria: "Romanos 15:4",
  lecciones: lecciones("n2-panorama-at", [
    ["Cómo se organiza el Antiguo Testamento", "Lucas 24:27, 44; Romanos 15:4; Génesis 3:15"],
    ["Los comienzos: Génesis", "Génesis 1:27; 12:1-3; 15:6; 50:20"],
    ["Éxodo y pacto: de Egipto al Sinaí", "Éxodo 12:13; 19:5-6; 20:2-3; Deuteronomio 6:4-5"],
    ["La tierra y el reino", "Josué 1:8-9; 1 Samuel 16:7; 2 Samuel 7:16; 2 Reyes 25:9"],
    ["Los poetas y los profetas", "Salmos 1:1-2; Proverbios 1:7; Jeremías 31:31-33; Isaías 53:5"],
    ["Exilio, regreso y la espera del Mesías", "Esdras 1:1-3; Nehemías 6:15; Malaquías 3:1; Gálatas 4:4"],
  ]),
  silabo: {
    proposito:
      "Que el discípulo conozca la historia del Antiguo Testamento de principio a fin y la lea como la primera parte de una sola historia: Dios cumpliendo su promesa de salvación, que llega a su plenitud en Jesucristo (Lucas 24:27). Conocer el Antiguo Testamento da raíces a la fe y enseña a confiar en un Dios que cumple lo que promete (Romanos 15:4).",
    objetivos: [
      { id: "o1", texto: "Nombrar las secciones del Antiguo Testamento y ubicar sus libros principales.", bloom: "recordar" },
      { id: "o2", texto: "Resumir los grandes momentos de la historia del Antiguo Testamento, de la creación al regreso del exilio.", bloom: "comprender" },
      { id: "o3", texto: "Explicar las promesas y los pactos de Dios con Abraham, con Israel en el Sinaí y con David, y cómo se cumplen en Cristo.", bloom: "analizar" },
      { id: "o4", texto: "Describir la misión de los profetas e identificar profecías del Mesías cumplidas en Jesús.", bloom: "analizar" },
      { id: "o5", texto: "Recitar Romanos 15:4 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "La estructura del Antiguo Testamento, su historia, sus pactos y sus promesas del Mesías.",
      ser: "Confianza en un Dios fiel, que cumple sus promesas aun cuando su pueblo falla.",
      hacer: "Leer el Antiguo Testamento con orden y descubrir a Cristo en sus páginas.",
    },
    bibliografia: {
      basica: [
        { autor: "Henrietta C. Mears", titulo: "Lo que nos dice la Biblia", editorial: "Vida" },
        { autor: "Samuel J. Schultz", titulo: "Habla el Antiguo Testamento", editorial: "Portavoz" },
      ],
      complementaria: [
        { autor: "Pablo Hoff", titulo: "El Pentateuco", editorial: "Vida" },
        { autor: "Henry H. Halley", titulo: "Compendio manual de la Biblia" },
        { autor: "Donald C. Stamps (ed.)", titulo: "Biblia de estudio Vida Plena (RVR1960)", editorial: "Vida" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Génesis (parte 1): Génesis 1-11", fuente: "Proyecto Biblia", url: "https://bibleproject.com/es/videos/genesis-1-11/", minutos: 8 },
      { tipo: "video", titulo: "Resumen del libro de Génesis (parte 2): Génesis 12-50", fuente: "Proyecto Biblia", url: "https://bibleproject.com/es/videos/genesis-12-50/", minutos: 9 },
      { tipo: "video", titulo: "Resumen del libro de Éxodo (parte 1): Éxodo 1-18", fuente: "Proyecto Biblia", url: "https://bibleproject.com/es/videos/exodo-1-18/", minutos: 7 },
      { tipo: "lectura", titulo: "Lucas 24: Jesús explica las Escrituras", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Lucas&cap=24" },
    ],
  },
  disponible: true,
};

/** Nivel 2 · materia 2: la vida de Jesús, la iglesia, las cartas y la esperanza de su regreso. */
const PANORAMA_NT: MateriaDef = {
  id: "n2-panorama-nt",
  nivel: 2,
  orden: 2,
  titulo: "Panorama del Nuevo Testamento",
  resumen: "El mundo de Jesús, los cuatro evangelios, la iglesia en Hechos, las cartas de los apóstoles y la esperanza de Apocalipsis.",
  base: "Gálatas 4:4; Juan 20:31; Hechos 1:8",
  memoria: "Juan 20:31",
  lecciones: lecciones("n2-panorama-nt", [
    ["El mundo del Nuevo Testamento y sus libros", "Gálatas 4:4; Marcos 1:15"],
    ["Los cuatro evangelios", "Juan 20:31; Lucas 1:1-4; Marcos 10:45"],
    ["La vida y la obra de Jesús", "Mateo 4:23; 1 Corintios 15:3-4; Hechos 1:8-11"],
    ["Hechos: la iglesia en marcha", "Hechos 1:8; 2:1-4, 42; 15:11; 28:30-31"],
    ["Las cartas del Nuevo Testamento", "Romanos 5:1; Efesios 2:8-10; Santiago 2:17-18"],
    ["Apocalipsis: Cristo vence", "Apocalipsis 1:1-3; 5:12; 21:3-5; 22:20"],
  ]),
  silabo: {
    proposito:
      "Que el discípulo conozca el Nuevo Testamento de principio a fin: cómo Dios preparó la llegada de Cristo, los cuatro testimonios de su vida, la expansión de la iglesia, las cartas de los apóstoles y la esperanza de su regreso. Juan escribió para que creamos que Jesús es el Cristo, el Hijo de Dios, y para que creyendo tengamos vida en su nombre (Juan 20:31).",
    objetivos: [
      { id: "o1", texto: "Describir el mundo del Nuevo Testamento y nombrar sus secciones y sus libros.", bloom: "recordar" },
      { id: "o2", texto: "Comparar los cuatro evangelios y resumir la vida, la muerte y la resurrección de Jesús.", bloom: "comprender" },
      { id: "o3", texto: "Explicar cómo avanzó el evangelio en Hechos y el mensaje central de las cartas.", bloom: "comprender" },
      { id: "o4", texto: "Explicar el propósito de Apocalipsis y la esperanza del regreso de Cristo.", bloom: "analizar" },
      { id: "o5", texto: "Recitar Juan 20:31 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "El trasfondo, la estructura y el mensaje de los 27 libros del Nuevo Testamento.",
      ser: "Una fe firme en Jesucristo, el Hijo de Dios, y una esperanza viva en su regreso.",
      hacer: "Leer el Nuevo Testamento con orden y ser testigo de Cristo donde vive.",
    },
    bibliografia: {
      basica: [
        { autor: "Merrill C. Tenney", titulo: "Nuestro Nuevo Testamento", editorial: "Portavoz" },
        { autor: "Henrietta C. Mears", titulo: "Lo que nos dice la Biblia", editorial: "Vida" },
      ],
      complementaria: [
        { autor: "Henry H. Halley", titulo: "Compendio manual de la Biblia" },
        { autor: "Donald C. Stamps (ed.)", titulo: "Biblia de estudio Vida Plena (RVR1960)", editorial: "Vida" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Romanos (parte 1)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=0tco1rQGC1o" },
      { tipo: "video", titulo: "Resumen del libro de Hebreos", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=VqVAOqyoKCs" },
      { tipo: "lectura", titulo: "Hechos 2: el día de Pentecostés", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Hechos&cap=2" },
    ],
  },
  disponible: true,
};

/** Nivel 2 · materia 3: las doctrinas fundamentales, artículo por artículo de la declaración de fe. */
const DOCTRINAS: MateriaDef = {
  id: "n2-doctrinas",
  nivel: 2,
  orden: 3,
  titulo: "Doctrinas fundamentales",
  resumen: "Las grandes verdades de la fe según la declaración de fe del ministerio: la Biblia, el Dios trino, Jesucristo, la salvación, el Espíritu Santo, la iglesia y la esperanza.",
  base: "2 Timoteo 1:13; 2 Timoteo 3:16-17",
  memoria: "2 Timoteo 1:13",
  lecciones: lecciones("n2-doctrinas", [
    ["La Biblia y el Dios trino", "2 Timoteo 1:13; 2 Timoteo 3:16-17; 2 Pedro 1:20-21; Deuteronomio 6:4; Mateo 28:19; 2 Corintios 13:14"],
    ["Jesucristo, verdadero Dios y verdadero hombre", "Juan 1:1; Juan 1:14; Mateo 1:20-23; Hebreos 4:15; 1 Corintios 15:3-4"],
    ["El pecado y la salvación", "Génesis 1:27; Romanos 5:12; Romanos 3:23; Efesios 2:8-9; Juan 3:3; 1 Juan 5:11-13"],
    ["El Espíritu Santo, sus dones y la sanidad", "Juan 16:7-8; Hechos 1:8; Hechos 2:4; Hechos 2:38-39; 1 Corintios 12:7; Santiago 5:14-15"],
    ["La santidad, las ordenanzas y la iglesia", "1 Tesalonicenses 4:3; Romanos 6:4; 1 Corintios 11:23-26; Mateo 16:18; Efesios 4:11-12"],
    ["La familia, el avivamiento y la esperanza", "Génesis 2:24; Hechos 1:11; 1 Tesalonicenses 4:16-17; Juan 5:28-29; Apocalipsis 21:4"],
  ]),
  silabo: {
    proposito:
      "Que el discípulo conozca y retenga las grandes verdades de la fe, siguiendo artículo por artículo la declaración de fe del ministerio: la Biblia, el Dios trino, Jesucristo, el pecado y la salvación, el Espíritu Santo con su bautismo, sus dones y la sanidad divina, la santidad y las ordenanzas, la iglesia y el ministerio, la familia, el avivamiento y la esperanza de la venida de Cristo. Mientras la Dirección académica no la apruebe, la declaración es un borrador. En los cinco puntos en que las iglesias pentecostales difieren (la perseverancia, las lenguas como señal del bautismo en el Espíritu, la sanidad en la expiación, el ministerio de la mujer y el orden de los últimos tiempos), la materia presenta las posiciones con respeto, y la del ministerio es un punto de la declaración de fe por confirmar. Su base es el encargo de Pablo: «Retén la forma de las sanas palabras que de mí oíste, en la fe y amor que es en Cristo Jesús» (2 Timoteo 1:13).",
    objetivos: [
      { id: "o1", texto: "Explicar lo que creemos sobre la Biblia, el Dios trino y Jesucristo.", bloom: "comprender" },
      { id: "o2", texto: "Explicar la doctrina del pecado y de la salvación por gracia, por medio de la fe.", bloom: "comprender" },
      { id: "o3", texto: "Describir la obra del Espíritu Santo: su persona, su bautismo, sus dones y la sanidad divina.", bloom: "comprender" },
      { id: "o4", texto: "Relacionar la santidad, las ordenanzas, la iglesia, el ministerio, la familia y la esperanza de la venida de Cristo con la vida del discípulo.", bloom: "aplicar" },
      { id: "o5", texto: "Recitar 2 Timoteo 1:13 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "Las doctrinas fundamentales de la fe según la declaración de fe del ministerio, con su base bíblica.",
      ser: "Un discípulo firme en la sana doctrina, que la sostiene con fe y con amor.",
      hacer: "Explicar con la Biblia lo que cree y vivirlo en santidad, dentro de la iglesia y con esperanza.",
    },
    bibliografia: {
      basica: [
        { autor: "Myer Pearlman", titulo: "Teología bíblica y sistemática", editorial: "Vida" },
        { autor: "Pablo Hoff", titulo: "Teología evangélica", editorial: "Vida" },
      ],
      complementaria: [
        { autor: "Guy P. Duffield y Nathaniel M. Van Cleave", titulo: "Fundamentos de teología pentecostal", editorial: "Foursquare Media", nota: "Expone las posiciones del pentecostalismo clásico en los puntos por confirmar." },
      ],
    },
    recursos: [
      { tipo: "lectura", titulo: "Declaración de fe del Ministerio Avivando el Fuego", fuente: "Academia Avivando el Fuego", url: "/academia/declaracion-de-fe" },
      { tipo: "video", titulo: "Carácter de Dios", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=oHMicgEfIrY", minutos: 6 },
      { tipo: "video", titulo: "Resumen del libro de Juan (parte 1)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=OU16-2Sg_CQ", minutos: 10 },
      { tipo: "lectura", titulo: "Efesios 2: salvos por gracia", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Efesios&cap=2" },
    ],
  },
  disponible: true,
};

/** Nivel 2 · materia 4: los hábitos del discípulo que crece, siempre como medios de gracia. */
const DISCIPLINAS: MateriaDef = {
  id: "n2-disciplinas",
  nivel: 2,
  orden: 4,
  titulo: "Disciplinas espirituales",
  resumen: "La Palabra, la oración, el ayuno, la adoración, el día del Señor, el silencio, el diario espiritual, el servicio y una regla de vida.",
  base: "1 Timoteo 4:7-8; Lucas 5:16",
  memoria: "1 Timoteo 4:8",
  lecciones: lecciones("n2-disciplinas", [
    ["¿Qué son las disciplinas espirituales?", "1 Timoteo 4:7-8; Lucas 5:16"],
    ["La Palabra: leer, estudiar, meditar y memorizar", "Salmos 1:1-3; Josué 1:8; 2 Timoteo 3:16-17"],
    ["La oración y el ayuno", "Mateo 6:6, 16-18; Isaías 58:6-7"],
    ["La adoración y el día del Señor", "Juan 4:23-24; Romanos 12:1; Hebreos 10:24-25"],
    ["Silencio, soledad y el diario espiritual", "Marcos 1:35; Salmos 46:10; 77:11-12; 139:23-24"],
    ["Servicio, generosidad y una regla de vida", "Marcos 10:45; 2 Corintios 9:7; Gálatas 6:9"],
  ]),
  silabo: {
    proposito:
      "Que el discípulo cultive una vida con Dios constante y gozosa. Las disciplinas espirituales son los hábitos que enseña la Biblia y que practicó Jesús: la Palabra, la oración, el ayuno, la adoración, el silencio, el servicio y la generosidad. No compran el amor de Dios, que ya es nuestro en Cristo; son medios de gracia por los que el Espíritu nos transforma a la imagen del Señor. Pablo lo dice así: «Ejercítate para la piedad» (1 Timoteo 4:7).",
    objetivos: [
      { id: "o1", texto: "Explicar qué son las disciplinas espirituales y por qué son medios de gracia y no méritos.", bloom: "comprender" },
      { id: "o2", texto: "Practicar la lectura, la meditación y la memorización de la Palabra, y la oración y el ayuno como los enseñó Jesús (Mateo 6).", bloom: "aplicar" },
      { id: "o3", texto: "Describir la adoración en espíritu y en verdad, el día del Señor, el silencio, la soledad y el diario espiritual.", bloom: "comprender" },
      { id: "o4", texto: "Diseñar una regla de vida personal que incluya el servicio y la generosidad.", bloom: "crear" },
      { id: "o5", texto: "Recitar 1 Timoteo 4:8 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "Lo que la Biblia enseña de cada disciplina y el ejemplo de Jesús.",
      ser: "Una vida con Dios constante, humilde y gozosa, libre del legalismo.",
      hacer: "Practicar cada semana las disciplinas con un plan sencillo y servir a otros.",
    },
    bibliografia: {
      basica: [
        { autor: "Donald S. Whitney", titulo: "Disciplinas espirituales para la vida cristiana", editorial: "NavPress / Tyndale" },
        { autor: "Donald C. Stamps (ed.)", titulo: "Biblia de estudio Vida Plena (RVR1960)", editorial: "Vida" },
      ],
      complementaria: [
        { autor: "Richard J. Foster", titulo: "Celebración de la disciplina", editorial: "Peniel", nota: "Para leer con discernimiento: algunas prácticas contemplativas que describe no forman parte de esta materia." },
        { autor: "E. M. Bounds", titulo: "El poder a través de la oración" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Mateo 6:9-13: La oración de Jesús", fuente: "Proyecto Biblia", url: "https://bibleproject.com/es/videos/mateo-6-9-13-la-oracion-de-jesus/", minutos: 7 },
      { tipo: "video", titulo: "El Sabbat", fuente: "Proyecto Biblia", url: "https://bibleproject.com/es/videos/sabbat-video/", minutos: 6 },
      { tipo: "lectura", titulo: "Mateo 6: dar, orar y ayunar en lo secreto", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Mateo&cap=6" },
      { tipo: "lectura", titulo: "Salmo 1: el árbol junto a las aguas", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Salmos&cap=1" },
    ],
  },
  disponible: true,
};

/** Nivel 2 · materia 5: el carácter del discípulo según Mateo 5 a 7. */
const SERMON_MONTE: MateriaDef = {
  id: "n2-sermon-monte",
  nivel: 2,
  orden: 5,
  titulo: "El Sermón del monte",
  resumen: "El carácter del discípulo según Mateo 5 a 7: las bienaventuranzas, la sal y la luz, la justicia del corazón, la piedad en lo secreto, la confianza en el Padre y la casa sobre la roca.",
  base: "Mateo 5:1-2; 7:24-29",
  memoria: "Mateo 6:33",
  lecciones: lecciones("n2-sermon-monte", [
    ["El Rey enseña en el monte", "Mateo 4:17; 5:1-2; 7:28-29"],
    ["Las bienaventuranzas", "Mateo 5:3-12"],
    ["La sal, la luz y una justicia mayor", "Mateo 5:13-20"],
    ["El corazón de la ley", "Mateo 5:21-48"],
    ["La piedad en lo secreto y el tesoro en el cielo", "Mateo 6:1-34"],
    ["Los dos caminos y la casa sobre la roca", "Mateo 7:1-29"],
  ]),
  silabo: {
    proposito:
      "Que el discípulo conozca y viva la enseñanza más extensa de Jesús, el Sermón del monte (Mateo 5 a 7). En él, el Rey describe el carácter, la justicia, la piedad, la confianza y la obediencia de quienes pertenecen a su reino. No es un camino para ganar la salvación, sino el retrato de la vida nueva que su gracia produce. Jesús lo termina con una invitación a edificar sobre la roca: oír sus palabras y hacerlas (Mateo 7:24).",
    objetivos: [
      { id: "o1", texto: "Explicar el contexto, las partes y el propósito del Sermón del monte.", bloom: "comprender" },
      { id: "o2", texto: "Describir el carácter del discípulo según las bienaventuranzas y su influencia como sal y luz.", bloom: "comprender" },
      { id: "o3", texto: "Explicar cómo Jesús cumple la ley y lleva sus mandamientos al corazón.", bloom: "analizar" },
      { id: "o4", texto: "Aplicar la enseñanza de Jesús sobre la piedad, el dinero, la ansiedad, el juicio y la obediencia.", bloom: "aplicar" },
      { id: "o5", texto: "Recitar Mateo 6:33 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "La estructura y la enseñanza del Sermón del monte en su contexto.",
      ser: "Un corazón humilde, misericordioso, sincero y confiado en el Padre.",
      hacer: "Reconciliarse, amar a los enemigos, dar en secreto, buscar primero el reino y obedecer las palabras de Jesús.",
    },
    bibliografia: {
      basica: [
        { autor: "John R. W. Stott", titulo: "El Sermón del Monte" },
        { autor: "Donald C. Stamps (ed.)", titulo: "Biblia de estudio Vida Plena (RVR1960)", editorial: "Vida" },
      ],
      complementaria: [
        { autor: "D. Martyn Lloyd-Jones", titulo: "El Sermón del Monte", editorial: "Banner of Truth" },
        { autor: "Henrietta C. Mears", titulo: "Lo que nos dice la Biblia", editorial: "Vida" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "El asesinato, el adulterio y el divorcio", fuente: "Proyecto Biblia", url: "https://bibleproject.com/es/videos/el-asesinato-el-adulterio-y-el-divorcio/", minutos: 9 },
      { tipo: "video", titulo: "Advertencias sobre las prácticas religiosas", fuente: "Proyecto Biblia", url: "https://bibleproject.com/es/videos/advertencias-sobre-las-practicas-religiosas/", minutos: 7 },
      { tipo: "video", titulo: "La oración de Jesús", fuente: "Proyecto Biblia", url: "https://bibleproject.com/es/videos/la-oracion-de-jesus/", minutos: 10 },
      { tipo: "video", titulo: "Sabiduría para relacionarnos", fuente: "Proyecto Biblia", url: "https://bibleproject.com/es/videos/sabiduria-para-relacionarnos/", minutos: 6 },
      { tipo: "lectura", titulo: "Mateo 5 a 7: el Sermón del monte completo", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Mateo&cap=5" },
    ],
  },
  disponible: true,
};

/** Nivel 2 · materia 6: Dios es el dueño y nosotros administradores del tiempo, los dones y los bienes. */
const MAYORDOMIA: MateriaDef = {
  id: "n2-mayordomia",
  nivel: 2,
  orden: 6,
  titulo: "Mayordomía cristiana",
  resumen: "Dios es el dueño y nosotros administradores: el tiempo y el trabajo, los talentos, el diezmo y las ofrendas, la generosidad y unas finanzas sanas.",
  base: "Salmos 24:1; 1 Corintios 4:1-2",
  memoria: "1 Corintios 4:2",
  lecciones: lecciones("n2-mayordomia", [
    ["Dios es el dueño; nosotros, administradores", "Salmos 24:1; Génesis 2:15; 1 Corintios 4:1-2; Lucas 16:10"],
    ["El tiempo y el trabajo", "Salmos 90:12; Efesios 5:15-17; Colosenses 3:23-24"],
    ["Los talentos: lo que Dios puso en tus manos", "Mateo 25:14-30; 1 Pedro 4:10"],
    ["El diezmo y las ofrendas", "Malaquías 3:10; Mateo 23:23; 1 Corintios 16:2"],
    ["Generosidad y contentamiento", "2 Corintios 8:1-9; 1 Timoteo 6:6-10; Hechos 20:35"],
    ["Finanzas sanas: trabajo, deudas, ahorro y presupuesto", "2 Tesalonicenses 3:10-12; Proverbios 22:7; 6:6-8; Lucas 14:28"],
  ]),
  silabo: {
    proposito:
      "Que el discípulo reconozca que Dios es el dueño de todo y aprenda a administrar con fidelidad lo que Él le confió: la vida, el tiempo, el trabajo, los dones y el dinero. La materia enseña el diezmo y las ofrendas como los enseñan las iglesias evangélicas pentecostales, la generosidad y el contentamiento, y principios bíblicos para unas finanzas sanas, lejos del evangelio de la prosperidad. Como dice Pablo, «se requiere de los administradores, que cada uno sea hallado fiel» (1 Corintios 4:2).",
    objetivos: [
      { id: "o1", texto: "Explicar qué es la mayordomía cristiana y el señorío de Dios sobre todo lo que tenemos.", bloom: "comprender" },
      { id: "o2", texto: "Administrar el tiempo, el trabajo y los talentos con fidelidad.", bloom: "aplicar" },
      { id: "o3", texto: "Explicar lo que enseña la Biblia sobre el diezmo, las ofrendas y la generosidad, y distinguirlo del evangelio de la prosperidad.", bloom: "analizar" },
      { id: "o4", texto: "Elaborar un presupuesto sencillo con principios bíblicos sobre el trabajo, las deudas y el ahorro.", bloom: "crear" },
      { id: "o5", texto: "Recitar 1 Corintios 4:2 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "Lo que enseña la Biblia sobre la mayordomía, el trabajo, el diezmo, la generosidad y el dinero.",
      ser: "Un corazón agradecido, generoso y contento en Cristo, libre del amor al dinero.",
      hacer: "Ordenar la semana, servir con los dones, dar con alegría y llevar un presupuesto sencillo.",
    },
    bibliografia: {
      basica: [
        { autor: "Andrés Panasiuk", titulo: "¿Cómo llego a fin de mes?", editorial: "Grupo Nelson" },
        { autor: "Randy Alcorn", titulo: "El principio del tesoro", editorial: "Unilit" },
      ],
      complementaria: [
        { autor: "Donald C. Stamps (ed.)", titulo: "Biblia de estudio Vida Plena (RVR1960)", editorial: "Vida" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Generosidad", fuente: "Proyecto Biblia", url: "https://bibleproject.com/es/videos/generosidad/", minutos: 5 },
      { tipo: "lectura", titulo: "Mateo 25: la parábola de los talentos", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Mateo&cap=25" },
      { tipo: "lectura", titulo: "Proverbios 6: la hormiga y el trabajo", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Proverbios&cap=6" },
    ],
  },
  disponible: true,
};

/** Nivel 2 · materia 8: compartir a Cristo en la vida diaria (antes, «Evangelismo 1 y 2»). */
const EVANGELISMO_PERSONAL: MateriaDef = {
  id: "n2-evangelismo-personal",
  nivel: 2,
  orden: 8,
  titulo: "Evangelismo personal",
  resumen: "El mensaje, el modelo de Jesús con la samaritana, las preguntas que abren conversaciones, las objeciones comunes, invitar a una decisión y acompañar al que cree.",
  base: "Romanos 1:16; 2 Corintios 5:20",
  memoria: "Romanos 1:16",
  antes: "Evangelismo 1 y 2",
  lecciones: lecciones("n2-evangelismo-personal", [
    ["El evangelio y el evangelista", "1 Corintios 15:1-4; Juan 16:8; 2 Corintios 5:18-20"],
    ["Jesús y la samaritana: tender puentes", "Juan 4:7-26"],
    ["Preguntas que abren conversaciones", "Hechos 17:22-23; Colosenses 4:5-6; 1 Pedro 3:15-16"],
    ["Responder las objeciones comunes", "Juan 14:6; Romanos 3:23-24; Juan 16:33"],
    ["Invitar a una decisión", "Hechos 2:37-38; Romanos 10:9-10; 1 Juan 5:11-13"],
    ["Acompañar al que cree", "Mateo 28:19-20; 1 Tesalonicenses 2:7-8; Hechos 2:41-42"],
  ]),
  silabo: {
    proposito:
      "Que el discípulo comparta a Cristo con naturalidad, claridad y amor en su vida diaria. La materia sigue a Compartir mi fe y va un paso más allá: el mensaje del evangelio con precisión, la obra del Espíritu Santo, el modelo de Jesús con la samaritana, las preguntas que abren conversaciones, las respuestas a las objeciones comunes, la invitación sin presión y el acompañamiento del nuevo creyente. Como Pablo, decimos: «no me avergüenzo del evangelio» (Romanos 1:16).",
    objetivos: [
      { id: "o1", texto: "Explicar el mensaje del evangelio, la obra del Espíritu Santo y el llamado a ser embajadores de Cristo.", bloom: "comprender" },
      { id: "o2", texto: "Iniciar conversaciones espirituales siguiendo el modelo de Jesús y de Pablo, con preguntas y escucha.", bloom: "aplicar" },
      { id: "o3", texto: "Responder con la Biblia, con mansedumbre y con humildad a las objeciones comunes.", bloom: "analizar" },
      { id: "o4", texto: "Guiar a una persona a recibir a Cristo y acompañarla en sus primeros pasos.", bloom: "aplicar" },
      { id: "o5", texto: "Recitar Romanos 1:16 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "El mensaje del evangelio, el modelo de Jesús y de los apóstoles, y las respuestas bíblicas a las objeciones comunes.",
      ser: "Un testigo valiente y compasivo, que depende del Espíritu Santo y ama a las personas.",
      hacer: "Iniciar conversaciones espirituales, compartir el evangelio, invitar a una decisión y acompañar a un nuevo creyente.",
    },
    bibliografia: {
      basica: [
        { autor: "Robert E. Coleman", titulo: "Plan supremo de evangelización", editorial: "Casa Bautista de Publicaciones" },
        { autor: "Lee Strobel", titulo: "El caso de Cristo", editorial: "Vida" },
      ],
      complementaria: [
        { autor: "Donald C. Stamps (ed.)", titulo: "Biblia de estudio Vida Plena (RVR1960)", editorial: "Vida" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Evangelio del Reino", fuente: "Proyecto Biblia", url: "https://bibleproject.com/es/videos/evangelio-del-reino/", minutos: 5 },
      { tipo: "lectura", titulo: "Juan 4: Jesús y la mujer samaritana", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Juan&cap=4" },
      { tipo: "lectura", titulo: "Hechos 17: Pablo en Atenas", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Hechos&cap=17" },
    ],
  },
  disponible: true,
};

/** Nivel 2 · materia 7: el hogar y las relaciones edificados sobre Dios. */
const FAMILIA: MateriaDef = {
  id: "n2-familia",
  nivel: 2,
  orden: 7,
  titulo: "Familia y relaciones",
  resumen: "El diseño de Dios para la familia, el matrimonio con amor y respeto, padres e hijos, la soltería y la amistad, la pureza y el perdón en el hogar.",
  base: "Génesis 2:24; Salmos 127:1",
  memoria: "Salmos 127:1",
  lecciones: lecciones("n2-familia", [
    ["El diseño de Dios para la familia", "Génesis 2:18, 24; Mateo 19:4-6"],
    ["El matrimonio: amor y respeto", "Efesios 5:21, 25-28, 33"],
    ["Padres e hijos", "Deuteronomio 6:6-7; Efesios 6:1-4; Proverbios 22:6"],
    ["La soltería y la amistad", "1 Corintios 7:32-35; Proverbios 17:17; 27:17"],
    ["La pureza sexual", "1 Tesalonicenses 4:3-5; 1 Corintios 6:18-20; Hebreos 13:4"],
    ["Perdón, conflictos y restauración en el hogar", "Colosenses 3:12-14; Efesios 4:26; Mateo 19:8-9"],
  ]),
  silabo: {
    proposito:
      "Que el discípulo edifique su hogar y sus relaciones sobre el fundamento de Dios. La materia presenta el diseño de Dios para el matrimonio y la familia, el amor que se entrega y el respeto mutuo, la crianza en el Señor, el valor de la soltería y de la amistad, la pureza y el perdón. La autoridad nunca justifica el control ni la violencia, y los casos difíciles se tratan con el pastor. Como dice el salmo, «Si Jehová no edificare la casa, en vano trabajan los que la edifican» (Salmos 127:1).",
    objetivos: [
      { id: "o1", texto: "Describir el diseño de Dios para el matrimonio y la familia.", bloom: "comprender" },
      { id: "o2", texto: "Explicar el amor, el respeto y la crianza que enseña la Biblia, y distinguir la autoridad que sirve del control que domina.", bloom: "analizar" },
      { id: "o3", texto: "Valorar la soltería, la amistad y la pureza según la Biblia.", bloom: "comprender" },
      { id: "o4", texto: "Aplicar el perdón, la reconciliación y la búsqueda de ayuda en los conflictos familiares.", bloom: "aplicar" },
      { id: "o5", texto: "Recitar Salmos 127:1 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "El diseño bíblico del matrimonio, la familia, la soltería, la amistad y la sexualidad.",
      ser: "Un corazón fiel, puro, paciente y perdonador en sus relaciones.",
      hacer: "Amar y respetar en el hogar, enseñar la fe a los hijos, cuidar la pureza y buscar la reconciliación y la ayuda cuando hace falta.",
    },
    bibliografia: {
      basica: [
        { autor: "Emerson Eggerichs", titulo: "Amor y respeto", editorial: "Grupo Nelson" },
        { autor: "Donald C. Stamps (ed.)", titulo: "Biblia de estudio Vida Plena (RVR1960)", editorial: "Vida" },
      ],
      complementaria: [
        { autor: "Gary Chapman", titulo: "Los cinco lenguajes del amor", editorial: "Unilit" },
      ],
    },
    recursos: [
      { tipo: "lectura", titulo: "Efesios 5 y 6: el hogar cristiano", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Efesios&cap=5" },
      { tipo: "lectura", titulo: "Génesis 2: el principio de la familia", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Genesis&cap=2" },
    ],
  },
  disponible: true,
};

/** Nivel 2 · materia 9: los dones del Espíritu y el servicio de cada creyente. */
const DONES: MateriaDef = {
  id: "n2-dones",
  nivel: 2,
  orden: 9,
  titulo: "Dones espirituales y servicio",
  resumen: "Los dones del Espíritu en 1 Corintios 12, Romanos 12 y 1 Pedro 4, los ministerios de Efesios 4, el amor y el orden, y cómo descubrir tu don y servir.",
  base: "1 Corintios 12:4-7; 1 Pedro 4:10",
  memoria: "1 Corintios 12:7",
  lecciones: lecciones("n2-dones", [
    ["Los dones: regalos del Espíritu para servir", "1 Corintios 12:4-7; 1 Pedro 4:10"],
    ["Los dones del Espíritu en 1 Corintios 12", "1 Corintios 12:8-11; 1:7"],
    ["Dones para hablar y para servir", "Romanos 12:4-8; 1 Pedro 4:11"],
    ["Los ministerios que edifican", "Efesios 4:11-16"],
    ["El camino más excelente: el amor y el orden", "1 Corintios 13:1-7; 14:26; 1 Tesalonicenses 5:19-21"],
    ["Descubrir tu don y servir", "1 Corintios 12:18-22; Romanos 12:1"],
  ]),
  silabo: {
    proposito:
      "Que el discípulo descubra los dones que el Espíritu Santo le ha dado y sirva con ellos en la iglesia. La materia estudia los dones de 1 Corintios 12, Romanos 12 y 1 Pedro 4, los ministerios de Efesios 4 y el uso de los dones con amor, orden y discernimiento, como las iglesias pentecostales, que creen que todos los dones siguen vigentes. El bautismo en el Espíritu Santo se estudia a fondo en el Nivel 3. Pablo lo resume así: «a cada uno le es dada la manifestación del Espíritu para provecho» (1 Corintios 12:7).",
    objetivos: [
      { id: "o1", texto: "Explicar qué son los dones espirituales, para qué los da Dios y en qué se distinguen de los talentos y del fruto del Espíritu.", bloom: "comprender" },
      { id: "o2", texto: "Describir los dones de 1 Corintios 12, Romanos 12 y 1 Pedro 4, y explicar su vigencia.", bloom: "comprender" },
      { id: "o3", texto: "Explicar los ministerios de Efesios 4 y el uso de los dones con amor, orden y discernimiento.", bloom: "analizar" },
      { id: "o4", texto: "Aplicar pasos para descubrir el propio don y servir en la iglesia.", bloom: "aplicar" },
      { id: "o5", texto: "Recitar 1 Corintios 12:7 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "Los dones del Espíritu, los ministerios de Efesios 4 y los principios para usarlos.",
      ser: "Un siervo humilde, que ama y depende del Espíritu Santo.",
      hacer: "Descubrir el propio don y servir en un ministerio de la iglesia.",
    },
    bibliografia: {
      basica: [
        { autor: "Stanley M. Horton", titulo: "El Espíritu Santo revelado en la Biblia", editorial: "Vida" },
        { autor: "Myer Pearlman", titulo: "Teología bíblica y sistemática", editorial: "Vida", nota: "Capítulo del Espíritu Santo: los dones" },
      ],
      complementaria: [
        { autor: "Stanley M. Horton (ed.)", titulo: "Teología sistemática: una perspectiva pentecostal", editorial: "Vida" },
        { autor: "Donald C. Stamps (ed.)", titulo: "Biblia de estudio Vida Plena (RVR1960)", editorial: "Vida" },
      ],
    },
    recursos: [
      { tipo: "lectura", titulo: "1 Corintios 12 a 14: los dones, el amor y el orden", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=1%20Corintios&cap=12" },
      { tipo: "lectura", titulo: "Romanos 12: un cuerpo, muchos dones", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Romanos&cap=12" },
    ],
  },
  disponible: true,
};

// ---------------------------------------------------------------- Nivel 3 · Formación de obreros

/** Nivel 3 · materia 1: interpretar bien la Biblia. Las lecciones del Nivel 3 son de 10 minutos. */
const HERMENEUTICA: MateriaDef = {
  id: "n3-hermeneutica",
  nivel: 3,
  orden: 1,
  titulo: "Hermenéutica",
  resumen: "Interpretar bien la Biblia: el contexto, las palabras y las figuras, los géneros literarios, las reglas sanas, los errores comunes y el paso del texto a la vida.",
  base: "2 Timoteo 2:15; Nehemías 8:8",
  memoria: "2 Timoteo 2:15",
  lecciones: lecciones("n3-hermeneutica", [
    ["¿Qué es la hermenéutica?", "Nehemías 8:8; Hechos 8:30-35; Lucas 24:27, 44-45"],
    ["El contexto: cada texto en su lugar", "Filipenses 4:10-13; Jeremías 29:4-11; Mateo 18:15-20"],
    ["Las palabras, las figuras y la cultura", "Juan 3:16; 1 Juan 2:15-17; Juan 4:7-9; 10:9"],
    ["Los géneros literarios", "Salmos 19:1-2; Proverbios 26:4-5; Lucas 15:1-7; Apocalipsis 1:20"],
    ["Reglas sanas y errores comunes", "Mateo 4:5-7; Hechos 17:11; 2 Pedro 1:20-21; Lucas 10:25-37"],
    ["Del texto a la vida", "Esdras 7:10; 1 Corintios 8:9-13; Santiago 1:22-25"],
  ], 10),
  silabo: {
    proposito:
      "Que el obrero aprenda a interpretar la Biblia con fidelidad, para vivirla y enseñarla. La hermenéutica es el estudio de los principios para entender lo que Dios dijo por medio de los autores de la Escritura: leer cada texto en su contexto, atender a sus palabras, sus figuras y su género, interpretar la Escritura con la Escritura, con Cristo en el centro, y llevar su mensaje a la vida. Pablo se lo pidió a Timoteo: «Procura con diligencia presentarte a Dios aprobado, como obrero que no tiene de qué avergonzarse, que usa bien la palabra de verdad» (2 Timoteo 2:15).",
    objetivos: [
      { id: "o1", texto: "Explicar qué es la hermenéutica, la diferencia entre exégesis y eiségesis, y el papel del Espíritu Santo y del estudio en la interpretación.", bloom: "comprender" },
      { id: "o2", texto: "Interpretar un pasaje en su contexto literario e histórico, atendiendo al sentido de sus palabras, sus figuras y su cultura.", bloom: "aplicar" },
      { id: "o3", texto: "Distinguir los géneros literarios de la Biblia y leer cada uno según sus rasgos.", bloom: "analizar" },
      { id: "o4", texto: "Evaluar interpretaciones con las reglas sanas y reconocer los errores comunes.", bloom: "evaluar" },
      { id: "o5", texto: "Llevar un texto a la vida: su sentido original, su principio permanente y su aplicación de hoy.", bloom: "aplicar" },
      { id: "o6", texto: "Recitar 2 Timoteo 2:15 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "Los principios para interpretar la Biblia: el contexto, las palabras, las figuras, los géneros y las reglas sanas.",
      ser: "Un obrero humilde y diligente ante la Palabra, que no la tuerce y se deja corregir por ella.",
      hacer: "Estudiar un pasaje con método, explicarlo con fidelidad y aplicarlo a la vida y al ministerio.",
    },
    bibliografia: {
      basica: [
        { autor: "Gordon D. Fee y Douglas Stuart", titulo: "La lectura eficaz de la Biblia", editorial: "Vida" },
        { autor: "Henry A. Virkler", titulo: "Hermenéutica: principios y procedimientos de interpretación bíblica", editorial: "Vida" },
      ],
      complementaria: [
        { autor: "José M. Martínez", titulo: "Hermenéutica bíblica", editorial: "CLIE" },
        { autor: "Donald C. Stamps (ed.)", titulo: "Biblia de estudio Vida Plena (RVR1960)", editorial: "Vida" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Cómo leer las parábolas de Jesús", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=jZinwS_2jsQ", minutos: 6 },
      { tipo: "video", titulo: "El arte de la poesía bíblica", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=MnoXHW4Hqjs", minutos: 6 },
      { tipo: "video", titulo: "Los libros de Salomón: cómo leer la sabiduría", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=azmsdnZs0RE", minutos: 6 },
      { tipo: "video", titulo: "Cartas del Nuevo Testamento: contexto literario", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=Ck4eA4DKBHQ", minutos: 6 },
      { tipo: "video", titulo: "Cómo leer la literatura apocalíptica", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=6XQd-Z4h6zM", minutos: 7 },
      { tipo: "lectura", titulo: "Hechos 8: Felipe y el etíope", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Hechos&cap=8" },
      { tipo: "lectura", titulo: "Filipenses 4: contentarse en Cristo", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Filipenses&cap=4" },
    ],
  },
  disponible: true,
};

/** Nivel 3 · materia 2: el estudio inductivo y sus herramientas. */
const METODOS_ESTUDIO: MateriaDef = {
  id: "n3-metodos-estudio",
  nivel: 3,
  orden: 2,
  titulo: "Métodos de estudio bíblico",
  resumen: "El estudio inductivo (observar, interpretar y aplicar), las herramientas (versiones, concordancia, diccionario, Biblia de estudio, atlas y comentarios) y el estudio por libro, por tema, por palabra y biográfico.",
  base: "Hechos 17:11; Salmos 119:18",
  memoria: "Salmos 119:18",
  lecciones: lecciones("n3-metodos-estudio", [
    ["El estudio inductivo de la Biblia", "Hechos 17:11; Esdras 7:10; Salmos 119:18"],
    ["Observar: ver lo que dice el texto", "Efesios 2:1-10; Romanos 12:1"],
    ["Interpretar y aplicar con método", "2 Timoteo 3:16-17; Efesios 2:10; Santiago 1:22"],
    ["Las herramientas: versiones, concordancia y diccionario", "Proverbios 25:2; Juan 5:39; Lucas 1:1-4"],
    ["Mapas, historia y comentarios", "Lucas 10:30; Hechos 13:1-4; Amós 1:1"],
    ["Cuatro maneras de estudiar", "Hechos 4:36-37; 11:22-26; Salmos 1:1-3"],
  ], 10),
  silabo: {
    proposito:
      "Que el obrero sepa estudiar la Biblia por sí mismo, con método y con fruto. El estudio inductivo deja que el texto hable: primero se observa lo que dice, después se interpreta lo que significa y al final se aplica lo que pide. Las herramientas (las versiones, la concordancia, el diccionario bíblico, la Biblia de estudio, el atlas y los comentarios) ayudan a escudriñar sin reemplazar al texto. Así estudiaban los creyentes de Berea, que iban «escudriñando cada día las Escrituras para ver si estas cosas eran así» (Hechos 17:11).",
    objetivos: [
      { id: "o1", texto: "Explicar el estudio inductivo y sus tres pasos: observar, interpretar y aplicar.", bloom: "comprender" },
      { id: "o2", texto: "Observar un pasaje con las preguntas del observador y reconocer sus palabras clave, sus contrastes y sus conectores.", bloom: "aplicar" },
      { id: "o3", texto: "Interpretar con referencias cruzadas, resumir la idea central y formular aplicaciones concretas.", bloom: "aplicar" },
      { id: "o4", texto: "Usar las herramientas de estudio: versiones, concordancia, diccionario, Biblia de estudio, atlas, línea de tiempo y comentarios.", bloom: "aplicar" },
      { id: "o5", texto: "Hacer estudios por libro, por tema, por palabra y biográficos, y preparar un plan personal de estudio.", bloom: "crear" },
      { id: "o6", texto: "Recitar Salmos 119:18 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "El método inductivo, las herramientas de estudio y las maneras de estudiar la Biblia.",
      ser: "Un discípulo que escudriña cada día las Escrituras con oración, humildad y constancia.",
      hacer: "Estudiar un pasaje por su cuenta, anotar lo que descubre y prepararse para enseñarlo.",
    },
    bibliografia: {
      basica: [
        { autor: "Rick Warren", titulo: "Métodos de estudio bíblico personal", editorial: "Vida" },
        { autor: "James Strong", titulo: "Nueva concordancia Strong exhaustiva", editorial: "Caribe" },
      ],
      complementaria: [
        { autor: "Wilton M. Nelson (ed.)", titulo: "Nuevo diccionario ilustrado de la Biblia", editorial: "Caribe" },
        { autor: "Tim Dowley", titulo: "Atlas bíblico Portavoz", editorial: "Portavoz" },
        { autor: "Gordon D. Fee y Douglas Stuart", titulo: "La lectura eficaz de la Biblia", editorial: "Vida" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Agape: un estudio de la palabra amor", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=l75uPoo9Rs8", minutos: 5 },
      { tipo: "lectura", titulo: "Efesios 2: un pasaje para practicar la observación", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Efesios&cap=2" },
      { tipo: "lectura", titulo: "Hechos 13 y 14: el primer viaje de Pablo, con un mapa a mano", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Hechos&cap=13" },
    ],
  },
  disponible: true,
};

/** Nivel 3 · materia 3: de Génesis a Ester, libro por libro, con su estructura, su teología y cómo apunta a Cristo. */
const PENTATEUCO_HISTORICOS: MateriaDef = {
  id: "n3-pentateuco-historicos",
  nivel: 3,
  orden: 3,
  titulo: "Pentateuco y libros históricos",
  resumen: "De Génesis a Ester, más a fondo que en el Panorama: la estructura, el propósito y la teología de cada libro (la promesa a Abraham, la redención, el pacto, la santidad, el reino y el regreso) y cómo cada uno apunta a Cristo.",
  base: "Romanos 15:4; Lucas 24:27",
  memoria: "Deuteronomio 6:4-5",
  lecciones: lecciones("n3-pentateuco-historicos", [
    ["Génesis: los comienzos y la promesa", "Génesis 1:1, 27; 3:15; 12:1-3; 50:20"],
    ["Éxodo y Levítico: redención, pacto y santidad", "Éxodo 12:13; 19:5-6; 25:8; Levítico 17:11; 19:2"],
    ["Números y Deuteronomio: el desierto y el pacto renovado", "Números 14:8-9; 21:8-9; Deuteronomio 6:4-9; 18:15"],
    ["Josué, Jueces y Rut: la tierra, el olvido y la fidelidad", "Josué 21:45; 24:15; Jueces 21:25; Rut 1:16; 4:17"],
    ["Samuel, Reyes y Crónicas: el reino y el pacto con David", "1 Samuel 16:7; 2 Samuel 7:12-16; 2 Reyes 17:7; 2 Crónicas 7:14"],
    ["Esdras, Nehemías y Ester: el regreso y la providencia", "Esdras 1:1; 7:10; Nehemías 4:9; 8:10; Ester 4:14"],
  ], 10),
  silabo: {
    proposito:
      "Que el obrero conozca a fondo la primera gran parte del Antiguo Testamento, de Génesis a Ester, para enseñarla con fidelidad. Cada libro tiene su estructura, su propósito y su mensaje, y todos juntos cuentan cómo Dios cumple su promesa a Abraham: la redención de Egipto, el pacto del Sinaí, la santidad, la tierra, el reino de David, el exilio y el regreso. Jesús enseñó a leerlos así, cuando «les declaraba en todas las Escrituras lo que de él decían» (Lucas 24:27).",
    objetivos: [
      { id: "o1", texto: "Describir la estructura y el mensaje de Génesis, y la promesa a Abraham como hilo de toda la Biblia.", bloom: "comprender" },
      { id: "o2", texto: "Explicar la redención, el pacto, el tabernáculo, los sacrificios y la santidad en Éxodo y Levítico, y su cumplimiento en Cristo.", bloom: "analizar" },
      { id: "o3", texto: "Aplicar las lecciones del desierto (Números) y del pacto renovado (Deuteronomio) a la vida del creyente.", bloom: "aplicar" },
      { id: "o4", texto: "Analizar la conquista, el ciclo de los jueces y la fidelidad de Rut en la historia de la salvación.", bloom: "analizar" },
      { id: "o5", texto: "Explicar el reino en Samuel, Reyes y Crónicas: el pacto con David, la división, el exilio y la esperanza.", bloom: "comprender" },
      { id: "o6", texto: "Describir el regreso del exilio en Esdras y Nehemías y la providencia de Dios en Ester.", bloom: "comprender" },
      { id: "o7", texto: "Recitar Deuteronomio 6:4-5 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "La estructura, el propósito y la teología de los libros de Génesis a Ester.",
      ser: "Un creyente que recuerda las obras de Dios, confía en su fidelidad y lo ama con todo el corazón.",
      hacer: "Enseñar estos libros con su contexto y mostrando cómo apuntan a Cristo.",
    },
    bibliografia: {
      basica: [
        { autor: "Pablo Hoff", titulo: "El Pentateuco", editorial: "Vida" },
        { autor: "Pablo Hoff", titulo: "Los libros históricos: Dios y su pueblo en el Antiguo Testamento", editorial: "Vida" },
      ],
      complementaria: [
        { autor: "Samuel J. Schultz", titulo: "Habla el Antiguo Testamento", editorial: "Portavoz" },
        { autor: "Donald C. Stamps (ed.)", titulo: "Biblia de estudio Vida Plena (RVR1960)", editorial: "Vida" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Éxodo (parte 2)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=U2lUpubEMDI", minutos: 7 },
      { tipo: "video", titulo: "Resumen del libro de Números", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=dtfbSxNecMk", minutos: 8 },
      { tipo: "video", titulo: "Resumen del libro de Josué", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=49ggVrdBN_Y", minutos: 10 },
      { tipo: "video", titulo: "Resumen del libro de Jueces", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=bCwaJz4L2nU", minutos: 8 },
      { tipo: "video", titulo: "Resumen del libro de 1 Samuel", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=34biq4ivs5I", minutos: 8 },
      { tipo: "video", titulo: "Resumen de los libros de 1 y 2 Reyes", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=8V-TefJJc0g", minutos: 10 },
      { tipo: "video", titulo: "Resumen del libro de Crónicas", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=lMj--4fDpvc", minutos: 8 },
      { tipo: "video", titulo: "Resumen del libro de Ester", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=0NzTOuBKAcI", minutos: 10 },
    ],
  },
  disponible: true,
};

/** Nivel 3 · materia 4: los cuatro evangelios y la iglesia en el poder del Espíritu. */
const EVANGELIOS_HECHOS: MateriaDef = {
  id: "n3-evangelios-hechos",
  nivel: 3,
  orden: 4,
  titulo: "Los Evangelios y Hechos",
  resumen: "Los cuatro evangelios y su propósito, la persona de Jesús, el reino en palabras y obras, la cruz y la resurrección, y el avance de la iglesia en Hechos, de Jerusalén a Roma, en el poder del Espíritu.",
  base: "Juan 20:31; Hechos 1:8",
  memoria: "Mateo 16:16",
  lecciones: lecciones("n3-evangelios-hechos", [
    ["Cuatro relatos de un evangelio", "Marcos 1:1; Lucas 1:1-4; Juan 20:30-31"],
    ["La persona de Jesús", "Mateo 16:13-17; Juan 1:1-14; Lucas 1:35"],
    ["El reino de Dios en palabras y obras", "Marcos 1:14-15; Lucas 11:20; Mateo 13:31-33"],
    ["La cruz y la resurrección", "Marcos 10:45; Lucas 22:19-20; 1 Corintios 15:3-8"],
    ["Hechos 1 al 12: de Jerusalén a Antioquía", "Hechos 1:8; 2:1-42; 10:34-35; 11:26"],
    ["Hechos 13 al 28: hasta lo último de la tierra", "Hechos 13:2-4; 15:11; 16:9; 28:30-31"],
  ], 10),
  silabo: {
    proposito:
      "Que el obrero conozca a fondo los evangelios y el libro de Hechos para anunciar a Cristo y servir en la misión de la iglesia. Los evangelios son cuatro relatos, basados en testigos, de una sola buena noticia: quién es Jesús, qué hizo y por qué murió y resucitó. Hechos continúa la historia: la iglesia, llena del Espíritu, lleva el evangelio de Jerusalén hasta Roma. Juan lo resume así: estas cosas se escribieron «para que creyendo, tengáis vida en su nombre» (Juan 20:31).",
    objetivos: [
      { id: "o1", texto: "Explicar qué es un evangelio, por qué hay cuatro y el énfasis de Mateo, Marcos, Lucas y Juan.", bloom: "comprender" },
      { id: "o2", texto: "Explicar lo que los evangelios enseñan sobre la persona de Jesús: verdadero Dios y verdadero hombre, el Cristo, el Hijo de Dios y el Hijo del Hombre.", bloom: "analizar" },
      { id: "o3", texto: "Describir el reino de Dios en las palabras y las obras de Jesús, y el llamado a seguirlo.", bloom: "comprender" },
      { id: "o4", texto: "Explicar el sentido de la muerte y la resurrección de Jesús según los evangelios.", bloom: "analizar" },
      { id: "o5", texto: "Describir el avance de la iglesia en Hechos 1 al 12, de Jerusalén a Antioquía, en el poder del Espíritu.", bloom: "comprender" },
      { id: "o6", texto: "Describir los viajes de Pablo, el concilio de Jerusalén y la llegada del evangelio a Roma (Hechos 13 al 28).", bloom: "analizar" },
      { id: "o7", texto: "Recitar Mateo 16:16 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "El propósito de cada evangelio, la vida, la muerte y la resurrección de Jesús, y la historia de la iglesia en Hechos.",
      ser: "Un discípulo que confiesa a Jesús como el Cristo y lo sigue con su cruz cada día.",
      hacer: "Enseñar los evangelios y Hechos con su contexto, y testificar de Cristo en el poder del Espíritu.",
    },
    bibliografia: {
      basica: [
        { autor: "Merrill C. Tenney", titulo: "Nuestro Nuevo Testamento", editorial: "Portavoz" },
        { autor: "Stanley M. Horton", titulo: "El libro de los Hechos", editorial: "Vida" },
      ],
      complementaria: [
        { autor: "A. T. Robertson", titulo: "Una armonía de los cuatro evangelios", editorial: "Casa Bautista de Publicaciones" },
        { autor: "Donald C. Stamps (ed.)", titulo: "Biblia de estudio Vida Plena (RVR1960)", editorial: "Vida" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Marcos", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=gsXLQkppzUc", minutos: 11 },
      { tipo: "video", titulo: "Resumen del libro de Lucas (parte 1)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=bPzhlL9zKmg", minutos: 9 },
      { tipo: "video", titulo: "Resumen del libro de Mateo (parte 2)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=EobkNEf-ySA", minutos: 8 },
      { tipo: "video", titulo: "Evangelio de Lucas 24: la resurrección", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=WHlHoQy3bVk", minutos: 6 },
      { tipo: "video", titulo: "El apóstol Pablo: Hechos 8 a 12", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=sEhT1mA-HU0", minutos: 7 },
      { tipo: "lectura", titulo: "Hechos 2: Pentecostés y la primera iglesia", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Hechos&cap=2" },
    ],
  },
  disponible: true,
};

/** Nivel 3 · materia 5: la persona y la obra del Espíritu Santo, con los artículos 4, 9, 10 y 15 de la declaración de fe. */
const ESPIRITU_SANTO: MateriaDef = {
  id: "n3-espiritu-santo",
  nivel: 3,
  orden: 5,
  titulo: "La persona y obra del Espíritu Santo",
  resumen: "Una persona divina, su obra en el Antiguo Testamento y en Jesús, en la salvación, el bautismo en el Espíritu Santo, los dones y el fruto, y andar en el Espíritu.",
  base: "Zacarías 4:6; Hechos 1:8",
  memoria: "Zacarías 4:6",
  lecciones: lecciones("n3-espiritu-santo", [
    ["El Espíritu Santo, una persona divina", "Zacarías 4:6; Juan 14:16-17; Juan 16:13-14; 1 Corintios 12:11; Efesios 4:30; Hechos 5:3-4; Hebreos 9:14"],
    ["El Espíritu en el Antiguo Testamento y en Jesús", "Génesis 1:2; 1 Samuel 16:13; Ezequiel 36:26-27; Joel 2:28-29; Lucas 1:35; Lucas 3:21-22; Lucas 4:1; Lucas 4:18; Hechos 10:38"],
    ["El Espíritu en la salvación", "Juan 16:8; Juan 3:5-6; Tito 3:5; Romanos 8:9; Romanos 8:14-16; Efesios 1:13-14; 1 Corintios 12:13"],
    ["El bautismo en el Espíritu Santo", "Hechos 1:4-5; Hechos 2:1-4; Hechos 8:14-17; Hechos 19:1-6; Lucas 11:13; 1 Corintios 12:30"],
    ["Los dones y el fruto del Espíritu", "1 Corintios 12:11; 1 Corintios 13:1-2; 1 Corintios 14:1; Gálatas 5:22-25"],
    ["Andar en el Espíritu", "Gálatas 5:16-17; Romanos 8:13; Efesios 5:18; Hechos 16:6-7; Efesios 4:30; Juan 7:37-39"],
  ], 10),
  silabo: {
    proposito:
      "Que el obrero conozca al Espíritu Santo y sirva en su poder, siguiendo los artículos 4, 9, 10 y 15 de la declaración de fe: que es una persona divina, cómo obró en el Antiguo Testamento y en la vida de Jesús, qué hace en la salvación, qué es el bautismo en el Espíritu Santo y cómo se recibe, cómo se relacionan los dones con el fruto, y cómo se anda en el Espíritu cada día. Los dones se estudiaron en el Nivel 2; aquí se miran junto al fruto. Si hablar en lenguas es la señal inicial y necesaria del bautismo en el Espíritu es un punto de la declaración de fe por confirmar: la materia presenta las dos posiciones pentecostales con respeto. Su base es la palabra de Dios a Zorobabel: «No con ejército, ni con fuerza, sino con mi Espíritu, ha dicho Jehová de los ejércitos» (Zacarías 4:6).",
    objetivos: [
      { id: "o1", texto: "Explicar con la Biblia que el Espíritu Santo es una persona y que es Dios.", bloom: "comprender" },
      { id: "o2", texto: "Describir la obra del Espíritu en el Antiguo Testamento, la promesa de los profetas y su obra en Jesús.", bloom: "comprender" },
      { id: "o3", texto: "Explicar la obra del Espíritu en la salvación: convencer, regenerar, morar y sellar.", bloom: "comprender" },
      { id: "o4", texto: "Analizar el bautismo en el Espíritu Santo en el libro de los Hechos y cómo se recibe.", bloom: "analizar" },
      { id: "o5", texto: "Evaluar el ministerio por el fruto del Espíritu y no solo por los dones.", bloom: "evaluar" },
      { id: "o6", texto: "Aplicar a la vida del obrero el andar en el Espíritu: ser lleno, dejarse guiar y no contristarlo.", bloom: "aplicar" },
      { id: "o7", texto: "Recitar Zacarías 4:6 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "Lo que la Biblia enseña sobre la persona y la obra del Espíritu Santo, y el bautismo en el Espíritu según los Hechos.",
      ser: "Un obrero que depende del Espíritu y en quien crece el fruto del Espíritu.",
      hacer: "Buscar ser lleno del Espíritu, servir con sus dones y con amor, y dejarse guiar por él en el ministerio.",
    },
    bibliografia: {
      basica: [
        { autor: "Stanley M. Horton", titulo: "El Espíritu Santo revelado en la Biblia", editorial: "Vida" },
        { autor: "Guy P. Duffield y Nathaniel M. Van Cleave", titulo: "Fundamentos de teología pentecostal", editorial: "Foursquare Media" },
      ],
      complementaria: [{ autor: "Myer Pearlman", titulo: "Teología bíblica y sistemática", editorial: "Vida", nota: "Su sección sobre el Espíritu Santo." }],
    },
    recursos: [
      { tipo: "video", titulo: "Qué sucedió en Pentecostés y por qué es importante", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=OisTpQEle6E", minutos: 7 },
      { tipo: "video", titulo: "Resumen del libro de Juan (parte 2)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=NUW1Frg8DA0", minutos: 9 },
      { tipo: "lectura", titulo: "Hechos 2: el día de Pentecostés", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Hechos&cap=2" },
      { tipo: "lectura", titulo: "Gálatas 5: andar en el Espíritu", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Galatas&cap=5" },
      { tipo: "lectura", titulo: "Declaración de fe del Ministerio Avivando el Fuego", fuente: "Academia Avivando el Fuego", url: "/academia/declaracion-de-fe" },
    ],
  },
  disponible: true,
};

/** Nivel 3 · materia 6: el evangelismo como ministerio de la iglesia y la consolidación del nuevo creyente. */
const EVANGELISMO_CONSOLIDACION: MateriaDef = {
  id: "n3-evangelismo-consolidacion",
  nivel: 3,
  orden: 6,
  titulo: "Evangelismo y consolidación",
  resumen: "El evangelismo como ministerio de la iglesia (en equipo, en las casas, en campañas, en la calle, en la radio y en las redes) y la consolidación del nuevo creyente hasta que echa raíces, se integra a la iglesia y empieza a servir.",
  base: "2 Corintios 5:20; Colosenses 1:28",
  memoria: "Colosenses 1:28",
  antes: "Evangelismo 2",
  lecciones: lecciones("n3-evangelismo-consolidacion", [
    ["La iglesia que evangeliza", "2 Corintios 5:14-20; Efesios 4:11-12; Romanos 10:14-15"],
    ["En equipo, en las casas y en la comunidad", "Lucas 10:1-9; Hechos 20:20; Colosenses 4:5-6"],
    ["Campañas, calle, radio y redes", "Hechos 8:5-8; 17:17; 2 Timoteo 2:24-25"],
    ["La consolidación: cuidar al nuevo creyente", "Hechos 14:21-22; Mateo 13:20-21; 1 Tesalonicenses 2:7-8"],
    ["El plan de consolidación", "1 Juan 5:11-13; Hechos 2:41-42; 18:26; 2 Timoteo 2:2"],
    ["Obstáculos, restauración y fruto que permanece", "Gálatas 6:1-2; Filipenses 1:6; Juan 15:16"],
  ], 10),
  silabo: {
    proposito:
      "Que el obrero evangelice como parte de un ministerio organizado y sepa cuidar a los que creen hasta que echan raíces. El evangelismo tiene un mensaje, el de Cristo muerto y resucitado; un poder, el del Espíritu Santo; y un motivo, el amor de Cristo. Se hace en equipo y por distintos medios, y no termina en el sí de una persona: continúa en la consolidación, que afirma al nuevo creyente, lo integra a la iglesia y lo lleva a servir. Pablo lo resume así: anunciamos a Cristo «a fin de presentar perfecto en Cristo Jesús a todo hombre» (Colosenses 1:28).",
    objetivos: [
      { id: "o1", texto: "Explicar el fundamento bíblico del evangelismo y el papel de toda la iglesia y del evangelista.", bloom: "comprender" },
      { id: "o2", texto: "Organizar el evangelismo en equipo y en la comunidad, con respeto, seguridad y cuidado de la privacidad.", bloom: "aplicar" },
      { id: "o3", texto: "Evaluar el evangelismo en campañas, en la calle, en la radio y en las redes por su fidelidad y su fruto.", bloom: "evaluar" },
      { id: "o4", texto: "Explicar qué es la consolidación y por qué la meta es hacer discípulos.", bloom: "comprender" },
      { id: "o5", texto: "Aplicar un plan de consolidación con prudencia, desde el primer contacto hasta el servicio.", bloom: "aplicar" },
      { id: "o6", texto: "Acompañar al nuevo creyente en sus obstáculos y restaurarlo con mansedumbre, buscando fruto que permanezca.", bloom: "aplicar" },
      { id: "o7", texto: "Recitar Colosenses 1:28 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "El fundamento del evangelismo, sus medios y los pasos de la consolidación.",
      ser: "Un testigo movido por el amor de Cristo, paciente y prudente con los que empiezan.",
      hacer: "Evangelizar en equipo y acompañar a un nuevo creyente hasta que se integre a la iglesia.",
    },
    bibliografia: {
      basica: [
        { autor: "Robert E. Coleman", titulo: "Plan supremo de evangelización", editorial: "Casa Bautista de Publicaciones" },
        { autor: "Rick Warren", titulo: "Una iglesia con propósito", editorial: "Vida" },
      ],
      complementaria: [
        { autor: "Billy Graham", titulo: "Paz con Dios", nota: "Un clásico para leer con los nuevos creyentes." },
        { autor: "Donald C. Stamps (ed.)", titulo: "Biblia de estudio Vida Plena (RVR1960)", editorial: "Vida" },
      ],
    },
    recursos: [
      { tipo: "lectura", titulo: "Lucas 10: los setenta enviados de dos en dos", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Lucas&cap=10" },
      { tipo: "lectura", titulo: "Hechos 14: volver a confirmar a los discípulos", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Hechos&cap=14" },
      { tipo: "lectura", titulo: "1 Tesalonicenses 2: como la nodriza que cuida a sus hijos", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=1%20Tesalonicenses&cap=2" },
    ],
  },
  disponible: true,
};

/** Nivel 3 · materia 7: el liderazgo como servicio, el carácter del líder y el trabajo en equipo. */
const LIDERAZGO_1: MateriaDef = {
  id: "n3-liderazgo-1",
  nivel: 3,
  orden: 7,
  titulo: "Liderazgo cristiano I",
  resumen: "El liderazgo como servicio según Jesús, el carácter del líder, la vida con Dios, el descanso y la familia, el trabajo en equipo, los conflictos, las decisiones y la formación de nuevos líderes.",
  base: "Marcos 10:42-45; 1 Pedro 5:2-3",
  memoria: "Marcos 10:45",
  lecciones: lecciones("n3-liderazgo-1", [
    ["¿Qué es el liderazgo cristiano?", "Marcos 10:35-45; 1 Timoteo 3:1; Zacarías 4:6"],
    ["El carácter del líder", "1 Timoteo 3:1-7; Proverbios 11:3; 1 Pedro 5:5; Hechos 20:28"],
    ["Servir como Jesús", "Juan 13:1-17; Filipenses 2:3-8; 1 Pedro 5:2-3; 3 Juan 1:9-10"],
    ["La vida del líder con Dios", "Éxodo 33:15; Marcos 1:35; 6:31; 1 Timoteo 4:12-16"],
    ["El trabajo en equipo", "Éxodo 18:13-23; Hechos 6:1-7; Romanos 12:4-5; Eclesiastés 4:9-10"],
    ["Conflictos, decisiones y nuevos líderes", "Efesios 4:2-3; Proverbios 15:22; Hechos 15:28; 2 Timoteo 2:2; 4:7"],
  ], 10),
  silabo: {
    proposito:
      "Que el obrero lidere como Jesús: sirviendo. El liderazgo cristiano es influir en las personas para que sigan a Cristo, y no se apoya en el cargo ni en el carisma, sino en el carácter, en la vida con Dios y en el servicio. La materia trata el carácter que pide la Escritura, el ejemplo de Jesús y del buen pastor, los peligros del abuso de poder, el cuidado del descanso y de la familia, el trabajo en equipo y la formación de nuevos líderes. Jesús lo resumió así: «el Hijo del Hombre no vino para ser servido, sino para servir, y para dar su vida en rescate por muchos» (Marcos 10:45).",
    objetivos: [
      { id: "o1", texto: "Explicar el liderazgo cristiano como influencia al servicio de Dios y de los demás, según Marcos 10:42-45.", bloom: "comprender" },
      { id: "o2", texto: "Describir el carácter que la Biblia pide al líder: integridad, humildad, dominio propio y buen testimonio.", bloom: "analizar" },
      { id: "o3", texto: "Aplicar el modelo de servicio de Jesús y del buen pastor, y reconocer los abusos del poder.", bloom: "aplicar" },
      { id: "o4", texto: "Cuidar la vida con Dios, el descanso y la familia como base del liderazgo.", bloom: "aplicar" },
      { id: "o5", texto: "Organizar el trabajo en equipo: delegar con confianza y cuidar la unidad.", bloom: "aplicar" },
      { id: "o6", texto: "Resolver conflictos y tomar decisiones con oración, Escritura y consejo, y formar nuevos líderes.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar Marcos 10:45 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "La enseñanza bíblica sobre el liderazgo de servicio, el carácter del líder y el trabajo en equipo.",
      ser: "Un líder humilde e íntegro, que cuida su vida con Dios, su descanso y su familia, y rinde cuentas.",
      hacer: "Servir y guiar a un grupo o a un equipo, delegar, resolver conflictos y formar a otros.",
    },
    bibliografia: {
      basica: [
        { autor: "J. Oswald Sanders", titulo: "Liderazgo espiritual", editorial: "Portavoz" },
        { autor: "Henry y Richard Blackaby", titulo: "Liderazgo espiritual: cómo movilizar a las personas hacia el propósito de Dios", editorial: "B&H Español" },
      ],
      complementaria: [
        { autor: "Donald C. Stamps (ed.)", titulo: "Biblia de estudio Vida Plena (RVR1960)", editorial: "Vida" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen de los libros de Esdras y Nehemías: un líder que ora y trabaja", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=OGdiLZ92nQs", minutos: 10 },
      { tipo: "video", titulo: "Resumen del libro de Tito", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=SuJmsIu_1-M", minutos: 10 },
      { tipo: "lectura", titulo: "Juan 13: Jesús lava los pies de sus discípulos", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Juan&cap=13" },
      { tipo: "lectura", titulo: "Éxodo 18: el consejo de Jetro", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Exodo&cap=18" },
    ],
  },
  disponible: true,
};

const HOMILETICA_1: MateriaDef = {
  id: "n3-homiletica-1",
  nivel: 3,
  orden: 8,
  titulo: "Homilética I",
  resumen: "Preparar y dar una enseñanza bíblica breve: partir del texto, formular la idea central y el propósito, organizar el mensaje, ilustrarlo y aplicarlo con Cristo en el centro, y hablar en público con el poder de Dios.",
  base: "2 Timoteo 4:1-2; Nehemías 8:8",
  memoria: "2 Timoteo 4:2",
  lecciones: lecciones("n3-homiletica-1", [
    ["El encargo de predicar y enseñar", "2 Timoteo 4:1-2; Mateo 4:23; Nehemías 8:8; 1 Corintios 2:3-5; Santiago 3:1"],
    ["Del texto al mensaje", "2 Timoteo 2:15; Esdras 7:10; Lucas 15:1-7"],
    ["La idea central y el propósito", "Hechos 2:36-38; Isaías 55:10-11"],
    ["La estructura del mensaje", "Hechos 17:22-31"],
    ["Ilustrar, aplicar y mostrar a Cristo", "Mateo 13:34; Santiago 1:22; Lucas 24:27; 2 Timoteo 3:16-17"],
    ["Hablar en público con el poder de Dios", "Éxodo 4:10-12; Jeremías 1:6-9; 1 Corintios 2:4-5; Proverbios 27:17"],
  ], 10),
  silabo: {
    proposito:
      "Que el obrero sepa preparar y dar una enseñanza bíblica breve: un devocional, un estudio en grupo, una clase o una predicación corta. La materia enseña a partir del texto y no de una idea propia, a formular la idea central y el propósito, a organizar el mensaje con introducción, desarrollo y conclusión, a ilustrarlo y aplicarlo con Cristo en el centro, y a hablar en público dependiendo del Espíritu Santo. Prepara la enseñanza grabada que pide el Nivel 3; la predicación expositiva con rúbrica es la materia Homilética II, del Nivel 4. El encargo es el de Pablo a Timoteo: «que prediques la palabra; que instes a tiempo y fuera de tiempo» (2 Timoteo 4:2).",
    objetivos: [
      { id: "o1", texto: "Explicar el encargo bíblico de predicar y enseñar la Palabra, la responsabilidad del que enseña y la fuente de su poder.", bloom: "comprender" },
      { id: "o2", texto: "Estudiar un pasaje completo en su contexto y escribir en una frase lo que el autor quiso decir.", bloom: "aplicar" },
      { id: "o3", texto: "Formular la idea central de un mensaje, con su tema y su complemento, y su propósito.", bloom: "crear" },
      { id: "o4", texto: "Organizar un mensaje con introducción, desarrollo y conclusión, con puntos que salen del texto.", bloom: "aplicar" },
      { id: "o5", texto: "Usar ilustraciones verdaderas y aplicaciones concretas, y mostrar a Cristo sin forzar el texto.", bloom: "aplicar" },
      { id: "o6", texto: "Evaluar una enseñanza y preparar la enseñanza grabada del Nivel 3, hablando con claridad y dependiendo del Espíritu.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar 2 Timoteo 4:2 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "Los pasos para preparar un mensaje bíblico: el estudio del pasaje, la idea central, el propósito, la estructura, la ilustración y la aplicación.",
      ser: "Un maestro fiel al texto, honesto y humilde, que vive primero lo que enseña y depende del poder de Dios.",
      hacer: "Preparar y dar un devocional, un estudio o una predicación corta, y grabar la enseñanza del Nivel 3.",
    },
    bibliografia: {
      basica: [
        { autor: "Haddon W. Robinson", titulo: "La predicación bíblica: desarrollo y presentación de mensajes expositivos", editorial: "Unilit" },
        { autor: "James D. Crane", titulo: "El sermón eficaz", editorial: "Casa Bautista de Publicaciones" },
      ],
      complementaria: [
        { autor: "Orlando E. Costas", titulo: "Comunicación por medio de la predicación", editorial: "Caribe" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de 2 Timoteo", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=lvNqjbjTytE", minutos: 9 },
      { tipo: "video", titulo: "Cómo leer las parábolas de Jesús", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=jZinwS_2jsQ", minutos: 6 },
      { tipo: "lectura", titulo: "Nehemías 8: la lectura de la ley", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Nehemias&cap=8" },
      { tipo: "lectura", titulo: "Hechos 17: Pablo en Atenas", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Hechos&cap=17" },
    ],
  },
  disponible: true,
};

const HISTORIA_1: MateriaDef = {
  id: "n3-historia-1",
  nivel: 3,
  orden: 9,
  titulo: "Historia de la iglesia I",
  resumen: "De Pentecostés a la víspera de la Reforma: la iglesia de los apóstoles, los mártires, la defensa de la fe, el canon y los credos, Constantino y los concilios, Agustín y la Edad Media, y los que pidieron volver a la Biblia.",
  base: "Mateo 16:18; Hebreos 13:7-8",
  memoria: "Hebreos 13:8",
  lecciones: lecciones("n3-historia-1", [
    ["La iglesia de los apóstoles y su expansión", "Mateo 16:18; Hechos 1:8; 2:41-42; 8:4; 11:26"],
    ["Los mártires: fieles hasta la muerte", "Apocalipsis 2:8-10; Hechos 7:59-60; 1 Pedro 4:12-16"],
    ["Defender la fe: apologistas, canon y credos", "Judas 1:3; 1 Pedro 3:15; 1 Juan 4:2-3; 2 Pedro 3:15-16; 2 Timoteo 1:13-14"],
    ["Constantino y los grandes concilios", "Juan 18:36; 1:1-3; 1:14; Colosenses 2:8-9"],
    ["Agustín, los monjes y la Edad Media", "Romanos 13:13-14; Efesios 2:8-9; Mateo 28:19-20"],
    ["Antes de la Reforma: volver a la Palabra", "Salmos 119:105; Hechos 5:29; Isaías 40:8; Hebreos 13:7-8"],
  ], 10),
  silabo: {
    proposito:
      "Que el obrero conozca la historia de la iglesia desde Pentecostés hasta la víspera de la Reforma, para ver cómo Cristo ha edificado su iglesia a través de los siglos, aprender de la fidelidad de los mártires y de los que defendieron la fe, reconocer los errores que se deben evitar y valorar la Biblia que hoy tiene en su idioma. La materia recorre la iglesia de los apóstoles, las persecuciones, la defensa de la fe, el canon y los credos, Constantino y los concilios, Agustín y la Edad Media, y a los que pidieron volver a la Biblia antes de la Reforma. La Reforma, los avivamientos, el pentecostalismo y la iglesia en América Latina son la materia Historia de la iglesia II, del Nivel 4. El hilo de toda esta historia: «Jesucristo es el mismo ayer, y hoy, y por los siglos» (Hebreos 13:8).",
    objetivos: [
      { id: "o1", texto: "Describir el nacimiento y la expansión de la iglesia en el siglo I y la obra de los Padres apostólicos.", bloom: "comprender" },
      { id: "o2", texto: "Explicar las persecuciones del Imperio romano y el testimonio de los mártires.", bloom: "comprender" },
      { id: "o3", texto: "Explicar cómo la iglesia defendió la fe frente a las herejías, reconoció el canon del Nuevo Testamento y resumió su fe en los credos.", bloom: "analizar" },
      { id: "o4", texto: "Resumir lo que confesaron los concilios de Nicea, Constantinopla y Calcedonia, y evaluar el cambio que trajo Constantino.", bloom: "evaluar" },
      { id: "o5", texto: "Describir la enseñanza de Agustín sobre la gracia, el papel de los monasterios y de las misiones, y los cambios de la iglesia medieval.", bloom: "analizar" },
      { id: "o6", texto: "Evaluar el aporte de Valdo, Wiclef y Hus, y cómo la imprenta y el estudio del griego prepararon la Reforma.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar Hebreos 13:8 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "Los hechos, las personas y las fechas principales de la iglesia desde Pentecostés hasta la víspera de la Reforma, y cómo se reconoció el canon y se formularon los credos.",
      ser: "Un creyente agradecido y humilde, que se sabe parte de la gran nube de testigos y quiere ser fiel como los mártires.",
      hacer: "Enseñar la historia de la iglesia con exactitud, defender la fe con mansedumbre y aprender de los errores del pasado.",
    },
    bibliografia: {
      basica: [
        { autor: "Justo L. González", titulo: "Historia del cristianismo, tomo 1: desde la era de los mártires hasta la era de los sueños frustrados", editorial: "Unilit" },
        { autor: "Jesse Lyman Hurlbut", titulo: "Historia de la iglesia cristiana", editorial: "Vida" },
      ],
      complementaria: [],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Hechos (parte 1): Hechos 1-12", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=5h7Q0EK-m8I", minutos: 9 },
      { tipo: "video", titulo: "Resumen del libro de Judas: contender por la fe", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=vhPyNSJiRZ8", minutos: 9 },
      { tipo: "lectura", titulo: "Hechos 11: la iglesia en Antioquía", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Hechos&cap=11" },
      { tipo: "lectura", titulo: "Apocalipsis 2: la carta a Esmirna", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Apocalipsis&cap=2" },
    ],
  },
  disponible: true,
};

const CONSEJERIA_BASICA: MateriaDef = {
  id: "n3-consejeria-basica",
  nivel: 3,
  orden: 10,
  titulo: "Cuidado y consejería básica",
  resumen: "El primer nivel de ayuda entre hermanos: escuchar, orar con otros y aconsejar con la Palabra, acompañar en el duelo y en la crisis, saber cuándo derivar, proteger a los débiles y cuidar la propia vida.",
  base: "Gálatas 6:1-2; 2 Corintios 1:3-4",
  memoria: "Gálatas 6:2",
  lecciones: lecciones("n3-consejeria-basica", [
    ["El cuidado mutuo en el cuerpo de Cristo", "Gálatas 6:2; 2 Corintios 1:3-4; Romanos 15:14; Isaías 9:6"],
    ["Escuchar como Jesús", "Santiago 1:19; Proverbios 18:13; Lucas 24:15-17; Proverbios 20:5; Job 2:13"],
    ["Orar con otros y aconsejar con la Palabra", "Santiago 5:13-16; Filipenses 4:6-7; Proverbios 25:11; Colosenses 4:14"],
    ["Acompañar en el duelo y en la crisis", "Juan 11:32-36; 1 Tesalonicenses 4:13-14; Salmos 34:18; 1 Reyes 19:4-8"],
    ["Saber cuándo derivar y cómo proteger", "Éxodo 18:17-18; Proverbios 11:14; Proverbios 24:11; Romanos 13:3-4"],
    ["La ética y el cuidado del que ayuda", "Proverbios 11:13; Gálatas 6:1; Marcos 6:31"],
  ], 10),
  silabo: {
    proposito:
      "Que el obrero sepa cuidar a sus hermanos en el primer nivel de ayuda: escuchar con atención, orar con otros, aconsejar con la Palabra a su tiempo, acompañar en el duelo y en la crisis, y reconocer cuándo una situación pide al pastor o a un profesional. La materia no forma consejeros profesionales: enseña a ayudar con amor y con prudencia, a proteger a los débiles, a guardar la confidencialidad con sus límites y a cuidar la propia vida. La especialidad Familia y consejería profundiza estos temas. El mandato es el de Pablo: «Sobrellevad los unos las cargas de los otros, y cumplid así la ley de Cristo» (Gálatas 6:2).",
    objetivos: [
      { id: "o1", texto: "Explicar el llamado bíblico al cuidado mutuo y distinguir los niveles de ayuda: entre hermanos, pastoral y profesional.", bloom: "comprender" },
      { id: "o2", texto: "Aplicar las habilidades para escuchar: atención, preguntas abiertas, reflejar y aceptar las emociones.", bloom: "aplicar" },
      { id: "o3", texto: "Orar con otros y usar la Escritura con sabiduría, sin oponer la fe a la ayuda médica.", bloom: "aplicar" },
      { id: "o4", texto: "Acompañar en el duelo y dar los primeros pasos en una crisis.", bloom: "aplicar" },
      { id: "o5", texto: "Reconocer cuándo derivar y qué hacer ante el riesgo de suicidio y ante el abuso.", bloom: "evaluar" },
      { id: "o6", texto: "Aplicar la confidencialidad con sus límites, las normas de prudencia y el cuidado de uno mismo.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar Gálatas 6:2 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "La enseñanza bíblica sobre el cuidado mutuo, el consuelo y el consejo, y los principios básicos para escuchar, acompañar y derivar.",
      ser: "Un hermano compasivo, discreto y humilde, que escucha antes de hablar y conoce sus límites.",
      hacer: "Escuchar, orar con otros, acompañar en el duelo y en la crisis, derivar a tiempo y proteger a los débiles.",
    },
    bibliografia: {
      basica: [
        { autor: "Gary R. Collins", titulo: "Consejería cristiana efectiva", editorial: "Portavoz" },
        { autor: "Pablo Hoff", titulo: "El pastor como consejero", editorial: "Vida" },
      ],
      complementaria: [],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Gálatas: sobrellevar las cargas", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=kMJLgLOWb3I", minutos: 10 },
      { tipo: "video", titulo: "Resumen del libro de 2 Corintios: el Dios de toda consolación", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=jV7dTkYFym4", minutos: 10 },
      { tipo: "lectura", titulo: "Juan 11: Jesús llora con Marta y María", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Juan&cap=11" },
      { tipo: "lectura", titulo: "Job 2: los amigos que se sentaron en silencio", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Job&cap=2" },
    ],
  },
  disponible: true,
};

// ---------------------------------------------------------------- Nivel 4 · Teología ministerial
const SISTEMATICA_1: MateriaDef = {
  id: "n4-sistematica-1",
  nivel: 4,
  orden: 1,
  titulo: "Teología sistemática I: la Biblia y Dios",
  resumen: "La doctrina de las Escrituras y la doctrina de Dios: la revelación, la inspiración, la autoridad y la confiabilidad de la Biblia; la existencia, los nombres y los atributos de Dios; la Trinidad, la creación y la providencia.",
  base: "2 Timoteo 3:16-17; Deuteronomio 6:4",
  memoria: "2 Timoteo 3:16",
  lecciones: lecciones("n4-sistematica-1", [
    ["La revelación de Dios", "Salmos 19:1-4; Romanos 1:19-20; Hebreos 1:1-2; Juan 1:18"],
    ["La inspiración y la autoridad de la Biblia", "2 Timoteo 3:16-17; 2 Pedro 1:20-21; Mateo 5:17-18; Juan 10:35"],
    ["Una Biblia sin error, clara y suficiente", "Proverbios 30:5-6; Isaías 40:8; Salmos 19:7-8; 1 Corintios 2:12-14"],
    ["El Dios que existe y tiene nombre", "Hebreos 11:6; Romanos 11:33-36; Éxodo 3:13-15; Juan 8:58"],
    ["Los atributos de Dios", "Salmos 90:2; Salmos 139:7-10; Malaquías 3:6; Isaías 6:3; 1 Juan 4:8-10; Romanos 3:25-26"],
    ["La Trinidad, la creación y la providencia", "Deuteronomio 6:4; Mateo 3:16-17; Mateo 28:19; Hebreos 11:3; Colosenses 1:16-17; Romanos 8:28"],
  ], 10),
  silabo: {
    proposito:
      "Que el obrero conozca con orden lo que toda la Biblia enseña sobre la Escritura y sobre Dios: la revelación, la inspiración, la autoridad, la confiabilidad y la suficiencia de la Biblia; la existencia, los nombres y los atributos de Dios; la Trinidad, la creación y la providencia. Es la primera de las cuatro materias de teología sistemática del Nivel 4 y sigue los dos primeros artículos de la declaración de fe del ministerio. El fundamento es la Palabra: «Toda la Escritura es inspirada por Dios, y útil para enseñar, para redargüir, para corregir, para instruir en justicia» (2 Timoteo 3:16).",
    objetivos: [
      { id: "o1", texto: "Distinguir la revelación general de la especial y reconocer a Cristo como la revelación suprema de Dios.", bloom: "comprender" },
      { id: "o2", texto: "Explicar la inspiración verbal y plenaria de la Escritura y su autoridad, según 2 Timoteo 3:16, 2 Pedro 1:20-21 y la enseñanza de Jesús.", bloom: "comprender" },
      { id: "o3", texto: "Explicar que la Biblia es sin error en lo que enseña, cómo nos llegó su texto, y su suficiencia y claridad.", bloom: "analizar" },
      { id: "o4", texto: "Explicar la existencia de Dios, cómo se le conoce y el significado de sus nombres.", bloom: "comprender" },
      { id: "o5", texto: "Explicar los atributos de Dios con sus pasajes y aplicarlos a la vida cristiana.", bloom: "aplicar" },
      { id: "o6", texto: "Explicar la Trinidad, reconocer los errores sobre ella y explicar la creación y la providencia.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar 2 Timoteo 3:16 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "La doctrina de las Escrituras y la doctrina de Dios: la revelación, la inspiración, la autoridad, los atributos y la Trinidad.",
      ser: "Un creyente que se somete a la Palabra y que adora a Dios porque lo conoce.",
      hacer: "Enseñar con claridad lo que la Biblia dice de sí misma y de Dios, y responder con mansedumbre a los errores sobre la Trinidad.",
    },
    bibliografia: {
      basica: [
        { autor: "Myer Pearlman", titulo: "Teología bíblica y sistemática", editorial: "Vida" },
        { autor: "Guy P. Duffield y Nathaniel M. Van Cleave", titulo: "Fundamentos de teología pentecostal", editorial: "Foursquare Media" },
      ],
      complementaria: [
        { autor: "Pablo Hoff", titulo: "Teología evangélica", editorial: "Vida" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Cómo es que Dios es uno y tres al mismo tiempo", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=g05ydbCIDHM", minutos: 9 },
      { tipo: "video", titulo: "Carácter de Dios", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=oHMicgEfIrY", minutos: 6 },
      { tipo: "lectura", titulo: "Salmos 19: los cielos y la ley de Jehová", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Salmos&cap=19" },
      { tipo: "lectura", titulo: "Éxodo 3: YO SOY EL QUE SOY", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Exodo&cap=3" },
    ],
  },
  disponible: true,
};

const SISTEMATICA_2: MateriaDef = {
  id: "n4-sistematica-2",
  nivel: 4,
  orden: 2,
  titulo: "Teología sistemática II: Cristo y el Espíritu Santo",
  resumen: "La cristología y la pneumatología: la deidad y la humanidad de Cristo, Nicea y Calcedonia, la obra de la cruz, sus oficios y su exaltación; la deidad y la personalidad del Espíritu, Constantinopla, los dones y el bautismo en el Espíritu.",
  base: "Colosenses 2:9; Juan 15:26",
  memoria: "Colosenses 2:9",
  lecciones: lecciones("n4-sistematica-2", [
    ["La deidad de Cristo", "Colosenses 2:9; Juan 1:1-3; Juan 8:58; Hebreos 1:3; Hebreos 1:8; Juan 20:28"],
    ["La humanidad de Cristo y sus dos naturalezas", "Hebreos 2:14-17; Lucas 2:52; Filipenses 2:5-11; 1 Timoteo 2:5"],
    ["La obra de Cristo en la cruz", "Isaías 53:5-6; 2 Corintios 5:21; Marcos 10:45; Romanos 3:24-26; Hebreos 9:12; 1 Pedro 2:24"],
    ["Profeta, sacerdote y rey: la resurrección y la intercesión", "Deuteronomio 18:15; Hebreos 4:14; Apocalipsis 19:16; 1 Corintios 15:3-8; 1 Corintios 15:17-20; Hechos 1:9-11; Hebreos 7:25; Romanos 8:34"],
    ["La deidad y la personalidad del Espíritu Santo", "1 Corintios 2:10-11; Salmos 139:7-8; Hechos 13:2; Juan 15:26"],
    ["Los dones, el bautismo en el Espíritu y el discernimiento", "1 Corintios 12:7-11; 1 Corintios 13:8-10; 1 Corintios 14:39-40; Hechos 2:38-39; 1 Juan 4:1-3"],
  ], 10),
  silabo: {
    proposito:
      "Que el líder conozca con orden lo que toda la Escritura enseña sobre Cristo y sobre el Espíritu Santo, siguiendo los artículos 3, 4, 9, 10 y 11 de la declaración de fe: la deidad de Cristo y el concilio de Nicea, su humanidad y la unión de sus dos naturalezas según Calcedonia, su obra en la cruz con sus palabras (sustitución, rescate, redención, propiciación y justificación), sus oficios de profeta, sacerdote y rey, su resurrección, su ascensión y su intercesión; la deidad y la personalidad del Espíritu y el concilio de Constantinopla, los dones, el bautismo en el Espíritu y el discernimiento. Dos puntos de la declaración de fe por confirmar se presentan con respeto, con sus posiciones: las lenguas como señal inicial del bautismo en el Espíritu y la sanidad en la expiación. Su base es la confesión de Pablo: «Porque en él habita corporalmente toda la plenitud de la Deidad» (Colosenses 2:9).",
    objetivos: [
      { id: "o1", texto: "Demostrar con la Escritura la deidad de Cristo y explicar el error de Arrio y la respuesta de Nicea.", bloom: "analizar" },
      { id: "o2", texto: "Explicar la humanidad de Cristo y la unión de sus dos naturalezas según Calcedonia, y reconocer los errores sobre su persona.", bloom: "comprender" },
      { id: "o3", texto: "Explicar la obra de la cruz con las palabras sustitución, rescate, redención, propiciación y justificación.", bloom: "comprender" },
      { id: "o4", texto: "Describir los oficios de Cristo y la importancia de su resurrección, su ascensión y su intercesión.", bloom: "comprender" },
      { id: "o5", texto: "Demostrar la deidad y la personalidad del Espíritu Santo y explicar lo que afirmó Constantinopla.", bloom: "analizar" },
      { id: "o6", texto: "Evaluar el continuismo y el cesacionismo, y discernir las manifestaciones espirituales por la Escritura.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar Colosenses 2:9 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "La cristología y la pneumatología bíblicas, con los concilios que las confesaron y los errores que corrigieron.",
      ser: "Un líder que adora a Cristo como Dios y depende del Espíritu Santo.",
      hacer: "Enseñar con claridad la persona y la obra de Cristo y del Espíritu, y responder con la Escritura a los errores.",
    },
    bibliografia: {
      basica: [
        { autor: "Myer Pearlman", titulo: "Teología bíblica y sistemática", editorial: "Vida" },
        { autor: "Stanley M. Horton (ed.)", titulo: "Teología sistemática: una perspectiva pentecostal", editorial: "Vida" },
      ],
      complementaria: [
        { autor: "Guy P. Duffield y Nathaniel M. Van Cleave", titulo: "Fundamentos de teología pentecostal", editorial: "Foursquare Media", nota: "Para los dones y los puntos por confirmar." },
        { autor: "Justo L. González", titulo: "Historia del cristianismo", editorial: "Unilit", nota: "Para los concilios de Nicea, Constantinopla y Calcedonia." },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Cómo es que Dios es uno y tres al mismo tiempo", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=g05ydbCIDHM", minutos: 9 },
      { tipo: "video", titulo: "Resumen del libro de Hebreos", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=VqVAOqyoKCs", minutos: 10 },
      { tipo: "lectura", titulo: "Filipenses 2: el Cristo que se humilló", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Filipenses&cap=2" },
      { tipo: "lectura", titulo: "Declaración de fe del Ministerio Avivando el Fuego", fuente: "Academia Avivando el Fuego", url: "/academia/declaracion-de-fe" },
    ],
  },
  disponible: true,
};

const SISTEMATICA_3: MateriaDef = {
  id: "n4-sistematica-3",
  nivel: 4,
  orden: 3,
  titulo: "Teología sistemática III: el hombre, el pecado y la salvación",
  resumen: "La antropología, la hamartiología y la soteriología: la imagen de Dios, el pecado y el error de Pelagio, la gracia y la elección, la conversión, la regeneración y la justificación, la adopción, la santificación, la seguridad y la glorificación.",
  base: "Romanos 5:1; Génesis 1:27",
  memoria: "Romanos 5:1",
  lecciones: lecciones("n4-sistematica-3", [
    ["El ser humano, creado a imagen de Dios", "Génesis 1:26-28; Génesis 2:7; Salmos 8:4-6; 1 Tesalonicenses 5:23; Mateo 10:28; Santiago 3:9"],
    ["El pecado: origen, naturaleza y alcance", "Génesis 3:6-8; 1 Juan 3:4; Santiago 4:17; Romanos 5:18-19; Romanos 3:10-12; Efesios 2:1-3; Jeremías 17:9"],
    ["La gracia y la elección", "Tito 2:11; Juan 6:44; Efesios 1:4-6; Romanos 8:29-30; 1 Timoteo 2:3-4; 2 Pedro 3:9"],
    ["La conversión, la regeneración y la justificación", "Hechos 20:21; 2 Corintios 5:17; Romanos 3:28; Romanos 4:3-5; Gálatas 2:16; Romanos 5:1"],
    ["La adopción y la santificación", "Gálatas 4:4-7; 1 Juan 3:1-2; Hebreos 10:10; Hebreos 10:14; Filipenses 3:12-14"],
    ["La seguridad, la perseverancia y la glorificación", "Romanos 8:38-39; Juan 10:28-29; Hebreos 6:4-6; 2 Pedro 1:10; Romanos 8:29-30"],
  ], 10),
  silabo: {
    proposito:
      "Que el líder conozca con orden lo que toda la Escritura enseña sobre el ser humano, el pecado y la salvación, siguiendo los artículos 5, 6 y 7 de la declaración de fe: la imagen de Dios y la dignidad de toda persona, el origen y el alcance del pecado y la respuesta de Agustín a Pelagio, la gracia y la elección (el calvinismo y el arminianismo, presentados con respeto), la conversión, la regeneración y la justificación por la fe, la adopción y la santificación, la seguridad y la glorificación. Un punto de la declaración de fe por confirmar se presenta con respeto, con sus dos posiciones: la perseverancia del creyente. Su base es la confesión de Pablo: «Justificados, pues, por la fe, tenemos paz para con Dios por medio de nuestro Señor Jesucristo» (Romanos 5:1).",
    objetivos: [
      { id: "o1", texto: "Explicar qué significa que el ser humano fue creado a imagen de Dios y las dos maneras de entender su constitución.", bloom: "comprender" },
      { id: "o2", texto: "Explicar el origen, la naturaleza y el alcance del pecado, y el error de Pelagio.", bloom: "comprender" },
      { id: "o3", texto: "Comparar con respeto el calvinismo y el arminianismo sobre la gracia y la elección.", bloom: "analizar" },
      { id: "o4", texto: "Distinguir la conversión, la regeneración y la justificación por la fe.", bloom: "analizar" },
      { id: "o5", texto: "Explicar la adopción y los tres aspectos de la santificación.", bloom: "comprender" },
      { id: "o6", texto: "Evaluar las posiciones sobre la perseverancia y fundar la seguridad en las promesas de Dios.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar Romanos 5:1 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "La antropología, la hamartiología y la soteriología bíblicas, con los debates que la iglesia ha tenido sobre ellas.",
      ser: "Un líder que descansa en la gracia, vive como hijo de Dios y crece en santidad.",
      hacer: "Enseñar con claridad el camino de la salvación y acompañar con la Escritura a quien duda de ella.",
    },
    bibliografia: {
      basica: [
        { autor: "Myer Pearlman", titulo: "Teología bíblica y sistemática", editorial: "Vida" },
        { autor: "Stanley M. Horton (ed.)", titulo: "Teología sistemática: una perspectiva pentecostal", editorial: "Vida" },
      ],
      complementaria: [
        { autor: "Wayne Grudem", titulo: "Teología sistemática", editorial: "Vida", nota: "Una exposición reformada, útil para conocer la posición calvinista." },
        { autor: "Guy P. Duffield y Nathaniel M. Van Cleave", titulo: "Fundamentos de teología pentecostal", editorial: "Foursquare Media" },
        { autor: "Justo L. González", titulo: "Historia del cristianismo", editorial: "Unilit", nota: "Para Pelagio y Agustín, la Reforma y el Sínodo de Dort." },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Imagen de Dios", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=VsGlbwF4HtI", minutos: 6 },
      { tipo: "video", titulo: "Resumen del libro de Romanos (parte 1)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=0tco1rQGC1o", minutos: 9 },
      { tipo: "lectura", titulo: "Romanos 5: justificados por la fe", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Romanos&cap=5" },
      { tipo: "lectura", titulo: "Romanos 8: nada nos podrá separar", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Romanos&cap=8" },
      { tipo: "lectura", titulo: "Declaración de fe del Ministerio Avivando el Fuego", fuente: "Academia Avivando el Fuego", url: "/academia/declaracion-de-fe" },
    ],
  },
  disponible: true,
};

const SISTEMATICA_4: MateriaDef = {
  id: "n4-sistematica-4",
  nivel: 4,
  orden: 4,
  titulo: "Teología sistemática IV: la iglesia, los ángeles y los últimos tiempos",
  resumen: "La eclesiología, la angelología y la escatología: la naturaleza de la iglesia, su gobierno y sus ministerios, su misión y sus ordenanzas, los ángeles, Satanás y los demonios, la muerte y la resurrección, y la venida de Cristo, el juicio y la eternidad.",
  base: "Tito 2:13; Mateo 16:18",
  memoria: "Tito 2:13",
  lecciones: lecciones("n4-sistematica-4", [
    ["La naturaleza de la iglesia", "Mateo 16:18; Efesios 1:22-23; 1 Corintios 12:12-13; Efesios 2:19-22; 1 Pedro 2:9; Hechos 2:42-47"],
    ["El gobierno y los ministerios de la iglesia", "Hechos 14:23; Efesios 4:11-13; 1 Timoteo 3:1-7; Hechos 2:17-18; Romanos 16:1-2; 1 Timoteo 2:11-12"],
    ["La misión de la iglesia y sus ordenanzas", "Mateo 28:18-20; Marcos 16:15-16; Hechos 1:8; Efesios 4:15-16; Gálatas 6:10; 1 Corintios 11:23-26"],
    ["Los ángeles, Satanás y los demonios", "Hebreos 1:14; Salmos 103:20; Lucas 1:19; Judas 1:9; Apocalipsis 12:9; Judas 1:6; 1 Pedro 5:8-9; Colosenses 2:15"],
    ["La muerte, el estado intermedio y la resurrección", "Hebreos 9:27; Filipenses 1:21-23; 2 Corintios 5:8; Lucas 23:43; Juan 5:28-29; 1 Corintios 15:42-44"],
    ["La venida de Cristo, el juicio y la eternidad", "Hechos 1:11; Tito 2:13; Mateo 24:36; 1 Tesalonicenses 4:16-17; Apocalipsis 20:4-6; 2 Corintios 5:10; Apocalipsis 20:11-15; Mateo 25:46; Apocalipsis 21:1-4"],
  ], 10),
  silabo: {
    proposito:
      "Que el líder conozca con orden lo que toda la Escritura enseña sobre la iglesia, los ángeles y los últimos tiempos, siguiendo los artículos 8, 12, 13, 16 y 17 de la declaración de fe: la naturaleza de la iglesia, universal y local, y sus imágenes bíblicas; su gobierno, sus ministerios y los requisitos de sus líderes; su misión y sus dos ordenanzas; los ángeles, Satanás y los demonios, sin especular; la muerte, el estado intermedio y la resurrección; y la venida de Cristo, el juicio y la eternidad. Dos puntos de la declaración de fe por confirmar se presentan con respeto, con sus posiciones: el ministerio de la mujer y el orden de los últimos tiempos, con el arrebatamiento y el milenio. Su base es la esperanza de la iglesia: «aguardando la esperanza bienaventurada y la manifestación gloriosa de nuestro gran Dios y Salvador Jesucristo» (Tito 2:13).",
    objetivos: [
      { id: "o1", texto: "Explicar qué es la iglesia, universal y local, y las imágenes con que la presenta la Biblia.", bloom: "comprender" },
      { id: "o2", texto: "Describir las formas de gobierno, los ministerios y los requisitos de los líderes, y presentar con respeto las posiciones sobre el ministerio de la mujer.", bloom: "comprender" },
      { id: "o3", texto: "Explicar la misión de la iglesia y el sentido de sus dos ordenanzas, y aplicarlos a la iglesia local.", bloom: "aplicar" },
      { id: "o4", texto: "Explicar lo que la Biblia enseña sobre los ángeles, Satanás y los demonios, sin especular.", bloom: "comprender" },
      { id: "o5", texto: "Explicar la muerte, el estado intermedio y la resurrección, y reconocer los errores sobre ellos.", bloom: "analizar" },
      { id: "o6", texto: "Comparar con respeto las posiciones sobre el arrebatamiento y el milenio, y afirmar lo que todos confiesan sobre la venida, el juicio y la eternidad.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar Tito 2:13 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "La eclesiología, la angelología y la escatología bíblicas, con las posiciones evangélicas donde hay diferencias.",
      ser: "Un líder que ama a la iglesia, vive sin miedo al enemigo y espera preparado la venida de Cristo.",
      hacer: "Enseñar con claridad la doctrina de la iglesia y de los últimos tiempos, y acompañar con la Escritura a quien enfrenta la muerte.",
    },
    bibliografia: {
      basica: [
        { autor: "Myer Pearlman", titulo: "Teología bíblica y sistemática", editorial: "Vida" },
        { autor: "Stanley M. Horton (ed.)", titulo: "Teología sistemática: una perspectiva pentecostal", editorial: "Vida" },
      ],
      complementaria: [
        { autor: "Guy P. Duffield y Nathaniel M. Van Cleave", titulo: "Fundamentos de teología pentecostal", editorial: "Foursquare Media", nota: "Para los ángeles y los últimos tiempos desde una perspectiva pentecostal." },
        { autor: "Wayne Grudem", titulo: "Teología sistemática", editorial: "Vida", nota: "Presenta con claridad las formas de gobierno de la iglesia y las posiciones sobre el milenio." },
        { autor: "Justo L. González", titulo: "Historia del cristianismo", editorial: "Unilit", nota: "Para Agustín, la Reforma y los puritanos." },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Efesios", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=yJgym5MGzM4", minutos: 10 },
      { tipo: "video", titulo: "Resumen del libro de Hechos (parte 1): Hechos 1-12", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=5h7Q0EK-m8I", minutos: 9 },
      { tipo: "lectura", titulo: "Efesios 4: los ministerios y la edificación del cuerpo", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Efesios&cap=4" },
      { tipo: "lectura", titulo: "1 Tesalonicenses 4: la esperanza de la venida del Señor", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=1%20Tesalonicenses&cap=4" },
      { tipo: "lectura", titulo: "Apocalipsis 21: el cielo nuevo y la tierra nueva", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Apocalipsis&cap=21" },
      { tipo: "lectura", titulo: "Declaración de fe del Ministerio Avivando el Fuego", fuente: "Academia Avivando el Fuego", url: "/academia/declaracion-de-fe" },
    ],
  },
  disponible: true,
};

const EPISTOLAS_APOCALIPSIS: MateriaDef = {
  id: "n4-epistolas-apocalipsis",
  nivel: 4,
  orden: 6,
  titulo: "Epístolas y Apocalipsis",
  resumen: "De Romanos a Judas y el libro de Apocalipsis: el autor, la fecha, la ocasión, la estructura y el mensaje de cada grupo de cartas, la armonía entre Pablo y Santiago, y las maneras de leer el Apocalipsis con su mensaje central.",
  base: "Hebreos 1:1-2; 2 Timoteo 3:16",
  memoria: "Hebreos 1:1-2",
  lecciones: lecciones("n4-epistolas-apocalipsis", [
    ["Romanos y Gálatas: el evangelio de la gracia", "Romanos 1:16-17; Romanos 3:23-24; Romanos 8:1; Romanos 12:1-2; Gálatas 1:6-7; Gálatas 5:1; Gálatas 5:22-23"],
    ["1 y 2 Corintios: una iglesia con dones y con problemas", "1 Corintios 1:10; 1 Corintios 13:4-7; 1 Corintios 15:3-4; 2 Corintios 5:18-20; 2 Corintios 9:7; 2 Corintios 12:9"],
    ["Las cartas de la prisión", "Efesios 4:1-3; Efesios 2:8-10; Filipenses 2:5-8; Filipenses 4:4; Colosenses 1:15-18; Filemón 1:15-16"],
    ["Tesalonicenses y las cartas pastorales", "1 Tesalonicenses 1:9-10; 2 Tesalonicenses 3:10; 1 Timoteo 4:12; 2 Timoteo 2:2; 2 Timoteo 3:16-17; 2 Timoteo 4:7-8"],
    ["Hebreos y las cartas generales", "Hebreos 1:1-2; Hebreos 11:1; Hebreos 11:6; Santiago 2:17-18; 1 Pedro 1:3; 1 Juan 5:13; Judas 1:3"],
    ["El Apocalipsis", "Apocalipsis 1:1-3; Apocalipsis 1:9; Apocalipsis 1:17-18; Apocalipsis 5:9-10; Apocalipsis 11:15; Apocalipsis 22:20"],
  ], 10),
  silabo: {
    proposito:
      "Que el líder conozca de primera mano las cartas del Nuevo Testamento y el Apocalipsis para enseñarlas con fidelidad: el autor, la fecha aproximada, la ocasión, la estructura y el mensaje de Romanos y Gálatas, de 1 y 2 Corintios, de las cartas de la prisión, de Tesalonicenses y las cartas pastorales, de Hebreos y las cartas generales, y del Apocalipsis. Las fechas que se discuten se dicen con cautela, y se presentan con respeto las cuatro maneras de leer el Apocalipsis; el orden de los últimos tiempos es un punto de la declaración de fe por confirmar, que se estudia en Teología sistemática IV. Su base es la confesión de Hebreos: «Dios, habiendo hablado muchas veces y de muchas maneras en otro tiempo a los padres por los profetas, en estos postreros días nos ha hablado por el Hijo» (Hebreos 1:1-2).",
    objetivos: [
      { id: "o1", texto: "Explicar el mensaje de Romanos y de Gálatas sobre el evangelio y la justificación por la fe.", bloom: "comprender" },
      { id: "o2", texto: "Describir los problemas de la iglesia de Corinto y las respuestas de Pablo en 1 y 2 Corintios.", bloom: "comprender" },
      { id: "o3", texto: "Explicar el mensaje de las cartas de la prisión sobre Cristo, la iglesia y la vida cristiana.", bloom: "comprender" },
      { id: "o4", texto: "Aplicar la enseñanza de Tesalonicenses y de las cartas pastorales al ministerio de hoy.", bloom: "aplicar" },
      { id: "o5", texto: "Analizar el mensaje de Hebreos y de las cartas generales, y armonizar a Pablo y a Santiago.", bloom: "analizar" },
      { id: "o6", texto: "Comparar con respeto las maneras de interpretar el Apocalipsis y reconocer su mensaje central.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar Hebreos 1:1-2 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "El trasfondo, la estructura y el mensaje de las epístolas y del Apocalipsis.",
      ser: "Un líder que vive por la gracia, sirve en la debilidad y espera con esperanza la venida de Cristo.",
      hacer: "Enseñar las cartas del Nuevo Testamento en su contexto y presentar el Apocalipsis con equilibrio.",
    },
    bibliografia: {
      basica: [
        { autor: "Merrill C. Tenney", titulo: "Nuestro Nuevo Testamento", editorial: "Portavoz" },
        { autor: "Gordon Fee y Douglas Stuart", titulo: "La lectura eficaz de la Biblia", editorial: "Vida", nota: "Los capítulos sobre las epístolas y sobre el Apocalipsis." },
      ],
      complementaria: [
        { autor: "Henrietta C. Mears", titulo: "Lo que nos dice la Biblia", editorial: "Vida" },
        { autor: "Myer Pearlman", titulo: "Teología bíblica y sistemática", editorial: "Vida" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Romanos (parte 1)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=0tco1rQGC1o", minutos: 9 },
      { tipo: "video", titulo: "Resumen del libro de Hebreos", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=VqVAOqyoKCs", minutos: 10 },
      { tipo: "video", titulo: "Resumen del libro de Apocalipsis (parte 1): Apocalipsis 1-11", fuente: "Proyecto Biblia", url: "https://bibleproject.com/es/videos/apocalipsis-1-11/" },
      { tipo: "video", titulo: "Resumen del libro de Apocalipsis (parte 2): Apocalipsis 12-22", fuente: "Proyecto Biblia", url: "https://bibleproject.com/es/videos/apocalipsis-12-22/" },
      { tipo: "lectura", titulo: "Romanos 8: ninguna condenación", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Romanos&cap=8" },
      { tipo: "lectura", titulo: "Declaración de fe del Ministerio Avivando el Fuego", fuente: "Academia Avivando el Fuego", url: "/academia/declaracion-de-fe" },
    ],
  },
  disponible: true,
};

const POETICOS_PROFETICOS: MateriaDef = {
  id: "n4-poeticos-profeticos",
  nivel: 4,
  orden: 5,
  titulo: "Libros poéticos y proféticos",
  resumen: "De Job a Cantares y de Isaías a Malaquías: la poesía y la sabiduría de Israel, Job y Eclesiastés, los Salmos, Proverbios y Cantares, los profetas y su mensaje, y las profecías del Mesías cumplidas en Cristo.",
  base: "Proverbios 1:7; Miqueas 6:8; Lucas 24:44",
  memoria: "Miqueas 6:8",
  lecciones: lecciones("n4-poeticos-profeticos", [
    ["La poesía y la sabiduría de Israel", "Proverbios 1:7; Salmos 19:1; Proverbios 15:1; Salmos 23:1"],
    ["Job y Eclesiastés: cuando la vida no se entiende", "Job 1:20-22; Job 38:1-4; Job 42:5-6; Eclesiastés 1:2-3; Eclesiastés 12:13-14"],
    ["Los Salmos: el libro de oración de Israel", "Salmos 1:1-3; Salmos 13:1-6; Salmos 22:1; Hechos 2:34-35"],
    ["Proverbios y Cantares: sabiduría para la vida diaria", "Proverbios 3:5-6; Proverbios 22:6; Cantares 8:6-7; Cantares 2:7"],
    ["Los profetas: la voz de Dios a su pueblo", "Amós 3:7; Amós 5:24; Miqueas 6:8; Jeremías 31:31-33"],
    ["El Mesías anunciado por los profetas", "Lucas 24:44; Miqueas 5:2; Isaías 53:3-6; Hechos 8:34-35"],
  ], 10),
  silabo: {
    proposito:
      "Que el obrero conozca y sepa enseñar los libros poéticos y proféticos del Antiguo Testamento, más a fondo que en el Panorama del Nivel 2: cómo leer la poesía y la sabiduría de Israel; el mensaje de Job, Eclesiastés, Salmos, Proverbios y Cantares; quiénes fueron los profetas, qué anunciaban y cómo leerlos; y las profecías del Mesías cumplidas en Jesús. Las maneras de ordenar los sucesos del fin no se deciden aquí: se estudian en Teología sistemática IV. El corazón del mensaje profético está en Miqueas: «solamente hacer justicia, y amar misericordia, y humillarte ante tu Dios» (Miqueas 6:8).",
    objetivos: [
      { id: "o1", texto: "Explicar las características de la poesía y la sabiduría hebreas y el temor de Jehová.", bloom: "comprender" },
      { id: "o2", texto: "Explicar el mensaje de Job y de Eclesiastés y aplicarlo a las preguntas difíciles de la vida.", bloom: "analizar" },
      { id: "o3", texto: "Describir los tipos de salmos, orar con los lamentos y reconocer los salmos mesiánicos.", bloom: "aplicar" },
      { id: "o4", texto: "Aplicar la sabiduría de Proverbios como principios generales y explicar el mensaje de Cantares.", bloom: "aplicar" },
      { id: "o5", texto: "Explicar quiénes eran los profetas, su mensaje y cómo leer un texto profético.", bloom: "comprender" },
      { id: "o6", texto: "Identificar las profecías mesiánicas y evaluar cómo se cumplen en Cristo.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar Miqueas 6:8 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "Los libros poéticos y proféticos: su género, su contexto histórico, su mensaje y las profecías del Mesías.",
      ser: "Un creyente que ora con los Salmos, vive con sabiduría y practica la justicia y la misericordia que piden los profetas.",
      hacer: "Leer y enseñar bien la poesía y la profecía, y mostrar a Cristo en ellas sin forzar el texto.",
    },
    bibliografia: {
      basica: [
        { autor: "Samuel J. Schultz", titulo: "Habla el Antiguo Testamento", editorial: "Portavoz" },
        { autor: "Gordon D. Fee y Douglas Stuart", titulo: "La lectura eficaz de la Biblia", editorial: "Vida" },
      ],
      complementaria: [],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Job", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=A3ifTHYTmMQ", minutos: 13 },
      { tipo: "video", titulo: "Resumen del libro de Cantar de los Cantares", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=JeTxGCZH99o", minutos: 8 },
      { tipo: "lectura", titulo: "Salmos 22: el salmo de la cruz", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Salmos&cap=22" },
      { tipo: "lectura", titulo: "Isaías 53: el siervo sufriente", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Isaias&cap=53" },
    ],
  },
  disponible: true,
};

const APOLOGETICA: MateriaDef = {
  id: "n4-apologetica",
  nivel: 4,
  orden: 9,
  titulo: "Apologética",
  resumen: "Dar razones de la fe con mansedumbre y reverencia: por qué creer en Dios es razonable, por qué la Biblia es confiable, la evidencia de la resurrección, el problema del mal y cómo reconocer y responder a las sectas y las falsas doctrinas.",
  base: "1 Pedro 3:15; Judas 1:3",
  memoria: "1 Pedro 3:15",
  lecciones: lecciones("n4-apologetica", [
    ["¿Qué es la apologética?", "1 Pedro 3:15; 2 Timoteo 2:24-25; Hechos 17:2-3; 2 Corintios 10:5"],
    ["¿Existe Dios?", "Romanos 1:20; Génesis 1:1; Salmos 19:1; Romanos 2:14-15; Hebreos 11:6"],
    ["¿Es confiable la Biblia?", "Lucas 1:1-4; Isaías 46:9-10"],
    ["¿Resucitó Jesús?", "1 Corintios 15:3-8; 1 Corintios 15:14; Hechos 2:24"],
    ["El problema del mal y del sufrimiento", "Génesis 1:31; Romanos 5:12; Romanos 8:18; Romanos 8:28; Apocalipsis 21:4"],
    ["Las sectas y las falsas doctrinas", "1 Juan 4:1-3; Gálatas 1:8; 2 Timoteo 2:24-26"],
  ], 10),
  silabo: {
    proposito:
      "Que el obrero sepa dar razones de su fe con mansedumbre y reverencia: por qué creer en Dios es razonable, por qué la Biblia es confiable, por qué creemos que Jesús resucitó, cómo responder al problema del mal y cómo reconocer y responder a las sectas y las falsas doctrinas. La apologética no reemplaza al Espíritu Santo, pero quita obstáculos para que otros escuchen el evangelio y fortalece a los creyentes que dudan. El encargo es de Pedro: «estad siempre preparados para presentar defensa con mansedumbre y reverencia ante todo el que os demande razón de la esperanza que hay en vosotros» (1 Pedro 3:15).",
    objetivos: [
      { id: "o1", texto: "Explicar qué es la apologética, su base bíblica y la actitud con que se defiende la fe.", bloom: "comprender" },
      { id: "o2", texto: "Explicar los argumentos del comienzo del universo, del diseño y de la ley moral, y su alcance.", bloom: "analizar" },
      { id: "o3", texto: "Explicar por qué la Biblia es confiable: su texto, la arqueología, las profecías y su unidad.", bloom: "comprender" },
      { id: "o4", texto: "Evaluar la evidencia de la resurrección de Jesús y las explicaciones alternativas.", bloom: "evaluar" },
      { id: "o5", texto: "Responder con la Biblia y con compasión al problema del mal y del sufrimiento.", bloom: "aplicar" },
      { id: "o6", texto: "Reconocer las sectas y las falsas doctrinas y responder a quienes las siguen con la Biblia y con amor.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar 1 Pedro 3:15 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "Las razones de la fe: la existencia de Dios, la confiabilidad de la Biblia, la resurrección, el problema del mal y las señales de las sectas.",
      ser: "Un creyente seguro de su fe, humilde y amable, que escucha antes de responder.",
      hacer: "Responder las preguntas y las objeciones más comunes, ayudar a los que dudan y orientar a quienes siguen falsas doctrinas.",
    },
    bibliografia: {
      basica: [
        { autor: "Lee Strobel", titulo: "El caso de Cristo", editorial: "Vida" },
        { autor: "Pablo Hoff", titulo: "Otros evangelios", editorial: "Vida" },
      ],
      complementaria: [
        { autor: "Lee Strobel", titulo: "El caso de la fe", editorial: "Vida" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Judas: contender por la fe", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=vhPyNSJiRZ8", minutos: 9 },
      { tipo: "video", titulo: "El Evangelio", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=StGMC-KdehE", minutos: 6 },
      { tipo: "lectura", titulo: "1 Corintios 15: la resurrección", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=1%20Corintios&cap=15" },
      { tipo: "lectura", titulo: "Hechos 17: Pablo en Tesalónica y en Atenas", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Hechos&cap=17" },
    ],
  },
  disponible: true,
};

const HOMILETICA_2: MateriaDef = {
  id: "n4-homiletica-2",
  nivel: 4,
  orden: 7,
  titulo: "Homilética II: predicación expositiva",
  resumen: "Predicar un pasaje de modo que su idea central sea la del sermón: del estudio del texto a la idea homilética, predicar según el género, la estructura, la aplicación con Cristo en el centro, el llamado y la entrega, con la rúbrica del sermón del Nivel 4.",
  base: "2 Timoteo 4:1-2; Hechos 20:26-27",
  memoria: "1 Corintios 2:2",
  lecciones: lecciones("n4-homiletica-2", [
    ["La predicación expositiva", "Hechos 20:26-27; Nehemías 8:8; Hebreos 4:12"],
    ["Del texto a la idea del sermón", "2 Timoteo 2:15; Filipenses 4:11-13"],
    ["Predicar según el género", "2 Timoteo 3:16-17; 1 Samuel 17:45-47; Lucas 18:1-8"],
    ["La estructura del sermón expositivo", "Hechos 2:36-38; Efesios 2:1-10"],
    ["Aplicación, Cristo y el llamado", "Santiago 1:22-25; 1 Corintios 2:1-2; 2 Corintios 5:20-21; Hechos 2:37-41"],
    ["La entrega y el sermón con rúbrica", "1 Timoteo 4:13-16; 2 Timoteo 2:15"],
  ], 10),
  silabo: {
    proposito:
      "Que el obrero sepa predicar un pasaje con fidelidad: que el mensaje del sermón sea el mensaje del texto. La materia sigue a Homilética I y enseña a estudiar el pasaje hasta su idea exegética y a convertirla en la idea del sermón, a predicar según el género, a ordenar el sermón con el movimiento del texto, a aplicarlo con Cristo en el centro y a hacer un llamado claro. Prepara el sermón evaluado con rúbrica que pide el Nivel 4. El centro de toda predicación lo dijo Pablo: «Pues me propuse no saber entre vosotros cosa alguna sino a Jesucristo, y a éste crucificado» (1 Corintios 2:2).",
    objetivos: [
      { id: "o1", texto: "Definir la predicación expositiva, distinguirla de la temática y la textual, y explicar su base bíblica.", bloom: "comprender" },
      { id: "o2", texto: "Estudiar un pasaje hasta su idea exegética y convertirla en la idea homilética del sermón.", bloom: "aplicar" },
      { id: "o3", texto: "Predicar según el género: narración, epístola, poesía, parábola y profecía.", bloom: "aplicar" },
      { id: "o4", texto: "Organizar un sermón expositivo que siga el movimiento del pasaje.", bloom: "crear" },
      { id: "o5", texto: "Aplicar el pasaje con precisión, con Cristo y la gracia en el centro, y hacer un llamado claro.", bloom: "aplicar" },
      { id: "o6", texto: "Evaluar un sermón con la rúbrica de la academia y preparar el sermón del Nivel 4.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar 1 Corintios 2:2 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "La predicación expositiva: el estudio del pasaje, la idea exegética y la homilética, los géneros, la estructura, la aplicación y la rúbrica.",
      ser: "Un predicador fiel al texto, humilde ante la Palabra y dependiente del Espíritu, que predica a Cristo.",
      hacer: "Preparar y predicar un sermón expositivo de 20 a 30 minutos y evaluarlo con la rúbrica.",
    },
    bibliografia: {
      basica: [
        { autor: "Haddon W. Robinson", titulo: "La predicación bíblica: desarrollo y presentación de mensajes expositivos", editorial: "Unilit" },
        { autor: "Gordon D. Fee y Douglas Stuart", titulo: "La lectura eficaz de la Biblia", editorial: "Vida" },
      ],
      complementaria: [
        { autor: "James D. Crane", titulo: "El sermón eficaz", editorial: "Casa Bautista de Publicaciones" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de 1 Samuel", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=34biq4ivs5I", minutos: 8 },
      { tipo: "video", titulo: "Resumen del libro de Filipenses", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=gks8CQX5mwQ", minutos: 10 },
      { tipo: "lectura", titulo: "Hechos 2: el sermón de Pentecostés", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Hechos&cap=2" },
      { tipo: "lectura", titulo: "Nehemías 8: leer y poner el sentido", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Nehemias&cap=8" },
    ],
  },
  disponible: true,
};

const HISTORIA_2: MateriaDef = {
  id: "n4-historia-2",
  nivel: 4,
  orden: 8,
  titulo: "Historia de la iglesia II",
  resumen: "La Reforma, los avivamientos y las misiones modernas, el movimiento pentecostal y la iglesia evangélica en América Latina y entre los hispanos de los Estados Unidos.",
  base: "Romanos 1:16-17; Hechos 1:8",
  memoria: "Romanos 1:17",
  lecciones: lecciones("n4-historia-2", [
    ["Lutero y la Reforma", "Romanos 1:16-17; Efesios 2:8-9"],
    ["La Reforma se extiende", "Hechos 17:11; Isaías 40:8"],
    ["Puritanos, pietistas y el gran despertar", "Habacuc 3:2; Romanos 8:16"],
    ["Las misiones modernas y los avivamientos del siglo XIX", "Isaías 54:2-3; Mateo 28:19-20"],
    ["El movimiento pentecostal", "Joel 2:28-29; Hechos 2:1-4"],
    ["La iglesia evangélica en América Latina", "Romanos 10:14-15; Hechos 1:8"],
  ], 10),
  silabo: {
    proposito:
      "Que el obrero conozca la historia de la iglesia desde la Reforma hasta hoy: el redescubrimiento del evangelio de la gracia, los avivamientos que unieron la sana doctrina con una fe viva, las misiones modernas, el nacimiento y la expansión del movimiento pentecostal y la historia de la iglesia evangélica en América Latina y entre los hispanos de los Estados Unidos, de la que forma parte nuestro ministerio. Sigue a Historia de la iglesia I. El hilo es el que encendió la Reforma: «Mas el justo por la fe vivirá» (Romanos 1:17).",
    objetivos: [
      { id: "o1", texto: "Explicar la Reforma de Lutero y sus principios: solo la Escritura, solo la gracia, solo la fe y solo Cristo.", bloom: "comprender" },
      { id: "o2", texto: "Describir la extensión de la Reforma, su llegada al mundo hispano y la respuesta católica.", bloom: "comprender" },
      { id: "o3", texto: "Explicar los movimientos de renovación y avivamiento de los siglos XVII y XVIII.", bloom: "analizar" },
      { id: "o4", texto: "Describir las misiones modernas, el segundo gran despertar y el movimiento de santidad.", bloom: "comprender" },
      { id: "o5", texto: "Describir los comienzos y la expansión del movimiento pentecostal y la renovación carismática.", bloom: "analizar" },
      { id: "o6", texto: "Evaluar la historia de la iglesia evangélica en América Latina y entre los hispanos de los Estados Unidos.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar Romanos 1:17 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "Los hechos, las personas y las fechas principales de la Reforma, los avivamientos, las misiones, el pentecostalismo y la iglesia en América Latina.",
      ser: "Un creyente agradecido por la Biblia en su idioma, que une la sana doctrina con un corazón encendido.",
      hacer: "Enseñar con exactitud la historia de la iglesia evangélica y pentecostal y animar a la iglesia a ser fiel en su generación.",
    },
    bibliografia: {
      basica: [
        { autor: "Justo L. González", titulo: "Historia del cristianismo, tomo 2: desde la era de la Reforma hasta la era inconclusa", editorial: "Unilit" },
        { autor: "Pablo A. Deiros", titulo: "Historia del cristianismo en América Latina", editorial: "Mundo Hispano" },
      ],
      complementaria: [
        { autor: "Jesse Lyman Hurlbut", titulo: "Historia de la iglesia cristiana", editorial: "Vida" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Romanos (parte 1)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=0tco1rQGC1o", minutos: 9 },
      { tipo: "video", titulo: "Qué sucedió en Pentecostés y por qué es importante", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=OisTpQEle6E", minutos: 7 },
      { tipo: "lectura", titulo: "Romanos 1: el justo por la fe vivirá", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Romanos&cap=1" },
      { tipo: "lectura", titulo: "Hechos 2: el día de Pentecostés", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Hechos&cap=2" },
    ],
  },
  disponible: true,
};

const ETICA: MateriaDef = {
  id: "n4-etica",
  nivel: 4,
  orden: 10,
  titulo: "Ética cristiana y ministerial",
  resumen: "Los fundamentos de la ética cristiana, cómo tomar decisiones morales, la vida y la dignidad humana, la sexualidad y el matrimonio, el dinero, el trabajo y la verdad, y la ética del ministro con la protección de menores.",
  base: "Romanos 12:1-2; 1 Timoteo 3:2-3",
  memoria: "Romanos 12:2",
  lecciones: lecciones("n4-etica", [
    ["El fundamento de la ética cristiana", "Romanos 12:1-2; Mateo 22:37-40; Jueces 21:25"],
    ["Cómo tomar decisiones morales", "Salmos 119:105; 1 Corintios 10:23-24; 1 Corintios 10:31; Santiago 1:5"],
    ["La vida y la dignidad humana", "Génesis 1:27; Éxodo 20:13; Salmos 139:13-16; Jeremías 1:5; Proverbios 31:8-9; Hechos 17:26"],
    ["La sexualidad, el matrimonio y la pureza", "Génesis 2:24; Hebreos 13:4; Mateo 5:27-28; 1 Corintios 6:18-20; 1 Juan 1:9"],
    ["El dinero, el trabajo y la verdad", "Proverbios 11:1; Romanos 13:7; Colosenses 3:23-24; Efesios 4:25; 1 Timoteo 6:9-10"],
    ["La ética del ministro", "1 Timoteo 3:2-3; 2 Corintios 8:20-21; Mateo 18:6; Gálatas 6:1"],
  ], 10),
  silabo: {
    proposito:
      "Que el obrero piense y viva con una ética cristiana: que conozca sus fundamentos, aprenda a tomar decisiones morales, defienda la vida y la dignidad humana, viva la sexualidad según el diseño de Dios, sea íntegro con el dinero, el trabajo y su palabra, y sirva con la ética que pide el ministerio, incluida la protección de los menores. No es una lista de reglas, sino una mente renovada por la Palabra: «No os conforméis a este siglo, sino transformaos por medio de la renovación de vuestro entendimiento» (Romanos 12:2). Quién puede ejercer cada cargo no se decide aquí: es un punto de la declaración de fe por confirmar.",
    objetivos: [
      { id: "o1", texto: "Explicar los fundamentos de la ética cristiana y distinguirla del relativismo.", bloom: "comprender" },
      { id: "o2", texto: "Aplicar pasos bíblicos para tomar decisiones morales, también en lo que la Biblia no menciona.", bloom: "aplicar" },
      { id: "o3", texto: "Explicar la dignidad humana y aplicarla a la vida, la violencia y la discriminación.", bloom: "aplicar" },
      { id: "o4", texto: "Explicar el diseño de Dios para la sexualidad y el matrimonio, y ofrecer restauración.", bloom: "comprender" },
      { id: "o5", texto: "Aplicar la integridad bíblica al dinero, al trabajo y a la verdad.", bloom: "aplicar" },
      { id: "o6", texto: "Evaluar situaciones del ministerio a la luz de la ética ministerial y de la protección de menores.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar Romanos 12:2 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "Los fundamentos de la ética cristiana y lo que enseña la Biblia sobre la vida, la sexualidad, el dinero, la verdad y el ministerio.",
      ser: "Un creyente íntegro, con una mente renovada, que vive la verdad con compasión.",
      hacer: "Tomar decisiones morales con la Biblia, servir con transparencia y proteger a los débiles en el ministerio.",
    },
    bibliografia: {
      basica: [
        { autor: "Joe E. Trull y James E. Carter", titulo: "Ética ministerial", editorial: "Mundo Hispano" },
      ],
      complementaria: [
        { autor: "J. Oswald Sanders", titulo: "Liderazgo espiritual", editorial: "Portavoz" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Imagen de Dios", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=VsGlbwF4HtI", minutos: 6 },
      { tipo: "video", titulo: "Resumen del libro de Santiago", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=yDqK_U-ipfc", minutos: 9 },
      { tipo: "lectura", titulo: "Romanos 12: una vida transformada", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Romanos&cap=12" },
      { tipo: "lectura", titulo: "1 Timoteo 3: el carácter del que dirige", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=1%20Timoteo&cap=3" },
    ],
  },
  disponible: true,
};

// ---- Nivel 5 · Liderazgo y docencia
const DIDACTICA: MateriaDef = {
  id: "n5-didactica",
  nivel: 5,
  orden: 3,
  titulo: "Didáctica: cómo enseñar",
  resumen: "El llamado y el carácter del maestro, cómo aprende la gente, cómo preparar una clase con objetivos, los métodos de Jesús, cómo evaluar con justicia y cómo acompañar a los alumnos: de aquí salen los profesores y los mentores de la academia.",
  base: "Esdras 7:10; 2 Timoteo 2:2",
  memoria: "Esdras 7:10",
  lecciones: lecciones("n5-didactica", [
    ["El maestro cristiano", "Esdras 7:10; Santiago 3:1; Juan 13:13-15"],
    ["Cómo aprende la gente", "Deuteronomio 6:6-7; Hebreos 5:12-14"],
    ["Preparar una clase", "Nehemías 8:8; Lucas 24:27"],
    ["Enseñar como Jesús", "Mateo 16:15; Mateo 13:34; Juan 16:12"],
    ["Evaluar el aprendizaje", "Proverbios 27:23; 2 Timoteo 4:2; Proverbios 11:1"],
    ["Acompañar a los alumnos", "1 Tesalonicenses 2:7-8; Filipenses 4:9; 2 Timoteo 2:2"],
  ], 10),
  silabo: {
    proposito:
      "Que el obrero aprenda a enseñar: que viva lo que enseña, entienda cómo aprende la gente, prepare sus clases con objetivos claros, use los métodos de Jesús, evalúe con justicia y acompañe a sus alumnos. De esta materia salen los profesores y los mentores de la academia. Su modelo es Esdras: «Porque Esdras había preparado su corazón para inquirir la ley de Jehová y para cumplirla, y para enseñar en Israel sus estatutos y decretos» (Esdras 7:10).",
    objetivos: [
      { id: "o1", texto: "Explicar el llamado y el carácter del maestro cristiano según la Escritura.", bloom: "comprender" },
      { id: "o2", texto: "Explicar cómo aprende la gente y aplicar las leyes de la enseñanza a una clase.", bloom: "aplicar" },
      { id: "o3", texto: "Escribir objetivos medibles y preparar el plan escrito de una clase.", bloom: "crear" },
      { id: "o4", texto: "Escoger y usar métodos de enseñanza según el ejemplo de Jesús.", bloom: "aplicar" },
      { id: "o5", texto: "Evaluar el aprendizaje con preguntas, rúbricas y una corrección justa.", bloom: "evaluar" },
      { id: "o6", texto: "Acompañar a los alumnos y explicar el trabajo del profesor y del mentor en la academia.", bloom: "aplicar" },
      { id: "o7", texto: "Recitar Esdras 7:10 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "Cómo aprende la gente, cómo se prepara una clase, los métodos de enseñanza y la evaluación.",
      ser: "Un maestro que vive lo que enseña, ama a sus alumnos y depende del Espíritu Santo.",
      hacer: "Preparar, dar y evaluar una clase bíblica, y acompañar a sus alumnos.",
    },
    bibliografia: {
      basica: [
        { autor: "Howard G. Hendricks", titulo: "Enseñando para cambiar vidas", editorial: "Unilit" },
        { autor: "John Milton Gregory", titulo: "Las siete leyes de la enseñanza", editorial: "Casa Bautista de Publicaciones" },
      ],
      complementaria: [],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen de los libros de Esdras-Nehemías", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=OGdiLZ92nQs", minutos: 10 },
      { tipo: "video", titulo: "Parábolas de Jesús", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=jZinwS_2jsQ", minutos: 6 },
      { tipo: "lectura", titulo: "Nehemías 8: leer y poner el sentido", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Nehemias&cap=8" },
      { tipo: "lectura", titulo: "1 Tesalonicenses 2: como la nodriza que cuida a sus hijos", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=1%20Tesalonicenses&cap=2" },
    ],
  },
  disponible: true,
};

const LIDERAZGO_2: MateriaDef = {
  id: "n5-liderazgo-2",
  nivel: 5,
  orden: 4,
  titulo: "Liderazgo II: formar líderes y equipos",
  resumen: "Multiplicar líderes como Jesús, reconocerlos y formarlos paso a paso, delegar como enseñó Jetro, trabajar en equipo, resolver conflictos según Mateo 18 y dirigir con visión, con corazón de siervo y con un plan de sucesión.",
  base: "2 Timoteo 2:2; Marcos 10:43-45",
  memoria: "2 Timoteo 2:2",
  lecciones: lecciones("n5-liderazgo-2", [
    ["Multiplicar líderes", "Marcos 3:14; 2 Timoteo 2:2; Lucas 6:40"],
    ["Reconocer y formar líderes", "Hechos 11:25-26; 1 Timoteo 3:10; 2 Timoteo 4:11"],
    ["Delegar", "Éxodo 18:17-23; Hechos 6:1-7"],
    ["Trabajar en equipo", "Nehemías 4:6; Eclesiastés 4:9-10; 1 Corintios 12:12"],
    ["Resolver conflictos", "Mateo 18:15-17; Mateo 5:23-24; Filipenses 4:2-3"],
    ["Visión, servicio y sucesión", "Habacuc 2:2; Marcos 10:43-45; Deuteronomio 31:7-8"],
  ], 10),
  silabo: {
    proposito:
      "Que el líder pase de hacer la obra a formar a quienes la harán: que multiplique líderes como Jesús, los reconozca y los forme paso a paso, delegue con sabiduría, trabaje en equipo, resuelva los conflictos según la Biblia y dirija con visión y con corazón de siervo. Sigue a Liderazgo cristiano I. Su centro es 2 Timoteo 2:2: «Lo que has oído de mí ante muchos testigos, esto encarga a hombres fieles que sean idóneos para enseñar también a otros». Quién puede ejercer cada cargo no se decide aquí: es un punto de la declaración de fe por confirmar.",
    objetivos: [
      { id: "o1", texto: "Explicar el modelo de Jesús para multiplicar líderes y las cuatro generaciones de 2 Timoteo 2:2.", bloom: "comprender" },
      { id: "o2", texto: "Reconocer a los líderes en formación y describir los pasos para formarlos.", bloom: "aplicar" },
      { id: "o3", texto: "Delegar con claridad, autoridad y seguimiento, según Éxodo 18 y Hechos 6.", bloom: "aplicar" },
      { id: "o4", texto: "Formar y dirigir equipos sanos, con propósito, roles claros y unidad.", bloom: "aplicar" },
      { id: "o5", texto: "Resolver conflictos con los pasos de Mateo 18 y Mateo 5.", bloom: "aplicar" },
      { id: "o6", texto: "Evaluar un ministerio por su visión, su liderazgo de servicio y su plan de sucesión.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar 2 Timoteo 2:2 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "El modelo bíblico para multiplicar líderes, delegar, trabajar en equipo, resolver conflictos y planificar.",
      ser: "Un líder humilde y siervo, que se alegra de que otros crezcan.",
      hacer: "Formar a un líder, delegar una tarea, dirigir un equipo y resolver un conflicto según la Biblia.",
    },
    bibliografia: {
      basica: [
        { autor: "Greg Ogden", titulo: "Discipulado que transforma: el modelo de Jesús", editorial: "CLIE" },
        { autor: "John C. Maxwell", titulo: "Desarrolle los líderes que están alrededor de usted", editorial: "Grupo Nelson" },
      ],
      complementaria: [
        { autor: "Ken Sande", titulo: "Pacificadores: una guía bíblica para la solución de los conflictos personales", editorial: "Ediciones Las Américas" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Marcos", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=gsXLQkppzUc", minutos: 11 },
      { tipo: "video", titulo: "Resumen del libro de Éxodo (parte 1)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=y9pED55wMM4", minutos: 7 },
      { tipo: "lectura", titulo: "Éxodo 18: el consejo de Jetro", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Exodo&cap=18" },
      { tipo: "lectura", titulo: "Hechos 6: los siete", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Hechos&cap=6" },
    ],
  },
  disponible: true,
};

const IDIOMAS: MateriaDef = {
  id: "n5-idiomas",
  nivel: 5,
  orden: 5,
  titulo: "Griego y hebreo bíblicos para el estudio",
  resumen: "Los idiomas en que se escribió la Biblia y cómo llegó hasta nosotros, los alfabetos hebreo y griego, palabras clave de los dos Testamentos, la concordancia de Strong, los interlineales y los diccionarios, cómo hacer un estudio de palabras y los errores que hay que evitar.",
  base: "Mateo 5:18; Nehemías 8:8",
  memoria: "Mateo 5:18",
  lecciones: lecciones("n5-idiomas", [
    ["Los idiomas de la Biblia", "Juan 19:19-20; Daniel 2:4; Mateo 5:18"],
    ["El hebreo y sus palabras clave", "Números 6:24-26; Deuteronomio 6:4"],
    ["El griego y sus palabras clave", "Apocalipsis 1:8; Juan 1:1"],
    ["Las herramientas del estudio", "Hechos 17:11; 2 Timoteo 2:15"],
    ["Cómo hacer un estudio de palabras", "Salmos 136:1-3; Éxodo 34:6"],
    ["Errores comunes y buen uso", "Romanos 1:16; Juan 21:15-17; 2 Corintios 4:2"],
  ], 10),
  silabo: {
    proposito:
      "Que el obrero conozca lo básico de los idiomas en que se escribió la Biblia y sepa usar las herramientas que lo acercan a ellos, sin necesidad de ser experto: cómo llegó el texto hasta nosotros, los alfabetos hebreo y griego, palabras clave de los dos Testamentos, la concordancia de Strong, los interlineales y los diccionarios, el estudio de palabras y los errores que hay que evitar. Dios cuidó su Palabra hasta el detalle: «ni una jota ni una tilde pasará de la ley, hasta que todo se haya cumplido» (Mateo 5:18).",
    objetivos: [
      { id: "o1", texto: "Identificar los idiomas de la Biblia y explicar cómo llegó el texto hasta nuestras traducciones.", bloom: "comprender" },
      { id: "o2", texto: "Describir el alfabeto hebreo y explicar palabras clave del Antiguo Testamento.", bloom: "comprender" },
      { id: "o3", texto: "Describir el alfabeto griego y explicar palabras clave del Nuevo Testamento.", bloom: "comprender" },
      { id: "o4", texto: "Usar la concordancia de Strong, un interlineal y un diccionario expositivo.", bloom: "aplicar" },
      { id: "o5", texto: "Hacer un estudio de palabras siguiendo sus pasos.", bloom: "analizar" },
      { id: "o6", texto: "Evaluar el uso de los idiomas originales en la enseñanza y evitar sus errores comunes.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar Mateo 5:18 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "Los idiomas de la Biblia, sus alfabetos, palabras clave y las herramientas del estudio.",
      ser: "Un estudiante humilde, que ama la Palabra hasta el detalle y no busca lucirse.",
      hacer: "Hacer un estudio de palabras con Strong, un interlineal y un diccionario, y enseñarlo con sencillez.",
    },
    bibliografia: {
      basica: [
        { autor: "Anita Henriques, Nelson Morales y Daniel S. Steffen", titulo: "Introducción al griego bíblico", editorial: "Vida" },
        { autor: "W. E. Vine", titulo: "Diccionario expositivo de palabras del Antiguo y del Nuevo Testamento exhaustivo", editorial: "Caribe" },
      ],
      complementaria: [
        { autor: "James Strong", titulo: "Nueva concordancia Strong exhaustiva", editorial: "Caribe" },
        { autor: "Francisco Lacueva", titulo: "Nuevo Testamento interlineal griego-español", editorial: "CLIE" },
        { autor: "Ricardo Cerni", titulo: "Antiguo Testamento interlineal hebreo-español", editorial: "CLIE" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Yahweh - SEÑOR", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=7Ajug_ZAfW4", minutos: 4 },
      { tipo: "video", titulo: "Agape - Amor", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=l75uPoo9Rs8", minutos: 5 },
      { tipo: "video", titulo: "¿Qué significa la palabra evangelio?", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=AxGypH5Dy3I", minutos: 5 },
      { tipo: "lectura", titulo: "Salmos 119: las 22 letras del alfabeto hebreo", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Salmos&cap=119" },
    ],
  },
  disponible: true,
};

const TEOLOGIA_PASTORAL: MateriaDef = {
  id: "n5-teologia-pastoral",
  nivel: 5,
  orden: 1,
  titulo: "Teología pastoral",
  resumen: "El buen pastor y el llamado, la vida del pastor con Dios y con su familia, apacentar con la Palabra, cuidar y visitar al rebaño, y acompañar en las crisis sin descuidarse, para terminar bien el ministerio.",
  base: "Juan 10:11; 1 Pedro 5:2-4",
  memoria: "Juan 10:11",
  lecciones: lecciones("n5-teologia-pastoral", [
    ["El buen pastor y el llamado", "Juan 10:11-14; 1 Pedro 5:1-4"],
    ["La vida del pastor con Dios", "Hechos 6:4; Marcos 1:35; 1 Timoteo 4:16; Marcos 6:31"],
    ["El pastor y su familia", "1 Timoteo 3:4-5; Josué 24:15; 1 Pedro 4:9"],
    ["Apacentar con la Palabra", "Juan 21:15-17; 2 Timoteo 4:1-2; Hechos 20:28-31"],
    ["Cuidar y visitar al rebaño", "Ezequiel 34:2-4; Juan 10:3; Santiago 5:14"],
    ["Acompañar en las crisis y terminar bien", "2 Corintios 1:3-4; 1 Corintios 10:12; 2 Timoteo 4:7"],
  ], 10),
  silabo: {
    proposito:
      "Que el que pastorea, o se prepara para hacerlo, conozca el corazón y la tarea del pastor según la Biblia: el llamado que nace de Cristo, el buen pastor; la vida con Dios y con la familia; apacentar con la Palabra; cuidar, visitar y acompañar en las crisis; y cuidarse para terminar bien. El modelo es Cristo: «Yo soy el buen pastor; el buen pastor su vida da por las ovejas» (Juan 10:11). Quién puede ejercer el pastorado no se decide aquí: es un punto de la declaración de fe por confirmar.",
    objetivos: [
      { id: "o1", texto: "Explicar el ministerio pastoral a partir de Cristo, el buen pastor, y cómo se reconoce el llamado.", bloom: "comprender" },
      { id: "o2", texto: "Describir la vida espiritual que necesita el pastor y cómo cuidarla.", bloom: "comprender" },
      { id: "o3", texto: "Aplicar prácticas que cuiden el hogar y la familia del que sirve.", bloom: "aplicar" },
      { id: "o4", texto: "Planificar la enseñanza de la Palabra para alimentar y proteger al rebaño.", bloom: "aplicar" },
      { id: "o5", texto: "Aplicar el cuidado pastoral: conocer, visitar, orar por los enfermos y referir a tiempo.", bloom: "aplicar" },
      { id: "o6", texto: "Evaluar cómo acompañar en las crisis y cómo prevenir el agotamiento y la caída.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar Juan 10:11 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "El ministerio pastoral según la Biblia: el llamado, la vida del pastor, la enseñanza, el cuidado y las crisis.",
      ser: "Un pastor con corazón de siervo, que cuida su vida con Dios y su familia.",
      hacer: "Apacentar con la Palabra, visitar, acompañar en el dolor y planificar el cuidado de la iglesia.",
    },
    bibliografia: {
      basica: [
        { autor: "John MacArthur (ed.)", titulo: "El ministerio pastoral: cómo pastorear bíblicamente", editorial: "Grupo Nelson" },
        { autor: "Pablo Hoff", titulo: "El pastor como consejero", editorial: "Vida" },
      ],
      complementaria: [
        { autor: "J. Oswald Sanders", titulo: "Liderazgo espiritual", editorial: "Portavoz" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de 1 Pedro", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=NXRkCxeO-C4", minutos: 10 },
      { tipo: "video", titulo: "Resumen del libro de Juan (parte 2)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=NUW1Frg8DA0", minutos: 9 },
      { tipo: "lectura", titulo: "Juan 10: el buen pastor", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Juan&cap=10" },
      { tipo: "lectura", titulo: "Ezequiel 34: los pastores de Israel", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Ezequiel&cap=34" },
    ],
  },
  disponible: true,
};

const ADMINISTRACION: MateriaDef = {
  id: "n5-administracion",
  nivel: 5,
  orden: 2,
  titulo: "Administración y gobierno de la iglesia",
  resumen: "La administración como don y mayordomía, las formas de gobierno de la iglesia, ancianos, diáconos y equipos, el dinero con transparencia, planificar y comunicar, y lo legal básico en los Estados Unidos.",
  base: "1 Corintios 14:40; 1 Pedro 4:10",
  memoria: "1 Corintios 14:40",
  lecciones: lecciones("n5-administracion", [
    ["Una iglesia en orden", "1 Corintios 14:33; 1 Corintios 14:40; 1 Corintios 12:28; 1 Pedro 4:10"],
    ["Formas de gobierno de la iglesia", "Hechos 14:23; Hechos 15:22"],
    ["Ancianos, diáconos y equipos", "Filipenses 1:1; 1 Timoteo 3:8-10; Hechos 6:3"],
    ["El dinero de la iglesia", "1 Corintios 16:1-2; 2 Corintios 8:20-21; Lucas 14:28"],
    ["Planificar, organizar y comunicar", "Nehemías 2:4-5; Proverbios 15:22; Proverbios 16:9"],
    ["Lo legal básico", "Mateo 22:21; Tito 3:1"],
  ], 10),
  silabo: {
    proposito:
      "Que el líder sepa ordenar la vida de la iglesia para que sirva a su misión: la administración como don y mayordomía, las formas de gobierno, las funciones de ancianos, diáconos y equipos, el manejo transparente del dinero, la planificación y la comunicación, y lo legal básico en los Estados Unidos, con ejemplos de Texas. La regla es la de Pablo: «pero hágase todo decentemente y con orden» (1 Corintios 14:40). La lección legal es una guía general, no un consejo legal. Quién puede ejercer cada cargo no se decide aquí: es un punto de la declaración de fe por confirmar.",
    objetivos: [
      { id: "o1", texto: "Explicar la administración como un don y una mayordomía al servicio de la misión.", bloom: "comprender" },
      { id: "o2", texto: "Describir las formas de gobierno de la iglesia y el lugar de los estatutos.", bloom: "comprender" },
      { id: "o3", texto: "Organizar las funciones de ancianos, diáconos y equipos de servicio.", bloom: "aplicar" },
      { id: "o4", texto: "Aplicar controles básicos para manejar el dinero con transparencia.", bloom: "aplicar" },
      { id: "o5", texto: "Planificar, organizar y comunicar la vida de la iglesia.", bloom: "crear" },
      { id: "o6", texto: "Evaluar el cumplimiento de los pasos legales básicos y cuándo consultar a un profesional.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar 1 Corintios 14:40 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "La administración de la iglesia: el orden bíblico, el gobierno, los equipos, el dinero, la planificación y lo legal básico.",
      ser: "Un administrador fiel y transparente, que sirve a las personas y no las controla.",
      hacer: "Organizar equipos, preparar un presupuesto con controles, planificar el año y cumplir los pasos legales básicos.",
    },
    bibliografia: {
      basica: [
        { autor: "Wilfredo Calderón", titulo: "La administración en la iglesia cristiana", editorial: "Vida" },
      ],
      complementaria: [
        { autor: "Joe E. Trull y James E. Carter", titulo: "Ética ministerial", editorial: "Mundo Hispano" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de 1 Corintios", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=6f0kym4bUmE", minutos: 10 },
      { tipo: "video", titulo: "Resumen de los libros de Esdras-Nehemías", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=OGdiLZ92nQs", minutos: 10 },
      { tipo: "lectura", titulo: "Hechos 6: los siete", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Hechos&cap=6" },
      { tipo: "lectura", titulo: "1 Timoteo 3: obispos y diáconos", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=1%20Timoteo&cap=3" },
    ],
  },
  disponible: true,
};

const SEMINARIO: MateriaDef = {
  id: "n5-seminario",
  nivel: 5,
  orden: 8,
  titulo: "Seminario de liderazgo ministerial",
  resumen: "Un método para estudiar casos con la Biblia, cuatro casos tomados de situaciones comunes del ministerio y el plan de ministerio propio de cada alumno.",
  base: "Proverbios 15:22; Proverbios 16:3",
  memoria: "Proverbios 16:3",
  lecciones: lecciones("n5-seminario", [
    ["Cómo estudiar un caso", "Proverbios 18:13; Proverbios 18:17; Santiago 1:5"],
    ["Caso: un desacuerdo que amenaza con dividir", "Hechos 15:6-7; Hechos 15:28; Romanos 14:19"],
    ["Caso: el dinero y la confianza", "Deuteronomio 19:15; 2 Corintios 8:20-21"],
    ["Caso: un líder que cae", "2 Samuel 12:7; 2 Samuel 12:13; Gálatas 6:1"],
    ["Caso: crecer sin perder el rumbo", "Hechos 2:47; Éxodo 18:17-18; Hechos 6:7"],
    ["Mi plan de ministerio", "Proverbios 16:3; Lucas 14:28; Habacuc 2:2"],
  ], 10),
  silabo: {
    proposito:
      "Que el líder aprenda a pensar con la Biblia ante las situaciones reales del ministerio y prepare su propio plan: un método para estudiar casos, cuatro casos tomados de situaciones comunes (un desacuerdo, el dinero, un líder que cae y una iglesia que crece) y el plan de ministerio, que puede servir de base para el proyecto final del Nivel 5. Integra lo aprendido en ética, liderazgo, administración y teología pastoral. Todo se encomienda a Dios: «Encomienda a Jehová tus obras, Y tus pensamientos serán afirmados» (Proverbios 16:3). Los casos son ejemplos compuestos, no de personas reales.",
    objetivos: [
      { id: "o1", texto: "Aplicar un método para estudiar casos del ministerio a la luz de la Biblia.", bloom: "aplicar" },
      { id: "o2", texto: "Analizar un desacuerdo en la iglesia con el modelo de Hechos 15.", bloom: "analizar" },
      { id: "o3", texto: "Analizar un caso de dinero faltante con justicia y proponer controles.", bloom: "analizar" },
      { id: "o4", texto: "Analizar el caso de un líder que cae: confrontación, disciplina, cuidado y restauración.", bloom: "analizar" },
      { id: "o5", texto: "Analizar una iglesia en crecimiento y proponer cómo formar líderes e integrar a los nuevos.", bloom: "analizar" },
      { id: "o6", texto: "Crear un plan de ministerio propio con visión, diagnóstico, metas, equipo, recursos, calendario y evaluación.", bloom: "crear" },
      { id: "o7", texto: "Recitar Proverbios 16:3 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "Un método para estudiar casos y las partes de un plan de ministerio.",
      ser: "Un líder que escucha antes de decidir, busca consejo y encomienda sus planes a Dios.",
      hacer: "Analizar casos del ministerio con la Biblia y preparar su propio plan de ministerio.",
    },
    bibliografia: {
      basica: [
        { autor: "J. Oswald Sanders", titulo: "Liderazgo espiritual", editorial: "Portavoz" },
        { autor: "Joe E. Trull y James E. Carter", titulo: "Ética ministerial", editorial: "Mundo Hispano" },
      ],
      complementaria: [
        { autor: "Henry y Richard Blackaby", titulo: "Liderazgo espiritual: cómo movilizar a las personas hacia el propósito de Dios", editorial: "B&H Español" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Hechos (parte 2)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=ZKaaHQUdVCY", minutos: 9 },
      { tipo: "video", titulo: "Resumen del libro de 2 Samuel", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=BEvicPpjQBE", minutos: 6 },
      { tipo: "lectura", titulo: "Hechos 15: el concilio de Jerusalén", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Hechos&cap=15" },
      { tipo: "lectura", titulo: "2 Samuel 12: Natán y David", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=2%20Samuel&cap=12" },
    ],
  },
  disponible: true,
};

const EXEGESIS: MateriaDef = {
  id: "n5-exegesis",
  nivel: 5,
  orden: 6,
  titulo: "Exégesis de un libro: Romanos",
  resumen: "El método exegético aplicado a una carta entera: el contexto, el argumento de Romanos sección por sección, sus palabras clave y las lecturas evangélicas donde hay diferencias, hasta la vida práctica y la misión.",
  base: "Romanos 1:16-17; 2 Timoteo 2:15",
  memoria: "Romanos 8:1",
  lecciones: lecciones("n5-exegesis", [
    ["El método exegético: leer Romanos en su contexto", "2 Timoteo 2:15; Romanos 15:22-24; Romanos 1:1-4; Romanos 1:5; Romanos 1:16-17; Habacuc 2:4"],
    ["Romanos 1:18 a 3:20: todos bajo pecado", "Romanos 1:18-20; Romanos 1:24-25; Romanos 2:1; Romanos 2:28-29; Romanos 3:19-20"],
    ["Romanos 3:21 a 5:21: la justicia de Dios por la fe", "Romanos 3:21-26; Romanos 4:11; Romanos 5:1-5; Romanos 5:8; Romanos 5:12"],
    ["Romanos 6 a 8: la vida nueva en el Espíritu", "Romanos 6:1-4; Romanos 6:11; Romanos 6:23; Romanos 7:18-19; Romanos 7:24-25; Romanos 8:1-2; Romanos 8:14-16; Romanos 8:26-28"],
    ["Romanos 9 a 11: Dios fiel a sus promesas", "Romanos 9:6; Romanos 9:14-16; Romanos 10:9-10; Romanos 10:13-15; Romanos 11:25-26; Romanos 11:33"],
    ["Romanos 12 a 16: la vida transformada y la misión", "Romanos 12:3-5; Romanos 13:1; Hechos 5:29; Romanos 14:1; Romanos 15:7; Romanos 15:20; Romanos 16:7; Romanos 16:25-26"],
  ], 10),
  silabo: {
    proposito:
      "Que el líder aprenda a estudiar un libro bíblico entero con el método exegético, aplicándolo a la carta a los Romanos: el contexto histórico y literario, el argumento de Pablo sección por sección, las palabras clave como justificación, redención y propiciación, y la vida práctica y la misión que nacen de la doctrina. Donde los evangélicos leen distinto (Romanos 7, la elección en Romanos 9, el futuro de Israel y Junias en Romanos 16) se presentan las lecturas con respeto, y el ministerio de la mujer es un punto de la declaración de fe por confirmar. Su base es el llamado de Pablo a Timoteo: «Procura con diligencia presentarte a Dios aprobado, como obrero que no tiene de qué avergonzarse, que usa bien la palabra de verdad» (2 Timoteo 2:15).",
    objetivos: [
      { id: "o1", texto: "Aplicar los pasos del método exegético a un texto de Romanos.", bloom: "aplicar" },
      { id: "o2", texto: "Explicar el argumento de Romanos 1:18 a 3:20 sobre el pecado de todos.", bloom: "comprender" },
      { id: "o3", texto: "Analizar la justificación por la fe en Romanos 3:21 a 5:21, con sus palabras clave.", bloom: "analizar" },
      { id: "o4", texto: "Explicar la vida nueva en el Espíritu en Romanos 6 a 8 y comparar con respeto las lecturas de Romanos 7.", bloom: "analizar" },
      { id: "o5", texto: "Evaluar las lecturas de Romanos 9 a 11 sobre la elección y el futuro de Israel.", bloom: "evaluar" },
      { id: "o6", texto: "Aplicar la enseñanza de Romanos 12 a 16 a la vida de la iglesia y a su misión.", bloom: "aplicar" },
      { id: "o7", texto: "Recitar Romanos 8:1 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "El método exegético y el argumento completo de la carta a los Romanos.",
      ser: "Un líder humilde ante el texto, que escucha a Dios antes de hablar.",
      hacer: "Preparar enseñanzas fieles a partir del estudio de un libro entero, paso a paso.",
    },
    bibliografia: {
      basica: [
        { autor: "Gordon D. Fee", titulo: "Exégesis del Nuevo Testamento: manual para estudiantes y pastores", editorial: "Vida" },
        { autor: "John Stott", titulo: "El mensaje de Romanos", editorial: "Certeza Unida" },
      ],
      complementaria: [
        { autor: "Douglas J. Moo", titulo: "Comentario bíblico con aplicación NVI: Romanos", editorial: "Vida" },
        { autor: "Gordon Fee y Douglas Stuart", titulo: "La lectura eficaz de la Biblia", editorial: "Vida" },
        { autor: "Henry A. Virkler", titulo: "Hermenéutica: principios y procedimientos de interpretación bíblica", editorial: "Vida" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Romanos (parte 1)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=0tco1rQGC1o", minutos: 9 },
      { tipo: "video", titulo: "Resumen del libro de Romanos (parte 2)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=ZqScL0dHLsM", minutos: 10 },
      { tipo: "lectura", titulo: "Lectura ampliada: la carta a los Romanos completa", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Romanos&cap=1" },
      { tipo: "lectura", titulo: "Declaración de fe del Ministerio Avivando el Fuego", fuente: "Academia Avivando el Fuego", url: "/academia/declaracion-de-fe" },
    ],
  },
  disponible: true,
};

const AVIVAMIENTO: MateriaDef = {
  id: "n5-avivamiento",
  nivel: 5,
  orden: 7,
  titulo: "Teología del avivamiento",
  resumen: "Los principios bíblicos, la historia y el discernimiento del avivamiento: qué es, los avivamientos del Antiguo Testamento y de Hechos, los de la historia de la iglesia, cómo discernirlos y cómo buscarlos y sostener sus frutos.",
  base: "Habacuc 3:2; Hechos 3:19",
  memoria: "Habacuc 3:2",
  lecciones: lecciones("n5-avivamiento", [
    ["¿Qué es el avivamiento?", "Salmos 85:6; Habacuc 3:2; Isaías 57:15; Apocalipsis 2:4-5; Hechos 3:19"],
    ["Los avivamientos en el Antiguo Testamento", "2 Crónicas 29:3; 2 Crónicas 30:26; 2 Reyes 22:11; 2 Reyes 23:3; Nehemías 8:8; Nehemías 8:10; 2 Crónicas 7:14"],
    ["Pentecostés y los avivamientos de Hechos", "Joel 2:28-29; Hechos 2:1-4; Hechos 2:37-41; Hechos 4:31; Hechos 8:5-8; Hechos 19:18-20"],
    ["La historia de los avivamientos", "Salmos 78:4; Hebreos 13:8"],
    ["El discernimiento: examinadlo todo", "1 Tesalonicenses 5:19-21; 1 Juan 4:1-3; Mateo 7:15-17; 1 Corintios 14:33; 1 Corintios 14:40; Levítico 10:1-2"],
    ["Buscar el avivamiento y sostener sus frutos", "Hechos 1:14; Santiago 4:8; Oseas 10:12; Hechos 2:42; Mateo 9:37-38; Gálatas 6:9"],
  ], 10),
  silabo: {
    proposito:
      "Que el líder entienda el avivamiento con la Escritura, la historia y el discernimiento, siguiendo el artículo 15 de la declaración de fe: qué es y en qué se distingue de la evangelización, los avivamientos de Ezequías, Josías y Esdras y Nehemías, Pentecostés y los avivamientos de Hechos, los grandes avivamientos de la historia desde Herrnhut hasta Valparaíso, las señales de una obra verdadera del Espíritu según Jonathan Edwards, y cómo buscarlo y sostener sus frutos. Un punto de la declaración de fe por confirmar se presenta con respeto: las lenguas como señal inicial del bautismo en el Espíritu. Su base es la oración del profeta: «Oh Jehová, aviva tu obra en medio de los tiempos» (Habacuc 3:2).",
    objetivos: [
      { id: "o1", texto: "Definir el avivamiento con la Escritura y la declaración de fe, y distinguirlo de la evangelización y de un despertar.", bloom: "comprender" },
      { id: "o2", texto: "Analizar el patrón de los avivamientos del Antiguo Testamento y leer 2 Crónicas 7:14 en su contexto.", bloom: "analizar" },
      { id: "o3", texto: "Explicar Pentecostés y los frutos de los avivamientos del libro de los Hechos.", bloom: "comprender" },
      { id: "o4", texto: "Analizar los principales avivamientos de la historia, lo que tienen en común y sus frutos.", bloom: "analizar" },
      { id: "o5", texto: "Evaluar las manifestaciones espirituales con los criterios bíblicos de discernimiento.", bloom: "evaluar" },
      { id: "o6", texto: "Planificar cómo buscar el avivamiento y sostener sus frutos en la iglesia local.", bloom: "crear" },
      { id: "o7", texto: "Recitar Habacuc 3:2 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "La teología bíblica del avivamiento, su historia y los criterios para discernirlo.",
      ser: "Un líder humilde y con hambre de Dios, abierto al Espíritu y firme en la Palabra.",
      hacer: "Guiar a la iglesia a buscar el avivamiento, a discernir sus manifestaciones y a cuidar sus frutos.",
    },
    bibliografia: {
      basica: [
        { autor: "Arthur Wallis", titulo: "En el día de su poder", editorial: "Unilit" },
        { autor: "Jonathan Edwards", titulo: "Los afectos religiosos: la válida experiencia cristiana", editorial: "Publicaciones Faro de Gracia" },
      ],
      complementaria: [
        { autor: "Justo L. González", titulo: "Historia del cristianismo", editorial: "Unilit", nota: "Para los moravos, los despertares y el metodismo." },
        { autor: "Pablo A. Deiros", titulo: "Historia del cristianismo en América Latina", editorial: "Mundo Hispano", nota: "Para el pentecostalismo en América Latina." },
        { autor: "Stanley M. Horton (ed.)", titulo: "Teología sistemática: una perspectiva pentecostal", editorial: "Vida" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Qué sucedió en Pentecostés y por qué es importante", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=OisTpQEle6E", minutos: 7 },
      { tipo: "video", titulo: "Resumen de los libros de Esdras-Nehemías", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=OGdiLZ92nQs", minutos: 10 },
      { tipo: "lectura", titulo: "Lectura ampliada: los primeros capítulos de Hechos", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Hechos&cap=2" },
      { tipo: "lectura", titulo: "Declaración de fe del Ministerio Avivando el Fuego", fuente: "Academia Avivando el Fuego", url: "/academia/declaracion-de-fe" },
    ],
  },
  disponible: true,
};

const MINISTERIO_PASTORAL: MateriaDef = {
  id: "pastoral-1",
  nivel: null,
  especialidad: "pastoral",
  avanzada: true,
  orden: 1,
  titulo: "El ministerio pastoral",
  resumen: "La práctica del oficio pastoral: anciano, obispo y pastor, la autoridad que sirve, el equipo pastoral, la disciplina que restaura, la protección del rebaño y la salud del pastor.",
  base: "Hechos 20:28; 1 Pedro 5:2-3",
  memoria: "Hechos 20:28",
  lecciones: lecciones("pastoral-1", [
    ["Anciano, obispo y pastor", "Hechos 20:17; Hechos 20:28; Tito 1:7-9"],
    ["Supervisar sin señorear", "Mateo 20:25-28; 1 Pedro 5:2-3; 3 Juan 1:9-10"],
    ["Formar el equipo pastoral", "Éxodo 18:17-18; Tito 1:5; Filipenses 2:19-22; Colosenses 4:7-9"],
    ["La disciplina que restaura", "Mateo 18:15-17; Gálatas 6:1; 2 Corintios 2:6-8"],
    ["Proteger al rebaño", "Hechos 20:29-31; 2 Pedro 2:1-3; Ezequiel 34:4; Mateo 18:6"],
    ["La salud del pastor", "1 Reyes 19:4-5; 2 Corintios 4:7-10; Gálatas 6:2"],
  ], 10),
  silabo: {
    proposito:
      "Que el líder que sirve como pastor, o se prepara para hacerlo, viva su oficio con la práctica que pide el Nuevo Testamento: los nombres y las tareas de anciano, obispo y pastor, una autoridad que sirve y no señorea, un equipo pastoral formado con paciencia, una disciplina que busca restaurar, la protección del rebaño frente al error y al abuso, con lo que pide la ley, y el cuidado de su propia salud. No repite Teología pastoral (Nivel 5) ni Cuidado y consejería básica (Nivel 3): las lleva a la práctica. Quién ejerce el pastorado es parte del ministerio de la mujer, un punto de la declaración de fe por confirmar. Su base es el encargo de Pablo a los ancianos de Éfeso: «mirad por vosotros, y por todo el rebaño en que el Espíritu Santo os ha puesto por obispos, para apacentar la iglesia del Señor» (Hechos 20:28).",
    objetivos: [
      { id: "o1", texto: "Explicar los nombres y las tareas del oficio pastoral en el Nuevo Testamento.", bloom: "comprender" },
      { id: "o2", texto: "Contrastar la autoridad que sirve con el liderazgo que domina, y reconocer sus señales de alerta.", bloom: "analizar" },
      { id: "o3", texto: "Planificar la formación de un equipo pastoral según el ejemplo de Pablo.", bloom: "aplicar" },
      { id: "o4", texto: "Aplicar los pasos de la disciplina bíblica con el propósito de restaurar.", bloom: "aplicar" },
      { id: "o5", texto: "Evaluar las medidas para proteger al rebaño del error y del abuso.", bloom: "evaluar" },
      { id: "o6", texto: "Planificar el cuidado de la propia salud y la rendición de cuentas del pastor.", bloom: "aplicar" },
      { id: "o7", texto: "Recitar Hechos 20:28 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "El oficio pastoral del Nuevo Testamento y sus tareas prácticas.",
      ser: "Un pastor siervo, que es ejemplo, rinde cuentas y cuida de sí mismo.",
      hacer: "Guiar, formar un equipo, corregir para restaurar y proteger al rebaño.",
    },
    bibliografia: {
      basica: [
        { autor: "John MacArthur (ed.)", titulo: "El ministerio pastoral: cómo pastorear bíblicamente", editorial: "Grupo Nelson" },
        { autor: "Joe E. Trull y James E. Carter", titulo: "Ética ministerial", editorial: "Mundo Hispano" },
      ],
      complementaria: [
        { autor: "J. Oswald Sanders", titulo: "Liderazgo espiritual", editorial: "Portavoz" },
        { autor: "Wilfredo Calderón", titulo: "La administración en la iglesia cristiana", editorial: "Vida" },
        { autor: "Pablo Hoff", titulo: "El pastor como consejero", editorial: "Vida" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de 1 Timoteo", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=K5xCbQcSsOE", minutos: 11 },
      { tipo: "video", titulo: "Resumen del libro de Tito", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=SuJmsIu_1-M", minutos: 10 },
      { tipo: "lectura", titulo: "Lectura ampliada: Hechos 20, la despedida de Pablo a los ancianos", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Hechos&cap=20" },
      { tipo: "lectura", titulo: "Declaración de fe del Ministerio Avivando el Fuego", fuente: "Academia Avivando el Fuego", url: "/academia/declaracion-de-fe" },
    ],
  },
  disponible: true,
};

const CONSEJERIA_PASTORAL: MateriaDef = {
  id: "pastoral-2",
  nivel: null,
  especialidad: "pastoral",
  avanzada: true,
  orden: 2,
  titulo: "Consejería pastoral",
  resumen: "Aconsejar con la Palabra: qué es la consejería pastoral, el método de Jesús con la samaritana, la culpa y el perdón, la ansiedad y la tristeza profunda, los conflictos y la reconciliación, y los límites de la confidencialidad y de la derivación.",
  base: "Colosenses 1:28; Isaías 50:4",
  memoria: "Isaías 50:4",
  lecciones: lecciones("pastoral-2", [
    ["¿Qué es la consejería pastoral?", "Colosenses 1:28; Isaías 50:4; Romanos 15:14; Proverbios 11:14"],
    ["El método de Jesús: la samaritana", "Juan 4:7-10; Juan 4:16-18; Juan 4:28-29"],
    ["La culpa y el perdón", "Salmos 32:3-5; 1 Juan 1:9; 2 Corintios 7:10"],
    ["La ansiedad y la tristeza profunda", "Salmos 42:5; Filipenses 4:6-7; 1 Pedro 5:7; Mateo 11:28"],
    ["Conflictos y reconciliación", "Mateo 5:23-24; Romanos 12:18; Efesios 4:31-32"],
    ["La confidencialidad, la derivación y los límites", "Proverbios 11:13; Proverbios 24:11"],
  ], 10),
  silabo: {
    proposito:
      "Que el líder que acompaña a otros como pastor aprenda a aconsejar con la Palabra: qué es la consejería pastoral y en qué se distinguen los enfoques evangélicos, el método de Jesús con la samaritana, cómo acompañar la culpa y el perdón, la ansiedad y la tristeza profunda, cómo ayudar a reconciliar a los que están en conflicto, y los límites de la confidencialidad, con lo que pide la ley en Texas, y cuándo derivar a un profesional. Lleva a la práctica Cuidado y consejería básica (Nivel 3) sin repetirla, y no reemplaza la atención médica ni la psicológica. Su base es la lengua del siervo de Jehová: «Jehová el Señor me dio lengua de sabios, para saber hablar palabras al cansado» (Isaías 50:4).",
    objetivos: [
      { id: "o1", texto: "Explicar qué es la consejería pastoral y en qué se distinguen los enfoques evangélicos.", bloom: "comprender" },
      { id: "o2", texto: "Aplicar a una conversación pastoral los pasos del método de Jesús con la samaritana.", bloom: "aplicar" },
      { id: "o3", texto: "Distinguir la culpa verdadera de la falsa culpa y acompañar a quien confiesa hacia el perdón.", bloom: "analizar" },
      { id: "o4", texto: "Acompañar la ansiedad y la tristeza profunda con la Palabra, y reconocer cuándo hace falta ayuda médica.", bloom: "aplicar" },
      { id: "o5", texto: "Planificar la reconciliación de un conflicto entre hermanos, distinguiendo perdonar de reconciliarse.", bloom: "aplicar" },
      { id: "o6", texto: "Evaluar los límites de la confidencialidad y las razones para derivar a un profesional.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar Isaías 50:4 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "La consejería pastoral, sus enfoques evangélicos y sus límites.",
      ser: "Un consejero que escucha, guarda la confidencia y acompaña con la Palabra y con amor.",
      hacer: "Conducir una conversación pastoral, acompañar la culpa, la ansiedad y los conflictos, y derivar cuando hace falta.",
    },
    bibliografia: {
      basica: [
        { autor: "Pablo Hoff", titulo: "El pastor como consejero", editorial: "Vida" },
        { autor: "Gary R. Collins", titulo: "Consejería cristiana efectiva", editorial: "Portavoz" },
      ],
      complementaria: [
        { autor: "Jay E. Adams", titulo: "Capacitado para orientar", editorial: "Portavoz" },
        { autor: "Lawrence J. Crabb", titulo: "El arte de aconsejar bíblicamente", editorial: "Unilit" },
        { autor: "Ken Sande", titulo: "Pacificadores: guía bíblica para la resolución de conflictos personales", editorial: "Peacemaker Ministries" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Juan (parte 1)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=OU16-2Sg_CQ", minutos: 10 },
      { tipo: "video", titulo: "Carácter de Dios", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=oHMicgEfIrY", minutos: 6 },
      { tipo: "lectura", titulo: "Lectura ampliada: Juan 4, Jesús y la mujer samaritana", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Juan&cap=4" },
      { tipo: "lectura", titulo: "Declaración de fe del Ministerio Avivando el Fuego", fuente: "Academia Avivando el Fuego", url: "/academia/declaracion-de-fe" },
    ],
  },
  disponible: true,
};

const ORDENANZAS_CEREMONIAS: MateriaDef = {
  id: "pastoral-3",
  nivel: null,
  especialidad: "pastoral",
  orden: 3,
  titulo: "Ordenanzas y ceremonias",
  resumen: "La práctica del pastor que preside: las ordenanzas y las ceremonias, el bautismo en agua, la Santa Cena, la presentación de niños, la boda cristiana, con lo que pide la ley en Texas, y el funeral, cada una con su ejemplo resuelto paso a paso.",
  base: "Mateo 28:19; 1 Corintios 11:23-26",
  memoria: "1 Corintios 11:26",
  lecciones: lecciones("pastoral-3", [
    ["Ordenanzas y ceremonias", "Mateo 28:19-20; 1 Corintios 11:23-24; Hechos 2:41-42; 1 Corintios 14:40"],
    ["El bautismo en agua", "Hechos 2:38; Hechos 8:36-38; Romanos 6:3-4; Mateo 28:19"],
    ["La Santa Cena", "1 Corintios 11:23-26; 1 Corintios 10:16-17; 1 Corintios 11:27-29; Hechos 20:7"],
    ["La presentación de niños", "1 Samuel 1:27-28; Lucas 2:22; Marcos 10:13-16; Deuteronomio 6:6-7; Efesios 6:4"],
    ["La boda cristiana", "Génesis 2:24; Mateo 19:4-6; Hebreos 13:4; Efesios 5:25; 2 Corintios 6:14"],
    ["El funeral y el consuelo", "Juan 11:35; Juan 11:25-26; 1 Tesalonicenses 4:13-14; Romanos 12:15; 2 Corintios 1:3-4"],
  ], 10),
  silabo: {
    proposito:
      "Que el líder que preside en su iglesia, o se prepara para hacerlo, celebre con orden y con sentido bíblico las ordenanzas y las ceremonias: que distinga lo que el Señor mandó de lo que la iglesia celebra, que prepare y dirija el bautismo en agua y la Santa Cena según la declaración de fe del ministerio (artículo 8), y que acompañe a las familias en la presentación de sus hijos, en la boda, con lo que pide la ley en Texas, y en el funeral. Lleva a la práctica pastoral la doctrina del Nivel 1 sobre el bautismo y la Cena, sin repetirla, y presenta con respeto las prácticas de otras iglesias. Su base es la palabra de Pablo sobre la Cena: «Así, pues, todas las veces que comiereis este pan, y bebiereis esta copa, la muerte del Señor anunciáis hasta que él venga» (1 Corintios 11:26).",
    objetivos: [
      { id: "o1", texto: "Distinguir las ordenanzas de las ceremonias y comparar con respeto cómo las entienden las iglesias.", bloom: "analizar" },
      { id: "o2", texto: "Preparar y dirigir un bautismo en agua, con su clase, su entrevista y la seguridad en el agua.", bloom: "aplicar" },
      { id: "o3", texto: "Explicar el sentido de la Santa Cena y dirigir su celebración con orden y reverencia.", bloom: "aplicar" },
      { id: "o4", texto: "Preparar y dirigir una presentación de niños, con el compromiso de los padres y de la iglesia.", bloom: "aplicar" },
      { id: "o5", texto: "Planificar una boda cristiana, con la consejería prematrimonial y lo que pide la ley en Texas.", bloom: "aplicar" },
      { id: "o6", texto: "Acompañar a una familia en el duelo y dirigir un funeral con esperanza, también en los casos difíciles.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar 1 Corintios 11:26 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "Las ordenanzas y las ceremonias de la iglesia, su sentido bíblico y lo que pide la ley.",
      ser: "Un pastor que preside con reverencia, orden y compasión, sin lucirse.",
      hacer: "Preparar y dirigir el bautismo, la Santa Cena, la presentación de niños, la boda y el funeral.",
    },
    bibliografia: {
      basica: [
        { autor: "Kittim Silva", titulo: "Manual para ceremonias religiosas", editorial: "CLIE" },
        { autor: "Editorial Vida (ed.)", titulo: "Manual del ministro", editorial: "Vida" },
      ],
      complementaria: [
        { autor: "Guillermo I. Catalán", titulo: "Nuevo manual para ministros", editorial: "Mundo Hispano" },
        { autor: "Stanley M. Horton (ed.)", titulo: "Teología sistemática: una perspectiva pentecostal", editorial: "Vida" },
        { autor: "Myer Pearlman", titulo: "Teología bíblica y sistemática", editorial: "Vida" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de 1 Corintios", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=6f0kym4bUmE", minutos: 10 },
      { tipo: "video", titulo: "Resumen del libro de Hechos (parte 1): Hechos 1-12", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=5h7Q0EK-m8I", minutos: 9 },
      { tipo: "lectura", titulo: "Lectura ampliada: 1 Corintios 11, la Cena del Señor", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=1%20Corintios&cap=11" },
      { tipo: "lectura", titulo: "Declaración de fe del Ministerio Avivando el Fuego", fuente: "Academia Avivando el Fuego", url: "/academia/declaracion-de-fe" },
    ],
  },
  disponible: true,
};

const VISITACION_CUIDADO: MateriaDef = {
  id: "pastoral-4",
  nivel: null,
  especialidad: "pastoral",
  orden: 4,
  titulo: "Visitación y cuidado del rebaño",
  resumen: "El cuidado pastoral en la práctica: conocer a las ovejas con un mapa del rebaño, la visita en el hogar, la visita a los enfermos y a los que se mueren, los ancianos, los presos y los que están solos, la búsqueda de la oveja perdida y un plan de cuidado con toda la iglesia.",
  base: "Proverbios 27:23; Juan 10:11-14",
  memoria: "Proverbios 27:23",
  lecciones: lecciones("pastoral-4", [
    ["El pastor que conoce a sus ovejas", "Juan 10:11-14; Proverbios 27:23; Ezequiel 34:11-12; Jeremías 3:15"],
    ["La visita en el hogar", "Hechos 20:20; Lucas 19:5-6; 1 Tesalonicenses 2:7-8; Romanos 12:13"],
    ["Visitar a los enfermos", "Mateo 25:35-36; Santiago 5:14-15; 2 Corintios 12:9; Juan 14:1-3"],
    ["Ancianos, presos y los que están solos", "Santiago 1:27; Levítico 19:32; Salmos 71:9; Hebreos 13:3; 2 Timoteo 1:16"],
    ["Buscar a la oveja perdida", "Lucas 15:4-7; Ezequiel 34:16; Hebreos 10:24-25; Santiago 5:19-20"],
    ["Un plan de cuidado: no solo el pastor", "Hechos 6:1-4; 1 Corintios 12:25-26; 1 Pedro 4:10; Gálatas 6:10"],
  ], 10),
  silabo: {
    proposito:
      "Que el líder que pastorea, o se prepara para hacerlo, cuide al rebaño persona por persona: que conozca a sus ovejas con un mapa del rebaño, que visite los hogares con un propósito y con prudencia, que acompañe a los enfermos y a los que se mueren según la declaración de fe del ministerio (artículo 11), que no olvide a los ancianos, a los presos y a los que están solos, que busque a los que se alejan sin acusarlos y que organice con toda la iglesia un plan de cuidado para que nadie quede sin visita. Lleva a la práctica Teología pastoral (Nivel 5) y El ministerio pastoral, sin repetirlas. Su base es el consejo del sabio a quien cuida un rebaño: «Sé diligente en conocer el estado de tus ovejas, Y mira con cuidado por tus rebaños» (Proverbios 27:23).",
    objetivos: [
      { id: "o1", texto: "Explicar por qué el pastor conoce a sus ovejas, y armar un mapa del rebaño.", bloom: "aplicar" },
      { id: "o2", texto: "Planear y hacer una visita pastoral en un hogar, con un propósito y con prudencia.", bloom: "aplicar" },
      { id: "o3", texto: "Visitar a los enfermos en el hospital y acompañar a los que se mueren y a sus familias.", bloom: "aplicar" },
      { id: "o4", texto: "Planear el cuidado de los ancianos, de los que no salen de casa y de los presos.", bloom: "aplicar" },
      { id: "o5", texto: "Buscar a los que se alejan de la iglesia y ayudarlos a volver, sin acusarlos.", bloom: "aplicar" },
      { id: "o6", texto: "Evaluar y organizar un plan de cuidado en el que participe toda la iglesia.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar Proverbios 27:23 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "El cuidado pastoral en la Biblia y sus formas prácticas: la visita, el hospital, la cárcel y el plan de cuidado.",
      ser: "Un pastor que conoce a sus ovejas, se queda en el peligro y busca a la que falta.",
      hacer: "Visitar con prudencia, acompañar a los enfermos y a los que están solos, buscar a los que se alejan y organizar el cuidado.",
    },
    bibliografia: {
      basica: [
        { autor: "Timothy Z. Witmer", titulo: "El líder pastor: cómo lograr un pastoreo efectivo en tu iglesia", editorial: "P&R Publishing" },
        { autor: "Pablo Hoff", titulo: "El pastor como consejero", editorial: "Vida" },
      ],
      complementaria: [
        { autor: "John MacArthur (ed.)", titulo: "El ministerio pastoral: cómo pastorear bíblicamente", editorial: "Grupo Nelson" },
        { autor: "Guillermo I. Catalán", titulo: "Nuevo manual para ministros", editorial: "Mundo Hispano" },
        { autor: "Jorge A. León", titulo: "Psicología pastoral para la familia", editorial: "Caribe" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Santiago", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=yDqK_U-ipfc", minutos: 9 },
      { tipo: "video", titulo: "Lucas 9 a 19: cómo seguir a Jesús", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=sm8-GQl9P6w", minutos: 5 },
      { tipo: "lectura", titulo: "Lectura ampliada: Lucas 15, la oveja perdida", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Lucas&cap=15" },
      { tipo: "lectura", titulo: "Declaración de fe del Ministerio Avivando el Fuego", fuente: "Academia Avivando el Fuego", url: "/academia/declaracion-de-fe" },
    ],
  },
  disponible: true,
};

const PREDICACION_PASTORAL: MateriaDef = {
  id: "pastoral-5",
  nivel: null,
  especialidad: "pastoral",
  avanzada: true,
  orden: 5,
  titulo: "Predicación pastoral",
  resumen: "La predicación del pastor que conoce a su rebaño: sus tareas, el plan de predicación del año, la predicación en las crisis, las ocasiones especiales, la corrección y el consuelo desde el púlpito y el crecimiento del predicador.",
  base: "Hechos 20:27; 2 Timoteo 4:2",
  memoria: "Hechos 20:27",
  lecciones: lecciones("pastoral-5", [
    ["El pastor que predica a su rebaño", "Juan 21:15-17; Ezequiel 3:17; 1 Corintios 14:3; 2 Timoteo 4:2"],
    ["Planificar la predicación del año", "Hechos 20:27; 2 Timoteo 3:16-17; Lucas 24:27; Lucas 1:3"],
    ["Predicar en tiempos de crisis", "Job 2:13; Salmos 46:1-2; Lamentaciones 3:21-23; Juan 16:33; Habacuc 3:17-18"],
    ["Predicar en las ocasiones especiales", "Colosenses 4:5-6; Lucas 2:10-11; 1 Corintios 15:3-4; Efesios 5:31-32; 2 Corintios 5:1"],
    ["Corregir y consolar desde el púlpito", "Isaías 40:1-2; 1 Tesalonicenses 5:14; Efesios 4:15; 2 Corintios 2:4; Gálatas 4:16"],
    ["El pastor que crece como predicador", "1 Timoteo 4:15-16; Hechos 18:24-26; Proverbios 15:22; 2 Corintios 4:2; Hebreos 13:7"],
  ], 10),
  silabo: {
    proposito:
      "Que el pastor, o quien se prepara para serlo, predique a su congregación como quien la apacienta: que conozca las tareas de la predicación pastoral, que planifique un año de predicación que anuncie todo el consejo de Dios, que sepa predicar en una crisis con lamento y con esperanza, que hable con claridad a los que vienen pocas veces en las ocasiones especiales, que corrija y consuele con la verdad en amor y que siga creciendo como predicador, con retroalimentación y con honestidad. No repite Homilética I (Nivel 3) ni Homilética II (Nivel 4), que enseñan a preparar y a presentar el sermón: las lleva a la vida de una congregación a lo largo del año. Su base es el testimonio de Pablo a los ancianos de Éfeso: «porque no he rehuido anunciaros todo el consejo de Dios» (Hechos 20:27).",
    objetivos: [
      { id: "o1", texto: "Explicar la predicación del pastor que conoce a su rebaño y sus tareas: alimentar, advertir, exhortar y consolar.", bloom: "comprender" },
      { id: "o2", texto: "Diseñar un plan de predicación de un año que anuncie todo el consejo de Dios.", bloom: "crear" },
      { id: "o3", texto: "Preparar un mensaje para un tiempo de crisis, con lamento y con esperanza.", bloom: "aplicar" },
      { id: "o4", texto: "Preparar mensajes para las ocasiones especiales, claros para los que vienen pocas veces.", bloom: "aplicar" },
      { id: "o5", texto: "Evaluar cómo corregir y consolar desde el púlpito con la verdad en amor.", bloom: "evaluar" },
      { id: "o6", texto: "Planificar su crecimiento como predicador, con retroalimentación y con honestidad.", bloom: "aplicar" },
      { id: "o7", texto: "Recitar Hechos 20:27 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "La predicación pastoral, el plan de predicación del año y los mensajes para las crisis y las ocasiones especiales.",
      ser: "Un predicador que apacienta con paciencia, dice la verdad en amor y sigue aprendiendo con humildad.",
      hacer: "Planificar un año de predicación, predicar en las crisis y en las ocasiones especiales, y pedir retroalimentación.",
    },
    bibliografia: {
      basica: [
        { autor: "John Stott", titulo: "La predicación: puente entre dos mundos", editorial: "Libros Desafío" },
        { autor: "D. Martyn Lloyd-Jones", titulo: "La predicación y los predicadores", editorial: "Peregrino" },
      ],
      complementaria: [
        { autor: "Haddon W. Robinson", titulo: "La predicación bíblica: desarrollo y presentación de mensajes expositivos", editorial: "Unilit" },
        { autor: "Orlando E. Costas", titulo: "Comunicación por medio de la predicación", editorial: "Caribe" },
        { autor: "James D. Crane", titulo: "El sermón eficaz", editorial: "Casa Bautista de Publicaciones" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de 2 Timoteo", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=lvNqjbjTytE", minutos: 9 },
      { tipo: "video", titulo: "Resumen del libro de Salmos", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=8yieTfiw_Ew", minutos: 10 },
      { tipo: "lectura", titulo: "Lectura ampliada: Hechos 20, todo el consejo de Dios", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Hechos&cap=20" },
      { tipo: "lectura", titulo: "Declaración de fe del Ministerio Avivando el Fuego", fuente: "Academia Avivando el Fuego", url: "/academia/declaracion-de-fe" },
    ],
  },
  disponible: true,
};

const EDUCACION_NINEZ: MateriaDef = {
  id: "ninez-1",
  nivel: null,
  especialidad: "ninez",
  orden: 1,
  titulo: "Educación cristiana de la niñez",
  resumen: "Por qué y para qué la iglesia enseña a los niños: el mandato de contar a la generación venidera las obras de Dios, la familia y la iglesia juntas, Jesús y los niños, los niños que sirvieron a Dios en la Biblia, la enseñanza a los niños en la historia y la meta del ministerio: discípulos que aman a Dios.",
  base: "Salmos 78:4-7; Deuteronomio 6:6-7",
  memoria: "Salmos 78:4",
  lecciones: lecciones("ninez-1", [
    ["¿Por qué enseñar a los niños?", "Salmos 78:4-7; Deuteronomio 6:6-7; Mateo 19:14; Lucas 2:52"],
    ["La familia y la iglesia, juntas", "2 Timoteo 1:5; 2 Timoteo 3:14-15; Efesios 6:4"],
    ["Jesús y los niños", "Mateo 18:2-5; Marcos 10:13-16; Mateo 21:15-16"],
    ["Niños que sirvieron a Dios", "1 Samuel 3:8-10; 2 Reyes 5:2-3; 2 Crónicas 34:1-3; Juan 6:9"],
    ["La enseñanza a los niños en la historia", "Éxodo 12:26-27; Nehemías 8:2-3; Hechos 2:39"],
    ["La meta: discípulos que aman a Dios", "Mateo 22:37-39; Proverbios 22:6; 3 Juan 1:4"],
  ], 10),
  silabo: {
    proposito:
      "Que el que sirve con los niños, o se prepara para hacerlo, entienda por qué y para qué la iglesia los enseña: que conozca el mandato bíblico de contar a la generación venidera las obras de Dios, que vea cómo la familia y la iglesia enseñan juntas, que aprenda de la manera en que Jesús recibió a los niños y de los niños que sirvieron a Dios en la Biblia, que conozca cómo se enseñó a los niños en la historia de Israel y de la iglesia, y que escriba los objetivos de un ministerio que forma discípulos que aman a Dios y al prójimo. Es la base de la especialidad Niñez. Su base es la promesa de Israel: «No las encubriremos a sus hijos, Contando a la generación venidera las alabanzas de Jehová, Y su potencia, y las maravillas que hizo» (Salmos 78:4).",
    objetivos: [
      { id: "o1", texto: "Explicar por qué la Biblia manda enseñar a los niños.", bloom: "comprender" },
      { id: "o2", texto: "Explicar cómo la familia y la iglesia enseñan juntas a los niños.", bloom: "comprender" },
      { id: "o3", texto: "Describir cómo recibió Jesús a los niños, y aplicarlo al ministerio.", bloom: "aplicar" },
      { id: "o4", texto: "Analizar los ejemplos de niños que sirvieron a Dios en la Biblia.", bloom: "analizar" },
      { id: "o5", texto: "Describir cómo se enseñó a los niños en la historia de Israel y de la iglesia.", bloom: "comprender" },
      { id: "o6", texto: "Escribir los objetivos de un ministerio que forma discípulos que aman a Dios.", bloom: "crear" },
      { id: "o7", texto: "Recitar Salmos 78:4 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "El mandato bíblico de enseñar a los niños, la tarea de la familia y de la iglesia, y la historia de la enseñanza a los niños.",
      ser: "Un maestro que recibe a los niños como Jesús y los ve como parte del pueblo de Dios.",
      hacer: "Enseñar junto con las familias y escribir objetivos para formar discípulos.",
    },
    bibliografia: {
      basica: [
        { autor: "Steve Adams", titulo: "Ministerio con propósito para niños", editorial: "Vida" },
        { autor: "Brian Dembowczyk", titulo: "Ministerio de niños centrado en el evangelio", editorial: "B&H Español" },
      ],
      complementaria: [
        { autor: "Henry y Adriana Pabón", titulo: "Tu ministerio de niños puede crecer", editorial: "e625" },
        { autor: "John Milton Gregory", titulo: "Las siete leyes de la enseñanza", editorial: "Casa Bautista de Publicaciones" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Deuteronomio", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=qfMplfJoYA0", minutos: 10 },
      { tipo: "video", titulo: "Resumen del libro de Mateo (parte 2)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=EobkNEf-ySA", minutos: 8 },
      { tipo: "lectura", titulo: "Lectura ampliada: Salmos 78, contar a la generación venidera", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Salmos&cap=78" },
      { tipo: "lectura", titulo: "Declaración de fe del Ministerio Avivando el Fuego", fuente: "Academia Avivando el Fuego", url: "/academia/declaracion-de-fe" },
    ],
  },
  disponible: true,
};

const NINO_Y_SU_FE: MateriaDef = {
  id: "ninez-2",
  nivel: null,
  especialidad: "ninez",
  orden: 2,
  titulo: "El niño y su fe",
  resumen: "Cómo crece la fe de un niño y cómo acompañarla: las etapas de la fe, hablar de Dios a cada edad, guiar a un niño a Cristo sin presión, las preguntas difíciles, el niño que ora, adora y sirve, y los niños en situaciones difíciles.",
  base: "Lucas 2:40; Juan 1:12",
  memoria: "Juan 1:12",
  lecciones: lecciones("ninez-2", [
    ["Cómo crece la fe", "Lucas 2:40; 1 Corintios 13:11; 1 Pedro 2:2"],
    ["Hablar de Dios a cada edad", "Deuteronomio 6:20-21; Marcos 4:33; 1 Corintios 3:1-2"],
    ["Guiar a un niño a Cristo", "Juan 3:16; Romanos 3:23; Romanos 6:23; Juan 1:12; Romanos 10:9"],
    ["Las preguntas difíciles", "Deuteronomio 1:39; 2 Samuel 12:23; Hechos 8:12; Joel 2:28"],
    ["El niño que ora, adora y sirve", "Mateo 6:9-13; Salmos 8:2; Salmos 119:11; 1 Timoteo 4:12"],
    ["Niños en situaciones difíciles", "Salmos 68:5; Salmos 34:18; Mateo 18:10; 2 Samuel 9:7; Lucas 14:13"],
  ], 10),
  silabo: {
    proposito:
      "Que el que sirve con los niños acompañe el crecimiento de su fe según su edad: que conozca cómo crece la fe de un niño, que hable de Dios con palabras que cada edad entiende, que sepa guiar a un niño a Cristo con claridad y sin presión, que responda con la Biblia y con prudencia las preguntas difíciles, como la edad de la responsabilidad y el bautismo de los niños, según el artículo 8 de la declaración de fe del ministerio, que forme niños que oran, adoran y sirven, y que cuide con amor a los niños que viven situaciones difíciles. Si las lenguas son la señal inicial del bautismo en el Espíritu Santo es un punto de la declaración de fe por confirmar. Su base es la promesa del evangelio de Juan: «Mas a todos los que le recibieron, a los que creen en su nombre, les dio potestad de ser hechos hijos de Dios» (Juan 1:12).",
    objetivos: [
      { id: "o1", texto: "Describir cómo crece la fe de un niño en cada etapa.", bloom: "comprender" },
      { id: "o2", texto: "Explicar las verdades de la fe con palabras que cada edad entiende.", bloom: "aplicar" },
      { id: "o3", texto: "Guiar a un niño a Cristo con claridad y sin presión.", bloom: "aplicar" },
      { id: "o4", texto: "Responder con la Biblia y con prudencia las preguntas difíciles de los niños y de sus padres.", bloom: "analizar" },
      { id: "o5", texto: "Formar niños que oran, adoran y sirven.", bloom: "aplicar" },
      { id: "o6", texto: "Acompañar a los niños que viven situaciones difíciles.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar Juan 1:12 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "Cómo crece la fe de un niño, el evangelio explicado a su edad y las respuestas bíblicas a sus preguntas difíciles.",
      ser: "Un maestro paciente, que no presiona y que ama a cada niño en su situación.",
      hacer: "Guiar a un niño a Cristo, enseñarle a orar y a servir, y acompañar a los que sufren.",
    },
    bibliografia: {
      basica: [
        { autor: "Marty Machowski", titulo: "Cómo guiar a tu hijo a Cristo: pasos bíblicos para compartir el evangelio", editorial: "Editorial Bautista Independiente" },
        { autor: "Brian Dembowczyk", titulo: "Ministerio de niños centrado en el evangelio", editorial: "B&H Español" },
      ],
      complementaria: [
        { autor: "Steve Adams", titulo: "Ministerio con propósito para niños", editorial: "Vida" },
        { autor: "Grupo de Trabajo de Infancia de la Alianza Evangélica Española", titulo: "Protocolo de protección infantil", editorial: "Alianza Evangélica Española" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Juan (parte 1)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=OU16-2Sg_CQ", minutos: 10 },
      { tipo: "video", titulo: "El nacimiento de Jesús: Lucas 1 y 2", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=DTL5QW6Ez7s", minutos: 4 },
      { tipo: "lectura", titulo: "Lectura ampliada: Juan 1, los que le recibieron", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Juan&cap=1" },
      { tipo: "lectura", titulo: "Declaración de fe del Ministerio Avivando el Fuego", fuente: "Academia Avivando el Fuego", url: "/academia/declaracion-de-fe" },
    ],
  },
  disponible: true,
};

const METODOS_NINEZ: MateriaDef = {
  id: "ninez-3",
  nivel: null,
  especialidad: "ninez",
  orden: 3,
  titulo: "Métodos para enseñar a niños",
  resumen: "Cómo enseñar a los niños: las siete leyes de la enseñanza, contar historias bíblicas, preguntas, actividades y juegos, una clase paso a paso, la disciplina con amor y firmeza, y la vida y la semana del maestro.",
  base: "Nehemías 8:8; Esdras 7:10",
  memoria: "Nehemías 8:8",
  lecciones: lecciones("ninez-3", [
    ["Las siete leyes de la enseñanza", "Esdras 7:10; Nehemías 8:8; 2 Timoteo 2:2"],
    ["Contar historias bíblicas", "Marcos 4:33-34; Salmos 78:2-3; Lucas 19:1-10"],
    ["Preguntas, actividades y juegos", "Mateo 16:15-16; Lucas 10:36-37; Santiago 1:22"],
    ["Una clase paso a paso", "Proverbios 16:3; Colosenses 3:23"],
    ["La disciplina y el manejo de la clase", "Proverbios 15:1; Colosenses 3:21; Gálatas 5:22-23; 1 Corintios 13:4-5"],
    ["El maestro y su vida", "1 Corintios 11:1; Tito 2:7; Hebreos 13:17"],
  ], 10),
  silabo: {
    proposito:
      "Que el maestro de niños enseñe de manera que los niños entiendan y vivan la Palabra: que aplique las siete leyes de la enseñanza de John Milton Gregory, que cuente las historias de la Biblia con fidelidad y las lleve a Jesús, que use preguntas, actividades y juegos según la edad, que planifique una clase completa con su objetivo, que maneje la disciplina con amor y firmeza, sin humillar, y que cuide su propia vida y su semana de preparación. Cada lección trae un ejemplo resuelto paso a paso. Su base es la manera en que se enseñaba la ley en tiempos de Esdras: «Y leían en el libro de la ley de Dios claramente, y ponían el sentido, de modo que entendiesen la lectura» (Nehemías 8:8).",
    objetivos: [
      { id: "o1", texto: "Aplicar las siete leyes de la enseñanza a una clase de niños.", bloom: "aplicar" },
      { id: "o2", texto: "Preparar y contar una historia bíblica con fidelidad, llevándola a Jesús.", bloom: "aplicar" },
      { id: "o3", texto: "Usar preguntas, actividades y juegos adecuados a cada edad.", bloom: "aplicar" },
      { id: "o4", texto: "Planificar una clase completa con un objetivo de saber, sentir y hacer.", bloom: "crear" },
      { id: "o5", texto: "Manejar la disciplina de la clase con amor y firmeza, sin humillar.", bloom: "aplicar" },
      { id: "o6", texto: "Evaluar la vida y la semana de preparación del maestro.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar Nehemías 8:8 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "Las siete leyes de la enseñanza, el arte de contar historias, las preguntas y actividades por edad, y la planificación de una clase.",
      ser: "Un maestro que vive lo que enseña, corrige con mansedumbre y se prepara con oración.",
      hacer: "Contar historias, dirigir actividades y juegos, planificar clases y manejar la disciplina.",
    },
    bibliografia: {
      basica: [
        { autor: "John Milton Gregory", titulo: "Las siete leyes de la enseñanza", editorial: "Casa Bautista de Publicaciones" },
        { autor: "Howard G. Hendricks", titulo: "Enseñando para cambiar vidas", editorial: "Unilit" },
      ],
      complementaria: [
        { autor: "Henry y Adriana Pabón", titulo: "Tu ministerio de niños puede crecer", editorial: "e625" },
        { autor: "Steve Adams", titulo: "Ministerio con propósito para niños", editorial: "Vida" },
        { autor: "Brian Dembowczyk", titulo: "Ministerio de niños centrado en el evangelio", editorial: "B&H Español" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen de los libros de Esdras y Nehemías", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=OGdiLZ92nQs", minutos: 10 },
      { tipo: "video", titulo: "Evangelio de Lucas 19 a 23", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=KBE2nLYyCdc", minutos: 5 },
      { tipo: "lectura", titulo: "Lectura ampliada: Nehemías 8, leer y poner el sentido", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Nehemias&cap=8" },
    ],
  },
  disponible: true,
};

const PROTECCION_MENORES: MateriaDef = {
  id: "ninez-4",
  nivel: null,
  especialidad: "ninez",
  orden: 4,
  titulo: "Protección de menores",
  resumen: "Cómo la iglesia protege a los niños: por qué proteger, las formas y las señales del abuso, la política de protección y la selección de los voluntarios, las reglas de cada domingo, qué hacer cuando un niño cuenta algo, con lo que pide la ley en Texas, y el cuidado de las víctimas y de sus familias.",
  base: "Mateo 18:6; Salmos 82:3-4",
  memoria: "Salmos 82:3",
  lecciones: lecciones("ninez-4", [
    ["Por qué la iglesia protege a los niños", "Génesis 1:27; Mateo 18:6; Mateo 18:14; Salmos 82:3-4"],
    ["Conocer el abuso y sus señales", "Proverbios 22:3; Juan 3:20-21; Efesios 5:11"],
    ["La política de protección y la selección de voluntarios", "1 Timoteo 5:22; 1 Timoteo 3:7; Proverbios 14:15"],
    ["Las reglas de cada domingo", "Nehemías 4:9; 2 Corintios 8:21; 1 Tesalonicenses 5:22"],
    ["Cuando un niño cuenta algo: escuchar y reportar", "Proverbios 31:8-9; Romanos 13:3-4; Lucas 8:17"],
    ["Cuidar a las víctimas, a las familias y a la iglesia", "2 Samuel 13:20-21; Salmos 147:3; 2 Corintios 1:3-4; Isaías 1:17"],
  ], 10),
  silabo: {
    proposito:
      "Que todo el que sirve con niños, y quienes dirigen ese ministerio, protejan a los niños como pide la Palabra: que entiendan por qué la iglesia protege a los pequeños, que conozcan las formas y las señales del abuso y el proceso con que un abusador se gana la confianza, que armen una política de protección escrita y seleccionen con cuidado a los voluntarios, que apliquen cada domingo la regla de los dos adultos y el registro de entrada y salida, que sepan escuchar a un niño que cuenta un abuso y reportarlo, con lo que pide la ley en Texas (Código de Familia, sección 261.101), y que acompañen a las víctimas y a sus familias. La lección legal es una guía general, no un consejo legal: en otros estados y países la ley cambia. Su base es el mandato de Dios a su pueblo: «Defended al débil y al huérfano; Haced justicia al afligido y al menesteroso» (Salmos 82:3).",
    objetivos: [
      { id: "o1", texto: "Explicar por qué la iglesia protege a los niños, y distinguir los mitos de la realidad del abuso.", bloom: "comprender" },
      { id: "o2", texto: "Reconocer las formas y las señales del abuso, y el proceso de manipulación de un abusador.", bloom: "analizar" },
      { id: "o3", texto: "Armar una política de protección escrita y seleccionar a los voluntarios paso a paso.", bloom: "aplicar" },
      { id: "o4", texto: "Aplicar las reglas de cada domingo: los dos adultos, el registro de entrada y salida, el contacto y la comunicación.", bloom: "aplicar" },
      { id: "o5", texto: "Responder a un niño que cuenta un abuso y reportarlo como pide la ley en Texas.", bloom: "aplicar" },
      { id: "o6", texto: "Evaluar cómo acompañar a las víctimas y a sus familias, y qué hace el liderazgo después de un reporte.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar Salmos 82:3 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "Las formas y las señales del abuso, el proceso de manipulación, las partes de una política de protección y lo que pide la ley en Texas.",
      ser: "Un servidor que ama a los niños, no calla el mal y defiende al débil.",
      hacer: "Seleccionar voluntarios, aplicar las reglas de cada domingo, escuchar y reportar, y acompañar a las víctimas.",
    },
    bibliografia: {
      basica: [
        { autor: "Grupo de Trabajo de Infancia de la Alianza Evangélica Española", titulo: "Protocolo de protección infantil", editorial: "Alianza Evangélica Española" },
        { autor: "Brad Hambrick (ed.)", titulo: "Cómo convertirse en una iglesia que cuida bien de los abusados", editorial: "ERLC y Lifeway" },
      ],
      complementaria: [
        { autor: "Keeping Children Safe", titulo: "Los Estándares Internacionales de Protección Infantil Organizacional", editorial: "Keeping Children Safe" },
        { autor: "Federación de Entidades Religiosas Evangélicas de España (FEREDE)", titulo: "Iglesias evangélicas: espacios seguros libres de violencia para la mujer y la infancia", editorial: "FEREDE" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Imagen de Dios", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=VsGlbwF4HtI", minutos: 6 },
      { tipo: "video", titulo: "Resumen del libro de 2 Samuel", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=BEvicPpjQBE", minutos: 6 },
      { tipo: "guia", titulo: "Línea directa de Texas para reportar abuso: 1-800-252-5400", fuente: "Departamento de Servicios para la Familia y de Protección de Texas", url: "https://www.txabusehotline.org" },
      { tipo: "lectura", titulo: "Lectura ampliada: Mateo 18, estos pequeños", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Mateo&cap=18" },
    ],
  },
  disponible: true,
};

const ORGANIZAR_NINEZ: MateriaDef = {
  id: "ninez-5",
  nivel: null,
  especialidad: "ninez",
  orden: 5,
  titulo: "Organizar el ministerio infantil",
  resumen: "Cómo organizar el ministerio de niños de una iglesia: la misión, la visión y los valores, el equipo de voluntarios, los grupos por edad, las salas y el horario, el currículo y el calendario del año, el alcance a las familias del barrio, y el presupuesto y la evaluación.",
  base: "Habacuc 2:2; 1 Corintios 14:40",
  memoria: "Habacuc 2:2",
  lecciones: lecciones("ninez-5", [
    ["La visión y el propósito del ministerio", "Habacuc 2:2; Proverbios 29:18; Deuteronomio 31:12-13"],
    ["Formar y cuidar el equipo", "Éxodo 18:17-18; Éxodo 18:21; Efesios 4:11-12; 1 Pedro 4:10; Mateo 9:37-38"],
    ["Grupos por edad, salas y horario", "1 Corintios 14:33; 1 Corintios 14:40; Proverbios 24:3-4"],
    ["El currículo y el calendario del año", "2 Timoteo 3:16-17; Josué 4:6-7; Lucas 2:41-42"],
    ["Alcanzar a las familias y a la comunidad", "Mateo 9:36; Lucas 14:23; Hechos 16:31-32"],
    ["Evaluar, presupuestar y crecer", "Lucas 14:28-30; 1 Corintios 4:2; Lamentaciones 3:40; Proverbios 15:22"],
  ], 10),
  silabo: {
    proposito:
      "Que el que dirige el ministerio de niños, o se prepara para hacerlo, lo organice con orden y con propósito: que escriba con el pastor la misión, la visión y los valores del ministerio, que forme y cuide un equipo de voluntarios, que organice los grupos por edad, las salas y el horario según el tamaño de la iglesia, que elija un currículo y arme el calendario del año, que abra puertas a las familias del barrio con la Escuela Bíblica de Vacaciones y les dé seguimiento, y que arme el presupuesto y evalúe el ministerio con números y con fruto. Lleva a la práctica las otras cuatro materias de la especialidad. Su base es la palabra de Dios al profeta: «Escribe la visión, y declárala en tablas, para que corra el que leyere en ella» (Habacuc 2:2).",
    objetivos: [
      { id: "o1", texto: "Escribir la misión, la visión y los valores del ministerio de niños.", bloom: "crear" },
      { id: "o2", texto: "Formar, sumar y cuidar un equipo de voluntarios.", bloom: "aplicar" },
      { id: "o3", texto: "Organizar los grupos por edad, las salas y el horario según el tamaño de la iglesia.", bloom: "aplicar" },
      { id: "o4", texto: "Elegir un currículo y armar el calendario del año.", bloom: "aplicar" },
      { id: "o5", texto: "Planear una Escuela Bíblica de Vacaciones y el seguimiento de las familias nuevas.", bloom: "aplicar" },
      { id: "o6", texto: "Evaluar el ministerio con números y con fruto, y poner metas concretas.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar Habacuc 2:2 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "La misión y la visión de un ministerio, sus servicios, la organización por edades, el currículo, el calendario y el presupuesto.",
      ser: "Un líder que no hace todo solo, cuida a su equipo y rinde cuentas con fidelidad.",
      hacer: "Escribir la misión, sumar voluntarios, organizar grupos y salas, planear el año y evaluar con metas.",
    },
    bibliografia: {
      basica: [
        { autor: "Henry y Adriana Pabón", titulo: "Tu ministerio de niños puede crecer", editorial: "e625" },
        { autor: "Steve Adams", titulo: "Ministerio con propósito para niños", editorial: "Vida" },
      ],
      complementaria: [
        { autor: "Brian Dembowczyk", titulo: "Ministerio de niños centrado en el evangelio", editorial: "B&H Español" },
        { autor: "Keeping Children Safe", titulo: "Los Estándares Internacionales de Protección Infantil Organizacional", editorial: "Keeping Children Safe" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Éxodo (parte 1)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=y9pED55wMM4", minutos: 7 },
      { tipo: "video", titulo: "La historia de la Biblia", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=7Z_Bz34ohMA", minutos: 6 },
      { tipo: "lectura", titulo: "Lectura ampliada: Éxodo 18, el consejo de Jetro", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Exodo&cap=18" },
    ],
  },
  disponible: true,
};

const DISCIPULADO_JOVENES: MateriaDef = {
  id: "juventud-1",
  nivel: null,
  especialidad: "juventud",
  orden: 1,
  titulo: "Discipulado de jóvenes",
  resumen: "Cómo formar discípulos entre los jóvenes: por qué discipularlos, cómo formó Jesús a los suyos con los ocho principios de Coleman, Pablo y Timoteo, los grupos pequeños y la mentoría, las disciplinas del joven discípulo y el camino que lleva a hacer otros discípulos.",
  base: "1 Timoteo 4:12; Marcos 3:14",
  memoria: "1 Timoteo 4:12",
  lecciones: lecciones("juventud-1", [
    ["Por qué discipular a los jóvenes", "Eclesiastés 12:1; Lamentaciones 3:27; 1 Timoteo 4:12; Jeremías 1:6-8"],
    ["Jesús, el que formó discípulos", "Lucas 6:12-13; Marcos 3:13-14; Mateo 4:19; Juan 15:15"],
    ["Pablo y Timoteo", "Hechos 16:1-3; 2 Timoteo 3:10; 1 Corintios 4:17; Filipenses 2:20-22"],
    ["Grupos pequeños y mentores", "Proverbios 27:17; Eclesiastés 4:9-10; Hebreos 10:24-25"],
    ["Las disciplinas del joven discípulo", "Salmos 119:9-11; 1 Timoteo 4:7-8; Marcos 1:35; Daniel 1:8"],
    ["Del discípulo al que hace discípulos", "Mateo 28:19-20; 2 Timoteo 2:2; Colosenses 1:28"],
  ], 10),
  silabo: {
    proposito:
      "Que el que sirve con los jóvenes, o se prepara para hacerlo, forme discípulos y no solo entretenga: que entienda por qué la juventud es un tiempo decisivo, que aprenda de cómo eligió y formó Jesús a sus discípulos, con los ocho principios que resumió Robert E. Coleman, que acompañe a los jóvenes como Pablo acompañó a Timoteo, que organice grupos pequeños y mentorías con los cuidados que pide la protección de los menores, que ayude a cada joven a crecer con las disciplinas de la fe y que arme un camino de discipulado en el que los jóvenes lleguen a hacer otros discípulos. Su base es la palabra de Pablo a un líder joven: «Ninguno tenga en poco tu juventud, sino sé ejemplo de los creyentes en palabra, conducta, amor, espíritu, fe y pureza» (1 Timoteo 4:12).",
    objetivos: [
      { id: "o1", texto: "Explicar por qué la juventud es un tiempo decisivo y en qué se distingue un ministerio que forma discípulos.", bloom: "comprender" },
      { id: "o2", texto: "Aplicar los ocho principios con que Jesús formó a sus discípulos.", bloom: "aplicar" },
      { id: "o3", texto: "Planear una mentoría siguiendo el ejemplo de Pablo y Timoteo.", bloom: "aplicar" },
      { id: "o4", texto: "Organizar un grupo pequeño de discipulado para jóvenes.", bloom: "aplicar" },
      { id: "o5", texto: "Preparar con un joven un plan sencillo de disciplinas espirituales.", bloom: "aplicar" },
      { id: "o6", texto: "Diseñar un camino de discipulado que lleve a los jóvenes a hacer otros discípulos.", bloom: "crear" },
      { id: "o7", texto: "Recitar 1 Timoteo 4:12 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "El discipulado en la Biblia, el método de Jesús, la mentoría, los grupos pequeños y las disciplinas espirituales.",
      ser: "Un líder que acompaña de cerca, vive lo que enseña y forma a otros.",
      hacer: "Elegir y acompañar a pocos, dirigir un grupo pequeño, armar planes de vida espiritual y un camino de discipulado.",
    },
    bibliografia: {
      basica: [
        { autor: "Robert E. Coleman", titulo: "Plan supremo de evangelización", editorial: "Casa Bautista de Publicaciones" },
        { autor: "Doug Fields", titulo: "Ministerio de jóvenes con propósito", editorial: "Vida" },
      ],
      complementaria: [
        { autor: "Lucas Leys", titulo: "El ministerio juvenil efectivo", editorial: "Vida" },
        { autor: "Josh McDowell y Bob Hostetler", titulo: "Convicciones más que creencias", editorial: "Mundo Hispano" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Marcos", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=gsXLQkppzUc", minutos: 11 },
      { tipo: "video", titulo: "Resumen del libro de 2 Timoteo", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=lvNqjbjTytE", minutos: 9 },
      { tipo: "lectura", titulo: "Lectura ampliada: 2 Timoteo 2, enseñar también a otros", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=2%20Timoteo&cap=2" },
    ],
  },
  disponible: true,
};

const COSMOVISION_CULTURA: MateriaDef = {
  id: "juventud-2",
  nivel: null,
  especialidad: "juventud",
  orden: 2,
  titulo: "Cosmovisión cristiana y cultura",
  resumen: "Cómo ayudar a los jóvenes a pensar con la Biblia en medio de su cultura: qué es una cosmovisión y la historia bíblica en cuatro actos, las cosmovisiones de hoy, la identidad en Cristo, las redes sociales y la tecnología, el discernimiento del arte y del entretenimiento, y cómo responder con verdad y amor.",
  base: "Colosenses 2:8; Romanos 12:2",
  memoria: "Colosenses 2:8",
  lecciones: lecciones("juventud-2", [
    ["Qué es una cosmovisión", "Romanos 12:2; Génesis 3:6; Romanos 8:21; 2 Corintios 10:5"],
    ["Las cosmovisiones de hoy", "Colosenses 2:8; Jueces 21:25; 1 Juan 2:15-17; Hechos 17:22-23"],
    ["La identidad en Cristo", "Salmos 139:13-14; 2 Corintios 5:17; Efesios 2:10; 1 Corintios 6:19-20"],
    ["Las redes sociales y la tecnología", "Efesios 5:15-16; 1 Corintios 6:12; Salmos 101:3"],
    ["El arte, la música y el entretenimiento", "1 Tesalonicenses 5:21; Filipenses 4:8; Colosenses 3:17"],
    ["Responder con verdad y amor", "1 Pedro 3:15-16; Efesios 4:15; Colosenses 4:6; Hechos 17:26-28"],
  ], 10),
  silabo: {
    proposito:
      "Que el que acompaña a los jóvenes los ayude a vivir su fe con inteligencia en medio de su cultura: que les enseñe qué es una cosmovisión y a mirar cada idea con la historia de la Biblia en cuatro actos, creación, caída, redención y consumación, que reconozca con ellos lo que tienen de verdad y lo que les falta a las cosmovisiones de hoy, que afirme su identidad en Cristo frente a la comparación y las redes, con el diseño de Dios para la sexualidad según el artículo 14 de la declaración de fe, enseñado con verdad y con amor, que los guíe en un uso sabio de la tecnología, que les enseñe a discernir el arte y el entretenimiento y que los prepare para responder con mansedumbre y con razones. Su base es la advertencia de Pablo: «Mirad que nadie os engañe por medio de filosofías y huecas sutilezas, según las tradiciones de los hombres, conforme a los rudimentos del mundo, y no según Cristo» (Colosenses 2:8).",
    objetivos: [
      { id: "o1", texto: "Explicar qué es una cosmovisión y la historia de la Biblia en cuatro actos.", bloom: "comprender" },
      { id: "o2", texto: "Analizar las cosmovisiones de hoy: lo que tienen de verdad y lo que les falta.", bloom: "analizar" },
      { id: "o3", texto: "Acompañar a los jóvenes a afirmar su identidad en Cristo.", bloom: "aplicar" },
      { id: "o4", texto: "Preparar con una familia un acuerdo para el uso sabio de la tecnología.", bloom: "aplicar" },
      { id: "o5", texto: "Discernir el arte y el entretenimiento con preguntas bíblicas.", bloom: "evaluar" },
      { id: "o6", texto: "Responder a las objeciones a la fe con verdad y amor.", bloom: "aplicar" },
      { id: "o7", texto: "Recitar Colosenses 2:8 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "La cosmovisión cristiana, las ideas de la cultura de hoy, la identidad en Cristo y los criterios para discernir.",
      ser: "Un joven y un líder que piensan con la Biblia, sin miedo y sin burla, con verdad y con amor.",
      hacer: "Mirar las ideas con los cuatro actos, armar acuerdos de tecnología, analizar canciones y series, y responder con mansedumbre.",
    },
    bibliografia: {
      basica: [
        { autor: "Albert M. Wolters con Michael W. Goheen", titulo: "La creación recuperada: bases bíblicas para una cosmovisión reformacional", editorial: "Poiema Publicaciones" },
        { autor: "Rebecca McLaughlin", titulo: "10 preguntas que todo joven debe plantearse", editorial: "Andamio" },
      ],
      complementaria: [
        { autor: "Josh McDowell y Bob Hostetler", titulo: "Convicciones más que creencias", editorial: "Mundo Hispano" },
        { autor: "C. S. Lewis", titulo: "Mero cristianismo", editorial: "Rialp" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "La historia de la Biblia", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=7Z_Bz34ohMA", minutos: 6 },
      { tipo: "video", titulo: "Resumen del libro de 1 Pedro", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=NXRkCxeO-C4", minutos: 10 },
      { tipo: "lectura", titulo: "Lectura ampliada: Hechos 17, Pablo en Atenas", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Hechos&cap=17" },
      { tipo: "lectura", titulo: "Declaración de fe del Ministerio Avivando el Fuego", fuente: "Academia Avivando el Fuego", url: "/academia/declaracion-de-fe" },
    ],
  },
  disponible: true,
};

const CONSEJERIA_JUVENIL: MateriaDef = {
  id: "juventud-3",
  nivel: null,
  especialidad: "juventud",
  avanzada: true,
  orden: 3,
  titulo: "Consejería juvenil",
  resumen: "Cómo acompañar a los jóvenes en sus luchas: el consejero de jóvenes y la adolescencia, escuchar y acompañar paso a paso, la ansiedad, la tristeza y el riesgo de suicidio, los conflictos con la familia, la sexualidad, el noviazgo y las adicciones, y los límites, el deber de reportar en Texas y la derivación.",
  base: "Proverbios 20:5; Santiago 1:19",
  memoria: "Proverbios 20:5",
  lecciones: lecciones("juventud-3", [
    ["El consejero de jóvenes", "Proverbios 20:5; Gálatas 6:1-2; Romanos 15:14"],
    ["Escuchar y acompañar paso a paso", "Santiago 1:19; Proverbios 18:13; Lucas 24:15-17"],
    ["La ansiedad, la tristeza y el riesgo de suicidio", "Salmos 42:5; 1 Reyes 19:4-8; Filipenses 4:6-7; 1 Pedro 5:7"],
    ["Los jóvenes y sus familias", "Efesios 6:1-4; Lucas 15:20; Malaquías 4:6"],
    ["La sexualidad, el noviazgo y las adicciones", "1 Tesalonicenses 4:3-5; 2 Timoteo 2:22; 1 Corintios 10:13; Proverbios 23:29-32"],
    ["Los límites, la ley y la derivación", "Proverbios 11:13; Proverbios 11:14; Proverbios 12:15"],
  ], 10),
  silabo: {
    proposito:
      "Que el líder que acompaña a los jóvenes sepa aconsejarlos con la Palabra y con prudencia: que entienda la adolescencia y el lugar del consejero junto a los profesionales, que escuche y dirija una conversación paso a paso, que reconozca las señales de la ansiedad, de la tristeza profunda y del riesgo de suicidio y actúe a tiempo con la línea 988, que acompañe los conflictos entre los jóvenes y sus padres sin tomar partido, que hable con claridad y con gracia de la sexualidad, del noviazgo y de las adicciones, y que conozca los límites de la confidencialidad, el deber de reportar el abuso de un menor en Texas (Código de Familia, sección 261.101) y cuándo derivar. No reemplaza la atención médica ni la psicológica, y lo legal es una guía general, no un consejo legal. Lleva a la práctica Cuidado y consejería básica (Nivel 3), sin repetirla. Su base es la palabra del sabio: «Como aguas profundas es el consejo en el corazón del hombre; Mas el hombre entendido lo alcanzará» (Proverbios 20:5).",
    objetivos: [
      { id: "o1", texto: "Explicar el lugar del consejero de jóvenes, los cambios de la adolescencia y cuándo derivar.", bloom: "comprender" },
      { id: "o2", texto: "Dirigir una conversación de consejería con un joven, escuchando y preguntando.", bloom: "aplicar" },
      { id: "o3", texto: "Responder a un joven con ansiedad, tristeza profunda o riesgo de suicidio, buscando ayuda a tiempo.", bloom: "aplicar" },
      { id: "o4", texto: "Acompañar los conflictos entre un joven y sus padres, y actuar cuando la casa no es segura.", bloom: "aplicar" },
      { id: "o5", texto: "Aconsejar sobre la sexualidad, el noviazgo y las adicciones con verdad y con gracia.", bloom: "aplicar" },
      { id: "o6", texto: "Evaluar los límites de la confidencialidad, el deber de reportar y la derivación.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar Proverbios 20:5 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "La adolescencia, la consejería pastoral, las señales de riesgo, los recursos de ayuda y lo que pide la ley en Texas.",
      ser: "Un consejero que escucha, guarda la confianza con sus límites y sabe pedir ayuda.",
      hacer: "Conversar paso a paso, actuar ante el riesgo de suicidio, acompañar a las familias, reportar y derivar.",
    },
    bibliografia: {
      basica: [
        { autor: "Josh McDowell y Bob Hostetler", titulo: "Manual para consejeros de jóvenes", editorial: "Mundo Hispano" },
        { autor: "Tim Clinton y Chap Clark", titulo: "Consejería bíblica, tomo 3: manual de consulta sobre adolescentes", editorial: "Portavoz" },
      ],
      complementaria: [
        { autor: "Gary R. Collins", titulo: "Consejería cristiana efectiva", editorial: "Portavoz" },
        { autor: "Pablo Hoff", titulo: "El pastor como consejero", editorial: "Vida" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Salmos", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=8yieTfiw_Ew", minutos: 10 },
      { tipo: "video", titulo: "Resumen del libro de Proverbios", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=pNjt_NfIam8", minutos: 9 },
      { tipo: "guia", titulo: "Línea 988 de prevención del suicidio y crisis, con atención en español", fuente: "988 Suicide & Crisis Lifeline", url: "https://988lifeline.org/es/" },
      { tipo: "guia", titulo: "Línea nacional de ayuda de SAMHSA: 1-800-662-4357", fuente: "SAMHSA", url: "https://www.samhsa.gov/find-help/helplines/national-helpline" },
    ],
  },
  disponible: true,
};

const LIDERAZGO_JUVENIL: MateriaDef = {
  id: "juventud-4",
  nivel: null,
  especialidad: "juventud",
  orden: 4,
  titulo: "Liderazgo juvenil",
  resumen: "Cómo formar y ejercer el liderazgo en el ministerio juvenil: los jóvenes que Dios usó para guiar, liderar sirviendo, el carácter del líder joven, el equipo de liderazgo, la reunión de jóvenes y la charla, y la seguridad, la evaluación y la sucesión.",
  base: "Josué 1:9; Marcos 10:43-45",
  memoria: "Josué 1:9",
  lecciones: lecciones("juventud-4", [
    ["Jóvenes que Dios usó para guiar", "1 Samuel 17:33; 1 Samuel 17:45; Daniel 1:17; Ester 4:14"],
    ["Liderar sirviendo", "Marcos 10:43-45; Juan 13:14-15; Filipenses 2:3-4"],
    ["El carácter del líder joven", "1 Samuel 16:7; Proverbios 4:23; Tito 2:6-7; Proverbios 16:18; 1 Corintios 9:24-27"],
    ["El equipo de liderazgo juvenil", "Nehemías 2:17-18; 1 Pedro 5:5; Hechos 15:37-39; 2 Timoteo 4:11"],
    ["Planear y dirigir la reunión de jóvenes", "1 Corintios 14:26; Colosenses 3:16"],
    ["Proteger, evaluar y pasar la posta", "Deuteronomio 31:7-8; Josué 1:9"],
  ], 10),
  silabo: {
    proposito:
      "Que el que dirige el ministerio juvenil, y los jóvenes que empiezan a liderar, ejerzan el liderazgo como Jesús lo enseñó: que vean cómo Dios usó a jóvenes como David, Daniel y Ester, que lideren sirviendo, que cuiden el carácter antes que el talento, que formen un equipo de adultos y jóvenes con una visión compartida y segundas oportunidades, que planeen la reunión de jóvenes y preparen una charla, y que protejan a los menores en las salidas y los campamentos, evalúen el ministerio y preparen a los que vendrán después. Lleva al ministerio juvenil lo que enseñan Liderazgo cristiano I y Liderazgo II, sin repetirlas. Quién puede ejercer cada cargo en la iglesia es un punto de la declaración de fe por confirmar, y lo deciden sus pastores. Su base es la palabra de Dios a Josué: «Mira que te mando que te esfuerces y seas valiente; no temas ni desmayes, porque Jehová tu Dios estará contigo en dondequiera que vayas» (Josué 1:9).",
    objetivos: [
      { id: "o1", texto: "Describir cómo usó Dios a jóvenes para guiar, y reconocer a los jóvenes con potencial.", bloom: "comprender" },
      { id: "o2", texto: "Aplicar el liderazgo de servicio que enseñó Jesús.", bloom: "aplicar" },
      { id: "o3", texto: "Evaluar el carácter del líder joven por encima de su talento.", bloom: "evaluar" },
      { id: "o4", texto: "Organizar un equipo de liderazgo juvenil y manejar sus desacuerdos.", bloom: "aplicar" },
      { id: "o5", texto: "Planear una reunión de jóvenes y preparar una charla corta.", bloom: "crear" },
      { id: "o6", texto: "Organizar con seguridad las salidas y los campamentos, evaluar el ministerio y preparar la sucesión.", bloom: "aplicar" },
      { id: "o7", texto: "Recitar Josué 1:9 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "El liderazgo bíblico, el carácter del líder, el trabajo en equipo, la reunión de jóvenes y la seguridad de las salidas.",
      ser: "Un líder que sirve, cuida su corazón, da segundas oportunidades y prepara a otros.",
      hacer: "Reconocer y formar líderes, planear reuniones y charlas, organizar campamentos seguros y pasar la posta.",
    },
    bibliografia: {
      basica: [
        { autor: "Lucas Leys", titulo: "Lo que todo pastor debe saber de su líder de jóvenes", editorial: "Vida" },
        { autor: "Doug Fields", titulo: "Ministerio de jóvenes con propósito", editorial: "Vida" },
      ],
      complementaria: [
        { autor: "J. Oswald Sanders", titulo: "Liderazgo espiritual", editorial: "Portavoz" },
        { autor: "John C. Maxwell", titulo: "Las 21 leyes irrefutables del liderazgo", editorial: "Grupo Nelson" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de 1 Samuel", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=34biq4ivs5I", minutos: 8 },
      { tipo: "video", titulo: "Resumen del libro de Josué", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=49ggVrdBN_Y", minutos: 10 },
      { tipo: "lectura", titulo: "Lectura ampliada: Juan 13, el lavamiento de los pies", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Juan&cap=13" },
      { tipo: "lectura", titulo: "Declaración de fe del Ministerio Avivando el Fuego", fuente: "Academia Avivando el Fuego", url: "/academia/declaracion-de-fe" },
    ],
  },
  disponible: true,
};

const EVANGELISMO_JOVENES: MateriaDef = {
  id: "juventud-5",
  nivel: null,
  especialidad: "juventud",
  orden: 5,
  titulo: "Evangelismo entre jóvenes",
  resumen: "Cómo alcanzar a los jóvenes con el evangelio: por qué los amigos llevan a los amigos a Jesús, el evangelio claro y el testimonio, la amistad y las conversaciones sobre la fe, la luz en la escuela y en las redes, los eventos y el seguimiento, y la perseverancia ante las dudas y el rechazo.",
  base: "1 Corintios 9:22; Romanos 10:14",
  memoria: "1 Corintios 9:22",
  lecciones: lecciones("juventud-5", [
    ["Por qué alcanzar a los jóvenes", "Romanos 10:14; Juan 1:40-42; 1 Corintios 9:22"],
    ["El evangelio claro y el testimonio", "1 Corintios 15:3-4; Romanos 6:23; Efesios 2:8-9"],
    ["Amistad y conversaciones sobre la fe", "Lucas 5:29-32; Proverbios 18:24; Colosenses 4:5"],
    ["Luz en la escuela y en las redes", "Mateo 5:14-15; Filipenses 2:15; Daniel 6:10"],
    ["Eventos, campamentos y seguimiento", "Hechos 2:41-42; Colosenses 2:6-7"],
    ["Las dudas, el rechazo y la perseverancia", "Judas 1:22; Juan 20:27-28; Juan 16:8; 1 Corintios 3:6; Gálatas 6:9"],
  ], 10),
  silabo: {
    proposito:
      "Que el ministerio juvenil alcance con el evangelio a los jóvenes que no conocen a Cristo: que los jóvenes creyentes vean a sus amigos como su campo misionero, que sepan explicar el evangelio con claridad y contar su testimonio, que compartan la fe en la amistad y en conversaciones sencillas, sin manipular, que sean luz en la escuela y en las redes, conociendo lo que permite la Ley de Igualdad de Acceso de 1984 en las escuelas públicas de los Estados Unidos, que preparen eventos evangelísticos que inviten sin presión y den seguimiento, y que perseveren ante las dudas y el rechazo. Lleva al mundo de los jóvenes lo que enseñan Compartir mi fe (Nivel 1) y Evangelismo personal (Nivel 2), sin repetirlas. Su base es la manera de Pablo: «a todos me he hecho de todo, para que de todos modos salve a algunos» (1 Corintios 9:22).",
    objetivos: [
      { id: "o1", texto: "Explicar por qué los jóvenes creyentes son misioneros entre sus amigos.", bloom: "comprender" },
      { id: "o2", texto: "Explicar el evangelio en cuatro partes y contar un testimonio de dos minutos.", bloom: "aplicar" },
      { id: "o3", texto: "Llevar una conversación cotidiana hacia la fe, sin presionar ni manipular.", bloom: "aplicar" },
      { id: "o4", texto: "Guiar a los jóvenes a ser luz en la escuela y en las redes, con lo que permite la ley.", bloom: "aplicar" },
      { id: "o5", texto: "Planear un evento evangelístico con una invitación clara y un seguimiento.", bloom: "crear" },
      { id: "o6", texto: "Evaluar cómo perseverar ante las dudas y el rechazo.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar 1 Corintios 9:22 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "El evangelio, el testimonio, la amistad que evangeliza, los derechos de los estudiantes y el seguimiento de los nuevos creyentes.",
      ser: "Un joven que ama a sus amigos, vive su fe sin esconderla y persevera sin presionar.",
      hacer: "Orar por nombres, explicar el evangelio, iniciar conversaciones, formar clubes, planear eventos y dar seguimiento.",
    },
    bibliografia: {
      basica: [
        { autor: "Robert E. Coleman", titulo: "Plan supremo de evangelización", editorial: "Casa Bautista de Publicaciones" },
        { autor: "Rebecca Manley Pippert", titulo: "Sal: en un mundo cambiante, el evangelio sigue siendo relevante", editorial: "Andamio" },
      ],
      complementaria: [
        { autor: "Rebecca McLaughlin", titulo: "10 preguntas que todo joven debe plantearse", editorial: "Andamio" },
        { autor: "Lucas Leys", titulo: "El ministerio juvenil efectivo", editorial: "Vida" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Juan (parte 1)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=OU16-2Sg_CQ", minutos: 10 },
      { tipo: "video", titulo: "¿Qué significa la palabra evangelio?", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=AxGypH5Dy3I", minutos: 5 },
      { tipo: "lectura", titulo: "Lectura ampliada: Juan 1, los primeros que siguieron a Jesús", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Juan&cap=1" },
    ],
  },
  disponible: true,
};

const CONSEJERIA_MATRIMONIAL: MateriaDef = {
  id: "familia-consejeria-1",
  nivel: null,
  especialidad: "familia-consejeria",
  avanzada: true,
  orden: 1,
  titulo: "Consejería matrimonial",
  resumen: "Cómo acompañar a los matrimonios con la Palabra: el diseño de Dios y el lugar del consejero, la consejería prematrimonial, la comunicación y los conflictos, la infidelidad, el perdón y la restauración, la violencia en el hogar y el cuidado de los matrimonios en cada etapa.",
  base: "Mateo 19:4-6; Efesios 5:25",
  memoria: "Mateo 19:6",
  lecciones: lecciones("familia-consejeria-1", [
    ["El matrimonio según Dios y el consejero", "Génesis 2:18; Mateo 19:4-6; Efesios 5:25; Efesios 5:33"],
    ["La consejería prematrimonial", "Amós 3:3; 2 Corintios 6:14; Hebreos 13:4"],
    ["La comunicación y los conflictos", "Efesios 4:26; Efesios 4:29; Efesios 4:31-32"],
    ["La infidelidad, el perdón y la restauración", "Oseas 3:1; Colosenses 3:13; Mateo 19:9; 1 Corintios 7:15"],
    ["La violencia en el hogar", "Colosenses 3:19; 1 Pedro 3:7; Salmos 11:5"],
    ["Acompañar a los matrimonios en cada etapa", "Eclesiastés 4:12; Cantares 8:7; Tito 2:3-5"],
  ], 10),
  silabo: {
    proposito:
      "Que el que aconseja en la iglesia sepa acompañar a los matrimonios con la Palabra y con prudencia: que conozca el diseño de Dios para el matrimonio, un pacto de amor y fidelidad entre un hombre y una mujer para toda la vida, según la declaración de fe del ministerio (artículo 14), y el lugar del consejero, que escucha a los dos sin tomar partido y deriva cuando hace falta; que prepare a los novios con una consejería prematrimonial; que ayude a los esposos a comunicarse y a resolver sus conflictos sin herirse; que acompañe con verdad y esperanza a los matrimonios heridos por la infidelidad, y presente con respeto lo que enseña la Biblia sobre el divorcio, dejando cada caso a los pastores; que ante la violencia en el hogar ponga primero la seguridad de la víctima, con el 911, la Línea Nacional sobre la Violencia Doméstica (1-800-799-7233) y el deber de reportar el maltrato de un menor en Texas (Código de Familia, sección 261.101), sin proponer consejería de pareja mientras haya violencia; y que cuide a los matrimonios en cada etapa con matrimonios mentores. No reemplaza la terapia ni la atención profesional, y lo legal es una guía general, no un consejo legal. Lleva a la consejería lo que enseñan Familia y relaciones (Nivel 2) y Cuidado y consejería básica (Nivel 3), sin repetirlas. Su base es la palabra de Jesús: «Así que no son ya más dos, sino una sola carne; por tanto, lo que Dios juntó, no lo separe el hombre» (Mateo 19:6).",
    objetivos: [
      { id: "o1", texto: "Explicar el diseño de Dios para el matrimonio, el lugar del consejero de la iglesia y cuándo derivar.", bloom: "comprender" },
      { id: "o2", texto: "Preparar a una pareja para el matrimonio con una consejería prematrimonial.", bloom: "aplicar" },
      { id: "o3", texto: "Ayudar a un matrimonio a comunicarse y a resolver sus conflictos sin herirse.", bloom: "aplicar" },
      { id: "o4", texto: "Acompañar a un matrimonio herido por la infidelidad en un camino de perdón y restauración.", bloom: "aplicar" },
      { id: "o5", texto: "Responder a la violencia en el hogar poniendo primero la seguridad de la víctima.", bloom: "aplicar" },
      { id: "o6", texto: "Evaluar y organizar el cuidado de los matrimonios en cada etapa, con matrimonios mentores.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar Mateo 19:6 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "El diseño bíblico del matrimonio, los temas de la consejería prematrimonial, la comunicación y el conflicto, la restauración después de la infidelidad, las señales de la violencia en el hogar y los recursos de ayuda.",
      ser: "Un consejero que escucha a los dos, no toma partido, guarda la confianza con sus límites y pone primero la seguridad.",
      hacer: "Preparar a los novios, acompañar los conflictos y la restauración, responder a la violencia con un plan de seguridad y organizar matrimonios mentores.",
    },
    bibliografia: {
      basica: [
        { autor: "Timothy Keller y Kathy Keller", titulo: "El significado del matrimonio: cómo enfrentar las dificultades del compromiso con la sabiduría de Dios", editorial: "B&H Español" },
        { autor: "Tim Clinton y John Trent", titulo: "Consejería bíblica, tomo 2: manual de consulta sobre el matrimonio y la familia", editorial: "Portavoz" },
      ],
      complementaria: [
        { autor: "Gary Chapman", titulo: "Los cinco lenguajes del amor", editorial: "Unilit" },
        { autor: "Emerson Eggerichs", titulo: "Amor y respeto", editorial: "Grupo Nelson" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Efesios", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=yJgym5MGzM4", minutos: 10 },
      { tipo: "video", titulo: "Resumen del libro de Eclesiastés", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=X4Brf1Z8N4E", minutos: 9 },
      { tipo: "lectura", titulo: "Lectura ampliada: Efesios 5, el amor de Cristo en el matrimonio", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Efesios&cap=5" },
      { tipo: "guia", titulo: "Línea Nacional sobre la Violencia Doméstica: 1-800-799-7233, o escribe START al 88788", fuente: "The National Domestic Violence Hotline", url: "https://espanol.thehotline.org/" },
      { tipo: "lectura", titulo: "Declaración de fe del Ministerio Avivando el Fuego", fuente: "Academia Avivando el Fuego", url: "/academia/declaracion-de-fe" },
    ],
  },
  disponible: true,
};

const CONSEJERIA_FAMILIAR: MateriaDef = {
  id: "familia-consejeria-2",
  nivel: null,
  especialidad: "familia-consejeria",
  avanzada: true,
  orden: 2,
  titulo: "Consejería familiar",
  resumen: "Cómo acompañar a las familias con la Palabra: la familia según Dios y el consejero familiar, la crianza con amor y con límites, los adolescentes y los hijos adultos, las familias ensambladas y los que crían solos, las crisis de la familia y el perdón y la reconciliación.",
  base: "Malaquías 4:6; Deuteronomio 6:6-7",
  memoria: "Malaquías 4:6",
  lecciones: lecciones("familia-consejeria-2", [
    ["La familia según Dios y el consejero familiar", "Salmos 127:1; Deuteronomio 6:6-7; Josué 24:15; Proverbios 24:3-4"],
    ["Padres e hijos: criar con amor y con límites", "Efesios 6:1-4; Colosenses 3:21; Proverbios 22:6; Hebreos 12:11"],
    ["Los adolescentes y los hijos adultos", "Lucas 2:48-52; Éxodo 20:12; Lucas 15:20"],
    ["Las familias ensambladas y los que crían solos", "Salmos 68:5-6; Rut 1:16; Santiago 1:27"],
    ["Las crisis de la familia", "Salmos 46:1; 2 Corintios 1:3-4; Rut 1:1; Mateo 2:14"],
    ["El perdón y la reconciliación en la familia", "Génesis 45:4-5; Génesis 50:20-21; Lucas 15:28-32; Romanos 12:18; Malaquías 4:6"],
  ], 10),
  silabo: {
    proposito:
      "Que el que aconseja en la iglesia sepa acompañar a las familias con la Palabra y con prudencia: que conozca el propósito de Dios para la familia, que pasa la fe a los hijos en la vida diaria, y que mire a la familia entera sin buscar un culpable; que ayude a los padres a criar con amor y con límites, sabiendo que la disciplina nunca es maltrato y que el maltrato de un niño se reporta como pide la ley en Texas (Código de Familia, sección 261.101); que acompañe a los padres de adolescentes y de hijos adultos; que sostenga a las familias ensambladas y a los que crían solos; que esté presente en las crisis de la familia, también en las de la migración, y oriente a buscar una ayuda legal segura (según USCIS, un abogado o un representante acreditado, nunca un notario); y que prepare el camino del perdón y de la reconciliación sin poner en peligro a nadie. No reemplaza la terapia familiar profesional, y lo legal es una guía general, no un consejo legal. Lleva a la consejería lo que enseñan Familia y relaciones (Nivel 2) y Cuidado y consejería básica (Nivel 3), sin repetirlas. Su base es la promesa de Dios: «El hará volver el corazón de los padres hacia los hijos, y el corazón de los hijos hacia los padres» (Malaquías 4:6).",
    objetivos: [
      { id: "o1", texto: "Explicar el propósito de Dios para la familia y cómo mira el consejero a la familia entera.", bloom: "comprender" },
      { id: "o2", texto: "Ayudar a unos padres a criar con amor y con límites, y reconocer cuándo hay maltrato.", bloom: "aplicar" },
      { id: "o3", texto: "Acompañar los conflictos con los hijos adolescentes y la relación con los hijos adultos.", bloom: "aplicar" },
      { id: "o4", texto: "Aconsejar a una familia ensamblada y organizar el apoyo de la iglesia a los que crían solos.", bloom: "aplicar" },
      { id: "o5", texto: "Acompañar paso a paso a una familia en crisis, con una ayuda segura.", bloom: "aplicar" },
      { id: "o6", texto: "Evaluar y preparar un camino de perdón y de reconciliación en una familia.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar Malaquías 4:6 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "El propósito de Dios para la familia, las maneras de criar, las etapas de los hijos, los desafíos de las familias ensambladas, las crisis de la familia y los recursos de ayuda segura.",
      ser: "Un consejero que mira a la familia entera, no busca culpables, protege a los niños y espera con paciencia la obra de Dios.",
      hacer: "Dirigir una reunión familiar, armar un plan de disciplina, mediar entre padres e hijos, organizar el apoyo de la iglesia y preparar una reunión de reconciliación.",
    },
    bibliografia: {
      basica: [
        { autor: "Tim Clinton y John Trent", titulo: "Consejería bíblica, tomo 2: manual de consulta sobre el matrimonio y la familia", editorial: "Portavoz" },
        { autor: "Tedd Tripp", titulo: "Cómo pastorear el corazón de tu hijo", editorial: "Poiema Publicaciones" },
      ],
      complementaria: [
        { autor: "Gary Chapman y Ross Campbell", titulo: "Los 5 lenguajes del amor de los niños", editorial: "Unilit" },
        { autor: "Gary R. Collins", titulo: "Consejería cristiana efectiva", editorial: "Portavoz" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Deuteronomio", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=qfMplfJoYA0", minutos: 10 },
      { tipo: "video", titulo: "Resumen del libro de Génesis (parte 2)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=MC8BqGu9B8A", minutos: 9 },
      { tipo: "lectura", titulo: "Lectura ampliada: Génesis 45, José se da a conocer a sus hermanos", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Genesis&cap=45" },
      { tipo: "guia", titulo: "Evite estafas: quién puede ayudarle en un caso de inmigración", fuente: "USCIS", url: "https://www.uscis.gov/es/evite-estafas/estafas-comunes" },
      { tipo: "lectura", titulo: "Declaración de fe del Ministerio Avivando el Fuego", fuente: "Academia Avivando el Fuego", url: "/academia/declaracion-de-fe" },
    ],
  },
  disponible: true,
};

const DUELO_CRISIS: MateriaDef = {
  id: "familia-consejeria-3",
  nivel: null,
  especialidad: "familia-consejeria",
  orden: 3,
  titulo: "Duelo y crisis",
  resumen: "Cómo acompañar a los que sufren una pérdida o una crisis: el duelo y sus reacciones, el ministerio de la presencia, los duelos difíciles, los niños y el duelo, la primera ayuda psicológica en las crisis y la esperanza cristiana, con el cuidado del que consuela.",
  base: "Salmos 34:18; 2 Corintios 1:3-4",
  memoria: "Salmos 34:18",
  lecciones: lecciones("familia-consejeria-3", [
    ["El duelo: el dolor de perder", "Juan 11:33-35; Salmos 13:1-2; 1 Tesalonicenses 4:13-14; Salmos 34:18"],
    ["Acompañar al que sufre", "Job 2:11-13; Job 16:2; Romanos 12:15; Gálatas 6:2"],
    ["Los duelos difíciles", "2 Samuel 12:22-23; 2 Samuel 18:33; Lamentaciones 3:22-23"],
    ["Los niños y el duelo", "Marcos 10:14; Salmos 27:10; Isaías 66:13"],
    ["Las crisis: cuando la vida se sacude", "Isaías 43:2; Marcos 4:38-39; 1 Reyes 19:5-7"],
    ["La esperanza cristiana y el cuidado del que consuela", "Juan 11:25-26; 1 Corintios 15:55-57; Apocalipsis 21:4; Éxodo 18:17-18; Marcos 6:31"],
  ], 10),
  silabo: {
    proposito:
      "Que el que sirve en la iglesia sepa acompañar a los que sufren una pérdida o una crisis: que entienda el duelo como el dolor natural que sigue a una pérdida, que no es falta de fe, y conozca sus reacciones; que consuele con su presencia y con ayuda práctica durante el primer año, sin las explicaciones que hieren; que acompañe los duelos más difíciles, como la muerte de un hijo o el suicidio, y reconozca cuándo un duelo se complica y hay que derivar, con la línea 988 ante el riesgo de suicidio; que ayude a los niños en duelo con la verdad dicha con sencillez; que sirva en las crisis y en los desastres con los principios de la primera ayuda psicológica de la Organización Mundial de la Salud: observar, escuchar y conectar; y que comparta la esperanza de la resurrección sin apurar el llanto, cuidando también al equipo que consuela. No reemplaza la atención médica ni la psicológica. Lleva a la práctica lo que enseña Cuidado y consejería básica (Nivel 3), y se completa con Visitación y cuidado del rebaño y con Ordenanzas y ceremonias, de la especialidad Ministerio pastoral, sin repetirlas. Su base es la promesa del salmo: «Cercano está Jehová a los quebrantados de corazón; Y salva a los contritos de espíritu» (Salmos 34:18).",
    objetivos: [
      { id: "o1", texto: "Explicar qué es el duelo, sus reacciones y por qué llorar no es falta de fe.", bloom: "comprender" },
      { id: "o2", texto: "Acompañar a una persona en duelo con presencia y ayuda práctica durante el primer año.", bloom: "aplicar" },
      { id: "o3", texto: "Acompañar los duelos difíciles y reconocer cuándo un duelo se complica y hay que derivar.", bloom: "aplicar" },
      { id: "o4", texto: "Ayudar a un niño en duelo con la verdad dicha con sencillez.", bloom: "aplicar" },
      { id: "o5", texto: "Responder a una crisis con los principios de la primera ayuda psicológica: observar, escuchar y conectar.", bloom: "aplicar" },
      { id: "o6", texto: "Evaluar cómo compartir la esperanza cristiana y cómo cuidar al equipo que consuela.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar Salmos 34:18 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "El duelo y sus reacciones, los duelos difíciles, el duelo de los niños, la primera ayuda psicológica y la esperanza de la resurrección.",
      ser: "Un consolador presente y paciente, que escucha más que habla, no juzga y cuida también su propia alma.",
      hacer: "Visitar a una familia en duelo, armar el plan del primer año, acompañar después de un suicidio, hablar con un niño, servir en un desastre y cuidar al equipo de consuelo.",
    },
    bibliografia: {
      basica: [
        { autor: "H. Norman Wright", titulo: "Cómo aconsejar en situaciones de crisis", editorial: "CLIE" },
        { autor: "C. S. Lewis", titulo: "Una pena en observación", editorial: "Anagrama" },
      ],
      complementaria: [
        { autor: "Jorge E. Maldonado", titulo: "Introducción al asesoramiento pastoral de la familia", editorial: "Abingdon Press" },
        { autor: "Gary R. Collins", titulo: "Consejería cristiana efectiva", editorial: "Portavoz" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Job", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=A3ifTHYTmMQ", minutos: 13 },
      { tipo: "video", titulo: "Resumen del libro de Juan (parte 2): la última cena, la cruz y la resurrección", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=NUW1Frg8DA0", minutos: 9 },
      { tipo: "lectura", titulo: "Lectura ampliada: Juan 11, Jesús ante la tumba de Lázaro", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Juan&cap=11" },
      { tipo: "guia", titulo: "Primera ayuda psicológica: guía para trabajadores de campo", fuente: "Organización Mundial de la Salud", url: "https://www.who.int/es/publications/i/item/9789241548205" },
      { tipo: "guia", titulo: "Línea 988 de prevención del suicidio y crisis, con atención en español", fuente: "988 Suicide & Crisis Lifeline", url: "https://988lifeline.org/es/" },
    ],
  },
  disponible: true,
};

const ADICCIONES_RESTAURACION: MateriaDef = {
  id: "familia-consejeria-4",
  nivel: null,
  especialidad: "familia-consejeria",
  avanzada: true,
  orden: 4,
  titulo: "Adicciones y restauración",
  resumen: "Cómo acompañar a los que luchan con una adicción y a sus familias: qué es una adicción, la familia y los límites con amor, el camino de la restauración, las recaídas y la gracia, las adicciones a conductas como la pornografía, el juego y las pantallas, y la iglesia que restaura.",
  base: "Juan 8:36; Gálatas 6:1",
  memoria: "Juan 8:36",
  lecciones: lecciones("familia-consejeria-4", [
    ["¿Qué es una adicción?", "Proverbios 23:31-35; Romanos 7:15; 1 Corintios 6:12; Juan 8:34-36"],
    ["La familia del que lucha con una adicción", "Lucas 15:13-17; Gálatas 6:5; Efesios 4:15"],
    ["El camino de la restauración", "1 Juan 1:9; Santiago 5:16; Eclesiastés 4:9-10; 2 Corintios 5:17"],
    ["Las recaídas y la gracia", "Proverbios 24:16; Miqueas 7:8; Juan 21:15-17"],
    ["Las adicciones de hoy: la pornografía, el juego y las pantallas", "Job 31:1; Mateo 5:28; 1 Timoteo 6:9-10; Efesios 5:15-16"],
    ["La iglesia que restaura", "Gálatas 6:1; 1 Corintios 6:9-11; Isaías 61:1; Lucas 15:22-24"],
  ], 10),
  silabo: {
    proposito:
      "Que el que aconseja en la iglesia sepa acompañar a los que luchan con una adicción y a sus familias: que entienda la adicción como algo que domina, como enseña la Biblia, y como una enfermedad crónica del cerebro, como la describe el Instituto Nacional sobre el Abuso de Drogas (NIDA), y que derive siempre al médico, porque dejar algunas sustancias de golpe puede ser peligroso; que ayude a la familia a dejar de permitir la adicción y a poner límites con amor; que acompañe el camino de la restauración con la confesión, la rendición de cuentas y la comunidad; que reciba con gracia a los que recaen y los ayude a prevenir las recaídas; que reconozca las adicciones a conductas, como la pornografía, el juego y las pantallas; y que ayude a la iglesia a ser un lugar que restaura, con una red de recursos: la línea nacional de ayuda de SAMHSA (1-800-662-4357), los médicos, los programas de tratamiento y, ante una sobredosis, el 911 y la naloxona, que la FDA permite vender sin receta desde 2023. No reemplaza la atención médica ni el tratamiento profesional. Lleva a la práctica lo que enseña Cuidado y consejería básica (Nivel 3), sin repetirla. Su base es la promesa de Jesús: «Así que, si el Hijo os libertare, seréis verdaderamente libres» (Juan 8:36).",
    objetivos: [
      { id: "o1", texto: "Explicar qué es una adicción según la ciencia y según la Biblia, y reconocer sus señales.", bloom: "comprender" },
      { id: "o2", texto: "Ayudar a la familia de alguien con una adicción a poner límites con amor.", bloom: "aplicar" },
      { id: "o3", texto: "Acompañar el camino de la restauración con la confesión, la rendición de cuentas y la comunidad.", bloom: "aplicar" },
      { id: "o4", texto: "Recibir con gracia al que recae y armar un plan de prevención de recaídas.", bloom: "aplicar" },
      { id: "o5", texto: "Aconsejar a quien lucha con la pornografía, el juego o las pantallas.", bloom: "aplicar" },
      { id: "o6", texto: "Evaluar y organizar un ministerio de recuperación en la iglesia, con su red de recursos.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar Juan 8:36 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "Qué es una adicción según la Biblia y según la ciencia, cómo afecta a la familia, el camino de la restauración, las recaídas, las adicciones a conductas y los recursos de ayuda.",
      ser: "Un consejero que recibe con gracia, dice la verdad con amor, no rescata de las consecuencias y no camina solo.",
      hacer: "Conversar con quien reconoce un problema, ayudar a una familia a poner límites, armar planes de rendición de cuentas y de prevención de recaídas, y organizar un ministerio de recuperación.",
    },
    bibliografia: {
      basica: [
        { autor: "John Baker", titulo: "Celebremos la recuperación: guía del líder", editorial: "Vida" },
        { autor: "Tim Clinton y Ron Hawkins", titulo: "Consejería bíblica: manual de consulta sobre 40 temas críticos", editorial: "Portavoz" },
      ],
      complementaria: [
        { autor: "Gary R. Collins", titulo: "Consejería cristiana efectiva", editorial: "Portavoz" },
        { autor: "Pablo Hoff", titulo: "El pastor como consejero", editorial: "Vida" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Romanos (parte 2)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=ZqScL0dHLsM", minutos: 10 },
      { tipo: "video", titulo: "Resumen del libro de Gálatas", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=kMJLgLOWb3I", minutos: 10 },
      { tipo: "lectura", titulo: "Lectura ampliada: Lucas 15, el hijo que volvió a casa", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Lucas&cap=15" },
      { tipo: "guia", titulo: "Línea nacional de ayuda de SAMHSA: 1-800-662-4357", fuente: "SAMHSA", url: "https://www.samhsa.gov/find-help/helplines/national-helpline" },
    ],
  },
  disponible: true,
};

const ETICA_LIMITES_CONSEJERO: MateriaDef = {
  id: "familia-consejeria-5",
  nivel: null,
  especialidad: "familia-consejeria",
  orden: 5,
  titulo: "Ética y límites del consejero",
  resumen: "La ética del que aconseja en la iglesia: el lugar y los límites del consejero, la confidencialidad y lo que la ley de Texas pide reportar, los límites con el otro sexo, el poder del consejero y la política de consejería, derivar y trabajar en red, y el cuidado del consejero.",
  base: "2 Corintios 8:21; Proverbios 11:13",
  memoria: "2 Corintios 8:21",
  lecciones: lecciones("familia-consejeria-5", [
    ["El lugar y los límites del consejero de la iglesia", "Romanos 15:14; 2 Corintios 3:5; Santiago 3:1"],
    ["La confidencialidad y sus límites", "Proverbios 11:13; Proverbios 20:19; Proverbios 25:9"],
    ["Los límites con el otro sexo y la integridad", "Proverbios 4:23; 2 Timoteo 2:22; Génesis 39:11-12; 1 Tesalonicenses 5:22"],
    ["El poder del consejero y la protección del aconsejado", "Mateo 20:25-26; 1 Pedro 5:2-3; Ezequiel 34:4; 2 Corintios 4:2"],
    ["Derivar bien y trabajar en red", "Éxodo 18:21-22; Proverbios 15:22; Lucas 10:33-35"],
    ["El cuidado del consejero y la rendición de cuentas", "Hechos 20:28; 1 Timoteo 4:16; Proverbios 27:17; 2 Corintios 8:21"],
  ], 10),
  silabo: {
    proposito:
      "Que el que aconseja en la iglesia lo haga con integridad y dentro de sus límites: que sepa lo que le corresponde y lo que no, sin diagnosticar, recetar ni dar consejo legal, y sin presentarse como consejero profesional con licencia si no lo es (en Texas, Código de Ocupaciones, sección 503.054); que guarde la confianza y conozca sus límites: el peligro para una vida y el abuso de un niño (Código de Familia, sección 261.101) o de una persona mayor o con discapacidad (Código de Recursos Humanos, sección 48.051), que en Texas se reportan aunque se sepan en confianza; que ponga límites claros en su trato con el otro sexo, sabiendo que aprovecharse de quien aconseja es un abuso y, en Texas, un delito (Código Penal, sección 22.011); que use su lugar para servir y no para dominar, con una política de consejería escrita; que derive bien y trabaje en red; y que cuide su vida con Dios, su familia y su descanso, con supervisión y rendición de cuentas. Lo legal es una guía general, no un consejo legal. Completa las cuatro materias anteriores de la especialidad y lleva a la práctica lo que enseña Cuidado y consejería básica (Nivel 3). Su base es la palabra de Pablo: «procurando hacer las cosas honradamente, no sólo delante del Señor sino también delante de los hombres» (2 Corintios 8:21).",
    objetivos: [
      { id: "o1", texto: "Explicar lo que le corresponde al consejero de la iglesia y lo que no, y lo que pide la ley de Texas sobre su título.", bloom: "comprender" },
      { id: "o2", texto: "Explicar la confidencialidad y sus límites, y reportar lo que la ley de Texas pide reportar.", bloom: "aplicar" },
      { id: "o3", texto: "Aplicar límites claros en el trato con el otro sexo y responder a las señales de un apego.", bloom: "aplicar" },
      { id: "o4", texto: "Distinguir la consejería que libera de la que controla, y proponer una política de consejería.", bloom: "analizar" },
      { id: "o5", texto: "Derivar a un profesional sin abandonar a la persona, y armar la red de recursos de la iglesia.", bloom: "aplicar" },
      { id: "o6", texto: "Evaluar el cuidado del consejero y armar un plan de supervisión y de rendición de cuentas.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar 2 Corintios 8:21 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "Los límites de la consejería pastoral, la confidencialidad y lo que la ley de Texas pide reportar, los límites con el otro sexo, las relaciones dobles y el abuso de poder, la derivación y el cuidado del consejero.",
      ser: "Un consejero íntegro, que guarda la confianza, sirve sin dominar, conoce sus límites y se deja aconsejar.",
      hacer: "Explicar los límites de la confidencialidad, reportar el abuso, poner límites con el otro sexo, escribir una política de consejería, derivar bien y armar su plan de cuidado.",
    },
    bibliografia: {
      basica: [
        { autor: "Gary R. Collins", titulo: "Consejería cristiana efectiva", editorial: "Portavoz" },
        { autor: "Pablo Hoff", titulo: "El pastor como consejero", editorial: "Vida" },
      ],
      complementaria: [
        { autor: "Tim Clinton y Ron Hawkins", titulo: "Consejería bíblica: manual de consulta sobre 40 temas críticos", editorial: "Portavoz" },
        { autor: "Jay E. Adams", titulo: "Capacitado para orientar", editorial: "Portavoz" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Proverbios", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=pNjt_NfIam8", minutos: 9 },
      { tipo: "video", titulo: "Resumen del libro de 1 Timoteo", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=K5xCbQcSsOE", minutos: 11 },
      { tipo: "lectura", titulo: "Lectura ampliada: Lucas 10, el buen samaritano", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Lucas&cap=10" },
      { tipo: "guia", titulo: "Línea de reportes de abuso de Texas: 1-800-252-5400", fuente: "Departamento de Servicios para la Familia y de Protección de Texas", url: "https://www.txabusehotline.org" },
      { tipo: "guia", titulo: "Línea 988 de prevención del suicidio y crisis, con atención en español", fuente: "988 Suicide & Crisis Lifeline", url: "https://988lifeline.org/es/" },
    ],
  },
  disponible: true,
};

const FUNDAMENTOS_CAPELLANIA: MateriaDef = {
  id: "capellania-1",
  nivel: null,
  especialidad: "capellania",
  orden: 1,
  titulo: "Fundamentos de la capellanía",
  resumen: "Qué es la capellanía y dónde sirve el capellán, el ministerio de la presencia, servir a personas de todas las creencias, el llamado y la formación del capellán, la visita paso a paso y el trabajo dentro de una institución.",
  base: "Mateo 25:36; Jeremías 29:7",
  memoria: "Mateo 25:36",
  lecciones: lecciones("capellania-1", [
    ["Qué es la capellanía", "Mateo 25:35-36; Mateo 25:40; Jeremías 29:7"],
    ["El ministerio de la presencia", "Juan 1:14; Lucas 24:15; Mateo 28:20"],
    ["Servir a personas de todas las creencias", "Hechos 17:22-23; 1 Pedro 3:15-16; Colosenses 4:5-6"],
    ["El llamado y la formación del capellán", "Hechos 13:2-3; 2 Timoteo 2:15; 1 Timoteo 3:7"],
    ["La visita del capellán paso a paso", "Santiago 1:19; Santiago 5:13-14; Hebreos 13:3"],
    ["El capellán dentro de la institución", "Daniel 6:3-4; Tito 3:1-2; Colosenses 3:23"],
  ], 10),
  silabo: {
    proposito:
      "Que el que siente el llamado a la capellanía conozca su fundamento y su práctica: que entienda qué es un capellán, el ministro que la iglesia envía a los hospitales, las cárceles, las emergencias y otras instituciones para estar con las personas donde ellas están; que practique el ministerio de la presencia; que sirva con respeto a personas de todas las creencias, hablando de Cristo con mansedumbre cuando se lo piden y sin aprovecharse del dolor; que reciba el llamado, el aval de su iglesia y la formación que piden las instituciones (para la certificación profesional de la Asociación de Capellanes Profesionales: una maestría, cuatro unidades de educación pastoral clínica, el aval de su grupo de fe y 2,000 horas de experiencia); que sepa hacer una visita paso a paso; y que trabaje dentro de la institución con integridad, respetando sus normas y cuidando también al personal. Lleva a la capellanía lo que enseñan Cuidado y consejería básica (Nivel 3) y la especialidad Familia y consejería, sin repetirlas. Su base es la palabra de Jesús: «estuve desnudo, y me cubristeis; enfermo, y me visitasteis; en la cárcel, y vinisteis a mí» (Mateo 25:36).",
    objetivos: [
      { id: "o1", texto: "Explicar qué es la capellanía, dónde sirve el capellán y en qué se basa en la Biblia.", bloom: "comprender" },
      { id: "o2", texto: "Practicar el ministerio de la presencia con la escucha que acompaña.", bloom: "aplicar" },
      { id: "o3", texto: "Servir con respeto a personas de todas las creencias, sin aprovecharse de su dolor.", bloom: "aplicar" },
      { id: "o4", texto: "Describir el llamado, el aval y la formación del capellán, y armar un plan para prepararse.", bloom: "aplicar" },
      { id: "o5", texto: "Hacer una visita de capellanía paso a paso.", bloom: "aplicar" },
      { id: "o6", texto: "Evaluar cómo trabaja el capellán dentro de una institución, con sus normas y su personal.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar Mateo 25:36 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "La base bíblica de la capellanía, los lugares donde sirve, el ministerio de la presencia, las muchas creencias de las instituciones, la formación del capellán y las normas institucionales.",
      ser: "Un capellán presente, respetuoso e íntegro, que sirve a todos como a Cristo.",
      hacer: "Visitar paso a paso, escuchar y acompañar, atender a personas de otra fe, prepararse con su iglesia y trabajar en equipo con la institución.",
    },
    bibliografia: {
      basica: [
        { autor: "Luz M. Rivera Miranda", titulo: "Capellanía institucional: nociones básicas de la capellanía", editorial: "Abingdon Press" },
        { autor: "Ekkehard Heise", titulo: "Manual pastoral para el cuidado del alma y sanar la persona: poiménica", editorial: "CLIE" },
      ],
      complementaria: [
        { autor: "H. Norman Wright", titulo: "Cómo aconsejar en situaciones de crisis", editorial: "CLIE" },
        { autor: "Gary R. Collins", titulo: "Consejería cristiana efectiva", editorial: "Portavoz" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Mateo (parte 2)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=EobkNEf-ySA", minutos: 8 },
      { tipo: "video", titulo: "Resumen del libro de Hechos (parte 2)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=ZKaaHQUdVCY", minutos: 9 },
      { tipo: "lectura", titulo: "Lectura ampliada: Mateo 25, el Rey que se identifica con los pequeños", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Mateo&cap=25" },
      { tipo: "guia", titulo: "Cómo se certifica un capellán profesional (en inglés)", fuente: "Board of Chaplaincy Certification Inc. (APC)", url: "https://www.apchaplains.org/bcci-site/becoming-certified/" },
    ],
  },
  disponible: true,
};

const CAPELLANIA_HOSPITALARIA: MateriaDef = {
  id: "capellania-2",
  nivel: null,
  especialidad: "capellania",
  avanzada: true,
  orden: 2,
  titulo: "Capellanía hospitalaria",
  resumen: "Cómo servir como capellán en un hospital: el enfermo y el equipo del hospital, orar por los enfermos según la declaración de fe, las normas de privacidad y de higiene, acompañar al que muere y a su familia, las pérdidas de los niños y de las madres, y las decisiones difíciles con el cuidado del personal.",
  base: "Salmos 41:3; Mateo 25:36",
  memoria: "Salmos 41:3",
  lecciones: lecciones("capellania-2", [
    ["El enfermo y el hospital", "Marcos 1:40-41; Salmos 41:3; 2 Corintios 4:16"],
    ["Orar por los enfermos", "Santiago 5:14-15; 2 Reyes 20:5; 2 Corintios 12:8-9; 1 Timoteo 5:23"],
    ["Las normas del hospital: privacidad, cuidados y orden", "1 Corintios 14:40; Proverbios 11:13; Filipenses 2:4"],
    ["Acompañar al que muere y a su familia", "Salmos 23:4; Juan 14:1-3; Lucas 23:42-43; 2 Timoteo 4:6-8"],
    ["Las pérdidas de los niños y de las madres", "Mateo 19:14; Salmos 139:13; Salmos 139:16; Isaías 49:15-16"],
    ["Las decisiones difíciles y el cuidado del personal", "Eclesiastés 3:1-2; Filipenses 1:21-23; Proverbios 11:14; Gálatas 6:2"],
  ], 10),
  silabo: {
    proposito:
      "Que el capellán sepa servir en un hospital: que comprenda lo que vive el enfermo y trabaje con el equipo sin dar noticias médicas; que ore por los enfermos según la declaración de fe del ministerio, que enseña que Dios sana hoy en respuesta a la oración de fe y que buscar su sanidad no se opone a la atención médica (artículo 11), sin prometer ni culpar (si la sanidad está en la expiación es un punto de la declaración de fe por confirmar); que respete las normas de privacidad, pues la ley HIPAA permite al hospital dar al clero el nombre, el lugar, el estado general y la afiliación religiosa del paciente si este no se opuso, y las de higiene; que acompañe al que muere y a su familia, conociendo los cuidados paliativos, el hospicio y la Ley de Voluntades Anticipadas de Texas (Código de Salud y Seguridad, capítulo 166); que acompañe a los padres que pierden un hijo o un embarazo; y que acompañe las decisiones difíciles sin decidir por la familia, cuidando también al personal. No reemplaza al equipo médico, y lo legal es una guía general, no un consejo legal. Se apoya en Fundamentos de la capellanía y lleva al hospital lo que enseña Duelo y crisis, sin repetirlas. Su base es la promesa del salmo: «Jehová lo sustentará sobre el lecho del dolor; Mullirás toda su cama en su enfermedad» (Salmos 41:3).",
    objetivos: [
      { id: "o1", texto: "Describir lo que vive el enfermo y el lugar del capellán en el equipo del hospital.", bloom: "comprender" },
      { id: "o2", texto: "Orar por los enfermos según la declaración de fe, con fe y con humildad.", bloom: "aplicar" },
      { id: "o3", texto: "Aplicar las normas de privacidad, de higiene y de orden del hospital.", bloom: "aplicar" },
      { id: "o4", texto: "Acompañar al que muere y a su familia, y explicar los cuidados paliativos y las voluntades anticipadas.", bloom: "aplicar" },
      { id: "o5", texto: "Acompañar a los padres ante la enfermedad grave o la pérdida de un hijo o de un embarazo.", bloom: "aplicar" },
      { id: "o6", texto: "Evaluar cómo acompañar una decisión difícil sin decidir por la familia, y cómo cuidar al personal.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar Salmos 41:3 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "La experiencia del enfermo, el equipo del hospital, la sanidad divina según la declaración de fe, la privacidad de la salud, los cuidados paliativos, el hospicio y las voluntades anticipadas de Texas.",
      ser: "Un capellán compasivo y ordenado, que ora con fe y con humildad y respeta el trabajo del equipo médico.",
      hacer: "Visitar en la sala y en cuidados intensivos, orar por los enfermos, acompañar a los que mueren y a sus familias, y acompañar las pérdidas de un bebé y las decisiones difíciles.",
    },
    bibliografia: {
      basica: [
        { autor: "Luz M. Rivera Miranda", titulo: "Capellanía institucional: nociones básicas de la capellanía", editorial: "Abingdon Press" },
        { autor: "Ekkehard Heise", titulo: "Manual pastoral para el cuidado del alma y sanar la persona: poiménica", editorial: "CLIE" },
      ],
      complementaria: [
        { autor: "Henri J. M. Nouwen", titulo: "El sanador herido", editorial: "PPC" },
        { autor: "C. S. Lewis", titulo: "El problema del dolor", editorial: "Rialp" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Marcos", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=gsXLQkppzUc", minutos: 11 },
      { tipo: "video", titulo: "Resumen del libro de Juan (parte 2): la última cena, la cruz y la resurrección", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=NUW1Frg8DA0", minutos: 9 },
      { tipo: "lectura", titulo: "Lectura ampliada: Salmo 23, el Señor es mi pastor", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Salmos&cap=23" },
      { tipo: "guia", titulo: "Los hospitales y el clero: lo que permite la ley de privacidad HIPAA (en inglés)", fuente: "Departamento de Salud y Servicios Humanos (HHS)", url: "https://www.hhs.gov/hipaa/for-professionals/faq/357/are-hospitals-able-to-inform-the-clergy-about-parishioners-in-the-hospital/index.html" },
    ],
  },
  disponible: true,
};

const CAPELLANIA_PENITENCIARIA: MateriaDef = {
  id: "capellania-3",
  nivel: null,
  especialidad: "capellania",
  avanzada: true,
  orden: 3,
  titulo: "Capellanía penitenciaria",
  resumen: "Cómo servir como capellán o voluntario en una cárcel o una prisión: lo que vive el preso, el evangelio tras las rejas con la libertad religiosa, la culpa, el perdón y la justicia sin olvidar a las víctimas, las familias de los presos, la prudencia y los límites que protegen a todos, y el regreso a la comunidad.",
  base: "Hebreos 13:3; Mateo 25:36",
  memoria: "Hebreos 13:3",
  lecciones: lecciones("capellania-3", [
    ["La cárcel y el preso", "Génesis 39:20-23; Salmos 102:19-20; Hebreos 13:3"],
    ["El evangelio tras las rejas", "Hechos 16:25-26; Hechos 16:30-31; Filipenses 1:12-14; 2 Timoteo 2:9"],
    ["La culpa, el perdón y la justicia", "Lucas 23:40-41; Lucas 23:42-43; Filemón 1:15-18; Miqueas 6:8"],
    ["Las familias de los presos", "Salmos 68:5-6; Isaías 1:17; Salmos 146:7"],
    ["Prudencia, límites y seguridad", "Mateo 10:16; Proverbios 14:15; 2 Corintios 8:21"],
    ["El regreso a la comunidad", "Hechos 9:26-27; Filemón 1:10-11; Filemón 1:15-18"],
  ], 10),
  silabo: {
    proposito:
      "Que el capellán y el voluntario sepan servir en una cárcel o una prisión: que comprendan lo que vive el preso, la diferencia entre la cárcel del condado y la prisión del estado, y que Dios está con los presos, como estuvo con José; que lleven el evangelio tras las rejas dentro de las reglas, sabiendo que la ley federal RLUIPA protege la práctica religiosa de los presos (la Corte Suprema la confirmó en Cutter v. Wilkinson, en 2005) y que en Texas el sistema penitenciario (TDCJ) pide a sus voluntarios tener al menos 18 años, pasar una revisión de antecedentes, capacitarse y renovar cada dos años; que distingan el perdón de Dios de las consecuencias del delito, sin olvidar a las víctimas; que acompañen a las familias de los presos y a sus hijos, también con el programa Angel Tree de Prison Fellowship; que sirvan con prudencia y con límites claros, sin dejarse manipular y avisando lo que pone vidas en peligro; y que la iglesia reciba al que sale de la cárcel con un mentor, con ayuda práctica y con prudencia. Lo legal es una guía general, no un consejo legal. Se apoya en Fundamentos de la capellanía y lleva a la cárcel lo que enseña la especialidad Familia y consejería, sin repetirlas. Su base es la palabra de Hebreos: «Acordaos de los presos, como si estuvierais presos juntamente con ellos; y de los maltratados, como que también vosotros mismos estáis en el cuerpo» (Hebreos 13:3).",
    objetivos: [
      { id: "o1", texto: "Describir lo que vive una persona presa y explicar que Dios está con los presos.", bloom: "comprender" },
      { id: "o2", texto: "Llevar el evangelio a la cárcel dentro de las reglas, respetando la libertad religiosa de cada preso.", bloom: "aplicar" },
      { id: "o3", texto: "Distinguir el perdón de Dios de las consecuencias del delito, sin olvidar a las víctimas.", bloom: "analizar" },
      { id: "o4", texto: "Acompañar a las familias de los presos y a sus hijos.", bloom: "aplicar" },
      { id: "o5", texto: "Servir en la cárcel con prudencia y con límites claros, sin dejarse manipular.", bloom: "aplicar" },
      { id: "o6", texto: "Evaluar cómo recibe la iglesia a una persona que sale de la cárcel.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar Hebreos 13:3 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "La vida en la cárcel y en la prisión, la presencia de Dios con los presos, la libertad religiosa, las reglas de los voluntarios en Texas, el perdón y las consecuencias del delito, las familias de los presos y el regreso a la comunidad.",
      ser: "Un capellán compasivo y prudente, que se acuerda de los presos sin ingenuidad y une la justicia con la misericordia.",
      hacer: "Visitar a un preso, dirigir un estudio bíblico en la cárcel, acompañar la culpa y el arrepentimiento, apoyar a las familias, poner límites y preparar el regreso de los que salen.",
    },
    bibliografia: {
      basica: [
        { autor: "Luz M. Rivera Miranda", titulo: "Capellanía institucional: nociones básicas de la capellanía", editorial: "Abingdon Press" },
        { autor: "Ekkehard Heise", titulo: "Manual pastoral para el cuidado del alma y sanar la persona: poiménica", editorial: "CLIE" },
      ],
      complementaria: [
        { autor: "Corrie ten Boom, con John y Elizabeth Sherrill", titulo: "El refugio secreto", editorial: "Ediciones Palabra" },
        { autor: "Lennie Spitale", titulo: "Prison Ministry: Understanding Jail and Prison Culture (en inglés)", editorial: "Wheaton College Billy Graham Center Institute" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Génesis (parte 2)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=MC8BqGu9B8A", minutos: 9 },
      { tipo: "video", titulo: "Evangelio de Lucas 19 a 23", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=KBE2nLYyCdc", minutos: 5 },
      { tipo: "lectura", titulo: "Lectura ampliada: Filemón, el esclavo que volvió como hermano", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Filemon&cap=1" },
      { tipo: "guia", titulo: "Cómo ser voluntario en las prisiones de Texas (en inglés)", fuente: "Departamento de Justicia Criminal de Texas (TDCJ)", url: "https://tdcj.texas.gov/divisions/cvsd/volunteer.html" },
    ],
  },
  disponible: true,
};

const EMERGENCIAS_DESASTRES: MateriaDef = {
  id: "capellania-4",
  nivel: null,
  especialidad: "capellania",
  orden: 4,
  titulo: "Emergencias y desastres",
  resumen: "Cómo servir como capellán en las emergencias y los desastres: dónde sirve y cómo trabaja dentro de un equipo, la primera ayuda psicológica, la fe en medio del desastre sin culpar a las víctimas, el aviso de una muerte, el cuidado de los niños y de los más vulnerables, y el cuidado del que ayuda con la preparación de la iglesia.",
  base: "Salmos 46:1; Isaías 43:2",
  memoria: "Salmos 46:1",
  lecciones: lecciones("capellania-4", [
    ["El capellán en las emergencias", "Salmos 46:1-3; Isaías 43:2; Lucas 10:33-34"],
    ["La primera ayuda psicológica", "1 Reyes 19:5-7; Hechos 27:33-36; Santiago 2:15-16"],
    ["La fe en medio del desastre", "Lucas 13:4-5; Job 2:11-13; Lamentaciones 3:22-23"],
    ["Avisar una muerte y acompañar a la familia", "Juan 11:33-35; Romanos 12:15; Proverbios 25:20"],
    ["Los niños y los más vulnerables", "Marcos 10:14-16; Isaías 40:11; Levítico 19:34"],
    ["Cuidar al que cuida y preparar a la iglesia", "2 Corintios 1:3-4; Marcos 6:31; Éxodo 18:17-18; Proverbios 22:3"],
  ], 10),
  silabo: {
    proposito:
      "Que el capellán sepa servir en las emergencias y los desastres: que conozca dónde sirve el capellán de emergencias, con los bomberos, la policía y los paramédicos y en los albergues, y que nunca llegue por su cuenta, pues FEMA pide a los voluntarios unirse antes a una organización reconocida; que dé la primera ayuda psicológica que enseña la Organización Mundial de la Salud (observar, escuchar y conectar), atendiendo primero lo básico; que acompañe la fe en medio del desastre sin culpar a las víctimas, como enseñó Jesús con la torre de Siloé; que acompañe el aviso de una muerte en persona, a tiempo, en pareja, con palabras claras y con compasión; que cuide a los niños y a los más vulnerables; y que cuide su propia vida y prepare a la iglesia para servir antes, durante y después del desastre. No reemplaza la capacitación de cada departamento ni a los profesionales de la salud mental. Se apoya en Fundamentos de la capellanía y lleva a las emergencias lo que enseña Duelo y crisis, sin repetirlas. Su base es la confesión del salmo: «Dios es nuestro amparo y fortaleza, Nuestro pronto auxilio en las tribulaciones» (Salmos 46:1).",
    objetivos: [
      { id: "o1", texto: "Explicar dónde sirve el capellán en las emergencias, y servir dentro de un equipo sin llegar por su cuenta.", bloom: "comprender" },
      { id: "o2", texto: "Dar la primera ayuda psicológica: observar, escuchar y conectar.", bloom: "aplicar" },
      { id: "o3", texto: "Acompañar la fe en medio del desastre sin culpar a las víctimas.", bloom: "aplicar" },
      { id: "o4", texto: "Acompañar el aviso de una muerte en persona, a tiempo, en pareja, con palabras claras y con compasión.", bloom: "aplicar" },
      { id: "o5", texto: "Cuidar a los niños y a los más vulnerables después de un desastre.", bloom: "aplicar" },
      { id: "o6", texto: "Evaluar el cuidado del que ayuda y el plan de la iglesia para los desastres.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar Salmos 46:1 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "Los lugares donde sirve el capellán de emergencias, la guía de FEMA para los voluntarios, la primera ayuda psicológica de la OMS, el sufrimiento y la fe, los principios para avisar una muerte, las reacciones de los niños y la preparación para los desastres.",
      ser: "Un capellán sereno y compasivo, que confía en Dios en medio de la tribulación y sirve dentro del equipo.",
      hacer: "Servir en un incendio o en un albergue, dar la primera ayuda psicológica, acompañar el aviso de una muerte, cuidar a los niños y a los más débiles, cuidarse a sí mismo y preparar a la iglesia.",
    },
    bibliografia: {
      basica: [
        { autor: "H. Norman Wright", titulo: "Cómo aconsejar en situaciones de crisis", editorial: "CLIE" },
        { autor: "Organización Mundial de la Salud, War Trauma Foundation y Visión Mundial Internacional", titulo: "Primera ayuda psicológica: guía para trabajadores de campo", editorial: "Organización Mundial de la Salud" },
      ],
      complementaria: [
        { autor: "Philip Yancey", titulo: "Dónde está Dios cuando duele", editorial: "Peniel" },
        { autor: "C. S. Lewis", titulo: "El problema del dolor", editorial: "Rialp" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Salmos", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=8yieTfiw_Ew", minutos: 10 },
      { tipo: "video", titulo: "Resumen de la historia de Job: ¿por qué la vida de Job se volvió tan difícil?", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=_AIvRQj8kHs", minutos: 6 },
      { tipo: "lectura", titulo: "Lectura ampliada: Salmo 46, Dios es nuestro amparo", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Salmos&cap=46" },
      { tipo: "guia", titulo: "Primera ayuda psicológica: guía para trabajadores de campo", fuente: "Organización Mundial de la Salud", url: "https://www.who.int/es/publications/i/item/9789241548205" },
      { tipo: "guia", titulo: "Línea de Ayuda para los Afectados por Catástrofes, con atención en español", fuente: "SAMHSA", url: "https://www.samhsa.gov/find-help/helplines/disaster-distress-helpline/espanol" },
    ],
  },
  disponible: true,
};

const MARCO_LEGAL_CAPELLAN: MateriaDef = {
  id: "capellania-5",
  nivel: null,
  especialidad: "capellania",
  orden: 5,
  titulo: "Marco legal y ético del capellán",
  resumen: "El marco legal y ético del capellán: la libertad religiosa y su lugar en las instituciones públicas, lo que se le cuenta en confianza y sus límites en Texas, la integridad con el dinero y con el trato, los registros y la privacidad en las redes, el aval, la supervisión y el código de ética, y qué hacer cuando la ley y la conciencia chocan.",
  base: "Hechos 24:16; Romanos 13:1",
  memoria: "Hechos 24:16",
  lecciones: lecciones("capellania-5", [
    ["La libertad religiosa y el lugar del capellán", "Mateo 22:21; Romanos 13:1; 1 Timoteo 2:1-2"],
    ["Lo que se le cuenta al capellán", "Proverbios 11:13; Santiago 5:16; Proverbios 31:8-9"],
    ["La integridad del capellán", "Hechos 20:33-35; 1 Pedro 5:2-3; 2 Corintios 8:20-21"],
    ["Los registros, la privacidad y las redes", "Lucas 16:10; Proverbios 10:19; Efesios 4:29"],
    ["El aval, la supervisión y el código de ética", "Hebreos 13:17; Gálatas 6:1; Proverbios 27:17"],
    ["Cuando la ley y la conciencia chocan", "Hechos 4:19-20; Daniel 6:10; 1 Timoteo 1:5"],
  ], 10),
  silabo: {
    proposito:
      "Que el capellán conozca el marco legal y ético de su servicio: que entienda que la Primera Enmienda no permite una religión oficial y protege la libre práctica de la fe, y que por eso hay capellanes donde las personas no pueden ir a su iglesia (así lo reconoció el caso Katcoff v. Marsh en 1985), donde el capellán sirve a todos, realiza lo que su fe le permite y facilita lo demás; que guarde lo que le confían, sabiendo que en Texas la regla 505 de las Reglas de Evidencia protege lo que se le dice al clero como consejero espiritual, pero que el clero también debe reportar enseguida el abuso de un niño (Código de Familia, sección 261.101) y el de una persona mayor o con discapacidad (Código de Recursos Humanos, sección 48.051); que cuide su integridad con el dinero, los regalos y el trato; que escriba en los registros solo lo necesario y proteja la privacidad en las redes; que rinda cuentas con el aval de su iglesia, la supervisión y el código de ética de su asociación; y que, cuando la ley y la conciencia chocan, obedezca a Dios antes que a los hombres, con respeto. Lo legal es una guía general, no un consejo legal. Lleva al capellán lo que enseña Ética y límites del consejero, sin repetirla. Su base es la palabra de Pablo: «Y por esto procuro tener siempre una conciencia sin ofensa ante Dios y ante los hombres» (Hechos 24:16).",
    objetivos: [
      { id: "o1", texto: "Explicar cómo protege la Primera Enmienda la libertad religiosa, y servir a todos en una institución pública.", bloom: "comprender" },
      { id: "o2", texto: "Decidir qué guarda y qué reporta el capellán, según la ley de Texas.", bloom: "aplicar" },
      { id: "o3", texto: "Cuidar la integridad con el dinero, los regalos, el trato y los papeles dobles.", bloom: "aplicar" },
      { id: "o4", texto: "Escribir registros breves y proteger la privacidad de las personas en las conversaciones y en las redes.", bloom: "aplicar" },
      { id: "o5", texto: "Explicar el aval, la supervisión y el código de ética, y responder cuando un compañero cruza un límite.", bloom: "aplicar" },
      { id: "o6", texto: "Evaluar cuándo se obedece una norma y cuándo se obedece a Dios antes que a los hombres.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar Hechos 24:16 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "La Primera Enmienda y el lugar del capellán, la regla 505 de Texas y los deberes de reportar, la integridad ministerial, la privacidad de los registros y de las redes, el aval y los códigos de ética, y la objeción de conciencia.",
      ser: "Un capellán íntegro y transparente, que respeta la ley y la fe de los demás, y cuida una conciencia sin ofensa ante Dios y ante los hombres.",
      hacer: "Servir a personas de todas las creencias, guardar y reportar lo que corresponde, rechazar el dinero y los favores, escribir registros breves, rendir cuentas y responder con respeto a una orden que va contra su conciencia.",
    },
    bibliografia: {
      basica: [
        { autor: "Joe E. Trull y James E. Carter", titulo: "Ética ministerial", editorial: "Mundo Hispano" },
        { autor: "Luz M. Rivera Miranda", titulo: "Capellanía institucional: nociones básicas de la capellanía", editorial: "Abingdon Press" },
      ],
      complementaria: [
        { autor: "Richard R. Hammar", titulo: "Pastor, Church & Law (en inglés)", editorial: "Church Law & Tax" },
        { autor: "Gary R. Collins", titulo: "Consejería cristiana efectiva", editorial: "Portavoz" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Mateo (parte 2)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=EobkNEf-ySA", minutos: 8 },
      { tipo: "video", titulo: "Resumen del libro de Hebreos", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=VqVAOqyoKCs", minutos: 10 },
      { tipo: "lectura", titulo: "Lectura ampliada: Daniel 6, fiel aun ante el edicto del rey", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Daniel&cap=6" },
      { tipo: "guia", titulo: "Línea de reportes de abuso de Texas: 1-800-252-5400", fuente: "Departamento de Servicios para la Familia y de Protección de Texas", url: "https://www.txabusehotline.org" },
      { tipo: "guia", titulo: "Código de ética de la Asociación de Capellanes Profesionales (en inglés)", fuente: "Association of Professional Chaplains", url: "https://www.apchaplains.org/wp-content/uploads/2022/06/APC-Code-of-Ethics.pdf" },
    ],
  },
  disponible: true,
};

const EVANGELISMO_REDES: MateriaDef = {
  id: "comunicaciones-1",
  nivel: null,
  especialidad: "comunicaciones",
  orden: 1,
  titulo: "Evangelismo en redes",
  resumen: "Cómo anunciar el evangelio en las redes: la plaza digital, conocer a la gente que está allí, el contenido que edifica, pasar de la pantalla a la mesa con el seguimiento, la política de redes de la iglesia con el cuidado de los niños, y medir con sabiduría.",
  base: "Mateo 10:27; 1 Corintios 9:22",
  memoria: "Mateo 10:27",
  lecciones: lecciones("comunicaciones-1", [
    ["El evangelio en el mundo digital", "Mateo 10:27; Hechos 17:17; 1 Corintios 9:22"],
    ["Conocer a la gente que está en las redes", "Hechos 17:22-23; Juan 4:7-10; 1 Pedro 3:15"],
    ["Contenido que edifica", "Proverbios 25:11; Colosenses 4:6; Filipenses 4:8"],
    ["De la pantalla a la mesa", "Juan 1:39; Hechos 8:30-31; Hechos 2:46-47"],
    ["Las redes de la iglesia: equipo, permisos y cuidado", "1 Corintios 14:40; Proverbios 22:3; Mateo 18:10"],
    ["Medir con sabiduría y perseverar", "1 Corintios 3:6-7; Gálatas 6:9; Isaías 55:11"],
  ], 10),
  silabo: {
    proposito:
      "Que el que sirve en las comunicaciones de la iglesia sepa anunciar el evangelio en las redes: que entienda que hoy las redes son una plaza donde está la gente, como la plaza donde Pablo hablaba cada día, y que cada red tiene su manera de hablar (según el Centro de Investigaciones Pew, en su encuesta de 2023, el 54 % de los adultos hispanos de los Estados Unidos usaba WhatsApp y el 49 % TikTok); que conozca y escuche a las personas antes de publicar; que publique lo que es verdadero y edifica, en el formato que conviene; que acompañe a los que escriben, de la pantalla a la mesa de la iglesia; que escriba una política de redes que cuide las cuentas y proteja a los niños, con lo que pide la ley COPPA para los menores de 13 años; y que mida con sabiduría, sabiendo que Dios da el crecimiento. No repite Evangelismo personal avanzado ni Evangelismo entre jóvenes. Lo legal es una guía general, no un consejo legal. Su base es la palabra de Jesús: «Lo que os digo en tinieblas, decidlo en la luz; y lo que oís al oído, proclamadlo desde las azoteas» (Mateo 10:27).",
    objetivos: [
      { id: "o1", texto: "Explicar por qué las redes son hoy una plaza para anunciar el evangelio.", bloom: "comprender" },
      { id: "o2", texto: "Conocer y escuchar a las personas que la iglesia quiere alcanzar antes de publicar.", bloom: "aplicar" },
      { id: "o3", texto: "Publicar lo que es verdadero y edifica, en el formato que conviene.", bloom: "aplicar" },
      { id: "o4", texto: "Acompañar a los que escriben, de la pantalla a la comunidad de la iglesia.", bloom: "aplicar" },
      { id: "o5", texto: "Escribir una política de redes que cuide las cuentas y proteja a los niños.", bloom: "aplicar" },
      { id: "o6", texto: "Evaluar los números de las redes con sabiduría y perseverar.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar Mateo 10:27 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "La plaza digital y las redes que usa la gente, el público y su retrato, los formatos y el contenido que edifica, el seguimiento de los que escriben, la política de redes con la ley COPPA, y los números que importan.",
      ser: "Un comunicador que anuncia a Cristo con verdad y con gracia, que escucha antes de hablar y que cuida a las personas más que a los números.",
      hacer: "Elegir las redes de la iglesia, hacer el retrato de una persona, planear una semana de publicaciones, responder y acompañar a los que escriben, escribir la política de redes y leer los números del mes.",
    },
    bibliografia: {
      basica: [
        { autor: "Robert E. Coleman", titulo: "Plan supremo de evangelización", editorial: "Casa Bautista de Publicaciones" },
        { autor: "Rebecca Manley Pippert", titulo: "Sal: en un mundo cambiante, el evangelio sigue siendo relevante", editorial: "Andamio" },
      ],
      complementaria: [
        { autor: "Neil Postman", titulo: "Divertirse hasta morir: el discurso público en la era del show business", editorial: "Ediciones de la Tempestad" },
        { autor: "Tony Reinke", titulo: "12 Ways Your Phone Is Changing You (en inglés)", editorial: "Crossway" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Mateo (parte 1)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=3jUPGTb80ms", minutos: 8 },
      { tipo: "video", titulo: "Resumen del libro de Hechos (parte 2)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=ZKaaHQUdVCY", minutos: 9 },
      { tipo: "lectura", titulo: "Lectura ampliada: Hechos 17, Pablo en la plaza y en el Areópago", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Hechos&cap=17" },
      { tipo: "guia", titulo: "El uso de las redes sociales en los Estados Unidos, 2024 (en inglés)", fuente: "Pew Research Center", url: "https://www.pewresearch.org/internet/2024/01/31/americans-social-media-use/" },
    ],
  },
  disponible: true,
};

const RADIO_CRISTIANA: MateriaDef = {
  id: "comunicaciones-2",
  nivel: null,
  especialidad: "comunicaciones",
  orden: 2,
  titulo: "Radio cristiana",
  resumen: "Cómo usar la radio para el evangelio: la radio y su historia, la voz y el micrófono, la programación, la música y los derechos de autor, las reglas de la FCC para las emisoras no comerciales, y la atención de los oyentes.",
  base: "Romanos 10:17; Salmos 19:4",
  memoria: "Romanos 10:17",
  lecciones: lecciones("comunicaciones-2", [
    ["La radio al servicio del evangelio", "Romanos 10:14-15; Romanos 10:17; Salmos 19:4"],
    ["La voz y el micrófono", "Nehemías 8:8; Proverbios 15:23; Colosenses 4:3-4"],
    ["La programación de una radio cristiana", "Eclesiastés 3:1; Salmos 96:1-3; Efesios 5:19"],
    ["La música y los derechos de autor", "Éxodo 20:15; Romanos 13:7; Lucas 10:7"],
    ["La radio al aire y sus reglas", "Tito 3:1; 1 Pedro 2:13-14; Lucas 16:10"],
    ["Los oyentes: llamadas, pedidos y comunidad", "Juan 10:27; Hechos 16:14; Santiago 1:19"],
  ], 10),
  silabo: {
    proposito:
      "Que el que sirve en la radio de la iglesia sepa usarla para el evangelio: que entienda que la fe viene por el oír, y conozca cómo empezó la radio cristiana, con una de las primeras transmisiones de un culto, en Pittsburgh en 1921, y con HCJB, que salió al aire en Quito en 1931; que elija la clase de radio que le conviene a su iglesia; que hable con claridad, calidez y buen ritmo, y escriba para oír; que arme una programación pensada para quien escucha a cada hora; que ponga en regla la música, con las licencias de las canciones, de las sociedades de autores, y de las grabaciones, de SoundExchange; que, si tiene una emisora de AM o FM, obedezca las reglas de la FCC: la licencia, la identificación cada hora y el apoyo de los patrocinadores sin llamar a comprar; y que atienda a los oyentes con cuidado. Lo legal es una guía general, no un consejo legal. Su base es la palabra de Pablo: «Así que la fe es por el oír, y el oír, por la palabra de Dios» (Romanos 10:17).",
    objetivos: [
      { id: "o1", texto: "Explicar por qué la radio sirve al evangelio, y elegir la clase de radio que le conviene a una iglesia.", bloom: "comprender" },
      { id: "o2", texto: "Hablar con claridad, calidez y buen ritmo, y escribir para oír.", bloom: "aplicar" },
      { id: "o3", texto: "Armar una programación pensada para quien escucha a cada hora.", bloom: "aplicar" },
      { id: "o4", texto: "Poner en regla la música de una radio, con las licencias de las canciones y de las grabaciones.", bloom: "aplicar" },
      { id: "o5", texto: "Aplicar las reglas de la FCC para una emisora no comercial: la licencia, la identificación y los patrocinadores.", bloom: "aplicar" },
      { id: "o6", texto: "Evaluar cómo atiende la radio a sus oyentes, también a un oyente en crisis.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar Romanos 10:17 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "La historia de la radio cristiana, las clases de radio, la voz y la escritura para oír, la programación, las licencias de la música y las reglas de la FCC para las emisoras no comerciales.",
      ser: "Un comunicador fiel y cuidadoso, que habla para que lo entiendan, respeta el trabajo de otros y escucha a sus oyentes.",
      hacer: "Preparar y grabar un mensaje corto, armar la parrilla de un día, poner en regla la música, escribir el agradecimiento a un patrocinador y atender las llamadas al aire.",
    },
    bibliografia: {
      basica: [
        { autor: "Mario Kaplún", titulo: "Producción de programas de radio: el guion, la realización", editorial: "CIESPAL" },
        { autor: "José Ignacio López Vigil", titulo: "Manual urgente para radialistas apasionados", editorial: "Edición libre del autor (2005)" },
      ],
      complementaria: [
        { autor: "John Stott", titulo: "La predicación: puente entre dos mundos", editorial: "Libros Desafío" },
        { autor: "Tona J. Hangen", titulo: "Redeeming the Dial: Radio, Religion, and Popular Culture in America (en inglés)", editorial: "University of North Carolina Press" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Romanos (parte 2)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=ZqScL0dHLsM", minutos: 10 },
      { tipo: "video", titulo: "Resumen de los libros de Esdras y Nehemías", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=OGdiLZ92nQs", minutos: 10 },
      { tipo: "lectura", titulo: "Lectura ampliada: Romanos 10, la fe viene por el oír", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Romanos&cap=10" },
      { tipo: "guia", titulo: "La radio FM de baja potencia (LPFM) (en inglés)", fuente: "Comisión Federal de Comunicaciones (FCC)", url: "https://www.fcc.gov/lpfm" },
    ],
  },
  disponible: true,
};

const VIDEO_TRANSMISIONES: MateriaDef = {
  id: "comunicaciones-3",
  nivel: null,
  especialidad: "comunicaciones",
  orden: 3,
  titulo: "Video y transmisiones",
  resumen: "Cómo usar el video para el evangelio: las clases de video de una iglesia, contar historias como los testimonios, la cámara y la luz, la transmisión del culto, los derechos y los permisos, y la edición honesta.",
  base: "1 Juan 1:3; Habacuc 2:2",
  memoria: "1 Juan 1:3",
  lecciones: lecciones("comunicaciones-3", [
    ["El video al servicio del evangelio", "1 Juan 1:1-3; Juan 20:30-31; Habacuc 2:2"],
    ["Contar historias con imágenes", "Marcos 5:19; Mateo 13:34; Salmos 107:2"],
    ["La cámara y la luz", "Colosenses 3:23; Proverbios 22:29; Eclesiastés 9:10"],
    ["La transmisión del culto", "Hebreos 10:24-25; Hechos 2:42; Salmos 22:22"],
    ["Los derechos y los permisos en video", "Romanos 12:17; 2 Corintios 8:21; Proverbios 3:27"],
    ["Editar y publicar con propósito", "1 Corintios 14:9; Hechos 2:8; Eclesiastés 12:10"],
  ], 10),
  silabo: {
    proposito:
      "Que el que sirve en el video de la iglesia sepa usarlo para el evangelio: que anuncie lo que ha visto y oído de Cristo, con la clase de video que conviene a cada propósito; que cuente historias verdaderas, como los testimonios, con su antes, su encuentro con Cristo y su después, y con el permiso de cada persona; que cuide lo básico de la imagen: la cámara quieta, el encuadre y la luz; que prepare la transmisión del culto con una prueba, un plan por si falla y un anfitrión en el chat, cuidando la intimidad de los que oran y a los niños, y animando a congregarse; que tenga en regla la música, las imágenes y los permisos, con la licencia de transmisión de CCLI, sabiendo que en YouTube un reclamo de Content ID afecta al video y una falta por infracción de derechos de autor cuenta contra el canal (tres en 90 días pueden hacer que se cancele); y que edite con verdad, con subtítulos y títulos honestos. El sonido se estudia en Sonido y técnica al servicio del culto, de la especialidad Alabanza. Lo legal es una guía general, no un consejo legal. Su base es la palabra de Juan: «lo que hemos visto y oído, eso os anunciamos, para que también vosotros tengáis comunión con nosotros» (1 Juan 1:3).",
    objetivos: [
      { id: "o1", texto: "Explicar para qué usa la iglesia el video, y planear un ministerio de video.", bloom: "comprender" },
      { id: "o2", texto: "Armar y grabar un testimonio en video que honre a Dios.", bloom: "aplicar" },
      { id: "o3", texto: "Grabar con la cámara quieta, un buen encuadre y la luz adecuada.", bloom: "aplicar" },
      { id: "o4", texto: "Preparar la transmisión del culto y cuidar a las personas.", bloom: "aplicar" },
      { id: "o5", texto: "Tener en regla la música, las imágenes y los permisos de un video.", bloom: "aplicar" },
      { id: "o6", texto: "Evaluar la edición de un video: el corte, los subtítulos, el título y la portada.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar 1 Juan 1:3 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "Las clases de video, el testimonio y sus partes, el lenguaje de la imagen, la transmisión del culto, las licencias y los permisos, las reglas de YouTube sobre los derechos de autor y la edición honesta.",
      ser: "Un comunicador que anuncia lo que ha visto de Cristo, cuida la dignidad de las personas y trabaja de corazón, como para el Señor.",
      hacer: "Planear un ministerio de video, grabar un testimonio y un anuncio, preparar una transmisión, poner en regla la música y los permisos, y editar un video corto con subtítulos.",
    },
    bibliografia: {
      basica: [
        { autor: "Marcel Martin", titulo: "El lenguaje del cine", editorial: "Gedisa" },
        { autor: "Robert McKee", titulo: "El guion: sustancia, estructura, estilo y principios de la escritura de guiones", editorial: "Alba Editorial" },
      ],
      complementaria: [
        { autor: "Neil Postman", titulo: "Divertirse hasta morir: el discurso público en la era del show business", editorial: "Ediciones de la Tempestad" },
        { autor: "Phil Cooke", titulo: "Unique: Telling Your Story in the Age of Brands and Social Media (en inglés)", editorial: "Baker Books" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen de los libros de 1-3 Juan", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=wQtMnuBzb4c", minutos: 11 },
      { tipo: "video", titulo: "Resumen del libro de Marcos", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=gsXLQkppzUc", minutos: 11 },
      { tipo: "lectura", titulo: "Lectura ampliada: Marcos 5, cuéntales cuán grandes cosas ha hecho el Señor", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Marcos&cap=5" },
      { tipo: "guia", titulo: "Las faltas por infracción de derechos de autor en YouTube", fuente: "Ayuda de YouTube", url: "https://support.google.com/youtube/answer/2814000?hl=es" },
    ],
  },
  disponible: true,
};

const REDACCION_COMUNICACION: MateriaDef = {
  id: "comunicaciones-4",
  nivel: null,
  especialidad: "comunicaciones",
  orden: 4,
  titulo: "Redacción y comunicación",
  resumen: "Cómo escribir y hablar con claridad en nombre de la iglesia: la palabra escrita al servicio del evangelio, el lenguaje claro, los anuncios, los boletines y los mensajes, las historias verdaderas, hablar en público y comunicar en una crisis.",
  base: "Colosenses 4:6; Lucas 1:1-4",
  memoria: "Colosenses 4:6",
  lecciones: lecciones("comunicaciones-4", [
    ["La palabra escrita al servicio del evangelio", "Lucas 1:1-4; Jeremías 30:2; Romanos 15:4"],
    ["Escribir claro", "1 Corintios 14:19; Mateo 5:37; Proverbios 15:2"],
    ["Los anuncios, los boletines y los mensajes", "Hechos 15:30-31; Lucas 14:21; Proverbios 25:25"],
    ["Escribir una historia o un artículo", "Proverbios 18:13; Proverbios 18:17; Éxodo 23:1"],
    ["Hablar en público", "Efesios 4:15; Proverbios 16:24; Hechos 2:14"],
    ["Comunicar en una crisis", "Efesios 4:25; Proverbios 26:20; Proverbios 15:1"],
  ], 10),
  silabo: {
    proposito:
      "Que el que sirve en las comunicaciones de la iglesia escriba y hable con claridad y con verdad: que escriba con cuidado, como Lucas, que investigó con diligencia y escribió por orden; que use el lenguaje claro, pensando en el lector, con lo más importante primero, frases cortas y palabras de todos los días, en la línea de la Ley de Redacción Clara de 2010, que les pide a las agencias federales de los Estados Unidos escribir de manera clara, breve y bien ordenada; que escriba anuncios que respondan qué, cuándo, dónde, para quién y por qué, adaptados al boletín, a WhatsApp y a las redes, sin cadenas ni datos privados; que escriba historias verdaderas, con los datos comprobados y con el permiso de las personas; que hable en público con preparación y brevedad; y que en una crisis comunique con una sola voz, con la verdad a tiempo y sin chismes, reportando el abuso de un menor como pide la ley de Texas. Lo legal es una guía general, no un consejo legal. Su base es la palabra de Pablo: «Sea vuestra palabra siempre con gracia, sazonada con sal, para que sepáis cómo debéis responder a cada uno» (Colosenses 4:6).",
    objetivos: [
      { id: "o1", texto: "Explicar por qué la iglesia escribe con cuidado, y reconocer sus escritos.", bloom: "comprender" },
      { id: "o2", texto: "Escribir en lenguaje claro y reescribir un texto confuso.", bloom: "aplicar" },
      { id: "o3", texto: "Escribir un anuncio y adaptarlo al boletín, a WhatsApp y a las redes.", bloom: "aplicar" },
      { id: "o4", texto: "Escribir una historia verdadera, con los datos comprobados y con permiso.", bloom: "aplicar" },
      { id: "o5", texto: "Preparar y dar los anuncios del culto, y presentar a un invitado.", bloom: "aplicar" },
      { id: "o6", texto: "Evaluar cómo comunica la iglesia en una crisis o ante un rumor.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar Colosenses 4:6 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "Los escritos de una iglesia, los principios del lenguaje claro, las cinco preguntas de un anuncio, las partes de una historia, cómo hablar en público y los pasos para comunicar en una crisis.",
      ser: "Un comunicador que escribe y habla siguiendo la verdad en amor, que averigua antes de escribir y que frena el chisme.",
      hacer: "Escribir la presentación de la iglesia, reescribir un anuncio confuso, adaptar un anuncio a tres lugares, escribir la historia de un evento, dar los anuncios del culto y responder a un rumor.",
    },
    bibliografia: {
      basica: [
        { autor: "Daniel Cassany", titulo: "La cocina de la escritura", editorial: "Anagrama" },
        { autor: "Real Academia Española", titulo: "Libro de estilo de la lengua española según la norma panhispánica", editorial: "Espasa" },
      ],
      complementaria: [
        { autor: "Ken Sande", titulo: "Pacificadores: guía bíblica para la resolución de conflictos personales", editorial: "Peacemaker Ministries" },
        { autor: "William Strunk Jr. y E. B. White", titulo: "The Elements of Style (en inglés)", editorial: "Longman" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Colosenses", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=AG4jqCUapng", minutos: 10 },
      { tipo: "video", titulo: "Resumen de los libros de Esdras y Nehemías", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=OGdiLZ92nQs", minutos: 10 },
      { tipo: "lectura", titulo: "Lectura ampliada: Lucas 1, investigar con diligencia y escribir por orden", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Lucas&cap=1" },
      { tipo: "guia", titulo: "Consultas sobre el buen uso del español", fuente: "FundéuRAE", url: "https://www.fundeu.es/" },
    ],
  },
  disponible: true,
};

const ETICA_SEGURIDAD_DIGITAL: MateriaDef = {
  id: "comunicaciones-5",
  nivel: null,
  especialidad: "comunicaciones",
  orden: 5,
  titulo: "Ética y seguridad digital",
  resumen: "Cómo comunicar con ética y cuidar a las personas en internet: los compromisos del comunicador cristiano, la privacidad, las cuentas y las contraseñas seguras, las estafas en línea, la inteligencia artificial y la verdad, y cómo moderar y proteger en las redes de la iglesia.",
  base: "Mateo 10:16; 2 Corintios 4:2",
  memoria: "Mateo 10:16",
  lecciones: lecciones("comunicaciones-5", [
    ["La ética del comunicador cristiano", "2 Corintios 4:2; 1 Tesalonicenses 2:3-5; Proverbios 11:1"],
    ["La privacidad y la dignidad de las personas", "Proverbios 11:13; Mateo 7:12; Proverbios 22:1"],
    ["Cuentas y contraseñas seguras", "Nehemías 4:9; Lucas 16:10; Proverbios 27:12"],
    ["Las estafas y el engaño en línea", "Mateo 10:16; Proverbios 14:15; 2 Corintios 11:14"],
    ["La inteligencia artificial y la verdad", "Éxodo 20:16; Colosenses 3:9; 1 Tesalonicenses 5:21"],
    ["Moderar y proteger en las redes de la iglesia", "Romanos 12:18; Proverbios 26:4; Mateo 18:6"],
  ], 10),
  silabo: {
    proposito:
      "Que el que sirve en las comunicaciones de la iglesia lo haga con ética y cuide a las personas en internet: que diga la verdad, sin títulos engañosos ni números inflados, sin manipular, dando el crédito y diciendo cuándo algo es pagado, como pide la Comisión Federal de Comercio (FTC); que guarde la información de las personas, con las peticiones de oración compartidas solo con permiso y las fotos de los niños con el permiso escrito de sus padres, como pide la ley COPPA para los menores de 13 años; que proteja las cuentas de la iglesia con los cuatro pasos de la CISA: contraseñas fuertes, la verificación en dos pasos con un administrador de contraseñas, reconocer el phishing y actualizar los programas; que reconozca las estafas, como la del pastor falso que pide tarjetas de regalo, de la que alertó el Fiscal General de Texas; que use la inteligencia artificial con la verdad, sabiendo que la FCC aclaró en 2024 que las voces hechas con ella cuentan como voces artificiales en las llamadas automáticas; y que modere las redes con normas claras, sin que ningún adulto se escriba en privado con un menor, reportando el abuso como pide la ley de Texas y la explotación en internet a la CyberTipline. Lleva a las comunicaciones lo que enseña Protección de menores, de la especialidad Niñez, sin repetirla. Lo legal es una guía general, no un consejo legal. Su base es la palabra de Jesús: «He aquí, yo os envío como a ovejas en medio de lobos; sed, pues, prudentes como serpientes, y sencillos como palomas» (Mateo 10:16).",
    objetivos: [
      { id: "o1", texto: "Explicar los compromisos del comunicador cristiano, y revisar una publicación con ellos.", bloom: "comprender" },
      { id: "o2", texto: "Cuidar la información y la dignidad de las personas en las comunicaciones de la iglesia.", bloom: "aplicar" },
      { id: "o3", texto: "Proteger las cuentas de la iglesia con contraseñas fuertes, la verificación en dos pasos y el control de los accesos.", bloom: "aplicar" },
      { id: "o4", texto: "Reconocer y responder a las estafas en línea, como la del pastor falso.", bloom: "aplicar" },
      { id: "o5", texto: "Evaluar el uso de la inteligencia artificial y examinar un contenido antes de compartirlo.", bloom: "evaluar" },
      { id: "o6", texto: "Moderar las redes de la iglesia y proteger a los menores.", bloom: "aplicar" },
      { id: "o7", texto: "Recitar Mateo 10:16 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "Los compromisos del comunicador cristiano, los datos que se cuidan y la ley COPPA, los cuatro pasos de la CISA, las señales de un engaño y la estafa del pastor falso, la inteligencia artificial y las voces falsas, y las normas de la comunidad.",
      ser: "Un comunicador prudente como serpiente y sencillo como paloma, que no engaña, guarda lo que le confían y protege a los más vulnerables.",
      hacer: "Revisar una publicación con preguntas de ética, armar un formulario de peticiones de oración, quitar los accesos de quien deja el equipo, responder a un mensaje del pastor falso, examinar un video antes de compartirlo y responder a un perfil falso que escribe a los jóvenes.",
    },
    bibliografia: {
      basica: [
        { autor: "Javier Darío Restrepo", titulo: "El zumbido y el moscardón: taller y consultorio de ética periodística", editorial: "Fondo de Cultura Económica y Fundación para un Nuevo Periodismo Iberoamericano" },
        { autor: "Carissa Véliz", titulo: "Privacidad es poder: datos, vigilancia y libertad en la era digital", editorial: "Debate" },
      ],
      complementaria: [
        { autor: "Marta Peirano", titulo: "El enemigo conoce el sistema: manipulación de ideas, personas e influencias después de la economía de la atención", editorial: "Debate" },
        { autor: "Jason Thacker", titulo: "The Age of AI: Artificial Intelligence and the Future of Humanity (en inglés)", editorial: "Zondervan" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de 1 Pedro", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=NXRkCxeO-C4", minutos: 10 },
      { tipo: "video", titulo: "Resumen del libro de Santiago", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=yDqK_U-ipfc", minutos: 9 },
      { tipo: "lectura", titulo: "Lectura ampliada: Mateo 10, prudentes como serpientes y sencillos como palomas", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Mateo&cap=10" },
      { tipo: "guia", titulo: "Secure Our World: los cuatro pasos para estar seguros en línea (en inglés)", fuente: "Agencia de Ciberseguridad y Seguridad de Infraestructura (CISA)", url: "https://www.cisa.gov/secure-our-world" },
    ],
  },
  disponible: true,
};

const ADMINISTRACION_ECLESIASTICA: MateriaDef = {
  id: "liderazgo-administracion-1",
  nivel: null,
  especialidad: "liderazgo-administracion",
  orden: 1,
  titulo: "Administración eclesiástica",
  resumen: "Cómo administrar la iglesia para que la obra siga en orden: la administración al servicio del reino, los registros y el archivo, las reuniones y las actas, el templo y los bienes, los riesgos y los seguros, y los procesos y los manuales.",
  base: "Proverbios 24:3; Hechos 6:2-4",
  memoria: "Proverbios 24:3",
  lecciones: lecciones("liderazgo-administracion-1", [
    ["La administración al servicio del reino", "Hechos 6:2-4; 1 Corintios 12:28; Tito 1:5"],
    ["Los registros y el archivo", "Esdras 2:62; Jeremías 32:14; Esdras 8:33-34"],
    ["Las reuniones y las actas", "Hechos 15:6; Hechos 15:22; Hechos 15:28"],
    ["El templo y los bienes", "2 Reyes 12:5; 2 Crónicas 24:13; Proverbios 27:23"],
    ["Los riesgos y los seguros", "Proverbios 22:3; Lucas 14:28; Eclesiastés 11:2"],
    ["Los procesos y los manuales", "Éxodo 18:20-21; 1 Corintios 14:33; Proverbios 24:3"],
  ], 10),
  silabo: {
    proposito:
      "Que el que sirve en la administración de la iglesia la ordene para que la obra siga y el pastor se dedique a la oración y a la Palabra: que haga el diagnóstico de sus áreas, las personas, los registros, el edificio, el dinero, el calendario y la comunicación, con prioridades y responsables; que guarde bien los registros, con un archivo con llave, una copia digital y el tiempo que pide la ley, como los 4 años que el IRS pide para la nómina; que prepare y dirija las reuniones con agenda y quórum, y que escriba sus actas; que cuide el templo y los bienes con un plan de mantenimiento, el inventario y la seguridad; que prevea los riesgos de cada actividad y revise los seguros, sabiendo que en Texas un empleador privado puede no tener seguro de compensación laboral si avisa como pide la ley; y que escriba los procesos y el manual de la iglesia. Baja a la práctica lo que enseña Administración y gobierno de la iglesia (Nivel 5), sin repetirla. Lo legal es una guía general, no un consejo legal. Su base es la palabra de los Proverbios: «Con sabiduría se edificará la casa, Y con prudencia se afirmará» (Proverbios 24:3).",
    objetivos: [
      { id: "o1", texto: "Explicar para qué sirve la administración en la iglesia y hacer su diagnóstico.", bloom: "comprender" },
      { id: "o2", texto: "Ordenar los registros y el archivo de la iglesia.", bloom: "aplicar" },
      { id: "o3", texto: "Preparar y dirigir una reunión, y escribir su acta.", bloom: "aplicar" },
      { id: "o4", texto: "Organizar el cuidado del templo y de los bienes.", bloom: "aplicar" },
      { id: "o5", texto: "Evaluar los riesgos de una actividad y los seguros de la iglesia.", bloom: "evaluar" },
      { id: "o6", texto: "Escribir un procedimiento y armar el manual de la iglesia.", bloom: "crear" },
      { id: "o7", texto: "Recitar Proverbios 24:3 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "Las áreas de la administración, los registros de una iglesia y cuánto se guardan, la agenda, el quórum y el acta, el mantenimiento, el inventario y la seguridad, el manejo de los riesgos y los seguros, y los procedimientos y el manual.",
      ser: "Un administrador que sirve para que otros sirvan, fiel en lo poco, que prevé con sabiduría y deja todo en orden.",
      hacer: "Hacer el diagnóstico de una iglesia, ordenar su archivo, escribir un acta, hacer el plan de mantenimiento del año, el inventario de riesgos de un campamento y el procedimiento para reservar el templo.",
    },
    bibliografia: {
      basica: [
        { autor: "Wilfredo Calderón", titulo: "La administración en la iglesia cristiana", editorial: "Vida" },
        { autor: "Peter F. Drucker", titulo: "Dirección de instituciones sin fines de lucro: teoría y práctica", editorial: "El Ateneo" },
      ],
      complementaria: [
        { autor: "Bruce P. Powers (ed.)", titulo: "Church Administration Handbook (en inglés)", editorial: "B&H Publishing" },
        { autor: "Richard R. Hammar", titulo: "Pastor, Church & Law (en inglés)", editorial: "Church Law & Tax" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Tito", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=SuJmsIu_1-M", minutos: 10 },
      { tipo: "video", titulo: "Resumen del libro de 1 Timoteo", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=K5xCbQcSsOE", minutos: 11 },
      { tipo: "lectura", titulo: "Lectura ampliada: Hechos 6, los siete que sirvieron para que la Palabra creciera", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Hechos&cap=6" },
      { tipo: "guia", titulo: "Guía tributaria para iglesias y organizaciones religiosas, Publicación 1828 (en inglés)", fuente: "Servicio de Impuestos Internos (IRS)", url: "https://www.irs.gov/pub/irs-pdf/p1828.pdf" },
    ],
  },
  disponible: true,
};

const FINANZAS_TRANSPARENCIA: MateriaDef = {
  id: "liderazgo-administracion-2",
  nivel: null,
  especialidad: "liderazgo-administracion",
  orden: 2,
  titulo: "Finanzas y transparencia",
  resumen: "Cómo manejar el dinero de la iglesia con fidelidad y a la luz: los principios y la política financiera, el presupuesto, los controles internos, las ofrendas y sus recibos, los informes y la revisión, y el sostén del pastor y de los empleados.",
  base: "2 Corintios 8:20-21; Lucas 16:10",
  memoria: "2 Corintios 8:20",
  lecciones: lecciones("liderazgo-administracion-2", [
    ["El dinero de Dios en manos de la iglesia", "2 Corintios 8:20-21; Lucas 16:10-11; 1 Corintios 4:2"],
    ["El presupuesto", "Lucas 14:28; Proverbios 21:5; Proverbios 22:7"],
    ["Los controles internos", "2 Reyes 12:10-11; Deuteronomio 19:15; 2 Corintios 8:20-21"],
    ["Las ofrendas y sus recibos", "Marcos 12:41-44; 2 Corintios 9:7; 1 Corintios 16:2-3"],
    ["Los informes y la revisión", "Nehemías 13:13; Lucas 16:2; Romanos 13:8"],
    ["El sostén del pastor y de los empleados", "1 Timoteo 5:17-18; Gálatas 6:6; Lucas 10:7"],
  ], 10),
  silabo: {
    proposito:
      "Que el que sirve en las finanzas de la iglesia maneje el dinero de Dios con fidelidad y a la luz: que escriba la política financiera de la iglesia, con la mayordomía, el propósito de cada ofrenda, los controles y la rendición de cuentas; que arme un presupuesto real, con lo que entró en los últimos doce meses, las misiones desde el principio y una reserva; que aplique los controles internos: la regla de los dos para recoger y contar la ofrenda, la hoja de conteo firmada, las tareas separadas, los pagos con comprobante y la conciliación del banco; que dé a cada donante el reconocimiento escrito que pide el IRS para las donaciones de 250 dólares o más y use las ofrendas designadas para lo que se dieron; que informe al consejo y a la iglesia y organice la revisión anual, sabiendo que las iglesias no presentan el Formulario 990; y que sostenga con dignidad al pastor y a los empleados, con la asignación para vivienda designada antes de pagarla, el Seguro Social del ministro por cuenta propia y un plan de reembolsos con comprobantes. Baja a la práctica lo que enseñan Mayordomía cristiana (Nivel 2) y Administración y gobierno de la iglesia (Nivel 5), sin repetirlas. Lo legal y lo tributario son una guía general, no un consejo legal ni contable. Su base es el cuidado de Pablo con la ofrenda: «evitando que nadie nos censure en cuanto a esta ofrenda abundante que administramos» (2 Corintios 8:20).",
    objetivos: [
      { id: "o1", texto: "Explicar los principios de las finanzas de la iglesia y escribir su política financiera.", bloom: "comprender" },
      { id: "o2", texto: "Armar el presupuesto anual de una iglesia y seguirlo cada mes.", bloom: "aplicar" },
      { id: "o3", texto: "Aplicar los controles internos en el conteo, el depósito y los pagos.", bloom: "aplicar" },
      { id: "o4", texto: "Manejar las ofrendas designadas y los recibos de las donaciones.", bloom: "aplicar" },
      { id: "o5", texto: "Preparar los informes financieros y organizar la revisión anual.", bloom: "aplicar" },
      { id: "o6", texto: "Evaluar el paquete de compensación del pastor con las reglas que pide la ley.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar 2 Corintios 8:20 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "Los principios y la política financiera, el presupuesto, los controles internos, los recibos que pide el IRS y las ofrendas designadas, los informes y la revisión, y las reglas del sostén del pastor.",
      ser: "Un mayordomo fiel en lo poco, que maneja el dinero de Dios a la luz y protege a los que sirven con él.",
      hacer: "Escribir la política financiera, armar el presupuesto del año, organizar el conteo del domingo, preparar un estado anual de donaciones, presentar el informe trimestral y armar el paquete del pastor.",
    },
    bibliografia: {
      basica: [
        { autor: "Inés J. Figueroa", titulo: "La administración de las finanzas de las iglesias", editorial: "Abingdon Press" },
        { autor: "Wilfredo Calderón", titulo: "La administración en la iglesia cristiana", editorial: "Vida" },
      ],
      complementaria: [
        { autor: "Dan Busby, Vonna Laue, Michael Martin y John Van Drunen", titulo: "Zondervan Church and Nonprofit Tax and Financial Guide (en inglés)", editorial: "Zondervan" },
        { autor: "Randy Alcorn", titulo: "El principio del tesoro", editorial: "Unilit" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Hechos (parte 1)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=5h7Q0EK-m8I", minutos: 9 },
      { tipo: "video", titulo: "Resumen del libro de Mateo (parte 2)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=EobkNEf-ySA", minutos: 8 },
      { tipo: "lectura", titulo: "Lectura ampliada: 2 Corintios 8, la ofrenda manejada con honradez", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=2%20Corintios&cap=8" },
      { tipo: "guia", titulo: "Contribuciones caritativas: requisitos de comprobación y divulgación, Publicación 1771 (en inglés)", fuente: "Servicio de Impuestos Internos (IRS)", url: "https://www.irs.gov/pub/irs-pdf/p1771.pdf" },
    ],
  },
  disponible: true,
};

const EQUIPOS_VOLUNTARIOS: MateriaDef = {
  id: "liderazgo-administracion-3",
  nivel: null,
  especialidad: "liderazgo-administracion",
  orden: 3,
  titulo: "Equipos y voluntarios",
  resumen: "Cómo organizar a los que sirven en la iglesia: el cuerpo que sirve y el ciclo del voluntario, invitar y ubicar, seleccionar con cuidado, capacitar y acompañar, cuidar, reconocer y renovar, y las leyes que tocan a los voluntarios.",
  base: "1 Pedro 4:10; 1 Corintios 12:18",
  memoria: "1 Pedro 4:10",
  lecciones: lecciones("liderazgo-administracion-3", [
    ["El cuerpo que sirve", "1 Corintios 12:18-21; 1 Pedro 4:10; Romanos 12:6-8"],
    ["Invitar y ubicar", "Éxodo 35:21; Marcos 3:14; Hechos 6:2-4"],
    ["Seleccionar con cuidado", "1 Timoteo 3:10; 1 Timoteo 5:22; Proverbios 20:6"],
    ["Capacitar y acompañar", "Marcos 6:7; Lucas 10:17; Hebreos 10:24"],
    ["Cuidar, reconocer y renovar", "Éxodo 18:17-18; Romanos 16:1-4; Filipenses 2:29-30"],
    ["La ley y los voluntarios", "Tito 3:1; Romanos 13:1; Proverbios 22:3"],
  ], 10),
  silabo: {
    proposito:
      "Que el que coordina a los voluntarios de la iglesia ayude a cada creyente a servir con su don: que organice el ciclo del voluntario, invitar, ubicar, preparar, acompañar, reconocer y renovar, con un mapa de servicio y un coordinador; que invite en persona, con la descripción de cada puesto y un primer paso pequeño; que seleccione con cuidado a los que sirven con niños, con el dinero o al volante, con la solicitud, las referencias, la revisión de antecedentes y la capacitación de protección; que capacite con la práctica y acompañe a cada voluntario; que cuide al que sirve, repartiendo la carga, reconociendo su trabajo y renovando su compromiso con libertad; y que cumpla las leyes que tocan a los voluntarios: la Ley de Protección del Voluntario de 1997, que no cubre el manejo de vehículos ni la responsabilidad de la iglesia, la ley de Texas del capítulo 84, los 14 centavos por milla y el reporte del abuso de un menor en Texas, de inmediato, y los profesionales a más tardar en 24 horas. Lleva a la gestión de los voluntarios lo que enseñan Liderazgo II (Nivel 5) y Protección de menores (especialidad Niñez), sin repetirlos. Lo legal es una guía general, no un consejo legal. Su base es la palabra de Pedro: «Cada uno según el don que ha recibido, minístrelo a los otros, como buenos administradores de la multiforme gracia de Dios» (1 Pedro 4:10).",
    objetivos: [
      { id: "o1", texto: "Explicar por qué cada creyente tiene un lugar para servir, y el ciclo del voluntario.", bloom: "comprender" },
      { id: "o2", texto: "Invitar en persona y escribir la descripción de un puesto de servicio.", bloom: "aplicar" },
      { id: "o3", texto: "Seleccionar con cuidado a los voluntarios de los puestos delicados.", bloom: "aplicar" },
      { id: "o4", texto: "Capacitar y acompañar a un equipo de voluntarios.", bloom: "aplicar" },
      { id: "o5", texto: "Cuidar, reconocer y renovar a los que sirven.", bloom: "aplicar" },
      { id: "o6", texto: "Evaluar si un programa de voluntarios cumple las leyes que lo tocan.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar 1 Pedro 4:10 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "El ciclo del voluntario y el mapa de servicio, la descripción de un puesto, los pasos de la selección, la capacitación práctica, las señales del cansancio y lo que protegen y no protegen las leyes de los voluntarios.",
      ser: "Un coordinador que ve a cada hermano como un miembro con un don, invita con cariño, cuida a los pequeños y sirve al que sirve.",
      hacer: "Hacer el mapa de servicio, escribir la descripción de un puesto, seleccionar a un voluntario para los niños, capacitar a un equipo, tener la conversación anual con un voluntario cansado y revisar la protección legal del programa.",
    },
    bibliografia: {
      basica: [
        { autor: "Patrick Lencioni", titulo: "Las cinco disfunciones de un equipo", editorial: "Empresa Activa" },
        { autor: "Peter F. Drucker", titulo: "Dirección de instituciones sin fines de lucro: teoría y práctica", editorial: "El Ateneo" },
      ],
      complementaria: [
        { autor: "Isabel Carter", titulo: "La iglesia se moviliza (serie Pilares)", editorial: "Tearfund" },
        { autor: "Ken Sande", titulo: "Pacificadores: guía bíblica para la resolución de conflictos personales", editorial: "Peacemaker Ministries" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Romanos (parte 2)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=ZqScL0dHLsM", minutos: 10 },
      { tipo: "video", titulo: "Resumen del libro de 1 Pedro", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=NXRkCxeO-C4", minutos: 10 },
      { tipo: "lectura", titulo: "Lectura ampliada: 1 Corintios 12, un cuerpo con muchos miembros", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=1%20Corintios&cap=12" },
      { tipo: "guia", titulo: "Ley de Protección del Voluntario de 1997, 42 U.S.C. 14503 (en inglés)", fuente: "Instituto de Información Legal de la Universidad Cornell", url: "https://www.law.cornell.edu/uscode/text/42/14503" },
    ],
  },
  disponible: true,
};

const PLANIFICACION_PROYECTOS: MateriaDef = {
  id: "liderazgo-administracion-4",
  nivel: null,
  especialidad: "liderazgo-administracion",
  orden: 4,
  titulo: "Planificación y proyectos ministeriales",
  resumen: "Cómo planear con fe y llevar los proyectos de la iglesia hasta el final: planificar con fe, la visión, la misión y los valores, las metas y el plan del año, un proyecto de principio a fin, el cronograma, los riesgos y el presupuesto del proyecto, y evaluar y aprender.",
  base: "Proverbios 16:9; Lucas 14:28",
  memoria: "Proverbios 16:9",
  lecciones: lecciones("liderazgo-administracion-4", [
    ["Planificar con fe", "Proverbios 16:9; Santiago 4:13-15; Lucas 14:28"],
    ["La visión, la misión y los valores", "Mateo 28:19-20; Habacuc 2:2; Nehemías 2:17-18"],
    ["Las metas y el plan del año", "Filipenses 3:13-14; 1 Corintios 9:26; Proverbios 21:5"],
    ["Un proyecto de principio a fin", "Nehemías 2:4-5; Nehemías 3:1; Nehemías 6:15"],
    ["El cronograma, los riesgos y el presupuesto", "Lucas 14:28-30; Nehemías 4:16; Proverbios 24:6"],
    ["Evaluar y aprender", "Lamentaciones 3:40; 2 Corintios 13:5; Hechos 14:27"],
  ], 10),
  silabo: {
    proposito:
      "Que el que dirige un ministerio planee con fe y lleve sus proyectos hasta el final: que planee en oración y con humildad, con el ciclo de mirar dónde estamos, decidir adónde vamos, cómo llegar y con qué, y revisar; que escriba con su equipo la misión, la visión y los valores, cortos y alineados con la Gran Comisión y con la visión de la iglesia; que convierta los deseos en pocas metas SMART, como propuso George T. Doran en 1981, y las ponga en el plan del año; que lleve cada proyecto, un esfuerzo temporal para crear un resultado único, como lo define la guía PMBOK, por sus etapas: iniciar con el propósito y el alcance, planear, ejecutar, controlar y cerrar; que use el cronograma, la lista de riesgos con su plan B y el presupuesto con un margen; y que evalúe con números honestos, guarde lo aprendido y cuente a la iglesia lo que Dios hizo. Baja a la práctica de los proyectos el ciclo de planificación de Administración y gobierno de la iglesia (Nivel 5) y el plan de ministerio del Seminario de liderazgo ministerial, sin repetirlos. Su base es la palabra de los Proverbios: «El corazón del hombre piensa su camino; Mas Jehová endereza sus pasos» (Proverbios 16:9).",
    objetivos: [
      { id: "o1", texto: "Explicar cómo se planea con fe y el ciclo de la planificación.", bloom: "comprender" },
      { id: "o2", texto: "Escribir la misión, la visión y los valores de un ministerio.", bloom: "aplicar" },
      { id: "o3", texto: "Escribir metas SMART y armar el plan del año.", bloom: "aplicar" },
      { id: "o4", texto: "Organizar un proyecto ministerial por sus etapas.", bloom: "aplicar" },
      { id: "o5", texto: "Hacer el cronograma, la lista de riesgos y el presupuesto de un proyecto.", bloom: "aplicar" },
      { id: "o6", texto: "Evaluar un proyecto con sus metas y guardar lo aprendido.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar Proverbios 16:9 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "El ciclo de la planificación, la misión, la visión y los valores, las metas SMART, la definición y las etapas de un proyecto, el alcance, el cronograma, los riesgos, el presupuesto y la evaluación.",
      ser: "Un líder que planea con fe y humildad, con su equipo, termina lo que empieza y da gracias a Dios por lo que él hace.",
      hacer: "Preparar un retiro de planificación, escribir la visión de un ministerio, convertir un deseo en una meta SMART, llevar una escuela bíblica como proyecto, hacer el cronograma de una remodelación y evaluar un proyecto.",
    },
    bibliografia: {
      basica: [
        { autor: "Rick Warren", titulo: "Una iglesia con propósito: cómo crecer sin comprometer el mensaje y la misión", editorial: "Vida" },
        { autor: "Henry y Richard Blackaby", titulo: "Liderazgo espiritual: cómo movilizar a las personas hacia el propósito de Dios", editorial: "B&H Español" },
      ],
      complementaria: [
        { autor: "Aubrey Malphurs", titulo: "Advanced Strategic Planning: A 21st-Century Model for Church and Ministry Leaders (en inglés)", editorial: "Baker Books" },
        { autor: "Peter F. Drucker", titulo: "Dirección de instituciones sin fines de lucro: teoría y práctica", editorial: "El Ateneo" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Proverbios", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=pNjt_NfIam8", minutos: 9 },
      { tipo: "video", titulo: "Resumen del libro de 1 Corintios", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=6f0kym4bUmE", minutos: 10 },
      { tipo: "lectura", titulo: "Lectura ampliada: Nehemías 2, la visión y el plan para reedificar el muro", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Nehemias&cap=2" },
      { tipo: "lectura", titulo: "Lectura ampliada: Lucas 14, calcular los gastos antes de edificar", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Lucas&cap=14" },
    ],
  },
  disponible: true,
};

const MARCO_LEGAL_ORGANIZACIONES: MateriaDef = {
  id: "liderazgo-administracion-5",
  nivel: null,
  especialidad: "liderazgo-administracion",
  avanzada: true,
  orden: 5,
  titulo: "Marco legal de las organizaciones religiosas",
  resumen: "Lo que la ley de los Estados Unidos y de Texas protege y pide a una iglesia: la iglesia y el Estado, la forma legal de la iglesia, los impuestos de la iglesia, la iglesia como empleador, la responsabilidad, los seguros y la protección, y la propiedad y el uso del templo.",
  base: "Mateo 22:21; Romanos 13:7",
  memoria: "Mateo 22:21",
  lecciones: lecciones("liderazgo-administracion-5", [
    ["La iglesia y el Estado", "Mateo 22:21; Hechos 5:29; 1 Timoteo 2:1-2"],
    ["La forma legal de la iglesia", "1 Corintios 14:40; Proverbios 11:14; Romanos 12:17"],
    ["Los impuestos de la iglesia", "Romanos 13:7; Mateo 17:27; Marcos 12:17"],
    ["La iglesia como empleador", "Colosenses 4:1; Levítico 19:13; Santiago 5:4"],
    ["Responsabilidad, seguros y protección", "Deuteronomio 22:8; Lucas 17:1-2; Proverbios 22:3"],
    ["La propiedad y el uso del templo", "Jeremías 32:9-10; Génesis 23:16; Lucas 14:28"],
  ], 10),
  silabo: {
    proposito:
      "Que el que dirige o administra una iglesia conozca lo que la ley de los Estados Unidos y de Texas protege y pide, para servir con orden y con buen testimonio: que entienda la libertad religiosa que protegen la Primera Enmienda y la ley de Texas del capítulo 110 (1999), y que, por la enmienda Johnson, la iglesia no apoya ni ataca a candidatos, aunque enseña los temas morales y ora por todas las autoridades; que forme la iglesia como corporación sin fines de lucro, con el Formulario 202, al menos tres directores, estatutos completos, su EIN y la propiedad a su nombre; que sepa que la iglesia que cumple la 501(c)(3) está exenta automáticamente del impuesto federal sobre la renta y no presenta el 990, que en Texas pide la exención de franquicia y ventas con el AP-209 y la del impuesto a la propiedad, y que cumple la nómina de sus empleados; que contrate con justicia y por escrito, sabiendo que la excepción ministerial (Hosanna-Tabor, 2012) y la sección 702 del Título VII protegen la libertad de la iglesia para elegir a sus ministros y preferir a personas de su fe; que cuide a las personas con el deber de cuidado, los seguros y el reporte de los incidentes, y que reporte la sospecha de abuso de un menor como pide el Código de Familia de Texas: toda persona de inmediato, y los profesionales a más tardar en 24 horas, sin pedirle a otro que lo haga por ellos; y que compre y use la propiedad con la zonificación revisada, sabiendo que la ley RLUIPA protege a la iglesia. Profundiza lo legal de Administración y gobierno de la iglesia (Nivel 5), sin repetirlo. Lo legal es una guía general, no un consejo legal. Su base es la palabra de Jesús: «Dad, pues, a César lo que es de César, y a Dios lo que es de Dios» (Mateo 22:21).",
    objetivos: [
      { id: "o1", texto: "Explicar qué protege la libertad religiosa y qué puede y qué no puede hacer la iglesia en las elecciones.", bloom: "comprender" },
      { id: "o2", texto: "Organizar la forma legal de una iglesia en Texas y revisar sus estatutos.", bloom: "aplicar" },
      { id: "o3", texto: "Explicar de qué impuestos está exenta una iglesia y qué debe pedir y cumplir.", bloom: "comprender" },
      { id: "o4", texto: "Contratar y tratar a los empleados de la iglesia como pide la ley y con justicia.", bloom: "aplicar" },
      { id: "o5", texto: "Responder a un accidente y a una sospecha de abuso como pide la ley de Texas.", bloom: "aplicar" },
      { id: "o6", texto: "Evaluar la compra y el uso de una propiedad para la iglesia.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar Mateo 22:21 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "La Primera Enmienda, la ley de Texas del capítulo 110 y la enmienda Johnson, la corporación sin fines de lucro y sus estatutos, las exenciones de impuestos y la nómina, la excepción ministerial y las obligaciones del empleador, el deber de cuidado, los seguros y el reporte del abuso, y la zonificación, la ley RLUIPA y la ADA.",
      ser: "Un líder que da a César lo que es de César y a Dios lo que es de Dios, que cumple la ley con buen testimonio y que obedece a Dios antes que a los hombres.",
      hacer: "Revisar la política de la iglesia para las elecciones, poner en orden los estatutos y la propiedad, revisar las exenciones, contratar a un empleado por escrito, responder a un accidente en el templo, reportar la sospecha de abuso y evaluar la compra de un terreno.",
    },
    bibliografia: {
      basica: [
        { autor: "Wilfredo Calderón", titulo: "La administración en la iglesia cristiana", editorial: "Vida" },
        { autor: "Joe E. Trull y James E. Carter", titulo: "Ética ministerial", editorial: "Mundo Hispano" },
      ],
      complementaria: [
        { autor: "Richard R. Hammar", titulo: "Pastor, Church & Law (en inglés)", editorial: "Church Law & Tax" },
        { autor: "Dan Busby, Vonna Laue, Michael Martin y John Van Drunen", titulo: "Zondervan Church and Nonprofit Tax and Financial Guide (en inglés)", editorial: "Zondervan" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Mateo (parte 2)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=EobkNEf-ySA", minutos: 8 },
      { tipo: "video", titulo: "Resumen del libro de Romanos (parte 2)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=ZqScL0dHLsM", minutos: 10 },
      { tipo: "lectura", titulo: "Lectura ampliada: Romanos 13, las autoridades y lo que debemos", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Romanos&cap=13" },
      { tipo: "guia", titulo: "Guía tributaria para iglesias y organizaciones religiosas, Publicación 1828 (en inglés)", fuente: "Servicio de Impuestos Internos (IRS)", url: "https://www.irs.gov/pub/irs-pdf/p1828.pdf" },
      { tipo: "guia", titulo: "Línea de reportes de abuso de Texas: 1-800-252-5400", fuente: "Departamento de Servicios para la Familia y de Protección de Texas", url: "https://www.txabusehotline.org" },
      { tipo: "guia", titulo: "Ley RLUIPA, el uso religioso de la tierra, 42 U.S.C. 2000cc (en inglés)", fuente: "Instituto de Información Legal de la Universidad Cornell", url: "https://www.law.cornell.edu/uscode/text/42/2000cc" },
    ],
  },
  disponible: true,
};

const TEOLOGIA_COMPASION: MateriaDef = {
  id: "obra-social-1",
  nivel: null,
  especialidad: "obra-social",
  orden: 1,
  titulo: "Teología de la compasión",
  resumen: "La base bíblica del servicio a los necesitados: el Dios que ve al necesitado, la justicia para el pobre en la ley y los profetas, la compasión de Jesús, el buen samaritano, la primera iglesia y los pobres, y la palabra y la obra juntas.",
  base: "Lucas 6:36; Éxodo 3:7",
  memoria: "Lucas 6:36",
  lecciones: lecciones("obra-social-1", [
    ["El Dios que ve al necesitado", "Éxodo 3:7; Deuteronomio 10:18; Salmos 146:9"],
    ["La ley y los profetas: justicia para el pobre", "Levítico 19:9-10; Deuteronomio 15:11; Isaías 58:6-7"],
    ["Jesús, movido a compasión", "Mateo 9:36; Lucas 4:18-19; Lucas 7:13"],
    ["¿Quién es mi prójimo?", "Lucas 10:33-34; Lucas 10:36-37; Mateo 25:40"],
    ["La primera iglesia y los pobres", "Hechos 4:34-35; Gálatas 2:10; 2 Corintios 8:13-14"],
    ["La palabra y la obra juntas", "Santiago 2:15-17; 1 Juan 3:17-18; Efesios 2:10"],
  ], 10),
  silabo: {
    proposito:
      "Que el que sirve en la obra social conozca el corazón compasivo de Dios y sirva desde él: que vea, como Dios, la aflicción del huérfano, la viuda, el extranjero y el pobre, cada uno con su nombre y como imagen de Dios; que aprenda de la ley de Moisés y de los profetas a cuidar al pobre con dignidad, abriendo espigas y no solo dando regalos, y a unir el culto con la justicia; que imite la compasión de Jesús, que veía, se acercaba, sanaba, daba de comer y anunciaba el reino; que viva la parábola del buen samaritano, haciendo bien a todos, y mayormente a los de la familia de la fe; que organice la ayuda como la primera iglesia, con un equipo de buen testimonio y cuentas claras; y que una la palabra y la obra en la misión integral, como afirma el Pacto de Lausana de 1974, que dice también que la evangelización es primordial, distinguiendo el alivio, la rehabilitación y el desarrollo para ayudar sin hacer daño, como enseñan Corbett y Fikkert. Es la base bíblica de las otras cuatro materias de la especialidad. Su base es la palabra de Jesús: «Sed, pues, misericordiosos, como también vuestro Padre es misericordioso» (Lucas 6:36).",
    objetivos: [
      { id: "o1", texto: "Explicar cómo ve Dios al necesitado y quiénes son los cuatro vulnerables de la ley.", bloom: "comprender" },
      { id: "o2", texto: "Explicar cómo cuidaba la ley al pobre y qué enseñaron los profetas sobre el culto y la justicia.", bloom: "comprender" },
      { id: "o3", texto: "Describir la compasión de Jesús y distinguirla de la lástima.", bloom: "comprender" },
      { id: "o4", texto: "Aplicar la parábola del buen samaritano a una persona necesitada que es diferente.", bloom: "aplicar" },
      { id: "o5", texto: "Proponer una manera de organizar la ayuda en la iglesia, como la primera iglesia.", bloom: "aplicar" },
      { id: "o6", texto: "Evaluar una ayuda con la misión integral y la distinción entre alivio, rehabilitación y desarrollo.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar Lucas 6:36 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "El Dios que ve al necesitado, los cuatro vulnerables, la espiga, el diezmo del tercer año y el año de remisión, los profetas y la justicia, la compasión de Jesús, el buen samaritano, la primera iglesia y los pobres, el Pacto de Lausana y el alivio, la rehabilitación y el desarrollo.",
      ser: "Un siervo compasivo como su Padre, que mira a cada persona con su nombre y la trata con dignidad, y que une la palabra y la obra.",
      hacer: "Hacer el mapa de los necesitados del barrio, abrir espigas además de dar despensas, acompañar a una viuda, ayudar a una persona sin hogar, organizar la ayuda de la iglesia y evaluar si una ayuda levanta o crea dependencia.",
    },
    bibliografia: {
      basica: [
        { autor: "Timothy Keller", titulo: "Justicia generosa: cómo la gracia de Dios nos hace justos", editorial: "Andamio" },
        { autor: "C. René Padilla", titulo: "Misión integral: ensayos sobre el Reino de Dios y la iglesia", editorial: "Ediciones Kairós" },
      ],
      complementaria: [
        { autor: "Steve Corbett y Brian Fikkert", titulo: "Cuando ayudar hace daño: cómo aliviar la pobreza sin lastimar a los pobres ni a uno mismo", editorial: "Vida" },
        { autor: "John Stott", titulo: "La fe cristiana frente a los desafíos contemporáneos", editorial: "Nueva Creación" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Rut", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=f984fG4-xlE", minutos: 8 },
      { tipo: "video", titulo: "Resumen del libro de Santiago", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=yDqK_U-ipfc", minutos: 9 },
      { tipo: "lectura", titulo: "Lectura ampliada: Lucas 10, el buen samaritano", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Lucas&cap=10" },
      { tipo: "lectura", titulo: "Lectura ampliada: Isaías 58, el ayuno que Dios escogió", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Isaias&cap=58" },
    ],
  },
  disponible: true,
};

const DIACONIA_SERVICIO: MateriaDef = {
  id: "obra-social-2",
  nivel: null,
  especialidad: "obra-social",
  orden: 2,
  titulo: "Diaconía y servicio",
  resumen: "Cómo sirve la iglesia a los necesitados con orden y con amor: la diaconía como servicio, el carácter y el orden de los que sirven, el fondo de ayuda, el cuidado práctico, escuchar y orientar, y el corazón del que sirve.",
  base: "Santiago 1:27; Marcos 10:45",
  memoria: "Santiago 1:27",
  lecciones: lecciones("obra-social-2", [
    ["La diaconía: servir como Cristo", "Marcos 10:45; Juan 13:14-15; 1 Pedro 4:11"],
    ["Los que sirven: carácter y orden", "Hechos 6:2-3; 1 Timoteo 3:8-10; Romanos 16:1-2"],
    ["El fondo de ayuda", "1 Timoteo 5:4; 2 Tesalonicenses 3:10; 2 Corintios 8:21"],
    ["El cuidado práctico", "Romanos 12:13; Proverbios 3:27-28; Hechos 9:39"],
    ["Escuchar y orientar", "Proverbios 18:13; Proverbios 14:15; 1 Tesalonicenses 5:14"],
    ["El corazón del que sirve", "Filipenses 2:3-4; Mateo 6:3-4; Gálatas 6:9"],
  ], 10),
  silabo: {
    proposito:
      "Que el que sirve en la misericordia de la iglesia lo haga como Jesús y con orden: que entienda que la diaconía es el servicio, que Jesús vino a servir y nos dio ejemplo, y que cada uno sirve con su don y con el poder que Dios da; que forme un equipo de buen testimonio, honesto y probado primero, con funciones claras, como los siete de Hechos 6; que maneje un fondo de ayuda con los principios bíblicos de la familia primero, el trabajo y la honradez, y con reglas escritas: criterios, un límite por familia, decisión en equipo, pago directo y registro, sabiendo que, según la Publicación 526 del IRS, no se deduce lo que se da señalado para una persona en particular; que organice el cuidado práctico de comidas, transporte, reparaciones y compañía, con respeto y seguridad; que escuche antes de ayudar, con prudencia y confidencialidad, y oriente hacia los recursos de la comunidad, como el 2-1-1 de Texas, reportando la sospecha de abuso de un menor como pide la ley: toda persona de inmediato, y los profesionales a más tardar en 24 horas; y que sirva con humildad, sin buscar aplauso, con límites y descanso. Quién ejerce cada cargo, y el ministerio de la mujer, quedan para la declaración de fe del ministerio. Lo legal es una guía general, no un consejo legal. Su base es la palabra de Santiago: «La religión pura y sin mácula delante de Dios el Padre es esta: Visitar a los huérfanos y a las viudas en sus tribulaciones» (Santiago 1:27).",
    objetivos: [
      { id: "o1", texto: "Explicar qué es la diaconía y por qué toda la iglesia sirve.", bloom: "comprender" },
      { id: "o2", texto: "Formar un equipo de misericordia con personas probadas y funciones claras.", bloom: "aplicar" },
      { id: "o3", texto: "Escribir las reglas de un fondo de ayuda y decidir un pedido con ellas.", bloom: "aplicar" },
      { id: "o4", texto: "Organizar el cuidado práctico de una persona enferma o sola.", bloom: "aplicar" },
      { id: "o5", texto: "Hacer una primera entrevista y orientar hacia los recursos de la comunidad.", bloom: "aplicar" },
      { id: "o6", texto: "Evaluar el propio servicio y hacer un plan para servir por largo tiempo.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar Santiago 1:27 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "La diaconía y los dones de servicio y de misericordia, el carácter de los que sirven según Hechos 6 y 1 Timoteo 3, las reglas de un fondo de ayuda y la Publicación 526, el cuidado práctico, la primera entrevista, el 2-1-1 de Texas y el reporte del abuso, y el cuidado del que sirve.",
      ser: "Un siervo humilde y confiable, que sirve como Jesús, con orden, con prudencia y con alegría, sin buscar aplauso.",
      hacer: "Ayudar a un hermano a encontrar su servicio, formar el equipo de misericordia, decidir un pedido para la renta, organizar el cuidado de una hermana operada, orientar a una madre sin luz y cuidar a una coordinadora agotada.",
    },
    bibliografia: {
      basica: [
        { autor: "Timothy Keller", titulo: "Ministerios de misericordia: encarnando la parábola del buen samaritano", editorial: "Poiema Publicaciones" },
        { autor: "Matt Smethurst", titulo: "Los diáconos: cómo sirven y fortalecen a la iglesia", editorial: "Poiema Publicaciones" },
      ],
      complementaria: [
        { autor: "Alexander Strauch", titulo: "El diácono del Nuevo Testamento", editorial: "Editorial DIME" },
        { autor: "Steve Corbett y Brian Fikkert, con Katie Casselberry", titulo: "Helping Without Hurting in Church Benevolence (en inglés)", editorial: "Moody Publishers" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Marcos", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=gsXLQkppzUc", minutos: 11 },
      { tipo: "video", titulo: "Resumen del libro de 1 Timoteo", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=K5xCbQcSsOE", minutos: 11 },
      { tipo: "lectura", titulo: "Lectura ampliada: Hechos 6, los siete que sirvieron a las mesas", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Hechos&cap=6" },
      { tipo: "guia", titulo: "Contribuciones caritativas, Publicación 526 (en inglés)", fuente: "Servicio de Impuestos Internos (IRS)", url: "https://www.irs.gov/publications/p526" },
      { tipo: "guia", titulo: "2-1-1 Texas: la línea gratuita y anónima que orienta hacia las ayudas sociales", fuente: "Comisión de Salud y Servicios Humanos de Texas", url: "https://www.211texas.org/about-2-1-1/" },
    ],
  },
  disponible: true,
};

const PROYECTOS_COMUNITARIOS: MateriaDef = {
  id: "obra-social-3",
  nivel: null,
  especialidad: "obra-social",
  orden: 3,
  titulo: "Proyectos comunitarios",
  resumen: "Cómo hace la iglesia proyectos que buscan el bien de su ciudad: buscar el bien de la ciudad, conocer los recursos y las necesidades del barrio, diseñar con la comunidad, los proyectos concretos y sus cuidados, los recursos y la sostenibilidad, y medir y celebrar el cambio.",
  base: "Jeremías 29:7; Nehemías 2:17-18",
  memoria: "Jeremías 29:7",
  lecciones: lecciones("obra-social-3", [
    ["Buscar el bien de la ciudad", "Jeremías 29:7; Mateo 5:14; Proverbios 11:10"],
    ["Conocer la comunidad: recursos y necesidades", "Nehemías 2:15; Juan 6:9; Proverbios 20:5"],
    ["Diseñar un proyecto con la comunidad", "Proverbios 15:22; Nehemías 3:28; Nehemías 4:6"],
    ["Proyectos que sirven: la despensa, las tutorías, las clases y la salud", "Marcos 6:37; Proverbios 22:9; Mateo 25:35"],
    ["Los recursos y la sostenibilidad", "2 Corintios 9:8; Juan 6:12; Lucas 14:28"],
    ["Medir y celebrar el cambio", "Hageo 1:5; 1 Corintios 3:6; Salmos 126:3"],
  ], 10),
  silabo: {
    proposito:
      "Que el que sirve en la obra social sepa llevar adelante proyectos que buscan el bien de su ciudad: que, como pide Jeremías 29:7, procure la paz de la ciudad y ore por ella, y distinga un proyecto comunitario, que responde a una necesidad real, tiene propósito, tiempo y responsables, se hace con la comunidad y se evalúa, de una actividad suelta; que conozca la comunidad viendo sus necesidades y también sus recursos, las personas y sus dones, las asociaciones, las instituciones, los lugares y la economía del barrio, como enseñaron Kretzmann y McKnight; que diseñe el proyecto con los vecinos, con su propósito, sus actividades, sus recursos, sus responsables y sus resultados, distinguiendo lo que hacemos de lo que cambia; que organice proyectos concretos con sus cuidados, como una despensa según la ley federal Bill Emerson y la Ley del Donante de Buena Fe de Texas, que protegen a los que donan y reparten de buena fe alimentos aparentemente sanos, salvo la negligencia grave y otras faltas graves, o una tutoría con voluntarios revisados, dos adultos y el reporte del abuso, que toda persona hace de inmediato y los profesionales a más tardar en 24 horas; que planee los recursos, el presupuesto y la sostenibilidad; y que mida y celebre el cambio con honestidad, cuidando la privacidad de las personas. Lo legal es una guía general, no un consejo legal. Su base es la palabra de Jeremías: «Y procurad la paz de la ciudad a la cual os hice transportar, y rogad por ella a Jehová; porque en su paz tendréis vosotros paz» (Jeremías 29:7).",
    objetivos: [
      { id: "o1", texto: "Explicar por qué la iglesia busca el bien de su ciudad y qué es un proyecto comunitario.", bloom: "comprender" },
      { id: "o2", texto: "Hacer el mapa de los recursos y de las necesidades de un barrio.", bloom: "aplicar" },
      { id: "o3", texto: "Diseñar un proyecto con la comunidad, con su propósito, sus actividades y sus resultados.", bloom: "crear" },
      { id: "o4", texto: "Organizar un proyecto concreto con los cuidados que pide la ley.", bloom: "aplicar" },
      { id: "o5", texto: "Planear los recursos, el presupuesto y la sostenibilidad de un proyecto.", bloom: "aplicar" },
      { id: "o6", texto: "Evaluar un proyecto midiendo lo que hacemos y lo que cambia.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar Jeremías 29:7 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "El shalom y el bien de la ciudad, el proyecto comunitario, el mapa de los recursos de Kretzmann y McKnight, las partes de un proyecto, lo que hacemos y lo que cambia, la ley Bill Emerson y la Ley del Donante de Buena Fe de Texas, el presupuesto y la sostenibilidad, y la evaluación.",
      ser: "Un servidor que ama su ciudad, escucha a sus vecinos, planea con otros y cuida lo que Dios provee.",
      hacer: "Escoger una necesidad con los vecinos, hacer el mapa del barrio, diseñar una tutoría, abrir una despensa, sostener un proyecto cansado y evaluar unas clases de inglés.",
    },
    bibliografia: {
      basica: [
        { autor: "Steve Corbett y Brian Fikkert", titulo: "Cuando ayudar hace daño: cómo aliviar la pobreza sin lastimar a los pobres ni a uno mismo", editorial: "Vida" },
        { autor: "C. René Padilla y Tetsunao Yamamori (eds.)", titulo: "El proyecto de Dios y las necesidades humanas: más modelos de ministerio integral en América Latina", editorial: "Ediciones Kairós" },
      ],
      complementaria: [
        { autor: "Bryant L. Myers", titulo: "Fe, pobreza y desarrollo: principios y prácticas del desarrollo transformador", editorial: "JUANUNO1 Ediciones" },
        { autor: "John P. Kretzmann y John L. McKnight", titulo: "Building Communities from the Inside Out: A Path Toward Finding and Mobilizing a Community's Assets (en inglés)", editorial: "ABCD Institute, Northwestern University" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Shalom - Paz", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=ayvlscZUZ0c", minutos: 4 },
      { tipo: "video", titulo: "Resumen de los libros de Esdras y Nehemías: un líder que ora y trabaja", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=OGdiLZ92nQs", minutos: 10 },
      { tipo: "lectura", titulo: "Lectura ampliada: Jeremías 29, la carta a los desterrados", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Jeremias&cap=29" },
      { tipo: "lectura", titulo: "Lectura ampliada: Nehemías 3, cada uno frente a su casa", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Nehemias&cap=3" },
      { tipo: "guia", titulo: "Ley Bill Emerson del Buen Samaritano para la donación de alimentos, 42 U.S.C. 1791 (en inglés)", fuente: "Instituto de Información Legal de la Universidad Cornell", url: "https://www.law.cornell.edu/uscode/text/42/1791" },
      { tipo: "guia", titulo: "Ley del Donante de Buena Fe de Texas, capítulo 76 del Código de Prácticas y Remedios Civiles (en inglés)", fuente: "Legislatura de Texas", url: "https://statutes.capitol.texas.gov/Docs/CP/htm/CP.76.htm" },
    ],
  },
  disponible: true,
};

const AYUDA_HUMANITARIA: MateriaDef = {
  id: "obra-social-4",
  nivel: null,
  especialidad: "obra-social",
  orden: 4,
  titulo: "Ayuda humanitaria y desastres",
  resumen: "Cómo responde la iglesia a los desastres con orden, con dignidad y sin acepción de personas: Dios en medio del desastre, los principios humanitarios, las normas Esfera, las donaciones que ayudan, la coordinación y la recuperación, y la preparación de la iglesia y la acogida al que huye.",
  base: "Lamentaciones 3:22-23; Hechos 11:28-29",
  memoria: "Lamentaciones 3:22-23",
  lecciones: lecciones("obra-social-4", [
    ["Dios en medio del desastre", "Lamentaciones 3:22-23; Isaías 43:2; Hechos 11:28-29"],
    ["Los principios humanitarios", "Hechos 10:34; Santiago 2:1; Mateo 5:45"],
    ["Las normas Esfera: ayudar con dignidad", "Isaías 58:7; Proverbios 31:8; 1 Pedro 2:17"],
    ["Las donaciones que ayudan", "2 Corintios 8:12; Romanos 15:26; Proverbios 14:15"],
    ["Responder juntos: la coordinación y la recuperación", "Eclesiastés 4:9-10; Nehemías 4:19-20; Romanos 12:4-5"],
    ["Prepararse y recibir al que huye", "Génesis 41:35-36; Levítico 19:34; Mateo 2:14"],
  ], 10),
  silabo: {
    proposito:
      "Que el que sirve en la obra social sepa responder a los desastres como Dios quiere y como enseñan los que más saben de la ayuda humanitaria: que confíe en las misericordias de Dios, que no decaen, y conozca las etapas de un desastre, la preparación, el rescate, el alivio y la recuperación, para servir en cada una con orden, como la iglesia de Antioquía en tiempo de hambre; que viva los cuatro principios humanitarios que reconoció la Asamblea General de la ONU, la humanidad, la neutralidad y la imparcialidad en 1991 y la independencia en 2004, ayudando según la necesidad, sin acepción de personas y sin condicionar la ayuda a la fe; que ayude con dignidad según el Manual Esfera de 2018, con su Carta Humanitaria, sus principios de protección y sus normas mínimas, como los 15 litros de agua por persona y por día; que done con sabiduría, como enseña FEMA, con dinero a organizaciones reconocidas y solo los artículos que se piden, y que maneje un fondo para un desastre según la Publicación 3833 del IRS, con criterios según la necesidad y registros, sin señalar la ayuda para una persona en particular; que se coordine con otros, con las cuatro C de National VOAD, sin ir por cuenta propia, y siga en la recuperación a largo plazo; y que prepare a la iglesia y reciba con amor a los que llegan huyendo. No repite Emergencias y desastres de la especialidad Capellanía. Lo legal es una guía general, no un consejo legal. Su base es la palabra del profeta: «Por la misericordia de Jehová no hemos sido consumidos, porque nunca decayeron sus misericordias. Nuevas son cada mañana; grande es tu fidelidad» (Lamentaciones 3:22-23).",
    objetivos: [
      { id: "o1", texto: "Explicar cómo acompaña Dios a su pueblo en el desastre y qué hace la iglesia en cada etapa.", bloom: "comprender" },
      { id: "o2", texto: "Aplicar los cuatro principios humanitarios al repartir la ayuda.", bloom: "aplicar" },
      { id: "o3", texto: "Organizar un albergue con la dignidad y la protección que piden las normas Esfera.", bloom: "aplicar" },
      { id: "o4", texto: "Donar y manejar un fondo para un desastre con sabiduría y según la Publicación 3833.", bloom: "aplicar" },
      { id: "o5", texto: "Ubicar a la iglesia dentro de la respuesta coordinada y la recuperación de su comunidad.", bloom: "aplicar" },
      { id: "o6", texto: "Evaluar el plan de la iglesia para un desastre y su manera de recibir al que huye.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar Lamentaciones 3:22-23 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "Las etapas de un desastre, los cuatro principios humanitarios y las resoluciones 46/182 y 58/114, el Manual Esfera de 2018, las donaciones según FEMA y la Publicación 3833, las cuatro C de National VOAD y los grupos de recuperación a largo plazo, y el plan de la iglesia.",
      ser: "Un siervo que confía en la fidelidad de Dios, ayuda sin acepción de personas, honra a cada persona y trabaja junto a otros.",
      hacer: "Responder a una inundación en otra ciudad, repartir la ayuda en un albergue, preparar el albergue de la iglesia, manejar el fondo para un huracán, participar en el grupo de recuperación y recibir a las familias que llegan huyendo.",
    },
    bibliografia: {
      basica: [
        { autor: "Asociación Esfera", titulo: "El Manual Esfera: Carta Humanitaria y normas mínimas para la respuesta humanitaria", editorial: "Asociación Esfera" },
        { autor: "Isabel Carter", titulo: "Cómo prepararnos para los desastres (serie Pilares)", editorial: "Tearfund" },
      ],
      complementaria: [
        { autor: "Steve Corbett y Brian Fikkert", titulo: "Cuando ayudar hace daño: cómo aliviar la pobreza sin lastimar a los pobres ni a uno mismo", editorial: "Vida" },
        { autor: "Robert D. Lupton", titulo: "Toxic Charity: How Churches and Charities Hurt Those They Help, and How to Reverse It (en inglés)", editorial: "HarperOne" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen de la historia de Job: ¿por qué la vida de Job se volvió tan difícil?", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=_AIvRQj8kHs", minutos: 6 },
      { tipo: "video", titulo: "Resumen del libro de Génesis (parte 2)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=MC8BqGu9B8A", minutos: 9 },
      { tipo: "lectura", titulo: "Lectura ampliada: Lamentaciones 3, nuevas son cada mañana", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Lamentaciones&cap=3" },
      { tipo: "guia", titulo: "Trabaje como voluntario y done", fuente: "FEMA, Agencia Federal para el Manejo de Emergencias", url: "https://www.fema.gov/es/disaster/recover/volunteer-donate" },
      { tipo: "guia", titulo: "OCHA en mensaje: los principios humanitarios", fuente: "Oficina de las Naciones Unidas para la Coordinación de Asuntos Humanitarios (OCHA)", url: "https://www.unocha.org/publications/report/world/ocha-en-mensaje-principios-humanitarios" },
      { tipo: "guia", titulo: "La ayuda en los desastres por medio de organizaciones caritativas, Publicación 3833 (en inglés)", fuente: "Servicio de Impuestos Internos (IRS)", url: "https://www.irs.gov/pub/irs-pdf/p3833.pdf" },
    ],
  },
  disponible: true,
};

const VOLUNTARIADO_ALIANZAS: MateriaDef = {
  id: "obra-social-5",
  nivel: null,
  especialidad: "obra-social",
  orden: 5,
  titulo: "Voluntariado y alianzas",
  resumen: "Cómo sirve la iglesia junto a otros por el bien de su ciudad: servir junto a otros, las alianzas con otras iglesias, con escuelas, negocios y organizaciones, y con el gobierno, los voluntarios de la comunidad y el cuidado de la alianza.",
  base: "Eclesiastés 4:12; Filipenses 1:5",
  memoria: "Eclesiastés 4:12",
  lecciones: lecciones("obra-social-5", [
    ["Juntos por el bien de la ciudad", "Eclesiastés 4:12; Juan 17:21; Filipenses 1:5"],
    ["Alianzas con otras iglesias", "Marcos 9:39-40; Gálatas 2:9; 1 Corintios 3:9"],
    ["Alianzas con escuelas, negocios y organizaciones", "Amós 3:3; Nehemías 2:8; Esdras 1:4"],
    ["Alianzas con el gobierno", "Romanos 13:4; Daniel 1:8; Tito 3:1"],
    ["Los voluntarios de la comunidad", "Éxodo 36:5; Hechos 28:2; Romanos 16:3"],
    ["Cuidar la alianza", "Romanos 12:18; Hechos 15:39-40; 2 Timoteo 4:11"],
  ], 10),
  silabo: {
    proposito:
      "Que el que sirve en la obra social sepa servir junto a otros por el bien de su ciudad: que entienda, con Eclesiastés 4:12 y Juan 17:21, que juntos se llega más lejos y que la unidad es testimonio, y que la iglesia puede aliarse con otras iglesias, escuelas, negocios, organizaciones y el gobierno sin dejar de ser iglesia; que forme alianzas con otras iglesias empezando por lo que las une, respetando las diferencias y compartiendo el mérito, como los apóstoles, que se dieron la diestra en señal de compañerismo; que se alíe con escuelas, negocios y organizaciones cuidando sus reglas, los valores del proyecto y los datos de las personas, con acuerdos por escrito; que colabore con el gobierno según la regla federal de 2024, en la que las organizaciones de fe compiten en igualdad y conservan su carácter religioso, pero no usan la ayuda federal directa para actividades explícitamente religiosas, que se ofrecen por separado, en tiempo o en lugar, y con participación voluntaria; que reciba a los voluntarios de la comunidad con una orientación, el cuidado de los niños y gratitud, reportando la sospecha de abuso de un menor como pide la ley: toda persona de inmediato, y los profesionales a más tardar en 24 horas; y que cuide cada alianza con comunicación, evaluación y paz, y la termine en paz cuando haga falta. No repite Equipos y voluntarios de la especialidad Liderazgo y administración. Lo legal es una guía general, no un consejo legal. Su base es la palabra del Predicador: «Y si alguno prevaleciere contra uno, dos le resistirán; y cordón de tres dobleces no se rompe pronto» (Eclesiastés 4:12).",
    objetivos: [
      { id: "o1", texto: "Explicar por qué la iglesia sirve junto a otros y qué cuida al hacerlo.", bloom: "comprender" },
      { id: "o2", texto: "Formar una alianza con otras iglesias respetando sus diferencias.", bloom: "aplicar" },
      { id: "o3", texto: "Escribir un acuerdo de colaboración con una escuela, un negocio o una organización.", bloom: "aplicar" },
      { id: "o4", texto: "Colaborar con el gobierno según la regla federal de 2024 sin perder las convicciones.", bloom: "aplicar" },
      { id: "o5", texto: "Recibir y cuidar a los voluntarios de la comunidad.", bloom: "aplicar" },
      { id: "o6", texto: "Evaluar una alianza y decidir si se renueva, se cambia o se termina en paz.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar Eclesiastés 4:12 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "Los socios de una iglesia, las alianzas entre iglesias, los acuerdos de colaboración, la regla federal de 2024 con las órdenes ejecutivas 13279 y 13559, la recepción de los voluntarios de la comunidad y el cuidado de las alianzas.",
      ser: "Un siervo que busca la unidad, se pone de acuerdo antes de caminar con otros, cuida sus convicciones y vive en paz con todos.",
      hacer: "Sumarse a lo que otros ya hacen, organizar una despensa con otras iglesias, escribir un acuerdo con un negocio, manejar un fondo federal, recibir a los voluntarios de una empresa y resolver un problema con un socio.",
    },
    bibliografia: {
      basica: [
        { autor: "Rachel Blackman", titulo: "Cómo asociarse con la iglesia local (guía ROOTS 11)", editorial: "Tearfund" },
        { autor: "C. René Padilla y Tetsunao Yamamori (eds.)", titulo: "La iglesia local como agente de transformación: una eclesiología para la misión integral", editorial: "Ediciones Kairós" },
      ],
      complementaria: [
        { autor: "Isabel Carter", titulo: "La iglesia se moviliza (serie Pilares)", editorial: "Tearfund" },
        { autor: "Amy L. Sherman", titulo: "El llamado del reino: mayordomía vocacional para el bien común", editorial: "Proyecto Nehemías" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Filipenses", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=gks8CQX5mwQ", minutos: 10 },
      { tipo: "video", titulo: "Resumen del libro de Hechos (parte 2)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=ZKaaHQUdVCY", minutos: 9 },
      { tipo: "lectura", titulo: "Lectura ampliada: Nehemías 2, la ayuda del rey para reconstruir", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Nehemias&cap=2" },
      { tipo: "guia", titulo: "Alianzas con las organizaciones de fe y de los barrios, la regla federal de 2024 (en inglés)", fuente: "Registro Federal de los Estados Unidos", url: "https://www.federalregister.gov/documents/2024/03/04/2024-03869/partnerships-with-faith-based-and-neighborhood-organizations" },
    ],
  },
  disponible: true,
};

const ROMANOS_TEOLOGIA_HISTORIA: MateriaDef = {
  id: "biblicos-avanzados-1",
  nivel: null,
  especialidad: "biblicos-avanzados",
  avanzada: true,
  orden: 1,
  titulo: "Romanos: su teología y su historia",
  resumen: "La carta a los Romanos más allá de su recorrido por secciones: su ocasión, la justicia de Dios, las palabras de la salvación, la carta en la historia de la iglesia, sus grandes debates y su lugar en la iglesia de hoy.",
  base: "Romanos 3:23-24; Romanos 1:16-17",
  memoria: "Romanos 3:23-24",
  lecciones: lecciones("biblicos-avanzados-1", [
    ["La carta y su ocasión", "Romanos 1:7; Romanos 15:23-24; Romanos 16:1-2"],
    ["La justicia de Dios revelada", "Romanos 1:17; Habacuc 2:4; Romanos 3:21-22"],
    ["Las palabras de la salvación", "Romanos 3:24-25; Romanos 5:10-11; Romanos 8:15"],
    ["Romanos en la historia de la iglesia", "Romanos 13:13-14; Romanos 3:28; Romanos 8:16"],
    ["Los grandes debates de Romanos", "Romanos 3:20; Romanos 7:24-25; Romanos 11:25-26"],
    ["Romanos en la iglesia de hoy", "Romanos 12:1-2; Romanos 14:1; Romanos 15:7"],
  ], 10),
  silabo: {
    proposito:
      "Que el estudiante avanzado conozca la carta a los Romanos a fondo, sin repetir el recorrido por secciones de la Exégesis de un libro: Romanos del Nivel 5: que conozca su ocasión, escrita por Pablo casi seguro desde Corinto hacia el año 57, a una iglesia de judíos y gentiles que había vivido la expulsión de los judíos de Roma bajo Claudio, para preparar su viaje a España, presentar el evangelio, unir a la iglesia y pedir oración por la ofrenda para Jerusalén; que entienda su tema, la justicia de Dios que se revela por la fe, como anunció Habacuc 2:4, en sus tres sentidos de lo que Dios es, lo que da y lo que hace; que explique las palabras de la salvación, la justificación, la redención, la propiciación, la reconciliación y la adopción, con su imagen del tribunal, el mercado, el templo, la amistad y la familia; que cuente cómo Romanos cambió la vida de Agustín en el 386, de Martín Lutero, que la enseñó en Wittenberg en 1515 y 1516, y de Juan Wesley el 24 de mayo de 1738, y que el movimiento de santidad, del que salió el pentecostalismo, tiene sus raíces en ese avivamiento; que presente con justicia los grandes debates, la lectura de la Reforma y la nueva perspectiva sobre Pablo de E. P. Sanders (1977), James Dunn y N. T. Wright, las lecturas de Romanos 7 y las de Romanos 9 a 11, distinguiendo lo que todos afirman de lo que se discute; y que lleve la carta a la vida de la iglesia de hoy, con una vida de adoración y hermanos de distintas culturas que se reciben unos a otros. La postura del ministerio sobre la elección y la perseverancia queda para su declaración de fe. Su base es la palabra de Pablo: «por cuanto todos pecaron, y están destituidos de la gloria de Dios, siendo justificados gratuitamente por su gracia, mediante la redención que es en Cristo Jesús» (Romanos 3:23-24).",
    objetivos: [
      { id: "o1", texto: "Explicar la ocasión de Romanos: quién la escribió, desde dónde, a quiénes, cuándo y para qué.", bloom: "comprender" },
      { id: "o2", texto: "Explicar qué es la justicia de Dios que revela el evangelio, con Romanos 1:17 y 3:21-26.", bloom: "comprender" },
      { id: "o3", texto: "Explicar las cinco palabras de la salvación en Romanos y la imagen de cada una.", bloom: "comprender" },
      { id: "o4", texto: "Contar cómo Romanos cambió la vida de Agustín, de Lutero y de Wesley, y la historia de la iglesia.", bloom: "comprender" },
      { id: "o5", texto: "Analizar los grandes debates sobre Romanos y presentarlos con justicia.", bloom: "analizar" },
      { id: "o6", texto: "Aplicar Romanos 12 a 15 a la vida de la iglesia de hoy y planear un estudio de la carta.", bloom: "aplicar" },
      { id: "o7", texto: "Recitar Romanos 3:23-24 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "La ocasión de la carta y la expulsión de los judíos bajo Claudio, la justicia de Dios y Habacuc 2:4, la justificación, la redención, la propiciación, la reconciliación y la adopción, Agustín, Lutero, Wesley y Barth, la nueva perspectiva sobre Pablo, Romanos 7 y Romanos 9 a 11.",
      ser: "Un maestro que vive de la gracia que enseña, firme en lo esencial, humilde y justo en los debates, y que recibe al hermano distinto como Cristo lo recibió.",
      hacer: "Presentar la ocasión de Romanos en cinco minutos, explicar Romanos 1:17 a un nuevo creyente, explicar la adopción a un joven sin papá, contar la historia de Wesley en una enseñanza, guiar un debate sin dividir a la clase y planear un estudio de Romanos en ocho reuniones.",
    },
    bibliografia: {
      basica: [
        { autor: "Herman Ridderbos", titulo: "El pensamiento del apóstol Pablo", editorial: "Libros Desafío" },
        { autor: "F. F. Bruce", titulo: "Pablo: apóstol del corazón liberado", editorial: "CLIE" },
      ],
      complementaria: [
        { autor: "N. T. Wright", titulo: "El verdadero pensamiento de Pablo", editorial: "CLIE" },
        { autor: "Justo L. González", titulo: "Historia del pensamiento cristiano hasta el siglo XXI", editorial: "CLIE" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Romanos (parte 1)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=0tco1rQGC1o", minutos: 9 },
      { tipo: "video", titulo: "Resumen del libro de Romanos (parte 2)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=ZqScL0dHLsM", minutos: 10 },
      { tipo: "video", titulo: "Sacrificio y Propiciación", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=54xtkWfl840", minutos: 6 },
      { tipo: "lectura", titulo: "Lectura ampliada: Romanos 8, la vida en el Espíritu", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Romanos&cap=8" },
    ],
  },
  disponible: true,
};

const HECHOS_A_FONDO: MateriaDef = {
  id: "biblicos-avanzados-2",
  nivel: null,
  especialidad: "biblicos-avanzados",
  avanzada: true,
  orden: 2,
  titulo: "Hechos: la misión de la iglesia primitiva",
  resumen: "El libro de los Hechos a fondo: Lucas como historiador y teólogo, el plan de Hechos 1:8, Pentecostés y el Espíritu, la iglesia de Jerusalén y el concilio, los viajes de Pablo y la plantación de iglesias, y los juicios de Pablo hasta Roma.",
  base: "Hechos 5:42; Hechos 1:8",
  memoria: "Hechos 5:42",
  lecciones: lecciones("biblicos-avanzados-2", [
    ["Lucas, historiador y teólogo", "Lucas 1:1-4; Hechos 1:1-3; Hechos 16:10"],
    ["El plan del libro: hasta lo último de la tierra", "Hechos 1:8; Hechos 6:7; Hechos 12:24"],
    ["Pentecostés y el Espíritu en Hechos", "Hechos 2:1-4; Hechos 2:38-39; Hechos 10:44-46"],
    ["La iglesia de Jerusalén y el concilio", "Hechos 2:42; Hechos 15:10-11; Hechos 15:28-29"],
    ["Los viajes de Pablo y la plantación de iglesias", "Hechos 13:2-3; Hechos 14:23; Hechos 17:2-3"],
    ["Los juicios de Pablo y la llegada a Roma", "Hechos 26:22-23; Hechos 27:23-24; Hechos 28:30-31"],
  ], 10),
  silabo: {
    proposito:
      "Que el estudiante avanzado conozca a fondo el libro de los Hechos, más allá de Los Evangelios y Hechos del Nivel 3: que conozca a Lucas, el médico compañero de Pablo, como historiador cuidadoso y como teólogo, con los pasajes en nosotros y los datos que confirman otras fuentes, como la carta del emperador Claudio grabada en Delfos, que fecha a Galión, procónsul de Acaya, hacia el 51 y el 52; que siga el plan de Hechos 1:8, de Jerusalén a Judea y Samaria y hasta lo último de la tierra, con los seis resúmenes del crecimiento de la palabra; que estudie Pentecostés y los relatos en que los creyentes reciben el Espíritu, en Jerusalén, Samaria, Cesarea y Éfeso, y presente con respeto la lectura de las iglesias pentecostales y la de otras iglesias evangélicas; que aprenda de la iglesia de Jerusalén y del concilio, hacia el año 49, a vivir la comunión y a resolver los conflictos con la Palabra y el Espíritu, sabiendo que la salvación es por gracia; que conozca los tres viajes de Pablo, hacia el 46 al 48, el 49 al 52 y el 53 al 57, y su método para plantar iglesias; y que siga a Pablo desde su arresto hasta Roma, hacia el 60 al 62, donde el libro termina con el evangelio predicado sin impedimento. La postura del ministerio sobre las lenguas y el bautismo en el Espíritu queda para su declaración de fe. Su base es la palabra de Lucas: «Y todos los días, en el templo y por las casas, no cesaban de enseñar y predicar a Jesucristo» (Hechos 5:42).",
    objetivos: [
      { id: "o1", texto: "Explicar quién escribió Hechos y cómo trabajó Lucas como historiador y como teólogo.", bloom: "comprender" },
      { id: "o2", texto: "Explicar el plan del libro según Hechos 1:8 y sus seis resúmenes del crecimiento.", bloom: "comprender" },
      { id: "o3", texto: "Comparar los relatos del Espíritu en Hechos y presentar con respeto las lecturas de las iglesias.", bloom: "analizar" },
      { id: "o4", texto: "Aplicar la manera en que el concilio de Jerusalén resolvió un conflicto a un desacuerdo de la iglesia de hoy.", bloom: "aplicar" },
      { id: "o5", texto: "Aplicar el método de Pablo a la plantación de una iglesia o de un grupo nuevo.", bloom: "aplicar" },
      { id: "o6", texto: "Evaluar el final abierto de Hechos y lo que enseña para la misión de hoy.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar Hechos 5:42 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "Lucas y Teófilo, los pasajes en nosotros, Galión y los politarcas, el plan de Hechos 1:8 y los seis resúmenes, Pentecostés y los relatos del Espíritu, la iglesia de Jerusalén y el concilio, los tres viajes de Pablo y su método, y los juicios de Pablo hasta Roma.",
      ser: "Un testigo lleno del Espíritu, que ama a la iglesia, resuelve los conflictos con la Palabra, sirve en equipo y no se rinde en las pruebas.",
      hacer: "Defender con honestidad la confianza en Hechos, hacer el plan de Hechos 1:8 de su iglesia, estudiar los relatos del Espíritu con hermanos de varias iglesias, guiar un desacuerdo como el concilio, abrir un grupo nuevo con el método de Pablo y acompañar a un hermano preso.",
    },
    bibliografia: {
      basica: [
        { autor: "F. F. Bruce", titulo: "El libro de los Hechos", editorial: "CLIE" },
        { autor: "Justo L. González", titulo: "Comentario al evangelio de Lucas y a los Hechos de los apóstoles", editorial: "CLIE" },
      ],
      complementaria: [
        { autor: "Craig S. Keener", titulo: "Entre la historia y el Espíritu", editorial: "Editorial Patmos" },
        { autor: "William W. Menzies y Robert P. Menzies", titulo: "Espíritu y poder: fundamentos de la experiencia pentecostal", editorial: "Vida" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Hechos (parte 1)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=5h7Q0EK-m8I", minutos: 9 },
      { tipo: "video", titulo: "Resumen del libro de Hechos (parte 2)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=ZKaaHQUdVCY", minutos: 9 },
      { tipo: "video", titulo: "Qué sucedió en Pentecostés y por qué es importante", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=OisTpQEle6E", minutos: 7 },
      { tipo: "lectura", titulo: "Lectura ampliada: Hechos 15, el concilio de Jerusalén", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Hechos&cap=15" },
    ],
  },
  disponible: true,
};

const DANIEL_APOCALIPSIS: MateriaDef = {
  id: "biblicos-avanzados-3",
  nivel: null,
  especialidad: "biblicos-avanzados",
  avanzada: true,
  orden: 3,
  titulo: "Daniel y Apocalipsis",
  resumen: "Daniel y el Apocalipsis a fondo: la literatura apocalíptica, Daniel fiel en Babilonia, sus visiones, Cristo y las siete iglesias, las maneras de leer el Apocalipsis y la esperanza de la nueva creación.",
  base: "Daniel 7:14; Apocalipsis 21:3-4",
  memoria: "Daniel 7:14",
  lecciones: lecciones("biblicos-avanzados-3", [
    ["La literatura apocalíptica", "Daniel 7:15-16; Apocalipsis 1:1-3; Apocalipsis 1:19-20"],
    ["Daniel: fieles en Babilonia", "Daniel 1:8; Daniel 3:17-18; Daniel 6:10"],
    ["Las visiones de Daniel: Dios gobierna la historia", "Daniel 2:44; Daniel 7:13-14; Daniel 12:2-3"],
    ["Apocalipsis: Cristo y sus siete iglesias", "Apocalipsis 1:17-18; Apocalipsis 2:10; Apocalipsis 3:20"],
    ["Cómo se ha leído el Apocalipsis", "Apocalipsis 4:11; Apocalipsis 5:9-10; Apocalipsis 20:4"],
    ["La esperanza final: la nueva creación", "Apocalipsis 19:11; Apocalipsis 21:3-4; Apocalipsis 22:20"],
  ], 10),
  silabo: {
    proposito:
      "Que el estudiante avanzado lea a fondo Daniel y el Apocalipsis, más allá de su panorama en el Nivel 4 y de la escatología de Teología sistemática IV: que aprenda a leer la literatura apocalíptica, dejando que la Biblia explique sus símbolos y sin poner fechas, porque del día y la hora nadie sabe; que conozca a Daniel, llevado a Babilonia hacia el 605 antes de Cristo, y a sus amigos, que sirvieron en un imperio pagano sin negociar su fe, con las dos posturas sobre la fecha del libro, del siglo VI antes de Cristo o del 167 al 164 antes de Cristo, y su parte en arameo; que entienda las visiones de Daniel, los cuatro reinos, las setenta semanas y el hijo de hombre que recibe un reino eterno, el título que Jesús tomó para sí; que escuche a Cristo en medio de las siete iglesias de Asia, en un libro que la mayoría fecha hacia el año 95, bajo Domiciano, y otros antes del 70; que conozca las cuatro maneras de leer el Apocalipsis, la preterista, la historicista, la futurista y la idealista, y las posturas sobre el milenio y el rapto, presentadas sin escoger entre ellas, porque la postura del ministerio la dirá su declaración de fe; y que viva con la esperanza de la nueva creación, donde Dios enjugará toda lágrima. Su base es la palabra de Daniel: «su dominio es dominio eterno, que nunca pasará, y su reino uno que no será destruido» (Daniel 7:14).",
    objetivos: [
      { id: "o1", texto: "Explicar qué es la literatura apocalíptica y cómo se interpretan sus símbolos.", bloom: "comprender" },
      { id: "o2", texto: "Aplicar el ejemplo de Daniel y sus amigos a la vida en una cultura que no conoce a Dios.", bloom: "aplicar" },
      { id: "o3", texto: "Explicar el mensaje de las visiones de Daniel y comparar las lecturas de los cuatro reinos y de las setenta semanas.", bloom: "analizar" },
      { id: "o4", texto: "Explicar el patrón de las cartas a las siete iglesias y aplicar una de ellas a una iglesia de hoy.", bloom: "aplicar" },
      { id: "o5", texto: "Comparar las cuatro maneras de leer el Apocalipsis y las posturas sobre el milenio y el rapto.", bloom: "analizar" },
      { id: "o6", texto: "Evaluar cómo la esperanza de la nueva creación transforma la vida, la adoración y la misión.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar Daniel 7:14 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "La literatura apocalíptica y sus símbolos, Daniel en Babilonia y las posturas sobre su fecha, los cuatro reinos, las setenta semanas y el hijo de hombre, las siete iglesias de Asia, las cuatro escuelas del Apocalipsis, las posturas sobre el milenio y el rapto, y la nueva creación.",
      ser: "Un creyente fiel en medio de una cultura que no conoce a Dios, que espera a Cristo con esperanza y sin miedo, y que es humilde ante las posturas que no comparte.",
      hacer: "Interpretar un símbolo con la misma Biblia, aconsejar a un joven presionado en su trabajo, enseñar Daniel 7 sin perderse en cálculos, aplicar una de las siete cartas a su iglesia, presentar las posturas sobre el milenio sin dividir y consolar a una familia con Apocalipsis 21.",
    },
    bibliografia: {
      basica: [
        { autor: "Justo L. González y Catherine Gunsalus González", titulo: "Cómo leer el Apocalipsis", editorial: "CLIE" },
        { autor: "Evis L. Carballosa", titulo: "Daniel y el reino mesiánico", editorial: "Portavoz" },
      ],
      complementaria: [
        { autor: "C. Marvin Pate (ed.)", titulo: "Cuatro puntos de vista sobre el Apocalipsis", editorial: "Vida" },
        { autor: "Darrell L. Bock (ed.)", titulo: "Tres perspectivas sobre el milenio y el más allá", editorial: "Publicaciones Faro de Gracia" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Daniel", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=yBO4FjCebrI", minutos: 11 },
      { tipo: "video", titulo: "Resumen del libro de Apocalipsis (parte 1)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=PgV57gK-Xow", minutos: 15 },
      { tipo: "video", titulo: "Resumen del libro de Apocalipsis (parte 2)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=DMXA-GERRzY", minutos: 15 },
      { tipo: "video", titulo: "Cielo y Tierra", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=CJAbz0LBib4", minutos: 6 },
      { tipo: "lectura", titulo: "Lectura ampliada: Apocalipsis 21, la nueva creación", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Apocalipsis&cap=21" },
    ],
  },
  disponible: true,
};

const GEOGRAFIA_HISTORIA_BIBLICA: MateriaDef = {
  id: "biblicos-avanzados-4",
  nivel: null,
  especialidad: "biblicos-avanzados",
  orden: 4,
  titulo: "Geografía e historia bíblica",
  resumen: "La tierra y la historia de la Biblia: la geografía de la tierra de Israel, de los patriarcas al reino, el reino dividido y los imperios, el exilio y los persas, el tiempo entre los testamentos y el mundo romano de Jesús y de Pablo.",
  base: "Hechos 17:26; Deuteronomio 11:11-12",
  memoria: "Hechos 17:26",
  lecciones: lecciones("biblicos-avanzados-4", [
    ["La tierra de la Biblia", "Deuteronomio 8:7-9; Deuteronomio 11:10-12; Salmos 125:2"],
    ["De los patriarcas al reino de David", "Génesis 12:1; Éxodo 12:40-41; 1 Reyes 6:1"],
    ["El reino dividido y los imperios", "1 Reyes 12:16; 2 Reyes 17:6; 2 Reyes 25:8-9"],
    ["El exilio, el regreso y los persas", "Jeremías 29:10; Esdras 1:1-2; Nehemías 2:5"],
    ["Entre los dos testamentos", "Daniel 8:21-22; Juan 10:22-23; Gálatas 4:4"],
    ["El mundo de Jesús y de Pablo", "Lucas 2:1; Lucas 3:1; Hechos 17:26"],
  ], 10),
  silabo: {
    proposito:
      "Que el estudiante conozca la tierra y la historia de la Biblia para leerla en su lugar y en su tiempo: que describa la tierra de Israel, una franja pequeña entre el mar y el desierto, con la llanura costera, la Sefela, los montes centrales, el valle del Jordán, con el mar Muerto a unos 440 metros bajo el nivel del mar, y Transjordania, que dependía de la lluvia que Dios da; que siga la historia de los patriarcas al reino, con las dos fechas que se proponen para el éxodo, hacia el 1446 o hacia el 1270 al 1250 antes de Cristo, y el reino de David y de Salomón; que ubique el reino dividido, hacia el 931 o 930, la caída de Samaria ante Asiria en el 722 y la de Jerusalén ante Babilonia en el 587 o 586, y a los profetas en su tiempo; que conozca el regreso con Ciro de Persia, que tomó Babilonia en el 539, el templo terminado hacia el 515 y la obra de Esdras y de Nehemías; que entienda el tiempo entre los testamentos, de Alejandro, en el 333, a Herodes, con la Septuaginta, los macabeos y la fiesta de la dedicación; y que ubique a Jesús y a Pablo en el mundo romano de Augusto, Tiberio y Pilato. Las fechas antiguas son aproximadas, y se dicen con honestidad. Su base es la palabra de Pablo en Atenas: «Y de una sangre ha hecho todo el linaje de los hombres, para que habiten sobre toda la faz de la tierra; y les ha prefijado el orden de los tiempos, y los límites de su habitación» (Hechos 17:26).",
    objetivos: [
      { id: "o1", texto: "Describir las regiones, el clima y los caminos de la tierra de Israel.", bloom: "comprender" },
      { id: "o2", texto: "Ubicar en el tiempo a los patriarcas, el éxodo y el reino, y comparar las fechas que se proponen para el éxodo.", bloom: "analizar" },
      { id: "o3", texto: "Explicar el reino dividido y las caídas de Samaria y de Jerusalén, y ubicar a los profetas en su tiempo.", bloom: "comprender" },
      { id: "o4", texto: "Explicar el regreso del exilio con los persas y la obra de Zorobabel, Esdras y Nehemías.", bloom: "comprender" },
      { id: "o5", texto: "Explicar cómo el tiempo entre los testamentos preparó la venida de Cristo.", bloom: "analizar" },
      { id: "o6", texto: "Ubicar el ministerio de Jesús y los viajes de Pablo en el mundo romano.", bloom: "aplicar" },
      { id: "o7", texto: "Recitar Hechos 17:26 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "Las cinco franjas de la tierra, las lluvias y los caminos, los patriarcas, el éxodo y el reino, los dos reinos, Asiria y Babilonia, el regreso con los persas, el tiempo entre los testamentos y el mundo romano.",
      ser: "Un lector paciente y honesto, que ubica cada pasaje en su lugar y en su tiempo, y que confía en el Dios que gobierna la historia.",
      hacer: "Usar un mapa en cada clase, hacer una línea del tiempo de Abraham a Salomón, ubicar un libro profético, animar a una iglesia que reconstruye, explicar el silencio entre Malaquías y Mateo y ubicar el ministerio de Jesús con Lucas 3:1.",
    },
    bibliografia: {
      basica: [
        { autor: "Barry J. Beitzel", titulo: "Atlas bíblico de Tyndale", editorial: "Tyndale" },
        { autor: "F. F. Bruce", titulo: "Israel y las naciones: la historia de Israel desde el éxodo hasta la destrucción del segundo templo", editorial: "Portavoz" },
      ],
      complementaria: [
        { autor: "William Sanford LaSor, David Allan Hubbard y Frederic William Bush", titulo: "Panorama del Antiguo Testamento: mensaje, forma y trasfondo del Antiguo Testamento", editorial: "Nueva Creación" },
        { autor: "D. S. Russell", titulo: "El período intertestamentario", editorial: "Casa Bautista de Publicaciones" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Josué", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=49ggVrdBN_Y", minutos: 10 },
      { tipo: "video", titulo: "Resumen de los libros de 1 y 2 Reyes", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=8V-TefJJc0g", minutos: 10 },
      { tipo: "video", titulo: "Resumen de los libros de Esdras y Nehemías: un líder que ora y trabaja", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=OGdiLZ92nQs", minutos: 10 },
      { tipo: "lectura", titulo: "Lectura ampliada: Esdras 1, el decreto de Ciro", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Esdras&cap=1" },
    ],
  },
  disponible: true,
};

const TRASFONDO_ARQUEOLOGIA: MateriaDef = {
  id: "biblicos-avanzados-5",
  nivel: null,
  especialidad: "biblicos-avanzados",
  orden: 5,
  titulo: "Trasfondo y arqueología bíblica",
  resumen: "El mundo de la Biblia a la luz de la arqueología: qué es la arqueología y sus límites, los hallazgos del Antiguo y del Nuevo Testamento, cómo llegó a nosotros el texto, la vida diaria y el mundo religioso de los judíos.",
  base: "Isaías 40:8; Lucas 1:3-4",
  memoria: "Isaías 40:8",
  lecciones: lecciones("biblicos-avanzados-5", [
    ["La arqueología y la Biblia", "Lucas 1:3-4; 1 Tesalonicenses 5:21; Hebreos 11:1"],
    ["Hallazgos del Antiguo Testamento", "2 Reyes 3:4-5; 2 Reyes 20:20; Números 6:24-26"],
    ["Los manuscritos y el texto de la Biblia", "Isaías 40:8; Jeremías 36:27-28; Lucas 4:17"],
    ["La vida diaria en tiempos bíblicos", "Lucas 2:7; Marcos 2:4; Juan 2:6"],
    ["El mundo religioso de los judíos", "Lucas 4:16; Hechos 23:8; Marcos 7:3-4"],
    ["Hallazgos del Nuevo Testamento", "Juan 5:2; Juan 9:7; Mateo 26:57"],
  ], 10),
  silabo: {
    proposito:
      "Que el estudiante conozca el trasfondo de la Biblia y use la arqueología con honestidad: que sepa cómo trabaja la arqueología, con el tel, los estratos, la cerámica y el carbono 14, y que ilumina la Biblia pero no prueba la fe; que conozca los hallazgos del Antiguo Testamento, como las estelas de Merneptah, de Mesa y de Tel Dan, la inscripción de Siloé, los prismas de Senaquerib, el Cilindro de Ciro y los amuletos de Ketef Hinom, diciendo lo que muestra cada uno y su límite; que entienda cómo llegó a nosotros el texto, con los manuscritos del mar Muerto, hallados en 1947, el Gran Rollo de Isaías, los códices y el papiro P52, y responda con datos a la idea de que la Biblia se cambió; que conozca la vida diaria de los tiempos bíblicos y el mundo religioso de los judíos, con el templo, la sinagoga, los fariseos, los saduceos, los esenios y los zelotes; y que conozca los hallazgos del Nuevo Testamento, como la piedra de Pilato, el osario de Caifás y los estanques de Betesda y de Siloé, con Cristo siempre en el centro. Examina las noticias de hallazgos y evita las falsificaciones. Su base es la palabra del profeta: «Sécase la hierba, marchítase la flor; mas la palabra del Dios nuestro permanece para siempre» (Isaías 40:8).",
    objetivos: [
      { id: "o1", texto: "Explicar cómo trabaja la arqueología y qué puede y qué no puede mostrar.", bloom: "comprender" },
      { id: "o2", texto: "Describir los principales hallazgos del Antiguo Testamento, con lo que muestra cada uno y su límite.", bloom: "comprender" },
      { id: "o3", texto: "Explicar cómo llegó a nosotros el texto de la Biblia y responder a la idea de que se cambió.", bloom: "aplicar" },
      { id: "o4", texto: "Explicar un pasaje a la luz de las costumbres de la vida diaria de su tiempo.", bloom: "aplicar" },
      { id: "o5", texto: "Distinguir a los grupos judíos del tiempo de Jesús y explicar sus encuentros con él.", bloom: "analizar" },
      { id: "o6", texto: "Evaluar el uso de un hallazgo del Nuevo Testamento en una enseñanza.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar Isaías 40:8 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "El tel, los estratos, la cerámica y el carbono 14; las estelas, Siloé, los prismas, el Cilindro de Ciro y Ketef Hinom; los manuscritos del mar Muerto y los códices; la vida diaria; el templo, la sinagoga y los grupos judíos; y los hallazgos del Nuevo Testamento.",
      ser: "Un maestro que ama la verdad, examina todo antes de repetirlo, no exagera y pone siempre a Cristo en el centro.",
      hacer: "Examinar la noticia de un hallazgo, enseñar un pasaje con un hallazgo, responder a la idea de que la Biblia se cambió, explicar una parábola con las costumbres de su tiempo, presentar a los grupos judíos sin caricaturas y preparar una exposición de arqueología.",
    },
    bibliografia: {
      basica: [
        { autor: "Ralph Gower", titulo: "Nuevo manual de usos y costumbres de los tiempos bíblicos", editorial: "Portavoz" },
        { autor: "Randall Price", titulo: "Las piedras claman", editorial: "Spanish House" },
      ],
      complementaria: [
        { autor: "F. F. Bruce y Florentino García Martínez", titulo: "Los manuscritos del mar Muerto: Qumrán en el siglo XXI", editorial: "CLIE" },
        { autor: "Craig S. Keener", titulo: "Comentario del contexto cultural de la Biblia: Nuevo Testamento", editorial: "Mundo Hispano" },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Isaías (parte 1)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=9lWr9EZchWg", minutos: 10 },
      { tipo: "video", titulo: "Resumen del libro de Juan (parte 1)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=OU16-2Sg_CQ", minutos: 10 },
      { tipo: "video", titulo: "Por qué el templo es tan importante en la Biblia", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=t56W2zp823Q", minutos: 5 },
      { tipo: "lectura", titulo: "Lectura ampliada: Jeremías 36, el rollo que el rey quemó", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Jeremias&cap=36" },
    ],
  },
  disponible: true,
};

export const NIVELES: NivelDef[] = [
  {
    n: 1,
    nombre: "Fundamentos de la fe",
    etapa: "raices",
    para: "Nuevo creyente",
    base: "1 Pedro 2:2; Hebreos 6:1-2",
    ritmo: "6 a 8 semanas",
    recibe: "Certificado en Fundamentos de la Fe",
    descripcion: "Lo primero que todo creyente necesita: la salvación, la oración, la Biblia, el Espíritu Santo, las ordenanzas, la iglesia, la vida nueva y compartir la fe.",
    requisitos: ["Las 8 materias aprobadas", "El examen integral del nivel", "4 versículos de memoria", "El pacto del creyente"],
    materias: [
      SALVACION,
      ORACION,
      BIBLIA,
      ESPIRITU,
      BAUTISMO_CENA,
      IGLESIA,
      VIDA_NUEVA,
      COMPARTIR_FE,
    ],
  },
  {
    n: 2,
    nombre: "Discipulado",
    etapa: "raices",
    para: "Creyente que crece, miembro",
    base: "Colosenses 2:6-7; Mateo 28:20",
    ritmo: "3 a 4 meses",
    recibe: "Certificado en Discipulado Cristiano",
    descripcion: "Conocer la Biblia de principio a fin, las doctrinas fundamentales y la vida del discípulo que sirve y comparte su fe.",
    requisitos: ["Las 9 materias aprobadas", "El examen integral del nivel", "8 versículos de memoria", "3 conversaciones de evangelismo registradas", "Servir 1 mes en un ministerio"],
    materias: [
      PANORAMA_AT,
      PANORAMA_NT,
      DOCTRINAS,
      DISCIPLINAS,
      SERMON_MONTE,
      MAYORDOMIA,
      FAMILIA,
      EVANGELISMO_PERSONAL,
      DONES,
    ],
  },
  {
    n: 3,
    nombre: "Formación de obreros",
    etapa: "servicio",
    para: "Servidores y líderes de grupo",
    base: "2 Timoteo 2:15; Efesios 4:12",
    ritmo: "5 a 6 meses",
    recibe: "Diploma de Obrero Cristiano",
    descripcion: "Interpretar y enseñar bien la Biblia, servir en el poder del Espíritu y cuidar de otros.",
    requisitos: ["Las 10 materias aprobadas", "El examen integral del nivel", "20 horas de práctica confirmada", "Una enseñanza grabada aprobada", "Consolidar a 1 nuevo creyente"],
    materias: [
      HERMENEUTICA,
      METODOS_ESTUDIO,
      PENTATEUCO_HISTORICOS,
      EVANGELIOS_HECHOS,
      ESPIRITU_SANTO,
      EVANGELISMO_CONSOLIDACION,
      LIDERAZGO_1,
      HOMILETICA_1,
      HISTORIA_1,
      CONSEJERIA_BASICA,
    ],
  },
  {
    n: 4,
    nombre: "Teología ministerial",
    etapa: "ministerio",
    para: "Líderes, predicadores y maestros",
    base: "1 Timoteo 4:16; 2 Timoteo 4:2-5",
    ritmo: "8 a 10 meses",
    recibe: "Diploma en Teología Ministerial",
    descripcion: "La teología sistemática completa, los libros que faltan, la predicación expositiva, la historia, la apologética y la ética del ministro.",
    requisitos: ["Las 10 materias aprobadas", "El examen integral del nivel", "30 horas de práctica confirmada", "Un sermón evaluado con rúbrica"],
    materias: [
      SISTEMATICA_1,
      SISTEMATICA_2,
      SISTEMATICA_3,
      SISTEMATICA_4,
      POETICOS_PROFETICOS,
      EPISTOLAS_APOCALIPSIS,
      HOMILETICA_2,
      HISTORIA_2,
      APOLOGETICA,
      ETICA,
    ],
  },
  {
    n: 5,
    nombre: "Liderazgo y docencia",
    etapa: "ministerio",
    para: "Pastores y profesores de la academia",
    base: "2 Timoteo 2:2",
    ritmo: "6 a 8 meses",
    recibe: "Diplomado Superior en Ministerio Cristiano",
    descripcion: "Pastorear, administrar, enseñar y formar a otros: el nivel de quienes multiplican.",
    requisitos: ["Las 8 materias aprobadas", "El examen integral del nivel", "El proyecto final con defensa en vivo", "Acompañar a 2 personas hasta terminar el Nivel 1"],
    materias: [
      TEOLOGIA_PASTORAL,
      ADMINISTRACION,
      DIDACTICA,
      LIDERAZGO_2,
      IDIOMAS,
      EXEGESIS,
      AVIVAMIENTO,
      SEMINARIO,
    ],
  },
];

// ---------------------------------------------------------------- especialidad Evangelismo y misiones

const EV_PERSONAL_AVANZADO: MateriaDef = {
  id: "evangelismo-misiones-1",
  nivel: null,
  especialidad: "evangelismo-misiones",
  orden: 1,
  titulo: "Evangelismo personal avanzado",
  resumen: "El corazón del evangelista, el evangelio y sus distorsiones, hablar según la persona, la familia y los amigos, la valentía que nace de la oración y formar a otros para evangelizar.",
  base: "2 Corintios 5:20; Proverbios 11:30",
  memoria: "Proverbios 11:30",
  antes: "Evangelismo 3",
  lecciones: lecciones("evangelismo-misiones-1", [
    ["El corazón del evangelista", "Proverbios 11:30; 2 Corintios 5:14; 2 Corintios 5:20; Romanos 10:1; 1 Timoteo 2:1-4"],
    ["El evangelio y sus distorsiones", "1 Corintios 15:3-4; Marcos 1:15; Gálatas 1:6-7; Lucas 14:27"],
    ["Hablar según la persona", "Hechos 17:2-3; Hechos 17:22-23; 1 Corintios 9:22"],
    ["La familia y los amigos", "Marcos 5:19; Hechos 10:24; Hechos 16:31-34; Juan 1:45-46"],
    ["Valentía y oración", "Hechos 4:29-31; Efesios 6:19-20; Hechos 20:24"],
    ["Formar a otros para evangelizar", "Lucas 10:1-2; Hechos 8:4; 2 Timoteo 2:2; Lucas 15:7"],
  ], 10),
  silabo: {
    proposito:
      "Que el creyente que ya comparte su fe lo haga con más profundidad y fruto: con un corazón movido por el amor de Cristo, con el evangelio claro y sin distorsiones, hablando según la historia de cada persona, empezando por los suyos, con la valentía que nace de la oración y formando a otros para que también evangelicen. Continúa lo aprendido en Compartir mi fe, Evangelismo personal y Evangelismo y consolidación. Su lema: «El fruto del justo es árbol de vida; Y el que gana almas es sabio» (Proverbios 11:30).",
    objetivos: [
      { id: "o1", texto: "Explicar qué mueve al evangelista y practicar la oración por personas concretas.", bloom: "comprender" },
      { id: "o2", texto: "Resumir el evangelio con fidelidad y reconocer sus distorsiones comunes.", bloom: "analizar" },
      { id: "o3", texto: "Adaptar la conversación a la historia de cada persona sin cambiar el mensaje.", bloom: "aplicar" },
      { id: "o4", texto: "Planificar cómo compartir la fe con la familia y los amigos.", bloom: "aplicar" },
      { id: "o5", texto: "Evaluar los temores que frenan el evangelismo y responder con oración y valentía.", bloom: "evaluar" },
      { id: "o6", texto: "Diseñar un plan para formar a otro creyente en el evangelismo.", bloom: "crear" },
      { id: "o7", texto: "Recitar Proverbios 11:30 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "El evangelio, sus distorsiones y los ejemplos bíblicos de evangelismo personal.",
      ser: "Un testigo movido por el amor de Cristo, que ora, escucha y habla con valentía.",
      hacer: "Compartir el evangelio según cada persona y formar a otros para que también lo hagan.",
    },
    bibliografia: {
      basica: [{ autor: "Robert E. Coleman", titulo: "Plan supremo de evangelización", editorial: "Casa Bautista de Publicaciones" }],
      complementaria: [
        { autor: "Rebecca Manley Pippert", titulo: "Fuera del salero" },
        { autor: "Billy Graham", titulo: "Paz con Dios", nota: "Un clásico para leer con los nuevos creyentes." },
      ],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de 1 Corintios", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=6f0kym4bUmE", minutos: 10 },
      { tipo: "video", titulo: "Resumen del libro de Hechos (parte 1)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=5h7Q0EK-m8I", minutos: 9 },
      { tipo: "lectura", titulo: "Hechos 17: Pablo en Tesalónica y en Atenas", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Hechos&cap=17" },
      { tipo: "lectura", titulo: "Marcos 5: el hombre de Gadara vuelve a los suyos", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Marcos&cap=5" },
    ],
  },
  disponible: true,
};

const CAMPANAS: MateriaDef = {
  id: "evangelismo-misiones-2",
  nivel: null,
  especialidad: "evangelismo-misiones",
  orden: 2,
  titulo: "Campañas y cruzadas",
  resumen: "La proclamación pública en la Biblia, lecciones de la historia, preparar una campaña, el mensaje y el llamado, consejeros y seguimiento, e integridad y evaluación.",
  base: "Mateo 9:35-38; 2 Timoteo 4:5",
  memoria: "2 Timoteo 4:5",
  lecciones: lecciones("evangelismo-misiones-2", [
    ["La proclamación pública en la Biblia", "2 Timoteo 4:5; Mateo 9:35-38; Jonás 3:4-5; Hechos 2:14; Hechos 2:41-42; Hechos 8:5-8"],
    ["Lecciones de la historia", "Hechos 19:9-10; Romanos 10:14-15"],
    ["Preparar una campaña", "Hechos 1:14; Juan 17:21; Lucas 14:28"],
    ["El mensaje y el llamado", "1 Corintios 2:1-5; 2 Corintios 4:2; 2 Corintios 4:5; Hechos 2:38"],
    ["Consejeros y seguimiento", "Colosenses 1:28; Juan 15:16"],
    ["Integridad y evaluación", "1 Tesalonicenses 2:3-5; 2 Corintios 8:21"],
  ], 10),
  silabo: {
    proposito:
      "Que el creyente sepa servir en una campaña evangelística o prepararla con otros: con la compasión de Jesús por las multitudes, aprendiendo de la Biblia y de la historia, con oración y unidad entre las iglesias, un mensaje claro y un llamado honesto, consejeros preparados, un seguimiento que haga discípulos y una integridad que proteja el testimonio del evangelio. Lo pide Pablo: «haz obra de evangelista, cumple tu ministerio» (2 Timoteo 4:5).",
    objetivos: [
      { id: "o1", texto: "Describir ejemplos bíblicos de proclamación pública y su fruto.", bloom: "comprender" },
      { id: "o2", texto: "Explicar lo que enseña la historia de las campañas, de Whitefield y Wesley a Billy Graham.", bloom: "comprender" },
      { id: "o3", texto: "Planificar los pasos para preparar una campaña con oración, unidad y presupuesto.", bloom: "aplicar" },
      { id: "o4", texto: "Distinguir un mensaje y un llamado fieles de la manipulación.", bloom: "analizar" },
      { id: "o5", texto: "Organizar el trabajo de los consejeros y el seguimiento de los que responden.", bloom: "aplicar" },
      { id: "o6", texto: "Evaluar una campaña por su integridad y por su fruto.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar 2 Timoteo 4:5 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "La proclamación pública en la Biblia y en la historia, y los pasos de una campaña.",
      ser: "Un servidor compasivo e íntegro, que busca discípulos y no números.",
      hacer: "Preparar una campaña con otros, servir como consejero y cuidar a los que responden.",
    },
    bibliografia: {
      basica: [
        { autor: "Robert E. Coleman", titulo: "Plan supremo de evangelización", editorial: "Casa Bautista de Publicaciones" },
        { autor: "Justo L. González", titulo: "Historia del cristianismo, tomo 2: desde la era de la Reforma hasta la era inconclusa", editorial: "Unilit" },
      ],
      complementaria: [{ autor: "Billy Graham", titulo: "Paz con Dios", nota: "Un clásico del evangelista para leer con los nuevos creyentes." }],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Hechos (parte 1)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=5h7Q0EK-m8I", minutos: 9 },
      { tipo: "lectura", titulo: "Hechos 2: Pentecostés", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Hechos&cap=2" },
      { tipo: "lectura", titulo: "Hechos 8: Felipe en Samaria", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Hechos&cap=8" },
    ],
  },
  disponible: true,
};

const TEOLOGIA_MISIONES: MateriaDef = {
  id: "evangelismo-misiones-3",
  nivel: null,
  especialidad: "evangelismo-misiones",
  avanzada: true,
  orden: 3,
  titulo: "Teología bíblica de las misiones",
  resumen: "El Dios que envía, la promesa a Abraham y la misión de Israel, Jesús y las naciones, el Espíritu y la iglesia que envía en Hechos, la estrategia de Pablo y la meta: gente de toda nación, tribu y lengua.",
  base: "Génesis 12:3; Juan 20:21; Apocalipsis 7:9",
  memoria: "Juan 20:21",
  lecciones: lecciones("evangelismo-misiones-3", [
    ["El Dios que envía", "Juan 20:21; Juan 3:16; Isaías 6:8"],
    ["La promesa a Abraham y la misión de Israel", "Génesis 12:1-3; Gálatas 3:8; Éxodo 19:5-6; Isaías 49:6; Salmos 67:1-2"],
    ["Jesús y las naciones", "Mateo 28:18-20; Lucas 24:46-48; Mateo 24:14"],
    ["El Espíritu y la iglesia que envía", "Hechos 1:8; Hechos 11:19-21; Hechos 13:1-3"],
    ["Pablo, el misionero", "Romanos 15:20-21; Hechos 14:21-23; 1 Corintios 9:19"],
    ["Toda nación, tribu y lengua", "Apocalipsis 7:9-10; Apocalipsis 5:9; 3 Juan 1:5-8; Filipenses 4:15-16"],
  ], 10),
  silabo: {
    proposito:
      "Que el creyente ya formado entienda la misión como la obra de Dios de Génesis a Apocalipsis: el Dios que envía, la promesa a Abraham y el llamado de Israel, la gran comisión a todas las naciones, el Espíritu que impulsa a la iglesia en Hechos, la estrategia de Pablo y la meta de una multitud de todos los pueblos que adora al Cordero. Es una materia avanzada: pide el Nivel 3. No enseña el orden de los acontecimientos del fin, que es un punto de la declaración de fe por confirmar. Su base es la palabra de Jesús: «Como me envió el Padre, así también yo os envío» (Juan 20:21).",
    objetivos: [
      { id: "o1", texto: "Explicar la misión como obra de Dios que nace de su amor.", bloom: "comprender" },
      { id: "o2", texto: "Analizar la misión de Dios en el Antiguo Testamento: Abraham, Israel, los Salmos y Jonás.", bloom: "analizar" },
      { id: "o3", texto: "Interpretar la gran comisión según Mateo y Lucas.", bloom: "comprender" },
      { id: "o4", texto: "Describir cómo el Espíritu impulsa en Hechos a una iglesia que envía.", bloom: "comprender" },
      { id: "o5", texto: "Analizar la estrategia misionera de Pablo.", bloom: "analizar" },
      { id: "o6", texto: "Evaluar las formas de participar hoy en la misión, también desde América Latina.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar Juan 20:21 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "La misión de Dios en toda la Biblia, de Génesis a Apocalipsis.",
      ser: "Un creyente con el corazón de Dios por todos los pueblos.",
      hacer: "Orar, ir, enviar, dar y recibir para que todos los pueblos conozcan a Cristo.",
    },
    bibliografia: {
      basica: [
        { autor: "Jonatán P. Lewis (ed.)", titulo: "Misión mundial: un análisis del movimiento cristiano mundial", editorial: "Unilit", nota: "Tres tomos: las bases bíblicas e históricas, la dimensión estratégica y las consideraciones transculturales." },
        { autor: "Samuel Escobar", titulo: "Tiempo de misión: América Latina y la misión cristiana hoy", editorial: "Clara-Semilla" },
      ],
      complementaria: [{ autor: "Orlando E. Costas", titulo: "La iglesia y su misión evangelizadora", editorial: "La Aurora" }],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Juan (parte 2)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=NUW1Frg8DA0", minutos: 9 },
      { tipo: "video", titulo: "Resumen del libro de Hechos (parte 2)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=ZKaaHQUdVCY", minutos: 9 },
      { tipo: "lectura", titulo: "Génesis 12: la promesa a Abram", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Genesis&cap=12" },
      { tipo: "lectura", titulo: "Hechos 13: Antioquía envía a Bernabé y a Saulo", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Hechos&cap=13" },
    ],
  },
  disponible: true,
};

const MISION_TRANSCULTURAL: MateriaDef = {
  id: "evangelismo-misiones-4",
  nivel: null,
  especialidad: "evangelismo-misiones",
  avanzada: true,
  orden: 4,
  titulo: "Misión transcultural",
  resumen: "Cruzar fronteras culturales, el modelo de la encarnación, el evangelio y la cultura, la Biblia en la lengua del corazón, el misionero y su familia, y las naciones que viven en nuestra ciudad.",
  base: "Hechos 10:34-35; Juan 1:14",
  memoria: "Hechos 10:34-35",
  lecciones: lecciones("evangelismo-misiones-4", [
    ["Cruzar fronteras culturales", "Hechos 10:34-35; Hechos 10:15; Hechos 10:28; Hechos 17:26-27"],
    ["El modelo de la encarnación", "Juan 1:14; Filipenses 2:5-7; 1 Corintios 9:20; Rut 1:16"],
    ["El evangelio y la cultura", "Hechos 15:19-20; Gálatas 3:28"],
    ["La Biblia en la lengua del corazón", "Romanos 10:17; Nehemías 8:8"],
    ["El misionero y su familia", "Hechos 16:9-10; 2 Corintios 11:26-27"],
    ["Las naciones a la puerta de casa", "Deuteronomio 10:18-19; Mateo 25:35; Jeremías 29:7"],
  ], 10),
  silabo: {
    proposito:
      "Que el creyente ya formado sepa llevar el evangelio a personas de otra cultura, en otro país o en su propia ciudad: reconociendo sus prejuicios, siguiendo el modelo de Cristo, que se hizo carne y habitó entre nosotros, distinguiendo el evangelio de las costumbres, comunicando en la lengua del corazón, preparándose para el costo de la misión y cuidando a los que van. Es una materia avanzada: pide el Nivel 3. Su base es la palabra de Pedro en casa de Cornelio: «En verdad comprendo que Dios no hace acepción de personas, sino que en toda nación se agrada del que le teme y hace justicia» (Hechos 10:34-35).",
    objetivos: [
      { id: "o1", texto: "Explicar qué es la cultura y qué significa cruzar una frontera cultural con el evangelio.", bloom: "comprender" },
      { id: "o2", texto: "Aplicar el modelo de la encarnación a la manera de servir en otra cultura.", bloom: "aplicar" },
      { id: "o3", texto: "Distinguir el evangelio de las costumbres del misionero y de la cultura local.", bloom: "analizar" },
      { id: "o4", texto: "Explicar el valor de comunicar el evangelio y la Biblia en la lengua de cada pueblo.", bloom: "comprender" },
      { id: "o5", texto: "Evaluar los desafíos del misionero y de su familia, y cómo cuidarlos.", bloom: "evaluar" },
      { id: "o6", texto: "Planificar cómo alcanzar a personas de otra cultura en la propia ciudad.", bloom: "crear" },
      { id: "o7", texto: "Recitar Hechos 10:34-35 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "La cultura, el modelo de la encarnación, el concilio de Jerusalén y la historia de la Biblia en español.",
      ser: "Un siervo humilde, sin prejuicios, que ama a las personas de toda cultura.",
      hacer: "Servir y comunicar el evangelio a personas de otra cultura, también a los inmigrantes de su ciudad.",
    },
    bibliografia: {
      basica: [
        { autor: "Jonatán P. Lewis (ed.)", titulo: "Misión mundial: un análisis del movimiento cristiano mundial", editorial: "Unilit", nota: "Sobre todo el tomo 3: las consideraciones transculturales." },
        { autor: "Charles Van Engen", titulo: "El pueblo misionero de Dios", editorial: "Libros Desafío" },
      ],
      complementaria: [{ autor: "Samuel Escobar", titulo: "Tiempo de misión: América Latina y la misión cristiana hoy", editorial: "Clara-Semilla" }],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Hechos (parte 1)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=5h7Q0EK-m8I", minutos: 9 },
      { tipo: "video", titulo: "Resumen del libro de Hechos (parte 2)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=ZKaaHQUdVCY", minutos: 9 },
      { tipo: "lectura", titulo: "Hechos 10: Pedro en casa de Cornelio", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Hechos&cap=10" },
      { tipo: "lectura", titulo: "Hechos 15: el concilio de Jerusalén", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Hechos&cap=15" },
    ],
  },
  disponible: true,
};

const PLANTACION: MateriaDef = {
  id: "evangelismo-misiones-5",
  nivel: null,
  especialidad: "evangelismo-misiones",
  avanzada: true,
  orden: 5,
  titulo: "Plantación de iglesias",
  resumen: "Por qué plantar iglesias, el plantador y su equipo, conocer el lugar y la gente, empezar en las casas, formar líderes y organizar la iglesia, y una iglesia que se multiplica.",
  base: "Mateo 16:18; 1 Corintios 3:6",
  memoria: "Mateo 16:18",
  lecciones: lecciones("evangelismo-misiones-5", [
    ["Por qué plantar iglesias", "Mateo 16:18; 1 Corintios 3:6-7; 1 Corintios 3:10-11"],
    ["El plantador y su equipo", "Hechos 13:2-3; Romanos 16:3-5; Hechos 18:3-4; Hechos 18:11"],
    ["Conocer el lugar y la gente", "Nehemías 2:12-13; Nehemías 2:17-18; Hechos 17:16-17"],
    ["Empezar: casas, grupos y discípulos", "Hechos 16:13-15; Hechos 2:46-47; Hechos 20:20"],
    ["Formar líderes y organizar la iglesia", "Tito 1:5; Efesios 4:11-12"],
    ["Una iglesia que se multiplica", "1 Tesalonicenses 1:8; Filipenses 1:5-6; Hechos 19:9-10"],
  ], 10),
  silabo: {
    proposito:
      "Que el creyente ya formado sepa participar en la plantación de una iglesia nueva, en su ciudad o en otro lugar: entendiendo que Cristo edifica su iglesia y que Dios da el crecimiento, con el carácter y el equipo que pide la obra, conociendo el lugar, empezando en las casas, formando líderes del lugar y sembrando desde el principio una iglesia que se multiplique. Es una materia avanzada: pide el Nivel 3. Quién puede ejercer cada cargo es un punto de la declaración de fe por confirmar. Su base es la promesa de Jesús: «edificaré mi iglesia; y las puertas del Hades no prevalecerán contra ella» (Mateo 16:18).",
    objetivos: [
      { id: "o1", texto: "Explicar por qué plantar iglesias es parte de la misión y quién da el crecimiento.", bloom: "comprender" },
      { id: "o2", texto: "Describir el llamado, el carácter y el equipo del plantador.", bloom: "comprender" },
      { id: "o3", texto: "Aplicar el estudio de la comunidad antes de plantar.", bloom: "aplicar" },
      { id: "o4", texto: "Planificar los primeros pasos de una iglesia que empieza en las casas.", bloom: "aplicar" },
      { id: "o5", texto: "Analizar cómo formar líderes y organizar una iglesia que no dependa del plantador.", bloom: "analizar" },
      { id: "o6", texto: "Diseñar los pasos para que una iglesia nueva llegue a plantar otra.", bloom: "crear" },
      { id: "o7", texto: "Recitar Mateo 16:18 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "Cómo nacieron y se multiplicaron las iglesias del Nuevo Testamento.",
      ser: "Un siervo paciente, que trabaja en equipo y confía en que Dios da el crecimiento.",
      hacer: "Estudiar un lugar, empezar grupos en las casas, formar líderes y sembrar una iglesia que se multiplique.",
    },
    bibliografia: {
      basica: [
        { autor: "Clint Clifton", titulo: "Umbrales para la plantación de iglesias: una guía centrada en el evangelio", editorial: "Send Network (NAMB)" },
        { autor: "Jonatán P. Lewis (ed.)", titulo: "Misión mundial: un análisis del movimiento cristiano mundial", editorial: "Unilit", nota: "Sobre todo el tomo 2: la dimensión estratégica." },
      ],
      complementaria: [{ autor: "Charles Van Engen", titulo: "El pueblo misionero de Dios", editorial: "Libros Desafío" }],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de 1 Corintios", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=6f0kym4bUmE", minutos: 10 },
      { tipo: "video", titulo: "Resumen de los libros de Esdras-Nehemías", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=OGdiLZ92nQs", minutos: 10 },
      { tipo: "video", titulo: "Resumen del libro de Hechos (parte 2)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=ZKaaHQUdVCY", minutos: 9 },
      { tipo: "lectura", titulo: "Hechos 16: la iglesia de Filipos", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Hechos&cap=16" },
    ],
  },
  disponible: true,
};

const TEOLOGIA_ADORACION: MateriaDef = {
  id: "alabanza-1",
  nivel: null,
  especialidad: "alabanza",
  orden: 1,
  titulo: "Teología de la adoración",
  resumen: "Qué es adorar, Dios en el centro, la adoración del Antiguo Testamento, lo que cambió con Cristo, adorar en espíritu y en verdad, y la adoración de toda la vida y la del cielo.",
  base: "Juan 4:23-24; Romanos 12:1",
  memoria: "Juan 4:23-24",
  lecciones: lecciones("alabanza-1", [
    ["Qué es adorar", "Juan 4:23-24; Salmos 95:6; Génesis 22:5; Mateo 4:10"],
    ["Dios, el centro de la adoración", "Apocalipsis 4:11; Isaías 6:1-3; Éxodo 20:3-5"],
    ["La adoración en el Antiguo Testamento", "Éxodo 25:8; 1 Crónicas 16:29; 2 Crónicas 5:13-14; Salmos 100:1-5"],
    ["Cristo y la adoración del Nuevo Testamento", "Juan 2:19-21; Hebreos 10:19-22; Hebreos 13:15; 1 Pedro 2:5"],
    ["En espíritu y en verdad", "Juan 4:24; Juan 17:17; Colosenses 3:16; Efesios 5:18-19"],
    ["La adoración de toda la vida", "Romanos 12:1-2; Amós 5:21-24; Miqueas 6:8; Apocalipsis 5:9-13"],
  ], 10),
  silabo: {
    proposito:
      "Que el creyente entienda qué es la adoración según toda la Biblia, para adorar y servir en el ministerio de alabanza con fundamento: con Dios en el centro, con la adoración del Antiguo Testamento cumplida en Cristo, en espíritu y en verdad, y con toda la vida. Es la base de la especialidad Alabanza y adoración. Su base es la palabra de Jesús a la mujer samaritana: «los verdaderos adoradores adorarán al Padre en espíritu y en verdad» (Juan 4:23).",
    objetivos: [
      { id: "o1", texto: "Explicar qué es adorar según la Biblia y cómo se relacionan la alabanza y la adoración.", bloom: "comprender" },
      { id: "o2", texto: "Reconocer a Dios como el centro y el único digno de la adoración, y las formas de idolatría en la alabanza.", bloom: "analizar" },
      { id: "o3", texto: "Describir la adoración del Antiguo Testamento: el tabernáculo, el templo y los salmos.", bloom: "comprender" },
      { id: "o4", texto: "Explicar cómo Cristo cumplió el templo y los sacrificios y abrió el camino al Padre.", bloom: "comprender" },
      { id: "o5", texto: "Evaluar si un canto o un culto adora en espíritu y en verdad.", bloom: "evaluar" },
      { id: "o6", texto: "Aplicar la adoración a toda la vida, con justicia y misericordia.", bloom: "aplicar" },
      { id: "o7", texto: "Recitar Juan 4:23-24 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "La enseñanza bíblica de la adoración en los dos testamentos, desde el tabernáculo hasta el trono del Cordero.",
      ser: "Un adorador que se inclina delante de Dios y vive para su gloria.",
      hacer: "Adorar, y ayudar a otros a adorar, en espíritu y en verdad, en el culto y en toda la vida.",
    },
    bibliografia: {
      basica: [
        { autor: "Bob Kauflin", titulo: "Nuestra adoración importa: guiando a otros a encontrarse con Dios", editorial: "B&H Español" },
        { autor: "Marcos Witt", titulo: "Adoremos", editorial: "Editorial Caribe" },
      ],
      complementaria: [{ autor: "A. W. Tozer", titulo: "La búsqueda de Dios", editorial: "Moody Publishers" }],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Juan (parte 1)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=OU16-2Sg_CQ", minutos: 10 },
      { tipo: "video", titulo: "Resumen del libro de Hebreos", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=VqVAOqyoKCs", minutos: 10 },
      { tipo: "lectura", titulo: "Juan 4: la mujer samaritana", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Juan&cap=4" },
      { tipo: "lectura", titulo: "Apocalipsis 5: el cántico nuevo", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Apocalipsis&cap=5" },
    ],
  },
  disponible: true,
};

const ADORADOR: MateriaDef = {
  id: "alabanza-2",
  nivel: null,
  especialidad: "alabanza",
  orden: 2,
  titulo: "El adorador: carácter y vida",
  resumen: "Un corazón conforme al de Dios, manos limpias y corazón puro, humildad, la vida devocional, el servicio en equipo y bajo autoridad, y la adoración en la prueba.",
  base: "Salmos 24:3-4; 1 Samuel 16:7",
  memoria: "Salmos 24:3-4",
  lecciones: lecciones("alabanza-2", [
    ["Un corazón conforme al de Dios", "1 Samuel 16:7; Hechos 13:22; Salmos 51:10-12"],
    ["Manos limpias y corazón puro", "Salmos 24:3-4; Isaías 6:5-7; 1 Juan 1:9"],
    ["Humildad: la gloria es de Dios", "Juan 3:30; 1 Corintios 4:7; 1 Pedro 5:5-6; 2 Samuel 6:14"],
    ["La vida devocional del adorador", "Marcos 1:35; Salmos 63:1; Lucas 10:39-42"],
    ["Servir en equipo y bajo autoridad", "1 Corintios 12:12; Filipenses 2:3-4; Hebreos 13:17"],
    ["El adorador en la prueba", "Job 1:20-21; Hechos 16:25; Habacuc 3:18; Gálatas 5:22-23"],
  ], 10),
  silabo: {
    proposito:
      "Que el que sirve en la alabanza cuide su vida antes que su música: un corazón conforme al de Dios, santidad y arrepentimiento, humildad, una vida devocional constante, el servicio en equipo bajo la autoridad de los pastores y la adoración en medio de la prueba. Lo que se ve en la plataforma nace de lo que se vive en lo secreto. Su base es la pregunta del salmista: «¿Quién subirá al monte de Jehová? ¿Y quién estará en su lugar santo? El limpio de manos y puro de corazón» (Salmos 24:3-4).",
    objetivos: [
      { id: "o1", texto: "Describir el corazón conforme al de Dios con el ejemplo de David.", bloom: "comprender" },
      { id: "o2", texto: "Explicar por qué la santidad y el arrepentimiento son parte de la vida del adorador.", bloom: "comprender" },
      { id: "o3", texto: "Distinguir la humildad del orgullo en el ministerio de alabanza.", bloom: "analizar" },
      { id: "o4", texto: "Planificar una vida devocional constante.", bloom: "crear" },
      { id: "o5", texto: "Aplicar la enseñanza del cuerpo de Cristo al servicio en equipo y bajo autoridad.", bloom: "aplicar" },
      { id: "o6", texto: "Evaluar cómo adorar a Dios en la prueba y cómo se ve el fruto del Espíritu en la vida diaria.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar Salmos 24:3-4 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "Lo que la Biblia enseña del corazón, la santidad, la humildad y la vida devocional del adorador.",
      ser: "Un adorador íntegro, humilde y constante, en lo secreto y en lo público.",
      hacer: "Cuidar su vida con Dios, servir en equipo bajo autoridad y adorar también en la prueba.",
    },
    bibliografia: {
      basica: [
        { autor: "A. W. Tozer", titulo: "La búsqueda de Dios", editorial: "Moody Publishers" },
        { autor: "Richard J. Foster", titulo: "Celebración de la disciplina", editorial: "Peniel", nota: "Para leer con discernimiento: algunas prácticas contemplativas que describe no forman parte de esta materia." },
      ],
      complementaria: [{ autor: "Marcos Witt", titulo: "¿Qué hacemos con estos músicos?", editorial: "Editorial Caribe" }],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de 1 Samuel", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=34biq4ivs5I", minutos: 8 },
      { tipo: "video", titulo: "Resumen del libro de 2 Samuel", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=BEvicPpjQBE", minutos: 6 },
      { tipo: "lectura", titulo: "Salmo 51: un corazón limpio", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Salmos&cap=51" },
      { tipo: "lectura", titulo: "Salmo 24: ¿quién subirá al monte de Jehová?", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Salmos&cap=24" },
    ],
  },
  disponible: true,
};

const DIRIGIR_ALABANZA: MateriaDef = {
  id: "alabanza-3",
  nivel: null,
  especialidad: "alabanza",
  orden: 3,
  titulo: "Dirigir el ministerio de alabanza",
  resumen: "El director como siervo que guía al pueblo, cómo escoger los cantos, preparar el culto y el ensayo, dirigir con orden y sin manipular, formar el equipo y resolver los problemas comunes.",
  base: "Salmos 33:3; 1 Crónicas 15:22",
  memoria: "Salmos 33:3",
  lecciones: lecciones("alabanza-3", [
    ["El director: un siervo que guía", "1 Crónicas 15:22; Nehemías 12:46; Marcos 10:45; 2 Crónicas 20:21-22"],
    ["Escoger las canciones", "Colosenses 3:16; Salmos 47:7; Salmos 96:1; 1 Corintios 14:26"],
    ["Preparar el culto y el ensayo", "Salmos 33:3; 1 Crónicas 25:7-8; Proverbios 21:5; Colosenses 3:23"],
    ["Dirigir con sencillez y orden", "1 Corintios 14:40; 1 Corintios 14:33; Esdras 3:11"],
    ["Formar el equipo", "1 Crónicas 25:1; 1 Crónicas 25:7-8; 2 Timoteo 2:2"],
    ["Problemas comunes y cómo resolverlos", "Santiago 3:16; Mateo 18:15; Proverbios 15:1; Romanos 15:5-6; Marcos 6:31"],
  ], 10),
  silabo: {
    proposito:
      "Que el que dirige, o dirigirá, el ministerio de alabanza sepa guiar al pueblo de Dios a adorar: como un siervo, escogiendo los cantos con criterios bíblicos, preparando el culto y el ensayo, dirigiendo con orden y sin manipular, formando un equipo que siga la obra y resolviendo los problemas con la Palabra. Quién puede ejercer cada cargo en la iglesia es un punto de la declaración de fe por confirmar: cada iglesia nombra a sus directores bajo la autoridad de sus pastores. Su base es la invitación del salmista: «Cantadle cántico nuevo; Hacedlo bien, tañendo con júbilo» (Salmos 33:3).",
    objetivos: [
      { id: "o1", texto: "Explicar el papel del director de alabanza como un siervo que guía al pueblo a Dios.", bloom: "comprender" },
      { id: "o2", texto: "Seleccionar los cantos de un culto con criterios bíblicos y pastorales.", bloom: "aplicar" },
      { id: "o3", texto: "Planificar un culto y un ensayo.", bloom: "crear" },
      { id: "o4", texto: "Distinguir entre guiar al pueblo y manipularlo, y dirigir con orden y sencillez.", bloom: "analizar" },
      { id: "o5", texto: "Describir cómo se elige, se forma y se acompaña al equipo de alabanza.", bloom: "comprender" },
      { id: "o6", texto: "Evaluar los problemas comunes del ministerio y proponer soluciones bíblicas.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar Salmos 33:3 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "Los directores de cantores de Israel, los criterios para escoger los cantos y los principios de orden del culto.",
      ser: "Un líder siervo, preparado y humilde, que no busca su gloria.",
      hacer: "Escoger los cantos, preparar el culto y el ensayo, dirigir, formar al equipo y resolver los conflictos.",
    },
    bibliografia: {
      basica: [
        { autor: "Bob Kauflin", titulo: "Nuestra adoración importa: guiando a otros a encontrarse con Dios", editorial: "B&H Español" },
        { autor: "Marcos Witt", titulo: "¿Qué hacemos con estos músicos?", editorial: "Editorial Caribe" },
      ],
      complementaria: [{ autor: "J. Oswald Sanders", titulo: "Liderazgo espiritual", editorial: "Portavoz" }],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Crónicas", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=lMj--4fDpvc", minutos: 8 },
      { tipo: "video", titulo: "Resumen del libro de 1 Corintios", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=6f0kym4bUmE", minutos: 10 },
      { tipo: "lectura", titulo: "1 Crónicas 25: los músicos del templo", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=1%20Cronicas&cap=25" },
      { tipo: "lectura", titulo: "1 Corintios 14: el orden en el culto", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=1%20Corintios&cap=14" },
    ],
  },
  disponible: true,
};

const HISTORIA_MUSICA: MateriaDef = {
  id: "alabanza-4",
  nivel: null,
  especialidad: "alabanza",
  orden: 4,
  titulo: "La música en la historia de la iglesia",
  resumen: "La música en Israel, en Jesús y la primera iglesia, en la iglesia antigua y medieval, en la Reforma, en los himnos de los avivamientos y en la alabanza de hoy.",
  base: "Salmos 145:4; Apocalipsis 15:3",
  memoria: "Salmos 145:4",
  lecciones: lecciones("alabanza-4", [
    ["La música en el pueblo de Israel", "Éxodo 15:1-2; Éxodo 15:20-21; Salmos 150:3-6; 2 Crónicas 29:27-28"],
    ["Jesús y la iglesia de los primeros siglos", "Mateo 26:30; Efesios 5:19; Filipenses 2:10-11"],
    ["La iglesia antigua y la Edad Media", "1 Corintios 14:16"],
    ["La Reforma: el pueblo vuelve a cantar", "Salmos 46:1; 1 Corintios 14:15; Colosenses 3:16"],
    ["Los himnos de los avivamientos", "Salmos 40:3"],
    ["Del avivamiento pentecostal a la alabanza de hoy", "Salmos 145:4; Salmos 78:4; Apocalipsis 15:3"],
  ], 10),
  silabo: {
    proposito:
      "Que el que sirve en la alabanza conozca cómo ha cantado el pueblo de Dios a lo largo de la historia, desde Israel hasta hoy, para aprender de sus aciertos y de sus errores: cantar las obras de Dios, con todo el pueblo, en su lengua y con entendimiento, sin despreciar lo antiguo ni lo nuevo. Los datos de historia se comprobaron en obras de referencia, y las cifras de himnos, que varían según las fuentes, se dicen sin números exactos. Su base es la promesa del salmista: «Generación a generación celebrará tus obras, Y anunciará tus poderosos hechos» (Salmos 145:4).",
    objetivos: [
      { id: "o1", texto: "Describir el lugar de la música en la adoración de Israel.", bloom: "comprender" },
      { id: "o2", texto: "Explicar cómo cantaban Jesús, los apóstoles y la iglesia de los primeros siglos.", bloom: "comprender" },
      { id: "o3", texto: "Analizar los cambios del canto de la iglesia en la antigüedad y en la Edad Media.", bloom: "analizar" },
      { id: "o4", texto: "Explicar el aporte de la Reforma al canto de la congregación.", bloom: "comprender" },
      { id: "o5", texto: "Reconocer el aporte de los himnos de los avivamientos, también en español.", bloom: "recordar" },
      { id: "o6", texto: "Evaluar la alabanza de hoy a la luz de la historia y de la Palabra.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar Salmos 145:4 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "La historia de la música del pueblo de Dios, de Israel a la Reforma, los avivamientos y la alabanza de hoy.",
      ser: "Un servidor agradecido por la herencia que recibió y abierto a los cantos nuevos.",
      hacer: "Escoger y enseñar cantos antiguos y nuevos probados por la Palabra, para que cante todo el pueblo.",
    },
    bibliografia: {
      basica: [
        { autor: "Justo L. González", titulo: "Historia del cristianismo", editorial: "Unilit", nota: "Los dos tomos: la iglesia antigua y medieval, y la Reforma y los avivamientos." },
        { autor: "J. Peter Burkholder, Donald J. Grout y Claude V. Palisca", titulo: "Historia de la música occidental", editorial: "Alianza Editorial" },
      ],
      complementaria: [{ autor: "Marcos Witt", titulo: "Adoremos", editorial: "Editorial Caribe" }],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Éxodo (parte 1)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=y9pED55wMM4", minutos: 7 },
      { tipo: "video", titulo: "Resumen del libro de Mateo (parte 2)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=EobkNEf-ySA", minutos: 8 },
      { tipo: "lectura", titulo: "Éxodo 15: el cántico de Moisés", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Exodo&cap=15" },
      { tipo: "lectura", titulo: "Salmo 46: castillo fuerte", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Salmos&cap=46" },
    ],
  },
  disponible: true,
};

const SONIDO_TECNICA: MateriaDef = {
  id: "alabanza-5",
  nivel: null,
  especialidad: "alabanza",
  orden: 5,
  titulo: "Sonido y técnica al servicio del culto",
  resumen: "El técnico como servidor, el sonido y la sala, los micrófonos y la consola, el acople, los monitores y el volumen, la proyección, la transmisión y los derechos de autor, y la seguridad y el cuidado del equipo.",
  base: "1 Corintios 14:8-9; Éxodo 31:2-5",
  memoria: "1 Corintios 14:8",
  lecciones: lecciones("alabanza-5", [
    ["El técnico es un servidor", "Éxodo 31:2-5; Éxodo 35:35; 1 Pedro 4:10; 1 Corintios 12:21-22"],
    ["El sonido y la sala", "1 Corintios 14:8-9; Nehemías 8:3-4; Nehemías 8:8"],
    ["Los micrófonos y la consola", "Proverbios 22:29; 2 Timoteo 2:15"],
    ["Los monitores, el acople y el volumen", "Filipenses 2:4; 1 Corintios 13:1"],
    ["Proyección, transmisión y derechos de autor", "Habacuc 2:2; Romanos 13:7"],
    ["Seguridad, cuidado del equipo y trabajo en equipo", "Proverbios 27:23; Lucas 16:10; 1 Corintios 14:40"],
  ], 10),
  silabo: {
    proposito:
      "Que el que sirve en el sonido, la proyección o la transmisión entienda su servicio como un ministerio y lo haga con excelencia: para que la Palabra se entienda y el pueblo pueda cantar unido, con lo básico de los micrófonos, la consola, los monitores y el volumen, con proyecciones claras, transmisiones que cuidan a las personas, respeto a los derechos de autor, seguridad y cuidado del equipo. Lo técnico se explica con lo básico y general: cada sistema tiene su manual. Su base es la imagen de Pablo: «Y si la trompeta diere sonido incierto, ¿quién se preparará para la batalla?» (1 Corintios 14:8).",
    objetivos: [
      { id: "o1", texto: "Explicar por qué el servicio técnico es un ministerio, con el ejemplo de Bezaleel.", bloom: "comprender" },
      { id: "o2", texto: "Explicar que la claridad es el primer propósito del sonido y cómo viaja el sonido en una sala.", bloom: "comprender" },
      { id: "o3", texto: "Distinguir los tipos de micrófonos y las funciones básicas de la consola.", bloom: "analizar" },
      { id: "o4", texto: "Aplicar lo básico para evitar el acople, usar los monitores y decidir el volumen pensando en todos.", bloom: "aplicar" },
      { id: "o5", texto: "Aplicar criterios de claridad, privacidad y derechos de autor a la proyección y la transmisión.", bloom: "aplicar" },
      { id: "o6", texto: "Evaluar las normas de seguridad, el cuidado del equipo y el trabajo con los músicos.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar 1 Corintios 14:8 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "Lo básico del sonido, los micrófonos, la consola, los monitores, la proyección y la transmisión.",
      ser: "Un servidor fiel en lo poco, que sirve de corazón aunque nadie lo vea.",
      hacer: "Preparar y operar el sonido y la proyección con claridad, seguridad y respeto a los autores, y formar a otros técnicos.",
    },
    bibliografia: {
      basica: [
        { autor: "Yamaha Corporation", titulo: "Guía Yamaha para la elección de un sistema de sonido", editorial: "Yamaha", nota: "Guía gratuita en español para iglesias y salas." },
        { autor: "Bob Kauflin", titulo: "Nuestra adoración importa: guiando a otros a encontrarse con Dios", editorial: "B&H Español", nota: "Para el sentido del servicio técnico en el culto." },
      ],
      complementaria: [{ autor: "Marcos Witt", titulo: "¿Qué hacemos con estos músicos?", editorial: "Editorial Caribe" }],
    },
    recursos: [
      { tipo: "lectura", titulo: "Éxodo 31: Bezaleel, lleno del Espíritu de Dios", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Exodo&cap=31" },
      { tipo: "lectura", titulo: "Nehemías 8: leían claramente", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Nehemias&cap=8" },
    ],
  },
  disponible: true,
};

const TEOLOGIA_ORACION: MateriaDef = {
  id: "intercesion-1",
  nivel: null,
  especialidad: "intercesion",
  orden: 1,
  titulo: "Teología de la oración",
  resumen: "El Dios que oye, orar al Padre por el Hijo en el Espíritu, la oración y la voluntad de Dios, por qué orar si Dios ya sabe, cuando Dios dice no o espera, y lo que estorba la oración.",
  base: "Jeremías 33:3; Efesios 2:18",
  memoria: "Jeremías 33:3",
  lecciones: lecciones("intercesion-1", [
    ["El Dios que oye la oración", "Salmos 65:2; Jeremías 33:3; Salmos 145:18; Hebreos 4:16"],
    ["Al Padre, por el Hijo, en el Espíritu", "Efesios 2:18; Juan 16:23-24; Romanos 8:26-27"],
    ["La oración y la voluntad de Dios", "Mateo 6:9-10; Mateo 26:39; 1 Juan 5:14-15"],
    ["¿Para qué orar si Dios ya sabe?", "Mateo 6:7-8; Santiago 4:2-3; Lucas 11:9-10"],
    ["Cuando Dios dice no o espera", "2 Corintios 12:8-9; Habacuc 2:3; Lucas 18:1"],
    ["Lo que estorba la oración", "Isaías 59:1-2; Salmos 66:18; Marcos 11:24-25; Santiago 1:6-7; 1 Pedro 3:7"],
  ], 10),
  silabo: {
    proposito:
      "Que el creyente que quiere servir en la intercesión tenga una base firme sobre la oración: a quién ora y cómo se acerca, qué significa orar en el nombre de Jesús y con la ayuda del Espíritu, el lugar de la voluntad de Dios, por qué orar si Dios ya sabe, cómo entender las respuestas que tardan o no llegan, y qué estorba la oración. Lo que el ministerio enseña sobre la oración en lenguas y sobre la sanidad divina, como la sanidad en la expiación, son puntos de la declaración de fe por confirmar. Su base es la invitación de Dios: «Clama a mí, y yo te responderé, y te enseñaré cosas grandes y ocultas que tú no conoces» (Jeremías 33:3).",
    objetivos: [
      { id: "o1", texto: "Explicar que la oración es una relación con un Dios personal que oye.", bloom: "comprender" },
      { id: "o2", texto: "Explicar la oración al Padre, por medio del Hijo, con la ayuda del Espíritu.", bloom: "comprender" },
      { id: "o3", texto: "Aplicar la búsqueda de la voluntad de Dios a la propia oración.", bloom: "aplicar" },
      { id: "o4", texto: "Analizar por qué oramos si Dios ya sabe, y qué es pedir bien.", bloom: "analizar" },
      { id: "o5", texto: "Evaluar las respuestas de Dios cuando dice no o espera, y perseverar.", bloom: "evaluar" },
      { id: "o6", texto: "Reconocer lo que estorba la oración y cómo orar con un corazón limpio.", bloom: "comprender" },
      { id: "o7", texto: "Recitar Jeremías 33:3 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "Lo que la Biblia enseña sobre la oración: a quién se ora, la voluntad de Dios, las respuestas y los estorbos.",
      ser: "Un creyente que ora con confianza, con sinceridad y rendido a la voluntad de Dios.",
      hacer: "Orar con perseverancia, pedir bien y cuidar el corazón para que la oración no tenga estorbo.",
    },
    bibliografia: {
      basica: [
        { autor: "Richard J. Foster", titulo: "La oración", editorial: "Wipf & Stock" },
        { autor: "E. M. Bounds", titulo: "Las obras esenciales de E. M. Bounds sobre la oración", editorial: "Origen" },
      ],
      complementaria: [{ autor: "Richard J. Foster", titulo: "Celebración de la disciplina", editorial: "Peniel", nota: "Capítulo de la oración." }],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Mateo (parte 1)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=3jUPGTb80ms", minutos: 8 },
      { tipo: "video", titulo: "Resumen del libro de Santiago", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=yDqK_U-ipfc", minutos: 9 },
      { tipo: "lectura", titulo: "Mateo 6: el Padre nuestro", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Mateo&cap=6" },
      { tipo: "lectura", titulo: "Lucas 11: enséñanos a orar", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Lucas&cap=11" },
    ],
  },
  disponible: true,
};

const INTERCESION_BIBLICA: MateriaDef = {
  id: "intercesion-2",
  nivel: null,
  especialidad: "intercesion",
  orden: 2,
  titulo: "Intercesión bíblica",
  resumen: "Ponerse en la brecha, Abraham por Sodoma, Moisés por el pueblo, Samuel, Daniel y Nehemías, Cristo nuestro intercesor, y por quiénes y cómo interceder hoy.",
  base: "1 Timoteo 2:1; Ezequiel 22:30",
  memoria: "1 Timoteo 2:1",
  lecciones: lecciones("intercesion-2", [
    ["Ponerse en la brecha", "Ezequiel 22:30; 1 Timoteo 2:1-5; Santiago 5:16"],
    ["Abraham ruega por Sodoma", "Génesis 18:23-33; Génesis 19:29"],
    ["Moisés se interpone por el pueblo", "Éxodo 32:9-14; Números 23:19; Éxodo 32:30-32; Salmos 106:23; Números 14:19-20"],
    ["Samuel, Daniel y Nehemías: orar por el pueblo", "1 Samuel 12:23; Daniel 9:2-5; Daniel 9:18-19; Nehemías 1:4-6; Nehemías 2:4-5"],
    ["Cristo, nuestro intercesor", "Isaías 53:12; Lucas 23:34; Lucas 22:31-32; Juan 17:20-21; Hebreos 7:25; Romanos 8:34; 1 Juan 2:1"],
    ["Interceder hoy: por quiénes y cómo", "Mateo 5:44; Mateo 9:37-38; Romanos 10:1; Efesios 6:18-19; Hechos 12:5; Colosenses 4:12; Proverbios 11:13"],
  ], 10),
  silabo: {
    proposito:
      "Que el creyente que quiere servir en la intercesión aprenda de los intercesores de la Biblia: qué es ponerse en la brecha, cómo rogaron Abraham por Sodoma y Moisés por el pueblo, cómo Samuel, Daniel y Nehemías oraron por los suyos, y cómo Cristo, el único mediador, intercedió y sigue intercediendo por los suyos; y que sepa interceder hoy, por quiénes y cómo. Lo que el ministerio enseña sobre la oración en lenguas y sobre la sanidad divina son puntos de la declaración de fe por confirmar. Su base es la exhortación de Pablo: «Exhorto ante todo, a que se hagan rogativas, oraciones, peticiones y acciones de gracias, por todos los hombres» (1 Timoteo 2:1).",
    objetivos: [
      { id: "o1", texto: "Explicar qué es interceder y por qué el intercesor no es mediador.", bloom: "comprender" },
      { id: "o2", texto: "Analizar la intercesión de Abraham por Sodoma.", bloom: "analizar" },
      { id: "o3", texto: "Analizar la intercesión de Moisés por el pueblo y sus argumentos.", bloom: "analizar" },
      { id: "o4", texto: "Describir cómo Samuel, Daniel y Nehemías oraron por su pueblo.", bloom: "comprender" },
      { id: "o5", texto: "Explicar la intercesión de Cristo en la tierra y en el cielo.", bloom: "comprender" },
      { id: "o6", texto: "Aplicar la intercesión hoy: por quiénes orar y cómo hacerlo con fidelidad.", bloom: "aplicar" },
      { id: "o7", texto: "Recitar 1 Timoteo 2:1 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "Lo que la Biblia enseña sobre la intercesión: los intercesores del Antiguo Testamento y la intercesión de Cristo.",
      ser: "Un creyente que ama a los demás lo bastante para ponerse en la brecha por ellos.",
      hacer: "Interceder con perseverancia y fidelidad por las autoridades, la iglesia, los que sufren y los que no conocen a Cristo.",
    },
    bibliografia: {
      basica: [
        { autor: "Dutch Sheets", titulo: "La oración intercesora", editorial: "Unilit" },
        { autor: "Timothy Keller", titulo: "La oración: experimentando asombro e intimidad con Dios", editorial: "B&H Español" },
      ],
      complementaria: [{ autor: "Richard J. Foster", titulo: "La oración", editorial: "Wipf & Stock", nota: "Su capítulo sobre la oración intercesora." }],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Éxodo (parte 2)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=U2lUpubEMDI", minutos: 7 },
      { tipo: "video", titulo: "Resumen del libro de Hebreos", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=VqVAOqyoKCs", minutos: 10 },
      { tipo: "lectura", titulo: "Éxodo 32: Moisés intercede por el pueblo", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Exodo&cap=32" },
      { tipo: "lectura", titulo: "Daniel 9: la oración de Daniel", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Daniel&cap=9" },
    ],
  },
  disponible: true,
};

const AYUNO_BIBLICO: MateriaDef = {
  id: "intercesion-3",
  nivel: null,
  especialidad: "intercesion",
  orden: 3,
  titulo: "El ayuno bíblico",
  resumen: "Qué es el ayuno bíblico, los ayunos del Antiguo Testamento, el ayuno de Jesús y de la iglesia, el ayuno que Dios escogió, cómo ayunar con sabiduría cuidando la salud, y los peligros y los frutos del ayuno.",
  base: "Isaías 58:6; Mateo 6:16-18",
  memoria: "Isaías 58:6",
  lecciones: lecciones("intercesion-3", [
    ["¿Qué es el ayuno bíblico?", "Mateo 6:16-18; Mateo 9:14-15; Joel 2:12-13"],
    ["El ayuno en el Antiguo Testamento", "Éxodo 34:28; 2 Samuel 12:16; Esdras 8:21-23; Ester 4:16; Jonás 3:5-10; Daniel 10:2-3"],
    ["Jesús y la iglesia ayunan", "Mateo 4:1-4; Deuteronomio 8:3; Lucas 2:37; Hechos 13:2-3; Hechos 14:23; 2 Corintios 11:27"],
    ["El ayuno que Dios escogió", "Isaías 58:3-7; Isaías 58:8-9; Zacarías 7:5; Lucas 18:11-12"],
    ["Cómo ayunar con sabiduría", "Joel 2:15; Mateo 6:17-18; 1 Corintios 6:19-20"],
    ["Los peligros y los frutos del ayuno", "Mateo 6:16; Colosenses 2:23; Salmos 35:13; 1 Reyes 21:27-29"],
  ], 10),
  silabo: {
    proposito:
      "Que el creyente que quiere servir en la intercesión conozca y practique el ayuno bíblico con sabiduría: qué es, cómo ayunaron los hombres y las mujeres de Dios en el Antiguo Testamento, cómo ayunaron Jesús y la iglesia, cuál es el ayuno que Dios escogió, cómo ayunar cuidando la salud y qué peligros evitar. El ayuno no es una dieta ni una forma de presionar a Dios: es humillarse delante de él para buscarlo. Los consejos de salud son generales: quien tenga una enfermedad, tome medicinas, esté embarazada o amamantando, o sea menor de edad, consulta a su médico antes de ayunar. Su base es la palabra de Dios por Isaías: «¿No es más bien el ayuno que yo escogí, desatar las ligaduras de impiedad, soltar las cargas de opresión, y dejar ir libres a los quebrantados, y que rompáis todo yugo?» (Isaías 58:6).",
    objetivos: [
      { id: "o1", texto: "Explicar qué es el ayuno bíblico y cómo enseñó Jesús a practicarlo.", bloom: "comprender" },
      { id: "o2", texto: "Describir los ayunos del Antiguo Testamento y sus motivos.", bloom: "comprender" },
      { id: "o3", texto: "Explicar el ayuno de Jesús y de la iglesia primitiva.", bloom: "comprender" },
      { id: "o4", texto: "Evaluar el ayuno que Dios escogió frente al ayuno vacío.", bloom: "evaluar" },
      { id: "o5", texto: "Aplicar formas prudentes de ayunar, cuidando la salud.", bloom: "aplicar" },
      { id: "o6", texto: "Analizar los peligros y los frutos del ayuno.", bloom: "analizar" },
      { id: "o7", texto: "Recitar Isaías 58:6 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "Lo que la Biblia enseña sobre el ayuno: sus motivos, sus ejemplos y el ayuno que Dios escogió.",
      ser: "Un creyente humilde que busca a Dios y no la aprobación de los hombres.",
      hacer: "Ayunar con propósito, en secreto y con prudencia, cuidando la salud y uniendo el ayuno a la oración y a la misericordia.",
    },
    bibliografia: {
      basica: [
        { autor: "John Piper", titulo: "Hambre de Dios", editorial: "Andamio" },
        { autor: "Donald S. Whitney", titulo: "Disciplinas espirituales para la vida cristiana", editorial: "NavPress / Tyndale", nota: "Su capítulo sobre el ayuno." },
      ],
      complementaria: [{ autor: "Richard J. Foster", titulo: "Celebración de la disciplina", editorial: "Peniel", nota: "Capítulo del ayuno." }],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Mateo (parte 1), con el Sermón del monte", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=3jUPGTb80ms", minutos: 8 },
      { tipo: "video", titulo: "Resumen del libro de Hechos (parte 2)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=ZKaaHQUdVCY", minutos: 9 },
      { tipo: "lectura", titulo: "Isaías 58: el ayuno que Dios escogió", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Isaias&cap=58" },
      { tipo: "lectura", titulo: "Jonás 3: Nínive ayuna y se vuelve a Dios", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Jonas&cap=3" },
    ],
  },
  disponible: true,
};

const GUERRA_ESPIRITUAL: MateriaDef = {
  id: "intercesion-4",
  nivel: null,
  especialidad: "intercesion",
  avanzada: true,
  orden: 4,
  titulo: "Guerra espiritual bíblica y equilibrada",
  resumen: "Una batalla real sin miedo ni descuido, la victoria de Cristo, la armadura de Dios, someterse a Dios y resistir al diablo, Jesús y los apóstoles ante los espíritus malos, y los errores que hay que evitar.",
  base: "Efesios 6:10-18; Santiago 4:7",
  memoria: "Santiago 4:7",
  lecciones: lecciones("intercesion-4", [
    ["Una batalla real, sin miedo ni descuido", "Efesios 6:10-12; 1 Pedro 5:8-9; Juan 10:10; 2 Corintios 2:10-11"],
    ["La victoria de Cristo", "Colosenses 1:16; Colosenses 2:15; Hebreos 2:14-15; 1 Juan 3:8; Colosenses 1:13; 1 Juan 4:4"],
    ["La armadura de Dios", "Efesios 6:13-18"],
    ["Someteos a Dios y resistid al diablo", "Santiago 4:7; Mateo 4:10-11; Efesios 4:26-27; 2 Corintios 10:3-5; Santiago 1:14"],
    ["Jesús, los apóstoles y los espíritus malos", "Marcos 1:23-27; Lucas 10:17-20; Hechos 16:16-18; Hechos 19:13-20; Deuteronomio 18:10-12"],
    ["Los errores que hay que evitar", "2 Timoteo 1:7; Judas 1:9; 1 Juan 4:1; Daniel 10:12-13; Romanos 16:20"],
  ], 10),
  silabo: {
    proposito:
      "Que el creyente ya formado que sirve en la intercesión entienda la guerra espiritual como la enseña la Biblia, con equilibrio: una batalla real contra las fuerzas espirituales y no contra las personas, que se pelea desde la victoria de Cristo en la cruz, con la armadura de Dios y la oración, sometiéndose a Dios y resistiendo al diablo, aprendiendo de cómo actuaron Jesús y los apóstoles, y evitando los errores del miedo, la arrogancia y los métodos que la Biblia no enseña. Es una materia avanzada: pide el Nivel 3. No enseña técnicas de liberación: quien sirva en esa área lo hace bajo la dirección de sus pastores, y no todo problema es espiritual, porque hay enfermedades que trata el médico. Su base es la exhortación de Santiago: «Someteos, pues, a Dios; resistid al diablo, y huirá de vosotros» (Santiago 4:7).",
    objetivos: [
      { id: "o1", texto: "Explicar que la batalla espiritual es real y que el enemigo no son las personas.", bloom: "comprender" },
      { id: "o2", texto: "Explicar la victoria de Cristo sobre los principados y las potestades.", bloom: "comprender" },
      { id: "o3", texto: "Describir la armadura de Dios como una vida en Cristo y no como una fórmula.", bloom: "comprender" },
      { id: "o4", texto: "Aplicar Santiago 4:7: someterse a Dios y resistir al diablo.", bloom: "aplicar" },
      { id: "o5", texto: "Analizar cómo actuaron Jesús y los apóstoles ante los espíritus malos.", bloom: "analizar" },
      { id: "o6", texto: "Evaluar las prácticas de guerra espiritual a la luz de la Biblia y evitar sus errores.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar Santiago 4:7 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "Lo que la Biblia enseña sobre la batalla espiritual, la victoria de Cristo y la armadura de Dios.",
      ser: "Un intercesor firme, humilde y sin miedo, sometido a Dios.",
      hacer: "Resistir al enemigo con la Palabra y la oración, con discernimiento y bajo la dirección de los pastores.",
    },
    bibliografia: {
      basica: [
        { autor: "John Stott", titulo: "El mensaje de Efesios", editorial: "Certeza Unida" },
        { autor: "Neil T. Anderson", titulo: "Rompiendo las cadenas", editorial: "Unilit" },
      ],
      complementaria: [{ autor: "C. S. Lewis", titulo: "Cartas del diablo a su sobrino", editorial: "Rialp", nota: "Su prólogo advierte contra los dos errores opuestos sobre los demonios." }],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Efesios", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=yJgym5MGzM4", minutos: 10 },
      { tipo: "video", titulo: "Resumen del libro de Hechos (parte 2)", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=ZKaaHQUdVCY", minutos: 9 },
      { tipo: "lectura", titulo: "Efesios 6: la armadura de Dios", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Efesios&cap=6" },
      { tipo: "lectura", titulo: "Hechos 19: el evangelio en Éfeso", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Hechos&cap=19" },
    ],
  },
  disponible: true,
};

const ORACION_AVIVAMIENTOS: MateriaDef = {
  id: "intercesion-5",
  nivel: null,
  especialidad: "intercesion",
  orden: 5,
  titulo: "La oración en los avivamientos",
  resumen: "Qué es un avivamiento, los avivamientos de la Biblia, los moravos de Herrnhut, los despertares con Edwards, Carey, el pajar y la calle Fulton, Gales, Azusa, Corea y Chile, y cómo orar hoy por avivamiento.",
  base: "2 Crónicas 7:14; Habacuc 3:2",
  memoria: "2 Crónicas 7:14",
  lecciones: lecciones("intercesion-5", [
    ["¿Qué es un avivamiento?", "Habacuc 3:2; Salmos 85:6; Isaías 57:15; Juan 16:8"],
    ["Avivamientos en la Biblia", "2 Crónicas 7:13-14; 2 Crónicas 30:27; Nehemías 8:5-6; Nehemías 9:1-3; Hechos 1:14; Hechos 2:1-4; Hechos 2:41-42"],
    ["Los moravos: una oración que no se apagó", "Isaías 62:6-7; Mateo 9:37-38; Mateo 18:19-20"],
    ["Los despertares: oración unida y misiones", "Zacarías 8:20-22; Salmos 51:10-13"],
    ["Gales, Azusa, Corea y Chile", "Santiago 5:16-18; Hechos 2:16-18; Hechos 19:18"],
    ["Orar por avivamiento hoy", "Isaías 64:1; Hechos 4:29-31; Mateo 7:16-20; Gálatas 5:22-23; 1 Tesalonicenses 5:19-21; 1 Corintios 14:40"],
  ], 10),
  silabo: {
    proposito:
      "Que el creyente que quiere servir en la intercesión conozca el lugar de la oración en los avivamientos: qué es un avivamiento según la Biblia, cómo Dios renovó a su pueblo en la Escritura, y cómo la oración perseverante y unida precedió a los avivamientos de la historia, desde los moravos de Herrnhut y los despertares de los siglos XVIII y XIX hasta Gales, la calle Azusa, Corea y Chile; y que sepa orar hoy por avivamiento y reconocer uno verdadero por sus frutos. Las cifras que varían según las fuentes se dicen con cautela. Lo que el ministerio enseña sobre las lenguas como señal del bautismo en el Espíritu y su doctrina del avivamiento son puntos de la declaración de fe por confirmar. Su base es la promesa de Dios: «Si se humillare mi pueblo, sobre el cual mi nombre es invocado, y oraren, y buscaren mi rostro, y se convirtieren de sus malos caminos; entonces yo oiré desde los cielos, y perdonaré sus pecados, y sanaré su tierra» (2 Crónicas 7:14).",
    objetivos: [
      { id: "o1", texto: "Explicar qué es un avivamiento según la Biblia y cuáles son sus señales.", bloom: "comprender" },
      { id: "o2", texto: "Describir los avivamientos de la Biblia y el lugar de la Palabra, la confesión y la oración.", bloom: "comprender" },
      { id: "o3", texto: "Narrar la vigilia de oración de los moravos y su relación con las misiones.", bloom: "comprender" },
      { id: "o4", texto: "Analizar cómo la oración unida precedió a los despertares y a las misiones.", bloom: "analizar" },
      { id: "o5", texto: "Describir los avivamientos de Gales, Azusa, Corea y Chile y el lugar de la oración y la confesión.", bloom: "comprender" },
      { id: "o6", texto: "Evaluar un avivamiento por sus frutos y planear la oración por avivamiento hoy.", bloom: "evaluar" },
      { id: "o7", texto: "Recitar 2 Crónicas 7:14 de memoria.", bloom: "recordar" },
    ],
    dimensiones: {
      conocer: "Lo que la Biblia y la historia de la iglesia enseñan sobre la oración y los avivamientos.",
      ser: "Un intercesor humilde que anhela la presencia de Dios y empieza por su propio corazón.",
      hacer: "Orar con otros, con constancia, por la renovación de la iglesia y por la misión, examinándolo todo por sus frutos.",
    },
    bibliografia: {
      basica: [
        { autor: "Arthur Wallis", titulo: "En el día de su poder", editorial: "Unilit" },
        { autor: "Justo L. González", titulo: "Historia del cristianismo", editorial: "Unilit", nota: "Los moravos, los despertares y los avivamientos." },
      ],
      complementaria: [{ autor: "Pablo A. Deiros", titulo: "Historia del cristianismo en América Latina", editorial: "Mundo Hispano", nota: "Para el protestantismo y el pentecostalismo en América Latina." }],
    },
    recursos: [
      { tipo: "video", titulo: "Resumen del libro de Crónicas", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=lMj--4fDpvc", minutos: 8 },
      { tipo: "video", titulo: "Qué sucedió en Pentecostés y por qué es importante", fuente: "Proyecto Biblia", url: "https://www.youtube.com/watch?v=OisTpQEle6E", minutos: 7 },
      { tipo: "lectura", titulo: "2 Crónicas 7: la promesa a Salomón", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=2%20Cronicas&cap=7" },
      { tipo: "lectura", titulo: "Hechos 4: la oración de la iglesia", fuente: "Biblioteca de la web (RV1960)", url: "/biblioteca?libro=Hechos&cap=4" },
    ],
  },
  disponible: true,
};

/** Una materia de especialidad: su definición completa, o solo el título (y si es avanzada) mientras se prepara. */
type MateriaDeEspecialidad = MateriaDef | [titulo: string, avanzada?: boolean];

const especialidad = (id: EspecialidadId, nombre: string, resumen: string, materias: MateriaDeEspecialidad[]): EspecialidadDef => ({
  id,
  nombre,
  resumen,
  materias: materias.map((m, i) =>
    Array.isArray(m)
      ? { id: `${id}-${i + 1}`, nivel: null, especialidad: id, avanzada: m[1] || undefined, orden: i + 1, titulo: m[0], resumen: "", lecciones: [], disponible: false }
      : m,
  ),
});

/** Las especialidades: se abren al terminar el Nivel 2 (las materias «avanzadas» piden el Nivel 3) y no tienen límite. */
export const ESPECIALIDADES: EspecialidadDef[] = [
  especialidad("evangelismo-misiones", "Evangelismo y misiones", "Ganar almas, campañas, misión transcultural y plantar iglesias.", [
    EV_PERSONAL_AVANZADO, CAMPANAS, TEOLOGIA_MISIONES, MISION_TRANSCULTURAL, PLANTACION,
  ]),
  especialidad("pastoral", "Ministerio pastoral", "Pastorear, aconsejar, celebrar las ordenanzas y cuidar del rebaño.", [
    MINISTERIO_PASTORAL, CONSEJERIA_PASTORAL, ORDENANZAS_CEREMONIAS, VISITACION_CUIDADO, PREDICACION_PASTORAL,
  ]),
  especialidad("alabanza", "Alabanza y adoración", "Adorar en espíritu y en verdad y dirigir el ministerio de alabanza.", [
    TEOLOGIA_ADORACION, ADORADOR, DIRIGIR_ALABANZA, HISTORIA_MUSICA, SONIDO_TECNICA,
  ]),
  especialidad("ninez", "Niñez", "Enseñar y cuidar a los niños con la Palabra.", [
    EDUCACION_NINEZ, NINO_Y_SU_FE, METODOS_NINEZ, PROTECCION_MENORES, ORGANIZAR_NINEZ,
  ]),
  especialidad("juventud", "Juventud", "Discipular y liderar a la nueva generación.", [
    DISCIPULADO_JOVENES, COSMOVISION_CULTURA, CONSEJERIA_JUVENIL, LIDERAZGO_JUVENIL, EVANGELISMO_JOVENES,
  ]),
  especialidad("familia-consejeria", "Familia y consejería", "Acompañar matrimonios y familias con sabiduría bíblica y límites claros.", [
    CONSEJERIA_MATRIMONIAL, CONSEJERIA_FAMILIAR, DUELO_CRISIS, ADICCIONES_RESTAURACION, ETICA_LIMITES_CONSEJERO,
  ]),
  especialidad("intercesion", "Intercesión y oración", "Una vida de oración, ayuno e intercesión con base bíblica.", [
    TEOLOGIA_ORACION, INTERCESION_BIBLICA, AYUNO_BIBLICO, GUERRA_ESPIRITUAL, ORACION_AVIVAMIENTOS,
  ]),
  especialidad("comunicaciones", "Comunicaciones y medios", "Llevar el evangelio por la radio, las redes y las transmisiones.", [
    EVANGELISMO_REDES, RADIO_CRISTIANA, VIDEO_TRANSMISIONES, REDACCION_COMUNICACION, ETICA_SEGURIDAD_DIGITAL,
  ]),
  especialidad("capellania", "Capellanía", "Servir en hospitales, cárceles y emergencias.", [
    FUNDAMENTOS_CAPELLANIA, CAPELLANIA_HOSPITALARIA, CAPELLANIA_PENITENCIARIA, EMERGENCIAS_DESASTRES, MARCO_LEGAL_CAPELLAN,
  ]),
  especialidad("biblicos-avanzados", "Estudios bíblicos avanzados", "Libros a fondo, geografía, historia y trasfondo de la Biblia.", [
    ROMANOS_TEOLOGIA_HISTORIA, HECHOS_A_FONDO, DANIEL_APOCALIPSIS, GEOGRAFIA_HISTORIA_BIBLICA, TRASFONDO_ARQUEOLOGIA,
  ]),
  especialidad("liderazgo-administracion", "Liderazgo y administración", "Administrar la obra con orden, transparencia y visión.", [
    ADMINISTRACION_ECLESIASTICA, FINANZAS_TRANSPARENCIA, EQUIPOS_VOLUNTARIOS, PLANIFICACION_PROYECTOS, MARCO_LEGAL_ORGANIZACIONES,
  ]),
  especialidad("obra-social", "Obra social y misericordia", "Servir al necesitado como lo hizo Jesús.", [
    TEOLOGIA_COMPASION, DIACONIA_SERVICIO, PROYECTOS_COMUNITARIOS, AYUDA_HUMANITARIA, VOLUNTARIADO_ALIANZAS,
  ]),
];

// ---------------------------------------------------------------- búsquedas

const TODAS: MateriaDef[] = [...NIVELES.flatMap((n) => n.materias), ...ESPECIALIDADES.flatMap((e) => e.materias)];
const POR_ID = new Map(TODAS.map((m) => [m.id, m]));
// lo que agregó la revisión del sistema de estudio: más bibliografía y la lectura ampliada (shared/academia-complementos.ts)
aplicarComplementos(POR_ID);
const LECCION_POR_ID = new Map(TODAS.flatMap((m) => m.lecciones.map((l, i) => [l.id, { materia: m, leccion: l, indice: i }] as const)));

export function todasLasMaterias(): MateriaDef[] {
  return TODAS;
}
export function materiaPorId(id: string): MateriaDef | undefined {
  return POR_ID.get(id);
}
export function leccionPorId(id: string): { materia: MateriaDef; leccion: LeccionDef; indice: number } | undefined {
  return LECCION_POR_ID.get(id);
}
export function nivelDe(n: NivelN): NivelDef {
  return NIVELES[n - 1];
}
/**
 * Lo que falta para inscribirse en una materia: el nivel anterior completo. Las materias de una especialidad piden el
 * Nivel 2, y las avanzadas, el 3 (docs/academia.md, «La inscripción»).
 */
export function requisitosMateria(m: MateriaDef, nivelesCompletos: number[]): string[] {
  const pide = m.nivel ? m.nivel - 1 : m.avanzada ? 3 : 2;
  const hecho = nivelesCompletos.length ? Math.max(...nivelesCompletos) : 0;
  if (pide < 1 || hecho >= pide) return [];
  return [`completar el Nivel ${pide} · ${NIVELES[pide - 1]?.nombre ?? ""}`.trim()];
}

/** La primera lección de cada materia del Nivel 1 la puede leer un visitante. */
export function leccionPublica(id: string): boolean {
  const l = LECCION_POR_ID.get(id);
  return !!l && l.materia.nivel === 1 && l.indice === 0;
}

// ---------------------------------------------------------------- lo que responde la API (sin respuestas)

export type EstadoMateria = "en-preparacion" | "disponible" | "en-curso" | "aprobada";

export type MateriaResumen = {
  id: string;
  titulo: string;
  resumen: string;
  nivel: NivelN | null;
  especialidad?: EspecialidadId;
  avanzada?: boolean;
  antes?: string;
  lecciones: number;
  hechas: number;
  /** Los minutos reales de toda la materia (server/academia-carga.ts). */
  minutos?: number;
  estado: EstadoMateria;
  nota: number | null;
  medalla: Medalla | null;
};

export type AcademiaEstado = {
  abierta: boolean;
  vistaPrevia: boolean;
  conSesion: boolean;
  alumno: { inscritoEn: string; racha: number; leccionesHechas: number; materiasAprobadas: number } | null;
  /** La matrícula (null si todavía no se inscribió: sin inscripción se lee, pero no se guarda el avance). */
  matricula: MatriculaInfo | null;
  /** Llenó su ficha de inscripción (quien se matriculó antes de la ficha debe completarla). */
  ficha: boolean;
  /**
   * Lo siguiente: una lección, el examen final si ya terminó las lecciones (leccionId null) o, con todas las materias
   * del nivel aprobadas, el cierre del nivel (`nivel`: el examen integral o el pacto). Sin ninguna materia en curso, la
   * presentación de la siguiente, para inscribirse en ella (`inscribirse`).
   */
  continuar: { leccionId: string | null; titulo: string; materiaId: string; materia: string; n: number; de: number; nivel?: number; inscribirse?: boolean } | null;
  etapas: EtapaDef[];
  niveles: (Omit<NivelDef, "materias"> & { materias: MateriaResumen[]; cierre: CierreResumen | null })[];
  especialidades: (Omit<EspecialidadDef, "materias"> & { materias: MateriaResumen[] })[];
  /** Las materias que esperaba («Avísame cuando abra») y que ya abrieron: el aviso queda también en la campana. */
  recienAbiertas?: { id: string; titulo: string }[];
};

/** El cierre de un nivel en la portada: null mientras el nivel no tiene todas sus materias disponibles. */
export type CierreResumen = { integralAprobado: boolean; pacto: boolean; completado: string | null };

export type RequisitoNivel = {
  id: "materias" | "integral" | "versiculos" | "evangelismo" | "servicio" | "pacto" | RequisitoPorHacer["id"];
  texto: string;
  hecho: boolean;
  detalle: string;
};

/**
 * Los requisitos del reglamento que todavía no se registran en la academia. Mientras falte alguno, el nivel lo muestra
 * pendiente y no se cierra: así nadie recibe un diploma sin él. Hoy no queda ninguno: los de los Niveles 2 a 5 se
 * registran como actividades del nivel (shared/academia-actividades.ts). Sus textos serían los de `NIVELES`.
 */
export type RequisitoPorHacer = { id: "practica" | "ensenanza" | "consolidacion" | "sermon" | "proyecto" | "acompanar"; texto: string };
export const REQUISITOS_POR_HACER: Partial<Record<NivelN, RequisitoPorHacer[]>> = {};

/** El nivel y lo que falta para cerrarlo: materias, examen integral, versículos y pacto. */
export type NivelEstado = {
  nivel: Omit<NivelDef, "materias">;
  materias: { total: number; disponibles: number; aprobadas: number; promedio: number | null };
  versiculos: { pide: number; aprendidos: number };
  /** null mientras el nivel no tiene todas sus materias disponibles. */
  integral: ExamenEstado | null;
  pacto: (PactoDef & { aceptado: string | null }) | null;
  requisitos: RequisitoNivel[];
  completado: string | null;
  promedio: number | null;
  honores: boolean;
  /** El código del certificado del nivel, cuando está completo. */
  certificado: string | null;
  vistaPrevia: boolean;
  conSesion: boolean;
};

// ---------------------------------------------------------------- los documentos

export type TipoDocumento = "materia" | "nivel" | "especialidad";

/** Un documento de la academia (certificado de materia, de nivel o de especialidad), como lo ven su dueño y la Dirección académica. */
export type DocumentoAcademia = {
  codigo: string;
  tipo: TipoDocumento;
  /** El id de la materia o de la especialidad, o el número del nivel. */
  ref: string;
  /** El título de la materia, o lo que recibe el nivel o la especialidad («Certificado en Fundamentos de la Fe»). */
  titulo: string;
  nivel: { n: number; nombre: string } | null;
  /** La especialidad del certificado de especialidad o de la materia de una especialidad. */
  especialidad: { id: EspecialidadId; nombre: string } | null;
  /** El nombre del alumno al emitirse. */
  nombre: string;
  /** La nota de la materia, el promedio del nivel o la nota de la especialidad. */
  nota: number | null;
  honores: boolean;
  via: string;
  emitido: string;
  revocado: string | null;
  motivo: string | null;
  /** La dirección pública de la verificación (la del QR). */
  verificar: string;
  /** El QR de la verificación como imagen PNG (data URL), solo en la vista del documento. */
  qr: string | null;
};

/** Lo que muestra la verificación pública: sin notas (las notas las ven el alumno y sus profesores). */
export type VerificacionAcademia = {
  valido: boolean;
  codigo: string;
  /** Un certificado (de materia, de nivel o de especialidad) o el carné de estudiante. */
  tipo: TipoDocumento | "carne";
  documento: string;
  nivel: string | null;
  /** En el certificado de una materia de especialidad: el nombre de la especialidad. */
  especialidad?: string | null;
  nombre: string;
  emitido: string;
  honores: boolean;
  revocado: string | null;
  /** En el carné: el número de matrícula y el estatus del alumno hoy. */
  matricula?: string | null;
  estatus?: string | null;
  academia: string;
  aclaracion: string;
};

/** El código de un documento: AAF-XXXX-XXXX, en base 32 de Crockford (sin I, L, O ni U para no confundirse). */
export const PATRON_CODIGO = /^AAF-[0-9A-HJKMNP-TV-Z]{4}-[0-9A-HJKMNP-TV-Z]{4}$/;
const CROCKFORD = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";

/** El código a partir de 5 bytes al azar (40 bits: imposible de adivinar). */
export function codigoDe(bytes: Uint8Array): string {
  let bits = 0;
  let valor = 0;
  let out = "";
  for (const b of bytes.slice(0, 5)) {
    valor = (valor << 8) | b;
    bits += 8;
    while (bits >= 5) {
      out += CROCKFORD[(valor >>> (bits - 5)) & 31];
      bits -= 5;
    }
    valor &= (1 << bits) - 1;
  }
  out = out.padEnd(8, "0");
  return `AAF-${out.slice(0, 4)}-${out.slice(4, 8)}`;
}

/** Lo que escribe la persona, llevado al código: mayúsculas, sin espacios, O por 0 e I o L por 1 (como Crockford). */
export function normalizarCodigo(s: string): string {
  const limpio = s.trim().toUpperCase().replace(/[\s_.]+/g, "");
  const m = /^AAF-?([0-9A-Z]{4})-?([0-9A-Z]{4})$/.exec(limpio);
  if (!m) return limpio;
  const fijo = (x: string) => x.replace(/O/g, "0").replace(/[IL]/g, "1");
  return `AAF-${fijo(m[1])}-${fijo(m[2])}`;
}

export type LeccionEstado = {
  id: string;
  titulo: string;
  minutos: number;
  base: string;
  vista: boolean;
  completada: boolean;
  /** Los minutos de su narración grabada con la voz de la academia (null o ausente: no tiene). */
  escuchar?: number | null;
};

export type ExamenEstado = {
  medida: MedidaExamen;
  /** La nota con que se aprueba: 70 el final de una materia, 75 el integral de un nivel. */
  aprueba: number;
  /** Lo que falta para poder darlo (vacío si ya se puede). */
  falta: string[];
  intentos: number;
  fallos: number;
  mejor: number | null;
  aprobado: boolean;
  enCurso: boolean;
  /** Segundos que faltan para poder intentarlo otra vez. */
  espera: number;
  /** Después de 3 fallos: volver a abrir estas lecciones antes del siguiente intento. */
  repasar: string[];
  /** Si ya no se puede dar, por qué (la suficiencia se da una sola vez; la diagnóstica, cada 30 días). */
  cerrado?: string | null;
};

export type MateriaDetalle = {
  materia: Omit<MateriaDef, "lecciones"> & { lecciones: LeccionEstado[] };
  pesos: Pesos;
  estado: EstadoMateria;
  nota: number | null;
  componentes: Componentes;
  medalla: Medalla | null;
  versiculo: { ref: string; aprendido: boolean; puntaje: number | null; intentos: number } | null;
  examen: ExamenEstado | null;
  /** El código del certificado de la materia, cuando está aprobada. */
  certificado: string | null;
  /** Con sesión e inscrito en la academia (ficha y matrícula). */
  matriculado: boolean;
  /** Desde cuándo está inscrito en esta materia (null si no lo está: se ve su presentación). */
  inscrita: string | null;
  /** Lo que falta para poder inscribirse (el nivel anterior). */
  requisitos: string[];
  /** La Administración: puede leer las lecciones sin inscribirse (no se guarda su avance). */
  docente: boolean;
  vistaPrevia: boolean;
  conSesion: boolean;
  /** Cómo se aprobó (null mientras no está aprobada). */
  via: "cursada" | "suficiencia" | "convalidada" | null;
  /** El examen de suficiencia, mientras se puede ofrecer: antes del examen final y sin haberlo dado (null si no). */
  suficiencia: { enCurso: boolean } | null;
  /** Las mini pruebas (Nivel 2 en adelante; vacío si la materia no las tiene o no hay sesión). */
  minis: MiniEstado[];
  /** El escrito breve (Nivel 2 en adelante; null si la materia no lo tiene o no hay sesión). */
  breve: BreveEstado | null;
  /** Pidió que le avisen cuando la materia abra (solo tiene sentido mientras está en preparación). */
  avisame?: boolean;
  /** Las partes de su nota que ajustó la Administración, con el motivo (el alumno los ve). */
  ajustes?: { componente: keyof Pesos; texto: string; nota: number; motivo: string; fecha: string }[];
};

/** El escrito breve de una materia, para el alumno. */
export type EscritoBreveVista = {
  materia: { id: string; titulo: string };
  pregunta: string;
  min: number;
  max: number;
  entregas: number;
  maxEntregas: number;
  mejor: number | null;
  falta: string[];
  cerrado: string | null;
  /** La última entrega corregida (con la respuesta modelo solo después de la última). */
  ultimo: ResultadoExamen | null;
};

/** El trabajo final de una especialidad para el alumno (como el escrito breve, pero de toda la especialidad). */
export type TrabajoEspecialidadVista = {
  pregunta: string;
  min: number;
  max: number;
  entregas: number;
  maxEntregas: number;
  mejor: number | null;
  falta: string[];
  cerrado: string | null;
  /** La última entrega corregida (con la respuesta modelo solo después de la última). */
  ultimo: ResultadoExamen | null;
};

/** La página de una especialidad: sus materias, el trabajo final y el certificado. */
export type EspecialidadDetalle = {
  id: EspecialidadId;
  nombre: string;
  resumen: string;
  materias: {
    id: string;
    titulo: string;
    resumen: string;
    avanzada: boolean;
    lecciones: number;
    hechas: number;
    estado: EstadoMateria;
    nota: number | null;
    /** Lo que falta para poder inscribirse (el Nivel 2, o el Nivel 3 en las avanzadas). */
    requisitos: string[];
  }[];
  /** Cuántas de sus materias aprobó el alumno. */
  aprobadas: number;
  /** El trabajo final, cuando la especialidad ya tiene sus cinco materias publicadas (sin sesión, solo la consigna). */
  trabajo: TrabajoEspecialidadVista | null;
  /** El código del certificado de especialidad, si ya se emitió, y su nota: el promedio de las materias y del trabajo. */
  certificado: string | null;
  nota: number | null;
  honores: boolean;
  conSesion: boolean;
  vistaPrevia: boolean;
};

export type BloqueVista =
  | { t: "parrafo"; texto: string }
  | { t: "subtitulo"; texto: string }
  | { t: "lista"; items: string[] }
  | { t: "nota"; titulo?: string; texto: string }
  | { t: "versiculo"; ref: string; texto: string | null; enlace: string | null }
  | { t: "video"; url: string; titulo: string; fuente: string; minutos?: number }
  | { t: "audio"; url: string; titulo: string }
  | { t: "imagen"; src: string; alt: string; pie?: string }
  // los esquemas visuales (revisión del 16-nov): línea de tiempo, cuadro comparativo y pasos (o ejemplo resuelto)
  | { t: "linea"; titulo: string; eventos: { fecha: string; texto: string; ref?: string }[] }
  | { t: "cuadro"; titulo: string; columnas: string[]; filas: string[][] }
  | { t: "pasos"; titulo: string; pasos: { titulo: string; texto: string }[] };

export type PreguntaVista = { id: string; texto: string; opciones: string[] };

/**
 * Lo mínimo para abrir el repaso de una lección (que no se responda sin leerla): leer el 40 % de sus minutos (entre 1
 * y 3 minutos) y, si tiene un video de YouTube, ver de corrido sus primeros 2 minutos (o entero, si dura menos). El
 * servidor cuenta el tiempo desde que se abrió la lección y el del video, que nunca suma más que el tiempo que pasó.
 */
export const LECTURA = { parte: 0.4, minimo: 60, maximo: 180, video: 120, margen: 120 } as const;
export function segundosDeLectura(minutos: number): number {
  return Math.round(Math.min(LECTURA.maximo, Math.max(LECTURA.minimo, minutos * 60 * LECTURA.parte)));
}
/** El id de un video de YouTube (o null si no es de YouTube). */
export function idYouTube(url: string): string | null {
  const m = /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/.exec(url);
  return m ? m[1] : null;
}
/** Cuánto video pide una lección: el primero de YouTube, 2 minutos o lo que dure (null si no tiene). */
export function videoQuePide(bloques: readonly { t: string; url?: string; minutos?: number }[]): number | null {
  const v = bloques.find((b) => b.t === "video" && !!b.url && !!idYouTube(b.url));
  if (!v) return null;
  return v.minutos && v.minutos * 60 < LECTURA.video ? Math.round(v.minutos * 60) : LECTURA.video;
}
/**
 * Lo que falta (en segundos) para abrir el repaso: de lectura y de video (null si la lección no tiene video). Si el video
 * no se puede ver (no carga, está bloqueado o lo quitaron), el repaso se abre igual cuando pasó el tiempo de la lectura,
 * el del video y un margen (`sinVideo`): nadie queda trabado.
 */
export type BloqueoRepaso = { lectura: number; video: number | null; videoPide: number | null; sinVideo: number | null };

/** Lo que falta para abrir el repaso, con los segundos desde que se abrió la lección y lo visto de corrido del video. */
export function bloqueoDe(minutos: number, pideVideo: number | null, leidos: number, videoSeg: number): BloqueoRepaso {
  const lectura = Math.max(0, Math.ceil(segundosDeLectura(minutos) - leidos));
  if (pideVideo == null) return { lectura, video: null, videoPide: null, sinVideo: null };
  const sinVideo = Math.max(0, Math.ceil(segundosDeLectura(minutos) + pideVideo + LECTURA.margen - leidos));
  return { lectura, video: sinVideo === 0 ? 0 : Math.max(0, pideVideo - videoSeg), videoPide: pideVideo, sinVideo };
}

export type LeccionVista = {
  materia: { id: string; titulo: string };
  leccion: { id: string; titulo: string; n: number; de: number; minutos: number; base: string };
  objetivos: string[];
  paraEmpezar: string;
  bloques: BloqueVista[];
  ideaClave: string;
  paraLaVida: { texto: string; pregunta: string };
  repaso: (PreguntaVista & { hecha: boolean })[];
  progreso: { completada: boolean; reflexion: string } | null;
  anterior: string | null;
  siguiente: string | null;
  publica: boolean;
  conSesion: boolean;
  /** Inscrito en la academia (ficha y matrícula). */
  matriculado: boolean;
  /** Inscrito en la materia: puede completar la lección y guardar su avance. */
  inscrita: boolean;
  /** La lee la Administración sin estar inscrita en la materia: no se guarda nada. */
  docente: boolean;
  /** Lo que falta para abrir el repaso (null: ya está abierto, o es la vista docente). */
  bloqueo: BloqueoRepaso | null;
  /** La narración grabada con la voz de la academia (null: se escucha con la voz del aparato). */
  narracion: NarracionVista | null;
};

export type RespuestaRepaso = { bien: boolean; correcta: string; explica: string; ref: string; todas: boolean };

/** Una idea de la clave de corrección, como se le devuelve al alumno (sin sus formas aceptadas). */
export type IdeaDevuelta = { texto: string; ok: boolean };
export type CorreccionVista = {
  nota: number;
  ideas: IdeaDevuelta[];
  cita: { pedida: boolean; encontrada: string | null; valida: boolean };
  avisos: string[];
  revisar: boolean;
  palabras: number;
};

export type PreguntaExamen = PreguntaVista & { n: number; de: number; segundos: number; quedan: number };
export type EscritaExamen = { id: string; texto: string; tipo: TipoEscrita; min: number; max: number; minutos: number; quedan: number; n: number; de: number };
export type RevisionObjetiva = { texto: string; opciones: string[]; elegida: number; correcta: number; bien: boolean; tarde: boolean; explica: string; ref: string };
export type ResultadoExamen = {
  /** El número del intento (los resultados de antes del registro de intentos no lo traen). */
  intento?: number;
  nota: number;
  objetiva: number;
  escrita: number;
  aprobado: boolean;
  medalla: Medalla | null;
  aciertos: number;
  de: number;
  revision: RevisionObjetiva[];
  escritas: (CorreccionVista & { pregunta: string; texto: string; modelo: string; revision?: RevisionEscrita | null })[];
  materia: { nota: number; aprobada: boolean; medalla: Medalla | null } | null;
  espera: number;
};
/** Una respuesta escrita que revisó la Dirección académica: la nota nueva, la de antes y el motivo. */
export type RevisionEscrita = { nota: number; antes: number; motivo: string; fecha: string };

/** El pedido de revisión de un examen, como lo ve el alumno. */
export type ApelacionVista = { estado: "pendiente" | "resuelta"; mensaje: string; creada: string; respuesta: string | null; resuelta: string | null };

/** Si el alumno puede pedir la revisión del último intento, hasta cuándo, y si no, por qué. */
export type Apelable = { puede: boolean; hasta: string | null; porque: string | null };

export type PasoExamen =
  | { paso: "objetiva"; pregunta: PreguntaExamen }
  | { paso: "escrita"; escrita: EscritaExamen }
  | { paso: "fin"; resultado: ResultadoExamen };

// ---------------------------------------------------------------- la matrícula, el estatus y el reglamento

/** El número de matrícula: AAF-año-número. Es correlativo, por eso el carné se verifica con otro código, al azar. */
export function numeroMatricula(anio: number, n: number): string {
  return `AAF-${anio}-${String(n).padStart(5, "0")}`;
}

/** El estatus del alumno como se muestra (en su carné y en su perfil): sin notas. */
export type EstatusVista = {
  clave: EstatusAlumno;
  /** «Estudiante · Nivel 1 · Fundamentos de la fe», «Egresado del Nivel 1 · Fundamentos de la fe»… */
  texto: string;
  nivel: number;
  /** Cerró algún nivel con honores: cuadro de honor. */
  honores: boolean;
};

export type DatosEstatus = {
  retirado: boolean;
  /** El nivel en que está (sube al completar uno). */
  nivelActual: number;
  /** Los niveles completos. */
  completados: number[];
  honores: boolean;
  /** Lecciones terminadas en total. */
  lecciones: number;
  diasSinEstudiar: number;
  /** El nivel siguiente al último completo ya tiene materias disponibles. */
  siguienteDisponible: boolean;
};

const nombreNivel = (n: number) => NIVELES.find((x) => x.n === n)?.nombre ?? "";

/** El estatus a partir del avance (docs/academia.md, «La matrícula y el estatus»). */
export function estatusDe(d: DatosEstatus): EstatusVista {
  const ultimo = d.completados.length ? Math.max(...d.completados) : 0;
  const honores = d.honores;
  if (d.retirado) return { clave: "retirado", texto: "Retirado", nivel: d.nivelActual, honores };
  if (ultimo >= 5) return { clave: "graduado", texto: "Graduado de la Academia", nivel: 5, honores };
  if (ultimo >= 1 && !d.siguienteDisponible) return { clave: "egresado", texto: `Egresado del Nivel ${ultimo} · ${nombreNivel(ultimo)}`, nivel: ultimo, honores };
  const n = Math.max(1, d.nivelActual);
  if (d.lecciones === 0) return { clave: "aspirante", texto: `Aspirante · Nivel ${n} · ${nombreNivel(n)}`, nivel: n, honores };
  if (d.diasSinEstudiar > DIAS_PAUSA) return { clave: "pausa", texto: `Estudiante en pausa · Nivel ${n} · ${nombreNivel(n)}`, nivel: n, honores };
  return { clave: "activo", texto: `Estudiante · Nivel ${n} · ${nombreNivel(n)}`, nivel: n, honores };
}

export type MatriculaInfo = {
  numero: string;
  promocion: number;
  /** Cuándo se inscribió (aceptó el reglamento y el código de honor). */
  desde: string;
  estatus: EstatusVista;
};

/** El carné digital: acredita la matrícula y se verifica con su QR (un código al azar, no el número de matrícula). */
export type CarneVista = MatriculaInfo & {
  nombre: string;
  /** La foto del carné (la que subió para el carné o, si no, la de su perfil). */
  foto: string | null;
  /** Subió una foto propia para el carné (no es la de su perfil). */
  fotoPropia: boolean;
  codigo: string;
  verificar: string;
  /**
   * Los archivos del carné, hechos en el servidor (server/academia-carne.ts). Cada dirección lleva la huella de esta
   * versión: las imágenes se muestran (con &descargar=1 se descargan) y el PDF se descarga (con &ver=1 se abre).
   * `nombre` es el nombre de los archivos (carne-aaf-2026-00042).
   */
  archivos: { frente: string; reverso: string; pdf: string; nombre: string };
};

/** El código de honor que se acepta al inscribirse (y antes de cada examen). */
export const CODIGO_HONOR =
  "Me comprometo a estudiar y a hacer cada examen yo solo, sin ayuda de otras personas, sin copiar ni pegar textos ajenos, con sinceridad, de corazón, como para el Señor y no para los hombres (Colosenses 3:23).";

export type SeccionReglamento = { titulo: string; puntos: string[] };

const ordinal = (n: number) => (n === 3 ? "tercer" : n === 2 ? "segundo" : `${n}.º`);
const minuscula = (t: string) => t.charAt(0).toLowerCase() + t.slice(1);

/** Lo que pide cada nivel en la vida de la iglesia (sección 11 del reglamento), con los números del sistema. */
function actividadesDelReglamento(): string[] {
  const n2 = ACTIVIDADES_NIVEL[2]!;
  const n3 = ACTIVIDADES_NIVEL[3]!;
  const n4 = ACTIVIDADES_NIVEL[4]!;
  const n5 = ACTIVIDADES_NIVEL[5]!;
  const anios = Math.round(LIMITES_ACTIVIDAD.diasAtras / 365);
  const enFrase = (t: string) => (t.startsWith("Cristo") ? t : minuscula(t));
  return [
    `Desde el Nivel 2, cada nivel pide también actividades en la vida de la iglesia. Se registran en la página del nivel, después de completar el nivel anterior, y pueden ser de los últimos ${anios} años.`,
    "Las confirma la Administración de la academia con el líder o el pastor que el alumno nombra, o las devuelve con un motivo para corregirlas. Cuentan las confirmadas y lo confirmado ya no cambia. Nadie confirma lo suyo.",
    `Nivel 2: ${n2.evangelismo} conversaciones de evangelismo y servir 1 mes (${n2.servicioDias} días) en un ministerio de la iglesia.`,
    `Nivel 3: ${n3.practicaHoras} horas de práctica ministerial supervisada por un líder de la iglesia, una enseñanza grabada aprobada y consolidar a ${n3.consolidacion} nuevo creyente.`,
    `Nivel 4: ${n4.practicaHoras} horas de práctica ministerial supervisada y un sermón evaluado con rúbrica.`,
    `Nivel 5: el proyecto final con defensa en vivo y acompañar a ${n5.acompanar} personas hasta que terminen el Nivel 1.`,
    `La práctica se registra por día o por período, con el ministerio, quién la supervisó y sus horas: hasta ${LIMITES_ACTIVIDAD.horasDia} en un día y ${LIMITES_ACTIVIDAD.horasPeriodo} en un período. La Administración puede confirmar menos horas de las registradas.`,
    `La enseñanza grabada dura de ${MINUTOS_ENSENANZA.min} a ${MINUTOS_ENSENANZA.max} minutos y se prepara con los pasos de Homilética I. Se comparte con un enlace que la Administración pueda abrir, sin hacerla pública, y se aprueba si explica un pasaje en su contexto con una idea central y un propósito claros, un bosquejo que sale del texto, una ilustración, una aplicación y a Cristo en el centro.`,
    `Consolidar es acompañar a un nuevo creyente, en coordinación con la iglesia, al menos en ${PASOS_MINIMOS} de los ${PASOS_CONSOLIDACION.length} pasos del plan de consolidación de la materia Evangelismo y consolidación.`,
    `El sermón dura de ${MINUTOS_SERMON.min} a ${MINUTOS_SERMON.max} minutos y se presenta grabado, con un enlace que la Administración pueda abrir, o en vivo, ante un maestro de la academia. Un maestro lo evalúa con la rúbrica de Homilética II (${RUBRICA_SERMON.map((c) => `${enFrase(c.corto)}, ${c.max}`).join("; ")}) y se aprueba con ${APRUEBA_SERMON} de 100; si no llega, se prepara otra vez con lo que debe mejorar.`,
    `El proyecto final es un plan de ministerio con las ${PARTES_PLAN.length} partes de la materia Seminario de liderazgo ministerial, escrito con el pastor o el mentor y entregado con un enlace. La Administración programa su defensa en vivo, en persona o en línea, ante ${PROFESORES_DEFENSA} profesores; después de ella, cada uno lo evalúa con su rúbrica (${RUBRICA_PROYECTO.map((c) => `${enFrase(c.corto)}, ${c.max}`).join("; ")}). La nota es el promedio de los dos y se aprueba con ${APRUEBA_PROYECTO} de 100; si no llega, se mejora y se defiende otra vez.`,
    "Para acompañar, la Administración elige al alumno como mentor de personas que empiezan el Nivel 1: cuenta cada una que termina el Nivel 1 mientras la acompaña. No hace falta registrarlo, y desde la página del nivel se le puede pedir a la Administración a quién acompañar.",
    "De las personas con quienes hablas o a quienes acompañas se anota solo la relación o sus iniciales, nunca su nombre completo ni sus datos.",
    "Las normas de prudencia de las materias se cumplen siempre: con menores de edad, con conocimiento de sus padres y nunca a solas. Si aparece un abuso o un peligro, se avisa de inmediato al pastor y a las autoridades.",
  ];
}

/**
 * El reglamento académico (página pública /academia/reglamento). Sus números salen de las mismas reglas que usa el
 * sistema, así que nunca dicen otra cosa. Si cambia algo de fondo, sube la versión: queda guardada en cada matrícula.
 */
export const REGLAMENTO: { version: string; titulo: string; base: string; intro: string; secciones: SeccionReglamento[] } = {
  version: "2026-11-20",
  titulo: "Reglamento académico",
  base: LEMA.ref,
  intro: `Este reglamento ordena la vida académica de la ${NOMBRE_ACADEMIA}. Al inscribirte lo aceptas, junto con el código de honor.`,
  secciones: [
    {
      titulo: "1. La academia",
      puntos: [
        `La ${NOMBRE_ACADEMIA} es el instituto de formación ministerial del Ministerio Avivando el Fuego: forma en la Palabra de Dios a creyentes, obreros, maestros y pastores, por niveles y a su propio ritmo.`,
        "Es gratuita y se cursa en la web, desde la computadora o el teléfono.",
        `Sus certificados y diplomas son formación ministerial. ${ACLARACION_DOCUMENTOS}`,
      ],
    },
    {
      titulo: "2. La inscripción",
      puntos: [
        "Para estudiar se necesita una cuenta en la web e inscribirse en la academia: llenar la ficha de inscripción y aceptar este reglamento y el código de honor. La inscripción es gratuita y queda aprobada al instante.",
        "La inscripción da un número de matrícula personal (AAF-año-número) y una promoción, que es el año en que ingresaste. El carné digital la acredita.",
        "Cada materia tiene su propia inscripción, desde su página, donde se ve lo que se aprende, cómo es y cómo se evalúa. La primera lección de cada materia del Nivel 1 se puede leer sin inscribirse; las demás, el versículo de memoria y el examen piden estar inscrito.",
        "Tus certificados llevan el nombre de tu ficha. Una vez emitido un certificado, ese nombre solo lo corrige la Administración de la academia.",
        "La inscripción es personal: cada alumno estudia con su propia cuenta.",
      ],
    },
    {
      titulo: "3. Los niveles y el avance",
      puntos: [
        `La academia tiene ${NIVELES.length} niveles en ${ETAPAS.length} etapas. Cada nivel tiene materias, y cada materia, lecciones cortas con su repaso, un versículo de memoria y un examen final.`,
        `Cada alumno avanza a su ritmo. Una materia se aprueba con el examen final aprobado y una nota de ${APRUEBA} o más.`,
        "Un nivel se cierra con todas sus materias aprobadas, el examen integral, los versículos de memoria que pide, su pacto y las actividades que pide en la vida de la iglesia (sección 11). Las especialidades se abren al terminar el Nivel 2.",
      ],
    },
    {
      titulo: "4. La evaluación",
      puntos: [
        `Las notas van de 0 a 100. Una materia se aprueba con ${APRUEBA}; el examen integral de un nivel, con ${APRUEBA_INTEGRAL}.`,
        `En el Nivel 1, la nota de la materia sale del examen final (${PESOS_NIVEL[1].final} %), los repasos de las lecciones (${PESOS_NIVEL[1].repasos} %) y el versículo de memoria (${PESOS_NIVEL[1].versiculo} %).`,
        "El examen final tiene una parte objetiva, con un tiempo para cada pregunta que lleva el servidor, y una parte escrita que el sistema corrige al instante, idea por idea.",
        `Si no apruebas, puedes intentarlo otra vez después de ${ESPERA_FINAL_MIN[0]} minutos y, desde el segundo fallo, después de ${ESPERA_FINAL_MIN[1] / 60} horas. Desde el ${ordinal(FALLOS_PARA_REPASAR)} fallo hay que volver a leer las lecciones antes de intentarlo. Cada intento trae preguntas distintas.`,
        `Un nivel se cierra con honores cuando el promedio de sus materias es de ${HONORES} o más.`,
      ],
    },
    {
      titulo: "5. El código de honor",
      puntos: [
        CODIGO_HONOR,
        "Las respuestas pegadas o dudosas quedan marcadas para que las revise la Administración de la academia.",
        "Hacer trampa, copiar o dar el examen por otra persona anula el examen y puede anular los documentos obtenidos.",
      ],
    },
    {
      titulo: "6. La revisión de las notas",
      puntos: [
        "Todo lo corrige el sistema. Solo la Administración de la academia puede revisar una respuesta y cambiar la nota, siempre con un motivo que queda registrado.",
        `Si no estás de acuerdo con una nota, puedes pedir que se revise, una vez por examen y dentro de los ${DIAS_APELACION} días.`,
      ],
    },
    {
      titulo: "7. El estatus del alumno",
      puntos: [
        "Aspirante: te inscribiste y aún no terminas tu primera lección.",
        "Estudiante activo: estudias con regularidad.",
        `Estudiante en pausa: pasaron ${DIAS_PAUSA} días sin estudiar. Vuelves a estar activo en cuanto estudias.`,
        "Egresado del nivel: completaste un nivel y el siguiente todavía no está disponible.",
        "Graduado de la Academia: completaste el Nivel 5.",
        "Cuadro de honor: cerraste un nivel con honores.",
      ],
    },
    {
      titulo: "8. Los documentos",
      puntos: [
        "Cada materia aprobada y cada nivel completo dan un certificado con un código y un QR. Cualquiera puede verificarlos en la web, sin ver las notas.",
        "El carné digital acredita tu matrícula y también se verifica con su QR.",
        "Solo la Administración de la academia puede corregir o revocar un documento, siempre con un motivo.",
      ],
    },
    {
      titulo: "9. La privacidad",
      puntos: [
        "Tus notas las ven tú y la Administración de la academia; los maestros del ministerio y los líderes de tu iglesia aliada pueden consultarlas, sin cambiar nada. En tu carné y en tu perfil se muestran tu estatus y tu nivel, sin notas.",
        "Los datos de tu ficha (nombre, país, iglesia y contacto) los ven la Administración de la academia y, si elegiste una iglesia aliada, quienes la dirigen. Se usan solo para acompañarte en tus estudios y para tus documentos: no se publican ni se comparten con nadie más.",
        "Puedes corregir los datos de tu ficha cuando quieras, desde tu inscripción.",
        "Si borras tu cuenta, se borra todo tu avance en la academia, también tu ficha, y tus documentos dejan de verificarse.",
      ],
    },
    {
      titulo: "10. La doctrina",
      puntos: [
        "La academia enseña conforme a la Biblia (Reina-Valera 1960) y a la declaración de fe del Ministerio Avivando el Fuego.",
        "Donde los cristianos tienen posturas distintas, se presentan con respeto y se indica la posición del ministerio.",
      ],
    },
    { titulo: "11. Las actividades de los niveles", puntos: actividadesDelReglamento() },
  ],
};
