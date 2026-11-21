import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Flame, Loader2, CheckCircle, ArrowLeft } from "lucide-react";
import { LogoIcon } from "@/components/LogoIcon";
import { useToast } from "@/hooks/use-toast";
import { useCorreoActivo } from "@/lib/correo";

const forgotSchema = z.object({
  email: z.string().email("Correo electrónico inválido"),
});

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const correoActivo = useCorreoActivo();

  const form = useForm<z.infer<typeof forgotSchema>>({
    resolver: zodResolver(forgotSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(data: z.infer<typeof forgotSchema>) {
    setLoading(true);
    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.message || "Error al enviar solicitud");
      }
      setSent(true);
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Error al enviar solicitud",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Revisa tu correo</h2>
            <p className="text-muted-foreground mb-4">
              Si la cuenta existe, enviaremos instrucciones para restablecer tu contraseña.
            </p>
            <Link href="/login">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" /> Volver al Login
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <LogoIcon className="w-10 h-10 mx-auto mb-2" />
          <CardTitle className="text-2xl font-bold">Olvidé mi contraseña</CardTitle>
          <CardDescription>
            {correoActivo === false
              ? "Por ahora la web no puede enviar correos."
              : "Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {correoActivo === false ? (
            <div className="space-y-4 text-center" data-testid="olvide-sin-correo">
              <p className="text-sm text-muted-foreground">
                Escríbenos en Contacto con tu nombre de usuario y el correo de tu cuenta, y te ayudamos a entrar de nuevo.
              </p>
              <Link href="/contacto?asunto=otro">
                <Button className="w-full">Escribir en Contacto</Button>
              </Link>
            </div>
          ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo Electrónico</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="tu@correo.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Enviar Enlace
              </Button>
            </form>
          </Form>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-2 text-center text-sm text-muted-foreground">
          <Link href="/login" className="text-primary hover:underline font-medium">
            Volver al Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
