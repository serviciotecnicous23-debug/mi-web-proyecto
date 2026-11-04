/**
 * Rutas API del ecosistema de agentes (Fase 1).
 *
 * Endpoints bajo /api/agent/* autenticados con un bearer token compartido
 * (AGENT_API_KEY). Usados por el bot de Telegram, por Claude en Cowork, y
 * por futuros workers en background.
 *
 * El humano (Luis) no llama estos endpoints directamente — son para los
 * agentes. El panel de /missions (pagina frontend) se añade en Fase 2.
 */

import type { Express, Request, Response, NextFunction } from "express";
import { pool } from "../db";
import { db } from "../db";
import {
  agentMissions,
  agentReviewRequests,
  agentActivityLog,
  AGENT_MISSION_STATUSES,
  AGENT_REVIEW_DECISIONS,
  AGENT_ACTION_TYPES,
} from "@shared/schema";
import { eq, desc, and } from "drizzle-orm";
import {
  reviewAction,
  formatReviewMessageForTelegram,
  type ReviewInput,
} from "./reviewer";
import { notifyOwner, editOwnerMessage, isTelegramConfigured } from "./telegram";

// --------- auth middleware ---------

function requireAgentAuth(req: Request, res: Response, next: NextFunction) {
  const expected = process.env.AGENT_API_KEY;
  if (!expected) {
    // Sin AGENT_API_KEY configurado, los endpoints estan apagados.
    // Evita exposicion accidental en dev local antes de generar la llave.
    return res.status(503).json({
      error: "agent_api_disabled",
      hint: "Set AGENT_API_KEY env var to enable",
    });
  }
  const header = req.header("authorization") ?? "";
  const match = header.match(/^Bearer\s+(.+)$/i);
  if (!match || match[1] !== expected) {
    return res.status(401).json({ error: "unauthorized" });
  }
  // opcional: identificar al agente via header X-Agent-Id
  (req as any).agentId = req.header("x-agent-id") ?? "unknown-agent";
  next();
}

// --------- helpers ---------

async function logActivity(entry: {
  agentId: string;
  action: string;
  missionId?: number | null;
  details?: Record<string, unknown>;
  success?: boolean;
}) {
  try {
    await db.insert(agentActivityLog).values({
      agentId: entry.agentId,
      action: entry.action,
      missionId: entry.missionId ?? null,
      details: entry.details ? JSON.stringify(entry.details) : null,
      success: entry.success ?? true,
    });
  } catch (err) {
    // Nunca tumbar el request por no poder loguear
    console.error("[agent/routes] logActivity failed:", err);
  }
}

// --------- registro ---------

