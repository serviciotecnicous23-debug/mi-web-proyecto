/**
 * Las actividades del nivel (docs/academia.md, «Las actividades del nivel»): en el Nivel 2, 3 conversaciones de
 * evangelismo y servir 1 mes en un ministerio.
 * - El alumno las registra desde la página del nivel (después de completar el nivel anterior) y puede borrar las que
 *   todavía no se confirmaron.
 * - La Administración las ve en «Para revisar», las confirma o las devuelve con un motivo; el alumno recibe un aviso en
 *   la campana. Nadie confirma lo suyo. Lo confirmado ya no cambia.
 * - Al confirmar, si el alumno ya cumple todo, el nivel se cierra y sale su certificado.
 */
import type { Express, Request } from "express";
import { pool } from "./db";
import { NIVELES, ROLES_REVISION } from "@shared/academia";
import {
  ACTIVIDADES_NIVEL, LIMITES_ACTIVIDAD, resumirActividades, validarActividad, type ActividadRevision, type ActividadesNivel,
  type ActividadesPanel,
} from "@shared/academia-actividades";
import { avisarA, cuentasConRoles, diaTexas, enFila, frenar, inscritoDe } from "./academia-comun";
import { nivelesCompletos } from "./academia-inscripcion";
import { revisarNivel } from "./academia-nivel";
import { permisoDe } from "./academia-direccion";
import { actividadDe, actividadesDe } from "./academia-actividades-datos";

const nivelPide = (n: unknown) => {
  const k = Number(n);
  const pide = Number.isInteger(k) ? ACTIVIDADES_NIVEL[k as 1 | 2 | 3 | 4 | 5] : undefined;
  return pide ? { n: k, pide } : null;
};

async function vistaDe(userId: number, n: number): Promise<ActividadesNivel> {
  const pide = ACTIVIDADES_NIVEL[n as 1 | 2 | 3 | 4 | 5]!;
  const lista = await actividadesDe(userId, n);
  const completos = await nivelesCompletos(userId);
  const puede = n <= 1 || completos.includes(n - 1);
  return {
    ...resumirActividades(pide, lista, diaTexas()),
    nivel: n,
    lista,
    puedeRegistrar: puede,
    motivo: puede ? null : `Las actividades del Nivel ${n} se registran después de completar el Nivel ${n - 1}.`,
  };
}

const nombreDe = (r: any) => (r.nombres ? `${r.nombres} ${r.apellidos ?? ""}`.trim() : String(r.display_name || r.username || "Alumno"));

async function paraRevisar(donde: string, orden: string, limite: number): Promise<ActividadRevision[]> {
  const { rows } = await pool.query(
    `SELECT ac.*, i.nombres, i.apellidos, u.display_name, u.username, a.matricula
       FROM academia_actividades ac
       JOIN users u ON u.id = ac.user_id
       LEFT JOIN academia_inscripciones i ON i.user_id = ac.user_id
       LEFT JOIN academia_alumnos a ON a.user_id = ac.user_id
      WHERE ${donde}
      ORDER BY ${orden}
      LIMIT ${limite}`,
  );
  return rows.map((r: any) => ({ ...actividadDe(r), alumno: { userId: Number(r.user_id), nombre: nombreDe(r), matricula: r.matricula ?? null } }));
}

async function registrarEnHistorial(req: Request, accion: string, alumnoId: number, detalles: Record<string, unknown>): Promise<void> {
  await pool.query(
    `INSERT INTO audit_log (user_id, action, entity_type, entity_id, details, ip_address) VALUES ($1, $2, 'academia', $3, $4, $5)`,
    [req.user!.id, accion, alumnoId, JSON.stringify(detalles), req.ip ?? null],
  );
}

const queEs = (tipo: string) => (tipo === "servicio" ? "tu servicio en un ministerio" : "tu conversación de evangelismo");

