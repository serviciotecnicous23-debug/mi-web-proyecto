/**
 * Los íconos del juego (docs/guia-visual.md, sección 10). Reemplazan a los emojis como imagen de las cosas:
 * - íconos de línea (lucide) para las acciones y los lugares, todos con el mismo trazo;
 * - íconos propios para lo del juego: el gozo (una llama en su moneda), la lámpara de aceite, el pan, la harina, el
 *   aceite, la oveja y el olivo.
 * Nada en forma de cruz: por eso el gozo es una llama y no la estrella de cuatro puntas, y no se usan la espada (su
 * guarda), la balanza (poste con travesaño), las estrellitas de cuatro puntas ni los íconos de iglesia o del «+».
 *
 * `<Ico e="🏠" />` dibuja el ícono de un emoji (o el emoji si todavía no tiene); `<ConIcono texto="🏠 Tu casa" />` cambia el
 * emoji del principio de un texto por su ícono; `<Gozo n={120} />` es la moneda del juego.
 */
import type { ComponentType, ReactNode } from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import {
  Amphora, Armchair, Bed, BookOpen, BrickWall, Brush, CalendarDays, Cloud, CloudRain, CloudSun, Coins, Crown, Dices, Droplet, Eye, Feather, Flame, Footprints, Gavel, Gift,
  GraduationCap, Grape, Hammer, HandHeart, Handshake, Hourglass, House, Key, Landmark, Leaf, Library, Mail, Map as Mapa, Medal, Megaphone,
  MessageCircle, Moon, Mountain, Music, Package, PenLine, Pickaxe, ScrollText, Search, Shield, Shirt, ShoppingBasket, Shovel, Soup, Sprout,
  Store, Sun, Tent, TreePine, Trophy, Users, Waves, Wheat, Wrench,
  Bird, Brain, ChartNoAxesColumnIncreasing, DoorOpen, Droplets, Flower, Gem, Hand, Layers, PartyPopper, Ribbon, Sofa, Star, Sunrise, UserRound,
} from "lucide-react";

type IconoProps = { className?: string; "aria-hidden"?: boolean };
type Icono = ComponentType<IconoProps>;

// ---------------------------------------------------------------- los íconos propios (24 × 24, el mismo trazo)
const TINTA = "#5a3a1e";

/** El gozo: una llama en su moneda de oro viejo (el fuego del ministerio). */
export function IcoGozo({ className }: IconoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#e3b448" stroke="#8a5a14" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="7.6" fill="none" stroke="#f6d98b" strokeWidth="1" />
      <path
        d="M12 5.6c1.9 2.2 3.9 4 3.9 7a3.9 3.9 0 0 1-7.8 0c0-1.6.7-2.8 1.7-3.8.2 1.4 1 2.2 1.8 2.4-.5-2-.3-3.9.4-5.6z"
        fill="#fff4d6"
        stroke="#8a5a14"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** La lámpara de aceite de barro, con su llama. */
export function IcoLampara({ className }: IconoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke={TINTA} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.5 15.5c0-2 3.6-3.4 8.5-3.4 3 0 5.2.5 6.6 1.3l2.4-1.4c.4 1.6-.5 3-1.9 3.6-1.4 1.6-4 2.6-7.1 2.6-4.9 0-8.5-1.2-8.5-2.7z" fill="#c98a5a" />
      <path d="M9 12.4c.6-.7 1.8-1 3-.9" />
      <path d="M20.6 12c.2-1.3-.4-2.6-1.2-3.4.7 1.6-.8 1.8-.6 3" fill="#ffd36b" stroke="#c77a1a" />
    </svg>
  );
}

/** El pan: una hogaza redonda con sus cortes. */
export function IcoPan({ className }: IconoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke={TINTA} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="13" rx="8.5" ry="5.8" fill="#d9a95a" />
      <path d="M7.5 11.5l2 2.5M11 10.5l2 3M14.5 10.5l2 2.6" />
    </svg>
  );
}

/** La flor de harina: un saco atado. */
export function IcoHarina({ className }: IconoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke={TINTA} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.2 6.4 9.5 3.6h5l1.3 2.8" />
      <path d="M7.6 7.4c-2.3 2.4-3.4 5.3-3.4 8 0 3.2 3.2 5 7.8 5s7.8-1.8 7.8-5c0-2.7-1.1-5.6-3.4-8z" fill="#efe1bd" />
      <path d="M7.6 7.4h8.8" />
      <path d="M12 11.5v5M10 13.2l2 1.4 2-1.4" />
    </svg>
  );
}

