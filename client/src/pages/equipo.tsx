import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { TeamMember } from "@shared/schema";
import { Layout } from "@/components/layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Link } from "wouter";
import { Settings, Pencil, Trash2, Plus, Loader2, Save, Users, Search, UserCheck } from "lucide-react";
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

  // Fetch registered users for admin selection
  const { data: registeredUsers = [] } = useQuery<any[]>({
    queryKey: ["/api/admin/users"],
    enabled: isAdmin && dialogOpen,
  });

  // Filter users by search and exclude already-in-team users
  const existingUserIds = new Set((teamMembers || []).map((m: any) => m.userId).filter(Boolean));
  const filteredUsers = registeredUsers.filter((u: any) => {
    if (editingMember?.userId === u.id) return true; // allow re-selecting current user
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
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm text-primary font-medium mb-2">Nuestro Equipo</p>
            <h1 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-team-title">
              Lideres con Vision y Pasion
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Un equipo unido por el mismo llamado: encender el fuego del avivamiento en cada rincon del mundo.
            </p>
          </div>

          {isAdmin && (
            <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
              <Button
                variant={managementMode ? "default" : "outline"}
                onClick={() => setManagementMode(!managementMode)}
                data-testid="button-toggle-management"
              >
                <Settings className="mr-2 h-4 w-4" />
                Gestionar Equipo
              </Button>
              {managementMode && (
                <Button onClick={openAddDialog} data-testid="button-add-member">
                  <Plus className="mr-2 h-4 w-4" />
                  Agregar Miembro
                </Button>
              )}
            </div>
          )}

          {isLoading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" data-testid="loading-spinner" />
            </div>
          ) : !teamMembers || teamMembers.length === 0 ? (
            <Card className="p-12 text-center" data-testid="empty-state">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No hay miembros del equipo</h3>
              <p className="text-muted-foreground">
                {isAdmin
                  ? "Activa el modo de gestion para agregar miembros al equipo."
                  : "El equipo se esta conformando. Vuelve pronto."}
              </p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teamMembers.map((member) => (
                <Card key={member.id} className="p-6" data-testid={`card-leader-${member.id}`}>
                  <div className="flex items-start gap-4">
                    <Avatar className="h-14 w-14">
                      {(member as any).user?.avatarUrl && (
                        <AvatarImage src={(member as any).user.avatarUrl} alt={member.name} />
                      )}
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">
                        {member.initials || member.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-lg">{member.name}</h3>
                          <p className="text-sm text-primary font-medium">{member.role}</p>
                        </div>
                        {managementMode && isAdmin && (
                          <div className="flex gap-1" style={{ visibility: "visible" }}>
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
                        <p className="text-sm text-muted-foreground mt-2">{member.description}</p>
                      )}
                      {member.verse && (
                        <p className="text-xs text-muted-foreground mt-2 italic">"{member.verse}"</p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          <Card className="mt-12 p-8 text-center">
            <h2 className="text-xl font-bold mb-2">Sientes el llamado?</h2>
            <p className="text-muted-foreground mb-6">
              Estamos buscando obreros apasionados que quieran unirse a esta vision de llevar el fuego del evangelio a las naciones.
            </p>
            <Link href="/registro">
              <Button data-testid="button-join-team">Ser Parte del Equipo</Button>
            </Link>
          </Card>
        </div>
      </section>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>
              {editingMember ? "Editar Miembro" : "Agregar Miembro"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4 overflow-y-auto flex-1 pr-2">
            {/* User selection for linking to registered users */}
            {isAdmin && !editingMember && (
              <div className="space-y-2">
                <Label>Vincular a Usuario Registrado (opcional)</Label>
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
                placeholder="Breve descripcion del miembro"
                data-testid="input-member-description"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="member-verse">Versiculo</Label>
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
              {editingMember ? "Guardar Cambios" : "Agregar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteConfirmId !== null} onOpenChange={() => setDeleteConfirmId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Eliminacion</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground py-4">
            Esta seguro de que desea eliminar este miembro del equipo? Esta accion no se puede deshacer.
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
