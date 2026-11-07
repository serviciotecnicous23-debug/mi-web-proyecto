import { Radio, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type RadioInstallActionsProps = {
  /** Enlace oficial y propio de la radio (RADIO_OFFICIAL_URL), no el del ministerio. */
  url: string;
  title?: string;
  compact?: boolean;
};

/**
 * Botones de la radio en la web del ministerio. La radio es una casa aparte, con su propio
 * enlace: "Instalar la radio" abre su página (allí está su botón "Instalar app") y
 * "Compartir la radio" manda ese enlace. Antes ambos llevaban a la app del ministerio.
 */
export function RadioInstallActions({
  url,
  title = "Avivando el Fuego Radio",
  compact = false,
}: RadioInstallActionsProps) {
  const { toast } = useToast();

  const handleOpen = () => {
    toast({
      title: "Se abre la página de la radio",
      description: "Allí toca «Instalar app» y te queda la radio en tu pantalla de inicio.",
      duration: 7000,
    });
  };

  const handleShare = async () => {
    const shareData = {
      title,
      text: "Escucha Avivando el Fuego Radio en vivo, las 24 horas.",
      url,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }
      await navigator.clipboard.writeText(url);
      toast({
        title: "Enlace de la radio copiado",
        description: `${url.replace(/^https?:\/\//, "")} · Pégalo en WhatsApp o donde quieras.`,
      });
    } catch (err) {
      if ((err as Error)?.name === "AbortError") return;
      toast({
        title: "No se pudo compartir",
        description: `Comparte este enlace: ${url.replace(/^https?:\/\//, "")}`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className={compact ? "flex flex-wrap gap-2" : "flex flex-col gap-2 sm:flex-row"}>
      <Button
        asChild
        className={compact ? "gap-2" : "gap-2 fire-btn-primary"}
        variant={compact ? "outline" : "default"}
        data-testid="button-install-radio-app"
      >
        <a href={url} target="_blank" rel="noopener" onClick={handleOpen}>
          <Radio className="h-4 w-4" />
          Instalar la radio
        </a>
      </Button>
      <Button
        type="button"
        variant="outline"
        className="gap-2"
        onClick={handleShare}
        data-testid="button-share-radio"
      >
        <Share2 className="h-4 w-4" />
        Compartir la radio
      </Button>
    </div>
  );
}
