import { useEffect, useMemo, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation, useSearch } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import { Mic, FileText, Plus, Search, Play, BookOpen, Trash2, Pencil, Share2, ArrowLeft, Video, MapPin, Loader2, Flame } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { classifyUrl } from "@shared/media";
import { useLinkPreview } from "@/lib/link-preview";
import { LinkEmbed } from "@/components/media/LinkEmbed";
import { FileAttachment } from "@/components/media/FileAttachment";
import { RichText } from "@/components/media/RichText";
import { AttachButton, AttachedFile } from "@/components/media/Composer";
import { ACCEPT_AUDIO, ACCEPT_DOCUMENTS, type UploadedFile } from "@/components/media/upload";
import { ProviderBadge } from "@/components/media/brand";

const SERMON_CATEGORIES: Record<string, string> = {
  general: "General", evangelismo: "Evangelismo", adoracion: "Adoración", doctrina: "Doctrina",
  familia: "Familia", liderazgo: "Liderazgo", profetico: "Profético", avivamiento: "Avivamiento",
};

type Sermon = {
  id: number;
  title: string;
  description?: string | null;
  preacherName?: string | null;
  preacherPlace?: string | null;
  sermonDate?: string | null;
  category: string;
  seriesName?: string | null;
  videoUrl?: string | null;
  audioUrl?: string | null;
  content?: string | null;
  imageUrl?: string | null;
  documentUrl?: string | null;
  documentName?: string | null;
  documentSize?: number | null;
};

const isWebLink = (url?: string | null) => !!url && /^https?:\/\//i.test(url);

function sermonDate(value?: string | null, pattern = "d 'de' MMMM yyyy") {
  if (!value) return "";
  try {
    // La fecha se guarda como medianoche UTC: se toma el día tal cual, sin la zona horaria
    // (si no, en Texas el "1 de noviembre" salía "31 de octubre").
    const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(value));
    const date = m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : new Date(value);
    return format(date, pattern, { locale: es });
  } catch {
    return "";
  }
}

// ---------- Tarjeta del catálogo ----------

function SermonCard({ s, onOpen, canManage, onEdit, onDelete }: { s: Sermon; onOpen: () => void; canManage: boolean; onEdit: () => void; onDelete: () => void }) {
  const info = useMemo(() => (s.videoUrl ? classifyUrl(s.videoUrl) : null), [s.videoUrl]);
  const { data: preview } = useLinkPreview(info && isWebLink(info.url) ? info.url : null);
  const thumb = preview?.thumbnail || info?.thumbnail || s.imageUrl || null;
  const [confirm, setConfirm] = useState(false);
  const who = [s.preacherName, s.preacherPlace].filter(Boolean).join(" · ");
  return (
    <article className="sermon-card" data-testid={`card-sermon-${s.id}`}>
      <button type="button" className="sermon-card__open" onClick={onOpen} aria-label={`Ver la prédica: ${s.title}`}>
        <span className="sermon-card__thumb">
          {thumb ? (
            <img src={thumb} alt="" loading="lazy" referrerPolicy="no-referrer" />
          ) : (
            <span className="sermon-card__placeholder" aria-hidden="true">
              {s.audioUrl ? <Mic className="h-10 w-10" /> : <Flame className="h-10 w-10" />}
            </span>
          )}
          {info && info.provider !== "web" && info.provider !== "file" && <ProviderBadge provider={info.provider} className="sermon-card__badge" />}
          <span className="sermon-card__play" aria-hidden="true"><Play className="h-6 w-6 translate-x-0.5" fill="currentColor" /></span>
        </span>
        <span className="sermon-card__body">
          <span className="sermon-card__title">{s.title}</span>
          {who && <span className="sermon-card__who">{who}</span>}
          <span className="sermon-card__when">
            {[sermonDate(s.sermonDate, "d MMM yyyy"), SERMON_CATEGORIES[s.category] || s.category].filter(Boolean).join(" · ")}
          </span>
          <span className="sermon-card__formats" aria-label="Formatos disponibles">
            {s.videoUrl && <span><Video className="h-3.5 w-3.5" aria-hidden="true" /> Video</span>}
            {s.audioUrl && <span><Mic className="h-3.5 w-3.5" aria-hidden="true" /> Audio</span>}
            {s.documentUrl && <span><FileText className="h-3.5 w-3.5" aria-hidden="true" /> Apuntes</span>}
            {s.content && <span><BookOpen className="h-3.5 w-3.5" aria-hidden="true" /> Texto</span>}
            {s.seriesName && <span className="sermon-card__series">{s.seriesName}</span>}
          </span>
        </span>
      </button>
      {canManage && (
        <div className="sermon-card__tools">
          {confirm ? (
            <>
              <span className="text-xs text-muted-foreground mr-1">¿Eliminar?</span>
              <Button size="sm" variant="destructive" onClick={onDelete}>Sí</Button>
              <Button size="sm" variant="ghost" onClick={() => setConfirm(false)}>No</Button>
            </>
          ) : (
            <>
              <Button size="icon" variant="ghost" onClick={onEdit} aria-label="Editar la prédica" title="Editar"><Pencil className="h-4 w-4" /></Button>
              <Button size="icon" variant="ghost" onClick={() => setConfirm(true)} aria-label="Eliminar la prédica" title="Eliminar"><Trash2 className="h-4 w-4 text-destructive" /></Button>
            </>
          )}
        </div>
      )}
    </article>
  );
}

