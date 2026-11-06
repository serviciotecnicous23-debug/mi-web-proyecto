import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Download, ExternalLink, Loader2, X, ZoomIn } from "lucide-react";
import { classifyUrl, dataUrlMime, fileExtension, fileTypeOf, type FileType, type MediaProvider } from "@shared/media";
import { FileTypeIcon, PROVIDER_BRAND, fileTypeLabel, formatBytes } from "./brand";
import { canUseOfficeViewer, downloadFile, googleViewerUrl, loadText, officeViewerUrl } from "./file-bytes";
import { announcePlay } from "./player-store";

const PdfPages = lazy(() => import("./viewers/PdfPages"));
const DocxView = lazy(() => import("./viewers/DocxView"));
const SheetView = lazy(() => import("./viewers/SheetView"));

export type ViewerSource =
  | { mode: "embed"; src: string; title: string; url: string; provider: MediaProvider }
  | { mode: "file"; url: string; name?: string | null; fileType?: FileType; mime?: string | null; size?: number | null };

function Loading({ text = "Abriendo…" }: { text?: string }) {
  return (
    <div className="viewer__loading">
      <Loader2 className="h-6 w-6 animate-spin" aria-hidden="true" /> {text}
    </div>
  );
}

function TextView({ url, onError }: { url: string; onError: (m: string) => void }) {
  const [text, setText] = useState<string | null>(null);
  useEffect(() => {
    let alive = true;
    loadText(url).then((t) => alive && setText(t.slice(0, 400_000))).catch(() => alive && onError("No se pudo abrir el texto."));
    return () => {
      alive = false;
    };
  }, [url, onError]);
  if (text == null) return <Loading />;
  return <pre className="text-view">{text}</pre>;
}

function ImageView({ url, name }: { url: string; name: string }) {
  const [zoomed, setZoomed] = useState(false);
  return (
    <div className={`image-view ${zoomed ? "image-view--zoomed" : ""}`}>
      <button type="button" onClick={() => setZoomed((z) => !z)} aria-label={zoomed ? "Ver la imagen completa" : "Acercar la imagen"}>
        <img src={url} alt={name} />
      </button>
      {!zoomed && (
        <span className="image-view__hint">
          <ZoomIn className="h-3.5 w-3.5" aria-hidden="true" /> Toca para acercar
        </span>
      )}
    </div>
  );
}

function Notice({ children, url, name }: { children: React.ReactNode; url: string; name: string }) {
  return (
    <div className="viewer__notice-box">
      <p>{children}</p>
      <button type="button" className="viewer__btn viewer__btn--primary" onClick={() => downloadFile(url, name)}>
        <Download className="h-4 w-4" aria-hidden="true" /> Descargar el archivo
      </button>
    </div>
  );
}

/** El contenido según el tipo de archivo. */
function FileBody({ url, name, type, ext }: { url: string; name: string; type: FileType; ext: string }) {
  const [error, setError] = useState<string | null>(null);
  const onError = useCallback((m: string) => setError(m), []);
  const external = /^https?:\/\//i.test(url) && !url.startsWith(window.location.origin);

  useEffect(() => {
    if (type === "audio" || type === "video") announcePlay(`viewer:${url}`);
  }, [type, url]);

  if (error) {
    // Plan B: el visor de Office (Word, Excel, PowerPoint) o el de Google (documentos de otras webs).
    if (canUseOfficeViewer(url) && (type === "word" || type === "excel" || type === "powerpoint")) {
      return <iframe className="viewer__frame" src={officeViewerUrl(url)} title={name} />;
    }
    if (external && (type === "pdf" || type === "word")) {
      return <iframe className="viewer__frame" src={googleViewerUrl(url)} title={name} />;
    }
    return <Notice url={url} name={name}>{error}</Notice>;
  }

  switch (type) {
    case "image":
      return <ImageView url={url} name={name} />;
    case "video":
      return <video className="viewer__video" src={url} controls autoPlay playsInline preload="metadata" />;
    case "audio":
      return (
        <div className="viewer__audio">
          <FileTypeIcon type="audio" className="h-14 w-14" />
          <p className="viewer__audio-name">{name}</p>
          <audio src={url} controls autoPlay preload="metadata" className="w-full" />
        </div>
      );
    case "pdf":
      if (external) return <iframe className="viewer__frame" src={googleViewerUrl(url)} title={name} />;
      return <Suspense fallback={<Loading text="Abriendo el PDF…" />}><PdfPages url={url} onError={onError} /></Suspense>;
    case "word":
      if (ext === "docx" && !external) return <Suspense fallback={<Loading text="Abriendo el documento…" />}><DocxView url={url} onError={onError} /></Suspense>;
      if (canUseOfficeViewer(url)) return <iframe className="viewer__frame" src={officeViewerUrl(url)} title={name} />;
      return <Notice url={url} name={name}>Este documento de Word ({ext.toUpperCase() || "DOC"}) no se puede mostrar aquí. Descárgalo para leerlo, o guárdalo como PDF o DOCX al subirlo.</Notice>;
    case "excel":
      if (ext === "xlsx" && !external) return <Suspense fallback={<Loading text="Abriendo la hoja…" />}><SheetView url={url} onError={onError} /></Suspense>;
      if (canUseOfficeViewer(url)) return <iframe className="viewer__frame" src={officeViewerUrl(url)} title={name} />;
      return <Notice url={url} name={name}>Esta hoja de cálculo no se puede mostrar aquí. Descárgala para abrirla.</Notice>;
    case "csv":
      return <Suspense fallback={<Loading />}><SheetView url={url} csv onError={onError} /></Suspense>;
    case "powerpoint":
      if (canUseOfficeViewer(url)) return <iframe className="viewer__frame" src={officeViewerUrl(url)} title={name} />;
      return <Notice url={url} name={name}>Las presentaciones se ven aquí cuando la web está publicada. Mientras tanto, descárgala para verla.</Notice>;
    case "text":
      return <TextView url={url} onError={onError} />;
    default:
      return <Notice url={url} name={name}>Este tipo de archivo no se puede ver dentro de la web.</Notice>;
  }
}

