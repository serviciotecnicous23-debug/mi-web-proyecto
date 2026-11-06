import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowUpRight, CornerUpLeft, X } from "lucide-react";
import { PROVIDER_BRAND, providerLabel } from "./brand";
import { buildEmbedSrc, dockClock, IFRAME_ALLOW, setDock, useDock, useEmbedClock, useOnOtherPlay } from "./player-store";

/**
 * Ventanita flotante: el video sigue mientras la persona navega por la web (como la
 * radio). Vive en App.tsx, fuera de las páginas, para no cortarse al cambiar de página.
 */
export function MediaDock() {
  const item = useDock();
  const [frame, setFrame] = useState<HTMLIFrameElement | null>(null);
  useEmbedClock(item ? frame : null, item?.provider || "web", (s) => {
    dockClock.seconds = s;
  });
  useOnOtherPlay(item?.key || "", () => setDock(null));

  useEffect(() => {
    dockClock.seconds = item?.start || 0;
    document.documentElement.classList.toggle("media-dock-open", !!item);
    return () => document.documentElement.classList.remove("media-dock-open");
  }, [item]);

  if (!item) return null;
  const brand = PROVIDER_BRAND[item.provider];
  const tall = item.aspect < 0.9;
  return (
    <aside className={`media-dock ${tall ? "media-dock--tall" : ""}`} aria-label="Video en reproducción" data-testid="media-dock">
      <div className="media-dock__bar">
        <span className="media-dock__brand" style={{ background: brand.badge }} aria-hidden="true">
          <brand.Icon className="h-3.5 w-3.5" />
        </span>
        <span className="media-dock__title" title={item.title}>{item.title || providerLabel(item.provider)}</span>
        {item.returnTo && (
          <Link href={item.returnTo} className="media-dock__btn" aria-label="Volver a la publicación" title="Volver a la publicación">
            <CornerUpLeft className="h-4 w-4" aria-hidden="true" />
          </Link>
        )}
        <a href={item.url} target="_blank" rel="noopener noreferrer" className="media-dock__btn" aria-label={`Abrir en ${providerLabel(item.provider)}`} title={`Abrir en ${providerLabel(item.provider)}`}>
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
        <button type="button" className="media-dock__btn" onClick={() => setDock(null)} aria-label="Cerrar el video" title="Cerrar">
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
      <div className="media-dock__stage" style={{ aspectRatio: String(item.aspect) }}>
        <iframe
          key={item.key}
          ref={setFrame}
          src={buildEmbedSrc(item.embedUrl, item.provider, item.start)}
          title={item.title || "Video"}
          allow={IFRAME_ALLOW}
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </aside>
  );
}
