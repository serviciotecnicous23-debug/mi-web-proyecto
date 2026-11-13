/**
 * Los avisos del juego al teléfono (con los avisos del sitio, server/push.ts). Cada persona elige en el juego cuáles
 * quiere (tabla game_avisos_pref); quien no los activó no recibe nada del juego.
 * - racha: por la tarde (de 19 a 22 h de Texas), si tiene racha y hoy todavía no sirvió (no en sábado).
 * - huerto: cuando una parcela queda lista para cosechar (una vez por siembra).
 * - fiestas: unos 10 minutos antes de una fiesta grande de Jerusalén (mérito ×1,5), una por día como mucho.
 * - duelos: al instante, cuando alguien la reta a un duelo de sabios (el aviso vive lo que dura el reto).
 * Nunca de noche (de 22 a 8 h de Texas). Cada aviso sale una sola vez (tabla game_avisos). No se simula nada: el
 * servidor solo mira cada 3 minutos lo que ya está guardado y avisa.
 */
import type { Express, Request, Response } from "express";
import { pool } from "./db";
import { storage } from "./storage";
import { isPushConfigured, sendPushToMany } from "./push";
import { diaClave } from "./jerusalen";
import { faltan, leerHuerto } from "./mercado";
import { esReposo, gozoDeRacha, rachaViva } from "@shared/racha";
import { diaEnJerusalen } from "@shared/anio";
import { ROPA_DEL_ANIO, articulo } from "@shared/mercado";
import { leerObras, obra } from "@shared/obras";
import { TELAR, leerOficios } from "@shared/taller";
import { HORA_RACHA, SILENCIO, type AvisosVista, type TipoAviso } from "@shared/avisos";

export const AVISOS_SQL = `
CREATE TABLE IF NOT EXISTS "game_avisos_pref" (
  "user_id" integer PRIMARY KEY,
  "activo" boolean NOT NULL DEFAULT true,
  "racha" boolean NOT NULL DEFAULT true,
  "huerto" boolean NOT NULL DEFAULT true,
  "duelos" boolean NOT NULL DEFAULT true,
  "fiestas" boolean NOT NULL DEFAULT true,
  "updated_at" timestamp NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS "game_avisos" (
  "user_id" integer NOT NULL,
  "tipo" text NOT NULL,
  "clave" text NOT NULL,
  "titulo" text NOT NULL,
  "cuerpo" text NOT NULL,
  "sent_at" timestamp NOT NULL DEFAULT now(),
  PRIMARY KEY ("user_id", "tipo", "clave")
);
CREATE INDEX IF NOT EXISTS "idx_game_avisos_sent" ON "game_avisos" ("sent_at");`;

const URL_JUEGO = "/juegos/aprendiz-del-templo";
const fmtHora = new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", hour: "numeric", hourCycle: "h23" });
const horaTexas = (d: Date) => Number(fmtHora.format(d)) % 24;
const enSilencio = (h: number) => h >= SILENCIO.desde || h < SILENCIO.hasta;

/** Quiénes quieren este tipo de aviso y tienen dónde recibirlo. */
const quienes = (tipo: TipoAviso) =>
  `SELECT p.user_id FROM game_avisos_pref p WHERE p.activo AND p."${tipo}" AND EXISTS (SELECT 1 FROM push_subscriptions s WHERE s.user_id = p.user_id)`;

/** Manda un aviso una sola vez (por persona, tipo y clave). Devuelve si salió ahora. */
async function avisar(userId: number, tipo: TipoAviso, clave: string, titulo: string, cuerpo: string, ttl: number): Promise<boolean> {
  const { rows } = await pool.query(
    `INSERT INTO game_avisos (user_id, tipo, clave, titulo, cuerpo) VALUES ($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING RETURNING 1`,
    [userId, tipo, clave, titulo, cuerpo],
  );
  if (!rows.length) return false;
  if (!isPushConfigured) return true;
  const subs = await storage.getPushSubscriptionsByUser(userId);
  const vencidas = await sendPushToMany(
    subs.map((s) => ({ id: s.id, subscription: { endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } } })),
    { title: titulo, body: cuerpo, url: URL_JUEGO, tag: `jer-${tipo}`, icon: "/icons/icon-192x192.png" },
    { ttl },
  );
  if (vencidas.length) await storage.deletePushSubscriptionsByIds(vencidas);
  return true;
}

