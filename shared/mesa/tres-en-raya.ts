/**
 * Tres en raya: el juego de ejemplo del marco de mesas (shared/mesa.ts). Dos asientos, X y O, se turnan en un tablero
 * de 3×3; gana quien junta tres en línea. La computadora en «difícil» no pierde (busca todo el árbol: es chico).
 */
import { alAzar, type AsientoMesa, type Azar, type JuegoDeMesa, type NivelBot, type ResultadoMesa } from "../mesa";

export type Celda = 0 | 1 | null;
export type EstadoTres = { tablero: Celda[]; turno: 0 | 1; asientos: AsientoMesa[]; jugadas: number };
export type JugadaTres = number;
export type VistaTres = { tablero: Celda[]; turno: 0 | 1; linea: number[] | null };

export const LINEAS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
] as const;

export function lineaGanadora(t: readonly Celda[]): number[] | null {
  for (const l of LINEAS) if (t[l[0]] !== null && t[l[0]] === t[l[1]] && t[l[1]] === t[l[2]]) return [...l];
  return null;
}

const libres = (t: readonly Celda[]) => t.flatMap((c, i) => (c === null ? [i] : []));

/** Lo ya calculado (el tablero tiene menos de 20 000 posiciones: se recuerdan todas). */
const memoria = new Map<string, number>();

/** El valor de la posición para `yo` (+1 gano, −1 pierdo, 0 empate) con el turno de `toca`. */
function minimax(t: Celda[], toca: 0 | 1, yo: 0 | 1): number {
  const clave = `${t.map((c) => (c === null ? "-" : c)).join("")}${toca}${yo}`;
  const ya = memoria.get(clave);
  if (ya !== undefined) return ya;
  const v = minimaxSinMemoria(t, toca, yo);
  memoria.set(clave, v);
  return v;
}

function minimaxSinMemoria(t: Celda[], toca: 0 | 1, yo: 0 | 1): number {
  const l = lineaGanadora(t);
  if (l) return t[l[0]] === yo ? 1 : -1;
  const ls = libres(t);
  if (!ls.length) return 0;
  let mejor = toca === yo ? -2 : 2;
  for (const i of ls) {
    t[i] = toca;
    const v = minimax(t, toca === 0 ? 1 : 0, yo);
    t[i] = null;
    mejor = toca === yo ? Math.max(mejor, v) : Math.min(mejor, v);
  }
  return mejor;
}

export const TRES_EN_RAYA: JuegoDeMesa<EstadoTres, JugadaTres, VistaTres> = {
  id: "tres-en-raya",
  nombre: "Tres en raya",
  icono: "⭕",
  corto: "Junta tres en línea antes que el otro.",
  como: [
    "Dos jugadores se turnan para poner su ficha (la llama o la gota) en uno de los nueve hoyos del tablero.",
    "Gana quien junta tres en línea: de lado, de arriba abajo o en diagonal.",
    "Si se llena el tablero sin línea, es empate.",
  ],
  verso: { text: "Y si alguno prevaleciere contra uno, dos le resistirán; y cordón de tres dobleces no se rompe pronto.", ref: "Eclesiastés 4:12" },
  min: 2,
  max: 2,
  modo: "turnos",
  relojMs: 30_000,
  pensarMs: { facil: [700, 1600], normal: [900, 2000], dificil: [1100, 2400] },

  estadoInicial(asientos: AsientoMesa[]) {
    return { tablero: Array<Celda>(9).fill(null), turno: 0, asientos: asientos.slice(0, 2), jugadas: 0 };
  },
  turnoDe(e) {
    return lineaGanadora(e.tablero) || !libres(e.tablero).length ? null : e.turno;
  },
  jugadasValidas(e, asiento) {
    if (this.turnoDe(e) !== asiento) return [];
    return libres(e.tablero);
  },
  aplicar(e, asiento, j) {
    const tablero = [...e.tablero];
    tablero[j] = asiento as 0 | 1;
    return { ...e, tablero, turno: asiento === 0 ? 1 : 0, jugadas: e.jugadas + 1 };
  },
  terminado(e): ResultadoMesa | null {
    const l = lineaGanadora(e.tablero);
    const nombre = (n: number) => e.asientos[n]?.nombre ?? `Asiento ${n + 1}`;
    if (l) {
      const g = e.tablero[l[0]] as 0 | 1;
      return {
        ganadores: [g],
        puntos: [g === 0 ? 1 : 0, g === 1 ? 1 : 0],
        detalle: [g === 0 ? "¡Tres en línea!" : "Perdió esta vez", g === 1 ? "¡Tres en línea!" : "Perdió esta vez"],
        titulo: `¡Ganó ${nombre(g)}!`,
      };
    }
    if (!libres(e.tablero).length) return { ganadores: [], puntos: [0, 0], detalle: ["Empate", "Empate"], titulo: "¡Empate! Nadie juntó tres." };
    return null;
  },
  vistaPara(e) {
    return { tablero: e.tablero, turno: e.turno, linea: lineaGanadora(e.tablero) };
  },
  jugadaDeBot(e, asiento, nivel: NivelBot, azar: Azar) {
    const ls = libres(e.tablero);
    const yo = asiento as 0 | 1;
    // fácil: casi siempre al azar; normal: busca la mejor la mayoría de las veces; difícil: siempre la mejor
    const prob = nivel === "facil" ? 0.25 : nivel === "normal" ? 0.7 : 1;
    if (azar() >= prob) return alAzar(azar, ls);
    let mejor = -2;
    let opciones: number[] = [];
    for (const i of ls) {
      const t = [...e.tablero];
      t[i] = yo;
      const v = minimax(t, yo === 0 ? 1 : 0, yo);
      if (v > mejor) {
        mejor = v;
        opciones = [i];
      } else if (v === mejor) opciones.push(i);
    }
    return alAzar(azar, opciones);
  },
};
