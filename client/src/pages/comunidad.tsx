import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { loginUrl } from "@/lib/login-redirect";
import { useMemberPosts, useCreateMemberPost, useDeleteMemberPost, usePostComments, useCreatePostComment, useDeletePostComment } from "@/hooks/use-users";
import { useLocation } from "wouter";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Loader2, Send, Trash2, MessageSquare, ImagePlus, X, ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

import { withAccents } from "@shared/labels";
import { RichText } from "@/components/media/RichText";
import { FileAttachment } from "@/components/media/FileAttachment";
import { AttachButton, AttachedFile, LinkDraftPreview } from "@/components/media/Composer";
import type { UploadedFile } from "@/components/media/upload";

/** El usuario se muestra con @ solo si no es un correo (hay cuentas cuyo usuario es su correo). */
function publicHandle(username?: string | null) {
  return username && !username.includes("@") ? `@${username}` : "";
}
/** "hace 2 horas"; la fecha completa queda en el título (al pasar el ratón). */
function timeAgo(date?: string | Date | null) {
  if (!date) return "";
  try {
    return formatDistanceToNow(new Date(date), { addSuffix: true, locale: es });
  } catch {
    return "";
  }
}

function PostComments({ postId, user }: { postId: number; user: any }) {
  const { data: comments = [], isLoading } = usePostComments(postId);
  const createComment = useCreatePostComment();
  const deleteComment = useDeletePostComment();
  const [newComment, setNewComment] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newComment.trim()) return;
    createComment.mutate({ postId, content: newComment.trim() }, {
      onSuccess: () => setNewComment(""),
    });
  }

  return (
    <div className="mt-3 pt-3 border-t space-y-3">
      {isLoading ? (
        <div className="flex justify-center py-2">
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        </div>
      ) : (
        comments.map((comment: any) => (
          <div key={comment.id} className="flex items-start gap-2 pl-2">
            <Avatar className="h-7 w-7">
              {comment.user?.avatarUrl && <AvatarImage src={comment.user.avatarUrl} />}
              <AvatarFallback className="text-[10px] bg-primary/5 text-primary">
                {(comment.user?.displayName || comment.user?.username || "?").slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="bg-muted/50 rounded-lg px-3 py-2">
                <span className="font-medium text-xs">
                  {comment.user?.displayName || comment.user?.username || "Usuario"}
                </span>
                <RichText text={comment.content} className="text-sm" compact maxEmbeds={1} />
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] text-muted-foreground" title={comment.createdAt ? new Date(comment.createdAt).toLocaleString("es") : undefined}>
                  {timeAgo(comment.createdAt)}
                </span>
                {(comment.userId === user.id || user.role === "admin") && (
                  <button
                    className="text-[10px] text-destructive hover:underline"
                    onClick={() => deleteComment.mutate({ id: comment.id, postId })}
                  >
                    Eliminar
                  </button>
                )}
              </div>
            </div>
          </div>
        ))
      )}
      <form onSubmit={handleSubmit} className="flex gap-2 pl-2">
        <Avatar className="h-7 w-7">
          {user.avatarUrl && <AvatarImage src={user.avatarUrl} />}
          <AvatarFallback className="text-[10px] bg-primary/5 text-primary">
            {(user.displayName || user.username).slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 flex gap-2">
          <Input
            placeholder="Escribe un comentario..."
            className="h-8 text-sm"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button type="submit" size="sm" variant="ghost" disabled={createComment.isPending || !newComment.trim()} className="h-8 px-2">
            <Send className="h-3 w-3" />
          </Button>
        </div>
      </form>
    </div>
  );
}

