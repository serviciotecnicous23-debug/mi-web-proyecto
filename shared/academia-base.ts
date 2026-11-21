/**
 * Lo liviano de la Academia Avivando el Fuego (docs/academia.md): las constantes, las reglas de las notas y de los
 * exámenes, las etapas y los tipos de lo que responde la API. Sin el catálogo: lo importan las páginas de la academia,
 * que así no bajan los sílabos de todas las materias con cada pantalla.
 *
 * - El catálogo (los niveles, las materias y las especialidades) vive en shared/academia.ts, que vuelve a exportar todo
 *   lo de aquí: el servidor y las pruebas siguen importando de allí.
 * - Nada de aquí importa shared/academia.ts, y las páginas no importan shared/academia.ts (lo vigila
 *   shared/academia-base.test.ts). Lo que una pantalla necesita del catálogo llega por la API.
 * - Sin drizzle ni zod: nunca lo importan el menú ni la portada de la web.
 */

import type { NarracionVista } from "./narracion";

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

/** Las especialidades que existen (el catálogo de cada una está en ESPECIALIDADES, en shared/academia.ts). */
export const ESPECIALIDAD_IDS = [
  "evangelismo-misiones", "pastoral", "alabanza", "ninez", "juventud", "familia-consejeria",
  "intercesion", "comunicaciones", "capellania", "biblicos-avanzados", "liderazgo-administracion", "obra-social",
] as const;
export type EspecialidadId = (typeof ESPECIALIDAD_IDS)[number];

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

/** (Solo pide el nivel: sirve con la materia del catálogo y con la que llega por la API.) */
export function pesosDe(m: Pick<MateriaDef, "nivel">): Pesos {
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
export function examenDe(m: Pick<MateriaDef, "nivel">): MedidaExamen {
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
/**
 * Las mini pruebas de una materia: su número y las lecciones que mide (de 3 en 3). Ninguna si el nivel no las pesa.
 * `lecciones`: las de la materia o cuántas son (el mapa de la API trae solo cuántas).
 */
export function miniPruebasDe(m: Pick<MateriaDef, "nivel"> & { lecciones: readonly unknown[] | number }): { n: number; lecciones: number[] }[] {
  if (!pesosDe(m).mini) return [];
  const total = typeof m.lecciones === "number" ? m.lecciones : m.lecciones.length;
  const out: { n: number; lecciones: number[] }[] = [];
  for (let i = 0; i < total; i += MINI_PRUEBA.cada) {
    out.push({ n: out.length + 1, lecciones: Array.from({ length: Math.min(MINI_PRUEBA.cada, total - i) }, (_, j) => i + j + 1) });
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
export function tieneEscritoBreve(m: Pick<MateriaDef, "nivel">): boolean {
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

// ---------------------------------------------------------------- las etapas

export const ETAPAS: EtapaDef[] = [
  { id: "raices", nombre: "Raíces", base: "Colosenses 2:7", idea: "Arraigados en Cristo: lo que todo creyente necesita.", niveles: [1, 2] },
  { id: "servicio", nombre: "Servicio", base: "Efesios 4:12", idea: "Preparados para la obra del ministerio.", niveles: [3] },
  { id: "ministerio", nombre: "Ministerio", base: "2 Timoteo 2:2", idea: "Formados para enseñar también a otros.", niveles: [4, 5] },
];

/** La primera lección de cada materia del Nivel 1 la puede leer un visitante (leccionPublica la busca en el catálogo). */
export function esLeccionPublica(nivel: NivelN | null, indice: number): boolean {
  return nivel === 1 && indice === 0;
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
  /** Su nivel o su especialidad, para su presentación (la página no carga el catálogo). */
  lugar: { nivel: { n: NivelN; nombre: string; para: string } | null; especialidad: { id: EspecialidadId; nombre: string } | null };
  /** Mientras está en preparación: las materias de su nivel o de su especialidad que ya se pueden estudiar. */
  abiertas: { id: string; titulo: string }[];
};

/**
 * El mapa de la academia (GET /api/academia/mapa): lo que los exámenes necesitan saber del catálogo para su título y su
 * «Volver», sin bajarlo entero. Es igual para todos y solo cambia al publicar.
 */
export type MapaAcademia = {
  niveles: { n: NivelN; nombre: string; materias: number }[];
  materias: Record<string, { titulo: string; nivel: NivelN | null; lecciones: number }>;
};

/**
 * Lo que encuentra el buscador del catálogo en cada materia, además de su título y su resumen (GET
 * /api/academia/buscador): sus pasajes, su versículo de memoria, su propósito, sus lecciones y su bibliografía (la
 * básica y después la complementaria).
 */
export type BuscadorMateria = {
  base?: string;
  memoria?: string;
  proposito?: string;
  lecciones: string[];
  libros: Pick<Libro, "autor" | "titulo">[];
  /** Las prácticas del laboratorio ministerial de la materia (sus títulos), si tiene. */
  practicas?: string[];
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
