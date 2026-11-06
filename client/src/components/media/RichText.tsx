import { useMemo } from "react";
import { splitTextWithLinks, classifyUrl } from "@shared/media";
import { PROVIDER_BRAND } from "./brand";
import { LinkEmbed } from "./LinkEmbed";

function shortLink(href: string) {
  try {
    const u = new URL(href);
    const path = (u.pathname + u.search).replace(/\/$/, "");
    const text = u.hostname.replace(/^(www\.|m\.)/, "") + (path.length > 1 ? path : "");
    return text.length > 42 ? `${text.slice(0, 40)}…` : text;
  } catch {
    return href;
  }
}

/**
 * Texto de una publicación, comentario o mensaje: los enlaces se pueden tocar (cortos, con
 * el ícono de su plataforma) y debajo aparecen como reproductor o tarjeta. Si el texto es
 * solo el enlace, se muestra solo la tarjeta.
 */
export function RichText({
  text,
  className = "",
  embeds = true,
  maxEmbeds = 2,
  compact = false,
  testId,
}: {
  text: string | null | undefined;
  className?: string;
  embeds?: boolean;
  maxEmbeds?: number;
  compact?: boolean;
  testId?: string;
}) {
  const parts = useMemo(() => splitTextWithLinks(text || ""), [text]);
  const links = useMemo(() => {
    const seen: string[] = [];
    for (const p of parts) if (p.type === "link" && p.href && !seen.includes(p.href) && classifyUrl(p.href)) seen.push(p.href);
    return seen.slice(0, maxEmbeds);
  }, [parts, maxEmbeds]);
  if (!text) return null;
  const onlyLink = embeds && links.length === 1 && parts.every((p) => p.type === "link" || !p.value.trim());

  return (
    <>
      {!onlyLink && (
        <p className={`whitespace-pre-wrap break-words ${className}`} data-testid={testId}>
          {parts.map((p, i) => {
            if (p.type === "text") return <span key={i}>{p.value}</span>;
            const info = classifyUrl(p.href!);
            const brand = info ? PROVIDER_BRAND[info.provider] : null;
            const Icon = brand && info && info.provider !== "web" ? brand.Icon : null;
            return (
              <a key={i} href={p.href} target="_blank" rel="noopener noreferrer" className="rich-link" title={p.href}>
                {Icon && <Icon className="rich-link__icon" style={{ color: brand!.color }} aria-hidden="true" />}
                {shortLink(p.href!)}
              </a>
            );
          })}
        </p>
      )}
      {embeds && links.map((url) => <LinkEmbed key={url} url={url} compact={compact} className="mt-2" />)}
    </>
  );
}
