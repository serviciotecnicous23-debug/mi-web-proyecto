/**
 * El patio de los juegos (pedido de Luis, 12 de noviembre de 2026): jugó «¿Quién es sabio?» en línea con un amigo, le
 * gustó, y quiere muchas más cosas para hacer en línea, de verdad y en grupo, para conectarse con los amigos de la
 * iglesia. Aquí están las reglas que comparten el servidor y el teléfono:
 *
 * - La sala: se crea con un código de 6 letras, caben de 2 a 12 personas, cada una dice que está «a punto» y se puede
 *   salir cuando se quiera. Se invita a los amigos y a los vecinos del barrio (como «Invitar a venir»). Se habla con
 *   frases fijas y versículos: no hay texto libre. Solo cuentas aprobadas, y nunca se juntan quienes se bloquearon.
 * - Los juegos: «Esgrima bíblica», «Las doce tribus», «¿Quién soy?», «La carrera de Ahimaas» y «Levantemos el muro».
 *   Todo lo decide el servidor, que mide los tiempos en milisegundos y nunca manda la respuesta antes de tiempo. La
 *   carrera y el muro se juegan caminando por la ciudad: el servidor mira la posición real de cada uno en la red.
 * - Los premios: gozo con un tope por día, puntos para la copa del barrio, dos logros y una prenda que no se vende para
 *   quien gana cada juego (en el muro, para todos los que lo levantaron).
 *
 * Las citas entre comillas son textuales de la Reina-Valera 1960.
 */
import type { Verso } from "./ciudad";
import type { Camino } from "./caminos";
import type { AsientoMesa, MesaVista, NivelBot } from "./mesa";

// ---------------------------------------------------------------- los juegos
/** «mesa»: un juego de mesa por turnos (ajedrez, damas, dominó, tres en raya…); cuál, lo dice `mesa` (shared/mesa/index.ts). */
export type JuegoId = "esgrima" | "tribus" | "quien" | "carrera" | "muro" | "mesa";

export type JuegoDef = {
  id: JuegoId;
  nombre: string;
  icono: string;
  /** Una línea para la lista. */
  corto: string;
  /** Cómo se juega (para la sala). */
  como: string[];
  verso: Verso;
  min: number;
  max: number;
  /** Se juega caminando por la ciudad: la ventana se cierra y el mundo sigue. */
  enLaCiudad: boolean;
  /** Para empezar, todos tienen que estar en el patio (así la salida es pareja). */
  enElPatio: boolean;
  /** Todos ganan o nadie gana. */
  cooperativo: boolean;
  /** La prenda que se gana (PRENDAS_JUEGOS). */
  prenda: string;
};

