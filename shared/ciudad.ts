/**
 * Jerusalén en línea, etapa 2 («La ciudad»): las reglas de la ciudad que comparten el servidor y
 * el juego.
 *
 * Al salir del templo se llega a un mapa fijo y pequeño de Jerusalén, el mismo para todos: el
 * templo, el palacio del rey y la escuela de los profetas (por ahora solo edificios; sus caminos
 * son de la etapa 3), la plaza con la puerta de la ciudad y cuatro barrios de casas de jugadores.
 * Cada personaje tiene una parcela fija en un barrio, y su casa crece con su servicio en el templo.
 *
 * El servidor guarda solo números (barrio, parcela, nivel de la casa). Cada teléfono dibuja la
 * ciudad: completo su barrio y las casas principales, y el resto de lejos, como siluetas.
 *
 * Las citas entre comillas son textuales de la Reina-Valera 1960.
 */
import type { EscalonId, JerusalenEstado } from "./jerusalen";
import type { RopaVista } from "./mercado";

export type Verso = { text: string; ref: string };

/** Casas (parcelas) de cada barrio. */
export const CASAS_POR_BARRIO = 40;
/** Vecinos que se dibujan a la vez (en tu barrio y en las casas principales). */
export const VECINOS_VISIBLES = 20;

/**
 * Las cuatro áreas de barrio del mapa, en el orden en que se llenan (primero las que están junto
 * a la plaza). Desde el barrio 5 se repiten las áreas como otro barrio del mismo nombre.
 */
export const BARRIOS: { nombre: string; ref: string; lado: "SE" | "NE" | "SO" | "NO"; nota: string }[] = [
  { nombre: "Ciudad de David", ref: "2 Samuel 5:9", lado: "SE", nota: "David moró en la fortaleza y la llamó la Ciudad de David." },
  { nombre: "Barrio de la puerta de las Ovejas", ref: "Nehemías 3:1", lado: "NE", nota: "El sumo sacerdote Eliasib y los sacerdotes edificaron la puerta de las Ovejas." },
  { nombre: "Ofel", ref: "Nehemías 3:26", lado: "SO", nota: "Allí habitaban los sirvientes del templo." },
  { nombre: "Barrio de la puerta de Efraín", ref: "Nehemías 8:16", lado: "NO", nota: "En su plaza el pueblo hizo enramadas para la fiesta." },
];
export const AREAS = BARRIOS.length;

/** Área del mapa (1 a 4) donde está un barrio. */
export function areaDeBarrio(n: number): number {
  return ((Math.max(1, Math.floor(n)) - 1) % AREAS) + 1;
}

/** Nombre del barrio («Ofel», y desde la segunda vuelta «Ofel 2»). */
export function nombreDeBarrio(n: number): string {
  const b = BARRIOS[areaDeBarrio(n) - 1];
  const vuelta = Math.floor((Math.max(1, Math.floor(n)) - 1) / AREAS);
  return vuelta ? `${b.nombre} ${vuelta + 1}` : b.nombre;
}

// ---------------------------------------------------------------- el mapa que comparten el servidor y el teléfono
/** Donde se puede caminar (la presencia se recorta a estos límites). */
export const LIMITES_CIUDAD = { minX: -6, maxX: 75, minZ: -70.5, maxZ: 70.5 };

/** Áreas de barrio (36 × 28,5 m: minX, minZ, maxX, maxZ), en el orden de BARRIOS: SE, NE, SO, NO. */
export const AREA_RECT: [number, number, number, number][] = [
  [38, 18, 74, 46.5],
  [38, -46.5, 74, -18],
  [-4, 40, 32, 68.5],
  [-4, -68.5, 32, -40],
];

/** ¿En qué área de barrio está el punto? (0 = ninguna: plaza, calles, casas principales). */
export function areaEn(x: number, z: number): number {
  for (let i = 0; i < AREA_RECT.length; i++) {
    const r = AREA_RECT[i];
    if (x >= r[0] - 0.5 && x <= r[2] + 0.5 && z >= r[1] - 0.5 && z <= r[3] + 0.5) return i + 1;
  }
  return 0;
}

