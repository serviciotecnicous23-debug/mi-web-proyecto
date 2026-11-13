/**
 * El aula de cada edificio de Jerusalén en línea: donde de verdad se da la clase. La escuela de los profetas con
 * Isaías (y Miqueas de Moreset para los oficios del profeta), la cámara de los sacerdotes con Eleazar y la sala de
 * los escribas del palacio con Eliaquim. Aquí está lo que comparten la pantalla y las pruebas: quién enseña,
 * quiénes son los compañeros (cada uno con su nombre), lo que dice el maestro y cuánto dura el reloj de cada
 * pregunta. Las preguntas de los exámenes y sus respuestas siguen SOLO en el servidor: el aula solo muestra.
 *
 * «Oirá el sabio, y aumentará el saber, Y el entendido adquirirá consejo,» (Proverbios 1:5)
 */
import type { CatedraArea } from "./catedras";
import type { Camino } from "./caminos";
import type { CaminoEstudio } from "./estudios";

export type AulaId = "escuela" | "camara" | "palacio";
export const AULAS_LISTA: AulaId[] = ["escuela", "camara", "palacio"];

/** Quién enseña (los mismos retratos y colores que en los edificios). */
export type MaestroId = "isaias" | "miqueas" | "eleazar" | "eliaquim";

export type MaestroAula = {
  id: MaestroId;
  nombre: string;
  /** Cómo lo presenta el aula. */
  titulo: string;
  variante: "anciano" | "noble";
  manto: string;
  cabeza: string;
  /** La franja del manto. */
  acento: string;
};

/** Un compañero de clase: gente del juego con su nombre (las familias del pueblo y los aprendices). */
export type Companero = {
  nombre: string;
  /** Lo que hace (se ve en su etiqueta al tocarlo y en lo que dice). */
  quien: string;
  variante: "hombre" | "mujer" | "anciano" | "nino" | "levita" | "noble";
  manto: string;
  acento: string;
  cabeza: string;
};

export type AulaDef = {
  id: AulaId;
  nombre: string;
  /** Dónde queda (en la frase «en …»). */
  lugar: string;
  /** El edificio de la ciudad y el camino que sirve ahí. */
  camino: Camino;
  estilo: "adobe" | "piedra";
  maestro: MaestroAula;
  /** La cátedra de esta aula y quién la da (Miqueas en la escuela; en las otras, el mismo maestro). */
  catedra: { area: CatedraArea; maestro: MaestroAula };
  companeros: Companero[];
  /** El versículo pintado sobre el rollo grande. */
  verso: { text: string; ref: string };
  colores: { pared: string; piso: string; madera: string; tela: string; luz: string };
};

const ISAIAS: MaestroAula = { id: "isaias", nombre: "Isaías", titulo: "Isaías hijo de Amoz, profeta", variante: "anciano", manto: "#4a3b6a", cabeza: "#e8dcc0", acento: "#c9a23a" };
const MIQUEAS: MaestroAula = { id: "miqueas", nombre: "Miqueas", titulo: "Miqueas de Moreset, profeta", variante: "anciano", manto: "#6b4a2e", cabeza: "#d9d4cc", acento: "#b9801a" };
const ELEAZAR: MaestroAula = { id: "eleazar", nombre: "Eleazar", titulo: "Eleazar, anciano de los sacerdotes", variante: "anciano", manto: "#efe6d2", cabeza: "#f7f2e6", acento: "#2a4fbf" };
const ELIAQUIM: MaestroAula = { id: "eliaquim", nombre: "Eliaquim", titulo: "Eliaquim hijo de Hilcías, mayordomo del palacio", variante: "noble", manto: "#27468f", cabeza: "#e8dcc0", acento: "#e2b33c" };

export const MAESTROS: Record<MaestroId, MaestroAula> = { isaias: ISAIAS, miqueas: MIQUEAS, eleazar: ELEAZAR, eliaquim: ELIAQUIM };

