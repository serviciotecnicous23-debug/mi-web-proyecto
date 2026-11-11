/**
 * El camino de hoy (shared/camino.ts): los cuatro pasos de la persona hoy y el siguiente que falta, con adónde ir; y el
 * cofre del día al cumplirlos. Servir sale del mérito del día (los segundos de servicio de cualquiera de sus
 * personajes); aprender, ayudar y restaurar, de lo que marcan las rutas (server/camino-dia.ts).
 */
import type { Express, Request, Response } from "express";
import { pool } from "./db";
import { diaClave, enFila, personajeDe, temporadaDe, type PersonajeFila } from "./jerusalen";
import { sumarGozo } from "./gozo";
import { avisoDeRacha, marcarServicio } from "./racha";
import { vistaRestauracion } from "./restauracion";
import { JERUSALEN_JUEGO } from "@shared/jerusalen";
import { personajeCiudad, recadoDelDia } from "@shared/personajes";
import { EDIFICIO_DE_CAMINO, SALAS, salasDe, trabajosTotales } from "@shared/restauracion";
import { GOZO_COFRE, ICONO_PASO, SERVIR_SEGUNDOS, TITULO_PASO, type CaminoHoy, type PasoCamino } from "@shared/camino";

const LUGAR_SERVIR = { sacerdocio: "templo", profecia: "escuela", realeza: "palacio" } as const;
const TEXTO_SERVIR = {
  sacerdocio: "Sirve 3 minutos en el templo: el altar, las lámparas, los panes y las ofrendas.",
  profecia: "Sirve 3 minutos como profeta: memoriza con Isaías, ora en el monte o lleva un mensaje.",
  realeza: "Sirve 3 minutos al rey: atiende una audiencia, reparte pan o copia la ley.",
};
const LUGAR_APRENDER = { sacerdocio: "camara", profecia: "escuela", realeza: "palacio" } as const;
const MAESTRO = { sacerdocio: "Eleazar", profecia: "Miqueas", realeza: "Eliaquim" } as const;
const NOMBRE_EDIFICIO = { escuela: "la escuela", palacio: "el palacio", camara: "la cámara de los sacerdotes" } as const;

export async function caminoDeHoy(ch: PersonajeFila): Promise<CaminoHoy> {
  const hoy = diaClave();
  const t = temporadaDe();
  const [{ rows: srv }, { rows: cd }, restauracion, { rows: rc }] = await Promise.all([
    pool.query(
      `SELECT COALESCE(MAX(CASE WHEN gm.day_key = $3 THEN gm.day_seconds ELSE 0 END), 0)::int AS s
         FROM game_season_merit gm JOIN game_characters c ON c.id = gm.character_id
        WHERE c.user_id = $1 AND c.game = $2 AND gm.season = $4`,
      [ch.user_id, JERUSALEN_JUEGO, hoy, t.n],
    ),
    pool.query(`SELECT aprender, ayudar, restaurar, cofre_at FROM game_camino_dia WHERE titular = $1 AND dia = $2`, [ch.casa, hoy]),
    vistaRestauracion(ch.casa),
    pool.query(`SELECT paso, done_at FROM game_recados WHERE titular = $1 AND dia = $2`, [ch.casa, hoy]),
  ]);
  const segundos = Number(srv[0]?.s ?? 0);
  const dia = cd[0] ?? {};
  const camino = ch.camino;

  const servir: PasoCamino = {
    id: "servir",
    icono: ICONO_PASO.servir,
    titulo: TITULO_PASO.servir,
    texto: segundos >= SERVIR_SEGUNDOS ? `Serviste ${Math.floor(segundos / 60)} minutos hoy.` : TEXTO_SERVIR[camino],
    hecho: segundos >= SERVIR_SEGUNDOS,
    progreso: { valor: Math.min(SERVIR_SEGUNDOS, segundos), meta: SERVIR_SEGUNDOS },
    ir: { lugar: LUGAR_SERVIR[camino] },
  };
  const aprender: PasoCamino = {
    id: "aprender",
    icono: ICONO_PASO.aprender,
    titulo: TITULO_PASO.aprender,
    texto: dia.aprender ? "Aprendiste algo hoy." : `Aprende algo: una lección con ${MAESTRO[camino]}, un estudio, la lectura de una sala restaurada o «¿Quién es sabio?».`,
    hecho: !!dia.aprender,
    ir: { lugar: LUGAR_APRENDER[camino] },
  };
  // ayudar: el recado de hoy (o cualquier ayuda a un vecino o al pueblo)
  const recado = recadoDelDia(hoy, ch.casa);
  const paso = Number(rc[0]?.paso ?? 0);
  const recadoHecho = !!rc[0]?.done_at;
  const toca = personajeCiudad(recado.cadena[Math.min(2, paso)]);
  const ayudar: PasoCamino = {
    id: "ayudar",
    icono: ICONO_PASO.ayudar,
    titulo: TITULO_PASO.ayudar,
    texto:
      dia.ayudar || recadoHecho
        ? "Ayudaste a alguien hoy."
        : paso === 0
          ? `${toca?.nombre ?? "Un siervo"} tiene un recado para ti: «${recado.titulo}». O ayuda a un vecino o a una familia del pueblo.`
          : `Lleva ${recado.lleva[paso - 1]} a ${toca?.nombre ?? "su casa"} (paso ${paso + 1} de 3).`,
    hecho: !!dia.ayudar || recadoHecho,
    ir: toca ? { personaje: toca.id } : { lugar: "siervos" },
  };
  // restaurar: la siguiente sala abierta (primero las del edificio de tu camino)
  const propio = EDIFICIO_DE_CAMINO[camino];
  const orden = [...salasDe(propio), ...SALAS.filter((s) => s.edificio !== propio)];
  const siguienteSala = orden.find((s) => {
    const v = restauracion.salas.find((x) => x.id === s.id);
    return v && !v.hecha && v.abierta;
  });
  const todoRestaurado = restauracion.hechas >= restauracion.total;
  const vs = siguienteSala ? restauracion.salas.find((x) => x.id === siguienteSala.id)! : null;
  const hechosSala = vs ? Object.values(vs.progreso).reduce((a, b) => a + b, 0) : 0;
  const restaurar: PasoCamino = {
    id: "restaurar",
    icono: ICONO_PASO.restaurar,
    titulo: TITULO_PASO.restaurar,
    texto: todoRestaurado
      ? "Restauraste todas las salas: ¡Jerusalén te lo agradece!"
      : dia.restaurar
        ? "Trabajaste hoy en la restauración."
        : siguienteSala
          ? `Restaura «${siguienteSala.nombre}» en ${NOMBRE_EDIFICIO[siguienteSala.edificio]}: ${hechosSala} de ${trabajosTotales(siguienteSala)} trabajos.`
          : "Restaura una sala de un edificio.",
    hecho: !!dia.restaurar || todoRestaurado,
    progreso: siguienteSala ? { valor: hechosSala, meta: trabajosTotales(siguienteSala) } : undefined,
    ir: siguienteSala ? { edificio: siguienteSala.edificio } : null,
  };
  const pasos = [servir, aprender, ayudar, restaurar];
  const hechos = pasos.filter((p) => p.hecho).length;
  return {
    dia: hoy,
    pasos,
    hechos,
    cofre: { listo: hechos === pasos.length && !dia.cofre_at, recibido: !!dia.cofre_at, gozo: GOZO_COFRE },
    siguiente: pasos.find((p) => !p.hecho) ?? null,
  };
}

