/**
 * La gran restauración de Jerusalén (el motor del juego: estudio del 11 de noviembre de 2026). La escuela de los
 * profetas, el palacio del rey y la cámara de los sacerdotes crecieron: cada uno tiene tres salas nuevas que están en
 * ruinas para cada persona. Se restauran con trabajos que se hacen adentro (pararse en el círculo unos segundos, como
 * el servicio del templo); cada trabajo va quitando escombros y poniendo lo restaurado. La primera sala del edificio
 * de tu camino es el tutorial del primer día. Al terminar una sala: gozo, mérito, su sello en el libro de la
 * restauración, la gente que vuelve a trabajar ahí y algo nuevo que hacer cada día.
 *
 * «Los hijos de los profetas dijeron a Eliseo: He aquí, el lugar en que moramos contigo nos es estrecho.» (2 Reyes 6:1)
 * El servidor lleva la cuenta (server/restauracion.ts): decide y comprueba, no simula.
 */
import type { Colocado } from "./casa-interior";
import type { Verso } from "./ciudad";

export type EdificioRestauracion = "escuela" | "palacio" | "camara";

export type TrabajoDef = {
  id: string;
  nombre: string;
  icono: string;
  /** Cuántas veces se hace. */
  veces: number;
  /** Segundos parado en el círculo para cada vez. */
  segundos: number;
  /** Celda del círculo (en el plano del edificio). */
  x: number;
  z: number;
  /** Lo que se va quitando (en orden) y lo que se va poniendo, a medida que se hace. */
  quita: Colocado[];
  pone: Colocado[];
};

export type SalaDef = {
  id: string;
  edificio: EdificioRestauracion;
  /** El cuarto del plano (casa/edificios.ts). */
  cuarto: string;
  nombre: string;
  /** 1, 2, 3: en ese orden dentro del edificio. */
  orden: number;
  icono: string;
  /** Por qué está en ruinas y para qué servirá (palabras propias). */
  historia: string;
  verso: Verso;
  /** Quien la encarga (el maestro del edificio). */
  quien: "isaias" | "eliaquim" | "eleazar";
  trabajos: TrabajoDef[];
  /** Lo que se pone cuando queda restaurada (además de lo que pusieron los trabajos). */
  extra: Colocado[];
  /** La gente que vuelve a trabajar ahí. */
  personas: { x: number; z: number; yaw: number; pose: "idle" | "sit" | "bow" | "kneel" | "talk"; variante: "hombre" | "mujer" | "anciano" | "nino"; manto: string; trabaja?: boolean }[];
  /** Lo que se hace cada día en la sala restaurada: su círculo, su nombre y lo que se lee. */
  diario: { nombre: string; icono: string; x: number; z: number; lecturas: Verso[] };
  premio: { gozo: number; merito: number };
};

/** Lo que da cada vez que se hace un trabajo, y la lectura de cada día en una sala restaurada. */
export const GOZO_TRABAJO = 1;
export const GOZO_DIARIO = 3;
/** La primera sala del edificio de tu camino (el tutorial del primer día) da esto de más. */
export const GOZO_PRIMERA = 20;
/** Margen de segundos que se acepta por la red entre un trabajo y el siguiente. */
export const MARGEN_TRABAJO = 1.5;
/** A cuántos metros de la puerta del edificio (en la ciudad) hay que estar para trabajar adentro. */
export const CERCA_EDIFICIO = 12;

/** La puerta de cada edificio en la ciudad (las mismas de client/.../ciudad/plano.ts). */
export const PUERTA_EDIFICIO: Record<EdificioRestauracion, [number, number]> = {
  escuela: [17, -22.2],
  palacio: [17, 21.2],
  camara: [41.2, -8.0],
};

/** El edificio donde sirve cada camino. */
export const EDIFICIO_DE_CAMINO: Record<"sacerdocio" | "profecia" | "realeza", EdificioRestauracion> = { sacerdocio: "camara", profecia: "escuela", realeza: "palacio" };

const c = (m: string, x: number, z: number, r: 0 | 1 | 2 | 3 = 0): Colocado => ({ m, x, z, r, p: 0 });