export function registerAcademiaActividadesRoutes(app: Express) {
  // Las actividades de un nivel y lo que falta.
  app.get("/api/academia/actividades/:nivel", async (req, res) => {
    try {
      const a = await inscritoDe(req, res);
      if (!a) return;
      const nv = nivelPide(req.params.nivel);
      if (!nv) return res.status(404).json({ message: "Este nivel no pide actividades." });
      res.setHeader("Cache-Control", "no-store");
      res.json(await vistaDe(a.userId, nv.n));
    } catch (err) {
      console.error("[academia] actividades:", err);
      res.sendStatus(500);
    }
  });

  // Registrar una actividad: queda por confirmar y avisa a la Administración.
  app.post("/api/academia/actividades/:nivel", async (req, res) => {
    try {
      const a = await inscritoDe(req, res);
      if (!a) return;
      const nv = nivelPide(req.params.nivel);
      if (!nv) return res.status(404).json({ message: "Este nivel no pide actividades." });
      if (frenar(`act:${a.userId}`, 1500)) return res.status(429).json({ message: "Espera un momento antes de registrar otra." });
      const v = validarActividad(req.body, diaTexas());
      if (!v.ok) return res.status(400).json({ message: v.error });
      const d = v.datos;
      const out = await enFila(a.userId, async () => {
        const vista = await vistaDe(a.userId, nv.n);
        if (!vista.puedeRegistrar) return { error: 409, message: vista.motivo! };
        if (vista.lista.filter((x) => x.tipo === d.tipo).length >= LIMITES_ACTIVIDAD.porTipo) {
          return { error: 409, message: "Ya registraste suficientes actividades de este tipo en el nivel." };
        }
        await pool.query(
          `INSERT INTO academia_actividades (user_id, nivel, tipo, fecha, hasta, persona, resultado, lugar, lider, detalle)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
          [a.userId, nv.n, d.tipo, d.fecha, d.hasta, d.persona, d.resultado, d.lugar, d.lider, d.detalle],
        );
        return { vista: await vistaDe(a.userId, nv.n) };
      });
      if (out.error !== undefined) return res.status(out.error).json({ message: out.message });
      // la Administración la confirma en «Para revisar» (solo un aviso en la campana, sin correo)
      const admins = await cuentasConRoles(ROLES_REVISION, a.userId);
      void avisarA(
        admins,
        d.tipo === "servicio" ? "Un servicio por confirmar" : "Una conversación de evangelismo por confirmar",
        `Un alumno registró ${d.tipo === "servicio" ? `su servicio en «${d.lugar}»` : "una conversación de evangelismo"} para el Nivel ${nv.n}.`,
        "/admin/academia?tab=revisar",
      ).catch(() => undefined);
      res.json(out.vista);
    } catch (err) {
      console.error("[academia] registrar actividad:", err);
      res.sendStatus(500);
    }
  });

  // Borrar una actividad propia que todavía no se confirmó.
  app.post("/api/academia/actividades/item/:id/borrar", async (req, res) => {
    try {
      const a = await inscritoDe(req, res);
      if (!a) return;
      const id = Number(req.params.id);
      if (!Number.isInteger(id) || id <= 0) return res.status(404).json({ message: "No existe esa actividad." });
      const { rows } = await pool.query(`SELECT nivel, estado FROM academia_actividades WHERE id = $1 AND user_id = $2`, [id, a.userId]);
      if (!rows[0]) return res.status(404).json({ message: "No existe esa actividad." });
      if (rows[0].estado === "confirmada") return res.status(409).json({ message: "Una actividad confirmada ya no se borra." });
      await pool.query(`DELETE FROM academia_actividades WHERE id = $1 AND user_id = $2 AND estado <> 'confirmada'`, [id, a.userId]);
      res.json(await vistaDe(a.userId, Number(rows[0].nivel)));
    } catch (err) {
      console.error("[academia] borrar actividad:", err);
      res.sendStatus(500);
    }
  });

  // La Administración: las actividades por confirmar y las revisadas hace poco.
  app.get("/api/academia/direccion/actividades", async (req, res) => {
    try {
      const p = await permisoDe(req, res, "revisar");
      if (!p) return;
      const [pendientes, recientes] = await Promise.all([
        paraRevisar(`ac.estado = 'pendiente'`, "ac.created_at", 200),
        paraRevisar(`ac.estado <> 'pendiente' AND ac.revisada_at > now() - interval '30 days'`, "ac.revisada_at DESC", 30),
      ]);
      const out: ActividadesPanel = { pendientes, recientes };
      res.setHeader("Cache-Control", "no-store");
      res.json(out);
    } catch (err) {
      console.error("[academia] actividades del panel:", err);
      res.sendStatus(500);
    }
  });

  // Confirmar una actividad o devolverla con un motivo. Al confirmar, si ya cumple todo, el nivel se cierra.
  app.post("/api/academia/direccion/actividad/:id", async (req, res) => {
    try {
      const p = await permisoDe(req, res, "revisar");
      if (!p) return;
      const id = Number(req.params.id);
      if (!Number.isInteger(id) || id <= 0) return res.status(404).json({ message: "No existe esa actividad." });
      const accion = req.body?.accion === "confirmar" ? "confirmar" : req.body?.accion === "rechazar" ? "rechazar" : null;
      if (!accion) return res.status(400).json({ message: "Elige si confirmas la actividad o la devuelves." });
      const motivo = typeof req.body?.motivo === "string" ? req.body.motivo.replace(/\s+/g, " ").trim().slice(0, LIMITES_ACTIVIDAD.motivoMax) : "";
      if (accion === "rechazar" && motivo.length < LIMITES_ACTIVIDAD.motivoMin) {
        return res.status(400).json({ message: "Escribe el motivo: el alumno lo recibe para corregir y volver a registrarla." });
      }
      const { rows } = await pool.query(`SELECT * FROM academia_actividades WHERE id = $1`, [id]);
      const fila = rows[0];
      if (!fila) return res.status(404).json({ message: "No existe esa actividad." });
      const alumnoId = Number(fila.user_id);
      if (alumnoId === p.userId) return res.status(403).json({ message: "No puedes confirmar tus propias actividades: lo hace otro administrador." });
      if (fila.estado !== "pendiente") return res.status(409).json({ message: fila.estado === "confirmada" ? "Esta actividad ya fue confirmada." : "Esta actividad ya fue devuelta." });
      const r = await pool.query(
        `UPDATE academia_actividades SET estado = $2, motivo = $3, revisor_id = $4, revisada_at = now() WHERE id = $1 AND estado = 'pendiente'`,
        [id, accion === "confirmar" ? "confirmada" : "rechazada", motivo || null, p.userId],
      );
      if (!r.rowCount) return res.status(409).json({ message: "Otra persona la revisó recién." });
      await registrarEnHistorial(req, accion === "confirmar" ? "academia_actividad_confirmada" : "academia_actividad_devuelta", alumnoId, {
        texto: `${accion === "confirmar" ? "Confirmó" : "Devolvió"} ${fila.tipo === "servicio" ? `el servicio en «${fila.lugar}»` : "una conversación de evangelismo"} del Nivel ${fila.nivel}`,
        motivo: motivo || null,
      });
      const nv = NIVELES.find((x) => x.n === Number(fila.nivel));
      let cerrado = false;
      if (accion === "confirmar" && nv) {
        const { rows: nl } = await pool.query(`SELECT completado_at FROM academia_niveles WHERE user_id = $1 AND nivel = $2`, [alumnoId, nv.n]);
        // «cerrado» solo si el nivel se completó justo con esta confirmación
        cerrado = !nl[0]?.completado_at && (await revisarNivel(alumnoId, nv));
      }
      await avisarA(
        [alumnoId],
        accion === "confirmar" ? (fila.tipo === "servicio" ? "Tu servicio fue confirmado" : "Tu conversación de evangelismo fue confirmada") : "Revisa una actividad de tu nivel",
        accion === "confirmar"
          ? `La Administración confirmó ${queEs(fila.tipo)}.${cerrado ? ` ¡Completaste el Nivel ${fila.nivel}!` : ""}${motivo ? ` Nota: ${motivo}` : ""}`
          : `La Administración devolvió ${queEs(fila.tipo)}: ${motivo}. Puedes corregirla y registrarla otra vez.`,
        `/academia/nivel/${fila.nivel}`,
      );
      res.json({ ok: true, estado: accion === "confirmar" ? "confirmada" : "rechazada", nivelCompleto: cerrado });
    } catch (err) {
      console.error("[academia] revisar actividad:", err);
      res.sendStatus(500);
    }
  });
}
