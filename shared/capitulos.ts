/**
 * La historia de la temporada de Jerusalén en línea (pedido del análisis crítico del 11 de noviembre de 2026: algo que dé
 * ganas de volver cada semana y que diga «¿qué pasará la próxima?»). La temporada dura 28 días (server/jerusalen.ts,
 * temporadaDe); cada semana es un capítulo, con una meta de toda la ciudad que suman los deberes, los encargos y los
 * recados de todos (la lleva el servidor: server/capitulos.ts) y un premio para quienes ayudaron. Al final, la fiesta
 * en la plaza, en la que participa toda la ciudad.
 *
 * Las historias (en PROGRAMA, al final):
 * - Temporada 1: la amenaza de Senaquerib en los días del rey Ezequías (2 Reyes 18–20; 2 Crónicas 32; Isaías 36–37).
 * - Temporada 2: la gran Pascua de Ezequías, en el primer año de su reinado (2 Crónicas 29–31).
 * Después se vuelven a contar en orden, una por temporada, hasta que llegue otra nueva. Las citas son literales de la
 * RVR1960 (comprobadas con la Biblia del sitio).
 */
import type { Verso } from "./ciudad";
import { TEMPORADA_DIAS } from "./jerusalen";
import type { Chisme, PersonajeId, Recado } from "./personajes";

export type CapituloId = "muro" | "canal" | "rabsaces" | "liberacion" | "puertas" | "cantico" | "cartas" | "pascua";
/** Quien habla en la ventana de cada capítulo (los retratos del juego). */
export type HablaCapitulo = "narrador" | "ezequias" | "eliaquim" | "isaias" | "azarias" | "conanias" | "eleazar" | "etan";
export type LineaCapitulo = { quien: HablaCapitulo; texto: string; ref?: string };

export type Capitulo = {
  n: number;
  id: CapituloId;
  titulo: string;
  icono: string;
  /** Lo que cuenta la meta: [una, varias] (piedra, piedras). */
  unidad: [string, string];
  /** Lo que hace la ciudad esta semana. */
  tarea: string;
  /** La historia, en pocas palabras (palabras propias; las citas van en el verso y en el diálogo). */
  historia: string[];
  verso: Verso;
  /** Quien guía el capítulo en la calle de los siervos. */
  guia: PersonajeId;
  /** Lo que se cuenta al empezar el capítulo (una vez por personaje). */
  dialogo: LineaCapitulo[];
  /** Lo que se dice cuando la ciudad cumple la meta. */
  alCumplir: string;
  /** Para quienes ayudaron con al menos APORTE_MINIMO_CAPITULO: gozo y una prenda que no se vende. */
  premio: { gozo: number; prenda: string };
  /** Lo que cuentan los siervos esta semana (van primero en su puerta). */
  chismes: Partial<Record<PersonajeId, Chisme[]>>;
  /** Recados de la semana (se mezclan con los de siempre, desde el 12 de noviembre de 2026). */
  recados: Recado[];
};

export type FiestaFinal = {
  titulo: string;
  icono: string;
  texto: string;
  verso: Verso;
  /** Lo que se oye al dar gracias. */
  gracias: Verso;
  /** Días de la temporada (0 a 27) en que se celebra: viernes, sábado y domingo de la última semana. */
  dias: number[];
  /** La gran alabanza: el último día, a esta hora de Texas (de 18 a 19). */
  vivo: { indice: number; desde: number; hasta: number };
  /** Dónde se reúne la ciudad: la plaza (x, z y radio en metros, las coordenadas de la ciudad). */
  lugar: { x: number; z: number; r: number };
  premio: { gozo: number; vivo: number; prenda: string };
};

export type ArcoTemporada = {
  id: string;
  titulo: string;
  subtitulo: string;
  refs: string;
  lema: Verso;
  capitulos: Capitulo[];
  fiesta: FiestaFinal;
  /** Su colección en el álbum (shared/album.ts): las cinco prendas de la historia dan este título. */
  album: { icono: string; titulo: string };
};

// ---------------------------------------------------------------- las reglas
/** Lo que vale cada cosa para la meta de la ciudad. */
export const PUNTOS_CAPITULO = { deber: 1, encargo: 5, recado: 10, gracias: 10 } as const;
/** Para el premio de un capítulo hay que haber aportado al menos esto en su semana. */
export const APORTE_MINIMO_CAPITULO = 25;
/** La meta de cada capítulo se fija al empezar: tanto por cada persona que sirvió en los últimos 7 días. */
export const META_POR_VECINO = 120;
export const META_MINIMA = 400;
export const META_MAXIMA = 30000;
export const DIAS_CAPITULO = 7;

export function metaDelCapitulo(activos: number): number {
  const m = Math.round((Math.max(0, activos) * META_POR_VECINO) / 50) * 50;
  return Math.max(META_MINIMA, Math.min(META_MAXIMA, m));
}

// ---------------------------------------------------------------- días (los de Texas, como todo Jerusalén en línea)
const fmtTexas = new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" });

/** El día (AAAA-MM-DD), la hora y el minuto en Texas. */
export function enTexas(d: Date = new Date()): { dia: string; hora: number; minuto: number } {
  const p: Record<string, string> = {};
  for (const x of fmtTexas.formatToParts(d)) p[x.type] = x.value;
  return { dia: `${p.year}-${p.month}-${p.day}`, hora: Number(p.hour) % 24, minuto: Number(p.minute) };
}

const numeroDia = (dia: string) => {
  const [y, m, d] = dia.split("-").map(Number);
  return Math.round(Date.UTC(y, m - 1, d) / 86400000);
};
const claveDia = (n: number) => new Date(n * 86400000).toISOString().slice(0, 10);
/** El lunes en que empezó la primera temporada (el mismo de server/jerusalen.ts). */
const EPOCA = numeroDia("2026-11-09");

/** En qué temporada cae un día y cuál es (0 a 27; negativo antes de la primera). */
export function enLaTemporada(dia: string): { temporada: number; indice: number } {
  const n = numeroDia(dia) - EPOCA;
  const temporada = Math.max(1, Math.floor(n / TEMPORADA_DIAS) + 1);
  return { temporada, indice: n - (temporada - 1) * TEMPORADA_DIAS };
}

/** El día (AAAA-MM-DD) que es el día `indice` de una temporada. */
export function diaDeTemporada(temporada: number, indice: number): string {
  return claveDia(EPOCA + (temporada - 1) * TEMPORADA_DIAS + indice);
}

export type HoyCapitulo = { temporada: number; indice: number; arco: ArcoTemporada; capitulo: Capitulo; diaDelCapitulo: number; diasRestantes: number };

/** El capítulo de un día (o null si ese día no hay historia). */
export function capituloDelDia(dia: string): HoyCapitulo | null {
  const { temporada, indice } = enLaTemporada(dia);
  if (indice < 0 || indice >= TEMPORADA_DIAS) return null;
  const arco = arcoDeTemporada(temporada);
  const capitulo = arco?.capitulos[Math.floor(indice / DIAS_CAPITULO)];
  if (!arco || !capitulo) return null;
  const d = indice % DIAS_CAPITULO;
  return { temporada, indice, arco, capitulo, diaDelCapitulo: d + 1, diasRestantes: DIAS_CAPITULO - d };
}

export type MomentoFiesta = "antes" | "fiesta" | "vivo" | "despues";

/** Cómo está la fiesta final en este momento: se anuncia desde el capítulo 3, se celebra los últimos tres días. */
export function momentoDeFiesta(d: Date = new Date()): { momento: MomentoFiesta; temporada: number } | null {
  const t = enTexas(d);
  const { temporada, indice } = enLaTemporada(t.dia);
  const arco = arcoDeTemporada(temporada);
  if (!arco || indice < 0) return null;
  const f = arco.fiesta;
  if (indice > f.dias[f.dias.length - 1]) return { momento: "despues", temporada };
  if (!f.dias.includes(indice)) return { momento: "antes", temporada };
  const vivo = indice === f.vivo.indice && t.hora >= f.vivo.desde && t.hora < f.vivo.hasta;
  return { momento: vivo ? "vivo" : "fiesta", temporada };
}

/** La hora en palabras (18 → «6 de la tarde»). */
export function horaEnPalabras(h: number): string {
  const doce = h % 12 === 0 ? 12 : h % 12;
  return `${doce} de la ${h < 12 ? "mañana" : h < 19 ? "tarde" : "noche"}`;
}

const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
const SEMANA = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
/** «lunes 16 de noviembre». */
export function fechaEnPalabras(dia: string): string {
  const [y, m, d] = dia.split("-").map(Number);
  const dow = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  return `${SEMANA[dow]} ${d} de ${MESES[m - 1]}`;
}

