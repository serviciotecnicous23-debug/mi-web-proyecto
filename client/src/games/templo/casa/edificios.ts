/**
 * La escuela de los profetas y el palacio del rey por dentro (Jerusalén en línea): se entra por su
 * puerta en la ciudad y se camina por sus salas con el mismo motor de la casa por dentro
 * (casa/mundo-casa.ts). Cada edificio tiene su maestro que recibe (Isaías y Eliaquim), sus personas
 * trabajando y sus estaciones: círculos donde se hace cada servicio, con su nombre a la vista.
 *
 * «Los hijos de los profetas dijeron a Eliseo: He aquí, el lugar en que moramos contigo nos es
 * estrecho.» (2 Reyes 6:1) · «…salió a ellos Eliaquim hijo de Hilcías, mayordomo, y Sebna escriba…»
 * (2 Reyes 18:18)
 */
import type { Camino } from "@shared/caminos";
import type { Abertura, Colocado, Plano } from "@shared/casa-interior";
import type { Pose } from "../three/characters";
import type { Line } from "../data";

export type EdificioId = "escuela" | "palacio";

export type EstacionDef = {
  id: string;
  nombre: string;
  icono: string;
  /** Celda (puede tener decimales) donde va el círculo. */
  x: number;
  z: number;
  color: string;
  /** «camino»: solo para quien sirve en el camino del edificio; «otros»: solo para los demás. */
  para?: "camino" | "otros";
  /** Lo que se dice al acercarse. */
  ayuda: string;
};

export type PersonaDef = {
  nombre?: string;
  x: number;
  z: number;
  /** Hacia dónde mira: 0 = sur (hacia la puerta), Math.PI = norte. */
  yaw: number;
  pose: Pose;
  variante: "hombre" | "mujer" | "anciano" | "nino" | "noble";
  manto: string;
  cabeza?: string;
  /** Se inclina y vuelve (trabaja). */
  trabaja?: boolean;
  /** Altura del asiento (el rey en su trono). */
  alto?: number;
};

export type EdificioDef = {
  id: EdificioId;
  nombre: string;
  icono: string;
  /** El camino que sirve en este edificio. */
  camino: Camino;
  estilo: "adobe" | "piedra";
  maestro: string;
  plano: Plano;
  piezas: Colocado[];
  personas: PersonaDef[];
  estaciones: EstacionDef[];
  saludo: (nombre: string, camino: Camino) => string;
};

const puertaS = (x: number, z: number): Abertura[] => [
  { x, z, lado: "S", piso: 0 },
  { x: x + 1, z, lado: "S", piso: 0 },
];
const paso = (x: number, z: number, lado: Abertura["lado"], n = 2): Abertura[] =>
  Array.from({ length: n }, (_, i) => (lado === "N" || lado === "S" ? { x: x + i, z, lado, piso: 0 as const } : { x, z: z + i, lado, piso: 0 as const }));
const p = (m: string, x: number, z: number, r: 0 | 1 | 2 | 3 = 0): Colocado => ({ m, x, z, r, p: 0 });

