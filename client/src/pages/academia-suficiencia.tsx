// El examen de suficiencia de una materia (server/academia-suficiencia.ts): la pantalla común de los exámenes. El
// título y el «Volver» salen del mapa de la academia (la página no carga el catálogo).
import { useParams } from "wouter";
import { SUFICIENCIA } from "@shared/academia-base";
import { baseSuficiencia } from "@/components/academia/api";
import { PantallaExamenConMapa } from "@/components/academia/examen";

export default function AcademiaSuficiencia() {
  const { materiaId } = useParams<{ materiaId: string }>();
  const base = materiaId ? baseSuficiencia(materiaId) : undefined;
  return (
    <PantallaExamenConMapa
      base={base}
      destino={(mapa) => {
        const m = materiaId ? mapa?.materias[materiaId] : undefined;
        if (!base || (mapa && !m)) return null;
        return {
          base,
          tipo: "suficiencia",
          titulo: m ? `Suficiencia · ${m.titulo}` : "Suficiencia",
          volver: { href: `/academia/materia/${materiaId}`, texto: m?.titulo ?? "la materia" },
          detalle: `Para quien ya sabe lo que enseña la materia: ${SUFICIENCIA.objetivas} preguntas de todas sus lecciones y ${SUFICIENCIA.escritas} respuestas escritas. Antes hay que aprender su versículo de memoria.`,
        };
      }}
    />
  );
}
