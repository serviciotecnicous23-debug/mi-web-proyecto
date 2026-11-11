/**
 * La misión del barrio de hoy en la ciudad (shared/barrio-juntos.ts): lo que manda la red mientras estás en el lugar
 * (cuántos vecinos hay y cuánto falta) para el aviso de arriba de la pantalla. Si deja de llegar (te fuiste del
 * lugar), el aviso se apaga solo.
 */
import { useSyncExternalStore } from "react";
import type { JuntosProgreso } from "@shared/barrio-juntos";

export type JuntosEstado = { p: JuntosProgreso | null; hecha: string | null };

let estado: JuntosEstado = { p: null, hecha: null };
const oyentes = new Set<() => void>();
let apagar: ReturnType<typeof setTimeout> | null = null;
let apagarHecha: ReturnType<typeof setTimeout> | null = null;

function cambiar(e: JuntosEstado) {
  estado = e;
  for (const f of oyentes) f();
}

export const juntos = {
  get: (): JuntosEstado => estado,
  /** Cómo va la misión (cada 4 s mientras estás en el lugar). */
  recibir(p: JuntosProgreso) {
    cambiar({ ...estado, p });
    if (apagar) clearTimeout(apagar);
    apagar = setTimeout(() => cambiar({ ...estado, p: null }), 7000);
  },
  /** Se cumplió: el aviso dice «¡Misión cumplida!» unos segundos. */
  cumplida(titulo: string) {
    if (apagar) clearTimeout(apagar);
    cambiar({ p: null, hecha: titulo });
    if (apagarHecha) clearTimeout(apagarHecha);
    apagarHecha = setTimeout(() => cambiar({ ...estado, hecha: null }), 6000);
  },
  subscribe(f: () => void): () => void {
    oyentes.add(f);
    return () => {
      oyentes.delete(f);
    };
  },
};

export function useJuntos(): JuntosEstado {
  return useSyncExternalStore(juntos.subscribe, juntos.get, juntos.get);
}