const V = {
  r6_1: { text: "Los hijos de los profetas dijeron a Eliseo: He aquí, el lugar en que moramos contigo nos es estrecho.", ref: "2 Reyes 6:1" },
  r6_2: { text: "Vamos ahora al Jordán, y tomemos de allí cada uno una viga, y hagamos allí lugar en que habitemos.", ref: "2 Reyes 6:2" },
  r4_10: { text: "Yo te ruego que hagamos un pequeño aposento de paredes, y pongamos allí cama, mesa, silla y candelero,", ref: "2 Reyes 4:10" },
  i34_16: { text: "Inquirid en el libro de Jehová, y leed si faltó alguno de ellos;", ref: "Isaías 34:16" },
  i40_8: { text: "Sécase la hierba, marchítase la flor; mas la palabra del Dios nuestro permanece para siempre.", ref: "Isaías 40:8" },
  s119_105: { text: "Lámpara es a mis pies tu palabra, Y lumbrera a mi camino.", ref: "Salmo 119:105" },
  s5_3: { text: "Oh Jehová, de mañana oirás mi voz; De mañana me presentaré delante de ti, y esperaré.", ref: "Salmo 5:3" },
  s55_17: { text: "Tarde y mañana y a mediodía oraré y clamaré, Y él oirá mi voz.", ref: "Salmo 55:17" },
  s1_3: { text: "Será como árbol plantado junto a corrientes de aguas, Que da su fruto en su tiempo,", ref: "Salmo 1:3" },
  i58_11: { text: "y serás como huerto de riego, y como manantial de aguas, cuyas aguas nunca faltan.", ref: "Isaías 58:11" },
  i36_3: { text: "Y salió a él Eliaquim hijo de Hilcías, mayordomo, y Sebna, escriba, y Joa hijo de Asaf, canciller,", ref: "Isaías 36:3" },
  n8_8: { text: "Y leían en el libro de la ley de Dios claramente, y ponían el sentido, de modo que entendiesen la lectura.", ref: "Nehemías 8:8" },
  p25_2: { text: "Gloria de Dios es encubrir un asunto; Pero honra del rey es escudriñarlo.", ref: "Proverbios 25:2" },
  c32_28: { text: "Asimismo hizo depósitos para las rentas del grano, del vino, y del aceite;", ref: "2 Crónicas 32:28" },
  p3_9: { text: "Honra a Jehová con tus bienes, Y con las primicias de todos tus frutos;", ref: "Proverbios 3:9" },
  p3_10: { text: "Y serán llenos tus graneros con abundancia, Y tus lagares rebosarán de mosto.", ref: "Proverbios 3:10" },
  n3_15: { text: "y el muro del estanque de Siloé hacia el huerto del rey,", ref: "Nehemías 3:15" },
  r4_25: { text: "Y Judá e Israel vivían seguros, cada uno debajo de su parra y debajo de su higuera,", ref: "1 Reyes 4:25" },
  s92_12: { text: "El justo florecerá como la palmera; Crecerá como cedro en el Líbano.", ref: "Salmo 92:12" },
  cr9_28: { text: "Algunos de éstos tenían a su cargo los utensilios para el ministerio, los cuales se metían por cuenta, y por cuenta se sacaban.", ref: "1 Crónicas 9:28" },
  cr9_29: { text: "Y otros de ellos tenían el cargo de la vajilla, y de todos los utensilios del santuario, de la harina, del vino, del aceite, del incienso y de las especias.", ref: "1 Crónicas 9:29" },
  cr9_33: { text: "También había cantores, jefes de familias de los levitas, los cuales moraban en las cámaras del templo,", ref: "1 Crónicas 9:33" },
  s150_3: { text: "Alabadle a son de bocina; Alabadle con salterio y arpa.", ref: "Salmo 150:3" },
  s33_3: { text: "Cantadle cántico nuevo; Hacedlo bien, tañendo con júbilo.", ref: "Salmo 33:3" },
  e30_18: { text: "Harás también una fuente de bronce, con su base de bronce, para lavar;", ref: "Éxodo 30:18" },
  e30_19: { text: "Y de ella se lavarán Aarón y sus hijos las manos y los pies.", ref: "Éxodo 30:19" },
  s24_4: { text: "El limpio de manos y puro de corazón;", ref: "Salmo 24:4" },
  s51_7: { text: "Purifícame con hisopo, y seré limpio; Lávame, y seré más blanco que la nieve.", ref: "Salmo 51:7" },
} satisfies Record<string, Verso>;

