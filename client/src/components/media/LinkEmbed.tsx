import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "wouter";
import { ArrowUpRight, Play, PictureInPicture2, BookOpen, X, Loader2 } from "lucide-react";
import { classifyUrl, PROVIDER_LABELS, type MediaInfo } from "@shared/media";
import { useLinkPreview, type LinkPreview } from "@/lib/link-preview";
import { PROVIDER_BRAND, ProviderBadge, providerLabel } from "./brand";
import {
  announcePlay, buildEmbedSrc, canResume, dockClock, getDock, IFRAME_ALLOW, setDock, useDock, useEmbedClock, useOnOtherPlay,
} from "./player-store";
import { FileAttachment } from "./FileAttachment";
import { FileViewerDialog, type ViewerSource } from "./FileViewer";

const KIND_WORD: Record<string, string> = { video: "Video", audio: "Audio", post: "Publicación", document: "Documento", web: "Enlace", image: "Imagen" };

function fallbackTitle(info: MediaInfo) {
  const what = KIND_WORD[info.kind] || "Enlace";
  if (info.provider === "web" || info.provider === "file") return what;
  return `${what} de ${PROVIDER_LABELS[info.provider]}`;
}

function hostOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/** Datos para mostrar: lo que se sabe del enlace + lo que trajo el servidor. */
function merge(info: MediaInfo, preview?: LinkPreview | null) {
  const finalInfo = preview?.finalUrl && preview.finalUrl !== info.url ? classifyUrl(preview.finalUrl) || info : info;
  return {
    info: finalInfo,
    url: info.url,
    embedUrl: preview?.embedUrl || finalInfo.embedUrl,
    thumbnail: preview?.thumbnail || finalInfo.thumbnail,
    title: preview?.title,
    description: preview?.description,
    author: preview?.author || finalInfo.handle,
    siteName: preview?.siteName,
    favicon: preview?.favicon,
    aspect: preview?.aspect || finalInfo.aspect,
    height: preview?.height || finalInfo.height,
    kind: preview?.kind || finalInfo.kind,
    start: finalInfo.start,
  };
}

type Merged = ReturnType<typeof merge>;

// ---------- Video / audio / publicación con reproductor ----------

