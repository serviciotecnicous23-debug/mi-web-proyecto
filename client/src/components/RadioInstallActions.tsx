import { Download, Share2, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { usePwaInstall } from "@/hooks/use-pwa-install";

type RadioInstallActionsProps = {
  url: string;
  title?: string;
  compact?: boolean;
};

export function RadioInstallActions({
  url,
  title = "Avivando el Fuego Radio",
  compact = false,
}: RadioInstallActionsProps) {
  const { toast } = useToast();
  const { canInstall, isInstalled, install } = usePwaInstall();

  const handleInstall = async () => {
    if (isInstalled) {
      toast({
        title: "Radio instalada",
        description: "La app web ya está abierta en modo instalable.",
      });
      return;
    }

    const outcome = await install();
    if (outcome === "accepted") {
      toast({
        title: "Radio instalada",
        description: "Avivando el Fuego Radio quedo lista en este dispositivo.",
      });
      return;
    }

    if (outcome === "dismissed") return;

    toast({
      title: "Instalar desde el navegador",
      description: "En Android usa Instalar app. En iPhone usa Compartir y luego Agregar a pantalla de inicio.",
      duration: 8000,
    });
  };

  const handleShare = async () => {
    const shareData = {
      title,
      text: "Escucha Avivando el Fuego Radio 24/7.",
      url,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }
      await navigator.clipboard.writeText(url);
      toast({
        title: "Enlace copiado",
        description: "Ya puedes compartir la radio con la congregacion.",
      });
    } catch {
      toast({
        title: "No se pudo compartir",
        description: "Abre el enlace público de la radio y compártelo desde tu navegador.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className={compact ? "flex flex-wrap gap-2" : "flex flex-col gap-2 sm:flex-row"}>
      <Button
        type="button"
        className={compact ? "gap-2" : "gap-2 fire-btn-primary"}
        variant={compact ? "outline" : "default"}
        onClick={handleInstall}
        data-testid="button-install-radio-app"
      >
        {canInstall || isInstalled ? <Download className="h-4 w-4" /> : <Smartphone className="h-4 w-4" />}
        {isInstalled ? "App instalada" : "Instalar app gratis"}
      </Button>
      <Button
        type="button"
        variant="outline"
        className="gap-2"
        onClick={handleShare}
        data-testid="button-share-radio"
      >
        <Share2 className="h-4 w-4" />
        Compartir radio
      </Button>
    </div>
  );
}
