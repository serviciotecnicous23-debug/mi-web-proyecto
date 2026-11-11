/**
 * La gran restauración (shared/restauracion.ts): las salas en ruinas de la escuela, el palacio y la cámara, por persona
 * (su titular). Cada trabajo se hace parado en su círculo unos segundos dentro del edificio; el servidor comprueba que
 * la persona esté en el edificio (su lugar en la ciudad, junto a la puerta), el orden de las salas y el tiempo entre un
 * trabajo y otro. Al terminar una sala: gozo, mérito y su sello. Después, lo de cada día en esa sala. Nada se simula.
 */
import type { Express, Request, Response } from "express";
import { pool } from "./db";
import { diaClave, enFila, evento, filaMerito, forgetJer, personajeDe, temporadaDe, type PersonajeFila } from "./jerusalen";
import { sumarGozo } from "./gozo";
import { ubicacionDe } from "./ciudad-red";
import { aportarAlCapitulo } from "./capitulos";
import { anotarCamino } from "./camino-dia";
import {
  CERCA_EDIFICIO, EDIFICIO_DE_CAMINO, GOZO_DIARIO, GOZO_PRIMERA, GOZO_TRABAJO, MARGEN_TRABAJO, PUERTA_EDIFICIO, SALAS, lecturaDelDia, salaDef, salasDe,
  type DiarioRespuesta, type RestauracionVista, type SalaDef, type TrabajoRespuesta,
} from "@shared/restauracion";
import type { MisionCumplida } from "@shared/misiones";

export const RESTAURACION_SQL = `
CREATE TABLE IF NOT EXISTS "game_restauracion" (
  "titular" integer NOT NULL REFERENCES "game_characters"("id") ON DELETE CASCADE,
  "sala" text NOT NULL,
  "progreso" jsonb NOT NULL DEFAULT '{}'::jsonb,
  "done_at" timestamp,
  "ultimo_at" timestamp,
  "diario" text,
  PRIMARY KEY ("titular", "sala")
);`;

const NOMBRE_EDIFICIO: Record<SalaDef["edificio"], string> = { escuela: "la escuela de los profetas", palacio: "el palacio del rey", camara: "la cámara de los sacerdotes" };

type Fila = { sala: string; progreso: Record<string, number>; done_at: unknown; diario: string | null };

async function filasDe(titular: number): Promise<Map<string, Fila>> {
  const { rows } = await pool.query(`SELECT sala, progreso, done_at, diario FROM game_restauracion WHERE titular = $1`, [titular]);
  return new Map(rows.map((r) => [String(r.sala), { sala: String(r.sala), progreso: (r.progreso as Record<string, number>) ?? {}, done_at: r.done_at, diario: r.diario ?? null }]));
}

function vista(filas: Map<string, Fila>): RestauracionVista {
  const hoy = diaClave();
  const salas = SALAS.map((s) => {
    const f = filas.get(s.id);
    const anterior = s.orden > 1 ? salasDe(s.edificio).find((x) => x.orden === s.orden - 1) : undefined;
    return {
      id: s.id,
      progreso: Object.fromEntries(s.trabajos.map((t) => [t.id, Math.min(t.veces, Number(f?.progreso?.[t.id] ?? 0))])),
      hecha: !!f?.done_at,
      abierta: !anterior || !!filas.get(anterior.id)?.done_at,
      diarioHoy: f?.diario === hoy,
    };
  });
  return { salas, hechas: salas.filter((s) => s.hecha).length, total: salas.length };
}

export async function vistaRestauracion(titular: number): Promise<RestauracionVista> {
  return vista(await filasDe(titular));
}

async function sumarMerito(personajeId: number, n: number) {
  const t = temporadaDe();
  await filaMerito(personajeId, t.n, diaClave());
  await pool.query(`UPDATE game_season_merit SET merit = merit + $3, updated_at = now() WHERE character_id = $1 AND season = $2`, [personajeId, t.n, n]);
}

