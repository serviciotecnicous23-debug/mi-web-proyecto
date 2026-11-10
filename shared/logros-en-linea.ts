/**
 * Los logros de Jerusalén en línea: se ganan con lo que se hace con los demás (el muro, los pedidos
 * del barrio, las reuniones, el concurso, los estudios, las cátedras y la ofrenda del barrio) y los ven los vecinos
 * al visitar tu casa o tocarte en la calle. Se calculan de lo que ya guarda el juego.
 */

export type LogroId = "constructor" | "buenVecino" | "maestro" | "campeon" | "estudioso" | "discipulo" | "fiel";

export const LOGROS_EN_LINEA: Record<LogroId, { nombre: string; icono: string; como: string }> = {
  constructor: { nombre: "Constructor del muro", icono: "🧱", como: "Pon 30 piedras en el muro caído" },
  buenVecino: { nombre: "Buen vecino", icono: "🤲", como: "Ayuda 5 veces con lo de tu alfolí a los pedidos del barrio" },
  maestro: { nombre: "Maestro en casa", icono: "📖", como: "Que 3 vecinos vengan a una reunión en tu casa" },
  campeon: { nombre: "Campeón del concurso", icono: "🏅", como: "Queda entre los tres primeros del concurso bíblico de una semana" },
  estudioso: { nombre: "Estudioso de la Palabra", icono: "📜", como: "Aprueba 3 estudios" },
  discipulo: { nombre: "Discípulo de los maestros", icono: "🎓", como: "Aprende 30 lecciones en las cátedras (con Isaías o con Eleazar)" },
  fiel: { nombre: "Fiel a su barrio", icono: "🙌", como: "Aporta a 2 ofrendas del barrio cumplidas" },
};

export const ORDEN_LOGROS: LogroId[] = ["constructor", "buenVecino", "maestro", "campeon", "estudioso", "discipulo", "fiel"];

export type LogrosDe = {
  personajeId: number;
  nombre: string;
  /** Los que tiene (en orden) y, para cada uno, cuánto lleva de lo que pide. */
  logros: { id: LogroId; tiene: boolean; lleva: number; pide: number }[];
};
