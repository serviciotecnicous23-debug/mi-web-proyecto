/**
 * «La noche de los sabios» (shared/sabio-noche.ts): «¿Quién es sabio?» para un grupo de 3 a 12 personas, armado sobre
 * la maquinaria del duelo (server/sabio-duelo.ts) llevada a N jugadores. El servidor guarda la sala con su código,
 * elige las doce preguntas (las que menos han visto quienes juegan), lleva el reloj de cada ronda (servida y revelada,
 * en milisegundos del servidor), corrige, suma 100 más la rapidez y pasa a la siguiente cuando todos respondieron o se
 * acabó el tiempo. Al terminar reparte el gozo por puesto (dentro del tope del concurso) y los puntos de la copa.
 *
 * Nada corre de fondo: la noche se pone al día cada vez que alguien pregunta por ella (quien juega pregunta cada
 * segundo; la red de la ciudad avisa los cambios con `avisarA`). Cuándo vio cada uno su noche por última vez se
 * guarda en memoria: quien deja de preguntar 30 s, se fue.
 *
 * Orden de las filas de espera (para no trabarse): las salas (abrir, unirse) → la noche → cada persona.
 */
import type { Express, Request, Response } from "express";
import { pool } from "./db";
import { diaClave, enFila, nombreDe, personajeDe, type PersonajeFila } from "./jerusalen";
import { semanaClave } from "./misiones";
import { sumarGozo } from "./gozo";
import { avisarA } from "./ciudad-red";
import { sumarALaCopa } from "./barrio-juntos";
import { avisarNoche } from "./avisos-juego";
import { POR_GRADA, PREGUNTA, amigosPosibles, filaPersona, lista, mezclar, ponerNochesEnVivo } from "./sabio";
import { marcarMirando, publicoDe } from "./sabio-publico";
import { caminoDe, type Camino } from "@shared/caminos";
import { esNivelBot, nombreDeBot, type NivelBot } from "@shared/mesa";
import { GOZO_SABIO_DIA, respuestaDeBot } from "@shared/sabio";
import {
  LARGO_CODIGO, NOCHE_INVITA_S, NOCHE_MAX, NOCHE_MIN, NOCHE_PREGUNTAS, NOCHE_PREPARAR_S, NOCHE_REVELAR_S, NOCHE_SALA_MIN, NOCHE_SEGUNDOS, NOCHES_DIA,
  codigoNuevo, codigoValido, gozoDePuesto, limpiarCodigo, puestosDeNoche, puntosNoche,
  type EstadoNoche, type InvitablesNoche, type InvitacionNoche, type NocheEnVivo, type NocheJugadorVista, type NocheVista,
} from "@shared/sabio-noche";

/** Unos segundos de gracia por la red al responder. */
const GRACIA_MS = 2500;
/** Quien no pregunta por su noche en este tiempo se fue (en la sala sale de la lista; jugando, deja la noche). */
const AUSENTE_MS = 30_000;
/** Para ganar gozo y puntos de la copa hay que haber respondido al menos la mitad de las preguntas. */
const MIN_RESPUESTAS = Math.ceil(NOCHE_PREGUNTAS / 2);
/** A cuántas personas se puede invitar a una sala. */
const MAX_INVITADOS = 30;
/** Las filas de espera: una para abrir y unirse (de a una), y una por noche (lejos de las de los duelos y las personas). */
const FILA_SALAS = -2_000_000_001;
const filaNoche = (id: number) => -1_000_000_000 - id;
/** El público de una noche se guarda con el número en negativo (el de las partidas va en positivo). */
const publicoNoche = (id: number) => -id;

type Resp = { o: string; ms: number };
/** Cada persona en la noche (se guarda en `jugadores`, en el orden en que llegó). */
type JugadorNoche = {
  /** Titular (la persona), cuenta y personaje con que juega. */
  t: number;
  u: number;
  j: number;
  nombre: string;
  camino: Camino;
  orden: number;
  puntos: number;
  /** Milisegundos de sus respuestas buenas (para desempatar: quien acertó más rápido). */
  ms: number;
  respondidas: number;
  /** La respuesta de la ronda abierta (nadie más la ve hasta que se cierra). */
  r: Resp | null;
  /** El puesto antes de la última ronda revelada, lo que ganó en ella y si acertó. */
  antes: number | null;
  gano: number;
  bien: boolean | null;
  fuera: boolean;
  /** Un compañero de la computadora (con su nivel): números negativos, nunca cuenta en la base. */
  bot?: NivelBot | null;
  /** Al terminar: el puesto, el gozo y si llegó al tope del día. */
  puesto?: number;
  gozo?: number;
  tope?: boolean;
};
type RondaNoche = { q: string; opciones: string[]; resp: Record<string, Resp> };
type Invitado = { u: number; at: number };
type Fila = {
  id: number;
  codigo: string;
  anfitrion: number;
  anfitrion_user: number;
  estado: EstadoNoche;
  jugadores: unknown;
  invitados: unknown;
  quitados: unknown;
  ronda: number;
  preguntas: unknown;
  opciones: unknown;
  servida: string | number | null;
  revelada: string | number | null;
  historial: unknown;
  creado: string | number;
  semana: string;
};
type Persona = { ch: PersonajeFila; titular: number };

const jugadoresDe = (n: Fila) => lista<JugadorNoche>(n.jugadores);
const personasDe = (js: JugadorNoche[]) => js.filter((j) => !j.bot);

// ---------------------------------------------------------------- los compañeros de la computadora
/** Con compañeros la noche es de práctica: como mucho este gozo por persona, y sin copa. */
const GOZO_PRACTICA_NOCHE = 4;

/**
 * Los compañeros a los que ya les tocó contestar la pregunta abierta, contestan (devuelve si contestó alguno). El
 * tiempo y la respuesta salen de `respuestaDeBot` (shared/sabio.ts), con un azar fijo por noche, ronda y compañero:
 * el mismo método que el rival del duelo de práctica (server/sabio-duelo.ts).
 */
function contestanLosBots(n: Fila, js: JugadorNoche[], ahora: number): boolean {
  if (n.revelada != null) return false;
  const servida = Number(n.servida || 0);
  const ronda = Number(n.ronda);
  const q = PREGUNTA.get(lista<string>(n.preguntas)[ronda - 1]);
  if (!q || ahora < servida) return false;
  const opciones = lista<string>(n.opciones);
  let alguno = false;
  for (const j of js) {
    if (!j.bot || j.fuera || j.r) continue;
    const { o, ms } = respuestaDeBot(j.bot, Number(n.id), ronda, j.u, opciones, q.correcta);
    if (ahora < servida + ms) continue;
    j.r = { o, ms: Math.min(NOCHE_SEGUNDOS * 1000, Math.round(ms)) };
    j.respondidas += 1;
    alguno = true;
  }
  return alguno;
}
const activosDe = (js: JugadorNoche[]) => js.filter((j) => !j.fuera);
const normal = (s: string) => s.normalize("NFC").trim();

