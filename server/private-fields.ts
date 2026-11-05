import type { NextFunction, Request, Response } from "express";

// Campos de `users` que nunca deben salir del servidor. Varias rutas devolvían la
// fila completa (p. ej. GET /api/users/:id, a cualquier miembro con sesión, y
// GET /api/admin/users): con esto, aunque una ruta se olvide de limpiarla, el
// hash de la contraseña y el token de verificación no llegan al navegador.
const PRIVATE_FIELDS = new Set(["password", "emailVerifyToken", "emailVerifyExpires"]);

export function stripPrivateFields(value: unknown, depth = 0): unknown {
  if (value === null || typeof value !== "object" || depth > 10) return value;
  if (value instanceof Date || Buffer.isBuffer(value)) return value;
  if (Array.isArray(value)) return value.map((item) => stripPrivateFields(item, depth + 1));
  const out: Record<string, unknown> = {};
  for (const [key, item] of Object.entries(value as Record<string, unknown>)) {
    if (PRIVATE_FIELDS.has(key)) continue;
    out[key] = stripPrivateFields(item, depth + 1);
  }
  return out;
}

export function privateFieldsFilter(_req: Request, res: Response, next: NextFunction) {
  const json = res.json.bind(res);
  res.json = (body?: unknown) => json(stripPrivateFields(body));
  next();
}
