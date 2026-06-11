import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/hooks/use-auth";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Flame, Users, BookOpen, Heart } from "lucide-react";
import { LogoIcon } from "@/components/LogoIcon";
import { ROLES, MINISTRY_COUNTRIES } from "@shared/schema";

const loginSchema = z.object({
  username: z.string().min(1, "El usuario es requerido"),
  password: z.string().min(1, "La contrasena es requerida"),
});

export function LoginPage() {
  const { login, isLoggingIn, user } = useAuth();
  const [, setLocation] = useLocation();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  // Redireccion segura: fuera del render para no romper los hooks de React.
  useEffect(() => {
    if (user) setLocation("/");
  }, [user, setLocation]);

  if (user) return null;

  function onSubmit(data: z.infer<typeof loginSchema>) {
    login(data);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <LogoIcon className="w-10 h-10 mx-auto mb-2" />
          <CardTitle className="text-2xl font-bold" data-testid="text-login-title">Iniciar Sesion</CardTitle>
          <CardDescription>Ingresa tus credenciales para acceder</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Usuario</FormLabel>
                    <FormControl>
                      <Input placeholder="Tu usuario" {...field} data-testid="input-username" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contrasena</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Tu contrasena" {...field} data-testid="input-password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoggingIn} data-testid="button-login">
                {isLoggingIn ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Ingresar
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 text-center text-sm text-muted-foreground">
          <Link href="/forgot-password" className="text-xs text-primary hover:underline">
            Olvidaste tu contrasena?
          </Link>
          <div>
            No tienes cuenta?{" "}
            <Link href="/registro" className="text-primary hover:underline font-medium" data-testid="link-to-register">
              Registrate
            </Link>
          </div>
          <Link href="/" className="text-xs hover:text-foreground">
            Volver al Inicio
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

const registerSchema = z.object({
  username: z.string().min(3, "Minimo 3 caracteres"),
  password: z.string().min(6, "Minimo 6 caracteres"),
  displayName: z.string().min(1, "Nombre requerido"),
  role: z.string().default("miembro"),
  country: z.string().optional(),
  phone: z.string().min(7, "Telefono requerido"),
  email: z.string().email("Correo electronico invalido"),
});

const roleDescriptions: Record<string, { icon: any; desc: string }> = {
  miembro: { icon: Heart, desc: "Miembro del ministerio con acceso completo" },
  usuario: { icon: Users, desc: "Acceso a recursos sin ser miembro oficial" },
  obrero: { icon: BookOpen, desc: "Maestro o lider con experiencia ministerial" },
};

export function RegisterPage() {
  const { register, isRegistering, user } = useAuth();
  const [, setLocation] = useLocation();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: { username: "", password: "", displayName: "", role: "miembro", country: "", phone: "", email: "" },
  });

  // Redireccion segura: fuera del render para no romper los hooks de React.
  useEffect(() => {
    if (user) setLocation("/");
  }, [user, setLocation]);

  if (user) return null;

  async function onSubmit(data: z.infer<typeof registerSchema>) {
    try {
      await register(data);
    } catch (e) {}
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <LogoIcon className="w-10 h-10 mx-auto mb-2" />
          <CardTitle className="text-2xl font-bold" data-testid="text-register-title">Unirse al Ministerio</CardTitle>
          <CardDescription>Crea tu cuenta para ser parte de Avivando el Fuego</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="displayName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre Completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Tu nombre" {...field} data-testid="input-display-name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Usuario</FormLabel>
                    <FormControl>
                      <Input placeholder="Elige un usuario" {...field} data-testid="input-username" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contrasena</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Minimo 6 caracteres" {...field} data-testid="input-password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Registro</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-role">
                          <SelectValue placeholder="Selecciona tu rol" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="miembro" data-testid="option-miembro">
                          {ROLES.miembro}
                        </SelectItem>
                        <SelectItem value="usuario" data-testid="option-usuario">
                          {ROLES.usuario}
                        </SelectItem>
                        <SelectItem value="obrero" data-testid="option-obrero">
                          {ROLES.obrero}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      {roleDescriptions[field.value]?.desc || "Selecciona como deseas participar"}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo Electronico</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="tu@correo.com" {...field} data-testid="input-email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefono</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="+1 234 567 8900" {...field} data-testid="input-phone" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pais</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-country">
                          <SelectValue placeholder="Selecciona tu pais" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {MINISTRY_COUNTRIES.map(c => (
                          <SelectItem key={c} value={c} data-testid={`option-country-${c}`}>{c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isRegistering} data-testid="button-register">
                {isRegistering ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Crear Cuenta
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 text-center text-sm text-muted-foreground">
          <div>
            Ya tienes cuenta?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium" data-testid="link-to-login">
              Inicia sesion
            </Link>
          </div>
          <Link href="/" className="text-xs hover:text-foreground">
            Volver al Inicio
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
