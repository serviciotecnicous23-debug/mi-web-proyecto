import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  Bell,
  Clock3,
  Disc3,
  Flame,
  Headphones,
  Megaphone,
  Mic2,
  MonitorUp,
  Radio,
  Smartphone,
  Sparkles,
  Tv2,
  Volume2,
} from "lucide-react";
import { Layout } from "@/components/layout";
import { RadioInstallActions } from "@/components/RadioInstallActions";
import { RadioStationPlayer } from "@/components/RadioStationPlayer";
import { Skeleton } from "@/components/ui/skeleton";
import { useRadioStation } from "@/hooks/use-radio";
import {
  DEFAULT_AZURACAST_LOGO_URL,
  DEFAULT_AZURACAST_METADATA_URL,
  DEFAULT_AZURACAST_STATION_URL,
  DEFAULT_AZURACAST_STREAM_URL,
  PUBLIC_SITE_RADIO_URL,
} from "@shared/radio";

const RADIO_BRAND_IMAGE = DEFAULT_AZURACAST_LOGO_URL;

const billboardItems = [
  {
    icon: Radio,
    title: "Señal oficial",
    text: "La transmisión sale desde AzuraCast y se escucha aquí sin depender de plataformas externas.",
  },
  {
    icon: Megaphone,
    title: "Cartelera ministerial",
    text: "Este espacio queda listo para anuncios, vigilias, cultos, campañas y avisos de la radio.",
  },
  {
    icon: Headphones,
    title: "Audio continuo",
    text: "El reproductor usa controles nativos del teléfono para escuchar mientras navegas o bloqueas la pantalla.",
  },
];

const activeBlocks = [
  {
    channel: "CH·01",
    title: "Adoración y ministración continua",
    description: "Base principal para oración, altar y búsqueda de la presencia de Dios.",
    count: "144 audios",
    status: "Rotación principal",
    level: 92,
  },
  {
    channel: "CH·02",
    title: "Alabanza y coros renovados",
    description: "Cantos con energía, coros y celebración para levantar la fe.",
    count: "136 audios",
    status: "Rotación principal",
    level: 86,
  },
  {
    channel: "CH·03",
    title: "Prédicas programadas separadas",
    description: "Mensajes y enseñanzas sin pegar una prédica inmediatamente después de otra.",
    count: "19 audios",
    status: "Una por hora",
    level: 58,
  },
  {
    channel: "CH·04",
    title: "Separadores profesionales Avivando",
    description: "Identidad sonora de la emisora, transiciones, avisos e IDs finales.",
    count: "9 jingles",
    status: "Cada 4 canciones",
    level: 44,
  },
  {
    channel: "CH·05",
    title: "Biblia dramatizada y proverbios",
    description: "Capítulos de Mateo y Marcos dramatizados más devocionales breves.",
    count: "37 audios",
    status: "Cada 14 canciones",
    level: 36,
  },
  {
    channel: "CH·06",
    title: "Audios del ministerio y especiales",
    description: "Material propio, notas pastorales y contenido especial de la comunidad.",
    count: "33 audios",
    status: "Cada 9 canciones",
    level: 50,
  },
];

const installGuides = [
  {
    icon: Smartphone,
    title: "Android o Chrome",
    text: "Toca Instalar app gratis o abre el menú del navegador y elige Instalar app.",
  },
  {
    icon: MonitorUp,
    title: "iPhone o Safari",
    text: "Toca Compartir, luego Agregar a pantalla de inicio para abrirla como app.",
  },
  {
    icon: Volume2,
    title: "Segundo plano",
    text: "Después de tocar play, usa los controles del teléfono. Algunos navegadores pueden limitarlo.",
  },
];

const tiktokNotes = [
  {
    icon: Tv2,
    title: "Usar como escena",
    text: "Abre la escena vertical y captúrala en TikTok Live Studio como ventana o fuente de navegador.",
  },
  {
    icon: Mic2,
    title: "Mejor uso recomendado",
    text: "Combínala con tu voz, cámara, oración, saludos y avisos; AzuraCast sigue siendo la radio 24/7.",
  },
  {
    icon: Sparkles,
    title: "Cuidado con derechos",
    text: "Para directos públicos, usa música propia, autorizada o habla encima con volumen controlado.",
  },
];

