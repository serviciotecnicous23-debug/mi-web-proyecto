/**
 * El gozo de Jerusalén en línea: se suma desde los deberes, las preguntas, los encargos, los estudios
 * y la ofrenda del barrio, y se gasta en el mercado (server/mercado.ts) y en las obras de la casa
 * (server/obras.ts). Vive aparte para que los demás archivos no se importen entre sí.
 *
 * El termómetro del gozo: cada día se anota cuánto gozo entró y cuánto salió, y de dónde (tabla
 * `game_gozo_dia`), para equilibrar la economía con números (lo ve la administración).
 */
import { pool } from "./db";
import { GOZO } from "@shared/mercado";

export { GOZO };

export const GOZO_DIA_SQL = `
CREATE TABLE IF NOT EXISTS "game_gozo_dia" (
  "dia" text NOT NULL,
  "fuente" text NOT NULL,
  "entra" bigint NOT NULL DEFAULT 0,
  "sale" bigint NOT NULL DEFAULT 0,
  "veces" integer NOT NULL DEFAULT 0,
  PRIMARY KEY ("dia", "fuente")
);`;

// el día de Texas, como el del servicio (aquí aparte: este archivo no importa server/jerusalen.ts)
const fmtDia = new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", year: "numeric", month: "2-digit", day: "2-digit" });
function hoy(): string {
  const p: Record<string, string> = {};
  for (const x of fmtDia.formatToParts(new Date())) p[x.type] = x.value;
  return `${p.year}-${p.month}-${p.day}`;
}

/** Anota en el termómetro (sin esperar: si falla, el juego sigue). */
export function anotarGozo(fuente: string, entra: number, sale: number) {
  const e = Math.max(0, Math.round(entra)), s = Math.max(0, Math.round(sale));
  if (!e && !s) return;
  void pool
    .query(
      `INSERT INTO game_gozo_dia (dia, fuente, entra, sale, veces) VALUES ($1, $2, $3, $4, 1)
       ON CONFLICT (dia, fuente) DO UPDATE SET entra = game_gozo_dia.entra + $3, sale = game_gozo_dia.sale + $4, veces = game_gozo_dia.veces + 1`,
      [hoy(), fuente.slice(0, 40), e, s],
    )
    .catch(() => null);
}

/** Lo que se gastó (el pago ya se hizo): para el termómetro. */
export function anotarGasto(fuente: string, n: number) {
  anotarGozo(fuente, 0, n);
}

/** Suma gozo a un personaje. `fuente` dice de dónde vino (para el termómetro). */
export async function sumarGozo(characterId: number, n: number, fuente = "otros") {
  // el gozo lo guarda el titular de la persona (su primer personaje), con cualquiera que lo gane
  if (n > 0) {
    await pool.query(
      `UPDATE game_characters SET gozo = gozo + $2
        WHERE id = (SELECT MIN(c2.id) FROM game_characters c2 JOIN game_characters c ON c.user_id = c2.user_id AND c.game = c2.game WHERE c.id = $1)`,
      [characterId, Math.round(n)],
    );
    anotarGozo(fuente, n, 0);
  }
}