/** El aceite: una vasija con una gota. */
export function IcoAceite({ className }: IconoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke={TINTA} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 3.5h5M10 3.5v2.2c-3 1.2-5 3.9-5 7.3 0 4 3.1 7.5 7 7.5s7-3.5 7-7.5c0-3.4-2-6.1-5-7.3V3.5" fill="#b8673a" />
      <path d="M12 10.2c1.2 1.6 2 2.6 2 3.6a2 2 0 0 1-4 0c0-1 .8-2 2-3.6z" fill="#d9c44a" stroke="#7a6a14" />
    </svg>
  );
}

/** La oveja: su lana, su cara y sus orejas. */
export function IcoOveja({ className }: IconoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke={TINTA} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path
        d="M6.5 9.5a2.6 2.6 0 0 1 3.4-3 2.8 2.8 0 0 1 4.6-.6 2.6 2.6 0 0 1 3.9 2.1 2.6 2.6 0 0 1 .8 4.6 2.7 2.7 0 0 1-2.6 3.6 2.8 2.8 0 0 1-4.4.8 2.7 2.7 0 0 1-4.2-1.4A2.6 2.6 0 0 1 6.5 9.5z"
        fill="#f5f1e6"
      />
      <ellipse cx="12" cy="12" rx="2.6" ry="3.3" fill="#3b2a1e" stroke="#3b2a1e" />
      <path d="M9.6 10.6 7.6 9.8M14.4 10.6l2-0.8" />
      <path d="M10.6 17.4v2.6M13.4 17.4v2.6" />
    </svg>
  );
}

/** El olivo: una rama con sus hojas y una aceituna. */
export function IcoOlivo({ className }: IconoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="#4f6a2c" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20c4-3 8-7.5 13.5-15" stroke={TINTA} />
      <path d="M8.5 15.6c-2.4-.2-3.8-1.4-4.2-3.3 2.2-.2 3.7.8 4.2 3.3zM12 11.6c-.2-2.4.8-4 2.6-4.6.4 2.2-.4 3.8-2.6 4.6zM12.6 13.6c2.4 0 3.9 1.1 4.4 3-2.2.3-3.8-.7-4.4-3z" fill="#7a8a4a" />
      <ellipse cx="16.8" cy="9.6" rx="1.7" ry="2.2" fill="#3b4a2a" stroke="#3b4a2a" />
    </svg>
  );
}