const archiveSummary =
  "El archivo base anterior, la lista global y los jingles viejos quedaron fuera de la rotación activa.";

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
    second: "2-digit",
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
    nextPlaylist: String(record.playing_next?.playlist || "Rotación automática"),
    nextSong: getSongText(record.playing_next?.song) || "Programación continua",
  };
}

/* ── Disco de vinilo fundido ─────────────────────────────────────── */
function MoltenDisc({ spinning }: { spinning: boolean }) {
  return (
    <div className="relative mx-auto w-full max-w-[420px]">
      {/* halo de brasa */}
      <div
        className="absolute -inset-8 rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.32),transparent_62%)] blur-2xl"
        aria-hidden
      />
      {/* disco */}
      <div
        className={`relative aspect-square w-full rounded-full border border-orange-300/25 shadow-[0_30px_90px_rgba(0,0,0,0.6),0_0_60px_rgba(249,115,22,0.25)] ${
          spinning ? "animate-[spin_14s_linear_infinite]" : ""
        }`}
        style={{
          background:
            "repeating-radial-gradient(circle at center, #0d0608 0px, #0d0608 3px, #1a0c0a 4px, #0d0608 6px), conic-gradient(from 120deg, rgba(249,115,22,0.0), rgba(249,115,22,0.22) 18%, rgba(255,197,77,0.1) 32%, rgba(249,115,22,0.0) 55%, rgba(220,38,38,0.16) 78%, rgba(249,115,22,0.0))",
          backgroundBlendMode: "screen",
        }}
      >
        {/* reflejo de luz fija que el giro hace brillar */}
        <div
          className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,rgba(255,255,255,0.07)_24deg,transparent_60deg,transparent_180deg,rgba(255,255,255,0.05)_210deg,transparent_250deg)]"
          aria-hidden
        />
        {/* etiqueta central con el logo */}
        <div className="absolute inset-[27%] overflow-hidden rounded-full border-4 border-black/70 shadow-[0_0_30px_rgba(249,115,22,0.4)]">
          <img
            src={RADIO_BRAND_IMAGE}
            alt="Logo Avivando el Fuego Radio con mundo, fuego, audífonos y letras de leña"
            className="h-full w-full object-cover"
          />
        </div>
        {/* eje */}
        <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-200 shadow-[0_0_12px_rgba(255,197,77,0.9)]" />
      </div>
      {/* brazo de la tornamesa */}
      <div className="pointer-events-none absolute -right-3 -top-3 hidden h-28 w-28 md:block" aria-hidden>
        <div className="absolute right-6 top-6 h-4 w-4 rounded-full border border-orange-300/40 bg-black/80 shadow-[0_0_14px_rgba(249,115,22,0.45)]" />
        <div className="absolute right-8 top-8 h-24 w-[3px] origin-top rotate-[28deg] rounded-full bg-gradient-to-b from-orange-200/70 via-orange-400/50 to-red-600/60" />
      </div>
    </div>
  );
}

