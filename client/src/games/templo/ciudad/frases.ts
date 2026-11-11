/**
 * Lo que dice la gente de la calle cuando te acercas (como en los juegos de antes): cada uno según quién es y lo
 * que sabe. Muchos hablan de los siervos de Dios de la calle de los siervos (Azarías, Conanías, Isaías, Miqueas,
 * Eliaquim, Etán), del recado de hoy y de lo que de verdad está pasando en el juego (los chismes del servidor).
 * Son frases propias, sin citas: las citas literales están en las ventanas, con su referencia.
 */
import type { CapituloId, MomentoFiesta } from "@shared/capitulos";

export type GenteQueHabla = "paseo" | "anciano" | "nino" | "guardia" | "alumno" | "levita" | "peregrino" | "siervo" | "mercader" | "pueblo";

export type ContextoFrases = {
  noche: boolean;
  /** La fiesta de hoy (su nombre), si hay. */
  fiesta: string | null;
  /** Quién tiene hoy el recado para ti (o a quién le toca), si se sabe. */
  recadoQuien: string | null;
  /** Lo que está pasando en el juego (de /api/jerusalen/chismes). */
  noticias: string[];
  /** El capítulo de la historia de la temporada de esta semana (shared/capitulos.ts) y cómo va la fiesta final. */
  capitulo?: CapituloId | null;
  fiestaFinal?: MomentoFiesta | null;
};

/** Lo que dice la gente de cada capítulo de la historia de la temporada (la amenaza de Senaquerib). */
const FRASES_CAPITULO: Record<CapituloId, Partial<Record<GenteQueHabla, string[]>> & { todos: string[] }> = {
  muro: {
    todos: ["Dicen que el rey habló al corazón del pueblo en la plaza de la puerta.", "Cada encargo que cumples pone cinco piedras en el muro, dicen.", "¿Ya viste las torres nuevas del muro del oriente? ¡Suben cada día!"],
    nino: ["¡Mi papá carga piedras para las torres nuevas!", "Cuando terminen las torres, ¡quiero subir a ver lejos!"],
    guardia: ["Desde las torres nuevas veremos venir a cualquier ejército.", "El rey Ezequías mandó levantar los muros caídos. ¡Ayuda con tus deberes!"],
    anciano: ["Senaquerib ya tomó las ciudades fortificadas de Judá. Jerusalén tiene que estar lista.", "En mis días nadie reparaba estos muros. ¡Hoy trabaja toda la ciudad!"],
    levita: ["Después del servicio, los levitas vamos a cargar piedras al muro."],
    mercader: ["Los que edifican compran mucho pan. ¡Esta semana se vende todo!"],
    alumno: ["Isaías dice que no confiemos en las piedras, sino en el que hizo todo."],
    peregrino: ["En el camino vi los pueblos de Judá vacíos. ¡Qué bueno llegar a una ciudad con muros!"],
    siervo: ["Eliaquim lleva la cuenta de cada piedra del muro."],
  },
  canal: {
    todos: ["El conducto pasa por la calle del sur, junto a la calle de los siervos. ¡Ve a verlo!", "Dicen que cuando el agua llegue a Siloé habrá fiesta en el barrio.", "Cada deber cava un codo del conducto. ¡Ya falta menos!"],
    nino: ["¡Fui a ver la zanja del agua! Empieza en el muro del oriente.", "¿Ya viste el estanque de Siloé? ¡Cuando se llene quiero mojarme los pies!"],
    guardia: ["Cubrieron las fuentes de afuera: los asirios no hallarán agua.", "El agua de Gihón va a entrar por debajo del muro. ¡Qué ingenio el del rey!"],
    anciano: ["Agua dentro de los muros… eso es lo que salva a una ciudad.", "Mi abuelo bajaba a la fuente de Gihón con su cántaro. Ahora el agua vendrá a nosotros."],
    levita: ["Bajamos a ayudar a los que cavan, y subimos a cantar al anochecer."],
    mercader: ["Los que cavan compran mucho aceite para sus lámparas. ¡Buena semana!"],
    alumno: ["Isaías habló de las aguas de Siloé, que corren mansamente."],
    peregrino: ["Allá afuera las fuentes están tapadas. ¡Menos mal que aquí adentro habrá agua!"],
    siervo: ["El rey baja cada tarde a ver cómo avanza el conducto."],
  },
  rabsaces: {
    todos: ["Sigo sirviendo y orando: es lo que pidió el profeta Isaías.", "El Rabsaces dice que Jehová no nos librará. ¡Ya verá!", "Al pie de la escalinata la gente ora por el rey. ¿Vienes?"],
    nino: ["Hay un hombre gritando afuera de la puerta… Mi mamá dice que no le contestemos.", "¡Shhh! El rey mandó callar. Nosotros oramos."],
    guardia: ["El Rabsaces grita desde afuera. Orden del rey: no le respondáis.", "Desde la torre se ven las tiendas de los asirios en el monte."],
    anciano: ["Que griten. Nosotros oramos, como el rey Ezequías.", "Jehová oye. Siempre ha oído a su pueblo."],
    levita: ["El rey subió a la casa de Jehová. Toda la ciudad ora con él."],
    mercader: ["Hoy casi no se vende… todos están orando. ¡Y yo también!"],
    alumno: ["Isaías mandó decir al rey: no temas."],
    peregrino: ["Subí a orar al templo antes de que llegara el ejército. ¡Cuántas tiendas hay en el monte!"],
    siervo: ["Eliaquim volvió de la muralla con los vestidos rasgados. Todos oramos por el rey."],
  },
  liberacion: {
    todos: ["Senaquerib se volvió a Nínive. ¡Bendito sea Jehová!", "Traigo mi ofrenda de gratitud al templo.", "¿Ya oíste? Al final de la semana hay fiesta en la plaza."],
    nino: ["¡Ya no hay soldados afuera! ¡Se fueron todos!", "¡Viene la fiesta en la plaza! ¿Vas a ir?"],
    guardia: ["Al amanecer, el campamento de los asirios estaba en silencio. Jehová peleó por nosotros."],
    anciano: ["Jamás vi algo así. Jehová salvó a Jerusalén sin que tiráramos una sola flecha."],
    levita: ["Los cantores ensayan para la fiesta de la liberación."],
    mercader: ["¡Todos compran para las ofrendas de gratitud! Qué semana tan alegre."],
    alumno: ["Isaías lo dijo: no entraría en la ciudad, ni echaría saeta en ella."],
    peregrino: ["Vine desde lejos a dar gracias: ¡todo Judá habla de lo que hizo Jehová!"],
    siervo: ["El rey prepara una gran fiesta en la plaza."],
  },
};