export const JUEGOS: Record<JuegoId, JuegoDef> = {
  esgrima: {
    id: "esgrima",
    nombre: "Esgrima bíblica",
    icono: "⚔️",
    corto: "El más rápido en hallar el versículo o la cita.",
    como: [
      "Sale una cita y hay que hallar su versículo entre cuatro (o sale el versículo y hay que hallar su cita).",
      "Gana la ronda quien acierta primero: 3 puntos. Acertar después vale 1 punto.",
      "Son 10 rondas de 20 segundos. Cada uno responde una vez por ronda.",
    ],
    verso: { text: "Y tomad el yelmo de la salvación, y la espada del Espíritu, que es la palabra de Dios;", ref: "Efesios 6:17" },
    min: 2,
    max: 12,
    enLaCiudad: false,
    enElPatio: false,
    cooperativo: false,
    prenda: "faja-espada-espiritu",
  },
  tribus: {
    id: "tribus",
    nombre: "Las doce tribus",
    icono: "🛡️",
    corto: "Equipos de tribus: si tu tribu falla, otra te roba la pregunta.",
    como: [
      "De 2 a 4 tribus. Cada tribu responde su pregunta en su turno: la primera respuesta de la tribu es la que vale.",
      "Si la tribu falla o se acaba el tiempo, las demás tribus pueden robarla: la primera que acierta se la lleva.",
      "Acertar en tu turno vale 100 puntos; robar, 50. Gana la tribu con más puntos.",
    ],
    verso: { text: "Y allá subieron las tribus, las tribus de JAH, Conforme al testimonio dado a Israel, Para alabar el nombre de Jehová.", ref: "Salmos 122:4" },
    min: 2,
    max: 12,
    enLaCiudad: false,
    enElPatio: false,
    cooperativo: false,
    prenda: "manto-doce-tribus",
  },
  quien: {
    id: "quien",
    nombre: "¿Quién soy?",
    icono: "🕵️",
    corto: "Un personaje bíblico y sus pistas, una por una.",
    como: [
      "Las pistas de un personaje de la Biblia salen una por una, de la más difícil a la más fácil.",
      "Elige quién es cuando quieras: con menos pistas, más puntos (100, 80, 60, 40 o 20). Si fallas, esperas la siguiente ronda.",
      "Son 6 personajes.",
    ],
    verso: { text: "Por tanto, nosotros también, teniendo en derredor nuestro tan grande nube de testigos,", ref: "Hebreos 12:1" },
    min: 2,
    max: 12,
    enLaCiudad: false,
    enElPatio: false,
    cooperativo: false,
    prenda: "faja-nube-testigos",
  },
  carrera: {
    id: "carrera",
    nombre: "La carrera de Ahimaas",
    icono: "🏃",
    corto: "Corran por la ciudad hasta los puntos marcados.",
    como: [
      "Salen a la vez del patio y corren por Jerusalén a cinco lugares marcados con una luz, en orden, y vuelven al patio.",
      "El servidor mira dónde está cada uno de verdad: «Ir a…» no vale en la carrera, y quien salta tiene que volver al último punto.",
      "Gana quien vuelve primero al patio.",
    ],
    verso: {
      text: "Mas él respondió: Sea como fuere, yo correré. Entonces le dijo: Corre. Corrió, pues, Ahimaas por el camino de la llanura, y pasó delante del etíope.",
      ref: "2 Samuel 18:23",
    },
    min: 2,
    max: 12,
    enLaCiudad: true,
    enElPatio: true,
    cooperativo: false,
    prenda: "faja-ahimaas",
  },
  muro: {
    id: "muro",
    nombre: "Levantemos el muro",
    icono: "🧱",
    corto: "En grupo, lleven piedras al muro en 5 minutos.",
    como: [
      "Toma una piedra de la cantera del patio y llévala al tramo del muro, al fondo del patio. Se lleva una a la vez.",
      "El grupo tiene que poner las piedras que pide el tramo antes de 5 minutos.",
      "Si lo levantan, gana quien haya ayudado (con 3 piedras o más). Aquí no se compite: el muro es del grupo entero.",
    ],
    verso: {
      text: "Edificamos, pues, el muro, y toda la muralla fue terminada hasta la mitad de su altura, porque el pueblo tuvo ánimo para trabajar.",
      ref: "Nehemías 4:6",
    },
    min: 2,
    max: 12,
    enLaCiudad: true,
    enElPatio: true,
    cooperativo: true,
    prenda: "manto-nehemias",
  },
  mesa: {
    id: "mesa",
    nombre: "Juegos de mesa",
    icono: "🎲",
    corto: "Ajedrez, damas, dominó, cuatro en raya y tres en raya: con tus amistades o solo, con la computadora.",
    como: [
      "Quien crea la sala elige el juego de mesa. Cada uno tiene su asiento y juega en su turno.",
      "Si faltan jugadores, quien creó la sala agrega compañeros de la computadora (fácil, normal o difícil).",
      "Cada turno tiene su reloj: si se acaba, se juega solo.",
    ],
    verso: { text: "¡Mirad cuán bueno y cuán delicioso es Habitar los hermanos juntos en armonía!", ref: "Salmos 133:1" },
    min: 1,
    max: 12,
    enLaCiudad: false,
    enElPatio: false,
    cooperativo: false,
    prenda: "",
  },
};

export const ORDEN_JUEGOS: JuegoId[] = ["esgrima", "tribus", "quien", "carrera", "muro", "mesa"];
export const esJuego = (x: unknown): x is JuegoId => typeof x === "string" && (ORDEN_JUEGOS as string[]).includes(x);

/** «Y las calles de la ciudad estarán llenas de muchachos y muchachas que jugarán en ellas.» */
export const VERSO_PATIO: Verso = { text: "Y las calles de la ciudad estarán llenas de muchachos y muchachas que jugarán en ellas.", ref: "Zacarías 8:5" };

// ---------------------------------------------------------------- la sala
export const SALA_MIN = 2;
/**
 * Con compañeros de la computadora la partida es de práctica: como mucho este gozo por día, y nada de copa del barrio,
 * prendas, logros ni tablas (así nadie junta gozo jugando solo contra la computadora).
 */
