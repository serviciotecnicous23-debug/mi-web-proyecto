/**
 * Jerusalén en línea, etapa 2: la presencia de la ciudad por WebSocket (decisión de Luis,
 * 2026-11-09). Cada teléfono manda su posición cuando se mueve y el servidor reparte, cuatro
 * veces por segundo, las de los vecinos que cada uno ve: los del mismo canal (su barrio, o la
 * plaza y las calles), sin los bloqueados, los 20 más cercanos. Todo vive en memoria: la
 * presencia nunca toca la base. Las frases son fijas (sin chat libre).
 *
 * Solo entra quien tiene sesión, la cuenta aprobada, su sacerdote y su casa (la da
 * POST /api/jerusalen/ciudad/entrar). Una conexión por personaje: abrir otra cierra la anterior.
 */
import type { IncomingMessage, Server } from "http";
import type { Duplex } from "stream";
import type { Express, Request, RequestHandler, Response } from "express";
import { WebSocketServer, type WebSocket, type RawData } from "ws";
import { pool } from "./db";
import { esAdmin, escalonPorMerito, nombreDe, personajeDe, temporadaDe } from "./jerusalen";
import { casasDelBarrio } from "./ciudad";
import { JERUSALEN_JUEGO, type EscalonId } from "@shared/jerusalen";
import {
  ACTIVIDADES, FRASE_CADA_MS, FRASES_POR_MINUTO, LIMITES_CIUDAD, LIMITES_TEMPLO, RED_RUTA, RED_TICK_MS, VECINOS_VISIBLES, canalDe, fraseRapida,
  type RedEntra, type VecinoInfo,
} from "@shared/ciudad";

type Con = {
  ws: WebSocket;
  info: VecinoInfo;
  canal: string;
  /** Lo que lleva en las manos en el templo (índice de ACTIVIDADES). */
  a: number;
  x: number;
  z: number;
  ry: number;
  m: number;
  /** Cuentas que bloqueó o que lo bloquearon: no se ven ni se oyen. */
  bloqueos: Set<number>;
  conocidos: Set<number>;
  ultimo: string;
  ultimoPos: number;
  frases: number[];
  vivo: boolean;
  barrioHash: string;
};

const conexiones = new Map<number, Con>();
import { marcarEnTemplo } from "./presencia-templo";
const MAX_CONEXIONES = 600;
let reloj: ReturnType<typeof setInterval> | null = null;
let latidos: ReturnType<typeof setInterval> | null = null;
let resumen: ReturnType<typeof setInterval> | null = null;

function mandar(c: Con, msg: RedEntra) {
  if (c.ws.readyState === 1) c.ws.send(JSON.stringify(msg));
}

function rechazar(socket: Duplex, codigo: number, texto: string) {
  try {
    socket.write(`HTTP/1.1 ${codigo} ${texto}\r\nConnection: close\r\nContent-Length: 0\r\n\r\n`);
  } catch {
    /* el socket ya se cerró */
  }
  socket.destroy();
}

