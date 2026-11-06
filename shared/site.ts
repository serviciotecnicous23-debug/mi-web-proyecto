// Dirección OFICIAL de la web. Render también la sirve en
// ministerio-avivando-el-fuego.onrender.com, pero esa es solo la del servidor: si
// Google la ve como "canónica", trata cada página como copia de la portada de Render.
export const SITE_ORIGIN = "https://ministerioavivandoelfuego.com";

/** La URL del sitio para enlaces públicos: la de la variable SITE_URL si es buena, o la oficial. */
export function resolveSiteUrl(envValue?: string | null): string {
  const value = (envValue || "").trim().replace(/\/+$/, "");
  if (!value || /\.onrender\.com$/i.test(value.replace(/^https?:\/\//i, "").split("/")[0])) {
    return SITE_ORIGIN;
  }
  try {
    return new URL(value).origin;
  } catch {
    return SITE_ORIGIN;
  }
}
