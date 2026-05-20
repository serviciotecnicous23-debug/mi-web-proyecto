import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  Bell,
  CalendarClock,
  Clock3,
  Flame,
  FolderOpen,
  Headphones,
  Megaphone,
  Mic2,
  MonitorUp,
  Music2,
  Radio,
  Smartphone,
  Sparkles,
  Tv2,
  Volume2,
} from "lucide-react";
import { Layout } from "@/components/layout";
import { RadioInstallActions } from "@/components/RadioInstallActions";
import { RadioStationPlayer } from "@/components/RadioStationPlayer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useRadioStation } from "@/hooks/use-radio";
import {
  DEFAULT_AZURACAST_METADATA_URL,
  DEFAULT_AZURACAST_STATION_URL,
  DEFAULT_AZURACAST_STREAM_URL,
} from "@shared/radio";

const RADIO_BRAND_IMAGE =
  "https://40.160.2.176.sslip.io/static/uploads/avivando_el_fuego/radio-logo-woodfire-20260520.jpg";

const billboardItems = [
  {
    icon: Radio,
    title: "Senal oficial",
    text: "La transmision sale desde AzuraCast y se escucha aqui sin depender de plataformas externas.",
  },
  {
    icon: Megaphone,
    title: "Cartelera ministerial",
    text: "Este espacio queda listo para anuncios, vigilias, cultos, campanas y avisos de la radio.",
  },
  {
    icon: Headphones,
    title: "Audio continuo",
    text: "El reproductor usa controles nativos del telefono para escuchar mientras navegas o bloqueas la pantalla.",
  },
];

const activeBlocks = [
  {
    title: "Adoracion y ministracion continua",
    description: "Base principal para oracion, altar y busqueda de la presencia de Dios.",
    count: "144 audios",
    status: "Rotacion principal",
  },
  {
    title: "Alabanza y coros renovados",
    description: "Cantos con energia, coros y celebracion para levantar la fe.",
    count: "136 audios",
    status: "Rotacion principal",
  },
  {
    title: "Predicas programadas separadas",
    description: "Mensajes y ensenanzas sin pegar una predica inmediatamente despues de otra.",
    count: "19 audios",
    status: "Una por hora",
  },
  {
    title: "Separadores profesionales Avivando",
    description: "Identidad sonora de la emisora, transiciones, avisos e IDs finales.",
    count: "9 jingles",
    status: "Cada 4 canciones",
  },
  {
    title: "Biblia dramatizada y proverbios",
    description: "Capitulos de Mateo y Marcos dramatizados mas devocionales breves.",
    count: "37 audios",
    status: "Cada 14 canciones",
  },
  {
    title: "Audios del ministerio y especiales",
    description: "Material propio, notas pastorales y contenido especial de la comunidad.",
    count: "33 audios",
    status: "Cada 9 canciones",
  },
];

const installGuides = [
  {
    icon: Smartphone,
    title: "Android o Chrome",
    text: "Toca Instalar app gratis o abre el menu del navegador y elige Instalar app.",
  },
  {
    icon: MonitorUp,
    title: "iPhone o Safari",
    text: "Toca Compartir, luego Agregar a pantalla de inicio para abrirla como app.",
  },
  {
    icon: Volume2,
    title: "Segundo plano",
    text: "Despues de tocar play, usa los controles del telefono. Algunos navegadores pueden limitarlo.",
  },
];

const tiktokNotes = [
  {
    icon: Tv2,
    title: "Usar como escena",
    text: "Abre la escena vertical y capturala en TikTok Live Studio como ventana o fuente de navegador.",
  },
  {
    icon: Mic2,
    title: "Mejor uso recomendado",
    text: "Combinala con tu voz, camara, oracion, saludos y avisos; AzuraCast sigue siendo la radio 24/7.",
  },
  {
    icon: Sparkles,
    title: "Cuidado con derechos",
    text: "Para directos publicos, usa musica propia, autorizada o habla encima con volumen controlado.",
  },
];

