/**
 * Datos del chat: conversaciones, páginas de mensajes, envío con vista inmediata (antes de
 * que responda el servidor), reintento, y los eventos en tiempo real (/api/dm/stream).
 */
import { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient, type QueryClient } from "@tanstack/react-query";
import { uploadFile } from "@/components/media/upload";
import { prepareImage } from "./chat-media";
import type { ChatAttachment, ChatKind, ChatMessage, Conversation, ThreadData } from "./types";

export const CONV_KEY = ["/api/messages/conversations"] as const;
export const UNREAD_KEY = ["/api/messages/unread-count"] as const;
export const threadKey = (otherId: number) => ["dm-thread", otherId] as const;
export const PAGE = 40;

export async function chatFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    credentials: "include",
    headers: init?.body ? { "Content-Type": "application/json", ...(init?.headers || {}) } : init?.headers,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message || (res.status === 401 ? "Tu sesión terminó: vuelve a iniciar sesión." : "No se pudo completar. Revisa tu conexión."));
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export function useConversations(pollMs: number | false) {
  return useQuery<Conversation[]>({
    queryKey: CONV_KEY,
    queryFn: () => chatFetch<Conversation[]>("/api/messages/conversations"),
    refetchInterval: pollMs,
  });
}

export function useThread(otherId: number | null) {
  return useQuery<ThreadData>({
    queryKey: threadKey(otherId ?? 0),
    queryFn: async () => {
      const list = await chatFetch<ChatMessage[]>(`/api/messages/${otherId}?limit=${PAGE}`);
      return { messages: list, hasMore: list.length >= PAGE };
    },
    enabled: !!otherId,
    staleTime: Infinity, // el tiempo real la mantiene al día; al reconectar se ponen al día
    gcTime: 15 * 60_000,
  });
}

// ---------------------------------------------------------------- caché
/** Une mensajes sin duplicar (por id, y los que se estaban enviando por clientId). */
export function mergeMessages(list: ChatMessage[], incoming: ChatMessage[]): ChatMessage[] {
  const byId = new Map<number, ChatMessage>();
  const pending = new Map<string, ChatMessage>();
  for (const m of list) {
    if (m.pending && m.clientId) pending.set(m.clientId, m);
    else byId.set(m.id, m);
  }
  for (const m of incoming) {
    let localPreview: string | undefined;
    if (m.clientId && pending.has(m.clientId)) {
      localPreview = pending.get(m.clientId)!.localPreview;
      pending.delete(m.clientId);
    }
    const prev = byId.get(m.id);
    byId.set(m.id, { ...m, localPreview: localPreview ?? prev?.localPreview, pending: undefined, progress: undefined });
  }
  return [...[...byId.values()].sort((a, b) => a.id - b.id), ...pending.values()];
}

function patchThread(qc: QueryClient, otherId: number, fn: (messages: ChatMessage[]) => ChatMessage[]) {
  qc.setQueryData<ThreadData>(threadKey(otherId), (old) => (old ? { ...old, messages: fn(old.messages) } : old));
}

export function previewOf(kind: string | undefined, content: string, attachmentName?: string | null): string {
  const text = (content || "").trim();
  switch (kind) {
    case "image":
      return text ? `📷 ${text}` : "📷 Foto";
    case "audio":
      return "🎤 Nota de voz";
    case "video":
      return text ? `🎬 ${text}` : "🎬 Video";
    case "file":
      return `📎 ${attachmentName || "Documento"}`;
    default:
      return text;
  }
}

/** Sube la conversación al primer lugar de la lista con su último mensaje. */
export function bumpConversation(qc: QueryClient, msg: ChatMessage, me: number, openId: number | null) {
  const other = msg.senderId === me ? msg.receiverId : msg.senderId;
  let found = false;
  qc.setQueryData<Conversation[]>(CONV_KEY, (old) => {
    if (!old) return old;
    const list = old.map((c) => {
      if (c.user.id !== other) return c;
      found = true;
      const isNew = !c.lastMessage || msg.id > c.lastMessage.id;
      const incomingUnread = msg.senderId !== me && !msg.isRead && other !== openId && isNew;
      return {
        ...c,
        lastMessage: isNew || c.lastMessage?.id === msg.id
          ? {
              id: msg.id,
              content: msg.deletedAt ? "" : previewOf(msg.kind, msg.content, msg.attachment?.name),
              senderId: msg.senderId,
              createdAt: msg.createdAt,
              isRead: msg.isRead,
              kind: msg.kind,
              deletedAt: msg.deletedAt,
              deliveredAt: msg.deliveredAt,
              readAt: msg.readAt,
            }
          : c.lastMessage,
        unreadCount: incomingUnread ? c.unreadCount + 1 : c.unreadCount,
      };
    });
    return list.sort((a, b) => (b.lastMessage?.id ?? 0) - (a.lastMessage?.id ?? 0));
  });
  if (!found && msg.id > 0) qc.invalidateQueries({ queryKey: CONV_KEY });
}

