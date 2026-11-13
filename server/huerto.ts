/**
 * El huerto de la casa (shared/huerto.ts): cada tarea del huerto la decide el servidor.
 * - `POST /api/jerusalen/casa/huerto/:accion` con `arar`, `sembrar`, `regar`, `llenar`, `hierbas`, `aves`, `abonar`,
 *   `cosechar` (segar con la hoz: la cosecha queda en gavillas), `granero` (llevar las gavillas al alfolí) y `mejorar`
 *   (una herramienta, con gozo).
 * - El estado de cada surco se guarda en `game_houses.huerto` y lo demás (el agua del cántaro, el pozo del día, las
 *   herramientas, las gavillas, el abono del redil, las tareas del día y los rincones) en `game_houses.labranza`.
 * - El crecimiento, las malas hierbas, las aves y el abono se calculan con las horas al leer: nada corre de fondo.
 * - Topes de ritmo: una tarea a la vez por casa (en su fila) y un mínimo entre tareas del mismo tipo.
 */
import type { Express, Request, Response } from "express";
import { pool } from "./db";
import {
  CANTARO, GOZO_HUERTO, HERRAMIENTAS, HERRAMIENTAS_IDS, POZO, RINCON, SURCO_VACIO, abonoDelRedil, anotarTarea, avesDe, calidadDe, duracion, etapaDe, faltan,
  hierbasDe, leerHuerto, leerLabranza, llovio, misionesDeHoy, rindeDe, vistaMisiones,
  type FuenteAgua, type HerramientaId, type LabranzaGuardada, type LabranzaVista, type MisionHuerto, type SemillaId, type Surco, type TareaHuerto,
} from "@shared/huerto";
import { parcelasHuerto, type Parcela } from "@shared/mercado";
import { capacidadAlfoli } from "@shared/ciudad";
import { diaEnJerusalen } from "@shared/anio";
import { leerOficios } from "@shared/taller";
import { ventajasDeColumna } from "@shared/obras";
import { leerInterior, muebleBase } from "@shared/casa-interior";
import { AYUDA_MUEBLES, DIEZMO, RIEGO } from "@shared/economia";
import { ventajasDeBarrio } from "./barrio-obras";
import { enFilaCasa, leerBienes, olvidarBarrio, recoger } from "./ciudad";
import { anotarGasto, sumarGozo } from "./gozo";
import { alTesoro } from "./economia";
import { diaClave, type PersonajeFila } from "./jerusalen";

export const HUERTO_SQL = `ALTER TABLE "game_houses" ADD COLUMN IF NOT EXISTS "labranza" jsonb NOT NULL DEFAULT '{}'::jsonb;`;

/** Lo de la casa que hace falta para el huerto (una fila de `game_houses`). */
export type FilaHuerto = { level: unknown; huerto: unknown; goods: unknown; obras: unknown; barrio: unknown; oficios: unknown; labranza: unknown; interior: unknown };
export const COLUMNAS_HUERTO = "level, huerto, goods, obras, barrio, oficios, labranza, interior";

/** Los muebles útiles puestos dentro de la casa (el molino, las vasijas y la tinaja). */
function utilesDe(interior: unknown): Set<string> {
  return new Set(leerInterior(interior).map((c) => muebleBase(c.m)).filter((m) => m in AYUDA_MUEBLES));
}

/** Lo que dice cada surco a la pantalla: su etapa, sus hierbas, sus aves, sus estrellas y cuánto le falta. */
export function vistaSurco(p: Surco, azada: number, ahora = Date.now()): Parcela {
  const f = faltan(p, ahora);
  const lluvia = !p.regado && llovio(p);
  const total = Math.round(duracion(p));
  const aves = avesDe(p, ahora);
  const h = hierbasDe(p, azada, ahora);
  return {
    semilla: p.semilla,
    plantado: p.plantado,
    regado: p.regado || lluvia,
    listo: !!p.semilla && f === 0,
    faltan: f,
    ...(lluvia ? { lluvia: true } : {}),
    ...(p.cisterna && !lluvia ? { cisterna: true } : {}),
    arado: !!p.arado || !!p.semilla,
    etapa: p.semilla ? etapaDe(total > 0 ? 1 - f / total : 1) : 0,
    total,
    hierbas: h.n,
    hierbaEn: h.proxima,
    aves: aves.ahora,
    avesEn: aves.llegan,
    avesHasta: aves.quedan,
    comidas: aves.comidas,
    abono: !!p.abono,
    estrellas: calidadDe(p, azada, ahora).estrellas,
  };
}