export const SALAS: SalaDef[] = [
  // ---------------------------------------------------------------- la escuela de los profetas (plano de 28 × 22)
  {
    id: "esc-biblioteca",
    edificio: "escuela",
    cuarto: "biblioteca",
    nombre: "La biblioteca de los profetas",
    orden: 1,
    icono: "📚",
    historia: "Los hijos de los profetas son muchos y el lugar les quedó estrecho. Al norte del aula hay una sala vieja, con el techo caído y los rollos por el piso: será la biblioteca.",
    verso: V.r6_1,
    quien: "isaias",
    trabajos: [
      { id: "escombros", nombre: "Quitar los escombros", icono: "🪨", veces: 3, segundos: 4, x: 11.5, z: 5.5, quita: [c("escombros", 10, 5), c("escombros", 12, 6), c("viga-caida", 9, 3)], pone: [c("alfombra", 13, 3), c("estera", 10, 6)] },
      { id: "estantes", nombre: "Reparar los estantes", icono: "🔨", veces: 2, segundos: 5, x: 14.5, z: 1.8, quita: [c("estante-roto", 9, 0), c("estante-roto", 15, 0)], pone: [c("estante", 9, 0), c("estante", 15, 0)] },
      { id: "rollos", nombre: "Ordenar los rollos", icono: "📜", veces: 2, segundos: 4, x: 16.0, z: 5.5, quita: [c("rollos-tirados", 17, 3), c("rollos-tirados", 18, 6)], pone: [c("estante", 17, 0), c("mesa", 17, 4)] },
    ],
    extra: [c("candelero", 8, 0), c("candelero", 19, 0), c("cojines", 18, 5), c("cojines", 13, 5)],
    personas: [
      { x: 18.6, z: 5.4, yaw: Math.PI, pose: "sit", variante: "hombre", manto: "#7a6a4a" },
      { x: 10.5, z: 1.4, yaw: Math.PI, pose: "bow", variante: "anciano", manto: "#5a4a3a", trabaja: true },
    ],
    diario: { nombre: "Leer el rollo del día", icono: "📖", x: 14, z: 5.2, lecturas: [V.i34_16, V.i40_8, V.s119_105] },
    premio: { gozo: 30, merito: 25 },
  },
  {
    id: "esc-aposento",
    edificio: "escuela",
    cuarto: "aposento",
    nombre: "El aposento de oración",
    orden: 2,
    icono: "🕯️",
    historia: "Sobre la sala de los rollos había un aposento donde los profetas oraban. Está lleno de polvo y sin luz: hay que barrerlo, extender las esteras y encender las lámparas.",
    verso: V.r4_10,
    quien: "isaias",
    trabajos: [
      { id: "barrer", nombre: "Barrer el aposento", icono: "🧹", veces: 2, segundos: 4, x: 23.5, z: 4.5, quita: [c("polvo", 21, 3), c("polvo", 24, 5)], pone: [] },
      { id: "esteras", nombre: "Extender las esteras", icono: "🎋", veces: 2, segundos: 4, x: 22.5, z: 2.5, quita: [c("vasija-rota", 22, 1), c("vasija-rota", 25, 2)], pone: [c("estera", 21, 2), c("estera", 24, 3)] },
      { id: "lamparas", nombre: "Encender las lámparas", icono: "🪔", veces: 2, segundos: 3, x: 26.0, z: 1.5, quita: [], pone: [c("lampara-casa", 20, 0), c("lampara-casa", 27, 0)] },
    ],
    extra: [c("alfombra", 22, 5), c("cojines", 26, 5), c("planta", 27, 7)],
    personas: [{ x: 23.0, z: 5.6, yaw: Math.PI, pose: "kneel", variante: "hombre", manto: "#6a5a3a" }],
    diario: { nombre: "Orar en el aposento", icono: "🙏", x: 23.5, z: 3.6, lecturas: [V.s5_3, V.s55_17] },
    premio: { gozo: 30, merito: 25 },
  },
  {
    id: "esc-pozo",
    edificio: "escuela",
    cuarto: "pozo",
    nombre: "El patio del pozo",
    orden: 3,
    icono: "🪣",
    historia: "Al poniente del aula, el patio del pozo quedó tapado de tierra y vigas. Con agua cerca, los que estudian no tendrán que salir a buscarla.",
    verso: V.r6_2,
    quien: "isaias",
    trabajos: [
      { id: "vigas", nombre: "Sacar las vigas caídas", icono: "🪵", veces: 2, segundos: 5, x: 3.5, z: 10.5, quita: [c("viga-caida", 1, 9), c("viga-caida", 4, 13)], pone: [c("banco-cedro", 1, 15)] },
      { id: "agua", nombre: "Sacar agua del pozo", icono: "🪣", veces: 3, segundos: 4, x: 5.5, z: 12.5, quita: [c("escombros", 6, 11), c("escombros", 2, 12), c("escombros", 6, 14)], pone: [c("pozo-patio", 3, 11), c("tinaja", 6, 9)] },
    ],
    extra: [c("planta", 0, 8), c("planta", 7, 15), c("tinaja", 0, 15)],
    personas: [{ x: 5.8, z: 12.6, yaw: -Math.PI / 2, pose: "bow", variante: "mujer", manto: "#9a6a3a", trabaja: true }],
    diario: { nombre: "Sacar agua para los que estudian", icono: "💧", x: 2.5, z: 14.0, lecturas: [V.s1_3, V.i58_11] },
    premio: { gozo: 35, merito: 30 },
  },
  // ---------------------------------------------------------------- el palacio del rey (plano de 30 × 24)
  {
    id: "pal-archivo",
    edificio: "palacio",
    cuarto: "archivo",
    nombre: "El archivo del reino",
    orden: 1,
    icono: "🗂️",
    historia: "Al norte de la sala de los escribas está el archivo, donde Joa, el canciller, guarda lo que pasa en el reino. Las tablillas están por el piso y el arcón, roto.",
    verso: V.i36_3,
    quien: "eliaquim",
    trabajos: [
      { id: "tablillas", nombre: "Ordenar las tablillas", icono: "🧱", veces: 3, segundos: 4, x: 4.5, z: 4.5, quita: [c("rollos-tirados", 3, 3), c("rollos-tirados", 6, 5), c("escombros", 8, 2)], pone: [c("estante", 0, 0), c("estante", 2, 0)] },
      { id: "arcon", nombre: "Reparar el arcón", icono: "🔨", veces: 1, segundos: 6, x: 8.5, z: 5.5, quita: [c("estante-roto", 7, 6)], pone: [c("arcon", 9, 6)] },
      { id: "cronicas", nombre: "Copiar las crónicas", icono: "✒️", veces: 2, segundos: 5, x: 5.5, z: 1.8, quita: [c("viga-caida", 4, 6)], pone: [c("pupitre", 5, 2), c("estante", 7, 0)] },
    ],
    extra: [c("lampara-casa", 10, 0), c("alfombra", 3, 5), c("cojines", 9, 3)],
    personas: [{ x: 6.0, z: 3.2, yaw: Math.PI, pose: "sit", variante: "anciano", manto: "#4a4a5a" }],
    diario: { nombre: "Leer las crónicas del día", icono: "📜", x: 3.5, z: 6.4, lecturas: [V.n8_8, V.p25_2] },
    premio: { gozo: 30, merito: 25 },
  },
  {
    id: "pal-depositos",
    edificio: "palacio",
    cuarto: "depositos",
    nombre: "Los depósitos del rey",
    orden: 2,
    icono: "🌾",
    historia: "Ezequías hizo depósitos para el grano, el vino y el aceite. Estos, junto a la despensa, se llenaron de goteras y vasijas rotas: hay que arreglarlos antes de la cosecha.",
    verso: V.c32_28,
    quien: "eliaquim",
    trabajos: [
      { id: "barrer", nombre: "Barrer el depósito", icono: "🧹", veces: 1, segundos: 4, x: 15.5, z: 4.5, quita: [c("polvo", 13, 3), c("polvo", 17, 5)], pone: [] },
      { id: "sacos", nombre: "Contar los sacos de grano", icono: "🌾", veces: 3, segundos: 4, x: 13.5, z: 1.8, quita: [c("vasija-rota", 12, 1), c("vasija-rota", 14, 2), c("escombros", 16, 1)], pone: [c("sacos", 11, 0), c("sacos", 12, 0), c("sacos", 13, 0)] },
      { id: "tinajas", nombre: "Sellar las tinajas de aceite", icono: "🫙", veces: 2, segundos: 5, x: 19.5, z: 3.5, quita: [c("vasija-rota", 20, 2), c("viga-caida", 18, 5)], pone: [c("vasijas", 21, 0), c("tinaja", 21, 1), c("vasijas", 20, 0)] },
    ],
    extra: [c("sacos", 14, 0), c("cesta", 11, 6), c("tinaja", 21, 6), c("lampara-casa", 17, 0)],
    personas: [{ x: 15.5, z: 2.0, yaw: Math.PI, pose: "bow", variante: "hombre", manto: "#9a8a6a", trabaja: true }],
    diario: { nombre: "Recibir la ración del rey", icono: "🍞", x: 16.5, z: 6.2, lecturas: [V.p3_9, V.p3_10] },
    premio: { gozo: 30, merito: 25 },
  },
  {
    id: "pal-huerto",
    edificio: "palacio",
    cuarto: "huerto",
    nombre: "El huerto del rey",
    orden: 3,
    icono: "🌿",
    historia: "Al oriente del palacio está el huerto del rey, que llega hasta el estanque de Siloé. Lo cubrió la maleza: hay que podarlo y regarlo para que vuelva a dar fruto.",
    verso: V.n3_15,
    quien: "eliaquim",
    trabajos: [
      { id: "podar", nombre: "Podar la maleza", icono: "✂️", veces: 2, segundos: 5, x: 25.5, z: 11.5, quita: [c("escombros", 24, 10), c("viga-caida", 27, 13)], pone: [c("planta", 23, 9), c("planta", 28, 9)] },
      { id: "regar", nombre: "Regar el huerto", icono: "💧", veces: 3, segundos: 4, x: 26.5, z: 15.5, quita: [c("polvo", 23, 15), c("polvo", 26, 17)], pone: [c("pozo-patio", 24, 14), c("planta", 28, 17), c("cesta", 23, 17)] },
    ],
    extra: [c("banco-cedro", 26, 9), c("planta", 22, 18), c("tinaja", 29, 15)],
    personas: [{ x: 27.6, z: 12.5, yaw: Math.PI / 2, pose: "bow", variante: "hombre", manto: "#6a7a4a", trabaja: true }],
    diario: { nombre: "Recoger frutos del huerto", icono: "🍇", x: 25.0, z: 17.6, lecturas: [V.r4_25, V.s92_12] },
    premio: { gozo: 35, merito: 30 },
  },
  // ---------------------------------------------------------------- la cámara de los sacerdotes (plano de 22 × 19)
  {
    id: "cam-utensilios",
    edificio: "camara",
    cuarto: "utensilios",
    nombre: "La cámara de los utensilios",
    orden: 1,
    icono: "🏺",
    historia: "Al norte de la cátedra de Eleazar está la cámara donde se guardan los utensilios del santuario, contados al entrar y al salir. Quedó en desorden y con piezas rotas.",
    verso: V.cr9_28,
    quien: "eleazar",
    trabajos: [
      { id: "contar", nombre: "Contar los utensilios", icono: "🔢", veces: 3, segundos: 4, x: 9.5, z: 4.5, quita: [c("vasija-rota", 8, 3), c("vasija-rota", 11, 5), c("escombros", 12, 2)], pone: [c("estante", 6, 0), c("estante", 8, 0)] },
      { id: "pulir", nombre: "Pulir los tazones de bronce", icono: "✨", veces: 2, segundos: 5, x: 12.5, z: 1.8, quita: [c("estante-roto", 10, 0)], pone: [c("mesa", 11, 2), c("vasijas", 13, 0)] },
      { id: "guardar", nombre: "Guardar la harina y el aceite", icono: "🫙", veces: 2, segundos: 4, x: 7.5, z: 5.5, quita: [c("viga-caida", 7, 6)], pone: [c("tinaja", 6, 6), c("vasijas", 13, 6)] },
    ],
    extra: [c("candelero", 6, 3), c("arcon", 13, 4), c("alfombra", 9, 2)],
    personas: [{ x: 10.0, z: 1.3, yaw: Math.PI, pose: "bow", variante: "hombre", manto: "#efe6d2", trabaja: true }],
    diario: { nombre: "Preparar los utensilios del día", icono: "🏺", x: 10.5, z: 5.6, lecturas: [V.cr9_28, V.cr9_29] },
    premio: { gozo: 30, merito: 25 },
  },
  {
    id: "cam-cantores",
    edificio: "camara",
    cuarto: "cantores",
    nombre: "La cámara de los cantores",
    orden: 2,
    icono: "🎶",
    historia: "Los cantores levitas vivían en las cámaras del templo, de día y de noche en su obra. Su cámara está sin usar: las arpas desafinadas y los salterios en el piso.",
    verso: V.cr9_33,
    quien: "eleazar",
    trabajos: [
      { id: "barrer", nombre: "Barrer la cámara", icono: "🧹", veces: 1, segundos: 4, x: 17.5, z: 5.0, quita: [c("polvo", 15, 4), c("polvo", 19, 5)], pone: [] },
      { id: "salterios", nombre: "Ordenar los salterios", icono: "🎼", veces: 2, segundos: 4, x: 16.5, z: 2.0, quita: [c("rollos-tirados", 15, 1), c("vasija-rota", 18, 2)], pone: [c("banco-cedro", 15, 3), c("banco-cedro", 19, 3)] },
      { id: "arpas", nombre: "Afinar las arpas", icono: "🪕", veces: 2, segundos: 5, x: 20.0, z: 1.6, quita: [c("estante-roto", 20, 4)], pone: [c("arpa", 16, 0), c("arpa", 20, 0)] },
    ],
    extra: [c("alfombra", 17, 5), c("lampara-casa", 14, 0), c("lampara-casa", 21, 6)],
    personas: [
      { x: 16.0, z: 3.3, yaw: Math.PI, pose: "sit", variante: "hombre", manto: "#efe6d2" },
      { x: 20.0, z: 3.3, yaw: Math.PI, pose: "sit", variante: "hombre", manto: "#e8e0cc" },
    ],
    diario: { nombre: "Cantar con los levitas", icono: "🎶", x: 18.0, z: 3.4, lecturas: [V.s150_3, V.s33_3] },
    premio: { gozo: 30, merito: 25 },
  },
  {
    id: "cam-lavatorio",
    edificio: "camara",
    cuarto: "lavatorio",
    nombre: "El patio de la fuente",
    orden: 3,
    icono: "⛲",
    historia: "Los sacerdotes se lavan las manos y los pies antes de servir. El patio de la fuente, al poniente, quedó seco y lleno de piedras.",
    verso: V.e30_18,
    quien: "eleazar",
    trabajos: [
      { id: "piedras", nombre: "Quitar las piedras", icono: "🪨", veces: 2, segundos: 4, x: 2.5, z: 9.5, quita: [c("escombros", 1, 8), c("escombros", 4, 12)], pone: [c("planta", 0, 7)] },
      { id: "fuente", nombre: "Llenar la fuente de bronce", icono: "💧", veces: 3, segundos: 4, x: 3.5, z: 11.5, quita: [c("vasija-rota", 2, 11), c("polvo", 1, 12), c("escombros", 4, 9)], pone: [c("pila", 3, 10), c("tinaja", 5, 13)] },
    ],
    extra: [c("planta", 5, 7), c("banco-cedro", 0, 13)],
    personas: [{ x: 1.6, z: 10.5, yaw: Math.PI / 2, pose: "bow", variante: "hombre", manto: "#efe6d2", trabaja: true }],
    diario: { nombre: "Lavarse antes de servir", icono: "💧", x: 2.0, z: 12.4, lecturas: [V.e30_19, V.s24_4, V.s51_7] },
    premio: { gozo: 35, merito: 30 },
  },
];