export const AULAS: Record<AulaId, AulaDef> = {
  escuela: {
    id: "escuela",
    nombre: "El aula de Isaías",
    lugar: "la escuela de los profetas",
    camino: "profecia",
    estilo: "adobe",
    maestro: ISAIAS,
    catedra: { area: "oficios", maestro: MIQUEAS },
    companeros: [
      { nombre: "Miriam", quien: "la cantora", variante: "mujer", manto: "#8a4a5a", acento: "#c99a3b", cabeza: "#efe6d2" },
      { nombre: "Jabes", quien: "el que ora por su casa", variante: "hombre", manto: "#8a7a5a", acento: "#5b3a6e", cabeza: "#d8c8a6" },
      { nombre: "Ana", quien: "la tejedora", variante: "mujer", manto: "#3f5a7a", acento: "#d4c4a0", cabeza: "#e6dcc6" },
      { nombre: "Simeón", quien: "el anciano", variante: "anciano", manto: "#6a5a3a", acento: "#7a2f2f", cabeza: "#efe6d2" },
      { nombre: "Josías", quien: "el escriba", variante: "hombre", manto: "#7a6a4a", acento: "#2f4a7a", cabeza: "#b9a27a" },
      { nombre: "Débora", quien: "la que cuida las viñas", variante: "mujer", manto: "#5b3a6e", acento: "#c99a3b", cabeza: "#c9b07a" },
      { nombre: "Asaf", quien: "el músico", variante: "hombre", manto: "#4d6b2a", acento: "#d4c4a0", cabeza: "#d8c8a6" },
      { nombre: "Obed", quien: "el más joven de la escuela", variante: "nino", manto: "#9a8a6a", acento: "#a8442f", cabeza: "#e6dcc6" },
    ],
    verso: { text: "Jehová el Señor me dio lengua de sabios, para saber hablar palabras al cansado; despertará mañana tras mañana, despertará mi oído para que oiga como los sabios.", ref: "Isaías 50:4" },
    colores: { pared: "#c9a77a", piso: "#9a7a52", madera: "#6b4a2c", tela: "#5b3a6e", luz: "#ffd9a0" },
  },
  camara: {
    id: "camara",
    nombre: "La cátedra de Eleazar",
    lugar: "la cámara de los sacerdotes",
    camino: "sacerdocio",
    estilo: "piedra",
    maestro: ELEAZAR,
    catedra: { area: "sacerdotal", maestro: ELEAZAR },
    companeros: [
      { nombre: "Itamar", quien: "aprendiz del altar", variante: "levita", manto: "#efe6d2", acento: "#2a4fbf", cabeza: "#f7f2e6" },
      { nombre: "Elcana", quien: "levita de la puerta", variante: "levita", manto: "#e6dcc6", acento: "#7a2f2f", cabeza: "#1e4d8c" },
      { nombre: "Hanán", quien: "el que hace lámparas", variante: "hombre", manto: "#8a7a5a", acento: "#c99a3b", cabeza: "#d8c8a6" },
      { nombre: "Finees", quien: "aprendiz del santuario", variante: "levita", manto: "#f2ead8", acento: "#5b3a6e", cabeza: "#f7f2e6" },
      { nombre: "Ezer", quien: "el que hace canastas para los diezmos", variante: "hombre", manto: "#7a6a4a", acento: "#4d6b2a", cabeza: "#b9a27a" },
      { nombre: "Ahimaas", quien: "aprendiz de los panes", variante: "levita", manto: "#efe6d2", acento: "#c99a3b", cabeza: "#f7f2e6" },
      { nombre: "Abner", quien: "el que trae la leña del altar", variante: "hombre", manto: "#6a5a3a", acento: "#a8442f", cabeza: "#c9b07a" },
      { nombre: "Matán", quien: "el más joven de la cámara", variante: "nino", manto: "#e8e0cc", acento: "#2f4a7a", cabeza: "#efe6d2" },
    ],
    verso: { text: "Porque los labios del sacerdote han de guardar la sabiduría, y de su boca el pueblo buscará la ley; porque mensajero es de Jehová de los ejércitos.", ref: "Malaquías 2:7" },
    colores: { pared: "#d9cfba", piso: "#b5aa94", madera: "#7a5a3a", tela: "#2a4fbf", luz: "#fff0d0" },
  },
  palacio: {
    id: "palacio",
    nombre: "La sala de los escribas",
    lugar: "el palacio del rey",
    camino: "realeza",
    estilo: "piedra",
    maestro: ELIAQUIM,
    catedra: { area: "reyes", maestro: ELIAQUIM },
    companeros: [
      { nombre: "Joa", quien: "hijo de Asaf, canciller", variante: "noble", manto: "#2f4a7a", acento: "#c99a3b", cabeza: "#efe6d2" },
      { nombre: "Rebeca", quien: "la que hila lino", variante: "mujer", manto: "#7a1f3d", acento: "#d4c4a0", cabeza: "#e6dcc6" },
      { nombre: "Gedeón", quien: "el que trilla el trigo", variante: "hombre", manto: "#7a6a4a", acento: "#4d6b2a", cabeza: "#d8c8a6" },
      { nombre: "Raquel", quien: "la que hace aceite", variante: "mujer", manto: "#3b5a5a", acento: "#c99a3b", cabeza: "#c9b07a" },
      { nombre: "Booz", quien: "el que siembra cebada", variante: "noble", manto: "#5b3a6e", acento: "#d4c4a0", cabeza: "#efe6d2" },
      { nombre: "Tamar", quien: "la que hace pan dulce", variante: "mujer", manto: "#a8442f", acento: "#efe6d2", cabeza: "#e6dcc6" },
      { nombre: "Jonatán", quien: "el herrero", variante: "hombre", manto: "#5a5a6a", acento: "#a8442f", cabeza: "#b9a27a" },
      { nombre: "Isaí", quien: "el más joven de los escribas", variante: "nino", manto: "#2a3f7a", acento: "#e2b33c", cabeza: "#efe6d2" },
    ],
    verso: { text: "y lo tendrá consigo, y leerá en él todos los días de su vida, para que aprenda a temer a Jehová su Dios, para guardar todas las palabras de esta ley y estos estatutos, para ponerlos por obra;", ref: "Deuteronomio 17:19" },
    colores: { pared: "#cfc3ab", piso: "#8a6a4a", madera: "#5a3a22", tela: "#27468f", luz: "#ffe6b0" },
  },
};