// ---------------------------------------------------------------- la escuela de los profetas
export const ESCUELA: EdificioDef = {
  id: "escuela",
  nombre: "La escuela de los profetas",
  icono: "📜",
  camino: "profecia",
  estilo: "adobe",
  maestro: "Isaías",
  plano: {
    W: 20,
    D: 14,
    cuartos: [
      { id: "aula", nombre: "El aula de Isaías", x: 0, z: 0, w: 12, d: 8, piso: 0 },
      { id: "rollos", nombre: "La sala de los rollos", x: 12, z: 0, w: 8, d: 8, piso: 0 },
      { id: "entrada", nombre: "La entrada", x: 4, z: 8, w: 8, d: 6, piso: 0 },
      { id: "patio", nombre: "El patio de la olla", x: 12, z: 8, w: 8, d: 6, piso: 0, cielo: true },
    ],
    aberturas: [...paso(7, 7, "S"), ...paso(11, 3, "E"), ...paso(11, 10, "E"), ...paso(15, 7, "S"), ...puertaS(7, 13)],
    puerta: [7, 13],
    horno: [19, 8],
    arbol: [13, 12],
    maxMuebles: 80,
  },
  piezas: [
    // el aula: el atril de Isaías, la alfombra y los bancos de los alumnos
    p("atril", 6, 1),
    p("alfombra", 6, 2),
    p("banco-cedro", 1, 4),
    p("banco-cedro", 3, 4),
    p("banco-cedro", 1, 6),
    p("banco-cedro", 3, 6),
    p("banco-cedro", 9, 5),
    p("candelero", 0, 0),
    p("candelero", 11, 0),
    p("brasero", 0, 7),
    p("estera", 9, 1),
    // la sala de los rollos
    p("estante", 12, 0),
    p("estante", 14, 0),
    p("estante", 16, 0),
    p("estante", 18, 0),
    p("mesa", 13, 4),
    p("cojines", 13, 5),
    p("mesa", 17, 4),
    p("cojines", 18, 5),
    p("lampara-casa", 19, 3),
    // la entrada: la tinaja para lavarse los pies y la mesa de los mensajes
    p("tinaja", 4, 8),
    p("mesa", 9, 9),
    p("cesta", 11, 9),
    p("planta", 11, 13),
    p("banco-cedro", 4, 11, 1),
    // el patio: la olla grande (2 Reyes 4:38)
    p("olla", 16, 11),
    p("vasijas", 18, 8),
    p("cesta", 19, 12),
    p("banco-cedro", 17, 13),
  ],
  personas: [
    { nombre: "Isaías", x: 6.5, z: 0.55, yaw: 0, pose: "idle", variante: "anciano", manto: "#4a3b6a", cabeza: "#e8dcc0" },
    { x: 1.5, z: 4.5, yaw: Math.PI, pose: "sit", variante: "hombre", manto: "#8a7a5a" },
    { x: 3.6, z: 4.5, yaw: Math.PI, pose: "sit", variante: "hombre", manto: "#7a6a4a" },
    { x: 2.4, z: 6.5, yaw: Math.PI, pose: "sit", variante: "nino", manto: "#9a8a6a" },
    { x: 4.2, z: 6.5, yaw: Math.PI, pose: "sit", variante: "hombre", manto: "#6a5a3a" },
    { x: 10.2, z: 5.5, yaw: Math.PI, pose: "sit", variante: "hombre", manto: "#8a6a4a" },
    { x: 13.5, z: 5.5, yaw: Math.PI, pose: "sit", variante: "hombre", manto: "#7a6a4a" },
    { x: 15.2, z: 1.0, yaw: Math.PI, pose: "idle", variante: "anciano", manto: "#6a5a7a" },
    { nombre: "Un hijo de los profetas", x: 10.0, z: 8.45, yaw: 0, pose: "idle", variante: "hombre", manto: "#8a7a5a" },
    { x: 16.5, z: 12.3, yaw: Math.PI, pose: "bow", variante: "mujer", manto: "#9a6a3a", trabaja: true },
  ],
  estaciones: [
    { id: "memoria", nombre: "Memorizar con Isaías", icono: "📖", x: 6.5, z: 2.9, color: "#8fe08a", para: "camino", ayuda: "Isaías te enseña a guardar la Palabra: párate en el círculo frente a su atril." },
    { id: "maestro", nombre: "Hablar con Isaías", icono: "💬", x: 6.5, z: 2.9, color: "#8fe08a", para: "otros", ayuda: "Isaías recibe a quien viene a aprender." },
    { id: "rollos", nombre: "Estudios y exámenes", icono: "🎓", x: 15.0, z: 2.2, color: "#ffd166", ayuda: "Los rollos de los estudios: lee cada sección, practica y da el examen." },
    { id: "discernir", nombre: "Discernir con las Escrituras", icono: "🔎", x: 18.0, z: 6.6, color: "#9ad0ff", para: "camino", ayuda: "Escucha lo que dicen y examínalo con las Escrituras (1 Juan 4:1)." },
    { id: "mensaje", nombre: "Tomar un mensaje", icono: "✉️", x: 10.0, z: 10.7, color: "#ffb36b", para: "camino", ayuda: "Toma un mensaje de ánimo y llévalo a la casa marcada: la flecha te guía." },
  ],
  saludo: (nombre, camino) =>
    camino === "profecia"
      ? `Isaías: «Bienvenido, ${nombre}. Aquí aprendemos a escuchar a Dios. En mi atril memorizamos la Palabra; en la sala de los rollos están los estudios y el discernimiento; en la entrada se toman los mensajes para el pueblo.»`
      : `Isaías: «Bienvenido, ${nombre}. Aquí estudian los hijos de los profetas. Los rollos de los estudios están en la sala del este: puedes estudiar y dar los exámenes.»`,
};

