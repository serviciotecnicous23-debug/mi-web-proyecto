import { SITE_ORIGIN } from "@shared/site";

// Cabecera de cada página tal como la recibe Google. La web es una SPA: sin esto,
// todas las rutas salían con el título y la descripción de la portada, y con una
// "canónica" que apuntaba a la portada de onrender.com, así que Google trataba /radio
// como una copia de la portada.

type PageMeta = { title: string; description: string; jsonLd?: object };

const BRAND = "Avivando el Fuego";
const LOGO = `${SITE_ORIGIN}/icons/icon-512.png?v=6`;

const RADIO_DESCRIPTION =
  "Escucha en vivo la radio cristiana Avivando el Fuego: adoración, alabanza y prédicas las 24 horas. Gratis y sin crear cuenta, desde el celular o la computadora.";

// Datos de emisora para buscadores (schema.org). El ListenAction dice dónde se escucha.
const RADIO_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "RadioBroadcastService",
  "@id": `${SITE_ORIGIN}/radio#radio`,
  name: "Radio Avivando el Fuego",
  alternateName: "Avivando el Fuego Radio",
  url: `${SITE_ORIGIN}/radio`,
  description: RADIO_DESCRIPTION,
  inLanguage: "es",
  broadcastDisplayName: "Avivando el Fuego Radio",
  broadcastFrequency: "INTERNET_STREAM",
  broadcastTimezone: "America/Chicago",
  logo: LOGO,
  broadcaster: {
    "@type": "ReligiousOrganization",
    name: "Ministerio Internacional Avivando el Fuego",
    url: SITE_ORIGIN,
  },
  potentialAction: {
    "@type": "ListenAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_ORIGIN}/radio`,
      actionPlatform: ["https://schema.org/DesktopWebPlatform", "https://schema.org/MobileWebPlatform"],
    },
    expectsAcceptanceOf: { "@type": "Offer", price: 0, priceCurrency: "USD" },
  },
};

export const PAGE_META: Record<string, PageMeta> = {
  "/radio": {
    title: "Radio Avivando el Fuego — Escucha en vivo 24/7",
    description: RADIO_DESCRIPTION,
    jsonLd: RADIO_JSON_LD,
  },
  "/biblioteca": {
    title: `Biblia en línea gratis — ${BRAND}`,
    description:
      "Lee la Biblia gratis en RV1960, NTV, LBLA y RV1909, sin crear cuenta. Con tu cuenta: resaltados, notas, planes de lectura y el Club de lectura.",
  },
  "/capacitaciones": {
    title: `Capacitaciones y clases bíblicas — ${BRAND}`,
    description: "Cursos y clases bíblicas del Ministerio Avivando el Fuego, con maestros, aula virtual y certificados.",
  },
  "/en-vivo": {
    title: `En vivo — ${BRAND}`,
    description: "Cultos y transmisiones en vivo del Ministerio Avivando el Fuego. Cuando no hay transmisión, la radio sigue al aire las 24 horas.",
  },
  "/eventos": {
    title: `Eventos — ${BRAND}`,
    description: "Próximas actividades, cultos y encuentros del Ministerio Avivando el Fuego.",
  },
  "/oracion": {
    title: `Pedir oración — ${BRAND}`,
    description: "Pide oración y ora por otros en el muro de oración del Ministerio Avivando el Fuego.",
  },
  "/comunidad": {
    title: `Comunidad — ${BRAND}`,
    description: "La comunidad cristiana del Ministerio Avivando el Fuego: publicaciones, testimonios y reflexiones.",
  },
  "/historia": {
    title: `Nuestra historia — ${BRAND}`,
    description: "Cómo nació el Ministerio Internacional Avivando el Fuego en Ciudad Bolívar, Venezuela, en 2017.",
  },
  "/equipo": {
    title: `Nuestro equipo — ${BRAND}`,
    description: "Pastores y líderes del Ministerio Internacional Avivando el Fuego.",
  },
  "/regiones": {
    title: `Regiones — ${BRAND}`,
    description: "Presencia del Ministerio Avivando el Fuego en Venezuela, Perú, Estados Unidos y otros países.",
  },
  "/contacto": {
    title: `Contacto — ${BRAND}`,
    description: "Escríbenos para pedir oración, información o ayuda.",
  },
  "/registro": {
    title: `Crear cuenta — ${BRAND}`,
    description: "Crea tu cuenta gratis para seguir planes de lectura, unirte a clases, al Club y a la comunidad.",
  },
  "/login": {
    title: `Iniciar sesión — ${BRAND}`,
    description: "Entra a tu cuenta del Ministerio Avivando el Fuego.",
  },
};

function escapeAttr(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Ruta sin consulta, sin barra final (salvo la portada) y sin dobles barras. */
export function canonicalPath(rawPath: string): string {
  const path = (rawPath.split(/[?#]/)[0] || "/").replace(/\/{2,}/g, "/");
  return path.length > 1 ? path.replace(/\/+$/, "") || "/" : "/";
}

function setMeta(html: string, pattern: RegExp, replacement: string): string {
  return pattern.test(html) ? html.replace(pattern, replacement) : html;
}

/** index.html con la canónica, el título, la descripción y los datos propios de la ruta. */
export function renderPageHtml(indexHtml: string, rawPath: string): string {
  const path = canonicalPath(rawPath);
  const url = `${SITE_ORIGIN}${path === "/" ? "/" : path}`;
  let html = indexHtml;

  html = setMeta(html, /<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${escapeAttr(url)}" />`);
  html = setMeta(html, /<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${escapeAttr(url)}" />`);

  const meta = PAGE_META[path];
  if (!meta) return html;

  const title = escapeAttr(meta.title);
  const description = escapeAttr(meta.description);
  html = setMeta(html, /<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
  html = setMeta(html, /<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${description}" />`);
  html = setMeta(html, /<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${title}" />`);
  html = setMeta(html, /<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${description}" />`);
  html = setMeta(html, /<meta name="twitter:title" content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${title}" />`);
  html = setMeta(html, /<meta name="twitter:description" content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${description}" />`);

  if (meta.jsonLd) {
    const json = JSON.stringify(meta.jsonLd).replace(/</g, "\\u003c");
    html = html.replace("</head>", `  <script type="application/ld+json">${json}</script>\n  </head>`);
  }
  return html;
}
