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
import { BIBLE_BOOK_CHAPTERS, bibleBookLabel } from "./bible";

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
  /** Minutos para cada respuesta escrita. */
  minutosEscrita: number;
};
export const EXAMEN_FINAL: Record<NivelN, MedidaExamen> = {
  1: { objetivas: 10, banco: 30, escritas: 1, pesoObjetiva: 80, segundos: 60, minutosEscrita: 6 },
  2: { objetivas: 15, banco: 45, escritas: 2, pesoObjetiva: 70, segundos: 60, minutosEscrita: 6 },
  3: { objetivas: 20, banco: 60, escritas: 2, pesoObjetiva: 60, segundos: 60, minutosEscrita: 15 },
  4: { objetivas: 20, banco: 60, escritas: 2, pesoObjetiva: 60, segundos: 60, minutosEscrita: 15 },
  5: { objetivas: 20, banco: 60, escritas: 2, pesoObjetiva: 60, segundos: 60, minutosEscrita: 15 },
};
export function examenDe(m: MateriaDef): MedidaExamen {
  return EXAMEN_FINAL[m.nivel ?? 3];
}
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
export const ESCRITA = { corta: { min: 15, max: 60 }, breve: { min: 80, max: 300 } } as const;
export type TipoEscrita = keyof typeof ESCRITA;

// ---------------------------------------------------------------- el cierre de cada nivel

/**
 * El examen integral de cada nivel: preguntas de los bancos de todas sus materias, repartidas por materia, y respuestas
 * escritas de materias distintas. Se da con todas las materias del nivel aprobadas y repasa el nivel entero.
 */
export const EXAMEN_INTEGRAL: Record<NivelN, MedidaExamen> = {
  1: { objetivas: 40, banco: 120, escritas: 2, pesoObjetiva: 80, segundos: 60, minutosEscrita: 6 },
  2: { objetivas: 40, banco: 120, escritas: 2, pesoObjetiva: 70, segundos: 60, minutosEscrita: 6 },
  3: { objetivas: 40, banco: 120, escritas: 2, pesoObjetiva: 60, segundos: 60, minutosEscrita: 15 },
  4: { objetivas: 40, banco: 120, escritas: 2, pesoObjetiva: 60, segundos: 60, minutosEscrita: 15 },
  5: { objetivas: 40, banco: 120, escritas: 2, pesoObjetiva: 60, segundos: 60, minutosEscrita: 15 },
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
export const DIAGNOSTICO = { porMateria: 2, segundos: 45, diasEntre: 30 } as const;

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

const sinTildes = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "");
const LIBROS = new Map(Object.keys(BIBLE_BOOK_CHAPTERS).map((k) => [sinTildes(k).toLowerCase(), k]));

export type Cita = { libro: string; capitulo: number; desde: number; hasta: number };

/** «Juan 3:16», «1 Juan 5:11-13», «Gálatas 5:16-25» → libro guardado (sin tilde), capítulo y versículos. */
export function parsearCita(ref: string): Cita | null {
  const m = /^\s*((?:[123]\s+)?[A-Za-zÁÉÍÓÚÑáéíóúñü]+)\s+(\d{1,3}):(\d{1,3})(?:\s*[-–]\s*(\d{1,3}))?\s*$/.exec(ref);
  if (!m) return null;
  const libro = LIBROS.get(sinTildes(m[1].replace(/\s+/g, " ")).toLowerCase());
  if (!libro) return null;
  const capitulo = Number(m[2]);
  const desde = Number(m[3]);
  const hasta = m[4] ? Number(m[4]) : desde;
  if (capitulo < 1 || capitulo > BIBLE_BOOK_CHAPTERS[libro] || desde < 1 || hasta < desde) return null;
  return { libro, capitulo, desde, hasta };
}

/** La cita escrita para mostrar, con las tildes de la RV1960 («Galatas» → «Gálatas»). */
export function citaVisible(c: Cita): string {
  return `${bibleBookLabel(c.libro)} ${c.capitulo}:${c.desde}${c.hasta > c.desde ? `-${c.hasta}` : ""}`;
}

/** El capítulo en la Biblioteca de la web. */
export function enlaceBiblia(c: Cita): string {
  return `/biblioteca?libro=${encodeURIComponent(c.libro)}&cap=${c.capitulo}`;
}

// ---------------------------------------------------------------- el catálogo