function PlayerCard({ data, compact }: { data: Merged; compact?: boolean }) {
  const { info } = data;
  const key = data.url;
  const brand = PROVIDER_BRAND[info.provider];
  const label = providerLabel(info.provider, data.siteName);
  const title = data.title || fallbackTitle({ ...info, kind: data.kind });
  const tall = data.aspect < 0.9;
  const isAudio = data.kind === "audio";
  const isPost = data.kind === "post";
  const [location] = useLocation();
  const dock = useDock();
  const inDock = dock?.key === key;
  const [playing, setPlaying] = useState(false);
  const [start, setStart] = useState<number | undefined>(data.start);
  const [frame, setFrame] = useState<HTMLIFrameElement | null>(null);
  const clock = useEmbedClock(playing ? frame : null, info.provider);
  const [visible, setVisible] = useState(false);
  const [thumbFailed, setThumbFailed] = useState(false);
  const thumbnail = thumbFailed ? undefined : data.thumbnail;
  const rootRef = useRef<HTMLDivElement>(null);
  // Instagram y X dicen por mensaje cuánto mide la publicación: el marco toma esa altura.
  const selfSized = info.provider === "instagram" || info.provider === "x";
  const [frameHeight, setFrameHeight] = useState<number | null>(null);
  useEffect(() => {
    if (!playing || !frame || !selfSized) return;
    const onMessage = (e: MessageEvent) => {
      if (e.source !== frame.contentWindow) return;
      let d: any = e.data;
      if (typeof d === "string") {
        try {
          d = JSON.parse(d);
        } catch {
          return;
        }
      }
      let h: number | undefined;
      if (d?.type === "MEASURE" && d.details?.height) h = Number(d.details.height);
      const tw = d?.["twttr.embed"];
      if (tw?.method === "twttr.private.resize" && tw.params?.[0]?.height) h = Number(tw.params[0].height);
      if (h && h > 120 && h < 4000) setFrameHeight(Math.ceil(h));
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [playing, frame, selfSized]);

  // Solo se anima la miniatura (el "fondo vivo") mientras se ve en pantalla.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: "120px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useOnOtherPlay(key, () => setPlaying(false));

  // Si la persona se va a otra página con el video sonando, sigue en la ventanita.
  const state = useRef({ playing, location, start, data, title });
  state.current = { playing, location, start, data, title };
  useEffect(() => {
    return () => {
      const s = state.current;
      const d = s.data;
      if (!s.playing || !d.embedUrl || d.kind === "audio" || d.kind === "post") return;
      if (window.location.pathname === s.location) return; // se borró la publicación, no es navegación
      setDock({
        key,
        url: d.url,
        embedUrl: d.embedUrl,
        provider: d.info.provider,
        kind: d.kind,
        title: s.title,
        author: d.author,
        aspect: d.aspect,
        start: canResume(d.info.provider) ? clock.current || s.start : undefined,
        returnTo: s.location,
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const play = () => {
    let from = start;
    if (inDock) {
      from = canResume(info.provider) ? dockClock.seconds || from : from;
      setDock(null);
    }
    setStart(from);
    announcePlay(key);
    setPlaying(true);
  };

  const toDock = () => {
    if (!data.embedUrl) return;
    setDock({
      key,
      url: data.url,
      embedUrl: data.embedUrl,
      provider: info.provider,
      kind: data.kind,
      title,
      author: data.author,
      aspect: data.aspect,
      start: canResume(info.provider) ? clock.current || start : undefined,
      returnTo: location,
    });
    setPlaying(false);
  };

  // Audio (Spotify, SoundCloud): su reproductor ya es la tarjeta; se carga al acercarse.
  if (isAudio && data.embedUrl) {
    return (
      <div ref={rootRef} className={`media-card media-card--audio ${compact ? "media-card--compact" : ""}`} data-provider={info.provider}>
        <iframe
          src={buildEmbedSrc(data.embedUrl, info.provider).replace("auto_play=true", "auto_play=false")}
          title={title}
          loading="lazy"
          allow={IFRAME_ALLOW}
          style={{ height: data.height || 152 }}
          className="media-audio-frame"
          onLoad={() => undefined}
          onFocus={() => announcePlay(key)}
        />
        <div className="media-meta media-meta--slim">
          <ProviderBadge provider={info.provider} siteName={data.siteName} />
          <a href={data.url} target="_blank" rel="noopener noreferrer" className="media-open" title={`Abrir en ${label}`}>
            Abrir en {label} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    );
  }

  // Sin miniatura (Instagram, TikTok) la portada es más baja que el video: no ocupa toda la pantalla.
  const stageAspect = isPost && !playing ? Math.max(data.aspect, 1.2) : !playing && !thumbnail && tall ? 4 / 5 : data.aspect;
  const stageStyle = (playing && selfSized
    ? { aspectRatio: "auto", height: frameHeight || (info.provider === "instagram" ? 640 : 560) }
    : { aspectRatio: String(stageAspect), ["--media-ar" as string]: stageAspect }) as React.CSSProperties;

  return (
    <div
      ref={rootRef}
      className={`media-card ${compact ? "media-card--compact" : ""} ${tall && !(playing && selfSized) ? "media-card--tall" : ""} ${playing && selfSized ? "media-card--social" : ""}`}
      data-provider={info.provider}
      data-visible={visible || undefined}
      data-testid="media-card"
    >
      <div className={`media-stage ${tall && !(playing && selfSized) ? "media-stage--tall" : ""} ${isPost && playing && !selfSized ? "media-stage--post" : ""} ${playing && selfSized ? "media-stage--social" : ""}`} style={stageStyle}>
        {playing && data.embedUrl ? (
          <iframe
            ref={setFrame}
            src={buildEmbedSrc(data.embedUrl, info.provider, start)}
            title={title}
            allow={IFRAME_ALLOW}
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            className="media-frame"
          />
        ) : (
          <button type="button" className="media-poster" onClick={play} aria-label={`${isPost ? "Ver" : "Reproducir"}: ${title}`} data-testid="media-play">
            {thumbnail ? (
              <>
                <img className="media-poster__bg" src={thumbnail} alt="" aria-hidden="true" loading="lazy" referrerPolicy="no-referrer" />
                <img className="media-poster__img" src={thumbnail} alt="" loading="lazy" referrerPolicy="no-referrer" onError={() => setThumbFailed(true)} />
              </>
            ) : (
              <span className="media-poster__brand" style={{ background: brand.poster || brand.badge }} aria-hidden="true">
                <brand.Icon className="media-poster__logo" />
                {isPost && data.description && <span className="media-poster__quote">{data.description}</span>}
                {!inDock && (
                  <span className="media-play media-play--inline">
                    {isPost ? <BookOpen className="h-7 w-7" /> : <Play className="h-8 w-8 translate-x-0.5" fill="currentColor" />}
                  </span>
                )}
                {data.author && <span className="media-poster__handle">{data.author}</span>}
                <span className="media-poster__hint">{isPost ? "Toca para ver la publicación aquí" : "Toca para ver el video aquí"}</span>
              </span>
            )}
            <span className="media-poster__shade" aria-hidden="true" />
            <ProviderBadge provider={info.provider} siteName={data.siteName} className="media-poster__badge" />
            {inDock ? (
              <span className="media-poster__docked">
                <PictureInPicture2 className="h-5 w-5" aria-hidden="true" /> Se está viendo en la ventanita · Toca para traerlo aquí
              </span>
            ) : thumbnail ? (
              <span className="media-play" aria-hidden="true">
                {isPost ? <BookOpen className="h-7 w-7" /> : <Play className="h-8 w-8 translate-x-0.5" fill="currentColor" />}
              </span>
            ) : null}
          </button>
        )}
      </div>
      <div className="media-meta">
        <span className="media-meta__icon" style={{ background: brand.badge }} aria-hidden="true">
          <brand.Icon className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="media-title" title={title}>{title}</p>
          <p className="media-sub">
            {data.author ? <span className="media-sub__author">{data.author}</span> : null}
            {data.author ? " · " : ""}
            {label}
          </p>
        </div>
        <div className="media-actions">
          {playing && !isPost && (
            <button type="button" className="media-icon-btn" onClick={toDock} title="Seguir viendo mientras navegas" aria-label="Seguir viendo en una ventanita mientras navegas">
              <PictureInPicture2 className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
          {playing && (
            <button type="button" className="media-icon-btn" onClick={() => setPlaying(false)} title="Cerrar el reproductor" aria-label="Cerrar el reproductor">
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
          <a href={data.url} target="_blank" rel="noopener noreferrer" className="media-open" title={`Abrir en ${label}`} data-testid="media-open">
            <brand.Icon className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="media-open__text">{compact ? label : `Abrir en ${label}`}</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}

// ---------- Documento (Drive, Docs, PDF por enlace...) ----------

function DocumentLinkCard({ data, compact }: { data: Merged; compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const [thumbFailed, setThumbFailed] = useState(false);
  const { info } = data;
  const brand = PROVIDER_BRAND[info.provider];
  const label = providerLabel(info.provider, data.siteName);
  const title = data.title || fallbackTitle(info);
  const source: ViewerSource = data.embedUrl && info.provider !== "file" && info.provider !== "dropbox"
    ? { mode: "embed", src: data.embedUrl, title, url: data.url, provider: info.provider }
    : { mode: "file", url: data.embedUrl || data.url, name: title, fileType: info.fileType };
  return (
    <>
      <button type="button" className={`doc-link-card ${compact ? "doc-link-card--compact" : ""}`} onClick={() => setOpen(true)} data-testid="doc-link-card">
        <span className="doc-link-card__thumb" style={{ background: brand.badge }}>
          {data.thumbnail && !thumbFailed ? (
            <img src={data.thumbnail} alt="" loading="lazy" referrerPolicy="no-referrer" onError={() => setThumbFailed(true)} />
          ) : (
            <brand.Icon className="h-8 w-8 text-white" aria-hidden="true" />
          )}
        </span>
        <span className="min-w-0 flex-1 text-left">
          <span className="doc-link-card__title">{title}</span>
          <span className="doc-link-card__sub">{label} · Toca para leerlo aquí</span>
        </span>
        <BookOpen className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
      </button>
      {open && <FileViewerDialog open={open} onOpenChange={setOpen} source={source} />}
    </>
  );
}

// ---------- Página web ----------

function WebCard({ data, compact }: { data: Merged; compact?: boolean }) {
  const { info } = data;
  const [imageFailed, setImageFailed] = useState(false);
  const known = info.provider !== "web";
  const brand = PROVIDER_BRAND[info.provider];
  const host = hostOf(data.url);
  const title = data.title || (known ? `${PROVIDER_LABELS[info.provider]}${data.author ? ` · ${data.author}` : ""}` : host);
  return (
    <a href={data.url} target="_blank" rel="noopener noreferrer" className={`web-card ${compact ? "web-card--compact" : ""}`} data-testid="web-card">
      {data.thumbnail && !imageFailed ? (
        <span className="web-card__img">
          <img src={data.thumbnail} alt="" loading="lazy" referrerPolicy="no-referrer" onError={() => setImageFailed(true)} />
        </span>
      ) : known ? (
        <span className="web-card__img web-card__img--brand" style={{ background: brand.badge }}>
          <brand.Icon className="h-8 w-8 text-white" aria-hidden="true" />
        </span>
      ) : null}
      <span className="web-card__body">
        <span className="web-card__site">
          {known ? (
            <brand.Icon className="h-3.5 w-3.5" style={{ color: brand.color }} aria-hidden="true" />
          ) : data.favicon ? (
            <img src={data.favicon} alt="" className="h-3.5 w-3.5 rounded-sm" loading="lazy" referrerPolicy="no-referrer" onError={(e) => ((e.target as HTMLImageElement).style.display = "none")} />
          ) : null}
          {known ? PROVIDER_LABELS[info.provider] : data.siteName || host}
        </span>
        <span className="web-card__title">{title}</span>
        {data.description && !compact && <span className="web-card__desc">{data.description}</span>}
      </span>
      <ArrowUpRight className="web-card__go h-4 w-4" aria-hidden="true" />
    </a>
  );
}

function ImageLink({ url }: { url: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" className="media-image-link" onClick={() => setOpen(true)} aria-label="Ver la imagen">
        <img src={url} alt="" loading="lazy" referrerPolicy="no-referrer" />
      </button>
      {open && <FileViewerDialog open={open} onOpenChange={setOpen} source={{ mode: "file", url, name: hostOf(url), fileType: "image" }} />}
    </>
  );
}

/**
 * Cualquier enlace compartido, mostrado según lo que es: reproductor (YouTube, Instagram,
 * TikTok, Facebook, Vimeo...), audio (Spotify, SoundCloud), documento (Drive, Docs, PDF) o
 * tarjeta de la página. Con la marca de la plataforma y "Abrir en ..." siempre a mano.
 */
export function LinkEmbed({ url, compact, className = "" }: { url: string; compact?: boolean; className?: string }) {
  const info = useMemo(() => classifyUrl(url), [url]);
  const external = !!info && info.provider !== "file" && /^https?:/i.test(info.url);
  const { data: preview, isLoading } = useLinkPreview(external ? info!.url : null);
  if (!info) return null;

  if (info.provider === "file" && !/^https?:/i.test(info.url)) {
    return <div className={className}><FileAttachment url={info.url} compact={compact} /></div>;
  }
  if (info.kind === "image") return <div className={className}><ImageLink url={info.url} /></div>;

  const data = merge(info, preview);
  const kind = data.kind;
  let body: React.ReactNode;
  if ((kind === "video" || kind === "audio" || kind === "post") && data.embedUrl) body = <PlayerCard data={data} compact={compact} />;
  else if (kind === "document" || (info.provider === "file" && (info.fileType === "pdf" || info.fileType === "word" || info.fileType === "excel" || info.fileType === "powerpoint" || info.fileType === "text" || info.fileType === "csv"))) body = <DocumentLinkCard data={data} compact={compact} />;
  else if (info.provider === "file" && (info.fileType === "video" || info.fileType === "audio")) body = <FileAttachment url={info.url} compact={compact} />;
  else if (isLoading && info.provider === "web") {
    body = (
      <span className="web-card web-card--loading" aria-busy="true">
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> {hostOf(url)}
      </span>
    );
  } else body = <WebCard data={data} compact={compact} />;
  return <div className={`media-embed ${className}`}>{body}</div>;
}

/** ¿Este enlace se muestra como tarjeta? (para no repetir el enlace largo en el texto) */
export function isEmbeddable(url: string) {
  return !!classifyUrl(url);
}

export { getDock };
