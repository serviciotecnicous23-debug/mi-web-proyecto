import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useUpdateUser, useMyEnrollments } from "@/hooks/use-users";
import { useLocation } from "wouter";
import { Layout } from "@/components/layout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserSchema, MINISTRY_COUNTRIES, ROLES } from "@shared/schema";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Loader2, Save, Camera, Lock, UserPlus, UserMinus, Check, X, Search, Users, GraduationCap, BookOpen, Award, Bell } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { SocialLinksDisplay, SocialLinksFormFields } from "@/components/SocialLinks";
import { COURSE_CATEGORIES, ENROLLMENT_STATUSES } from "@shared/schema";
import { Link } from "wouter";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Profile() {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();
  const defaultTab = (() => {
    const tab = new URLSearchParams(window.location.search).get("tab");
    if (tab === "amigos") return "amigos";
    if (tab === "capacitaciones") return "capacitaciones";
    if (tab === "notificaciones") return "notificaciones";
    return "perfil";
  })();
  const updateMutation = useUpdateUser();
  const formInitialized = useRef(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: myEnrollments } = useMyEnrollments();

  // complex Zod schema causes TypeScript recursion errors; use any for form type
  const form = useForm<any>({
    resolver: zodResolver(updateUserSchema as any),
    defaultValues: { displayName: "", bio: "", country: "", phone: "", email: "", username: "",
      facebook: "", instagram: "", youtube: "", tiktok: "", twitter: "", website: "" },
  });

  // Friends queries
  const { data: friends = [] } = useQuery<any[]>({
    queryKey: ["/api/friends"],
    enabled: !!user,
  });

  const { data: friendRequests = [] } = useQuery<any[]>({
    queryKey: ["/api/friends/requests"],
    enabled: !!user,
  });

  const { data: searchResults = [] } = useQuery<any[]>({
    queryKey: ["/api/friends/search", searchQuery],
    queryFn: async () => {
      const res = await fetch(`/api/friends/search?q=${encodeURIComponent(searchQuery)}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Error al buscar usuarios");
      return res.json();
    },
    enabled: !!user && searchQuery.length > 0,
  });

  const sendRequestMutation = useMutation({
    mutationFn: async (addresseeId: number) => {
      const res = await fetch("/api/friends/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ addresseeId }),
        credentials: "include",
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Error al enviar solicitud");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/friends"] });
      queryClient.invalidateQueries({ queryKey: ["/api/friends/search"] });
      toast({ title: "Solicitud enviada" });
    },
    onError: (err: Error) => toast({ title: "Error", description: err.message, variant: "destructive" }),
  });

  const acceptMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/friends/${id}/accept`, { method: "PATCH", credentials: "include" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Error al aceptar solicitud");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/friends"] });
      queryClient.invalidateQueries({ queryKey: ["/api/friends/requests"] });
      toast({ title: "Solicitud aceptada" });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/friends/${id}/reject`, { method: "PATCH", credentials: "include" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Error al rechazar solicitud");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/friends/requests"] });
      toast({ title: "Solicitud rechazada" });
    },
  });

  const removeFriendMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/friends/${id}`, { method: "DELETE", credentials: "include" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Error al eliminar amigo");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/friends"] });
      queryClient.invalidateQueries({ queryKey: ["/api/friends/search"] });
      toast({ title: "Amigo eliminado" });
    },
  });

  useEffect(() => {
    if (user && !formInitialized.current) {
      formInitialized.current = true;
      form.reset({
        displayName: user.displayName || "",
        bio: user.bio || "",
        country: user.country || "",
        phone: user.phone || "",
        email: user.email || "",
        username: user.username || "",
        facebook: (user as any).facebook || "",
        instagram: (user as any).instagram || "",
        youtube: (user as any).youtube || "",
        tiktok: (user as any).tiktok || "",
        twitter: (user as any).twitter || "",
        website: (user as any).website || "",
      });
    } else if (!isLoading && !user) {
      setLocation("/login");
    }
  }, [user, isLoading, setLocation]);

  if (isLoading || !user) {
    return (
      <Layout>
        <div className="flex-1 flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  function onSubmit(data: any) {
    if (user) {
      updateMutation.mutate({ id: user.id, updates: data });
    }
  }

  async function handlePasswordChange() {
    if (newPassword !== confirmPassword) {
      toast({ title: "Error", description: "Las contraseñas no coinciden.", variant: "destructive" });
      return;
    }
    if (newPassword.length < 6) {
      toast({ title: "Error", description: "La nueva contraseña debe tener al menos 6 caracteres.", variant: "destructive" });
      return;
    }
    setChangingPassword(true);
    try {
      const res = await fetch("/api/users/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast({ title: "Contraseña actualizada", description: "Tu contraseña ha sido cambiada exitosamente." });
      setShowPasswordDialog(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "No se pudo cambiar la contraseña.", variant: "destructive" });
    } finally {
      setChangingPassword(false);
    }
  }

  async function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
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

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("avatar", file);
      const res = await fetch("/api/upload/avatar", { method: "POST", body: formData, credentials: "include" });
      if (!res.ok) throw new Error("Error al subir imagen");
      const data = await res.json();
      // Update user cache immediately with new avatar URL
      queryClient.setQueryData(["/api/user"], (old: any) => old ? { ...old, avatarUrl: data.avatarUrl } : old);
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      toast({ title: "Foto actualizada", description: "Tu foto de perfil ha sido actualizada." });
    } catch {
      toast({ title: "Error", description: "No se pudo subir la imagen.", variant: "destructive" });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8" data-testid="text-profile-title">Mi Perfil</h1>

        <Tabs defaultValue={defaultTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="perfil">Perfil</TabsTrigger>
            <TabsTrigger value="capacitaciones">
              <GraduationCap className="w-4 h-4 mr-1" /> Capacitaciones
            </TabsTrigger>
            <TabsTrigger value="amigos">
              Amigos {friendRequests.length > 0 && <Badge variant="destructive" className="ml-1 h-5 min-w-5 text-xs">{friendRequests.length}</Badge>}
            </TabsTrigger>
            <TabsTrigger value="notificaciones">
              <Bell className="w-4 h-4 mr-1" /> Notificaciónes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="perfil">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="h-fit">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 relative group">
                    <Avatar className="h-24 w-24">
                      {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.displayName || user.username} />}
                      <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                        {(user.displayName || user.username).slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <button
                      type="button"
                      className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      data-testid="button-change-avatar"
                    >
                      {uploading ? (
                        <Loader2 className="w-6 h-6 text-white animate-spin" />
                      ) : (
                        <Camera className="w-6 h-6 text-white" />
                      )}
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarUpload}
                      data-testid="input-avatar-file"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">Haz clic en la foto para cambiarla</p>
                  <CardTitle data-testid="text-profile-name">{user.displayName || user.username}</CardTitle>
                  <CardDescription>@{user.username}</CardDescription>
                  {user.country && (
                    <p className="text-sm text-muted-foreground mt-1" data-testid="text-profile-country">{user.country}</p>
                  )}
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                      {ROLES[user.role as keyof typeof ROLES] || user.role}
                    </Badge>
                    <Badge variant={user.isActive ? "outline" : "destructive"}>
                      {user.isActive ? "Aprobado" : "Pre-aprobado"}
                    </Badge>
                  </div>
                  {(user.email || user.phone) && (
                    <div className="mt-3 text-xs text-muted-foreground space-y-1">
                      {user.email && <p data-testid="text-profile-email">{user.email}</p>}
                      {user.phone && <p data-testid="text-profile-phone">{user.phone}</p>}
                    </div>
                  )}
                  <div className="mt-3 flex justify-center">
                    <SocialLinksDisplay data={user as any} size="md" />
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" size="sm" onClick={() => setShowPasswordDialog(true)}>
                      <Lock className="mr-2 h-4 w-4" />
                      Cambiar Contraseña
                    </Button>
                  </div>
                </CardHeader>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Información Personal</CardTitle>
                  <CardDescription>Actualiza los datos de tu perfil.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nombre de Usuario</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Tu nombre de usuario"
                                {...field}
                                value={field.value || ""}
                                data-testid="input-username"
                              />
                            </FormControl>
                            <FormDescription>Este es tu identificador unico en la plataforma.</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="displayName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nombre para Mostrar</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Tu nombre completo"
                                {...field}
                                value={field.value || ""}
                                data-testid="input-display-name"
                              />
                            </FormControl>
                            <FormDescription>Este nombre se mostrara en tu perfil.</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Biografia</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Cuentanos sobre ti y tu llamado..."
                                className="resize-none min-h-[120px]"
                                {...field}
                                value={field.value || ""}
                                data-testid="textarea-bio"
                              />
                            </FormControl>
                            <FormDescription>Breve descripcion para tu perfil.</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pais</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value || ""}>
                              <FormControl>
                                <SelectTrigger data-testid="select-profile-country">
                                  <SelectValue placeholder="Selecciona tu pais" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {MINISTRY_COUNTRIES.map(c => (
                                  <SelectItem key={c} value={c}>{c}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>Tu pais se mostrara en tu perfil.</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Correo Electronico</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="tu@correo.com" {...field} value={field.value || ""} data-testid="input-profile-email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Telefono</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="+1 234 567 8900" {...field} value={field.value || ""} data-testid="input-profile-phone" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Social media links */}
                      <div className="border-t pt-4 mt-2">
                        <SocialLinksFormFields
                          values={{
                            facebook: form.watch("facebook") || "",
                            instagram: form.watch("instagram") || "",
                            youtube: form.watch("youtube") || "",
                            tiktok: form.watch("tiktok") || "",
                            twitter: form.watch("twitter") || "",
                            website: form.watch("website") || "",
                          }}
                          onChange={(field, value) => form.setValue(field as any, value)}
                        />
                        <p className="text-xs text-muted-foreground mt-1">Opcional: agrega tus redes sociales a tu perfil.</p>
                      </div>

                      <div className="flex justify-end pt-4">
                        <Button type="submit" disabled={updateMutation.isPending} data-testid="button-save-profile">
                          {updateMutation.isPending ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Guardando...
                            </>
                          ) : (
                            <>
                              <Save className="mr-2 h-4 w-4" />
                              Guardar Cambios
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="capacitaciones">
            <div className="space-y-6">
              {/* Completed Courses */}
              {(() => {
                const completed = myEnrollments?.filter((e: any) => e.status === "completado") || [];
                const active = myEnrollments?.filter((e: any) => e.status === "aprobado") || [];
                const pending = myEnrollments?.filter((e: any) => e.status === "solicitado") || [];
                return (
                  <>
                    {completed.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2"><Award className="w-5 h-5 text-yellow-500" /> Cursos Completados ({completed.length})</CardTitle>
                          <CardDescription>Tu historial de capacitaciones finalizadas</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          {completed.map((e: any) => (
                            <div key={e.id} className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <BookOpen className="w-4 h-4 text-green-600" />
                                  <p className="font-semibold text-sm">{e.course?.title || e.courseName || 'Curso'}</p>
                                  <Badge variant="secondary" className="text-xs">{COURSE_CATEGORIES[(e.course?.category || 'general') as keyof typeof COURSE_CATEGORIES]}</Badge>
                                </div>
                                {e.grade && <p className="text-xs mt-1">Calificacion: <span className="font-bold text-green-700">{e.grade}</span></p>}
                                {e.observations && <p className="text-xs text-muted-foreground mt-1">{e.observations}</p>}
                                {e.completedAt && <p className="text-xs text-muted-foreground mt-1">Completado: {new Date(e.completedAt).toLocaleDateString("es", { day: "numeric", month: "long", year: "numeric" })}</p>}
                              </div>
                              <Link href={`/aula/${e.courseId}`}><Button size="sm" variant="outline"><GraduationCap className="w-4 h-4 mr-1" /> Ver Aula</Button></Link>
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    )}

                    {active.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2"><BookOpen className="w-5 h-5 text-primary" /> Cursos Activos ({active.length})</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          {active.map((e: any) => (
                            <div key={e.id} className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg bg-muted/50">
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm">{e.course?.title || e.courseName || 'Curso'}</p>
                                <Badge variant="secondary" className="text-xs mt-1">{COURSE_CATEGORIES[(e.course?.category || 'general') as keyof typeof COURSE_CATEGORIES]}</Badge>
                              </div>
                              <Link href={`/aula/${e.courseId}`}><Button size="sm" variant="outline"><GraduationCap className="w-4 h-4 mr-1" /> Aula Virtual</Button></Link>
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    )}

                    {pending.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Solicitudes Pendientes ({pending.length})</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          {pending.map((e: any) => (
                            <div key={e.id} className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg bg-muted/50">
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm">{e.course?.title || e.courseName || 'Curso'}</p>
                                <Badge variant="outline" className="text-xs mt-1">Pendiente de aprobacion</Badge>
                              </div>
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    )}

                    {!myEnrollments?.length && (
                      <Card>
                        <CardContent className="py-12 text-center">
                          <GraduationCap className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                          <p className="text-muted-foreground">No estas inscrito en ningun curso.</p>
                          <Link href="/capacitaciones"><Button variant="outline" className="mt-4">Ver Cursos Disponibles</Button></Link>
                        </CardContent>
                      </Card>
                    )}
                  </>
                );
              })()}
            </div>
          </TabsContent>

          <TabsContent value="amigos">
            <div className="space-y-6">
              {/* Friend Requests */}
              {friendRequests.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Solicitudes de Amistad ({friendRequests.length})</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {friendRequests.map((req: any) => (
                      <div key={req.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            {req.requester?.avatarUrl && <AvatarImage src={req.requester.avatarUrl} />}
                            <AvatarFallback className="bg-primary/10 text-primary text-sm">
                              {(req.requester?.displayName || req.requester?.username || "?").slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{req.requester?.displayName || req.requester?.username}</p>
                            {req.requester?.country && <p className="text-xs text-muted-foreground">{req.requester.country}</p>}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => acceptMutation.mutate(req.id)} disabled={acceptMutation.isPending}>
                            <Check className="h-4 w-4 mr-1" /> Aceptar
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => rejectMutation.mutate(req.id)} disabled={rejectMutation.isPending}>
                            <X className="h-4 w-4 mr-1" /> Rechazar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Search Users */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Buscar Usuarios</CardTitle>
                  <CardDescription>Busca otros miembros para agregarlos como amigos.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      className="pl-9"
                      placeholder="Buscar por nombre o usuario..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  {searchQuery && searchResults.map((u: any) => (
                    <div key={u.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          {u.avatarUrl && <AvatarImage src={u.avatarUrl} />}
                          <AvatarFallback className="bg-primary/10 text-primary text-sm">
                            {(u.displayName || u.username).slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{u.displayName || u.username}</p>
                          <p className="text-xs text-muted-foreground">@{u.username}</p>
                        </div>
                      </div>
                      {u.friendshipStatus === "accepted" ? (
                        <Badge variant="secondary">Amigos</Badge>
                      ) : u.friendshipStatus === "pending" ? (
                        <Badge variant="outline">Pendiente</Badge>
                      ) : (
                        <Button size="sm" onClick={() => sendRequestMutation.mutate(u.id)} disabled={sendRequestMutation.isPending}>
                          <UserPlus className="h-4 w-4 mr-1" /> Agregar
                        </Button>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* My Friends */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="h-5 w-5" /> Mis Amigos ({friends.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {friends.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">Aun no tienes amigos. Busca usuarios arriba para agregarlos.</p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {friends.map((f: any) => (
                        <div key={f.id} className="flex items-center justify-between p-3 rounded-lg border">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              {f.friend?.avatarUrl && <AvatarImage src={f.friend.avatarUrl} />}
                              <AvatarFallback className="bg-primary/10 text-primary text-sm">
                                {(f.friend?.displayName || f.friend?.username || "?").slice(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">{f.friend?.displayName || f.friend?.username}</p>
                              {f.friend?.country && <p className="text-xs text-muted-foreground">{f.friend.country}</p>}
                            </div>
                          </div>
                          <Button size="icon" variant="ghost" onClick={() => removeFriendMutation.mutate(f.id)} title="Eliminar amigo">
                            <UserMinus className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notificaciones">
            <NotificaciónesTab />
          </TabsContent>
        </Tabs>
      </div>

      {/* Password Change Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cambiar Contraseña</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Contraseña Actual</label>
              <Input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Tu contraseña actual"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Nueva Contraseña</label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Minimo 6 caracteres"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Confirmar Nueva Contraseña</label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repite la nueva contraseña"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPasswordDialog(false)}>Cancelar</Button>
            <Button onClick={handlePasswordChange} disabled={changingPassword || !currentPassword || !newPassword || !confirmPassword}>
              {changingPassword ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lock className="mr-2 h-4 w-4" />}
              Cambiar Contraseña
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}

/* ─── Notifications Preferences Tab ─── */

const NOTIFICATION_PREFS = [
  { key: "emailNotifyAccountApproved", label: "Cuenta aprobada", description: "Recibir email cuando tu cuenta sea activada por un administrador." },
  { key: "emailNotifyDirectMessage", label: "Mensajes directos", description: "Recibir email cuando alguien te envíe un mensaje directo." },
  { key: "emailNotifyNewCourse", label: "Nuevos cursos", description: "Recibir email cuando se publique un nuevo curso o capacitación." },
  { key: "emailNotifyEventReminder", label: "Recordatorios de eventos", description: "Recibir email de confirmación cuando te registres a un evento." },
] as const;

function NotificaciónesTab() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: prefs, isLoading } = useQuery<Record<string, boolean>>({
    queryKey: ["/api/email-preferences"],
    queryFn: async () => {
      const res = await fetch("/api/email-preferences", { credentials: "include" });
      if (!res.ok) throw new Error("Error al cargar preferencias");
      return res.json();
    },
  });

  const mutation = useMutation({
    mutationFn: async (patch: Record<string, boolean>) => {
      const res = await fetch("/api/email-preferences", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(patch),
      });
      if (!res.ok) throw new Error("Error al guardar");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/email-preferences"] });
    },
    onError: () => {
      toast({ title: "Error", description: "No se pudo guardar la preferencia.", variant: "destructive" });
    },
  });

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5" /> Notificaciónes por Email</CardTitle>
        <CardDescription>Elige qué notificaciones deseas recibir. Puedes cambiarlas en cualquier momento.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {NOTIFICATION_PREFS.map(({ key, label, description }) => (
          <div key={key} className="flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <p className="text-sm font-medium">{label}</p>
              <p className="text-xs text-muted-foreground">{description}</p>
            </div>
            <Switch
              checked={prefs?.[key] !== false}
              onCheckedChange={(checked: boolean) => mutation.mutate({ [key]: checked })}
              disabled={mutation.isPending}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
