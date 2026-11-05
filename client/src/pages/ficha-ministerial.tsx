import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { BookOpen, Award, Shield, CheckCircle, Clock, User, GraduationCap } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BADGE_TYPES } from "@shared/schema";

export default function FichaMinisterialPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const userId = window.location.pathname.split("/").pop();
  const targetUserId = userId && !isNaN(Number(userId)) ? Number(userId) : user?.id;

  const { data: profile, isLoading } = useQuery({
    queryKey: ["/api/teacher-profiles", targetUserId],
    queryFn: async () => {
      const res = await fetch(`/api/teacher-profiles/${targetUserId}`);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Error");
      return res.json();
    },
    enabled: !!targetUserId,
  });

  const { data: allProfiles } = useQuery({
    queryKey: ["/api/teacher-profiles"],
    queryFn: async () => {
      const res = await fetch("/api/teacher-profiles");
      if (!res.ok) throw new Error("Error");
      return res.json();
    },
  });

  const { data: badges } = useQuery({
    queryKey: ["/api/badges", targetUserId],
    queryFn: async () => {
      const res = await fetch(`/api/badges/${targetUserId}`);
      if (!res.ok) return [];
      return res.json();
    },
    enabled: !!targetUserId && !!user,
  });

  const isOwn = targetUserId === user?.id;
  const isAdminUser = user?.role === "admin" || user?.role === "director" || user?.role === "staff_global";

  const createMutation = useMutation({
    mutationFn: async (data: Record<string, string>) => {
      const res = await fetch("/api/teacher-profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Error");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/teacher-profiles"] });
      toast({ title: "Ficha creada", description: "Su ficha ministerial ha sido enviada para revisión." });
    },
  });

  const approveMutation = useMutation({
    mutationFn: async (userId: number) => {
      const res = await fetch(`/api/teacher-profiles/${userId}/approve`, { method: "POST" });
      if (!res.ok) throw new Error("Error");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/teacher-profiles"] });
      toast({ title: "Aprobada", description: "La ficha ministerial ha sido aprobada." });
    },
  });

  const [formData, setFormData] = useState({
    theologicalEducation: "",
    ministryExperience: "",
    specializations: "",
    doctrinalStatement: "",
    teachingMaterials: "",
  });

  if (isLoading) {
    return <Layout><div className="flex items-center justify-center min-h-screen text-gray-400">Cargando...</div></Layout>;
  }

  return (
    <Layout>
      <div className="min-h-screen bg-linear-to-b from-background to-background/80">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap className="w-8 h-8 text-orange-500" />
            <h1 className="text-3xl font-bold text-white">Fichas Ministeriales</h1>
          </div>

          {/* Si el usuario no tiene ficha y es maestro/admin, mostrar formulario */}
          {!profile && isOwn && (user?.role === "obrero" || user?.role === "maestro_ministerio" || user?.role === "maestro_iglesia" || isAdminUser) && (
            <Card className="bg-card/50 border-orange-500/20 mb-8">
              <CardHeader>
                <CardTitle className="text-white">Crear Mi Ficha Ministerial</CardTitle>
                <CardDescription>Complete su perfil como maestro para ser visible en la plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  createMutation.mutate(formData);
                }} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Formación Teológica</Label>
                    <Textarea value={formData.theologicalEducation} onChange={e => setFormData(d => ({ ...d, theologicalEducation: e.target.value }))}
                      placeholder="Estudios teológicos, seminarios, institutos bíblicos..." rows={3} />
                  </div>
                  <div className="space-y-2">
                    <Label>Experiencia Ministerial</Label>
                    <Textarea value={formData.ministryExperience} onChange={e => setFormData(d => ({ ...d, ministryExperience: e.target.value }))}
                      placeholder="Años de servicio, iglesias, ministerios en los que ha participado..." rows={3} />
                  </div>
                  <div className="space-y-2">
                    <Label>Áreas de Especialización</Label>
                    <Textarea value={formData.specializations} onChange={e => setFormData(d => ({ ...d, specializations: e.target.value }))}
                      placeholder="Evangelismo, consejería, liderazgo, misiones..." rows={2} />
                  </div>
                  <div className="space-y-2">
                    <Label>Declaración Doctrinal</Label>
                    <Textarea value={formData.doctrinalStatement} onChange={e => setFormData(d => ({ ...d, doctrinalStatement: e.target.value }))}
                      placeholder="Resumen de sus posiciones doctrinales en puntos clave..." rows={4} />
                  </div>
                  <div className="space-y-2">
                    <Label>Materiales de Enseñanza</Label>
                    <Textarea value={formData.teachingMaterials} onChange={e => setFormData(d => ({ ...d, teachingMaterials: e.target.value }))}
                      placeholder="Descripción de los recursos que utiliza para enseñar..." rows={2} />
                  </div>
                  <Button type="submit" className="bg-orange-500 hover:bg-orange-600" disabled={createMutation.isPending}>
                    {createMutation.isPending ? "Enviando..." : "Enviar Ficha para Revisión"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Detalle de la ficha si existe */}
          {profile && (
            <Card className="bg-card/50 border-orange-500/20 mb-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={profile.user?.avatarUrl} />
                      <AvatarFallback><User className="w-8 h-8" /></AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-white">{profile.user?.displayName || profile.user?.username}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        {profile.isApproved ? (
                          <Badge className="bg-green-500/20 text-green-400"><CheckCircle className="w-3 h-3 mr-1" /> Aprobada</Badge>
                        ) : (
                          <Badge className="bg-yellow-500/20 text-yellow-400"><Clock className="w-3 h-3 mr-1" /> Pendiente</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  {isAdminUser && !profile.isApproved && (
                    <Button onClick={() => approveMutation.mutate(profile.userId)} className="bg-green-600 hover:bg-green-700">
                      Aprobar Ficha
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {profile.theologicalEducation && (
                  <div>
                    <h3 className="text-orange-400 font-semibold flex items-center gap-2 mb-2"><BookOpen className="w-4 h-4" /> Formación Teológica</h3>
                    <p className="text-gray-300 whitespace-pre-wrap">{profile.theologicalEducation}</p>
                  </div>
                )}
                {profile.ministryExperience && (
                  <div>
                    <h3 className="text-orange-400 font-semibold flex items-center gap-2 mb-2"><Award className="w-4 h-4" /> Experiencia Ministerial</h3>
                    <p className="text-gray-300 whitespace-pre-wrap">{profile.ministryExperience}</p>
                  </div>
                )}
                {profile.specializations && (
                  <div>
                    <h3 className="text-orange-400 font-semibold flex items-center gap-2 mb-2"><Shield className="w-4 h-4" /> Especializaciones</h3>
                    <p className="text-gray-300 whitespace-pre-wrap">{profile.specializations}</p>
                  </div>
                )}
                {profile.doctrinalStatement && (
                  <div>
                    <h3 className="text-orange-400 font-semibold flex items-center gap-2 mb-2">Declaración Doctrinal</h3>
                    <p className="text-gray-300 whitespace-pre-wrap">{profile.doctrinalStatement}</p>
                  </div>
                )}
                {profile.teachingMaterials && (
                  <div>
                    <h3 className="text-orange-400 font-semibold flex items-center gap-2 mb-2">Materiales de Enseñanza</h3>
                    <p className="text-gray-300 whitespace-pre-wrap">{profile.teachingMaterials}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Badges del usuario */}
          {badges && badges.length > 0 && (
            <Card className="bg-card/50 border-white/10 mb-8">
              <CardHeader>
                <CardTitle className="text-white">Logros Ministeriales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {badges.map((b: any) => (
                    <Badge key={b.id} className="bg-orange-500/20 text-orange-300 px-3 py-1.5">
                      <Award className="w-3 h-3 mr-1" />
                      {(BADGE_TYPES as any)[b.badgeType] || b.badgeType}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Directorio de Maestros */}
          <h2 className="text-2xl font-bold text-white mb-4">Directorio de Maestros</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allProfiles?.filter((p: any) => p.isApproved).map((p: any) => (
              <Card key={p.id} className="bg-card/50 border-white/10 hover:border-orange-500/30 transition-colors cursor-pointer"
                onClick={() => window.location.href = `/ficha-ministerial/${p.userId}`}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={p.user?.avatarUrl} />
                      <AvatarFallback><User className="w-5 h-5" /></AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-white font-semibold">{p.user?.displayName || p.user?.username}</h3>
                      {p.specializations && (
                        <p className="text-gray-400 text-sm line-clamp-1">{p.specializations}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {(!allProfiles || allProfiles.filter((p: any) => p.isApproved).length === 0) && (
              <p className="text-gray-500 col-span-full text-center py-8">No hay fichas ministeriales aprobadas aún.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