/**
 * Canal de presencia: quien está en el área de un barrio ve a los que están en ese barrio; quien
 * está en la plaza, las calles o junto a las casas principales ve a todos los que también están ahí.
 * Desde el quinto barrio las áreas se repiten: en el área del barrio propio se ve el barrio propio;
 * en las otras, el primero de esa área.
 */
export function canalDe(x: number, z: number, barrioPropio: number): string {
  const area = areaEn(x, z);
  if (!area) return "comun";
  return `barrio:${areaDeBarrio(barrioPropio) === area ? barrioPropio : area}`;
}

// ---------------------------------------------------------------- la casa de cada uno
export type NivelCasa = { nivel: number; nombre: string; honra: number; texto: string; verso: Verso };

/**
 * La casa crece con la honra: el mérito de todas las temporadas y lo que la casa ofrece en el
 * templo (Proverbios 3:9-10). Nunca baja, aunque cada temporada el mérito vuelva a empezar en cero.
 */
export const NIVELES_CASA: NivelCasa[] = [
  {
    nivel: 0,
    nombre: "Tienda",
    honra: 0,
    texto: "Una tienda de pelo de cabra, como la de los padres que vivieron por la fe.",
    verso: { text: "Por la fe habitó como extranjero en la tierra prometida como en tierra ajena, morando en tiendas con Isaac y Jacob, coherederos de la misma promesa;", ref: "Hebreos 11:9" },
  },
  {
    nivel: 1,
    nombre: "Casa de adobe",
    honra: 500,
    texto: "Paredes de adobe, techo plano con pretil y una escalera para subir al terrado.",
    verso: { text: "Con sabiduría se edificará la casa, Y con prudencia se afirmará;", ref: "Proverbios 24:3" },
  },
  {
    nivel: 2,
    nombre: "Casa de piedra con patio",
    honra: 2500,
    texto: "Muros de piedra labrada, puerta de cedro y un patio con su higuera y su vid.",
    verso: { text: "Cualquiera, pues, que me oye estas palabras, y las hace, le compararé a un hombre prudente, que edificó su casa sobre la roca.", ref: "Mateo 7:24" },
  },
  {
    nivel: 3,
    nombre: "Casa con aposento alto",
    honra: 8000,
    texto: "Sobre el terrado, un aposento de paredes para recibir al varón de Dios.",
    verso: { text: "Yo te ruego que hagamos un pequeño aposento de paredes, y pongamos allí cama, mesa, silla y candelero, para que cuando él viniere a nosotros, se quede en él.", ref: "2 Reyes 4:10" },
  },
];

/** El versículo de la casa que crece (en la ventana de tu casa). */
export const VERSO_HONRA: Verso = {
  text: "Honra a Jehová con tus bienes, Y con las primicias de todos tus frutos; Y serán llenos tus graneros con abundancia, Y tus lagares rebosarán de mosto.",
  ref: "Proverbios 3:9-10",
};

/** El lema de cada casa. */
export const VERSO_CASA: Verso = { text: "pero yo y mi casa serviremos a Jehová.", ref: "Josué 24:15" };

/** Nivel de la casa que corresponde a una honra. */
export function nivelPorHonra(honra: number): number {
  let n = 0;
  for (const x of NIVELES_CASA) if (honra >= x.honra) n = x.nivel;
  return n;
}

/** Honra de una casa: el mérito de todas las temporadas más lo que la casa ofreció en el templo. */
export function honraDe(meritoTotal: number, ofrecido = 0): number {
  return Math.max(0, Math.floor(meritoTotal) + Math.floor(ofrecido));
}

// ---------------------------------------------------------------- tus siervos y tu alfolí (solo los ve el dueño)
/**
 * Cada casa tiene hasta 4 siervos que solo ve su dueño. Preparan harina, aceite y corderos
 * mientras no juegas, con el mismo tope de los levitas del modo local: 2 horas por salida y 3 por
 * día, y la segunda hora rinde la mitad. No trabajan en el templo ni ganan mérito: lo que
 * preparan se guarda en el alfolí de la casa y, llevado al templo, da honra a la casa.
 */
