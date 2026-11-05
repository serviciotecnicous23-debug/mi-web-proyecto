// Volver a donde estabas después de iniciar sesión (por ejemplo, al abrir un aviso
// de la campana o recargar una página protegida). Solo se aceptan rutas internas
// ("/capacitaciones/2"), nunca "//otro-sitio" ni "https://…", para que el enlace
// de login no sirva para mandar a nadie fuera de la web.

export function loginUrl(path: string = window.location.pathname + window.location.search): string {
  return `/login?redirect=${encodeURIComponent(path)}`;
}

export function postLoginPath(): string {
  const target = new URLSearchParams(window.location.search).get("redirect");
  if (target && target.startsWith("/") && !target.startsWith("//") && !target.startsWith("/\\") && !target.startsWith("/login")) {
    return target;
  }
  return "/";
}
