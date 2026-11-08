import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowDown, ArrowLeft, Download, Loader2, MoreVertical, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { MessageBubble } from "./MessageBubble";
import { ChatComposer, type ComposerHandle } from "./ChatComposer";
import { CONV_KEY, PAGE, UNREAD_KEY, chatFetch, mergeMessages, threadKey, useChatActions, useThread } from "./chat-api";
import type { ChatMessage, ChatUser, Conversation, ThreadData } from "./types";

function dayLabel(iso: string): string {
  const d = new Date(iso);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  if (d.toDateString() === today.toDateString()) return "Hoy";
  if (d.toDateString() === yesterday.toDateString()) return "Ayer";
  const sameYear = d.getFullYear() === today.getFullYear();
  return d.toLocaleDateString("es", { weekday: "long", day: "numeric", month: "long", ...(sameYear ? {} : { year: "numeric" }) });
}

export function initials(u: Pick<ChatUser, "displayName" | "username"> | null | undefined) {
  return (u?.displayName || u?.username || "?").trim().slice(0, 2).toUpperCase();
}

type Props = {
  me: number;
  other: ChatUser;
  online: boolean;
  typing: boolean;
  onBack: () => void;
};

export function ChatThread({ me, other, online, typing, onBack }: Props) {
  const qc = useQueryClient();
  const { toast } = useToast();
  const { data, isLoading, isError } = useThread(other.id);
  const actions = useChatActions(me);
  const scroller = useRef<HTMLDivElement>(null);
  const composer = useRef<ComposerHandle>(null);
  const [replyTo, setReplyTo] = useState<ChatMessage | null>(null);
  const [editing, setEditing] = useState<ChatMessage | null>(null);
  const [menuFor, setMenuFor] = useState<string | null>(null);
  const [viewer, setViewer] = useState<string | null>(null);
  const [confirm, setConfirm] = useState<{ msg: ChatMessage; forAll: boolean } | null>(null);
  const [clearAsk, setClearAsk] = useState(false);
  const [loadingOlder, setLoadingOlder] = useState(false);
  const [newBelow, setNewBelow] = useState(0);
  const [highlight, setHighlight] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);
  const atBottom = useRef(true);
  const prevInfo = useRef<{ firstId: number | null; lastKey: string | null; height: number; top: number; count: number }>({
    firstId: null, lastKey: null, height: 0, top: 0, count: 0,
  });
  const lastTypingSent = useRef(0);
  const name = other.displayName || other.username;
  const messages = data?.messages || [];

  // Al cambiar de conversación: limpiar lo de la anterior
  useEffect(() => {
    setReplyTo(null);
    setEditing(null);
    setNewBelow(0);
    atBottom.current = true;
    prevInfo.current = { firstId: null, lastKey: null, height: 0, top: 0, count: 0 };
  }, [other.id]);

  // Posición del scroll: abajo al abrir y con mensajes nuevos; igual al cargar los anteriores.
  useLayoutEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const first = messages.find((m) => m.id > 0)?.id ?? null;
    const last = messages[messages.length - 1];
    const lastKey = last ? `${last.id}|${last.clientId}` : null;
    const prev = prevInfo.current;
    if (prev.count === 0 && messages.length) {
      el.scrollTop = el.scrollHeight;
    } else if (prev.firstId !== null && first !== null && first < prev.firstId && lastKey === prev.lastKey) {
      el.scrollTop = el.scrollHeight - prev.height + prev.top; // se agregaron los anteriores arriba
    } else if (lastKey !== prev.lastKey && messages.length >= prev.count) {
      if (atBottom.current || last?.senderId === me) {
        el.scrollTop = el.scrollHeight;
        setNewBelow(0);
      } else if (last && last.senderId !== me) {
        setNewBelow((n) => n + 1);
      }
    }
    prevInfo.current = { firstId: first, lastKey, height: el.scrollHeight, top: el.scrollTop, count: messages.length };
  }, [messages, me]);

  const loadOlder = useCallback(async () => {
    const first = messages.find((m) => m.id > 0);
    if (!first || loadingOlder || !data?.hasMore) return;
    setLoadingOlder(true);
    const el = scroller.current;
    if (el) prevInfo.current = { ...prevInfo.current, height: el.scrollHeight, top: el.scrollTop };
    try {
      const older = await chatFetch<ChatMessage[]>(`/api/messages/${other.id}?before=${first.id}&limit=${PAGE}`);
      qc.setQueryData<ThreadData>(threadKey(other.id), (old) =>
        old ? { messages: mergeMessages(old.messages, older), hasMore: older.length >= PAGE } : old,
      );
    } catch {
      toast({ title: "No se pudieron cargar los mensajes anteriores", variant: "destructive" });
    } finally {
      setLoadingOlder(false);
    }
  }, [messages, loadingOlder, data?.hasMore, other.id, qc, toast]);

  const onScroll = () => {
    const el = scroller.current;
    if (!el) return;
    atBottom.current = el.scrollHeight - el.scrollTop - el.clientHeight < 120;
    if (atBottom.current) setNewBelow(0);
    if (el.scrollTop < 120) void loadOlder();
    prevInfo.current = { ...prevInfo.current, height: el.scrollHeight, top: el.scrollTop };
  };

  // Visto: con la conversación abierta y la pestaña a la vista.
  const unreadIncoming = messages.some((m) => m.senderId === other.id && !m.isRead && m.id > 0);
  useEffect(() => {
    if (!unreadIncoming) return;
    const mark = () => {
      if (document.visibilityState !== "visible") return;
      void chatFetch(`/api/messages/${other.id}/read`, { method: "PATCH" })
        .then(() => {
          qc.setQueryData<ThreadData>(threadKey(other.id), (old) =>
            old ? { ...old, messages: old.messages.map((m) => (m.senderId === other.id ? { ...m, isRead: true } : m)) } : old,
          );
          qc.setQueryData<Conversation[]>(CONV_KEY, (old) => old?.map((c) => (c.user.id === other.id ? { ...c, unreadCount: 0 } : c)));
          qc.invalidateQueries({ queryKey: UNREAD_KEY });
        })
        .catch(() => {});
    };
    const t = setTimeout(mark, 350);
    document.addEventListener("visibilitychange", mark);
    return () => {
      clearTimeout(t);
      document.removeEventListener("visibilitychange", mark);
    };
  }, [unreadIncoming, other.id, qc]);

  const jumpTo = useCallback((id: number) => {
    const el = scroller.current?.querySelector(`[data-mid="${id}"]`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      setHighlight(id);
      setTimeout(() => setHighlight(null), 1600);
    } else {
      toast({ title: "Ese mensaje es más antiguo", description: "Sube un poco para cargarlo." });
    }
  }, [toast]);

  const onTyping = () => {
    if (Date.now() - lastTypingSent.current < 2500) return;
    lastTypingSent.current = Date.now();
    void chatFetch(`/api/dm/typing/${other.id}`, { method: "POST" }).catch(() => {});
  };

  const handlers = useMemo(
    () => ({
      onReply: (m: ChatMessage) => {
        setEditing(null);
        setReplyTo(m);
      },
      onEdit: (m: ChatMessage) => {
        setReplyTo(null);
        setEditing(m);
      },
      onDelete: (m: ChatMessage, forAll: boolean) => setConfirm({ msg: m, forAll }),
      onReact: (m: ChatMessage, emoji: string | null) => {
        actions.react(m, emoji).catch((err: Error) => toast({ title: "No se guardó la reacción", description: err.message, variant: "destructive" }));
      },
      onRetry: (m: ChatMessage) => actions.retry(m),
      onDiscard: (m: ChatMessage) => actions.discard(m),
      onOpenImage: (src: string) => setViewer(src),
      onJump: jumpTo,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [jumpTo],
  );

  const status = typing ? "escribiendo…" : online ? "en línea" : `@${other.username}`;

  return (
    <div
      className="relative flex min-h-0 flex-1 flex-col"
      onDragOver={(e) => {
        if (e.dataTransfer?.types?.includes("Files")) {
          e.preventDefault();
          setDragging(true);
        }
      }}
      onDragLeave={(e) => {
        if (e.currentTarget === e.target) setDragging(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        const files = Array.from(e.dataTransfer?.files || []);
        if (files.length) composer.current?.addFiles(files);
      }}
    >
      {/* Encabezado */}
      <div className="flex items-center gap-3 border-b px-2 py-2 sm:px-3">
        <Button variant="ghost" size="icon" className="h-10 w-10 md:hidden" onClick={onBack} aria-label="Volver a los chats">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="relative">
          <Avatar className="h-10 w-10">
            {other.avatarUrl && <AvatarImage src={other.avatarUrl} alt="" />}
            <AvatarFallback className="bg-primary/10 text-sm text-primary">{initials(other)}</AvatarFallback>
          </Avatar>
          {online && <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card bg-green-500" aria-hidden="true" />}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold leading-tight" data-testid="text-chat-name">{name}</p>
          <p className={`truncate text-xs ${typing ? "font-medium text-green-600 dark:text-green-400" : "text-muted-foreground"}`} data-testid="text-chat-status">
            {status}
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Más opciones del chat">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => setClearAsk(true)}>
              <Trash2 className="mr-2 h-4 w-4" /> Vaciar chat (solo para mí)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mensajes */}
      <div
        ref={scroller}
        onScroll={onScroll}
        className="min-h-0 flex-1 overflow-y-auto bg-muted/20 px-2 pb-3 pt-2 sm:px-4"
        aria-live="polite"
        data-testid="chat-messages"
      >
        {isLoading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : isError ? (
          <p className="py-10 text-center text-sm text-muted-foreground">No se pudo abrir la conversación. Revisa tu conexión.</p>
        ) : (
          <>
            {data?.hasMore ? (
              <div className="flex justify-center py-2">
                <Button variant="ghost" size="sm" onClick={() => void loadOlder()} disabled={loadingOlder}>
                  {loadingOlder ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : null} Ver mensajes anteriores
                </Button>
              </div>
            ) : messages.length > 0 ? (
              <p className="mx-auto my-2 w-fit max-w-xs rounded-lg bg-amber-100/80 px-3 py-1.5 text-center text-[11px] text-amber-900 dark:bg-amber-900/30 dark:text-amber-100">
                Los mensajes son privados entre ustedes dos. Sé respetuoso: puedes denunciar abusos a la administración.
              </p>
            ) : null}
            {!messages.length && (
              <div className="py-16 text-center">
                <p className="text-sm text-muted-foreground">Todavía no hay mensajes. ¡Saluda a {name}! 👋</p>
              </div>
            )}
            {messages.map((m, i) => {
              const prev = messages[i - 1];
              const newDay = !prev || new Date(prev.createdAt).toDateString() !== new Date(m.createdAt).toDateString();
              const firstInGroup =
                newDay || !prev || prev.senderId !== m.senderId || new Date(m.createdAt).getTime() - new Date(prev.createdAt).getTime() > 5 * 60_000;
              const key = m.pending ? `c-${m.clientId}` : `m-${m.id}`;
              return (
                <div key={key}>
                  {newDay && (
                    <div className="sticky top-0 z-10 my-3 flex justify-center">
                      <span className="rounded-full bg-card/95 px-3 py-0.5 text-xs font-medium capitalize text-muted-foreground shadow-sm">
                        {dayLabel(m.createdAt)}
                      </span>
                    </div>
                  )}
                  <MessageBubble
                    msg={m}
                    me={me}
                    otherName={name}
                    firstInGroup={firstInGroup}
                    highlighted={highlight === m.id}
                    menuOpen={menuFor === key}
                    onMenu={(open) => setMenuFor(open ? key : null)}
                    {...handlers}
                  />
                </div>
              );
            })}
            {typing && (
              <div className="mt-2 flex justify-start" aria-label={`${name} está escribiendo`}>
                <span className="flex gap-1 rounded-2xl border bg-card px-3 py-2.5 shadow-sm">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.2s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.1s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" />
                </span>
              </div>
            )}
          </>
        )}
      </div>

      {newBelow > 0 && (
        <button
          type="button"
          className="absolute bottom-24 right-4 flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-lg"
          onClick={() => {
            const el = scroller.current;
            if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
            setNewBelow(0);
          }}
        >
          <ArrowDown className="h-3.5 w-3.5" /> {newBelow} nuevo{newBelow > 1 ? "s" : ""}
        </button>
      )}

      {dragging && (
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center rounded-lg border-2 border-dashed border-primary bg-primary/10 text-sm font-semibold text-primary">
          Suelta aquí para enviar
        </div>
      )}

      <ChatComposer
        ref={composer}
        me={me}
        otherName={name}
        replyTo={replyTo}
        editing={editing}
        onCancelReply={() => setReplyTo(null)}
        onCancelEdit={() => setEditing(null)}
        onSubmitEdit={async (content) => {
          if (!editing) return;
          try {
            await actions.edit(editing, content);
            setEditing(null);
          } catch (err) {
            toast({ title: "No se pudo editar", description: (err as Error).message, variant: "destructive" });
          }
        }}
        onSendText={(content) => {
          actions.send({ otherId: other.id, content, replyTo });
          setReplyTo(null);
        }}
        onSendFiles={(items) => {
          items.forEach((it, i) => actions.send({ otherId: other.id, content: it.caption, file: it.file, replyTo: i === 0 ? replyTo : null }));
          setReplyTo(null);
        }}
        onSendVoice={(file, duration) => {
          actions.send({ otherId: other.id, content: "", file, kind: "audio", duration, replyTo });
          setReplyTo(null);
        }}
        onTyping={onTyping}
      />

      {/* Foto en grande */}
      <Dialog open={!!viewer} onOpenChange={(o) => !o && setViewer(null)}>
        <DialogContent className="max-h-[95vh] max-w-[95vw] border-none bg-black/95 p-2 sm:max-w-4xl">
          <DialogTitle className="sr-only">Foto</DialogTitle>
          {viewer && <img src={viewer} alt="Foto del chat" className="mx-auto max-h-[85vh] w-auto rounded object-contain" />}
          <div className="flex justify-center gap-2">
            {viewer && (
              <Button asChild variant="secondary" size="sm">
                <a href={viewer} download>
                  <Download className="mr-1 h-4 w-4" /> Descargar
                </a>
              </Button>
            )}
            <Button variant="secondary" size="sm" onClick={() => setViewer(null)}>
              <X className="mr-1 h-4 w-4" /> Cerrar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirmar eliminar */}
      <AlertDialog open={!!confirm} onOpenChange={(o) => !o && setConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{confirm?.forAll ? "¿Eliminar para todos?" : "¿Eliminar para ti?"}</AlertDialogTitle>
            <AlertDialogDescription>
              {confirm?.forAll
                ? `El mensaje desaparece también para ${name}. En su lugar se verá «Se eliminó este mensaje».`
                : `Solo desaparece de tu chat; ${name} lo sigue viendo.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 text-white hover:bg-red-700"
              onClick={() => {
                const c = confirm;
                setConfirm(null);
                if (!c) return;
                actions.remove(c.msg, c.forAll).catch((err: Error) =>
                  toast({ title: "No se pudo eliminar", description: err.message, variant: "destructive" }),
                );
              }}
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={clearAsk} onOpenChange={setClearAsk}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Vaciar este chat?</AlertDialogTitle>
            <AlertDialogDescription>Se borran todos los mensajes de tu lado. {name} los sigue viendo.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 text-white hover:bg-red-700"
              onClick={() => {
                actions.clearChat(other.id).catch((err: Error) => toast({ title: "No se pudo vaciar", description: err.message, variant: "destructive" }));
              }}
            >
              Vaciar chat
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