// ---------------------------------------------------------------- en memoria: cuándo vio cada uno su noche
const vistos = new Map<string, number>();
function marcarVisto(id: number, u: number, ahora: number) {
  vistos.set(`${id}:${u}`, ahora);
}
/** Si el servidor se reinició y no lo tiene, cuenta desde ahora. */
function vistoDe(id: number, u: number, ahora: number): number {
  const k = `${id}:${u}`;
  let v = vistos.get(k);
  if (v === undefined) {
    v = ahora;
    vistos.set(k, v);
  }
  return v;
}
setInterval(() => {
  const ahora = Date.now();
  for (const [k, v] of vistos) if (ahora - v > 30 * 60_000) vistos.delete(k);
}, 5 * 60_000).unref?.();

/** El nombre de quien mira (su personaje), guardado un rato: el público pregunta cada segundo y medio. */
const nombresCuenta = new Map<number, { n: string; at: number }>();
async function nombreDeCuenta(cuenta: number): Promise<string> {
  const c = nombresCuenta.get(cuenta);
  if (c && Date.now() - c.at < 5 * 60_000) return c.n;
  const ch = await personajeDe(cuenta);
  const n = ch ? nombreDe(ch) : "";
  if (nombresCuenta.size > 2000) nombresCuenta.clear();
  nombresCuenta.set(cuenta, { n, at: Date.now() });
  return n;
}

// ---------------------------------------------------------------- la base
async function leer(id: number): Promise<Fila | null> {
  const { rows } = await pool.query(`SELECT * FROM game_sabio_noches WHERE id = $1`, [id]);
  return (rows[0] as Fila) ?? null;
}

async function guardarJugadores(n: Fila, js: JugadorNoche[], extra = "", vals: unknown[] = []): Promise<Fila> {
  const { rows } = await pool.query(`UPDATE game_sabio_noches SET jugadores = $2::jsonb${extra} WHERE id = $1 RETURNING *`, [n.id, JSON.stringify(js), ...vals]);
  return rows[0] as Fila;
}

/** Algo cambió: que cada persona de la noche la vuelva a pedir. */
function avisarTodos(n: Fila, tambien: number[] = []) {
  const us = new Set([...activosDe(jugadoresDe(n)).map((j) => j.u), ...tambien]);
  for (const u of us) avisarA(u, { t: "noche", id: Number(n.id) });
}

/** Mi sala abierta o la noche en que juego (y que no dejé). */
async function nocheDe(cuenta: number): Promise<Fila | null> {
  const { rows } = await pool.query(
    `SELECT * FROM game_sabio_noches
      WHERE estado IN ('sala', 'jugando') AND created_at > now() - interval '3 hours'
        AND jugadores @> jsonb_build_array(jsonb_build_object('u', $1::int, 'fuera', false))
      ORDER BY id DESC LIMIT 1`,
    [cuenta],
  );
  return (rows[0] as Fila) ?? null;
}

/** Si la cuenta se bloqueó (en un sentido o en el otro) con alguna de estas. */
async function bloqueadoCon(cuenta: number, otras: number[]): Promise<boolean> {
  if (!otras.length) return false;
  const { rows } = await pool.query(
    `SELECT 1 FROM user_blocks WHERE (blocker_id = $1 AND blocked_id = ANY($2::int[])) OR (blocked_id = $1 AND blocker_id = ANY($2::int[])) LIMIT 1`,
    [cuenta, otras],
  );
  return rows.length > 0;
}

/** Un código de seis letras que no use otra sala abierta. */
async function codigoLibre(): Promise<string> {
  for (let i = 0; i < 20; i++) {
    const c = codigoNuevo();
    const { rows } = await pool.query(`SELECT 1 FROM game_sabio_noches WHERE codigo = $1 AND estado IN ('sala', 'jugando') LIMIT 1`, [c]);
    if (!rows.length) return c;
  }
  throw new Error("no hay código libre");
}

/** Las doce preguntas (de la grada 1 a la 12) que menos han visto quienes juegan; quedan vistas para todos. */
async function elegirParaNoche(titulares: number[]): Promise<string[]> {
  const filas = [];
  for (const t of titulares) filas.push(await filaPersona(t));
  const ids: string[] = [];
  for (let g = 1; g <= NOCHE_PREGUNTAS; g++) {
    const todas = POR_GRADA.get(g) ?? [];
    const vistas = filas.map((f) => new Set(f.vistas[String(g)] ?? []));
    const cuantos = (id: string) => vistas.reduce((a, v) => a + (v.has(id) ? 1 : 0), 0);
    const menos = Math.min(...todas.map((q) => cuantos(q.id)));
    const libres = todas.filter((q) => cuantos(q.id) === menos);
    ids.push(libres[Math.floor(Math.random() * libres.length)].id);
  }
  for (const t of titulares)
    await enFila(t, async () => {
      const f = await filaPersona(t);
      const vistas = { ...f.vistas };
      ids.forEach((id, i) => {
        const k = String(i + 1);
        const l = vistas[k] ?? [];
        if (!l.includes(id)) vistas[k] = [...l, id];
      });
      await pool.query(`UPDATE game_sabio SET vistas = $2::jsonb WHERE character_id = $1`, [t, JSON.stringify(vistas)]);
    });
  return ids;
}

/** Cuenta una noche del día para la persona (las noches tienen su propio tope). */
async function contarNoche(t: number) {
  await enFila(t, async () => {
    await filaPersona(t);
    await pool.query(
      `UPDATE game_sabio SET noches_hoy = CASE WHEN noches_dia = $2 THEN noches_hoy + 1 ELSE 1 END, noches_dia = $2, updated_at = now() WHERE character_id = $1`,
      [t, diaClave()],
    );
  });
}

// ---------------------------------------------------------------- la sala y las rondas
async function cancelar(n: Fila, avisar: number[]): Promise<Fila> {
  const { rows } = await pool.query(`UPDATE game_sabio_noches SET estado = 'cancelada', finished_at = now() WHERE id = $1 AND estado = 'sala' RETURNING *`, [n.id]);
  const x = (rows[0] as Fila) ?? (await leer(Number(n.id))) ?? n;
  for (const u of avisar) avisarA(u, { t: "noche", id: Number(n.id) });
  return x;
}