export type Bien = "harina" | "aceite" | "corderos";
export const BIENES: { id: Bien; nombre: string; icono: string; porHora: number; honra: number; tarea: string }[] = [
  { id: "harina", nombre: "Harina", icono: "🌾", porHora: 6, honra: 2, tarea: "Muele el trigo" },
  { id: "aceite", nombre: "Aceite", icono: "🫒", porHora: 4, honra: 3, tarea: "Prensa las olivas" },
  { id: "corderos", nombre: "Corderos", icono: "🐑", porHora: 1.5, honra: 10, tarea: "Cuida el rebaño" },
];
export const BIEN = Object.fromEntries(BIENES.map((b) => [b.id, b])) as Record<Bien, (typeof BIENES)[number]>;
export const MAX_SIERVOS = 4;
/** Siervos según la casa: uno en la tienda y uno más por cada nivel (hasta 4). */
export function siervosPermitidos(nivel: number): number {
  return Math.max(1, Math.min(MAX_SIERVOS, Math.floor(nivel) + 1));
}
/** Lo que cabe de cada bien en el alfolí de la casa. */
export function capacidadAlfoli(nivel: number): number {
  return 20 + 20 * Math.max(0, Math.min(3, Math.floor(nivel)));
}
/** Como los levitas del modo local: 2 h por salida y 3 h por día. */
export const SIERVOS_SALIDA = 2 * 3600;
export const SIERVOS_DIA = 3 * 3600;
/** Horas que rinden: la primera completa y la segunda a la mitad. */
export function horasEfectivas(segundos: number): number {
  const t = Math.max(0, Math.min(segundos, SIERVOS_SALIDA));
  return (Math.min(t, 3600) + Math.max(0, t - 3600) * 0.5) / 3600;
}
/** En la fiesta, la ofrenda que más traen vale el doble: corderos en la Pascua, harina en los panes y las primicias. */
export function bienDeFiesta(ofrenda: "cordero" | "cereal" | "palomas" | undefined | null): Bien | null {
  return ofrenda === "cordero" ? "corderos" : ofrenda === "cereal" ? "harina" : null;
}

export const VERSO_SIERVOS: Verso = { text: "Y su señor le dijo: Bien, buen siervo y fiel; sobre poco has sido fiel, sobre mucho te pondré; entra en el gozo de tu señor.", ref: "Mateo 25:21" };
export const VERSO_ALFOLI: Verso = { text: "Traed todos los diezmos al alfolí y haya alimento en mi casa;", ref: "Malaquías 3:10" };
export const VERSO_DADOR: Verso = { text: "Cada uno dé como propuso en su corazón: no con tristeza, ni por necesidad, porque Dios ama al dador alegre.", ref: "2 Corintios 9:7" };
/** Al visitar una casa (la bendición que se deja). */
export const VERSO_VISITA: Verso = { text: "En cualquier casa donde entréis, primeramente decid: Paz sea a esta casa.", ref: "Lucas 10:5" };
export const VERSO_HOSPEDAJE: Verso = { text: "Hospedaos los unos a los otros sin murmuraciones.", ref: "1 Pedro 4:9" };

// ---------------------------------------------------------------- los edificios principales
/** Lo que se lee al acercarse al palacio y a la escuela (sus caminos se abren en la etapa 3). */
export const EDIFICIOS: Record<"palacio" | "escuela" | "mercado", { nombre: string; texto: string; verso: Verso; pronto: string }> = {
  palacio: {
    nombre: "El palacio del rey",
    texto: "Salomón edificó su casa en trece años: la casa del bosque del Líbano, el pórtico de columnas y el pórtico del trono, donde el rey juzgaba.",
    verso: { text: "Hizo asimismo el pórtico del trono en que había de juzgar, el pórtico del juicio, y lo cubrió de cedro del suelo al techo.", ref: "1 Reyes 7:7" },
    pronto: "El camino del reino se abre en la etapa 3: entonces habrá rey, capitanes y juicios en el palacio.",
  },
  escuela: {
    nombre: "La escuela de los profetas",
    texto: "Los hijos de los profetas vivían junto a Eliseo, estudiaban la palabra y oraban. Cuando el lugar les quedó estrecho, cada uno trajo una viga.",
    verso: { text: "Vamos ahora al Jordán, y tomemos de allí cada uno una viga, y hagamos allí lugar en que habitemos.", ref: "2 Reyes 6:2" },
    pronto: "El camino de la profecía se abre en la etapa 3: entonces habrá rollos para estudiar y el monte para orar.",
  },
  mercado: {
    nombre: "El mercado de la plaza",
    texto: "Aquí se venderán corderos, aceite y harina, con pesas justas.",
    verso: { text: "El peso falso es abominación a Jehová; Mas la pesa cabal le agrada.", ref: "Proverbios 11:1" },
    pronto: "El mercado abre en la etapa 3, con el oficio de mercader.",
  },
};

