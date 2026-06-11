import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Flame, Radio, BookOpen, Heart, Globe, Users, Video, Signal,
  Church, Shield, Award, LogIn, UserPlus, Headphones, ArrowRight,
  ChevronDown, Sparkles, Smartphone,
} from "lucide-react";
import { PublicDonationSection } from "@/pages/finanzas";
import { FlameLogoSVG } from "@/components/FlameLogoSVG";
import { RadioInstallActions } from "@/components/RadioInstallActions";
import AnimatedSection from "@/components/AnimatedSection";
import FireParticles from "@/components/FireParticles";

const stats = [
  { label: "Anos de Servicio", value: "7+" },
  { label: "Paises Alcanzados", value: "3" },
  { label: "Iglesias Aliadas", value: "10+" },
  { label: "Vidas Impactadas", value: "1000+" },
];

const marqueeItems = [
  "Avivando el Fuego",
  "Radio 24/7",
  "Evangelismo",
  "Formacion de Lideres",
  "Misiones Internacionales",
  "Obras Sociales",
  "Alianza Global",
  "Desde 2017",
];

const areas = [
  {
    icon: Flame,
    title: "Evangelismo Callejero",
    desc: "Alcanzando vidas en plazas, parques y hogares con el mensaje de salvacion. El corazon del ministerio desde el primer dia.",
    featured: true,
  },
  { icon: Radio, title: "Medios Digitales", desc: "Radio, podcasts, YouTube y redes llevando el evangelio a todo lugar." },
  { icon: Heart, title: "Obras Sociales", desc: "Ayuda humanitaria, jornadas comunitarias y apoyo a los necesitados." },
  { icon: BookOpen, title: "Formacion de Lideres", desc: "Escuela de ministerio, discipulado y capacitacion de obreros fieles." },
  { icon: Users, title: "Retiros y Encuentros", desc: "Vigilias, campamentos, congresos y tiempos de avivamiento." },
  { icon: Globe, title: "Misiones", desc: "Expansion del ministerio a nuevas naciones y culturas." },
];

const alianza = [
  { icon: Church, title: "Iglesias Aliadas", desc: "Cada congregacion mantiene su autonomia pastoral mientras accede a recursos compartidos." },
  { icon: Award, title: "Formacion Ministerial", desc: "Cursos nucleares del ministerio mas formacion propia. Certificacion conjunta." },
  { icon: Shield, title: "Canalizacion Etica", desc: "Miembros conectados con iglesias locales. Sin proselitismo, con transparencia." },
];

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true } as const,
};