const lecciones = (materia: string, defs: [titulo: string, base: string][]): LeccionDef[] =>
  defs.map(([titulo, base], i) => ({ id: `${materia}-${i + 1}`, titulo, minutos: 7, base }));

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
      enPreparacion(2, 1, "n2-panorama-at", "Panorama del Antiguo Testamento", "La historia de la redención de Génesis a Malaquías: creación, patriarcas, éxodo, ley, reyes, profetas, exilio y regreso."),
      enPreparacion(2, 2, "n2-panorama-nt", "Panorama del Nuevo Testamento", "La vida de Jesús, la iglesia en Hechos, las cartas, Apocalipsis y el tiempo entre los testamentos."),
      enPreparacion(2, 3, "n2-doctrinas", "Doctrinas fundamentales", "Las grandes verdades de la fe según la declaración de fe del ministerio."),
      enPreparacion(2, 4, "n2-disciplinas", "Disciplinas espirituales", "Oración, ayuno, adoración, meditación, diario espiritual y el día del Señor."),
      enPreparacion(2, 5, "n2-sermon-monte", "El Sermón del monte", "El carácter del discípulo según Mateo 5 a 7."),
      enPreparacion(2, 6, "n2-mayordomia", "Mayordomía cristiana", "Tiempo, talentos y bienes; diezmo, generosidad y finanzas sanas."),
      enPreparacion(2, 7, "n2-familia", "Familia y relaciones", "Matrimonio, hijos, soltería, amistad y pureza."),
      enPreparacion(2, 8, "n2-evangelismo-personal", "Evangelismo personal", "Puentes, preguntas, objeciones comunes y seguimiento de quien cree.", { antes: "Evangelismo 1 y 2" }),
      enPreparacion(2, 9, "n2-dones", "Dones espirituales y servicio", "Los dones del Espíritu y cómo descubrir dónde servir."),
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
      enPreparacion(3, 1, "n3-hermeneutica", "Hermenéutica", "Interpretar bien la Biblia: contexto, géneros, reglas y errores comunes."),
      enPreparacion(3, 2, "n3-metodos-estudio", "Métodos de estudio bíblico", "El estudio inductivo y sus herramientas: concordancia, diccionario y mapas."),
      enPreparacion(3, 3, "n3-pentateuco-historicos", "Pentateuco y libros históricos", "De Génesis a Ester."),
      enPreparacion(3, 4, "n3-evangelios-hechos", "Los Evangelios y Hechos", "La vida y el ministerio de Jesús y la iglesia en el poder del Espíritu."),
      enPreparacion(3, 5, "n3-espiritu-santo", "La persona y obra del Espíritu Santo", "El bautismo en el Espíritu, los dones, el fruto y los avivamientos."),
      enPreparacion(3, 6, "n3-evangelismo-consolidacion", "Evangelismo y consolidación", "Evangelismo en equipo, campañas, calle, radio y redes, y la consolidación del nuevo creyente.", { antes: "Evangelismo 2" }),
      enPreparacion(3, 7, "n3-liderazgo-1", "Liderazgo cristiano I", "El carácter del líder, servir como Jesús y el trabajo en equipo."),
      enPreparacion(3, 8, "n3-homiletica-1", "Homilética I", "Preparar y dar una enseñanza bíblica y hablar en público."),
      enPreparacion(3, 9, "n3-historia-1", "Historia de la iglesia I", "De Pentecostés a la Reforma."),
      enPreparacion(3, 10, "n3-consejeria-basica", "Cuidado y consejería básica", "Escuchar, orar con otros, acompañar en crisis y saber cuándo derivar."),
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
      enPreparacion(4, 1, "n4-sistematica-1", "Teología sistemática I: la Biblia y Dios", "La doctrina de las Escrituras, los atributos de Dios y la Trinidad."),
      enPreparacion(4, 2, "n4-sistematica-2", "Teología sistemática II: Cristo y el Espíritu Santo", "La persona y la obra de Cristo y del Espíritu Santo."),
      enPreparacion(4, 3, "n4-sistematica-3", "Teología sistemática III: el hombre, el pecado y la salvación", "Antropología, hamartiología y soteriología."),
      enPreparacion(4, 4, "n4-sistematica-4", "Teología sistemática IV: la iglesia, los ángeles y los últimos tiempos", "Eclesiología, angelología y escatología."),
      enPreparacion(4, 5, "n4-poeticos-profeticos", "Libros poéticos y proféticos", "De Job a Cantares y de Isaías a Malaquías."),
      enPreparacion(4, 6, "n4-epistolas-apocalipsis", "Epístolas y Apocalipsis", "De Romanos a Judas, y el libro de Apocalipsis."),
      enPreparacion(4, 7, "n4-homiletica-2", "Homilética II: predicación expositiva", "Predicar un pasaje con fidelidad; un sermón evaluado con rúbrica."),
      enPreparacion(4, 8, "n4-historia-2", "Historia de la iglesia II", "La Reforma, los avivamientos, el movimiento pentecostal y la iglesia en América Latina."),
      enPreparacion(4, 9, "n4-apologetica", "Apologética", "Defender la fe: Dios, la Biblia, la resurrección, las sectas y las falsas doctrinas."),
      enPreparacion(4, 10, "n4-etica", "Ética cristiana y ministerial", "Decisiones morales, integridad, dinero, autoridad y protección de menores."),
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
      enPreparacion(5, 1, "n5-teologia-pastoral", "Teología pastoral", "La vida, la familia y la labor del ministro."),
      enPreparacion(5, 2, "n5-administracion", "Administración y gobierno de la iglesia", "Organización, transparencia, diáconos y ancianos, y lo legal básico."),
      enPreparacion(5, 3, "n5-didactica", "Didáctica: cómo enseñar", "Preparar clases, evaluar y acompañar alumnos; de aquí salen los profesores de la academia."),
      enPreparacion(5, 4, "n5-liderazgo-2", "Liderazgo II: formar líderes y equipos", "Multiplicar líderes, delegar, resolver conflictos y servir con visión."),
      enPreparacion(5, 5, "n5-idiomas", "Griego y hebreo bíblicos para el estudio", "Los alfabetos, palabras clave y herramientas como Strong e interlineales."),
      enPreparacion(5, 6, "n5-exegesis", "Exégesis de un libro", "Estudio profundo de Romanos o de Hechos."),
      enPreparacion(5, 7, "n5-avivamiento", "Teología del avivamiento", "Los principios bíblicos, la historia y el discernimiento del avivamiento."),
      enPreparacion(5, 8, "n5-seminario", "Seminario de liderazgo ministerial", "Casos reales y un plan de ministerio propio."),
    ],
  },
];