/** El aula donde se estudia un estudio: el de su camino; los «para todos», en el aula del camino de quien estudia. */
export function aulaDeEstudio(camino: CaminoEstudio, delJugador: Camino): AulaId {
  const c: Camino = camino === "comun" ? delJugador : camino;
  return c === "sacerdocio" ? "camara" : c === "realeza" ? "palacio" : "escuela";
}

/** El aula de un camino (para sus exámenes y su cátedra). */
export function aulaDeCamino(c: Camino): AulaId {
  return c === "sacerdocio" ? "camara" : c === "realeza" ? "palacio" : "escuela";
}

/** El aula de una cátedra (la oración se da en el monte, no en un aula). */
export function aulaDeCatedra(area: CatedraArea): AulaId | null {
  return area === "sacerdotal" ? "camara" : area === "reyes" ? "palacio" : area === "oficios" ? "escuela" : null;
}

// ---------------------------------------------------------------- el reloj de cada pregunta (segundos)
/** La práctica de una sección: al acabarse, el maestro da una pista y vuelve a empezar. */
export const RELOJ_PRACTICA = 45;
/** El examen final de un estudio: al acabarse, la pregunta queda sin responder. */
export const RELOJ_EXAMEN = 60;
/** Una lección de una cátedra: al acabarse, se cuenta como no respondida. */
export const RELOJ_CATEDRA = 45;

// ---------------------------------------------------------------- lo que dice el maestro
/** Una frase de una lista, siempre la misma para la misma semilla (así no salta al volver a dibujar). */
export function frase(lista: readonly string[], semilla: number): string {
  if (!lista.length) return "";
  return lista[Math.abs(Math.floor(semilla)) % lista.length];
}

/** Pone el nombre de quien estudia en la frase («{n}»). */
export function conNombre(texto: string, nombre: string): string {
  return texto.split("{n}").join(nombre);
}

/** Lenguaje neutro: nada de «bienvenido» ni «atento»; siempre al estudiante por su nombre. */
export const FRASES = {
  llegada: [
    "Pasa, {n}, y toma asiento. Hoy aprendemos juntos.",
    "Qué bueno que viniste, {n}. Siéntate con los demás: vamos a empezar.",
    "{n}, tu lugar te espera en el primer banco. Abramos el rollo.",
  ],
  empezarSeccion: [
    "Escuchen bien: hoy estudiamos «{t}».",
    "Abran el rollo en «{t}». Lean conmigo.",
    "La lección de hoy se llama «{t}».",
  ],
  verso: ["Escuchen la Palabra:", "Así dice la Escritura:", "Lean conmigo:"],
  clave: ["Guarden esto en el corazón:", "Lo que no deben olvidar:", "La idea que lo une todo:"],
  aPreguntar: ["Ahora, a ver quién lo aprendió.", "Veamos qué guardaron.", "Les pregunto, y respondan con calma."],
  bien: ["¡Bien dicho, {n}!", "¡Así es, {n}!", "¡Exacto! Lo guardaste en el corazón.", "Muy bien, {n}: eso dice la Palabra.", "¡Correcto! Que todos lo escuchen."],
  mal: ["No es esa, {n}. Escucha otra vez:", "Casi. Mira lo que dice la Escritura:", "Todavía no. Fíjate bien:", "No te desanimes, {n}: volvamos a leer."],
  otraVez: ["Elige otra vez, con calma.", "Inténtalo de nuevo.", "Ahora sí: ¿cuál es?"],
  tiempoPractica: ["Se acabó el tiempo, pero no pasa nada: piénsalo otra vez.", "Tómate tu tiempo, {n}. Te doy otra oportunidad."],
  tiempo: ["Se acabó el tiempo.", "El reloj llegó al final."],
  anotado: ["Anotado. La siguiente.", "Queda escrita tu respuesta.", "Bien, sigamos.", "Lo escribo en tu tablilla."],
  revisar: ["Terminaron. Ahora revisemos juntos, una por una.", "Dejen las tablillas. Veamos cómo les fue."],
  suspenso: ["Y ahora la última… la que decide.", "Queda una sola. Que nadie hable.", "La última respuesta… escuchen todos."],
  aprobado: ["¡Aprobaste, {n}! Lo aprendido es tuyo para siempre.", "¡Lo lograste! La escuela entera se alegra contigo."],
  perfecto: ["¡Todas bien! Pocas veces se ve algo así.", "¡Perfecto, {n}! Ni una sola falla."],
  casi: ["Te faltó muy poco, {n}. Repasa y vuelve.", "Casi lo logras. Lee las correcciones y vuelve a intentarlo."],
  noAun: ["Todavía no, {n}. Volvamos a estudiar juntos y lo intentas otra vez.", "No te desanimes: el que estudia, aprende. Repasa y vuelve."],
  despedida: ["Ve en paz, {n}. Lo que aprendiste hoy, ponlo por obra.", "Hasta la próxima clase, {n}."],
};

