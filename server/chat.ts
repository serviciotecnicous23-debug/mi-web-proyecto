/**
 * Mensajería directa tipo WhatsApp: texto, fotos, notas de voz, videos y documentos;
 * responder citando, reacciones, editar, eliminar (para mí o para todos), vaciar chat,
 * "escribiendo…", "en línea" y vistos (✓ enviado, ✓✓ entregado, ✓✓ visto).
 *
 * Tiempo real con Server-Sent Events: una conexión liviana por pestaña abierta en Mensajes,
 * y el servidor avisa al instante. Antes cada chat abierto pedía TODA la conversación cada
 * 5 segundos (con una consulta por mensaje para el nombre de quien lo mandó).
 *
 * Sin costos nuevos: los archivos usan la subida que ya existe (/api/upload/file, fotos
 * reducidas a WebP) con un tope de espacio por persona para el chat.
 */
import type { Express, Request, Response } from "express";
import { z } from "zod";
import { pool } from "./db";
import { storage } from "./storage";
import { isOwnFileUrl } from "./file-storage";
import { isEmailConfigured, sendDirectMessageEmail } from "./email";
import { isPushConfigured, sendPushToMany, type PushPayload } from "./push";
import { DM_REACTIONS, insertDirectMessageSchema } from "@shared/schema";

const EDIT_WINDOW_MS = 15 * 60 * 1000; // editar: 15 minutos
const DELETE_FOR_ALL_WINDOW_MS = 48 * 60 * 60 * 1000; // eliminar para todos: 48 horas
const MAX_STREAMS_PER_USER = 6;
const PAGE_SIZE = 40;

// ---------------------------------------------------------------- tiempo real
const streams = new Map<number, Set<Response>>();
let heartbeat: NodeJS.Timeout | null = null;

export function isOnline(userId: number): boolean {
  return (streams.get(userId)?.size ?? 0) > 0;
}

function emit(userId: number, event: string, data: unknown) {
  const set = streams.get(userId);
  if (!set?.size) return;
  const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
  for (const res of set) {
    try {
      res.write(payload);
    } catch {
      /* se limpia al cerrarse */
    }
  }
}

function ensureHeartbeat() {
  if (heartbeat) return;
  // Un comentario cada 25 s mantiene viva la conexión a través de los proxies.
  heartbeat = setInterval(() => {
    for (const set of streams.values()) {
      for (const res of set) {
        try {
          res.write(": ping\n\n");
        } catch {
          /* nada */
        }
      }
    }
  }, 25_000);
  heartbeat.unref?.();
}

async function recentPartners(userId: number): Promise<number[]> {
  const { rows } = await pool.query(
    `SELECT DISTINCT CASE WHEN sender_id = $1 THEN receiver_id ELSE sender_id END AS other_id
       FROM direct_messages
      WHERE (sender_id = $1 OR receiver_id = $1) AND created_at > now() - interval '90 days'
      LIMIT 300`,
    [userId],
  );
  return rows.map((r) => Number(r.other_id));
}

async function announcePresence(userId: number, online: boolean) {
  try {
    for (const other of await recentPartners(userId)) {
      if (isOnline(other)) emit(other, "presence", { userId, online });
    }
  } catch (err) {
    console.error("[chat] presencia:", err);
  }
}

// ---------------------------------------------------------------- mensajes
type Row = Record<string, any>;

const SELECT_MESSAGE = `
  SELECT m.*,
         r.sender_id AS reply_sender_id, r.content AS reply_content, r.kind AS reply_kind,
         r.deleted_at AS reply_deleted_at, r.attachment_name AS reply_attachment_name
    FROM direct_messages m
    LEFT JOIN direct_messages r ON r.id = m.reply_to_id`;

export type ChatMessage = ReturnType<typeof toMessage>;