/** Consejos de los ancianos sentados a la puerta (Rut 4:1-2): uno distinto cada vez. */
export const CONSEJOS_ANCIANOS: Verso[] = [
  { text: "El principio de la sabiduría es el temor de Jehová; Los insensatos desprecian la sabiduría y la enseñanza.", ref: "Proverbios 1:7" },
  { text: "Fíate de Jehová de todo tu corazón, Y no te apoyes en tu propia prudencia.", ref: "Proverbios 3:5" },
  { text: "La blanda respuesta quita la ira; Mas la palabra áspera hace subir el furor.", ref: "Proverbios 15:1" },
  { text: "Instruye al niño en su camino, Y aun cuando fuere viejo no se apartará de él.", ref: "Proverbios 22:6" },
  { text: "Hacer justicia y juicio es a Jehová Más agradable que sacrificio.", ref: "Proverbios 21:3" },
  { text: "En todo tiempo ama el amigo, Y es como un hermano en tiempo de angustia.", ref: "Proverbios 17:17" },
  { text: "Corona de honra es la vejez Que se halla en el camino de justicia.", ref: "Proverbios 16:31" },
  { text: "De más estima es el buen nombre que las muchas riquezas, Y la buena fama más que la plata y el oro.", ref: "Proverbios 22:1" },
];

/** El púlpito de la plaza, donde Esdras leyó la ley al pueblo. */
export const VERSO_PULPITO: Verso = { text: "Y el escriba Esdras estaba sobre un púlpito de madera que habían hecho para ello,", ref: "Nehemías 8:4" };
/** Los niños que juegan en la plaza. */
export const VERSO_PLAZA: Verso = { text: "Y las calles de la ciudad estarán llenas de muchachos y muchachas que jugarán en ellas.", ref: "Zacarías 8:5" };
/** Las enramadas sobre los terrados en la fiesta de los tabernáculos. */
export const VERSO_ENRAMADAS: Verso = {
  text: "Salió, pues, el pueblo, y trajeron ramas e hicieron tabernáculos, cada uno sobre su terrado, en sus patios, en los patios de la casa de Dios, en la plaza de la puerta de las Aguas, y en la plaza de la puerta de Efraín.",
  ref: "Nehemías 8:16",
};

// ---------------------------------------------------------------- vecinos: frases rápidas, sin chat libre
/**
 * En la ciudad no hay chat libre: solo frases fijas y versículos (no hay nada que moderar y cuida
 * a los niños). Para conversar, «Escribir» abre la mensajería de la web.
 */
