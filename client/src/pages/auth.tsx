import { useEffect, useState, forwardRef, type ComponentProps } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/hooks/use-auth";
import { useLocation, Link } from "wouter";
import { postLoginPath } from "@/lib/login-redirect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Loader2, Users, BookOpen, Heart, Eye, EyeOff } from "lucide-react";
import { LogoIcon } from "@/components/LogoIcon";
import { ROLES, MINISTRY_COUNTRIES } from "@shared/schema";

// Campo de contraseña con botón para mostrarla. El botón no envía el formulario
// (type="button") y se anuncia a los lectores de pantalla.
const PasswordInput = forwardRef<HTMLInputElement, ComponentProps<typeof Input>>(
  function PasswordInput(props, ref) {
    const [visible, setVisible] = useState(false);
    return (
      <div className="relative">
        <Input ref={ref} {...props} type={visible ? "text" : "password"} className="pr-10" />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
          aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
          title={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
          data-testid="button-toggle-password"
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    );
  },
);

const loginSchema = z.object({
  username: z.string().trim().min(1, "Escribe tu usuario"),
  password: z.string().min(1, "Escribe tu contraseña"),
  remember: z.boolean(),
});

export function LoginPage() {
  const { login, isLoggingIn, user } = useAuth();
  const [, setLocation] = useLocation();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "", remember: true },
  });

  // Redirección segura: fuera del render para no romper los hooks de React.
  // Vuelve a la página de la que vino (?redirect=), si era de la propia web.
  useEffect(() => {
    if (user) setLocation(postLoginPath());
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
          <CardTitle className="text-2xl font-bold" data-testid="text-login-title">Iniciar sesión</CardTitle>
          <CardDescription>Ingresa tus datos para acceder</CardDescription>
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
                      <Input
                        placeholder="Tu usuario"
                        autoComplete="username"
                        autoCapitalize="none"
                        spellCheck={false}
                        {...field}
                        data-testid="input-username"
                      />
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
                    <div className="flex items-center justify-between">
                      <FormLabel>Contraseña</FormLabel>
                      <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                        ¿Olvidaste tu contraseña?
                      </Link>
                    </div>
                    <FormControl>
                      <PasswordInput
                        placeholder="Tu contraseña"
                        autoComplete="current-password"
                        {...field}
                        data-testid="input-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="remember"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(v) => field.onChange(v === true)}
                        data-testid="checkbox-remember"
                      />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">
                      Recordarme en este dispositivo
                    </FormLabel>
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
          <div>
            ¿No tienes cuenta?{" "}
            <Link href="/registro" className="text-primary hover:underline font-medium" data-testid="link-to-register">
              Regístrate
            </Link>
          </div>
          <Link href="/" className="text-xs hover:text-foreground">
            Volver al inicio
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

const registerSchema = z.object({
  username: z.string().trim().min(3, "Mínimo 3 caracteres"),
  password: z.string().min(8, "Mínimo 8 caracteres"),
  displayName: z.string().trim().min(1, "Escribe tu nombre"),
  role: z.string().default("miembro"),
  country: z.string().optional(),
  phone: z.string().trim().min(7, "Escribe tu teléfono"),
  email: z.string().trim().email("Correo electrónico no válido"),
});

const roleDescriptions: Record<string, { icon: any; desc: string }> = {
  miembro: { icon: Heart, desc: "Miembro del ministerio con acceso completo" },
  usuario: { icon: Users, desc: "Acceso a recursos sin ser miembro oficial" },
  obrero: { icon: BookOpen, desc: "Maestro o líder con experiencia ministerial" },
};

export function RegisterPage() {
  const { register, isRegistering, user } = useAuth();
  const [, setLocation] = useLocation();

  const form = useForm<z.input<typeof registerSchema>, unknown, z.output<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: { username: "", password: "", displayName: "", role: "miembro", country: "", phone: "", email: "" },
  });

  // Redirección segura: fuera del render para no romper los hooks de React.
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
                    <FormLabel>Nombre completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Tu nombre" autoComplete="name" {...field} data-testid="input-display-name" />
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
                      <Input
                        placeholder="Elige un usuario"
                        autoComplete="username"
                        autoCapitalize="none"
                        spellCheck={false}
                        {...field}
                        data-testid="input-username"
                      />
                    </FormControl>
                    <FormDescription>Con este usuario entrarás a la web.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="Mínimo 8 caracteres"
                        autoComplete="new-password"
                        {...field}
                        data-testid="input-password"
                      />
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
                    <FormLabel>Tipo de registro</FormLabel>
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
                      {roleDescriptions[field.value ?? ""]?.desc || "Selecciona cómo deseas participar"}
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
                    <FormLabel>Correo electrónico</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="tu@correo.com" autoComplete="email" {...field} data-testid="input-email" />
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
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="+1 234 567 8900" autoComplete="tel" {...field} data-testid="input-phone" />
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
                    <FormLabel>País</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-country">
                          <SelectValue placeholder="Selecciona tu país" />
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
                Crear cuenta
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 text-center text-sm text-muted-foreground">
          <div>
            ¿Ya tienes cuenta?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium" data-testid="link-to-login">
              Inicia sesión
            </Link>
          </div>
          <Link href="/" className="text-xs hover:text-foreground">
            Volver al inicio
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