/**
 * La sala al día: se cierra sola si nadie la empezó en 20 minutos; quien dejó de mirarla sale de la lista y, si se
 * fue quien la abrió, la sala pasa a quien llegó primero.
 */
async function avanzarSala(n: Fila, ahora: number): Promise<Fila> {
  const js = jugadoresDe(n);
  if (ahora - Number(n.creado) > NOCHE_SALA_MIN * 60_000) return cancelar(n, js.map((j) => j.u));
  const quedan = js.filter((j) => j.bot || ahora - vistoDe(Number(n.id), j.u, ahora) <= AUSENTE_MS);
  if (quedan.length === js.length) return n;
  if (!personasDe(quedan).length) return cancelar(n, []);
  const sigue = quedan.some((j) => j.u === Number(n.anfitrion_user));
  const nuevo = sigue ? null : personasDe(quedan)[0];
  const x = await guardarJugadores(n, quedan, nuevo ? `, anfitrion = $3, anfitrion_user = $4` : "", nuevo ? [nuevo.t, nuevo.u] : []);
  avisarTodos(x, js.filter((j) => !quedan.includes(j)).map((j) => j.u));
  return x;
}

async function servirRonda(n: Fila, ronda: number, ahora: number): Promise<Fila> {
  const q = PREGUNTA.get(lista<string>(n.preguntas)[ronda - 1]);
  if (!q) return terminarNoche(n, jugadoresDe(n), ahora);
  const servida = ronda === 1 ? ahora + NOCHE_PREPARAR_S * 1000 : ahora;
  const js = jugadoresDe(n).map((j) => ({ ...j, r: null }));
  const { rows } = await pool.query(
    `UPDATE game_sabio_noches SET ronda = $2, opciones = $3::jsonb, servida = $4, revelada = NULL, jugadores = $5::jsonb WHERE id = $1 RETURNING *`,
    [n.id, ronda, JSON.stringify(mezclar([q.correcta, ...q.falsas])), servida, JSON.stringify(js)],
  );
  avisarTodos(rows[0] as Fila);
  return rows[0] as Fila;
}

/** Cierra la ronda: suma los puntos (los buenos, con lo rápido), guarda lo que respondió cada uno y lo muestra. */
async function resolverRonda(n: Fila, ahora: number): Promise<Fila> {
  const q = PREGUNTA.get(lista<string>(n.preguntas)[Number(n.ronda) - 1]);
  const js = jugadoresDe(n);
  if (!q) return terminarNoche(n, js, ahora);
  const antes = new Map(puestosDeNoche(js).map((x) => [x.u, x.puesto]));
  const resp: Record<string, Resp> = {};
  const respPersonas: Resp[] = [];
  for (const j of js) {
    // en la primera pregunta todos venían empatados: no hay flechas de subir o bajar
    j.antes = Number(n.ronda) > 1 ? antes.get(j.u) ?? null : null;
    j.gano = 0;
    j.bien = null;
    if (!j.fuera && j.r) {
      resp[String(j.u)] = j.r;
      if (!j.bot) respPersonas.push(j.r);
      j.bien = j.r.o === q.correcta;
      if (j.bien) {
        j.gano = puntosNoche(j.r.ms);
        j.puntos += j.gano;
        j.ms += j.r.ms;
      }
    }
    j.r = null;
  }
  const ronda: RondaNoche = { q: q.id, opciones: lista<string>(n.opciones), resp };
  const x = await guardarJugadores(n, js, `, historial = $3::jsonb, revelada = $4`, [JSON.stringify([...lista<RondaNoche>(n.historial), ronda]), ahora]);
  // lo que se responde en la noche también lo cuentan los ancianos de la puerta
  const cuenta = new Map<string, number>();
  for (const r of respPersonas) cuenta.set(r.o, (cuenta.get(r.o) ?? 0) + 1);
  if (cuenta.size) {
    const vals: unknown[] = [q.id];
    const filas = [...cuenta.entries()].map(([o, k], i) => {
      vals.push(o, k);
      return `($1, $${i * 2 + 2}, $${i * 2 + 3})`;
    });
    await pool.query(
      `INSERT INTO game_sabio_respuestas (pregunta, opcion, n) VALUES ${filas.join(", ")} ON CONFLICT (pregunta, opcion) DO UPDATE SET n = game_sabio_respuestas.n + EXCLUDED.n`,
      vals,
    );
  }
  avisarTodos(x);
  return x;
}

/**
 * Termina la noche: los puestos finales; el gozo por puesto (dentro del tope del concurso) y los puntos de la copa
 * para quien se quedó y respondió al menos la mitad de las preguntas.
 */
async function terminarNoche(n: Fila, js: JugadorNoche[], ahora: number): Promise<Fila> {
  const finales = puestosDeNoche(js);
  const hoy = diaClave();
  const practica = js.some((j) => j.bot);
  for (const f of finales) {
    const j = js.find((x) => x.u === f.u)!;
    j.puesto = f.fuera ? undefined : f.puesto;
    j.gozo = 0;
    j.tope = false;
    if (j.bot || f.fuera || f.respondidas < MIN_RESPUESTAS) continue;
    await enFila(f.t, async () => {
      const fila = await filaPersona(f.t);
      const quiere = practica ? Math.min(GOZO_PRACTICA_NOCHE, gozoDePuesto(f.puesto)) : gozoDePuesto(f.puesto);
      const gozo = Math.max(0, Math.min(quiere, GOZO_SABIO_DIA - fila.gozo_hoy));
      await pool.query(
        `UPDATE game_sabio SET noches = noches + 1, noches_ganadas = noches_ganadas + $2, dia = $3, gozo_hoy = $4, entradas_hoy = $5, updated_at = now() WHERE character_id = $1`,
        [f.t, f.puesto === 1 && !practica ? 1 : 0, hoy, fila.gozo_hoy + gozo, fila.entradas_hoy],
      );
      if (gozo) await sumarGozo(f.t, gozo, "sabio-noche");
      j.gozo = gozo;
      j.tope = fila.gozo_hoy + gozo >= GOZO_SABIO_DIA;
    });
    // la copa de los barrios: jugar la noche suma, y el podio un poco más (con compañeros de la computadora, no)
    if (practica) continue;
    await sumarALaCopa(f.t, "noche");
    if (f.puesto <= 3) await sumarALaCopa(f.t, "nochePodio");
  }
  const x = await guardarJugadores(n, js, `, estado = 'terminada', revelada = COALESCE(revelada, $3), finished_at = now()`, [ahora]);
  avisarTodos(x);
  return x;
}

