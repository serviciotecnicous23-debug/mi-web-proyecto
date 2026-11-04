import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink, AlertTriangle, Signal, Play, Radio,
} from "lucide-react";
import { SiYoutube, SiFacebook, SiTiktok } from "react-icons/si";

// ========== URL Detection Helpers ==========

function extractYouTubeId(url: string): string | null {
  try {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/live\/)([a-zA-Z0-9_-]{11})/,
    ];
    for (const p of patterns) {
      const m = url.match(p);
      if (m && m[1]) return m[1];
    }
    if (url.match(/youtube\.com/)) {
      const parsed = new URL(url);
      const v = parsed.searchParams.get("v");
      if (v) return v;
    }
  } catch {
    return null;
  }
  return null;
}

function extractYouTubeChannelId(url: string): string | null {
  try {
    const m = url.match(/youtube\.com\/(?:channel|c)\/([^/\?]+)/);
    if (m && m[1]) return m[1];
  } catch {
    return null;
  }
  return null;
}

function buildYouTubeEmbedUrl(sourceUrl: string): { videoId: string | null; channelId: string | null; embedUrl: string; watchUrl: string } | null {
  const videoId = extractYouTubeId(sourceUrl);
  if (videoId) {
    return {
      videoId,
      channelId: null,
      embedUrl: `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1&origin=${window.location.origin}`,
      watchUrl: `https://www.youtube.com/watch?v=${videoId}`,
    };
  }
  const channelId = extractYouTubeChannelId(sourceUrl);
  if (channelId) {
    return {
      videoId: null,
      channelId,
      embedUrl: `https://www.youtube.com/embed/live_stream?channel=${channelId}&autoplay=1&enablejsapi=1&origin=${window.location.origin}`,
      watchUrl: sourceUrl,
    };
  }
  return null;
}

function extractFacebookVideoUrl(url: string): string {
  return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&width=560&height=315&autoplay=true&mute=false`;
}

function isTikTokLive(url: string): boolean {
  return /tiktok\.com\/@[^/]+\/live/i.test(url);
}

function extractTikTokVideoId(url: string): string | null {
  try {
    const m = url.match(/tiktok\.com\/@[^/]+\/video\/(\d+)/);
    if (m && m[1]) return m[1];
    const m2 = url.match(/vm\.tiktok\.com\/(\w+)/);
    if (m2 && m2[1]) return m2[1];
  } catch {}
  return null;
}

// ========== Detect source type from URL ==========
export function detectSourceType(url: string, platformHint?: string | null): string {
  if (!url) return "unknown";
  const lower = url.toLowerCase();

  // Use platform hint if provided and matches known streaming platforms
  if (platformHint === "youtube" || lower.includes("youtube.com") || lower.includes("youtu.be")) return "youtube";
  if (platformHint === "facebook" || lower.includes("facebook.com") || lower.includes("fb.watch")) return "facebook";
  if (lower.includes("tiktok.com")) return "tiktok";
  if (lower.includes("restream.io") || lower.includes("player.restream")) return "restream";
  if (lower.endsWith(".m3u8") || lower.includes("/hls/")) return "hls";

  return "external";
}

export function isEmbeddableUrl(url: string, platformHint?: string | null): boolean {
  const type = detectSourceType(url, platformHint);
  return ["youtube", "facebook", "tiktok", "restream"].includes(type);
}

// ========== Pulsing Live Dot ==========
function PulsingDot({ color = "bg-red-500" }: { color?: string }) {
  return (
    <span className="relative flex h-3 w-3">
      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${color} opacity-75`} />
      <span className={`relative inline-flex rounded-full h-3 w-3 ${color}`} />
    </span>
  );
}

