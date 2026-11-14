// La entrada a la academia desde el panel de cada rol de la web: la Administración la maneja desde el panel de
// administración; los maestros, los líderes y las iglesias aliadas entran a su seguimiento, solo para ver. Liviano: los
// paneles no cargan el catálogo de la academia. También la redirección de los enlaces viejos (/academia/direccion).
import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ArrowRight, Eye, GraduationCap, ShieldCheck } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { rolAcademia } from "@shared/academia-permisos";
import { baseDelRol } from "./area";

/** La tarjeta de la academia en un panel (administración, maestro o «Mi iglesia»). */
export function TarjetaAcademiaPanel({ base }: { base: string }) {
  const { user } = useAuth();
  const rol = rolAcademia(user?.role);
  if (!user || rol === "alumno") return null;
  const administra = rol === "direccion";
  const titulo = administra ? "Administración de la Academia" : rol === "iglesia" ? "Los alumnos de tu iglesia en la Academia" : "Seguimiento de la Academia";
  const texto = administra
    ? "Alumnos y su avance, revisión de notas y pedidos de revisión, revisión doctrinal del contenido, documentos, mentores y la apertura de la academia."
    : rol === "iglesia"
      ? "Quiénes de tu iglesia estudian, por dónde va cada uno y sus notas. Solo para ver: la academia la administra la Administración."
      : "Quiénes estudian, por dónde va cada uno y sus notas. Solo para ver: la academia la administra la Administración.";
  return (
    <Link href={base}>
      <span
        className="glass-card mb-8 p-5 md:p-6 flex flex-col sm:flex-row sm:items-center gap-4 border border-orange-500/40 hover:-translate-y-0.5 transition cursor-pointer"
        data-testid="panel-academia"
      >
        <span className="w-12 h-12 rounded-2xl bg-orange-500/15 flex items-center justify-center shrink-0">
          <GraduationCap className="w-7 h-7 text-orange-500" aria-hidden="true" />
        </span>
        <span className="flex-1 min-w-0">
          <span className="flex flex-wrap items-center gap-2">
            <strong className="text-lg">{titulo}</strong>
            <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs">
              {administra ? <ShieldCheck className="w-3 h-3" aria-hidden="true" /> : <Eye className="w-3 h-3" aria-hidden="true" />}
              {administra ? "La administras tú" : "Solo ver"}
            </span>
          </span>
          <span className="block text-sm text-muted-foreground mt-1">{texto}</span>
        </span>
        <span className="inline-flex items-center gap-1.5 text-sm font-medium shrink-0">Entrar <ArrowRight className="w-4 h-4" aria-hidden="true" /></span>
      </span>
    </Link>
  );
}

/** Los enlaces viejos (/academia/direccion…) llevan al panel del rol, con el resto de la ruta y sus parámetros. */
export function RedirigirPanelAcademia() {
  const { user, isLoading } = useAuth();
  const [ruta, navegar] = useLocation();
  useEffect(() => {
    if (isLoading) return;
    const resto = ruta.replace(/^\/academia\/direccion/, "");
    navegar(`${baseDelRol(user?.role)}${resto}${window.location.search}`, { replace: true });
  }, [isLoading, user?.role]);
  return (
    <div className="min-h-[50vh] flex items-center justify-center" role="status" aria-label="Cargando">
      <div className="w-8 h-8 rounded-full border-2 border-orange-500 border-t-transparent animate-spin" />
    </div>
  );
}