export default function Home() {
  return (
    <Layout>
      {/* ═══ HERO ═══════════════════════════════════════════════════ */}
      <AnimatedSection>
        <section className="relative overflow-hidden min-h-[94vh] flex flex-col justify-center section-aurora">
          <FireParticles />
          <div className="hero-grid-bg absolute inset-0" />
          <div className="glow-orb w-[480px] h-[480px] -top-40 left-1/2 -translate-x-1/2 bg-orange-600/20" />
          <div className="glow-orb w-[320px] h-[320px] bottom-0 -left-24 bg-red-700/15" />
          <span aria-hidden="true" className="hero-watermark">FUEGO</span>

          <motion.div
            className="relative z-10 max-w-6xl mx-auto px-4 grid gap-12 lg:grid-cols-[1.25fr_0.85fr] items-center text-center lg:text-left"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div>
              <div className="flame-logo-wrap mx-auto lg:mx-0 mb-6 w-20 h-20 md:w-28 md:h-28">
                <FlameLogoSVG className="w-full h-full" animate />
              </div>

              <span className="glass-pill inline-flex items-center gap-2 mb-6 text-xs">
                <Sparkles className="w-3.5 h-3.5" />
                Ministerio Internacional &bull; Desde 2017
              </span>

              <h1 className="heading-display font-display text-6xl md:text-8xl mb-6" data-testid="text-title">
                <span className="block text-ghost">MINISTERIO</span>
                <span className="block fire-text drop-shadow-[0_0_45px_rgba(255,90,31,0.40)]">AVIVANDO</span>
                <span className="block text-foreground/95">EL FUEGO</span>
              </h1>

              <blockquote className="accent-serif text-base md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                "Para que vuestra fe no este fundada en la sabiduria de los hombres,
                sino en el poder de Dios"
              </blockquote>
              <p className="text-sm text-primary/90 font-semibold tracking-[0.25em] uppercase mt-3 mb-10 font-mono">
                1 Corintios 2:4
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <Link href="/radio">
                  <Button size="lg" className="fire-btn-primary px-8 h-12 text-base" data-testid="button-hero-radio" data-magnetic>
                    <Radio className="w-5 h-5 mr-2" />
                    Escuchar Radio
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" size="lg" className="btn-fire-glow h-12" data-testid="button-hero-login" data-magnetic>
                    <LogIn className="w-4 h-4 mr-2" />
                    Iniciar Sesion
                  </Button>
                </Link>
                <Link href="/registro">
                  <Button variant="outline" size="lg" className="btn-fire-glow h-12" data-testid="button-hero-register" data-magnetic>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Registrarse
                  </Button>
                </Link>
              </div>
            </div>

            <aside className="glass-card gradient-ring p-7 text-left" data-testid="panel-agenda">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-display font-bold uppercase tracking-[0.12em] text-sm">Proximas actividades</h2>
                <span className="data-label flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                  </span>
                  En agenda
                </span>
              </div>
              <div className="space-y-1">
                {[
                  { d: "VIE", t: "Vigilia de avivamiento", s: "10:00 PM · Sede principal" },
                  { d: "SAB", t: "Congreso Alianza Global", s: "Iglesias aliadas" },
                  { d: "24/7", t: "Adoracion y predicas en vivo", s: "Avivando el Fuego Radio" },
                ].map((ev) => (
                  <Link key={ev.t} href="/eventos">
                    <div className="grid grid-cols-[auto_1fr] gap-4 items-center py-3 border-t border-border/60 cursor-pointer hover:bg-primary/5 hover:pl-2 transition-all rounded-sm">
                      <span className="icon-chip-fire w-12 h-10 font-display font-bold text-xs fire-text">{ev.d}</span>
                      <span>
                        <b className="block text-sm font-semibold">{ev.t}</b>
                        <small className="data-label opacity-70">{ev.s}</small>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
              <Link href="/calendario">
                <Button className="fire-btn-primary w-full mt-5" data-testid="button-agenda-calendario" data-magnetic>
                  Ver calendario completo
                </Button>
              </Link>
            </aside>
          </motion.div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 scroll-cue text-muted-foreground">
            <ChevronDown className="w-6 h-6" />
          </div>
        </section>
      </AnimatedSection>

      {/* ═══ MARQUEE ════════════════════════════════════════════════ */}
      <div className="marquee-strip" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center gap-12 pr-12">
              {marqueeItems.map((item) => (
                <span key={item + copy} className="flex items-center gap-3 font-display uppercase tracking-[0.3em] text-sm text-muted-foreground whitespace-nowrap">
                  <Flame className="w-4 h-4 text-primary shrink-0" />
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ═══ STATS ══════════════════════════════════════════════════ */}
      <section className="py-20 section-aurora">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-5">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="gradient-ring glass-card card-3d text-center py-10 px-4"
              data-testid={`stat-${s.value}`}
              {...fadeUp}
              transition={{ duration: 0.45, delay: i * 0.1 }}
            >
              <p className="font-display text-5xl md:text-6xl font-bold fire-text stat-glow">{s.value}</p>
              <p className="text-[0.68rem] text-muted-foreground mt-3 tracking-[0.22em] uppercase">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="section-divider max-w-5xl mx-auto" />

      {/* ═══ AREAS (BENTO) ══════════════════════════════════════════ */}
      <section className="py-24 section-aurora">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="glass-pill inline-block mb-5 text-xs">Nuestro Trabajo</span>
            <h2 className="heading-display font-display text-5xl md:text-7xl">
              Areas de <span className="fire-text">Accion</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto md:text-lg">
              Multiples frentes, un solo objetivo: llevar el fuego del evangelio a toda criatura.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:auto-rows-fr">
            {areas.map((a, i) =>
              a.featured ? (
                <motion.div
                  key={a.title}
                  className="holo-card gradient-ring p-8 md:p-10 md:col-span-2 md:row-span-2 flex flex-col justify-end min-h-[320px]"
                  data-testid={`card-area-${a.title}`}
                  {...fadeUp}
                  transition={{ duration: 0.5 }}
                >
                  <span className="icon-chip-fire w-16 h-16 mb-6">
                    <a.icon className="w-8 h-8 text-primary" />
                  </span>
                  <h3 className="heading-display font-display text-3xl md:text-4xl mb-3">{a.title}</h3>
                  <p className="text-muted-foreground md:text-lg max-w-lg">{a.desc}</p>
                  <Link href="/eventos">
                    <Button variant="outline" className="btn-fire-glow mt-6 w-fit" data-magnetic>
                      Ver proximas jornadas <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  key={a.title}
                  className="glass-card card-3d p-6"
                  data-testid={`card-area-${a.title}`}
                  {...fadeUp}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <span className="icon-chip-fire w-11 h-11 mb-4">
                    <a.icon className="w-5 h-5 text-primary" />
                  </span>
                  <h3 className="font-display text-sm font-semibold tracking-wider uppercase mb-2">{a.title}</h3>
                  <p className="text-sm text-muted-foreground">{a.desc}</p>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ═══ RADIO ══════════════════════════════════════════════════ */}
      <section className="py-24 section-aurora">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div className="holo-card gradient-ring neon-border-fire overflow-hidden" {...fadeUp} transition={{ duration: 0.5 }}>
            <div className="grid gap-10 p-8 md:grid-cols-[1.1fr_0.9fr] md:p-12">
              <div className="flex flex-col justify-center">
                <span className="glass-pill inline-flex items-center gap-2 w-fit mb-6 text-xs">
                  <span className="equalizer"><span /><span /><span /><span /><span /></span>
                  Radio Oficial &bull; En el aire
                </span>
                <h2 className="heading-display font-display text-5xl md:text-6xl mb-4">
                  Avivando el Fuego <span className="fire-text">Radio</span>
                </h2>
                <p className="max-w-2xl text-muted-foreground md:text-lg">
                  Adoracion, alabanza, predicas y contenido ministerial nuevo,
                  transmitiendo 24/7 desde nuestro propio servidor AzuraCast.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href="/radio">
                    <Button size="lg" className="fire-btn-primary w-full sm:w-auto px-8" data-testid="button-home-radio" data-magnetic>
                      <Headphones className="h-5 w-5 mr-2" />
                      Abrir Radio
                    </Button>
                  </Link>
                  <Link href="/radio-live-scene">
                    <Button size="lg" variant="outline" className="btn-fire-glow w-full sm:w-auto" data-testid="button-home-radio-scene" data-magnetic>
                      <Video className="h-4 w-4 mr-2" />
                      Escena en Vivo
                    </Button>
                  </Link>
                </div>
                <div className="mt-5">
                  <RadioInstallActions url="https://ministerioavivandoelfuego.com/radio" compact />
                </div>
              </div>

              <div className="glass-card p-6 flex flex-col gap-4 self-center">
                <div className="flex items-center justify-between gap-3 pb-4 border-b border-border/60">
                  <div className="flex items-center gap-2">
                    <Signal className="h-5 w-5 text-primary" />
                    <span className="font-semibold">24/7 online</span>
                    <span className="relative flex h-2.5 w-2.5 ml-1">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                    </span>
                  </div>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">AzuraCast</span>
                </div>
                {[
                  ["Nueva adoracion", "Ministracion y busqueda de la presencia de Dios."],
                  ["Predicas nuevas", "Mensajes y ensenanzas en la rotacion."],
                  ["App instalable", "Acceso directo desde tu telefono."],
                ].map(([title, text]) => (
                  <div key={title} className="flex gap-3">
                    <Smartphone className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <h3 className="font-bold text-sm">{title}</h3>
                      <p className="mt-0.5 text-sm text-muted-foreground">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ EN VIVO ════════════════════════════════════════════════ */}
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div className="glass-card gradient-ring p-8 md:p-10" {...fadeUp} transition={{ duration: 0.5 }}>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex items-center gap-5">
                <span className="icon-chip-fire w-14 h-14 relative">
                  <Video className="h-7 w-7 text-primary" />
                  <span className="absolute -top-1 -right-1 h-3.5 w-3.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.9)]" />
                </span>
                <div>
                  <h3 className="heading-display font-display text-2xl md:text-3xl">Transmisiones en Vivo</h3>
                  <p className="text-sm text-muted-foreground mt-1">Radio &bull; YouTube &bull; Facebook &bull; Podcast</p>
                </div>
              </div>
              <div className="flex-1" />
              <Link href="/en-vivo">
                <Button size="lg" className="fire-btn-primary px-8" data-magnetic>
                  <Signal className="h-4 w-4 mr-2" /> Ver En Vivo
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ ALIANZA ════════════════════════════════════════════════ */}
      <section className="py-24 section-aurora">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="glass-pill inline-block mb-5 text-xs">Alianza para la Gran Comision</span>
            <h2 className="heading-display font-display text-5xl md:text-7xl">
              Una Red de <span className="fire-text">Iglesias Unidas</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto md:text-lg">
              No somos cobertura, somos companeros de yugo. Iglesias autonomas unidas
              por el mismo fuego, compartiendo recursos, formacion y proposito.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            {alianza.map((item, i) => (
              <motion.div
                key={item.title}
                className="glass-card card-3d p-8 text-center"
                {...fadeUp}
                transition={{ duration: 0.45, delay: i * 0.1 }}
              >
                <span className="icon-chip-fire w-14 h-14 mx-auto mb-5">
                  <item.icon className="w-7 h-7 text-primary" />
                </span>
                <h3 className="font-display text-sm font-semibold tracking-widest uppercase mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/alianza">
              <Button size="lg" className="fire-btn-primary px-8" data-magnetic>
                <Church className="w-4 h-4 mr-2" /> Eres Pastor? Unete a la Alianza
              </Button>
            </Link>
            <Link href="/buscar-iglesia">
              <Button size="lg" variant="outline" className="btn-fire-glow" data-magnetic>
                Buscar una Iglesia Cercana
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <div className="section-divider max-w-5xl mx-auto" />

      {/* ═══ DONACIONES ═════════════════════════════════════════════ */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="glass-pill inline-block mb-5 text-xs">Apoyo</span>
            <h2 className="heading-display font-display text-5xl md:text-6xl">
              Apoya el <span className="fire-text">Ministerio</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Tu generosidad hace posible que el fuego del evangelio siga llegando a mas personas.
            </p>
          </div>
          <PublicDonationSection />
        </div>
      </section>

      {/* ═══ CTA FINAL ══════════════════════════════════════════════ */}
      <section className="py-28 section-aurora relative overflow-hidden">
        <div className="glow-orb w-[420px] h-[420px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-600/15" />
        <div className="max-w-3xl mx-auto px-4 text-center relative">
          <motion.div className="holo-card gradient-ring neon-border-fire p-12 md:p-16" {...fadeUp} transition={{ duration: 0.5 }}>
            <h2 className="heading-display font-display text-5xl md:text-7xl mb-6">
              Sientes el <span className="fire-text">Llamado?</span>
            </h2>
            <p className="text-muted-foreground mb-10 max-w-lg mx-auto md:text-lg">
              Unete como miembro, maestro o iglesia aliada. Juntos llevamos el fuego
              del evangelio a las naciones.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/registro">
                <Button size="lg" className="fire-btn-primary px-10 h-12 text-base" data-testid="button-cta-join" data-magnetic>
                  Ser Parte del Equipo
                </Button>
              </Link>
              <Link href="/ficha-ministerial">
                <Button size="lg" variant="outline" className="btn-fire-glow h-12" data-magnetic>
                  <BookOpen className="w-4 h-4 mr-2" />
                  Directorio de Maestros
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
