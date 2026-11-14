// La insignia de la academia en el perfil: el estatus y el nivel, sin notas (docs/academia.md, «La matrícula y el
// estatus»), con los enlaces al carné y al expediente. Liviana: no importa el catálogo de la academia.
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { GraduationCap } from "lucide-react";
import type { MatriculaInfo } from "@shared/academia";
import { useAcademiaVisible } from "@/lib/academia-visible";

export function InsigniaAcademia() {
  const visible = useAcademiaVisible();
  const { data } = useQuery<{ matricula: MatriculaInfo | null } | null>({
    queryKey: ["academia", "matricula"],
    queryFn: async () => {
      const r = await fetch("/api/academia/matricula", { credentials: "include" });
      return r.ok ? r.json() : null;
    },
    enabled: visible,
    staleTime: 60_000,
    retry: false,
  });
  if (!visible || !data) return null;
  const m = data.matricula;
  if (!m) {
    return (
      <Link href="/academia/inscripcion" className="mt-3 inline-flex items-center gap-1.5 text-xs text-orange-700 dark:text-orange-300 hover:underline" data-testid="perfil-academia-invitacion">
        <GraduationCap className="w-3.5 h-3.5" /> Inscríbete en la Academia Avivando el Fuego
      </Link>
    );
  }
  return (
    <div className="mt-3 rounded-xl border border-orange-500/30 bg-orange-500/5 px-3 py-2 text-xs text-left" data-testid="perfil-academia">
      <p className="font-semibold flex items-center gap-1.5"><GraduationCap className="w-3.5 h-3.5 text-orange-600" /> Academia Avivando el Fuego</p>
      <p className="mt-0.5">{m.estatus.texto}{m.estatus.honores ? " · Cuadro de honor" : ""}</p>
      <p className="text-muted-foreground tracking-wide">Matrícula {m.numero}</p>
      <p className="mt-1 flex gap-3">
        <Link href="/academia/carne" className="underline">Mi carné</Link>
        <Link href="/academia/expediente" className="underline">Mi expediente</Link>
      </p>
    </div>
  );
}
