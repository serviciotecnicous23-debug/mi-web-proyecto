/**
 * El cuaderno de apuntes (shared/cuaderno.ts, docs/academia.md, «El cuaderno»): las notas de cada persona, hechas de
 * bloques, y los resaltados de las lecciones de la academia. Es el mismo cuaderno en la academia y en la Biblioteca.
 *
 * - Se guarda en la cuenta: se ve igual en todos los equipos. Cada guardado lleva la versión de la nota; si otro equipo
 *   guardó antes, responde 409 con lo guardado (la página no pisa nada: guarda lo suyo como copia).
 * - Es privado: solo su dueño lo ve. Ni los profesores ni la Administración leen el cuaderno de nadie.
 * - Las notas borradas van a la papelera y se borran solas a los 30 días. Se borra todo con la cuenta.
 * - Las citas bíblicas de cada nota quedan guardadas («Juan|3|16|16»): la Biblioteca muestra «tus apuntes sobre este
 *   capítulo» en cada capítulo.
 */
import type { Express, Request, Response } from "express";
import { pool } from "./db";
import {
  COLORES, LIMITES, PLANTILLAS, bloquesValidos, citaGuardada, citasDeNota, etiquetasValidas, paraBuscar, textoPlano,
  type BloqueCuaderno, type ColorCuaderno, type CuadernoLista, type NotaCompleta, type NotaResumen, type ResaltadoLeccion,
} from "@shared/cuaderno";
import { leccionPorId, materiaPorId } from "@shared/academia";
import { BIBLE_BOOK_CHAPTERS } from "@shared/bible";
import { frenar } from "./academia-comun";

export const CUADERNO_SQL = `
CREATE TABLE IF NOT EXISTS "cuaderno_notas" (
  "id" serial PRIMARY KEY,
  "user_id" integer NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "titulo" text NOT NULL DEFAULT '',
  "bloques" jsonb NOT NULL DEFAULT '[]'::jsonb,
  "buscar" text NOT NULL DEFAULT '',
  "extracto" text NOT NULL DEFAULT '',
  "materia_id" text,
  "leccion_id" text,
  "citas" text[] NOT NULL DEFAULT '{}',
  "etiquetas" text[] NOT NULL DEFAULT '{}',
  "color" text,
  "fijada" boolean NOT NULL DEFAULT false,
  "version" integer NOT NULL DEFAULT 1,
  "created_at" timestamp NOT NULL DEFAULT now(),
  "updated_at" timestamp NOT NULL DEFAULT now(),
  "borrada_at" timestamp
);
CREATE INDEX IF NOT EXISTS "cuaderno_notas_user_idx" ON "cuaderno_notas" ("user_id", "updated_at" DESC);
CREATE INDEX IF NOT EXISTS "cuaderno_notas_leccion_idx" ON "cuaderno_notas" ("user_id", "leccion_id");
CREATE TABLE IF NOT EXISTS "cuaderno_resaltados" (
  "id" serial PRIMARY KEY,
  "user_id" integer NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "leccion_id" text NOT NULL,
  "bloque" integer NOT NULL,
  "texto" text NOT NULL,
  "color" text NOT NULL DEFAULT 'amarillo',
  "nota" text,
  "created_at" timestamp NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS "cuaderno_resaltados_idx" ON "cuaderno_resaltados" ("user_id", "leccion_id");
`;

const COLOR = new Set<string>(COLORES);

/** La persona con sesión (también una cuenta por aprobar: estudia en la academia y lee la Biblia), o 401. */
function dueñoDe(req: Request, res: Response): number | null {
  if (!req.isAuthenticated() || !req.user) {
    res.status(401).json({ message: "Entra con tu cuenta para usar tu cuaderno." });
    return null;
  }
  return req.user.id;
}

const iso = (d: unknown) => (d ? new Date(d as string).toISOString() : null);

function resumenDe(r: any): NotaResumen {
  const m = r.materia_id ? materiaPorId(r.materia_id) : undefined;
  const l = r.leccion_id ? leccionPorId(r.leccion_id) : undefined;
  return {
    id: Number(r.id),
    titulo: r.titulo,
    extracto: r.extracto,
    materiaId: r.materia_id ?? null,
    materiaTitulo: m?.titulo ?? null,
    leccionId: r.leccion_id ?? null,
    leccionTitulo: l?.leccion.titulo ?? null,
    etiquetas: r.etiquetas ?? [],
    color: COLOR.has(r.color) ? (r.color as ColorCuaderno) : null,
    fijada: !!r.fijada,
    actualizada: iso(r.updated_at)!,
    borrada: iso(r.borrada_at),
  };
}

