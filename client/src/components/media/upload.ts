import { fileExtension, fileTypeOf, type FileType } from "@shared/media";

export interface UploadedFile {
  url: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  fileType: FileType;
}

const MB = 1024 * 1024;

/** Lo que se puede elegir en el selector de archivos (el servidor vuelve a comprobarlo). */
export const ACCEPT_DOCUMENTS =
  ".pdf,.doc,.docx,.odt,.rtf,.xls,.xlsx,.ods,.csv,.ppt,.pptx,.pps,.ppsx,.odp,.txt,.md";
export const ACCEPT_ALL = `${ACCEPT_DOCUMENTS},image/*,audio/*,video/*,.heic,.heif,.m4a,.mp3,.mp4,.mov`;
export const ACCEPT_AUDIO = "audio/*,.mp3,.m4a,.aac,.ogg,.opus,.wav,.flac";

/** Igual que el servidor (server/media-routes.ts), para avisar antes de subir. */
export function maxSizeFor(type: FileType): number {
  switch (type) {
    case "image":
      return 25 * MB;
    case "audio":
    case "video":
      return 80 * MB;
    case "powerpoint":
      return 60 * MB;
    case "text":
    case "csv":
      return 10 * MB;
    default:
      return 40 * MB;
  }
}

/**
 * Fotos grandes: se reducen en el teléfono antes de subirlas (más rápido con datos móviles).
 * El servidor las vuelve a ajustar de todas formas.
 */
async function shrinkImage(file: File): Promise<File> {
  if (!file.type.startsWith("image/") || file.type === "image/gif" || file.size < 1.5 * MB) return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, 2560 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close?.();
    const blob: Blob | null = await new Promise((resolve) => canvas.toBlob(resolve, "image/webp", 0.85));
    if (!blob || blob.size >= file.size) return file;
    const ext = blob.type === "image/webp" ? "webp" : blob.type === "image/jpeg" ? "jpg" : "png";
    return new File([blob], file.name.replace(/\.[^.]+$/, "") + "." + ext, { type: blob.type });
  } catch {
    return file;
  }
}

export class UploadError extends Error {}

/** Revisa tipo y tamaño antes de subir; devuelve el mensaje de error o null. */
export function checkFile(file: File): string | null {
  const type = fileTypeOf(file.name, file.type);
  if (type === "archive" || (type === "other" && !fileExtension(file.name))) return "Ese tipo de archivo no se puede subir. Se aceptan PDF, Word, Excel, PowerPoint, texto, imágenes, audio y video.";
  const max = maxSizeFor(type);
  if (file.size > max) {
    const extra = type === "video" || type === "audio" ? " Súbelo a YouTube o Drive y pega aquí el enlace: se verá igual de bien." : "";
    return `El archivo pesa ${Math.round(file.size / MB)} MB y el máximo para este tipo es ${Math.round(max / MB)} MB.${extra}`;
  }
  return null;
}

/** Sube un archivo con barra de progreso (0 a 1). */
export async function uploadFile(file: File, opts: { folder?: string; onProgress?: (p: number) => void } = {}): Promise<UploadedFile> {
  const problem = checkFile(file);
  if (problem) throw new UploadError(problem);
  const ready = await shrinkImage(file);
  return new Promise((resolve, reject) => {
    const form = new FormData();
    form.append("file", ready);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `/api/upload/file${opts.folder ? `?carpeta=${encodeURIComponent(opts.folder)}` : ""}`);
    xhr.withCredentials = true;
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) opts.onProgress?.(e.loaded / e.total);
    };
    xhr.onload = () => {
      let data: any = null;
      try {
        data = JSON.parse(xhr.responseText);
      } catch {
        /* nada */
      }
      if (xhr.status >= 200 && xhr.status < 300 && data?.url) {
        resolve({ url: data.url, fileName: data.fileName, fileSize: data.fileSize, mimeType: data.mimeType, fileType: data.fileType });
      } else {
        reject(new UploadError(data?.message || (xhr.status === 401 ? "Inicia sesión para subir archivos." : "No se pudo subir el archivo. Revisa tu conexión e intenta de nuevo.")));
      }
    };
    xhr.onerror = () => reject(new UploadError("Se cortó la conexión mientras subía el archivo. Intenta de nuevo."));
    xhr.send(form);
  });
}
