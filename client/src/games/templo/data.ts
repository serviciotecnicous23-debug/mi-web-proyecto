/**
 * "El aprendiz del templo": todo el contenido del juego (lugares, ayudantes, mejoras, rangos,
 * lecciones, preguntas y diálogos). Los versículos son de la Reina-Valera 1960, tal como los
 * sirve la Biblia de la propia web. El aprendiz es un personaje imaginario; el templo, sus
 * servicios, el rey Ezequías y el sumo sacerdote Azarías son del relato bíblico (2 Crónicas 29–31).
 */

export type ItemType = "lena" | "aceite" | "pan" | "incienso" | "cordero" | "palomas" | "cereal" | "diezmo";

export const ITEMS: Record<ItemType, { nombre: string; plural: string; icono: string }> = {
  lena: { nombre: "leña", plural: "leña", icono: "🪵" },
  aceite: { nombre: "aceite", plural: "jarros de aceite", icono: "🫒" },
  pan: { nombre: "pan", plural: "panes", icono: "🍞" },
  incienso: { nombre: "incienso", plural: "incienso", icono: "🌿" },
  cordero: { nombre: "cordero", plural: "corderos", icono: "🐑" },
  palomas: { nombre: "palomas", plural: "palomas", icono: "🕊️" },
  cereal: { nombre: "flor de harina", plural: "ofrendas de harina", icono: "🌾" },
  diezmo: { nombre: "diezmo", plural: "diezmos", icono: "🌾" },
};

export type StationId =
  | "puertas" | "lenera" | "altar" | "fuente" | "santuario" | "prensa" | "candelero" | "horno" | "mesa"
  | "camIncienso" | "altarIncienso" | "coro" | "camaras" | "ensenanza";

export type Verse = { ref: string; text: string };

export type Lesson = {
  id: string;
  titulo: string;
  texto: string;
  verso: Verse;
  hoy: { texto: string; verso: Verse };
  quiz?: string;
};

export type StationDef = {
  id: StationId;
  nombre: string;
  costo: number;
  /** Lugar en el mundo (x, z) del círculo para restaurarlo. */
  pad: [number, number];
  requiere: (s: ProgressView) => boolean;
  leccion: string;
  dialogo?: string;
};

/** Lo que las condiciones necesitan saber del avance (se arma desde la partida). */
export type ProgressView = {
  built: (id: StationId) => boolean;
  rank: number;
  sabiduria: number;
  ofrendas: number;
  story: (id: string) => boolean;
  helpers: (id: HelperId) => number;
};

export const STATIONS: StationDef[] = [
  { id: "puertas", nombre: "Puertas del templo", costo: 0, pad: [14.3, 0], requiere: () => true, leccion: "puertas", dialogo: "puertas" },
  { id: "lenera", nombre: "Leñera", costo: 10, pad: [7.6, -9.0], requiere: (s) => s.built("puertas"), leccion: "lenera", dialogo: "lenera" },
  { id: "altar", nombre: "Altar de bronce", costo: 15, pad: [5.9, 0.6], requiere: (s) => s.built("lenera"), leccion: "altar", dialogo: "altar" },
  { id: "fuente", nombre: "Mar de bronce", costo: 40, pad: [3.6, 8.6], requiere: (s) => s.built("altar") && s.ofrendas >= 3, leccion: "fuente", dialogo: "fuente" },
  { id: "santuario", nombre: "Puertas del Lugar Santo", costo: 120, pad: [-0.7, 0], requiere: (s) => s.rank >= 1, leccion: "santuario", dialogo: "santuario" },
  { id: "prensa", nombre: "Prensa de aceite", costo: 80, pad: [-5.6, 9.0], requiere: (s) => s.built("santuario"), leccion: "prensa" },
  { id: "candelero", nombre: "Candelero de oro", costo: 120, pad: [-7.6, 1.45], requiere: (s) => s.built("prensa"), leccion: "candelero", dialogo: "candelero" },
  { id: "horno", nombre: "Horno de los panes", costo: 120, pad: [-10.6, 9.0], requiere: (s) => s.built("candelero"), leccion: "horno" },
  { id: "mesa", nombre: "Mesa de los panes", costo: 150, pad: [-7.6, -1.45], requiere: (s) => s.built("horno"), leccion: "mesa", dialogo: "mesa" },
  { id: "camIncienso", nombre: "Cámara del incienso", costo: 150, pad: [-9.0, -9.3], requiere: (s) => s.built("mesa"), leccion: "camIncienso" },
  { id: "altarIncienso", nombre: "Altar del incienso", costo: 180, pad: [-9.15, 0], requiere: (s) => s.built("camIncienso"), leccion: "altarIncienso", dialogo: "incienso" },
  { id: "coro", nombre: "Coro de los levitas", costo: 300, pad: [7.6, 7.6], requiere: (s) => s.rank >= 2, leccion: "coro", dialogo: "coro" },
  { id: "camaras", nombre: "Cámaras de los diezmos", costo: 400, pad: [-0.2, -9.5], requiere: (s) => s.story("pascua"), leccion: "camaras", dialogo: "camaras" },
  { id: "ensenanza", nombre: "Lugar de enseñanza", costo: 350, pad: [24.2, 6.6], requiere: (s) => s.built("camaras"), leccion: "ensenanza", dialogo: "ensenanza" },
];

export type HelperId = "lenero" | "ayudante" | "aceitero" | "panadero" | "incensario" | "cantor" | "conanias" | "portero";

export type HelperDef = {
  id: HelperId;
  nombre: string;
  tarea: string;
  costos: number[];
  pad: [number, number];
  requiere: (s: ProgressView) => boolean;
  sash: string;
};

export const HELPERS: HelperDef[] = [
  { id: "lenero", nombre: "Levita leñero", tarea: "Lleva leña al altar", costos: [60], pad: [10.2, -7.4], requiere: (s) => s.built("fuente"), sash: "#6b4f2a" },
  { id: "ayudante", nombre: "Levita ayudante del altar", tarea: "Lleva las ofrendas del atrio al altar (2 Crónicas 29:34)", costos: [150], pad: [6.8, 4.4], requiere: (s) => s.rank >= 1 && s.built("fuente"), sash: "#a33b2c" },
  { id: "portero", nombre: "Levita portero", tarea: "Deja pasar más familias a la vez", costos: [200], pad: [12.2, 5.6], requiere: (s) => s.built("candelero"), sash: "#2f5aa8" },
  { id: "aceitero", nombre: "Levita del aceite", tarea: "Mantiene lleno el candelero", costos: [180], pad: [-2.6, 11.2], requiere: (s) => s.built("candelero"), sash: "#7a8a2e" },
  { id: "panadero", nombre: "Panadero de los hijos de Coat", tarea: "Cuece los panes y los pone en la mesa (1 Crónicas 9:32)", costos: [200], pad: [-13.6, 9.6], requiere: (s) => s.built("mesa"), sash: "#c77b2b" },
  { id: "incensario", nombre: "Levita del incienso", tarea: "Lleva incienso al altar del incienso", costos: [220], pad: [-12.6, -9.4], requiere: (s) => s.built("altarIncienso"), sash: "#7d4f9e" },
  { id: "cantor", nombre: "Levita cantor", tarea: "Canta y multiplica el gozo (2 Crónicas 29:25)", costos: [150, 220, 300], pad: [11.8, 9.6], requiere: (s) => s.built("coro"), sash: "#5b2a6e" },
  { id: "conanias", nombre: "Conanías, encargado de las cámaras", tarea: "Guarda los diezmos y suma gozo aunque no juegues (2 Crónicas 31:12)", costos: [300], pad: [3.4, -8.4], requiere: (s) => s.built("camaras"), sash: "#1e4d8c" },
];

export type UpgradeId = "paso" | "brazos" | "fuego" | "agua" | "familias" | "abundancia" | "diligencia";

export type UpgradeDef = { id: UpgradeId; nombre: string; efecto: string; max: number; base: number; requiere: (s: ProgressView) => boolean };

