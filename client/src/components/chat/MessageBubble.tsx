import { memo, useEffect, useRef, useState } from "react";
import {
  Check, CheckCheck, Clock, AlertCircle, ChevronDown, Reply, Copy, Pencil, Trash2, Download, Play, Pause,
  Ban, RotateCw, X, FileText,
} from "lucide-react";
import { DM_REACTIONS } from "@shared/schema";
import { RichText } from "@/components/media/RichText";
import { FileAttachment } from "@/components/media/FileAttachment";
import { announcePlay, useOnOtherPlay } from "@/components/media/player-store";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatBytes, formatDuration } from "./chat-media";
import { previewOf } from "./chat-api";
import type { ChatMessage } from "./types";

const EDIT_WINDOW_MS = 15 * 60 * 1000;
const DELETE_FOR_ALL_WINDOW_MS = 48 * 60 * 60 * 1000;

export function timeOf(iso: string) {
  return new Date(iso).toLocaleTimeString("es", { hour: "numeric", minute: "2-digit" });
}

/** ✓ enviado · ✓✓ entregado · ✓✓ naranja visto · reloj enviando · ! sin enviar */
export function Ticks({
  msg, className = "", onBubble = false,
}: {
  msg: Pick<ChatMessage, "pending" | "readAt" | "isRead" | "deliveredAt">;
  className?: string;
  /** Sobre la burbuja naranja el "visto" va en azul oscuro para que se distinga. */
  onBubble?: boolean;
}) {
  if (msg.pending === "sending") return <Clock className={`h-3.5 w-3.5 ${className}`} aria-label="Enviando" />;
  if (msg.pending === "error") return <AlertCircle className={`h-3.5 w-3.5 text-red-500 ${className}`} aria-label="No se envió" />;
  if (msg.readAt || msg.isRead) {
    return <CheckCheck className={`h-4 w-4 ${onBubble ? "text-blue-900" : "text-sky-400"} ${className}`} strokeWidth={2.6} aria-label="Visto" />;
  }
  if (msg.deliveredAt) return <CheckCheck className={`h-4 w-4 opacity-80 ${className}`} aria-label="Entregado" />;
  return <Check className={`h-4 w-4 opacity-80 ${className}`} aria-label="Enviado" />;
}