// ========== YouTube Embedded Player ==========
function EmbedYouTubePlayer({ sourceUrl }: { sourceUrl: string }) {
  const [embedError, setEmbedError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const ytData = buildYouTubeEmbedUrl(sourceUrl);

  if (!ytData) {
    return (
      <div className="aspect-video w-full rounded-md overflow-hidden bg-black flex flex-col items-center justify-center gap-4 p-6">
        <AlertTriangle className="w-12 h-12 text-yellow-400" />
        <p className="text-white text-center font-medium">URL de YouTube no válida</p>
        <Button variant="outline" className="border-white/30 text-white" onClick={() => window.open(sourceUrl, "_blank")}>
          <ExternalLink className="w-4 h-4 mr-2" /> Abrir enlace original
        </Button>
      </div>
    );
  }

  useEffect(() => {
    setEmbedError(false);
    setIsLoading(true);

    const playerId = "yt-embed-" + Date.now();
    if (playerContainerRef.current) {
      playerContainerRef.current.innerHTML = `<div id="${playerId}" style="width:100%;height:100%"></div>`;
    }

    if (playerRef.current) {
      try { playerRef.current.destroy(); } catch {}
      playerRef.current = null;
    }

    const createPlayer = () => {
      if (!(window as any).YT?.Player) return;

      const playerConfig: any = {
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 1, rel: 0, modestbranding: 1, playsinline: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: () => setIsLoading(false),
          onError: (event: any) => {
            console.warn("YouTube Player Error:", event?.data);
            setEmbedError(true);
            setIsLoading(false);
          },
          onStateChange: (event: any) => {
            if (event?.data === 1 || event?.data === 3) {
              setIsLoading(false);
              setEmbedError(false);
            }
          },
        },
      };

      if (ytData.videoId) {
        playerConfig.videoId = ytData.videoId;
      } else if (ytData.channelId) {
        playerConfig.playerVars.channel = ytData.channelId;
      }

      try {
        playerRef.current = new (window as any).YT.Player(playerId, playerConfig);
      } catch (err) {
        console.error("Failed to create YT player:", err);
        setEmbedError(true);
        setIsLoading(false);
      }
    };

    if ((window as any).YT?.Player) {
      createPlayer();
    } else {
      const prevCallback = (window as any).onYouTubeIframeAPIReady;
      (window as any).onYouTubeIframeAPIReady = () => {
        if (prevCallback) prevCallback();
        createPlayer();
      };
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);
      } else {
        const interval = setInterval(() => {
          if ((window as any).YT?.Player) { clearInterval(interval); createPlayer(); }
        }, 200);
        setTimeout(() => clearInterval(interval), 10000);
      }
    }

    const fallbackTimer = setTimeout(() => {
      try {
        const state = playerRef.current?.getPlayerState?.();
        if (state === undefined || state === -1 || state === null) {
          setEmbedError(true);
          setIsLoading(false);
        }
      } catch {
        setEmbedError(true);
        setIsLoading(false);
      }
    }, 10000);

    return () => {
      clearTimeout(fallbackTimer);
      if (playerRef.current) {
        try { playerRef.current.destroy(); } catch {}
        playerRef.current = null;
      }
    };
  }, [sourceUrl]);

  if (embedError) {
    return (
      <div className="aspect-video w-full rounded-md overflow-hidden bg-linear-to-br from-red-950 to-black flex flex-col items-center justify-center gap-4 p-6">
        <SiYoutube className="w-16 h-16 text-red-500" />
        <p className="text-white text-center font-medium text-lg">Este video no permite reproducirse aquí</p>
        <p className="text-white/60 text-sm text-center max-w-sm">
          El creador ha restringido su reproducción fuera de YouTube.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <Button variant="default" className="bg-red-600 hover:bg-red-700 text-white gap-2" onClick={() => window.open(ytData.watchUrl, "_blank")}>
            <SiYoutube className="w-5 h-5" /> Ver en YouTube
          </Button>
          <Button variant="outline" className="border-white/30 text-white/80 hover:text-white gap-2" onClick={() => navigator.clipboard?.writeText(ytData.watchUrl)}>
            <ExternalLink className="w-4 h-4" /> Copiar enlace
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="aspect-video w-full rounded-md overflow-hidden bg-black relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
          <div className="flex flex-col items-center gap-3">
            <SiYoutube className="w-12 h-12 text-red-500 animate-pulse" />
            <p className="text-white/70 text-sm">Cargando video...</p>
          </div>
        </div>
      )}
      <div ref={playerContainerRef} className="w-full h-full" />
      <div className="absolute bottom-2 right-2 z-10">
        <Button size="sm" variant="secondary" className="opacity-70 hover:opacity-100 text-xs gap-1" onClick={() => window.open(ytData.watchUrl, "_blank")}>
          <ExternalLink className="w-3 h-3" /> YouTube
        </Button>
      </div>
    </div>
  );
}

