/**
 * Acompañar a los vecinos (shared/acompanar.ts), en la pantalla: la invitación que llega por la red (la muestra
 * InvitacionEntrante arriba) y a quién se está siguiendo (el aviso «Siguiendo a…»; lo pone la ciudad).
 */
import { useSyncExternalStore } from "react";
import type { Invitacion } from "@shared/acompanar";

export type InvitacionEntrante = Invitacion & { hasta: number };
export type Siguiendo = { id: number; nombre: string } | null;

let invitacion: InvitacionEntrante | null = null;
let siguiendo: Siguiendo = null;
const oyentes = new Set<() => void>();
const avisar = () => {
  for (const f of oyentes) f();
};

export const acompanar = {
  getInvitacion: (): InvitacionEntrante | null => invitacion,
  getSiguiendo: (): Siguiendo => siguiendo,
  recibir(i: Invitacion) {
    invitacion = { ...i, hasta: Date.now() + i.restantes * 1000 };
    avisar();
  },
  cerrarInvitacion() {
    invitacion = null;
    avisar();
  },
  ponerSiguiendo(s: Siguiendo) {
    if (s?.id === siguiendo?.id && s?.nombre === siguiendo?.nombre) return;
    siguiendo = s;
    avisar();
  },
  subscribe(f: () => void): () => void {
    oyentes.add(f);
    return () => {
      oyentes.delete(f);
    };
  },
};

export function useInvitacion(): InvitacionEntrante | null {
  return useSyncExternalStore(acompanar.subscribe, acompanar.getInvitacion, acompanar.getInvitacion);
}
export function useSiguiendo(): Siguiendo {
  return useSyncExternalStore(acompanar.subscribe, acompanar.getSiguiendo, acompanar.getSiguiendo);
}