// ---------------------------------------------------------------- la amenaza de Senaquerib
const V = {
  r18_13: { text: "A los catorce años del rey Ezequías, subió Senaquerib rey de Asiria contra todas las ciudades fortificadas de Judá, y las tomó.", ref: "2 Reyes 18:13" },
  r18_17: { text: "Después el rey de Asiria envió contra el rey Ezequías al Tartán, al Rabsaris y al Rabsaces, con un gran ejército, desde Laquis contra Jerusalén,", ref: "2 Reyes 18:17" },
  r18_36: { text: "Pero el pueblo calló, y no le respondió palabra; porque había mandamiento del rey, el cual había dicho: No le respondáis.", ref: "2 Reyes 18:36" },
  r18_37: { text: "Entonces Eliaquim hijo de Hilcías, mayordomo, y Sebna escriba, y Joa hijo de Asaf, canciller, vinieron a Ezequías, rasgados sus vestidos, y le contaron las palabras del Rabsaces.", ref: "2 Reyes 18:37" },
  r19_6: { text: "E Isaías les respondió: Así diréis a vuestro señor: Así ha dicho Jehová: No temas por las palabras que has oído, con las cuales me han blasfemado los siervos del rey de Asiria.", ref: "2 Reyes 19:6" },
  r19_14: { text: "Y tomó Ezequías las cartas de mano de los embajadores; y después que las hubo leído, subió a la casa de Jehová, y las extendió Ezequías delante de Jehová.", ref: "2 Reyes 19:14" },
  r19_19: { text: "Ahora, pues, oh Jehová Dios nuestro, sálvanos, te ruego, de su mano, para que sepan todos los reinos de la tierra que sólo tú, Jehová, eres Dios.", ref: "2 Reyes 19:19" },
  r19_32: { text: "Por tanto, así dice Jehová acerca del rey de Asiria: No entrará en esta ciudad, ni echará saeta en ella; ni vendrá delante de ella con escudo, ni levantará contra ella baluarte.", ref: "2 Reyes 19:32" },
  r19_33: { text: "Por el mismo camino que vino, volverá, y no entrará en esta ciudad, dice Jehová.", ref: "2 Reyes 19:33" },
  r19_35: { text: "Y aconteció que aquella misma noche salió el ángel de Jehová,", ref: "2 Reyes 19:35" },
  r19_36: { text: "Entonces Senaquerib rey de Asiria se fue, y volvió a Nínive, donde se quedó.", ref: "2 Reyes 19:36" },
  r20_20: { text: "Los demás hechos de Ezequías, y todo su poderío, y cómo hizo el estanque y el conducto, y metió las aguas en la ciudad, ¿no está escrito en el libro de las crónicas de los reyes de Judá?", ref: "2 Reyes 20:20" },
  c32_3: { text: "Tuvo consejo con sus príncipes y con sus hombres valientes, para cegar las fuentes de agua que estaban fuera de la ciudad; y ellos le apoyaron.", ref: "2 Crónicas 32:3" },
  c32_5: { text: "Después con ánimo resuelto edificó Ezequías todos los muros caídos, e hizo alzar las torres, y otro muro por fuera: fortificó además a Milo en la ciudad de David, e hizo también muchas espadas y escudos.", ref: "2 Crónicas 32:5" },
  c32_7: { text: "Esforzaos y animaos; no temáis, ni tengáis miedo del rey de Asiria, ni de toda la multitud que con él viene; porque más hay con nosotros que con él.", ref: "2 Crónicas 32:7" },
  c32_8: { text: "Con él es el brazo de carne, mas con nosotros está Jehová nuestro Dios para ayudarnos, y pelear nuestras batallas.", ref: "2 Crónicas 32:8" },
  c32_22: { text: "Así salvó Jehová a Ezequías y a los moradores de Jerusalén de las manos de Senaquerib rey de Asiria, y de las manos de todos; y les dio reposo de todos lados.", ref: "2 Crónicas 32:22" },
  c32_23: { text: "Y muchos trajeron a Jerusalén ofrenda a Jehová, y ricos presentes a Ezequías rey de Judá;", ref: "2 Crónicas 32:23" },
  c32_30: { text: "Este Ezequías cubrió los manantiales de Gihón la de arriba, y condujo el agua hacia el occidente de la ciudad de David.", ref: "2 Crónicas 32:30" },
  i8_6: { text: "Por cuanto desechó este pueblo las aguas de Siloé, que corren mansamente,", ref: "Isaías 8:6" },
  i12_3: { text: "Sacaréis con gozo aguas de las fuentes de la salvación.", ref: "Isaías 12:3" },
  i12_5: { text: "Cantad salmos a Jehová, porque ha hecho cosas magníficas; sea sabido esto por toda la tierra.", ref: "Isaías 12:5" },
  i22_11: { text: "Hicisteis foso entre los dos muros para las aguas del estanque viejo; y no tuvisteis respeto al que lo hizo, ni mirasteis de lejos al que lo labró.", ref: "Isaías 22:11" },
  s46_1: { text: "Dios es nuestro amparo y fortaleza, Nuestro pronto auxilio en las tribulaciones.", ref: "Salmo 46:1" },
  s46_7: { text: "Jehová de los ejércitos está con nosotros; Nuestro refugio es el Dios de Jacob.", ref: "Salmo 46:7" },
  s48_12: { text: "Andad alrededor de Sion, y rodeadla; Contad sus torres.", ref: "Salmo 48:12" },
  s76_1: { text: "Dios es conocido en Judá; En Israel es grande su nombre.", ref: "Salmo 76:1" },
  s126_3: { text: "Grandes cosas ha hecho Jehová con nosotros; Estaremos alegres.", ref: "Salmo 126:3" },
} satisfies Record<string, Verso>;

