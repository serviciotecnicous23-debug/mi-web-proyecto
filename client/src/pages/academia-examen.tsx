// El examen final de una materia (server/academia-examen.ts): la pantalla común de los exámenes de la academia.
import { useParams } from "wouter";
import { materiaPorId } from "@shared/academia";
import { baseExamen } from "@/components/academia/api";
import { PantallaExamen } from "@/components/academia/examen";

export default function AcademiaExamen() {
  const { materiaId } = useParams<{ materiaId: string }>();
  const def = materiaId ? materiaPorId(materiaId) : undefined;
  return (
    <PantallaExamen
      destino={def ? { base: baseExamen(def.id), tipo: "materia", titulo: "Examen final", volver: { href: `/academia/materia/${def.id}`, texto: def.titulo } } : null}
    />
  );
}