const FRASES_FIESTA = ["¡Es la fiesta de la liberación! Ve a la plaza a dar gracias.", "Toda la ciudad está en la plaza. ¡No faltes!", "¡Grandes cosas ha hecho Jehová con nosotros! Vamos a la plaza."];
const FRASES_ALABANZA = ["¡Ya empezó la gran alabanza en la plaza! ¿Oyes las trompetas?", "¡Corre a la plaza: los levitas cantan y toda la ciudad da gracias!"];

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
  const elegir = (l: string[]) => l[Math.floor(azar() * l.length)];
  // la fiesta final de la historia de la temporada: casi todos hablan de ella
  if (ctx.fiestaFinal === "vivo" && r < 0.5) return elegir(FRASES_ALABANZA);
  if (ctx.fiestaFinal === "fiesta" && r < 0.4) return elegir(FRASES_FIESTA);
  if (ctx.fiesta && r < 0.18) return `¡Hoy es ${ctx.fiesta}! Toda la ciudad sube al templo.`;
  if (ctx.noche && r < 0.26) return elegir(NOCHE);
  // el capítulo de la semana: de eso habla la ciudad
  if (ctx.capitulo && r < 0.5) {
    const f = FRASES_CAPITULO[ctx.capitulo];
    const propias = f[kind] ?? [];
    return elegir(propias.length && azar() < 0.65 ? propias : f.todos);
  }
  // la red de los siervos: el recado de hoy corre de boca en boca
  if (ctx.recadoQuien && r < 0.62 && kind !== "nino") return `Dicen que ${ctx.recadoQuien} busca a alguien de confianza para un recado…`;
  // lo que de verdad pasa en el juego
  if (ctx.noticias.length && r < 0.8 && (kind === "paseo" || kind === "mercader" || kind === "peregrino" || kind === "pueblo" || kind === "anciano")) {
    const n = ctx.noticias[Math.floor(azar() * ctx.noticias.length)];
    return `¿Ya supiste? ${n}`;
  }
  const lista = FRASES[kind];
  return lista[Math.floor(azar() * lista.length)];
}
