// El examen integral de un nivel (server/academia-nivel.ts): la misma pantalla que el final de una materia.
import { useParams } from "wouter";
import { NIVELES } from "@shared/academia";
import { baseIntegral } from "@/components/academia/api";
import { PantallaExamen } from "@/components/academia/examen";

export default function AcademiaIntegral() {
  const { nivel } = useParams<{ nivel: string }>();
  const nv = NIVELES.find((x) => String(x.n) === nivel);
  return (
    <PantallaExamen
      destino={
        nv
          ? {
              base: baseIntegral(nv.n),
              tipo: "integral",
              titulo: `Examen integral · Nivel ${nv.n}`,
              volver: { href: `/academia/nivel/${nv.n}`, texto: `Nivel ${nv.n} · ${nv.nombre}` },
              detalle: `Preguntas de las ${nv.materias.length} materias del nivel, repartidas por materia, y respuestas escritas de materias distintas.`,
            }
          : null
      }
    />
  );
}
