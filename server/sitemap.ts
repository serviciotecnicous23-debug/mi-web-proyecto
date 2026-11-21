/**
 * /sitemap.xml: la lista de páginas públicas que se les da a Google y a Bing (21-nov-2026). Antes eran 17 páginas
 * fijas, todas con la fecha del día como «última modificación» (Google deja de creerle a esa fecha si siempre es hoy).
 * Ahora:
 * - van las páginas públicas de siempre y la portada de la academia;
 * - con la academia abierta (se ve sin cuenta), también su catálogo, sus recursos, el reglamento, la declaración de
 *   fe, cada nivel, cada especialidad y cada materia que ya se puede estudiar;
 * - sin «lastmod»: mejor no decir una fecha que no se sabe.
 * Lo que robots.txt cierra (/admin, /api, /perfil…) nunca entra: lo comprueba server/sitemap.test.ts.
 */
import { ESPECIALIDADES, NIVELES, todasLasMaterias } from "@shared/academia";

type Pagina = { loc: string; prioridad: string; frecuencia: "daily" | "weekly" | "monthly" | "yearly" };

const FIJAS: Pagina[] = [
  { loc: "/", prioridad: "1.0", frecuencia: "weekly" },
  { loc: "/bienvenida", prioridad: "0.8", frecuencia: "monthly" },
  { loc: "/historia", prioridad: "0.8", frecuencia: "monthly" },
  { loc: "/equipo", prioridad: "0.7", frecuencia: "monthly" },
  { loc: "/en-vivo", prioridad: "0.9", frecuencia: "daily" },
  { loc: "/radio", prioridad: "0.9", frecuencia: "daily" },
  { loc: "/eventos", prioridad: "0.9", frecuencia: "weekly" },
  { loc: "/capacitaciones", prioridad: "0.8", frecuencia: "weekly" },
  { loc: "/academia", prioridad: "0.9", frecuencia: "weekly" },
  { loc: "/contacto", prioridad: "0.7", frecuencia: "yearly" },
  { loc: "/comunidad", prioridad: "0.7", frecuencia: "daily" },
  { loc: "/biblioteca", prioridad: "0.7", frecuencia: "weekly" },
  { loc: "/oracion", prioridad: "0.8", frecuencia: "weekly" },
  { loc: "/regiones", prioridad: "0.6", frecuencia: "monthly" },
  { loc: "/privacidad", prioridad: "0.3", frecuencia: "yearly" },
  { loc: "/terminos", prioridad: "0.3", frecuencia: "yearly" },
  { loc: "/login", prioridad: "0.3", frecuencia: "yearly" },
  { loc: "/registro", prioridad: "0.5", frecuencia: "yearly" },
];

/** Las páginas del mapa del sitio, en orden y sin repetir. */
export function paginasDelSitemap(academiaAbierta: boolean): Pagina[] {
  const paginas = [...FIJAS];
  if (academiaAbierta) {
    paginas.push(
      { loc: "/academia/catalogo", prioridad: "0.8", frecuencia: "weekly" },
      { loc: "/academia/recursos", prioridad: "0.6", frecuencia: "monthly" },
      { loc: "/academia/reglamento", prioridad: "0.4", frecuencia: "yearly" },
      { loc: "/academia/declaracion-de-fe", prioridad: "0.5", frecuencia: "yearly" },
    );
    for (const n of NIVELES) paginas.push({ loc: `/academia/nivel/${n.n}`, prioridad: "0.7", frecuencia: "monthly" });
    for (const e of ESPECIALIDADES) paginas.push({ loc: `/academia/especialidad/${e.id}`, prioridad: "0.6", frecuencia: "monthly" });
    for (const m of todasLasMaterias()) {
      if (m.disponible) paginas.push({ loc: `/academia/materia/${m.id}`, prioridad: "0.6", frecuencia: "monthly" });
    }
  }
  const vistas = new Set<string>();
  return paginas.filter((p) => (vistas.has(p.loc) ? false : (vistas.add(p.loc), true)));
}

const escapar = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** El XML del mapa del sitio, con las direcciones completas (`siteUrl` sin barra final). */
export function armarSitemap(siteUrl: string, academiaAbierta: boolean): string {
  const base = siteUrl.replace(/\/+$/, "");
  const urls = paginasDelSitemap(academiaAbierta)
    .map(
      (p) => `  <url>
    <loc>${escapar(`${base}${p.loc}`)}</loc>
    <changefreq>${p.frecuencia}</changefreq>
    <priority>${p.prioridad}</priority>
  </url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}
