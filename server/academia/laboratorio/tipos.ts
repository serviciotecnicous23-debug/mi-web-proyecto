/**
 * Cómo se escribe una práctica del laboratorio ministerial (shared/laboratorio.ts tiene las reglas de la nota). Solo
 * en el servidor: los puntos de cada opción y el camino ejemplar no llegan al navegador hasta que el alumno responde.
 *
 * Cada escena (o ronda para ordenar) mide una sola competencia y vale hasta MAX_PASO puntos. La opción ejemplar vale
 * MAX_PASO; las demás, menos. Una opción con «critica» es una acción crítica: lo que la lección dice que nunca se hace
 * porque pone en peligro a la persona. Los textos no llevan comillas angulares (se reservan para la RV1960).
 */
import type { FormatoPractica } from "@shared/laboratorio";

export const MAX_PASO = 2;

export type MedidorDef = {
  id: string;
  nombre: string;
  inicial: number;
  /** Qué mide, en una frase (se lee al pasar por el medidor). */
  explica: string;
};

export type CompetenciaDef = {
  id: string;
  nombre: string;
  /** De dónde sale: «lección 2», «lecciones 5 y 6». */
  leccion: string;
  /** Su peso en la nota de la práctica; los pesos de una práctica suman 100. */
  peso: number;
};

export type OpcionDef = {
  texto: string;
  puntos: number;
  /** Lo que pasa después de elegirla. */
  pasa: string;
  /** Lo que responde la otra persona (en una conversación, su respuesta). */
  responde?: string;
  /** Por qué estuvo bien o qué faltó, con la lección (se usa también en la conversación de cierre). */
  explica: string;
  ejemplar?: true;
  /** Acción crítica: por qué pone en peligro a la persona. */
  critica?: string;
  /** Cuánto cambian los medidores (por id). */
  efectos?: Record<string, number>;
};

export type EscenaDef = {
  id: string;
  titulo: string;
  competencia: string;
  narra: string[];
  /** Una frase más según lo que eligió antes: si eligió la ejemplar en esa escena, «si»; si no, «no». */
  segun?: { escena: string; si: string; no: string };
  /** Quién habla y lo que dice (en una conversación, cada escena es un turno). */
  quien?: string;
  dice?: string;
  /** La pregunta para elegir (por defecto, ¿qué haces?). */
  pregunta?: string;
  opciones: OpcionDef[];
  /** Para el camino ejemplar del final. */
  camino: { titulo: string; porque: string };
};

export type OpcionOrdenDef = {
  texto: string;
  /** Por qué va en ese lugar. */
  porque: string;
  /** Ponerla primero es una acción crítica. */
  critica?: string;
};

export type RondaDef = {
  id: string;
  titulo: string;
  competencia: string;
  situacion: string;
  pregunta: string;
  /** En el orden de quien sabe: de la más apropiada a la menos apropiada (el servidor las mezcla al mostrarlas). */
  opciones: OpcionOrdenDef[];
  camino: { titulo: string; porque: string };
};

export type PracticaDef = {
  id: string;
  materia: string;
  titulo: string;
  formato: FormatoPractica;
  rol: string;
  situacion: string;
  objetivo: string;
  minutos: number;
  /** Las lecciones de la materia (desde 1) en que se basa: hay que terminarlas antes. */
  lecciones: number[];
  /** Lo que conviene tener presente antes de empezar (la preparación). */
  antes: string[];
  /** Un pasaje para leer antes («Lucas 19:1-10»): se enlaza a la Biblioteca. */
  lectura?: string;
  /** La pregunta de «Lo que me llevo» en la conversación de cierre. */
  cierre: string;
  medidores?: MedidorDef[];
  competencias: CompetenciaDef[];
  escenas?: EscenaDef[];
  /** Otras versiones del caso: cada intento trae la siguiente. Sus escenas reemplazan a las del mismo id. */
  variantes?: { id: string; nombre: string; escenas: EscenaDef[] }[];
  rondas?: RondaDef[];
};
