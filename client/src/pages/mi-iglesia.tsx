import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Church, Users, BookOpen, BarChart3, Shield, UserPlus, Settings, User, CheckCircle, XCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CHURCH_PERMISSION_ROLES, ROLES } from "@shared/schema";
import { useLocation } from "wouter";

export default function MiIglesiaPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [, navigate] = useLocation();

  const churchId = user?.churchId;
  const isAdminUser = user?.role === "admin" || user?.role === "director" || user?.role === "staff_global";
  const isChurchAdminUser = user?.role === "admin_iglesia" || isAdminUser;

  const { data: churches } = useQuery({
    queryKey: ["/api/ministry-churches"],
    queryFn: async () => {
      const res = await fetch("/api/ministry-churches");
      if (!res.ok) return [];
      return res.json();
    },
  });

  // For admin users, show a picker or the first church
  const effectiveChurchId = churchId || (isAdminUser && churches?.[0]?.id);

  const { data: dashboard } = useQuery({
    queryKey: ["/api/churches", effectiveChurchId, "dashboard"],
    queryFn: async () => {
      const res = await fetch(`/api/churches/${effectiveChurchId}/dashboard`);
      if (!res.ok) return null;
      return res.json();
    },
    enabled: !!effectiveChurchId,
  });

  const { data: members } = useQuery({
    queryKey: ["/api/churches", effectiveChurchId, "members"],
    queryFn: async () => {
      const res = await fetch(`/api/churches/${effectiveChurchId}/members`);
      if (!res.ok) return [];
      return res.json();
    },
    enabled: !!effectiveChurchId,
  });

  const { data: permissions } = useQuery({
    queryKey: ["/api/churches", effectiveChurchId, "permissions"],
    queryFn: async () => {
      const res = await fetch(`/api/churches/${effectiveChurchId}/permissions`);
      if (!res.ok) return [];
      return res.json();
    },
    enabled: !!effectiveChurchId,
  });

  const { data: channelings } = useQuery({
    queryKey: ["/api/member-channeling", effectiveChurchId],
    queryFn: async () => {
      const res = await fetch(`/api/member-channeling?churchId=${effectiveChurchId}`);
      if (!res.ok) return [];
      return res.json();
    },
    enabled: !!effectiveChurchId && isChurchAdminUser,
  });

  const resolveChannelingMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const res = await fetch(`/api/member-channeling/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Error");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/member-channeling", effectiveChurchId] });
      queryClient.invalidateQueries({ queryKey: ["/api/churches", effectiveChurchId, "members"] });
      queryClient.invalidateQueries({ queryKey: ["/api/churches", effectiveChurchId, "dashboard"] });
      toast({ title: "Actualizado", description: "La solicitud ha sido procesada." });
    },
  });

  if (!user) {
    return <Layout><div className="flex items-center justify-center min-h-screen text-gray-400">Inicie sesión para acceder</div></Layout>;
  }

  if (!effectiveChurchId && !isAdminUser) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
          <Church className="w-16 h-16 text-gray-600 mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Sin Iglesia Aliada</h2>
          <p className="text-gray-400 mb-6 max-w-md">
            No estás vinculado a ninguna iglesia aliada. Puedes buscar una iglesia para unirte o continuar como miembro independiente.
          </p>
          <Button onClick={() => navigate("/buscar-iglesia")} className="bg-orange-500 hover:bg-orange-600">
            Buscar Iglesia
          </Button>
        </div>
      </Layout>
    );
  }

  const currentChurch = churches?.find((c: any) => c.id === effectiveChurchId);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            {currentChurch?.logoUrl ? (
              <img src={currentChurch.logoUrl} alt="Logo" className="w-16 h-16 rounded-lg object-cover" />
            ) : (
              <Church className="w-12 h-12 text-orange-500" />
            )}
            <div>
              <h1 className="text-3xl font-bold text-white">{currentChurch?.name || "Mi Iglesia"}</h1>
              <p className="text-gray-400">{currentChurch?.city}, {currentChurch?.country}</p>
            </div>
            {currentChurch?.allianceStatus && (
              <Badge className="ml-auto bg-green-500/20 text-green-400">{currentChurch.allianceStatus}</Badge>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { icon: Users, label: "Miembros", value: dashboard?.memberCount || 0, color: "text-blue-400" },
              { icon: BookOpen, label: "Cursos", value: dashboard?.courseCount || 0, color: "text-green-400" },
              { icon: BarChart3, label: "Eventos", value: dashboard?.eventCount || 0, color: "text-purple-400" },
              { icon: UserPlus, label: "Solicitudes", value: channelings?.filter((c: any) => c.status === "solicitado").length || 0, color: "text-orange-400" },
            ].map((s, i) => (
              <Card key={i} className="bg-card/50 border-white/10">
                <CardContent className="pt-6 text-center">
                  <s.icon className={`w-8 h-8 ${s.color} mx-auto mb-2`} />
                  <div className="text-2xl font-bold text-white">{s.value}</div>
                  <div className="text-sm text-gray-400">{s.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tabs */}
          <Tabs defaultValue="members" className="w-full">
            <TabsList className="bg-card/50 border border-white/10 mb-4">
              <TabsTrigger value="members">Miembros</TabsTrigger>
              <TabsTrigger value="channeling">Solicitudes</TabsTrigger>
              <TabsTrigger value="permissions">Permisos</TabsTrigger>
            </TabsList>

            <TabsContent value="members">
              <Card className="bg-card/50 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Miembros de la Iglesia</CardTitle>
                  <CardDescription>{members?.length || 0} miembros vinculados</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {members?.map((m: any) => (
                      <div key={m.id} className="flex items-center justify-between p-3 rounded-lg bg-card/30 border border-white/5">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={m.avatarUrl} />
                            <AvatarFallback><User className="w-5 h-5" /></AvatarFallback>
                          </Avatar>
                          <div>
                            <span className="text-white font-medium">{m.displayName || m.username}</span>
                            <div className="text-sm text-gray-400">{(ROLES as any)[m.role] || m.role}</div>
                          </div>
                        </div>
                        <Badge className="bg-white/10 text-gray-300">{m.memberType || "miembro"}</Badge>
                      </div>
                    ))}
                    {(!members || members.length === 0) && (
                      <p className="text-gray-500 text-center py-4">No hay miembros vinculados aún.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="channeling">
              <Card className="bg-card/50 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Solicitudes de Vinculación</CardTitle>
                  <CardDescription>Miembros que desean unirse a esta iglesia</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {channelings?.filter((c: any) => c.status === "solicitado").map((c: any) => (
                      <div key={c.id} className="flex items-center justify-between p-3 rounded-lg bg-card/30 border border-white/5">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback><User className="w-5 h-5" /></AvatarFallback>
                          </Avatar>
                          <div>
                            <span className="text-white font-medium">{c.user?.displayName || c.user?.username}</span>
                            {c.notes && <p className="text-sm text-gray-400">{c.notes}</p>}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => resolveChannelingMutation.mutate({ id: c.id, status: "aprobado" })}>
                            <CheckCircle className="w-4 h-4 mr-1" /> Aprobar
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => resolveChannelingMutation.mutate({ id: c.id, status: "rechazado" })}>
                            <XCircle className="w-4 h-4 mr-1" /> Rechazar
                          </Button>
                        </div>
                      </div>
                    ))}
                    {(!channelings || channelings.filter((c: any) => c.status === "solicitado").length === 0) && (
                      <p className="text-gray-500 text-center py-4">No hay solicitudes pendientes.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="permissions">
              <Card className="bg-card/50 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Permisos y Roles</CardTitle>
                  <CardDescription>Administre quién tiene acceso a qué dentro de la iglesia</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {permissions?.map((p: any) => (
                      <div key={p.id} className="flex items-center justify-between p-3 rounded-lg bg-card/30 border border-white/5">
                        <div className="flex items-center gap-3">
                          <Shield className="w-5 h-5 text-orange-400" />
                          <span className="text-white">{p.user?.displayName || p.user?.username}</span>
                        </div>
                        <Badge className="bg-orange-500/20 text-orange-300">
                          {(CHURCH_PERMISSION_ROLES as any)[p.role] || p.role}
                        </Badge>
                      </div>
                    ))}
                    {(!permissions || permissions.length === 0) && (
                      <p className="text-gray-500 text-center py-4">No hay permisos configurados.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