export type FraseRapida = { id: string; texto: string; ref?: string };
export const FRASES: FraseRapida[] = [
  { id: "paz", texto: "La paz sea contigo" },
  { id: "bendiga", texto: "Dios te bendiga" },
  { id: "gloria", texto: "¡Gloria a Dios!" },
  { id: "amen", texto: "¡Amén!" },
  { id: "altar", texto: "¿Me ayudas en el altar?" },
  { id: "templo", texto: "¡Vamos al templo!" },
  { id: "gusto", texto: "¡Qué gusto verte en Jerusalén!" },
  { id: "orare", texto: "Oraré por ti" },
  { id: "gracias", texto: "¡Muchas gracias!" },
  { id: "casa", texto: "Ven a visitar mi casa" },
  { id: "juntos", texto: "¡Vengan a la misión del barrio de hoy!" },
];
export const VERSICULOS_RAPIDOS: FraseRapida[] = [
  { id: "v-casa", texto: "Yo me alegré con los que me decían: A la casa de Jehová iremos.", ref: "Salmo 122:1" },
  { id: "v-hermanos", texto: "¡Mirad cuán bueno y cuán delicioso es Habitar los hermanos juntos en armonía!", ref: "Salmo 133:1" },
  { id: "v-bendiga", texto: "Jehová te bendiga, y te guarde;", ref: "Números 6:24" },
  { id: "v-dia", texto: "Este es el día que hizo Jehová; Nos gozaremos y alegraremos en él.", ref: "Salmo 118:24" },
  { id: "v-regocijaos", texto: "Regocijaos en el Señor siempre. Otra vez digo: ¡Regocijaos!", ref: "Filipenses 4:4" },
  { id: "v-paz", texto: "Pedid por la paz de Jerusalén; Sean prosperados los que te aman.", ref: "Salmo 122:6" },
  { id: "v-valiente", texto: "Mira que te mando que te esfuerces y seas valiente;", ref: "Josué 1:9" },
  { id: "v-alabad", texto: "Alabad a Jehová, porque él es bueno, Porque para siempre es su misericordia.", ref: "Salmo 136:1" },
];
export function fraseRapida(id: string): FraseRapida | null {
  return FRASES.find((f) => f.id === id) ?? VERSICULOS_RAPIDOS.find((f) => f.id === id) ?? null;
}
/** Una frase cada 2,5 s y como mucho 12 por minuto. */
export const FRASE_CADA_MS = 2500;
export const FRASES_POR_MINUTO = 12;

/**
 * Gestos que los vecinos ven hacer a tu personaje (por la misma red que las frases): saludar, aplaudir, alegrarse,
 * orar, inclinarse, señalar y pensar. `pose` es la pose del personaje (three/characters.ts).
 */
export const GESTOS = [
  { id: "saludar", icono: "👋", texto: "Saludar", pose: "wave" },
  { id: "aplaudir", icono: "👏", texto: "Aplaudir", pose: "clap" },
  { id: "alegria", icono: "🙌", texto: "¡Alegría!", pose: "cheer" },
  { id: "orar", icono: "🙏", texto: "Orar", pose: "kneel" },
  { id: "inclinarse", icono: "🙇", texto: "Inclinarse", pose: "bow" },
  { id: "senalar", icono: "👉", texto: "Señalar", pose: "point" },
  { id: "pensar", icono: "🤔", texto: "Pensar", pose: "think" },
] as const;
export type GestoId = (typeof GESTOS)[number]["id"];
export function gestoDe(id: string): (typeof GESTOS)[number] | null {
  return GESTOS.find((g) => g.id === id) ?? null;
}
/** Un gesto cada 1,8 s y como mucho 16 por minuto; se ve unos 3 segundos. */
export const GESTO_CADA_MS = 1800;
export const GESTOS_POR_MINUTO = 16;
export const GESTO_DURA_MS = 3200;

// ---------------------------------------------------------------- la presencia (WebSocket)
/** Dirección del WebSocket de la ciudad (la presencia viaja solo en memoria, nunca en la base). */
export const RED_RUTA = "/api/jerusalen/ciudad/red";
/** Cada cuánto manda el servidor las posiciones de los vecinos (y el teléfono la suya, si se movió). */
export const RED_TICK_MS = 250;

/** Lo que se sabe de un vecino (llega una vez, cuando aparece). */
export type VecinoInfo = {
  id: number;
  nombre: string;
  escalon: EscalonId;
  barrio: number;
  casa: number;
  /** La cuenta, solo para «Escribir» (abre la mensajería). */
  u: number;
  /** Su camino (la vestidura y el nombre del escalón). */
  camino?: "sacerdocio" | "profecia" | "realeza";
  /** Los colores de su manto y su faja (si compró), y si son finos (con su orla de oro). */
  ropa?: RopaVista;
};