function toMessage(r: Row) {
  const deleted = !!r.deleted_at;
  const meta = (r.attachment_meta || {}) as { width?: number; height?: number; duration?: number };
  return {
    id: Number(r.id),
    senderId: Number(r.sender_id),
    receiverId: Number(r.receiver_id),
    content: deleted ? "" : (r.content as string) || "",
    kind: (deleted ? "text" : r.kind || "text") as string,
    isRead: !!r.is_read,
    createdAt: r.created_at,
    deliveredAt: r.delivered_at || null,
    readAt: r.read_at || null,
    editedAt: deleted ? null : r.edited_at || null,
    deletedAt: r.deleted_at || null,
    clientId: r.client_id || null,
    attachment:
      !deleted && r.attachment_url
        ? {
            url: r.attachment_url as string,
            name: (r.attachment_name as string) || "archivo",
            size: r.attachment_size == null ? null : Number(r.attachment_size),
            mime: (r.attachment_mime as string) || null,
            width: meta.width ?? null,
            height: meta.height ?? null,
            duration: meta.duration ?? null,
          }
        : null,
    replyTo: r.reply_to_id
      ? {
          id: Number(r.reply_to_id),
          senderId: r.reply_sender_id == null ? null : Number(r.reply_sender_id),
          content: r.reply_deleted_at ? "" : String(r.reply_content || "").slice(0, 160),
          kind: (r.reply_kind as string) || "text",
          attachmentName: r.reply_deleted_at ? null : (r.reply_attachment_name as string) || null,
          deleted: !!r.reply_deleted_at,
        }
      : null,
    reactions: (deleted ? {} : r.reactions || {}) as Record<string, number[]>,
  };
}

async function getMessage(id: number): Promise<Row | undefined> {
  const { rows } = await pool.query(`${SELECT_MESSAGE} WHERE m.id = $1`, [id]);
  return rows[0];
}

function isParticipant(row: Row, userId: number) {
  return Number(row.sender_id) === userId || Number(row.receiver_id) === userId;
}

function otherOf(row: Row, userId: number) {
  return Number(row.sender_id) === userId ? Number(row.receiver_id) : Number(row.sender_id);
}

/** Texto corto para avisos y la lista de chats. */
function previewText(kind: string, content: string, attachmentName?: string | null): string {
  const text = (content || "").trim();
  switch (kind) {
    case "image":
      return text ? `📷 ${text}` : "📷 Foto";
    case "audio":
      return "🎤 Nota de voz";
    case "video":
      return text ? `🎬 ${text}` : "🎬 Video";
    case "file":
      return `📎 ${attachmentName || "Documento"}`;
    default:
      return text;
  }
}

/** Entregados: todo lo que estaba esperando a esta persona. Avisa a quien lo mandó. */
async function markDelivered(userId: number) {
  const { rows } = await pool.query(
    `UPDATE direct_messages SET delivered_at = now()
      WHERE receiver_id = $1 AND delivered_at IS NULL
      RETURNING id, sender_id, delivered_at`,
    [userId],
  );
  const bySender = new Map<number, { upTo: number; at: string }>();
  for (const r of rows) {
    const s = Number(r.sender_id);
    const prev = bySender.get(s);
    if (!prev || Number(r.id) > prev.upTo) bySender.set(s, { upTo: Number(r.id), at: r.delivered_at });
  }
  for (const [sender, info] of bySender) emit(sender, "delivered", { to: userId, ...info });
}

async function markRead(userId: number, otherId: number) {
  const { rows } = await pool.query(
    `UPDATE direct_messages
        SET is_read = true, read_at = now(), delivered_at = COALESCE(delivered_at, now())
      WHERE receiver_id = $1 AND sender_id = $2 AND is_read = false
      RETURNING id, read_at`,
    [userId, otherId],
  );
  if (rows.length) {
    const upTo = Math.max(...rows.map((r) => Number(r.id)));
    emit(otherId, "read", { by: userId, upTo, at: rows[0].read_at });
    emit(userId, "unread", { from: otherId, count: 0 });
  }
  return rows.length;
}

