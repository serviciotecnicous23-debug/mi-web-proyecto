/**
 * Las pocas rutas de la API que usan las piezas de todas las páginas (la sesión, la radio del menú y la portada), sin zod ni el
 * esquema de la base de datos. shared/routes.ts sigue siendo la fuente completa (con la validación); la prueba
 * shared/rutas-livianas.test.ts comprueba que estas rutas sean exactamente las mismas que las de allí.
 */
export const RUTAS = {
  auth: { me: "/api/user", login: "/api/login", register: "/api/register", logout: "/api/logout" },
  radio: { station: "/api/radio/station" },
  /** Lo que muestra la portada: los eventos, las inscripciones del miembro y el resumen del club de lectura. */
  events: { list: "/api/events" },
  enrollments: { list: "/api/enrollments" },
  club: { summary: "/api/club/summary" },
  admin: {
    listRadioLibrary: "/api/admin/radio-library",
    uploadRadioTrack: "/api/admin/radio-library/:category/upload",
    deleteRadioTrack: "/api/admin/radio-library/:category/:fileName",
  },
} as const;

/** Pone los parámetros en una ruta (":category" → valor), igual que buildUrl de shared/routes.ts. */
export function conParametros(ruta: string, params?: Record<string, string | number>): string {
  let url = ruta;
  if (params) for (const [k, v] of Object.entries(params)) url = url.replace(`:${k}`, String(v));
  return url;
}