export type AvisoSalido = { tipo: TipoAviso; userId: number; titulo: string };

/** Mira lo guardado y avisa lo que toca ahora (racha, huerto, fiestas). */
export async function revisarAvisos(ahora = new Date()): Promise<AvisoSalido[]> {
  const salieron: AvisoSalido[] = [];
  const h = horaTexas(ahora);
  if (enSilencio(h)) return salieron;
  const hoy = diaClave(ahora);

  // la racha, por la tarde: tiene racha viva, hoy no sirvió y no es sábado
  if (h >= HORA_RACHA && !esReposo(hoy)) {
    const { rows } = await pool.query(
      `SELECT c.user_id, r.actual, r.ultimo FROM game_racha r JOIN game_characters c ON c.id = r.titular
        WHERE r.actual >= 1 AND r.ultimo IS DISTINCT FROM $1 AND c.user_id IN (${quienes("racha")})`,
      [hoy],
    );
    for (const r of rows) {
      if (!rachaViva(r.ultimo, hoy)) continue;
      const n = Number(r.actual);
      const titulo = `🔥 Tu racha de ${n} ${n === 1 ? "día" : "días"} se pierde a medianoche`;
      const cuerpo = `Cumple un encargo del día o el recado de la calle de los siervos: +${gozoDeRacha(n + 1)} de gozo.`;
      if (await avisar(Number(r.user_id), "racha", hoy, titulo, cuerpo, 3 * 3600)) salieron.push({ tipo: "racha", userId: Number(r.user_id), titulo });
    }
  }

  // el huerto: parcelas listas (de siembras de los últimos dos días), un aviso por la última que quedó lista
  {
    const { rows } = await pool.query(
      `SELECT c.user_id, h.huerto FROM game_houses h JOIN game_characters c ON c.id = h.character_id
        WHERE jsonb_typeof(h.huerto) = 'array' AND jsonb_array_length(h.huerto) > 0 AND c.user_id IN (${quienes("huerto")})`,
    );
    const t = ahora.getTime();
    for (const r of rows) {
      const a = Array.isArray(r.huerto) ? r.huerto : [];
      const listas = leerHuerto(a, a.length).filter((p) => p.semilla && p.plantado && faltan(p, t) === 0 && t - new Date(p.plantado).getTime() < 2 * 86400000);
      if (!listas.length) continue;
      const ultima = listas.map((p) => p.plantado as string).sort().at(-1) as string;
      const titulo = listas.length === 1 ? "🌾 Un surco de tu huerto está listo para segar" : `🌾 ${listas.length} surcos de tu huerto están listos para segar`;
      if (await avisar(Number(r.user_id), "huerto", ultima, titulo, "Ve a tu huerto en Jerusalén: espanta las aves, siega y lleva las gavillas al granero.", 6 * 3600)) salieron.push({ tipo: "huerto", userId: Number(r.user_id), titulo });
    }
  }

  // las obras de la casa (shared/obras.ts): cuando terminan la que estaba en obra (va con los avisos del huerto).
  // Si la persona ya entró a verla, el servidor la asentó y no hay nada que avisar.
  {
    const { rows } = await pool.query(
      `SELECT c.user_id, h.obras FROM game_houses h JOIN game_characters c ON c.id = h.character_id
        WHERE jsonb_typeof(h.obras->'curso') = 'object' AND c.user_id IN (${quienes("huerto")})`,
    );
    const t = ahora.getTime();
    for (const r of rows) {
      const g = leerObras(r.obras);
      const o = g.curso ? obra(g.curso.id) : undefined;
      if (!g.curso || !o) continue;
      const lista = new Date(g.curso.lista).getTime();
      if (lista > t || t - lista > 2 * 86400000) continue;
      const titulo = `${o.icono} Terminaron tu obra: ${o.nombre.charAt(0).toLowerCase()}${o.nombre.slice(1)}`;
      if (await avisar(Number(r.user_id), "huerto", `obra:${g.curso.id}:${g.curso.lista}`, titulo, "Tus vecinos ya la ven. Entra a tu casa en Jerusalén: puedes empezar otra obra.", 6 * 3600)) {
        salieron.push({ tipo: "huerto", userId: Number(r.user_id), titulo });
      }
    }
  }

  // el taller (shared/taller.ts): cuando el artesano termina la pieza fina y cuando el telar termina lo que tejía (va con
  // los avisos del huerto). Si la persona ya entró a verlo, el servidor lo entregó y no hay nada que avisar.
  {
    const { rows } = await pool.query(
      `SELECT c.user_id, h.oficios FROM game_houses h JOIN game_characters c ON c.id = h.character_id
        WHERE (jsonb_typeof(h.oficios->'artesano') = 'object' OR jsonb_typeof(h.oficios->'telar') = 'object') AND c.user_id IN (${quienes("huerto")})`,
    );
    const t = ahora.getTime();
    const reciente = (iso: string) => {
      const x = new Date(iso).getTime();
      return x <= t && t - x <= 2 * 86400000;
    };
    for (const r of rows) {
      const o = leerOficios(r.oficios);
      if (o.artesano && reciente(o.artesano.lista)) {
        const a = articulo(o.artesano.pieza);
        const titulo = `✨ El artesano terminó tu pieza fina: ${a ? a.nombre.charAt(0).toLowerCase() + a.nombre.slice(1) : "ya está lista"}`;
        if (await avisar(Number(r.user_id), "huerto", `fina:${o.artesano.pieza}:${o.artesano.lista}`, titulo, "Entra a Jerusalén a estrenarla: tus vecinos la verán.", 6 * 3600)) salieron.push({ tipo: "huerto", userId: Number(r.user_id), titulo });
      } else if (o.telar && reciente(o.telar.lista)) {
        const titulo = `🧶 Tu telar terminó: ${TELAR[o.telar.receta].nombre.toLowerCase()}`;
        if (await avisar(Number(r.user_id), "huerto", `telar:${o.telar.receta}:${o.telar.lista}`, titulo, "Entra a tu casa en Jerusalén: puedes tejer otra cosa o venderlo a tus vecinos.", 6 * 3600)) salieron.push({ tipo: "huerto", userId: Number(r.user_id), titulo });
      }
    }
  }

  // los eventos del año (shared/anio.ts): el primer día de cada fiesta grande, y la hora de las trompetas de la luna nueva
  {
    const d = diaEnJerusalen(ahora.getTime());
    let aviso: { titulo: string; cuerpo: string } | null = null;
    for (const a of d.eventos) {
      const e = a.evento;
      if (!e.avisar || a.dia !== 1) continue;
      if (e.hora) {
        if (h >= e.hora.desde && h < e.hora.hasta) aviso = { titulo: `🎺 ${e.hora.titulo}: hasta las ${e.hora.hasta === 21 ? "9" : e.hora.hasta} de la noche`, cuerpo: `${e.nombre} en Jerusalén: el servicio en el templo vale ×${e.hora.merito.toLocaleString("es-419")} durante la hora especial.` };
      } else if (!aviso) {
        // la ropa de esa fiesta (shared/mercado.ts): solo se vende en estos días
        const prenda = ROPA_DEL_ANIO.find((p) => p.deTemporada && "eventos" in p.deTemporada && p.deTemporada.eventos.includes(e.id));
        aviso = {
          titulo: `${e.icono} Hoy en Jerusalén: ${e.nombre}`,
          cuerpo: `${e.corto}. Mérito ×${e.merito.toLocaleString("es-419")} en el templo mientras dure.${prenda ? ` En el mercado: ${prenda.nombre.charAt(0).toLowerCase()}${prenda.nombre.slice(1)}, solo en estos días.` : ""}`,
        };
      }
    }
    if (aviso) {
      const { rows } = await pool.query(quienes("fiestas"));
      for (const r of rows)
        if (await avisar(Number(r.user_id), "fiestas", hoy, aviso.titulo, aviso.cuerpo, 6 * 3600)) salieron.push({ tipo: "fiestas", userId: Number(r.user_id), titulo: aviso.titulo });
    }
  }
  return salieron;
}