// Columnas de texto donde podría estar la dirección de un archivo (para no borrar uno en uso).
let fileRefColumns: Array<{ table: string; column: string }> | null = null;
async function fileIsReferencedElsewhere(fileId: string): Promise<boolean> {
  if (!fileRefColumns) {
    const { rows } = await pool.query(
      `SELECT table_name, column_name FROM information_schema.columns
        WHERE table_schema = 'public' AND data_type IN ('text', 'character varying')
          AND table_name NOT IN ('stored_files', 'stored_file_chunks', 'direct_messages', 'session')`,
    );
    fileRefColumns = rows
      .map((r) => ({ table: String(r.table_name), column: String(r.column_name) }))
      .filter((c) => /^[a-z_][a-z0-9_]*$/.test(c.table) && /^[a-z_][a-z0-9_]*$/.test(c.column));
  }
  const like = `%/files/${fileId}%`;
  const { rows: dm } = await pool.query(
    `SELECT 1 FROM direct_messages WHERE attachment_url LIKE $1 AND deleted_at IS NULL LIMIT 1`,
    [like],
  );
  if (dm.length) return true;
  for (const { table, column } of fileRefColumns) {
    try {
      const { rows } = await pool.query(`SELECT 1 FROM "${table}" WHERE "${column}" LIKE $1 LIMIT 1`, [like]);
      if (rows.length) return true;
    } catch {
      /* tabla sin permisos o rara: se toma como "en uso" por prudencia */
      return true;
    }
  }
  return false;
}

/** Al eliminar para todos, el archivo del chat se borra si nadie más lo usa (libera espacio). */
async function releaseChatFile(url: string | null | undefined, ownerId: number) {
  const m = /^\/files\/([A-Za-z0-9_-]{16,40})(\/|$)/.exec(url || "");
  if (!m) return;
  const fileId = m[1];
  try {
    const { rows } = await pool.query(`SELECT folder, owner_id FROM stored_files WHERE id = $1`, [fileId]);
    const f = rows[0];
    if (!f || f.folder !== "chat" || Number(f.owner_id) !== ownerId) return;
    if (await fileIsReferencedElsewhere(fileId)) return;
    await pool.query(`DELETE FROM stored_files WHERE id = $1`, [fileId]);
  } catch (err) {
    console.error("[chat] no se pudo liberar el archivo:", err);
  }
}

