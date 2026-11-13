/**
 * Las pantallas de los juegos de grupo tradicionales (shared/mesa/tradicionales.ts) dentro de la mesa del patio: toman
 * lo que manda la sala (`PantallaMesaProps`) y se lo dan a cada pantalla (los nombres de los asientos, quiénes son
 * compañeros de la computadora, cuándo llegó la vista para contar los relojes, y la jugada que se manda al servidor y
 * devuelve por qué no valió). Estos juegos traen sus propios asientos, relojes y turnos.
 */
import { useRef, type ComponentType } from "react";
import { ORDEN_MESAS, type JuegoMesaId } from "@shared/mesa/juegos";
import { juegosRed } from "../juegos-red";
import type { PantallaMesaProps } from "./index";
import { UI_MESAS } from "./mesas";

async function jugar(j: unknown): Promise<{ ok: boolean; message?: string }> {
  const r = await juegosRed.accion("/sala/jugar", { jugada: j });
  return { ok: r.ok, message: r.message ?? undefined };
}
const sinJugar = async () => ({ ok: false, message: "La partida terminó." });

function envolver(id: JuegoMesaId): ComponentType<PantallaMesaProps> {
  const UI = UI_MESAS[id];
  function Pantalla({ vista, asientos, ocupado }: PantallaMesaProps) {
    const llegada = useRef<{ v: unknown; en: number }>({ v: vista, en: Date.now() });
    if (llegada.current.v !== vista) llegada.current = { v: vista, en: Date.now() };
    // el tablero final (MesaFinal) llega «ocupado»: ahí ya no se juega
    const fin = ocupado;
    return <UI vista={vista} nombres={asientos.map((a) => a.nombre)} bots={asientos.map((a) => !!a.bot)} jugar={fin ? sinJugar : jugar} recibidaEn={llegada.current.en} />;
  }
  Pantalla.displayName = `Pantalla-${id}`;
  return Pantalla;
}

export const PANTALLAS_TRADICIONALES: Record<JuegoMesaId, ComponentType<PantallaMesaProps>> = Object.fromEntries(ORDEN_MESAS.map((id) => [id, envolver(id)])) as Record<
  JuegoMesaId,
  ComponentType<PantallaMesaProps>
>;
