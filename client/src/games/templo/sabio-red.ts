/**
 * Lo que llega por la red de la ciudad (o del templo en línea) para «¿Quién es sabio?» (shared/sabio.ts): la
 * llamada de un amigo o vecino que pide consejo (la muestra LlamadaEntrante en cualquier parte), el aviso a quien
 * llamó de que llegó el consejo, y el agradecimiento cuando se supo si el consejo era el bueno.
 */
import { useSyncExternalStore } from "react";
import type { RedEntra } from "@shared/ciudad";
import type { LlamadaSabio } from "@shared/sabio";
import { gameStore } from "./store";
import { sonido } from "./sabio-sonido";

export type LlamadaEntrante = LlamadaSabio & { hasta: number };

let llamada: LlamadaEntrante | null = null;
const oyentes = new Set<() => void>();
const alConsejo = new Set<(id: number) => void>();

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
