import { useState, useRef } from "react";
import { useAuth } from "@/hooks/use-auth";
import { isAdminRole } from "@/lib/utils";
import { Layout } from "@/components/layout";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { CHURCH_TYPES, MINISTRY_COUNTRIES } from "@shared/schema";
import type { MinistryChurch } from "@shared/schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Loader2, Send, Trash2, Church, Globe, ImagePlus, X,
  Plus, Settings, Pencil, MapPin, Phone, Mail, User,
  Building2, Shield, HandHeart,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SocialLinksDisplay, SocialLinksFormFields, YouTubeLinkPreview, PostContentWithLinks } from "@/components/SocialLinks";

type ChurchPostData = {
  id: number;
  userId: number;
  churchId: number;
  content: string;
  imageUrl: string | null;
  createdAt: string;
  user?: { displayName: string | null; username: string; avatarUrl: string | null };
  church?: { name: string; churchType: string };
};

// ========== CHURCH MANAGEMENT PANEL (Admin) ==========
function ChurchManagementPanel() {
  const { toast } = useToast();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editChurch, setEditChurch] = useState<MinistryChurch | null>(null);
  const [formData, setFormData] = useState({
    name: "", churchType: "respaldo", pastor: "", city: "", country: "",
    address: "", phone: "", email: "", description: "",
    facebook: "", instagram: "", youtube: "", tiktok: "", twitter: "", website: "",
  });

  const { data: churches = [] } = useQuery<MinistryChurch[]>({
    queryKey: ["/api/ministry-churches"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      await apiRequest("POST", "/api/ministry-churches", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/ministry-churches"] });
      resetForm();
      setShowAddDialog(false);
      toast({ title: "Iglesia creada", description: "La iglesia ha sido registrada exitosamente." });
    },
    onError: () => {
      toast({ title: "Error", description: "No se pudo crear la iglesia.", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<MinistryChurch> }) => {
      await apiRequest("PATCH", `/api/ministry-churches/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/ministry-churches"] });
      setEditChurch(null);
      resetForm();
      toast({ title: "Iglesia actualizada", description: "Los datos han sido actualizados." });
    },
    onError: () => {
      toast({ title: "Error", description: "No se pudo actualizar la iglesia.", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/ministry-churches/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/ministry-churches"] });
      queryClient.invalidateQueries({ queryKey: ["/api/church-posts"] });
      toast({ title: "Iglesia eliminada", description: "La iglesia ha sido eliminada." });
    },
    onError: () => {
      toast({ title: "Error", description: "No se pudo eliminar la iglesia.", variant: "destructive" });
    },
  });

  const resetForm = () => {
    setFormData({
      name: "", churchType: "respaldo", pastor: "", city: "", country: "",
      address: "", phone: "", email: "", description: "",
      facebook: "", instagram: "", youtube: "", tiktok: "", twitter: "", website: "",
    });
  };

  const openEditDialog = (church: MinistryChurch) => {
    setEditChurch(church);
    setFormData({
      name: church.name,
      churchType: church.churchType,
      pastor: church.pastor || "",
      city: church.city || "",
      country: church.country || "",
      address: church.address || "",
      phone: church.phone || "",
      email: church.email || "",
      description: church.description || "",
      facebook: (church as any).facebook || "",
      instagram: (church as any).instagram || "",
      youtube: (church as any).youtube || "",
      tiktok: (church as any).tiktok || "",
      twitter: (church as any).twitter || "",
      website: (church as any).website || "",
    });
  };

  const churchForm = (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label className="text-xs">Nombre de la Iglesia *</Label>
          <Input
            placeholder="Nombre de la iglesia"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Tipo *</Label>
          <Select value={formData.churchType} onValueChange={(v) => setFormData({ ...formData, churchType: v })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(CHURCH_TYPES).map(([key, label]) => (
                <SelectItem key={key} value={key}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label className="text-xs">Pastor</Label>
          <Input
            placeholder="Nombre del pastor"
            value={formData.pastor}
            onChange={(e) => setFormData({ ...formData, pastor: e.target.value })}
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Pais</Label>
          <Select value={formData.country} onValueChange={(v) => setFormData({ ...formData, country: v })}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar pais" />
            </SelectTrigger>
            <SelectContent>
              {MINISTRY_COUNTRIES.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label className="text-xs">Ciudad</Label>
          <Input
            placeholder="Ciudad"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Direccion</Label>
          <Input
            placeholder="Direccion"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label className="text-xs">Telefono</Label>
          <Input
            placeholder="Telefono"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Email</Label>
          <Input
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
      </div>
      <div className="space-y-1">
        <Label className="text-xs">Descripción</Label>
        <Textarea
          placeholder="Descripción de la iglesia..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
        />
      </div>
      <SocialLinksFormFields
        values={formData}
        onChange={(field, value) => setFormData({ ...formData, [field]: value })}
      />
    </div>
  );

  return (
    <>
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
          <div>
            <CardTitle className="text-base">Gestionar Iglesias</CardTitle>
            <CardDescription className="text-sm">Agregar, editar o desactivar iglesias de cobertura y respaldo</CardDescription>
          </div>
          <Button
            size="sm"
            onClick={() => { resetForm(); setShowAddDialog(true); }}
            data-testid="button-add-church"
          >
            <Plus className="w-4 h-4 mr-1" /> Nueva Iglesia
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {churches.map((church) => (
              <div
                key={church.id}
                className="flex flex-wrap items-center justify-between gap-2 p-3 border rounded-md"
                data-testid={`church-item-${church.id}`}
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {church.churchType === "cobertura" ? (
                    <Shield className="w-4 h-4 text-primary flex-shrink-0" />
                  ) : (
                    <HandHeart className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  )}
                  <div className="min-w-0">
                    <span className="font-medium text-sm block truncate">{church.name}</span>
                    {church.pastor && <span className="text-xs text-muted-foreground">Pastor: {church.pastor}</span>}
                  </div>
                  <Badge variant={church.churchType === "cobertura" ? "default" : "secondary"} className="text-xs flex-shrink-0">
                    {CHURCH_TYPES[church.churchType as keyof typeof CHURCH_TYPES] || church.churchType}
                  </Badge>
                  <Badge variant={church.isActive ? "outline" : "secondary"} className="text-xs flex-shrink-0">
                    {church.isActive ? "Activa" : "Inactiva"}
                  </Badge>
                </div>
                <div className="flex items-center gap-1">
                  <div className="flex items-center gap-2 mr-2">
                    <Switch
                      checked={church.isActive}
                      onCheckedChange={(checked) =>
                        updateMutation.mutate({ id: church.id, data: { isActive: checked } })
                      }
                      disabled={updateMutation.isPending}
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openEditDialog(church)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteMutation.mutate(church.id)}
                    disabled={deleteMutation.isPending}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
            {churches.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                No hay iglesias registradas.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Add Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Nueva Iglesia</DialogTitle>
            <DialogDescription>Registra una nueva iglesia de cobertura o en respaldo.</DialogDescription>
          </DialogHeader>
          {churchForm}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancelar</Button>
            <Button
              onClick={() => {
                if (formData.name.trim()) {
                  createMutation.mutate({
                    name: formData.name.trim(),
                    churchType: formData.churchType,
                    pastor: formData.pastor.trim() || undefined,
                    city: formData.city.trim() || undefined,
                    country: formData.country || undefined,
                    address: formData.address.trim() || undefined,
                    phone: formData.phone.trim() || undefined,
                    email: formData.email.trim() || undefined,
                    description: formData.description.trim() || undefined,
                    facebook: formData.facebook.trim() || undefined,
                    instagram: formData.instagram.trim() || undefined,
                    youtube: formData.youtube.trim() || undefined,
                    tiktok: formData.tiktok.trim() || undefined,
                    twitter: formData.twitter.trim() || undefined,
                    website: formData.website.trim() || undefined,
                  });
                }
              }}
              disabled={!formData.name.trim() || createMutation.isPending}
            >
              {createMutation.isPending && <Loader2 className="w-4 h-4 mr-1 animate-spin" />}
              Crear Iglesia
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editChurch} onOpenChange={(open) => { if (!open) { setEditChurch(null); resetForm(); } }}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Iglesia</DialogTitle>
            <DialogDescription>Modifica los datos de la iglesia.</DialogDescription>
          </DialogHeader>
          {churchForm}
          <DialogFooter>
            <Button variant="outline" onClick={() => { setEditChurch(null); resetForm(); }}>Cancelar</Button>
            <Button
              onClick={() => {
                if (editChurch && formData.name.trim()) {
                  updateMutation.mutate({
                    id: editChurch.id,
                    data: {
                      name: formData.name.trim(),
                      churchType: formData.churchType,
                      pastor: formData.pastor.trim() || null,
                      city: formData.city.trim() || null,
                      country: formData.country || null,
                      address: formData.address.trim() || null,
                      phone: formData.phone.trim() || null,
                      email: formData.email.trim() || null,
                      description: formData.description.trim() || null,
                      facebook: formData.facebook.trim() || null,
                      instagram: formData.instagram.trim() || null,
                      youtube: formData.youtube.trim() || null,
                      tiktok: formData.tiktok.trim() || null,
                      twitter: formData.twitter.trim() || null,
                      website: formData.website.trim() || null,
                    },
                  });
                }
              }}
              disabled={!formData.name.trim() || updateMutation.isPending}
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

// ========== CHURCH CARD COMPONENT ==========
function ChurchCard({ church }: { church: MinistryChurch }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
            church.churchType === "cobertura"
              ? "bg-primary/10 text-primary"
              : "bg-secondary/50 text-muted-foreground"
          }`}>
            {church.churchType === "cobertura" ? (
              <Shield className="w-5 h-5" />
            ) : (
              <HandHeart className="w-5 h-5" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-sm">{church.name}</h3>
              <Badge
                variant={church.churchType === "cobertura" ? "default" : "secondary"}
                className="text-xs"
              >
                {CHURCH_TYPES[church.churchType as keyof typeof CHURCH_TYPES] || church.churchType}
              </Badge>
            </div>
            {church.pastor && (
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <User className="w-3 h-3" /> Pastor: {church.pastor}
              </p>
            )}
            {(church.city || church.country) && (
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3" />
                {[church.city, church.country].filter(Boolean).join(", ")}
              </p>
            )}
            {church.address && (
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                <Building2 className="w-3 h-3" /> {church.address}
              </p>
            )}
            {church.phone && (
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                <Phone className="w-3 h-3" /> {church.phone}
              </p>
            )}
            {church.email && (
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                <Mail className="w-3 h-3" /> {church.email}
              </p>
            )}
            {church.description && (
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{church.description}</p>
            )}
            <SocialLinksDisplay data={church as any} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ========== MAIN PAGE ==========
export default function IglesiasPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("cobertura");
  const [postContent, setPostContent] = useState("");
  const [selectedChurchId, setSelectedChurchId] = useState<number | null>(null);
  const [postImageUrl, setPostImageUrl] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const postImageRef = useRef<HTMLInputElement>(null);
  const isAdmin = isAdminRole(user?.role);

  const { data: churches = [], isLoading: loadingChurches } = useQuery<MinistryChurch[]>({
    queryKey: ["/api/ministry-churches"],
  });

  const activeChurches = churches.filter((c) => c.isActive);
  const coberturaChurches = activeChurches.filter((c) => c.churchType === "cobertura");
  const respaldoChurches = activeChurches.filter((c) => c.churchType === "respaldo");

  const { data: posts = [], isLoading: loadingPosts } = useQuery<ChurchPostData[]>({
    queryKey: ["/api/church-posts", selectedChurchId],
    queryFn: async () => {
      const url = selectedChurchId ? `/api/church-posts?churchId=${selectedChurchId}` : "/api/church-posts";
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) return [];
      return res.json();
    },
  });

  const createPostMutation = useMutation({
    mutationFn: async (data: { churchId: number; content: string; imageUrl?: string | null }) => {
      await apiRequest("POST", "/api/church-posts", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/church-posts"] });
      setPostContent("");
      setPostImageUrl(null);
      toast({ title: "Publicación creada" });
    },
    onError: () => {
      toast({ title: "Error", description: "No se pudo crear la publicacion.", variant: "destructive" });
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/church-posts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/church-posts"] });
      toast({ title: "Publicación eliminada" });
    },
  });

  const handleSubmitPost = () => {
    if (!postContent.trim() || !selectedChurchId) return;
    createPostMutation.mutate({
      churchId: selectedChurchId,
      content: postContent.trim(),
      imageUrl: postImageUrl,
    });
  };

  const handlePostImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast({ title: "Error", description: "Solo se permiten imagenes.", variant: "destructive" });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "Error", description: "La imagen no debe superar 5MB.", variant: "destructive" });
      return;
    }
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch("/api/upload/post-image", {
        method: "POST", body: formData, credentials: "include",
      });
      if (!res.ok) throw new Error("Error al subir imagen");
      const data = await res.json();
      setPostImageUrl(data.imageUrl);
    } catch {
      toast({ title: "Error", description: "No se pudo subir la imagen.", variant: "destructive" });
    } finally {
      setUploadingImage(false);
      if (postImageRef.current) postImageRef.current.value = "";
    }
  };

  const renderChurchSection = (churchList: MinistryChurch[], type: string) => {
    if (loadingChurches) {
      return (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      );
    }

    if (churchList.length === 0) {
      return (
        <Card>
          <CardContent className="p-8 text-center">
            <Church className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
            <h3 className="font-medium mb-1">
              {type === "cobertura" ? "No hay iglesias de cobertura registradas" : "No hay iglesias en respaldo registradas"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {isAdmin
                ? "Usa el panel de administracion para agregar iglesias."
                : "El administrador puede agregar iglesias a esta seccion."}
            </p>
          </CardContent>
        </Card>
      );
    }

    return (
      <div className="space-y-4">
        {/* Churches Grid */}
        <div className="grid gap-3 sm:grid-cols-2">
          {churchList.map((church) => (
            <ChurchCard key={church.id} church={church} />
          ))}
        </div>

        {/* Posts Section */}
        {/* Posts Section — visible to everyone, posting requires auth */}
        <Card className="mt-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Send className="w-4 h-4" />
              Publicaciones
            </CardTitle>
            <CardDescription>Noticias y testimonios de estas iglesias.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* New post form — only for active authenticated users */}
            {user?.isActive && (
            <div className="space-y-2">
              <Select
                value={selectedChurchId?.toString() || ""}
                onValueChange={(v) => setSelectedChurchId(parseInt(v))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una iglesia..." />
                </SelectTrigger>
                <SelectContent>
                  {churchList.map((c) => (
                    <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <Textarea
                  placeholder="Escribe algo sobre esta iglesia..."
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    rows={2}
                    className="flex-1"
                  />
                  <div className="flex flex-col gap-1">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => postImageRef.current?.click()}
                      disabled={uploadingImage}
                      title="Adjuntar imagen"
                    >
                      {uploadingImage ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <ImagePlus className="w-4 h-4" />
                      )}
                    </Button>
                    <input
                      ref={postImageRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePostImageUpload}
                    />
                    <Button
                      size="icon"
                      onClick={handleSubmitPost}
                      disabled={!postContent.trim() || !selectedChurchId || createPostMutation.isPending}
                    >
                      {createPostMutation.isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
                {postImageUrl && (
                  <div className="relative inline-block">
                    <img
                      src={postImageUrl}
                      alt="Vista previa"
                      className="max-h-32 rounded-md border"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 w-6 h-6"
                      onClick={() => setPostImageUrl(null)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                )}
              </div>
            )}

              {/* Posts list — visible to everyone */}
              {posts
                .filter((p) => churchList.some((c) => c.id === p.churchId))
                .map((post) => (
                  <Card key={post.id} className="bg-muted/30">
                    <CardContent className="p-3">
                      <div className="flex items-start gap-3">
                        <Avatar className="w-8 h-8">
                          {post.user?.avatarUrl && <AvatarImage src={post.user.avatarUrl} />}
                          <AvatarFallback className="text-xs">
                            {(post.user?.displayName || post.user?.username || "?").charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-medium">
                              {post.user?.displayName || post.user?.username}
                            </span>
                            {post.church && (
                              <Badge variant="outline" className="text-xs">
                                {post.church.name}
                              </Badge>
                            )}
                            <span className="text-xs text-muted-foreground">
                              {new Date(post.createdAt).toLocaleDateString("es", {
                                day: "numeric", month: "short", year: "numeric",
                              })}
                            </span>
                          </div>
                          <PostContentWithLinks content={post.content} />
                          <YouTubeLinkPreview content={post.content} />
                          {post.imageUrl && (
                            <img
                              src={post.imageUrl}
                              alt="Imagen de publicacion"
                              className="mt-2 rounded-lg max-h-64 object-cover border"
                            />
                          )}
                        </div>
                        {(post.userId === user?.id || isAdmin) && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="flex-shrink-0"
                            onClick={() => deletePostMutation.mutate(post.id)}
                            disabled={deletePostMutation.isPending}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </CardContent>
          </Card>
      </div>
    );
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Church className="w-8 h-8 text-primary" />
            Iglesias
          </h1>
          <p className="text-muted-foreground mt-1">
            Conoce las iglesias de cobertura y las iglesias en respaldo de nuestro ministerio.
          </p>
        </div>

        {isAdmin && <ChurchManagementPanel />}

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="cobertura" className="flex items-center gap-1">
              <Shield className="w-4 h-4" />
              <span>Cobertura</span>
              {coberturaChurches.length > 0 && (
                <Badge variant="secondary" className="ml-1 text-xs">{coberturaChurches.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="respaldo" className="flex items-center gap-1">
              <HandHeart className="w-4 h-4" />
              <span>Respaldo</span>
              {respaldoChurches.length > 0 && (
                <Badge variant="secondary" className="ml-1 text-xs">{respaldoChurches.length}</Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cobertura" className="mt-4">
            <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20 mb-4">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Iglesia Cobertura</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Las iglesias que nos brindan cobertura espiritual y pastoral, guiando el ministerio bajo autoridad establecida por Dios.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            {renderChurchSection(coberturaChurches, "cobertura")}
          </TabsContent>

          <TabsContent value="respaldo" className="mt-4">
            <Card className="bg-gradient-to-r from-secondary/30 via-secondary/10 to-transparent border-secondary/20 mb-4">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <HandHeart className="w-6 h-6 text-muted-foreground flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Iglesias en Respaldo</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Iglesias aliadas que respaldan nuestra labor, trabajando juntos para extender el reino de Dios.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            {renderChurchSection(respaldoChurches, "respaldo")}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
