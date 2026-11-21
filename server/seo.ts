import { SITE_ORIGIN } from "@shared/site";
import { RADIO_OFFICIAL_URL } from "@shared/radio";
import { TITULOS, TITULO_NO_ENCONTRADA, normalizarRuta, tituloDeRuta } from "@shared/titulos";
import { ESPECIALIDADES, NIVELES, leccionPorId, materiaPorId, todasLasMaterias } from "@shared/academia";
import { practicaPorId } from "./academia/laboratorio/index";

// Cabecera de cada página tal como la recibe Google. La web es una SPA: sin esto,
// todas las rutas salían con el título y la descripción de la portada, y con una
// "canónica" que apuntaba a la portada de onrender.com, así que Google trataba /radio
// como una copia de la portada.
// Los títulos salen de shared/titulos.ts: son los mismos que pone la web al navegar
// (shared/titulos.test.ts lo comprueba).

type PageMeta = { title: string; description: string; jsonLd?: object };

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
  // La radio tiene su propia página (enlace oficial para compartir).
  sameAs: [RADIO_OFFICIAL_URL],
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
    title: TITULOS["/radio"],
    description: RADIO_DESCRIPTION,
    jsonLd: RADIO_JSON_LD,
  },
  "/biblioteca": {
    title: TITULOS["/biblioteca"],
    description:
      "Lee la Biblia gratis en RV1960, NTV, LBLA y RV1909, sin crear cuenta. Con tu cuenta: resaltados, notas, planes de lectura y el Club de lectura.",
  },
  "/capacitaciones": {
    title: TITULOS["/capacitaciones"],
    description: "Cursos y clases bíblicas del Ministerio Avivando el Fuego, con maestros, aula virtual y certificados.",
  },
  "/en-vivo": {
    title: TITULOS["/en-vivo"],
    description: "Cultos y transmisiones en vivo del Ministerio Avivando el Fuego. Cuando no hay transmisión, la radio sigue al aire las 24 horas.",
  },
  "/eventos": {
    title: TITULOS["/eventos"],
    description: "Próximas actividades, cultos y encuentros del Ministerio Avivando el Fuego.",
  },
  "/oracion": {
    title: TITULOS["/oracion"],
    description: "Pide oración y ora por otros en el muro de oración del Ministerio Avivando el Fuego.",
  },
  "/comunidad": {
    title: TITULOS["/comunidad"],
    description: "La comunidad cristiana del Ministerio Avivando el Fuego: publicaciones, testimonios y reflexiones.",
  },
  "/bienvenida": {
    title: TITULOS["/bienvenida"],
    description:
      "Conoce el ministerio cristiano detrás de Avivando el Fuego Radio: quiénes somos, qué hacemos, dónde estamos y cómo dar tu primer paso. Todo es gratis.",
  },
  "/privacidad": {
    title: TITULOS["/privacidad"],
    description:
      "Qué datos tratamos en la web y en la app de la radio del Ministerio Avivando el Fuego, quién los ve, cómo los cuidamos y cómo eliminar tu cuenta.",
  },
  "/terminos": {
    title: TITULOS["/terminos"],
    description: "Las reglas de uso de la web y la radio del Ministerio Avivando el Fuego y las normas de la comunidad.",
  },
  "/historia": {
    title: TITULOS["/historia"],
    description: "Cómo nació el Ministerio Internacional Avivando el Fuego en Ciudad Bolívar, Venezuela, en 2017.",
  },
  "/equipo": {
    title: TITULOS["/equipo"],
    description: "Pastores y líderes del Ministerio Internacional Avivando el Fuego.",
  },
  "/regiones": {
    title: TITULOS["/regiones"],
    description: "Presencia del Ministerio Avivando el Fuego en Venezuela, Perú, Estados Unidos y otros países.",
  },
  "/contacto": {
    title: TITULOS["/contacto"],
    description: "Escríbenos para pedir oración, información o ayuda.",
  },
  "/registro": {
    title: TITULOS["/registro"],
    description: "Crea tu cuenta gratis para seguir planes de lectura, unirte a clases, al Club y a la comunidad.",
  },
  "/login": {
    title: TITULOS["/login"],
    description: "Entra a tu cuenta del Ministerio Avivando el Fuego.",
  },
};

// ---------------------------------------------------------------- la academia

/** El nombre de la academia en los títulos (el mismo de client/src/components/academia/titulo.ts). */
const TITULO_ACADEMIA = "Academia Avivando el Fuego";
const conAcademia = (t: string) => `${t} · ${TITULO_ACADEMIA}`;

/**
 * El título y la descripción de las páginas de la academia que van en el mapa del sitio (21-nov-2026). Antes salían con
 * los de la portada de la web: al compartir una materia por WhatsApp se veía la vista previa del ministerio. Los títulos
 * son los mismos que pone cada página al navegar. Devuelve null si la ruta no es una de ellas.
 */
