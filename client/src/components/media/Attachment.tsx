import { FileAttachment } from "./FileAttachment";
import { LinkEmbed } from "./LinkEmbed";

/**
 * El adjunto de un material, anuncio o recurso, venga como archivo subido (fileData o
 * /files/...) o como enlace (Drive, YouTube, una página): se muestra para verlo aquí mismo.
 */
export function Attachment({
  fileData, fileUrl, fileName, fileSize, mime, compact, className = "",
}: {
  fileData?: string | null;
  fileUrl?: string | null;
  fileName?: string | null;
  fileSize?: number | null;
  mime?: string | null;
  compact?: boolean;
  className?: string;
}) {
  const link = fileUrl && fileUrl !== "uploaded" ? fileUrl.trim() : "";
  const stored = fileData || (link && !/^https?:\/\//i.test(link) ? link : "");
  if (stored) return <FileAttachment url={stored} name={fileName} size={fileSize} mime={mime} compact={compact} className={className} />;
  if (link) return <LinkEmbed url={link} compact={compact} className={className} />;
  return null;
}
