/**
 * Las sesiones guardadas de cada cuenta. connect-pg-simple las guarda en la tabla "user_sessions" y passport pone el
 * id de la cuenta en sess.passport.user (server/routes.ts).
 *
 * - Al borrar una cuenta se cierran todas sus sesiones, en todos los aparatos. Antes solo se cerraba la del aparato
 *   desde donde se borraba, y en los demás la persona seguía dentro como «Cuenta eliminada».
 * - Al cambiar o restablecer la contraseña se cierran las demás sesiones, para que quien la conocía no siga dentro.
 * - deserializeUser rechaza la fila anónima que deja el borrado (server/account-deletion.ts), por si quedara alguna
 *   sesión vieja o si las sesiones viven en memoria (desarrollo sin base de datos).
 */

/** Lo que hace falta de un pool de pg (así se prueba sin base de datos). */
export type ConsultaSesiones = {
  query: (texto: string, valores: unknown[]) => Promise<{ rowCount?: number | null }>;
};

/** La consulta que borra las sesiones de una cuenta, salvo la del aparato que hace el cambio, si se indica. */
export function consultaCerrarSesiones(userId: number, salvo?: string | null): { texto: string; valores: unknown[] } {
  return {
    texto: `DELETE FROM "user_sessions" WHERE ("sess" -> 'passport' ->> 'user') = $1 AND ($2::text IS NULL OR "sid" <> $2::text)`,
    valores: [String(userId), salvo ?? null],
  };
}

/**
 * Cierra las sesiones guardadas de una cuenta, salvo `salvo` (el id de la sesión que se queda abierta). Devuelve
 * cuántas cerró. Sin base de datos no hay filas que borrar. Si la consulta falla, lo anota y devuelve 0: el cambio que
 * la pidió (el borrado o la contraseña nueva) ya está hecho, y deserializeUser igual rechaza una cuenta borrada.
 */
export async function cerrarSesionesDe(db: ConsultaSesiones | null, userId: number, salvo?: string | null): Promise<number> {
  if (!db || !Number.isInteger(userId) || userId <= 0) return 0;
  const { texto, valores } = consultaCerrarSesiones(userId, salvo);
  try {
    const r = await db.query(texto, valores);
    return r.rowCount ?? 0;
  } catch (err) {
    console.error("[sesiones] no se pudieron cerrar las sesiones de la cuenta", userId, err);
    return 0;
  }
}

/** ¿Es la fila anónima que deja «Eliminar mi cuenta»? Usuario `eliminada-<su id>-<8 hex>` y la cuenta inactiva. */
export function esCuentaEliminada(u: { id: number; username?: string | null; isActive?: boolean | null } | null | undefined): boolean {
  if (!u || u.isActive) return false;
  const m = /^eliminada-(\d+)-[0-9a-f]{8}$/.exec(u.username ?? "");
  return !!m && Number(m[1]) === u.id;
}