export function salaDef(id: string): SalaDef | undefined {
  return SALAS.find((s) => s.id === id);
}

export function salasDe(edificio: EdificioRestauracion): SalaDef[] {
  return SALAS.filter((s) => s.edificio === edificio).sort((a, b) => a.orden - b.orden);
}

/** Lo que se pide para terminar una sala (todas las veces de todos sus trabajos). */
export function trabajosTotales(s: SalaDef): number {
  return s.trabajos.reduce((a, t) => a + t.veces, 0);
}

/** La lectura del día en una sala (la misma para todos ese día). */
export function lecturaDelDia(s: SalaDef, dia: string): Verso {
  let x = 2166136261;
  for (const ch of `${s.id}:${dia}`) x = Math.imul(x ^ ch.charCodeAt(0), 16777619) >>> 0;
  return s.diario.lecturas[x % s.diario.lecturas.length];
}

// ---------------------------------------------------------------- respuestas de la API
export type SalaEstado = {
  id: string;
  /** Veces hechas de cada trabajo. */
  progreso: Record<string, number>;
  hecha: boolean;
  /** Se puede trabajar en ella (la anterior del edificio ya está restaurada). */
  abierta: boolean;
  /** Ya se hizo hoy lo de cada día. */
  diarioHoy: boolean;
};

export type RestauracionVista = { salas: SalaEstado[]; hechas: number; total: number };
export type TrabajoRespuesta = { vista: RestauracionVista; fin: boolean; gozo: number; gozoTotal: number; avisos: { titulo: string; premio: number; gozo?: number }[] };
export type DiarioRespuesta = { vista: RestauracionVista; gozo: number; gozoTotal: number; lectura: Verso };