export function registerAgentRoutes(app: Express) {
  // ===== Health check especifico del subsistema =====
  app.get("/api/agent/health", (_req, res) => {
    res.json({
      ok: true,
      telegramConfigured: isTelegramConfigured(),
      authRequired: !!process.env.AGENT_API_KEY,
    });
  });

  // ===== MISIONES =====

  // Crear mision
  app.post(
    "/api/agent/missions",
    requireAgentAuth,
    async (req: Request, res: Response) => {
      const agentId = (req as any).agentId as string;
      const {
        title,
        description,
        priority,
        assignedTo,
        parentId,
        metadata,
        createdBy,
      } = req.body ?? {};

      if (!title || typeof title !== "string") {
        return res.status(400).json({ error: "title_required" });
      }

      try {
        const [row] = await db
          .insert(agentMissions)
          .values({
            title,
            description: description ?? null,
            priority: priority ?? "normal",
            createdBy: createdBy ?? agentId,
            assignedTo: assignedTo ?? null,
            parentId: parentId ?? null,
            metadata: metadata ? JSON.stringify(metadata) : null,
          })
          .returning();

        await logActivity({
          agentId,
          action: "mission_created",
          missionId: row.id,
          details: { title, priority },
        });

        return res.status(201).json(row);
      } catch (err: any) {
        console.error("[agent/routes] create mission error:", err);
        return res.status(500).json({ error: "db_error", message: err?.message });
      }
    },
  );

  // Listar misiones (con filtro por estado / assignedTo)
  app.get(
    "/api/agent/missions",
    requireAgentAuth,
    async (req: Request, res: Response) => {
      const status = (req.query.status as string | undefined) ?? undefined;
      const assignedTo = (req.query.assignedTo as string | undefined) ?? undefined;
      const limit = Math.min(parseInt((req.query.limit as string) || "50", 10), 200);

      try {
        let rows;
        if (status && assignedTo) {
          rows = await db
            .select()
            .from(agentMissions)
            .where(
              and(
                eq(agentMissions.status, status),
                eq(agentMissions.assignedTo, assignedTo),
              ),
            )
            .orderBy(desc(agentMissions.updatedAt))
            .limit(limit);
        } else if (status) {
          rows = await db
            .select()
            .from(agentMissions)
            .where(eq(agentMissions.status, status))
            .orderBy(desc(agentMissions.updatedAt))
            .limit(limit);
        } else if (assignedTo) {
          rows = await db
            .select()
            .from(agentMissions)
            .where(eq(agentMissions.assignedTo, assignedTo))
            .orderBy(desc(agentMissions.updatedAt))
            .limit(limit);
        } else {
          rows = await db
            .select()
            .from(agentMissions)
            .orderBy(desc(agentMissions.updatedAt))
            .limit(limit);
        }
        res.json(rows);
      } catch (err: any) {
        console.error("[agent/routes] list missions error:", err);
        res.status(500).json({ error: "db_error", message: err?.message });
      }
    },
  );

  // Leer mision por id
  app.get(
    "/api/agent/missions/:id",
    requireAgentAuth,
    async (req: Request, res: Response) => {
      const id = parseInt(String(req.params.id), 10);
      if (!Number.isFinite(id)) return res.status(400).json({ error: "bad_id" });
      const [row] = await db
        .select()
        .from(agentMissions)
        .where(eq(agentMissions.id, id));
      if (!row) return res.status(404).json({ error: "not_found" });
      res.json(row);
    },
  );

  // Actualizar mision (status, notas, assignedTo, etc.)
  app.patch(
    "/api/agent/missions/:id",
    requireAgentAuth,
    async (req: Request, res: Response) => {
      const agentId = (req as any).agentId as string;
      const id = parseInt(String(req.params.id), 10);
      if (!Number.isFinite(id)) return res.status(400).json({ error: "bad_id" });

      const {
        status,
        assignedTo,
        appendNote,
        priority,
        metadata,
      } = req.body ?? {};

      if (status && !AGENT_MISSION_STATUSES.includes(status)) {
        return res.status(400).json({ error: "bad_status" });
      }

      try {
        // Leer notas actuales para poder appendear
        const [current] = await db
          .select()
          .from(agentMissions)
          .where(eq(agentMissions.id, id));
        if (!current) return res.status(404).json({ error: "not_found" });

        const newNotes = appendNote
          ? `${current.progressNotes ?? ""}\n[${new Date().toISOString()}] [${agentId}] ${appendNote}`.trim()
          : current.progressNotes;

        const updates: Record<string, unknown> = {
          updatedAt: new Date(),
        };
        if (status) updates.status = status;
        if (assignedTo !== undefined) updates.assignedTo = assignedTo;
        if (priority) updates.priority = priority;
        if (metadata !== undefined) updates.metadata = metadata ? JSON.stringify(metadata) : null;
        if (appendNote) updates.progressNotes = newNotes;
        if (status === "done" || status === "cancelled") {
          updates.completedAt = new Date();
        }

        const [row] = await db
          .update(agentMissions)
          .set(updates)
          .where(eq(agentMissions.id, id))
          .returning();

        await logActivity({
          agentId,
          action: "mission_updated",
          missionId: id,
          details: { status, appendNoteLen: appendNote?.length ?? 0 },
        });

        res.json(row);
      } catch (err: any) {
        console.error("[agent/routes] patch mission error:", err);
        res.status(500).json({ error: "db_error", message: err?.message });
      }
    },
  );

  // ===== REVISIONES =====

  // Pedir revision de una accion. El agente DEBE llamar aqui antes de cualquier
  // accion listada en AGENT_ACTION_TYPES. Respuesta incluye si puede proceder.
  app.post(
    "/api/agent/reviews",
    requireAgentAuth,
    async (req: Request, res: Response) => {
      const agentId = (req as any).agentId as string;
      const { actionType, summary, payload, missionId, context } = req.body ?? {};

      if (!actionType || typeof actionType !== "string") {
        return res.status(400).json({ error: "actionType_required" });
      }
      if (!summary || typeof summary !== "string") {
        return res.status(400).json({ error: "summary_required" });
      }
      if (!AGENT_ACTION_TYPES.includes(actionType as any) && actionType !== "custom") {
        return res
          .status(400)
          .json({ error: "bad_actionType", accepted: AGENT_ACTION_TYPES });
      }

      const input: ReviewInput = {
        agentId,
        actionType,
        summary,
        payload,
        context,
      };

      const verdict = reviewAction(input);

      // Si esta auto-aprobado, devolvemos immediatamente sin persistir revision
      // (todavia logueamos para auditoria)
      if (verdict.status === "approve") {
        await logActivity({
          agentId,
          action: "review_auto_approved",
          missionId: missionId ?? null,
          details: { actionType, riskScore: verdict.riskScore, summary },
        });
        return res.json({
          status: "approve",
          reviewId: null,
          riskScore: verdict.riskScore,
          reasons: verdict.reasons,
        });
      }

      // Si esta bloqueado, persistir con decision=denied directa
      if (verdict.status === "block") {
        const [row] = await db
          .insert(agentReviewRequests)
          .values({
            missionId: missionId ?? null,
            agentId,
            actionType,
            summary,
            payload: payload ?? null,
            riskReasons: JSON.stringify(verdict.reasons),
            riskScore: verdict.riskScore,
            autoDecision: "block",
            decision: "denied",
            decidedBy: "auto-reviewer",
            decidedAt: new Date(),
          })
          .returning();

        await logActivity({
          agentId,
          action: "review_auto_blocked",
          missionId: missionId ?? null,
          details: { reviewId: row.id, reasons: verdict.reasons },
          success: false,
        });

        return res.json({
          status: "block",
          reviewId: row.id,
          riskScore: verdict.riskScore,
          reasons: verdict.reasons,
          suggestions: verdict.suggestions,
        });
      }

      // Caso: needs_human → persistir, notificar, y devolver "pending"
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h
      const [row] = await db
        .insert(agentReviewRequests)
        .values({
          missionId: missionId ?? null,
          agentId,
          actionType,
          summary,
          payload: payload ?? null,
          riskReasons: JSON.stringify(verdict.reasons),
          riskScore: verdict.riskScore,
          autoDecision: "needs_human",
          decision: "pending",
          expiresAt,
        })
        .returning();

      // Notificar a Luis
      const msg = formatReviewMessageForTelegram(row.id, input, verdict);
      const tg = await notifyOwner(msg, { parseMode: "MarkdownV2" });
      if (tg.ok) {
        await db
          .update(agentReviewRequests)
          .set({
            telegramChatId: tg.chatId ?? null,
            telegramMessageId: tg.messageId ?? null,
          })
          .where(eq(agentReviewRequests.id, row.id));
      }

      await logActivity({
        agentId,
        action: "review_escalated_to_human",
        missionId: missionId ?? null,
        details: {
          reviewId: row.id,
          telegramNotified: tg.ok,
          reasons: verdict.reasons,
        },
      });

      return res.json({
        status: "pending",
        reviewId: row.id,
        riskScore: verdict.riskScore,
        reasons: verdict.reasons,
        suggestions: verdict.suggestions,
        telegramNotified: tg.ok,
      });
    },
  );

  // Consultar el estado de una revision (polling desde el agente)
  app.get(
    "/api/agent/reviews/:id",
    requireAgentAuth,
    async (req: Request, res: Response) => {
      const id = parseInt(String(req.params.id), 10);
      if (!Number.isFinite(id)) return res.status(400).json({ error: "bad_id" });
      const [row] = await db
        .select()
        .from(agentReviewRequests)
        .where(eq(agentReviewRequests.id, id));
      if (!row) return res.status(404).json({ error: "not_found" });
      res.json(row);
    },
  );

  // Decidir sobre una revision (aprobar/denegar).
  // Este endpoint es llamado por el bot de Telegram cuando Luis responde
  // con /aprobar <id> o /denegar <id>. Tambien se puede llamar manualmente
  // desde cualquier agente con credencial.
  app.post(
    "/api/agent/reviews/:id/decision",
    requireAgentAuth,
    async (req: Request, res: Response) => {
      const agentId = (req as any).agentId as string;
      const id = parseInt(String(req.params.id), 10);
      if (!Number.isFinite(id)) return res.status(400).json({ error: "bad_id" });

      const { decision, decidedBy, reason } = req.body ?? {};
      if (!AGENT_REVIEW_DECISIONS.includes(decision)) {
        return res
          .status(400)
          .json({ error: "bad_decision", accepted: AGENT_REVIEW_DECISIONS });
      }
      if (decision === "pending") {
        return res.status(400).json({ error: "cannot_set_pending" });
      }

      try {
        const [current] = await db
          .select()
          .from(agentReviewRequests)
          .where(eq(agentReviewRequests.id, id));
        if (!current) return res.status(404).json({ error: "not_found" });
        if (current.decision !== "pending") {
          return res
            .status(409)
            .json({ error: "already_decided", currentDecision: current.decision });
        }

        const [row] = await db
          .update(agentReviewRequests)
          .set({
            decision,
            decidedBy: decidedBy ?? agentId,
            decidedAt: new Date(),
          })
          .where(eq(agentReviewRequests.id, id))
          .returning();

        // Actualizar el mensaje en Telegram si existe
        if (current.telegramMessageId) {
          const emoji = decision === "approved" ? "✅" : "❌";
          const badge = decision === "approved" ? "APROBADO" : "DENEGADO";
          const suffix = reason ? ` \\- razon: ${reason.replace(/[_*`[\]()~>#+=|{}.!-]/g, "\\$&")}` : "";
          await editOwnerMessage(
            current.telegramMessageId,
            `${emoji} *${badge}* revision \\#${id} por ${decidedBy || agentId}${suffix}`,
            { parseMode: "MarkdownV2" },
          );
        }

        await logActivity({
          agentId,
          action: `review_${decision}`,
          missionId: current.missionId ?? null,
          details: { reviewId: id, decidedBy: decidedBy ?? agentId, reason },
        });

        res.json(row);
      } catch (err: any) {
        console.error("[agent/routes] decide review error:", err);
        res.status(500).json({ error: "db_error", message: err?.message });
      }
    },
  );

  // Listar revisiones pendientes (util para el bot al arrancar)
  app.get(
    "/api/agent/reviews",
    requireAgentAuth,
    async (req: Request, res: Response) => {
      const decision = (req.query.decision as string | undefined) ?? "pending";
      const limit = Math.min(parseInt((req.query.limit as string) || "20", 10), 100);
      const rows = await db
        .select()
        .from(agentReviewRequests)
        .where(eq(agentReviewRequests.decision, decision))
        .orderBy(desc(agentReviewRequests.createdAt))
        .limit(limit);
      res.json(rows);
    },
  );

  // ===== BITACORA =====

  app.get(
    "/api/agent/activity",
    requireAgentAuth,
    async (req: Request, res: Response) => {
      const missionIdStr = req.query.missionId as string | undefined;
      const limit = Math.min(parseInt((req.query.limit as string) || "100", 10), 500);

      if (missionIdStr) {
        const missionId = parseInt(missionIdStr, 10);
        if (!Number.isFinite(missionId)) return res.status(400).json({ error: "bad_missionId" });
        const rows = await db
          .select()
          .from(agentActivityLog)
          .where(eq(agentActivityLog.missionId, missionId))
          .orderBy(desc(agentActivityLog.createdAt))
          .limit(limit);
        return res.json(rows);
      }

      const rows = await db
        .select()
        .from(agentActivityLog)
        .orderBy(desc(agentActivityLog.createdAt))
        .limit(limit);
      res.json(rows);
    },
  );
}