export const PRACTICA_GOZO_DIA = 10;
export const SALA_MAX = 12;
export const CODIGO_LARGO = 6;
/** Letras del código (sin I ni O, que se confunden con 1 y 0). */
export const CODIGO_LETRAS = "ABCDEFGHJKLMNPQRSTUVWXYZ";

/** El código tal como lo escribe alguien («kx rm pt» → «KXRMPT»), o null si no es un código. */
export function limpiarCodigo(entrada: unknown): string | null {
  if (typeof entrada !== "string") return null;
  const c = entrada.normalize("NFD").replace(/[̀-ͯ]/g, "").toUpperCase().replace(/[^A-Z]/g, "");
  if (c.length !== CODIGO_LARGO) return null;
  for (const ch of c) if (!CODIGO_LETRAS.includes(ch)) return null;
  return c;
}

/** Una sala sin movimiento se cierra sola después de esto. */
export const SALA_QUIETA_MS = 20 * 60_000;
/** Quien no está en la ciudad ni pregunta por la sala en este tiempo sale de ella. */
export const AUSENTE_SALA_MS = 90_000;
/** Las invitaciones a la sala: duran esto, una a la misma persona cada tanto y unas pocas por minuto. */
export const INVITACION_SALA_S = 90;
export const INVITAR_SALA_CADA_MS = 20_000;
export const INVITACIONES_SALA_POR_MINUTO = 6;

/** Las frases fijas de la sala (y los versículos rápidos de la ciudad, que también valen aquí). */
export const FRASES_SALA: { id: string; texto: string }[] = [
  { id: "s-listo", texto: "¡Listo!" },
  { id: "s-vamos", texto: "¡Vamos!" },
  { id: "s-espera", texto: "Espérenme un momento" },
  { id: "s-bien", texto: "¡Bien hecho!" },
  { id: "s-rapido", texto: "¡Qué rápido!" },
  { id: "s-casi", texto: "¡Casi!" },
  { id: "s-animo", texto: "¡Ánimo, equipo!" },
  { id: "s-otra", texto: "¡Otra partida!" },
  { id: "s-gusto", texto: "¡Qué gusto jugar juntos!" },
  { id: "s-gracias", texto: "¡Gracias por jugar!" },
  { id: "s-corre", texto: "¡A correr!" },
  { id: "s-piedras", texto: "¡Traigan piedras al muro!" },
  { id: "s-amen", texto: "¡Amén!" },
  { id: "s-gloria", texto: "¡Gloria a Dios!" },
];
/** Una frase cada 2 s y como mucho 15 por minuto; se ven las últimas 12. */
export const FRASE_SALA_CADA_MS = 2000;
export const FRASES_SALA_POR_MINUTO = 15;
export const FRASES_SALA_VISTAS = 12;

// ---------------------------------------------------------------- los tiempos de cada juego
/** Unos segundos antes de empezar (y entre rondas), y lo que se ve la respuesta. */
export const PREPARAR_MS = 4000;
export const REVELAR_MS = 4500;
/** Gracia por la red al responder. */
export const GRACIA_MS = 1500;

export const ESGRIMA = { rondas: 10, segundos: 20, ventanaMs: 3000, primero: 3, acierto: 1 } as const;

export type TribuDef = { nombre: string; icono: string; color: string; ref: string };
/** Las tribus de los equipos, con su bendición de Génesis 49. */
export const TRIBUS_EQUIPOS: TribuDef[] = [
  { nombre: "Judá", icono: "🦁", color: "#b8432f", ref: "Génesis 49:9" },
  { nombre: "Benjamín", icono: "🐺", color: "#3b6fb6", ref: "Génesis 49:27" },
  { nombre: "Neftalí", icono: "🦌", color: "#3f8f4f", ref: "Génesis 49:21" },
  { nombre: "Zabulón", icono: "⛵", color: "#c99024", ref: "Génesis 49:13" },
];
export const TRIBUS = { turnos: 12, segundos: 25, roboSegundos: 12, puntos: 100, puntosRobo: 50, minEquipos: 2, maxEquipos: 4 } as const;