export const UPGRADES: UpgradeDef[] = [
  { id: "paso", nombre: "Paso ligero", efecto: "Caminas más rápido", max: 6, base: 30, requiere: () => true },
  { id: "brazos", nombre: "Brazos fuertes", efecto: "Cargas una cosa más", max: 7, base: 40, requiere: (s) => s.built("lenera") },
  { id: "fuego", nombre: "Fuego vivo", efecto: "El altar guarda más leña y el fuego dura más", max: 5, base: 50, requiere: (s) => s.built("altar") },
  { id: "agua", nombre: "Más agua en el mar", efecto: "La pureza alcanza para más ofrendas", max: 5, base: 60, requiere: (s) => s.built("fuente") },
  { id: "familias", nombre: "Más familias", efecto: "Llegan familias más seguido y caben más en la fila", max: 5, base: 80, requiere: (s) => s.built("fuente") },
  { id: "abundancia", nombre: "Ofrendas abundantes", efecto: "Cada persona bendecida deja 20 % más de gozo", max: 6, base: 100, requiere: (s) => s.rank >= 1 },
  { id: "diligencia", nombre: "Levitas diligentes", efecto: "Los levitas trabajan 15 % más rápido", max: 5, base: 120, requiere: (s) => s.helpers("lenero") > 0 },
];

export function upgradeCost(def: UpgradeDef, level: number): number {
  return Math.round(def.base * Math.pow(1.75, level));
}

export type RankDef = { nombre: string; ropa: string; requiere: (s: ProgressView) => boolean; requisito: string; dialogo: string };

export const RANKS: RankDef[] = [
  { nombre: "Aprendiz", ropa: "Túnica sencilla de lino", requiere: () => true, requisito: "", dialogo: "" },
  {
    nombre: "Sacerdote",
    ropa: "Túnica de lino fino, cinto y tiara (Éxodo 28:40)",
    requiere: (s) => s.built("fuente") && s.ofrendas >= 8 && s.sabiduria >= 1,
    requisito: "Restaura el mar de bronce, presenta 8 ofrendas y responde bien una pregunta de Azarías",
    dialogo: "rango1",
  },
  {
    nombre: "Sacerdote de turno",
    ropa: "Lleva la trompeta de plata (Números 10:8)",
    requiere: (s) => s.built("altarIncienso") && s.sabiduria >= 4,
    requisito: "Enciende el Lugar Santo completo (candelero, mesa e incienso) y junta 4 de sabiduría",
    dialogo: "rango2",
  },
  {
    nombre: "Principal de los sacerdotes",
    ropa: "Lleva el incensario de oro",
    requiere: (s) => s.built("ensenanza") && s.sabiduria >= 8,
    requisito: "Abre el lugar de enseñanza y junta 8 de sabiduría",
    dialogo: "rango3",
  },
  {
    nombre: "Sumo sacerdote",
    ropa: "Manto azul con campanillas y granadas, efod, pectoral con doce piedras y mitra con «SANTIDAD A JEHOVÁ» (Éxodo 28)",
    requiere: (s) => s.built("ensenanza") && s.sabiduria >= 12 && s.helpers("cantor") >= 1 && s.helpers("conanias") >= 1,
    requisito: "Junta 12 de sabiduría, ten cantores y a Conanías, y aprueba el examen de Azarías",
    dialogo: "rango4",
  },
];

