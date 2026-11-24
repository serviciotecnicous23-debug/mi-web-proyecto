// La práctica del día en las listas de «Para hoy» (el salón y la portada de la academia): solo aparece si hoy toca algo.
import { Link } from "wouter";
import { Flame } from "lucide-react";
import { PRACTICAS } from "@shared/practicas";
import { useResumenDelDia } from "./api";

export function PracticaDelDiaItem({ activo, testId }: { activo: boolean; testId?: string }) {
  const q = useResumenDelDia(activo);
  const n = Math.min(q.data?.pendientes ?? 0, PRACTICAS.porDia);
  if (!activo || n <= 0) return null;
  return (
    <li>
      <Link href="/academia/practicar/dia" className="flex items-start gap-2 font-medium hover:underline" data-testid={testId}>
        <Flame className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" /> Práctica del día: {n} {n === 1 ? "actividad" : "actividades"} para no olvidar
      </Link>
    </li>
  );
}

/** El texto de la herramienta «Practicar» del salón. */
export function textoPracticar(pendientes: number | undefined, firmes: number | undefined, total: number | undefined): string {
  if (!total) return "La práctica del día, los juegos y tus medallas";
  return `${firmes ?? 0} firmes · ${Math.min(pendientes ?? 0, PRACTICAS.porDia)} para hoy`;
}
