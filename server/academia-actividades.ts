/**
 * Las actividades del nivel (docs/academia.md, «Las actividades del nivel»): en el Nivel 2, 3 conversaciones de
 * evangelismo y servir 1 mes en un ministerio; en el Nivel 3, 20 horas de práctica ministerial, una enseñanza grabada y
 * consolidar a 1 nuevo creyente; en el Nivel 4, 30 horas de práctica y un sermón evaluado con rúbrica; en el Nivel 5,
 * el proyecto final con su defensa en vivo (acompañar a 2 personas no se registra: lo cuenta la academia).
 * - El alumno las registra desde la página del nivel (después de completar el nivel anterior) y puede borrar las que
 *   todavía no se confirmaron.
 * - La Administración las ve en «Para revisar», las confirma o las devuelve con un motivo; el alumno recibe un aviso en
 *   la campana. Nadie confirma lo suyo. Lo confirmado ya no cambia. La práctica se puede confirmar con menos horas de las
 *   registradas (las que confirma el líder que la supervisó). El sermón no se confirma: se evalúa con la rúbrica de
 *   Homilética II (`accion: "evaluar"`), y queda aprobado con 70 o devuelto con su nota y lo que debe mejorar. Del
 *   proyecto final se programa la defensa (`accion: "programar"`) y, después de ella, lo evalúan los 2 profesores.
 * - Al confirmar, si el alumno ya cumple todo, el nivel se cierra y sale su certificado.
 */
import type { Express, Request } from "express";
import { pool } from "./db";
import { NIVELES, ROLES_REVISION } from "@shared/academia";
import {
  ACTIVIDADES_NIVEL, APRUEBA_PROYECTO, APRUEBA_SERMON, LIMITES_ACTIVIDAD, cuandoDefensa, horasDe, horasTexto, maximoDe, resumirActividades, tiposDe,
  validarActividad, validarDefensa, validarEvaluacion, validarEvaluacionProyecto, type ActividadRevision, type ActividadesNivel, type ActividadesPanel,
  type DefensaProyecto, type EvaluacionSermon, type TipoActividad,
} from "@shared/academia-actividades";
import { avisarA, cuentasConRoles, diaTexas, enFila, frenar, inscritoDe } from "./academia-comun";
import { nivelesCompletos } from "./academia-inscripcion";
import { revisarNivel } from "./academia-nivel";
import { permisoDe } from "./academia-direccion";
import { acompanamientoDe, actividadDe, actividadesDe, defensaDe } from "./academia-actividades-datos";

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
    ...resumirActividades(pide, lista, diaTexas(), pide.acompanar ? await acompanamientoDe(userId) : undefined),
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
  sermon: "tu sermón",
  proyecto: "tu proyecto final",
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
    case "sermon":
      return `el sermón «${a.titulo}»`;
    case "proyecto":
      return `el proyecto final «${a.titulo}»`;
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
  sermon: "Un sermón por evaluar",
  proyecto: "Un proyecto final por revisar",
};

const CONFIRMADA: Record<TipoActividad, string> = {
  evangelismo: "Tu conversación de evangelismo fue confirmada",
  servicio: "Tu servicio fue confirmado",
  practica: "Tu práctica fue confirmada",
  ensenanza: "Tu enseñanza grabada fue aprobada",
  consolidacion: "Tu consolidación fue confirmada",
  sermon: "Tu sermón fue aprobado",
  proyecto: "Tu proyecto final fue aprobado",
};