export const QUIEN = { rondas: 6, pistas: 5, pistaMs: 7000, finalMs: 8000, puntos: [100, 80, 60, 40, 20], opciones: 6 } as const;
/** Los puntos de «¿Quién soy?» según cuántas pistas se veían al responder (1 a 5). */
export const puntosQuien = (pistas: number) => QUIEN.puntos[Math.max(1, Math.min(QUIEN.pistas, Math.floor(pistas))) - 1];
/** Cuántas pistas se ven a los `ms` de haber empezado la ronda. */
export const pistasVistas = (ms: number) => Math.max(1, Math.min(QUIEN.pistas, 1 + Math.floor(Math.max(0, ms) / QUIEN.pistaMs)));
/** Lo que dura una ronda de «¿Quién soy?» (la última pista queda unos segundos). */
export const QUIEN_RONDA_MS = (QUIEN.pistas - 1) * QUIEN.pistaMs + QUIEN.finalMs;

export const CARRERA = {
  puntos: 5,
  /** La carrera dura esto como mucho, y cuando llega el primero, los demás tienen un minuto más. */
  limiteMs: 240_000,
  despuesDelPrimeroMs: 60_000,
  radio: 2.6,
  salidaMs: 5000,
  /**
   * Nadie corre más que una persona (corriendo se va a 7,3 m/s): cada uno tiene un margen de metros que se llena a 8,6 m/s
   * y guarda como mucho 12 m (por si la red junta varias posiciones). Quien lo pasa (con «Ir a…» o una trampa) saltó.
   */
  margenM: 12,
  velocidadMax: 8.6,
} as const;

/** El margen de metros después de moverse `d` metros en `dt` segundos (si queda negativo, fue un salto). */
export function margenDespues(margen: number, d: number, dt: number): number {
  return Math.min(CARRERA.margenM, margen + CARRERA.velocidadMax * Math.max(0, dt)) - Math.max(0, d);
}

export const MURO = { ms: 300_000, porJugador: 15, minimo: 30, maximo: 180, radioCantera: 2.6, radioTramo: 3.4, salidaMs: 4000 } as const;
/** Las piedras que pide el tramo según cuántos juegan. */
export const metaDelMuro = (jugadores: number) => Math.max(MURO.minimo, Math.min(MURO.maximo, MURO.porJugador * Math.max(1, jugadores)));

// ---------------------------------------------------------------- los lugares (las mismas coordenadas de la ciudad)
type Rect = [number, number, number, number];
type V2 = [number, number];

/**
 * El patio de los juegos: en la franja del norte de la ciudad, entre el barrio de la puerta de las Ovejas y el muro
 * norte (allí solo había casas sin dueño, que ahora quedan fuera). La puerta mira al barrio y a la plaza.
 */
export const PATIO: Rect = [44, -68, 70, -52];
/** Lo que ocupa con su calle de entrada (las casas sin dueño no se ponen ahí). */
export const PATIO_ZONA: Rect = [42.5, -70.2, 71.5, -49.4];
/** La puerta (en el muro del sur del patio) y su ancho. */
export const PATIO_PUERTA: V2 = [57, -52];
export const PATIO_PUERTA_ANCHO = 4.2;
/** La mesa de los juegos (su círculo abre el patio), donde se sale y se llega en la carrera, la cantera y el tramo del muro. */
export const PATIO_MESA: V2 = [50.6, -55.2];
export const PATIO_SALIDA: V2 = [57, -60];
export const CANTERA: V2 = [65.2, -55.4];
export const TRAMO = { x0: 47.5, x1: 59.5, z: -66.6 } as const;
export const TRAMO_CENTRO: V2 = [(TRAMO.x0 + TRAMO.x1) / 2, TRAMO.z + 1.6];

export function enElPatio(x: number, z: number, margen = 0.6): boolean {
  return x > PATIO[0] - margen && x < PATIO[2] + margen && z > PATIO[1] - margen && z < PATIO[3] + margen;
}

