/**
 * El barrio como clan (Jerusalén en línea): su emblema y su lema (los eligen sus vecinos con su voto)
 * y la charla del barrio, con frases fijas, versículos y mensajes cortos que pasan por un filtro.
 *
 * Decisión de Luis (2026-11-10): «texto filtrado y frases». El filtro vive aquí para que el teléfono
 * avise al instante, pero quien decide es el servidor. Ningún filtro lo atrapa todo: por eso cada
 * mensaje se puede denunciar, quien denuncia deja de verlo, con dos denuncias se oculta para todos
 * hasta que la administración lo revise, y se puede bloquear a quien molesta.
 *
 * Las citas entre comillas son textuales de la Reina-Valera 1960.
 */
import type { EscalonId } from "./jerusalen";
import { PALABRAS_MALAS, RAICES_MALAS, sinTildes } from "./jerusalen";
import type { Verso } from "./ciudad";

// ---------------------------------------------------------------- la charla
/** Letras por mensaje. */
export const CHAT_MAX = 140;
/** Un mensaje cada 3 s, como mucho 10 por minuto y 200 por día. */
export const CHAT_CADA_MS = 3000;
export const CHAT_POR_MINUTO = 10;
export const CHAT_POR_DIA = 200;
/** Mensajes que se traen al abrir la charla (y en cada página hacia atrás). */
export const CHAT_PAGINA = 50;
/** Con estas denuncias de personas distintas, el mensaje se oculta para todos hasta que lo revisen. */
export const DENUNCIAS_PARA_OCULTAR = 2;

export const VERSO_PALABRA: Verso = {
  text: "Sea vuestra palabra siempre con gracia, sazonada con sal, para que sepáis cómo debéis responder a cada uno.",
  ref: "Colosenses 4:6",
};

/** Un mensaje de la charla del barrio tal como lo ve cada vecino. */
export type MensajeBarrio = {
  id: number;
  /** El personaje que habló (el de la presencia: su figura en la ciudad). */
  de: number;
  nombre: string;
  camino: "sacerdocio" | "profecia" | "realeza";
  /** El texto (en las frases fijas, el de la frase). */
  texto: string;
  /** Si es una frase fija o un versículo: su id (y la cita, si es versículo). */
  frase: string | null;
  ref: string | null;
  /** Fecha ISO. */
  at: string;
  /** Lo escribí yo. */
  mio: boolean;
};

export type RevisionMensaje = { ok: true; texto: string } | { ok: false; motivo: string };

// raíces que son groserías aunque vayan dentro de otra palabra («comemierda»)
const RAICES_SIEMPRE = RAICES_MALAS.filter((r) => !["putas", "putit", "zorra", "perra", "sexo", "cagad", "weon", "boludo", "jodid"].includes(r)).concat([
  "nigg", "conchetu", "conchatu", "malnacid", "cabrona", "pajer", "culiad", "verguer",
]);
// raíces que solo cuentan al empezar la palabra («disputas» no es grosería)
const RAICES_INICIO = ["putas", "putit", "putos", "zorra", "perra", "sexo", "cagad", "weon", "boludo", "jodid", "marica", "tarad", "babos"];
// palabras enteras (sin «feo» ni «fea», que en una charla casi nunca son insulto)
const PALABRAS_CHAT = PALABRAS_MALAS.filter((p) => p !== "feo" && p !== "fea").concat([
  "putas", "putos", "culos", "hdp", "ctm", "ptm", "csm", "mrd", "vrg", "alv", "stfu", "ass", "dick", "cock", "sex", "porn", "matate", "muerete", "suicidate",
  "menso", "mensa", "tarado", "tarada", "baboso", "babosa", "marica", "maricas",
]);
const PALABRAS_SIN_DOBLES = PALABRAS_CHAT.filter((m) => !/(.)\1/.test(m));

const LEET: Record<string, string> = { "0": "o", "1": "i", "3": "e", "4": "a", "5": "s", "7": "t", "8": "b", "@": "a", $: "s" };
const colapsar = (p: string) => p.replace(/(.)\1+/g, "$1");

