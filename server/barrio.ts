/**
 * El barrio como clan (shared/barrio.ts): la charla del barrio, el emblema y el lema que eligen sus
 * vecinos y la lista de vecinos con quién está en línea y dónde.
 *
 * La charla: solo cuentas aprobadas, de su propio barrio y que no estén fuera de la ciudad. Frases
 * fijas, versículos y mensajes cortos que pasan por el filtro (el servidor decide). Los mensajes se
 * guardan para poder revisarlos; llegan al instante por el WebSocket de la ciudad a los vecinos
 * conectados (sin los bloqueados), y quien abre la charla trae los últimos. Quien denuncia deja de
 * ver el mensaje; con DENUNCIAS_PARA_OCULTAR denuncias se oculta para todos; la administración puede
 * borrar cualquiera (desde la charla o desde el panel de denuncias) y el autor, los suyos.
 */
import type { Express, Request, Response } from "express";
import { pool } from "./db";
import { esAdmin, nombreDe, personajeDe, type PersonajeFila } from "./jerusalen";
import { casasDelBarrio } from "./ciudad";
import { difundirAlBarrio, presenciaDe } from "./ciudad-red";
import { JERUSALEN_JUEGO } from "@shared/jerusalen";
import { ACTIVIDAD_CIUDAD_TEXTO, areaDeBarrio, fraseRapida, nombreDeBarrio } from "@shared/ciudad";
import {
  CHAT_CADA_MS, CHAT_PAGINA, CHAT_POR_DIA, CHAT_POR_MINUTO, DENUNCIAS_PARA_OCULTAR, EMBLEMA, EMBLEMAS, EMBLEMA_DEL_AREA, LEMA, LEMAS, LEMA_INICIAL,
  revisarMensaje, type BarrioVista, type Emblema, type Lema, type MensajeBarrio, type MiembroBarrio,
} from "@shared/barrio";

export const BARRIO_SQL = `
CREATE TABLE IF NOT EXISTS "game_barrio_chat" (
  "id" serial PRIMARY KEY,
  "barrio" integer NOT NULL,
  "character_id" integer NOT NULL REFERENCES "game_characters"("id") ON DELETE CASCADE,
  "user_id" integer NOT NULL,
  "frase" text,
  "texto" text NOT NULL,
  "created_at" timestamp NOT NULL DEFAULT now(),
  "hidden_at" timestamp,
  "hidden_by" text
);
CREATE INDEX IF NOT EXISTS "idx_game_barrio_chat_barrio" ON "game_barrio_chat" ("barrio", "id");
CREATE INDEX IF NOT EXISTS "idx_game_barrio_chat_user" ON "game_barrio_chat" ("user_id", "created_at");
CREATE TABLE IF NOT EXISTS "game_barrio_votos" (
  "character_id" integer PRIMARY KEY REFERENCES "game_characters"("id") ON DELETE CASCADE,
  "barrio" integer NOT NULL,
  "emblema" text,
  "lema" text,
  "updated_at" timestamp NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS "idx_game_barrio_votos_barrio" ON "game_barrio_votos" ("barrio");
ALTER TABLE "game_houses" ADD COLUMN IF NOT EXISTS "chat_leido" integer NOT NULL DEFAULT 0;`;

type Vecino = { ch: PersonajeFila; userId: number; barrio: number; leido: number; fuera: boolean };

const caminoDe = (p: unknown): MensajeBarrio["camino"] => (p === "profecia" || p === "realeza" ? p : "sacerdocio");

// ---------------------------------------------------------------- los mensajes
type FilaMensaje = {
  id: number;
  character_id: number;
  user_id: number;
  frase: string | null;
  texto: string;
  created_at: string | Date;
  name: string | null;
  path: string | null;
  display_name: string | null;
  username: string | null;
};

function aMensaje(r: FilaMensaje, yo: number): MensajeBarrio {
  const f = r.frase ? fraseRapida(r.frase) : null;
  return {
    id: Number(r.id),
    de: Number(r.character_id),
    nombre: nombreDe(r),
    camino: caminoDe(r.path),
    texto: f ? f.texto : r.texto,
    frase: f ? f.id : null,
    ref: f?.ref ?? null,
    at: new Date(r.created_at).toISOString(),
    mio: Number(r.user_id) === yo,
  };
}