/** El reto de un duelo de sabios, al instante (el aviso vive lo que dura el reto). */
export async function avisarDuelo(userId: number, de: string, retoId: number, segundos: number): Promise<boolean> {
  if (enSilencio(horaTexas(new Date()))) return false;
  const { rows } = await pool.query(`${quienes("duelos")} AND p.user_id = $1`, [userId]);
  if (!rows.length) return false;
  return avisar(userId, "duelos", String(retoId), `⚔️ ${de} te reta a un duelo de sabios`, `Tienes ${segundos} segundos para aceptar en «¿Quién es sabio?».`, segundos);
}

/** La invitación a «La noche de los sabios» (va con los avisos de duelos: los dos son de «¿Quién es sabio?»). */
export async function avisarNoche(userId: number, de: string, nocheId: number, codigo: string, segundos: number): Promise<boolean> {
  if (enSilencio(horaTexas(new Date()))) return false;
  const { rows } = await pool.query(`${quienes("duelos")} AND p.user_id = $1`, [userId]);
  if (!rows.length) return false;
  return avisar(userId, "duelos", `noche-${nocheId}`, `🌙 ${de} te invita a «La noche de los sabios»`, `Entra a «¿Quién es sabio?» con el código ${codigo}.`, segundos);
}

async function vista(userId: number): Promise<AvisosVista> {
  const [{ rows: p }, { rows: s }] = await Promise.all([
    pool.query(`SELECT activo, racha, huerto, duelos, fiestas FROM game_avisos_pref WHERE user_id = $1`, [userId]),
    pool.query(`SELECT count(*)::int AS n FROM push_subscriptions WHERE user_id = $1`, [userId]),
  ]);
  const f = p[0];
  return {
    configurado: isPushConfigured,
    pref: f ? { activo: !!f.activo, racha: !!f.racha, huerto: !!f.huerto, duelos: !!f.duelos, fiestas: !!f.fiestas } : null,
    telefonos: Number(s[0]?.n || 0),
  };
}

