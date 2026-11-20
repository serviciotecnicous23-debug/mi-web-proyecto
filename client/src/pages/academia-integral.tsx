// El examen integral de un nivel (server/academia-nivel.ts): la misma pantalla que el final de una materia. El nombre
// del nivel y cuántas materias tiene salen del mapa de la academia (la página no carga el catálogo).
import { useParams } from "wouter";
import { NIVELES_N } from "@shared/academia-base";
import { baseIntegral } from "@/components/academia/api";
import { PantallaExamenConMapa } from "@/components/academia/examen";

export default function AcademiaIntegral() {
  const { nivel } = useParams<{ nivel: string }>();
  const n = NIVELES_N.find((x) => String(x) === nivel);
  const base = n ? baseIntegral(n) : undefined;
  return (
    <PantallaExamenConMapa
      base={base}
      destino={(mapa) => {
        const nv = mapa?.niveles.find((x) => x.n === n);
        if (!base || !n || (mapa && !nv)) return null;
        return {
          base,
          tipo: "integral",
          titulo: `Examen integral · Nivel ${n}`,
          volver: { href: `/academia/nivel/${n}`, texto: nv ? `Nivel ${n} · ${nv.nombre}` : `Nivel ${n}` },
          detalle: nv ? `Preguntas de las ${nv.materias} materias del nivel, repartidas por materia, y respuestas escritas de materias distintas.` : undefined,
        };
      }}
    />
  );
}
