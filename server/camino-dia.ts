/**
 * Lo que se hizo hoy para el camino de hoy (shared/camino.ts), por persona y día de Texas: aprender, ayudar y restaurar
 * (servir sale del mérito del día). Vive aparte para que las rutas que lo marcan no se importen entre sí.
 */
import { pool } from "./db";
import { diaClave } from "./jerusalen";
import { titularDe } from "./racha";

export const CAMINO_SQL = `
CREATE TABLE IF NOT EXISTS "game_camino_dia" (
  "titular" integer NOT NULL REFERENCES "game_characters"("id") ON DELETE CASCADE,
  "dia" text NOT NULL,
  "aprender" boolean NOT NULL DEFAULT false,
  "ayudar" boolean NOT NULL DEFAULT false,
  "restaurar" boolean NOT NULL DEFAULT false,
  "cofre_at" timestamp,
  PRIMARY KEY ("titular", "dia")
);`;

/** Marca que hoy esta persona aprendió, ayudó o restauró algo. */
export async function marcarCamino(characterId: number, paso: "aprender" | "ayudar" | "restaurar"): Promise<void> {
  const titular = await titularDe(characterId);
  await pool.query(
    `INSERT INTO game_camino_dia (titular, dia, ${paso}) VALUES ($1, $2, true)
     ON CONFLICT (titular, dia) DO UPDATE SET ${paso} = true`,
    [titular, diaClave()],
  );
}

/** Igual, sin que un error detenga lo que se estaba haciendo. */
export function anotarCamino(characterId: number, paso: "aprender" | "ayudar" | "restaurar") {
  return marcarCamino(characterId, paso).catch((err) => console.error("[camino] marcar:", err));
}
