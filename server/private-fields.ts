import type { NextFunction, Request, Response } from "express";

// Campos de `users` que nunca deben salir del servidor. Varias rutas devolvían la
// fila completa (p. ej. GET /api/users/:id, a cualquier miembro con sesión, y
// GET /api/admin/users): con esto, aunque una ruta se olvide de limpiarla, el
// hash de la contraseña y el token de verificación no llegan al navegador.
const PRIVATE_FIELDS = new Set(["password", "emailVerifyToken", "emailVerifyExpires"]);

// Hay cuentas cuyo nombre de usuario es el correo de la persona, y la web muestra "@usuario"
// en Comunidad, mensajes, listas de alumnos y amigos: cualquiera veía ese correo. A quien no es
// la propia persona ni de la administración se le entrega un alias (sacado del nombre visible).
// Lo mismo con el correo y el teléfono de otras personas: solo los ven la administración y los
// maestros (el panel del maestro muestra el correo de sus alumnos).
const PARECE_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ROLES_ADMINISTRACION = new Set(["admin", "director", "staff_global"]);
const ROLES_MAESTRO = new Set(["obrero", "maestro_ministerio", "maestro_iglesia", "admin_iglesia"]);
const DATOS_DE_CONTACTO = ["email", "phone"];

export type Visor = { id?: number; administracion: boolean; maestro: boolean };

const VISITANTE: Visor = { administracion: false, maestro: false };

/** Alias para mostrar en lugar de un nombre de usuario que es un correo. */
export function aliasPublico(displayName: unknown, id: unknown): string {
  const base =
    typeof displayName === "string"
      ? displayName
          .normalize("NFD")
          .replace(/[̀-ͯ]/g, "")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "")
          .slice(0, 30)
          .replace(/-+$/g, "")
      : "";
  if (base) return base;
  return typeof id === "number" ? `miembro-${id}` : "miembro";
}

export function visorDe(user: unknown): Visor {
  const u = user as { id?: unknown; role?: unknown } | undefined;
  if (!u || typeof u !== "object") return VISITANTE;
  const role = typeof u.role === "string" ? u.role : "";
  const administracion = ROLES_ADMINISTRACION.has(role);
  return {
    id: typeof u.id === "number" ? u.id : undefined,
    administracion,
    maestro: administracion || ROLES_MAESTRO.has(role),
  };
}

export function stripPrivateFields(
  value: unknown,
  depth = 0,
  visor: Visor = { administracion: true, maestro: true },
  personaDelPadre?: number,
): unknown {
  if (value === null || typeof value !== "object" || depth > 10) return value;
  if (value instanceof Date || Buffer.isBuffer(value)) return value;
  if (Array.isArray(value)) return value.map((item) => stripPrivateFields(item, depth + 1, visor));
  const source = value as Record<string, unknown>;
  // El autor anidado sin id (post.user = { username, displayName }) es la persona de su padre
  // (post.userId). Solo en "user" y "author": "friend", "teacher", etc. son otras personas.
  const userIdPropio = typeof source.userId === "number" ? source.userId : undefined;
  const out: Record<string, unknown> = {};
  for (const [key, item] of Object.entries(source)) {
    if (PRIVATE_FIELDS.has(key)) continue;
    const autor = key === "user" || key === "author" ? userIdPropio : undefined;
    out[key] = stripPrivateFields(item, depth + 1, visor, autor);
  }

  // Solo objetos que representan a una persona (traen nombre de usuario).
  if (!visor.administracion && typeof source.username === "string") {
    // En una fila "aplanada" (p. ej. una publicación con los datos del autor) la persona es
    // userId; en un objeto de usuario, su id; en un autor anidado sin id, la de su padre.
    const personaId = userIdPropio ?? (typeof source.id === "number" ? source.id : personaDelPadre);
    const esPropio = visor.id !== undefined && personaId === visor.id;
    if (!esPropio) {
      if (PARECE_CORREO.test(source.username)) out.username = aliasPublico(source.displayName, personaId);
      if (!visor.maestro) for (const campo of DATOS_DE_CONTACTO) delete out[campo];
    }
  }
  return out;
}

export function privateFieldsFilter(req: Request, res: Response, next: NextFunction) {
  const json = res.json.bind(res);
  // El visor se mira al responder: para entonces la sesión (passport) ya está cargada.
  res.json = (body?: unknown) => json(stripPrivateFields(body, 0, visorDe(req.user)));
  next();
}