// ---------- Formulario para compartir o editar ----------

type FormState = {
  title: string;
  preacherName: string;
  preacherPlace: string;
  sermonDate: string;
  category: string;
  seriesName: string;
  videoUrl: string;
  audioUrl: string;
  audioFile: UploadedFile | null;
  document: UploadedFile | null;
  description: string;
  content: string;
};

function toForm(s?: Sermon | null): FormState {
  const audioIsFile = !!s?.audioUrl && !isWebLink(s.audioUrl);
  return {
    title: s?.title || "",
    preacherName: s?.preacherName || "",
    preacherPlace: s?.preacherPlace || "",
    sermonDate: s?.sermonDate ? String(s.sermonDate).slice(0, 10) : "",
    category: s?.category || "general",
    seriesName: s?.seriesName || "",
    videoUrl: s?.videoUrl || "",
    audioUrl: s?.audioUrl && !audioIsFile ? s.audioUrl : "",
    audioFile: audioIsFile ? { url: s!.audioUrl!, fileName: `${s!.title} (audio)`, fileSize: 0, mimeType: "audio/mpeg", fileType: "audio" } : null,
    document: s?.documentUrl ? { url: s.documentUrl, fileName: s.documentName || "Apuntes", fileSize: s.documentSize || 0, mimeType: "", fileType: classifyUrl(s.documentUrl)?.fileType || "other" } : null,
    description: s?.description || "",
    content: s?.content || "",
  };
}