// ---------------------------------------------------------------- de cada emoji, su ícono
/** Con el color de la paleta (los de línea toman el color del texto, o este). */
const ICONOS: Record<string, { c: Icono; color?: string }> = {
  "✨": { c: IcoGozo },
  "🪔": { c: IcoLampara },
  "🍞": { c: IcoPan },
  "🫓": { c: IcoPan },
  "🌾": { c: Wheat, color: "#a87a1e" },
  "🌱": { c: Sprout, color: "#4f7a37" },
  "🌿": { c: Leaf, color: "#4f7a37" },
  "🫒": { c: IcoOlivo },
  "🐑": { c: IcoOveja },
  "🏠": { c: House, color: "#8a5a32" },
  "🏡": { c: House, color: "#8a5a32" },
  "🧱": { c: BrickWall, color: "#a8603a" },
  "📖": { c: BookOpen, color: "#6b4a2e" },
  "📚": { c: Library, color: "#6b4a2e" },
  "📜": { c: ScrollText, color: "#8a6a42" },
  "🏺": { c: Amphora, color: "#a8603a" },
  "👘": { c: Shirt, color: "#5b4a8a" },
  "🥻": { c: Shirt, color: "#5b4a8a" },
  "🪑": { c: Armchair, color: "#8a5a32" },
  "🛏️": { c: Bed, color: "#8a5a32" },
  "🛌": { c: Bed, color: "#8a5a32" },
  "🍲": { c: Soup, color: "#a8603a" },
  "🎓": { c: GraduationCap, color: "#27468f" },
  "💬": { c: MessageCircle, color: "#5a6a7a" },
  "🔎": { c: Search, color: "#5a6a7a" },
  "🔍": { c: Search, color: "#5a6a7a" },
  "✉️": { c: Mail, color: "#8a6a42" },
  "📯": { c: Megaphone, color: "#a87a1e" },
  "⚖️": { c: Gavel, color: "#6b4a2e" },
  "👑": { c: Crown, color: "#b88a1e" },
  "🕯️": { c: Flame, color: "#c77a1a" },
  "🔥": { c: Flame, color: "#c77a1a" },
  "🧺": { c: ShoppingBasket, color: "#a87a1e" },
  "🎲": { c: Dices, color: "#5a3a1e" },
  "🪨": { c: Mountain, color: "#7d7466" },
  "🔨": { c: Hammer, color: "#6b4a2e" },
  "🧹": { c: Brush, color: "#8a6a42" },
  "💧": { c: Droplet, color: "#2f6aa8" },
  "🪣": { c: Droplet, color: "#2f6aa8" },
  "🏆": { c: Trophy, color: "#b88a1e" },
  "🥇": { c: Medal, color: "#b88a1e" },
  "🎖️": { c: Medal, color: "#b88a1e" },
  "🏅": { c: Medal, color: "#b88a1e" },
  "🌙": { c: Moon, color: "#5b4a8a" },
  "👀": { c: Eye, color: "#5a6a7a" },
  "👁️": { c: Eye, color: "#5a6a7a" },
  "🎁": { c: Gift, color: "#a3243b" },
  "👥": { c: Users, color: "#5a6a7a" },
  "🏪": { c: Store, color: "#8a5a32" },
  "🏛️": { c: Landmark, color: "#7d7466" },
  "🗺️": { c: Mapa, color: "#4f6a2c" },
  "📅": { c: CalendarDays, color: "#a3243b" },
  "🧰": { c: Package, color: "#8a5a32" },
  "🤝": { c: Handshake, color: "#8a5a32" },
  "✂️": { c: Wrench, color: "#5a6a7a" },
  "🔧": { c: Wrench, color: "#5a6a7a" },
  "⛏️": { c: Pickaxe, color: "#6b4a2e" },
  "🪏": { c: Shovel, color: "#6b4a2e" },
  "⏳": { c: Hourglass, color: "#8a6a42" },
  "☀️": { c: Sun, color: "#c77a1a" },
  "🌳": { c: TreePine, color: "#4f6a2c" },
  "🌊": { c: Waves, color: "#2f6aa8" },
  "🎵": { c: Music, color: "#5b4a8a" },
  "🎶": { c: Music, color: "#5b4a8a" },
  "🛡️": { c: Shield, color: "#5a6a7a" },
  "👣": { c: Footprints, color: "#6b4a2e" },
  "🪶": { c: Feather, color: "#5a6a7a" },
  "✒️": { c: PenLine, color: "#3b2a1e" },
  "✍️": { c: PenLine, color: "#3b2a1e" },
  "🍇": { c: Grape, color: "#5b2a6e" },
  "🙏": { c: HandHeart, color: "#a3243b" },
  "💰": { c: Coins, color: "#b88a1e" },
  "🪙": { c: Coins, color: "#b88a1e" },
  "⛺": { c: Tent, color: "#6b4a2e" },
  "🔑": { c: Key, color: "#b88a1e" },
  "🌧️": { c: CloudRain, color: "#4a6a8a" },
  "☁️": { c: Cloud, color: "#6a7a8a" },
  "🌤️": { c: CloudSun, color: "#c77a1a" },
  "⛅": { c: CloudSun, color: "#c77a1a" },
  "🤲": { c: HandHeart, color: "#a3243b" },
  "🧑‍🌾": { c: Wheat, color: "#a87a1e" },
  "🏘️": { c: House, color: "#8a5a32" },
  "🛒": { c: ShoppingBasket, color: "#a87a1e" },
  "📦": { c: Package, color: "#8a5a32" },
  "🪵": { c: TreePine, color: "#6b4a2e" },
  // las espadas cruzadas forman una equis: se dibujan como un escudo
  "⚔️": { c: Shield, color: "#5a6a7a" },
  "🙌": { c: HandHeart, color: "#a3243b" },
  "📋": { c: ScrollText, color: "#8a6a42" },
  "🕊️": { c: Bird, color: "#7a8a9a" },
  "🐦": { c: Bird, color: "#7a8a9a" },
  "🎺": { c: Megaphone, color: "#b88a1e" },
  "🎉": { c: PartyPopper, color: "#a3243b" },
  "🚪": { c: DoorOpen, color: "#8a5a32" },
  "🌅": { c: Sunrise, color: "#c77a1a" },
  "👏": { c: Hand, color: "#a8603a" },
  "🎗️": { c: Ribbon, color: "#a3243b" },
  "🌸": { c: Flower, color: "#c96a8a" },
  "⛲": { c: Droplets, color: "#2f6aa8" },
  "🛋️": { c: Sofa, color: "#8a5a32" },
  "🩴": { c: Footprints, color: "#7a5634" },
  "🧥": { c: Shirt, color: "#5b4a8a" },
  "🧣": { c: Shirt, color: "#a3243b" },
  "🧕": { c: UserRound, color: "#8a6a7a" },
  "👳": { c: UserRound, color: "#2f5aa8" },
  "🧓": { c: UserRound, color: "#7d7466" },
  "👴": { c: UserRound, color: "#7d7466" },
  "🧑‍🏫": { c: GraduationCap, color: "#27468f" },
  "🫙": { c: Amphora, color: "#a8603a" },
  "💎": { c: Gem, color: "#2f6aa8" },
  "🪕": { c: Music, color: "#8a5a32" },
  "⭐": { c: Star, color: "#b88a1e" },
  "🎴": { c: Layers, color: "#a3243b" },
  "🃏": { c: Brain, color: "#5b4a8a" },
  "🪜": { c: ChartNoAxesColumnIncreasing, color: "#8a5a32" },
};

