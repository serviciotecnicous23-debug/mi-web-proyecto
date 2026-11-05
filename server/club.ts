import type { Express, Request } from "express";
import { z } from "zod";
import { and, asc, desc, eq, gte, inArray, sql } from "drizzle-orm";
import { db } from "./db";
import { storage } from "./storage";
import { getBibleChapter } from "./bible";
import {
  BIBLE_BOOKS, users, bibleNotes, bibleReadingLog, clubChallenges, clubChallengeMembers, clubMemoryVerses,
  memberProgress, notifications, readingClubPosts, readingClubComments, readingPlans, readingPlanItems,
  type ClubChallenge,
} from "@shared/schema";
import { BIBLE_BOOK_CHAPTERS, bibleBookLabel, isBibleVersion } from "@shared/bible";
import {
  CHALLENGE_PRESETS, CLUB_BADGES, addDays, chaptersOfBooks, daysBetween, isDateString, isoWeek, localDate,
  memoryVerseForWeek, minReadingSeconds, normalizeWord,
  type ChapterRef, type ClubBadgeType, type ClubChallengeSummary, type ClubDailyChallenge, type ClubSummary,
  type ReadingRecordResult,
} from "@shared/club";

// Club de lectura vivo: la web registra lo que el miembro hace (leer un capítulo
// hasta el final, escribir una nota, comentar, memorizar) y con eso calcula sus
// desafíos, su racha, sus insignias y el progreso de los desafíos del club. Nada
// se marca a mano.

const DEFAULT_TZ = "America/Chicago";
const CLUB_LINK = "/biblioteca?tab=club";
const CLUB_BADGE_TYPES = Object.keys(CLUB_BADGES) as ClubBadgeType[];

/** Zona horaria IANA del lector, o la del ministerio si no es válida. */
function safeTimeZone(tz: unknown): string {
  if (typeof tz !== "string" || tz.length > 64) return DEFAULT_TZ;
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: tz });
    return tz;
  } catch {
    return DEFAULT_TZ;
  }
}

const chapterKey = (c: ChapterRef) => `${c.book}|${c.chapter}`;

/** Fecha local (en `tz`) de una columna timestamp, como "YYYY-MM-DD". */
const localDay = (column: unknown, tz: string) =>
  sql`to_char(((${column}) AT TIME ZONE current_setting('TimeZone')) AT TIME ZONE ${tz}, 'YYYY-MM-DD')`;

async function readingDates(userId: number): Promise<string[]> {
  const rows = await db
    .selectDistinct({ day: bibleReadingLog.readOn })
    .from(bibleReadingLog)
    .where(eq(bibleReadingLog.userId, userId))
    .orderBy(desc(bibleReadingLog.readOn))
    .limit(400);
  return rows.map((r) => r.day);
}

function computeStreak(dates: string[], today: string) {
  const set = new Set(dates);
  const readToday = set.has(today);
  // Si hoy aún no lee, la racha sigue viva desde ayer: no se pierde hasta mañana.
  let current = 0;
  let cursor = readToday ? today : addDays(today, -1);
  while (set.has(cursor)) {
    current++;
    cursor = addDays(cursor, -1);
  }
  let best = 0;
  let run = 0;
  let prev: string | null = null;
  for (const day of [...dates].sort()) {
    run = prev && daysBetween(prev, day) === 1 ? run + 1 : 1;
    best = Math.max(best, run);
    prev = day;
  }
  const last7 = Array.from({ length: 7 }, (_, i) => set.has(addDays(today, i - 6)));
  return { current, best: Math.max(best, current), readToday, last7 };
}

/** Da una insignia del club (una vez; la de desafío, una por desafío) y avisa en la campana. */
async function awardBadge(userId: number, type: ClubBadgeType, details?: string): Promise<boolean> {
  const existing = await db
    .select({ id: memberProgress.id })
    .from(memberProgress)
    .where(and(
      eq(memberProgress.userId, userId),
      eq(memberProgress.badgeType, type),
      details ? eq(memberProgress.details, details) : sql`true`,
    ))
    .limit(1);
  if (existing.length > 0) return false;
  await db.insert(memberProgress).values({ userId, badgeType: type, details: details ?? null });
  const badge = CLUB_BADGES[type];
  await storage.createNotification({
    userId,
    type: "insignia",
    title: `${badge.icon} Nueva insignia: ${badge.label}`,
    content: badge.desc,
    link: CLUB_LINK,
  });
  return true;
}

