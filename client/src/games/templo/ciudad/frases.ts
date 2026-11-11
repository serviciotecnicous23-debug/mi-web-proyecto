/**
 * Lo que dice la gente de la calle cuando te acercas (como en los juegos de antes): cada uno según quién es y lo
 * que sabe. Muchos hablan de los siervos de Dios de la calle de los siervos (Azarías, Conanías, Isaías, Miqueas,
 * Eliaquim, Etán), del recado de hoy y de lo que de verdad está pasando en el juego (los chismes del servidor).
 * Son frases propias, sin citas: las citas literales están en las ventanas, con su referencia.
 */
export type GenteQueHabla = "paseo" | "anciano" | "nino" | "guardia" | "alumno" | "levita" | "peregrino" | "siervo" | "mercader" | "pueblo";

export type ContextoFrases = {
  noche: boolean;
  /** La fiesta de hoy (su nombre), si hay. */
  fiesta: string | null;
  /** Quién tiene hoy el recado para ti (o a quién le toca), si se sabe. */
  recadoQuien: string | null;
  /** Lo que está pasando en el juego (de /api/jerusalen/chismes). */
  noticias: string[];
};

const FRASES: Record<GenteQueHabla, string[]> = {
  nino: [
    "¡Mira cómo corro! ¡Llego al pozo antes que tú!",
    "Mi abuelo dice que el muro caído lo vamos a levantar entre todos.",
    "¿Tú también sirves en el templo? ¡De grande quiero ser levita!",
    "Dicen que Etán hace preguntas dificilísimas en la casa de la sabiduría.",
    "¡Shhh! Estamos jugando a las escondidas detrás del pozo.",
    "Mi mamá horneó tortas para la ofrenda. ¡Huelen riquísimo!",
  ],
  guardia: [
    "Guardo esta puerta por orden del rey Ezequías. Pasa en paz.",
    "En el palacio, Eliaquim lleva la llave de la casa de David sobre su hombro.",
    "De noche encendemos las antorchas. Nadie entra sin que lo veamos.",
    "Si vas al palacio, saluda a Eliaquim de mi parte.",
    "El rey mandó reparar el muro. Cada piedra que pones ayuda.",
  ],
  levita: [
    "El fuego del altar no se apaga nunca: hay que traer leña.",
    "Conanías cuenta los diezmos en las cámaras. ¡No se le escapa ni un grano!",
    "Azarías, el sumo sacerdote, vive en la calle de los siervos, al sur.",
    "Los cantores ensayan los salmos para la próxima fiesta.",
    "Las lámparas del candelero se llenan de aceite cada tarde.",
  ],
  alumno: [
    "Isaías nos enseña en la escuela de los profetas. ¡Habla con fuego!",
    "Miqueas es de Moreset, un pueblo del campo. No le teme a nadie.",
    "Estoy memorizando un versículo. ¿Me tomarías la lección?",
    "En la escuela se aprende la Palabra; en el templo se sirve.",
    "Eleazar dice que el que estudia de día enseña de noche en su casa.",
  ],
  peregrino: [
    "¡Vengo de lejos para subir al templo! Qué hermosa es Jerusalén.",
    "Traigo mi ofrenda para el altar. ¿Me dices por dónde se sube?",
    "En el camino me contaron que el rey Ezequías abrió las puertas del templo.",
    "Dicen que en la casa de la sabiduría regalan premios a los sabios.",
  ],
  siervo: [
    "Sirvo en la casa del rey. Eliaquim nos manda con mucho orden.",
    "El rey quiere que todo Jerusalén celebre la Pascua junto.",
    "Hoy llegaron rollos nuevos para la sala de los rollos.",
  ],
  mercader: [
    "¡Flor de harina, aceite puro! Pasa a mi puesto, vecino.",
    "Lo que coseches en tu huerto me lo puedes vender aquí.",
    "Con el gozo que ganas sirviendo compras muebles para tu casa.",
    "Una alfombra nueva cambia toda la casa. ¡Mírala en mi puesto!",
  ],
  pueblo: [
    "Nos falta poco para la ofrenda… los vecinos siempre ayudan.",
    "Gracias a los del barrio, nuestra casa se ve más bonita.",
    "Si pasas por el tablero de la plaza, verás quién necesita ayuda.",
  ],
  paseo: [
    "En el mercado de la plaza se consigue de todo: semillas, muebles y ropa.",
    "Mi vecino puso una alfombra nueva en su casa. ¡Se ve preciosa!",
    "¿Ya fuiste a la calle de los siervos? Cada uno cuenta algo distinto.",
    "Dicen que Isaías y Miqueas profetizan en los mismos días, los del rey Ezequías.",
    "En las reuniones de las casas se aprende mucho. ¡Ve a una!",
    "El barrio que más sirve se lleva la copa de la semana.",
  ],
  anciano: [
    "En mis días el templo estaba cerrado; hoy vuelve a arder el fuego.",
    "Los jóvenes deben escuchar a los profetas, como Isaías y Miqueas.",
    "Siéntate un rato con nosotros: en la puerta se aprende mucho.",
  ],
};

const NOCHE = ["Las antorchas ya están encendidas. Que descanses, vecino.", "De noche la ciudad se ve hermosa con tantas luces.", "Mañana temprano hay que volver a servir."];

/** Una frase para esta persona de la calle. */
export function fraseDeGente(kind: GenteQueHabla, ctx: ContextoFrases, azar: () => number = Math.random): string {
  const r = azar();
  if (ctx.fiesta && r < 0.18) return `¡Hoy es ${ctx.fiesta}! Toda la ciudad sube al templo.`;
  if (ctx.noche && r < 0.3) return NOCHE[Math.floor(azar() * NOCHE.length)];
  // la red de los siervos: el recado de hoy corre de boca en boca
  if (ctx.recadoQuien && r < 0.42 && kind !== "nino") return `Dicen que ${ctx.recadoQuien} busca a alguien de confianza para un recado…`;
  // lo que de verdad pasa en el juego
  if (ctx.noticias.length && r < 0.62 && (kind === "paseo" || kind === "mercader" || kind === "peregrino" || kind === "pueblo" || kind === "anciano")) {
    const n = ctx.noticias[Math.floor(azar() * ctx.noticias.length)];
    return `¿Ya supiste? ${n}`;
  }
  const lista = FRASES[kind];
  return lista[Math.floor(azar() * lista.length)];
}
