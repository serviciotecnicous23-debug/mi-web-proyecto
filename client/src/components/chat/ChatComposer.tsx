import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Camera, FileText, Image as ImageIcon, Mic, Paperclip, Pencil, Reply, Send, Smile, Square, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ACCEPT_DOCUMENTS, checkFile } from "@/components/media/upload";
import { useToast } from "@/hooks/use-toast";
import { VoiceRecorder, canRecordVoice, formatBytes, formatDuration } from "./chat-media";
import { previewOf } from "./chat-api";
import type { ChatMessage } from "./types";

const EMOJIS = "😀 😂 😊 🥰 😍 😉 😎 🤗 🙂 😅 🤔 😮 😢 😭 🙏 🙌 👏 👍 👋 🤝 💪 🔥 ❤️ 💕 ✨ 🎉 🌟 ☀️ 🌈 💐 🎶 📖 ✝️ 🕊️ ⛪ 🙇 ✅ ❗ ❓ 💯".split(" ");
const MAX_VIDEO_MB = 30;

export type ComposerHandle = { addFiles: (files: File[]) => void; focus: () => void };

type Queued = { file: File; url: string | null };

type Props = {
  otherName: string;
  me: number;
  replyTo: ChatMessage | null;
  editing: ChatMessage | null;
  onCancelReply: () => void;
  onCancelEdit: () => void;
  onSubmitEdit: (content: string) => Promise<void> | void;
  onSendText: (content: string) => void;
  onSendFiles: (items: { file: File; caption: string }[]) => void;
  onSendVoice: (file: File, duration: number) => void;
  onTyping: () => void;
};

