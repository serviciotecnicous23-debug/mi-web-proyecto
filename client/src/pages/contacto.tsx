import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Globe, Heart, Loader2, Send } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  email: z.string().email("Email inválido"),
  subject: z.string().min(1, "Selecciona un asunto"),
  content: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

type ContactForm = z.infer<typeof contactSchema>;

const infoCards = [
  { icon: MapPin, label: "Sede principal", lines: ["Austin, Texas, USA", "Iglesia Casa del Alfarero"] },
  { icon: Globe, label: "Presencia internacional", lines: ["Venezuela · Perú · USA", "Expansión continua"] },
  { icon: Heart, label: "Cobertura espiritual", lines: ["Pastores Carlo y Trinibeth Chevez", "Misión Perú"] },
];

export default function Contacto() {
  const { toast } = useToast();

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", content: "" },
  });

  const sendMutation = useMutation({
    mutationFn: async (data: ContactForm) => {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Error al enviar mensaje");
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Mensaje enviado", description: "Nos pondremos en contacto contigo pronto." });
      form.reset();
    },
    onError: () => {
      toast({ title: "Error", description: "No se pudo enviar el mensaje. Intenta de nuevo.", variant: "destructive" });
    },
  });

  function onSubmit(data: ContactForm) {
    sendMutation.mutate(data);
  }

  return (
    <Layout>
      <section className="relative overflow-hidden py-20 md:py-28 section-aurora min-h-screen">
        <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-start">
          {/* ── Columna editorial ──────────────────────────────────── */}
          <div className="lg:sticky lg:top-28">
            <span className="glass-pill inline-block mb-6 text-xs">Contacto</span>
            <h1 className="heading-display font-display text-6xl md:text-8xl" data-testid="text-contact-title">
              Hable<span className="fire-text">mos</span>
              <span className="accent-serif">.</span>
            </h1>
            <p className="accent-serif text-lg md:text-xl text-muted-foreground max-w-md mt-5 mb-10">
              Queremos escucharte. Ya sea que desees unirte al ministerio,
              solicitar oración o invitarnos a tu ciudad.
            </p>

            <div className="space-y-4">
              {infoCards.map((c) => (
                <div key={c.label} className="hud-frame rounded-md p-5 flex items-start gap-4">
                  <span className="icon-chip-fire w-11 h-11 shrink-0">
                    <c.icon className="w-5 h-5 text-primary" />
                  </span>
                  <div>
                    <p className="data-label mb-1">{c.label}</p>
                    {c.lines.map((l) => (
                      <p key={l} className="text-sm text-muted-foreground">{l}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Formulario glass ───────────────────────────────────── */}
          <div className="glass-card gradient-ring p-7 md:p-10">
            <p className="data-label mb-2">Canal directo</p>
            <h2 className="font-display font-bold uppercase tracking-wide text-2xl mb-7">
              Envíanos un mensaje
            </h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="data-label">Nombre</FormLabel>
                        <FormControl>
                          <Input placeholder="Tu nombre" {...field} data-testid="input-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="data-label">Email</FormLabel>
                        <FormControl>
                          <Input placeholder="tu@email.com" {...field} data-testid="input-email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="data-label">Asunto</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-subject">
                            <SelectValue placeholder="Selecciona un asunto" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="unirse">Quiero unirme al ministerio</SelectItem>
                          <SelectItem value="oracion">Solicitud de oración</SelectItem>
                          <SelectItem value="invitar">Invitar a mi ciudad/iglesia</SelectItem>
                          <SelectItem value="otro">Otro</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="data-label">Mensaje</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Escribe tu mensaje aquí..."
                          className="resize-none min-h-[140px]"
                          {...field}
                          data-testid="textarea-message"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full fire-btn-primary h-12 text-base"
                  disabled={sendMutation.isPending}
                  data-testid="button-send-message"
                  data-magnetic
                >
                  {sendMutation.isPending ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4 mr-2" />
                  )}
                  Enviar mensaje
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
