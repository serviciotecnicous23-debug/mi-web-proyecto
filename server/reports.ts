import type { Express, Request } from "express";
import { sql } from "drizzle-orm";
import { z } from "zod";
import { db } from "./db";
import { storage } from "./storage";
import { DENUNCIAS_POR_DIA, MOTIVOS_DE_DENUNCIA, NOMBRE_DEL_TIPO, TIPOS_DENUNCIABLES, type TipoDenunciable } from "@shared/reports";

// Denunciar contenido (Comunidad, comentarios y muro de oración). Lo piden las normas de las
// tiendas para contenido de usuarios y los Términos dicen que los líderes moderan.
//
// - Cualquier persona con sesión puede denunciar lo de otros (no lo suyo), hasta 10 al día.
//   Una denuncia por persona y contenido: si repite, se actualiza el motivo.
// - La administración recibe un aviso en la campana (sin correo ni push) y la revisa en el
//   panel, pestaña Denuncias. Al resolver un contenido se cierran todas sus denuncias.

const MOTIVOS = Object.keys(MOTIVOS_DE_DENUNCIA) as [keyof typeof MOTIVOS_DE_DENUNCIA, ...(keyof typeof MOTIVOS_DE_DENUNCIA)[]];

const crearInput = z.object({
  contentType: z.enum(TIPOS_DENUNCIABLES),
  contentId: z.number().int().positive(),
  reason: z.enum(MOTIVOS),
  details: z.string().trim().max(500, "Máximo 500 caracteres").optional(),
});

const resolverInput = z.object({ status: z.enum(["revisada", "descartada"]) });

type Filas<T> = { rows?: T[] };
const filas = <T>(r: unknown): T[] => (r as Filas<T>).rows ?? [];

/** Autor del contenido, o null si ya no existe. */
async function autorDe(tipo: TipoDenunciable, id: number): Promise<number | null> {
  const consulta =
    tipo === "publicacion"
      ? sql`SELECT user_id FROM member_posts WHERE id = ${id}`
      : tipo === "comentario"
        ? sql`SELECT user_id FROM post_comments WHERE id = ${id}`
        : sql`SELECT user_id FROM prayer_requests WHERE id = ${id}`;
  const [fila] = filas<{ user_id: number }>(await db.execute(consulta));
  return fila ? fila.user_id : null;
}

export function registerReportRoutes(app: Express, helpers: { isAdmin: (req: Request) => boolean }) {
  app.post("/api/reports", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Inicia sesión para denunciar." });
    const parsed = crearInput.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: parsed.error.issues[0]?.message || "Datos inválidos" });
    const { contentType, contentId, reason, details } = parsed.data;
    const yo = req.user!.id;

    const autor = await autorDe(contentType, contentId);
    if (autor === null) return res.status(404).json({ message: "Ese contenido ya no existe." });
    if (autor === yo) return res.status(400).json({ message: "No puedes denunciar tu propio contenido." });

    const [{ hoy }] = filas<{ hoy: number }>(
      await db.execute(sql`SELECT count(*)::int AS hoy FROM content_reports WHERE reporter_id = ${yo} AND created_at > now() - interval '1 day'`),
    );
    if (hoy >= DENUNCIAS_POR_DIA) {
      return res.status(429).json({ message: "Ya enviaste muchas denuncias hoy. Si es urgente, escríbenos desde Contacto." });
    }

    await db.execute(sql`
      INSERT INTO content_reports (reporter_id, content_type, content_id, reason, details)
      VALUES (${yo}, ${contentType}, ${contentId}, ${reason}, ${details || null})
      ON CONFLICT (reporter_id, content_type, content_id)
      DO UPDATE SET reason = EXCLUDED.reason, details = EXCLUDED.details, status = 'pendiente',
                    reviewed_by = NULL, reviewed_at = NULL, created_at = now()
    `);

    // Aviso en la campana de la administración (uno sin leer a la vez, para no llenarla).
    try {
      const admins = filas<{ id: number }>(
        await db.execute(sql`
          SELECT u.id FROM users u
          WHERE u.role IN ('admin', 'director', 'staff_global') AND u.is_active = true
            AND NOT EXISTS (SELECT 1 FROM notifications n WHERE n.user_id = u.id AND n.type = 'denuncia' AND n.is_read = false)
        `),
      );
      for (const a of admins) {
        await storage.createNotification({
          userId: a.id,
          type: "denuncia",
          title: "Nueva denuncia para revisar",
          content: `${NOMBRE_DEL_TIPO[contentType]}: ${MOTIVOS_DE_DENUNCIA[reason]}`,
          link: "/admin?tab=denuncias",
        });
      }
    } catch (err) {
      console.error("[denuncias] No se pudo avisar a la administración", err);
    }

    res.status(201).json({ ok: true });
  });

  app.get("/api/admin/reports", async (req, res) => {
    if (!helpers.isAdmin(req)) return res.sendStatus(403);
    const lista = filas(
      await db.execute(sql`
        SELECT r.id, r.content_type AS "contentType", r.content_id AS "contentId", r.reason, r.details, r.status,
               r.created_at AS "createdAt", r.reviewed_at AS "reviewedAt",
               rep.display_name AS "reporterName",
               COALESCE(p.content, c.content, pr.content) AS content,
               COALESCE(p.user_id, c.user_id, pr.user_id) AS "authorId",
               au.display_name AS "authorName",
               c.post_id AS "postId",
               (SELECT count(*)::int FROM content_reports r2
                 WHERE r2.content_type = r.content_type AND r2.content_id = r.content_id AND r2.status = 'pendiente') AS "pendingForContent"
        FROM content_reports r
        LEFT JOIN users rep ON rep.id = r.reporter_id
        LEFT JOIN member_posts p ON r.content_type = 'publicacion' AND p.id = r.content_id
        LEFT JOIN post_comments c ON r.content_type = 'comentario' AND c.id = r.content_id
        LEFT JOIN prayer_requests pr ON r.content_type = 'oracion' AND pr.id = r.content_id
        LEFT JOIN users au ON au.id = COALESCE(p.user_id, c.user_id, pr.user_id)
        ORDER BY (r.status = 'pendiente') DESC, r.created_at DESC
        LIMIT 200
      `),
    );
    res.json(lista);
  });

  // Resolver: cierra todas las denuncias pendientes del mismo contenido.
  app.patch("/api/admin/reports/:id", async (req, res) => {
    if (!helpers.isAdmin(req)) return res.sendStatus(403);
    const parsed = resolverInput.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Estado inválido" });
    const id = Number(req.params.id);
    const [denuncia] = filas<{ content_type: string; content_id: number }>(
      await db.execute(sql`SELECT content_type, content_id FROM content_reports WHERE id = ${id}`),
    );
    if (!denuncia) return res.status(404).json({ message: "Denuncia no encontrada" });
    await db.execute(sql`
      UPDATE content_reports SET status = ${parsed.data.status}, reviewed_by = ${req.user!.id}, reviewed_at = now()
      WHERE content_type = ${denuncia.content_type} AND content_id = ${denuncia.content_id} AND status = 'pendiente'
    `);
    res.json({ ok: true });
  });
}
