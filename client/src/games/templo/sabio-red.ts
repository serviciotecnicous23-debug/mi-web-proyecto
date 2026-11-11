/**
 * Lo que llega por la red de la ciudad (o del templo en línea) para «¿Quién es sabio?» (shared/sabio.ts): la
 * llamada de un amigo o vecino que pide consejo (la muestra LlamadaEntrante en cualquier parte), el aviso a quien
 * llamó de que llegó el consejo, el agradecimiento cuando se supo si el consejo era el bueno, y el duelo de
 * sabios: el reto que llega (RetoEntrante) y los avisos de que algo cambió en el duelo.
 */
import { useSyncExternalStore } from "react";
import type { RedEntra } from "@shared/ciudad";
import type { LlamadaSabio, RetoDuelo } from "@shared/sabio";
import { gameStore } from "./store";
import { sonido } from "./sabio-sonido";

export type LlamadaEntrante = LlamadaSabio & { hasta: number };
export type RetoEntrante = RetoDuelo & { hasta: number };

let llamada: LlamadaEntrante | null = null;
let reto: RetoEntrante | null = null;
const oyentes = new Set<() => void>();
const alConsejo = new Set<(id: number) => void>();
const alDuelo = new Set<(id: number) => void>();
const alAbrirDuelo = new Set<(id: number) => void>();
/** Cuántas pantallas del concurso están abiertas (para saber si hay que abrir una al aceptar un reto). */
let vistasAbiertas = 0;

function avisar() {
  for (const f of oyentes) f();
}

export const sabioRed = {
  get: (): LlamadaEntrante | null => llamada,
  /** Lo que mandó el servidor (los mensajes que empiezan con «sabio-»). */
  recibir(m: RedEntra) {
    switch (m.t) {
      case "sabio-llamada":
        llamada = { ...m.l, hasta: Date.now() + m.l.restantes * 1000 };
        sonido.llamada();
        avisar();
        break;
      case "sabio-llamada-fin":
        if (llamada?.id === m.id) {
          llamada = null;
          avisar();
          gameStore.toast(`📞 ${m.motivo}`, "info");
        }
        break;
      case "sabio-consejo":
        for (const f of alConsejo) f(m.id);
        break;
      case "duelo-reto":
        reto = { ...m.r, hasta: Date.now() + m.r.restantes * 1000 };
        sonido.reto();
        avisar();
        break;
      case "duelo-reto-fin":
        if (reto?.id === m.id) {
          reto = null;
          avisar();
          gameStore.toast(`⚔️ ${m.motivo}`, "info");
        }
        break;
      case "duelo":
        for (const f of alDuelo) f(m.id);
        break;
      case "sabio-gracias":
        gameStore.toast(
          m.bien
            ? `🤝 ¡Tu consejo era el bueno! ${m.de} te lo agradece${m.gozo ? `: +${m.gozo} de gozo` : ""}.`
            : `🤝 ${m.de} ya supo la respuesta: tu consejo no era el bueno, pero gracias por ayudar.`,
          m.bien ? "gold" : "info",
        );
        if (m.premio) gameStore.toast(`🎖️ ¡Ganaste la ${m.premio}! Está en el armario de tu casa.`, "gold");
        break;
      default:
        break;
    }
  },
  /** Se cierra la llamada en esta pantalla (ya se contestó o se acabó el tiempo). */
  cerrar(id?: number) {
    if (id !== undefined && llamada?.id !== id) return;
    llamada = null;
    avisar();
  },
  getReto: (): RetoEntrante | null => reto,
  cerrarReto(id?: number) {
    if (id !== undefined && reto?.id !== id) return;
    reto = null;
    avisar();
  },
  /** Algo cambió en el duelo `id` (que la pantalla lo vuelva a pedir). */
  onDuelo(f: (id: number) => void): () => void {
    alDuelo.add(f);
    return () => {
      alDuelo.delete(f);
    };
  },
  /** Se aceptó un reto: la pantalla del concurso entra al duelo (si no está abierta, se abre y lo encuentra sola). */
  abrirDuelo(id: number) {
    if (vistasAbiertas > 0) for (const f of alAbrirDuelo) f(id);
    else gameStore.push({ kind: "sabio" });
  },
  onAbrirDuelo(f: (id: number) => void): () => void {
    alAbrirDuelo.add(f);
    vistasAbiertas++;
    return () => {
      alAbrirDuelo.delete(f);
      vistasAbiertas--;
    };
  },
  /** Quien llamó: llegó el consejo de su partida `id`. */
  onConsejo(f: (id: number) => void): () => void {
    alConsejo.add(f);
    return () => {
      alConsejo.delete(f);
    };
  },
  subscribe(f: () => void): () => void {
    oyentes.add(f);
    return () => {
      oyentes.delete(f);
    };
  },
};

export function useLlamadaEntrante(): LlamadaEntrante | null {
  return useSyncExternalStore(sabioRed.subscribe, sabioRed.get, sabioRed.get);
}

export function useRetoEntrante(): RetoEntrante | null {
  return useSyncExternalStore(sabioRed.subscribe, sabioRed.getReto, sabioRed.getReto);
}
