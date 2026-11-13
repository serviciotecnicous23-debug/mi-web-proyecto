/**
 * La ropa que se ve en Jerusalén en línea: lo que compró cada uno en el mercado (shared/mercado.ts), de pies a cabeza:
 * el manto y la faja, la túnica, el turbante o el velo, las sandalias, lo de la mano y el zurrón. Lo usan la ciudad y
 * la presencia de los vecinos.
 */
import { coloresDeIds, leerRopaIds, type RopaVista } from "@shared/mercado";

export function coloresDeRopa(v: unknown): RopaVista {
  return coloresDeIds(leerRopaIds(v));
}