type Contexto = {
  nivel: number;
  barrio: number;
  surcos: Surco[];
  lab: LabranzaGuardada;
  bienes: ReturnType<typeof leerBienes>;
  cap: number;
  cisterna: boolean;
  granero: boolean;
  ensanchado: boolean;
  pozoBarrio: boolean;
  ritmo: number;
  ovejas: number;
  utiles: Set<string>;
};

async function contextoDe(h: FilaHuerto): Promise<Contexto> {
  const nivel = Number(h.level || 0);
  const v = ventajasDeColumna(h.obras);
  const barrio = Number(h.barrio || 0);
  const vb = await ventajasDeBarrio(barrio);
  return {
    nivel,
    barrio,
    surcos: leerHuerto(h.huerto, parcelasHuerto(nivel) + v.parcelas),
    lab: leerLabranza(h.labranza),
    bienes: leerBienes(h.goods),
    cap: capacidadAlfoli(nivel) + v.alfoli + vb.alfoli,
    cisterna: v.cisterna,
    granero: v.alfoli > 0,
    ensanchado: v.parcelas > 0,
    pozoBarrio: vb.ritmo < 1,
    ritmo: vb.ritmo,
    ovejas: leerOficios(h.oficios).redil.ovejas,
    utiles: utilesDe(h.interior),
  };
}

function fuenteDe(c: Contexto): FuenteAgua {
  return c.cisterna ? "cisterna" : c.pozoBarrio ? "pozo-barrio" : "pozo";
}

/** Cuántos cántaros se pueden sacar hoy (null: sin tope, con la cisterna o si llueve). */
function topePozo(c: Contexto, llueve: boolean): number | null {
  if (c.cisterna || llueve) return null;
  return c.pozoBarrio ? POZO.conPozoDelBarrio : POZO.dia;
}

/** El huerto para la pantalla (va dentro del estado del mercado). */
export async function vistaDelHuerto(h: FilaHuerto, casa: number, ahora = Date.now()): Promise<{ huerto: Parcela[]; labranza: LabranzaVista }> {
  const c = await contextoDe(h);
  const hoy = diaEnJerusalen(ahora);
  const dia = diaClave();
  const azada = c.lab.herramientas.azada;
  const abono = abonoDelRedil(c.lab.abono, c.ovejas, ahora);
  const m = misionesDeHoy(c.lab, dia, casa, { cisterna: c.cisterna, ovejas: c.ovejas > 0, cultivo: !!hoy.estacion.cultivo, llueve: hoy.llueve });
  return {
    huerto: c.surcos.map((p) => vistaSurco(p, azada, ahora)),
    labranza: {
      agua: c.lab.agua,
      carga: CANTARO[c.lab.herramientas.cantaro],
      fuente: fuenteDe(c),
      pozo: { hoy: c.lab.pozo.dia === dia ? c.lab.pozo.n : 0, max: topePozo(c, hoy.llueve) },
      abono: { hay: abono.hay, tope: 6, proxima: abono.proxima, ovejas: c.ovejas },
      herramientas: c.lab.herramientas,
      gavillas: c.lab.gavillas,
      misiones: vistaMisiones(m),
      todas: m.todas,
      rincones: { hoy: c.lab.rincones.dia === dia ? c.lab.rincones.n : 0, max: RINCON.dia },
      libre: { harina: Math.max(0, Math.floor(c.cap - c.bienes.harina)), aceite: Math.max(0, Math.floor(c.cap - c.bienes.aceite)) },
      granero: c.granero,
      ensanchado: c.ensanchado,
      llueve: hoy.llueve,
    },
  };
}

// ---------------------------------------------------------------- las rutas
/** El mínimo entre dos tareas del mismo tipo de una casa (el gesto de cada una tarda más que esto). */
const RITMO_MS: Record<string, number> = { arar: 1200, sembrar: 1000, regar: 1000, llenar: 1200, hierbas: 700, aves: 700, abonar: 1000, cosechar: 1200, granero: 800, mejorar: 1000 };
const ACCIONES = Object.keys(RITMO_MS);

type Resultado = {
  status: number;
  message?: string;
  extra?: Record<string, unknown>;
  /** gozo que se gana (tareas del día y rincones) */
  gozo?: number;
  cumplidas?: MisionHuerto[];
  todas?: boolean;
  /** el huertito de la casa cambió en la ciudad */
  ciudad?: boolean;
};

