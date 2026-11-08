/**
 * Fotos y notas de voz del chat: las fotos se reducen en el teléfono antes de subir (menos
 * datos y menos espacio en el servidor) y las notas de voz se graban comprimidas (Opus).
 */

export type PreparedImage = { file: File; width: number; height: number };

/** Reduce una foto a 1600 px por lado (JPEG/WebP ~80 %). GIF y lo que no se pueda leer, igual. */
export async function prepareImage(file: File, maxSide = 1600): Promise<PreparedImage> {
  if (!file.type.startsWith("image/") || file.type === "image/gif") return { file, width: 0, height: 0 };
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));
    if (scale === 1 && file.size < 600 * 1024) {
      bitmap.close?.();
      return { file, width, height };
    }
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d")!.drawImage(bitmap, 0, 0, width, height);
    bitmap.close?.();
    const blob: Blob | null = await new Promise((resolve) => canvas.toBlob(resolve, "image/webp", 0.8));
    if (!blob || blob.size >= file.size) return { file, width, height };
    const ext = blob.type === "image/webp" ? "webp" : blob.type === "image/png" ? "png" : "jpg";
    return { file: new File([blob], `${file.name.replace(/\.[^.]+$/, "") || "foto"}.${ext}`, { type: blob.type }), width, height };
  } catch {
    return { file, width: 0, height: 0 };
  }
}

export function formatDuration(seconds: number | null | undefined): string {
  const s = Math.max(0, Math.round(seconds || 0));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

export function formatBytes(bytes: number | null | undefined): string {
  if (!bytes && bytes !== 0) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1).replace(".", ",")} MB`;
}

const VOICE_TYPES = [
  { mime: "audio/webm;codecs=opus", ext: "weba" },
  { mime: "audio/ogg;codecs=opus", ext: "ogg" },
  { mime: "audio/mp4", ext: "m4a" },
  { mime: "audio/webm", ext: "weba" },
];

export function canRecordVoice(): boolean {
  return typeof window !== "undefined" && !!navigator.mediaDevices?.getUserMedia && typeof MediaRecorder !== "undefined";
}

/** Graba una nota de voz (máximo 5 minutos). */
export class VoiceRecorder {
  private recorder: MediaRecorder | null = null;
  private stream: MediaStream | null = null;
  private chunks: Blob[] = [];
  private startedAt = 0;
  private type = VOICE_TYPES[0];
  private limitTimer: ReturnType<typeof setTimeout> | null = null;
  onLimit: (() => void) | null = null;
  static MAX_SECONDS = 300;

  async start() {
    this.stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
    this.type = VOICE_TYPES.find((t) => MediaRecorder.isTypeSupported?.(t.mime)) || VOICE_TYPES[2];
    const options: MediaRecorderOptions = { audioBitsPerSecond: 32000 };
    if (MediaRecorder.isTypeSupported?.(this.type.mime)) options.mimeType = this.type.mime;
    this.recorder = new MediaRecorder(this.stream, options);
    this.chunks = [];
    this.recorder.ondataavailable = (e) => {
      if (e.data && e.data.size) this.chunks.push(e.data);
    };
    this.recorder.start(250);
    this.startedAt = Date.now();
    this.limitTimer = setTimeout(() => this.onLimit?.(), VoiceRecorder.MAX_SECONDS * 1000);
  }

  get seconds() {
    return this.startedAt ? (Date.now() - this.startedAt) / 1000 : 0;
  }

  /** Termina y devuelve el archivo listo para subir. */
  async stop(): Promise<{ file: File; duration: number } | null> {
    const recorder = this.recorder;
    if (!recorder) return null;
    const duration = this.seconds;
    await new Promise<void>((resolve) => {
      recorder.onstop = () => resolve();
      try {
        recorder.stop();
      } catch {
        resolve();
      }
    });
    this.cleanup();
    const mime = (recorder.mimeType || this.type.mime).split(";")[0] || "audio/webm";
    const ext = mime.includes("mp4") ? "m4a" : mime.includes("ogg") ? "ogg" : "weba";
    const blob = new Blob(this.chunks, { type: mime });
    if (blob.size < 800 || duration < 0.6) return null; // toque sin querer
    const stamp = new Date().toISOString().slice(0, 19).replace(/[-:T]/g, "");
    return { file: new File([blob], `nota-de-voz-${stamp}.${ext}`, { type: mime }), duration };
  }

  cancel() {
    try {
      this.recorder?.stop();
    } catch {
      /* nada */
    }
    this.cleanup();
  }

  private cleanup() {
    if (this.limitTimer) clearTimeout(this.limitTimer);
    this.stream?.getTracks().forEach((t) => t.stop());
    this.stream = null;
    this.recorder = null;
  }
}