export default function Comunidad() {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();
  const { data: posts, isLoading: isLoadingPosts } = useMemberPosts();
  const createPost = useCreateMemberPost();
  const deletePost = useDeleteMemberPost();
  const [newMessage, setNewMessage] = useState("");
  // El cuadro de publicar empieza en una línea (como en las apps) y crece al tocarlo;
  // una vez abierto se queda abierto, para que "Imagen" no se cierre al pulsarlo.
  const [composerOpen, setComposerOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [attachment, setAttachment] = useState<UploadedFile | null>(null);
  const [uploading, setUploading] = useState(false);
  const [expandedComments, setExpandedComments] = useState<Set<number>>(new Set());
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  if (isLoading) {
    return (
      <Layout>
        <div className="flex-1 flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newMessage.trim() && !imageUrl && !attachment) return;
    createPost.mutate(
      {
        content: newMessage.trim(),
        imageUrl,
        fileUrl: attachment?.url ?? null,
        fileName: attachment?.fileName ?? null,
        fileSize: attachment?.fileSize ?? null,
        fileMime: attachment?.mimeType ?? null,
      },
      {
        onSuccess: () => {
          setNewMessage("");
          setImageUrl(null);
          setAttachment(null);
        },
      }
    );
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast({ title: "Error", description: "Solo se permiten imágenes.", variant: "destructive" });
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      toast({ title: "Error", description: "La imagen no debe superar 15 MB.", variant: "destructive" });
      return;
    }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch("/api/upload/post-image", { method: "POST", body: formData, credentials: "include" });
      if (!res.ok) throw new Error("Error al subir imagen");
      const data = await res.json();
      setImageUrl(data.imageUrl);
    } catch {
      toast({ title: "Error", description: "No se pudo subir la imagen.", variant: "destructive" });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function toggleComments(postId: number) {
    setExpandedComments(prev => {
      const next = new Set(prev);
      if (next.has(postId)) next.delete(postId);
      else next.add(postId);
      return next;
    });
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-3" data-testid="text-community-title">
            <MessageSquare className="h-8 w-8 text-primary" />
            Comunidad
          </h1>
          <p className="text-muted-foreground mt-1">
            Comparte mensajes, testimonios, prédicas y estudios. Los videos de YouTube, Facebook, Instagram o TikTok se ven aquí mismo.
          </p>
        </div>

        <Card className="mb-8">
          <CardContent className="pt-6">
            {user ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10 mt-1">
                  {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.displayName || user.username} />}
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {(user.displayName || user.username).slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="Comparte un mensaje, testimonio, prédica o enlace…"
                    className={`resize-none ${composerOpen || newMessage || imageUrl || attachment ? "min-h-[100px]" : "min-h-[44px] h-11 py-2.5"}`}
                    rows={composerOpen || newMessage || imageUrl || attachment ? 3 : 1}
                    value={newMessage}
                    onFocus={() => setComposerOpen(true)}
                    onClick={() => setComposerOpen(true)}
                    onChange={(e) => setNewMessage(e.target.value)}
                    data-testid="textarea-new-post"
                  />
                  {imageUrl && (
                    <div className="relative mt-2 inline-block">
                      <img src={imageUrl} alt="Vista previa" className="max-h-48 rounded-lg object-cover" />
                      <button
                        type="button"
                        className="absolute top-1 right-1 bg-black/60 rounded-full p-1 hover:bg-black/80"
                        onClick={() => setImageUrl(null)}
                      >
                        <X className="h-4 w-4 text-white" />
                      </button>
                    </div>
                  )}
                  {attachment && <AttachedFile file={attachment} onRemove={() => setAttachment(null)} />}
                  <LinkDraftPreview text={newMessage} />
                </div>
              </div>
              <div className={`justify-between items-center gap-2 ${composerOpen || newMessage || imageUrl || attachment ? "flex" : "hidden"}`}>
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                  >
                    {uploading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <ImagePlus className="mr-2 h-4 w-4" />
                    )}
                    Imagen
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  {!attachment && <AttachButton folder="comunidad" label="Archivo" onUploaded={setAttachment} />}
                </div>
                <Button type="submit" disabled={createPost.isPending || (!newMessage.trim() && !imageUrl && !attachment)} data-testid="button-publish-post">
                  {createPost.isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="mr-2 h-4 w-4" />
                  )}
                  Publicar
                </Button>
              </div>
            </form>
            ) : (
              <div className="text-center py-4">
                <p className="text-muted-foreground mb-3">Inicia sesión para publicar mensajes y comentarios.</p>
                <div className="flex justify-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => setLocation(loginUrl())}>Iniciar Sesión</Button>
                  <Button size="sm" onClick={() => setLocation("/registro")}>Registrarse</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {isLoadingPosts ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : !posts?.length ? (
          <Card>
            <CardContent className="py-12 text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-1">Sin publicaciones aun</h3>
              <p className="text-muted-foreground">Se el primero en compartir un mensaje con la comunidad.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {posts.map((post: any) => (
              <Card key={post.id} data-testid={`card-community-post-${post.id}`}>
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      {post.user?.avatarUrl && <AvatarImage src={post.user.avatarUrl} alt={post.user.displayName || post.user.username} />}
                      <AvatarFallback className="bg-primary/5 text-primary text-sm">
                        {(post.user?.displayName || post.user?.username || '??').slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0 post-body-media">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-semibold">
                          {post.user?.displayName || post.user?.username || 'Usuario'}
                        </span>
                        {post.user?.cargo && <Badge variant="outline" className="text-[10px] py-0">{withAccents(post.user.cargo)}</Badge>}
                        {post.user?.country && <span className="text-[10px] text-muted-foreground">{withAccents(post.user.country)}</span>}
                        {publicHandle(post.user?.username) && (
                          <span className="text-xs text-muted-foreground">{publicHandle(post.user?.username)}</span>
                        )}
                        <span className="text-xs text-muted-foreground" title={post.createdAt ? new Date(post.createdAt).toLocaleString("es") : undefined}>
                          {timeAgo(post.createdAt)}
                        </span>
                      </div>
                      <RichText text={post.content} className="text-sm" testId={`text-post-content-${post.id}`} />
                      {post.imageUrl && <FileAttachment url={post.imageUrl} name="Imagen de la publicación" fileType="image" className="mt-2" />}
                      {post.fileUrl && <FileAttachment url={post.fileUrl} name={post.fileName} size={post.fileSize} mime={post.fileMime} className="mt-2" />}
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 min-h-9 py-2 -my-2"
                          onClick={() => toggleComments(post.id)}
                        >
                          <MessageSquare className="h-3.5 w-3.5" />
                          {post.commentCount ? `${post.commentCount} ${post.commentCount === 1 ? "comentario" : "comentarios"}` : "Comentar"}
                          {expandedComments.has(post.id) ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                        </button>
                      </div>
                      {expandedComments.has(post.id) && user && (
                        <PostComments postId={post.id} user={user} />
                      )}
                      {expandedComments.has(post.id) && !user && (
                        <div className="mt-3 pt-3 border-t">
                          <p className="text-xs text-muted-foreground text-center py-2">Inicia sesión para ver y escribir comentarios.</p>
                        </div>
                      )}
                    </div>
                    {user && (post.userId === user.id || user.role === "admin") && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deletePost.mutate(post.id)}
                        data-testid={`button-delete-community-post-${post.id}`}
                        title={post.userId === user.id ? "Eliminar mi publicación" : "Eliminar publicación (moderación)"}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