/** El origen de la página debe ser el mismo sitio (evita que otra página abra la ciudad con tu sesión). */
function mismoOrigen(req: IncomingMessage): boolean {
  const origin = req.headers.origin;
  const host = req.headers.host;
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

type Jugador = { info: VecinoInfo; bloqueos: Set<number>; suspendido: boolean };

async function cargarJugador(userId: number): Promise<Jugador | null> {
  const t = temporadaDe();
  const { rows } = await pool.query(
    `SELECT u.id AS user_id, u.is_active, u.display_name, u.username, c.id, c.name, c.city_banned_at, h.barrio, h.plot,
            COALESCE(sm.merit, 0)::int AS merito, o.office
       FROM users u
       JOIN game_characters c ON c.user_id = u.id AND c.game = $2
       JOIN game_houses h ON h.character_id = c.id
       LEFT JOIN game_season_merit sm ON sm.character_id = c.id AND sm.season = $3
       LEFT JOIN game_offices o ON o.character_id = c.id AND o.season = $3 AND o.office IS NOT NULL AND o.lost_at IS NULL
      WHERE u.id = $1
      ORDER BY c.slot LIMIT 1`,
    [userId, JERUSALEN_JUEGO, t.n],
  );
  const r = rows[0];
  if (!r || r.is_active !== true) return null;
  const { rows: b } = await pool.query(`SELECT blocker_id, blocked_id FROM user_blocks WHERE blocker_id = $1 OR blocked_id = $1`, [userId]);
  const bloqueos = new Set<number>(b.map((x) => (Number(x.blocker_id) === userId ? Number(x.blocked_id) : Number(x.blocker_id))));
  return {
    info: {
      id: Number(r.id),
      nombre: nombreDe(r),
      escalon: (r.office as EscalonId | null) || escalonPorMerito(Number(r.merito)),
      barrio: Number(r.barrio),
      casa: Number(r.plot),
      u: Number(r.user_id),
    },
    bloqueos,
    suspendido: !!r.city_banned_at,
  };
}

const num = (v: unknown, lo: number, hi: number, def: number) => (typeof v === "number" && Number.isFinite(v) ? Math.max(lo, Math.min(hi, v)) : def);
const r2 = (v: number) => Math.round(v * 100) / 100;

function alRecibir(c: Con, data: RawData) {
  let msg: { t?: unknown; x?: unknown; z?: unknown; ry?: unknown; m?: unknown; id?: unknown; l?: unknown; a?: unknown };
  try {
    msg = JSON.parse(String(data));
  } catch {
    return;
  }
  const now = Date.now();
  if (msg.t === "pos") {
    // como mucho unas 7 por segundo; lo demás se ignora
    if (now - c.ultimoPos < 140) return;
    c.ultimoPos = now;
    // en el templo es otro canal: allí solo se ven los que sirven
    const templo = msg.l === "templo";
    const lim = templo ? LIMITES_TEMPLO : LIMITES_CIUDAD;
    c.x = r2(num(msg.x, lim.minX, lim.maxX, c.x));
    c.z = r2(num(msg.z, lim.minZ, lim.maxZ, c.z));
    c.ry = r2(num(msg.ry, -Math.PI * 4, Math.PI * 4, c.ry));
    c.m = num(msg.m, 0, 1, 0) > 0.5 ? 1 : 0;
    c.a = templo ? Math.round(num(msg.a, 0, ACTIVIDADES.length - 1, 0)) : 0;
    c.canal = templo ? "templo" : canalDe(c.x, c.z, c.info.barrio);
    marcarEnTemplo(c.info.id, templo);
  } else if (msg.t === "frase") {
    const f = typeof msg.id === "string" ? fraseRapida(msg.id) : null;
    if (!f) return;
    c.frases = c.frases.filter((t) => now - t < 60_000);
    if (c.frases.length && now - c.frases[c.frases.length - 1] < FRASE_CADA_MS) return;
    if (c.frases.length >= FRASES_POR_MINUTO) return;
    c.frases.push(now);
    // la oyen los que lo ven (en su lista de los 20 más cercanos)
    for (const o of conexiones.values()) {
      if (o === c || o.canal !== c.canal || o.bloqueos.has(c.info.u) || c.bloqueos.has(o.info.u)) continue;
      if (!o.conocidos.has(c.info.id)) continue;
      mandar(o, { t: "frase", de: c.info.id, id: f.id });
    }
  }
}

/** Reparte las posiciones: a cada uno, los 20 más cercanos de su canal que no estén bloqueados. */
function repartir() {
  const porCanal = new Map<string, Con[]>();
  for (const c of conexiones.values()) {
    const l = porCanal.get(c.canal);
    if (l) l.push(c);
    else porCanal.set(c.canal, [c]);
  }
  for (const lista of porCanal.values()) {
    for (const yo of lista) {
      const otros = lista
        .filter((o) => o !== yo && !yo.bloqueos.has(o.info.u) && !o.bloqueos.has(yo.info.u))
        .map((o) => ({ o, d: (o.x - yo.x) ** 2 + (o.z - yo.z) ** 2 }))
        .sort((a, b) => a.d - b.d)
        .slice(0, VECINOS_VISIBLES)
        .map((x) => x.o);
      for (const o of otros) {
        if (!yo.conocidos.has(o.info.id)) {
          yo.conocidos.add(o.info.id);
          mandar(yo, { t: "info", v: o.info });
        }
      }
      const l = otros.map((o) => [o.info.id, o.x, o.z, o.ry, o.m, o.a] as [number, number, number, number, number, number]);
      const firma = JSON.stringify(l);
      if (firma !== yo.ultimo) {
        yo.ultimo = firma;
        mandar(yo, { t: "v", l });
      }
    }
  }
}

/** Cada 30 s, a cada uno el resumen de su barrio si cambió (casas nuevas o que crecieron). */
async function mandarResumenes() {
  const barrios = new Set([...conexiones.values()].map((c) => c.info.barrio));
  for (const n of barrios) {
    try {
      const casas = await casasDelBarrio(n);
      const lista = casas.map(({ userId, ...c }) => c);
      const hash = JSON.stringify(lista.map((c) => [c.parcela, c.nivel, c.personajeId, c.nombre, c.escalon]));
      for (const c of conexiones.values()) {
        if (c.info.barrio !== n || c.barrioHash === hash) continue;
        const primera = !c.barrioHash;
        c.barrioHash = hash;
        if (!primera) mandar(c, { t: "barrio", n, casas: lista.map((x) => ({ ...x, esMia: x.personajeId === c.info.id })) });
      }
    } catch (err) {
      console.error("[ciudad-red] resumen:", err);
    }
  }
}

function arrancarRelojes() {
  if (!reloj) reloj = setInterval(repartir, RED_TICK_MS);
  if (!latidos)
    latidos = setInterval(() => {
      for (const c of conexiones.values()) {
        if (!c.vivo) {
          c.ws.terminate();
          continue;
        }
        c.vivo = false;
        try {
          c.ws.ping();
        } catch {
          /* se cierra solo */
        }
      }
    }, 25_000);
  if (!resumen) resumen = setInterval(() => void mandarResumenes(), 30_000);
}

function pararRelojesSiNoHayNadie() {
  if (conexiones.size) return;
  for (const t of [reloj, latidos, resumen]) if (t) clearInterval(t);
  reloj = latidos = resumen = null;
}

/** Bloquear o desbloquear (lo llaman las rutas): se aplica ya a quienes estén conectados. */
export function aplicarBloqueo(a: number, b: number, bloqueado: boolean) {
  for (const c of conexiones.values()) {
    const otro = c.info.u === a ? b : c.info.u === b ? a : null;
    if (otro === null) continue;
    if (bloqueado) c.bloqueos.add(otro);
    else c.bloqueos.delete(otro);
    c.ultimo = "";
  }
}

/** La administración saca a un personaje de la ciudad: se cierra su conexión. */
export function sacarDeLaCiudad(personajeId: number, motivo: string) {
  const c = conexiones.get(personajeId);
  if (!c) return;
  // deja de verse ya, sin esperar a que su teléfono conteste el cierre
  conexiones.delete(personajeId);
  marcarEnTemplo(personajeId, false);
  mandar(c, { t: "fuera", motivo });
  c.ws.close(4003, "fuera");
  setTimeout(() => c.ws.terminate(), 3000).unref?.();
  pararRelojesSiNoHayNadie();
}

/** Cuántos están en la ciudad ahora. */
export function enLaCiudad(): number {
  return conexiones.size;
}

// ---------------------------------------------------------------- rutas: bloquear y sacar de la ciudad
const MAX_BLOQUEOS = 300;

export function registerRedRoutes(app: Express) {
  /** Personas que bloqueé (con el nombre de su sacerdote, si tiene). */
  async function misBloqueos(me: number) {
    const { rows } = await pool.query(
      `SELECT b.blocked_id, c.id AS personaje_id, c.name, u.display_name, u.username, b.blocked_id AS user_id
         FROM user_blocks b
         JOIN users u ON u.id = b.blocked_id
         LEFT JOIN game_characters c ON c.user_id = b.blocked_id AND c.game = $2
        WHERE b.blocker_id = $1
        ORDER BY b.created_at DESC`,
      [me, JERUSALEN_JUEGO],
    );
    return rows.map((r) => ({ personajeId: r.personaje_id == null ? null : Number(r.personaje_id), nombre: nombreDe(r) }));
  }

  /** El dueño (cuenta) de un personaje en línea. */
  async function cuentaDe(personajeId: number): Promise<number | null> {
    const { rows } = await pool.query(`SELECT user_id FROM game_characters WHERE id = $1 AND game = $2`, [personajeId, JERUSALEN_JUEGO]);
    return rows[0] ? Number(rows[0].user_id) : null;
  }

  app.get("/api/jerusalen/ciudad/bloqueos", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    try {
      res.setHeader("Cache-Control", "no-store");
      res.json({ bloqueados: await misBloqueos(req.user!.id) });
    } catch (err) {
      console.error("[ciudad-red] bloqueos:", err);
      res.sendStatus(500);
    }
  });

  // Bloquear a un jugador: dejan de verse y de oírse en la ciudad, en los dos sentidos.
  app.post("/api/jerusalen/ciudad/bloqueos", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const personajeId = Number(req.body?.personajeId);
    if (!Number.isInteger(personajeId) || personajeId <= 0) return res.status(400).json({ message: "Jugador no válido" });
    const me = req.user!.id;
    try {
      const otro = await cuentaDe(personajeId);
      if (otro === null) return res.status(404).json({ message: "Ese jugador ya no está en Jerusalén." });
      if (otro === me) return res.status(400).json({ message: "No puedes bloquearte a ti mismo." });
      const { rows } = await pool.query(`SELECT count(*)::int AS n FROM user_blocks WHERE blocker_id = $1`, [me]);
      if (Number(rows[0]?.n || 0) >= MAX_BLOQUEOS) return res.status(429).json({ message: "Ya bloqueaste a muchas personas." });
      await pool.query(`INSERT INTO user_blocks (blocker_id, blocked_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`, [me, otro]);
      aplicarBloqueo(me, otro, true);
      res.json({ bloqueados: await misBloqueos(me) });
    } catch (err) {
      console.error("[ciudad-red] bloquear:", err);
      res.sendStatus(500);
    }
  });

  app.delete("/api/jerusalen/ciudad/bloqueos/:personajeId", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const personajeId = Number(req.params.personajeId);
    if (!Number.isInteger(personajeId) || personajeId <= 0) return res.status(400).json({ message: "Jugador no válido" });
    const me = req.user!.id;
    try {
      const otro = await cuentaDe(personajeId);
      if (otro !== null) {
        await pool.query(`DELETE FROM user_blocks WHERE blocker_id = $1 AND blocked_id = $2`, [me, otro]);
        // si el otro también me bloqueó, seguimos sin vernos
        const { rows } = await pool.query(`SELECT 1 FROM user_blocks WHERE blocker_id = $1 AND blocked_id = $2`, [otro, me]);
        if (!rows.length) aplicarBloqueo(me, otro, false);
      }
      res.json({ bloqueados: await misBloqueos(me) });
    } catch (err) {
      console.error("[ciudad-red] desbloquear:", err);
      res.sendStatus(500);
    }
  });

  // Administración (desde el panel de denuncias): saca al personaje de la ciudad. No se borra
  // nada: puede seguir sirviendo en el templo y su casa queda en su barrio.
  app.delete("/api/jerusalen/admin/jugador/:id", async (req: Request, res: Response) => {
    if (!esAdmin(req)) return res.sendStatus(403);
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ message: "Jugador no válido" });
    try {
      const { rowCount } = await pool.query(`UPDATE game_characters SET city_banned_at = COALESCE(city_banned_at, now()) WHERE id = $1`, [id]);
      if (!rowCount) return res.status(404).json({ message: "Ese jugador ya no existe." });
      sacarDeLaCiudad(id, "La administración te sacó de la ciudad por una denuncia. Puedes seguir sirviendo en el templo.");
      res.json({ ok: true });
    } catch (err) {
      console.error("[ciudad-red] sacar:", err);
      res.sendStatus(500);
    }
  });

  // Para la pantalla: quién soy en la red (y si estoy fuera de la ciudad).
  app.get("/api/jerusalen/ciudad/red/estado", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    try {
      const ch = await personajeDe(req.user!.id);
      res.setHeader("Cache-Control", "no-store");
      res.json({ enLaCiudad: enLaCiudad(), conectado: !!ch && conexiones.has(ch.id) });
    } catch (err) {
      console.error("[ciudad-red] estado:", err);
      res.sendStatus(500);
    }
  });
}