// ---------------------------------------------------------------- el palacio del rey (1 Reyes 7:1-12)
export const PALACIO: EdificioDef = {
  id: "palacio",
  nombre: "El palacio del rey",
  icono: "👑",
  camino: "realeza",
  estilo: "piedra",
  maestro: "Eliaquim",
  plano: {
    W: 22,
    D: 16,
    cuartos: [
      { id: "escribas", nombre: "La sala de los escribas", x: 0, z: 0, w: 4, d: 8, piso: 0 },
      { id: "juicio", nombre: "El pórtico del juicio", x: 4, z: 0, w: 14, d: 11, piso: 0 },
      { id: "despensa", nombre: "La despensa del pan", x: 18, z: 0, w: 4, d: 8, piso: 0 },
      { id: "portico", nombre: "El pórtico de columnas", x: 6, z: 11, w: 10, d: 5, piso: 0 },
    ],
    aberturas: [...paso(10, 10, "S"), ...paso(4, 3, "O"), ...paso(17, 3, "E"), ...puertaS(10, 15)],
    puerta: [10, 15],
    horno: [21, 7],
    maxMuebles: 80,
  },
  piezas: [
    // el pórtico del juicio: el trono, la alfombra hasta la puerta y las columnas de cedro (1 Reyes 7:7)
    p("trono", 10, 0),
    p("alfombra", 10, 2),
    p("alfombra", 10, 4),
    p("alfombra", 10, 6),
    p("alfombra", 10, 8),
    p("columna", 6, 2),
    p("columna", 6, 5),
    p("columna", 6, 8),
    p("columna", 15, 2),
    p("columna", 15, 5),
    p("columna", 15, 8),
    p("candelero", 4, 0),
    p("candelero", 17, 0),
    p("brasero", 4, 10),
    p("brasero", 17, 10),
    p("banco-cedro", 7, 9),
    // el pórtico de columnas, a la entrada (1 Reyes 7:6)
    p("columna", 7, 12),
    p("columna", 14, 12),
    p("planta", 6, 15),
    p("planta", 15, 15),
    // la despensa del pan
    p("mesa-pan", 19, 1),
    p("cesta", 21, 1),
    p("vasijas", 18, 0),
    p("tinaja", 21, 4),
    p("cesta", 18, 6),
    // la sala de los escribas
    p("pupitre", 1, 3),
    p("estante", 0, 0),
    p("estante", 2, 0),
    p("lampara-casa", 3, 7),
    p("arcon", 0, 7),
  ],
  personas: [
    { nombre: "El rey Ezequías", x: 11, z: 0.95, yaw: 0, pose: "sit", variante: "noble", manto: "#5b2a6e", cabeza: "#e2b33c", alto: 0.55 },
    { nombre: "Eliaquim, mayordomo", x: 12.9, z: 2.6, yaw: -0.5, pose: "idle", variante: "noble", manto: "#27468f", cabeza: "#e8dcc0" },
    { x: 9.2, z: 14.3, yaw: 0, pose: "idle", variante: "hombre", manto: "#7a2f2f", cabeza: "#5b3a2a" },
    { x: 12.8, z: 14.3, yaw: 0, pose: "idle", variante: "hombre", manto: "#7a2f2f", cabeza: "#5b3a2a" },
    // el pueblo que espera ser oído
    { x: 8.4, z: 5.6, yaw: Math.PI / 2, pose: "idle", variante: "mujer", manto: "#8a4a5a" },
    { x: 8.4, z: 6.6, yaw: Math.PI / 2, pose: "idle", variante: "anciano", manto: "#6a7a4a" },
    { x: 8.4, z: 7.6, yaw: Math.PI / 2, pose: "idle", variante: "hombre", manto: "#9a6a3a" },
    { x: 7.6, z: 9.5, yaw: Math.PI, pose: "sit", variante: "nino", manto: "#5a6a8a" },
    // el panadero y el escriba
    { x: 19.9, z: 2.4, yaw: Math.PI, pose: "bow", variante: "hombre", manto: "#9a8a6a", trabaja: true },
    { nombre: "Sebna, el escriba", x: 2.0, z: 4.45, yaw: Math.PI, pose: "sit", variante: "anciano", manto: "#5a5a6a" },
  ],
  estaciones: [
    { id: "audiencia", nombre: "Atender una audiencia", icono: "⚖️", x: 11, z: 4.0, color: "#c9a8f0", para: "camino", ayuda: "El rey oye al pueblo: atiende cada caso con verdad y misericordia." },
    { id: "maestro", nombre: "Hablar con Eliaquim", icono: "💬", x: 12.9, z: 4.2, color: "#c9a8f0", para: "otros", ayuda: "Eliaquim, el mayordomo, recibe a quien entra al palacio." },
    { id: "pan", nombre: "Tomar pan para los pobres", icono: "🍞", x: 20.0, z: 3.5, color: "#ffd166", para: "camino", ayuda: "Toma pan y repártelo a los pobres de la ciudad (hasta 3 a la vez)." },
    { id: "ley", nombre: "Copiar la ley", icono: "📜", x: 2.0, z: 5.7, color: "#9ad0ff", para: "camino", ayuda: "Junto a Sebna, el escriba, se copia la ley con cuidado (Deuteronomio 17:18)." },
  ],
  saludo: (nombre, camino) =>
    camino === "realeza"
      ? `Eliaquim: «Bienvenido al palacio, ${nombre}. Junto al trono se atienden las audiencias; en la despensa del este se toma el pan para los pobres; en la sala de los escribas, al oeste, se copia la ley.»`
      : `Eliaquim: «Bienvenido al palacio del rey Ezequías, ${nombre}. Aquí sirven los siervos del rey. Si quieres servir al rey, crea un siervo del rey en la sala de Jerusalén.»`,
};