// ---------------------------------------------------------------- eventos en tiempo real
export type StreamStatus = "connecting" | "open" | "closed";

export function useChatStream(enabled: boolean, onEvent: (type: string, data: any) => void): StreamStatus {
  const [status, setStatus] = useState<StreamStatus>("connecting");
  const handler = useRef(onEvent);
  handler.current = onEvent;
  useEffect(() => {
    if (!enabled || typeof EventSource === "undefined") {
      setStatus("closed");
      return;
    }
    const es = new EventSource("/api/dm/stream", { withCredentials: true });
    const types = ["ready", "message", "update", "read", "delivered", "typing", "presence", "hidden", "cleared", "unread"];
    for (const t of types) {
      es.addEventListener(t, (e) => {
        try {
          handler.current(t, JSON.parse((e as MessageEvent).data || "null"));
        } catch {
          /* evento raro: se ignora */
        }
      });
    }
    es.onopen = () => setStatus("open");
    es.onerror = () => setStatus(es.readyState === EventSource.CLOSED ? "closed" : "connecting");
    return () => es.close();
  }, [enabled]);
  return status;
}

// ---------------------------------------------------------------- acciones
type Outgoing = {
  otherId: number;
  content: string;
  replyTo?: ChatMessage | null;
  file?: File;
  kind?: ChatKind;
  duration?: number;
};

const retryFiles = new Map<string, Outgoing>();

function newClientId() {
  const rnd = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID().replace(/-/g, "") : Math.random().toString(36).slice(2);
  return `c${Date.now().toString(36)}${rnd.slice(0, 12)}`;
}

function kindOfFile(file: File): ChatKind {
  if (file.type.startsWith("image/")) return "image";
  if (file.type.startsWith("audio/")) return "audio";
  if (file.type.startsWith("video/")) return "video";
  return "file";
}

