/**
 * Calendario hebreo del templo. Cada día de servicio del juego es una fecha del año bíblico: el
 * día 1 es el 1 de Abib, el mes primero (Éxodo 12:2), como cuando Ezequías abrió las puertas de la
 * casa de Jehová (2 Crónicas 29:3, 17). Los meses son lunares, de 30 y 29 días (354 días al año).
 *
 * Las fiestas son las de Levítico 23, las que se guardaban en los días de Ezequías. Las comparten
 * el templo del modo local y Jerusalén en línea; más adelante el palacio y la escuela de los
 * profetas las vivirán cada uno a su manera.
 *
 * Las citas entre comillas son textuales de la Reina-Valera 1960.
 */

export type Verso = { text: string; ref: string };

export type MesHebreo = { n: number; nombre: string; otro?: string; dias: number; cita?: string };

/** Los doce meses con los nombres que usa la Biblia (los del cuarto y el quinto no se nombran). */
export const MESES: MesHebreo[] = [
  { n: 1, nombre: "Abib", otro: "Nisán", dias: 30, cita: "Éxodo 13:4" },
  { n: 2, nombre: "Zif", dias: 29, cita: "1 Reyes 6:1" },
  { n: 3, nombre: "Siván", dias: 30, cita: "Ester 8:9" },
  { n: 4, nombre: "mes cuarto", dias: 29 },
  { n: 5, nombre: "mes quinto", dias: 30 },
  { n: 6, nombre: "Elul", dias: 29, cita: "Nehemías 6:15" },
  { n: 7, nombre: "Etanim", dias: 30, cita: "1 Reyes 8:2" },
  { n: 8, nombre: "Bul", dias: 29, cita: "1 Reyes 6:38" },
  { n: 9, nombre: "Quisleu", dias: 30, cita: "Nehemías 1:1" },
  { n: 10, nombre: "Tebet", dias: 29, cita: "Ester 2:16" },
  { n: 11, nombre: "Sebat", dias: 30, cita: "Zacarías 1:7" },
  { n: 12, nombre: "Adar", dias: 29, cita: "Ester 3:7" },
];

export const DIAS_ANIO = MESES.reduce((a, m) => a + m.dias, 0); // 354

export type FiestaId = "lunaNueva" | "pascua" | "panes" | "primicias" | "pentecostes" | "trompetas" | "expiacion" | "tabernaculos" | "asamblea";

export type Fiesta = {
  id: FiestaId;
  nombre: string;
  /** Lo que se lee en el aviso de abajo. */
  corto: string;
  /** Mes y día en que empieza, y cuántos días dura (la luna nueva es el día 1 de cada mes). */
  mes: number;
  dia: number;
  duracion: number;
  /** Qué pasa en el templo esos días. */
  efecto: string;
  /** La ley de la fiesta y su cumplimiento en Cristo. */
  ley: Verso;
  cristo: Verso;
  /** Para hoy: qué nos enseña. */
  hoy: string;
  /** Gozo en el templo local y mérito en línea (1 = igual). */
  gozo: number;
  merito: number;
  /** Cada cuánto llega gente (menos de 1 = más gente). */
  gente: number;
  /** La ofrenda que más traen esos días. */
  ofrenda?: "cordero" | "cereal" | "palomas";
  /** Llegan peregrinos de tierras lejanas. */
  peregrinos?: boolean;
  /** Día solemne: no hay música ni fiesta. */
  solemne?: boolean;
  icono: string;
};

