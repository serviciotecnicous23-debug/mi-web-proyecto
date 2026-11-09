/**
 * Juegos de la web. El servidor usa esta lista para aceptar puntajes solo de juegos que
 * existen y con un máximo creíble (no se puede mandar 9.999.999 a mano), y para armar los
 * avisos de la comunidad ("Ana llegó a sumo sacerdote") con textos fijos, nunca escritos por
 * quien juega.
 */
export type GameInfo = {
  slug: string;
  title: string;
  /** Puntaje máximo que se acepta. */
  maxScore: number;
  /** Puntos que se pueden ganar por segundo, como mucho (para descartar trampas obvias). */
  maxPointsPerSecond: number;
  /** Segundos de juego que se aceptan (los juegos largos suman muchas horas). */
  maxSeconds?: number;
  /** El juego guarda la partida en la cuenta (para seguir en otro equipo). */
  saves?: boolean;
  /** Tabla de la semana: el mejor puntaje de la semana ("best") o lo ganado en la semana ("gain"). */
  weekly: "best" | "gain";
  /** El juego publica logros en la actividad de la comunidad. */
  events?: boolean;
};

export const GAMES: Record<string, GameInfo> = {
  "atrapa-el-fuego": { slug: "atrapa-el-fuego", title: "Atrapa el fuego", maxScore: 200000, maxPointsPerSecond: 40, weekly: "best" },
  // "Gloria del templo": crece con lo restaurado, los levitas, los rangos, las jornadas y el gozo.
  // Es un juego sin fin: la tabla de la semana cuenta lo ganado en la semana.
  "aprendiz-del-templo": {
    slug: "aprendiz-del-templo",
    title: "El aprendiz del templo",
    maxScore: 100_000_000,
    maxPointsPerSecond: 30,
    maxSeconds: 100_000_000,
    saves: true,
    weekly: "gain",
    events: true,
  },
};

export function isGameSlug(slug: string): boolean {
  return Object.prototype.hasOwnProperty.call(GAMES, slug);
}

/** Semana del año (lunes a domingo, hora del servidor), por ejemplo "2026-S45". */
export function weekKey(d = new Date()): string {
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const day = t.getUTCDay() || 7;
  t.setUTCDate(t.getUTCDate() + 4 - day);
  const year = t.getUTCFullYear();
  const week = Math.ceil(((t.getTime() - Date.UTC(year, 0, 1)) / 86400000 + 1) / 7);
  return `${year}-S${String(week).padStart(2, "0")}`;
}

/** Nombres de los logros de "El aprendiz del templo" (el juego y el servidor usan los mismos). */
export const TEMPLO_LOGROS_NOMBRES: Record<string, string> = {
  altar: "Siervo del altar",
  cordero: "El cordero sin defecto",
  palomas: "La ofrenda del pobre",
  harina: "Flor de harina",
  puerta: "A la puerta del atrio",
  lena: "Leña cada mañana",
  manos: "Manos limpias",
  gozo: "El gozo del pueblo",
  sabio: "Labios que guardan sabiduría",
  maestro: "Maestro del pueblo",
  luz: "Luz de la noche",
  fuego: "Fuego que no se apaga",
  pan: "Pan de la proposición",
  aceite: "Aceite puro",
  incienso: "Incienso de la mañana y la tarde",
  oracion: "Casa de oración",
  diezmos: "Fieles en los diezmos",
  dias: "Días de servicio",
  jornadas: "Camino del servicio",
  estrellas: "Estrellas del cielo",
  racha: "Cada día",
  "h-puertas": "Puertas abiertas",
  "h-fuego": "El fuego arde otra vez",
  "h-rango1": "Consagrado",
  "h-rango2": "Trompeta de plata",
  "h-rey": "El rey en el templo",
  "h-pascua": "La gran Pascua",
  "h-rango3": "Incensario de oro",
  "h-rango4": "Sumo sacerdote",
  "h-velo": "El velo rasgado",
  "h-todo": "Todo restaurado",
  "h-levitas": "Los levitas ayudan",
  juez: "Juicio justo",
  fiestas: "Las fiestas solemnes",
};

const RANGOS = ["", "fue consagrado sacerdote", "ahora es sacerdote de turno", "es principal de los sacerdotes", "llegó a sumo sacerdote"];

/** Texto de un aviso de la comunidad. Devuelve null si el aviso no es válido. */
export function eventText(slug: string, tipo: string, valor: number): string | null {
  if (slug !== "aprendiz-del-templo" || !Number.isInteger(valor)) return null;
  switch (tipo) {
    case "rango":
      return valor >= 1 && valor <= 4 ? RANGOS[valor] : null;
    case "final":
      return valor === 1 ? "entró al Lugar Santísimo el Día de la Expiación" : null;
    case "jornada":
      return valor >= 10 && valor <= 100000 && valor % 10 === 0 ? `completó la jornada ${valor}` : null;
    case "racha":
      return [7, 30, 100, 365].includes(valor) ? `cumplió ${valor} días seguidos el desafío del día` : null;
    case "generacion":
      return valor >= 2 && valor <= 99 ? `empezó la ${valor}.ª generación en el templo` : null;
    default:
      return null;
  }
}

/** Aviso por una copa de oro (o un logro de la historia), con el nombre del logro. */
export function copaText(slug: string, logroId: string): string | null {
  if (slug !== "aprendiz-del-templo") return null;
  const nombre = TEMPLO_LOGROS_NOMBRES[logroId];
  if (!nombre) return null;
  return logroId.startsWith("h-") ? `logró «${nombre}»` : `ganó la copa de oro «${nombre}»`;
}