/** Del teléfono al servidor. */
/**
 * Lo que manda el teléfono. En el templo en línea la posición lleva `l: "templo"` (otro canal: allí
 * solo se ven los que sirven) y `a`, lo que lleva en las manos (ACTIVIDADES).
 */
export type RedSale = { t: "pos"; x: number; z: number; ry: number; m: number; l?: "templo"; a?: number } | { t: "frase"; id: string } | { t: "gesto"; id: string };

/** Lo que lleva en las manos quien sirve en el templo (para verlo sobre su cabeza). */
export const ACTIVIDADES = ["", "🪵", "🫒", "🍞", "🌿", "🐑", "🌾"] as const;
/** Lo que está haciendo cada vecino en la ciudad (se ve junto a su nombre). */
export const ACTIVIDADES_CIUDAD = ["", "🛒", "🏠", "📜", "📯", "👑", "🙏", "🍞", "✉️"] as const;
export const ACTIVIDAD_CIUDAD_TEXTO = ["", "en el mercado", "en su casa", "estudiando", "en la escuela", "en el palacio", "orando", "lleva pan", "lleva un mensaje"] as const;
/** Los límites del templo en línea (en las mismas coordenadas que la ciudad). */
export const LIMITES_TEMPLO = { minX: -17, maxX: 41, minZ: -14, maxZ: 14 };

/** Del servidor al teléfono. `l` = [id, x, z, giro, se mueve] de los vecinos que se ven (hasta 20). */
export type RedEntra =
  | { t: "hola"; yo: number; tick: number }
  | { t: "info"; v: VecinoInfo }
  | { t: "v"; l: [number, number, number, number, number, number?][] }
  | { t: "frase"; de: number; id: string }
  /** Un vecino hizo un gesto (saludar, aplaudir…): se ve en su personaje unos segundos. */
  | { t: "gesto"; de: number; id: string }
  | { t: "barrio"; n: number; casas: CasaVista[] }
  /** La charla del barrio (shared/barrio.ts): un mensaje nuevo, o uno que se borró u ocultó. */
  | { t: "chat"; m: import("./barrio").MensajeBarrio }
  | { t: "chat-fuera"; id: number }
  /** «¿Quién es sabio?» (shared/sabio.ts): un vecino te llama para pedir consejo, o la llamada terminó. */
  | { t: "sabio-llamada"; l: import("./sabio").LlamadaSabio }
  | { t: "sabio-llamada-fin"; id: number; motivo: string }
  /** A quien llamó: llegó el consejo (que vuelva a pedir la partida). */
  | { t: "sabio-consejo"; id: number }
  /** A quien aconsejó: cómo le fue a su vecino con el consejo. */
  | { t: "sabio-gracias"; de: string; bien: boolean; gozo: number; gozoTotal: number | null; premio: string | null }
  /** El duelo de sabios: te retan, el reto se cerró, o algo cambió en tu duelo (que vuelva a pedirlo). */
  | { t: "duelo-reto"; r: import("./sabio").RetoDuelo }
  | { t: "duelo-reto-fin"; id: number; motivo: string }
  | { t: "duelo"; id: number }
  /** La misión del barrio de hoy (shared/barrio-juntos.ts): cómo va mientras estás en el lugar, y cuando se cumple. */
  | { t: "juntos"; p: import("./barrio-juntos").JuntosProgreso }
  | { t: "juntos-hecho"; titulo: string; gozo: number; merito: number; ayudo: boolean; juntos: number; gozoTotal?: number }
  /** Un amigo o vecino te invita a venir adonde está (shared/acompanar.ts). */
  | { t: "invitacion"; i: import("./acompanar").Invitacion }
  /** El barrio terminó una de sus obras (shared/barrio-obras.ts): la calle se dibuja con ella. */
  | { t: "obras-barrio"; n: number; obras: string[]; terminada: string | null }
  /** Un vecino o amigo te mandó un regalo (shared/regalos.ts). */
  | { t: "regalo"; r: import("./regalos").AvisoRegalo }
  /** Un vecino abrió o cerró un banquete en su casa (shared/banquete.ts): que se vuelvan a pedir los banquetes. */
  | { t: "banquete"; anfitrion: string; abierto: boolean }
  | { t: "fuera"; motivo: string };

