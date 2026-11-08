/**
 * Juegos de la web. El servidor usa esta lista para aceptar puntajes solo de juegos que
 * existen y con un máximo creíble (no se puede mandar 9.999.999 a mano).
 */
export type GameInfo = {
  slug: string;
  title: string;
  /** Puntaje máximo que se acepta. */
  maxScore: number;
  /** Puntos que se pueden ganar por segundo, como mucho (para descartar trampas obvias). */
  maxPointsPerSecond: number;
  /** El juego guarda la partida en la cuenta (para seguir en otro equipo). */
  saves?: boolean;
};

export const GAMES: Record<string, GameInfo> = {
  "atrapa-el-fuego": { slug: "atrapa-el-fuego", title: "Atrapa el fuego", maxScore: 200000, maxPointsPerSecond: 40 },
  // "Gloria del templo": crece con lo restaurado, los levitas, los rangos y el gozo de toda la partida.
  "aprendiz-del-templo": { slug: "aprendiz-del-templo", title: "El aprendiz del templo", maxScore: 1000000, maxPointsPerSecond: 30, saves: true },
};

export function isGameSlug(slug: string): boolean {
  return Object.prototype.hasOwnProperty.call(GAMES, slug);
}