const especialidad = (id: EspecialidadId, nombre: string, resumen: string, materias: [titulo: string, avanzada?: boolean][]): EspecialidadDef => ({
  id,
  nombre,
  resumen,
  materias: materias.map(([titulo, avanzada], i) => ({
    id: `${id}-${i + 1}`,
    nivel: null,
    especialidad: id,
    avanzada: avanzada || undefined,
    orden: i + 1,
    titulo,
    resumen: "",
    lecciones: [],
    disponible: false,
  })),
});

/** Las especialidades: se abren al terminar el Nivel 2 (las materias «avanzadas» piden el Nivel 3) y no tienen límite. */
export const ESPECIALIDADES: EspecialidadDef[] = [
  especialidad("evangelismo-misiones", "Evangelismo y misiones", "Ganar almas, campañas, misión transcultural y plantar iglesias.", [
    ["Evangelismo personal avanzado"], ["Campañas y cruzadas"], ["Teología bíblica de las misiones", true], ["Misión transcultural", true], ["Plantación de iglesias", true],
  ]),
  especialidad("pastoral", "Ministerio pastoral", "Pastorear, aconsejar, celebrar las ordenanzas y cuidar del rebaño.", [
    ["El ministerio pastoral", true], ["Consejería pastoral", true], ["Ordenanzas y ceremonias"], ["Visitación y cuidado del rebaño"], ["Predicación pastoral", true],
  ]),
  especialidad("alabanza", "Alabanza y adoración", "Adorar en espíritu y en verdad y dirigir el ministerio de alabanza.", [
    ["Teología de la adoración"], ["El adorador: carácter y vida"], ["Dirigir el ministerio de alabanza"], ["La música en la historia de la iglesia"], ["Sonido y técnica al servicio del culto"],
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

export type RequisitoNivel = { id: "materias" | "integral" | "versiculos" | "pacto"; texto: string; hecho: boolean; detalle: string };

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

export type TipoDocumento = "materia" | "nivel";

/** Un documento de la academia (certificado de materia o de nivel), como lo ven su dueño y la Dirección académica. */
export type DocumentoAcademia = {
  codigo: string;
  tipo: TipoDocumento;
  /** El id de la materia o el número del nivel. */
  ref: string;
  /** El título de la materia, o lo que recibe el nivel («Certificado en Fundamentos de la Fe»). */
  titulo: string;
  nivel: { n: number; nombre: string } | null;
  /** El nombre del alumno al emitirse. */
  nombre: string;
  /** La nota de la materia o el promedio del nivel. */
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
  /** Un certificado (de materia o de nivel) o el carné de estudiante. */
  tipo: TipoDocumento | "carne";
  documento: string;
  nivel: string | null;
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
export const LECTURA = { parte: 0.4, minimo: 60, maximo: 180, video: 120 } as const;
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
/** Lo que falta (en segundos) para abrir el repaso: de lectura y de video (null si la lección no tiene video). */
export type BloqueoRepaso = { lectura: number; video: number | null; videoPide: number | null };

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
  qr: string;
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