const COLUMNAS = `m.id, m.character_id, m.user_id, m.frase, m.texto, m.created_at, c.name, c.path, u.display_name, u.username`;
// ni los de quienes me bloquearon o bloqueé, ni los que yo denuncié
const VISIBLES = `m.hidden_at IS NULL
   AND NOT EXISTS (SELECT 1 FROM user_blocks b WHERE (b.blocker_id = $2 AND b.blocked_id = m.user_id) OR (b.blocker_id = m.user_id AND b.blocked_id = $2))
   AND NOT EXISTS (SELECT 1 FROM content_reports r WHERE r.reporter_id = $2 AND r.content_type = 'mensaje' AND r.content_id = m.id)`;

/** Una página de la charla (del más viejo al más nuevo): los últimos, los de antes de `antes` o los de después de `desde`. */
async function paginaDeChat(barrio: number, yo: number, o: { antes?: number; desde?: number } = {}): Promise<{ mensajes: MensajeBarrio[]; hayMas: boolean }> {
  if (o.desde) {
    const { rows } = await pool.query(
      `SELECT ${COLUMNAS} FROM game_barrio_chat m JOIN game_characters c ON c.id = m.character_id JOIN users u ON u.id = m.user_id
        WHERE m.barrio = $1 AND m.id > $3 AND ${VISIBLES} ORDER BY m.id ASC LIMIT 100`,
      [barrio, yo, o.desde],
    );
    return { mensajes: rows.map((r) => aMensaje(r, yo)), hayMas: false };
  }
  const { rows } = await pool.query(
    `SELECT ${COLUMNAS} FROM game_barrio_chat m JOIN game_characters c ON c.id = m.character_id JOIN users u ON u.id = m.user_id
      WHERE m.barrio = $1 AND ($3::int IS NULL OR m.id < $3) AND ${VISIBLES} ORDER BY m.id DESC LIMIT $4`,
    [barrio, yo, o.antes ?? null, CHAT_PAGINA + 1],
  );
  const hayMas = rows.length > CHAT_PAGINA;
  return { mensajes: rows.slice(0, CHAT_PAGINA).reverse().map((r) => aMensaje(r, yo)), hayMas };
}

/** Mensajes de otros que no vi desde la última vez que abrí la charla. */
async function nuevosDe(barrio: number, yo: number, leido: number): Promise<{ nuevos: number; ultimo: number }> {
  const { rows } = await pool.query(
    `SELECT count(*) FILTER (WHERE m.id > $3 AND m.user_id <> $2)::int AS nuevos, COALESCE(max(m.id), 0)::int AS ultimo
       FROM game_barrio_chat m WHERE m.barrio = $1 AND ${VISIBLES}`,
    [barrio, yo, leido],
  );
  return { nuevos: Number(rows[0]?.nuevos || 0), ultimo: Number(rows[0]?.ultimo || 0) };
}

/** Oculta un mensaje (lo borró su autor, la administración o tuvo muchas denuncias) y avisa a los conectados. */
async function ocultar(id: number, por: "autor" | "admin" | "denuncias"): Promise<boolean> {
  const { rows } = await pool.query(`UPDATE game_barrio_chat SET hidden_at = now(), hidden_by = $2 WHERE id = $1 AND hidden_at IS NULL RETURNING barrio`, [id, por]);
  if (!rows[0]) return false;
  difundirAlBarrio(Number(rows[0].barrio), () => ({ t: "chat-fuera", id }));
  return true;
}

/** Lo llama la ruta de denuncias (server/reports.ts) cuando alguien denuncia un mensaje. */
export async function alDenunciarMensaje(id: number): Promise<void> {
  const { rows } = await pool.query(
    `SELECT count(DISTINCT reporter_id)::int AS n FROM content_reports WHERE content_type = 'mensaje' AND content_id = $1 AND status = 'pendiente'`,
    [id],
  );
  if (Number(rows[0]?.n || 0) >= DENUNCIAS_PARA_OCULTAR) await ocultar(id, "denuncias");
}

