import type { Express, Request } from "express";
import { z } from "zod";
import { and, desc, eq, inArray, ne, sql } from "drizzle-orm";
import { db } from "./db";
import { storage } from "./storage";
import { users, notifications, prayerRequests, prayerRequestPrayers, PRAYER_CATEGORIES } from "@shared/schema";
import { localDate } from "@shared/club";

// Muro de oración: los miembros piden oración (a toda la comunidad o solo a los
// líderes, con o sin nombre) y los demás oran con un toque. El autor recibe como
// mucho un aviso al día ("hoy oraron por tu petición") y, cuando la marca como
// respondida, se avisa a quienes oraron.

const DEFAULT_TZ = "America/Chicago";
const PRAYER_LINK = "/oracion";
const MAX_REQUESTS_PER_DAY = 5;

function safeTimeZone(tz: unknown): string {
  if (typeof tz !== "string" || tz.length > 64) return DEFAULT_TZ;
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: tz });
    return tz;
  } catch {
    return DEFAULT_TZ;
  }
}

const excerpt = (text: string) => (text.length > 80 ? `${text.slice(0, 77)}…` : text);

const createInput = z.object({
  content: z.string().trim().min(5, "Escribe un poco más tu petición").max(1000, "Máximo 1000 caracteres"),
  category: z.enum(Object.keys(PRAYER_CATEGORIES) as [keyof typeof PRAYER_CATEGORIES, ...(keyof typeof PRAYER_CATEGORIES)[]]).default("otro"),
  visibility: z.enum(["comunidad", "lideres"]).default("comunidad"),
  isAnonymous: z.boolean().default(false),
  tz: z.string().max(64).optional(),
});

