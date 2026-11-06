import { useMemo } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import {
  ArrowDown, ArrowRight, BookOpen, Calendar, Check, Church, Clock, Flame, Globe, GraduationCap,
  HandHeart, Headphones, Heart, MapPin, MessageCircle, Radio, Sparkles, UserPlus, Users, Video,
} from "lucide-react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useAuth } from "@/hooks/use-auth";

// Bienvenida para quien llega al ministerio sin conocerlo, sobre todo desde la radio:
// el botón "Ministerio" de la página de la radio trae ?desde=radio y la app de la radio,
// ?source=radio-app. En un minuto explica quiénes somos, qué hay aquí y cuál es el primer paso.

/** ¿Llegó desde la radio? */
function vieneDeLaRadio(): boolean {
  if (typeof window === "undefined") return false;
  const q = new URLSearchParams(window.location.search);
  if (q.get("desde") === "radio" || q.get("source") === "radio-app") return true;
  try {
    // La página pública de la radio (AzuraCast) está en un dominio sslip.io.
    return /(^|\.)sslip\.io$/i.test(new URL(document.referrer).hostname);
  } catch {
    return false;
  }
}

const CIFRAS = [
  { valor: "2017", texto: "Desde" },
  { valor: "3", texto: "Países" },
  { valor: "24/7", texto: "Radio" },
  { valor: "$0", texto: "Todo gratis" },
];

const QUIENES = [
  {
    icon: Flame,
    titulo: "Quiénes somos",
    texto:
      "Un ministerio evangelístico internacional que nació en 2017 en Ciudad Bolívar, Venezuela. Hoy tenemos sede en Austin, Texas, y presencia en Venezuela, Perú y Estados Unidos.",
  },
  {
    icon: Heart,
    titulo: "Lo que nos mueve",
    texto:
      "«Id por todo el mundo y predicad el evangelio a toda criatura» (Marcos 16:15). Queremos que cada persona conozca a Jesucristo y crezca en Él.",
  },
  {
    icon: Globe,
    titulo: "Cómo lo hacemos",
    texto:
      "Evangelismo en calles y comunidades, la radio las 24 horas, cultos en vivo, formación de líderes, obras sociales y misiones.",
  },
];

const ENCUENTRAS = [
  { href: "/biblioteca", icon: BookOpen, titulo: "Biblia en línea", texto: "Lee en RV1960, NTV, LBLA y RV1909 desde cualquier dispositivo.", conCuenta: false },
  { href: "/en-vivo", icon: Video, titulo: "Cultos en vivo", texto: "Adoración y enseñanza transmitidas cada semana.", conCuenta: false },
  { href: "/contacto?asunto=oracion", icon: HandHeart, titulo: "Pedir oración", texto: "Cuéntanos tu necesidad y oramos contigo.", conCuenta: false },
  { href: "/capacitaciones", icon: GraduationCap, titulo: "Clases bíblicas", texto: "Cursos con maestros, aula virtual y certificados.", conCuenta: true },
  { href: "/eventos", icon: Calendar, titulo: "Eventos", texto: "Cultos, vigilias, campañas y encuentros del ministerio.", conCuenta: false },
  { href: "/buscar-iglesia", icon: Church, titulo: "Una iglesia cerca", texto: "Te ayudamos a encontrar una congregación en tu ciudad.", conCuenta: false },
];