export function useChatActions(me: number) {
  const qc = useQueryClient();

  async function deliver(out: Outgoing, clientId: string) {
    const { otherId } = out;
    const setPending = (patch: Partial<ChatMessage>) =>
      patchThread(qc, otherId, (list) => list.map((m) => (m.clientId === clientId && m.pending ? { ...m, ...patch } : m)));
    try {
      let attachment: (Omit<ChatAttachment, "size" | "mime" | "width" | "height" | "duration"> & {
        size?: number; mime?: string; kind: ChatKind; width?: number; height?: number; duration?: number;
      }) | null = null;
      if (out.file) {
        let file = out.file;
        let width: number | undefined;
        let height: number | undefined;
        const kind = out.kind || kindOfFile(file);
        if (kind === "image") {
          const prepared = await prepareImage(file);
          file = prepared.file;
          width = prepared.width || undefined;
          height = prepared.height || undefined;
        }
        let lastPaint = 0;
        const up = await uploadFile(file, {
          folder: "chat",
          onProgress: (p) => {
            if (Date.now() - lastPaint > 150 || p === 1) {
              lastPaint = Date.now();
              setPending({ progress: p });
            }
          },
        });
        attachment = {
          url: up.url,
          name: up.fileName || file.name,
          size: up.fileSize,
          mime: up.mimeType,
          kind,
          width,
          height,
          duration: out.duration ? Math.round(out.duration * 10) / 10 : undefined,
        };
      }
      const saved = await chatFetch<ChatMessage>("/api/messages", {
        method: "POST",
        body: JSON.stringify({
          receiverId: otherId,
          content: out.content,
          clientId,
          replyToId: out.replyTo && out.replyTo.id > 0 ? out.replyTo.id : null,
          attachment,
        }),
      });
      retryFiles.delete(clientId);
      patchThread(qc, otherId, (list) => mergeMessages(list, [saved]));
      bumpConversation(qc, saved, me, otherId);
    } catch (err) {
      setPending({ pending: "error", errorText: err instanceof Error ? err.message : "No se envió" });
    }
  }

  function send(out: Outgoing) {
    const clientId = newClientId();
    const kind: ChatKind = out.file ? out.kind || kindOfFile(out.file) : "text";
    const temp: ChatMessage = {
      id: -Date.now(),
      senderId: me,
      receiverId: out.otherId,
      content: out.content,
      kind,
      isRead: false,
      createdAt: new Date().toISOString(),
      deliveredAt: null,
      readAt: null,
      editedAt: null,
      deletedAt: null,
      clientId,
      attachment: out.file
        ? { url: "", name: out.file.name, size: out.file.size, mime: out.file.type, width: null, height: null, duration: out.duration ?? null }
        : null,
      replyTo: out.replyTo
        ? {
            id: out.replyTo.id,
            senderId: out.replyTo.senderId,
            content: out.replyTo.content.slice(0, 160),
            kind: out.replyTo.kind,
            attachmentName: out.replyTo.attachment?.name ?? null,
            deleted: !!out.replyTo.deletedAt,
          }
        : null,
      reactions: {},
      pending: "sending",
      progress: out.file ? 0 : undefined,
      localPreview: out.file && (kind === "image" || kind === "audio" || kind === "video") ? URL.createObjectURL(out.file) : undefined,
    };
    qc.setQueryData<ThreadData>(threadKey(out.otherId), (old) => ({
      messages: [...(old?.messages || []), temp],
      hasMore: old?.hasMore ?? false,
    }));
    retryFiles.set(clientId, out);
    void deliver(out, clientId);
  }

  function retry(msg: ChatMessage) {
    if (!msg.clientId) return;
    const out = retryFiles.get(msg.clientId);
    if (!out) return;
    patchThread(qc, out.otherId, (list) =>
      list.map((m) => (m.clientId === msg.clientId ? { ...m, pending: "sending", errorText: undefined, progress: out.file ? 0 : undefined } : m)),
    );
    void deliver(out, msg.clientId);
  }

  function discard(msg: ChatMessage) {
    if (msg.clientId) retryFiles.delete(msg.clientId);
    patchThread(qc, msg.receiverId, (list) => list.filter((m) => m.clientId !== msg.clientId || !m.pending));
  }

  async function edit(msg: ChatMessage, content: string) {
    const saved = await chatFetch<ChatMessage>(`/api/dm/messages/${msg.id}`, { method: "PATCH", body: JSON.stringify({ content }) });
    applyUpdate(saved);
  }

  async function remove(msg: ChatMessage, forAll: boolean) {
    const other = msg.senderId === me ? msg.receiverId : msg.senderId;
    if (forAll) {
      const saved = await chatFetch<ChatMessage>(`/api/dm/messages/${msg.id}?para=todos`, { method: "DELETE" });
      applyUpdate(saved);
    } else {
      await chatFetch(`/api/dm/messages/${msg.id}`, { method: "DELETE" });
      patchThread(qc, other, (list) => list.filter((m) => m.id !== msg.id));
      qc.invalidateQueries({ queryKey: CONV_KEY });
    }
  }

  async function react(msg: ChatMessage, emoji: string | null) {
    const mine = Object.entries(msg.reactions || {}).find(([, users]) => users.includes(me))?.[0] ?? null;
    const next = emoji && emoji === mine ? null : emoji;
    // Se ve al instante; el servidor confirma.
    const optimistic: Record<string, number[]> = {};
    for (const [e, users] of Object.entries(msg.reactions || {})) {
      const rest = users.filter((u) => u !== me);
      if (rest.length) optimistic[e] = rest;
    }
    if (next) optimistic[next] = [...(optimistic[next] || []), me];
    applyUpdate({ ...msg, reactions: optimistic });
    // El servidor alterna: la misma reacción otra vez la quita.
    const saved = await chatFetch<ChatMessage>(`/api/dm/messages/${msg.id}/react`, {
      method: "POST",
      body: JSON.stringify({ emoji }),
    });
    applyUpdate(saved);
  }

  async function clearChat(otherId: number) {
    await chatFetch(`/api/dm/conversations/${otherId}`, { method: "DELETE" });
    qc.setQueryData<ThreadData>(threadKey(otherId), { messages: [], hasMore: false });
    qc.invalidateQueries({ queryKey: CONV_KEY });
  }

  function applyUpdate(msg: ChatMessage) {
    const other = msg.senderId === me ? msg.receiverId : msg.senderId;
    patchThread(qc, other, (list) => list.map((m) => (m.id === msg.id ? { ...msg, localPreview: m.localPreview } : m)));
    bumpConversation(qc, msg, me, null);
  }

  return { send, retry, discard, edit, remove, react, clearChat, applyUpdate };
}