// ---------------------------------------------------------------- el emblema y el lema
type Identidad = { emblema: Emblema; lema: Lema; votos: { emblemas: Record<string, number>; lemas: Record<string, number> } };
const identidades = new Map<number, { at: number; id: Identidad }>();

async function identidadDe(barrio: number): Promise<Identidad> {
  const hit = identidades.get(barrio);
  if (hit && Date.now() - hit.at < 30_000) return hit.id;
  // solo cuentan los votos de quienes viven en el barrio y tienen la cuenta activa
  const { rows } = await pool.query(
    `SELECT v.emblema, v.lema FROM game_barrio_votos v
       JOIN game_houses h ON h.character_id = v.character_id AND h.barrio = v.barrio
       JOIN game_characters c ON c.id = v.character_id
       JOIN users u ON u.id = c.user_id AND u.is_active IS NOT FALSE
      WHERE v.barrio = $1`,
    [barrio],
  );
  const emblemas: Record<string, number> = {};
  const lemas: Record<string, number> = {};
  for (const r of rows) {
    if (r.emblema && EMBLEMA[r.emblema]) emblemas[r.emblema] = (emblemas[r.emblema] || 0) + 1;
    if (r.lema && LEMA[r.lema]) lemas[r.lema] = (lemas[r.lema] || 0) + 1;
  }
  const porDefecto = EMBLEMA_DEL_AREA[areaDeBarrio(barrio) - 1] ?? "leon";
  // gana el más votado; si empatan, el del área y después el orden de la lista
  const emblema = [...EMBLEMAS].sort((a, b) => (emblemas[b.id] || 0) - (emblemas[a.id] || 0) || Number(b.id === porDefecto) - Number(a.id === porDefecto))[0];
  const lema = [...LEMAS].sort((a, b) => (lemas[b.id] || 0) - (lemas[a.id] || 0) || Number(b.id === LEMA_INICIAL) - Number(a.id === LEMA_INICIAL))[0];
  const id: Identidad = { emblema, lema, votos: { emblemas, lemas } };
  identidades.set(barrio, { at: Date.now(), id });
  if (identidades.size > 2000) identidades.clear();
  return id;
}

// ---------------------------------------------------------------- los vecinos
export function dondeEsta(canal: string, a: number): string {
  const que = a > 0 && ACTIVIDAD_CIUDAD_TEXTO[a] ? ` · ${ACTIVIDAD_CIUDAD_TEXTO[a]}` : "";
  if (canal === "templo") return "En el templo";
  if (canal.startsWith("barrio:")) return `En ${nombreDeBarrio(Number(canal.slice(7)))}${que}`;
  return `En la ciudad${que}`;
}

async function miembrosDe(barrio: number, yo: number): Promise<MiembroBarrio[]> {
  const casas = await casasDelBarrio(barrio);
  const cuentas = casas.map((c) => c.userId);
  const { rows } = cuentas.length
    ? await pool.query(
        `SELECT DISTINCT ON (user_id) user_id, id, path FROM game_characters WHERE user_id = ANY($1::int[]) AND game = $2
          ORDER BY user_id, selected_at DESC NULLS LAST, slot`,
        [cuentas, JERUSALEN_JUEGO],
      )
    : { rows: [] as { user_id: number; id: number; path: string | null }[] };
  const actual = new Map(rows.map((r) => [Number(r.user_id), { id: Number(r.id), camino: caminoDe(r.path) }]));
  const enLinea = presenciaDe(cuentas);
  return casas
    .map((c) => {
      const p = enLinea.get(c.userId);
      const a = actual.get(c.userId);
      return {
        casaId: c.personajeId,
        personajeId: p?.personajeId ?? a?.id ?? c.personajeId,
        nombre: c.nombre,
        camino: a?.camino ?? "sacerdocio",
        escalon: c.escalon,
        parcela: c.parcela,
        nivel: c.nivel,
        enLinea: !!p,
        donde: p ? dondeEsta(p.canal, p.a) : null,
        esYo: c.userId === yo,
      } satisfies MiembroBarrio;
    })
    .sort((x, y) => Number(y.esYo) - Number(x.esYo) || Number(y.enLinea) - Number(x.enLinea) || x.parcela - y.parcela);
}

