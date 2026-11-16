// Una materia en preparación: en vez de una lista de lecciones vacía, lo que viene, «Avísame cuando abra» (el aviso
// llega a la campana: server/academia.ts, avisarLasQueAbrieron) y las materias del mismo nivel o especialidad que ya se
// pueden estudiar.
import { useState } from "react";
import { Link } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowRight, BellOff, BellRing, Hourglass, Loader2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { loginUrl } from "@/lib/login-redirect";
import { ESPECIALIDADES, NIVELES, type MateriaDetalle } from "@shared/academia";
import { avisarmeMateria } from "./api";

export function EnPreparacion({ d }: { d: MateriaDetalle }) {
  const qc = useQueryClient();
  const m = d.materia;
  const [avisame, setAvisame] = useState(!!d.avisame);
  const [ocupado, setOcupado] = useState(false);
  const [aviso, setAviso] = useState<string | null>(null);
  const grupo = m.nivel ? NIVELES.find((n) => n.n === m.nivel)?.materias : ESPECIALIDADES.find((e) => e.id === m.especialidad)?.materias;
  const listas = (grupo ?? []).filter((x) => x.disponible && x.id !== m.id);

  const cambiar = async () => {
    setOcupado(true);
    setAviso(null);
    try {
      const r = await avisarmeMateria(m.id, !avisame);
      setAvisame(r.avisame);
      qc.invalidateQueries({ queryKey: ["academia", "materia", m.id] });
    } catch (e: any) {
      setAviso(e?.message ?? "No se pudo guardar. Inténtalo otra vez.");
    } finally {
      setOcupado(false);
    }
  };

  return (
    <section className="glass-card p-5 md:p-6 border border-orange-500/30" data-testid="materia-en-preparacion">
      <div className="flex items-start gap-3">
        <Hourglass className="w-6 h-6 text-orange-500 shrink-0 mt-0.5" aria-hidden="true" />
        <div>
          <h2 className="font-display text-xl font-bold">Esta materia está en preparación</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Su contenido se está escribiendo y revisando, lección por lección, con la Biblia y su bibliografía. Cuando esté lista aparecerán aquí sus
            lecciones, su versículo de memoria y su examen.
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        {d.conSesion ? (
          <Button onClick={cambiar} disabled={ocupado} variant={avisame ? "outline" : "default"} className={avisame ? "" : "fire-btn-primary"} data-testid="materia-avisame">
            {ocupado ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : avisame ? <BellOff className="w-4 h-4 mr-2" /> : <BellRing className="w-4 h-4 mr-2" />}
            {avisame ? "Ya no avisarme" : "Avísame cuando abra"}
          </Button>
        ) : (
          <a href={loginUrl(`/academia/materia/${m.id}`)}>
            <Button variant="outline"><BellRing className="w-4 h-4 mr-2" /> Entra para que te avisemos</Button>
          </a>
        )}
        <Link href="/academia/catalogo">
          <Button variant="ghost" data-testid="materia-ver-catalogo"><Search className="w-4 h-4 mr-2" /> Ver todo el catálogo</Button>
        </Link>
      </div>
      {avisame && <p className="text-sm text-emerald-700 dark:text-emerald-300 mt-2" role="status">Listo: te avisaremos en la campana cuando abra.</p>}
      {aviso && <p className="text-sm text-orange-700 dark:text-orange-300 mt-2" role="alert">{aviso}</p>}
      {listas.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold">
            Mientras tanto, ya puedes estudiar {m.nivel ? `estas materias del Nivel ${m.nivel}` : "estas materias de la especialidad"}:
          </h3>
          <ul className="mt-2 grid gap-2 sm:grid-cols-2">
            {listas.slice(0, 10).map((x) => (
              <li key={x.id}>
                <Link
                  href={`/academia/materia/${x.id}`}
                  className="glass-card p-3 flex items-center justify-between gap-2 border border-transparent hover:border-orange-500/40 transition"
                  data-testid={`materia-lista-${x.id}`}
                >
                  <span className="text-sm font-medium">{x.titulo}</span>
                  <ArrowRight className="w-4 h-4 text-orange-500 shrink-0" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