/** Minúsculas, sin tildes, con los números que imitan letras cambiados por letras y solo letras y espacios. */
function plano(t: string): string {
  return sinTildes(t.toLowerCase())
    .replace(/[0134578@$]/g, (c) => LEET[c] ?? c)
    .replace(/[^a-zñ]+/g, " ")
    .trim();
}

function tieneGroseria(texto: string): boolean {
  const palabras = plano(texto).split(" ").filter(Boolean);
  // letras sueltas seguidas se juntan («p u t a»)
  const juntas: string[] = [];
  let suelto = "";
  for (const p of palabras) {
    if (p.length === 1) suelto += p;
    else {
      if (suelto.length >= 3) juntas.push(suelto);
      suelto = "";
    }
  }
  if (suelto.length >= 3) juntas.push(suelto);
  for (const p of [...palabras, ...juntas]) {
    const c = colapsar(p);
    if (RAICES_SIEMPRE.some((r) => c.includes(colapsar(r)))) return true;
    if (RAICES_INICIO.some((r) => c.startsWith(colapsar(r)))) return true;
    if (PALABRAS_CHAT.includes(p) || PALABRAS_SIN_DOBLES.includes(c)) return true;
  }
  return false;
}

// una cita bíblica («Juan 3:16», «1 Corintios 13:4-7») no cuenta como número de teléfono
const CITA = /(?:\b[1-3]\s?)?[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]{2,}\.?\s+\d{1,3}\s?:\s?\d{1,3}(?:\s?[-–,]\s?\d{1,3})*/g;
// el número de una casa del barrio («casa 12») tampoco
const CASA = /\bcasa\s+(?:n(?:u|ú)mero\s+)?\d{1,2}\b/gi;
const NUMEROS_EN_LETRAS = new Set(["cero", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez", "once", "doce", "trece", "catorce", "quince"]);

/** ¿Se puede publicar este mensaje en la charla del barrio? Devuelve el texto limpio o el motivo. */
export function revisarMensaje(entrada: string): RevisionMensaje {
  const texto = String(entrada ?? "")
    .replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028-\u202e\u2060-\u2064\ufeff]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    // nada de «holaaaaaaa»
    .replace(/(.)\1{3,}/gu, "$1$1$1");
  if (!texto) return { ok: false, motivo: "Escribe algo antes de enviar." };
  if ([...texto].length > CHAT_MAX) return { ok: false, motivo: `Máximo ${CHAT_MAX} letras por mensaje.` };
  const bajo = sinTildes(texto.toLowerCase());
  // enlaces y páginas
  if (
    /(https?:|www\.|\bt\.me\b|\bwa\.me\b|bit\.ly)/.test(bajo) ||
    // sin espacios: «hola.com» (con espacio, «Amén. Es…» es una frase y no una página)
    /\b[a-z0-9-]{2,}\.(com|net|org|info|io|me|ly|gg|tv|app|site|xyz|co|es|mx|ve|ar|us|cl|pe|ec|do|online|link|club)\b/.test(bajo) ||
    /[a-z0-9]\s*\.\s*(com|net|org)\b/.test(bajo) ||
    /punto\s?(com|net|org)\b|dot\s?com\b/.test(bajo)
  )
    return { ok: false, motivo: "Sin enlaces ni páginas web en la charla del barrio." };
  // correos, usuarios y redes
  if (
    bajo.includes("@") ||
    /\barroba\b|gmail|hotmail|outlook|yahoo|icloud|proton/.test(bajo) ||
    /whats?app|wh?atsap|wasap|guasap|\bwsp\b|\bwpp\b|telegram|instagram|\binsta\b|\big\b|facebook|\bface\b|\bfb\b|snapchat|\bsnap\b|tik\s?tok|discord|\bkik\b|messenger|\bwechat\b|\bline\b(?= ?(es|id|:))/.test(bajo) ||
    /\b(mi|tu|su) (numero|cel|celular|telefono|tlf|movil|whats|correo|email|mail|usuario|user|direccion|casa de verdad)\b/.test(bajo) ||
    /\b(llamame|marcame|textea(me)?|agregame|agregarme|agreguenme|escribeme al)\b/.test(bajo)
  )
    return { ok: false, motivo: "Por tu seguridad, no compartas ni pidas teléfonos, correos ni redes sociales." };
  // edad, dirección y otros datos personales
  if (
    /\btengo\s+(\d{1,2}|cinco|seis|siete|ocho|nueve|diez|once|doce|trece|catorce|quince|dieciseis|diecisiete|dieciocho|diecinueve|veinte)\s+anos\b/.test(bajo) ||
    /\b(cuantos anos tienes|que edad tienes|mi edad|donde vives|en que ciudad vives|de donde eres|como te llamas de verdad|tu nombre real|mi nombre real)\b/.test(bajo) ||
    /\b(calle|avenida|avda|av|carrera|cra|apto|apartamento|edificio|colonia|urbanizacion|zip|codigo postal)\b\.?\s*\S{0,3}\s*\d/.test(bajo)
  )
    return { ok: false, motivo: "No compartas ni pidas datos personales (edad, dirección, nombre real)." };
  // números largos (teléfonos), aunque vengan con espacios o en letras
  const sinCitas = texto.replace(CITA, " ").replace(CASA, " ");
  const digitos = (sinCitas.match(/\d/g) || []).length;
  let seguidos = 0;
  let maxSeguidos = 0;
  for (const p of plano(sinCitas.replace(/\d/g, " ")).split(" ")) {
    seguidos = NUMEROS_EN_LETRAS.has(p) ? seguidos + 1 : 0;
    maxSeguidos = Math.max(maxSeguidos, seguidos);
  }
  if (digitos >= 5 || maxSeguidos >= 4)
    return { ok: false, motivo: "Sin números de teléfono ni direcciones. Para una cita escribe el libro, por ejemplo «Juan 3:16»." };
  if (tieneGroseria(texto)) return { ok: false, motivo: "Ese mensaje tiene palabras que no van en Jerusalén. Habla con gracia (Colosenses 4:6)." };
  return { ok: true, texto };
}

// ---------------------------------------------------------------- el emblema y el lema del barrio
export type Emblema = { id: string; icono: string; nombre: string; ref: string };

/** Los emblemas que pueden elegir los vecinos (ninguno parece una cruz). */
export const EMBLEMAS: Emblema[] = [
  { id: "leon", icono: "🦁", nombre: "El León de Judá", ref: "Apocalipsis 5:5" },
  { id: "cordero", icono: "🐑", nombre: "El Cordero", ref: "Juan 1:29" },
  { id: "paloma", icono: "🕊️", nombre: "La paloma", ref: "Mateo 3:16" },
  { id: "vid", icono: "🍇", nombre: "La vid", ref: "Juan 15:5" },
  { id: "trigo", icono: "🌾", nombre: "El grano de trigo", ref: "Juan 12:24" },
  { id: "olivo", icono: "🫒", nombre: "El olivo verde", ref: "Salmo 52:8" },
  { id: "lampara", icono: "🪔", nombre: "La lámpara", ref: "Salmo 119:105" },
  { id: "fuego", icono: "🔥", nombre: "El fuego del altar", ref: "Levítico 6:13" },
  { id: "estrella", icono: "⭐", nombre: "La estrella de la mañana", ref: "Apocalipsis 22:16" },
  { id: "corona", icono: "👑", nombre: "La corona de vida", ref: "Santiago 1:12" },
  { id: "libro", icono: "📜", nombre: "El libro de la ley", ref: "Josué 1:8" },
  { id: "trompeta", icono: "📯", nombre: "Las trompetas de plata", ref: "Números 10:2" },
  { id: "peces", icono: "🐟", nombre: "Pescadores de hombres", ref: "Mateo 4:19" },
  { id: "monte", icono: "⛰️", nombre: "El monte de Sion", ref: "Salmo 125:1" },
  { id: "rio", icono: "🌊", nombre: "El río de Dios", ref: "Salmo 46:4" },
  { id: "palmera", icono: "🌴", nombre: "La palmera", ref: "Salmo 92:12" },
  { id: "aguila", icono: "🦅", nombre: "Alas de águila", ref: "Isaías 40:31" },
  { id: "sol", icono: "☀️", nombre: "El Sol de justicia", ref: "Malaquías 4:2" },
];
export const EMBLEMA = Object.fromEntries(EMBLEMAS.map((e) => [e.id, e])) as Record<string, Emblema>;

export type Lema = { id: string } & Verso;
/** Los lemas que pueden elegir los vecinos. */
export const LEMAS: Lema[] = [
  { id: "armonia", text: "¡Mirad cuán bueno y cuán delicioso es Habitar los hermanos juntos en armonía!", ref: "Salmo 133:1" },
  { id: "casa", text: "pero yo y mi casa serviremos a Jehová.", ref: "Josué 24:15" },
  { id: "dos", text: "Mejores son dos que uno; porque tienen mejor paga de su trabajo.", ref: "Eclesiastés 4:9" },
  { id: "cordon", text: "y cordón de tres dobleces no se rompe pronto.", ref: "Eclesiastés 4:12" },
  { id: "cargas", text: "Sobrellevad los unos las cargas de los otros, y cumplid así la ley de Cristo.", ref: "Gálatas 6:2" },
  { id: "edifiquemos", text: "Levantémonos y edifiquemos. Así esforzaron sus manos para bien.", ref: "Nehemías 2:18" },
  { id: "estimularnos", text: "Y considerémonos unos a otros para estimularnos al amor y a las buenas obras;", ref: "Hebreos 10:24" },
  { id: "paz", text: "Pedid por la paz de Jerusalén; Sean prosperados los que te aman.", ref: "Salmo 122:6" },
  { id: "fraternal", text: "Amaos los unos a los otros con amor fraternal; en cuanto a honra, prefiriéndoos los unos a los otros.", ref: "Romanos 12:10" },
  { id: "corazon", text: "Y la multitud de los que habían creído era de un corazón y un alma;", ref: "Hechos 4:32" },
  { id: "hierro", text: "Hierro con hierro se aguza; Y así el hombre aguza el rostro de su amigo.", ref: "Proverbios 27:17" },
];
export const LEMA = Object.fromEntries(LEMAS.map((l) => [l.id, l])) as Record<string, Lema>;

/** Mientras nadie vota: un emblema por área (la Ciudad de David, la puerta de las Ovejas, Ofel y la puerta de Efraín). */
export const EMBLEMA_DEL_AREA = ["leon", "cordero", "lampara", "palmera"];
export const LEMA_INICIAL = "armonia";

// ---------------------------------------------------------------- respuestas de la API
export type MiembroBarrio = {
  /** La casa (el titular de la persona). */
  casaId: number;
  /** El personaje con que juega ahora. */
  personajeId: number;
  nombre: string;
  camino: "sacerdocio" | "profecia" | "realeza";
  escalon: EscalonId;
  parcela: number;
  nivel: number;
  enLinea: boolean;
  /** Dónde está ahora («En el templo», «En la plaza · en el mercado»), si está en línea. */
  donde: string | null;
  esYo: boolean;
};

export type BarrioVista = {
  n: number;
  area: number;
  nombre: string;
  emblema: Emblema;
  lema: Lema;
  /** Votos de cada emblema y lema, y los míos. */
  votos: { emblemas: Record<string, number>; lemas: Record<string, number>; mio: { emblema: string | null; lema: string | null } };
  miembros: MiembroBarrio[];
  /** Los últimos mensajes (del más viejo al más nuevo) y si hay más atrás. */
  chat: MensajeBarrio[];
  hayMas: boolean;
  /** Mensajes que no había visto antes de abrir. */
  nuevos: number;
  /** Puedo escribir aquí (es mi barrio y no estoy fuera de la ciudad). */
  puedoEscribir: boolean;
  esAdmin: boolean;
};