/**
 * Pone la noche al día (lo llama quien pregunta): la sala, quien se fue, la ronda que se cierra cuando todos
 * respondieron o se acabó el tiempo, y la siguiente.
 */
async function avanzar(n: Fila, ahora: number): Promise<Fila> {
  if (n.estado === "sala") return avanzarSala(n, ahora);
  if (n.estado !== "jugando") return n;
  const js = jugadoresDe(n);
  let cambio = false;
  for (const j of js)
    if (!j.fuera && !j.bot && ahora - vistoDe(Number(n.id), j.u, ahora) > AUSENTE_MS) {
      j.fuera = true;
      j.r = null;
      cambio = true;
    }
  // si ya no queda con quién jugar (o no queda ninguna persona), la noche termina
  if (activosDe(js).length < 2 || !personasDe(activosDe(js)).length) return terminarNoche(n, js, ahora);
  if (contestanLosBots(n, js, ahora)) cambio = true;
  if (cambio) {
    n = await guardarJugadores(n, js);
    if (n.revelada == null && !activosDe(js).every((j) => !!j.r)) avisarTodos(n);
  }
  const servida = Number(n.servida || 0);
  if (n.revelada == null) {
    const todos = activosDe(js).every((j) => !!j.r);
    if (ahora >= servida && (todos || ahora > servida + NOCHE_SEGUNDOS * 1000 + GRACIA_MS)) return resolverRonda(n, ahora);
    return n;
  }
  if (ahora - Number(n.revelada) < NOCHE_REVELAR_S * 1000) return n;
  if (Number(n.ronda) >= NOCHE_PREGUNTAS) return terminarNoche(n, js, ahora);
  return servirRonda(n, Number(n.ronda) + 1, ahora);
}

// ---------------------------------------------------------------- lo que se ve
/** La noche como la ve quien juega (o quien mira, con `me` null): nunca la respuesta antes de cerrar la ronda. */
function vistaNoche(n: Fila, me: number | null, ahora: number): NocheVista {
  const js = jugadoresDe(n);
  const ps = new Map(puestosDeNoche(js).map((x) => [x.u, x.puesto]));
  const yo = me !== null ? js.find((j) => j.u === me) : undefined;
  const juego = !!yo && !yo.fuera;
  const abierta = n.estado === "jugando" && n.revelada == null;
  const servida = Number(n.servida || 0);
  const ronda = Number(n.ronda);
  const q = ronda > 0 ? PREGUNTA.get(lista<string>(n.preguntas)[ronda - 1]) : undefined;
  const hist = lista<RondaNoche>(n.historial);
  const ult = n.revelada != null && hist.length ? hist[hist.length - 1] : null;
  const qu = ult ? PREGUNTA.get(ult.q) : undefined;
  const activos = activosDe(js);
  let espera = 0;
  if (n.estado === "sala") espera = Math.max(0, Math.ceil((Number(n.creado) + NOCHE_SALA_MIN * 60_000 - ahora) / 1000));
  else if (n.estado === "jugando")
    espera = n.revelada != null ? Math.max(0, Math.ceil((Number(n.revelada) + NOCHE_REVELAR_S * 1000 - ahora) / 1000)) : ahora < servida ? Math.ceil((servida - ahora) / 1000) : 0;
  const enSala = n.estado === "sala" || n.estado === "cancelada";
  const orden = enSala ? [...js].sort((a, b) => a.orden - b.orden) : [...js].sort((a, b) => (ps.get(a.u) ?? 99) - (ps.get(b.u) ?? 99) || a.orden - b.orden);
  const jugadores: NocheJugadorVista[] = orden.map((j) => ({
    pid: j.j,
    bot: j.bot ?? null,
    nombre: j.nombre,
    camino: j.camino,
    puntos: j.puntos,
    puesto: ps.get(j.u) ?? js.length,
    antes: n.revelada != null ? j.antes : null,
    respondio: abierta && !!j.r,
    gano: n.revelada != null ? j.gano : 0,
    bien: n.revelada != null ? j.bien : null,
    fuera: j.fuera,
    anfitrion: j.u === Number(n.anfitrion_user),
    yo: j.u === me,
  }));
  const anfitrion = js.find((j) => j.u === Number(n.anfitrion_user));
  const podio = n.estado === "terminada" ? puestosDeNoche(js).filter((j) => !j.fuera && j.puesto <= 3).map((j) => ({ nombre: j.nombre, camino: j.camino, puntos: j.puntos, puesto: j.puesto })) : [];
  return {
    id: Number(n.id),
    codigo: juego ? n.codigo : null,
    estado: n.estado,
    anfitrion: anfitrion?.nombre ?? "",
    soyAnfitrion: !!yo && yo.u === Number(n.anfitrion_user),
    juego,
    jugadores,
    ronda,
    total: NOCHE_PREGUNTAS,
    pregunta:
      abierta && q && ahora >= servida
        ? { n: ronda, texto: q.pregunta, opciones: lista<string>(n.opciones), segundos: NOCHE_SEGUNDOS, restantes: Math.max(0, Math.ceil((servida + NOCHE_SEGUNDOS * 1000 - ahora) / 1000)) }
        : null,
    miRespuesta: abierta && yo?.r ? yo.r.o : null,
    respondieron: abierta ? activos.filter((j) => !!j.r).length : 0,
    activos: activos.length,
    revelado:
      ult && qu
        ? {
            n: hist.length,
            texto: qu.pregunta,
            opciones: ult.opciones,
            correcta: qu.correcta,
            explica: qu.explica,
            ref: qu.ref,
            mia: me !== null ? ult.resp[String(me)]?.o ?? null : null,
            misPuntos: yo?.gano ?? 0,
            conteo: ult.opciones.map((o) => Object.values(ult.resp).filter((r) => r.o === o).length),
            bien: Object.values(ult.resp).filter((r) => r.o === qu.correcta).length,
          }
        : null,
    espera,
    fin: n.estado === "terminada" ? { puesto: yo?.puesto ?? null, gozo: yo?.gozo ?? 0, topeGozo: !!yo?.tope, podio } : null,
    mirando: publicoDe(publicoNoche(Number(n.id))).mirando,
  };
}

