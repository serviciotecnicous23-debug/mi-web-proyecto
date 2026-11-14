/**
 * Los tipos del contenido y de los bancos de la academia (solo servidor).
 * - El contenido de cada lección (server/academia/contenido/) se manda por API; los versículos se escriben solo con su
 *   referencia y el texto sale de la RV1960 de la web al pedir la lección (así ninguna cita queda mal copiada).
 * - Los bancos (server/academia/bancos/) tienen las respuestas y las claves de corrección: NUNCA se mandan enteros.
 */
import type { Bloom } from "@shared/academia";
import type { ClaveEscrita } from "../academia-correccion";

export type Bloque =
  | { t: "parrafo"; texto: string }
  | { t: "subtitulo"; texto: string }
  | { t: "lista"; items: string[] }
  | { t: "nota"; titulo?: string; texto: string }
  | { t: "versiculo"; ref: string }
  | { t: "video"; url: string; titulo: string; fuente: string; minutos?: number }
  | { t: "audio"; url: string; titulo: string }
  | { t: "imagen"; src: string; alt: string; pie?: string };

export type LeccionContenido = {
  id: string;
  /** Los objetivos de la lección (lo que el alumno podrá hacer al terminarla). */
  objetivos: string[];
  paraEmpezar: string;
  bloques: Bloque[];
  ideaClave: string;
  paraLaVida: { texto: string; pregunta: string };
};

/** Una pregunta objetiva: la buena, 3 falsas, la explicación y la cita (se muestran después de responder). */
export type PreguntaObjetiva = {
  id: string;
  /** Lección de la materia (1, 2, 3…): el examen sale repartido por lecciones. */
  leccion: number;
  /** El objetivo del sílabo que mide (tabla de especificaciones). */
  objetivo: string;
  bloom: Bloom;
  texto: string;
  correcta: string;
  falsas: [string, string, string];
  explica: string;
  ref: string;
};

export type BancoMateria = {
  materia: string;
  /** Las preguntas de repaso de cada lección (por id de lección). */
  repaso: Record<string, PreguntaObjetiva[]>;
  /** El banco del examen final (3 veces el examen como mínimo). */
  final: PreguntaObjetiva[];
  /** Las preguntas escritas del examen final, con su clave de corrección. */
  escritas: ClaveEscrita[];
  /**
   * Las mini pruebas (Nivel 2 en adelante): por número, 18 preguntas de su grupo de lecciones (6 por intento). Su
   * grupo sale de `miniPruebasDe` (shared/academia.ts).
   */
  mini?: Record<number, PreguntaObjetiva[]>;
  /** El escrito breve de la materia (Nivel 2 en adelante): de 80 a 300 palabras, con su clave de corrección. */
  breve?: ClaveEscrita;
};
