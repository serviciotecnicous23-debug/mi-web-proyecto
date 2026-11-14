/**
 * La inscripción en la academia y en cada materia (docs/academia.md, «La inscripción»).
 *
 * - En la academia: un asistente con la ficha de inscripción (shared/academia-inscripcion.ts), el reglamento académico
 *   y el código de honor. Al confirmar se guarda la ficha y se da la matrícula (academia-matricula.ts). La ficha se
 *   corrige cuando se quiera; el nombre, solo mientras no figure en certificados (después lo corrige la Dirección
 *   académica, con un motivo).
 * - En cada materia: desde su presentación (lo que se aprende, cómo es y cómo se evalúa). La fila de academia_materias
 *   es la inscripción: sin ella no se abren sus lecciones (salvo la primera, que es pública), ni el versículo ni el
 *   examen.
 * - Cada inscripción avisa en la campana a la Dirección académica y a quienes dirigen la iglesia aliada del alumno
 *   (avisarInscripcion). No pide aprobación: queda aprobada al instante.
 * - /api/academia/abierta: si la academia ya está abierta para todos (lo usan el menú y la barra de la app).
 */
import type { Express } from "express";
import { pool } from "./db";
import { REGLAMENTO, materiaPorId, requisitosMateria } from "@shared/academia";
import { ROLES_ACADEMIA } from "@shared/academia-permisos";
import {
  FICHA_VACIA, nombreCompleto, paisDeCuenta, repartirNombre, validarFicha,
  type FichaInscripcion, type FichaVista, type IglesiaOpcion, type InscripcionEstado,
} from "@shared/academia-inscripcion";
import { academiaAbierta, alumnoDe, enFila, frenar, inscritaEnMateria, inscritoDe, nombreAcademico } from "./academia-comun";
import { isOwnFileUrl } from "./file-storage";
import { matricular, matriculaDe } from "./academia-matricula";

let iglesiasCache = { hasta: 0, lista: [] as IglesiaOpcion[] };

/** Las iglesias aliadas activas (las mismas de «Buscar iglesia»). */
export async function iglesiasAliadas(): Promise<IglesiaOpcion[]> {
  if (Date.now() < iglesiasCache.hasta) return iglesiasCache.lista;
  const { rows } = await pool.query(
    `SELECT id, name, city, country FROM ministry_churches
      WHERE is_active AND (church_type = 'aliada' OR alliance_status = 'activa')
      ORDER BY sort_order, name`,
  );
  const lista = rows.map((r: any) => ({ id: Number(r.id), nombre: String(r.name), lugar: [r.city, r.country].filter(Boolean).join(", ") }));
  iglesiasCache = { hasta: Date.now() + 60_000, lista };
  return lista;
}

/** La ficha de inscripción de un alumno (null si todavía no la llenó). */
export async function fichaDe(userId: number): Promise<FichaVista | null> {
  const { rows } = await pool.query(
    `SELECT i.*, c.name AS iglesia_nombre FROM academia_inscripciones i LEFT JOIN ministry_churches c ON c.id = i.iglesia_id WHERE i.user_id = $1`,
    [userId],
  );
  const r = rows[0];
  if (!r) return null;
  return {
    nombres: r.nombres,
    apellidos: r.apellidos,
    pais: r.pais,
    ciudad: r.ciudad ?? "",
    telefono: r.telefono ?? "",
    nacimiento: r.nacimiento ?? "",
    iglesiaId: r.iglesia_id == null ? null : Number(r.iglesia_id),
    iglesiaOtra: r.iglesia_otra ?? "",
    pastor: r.pastor ?? "",
    tiempoFe: r.tiempo_fe ?? "",
    bautismo: r.bautismo ?? "",
    ministerio: r.ministerio ?? "",
    comoConocio: r.como_conocio ?? "",
    espera: r.espera ?? "",
    iglesiaNombre: r.iglesia_nombre ?? null,
    foto: r.foto_url ?? null,
    creada: new Date(r.created_at).toISOString(),
    actualizada: new Date(r.updated_at).toISOString(),
  };
}

/** ¿Su nombre ya figura en un certificado vigente? Entonces solo lo corrige la Dirección académica. */
async function nombreFijo(userId: number): Promise<boolean> {
  const { rows } = await pool.query(`SELECT 1 FROM academia_certificados WHERE user_id = $1 AND revocado_at IS NULL LIMIT 1`, [userId]);
  return rows.length > 0;
}

/** Lo que ya se sabe de la cuenta, para no escribirlo dos veces: el nombre repartido, el país, el teléfono y la iglesia. */
async function sugeridaDe(userId: number, iglesias: IglesiaOpcion[]): Promise<FichaInscripcion> {
  const { rows } = await pool.query(`SELECT display_name, country, phone, church_id FROM users WHERE id = $1`, [userId]);
  const u = rows[0] ?? {};
  const iglesia = Number(u.church_id);
  return {
    ...FICHA_VACIA,
    ...repartirNombre(String(u.display_name || "")),
    pais: paisDeCuenta(u.country),
    telefono: String(u.phone || "").slice(0, 24),
    iglesiaId: iglesias.some((i) => i.id === iglesia) ? iglesia : null,
  };
}

