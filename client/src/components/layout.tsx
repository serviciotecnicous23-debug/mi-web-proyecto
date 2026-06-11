import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut,
  User,
  Users,
  Shield,
  Menu,
  X,
  MailWarning,
  Loader2,
  MessageSquare,
  GraduationCap,
  BookOpen,
  Library,
  Bell,
  Heart,
  Globe,
  Mail,
  Award,
  BarChart3,
  DollarSign,
  ChevronDown,
  Home,
  Calendar,
  Video,
  Church,
  MapPin,
  FileText,
  Radio,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { ROLES } from "@shared/schema";
import { isAdminRole, isTeacherOrAdminRole } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeProvider";
import { GlobalSearch } from "@/components/GlobalSearch";
import { ScrollToTop, BackToTop } from "@/components/ScrollToTop";
import { LogoIcon } from "@/components/LogoIcon";
import { FlameLogoSVG } from "@/components/FlameLogoSVG";
import { Fire3DScene } from "@/components/Fire3DScene";
import type { Fire3DSceneHandle } from "@/components/Fire3DScene";

// Desktop nav links — PUBLIC (visitors / not logged in)
const publicDesktopNavLinks = [
  { href: "/", label: "Inicio" },
  { href: "/eventos", label: "Eventos" },
  { href: "/regiones", label: "Regiones" },
  { href: "/iglesias", label: "Iglesias" },
  { href: "/comunidad", label: "Comunidad" },
  { href: "/radio", label: "Radio" },
  { href: "/en-vivo", label: "En Vivo" },
];

// Desktop nav bar — MEMBERS (logged in)
const memberDesktopNavLinks = [
  { href: "/capacitaciones", label: "Capacitaciones" },
  { href: "/biblioteca", label: "Biblioteca" },
  { href: "/regiones", label: "Regiones" },
  { href: "/comunidad", label: "Comunidad" },
  { href: "/oracion", label: "Oración" },
  { href: "/eventos", label: "Eventos" },
  { href: "/radio", label: "Radio" },
  { href: "/en-vivo", label: "En Vivo" },
  { href: "/perfil?tab=amigos", label: "Amigos" },
  { href: "/mensajes", label: "Mensajes" },
];

// Mobile nav — PUBLIC (visitors)
const publicMobileNavGroups = [
  {
    title: "Inicio",
    icon: Home,
    links: [{ href: "/", label: "Inicio", icon: Home }],
    alwaysOpen: true,
  },
  {
    title: "Eventos",
    icon: Calendar,
    links: [
      { href: "/eventos", label: "Eventos", icon: Calendar },
      { href: "/calendario", label: "Calendario", icon: Calendar },
    ],
    alwaysOpen: true,
  },
  {
    title: "Ministerio",
    icon: Globe,
    links: [
      { href: "/regiones", label: "Regiones", icon: Globe },
      { href: "/iglesias", label: "Iglesias", icon: Church },
      { href: "/comunidad", label: "Comunidad", icon: Heart },
    ],
    alwaysOpen: true,
  },
  {
    title: "Medios",
    icon: Radio,
    links: [
      { href: "/radio", label: "Radio", icon: Radio },
      { href: "/en-vivo", label: "En Vivo", icon: Video },
    ],
    alwaysOpen: true,
  },
  {
    title: "Mas",
    icon: MapPin,
    links: [
      { href: "/contacto", label: "Contacto", icon: MapPin },
      { href: "/historia", label: "Historia", icon: BookOpen },
      { href: "/equipo", label: "Equipo", icon: Users },
    ],
    alwaysOpen: true,
  },
];