const archiveSummary = "El archivo base anterior, la lista global y los jingles viejos quedaron fuera de la rotacion activa.";

function formatTime(value?: string) {
  if (!value) return "";
  return new Intl.DateTimeFormat("es", {
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(new Date(value));
}

function formatChicagoClock(date: Date) {
  return new Intl.DateTimeFormat("es", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Chicago",
  }).format(date);
}

type AzuraSong = {
  text?: string;
  artist?: string;
  title?: string;
};

type LiveSnapshot = {
  isOnline: boolean;
  listeners: number;
  playlist: string;
  song: string;
  nextPlaylist: string;
  nextSong: string;
};

function getSongText(song?: AzuraSong) {
  if (!song) return "";
  return song.text || [song.artist, song.title].filter(Boolean).join(" - ") || song.title || "";
}

function isLegacyRadioUrl(url?: string) {
  if (!url) return false;
  const lowerUrl = url.toLowerCase();
  return lowerUrl.includes("zeno.fm") || lowerUrl.includes("zenomedia.com");
}

function getLiveSnapshot(data: unknown): LiveSnapshot | null {
  const payload = Array.isArray(data) ? data[0] : data;
  if (!payload || typeof payload !== "object") return null;

  const record = payload as any;
  return {
    isOnline: Boolean(record.is_online),
    listeners: Number(record.listeners?.current ?? record.listeners?.total ?? 0),
    playlist: String(record.now_playing?.playlist || "AzuraCast AutoDJ"),
    song: getSongText(record.now_playing?.song) || "Avivando el Fuego Radio",
    nextPlaylist: String(record.playing_next?.playlist || "Rotacion automatica"),
    nextSong: getSongText(record.playing_next?.song) || "Programacion continua",
  };
}

function SceneBars() {
  return (
    <div className="flex h-14 items-end justify-center gap-1.5 md:h-20 md:gap-2" aria-hidden>
      {Array.from({ length: 28 }).map((_, index) => (
        <span
          key={index}
          className="w-2 rounded-full bg-gradient-to-t from-red-600 via-orange-400 to-amber-200 shadow-[0_0_18px_rgba(249,115,22,0.45)] animate-radio-bar"
          style={{
            height: `${28 + ((index * 23) % 68)}%`,
            animationDelay: `${index * 48}ms`,
          }}
        />
      ))}
    </div>
  );
}

export default function RadioPage() {
  const { data: station, isLoading, isError } = useRadioStation();
  const libraryTracks = station?.library.tracks ?? [];
  const provider = station?.provider;
  const effectiveStreamUrl =
    !station?.streamUrl || isLegacyRadioUrl(station.streamUrl) ? DEFAULT_AZURACAST_STREAM_URL : station.streamUrl;
  const effectiveMetadataUrl = station?.metadataUrl || DEFAULT_AZURACAST_METADATA_URL;
  const stationUrl =
    !provider?.stationUrl || isLegacyRadioUrl(provider.stationUrl) ? DEFAULT_AZURACAST_STATION_URL : provider.stationUrl;
  const isAzuraCastPrimary = provider?.isPrimary ?? effectiveStreamUrl.includes("sslip.io");
  const lastSync = station?.updatedAt ? formatTime(station.updatedAt) : "";
  const [clock, setClock] = useState(() => new Date());
  const [liveSnapshot, setLiveSnapshot] = useState<LiveSnapshot | null>(null);
  const streamHost = useMemo(() => {
    try {
      return new URL(effectiveStreamUrl).host;
    } catch {
      return "AzuraCast";
    }
  }, [effectiveStreamUrl]);

  useEffect(() => {
    const timer = window.setInterval(() => setClock(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!effectiveMetadataUrl) return;

    let cancelled = false;
    const loadLiveSnapshot = async () => {
      try {
        const response = await fetch(effectiveMetadataUrl, { cache: "no-store" });
        if (!response.ok) return;
        const snapshot = getLiveSnapshot(await response.json());
        if (!cancelled) setLiveSnapshot(snapshot);
      } catch {
        if (!cancelled) setLiveSnapshot(null);
      }
    };

    loadLiveSnapshot();
    const timer = window.setInterval(loadLiveSnapshot, 15000);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [effectiveMetadataUrl]);

  const clockText = formatChicagoClock(clock);

  return (
    <Layout>
      <section className="relative overflow-hidden bg-[#070203] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(255,91,0,0.36),transparent_32%),radial-gradient(circle_at_78%_12%,rgba(255,197,77,0.14),transparent_28%),radial-gradient(circle_at_50%_92%,rgba(255,91,0,0.22),transparent_42%)]" />
        <div
          className="absolute inset-0 opacity-[0.11] blur-2xl"
          style={{ backgroundImage: `url(${RADIO_BRAND_IMAGE})`, backgroundSize: "cover", backgroundPosition: "center" }}
          aria-hidden
        />
        <div className="absolute inset-0 hero-grid-bg opacity-30" aria-hidden />
        <div className="absolute inset-x-0 top-0 h-2 fire-gradient" aria-hidden />

        <div className="relative mx-auto max-w-7xl px-4 py-8 md:py-12">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-orange-300/40 bg-black/40 shadow-[0_0_34px_rgba(249,115,22,0.36)] md:h-20 md:w-20">
                <img src={RADIO_BRAND_IMAGE} alt="Avivando el Fuego Radio" className="h-full w-full object-cover" />
              </span>
              <div>
                <p className="font-display text-xs uppercase tracking-[0.28em] text-orange-200 md:text-sm">Avivando el Fuego</p>
                <h1 className="heading-display text-[clamp(2.8rem,7vw,6.8rem)] leading-none">Radio</h1>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-md border border-white/10 bg-white/10 px-4 py-3 text-right backdrop-blur">
                <p className="font-display text-3xl leading-none md:text-4xl">{clockText}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.26em] text-orange-200">Hora central</p>
              </div>
              <Button asChild variant="outline" className="border-orange-300/30 bg-white/10 text-white hover:bg-white/20">
                <a href="/radio-live-scene" target="_blank" rel="noreferrer">
                  <Mic2 className="h-4 w-4" />
                  Escena TikTok
                </a>
              </Button>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)] lg:items-center">
            <div className="min-w-0 space-y-6">
              <div className="relative mx-auto max-w-[520px] overflow-hidden rounded-[1.7rem] border border-orange-300/35 bg-black/40 p-2 shadow-[0_28px_90px_rgba(0,0,0,0.55),0_0_70px_rgba(249,115,22,0.24)] lg:mx-0">
                <img
                  src={RADIO_BRAND_IMAGE}
                  alt="Logo Avivando el Fuego Radio con mundo, fuego, audifonos y letras de lena"
                  className="aspect-square w-full rounded-[1.25rem] object-cover"
                />
              </div>

              <div className="inline-flex items-center gap-3 rounded-full border border-orange-300/25 bg-orange-500/15 px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-orange-100 md:text-sm">
                <Radio className="h-5 w-5" />
                {liveSnapshot?.isOnline || isAzuraCastPrimary ? "Transmitiendo en vivo" : "Conectando senal"}
              </div>

              <div>
                <p className="mb-3 text-sm uppercase tracking-[0.28em] text-orange-200 md:text-base">
                  {liveSnapshot?.playlist || "AzuraCast AutoDJ"}
                </p>
                <h2 className="heading-display max-w-full break-words text-[clamp(1.55rem,5.8vw,5.6rem)] leading-[1.02] [overflow-wrap:anywhere] md:max-w-4xl md:text-[clamp(2.4rem,5.8vw,5.6rem)] md:leading-[0.96]">
                  {liveSnapshot?.song || "Avivando el Fuego Radio"}
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-orange-50/82 md:text-xl">
                  Adoracion, alabanza, Palabra, separadores y predicacion desde el servidor propio del ministerio.
                </p>
              </div>

              <SceneBars />

              <div className="flex flex-col gap-2 sm:flex-row">
                <Button asChild className="fire-btn-primary w-full sm:w-auto">
                  <a href="#radio-player">
                    <Headphones className="h-4 w-4" />
                    Escuchar ahora
                  </a>
                </Button>
                <Button asChild variant="outline" className="w-full border-orange-300/30 bg-white/10 text-white hover:bg-white/20 sm:w-auto">
                  <a href={stationUrl} target="_blank" rel="noreferrer">
                    <ArrowUpRight className="h-4 w-4" />
                    Abrir radio publica
                  </a>
                </Button>
                <Button asChild variant="outline" className="w-full border-orange-300/30 bg-white/10 text-white hover:bg-white/20 sm:w-auto">
                  <a href="https://ministerioavivandoelfuego.com" target="_blank" rel="noreferrer">
                    <Flame className="h-4 w-4" />
                    Ministerio
                  </a>
                </Button>
              </div>

              <div className="grid gap-4 sm:grid-cols-[1fr_9rem]">
                <div className="rounded-md border border-white/10 bg-white/10 p-4 backdrop-blur md:p-5">
                  <p className="mb-2 text-xs uppercase tracking-[0.28em] text-orange-200">Siguiente</p>
                  <p className="line-clamp-2 text-lg font-semibold md:text-2xl">
                    {liveSnapshot?.nextSong || "AzuraCast selecciona el proximo audio"}
                  </p>
                </div>
                <div className="rounded-md border border-white/10 bg-white/10 p-4 text-center backdrop-blur md:p-5">
                  <Headphones className="mx-auto mb-2 h-7 w-7 text-orange-300" />
                  <p className="font-display text-4xl leading-none">{liveSnapshot?.listeners ?? 0}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.22em] text-orange-200">Oyentes</p>
                </div>
              </div>
            </div>

            <div id="radio-player" className="min-w-0 scroll-mt-24">
              {isLoading ? (
                <Skeleton className="h-72 w-full rounded-[2rem] bg-white/10" />
              ) : isError || !station ? (
                <Card className="border-orange-300/25 bg-black/45 text-white">
                  <CardContent className="flex items-center gap-3 p-6">
                    <Radio className="h-5 w-5 text-orange-300" />
                    <p className="text-sm text-orange-50/80">No se pudo cargar la configuracion de la radio.</p>
                  </CardContent>
                </Card>
              ) : (
                <RadioStationPlayer
                  streamUrl={effectiveStreamUrl}
                  title={station.name}
                  subtitle={station.slogan}
                  isConfigured={station.isConfigured}
                  metadataUrl={effectiveMetadataUrl}
                  playlist={effectiveStreamUrl.startsWith("/uploads/radio/") ? libraryTracks : []}
                  variant="scene"
                />
              )}

              <div className="mt-5 rounded-md border border-white/10 bg-white/10 p-4 backdrop-blur md:p-5">
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-display text-2xl leading-none text-white">Instalala como app</h3>
                    <p className="mt-2 text-sm text-orange-50/76">
                      Gratis desde cualquier navegador compatible. No necesitas descargar nada de una tienda.
                    </p>
                  </div>
                  <RadioInstallActions url="https://ministerioavivandoelfuego.com/radio" compact />
                </div>
                <div className="grid gap-3 md:grid-cols-3">
                  {installGuides.map((item) => (
                    <div key={item.title} className="rounded-md border border-orange-200/10 bg-black/20 p-3">
                      <item.icon className="mb-2 h-5 w-5 text-orange-300" />
                      <p className="text-sm font-bold text-white">{item.title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-orange-50/72">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <section className="border-b bg-card/30 py-8">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-4">
              <div className="mb-2 flex items-center justify-between gap-3">
                <p className="text-sm font-semibold">Ahora en vivo</p>
                <Badge variant={liveSnapshot?.isOnline ? "default" : "secondary"}>
                  {liveSnapshot?.isOnline ? "Online" : "Sin datos"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{liveSnapshot?.playlist || "AzuraCast AutoDJ"}</p>
              <p className="mt-1 line-clamp-2 font-bold">{liveSnapshot?.song || "Cargando informacion del servidor..."}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <p className="mb-2 text-sm font-semibold">Siguiente bloque</p>
              <p className="text-sm text-muted-foreground">{liveSnapshot?.nextPlaylist || "Rotacion automatica"}</p>
              <p className="mt-1 line-clamp-2 font-bold">{liveSnapshot?.nextSong || "AzuraCast selecciona el proximo audio"}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <p className="mb-2 text-sm font-semibold">Servidor</p>
              <p className="text-sm text-muted-foreground">{streamHost}</p>
              <p className="mt-1 font-bold">{liveSnapshot?.listeners ?? 0} oyentes conectados</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  Cartelera de la Radio
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                {billboardItems.map((item) => (
                  <div key={item.title} className="flex gap-3 rounded-md border bg-background/60 p-4">
                    <item.icon className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <h3 className="font-bold">{item.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{item.text}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tv2 className="h-5 w-5 text-primary" />
                  Escena TikTok Live
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  La escena vertical puede usarse como fondo o captura visual en un directo. El servidor de radio debe seguir siendo AzuraCast.
                </p>
                <div className="grid gap-3">
                  {tiktokNotes.map((item) => (
                    <div key={item.title} className="flex gap-3 rounded-md border bg-background/60 p-4">
                      <item.icon className="mt-1 h-5 w-5 shrink-0 text-primary" />
                      <div>
                        <h3 className="font-bold">{item.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button asChild variant="outline" className="w-full sm:w-auto">
                  <a href="/radio-live-scene" target="_blank" rel="noreferrer">
                    <Mic2 className="h-4 w-4" />
                    Abrir escena vertical
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FolderOpen className="h-5 w-5 text-primary" />
                  Programacion Activa
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 sm:grid-cols-2">
                {activeBlocks.map((block) => (
                  <div key={block.title} className="rounded-md border bg-background/60 p-4">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <h3 className="font-bold">{block.title}</h3>
                      <Badge variant="outline">{block.count}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{block.description}</p>
                    <p className="mt-3 text-xs font-medium text-primary">{block.status}</p>
                  </div>
                ))}
                <div className="rounded-md border bg-background/60 p-4 sm:col-span-2">
                  <h3 className="font-bold">Archivo base anterior</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{archiveSummary}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock3 className="h-5 w-5 text-primary" />
                  Operacion del AutoDJ
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                <div className="rounded-md border bg-background/60 p-4">
                  <h3 className="font-bold">AutoDJ propio</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Liquidsoap e Icecast manejan la lista activa desde el servidor. La pagina lee la playlist actual y la proxima pista desde AzuraCast.
                  </p>
                </div>
                <div className="rounded-md border bg-background/60 p-4">
                  <h3 className="font-bold">Predicas separadas</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Las predicas se programan en horarios concretos para evitar que una predica termine y empiece otra de inmediato.
                  </p>
                </div>
                <div className="rounded-md border bg-background/60 p-4">
                  <h3 className="font-bold">Ultima sincronizacion</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {lastSync || "La pagina consulta el servidor en vivo cada pocos segundos."}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="border-t bg-card/40 py-10">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 md:grid-cols-3">
          <div className="flex items-start gap-3">
            <Flame className="mt-1 h-5 w-5 text-primary" />
            <div>
              <h3 className="font-bold">Avivando el Fuego Radio</h3>
              <p className="mt-1 text-sm text-muted-foreground">La radio sostiene el ambiente espiritual y apunta de regreso al ministerio.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Music2 className="mt-1 h-5 w-5 text-primary" />
            <div>
              <h3 className="font-bold">Contenido vocal</h3>
              <p className="mt-1 text-sm text-muted-foreground">Adoracion, coros, Palabra, separadores y mensajes del ministerio.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CalendarClock className="mt-1 h-5 w-5 text-primary" />
            <div>
              <h3 className="font-bold">Lista para crecer</h3>
              <p className="mt-1 text-sm text-muted-foreground">La cartelera puede recibir anuncios, campanas y predicas nuevas del ministerio.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
