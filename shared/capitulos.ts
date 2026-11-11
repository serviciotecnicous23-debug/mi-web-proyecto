/**
 * La historia de la temporada de Jerusalén en línea (pedido del análisis crítico del 11 de noviembre de 2026: algo que dé
 * ganas de volver cada semana y que diga «¿qué pasará la próxima?»). La temporada dura 28 días (server/jerusalen.ts,
 * temporadaDe); cada semana es un capítulo, con una meta de toda la ciudad que suman los deberes, los encargos y los
 * recados de todos (la lleva el servidor: server/capitulos.ts) y un premio para quienes ayudaron. Al final, la fiesta
 * en la plaza, en la que participa toda la ciudad.
 *
 * La primera historia: la amenaza de Senaquerib en los días del rey Ezequías (2 Reyes 18–20; 2 Crónicas 32; Isaías
 * 36–37). Las citas son literales de la RVR1960 (comprobadas con la Biblia del sitio).
 */
import type { Verso } from "./ciudad";
import { TEMPORADA_DIAS } from "./jerusalen";
import type { Chisme, PersonajeId, Recado } from "./personajes";

export type CapituloId = "muro" | "canal" | "rabsaces" | "liberacion";
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
};

/** Las historias, en orden: mientras no haya una nueva, cada temporada vuelve a contar la última. */
export const ARCOS: ArcoTemporada[] = [SENAQUERIB];

export function arcoDeTemporada(n: number): ArcoTemporada | null {
  if (!Number.isFinite(n) || n < 1) return null;
  return ARCOS[Math.min(ARCOS.length, Math.floor(n)) - 1] ?? null;
}

/** Las prendas que se ganan con la historia (shared/mercado.ts las lista como exclusivas: no se venden). */
export const PRENDAS_CAPITULOS: { id: string; nombre: string; color: string; requisito: string }[] = [
  { id: "faja-edifican", nombre: "Faja de los que edifican", color: "#9a7b55", requisito: "Ayuda a levantar el muro y las torres" },
  { id: "manto-siloe", nombre: "Manto de las aguas de Siloé", color: "#3d9bb5", requisito: "Ayuda a cavar el conducto de Siloé" },
  { id: "faja-oracion", nombre: "Faja de los que oran", color: "#7d6aa8", requisito: "Ora con el rey Ezequías" },
  { id: "manto-liberacion", nombre: "Manto de la liberación", color: "#e8c56a", requisito: "Trae ofrendas de gratitud" },
  { id: "faja-alabanza", nombre: "Faja de la alabanza", color: "#e0782f", requisito: "Da gracias en la fiesta de la liberación" },
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
};

/** Lo que devuelve dar gracias en la fiesta. */
export type GraciasRespuesta = { vista: CapitulosVista; gozo: number; gozoTotal: number; nuevo: boolean; enVivo: boolean; avisos: { titulo: string; premio: number; gozo?: number }[] };