function SermonForm({ sermon, onDone }: { sermon: Sermon | null; onDone: () => void }) {
  const { toast } = useToast();
  const [f, setF] = useState<FormState>(() => toForm(sermon));
  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => setF((prev) => ({ ...prev, [k]: v }));
  const videoInfo = useMemo(() => (f.videoUrl.trim() ? classifyUrl(f.videoUrl.trim()) : null), [f.videoUrl]);
  const { data: preview } = useLinkPreview(videoInfo && isWebLink(videoInfo.url) ? videoInfo.url : null);

  // Al pegar el enlace, se llenan solos el título y quién predica (si están vacíos).
  useEffect(() => {
    if (!preview) return;
    setF((prev) => ({
      ...prev,
      title: prev.title || preview.title || "",
      preacherName: prev.preacherName || preview.author?.replace(/^@/, "") || "",
    }));
  }, [preview]);

  const save = useMutation({
    mutationFn: async () => {
      const body = {
        title: f.title.trim(),
        preacherName: f.preacherName.trim() || null,
        preacherPlace: f.preacherPlace.trim() || null,
        sermonDate: f.sermonDate || null,
        category: f.category || "general",
        seriesName: f.seriesName.trim() || null,
        videoUrl: f.videoUrl.trim() || null,
        audioUrl: f.audioFile?.url || f.audioUrl.trim() || null,
        documentUrl: f.document?.url || null,
        documentName: f.document?.fileName || null,
        documentSize: f.document?.fileSize || null,
        description: f.description.trim() || null,
        content: f.content.trim() || null,
      };
      const res = await fetch(sermon ? `/api/sermons/${sermon.id}` : "/api/sermons", {
        method: sermon ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => null))?.message || "No se pudo guardar");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/sermons"] });
      toast({ title: sermon ? "Prédica actualizada" : "Prédica compartida" });
      onDone();
    },
    onError: (e: Error) => toast({ title: "No se pudo guardar", description: e.message, variant: "destructive" }),
  });

  const badVideo = f.videoUrl.trim() && !videoInfo;
  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (!f.title.trim() || badVideo) return;
        save.mutate();
      }}
    >
      <div className="space-y-2">
        <Label htmlFor="sermon-video">Enlace del video</Label>
        <Input
          id="sermon-video"
          value={f.videoUrl}
          onChange={(e) => set("videoUrl", e.target.value)}
          placeholder="Pega el enlace de YouTube, Facebook, Instagram, TikTok, Vimeo…"
          inputMode="url"
          data-testid="input-sermon-video"
        />
        {badVideo && <p className="text-xs text-destructive">Ese enlace no es válido. Cópialo completo desde la app (con https://).</p>}
        {videoInfo && <LinkEmbed url={videoInfo.url} compact />}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="sm:col-span-2"><Label htmlFor="sermon-title">Título *</Label><Input id="sermon-title" value={f.title} onChange={(e) => set("title", e.target.value)} required data-testid="input-sermon-title" /></div>
        <div><Label htmlFor="sermon-preacher">Quién predica</Label><Input id="sermon-preacher" value={f.preacherName} onChange={(e) => set("preacherName", e.target.value)} placeholder="Pastor, evangelista…" /></div>
        <div><Label htmlFor="sermon-place">De dónde es</Label><Input id="sermon-place" value={f.preacherPlace} onChange={(e) => set("preacherPlace", e.target.value)} placeholder="Iglesia, ciudad o país" /></div>
        <div><Label htmlFor="sermon-date">Fecha</Label><Input id="sermon-date" type="date" value={f.sermonDate} onChange={(e) => set("sermonDate", e.target.value)} /></div>
        <div>
          <Label>Categoría</Label>
          <Select value={f.category} onValueChange={(v) => set("category", v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{Object.entries(SERMON_CATEGORIES).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div className="sm:col-span-2"><Label htmlFor="sermon-series">Serie</Label><Input id="sermon-series" value={f.seriesName} onChange={(e) => set("seriesName", e.target.value)} placeholder="Si es parte de una serie de prédicas" /></div>
      </div>

      <div className="space-y-2 rounded-xl border p-3">
        <p className="text-sm font-semibold flex items-center gap-2"><Mic className="h-4 w-4 text-primary" /> Audio <span className="font-normal text-muted-foreground">(opcional)</span></p>
        {f.audioFile ? (
          <AttachedFile file={f.audioFile} onRemove={() => set("audioFile", null)} />
        ) : (
          <>
            <Input value={f.audioUrl} onChange={(e) => set("audioUrl", e.target.value)} placeholder="Enlace de Spotify, SoundCloud o un MP3" inputMode="url" />
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              o <AttachButton accept={ACCEPT_AUDIO} folder="predicas" label="Subir el audio" onUploaded={(file) => set("audioFile", file)} testId="button-sermon-audio" />
            </div>
          </>
        )}
      </div>

      <div className="space-y-2 rounded-xl border p-3">
        <p className="text-sm font-semibold flex items-center gap-2"><FileText className="h-4 w-4 text-primary" /> Apuntes o estudio <span className="font-normal text-muted-foreground">(PDF, Word, PowerPoint…)</span></p>
        {f.document ? (
          <AttachedFile file={f.document} onRemove={() => set("document", null)} />
        ) : (
          <AttachButton accept={ACCEPT_DOCUMENTS} folder="predicas" label="Adjuntar documento" onUploaded={(file) => set("document", file)} testId="button-sermon-document" />
        )}
      </div>

      <div><Label htmlFor="sermon-desc">Descripción</Label><Textarea id="sermon-desc" value={f.description} onChange={(e) => set("description", e.target.value)} rows={2} placeholder="De qué trata la prédica" /></div>
      <div><Label htmlFor="sermon-content">Texto o transcripción</Label><Textarea id="sermon-content" value={f.content} onChange={(e) => set("content", e.target.value)} rows={4} /></div>
      <Button type="submit" disabled={save.isPending || !f.title.trim() || !!badVideo} className="w-full" data-testid="button-sermon-save">
        {save.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {sermon ? "Guardar cambios" : "Compartir prédica"}
      </Button>
    </form>
  );
}

// ---------- Página ----------

export default function SermonesPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const search = useSearch();
  const params = new URLSearchParams(search);
  const selectedId = Number(params.get("predica")) || null;
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [editing, setEditing] = useState<Sermon | null | undefined>(undefined);
  const [noteText, setNoteText] = useState("");

  const canManage = user?.role === "admin" || user?.role === "obrero";

  const { data: sermonsList = [], isLoading } = useQuery<Sermon[]>({
    queryKey: ["/api/sermons", query, category],
    queryFn: () => {
      const p = new URLSearchParams();
      if (query) p.set("search", query);
      if (category && category !== "all") p.set("category", category);
      return fetch(`/api/sermons?${p}`, { credentials: "include" }).then((r) => r.json());
    },
  });

  const { data: single } = useQuery<Sermon>({
    queryKey: ["/api/sermons", "una", selectedId],
    queryFn: () => fetch(`/api/sermons/${selectedId}`, { credentials: "include" }).then((r) => (r.ok ? r.json() : null)),
    enabled: !!selectedId && !sermonsList.some((s) => s.id === selectedId),
  });
  const selected = selectedId ? sermonsList.find((s) => s.id === selectedId) || single || null : null;

  const { data: myNotes = [] } = useQuery<any[]>({
    queryKey: ["/api/sermons", selectedId, "notes"],
    queryFn: () => fetch(`/api/sermons/${selectedId}/notes`, { credentials: "include" }).then((r) => r.json()),
    enabled: !!selectedId && !!user,
  });

  const saveNote = useMutation({
    mutationFn: async ({ sermonId, content }: { sermonId: number; content: string }) => {
      const res = await fetch(`/api/sermons/${sermonId}/notes`, { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ sermonId, content }) });
      if (!res.ok) throw new Error("Error");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/sermons", selectedId, "notes"] });
      setNoteText("");
      toast({ title: "Nota guardada" });
    },
  });

  const remove = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/sermons/${id}`, { method: "DELETE", credentials: "include" });
      if (!res.ok) throw new Error("No se pudo eliminar");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/sermons"] });
      toast({ title: "Prédica eliminada" });
    },
    onError: (e: Error) => toast({ title: e.message, variant: "destructive" }),
  });

  const open = (id: number | null) => {
    navigate(id ? `/sermones?predica=${id}` : "/sermones");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  async function share(s: Sermon) {
    const url = `${window.location.origin}/sermones?predica=${s.id}`;
    try {
      if (navigator.share) await navigator.share({ title: s.title, text: s.preacherName ? `${s.title} — ${s.preacherName}` : s.title, url });
      else {
        await navigator.clipboard.writeText(url);
        toast({ title: "Enlace copiado", description: "Pégalo en WhatsApp o donde quieras compartirlo." });
      }
    } catch {
      /* la persona canceló */
    }
  }

  return (
    <Layout>
      <div className="container mx-auto max-w-6xl p-4 md:p-6 space-y-6">
        <header className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <p className="data-label">Prédicas y enseñanzas</p>
            <h1 className="heading-display font-display text-4xl md:text-5xl mt-1">Archivo de <span className="fire-text">prédicas</span></h1>
            <p className="text-muted-foreground mt-1">Mira o escucha aquí mismo, sin salir de la web.</p>
          </div>
          {canManage && (
            <Button className="gap-2 fire-btn-primary" onClick={() => setEditing(null)} data-testid="button-new-sermon">
              <Plus className="h-4 w-4" /> Compartir prédica
            </Button>
          )}
        </header>

        {!selected && (
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar por título o tema…" value={query} onChange={(e) => setQuery(e.target.value)} className="pl-9 h-11" />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Categorías">
              {[["", "Todas"], ...Object.entries(SERMON_CATEGORIES)].map(([k, v]) => (
                <button key={k || "todas"} type="button" role="tab" aria-selected={category === k} onClick={() => setCategory(k)} className={`sermon-chip ${category === k ? "is-active" : ""}`}>
                  {v}
                </button>
              ))}
            </div>
          </div>
        )}

        {selected ? (
          <article className="space-y-5" data-testid="sermon-detail">
            <Button variant="ghost" onClick={() => open(null)} className="gap-2 -ml-2"><ArrowLeft className="h-4 w-4" /> Todas las prédicas</Button>
            {selected.videoUrl && <LinkEmbed url={selected.videoUrl} />}
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold leading-tight">{selected.title}</h2>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                {selected.preacherName && <span className="font-semibold text-foreground">{selected.preacherName}</span>}
                {selected.preacherPlace && <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {selected.preacherPlace}</span>}
                {selected.sermonDate && <span>{sermonDate(selected.sermonDate)}</span>}
                <Badge variant="secondary">{SERMON_CATEGORIES[selected.category] || selected.category}</Badge>
                {selected.seriesName && <Badge variant="outline">{selected.seriesName}</Badge>}
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                <Button variant="outline" size="sm" className="gap-2" onClick={() => share(selected)}><Share2 className="h-4 w-4" /> Compartir</Button>
                {canManage && <Button variant="outline" size="sm" className="gap-2" onClick={() => setEditing(selected)}><Pencil className="h-4 w-4" /> Editar</Button>}
              </div>
            </div>
            {selected.audioUrl && (isWebLink(selected.audioUrl) ? <LinkEmbed url={selected.audioUrl} /> : <FileAttachment url={selected.audioUrl} name={`${selected.title} (audio)`} fileType="audio" />)}
            {selected.documentUrl && (
              <div className="space-y-2">
                <p className="text-sm font-semibold">Apuntes y estudio</p>
                <FileAttachment url={selected.documentUrl} name={selected.documentName} size={selected.documentSize} />
              </div>
            )}
            {selected.description && <RichText text={selected.description} className="text-muted-foreground" />}
            {selected.content && (
              <section className="rounded-2xl border p-4 md:p-6 space-y-2">
                <h3 className="font-semibold flex items-center gap-2"><BookOpen className="h-4 w-4 text-primary" /> Texto de la prédica</h3>
                <RichText text={selected.content} className="leading-relaxed" />
              </section>
            )}

            {user && (
              <section className="border-t pt-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2"><FileText className="h-4 w-4" /> Mis notas</h3>
                <div className="space-y-2 mb-3">
                  {myNotes.map((n: any) => (
                    <div key={n.id} className="p-3 bg-muted rounded-lg text-sm">
                      <p className="whitespace-pre-wrap">{n.content}</p>
                      <span className="text-xs text-muted-foreground">{n.createdAt ? format(new Date(n.createdAt), "d MMM yyyy, HH:mm", { locale: es }) : ""}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Textarea value={noteText} onChange={(e) => setNoteText(e.target.value)} placeholder="Escribe lo que Dios te habló…" rows={2} className="flex-1" />
                  <Button onClick={() => noteText.trim() && saveNote.mutate({ sermonId: selected.id, content: noteText })} disabled={!noteText.trim()}>Guardar</Button>
                </div>
              </section>
            )}
          </article>
        ) : isLoading ? (
          <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sermonsList.map((s) => (
              <SermonCard key={s.id} s={s} onOpen={() => open(s.id)} canManage={canManage} onEdit={() => setEditing(s)} onDelete={() => remove.mutate(s.id)} />
            ))}
            {sermonsList.length === 0 && (
              <div className="col-span-full text-center py-14 text-muted-foreground">
                <Play className="h-10 w-10 mx-auto mb-3 opacity-50" />
                {query || category ? "No hay prédicas con esa búsqueda." : "Todavía no hay prédicas publicadas."}
              </div>
            )}
          </div>
        )}
      </div>

      <Dialog open={editing !== undefined} onOpenChange={(v) => !v && setEditing(undefined)}>
        <DialogContent className="max-w-xl max-h-[92vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Editar prédica" : "Compartir una prédica"}</DialogTitle>
            <DialogDescription>Pega el enlace del video y se verá aquí mismo, con la plataforma y quién predica.</DialogDescription>
          </DialogHeader>
          {editing !== undefined && <SermonForm key={editing?.id ?? "nueva"} sermon={editing} onDone={() => setEditing(undefined)} />}
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
