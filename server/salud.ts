/**
 * GET /api/salud: la página que miran los vigilantes de afuera (UptimeRobot u otro) para saber si la web responde de
 * verdad: además de que el servidor esté vivo, prueba la base de datos con una consulta mínima. Responde 200 con
 * `"ok":true` si todo anda, o 503 con `"ok":false` si la base no contesta a tiempo (docs/vigilancia-y-respaldos.md).
 *
 * /api/hello sigue igual: es la que usa Render para saber si el servidor arrancó, y no debe depender de la base (si
 * la base fallara, Render reiniciaría el servidor una y otra vez sin arreglar nada).
 */

export type Salud = {
  status: 200 | 503;
  cuerpo: { ok: boolean; base: "ok" | "sin respuesta"; ms: number; uptime: number; version: string | null };
};

/** Prueba la base con `consultar` (por ejemplo `() => pool.query("SELECT 1")`), esperando como mucho `limiteMs`. */
export async function estadoDeSalud(consultar: () => Promise<unknown>, limiteMs = 4000): Promise<Salud> {
  const inicio = Date.now();
  let temporizador: ReturnType<typeof setTimeout> | undefined;
  const tiempo = new Promise<never>((_, rechazar) => {
    temporizador = setTimeout(() => rechazar(new Error("la base no contestó a tiempo")), limiteMs);
  });
  let base: "ok" | "sin respuesta" = "ok";
  try {
    await Promise.race([consultar(), tiempo]);
  } catch {
    base = "sin respuesta";
  } finally {
    clearTimeout(temporizador);
  }
  const ok = base === "ok";
  return {
    status: ok ? 200 : 503,
    cuerpo: {
      ok,
      base,
      ms: Date.now() - inicio,
      uptime: Math.floor(process.uptime()),
      // la versión publicada (Render pone el commit): sirve para saber si ya salió un cambio
      version: process.env.RENDER_GIT_COMMIT ? process.env.RENDER_GIT_COMMIT.slice(0, 7) : null,
    },
  };
}