export function metaDeAcademia(path: string): PageMeta | null {
  if (path === "/academia") {
    return {
      title: TITULO_ACADEMIA,
      description: `La academia bíblica del Ministerio Avivando el Fuego: ${NIVELES.length} niveles y ${ESPECIALIDADES.length} especialidades, con lecciones para leer y escuchar, exámenes con corrección automática y certificados. La inscripción es gratuita.`,
    };
  }
  if (path === "/academia/catalogo") {
    const n = todasLasMaterias().filter((m) => m.disponible).length;
    return { title: conAcademia("Catálogo de materias"), description: `Las ${n} materias de la Academia Avivando el Fuego, por nivel y por especialidad, con buscador.` };
  }
  if (path === "/academia/verificar") {
    return { title: conAcademia("Verificar un documento"), description: "Comprueba con su código si un certificado, un diploma o un carné de la Academia Avivando el Fuego es auténtico." };
  }
  if (path === "/academia/reglamento") {
    return { title: conAcademia("Reglamento académico"), description: "El reglamento académico de la Academia Avivando el Fuego: la inscripción, la evaluación, las notas, los certificados y el código de honor." };
  }
  if (path === "/academia/declaracion-de-fe") {
    return { title: conAcademia("Declaración de fe"), description: "Lo que cree y enseña la Academia Avivando el Fuego, artículo por artículo y con su base bíblica." };
  }
  if (path === "/academia/recursos") {
    return { title: conAcademia("Recursos de estudio"), description: "Los videos, audios, lecturas y guías de todas las materias de la Academia Avivando el Fuego, en un solo lugar y con buscador." };
  }
  const [, , tipo, id, ...resto] = path.split("/");
  if (!id || resto.length) return null;
  if (tipo === "materia") {
    const m = materiaPorId(id);
    return m ? { title: conAcademia(m.titulo), description: m.resumen } : null;
  }
  if (tipo === "nivel") {
    const n = NIVELES.find((x) => String(x.n) === id);
    return n ? { title: conAcademia(`Nivel ${n.n} · ${n.nombre}`), description: n.descripcion } : null;
  }
  if (tipo === "especialidad") {
    const e = ESPECIALIDADES.find((x) => x.id === id);
    return e ? { title: conAcademia(`Especialidad · ${e.nombre}`), description: e.resumen } : null;
  }
  if (tipo === "laboratorio") {
    const p = practicaPorId(id);
    const m = p ? materiaPorId(p.materia) : undefined;
    return p && m ? { title: conAcademia(p.titulo), description: `Práctica del laboratorio ministerial de ${m.titulo}. ${p.situacion}` } : null;
  }
  return null;
}

/** Las páginas de la academia con un id (materia, lección, nivel, especialidad o práctica) que no existe. */
function esPaginaDeAcademiaInexistente(path: string): boolean {
  const [, raiz, tipo, id, ...resto] = path.split("/");
  if (raiz !== "academia" || !id || resto.length) return false;
  if (tipo === "materia") return !materiaPorId(id);
  if (tipo === "leccion") return !leccionPorId(id);
  if (tipo === "nivel") return !NIVELES.some((x) => String(x.n) === id);
  if (tipo === "especialidad") return !ESPECIALIDADES.some((x) => x.id === id);
  if (tipo === "laboratorio") return !practicaPorId(id);
  return false;
}

function escapeAttr(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Ruta sin consulta, sin barra final (salvo la portada) y sin dobles barras: la misma con la que la web busca el título. */
export const canonicalPath = normalizarRuta;

function setMeta(html: string, pattern: RegExp, replacement: string): string {
  return pattern.test(html) ? html.replace(pattern, replacement) : html;
}

/**
 * Si la dirección no es ninguna página de la web (21-nov-2026). Antes respondían «200» como si existieran, y Google las
 * marcaba «soft 404». Ahora salen con «404» y la misma página, que muestra «Página no encontrada». Se decide con la
 * misma lista de rutas que los títulos (shared/titulos.ts), que shared/titulos.test.ts mantiene igual a la de App.tsx.
 */
export function esRutaInexistente(rawPath: string): boolean {
  return tituloDeRuta(rawPath) === TITULO_NO_ENCONTRADA || esPaginaDeAcademiaInexistente(canonicalPath(rawPath));
}

/** index.html con la canónica, el título, la descripción y los datos propios de la ruta. */
export function renderPageHtml(indexHtml: string, rawPath: string): string {
  const path = canonicalPath(rawPath);
  const url = `${SITE_ORIGIN}${path === "/" ? "/" : path}`;
  let html = indexHtml;

  html = setMeta(html, /<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${escapeAttr(url)}" />`);
  html = setMeta(html, /<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${escapeAttr(url)}" />`);

  const meta = PAGE_META[path] ?? metaDeAcademia(path);
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
