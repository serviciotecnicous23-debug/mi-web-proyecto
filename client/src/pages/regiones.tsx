import { useState, useRef, useEffect } from "react";
import { RichText } from "@/components/media/RichText";
import { FileAttachment } from "@/components/media/FileAttachment";
import { useAuth } from "@/hooks/use-auth";
import { Layout } from "@/components/layout";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { REACTION_TYPES } from "@shared/schema";
import type { MinistryRegion } from "@shared/schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Loader2, Send, Trash2, MapPin, Globe, ImagePlus, X,
  Flame, Heart, ThumbsUp, Music, BarChart3, Plus, Minus,
  Settings, Pencil, Check,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SocialLinksDisplay, SocialLinksFormFields } from "@/components/SocialLinks";
import { withAccents } from "@shared/labels";

type RegionPost = {
  id: number;
  userId: number;
  region: string;
  content: string;
  imageUrl: string | null;
  createdAt: string;
  user?: { displayName: string; username: string; avatarUrl: string | null };
};

type ReactionData = {
  reactionType: string;
  count: number;
  users: string[];
};

type PollOption = {
  id: number;
  optionText: string;
  voteCount: number;
};

type PollData = {
  poll: { id: number; question: string } | null;
  options: PollOption[];
};

const REACTION_ICONS: Record<string, typeof Flame> = {
  fuego: Flame,
  oracion: Heart,
  amen: ThumbsUp,
  corazon: Heart,
  alabanza: Music,
};

function ReactionBar({ postId, user }: { postId: number; user: any }) {
  const { data: reactions = [] } = useQuery<ReactionData[]>({
    queryKey: ["/api/region-posts", postId, "reactions"],
    queryFn: async () => {
      const res = await fetch(`/api/region-posts/${postId}/reactions`, { credentials: "include" });
      if (!res.ok) return [];
      return res.json();
    },
  });

  const toggleMutation = useMutation({
    mutationFn: async (reactionType: string) => {
      await apiRequest("POST", `/api/region-posts/${postId}/reactions`, { reactionType });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/region-posts", postId, "reactions"] });
    },
  });

  return (
    <div className="flex flex-wrap items-center gap-1 mt-2">
      {Object.entries(REACTION_TYPES).map(([key, label]) => {
        const Icon = REACTION_ICONS[key];
        const reaction = reactions.find((r) => r.reactionType === key);
        const count = reaction?.count || 0;
        const isActive = user && reaction?.users?.includes(user.username);
        return (
          <Button
            key={key}
            variant="ghost"
            size="sm"
            className={`gap-1 toggle-elevate ${isActive ? "toggle-elevated" : ""}`}
            onClick={() => user && toggleMutation.mutate(key)}
            disabled={!user || toggleMutation.isPending}
            data-testid={`button-reaction-${key}-${postId}`}
            title={label}
          >
            <Icon className={`w-4 h-4 ${isActive ? "text-primary" : ""}`} />
            {count > 0 && <span className="text-xs">{count}</span>}
          </Button>
        );
      })}
    </div>
  );
}