export const FIESTAS: Fiesta[] = [
  {
    id: "pascua",
    nombre: "La Pascua",
    corto: "Pascua de Jehová",
    mes: 1,
    dia: 14,
    duracion: 1,
    efecto: "Las familias traen corderos para la Pascua y llega mucha gente.",
    ley: { text: "En el mes primero, a los catorce del mes, entre las dos tardes, pascua es de Jehová.", ref: "Levítico 23:5" },
    cristo: { text: "porque nuestra pascua, que es Cristo, ya fue sacrificada por nosotros.", ref: "1 Corintios 5:7" },
    hoy: "El cordero de la Pascua anunciaba a Jesús, el Cordero de Dios. Su sangre nos libra.",
    gozo: 1.5,
    merito: 1.5,
    gente: 0.7,
    ofrenda: "cordero",
    icono: "🐑",
  },
  {
    id: "panes",
    nombre: "Los panes sin levadura",
    corto: "Panes sin levadura",
    mes: 1,
    dia: 15,
    duracion: 7,
    efecto: "Siete días de fiesta: el pueblo trae ofrendas de flor de harina.",
    ley: { text: "Y a los quince días de este mes es la fiesta solemne de los panes sin levadura a Jehová; siete días comeréis panes sin levadura.", ref: "Levítico 23:6" },
    cristo: { text: "Así que celebremos la fiesta, no con la vieja levadura, ni con la levadura de malicia y de maldad, sino con panes sin levadura, de sinceridad y de verdad.", ref: "1 Corintios 5:8" },
    hoy: "La levadura es figura del pecado que se esparce. Dios nos llama a vivir con sinceridad y verdad.",
    gozo: 1.25,
    merito: 1.25,
    gente: 0.85,
    ofrenda: "cereal",
    icono: "🫓",
  },
  {
    id: "primicias",
    nombre: "La gavilla de las primicias",
    corto: "Primicias de la cosecha",
    mes: 1,
    dia: 16,
    duracion: 1,
    efecto: "La primera ofrenda del día es la primicia: vale cinco veces más.",
    ley: { text: "traeréis al sacerdote una gavilla por primicia de los primeros frutos de vuestra siega.", ref: "Levítico 23:10" },
    cristo: { text: "Mas ahora Cristo ha resucitado de los muertos; primicias de los que durmieron es hecho.", ref: "1 Corintios 15:20" },
    hoy: "Lo primero es para Dios. Jesús resucitó como primicia: su resurrección anuncia la nuestra.",
    gozo: 1.25,
    merito: 1.25,
    gente: 0.85,
    ofrenda: "cereal",
    icono: "🌾",
  },
  {
    id: "pentecostes",
    nombre: "Pentecostés, la fiesta de las semanas",
    corto: "Pentecostés",
    mes: 3,
    dia: 6,
    duracion: 1,
    efecto: "Cincuenta días después de las primicias: llegan peregrinos con el grano nuevo.",
    ley: { text: "Hasta el día siguiente del séptimo día de reposo contaréis cincuenta días; entonces ofreceréis el nuevo grano a Jehová.", ref: "Levítico 23:16" },
    cristo: { text: "Cuando llegó el día de Pentecostés, estaban todos unánimes juntos.", ref: "Hechos 2:1" },
    hoy: "En Pentecostés vino el Espíritu Santo sobre la iglesia, y personas de muchas naciones oyeron el evangelio.",
    gozo: 1.5,
    merito: 1.5,
    gente: 0.6,
    ofrenda: "cereal",
    peregrinos: true,
    icono: "🔥",
  },
  {
    id: "trompetas",
    nombre: "El día de las trompetas",
    corto: "Día de las trompetas",
    mes: 7,
    dia: 1,
    duracion: 1,
    efecto: "Las trompetas suenan en cada hora del sacrificio: es una santa convocación.",
    ley: { text: "Habla a los hijos de Israel y diles: En el mes séptimo, al primero del mes tendréis día de reposo, una conmemoración al son de trompetas, y una santa convocación.", ref: "Levítico 23:24" },
    cristo: { text: "Porque el Señor mismo con voz de mando, con voz de arcángel, y con trompeta de Dios, descenderá del cielo; y los muertos en Cristo resucitarán primero.", ref: "1 Tesalonicenses 4:16" },
    hoy: "La trompeta llamaba al pueblo a reunirse. Un día sonará la trompeta de Dios y Cristo volverá.",
    gozo: 1.3,
    merito: 1.25,
    gente: 0.8,
    icono: "🎺",
  },
  {
    id: "expiacion",
    nombre: "El Día de la Expiación",
    corto: "Día de la Expiación",
    mes: 7,
    dia: 10,
    duracion: 1,
    efecto: "Día de ayuno y de humillación: viene menos gente. El sumo sacerdote entra una vez al año al Lugar Santísimo.",
    ley: { text: "Porque en este día se hará expiación por vosotros, y seréis limpios de todos vuestros pecados delante de Jehová.", ref: "Levítico 16:30" },
    cristo: { text: "y no por sangre de machos cabríos ni de becerros, sino por su propia sangre, entró una vez para siempre en el Lugar Santísimo, habiendo obtenido eterna redención.", ref: "Hebreos 9:12" },
    hoy: "Lo que el sumo sacerdote hacía cada año, Jesús lo hizo una vez para siempre con su propia sangre.",
    gozo: 1,
    merito: 1,
    gente: 1.8,
    solemne: true,
    icono: "🕊️",
  },
  {
    id: "tabernaculos",
    nombre: "La fiesta de los tabernáculos",
    corto: "Fiesta de los tabernáculos",
    mes: 7,
    dia: 15,
    duracion: 7,
    efecto: "Siete días de alegría: enramadas en el gran atrio y peregrinos de tierras lejanas.",
    ley: { text: "Y te alegrarás en tus fiestas solemnes, tú, tu hijo, tu hija, tu siervo, tu sierva, y el levita, el extranjero, el huérfano y la viuda que viven en tus poblaciones.", ref: "Deuteronomio 16:14" },
    cristo: { text: "Y aquel Verbo fue hecho carne, y habitó entre nosotros (y vimos su gloria, gloria como del unigénito del Padre), lleno de gracia y de verdad.", ref: "Juan 1:14" },
    hoy: "Israel vivía en enramadas para recordar que Dios lo cuidó en el desierto. En Jesús, Dios vino a habitar con nosotros.",
    gozo: 1.5,
    merito: 1.5,
    gente: 0.6,
    peregrinos: true,
    icono: "🌿",
  },
  {
    id: "asamblea",
    nombre: "El octavo día, santa convocación",
    corto: "Santa convocación",
    mes: 7,
    dia: 22,
    duracion: 1,
    efecto: "El día después de los tabernáculos: el pueblo se reúne otra vez delante de Jehová.",
    ley: { text: "el octavo día tendréis santa convocación, y ofreceréis ofrenda encendida a Jehová; es fiesta, ningún trabajo de siervos haréis.", ref: "Levítico 23:36" },
    cristo: { text: "En el último y gran día de la fiesta, Jesús se puso en pie y alzó la voz, diciendo: Si alguno tiene sed, venga a mí y beba.", ref: "Juan 7:37" },
    hoy: "Al terminar la fiesta, Jesús invitó a todos a ir a él y beber del agua de vida.",
    gozo: 1.25,
    merito: 1.25,
    gente: 0.85,
    icono: "💧",
  },
  {
    id: "lunaNueva",
    nombre: "La luna nueva",
    corto: "Luna nueva: principio de mes",
    mes: 0,
    dia: 1,
    duracion: 1,
    efecto: "Principio de mes: los sacerdotes tocan las trompetas sobre los holocaustos.",
    ley: { text: "Tocad la trompeta en la nueva luna, En el día señalado, en el día de nuestra fiesta solemne.", ref: "Salmo 81:3" },
    cristo: { text: "Por tanto, nadie os juzgue en comida o en bebida, o en cuanto a días de fiesta, luna nueva o días de reposo, todo lo cual es sombra de lo que ha de venir; pero el cuerpo es de Cristo.", ref: "Colosenses 2:16-17" },
    hoy: "Cada mes empezaba recordando a Dios. Las fiestas eran sombra; lo verdadero es Cristo.",
    gozo: 1.15,
    merito: 1.1,
    gente: 0.9,
    icono: "🌙",
  },
];

