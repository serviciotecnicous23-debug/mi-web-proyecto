// El título de la pestaña de cada página (20-nov-2026). Antes solo lo ponía server/seo.ts en la primera página que se
// cargaba, y al navegar dentro de la web quedaba ese mismo (se entraba por /equipo, se iba a /contacto y la pestaña
// seguía diciendo «Nuestro equipo»). Ahora lo usan los dos: server/seo.ts en la primera carga, con la descripción para
// los buscadores, y client/src/App.tsx al cambiar de ruta. shared/titulos.test.ts comprueba que digan lo mismo.
// Sin dependencias: lo carga el código de todas las páginas (nada de @shared/schema ni @shared/routes, regla del PR #112).

export const MARCA = "Avivando el Fuego";

/** El de la portada: el mismo de client/index.html. */
export const TITULO_GENERAL = "Ministerio Avivando el Fuego - Comunidad Cristiana Internacional";

const conMarca = (titulo: string) => `${titulo} — ${MARCA}`;

/** El de una dirección que no existe (la página de «Página no encontrada»). */
export const TITULO_NO_ENCONTRADA = conMarca("Página no encontrada");

/** El título de cada ruta de client/src/App.tsx, escrita como allí (con «:parámetro»). */
export const TITULOS = {
  "/": TITULO_GENERAL,
  // Las que server/seo.ts manda en la primera carga con su descripción (para los buscadores).
  "/radio": "Radio Avivando el Fuego — Escucha en vivo 24/7",
  "/biblioteca": conMarca("Biblia en línea gratis"),
  "/capacitaciones": conMarca("Capacitaciones y clases bíblicas"),
  "/en-vivo": conMarca("En vivo"),
  "/eventos": conMarca("Eventos"),
  "/oracion": conMarca("Pedir oración"),
  "/comunidad": conMarca("Comunidad"),
  "/bienvenida": `Bienvenido al Ministerio ${MARCA}`,
  "/privacidad": conMarca("Política de privacidad"),
  "/terminos": conMarca("Términos y normas de la comunidad"),
  "/historia": conMarca("Nuestra historia"),
  "/equipo": conMarca("Nuestro equipo"),
  "/regiones": conMarca("Regiones"),
  "/contacto": conMarca("Contacto"),
  "/registro": conMarca("Crear cuenta"),
  "/login": conMarca("Iniciar sesión"),
  // Las demás: solo el título de la pestaña.
  "/radio-live-scene": conMarca("Pantalla de la radio en vivo"),
  "/capacitaciones/:id": conMarca("Curso"),
  "/aula/:id": conMarca("Aula virtual"),
  "/forgot-password": conMarca("Recuperar la contraseña"),
  "/reset-password": conMarca("Nueva contraseña"),
  "/verificar-email": conMarca("Verificar el correo"),
  "/perfil": conMarca("Mi perfil"),
  "/admin": conMarca("Panel de administración"),
  "/mis-capacitaciones": conMarca("Mis capacitaciones"),
  "/maestro": conMarca("Panel del maestro"),
  "/iglesias": conMarca("Iglesias"),
  "/reportes": conMarca("Reportes y estadísticas"),
  // Planillas pone «Planillas · el curso» cuando llegan los datos; mientras tanto, este.
  "/planillas/:id": `Planillas · ${MARCA}`,
  "/mesa-prueba/:juego": conMarca("Mesa de prueba"), // solo en desarrollo
  "/finanzas": conMarca("Finanzas"),
  "/sermones": conMarca("Sermones y prédicas"),
  "/grupos": conMarca("Grupos pequeños"),
  "/calendario": conMarca("Calendario"),
  "/certificados": conMarca("Mis certificados"),
  "/alianza": conMarca("Alianza para la Gran Comisión"),
  "/ficha-ministerial": conMarca("Ficha ministerial"),
  "/ficha-ministerial/:userId": conMarca("Ficha ministerial"),
  "/mi-iglesia": conMarca("Mi iglesia"),
  "/buscar-iglesia": conMarca("Buscar iglesia aliada"),
} satisfies Record<string, string>;

/**
 * Las rutas (y lo que va debajo) cuya página pone su propio título con lo que muestra: la academia (la lección, la
 * materia…), Juegos (el juego) y Mensajes (los no leídos). Aquí no se tocan.
 */
const CON_TITULO_PROPIO = ["/academia", "/admin/academia", "/maestro/academia", "/mi-iglesia/academia", "/juegos", "/mensajes"];

/** La ruta sin la consulta, sin barras dobles y sin la barra del final (salvo la portada). */
export function normalizarRuta(ruta: string): string {
  const path = (ruta.split(/[?#]/)[0] || "/").replace(/\/{2,}/g, "/");
  return path.length > 1 ? path.replace(/\/+$/, "") || "/" : "/";
}

const EXACTAS = new Map<string, string>();
const CON_PARAMETROS: { partes: string[]; titulo: string }[] = [];
for (const [ruta, titulo] of Object.entries(TITULOS)) {
  if (ruta.includes("/:")) CON_PARAMETROS.push({ partes: ruta.split("/"), titulo });
  else EXACTAS.set(ruta, titulo);
}

/**
 * El título de la pestaña en esa ruta, o `null` si la página pone el suyo. Se busca como la encuentra wouter: sin
 * importar mayúsculas ni la barra del final. Si la ruta no existe, el de «Página no encontrada».
 */
export function tituloDeRuta(ruta: string): string | null {
  const r = normalizarRuta(ruta).toLowerCase();
  if (CON_TITULO_PROPIO.some((p) => r === p || r.startsWith(`${p}/`))) return null;
  const exacta = EXACTAS.get(r);
  if (exacta) return exacta;
  const partes = r.split("/");
  const conParametros = CON_PARAMETROS.find(
    (c) => c.partes.length === partes.length && c.partes.every((p, i) => p.startsWith(":") || p === partes[i]),
  );
  return conParametros ? conParametros.titulo : TITULO_NO_ENCONTRADA;
}
