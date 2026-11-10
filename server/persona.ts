/**
 * Una persona, una casa (Jerusalén en línea): lo que es de la persona lo guarda su primer personaje
 * (el «titular»): la casa con su alfolí, su huerto, su horno, sus adornos y sus muebles puestos, el
 * gozo, las semillas, el armario y los muebles del arcón. Con cualquiera de sus personajes se juega
 * con la misma casa y la misma economía. La ropa puesta, el mérito, los cargos y los encargos siguen
 * siendo de cada personaje (cada camino tiene lo suyo).
 *
 * La primera vez que se ve a una persona se juntan en el titular las cosas que sus personajes tuvieran
 * por separado (en una transacción; después ya no queda nada que juntar).
 */
import { pool } from "./db";
import { JERUSALEN_JUEGO } from "@shared/jerusalen";

const listas = (v: unknown): string[] => (Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : []);
const objeto = (v: unknown): Record<string, unknown> => (v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : {});
function conteos(v: unknown): Record<string, number> {
  const out: Record<string, number> = {};
  for (const [k, n] of Object.entries(objeto(v))) {
    const x = Number(n);
    if (Number.isFinite(x) && x > 0) out[k] = x;
  }
  return out;
}
function sumar(a: Record<string, number>, b: Record<string, number>): Record<string, number> {
  const out = { ...a };
  for (const [k, n] of Object.entries(b)) out[k] = (out[k] || 0) + n;
  return out;
}

const fusionadas = new Set<number>();

