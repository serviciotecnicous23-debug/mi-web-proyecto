/**
 * Las actividades del nivel (docs/academia.md, «Las actividades del nivel»): en el Nivel 2, 3 conversaciones de
 * evangelismo y servir 1 mes en un ministerio; en el Nivel 3, 20 horas de práctica ministerial, una enseñanza grabada y
 * consolidar a 1 nuevo creyente.
 * - El alumno las registra desde la página del nivel (después de completar el nivel anterior) y puede borrar las que
 *   todavía no se confirmaron.
 * - La Administración las ve en «Para revisar», las confirma o las devuelve con un motivo; el alumno recibe un aviso en
 *   la campana. Nadie confirma lo suyo. Lo confirmado ya no cambia. La práctica se puede confirmar con menos horas de las
 *   registradas (las que confirma el líder que la supervisó).
 * - Al confirmar, si el alumno ya cumple todo, el nivel se cierra y sale su certificado.
 */
import type { Express, Request } from "express";
import { pool } from "./db";
import { NIVELES, ROLES_REVISION } from "@shared/academia";
import {
  ACTIVIDADES_NIVEL, LIMITES_ACTIVIDAD, horasDe, horasTexto, maximoDe, resumirActividades, tiposDe, validarActividad, type ActividadRevision,
  type ActividadesNivel, type ActividadesPanel, type TipoActividad,
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

/** Cómo se nombra cada actividad en los avisos al alumno («La Administración confirmó tu práctica…»). */
const QUE_ES: Record<TipoActividad, string> = {
  evangelismo: "tu conversación de evangelismo",
  servicio: "tu servicio en un ministerio",
  practica: "tu práctica ministerial",
  ensenanza: "tu enseñanza grabada",
  consolidacion: "la consolidación que registraste",
};
const queEs = (tipo: string) => QUE_ES[tipo as TipoActividad] ?? "tu actividad";

/** La actividad en el historial del alumno y en el aviso a la Administración. */
function cual(a: { tipo: string; lugar?: string | null; titulo?: string | null; horas?: unknown }): string {
  switch (a.tipo as TipoActividad) {
    case "servicio":
      return `el servicio en «${a.lugar}»`;
    case "practica":
      return `${horasTexto(Number(a.horas))} ${Number(a.horas) === 1 ? "hora" : "horas"} de práctica en «${a.lugar}»`;
    case "ensenanza":
      return `la enseñanza grabada «${a.titulo}»`;
    case "consolidacion":
      return "la consolidación de un nuevo creyente";
    default:
      return "una conversación de evangelismo";
  }
}

const POR_REVISAR: Record<TipoActividad, string> = {
  evangelismo: "Una conversación de evangelismo por confirmar",
  servicio: "Un servicio por confirmar",
  practica: "Una práctica por confirmar",
  ensenanza: "Una enseñanza grabada por revisar",
  consolidacion: "Una consolidación por confirmar",
};

const CONFIRMADA: Record<TipoActividad, string> = {
  evangelismo: "Tu conversación de evangelismo fue confirmada",
  servicio: "Tu servicio fue confirmado",
  practica: "Tu práctica fue confirmada",
  ensenanza: "Tu enseñanza grabada fue aprobada",
  consolidacion: "Tu consolidación fue confirmada",
};

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
      const v = validarActividad(req.body, diaTexas(), tiposDe(nv.pide));
      if (!v.ok) return res.status(400).json({ message: v.error });
      const d = v.datos;
      const out = await enFila(a.userId, async () => {
        const vista = await vistaDe(a.userId, nv.n);
        if (!vista.puedeRegistrar) return { error: 409, message: vista.motivo! };
        if (vista.lista.filter((x) => x.tipo === d.tipo).length >= maximoDe(d.tipo)) {
          return { error: 409, message: "Ya registraste suficientes actividades de este tipo en el nivel." };
        }
        // la enseñanza y la consolidación: una sola a la vez por revisar, y ninguna más cuando ya está aprobada
        if (d.tipo === "ensenanza" || d.tipo === "consolidacion") {
          const r = vista[d.tipo];
          if (r.hecho) return { error: 409, message: d.tipo === "ensenanza" ? "Tu enseñanza grabada ya fue aprobada." : "Tu consolidación ya fue confirmada." };
          if (r.pendientes) {
            return {
              error: 409,
              message: d.tipo === "ensenanza" ? "Ya enviaste una enseñanza: espera a que la Administración la revise." : "Ya registraste una consolidación: espera a que la Administración la confirme.",
            };
          }
        }
        await pool.query(
          `INSERT INTO academia_actividades (user_id, nivel, tipo, fecha, hasta, persona, resultado, lugar, lider, detalle, horas, titulo, enlace, pasos)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14::jsonb)`,
          [a.userId, nv.n, d.tipo, d.fecha, d.hasta, d.persona, d.resultado, d.lugar, d.lider, d.detalle, d.horas, d.titulo, d.enlace, d.pasos ? JSON.stringify(d.pasos) : null],
        );
        return { vista: await vistaDe(a.userId, nv.n) };
      });
      if (out.error !== undefined) return res.status(out.error).json({ message: out.message });
      // la Administración la confirma en «Para revisar» (solo un aviso en la campana, sin correo)
      const admins = await cuentasConRoles(ROLES_REVISION, a.userId);
      void avisarA(admins, POR_REVISAR[d.tipo], `Un alumno registró ${cual(d)} para el Nivel ${nv.n}.`, "/admin/academia?tab=revisar").catch(() => undefined);
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
      // la práctica se puede confirmar con menos horas (las que confirma el líder que la supervisó)
      const pedidas = accion === "confirmar" ? req.body?.horas : undefined;
      const conHoras = pedidas != null && pedidas !== "";
      const horasConfirmadas = conHoras ? horasDe(pedidas) : null;
      if (conHoras && horasConfirmadas == null) return res.status(400).json({ message: "Las horas que confirmas van de media hora en media hora." });
      const { rows } = await pool.query(`SELECT * FROM academia_actividades WHERE id = $1`, [id]);
      const fila = rows[0];
      if (!fila) return res.status(404).json({ message: "No existe esa actividad." });
      const alumnoId = Number(fila.user_id);
      if (alumnoId === p.userId) return res.status(403).json({ message: "No puedes confirmar tus propias actividades: lo hace otro administrador." });
      if (fila.estado !== "pendiente") return res.status(409).json({ message: fila.estado === "confirmada" ? "Esta actividad ya fue confirmada." : "Esta actividad ya fue devuelta." });
      const registradas = fila.horas == null ? null : Number(fila.horas);
      let horas = registradas;
      if (horasConfirmadas != null) {
        if (fila.tipo !== "practica" || registradas == null) return res.status(400).json({ message: "Solo la práctica se confirma con sus horas." });
        if (horasConfirmadas > registradas) return res.status(400).json({ message: `Se registraron ${horasTexto(registradas)} horas: no puedes confirmar más.` });
        horas = horasConfirmadas;
      }
      const r = await pool.query(
        `UPDATE academia_actividades SET estado = $2, motivo = $3, revisor_id = $4, revisada_at = now(), horas = $5 WHERE id = $1 AND estado = 'pendiente'`,
        [id, accion === "confirmar" ? "confirmada" : "rechazada", motivo || null, p.userId, horas],
      );
      if (!r.rowCount) return res.status(409).json({ message: "Otra persona la revisó recién." });
      // si confirmó menos horas de las registradas, lo dicen el historial y el aviso
      const menos = horas != null && registradas != null && horas < registradas ? { horas, registradas } : null;
      await registrarEnHistorial(req, accion === "confirmar" ? "academia_actividad_confirmada" : "academia_actividad_devuelta", alumnoId, {
        texto: `${accion === "confirmar" ? "Confirmó" : "Devolvió"} ${cual(fila)} del Nivel ${fila.nivel}${menos ? ` (confirmó ${horasTexto(menos.horas)})` : ""}`,
        motivo: motivo || null,
      });
      const nv = NIVELES.find((x) => x.n === Number(fila.nivel));
      let cerrado = false;
      if (accion === "confirmar" && nv) {
        const { rows: nl } = await pool.query(`SELECT completado_at FROM academia_niveles WHERE user_id = $1 AND nivel = $2`, [alumnoId, nv.n]);
        // «cerrado» solo si el nivel se completó justo con esta confirmación
        cerrado = !nl[0]?.completado_at && (await revisarNivel(alumnoId, nv));
      }
      const conMenos = menos ? ` con ${horasTexto(menos.horas)} de las ${horasTexto(menos.registradas)} horas que registraste` : "";
      await avisarA(
        [alumnoId],
        accion === "confirmar" ? (CONFIRMADA[fila.tipo as TipoActividad] ?? "Tu actividad fue confirmada") : "Revisa una actividad de tu nivel",
        accion === "confirmar"
          ? `La Administración ${fila.tipo === "ensenanza" ? "aprobó" : "confirmó"} ${queEs(fila.tipo)}${conMenos}.${cerrado ? ` ¡Completaste el Nivel ${fila.nivel}!` : ""}${motivo ? ` Nota: ${motivo}` : ""}`
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