const PREGUNTAS = [
  {
    id: "costo",
    pregunta: "¿Tiene algún costo?",
    respuesta:
      "No. La radio, la Biblia, las clases y la comunidad son gratis. Si algún día deseas apoyar el ministerio puedes hacerlo, pero nunca es una condición.",
  },
  {
    id: "iglesia",
    pregunta: "¿Tengo que dejar mi iglesia?",
    respuesta:
      "No. Trabajamos en alianza con iglesias locales y sin proselitismo. Si ya congregas en una iglesia, te animamos a seguir allí; si todavía no tienes una, te ayudamos a encontrar una cerca de ti.",
  },
  {
    id: "cuenta",
    pregunta: "¿Necesito crear una cuenta?",
    respuesta:
      "Para escuchar la radio, leer la Biblia, ver los cultos en vivo o escribirnos, no. La cuenta (gratis) es para inscribirte en clases, seguir planes de lectura, unirte al Club de lectura y participar en la comunidad. Un líder del ministerio la aprueba para cuidar a todos.",
  },
  {
    id: "oracion",
    pregunta: "¿Cómo pido oración?",
    respuesta:
      "Escríbenos desde Contacto eligiendo «Solicitud de oración»: una persona del ministerio la recibe y ora contigo. Si ya tienes tu cuenta aprobada, también puedes publicarla en el muro de oración para que la comunidad ore por ti.",
  },
  {
    id: "donde",
    pregunta: "¿Dónde están?",
    respuesta:
      "Nuestra sede está en Austin, Texas, en la Iglesia Casa del Alfarero. Servimos en Venezuela, Perú y Estados Unidos, y la radio llega a cualquier lugar con internet.",
  },
];

type MiembroEquipo = {
  id: number;
  name: string;
  role: string;
  initials?: string | null;
  avatarUrl?: string | null;
  isActive?: boolean;
  user?: { avatarUrl?: string | null } | null;
};

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true } as const,
};

