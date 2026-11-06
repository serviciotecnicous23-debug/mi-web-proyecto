import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { loginUrl } from "@/lib/login-redirect";
import { useConversations, useDirectMessages, useSendDirectMessage, useUnreadMessageCount } from "@/hooks/use-users";
import { useLocation } from "wouter";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Loader2, Send, ArrowLeft, Mail, MessageCircle, Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function Mensajes() {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // En el celular la conversación llena el espacio hasta la barra inferior. Se mide dónde
  // empieza (cambia con el aviso de verificar el correo) para que el campo de escribir
  // nunca quede tapado por la barra.
  const gridRef = useRef<HTMLDivElement>(null);
  const [gridTop, setGridTop] = useState(270);
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

  const { data: conversations = [], isLoading: isLoadingConversations } = useConversations();
  const { data: chatMessages = [], isLoading: isLoadingMessages } = useDirectMessages(selectedUserId);
  const sendMessage = useSendDirectMessage();

  // Search friends to start new conversation
  const { data: searchResults = [] } = useQuery<any[]>({
    queryKey: ["/api/friends/search", searchQuery],
    queryFn: async () => {
      const res = await fetch(`/api/friends/search?q=${encodeURIComponent(searchQuery)}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Error al buscar");
      return res.json();
    },
    enabled: !!user && searchQuery.length > 0,
  });

  // Get friends list
  const { data: friends = [] } = useQuery<any[]>({
    queryKey: ["/api/friends"],
    enabled: !!user,
  });

  useEffect(() => {
    if (!isLoading && !user) {
      setLocation(loginUrl());
    }
  }, [user, isLoading, setLocation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Check URL params for pre-selected user
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const toUser = params.get("to");
    if (toUser) {
      setSelectedUserId(parseInt(toUser));
    }
  }, []);

  if (isLoading || !user) {
    return (
      <Layout>
        <div className="flex-1 flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim() || !selectedUserId) return;
    sendMessage.mutate({ receiverId: selectedUserId, content: message.trim() }, {
      onSuccess: () => setMessage(""),
    });
  }

  const selectedConversation = conversations.find((c: any) => c.user.id === selectedUserId);
  const selectedFriend = friends.find((f: any) => f.friend?.id === selectedUserId)?.friend;
  const selectedUser = selectedConversation?.user || selectedFriend || null;

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Mail className="h-8 w-8 text-primary" />
            Mensajes
          </h1>
          <p className="text-muted-foreground mt-1">
            Envía y recibe mensajes directos con tus amigos del ministerio.
          </p>
        </div>

        {/* En el celular, como en WhatsApp: la lista sola, y al tocar una conversación,
            la conversación sola con "volver". En la computadora, las dos a la vez. */}
        <div
          ref={gridRef}
          style={{ ["--chat-top" as string]: `${gridTop}px` }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100dvh-var(--app-tabbar-h)-var(--chat-top)-12px)] min-h-[360px] md:h-[calc(100vh-280px)] md:min-h-[500px]"
        >
          {/* Conversation List */}
          <Card className={`md:col-span-1 flex-col overflow-hidden ${selectedUserId ? "hidden md:flex" : "flex"}`}>
            <CardHeader className="py-3 px-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  className="pl-9 h-9"
                  placeholder="Buscar amigos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="p-0 flex-1 overflow-y-auto">
              {/* Search results */}
              {searchQuery && searchResults.filter((u: any) => u.friendshipStatus === "accepted").length > 0 && (
                <div className="border-b pb-2">
                  <p className="text-xs text-muted-foreground px-4 py-2">Resultados de búsqueda</p>
                  {searchResults
                    .filter((u: any) => u.friendshipStatus === "accepted")
                    .map((u: any) => (
                      <button
                        key={u.id}
                        className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors text-left ${selectedUserId === u.id ? "bg-muted" : ""}`}
                        onClick={() => { setSelectedUserId(u.id); setSearchQuery(""); }}
                      >
                        <Avatar className="h-10 w-10">
                          {u.avatarUrl && <AvatarImage src={u.avatarUrl} />}
                          <AvatarFallback className="bg-primary/10 text-primary text-sm">
                            {(u.displayName || u.username).slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{u.displayName || u.username}</p>
                          <p className="text-xs text-muted-foreground truncate">@{u.username}</p>
                        </div>
                      </button>
                    ))}
                </div>
              )}

              {/* Existing conversations */}
              {isLoadingConversations ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : conversations.length === 0 && !searchQuery ? (
                <div className="text-center py-8 px-4">
                  <MessageCircle className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">Sin conversaciones aún</p>
                  <p className="text-xs text-muted-foreground mt-1">Busca un amigo para enviarle un mensaje.</p>
                </div>
              ) : (
                !searchQuery && conversations.map((conv: any) => (
                  <button
                    key={conv.user.id}
                    className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors text-left border-b ${selectedUserId === conv.user.id ? "bg-muted" : ""}`}
                    onClick={() => setSelectedUserId(conv.user.id)}
                  >
                    <Avatar className="h-10 w-10">
                      {conv.user.avatarUrl && <AvatarImage src={conv.user.avatarUrl} />}
                      <AvatarFallback className="bg-primary/10 text-primary text-sm">
                        {(conv.user.displayName || conv.user.username).slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm truncate">{conv.user.displayName || conv.user.username}</p>
                        {conv.unreadCount > 0 && (
                          <Badge variant="destructive" className="h-5 min-w-5 text-[10px] justify-center">
                            {conv.unreadCount}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {conv.lastMessage?.content || ""}
                      </p>
                    </div>
                  </button>
                ))
              )}

              {/* Friends without conversations */}
              {!searchQuery && friends.length > 0 && (
                <>
                  <p className="text-xs text-muted-foreground px-4 py-2 border-t">Amigos</p>
                  {friends
                    .filter((f: any) => !conversations.find((c: any) => c.user.id === f.friend?.id))
                    .map((f: any) => (
                      <button
                        key={f.id}
                        className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors text-left ${selectedUserId === f.friend?.id ? "bg-muted" : ""}`}
                        onClick={() => setSelectedUserId(f.friend?.id)}
                      >
                        <Avatar className="h-10 w-10">
                          {f.friend?.avatarUrl && <AvatarImage src={f.friend.avatarUrl} />}
                          <AvatarFallback className="bg-primary/10 text-primary text-sm">
                            {(f.friend?.displayName || f.friend?.username || "?").slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{f.friend?.displayName || f.friend?.username}</p>
                          <p className="text-xs text-muted-foreground truncate">@{f.friend?.username}</p>
                        </div>
                      </button>
                    ))}
                </>
              )}
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className={`md:col-span-2 flex-col overflow-hidden ${selectedUserId ? "flex" : "hidden md:flex"}`}>
            {!selectedUserId ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-1">Selecciona una conversación</h3>
                  <p className="text-sm text-muted-foreground">Elige un amigo de la lista para comenzar a chatear.</p>
                </div>
              </div>
            ) : (
              <>
                {/* Chat Header */}
                <CardHeader className="py-3 px-4 border-b flex flex-row items-center gap-3">
                  <Button variant="ghost" size="icon" className="md:hidden h-10 w-10" onClick={() => setSelectedUserId(null)} aria-label="Volver a las conversaciones">
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <Avatar className="h-9 w-9">
                    {selectedUser?.avatarUrl && <AvatarImage src={selectedUser.avatarUrl} />}
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">
                      {(selectedUser?.displayName || selectedUser?.username || "?").slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-sm">{selectedUser?.displayName || selectedUser?.username || "Usuario"}</CardTitle>
                    <p className="text-xs text-muted-foreground">@{selectedUser?.username}</p>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-3">
                  {isLoadingMessages ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    </div>
                  ) : chatMessages.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-sm text-muted-foreground">No hay mensajes aún. ¡Envía el primero!</p>
                    </div>
                  ) : (
                    chatMessages.map((msg: any) => {
                      const isMine = msg.senderId === user.id;
                      return (
                        <div key={msg.id} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                          <div className={`flex gap-2 max-w-[80%] ${isMine ? "flex-row-reverse" : ""}`}>
                            {!isMine && (
                              <Avatar className="h-7 w-7 shrink-0">
                                {msg.sender?.avatarUrl && <AvatarImage src={msg.sender.avatarUrl} />}
                                <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                                  {(msg.sender?.displayName || msg.sender?.username || "?").slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                            )}
                            <div>
                              <div className={`rounded-2xl px-4 py-2 ${isMine ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                              </div>
                              <p className={`text-[10px] text-muted-foreground mt-1 ${isMine ? "text-right" : ""}`}>
                                {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }) : ''}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                  <div ref={messagesEndRef} />
                </CardContent>

                {/* Message Input */}
                <div className="border-t p-3">
                  <form onSubmit={handleSend} className="flex gap-2">
                    <Input
                      placeholder="Escribe un mensaje..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit" disabled={sendMessage.isPending || !message.trim()}>
                      {sendMessage.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </form>
                </div>
              </>
            )}
          </Card>
        </div>
      </div>
    </Layout>
  );
}