async function guardarFicha(userId: number, f: FichaInscripcion): Promise<void> {
  const vacio = (s: string) => s || null;
  await pool.query(
    `INSERT INTO academia_inscripciones
       (user_id, nombres, apellidos, pais, ciudad, telefono, nacimiento, iglesia_id, iglesia_otra, pastor, tiempo_fe, bautismo, ministerio, como_conocio, espera)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
     ON CONFLICT (user_id) DO UPDATE SET
       nombres = EXCLUDED.nombres, apellidos = EXCLUDED.apellidos, pais = EXCLUDED.pais, ciudad = EXCLUDED.ciudad,
       telefono = EXCLUDED.telefono, nacimiento = EXCLUDED.nacimiento, iglesia_id = EXCLUDED.iglesia_id,
       iglesia_otra = EXCLUDED.iglesia_otra, pastor = EXCLUDED.pastor, tiempo_fe = EXCLUDED.tiempo_fe,
       bautismo = EXCLUDED.bautismo, ministerio = EXCLUDED.ministerio, como_conocio = EXCLUDED.como_conocio,
       espera = EXCLUDED.espera, updated_at = now()`,
    [
      userId, f.nombres, f.apellidos, f.pais, vacio(f.ciudad), vacio(f.telefono), vacio(f.nacimiento), f.iglesiaId, vacio(f.iglesiaOtra),
      vacio(f.pastor), vacio(f.tiempoFe), vacio(f.bautismo), vacio(f.ministerio), vacio(f.comoConocio), vacio(f.espera),
    ],
  );
}

/**
 * Avisa en la campana a la Dirección académica, y a quienes dirigen la iglesia aliada del alumno, que alguien se
 * inscribió (docs/academia.md, «Los avisos»). No manda correos ni avisos al teléfono, y nadie recibe el aviso de su
 * propia inscripción. El enlace abre al alumno en el panel de seguimiento.
 */
export async function avisarInscripcion(alumnoId: number, titulo: string, contenido: string): Promise<void> {
  const direccion = ROLES_ACADEMIA.find((r) => r.id === "direccion")!.roles;
  const iglesia = ROLES_ACADEMIA.find((r) => r.id === "iglesia")!.roles;
  await pool.query(
    `INSERT INTO notifications (user_id, type, title, content, link)
     SELECT u.id, 'academia', $3, $4, $5 FROM users u
      WHERE u.is_active AND u.id <> $1
        AND (u.role = ANY($2::text[])
             OR (u.role = ANY($6::text[]) AND u.church_id IS NOT NULL
                 AND u.church_id = (SELECT iglesia_id FROM academia_inscripciones WHERE user_id = $1)))`,
    [alumnoId, [...direccion], titulo, contenido, `/academia/direccion/alumno/${alumnoId}`, [...iglesia]],
  );
}

const avisar = (alumnoId: number, titulo: string, contenido: string) =>
  void avisarInscripcion(alumnoId, titulo, contenido).catch((err) => console.error("[academia] aviso de inscripción:", err));

/** Los niveles que el alumno ya completó. */
export async function nivelesCompletos(userId: number): Promise<number[]> {
  const { rows } = await pool.query(`SELECT nivel FROM academia_niveles WHERE user_id = $1 AND completado_at IS NOT NULL`, [userId]);
  return rows.map((r: any) => Number(r.nivel));
}