// ========== Facebook Embedded Player ==========
function EmbedFacebookPlayer({ sourceUrl }: { sourceUrl: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [embedError, setEmbedError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sdkRendered = useRef(false);

  useEffect(() => {
    setIsLoading(true);
    setEmbedError(false);
    sdkRendered.current = false;
    let cancelled = false;

    const renderWithSDK = () => {
      if (cancelled || !containerRef.current || sdkRendered.current) return;
      sdkRendered.current = true;
      const wrapper = containerRef.current;
      wrapper.innerHTML = '';
      const fbDiv = document.createElement("div");
      fbDiv.className = "fb-video";
      fbDiv.setAttribute("data-href", sourceUrl);
      fbDiv.setAttribute("data-width", "auto");
      fbDiv.setAttribute("data-allowfullscreen", "true");
      fbDiv.setAttribute("data-autoplay", "true");
      fbDiv.setAttribute("data-show-text", "false");
      wrapper.appendChild(fbDiv);
      try {
        (window as any).FB.XFBML.parse(wrapper, () => {
          if (cancelled) return;
          setTimeout(() => {
            if (cancelled) return;
            const iframe = wrapper.querySelector("iframe");
            if (iframe) setIsLoading(false);
            else renderIframeFallback();
          }, 3000);
        });
      } catch { renderIframeFallback(); }
    };

    const renderIframeFallback = () => {
      if (cancelled || !containerRef.current) return;
      const wrapper = containerRef.current;
      wrapper.innerHTML = '';
      const iframe = document.createElement("iframe");
      iframe.src = extractFacebookVideoUrl(sourceUrl);
      iframe.className = "w-full h-full";
      iframe.allow = "autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share";
      iframe.referrerPolicy = "no-referrer-when-downgrade";
      iframe.allowFullscreen = true;
      iframe.title = "Facebook Live";
      iframe.style.border = "none";
      wrapper.appendChild(iframe);
      setIsLoading(false);
    };

    if ((window as any).FB) {
      renderWithSDK();
    } else {
      const prevInit = (window as any).fbAsyncInit;
      (window as any).fbAsyncInit = function () {
        (window as any).FB.init({ xfbml: false, version: "v21.0" });
        if (typeof prevInit === "function") prevInit();
        if (!cancelled) renderWithSDK();
      };
      if (!document.getElementById("facebook-jssdk")) {
        const js = document.createElement("script");
        js.id = "facebook-jssdk";
        js.src = "https://connect.facebook.net/es_LA/sdk.js";
        js.onerror = () => { if (!cancelled) renderIframeFallback(); };
        document.head.appendChild(js);
      } else if (!(window as any).FB) {
        renderIframeFallback();
      }
      setTimeout(() => { if (!cancelled && !sdkRendered.current) renderIframeFallback(); }, 6000);
    }

    return () => { cancelled = true; };
  }, [sourceUrl]);

  if (embedError) {
    return (
      <div className="aspect-video w-full rounded-md overflow-hidden bg-linear-to-br from-blue-950 to-black flex flex-col items-center justify-center gap-4 p-6">
        <SiFacebook className="w-16 h-16 text-blue-500" />
        <p className="text-white text-center font-medium text-lg">No se pudo reproducir aquí</p>
        <Button variant="default" className="bg-blue-600 hover:bg-blue-700 text-white gap-2" onClick={() => window.open(sourceUrl, "_blank")}>
          <SiFacebook className="w-5 h-5" /> Ver en Facebook
        </Button>
      </div>
    );
  }

  return (
    <div className="aspect-video w-full rounded-md overflow-hidden bg-black relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
          <div className="flex flex-col items-center gap-3">
            <SiFacebook className="w-12 h-12 text-blue-500 animate-pulse" />
            <p className="text-white/70 text-sm">Cargando video de Facebook...</p>
          </div>
        </div>
      )}
      <div
        ref={containerRef}
        className="w-full h-full [&_iframe]:w-full! [&_iframe]:h-full! [&_.fb-video]:w-full [&_.fb-video]:h-full [&_.fb_iframe_widget]:w-full [&_.fb_iframe_widget]:h-full [&_span]:block [&_span]:w-full [&_span]:h-full"
      />
      <div className="absolute bottom-2 right-2 z-10">
        <Button size="sm" variant="secondary" className="opacity-70 hover:opacity-100 text-xs gap-1" onClick={() => window.open(sourceUrl, "_blank")}>
          <ExternalLink className="w-3 h-3" /> Facebook
        </Button>
      </div>
    </div>
  );
}