export const FIESTA = Object.fromEntries(FIESTAS.map((f) => [f.id, f])) as Record<FiestaId, Fiesta>;

/** Día del año (1 a 354) de una fiesta. */
function diaDelAnio(mes: number, dia: number): number {
  let n = 0;
  for (let i = 0; i < mes - 1; i++) n += MESES[i].dias;
  return n + dia;
}

export type FiestaHoy = {
  fiesta: Fiesta;
  /** Día de la fiesta (1 … duración). */
  dia: number;
  /** Último día de una fiesta de varios días. */
  ultimo: boolean;
};

export type Fecha = {
  /** Día de servicio del juego (1, 2, 3…). */
  numero: number;
  anio: number;
  mes: MesHebreo;
  dia: number;
  /** «14 de Abib». */
  texto: string;
  /** Las fiestas de hoy, la principal primero (la luna nueva solo si no hay otra). */
  fiestas: FiestaHoy[];
};

/** La fecha hebrea de un día del juego (el día 1 es el 1 de Abib del año 1). */
export function fechaDe(numero: number): Fecha {
  const n = Math.max(1, Math.floor(numero));
  const anio = Math.floor((n - 1) / DIAS_ANIO) + 1;
  let resto = ((n - 1) % DIAS_ANIO) + 1;
  let mes = MESES[0];
  for (const m of MESES) {
    if (resto <= m.dias) {
      mes = m;
      break;
    }
    resto -= m.dias;
  }
  const dia = resto;
  const doy = diaDelAnio(mes.n, dia);
  const fiestas: FiestaHoy[] = [];
  for (const f of FIESTAS) {
    if (f.id === "lunaNueva") continue;
    const inicio = diaDelAnio(f.mes, f.dia);
    if (doy >= inicio && doy < inicio + f.duracion) fiestas.push({ fiesta: f, dia: doy - inicio + 1, ultimo: f.duracion > 1 && doy === inicio + f.duracion - 1 });
  }
  // la primicia es dentro de los panes sin levadura: va primero porque es la de ese día
  fiestas.sort((a, b) => a.fiesta.duracion - b.fiesta.duracion);
  if (dia === 1 && !fiestas.length) fiestas.push({ fiesta: FIESTA.lunaNueva, dia: 1, ultimo: false });
  return { numero: n, anio, mes, dia, texto: `${dia} de ${mes.nombre}`, fiestas };
}

