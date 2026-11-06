import type { ComponentType } from "react";
import {
  SiYoutube, SiVimeo, SiFacebook, SiInstagram, SiTiktok, SiX, SiSpotify, SiSoundcloud, SiTwitch,
  SiDailymotion, SiGoogledrive, SiGoogledocs, SiGooglesheets, SiGoogleslides, SiDropbox,
} from "react-icons/si";
import {
  Globe, FileText, FileSpreadsheet, Presentation, FileImage, FileAudio, FileVideo, FileArchive, File as FileIcon, FileType2, Link2,
} from "lucide-react";
import { PROVIDER_LABELS, FILE_TYPE_LABELS, type FileType, type MediaProvider } from "@shared/media";

type Icon = ComponentType<{ className?: string; style?: React.CSSProperties }>;

/** Marca de cada plataforma: ícono y colores para que se reconozca de un vistazo. */
/** poster: fondo de la portada cuando la red no da miniatura (Instagram, TikTok, X). */
export const PROVIDER_BRAND: Record<MediaProvider, { Icon: Icon; color: string; badge: string; poster?: string }> = {
  youtube: { Icon: SiYoutube, color: "#FF0000", badge: "linear-gradient(135deg,#ff2a2a,#c4000b)" },
  vimeo: { Icon: SiVimeo, color: "#1AB7EA", badge: "linear-gradient(135deg,#1ab7ea,#0d7fa8)" },
  facebook: { Icon: SiFacebook, color: "#1877F2", badge: "linear-gradient(135deg,#2d8cff,#1259c3)", poster: "radial-gradient(circle at 30% 20%, rgba(255,255,255,.18), transparent 45%), linear-gradient(160deg,#1877f2,#0b3d91)" },
  instagram: { Icon: SiInstagram, color: "#E1306C", badge: "linear-gradient(135deg,#feda75,#fa7e1e 25%,#d62976 55%,#962fbf 80%,#4f5bd5)", poster: "radial-gradient(circle at 20% 110%, #feda75 0%, #fa7e1e 18%, #d62976 42%, #962fbf 66%, #4f5bd5 92%)" },
  tiktok: { Icon: SiTiktok, color: "#25F4EE", badge: "linear-gradient(135deg,#111,#000)", poster: "radial-gradient(circle at 22% 18%, rgba(37,244,238,.42), transparent 42%), radial-gradient(circle at 82% 86%, rgba(254,44,85,.45), transparent 44%), #07070b" },
  x: { Icon: SiX, color: "#e7e9ea", badge: "linear-gradient(135deg,#222,#000)", poster: "radial-gradient(circle at 30% 20%, rgba(255,255,255,.12), transparent 45%), #050505" },
  spotify: { Icon: SiSpotify, color: "#1DB954", badge: "linear-gradient(135deg,#1ed760,#118a3d)" },
  soundcloud: { Icon: SiSoundcloud, color: "#FF5500", badge: "linear-gradient(135deg,#ff7700,#ff3300)" },
  twitch: { Icon: SiTwitch, color: "#9146FF", badge: "linear-gradient(135deg,#a970ff,#6c2bd9)" },
  dailymotion: { Icon: SiDailymotion, color: "#00AAFF", badge: "linear-gradient(135deg,#0a0a0a,#1f2937)" },
  drive: { Icon: SiGoogledrive, color: "#34A853", badge: "linear-gradient(135deg,#1fa463,#0f7a43)" },
  docs: { Icon: SiGoogledocs, color: "#4285F4", badge: "linear-gradient(135deg,#4f8ef7,#2a62c9)" },
  sheets: { Icon: SiGooglesheets, color: "#0F9D58", badge: "linear-gradient(135deg,#16a765,#0b7a43)" },
  slides: { Icon: SiGoogleslides, color: "#F4B400", badge: "linear-gradient(135deg,#f6c026,#d99400)" },
  dropbox: { Icon: SiDropbox, color: "#0061FF", badge: "linear-gradient(135deg,#1a73ff,#0047c2)" },
  file: { Icon: FileIcon, color: "#fb923c", badge: "linear-gradient(135deg,#f97316,#c2410c)" },
  web: { Icon: Globe, color: "#fb923c", badge: "linear-gradient(135deg,#334155,#1e293b)" },
};

export const FILE_BRAND: Record<FileType, { Icon: Icon; color: string; tag: string }> = {
  pdf: { Icon: FileType2, color: "#ef4444", tag: "PDF" },
  word: { Icon: FileText, color: "#2b7cd3", tag: "DOC" },
  excel: { Icon: FileSpreadsheet, color: "#21a366", tag: "XLS" },
  powerpoint: { Icon: Presentation, color: "#d24726", tag: "PPT" },
  text: { Icon: FileText, color: "#94a3b8", tag: "TXT" },
  csv: { Icon: FileSpreadsheet, color: "#21a366", tag: "CSV" },
  image: { Icon: FileImage, color: "#a855f7", tag: "IMG" },
  audio: { Icon: FileAudio, color: "#f59e0b", tag: "AUDIO" },
  video: { Icon: FileVideo, color: "#ec4899", tag: "VIDEO" },
  archive: { Icon: FileArchive, color: "#78716c", tag: "ZIP" },
  other: { Icon: FileIcon, color: "#94a3b8", tag: "ARCHIVO" },
};

export function providerLabel(provider: MediaProvider, siteName?: string) {
  if (provider === "web") return siteName || "Enlace";
  return PROVIDER_LABELS[provider];
}

/** Etiqueta con la marca (ícono + nombre), p. ej. sobre la miniatura de un video. */
export function ProviderBadge({ provider, siteName, className = "" }: { provider: MediaProvider; siteName?: string; className?: string }) {
  const brand = PROVIDER_BRAND[provider];
  const Icon = provider === "web" ? Link2 : brand.Icon;
  return (
    <span className={`media-badge ${className}`} style={{ background: brand.badge }}>
      <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      <span className="truncate">{providerLabel(provider, siteName)}</span>
    </span>
  );
}

export function FileTypeIcon({ type, className = "h-6 w-6" }: { type: FileType; className?: string }) {
  const brand = FILE_BRAND[type];
  return <brand.Icon className={className} style={{ color: brand.color }} aria-hidden="true" />;
}

export function fileTypeLabel(type: FileType) {
  return FILE_TYPE_LABELS[type];
}

export function formatBytes(bytes?: number | null) {
  if (!bytes || bytes <= 0) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  const mb = bytes / (1024 * 1024);
  return `${mb < 10 ? mb.toFixed(1).replace(".", ",") : Math.round(mb)} MB`;
}