// ---------------------------------------------------------------- lecciones (Libro del aprendiz)
export const LESSONS: Record<string, Lesson> = {
  puertas: {
    id: "puertas",
    titulo: "Las puertas abiertas",
    texto: "El rey Acaz había cerrado el templo. Su hijo Ezequías, en cuanto empezó a reinar, abrió las puertas y las reparó: volver a Dios empezó por abrir la puerta de su casa.",
    verso: { ref: "2 Crónicas 29:3", text: "En el primer año de su reinado, en el mes primero, abrió las puertas de la casa de Jehová, y las reparó." },
    hoy: { texto: "Jesús también llama a la puerta del corazón.", verso: { ref: "Apocalipsis 3:20", text: "He aquí, yo estoy a la puerta y llamo; si alguno oye mi voz y abre la puerta, entraré a él, y cenaré con él, y él conmigo." } },
  },
  lenera: {
    id: "lenera",
    titulo: "La leña de cada mañana",
    texto: "El fuego del altar se cuidaba todos los días: cada mañana el sacerdote ponía leña nueva y acomodaba el holocausto sobre ella.",
    verso: { ref: "Levítico 6:12", text: "Y el fuego encendido sobre el altar no se apagará, sino que el sacerdote pondrá en él leña cada mañana, y acomodará el holocausto sobre él, y quemará sobre él las grosuras de los sacrificios de paz." },
    hoy: { texto: "La vida con Dios también se cuida cada día, empezando por la mañana.", verso: { ref: "Salmo 5:3", text: "Oh Jehová, de mañana oirás mi voz; De mañana me presentaré delante de ti, y esperaré." } },
  },
  altar: {
    id: "altar",
    titulo: "El fuego que no se apaga",
    texto: "El altar de bronce estaba frente al templo. Su fuego debía arder siempre: era la señal de que el camino a Dios seguía abierto para el pueblo.",
    verso: { ref: "Levítico 6:13", text: "El fuego arderá continuamente en el altar; no se apagará." },
    hoy: { texto: "Dios nos pide que su fuego siga vivo en nosotros: no apagar al Espíritu y avivar el don que nos dio.", verso: { ref: "2 Timoteo 1:6", text: "Por lo cual te aconsejo que avives el fuego del don de Dios que está en ti por la imposición de mis manos." } },
    quiz: "fuego",
  },
  ofrendas: {
    id: "ofrendas",
    titulo: "La ofrenda del pobre",
    texto: "Quien no podía traer un cordero traía dos tórtolas o dos palominos. Dios recibía la ofrenda del pobre igual que la del rico.",
    verso: { ref: "Levítico 5:7", text: "Y si no tuviere lo suficiente para un cordero, traerá a Jehová en expiación por su pecado que cometió, dos tórtolas o dos palominos, el uno para expiación, y el otro para holocausto." },
    hoy: { texto: "María y José, siendo pobres, presentaron palomas por Jesús en este mismo templo.", verso: { ref: "Lucas 2:24", text: "y para ofrecer conforme a lo que se dice en la ley del Señor: Un par de tórtolas, o dos palominos." } },
    quiz: "palomas",
  },
  fuente: {
    id: "fuente",
    titulo: "Lavarse antes de servir",
    texto: "Antes de acercarse al altar o entrar al santuario, los sacerdotes se lavaban las manos y los pies. En el templo de Salomón lo hacían en el gran mar de bronce, sobre doce bueyes.",
    verso: { ref: "Éxodo 30:19-20", text: "Y de ella se lavarán Aarón y sus hijos las manos y los pies. Cuando entren en el tabernáculo de reunión, se lavarán con agua, para que no mueran." },
    hoy: { texto: "Nos acercamos a Dios con un corazón limpio por Cristo.", verso: { ref: "Hebreos 10:22", text: "acerquémonos con corazón sincero, en plena certidumbre de fe, purificados los corazones de mala conciencia, y lavados los cuerpos con agua pura." } },
    quiz: "fuente",
  },
  levitas: {
    id: "levitas",
    titulo: "Los levitas ayudan",
    texto: "Los sacerdotes eran pocos y no daban abasto, así que sus hermanos los levitas les ayudaron hasta terminar la obra.",
    verso: { ref: "2 Crónicas 29:34", text: "Mas los sacerdotes eran pocos, y no bastaban para desollar los holocaustos; y así sus hermanos los levitas les ayudaron hasta que acabaron la obra." },
    hoy: { texto: "En la obra de Dios nadie sirve solo: cada miembro tiene su parte.", verso: { ref: "1 Corintios 12:27", text: "Vosotros, pues, sois el cuerpo de Cristo, y miembros cada uno en particular." } },
    quiz: "levitas",
  },
  sacerdote: {
    id: "sacerdote",
    titulo: "La consagración",
    texto: "Para servir, los hijos de Aarón eran lavados con agua, vestidos con túnica de lino, cinto y tiara, y ungidos con aceite.",
    verso: { ref: "Éxodo 28:40", text: "Y para los hijos de Aarón harás túnicas; también les harás cintos, y les harás tiaras para honra y hermosura." },
    hoy: { texto: "En Cristo, todos los creyentes somos sacerdotes para anunciar sus virtudes.", verso: { ref: "1 Pedro 2:9", text: "Mas vosotros sois linaje escogido, real sacerdocio, nación santa, pueblo adquirido por Dios, para que anunciéis las virtudes de aquel que os llamó de las tinieblas a su luz admirable." } },
  },
  santuario: {
    id: "santuario",
    titulo: "El Lugar Santo",
    texto: "Dentro del templo, solo los sacerdotes entraban al Lugar Santo: al sur el candelero, al norte la mesa de los panes y, frente al velo, el altar del incienso.",
    verso: { ref: "2 Crónicas 29:7", text: "Y aun cerraron las puertas del pórtico, y apagaron las lámparas; no quemaron incienso, ni sacrificaron holocausto en el santuario al Dios de Israel." },
    hoy: { texto: "Ahora todos podemos acercarnos a Dios por medio de Jesús.", verso: { ref: "Hebreos 4:16", text: "Acerquémonos, pues, confiadamente al trono de la gracia, para alcanzar misericordia y hallar gracia para el oportuno socorro." } },
  },
  prensa: {
    id: "prensa",
    titulo: "Aceite puro",
    texto: "El aceite para las lámparas se hacía con olivas machacadas, el más puro, para que la luz ardiera limpia y continua.",
    verso: { ref: "Levítico 24:2", text: "Manda a los hijos de Israel que te traigan para el alumbrado aceite puro de olivas machacadas, para hacer arder las lámparas continuamente." },
    hoy: { texto: "Lo que damos a Dios, lo damos con lo mejor y con cuidado.", verso: { ref: "Colosenses 3:23", text: "Y todo lo que hagáis, hacedlo de corazón, como para el Señor y no para los hombres." } },
    quiz: "aceite",
  },
  candelero: {
    id: "candelero",
    titulo: "La luz de la noche",
    texto: "Las siete lámparas del candelero de oro se preparaban cada tarde y ardían toda la noche delante de Dios.",
    verso: { ref: "Levítico 24:3", text: "Fuera del velo del testimonio, en el tabernáculo de reunión, las dispondrá Aarón desde la tarde hasta la mañana delante de Jehová; es estatuto perpetuo por vuestras generaciones." },
    hoy: { texto: "Jesús es la luz que no se apaga.", verso: { ref: "Juan 8:12", text: "Otra vez Jesús les habló, diciendo: Yo soy la luz del mundo; el que me sigue, no andará en tinieblas, sino que tendrá la luz de la vida." } },
    quiz: "lamparas",
  },
  horno: {
    id: "horno",
    titulo: "Los panes de cada sábado",
    texto: "Los levitas hijos de Coat cocían los panes de la proposición y los ponían en orden cada día de reposo.",
    verso: { ref: "1 Crónicas 9:32", text: "Y algunos de los hijos de Coat, y de sus hermanos, tenían a su cargo los panes de la proposición, los cuales ponían por orden cada día de reposo." },
    hoy: { texto: "Dios provee el pan de cada día.", verso: { ref: "Mateo 6:11", text: "El pan nuestro de cada día, dánoslo hoy." } },
    quiz: "coat",
  },
  mesa: {
    id: "mesa",
    titulo: "Doce panes delante de Dios",
    texto: "Sobre la mesa de oro había doce panes, uno por cada tribu de Israel: todo el pueblo siempre delante de Dios.",
    verso: { ref: "Levítico 24:5", text: "Y tomarás flor de harina, y cocerás de ella doce tortas; cada torta será de dos décimas de efa." },
    hoy: { texto: "Jesús es el pan que sacia de verdad.", verso: { ref: "Juan 6:35", text: "Jesús les dijo: Yo soy el pan de vida; el que a mí viene, nunca tendrá hambre; y el que en mí cree, no tendrá sed jamás." } },
    quiz: "panes",
  },
  camIncienso: {
    id: "camIncienso",
    titulo: "El incienso santo",
    texto: "El incienso se preparaba con especias aromáticas según una receta santa, solo para Dios.",
    verso: { ref: "Éxodo 30:7", text: "Y Aarón quemará incienso aromático sobre él; cada mañana cuando aliste las lámparas lo quemará." },
    hoy: { texto: "Nuestras oraciones son un perfume delante de Dios.", verso: { ref: "Apocalipsis 5:8", text: "todos tenían arpas, y copas de oro llenas de incienso, que son las oraciones de los santos" } },
  },
  altarIncienso: {
    id: "altarIncienso",
    titulo: "La oración sube como incienso",
    texto: "Mañana y tarde el sacerdote quemaba incienso frente al velo mientras el pueblo oraba afuera.",
    verso: { ref: "Éxodo 30:8", text: "Y cuando Aarón encienda las lámparas al anochecer, quemará el incienso; rito perpetuo delante de Jehová por vuestras generaciones." },
    hoy: { texto: "Podemos orar en todo tiempo.", verso: { ref: "Salmo 141:2", text: "Suba mi oración delante de ti como el incienso, El don de mis manos como la ofrenda de la tarde." } },
    quiz: "incienso",
  },
  coro: {
    id: "coro",
    titulo: "El cántico de Jehová",
    texto: "Ezequías puso levitas con címbalos, salterios y arpas, como había mandado David. Cuando comenzó el holocausto, comenzó también el cántico.",
    verso: { ref: "2 Crónicas 29:25", text: "Puso también levitas en la casa de Jehová con címbalos, salterios, y arpas, conforme al mandamiento de David, de Gad vidente del rey, y del profeta Natán: porque aquel mandamiento procedía de Jehová por medio de sus profetas." },
    hoy: { texto: "La alabanza acompaña la vida del que sirve a Dios.", verso: { ref: "2 Crónicas 29:30", text: "y ellos alabaron con gran alegría, y se inclinaron y adoraron." } },
    quiz: "instrumentos",
  },
  camaras: {
    id: "camaras",
    titulo: "Cámaras para la abundancia",
    texto: "El pueblo trajo tantas primicias y diezmos que se hicieron montones. Ezequías mandó preparar cámaras en el templo y el levita Conanías quedó a cargo.",
    verso: { ref: "2 Crónicas 31:10-11", text: "Desde que comenzaron a traer las ofrendas a la casa de Jehová, hemos comido y nos hemos saciado, y nos ha sobrado mucho: porque Jehová ha bendecido su pueblo. Entonces mandó Ezequías que preparasen cámaras en la casa de Jehová; y las prepararon." },
    hoy: { texto: "Dios bendice al pueblo que le da con fidelidad.", verso: { ref: "2 Corintios 9:7", text: "Cada uno dé como propuso en su corazón: no con tristeza, ni por necesidad, porque Dios ama al dador alegre." } },
    quiz: "camaras",
  },
  ensenanza: {
    id: "ensenanza",
    titulo: "El sacerdote enseña",
    texto: "Los sacerdotes no solo ofrecían sacrificios: también enseñaban al pueblo la ley de Dios y respondían sus preguntas.",
    verso: { ref: "Malaquías 2:7", text: "Porque los labios del sacerdote han de guardar la sabiduría, y de su boca el pueblo buscará la ley; porque mensajero es de Jehová de los ejércitos." },
    hoy: { texto: "Conocer la Palabra nos prepara para ayudar a otros.", verso: { ref: "Levítico 10:11", text: "y para enseñar a los hijos de Israel todos los estatutos que Jehová les ha dicho por medio de Moisés." } },
    quiz: "sabiduria",
  },
  bendicion: {
    id: "bendicion",
    titulo: "La bendición sacerdotal",
    texto: "Los sacerdotes, puestos en pie, bendecían al pueblo con las palabras que Dios dio a Aarón.",
    verso: { ref: "Números 6:24-26", text: "Jehová te bendiga, y te guarde; Jehová haga resplandecer su rostro sobre ti, y tenga de ti misericordia; Jehová alce sobre ti su rostro, y ponga en ti paz." },
    hoy: { texto: "La oración de los que bendicen llega hasta el cielo.", verso: { ref: "2 Crónicas 30:27", text: "Después los sacerdotes y levitas, puestos en pie, bendijeron al pueblo: y la voz de ellos fue oída, y su oración llegó a la habitación de su santuario, al cielo." } },
  },
  sumo: {
    id: "sumo",
    titulo: "Vestiduras para honra y hermosura",
    texto: "El sumo sacerdote llevaba el efod, el pectoral con doce piedras (los nombres de las tribus sobre su corazón), el manto azul con campanillas y granadas, y la mitra con la placa de oro.",
    verso: { ref: "Éxodo 28:36", text: "Harás además una lámina de oro fino, y grabarás en ella como grabadura de sello: SANTIDAD A JEHOVÁ." },
    hoy: { texto: "Jesús es nuestro gran sumo sacerdote, que nos comprende.", verso: { ref: "Hebreos 4:14", text: "Por tanto, teniendo un gran sumo sacerdote que traspasó los cielos, Jesús el Hijo de Dios, retengamos nuestra profesión." } },
  },
  expiacion: {
    id: "expiacion",
    titulo: "El Día de la Expiación",
    texto: "Una vez al año, el sumo sacerdote dejaba sus vestiduras de gloria, se lavaba, se vestía de lino blanco y entraba al Lugar Santísimo por todo el pueblo.",
    verso: { ref: "Levítico 16:30", text: "Porque en este día se hará expiación por vosotros, y seréis limpios de todos vuestros pecados delante de Jehová." },
    hoy: { texto: "Jesús entró una vez para siempre, y el velo se rasgó: el camino a Dios está abierto.", verso: { ref: "Hebreos 9:12", text: "y no por sangre de machos cabríos ni de becerros, sino por su propia sangre, entró una vez para siempre en el Lugar Santísimo, habiendo obtenido eterna redención." } },
  },
};

