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
};

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
 * Las mini pruebas (Nivel 2 en adelante): cada 3 lecciones, 6 preguntas de un banco de 18, 45 segundos cada una, sin
 * escritas. Hay 3 intentos (cada uno con preguntas nuevas) y cuenta el mejor. Muestran la revisión al terminar: sirven
 * para aprender. Su nota, en promedio, es el componente «mini» de la materia (las que no se dieron cuentan 0).
 */
export const MINI_PRUEBA = { objetivas: 6, banco: 18, segundos: 45, intentos: 3, cada: 3 } as const;
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
 * La prueba diagnóstica: 2 preguntas de cada materia con contenido, 45 segundos cada una. Solo sugiere por dónde
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
      enPreparacion(2, 3, "n2-doctrinas", "Doctrinas fundamentales", "Las grandes verdades de la fe según la declaración de fe del ministerio."),
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
      enPreparacion(3, 5, "n3-espiritu-santo", "La persona y obra del Espíritu Santo", "El bautismo en el Espíritu, los dones, el fruto y los avivamientos."),
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
      enPreparacion(4, 2, "n4-sistematica-2", "Teología sistemática II: Cristo y el Espíritu Santo", "La persona y la obra de Cristo y del Espíritu Santo."),
      enPreparacion(4, 3, "n4-sistematica-3", "Teología sistemática III: el hombre, el pecado y la salvación", "Antropología, hamartiología y soteriología."),
      enPreparacion(4, 4, "n4-sistematica-4", "Teología sistemática IV: la iglesia, los ángeles y los últimos tiempos", "Eclesiología, angelología y escatología."),
      POETICOS_PROFETICOS,
      enPreparacion(4, 6, "n4-epistolas-apocalipsis", "Epístolas y Apocalipsis", "De Romanos a Judas, y el libro de Apocalipsis."),
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
    requisitos: ["Las 8 materias aprobadas", "El proyecto final con defensa en vivo", "Acompañar a 2 personas hasta terminar el Nivel 1"],
    materias: [
      TEOLOGIA_PASTORAL,
      ADMINISTRACION,
      DIDACTICA,
      LIDERAZGO_2,
      IDIOMAS,
      enPreparacion(5, 6, "n5-exegesis", "Exégesis de un libro", "Estudio profundo de Romanos o de Hechos."),
      enPreparacion(5, 7, "n5-avivamiento", "Teología del avivamiento", "Los principios bíblicos, la historia y el discernimiento del avivamiento."),
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
    ["El ministerio pastoral", true], ["Consejería pastoral", true], ["Ordenanzas y ceremonias"], ["Visitación y cuidado del rebaño"], ["Predicación pastoral", true],
  ]),
  especialidad("alabanza", "Alabanza y adoración", "Adorar en espíritu y en verdad y dirigir el ministerio de alabanza.", [
    TEOLOGIA_ADORACION, ADORADOR, DIRIGIR_ALABANZA, HISTORIA_MUSICA, SONIDO_TECNICA,
  ]),
  especialidad("ninez", "Niñez", "Enseñar y cuidar a los niños con la Palabra.", [
    ["Educación cristiana de la niñez"], ["El niño y su fe"], ["Métodos para enseñar a niños"], ["Protección de menores"], ["Organizar el ministerio infantil"],
  ]),
  especialidad("juventud", "Juventud", "Discipular y liderar a la nueva generación.", [
    ["Discipulado de jóvenes"], ["Cosmovisión cristiana y cultura"], ["Consejería juvenil", true], ["Liderazgo juvenil"], ["Evangelismo entre jóvenes"],
  ]),
  especialidad("familia-consejeria", "Familia y consejería", "Acompañar matrimonios y familias con sabiduría bíblica y límites claros.", [
    ["Consejería matrimonial", true], ["Consejería familiar", true], ["Duelo y crisis"], ["Adicciones y restauración", true], ["Ética y límites del consejero"],
  ]),
  especialidad("intercesion", "Intercesión y oración", "Una vida de oración, ayuno e intercesión con base bíblica.", [
    ["Teología de la oración"], ["Intercesión bíblica"], ["El ayuno bíblico"], ["Guerra espiritual bíblica y equilibrada", true], ["La oración en los avivamientos"],
  ]),
  especialidad("comunicaciones", "Comunicaciones y medios", "Llevar el evangelio por la radio, las redes y las transmisiones.", [
    ["Evangelismo en redes"], ["Radio cristiana"], ["Video y transmisiones"], ["Redacción y comunicación"], ["Ética y seguridad digital"],
  ]),
  especialidad("capellania", "Capellanía", "Servir en hospitales, cárceles y emergencias.", [
    ["Fundamentos de la capellanía"], ["Capellanía hospitalaria", true], ["Capellanía penitenciaria", true], ["Emergencias y desastres"], ["Marco legal y ético del capellán"],
  ]),
  especialidad("biblicos-avanzados", "Estudios bíblicos avanzados", "Libros a fondo, geografía, historia y trasfondo de la Biblia.", [
    ["Romanos", true], ["Hechos", true], ["Daniel y Apocalipsis", true], ["Geografía e historia bíblica"], ["Trasfondo y arqueología bíblica"],
  ]),
  especialidad("liderazgo-administracion", "Liderazgo y administración", "Administrar la obra con orden, transparencia y visión.", [
    ["Administración eclesiástica"], ["Finanzas y transparencia"], ["Equipos y voluntarios"], ["Planificación y proyectos ministeriales"], ["Marco legal de las organizaciones religiosas", true],
  ]),
  especialidad("obra-social", "Obra social y misericordia", "Servir al necesitado como lo hizo Jesús.", [
    ["Teología de la compasión"], ["Diaconía y servicio"], ["Proyectos comunitarios"], ["Ayuda humanitaria y desastres"], ["Voluntariado y alianzas"],
  ]),
];

// ---------------------------------------------------------------- búsquedas

const TODAS: MateriaDef[] = [...NIVELES.flatMap((n) => n.materias), ...ESPECIALIDADES.flatMap((e) => e.materias)];
const POR_ID = new Map(TODAS.map((m) => [m.id, m]));
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
};

/** El cierre de un nivel en la portada: null mientras el nivel no tiene todas sus materias disponibles. */
export type CierreResumen = { integralAprobado: boolean; pacto: boolean; completado: string | null };

export type RequisitoNivel = { id: "materias" | "integral" | "versiculos" | "evangelismo" | "servicio" | "pacto"; texto: string; hecho: boolean; detalle: string };

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

export type LeccionEstado = { id: string; titulo: string; minutos: number; base: string; vista: boolean; completada: boolean };

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
  | { t: "imagen"; src: string; alt: string; pie?: string };

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

/**
 * El reglamento académico (página pública /academia/reglamento). Sus números salen de las mismas reglas que usa el
 * sistema, así que nunca dicen otra cosa. Si cambia algo de fondo, sube la versión: queda guardada en cada matrícula.
 */
export const REGLAMENTO: { version: string; titulo: string; base: string; intro: string; secciones: SeccionReglamento[] } = {
  version: "2026-11-14",
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
        "Un nivel se cierra con todas sus materias aprobadas, el examen integral, los versículos de memoria que pide y su pacto. Las especialidades se abren al terminar el Nivel 2.",
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
  ],
};