/* ── Ecualizador de consola ──────────────────────────────────────── */
function ConsoleEqualizer({ active }: { active: boolean }) {
  return (
    <div className="flex h-16 items-end gap-[5px] md:h-24 md:gap-2" aria-hidden>
      {Array.from({ length: 32 }).map((_, index) => (
        <span
          key={index}
          className={`w-1.5 rounded-t-sm bg-gradient-to-t from-red-700 via-orange-500 to-amber-200 shadow-[0_0_14px_rgba(249,115,22,0.5)] md:w-2 ${
            active ? "animate-radio-bar" : "opacity-30"
          }`}
          style={{
            height: active ? `${22 + ((index * 29) % 74)}%` : "12%",
            animationDelay: `${index * 42}ms`,
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
  const onAir = liveSnapshot?.isOnline || isAzuraCastPrimary;
  const tickerText = `Ahora suena · ${liveSnapshot?.song || "Avivando el Fuego Radio"} · Siguiente · ${
    liveSnapshot?.nextSong || "Programación continua"
  } · Señal propia 24/7 · ${liveSnapshot?.playlist || "AzuraCast AutoDJ"}`;

  return (
    <Layout>
      {/* ═══ CONSOLA EN VIVO ═══════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#070203] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(255,91,0,0.34),transparent_34%),radial-gradient(circle_at_82%_10%,rgba(255,197,77,0.12),transparent_30%),radial-gradient(circle_at_55%_95%,rgba(255,91,0,0.2),transparent_44%)]" />
        <div className="absolute inset-0 hero-grid-bg opacity-25" aria-hidden />
        <div className="absolute inset-x-0 top-0 h-1.5 fire-gradient" aria-hidden />
        {/* RADIO gigante como marca de agua */}
        <p
          className="heading-display pointer-events-none absolute -right-6 top-10 select-none text-[clamp(7rem,22vw,20rem)] leading-none text-white/[0.035]"
          aria-hidden
        >
          RADIO
        </p>

        <div className="relative mx-auto max-w-7xl px-4 py-10 md:py-16">
          {/* Barra superior de cabina */}
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4 rounded-md border border-white/10 bg-black/40 px-4 py-3 backdrop-blur md:px-6">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                {onAir && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-70" />
                )}
                <span className={`relative inline-flex h-3 w-3 rounded-full ${onAir ? "bg-red-500" : "bg-zinc-600"}`} />
              </span>
              <p className="font-display text-sm font-black uppercase tracking-[0.3em] md:text-base">
                {onAir ? "En el aire" : "Conectando señal"}
              </p>
            </div>
            <p className="data-label hidden md:block">Avivando el Fuego · Señal propia 24/7</p>
            <div className="flex items-center gap-4">
              <p className="font-display text-xl leading-none tabular-nums md:text-2xl">{clockText}</p>
              <span className="data-label">Hora central</span>
            </div>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            {/* Disco fundido */}
            <div className="order-2 lg:order-1">
              <MoltenDisc spinning={onAir} />
              <div className="mt-6 flex items-center justify-center gap-3 text-center">
                <Disc3 className="h-4 w-4 text-orange-300" />
                <p className="data-label">
                  {liveSnapshot?.playlist || "AzuraCast AutoDJ"} · {liveSnapshot?.listeners ?? 0} oyentes
                </p>
              </div>
            </div>

            {/* Consola */}
            <div className="order-1 min-w-0 lg:order-2">
              <span className="glass-pill mb-5 inline-block text-xs">Radio en vivo</span>
              <h1 className="heading-display text-[clamp(3rem,9vw,7.5rem)] leading-[0.92]">
                La <span className="fire-text">consola</span>
                <br />
                del avivamiento<span className="accent-serif">.</span>
              </h1>
              <p className="accent-serif mt-5 max-w-xl text-lg text-orange-50/80 md:text-xl">
                Adoración, alabanza, Palabra y predicación — transmitidas desde el servidor propio del ministerio,
                sin depender de nadie.
              </p>

              {/* Consola: ahora suena + play protagonista */}
              <div
                id="radio-player"
                className="mt-8 min-w-0 scroll-mt-24 rounded-md border border-orange-300/20 bg-black/45 p-6 backdrop-blur md:p-8"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="data-label">Ahora suena</p>
                  <p className="data-label text-orange-300">{liveSnapshot?.playlist || "AzuraCast AutoDJ"}</p>
                </div>
                <p className="heading-display mt-2 break-words text-[clamp(1.3rem,3.2vw,2.1rem)] leading-tight [overflow-wrap:anywhere]">
                  {liveSnapshot?.song || "Avivando el Fuego Radio"}
                </p>
                <div className="mt-5">
                  <ConsoleEqualizer active={onAir} />
                </div>
                <div className="mt-8">
                  {isLoading ? (
                    <Skeleton className="mx-auto h-32 w-32 rounded-full bg-white/10" />
                  ) : isError || !station ? (
                    <div className="flex items-center justify-center gap-3 text-sm text-orange-50/80">
                      <Radio className="h-5 w-5 shrink-0 text-orange-300" />
                      No se pudo cargar la configuración de la radio.
                    </div>
                  ) : (
                    <RadioStationPlayer
                      streamUrl={effectiveStreamUrl}
                      title={station.name}
                      subtitle={station.slogan}
                      isConfigured={station.isConfigured}
                      metadataUrl={effectiveMetadataUrl}
                      playlist={effectiveStreamUrl.startsWith("/uploads/radio/") ? libraryTracks : []}
                      variant="console"
                    />
                  )}
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={stationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-orange-300/25 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  <ArrowUpRight className="h-4 w-4" />
                  Abrir radio pública
                </a>
                <a
                  href="/radio-live-scene"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-orange-300/25 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  <Mic2 className="h-4 w-4" />
                  Escena TikTok
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Cinta transportadora con la señal */}
        <div className="marquee-strip border-t border-orange-300/15 bg-black/60 py-3">
          <div className="marquee-track font-display text-sm font-bold uppercase tracking-[0.24em] text-orange-200/90">
            <span className="mx-6">{tickerText}</span>
            <span className="mx-6">{tickerText}</span>
          </div>
        </div>
      </section>

      {/* ═══ MESA DE MEZCLAS — PROGRAMACIÓN ACTIVA ═════════════════ */}
      <section className="relative overflow-hidden bg-[#0b0506] py-14 text-white md:py-20">
        <div className="absolute inset-0 hero-grid-bg opacity-15" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4">
          <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="glass-pill mb-4 inline-block text-xs">Programación activa</span>
              <h2 className="heading-display text-4xl md:text-6xl">
                Mesa de <span className="fire-text">mezclas</span>
              </h2>
            </div>
            <p className="accent-serif max-w-md text-orange-50/65">
              Seis canales alimentan la rotación: el AutoDJ los mezcla según su peso y horario.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {activeBlocks.map((block) => (
              <div
                key={block.title}
                className="hud-frame group flex flex-col rounded-md bg-black/45 p-4 transition hover:bg-black/60"
              >
                <p className="data-label mb-3">{block.channel}</p>
                {/* Fader del canal */}
                <div className="relative mx-auto mb-4 h-36 w-2.5 rounded-full bg-white/10 md:h-44">
                  <div
                    className="absolute bottom-0 left-0 w-full rounded-full bg-gradient-to-t from-red-700 via-orange-500 to-amber-300 shadow-[0_0_16px_rgba(249,115,22,0.45)]"
                    style={{ height: `${block.level}%` }}
                  />
                  <div
                    className="absolute left-1/2 h-4 w-7 -translate-x-1/2 rounded-sm border border-orange-200/50 bg-zinc-900 shadow-[0_2px_8px_rgba(0,0,0,0.6)] transition group-hover:border-orange-300"
                    style={{ bottom: `calc(${block.level}% - 8px)` }}
                  />
                </div>
                <h3 className="text-sm font-bold leading-snug">{block.title}</h3>
                <p className="mt-2 hidden text-xs leading-relaxed text-orange-50/60 md:block">{block.description}</p>
                <div className="mt-auto pt-3">
                  <p className="text-xs font-semibold text-orange-300">{block.count}</p>
                  <p className="data-label mt-1">{block.status}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="hud-frame rounded-md p-5">
              <p className="data-label mb-2">Siguiente bloque</p>
              <p className="text-sm text-orange-50/70">{liveSnapshot?.nextPlaylist || "Rotación automática"}</p>
              <p className="mt-1 line-clamp-2 font-bold">
                {liveSnapshot?.nextSong || "AzuraCast selecciona el próximo audio"}
              </p>
            </div>
            <div className="hud-frame rounded-md p-5">
              <p className="data-label mb-2">Servidor</p>
              <p className="text-sm text-orange-50/70">{streamHost}</p>
              <p className="mt-1 font-bold">{liveSnapshot?.listeners ?? 0} oyentes conectados</p>
            </div>
            <div className="hud-frame rounded-md p-5">
              <p className="data-label mb-2">Última sincronización</p>
              <p className="text-sm text-orange-50/70">
                {lastSync || "La página consulta el servidor en vivo cada pocos segundos."}
              </p>
              <p className="mt-1 font-bold">Liquidsoap + Icecast</p>
            </div>
          </div>

          <p className="mt-6 text-xs text-orange-50/45">{archiveSummary}</p>
        </div>
      </section>

      {/* ═══ CABINA — APP, CARTELERA Y ESCENA ══════════════════════ */}
      <section className="py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 lg:grid-cols-3">
          {/* Instalar app */}
          <div className="glass-card gradient-ring p-6 md:p-7">
            <p className="data-label mb-2">Llévala contigo</p>
            <h3 className="font-display text-2xl font-bold uppercase tracking-wide">Instálala como app</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Gratis desde cualquier navegador compatible. No necesitas descargar nada de una tienda.
            </p>
            <div className="mt-4">
              <RadioInstallActions url={PUBLIC_SITE_RADIO_URL} compact />
            </div>
            <div className="mt-5 space-y-3">
              {installGuides.map((item) => (
                <div key={item.title} className="flex gap-3 rounded-md border bg-background/60 p-3">
                  <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-bold">{item.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cartelera */}
          <div className="glass-card p-6 md:p-7">
            <p className="data-label mb-2">Cabina informativa</p>
            <h3 className="flex items-center gap-2 font-display text-2xl font-bold uppercase tracking-wide">
              <Bell className="h-5 w-5 text-primary" />
              Cartelera de la radio
            </h3>
            <div className="mt-5 space-y-3">
              {billboardItems.map((item) => (
                <div key={item.title} className="flex gap-3 rounded-md border bg-background/60 p-4">
                  <span className="icon-chip-fire h-10 w-10 shrink-0">
                    <item.icon className="h-5 w-5 text-primary" />
                  </span>
                  <div>
                    <p className="text-sm font-bold">{item.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.text}</p>
                  </div>
                </div>
              ))}
              <div className="rounded-md border bg-background/60 p-4">
                <div className="mb-1 flex items-center gap-2">
                  <Clock3 className="h-4 w-4 text-primary" />
                  <p className="text-sm font-bold">Prédicas separadas</p>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Las prédicas se programan en horarios concretos para evitar que una termine y empiece otra de
                  inmediato.
                </p>
              </div>
            </div>
          </div>

          {/* Escena TikTok */}
          <div className="glass-card p-6 md:p-7">
            <p className="data-label mb-2">Para creadores</p>
            <h3 className="flex items-center gap-2 font-display text-2xl font-bold uppercase tracking-wide">
              <Tv2 className="h-5 w-5 text-primary" />
              Escena TikTok Live
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              La escena vertical puede usarse como fondo o captura visual en un directo. El servidor de radio sigue
              siendo AzuraCast.
            </p>
            <div className="mt-4 space-y-3">
              {tiktokNotes.map((item) => (
                <div key={item.title} className="flex gap-3 rounded-md border bg-background/60 p-3">
                  <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-bold">{item.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <a
              href="/radio-live-scene"
              target="_blank"
              rel="noreferrer"
              className="fire-btn-primary mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold"
            >
              <Mic2 className="h-4 w-4" />
              Abrir escena vertical
            </a>
          </div>
        </div>
      </section>

      {/* ═══ CIERRE ════════════════════════════════════════════════ */}
      <section className="border-t bg-card/40 py-10">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <Flame className="mx-auto mb-3 h-6 w-6 text-primary" />
          <p className="heading-display text-2xl md:text-3xl">
            La radio sostiene el ambiente espiritual<span className="accent-serif"> — y apunta de regreso al ministerio.</span>
          </p>
        </div>
      </section>
    </Layout>
  );
}