export const LESSON_ORDER = [
  "puertas", "lenera", "altar", "ofrendas", "fuente", "levitas", "sacerdote", "santuario", "prensa", "candelero",
  "horno", "mesa", "camIncienso", "altarIncienso", "coro", "camaras", "ensenanza", "bendicion", "sumo", "expiacion",
];

// ---------------------------------------------------------------- preguntas
export type Quiz = { id: string; pregunta: string; opciones: [string, string, string]; correcta: 0 | 1 | 2; explica: string; ref: string };

export const QUIZZES: Quiz[] = [
  { id: "puertas", pregunta: "¿Qué rey abrió y reparó las puertas del templo en el primer mes de su reinado?", opciones: ["Ezequías", "Acaz", "Salomón"], correcta: 0, explica: "Ezequías empezó su reinado abriendo la casa de Jehová.", ref: "2 Crónicas 29:3" },
  { id: "fuego", pregunta: "Según Levítico 6:13, ¿qué no debía pasar nunca con el fuego del altar?", opciones: ["Que se usara de noche", "Que se apagara", "Que se agrandara"], correcta: 1, explica: "«El fuego arderá continuamente en el altar; no se apagará».", ref: "Levítico 6:13" },
  { id: "lena", pregunta: "¿Qué ponía el sacerdote sobre el altar cada mañana?", opciones: ["Agua", "Incienso", "Leña"], correcta: 2, explica: "El sacerdote ponía leña cada mañana para que el fuego no se apagara.", ref: "Levítico 6:12" },
  { id: "palomas", pregunta: "¿Qué traía la familia que no alcanzaba para un cordero?", opciones: ["Dos tórtolas o dos palominos", "Un buey", "Monedas de plata"], correcta: 0, explica: "Dios recibía la ofrenda del pobre igual que la del rico.", ref: "Levítico 5:7" },
  { id: "maria", pregunta: "¿Qué ofrecieron María y José al presentar a Jesús en el templo?", opciones: ["Un cordero", "Un par de tórtolas o dos palominos", "Incienso y mirra"], correcta: 1, explica: "Eran pobres y ofrecieron lo que pedía la ley para ellos.", ref: "Lucas 2:24" },
  { id: "fuente", pregunta: "¿Para qué se lavaban los sacerdotes en la fuente de bronce?", opciones: ["Para refrescarse del calor", "Para lavar su ropa", "Para acercarse limpios a servir"], correcta: 2, explica: "Se lavaban las manos y los pies antes de entrar o acercarse al altar.", ref: "Éxodo 30:19-20" },
  { id: "bueyes", pregunta: "¿Sobre cuántos bueyes descansaba el mar de bronce del templo de Salomón?", opciones: ["Doce", "Siete", "Cuatro"], correcta: 0, explica: "Tres miraban a cada punto cardinal.", ref: "1 Reyes 7:25" },
  { id: "columnas", pregunta: "¿Cómo se llamaban las dos columnas del pórtico del templo?", opciones: ["Sadoc y Abiatar", "Jaquín y Boaz", "Aarón y Hur"], correcta: 1, explica: "Salomón llamó Jaquín a la del lado derecho y Boaz a la del izquierdo.", ref: "1 Reyes 7:21" },
  { id: "aceite", pregunta: "¿Con qué aceite ardían las lámparas del candelero?", opciones: ["Aceite de sésamo", "Grasa de cordero", "Aceite puro de olivas machacadas"], correcta: 2, explica: "Era el aceite más puro, para una luz limpia y continua.", ref: "Levítico 24:2" },
  { id: "lamparas", pregunta: "¿Desde cuándo hasta cuándo ardían las lámparas?", opciones: ["Desde la tarde hasta la mañana", "Solo al mediodía", "Solo los sábados"], correcta: 0, explica: "Se preparaban cada tarde y ardían toda la noche delante de Jehová.", ref: "Levítico 24:3" },
  { id: "siete", pregunta: "¿Cuántas lámparas tenía el candelero de oro?", opciones: ["Doce", "Siete", "Tres"], correcta: 1, explica: "El candelero tenía siete lamparillas.", ref: "Éxodo 25:37" },
  { id: "panes", pregunta: "¿Cuántos panes se ponían en la mesa delante de Jehová?", opciones: ["Siete", "Cuarenta", "Doce"], correcta: 2, explica: "Doce panes: uno por cada tribu de Israel.", ref: "Levítico 24:5" },
  { id: "sabado", pregunta: "¿Cada cuánto se cambiaban los panes de la mesa?", opciones: ["Cada día de reposo", "Cada día", "Una vez al año"], correcta: 0, explica: "Se ponían en orden cada día de reposo.", ref: "Levítico 24:8" },
  { id: "coat", pregunta: "¿Qué familia de levitas tenía a cargo los panes de la proposición?", opciones: ["Los hijos de Gersón", "Los hijos de Coat", "Los hijos de Merari"], correcta: 1, explica: "Algunos de los hijos de Coat los preparaban cada día de reposo.", ref: "1 Crónicas 9:32" },
  { id: "incienso", pregunta: "¿Cuándo se quemaba el incienso en el altar de oro?", opciones: ["Una vez al año", "Solo de noche", "Cada mañana y cada tarde"], correcta: 2, explica: "Al preparar las lámparas en la mañana y al encenderlas al anochecer.", ref: "Éxodo 30:7-8" },
  { id: "salmo141", pregunta: "Según el Salmo 141:2, ¿qué sube delante de Dios como el incienso?", opciones: ["La oración", "El fuego", "El humo del pan"], correcta: 0, explica: "«Suba mi oración delante de ti como el incienso».", ref: "Salmo 141:2" },
  { id: "copas", pregunta: "En Apocalipsis 5:8, ¿qué son las copas de oro llenas de incienso?", opciones: ["Ofrendas de los reyes", "Las oraciones de los santos", "Las lámparas del templo"], correcta: 1, explica: "Las copas de incienso son las oraciones del pueblo de Dios.", ref: "Apocalipsis 5:8" },
  { id: "levitas", pregunta: "¿Por qué los levitas ayudaron con los holocaustos en tiempos de Ezequías?", opciones: ["Porque era sábado", "Porque el rey se lo prohibió a los sacerdotes", "Porque los sacerdotes eran pocos"], correcta: 2, explica: "Los sacerdotes no bastaban, y sus hermanos los levitas les ayudaron.", ref: "2 Crónicas 29:34" },
  { id: "instrumentos", pregunta: "¿Con qué instrumentos alababan los levitas en el templo?", opciones: ["Címbalos, salterios y arpas", "Tambores de guerra", "Flautas de pastores"], correcta: 0, explica: "Como lo había mandado David, por medio de los profetas.", ref: "2 Crónicas 29:25" },
  { id: "azarias", pregunta: "¿Quién era el sumo sacerdote en los días de Ezequías?", opciones: ["Elí", "Azarías, de la casa de Sadoc", "Aarón"], correcta: 1, explica: "Azarías le respondió al rey sobre la abundancia de las ofrendas.", ref: "2 Crónicas 31:10" },
  { id: "camaras", pregunta: "¿Qué mandó preparar Ezequías para guardar la abundancia de ofrendas?", opciones: ["Graneros en Egipto", "Un palacio nuevo", "Cámaras en la casa de Jehová"], correcta: 2, explica: "Se prepararon cámaras en el templo para los diezmos y las primicias.", ref: "2 Crónicas 31:11" },
  { id: "conanias", pregunta: "¿Quién quedó a cargo de las cámaras de los diezmos?", opciones: ["El levita Conanías", "El rey Ezequías", "Un sacerdote de Egipto"], correcta: 0, explica: "Conanías fue el principal y su hermano Simei el segundo.", ref: "2 Crónicas 31:12" },
  { id: "pascua", pregunta: "¿Qué celebró Jerusalén con un gozo que no se veía desde los días de Salomón?", opciones: ["La cosecha de olivas", "La Pascua", "La coronación del rey"], correcta: 1, explica: "«Hubo entonces gran regocijo en Jerusalén».", ref: "2 Crónicas 30:26" },
  { id: "placa", pregunta: "¿Qué decía la placa de oro de la mitra del sumo sacerdote?", opciones: ["REY DE ISRAEL", "CASA DE DAVID", "SANTIDAD A JEHOVÁ"], correcta: 2, explica: "Grabada como un sello sobre la frente del sumo sacerdote.", ref: "Éxodo 28:36" },
  { id: "piedras", pregunta: "¿Cuántas piedras preciosas tenía el pectoral del sumo sacerdote?", opciones: ["Doce", "Siete", "Diez"], correcta: 0, explica: "Una por cada tribu de Israel, con su nombre grabado.", ref: "Éxodo 28:17-21" },
  { id: "manto", pregunta: "¿Qué tenía el borde del manto azul del sumo sacerdote?", opciones: ["Flecos negros", "Campanillas de oro y granadas", "Monedas de plata"], correcta: 1, explica: "Se oía su sonido cuando entraba y salía del santuario.", ref: "Éxodo 28:33-35" },
  { id: "lino", pregunta: "¿Con qué ropa entraba el sumo sacerdote al Lugar Santísimo en el Día de la Expiación?", opciones: ["El manto azul con oro", "Ropa de luto", "Vestiduras de lino blanco"], correcta: 2, explica: "Ese día dejaba sus vestiduras de gloria y se vestía de lino.", ref: "Levítico 16:4" },
  { id: "unavez", pregunta: "¿Cuántas veces al año entraba el sumo sacerdote al Lugar Santísimo?", opciones: ["Una", "Siete", "Cada sábado"], correcta: 0, explica: "Solo el sumo sacerdote, una vez al año.", ref: "Hebreos 9:7" },
  { id: "sabiduria", pregunta: "Según Malaquías 2:7, ¿qué deben guardar los labios del sacerdote?", opciones: ["Los secretos del rey", "La sabiduría", "El silencio"], correcta: 1, explica: "De su boca el pueblo buscará la ley.", ref: "Malaquías 2:7" },
  { id: "velo", pregunta: "¿Qué pasó con el velo del templo cuando murió Jesús?", opciones: ["Lo quitaron los sacerdotes", "Se quemó", "Se rasgó en dos, de arriba abajo"], correcta: 2, explica: "El camino al Lugar Santísimo quedó abierto.", ref: "Mateo 27:51" },
  { id: "gransumo", pregunta: "Según Hebreos 4:14, ¿quién es nuestro gran sumo sacerdote?", opciones: ["Jesús, el Hijo de Dios", "Aarón", "Azarías"], correcta: 0, explica: "Jesús traspasó los cielos y nos invita a acercarnos con confianza.", ref: "Hebreos 4:14" },
  { id: "bendicion", pregunta: "¿Cómo empieza la bendición que Dios dio a los sacerdotes?", opciones: ["«Paz a esta casa»", "«Jehová te bendiga, y te guarde»", "«Ve en paz»"], correcta: 1, explica: "Es la bendición sacerdotal de Números 6.", ref: "Números 6:24" },
  { id: "realsacerdocio", pregunta: "Según 1 Pedro 2:9, ¿quiénes son hoy «real sacerdocio»?", opciones: ["Solo los levitas", "Solo los reyes", "Los que creen en Cristo"], correcta: 2, explica: "Todo creyente sirve a Dios y anuncia sus virtudes.", ref: "1 Pedro 2:9" },
  { id: "luz", pregunta: "¿Qué dijo Jesús en Juan 8:12?", opciones: ["«Yo soy la luz del mundo»", "«Yo soy el pan de vida»", "«Yo soy la puerta»"], correcta: 0, explica: "Como el candelero en la noche, Jesús ilumina.", ref: "Juan 8:12" },
  { id: "pan", pregunta: "¿Qué dijo Jesús en Juan 6:35?", opciones: ["«Yo soy la vid»", "«Yo soy el pan de vida»", "«Yo soy el buen pastor»"], correcta: 1, explica: "Como los panes delante de Dios, Jesús sacia de verdad.", ref: "Juan 6:35" },
  { id: "cerrado", pregunta: "Antes de Ezequías, ¿cómo estaba el templo?", opciones: ["Lleno de gente cada día", "Cerrado, con las lámparas apagadas y sin incienso", "Recién construido"], correcta: 1, explica: "Habían cerrado el pórtico, apagado las lámparas y dejado de ofrecer.", ref: "2 Crónicas 29:7" },
  { id: "dias", pregunta: "¿En cuántos días santificaron la casa de Jehová?", opciones: ["Siete", "Cuarenta", "Dieciséis"], correcta: 2, explica: "Empezaron el día primero del mes primero y terminaron el dieciséis.", ref: "2 Crónicas 29:17" },
  { id: "tribu", pregunta: "¿De qué tribu eran los sacerdotes y los levitas?", opciones: ["Leví", "Judá", "Benjamín"], correcta: 0, explica: "Los sacerdotes eran los descendientes de Aarón, de la tribu de Leví.", ref: "Números 3:6-10" },
  { id: "primero", pregunta: "¿Quién fue el primer sumo sacerdote de Israel?", opciones: ["Moisés", "Samuel", "Aarón"], correcta: 2, explica: "Dios mandó hacer vestiduras sagradas para Aarón.", ref: "Éxodo 28:1-2" },
  { id: "trompetas", pregunta: "¿Qué tocaban los sacerdotes, los hijos de Aarón?", opciones: ["Las trompetas", "El arpa", "El pandero"], correcta: 0, explica: "Las trompetas de plata eran de los sacerdotes.", ref: "Números 10:8" },
  { id: "continuo", pregunta: "¿Cuántos corderos se ofrecían cada día en el holocausto continuo?", opciones: ["Siete", "Dos: uno en la mañana y otro en la tarde", "Uno a la semana"], correcta: 1, explica: "Era el sacrificio de la mañana y el de la tarde.", ref: "Números 28:3-4" },
  { id: "colores", pregunta: "¿De qué colores era el velo del templo?", opciones: ["Blanco y oro", "Verde y negro", "Azul, púrpura y carmesí"], correcta: 2, explica: "Con querubines bordados.", ref: "2 Crónicas 3:14" },
  { id: "avivar", pregunta: "¿Qué le aconsejó Pablo a Timoteo en 2 Timoteo 1:6?", opciones: ["Que avive el fuego del don de Dios", "Que construya un templo", "Que vuelva a Jerusalén"], correcta: 0, explica: "El fuego del altar nos recuerda avivar lo que Dios puso en nosotros.", ref: "2 Timoteo 1:6" },
  // ---- más preguntas: el templo en toda la Biblia
  { id: "samuel", pregunta: "¿Quién dormía en el templo de Jehová cuando Dios lo llamó por su nombre?", opciones: ["David", "Samuel", "Elí"], correcta: 1, explica: "Samuel respondió: «Habla, porque tu siervo oye».", ref: "1 Samuel 3:3-10" },
  { id: "dedicacion", pregunta: "Cuando Salomón dedicó el templo, ¿qué llenó la casa de Jehová?", opciones: ["Agua", "Humo negro", "Una nube"], correcta: 2, explica: "La gloria de Jehová había llenado la casa.", ref: "1 Reyes 8:10-11" },
  { id: "fuegocielo", pregunta: "Al terminar Salomón de orar, ¿qué consumió el holocausto?", opciones: ["Fuego que descendió de los cielos", "Una lámpara del templo", "Un rayo del sol"], correcta: 0, explica: "Y la gloria de Jehová llenó la casa.", ref: "2 Crónicas 7:1" },
  { id: "nino12", pregunta: "¿Qué edad tenía Jesús cuando se quedó en el templo con los maestros?", opciones: ["Siete años", "Treinta años", "Doce años"], correcta: 2, explica: "Lo hallaron sentado en medio de los doctores, oyéndoles y preguntándoles.", ref: "Lucas 2:42-46" },
  { id: "simeon", pregunta: "¿Quién tomó al niño Jesús en sus brazos en el templo y bendijo a Dios?", opciones: ["Zacarías", "Simeón", "Nicodemo"], correcta: 1, explica: "«Porque han visto mis ojos tu salvación».", ref: "Lucas 2:25-30" },
  { id: "anaprofetisa", pregunta: "¿Cómo se llamaba la profetisa que no se apartaba del templo, sirviendo de noche y de día?", opciones: ["Ana", "Débora", "Miriam"], correcta: 0, explica: "Servía con ayunos y oraciones, y hablaba del niño a todos.", ref: "Lucas 2:36-38" },
  { id: "zacarias", pregunta: "¿Qué servicio le tocó a Zacarías cuando el ángel se le apareció en el templo?", opciones: ["Abrir las puertas", "Ofrecer el incienso", "Cocer los panes"], correcta: 1, explica: "Le tocó en suerte ofrecer el incienso, entrando en el santuario.", ref: "Lucas 1:8-11" },
  { id: "mercaderes", pregunta: "Cuando Jesús echó a los vendedores del templo, ¿cómo dijo que sería llamada su casa?", opciones: ["Casa de reyes", "Casa de tesoros", "Casa de oración"], correcta: 2, explica: "«Mi casa, casa de oración será llamada».", ref: "Mateo 21:13" },
  { id: "viuda", pregunta: "¿Qué echó la viuda pobre en el arca de las ofrendas?", opciones: ["Dos blancas", "Una moneda de oro", "Un cordero"], correcta: 0, explica: "Jesús dijo que echó más que todos, porque dio todo su sustento.", ref: "Marcos 12:41-44" },
  { id: "cuerpotemplo", pregunta: "Según 1 Corintios 6:19, ¿qué es nuestro cuerpo?", opciones: ["Una casa de barro", "Templo del Espíritu Santo", "Un altar de piedra"], correcta: 1, explica: "«¿O ignoráis que vuestro cuerpo es templo del Espíritu Santo?»", ref: "1 Corintios 6:19" },
  { id: "destruid", pregunta: "Jesús dijo: «Destruid este templo, y en tres días lo levantaré». ¿De qué templo hablaba?", opciones: ["Del templo de Salomón", "De una sinagoga", "Del templo de su cuerpo"], correcta: 2, explica: "Él hablaba del templo de su cuerpo.", ref: "Juan 2:19-21" },
  { id: "piedrasvivas", pregunta: "Según 1 Pedro 2:5, ¿cómo somos edificados los creyentes?", opciones: ["Como piedras vivas, casa espiritual", "Como columnas de bronce", "Como muros de cedro"], correcta: 0, explica: "Para ofrecer sacrificios espirituales aceptables a Dios por medio de Jesucristo.", ref: "1 Pedro 2:5" },
  { id: "alabanza", pregunta: "Según Hebreos 13:15, ¿qué sacrificio ofrecemos siempre a Dios por medio de Jesús?", opciones: ["Sacrificio de corderos", "Sacrificio de alabanza", "Sacrificio de oro"], correcta: 1, explica: "Es decir, fruto de labios que confiesan su nombre.", ref: "Hebreos 13:15" },
  { id: "sacrificiovivo", pregunta: "Según Romanos 12:1, ¿cómo debemos presentar nuestros cuerpos?", opciones: ["Con ropas de lino", "En ayuno de cuarenta días", "En sacrificio vivo, santo, agradable a Dios"], correcta: 2, explica: "Que es vuestro culto racional.", ref: "Romanos 12:1" },
  { id: "corderodedios", pregunta: "¿Cómo llamó Juan el Bautista a Jesús?", opciones: ["El Cordero de Dios", "El nuevo Aarón", "El rey del templo"], correcta: 0, explica: "«He aquí el Cordero de Dios, que quita el pecado del mundo».", ref: "Juan 1:29" },
  { id: "josias", pregunta: "En días del rey Josías, ¿qué halló el sumo sacerdote Hilcías en la casa de Jehová?", opciones: ["Una corona de oro", "El libro de la ley", "La vara de Aarón"], correcta: 1, explica: "Al oírlo, el rey rasgó sus vestidos y buscó a Dios.", ref: "2 Reyes 22:8-11" },
  { id: "altarprimero", pregunta: "Al volver del cautiverio, ¿qué edificaron primero, antes que el templo?", opciones: ["Las murallas", "El palacio", "El altar"], correcta: 2, explica: "Edificaron el altar y ofrecieron holocaustos por la mañana y por la tarde.", ref: "Esdras 3:2-3" },
  { id: "cimientos", pregunta: "Cuando se echaron los cimientos del segundo templo, ¿qué hizo el pueblo?", opciones: ["Gritó de júbilo, y muchos ancianos lloraron", "Se fue en silencio", "Encendió fogatas en la ciudad"], correcta: 0, explica: "No se podía distinguir el clamor de alegría del llanto.", ref: "Esdras 3:11-13" },
  { id: "hageo", pregunta: "¿Qué profeta preguntó si era tiempo de vivir en casas artesonadas mientras la casa de Dios estaba desierta?", opciones: ["Jonás", "Hageo", "Amós"], correcta: 1, explica: "Animó al pueblo a reedificar el templo.", ref: "Hageo 1:4" },
  { id: "lenanehemias", pregunta: "En días de Nehemías, ¿qué ofrenda se echaba en suerte para que el fuego del altar no faltara?", opciones: ["La ofrenda del oro", "La ofrenda del agua", "La ofrenda de la leña"], correcta: 2, explica: "Traían leña a la casa de Dios en los tiempos determinados cada año.", ref: "Nehemías 10:34" },
  { id: "pulpito", pregunta: "¿Desde dónde leyó Esdras el libro de la ley a todo el pueblo?", opciones: ["Desde un púlpito de madera", "Desde el techo del templo", "Desde una barca"], correcta: 0, explica: "El pueblo estuvo atento desde el alba hasta el mediodía.", ref: "Nehemías 8:3-4" },
  { id: "tabernaculos", pregunta: "En la fiesta de los tabernáculos, ¿dónde vivía el pueblo durante siete días?", opciones: ["En tiendas de cuero", "En tabernáculos hechos de ramas", "Dentro del templo"], correcta: 1, explica: "Para recordar cómo Dios los hizo habitar en tabernáculos al sacarlos de Egipto.", ref: "Levítico 23:42-43; Nehemías 8:16" },
  { id: "pentecostes", pregunta: "¿Cuántos días se contaban desde la Pascua hasta la fiesta de las semanas (Pentecostés)?", opciones: ["Siete", "Cuarenta", "Cincuenta"], correcta: 2, explica: "Siete semanas cumplidas: cincuenta días.", ref: "Levítico 23:15-16" },
  { id: "trompetasplata", pregunta: "Además de las fiestas, ¿para qué servían las trompetas de plata?", opciones: ["Para convocar al pueblo y mover los campamentos", "Para despertar al rey", "Para espantar a los animales"], correcta: 0, explica: "Moisés las hizo de plata labrada a martillo.", ref: "Números 10:2" },
  { id: "querubinesolivo", pregunta: "¿De qué madera eran los dos grandes querubines del Lugar Santísimo de Salomón?", opciones: ["De cedro sin cubrir", "De olivo, cubiertos de oro", "De acacia con bronce"], correcta: 1, explica: "Cada uno tenía diez codos de altura.", ref: "1 Reyes 6:23-28" },
  { id: "tablas", pregunta: "¿Qué había dentro del arca cuando la llevaron al templo de Salomón?", opciones: ["La vara de Moisés", "Un cántaro de agua", "Las dos tablas de piedra"], correcta: 2, explica: "Las tablas que Moisés había puesto allí en Horeb.", ref: "1 Reyes 8:9" },
  { id: "sieteanios", pregunta: "¿Cuántos años tardó Salomón en edificar el templo?", opciones: ["Siete", "Cuarenta", "Tres"], correcta: 0, explica: "«Y lo edificó, pues, en siete años».", ref: "1 Reyes 6:38" },
  { id: "martillos", pregunta: "Mientras se edificaba el templo de Salomón, ¿qué no se oía en la casa?", opciones: ["Los cantos de los levitas", "Martillos ni hachas", "El viento"], correcta: 1, explica: "Se edificó con piedras que traían ya acabadas.", ref: "1 Reyes 6:7" },
  { id: "hiram", pregunta: "¿De dónde vino Hiram, el artífice que hizo las columnas y el mar de bronce?", opciones: ["De Egipto", "De Babilonia", "De Tiro"], correcta: 2, explica: "Era lleno de sabiduría para toda obra de bronce.", ref: "1 Reyes 7:13-14" },
  { id: "betel", pregunta: "¿Qué dijo Jacob al despertar en Bet-el?", opciones: ["«No es otra cosa que casa de Dios, y puerta del cielo»", "«Aquí haré mi casa»", "«Este lugar es de mis padres»"], correcta: 0, explica: "Por eso llamó a aquel lugar Bet-el, que quiere decir casa de Dios.", ref: "Génesis 28:17" },
  { id: "salmo84", pregunta: "Según el Salmo 84:10, ¿qué es mejor que mil días fuera de los atrios de Dios?", opciones: ["Un año de riquezas", "Un día en sus atrios", "Una noche de descanso"], correcta: 1, explica: "«Escogería antes estar a la puerta de la casa de mi Dios».", ref: "Salmo 84:10" },
  { id: "salmo122", pregunta: "¿Cómo empieza el Salmo 122?", opciones: ["«Jehová es mi pastor»", "«Alzaré mis ojos a los montes»", "«Yo me alegré con los que me decían: A la casa de Jehová iremos»"], correcta: 2, explica: "Es un cántico de los que subían a Jerusalén.", ref: "Salmo 122:1" },
  { id: "salmo100", pregunta: "Según el Salmo 100:4, ¿cómo entramos por las puertas de Dios?", opciones: ["Con acción de gracias", "Con temor y silencio", "Con oro y plata"], correcta: 0, explica: "«Entrad por sus puertas con acción de gracias, por sus atrios con alabanza».", ref: "Salmo 100:4" },
  { id: "heredad", pregunta: "¿Por qué la tribu de Leví no recibió tierra como las demás?", opciones: ["Porque perdió una guerra", "Porque Jehová era su heredad", "Porque vivía en Egipto"], correcta: 1, explica: "«Por lo cual Leví no tuvo parte ni heredad con sus hermanos; Jehová es su heredad».", ref: "Deuteronomio 10:9" },
  { id: "treinta", pregunta: "Según Números 4, ¿desde qué edad servían los levitas en el tabernáculo?", opciones: ["Desde los doce años", "Desde los sesenta años", "Desde los treinta años"], correcta: 2, explica: "De treinta años arriba hasta cincuenta años.", ref: "Números 4:3" },
  { id: "uzias", pregunta: "¿Qué le pasó al rey Uzías por quemar incienso, que solo correspondía a los sacerdotes?", opciones: ["Le brotó lepra en la frente", "Se quedó ciego", "Perdió la corona en una batalla"], correcta: 0, explica: "El sacerdote Azarías y ochenta sacerdotes le dijeron que no le correspondía.", ref: "2 Crónicas 26:16-21" },
  { id: "nadab", pregunta: "¿Por qué murieron Nadab y Abiú, hijos de Aarón?", opciones: ["No se lavaron", "Ofrecieron fuego extraño", "Comieron del pan santo"], correcta: 1, explica: "Ofrecieron delante de Jehová fuego extraño, que él nunca les mandó.", ref: "Levítico 10:1-2" },
  { id: "uncion", pregunta: "¿Qué derramó Moisés sobre la cabeza de Aarón para consagrarlo?", opciones: ["Agua del Jordán", "Vino nuevo", "El aceite de la unción"], correcta: 2, explica: "Y lo ungió para santificarlo.", ref: "Levítico 8:12" },
  { id: "salmo133", pregunta: "Según el Salmo 133, ¿a qué se parece la unidad de los hermanos?", opciones: ["Al buen óleo que desciende sobre la barba de Aarón", "A un río sin agua", "A una torre alta"], correcta: 0, explica: "«¡Mirad cuán bueno y cuán delicioso es habitar los hermanos juntos en armonía!»", ref: "Salmo 133:1-2" },
  { id: "melquisedec", pregunta: "Según Hebreos 6:20, ¿según qué orden es Jesús sumo sacerdote para siempre?", opciones: ["Según el orden de Aarón", "Según el orden de Melquisedec", "Según el orden de Leví"], correcta: 1, explica: "Jesús entró por nosotros como precursor.", ref: "Hebreos 6:20" },
  { id: "intercede", pregunta: "Según Hebreos 7:25, ¿qué hace Jesús siempre por los que se acercan a Dios por medio de él?", opciones: ["Juzgarlos", "Pedirles ofrendas", "Interceder por ellos"], correcta: 2, explica: "Por eso puede también salvar perpetuamente.", ref: "Hebreos 7:25" },
  { id: "nuevajerusalen", pregunta: "Según Apocalipsis 21:22, ¿qué no vio Juan en la nueva Jerusalén?", opciones: ["Templo", "Muros", "Puertas"], correcta: 0, explica: "Porque el Señor Dios Todopoderoso es el templo de ella, y el Cordero.", ref: "Apocalipsis 21:22" },
  { id: "primicias", pregunta: "Según Proverbios 3:9, ¿con qué debemos honrar a Jehová?", opciones: ["Con palabras bonitas", "Con nuestros bienes y las primicias de nuestros frutos", "Con sacrificios de oro"], correcta: 1, explica: "«Honra a Jehová con tus bienes, y con las primicias de todos tus frutos».", ref: "Proverbios 3:9" },
  { id: "alfoli", pregunta: "Según Malaquías 3:10, ¿adónde manda Dios traer los diezmos?", opciones: ["Al mercado", "Al palacio del rey", "Al alfolí"], correcta: 2, explica: "«Y haya alimento en mi casa».", ref: "Malaquías 3:10" },
];