// ---------------------------------------------------------------- rutas
/** Ritmo de la charla por cuenta (en memoria): las veces de los últimos 60 s. */
const ritmo = new Map<number, number[]>();
const ultimoVoto = new Map<number, number>();

export function registerBarrioRoutes(app: Express) {
  async function vecino(req: Request, res: Response): Promise<Vecino | null> {
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
    const { rows } = await pool.query(
      `SELECT h.barrio, h.chat_leido,
              (SELECT bool_or(c.city_banned_at IS NOT NULL) FROM game_characters c WHERE c.user_id = $2 AND c.game = $3) AS fuera
         FROM game_houses h WHERE h.character_id = $1`,
      [ch.casa, ch.user_id, JERUSALEN_JUEGO],
    );
    if (!rows[0]) {
      res.status(404).json({ message: "Primero entra a la ciudad: allí recibes tu casa y tu barrio." });
      return null;
    }
    return { ch, userId: ch.user_id, barrio: Number(rows[0].barrio), leido: Number(rows[0].chat_leido || 0), fuera: !!rows[0].fuera };
  }

  /** El barrio que se mira: el propio (o, para la administración, el que pida con ?n=). */
  function barrioPedido(req: Request, v: Vecino): number {
    const n = Number(req.query.n);
    return esAdmin(req) && Number.isInteger(n) && n > 0 && n < 100000 ? n : v.barrio;
  }

  // Lo que muestra el botón del barrio al entrar a la ciudad: el emblema y los mensajes sin ver.
  app.get("/api/jerusalen/barrio/resumen", async (req: Request, res: Response) => {
    try {
      const v = await vecino(req, res);
      if (!v) return;
      const [id, nuevos] = await Promise.all([identidadDe(v.barrio), nuevosDe(v.barrio, v.userId, v.leido)]);
      res.setHeader("Cache-Control", "no-store");
      res.json({ n: v.barrio, nombre: nombreDeBarrio(v.barrio), emblema: id.emblema, ...nuevos });
    } catch (err) {
      console.error("[barrio] resumen:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });

  // «Tu barrio»: emblema, lema, votos, vecinos y los últimos mensajes.
  app.get("/api/jerusalen/barrio", async (req: Request, res: Response) => {
    try {
      const v = await vecino(req, res);
      if (!v) return;
      const n = barrioPedido(req, v);
      const [id, miembros, pagina, nuevos, { rows: mio }] = await Promise.all([
        identidadDe(n),
        miembrosDe(n, v.userId),
        paginaDeChat(n, v.userId),
        nuevosDe(n, v.userId, n === v.barrio ? v.leido : 2147483647),
        pool.query(`SELECT emblema, lema FROM game_barrio_votos WHERE character_id = $1 AND barrio = $2`, [v.ch.casa, v.barrio]),
      ]);
      const out: BarrioVista = {
        n,
        area: areaDeBarrio(n),
        nombre: nombreDeBarrio(n),
        emblema: id.emblema,
        lema: id.lema,
        votos: { ...id.votos, mio: { emblema: mio[0]?.emblema ?? null, lema: mio[0]?.lema ?? null } },
        miembros,
        chat: pagina.mensajes,
        hayMas: pagina.hayMas,
        nuevos: nuevos.nuevos,
        puedoEscribir: n === v.barrio && !v.fuera,
        esAdmin: esAdmin(req),
      };
      res.setHeader("Cache-Control", "no-store");
      res.json(out);
    } catch (err) {
      console.error("[barrio] estado:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });

  // Más mensajes: los de antes (al subir) o los de después (si la conexión se cortó un rato).
  app.get("/api/jerusalen/barrio/chat", async (req: Request, res: Response) => {
    try {
      const v = await vecino(req, res);
      if (!v) return;
      const antes = Number(req.query.antes);
      const desde = Number(req.query.desde);
      const pagina = await paginaDeChat(barrioPedido(req, v), v.userId, {
        antes: Number.isInteger(antes) && antes > 0 ? antes : undefined,
        desde: Number.isInteger(desde) && desde > 0 ? desde : undefined,
      });
      res.setHeader("Cache-Control", "no-store");
      res.json(pagina);
    } catch (err) {
      console.error("[barrio] página:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });

  // Escribir en la charla: una frase fija, un versículo o un mensaje corto (pasa por el filtro).
  app.post("/api/jerusalen/barrio/chat", async (req: Request, res: Response) => {
    try {
      const v = await vecino(req, res);
      if (!v) return;
      if (v.fuera) return res.status(403).json({ message: "La administración te sacó de la ciudad: no puedes escribir en la charla del barrio." });
      const now = Date.now();
      const veces = (ritmo.get(v.userId) ?? []).filter((t) => now - t < 60_000);
      if (veces.length && now - veces[veces.length - 1] < CHAT_CADA_MS) return res.status(429).json({ message: "Espera un momento antes de escribir otra vez." });
      if (veces.length >= CHAT_POR_MINUTO) return res.status(429).json({ message: "Escribiste mucho en un minuto. Espera un poco." });
      let texto: string;
      let frase: string | null = null;
      if (typeof req.body?.frase === "string") {
        const f = fraseRapida(req.body.frase);
        if (!f) return res.status(400).json({ message: "Esa frase no existe." });
        frase = f.id;
        texto = f.texto;
      } else {
        const r = revisarMensaje(typeof req.body?.texto === "string" ? req.body.texto.slice(0, 600) : "");
        if (!r.ok) return res.status(422).json({ message: r.motivo });
        texto = r.texto;
      }
      const { rows: hoy } = await pool.query(
        `SELECT count(*)::int AS n,
                EXISTS (SELECT 1 FROM game_barrio_chat m2 WHERE m2.user_id = $1 AND m2.frase IS NULL AND m2.texto = $2 AND m2.created_at > now() - interval '2 minutes') AS repetido
           FROM game_barrio_chat WHERE user_id = $1 AND created_at > now() - interval '1 day'`,
        [v.userId, texto],
      );
      if (Number(hoy[0]?.n || 0) >= CHAT_POR_DIA) return res.status(429).json({ message: "Por hoy ya escribiste mucho en la charla. Mañana sigues." });
      if (!frase && hoy[0]?.repetido) return res.status(429).json({ message: "Ya enviaste ese mensaje." });
      veces.push(now);
      ritmo.set(v.userId, veces);
      if (ritmo.size > 5000) ritmo.clear();
      const { rows } = await pool.query(
        `INSERT INTO game_barrio_chat (barrio, character_id, user_id, frase, texto) VALUES ($1, $2, $3, $4, $5) RETURNING id, created_at`,
        [v.barrio, v.ch.id, v.userId, frase, texto],
      );
      const fila: FilaMensaje = {
        id: Number(rows[0].id),
        character_id: v.ch.id,
        user_id: v.userId,
        frase,
        texto,
        created_at: rows[0].created_at,
        name: v.ch.name,
        path: v.ch.camino,
        display_name: v.ch.display_name,
        username: v.ch.username,
      };
      const mensaje = aMensaje(fila, v.userId);
      difundirAlBarrio(v.barrio, (c) => (c.bloqueos.has(v.userId) ? null : { t: "chat", m: { ...mensaje, mio: c.info.u === v.userId } }));
      await pool.query(`UPDATE game_houses SET chat_leido = GREATEST(chat_leido, $2) WHERE character_id = $1`, [v.ch.casa, mensaje.id]);
      // de vez en cuando se borran los mensajes de más de 30 días que nadie denunció
      if (Math.random() < 0.02)
        void pool
          .query(
            `DELETE FROM game_barrio_chat m WHERE m.created_at < now() - interval '30 days'
               AND NOT EXISTS (SELECT 1 FROM content_reports r WHERE r.content_type = 'mensaje' AND r.content_id = m.id AND r.status = 'pendiente')`,
          )
          .catch((err) => console.error("[barrio] limpiar:", err));
      res.json({ mensaje });
    } catch (err) {
      console.error("[barrio] escribir:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });

  // Vi la charla hasta este mensaje (para el número del botón).
  app.post("/api/jerusalen/barrio/chat/leido", async (req: Request, res: Response) => {
    try {
      const v = await vecino(req, res);
      if (!v) return;
      const hasta = Number(req.body?.hasta);
      if (!Number.isInteger(hasta) || hasta <= 0) return res.status(400).json({ message: "Mensaje no válido" });
      await pool.query(
        `UPDATE game_houses SET chat_leido = GREATEST(chat_leido, LEAST($2, (SELECT COALESCE(max(id), 0) FROM game_barrio_chat WHERE barrio = $3))) WHERE character_id = $1`,
        [v.ch.casa, hasta, v.barrio],
      );
      res.json({ ok: true });
    } catch (err) {
      console.error("[barrio] leído:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });

  // Borrar un mensaje: el autor los suyos; la administración, cualquiera (también desde el panel de denuncias).
  app.delete("/api/jerusalen/barrio/chat/:mensaje", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const id = Number(req.params.mensaje);
    if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ message: "Mensaje no válido" });
    try {
      const { rows } = await pool.query(`SELECT user_id, hidden_at FROM game_barrio_chat WHERE id = $1`, [id]);
      if (!rows[0]) return res.status(404).json({ message: "Ese mensaje ya no existe." });
      const admin = esAdmin(req);
      if (!admin && Number(rows[0].user_id) !== req.user!.id) return res.status(403).json({ message: "Solo puedes borrar tus mensajes." });
      await ocultar(id, admin && Number(rows[0].user_id) !== req.user!.id ? "admin" : "autor");
      res.json({ ok: true });
    } catch (err) {
      console.error("[barrio] borrar:", err);
      res.sendStatus(500);
    }
  });

  // Votar por el emblema y el lema del barrio (un voto por persona; se puede cambiar).
  app.post("/api/jerusalen/barrio/voto", async (req: Request, res: Response) => {
    try {
      const v = await vecino(req, res);
      if (!v) return;
      const now = Date.now();
      if (now - (ultimoVoto.get(v.userId) || 0) < 1500) return res.status(429).json({ message: "Espera un momento" });
      ultimoVoto.set(v.userId, now);
      if (ultimoVoto.size > 5000) ultimoVoto.clear();
      const emblema = typeof req.body?.emblema === "string" ? req.body.emblema : undefined;
      const lema = typeof req.body?.lema === "string" ? req.body.lema : undefined;
      if (emblema !== undefined && !EMBLEMA[emblema]) return res.status(400).json({ message: "Ese emblema no existe." });
      if (lema !== undefined && !LEMA[lema]) return res.status(400).json({ message: "Ese lema no existe." });
      if (emblema === undefined && lema === undefined) return res.status(400).json({ message: "Elige un emblema o un lema." });
      await pool.query(
        `INSERT INTO game_barrio_votos (character_id, barrio, emblema, lema) VALUES ($1, $2, $3, $4)
         ON CONFLICT (character_id) DO UPDATE SET barrio = $2, emblema = COALESCE($3, game_barrio_votos.emblema), lema = COALESCE($4, game_barrio_votos.lema), updated_at = now()`,
        [v.ch.casa, v.barrio, emblema ?? null, lema ?? null],
      );
      identidades.delete(v.barrio);
      const [id, { rows: mio }] = await Promise.all([
        identidadDe(v.barrio),
        pool.query(`SELECT emblema, lema FROM game_barrio_votos WHERE character_id = $1`, [v.ch.casa]),
      ]);
      res.json({ emblema: id.emblema, lema: id.lema, votos: { ...id.votos, mio: { emblema: mio[0]?.emblema ?? null, lema: mio[0]?.lema ?? null } } });
    } catch (err) {
      console.error("[barrio] votar:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });
}
