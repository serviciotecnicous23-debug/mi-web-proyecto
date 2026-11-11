/**
 * Las consultas de la portada (los eventos y «Tu día» del miembro) sin cargar shared/routes.ts, que trae zod y el
 * esquema de la base de datos a cada página. Usan las mismas rutas y claves de caché que hooks/use-users.ts y
 * hooks/use-club.ts, así que comparten lo que ya se pidió (la prueba shared/rutas-livianas.test.ts cuida las rutas).
 */
import { useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { RUTAS } from "@shared/rutas-livianas";
import type { ClubSummary } from "@shared/club";

class AuthError extends Error {}

/** Igual que en use-users: si la sesión venció, se borra lo guardado y se avisa. */
function authFetch(url: string, init?: RequestInit): Promise<Response> {
  return fetch(url, { ...init, credentials: "include" }).then((res) => {
    if (res.status === 401) {
      queryClient.setQueryData([RUTAS.auth.me], null);
      queryClient.clear();
      throw new AuthError("Tu sesión ha expirado. Por favor, cierra sesión e inicia sesión nuevamente.");
    }
    return res;
  });
}

/** Zona horaria del lector (igual que en use-club): el servidor la usa para saber qué es "hoy" para él. */
function userTimeZone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "America/Chicago";
  } catch {
    return "America/Chicago";
  }
}

export function useEvents() {
  return useQuery({
    queryKey: [RUTAS.events.list],
    queryFn: async () => {
      const res = await authFetch(RUTAS.events.list, { credentials: "include" });
      if (!res.ok) throw new Error("Error al obtener eventos");
      return res.json();
    },
  });
}

export function useMyEnrollments() {
  return useQuery({
    queryKey: [RUTAS.enrollments.list],
    queryFn: async () => {
      const res = await authFetch(RUTAS.enrollments.list);
      if (!res.ok) throw new Error("Error al obtener inscripciones");
      return res.json();
    },
  });
}

export function useClubSummary(enabled = true) {
  const tz = userTimeZone();
  return useQuery<ClubSummary>({
    queryKey: [RUTAS.club.summary, tz],
    queryFn: async () => {
      const res = await apiRequest("GET", `${RUTAS.club.summary}?tz=${encodeURIComponent(tz)}`);
      return res.json();
    },
    enabled,
    refetchOnWindowFocus: true,
  });
}
