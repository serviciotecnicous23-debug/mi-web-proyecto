import { useState } from "react";
import { Download, Eye } from "lucide-react";
import { dataUrlMime, fileExtension, fileTypeOf, type FileType } from "@shared/media";
import { FILE_BRAND, FileTypeIcon, fileTypeLabel, formatBytes } from "./brand";
import { downloadFile } from "./file-bytes";
import { FileViewerDialog } from "./FileViewer";
import { announcePlay } from "./player-store";

function nameFromUrl(url: string) {
  if (url.startsWith("data:")) return "archivo";
  try {
    return decodeURIComponent(new URL(url, window.location.origin).pathname.split("/").pop() || "archivo");
  } catch {
    return "archivo";
  }
}

/**
 * Un archivo adjunto (estudio, tarea, material, apuntes...): se ve aquí mismo.
 * Audio y video traen su reproductor; las fotos se ven en grande; los documentos se abren
 * en el visor (PDF, Word, Excel, PowerPoint, texto) y siempre se pueden descargar.
 */
export function FileAttachment({
  url, name, size, mime, fileType, compact, className = "",
}: {
  url: string;
  name?: string | null;
  size?: number | null;
  mime?: string | null;
  fileType?: FileType;
  compact?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  if (!url || url === "uploaded") return null;
  const realName = name || nameFromUrl(url);
  const type = fileType || fileTypeOf(realName, mime || (url.startsWith("data:") ? dataUrlMime(url) : ""));
  const brand = FILE_BRAND[type];
  const meta = [fileTypeLabel(type), formatBytes(size)].filter(Boolean).join(" · ");
  const viewer = open && <FileViewerDialog open={open} onOpenChange={setOpen} source={{ mode: "file", url, name: realName, fileType: type, mime, size }} />;

  if (type === "image") {
    return (
      <div className={`file-att file-att--image ${className}`}>
        <button type="button" onClick={() => setOpen(true)} aria-label={`Ver ${realName}`}>
          <img src={url} alt={realName} loading="lazy" />
        </button>
        {viewer}
      </div>
    );
  }

  if (type === "audio") {
    return (
      <div className={`file-att file-att--audio ${className}`} data-testid="file-attachment">
        <div className="file-att__row">
          <span className="file-att__tile" style={{ ["--tile" as string]: brand.color }}><FileTypeIcon type="audio" className="h-5 w-5" /></span>
          <span className="min-w-0 flex-1">
            <span className="file-att__name" title={realName}>{realName}</span>
            <span className="file-att__meta">{meta}</span>
          </span>
          <button type="button" className="file-att__icon" onClick={() => downloadFile(url, realName)} aria-label={`Descargar ${realName}`} title="Descargar"><Download className="h-4 w-4" /></button>
        </div>
        <audio src={url} controls preload="metadata" className="file-att__audio" onPlay={() => announcePlay(url)} />
      </div>
    );
  }

  if (type === "video") {
    return (
      <div className={`file-att file-att--video ${className}`} data-testid="file-attachment">
        <video src={url} controls playsInline preload="metadata" className="file-att__video" onPlay={() => announcePlay(url)} />
        <div className="file-att__row">
          <span className="min-w-0 flex-1">
            <span className="file-att__name" title={realName}>{realName}</span>
            <span className="file-att__meta">{meta}</span>
          </span>
          <button type="button" className="file-att__icon" onClick={() => downloadFile(url, realName)} aria-label={`Descargar ${realName}`} title="Descargar"><Download className="h-4 w-4" /></button>
        </div>
      </div>
    );
  }

  const ext = fileExtension(realName).toUpperCase();
  return (
    <div className={`file-att ${compact ? "file-att--compact" : ""} ${className}`} data-testid="file-attachment">
      <button type="button" className="file-att__main" onClick={() => setOpen(true)} aria-label={`Ver ${realName}`}>
        <span className="file-att__tile" style={{ ["--tile" as string]: brand.color }}>
          <FileTypeIcon type={type} className="h-5 w-5" />
          <span className="file-att__ext">{ext || brand.tag}</span>
        </span>
        <span className="min-w-0 flex-1 text-left">
          <span className="file-att__name" title={realName}>{realName}</span>
          <span className="file-att__meta">{meta} · Toca para verlo</span>
        </span>
        <Eye className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
      </button>
      <button type="button" className="file-att__icon" onClick={() => downloadFile(url, realName)} aria-label={`Descargar ${realName}`} title="Descargar">
        <Download className="h-4 w-4" />
      </button>
      {viewer}
    </div>
  );
}
