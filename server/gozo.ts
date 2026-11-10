/**
 * El gozo de Jerusalén en línea: se suma desde los deberes, las preguntas, los encargos, los estudios
 * y la ofrenda del barrio, y se gasta en el mercado (server/mercado.ts). Vive aparte para que los
 * demás archivos no se importen entre sí.
 */
import { pool } from "./db";
import { GOZO } from "@shared/mercado";

export { GOZO };

/** Suma gozo a un personaje. */
export async function sumarGozo(characterId: number, n: number) {
  // el gozo lo guarda el titular de la persona (su primer personaje), con cualquiera que lo gane
  if (n > 0)
    await pool.query(
      `UPDATE game_characters SET gozo = gozo + $2
        WHERE id = (SELECT MIN(c2.id) FROM game_characters c2 JOIN game_characters c ON c.user_id = c2.user_id AND c.game = c2.game WHERE c.id = $1)`,
      [characterId, Math.round(n)],
    );
}
