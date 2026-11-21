// El laboratorio ministerial en la página de una materia: sus prácticas, con lo que falta para hacerlas y el mejor
// resultado. No se muestra si la materia todavía no tiene prácticas.
import { Link } from "wouter";
import { ArrowRight, FlaskConical, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LABORATORIO, NOMBRE_FORMATO } from "@shared/laboratorio";
import { textoLecciones, useLaboratorioMateria } from "./laboratorio-api";

export function LaboratorioDeMateria({ materiaId }: { materiaId: string }) {
  const q = useLaboratorioMateria(materiaId);
  const d = q.data;
  if (!d || d.practicas.length === 0) return null;
  return (
    <section className="glass-card p-5" data-testid="materia-laboratorio">
      <h2 className="font-display text-xl font-bold mb-2 flex items-center gap-2">
        <FlaskConical className="w-5 h-5 text-orange-500" aria-hidden="true" /> Laboratorio ministerial
      </h2>
      <p className="text-sm text-muted-foreground">
        Prácticas donde actúas en una situación real de tu ministerio: decides, ves lo que pasa y recibes un perfil de lo que ya dominas.
        {LABORATORIO.cuentaParaLaNota ? "" : " Es un piloto: por ahora no cuenta para la nota."}
      </p>
      {d.prueba && (
        <p className="text-xs mt-2 rounded-lg bg-sky-500/10 px-3 py-2" data-testid="laboratorio-prueba">
          Vista de la Administración: puedes hacerlas sin inscribirte. Tus intentos quedan como prueba.
        </p>
      )}
      <ul className="grid gap-3 mt-4">
        {d.practicas.map((p) => {
          const lista = d.puede && p.falta.length === 0;
          const boton = p.enCurso ? "Seguir con la práctica" : p.intentos ? "Hacerla otra vez" : "Empezar la práctica";
          return (
            <li key={p.id} className="rounded-xl border border-border p-4" data-testid="laboratorio-practica" data-id={p.id}>
              <p className="data-label text-orange-600 dark:text-orange-300">{NOMBRE_FORMATO[p.formato]} · unos {p.minutos} minutos</p>
              <p className="font-semibold mt-1">{p.titulo}</p>
              <p className="text-sm text-muted-foreground mt-0.5">{p.situacion}</p>
              <p className="text-xs text-muted-foreground mt-1">Se basa en {textoLecciones(p.lecciones.map((l) => l.n))}.</p>
              {p.mejor != null && (
                <p className="text-sm mt-2" data-testid="laboratorio-mejor">
                  Tu mejor resultado: <strong>{p.mejor}</strong> de 100 · {p.nivel} · {Math.min(p.intentos, LABORATORIO.intentos)} de {LABORATORIO.intentos} intentos
                </p>
              )}
              {d.puede && p.falta.length > 0 && (
                <p className="text-xs mt-2 flex items-center gap-1.5"><Lock className="w-3.5 h-3.5" aria-hidden="true" /> Para hacerla te falta {p.falta.join(" y ")}.</p>
              )}
              {lista ? (
                <Link href={`/academia/laboratorio/${p.id}`}>
                  <Button size="sm" className="mt-3 fire-btn-primary" data-testid="laboratorio-ir">{boton} <ArrowRight className="w-4 h-4 ml-1" /></Button>
                </Link>
              ) : (
                <Link href={`/academia/laboratorio/${p.id}`}>
                  <Button size="sm" variant="outline" className="mt-3" data-testid="laboratorio-ver">Ver de qué se trata</Button>
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