export type LugarCarrera = { id: string; nombre: string; x: number; z: number };
/** Los lugares de la ciudad por donde pasa la carrera (todos en calles y plazas, donde se puede pisar). */
export const LUGARES_CARRERA: LugarCarrera[] = [
  { id: "pozo", nombre: "El pozo de la plaza", x: 56, z: -1.2 },
  { id: "puerta", nombre: "La puerta de los ancianos", x: 70.5, z: 0 },
  { id: "escalinata", nombre: "El pie de la escalinata del templo", x: 43.6, z: 0 },
  { id: "palacio", nombre: "El pórtico del palacio", x: 17, z: 17.4 },
  { id: "escuela", nombre: "La puerta de la escuela de los profetas", x: 17, z: -19 },
  { id: "oracion", nombre: "El monte de la oración", x: 5.8, z: -28.5 },
  { id: "siervos", nombre: "La calle de los siervos", x: 56, z: 57 },
  { id: "siloe", nombre: "El estanque de Siloé", x: 35.1, z: 62.4 },
  { id: "david", nombre: "La calle de la Ciudad de David", x: 56, z: 25 },
  { id: "ovejas", nombre: "La calle de la puerta de las Ovejas", x: 56, z: -25 },
  { id: "ofel", nombre: "La calle de Ofel", x: 14, z: 47 },
  { id: "efrain", nombre: "La calle de la puerta de Efraín", x: 14, z: -47 },
  { id: "sabiduria", nombre: "La casa de la sabiduría", x: 45.6, z: 8 },
  { id: "camara", nombre: "La cámara de los sacerdotes", x: 44, z: -8 },
];
export const LLEGADA_CARRERA: LugarCarrera = { id: "patio", nombre: "El patio de los juegos", x: PATIO_SALIDA[0], z: PATIO_SALIDA[1] };

/** Un azar con semilla (el mismo recorrido para la misma semilla). */
export function azarDe(semilla: number): () => number {
  let s = semilla >>> 0 || 1;
  return () => {
    s ^= s << 13;
    s >>>= 0;
    s ^= s >>> 17;
    s ^= s << 5;
    s >>>= 0;
    return s / 4294967296;
  };
}

/**
 * El recorrido de una carrera: cinco lugares distintos, en orden, cada tramo de 22 a 90 m (ni muy cerca ni toda la
 * ciudad de una vez), y al final la vuelta al patio. El servidor elige la semilla.
 */
export function recorridoDeCarrera(semilla: number, n: number = CARRERA.puntos): LugarCarrera[] {
  const azar = azarDe(semilla);
  for (let intento = 0; intento < 60; intento++) {
    const libres = [...LUGARES_CARRERA];
    const out: LugarCarrera[] = [];
    let desde: { x: number; z: number } = LLEGADA_CARRERA;
    while (out.length < n && libres.length) {
      const buenos = libres.filter((l) => {
        const d = Math.hypot(l.x - desde.x, l.z - desde.z);
        return d >= 22 && d <= 90;
      });
      if (!buenos.length) break;
      const l = buenos[Math.floor(azar() * buenos.length)];
      out.push(l);
      libres.splice(libres.indexOf(l), 1);
      desde = l;
    }
    if (out.length === n && Math.hypot(desde.x - LLEGADA_CARRERA.x, desde.z - LLEGADA_CARRERA.z) <= 110) return [...out, LLEGADA_CARRERA];
  }
  return [...LUGARES_CARRERA.slice(0, n), LLEGADA_CARRERA];
}

// ---------------------------------------------------------------- los premios
/** El gozo de los juegos en grupo tiene su tope por día (entre todas las partidas). */
export const GOZO_JUEGOS_DIA = 60;
/** Gozo por el puesto (1.º, 2.º, 3.º) y por jugar; en las tribus, la que gana, las demás o el empate; en el muro, levantado o no. */
export const GOZO_PUESTOS = [12, 8, 6] as const;
export const GOZO_JUGAR = 4;
export const GOZO_TRIBU = { gana: 12, pierde: 5, empate: 8 } as const;
export const GOZO_MURO = { levantado: 12, noAlcanzo: 4 } as const;
/** En el muro, para el premio hay que poner al menos estas piedras. */
export const MURO_APORTE_MIN = 3;
/** Los logros del patio. */
export const LOGRO_PATIO_JUGAR = 10;
export const LOGRO_PATIO_GANAR = 5;

