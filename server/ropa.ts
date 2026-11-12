/**
 * La ropa que se ve en Jerusalén en línea: los colores del manto y la faja que compró cada uno en el
 * mercado (shared/mercado.ts). Lo usan la ciudad y la presencia de los vecinos.
 */
import { coloresDeIds, type RopaVista } from "@shared/mercado";

export function coloresDeRopa(v: unknown): RopaVista {
  const r = v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : {};
  return coloresDeIds({ manto: typeof r.manto === "string" ? r.manto : null, faja: typeof r.faja === "string" ? r.faja : null });
}
