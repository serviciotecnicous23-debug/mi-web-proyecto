/**
 * Los juegos de mesa del patio. Para agregar uno: su módulo en `shared/mesa/<juego>.ts` (interfaz `JuegoDeMesa` de
 * shared/mesa.ts), una línea aquí y su pantalla en `client/src/games/templo/mesa/` (con su línea en `PANTALLAS_MESA`).
 */
import type { JuegoDeMesa } from "../mesa";
import { TRES_EN_RAYA } from "./tres-en-raya";
import { CUATRO_EN_RAYA } from "./cuatro-en-raya";
import { DAMAS } from "./damas";
import { AJEDREZ } from "./ajedrez";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CualquierJuego = JuegoDeMesa<any, any, any>;

const LISTA: CualquierJuego[] = [AJEDREZ, DAMAS, CUATRO_EN_RAYA, TRES_EN_RAYA];

export const MESAS: Record<string, CualquierJuego> = Object.fromEntries(LISTA.map((j) => [j.id, j]));

/** Los juegos de mesa en el orden de la lista. */
export const ORDEN_MESAS: string[] = LISTA.map((j) => j.id);

export const esMesa = (v: unknown): v is string => typeof v === "string" && v in MESAS;
