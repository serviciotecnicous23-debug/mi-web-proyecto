/**
 * Cómo se escribe la práctica de cada lección (solo servidor: aquí están las respuestas). Guía completa en
 * docs/academia-practicas.md, «Cómo se escribe una práctica».
 *
 * Una práctica es una lista de ACTIVIDADES. Cada actividad:
 * - practica UN objetivo de la lección (`objetivo` es su número en `objetivos` del contenido, desde 0);
 * - usa UNA pieza (tarjetas, completa, relaciona…);
 * - trae DOS VERSIONES o más con la misma idea y otras palabras: la guiada usa una y la que cuenta y los repasos, otras;
 * - en cada versión, `apoyo` copia TEXTUAL una frase de la lección (de su texto, su idea clave o «Para la vida»): el
 *   motor comprueba que esté y la muestra al corregir («Lo dice la lección»). Nada se pregunta si la lección no lo dice.
 * Las comillas « » se usan solo para citar la Biblia RV1960 al pie de la letra; lo demás va sin comillas.
 */
import type { ClaveEscrita } from "../../academia-correccion";

/** Lo que llevan casi todas las versiones: la frase de la lección, la cita bíblica (si hay) y la explicación general. */
export type Base = {
  /** Una frase copiada tal cual de la lección (el motor comprueba que esté). */
  apoyo: string;
  /** La cita bíblica que sostiene la respuesta («Juan 1:12-13»). */
  ref?: string;
  /** Por qué la respuesta es esa, en una o dos frases. */
  explica: string;
};

/** 3 a 5 tarjetas: la pregunta, la respuesta y su frase de la lección. Solo para aprender (no cuentan). */
export type VersionTarjetas = { tarjetas: { frente: string; reverso: string; apoyo: string }[] };

/**
 * Un texto con 2 a 4 huecos entre [[ ]] («Pedro confesó que Jesús es el [[Cristo]]»), más 2 a 4 palabras que no van.
 * `errores` explica las equivocaciones típicas: la palabra que no va → por qué no.
 */
export type VersionCompleta = Base & { consigna?: string; texto: string; distractores: string[]; errores?: Record<string, string> };

/** 3 a 5 pares (idea → lo que le corresponde). */
export type VersionRelaciona = Base & { consigna?: string; pares: [string, string][] };

/** 2 o 3 grupos y 4 a 8 frases, cada una con su grupo (desde 0) y, si hace falta, por qué va ahí. */
export type VersionClasifica = Base & { consigna?: string; grupos: string[]; frases: { texto: string; grupo: number; explica?: string }[] };

/** 3 a 6 pasos en su orden correcto (se muestran mezclados). */
export type VersionOrdena = Base & { consigna: string; pasos: string[] };

/** 2 a 4 afirmaciones, cada una verdadera o errada, con su explicación y su frase de la lección (se responden de a una). */
export type VersionVerdad = { consigna?: string; afirmaciones: { texto: string; verdad: boolean; explica: string; apoyo: string; ref?: string }[] };

/** 3 a 5 frases seguidas; una (`malo`, desde 0) tiene un error. `correccion` dice cómo debería decir. */
export type VersionError = Base & { consigna?: string; frases: string[]; malo: number; correccion: string };

/** Un caso de la vida diaria con 3 o 4 opciones; una sola es la buena (`bien: true`) y cada opción explica por qué. */
export type VersionSituacion = Base & { caso: string; pregunta: string; opciones: { texto: string; bien?: boolean; explica: string }[] };

/** Una pregunta para responder con sus palabras (15 a 60 palabras), corregida con su clave (tipo «corta»). */
export type VersionExplica = { apoyo: string; ref?: string; clave: ClaveEscrita };

/** 4 a 7 hechos en su orden en el tiempo, cada uno con su fecha o época (se muestran al corregir). */
export type VersionLinea = Base & { consigna: string; eventos: { texto: string; fecha: string }[] };

/**
 * 3 a 6 ideas puestas en un lienzo (x e y de 0 a 100) y 2 a 6 enlaces; el alumno elige la relación de cada enlace
 * entre las de todos los enlaces y los `distractores`.
 */
export type VersionMapaIdeas = Base & {
  consigna?: string;
  nodos: { id: string; texto: string; x: number; y: number }[];
  enlaces: { de: string; a: string; relacion: string }[];
  distractores?: string[];
};

/** Una imagen (un mapa) y 2 a 5 lugares para tocar: x e y en porcentaje de la imagen y el radio que se acepta. */
export type VersionMapa = Base & { consigna?: string; imagen: string; alt: string; lugares: { nombre: string; x: number; y: number; radio?: number; explica?: string }[] };

/** Un pasaje (RV1960, al pie de la letra) con las palabras que hay que tocar entre [[ ]]. */
export type VersionPasaje = Base & { ref: string; consigna: string; texto: string };

/** Un escenario con escenas: cada opción vale 0 (inadecuada), 1 (aceptable) o 2 (la mejor) y puede llevar a otra escena. */
export type VersionEscenario = {
  apoyo: string;
  ref?: string;
  situacion: string;
  escenas: { id: string; narra: string; pregunta: string; opciones: { texto: string; valor: 0 | 1 | 2; explica: string; siguiente?: string }[] }[];
};

/** Un caso para leer y responder por pasos (elegir o escribir). */
export type VersionCaso = {
  apoyo: string;
  ref?: string;
  titulo: string;
  relato: string[];
  pasos: (({ tipo: "situacion" } & Omit<VersionSituacion, "caso">) | ({ tipo: "explica" } & VersionExplica))[];
};

type ConPieza<P extends string, V> = { id: string; objetivo: number; pieza: P; versiones: V[] };

export type Actividad =
  | ConPieza<"tarjetas", VersionTarjetas>
  | ConPieza<"completa", VersionCompleta>
  | ConPieza<"relaciona", VersionRelaciona>
  | ConPieza<"clasifica", VersionClasifica>
  | ConPieza<"ordena", VersionOrdena>
  | ConPieza<"verdad", VersionVerdad>
  | ConPieza<"error", VersionError>
  | ConPieza<"situacion", VersionSituacion>
  | ConPieza<"explica", VersionExplica>
  | ConPieza<"linea", VersionLinea>
  | ConPieza<"mapa-ideas", VersionMapaIdeas>
  | ConPieza<"mapa", VersionMapa>
  | ConPieza<"pasaje", VersionPasaje>
  | ConPieza<"escenario", VersionEscenario>
  | ConPieza<"caso", VersionCaso>;

export type Version = Actividad["versiones"][number];

/** Las prácticas de una materia: por lección, sus actividades; y, si se quiere, el texto de su misión. */
export type PracticasMateria = {
  materia: string;
  lecciones: Record<string, Actividad[]>;
  mision?: { titulo: string; intro: string; cierre: string };
};