function Equipo() {
  const { data } = useQuery<MiembroEquipo[]>({ queryKey: ["/api/team-members"] });
  const equipo = (data || []).filter((m) => m.isActive !== false).slice(0, 6);
  if (equipo.length === 0) return null;

  return (
    <section className="py-20 section-aurora" aria-labelledby="equipo-titulo">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="glass-pill inline-flex items-center gap-2 mb-5 text-xs">
            <Users className="w-3.5 h-3.5" /> Personas reales
          </span>
          <h2 id="equipo-titulo" className="heading-display font-display text-4xl md:text-6xl">
            Quiénes te <span className="fire-text">reciben</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Pastores, maestros y servidores que acompañan a cada persona que llega.
          </p>
        </div>
        <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" data-testid="bienvenida-equipo">
          {equipo.map((m) => {
            const foto = m.avatarUrl || m.user?.avatarUrl || undefined;
            const nombre = m.name.trim();
            return (
              <li key={m.id} className="glass-card gradient-ring p-5 flex items-center gap-4">
                <Avatar className="h-14 w-14 shrink-0 border border-primary/25">
                  {foto && <AvatarImage src={foto} alt="" className="object-cover" />}
                  <AvatarFallback className="bg-primary/10 font-display font-bold text-primary">
                    {(m.initials || nombre.slice(0, 2)).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="font-semibold leading-tight truncate">{nombre}</p>
                  <p className="data-label mt-1 text-primary truncate">{m.role}</p>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="text-center mt-8">
          <Link href="/equipo" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
            Conoce a todo el equipo <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Bienvenida() {
  const desdeRadio = useMemo(vieneDeLaRadio, []);
  const { user } = useAuth();

  return (
    <Layout>
      {/* ═══ PORTADA ════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden section-aurora pt-14 pb-20 md:pt-24 md:pb-28">
        <div className="hero-grid-bg absolute inset-0" />
        <div className="glow-orb w-[460px] h-[460px] -top-40 left-1/2 -translate-x-1/2 bg-orange-600/20" />

        <motion.div
          className="relative z-10 max-w-6xl mx-auto px-4 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center text-center lg:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <div className="order-2 lg:order-1">
            <span className="glass-pill inline-flex items-center gap-2 mb-6 text-xs" data-testid="bienvenida-origen">
              {desdeRadio ? (
                <>
                  <span className="equalizer" aria-hidden="true"><span /><span /><span /><span /><span /></span>
                  Vienes de Avivando el Fuego Radio
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" /> Bienvenido
                </>
              )}
            </span>

            <h1 className="heading-display font-display text-5xl md:text-7xl mb-6" data-testid="bienvenida-titulo">
              Bienvenido a la <span className="fire-text">familia</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              {desdeRadio
                ? "La radio que escuchas es la voz del Ministerio Internacional Avivando el Fuego: una familia cristiana que nació en 2017 en Venezuela y hoy sirve en varios países, llevando el evangelio de Jesucristo con poder, compasión y verdad."
                : "Somos el Ministerio Internacional Avivando el Fuego: una familia cristiana que nació en 2017 en Venezuela y hoy sirve en varios países, llevando el evangelio de Jesucristo con poder, compasión y verdad."}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-3">
              <a href="#primer-paso">
                <Button size="lg" className="fire-btn-primary w-full sm:w-auto px-8 h-12 text-base" data-testid="bienvenida-primer-paso" data-magnetic>
                  Dar mi primer paso
                  <ArrowDown className="w-4 h-4 ml-2" />
                </Button>
              </a>
              <Link href="/radio">
                <Button variant="outline" size="lg" className="btn-fire-glow w-full sm:w-auto h-12" data-testid="bienvenida-radio" data-magnetic>
                  <Headphones className="w-4 h-4 mr-2" />
                  {desdeRadio ? "Seguir escuchando" : "Escuchar la radio"}
                </Button>
              </Link>
            </div>

            <dl className="mt-10 grid grid-cols-4 gap-2 max-w-md mx-auto lg:mx-0">
              {CIFRAS.map((c) => (
                <div key={c.texto} className="glass-card px-2 py-3 text-center">
                  <dt className="sr-only">{c.texto}</dt>
                  <dd className="font-display font-bold text-lg md:text-xl fire-text leading-none">{c.valor}</dd>
                  <dd className="data-label mt-1.5 text-[10px] opacity-75">{c.texto}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              <div aria-hidden="true" className="absolute -inset-6 rounded-[2.5rem] bg-orange-500/20 blur-3xl" />
              <img
                src="/icons/simbolo-512.png"
                alt="Símbolo del ministerio: una llama sobre la Biblia abierta"
                width={512}
                height={512}
                className="relative w-36 h-36 md:w-72 md:h-72 rounded-[2rem] md:rounded-[2.75rem] ring-1 ring-primary/30 shadow-[0_24px_80px_rgba(255,90,31,0.35)]"
                data-testid="bienvenida-simbolo"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══ EN UN MINUTO ═══════════════════════════════════════════ */}
      <section className="py-20" aria-labelledby="minuto-titulo">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="glass-pill inline-block mb-5 text-xs">En un minuto</span>
            <h2 id="minuto-titulo" className="heading-display font-display text-4xl md:text-6xl">
              Esto es <span className="fire-text">Avivando el Fuego</span>
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {QUIENES.map((q, i) => (
              <motion.article
                key={q.titulo}
                className="glass-card gradient-ring p-7"
                {...fadeUp}
                transition={{ duration: 0.45, delay: i * 0.08 }}
              >
                <span className="icon-chip-fire w-12 h-12 mb-5">
                  <q.icon className="w-6 h-6 text-primary" />
                </span>
                <h3 className="font-display font-bold uppercase tracking-wide text-lg mb-2">{q.titulo}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{q.texto}</p>
              </motion.article>
            ))}
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-2">
            <p className="glass-card px-5 py-4 flex items-start gap-3 text-sm">
              <MapPin className="w-5 h-5 shrink-0 text-primary mt-0.5" />
              <span>
                <b className="block">Sede principal</b>
                <span className="text-muted-foreground">Iglesia Casa del Alfarero · Austin, Texas</span>
              </span>
            </p>
            <p className="glass-card px-5 py-4 flex items-start gap-3 text-sm">
              <Heart className="w-5 h-5 shrink-0 text-primary mt-0.5" />
              <span>
                <b className="block">Cobertura espiritual</b>
                <span className="text-muted-foreground">Pastores Carlo y Trinibeth Chevez · Misión Perú</span>
              </span>
            </p>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-semibold">
            <Link href="/historia" className="inline-flex items-center gap-1.5 text-primary hover:underline">
              Nuestra historia <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/regiones" className="inline-flex items-center gap-1.5 text-primary hover:underline">
              Dónde estamos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ LO QUE ENCUENTRAS AQUÍ ═════════════════════════════════ */}
      <section className="py-20 section-aurora" aria-labelledby="encuentras-titulo">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="glass-pill inline-block mb-5 text-xs">Para ti</span>
            <h2 id="encuentras-titulo" className="heading-display font-display text-4xl md:text-6xl">
              Lo que encuentras <span className="fire-text">aquí</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Casi todo se puede usar sin crear una cuenta.
            </p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid="bienvenida-encuentras">
            {ENCUENTRAS.map((e) => (
              <li key={e.href}>
                <Link
                  href={e.href}
                  className="group glass-card h-full p-6 flex gap-4 items-start transition hover:-translate-y-0.5 hover:border-primary/40"
                >
                  <span className="icon-chip-fire w-12 h-12 shrink-0">
                    <e.icon className="w-6 h-6 text-primary" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-2">
                      <b className="font-semibold">{e.titulo}</b>
                      <ArrowRight className="w-4 h-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
                    </span>
                    <span className="block text-sm text-muted-foreground mt-1">{e.texto}</span>
                    <span
                      className={`mt-3 inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                        e.conCuenta ? "bg-primary/10 text-primary" : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      }`}
                    >
                      {e.conCuenta ? <UserPlus className="w-3 h-3" /> : <Check className="w-3 h-3" />}
                      {e.conCuenta ? "Con tu cuenta gratis" : "Sin crear cuenta"}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══ TU PRIMER PASO ═════════════════════════════════════════ */}
      <section id="primer-paso" className="py-20 scroll-mt-20" aria-labelledby="paso-titulo">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="glass-pill inline-block mb-5 text-xs">Empieza hoy</span>
            <h2 id="paso-titulo" className="heading-display font-display text-4xl md:text-6xl">
              Tu primer <span className="fire-text">paso</span>
            </h2>
          </div>

          <ol className="grid gap-5 md:grid-cols-3" data-testid="bienvenida-pasos">
            <li className="glass-card gradient-ring p-7 flex flex-col">
              <span className="accent-serif fire-text text-5xl leading-none">01</span>
              <h3 className="font-display font-bold uppercase tracking-wide text-lg mt-4 mb-2">Sigue escuchando</h3>
              <p className="text-sm text-muted-foreground flex-1">
                La radio está al aire las 24 horas con adoración, alabanza y prédicas. Gratis y sin cuenta.
              </p>
              <Link href="/radio" className="mt-6">
                <Button variant="outline" className="btn-fire-glow w-full">
                  <Radio className="w-4 h-4 mr-2" /> Escuchar la radio
                </Button>
              </Link>
            </li>

            <li className="glass-card gradient-ring p-7 flex flex-col">
              <span className="accent-serif fire-text text-5xl leading-none">02</span>
              {user ? (
                <>
                  <h3 className="font-display font-bold uppercase tracking-wide text-lg mt-4 mb-2">Ya tienes tu cuenta</h3>
                  <p className="text-sm text-muted-foreground flex-1">
                    {user.isActive
                      ? "Tus clases, tu lectura de la Biblia y lo que viene en el ministerio te esperan en Hoy."
                      : "Tu cuenta ya está creada. Un líder del ministerio la aprobará pronto para que participes en la comunidad."}
                  </p>
                  <Link href="/" className="mt-6">
                    <Button className="fire-btn-primary w-full" data-testid="bienvenida-ir-hoy">
                      <Clock className="w-4 h-4 mr-2" /> Ir a Hoy
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <h3 className="font-display font-bold uppercase tracking-wide text-lg mt-4 mb-2">Crea tu cuenta gratis</h3>
                  <p className="text-sm text-muted-foreground flex-1">
                    Con tu cuenta te inscribes en clases, sigues planes de lectura y participas en la comunidad. Un líder
                    del ministerio la aprueba para cuidar a todos.
                  </p>
                  <Link href="/registro" className="mt-6">
                    <Button className="fire-btn-primary w-full" data-testid="bienvenida-registro">
                      <UserPlus className="w-4 h-4 mr-2" /> Crear mi cuenta
                    </Button>
                  </Link>
                </>
              )}
            </li>

            <li className="glass-card gradient-ring p-7 flex flex-col">
              <span className="accent-serif fire-text text-5xl leading-none">03</span>
              <h3 className="font-display font-bold uppercase tracking-wide text-lg mt-4 mb-2">Escríbenos</h3>
              <p className="text-sm text-muted-foreground flex-1">
                ¿Necesitas oración, consejo o quieres visitar una iglesia? Una persona del ministerio te responderá.
              </p>
              <Link href="/contacto" className="mt-6">
                <Button variant="outline" className="btn-fire-glow w-full">
                  <MessageCircle className="w-4 h-4 mr-2" /> Escribirnos
                </Button>
              </Link>
            </li>
          </ol>
        </div>
      </section>

      <Equipo />

      {/* ═══ PREGUNTAS FRECUENTES ═══════════════════════════════════ */}
      <section className="py-20" aria-labelledby="preguntas-titulo">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="glass-pill inline-block mb-5 text-xs">Preguntas frecuentes</span>
            <h2 id="preguntas-titulo" className="heading-display font-display text-4xl md:text-5xl">
              Lo que muchos <span className="fire-text">preguntan</span>
            </h2>
          </div>
          <Accordion type="single" collapsible className="glass-card px-5 md:px-7" data-testid="bienvenida-preguntas">
            {PREGUNTAS.map((p) => (
              <AccordionItem key={p.id} value={p.id} className="last:border-b-0">
                <AccordionTrigger className="text-left text-base font-semibold">{p.pregunta}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">{p.respuesta}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ═══ CIERRE ═════════════════════════════════════════════════ */}
      <section className="py-24 section-aurora relative overflow-hidden">
        <div className="glow-orb w-[420px] h-[420px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-600/15" />
        <div className="max-w-3xl mx-auto px-4 text-center relative">
          <motion.div className="holo-card gradient-ring neon-border-fire p-8 md:p-14" {...fadeUp} transition={{ duration: 0.5 }}>
            <h2 className="heading-display font-display text-4xl md:text-6xl mb-5">
              Aquí hay un <span className="fire-text">lugar para ti</span>
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto md:text-lg">
              La radio te acompaña cada día. En el ministerio puedes aprender la Palabra, orar con otros y dar el
              siguiente paso en tu fe.
            </p>
            <blockquote className="accent-serif text-lg md:text-xl text-foreground/90 max-w-xl mx-auto">
              "Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar."
            </blockquote>
            <p className="data-label mt-2 mb-8">Mateo 11:28</p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              {user ? (
                <Link href="/">
                  <Button size="lg" className="fire-btn-primary w-full sm:w-auto px-10 h-12 text-base" data-testid="bienvenida-cierre-hoy">
                    <Clock className="w-4 h-4 mr-2" /> Ir a Hoy
                  </Button>
                </Link>
              ) : (
                <Link href="/registro">
                  <Button size="lg" className="fire-btn-primary w-full sm:w-auto px-10 h-12 text-base" data-testid="bienvenida-cierre-registro">
                    <UserPlus className="w-4 h-4 mr-2" /> Crear mi cuenta gratis
                  </Button>
                </Link>
              )}
              <Link href="/radio">
                <Button size="lg" variant="outline" className="btn-fire-glow w-full sm:w-auto h-12">
                  <Headphones className="w-4 h-4 mr-2" /> Volver a la radio
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
