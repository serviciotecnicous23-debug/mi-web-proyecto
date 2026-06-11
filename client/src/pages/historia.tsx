import { Layout } from "@/components/layout";
import { motion } from "framer-motion";
import { Target, Eye, Flame } from "lucide-react";
import { LogoIcon } from "@/components/LogoIcon";

const timeline = [
  { year: "2017", title: "El llamado", desc: "Nacimiento del ministerio en Ciudad Bolívar, Venezuela. Un grupo de jóvenes apasionados por Dios recibe el mandato de llevar el fuego del evangelio a las naciones." },
  { year: "2018", title: "Expansión nacional", desc: "Primeras campañas evangelísticas masivas. Formación de equipos de alcance y evangelismo. Cientos de vidas alcanzadas en Venezuela." },
  { year: "2020", title: "Nuevos horizontes", desc: "Expansión a Perú bajo la cobertura de Misión Perú. Adaptación a medios digitales durante la pandemia. Radio y transmisiones en vivo." },
  { year: "2022", title: "Traslado a USA", desc: "Nueva sede en Austin, Texas. Consolidación del ministerio internacional. Formación de líderes y estructura organizativa." },
  { year: "2024", title: "Plataforma digital", desc: "Lanzamiento de la plataforma ministerial global. Conexión de obreros de todas las naciones. Escuela de ministerio en línea." },
];

const missionPoints = [
  "Evangelismo integral y alcance en comunidades",
  "Medios digitales y radio 24/7",
  "Campañas y cruzadas",
  "Obras sociales y ayuda humanitaria",
  "Capacitación de obreros",
];

const fadeUp = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true } as const,
};

export default function Historia() {
  return (
    <Layout>
      {/* ═══ PORTADA ════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-24 md:py-32 section-aurora">
        <span
          aria-hidden="true"
          className="hero-watermark"
          style={{ position: "absolute", bottom: "-4%", fontSize: "clamp(6rem,20vw,18rem)" }}
        >
          2017
        </span>
        <div className="relative max-w-5xl mx-auto px-4">
          <span className="glass-pill inline-block mb-6 text-xs">Nuestra historia</span>
          <h1 className="heading-display font-display text-5xl md:text-8xl" data-testid="text-history-title">
            Un legado <span className="text-ghost">de fe</span>
            <br />
            <span className="fire-text">y fuego</span>
          </h1>
          <p className="accent-serif text-lg md:text-2xl text-muted-foreground max-w-2xl mt-6">
            Desde un pequeño grupo de oración en Venezuela hasta una red internacional
            de obreros apasionados por el avivamiento.
          </p>
        </div>
      </section>

      {/* ═══ CRONOLOGIA EDITORIAL ═══════════════════════════════════ */}
      <section className="pb-24 relative">
        <div className="max-w-5xl mx-auto px-4">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute left-[38px] md:left-1/2 top-0 bottom-0 w-px"
              style={{ background: "linear-gradient(180deg, transparent, hsl(17 100% 56% / .5) 8%, hsl(349 100% 59% / .5) 92%, transparent)" }}
            />
            <div className="space-y-14">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  className={`relative grid md:grid-cols-2 gap-6 md:gap-14 items-center ${i % 2 ? "md:text-left" : "md:text-right"}`}
                  data-testid={`timeline-${item.year}`}
                  {...fadeUp}
                  transition={{ duration: 0.5 }}
                >
                  <div className={`${i % 2 ? "md:order-2" : "md:order-1"} pl-20 md:pl-0`}>
                    <p className="accent-serif fire-text text-6xl md:text-8xl leading-none">{item.year}</p>
                  </div>
                  <div className={`${i % 2 ? "md:order-1 md:text-right" : "md:order-2 md:text-left"} pl-20 md:pl-0`}>
                    <div className="glass-card gradient-ring p-6 inline-block text-left">
                      <p className="data-label mb-2">Capítulo {String(i + 1).padStart(2, "0")}</p>
                      <h3 className="font-display font-bold uppercase tracking-wide text-lg mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground max-w-md">{item.desc}</p>
                    </div>
                  </div>
                  <span
                    aria-hidden="true"
                    className="absolute left-[30px] md:left-1/2 md:-translate-x-1/2 top-2 w-4 h-4 rounded-full"
                    style={{ background: "radial-gradient(circle at 35% 30%, #FFD66B, #FF5A1F 60%, #FF2D55)", boxShadow: "0 0 18px hsl(17 100% 56% / .8)" }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MISION / VISION — papel editorial ══════════════════════ */}
      <section className="paper-section py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="data-label" style={{ color: "#A4500F" }}>Lo que nos mueve</p>
          <h2 className="heading-display font-display text-4xl md:text-6xl mt-4 mb-14">
            Misión <span className="accent-serif">y visión.</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-0 border-t-2 border-b-2" style={{ borderColor: "#191007" }}>
            <div className="p-8 md:p-12 md:border-r-2" style={{ borderColor: "#191007" }}>
              <div className="flex items-center gap-3 mb-5">
                <Target className="w-7 h-7" style={{ color: "#A4500F" }} />
                <h3 className="font-display font-bold uppercase tracking-widest text-sm">Nuestra misión</h3>
              </div>
              <p className="text-muted-paper mb-6" style={{ color: "rgba(25,16,7,.72)" }}>
                Obedecer el mandato de nuestro Señor Jesucristo de ir por todo el mundo y predicar
                el evangelio a toda criatura (Marcos 16:15-16), alcanzando vidas para Cristo y
                guiándolas al arrepentimiento genuino, la restauración espiritual y la transformación personal.
              </p>
              <ul className="space-y-3">
                {missionPoints.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-sm" style={{ color: "rgba(25,16,7,.8)" }}>
                    <Flame className="w-4 h-4 shrink-0" style={{ color: "#FF5A1F" }} />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 md:p-12 border-t-2 md:border-t-0" style={{ borderColor: "#191007" }}>
              <div className="flex items-center gap-3 mb-5">
                <Eye className="w-7 h-7" style={{ color: "#A4500F" }} />
                <h3 className="font-display font-bold uppercase tracking-widest text-sm">Nuestra visión</h3>
              </div>
              <p className="mb-8" style={{ color: "rgba(25,16,7,.72)" }}>
                Ser un ministerio evangelístico internacional guiado por el Espíritu Santo, que
                enciende el fuego del avivamiento en las naciones mediante la proclamación del
                evangelio con poder, compasión y verdad.
              </p>
              <blockquote className="accent-serif text-2xl md:text-3xl leading-snug" style={{ color: "#191007" }}>
                "Levantar una generación comprometida, apasionada y capacitada para alcanzar su
                ciudad, su nación y el mundo."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CIERRE ═════════════════════════════════════════════════ */}
      <section className="py-24 section-aurora">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <LogoIcon className="w-10 h-10 mx-auto mb-6" />
          <blockquote className="accent-serif text-3xl md:text-5xl leading-tight">
            "No apaguéis <span className="fire-text">el Espíritu</span>"
          </blockquote>
          <p className="data-label mt-5">1 Tesalonicenses 5:19</p>
        </div>
      </section>
    </Layout>
  );
}