export function quizById(id: string): Quiz | undefined {
  return QUIZZES.find((q) => q.id === id);
}

// ---------------------------------------------------------------- diálogos
export type Speaker = "azarias" | "ezequias" | "narrador" | "conanias";
export type Line = { quien: Speaker; texto: string; ref?: string };

export const SPEAKERS: Record<Speaker, string> = {
  azarias: "Azarías, sumo sacerdote",
  ezequias: "El rey Ezequías",
  narrador: "Jerusalén, hacia el año 715 a. C.",
  conanias: "Conanías, el levita",
};

export const DIALOGUES: Record<string, Line[]> = {
  intro: [
    { quien: "narrador", texto: "Durante años, las puertas del templo estuvieron cerradas: las lámparas apagadas, sin incienso y el altar frío.", ref: "2 Crónicas 29:7" },
    { quien: "narrador", texto: "Pero el nuevo rey, Ezequías, mandó abrirlas. Tú eres un joven de la familia de Aarón y hoy empiezas a servir. (Tu personaje es imaginario; el templo, Ezequías y Azarías son del relato bíblico.)" },
    { quien: "azarias", texto: "¡Bienvenido, hijo de Aarón! Soy Azarías, sumo sacerdote, de la casa de Sadoc. Hay mucho que restaurar, y yo te enseñaré cada servicio." },
    { quien: "azarias", texto: "Camina hasta el círculo dorado junto a la entrada. Párate ahí y abriremos las puertas de la casa de Jehová." },
  ],
  puertas: [
    { quien: "ezequias", texto: "¡Oídme, levitas! Santificaos ahora, y santificad la casa de Jehová el Dios de vuestros padres.", ref: "2 Crónicas 29:5" },
    { quien: "azarias", texto: "El rey dejó un primer aporte para la obra. Para servir necesitamos fuego en el altar, y el fuego necesita leña: restaura la leñera." },
  ],
  lenera: [
    { quien: "azarias", texto: "Bien. Ahora restaura el altar de bronce, frente al templo. Después lleva leña desde la leñera hasta el altar." },
  ],
  altar: [
    { quien: "azarias", texto: "Carga leña en la leñera y párate junto al altar para encenderlo. Este fuego no se debe apagar nunca.", ref: "Levítico 6:13" },
  ],
  primerFuego: [
    { quien: "azarias", texto: "¡El fuego arde otra vez! Ya llegan las familias con sus ofrendas. Recíbelas en el atrio y preséntalas en el altar." },
  ],
  primeraOfrenda: [
    { quien: "azarias", texto: "¿Viste su gozo? Esa luz dorada que dejan es el Gozo: recógela al pasar y úsala para restaurar el templo." },
  ],
  fuegoApagado: [
    { quien: "azarias", texto: "¡Se apagó el fuego del altar! Sin fuego no se pueden presentar ofrendas. Trae leña: el fuego arderá continuamente en el altar.", ref: "Levítico 6:13" },
    { quien: "azarias", texto: "A nosotros también se nos dice: «No apaguéis al Espíritu».", ref: "1 Tesalonicenses 5:19" },
  ],
  fuente: [
    { quien: "azarias", texto: "Este es el mar de bronce, sobre doce bueyes. Cada vez que presentes ofrendas gastarás pureza; vuelve aquí a lavarte.", ref: "Éxodo 30:19-20" },
  ],
  purezaVacia: [
    { quien: "azarias", texto: "Antes de acercarte otra vez al altar, lávate las manos y los pies en el mar de bronce.", ref: "Éxodo 30:20" },
  ],
  levitas: [
    { quien: "azarias", texto: "Los sacerdotes somos pocos. Como en los días del rey, los levitas nos ayudarán: cada uno hará una tarea por ti.", ref: "2 Crónicas 29:34" },
  ],
  rangoListo: [
    { quien: "azarias", texto: "Ven a verme junto al pórtico: tengo algo importante para ti." },
  ],
  rango1: [
    { quien: "azarias", texto: "Moisés hizo acercarse a Aarón y a sus hijos, y los lavó con agua. Hoy te consagramos a ti.", ref: "Levítico 8:6" },
    { quien: "azarias", texto: "Recibe la túnica de lino fino, el cinto y la tiara, «para honra y hermosura». Y el aceite sobre tu cabeza.", ref: "Éxodo 28:40" },
    { quien: "azarias", texto: "Ahora eres sacerdote. Puedes entrar al Lugar Santo: restaura sus puertas, frente a las columnas Jaquín y Boaz." },
  ],
  santuario: [
    { quien: "azarias", texto: "Este es el Lugar Santo. Al sur va el candelero, al norte la mesa de los panes y, frente al velo, el altar del incienso. Primero necesitamos aceite puro." },
  ],
  candelero: [
    { quien: "azarias", texto: "Lleva aceite de la prensa al candelero. Al anochecer, sus siete lámparas deben arder hasta la mañana.", ref: "Levítico 24:3" },
  ],
  mesa: [
    { quien: "azarias", texto: "La mesa necesita doce panes, uno por cada tribu. Tráelos del horno.", ref: "Levítico 24:5" },
  ],
  incienso: [
    { quien: "azarias", texto: "Mañana y tarde quemaremos incienso frente al velo. Mira: el pueblo ya viene a orar al atrio.", ref: "Éxodo 30:7-8" },
  ],
  rango2: [
    { quien: "azarias", texto: "Los hijos de Aarón tocan las trompetas de plata. Desde hoy diriges un turno de sacerdotes: toma esta trompeta.", ref: "Números 10:8" },
    { quien: "azarias", texto: "El rey quiere oír el cántico de Jehová en su casa. Restaura el lugar del coro de los levitas." },
  ],
  coro: [
    { quien: "azarias", texto: "Llama a los cantores. Cuando comenzó el holocausto, comenzó también el cántico, con las trompetas y los instrumentos de David.", ref: "2 Crónicas 29:27" },
  ],
  visitaRey: [
    { quien: "ezequias", texto: "He venido con los príncipes a adorar. ¡Que los levitas alaben con las palabras de David y de Asaf!", ref: "2 Crónicas 29:30" },
    { quien: "narrador", texto: "Y se alegró Ezequías con todo el pueblo, de que Dios hubiese preparado el pueblo.", ref: "2 Crónicas 29:36" },
  ],
  pascua: [
    { quien: "ezequias", texto: "Mandé cartas por todo Israel y Judá: ¡vengan a celebrar la Pascua en Jerusalén!", ref: "2 Crónicas 30:1" },
    { quien: "narrador", texto: "Llegan familias de todas partes. Recibe todas las ofrendas que puedas.", ref: "2 Crónicas 30:26" },
  ],
  pascuaFin: [
    { quien: "azarias", texto: "Hubo gran regocijo en Jerusalén: desde los días de Salomón no había habido cosa semejante. Y ahora el pueblo trae diezmos en abundancia.", ref: "2 Crónicas 30:26" },
    { quien: "azarias", texto: "Necesitamos cámaras para guardarlos. Restáuralas al norte del atrio." },
  ],
  camaras: [
    { quien: "azarias", texto: "Desde que comenzaron a traer las ofrendas a la casa de Jehová, hemos comido y nos hemos saciado, y nos ha sobrado mucho.", ref: "2 Crónicas 31:10" },
    { quien: "conanias", texto: "Yo cuidaré las cámaras. Trae los diezmos del atrio y guardémoslos fielmente.", ref: "2 Crónicas 31:12" },
  ],
  ensenanza: [
    { quien: "azarias", texto: "El pueblo tiene preguntas. Cuando alguien espere en el lugar de enseñanza, párate ahí y respóndele.", ref: "Malaquías 2:7" },
  ],
  rango3: [
    { quien: "azarias", texto: "Eres ahora principal de los sacerdotes. Toma el incensario de oro: lo usarás el día más santo del año." },
    { quien: "azarias", texto: "Yo ya estoy viejo. Junta sabiduría y prepárate: un día deberás servir como sumo sacerdote." },
  ],
  examen: [
    { quien: "azarias", texto: "Antes de ponerte las vestiduras santas, responde tres preguntas. Un sumo sacerdote debe guardar la sabiduría." },
  ],
  rango4: [
    { quien: "azarias", texto: "Recibe las vestiduras para honra y hermosura: el manto azul con campanillas de oro y granadas, el efod y el pectoral con las doce piedras.", ref: "Éxodo 28:2" },
    { quien: "azarias", texto: "Llevas los nombres de las tribus sobre tu corazón y, en tu frente, la placa de oro: SANTIDAD A JEHOVÁ.", ref: "Éxodo 28:36" },
    { quien: "azarias", texto: "Cuando llegue el Día de la Expiación, entrarás al Lugar Santísimo. Párate frente al velo cuando estés listo." },
  ],
  expiacion: [
    { quien: "narrador", texto: "Es el Día de la Expiación. Dejas las vestiduras de gloria, te lavas y te vistes de lino blanco.", ref: "Levítico 16:4" },
    { quien: "narrador", texto: "Con el incensario, la nube de incienso cubre el propiciatorio. Una vez al año, por todo el pueblo.", ref: "Levítico 16:13" },
    { quien: "narrador", texto: "«En este día se hará expiación por vosotros, y seréis limpios de todos vuestros pecados delante de Jehová».", ref: "Levítico 16:30" },
    { quien: "azarias", texto: "Esto era una sombra de lo que vendría: Cristo entró una vez para siempre en el Lugar Santísimo, por su propia sangre.", ref: "Hebreos 9:12" },
    { quien: "azarias", texto: "Cuando Jesús murió, el velo del templo se rasgó de arriba abajo. Por él, todos podemos acercarnos a Dios.", ref: "Mateo 27:51" },
    { quien: "azarias", texto: "Acerquémonos, pues, confiadamente al trono de la gracia. ¡Gracias por servir en la casa de Dios!", ref: "Hebreos 4:16" },
  ],
  bendicion: [
    { quien: "narrador", texto: "Los sacerdotes, puestos en pie, bendijeron al pueblo: «Jehová te bendiga, y te guarde; Jehová haga resplandecer su rostro sobre ti, y tenga de ti misericordia; Jehová alce sobre ti su rostro, y ponga en ti paz».", ref: "Números 6:24-26" },
  ],
};

export const HOW_TO: string[] = [
  "Toca la pantalla y arrastra: aparece un joystick y el aprendiz camina. En la computadora, flechas o W A S D.",
  "No hay botón para servir: al pararte en un lugar, el servicio se hace solo.",
  "Carga leña, aceite, panes, incienso y las ofrendas del pueblo; llevas un solo tipo a la vez.",
  "Recibe las ofrendas en el atrio y preséntalas en el altar. El fuego debe estar encendido.",
  "Cada ofrenda gasta pureza: lávate en el mar de bronce.",
  "La luz dorada es el Gozo: recógela y párate en los círculos para restaurar el templo y llamar levitas.",
  "Responde a Azarías para ganar Sabiduría y subir de rango hasta sumo sacerdote.",
];
