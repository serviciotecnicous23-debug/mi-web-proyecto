// GET /api/carro/catalogo — lo que se escucha en el carro (CarPlay y Android Auto) desde la app del ministerio
// (app-movil/, complemento «Carro»). La app lo pide con la sesión del teléfono (las galletas de su página), así que a
// cada persona le llegan sus lecciones, con las mismas reglas que la página de la lección (server/academia.ts):
// la primera lección de cada materia del Nivel 1 es pública; las demás piden la inscripción en la academia y en la
// materia; la Dirección académica y los profesores las ven todas. El armado está en server/carro-catalogo.ts.
import type { Express, Request, Response } from "express";
import { puedeRevisar } from "@shared/academia";
import { resolveSiteUrl } from "@shared/site";
import { pool } from "./db";
import { storage } from "./storage";
import { accesoDe, estaInscrito } from "./academia-comun";
import { narracionDe } from "./academia-narracion";
import { catalogoDelCarro, radioDelCarro, type PermisoAcademia } from "./carro-catalogo";

const SITIO = resolveSiteUrl(process.env.SITE_URL);

async function permisoDe(req: Request): Promise<PermisoAcademia> {
  const acceso = await accesoDe(req);
  const base: PermisoAcademia = { abierta: acceso.ver, conSesion: !!acceso.userId, inscrito: false, todas: false, materias: new Set() };
  if (!acceso.ver || !acceso.userId) return base;
  if (puedeRevisar(acceso.role)) return { ...base, inscrito: true, todas: true };
  if (!(await estaInscrito(acceso.userId))) return base;
  const { rows } = await pool.query(`SELECT materia_id FROM academia_materias WHERE user_id = $1`, [acceso.userId]);
  return { ...base, inscrito: true, materias: new Set(rows.map((r: { materia_id: unknown }) => String(r.materia_id))) };
}

export function registerCarroRoutes(app: Express) {
  app.get("/api/carro/catalogo", async (req: Request, res: Response) => {
    try {
      const [academia, predicas] = await Promise.all([
        permisoDe(req),
        storage.listSermons().catch((err) => {
          console.error("[carro] prédicas:", err);
          return [];
        }),
      ]);
      const catalogo = catalogoDelCarro({ sitio: SITIO, radio: radioDelCarro(), academia, predicas, narracion: narracionDe });
      // Depende de la sesión de cada persona: nada de guardarlo en el camino.
      res.setHeader("Cache-Control", "private, no-store");
      res.json(catalogo);
    } catch (err) {
      console.error("[carro] catálogo:", err);
      res.sendStatus(500);
    }
  });
}
