import { Layout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <Layout>
      <div className="flex-1 flex items-center justify-center py-20">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="h-12 w-12 text-primary mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2" data-testid="text-404">Página no encontrada</h1>
            <p className="text-sm text-muted-foreground mb-6">
              La página que buscas no existe o ha sido movida.
            </p>
            <Link href="/">
              <Button data-testid="button-go-home">Volver al Inicio</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
