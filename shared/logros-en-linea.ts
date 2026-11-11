/**
 * Los logros de Jerusalén en línea: se ganan con lo que se hace con los demás (el muro, los pedidos
 * del barrio, las reuniones, el concurso, los estudios, las cátedras y la ofrenda del barrio) y los ven los vecinos
 * al visitar tu casa o tocarte en la calle. Se calculan de lo que ya guarda el juego.
 */

export type LogroId = "constructor" | "buenVecino" | "maestro" | "campeon" | "estudioso" | "discipulo" | "sabio" | "consejero" | "vencedor" | "fiel" | "siervoFiel" | "mensajero";

export const LOGROS_EN_LINEA: Record<LogroId, { nombre: string; icono: string; como: string }> = {
  constructor: { nombre: "Constructor del muro", icono: "🧱", como: "Pon 30 piedras en el muro caído" },
  buenVecino: { nombre: "Buen vecino", icono: "🤲", como: "Ayuda 5 veces con lo de tu alfolí a los pedidos del barrio" },
  maestro: { nombre: "Maestro en casa", icono: "📖", como: "Que 3 vecinos vengan a una reunión en tu casa" },
  campeon: { nombre: "Campeón del concurso", icono: "🏅", como: "Queda entre los tres primeros del concurso bíblico de una semana" },
  estudioso: { nombre: "Estudioso de la Palabra", icono: "📜", como: "Aprueba 3 estudios" },
  discipulo: { nombre: "Discípulo de los maestros", icono: "🎓", como: "Aprende 30 lecciones en las cátedras (con Isaías, Miqueas, Eleazar o Eliaquim)" },
  sabio: { nombre: "Sabio de la casa de la sabiduría", icono: "🏛️", como: "Sube las quince gradas de «¿Quién es sabio?»" },
  consejero: { nombre: "Buen consejero", icono: "🤝", como: "Da 5 consejos acertados a tus amigos y vecinos en «¿Quién es sabio?»" },
  vencedor: { nombre: "Vencedor de duelos", icono: "⚔️", como: "Gana 5 duelos de sabios en la casa de la sabiduría" },
  fiel: { nombre: "Fiel a su barrio", icono: "🙌", como: "Aporta a 2 ofrendas del barrio cumplidas" },
  siervoFiel: { nombre: "Siervo fiel", icono: "🔥", como: "Llega a 7 días seguidos en tu racha de servicio" },
  mensajero: { nombre: "Mensajero de los siervos", icono: "📜", como: "Cumple 10 recados de la calle de los siervos" },
};

export const ORDEN_LOGROS: LogroId[] = ["constructor", "buenVecino", "maestro", "campeon", "estudioso", "discipulo", "sabio", "consejero", "vencedor", "fiel", "siervoFiel", "mensajero"];

export type LogrosDe = {
  personajeId: number;
  nombre: string;
  /** Los que tiene (en orden) y, para cada uno, cuánto lleva de lo que pide. */
  logros: { id: LogroId; tiene: boolean; lleva: number; pide: number }[];
};