function VoiceNote({ src, duration, mine, id }: { src: string; duration: number | null; mine: boolean; id: string }) {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [total, setTotal] = useState(duration || 0);
  useOnOtherPlay(id, () => audio.current?.pause());
  const toggle = () => {
    const a = audio.current;
    if (!a) return;
    if (a.paused) {
      announcePlay(id);
      void a.play().catch(() => setPlaying(false));
    } else a.pause();
  };
  const pct = total > 0 ? Math.min(100, (time / total) * 100) : 0;
  return (
    <div className="flex w-56 max-w-full items-center gap-2 py-1">
      <button
        type="button"
        onClick={toggle}
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${mine ? "bg-white/20 text-white" : "bg-primary text-primary-foreground"}`}
        aria-label={playing ? "Pausar nota de voz" : "Escuchar nota de voz"}
      >
        {playing ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
      </button>
      <div className="min-w-0 flex-1">
        <input
          type="range"
          min={0}
          max={total || 1}
          step={0.1}
          value={time}
          onChange={(e) => {
            const v = Number(e.target.value);
            if (audio.current) audio.current.currentTime = v;
            setTime(v);
          }}
          className={`h-1 w-full cursor-pointer ${mine ? "accent-white" : "accent-orange-500"}`}
          aria-label="Avance de la nota de voz"
          aria-valuetext={`${Math.round(pct)} %`}
        />
        <span className="text-[11px] tabular-nums opacity-80">{formatDuration(playing || time ? time : total)}</span>
      </div>
      <audio
        ref={audio}
        src={src}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          setPlaying(false);
          setTime(0);
        }}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => {
          const d = e.currentTarget.duration;
          if (Number.isFinite(d) && d > 0) setTotal(d);
        }}
      />
    </div>
  );
}

function ImageAttachment({ msg, onOpen }: { msg: ChatMessage; onOpen: (src: string) => void }) {
  const a = msg.attachment!;
  const src = msg.localPreview || a.url;
  const ratio = a.width && a.height ? a.height / a.width : 0.75;
  const width = Math.min(280, a.width || 280);
  return (
    <button
      type="button"
      onClick={() => src && onOpen(a.url || src)}
      className="relative block overflow-hidden rounded-xl bg-black/10"
      style={{ width, maxWidth: "100%", aspectRatio: `${1} / ${Math.min(Math.max(ratio, 0.4), 1.6)}` }}
      aria-label="Ver la foto en grande"
    >
      {src ? <img src={src} alt={msg.content || "Foto"} loading="lazy" className="h-full w-full object-cover" /> : null}
      {msg.pending === "sending" && <UploadVeil progress={msg.progress} />}
    </button>
  );
}

function UploadVeil({ progress }: { progress?: number }) {
  return (
    <span className="absolute inset-0 flex items-center justify-center bg-black/40 text-xs font-semibold text-white">
      {progress !== undefined && progress < 1 ? `Subiendo ${Math.round(progress * 100)} %` : "Enviando…"}
    </span>
  );
}

function ReplyQuote({ msg, me, otherName, onJump }: { msg: ChatMessage; me: number; otherName: string; onJump: (id: number) => void }) {
  const r = msg.replyTo!;
  const who = r.senderId === me ? "Tú" : otherName;
  const text = r.deleted ? "Mensaje eliminado" : previewOf(r.kind, r.content, r.attachmentName) || "Mensaje";
  return (
    <button
      type="button"
      onClick={() => onJump(r.id)}
      className="mb-1 block w-full rounded-lg border-l-4 border-orange-400 bg-black/10 px-2 py-1 text-left dark:bg-white/10"
    >
      <span className="block text-xs font-semibold text-orange-500 dark:text-orange-300">{who}</span>
      <span className="line-clamp-2 text-xs opacity-80">{text}</span>
    </button>
  );
}

type BubbleProps = {
  msg: ChatMessage;
  me: number;
  otherName: string;
  firstInGroup: boolean;
  highlighted: boolean;
  menuOpen: boolean;
  onMenu: (open: boolean) => void;
  onReply: (m: ChatMessage) => void;
  onEdit: (m: ChatMessage) => void;
  onDelete: (m: ChatMessage, forAll: boolean) => void;
  onReact: (m: ChatMessage, emoji: string | null) => void;
  onRetry: (m: ChatMessage) => void;
  onDiscard: (m: ChatMessage) => void;
  onOpenImage: (src: string) => void;
  onJump: (id: number) => void;
};

function MessageBubbleBase(props: BubbleProps) {
  const { msg, me, otherName, firstInGroup, highlighted, menuOpen, onMenu } = props;
  const mine = msg.senderId === me;
  const deleted = !!msg.deletedAt;
  const a = msg.attachment;
  const age = Date.now() - new Date(msg.createdAt).getTime();
  const canEdit = mine && !deleted && !msg.pending && age < EDIT_WINDOW_MS && (msg.kind === "text" || !!msg.content);
  const canDeleteForAll = mine && !deleted && !msg.pending && age < DELETE_FOR_ALL_WINDOW_MS;
  const reactions = Object.entries(msg.reactions || {}).filter(([, users]) => users.length);
  const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (pressTimer.current) clearTimeout(pressTimer.current);
  }, []);

  const bubbleTone = mine ? "bg-primary text-primary-foreground" : "bg-card text-card-foreground border";
  const corner = firstInGroup ? (mine ? "rounded-tr-md" : "rounded-tl-md") : "";

  return (
    <div
      className={`group flex ${mine ? "justify-end" : "justify-start"} ${firstInGroup ? "mt-2" : "mt-0.5"}`}
      data-mid={msg.id > 0 ? msg.id : undefined}
    >
      <div className={`relative flex max-w-[85%] flex-col sm:max-w-[70%] ${mine ? "items-end" : "items-start"}`}>
        <div
          className={`relative rounded-2xl px-3 py-1.5 shadow-sm transition-shadow ${bubbleTone} ${corner} ${highlighted ? "ring-2 ring-orange-400" : ""} ${msg.pending === "error" ? "opacity-80" : ""}`}
          onContextMenu={(e) => {
            if (msg.pending) return;
            e.preventDefault();
            onMenu(true);
          }}
          onTouchStart={() => {
            if (msg.pending) return;
            pressTimer.current = setTimeout(() => onMenu(true), 480);
          }}
          onTouchEnd={() => pressTimer.current && clearTimeout(pressTimer.current)}
          onTouchMove={() => pressTimer.current && clearTimeout(pressTimer.current)}
        >
          {deleted ? (
            <p className="flex items-center gap-1.5 text-sm italic opacity-75">
              <Ban className="h-3.5 w-3.5" /> {mine ? "Eliminaste este mensaje" : "Se eliminó este mensaje"}
            </p>
          ) : (
            <>
              {msg.replyTo && <ReplyQuote msg={msg} me={me} otherName={otherName} onJump={props.onJump} />}
              {a && msg.kind === "image" && <ImageAttachment msg={msg} onOpen={props.onOpenImage} />}
              {a && msg.kind === "audio" && (
                <div className="relative">
                  {(msg.localPreview || a.url) && <VoiceNote src={msg.localPreview || a.url} duration={a.duration} mine={mine} id={`dm-${msg.clientId || msg.id}`} />}
                  {msg.pending === "sending" && <p className="text-[11px] opacity-80">Enviando nota de voz…</p>}
                </div>
              )}
              {a && msg.kind === "video" && (
                <div className="relative w-64 max-w-full overflow-hidden rounded-xl bg-black">
                  <video src={msg.localPreview || a.url} controls preload="metadata" playsInline className="max-h-80 w-full" onPlay={() => announcePlay(`dm-${msg.id}`)} />
                  {msg.pending === "sending" && <UploadVeil progress={msg.progress} />}
                </div>
              )}
              {a && msg.kind === "file" && (
                a.url ? (
                  <div className="w-64 max-w-full text-foreground">
                    <FileAttachment url={a.url} name={a.name} size={a.size} mime={a.mime} compact />
                  </div>
                ) : (
                  <div className="flex w-60 max-w-full items-center gap-2 rounded-lg bg-black/10 p-2 text-sm">
                    <FileText className="h-5 w-5 shrink-0" />
                    <span className="min-w-0 flex-1 truncate">{a.name}</span>
                    <span className="text-[11px] opacity-80">
                      {msg.progress !== undefined && msg.progress < 1 ? `${Math.round(msg.progress * 100)} %` : formatBytes(a.size)}
                    </span>
                  </div>
                )
              )}
              {msg.content && (
                <div className={`text-sm leading-snug ${a ? "mt-1" : ""} [overflow-wrap:anywhere]`}>
                  <RichText text={msg.content} compact maxEmbeds={a ? 0 : 1} embeds={!a} />
                </div>
              )}
            </>
          )}
          <span className={`mt-0.5 flex items-center justify-end gap-1 text-[10.5px] ${mine ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
            {msg.editedAt && !deleted && <span>editado ·</span>}
            <time dateTime={msg.createdAt}>{timeOf(msg.createdAt)}</time>
            {mine && !deleted && <Ticks msg={msg} onBubble />}
          </span>

          {!msg.pending && !deleted && (
            <DropdownMenu open={menuOpen} onOpenChange={onMenu}>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className={`absolute right-1 top-1 rounded-full p-0.5 opacity-0 transition-opacity focus:opacity-100 group-hover:opacity-100 ${mine ? "bg-primary/80 text-primary-foreground" : "bg-card text-muted-foreground"}`}
                  aria-label="Opciones del mensaje"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={mine ? "end" : "start"} className="w-[17rem]">
                <div className="flex justify-between px-1 py-1" role="group" aria-label="Reaccionar">
                  {DM_REACTIONS.map((e) => {
                    const chosen = (msg.reactions?.[e] || []).includes(me);
                    return (
                      <button
                        key={e}
                        type="button"
                        className={`rounded-full p-1 text-lg leading-none transition-transform hover:scale-125 ${chosen ? "bg-primary/20" : ""}`}
                        onClick={() => {
                          props.onReact(msg, e);
                          onMenu(false);
                        }}
                        aria-label={`Reaccionar con ${e}`}
                      >
                        {e}
                      </button>
                    );
                  })}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => props.onReply(msg)}>
                  <Reply className="mr-2 h-4 w-4" /> Responder
                </DropdownMenuItem>
                {msg.content && (
                  <DropdownMenuItem onSelect={() => void navigator.clipboard?.writeText(msg.content)}>
                    <Copy className="mr-2 h-4 w-4" /> Copiar texto
                  </DropdownMenuItem>
                )}
                {a?.url && (
                  <DropdownMenuItem asChild>
                    <a href={a.url} download={a.name || true}>
                      <Download className="mr-2 h-4 w-4" /> Descargar
                    </a>
                  </DropdownMenuItem>
                )}
                {canEdit && (
                  <DropdownMenuItem onSelect={() => props.onEdit(msg)}>
                    <Pencil className="mr-2 h-4 w-4" /> Editar
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => props.onDelete(msg, false)}>
                  <Trash2 className="mr-2 h-4 w-4" /> Eliminar para mí
                </DropdownMenuItem>
                {canDeleteForAll && (
                  <DropdownMenuItem className="text-red-600 focus:text-red-600" onSelect={() => props.onDelete(msg, true)}>
                    <Trash2 className="mr-2 h-4 w-4" /> Eliminar para todos
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {reactions.length > 0 && (
          <div className={`relative z-[1] -mt-2 mb-1 flex gap-1 ${mine ? "mr-2" : "ml-2"}`}>
            {reactions.map(([e, users]) => (
              <button
                key={e}
                type="button"
                onClick={() => props.onReact(msg, e)}
                className={`flex items-center gap-0.5 rounded-full border bg-card px-1.5 py-0.5 text-sm leading-none shadow-md ${users.includes(me) ? "border-primary" : "border-border"}`}
                aria-label={`Reacción ${e}, ${users.length}`}
              >
                <span>{e}</span>
                {users.length > 1 && <span className="text-[10px] text-muted-foreground">{users.length}</span>}
              </button>
            ))}
          </div>
        )}

        {msg.pending === "error" && (
          <div className="mt-1 flex items-center gap-2 text-xs text-red-500">
            <span>{msg.errorText || "No se envió"}</span>
            <button type="button" className="inline-flex items-center gap-1 font-semibold underline" onClick={() => props.onRetry(msg)}>
              <RotateCw className="h-3 w-3" /> Reintentar
            </button>
            <button type="button" className="inline-flex items-center gap-1 underline" onClick={() => props.onDiscard(msg)}>
              <X className="h-3 w-3" /> Quitar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export const MessageBubble = memo(MessageBubbleBase);
