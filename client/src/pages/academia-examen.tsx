// El examen final de una materia (server/academia-examen.ts): la pantalla común de los exámenes de la academia. El
// título y el «Volver» salen del mapa de la academia (la página no carga el catálogo).
import { useParams } from "wouter";
import { baseExamen } from "@/components/academia/api";
import { PantallaExamenConMapa } from "@/components/academia/examen";

export default function AcademiaExamen() {
  const { materiaId } = useParams<{ materiaId: string }>();
  const base = materiaId ? baseExamen(materiaId) : undefined;
  return (
    <PantallaExamenConMapa
      base={base}
      destino={(mapa) => {
        const m = materiaId ? mapa?.materias[materiaId] : undefined;
        if (!base || (mapa && !m)) return null;
        return { base, tipo: "materia", titulo: "Examen final", volver: { href: `/academia/materia/${materiaId}`, texto: m?.titulo ?? "la materia" } };
      }}
    />
  );
}