export const EDIFICIOS: Record<EdificioId, EdificioDef> = { escuela: ESCUELA, palacio: PALACIO };

/** Lo que dice el maestro a quien visita sin ser de su camino (lo orienta y lo invita). */
export function dialogoVisita(e: EdificioDef, nombre: string): Line[] {
  if (e.id === "escuela")
    return [
      { quien: "isaias", texto: `Bienvenido, ${nombre}. En esta escuela los hijos de los profetas aprenden a escuchar a Dios, a guardar su Palabra y a llevarla al pueblo con amor.` },
      { quien: "isaias", texto: "Los rollos de los estudios son para todos: entra a la sala del este, lee cada sección, practica y da el examen. Lo que apruebes vale para todos tus personajes." },
      { quien: "isaias", texto: "Y si Dios te llama a servir como profeta, crea un hijo de los profetas en la sala de Jerusalén. «Heme aquí, envíame a mí.»", ref: "Isaías 6:8" },
    ];
  return [
    { quien: "eliaquim", texto: `Bienvenido al palacio del rey Ezequías, ${nombre}. Junto al trono se atienden las audiencias del pueblo; en la despensa se prepara el pan para los pobres; en la sala de los escribas se copia la ley.` },
    { quien: "eliaquim", texto: "Esos servicios son de los siervos del rey. Si quieres servir aquí, crea un siervo del rey en la sala de Jerusalén." },
    { quien: "eliaquim", texto: "Recuerda lo que guarda al rey: «Misericordia y verdad guardan al rey, Y con clemencia se sustenta su trono.»", ref: "Proverbios 20:28" },
  ];
}

/** Las estaciones que ve cada uno según su camino. */
export function estacionesPara(e: EdificioDef, camino: Camino): EstacionDef[] {
  return e.estaciones.filter((s) => !s.para || (s.para === "camino") === (camino === e.camino));
}

/**
 * La estación que toca ahora en los primeros pasos del camino (para resaltarla), o «salir» si lo que
 * sigue es afuera (orar en el monte, entregar el mensaje o repartir el pan). null si no hay guía.
 */
export function siguienteEstacion(e: EdificioDef, camino: Camino, o: { pasos: number; llevaMensaje: boolean; panes: number }): string | null {
  if (camino !== e.camino) return null;
  if (o.llevaMensaje || o.panes > 0) return "salir";
  if (o.pasos >= 3) return null;
  if (camino === "profecia") return o.pasos === 0 ? "memoria" : o.pasos === 1 ? "salir" : "mensaje";
  return o.pasos === 0 ? "audiencia" : o.pasos === 1 ? "pan" : "ley";
}
