import { useState, useRef, useEffect, type ReactNode } from "react";
import Hls from "hls.js";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { useLiveStreamConfig } from "@/hooks/use-users";
import { useAuth } from "@/hooks/use-auth";
import LiveRoom from "@/components/LiveRoom";
import { isTeacherOrAdminRole } from "@/lib/utils";
import {
  Radio, Mic, Calendar, Video, Volume2, VolumeX,
  Play, Pause, Tv, Signal, Music, ExternalLink, AlertTriangle, Cast,
} from "lucide-react";
import { SiYoutube, SiFacebook, SiTiktok } from "react-icons/si";

const schedule = [
  { day: "Lunes a viernes", time: "12:00 PM", program: "Fuego al Mediodía", type: "Enseñanza bíblica" },
  { day: "Sábado", time: "7:00 PM", program: "Noche de Avivamiento", type: "Culto en vivo" },
  { day: "Domingo", time: "10:00 AM", program: "Culto Dominical", type: "Servicio principal" },
  { day: "Miércoles", time: "8:00 PM", program: "Estudio Bíblico", type: "Enseñanza" },
];

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

// Build the best YouTube embed URL from any YouTube link
function buildYouTubeEmbedUrl(sourceUrl: string): { videoId: string | null; channelId: string | null; embedUrl: string; watchUrl: string } | null {
  // Try video ID first
  const videoId = extractYouTubeId(sourceUrl);
  if (videoId) {
    return {
      videoId,
      channelId: null,
      embedUrl: `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1&origin=${window.location.origin}`,
      watchUrl: `https://www.youtube.com/watch?v=${videoId}`,
    };
  }
  // Try channel live stream
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

function extractTikTokVideoId(url: string): string | null {
  try {
    const m = url.match(/tiktok\.com\/@[^/]+\/video\/(\d+)/);
    if (m && m[1]) return m[1];
    const m2 = url.match(/vm\.tiktok\.com\/(\w+)/);
    if (m2 && m2[1]) return m2[1];
  } catch {}
  return null;
}

function isTikTokLive(url: string): boolean {
  return /tiktok\.com\/@[^/]+\/live/i.test(url);
}

function getSourceIcon(type: string) {
  switch (type) {
    case "youtube": return <SiYoutube className="w-5 h-5 text-red-500" />;
    case "facebook": return <SiFacebook className="w-5 h-5 text-blue-600" />;
    case "tiktok": return <SiTiktok className="w-5 h-5" />;
    case "restream": return <Cast className="w-5 h-5 text-green-500" />;
    case "hls": return <Signal className="w-5 h-5 text-purple-500" />;
    case "radio": return <Radio className="w-5 h-5 text-primary" />;
    default: return <Tv className="w-5 h-5 text-primary" />;
  }
}

function getSourceLabel(type: string) {
  switch (type) {
    case "youtube": return "YouTube";
    case "facebook": return "Facebook";
    case "tiktok": return "TikTok";
    case "restream": return "Restream";
    case "hls": return "Stream directo";
    case "radio": return "Radio";
    case "custom": return "Transmisión externa";
    default: return "En vivo";
  }
}

function PulsingDot({ color = "bg-red-500" }: { color?: string }) {
  return (
    <span className="relative flex h-3 w-3">
      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${color} opacity-75`} />
      <span className={`relative inline-flex rounded-full h-3 w-3 ${color}`} />
    </span>
  );
}

function AudioVisualizer({ isPlaying }: { isPlaying: boolean }) {
  return (
    <div className="flex items-end gap-[3px] h-8" aria-hidden>
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className={`w-1 rounded-full bg-primary/80 transition-all duration-300 ${isPlaying ? "animate-pulse" : ""}`}
          style={{
            height: isPlaying ? `${Math.random() * 100}%` : "15%",
            animationDelay: `${i * 0.08}s`,
            animationDuration: `${0.4 + Math.random() * 0.4}s`,
          }}
        />
      ))}
    </div>
  );
}

function RadioPlayer({ url, title }: { url: string; title?: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (!audioRef.current || !url) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setError(false);
      audioRef.current.src = url;
      audioRef.current.play().catch(() => setError(true));
      setIsPlaying(true);
    }
  };

  return (
    <div className="space-y-4">
      <audio
        ref={audioRef}
        onError={() => { setError(true); setIsPlaying(false); }}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="rounded-md bg-gradient-to-br from-orange-500/10 to-red-600/15 p-6 flex flex-col items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-orange-500/15 flex items-center justify-center">
          {isPlaying ? (
            <AudioVisualizer isPlaying={isPlaying} />
          ) : (
            <Radio className="w-10 h-10 text-primary" />
          )}
        </div>

        <div className="text-center">
          <p className="font-bold text-lg text-white">{title || "Avivando el Fuego Radio"}</p>
          <p className="text-xs text-orange-100/60 mt-1">
            {isPlaying ? "Reproduciendo..." : url ? "Listo para reproducir" : "Sin señal configurada"}
          </p>
        </div>

        {error && (
          <p className="text-xs text-red-400">No se pudo conectar con la emisora. Verifica la URL de la señal.</p>
        )}

        <div className="flex items-center gap-4">
          <Button
            size="icon"
            className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-200 via-orange-500 to-red-600 text-black shadow-[0_10px_30px_rgba(249,115,22,0.35)] hover:brightness-110"
            onClick={togglePlay}
            disabled={!url}
            data-testid="button-radio-play"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </Button>

          <Button
            size="icon"
            variant="ghost"
            className="text-orange-100 hover:bg-white/10"
            onClick={() => setIsMuted(!isMuted)}
            data-testid="button-radio-mute"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </Button>

          <input
            type="range"
            min={0}
            max={100}
            value={isMuted ? 0 : volume}
            onChange={(e) => { setVolume(Number(e.target.value)); setIsMuted(false); }}
            className="w-24 accent-orange-400"
            data-testid="slider-radio-volume"
          />
        </div>
      </div>
    </div>
  );
}

function YouTubePlayer({ sourceUrl }: { sourceUrl: string }) {
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

  // Load YouTube IFrame API and create player with proper error handling
  useEffect(() => {
    setEmbedError(false);
    setIsLoading(true);

    // Unique div id for this player instance
    const playerId = "yt-player-" + Date.now();
    if (playerContainerRef.current) {
      playerContainerRef.current.innerHTML = `<div id="${playerId}" style="width:100%;height:100%"></div>`;
    }

    // Destroy previous player
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
          autoplay: 1,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: () => {
            setIsLoading(false);
          },
          onError: (event: any) => {
            // Error codes: 2=invalid param, 5=HTML5 error, 100=not found, 101/150/153=embed restricted
            const code = event?.data;
            console.warn("YouTube Player Error:", code);
            if (code === 150 || code === 153 || code === 101 || code === 100) {
              setEmbedError(true);
              setIsLoading(false);
            } else if (code === 5) {
              // HTML5 player error - try reopening
              setEmbedError(true);
              setIsLoading(false);
            } else {
              setEmbedError(true);
              setIsLoading(false);
            }
          },
          onStateChange: (event: any) => {
            // -1=unstarted, 0=ended, 1=playing, 2=paused, 3=buffering, 5=cued
            if (event?.data === 1 || event?.data === 3) {
              setIsLoading(false);
              setEmbedError(false);
            }
          },
        },
      };

      // Use videoId or channel live_stream
      if (ytData.videoId) {
        playerConfig.videoId = ytData.videoId;
      } else if (ytData.channelId) {
        playerConfig.playerVars.channel = ytData.channelId;
        playerConfig.videoId = undefined;
        // For channel live streams, use the embed URL approach
        playerConfig.playerVars.listType = undefined;
      }

      try {
        playerRef.current = new (window as any).YT.Player(playerId, playerConfig);
      } catch (err) {
        console.error("Failed to create YT player:", err);
        setEmbedError(true);
        setIsLoading(false);
      }
    };

    // Load the YouTube IFrame API script if not already loaded
    if ((window as any).YT?.Player) {
      createPlayer();
    } else {
      // Set callback
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
        // Script already exists but API not ready yet — poll
        const interval = setInterval(() => {
          if ((window as any).YT?.Player) {
            clearInterval(interval);
            createPlayer();
          }
        }, 200);
        setTimeout(() => clearInterval(interval), 10000);
      }
    }

    // Fallback timeout: if nothing happens after 8 seconds, show error
    const fallbackTimer = setTimeout(() => {
      if (isLoading && !embedError) {
        // Check if player actually started playing
        try {
          const state = playerRef.current?.getPlayerState?.();
          if (state === undefined || state === -1 || state === null) {
            setEmbedError(true);
            setIsLoading(false);
          }
        } catch {
          // If we can't read state, probably an error
          setEmbedError(true);
          setIsLoading(false);
        }
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
      <div className="aspect-video w-full rounded-md overflow-hidden bg-gradient-to-br from-red-950 to-black flex flex-col items-center justify-center gap-4 p-6">
        <SiYoutube className="w-16 h-16 text-red-500" />
        <p className="text-white text-center font-medium text-lg">Este video no permite reproducirse aquí</p>
        <p className="text-white/60 text-sm text-center max-w-sm">
          El creador del video ha restringido su reproducción fuera de YouTube (error de embed).
          Puedes verlo directamente en YouTube haciendo clic abajo.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <Button
            variant="default"
            className="bg-red-600 hover:bg-red-700 text-white gap-2"
            onClick={() => window.open(ytData.watchUrl, "_blank")}
          >
            <SiYoutube className="w-5 h-5" /> Ver en YouTube
          </Button>
          <Button
            variant="outline"
            className="border-white/30 text-white/80 hover:text-white gap-2"
            onClick={() => {
              // Copy link to clipboard
              navigator.clipboard?.writeText(ytData.watchUrl);
            }}
          >
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
      {/* Fallback button always visible */}
      <div className="absolute bottom-2 right-2 z-10">
        <Button
          size="sm"
          variant="secondary"
          className="opacity-70 hover:opacity-100 text-xs gap-1"
          onClick={() => window.open(ytData.watchUrl, "_blank")}
        >
          <ExternalLink className="w-3 h-3" /> YouTube
        </Button>
      </div>
    </div>
  );
}

function HlsPlayer({ sourceUrl }: { sourceUrl: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !sourceUrl) return;

    setError(false);
    setLoading(true);

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        maxBufferLength: 10,
        maxMaxBufferLength: 30,
      });
      hlsRef.current = hls;
      hls.loadSource(sourceUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setLoading(false);
        video.play().catch(() => {});
      });
      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          setError(true);
          setLoading(false);
          if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
            setTimeout(() => hls.startLoad(), 3000);
          } else {
            hls.destroy();
          }
        }
      });
      return () => { hls.destroy(); hlsRef.current = null; };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Safari native HLS
      video.src = sourceUrl;
      video.addEventListener("loadedmetadata", () => {
        setLoading(false);
        video.play().catch(() => {});
      });
      video.addEventListener("error", () => { setError(true); setLoading(false); });
    } else {
      setError(true);
      setLoading(false);
    }
  }, [sourceUrl]);

  if (error) {
    return (
      <div className="aspect-video w-full rounded-md overflow-hidden bg-gradient-to-br from-purple-950 to-black flex flex-col items-center justify-center gap-4 p-6">
        <Signal className="w-16 h-16 text-purple-400" />
        <p className="text-white text-center font-medium">No se pudo conectar con el stream</p>
        <p className="text-white/60 text-sm text-center max-w-sm">
          Verifica que la URL del stream HLS sea correcta y que el servidor esté transmitiendo.
        </p>
        <Button
          variant="outline"
          className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
          onClick={() => { setError(false); setLoading(true); hlsRef.current?.startLoad(); }}
        >
          Reintentar conexión
        </Button>
      </div>
    );
  }

  return (
    <div className="aspect-video w-full rounded-md overflow-hidden bg-black relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
          <div className="flex flex-col items-center gap-2 text-white">
            <Signal className="w-8 h-8 animate-pulse text-purple-400" />
            <p className="text-sm">Conectando al stream...</p>
          </div>
        </div>
      )}
      <video
        ref={videoRef}
        className="w-full h-full"
        controls
        autoPlay
        playsInline
        data-testid="video-hls-player"
      />
    </div>
  );
}

function RestreamPlayer({ sourceUrl }: { sourceUrl: string }) {
  // Restream.io provides embeddable players via iframe
  // Example URL: https://player.restream.io/player/xxxxxxxx
  // Or custom Restream embed URLs
  const embedUrl = sourceUrl.includes("?") ? sourceUrl : `${sourceUrl}?autoplay=true`;

  return (
    <div className="aspect-video w-full rounded-md overflow-hidden bg-black relative">
      <iframe
        src={embedUrl}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        title="Restream - Transmision en Vivo"
        data-testid="iframe-restream-player"
        style={{ border: "none" }}
      />
      <div className="absolute bottom-2 right-2 z-10">
        <Button
          size="sm"
          variant="secondary"
          className="opacity-70 hover:opacity-100 text-xs gap-1"
          onClick={() => window.open(sourceUrl, "_blank")}
        >
          <ExternalLink className="w-3 h-3" /> Abrir Player
        </Button>
      </div>
    </div>
  );
}

function FacebookPlayer({ sourceUrl }: { sourceUrl: string }) {
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
            if (iframe) {
              setIsLoading(false);
            } else {
              renderIframeFallback();
            }
          }, 3000);
        });
      } catch {
        renderIframeFallback();
      }
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

    // Try loading Facebook SDK
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
        // Script exists but SDK not ready — fall back to iframe
        renderIframeFallback();
      }

      // Timeout: if SDK doesn't load in 6 seconds, use iframe fallback
      setTimeout(() => {
        if (!cancelled && !sdkRendered.current) {
          renderIframeFallback();
        }
      }, 6000);
    }

    return () => { cancelled = true; };
  }, [sourceUrl]);

  if (embedError) {
    return (
      <div className="aspect-video w-full rounded-md overflow-hidden bg-gradient-to-br from-blue-950 to-black flex flex-col items-center justify-center gap-4 p-6">
        <SiFacebook className="w-16 h-16 text-blue-500" />
        <p className="text-white text-center font-medium text-lg">No se pudo reproducir aquí</p>
        <p className="text-white/60 text-sm text-center max-w-sm">
          La transmisión de Facebook tiene restricciones de reproducción externa.
          Puedes verla directamente en Facebook.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <Button
            variant="default"
            className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
            onClick={() => window.open(sourceUrl, "_blank")}
          >
            <SiFacebook className="w-5 h-5" /> Ver en Facebook
          </Button>
          <Button
            variant="outline"
            className="border-white/30 text-white/80 hover:text-white gap-2"
            onClick={() => navigator.clipboard?.writeText(sourceUrl)}
          >
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
            <SiFacebook className="w-12 h-12 text-blue-500 animate-pulse" />
            <p className="text-white/70 text-sm">Cargando video de Facebook...</p>
          </div>
        </div>
      )}
      <div
        ref={containerRef}
        className="w-full h-full [&_iframe]:!w-full [&_iframe]:!h-full [&_.fb-video]:w-full [&_.fb-video]:h-full [&_.fb_iframe_widget]:w-full [&_.fb_iframe_widget]:h-full [&_span]:block [&_span]:w-full [&_span]:h-full"
        data-testid="facebook-player-container"
      />
      <div className="absolute bottom-2 right-2 z-10">
        <Button
          size="sm"
          variant="secondary"
          className="opacity-70 hover:opacity-100 text-xs gap-1"
          onClick={() => window.open(sourceUrl, "_blank")}
        >
          <ExternalLink className="w-3 h-3" /> Facebook
        </Button>
      </div>
    </div>
  );
}

function TikTokPlayer({ sourceUrl }: { sourceUrl: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [embedError, setEmbedError] = useState(false);
  const isLive = isTikTokLive(sourceUrl);
  const videoId = extractTikTokVideoId(sourceUrl);

  useEffect(() => {
    setIsLoading(true);
    setEmbedError(false);

    if (isLive || !videoId) {
      // TikTok Live cannot be embedded, or no video ID — show fallback
      setIsLoading(false);
      setEmbedError(true);
      return;
    }

    // For regular videos, load TikTok embed script
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
      <div className="aspect-video w-full rounded-md overflow-hidden bg-gradient-to-br from-gray-950 via-black to-pink-950/40 flex flex-col items-center justify-center gap-4 p-6">
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
            ? "TikTok Live no permite la reproducción embebida. Abre la transmisión directamente en TikTok para verla en vivo."
            : "No se pudo cargar el video de TikTok. Ábrelo directamente en la aplicación."}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <Button
            variant="default"
            className="bg-gradient-to-r from-pink-500 via-red-500 to-blue-500 hover:from-pink-600 hover:via-red-600 hover:to-blue-600 text-white gap-2"
            onClick={() => window.open(sourceUrl, "_blank")}
            data-testid="button-tiktok-open"
          >
            <SiTiktok className="w-5 h-5" />
            {isLive ? "Ver en TikTok Live" : "Ver en TikTok"}
          </Button>
          <Button
            variant="outline"
            className="border-white/30 text-white/80 hover:text-white gap-2"
            onClick={() => navigator.clipboard?.writeText(sourceUrl)}
          >
            <ExternalLink className="w-4 h-4" /> Copiar enlace
          </Button>
        </div>
      </div>
    );
  }

  // Embed regular TikTok video
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
        data-testid="iframe-tiktok-player"
      />
      <div className="absolute bottom-2 right-2 z-10">
        <Button
          size="sm"
          variant="secondary"
          className="opacity-70 hover:opacity-100 text-xs gap-1"
          onClick={() => window.open(sourceUrl, "_blank")}
        >
          <ExternalLink className="w-3 h-3" /> TikTok
        </Button>
      </div>
    </div>
  );
}

function VideoPlayer({ sourceType, sourceUrl }: { sourceType: string; sourceUrl: string }) {
  if (sourceType === "youtube") {
    return <YouTubePlayer sourceUrl={sourceUrl} />;
  }

  if (sourceType === "restream") {
    return <RestreamPlayer sourceUrl={sourceUrl} />;
  }

  if (sourceType === "hls") {
    return <HlsPlayer sourceUrl={sourceUrl} />;
  }

  if (sourceType === "facebook") {
    return <FacebookPlayer sourceUrl={sourceUrl} />;
  }

  if (sourceType === "tiktok") {
    return <TikTokPlayer sourceUrl={sourceUrl} />;
  }

  if (sourceType === "custom") {
    return (
      <div className="aspect-video w-full rounded-md overflow-hidden bg-black">
        <iframe
          src={sourceUrl}
          className="w-full h-full"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          title="Transmision en Vivo"
          data-testid="iframe-custom-player"
        />
      </div>
    );
  }

  return null;
}

/* ── Marco de pantalla de cine con escáner ───────────────────────── */
function CinemaScreen({ children, live }: { children: ReactNode; live: boolean }) {
  return (
    <div className="relative">
      <style>{`@keyframes avf-scan { 0% { top: 0.5rem; opacity: 0; } 8% { opacity: 1; } 92% { opacity: 1; } 100% { top: calc(100% - 3rem); opacity: 0; } }`}</style>
      {/* resplandor de proyección */}
      <div
        className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.16),transparent_70%)] blur-2xl"
        aria-hidden
      />
      <div className="relative rounded-lg border border-orange-300/25 bg-black p-2 shadow-[0_44px_130px_rgba(0,0,0,0.65)] md:p-3">
        {/* esquinas tácticas */}
        <span className="pointer-events-none absolute left-0 top-0 h-7 w-7 rounded-tl-lg border-l-2 border-t-2 border-orange-400" aria-hidden />
        <span className="pointer-events-none absolute right-0 top-0 h-7 w-7 rounded-tr-lg border-r-2 border-t-2 border-orange-400" aria-hidden />
        <span className="pointer-events-none absolute bottom-0 left-0 h-7 w-7 rounded-bl-lg border-b-2 border-l-2 border-orange-400" aria-hidden />
        <span className="pointer-events-none absolute bottom-0 right-0 h-7 w-7 rounded-br-lg border-b-2 border-r-2 border-orange-400" aria-hidden />
        {/* línea de escáner */}
        {live && (
          <span
            className="pointer-events-none absolute inset-x-3 z-20 h-8 rounded-full bg-gradient-to-b from-orange-400/12 to-transparent"
            style={{ animation: "avf-scan 5s ease-in-out infinite" }}
            aria-hidden
          />
        )}
        {children}
      </div>
    </div>
  );
}

export default function EnVivo() {
  const { data: config, isLoading, isError } = useLiveStreamConfig();
  const { user } = useAuth();

  const isLive = config?.isLive && config?.sourceType !== "radio" && config?.sourceUrl;
  const activeSource = isLive ? config.sourceType : "radio";

  return (
    <Layout>
      <section className="relative overflow-hidden bg-[#050203] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(255,91,0,0.28),transparent_45%),radial-gradient(circle_at_8%_80%,rgba(255,91,0,0.12),transparent_36%)]" aria-hidden />
        <div className="absolute inset-0 hero-grid-bg opacity-20" aria-hidden />
        <div className="absolute inset-x-0 top-0 h-1.5 fire-gradient" aria-hidden />

        <div className="relative mx-auto max-w-7xl px-4 py-10 md:py-14">
          {/* Marquesina */}
          <div className="mb-8 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/40 px-4 py-2 backdrop-blur">
                {isLive ? <PulsingDot /> : <span className="h-3 w-3 rounded-full bg-emerald-500" />}
                <span className="text-xs font-black uppercase tracking-[0.3em] text-orange-100" data-testid="badge-live-status">
                  {isLive ? "En vivo ahora" : "Radio 24/7 activa"}
                </span>
                <span className="hidden items-center gap-2 border-l border-white/10 pl-3 text-xs text-orange-50/70 sm:flex">
                  {getSourceIcon(activeSource)}
                  {getSourceLabel(activeSource)}
                </span>
              </div>
              <h1 className="heading-display text-[clamp(3rem,9vw,7.5rem)] leading-[0.9]" data-testid="text-live-title">
                {isLive && config?.title ? (
                  config.title
                ) : (
                  <>
                    Pantalla <span className="accent-serif fire-text lowercase">grande</span>
                  </>
                )}
              </h1>
            </div>
            <p className="accent-serif max-w-sm text-base text-orange-50/75 md:text-right md:text-lg">
              {isLive
                ? "Estamos transmitiendo en vivo. Conéctate ahora y sé parte de este momento especial."
                : "Cultos, reuniones y eventos en tiempo real — y la radio sonando las 24 horas."}
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_330px]">
            {/* ── La pantalla ── */}
            <div className="min-w-0 space-y-6">
              <CinemaScreen live={Boolean(isLive)}>
                {isLoading ? (
                  <div className="flex aspect-video items-center justify-center rounded-md bg-zinc-950">
                    <div className="flex flex-col items-center gap-2 text-orange-100/70">
                      <Signal className="w-8 h-8 animate-pulse" />
                      <p className="text-sm">Conectando...</p>
                    </div>
                  </div>
                ) : isError ? (
                  <div className="flex aspect-video items-center justify-center rounded-md bg-zinc-950">
                    <div className="flex flex-col items-center gap-2 px-6 text-center text-orange-100/70">
                      <Radio className="w-10 h-10 text-primary" />
                      <p className="font-bold text-lg text-white">Avivando el Fuego Radio</p>
                      <p className="text-sm max-w-xs">La señal está disponible. Vuelve pronto para escuchar nuestra programación en vivo.</p>
                    </div>
                  </div>
                ) : isLive ? (
                  <VideoPlayer sourceType={config.sourceType} sourceUrl={config.sourceUrl} />
                ) : (
                  <RadioPlayer
                    url={config?.radioUrl || ""}
                    title={config?.title || "Avivando el Fuego Radio"}
                  />
                )}
              </CinemaScreen>

              {/* Butaca técnica: estado + plataformas */}
              <div className="hud-frame flex flex-wrap items-center justify-between gap-4 rounded-md bg-black/40 px-5 py-4">
                <div className="flex items-center gap-3">
                  {isLive ? <PulsingDot /> : <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />}
                  <p className="data-label">{isLive ? `Transmitiendo por ${getSourceLabel(activeSource)}` : "Radio activa · señal propia"}</p>
                </div>
                <div className="flex items-center gap-4 text-orange-100/60">
                  <Radio className="h-4 w-4" />
                  <SiYoutube className="h-4 w-4" />
                  <SiFacebook className="h-4 w-4" />
                  <SiTiktok className="h-4 w-4" />
                  <Cast className="h-4 w-4" />
                  <Signal className="h-4 w-4" />
                </div>
              </div>

              {/* Radio de respaldo cuando hay video en vivo */}
              {isLive && config?.radioUrl && (
                <div className="hud-frame rounded-md bg-black/40 p-5" data-testid="card-radio-fallback">
                  <div className="mb-4 flex items-center gap-3">
                    <Radio className="w-5 h-5 text-primary" />
                    <p className="data-label">Mientras tanto, la radio sigue sonando</p>
                  </div>
                  <RadioPlayer url={config.radioUrl} title="Avivando el Fuego Radio" />
                </div>
              )}

              {/* Sala de transmisión (Jitsi) */}
              {user && (
                <div className="hud-frame rounded-md bg-black/40 p-5">
                  <p className="data-label mb-2">Cabina de transmisión</p>
                  <h2 className="heading-display mb-5 text-2xl md:text-3xl">Sala en vivo del ministerio</h2>
                  <LiveRoom
                    context="live"
                    contextId="main"
                    roomTitle="Transmision en Vivo - Culto"
                    canManage={isTeacherOrAdminRole(user.role)}
                    userName={user.displayName || user.username}
                    userEmail={user.email}
                    startLabel="Iniciar transmisión en vivo"
                    joinLabel="Unirse a la transmisión"
                    startDescription="Se creará una sala de video para transmitir un culto, reunión o evento en vivo. Todos los usuarios recibirán una notificación automática."
                  />
                </div>
              )}
            </div>

            {/* ── Cartelera lateral ── */}
            <div className="space-y-6">
              <div className="hud-frame rounded-md bg-black/40 p-5" data-testid="card-schedule">
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="flex items-center gap-2 font-display text-lg font-black uppercase tracking-wide">
                    <Calendar className="w-4 h-4 text-primary" />
                    Funciones
                  </h3>
                  <p className="data-label">Semanal</p>
                </div>
                <div className="divide-y divide-white/10">
                  {schedule.map((item) => (
                    <div
                      key={item.program}
                      className="flex items-center gap-4 py-4"
                      data-testid={`schedule-${item.program.replace(/\s/g, "-").toLowerCase()}`}
                    >
                      <p className="font-display w-24 shrink-0 text-xl font-black leading-none text-orange-300">
                        {item.time}
                      </p>
                      <div className="min-w-0">
                        <p className="truncate font-bold">{item.program}</p>
                        <p className="data-label mt-1">{item.type} · {item.day}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="hud-frame rounded-md bg-black/40 p-5" data-testid="card-connect-info">
                <h3 className="mb-4 flex items-center gap-2 font-display text-lg font-black uppercase tracking-wide">
                  <Music className="w-4 h-4 text-primary" />
                  Cómo conectarte
                </h3>
                <div className="space-y-3 text-sm text-orange-50/70">
                  <div className="flex items-start gap-3">
                    <Radio className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <p><span className="font-bold text-white">Radio 24/7:</span> música cristiana, predicaciones y enseñanzas las 24 horas.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Video className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <p><span className="font-bold text-white">En vivo:</span> cultos, reuniones y eventos transmitidos en tiempo real.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mic className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <p><span className="font-bold text-white">Interactivo:</span> participa con nosotros desde cualquier lugar del mundo.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