function challengeShape(challenge: ClubChallenge, today: string) {
  const chapters = challenge.chapters ?? [];
  const perDay = Math.max(1, challenge.chaptersPerDay);
  const totalDays = Math.max(1, Math.ceil(chapters.length / perDay));
  const dayNumber = daysBetween(challenge.startDate, today) + 1;
  const status: ClubChallengeSummary["status"] =
    dayNumber < 1 ? "proximo" : dayNumber > totalDays ? "terminado" : "activo";
  const todayChapters = status === "activo" ? chapters.slice((dayNumber - 1) * perDay, dayNumber * perDay) : [];
  const expectedByToday = Math.min(chapters.length, Math.max(0, dayNumber) * perDay);
  return { chapters, perDay, totalDays, dayNumber, status, todayChapters, expectedByToday, endDate: addDays(challenge.startDate, totalDays - 1) };
}

/** Lecturas (capítulo + día) de varios usuarios desde una fecha. */
async function readingsSince(userIds: number[], since: string) {
  if (userIds.length === 0) return [];
  return db
    .select({ userId: bibleReadingLog.userId, book: bibleReadingLog.book, chapter: bibleReadingLog.chapter, readOn: bibleReadingLog.readOn })
    .from(bibleReadingLog)
    .where(and(inArray(bibleReadingLog.userId, userIds), gte(bibleReadingLog.readOn, since)));
}

async function completeFinishedChallenges(userId: number, today: string): Promise<ClubBadgeType[]> {
  const joined = await db
    .select({ challenge: clubChallenges })
    .from(clubChallengeMembers)
    .innerJoin(clubChallenges, eq(clubChallenges.id, clubChallengeMembers.challengeId))
    .where(eq(clubChallengeMembers.userId, userId));
  const awarded: ClubBadgeType[] = [];
  for (const { challenge } of joined) {
    const keys = new Set((challenge.chapters ?? []).map(chapterKey));
    if (keys.size === 0 || challenge.startDate > today) continue;
    const reads = await readingsSince([userId], challenge.startDate);
    const done = new Set(reads.map(chapterKey).filter((k) => keys.has(k)));
    if (done.size >= keys.size && await awardBadge(userId, "desafio_club", `desafio:${challenge.id}`)) {
      awarded.push("desafio_club");
    }
  }
  return awarded;
}

function memoryVerseParts(text: string, blanks: string[]) {
  const parts: (string | { blank: number })[] = [];
  let rest = text;
  blanks.forEach((word, index) => {
    const at = rest.indexOf(word);
    if (at < 0) return;
    if (at > 0) parts.push(rest.slice(0, at));
    parts.push({ blank: index });
    rest = rest.slice(at + word.length);
  });
  if (rest) parts.push(rest);
  return parts;
}

async function suggestedReading(
  userId: number,
  challenges: ClubChallengeSummary[],
): Promise<ClubSummary["suggested"]> {
  for (const c of challenges) {
    if (!c.joined || c.status !== "activo") continue;
    const next = c.todayReading.find((r) => !r.read);
    if (next) return { book: next.book, chapter: next.chapter, reason: `Lectura de hoy: ${c.title}` };
  }
  const [planItem] = await db
    .select({ book: readingPlanItems.book, chapter: readingPlanItems.chapter, title: readingPlans.title })
    .from(readingPlanItems)
    .innerJoin(readingPlans, eq(readingPlans.id, readingPlanItems.planId))
    .where(and(eq(readingPlans.userId, userId), eq(readingPlanItems.isCompleted, false)))
    .orderBy(desc(readingPlans.createdAt), asc(readingPlanItems.sortOrder))
    .limit(1);
  if (planItem) return { book: planItem.book, chapter: planItem.chapter, reason: `Sigue tu plan: ${planItem.title}` };
  const [last] = await db
    .select({ book: bibleReadingLog.book, chapter: bibleReadingLog.chapter })
    .from(bibleReadingLog)
    .where(eq(bibleReadingLog.userId, userId))
    .orderBy(desc(bibleReadingLog.createdAt))
    .limit(1);
  if (last) {
    const max = BIBLE_BOOK_CHAPTERS[last.book] ?? 0;
    if (last.chapter < max) return { book: last.book, chapter: last.chapter + 1, reason: "Continúa donde quedaste" };
    const nextBook = (BIBLE_BOOKS as readonly string[])[(BIBLE_BOOKS as readonly string[]).indexOf(last.book) + 1];
    if (nextBook) return { book: nextBook, chapter: 1, reason: "Continúa donde quedaste" };
  }
  return { book: "Juan", chapter: 1, reason: "Un buen comienzo: el Evangelio de Juan" };
}