/** Las prendas del patio: no se venden, se ganan (la primera vez que se gana cada juego). */
export const PRENDAS_JUEGOS: { id: string; nombre: string; color: string; juego: JuegoId; detalle: string }[] = [
  { id: "faja-espada-espiritu", nombre: "Faja de la espada del Espíritu", color: "#7a8fab", juego: "esgrima", detalle: "Se gana al ganar una «Esgrima bíblica» en el patio de los juegos (Efesios 6:17)." },
  { id: "manto-doce-tribus", nombre: "Manto de las doce tribus", color: "#5b3f8c", juego: "tribus", detalle: "Se gana cuando tu tribu gana «Las doce tribus» en el patio de los juegos (Salmos 122:4)." },
  { id: "faja-nube-testigos", nombre: "Faja de la nube de testigos", color: "#9aa9bf", juego: "quien", detalle: "Se gana al ganar «¿Quién soy?» en el patio de los juegos (Hebreos 12:1)." },
  { id: "faja-ahimaas", nombre: "Faja del corredor Ahimaas", color: "#d9772b", juego: "carrera", detalle: "Se gana al ganar «La carrera de Ahimaas» por las calles de Jerusalén (2 Samuel 18:23)." },
  { id: "manto-nehemias", nombre: "Manto de los que edificaron el muro", color: "#8a7356", juego: "muro", detalle: "Se gana al levantar con tu grupo «Levantemos el muro» en el patio de los juegos (Nehemías 4:6)." },
];

// ---------------------------------------------------------------- lo que ve cada uno (la API y la red)
export type EstadoSala = "espera" | "jugando" | "fin";

export type MiembroVista = {
  pj: number;
  nombre: string;
  camino: Camino;
  /** Dijo que está a punto. */
  listo: boolean;
  anfitrion: boolean;
  /** Su tribu (0 a 3) en «Las doce tribus». */
  equipo: number | null;
  yo: boolean;
  /** Está en la ciudad (o en el templo) ahora. */
  conectado: boolean;
  /** Está dentro del patio (para la carrera y el muro). */
  enPatio: boolean;
  /** Un compañero de la computadora (con su nivel); null si es una persona. */
  bot?: NivelBot | null;
};

export type FraseVista = { n: number; de: string; texto: string; ref?: string };

export type EsgrimaVista = {
  juego: "esgrima";
  ronda: number;
  rondas: number;
  fase: "preparar" | "pregunta" | "revelar";
  /** Milisegundos que faltan para que cambie la fase (o se acabe el tiempo). */
  restanteMs: number;
  segundos: number;
  /** «cita»: sale la cita y las opciones son versículos; «verso»: sale el versículo y las opciones son citas. */
  pregunta: { modo: "cita" | "verso"; muestra: string; opciones: string[] } | null;
  miRespuesta: string | null;
  respondieron: number;
  /** Ya acertó alguien: la ronda se cierra en unos segundos. */
  yaAcerto: string | null;
  revelado: {
    modo: "cita" | "verso";
    muestra: string;
    correcta: string;
    verso: Verso;
    primero: string | null;
    aciertos: { nombre: string; ms: number }[];
    mia: string | null;
    bien: boolean;
    puntos: number;
  } | null;
  tabla: { pj: number; nombre: string; puntos: number; yo: boolean }[];
};

export type TribuVista = { n: number; nombre: string; icono: string; color: string; puntos: number; miembros: string[] };
export type TribusVista = {
  juego: "tribus";
  turno: number;
  turnos: number;
  fase: "preparar" | "pregunta" | "robo" | "revelar";
  restanteMs: number;
  segundos: number;
  enTurno: number;
  miTribu: number | null;
  /** Puedo responder ahora (es el turno de mi tribu, o el robo y mi tribu no es la del turno ni respondió). */
  puedoResponder: boolean;
  /** Mi tribu ya respondió en esta fase (y qué). */
  respondioMiTribu: string | null;
  pregunta: { texto: string; opciones: string[]; quitada: string | null } | null;
  revelado: {
    texto: string;
    correcta: string;
    explica: string;
    ref: string;
    /** Quién se llevó los puntos: la tribu del turno, una que robó, o ninguna. */
    gano: { tribu: number; como: "turno" | "robo" } | null;
    falloTurno: string | null;
  } | null;
  tribus: TribuVista[];
};

export type QuienVista = {
  juego: "quien";
  ronda: number;
  rondas: number;
  fase: "preparar" | "pistas" | "revelar";
  restanteMs: number;
  /** Las pistas que ya salieron (de la más difícil a la más fácil). */
  pistas: string[];
  totalPistas: number;
  opciones: string[];
  miRespuesta: string | null;
  respondieron: number;
  revelado: {
    nombre: string;
    verso: Verso;
    aciertos: { nombre: string; pistas: number; puntos: number }[];
    mia: string | null;
    bien: boolean;
    puntos: number;
  } | null;
  tabla: { pj: number; nombre: string; puntos: number; yo: boolean }[];
};

