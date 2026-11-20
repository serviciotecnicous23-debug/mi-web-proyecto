// El título de la pestaña en cada página de la academia (revisión del 20-nov-2026). Antes todas decían el título general
// de la web: ahora cada una dice lo que es, para el lector de pantalla, el historial, los marcadores y los buscadores.
// No importa @shared/academia (es liviano: lo usan todas las páginas).
import { useEffect } from "react";

export const TITULO_ACADEMIA = "Academia Avivando el Fuego";

/** «Lo que es · Academia Avivando el Fuego» (sin título, el de la academia). Al salir deja el título de antes. */
export function tituloAcademia(titulo?: string | null): string {
  const t = titulo?.trim();
  return t ? `${t} · ${TITULO_ACADEMIA}` : TITULO_ACADEMIA;
}

export function useTituloAcademia(titulo?: string | null): void {
  useEffect(() => {
    const antes = document.title;
    document.title = tituloAcademia(titulo);
    return () => {
      document.title = antes;
    };
  }, [titulo]);
}
