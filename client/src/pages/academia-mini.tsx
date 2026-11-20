// Una mini prueba de una materia del Nivel 2 en adelante (server/academia-mini.ts): la pantalla común de los exámenes.
// El título, el «Volver» y las lecciones que mide salen del mapa de la academia (la página no carga el catálogo).
import { useParams } from "wouter";
import { MINI_PRUEBA, miniPruebasDe } from "@shared/academia-base";
import { baseMini } from "@/components/academia/api";
import { PantallaExamenConMapa } from "@/components/academia/examen";

export default function AcademiaMini() {
  const { materiaId, n } = useParams<{ materiaId: string; n: string }>();
  const base = materiaId ? baseMini(materiaId, Number(n)) : undefined;
  return (
    <PantallaExamenConMapa
      base={base}
      destino={(mapa) => {
        const m = materiaId ? mapa?.materias[materiaId] : undefined;
        const g = m ? miniPruebasDe(m).find((x) => x.n === Number(n)) : undefined;
        if (!base || (mapa && !g)) return null;
        if (!m || !g) return { base, tipo: "mini", titulo: `Mini prueba ${n}`, volver: { href: `/academia/materia/${materiaId}`, texto: "la materia" } };
        return {
          base,
          tipo: "mini",
          titulo: `Mini prueba ${g.n} · ${m.titulo}`,
          volver: { href: `/academia/materia/${materiaId}`, texto: m.titulo },
          detalle: `${MINI_PRUEBA.objetivas} preguntas de las lecciones ${g.lecciones[0]} a ${g.lecciones[g.lecciones.length - 1]}. Sirve para afianzar lo que estudiaste.`,
        };
      }}
    />
  );
}
