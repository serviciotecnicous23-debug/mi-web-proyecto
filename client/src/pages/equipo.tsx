import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { TeamMember } from "@shared/schema";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Link } from "wouter";
import { Settings, Pencil, Trash2, Plus, Loader2, Save, Users, Search, Flame } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const emptyForm = { name: "", role: "", description: "", verse: "", initials: "", userId: null as number | null };

export default function Equipo() {
  const { user } = useAuth();
  const { toast } = useToast();
  const isAdmin = user?.role === "admin";

  const [managementMode, setManagementMode] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [userSearch, setUserSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const { data: teamMembers, isLoading } = useQuery<TeamMember[]>({
    queryKey: ["/api/team-members"],
  });

  // Usuarios registrados para vincular (solo admin)
  const { data: registeredUsers = [] } = useQuery<any[]>({
    queryKey: ["/api/admin/users"],
    enabled: isAdmin && dialogOpen,
  });

  const existingUserIds = new Set((teamMembers || []).map((m: any) => m.userId).filter(Boolean));
  const filteredUsers = registeredUsers.filter((u: any) => {
    if (editingMember?.userId === u.id) return true;
    if (existingUserIds.has(u.id)) return false;
    if (!userSearch.trim()) return false;
    const q = userSearch.toLowerCase();
    return (u.displayName || "").toLowerCase().includes(q) || u.username.toLowerCase().includes(q);
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof emptyForm) => {
      await apiRequest("POST", "/api/team-members", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/team-members"] });
      setDialogOpen(false);
      setForm(emptyForm);
      toast({ title: "Miembro agregado exitosamente" });
    },
    onError: (error: Error) => {
      toast({ title: "Error al agregar miembro", description: error.message, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: typeof emptyForm }) => {
      await apiRequest("PATCH", `/api/team-members/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/team-members"] });
      setDialogOpen(false);
      setEditingMember(null);
      setForm(emptyForm);
      toast({ title: "Miembro actualizado exitosamente" });
    },
    onError: (error: Error) => {
      toast({ title: "Error al actualizar miembro", description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/team-members/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/team-members"] });
      setDeleteConfirmId(null);
      toast({ title: "Miembro eliminado exitosamente" });
    },
    onError: (error: Error) => {
      toast({ title: "Error al eliminar miembro", description: error.message, variant: "destructive" });
    },
  });

  function openAddDialog() {
    setEditingMember(null);
    setForm(emptyForm);
    setSelectedUser(null);
    setUserSearch("");
    setDialogOpen(true);
  }

  function openEditDialog(member: TeamMember) {
    setEditingMember(member);
    setForm({
      name: member.name,
      role: member.role,
      description: member.description || "",
      verse: member.verse || "",
      initials: member.initials || "",
      userId: (member as any).userId || null,
    });
    setSelectedUser(null);
    setUserSearch("");
    setDialogOpen(true);
  }

  function selectUser(u: any) {
    setSelectedUser(u);
    setForm({
      ...form,
      name: u.displayName || u.username,
      initials: (u.displayName || u.username).slice(0, 2).toUpperCase(),
      userId: u.id,
    });
    setUserSearch("");
  }

  function handleSubmit() {
    if (!form.name.trim() || !form.role.trim()) return;
    if (editingMember) {
      updateMutation.mutate({ id: editingMember.id, data: form });
    } else {
      createMutation.mutate(form);
    }
  }

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <Layout>
      {/* ═══ PORTADA EDITORIAL ═════════════════════════════════════ */}
      <section className="relative overflow-hidden section-aurora py-16 md:py-24">
        <p
          className="heading-display pointer-events-none absolute -right-8 top-2 select-none text-[clamp(7rem,20vw,18rem)] leading-none text-foreground/[0.04]"
          aria-hidden
        >
          AVF
        </p>
        <div className="relative mx-auto max-w-6xl px-4">
          <span className="glass-pill mb-6 inline-block text-xs">Nuestro equipo</span>
          <h1 className="heading-display text-[clamp(3rem,9.5vw,8rem)] leading-[0.9]" data-testid="text-team-title">
            Rostros <span className="accent-serif fire-text lowercase">del fuego</span>
          </h1>
          <p className="accent-serif mt-6 max-w-xl text-lg text-muted-foreground md:text-xl">
            Un equipo unido por el mismo llamado: encender el avivamiento
            en cada rincón del mundo.
          </p>

          {isAdmin && (
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                variant={managementMode ? "default" : "outline"}
                onClick={() => setManagementMode(!managementMode)}
                data-testid="button-toggle-management"
              >
                <Settings className="mr-2 h-4 w-4" />
                Gestionar equipo
              </Button>
              {managementMode && (
                <Button onClick={openAddDialog} data-testid="button-add-member">
                  <Plus className="mr-2 h-4 w-4" />
                  Agregar miembro
                </Button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ═══ GALERÍA DE RETRATOS ═══════════════════════════════════ */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4">
          {isLoading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" data-testid="loading-spinner" />
            </div>
          ) : !teamMembers || teamMembers.length === 0 ? (
            <div className="hud-frame rounded-md py-20 text-center" data-testid="empty-state">
              <Users className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />
              <p className="heading-display text-3xl text-foreground/20 md:text-5xl">El equipo se conforma</p>
              <p className="accent-serif mx-auto mt-3 max-w-md text-muted-foreground">
                {isAdmin
                  ? "Activa el modo de gestión para agregar miembros al equipo."
                  : "El equipo se está conformando. Vuelve pronto."}
              </p>
            </div>
          ) : (
            <div className="divide-y border-y-2 border-foreground/15">
              {teamMembers.map((member, index) => (
                <article
                  key={member.id}
                  className="group relative grid gap-5 py-10 transition-colors hover:bg-card/40 md:grid-cols-[5.5rem_auto_1fr] md:gap-10 md:py-12"
                  data-testid={`card-leader-${member.id}`}
                >
                  {/* Índice editorial */}
                  <p className="heading-display fire-text text-5xl leading-none md:text-6xl">
                    {String(index + 1).padStart(2, "0")}
                  </p>

                  {/* Retrato */}
                  <Avatar className="h-28 w-28 rounded-md border-2 border-foreground/10 shadow-[0_14px_40px_rgba(0,0,0,0.18)] transition duration-300 group-hover:shadow-[0_18px_50px_rgba(249,115,22,0.22)] md:h-36 md:w-36">
                    {(member as any).user?.avatarUrl && (
                      <AvatarImage src={(member as any).user.avatarUrl} alt={member.name} className="object-cover" />
                    )}
                    <AvatarFallback className="rounded-md bg-primary/10">
                      <span className="accent-serif text-3xl text-primary md:text-4xl">
                        {member.initials || member.name.slice(0, 2).toUpperCase()}
                      </span>
                    </AvatarFallback>
                  </Avatar>

                  {/* Ficha editorial */}
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h3 className="accent-serif text-3xl leading-tight md:text-5xl">{member.name}</h3>
                        <p className="data-label mt-2 text-primary">{member.role}</p>
                      </div>
                      {managementMode && isAdmin && (
                        <div className="flex gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => openEditDialog(member)}
                            data-testid={`button-edit-member-${member.id}`}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => setDeleteConfirmId(member.id)}
                            data-testid={`button-delete-member-${member.id}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                    {member.description && (
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                        {member.description}
                      </p>
                    )}
                    {member.verse && (
                      <blockquote className="accent-serif mt-4 border-l-2 border-primary pl-4 text-sm italic text-muted-foreground md:text-base">
                        “{member.verse}”
                      </blockquote>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══ LLAMADO ═══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#0a0405] py-16 text-white md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,91,0,0.3),transparent_55%)]" aria-hidden />
        <div className="absolute inset-x-0 top-0 h-1.5 fire-gradient" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <Flame className="mx-auto mb-5 h-7 w-7 text-orange-300" />
          <h2 className="heading-display text-4xl md:text-6xl">
            ¿Sientes <span className="accent-serif fire-text lowercase">el llamado?</span>
          </h2>
          <p className="accent-serif mx-auto mt-5 max-w-xl text-lg text-orange-50/80">
            Buscamos obreros apasionados que quieran unirse a esta visión de llevar
            el fuego del evangelio a las naciones.
          </p>
          <Link href="/registro">
            <Button className="fire-btn-primary mt-8 h-12 px-8 text-base" data-testid="button-join-team">
              Ser parte del equipo
            </Button>
          </Link>
        </div>
      </section>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>
              {editingMember ? "Editar miembro" : "Agregar miembro"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4 overflow-y-auto flex-1 pr-2">
            {isAdmin && !editingMember && (
              <div className="space-y-2">
                <Label>Vincular a usuario registrado (opcional)</Label>
                {selectedUser ? (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border">
                    <Avatar className="h-8 w-8">
                      {selectedUser.avatarUrl && <AvatarImage src={selectedUser.avatarUrl} />}
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {(selectedUser.displayName || selectedUser.username).slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{selectedUser.displayName || selectedUser.username}</p>
                      <p className="text-xs text-muted-foreground">@{selectedUser.username}</p>
                    </div>
                    <Button size="sm" variant="ghost" onClick={() => { setSelectedUser(null); setForm({ ...form, userId: null }); }}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        className="pl-9"
                        placeholder="Buscar usuario por nombre..."
                        value={userSearch}
                        onChange={(e) => setUserSearch(e.target.value)}
                      />
                    </div>
                    {filteredUsers.length > 0 && (
                      <div className="border rounded-lg max-h-40 overflow-y-auto">
                        {filteredUsers.slice(0, 8).map((u: any) => (
                          <button
                            key={u.id}
                            type="button"
                            className="w-full flex items-center gap-3 p-2 hover:bg-muted/50 transition-colors text-left"
                            onClick={() => selectUser(u)}
                          >
                            <Avatar className="h-8 w-8">
                              {u.avatarUrl && <AvatarImage src={u.avatarUrl} />}
                              <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                {(u.displayName || u.username).slice(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0">
                              <p className="text-sm font-medium truncate">{u.displayName || u.username}</p>
                              <p className="text-xs text-muted-foreground">@{u.username}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="member-name">Nombre</Label>
              <Input
                id="member-name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Nombre completo"
                data-testid="input-member-name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="member-role">Rol</Label>
              <Input
                id="member-role"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                placeholder="Ej: Director del Ministerio"
                data-testid="input-member-role"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="member-description">Descripción</Label>
              <Textarea
                id="member-description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Breve descripción del miembro"
                data-testid="input-member-description"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="member-verse">Versículo</Label>
              <Input
                id="member-verse"
                value={form.verse}
                onChange={(e) => setForm({ ...form, verse: e.target.value })}
                placeholder="Ej: 1 Timoteo 4:12"
                data-testid="input-member-verse"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="member-initials">Iniciales</Label>
              <Input
                id="member-initials"
                value={form.initials}
                onChange={(e) => setForm({ ...form, initials: e.target.value })}
                placeholder="Ej: LR"
                maxLength={3}
                data-testid="input-member-initials"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)} data-testid="button-cancel-member">
              Cancelar
            </Button>
            <Button onClick={handleSubmit} disabled={isSaving || !form.name.trim() || !form.role.trim()} data-testid="button-save-member">
              {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              {editingMember ? "Guardar cambios" : "Agregar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteConfirmId !== null} onOpenChange={() => setDeleteConfirmId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar eliminación</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground py-4">
            ¿Está seguro de que desea eliminar este miembro del equipo? Esta acción no se puede deshacer.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirmId(null)} data-testid="button-cancel-delete">
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteConfirmId && deleteMutation.mutate(deleteConfirmId)}
              disabled={deleteMutation.isPending}
              data-testid="button-confirm-delete"
            >
              {deleteMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