async function buildSummary(req: Request, tz: string, canLead: boolean): Promise<ClubSummary> {
  const userId = req.user!.id;
  const today = localDate(tz);
  const week = isoWeek(today);

  const [dates, totals, noteToday, postToday, commentToday, memoryDone, badgeRows, community] = await Promise.all([
    readingDates(userId),
    db.execute(sql`SELECT COUNT(DISTINCT (book, chapter))::int AS n FROM bible_reading_log WHERE user_id = ${userId}`),
    db.select({ id: bibleNotes.id }).from(bibleNotes).where(and(eq(bibleNotes.userId, userId), sql`${localDay(bibleNotes.createdAt, tz)} = ${today}`)).limit(1),
    db.select({ id: readingClubPosts.id }).from(readingClubPosts).where(and(eq(readingClubPosts.userId, userId), sql`${localDay(readingClubPosts.createdAt, tz)} = ${today}`)).limit(1),
    db.select({ id: readingClubComments.id }).from(readingClubComments).where(and(eq(readingClubComments.userId, userId), sql`${localDay(readingClubComments.createdAt, tz)} = ${today}`)).limit(1),
    db.select({ id: clubMemoryVerses.id }).from(clubMemoryVerses).where(and(eq(clubMemoryVerses.userId, userId), eq(clubMemoryVerses.week, week))).limit(1),
    db.select({ type: memberProgress.badgeType, earnedAt: memberProgress.earnedAt, details: memberProgress.details })
      .from(memberProgress)
      .where(and(eq(memberProgress.userId, userId), inArray(memberProgress.badgeType, CLUB_BADGE_TYPES)))
      .orderBy(desc(memberProgress.earnedAt)),
    db.execute(sql`SELECT COUNT(*)::int AS chapters, COUNT(DISTINCT user_id)::int AS readers FROM bible_reading_log WHERE read_on >= ${addDays(today, -6)}`),
  ]);
  const streak = computeStreak(dates, today);

  // Desafíos del club: activos, o terminados hace menos de una semana.
  const rows = await db.select().from(clubChallenges).where(eq(clubChallenges.isActive, true)).orderBy(desc(clubChallenges.startDate)).limit(12);
  const shaped = rows
    .map((c) => ({ c, s: challengeShape(c, today) }))
    .filter(({ s }) => s.endDate >= addDays(today, -7));
  const ids = shaped.map(({ c }) => c.id);
  const memberRows = ids.length
    ? await db
        .select({ challengeId: clubChallengeMembers.challengeId, userId: users.id, displayName: users.displayName, avatarUrl: users.avatarUrl })
        .from(clubChallengeMembers)
        .innerJoin(users, eq(users.id, clubChallengeMembers.userId))
        .where(inArray(clubChallengeMembers.challengeId, ids))
    : [];
  const since = shaped.reduce((min, { c }) => (c.startDate < min ? c.startDate : min), today);
  const reads = await readingsSince([...new Set([userId, ...memberRows.map((m) => m.userId)])], since);

  const challenges: ClubChallengeSummary[] = shaped.map(({ c, s }) => {
    const keys = new Set(s.chapters.map(chapterKey));
    const progressOf = (uid: number) => {
      const mine = reads.filter((r) => r.userId === uid && r.readOn >= c.startDate && keys.has(chapterKey(r)));
      return {
        done: new Set(mine.map(chapterKey)),
        readToday: mine.some((r) => r.readOn === today),
      };
    };
    const members = memberRows
      .filter((m) => m.challengeId === c.id)
      .map((m) => {
        const p = progressOf(m.userId);
        return { userId: m.userId, displayName: m.displayName || "Miembro", avatarUrl: m.avatarUrl, completed: p.done.size, readToday: p.readToday };
      })
      .sort((a, b) => b.completed - a.completed || Number(b.readToday) - Number(a.readToday));
    const me = progressOf(userId);
    return {
      id: c.id,
      title: c.title,
      description: c.description,
      startDate: c.startDate,
      endDate: s.endDate,
      chaptersPerDay: s.perDay,
      totalChapters: s.chapters.length,
      totalDays: s.totalDays,
      dayNumber: s.dayNumber,
      status: s.status,
      joined: members.some((m) => m.userId === userId),
      myCompleted: me.done.size,
      expectedByToday: s.expectedByToday,
      // Quien va adelantado ya tiene hecha la lectura de hoy.
      todayReading: s.todayChapters.map((r) => ({ ...r, read: me.done.has(chapterKey(r)) })),
      memberCount: members.length,
      membersReadToday: members.filter((m) => m.readToday).length,
      members: members.slice(0, 8),
      canManage: canLead || c.createdBy === userId,
    };
  });

  const joinedActive = challenges.filter((c) => c.joined && c.status === "activo");
  const daily: ClubDailyChallenge[] = [
    { id: "leer", title: "Lee un capítulo", desc: "En la pestaña Biblia, hasta el final del capítulo.", done: streak.readToday },
  ];
  if (joinedActive.length > 0) {
    const pending = joinedActive.flatMap((c) => c.todayReading);
    daily.push({
      id: "desafio",
      title: "Lectura del desafío",
      desc: `Hoy toca ${pending.map((r) => `${bibleBookLabel(r.book)} ${r.chapter}`).join(", ") || "descanso"}.`,
      done: pending.length > 0 && pending.every((r) => r.read),
    });
  }
  daily.push(
    { id: "reflexion", title: "Escribe una reflexión", desc: "Toca un versículo en la Biblia y agrega una nota.", done: noteToday.length > 0 },
    { id: "compartir", title: "Comparte con el club", desc: "Publica o comenta una reflexión en el club.", done: postToday.length > 0 || commentToday.length > 0 },
    { id: "versiculo", title: "Versículo de la semana", desc: "Complétalo de memoria (una vez por semana).", done: memoryDone.length > 0 },
  );

  const verse = memoryVerseForWeek(week);
  const total = (totals.rows[0] as { n?: number } | undefined)?.n ?? 0;
  const comm = community.rows[0] as { chapters?: number; readers?: number } | undefined;

  return {
    today,
    streak,
    totalChapters: total,
    daily,
    suggested: await suggestedReading(userId, challenges),
    memoryVerse: {
      week,
      ref: verse.ref,
      book: verse.book,
      chapter: verse.chapter,
      parts: memoryVerseParts(verse.text, verse.blanks),
      blankCount: verse.blanks.length,
      blankLengths: verse.blanks.map((w) => w.length),
      done: memoryDone.length > 0,
      fullText: memoryDone.length > 0 ? verse.text : null,
    },
    badges: badgeRows.map((b) => ({ type: b.type as ClubBadgeType, earnedAt: b.earnedAt ? b.earnedAt.toISOString() : null, details: b.details })),
    challenges,
    community: { chaptersThisWeek: comm?.chapters ?? 0, readersThisWeek: comm?.readers ?? 0 },
    canCreateChallenges: canLead,
  };
}