export function registerAvisosRoutes(app: Express) {
  const quien = (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      res.sendStatus(401);
      return null;
    }
    if (!req.user!.isActive) {
      res.status(403).json({ message: "Tu cuenta debe estar aprobada para jugar en línea." });
      return null;
    }
    return req.user!.id;
  };

  app.get("/api/jerusalen/avisos", async (req: Request, res: Response) => {
    try {
      const uid = quien(req, res);
      if (!uid) return;
      res.setHeader("Cache-Control", "no-store");
      res.json(await vista(uid));
    } catch (err) {
      console.error("[avisos] vista:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });

  // Elegir los avisos: { activo?, racha?, huerto?, duelos?, fiestas? } (lo que no venga queda como estaba).
  app.post("/api/jerusalen/avisos", async (req: Request, res: Response) => {
    try {
      const uid = quien(req, res);
      if (!uid) return;
      const b = (req.body ?? {}) as Record<string, unknown>;
      const v = (k: string) => (typeof b[k] === "boolean" ? b[k] : null);
      await pool.query(
        `INSERT INTO game_avisos_pref (user_id, activo, racha, huerto, duelos, fiestas)
         VALUES ($1, COALESCE($2::boolean, true), COALESCE($3::boolean, true), COALESCE($4::boolean, true), COALESCE($5::boolean, true), COALESCE($6::boolean, true))
         ON CONFLICT (user_id) DO UPDATE SET
           activo = COALESCE($2::boolean, game_avisos_pref.activo), racha = COALESCE($3::boolean, game_avisos_pref.racha),
           huerto = COALESCE($4::boolean, game_avisos_pref.huerto), duelos = COALESCE($5::boolean, game_avisos_pref.duelos),
           fiestas = COALESCE($6::boolean, game_avisos_pref.fiestas), updated_at = now()`,
        [uid, v("activo"), v("racha"), v("huerto"), v("duelos"), v("fiestas")],
      );
      res.json(await vista(uid));
    } catch (err) {
      console.error("[avisos] elegir:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });

  // Solo en local, para las pruebas: revisar ahora (con la hora que se pida).
  if (process.env.NODE_ENV !== "production") {
    app.post("/api/jerusalen/avisos/revisar", async (req: Request, res: Response) => {
      try {
        if (!quien(req, res)) return;
        const ahora = typeof req.body?.ahora === "string" ? new Date(req.body.ahora) : new Date();
        res.json({ avisos: await revisarAvisos(ahora) });
      } catch (err) {
        console.error("[avisos] revisar:", err);
        if (!res.headersSent) res.sendStatus(500);
      }
    });
  }

  // Cada 3 minutos, si el servidor tiene los avisos encendidos.
  if (isPushConfigured) {
    let corriendo = false;
    const t = setInterval(() => {
      if (corriendo) return;
      corriendo = true;
      revisarAvisos()
        .catch((e) => console.error("[avisos] revisar:", e))
        .finally(() => {
          corriendo = false;
        });
    }, 3 * 60_000);
    t.unref?.();
  }
}