/** Las que van una a la vez: mientras una espera su revisión no se registra otra, y ya aprobada, ninguna más. */
const UNA_A_LA_VEZ: Partial<Record<TipoActividad, { hecho: string; espera: string }>> = {
  ensenanza: { hecho: "Tu enseñanza grabada ya fue aprobada.", espera: "Ya enviaste una enseñanza: espera a que la Administración la revise." },
  consolidacion: { hecho: "Tu consolidación ya fue confirmada.", espera: "Ya registraste una consolidación: espera a que la Administración la confirme." },
  sermon: { hecho: "Tu sermón ya fue aprobado.", espera: "Ya enviaste un sermón: espera a que la Administración lo evalúe." },
  proyecto: { hecho: "Tu proyecto final ya fue aprobado.", espera: "Ya entregaste tu proyecto final: espera su defensa y su evaluación." },
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
        // la enseñanza, la consolidación y el sermón: uno a la vez por revisar, y ninguno más cuando ya está aprobado
        const una = UNA_A_LA_VEZ[d.tipo];
        if (una && (d.tipo === "ensenanza" || d.tipo === "consolidacion" || d.tipo === "sermon" || d.tipo === "proyecto")) {
          const r = vista[d.tipo];
          if (r.hecho) return { error: 409, message: una.hecho };
          if (r.pendientes) return { error: 409, message: una.espera };
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
      void avisarA(admins, POR_REVISAR[d.tipo], `Un alumno registró ${cual(d)} para el Nivel ${nv.n}.`, "/admin/academia?tab=pendientes&ir=actividades-por-confirmar").catch(() => undefined);
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

  // Pedir a la Administración personas para acompañar (Nivel 5): un aviso en la campana, como mucho cada 12 horas.
  app.post("/api/academia/actividades/:nivel/acompanar", async (req, res) => {
    try {
      const a = await inscritoDe(req, res);
      if (!a) return;
      const nv = nivelPide(req.params.nivel);
      if (!nv?.pide.acompanar) return res.status(404).json({ message: "Este nivel no pide acompañar a nadie." });
      const vista = await vistaDe(a.userId, nv.n);
      if (!vista.puedeRegistrar) return res.status(409).json({ message: vista.motivo! });
      if (vista.acompanar.hecho) return res.status(409).json({ message: "Ya cumpliste este requisito." });
      if (frenar(`acompanar:${a.userId}`, 12 * 3_600_000)) {
        return res.status(429).json({ message: "Ya se lo pediste a la Administración: te llegará un aviso cuando te elija como mentor de alguien." });
      }
      const { rows } = await pool.query(
        `SELECT i.nombres, i.apellidos, u.display_name, u.username FROM users u LEFT JOIN academia_inscripciones i ON i.user_id = u.id WHERE u.id = $1`,
        [a.userId],
      );
      const nombre = rows[0] ? nombreDe(rows[0]) : "Un alumno";
      const admins = await cuentasConRoles(ROLES_REVISION, a.userId);
      await avisarA(
        admins,
        "Un alumno del Nivel 5 pide a quién acompañar",
        `${nombre} necesita acompañar a ${nv.pide.acompanar} personas hasta que terminen el Nivel 1 (requisito del Nivel 5). Elígelo como mentor desde la ficha de cada persona que empieza.`,
        `/admin/academia/alumno/${a.userId}`,
      );
      res.json({ ok: true });
    } catch (err) {
      console.error("[academia] pedir a quién acompañar:", err);
      res.sendStatus(500);
    }
  });

  // Revisar una actividad: confirmarla o devolverla con un motivo. El sermón y el proyecto final se evalúan con su
  // rúbrica; la defensa del proyecto se programa antes y se evalúa después de ella. Al aprobar, si ya cumple todo, el
  // nivel se cierra.
  app.post("/api/academia/direccion/actividad/:id", async (req, res) => {
    try {
      const p = await permisoDe(req, res, "revisar");
      if (!p) return;
      const id = Number(req.params.id);
      if (!Number.isInteger(id) || id <= 0) return res.status(404).json({ message: "No existe esa actividad." });
      const accion = (["confirmar", "rechazar", "evaluar", "programar"] as const).find((x) => x === req.body?.accion) ?? null;
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
      const tipo = fila.tipo as TipoActividad;
      const conRubrica = tipo === "sermon" || tipo === "proyecto";

      // la defensa del proyecto final: cuándo, dónde y ante qué 2 profesores (se puede cambiar mientras espera)
      if (accion === "programar") {
        if (tipo !== "proyecto") return res.status(400).json({ message: "Solo se programa la defensa del proyecto final." });
        const d = validarDefensa(req.body, diaTexas());
        if (!d.ok) return res.status(400).json({ message: d.error });
        const antes = defensaDe(fila.defensa);
        const r = await pool.query(`UPDATE academia_actividades SET defensa = $2::jsonb WHERE id = $1 AND estado = 'pendiente'`, [
          id,
          JSON.stringify({ ...d.defensa, evaluaciones: null }),
        ]);
        if (!r.rowCount) return res.status(409).json({ message: "Otra persona la revisó recién." });
        const donde = d.defensa.lugar ? `en ${d.defensa.lugar}` : "en línea";
        await registrarEnHistorial(req, "academia_defensa_programada", alumnoId, {
          texto: `${antes ? "Cambió" : "Programó"} la defensa del proyecto final «${fila.titulo}» para ${cuandoDefensa(d.defensa)}, ${donde}, ante ${d.defensa.profesores.join(" y ")}`,
          motivo: null,
        });
        await avisarA(
          [alumnoId],
          antes ? "Cambió tu defensa del proyecto final" : "Tu defensa del proyecto final quedó programada",
          `Defenderás tu proyecto final ${cuandoDefensa(d.defensa)}, ${donde}${d.defensa.enlace ? " (el enlace está en la página del nivel)" : ""}, ante ${d.defensa.profesores.join(" y ")}.`,
          `/academia/nivel/${fila.nivel}`,
        );
        return res.json({ ok: true, estado: "pendiente", nivelCompleto: false, nota: null });
      }
      if (conRubrica && accion === "confirmar") {
        return res.status(400).json({ message: tipo === "sermon" ? "El sermón se evalúa con la rúbrica." : "El proyecto final se evalúa con la rúbrica, después de su defensa." });
      }
      if (!conRubrica && accion === "evaluar") return res.status(400).json({ message: "Solo el sermón y el proyecto final se evalúan con la rúbrica." });

      // la evaluación con la rúbrica: la del sermón (un maestro) o la del proyecto (los 2 profesores, después de la defensa)
      let nota: number | null = null;
      let evaluacion: EvaluacionSermon | null = null;
      let defensa: DefensaProyecto | null = null;
      let quienes = "";
      if (accion === "evaluar" && tipo === "sermon") {
        const ev = validarEvaluacion(req.body);
        if (!ev.ok) return res.status(400).json({ message: ev.error });
        nota = ev.nota;
        evaluacion = ev.evaluacion;
        quienes = `evaluó ${ev.evaluacion.evaluador}`;
      } else if (accion === "evaluar") {
        const prog = defensaDe(fila.defensa);
        if (!prog) return res.status(400).json({ message: "Primero programa la defensa del proyecto." });
        if (prog.fecha > diaTexas()) return res.status(400).json({ message: `La defensa es ${cuandoDefensa(prog)}: el proyecto se evalúa después de ella.` });
        const ev = validarEvaluacionProyecto(req.body);
        if (!ev.ok) return res.status(400).json({ message: ev.error });
        nota = ev.nota;
        defensa = { ...prog, evaluaciones: ev.evaluaciones };
        quienes = `evaluaron ${ev.evaluaciones.map((e) => `${e.evaluador}, ${e.nota}`).join("; ")}`;
      }
      const aprueba = tipo === "proyecto" ? APRUEBA_PROYECTO : APRUEBA_SERMON;
      const aprobado = accion === "confirmar" || (nota != null && nota >= aprueba);
      if (nota != null && !aprobado && motivo.length < LIMITES_ACTIVIDAD.motivoMin) {
        return res.status(400).json({ message: `Con ${nota} no se aprueba: escribe qué debe mejorar, el alumno lo recibe con su nota.` });
      }
      const registradas = fila.horas == null ? null : Number(fila.horas);
      let horas = registradas;
      if (horasConfirmadas != null) {
        if (tipo !== "practica" || registradas == null) return res.status(400).json({ message: "Solo la práctica se confirma con sus horas." });
        if (horasConfirmadas > registradas) return res.status(400).json({ message: `Se registraron ${horasTexto(registradas)} horas: no puedes confirmar más.` });
        horas = horasConfirmadas;
      }
      const r = await pool.query(
        `UPDATE academia_actividades SET estado = $2, motivo = $3, revisor_id = $4, revisada_at = now(), horas = $5, nota = $6, evaluacion = $7::jsonb,
                defensa = COALESCE($8::jsonb, defensa)
          WHERE id = $1 AND estado = 'pendiente'`,
        [id, aprobado ? "confirmada" : "rechazada", motivo || null, p.userId, horas, nota, evaluacion ? JSON.stringify(evaluacion) : null, defensa ? JSON.stringify(defensa) : null],
      );
      if (!r.rowCount) return res.status(409).json({ message: "Otra persona la revisó recién." });
      // si confirmó menos horas de las registradas, lo dicen el historial y el aviso
      const menos = horas != null && registradas != null && horas < registradas ? { horas, registradas } : null;
      await registrarEnHistorial(
        req,
        nota != null ? (tipo === "sermon" ? "academia_sermon_evaluado" : "academia_proyecto_evaluado") : accion === "confirmar" ? "academia_actividad_confirmada" : "academia_actividad_devuelta",
        alumnoId,
        {
          texto:
            nota != null
              ? `Evaluó ${cual(fila)} del Nivel ${fila.nivel} con la rúbrica: ${nota} de 100, ${aprobado ? "aprobado" : `por debajo de ${aprueba}`} (${quienes})`
              : `${accion === "confirmar" ? "Confirmó" : "Devolvió"} ${cual(fila)} del Nivel ${fila.nivel}${menos ? ` (confirmó ${horasTexto(menos.horas)})` : ""}`,
          motivo: motivo || null,
        },
      );
      const nv = NIVELES.find((x) => x.n === Number(fila.nivel));
      let cerrado = false;
      if (aprobado && nv) {
        const { rows: nl } = await pool.query(`SELECT completado_at FROM academia_niveles WHERE user_id = $1 AND nivel = $2`, [alumnoId, nv.n]);
        // «cerrado» solo si el nivel se completó justo con esta confirmación
        cerrado = !nl[0]?.completado_at && (await revisarNivel(alumnoId, nv));
      }
      const conMenos = menos ? ` con ${horasTexto(menos.horas)} de las ${horasTexto(menos.registradas)} horas que registraste` : "";
      const completo = cerrado ? ` ¡Completaste el Nivel ${fila.nivel}!` : "";
      const [titulo, contenido] =
        nota != null
          ? aprobado
            ? [
                CONFIRMADA[tipo],
                `La Administración evaluó ${queEs(tipo)} con la rúbrica: ${nota} de 100${tipo === "proyecto" ? " (el promedio de los dos profesores)" : ""}.${completo}${motivo ? ` Nota: ${motivo}` : ""}`,
              ]
            : [
                tipo === "sermon" ? "Revisa la evaluación de tu sermón" : "Revisa la evaluación de tu proyecto final",
                `${tipo === "sermon" ? "Tu sermón" : "Tu proyecto final"} obtuvo ${nota} de 100 y se aprueba con ${aprueba}: ${motivo}. ${
                  tipo === "sermon" ? "Prepáralo otra vez y vuelve a enviarlo." : "Mejóralo y entrégalo otra vez para una nueva defensa."
                }`,
              ]
          : accion === "confirmar"
            ? [
                CONFIRMADA[tipo] ?? "Tu actividad fue confirmada",
                `La Administración ${tipo === "ensenanza" ? "aprobó" : "confirmó"} ${queEs(tipo)}${conMenos}.${completo}${motivo ? ` Nota: ${motivo}` : ""}`,
              ]
            : ["Revisa una actividad de tu nivel", `La Administración devolvió ${queEs(tipo)}: ${motivo}. Puedes corregirla y registrarla otra vez.`];
      await avisarA([alumnoId], titulo, contenido, `/academia/nivel/${fila.nivel}`);
      res.json({ ok: true, estado: aprobado ? "confirmada" : "rechazada", nivelCompleto: cerrado, nota });
    } catch (err) {
      console.error("[academia] revisar actividad:", err);
      res.sendStatus(500);
    }
  });
}