export const SENAQUERIB: ArcoTemporada = {
  id: "senaquerib",
  titulo: "La amenaza de Senaquerib",
  subtitulo: "Los días del rey Ezequías",
  refs: "2 Reyes 18–20 · 2 Crónicas 32 · Isaías 36–37",
  lema: V.c32_7,
  capitulos: [
    {
      n: 1,
      id: "muro",
      titulo: "El muro y las torres",
      icono: "🧱",
      unidad: ["piedra", "piedras"],
      tarea: "levantar el muro caído y alzar las torres",
      historia: [
        "Senaquerib, rey de Asiria, subió contra las ciudades fortificadas de Judá y las tomó. Ahora mira hacia Jerusalén.",
        "El rey Ezequías no se queda quieto: manda edificar los muros caídos y alzar las torres, y reúne al pueblo en la plaza de la puerta para hablarle al corazón.",
        "Toda la ciudad pone manos a la obra. Mira las tres torres nuevas del muro del oriente: suben con lo que sirve toda Jerusalén.",
      ],
      verso: V.c32_5,
      guia: "eliaquim",
      dialogo: [
        { quien: "narrador", texto: V.r18_13.text, ref: V.r18_13.ref },
        { quien: "ezequias", texto: "Pueblo de Jerusalén: ¡a los muros! Levantemos lo caído y alcemos las torres. Y no tengáis miedo: «más hay con nosotros que con él».", ref: V.c32_7.ref },
        { quien: "eliaquim", texto: "Cada deber que cumplas pone una piedra; cada encargo del día, cinco; cada recado de la calle de los siervos, diez. Esta semana la ciudad entera tiene una meta: la verás en «Para hoy»." },
      ],
      alCumplir: "¡Jerusalén levantó el muro y alzó sus torres!",
      premio: { gozo: 40, prenda: "faja-edifican" },
      chismes: {
        eliaquim: [
          { texto: "Senaquerib ya tomó las ciudades fortificadas de Judá. El rey manda: ¡todos a los muros!", verso: V.r18_13 },
          { texto: "Desde las torres nuevas se ve todo el valle. Cuando estén listas, nadie se acercará sin que lo veamos." },
        ],
        azarias: [{ texto: "Al amanecer ofrecemos el sacrificio y salimos a ver a los que edifican. Hasta los sacerdotes cargan piedras después del servicio." }],
        conanias: [{ texto: "Los que levantan el muro comen del alfolí del templo. Gracias a las ofrendas del pueblo, alcanza para todos." }],
        isaias: [{ texto: "Levantad el muro, sí; pero no pongáis la confianza en las piedras. Mirad al que hizo todo.", verso: V.i22_11 }],
        miqueas: [{ texto: "Vengo del campo: en los pueblos todos hablan del ejército de Asiria. Aquí, en Jerusalén, se trabaja y se ora." }],
        etan: [{ texto: "Esta semana canto el salmo que dice «Contad sus torres». ¡Pronto habrá tres más que contar!", verso: V.s48_12 }],
        eleazar: [{ texto: "El fuego del altar sigue ardiendo mientras se levanta el muro. Primero el servicio de Dios; después, las piedras." }],
      },
      recados: [
        {
          id: "c1-pan-muro",
          titulo: "Pan para los que edifican",
          cadena: ["eliaquim", "conanias", "azarias"],
          lleva: ["la orden del rey para el alfolí", "la cuenta del pan repartido"],
          dice: [
            "Los que levantan el muro trabajan desde el alba. Lleva esta orden del rey a Conanías: que les den pan del alfolí.",
            "¡Pan para los que edifican! Simei ya lo está repartiendo. Lleva la cuenta a Azarías, que bendiga lo que se da.",
            "Que Jehová les dé fuerzas y prospere la obra de sus manos. Gracias por traerlo, hijo.",
          ],
          verso: V.c32_5,
        },
        {
          id: "c1-palabras-rey",
          titulo: "Las palabras del rey",
          cadena: ["eliaquim", "etan", "azarias"],
          lleva: ["las palabras que el rey dijo en la plaza", "la copia para el templo"],
          dice: [
            "El rey reunió a los capitanes en la plaza de la puerta y les habló al corazón. Lleva sus palabras a Etán: que las copie con buena letra.",
            "«Con él es el brazo de carne, mas con nosotros está Jehová nuestro Dios». ¡Qué palabras! Ya las copié: lleva la copia a Azarías.",
            "Las leeré al pueblo después del sacrificio de la tarde. Bendito sea Jehová, que pelea por nosotros.",
          ],
          verso: V.c32_8,
        },
      ],
    },
    {
      n: 2,
      id: "canal",
      titulo: "El conducto de Siloé",
      icono: "💧",
      unidad: ["codo", "codos"],
      tarea: "cavar el conducto de Gihón al estanque de Siloé",
      historia: [
        "Ezequías tuvo consejo con sus príncipes: que los asirios no hallen agua cuando lleguen. Se cubren las fuentes de afuera.",
        "Y el agua de Gihón entrará en la ciudad por un conducto, hasta el estanque de Siloé, al occidente de la ciudad de David.",
        "Mira la zanja que avanza desde el muro del oriente, por la calle que pasa junto a la calle de los siervos: cuando llegue al estanque, el agua correrá para todos.",
      ],
      verso: V.r20_20,
      guia: "eliaquim",
      dialogo: [
        { quien: "eliaquim", texto: V.c32_3.text, ref: V.c32_3.ref },
        { quien: "ezequias", texto: "Que el agua de Gihón entre en la ciudad. Cavad el conducto hasta el estanque: ¡que en Jerusalén no falte el agua!" },
        { quien: "eliaquim", texto: "Cada deber cava un codo; cada encargo, cinco; cada recado, diez. La zanja empieza en el muro del oriente y termina en el estanque de Siloé, al sur de la ciudad." },
      ],
      alCumplir: "¡El agua de Gihón llegó al estanque de Siloé!",
      premio: { gozo: 40, prenda: "manto-siloe" },
      chismes: {
        eliaquim: [{ texto: "El rey cubrió los manantiales de Gihón. Ahora el agua corre por dentro, hacia el occidente de la ciudad de David.", verso: V.c32_30 }],
        conanias: [{ texto: "Las lámparas de los que cavan gastan mucho aceite. El alfolí les da lo que necesitan." }],
        isaias: [{ texto: "Una vez este pueblo despreció las aguas de Siloé, que corren mansamente. Que ahora no despreciemos al Dios que da el agua.", verso: V.i8_6 }],
        eleazar: [{ texto: "Cuando el agua llegue al estanque, sacaremos agua con alegría. Así lo canta Isaías.", verso: V.i12_3 }],
        etan: [{ texto: "Pregunta de esta semana: ¿qué rey hizo el estanque y el conducto, y metió las aguas en la ciudad? ¡Fácil, si lees Reyes!", verso: V.r20_20 }],
        miqueas: [{ texto: "En el campo cuidamos cada gota. ¡Qué bendición un agua que no se acaba dentro de los muros!" }],
        azarias: [{ texto: "Los levitas bajan a ayudar a cavar y suben a cantar al anochecer. Toda la ciudad trabaja." }],
      },
      recados: [
        {
          id: "c2-aceite-cavan",
          titulo: "Aceite para los que cavan",
          cadena: ["conanias", "eliaquim", "eleazar"],
          lleva: ["una vasija de aceite para las lámparas", "la noticia de que el conducto avanza"],
          dice: [
            "Los que cavan el conducto trabajan a la luz de las lámparas. Lleva este aceite a Eliaquim: él sabe dónde están.",
            "¡Llegó a tiempo! Las lámparas ya se apagaban. Dile a Eleazar que el conducto avanza, codo a codo.",
            "Bendito sea Jehová. Esta tarde oraremos por los que cavan.",
          ],
          verso: V.c32_30,
        },
        {
          id: "c2-fuentes",
          titulo: "Las fuentes de afuera",
          cadena: ["eliaquim", "miqueas", "azarias"],
          lleva: ["la lista de las fuentes de fuera del muro", "la noticia de que las fuentes quedaron cubiertas"],
          dice: [
            "Lleva esta lista a Miqueas. Él conoce el campo y las fuentes de fuera de la ciudad.",
            "Esta, esta y esta… sí, las conozco todas. Ya las cubrieron con piedras. Lleva la noticia a Azarías.",
            "Que los asirios no hallen agua, y que a Jerusalén no le falte. Gracias, hijo.",
          ],
          verso: V.c32_3,
        },
      ],
    },
    {
      n: 3,
      id: "rabsaces",
      titulo: "El Rabsaces y la oración del rey",
      icono: "🙏",
      unidad: ["oración", "oraciones"],
      tarea: "orar con el rey y seguir sirviendo sin responder al Rabsaces",
      historia: [
        "El rey de Asiria envió al Rabsaces con un gran ejército. Acampó frente a la ciudad y grita a los muros para que el pueblo tenga miedo. Míralo junto a la puerta.",
        "El rey mandó no responderle. Ezequías subió a la casa de Jehová y envió a Eliaquim y a los ancianos de los sacerdotes al profeta Isaías.",
        "Cuando llegaron las cartas de Senaquerib, Ezequías las extendió delante de Jehová y oró. La ciudad sigue sirviendo y ora con él: al pie de la escalinata, cada día hay más gente orando.",
      ],
      verso: V.r19_19,
      guia: "isaias",
      dialogo: [
        { quien: "narrador", texto: V.r18_17.text, ref: V.r18_17.ref },
        { quien: "eliaquim", texto: "El Rabsaces grita desde afuera de la puerta para asustar al pueblo. Pero el rey nos dio una orden: «No le respondáis».", ref: V.r18_36.ref },
        { quien: "ezequias", texto: V.r19_19.text, ref: V.r19_19.ref },
        { quien: "isaias", texto: "Ora con el rey y sigue sirviendo. Esta semana, cada deber, cada encargo y cada recado suman a la oración de toda la ciudad." },
      ],
      alCumplir: "¡Jerusalén entera oró con su rey! Y Jehová respondió: «Lo que me pediste acerca de Senaquerib rey de Asiria, he oído» (2 Reyes 19:20).",
      premio: { gozo: 40, prenda: "faja-oracion" },
      chismes: {
        eliaquim: [{ texto: "Sebna, Joa y yo oímos al Rabsaces y rasgamos nuestros vestidos. Fuimos a contárselo al rey.", verso: V.r18_37 }],
        isaias: [{ texto: "Esto le mandé decir al rey: no temas. Jehová oyó las palabras del Rabsaces.", verso: V.r19_6 }],
        azarias: [{ texto: "Vi al rey subir a la casa de Jehová con las cartas de Senaquerib. Las extendió delante de Jehová y oró.", verso: V.r19_14 }],
        etan: [{ texto: "Esta semana canto el salmo de los hijos de Coré: «Dios es nuestro amparo y fortaleza».", verso: V.s46_1 }],
        miqueas: [{ texto: "El Rabsaces grita, y el pueblo calla. ¡Qué bien obedecen al rey! Callar también es confiar.", verso: V.r18_36 }],
        conanias: [{ texto: "Afuera hay un ejército, y adentro el pueblo sigue trayendo sus diezmos. ¡Este pueblo no deja de dar!" }],
        eleazar: [{ texto: "Aunque el Rabsaces grite, en el altar el fuego no se apaga. Seguimos sirviendo: así se le responde." }],
      },
      recados: [
        {
          id: "c3-al-profeta",
          titulo: "Al profeta Isaías",
          cadena: ["eliaquim", "isaias", "azarias"],
          lleva: ["las palabras del rey para Isaías", "la respuesta del profeta"],
          dice: [
            "El rey está en la casa de Jehová y me envía con los ancianos de los sacerdotes al profeta Isaías. Adelántate y llévale las palabras del rey.",
            "Así ha dicho Jehová: «No temas por las palabras que has oído». Lleva esta respuesta a Azarías: él la pondrá en manos del rey, en el templo.",
            "No temas… El rey ora delante de Jehová. Esta palabra le dará paz. Gracias, hijo.",
          ],
          verso: V.r19_6,
        },
        {
          id: "c3-salmo-vigilia",
          titulo: "El salmo de la vigilia",
          cadena: ["etan", "eleazar", "isaias"],
          lleva: ["el salmo para cantar de noche en el templo", "la noticia de que los levitas cantan"],
          dice: [
            "Esta noche los levitas velan en el templo. Lleva este salmo a Eleazar: «Dios es nuestro amparo y fortaleza».",
            "Lo cantaremos en la vigilia, mientras el rey ora. Ve y dile a Isaías que los levitas cantan con el pueblo.",
            "Bien. Que canten y que oren: Jehová oye a su pueblo. Ya verás lo que hará.",
          ],
          verso: V.s46_1,
        },
      ],
    },
    {
      n: 4,
      id: "liberacion",
      titulo: "La liberación",
      icono: "🎺",
      unidad: ["ofrenda", "ofrendas"],
      tarea: "traer ofrendas de gratitud a Jehová",
      historia: [
        "Jehová respondió por boca de Isaías: el rey de Asiria no entrará en esta ciudad. «Porque yo ampararé esta ciudad para salvarla» (2 Reyes 19:34).",
        "Aquella misma noche salió el ángel de Jehová contra el campamento de los asirios, y Senaquerib se volvió a Nínive. Al amanecer, frente a los muros ya no había ejército.",
        "Ahora la ciudad da gracias: cada deber, encargo y recado es una ofrenda de gratitud. Y al final de la semana, la fiesta de la liberación en la plaza.",
      ],
      verso: V.c32_22,
      guia: "azarias",
      dialogo: [
        { quien: "narrador", texto: V.r19_35.text, ref: V.r19_35.ref },
        { quien: "narrador", texto: V.r19_36.text, ref: V.r19_36.ref },
        { quien: "azarias", texto: V.c32_22.text, ref: V.c32_22.ref },
        { quien: "azarias", texto: "Traigamos ofrendas de gratitud a Jehová. Y el viernes empieza la fiesta de la liberación: toda la ciudad se reúne en la plaza para dar gracias. ¡No faltes!" },
      ],
      alCumplir: "¡Jerusalén trajo sus ofrendas de gratitud a Jehová!",
      premio: { gozo: 50, prenda: "manto-liberacion" },
      chismes: {
        isaias: [{ texto: "Jehová lo dijo y lo cumplió: el rey de Asiria no entró en esta ciudad, ni echó saeta en ella.", verso: V.r19_32 }],
        eliaquim: [{ texto: "Al amanecer subí a la torre nueva: el campamento de los asirios estaba en silencio. Senaquerib se fue.", verso: V.r19_36 }],
        azarias: [{ texto: "Jehová salvó a su pueblo y le dio reposo. ¡Qué semana para dar gracias!", verso: V.c32_22 }],
        conanias: [{ texto: "Llegan ofrendas de todas partes, ¡y presentes para el rey! Simei y yo ya no sabemos dónde ponerlas.", verso: V.c32_23 }],
        etan: [{ texto: "Para la fiesta ensayamos con los cantores un salmo: «Dios es conocido en Judá».", verso: V.s76_1 }],
        miqueas: [{ texto: "¿Lo ves? Jehová de los ejércitos está con nosotros. Ahora lo sabe todo Judá.", verso: V.s46_7 }],
        eleazar: [{ texto: "El altar no descansa esta semana: todos traen ofrendas de gratitud. ¡Ayúdanos en el templo!" }],
      },
      recados: [
        {
          id: "c4-buena-noticia",
          titulo: "La buena noticia",
          cadena: ["isaias", "eliaquim", "azarias"],
          lleva: ["la palabra de Jehová acerca del rey de Asiria", "la orden del rey para la fiesta"],
          dice: [
            "Lleva esta palabra al palacio: «Por el mismo camino que vino, volverá, y no entrará en esta ciudad, dice Jehová».",
            "¡Y así fue! El campamento está vacío. El rey manda preparar la fiesta: lleva su orden a Azarías.",
            "Haremos fiesta en la plaza, con los cantores. Que toda la ciudad venga a dar gracias.",
          ],
          verso: V.r19_33,
        },
        {
          id: "c4-cantico",
          titulo: "El cántico de la fiesta",
          cadena: ["etan", "eleazar", "conanias"],
          lleva: ["el salmo de la fiesta", "la lista de los cantores"],
          dice: [
            "Ya tengo el cántico para la fiesta: «Dios es conocido en Judá; En Israel es grande su nombre». Llévaselo a Eleazar.",
            "¡Hermoso! Los levitas lo cantarán en la plaza. Lleva la lista de los cantores a Conanías: que preparen las arpas.",
            "¡Arpas, címbalos y salterios! Todo estará listo para la fiesta. Gracias, amigo.",
          ],
          verso: V.s76_1,
        },
      ],
    },
  ],
  fiesta: {
    titulo: "La fiesta de la liberación",
    icono: "🎺",
    texto: "Toda Jerusalén se reúne en la plaza para dar gracias a Jehová, que salvó la ciudad. Ve a la plaza y da gracias: gozo y una faja de fiesta para ti, y diez ofrendas más para la ciudad.",
    verso: V.i12_5,
    gracias: V.s126_3,
    dias: [25, 26, 27],
    vivo: { indice: 27, desde: 18, hasta: 19 },
    lugar: { x: 56, z: -2, r: 13 },
    premio: { gozo: 30, vivo: 20, prenda: "faja-alabanza" },
  },
  album: { icono: "🧱", titulo: "Atalaya de Sion" },
};

