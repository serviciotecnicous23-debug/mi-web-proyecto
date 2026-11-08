import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2, MessageCircle, Search, UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Ticks } from "./MessageBubble";
import { initials } from "./ChatThread";
import type { ChatUser, Conversation } from "./types";

function shortTime(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  if (d.toDateString() === now.toDateString()) return d.toLocaleTimeString("es", { hour: "numeric", minute: "2-digit" });
  const y = new Date();
  y.setDate(now.getDate() - 1);
  if (d.toDateString() === y.toDateString()) return "Ayer";
  if (now.getTime() - d.getTime() < 6 * 86400_000) return d.toLocaleDateString("es", { weekday: "short" });
  return d.toLocaleDateString("es", { day: "2-digit", month: "2-digit", year: "2-digit" });
}

function Row({
  user, active, online, onClick, children, right,
}: {
  user: ChatUser;
  active: boolean;
  online?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 border-b px-3 py-2.5 text-left transition-colors hover:bg-muted/60 ${active ? "bg-muted" : ""}`}
      data-testid={`chat-row-${user.id}`}
    >
      <div className="relative shrink-0">
        <Avatar className="h-11 w-11">
          {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt="" />}
          <AvatarFallback className="bg-primary/10 text-sm text-primary">{initials(user)}</AvatarFallback>
        </Avatar>
        {online && <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card bg-green-500" aria-label="En línea" />}
      </div>
      <div className="min-w-0 flex-1">{children}</div>
      {right}
    </button>
  );
}

export function ConversationList({
  me, conversations, loading, selectedId, typingIds, onlineIds, onSelect,
}: {
  me: number;
  conversations: Conversation[];
  loading: boolean;
  selectedId: number | null;
  typingIds: Set<number>;
  onlineIds: Map<number, boolean>;
  onSelect: (user: ChatUser) => void;
}) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const { data: friends = [] } = useQuery<any[]>({ queryKey: ["/api/friends"] });
  const { data: searchResults = [], isFetching: searching } = useQuery<any[]>({
    queryKey: ["/api/friends/search", q],
    queryFn: async () => {
      const res = await fetch(`/api/friends/search?q=${encodeURIComponent(q)}`, { credentials: "include" });
      if (!res.ok) return [];
      return res.json();
    },
    enabled: q.length >= 2,
  });

  const filtered = useMemo(
    () => (q ? conversations.filter((c) => `${c.user.displayName || ""} ${c.user.username}`.toLowerCase().includes(q)) : conversations),
    [conversations, q],
  );
  const withChat = new Set(conversations.map((c) => c.user.id));
  const friendUsers: ChatUser[] = friends
    .map((f: any) => f.friend)
    .filter((u: any) => u && !withChat.has(u.id))
    .filter((u: any) => !q || `${u.displayName || ""} ${u.username}`.toLowerCase().includes(q));
  const found: ChatUser[] = (searchResults as any[])
    .filter((u) => u.friendshipStatus === "accepted" && !withChat.has(u.id) && !friendUsers.some((f) => f.id === u.id));

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="border-b p-2.5">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="h-10 rounded-full pl-9"
            placeholder="Buscar un chat o un amigo"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Buscar un chat o un amigo"
          />
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            {filtered.map((c) => {
              const lm = c.lastMessage;
              const typing = typingIds.has(c.user.id);
              const online = onlineIds.get(c.user.id) ?? c.online;
              const mineLast = lm && lm.senderId === me;
              return (
                <Row
                  key={c.user.id}
                  user={c.user}
                  active={selectedId === c.user.id}
                  online={online}
                  onClick={() => onSelect(c.user)}
                  right={
                    <div className="flex shrink-0 flex-col items-end gap-1 self-start pt-0.5">
                      {lm && <span className={`text-[11px] ${c.unreadCount ? "font-semibold text-primary" : "text-muted-foreground"}`}>{shortTime(lm.createdAt)}</span>}
                      {c.unreadCount > 0 && (
                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[11px] font-bold text-primary-foreground">
                          {c.unreadCount > 99 ? "99+" : c.unreadCount}
                        </span>
                      )}
                    </div>
                  }
                >
                  <p className="truncate font-medium">{c.user.displayName || c.user.username}</p>
                  <p className={`flex items-center gap-1 truncate text-sm ${typing ? "font-medium text-green-600 dark:text-green-400" : "text-muted-foreground"}`}>
                    {typing ? (
                      "escribiendo…"
                    ) : lm ? (
                      <>
                        {mineLast && !lm.deletedAt && <Ticks msg={{ readAt: lm.readAt ?? null, isRead: lm.isRead, deliveredAt: lm.deliveredAt ?? null }} className="shrink-0" />}
                        <span className="truncate">{lm.deletedAt ? "🚫 Mensaje eliminado" : lm.content || "Mensaje"}</span>
                      </>
                    ) : null}
                  </p>
                </Row>
              );
            })}

            {!filtered.length && !friendUsers.length && !found.length && (
              <div className="px-4 py-10 text-center">
                <MessageCircle className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">{q ? "No hay chats con ese nombre." : "Todavía no tienes conversaciones."}</p>
                <p className="mt-1 text-xs text-muted-foreground">Busca a un amigo por su nombre para escribirle.</p>
              </div>
            )}

            {(friendUsers.length > 0 || found.length > 0) && (
              <>
                <p className="flex items-center gap-1.5 border-b bg-muted/40 px-3 py-1.5 text-xs font-medium text-muted-foreground">
                  <UserPlus className="h-3.5 w-3.5" /> Empezar un chat
                  {searching && <Loader2 className="h-3 w-3 animate-spin" />}
                </p>
                {[...friendUsers, ...found].map((u) => (
                  <Row key={u.id} user={u} active={selectedId === u.id} onClick={() => onSelect(u)}>
                    <p className="truncate font-medium">{u.displayName || u.username}</p>
                    <p className="truncate text-xs text-muted-foreground">@{u.username}</p>
                  </Row>
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