// ========== TikTok Embedded Player ==========
function EmbedTikTokPlayer({ sourceUrl }: { sourceUrl: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [embedError, setEmbedError] = useState(false);
  const isLive = isTikTokLive(sourceUrl);
  const videoId = extractTikTokVideoId(sourceUrl);

  useEffect(() => {
    setIsLoading(true);
    setEmbedError(false);
    if (isLive || !videoId) {
      setIsLoading(false);
      setEmbedError(true);
      return;
    }
    if (!document.querySelector('script[src*="tiktok.com/embed.js"]')) {
      const script = document.createElement("script");
      script.src = "https://www.tiktok.com/embed.js";
      script.async = true;
      document.head.appendChild(script);
    }
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, [sourceUrl, isLive, videoId]);

  if (embedError || isLive || !videoId) {
    return (
      <div className="aspect-video w-full rounded-md overflow-hidden bg-linear-to-br from-gray-950 via-black to-pink-950/40 flex flex-col items-center justify-center gap-4 p-6">
        <div className="relative">
          <SiTiktok className="w-16 h-16 text-white" />
          {isLive && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-pink-500" />
            </span>
          )}
        </div>
        <p className="text-white text-center font-medium text-lg">
          {isLive ? "Transmisión en TikTok Live" : "Video de TikTok"}
        </p>
        <p className="text-white/60 text-sm text-center max-w-sm">
          {isLive
            ? "TikTok Live no permite la reproducción embebida. Abre la transmisión directamente en TikTok."
            : "No se pudo cargar el video de TikTok."}
        </p>
        <Button
          variant="default"
          className="bg-linear-to-r from-pink-500 via-red-500 to-blue-500 hover:from-pink-600 hover:via-red-600 hover:to-blue-600 text-white gap-2"
          onClick={() => window.open(sourceUrl, "_blank")}
        >
          <SiTiktok className="w-5 h-5" />
          {isLive ? "Ver en TikTok Live" : "Ver en TikTok"}
        </Button>
      </div>
    );
  }

  const embedUrl = `https://www.tiktok.com/embed/v2/${videoId}`;

  return (
    <div className="aspect-video w-full rounded-md overflow-hidden bg-black relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
          <div className="flex flex-col items-center gap-3">
            <SiTiktok className="w-12 h-12 text-white animate-pulse" />
            <p className="text-white/70 text-sm">Cargando video de TikTok...</p>
          </div>
        </div>
      )}
      <iframe
        src={embedUrl}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="TikTok Video"
        style={{ border: "none" }}
        onLoad={() => setIsLoading(false)}
        onError={() => setEmbedError(true)}
      />
      <div className="absolute bottom-2 right-2 z-10">
        <Button size="sm" variant="secondary" className="opacity-70 hover:opacity-100 text-xs gap-1" onClick={() => window.open(sourceUrl, "_blank")}>
          <ExternalLink className="w-3 h-3" /> TikTok
        </Button>
      </div>
    </div>
  );
}

// ========== Restream Embedded Player ==========
function EmbedRestreamPlayer({ sourceUrl }: { sourceUrl: string }) {
  const embedUrl = sourceUrl.includes("?") ? sourceUrl : `${sourceUrl}?autoplay=true`;
  return (
    <div className="aspect-video w-full rounded-md overflow-hidden bg-black relative">
      <iframe
        src={embedUrl}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        title="Restream - Transmisión en Vivo"
        style={{ border: "none" }}
      />
      <div className="absolute bottom-2 right-2 z-10">
        <Button size="sm" variant="secondary" className="opacity-70 hover:opacity-100 text-xs gap-1" onClick={() => window.open(sourceUrl, "_blank")}>
          <ExternalLink className="w-3 h-3" /> Abrir Player
        </Button>
      </div>
    </div>
  );
}