// ---------------------------------------------------------------- la gran Pascua de Ezequías
// Algunos versículos se citan en parte: la Biblia del sitio trae ahí un espacio antes del punto («Jerusalén .») o una
// letra cambiada, y la cita tiene que ser igual a la del sitio.
const P = {
  c28_24: { text: "Además de eso recogió Acaz los utensilios de la casa de Dios, y los quebró, y cerró las puertas de la casa de Jehová, y se hizo altares en Jerusalén en todos los rincones.", ref: "2 Crónicas 28:24" },
  c29_2: { text: "E hizo lo recto ante los ojos de Jehová, conforme a todas las cosas que había hecho David su padre.", ref: "2 Crónicas 29:2" },
  c29_3: { text: "En el primer año de su reinado, en el mes primero, abrió las puertas de la casa de Jehová, y las reparó.", ref: "2 Crónicas 29:3" },
  c29_5: { text: "Santificaos ahora, y santificad la casa de Jehová el Dios de vuestros padres, y sacad del santuario la inmundicia.", ref: "2 Crónicas 29:5" },
  c29_7: { text: "Y aun cerraron las puertas del pórtico, y apagaron las lámparas; no quemaron incienso, ni sacrificaron holocausto en el santuario al Dios de Israel.", ref: "2 Crónicas 29:7" },
  c29_11: { text: "Hijos míos, no os engañéis ahora, porque Jehová os ha escogido a vosotros para que estéis delante de él, y le sirváis, y seáis sus ministros, y le queméis incienso.", ref: "2 Crónicas 29:11" },
  c29_16: { text: "Y entrando los sacerdotes dentro de la casa de Jehová para limpiarla, sacaron toda la inmundicia que hallaron en el templo de Jehová, al atrio de la casa de Jehová; y de allí los levitas la llevaron fuera al torrente de Cedrón.", ref: "2 Crónicas 29:16" },
  c29_18: { text: "Entonces vinieron al rey Ezequías y le dijeron: Ya hemos limpiado toda la casa de Jehová, el altar del holocausto, y todos sus instrumentos, y la mesa de la proposición con todos sus utensilios.", ref: "2 Crónicas 29:18" },
  c29_19: { text: "Asimismo hemos preparado y santificado todos los utensilios que en su infidelidad había desechado el rey Acaz, cuando reinaba: y he aquí están delante del altar de Jehová.", ref: "2 Crónicas 29:19" },
  c29_20: { text: "Y levantándose de mañana el rey Ezequías reunió los principales de la ciudad, y subió a la casa de Jehová.", ref: "2 Crónicas 29:20" },
  c29_25: { text: "Puso también levitas en la casa de Jehová con címbalos, salterios, y arpas, conforme al mandamiento de David, de Gad vidente del rey, y del profeta Natán: porque aquel mandamiento procedía de Jehová por medio de sus profetas.", ref: "2 Crónicas 29:25" },
  c29_26: { text: "Y los levitas estaban con los instrumentos de David, y los sacerdotes con trompetas.", ref: "2 Crónicas 29:26" },
  c29_27: { text: "Entonces mandó Ezequías sacrificar el holocausto en el altar; y cuando comenzó el holocausto, comenzó también el cántico de Jehová, con las trompetas y los instrumentos de David rey de Israel.", ref: "2 Crónicas 29:27" },
  c29_28: { text: "Y toda la multitud adoraba, y los cantores cantaban, y los trompeteros sonaban las trompetas;", ref: "2 Crónicas 29:28" },
  c29_30: { text: "Entonces el rey Ezequías y los príncipes dijeron a los levitas que alabasen a Jehová con las palabras de David y de Asaf vidente: y ellos alabaron con gran alegría, y se inclinaron y adoraron.", ref: "2 Crónicas 29:30" },
  c29_31: { text: "Y respondiendo Ezequías dijo: Vosotros os habéis consagrado ahora a Jehová; acercaos, pues, y presentad sacrificios y alabanzas en la casa de Jehová. Y la multitud presentó sacrificios y alabanzas; y todos los generosos de corazón trajeron holocaustos.", ref: "2 Crónicas 29:31" },
  c29_34: { text: "Mas los sacerdotes eran pocos, y no bastaban para desollar los holocaustos; y así sus hermanos los levitas les ayudaron hasta que acabaron la obra, y hasta que los demás sacerdotes se santificaron: porque los levitas fueron más rectos de corazón para santificarse, que los sacerdotes.", ref: "2 Crónicas 29:34" },
  c29_35: { text: "Y quedó restablecido el servicio de la casa de Jehová.", ref: "2 Crónicas 29:35" },
  c29_36: { text: "Y se alegró Ezequías con todo el pueblo, de que Dios hubiese preparado el pueblo; porque la cosa fue hecha rápidamente.", ref: "2 Crónicas 29:36" },
  c30_1: { text: "Envió después Ezequías por todo Israel y Judá, y escribió cartas a Efraín y a Manasés, para que viniesen a Jerusalén a la casa de Jehová para celebrar la pascua a Jehová Dios de Israel.", ref: "2 Crónicas 30:1" },
  c30_3: { text: "Porque entonces no la podían celebrar, por cuanto no había suficientes sacerdotes santificados, ni el pueblo se había reunido en Jerusalén.", ref: "2 Crónicas 30:3" },
  c30_6: { text: "Hijos de Israel, volveos a Jehová el Dios de Abraham, de Isaac, y de Israel, y él se volverá al remanente que ha quedado de la mano de los reyes de Asiria.", ref: "2 Crónicas 30:6" },
  c30_8: { text: "No endurezcáis, pues, ahora vuestra cerviz como vuestros padres; someteos a Jehová, y venid a su santuario, el cual él ha santificado para siempre; y servid a Jehová vuestro Dios, y el ardor de su ira se apartará de vosotros.", ref: "2 Crónicas 30:8" },
  c30_9: { text: "porque Jehová vuestro Dios es clemente y misericordioso, y no apartará de vosotros su rostro, si vosotros os volviereis a él.", ref: "2 Crónicas 30:9" },
  c30_10: { text: "Pasaron, pues, los correos de ciudad en ciudad por la tierra de Efraín y Manasés, hasta Zabulón: mas se reían y burlaban de ellos.", ref: "2 Crónicas 30:10" },
  c30_11: { text: "Con todo eso, algunos hombres de Aser, de Manasés, y de Zabulón, se humillaron, y vinieron a Jerusalén", ref: "2 Crónicas 30:11" },
  c30_12: { text: "En Judá también estuvo la mano de Dios para darles un solo corazón para cumplir el mensaje del rey y de los príncipes, conforme a la palabra de Jehová.", ref: "2 Crónicas 30:12" },
  c30_13: { text: "Y se reunió en Jerusalén mucha gente para celebrar la fiesta solemne de los panes sin levadura en el mes segundo, una vasta reunión.", ref: "2 Crónicas 30:13" },
  c30_14: { text: "quitaron también todos los altares de incienso, y los echaron al torrente de Cedrón.", ref: "2 Crónicas 30:14" },
  c30_17: { text: "Porque había muchos en la congregación que no estaban santificados, y por eso los levitas sacrificaban la pascua por todos los que no se habían purificado, para santificarlos a Jehová.", ref: "2 Crónicas 30:17" },
  c30_20: { text: "Y oyó Jehová a Ezequías, y sanó al pueblo.", ref: "2 Crónicas 30:20" },
  c30_21: { text: "Así los hijos de Israel que estaban en Jerusalén celebraron la fiesta solemne de los panes sin levadura por siete días con grande gozo: y glorificaban a Jehová todos los días los levitas y los sacerdotes, cantando con instrumentos resonantes a Jehová.", ref: "2 Crónicas 30:21" },
  c30_23: { text: "Y toda aquella asamblea determinó que celebrasen la fiesta por otros siete días; y la celebraron otros siete días con alegría.", ref: "2 Crónicas 30:23" },
  c30_24: { text: "Porque Ezequías rey de Judá había dado a la asamblea mil novillos y siete mil ovejas; y también los príncipes dieron al pueblo mil novillos y diez mil ovejas: y muchos sacerdotes ya se habían santificado.", ref: "2 Crónicas 30:24" },
  c30_25: { text: "Se alegró, pues, toda la congregación de Judá, como también los sacerdotes y levitas, y toda la multitud que había venido de Israel; asimismo los forasteros que habían venido de la tierra de Israel, y los que habitaban en Judá.", ref: "2 Crónicas 30:25" },
  c30_26: { text: "Hubo entonces gran regocijo en Jerusalén; porque desde los días de Salomón hijo de David rey de Israel, no había habido cosa semejante en Jerusalén", ref: "2 Crónicas 30:26" },
  c30_27: { text: "Después los sacerdotes y levitas, puestos en pie, bendijeron al pueblo: y la voz de ellos fue oída, y su oración llegó a la habitación de su santuario, al cielo.", ref: "2 Crónicas 30:27" },
  c31_21: { text: "En todo cuanto emprendió en el servicio de la casa de Dios, de acuerdo con la ley, buscó a su Dios, lo hizo de todo corazón, y fue prosperado.", ref: "2 Crónicas 31:21" },
  e12_13: { text: "Y la sangre os será por señal en las casas donde vosotros estéis; y veré la sangre y pasaré de vosotros, y no habrá en vosotros plaga de mortandad cuando hiera la tierra de Egipto.", ref: "Éxodo 12:13" },
  e12_14: { text: "Y este día os será en memoria, y lo celebraréis como fiesta solemne para Jehová durante vuestras generaciones; por estatuto perpetuo lo celebraréis.", ref: "Éxodo 12:14" },
  n9_11: { text: "En el mes segundo, a los catorce días del mes, entre las dos tardes, la celebrarán; con panes sin levadura y hierbas amargas la comerán.", ref: "Números 9:11" },
  i1_18: { text: "Venid luego, dice Jehová, y estemos a cuenta: si vuestros pecados fueren como la grana, como la nieve serán emblanquecidos; si fueren rojos como el carmesí, vendrán a ser como blanca lana.", ref: "Isaías 1:18" },
  i9_2: { text: "El pueblo que andaba en tinieblas vio gran luz; los que moraban en tierra de sombra de muerte, luz resplandeció sobre ellos.", ref: "Isaías 9:2" },
  i29_13: { text: "Porque este pueblo se acerca a mí con su boca, y con sus labios me honra, pero su corazón está lejos de mí,", ref: "Isaías 29:13" },
  i53_7: { text: "como cordero fue llevado al matadero; y como oveja delante de sus trasquiladores, enmudeció, y no abrió su boca.", ref: "Isaías 53:7" },
  m4_2: { text: "Venid, y subamos al monte de Jehová, y a la casa del Dios de Jacob; y nos enseñará en sus caminos, y andaremos por sus veredas;", ref: "Miqueas 4:2" },
  m6_8: { text: "Oh hombre, él te ha declarado lo que es bueno, y qué pide Jehová de ti: solamente hacer justicia, y amar misericordia, y humillarte ante tu Dios.", ref: "Miqueas 6:8" },
  s24_7: { text: "Alzad, oh puertas, vuestras cabezas, Y alzaos vosotras, puertas eternas, Y entrará el Rey de gloria.", ref: "Salmo 24:7" },
  s96_1: { text: "Cantad a Jehová cántico nuevo; Cantad a Jehová, toda la tierra.", ref: "Salmo 96:1" },
  s100_4: { text: "Entrad por sus puertas con acción de gracias, Por sus atrios con alabanza; Alabadle, bendecid su nombre.", ref: "Salmo 100:4" },
  s118_24: { text: "Este es el día que hizo Jehová; Nos gozaremos y alegraremos en él.", ref: "Salmo 118:24" },
  s118_26: { text: "Bendito el que viene en el nombre de Jehová; Desde la casa de Jehová os bendecimos.", ref: "Salmo 118:26" },
  s133_1: { text: "¡Mirad cuán bueno y cuán delicioso es Habitar los hermanos juntos en armonía!", ref: "Salmo 133:1" },
  s150_5: { text: "Alabadle con címbalos resonantes; Alabadle con címbalos de júbilo.", ref: "Salmo 150:5" },
  co5_7: { text: "porque nuestra pascua, que es Cristo, ya fue sacrificada por nosotros.", ref: "1 Corintios 5:7" },
} satisfies Record<string, Verso>;