// ---------------------------------------------------------------- respuestas de la API
/** Una casa del barrio tal como la ven todos (sin siervos ni bienes: eso solo lo ve el dueño). */
export type CasaVista = {
  parcela: number;
  nivel: number;
  personajeId: number;
  nombre: string;
  escalon: EscalonId;
  esMia: boolean;
  /** Los adornos que puso (los ven los vecinos) y el nombre de la casa. */
  adornos?: string[];
  letrero?: string | null;
  /** Las obras edificadas y las estrellas de la casa (shared/obras.ts). */
  obras?: string[];
  estrellas?: number;
  /** Las ovejas de su redil (shared/taller.ts): se ven junto a la casa. */
  ovejas?: number;
};

/** Un barrio completo (al entrar en su área). */
/** `nivelBarrio`: el nivel del barrio en la copa de los barrios (shared/barrio-juntos.ts), que se ve en sus calles. */
export type BarrioEstado = {
  n: number;
  area: number;
  nombre: string;
  casas: CasaVista[];
  nivelBarrio?: number;
  /** Las obras del barrio terminadas (shared/barrio-obras.ts): se dibujan en sus calles. */
  obrasBarrio?: string[];
};

/** Lo de tu casa que solo ves tú: siervos, alfolí y bendiciones. */
export type CasaPrivada = {
  siervos: Bien[];
  maxSiervos: number;
  /** Lo guardado (enteros: lo que se puede ofrecer). */
  bienes: Record<Bien, number>;
  capacidad: number;
  /** Lo que prepararon desde la última vez (null si nada). */
  recogido: Record<Bien, number> | null;
  /** Minutos de trabajo de hoy (de 180). */
  minutosHoy: number;
  /** Honra que dio lo que tu casa ofreció en el templo. */
  ofrecido: number;
  bendiciones: number;
  /** Quiénes dejaron una bendición desde la última vez. */
  nuevasBendiciones: string[];
};

/** Una casa al visitarla. */
export type CasaVisita = {
  personajeId: number;
  nombre: string;
  escalon: EscalonId;
  barrio: number;
  parcela: number;
  nivel: number;
  bendiciones: number;
  /** Ya dejaste tu bendición hoy. */
  yaBendije: boolean;
  esMia: boolean;
  /** Las obras edificadas y las estrellas de la casa (shared/obras.ts). */
  obras?: string[];
  estrellas?: number;
};

export type CiudadEstado = {
  yo: {
    personajeId: number;
    /** El id de su casa (el titular de la persona): la casa es una sola para todos sus personajes. */
    casaId: number;
    nombre: string;
    escalon: EscalonId;
    /** Su camino: sacerdocio, escuela de los profetas o palacio del rey. */
    camino: "sacerdocio" | "profecia" | "realeza";
    /** Primeros pasos de su camino (0 a 3; en el sacerdocio, la instrucción). */
    pasos: number;
    /** Los colores de su manto y su faja. */
    ropa?: RopaVista;
    /** El gozo de Jerusalén en línea (se gana sirviendo aquí y se gasta en el mercado). */
    gozo: number;
    barrio: number;
    parcela: number;
    nivel: number;
    honra: number;
    /** El nivel que sigue y la honra que pide (null en el último). */
    siguiente: { nivel: number; honra: number } | null;
    /** Si la casa acaba de crecer al entrar: el nivel nuevo. */
    subio: number | null;
  };
  barrio: { n: number; area: number; nombre: string; casas: CasaVista[]; libres: number; nivelBarrio?: number; /** las obras del barrio terminadas */ obrasBarrio?: string[] };
  /** Los barrios de las otras áreas, de lejos: solo dónde hay casas y de qué nivel. */
  otros: { n: number; area: number; casas: { parcela: number; nivel: number }[] }[];
  jerusalen: JerusalenEstado["jerusalen"];
  temporada: { n: number; dePrueba: boolean; diasRestantes: number };
  /** Tus siervos, tu alfolí y tus bendiciones (solo los ves tú). */
  privada: CasaPrivada;
};