export function registerHuertoRoutes(
  app: Express,
  deps: { jugador: (req: Request, res: Response) => Promise<PersonajeFila | null>; responder: (res: Response, ch: PersonajeFila, extra?: Record<string, unknown>) => Promise<unknown> },
) {
  const ultimo = new Map<string, number>();
  const frenar = (casa: number, accion: string) => {
    const k = `${casa}:${accion}`;
    const ahora = Date.now();
    if (ahora - (ultimo.get(k) || 0) < (RITMO_MS[accion] ?? 800)) return true;
    ultimo.set(k, ahora);
    if (ultimo.size > 20_000) ultimo.clear();
    return false;
  };

  app.post("/api/jerusalen/casa/huerto/:accion", async (req: Request, res: Response) => {
    const accion = String(req.params.accion);
    if (!ACCIONES.includes(accion)) return res.sendStatus(404);
    try {
      const ch = await deps.jugador(req, res);
      if (!ch) return;
      if (frenar(ch.casa, accion)) return res.status(429).json({ message: "Espera un momento: cada tarea lleva su tiempo." });
      // lo que trajeron los siervos llega antes al alfolí (va en su propia fila de la casa)
      if (accion === "granero") await recoger(ch.casa);
      const out = await enFilaCasa(ch.casa, () => hacer(ch, accion, req.body ?? {}));
      if (out.status !== 200) return res.status(out.status).json({ message: out.message });
      let gozo = 0;
      if (out.gozo && out.gozo > 0) {
        await sumarGozo(ch.casa, out.gozo, "huerto");
        gozo = out.gozo;
      }
      await deps.responder(res, ch, {
        ...(out.extra ?? {}),
        ...(gozo ? { gozoHuerto: gozo } : {}),
        ...(out.cumplidas?.length ? { tareasCumplidas: out.cumplidas.map((m) => ({ titulo: m.titulo, icono: m.icono, gozo: GOZO_HUERTO.mision })) } : {}),
        ...(out.todas ? { tareasTodas: GOZO_HUERTO.todas } : {}),
      });
    } catch (err) {
      console.error("[huerto]", accion, err);
      res.sendStatus(500);
    }
  });
}