export const PASCUA_EZEQUIAS: ArcoTemporada = {
  id: "pascua-ezequias",
  titulo: "La gran Pascua de Ezequías",
  subtitulo: "El primer año del rey Ezequías",
  refs: "2 Crónicas 29–31",
  lema: P.c31_21,
  capitulos: [
    {
      n: 1,
      id: "puertas",
      titulo: "Las puertas abiertas",
      icono: "🚪",
      unidad: ["cesto", "cestos"],
      tarea: "limpiar la casa de Jehová y sacar lo inmundo al torrente de Cedrón",
      historia: [
        "El rey Acaz cerró las puertas de la casa de Jehová y se hizo altares en todos los rincones de Jerusalén. Las lámparas del santuario se apagaron.",
        "Su hijo Ezequías empieza a reinar y no espera: en el primer año de su reinado, en el mes primero, abre las puertas de la casa de Jehová y las repara. Después reúne a los sacerdotes y a los levitas en la plaza oriental.",
        "Los sacerdotes sacan al atrio todo lo inmundo que hallan en el templo, y los levitas lo llevan en cestos hasta el torrente de Cedrón. Mira los montones arriba de la escalinata: se acaban con lo que sirve toda la ciudad.",
      ],
      verso: P.c29_3,
      guia: "eleazar",
      dialogo: [
        { quien: "narrador", texto: P.c28_24.text, ref: P.c28_24.ref },
        { quien: "ezequias", texto: "¡Sacerdotes y levitas! «Santificaos ahora, y santificad la casa de Jehová el Dios de vuestros padres, y sacad del santuario la inmundicia».", ref: P.c29_5.ref },
        { quien: "ezequias", texto: "«Hijos míos, no os engañéis ahora, porque Jehová os ha escogido a vosotros para que estéis delante de él, y le sirváis».", ref: P.c29_11.ref },
        { quien: "eleazar", texto: "Cada deber que cumplas saca un cesto de lo inmundo; cada encargo del día, cinco; cada recado de la calle de los siervos, diez. Esta semana toda la ciudad tiene una meta: la verás en «Para hoy»." },
      ],
      alCumplir: "¡La casa de Jehová quedó limpia y con sus puertas abiertas!",
      premio: { gozo: 40, prenda: "faja-consagrados" },
      chismes: {
        eleazar: [{ texto: "Entramos en la casa de Jehová para limpiarla. Lo que sacamos al atrio, los levitas lo llevan en cestos hasta el torrente de Cedrón.", verso: P.c29_16 }],
        azarias: [
          { texto: "El rey nos reunió en la plaza oriental y nos dijo: «Hijos míos, no os engañéis ahora». ¡Jehová nos escogió para servirle!", verso: P.c29_11 },
          { texto: "Cuando terminemos, iremos al rey a decirle: «Ya hemos limpiado toda la casa de Jehová». ¡Ayúdanos a llegar!", verso: P.c29_18 },
        ],
        conanias: [{ texto: "Los utensilios que Acaz quebró y desechó, los estamos preparando otra vez. Pronto estarán delante del altar.", verso: P.c29_19 }],
        isaias: [{ texto: "Limpiar la casa de Jehová está bien. Pero Jehová quiere limpiar también el corazón de su pueblo.", verso: P.i1_18 }],
        miqueas: [{ texto: "En el campo dicen que el rey nuevo es muy joven. Yo digo que hace lo recto, como David su padre.", verso: P.c29_2 }],
        etan: [{ texto: "Esta semana ensayamos el salmo de las puertas: «Alzad, oh puertas, vuestras cabezas».", verso: P.s24_7 }],
        eliaquim: [{ texto: "El rey no esperó ni un mes: en el mes primero abrió las puertas de la casa de Jehová y las reparó.", verso: P.c29_3 }],
      },
      recados: [
        {
          id: "p1-cestos-cedron",
          titulo: "Al torrente de Cedrón",
          cadena: ["eleazar", "conanias", "azarias"],
          lleva: ["la cuenta de los cestos que salieron del templo", "los utensilios que ya se limpiaron"],
          dice: [
            "Los levitas no paran de sacar cestos al torrente de Cedrón. Lleva esta cuenta a Conanías: él anota todo lo que sale de la casa de Jehová.",
            "¡Cuántos cestos! Y mira: estos utensilios que Acaz había desechado ya están limpios. Llévaselos a Azarías, que los ponga delante del altar.",
            "Limpios y santificados. Pronto el altar volverá a servir como antes. Gracias, hijo.",
          ],
          verso: P.c29_16,
        },
        {
          id: "p1-lamparas",
          titulo: "Las lámparas del santuario",
          cadena: ["azarias", "etan", "eleazar"],
          lleva: ["el aceite para volver a encender las lámparas", "el salmo para cuando se enciendan"],
          dice: [
            "En los días de Acaz se apagaron las lámparas del santuario. Hoy las volvemos a encender. Lleva este aceite a Etán: los cantores lo esperan.",
            "¡Aceite para las lámparas! Ya tengo el salmo para ese momento: «Entrad por sus puertas con acción de gracias». Llévaselo a Eleazar.",
            "Las lámparas arderán otra vez delante de Jehová. Que nunca más se apaguen. Gracias.",
          ],
          verso: P.c29_7,
        },
      ],
    },
    {
      n: 2,
      id: "cantico",
      titulo: "El cántico de Jehová",
      icono: "🎶",
      unidad: ["cántico", "cánticos"],
      tarea: "restaurar el servicio del templo con el cántico de Jehová",
      historia: [
        "La casa de Jehová ya está limpia. El rey Ezequías se levanta de mañana, reúne a los principales de la ciudad y sube a la casa de Jehová.",
        "Pone a los levitas con címbalos, salterios y arpas, como lo mandó David, y a los sacerdotes con trompetas. Cuando comienza el holocausto, comienza también el cántico de Jehová.",
        "Los sacerdotes son pocos, y sus hermanos los levitas les ayudan. Mira la escalinata: cada día suben más cantores y trompeteros. Cuanto más sirve la ciudad, más se oye el cántico.",
      ],
      verso: P.c29_27,
      guia: "etan",
      dialogo: [
        { quien: "narrador", texto: P.c29_20.text, ref: P.c29_20.ref },
        { quien: "ezequias", texto: "Levitas, tomad los instrumentos de David; sacerdotes, las trompetas. Que cuando suba el holocausto se oiga también «el cántico de Jehová».", ref: P.c29_27.ref },
        { quien: "etan", texto: "Cada deber que cumplas suma un cántico; cada encargo, cinco; cada recado, diez. ¡Mira la escalinata: los cantores suben con lo que sirve la ciudad!" },
      ],
      alCumplir: "¡Quedó restablecido el servicio de la casa de Jehová!",
      premio: { gozo: 40, prenda: "manto-cantico" },
      chismes: {
        etan: [{ texto: "Los hijos de Asaf, de Hemán y de Jedutún están otra vez en sus puestos. Esta semana cantamos un cántico nuevo.", verso: P.s96_1 }],
        eleazar: [
          { texto: "Los sacerdotes éramos pocos para tantos holocaustos, y nuestros hermanos los levitas nos ayudaron. ¡Ayúdanos tú también!", verso: P.c29_34 },
          { texto: "Cuando la ciudad llegue a la meta, lo podremos decir como en el libro: «Y quedó restablecido el servicio de la casa de Jehová».", verso: P.c29_35 },
        ],
        azarias: [{ texto: "Cuando comenzó el holocausto, comenzó también el cántico. Toda la multitud adoraba.", verso: P.c29_28 }],
        conanias: [{ texto: "El rey dijo: «acercaos, pues, y presentad sacrificios y alabanzas». ¡Y los generosos de corazón no paran de traer!", verso: P.c29_31 }],
        isaias: [{ texto: "El pueblo vuelve a cantar en la casa de Jehová. Que el canto salga del corazón, y no solo de los labios.", verso: P.i29_13 }],
        miqueas: [
          { texto: "Desde el camino se oyen las trompetas del templo. ¡Hacía tanto tiempo que no se oían!" },
          { texto: "El rey se alegró con todo el pueblo: todo se hizo muy pronto. ¡Eso es obra de Dios!", verso: P.c29_36 },
        ],
        eliaquim: [{ texto: "El rey y los príncipes mandaron que los levitas alaben con las palabras de David y de Asaf vidente.", verso: P.c29_30 }],
      },
      recados: [
        {
          id: "p2-instrumentos",
          titulo: "Los instrumentos de David",
          cadena: ["etan", "conanias", "azarias"],
          lleva: ["la lista de los címbalos, salterios y arpas que faltan", "los instrumentos que se hallaron en las cámaras"],
          dice: [
            "Para el cántico de Jehová faltan címbalos y arpas. Lleva esta lista a Conanías: quizá estén guardados en las cámaras del templo.",
            "¡Aquí estaban! Salterios y címbalos, limpios y listos. Llévaselos a Azarías, para que los vea antes del holocausto.",
            "«Alabadle con címbalos resonantes». Que suenen otra vez en la casa de Jehová. Gracias, hijo.",
          ],
          verso: P.s150_5,
        },
        {
          id: "p2-trompetas",
          titulo: "Las trompetas de los sacerdotes",
          cadena: ["eleazar", "eliaquim", "etan"],
          lleva: ["el aviso de que las trompetas sonarán al comenzar el holocausto", "la palabra del rey para los cantores"],
          dice: [
            "Los sacerdotes tocaremos las trompetas cuando comience el holocausto. Lleva este aviso a Eliaquim: el rey quiere saberlo.",
            "El rey se alegró mucho. Dice que los levitas alaben con las palabras de David y de Asaf. Lleva su palabra a Etán.",
            "¡Con las palabras de David y de Asaf! Así lo haremos, con gran alegría. Gracias, amigo.",
          ],
          verso: P.c29_26,
        },
      ],
    },
    {
      n: 3,
      id: "cartas",
      titulo: "Las cartas del rey",
      icono: "📜",
      unidad: ["carta", "cartas"],
      tarea: "llevar las cartas del rey por todo Israel, desde Beerseba hasta Dan",
      historia: [
        "El rey quiere celebrar la Pascua en Jerusalén, y no solo con Judá: escribe cartas a Efraín y a Manasés y a todo Israel, desde Beerseba hasta Dan.",
        "La Pascua será en el mes segundo, porque no había suficientes sacerdotes santificados ni el pueblo se había reunido. Así hay tiempo para que todos lleguen.",
        "Los correos salen por la puerta de la ciudad. En algunas ciudades se ríen de ellos; en otras, la gente se humilla y se pone en camino. Mira el monte de los Olivos: cada día hay más tiendas de peregrinos.",
      ],
      verso: P.c30_6,
      guia: "eliaquim",
      dialogo: [
        { quien: "narrador", texto: P.c30_1.text, ref: P.c30_1.ref },
        { quien: "ezequias", texto: "Llevad mis cartas por todo Israel y Judá, y decidles: «Hijos de Israel, volveos a Jehová».", ref: P.c30_6.ref },
        { quien: "eliaquim", texto: "Cada deber que cumplas lleva una carta; cada encargo, cinco; cada recado, diez. Y tú también puedes invitar: en «Misiones» está tu enlace para traer a un amigo a Jerusalén." },
      ],
      alCumplir: "¡Las cartas del rey llegaron a todo Israel, y vienen peregrinos de todas partes!",
      premio: { gozo: 40, prenda: "faja-correos" },
      chismes: {
        eliaquim: [
          { texto: "Los correos pasaron de ciudad en ciudad hasta Zabulón. En algunas se rieron de ellos… pero otros se humillaron y vienen.", verso: P.c30_10 },
          { texto: "Ya llegan hombres de Aser, de Manasés y de Zabulón. ¡Hay que prepararles lugar!", verso: P.c30_11 },
        ],
        isaias: [{ texto: "A Zabulón y a Neftalí, que hoy andan en oscuridad, Jehová les tiene una promesa: verán gran luz.", verso: P.i9_2 }],
        miqueas: [{ texto: "Yo conozco esos caminos. Los que vienen se animan unos a otros: «Venid, y subamos al monte de Jehová».", verso: P.m4_2 }],
        eleazar: [{ texto: "¿Por qué la Pascua en el mes segundo? La ley lo permite a quien estaba lejos o no estaba limpio. Así está escrito.", verso: P.n9_11 }],
        etan: [{ texto: "A los peregrinos los recibimos cantando: «Bendito el que viene en el nombre de Jehová».", verso: P.s118_26 }],
        azarias: [{ texto: "Los sacerdotes que faltaban se están santificando. Cuando lleguen los peregrinos, todo estará listo.", verso: P.c30_3 }],
        conanias: [{ texto: "Con tanta gente que viene, el alfolí tiene que estar lleno. ¡Gracias por tus ofrendas!" }],
      },
      recados: [
        {
          id: "p3-carta-efrain",
          titulo: "Una carta para Efraín",
          cadena: ["eliaquim", "miqueas", "isaias"],
          lleva: ["una carta del rey para las ciudades de Efraín", "la noticia de cómo la recibieron"],
          dice: [
            "Esta carta del rey va para las ciudades de Efraín. Llévala a Miqueas: él conoce los caminos y a los correos.",
            "Ya salió con los correos. En unas ciudades se rieron… pero en otras lloraron y se pusieron en camino. Cuéntaselo a Isaías.",
            "Jehová es clemente y misericordioso: no aparta su rostro de quien se vuelve a él. Ya verás cuántos vienen.",
          ],
          verso: P.c30_9,
        },
        {
          id: "p3-peregrinos",
          titulo: "Lugar para los peregrinos",
          cadena: ["conanias", "eleazar", "etan"],
          lleva: ["la lista de las familias que llegaron de Aser y de Zabulón", "la noticia de que ya se están santificando"],
          dice: [
            "Llegaron familias de Aser y de Zabulón y acampan en el monte de los Olivos. Lleva esta lista a Eleazar: hay que enseñarles a santificarse para la Pascua.",
            "Ya hablé con ellos: se santificarán para la fiesta. Avísale a Etán, que los reciba con un salmo.",
            "¡Los recibiremos cantando! «Bendito el que viene en el nombre de Jehová». Gracias, hermano.",
          ],
          verso: P.c30_11,
        },
      ],
    },
    {
      n: 4,
      id: "pascua",
      titulo: "La gran Pascua",
      icono: "🍞",
      unidad: ["pan sin levadura", "panes sin levadura"],
      tarea: "celebrar la Pascua con un solo corazón y quitar los altares de la ciudad",
      historia: [
        "Se reúne en Jerusalén mucha gente para la fiesta de los panes sin levadura: una vasta reunión. Antes de la fiesta quitan los altares que Acaz había puesto en la ciudad y los echan al torrente de Cedrón.",
        "Muchos de los que vinieron de lejos no alcanzaron a purificarse. Ezequías ora por ellos, y Jehová oye a Ezequías y sana al pueblo.",
        "Mira los rincones de la ciudad: con lo que sirve toda Jerusalén, cada día se quita un altar más. Y al final de la semana, en la plaza, el gran regocijo.",
      ],
      verso: P.c30_12,
      guia: "azarias",
      dialogo: [
        { quien: "narrador", texto: P.c30_13.text, ref: P.c30_13.ref },
        { quien: "azarias", texto: "La ley lo dice de la Pascua: «Y este día os será en memoria, y lo celebraréis como fiesta solemne para Jehová».", ref: P.e12_14.ref },
        { quien: "narrador", texto: "Muchos siglos después, el apóstol Pablo escribió: «porque nuestra pascua, que es Cristo, ya fue sacrificada por nosotros».", ref: P.co5_7.ref },
        { quien: "azarias", texto: "Cada deber que cumplas es un pan sin levadura para la fiesta; cada encargo, cinco; cada recado, diez. Y el viernes empieza el gran regocijo: toda la ciudad se reúne en la plaza para dar gracias. ¡No faltes!" },
      ],
      alCumplir: "¡Jerusalén celebró la Pascua con un solo corazón!",
      premio: { gozo: 50, prenda: "manto-pascua" },
      chismes: {
        azarias: [{ texto: "Muchos de Efraín y de Zabulón no se habían purificado. El rey oró por ellos, y Jehová lo oyó y sanó al pueblo.", verso: P.c30_20 }],
        eleazar: [{ texto: "Los levitas sacrifican la Pascua por los que no se purificaron. Esta semana el altar no descansa.", verso: P.c30_17 }],
        isaias: [{ texto: "La sangre del cordero fue la señal en Egipto. Y Jehová me mostró a su Siervo: «como cordero fue llevado al matadero».", verso: P.i53_7 }],
        miqueas: [{ texto: "Quitaron los altares de los rincones y los echaron al Cedrón. Lo que Jehová pide es más sencillo: hacer justicia, amar misericordia y humillarte ante tu Dios.", verso: P.m6_8 }],
        etan: [
          { texto: "Para la fiesta cantamos: «¡Mirad cuán bueno y cuán delicioso es Habitar los hermanos juntos en armonía!»", verso: P.s133_1 },
          { texto: "Al final de la fiesta, los sacerdotes y los levitas bendecirán al pueblo de pie. ¡Y su oración llegará hasta el cielo!", verso: P.c30_27 },
        ],
        conanias: [
          { texto: "El rey dio a la asamblea mil novillos y siete mil ovejas… ¡y los príncipes, otros mil novillos y diez mil ovejas!", verso: P.c30_24 },
          { texto: "Se alegran todos: los de Judá, los sacerdotes, los levitas, los que vinieron de Israel ¡y hasta los forasteros!", verso: P.c30_25 },
        ],
        eliaquim: [{ texto: "Toda la asamblea quiere seguir la fiesta otros siete días. ¡Y el rey dijo que sí!", verso: P.c30_23 }],
      },
      recados: [
        {
          id: "p4-altares",
          titulo: "Los altares de los rincones",
          cadena: ["eliaquim", "eleazar", "azarias"],
          lleva: ["la orden del rey de quitar los altares de la ciudad", "la noticia de que ya están en el Cedrón"],
          dice: [
            "El rey manda quitar los altares que Acaz puso en los rincones de Jerusalén. Lleva esta orden a Eleazar: los levitas lo harán.",
            "Ya los quitamos, y también los altares de incienso: todo fue a dar al torrente de Cedrón. Avísale a Azarías.",
            "Ahora sí, la ciudad está lista para la Pascua. Bendito sea Jehová.",
          ],
          verso: P.c30_14,
        },
        {
          id: "p4-panes",
          titulo: "Los panes sin levadura",
          cadena: ["conanias", "etan", "isaias"],
          lleva: ["harina para los panes sin levadura", "la noticia de que ya están cocidos"],
          dice: [
            "Para la fiesta de los panes sin levadura hace falta mucha harina. Llévasela a Etán: los levitas cantores ayudan a cocer los panes.",
            "¡Ya están cocidos! Mientras se cocían, cantábamos. Lleva la noticia a Isaías: la fiesta está lista.",
            "Siete días con grande gozo… y la asamblea quiere otros siete. ¡Qué fiesta nos da Jehová!",
          ],
          verso: P.c30_21,
        },
      ],
    },
  ],
  fiesta: {
    titulo: "El gran regocijo",
    icono: "🎉",
    texto: "Toda la asamblea quiso seguir la fiesta otros siete días, y Jerusalén se llenó de alegría. Ve a la plaza y da gracias: gozo y una faja de fiesta para ti, y diez panes más para la ciudad.",
    verso: P.c30_26,
    gracias: P.s118_24,
    dias: [25, 26, 27],
    vivo: { indice: 27, desde: 18, hasta: 19 },
    lugar: { x: 56, z: -2, r: 13 },
    premio: { gozo: 30, vivo: 20, prenda: "faja-regocijo" },
  },
  album: { icono: "🍞", titulo: "De un solo corazón" },
};

