import { enLaRadio } from "@/lib/incrustado";
import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { BookOpen, Gamepad2, GraduationCap, Home, Menu, Radio, Video } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

/**
 * Barra inferior del celular, como en las apps (YouVersion, Hallow, Church Center):
 * los destinos principales a mano del pulgar. "Más" abre el mismo menú lateral de
 * siempre (Navbar escucha el evento "avivando:open-menu"). Solo se ve por debajo de
 * 1024 px; en escritorio está la barra de arriba.
 *
 * Vive en App.tsx, FUERA de las páginas: la transición entre páginas deja un `transform`
 * en el contenedor y, mientras dura, un `position: fixed` de dentro se colocaba al final
 * del contenido (la barra "desaparecía" en cada cambio de página).
 */
// Pantallas de cuenta y la escena para transmisiones: van sin barra.
const SIN_BARRA = ["/login", "/registro", "/forgot-password", "/reset-password", "/verificar-email", "/radio-live-scene"];
type Tab = { href: string; label: string; icon: typeof Home; testId: string };

const VISITOR_TABS: Tab[] = [
  { href: "/", label: "Inicio", icon: Home, testId: "tab-inicio" },
  { href: "/biblioteca", label: "Biblia", icon: BookOpen, testId: "tab-biblia" },
  { href: "/radio", label: "Radio", icon: Radio, testId: "tab-radio" },
  { href: "/juegos", label: "Juegos", icon: Gamepad2, testId: "tab-juegos" },
  { href: "/en-vivo", label: "En vivo", icon: Video, testId: "tab-en-vivo" },
];

const MEMBER_TABS: Tab[] = [
  { href: "/", label: "Inicio", icon: Home, testId: "tab-inicio" },
  { href: "/biblioteca", label: "Biblia", icon: BookOpen, testId: "tab-biblia" },
  { href: "/capacitaciones", label: "Clases", icon: GraduationCap, testId: "tab-clases" },
  { href: "/radio", label: "Radio", icon: Radio, testId: "tab-radio" },
  { href: "/juegos", label: "Juegos", icon: Gamepad2, testId: "tab-juegos" },
];

function isActive(location: string, href: string) {
  return href === "/" ? location === "/" : location === href || location.startsWith(href + "/");
}

export function MobileTabBar() {
  const [location] = useLocation();
  const { user } = useAuth();
  const tabs = user ? MEMBER_TABS : VISITOR_TABS;
  // dentro de la radio la barra sobra (la radio pone la suya)
  const oculta = enLaRadio() || SIN_BARRA.some((p) => location === p || location.startsWith(p + "/"));

  // html.has-tabbar: la página deja sitio abajo solo cuando la barra se ve.
  useEffect(() => {
    document.documentElement.classList.toggle("has-tabbar", !oculta);
    return () => document.documentElement.classList.remove("has-tabbar");
  }, [oculta]);

  if (oculta) return null;

  return (
    <nav className="tabbar" aria-label="Navegación principal del celular" data-testid="mobile-tabbar">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const active = isActive(location, tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`tabbar__item${active ? " tabbar__item--active" : ""}${tab.href === "/radio" ? " tabbar__item--radio" : ""}`}
            aria-current={active ? "page" : undefined}
            data-testid={tab.testId}
          >
            <span className="tabbar__icon" aria-hidden="true">
              <Icon className="h-5 w-5" />
              {tab.href === "/radio" && <span className="tabbar__live" />}
            </span>
            <span className="tabbar__label">{tab.label}</span>
          </Link>
        );
      })}
      <button
        type="button"
        className="tabbar__item"
        onClick={() => window.dispatchEvent(new CustomEvent("avivando:open-menu"))}
        data-testid="tab-mas"
      >
        <span className="tabbar__icon" aria-hidden="true">
          <Menu className="h-5 w-5" />
        </span>
        <span className="tabbar__label">Más</span>
      </button>
    </nav>
  );
}
