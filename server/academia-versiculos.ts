/**
 * El repaso espaciado de los versículos de memoria (docs/academia.md, «El versículo de memoria»): cada versículo
 * aprendido vuelve a los 1, 3, 7 y 21 días (`REPASO_VERSICULO_DIAS`). Se repasa ordenando sus fichas: bien, pasa a la
 * caja siguiente; mal, vuelve a la primera y se repasa al día siguiente. Al pasar el repaso de los 21 días queda
 * dominado. Todo se calcula al leerlo, con las horas de la base (nada corre de fondo).
 */
import type { Express } from "express";
import { pool } from "./db";
import { CAJA_DOMINADO, materiaPorId, siguienteRepaso, type RepasoVersiculos, type VersiculoRepaso } from "@shared/academia";
import { alumnoDe, enFila, fichasDe, frenar, idFicha, marcarEstudio, textoDeCita } from "./academia-comun";
import { numeroDe } from "./orden-examen";

const iso = (v: unknown) => (v ? new Date(v as string).toISOString() : null);

/** Mis versículos aprendidos con su repaso: cuáles tocan hoy, cuándo vuelve cada uno y cuáles ya domino. */
export async function repasoDe(userId: number): Promise<RepasoVersiculos> {
  const { rows } = await pool.query(
    `SELECT materia_id, ref, caja, proximo_at, dominado_at, (proximo_at IS NOT NULL AND proximo_at <= now()) AS toca
       FROM academia_versiculos
      WHERE user_id = $1 AND aprendido_at IS NOT NULL
      ORDER BY (proximo_at IS NULL), proximo_at`,
    [userId],
  );
  const versiculos: VersiculoRepaso[] = (rows as any[]).map((r) => ({
    materiaId: String(r.materia_id),
    materia: materiaPorId(String(r.materia_id))?.titulo ?? String(r.materia_id),
    ref: String(r.ref),
    caja: Number(r.caja),
    toca: !!r.toca && Number(r.caja) < CAJA_DOMINADO,
    proximo: Number(r.caja) < CAJA_DOMINADO ? iso(r.proximo_at) : null,
    dominado: iso(r.dominado_at),
  }));
  return { versiculos, pendientes: versiculos.filter((v) => v.toca).length, dominados: versiculos.filter((v) => v.dominado).length };
}

export function registerAcademiaVersiculosRoutes(app: Express) {
  app.get("/api/academia/versiculos/repaso", async (req, res) => {
    try {
      const a = await alumnoDe(req, res);
      if (!a) return;
      res.setHeader("Cache-Control", "no-store");
      res.json(await repasoDe(a.userId));
    } catch (err) {
      console.error("[academia] repaso de versículos:", err);
      res.sendStatus(500);
    }
  });

  // Las fichas revueltas de un versículo para repasarlo (otro orden en cada repaso).
  app.get("/api/academia/versiculos/repaso/:materiaId", async (req, res) => {
    try {
      const a = await alumnoDe(req, res);
      if (!a) return;
      const m = materiaPorId(String(req.params.materiaId || ""));
      if (!m || !m.memoria) return res.status(404).json({ message: "Esa materia no tiene versículo de memoria." });
      const { rows } = await pool.query(
        `SELECT caja, repasos, aprendido_at, (proximo_at IS NOT NULL AND proximo_at <= now()) AS toca FROM academia_versiculos WHERE user_id = $1 AND materia_id = $2`,
        [a.userId, m.id],
      );
      const f = rows[0];
      if (!f?.aprendido_at) return res.status(409).json({ message: "Primero aprende este versículo en su materia." });
      const v = await textoDeCita(m.memoria);
      if (!v.texto) return res.status(503).json({ message: "No se pudo cargar el versículo. Inténtalo en un momento." });
      const fichas = fichasDe(v.texto).map((t, i) => ({ id: idFicha(a.userId, m.id, i), t }));
      const vuelta = 1000 + Number(f.repasos || 0);
      let revueltas = [...fichas].sort((x, y) => (numeroDe(x.id + vuelta) >>> 0) - (numeroDe(y.id + vuelta) >>> 0));
      if (revueltas.every((x, i) => x.id === fichas[i].id)) revueltas = [...revueltas.slice(1), revueltas[0]];
      res.setHeader("Cache-Control", "no-store");
      res.json({ materiaId: m.id, materia: m.titulo, ref: v.ref, fichas: revueltas, caja: Number(f.caja), toca: !!f.toca && Number(f.caja) < CAJA_DOMINADO });
    } catch (err) {
      console.error("[academia] repaso de un versículo:", err);
      res.sendStatus(500);
    }
  });

  // Responder un repaso: el orden de las fichas. Solo cuenta si el versículo toca hoy.
  app.post("/api/academia/versiculos/repaso/:materiaId", async (req, res) => {
    try {
      const a = await alumnoDe(req, res);
      if (!a) return;
      const m = materiaPorId(String(req.params.materiaId || ""));
      if (!m || !m.memoria) return res.status(404).json({ message: "Esa materia no tiene versículo de memoria." });
      if (frenar(`vr:${a.userId}`, 500)) return res.status(429).json({ message: "Espera un momento." });
      const orden = Array.isArray(req.body?.orden) ? req.body.orden.map(String).slice(0, 80) : [];
      const v = await textoDeCita(m.memoria);
      if (!v.texto) return res.status(503).json({ message: "No se pudo cargar el versículo. Inténtalo en un momento." });
      const ids = fichasDe(v.texto).map((_, i) => idFicha(a.userId, m.id, i));
      let hasta = 0;
      while (hasta < ids.length && orden[hasta] === ids[hasta]) hasta++;
      const bien = hasta === ids.length && orden.length === ids.length;
      const out = await enFila(a.userId, async () => {
        const { rows } = await pool.query(
          `SELECT caja, aprendido_at, (proximo_at IS NOT NULL AND proximo_at <= now()) AS toca FROM academia_versiculos WHERE user_id = $1 AND materia_id = $2`,
          [a.userId, m.id],
        );
        const f = rows[0];
        if (!f?.aprendido_at) return { error: 409, message: "Primero aprende este versículo en su materia." };
        if (Number(f.caja) >= CAJA_DOMINADO) return { error: 409, message: "Este versículo ya está dominado." };
        if (!f.toca) return { error: 409, message: "Este versículo todavía no toca repasarlo." };
        const sig = siguienteRepaso(Number(f.caja), bien);
        await pool.query(
          `UPDATE academia_versiculos
              SET caja = $3, repasos = repasos + 1,
                  proximo_at = CASE WHEN $4::int IS NULL THEN NULL ELSE now() + make_interval(days => $4::int) END,
                  dominado_at = CASE WHEN $3 >= $5 THEN COALESCE(dominado_at, now()) ELSE dominado_at END
            WHERE user_id = $1 AND materia_id = $2`,
          [a.userId, m.id, sig.caja, sig.dias, CAJA_DOMINADO],
        );
        await marcarEstudio(a.userId);
        return { bien, hasta, total: ids.length, caja: sig.caja, dominado: sig.caja >= CAJA_DOMINADO, dias: sig.dias };
      });
      if ("error" in out) return res.status(out.error as number).json({ message: out.message });
      res.json(out);
    } catch (err) {
      console.error("[academia] repaso de un versículo (respuesta):", err);
      res.sendStatus(500);
    }
  });
}