/**
 * Qué historia cuenta cada temporada. Una historia nueva se agrega con la temporada en que empieza (siempre una que
 * todavía no empezó, para no cambiar la de nadie). Después de la última, se vuelven a contar todas en orden, una por
 * temporada (con dos historias: la 3 vuelve a contar la primera, la 4 la segunda…), hasta que llegue otra nueva.
 */
export const PROGRAMA: { desde: number; arco: ArcoTemporada }[] = [
  { desde: 1, arco: SENAQUERIB },
  { desde: 2, arco: PASCUA_EZEQUIAS },
];
/** Las historias, en orden. */
export const ARCOS: ArcoTemporada[] = PROGRAMA.map((p) => p.arco);

export function arcoDeTemporada(n: number): ArcoTemporada | null {
  if (!Number.isFinite(n) || n < 1) return null;
  const t = Math.floor(n);
  let i = -1;
  for (let k = 0; k < PROGRAMA.length; k++) if (PROGRAMA[k].desde <= t) i = k;
  if (i < 0) return null;
  const p = PROGRAMA[i];
  if (p.desde === t) return p.arco;
  // después de la última que empezó, se turnan todas las que ya se contaron, desde la primera
  const ya = PROGRAMA.slice(0, i + 1);
  return ya[(t - p.desde - 1) % ya.length].arco;
}