export type CarreraVista = {
  juego: "carrera";
  fase: "preparar" | "corriendo";
  restanteMs: number;
  /** Los lugares en orden (el último es la vuelta al patio). */
  puntos: { n: number; nombre: string; x: number; z: number; r: number }[];
  /** El índice del lugar que me toca (puntos.length si ya llegué). */
  miSiguiente: number;
  /** Salté (con «Ir a…» o se cortó la red): tengo que volver al último lugar. */
  saltoMio: boolean;
  /** Mi tiempo al llegar (ms desde la salida). */
  miTiempo: number | null;
  corredores: { pj: number; nombre: string; siguiente: number; tiempo: number | null; yo: boolean }[];
};

export type MuroVista = {
  juego: "muro";
  fase: "preparar" | "obra";
  restanteMs: number;
  meta: number;
  puestas: number;
  /** Llevo una piedra en las manos. */
  llevo: boolean;
  cantera: { x: number; z: number; r: number };
  tramo: { x: number; z: number; r: number; x0: number; x1: number; zMuro: number };
  aportes: { pj: number; nombre: string; n: number; yo: boolean }[];
};

/** Una partida de un juego de mesa (la vista del juego va en `mesa.vista`). */
export type MesaPartidaVista = { juego: "mesa"; restanteMs: number; mesa: MesaVista };

export type PartidaVista = EsgrimaVista | TribusVista | QuienVista | CarreraVista | MuroVista | MesaPartidaVista;

export type ResultadoVista = {
  juego: JuegoId;
  /** El juego de mesa (si `juego` es «mesa»). */
  mesa?: string | null;
  /** El tablero al terminar un juego de mesa (la última jugada, la línea ganadora; lo que se tapaba, a la vista). */
  mesaFinal?: { vista: unknown; asientos: (AsientoMesa & { yo: boolean })[]; ultima: MesaVista["ultima"] } | null;
  /** Un resumen: quién ganó, o si el muro se levantó. */
  titulo: string;
  puestos: { puesto: number; pj: number; nombre: string; puntos: number; detalle: string; gano: boolean; yo: boolean; tribu: number | null }[];
  tribus: TribuVista[] | null;
  /** Lo que gané yo (null mientras el servidor lo anota, o si no jugué). */
  mio: { gozo: number; topeHoy: boolean; prenda: string | null; copa: number; gozoTotal: number | null; sinPremio: string | null; practica?: boolean } | null;
  /** El servidor todavía está anotando los premios. */
  anotando: boolean;
  cumplido?: boolean;
};

export type SalaVista = {
  codigo: string;
  juego: JuegoId;
  /** El juego de mesa elegido (si `juego` es «mesa»). */
  mesa: string | null;
  /** Lo que eligió el anfitrión para ese juego de mesa (la figura de la lotería, el ritmo del cantor…). */
  opcionesMesa?: Record<string, string>;
  /** Cuántas tribus (en «Las doce tribus»). */
  tribus: number;
  estado: EstadoSala;
  /** Sube con cada cambio (para no pisar lo nuevo con lo viejo). */
  ver: number;
  miembros: MiembroVista[];
  soyAnfitrion: boolean;
  max: number;
  frases: FraseVista[];
  /** Si el anfitrión puede empezar, o por qué no. */
  puedeEmpezar: { ok: boolean; motivo: string | null };
  partida: PartidaVista | null;
  resultado: ResultadoVista | null;
  /** Dentro de cuánto cambia algo en el servidor (para preguntar de nuevo si la red no avisó). */
  proximoMs: number | null;
};

/** Una sala abierta de un amigo o vecino (para unirse sin el código). */
export type SalaAbierta = { codigo: string; juego: JuegoId; mesa?: string | null; anfitrion: string; jugadores: number; max: number; conocidos: string[] };

/** La invitación que le llega a un amigo o vecino. */
export type InvitacionSala = { codigo: string; juego: JuegoId; mesa?: string | null; de: string; camino: Camino; restantes: number };

/** A quién se puede invitar ahora. */
export type InvitableSala = { personajeId: number; nombre: string; camino: Camino; donde: string; relacion: "amigo" | "vecino" | "ambos" };

export type PatioEstado = {
  sala: SalaVista | null;
  salas: SalaAbierta[];
  hoy: { gozo: number; tope: number };
  partidas: number;
  ganadas: number;
  porJuego: Record<JuegoId, { jugadas: number; ganadas: number }>;
  prendas: string[];
};
