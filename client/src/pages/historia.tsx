import { Layout } from "@/components/layout";
import { Card } from "@/components/ui/card";
import { Flame, Target, Eye } from "lucide-react";
import { LogoIcon } from "@/components/LogoIcon";

const timeline = [
  { year: "2017", title: "El Llamado", desc: "Nacimiento del ministerio en Ciudad Bolivar, Venezuela. Un grupo de jovenes apasionados por Dios reciben el mandato de llevar el fuego del evangelio a las naciones." },
  { year: "2018-2019", title: "Expansion Nacional", desc: "Primeras campanas evangelisticas masivas. Formación de equipos de evangelismo callejero. Alcance de cientos de vidas en Venezuela." },
  { year: "2020-2021", title: "Nuevos Horizontes", desc: "Expansion a Peru bajo la cobertura de Mision Peru. Adaptacion a medios digitales durante la pandemia. Radio y transmisiones en vivo." },
  { year: "2022-2023", title: "Traslado a USA", desc: "Nueva sede en Austin, Texas. Consolidacion del ministerio internacional. Formación de lideres y estructura organizativa." },
  { year: "2024-2025", title: "Plataforma Digital", desc: "Lanzamiento de la plataforma ministerial global. Conexion de obreros de todas las naciones. Escuela de ministerio en linea." },
];

const missionPoints = [
  "Evangelismo integral en calles y plazas",
  "Medios digitales y radio",
  "Campanas y cruzadas",
  "Obras sociales y ayuda humanitaria",
  "Capacitación de obreros",
];

export default function Historia() {
  return (
    <Layout>
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm text-primary font-medium mb-2">Nuestra Historia</p>
            <h1 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-history-title">
              Un Legado de Fe y Fuego
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Desde un pequeno grupo de oracion en Venezuela hasta una red internacional de obreros apasionados por el avivamiento.
            </p>
          </div>

          <div className="space-y-8">
            {timeline.map((item, i) => (
              <div key={item.year} className="flex gap-6" data-testid={`timeline-${item.year}`}>
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <LogoIcon className="w-5 h-5" />
                  </div>
                  {i < timeline.length - 1 && (
                    <div className="w-0.5 flex-1 bg-border mt-2" />
                  )}
                </div>
                <Card className="p-5 flex-1 mb-2">
                  <p className="text-xs text-primary font-semibold mb-1">{item.year}</p>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-card border-t">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-bold">Nuestra Mision</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Obedecer el mandato de nuestro Senor Jesucristo de ir por todo el mundo y predicar el evangelio a toda criatura (Marcos 16:15-16), alcanzando vidas para Cristo, guiandolas al arrepentimiento genuino, restauracion espiritual y transformacion personal.
            </p>
            <ul className="space-y-2">
              {missionPoints.map((p) => (
                <li key={p} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <LogoIcon className="w-3 h-3 flex-shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-bold">Nuestra Vision</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Ser un ministerio evangelistico internacional guiado por el Espiritu Santo, que enciende el fuego del avivamiento en las naciones mediante la proclamacion del Evangelio con poder, compasion y verdad.
            </p>
            <blockquote className="border-l-2 border-primary pl-4 italic text-muted-foreground">
              "Levantar una generacion comprometida, apasionada y capacitada para alcanzar su ciudad, su nacion y el mundo."
            </blockquote>
          </Card>
        </div>
      </section>

      <section className="py-12 border-t">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <blockquote className="text-lg italic text-muted-foreground">
            "No apagueis el Espiritu"
          </blockquote>
          <p className="text-sm text-muted-foreground mt-2">- 1 Tesalonicenses 5:19</p>
        </div>
      </section>
    </Layout>
  );
}