// Mobile nav — MEMBERS (logged in)
const memberMobileNavGroups = [
  {
    title: "Inicio",
    icon: Home,
    links: [{ href: "/", label: "Inicio", icon: Home }],
    alwaysOpen: true,
  },
  {
    title: "Formacion",
    icon: GraduationCap,
    links: [
      { href: "/capacitaciones", label: "Capacitaciones", icon: GraduationCap },
      { href: "/biblioteca", label: "Biblioteca", icon: Library },
      { href: "/sermones", label: "Sermones", icon: FileText },
      { href: "/radio", label: "Radio", icon: Radio },
      { href: "/en-vivo", label: "En Vivo", icon: Video },
    ],
  },
  {
    title: "Comunidad",
    icon: Heart,
    links: [
      { href: "/comunidad", label: "Comunidad", icon: MessageSquare },
      { href: "/oracion", label: "Oración", icon: Heart },
      { href: "/eventos", label: "Eventos", icon: Calendar },
      { href: "/grupos", label: "Grupos", icon: Users },
      { href: "/calendario", label: "Calendario", icon: Calendar },
    ],
  },
  {
    title: "Ministerio",
    icon: Globe,
    links: [
      { href: "/regiones", label: "Regiones", icon: Globe },
      { href: "/iglesias", label: "Iglesias", icon: Church },
      { href: "/historia", label: "Historia", icon: BookOpen },
      { href: "/equipo", label: "Equipo", icon: Users },
    ],
  },
  {
    title: "Mas",
    icon: MapPin,
    links: [{ href: "/contacto", label: "Contacto", icon: MapPin }],
    alwaysOpen: true,
  },
];

type Notification = {
  id: number;
  type: string;
  title: string;
  content: string;
  link: string | null;
  isRead: boolean;
  createdAt: string;
};

// ========== MOBILE NAV GROUP COMPONENT ==========
function MobileNavGroup({
  group,
  location,
  onNavigate,
}: {
  group: (typeof memberMobileNavGroups)[number];
  location: string;
  onNavigate: () => void;
}) {
  // Check if any link in this group matches current location
  const isActive = group.links.some(
    (l) => l.href === location || (l.href !== "/" && location.startsWith(l.href))
  );
  const [open, setOpen] = useState(isActive || !!group.alwaysOpen);

  if (group.alwaysOpen) {
    return (
      <div className="space-y-1">
        {group.links.map((link) => {
          const Icon = link.icon;
          return (
            <Link key={link.href} href={link.href} onClick={onNavigate}>
              <Button
                variant={
                  link.href === location ||
                  (link.href !== "/" && location.startsWith(link.href))
                    ? "secondary"
                    : "ghost"
                }
                className="w-full justify-start gap-3 mobile-nav-item"
                size="sm"
              >
                <Icon className="w-4 h-4" />
                {link.label}
              </Button>
            </Link>
          );
        })}
      </div>
    );
  }

  const GroupIcon = group.icon;

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className={`w-full justify-between gap-2 font-semibold text-xs uppercase tracking-wider ${
            isActive ? "text-primary" : "text-muted-foreground"
          }`}
          size="sm"
        >
          <span className="flex items-center gap-2">
            <GroupIcon className="w-4 h-4" />
            {group.title}
          </span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="pl-3 space-y-1 animate-in slide-in-from-top-2 duration-200">
        {group.links.map((link) => {
          const Icon = link.icon;
          const active =
            link.href === location ||
            (link.href !== "/" && location.startsWith(link.href));
          return (
            <Link key={link.href} href={link.href} onClick={onNavigate}>
              <Button
                variant={active ? "secondary" : "ghost"}
                className="w-full justify-start gap-3 mobile-nav-item"
                size="sm"
              >
                <Icon className="w-4 h-4" />
                {link.label}
                {active && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </Button>
            </Link>
          );
        })}
      </CollapsibleContent>
    </Collapsible>
  );
}