/** Las noches que se juegan ahora, para «En vivo» (sin las mías ni las de quienes bloqueé o me bloquearon). */
async function nochesEnVivo(cuenta: number, bloqueados: Set<number>): Promise<NocheEnVivo[]> {
  const ahora = Date.now();
  const { rows } = await pool.query(
    `SELECT * FROM game_sabio_noches WHERE estado = 'jugando' AND created_at > now() - interval '2 hours' ORDER BY id DESC LIMIT 20`,
  );
  const out: NocheEnVivo[] = [];
  for (const n of rows as Fila[]) {
    const js = jugadoresDe(n);
    if (js.some((j) => j.u === cuenta || bloqueados.has(j.u))) continue;
    // una noche que nadie movió en un buen rato ya no está en vivo (se cerrará cuando alguien la pida)
    const ultimo = Math.max(Number(n.servida || 0), Number(n.revelada || 0));
    if (ahora - ultimo > (NOCHE_SEGUNDOS + NOCHE_REVELAR_S) * 1000 + AUSENTE_MS * 2) continue;
    const activos = activosDe(js);
    const primero = Number(n.ronda) > 1 || n.revelada != null ? puestosDeNoche(js)[0]?.nombre ?? null : null;
    const anfitrion = js.find((j) => j.u === Number(n.anfitrion_user)) ?? js[0];
    out.push({
      id: Number(n.id),
      anfitrion: anfitrion?.nombre ?? "",
      camino: anfitrion?.camino ?? "sacerdocio",
      jugadores: activos.length,
      ronda: Number(n.ronda),
      total: NOCHE_PREGUNTAS,
      primero,
      mirando: publicoDe(publicoNoche(Number(n.id))).mirando,
    });
  }
  return out.slice(0, 8);
}

