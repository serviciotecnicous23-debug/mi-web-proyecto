// ¿Se ve la Academia? Mientras está en vista previa, solo para los roles de ROLES_VISTA_PREVIA; cuando Luis la abre
// (site_content.academia_abierta, GET /api/academia/abierta), para todos. Lo usan el menú, la barra de la app, Inicio y
// Capacitaciones, que están en todas partes: por eso no importa el catálogo de la academia.
import { useQuery } from "@tanstack/react-query";
import { veVistaPrevia } from "@shared/academia-acceso";
import { useAuth } from "@/hooks/use-auth";

export function useAcademiaVisible(): boolean {
  const { user } = useAuth();
  const vistaPrevia = !!user?.isActive && veVistaPrevia(user.role);
  const { data } = useQuery<{ abierta: boolean }>({
    queryKey: ["/api/academia/abierta"],
    queryFn: async () => {
      const r = await fetch("/api/academia/abierta", { credentials: "include" });
      return r.ok ? ((await r.json()) as { abierta: boolean }) : { abierta: false };
    },
    staleTime: 5 * 60_000,
    retry: false,
    enabled: !vistaPrevia,
  });
  return vistaPrevia || !!data?.abierta;
}