const readingInput = z.object({
  book: z.string().min(1).max(40),
  chapter: z.number().int().positive(),
  version: z.string().min(1).max(10),
  seconds: z.number().int().min(0).max(4 * 3600),
  tz: z.string().max(64).optional(),
});

const challengeInput = z.object({
  title: z.string().trim().min(3, "El título es muy corto").max(120),
  description: z.string().trim().max(500).optional(),
  presetId: z.string().optional(),
  books: z.array(z.string()).max(66).optional(),
  chaptersPerDay: z.number().int().min(1).max(10).optional(),
  startDate: z.string(),
  notifyAll: z.boolean().optional(),
  tz: z.string().max(64).optional(),
});

const memoryInput = z.object({
  answers: z.array(z.string().max(40)).max(10),
  tz: z.string().max(64).optional(),
});

export function registerClubRoutes(app: Express, helpers: { isTeacherOrAdmin: (req: Request) => boolean }) {
  // Lectura comprobada: la envía la Biblia de la web cuando el lector llega al
  // final del capítulo y pasó el tiempo mínimo (shared/club.ts).
  app.post("/api/bible/reading", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (!req.user!.isActive) return res.sendStatus(403);
    const parsed = readingInput.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Datos de lectura no válidos" });
    const { book, chapter, version, seconds } = parsed.data;
    const max = BIBLE_BOOK_CHAPTERS[book];
    if (!max || chapter > max || !isBibleVersion(version)) return res.status(400).json({ message: "Capítulo no válido" });

    let verseCount = 25;
    try {
      verseCount = (await getBibleChapter(version, book, chapter)).verses.length;
    } catch {
      // Sin texto a mano (proveedor caído): se usa un largo típico.
    }
    if (seconds < minReadingSeconds(verseCount)) {
      return res.status(422).json({ message: "La lectura fue demasiado corta para contar" });
    }

    try {
      const userId = req.user!.id;
      const tz = safeTimeZone(parsed.data.tz);
      const today = localDate(tz);
      const [row] = await db
        .insert(bibleReadingLog)
        .values({ userId, book, chapter, version, readOn: today, seconds })
        .onConflictDoUpdate({
          target: [bibleReadingLog.userId, bibleReadingLog.book, bibleReadingLog.chapter, bibleReadingLog.readOn],
          set: { seconds: sql`GREATEST(${bibleReadingLog.seconds}, excluded.seconds)` },
        })
        .returning({ inserted: sql<boolean>`(xmax = 0)` });

      // Los planes de lectura avanzan solos con lo leído.
      const myPlans = db.select({ id: readingPlans.id }).from(readingPlans).where(eq(readingPlans.userId, userId));
      const planItems = await db
        .update(readingPlanItems)
        .set({ isCompleted: true, completedAt: new Date() })
        .where(and(
          inArray(readingPlanItems.planId, myPlans),
          eq(readingPlanItems.book, book),
          eq(readingPlanItems.chapter, chapter),
          eq(readingPlanItems.isCompleted, false),
        ))
        .returning({ id: readingPlanItems.id });

      const streak = computeStreak(await readingDates(userId), today);
      const newBadges: ClubBadgeType[] = [];
      if (await awardBadge(userId, "primer_capitulo")) newBadges.push("primer_capitulo");
      for (const [days, type] of [[7, "racha_7"], [30, "racha_30"], [100, "racha_100"]] as const) {
        if (streak.current >= days && await awardBadge(userId, type)) newBadges.push(type);
      }
      newBadges.push(...await completeFinishedChallenges(userId, today));

      const result: ReadingRecordResult = {
        recorded: true,
        firstTimeToday: Boolean(row?.inserted),
        streak: streak.current,
        planItemsCompleted: planItems.length,
        newBadges: newBadges.map((type) => ({ type, label: CLUB_BADGES[type].label, icon: CLUB_BADGES[type].icon })),
      };
      res.json(result);
    } catch (err) {
      console.error("[club] no se pudo registrar la lectura:", err);
      res.status(500).json({ message: "No se pudo registrar la lectura" });
    }
  });

  app.get("/api/club/summary", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    try {
      res.json(await buildSummary(req, safeTimeZone(req.query.tz), helpers.isTeacherOrAdmin(req)));
    } catch (err) {
      console.error("[club] no se pudo armar el resumen:", err);
      res.status(500).json({ message: "No se pudo cargar el club" });
    }
  });

  app.post("/api/club/challenges", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (!helpers.isTeacherOrAdmin(req)) return res.status(403).json({ message: "Solo líderes y maestros crean desafíos" });
    const parsed = challengeInput.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: parsed.error.issues[0]?.message ?? "Datos no válidos" });
    const input = parsed.data;
    const preset = CHALLENGE_PRESETS.find((p) => p.id === input.presetId);
    const books = preset ? [...preset.books] : (input.books ?? []).filter((b) => (BIBLE_BOOKS as readonly string[]).includes(b));
    const chapters = chaptersOfBooks(books);
    if (chapters.length === 0) return res.status(400).json({ message: "Elige al menos un libro" });
    const today = localDate(safeTimeZone(input.tz));
    if (!isDateString(input.startDate) || daysBetween(today, input.startDate) < -7 || daysBetween(today, input.startDate) > 90) {
      return res.status(400).json({ message: "La fecha de inicio debe estar entre hace una semana y dentro de 90 días" });
    }
    try {
      const [challenge] = await db
        .insert(clubChallenges)
        .values({
          title: input.title,
          description: input.description || preset?.description || null,
          chapters,
          chaptersPerDay: input.chaptersPerDay ?? preset?.chaptersPerDay ?? 1,
          startDate: input.startDate,
          createdBy: req.user!.id,
        })
        .returning();
      await db.insert(clubChallengeMembers).values({ challengeId: challenge.id, userId: req.user!.id }).onConflictDoNothing();
      if (input.notifyAll) {
        // Solo a miembros aprobados, y solo dentro de la web (sin correo ni push).
        const active = await db.select({ id: users.id }).from(users).where(eq(users.isActive, true));
        const others = active.filter((u) => u.id !== req.user!.id);
        if (others.length > 0) {
          await db.insert(notifications).values(others.map((u) => ({
            userId: u.id,
            type: "club",
            title: `🎯 Nuevo desafío del club: ${challenge.title}`,
            content: `Empieza el ${challenge.startDate}. Únete y leamos juntos.`,
            link: CLUB_LINK,
          })));
        }
      }
      res.status(201).json(challenge);
    } catch (err) {
      console.error("[club] no se pudo crear el desafío:", err);
      res.status(500).json({ message: "No se pudo crear el desafío" });
    }
  });

  app.patch("/api/club/challenges/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const id = Number(req.params.id);
    const [challenge] = await db.select().from(clubChallenges).where(eq(clubChallenges.id, id)).limit(1);
    if (!challenge) return res.status(404).json({ message: "Desafío no encontrado" });
    if (!helpers.isTeacherOrAdmin(req) && challenge.createdBy !== req.user!.id) return res.sendStatus(403);
    const parsed = z.object({ isActive: z.boolean() }).safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Datos no válidos" });
    const [updated] = await db.update(clubChallenges).set({ isActive: parsed.data.isActive }).where(eq(clubChallenges.id, id)).returning();
    res.json(updated);
  });

  app.post("/api/club/challenges/:id/join", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (!req.user!.isActive) return res.sendStatus(403);
    const id = Number(req.params.id);
    const [challenge] = await db.select({ id: clubChallenges.id }).from(clubChallenges)
      .where(and(eq(clubChallenges.id, id), eq(clubChallenges.isActive, true))).limit(1);
    if (!challenge) return res.status(404).json({ message: "Desafío no encontrado" });
    await db.insert(clubChallengeMembers).values({ challengeId: id, userId: req.user!.id }).onConflictDoNothing();
    res.json({ joined: true });
  });

  app.delete("/api/club/challenges/:id/join", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    await db.delete(clubChallengeMembers).where(and(
      eq(clubChallengeMembers.challengeId, Number(req.params.id)),
      eq(clubChallengeMembers.userId, req.user!.id),
    ));
    res.json({ joined: false });
  });

  // El servidor comprueba las palabras: no basta con decir "ya lo hice".
  app.post("/api/club/memory-verse", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (!req.user!.isActive) return res.sendStatus(403);
    const parsed = memoryInput.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Respuestas no válidas" });
    const week = isoWeek(localDate(safeTimeZone(parsed.data.tz)));
    const verse = memoryVerseForWeek(week);
    const wrong = verse.blanks
      .map((word, i) => (normalizeWord(parsed.data.answers[i] ?? "") === normalizeWord(word) ? -1 : i))
      .filter((i) => i >= 0);
    if (wrong.length > 0) return res.json({ correct: false, wrong, newBadges: [] });
    await db.insert(clubMemoryVerses).values({ userId: req.user!.id, week }).onConflictDoNothing();
    const newBadges = (await awardBadge(req.user!.id, "versiculo_memorizado"))
      ? [{ type: "versiculo_memorizado", label: CLUB_BADGES.versiculo_memorizado.label, icon: CLUB_BADGES.versiculo_memorizado.icon }]
      : [];
    res.json({ correct: true, wrong: [], newBadges });
  });
}

export async function readingClubPostAuthor(postId: number): Promise<number | null> {
  const [post] = await db.select({ userId: readingClubPosts.userId }).from(readingClubPosts).where(eq(readingClubPosts.id, postId)).limit(1);
  return post?.userId ?? null;
}

/** Avisa en la campana al autor de una reflexión del club cuando alguien la comenta. */
export async function notifyClubComment(postId: number, commenter: { id: number; displayName?: string | null }) {
  const [post] = await db
    .select({ userId: readingClubPosts.userId, book: readingClubPosts.book, chapter: readingClubPosts.chapter })
    .from(readingClubPosts)
    .where(eq(readingClubPosts.id, postId))
    .limit(1);
  if (!post || post.userId === commenter.id) return;
  await storage.createNotification({
    userId: post.userId,
    type: "club",
    title: "💬 Comentaron tu reflexión",
    content: `${commenter.displayName || "Alguien"} comentó tu reflexión sobre ${bibleBookLabel(post.book)} ${post.chapter}.`,
    link: CLUB_LINK,
  });
}
