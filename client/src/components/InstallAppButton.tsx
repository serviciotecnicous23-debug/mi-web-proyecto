import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { usePwaInstall } from "@/hooks/use-pwa-install";

/**
 * "Instalar la app" para el menú lateral. Si ya está instalada (se abre como app), no
 * se muestra. En Android y en escritorio usa el aviso de instalación del navegador; en
 * iPhone (que no lo tiene) explica los dos toques de Safari.
 */
export function InstallAppButton({ onDone }: { onDone?: () => void }) {
  const { toast } = useToast();
  const { isInstalled, install } = usePwaInstall();

  if (isInstalled) return null;

  const handleInstall = async () => {
    const outcome = await install();
    if (outcome === "accepted") {
      toast({ title: "App instalada", description: "Avivando el Fuego quedó en tu pantalla de inicio." });
      onDone?.();
      return;
    }
    if (outcome === "dismissed") return;
    const iPhone = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    toast({
      title: "Instalar la app",
      description: iPhone
        ? "En Safari, toca Compartir (el cuadro con la flecha) y luego «Añadir a pantalla de inicio»."
        : "Abre el menú del navegador (⋮) y elige «Instalar app» o «Añadir a pantalla de inicio».",
      duration: 9000,
    });
  };

  return (
    <Button className="w-full justify-start gap-3 fire-btn-primary" size="sm" onClick={handleInstall} data-testid="button-install-app">
      <Download className="w-4 h-4" aria-hidden="true" /> Instalar la app
    </Button>
  );
}
