/**
 * Los muebles que se usan en la casa por dentro (shared/casa-interior.ts, la casa viva): descansar en el lecho, cocinar
 * un guiso en el fogón (para el banquete de hoy) y leer el rollo del día. Sentarse lo hace la pantalla (no da nada).
 * - `POST /api/jerusalen/casa/usar` con `{ uso }`: el mueble tiene que estar puesto en la casa, una vez por día cada uso.
 * - Lo usado hoy se guarda en la labranza de la casa (`game_houses.labranza.usos`, shared/huerto.ts).
 */
import type { Express, Request, Response } from "express";
import { pool } from "./db";
import { USOS_CASA, leerInterior, muebleBase, rolloDelDia, type UsoRespuesta, type UsosDeHoy } from "@shared/casa-interior";
import { leerLabranza } from "@shared/huerto";
import { enFilaCasa, leerBienes, recoger } from "./ciudad";
import { sumarGozo } from "./gozo";
import { diaClave, type PersonajeFila } from "./jerusalen";

/** Qué mueble hace falta para cada uso (las piezas finas valen como el suyo). */
const PIDE: Record<keyof typeof USOS_CASA, string[]> = { descansar: ["lecho", "lecho-cobertor"], cocinar: ["fogon"], leer: ["estante"] };
const NOMBRE: Record<keyof typeof USOS_CASA, string> = { descansar: "un lecho", cocinar: "el fogón de piedras", leer: "el estante de rollos" };
const YA_HOY: Record<keyof typeof USOS_CASA, string> = {
  descansar: "Hoy ya descansaste en tu casa: vuelve mañana.",
  cocinar: "Hoy ya cocinaste el guiso: vuelve mañana.",
  leer: "Hoy ya leíste el rollo: mañana trae otro versículo.",
};

/** Lo que ya se usó hoy (para la pantalla), desde la columna `labranza`. */
export function usosDeHoy(labranza: unknown, dia = diaClave()): UsosDeHoy {
  const u = leerLabranza(labranza).usos;
  const hechos = u.dia === dia ? u.hechos : [];
  return { descansar: hechos.includes("descansar"), cocinar: hechos.includes("cocinar"), leer: hechos.includes("leer") };
}

/** ¿El anfitrión cocinó hoy el guiso en su fogón? (los invitados de su banquete ganan un poco más). */
export async function guisoDeHoy(casa: number): Promise<boolean> {
  const { rows } = await pool.query(`SELECT labranza FROM game_houses WHERE character_id = $1`, [casa]);
  return rows[0] ? usosDeHoy(rows[0].labranza).cocinar : false;
}

export function registerCasaUsarRoutes(app: Express, deps: { jugador: (req: Request, res: Response) => Promise<PersonajeFila | null> }) {
  const ultimo = new Map<number, number>();
  app.post("/api/jerusalen/casa/usar", async (req: Request, res: Response) => {
    const uso = req.body?.uso as keyof typeof USOS_CASA;
    if (uso !== "descansar" && uso !== "cocinar" && uso !== "leer") return res.status(400).json({ message: "Elige qué hacer." });
    try {
      const ch = await deps.jugador(req, res);
      if (!ch) return;
      const ahora = Date.now();
      if (ahora - (ultimo.get(ch.casa) || 0) < 1000) return res.status(429).json({ message: "Espera un momento" });
      ultimo.set(ch.casa, ahora);
      if (ultimo.size > 5000) ultimo.clear();
      if (uso === "cocinar") await recoger(ch.casa);
      const dia = diaClave();
      const out = await enFilaCasa(ch.casa, async (): Promise<{ status: number; message?: string }> => {
        const { rows } = await pool.query(`SELECT interior, goods, labranza FROM game_houses WHERE character_id = $1`, [ch.casa]);
        if (!rows[0]) return { status: 409, message: "Primero entra a la ciudad: allí está tu casa." };
        const puestos = new Set(leerInterior(rows[0].interior).map((c) => muebleBase(c.m)));
        if (!PIDE[uso].some((m) => puestos.has(m))) return { status: 409, message: `Para eso hace falta ${NOMBRE[uso]} puesto en tu casa: cómpralo al alfarero y ponlo con «Remodelar».` };
        const lab = leerLabranza(rows[0].labranza);
        const hechos = lab.usos.dia === dia ? lab.usos.hechos : [];
        if (hechos.includes(uso)) return { status: 409, message: YA_HOY[uso] };
        lab.usos = { dia, hechos: [...hechos, uso] };
        if (uso === "cocinar") {
          const b = leerBienes(rows[0].goods);
          const c = USOS_CASA.cocinar;
          if (Math.floor(b.harina) < c.harina || Math.floor(b.aceite) < c.aceite)
            return { status: 409, message: `Para el guiso hacen falta ${c.harina} de flor de harina y ${c.aceite} de aceite en tu alfolí: cosecha tu huerto.` };
          b.harina -= c.harina;
          b.aceite -= c.aceite;
          await pool.query(`UPDATE game_houses SET labranza = $2::jsonb, goods = $3::jsonb WHERE character_id = $1`, [ch.casa, JSON.stringify(lab), JSON.stringify(b)]);
        } else await pool.query(`UPDATE game_houses SET labranza = $2::jsonb WHERE character_id = $1`, [ch.casa, JSON.stringify(lab)]);
        return { status: 200 };
      });
      if (out.status !== 200) return res.status(out.status).json({ message: out.message });
      const gozo = USOS_CASA[uso].gozo;
      await sumarGozo(ch.casa, gozo, `casa-${uso}`);
      const { rows: g } = await pool.query(`SELECT gozo FROM game_characters WHERE id = $1`, [ch.casa]);
      const r: UsoRespuesta = {
        uso,
        gozo,
        gozoTotal: Number(g[0]?.gozo || 0),
        verso: uso === "leer" ? rolloDelDia(dia) : USOS_CASA[uso].verso,
        yaHoy: false,
        ...(uso === "cocinar" ? { guiso: true } : {}),
      };
      res.json(r);
    } catch (err) {
      console.error("[casa] usar:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });
}