export function registrarRedCiudad(server: Server, sesion: RequestHandler) {
  const wss = new WebSocketServer({ noServer: true, maxPayload: 1024, perMessageDeflate: false });

  server.on("upgrade", (req: IncomingMessage, socket: Duplex, head: Buffer) => {
    const ruta = (req.url || "").split("?")[0];
    if (ruta !== RED_RUTA) return; // otras conexiones (p. ej. la recarga de Vite) siguen su camino
    if (!mismoOrigen(req)) return rechazar(socket, 403, "Forbidden");
    if (conexiones.size >= MAX_CONEXIONES) return rechazar(socket, 503, "Service Unavailable");
    // la misma sesión de la web (cookie): se lee con el middleware de express-session
    sesion(req as unknown as Request, {} as Response, () => {
      const pasaporte = (req as unknown as { session?: { passport?: { user?: unknown } } }).session?.passport;
      const userId = Number(pasaporte?.user);
      if (!Number.isInteger(userId) || userId <= 0) return rechazar(socket, 401, "Unauthorized");
      void cargarJugador(userId)
        .then((j) => {
          if (!j) return rechazar(socket, 403, "Forbidden");
          wss.handleUpgrade(req, socket, head, (ws) => conectar(ws, j));
        })
        .catch((err) => {
          console.error("[ciudad-red] entrar:", err);
          rechazar(socket, 500, "Internal Server Error");
        });
    });
  });

  function conectar(ws: WebSocket, j: Jugador) {
    if (j.suspendido) {
      ws.send(JSON.stringify({ t: "fuera", motivo: "La administración te sacó de la ciudad por una denuncia. Puedes seguir sirviendo en el templo." } satisfies RedEntra));
      ws.close(4003, "fuera");
      setTimeout(() => ws.terminate(), 3000).unref?.();
      return;
    }
    const previa = conexiones.get(j.info.id);
    if (previa) {
      conexiones.delete(j.info.id);
      mandar(previa, { t: "fuera", motivo: "Abriste la ciudad en otra pantalla." });
      previa.ws.close(4000, "otra");
      setTimeout(() => previa.ws.terminate(), 3000).unref?.();
    }
    const c: Con = {
      ws,
      info: j.info,
      canal: "comun",
      a: 0,
      x: 41.8,
      z: 0,
      ry: 0,
      m: 0,
      bloqueos: j.bloqueos,
      conocidos: new Set(),
      ultimo: "",
      ultimoPos: 0,
      frases: [],
      vivo: true,
      barrioHash: "",
    };
    conexiones.set(j.info.id, c);
    arrancarRelojes();
    mandar(c, { t: "hola", yo: j.info.id, tick: RED_TICK_MS });
    ws.on("message", (data) => alRecibir(c, data));
    ws.on("pong", () => {
      c.vivo = true;
    });
    ws.on("close", () => {
      if (conexiones.get(j.info.id) === c) {
        conexiones.delete(j.info.id);
        marcarEnTemplo(j.info.id, false);
      }
      pararRelojesSiNoHayNadie();
    });
    ws.on("error", () => ws.terminate());
  }
}