export function registerAcademiaInscripcionRoutes(app: Express) {
  // ¿La academia ya está abierta para todos? (el menú y la barra de la app). Mientras no, la ven los de la vista previa.
  app.get("/api/academia/abierta", async (_req, res) => {
    res.setHeader("Cache-Control", "no-store");
    try {
      res.json({ abierta: await academiaAbierta() });
    } catch {
      res.json({ abierta: false });
    }
  });

  // Mi inscripción: la ficha, la matrícula, las iglesias aliadas y lo que ya se sabe de mi cuenta.
  app.get("/api/academia/inscripcion", async (req, res) => {
    try {
      const a = await alumnoDe(req, res);
      if (!a) return;
      const iglesias = await iglesiasAliadas();
      const [ficha, matricula, fijo, sugerida] = await Promise.all([fichaDe(a.userId), matriculaDe(a.userId), nombreFijo(a.userId), sugeridaDe(a.userId, iglesias)]);
      const out: InscripcionEstado = { ficha, matricula, iglesias, sugerida, nombreFijo: !!ficha && fijo, reglamento: REGLAMENTO.version };
      res.setHeader("Cache-Control", "no-store");
      res.json(out);
    } catch (err) {
      console.error("[academia] inscripción:", err);
      res.sendStatus(500);
    }
  });

  // Inscribirme, o corregir mi ficha: la ficha y, la primera vez, el reglamento académico y el código de honor.
  app.post("/api/academia/inscripcion", async (req, res) => {
    try {
      const a = await alumnoDe(req, res);
      if (!a) return;
      if (frenar(`ai:${a.userId}`, 800)) return res.status(429).json({ message: "Espera un momento." });
      const v = validarFicha(req.body?.ficha);
      if (!v.ok) return res.status(400).json({ message: "Revisa los datos marcados.", errores: v.errores });
      const f = v.ficha;
      if (f.iglesiaId && !(await iglesiasAliadas()).some((i) => i.id === f.iglesiaId)) {
        return res.status(400).json({ message: "Revisa los datos marcados.", errores: { iglesiaId: "Elige una iglesia de la lista." } });
      }
      const out = await enFila(a.userId, async () => {
        const [antes, ya, fijo] = await Promise.all([fichaDe(a.userId), matriculaDe(a.userId), nombreFijo(a.userId)]);
        if (!ya && (req.body?.reglamento !== true || req.body?.honor !== true)) {
          return { error: 400, cuerpo: { message: "Para inscribirte, acepta el reglamento académico y el código de honor." } };
        }
        if (antes && fijo && nombreCompleto(antes) !== nombreCompleto(f)) {
          return {
            error: 409,
            cuerpo: {
              message: "Tu nombre ya figura en tus certificados. Para corregirlo, escribe a la Dirección académica.",
              errores: { nombres: "Este nombre ya figura en tus certificados." },
            },
          };
        }
        await guardarFicha(a.userId, f);
        // La primera ficha de quien ya tenía certificados (emitidos antes de que existiera la ficha): toman su nombre.
        if (!antes) await pool.query(`UPDATE academia_certificados SET nombre = $2 WHERE user_id = $1 AND revocado_at IS NULL`, [a.userId, nombreCompleto(f)]);
        const matricula = ya ?? (await matricular(a.userId));
        return { ok: { ficha: await fichaDe(a.userId), matricula, nueva: !ya }, primera: !antes };
      });
      if ("error" in out) return res.status(out.error as number).json(out.cuerpo);
      // La primera ficha (una inscripción nueva, o la de quien ya tenía matrícula): aviso a la Dirección académica.
      if (out.primera) {
        avisar(
          a.userId,
          out.ok.nueva ? "Nueva inscripción en la academia" : "Inscripción completada en la academia",
          `${nombreCompleto(f)} (${out.ok.matricula.numero}) ${out.ok.nueva ? "se inscribió en la academia" : "completó su ficha de inscripción"}${f.pais ? `, desde ${f.pais}` : ""}.`,
        );
      }
      res.setHeader("Cache-Control", "no-store");
      res.json(out.ok);
    } catch (err) {
      console.error("[academia] inscribirse:", err);
      res.sendStatus(500);
    }
  });

  // La foto de mi carné: un archivo ya subido a la web (POST /api/upload/file?carpeta=academia), o null para quitarla
  // (vuelve la foto de perfil o las iniciales). No acepta enlaces de afuera.
  app.post("/api/academia/foto", async (req, res) => {
    try {
      const a = await inscritoDe(req, res);
      if (!a) return;
      if (frenar(`af:${a.userId}`, 1000)) return res.status(429).json({ message: "Espera un momento." });
      const url = req.body?.url;
      if (url !== null && (typeof url !== "string" || url.length > 500 || url.startsWith("data:") || !isOwnFileUrl(url))) {
        return res.status(400).json({ message: "Esa foto no es válida. Súbela desde tu teléfono o tu computadora." });
      }
      await pool.query(`UPDATE academia_inscripciones SET foto_url = $2, updated_at = now() WHERE user_id = $1`, [a.userId, url]);
      res.setHeader("Cache-Control", "no-store");
      res.json({ foto: url });
    } catch (err) {
      console.error("[academia] foto del carné:", err);
      res.sendStatus(500);
    }
  });

  // Inscribirme en una materia (desde su presentación): pide estar inscrito en la academia y el nivel anterior completo.
  app.post("/api/academia/materia/:materiaId/inscripcion", async (req, res) => {
    try {
      const a = await inscritoDe(req, res);
      if (!a) return;
      const m = materiaPorId(String(req.params.materiaId || ""));
      if (!m) return res.status(404).json({ message: "No existe esa materia." });
      if (!m.disponible) return res.status(409).json({ message: "Esta materia todavía está en preparación." });
      if (frenar(`aim:${a.userId}`, 500)) return res.status(429).json({ message: "Espera un momento." });
      const falta = requisitosMateria(m, await nivelesCompletos(a.userId));
      if (falta.length) return res.status(409).json({ message: `Para inscribirte en esta materia te falta ${falta.join(" y ")}.`, falta });
      const { rows: nueva } = await enFila(a.userId, () =>
        pool.query(`INSERT INTO academia_materias (user_id, materia_id) VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING materia_id`, [a.userId, m.id]),
      );
      if (nueva.length) avisar(a.userId, `Inscripción en «${m.titulo}»`, `${await nombreAcademico(a.userId)} se inscribió en «${m.titulo}».`);
      res.setHeader("Cache-Control", "no-store");
      res.json({ inscrita: await inscritaEnMateria(a.userId, m.id) });
    } catch (err) {
      console.error("[academia] inscribirse en la materia:", err);
      res.sendStatus(500);
    }
  });
}
