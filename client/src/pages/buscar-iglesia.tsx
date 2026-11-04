import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Church, MapPin, Globe, Users, Search, Heart, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function BuscarIglesiaPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [selectedChurch, setSelectedChurch] = useState<any>(null);
  const [notes, setNotes] = useState("");

  const { data: churches, isLoading } = useQuery({
    queryKey: ["/api/churches/active"],
    queryFn: async () => {
      const res = await fetch("/api/churches/active");
      if (!res.ok) return [];
      return res.json();
    },
  });

  const requestMutation = useMutation({
    mutationFn: async (data: { targetChurchId: number; notes?: string }) => {
      const res = await fetch("/api/member-channeling", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Error");
      return res.json();
    },
    onSuccess: () => {
      setSelectedChurch(null);
      setNotes("");
      toast({ title: "Solicitud enviada", description: "El pastor de la iglesia revisará tu solicitud." });
    },
    onError: () => {
      toast({ title: "Error", description: "No se pudo enviar la solicitud.", variant: "destructive" });
    },
  });

  const filtered = churches?.filter((c: any) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.city?.toLowerCase().includes(search.toLowerCase()) ||
    c.country?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="min-h-screen bg-linear-to-b from-background to-background/80">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-10">
            <Church className="w-14 h-14 text-orange-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white mb-2">Buscar Iglesia Aliada</h1>
            <p className="text-gray-400 max-w-lg mx-auto">
              Encuentra una iglesia de la red de Avivando el Fuego cerca de ti y solicita unirte.
              Tu solicitud será revisada por el pastor local.
            </p>
          </div>

          {/* Search */}
          <div className="relative max-w-md mx-auto mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <Input
              className="pl-10"
              placeholder="Buscar por nombre, ciudad o país..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          {/* Church Grid */}
          {isLoading ? (
            <div className="text-center text-gray-400 py-12">Cargando iglesias...</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered?.map((church: any) => (
                <Card key={church.id} className="bg-card/50 border-white/10 hover:border-orange-500/30 transition-all group">
                  {church.imageUrl && (
                    <div className="h-40 overflow-hidden rounded-t-lg">
                      <img src={church.imageUrl} alt={church.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-white text-lg">{church.name}</CardTitle>
                        {church.pastor && (
                          <CardDescription className="text-gray-400">Pastor: {church.pastor}</CardDescription>
                        )}
                      </div>
                      {church.logoUrl && (
                        <img src={church.logoUrl} alt="Logo" className="w-10 h-10 rounded object-cover" />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {(church.city || church.country) && (
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <MapPin className="w-4 h-4 shrink-0" />
                        {[church.city, church.country].filter(Boolean).join(", ")}
                      </div>
                    )}
                    {church.description && (
                      <p className="text-sm text-gray-400 line-clamp-2">{church.description}</p>
                    )}
                    <div className="flex gap-2 flex-wrap">
                      {church.website && (
                        <a href={church.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-orange-400 hover:text-orange-300">
                          <Globe className="w-3 h-3" /> Web
                        </a>
                      )}
                      {church.facebook && (
                        <a href={church.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300">
                          <ExternalLink className="w-3 h-3" /> Facebook
                        </a>
                      )}
                    </div>
                    {user && !user.churchId && (
                      <Button className="w-full bg-orange-500 hover:bg-orange-600 mt-2" onClick={() => setSelectedChurch(church)}>
                        <Heart className="w-4 h-4 mr-2" /> Solicitar Unirme
                      </Button>
                    )}
                    {user?.churchId === church.id && (
                      <Badge className="bg-green-500/20 text-green-400 w-full justify-center py-1">
                        <Users className="w-3 h-3 mr-1" /> Ya eres miembro
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
              {(!filtered || filtered.length === 0) && (
                <div className="col-span-full text-center py-12 text-gray-500">
                  No se encontraron iglesias. Intenta con otra búsqueda.
                </div>
              )}
            </div>
          )}

          {/* Request Dialog */}
          <Dialog open={!!selectedChurch} onOpenChange={() => setSelectedChurch(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Solicitar Unirme a {selectedChurch?.name}</DialogTitle>
                <DialogDescription>
                  Tu solicitud será revisada por el pastor de la iglesia. Al enviar, das tu consentimiento para ser vinculado a esta congregación.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Mensaje (opcional)</Label>
                  <Textarea
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="Cuéntale al pastor por qué te gustaría unirte..."
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedChurch(null)}>Cancelar</Button>
                <Button
                  className="bg-orange-500 hover:bg-orange-600"
                  onClick={() => requestMutation.mutate({ targetChurchId: selectedChurch.id, notes: notes || undefined })}
                  disabled={requestMutation.isPending}
                >
                  {requestMutation.isPending ? "Enviando..." : "Enviar Solicitud"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Layout>
  );
}