// ---------------------------------------------------------------- rutas
export function registerSabioNocheRoutes(app: Express) {
  ponerNochesEnVivo(nochesEnVivo);

  async function persona(req: Request, res: Response): Promise<Persona | null> {
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
    return { ch, titular: ch.casa };
  }
  /** Para preguntar por la noche cada segundo: basta la sesión (sin buscar el personaje). */
  function cuentaActiva(req: Request, res: Response): number | null {
    if (!req.isAuthenticated()) {
      res.sendStatus(401);
      return null;
    }
    if (!req.user!.isActive) {
      res.status(403).json({ message: "Tu cuenta debe estar aprobada para jugar en línea." });
      return null;
    }
    return req.user!.id;
  }
  const responder = (res: Response, fn: () => Promise<unknown>) =>
    fn().catch((err) => {
      console.error("[sabio-noche]", err);
      if (!res.headersSent) res.sendStatus(500);
    });
  const idDe = (req: Request, res: Response): number | null => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ message: "Noche no válida." });
      return null;
    }
    return id;
  };
  const soyDe = (n: Fila, cuenta: number) => jugadoresDe(n).find((j) => j.u === cuenta && !j.fuera) ?? null;

  /** Las invitaciones que me esperan (salas abiertas a las que me invitaron hace poco). */
  async function invitacionesPara(cuenta: number, ahora: number): Promise<InvitacionNoche[]> {
    const { rows } = await pool.query(
      `SELECT * FROM game_sabio_noches WHERE estado = 'sala' AND created_at > now() - interval '1 hour'
          AND invitados @> jsonb_build_array(jsonb_build_object('u', $1::int)) ORDER BY id DESC LIMIT 3`,
      [cuenta],
    );
    const out: InvitacionNoche[] = [];
    for (const n of rows as Fila[]) {
      const js = jugadoresDe(n);
      if (js.some((j) => j.u === cuenta)) continue;
      const inv = lista<Invitado>(n.invitados).find((x) => x.u === cuenta);
      const restantes = inv ? Math.ceil((inv.at + NOCHE_INVITA_S * 1000 - ahora) / 1000) : 0;
      if (restantes <= 0) continue;
      const a = js.find((j) => j.u === Number(n.anfitrion_user)) ?? js[0];
      out.push({ id: Number(n.id), codigo: n.codigo, de: a?.nombre ?? "", camino: a?.camino ?? "sacerdocio", jugadores: js.length, restantes });
    }
    return out;
  }

  // Mi noche (la sala abierta o la noche en que juego) y las invitaciones que me esperan.
  app.get("/api/jerusalen/sabio/noche", (req, res) =>
    responder(res, async () => {
      const pr = await persona(req, res);
      if (!pr) return;
      const ahora = Date.now();
      const me = pr.ch.user_id;
      let n = await nocheDe(me);
      if (n) {
        const id = Number(n.id);
        n = await enFila(filaNoche(id), async () => {
          const x = await leer(id);
          if (!x || !soyDe(x, me)) return null;
          marcarVisto(id, me, ahora);
          return avanzar(x, ahora);
        });
      }
      const f = await filaPersona(pr.titular);
      res.setHeader("Cache-Control", "no-store");
      res.json({
        noche: n && soyDe(n, me) && (n.estado === "sala" || n.estado === "jugando") ? vistaNoche(n, me, ahora) : null,
        invitaciones: await invitacionesPara(me, ahora),
        hoy: f.noches_hoy,
        jugadas: f.noches,
        ganadas: f.noches_ganadas,
      });
    }),
  );

  // Una noche por su número (quien juega pregunta cada segundo): la pone al día.
  app.get("/api/jerusalen/sabio/noche/:id", (req, res) =>
    responder(res, async () => {
      const me = cuentaActiva(req, res);
      if (me === null) return;
      const id = idDe(req, res);
      if (id === null) return;
      const ahora = Date.now();
      const n = await enFila(filaNoche(id), async () => {
        const x = await leer(id);
        if (!x) return null;
        const yo = jugadoresDe(x).find((j) => j.u === me);
        if (!yo) return null;
        if (!yo.fuera) marcarVisto(id, me, ahora);
        return avanzar(x, ahora);
      });
      if (!n || !jugadoresDe(n).some((j) => j.u === me)) return res.status(404).json({ message: "Ya no estás en esta noche." });
      res.setHeader("Cache-Control", "no-store");
      res.json({ noche: vistaNoche(n, me, ahora) });
    }),
  );

  // Abrir una sala (con su código): quien la abre la empieza.
  app.post("/api/jerusalen/sabio/noche/abrir", (req, res) =>
    responder(res, async () => {
      const pr = await persona(req, res);
      if (!pr) return;
      const me = pr.ch.user_id;
      const ahora = Date.now();
      type Salida = { error: number; message: string } | { n: Fila };
      const out = await enFila(FILA_SALAS, async (): Promise<Salida> => {
        const ya = await nocheDe(me);
        if (ya) return { n: ya };
        if ((await filaPersona(pr.titular)).noches_hoy >= NOCHES_DIA) return { error: 429, message: `Por hoy ya jugaste las ${NOCHES_DIA} noches. Mañana hay más.` };
        const yo: JugadorNoche = {
          t: pr.titular, u: me, j: pr.ch.id, nombre: nombreDe(pr.ch), camino: caminoDe(pr.ch.camino), orden: 0,
          puntos: 0, ms: 0, respondidas: 0, r: null, antes: null, gano: 0, bien: null, fuera: false,
        };
        const { rows } = await pool.query(
          `INSERT INTO game_sabio_noches (codigo, anfitrion, anfitrion_user, jugadores, creado, semana) VALUES ($1, $2, $3, $4::jsonb, $5, $6) RETURNING *`,
          [await codigoLibre(), pr.titular, me, JSON.stringify([yo]), ahora, semanaClave()],
        );
        marcarVisto(Number(rows[0].id), me, ahora);
        return { n: rows[0] as Fila };
      });
      if ("error" in out) return res.status(out.error).json({ message: out.message });
      res.json({ noche: vistaNoche(out.n, me, ahora) });
    }),
  );

  // Entrar a una sala con su código (de cualquier forma: minúsculas, con espacios…).
  app.post("/api/jerusalen/sabio/noche/unirse", (req, res) =>
    responder(res, async () => {
      const pr = await persona(req, res);
      if (!pr) return;
      const me = pr.ch.user_id;
      const codigo = limpiarCodigo(req.body?.codigo);
      if (!codigoValido(codigo)) return res.status(400).json({ message: `Escribe el código de ${LARGO_CODIGO} letras de la sala.` });
      const ahora = Date.now();
      type Salida = { error: number; message: string } | { n: Fila };
      const out = await enFila(FILA_SALAS, async (): Promise<Salida> => {
        const ya = await nocheDe(me);
        if (ya && ya.codigo === codigo) return { n: ya };
        if (ya) return { error: 409, message: "Ya estás en otra sala. Sal de ella primero." };
        const { rows } = await pool.query(
          `SELECT id FROM game_sabio_noches WHERE codigo = $1 AND estado IN ('sala', 'jugando') AND created_at > now() - interval '3 hours' ORDER BY id DESC LIMIT 1`,
          [codigo],
        );
        if (!rows[0]) return { error: 404, message: "No hay ninguna sala abierta con ese código." };
        const id = Number(rows[0].id);
        return enFila(filaNoche(id), async (): Promise<Salida> => {
          const n = await leer(id);
          if (!n) return { error: 404, message: "No hay ninguna sala abierta con ese código." };
          if (n.estado === "jugando") return { error: 409, message: "Esa noche ya empezó. Puedes mirarla desde «En vivo»." };
          const x = await avanzarSala(n, ahora);
          if (x.estado !== "sala") return { error: 409, message: "Esa sala ya se cerró." };
          const js = jugadoresDe(x);
          if (lista<number>(x.quitados).includes(me)) return { error: 403, message: "No puedes entrar a esta sala." };
          if (js.length >= NOCHE_MAX) return { error: 409, message: `La sala ya está llena (${NOCHE_MAX} personas).` };
          if (await bloqueadoCon(me, js.map((j) => j.u))) return { error: 403, message: "No puedes entrar a esta sala." };
          if ((await filaPersona(pr.titular)).noches_hoy >= NOCHES_DIA) return { error: 429, message: `Por hoy ya jugaste las ${NOCHES_DIA} noches. Mañana hay más.` };
          const yo: JugadorNoche = {
            t: pr.titular, u: me, j: pr.ch.id, nombre: nombreDe(pr.ch), camino: caminoDe(pr.ch.camino), orden: Math.max(0, ...js.map((j) => j.orden)) + 1,
            puntos: 0, ms: 0, respondidas: 0, r: null, antes: null, gano: 0, bien: null, fuera: false,
          };
          const nueva = await guardarJugadores(x, [...js, yo]);
          marcarVisto(id, me, ahora);
          avisarTodos(nueva);
          return { n: nueva };
        });
      });
      if ("error" in out) return res.status(out.error).json({ message: out.message });
      res.json({ noche: vistaNoche(out.n, me, ahora) });
    }),
  );

  // A quién puedo invitar (vecinos y amigos en línea que no están jugando ni en otra sala).
  app.get("/api/jerusalen/sabio/noche-amigos", (req, res) =>
    responder(res, async () => {
      const pr = await persona(req, res);
      if (!pr) return;
      const n = await nocheDe(pr.ch.user_id);
      const invitados = new Set(n ? lista<Invitado>(n.invitados).map((x) => x.u) : []);
      const posibles = await amigosPosibles(pr.titular, pr.ch.user_id);
      res.setHeader("Cache-Control", "no-store");
      res.json({
        amigos: posibles.map(({ t: _t, u, ...x }) => ({ ...x, invitado: invitados.has(u) }) satisfies InvitablesNoche),
      });
    }),
  );

  // Invitar a un vecino o amigo en línea: le llega la invitación con el código (y al teléfono, si activó los avisos).
  app.post("/api/jerusalen/sabio/noche/:id/invitar", (req, res) =>
    responder(res, async () => {
      const pr = await persona(req, res);
      if (!pr) return;
      const id = idDe(req, res);
      if (id === null) return;
      const a = Number(req.body?.a);
      if (!Number.isInteger(a) || a <= 0) return res.status(400).json({ message: "Elige a quién invitar." });
      const me = pr.ch.user_id;
      const ahora = Date.now();
      type Salida = { error: number; message: string } | { n: Fila };
      const out = await enFila(filaNoche(id), async (): Promise<Salida> => {
        const n = await leer(id);
        if (!n || !soyDe(n, me)) return { error: 404, message: "Ya no estás en esta sala." };
        if (n.estado !== "sala") return { error: 409, message: "La noche ya empezó: ya no se puede invitar." };
        const js = jugadoresDe(n);
        if (js.length >= NOCHE_MAX) return { error: 409, message: `La sala ya está llena (${NOCHE_MAX} personas).` };
        const quien = (await amigosPosibles(pr.titular, me)).find((x) => x.personajeId === a);
        if (!quien) return { error: 409, message: "Esa persona ya no está en la ciudad (o está jugando)." };
        if (js.some((j) => j.u === quien.u)) return { error: 409, message: `${quien.nombre} ya está en la sala.` };
        if (await bloqueadoCon(quien.u, js.map((j) => j.u))) return { error: 409, message: "Esa persona no puede entrar a esta sala." };
        const invitados = lista<Invitado>(n.invitados);
        const ya = invitados.find((x) => x.u === quien.u);
        if (ya && ahora - ya.at < NOCHE_INVITA_S * 1000) return { error: 409, message: `Ya le llegó tu invitación a ${quien.nombre}.` };
        if (invitados.length >= MAX_INVITADOS) return { error: 429, message: "Ya invitaste a muchas personas a esta sala." };
        const invitacion: InvitacionNoche = { id, codigo: n.codigo, de: nombreDe(pr.ch), camino: caminoDe(pr.ch.camino), jugadores: js.length, restantes: NOCHE_INVITA_S };
        const llego = avisarA(quien.u, { t: "noche-invita", i: invitacion });
        if (!llego) return { error: 409, message: `${quien.nombre} ya no estaba en la ciudad.` };
        void avisarNoche(quien.u, invitacion.de, id, n.codigo, NOCHE_INVITA_S).catch(() => {});
        const { rows } = await pool.query(`UPDATE game_sabio_noches SET invitados = $2::jsonb WHERE id = $1 RETURNING *`, [
          id,
          JSON.stringify([...invitados.filter((x) => x.u !== quien.u), { u: quien.u, at: ahora }]),
        ]);
        return { n: rows[0] as Fila };
      });
      if ("error" in out) return res.status(out.error).json({ message: out.message });
      res.json({ noche: vistaNoche(out.n, me, ahora) });
    }),
  );

  // Quien abrió la sala agrega un compañero de la computadora (con su nivel) o lo quita, antes de empezar.
  app.post("/api/jerusalen/sabio/noche/:id/bot", (req, res) =>
    responder(res, async () => {
      const me = cuentaActiva(req, res);
      if (me === null) return;
      const id = idDe(req, res);
      if (id === null) return;
      const ahora = Date.now();
      type Salida = { error: number; message: string } | { n: Fila };
      const out = await enFila(filaNoche(id), async (): Promise<Salida> => {
        const n = await leer(id);
        if (!n || !soyDe(n, me)) return { error: 404, message: "Ya no estás en esta sala." };
        if (Number(n.anfitrion_user) !== me) return { error: 403, message: "Solo quien abrió la sala agrega o quita compañeros de la computadora." };
        if (n.estado !== "sala") return { error: 409, message: "La noche ya empezó." };
        const js = jugadoresDe(n);
        if (req.body?.quitar !== undefined) {
          const sale = js.find((j) => j.bot && j.j === Number(req.body.quitar));
          if (!sale) return { error: 404, message: "Ese compañero ya no está en la sala." };
          const x = await guardarJugadores(n, js.filter((j) => j !== sale));
          avisarTodos(x);
          return { n: x };
        }
        if (js.length >= NOCHE_MAX) return { error: 409, message: `La noche es de hasta ${NOCHE_MAX}: ya no caben más.` };
        const nivel: NivelBot = esNivelBot(req.body?.nivel) ? req.body.nivel : "normal";
        const k = Math.min(0, ...js.map((j) => j.u)) - 1;
        // un nombre que no tenga nadie de la sala (ni persona ni compañero)
        const base = (x: string) => x.replace(/ 🤖$/, "");
        const usados = new Set(js.map((j) => base(j.nombre)));
        let i = Number(n.id) + -k;
        while (usados.has(base(nombreDeBot(i))) && i < Number(n.id) + -k + 12) i++;
        const bot: JugadorNoche = {
          t: k, u: k, j: k, nombre: nombreDeBot(i), camino: "sacerdocio", orden: js.length, puntos: 0, ms: 0, respondidas: 0, r: null,
          antes: null, gano: 0, bien: null, fuera: false, bot: nivel,
        };
        const x = await guardarJugadores(n, [...js, bot]);
        avisarTodos(x);
        return { n: x };
      });
      if ("error" in out) return res.status(out.error).json({ message: out.message });
      res.json({ noche: vistaNoche(out.n, me, ahora) });
    }),
  );

  // Quien abrió la sala puede sacar a alguien (antes de empezar); esa persona ya no puede volver a esta sala.
  app.post("/api/jerusalen/sabio/noche/:id/quitar", (req, res) =>
    responder(res, async () => {
      const me = cuentaActiva(req, res);
      if (me === null) return;
      const id = idDe(req, res);
      if (id === null) return;
      const a = Number(req.body?.a);
      const ahora = Date.now();
      type Salida = { error: number; message: string } | { n: Fila };
      const out = await enFila(filaNoche(id), async (): Promise<Salida> => {
        const n = await leer(id);
        if (!n || !soyDe(n, me)) return { error: 404, message: "Ya no estás en esta sala." };
        if (Number(n.anfitrion_user) !== me) return { error: 403, message: "Solo quien abrió la sala puede sacar a alguien." };
        if (n.estado !== "sala") return { error: 409, message: "La noche ya empezó." };
        const js = jugadoresDe(n);
        const sale = js.find((j) => j.j === a && j.u !== me);
        if (!sale) return { error: 404, message: "Esa persona no está en la sala." };
        const x = await guardarJugadores(n, js.filter((j) => j !== sale), `, quitados = $3::jsonb`, [JSON.stringify([...lista<number>(n.quitados), sale.u])]);
        avisarTodos(x, [sale.u]);
        return { n: x };
      });
      if ("error" in out) return res.status(out.error).json({ message: out.message });
      res.json({ noche: vistaNoche(out.n, me, ahora) });
    }),
  );

  // Empezar la noche (solo quien abrió la sala, con 3 o más): las doce preguntas y la primera ronda.
  app.post("/api/jerusalen/sabio/noche/:id/empezar", (req, res) =>
    responder(res, async () => {
      const me = cuentaActiva(req, res);
      if (me === null) return;
      const id = idDe(req, res);
      if (id === null) return;
      const ahora = Date.now();
      type Salida = { error: number; message: string } | { n: Fila };
      const out = await enFila(filaNoche(id), async (): Promise<Salida> => {
        const n0 = await leer(id);
        if (!n0 || !soyDe(n0, me)) return { error: 404, message: "Ya no estás en esta sala." };
        marcarVisto(id, me, ahora);
        const n = await avanzarSala(n0, ahora);
        if (n.estado !== "sala") return { error: 409, message: n.estado === "jugando" ? "La noche ya empezó." : "Esa sala ya se cerró." };
        if (Number(n.anfitrion_user) !== me) return { error: 403, message: "Solo quien abrió la sala puede empezar la noche." };
        const js = jugadoresDe(n);
        if (js.length < NOCHE_MIN) return { error: 409, message: `Faltan ${NOCHE_MIN - js.length} para empezar: la noche es de ${NOCHE_MIN} a ${NOCHE_MAX} personas.` };
        for (const j of personasDe(js))
          if ((await filaPersona(j.t)).noches_hoy >= NOCHES_DIA) return { error: 409, message: `${j.nombre} ya jugó sus ${NOCHES_DIA} noches de hoy.` };
        const preguntas = await elegirParaNoche(personasDe(js).map((j) => j.t));
        for (const j of personasDe(js)) await contarNoche(j.t);
        for (const j of personasDe(js)) marcarVisto(id, j.u, ahora);
        const { rows } = await pool.query(`UPDATE game_sabio_noches SET estado = 'jugando', preguntas = $2::jsonb WHERE id = $1 RETURNING *`, [id, JSON.stringify(preguntas)]);
        return { n: await servirRonda(rows[0] as Fila, 1, ahora) };
      });
      if ("error" in out) return res.status(out.error).json({ message: out.message });
      res.json({ noche: vistaNoche(out.n, me, ahora) });
    }),
  );

  // Responder la pregunta abierta (una vez por pregunta; acertar rápido vale más).
  app.post("/api/jerusalen/sabio/noche/:id/responder", (req, res) =>
    responder(res, async () => {
      const me = cuentaActiva(req, res);
      if (me === null) return;
      const id = idDe(req, res);
      if (id === null) return;
      const opcion = typeof req.body?.opcion === "string" ? normal(req.body.opcion) : "";
      type Salida = { error: number; message: string; n?: Fila } | { n: Fila };
      const ahora = Date.now();
      const out = await enFila(filaNoche(id), async (): Promise<Salida> => {
        const n = await leer(id);
        if (!n || !soyDe(n, me)) return { error: 404, message: "Ya no estás en esta noche." };
        marcarVisto(id, me, ahora);
        const x = await avanzar(n, ahora);
        if (x.estado !== "jugando" || x.revelada != null) return { error: 409, message: "Esta pregunta ya se cerró.", n: x };
        const servida = Number(x.servida || 0);
        if (ahora < servida) return { error: 409, message: "La pregunta todavía no empieza.", n: x };
        const js = jugadoresDe(x);
        const yo = js.find((j) => j.u === me && !j.fuera);
        if (!yo) return { error: 404, message: "Ya no estás en esta noche.", n: x };
        if (yo.r) return { error: 409, message: "Ya respondiste esta pregunta.", n: x };
        if (!lista<string>(x.opciones).includes(opcion)) return { error: 400, message: "Esa respuesta no está entre las opciones.", n: x };
        yo.r = { o: opcion, ms: Math.min(NOCHE_SEGUNDOS * 1000, ahora - servida) };
        yo.respondidas += 1;
        let y = await guardarJugadores(x, js);
        if (activosDe(js).every((j) => !!j.r)) y = await resolverRonda(y, ahora);
        else avisarTodos(y);
        return { n: y };
      });
      if ("error" in out) return res.status(out.error).json({ message: out.message, noche: out.n ? vistaNoche(out.n, me, ahora) : null });
      res.json({ noche: vistaNoche(out.n, me, ahora) });
    }),
  );

  // Salir: en la sala, salir de la lista (si sale quien la abrió, la sala pasa a otro); jugando, dejar la noche.
  app.post("/api/jerusalen/sabio/noche/:id/salir", (req, res) =>
    responder(res, async () => {
      const me = cuentaActiva(req, res);
      if (me === null) return;
      const id = idDe(req, res);
      if (id === null) return;
      const ahora = Date.now();
      const out = await enFila(filaNoche(id), async () => {
        const n = await leer(id);
        if (!n || !soyDe(n, me)) return null;
        const js = jugadoresDe(n);
        if (n.estado === "sala") {
          const quedan = js.filter((j) => j.u !== me);
          if (!quedan.length) return cancelar(n, []);
          const nuevo = Number(n.anfitrion_user) === me ? [...quedan].sort((a, b) => a.orden - b.orden)[0] : null;
          const x = await guardarJugadores(n, quedan, nuevo ? `, anfitrion = $3, anfitrion_user = $4` : "", nuevo ? [nuevo.t, nuevo.u] : []);
          avisarTodos(x);
          return x;
        }
        if (n.estado !== "jugando") return n;
        const yo = js.find((j) => j.u === me)!;
        yo.fuera = true;
        yo.r = null;
        if (activosDe(js).length < 2) return terminarNoche(n, js, ahora);
        let x = await guardarJugadores(n, js);
        if (x.revelada == null && activosDe(js).every((j) => !!j.r) && ahora >= Number(x.servida || 0)) x = await resolverRonda(x, ahora);
        else avisarTodos(x);
        return x;
      });
      if (!out) return res.status(404).json({ message: "Ya no estás en esta noche." });
      res.json({ noche: vistaNoche(out, me, ahora) });
    }),
  );

  // Mirar una noche en vivo (quien no juega): lo mismo que ven quienes juegan, sin el código ni las respuestas abiertas.
  app.get("/api/jerusalen/sabio/noche-mirar/:id", (req, res) =>
    responder(res, async () => {
      const me = cuentaActiva(req, res);
      if (me === null) return;
      const id = idDe(req, res);
      if (id === null) return;
      const ahora = Date.now();
      const n0 = await leer(id);
      const js0 = n0 ? jugadoresDe(n0) : [];
      if (!n0 || n0.estado === "sala" || n0.estado === "cancelada" || (await bloqueadoCon(me, js0.map((j) => j.u))))
        return res.status(404).json({ message: "Esa noche ya no está." });
      const n = (await enFila(filaNoche(id), async () => {
        const x = await leer(id);
        return x ? avanzar(x, ahora) : null;
      }))!;
      const juega = jugadoresDe(n).some((j) => j.u === me && !j.fuera);
      if (!juega) marcarMirando(publicoNoche(id), me, await nombreDeCuenta(me));
      res.setHeader("Cache-Control", "no-store");
      res.json({ noche: vistaNoche(n, juega ? me : null, ahora) });
    }),
  );
}