// ========== NOTIFICATION BELL ==========
function NotificationBell() {
  const { data: countData } = useQuery<{ count: number }>({
    queryKey: ["/api/notifications/unread-count"],
    refetchInterval: 30000,
  });
  const { data: notifications = [] } = useQuery<Notification[]>({
    queryKey: ["/api/notifications"],
  });

  const markAllRead = useMutation({
    mutationFn: async () => {
      await apiRequest("PATCH", "/api/notifications/read-all");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/notifications"] });
      queryClient.invalidateQueries({ queryKey: ["/api/notifications/unread-count"] });
    },
  });

  const unreadCount = countData?.count || 0;
  const recentNotifs = notifications.slice(0, 8);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" data-testid="button-notifications" aria-label={`Notificaciones${unreadCount > 0 ? ` - ${unreadCount} sin leer` : ""}`}>
          <Bell className="w-5 h-5" aria-hidden="true" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center" data-testid="badge-unread-count">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between gap-2 p-3 border-b">
          <p className="font-semibold text-sm">Notificaciones</p>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={() => markAllRead.mutate()} data-testid="button-mark-all-read">
              Marcar leídas
            </Button>
          )}
        </div>
        <div className="max-h-72 overflow-y-auto">
          {recentNotifs.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">Sin notificaciones</p>
          ) : (
            recentNotifs.map((n) => (
              <div
                key={n.id}
                className={`p-3 border-b last:border-0 text-sm ${!n.isRead ? "bg-primary/5" : ""}`}
                data-testid={`notification-${n.id}`}
              >
                <p className="font-medium">{n.title}</p>
                <p className="text-muted-foreground text-xs mt-0.5">{n.content}</p>
                <p className="text-muted-foreground text-[10px] mt-1">
                  {new Date(n.createdAt).toLocaleDateString("es", { day: "numeric", month: "short" })}
                </p>
              </div>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function Navbar() {
  const { user, logout } = useAuth();
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  const roleLabel = user ? (ROLES[user.role as keyof typeof ROLES] || user.role) : "";
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // ── Scroll → intensify glass ──────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        navRef.current.classList.toggle("nav-scrolled", window.scrollY > 24);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── GSAP stagger on mobile menu open ─────────────────────────────
  useEffect(() => {
    if (!menuOpen) return;
    const timer = setTimeout(() => {
      if (typeof window === "undefined") return;
      const items = document.querySelectorAll(".mobile-nav-item");
      if (items.length > 0) {
        gsap.fromTo(items,
          { x: -18, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.3, stagger: 0.035, ease: "power2.out", clearProps: "all" }
        );
      }
    }, 60);
    return () => clearTimeout(timer);
  }, [menuOpen]);

  // Focus trap for mobile menu (accessibility)
  useEffect(() => {
    if (!menuOpen) return;
    const el = menuRef.current;
    if (!el) return;

    const focusable = el.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    function trapFocus(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMenuOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    }

    document.addEventListener("keydown", trapFocus);
    // Auto-focus first item
    setTimeout(() => first?.focus(), 100);
    return () => document.removeEventListener("keydown", trapFocus);
  }, [menuOpen]);

  return (
    <nav ref={navRef} className="navbar-glass sticky top-0 z-50" role="navigation" aria-label="Navegación principal">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3" data-testid="link-home-logo" aria-label="Ir al inicio - Avivando el Fuego">
          <span className="flame-logo-wrap">
            <FlameLogoSVG className="w-9 h-9" />
          </span>
          <div className="hidden sm:flex flex-col leading-none">
            <span className="font-display text-[11px] font-bold tracking-[0.22em] uppercase text-foreground/90">Avivando</span>
            <span className="font-display text-[9px] tracking-[0.35em] uppercase text-primary">El Fuego</span>
          </div>
        </Link>

        {/* Desktop navigation — public or member */}
        <div className="hidden lg:flex items-center gap-0.5">
          {(user ? memberDesktopNavLinks : publicDesktopNavLinks).map((l) => {
            const isActive = location === l.href || (l.href !== "/" && location.startsWith(l.href));
            return (
              <Link key={l.href} href={l.href}>
                <span
                  className={`nav-link ${isActive ? "nav-link-active" : ""}`}
                  data-testid={`link-nav-${l.label.toLowerCase().replace(/\s/g, "-")}`}
                >
                  {l.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Right side: Search + Theme + Auth */}
        <div className="flex items-center gap-2">
          <Link href="/radio">
            <Button size="sm" className="hidden sm:inline-flex fire-btn-primary" data-testid="link-radio-quick">
              <Radio className="w-4 h-4" />
              Radio
            </Button>
          </Link>
          <Link href="/radio">
            <Button size="icon" className="sm:hidden fire-btn-primary" data-testid="link-radio-quick-mobile" aria-label="Escuchar radio">
              <Radio className="w-4 h-4" />
            </Button>
          </Link>
          <GlobalSearch />
          <ThemeToggle />

          {/* Desktop auth area */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <>
                <NotificationBell />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" data-testid="button-user-menu" aria-label="Menú de usuario">
                      <Avatar className="h-8 w-8">
                        {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.displayName || user.username} />}
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {(user.displayName || user.username).slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel>
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium">{user.displayName || user.username}</p>
                        <p className="text-xs text-muted-foreground">{roleLabel}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/perfil" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" aria-hidden="true" />
                        Mi Perfil
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/perfil?tab=amigos" className="cursor-pointer">
                        <Users className="mr-2 h-4 w-4" aria-hidden="true" />
                        Amigos
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/mis-capacitaciones" className="cursor-pointer">
                        <GraduationCap className="mr-2 h-4 w-4" aria-hidden="true" />
                        Mis Capacitaciones
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/comunidad" className="cursor-pointer">
                        <MessageSquare className="mr-2 h-4 w-4" aria-hidden="true" />
                        Comunidad
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/mensajes" className="cursor-pointer">
                        <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
                        Mensajes
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/biblioteca" className="cursor-pointer">
                        <Library className="mr-2 h-4 w-4" aria-hidden="true" />
                        Biblioteca
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/oracion" className="cursor-pointer">
                        <Heart className="mr-2 h-4 w-4" aria-hidden="true" />
                        Oración
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/regiones" className="cursor-pointer">
                        <Globe className="mr-2 h-4 w-4" aria-hidden="true" />
                        Regiones
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/certificados" className="cursor-pointer">
                        <Award className="mr-2 h-4 w-4" aria-hidden="true" />
                        Certificados
                      </Link>
                    </DropdownMenuItem>
                    {isTeacherOrAdminRole(user.role) && (
                      <DropdownMenuItem asChild>
                        <Link href="/maestro" className="cursor-pointer">
                          <BookOpen className="mr-2 h-4 w-4" aria-hidden="true" />
                          Panel Maestro
                        </Link>
                      </DropdownMenuItem>
                    )}
                    {isAdminRole(user.role) && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link href="/admin" className="cursor-pointer">
                            <Shield className="mr-2 h-4 w-4" aria-hidden="true" />
                            Panel Admin
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/reportes" className="cursor-pointer">
                            <BarChart3 className="mr-2 h-4 w-4" aria-hidden="true" />
                            Reportes
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/finanzas" className="cursor-pointer">
                            <DollarSign className="mr-2 h-4 w-4" aria-hidden="true" />
                            Finanzas
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive cursor-pointer"
                      onClick={() => logout()}
                      data-testid="button-logout"
                    >
                      <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                      Cerrar Sesión
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm" data-testid="link-login">
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link href="/registro">
                  <Button size="sm" className="fire-btn-primary" data-testid="link-register">
                    <LogoIcon className="w-4 h-4 mr-1" />
                    Unirse
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            data-testid="button-mobile-menu"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú de navegación"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* ========== MOBILE SHEET MENU ========== */}
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent
          side="left"
          className="w-[300px] sm:w-[340px] p-0"
          ref={menuRef}
        >
          <SheetHeader className="p-4 pb-2 border-b">
            <SheetTitle className="flex items-center gap-2 text-left">
              <FlameLogoSVG className="w-7 h-7" />
              Avivando el Fuego
            </SheetTitle>
            <SheetDescription className="text-left text-xs">
              Ministerio Evangelístico Internacional
            </SheetDescription>
          </SheetHeader>

          <ScrollArea className="h-[calc(100vh-10rem)] px-3 py-3">
            {/* User info card (if logged in) */}
            {user && (
              <div className="mb-4 p-3 rounded-lg bg-muted/50 flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.displayName || user.username} />}
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                    {(user.displayName || user.username).slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user.displayName || user.username}</p>
                  <p className="text-xs text-muted-foreground">{roleLabel}</p>
                </div>
              </div>
            )}

            {/* Grouped navigation — dynamic by auth state */}
            <div className="space-y-1">
              {(user ? memberMobileNavGroups : publicMobileNavGroups).map((group) => (
                <MobileNavGroup
                  key={group.title}
                  group={group}
                  location={location}
                  onNavigate={closeMenu}
                />
              ))}
            </div>

            {/* Authenticated links */}
            {user && (
              <>
                <div className="my-3 border-t" />
                <Collapsible defaultOpen>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-between gap-2 font-semibold text-xs uppercase tracking-wider text-muted-foreground"
                      size="sm"
                    >
                      <span className="flex items-center gap-2">
                        <User className="w-4 h-4" aria-hidden="true" />
                        Mi Cuenta
                      </span>
                      <ChevronDown className="w-4 h-4 transition-transform duration-200 [[data-state=open]>&]:rotate-180" />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-3 space-y-1 animate-in slide-in-from-top-2 duration-200">
                    <Link href="/perfil" onClick={closeMenu}>
                      <Button variant="ghost" className="w-full justify-start gap-3" size="sm" data-testid="link-mobile-perfil">
                        <User className="w-4 h-4" aria-hidden="true" /> Mi Perfil
                      </Button>
                    </Link>
                    <Link href="/mis-capacitaciones" onClick={closeMenu}>
                      <Button variant="ghost" className="w-full justify-start gap-3" size="sm" data-testid="link-mobile-mis-capacitaciones">
                        <GraduationCap className="w-4 h-4" aria-hidden="true" /> Mis Capacitaciones
                      </Button>
                    </Link>
                    <Link href="/certificados" onClick={closeMenu}>
                      <Button variant="ghost" className="w-full justify-start gap-3" size="sm">
                        <Award className="w-4 h-4" aria-hidden="true" /> Certificados
                      </Button>
                    </Link>
                    <Link href="/mensajes" onClick={closeMenu}>
                      <Button variant="ghost" className="w-full justify-start gap-3" size="sm" data-testid="link-mobile-mensajes">
                        <Mail className="w-4 h-4" aria-hidden="true" /> Mensajes
                      </Button>
                    </Link>
                  </CollapsibleContent>
                </Collapsible>

                {/* Admin/Teacher panel links */}
                {(user.role === "obrero" || user.role === "admin") && (
                  <>
                    <div className="my-2 border-t" />
                    <Link href="/maestro" onClick={closeMenu}>
                      <Button variant="ghost" className="w-full justify-start gap-3" size="sm" data-testid="link-mobile-maestro">
                        <BookOpen className="w-4 h-4" aria-hidden="true" /> Panel Maestro
                      </Button>
                    </Link>
                  </>
                )}
                {user.role === "admin" && (
                  <div className="space-y-1">
                    <Link href="/admin" onClick={closeMenu}>
                      <Button variant="outline" className="w-full justify-start gap-3" size="sm" data-testid="link-mobile-admin">
                        <Shield className="w-4 h-4" aria-hidden="true" /> Panel Admin
                      </Button>
                    </Link>
                    <Link href="/reportes" onClick={closeMenu}>
                      <Button variant="ghost" className="w-full justify-start gap-3" size="sm">
                        <BarChart3 className="w-4 h-4" aria-hidden="true" /> Reportes
                      </Button>
                    </Link>
                    <Link href="/finanzas" onClick={closeMenu}>
                      <Button variant="ghost" className="w-full justify-start gap-3" size="sm">
                        <DollarSign className="w-4 h-4" aria-hidden="true" /> Finanzas
                      </Button>
                    </Link>
                  </div>
                )}
              </>
            )}
          </ScrollArea>

          {/* Bottom action bar */}
          <div className="border-t p-3 space-y-2">
            <Link href="/radio" onClick={closeMenu}>
              <Button className="w-full justify-start gap-3 fire-btn-primary" size="sm" data-testid="link-mobile-radio-primary">
                <Radio className="w-4 h-4" aria-hidden="true" /> Escuchar Radio
              </Button>
            </Link>
            {user ? (
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-destructive hover:text-destructive"
                size="sm"
                onClick={() => { logout(); closeMenu(); }}
                data-testid="button-mobile-logout"
              >
                <LogOut className="w-4 h-4" aria-hidden="true" /> Cerrar Sesión
              </Button>
            ) : (
              <div className="space-y-2">
                <Link href="/login" onClick={closeMenu}>
                  <Button variant="ghost" className="w-full justify-start" size="sm" data-testid="link-mobile-login">
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link href="/registro" onClick={closeMenu}>
                  <Button className="w-full fire-btn-primary" size="sm" data-testid="link-mobile-register">
                    <LogoIcon className="w-4 h-4 mr-1" /> Unirse al Ministerio
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="border-t glass-panel mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="flame-logo-wrap">
                <FlameLogoSVG className="w-7 h-7" />
              </span>
              <div className="flex flex-col leading-none">
                <span className="font-display text-sm font-bold tracking-[0.2em] uppercase fire-text">Avivando</span>
                <span className="font-display text-[10px] tracking-[0.3em] uppercase text-primary">El Fuego</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Ministerio evangelístico internacional. Desde 2017, Ciudad Bolivar, Venezuela.
            </p>
          </div>
          <div>
            <div className="h-0.5 w-10 bg-primary rounded-full mb-3" />
            <h4 className="font-display text-xs font-semibold mb-3 tracking-widest uppercase text-foreground/80">Sede Principal</h4>
            <p className="text-sm text-muted-foreground">Austin, Texas, USA</p>
            <p className="text-sm text-muted-foreground">Iglesia Casa del Alfarero</p>
            <p className="text-sm text-muted-foreground mt-2">
              Cobertura: Pastores Carlo y Trinibeth Chevez
            </p>
          </div>
          <div>
            <div className="h-0.5 w-10 bg-primary rounded-full mb-3" />
            <h4 className="font-display text-xs font-semibold mb-3 tracking-widest uppercase text-foreground/80">Presencia Internacional</h4>
            <p className="text-sm text-muted-foreground">Venezuela - Peru - USA</p>
            <p className="text-sm text-muted-foreground mt-2 italic">
              "No apaguéis el Espiritu" - 1 Tesalonicenses 5:19
            </p>
          </div>
        </div>
        <div className="border-t border-border/40 mt-8 pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            Avivando el Fuego &mdash; Ministerio Evangelístico Internacional
          </p>
        </div>
      </div>
    </footer>
  );
}

function EmailVerifyBanner() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [sending, setSending] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Don't show if: not logged in, already verified, no email, or dismissed
  if (!user || user.emailVerified || !user.email || dismissed) return null;

  async function handleResend() {
    setSending(true);
    try {
      const res = await fetch("/api/resend-my-verification", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        toast({ title: "Correo enviado", description: data.message });
      } else {
        toast({ title: "Error", description: data.message, variant: "destructive" });
      }
    } catch {
      toast({ title: "Error", description: "No se pudo enviar el correo", variant: "destructive" });
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="bg-amber-50 dark:bg-amber-950/30 border-b border-amber-200 dark:border-amber-800 px-4 py-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 text-sm text-amber-800 dark:text-amber-200">
          <MailWarning className="w-4 h-4 shrink-0" />
          <span>
            Tu correo <strong>{user.email}</strong> no esta verificado.
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-7 text-xs border-amber-300 hover:bg-amber-100 dark:border-amber-700 dark:hover:bg-amber-900"
            onClick={handleResend}
            disabled={sending}
          >
            {sending ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : null}
            Enviar verificacion
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs text-amber-600 hover:text-amber-800"
            onClick={() => setDismissed(true)}
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const fireRef = useRef<Fire3DSceneHandle>(null);

  // ── Fire state bridge: Hero (intense) at home-top → Ember (drifting) elsewhere ──
  useEffect(() => {
    const transition = () => {
      const isHome      = location === "/";
      const scrolledDown = window.scrollY > 260;
      const mode: "hero" | "ember" = "ember";
      fireRef.current?.setMode(mode);
    };
    // Immediate on location change
    transition();
    window.addEventListener("scroll", transition, { passive: true });
    return () => window.removeEventListener("scroll", transition);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      {/* SVG heat-distortion filter — referenced via CSS filter: url(#heat) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
        aria-hidden="true"
      >
        <defs>
          <filter id="heat-distortion" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.018"
              numOctaves="2"
              seed="7"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                values="0.012 0.018;0.018 0.012;0.012 0.018"
                dur="4s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="7"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Skip to content link for screen readers - 5.5 Accessibility */}
      <a
        href="#main-content"
        className="skip-to-content sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:text-sm focus:font-medium"
      >
        Saltar al contenido principal
      </a>
      <ScrollToTop />
      <Navbar />
      <EmailVerifyBanner />
      <AnimatePresence mode="wait">
        <motion.main
          key={location}
          id="main-content"
          className="flex-1 focus:outline-none"
          tabIndex={-1}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
      <BackToTop />
    </div>
  );
}
