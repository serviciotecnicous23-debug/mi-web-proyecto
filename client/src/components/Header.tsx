import { Link, useLocation } from 'wouter'
import {
  LogOut,
  User,
  Shield,
  Menu,
  X,
  MessageSquare,
  GraduationCap,
  BookOpen,
  Library,
  Bell,
  Heart,
  Globe,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { useState } from 'react'
import { LogoIcon } from './LogoIcon'

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/historia', label: 'Historia' },
  { href: '/equipo', label: 'Equipo' },
  { href: '/eventos', label: 'Eventos' },
  { href: '/capacitaciones', label: 'Capacitaciones' },
  { href: '/biblioteca', label: 'Biblioteca' },
  { href: '/sermones', label: 'Sermones' },
  { href: '/oracion', label: 'Oración' },
  { href: '/grupos', label: 'Grupos' },
  { href: '/calendario', label: 'Calendario' },
  { href: '/regiones', label: 'Regiones' },
  { href: '/iglesias', label: 'Iglesias' },
  { href: '/alianza', label: 'Alianza' },
  { href: '/ficha-ministerial', label: 'Maestros' },
  { href: '/radio', label: 'Radio' },
  { href: '/en-vivo', label: 'En Vivo' },
  { href: '/contacto', label: 'Contacto' },
]

export function Navbar() {
  const [location] = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="border-b bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <img src="/icons/icon-192.png?v=6" alt="Logo" className="w-8 h-8 rounded-md" />
          <span className="font-bold text-lg hidden sm:inline">Avivando el Fuego</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href}>
              <Button
                variant={location === l.href || (l.href !== '/' && location.startsWith(l.href)) ? 'secondary' : 'ghost'}
                size="sm"
              >
                {l.label}
              </Button>
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Iniciar Sesión
            </Button>
          </Link>
          <Link href="/registro">
            <Button size="sm">
              <LogoIcon className="w-4 h-4 mr-1" />
              Unirse
            </Button>
          </Link>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t bg-background px-4 pb-4 pt-2 flex flex-col gap-1">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
              <Button variant={location === l.href ? 'secondary' : 'ghost'} className="w-full justify-start" size="sm">
                {l.label}
              </Button>
            </Link>
          ))}
          <div className="border-t my-2" />
          <Link href="/login" onClick={() => setMenuOpen(false)}>
            <Button variant="ghost" className="w-full justify-start" size="sm">
              Iniciar Sesión
            </Button>
          </Link>
          <Link href="/registro" onClick={() => setMenuOpen(false)}>
            <Button className="w-full" size="sm">
              Unirse al Ministerio
            </Button>
          </Link>
        </div>
      )}
    </nav>
  )
}

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img src="/icons/icon-192.png?v=6" alt="Logo" className="w-7 h-7 rounded-md" />
              <span className="font-bold text-lg">Avivando el Fuego</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Ministerio evangelístico internacional. Desde 2017, Ciudad Bolívar, Venezuela.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Sede Principal</h4>
            <p className="text-sm text-muted-foreground">Austin, Texas, USA</p>
            <p className="text-sm text-muted-foreground">Iglesia Casa del Alfarero</p>
            <p className="text-sm text-muted-foreground mt-2">
              Alianza Pastoral: Pastores Carlo y Trinibeth Chevez
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Alianza Global</h4>
            <p className="text-sm text-muted-foreground">Venezuela · Perú · USA</p>
            <p className="text-sm text-muted-foreground mt-1">Red de iglesias autonomas unidas por el fuego</p>
            <p className="text-sm text-muted-foreground mt-2 italic">
              "No apaguéis el Espíritu" - 1 Tesalonicenses 5:19
            </p>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            Avivando el Fuego - Ministerio Evangelistico Internacional
          </p>
        </div>
      </div>
    </footer>
  )
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
