import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Flag, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { MOTIVOS_DE_DENUNCIA, type MotivoDeDenuncia, type TipoDenunciable } from "@shared/reports";

/**
 * "Denunciar" para lo que publican otras personas (Comunidad, comentarios, muro de oración).
 * La denuncia llega a la administración (panel → Denuncias). Ver server/reports.ts.
 */
export function ReportButton({
  contentType,
  contentId,
  className = "",
}: {
  contentType: TipoDenunciable;
  contentId: number;
  className?: string;
}) {
  const [abierto, setAbierto] = useState(false);
  const [motivo, setMotivo] = useState<MotivoDeDenuncia | "">("");
  const [detalles, setDetalles] = useState("");
  const { toast } = useToast();

  const enviar = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ contentType, contentId, reason: motivo, details: detalles.trim() || undefined }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "No se pudo enviar la denuncia.");
      return data;
    },
    onSuccess: () => {
      setAbierto(false);
      setMotivo("");
      setDetalles("");
      toast({ title: "Gracias por avisarnos", description: "Un líder del ministerio lo revisará pronto." });
    },
    onError: (err: Error) => toast({ title: "No se envió la denuncia", description: err.message, variant: "destructive" }),
  });

  return (
    <>
      <button
        type="button"
        className={`inline-flex items-center gap-1 text-muted-foreground hover:text-destructive ${className}`}
        onClick={() => setAbierto(true)}
        data-testid={`button-report-${contentType}-${contentId}`}
        aria-label="Denunciar este contenido"
      >
        <Flag className="h-3 w-3" aria-hidden="true" />
        Denunciar
      </button>

      <Dialog open={abierto} onOpenChange={setAbierto}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Denunciar contenido</DialogTitle>
            <DialogDescription>
              Cuéntanos qué pasa. Solo lo verá la administración del ministerio; la persona no sabrá quién la denunció.
            </DialogDescription>
          </DialogHeader>
          <RadioGroup value={motivo} onValueChange={(v) => setMotivo(v as MotivoDeDenuncia)} className="gap-2 py-1">
            {(Object.entries(MOTIVOS_DE_DENUNCIA) as [MotivoDeDenuncia, string][]).map(([clave, texto]) => (
              <Label
                key={clave}
                htmlFor={`motivo-${contentType}-${contentId}-${clave}`}
                className="flex items-center gap-3 rounded-md border px-3 py-2.5 font-normal cursor-pointer hover:bg-muted/50"
              >
                <RadioGroupItem value={clave} id={`motivo-${contentType}-${contentId}-${clave}`} data-testid={`radio-motivo-${clave}`} />
                {texto}
              </Label>
            ))}
          </RadioGroup>
          <Textarea
            placeholder="Detalles (opcional)"
            value={detalles}
            maxLength={500}
            onChange={(e) => setDetalles(e.target.value)}
            className="min-h-20"
            data-testid="input-report-details"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setAbierto(false)}>Cancelar</Button>
            <Button variant="destructive" disabled={!motivo || enviar.isPending} onClick={() => enviar.mutate()} data-testid="button-send-report">
              {enviar.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Flag className="mr-2 h-4 w-4" />}
              Enviar denuncia
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