/** Lo que dicen los compañeros (se ve sobre su cabeza: frases cortas y fijas). */
export const DICEN = {
  bien: ["¡Bien!", "¡Eso es!", "¡Amén!", "¡Sí!", "¡Muy bien!"],
  mal: ["Ay…", "Casi…", "Uy…", "¡Ánimo!"],
  piensan: ["Mmm…", "¿Cuál será?", "Yo sé…", "Déjame pensar…"],
  suspenso: ["¡Shhh!", "…", "¡Ay, ay!"],
  aprobado: ["¡Felicidades!", "¡Bien hecho!", "¡Gloria a Dios!", "¡Lo lograste!"],
};

/** La medalla de una nota: oro (todas), plata (aprobado), bronce (le faltó una) o ninguna. */
export function medallaDeNota(aciertos: number, de: number, aprueba: number): 0 | 1 | 2 | 3 {
  if (de <= 0) return 0;
  if (aciertos >= de) return 3;
  if (aciertos >= aprueba) return 2;
  if (aciertos >= aprueba - 1) return 1;
  return 0;
}

/**
 * La enseñanza partida en burbujas: cada párrafo de la lectura, cada versículo y la idea clave (de 3 a 5 en
 * total). Si hay muchos párrafos, se juntan de a dos para no pasar de cinco.
 */
export function burbujasDeSeccion(s: { titulo: string; lectura: string[]; versos: { text: string; ref: string }[]; clave: string }): { tipo: "lectura" | "verso" | "clave"; texto: string; ref?: string }[] {
  const lect = [...s.lectura];
  const versos = s.versos.slice(0, 2);
  // cuánto cabe de lectura: 5 burbujas menos los versos y la idea clave (al menos una)
  const cabe = Math.max(1, 5 - versos.length - 1);
  while (lect.length > cabe) {
    const a = lect.pop()!;
    lect[lect.length - 1] = `${lect[lect.length - 1]} ${a}`;
  }
  const out: { tipo: "lectura" | "verso" | "clave"; texto: string; ref?: string }[] = lect.map((t) => ({ tipo: "lectura" as const, texto: t }));
  // el primer versículo va después del primer párrafo; el segundo, antes de la idea clave
  versos.forEach((v, i) => out.splice(i === 0 ? Math.min(1, out.length) : out.length, 0, { tipo: "verso", texto: v.text, ref: v.ref }));
  out.push({ tipo: "clave", texto: s.clave });
  return out;
}

/** La enseñanza corta de una cátedra partida en burbujas (por oraciones, de 1 a 3). */
export function burbujasDeTexto(texto: string, max = 3): string[] {
  // se corta donde termina una oración (. ! ? y, si hay, el cierre de la cita) y empieza otra con mayúscula
  const partes: string[] = [];
  let desde = 0;
  for (let i = 0; i < texto.length; i++) {
    if (!".!?".includes(texto[i])) continue;
    let j = i + 1;
    while (j < texto.length && "»\")".includes(texto[j])) j++;
    if (j >= texto.length || texto[j] !== " ") continue;
    let k = j;
    while (k < texto.length && texto[k] === " ") k++;
    if (k < texto.length && /[A-ZÁÉÍÓÚÑ¿¡«]/.test(texto[k])) {
      partes.push(texto.slice(desde, j).trim());
      desde = k;
      i = k - 1;
    }
  }
  if (desde < texto.length) partes.push(texto.slice(desde).trim());
  const out = partes.filter(Boolean);
  while (out.length > max) {
    const a = out.pop()!;
    out[out.length - 1] = `${out[out.length - 1]} ${a}`;
  }
  return out.length ? out : [texto];
}
