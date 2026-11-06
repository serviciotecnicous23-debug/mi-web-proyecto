import { useState } from "react";
import { RichText } from "@/components/media/RichText";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import { Users, Plus, MapPin, Clock, MessageCircle, Calendar, UserPlus, LogOut, Send } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const DAYS: Record<number, string> = { 0: "Domingo", 1: "Lunes", 2: "Martes", 3: "Miércoles", 4: "Jueves", 5: "Viernes", 6: "Sábado" };

export default function GruposPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedGroup, setSelectedGroup] = useState<any>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [msgText, setMsgText] = useState("");

  const isTeacherOrAdmin = user?.role === "admin" || user?.role === "obrero";

  const { data: groups = [] } = useQuery<any[]>({ queryKey: ["/api/small-groups"] });
  const { data: myGroupIds = [] } = useQuery<number[]>({
    queryKey: ["/api/small-groups", "mine"],
    queryFn: async () => {
      if (!user) return [];
      // Derive from groups + membership
      const memberPromises = groups.map((g: any) =>
        fetch(`/api/small-groups/${g.id}/members`, { credentials: "include" }).then(r => r.json())
      );
      const allMembers = await Promise.all(memberPromises);
      return groups.filter((_: any, i: number) => allMembers[i].some((m: any) => m.userId === user.id)).map((g: any) => g.id);
    },
    enabled: !!user && groups.length > 0,
  });

  const { data: members = [] } = useQuery<any[]>({
    queryKey: ["/api/small-groups", selectedGroup?.id, "members"],
    queryFn: () => fetch(`/api/small-groups/${selectedGroup.id}/members`, { credentials: "include" }).then(r => r.json()),
    enabled: !!selectedGroup,
  });

  const { data: meetings = [] } = useQuery<any[]>({
    queryKey: ["/api/small-groups", selectedGroup?.id, "meetings"],
    queryFn: () => fetch(`/api/small-groups/${selectedGroup.id}/meetings`, { credentials: "include" }).then(r => r.json()),
    enabled: !!selectedGroup,
  });

  const { data: groupMessages = [] } = useQuery<any[]>({
    queryKey: ["/api/small-groups", selectedGroup?.id, "messages"],
    queryFn: () => fetch(`/api/small-groups/${selectedGroup.id}/messages`, { credentials: "include" }).then(r => r.json()),
    enabled: !!selectedGroup && !!user,
    refetchInterval: 5000,
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch("/api/small-groups", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify(data) });
      if (!res.ok) throw new Error("Error");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/small-groups"] });
      toast({ title: "Grupo creado" });
      setCreateOpen(false);
    },
  });

  const joinMutation = useMutation({
    mutationFn: async (groupId: number) => {
      const res = await fetch(`/api/small-groups/${groupId}/join`, { method: "POST", credentials: "include" });
      if (!res.ok) throw new Error("Error");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/small-groups"] });
      toast({ title: "Te uniste al grupo" });
    },
  });

  const leaveMutation = useMutation({
    mutationFn: async (groupId: number) => {
      await fetch(`/api/small-groups/${groupId}/leave`, { method: "DELETE", credentials: "include" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/small-groups"] });
      toast({ title: "Saliste del grupo" });
    },
  });

  const sendMsgMutation = useMutation({
    mutationFn: async ({ groupId, content }: { groupId: number; content: string }) => {
      const res = await fetch(`/api/small-groups/${groupId}/messages`, { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ groupId, content }) });
      if (!res.ok) throw new Error("Error");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/small-groups", selectedGroup?.id, "messages"] });
      setMsgText("");
    },
  });

  const createMeetingMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch(`/api/small-groups/${data.groupId}/meetings`, { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify(data) });
      if (!res.ok) throw new Error("Error");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/small-groups", selectedGroup?.id, "meetings"] });
      toast({ title: "Reunión programada" });
    },
  });

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    createMutation.mutate({
      name: fd.get("name"),
      description: fd.get("description") || undefined,
      leaderId: user!.id,
      meetingDay: fd.get("meetingDay") ? parseInt(fd.get("meetingDay") as string) : undefined,
      meetingTime: fd.get("meetingTime") || undefined,
      meetingLocation: fd.get("meetingLocation") || undefined,
      meetingUrl: fd.get("meetingUrl") || undefined,
      maxMembers: fd.get("maxMembers") ? parseInt(fd.get("maxMembers") as string) : undefined,
    });
  };

  const isMember = (groupId: number) => myGroupIds.includes(groupId);

  return (
    <Layout>
      <div className="container mx-auto p-4 md:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-orange-600 flex items-center gap-2"><Users className="h-8 w-8" /> Grupos Pequeños</h1>
            <p className="text-muted-foreground">Comunidades de discipulado y crecimiento</p>
          </div>
          {isTeacherOrAdmin && (
            <Dialog open={createOpen} onOpenChange={setCreateOpen}>
              <DialogTrigger asChild><Button className="gap-2"><Plus className="h-4 w-4" /> Crear Grupo</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Crear Grupo Pequeño</DialogTitle></DialogHeader>
                <form onSubmit={handleCreate} className="space-y-3">
                  <div><Label>Nombre del grupo *</Label><Input name="name" required /></div>
                  <div><Label>Descripción</Label><Textarea name="description" rows={2} /></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><Label>Día de reunión</Label>
                      <select name="meetingDay" className="w-full border rounded-md p-2 text-sm">
                        <option value="">Seleccionar...</option>
                        {Object.entries(DAYS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                      </select>
                    </div>
                    <div><Label>Hora</Label><Input name="meetingTime" type="time" /></div>
                  </div>
                  <div><Label>Lugar de reunión</Label><Input name="meetingLocation" /></div>
                  <div><Label>Enlace virtual (Zoom, Meet, etc.)</Label><Input name="meetingUrl" type="url" /></div>
                  <div><Label>Máximo de miembros</Label><Input name="maxMembers" type="number" /></div>
                  <Button type="submit" disabled={createMutation.isPending} className="w-full">Crear Grupo</Button>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {selectedGroup ? (
          <div className="space-y-4">
            <Button variant="ghost" onClick={() => setSelectedGroup(null)}>← Volver a grupos</Button>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{selectedGroup.name}</span>
                  <Badge>{selectedGroup.memberCount} miembros</Badge>
                </CardTitle>
                {selectedGroup.description && <p className="text-muted-foreground">{selectedGroup.description}</p>}
                <div className="flex gap-4 text-sm text-muted-foreground">
                  {selectedGroup.meetingDay != null && <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {DAYS[selectedGroup.meetingDay]}</span>}
                  {selectedGroup.meetingTime && <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {selectedGroup.meetingTime}</span>}
                  {selectedGroup.meetingLocation && <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {selectedGroup.meetingLocation}</span>}
                </div>
              </CardHeader>
            </Card>

            <Tabs defaultValue="chat">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="chat">Chat</TabsTrigger>
                <TabsTrigger value="members">Miembros</TabsTrigger>
                <TabsTrigger value="meetings">Reuniones</TabsTrigger>
              </TabsList>

              <TabsContent value="chat">
                <Card>
                  <CardContent className="p-4">
                    <ScrollArea className="h-[400px] pr-4">
                      <div className="space-y-3">
                        {groupMessages.map((m: any) => (
                          <div key={m.id} className={`flex gap-2 ${m.userId === user?.id ? "flex-row-reverse" : ""}`}>
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={m.user.avatarUrl || undefined} />
                              <AvatarFallback>{(m.user.displayName || m.user.username)?.[0]?.toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className={`chat-bubble max-w-[70%] p-3 rounded-lg ${m.userId === user?.id ? "bg-orange-100 dark:bg-orange-900/20" : "bg-muted"}`}>
                              <p className="text-xs font-semibold mb-1">{m.user.displayName || m.user.username}</p>
                              <RichText text={m.content} className="text-sm" compact maxEmbeds={1} />
                              <span className="text-[10px] text-muted-foreground">{m.createdAt ? format(new Date(m.createdAt), "HH:mm", { locale: es }) : ""}</span>
                            </div>
                          </div>
                        ))}
                        {groupMessages.length === 0 && <p className="text-center text-muted-foreground py-8">No hay mensajes aún. ¡Inicia la conversación!</p>}
                      </div>
                    </ScrollArea>
                    {user && isMember(selectedGroup.id) && (
                      <div className="flex gap-2 mt-4 border-t pt-4">
                        <Input value={msgText} onChange={e => setMsgText(e.target.value)} placeholder="Escribe un mensaje..." onKeyDown={e => { if (e.key === "Enter" && msgText.trim()) sendMsgMutation.mutate({ groupId: selectedGroup.id, content: msgText }); }} />
                        <Button onClick={() => { if (msgText.trim()) sendMsgMutation.mutate({ groupId: selectedGroup.id, content: msgText }); }}><Send className="h-4 w-4" /></Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="members">
                <Card>
                  <CardContent className="p-4 space-y-3">
                    {members.map((m: any) => (
                      <div key={m.id} className="flex items-center gap-3">
                        <Avatar><AvatarImage src={m.user.avatarUrl || undefined} /><AvatarFallback>{(m.user.displayName || m.user.username)?.[0]?.toUpperCase()}</AvatarFallback></Avatar>
                        <div>
                          <p className="font-medium">{m.user.displayName || m.user.username}</p>
                          <Badge variant={m.role === "lider" ? "default" : "secondary"} className="text-xs">{m.role === "lider" ? "Líder" : "Miembro"}</Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="meetings">
                <Card>
                  <CardContent className="p-4 space-y-3">
                    {isTeacherOrAdmin && (
                      <form className="flex gap-2 mb-4" onSubmit={(e) => {
                        e.preventDefault();
                        const fd = new FormData(e.currentTarget);
                        createMeetingMutation.mutate({ groupId: selectedGroup.id, title: fd.get("mtitle"), meetingDate: fd.get("mdate") });
                        e.currentTarget.reset();
                      }}>
                        <Input name="mtitle" placeholder="Título de reunión" required />
                        <Input name="mdate" type="datetime-local" required />
                        <Button type="submit">Programar</Button>
                      </form>
                    )}
                    {meetings.map((m: any) => (
                      <div key={m.id} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                        <Calendar className="h-5 w-5 text-orange-500" />
                        <div>
                          <p className="font-medium">{m.title}</p>
                          <p className="text-sm text-muted-foreground">{m.meetingDate ? format(new Date(m.meetingDate), "EEEE dd MMMM yyyy, HH:mm", { locale: es }) : ""}</p>
                        </div>
                      </div>
                    ))}
                    {meetings.length === 0 && <p className="text-center text-muted-foreground py-4">No hay reuniones programadas</p>}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {groups.map((g: any) => (
              <Card key={g.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg">{g.name}</h3>
                    <Badge>{g.memberCount} miembros</Badge>
                  </div>
                  {g.description && <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{g.description}</p>}
                  <div className="flex flex-col gap-1 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" /> Líder: {g.leader?.displayName || g.leader?.username}</span>
                    {g.meetingDay != null && <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {DAYS[g.meetingDay]} {g.meetingTime || ""}</span>}
                    {g.meetingLocation && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {g.meetingLocation}</span>}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => setSelectedGroup(g)} className="gap-1"><MessageCircle className="h-3 w-3" /> Ver</Button>
                    {user && !isMember(g.id) && (
                      <Button size="sm" onClick={() => joinMutation.mutate(g.id)} className="gap-1"><UserPlus className="h-3 w-3" /> Unirme</Button>
                    )}
                    {user && isMember(g.id) && g.leaderId !== user.id && (
                      <Button size="sm" variant="destructive" onClick={() => leaveMutation.mutate(g.id)} className="gap-1"><LogOut className="h-3 w-3" /> Salir</Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
            {groups.length === 0 && (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                No hay grupos creados aún.
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