function PollDisplay({ postId, user }: { postId: number; user: any }) {
  const { data: pollData } = useQuery<PollData>({
    queryKey: ["/api/region-posts", postId, "poll"],
    queryFn: async () => {
      const res = await fetch(`/api/region-posts/${postId}/poll`, { credentials: "include" });
      if (!res.ok) return { poll: null, options: [] };
      return res.json();
    },
  });

  const { data: myVote } = useQuery<{ optionId: number | null }>({
    queryKey: ["/api/region-posts", postId, "my-vote"],
    queryFn: async () => {
      const res = await fetch(`/api/region-posts/${postId}/my-vote`, { credentials: "include" });
      if (!res.ok) return { optionId: null };
      return res.json();
    },
    enabled: !!user,
  });

  const voteMutation = useMutation({
    mutationFn: async (optionId: number) => {
      await apiRequest("POST", `/api/region-polls/${optionId}/vote`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/region-posts", postId, "poll"] });
      queryClient.invalidateQueries({ queryKey: ["/api/region-posts", postId, "my-vote"] });
    },
  });

  if (!pollData?.poll) return null;

  const totalVotes = pollData.options.reduce((sum, o) => sum + (o.voteCount || 0), 0);
  const hasVoted = myVote?.optionId != null;

  return (
    <Card className="mt-3">
      <CardContent className="pt-4">
        <div className="flex items-center gap-2 mb-3">
          <BarChart3 className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">{pollData.poll.question}</span>
        </div>
        <div className="space-y-2">
          {pollData.options.map((option) => {
            const pct = totalVotes > 0 ? Math.round((option.voteCount / totalVotes) * 100) : 0;
            const isMyVote = myVote?.optionId === option.id;
            return (
              <button
                key={option.id}
                className={`w-full text-left rounded-md border p-2 text-sm relative overflow-hidden transition-colors ${
                  isMyVote ? "border-primary" : "border-border"
                } ${!hasVoted && user ? "hover-elevate cursor-pointer" : "cursor-default"}`}
                onClick={() => {
                  if (!hasVoted && user) voteMutation.mutate(option.id);
                }}
                disabled={hasVoted || !user || voteMutation.isPending}
                data-testid={`button-poll-option-${option.id}`}
              >
                {hasVoted && (
                  <div
                    className="absolute inset-y-0 left-0 bg-primary/10 transition-all"
                    style={{ width: `${pct}%` }}
                  />
                )}
                <div className="relative flex items-center justify-between gap-2">
                  <span>{option.optionText}</span>
                  {hasVoted && (
                    <span className="text-xs text-muted-foreground font-medium shrink-0">
                      {pct}% ({option.voteCount})
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {totalVotes} {totalVotes === 1 ? "voto" : "votos"}
        </p>
      </CardContent>
    </Card>
  );
}

function RegionManagementPanel() {
  const { toast } = useToast();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editRegion, setEditRegion] = useState<MinistryRegion | null>(null);
  const [newRegionName, setNewRegionName] = useState("");
  const [editRegionName, setEditRegionName] = useState("");
  const [editSocial, setEditSocial] = useState({
    facebook: "", instagram: "", youtube: "", tiktok: "", twitter: "", website: "",
  });

  const { data: regions = [] } = useQuery<MinistryRegion[]>({
    queryKey: ["/api/ministry-regions"],
  });

  const createMutation = useMutation({
    mutationFn: async (name: string) => {
      await apiRequest("POST", "/api/ministry-regions", { name });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/ministry-regions"] });
      setNewRegionName("");
      setShowAddDialog(false);
      toast({ title: "Región creada", description: "La región ha sido creada exitosamente." });
    },
    onError: () => {
      toast({ title: "Error", description: "No se pudo crear la región.", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<MinistryRegion> }) => {
      await apiRequest("PATCH", `/api/ministry-regions/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/ministry-regions"] });
      setEditRegion(null);
      toast({ title: "Región actualizada", description: "La región ha sido actualizada." });
    },
    onError: () => {
      toast({ title: "Error", description: "No se pudo actualizar la región.", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/ministry-regions/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/ministry-regions"] });
      toast({ title: "Región eliminada", description: "La región ha sido eliminada." });
    },
    onError: () => {
      toast({ title: "Error", description: "No se pudo eliminar la región.", variant: "destructive" });
    },
  });

  return (
    <>
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
          <div>
            <CardTitle className="text-base">Gestionar Regiones</CardTitle>
            <CardDescription className="text-sm">Agregar, editar o desactivar regiones del ministerio</CardDescription>
          </div>
          <Button
            size="sm"
            onClick={() => setShowAddDialog(true)}
            data-testid="button-add-region"
          >
            <Plus className="w-4 h-4 mr-1" /> Nueva Region
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {regions.map((region) => (
              <div
                key={region.id}
                className="flex flex-wrap items-center justify-between gap-2 p-3 border rounded-md"
                data-testid={`region-item-${region.id}`}
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium text-sm">{withAccents(region.name)}</span>
                  <Badge variant={region.isActive ? "default" : "secondary"} className="text-xs">
                    {region.isActive ? "Activa" : "Inactiva"}
                  </Badge>
                </div>
                <div className="flex items-center gap-1">
                  <div className="flex items-center gap-2 mr-2">
                    <Switch
                      checked={region.isActive}
                      onCheckedChange={(checked) =>
                        updateMutation.mutate({ id: region.id, data: { isActive: checked } })
                      }
                      disabled={updateMutation.isPending}
                      data-testid={`switch-region-active-${region.id}`}
                    />
                    <Label className="text-xs text-muted-foreground">
                      {region.isActive ? "Activa" : "Inactiva"}
                    </Label>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setEditRegion(region);
                      setEditRegionName(region.name);
                      setEditSocial({
                        facebook: (region as any).facebook || "",
                        instagram: (region as any).instagram || "",
                        youtube: (region as any).youtube || "",
                        tiktok: (region as any).tiktok || "",
                        twitter: (region as any).twitter || "",
                        website: (region as any).website || "",
                      });
                    }}
                    data-testid={`button-edit-region-${region.id}`}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteMutation.mutate(region.id)}
                    disabled={deleteMutation.isPending}
                    data-testid={`button-delete-region-${region.id}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
            {regions.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                No hay regiones configuradas.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nueva Región</DialogTitle>
            <DialogDescription>Ingresa el nombre de la nueva región del ministerio.</DialogDescription>
          </DialogHeader>
          <Input
            placeholder="Nombre de la región"
            value={newRegionName}
            onChange={(e) => setNewRegionName(e.target.value)}
            data-testid="input-new-region-name"
          />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAddDialog(false)}
              data-testid="button-cancel-add-region"
            >
              Cancelar
            </Button>
            <Button
              onClick={() => {
                if (newRegionName.trim()) createMutation.mutate(newRegionName.trim());
              }}
              disabled={!newRegionName.trim() || createMutation.isPending}
              data-testid="button-confirm-add-region"
            >
              {createMutation.isPending && <Loader2 className="w-4 h-4 mr-1 animate-spin" />}
              Crear Region
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!editRegion} onOpenChange={(open) => { if (!open) setEditRegion(null); }}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Región</DialogTitle>
            <DialogDescription>Modifica el nombre y redes sociales de la región.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              placeholder="Nombre de la región"
              value={editRegionName}
              onChange={(e) => setEditRegionName(e.target.value)}
              data-testid="input-edit-region-name"
            />
            <SocialLinksFormFields
              values={editSocial}
              onChange={(field, value) => setEditSocial({ ...editSocial, [field]: value })}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditRegion(null)}
              data-testid="button-cancel-edit-region"
            >
              Cancelar
            </Button>
            <Button
              onClick={() => {
                if (editRegion && editRegionName.trim()) {
                  updateMutation.mutate({
                    id: editRegion.id,
                    data: {
                      name: editRegionName.trim(),
                      facebook: editSocial.facebook.trim() || null,
                      instagram: editSocial.instagram.trim() || null,
                      youtube: editSocial.youtube.trim() || null,
                      tiktok: editSocial.tiktok.trim() || null,
                      twitter: editSocial.twitter.trim() || null,
                      website: editSocial.website.trim() || null,
                    } as any,
                  });
                }
              }}
              disabled={!editRegionName.trim() || updateMutation.isPending}
              data-testid="button-confirm-edit-region"
            >
              {updateMutation.isPending && <Loader2 className="w-4 h-4 mr-1 animate-spin" />}
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default function RegionesPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [showManageRegions, setShowManageRegions] = useState(false);
  const [newPost, setNewPost] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showPoll, setShowPoll] = useState(false);
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState<string[]>(["", ""]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: regions = [], isLoading: regionsLoading } = useQuery<MinistryRegion[]>({
    queryKey: ["/api/ministry-regions"],
  });

  const activeRegions = regions.filter((r) => r.isActive);

  useEffect(() => {
    if (activeRegions.length > 0 && !selectedRegion) {
      setSelectedRegion(activeRegions[0].name);
    }
    if (activeRegions.length > 0 && selectedRegion && !activeRegions.find((r) => r.name === selectedRegion)) {
      setSelectedRegion(activeRegions[0].name);
    }
  }, [activeRegions, selectedRegion]);

  const { data: allPosts = [], isLoading } = useQuery<RegionPost[]>({
    queryKey: ["/api/region-posts"],
  });

  const filteredPosts = allPosts.filter((p) => p.region === selectedRegion);

  function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  function clearImage() {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function resetForm() {
    setNewPost("");
    clearImage();
    setShowPoll(false);
    setPollQuestion("");
    setPollOptions(["", ""]);
  }

  const createMutation = useMutation({
    mutationFn: async () => {
      let imageUrl: string | null = null;

      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);
        const uploadRes = await fetch("/api/upload/region-image", {
          method: "POST",
          body: formData,
          credentials: "include",
        });
        if (!uploadRes.ok) throw new Error("Error al subir imagen");
        const uploadData = await uploadRes.json();
        imageUrl = uploadData.imageUrl;
      }

      const postRes = await apiRequest("POST", "/api/region-posts", {
        region: selectedRegion,
        content: newPost.trim(),
        imageUrl,
      });
      const post = await postRes.json();

      if (showPoll && pollQuestion.trim()) {
        const validOptions = pollOptions.filter((o) => o.trim());
        if (validOptions.length >= 2) {
          await apiRequest("POST", `/api/region-posts/${post.id}/poll`, {
            question: pollQuestion.trim(),
            options: validOptions,
          });
        }
      }

      return post;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/region-posts"] });
      resetForm();
      toast({ title: "Publicado", description: "Tu mensaje ha sido publicado en la región." });
    },
    onError: () => {
      toast({ title: "Error", description: "No se pudo publicar el mensaje.", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/region-posts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/region-posts"] });
      toast({ title: "Eliminado", description: "El mensaje ha sido eliminado." });
    },
    onError: (error: Error) => {
      toast({ title: "Error al eliminar", description: error.message || "No se pudo eliminar la publicacion.", variant: "destructive" });
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newPost.trim()) return;
    createMutation.mutate();
  }

  function addPollOption() {
    if (pollOptions.length < 6) setPollOptions([...pollOptions, ""]);
  }

  function removePollOption(index: number) {
    if (pollOptions.length > 2) setPollOptions(pollOptions.filter((_, i) => i !== index));
  }

  function updatePollOption(index: number, value: string) {
    const updated = [...pollOptions];
    updated[index] = value;
    setPollOptions(updated);
  }

  const gridColsClass = activeRegions.length <= 2
    ? "grid-cols-2"
    : activeRegions.length === 3
      ? "grid-cols-3"
      : activeRegions.length === 4
        ? "grid-cols-4"
        : "grid-cols-3";

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h1 className="text-3xl font-bold flex items-center gap-2" data-testid="text-regiones-title">
              <Globe className="w-8 h-8 text-primary" /> Regiones
            </h1>
            {user?.role === "admin" && (
              <Button
                variant="outline"
                size="sm"
                className={`toggle-elevate ${showManageRegions ? "toggle-elevated" : ""}`}
                onClick={() => setShowManageRegions(!showManageRegions)}
                data-testid="button-toggle-manage-regions"
              >
                <Settings className="w-4 h-4 mr-1" />
                Gestionar Regiones
              </Button>
            )}
          </div>
          <p className="text-muted-foreground mt-1">Muro de actividades por región del ministerio</p>
        </div>

        {showManageRegions && user?.role === "admin" && <RegionManagementPanel />}

        {regionsLoading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : activeRegions.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium">No hay regiones activas</p>
              <p className="text-muted-foreground text-sm mt-1">
                {user?.role === "admin"
                  ? "Agrega regiones usando el boton 'Gestionar Regiones'."
                  : "No hay regiones disponibles en este momento."}
              </p>
            </CardContent>
          </Card>
        ) : (
          <Tabs value={selectedRegion} onValueChange={setSelectedRegion}>
            <TabsList className={`w-full grid ${gridColsClass} mb-6`} data-testid="tabs-regions">
              {activeRegions.map((region) => (
                <TabsTrigger key={region.id} value={region.name} data-testid={`tab-region-${region.name.toLowerCase().replace(/\s/g, "-")}`}>
                  <MapPin className="w-4 h-4 mr-1" />
                  {withAccents(region.name)}
                </TabsTrigger>
              ))}
            </TabsList>

            {activeRegions.map((region) => (
              <TabsContent key={region.id} value={region.name}>
                <div className="space-y-4">
                  {/* Region social links */}
                  {((region as any).facebook || (region as any).instagram || (region as any).youtube ||
                    (region as any).tiktok || (region as any).twitter || (region as any).website) && (
                    <div className="flex items-center gap-2 px-1">
                      <span className="text-xs text-muted-foreground">Redes:</span>
                      <SocialLinksDisplay data={region as any} />
                    </div>
                  )}
                  {user && (
                    <Card>
                      <CardContent className="pt-4">
                        <form onSubmit={handleSubmit} className="space-y-3">
                          <div className="flex items-start gap-3">
                            <Avatar className="h-8 w-8 shrink-0 mt-1">
                              {user.avatarUrl && <AvatarImage src={user.avatarUrl} />}
                              <AvatarFallback className="text-xs bg-primary/10 text-primary">
                                {(user.displayName || user.username).slice(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <Textarea
                              value={newPost}
                              onChange={(e) => setNewPost(e.target.value)}
                              placeholder={`Comparte algo con la región ${withAccents(region.name)}...`}
                              className="resize-none flex-1"
                              data-testid="input-region-post"
                            />
                          </div>

                          {imagePreview && (
                            <div className="relative inline-block ml-11">
                              <img src={imagePreview} alt="Vista previa" className="rounded-md max-h-40 object-cover" />
                              <Button
                                type="button"
                                variant="secondary"
                                size="icon"
                                className="absolute top-1 right-1"
                                onClick={clearImage}
                                data-testid="button-clear-image"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          )}

                          {showPoll && (
                            <div className="ml-11 space-y-2 p-3 border rounded-md">
                              <Input
                                placeholder="Pregunta de la encuesta..."
                                value={pollQuestion}
                                onChange={(e) => setPollQuestion(e.target.value)}
                                data-testid="input-poll-question"
                              />
                              {pollOptions.map((opt, i) => (
                                <div key={i} className="flex items-center gap-2">
                                  <Input
                                    placeholder={`Opcion ${i + 1}`}
                                    value={opt}
                                    onChange={(e) => updatePollOption(i, e.target.value)}
                                    data-testid={`input-poll-option-${i}`}
                                  />
                                  {pollOptions.length > 2 && (
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => removePollOption(i)}
                                      data-testid={`button-remove-poll-option-${i}`}
                                    >
                                      <Minus className="w-4 h-4" />
                                    </Button>
                                  )}
                                </div>
                              ))}
                              {pollOptions.length < 6 && (
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={addPollOption}
                                  data-testid="button-add-poll-option"
                                >
                                  <Plus className="w-4 h-4 mr-1" /> Agregar opcion
                                </Button>
                              )}
                            </div>
                          )}

                          <div className="flex flex-wrap items-center justify-between gap-2 ml-11">
                            <div className="flex items-center gap-3">
                              <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageSelect}
                                data-testid="input-region-image"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => fileInputRef.current?.click()}
                                data-testid="button-attach-image"
                              >
                                <ImagePlus className="w-4 h-4 mr-1" /> Imagen
                              </Button>
                              <div className="flex items-center gap-2">
                                <Switch
                                  checked={showPoll}
                                  onCheckedChange={setShowPoll}
                                  data-testid="switch-toggle-poll"
                                />
                                <Label className="text-sm cursor-pointer">Encuesta</Label>
                              </div>
                            </div>
                            <Button
                              type="submit"
                              size="sm"
                              disabled={createMutation.isPending || !newPost.trim()}
                              data-testid="button-submit-region-post"
                            >
                              {createMutation.isPending ? (
                                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                              ) : (
                                <Send className="w-4 h-4 mr-1" />
                              )}
                              Publicar
                            </Button>
                          </div>
                        </form>
                      </CardContent>
                    </Card>
                  )}

                  {isLoading ? (
                    <div className="flex justify-center py-16">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : filteredPosts.length === 0 ? (
                    <Card>
                      <CardContent className="py-12 text-center">
                        <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-lg font-medium">Sin publicaciones en {withAccents(region.name)}</p>
                        <p className="text-muted-foreground text-sm mt-1">Se la primera persona en compartir algo.</p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="space-y-3">
                      {filteredPosts.map((post) => (
                        <Card key={post.id} data-testid={`card-region-post-${post.id}`}>
                          <CardContent className="pt-4">
                            <div className="flex items-start gap-3">
                              <Avatar className="h-8 w-8 shrink-0">
                                {post.user?.avatarUrl && <AvatarImage src={post.user.avatarUrl} />}
                                <AvatarFallback className="text-xs bg-primary/10 text-primary">
                                  {(post.user?.displayName || post.user?.username || "?").slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                  <span className="font-medium text-sm" data-testid={`text-post-author-${post.id}`}>
                                    {post.user?.displayName || post.user?.username}
                                  </span>
                                  <span className="text-xs text-muted-foreground" data-testid={`text-post-date-${post.id}`}>
                                    {new Date(post.createdAt).toLocaleDateString("es", { day: "numeric", month: "short", year: "numeric" })}
                                  </span>
                                </div>
                                <RichText text={post.content} className="text-sm" testId={`text-post-content-${post.id}`} />
                                {post.imageUrl && <FileAttachment url={post.imageUrl} name="Imagen de la publicación" fileType="image" className="mt-2" />}
                                <ReactionBar postId={post.id} user={user} />
                                <PollDisplay postId={post.id} user={user} />
                              </div>
                              {user && (user.role === "admin" || user.id === post.userId) && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => deleteMutation.mutate(post.id)}
                                  disabled={deleteMutation.isPending}
                                  data-testid={`button-delete-region-post-${post.id}`}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}
      </div>
    </Layout>
  );
}
