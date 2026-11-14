// Las dos pestañas de Clases: la Academia primero y las clases en vivo de la Escuela después (docs/academia.md,
// «La Academia primero»). Solo se ven cuando la academia se ve. No importa el catálogo de la academia (va también en
// Capacitaciones).
import { Link } from "wouter";
import { GraduationCap, Video } from "lucide-react";
import { useAcademiaVisible } from "@/lib/academia-visible";

const PESTANAS = [
  { id: "academia", href: "/academia", texto: "Academia", icono: GraduationCap },
  { id: "vivo", href: "/capacitaciones", texto: "Clases en vivo", icono: Video },
] as const;

export function PestanasClases({ actual, className = "" }: { actual: "academia" | "vivo"; className?: string }) {
  const visible = useAcademiaVisible();
  if (!visible) return null;
  return (
    <nav aria-label="Clases" className={`flex justify-center ${className}`} data-testid="pestanas-clases">
      <div className="inline-flex gap-1 p-1 rounded-full bg-muted/70 border border-border">
        {PESTANAS.map(({ id, href, texto, icono: Icono }) => {
          const activa = id === actual;
          return (
            <Link
              key={id}
              href={href}
              aria-current={activa ? "page" : undefined}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${activa ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              data-testid={`pestana-${id}`}
            >
              <Icono className="w-4 h-4" /> {texto}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