export function registerCaminoRoutes(app: Express) {
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

  app.get("/api/jerusalen/camino-hoy", async (req: Request, res: Response) => {
    try {
      const ch = await persona(req, res);
      if (!ch) return;
      res.setHeader("Cache-Control", "no-store");
      res.json(await caminoDeHoy(ch));
    } catch (err) {
      console.error("[camino] hoy:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });

  // El cofre del día: al cumplir los cuatro pasos, una vez por día (también cuenta para la racha).
  app.post("/api/jerusalen/camino-hoy/cofre", async (req: Request, res: Response) => {
    try {
      const ch = await persona(req, res);
      if (!ch) return;
      const out = await enFila(ch.casa, async () => {
        const c = await caminoDeHoy(ch);
        if (c.cofre.recibido) return { error: 409, message: "Ya abriste el cofre de hoy. Mañana habrá otro camino." };
        if (!c.cofre.listo) return { error: 409, message: `Te faltan ${c.pasos.length - c.hechos} pasos del camino de hoy.` };
        const { rows } = await pool.query(
          `INSERT INTO game_camino_dia (titular, dia, cofre_at) VALUES ($1, $2, now())
           ON CONFLICT (titular, dia) DO UPDATE SET cofre_at = now() WHERE game_camino_dia.cofre_at IS NULL RETURNING titular`,
          [ch.casa, c.dia],
        );
        if (!rows.length) return { error: 409, message: "Ya abriste el cofre de hoy." };
        await sumarGozo(ch.casa, GOZO_COFRE);
        const racha = await marcarServicio(ch.id);
        return { racha };
      });
      if ("error" in out) return res.status(out.error as number).json({ message: out.message });
      const { rows: gz } = await pool.query(`SELECT gozo FROM game_characters WHERE id = $1`, [ch.casa]);
      res.json({ camino: await caminoDeHoy(ch), gozo: GOZO_COFRE, gozoTotal: Number(gz[0]?.gozo ?? 0), racha: out.racha ? avisoDeRacha(out.racha) : null });
    } catch (err) {
      console.error("[camino] cofre:", err);
      if (!res.headersSent) res.sendStatus(500);
    }
  });
}
