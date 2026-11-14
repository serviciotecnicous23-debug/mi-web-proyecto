// El examen de suficiencia de una materia (server/academia-suficiencia.ts): la pantalla común de los exámenes.
import { useParams } from "wouter";
import { SUFICIENCIA, materiaPorId } from "@shared/academia";
import { baseSuficiencia } from "@/components/academia/api";
import { PantallaExamen } from "@/components/academia/examen";

export default function AcademiaSuficiencia() {
  const { materiaId } = useParams<{ materiaId: string }>();
  const def = materiaId ? materiaPorId(materiaId) : undefined;
  return (
    <PantallaExamen
      destino={
        def
          ? {
              base: baseSuficiencia(def.id),
              tipo: "suficiencia",
              titulo: `Suficiencia · ${def.titulo}`,
              volver: { href: `/academia/materia/${def.id}`, texto: def.titulo },
              detalle: `Para quien ya sabe lo que enseña la materia: ${SUFICIENCIA.objetivas} preguntas de todas sus lecciones y ${SUFICIENCIA.escritas} respuestas escritas. Antes hay que aprender su versículo de memoria.`,
            }
          : null
      }
    />
  );
}
