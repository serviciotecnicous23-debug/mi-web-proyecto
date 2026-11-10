import { useQuery, useMutation, useQueryClient, type QueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { type InsertUser } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { enLaRadio } from "@/lib/incrustado";

/**
 * Dentro de la radio: ¿el navegador guardó la sesión? Si la radio está en otro sitio (su dirección
 * antigua) o el navegador bloquea las cookies del marco, la cuenta no quedaría guardada y el juego
 * cargaría sin avance ni Jerusalén en línea: se avisa en vez de mostrar una sesión que no existe.
 */
async function comprobarSesionEnLaRadio(queryClient: QueryClient, toast: ReturnType<typeof useToast>["toast"]) {
  if (!enLaRadio()) return;
  try {
    const res = await fetch(api.auth.me.path, { credentials: "include", cache: "no-store" });
    if (res.status !== 401) return;
  } catch {
    return;
  }
  queryClient.setQueryData([api.auth.me.path], null);
  toast({
    title: "Tu navegador no guardó la sesión aquí",
    description: "Abre los juegos desde la radio oficial (radio.ministerioavivandoelfuego.com) o desde la web del ministerio: ahí sí se guardan tu cuenta y tu avance.",
    variant: "destructive",
    duration: 12000,
  });
}

export function useAuth() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: user, isLoading, error } = useQuery({
    queryKey: [api.auth.me.path],
    queryFn: async () => {
      const res = await fetch(api.auth.me.path, { credentials: "include" });
      if (res.status === 401) return null;
      if (!res.ok) throw new Error("Error al obtener usuario");
      return res.json();
    },
    retry: false,
  });

  const loginMutation = useMutation({
    // remember=false: la sesión dura hasta cerrar el navegador.
    mutationFn: async (credentials: { username: string; password: string; remember?: boolean }) => {
      const res = await fetch(api.auth.login.path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
        credentials: "include",
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || "Error al iniciar sesión");
      }
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData([api.auth.me.path], data);
      toast({ title: "¡Bienvenido!", description: `Sesión iniciada como ${data.username}` });
      void comprobarSesionEnLaRadio(queryClient, toast);
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: Partial<InsertUser> & { username: string; password: string }) => {
      const res = await fetch(api.auth.register.path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      const responseData = await res.json();
      if (!res.ok) {
        throw new Error(responseData.message || "Error en el registro");
      }
      return responseData;
    },
    onSuccess: (data) => {
      queryClient.setQueryData([api.auth.me.path], data);
      if (data.pending) {
        toast({
          title: "Registro exitoso",
          description: data.email
            ? "Te enviamos un correo de verificación. Revisa tu bandeja de entrada y spam."
            : "Tu cuenta fue creada. Un administrador la activara para acceso completo.",
          duration: 8000,
        });
      } else {
        toast({ title: "Bienvenido!", description: "Cuenta creada exitosamente" });
      }
      void comprobarSesionEnLaRadio(queryClient, toast);
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(api.auth.logout.path, { method: "POST", credentials: "include" });
      if (!res.ok) throw new Error("Error al cerrar sesión");
    },
    onSuccess: () => {
      queryClient.setQueryData([api.auth.me.path], null);
      queryClient.clear();
      toast({ title: "Hasta pronto", description: "Sesión cerrada" });
    },
  });

  return {
    user,
    isLoading,
    error,
    login: loginMutation.mutate,
    register: registerMutation.mutateAsync,
    logout: logoutMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    registerData: registerMutation.data,
  };
}
