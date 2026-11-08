/**
 * Mensajes, como WhatsApp: chats con fotos, notas de voz, documentos y videos, responder,
 * reaccionar, editar, eliminar, "escribiendo…", "en línea" y vistos, en tiempo real.
 * En el celular: la lista sola y, al tocar un chat, el chat solo (con "volver").
 */
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, Lock, MessageCircle, Wifi, WifiOff } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { loginUrl } from "@/lib/login-redirect";
import { Layout } from "@/components/layout";
import { Card } from "@/components/ui/card";
import { ChatThread } from "@/components/chat/ChatThread";
import { ConversationList } from "@/components/chat/ConversationList";
import {
  CONV_KEY, UNREAD_KEY, bumpConversation, chatFetch, mergeMessages, threadKey, useChatStream, useConversations,
} from "@/components/chat/chat-api";
import type { ChatMessage, ChatUser, Conversation, ThreadData } from "@/components/chat/types";

const TYPING_MS = 4500;

export default function Mensajes() {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();
  const qc = useQueryClient();
  const me = user?.id ?? 0;

  const [selected, setSelected] = useState<ChatUser | null>(null);
  const [pendingTo, setPendingTo] = useState<number | null>(() => {
    const to = new URLSearchParams(window.location.search).get("to");
    return to && /^\d+$/.test(to) ? Number(to) : null;
  });
  const [typing, setTyping] = useState<Map<number, number>>(new Map());
  const [online, setOnline] = useState<Map<number, boolean>>(new Map());
  const openRef = useRef<number | null>(null);
  openRef.current = selected?.id ?? null;

  // El chat llena el espacio hasta la barra de abajo (en el celular y la tableta).
  const gridRef = useRef<HTMLDivElement>(null);
  const [gridTop, setGridTop] = useState(200);
  useLayoutEffect(() => {
    const update = () => {
      if (gridRef.current) setGridTop(Math.round(gridRef.current.getBoundingClientRect().top + window.scrollY));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(document.body);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    if (!isLoading && !user) setLocation(loginUrl());
  }, [user, isLoading, setLocation]);

  // ---------------------------------------------------------- tiempo real
  const catchUp = useCallback(
    async (otherId: number) => {
      const data = qc.getQueryData<ThreadData>(threadKey(otherId));
      const lastId = data?.messages.filter((m) => m.id > 0).slice(-1)[0]?.id;
      if (!data || !lastId) {
        qc.invalidateQueries({ queryKey: threadKey(otherId) });
        return;
      }
      try {
        const fresh = await chatFetch<ChatMessage[]>(`/api/messages/${otherId}?after=${lastId}`);
        if (fresh.length) {
          qc.setQueryData<ThreadData>(threadKey(otherId), (old) => (old ? { ...old, messages: mergeMessages(old.messages, fresh) } : old));
        }
      } catch {
        /* se reintenta en la próxima vuelta */
      }
    },
    [qc],
  );

  const patchMine = useCallback(
    (otherId: number, upTo: number, patch: Partial<ChatMessage>) => {
      qc.setQueryData<ThreadData>(threadKey(otherId), (old) =>
        old
          ? { ...old, messages: old.messages.map((m) => (m.senderId === me && m.id > 0 && m.id <= upTo ? { ...m, ...patch } : m)) }
          : old,
      );
      qc.setQueryData<Conversation[]>(CONV_KEY, (old) =>
        old?.map((c) =>
          c.user.id === otherId && c.lastMessage && c.lastMessage.senderId === me && c.lastMessage.id <= upTo
            ? {
                ...c,
                lastMessage: {
                  ...c.lastMessage,
                  ...(patch.readAt ? { readAt: patch.readAt, isRead: true } : {}),
                  ...(patch.deliveredAt ? { deliveredAt: patch.deliveredAt } : {}),
                },
              }
            : c,
        ),
      );
    },
    [qc, me],
  );

  const onEvent = useCallback(
    (type: string, data: any) => {
      const openId = openRef.current;
      switch (type) {
        case "ready":
          qc.invalidateQueries({ queryKey: CONV_KEY });
          qc.invalidateQueries({ queryKey: UNREAD_KEY });
          if (openId) void catchUp(openId);
          break;
        case "message":
        case "update": {
          const msg = data as ChatMessage;
          const other = msg.senderId === me ? msg.receiverId : msg.senderId;
          qc.setQueryData<ThreadData>(threadKey(other), (old) => (old ? { ...old, messages: mergeMessages(old.messages, [msg]) } : old));
          bumpConversation(qc, msg, me, type === "message" ? openId : null);
          if (type === "message" && msg.senderId !== me) {
            setTyping((t) => {
              if (!t.has(other)) return t;
              const next = new Map(t);
              next.delete(other);
              return next;
            });
            qc.invalidateQueries({ queryKey: UNREAD_KEY });
          }
          break;
        }
        case "read":
          patchMine(Number(data.by), Number(data.upTo), { readAt: data.at, isRead: true });
          break;
        case "delivered":
          patchMine(Number(data.to), Number(data.upTo), { deliveredAt: data.at });
          break;
        case "typing":
          setTyping((t) => new Map(t).set(Number(data.from), Date.now() + TYPING_MS));
          break;
        case "presence":
          setOnline((o) => new Map(o).set(Number(data.userId), !!data.online));
          break;
        case "hidden": {
          const ids = new Set<number>((data.ids || []).map(Number));
          for (const [key] of qc.getQueriesData<ThreadData>({ queryKey: ["dm-thread"] })) {
            qc.setQueryData<ThreadData>(key, (old) => (old ? { ...old, messages: old.messages.filter((m) => !ids.has(m.id)) } : old));
          }
          qc.invalidateQueries({ queryKey: CONV_KEY });
          break;
        }
        case "cleared":
          qc.setQueryData<ThreadData>(threadKey(Number(data.userId)), { messages: [], hasMore: false });
          qc.invalidateQueries({ queryKey: CONV_KEY });
          break;
        case "unread":
          qc.invalidateQueries({ queryKey: UNREAD_KEY });
          break;
      }
    },
    [qc, me, catchUp, patchMine],
  );

  const stream = useChatStream(!!user, onEvent);
  const live = stream === "open";

  // Si el tiempo real no está disponible, se revisa cada pocos segundos (solo lo nuevo).
  useEffect(() => {
    if (live || !selected) return;
    const t = setInterval(() => void catchUp(selected.id), 7000);
    return () => clearInterval(t);
  }, [live, selected, catchUp]);

  const { data: conversations = [], isLoading: loadingConversations } = useConversations(live ? 60_000 : 20_000);

  // "escribiendo…" se apaga solo
  useEffect(() => {
    if (!typing.size) return;
    const t = setInterval(() => {
      setTyping((m) => {
        const now = Date.now();
        let changed = false;
        const next = new Map(m);
        for (const [k, until] of next) {
          if (until < now) {
            next.delete(k);
            changed = true;
          }
        }
        return changed ? next : m;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [typing.size]);
  const typingIds = useMemo(() => new Set([...typing.entries()].filter(([, until]) => until > Date.now()).map(([k]) => k)), [typing]);

  // Abrir el chat pedido en la dirección (?to=123)
  useEffect(() => {
    if (!pendingTo || !user) return;
    const conv = conversations.find((c) => c.user.id === pendingTo);
    if (conv) {
      setSelected(conv.user);
      setPendingTo(null);
      return;
    }
    if (loadingConversations) return;
    let cancelled = false;
    chatFetch<ChatUser>(`/api/users/${pendingTo}`)
      .then((u) => {
        if (!cancelled && u?.id && u.id !== me) setSelected({ id: u.id, username: u.username, displayName: u.displayName, avatarUrl: u.avatarUrl });
      })
      .catch(() => {})
      .finally(() => !cancelled && setPendingTo(null));
    return () => {
      cancelled = true;
    };
  }, [pendingTo, conversations, loadingConversations, user, me]);

  // Presencia del chat abierto (si no vino en la lista)
  useEffect(() => {
    if (!selected) return;
    let cancelled = false;
    chatFetch<{ online: boolean }>(`/api/dm/presence/${selected.id}`)
      .then((r) => !cancelled && setOnline((o) => new Map(o).set(selected.id, !!r.online)))
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [selected]);

  // En el celular, "atrás" cierra el chat en lugar de salir de Mensajes.
  const choose = useCallback((u: ChatUser | null) => {
    const small = window.matchMedia?.("(max-width: 767px)").matches;
    if (u && small && !openRef.current) window.history.pushState({ chat: u.id }, "");
    setSelected(u);
  }, []);
  useEffect(() => {
    const onPop = () => {
      if (openRef.current && window.matchMedia?.("(max-width: 767px)").matches) setSelected(null);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const totalUnread = conversations.reduce((a, c) => a + (c.unreadCount || 0), 0);
  useEffect(() => {
    const prev = document.title;
    document.title = totalUnread ? `(${totalUnread}) Mensajes · Avivando el Fuego` : "Mensajes · Avivando el Fuego";
    return () => {
      document.title = prev;
    };
  }, [totalUnread]);

  if (isLoading || !user) {
    return (
      <Layout>
        <div className="flex flex-1 items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  const onlineOfSelected = selected ? online.get(selected.id) ?? conversations.find((c) => c.user.id === selected.id)?.online ?? false : false;

  return (
    <Layout>
      <div className="mx-auto max-w-6xl px-2 py-3 sm:px-4 sm:py-5">
        <div className={`mb-3 flex items-end justify-between gap-3 px-1 ${selected ? "hidden md:flex" : "flex"}`}>
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-bold sm:text-3xl">
              <MessageCircle className="h-7 w-7 text-primary" /> Mensajes
            </h1>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
              <Lock className="h-3 w-3" /> Privados entre ustedes dos · fotos, notas de voz y documentos
            </p>
          </div>
          <span
            className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] ${live ? "bg-green-500/10 text-green-600 dark:text-green-400" : "bg-amber-500/10 text-amber-700 dark:text-amber-300"}`}
            title={live ? "Los mensajes llegan al instante" : "Reconectando: los mensajes se revisan cada pocos segundos"}
            data-testid="chat-live-status"
          >
            {live ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
            {live ? "En vivo" : "Reconectando…"}
          </span>
        </div>

        <div
          ref={gridRef}
          style={{ ["--chat-top" as string]: `${gridTop}px` }}
          className="grid h-[calc(100dvh-var(--app-tabbar-h,0px)-var(--chat-top)-12px)] min-h-[380px] grid-cols-1 gap-3 md:min-h-[480px] md:grid-cols-[320px_1fr] lg:grid-cols-[340px_1fr]"
        >
          <Card className={`min-h-0 flex-col overflow-hidden ${selected ? "hidden md:flex" : "flex"}`}>
            <ConversationList
              me={me}
              conversations={conversations}
              loading={loadingConversations}
              selectedId={selected?.id ?? null}
              typingIds={typingIds}
              onlineIds={online}
              onSelect={(u) => choose(u)}
            />
          </Card>

          <Card className={`min-h-0 flex-col overflow-hidden ${selected ? "flex" : "hidden md:flex"}`}>
            {selected ? (
              <ChatThread
                key={selected.id}
                me={me}
                other={selected}
                online={onlineOfSelected}
                typing={typingIds.has(selected.id)}
                onBack={() => {
                  if (window.history.state?.chat) window.history.back();
                  else setSelected(null);
                }}
              />
            ) : (
              <div className="flex flex-1 items-center justify-center p-6">
                <div className="max-w-sm text-center">
                  <MessageCircle className="mx-auto mb-4 h-16 w-16 text-muted-foreground/60" />
                  <h2 className="mb-1 text-lg font-semibold">Elige un chat</h2>
                  <p className="text-sm text-muted-foreground">
                    Escribe, manda fotos, documentos o notas de voz. Toca la flechita de un mensaje (o déjalo presionado en el
                    celular) para responder, reaccionar, editar o eliminar.
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </Layout>
  );
}