/** La historia de un capítulo (los nombres de los capítulos no se repiten entre historias). */
export function arcoDeCapitulo(id: CapituloId | null | undefined): ArcoTemporada | null {
  return (id && ARCOS.find((a) => a.capitulos.some((c) => c.id === id))) || null;
}

/** Las prendas de una historia: las de sus capítulos y la de su fiesta. */
export function prendasDeArco(a: ArcoTemporada): string[] {
  return [...a.capitulos.map((c) => c.premio.prenda), a.fiesta.premio.prenda];
}

/** Las prendas que se ganan con la historia (shared/mercado.ts las lista como exclusivas: no se venden). */
export const PRENDAS_CAPITULOS: { id: string; nombre: string; color: string; requisito: string }[] = [
  { id: "faja-edifican", nombre: "Faja de los que edifican", color: "#9a7b55", requisito: "Ayuda a levantar el muro y las torres" },
  { id: "manto-siloe", nombre: "Manto de las aguas de Siloé", color: "#3d9bb5", requisito: "Ayuda a cavar el conducto de Siloé" },
  { id: "faja-oracion", nombre: "Faja de los que oran", color: "#7d6aa8", requisito: "Ora con el rey Ezequías" },
  { id: "manto-liberacion", nombre: "Manto de la liberación", color: "#e8c56a", requisito: "Trae ofrendas de gratitud" },
  { id: "faja-alabanza", nombre: "Faja de la alabanza", color: "#e0782f", requisito: "Da gracias en la fiesta de la liberación" },
  { id: "faja-consagrados", nombre: "Faja de los consagrados", color: "#c8b87a", requisito: "Ayuda a limpiar la casa de Jehová" },
  { id: "manto-cantico", nombre: "Manto del cántico de Jehová", color: "#5470c6", requisito: "Canta el cántico de Jehová con los levitas" },
  { id: "faja-correos", nombre: "Faja de los correos del rey", color: "#b5562f", requisito: "Lleva las cartas del rey por todo Israel" },
  { id: "manto-pascua", nombre: "Manto de la Pascua", color: "#7a1426", requisito: "Celebra la Pascua con un solo corazón" },
  { id: "faja-regocijo", nombre: "Faja del gran regocijo", color: "#f5b82e", requisito: "Da gracias en el gran regocijo de la plaza" },
];