/** Hace una tarea del huerto (dentro de la fila de la casa: una a la vez). */
async function hacer(ch: PersonajeFila, accion: string, body: Record<string, unknown>): Promise<Resultado> {
  const { rows } = await pool.query(`SELECT ${COLUMNAS_HUERTO} FROM game_houses WHERE character_id = $1`, [ch.casa]);
  if (!rows[0]) return { status: 409, message: "Primero entra a la ciudad: allí está tu casa." };
  const c = await contextoDe(rows[0] as FilaHuerto);
  const ahora = Date.now();
  const ahoraIso = new Date(ahora).toISOString();
  const dia = diaClave();
  const hoy = diaEnJerusalen(ahora);
  const lab = c.lab;
  const m = misionesDeHoy(lab, dia, ch.casa, { cisterna: c.cisterna, ovejas: c.ovejas > 0, cultivo: !!hoy.estacion.cultivo, llueve: hoy.llueve });
  const tareas: [TareaHuerto, number][] = [];
  let gozo = 0;
  let ciudad = false;
  let extra: Record<string, unknown> = {};
  let guardarBienes = false;
  // el abono del redil, al día (se guarda así aunque no se use)
  const ab = abonoDelRedil(lab.abono, c.ovejas, ahora);
  lab.abono = ab.asentado;

  // las tareas de un surco
  const n = Math.floor(Number(body.surco ?? body.parcela));
  const conSurco = ["arar", "sembrar", "regar", "hierbas", "aves", "abonar", "cosechar"].includes(accion);
  if (conSurco && (!Number.isInteger(n) || n < 0 || n >= c.surcos.length)) return { status: 400, message: "Ese surco no existe." };
  const p = conSurco ? c.surcos[n] : SURCO_VACIO;
  const azada = lab.herramientas.azada;

  switch (accion) {
    case "arar": {
      if (p.semilla) return { status: 409, message: "Ese surco ya está sembrado." };
      if (p.arado) return { status: 409, message: "Ese surco ya está arado: siémbralo." };
      c.surcos[n] = { ...SURCO_VACIO, arado: ahoraIso };
      tareas.push(["arar", 1]);
      break;
    }
    case "sembrar": {
      const s = body.semilla;
      if (s !== "trigo" && s !== "cebada" && s !== "olivo") return { status: 400, message: "Elige una semilla." };
      if (p.semilla) return { status: 409, message: "Ese surco ya está sembrado." };
      if (!p.arado) return { status: 409, message: "Primero ara el surco con la azada." };
      const { rows: gasto } = await pool.query(
        `UPDATE game_characters SET semillas = jsonb_set(semillas, ARRAY[$2::text], to_jsonb(COALESCE((semillas->>$2)::int, 0) - 1))
          WHERE id = $1 AND COALESCE((semillas->>$2)::int, 0) > 0 RETURNING 1`,
        [ch.casa, s],
      );
      if (!gasto.length) return { status: 409, message: "No te quedan semillas de esas: cómpralas al sembrador del mercado." };
      let nuevo: Surco = { semilla: s as SemillaId, plantado: ahoraIso, regado: false, arado: p.arado };
      // con la cisterna de la casa (shared/obras.ts), lo que se siembra queda regado
      if (c.cisterna) nuevo = { ...nuevo, regado: true, riego: c.utiles.has("tinaja") ? RIEGO.conTinaja : RIEGO.normal, cisterna: true };
      // con el pozo del barrio, lo sembrado crece más rápido
      if (c.ritmo < 1) nuevo = { ...nuevo, ritmo: c.ritmo };
      c.surcos[n] = nuevo;
      tareas.push(["sembrar", 1]);
      if (hoy.estacion.cultivo === s) tareas.push(["tiempo", 1]);
      ciudad = true;
      break;
    }
    case "regar": {
      if (!p.semilla) return { status: 409, message: "Primero siembra." };
      if (p.regado) return { status: 409, message: p.cisterna ? "La cisterna ya la regó." : "Ya la regaste." };
      if (llovio(p)) return { status: 409, message: "La lluvia ya la regó." };
      if (faltan(p, ahora) === 0) return { status: 409, message: "Ya está lista: siégala." };
      if (lab.agua < 1) return { status: 409, message: "Tu cántaro está vacío: llénalo en el pozo." };
      lab.agua -= 1;
      c.surcos[n] = { ...p, regado: true, riego: c.utiles.has("tinaja") ? RIEGO.conTinaja : RIEGO.normal };
      tareas.push(["regar", 1]);
      break;
    }
    case "llenar": {
      const carga = CANTARO[lab.herramientas.cantaro];
      if (lab.agua >= carga) return { status: 409, message: "Tu cántaro ya está lleno." };
      const tope = topePozo(c, hoy.llueve);
      const sacados = lab.pozo.dia === dia ? lab.pozo.n : 0;
      if (tope !== null && sacados >= tope) return { status: 409, message: `Por hoy ya sacaste ${tope} cántaros del pozo: mañana hay más. Con una cisterna en tu casa no hay tope.` };
      lab.agua = carga;
      lab.pozo = { dia, n: sacados + 1 };
      tareas.push(["llenar", 1]);
      break;
    }
    case "hierbas": {
      if (!p.semilla) return { status: 409, message: "En ese surco no hay nada sembrado." };
      const h = hierbasDe(p, azada, ahora);
      if (h.n < 1) return { status: 409, message: "Ese surco está limpio: no hay malas hierbas." };
      c.surcos[n] = { ...p, limpio: ahoraIso };
      tareas.push(["hierbas", h.n]);
      extra = { quitadas: h.n };
      break;
    }
    case "aves": {
      if (!p.semilla) return { status: 409, message: "En ese surco no hay nada sembrado." };
      const a = avesDe(p, ahora);
      if (!a.ahora || !a.cual) return { status: 409, message: "No hay aves en ese surco." };
      c.surcos[n] = { ...p, aves: [...new Set([...(p.aves ?? []), a.cual])] };
      tareas.push(["aves", 1]);
      extra = { espantadas: a.cual };
      break;
    }
    case "abonar": {
      if (!p.semilla) return { status: 409, message: "Primero siembra." };
      if (p.abono) return { status: 409, message: "Ese surco ya está abonado." };
      if (faltan(p, ahora) === 0) return { status: 409, message: "Ya está lista: siégala." };
      if (ab.hay < 1)
        return {
          status: 409,
          message: c.ovejas > 0 ? "Tu redil todavía no tiene abono: las ovejas dan más en un rato." : "Para abonar hacen falta ovejas en tu redil: lleva corderos en Tu casa → Oficios.",
        };
      lab.abono = { n: ab.hay - 1, desde: ab.asentado.desde };
      c.surcos[n] = { ...p, abono: true };
      tareas.push(["abonar", 1]);
      break;
    }
    case "cosechar": {
      if (!p.semilla) return { status: 409, message: "No hay nada sembrado." };
      if (faltan(p, ahora) > 0) return { status: 409, message: "Todavía no está lista." };
      const r = rindeDe(p, { azada, hoz: lab.herramientas.hoz, molino: c.utiles.has("molino"), vasijas: c.utiles.has("vasijas") }, ahora);
      let cuanto = r.cuanto;
      // el rincón para el pobre y el extranjero (Levítico 23:22)
      const rinconesHoy = lab.rincones.dia === dia ? lab.rincones.n : 0;
      let rincon = false;
      if (body.rincon === true) {
        if (rinconesHoy >= RINCON.dia) return { status: 409, message: `Hoy ya dejaste ${RINCON.dia} rincones para el pobre: siega sin dejarlo.` };
        if (cuanto < 2) return { status: 409, message: "Esta cosecha es muy pequeña para dejar el rincón: siega sin dejarlo." };
        cuanto -= 1;
        rincon = true;
        lab.rincones = { dia, n: rinconesHoy + 1 };
        gozo += RINCON.gozo;
        tareas.push(["rincon", 1]);
      }
      const bien = p.semilla === "olivo" ? "aceite" : "harina";
      lab.gavillas = { ...lab.gavillas, [bien]: lab.gavillas[bien] + cuanto };
      c.surcos[n] = { ...SURCO_VACIO };
      tareas.push(["segar", 1]);
      if (r.calidad.estrellas >= 2) tareas.push(["estrellas", 1]);
      extra = { cosecha: { bien, cuanto, estrellas: r.calidad.estrellas, comidas: r.comidas, hoz: r.hoz, ...(rincon ? { rincon: RINCON.gozo } : {}) } };
      ciudad = true;
      break;
    }
    case "granero": {
      const g = lab.gavillas;
      if (g.harina + g.aceite < 1) return { status: 409, message: "No tienes gavillas para llevar: siega primero." };
      const meter = { harina: 0, aceite: 0 };
      for (const b of ["harina", "aceite"] as const) {
        const libre = Math.max(0, Math.floor(c.cap - c.bienes[b]));
        meter[b] = Math.min(g[b], libre);
        c.bienes[b] += meter[b];
      }
      const total = meter.harina + meter.aceite;
      if (total < 1) return { status: 409, message: "Tu alfolí está lleno: lleva lo que tienes al templo, prepáralo en el horno o véndelo al mercader." };
      lab.gavillas = { harina: g.harina - meter.harina, aceite: g.aceite - meter.aceite };
      guardarBienes = true;
      tareas.push(["gavillas", total]);
      extra = { guardado: meter, quedan: lab.gavillas };
      break;
    }
    case "mejorar": {
      const id = body.herramienta as HerramientaId;
      if (!HERRAMIENTAS_IDS.includes(id)) return { status: 400, message: "Elige una herramienta." };
      if (lab.herramientas[id] >= 2) return { status: 409, message: "Ya tienes la mejor." };
      const costo = HERRAMIENTAS[id].mejor.precio;
      const { rows: pago } = await pool.query(`UPDATE game_characters SET gozo = gozo - $2 WHERE id = $1 AND gozo >= $2 RETURNING gozo`, [ch.casa, costo]);
      if (!pago.length) return { status: 409, message: `Te falta gozo: cuesta ${costo}.` };
      anotarGasto("huerto-herramientas", costo);
      await alTesoro("mercado", ch.casa, Math.floor(costo * DIEZMO), "El 10 % de una herramienta del huerto");
      lab.herramientas = { ...lab.herramientas, [id]: 2 };
      extra = { mejorada: id, costo };
      break;
    }
    default:
      return { status: 404, message: "Esa tarea no existe." };
  }

  // las tareas del huerto de hoy
  let cumplidas: MisionHuerto[] = [];
  let todas = false;
  for (const [t, k] of tareas) {
    const r = anotarTarea(m, t, k);
    cumplidas = [...cumplidas, ...r.cumplidas];
    todas = todas || r.todas;
  }
  gozo += cumplidas.length * GOZO_HUERTO.mision + (todas ? GOZO_HUERTO.todas : 0);
  lab.misiones = m;

  await pool.query(
    guardarBienes
      ? `UPDATE game_houses SET huerto = $2::jsonb, labranza = $3::jsonb, goods = $4::jsonb WHERE character_id = $1`
      : `UPDATE game_houses SET huerto = $2::jsonb, labranza = $3::jsonb WHERE character_id = $1`,
    guardarBienes ? [ch.casa, JSON.stringify(c.surcos), JSON.stringify(lab), JSON.stringify(c.bienes)] : [ch.casa, JSON.stringify(c.surcos), JSON.stringify(lab)],
  );
  // el huertito de la casa se ve en la ciudad: los vecinos lo ven cambiar
  if (ciudad && c.barrio) olvidarBarrio(c.barrio);
  return { status: 200, extra, gozo, cumplidas, todas, ciudad };
}
