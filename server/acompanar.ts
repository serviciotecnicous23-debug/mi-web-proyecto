/**
 * Acompañar a los vecinos en la ciudad (shared/acompanar.ts): dónde está un amigo o vecino (para ir con él) y las
 * invitaciones a venir adonde uno está, que llegan por la red de la ciudad (server/ciudad-red.ts). Solo entre amigos
 * y vecinos del barrio, sin bloqueos (en ningún sentido) y respetando a quien apagó «Recibir llamadas, retos e
 * invitaciones». Seguir a alguien caminando es solo en la pantalla de quien sigue: el servidor no interviene.
 */
import type { Express, Request, Response } from "express";
import { pool } from "./db";
import { nombreDe, personajeDe, type PersonajeFila } from "./jerusalen";
import { avisarA, ubicacionDe } from "./ciudad-red";
import { relacionesDe } from "./sabio";
import { dondeEsta } from "./barrio";
import { JERUSALEN_JUEGO } from "@shared/jerusalen";
import { INVITACION_S, INVITACIONES_POR_MINUTO, INVITAR_CADA_MS, type DondeEsta } from "@shared/acompanar";

type Persona = { ch: PersonajeFila; titular: number };

/** Si la persona recibe invitaciones (el interruptor de llamadas y retos del concurso; sin fila, sí). */
async function aceptaInvitaciones(cuenta: number): Promise<boolean> {
  const { rows } = await pool.query(
    `SELECT COALESCE(s.llamadas, true) AS si FROM (SELECT MIN(id) AS t FROM game_characters WHERE user_id = $1 AND game = $2) x
       LEFT JOIN game_sabio s ON s.character_id = x.t`,
    [cuenta, JERUSALEN_JUEGO],
  );
  return rows[0]?.si !== false;
}

export function registerAcompanarRoutes(app: Express) {
  async function persona(req: Request, res: Response): Promise<Persona | null> {
    if (!req.isAuthenticated()) {
      res.sendStatus(401);
      return null;
    }
    if (!req.user!.isActive) {
      res.status(403).json({ message: "Tu cuenta debe estar aprobada para jugar en línea." });
      return null;
    }
    const ch = await personajeDe(req.user!.id);
    if (!ch) {
      res.status(404).json({ message: "Primero crea tu personaje." });
      return null;
    }
    return { ch, titular: ch.casa };
  }

  type Ubicacion = NonNullable<ReturnType<typeof ubicacionDe>>;
  /** El otro (por su personaje en línea) si está en la ciudad, es amigo o vecino, no hay bloqueos y lo permite. */
  async function otroPermitido(pr: Persona, personajeId: number): Promise<{ error: number; message: string } | (Ubicacion & { ok: true })> {
    const pos = ubicacionDe(personajeId);
    // con un bloqueo, como si no estuviera (no se dice que hay un bloqueo)
    const noEsta = { error: 404, message: "Esa persona no está en la ciudad ahora." };
    if (!pos) return noEsta;
    if (pos.u === pr.ch.user_id) return { error: 400, message: "Ese eres tú." };
    const r = await relacionesDe(pr.titular, pr.ch.user_id);
    if (r.bloqueados.has(pos.u)) return noEsta;
    if (!r.vecinos.has(pos.u) && !r.amigos.has(pos.u)) return { error: 403, message: "Solo puedes acompañar a tus amigos y a los vecinos de tu barrio." };
    if (!(await aceptaInvitaciones(pos.u))) return { error: 403, message: `${pos.nombre} prefiere no recibir invitaciones ahora.` };
    return { ...pos, ok: true };
  }

  // Dónde está un amigo o vecino ahora (para ir con él).
  app.get("/api/jerusalen/ciudad/donde/:personajeId", async (req: Request, res: Response) => {
    try {
      const pr = await persona(req, res);
      if (!pr) return;
      const id = Number(req.params.personajeId);
      if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ message: "Vecino no válido." });
      const o = await otroPermitido(pr, id);
      if ("error" in o) return res.status(o.error).json({ message: o.message });
      res.setHeader("Cache-Control", "no-store");
      res.json({ personajeId: id, nombre: o.nombre, x: o.x, z: o.z, enTemplo: o.canal === "templo", lugar: dondeEsta(o.canal, o.a) } satisfies DondeEsta);
    } catch (err) {
      console.error("[acompanar] donde:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });

  // Invitar a un amigo o vecino a venir adonde uno está (le llega arriba de la pantalla).
  const ultimas = new Map<string, number>();
  const ritmo = new Map<number, number[]>();
  app.post("/api/jerusalen/ciudad/invitar", async (req: Request, res: Response) => {
    try {
      const pr = await persona(req, res);
      if (!pr) return;
      const a = Number(req.body?.a);
      if (!Number.isInteger(a) || a <= 0) return res.status(400).json({ message: "Elige a quién invitar." });
      const yo = ubicacionDe(pr.ch.id);
      if (!yo || yo.canal === "templo") return res.status(409).json({ message: "Para invitar a alguien, tienes que estar en la ciudad." });
      const o = await otroPermitido(pr, a);
      if ("error" in o) return res.status(o.error).json({ message: o.message });
      if (o.canal === "templo") return res.status(409).json({ message: `${o.nombre} está sirviendo en el templo. Invítalo cuando salga a la ciudad.` });
      const ahora = Date.now();
      const clave = `${pr.ch.user_id}:${o.u}`;
      if (ahora - (ultimas.get(clave) ?? 0) < INVITAR_CADA_MS) return res.status(429).json({ message: `Ya invitaste a ${o.nombre}. Espera un momento.` });
      const mias = (ritmo.get(pr.ch.user_id) ?? []).filter((t) => ahora - t < 60_000);
      if (mias.length >= INVITACIONES_POR_MINUTO) return res.status(429).json({ message: "Muchas invitaciones seguidas. Espera un minuto." });
      const llego = avisarA(o.u, { t: "invitacion", i: { de: pr.ch.id, nombre: nombreDe(pr.ch), camino: pr.ch.camino, lugar: dondeEsta(yo.canal, yo.a), restantes: INVITACION_S } });
      if (!llego) return res.status(404).json({ message: "Esa persona no está en la ciudad ahora." });
      ultimas.set(clave, ahora);
      if (ultimas.size > 5000) ultimas.clear();
      ritmo.set(pr.ch.user_id, [...mias, ahora]);
      if (ritmo.size > 5000) ritmo.clear();
      res.json({ ok: true, nombre: o.nombre });
    } catch (err) {
      console.error("[acompanar] invitar:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });
}
