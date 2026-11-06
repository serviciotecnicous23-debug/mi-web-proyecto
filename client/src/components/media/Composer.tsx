import { useEffect, useRef, useState } from "react";
import { Paperclip, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { extractUrls } from "@shared/media";
import { ACCEPT_ALL, uploadFile, type UploadedFile } from "./upload";
import { FileAttachment } from "./FileAttachment";
import { LinkEmbed } from "./LinkEmbed";

/** Botón "Archivo" con barra de progreso: PDF, Word, Excel, PowerPoint, fotos, audio, video. */
export function AttachButton({
  onUploaded,
  accept = ACCEPT_ALL,
  folder,
  label = "Archivo",
  disabled,
  size = "sm",
  variant = "outline",
  testId = "button-attach-file",
}: {
  onUploaded: (file: UploadedFile) => void;
  accept?: string;
  folder?: string;
  label?: string;
  disabled?: boolean;
  size?: "sm" | "default";
  variant?: "outline" | "ghost" | "secondary";
  testId?: string;
}) {
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState<number | null>(null);

  async function pick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setProgress(0);
    try {
      const uploaded = await uploadFile(file, { folder, onProgress: setProgress });
      onUploaded(uploaded);
    } catch (err) {
      toast({ title: "No se pudo subir", description: (err as Error).message, variant: "destructive" });
    } finally {
      setProgress(null);
    }
  }

  const busy = progress != null;
  return (
    <>
      <Button type="button" variant={variant} size={size} onClick={() => inputRef.current?.click()} disabled={disabled || busy} data-testid={testId}>
        {busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Paperclip className="mr-2 h-4 w-4" />}
        {busy ? `Subiendo ${Math.round((progress || 0) * 100)}%` : label}
      </Button>
      <input ref={inputRef} type="file" accept={accept} className="hidden" onChange={pick} />
    </>
  );
}

/** El archivo elegido, antes de publicar, con una X para quitarlo. */
export function AttachedFile({ file, onRemove }: { file: UploadedFile; onRemove: () => void }) {
  return (
    <div className="relative mt-2">
      <FileAttachment url={file.url} name={file.fileName} size={file.fileSize} mime={file.mimeType} fileType={file.fileType} compact />
      <button type="button" onClick={onRemove} className="composer-remove" aria-label="Quitar el archivo" title="Quitar el archivo">
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

/**
 * Vista previa del primer enlace que se escribe o pega (YouTube, Instagram, TikTok...):
 * así la persona ve cómo quedará antes de publicar.
 */
export function LinkDraftPreview({ text }: { text: string }) {
  const [url, setUrl] = useState<string | null>(null);
  const [hidden, setHidden] = useState<string | null>(null);
  // Espera a que se termine de escribir el enlace.
  useEffect(() => {
    const t = setTimeout(() => setUrl(extractUrls(text, 1)[0] || null), 450);
    return () => clearTimeout(t);
  }, [text]);
  if (!url || hidden === url) return null;
  return (
    <div className="composer-preview">
      <p className="composer-preview__label">Así se verá:</p>
      <LinkEmbed url={url} compact />
      <button type="button" onClick={() => setHidden(url)} className="composer-remove" aria-label="Ocultar la vista previa" title="Ocultar la vista previa">
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