/**
 * Ventana para leer o ver un archivo sin salir de la web: PDF (página por página), Word,
 * Excel/CSV, texto, imágenes, audio y video. Presentaciones con el visor de Office.
 * También muestra documentos de Google Drive/Docs (mode "embed"). Pantalla completa en el celular.
 */
export function FileViewerDialog({ open, onOpenChange, source }: { open: boolean; onOpenChange: (v: boolean) => void; source: ViewerSource }) {
  const isEmbed = source.mode === "embed";
  const url = isEmbed ? source.url : source.url;
  const name = isEmbed ? source.title : source.name || decodeURIComponent(url.split("?")[0].split("/").pop() || "Archivo");
  const mime = !isEmbed ? source.mime || (url.startsWith("data:") ? dataUrlMime(url) : "") : "";
  const type: FileType = !isEmbed ? source.fileType || fileTypeOf(name, mime) || classifyUrl(url)?.fileType || "other" : "other";
  const ext = fileExtension(name) || fileExtension(url);
  const size = !isEmbed ? source.size : null;
  const brand = isEmbed ? PROVIDER_BRAND[source.provider] : null;

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="viewer-overlay" />
        <DialogPrimitive.Content className="viewer" aria-describedby={undefined} data-testid="file-viewer">
          <header className="viewer__bar">
            {brand ? (
              <span className="viewer__brand" style={{ background: brand.badge }} aria-hidden="true"><brand.Icon className="h-4 w-4 text-white" /></span>
            ) : (
              <FileTypeIcon type={type} className="h-6 w-6 shrink-0" />
            )}
            <div className="min-w-0 flex-1">
              <DialogPrimitive.Title className="viewer__title">{name}</DialogPrimitive.Title>
              <p className="viewer__meta">{isEmbed ? "Documento compartido" : [fileTypeLabel(type), formatBytes(size)].filter(Boolean).join(" · ")}</p>
            </div>
            {!isEmbed && (
              <button type="button" className="viewer__btn" onClick={() => downloadFile(url, name)} title="Descargar" aria-label="Descargar">
                <Download className="h-4 w-4" aria-hidden="true" /> <span className="viewer__btn-text">Descargar</span>
              </button>
            )}
            {(isEmbed || !url.startsWith("data:")) && (
              <a className="viewer__btn" href={isEmbed ? source.url : url} target="_blank" rel="noopener noreferrer" title="Abrir en otra pestaña" aria-label="Abrir en otra pestaña">
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
            <DialogPrimitive.Close className="viewer__btn viewer__btn--close" aria-label="Cerrar">
              <X className="h-5 w-5" aria-hidden="true" />
            </DialogPrimitive.Close>
          </header>
          <div className="viewer__body">
            {isEmbed ? (
              <iframe className="viewer__frame" src={source.src} title={name} allow="autoplay; fullscreen" />
            ) : (
              <FileBody url={url} name={name} type={type} ext={ext} />
            )}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