/** ¿Está la persona en ese edificio? (su lugar en la ciudad sigue junto a la puerta mientras está adentro) */
function enElEdificio(ch: PersonajeFila, s: SalaDef): string | null {
  const yo = ubicacionDe(ch.id);
  const nombre = NOMBRE_EDIFICIO[s.edificio];
  if (!yo) return `Entra a ${nombre} desde la ciudad para trabajar en ${s.nombre.toLowerCase()}.`;
  const [px, pz] = PUERTA_EDIFICIO[s.edificio];
  if (Math.hypot(yo.x - px, yo.z - pz) > CERCA_EDIFICIO) return `Entra a ${nombre} para trabajar en ${s.nombre.toLowerCase()}.`;
  return null;
}

export function registerRestauracionRoutes(app: Express) {
  async function persona(req: Request, res: Response) {
    if (!req.isAuthenticated()) {
      res.sendStatus(401);
      return null;
    }
    if (!req.user!.isActive) {
      res.status(403).json({ message: "Tu cuenta debe estar aprobada para jugar en línea." });
      return null;
    }
    const ch = await personajeDe(req.user!.id);
    if (!ch) {
      res.status(404).json({ message: "Primero crea tu personaje." });
      return null;
    }
    return ch;
  }

  app.get("/api/jerusalen/restauracion", async (req: Request, res: Response) => {
    try {
      const ch = await persona(req, res);
      if (!ch) return;
      res.setHeader("Cache-Control", "no-store");
      res.json({ vista: await vistaRestauracion(ch.casa) });
    } catch (err) {
      console.error("[restauracion] vista:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });

  // Una vez de un trabajo (después de estar parado en su círculo los segundos que pide).
  app.post("/api/jerusalen/restauracion/trabajo", async (req: Request, res: Response) => {
    try {
      const ch = await persona(req, res);
      if (!ch) return;
      const s = typeof req.body?.sala === "string" ? salaDef(req.body.sala) : undefined;
      const t = s && typeof req.body?.trabajo === "string" ? s.trabajos.find((x) => x.id === req.body.trabajo) : undefined;
      if (!s || !t) return res.status(400).json({ message: "Ese trabajo no existe." });
      const fuera = enElEdificio(ch, s);
      if (fuera) return res.status(409).json({ message: fuera });
      const out = await enFila(ch.casa, async () => {
        const filas = await filasDe(ch.casa);
        const v = vista(filas).salas.find((x) => x.id === s.id)!;
        if (v.hecha) return { error: 409, message: `${s.nombre} ya está restaurada.` };
        if (!v.abierta) {
          const anterior = salasDe(s.edificio).find((x) => x.orden === s.orden - 1)!;
          return { error: 409, message: `Primero hay que restaurar ${anterior.nombre.toLowerCase()}.` };
        }
        if ((v.progreso[t.id] ?? 0) >= t.veces) return { error: 409, message: `«${t.nombre}» ya está hecho: sigue con otro trabajo de la sala.` };
        // un trabajo a la vez: entre uno y otro, el tiempo que pide (con un margen por la red)
        const { rows: ul } = await pool.query(`SELECT EXTRACT(EPOCH FROM now() - MAX(ultimo_at))::float AS desde FROM game_restauracion WHERE titular = $1`, [ch.casa]);
        const desde = ul[0]?.desde == null ? null : Number(ul[0].desde);
        if (desde !== null && desde < t.segundos - MARGEN_TRABAJO) return { error: 429, message: `Ese trabajo toma ${t.segundos} segundos: quédate en el círculo.` };
        const progreso = { ...v.progreso, [t.id]: (v.progreso[t.id] ?? 0) + 1 };
        const fin = s.trabajos.every((x) => (progreso[x.id] ?? 0) >= x.veces);
        await pool.query(
          `INSERT INTO game_restauracion (titular, sala, progreso, ultimo_at, done_at) VALUES ($1, $2, $3::jsonb, now(), ${fin ? "now()" : "NULL"})
           ON CONFLICT (titular, sala) DO UPDATE SET progreso = $3::jsonb, ultimo_at = now(), done_at = ${fin ? "now()" : "game_restauracion.done_at"}`,
          [ch.casa, s.id, JSON.stringify(progreso)],
        );
        let gozo = GOZO_TRABAJO;
        const avisos: MisionCumplida[] = [];
        if (fin) {
          // la primera sala del edificio de tu camino: el primer día en Jerusalén
          const primera = s.orden === 1 && EDIFICIO_DE_CAMINO[ch.camino] === s.edificio;
          gozo += s.premio.gozo + (primera ? GOZO_PRIMERA : 0);
          await sumarMerito(ch.id, s.premio.merito);
          avisos.push({ titulo: `${s.icono} ¡Restauraste ${s.nombre.toLowerCase()}!${primera ? " Tu primer día en Jerusalén" : ""}`, premio: s.premio.merito, gozo: s.premio.gozo + (primera ? GOZO_PRIMERA : 0) });
          await evento(ch.user_id, `restauracion:${s.id}`, `restauró ${s.nombre.toLowerCase()} en ${NOMBRE_EDIFICIO[s.edificio]} de Jerusalén en línea`).catch(() => null);
          forgetJer();
        }
        await sumarGozo(ch.casa, gozo);
        return { fin, gozo, avisos };
      });
      if ("error" in out) return res.status(out.error as number).json({ message: out.message });
      // cada trabajo también es servicio: suma a la meta de la ciudad y al camino de hoy
      const capitulo = await aportarAlCapitulo(ch, 1).catch(() => []);
      void anotarCamino(ch.id, "restaurar");
      const { rows: gz } = await pool.query(`SELECT gozo FROM game_characters WHERE id = $1`, [ch.casa]);
      res.json({ vista: await vistaRestauracion(ch.casa), fin: out.fin, gozo: out.gozo, gozoTotal: Number(gz[0]?.gozo ?? 0), avisos: [...out.avisos, ...capitulo] } satisfies TrabajoRespuesta);
    } catch (err) {
      console.error("[restauracion] trabajo:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });

  // Lo de cada día en una sala restaurada: su lectura y un poco de gozo, una vez por día.
  app.post("/api/jerusalen/restauracion/diario", async (req: Request, res: Response) => {
    try {
      const ch = await persona(req, res);
      if (!ch) return;
      const s = typeof req.body?.sala === "string" ? salaDef(req.body.sala) : undefined;
      if (!s) return res.status(400).json({ message: "Esa sala no existe." });
      const fuera = enElEdificio(ch, s);
      if (fuera) return res.status(409).json({ message: fuera });
      const hoy = diaClave();
      const { rows } = await pool.query(
        `UPDATE game_restauracion SET diario = $3 WHERE titular = $1 AND sala = $2 AND done_at IS NOT NULL AND diario IS DISTINCT FROM $3 RETURNING sala`,
        [ch.casa, s.id, hoy],
      );
      if (!rows.length) {
        const f = (await filasDe(ch.casa)).get(s.id);
        return res.status(409).json({ message: f?.done_at ? `Ya hiciste hoy «${s.diario.nombre.toLowerCase()}». Vuelve mañana.` : `Primero hay que restaurar ${s.nombre.toLowerCase()}.` });
      }
      await sumarGozo(ch.casa, GOZO_DIARIO);
      void anotarCamino(ch.id, "aprender");
      const { rows: gz } = await pool.query(`SELECT gozo FROM game_characters WHERE id = $1`, [ch.casa]);
      res.json({ vista: await vistaRestauracion(ch.casa), gozo: GOZO_DIARIO, gozoTotal: Number(gz[0]?.gozo ?? 0), lectura: lecturaDelDia(s, hoy) } satisfies DiarioRespuesta);
    } catch (err) {
      console.error("[restauracion] diario:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });
}
