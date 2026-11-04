import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Search,
  GraduationCap,
  Library,
  Video,
  Calendar,
  Heart,
  Users,
  Globe,
  Church,
  BookOpen,
  MessageSquare,
  MapPin,
  FileText,
  Home,
  Radio,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Logo icon for nav items
function LogoNavIcon(props: { className?: string }) {
  return <img src="/icons/icon-192.png?v4" alt="" className={props.className || "w-4 h-4"} aria-hidden="true" />;
}

// Static navigation items for instant results
const PUBLIC_NAV_ITEMS = [
  { label: "Inicio", href: "/", icon: Home, category: "Paginas" },
  { label: "Eventos", href: "/eventos", icon: Calendar, category: "Paginas" },
  { label: "Historia", href: "/historia", icon: BookOpen, category: "Ministerio" },
  { label: "Equipo", href: "/equipo", icon: Users, category: "Ministerio" },
  { label: "Regiones", href: "/regiones", icon: Globe, category: "Ministerio" },
  { label: "Iglesias", href: "/iglesias", icon: Church, category: "Ministerio" },
  { label: "Radio", href: "/radio", icon: Radio, category: "Medios" },
  { label: "En Vivo", href: "/en-vivo", icon: Video, category: "Medios" },
  { label: "Calendario", href: "/calendario", icon: Calendar, category: "Paginas" },
  { label: "Contacto", href: "/contacto", icon: MapPin, category: "Paginas" },
];

// Additional items visible only to logged-in members
const MEMBER_NAV_ITEMS = [
  { label: "Capacitaciones", href: "/capacitaciones", icon: GraduationCap, category: "Formacion" },
  { label: "Biblioteca", href: "/biblioteca", icon: Library, category: "Formacion" },
  { label: "Sermones", href: "/sermones", icon: FileText, category: "Formacion" },
  { label: "Comunidad", href: "/comunidad", icon: MessageSquare, category: "Comunidad" },
  { label: "Oración", href: "/oracion", icon: Heart, category: "Comunidad" },
  { label: "Grupos", href: "/grupos", icon: Users, category: "Comunidad" },
  { label: "Mensajes", href: "/mensajes", icon: MessageSquare, category: "Comunidad" },
];

interface SearchResult {
  id: number;
  type: "course" | "event" | "library" | "sermon" | "post";
  title: string;
  description?: string;
  url: string;
}

const TYPE_META: Record<string, { label: string; icon: typeof GraduationCap; color: string }> = {
  course: { label: "Curso", icon: GraduationCap, color: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" },
  event: { label: "Evento", icon: Calendar, color: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" },
  library: { label: "Biblioteca", icon: Library, color: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300" },
  sermon: { label: "Sermon", icon: FileText, color: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300" },
  post: { label: "Publicación", icon: MessageSquare, color: "bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300" },
};

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [, navigate] = useLocation();
  const { user } = useAuth();
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  // Build nav items based on auth state
  const NAV_ITEMS = user
    ? [...PUBLIC_NAV_ITEMS, ...MEMBER_NAV_ITEMS]
    : PUBLIC_NAV_ITEMS;

  // ⌘K / Ctrl+K shortcut
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const doSearch = useCallback(async (q: string) => {
    if (q.length < 2) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      if (res.ok) {
        const data = await res.json();
        setResults(data.results || []);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => doSearch(query), 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, doSearch]);

  function handleSelect(href: string) {
    setOpen(false);
    setQuery("");
    setResults([]);
    navigate(href);
  }

  // Filter nav items based on query
  const filteredNav = query.length > 0
    ? NAV_ITEMS.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase())
      )
    : NAV_ITEMS;

  // Group nav items by category
  const navGroups = filteredNav.reduce(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, typeof PUBLIC_NAV_ITEMS>
  );

  return (
    <>
      {/* Search trigger button */}
      <Button
        variant="outline"
        size="sm"
        className="hidden md:flex items-center gap-2 text-muted-foreground h-9 px-3 w-[200px] lg:w-[260px] justify-start"
        onClick={() => setOpen(true)}
        aria-label="Búsqueda global"
      >
        <Search className="h-4 w-4" />
        <span className="text-sm">Buscar...</span>
        <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      {/* Mobile search icon */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setOpen(true)}
        aria-label="Búsqueda global"
      >
        <Search className="h-5 w-5" />
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Buscar cursos, eventos, sermones, biblioteca..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList className="max-h-[400px]">
          <CommandEmpty>
            {loading ? (
              <div className="flex items-center justify-center gap-2 py-4">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                <span className="text-sm text-muted-foreground">Buscando...</span>
              </div>
            ) : (
              <span>No se encontraron resultados.</span>
            )}
          </CommandEmpty>

          {/* Dynamic search results */}
          {results.length > 0 && (
            <CommandGroup heading="Resultados">
              {results.map((r) => {
                const meta = TYPE_META[r.type];
                const Icon = meta?.icon || FileText;
                return (
                  <CommandItem
                    key={`${r.type}-${r.id}`}
                    value={`${r.type}-${r.title}`}
                    onSelect={() => handleSelect(r.url)}
                    className="flex items-center gap-3 py-3"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{r.title}</p>
                      {r.description && (
                        <p className="text-xs text-muted-foreground truncate">{r.description}</p>
                      )}
                    </div>
                    <Badge variant="outline" className={`text-[10px] shrink-0 ${meta?.color || ""}`}>
                      {meta?.label || r.type}
                    </Badge>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}

          {/* Navigation items (shown when no query or as fallback) */}
          {Object.entries(navGroups).map(([group, items]) => (
            <CommandGroup key={group} heading={group}>
              {items.map((item) => {
                const Icon = item.icon;
                return (
                  <CommandItem
                    key={item.href}
                    value={item.label}
                    onSelect={() => handleSelect(item.href)}
                    className="flex items-center gap-3"
                  >
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <span>{item.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
