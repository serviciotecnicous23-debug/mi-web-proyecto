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
  if (n > 0) await pool.query(`UPDATE game_characters SET gozo = gozo + $2 WHERE id = $1`, [characterId, Math.round(n)]);
}