// ========== Platform Icon/Label Helpers ==========
function getEmbedSourceIcon(type: string) {
  switch (type) {
    case "youtube": return <SiYoutube className="w-4 h-4 text-red-500" />;
    case "facebook": return <SiFacebook className="w-4 h-4 text-blue-600" />;
    case "tiktok": return <SiTiktok className="w-4 h-4" />;
    case "restream": return <Signal className="w-4 h-4 text-green-500" />;
    default: return <Radio className="w-4 h-4 text-primary" />;
  }
}

function getEmbedSourceLabel(type: string) {
  switch (type) {
    case "youtube": return "YouTube";
    case "facebook": return "Facebook";
    case "tiktok": return "TikTok";
    case "restream": return "Restream";
    default: return "En Vivo";
  }
}

// ========== Main LiveStreamEmbed Component ==========
/**
 * Reusable component to embed a live stream player from a meeting URL.
 * Automatically detects platform from URL and renders the appropriate player.
 * Shows a "Ver en Vivo" button that expands to show the embedded player.
 */
export function LiveStreamEmbed({
  url,
  platformHint,
  title,
  compact = false,
}: {
  url: string;
  platformHint?: string | null;
  title?: string;
  compact?: boolean;
}) {
  const [showPlayer, setShowPlayer] = useState(false);
  const sourceType = detectSourceType(url, platformHint);
  const embeddable = isEmbeddableUrl(url, platformHint);

  if (!url || !embeddable) return null;

  if (!showPlayer) {
    return (
      <div className={`${compact ? "" : "mt-3"}`}>
        <Button
          onClick={() => setShowPlayer(true)}
          variant="default"
          size={compact ? "sm" : "default"}
          className="gap-2 bg-linear-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white shadow-lg"
        >
          <PulsingDot />
          <Play className="w-4 h-4" />
          Ver en Vivo
          {getEmbedSourceIcon(sourceType)}
        </Button>
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${compact ? "" : "mt-3"}`}>
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <PulsingDot />
          {getEmbedSourceIcon(sourceType)}
          <span className="text-sm font-medium">
            {title || "Transmisión en Vivo"} - {getEmbedSourceLabel(sourceType)}
          </span>
          <Badge variant="destructive" className="text-[10px]">EN VIVO</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            className="gap-1 text-xs"
            onClick={() => window.open(url, "_blank")}
          >
            <ExternalLink className="w-3 h-3" /> Abrir externo
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-xs"
            onClick={() => setShowPlayer(false)}
          >
            Cerrar
          </Button>
        </div>
      </div>

      {sourceType === "youtube" && <EmbedYouTubePlayer sourceUrl={url} />}
      {sourceType === "facebook" && <EmbedFacebookPlayer sourceUrl={url} />}
      {sourceType === "tiktok" && <EmbedTikTokPlayer sourceUrl={url} />}
      {sourceType === "restream" && <EmbedRestreamPlayer sourceUrl={url} />}
    </div>
  );
}

/**
 * Inline version - always shows the player without a toggle button
 */
export function LiveStreamInline({
  url,
  platformHint,
  title,
}: {
  url: string;
  platformHint?: string | null;
  title?: string;
}) {
  const sourceType = detectSourceType(url, platformHint);
  const embeddable = isEmbeddableUrl(url, platformHint);

  if (!url || !embeddable) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 flex-wrap">
        <PulsingDot />
        {getEmbedSourceIcon(sourceType)}
        <span className="text-sm font-medium">
          {title || "Transmisión en Vivo"} - {getEmbedSourceLabel(sourceType)}
        </span>
        <Badge variant="destructive" className="text-[10px]">EN VIVO</Badge>
        <Button
          size="sm"
          variant="outline"
          className="gap-1 text-xs ml-auto"
          onClick={() => window.open(url, "_blank")}
        >
          <ExternalLink className="w-3 h-3" /> Abrir externo
        </Button>
      </div>

      {sourceType === "youtube" && <EmbedYouTubePlayer sourceUrl={url} />}
      {sourceType === "facebook" && <EmbedFacebookPlayer sourceUrl={url} />}
      {sourceType === "tiktok" && <EmbedTikTokPlayer sourceUrl={url} />}
      {sourceType === "restream" && <EmbedRestreamPlayer sourceUrl={url} />}
    </div>
  );
}

export default LiveStreamEmbed;