/** La próxima fiesta grande (sin contar la luna nueva) y en cuántos días empieza. */
export function proximaFiesta(numero: number): { fiesta: Fiesta; enDias: number; fecha: Fecha } | null {
  for (let k = 1; k <= DIAS_ANIO; k++) {
    const f = fechaDe(numero + k);
    const empieza = f.fiestas.find((x) => x.dia === 1 && x.fiesta.id !== "lunaNueva");
    if (empieza) return { fiesta: empieza.fiesta, enDias: k, fecha: f };
  }
  return null;
}

/** La fecha de inicio de una fiesta, por ejemplo «15 de Etanim». */
export function fechaDeFiesta(f: Fiesta): string {
  if (f.id === "lunaNueva") return "el 1 de cada mes";
  return `${f.dia} de ${MESES[f.mes - 1].nombre}${f.duracion > 1 ? ` (${f.duracion} días)` : ""}`;
}

// ---------------------------------------------------------------- reloj común de Jerusalén en línea
/** Segundos de juego que dura un día del templo (el mismo ritmo del modo local). */
export const SEGUNDOS_DIA = 240;
/** Lunes 9 de noviembre de 2026 a las 00:00 en Texas (UTC-6): el 1 de Abib del año 1 en línea. */
export const EPOCA_EN_LINEA = Date.UTC(2026, 10, 9, 6, 0, 0);

/** El día y la hora (0 a 1) que viven a la vez todos los que juegan en línea. */
export function relojEnLinea(ahora = Date.now()): { dia: number; hora: number } {
  const t = Math.max(0, (ahora - EPOCA_EN_LINEA) / 1000 / SEGUNDOS_DIA);
  const entero = Math.floor(t);
  return { dia: entero + 1, hora: t - entero };
}