function completaDe(r: any): NotaCompleta {
  return { ...resumenDe(r), bloques: (r.bloques ?? []) as BloqueCuaderno[], version: Number(r.version), creada: iso(r.created_at)! };
}

/** Lo que se guarda para buscar, el extracto de la lista y las citas de una nota. */
function derivados(titulo: string, bloques: BloqueCuaderno[]) {
  const plano = textoPlano(bloques);
  return {
    buscar: paraBuscar(`${titulo}\n${plano}`),
    extracto: plano.replace(/\s+/g, " ").trim().slice(0, 180),
    citas: citasDeNota(bloques).map(citaGuardada),
  };
}

function tituloValido(t: unknown): string {
  return typeof t === "string" ? t.replace(/\s+/g, " ").trim().slice(0, LIMITES.titulo) : "";
}

/** La materia y la lección de una nota nueva, si son de verdad. */
function vinculo(materiaId: unknown, leccionId: unknown): { materia: string | null; leccion: string | null } {
  const l = typeof leccionId === "string" ? leccionPorId(leccionId) : undefined;
  if (l) return { materia: l.materia.id, leccion: l.leccion.id };
  const m = typeof materiaId === "string" ? materiaPorId(materiaId) : undefined;
  return { materia: m ? m.id : null, leccion: null };
}

async function notaDe(userId: number, id: number): Promise<any | null> {
  if (!Number.isInteger(id) || id <= 0) return null;
  const { rows } = await pool.query(`SELECT * FROM cuaderno_notas WHERE id = $1 AND user_id = $2`, [id, userId]);
  return rows[0] ?? null;
}

async function crearNota(userId: number, titulo: string, bloques: BloqueCuaderno[], materia: string | null, leccion: string | null): Promise<any> {
  const d = derivados(titulo, bloques);
  const { rows } = await pool.query(
    `INSERT INTO cuaderno_notas (user_id, titulo, bloques, buscar, extracto, citas, materia_id, leccion_id)
     VALUES ($1, $2, $3::jsonb, $4, $5, $6::text[], $7, $8) RETURNING *`,
    [userId, titulo, JSON.stringify(bloques), d.buscar, d.extracto, d.citas, materia, leccion],
  );
  return rows[0];
}

function resaltadoDe(r: any): ResaltadoLeccion {
  const l = leccionPorId(r.leccion_id);
  return {
    id: Number(r.id),
    leccionId: r.leccion_id,
    leccionTitulo: l?.leccion.titulo ?? null,
    materiaId: l?.materia.id ?? null,
    materiaTitulo: l?.materia.titulo ?? null,
    bloque: Number(r.bloque),
    texto: r.texto,
    color: COLOR.has(r.color) ? r.color : "amarillo",
    nota: r.nota ?? null,
    creado: iso(r.created_at)!,
  };
}

function error500(res: Response, donde: string, err: unknown) {
  console.error(`[cuaderno] ${donde}:`, err);
  if (!res.headersSent) res.status(500).json({ message: "No se pudo guardar en tu cuaderno. Inténtalo otra vez." });
}