// ---------------------------------------------------------------- respuestas de la API
export type CapituloVista = {
  n: number;
  id: CapituloId;
  titulo: string;
  icono: string;
  estado: "pasado" | "actual" | "proximo";
  desde: string;
  hasta: string;
  /** La meta (null si el capítulo todavía no empezó). */
  meta: number | null;
  puntos: number;
  cumplido: boolean;
  /** Lo que aporté yo (mi persona, con todos mis personajes). */
  mios: number;
  /** Si ya recibí su premio. */
  premiado: boolean;
};

export type CapitulosVista = {
  temporada: number;
  arco: { id: string; titulo: string; subtitulo: string; refs: string };
  /** El capítulo de hoy (null antes de que empiece la temporada). */
  hoy: { n: number; diaDelCapitulo: number; diasRestantes: number } | null;
  capitulos: CapituloVista[];
  /** Quienes más aportaron en el capítulo de esta semana. */
  top: { nombre: string; puntos: number }[];
  fiesta: {
    desde: string;
    hasta: string;
    momento: MomentoFiesta;
    vivo: { dia: string; desde: number; hasta: number };
    participantes: number;
    yo: { fui: boolean; enVivo: boolean };
  };
  aporteMinimo: number;
  /**
   * Lo que la ciudad terminó la última vez que se contó cada una de las otras historias («historia:capítulo», como
   * «senaquerib:1»): las torres y el conducto que se levantaron en otra temporada siguen en la ciudad.
   */
  hechos: string[];
};

/** Lo que devuelve dar gracias en la fiesta. */
export type GraciasRespuesta = { vista: CapitulosVista; gozo: number; gozoTotal: number; nuevo: boolean; enVivo: boolean; avisos: { titulo: string; premio: number; gozo?: number }[] };
