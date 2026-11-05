import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Church, Handshake, Shield, BookOpen, Users, CheckCircle, Globe, Heart } from "lucide-react";
import { MINISTRY_COUNTRIES } from "@shared/schema";

import { withAccents } from "@shared/labels";
export default function AlianzaPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const submitMutation = useMutation({
    mutationFn: async (data: Record<string, string>) => {
      const res = await fetch("/api/alliance-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Error al enviar solicitud");
      return res.json();
    },
    onSuccess: () => {
      setSubmitted(true);
      toast({ title: "Solicitud enviada", description: "Nos pondremos en contacto pronto." });
    },
    onError: () => {
      toast({ title: "Error", description: "No se pudo enviar la solicitud.", variant: "destructive" });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => { data[key] = value as string; });
    submitMutation.mutate(data);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-linear-to-b from-background to-background/80">
        {/* Hero */}
        <section className="relative py-20 px-4 text-center overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-orange-500/10 via-transparent to-orange-500/10" />
          <div className="relative max-w-4xl mx-auto">
            <Handshake className="w-16 h-16 text-orange-500 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Alianza para la Gran Comisión
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Únase a la red de Avivando el Fuego y acceda a herramientas digitales de alto impacto
              para la capacitación, el discipulado y la evangelización, manteniendo la plena autonomía
              de su iglesia local.
            </p>
          </div>
        </section>

        {/* Benefits */}
        <section className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-white text-center mb-10">
            Beneficios de la Alianza
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: BookOpen, title: "Cursos Core", desc: "Acceso a Evangelismo 1, 2 y 3 con co-certificación (doble logo)" },
              { icon: Shield, title: "Autonomía Total", desc: "Control completo sobre su doctrina, miembros y decisiones internas" },
              { icon: Users, title: "Panel de Iglesia", desc: "Dashboard exclusivo para gestionar su congregación en la plataforma" },
              { icon: Globe, title: "Cursos Propios", desc: "Cree y administre cursos exclusivos para los miembros de su iglesia" },
            ].map((b, i) => (
              <Card key={i} className="bg-card/50 border-orange-500/20 hover:border-orange-500/40 transition-colors">
                <CardHeader className="text-center">
                  <b.icon className="w-10 h-10 text-orange-500 mx-auto mb-2" />
                  <CardTitle className="text-white text-lg">{b.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-sm text-center">{b.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Principles */}
        <section className="max-w-4xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Principios Fundamentales
          </h2>
          <div className="space-y-4">
            {[
              { title: "Propiedad de Datos", desc: "Cada iglesia aliada mantiene el control exclusivo sobre los datos de sus miembros." },
              { title: "No Interferencia Doctrinal", desc: "El Ministerio no interfiere en la doctrina interna de las iglesias aliadas." },
              { title: "Control sobre Contenido Local", desc: "Total autonomía para crear, gestionar y eliminar sus propios cursos." },
              { title: "Canalización Ética", desc: "La conexión de miembros con iglesias siempre requiere consentimiento explícito." },
              { title: "Resolución de Conflictos", desc: "El Director actúa como mediador, buscando siempre la unidad y el respeto." },
            ].map((p, i) => (
              <div key={i} className="flex items-start gap-3 bg-card/30 p-4 rounded-lg border border-white/5">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <div>
                  <h3 className="text-white font-semibold">{p.title}</h3>
                  <p className="text-gray-400 text-sm">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Form */}
        <section className="max-w-2xl mx-auto px-4 py-12" id="solicitud">
          {submitted ? (
            <Card className="bg-card/50 border-green-500/30 text-center py-12">
              <CardContent>
                <Heart className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">¡Solicitud Recibida!</h2>
                <p className="text-gray-400">
                  Gracias por su interés en unirse a la red de Avivando el Fuego.
                  Un miembro del equipo se pondrá en contacto con usted pronto.
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-card/50 border-orange-500/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Church className="w-8 h-8 text-orange-500" />
                  <div>
                    <CardTitle className="text-white">Solicitud de Alianza</CardTitle>
                    <CardDescription>Complete el formulario para iniciar el proceso</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="churchName">Nombre de la Iglesia *</Label>
                      <Input id="churchName" name="churchName" required placeholder="Ej: Iglesia Roca Eterna" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pastorName">Nombre del Pastor *</Label>
                      <Input id="pastorName" name="pastorName" required placeholder="Nombre completo" />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="pastorEmail">Correo Electrónico *</Label>
                      <Input id="pastorEmail" name="pastorEmail" type="email" required placeholder="pastor@iglesia.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pastorPhone">Teléfono</Label>
                      <Input id="pastorPhone" name="pastorPhone" placeholder="+1 234 567 8900" />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">Ciudad</Label>
                      <Input id="city" name="city" placeholder="Ciudad" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">País</Label>
                      <Select name="country">
                        <SelectTrigger><SelectValue placeholder="Seleccionar país" /></SelectTrigger>
                        <SelectContent>
                          {MINISTRY_COUNTRIES.map(c => (
                            <SelectItem key={c} value={c}>{withAccents(c)}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="denomination">Denominación</Label>
                      <Input id="denomination" name="denomination" placeholder="Ej: Pentecostal, Bautista..." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="congregationSize">Tamaño de Congregación</Label>
                      <Select name="congregationSize">
                        <SelectTrigger><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-50">1 - 50 miembros</SelectItem>
                          <SelectItem value="51-100">51 - 100 miembros</SelectItem>
                          <SelectItem value="101-300">101 - 300 miembros</SelectItem>
                          <SelectItem value="301-500">301 - 500 miembros</SelectItem>
                          <SelectItem value="500+">Más de 500 miembros</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Sitio Web o Red Social</Label>
                    <Input id="website" name="website" placeholder="https://www.iglesia.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="motivation">¿Por qué desea unirse a la alianza?</Label>
                    <Textarea id="motivation" name="motivation" rows={4} placeholder="Cuéntenos sobre su visión y cómo podemos colaborar..." />
                  </div>
                  <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white" disabled={submitMutation.isPending}>
                    {submitMutation.isPending ? "Enviando..." : "Enviar Solicitud de Alianza"}
                  </Button>
                  <p className="text-xs text-gray-500 text-center">
                    Al enviar esta solicitud acepta que la información proporcionada será revisada por el equipo directivo del ministerio.
                  </p>
                </form>
              </CardContent>
            </Card>
          )}
        </section>
      </div>
    </Layout>
  );
}