/** Junta en el titular (una vez) lo que cada personaje de la persona tuviera por separado. */
export async function fusionarPersona(userId: number, titular: number): Promise<void> {
  if (fusionadas.has(userId)) return;
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const { rows: chars } = await client.query(
      `SELECT id, gozo, semillas, armario, muebles FROM game_characters WHERE user_id = $1 AND game = $2 ORDER BY id FOR UPDATE`,
      [userId, JERUSALEN_JUEGO],
    );
    const ids = chars.map((c) => Number(c.id));
    const otros = chars.filter((c) => Number(c.id) !== titular);
    const otrosIds = otros.map((c) => Number(c.id));
    if (otros.length) {
      // el gozo, las semillas, el armario y los muebles del arcón
      const hay = otros.some((c) => Number(c.gozo) > 0 || Object.keys(conteos(c.semillas)).length || listas(c.armario).length || Object.keys(conteos(c.muebles)).length);
      if (hay) {
        const t = chars.find((c) => Number(c.id) === titular);
        let gozo = Number(t?.gozo || 0);
        let semillas = conteos(t?.semillas);
        let muebles = conteos(t?.muebles);
        const armario = new Set(listas(t?.armario));
        for (const o of otros) {
          gozo += Math.max(0, Number(o.gozo || 0));
          semillas = sumar(semillas, conteos(o.semillas));
          muebles = sumar(muebles, conteos(o.muebles));
          for (const a of listas(o.armario)) armario.add(a);
        }
        await client.query(`UPDATE game_characters SET gozo = $2, semillas = $3::jsonb, armario = $4::jsonb, muebles = $5::jsonb WHERE id = $1`, [
          titular, gozo, JSON.stringify(semillas), JSON.stringify([...armario]), JSON.stringify(muebles),
        ]);
        await client.query(`UPDATE game_characters SET gozo = 0, semillas = '{}'::jsonb, armario = '[]'::jsonb, muebles = '{}'::jsonb WHERE id = ANY($1::int[])`, [otrosIds]);
      }

      // las casas: queda una (la del titular o, si no tenía, la más crecida) y se le suma lo de las otras
      const { rows: casas } = await client.query(`SELECT * FROM game_houses WHERE character_id = ANY($1::int[]) FOR UPDATE`, [ids]);
      let principal = casas.find((h) => Number(h.character_id) === titular);
      let resto = casas.filter((h) => Number(h.character_id) !== titular);
      if (!principal && resto.length) {
        resto.sort((a, b) => Number(b.level) - Number(a.level) || Number(b.offered) - Number(a.offered));
        principal = resto[0];
        resto = resto.slice(1);
        await client.query(`UPDATE game_houses SET character_id = $1 WHERE character_id = $2`, [titular, Number(principal.character_id)]);
      }
      if (principal && resto.length) {
        let bienes = conteos(principal.goods);
        let ofrecido = Number(principal.offered || 0);
        let nivel = Number(principal.level || 0);
        const pp = objeto(principal.preparadas);
        let tortas = Number(pp.tortas) || 0;
        let aceitePuro = Number(pp.aceitePuro) || 0;
        let horno = pp.horno ?? null;
        const adornos = listas(principal.adornos);
        let letrero = (principal.letrero as string | null) ?? null;
        let tieneLetrero = principal.tiene_letrero === true;
        let siervos = listas(principal.servants);
        for (const h of resto) {
          bienes = sumar(bienes, conteos(h.goods));
          ofrecido += Number(h.offered || 0);
          nivel = Math.max(nivel, Number(h.level || 0));
          const hp = objeto(h.preparadas);
          tortas += Number(hp.tortas) || 0;
          aceitePuro += Number(hp.aceitePuro) || 0;
          if (!horno && hp.horno) horno = hp.horno;
          for (const a of listas(h.adornos)) if (!adornos.includes(a)) adornos.push(a);
          if (!letrero && h.letrero) letrero = String(h.letrero);
          tieneLetrero = tieneLetrero || h.tiene_letrero === true;
          if (!siervos.length) siervos = listas(h.servants);
          await client.query(`DELETE FROM game_houses WHERE character_id = $1`, [Number(h.character_id)]);
        }
        await client.query(
          `UPDATE game_houses SET goods = $2::jsonb, offered = $3, level = $4, preparadas = $5::jsonb, adornos = $6::jsonb, letrero = $7, tiene_letrero = $8,
                  servants = $9::jsonb, updated_at = now()
            WHERE character_id = $1`,
          [titular, JSON.stringify(bienes), ofrecido, nivel, JSON.stringify(horno ? { tortas, aceitePuro, horno } : { tortas, aceitePuro }), JSON.stringify(adornos.slice(0, 8)), letrero, tieneLetrero, JSON.stringify(siervos)],
        );
      }

      // las bendiciones recibidas pasan a la casa que queda
      await client.query(
        `INSERT INTO game_house_blessings (house_character_id, visitor_user_id, day_key, created_at)
         SELECT $1, visitor_user_id, day_key, created_at FROM game_house_blessings WHERE house_character_id = ANY($2::int[])
         ON CONFLICT DO NOTHING`,
        [titular, otrosIds],
      );
      await client.query(`DELETE FROM game_house_blessings WHERE house_character_id = ANY($1::int[])`, [otrosIds]);
      // los puestos abiertos de los otros personajes pasan al titular (la venta llega a la misma casa)
      await client.query(`UPDATE game_market_listings SET seller_character_id = $1 WHERE seller_character_id = ANY($2::int[]) AND closed_at IS NULL`, [titular, otrosIds]);
      // los pedidos del barrio abiertos también (si el titular ya pidió ese día, el otro se cierra)
      await client.query(
        `UPDATE game_help_requests r SET character_id = $1
          WHERE r.character_id = ANY($2::int[]) AND r.done_at IS NULL
            AND NOT EXISTS (SELECT 1 FROM game_help_requests r2 WHERE r2.character_id = $1 AND r2.day_key = r.day_key)`,
        [titular, otrosIds],
      );
      await client.query(`UPDATE game_help_requests SET done_at = now() WHERE character_id = ANY($1::int[]) AND done_at IS NULL`, [otrosIds]);
      // una reunión abierta en otra casa termina (esa casa ya no está)
      await client.query(`UPDATE game_house_meetings SET ends_at = now() WHERE host_character_id = ANY($1::int[]) AND ends_at > now()`, [otrosIds]);
    }
    await client.query("COMMIT");
    fusionadas.add(userId);
    if (fusionadas.size > 20000) fusionadas.clear();
  } catch (err) {
    await client.query("ROLLBACK").catch(() => undefined);
    throw err;
  } finally {
    client.release();
  }
}