// ---------------------------------------------------------------- rutas
export function registerChatRoutes(app: Express) {
  const auth = (req: Request, res: Response): number | null => {
    if (!req.isAuthenticated()) {
      res.sendStatus(401);
      return null;
    }
    return req.user!.id;
  };

  // Tiempo real (va antes de /api/messages/:userId)
  app.get("/api/dm/stream", async (req, res) => {
    const me = auth(req, res);
    if (me === null) return;
    res.status(200);
    res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
    // no-transform: que la compresión no retenga los eventos
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("X-Accel-Buffering", "no");
    res.flushHeaders?.();
    res.write("retry: 4000\n\n");

    let set = streams.get(me);
    if (!set) {
      set = new Set();
      streams.set(me, set);
    }
    const wasOffline = set.size === 0;
    if (set.size >= MAX_STREAMS_PER_USER) {
      const oldest = set.values().next().value as Response | undefined;
      if (oldest) {
        set.delete(oldest);
        try {
          oldest.end();
        } catch {
          /* nada */
        }
      }
    }
    set.add(res);
    ensureHeartbeat();
    res.write(`event: ready\ndata: ${JSON.stringify({ at: new Date().toISOString() })}\n\n`);
    if (wasOffline) void announcePresence(me, true);
    void markDelivered(me).catch((err) => console.error("[chat] entregados:", err));

    req.on("close", () => {
      const s = streams.get(me);
      if (!s) return;
      s.delete(res);
      if (s.size === 0) {
        streams.delete(me);
        // Un momento de gracia: recargar la página no debe mostrar "desconectado".
        setTimeout(() => {
          if (!isOnline(me)) void announcePresence(me, false);
        }, 8000).unref?.();
      }
    });
  });

  app.get("/api/messages/conversations", async (req, res) => {
    const me = auth(req, res);
    if (me === null) return;
    try {
      void markDelivered(me).catch(() => {});
      const { rows } = await pool.query(
        `WITH mine AS (
           SELECT m.*, CASE WHEN m.sender_id = $1 THEN m.receiver_id ELSE m.sender_id END AS other_id
             FROM direct_messages m
            WHERE (m.sender_id = $1 AND m.hidden_by_sender = false)
               OR (m.receiver_id = $1 AND m.hidden_by_receiver = false)
         ), last AS (
           SELECT DISTINCT ON (other_id) * FROM mine ORDER BY other_id, id DESC
         ), unread AS (
           SELECT sender_id AS other_id, count(*)::int AS n FROM direct_messages
            WHERE receiver_id = $1 AND is_read = false AND hidden_by_receiver = false
            GROUP BY sender_id
         )
         SELECT last.*, u.username, u.display_name, u.avatar_url, COALESCE(unread.n, 0) AS unread_count
           FROM last
           JOIN users u ON u.id = last.other_id
           LEFT JOIN unread ON unread.other_id = last.other_id
          ORDER BY last.id DESC
          LIMIT 300`,
        [me],
      );
      res.json(
        rows.map((r) => ({
          user: { id: Number(r.other_id), username: r.username, displayName: r.display_name, avatarUrl: r.avatar_url },
          lastMessage: {
            id: Number(r.id),
            content: r.deleted_at ? "" : previewText(r.kind || "text", r.content, r.attachment_name),
            senderId: Number(r.sender_id),
            createdAt: r.created_at,
            isRead: !!r.is_read,
            kind: r.kind || "text",
            deletedAt: r.deleted_at || null,
            deliveredAt: r.delivered_at || null,
            readAt: r.read_at || null,
          },
          unreadCount: Number(r.unread_count) || 0,
          online: isOnline(Number(r.other_id)),
        })),
      );
    } catch (err) {
      console.error("[chat] conversaciones:", err);
      res.sendStatus(500);
    }
  });

  app.get("/api/messages/unread-count", async (req, res) => {
    const me = auth(req, res);
    if (me === null) return;
    const { rows } = await pool.query(
      `SELECT count(*)::int AS n FROM direct_messages WHERE receiver_id = $1 AND is_read = false AND hidden_by_receiver = false`,
      [me],
    );
    res.json({ count: Number(rows[0]?.n) || 0 });
  });

  // "En línea" solo entre quienes ya conversan (no se puede espiar a cualquiera).
  app.get("/api/dm/presence/:userId", async (req, res) => {
    const me = auth(req, res);
    if (me === null) return;
    const other = parseInt(req.params.userId);
    try {
      const { rows } = await pool.query(
        `SELECT 1 FROM direct_messages
          WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1) LIMIT 1`,
        [me, other],
      );
      res.json({ online: rows.length > 0 && isOnline(other) });
    } catch {
      res.json({ online: false });
    }
  });

  // Página de la conversación: las últimas 40, ?before=<id> las anteriores, ?after=<id> las nuevas.
  app.get("/api/messages/:userId", async (req, res) => {
    const me = auth(req, res);
    if (me === null) return;
    const other = parseInt(req.params.userId);
    const before = /^\d+$/.test(String(req.query.before || "")) ? Number(req.query.before) : null;
    const after = /^\d+$/.test(String(req.query.after || "")) ? Number(req.query.after) : null;
    const limit = Math.min(Math.max(Number(req.query.limit) || PAGE_SIZE, 1), 100);
    try {
      const params: unknown[] = [me, other];
      let where = `((m.sender_id = $1 AND m.receiver_id = $2 AND m.hidden_by_sender = false)
                 OR (m.sender_id = $2 AND m.receiver_id = $1 AND m.hidden_by_receiver = false))`;
      if (before) {
        params.push(before);
        where += ` AND m.id < $${params.length}`;
      }
      if (after) {
        params.push(after);
        where += ` AND m.id > $${params.length}`;
      }
      params.push(after ? 200 : limit);
      const order = after ? "ASC" : "DESC";
      const { rows } = await pool.query(`${SELECT_MESSAGE} WHERE ${where} ORDER BY m.id ${order} LIMIT $${params.length}`, params);
      const list = (after ? rows : rows.reverse()).map(toMessage);
      // Abrir la conversación (la página más reciente) la marca como vista.
      if (!before && !after) await markRead(me, other);
      res.setHeader("Cache-Control", "no-store");
      res.json(list);
    } catch (err) {
      console.error("[chat] mensajes:", err);
      res.sendStatus(500);
    }
  });

  app.post("/api/messages", async (req, res) => {
    const me = auth(req, res);
    if (me === null) return;
    if (!req.user!.isActive) return res.status(403).json({ message: "Tu cuenta aún no está aprobada para enviar mensajes." });
    try {
      const input = insertDirectMessageSchema.parse(req.body);
      if (input.receiverId === me) return res.status(400).json({ message: "No puedes enviarte mensajes a ti mismo" });
      const receiver = await storage.getUser(input.receiverId);
      if (!receiver) return res.status(404).json({ message: "Esa persona ya no está en la comunidad" });

      // Reintento del mismo envío: se devuelve el que ya se guardó.
      if (input.clientId) {
        const { rows } = await pool.query(`SELECT id FROM direct_messages WHERE sender_id = $1 AND client_id = $2`, [me, input.clientId]);
        if (rows[0]) return res.status(200).json(toMessage((await getMessage(Number(rows[0].id)))!));
      }

      let replyToId: number | null = null;
      if (input.replyToId) {
        const target = await getMessage(input.replyToId);
        if (target && isParticipant(target, me) && isParticipant(target, input.receiverId)) replyToId = target.id;
      }

      const att = input.attachment || null;
      if (att) {
        if (att.url.startsWith("data:") || !isOwnFileUrl(att.url)) {
          return res.status(400).json({ message: "El archivo adjunto no es válido. Vuelve a subirlo." });
        }
        const mime = (att.mime || "").toLowerCase();
        const fits =
          att.kind === "file" ||
          (att.kind === "image" && mime.startsWith("image/")) ||
          (att.kind === "audio" && (mime.startsWith("audio/") || mime === "video/webm")) ||
          (att.kind === "video" && mime.startsWith("video/"));
        if (!fits) return res.status(400).json({ message: "El tipo de archivo no coincide." });
      }

      const content = input.content.trim();
      const kind = att ? att.kind : "text";
      const meta = att ? { width: att.width, height: att.height, duration: att.duration } : null;
      const online = isOnline(receiver.id);
      const { rows: before } = await pool.query(
        `SELECT count(*)::int AS n FROM direct_messages WHERE sender_id = $1 AND receiver_id = $2 AND is_read = false`,
        [me, receiver.id],
      );
      let inserted: Row;
      try {
        const { rows } = await pool.query(
          `INSERT INTO direct_messages
             (sender_id, receiver_id, content, is_read, kind, attachment_url, attachment_name, attachment_size,
              attachment_mime, attachment_meta, reply_to_id, client_id, delivered_at)
           VALUES ($1, $2, $3, false, $4, $5, $6, $7, $8, $9, $10, $11, $12)
           RETURNING id`,
          [
            me, receiver.id, content, kind,
            att?.url ?? null, att?.name?.slice(0, 150) ?? null, att?.size ?? null, att?.mime ?? null,
            meta ? JSON.stringify(meta) : null, replyToId, input.clientId ?? null, online ? new Date() : null,
          ],
        );
        inserted = rows[0];
      } catch (err: any) {
        // Dos envíos simultáneos con el mismo clientId: gana uno, el otro devuelve ese.
        if (err?.code === "23505" && input.clientId) {
          const { rows } = await pool.query(`SELECT id FROM direct_messages WHERE sender_id = $1 AND client_id = $2`, [me, input.clientId]);
          return res.status(200).json(toMessage((await getMessage(Number(rows[0].id)))!));
        }
        throw err;
      }
      const msg = toMessage((await getMessage(Number(inserted.id)))!);
      emit(receiver.id, "message", msg);
      emit(me, "message", msg); // las otras pestañas de quien lo mandó

      // Avisos solo si la persona no está conectada en Mensajes.
      if (!online) {
        const senderName = req.user!.displayName || req.user!.username;
        const preview = previewText(kind, content, att?.name).slice(0, 100);
        if (isPushConfigured) {
          storage
            .getPushSubscriptionsByUser(receiver.id)
            .then((subs) => {
              if (!subs.length) return;
              const payload: PushPayload = {
                title: `Mensaje de ${senderName}`,
                body: preview,
                url: `/mensajes?to=${me}`,
                icon: "/icons/icon-192x192.png",
                tag: `dm-${me}`,
              };
              return sendPushToMany(
                subs.map((s) => ({ id: s.id, subscription: { endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } } })),
                payload,
              );
            })
            .catch((e) => console.error("[push] mensaje:", e));
        }
        // Un correo por tanda: solo con el primer mensaje sin leer (no 20 correos por 20 mensajes).
        if (isEmailConfigured && receiver.email && receiver.emailNotifyDirectMessage !== false && Number(before[0]?.n) === 0) {
          try {
            sendDirectMessageEmail(receiver.email, senderName, preview, receiver.displayName);
          } catch (e) {
            console.error("[email] mensaje:", e);
          }
        }
      }
      res.status(201).json(msg);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.issues[0].message });
      console.error("[chat] enviar:", err);
      res.sendStatus(500);
    }
  });

  app.patch("/api/messages/:userId/read", async (req, res) => {
    const me = auth(req, res);
    if (me === null) return;
    try {
      const marked = await markRead(me, parseInt(req.params.userId));
      res.json({ success: true, marked });
    } catch (err) {
      console.error("[chat] visto:", err);
      res.sendStatus(500);
    }
  });

  app.post("/api/dm/typing/:userId", (req, res) => {
    const me = auth(req, res);
    if (me === null) return;
    const other = parseInt(req.params.userId);
    if (other !== me) emit(other, "typing", { from: me });
    res.sendStatus(204);
  });

  // Editar (quien lo mandó, hasta 15 minutos)
  app.patch("/api/dm/messages/:id", async (req, res) => {
    const me = auth(req, res);
    if (me === null) return;
    try {
      const { content } = z.object({ content: z.string().max(4000) }).parse(req.body);
      const row = await getMessage(parseInt(req.params.id));
      if (!row || !isParticipant(row, me)) return res.sendStatus(404);
      if (Number(row.sender_id) !== me) return res.status(403).json({ message: "Solo puedes editar tus mensajes" });
      if (row.deleted_at) return res.status(400).json({ message: "Ese mensaje ya se eliminó" });
      if (Date.now() - new Date(row.created_at).getTime() > EDIT_WINDOW_MS) {
        return res.status(400).json({ message: "Solo se puede editar durante los primeros 15 minutos" });
      }
      const clean = content.trim();
      if (!clean && (row.kind || "text") === "text") return res.status(400).json({ message: "El mensaje no puede quedar vacío" });
      await pool.query(`UPDATE direct_messages SET content = $1, edited_at = now() WHERE id = $2`, [clean, row.id]);
      const msg = toMessage((await getMessage(Number(row.id)))!);
      emit(otherOf(row, me), "update", msg);
      emit(me, "update", msg);
      res.json(msg);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.issues[0].message });
      console.error("[chat] editar:", err);
      res.sendStatus(500);
    }
  });

  // Eliminar: ?para=todos (quien lo mandó, hasta 48 h) o para mí (cualquiera de los dos)
  app.delete("/api/dm/messages/:id", async (req, res) => {
    const me = auth(req, res);
    if (me === null) return;
    try {
      const row = await getMessage(parseInt(req.params.id));
      if (!row || !isParticipant(row, me)) return res.sendStatus(404);
      if (req.query.para === "todos") {
        if (Number(row.sender_id) !== me) return res.status(403).json({ message: "Solo puedes eliminar para todos tus propios mensajes" });
        if (!row.deleted_at && Date.now() - new Date(row.created_at).getTime() > DELETE_FOR_ALL_WINDOW_MS) {
          return res.status(400).json({ message: "Pasaron más de 48 horas: puedes eliminarlo solo para ti" });
        }
        await pool.query(
          `UPDATE direct_messages
              SET deleted_at = COALESCE(deleted_at, now()), content = '', attachment_url = NULL, attachment_name = NULL,
                  attachment_size = NULL, attachment_mime = NULL, attachment_meta = NULL, reactions = NULL
            WHERE id = $1`,
          [row.id],
        );
        await releaseChatFile(row.attachment_url, me);
        const msg = toMessage((await getMessage(Number(row.id)))!);
        emit(otherOf(row, me), "update", msg);
        emit(me, "update", msg);
        return res.json(msg);
      }
      const column = Number(row.sender_id) === me ? "hidden_by_sender" : "hidden_by_receiver";
      await pool.query(`UPDATE direct_messages SET ${column} = true WHERE id = $1`, [row.id]);
      emit(me, "hidden", { ids: [Number(row.id)] });
      res.json({ success: true });
    } catch (err) {
      console.error("[chat] eliminar:", err);
      res.sendStatus(500);
    }
  });

  // Vaciar el chat (solo para mí)
  app.delete("/api/dm/conversations/:userId", async (req, res) => {
    const me = auth(req, res);
    if (me === null) return;
    const other = parseInt(req.params.userId);
    try {
      await pool.query(`UPDATE direct_messages SET hidden_by_sender = true WHERE sender_id = $1 AND receiver_id = $2`, [me, other]);
      await pool.query(
        `UPDATE direct_messages SET hidden_by_receiver = true, is_read = true, read_at = COALESCE(read_at, now())
          WHERE sender_id = $2 AND receiver_id = $1`,
        [me, other],
      );
      emit(me, "cleared", { userId: other });
      res.json({ success: true });
    } catch (err) {
      console.error("[chat] vaciar:", err);
      res.sendStatus(500);
    }
  });

  // Reaccionar (una reacción por persona; la misma otra vez la quita)
  app.post("/api/dm/messages/:id/react", async (req, res) => {
    const me = auth(req, res);
    if (me === null) return;
    try {
      const { emoji } = z
        .object({ emoji: z.string().nullable() })
        .refine((d) => d.emoji === null || (DM_REACTIONS as readonly string[]).includes(d.emoji), { message: "Reacción no válida" })
        .parse(req.body);
      const row = await getMessage(parseInt(req.params.id));
      if (!row || !isParticipant(row, me)) return res.sendStatus(404);
      if (row.deleted_at) return res.status(400).json({ message: "Ese mensaje ya se eliminó" });
      const current = (row.reactions || {}) as Record<string, number[]>;
      const had = emoji ? (current[emoji] || []).includes(me) : false;
      const next: Record<string, number[]> = {};
      for (const [e, users] of Object.entries(current)) {
        const rest = (users || []).filter((u) => u !== me);
        if (rest.length) next[e] = rest;
      }
      if (emoji && !had) next[emoji] = [...(next[emoji] || []), me];
      await pool.query(`UPDATE direct_messages SET reactions = $1 WHERE id = $2`, [Object.keys(next).length ? JSON.stringify(next) : null, row.id]);
      const msg = toMessage((await getMessage(Number(row.id)))!);
      emit(otherOf(row, me), "update", msg);
      emit(me, "update", msg);
      res.json(msg);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.issues[0].message });
      console.error("[chat] reaccionar:", err);
      res.sendStatus(500);
    }
  });
}

/** Tope de espacio para archivos del chat por persona (MB). Solo cuando se guardan en la base. */
export async function chatQuotaExceeded(userId: number, incomingBytes: number): Promise<{ exceeded: boolean; limitMb: number }> {
  const limitMb = Math.max(Number(process.env.CHAT_QUOTA_MB) || 150, 10);
  try {
    const { rows } = await pool.query(
      `SELECT coalesce(sum(size), 0)::bigint AS used FROM stored_files WHERE owner_id = $1 AND folder = 'chat'`,
      [userId],
    );
    return { exceeded: Number(rows[0]?.used || 0) + incomingBytes > limitMb * 1024 * 1024, limitMb };
  } catch {
    return { exceeded: false, limitMb };
  }
}
