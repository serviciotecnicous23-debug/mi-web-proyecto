// Una mini prueba de una materia del Nivel 2 en adelante (server/academia-mini.ts): la pantalla común de los exámenes.
import { useParams } from "wouter";
import { MINI_PRUEBA, materiaPorId, miniPruebasDe } from "@shared/academia";
import { baseMini } from "@/components/academia/api";
import { PantallaExamen } from "@/components/academia/examen";

export default function AcademiaMini() {
  const { materiaId, n } = useParams<{ materiaId: string; n: string }>();
  const def = materiaId ? materiaPorId(materiaId) : undefined;
  const g = def ? miniPruebasDe(def).find((x) => x.n === Number(n)) : undefined;
  return (
    <PantallaExamen
      destino={
        def && g
          ? {
              base: baseMini(def.id, g.n),
              tipo: "mini",
              titulo: `Mini prueba ${g.n} · ${def.titulo}`,
              volver: { href: `/academia/materia/${def.id}`, texto: def.titulo },
              detalle: `${MINI_PRUEBA.objetivas} preguntas de las lecciones ${g.lecciones[0]} a ${g.lecciones[g.lecciones.length - 1]}, ${MINI_PRUEBA.segundos} segundos cada una. Sirve para afianzar lo que estudiaste.`,
            }
          : null
      }
    />
  );
}
