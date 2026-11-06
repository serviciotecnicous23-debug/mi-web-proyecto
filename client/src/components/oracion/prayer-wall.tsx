import { useState } from "react";
import { RichText } from "@/components/media/RichText";
import { useMutation, useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { userTimeZone } from "@/hooks/use-club";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { PRAYER_CATEGORIES } from "@shared/schema";
import { Check, HandHeart, Loader2, Lock, PartyPopper, Trash2, UserX } from "lucide-react";
import { ReportButton } from "@/components/moderacion/ReportButton";

type PrayerRequestItem = {
  id: number;
  content: string;
  category: keyof typeof PRAYER_CATEGORIES;
  visibility: "comunidad" | "lideres";
  isAnonymous: boolean;
  status: "abierta" | "respondida";
  answeredNote: string | null;
  answeredAt: string | null;
  createdAt: string;
  author: { displayName: string; avatarUrl: string | null } | null;
  mine: boolean;
  prayerCount: number;
  prayedToday: boolean;
  canManage: boolean;
};

const LIST_KEY = "/api/prayer-requests";

function timeAgo(date?: string | null) {
  if (!date) return "";
  try {
    return formatDistanceToNow(new Date(date), { addSuffix: true, locale: es });
  } catch {
    return "";
  }
}

function initials(name?: string | null) {
  return (name || "?").split(/\s+/).map((p) => p[0]).join("").slice(0, 2).toUpperCase();
}

function refresh() {
  queryClient.invalidateQueries({ queryKey: [LIST_KEY] });
  queryClient.invalidateQueries({ queryKey: ["/api/club/summary"] });
}

function PrayerComposer() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<keyof typeof PRAYER_CATEGORIES>("otro");
  const [visibility, setVisibility] = useState<"comunidad" | "lideres">("comunidad");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const create = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", LIST_KEY, { content: content.trim(), category, visibility, isAnonymous, tz: userTimeZone() });
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Petición compartida", description: visibility === "lideres" ? "Solo la verán los líderes." : "La comunidad orará contigo." });
      setContent("");
      setIsAnonymous(false);
      setOpen(false);
      refresh();
    },
    onError: (err: any) => toast({ title: "No se pudo compartir", description: String(err?.message || "").replace(/^\d+:\s*/, "").replace(/^\{"message":"|"\}$/g, ""), variant: "destructive" }),
  });

  if (!open) {
    return (
      <Button className="w-full sm:w-auto min-h-11" onClick={() => setOpen(true)} data-testid="button-new-prayer-request">
        <HandHeart className="w-4 h-4 mr-2" /> Pedir oración
      </Button>
    );
  }
  return (
    <Card>
      <CardContent className="p-4 space-y-3">
        <div className="space-y-1.5">
          <Label htmlFor="prayer-content">¿Por qué quieres que oremos?</Label>
          <Textarea
            id="prayer-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            maxLength={1000}
            placeholder="Cuéntalo con las palabras que quieras. No hace falta dar detalles privados."
            data-testid="input-prayer-request"
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label>Motivo</Label>
            <Select value={category} onValueChange={(v) => setCategory(v as keyof typeof PRAYER_CATEGORIES)}>
              <SelectTrigger className="min-h-10"><SelectValue /></SelectTrigger>
              <SelectContent>
                {Object.entries(PRAYER_CATEGORIES).map(([k, label]) => <SelectItem key={k} value={k}>{label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>¿Quién la ve?</Label>
            <Select value={visibility} onValueChange={(v) => setVisibility(v as "comunidad" | "lideres")}>
              <SelectTrigger className="min-h-10"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="comunidad">Toda la comunidad</SelectItem>
                <SelectItem value="lideres">Solo líderes y maestros</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <Checkbox checked={isAnonymous} onCheckedChange={(v) => setIsAnonymous(v === true)} />
          Publicar sin mi nombre (los líderes sí lo ven)
        </label>
        <div className="flex justify-end gap-2">
          <Button variant="outline" className="min-h-11" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button className="min-h-11" onClick={() => create.mutate()} disabled={content.trim().length < 5 || create.isPending} data-testid="button-submit-prayer-request">
            {create.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />} Pedir oración
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function PrayerCard({ item }: { item: PrayerRequestItem }) {
  const { toast } = useToast();
  const [answering, setAnswering] = useState(false);
  const [note, setNote] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const pray = useMutation({
    mutationFn: async () => (await apiRequest("POST", `${LIST_KEY}/${item.id}/pray`, { tz: userTimeZone() })).json(),
    onSuccess: () => refresh(),
    onError: () => toast({ title: "No se pudo registrar", variant: "destructive" }),
  });
  const answered = useMutation({
    mutationFn: async () => (await apiRequest("POST", `${LIST_KEY}/${item.id}/answered`, { note: note.trim() || undefined })).json(),
    onSuccess: () => {
      toast({ title: "🙌 ¡Gloria a Dios!", description: "Se avisó a quienes oraron por esta petición." });
      setAnswering(false);
      refresh();
    },
  });
  const remove = useMutation({
    mutationFn: async () => apiRequest("DELETE", `${LIST_KEY}/${item.id}`),
    onSuccess: () => refresh(),
  });
  const people = item.prayerCount;

  return (
    <Card className={item.status === "respondida" ? "border-green-300/60 dark:border-green-800" : ""} data-testid={`prayer-request-${item.id}`}>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start gap-3">
          {item.author ? (
            <Avatar className="w-9 h-9">
              {item.author.avatarUrl && <AvatarImage src={item.author.avatarUrl} alt="" />}
              <AvatarFallback className="text-xs">{initials(item.author.displayName)}</AvatarFallback>
            </Avatar>
          ) : (
            <span className="w-9 h-9 rounded-full bg-muted flex items-center justify-center" aria-hidden="true">
              <UserX className="w-4 h-4 text-muted-foreground" />
            </span>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-sm font-medium">{item.author ? item.author.displayName : "Petición anónima"}</span>
              {item.isAnonymous && item.author && <Badge variant="outline" className="text-[10px]">anónima para los demás</Badge>}
              <span className="text-xs text-muted-foreground" title={new Date(item.createdAt).toLocaleString("es")}>{timeAgo(item.createdAt)}</span>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-1">
              <Badge variant="secondary" className="text-[11px]">{PRAYER_CATEGORIES[item.category] ?? "Otro motivo"}</Badge>
              {item.visibility === "lideres" && (
                <Badge variant="outline" className="text-[11px]"><Lock className="w-3 h-3 mr-1" /> Solo líderes</Badge>
              )}
            </div>
          </div>
        </div>

        <RichText text={item.content} className="text-sm leading-relaxed" compact maxEmbeds={1} />

        {item.status === "respondida" && (
          <div className="rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 p-3">
            <p className="text-sm font-semibold text-green-700 dark:text-green-400 flex items-center gap-1.5">
              <PartyPopper className="w-4 h-4" /> ¡Dios respondió! <span className="font-normal text-xs text-muted-foreground">{timeAgo(item.answeredAt)}</span>
            </p>
            {item.answeredNote && <p className="text-sm mt-1 whitespace-pre-wrap break-words">{item.answeredNote}</p>}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2 justify-between">
          <p className="text-xs text-muted-foreground">
            🙏 {people === 0 ? "Sé la primera persona en orar" : people === 1 ? "1 persona oró" : `${people} personas oraron`}
          </p>
          <div className="flex items-center gap-1">
            {!item.mine && <ReportButton contentType="oracion" contentId={item.id} className="text-xs min-h-10 px-2" />}
            {item.canManage && (
              <Button variant="ghost" size="sm" className="min-h-10 text-muted-foreground" onClick={() => setConfirmDelete(true)} aria-label="Borrar petición">
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
            {item.mine && item.status === "abierta" && (
              <Button variant="outline" size="sm" className="min-h-10" onClick={() => setAnswering(true)}>
                Dios respondió
              </Button>
            )}
            {item.status === "abierta" && (
              <Button
                variant={item.prayedToday ? "outline" : "default"}
                className="min-h-11"
                onClick={() => pray.mutate()}
                disabled={item.prayedToday || pray.isPending}
                aria-pressed={item.prayedToday}
                data-testid={`button-pray-${item.id}`}
              >
                {pray.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : item.prayedToday ? <Check className="w-4 h-4 mr-2" /> : <HandHeart className="w-4 h-4 mr-2" />}
                {item.prayedToday ? "Oraste hoy" : "Oré por esto"}
              </Button>
            )}
          </div>
        </div>
      </CardContent>

      <Dialog open={answering} onOpenChange={setAnswering}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>¡Dios respondió!</DialogTitle>
            <DialogDescription>Cuéntale a la comunidad cómo respondió Dios (opcional). Se avisará a quienes oraron.</DialogDescription>
          </DialogHeader>
          <Textarea value={note} onChange={(e) => setNote(e.target.value)} rows={4} maxLength={1000} placeholder="Tu testimonio…" />
          <DialogFooter>
            <Button variant="outline" onClick={() => setAnswering(false)}>Cancelar</Button>
            <Button onClick={() => answered.mutate()} disabled={answered.isPending}>
              {answered.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />} Compartir testimonio
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Borrar esta petición?</AlertDialogTitle>
            <AlertDialogDescription>Se quitará del muro para todos. No se puede deshacer.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => remove.mutate()}>Borrar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}

export function PrayerWall() {
  const tz = userTimeZone();
  const [view, setView] = useState<"abiertas" | "respondidas">("abiertas");
  const { data = [], isLoading, isError } = useQuery<PrayerRequestItem[]>({
    queryKey: [LIST_KEY, tz],
    queryFn: async () => (await apiRequest("GET", `${LIST_KEY}?tz=${encodeURIComponent(tz)}`)).json(),
  });
  const open = data.filter((d) => d.status === "abierta");
  const answered = data.filter((d) => d.status === "respondida");
  const list = view === "abiertas" ? open : answered;

  return (
    <div className="space-y-4">
      <Card className="border-primary/20 bg-linear-to-br from-primary/10 via-primary/5 to-transparent">
        <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <h2 className="text-lg font-bold flex items-center gap-2"><HandHeart className="w-5 h-5 text-primary" /> Muro de oración</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Comparte tu necesidad y ora por los demás. Cada «Oré por esto» le llega como ánimo a quien lo pidió.
            </p>
          </div>
          <PrayerComposer />
        </CardContent>
      </Card>

      <div className="flex gap-2" role="tablist" aria-label="Peticiones">
        <Button variant={view === "abiertas" ? "default" : "outline"} size="sm" className="min-h-10" role="tab" aria-selected={view === "abiertas"} onClick={() => setView("abiertas")}>
          Peticiones ({open.length})
        </Button>
        <Button variant={view === "respondidas" ? "default" : "outline"} size="sm" className="min-h-10" role="tab" aria-selected={view === "respondidas"} onClick={() => setView("respondidas")}>
          🙌 Respondidas ({answered.length})
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-3">{[0, 1].map((i) => <Skeleton key={i} className="h-32 w-full" />)}</div>
      ) : isError ? (
        <p className="text-sm text-muted-foreground text-center py-6">No se pudo cargar el muro de oración.</p>
      ) : list.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="p-6 text-center text-sm text-muted-foreground">
            {view === "abiertas"
              ? "No hay peticiones por ahora. Si necesitas oración, compártela: no estás solo."
              : "Aquí aparecerán los testimonios de oraciones respondidas."}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {list.map((item) => <PrayerCard key={item.id} item={item} />)}
        </div>
      )}
    </div>
  );
}