/** Los emojis que tienen ícono (para separarlos del texto). */
const CLAVES = Object.keys(ICONOS).sort((a, b) => b.length - a.length);

/** ¿Tiene ícono este emoji? */
export function tieneIcono(e: string): boolean {
  return e in ICONOS || e.replace("️", "") in ICONOS;
}

/** El ícono de un emoji (o el emoji mismo si todavía no tiene). Mide 1 em: toma el tamaño de la letra. */
export function Ico({ e, className = "" }: { e: string; className?: string }) {
  const def = ICONOS[e] ?? ICONOS[e.replace("️", "")];
  if (!def) return <span className={className} aria-hidden="true">{e}</span>;
  const C = def.c;
  return (
    <span className={`inline-flex shrink-0 items-center justify-center align-[-0.15em] ${className}`} style={def.color ? { color: def.color } : undefined} aria-hidden="true">
      <C className="h-[1.15em] w-[1.15em]" aria-hidden />
    </span>
  );
}

/** Un texto que empieza con un emoji (por ejemplo «🏠 Tu casa»): el emoji se dibuja como su ícono. */
export function ConIcono({ texto, className = "" }: { texto: string; className?: string }) {
  const e = CLAVES.find((k) => texto.startsWith(k));
  if (!e) return <>{texto}</>;
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <Ico e={e} />
      <span>{texto.slice(e.length).trimStart()}</span>
    </span>
  );
}

/** La moneda del juego: la llama del gozo y la cantidad. */
export function Gozo({ n, className = "" }: { n: ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 whitespace-nowrap tabular-nums ${className}`}>
      <IcoGozo className="h-[1.1em] w-[1.1em] shrink-0 align-[-0.15em]" />
      {n}
    </span>
  );
}

// ---------------------------------------------------------------- para lo que se arma como HTML (los letreros 3D)
const svgs = new Map<string, string | null>();

/** El dibujo (HTML con su SVG) del ícono de un emoji, o null si no tiene. Se dibuja una vez y se guarda. */
export function htmlDeIcono(e: string): string | null {
  if (svgs.has(e)) return svgs.get(e) ?? null;
  let html: string | null = null;
  if ((ICONOS[e] ?? ICONOS[e.replace("️", "")]) && typeof document !== "undefined") {
    try {
      const div = document.createElement("div");
      const raiz = createRoot(div);
      flushSync(() => raiz.render(<Ico e={e} />));
      html = div.innerHTML || null;
      raiz.unmount();
    } catch {
      html = null;
    }
  }
  svgs.set(e, html);
  return html;
}

/** Un texto en HTML que empieza con un emoji (los letreros 3D de los círculos): el emoji pasa a su ícono. */
export function htmlConIcono(html: string): string {
  const e = CLAVES.find((k) => html.startsWith(k));
  if (!e) return html;
  const ico = htmlDeIcono(e);
  return ico ? `<span class="tpl-ico">${ico}</span>${html.slice(e.length)}` : html;
}
