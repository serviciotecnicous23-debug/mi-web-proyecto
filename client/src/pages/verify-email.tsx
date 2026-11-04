import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, CheckCircle, XCircle, ArrowLeft } from "lucide-react";

export default function VerifyEmailPage() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error" | "no-token">(
    token ? "loading" : "no-token"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) return;

    (async () => {
      try {
        const res = await fetch("/api/verify-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        const data = await res.json();
        if (res.ok) {
          setStatus("success");
          setMessage(data.message || "Correo verificado!");
        } else {
          setStatus("error");
          setMessage(data.message || "Error de verificacion");
        }
      } catch {
        setStatus("error");
        setMessage("Error de conexion. Intenta nuevamente.");
      }
    })();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6 text-center">
          {status === "loading" && (
            <>
              <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2">Verificando...</h2>
              <p className="text-muted-foreground">Estamos verificando tu correo electrónico</p>
            </>
          )}

          {status === "success" && (
            <>
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2">Verificado!</h2>
              <p className="text-muted-foreground mb-4">{message}</p>
              <Link href="/login">
                <Button className="gap-2">
                  <ArrowLeft className="w-4 h-4" /> Iniciar Sesion
                </Button>
              </Link>
            </>
          )}

          {status === "error" && (
            <>
              <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2">Error</h2>
              <p className="text-muted-foreground mb-4">{message}</p>
              <div className="flex flex-col gap-2">
                <Link href="/login">
                  <Button variant="outline" className="gap-2 w-full">
                    <ArrowLeft className="w-4 h-4" /> Ir al Login
                  </Button>
                </Link>
              </div>
            </>
          )}

          {status === "no-token" && (
            <>
              <XCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2">Enlace Inválido</h2>
              <p className="text-muted-foreground mb-4">
                El enlace de verificación no es válido. Revisa tu correo o solicita uno nuevo.
              </p>
              <Link href="/login">
                <Button variant="outline" className="gap-2">
                  <ArrowLeft className="w-4 h-4" /> Ir al Login
                </Button>
              </Link>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