export function registerCuadernoRoutes(app: Express) {
  // Mi cuaderno: las notas (las más recientes primero; las fijadas arriba), con búsqueda y filtros.
  app.get("/api/cuaderno", async (req, res) => {
    try {
      const userId = dueñoDe(req, res);
      if (userId == null) return;
      // la papelera se vacía sola a los 30 días
      await pool.query(`DELETE FROM cuaderno_notas WHERE user_id = $1 AND borrada_at < now() - ($2::int * interval '1 day')`, [userId, LIMITES.papelera]);
      const papelera = req.query.vista === "papelera";
      const filtros = [`user_id = $1`, papelera ? `borrada_at IS NOT NULL` : `borrada_at IS NULL`];
      const valores: unknown[] = [userId];
      const q = typeof req.query.q === "string" ? paraBuscar(req.query.q).trim().slice(0, 80) : "";
      if (q) {
        valores.push(`%${q.replace(/[\\%_]/g, (c) => `\\${c}`)}%`);
        filtros.push(`buscar LIKE $${valores.length}`);
      }
      if (typeof req.query.materia === "string" && req.query.materia) {
        valores.push(req.query.materia);
        filtros.push(`materia_id = $${valores.length}`);
      }
      if (typeof req.query.etiqueta === "string" && req.query.etiqueta) {
        valores.push(req.query.etiqueta);
        filtros.push(`$${valores.length} = ANY(etiquetas)`);
      }
      if (req.query.vista === "fijadas") filtros.push(`fijada`);
      const [{ rows }, { rows: mats }, { rows: etq }, { rows: pap }] = await Promise.all([
        pool.query(
          `SELECT id, titulo, extracto, materia_id, leccion_id, etiquetas, color, fijada, updated_at, borrada_at
             FROM cuaderno_notas WHERE ${filtros.join(" AND ")} ORDER BY fijada DESC, updated_at DESC LIMIT 500`,
          valores,
        ),
        pool.query(`SELECT materia_id, count(*)::int AS n FROM cuaderno_notas WHERE user_id = $1 AND borrada_at IS NULL AND materia_id IS NOT NULL GROUP BY materia_id`, [userId]),
        pool.query(`SELECT DISTINCT unnest(etiquetas) AS e FROM cuaderno_notas WHERE user_id = $1 AND borrada_at IS NULL`, [userId]),
        pool.query(`SELECT count(*)::int AS n FROM cuaderno_notas WHERE user_id = $1 AND borrada_at IS NOT NULL`, [userId]),
      ]);
      const out: CuadernoLista = {
        notas: rows.map(resumenDe),
        materias: mats
          .map((m: any) => ({ id: m.materia_id as string, titulo: materiaPorId(m.materia_id)?.titulo ?? m.materia_id, notas: Number(m.n) }))
          .sort((a, b) => a.titulo.localeCompare(b.titulo, "es")),
        etiquetas: etq.map((e: any) => e.e as string).sort((a, b) => a.localeCompare(b, "es")),
        enPapelera: Number(pap[0]?.n ?? 0),
      };
      res.setHeader("Cache-Control", "no-store");
      res.json(out);
    } catch (err) {
      error500(res, "lista", err);
    }
  });

  // Una nota nueva: en blanco, con una plantilla o con sus bloques; puede ir unida a una materia o a una lección.
  app.post("/api/cuaderno/notas", async (req, res) => {
    try {
      const userId = dueñoDe(req, res);
      if (userId == null) return;
      if (frenar(`cn:${userId}`, 300)) return res.status(429).json({ message: "Espera un momento." });
      const { rows: n } = await pool.query(`SELECT count(*)::int AS n FROM cuaderno_notas WHERE user_id = $1`, [userId]);
      if (Number(n[0].n) >= LIMITES.notas) return res.status(409).json({ message: `Tu cuaderno llegó a ${LIMITES.notas} notas. Vacía la papelera o borra algunas.` });
      const plantilla = PLANTILLAS.find((p) => p.id === req.body?.plantilla);
      const v = bloquesValidos(req.body?.bloques ?? (plantilla ? plantilla.bloques() : []));
      if ("error" in v) return res.status(400).json({ message: v.error });
      const { materia, leccion } = vinculo(req.body?.materiaId, req.body?.leccionId);
      let titulo = tituloValido(req.body?.titulo);
      if (!titulo && leccion) titulo = leccionPorId(leccion)?.leccion.titulo ?? "";
      const r = await crearNota(userId, titulo, v.bloques, materia, leccion);
      res.setHeader("Cache-Control", "no-store");
      res.status(201).json(completaDe(r));
    } catch (err) {
      error500(res, "crear", err);
    }
  });

  // Una nota entera.
  app.get("/api/cuaderno/notas/:id", async (req, res) => {
    try {
      const userId = dueñoDe(req, res);
      if (userId == null) return;
      const r = await notaDe(userId, Number(req.params.id));
      if (!r) return res.status(404).json({ message: "No encontramos esa nota." });
      res.setHeader("Cache-Control", "no-store");
      res.json(completaDe(r));
    } catch (err) {
      error500(res, "nota", err);
    }
  });

  // Guardar una nota (el título y los bloques), con la versión que se editó: si otro equipo guardó antes, 409.
  app.put("/api/cuaderno/notas/:id", async (req, res) => {
    try {
      const userId = dueñoDe(req, res);
      if (userId == null) return;
      if (frenar(`cg:${userId}:${req.params.id}`, 200)) return res.status(429).json({ message: "Espera un momento." });
      const r = await notaDe(userId, Number(req.params.id));
      if (!r) return res.status(404).json({ message: "No encontramos esa nota." });
      if (r.borrada_at) return res.status(409).json({ message: "Esa nota está en la papelera: restáurala para seguir escribiendo." });
      if (Number(req.body?.version) !== Number(r.version)) {
        return res.status(409).json({ message: "Esta nota cambió en otro equipo.", conflicto: true, nota: completaDe(r) });
      }
      const v = bloquesValidos(req.body?.bloques);
      if ("error" in v) return res.status(400).json({ message: v.error });
      const json = JSON.stringify(v.bloques);
      if (json.length > LIMITES.bytes) return res.status(413).json({ message: "La nota es demasiado larga: divídela en dos." });
      const titulo = tituloValido(req.body?.titulo);
      const d = derivados(titulo, v.bloques);
      const { rows } = await pool.query(
        `UPDATE cuaderno_notas SET titulo = $3, bloques = $4::jsonb, buscar = $5, extracto = $6, citas = $7::text[], version = version + 1, updated_at = now()
          WHERE id = $1 AND user_id = $2 AND version = $8 RETURNING *`,
        [r.id, userId, titulo, json, d.buscar, d.extracto, d.citas, r.version],
      );
      if (!rows[0]) {
        const ahora = await notaDe(userId, r.id);
        return res.status(409).json({ message: "Esta nota cambió en otro equipo.", conflicto: true, nota: ahora ? completaDe(ahora) : null });
      }
      res.setHeader("Cache-Control", "no-store");
      res.json(completaDe(rows[0]));
    } catch (err) {
      error500(res, "guardar", err);
    }
  });

  // Fijarla, su color y sus etiquetas (sin tocar el texto ni la versión).
  app.patch("/api/cuaderno/notas/:id", async (req, res) => {
    try {
      const userId = dueñoDe(req, res);
      if (userId == null) return;
      const r = await notaDe(userId, Number(req.params.id));
      if (!r) return res.status(404).json({ message: "No encontramos esa nota." });
      const fijada = typeof req.body?.fijada === "boolean" ? req.body.fijada : r.fijada;
      const color = req.body?.color === null ? null : COLOR.has(req.body?.color) ? req.body.color : r.color;
      const etiquetas = req.body?.etiquetas !== undefined ? etiquetasValidas(req.body.etiquetas) : r.etiquetas;
      const { rows } = await pool.query(`UPDATE cuaderno_notas SET fijada = $3, color = $4, etiquetas = $5::text[] WHERE id = $1 AND user_id = $2 RETURNING *`, [
        r.id, userId, fijada, color, etiquetas,
      ]);
      res.setHeader("Cache-Control", "no-store");
      res.json(completaDe(rows[0]));
    } catch (err) {
      error500(res, "cambiar", err);
    }
  });

  // A la papelera (o, con ?definitiva=1 y si ya estaba en la papelera, borrada para siempre).
  app.delete("/api/cuaderno/notas/:id", async (req, res) => {
    try {
      const userId = dueñoDe(req, res);
      if (userId == null) return;
      const r = await notaDe(userId, Number(req.params.id));
      if (!r) return res.status(404).json({ message: "No encontramos esa nota." });
      if (req.query.definitiva === "1") {
        if (!r.borrada_at) return res.status(409).json({ message: "Primero mándala a la papelera." });
        await pool.query(`DELETE FROM cuaderno_notas WHERE id = $1 AND user_id = $2`, [r.id, userId]);
        return res.json({ borrada: true });
      }
      await pool.query(`UPDATE cuaderno_notas SET borrada_at = now(), fijada = false WHERE id = $1 AND user_id = $2`, [r.id, userId]);
      res.json({ papelera: true });
    } catch (err) {
      error500(res, "borrar", err);
    }
  });

  app.post("/api/cuaderno/notas/:id/restaurar", async (req, res) => {
    try {
      const userId = dueñoDe(req, res);
      if (userId == null) return;
      const { rows } = await pool.query(`UPDATE cuaderno_notas SET borrada_at = NULL, updated_at = now() WHERE id = $1 AND user_id = $2 RETURNING *`, [Number(req.params.id), userId]);
      if (!rows[0]) return res.status(404).json({ message: "No encontramos esa nota." });
      res.json(completaDe(rows[0]));
    } catch (err) {
      error500(res, "restaurar", err);
    }
  });

  // El cuaderno de una lección: su nota (la más reciente, si hay) y sus resaltados.
  app.get("/api/cuaderno/leccion/:leccionId", async (req, res) => {
    try {
      const userId = dueñoDe(req, res);
      if (userId == null) return;
      const l = leccionPorId(String(req.params.leccionId));
      if (!l) return res.status(404).json({ message: "No encontramos esa lección." });
      const [{ rows: notas }, { rows: res2 }] = await Promise.all([
        pool.query(`SELECT * FROM cuaderno_notas WHERE user_id = $1 AND leccion_id = $2 AND borrada_at IS NULL ORDER BY updated_at DESC LIMIT 1`, [userId, l.leccion.id]),
        pool.query(`SELECT * FROM cuaderno_resaltados WHERE user_id = $1 AND leccion_id = $2 ORDER BY bloque, id`, [userId, l.leccion.id]),
      ]);
      res.setHeader("Cache-Control", "no-store");
      res.json({ nota: notas[0] ? completaDe(notas[0]) : null, resaltados: res2.map(resaltadoDe) });
    } catch (err) {
      error500(res, "lección", err);
    }
  });

  // Agregar bloques a la nota de una lección (la crea si no existe): lo que se copia o se resalta mientras se lee.
  app.post("/api/cuaderno/leccion/:leccionId/agregar", async (req, res) => {
    try {
      const userId = dueñoDe(req, res);
      if (userId == null) return;
      if (frenar(`ca:${userId}`, 300)) return res.status(429).json({ message: "Espera un momento." });
      const l = leccionPorId(String(req.params.leccionId));
      if (!l) return res.status(404).json({ message: "No encontramos esa lección." });
      const v = bloquesValidos(req.body?.bloques);
      if ("error" in v || !v.bloques.length) return res.status(400).json({ message: "error" in v ? v.error : "No hay nada para agregar." });
      const { rows } = await pool.query(`SELECT * FROM cuaderno_notas WHERE user_id = $1 AND leccion_id = $2 AND borrada_at IS NULL ORDER BY updated_at DESC LIMIT 1`, [userId, l.leccion.id]);
      if (!rows[0]) {
        const r = await crearNota(userId, l.leccion.titulo, v.bloques, l.materia.id, l.leccion.id);
        return res.status(201).json(completaDe(r));
      }
      const bloques = [...(rows[0].bloques as BloqueCuaderno[]), ...v.bloques];
      const todo = bloquesValidos(bloques);
      if ("error" in todo) return res.status(400).json({ message: todo.error });
      const d = derivados(rows[0].titulo, todo.bloques);
      const { rows: out } = await pool.query(
        `UPDATE cuaderno_notas SET bloques = $3::jsonb, buscar = $4, extracto = $5, citas = $6::text[], version = version + 1, updated_at = now()
          WHERE id = $1 AND user_id = $2 RETURNING *`,
        [rows[0].id, userId, JSON.stringify(todo.bloques), d.buscar, d.extracto, d.citas],
      );
      res.json(completaDe(out[0]));
    } catch (err) {
      error500(res, "agregar", err);
    }
  });

  // Mis resaltados (de todas las lecciones o de una materia).
  app.get("/api/cuaderno/resaltados", async (req, res) => {
    try {
      const userId = dueñoDe(req, res);
      if (userId == null) return;
      const { rows } = await pool.query(`SELECT * FROM cuaderno_resaltados WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1000`, [userId]);
      let lista = rows.map(resaltadoDe);
      if (typeof req.query.materia === "string" && req.query.materia) lista = lista.filter((r) => r.materiaId === req.query.materia);
      res.setHeader("Cache-Control", "no-store");
      res.json(lista);
    } catch (err) {
      error500(res, "resaltados", err);
    }
  });

  // Resaltar un texto de una lección.
  app.post("/api/cuaderno/resaltados", async (req, res) => {
    try {
      const userId = dueñoDe(req, res);
      if (userId == null) return;
      if (frenar(`cr:${userId}`, 250)) return res.status(429).json({ message: "Espera un momento." });
      const l = typeof req.body?.leccionId === "string" ? leccionPorId(req.body.leccionId) : undefined;
      if (!l) return res.status(400).json({ message: "No encontramos esa lección." });
      const texto = typeof req.body?.texto === "string" ? req.body.texto.replace(/\s+/g, " ").trim() : "";
      const bloqueN = Number(req.body?.bloque);
      if (texto.length < 2 || texto.length > LIMITES.textoResaltado) return res.status(400).json({ message: `Resalta de 2 a ${LIMITES.textoResaltado} letras.` });
      if (!Number.isInteger(bloqueN) || bloqueN < -2 || bloqueN > 200) return res.status(400).json({ message: "No encontramos ese texto en la lección." });
      const color = COLOR.has(req.body?.color) ? req.body.color : "amarillo";
      const { rows: n } = await pool.query(`SELECT count(*)::int AS n FROM cuaderno_resaltados WHERE user_id = $1`, [userId]);
      if (Number(n[0].n) >= LIMITES.resaltados) return res.status(409).json({ message: "Llegaste al máximo de resaltados: borra algunos." });
      const { rows } = await pool.query(
        `INSERT INTO cuaderno_resaltados (user_id, leccion_id, bloque, texto, color) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [userId, l.leccion.id, bloqueN, texto, color],
      );
      res.status(201).json(resaltadoDe(rows[0]));
    } catch (err) {
      error500(res, "resaltar", err);
    }
  });

  app.patch("/api/cuaderno/resaltados/:id", async (req, res) => {
    try {
      const userId = dueñoDe(req, res);
      if (userId == null) return;
      const { rows: ya } = await pool.query(`SELECT * FROM cuaderno_resaltados WHERE id = $1 AND user_id = $2`, [Number(req.params.id), userId]);
      if (!ya[0]) return res.status(404).json({ message: "No encontramos ese resaltado." });
      const color = COLOR.has(req.body?.color) ? req.body.color : ya[0].color;
      const nota = req.body?.nota === null ? null : typeof req.body?.nota === "string" ? req.body.nota.trim().slice(0, 1000) || null : ya[0].nota;
      const { rows } = await pool.query(`UPDATE cuaderno_resaltados SET color = $3, nota = $4 WHERE id = $1 AND user_id = $2 RETURNING *`, [ya[0].id, userId, color, nota]);
      res.json(resaltadoDe(rows[0]));
    } catch (err) {
      error500(res, "cambiar resaltado", err);
    }
  });

  app.delete("/api/cuaderno/resaltados/:id", async (req, res) => {
    try {
      const userId = dueñoDe(req, res);
      if (userId == null) return;
      const { rowCount } = await pool.query(`DELETE FROM cuaderno_resaltados WHERE id = $1 AND user_id = $2`, [Number(req.params.id), userId]);
      if (!rowCount) return res.status(404).json({ message: "No encontramos ese resaltado." });
      res.json({ borrado: true });
    } catch (err) {
      error500(res, "borrar resaltado", err);
    }
  });

  // Mis apuntes sobre un capítulo de la Biblia (para la Biblioteca): las notas que citan ese capítulo.
  app.get("/api/cuaderno/biblia/:libro/:capitulo", async (req, res) => {
    try {
      const userId = dueñoDe(req, res);
      if (userId == null) return;
      const libro = String(req.params.libro);
      const cap = Number(req.params.capitulo);
      if (!(libro in BIBLE_BOOK_CHAPTERS) || !Number.isInteger(cap) || cap < 1) return res.json([]);
      const { rows } = await pool.query(
        `SELECT id, titulo, extracto, materia_id, leccion_id, etiquetas, color, fijada, updated_at, borrada_at, citas
           FROM cuaderno_notas
          WHERE user_id = $1 AND borrada_at IS NULL AND EXISTS (SELECT 1 FROM unnest(citas) c WHERE c LIKE $2)
          ORDER BY updated_at DESC LIMIT 50`,
        [userId, `${libro}|${cap}|%`],
      );
      res.setHeader("Cache-Control", "no-store");
      res.json(
        rows.map((r: any) => ({
          ...resumenDe(r),
          versiculos: (r.citas as string[]).filter((c) => c.startsWith(`${libro}|${cap}|`)).map((c) => {
            const [, , desde, hasta] = c.split("|").map(Number);
            return { desde, hasta };
          }),
        })),
      );
    } catch (err) {
      error500(res, "biblia", err);
    }
  });
}
