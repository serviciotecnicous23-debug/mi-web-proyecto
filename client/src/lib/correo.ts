// Si la web puede mandar correos (la clave de Resend está puesta en el servidor). Sin ella, «Olvidé mi contraseña» y el
// aviso «Enviar verificación» prometían un correo que nunca salía: ahora ofrecen Contacto (server/routes.ts, /api/correo).
import { useQuery } from "@tanstack/react-query";

export function useCorreoActivo(): boolean | undefined {
  const { data } = useQuery<{ activo: boolean }>({
    queryKey: ["/api/correo"],
    queryFn: async () => {
      const r = await fetch("/api/correo");
      return r.ok ? r.json() : { activo: true };
    },
    staleTime: 10 * 60 * 1000,
    retry: false,
  });
  return data?.activo;
}