export function registerPrayerWallRoutes(
  app: Express,
  helpers: { isTeacherOrAdmin: (req: Request) => boolean; isAdmin: (req: Request) => boolean },
) {
  app.get("/api/prayer-requests", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (!req.user!.isActive) return res.sendStatus(403);
    try {
      const userId = req.user!.id;
      const leader = helpers.isTeacherOrAdmin(req);
      const today = localDate(safeTimeZone(req.query.tz));
      const rows = await db
        .select({ request: prayerRequests, displayName: users.displayName, avatarUrl: users.avatarUrl })
        .from(prayerRequests)
        .innerJoin(users, eq(users.id, prayerRequests.userId))
        .where(and(
          eq(prayerRequests.isHidden, false),
          // "Solo líderes": las ven el autor y los líderes.
          leader ? sql`true` : sql`(${prayerRequests.visibility} = 'comunidad' OR ${prayerRequests.userId} = ${userId})`,
        ))
        .orderBy(desc(prayerRequests.createdAt))
        .limit(100);
      const ids = rows.map((r) => r.request.id);
      const counts = ids.length
        ? await db
            .select({ requestId: prayerRequestPrayers.requestId, people: sql<number>`count(DISTINCT ${prayerRequestPrayers.userId})::int` })
            .from(prayerRequestPrayers)
            .where(inArray(prayerRequestPrayers.requestId, ids))
            .groupBy(prayerRequestPrayers.requestId)
        : [];
      const mineToday = ids.length
        ? await db
            .select({ requestId: prayerRequestPrayers.requestId })
            .from(prayerRequestPrayers)
            .where(and(inArray(prayerRequestPrayers.requestId, ids), eq(prayerRequestPrayers.userId, userId), eq(prayerRequestPrayers.prayedOn, today)))
        : [];
      const countOf = new Map(counts.map((c) => [c.requestId, c.people]));
      const prayedToday = new Set(mineToday.map((m) => m.requestId));
      res.json(rows.map(({ request: r, displayName, avatarUrl }) => {
        const mine = r.userId === userId;
        const showAuthor = !r.isAnonymous || mine || leader;
        return {
          id: r.id,
          content: r.content,
          category: r.category,
          visibility: r.visibility,
          isAnonymous: r.isAnonymous,
          status: r.status,
          answeredNote: r.answeredNote,
          answeredAt: r.answeredAt,
          createdAt: r.createdAt,
          author: showAuthor ? { displayName: displayName || "Miembro", avatarUrl } : null,
          mine,
          prayerCount: countOf.get(r.id) ?? 0,
          prayedToday: prayedToday.has(r.id),
          canManage: mine || helpers.isAdmin(req),
        };
      }));
    } catch (err) {
      console.error("[oración] no se pudo listar el muro:", err);
      res.status(500).json({ message: "No se pudo cargar el muro de oración" });
    }
  });

  app.post("/api/prayer-requests", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (!req.user!.isActive) return res.sendStatus(403);
    const parsed = createInput.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: parsed.error.issues[0]?.message ?? "Datos no válidos" });
    const tz = safeTimeZone(parsed.data.tz);
    const today = localDate(tz);
    const [{ n }] = (await db.execute(sql`
      SELECT count(*)::int AS n FROM prayer_requests
      WHERE user_id = ${req.user!.id}
        AND to_char(((created_at) AT TIME ZONE current_setting('TimeZone')) AT TIME ZONE ${tz}, 'YYYY-MM-DD') = ${today}
    `)).rows as { n: number }[];
    if (n >= MAX_REQUESTS_PER_DAY) return res.status(429).json({ message: "Ya compartiste varias peticiones hoy. Inténtalo mañana." });
    const { content, category, visibility, isAnonymous } = parsed.data;
    const [created] = await db.insert(prayerRequests).values({ userId: req.user!.id, content, category, visibility, isAnonymous }).returning();
    res.status(201).json(created);
  });

  // "Oré por esto": una vez por persona y día. Al autor se le avisa como mucho una
  // vez al día y sin nombres.
  app.post("/api/prayer-requests/:id/pray", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (!req.user!.isActive) return res.sendStatus(403);
    const id = Number(req.params.id);
    const [request] = await db.select().from(prayerRequests).where(and(eq(prayerRequests.id, id), eq(prayerRequests.isHidden, false))).limit(1);
    if (!request) return res.status(404).json({ message: "Petición no encontrada" });
    if (request.visibility === "lideres" && request.userId !== req.user!.id && !helpers.isTeacherOrAdmin(req)) return res.sendStatus(403);
    const today = localDate(safeTimeZone(req.body?.tz));
    await db.insert(prayerRequestPrayers).values({ requestId: id, userId: req.user!.id, prayedOn: today }).onConflictDoNothing();
    if (request.userId !== req.user!.id && request.lastNotifiedOn !== today && request.status === "abierta") {
      await db.update(prayerRequests).set({ lastNotifiedOn: today }).where(eq(prayerRequests.id, id));
      await storage.createNotification({
        userId: request.userId,
        type: "oracion",
        title: "🙏 Hoy oraron por tu petición",
        content: `La comunidad está orando por: «${excerpt(request.content)}»`,
        link: PRAYER_LINK,
      });
    }
    const [{ people }] = (await db.execute(sql`SELECT count(DISTINCT user_id)::int AS people FROM prayer_request_prayers WHERE request_id = ${id}`)).rows as { people: number }[];
    res.json({ prayedToday: true, prayerCount: people });
  });

  // El autor marca su petición como respondida (con testimonio opcional) y se avisa
  // a quienes oraron por ella.
  app.post("/api/prayer-requests/:id/answered", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const id = Number(req.params.id);
    const [request] = await db.select().from(prayerRequests).where(eq(prayerRequests.id, id)).limit(1);
    if (!request) return res.status(404).json({ message: "Petición no encontrada" });
    if (request.userId !== req.user!.id && !helpers.isAdmin(req)) return res.sendStatus(403);
    const note = z.string().trim().max(1000).optional().safeParse(req.body?.note);
    if (!note.success) return res.status(400).json({ message: "El testimonio es muy largo" });
    const [updated] = await db
      .update(prayerRequests)
      .set({ status: "respondida", answeredNote: note.data || null, answeredAt: new Date() })
      .where(eq(prayerRequests.id, id))
      .returning();
    if (request.status !== "respondida") {
      const prayers = await db
        .selectDistinct({ userId: prayerRequestPrayers.userId })
        .from(prayerRequestPrayers)
        .where(and(eq(prayerRequestPrayers.requestId, id), ne(prayerRequestPrayers.userId, request.userId)));
      if (prayers.length > 0) {
        await db.insert(notifications).values(prayers.map((p) => ({
          userId: p.userId,
          type: "oracion",
          title: "🙌 ¡Dios respondió una oración!",
          content: `Una petición por la que oraste fue respondida: «${excerpt(request.content)}»`,
          link: PRAYER_LINK,
        })));
      }
    }
    res.json(updated);
  });

  app.delete("/api/prayer-requests/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const id = Number(req.params.id);
    const [request] = await db.select({ userId: prayerRequests.userId }).from(prayerRequests).where(eq(prayerRequests.id, id)).limit(1);
    if (!request) return res.status(404).json({ message: "Petición no encontrada" });
    if (request.userId !== req.user!.id && !helpers.isAdmin(req)) return res.sendStatus(403);
    await db.delete(prayerRequests).where(eq(prayerRequests.id, id));
    res.json({ deleted: true });
  });
}

/** ¿Oró hoy por la petición de otra persona? (desafío "Ora por alguien" del club). */
export async function prayedForOthersToday(userId: number, today: string): Promise<boolean> {
  const rows = await db
    .select({ id: prayerRequestPrayers.id })
    .from(prayerRequestPrayers)
    .innerJoin(prayerRequests, eq(prayerRequests.id, prayerRequestPrayers.requestId))
    .where(and(eq(prayerRequestPrayers.userId, userId), eq(prayerRequestPrayers.prayedOn, today), ne(prayerRequests.userId, userId)))
    .limit(1);
  return rows.length > 0;
}
