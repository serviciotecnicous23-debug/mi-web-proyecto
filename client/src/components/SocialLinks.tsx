import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// ========== SOCIAL LINKS DISPLAY ==========
type SocialLinksData = {
  facebook?: string | null;
  instagram?: string | null;
  youtube?: string | null;
  tiktok?: string | null;
  twitter?: string | null;
  website?: string | null;
};

// SVG icons for social media (small inline SVGs to avoid dependency)
const SocialIcon = ({ type, className = "w-4 h-4" }: { type: string; className?: string }) => {
  switch (type) {
    case "facebook":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      );
    case "instagram":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
      );
    case "youtube":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      );
    case "tiktok":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
        </svg>
      );
    case "twitter":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      );
    case "website":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
        </svg>
      );
    default:
      return null;
  }
};

const SOCIAL_COLORS: Record<string, string> = {
  facebook: "text-[#1877F2] hover:text-[#1877F2]/80",
  instagram: "text-[#E4405F] hover:text-[#E4405F]/80",
  youtube: "text-[#FF0000] hover:text-[#FF0000]/80",
  tiktok: "text-foreground hover:text-foreground/80",
  twitter: "text-foreground hover:text-foreground/80",
  website: "text-primary hover:text-primary/80",
};

const SOCIAL_LABELS: Record<string, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  youtube: "YouTube",
  tiktok: "TikTok",
  twitter: "X (Twitter)",
  website: "Sitio Web",
};

export function SocialLinksDisplay({ data, size = "sm" }: { data: SocialLinksData; size?: "sm" | "md" }) {
  const links = Object.entries(data).filter(
    ([key, val]) => val && ["facebook", "instagram", "youtube", "tiktok", "twitter", "website"].includes(key)
  );

  if (links.length === 0) return null;

  const iconSize = size === "sm" ? "w-4 h-4" : "w-5 h-5";
  const btnSize = size === "sm" ? "w-7 h-7" : "w-8 h-8";

  return (
    <div className="flex flex-wrap items-center gap-1">
      {links.map(([key, value]) => {
        const url = value!.startsWith("http") ? value! : `https://${value}`;
        return (
          <a
            key={key}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center rounded-full ${btnSize} transition-colors ${SOCIAL_COLORS[key] || "text-muted-foreground"} bg-muted/50 hover:bg-muted`}
            title={SOCIAL_LABELS[key] || key}
          >
            <SocialIcon type={key} className={iconSize} />
          </a>
        );
      })}
    </div>
  );
}

// ========== SOCIAL LINKS FORM FIELDS ==========
type SocialLinksFormProps = {
  values: SocialLinksData;
  onChange: (field: string, value: string) => void;
};

const SOCIAL_FIELDS = [
  { key: "facebook", label: "Facebook", placeholder: "https://facebook.com/..." },
  { key: "instagram", label: "Instagram", placeholder: "https://instagram.com/..." },
  { key: "youtube", label: "YouTube", placeholder: "https://youtube.com/..." },
  { key: "tiktok", label: "TikTok", placeholder: "https://tiktok.com/@..." },
  { key: "twitter", label: "X (Twitter)", placeholder: "https://x.com/..." },
  { key: "website", label: "Sitio Web", placeholder: "https://..." },
];

export function SocialLinksFormFields({ values, onChange }: SocialLinksFormProps) {
  return (
    <div className="space-y-2">
      <Label className="text-xs font-semibold flex items-center gap-1">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
        </svg>
        Redes Sociales
      </Label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {SOCIAL_FIELDS.map(({ key, label, placeholder }) => (
          <div key={key} className="flex items-center gap-2">
            <div className={`shrink-0 ${SOCIAL_COLORS[key] || "text-muted-foreground"}`}>
              <SocialIcon type={key} className="w-4 h-4" />
            </div>
            <Input
              placeholder={placeholder}
              value={(values as any)[key] || ""}
              onChange={(e) => onChange(key, e.target.value)}
              className="h-8 text-xs"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ========== YOUTUBE LINK PREVIEW ==========
function extractYouTubeId(text: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export function YouTubeLinkPreview({ content }: { content: string }) {
  const videoId = extractYouTubeId(content);
  if (!videoId) return null;

  return (
    <div className="mt-2 rounded-lg overflow-hidden border bg-black/5">
      <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  );
}

// Utility to render post content with auto-linked URLs
export function PostContentWithLinks({ content }: { content: string }) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = content.split(urlRegex);

  return (
    <p className="text-sm mt-1 whitespace-pre-wrap">
      {parts.map((part, i) =>
        urlRegex.test(part) ? (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline hover:text-primary/80 break-all"
          >
            {part}
          </a>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </p>
  );
}