export const ChatComposer = forwardRef<ComposerHandle, Props>(function ChatComposer(props, ref) {
  const { toast } = useToast();
  const [text, setText] = useState("");
  const [queued, setQueued] = useState<Queued[]>([]);
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const recorder = useRef<VoiceRecorder | null>(null);
  const area = useRef<HTMLTextAreaElement>(null);
  const photos = useRef<HTMLInputElement>(null);
  const docs = useRef<HTMLInputElement>(null);
  const camera = useRef<HTMLInputElement>(null);
  const coarse = typeof window !== "undefined" && window.matchMedia?.("(pointer: coarse)").matches;

  // Al editar, el texto del mensaje pasa a la caja.
  useEffect(() => {
    if (props.editing) {
      setText(props.editing.content);
      setTimeout(() => area.current?.focus(), 0);
    }
  }, [props.editing]);

  useEffect(() => {
    if (props.replyTo) area.current?.focus();
  }, [props.replyTo]);

  // Altura según el texto (hasta ~6 renglones)
  useEffect(() => {
    const el = area.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 150)}px`;
  }, [text]);

  useEffect(() => () => {
    recorder.current?.cancel();
    queued.forEach((q) => q.url && URL.revokeObjectURL(q.url));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function addFiles(files: File[]) {
    const ok: Queued[] = [];
    for (const file of files.slice(0, 10)) {
      if (file.type.startsWith("video/") && file.size > MAX_VIDEO_MB * 1024 * 1024) {
        toast({ title: "Video muy pesado", description: `En el chat el máximo es ${MAX_VIDEO_MB} MB. Para videos largos, súbelo a YouTube o Drive y pega el enlace.`, variant: "destructive" });
        continue;
      }
      const problem = checkFile(file);
      if (problem) {
        toast({ title: "No se puede enviar", description: problem, variant: "destructive" });
        continue;
      }
      ok.push({ file, url: file.type.startsWith("image/") ? URL.createObjectURL(file) : null });
    }
    if (ok.length) setQueued((q) => [...q, ...ok].slice(0, 10));
  }

  useImperativeHandle(ref, () => ({ addFiles, focus: () => area.current?.focus() }));

  async function submit() {
    const content = text.trim();
    if (props.editing) {
      if (!content && props.editing.kind === "text") return;
      await props.onSubmitEdit(content);
      setText("");
      return;
    }
    if (queued.length) {
      props.onSendFiles(queued.map((q, i) => ({ file: q.file, caption: i === 0 ? content : "" })));
      queued.forEach((q) => q.url && setTimeout(() => URL.revokeObjectURL(q.url!), 60_000));
      setQueued([]);
      setText("");
      return;
    }
    if (!content) return;
    props.onSendText(content);
    setText("");
  }

  async function startRecording() {
    if (!canRecordVoice()) {
      toast({ title: "Este navegador no graba audio", description: "Prueba con Chrome, Edge o Safari actualizados.", variant: "destructive" });
      return;
    }
    const rec = new VoiceRecorder();
    try {
      await rec.start();
    } catch {
      toast({ title: "Sin permiso para el micrófono", description: "Permite el micrófono en el navegador para grabar notas de voz.", variant: "destructive" });
      return;
    }
    recorder.current = rec;
    rec.onLimit = () => void finishRecording(true);
    setSeconds(0);
    setRecording(true);
  }

  async function finishRecording(send: boolean) {
    const rec = recorder.current;
    recorder.current = null;
    setRecording(false);
    if (!rec) return;
    if (!send) {
      rec.cancel();
      return;
    }
    const result = await rec.stop();
    if (result) props.onSendVoice(result.file, result.duration);
    else toast({ title: "La nota de voz quedó muy corta" });
  }

  useEffect(() => {
    if (!recording) return;
    const t = setInterval(() => setSeconds(recorder.current?.seconds ?? 0), 250);
    return () => clearInterval(t);
  }, [recording]);

  const showSend = !!text.trim() || queued.length > 0 || !!props.editing;

  return (
    <div className="border-t bg-card/90 px-2 pb-2 pt-1.5 backdrop-blur">
      {props.replyTo && !props.editing && (
        <div className="mb-1.5 flex items-center gap-2 rounded-lg border-l-4 border-orange-400 bg-muted/60 px-2 py-1.5">
          <Reply className="h-4 w-4 shrink-0 text-orange-500" />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-orange-600 dark:text-orange-300">
              Respondiendo a {props.replyTo.senderId === props.me ? "ti" : props.otherName}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {previewOf(props.replyTo.kind, props.replyTo.content, props.replyTo.attachment?.name) || "Mensaje"}
            </p>
          </div>
          <Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={props.onCancelReply} aria-label="Cancelar respuesta">
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      {props.editing && (
        <div className="mb-1.5 flex items-center gap-2 rounded-lg border-l-4 border-sky-400 bg-muted/60 px-2 py-1.5">
          <Pencil className="h-4 w-4 shrink-0 text-sky-500" />
          <p className="min-w-0 flex-1 truncate text-xs font-semibold">Editando el mensaje</p>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => {
              setText("");
              props.onCancelEdit();
            }}
            aria-label="Cancelar edición"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      {queued.length > 0 && (
        <div className="mb-1.5 flex gap-2 overflow-x-auto pb-1" aria-label="Archivos para enviar">
          {queued.map((q, i) => (
            <div key={i} className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border bg-muted">
              {q.url ? (
                <img src={q.url} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center p-1 text-center">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <span className="w-full truncate text-[9px]">{q.file.name}</span>
                  <span className="text-[9px] text-muted-foreground">{formatBytes(q.file.size)}</span>
                </div>
              )}
              <button
                type="button"
                className="absolute right-0.5 top-0.5 rounded-full bg-black/60 p-0.5 text-white"
                onClick={() =>
                  setQueued((list) => {
                    const item = list[i];
                    if (item?.url) URL.revokeObjectURL(item.url);
                    return list.filter((_, j) => j !== i);
                  })
                }
                aria-label={`Quitar ${q.file.name}`}
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {recording ? (
        <div className="flex items-center gap-2 py-1" role="status" aria-live="polite">
          <Button type="button" variant="ghost" size="icon" onClick={() => void finishRecording(false)} aria-label="Descartar la nota de voz">
            <Trash2 className="h-5 w-5 text-red-500" />
          </Button>
          <span className="h-3 w-3 animate-pulse rounded-full bg-red-500" aria-hidden="true" />
          <span className="flex-1 text-sm tabular-nums">
            Grabando {formatDuration(seconds)} <span className="text-xs text-muted-foreground">(máx. 5:00)</span>
          </span>
          <Button type="button" size="icon" className="h-11 w-11 rounded-full" onClick={() => void finishRecording(true)} aria-label="Enviar la nota de voz" data-testid="button-send-voice">
            <Square className="h-4 w-4 fill-current" />
          </Button>
        </div>
      ) : (
        <form
          className="flex items-end gap-1"
          onSubmit={(e) => {
            e.preventDefault();
            void submit();
          }}
        >
          <Popover>
            <PopoverTrigger asChild>
              <Button type="button" variant="ghost" size="icon" className="h-10 w-10 shrink-0" aria-label="Emojis">
                <Smile className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="grid w-72 grid-cols-8 gap-1 p-2">
              {EMOJIS.map((e) => (
                <button
                  key={e}
                  type="button"
                  className="rounded p-1 text-xl leading-none hover:bg-muted"
                  onClick={() => {
                    setText((t) => t + e);
                    area.current?.focus();
                  }}
                >
                  {e}
                </button>
              ))}
            </PopoverContent>
          </Popover>
          {!props.editing && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button type="button" variant="ghost" size="icon" className="h-10 w-10 shrink-0" aria-label="Adjuntar" data-testid="button-chat-attach">
                  <Paperclip className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onSelect={() => photos.current?.click()}>
                  <ImageIcon className="mr-2 h-4 w-4" /> Fotos y videos
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => camera.current?.click()}>
                  <Camera className="mr-2 h-4 w-4" /> Cámara
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => docs.current?.click()}>
                  <FileText className="mr-2 h-4 w-4" /> Documento
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <textarea
            ref={area}
            rows={1}
            value={text}
            placeholder={queued.length ? "Agrega un comentario (opcional)…" : "Escribe un mensaje"}
            className="max-h-[150px] min-h-[40px] flex-1 resize-none rounded-2xl border bg-background px-3.5 py-2.5 text-sm leading-snug outline-none focus:border-primary"
            onChange={(e) => {
              setText(e.target.value);
              if (e.target.value) props.onTyping();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && !coarse) {
                e.preventDefault();
                void submit();
              }
              if (e.key === "Escape") {
                if (props.editing) {
                  setText("");
                  props.onCancelEdit();
                } else if (props.replyTo) props.onCancelReply();
              }
            }}
            onPaste={(e) => {
              const files = Array.from(e.clipboardData?.files || []);
              if (files.length) {
                e.preventDefault();
                addFiles(files);
              }
            }}
            aria-label="Mensaje"
            data-testid="input-chat-message"
          />
          {showSend ? (
            <Button type="submit" size="icon" className="h-10 w-10 shrink-0 rounded-full" aria-label={props.editing ? "Guardar el cambio" : "Enviar"} data-testid="button-chat-send">
              <Send className="h-4 w-4" />
            </Button>
          ) : (
            <Button type="button" size="icon" className="h-10 w-10 shrink-0 rounded-full" onClick={() => void startRecording()} aria-label="Grabar nota de voz" data-testid="button-chat-mic">
              <Mic className="h-5 w-5" />
            </Button>
          )}
        </form>
      )}

      <input
        ref={photos}
        type="file"
        accept="image/*,video/*"
        multiple
        hidden
        onChange={(e) => {
          addFiles(Array.from(e.target.files || []));
          e.target.value = "";
        }}
      />
      <input
        ref={camera}
        type="file"
        accept="image/*"
        capture="environment"
        hidden
        onChange={(e) => {
          addFiles(Array.from(e.target.files || []));
          e.target.value = "";
        }}
      />
      <input
        ref={docs}
        type="file"
        accept={ACCEPT_DOCUMENTS}
        multiple
        hidden
        onChange={(e) => {
          addFiles(Array.from(e.target.files || []));
          e.target.value = "";
        }}
      />
    </div>
  );
});
