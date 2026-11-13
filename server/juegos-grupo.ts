/**
 * El patio de los juegos (shared/juegos-grupo.ts) en el servidor.
 *
 * - Las salas viven en memoria (como la presencia de la ciudad): duran lo que dura un rato de juego, y lo que queda para
 *   siempre (las partidas, los premios, el tope de gozo del día y las prendas) se escribe en la base al terminar.
 * - Todo lo decide el servidor, con las horas del reloj del servidor en milisegundos: `avanzar` pone la sala al día cada
 *   vez que alguien pregunta o hace algo, y mientras se juega un temporizador de la sala la pone al día en cada cambio de
 *   fase (así nadie tiene que preguntar cada segundo: con la wifi de una iglesia, todos comparten el cupo de peticiones).
 * - Cada cambio llega a cada jugador por la red de la ciudad (`avisarA`), con lo que ese jugador puede ver: nunca la
 *   respuesta antes de tiempo ni lo que respondió otro antes de cerrar la ronda. El teléfono pregunta de vez en cuando,
 *   por si un aviso se perdió.
 * - La carrera y el muro se juegan caminando: el servidor mira cada posición real que llega por la red
 *   (`observarPosiciones`). Un salto imposible (con «Ir a…» o una trampa) no cuenta.
 * - Solo cuentas aprobadas, con su personaje y en la ciudad; nunca se juntan en una sala quienes se bloquearon (y si
 *   alguien bloquea a otro de su sala, el bloqueado sale de ella).
 */
import type { Express, Request, Response } from "express";
import { pool } from "./db";
import { diaClave, enFila, nombreDe, personajeDe, type PersonajeFila } from "./jerusalen";
import { sumarGozo } from "./gozo";
import { sumarALaCopa } from "./barrio-juntos";
import { avisarA, observarBloqueos, observarPosiciones, presenciaDe, ubicacionDe } from "./ciudad-red";
import { relacionesDe } from "./sabio";
import { dondeEsta } from "./barrio";
import { BANCO } from "./jerusalen-banco";
import { BANCO_SABIO } from "./sabio-banco";
import { ESGRIMA_BANCO, QUIEN_BANCO } from "./juegos-grupo-banco";
import { JERUSALEN_JUEGO } from "@shared/jerusalen";
import { VERSICULOS_RAPIDOS } from "@shared/ciudad";
import type { Camino } from "@shared/caminos";
import {
  CANTERA, CARRERA, CODIGO_LARGO, CODIGO_LETRAS, ESGRIMA, FRASES_SALA, FRASES_SALA_POR_MINUTO, FRASES_SALA_VISTAS, FRASE_SALA_CADA_MS, GOZO_JUEGOS_DIA,
  GOZO_JUGAR, GOZO_MURO, GOZO_PUESTOS, GOZO_TRIBU, GRACIA_MS, INVITACIONES_SALA_POR_MINUTO, INVITACION_SALA_S, INVITAR_SALA_CADA_MS, JUEGOS, MURO,
  MURO_APORTE_MIN, ORDEN_JUEGOS, PATIO_SALIDA, PREPARAR_MS, QUIEN, QUIEN_RONDA_MS, REVELAR_MS, SALA_MAX, SALA_MIN, SALA_QUIETA_MS, AUSENTE_SALA_MS,
  TRAMO, TRAMO_CENTRO, TRIBUS, TRIBUS_EQUIPOS, enElPatio, esJuego, limpiarCodigo, margenDespues, metaDelMuro, pistasVistas, puntosQuien, recorridoDeCarrera,
  type EstadoSala, type FraseVista, type InvitableSala, type JuegoId, type LugarCarrera, type MiembroVista, type PartidaVista, type PatioEstado,
  type ResultadoVista, type SalaAbierta, type SalaVista, type TribuVista,
} from "@shared/juegos-grupo";

export const JUEGOS_GRUPO_SQL = `
CREATE TABLE IF NOT EXISTS "game_juegos_grupo" (
  "titular" integer PRIMARY KEY REFERENCES "game_characters"("id") ON DELETE CASCADE,
  "dia" text,
  "gozo_hoy" integer NOT NULL DEFAULT 0,
  "premios" jsonb NOT NULL DEFAULT '[]'::jsonb,
  "updated_at" timestamp NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS "game_juegos_partidas" (
  "id" serial PRIMARY KEY,
  "juego" text NOT NULL,
  "jugadores" integer NOT NULL,
  "ms" integer NOT NULL DEFAULT 0,
  "cumplido" boolean,
  "created_at" timestamp NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS "idx_game_juegos_partidas_fecha" ON "game_juegos_partidas" ("created_at");
CREATE TABLE IF NOT EXISTS "game_juegos_jugadores" (
  "partida_id" integer NOT NULL REFERENCES "game_juegos_partidas"("id") ON DELETE CASCADE,
  "titular" integer NOT NULL REFERENCES "game_characters"("id") ON DELETE CASCADE,
  "juego" text NOT NULL,
  "puesto" integer NOT NULL,
  "puntos" integer NOT NULL DEFAULT 0,
  "gano" boolean NOT NULL DEFAULT false,
  "gozo" integer NOT NULL DEFAULT 0,
  "created_at" timestamp NOT NULL DEFAULT now(),
  PRIMARY KEY ("partida_id", "titular")
);
CREATE INDEX IF NOT EXISTS "idx_game_juegos_jugadores_titular" ON "game_juegos_jugadores" ("titular", "juego");`;

// ================================================================ en memoria
type Miembro = {
  /** La cuenta (la red avisa por cuenta). */
  u: number;
  /** El personaje en línea (el de la presencia: su figura en la ciudad). */
  pj: number;
  /** El titular de la persona: guarda el gozo, las prendas y las partidas. */
  t: number;
  nombre: string;
  camino: Camino;
  listo: boolean;
  /** La tribu elegida (0 a 3) para «Las doce tribus». */
  equipo: number | null;
  entro: number;
  /** La última vez que preguntó por la sala o hizo algo en ella. */
  visto: number;
};
type Frase = { n: number; nombre: string; texto: string; ref?: string; u: number };
type Resp = { u: number; o: string; ms: number };

type ItemEsgrima = { i: number; modo: "cita" | "verso"; muestra: string; opciones: string[]; correcta: string };
type PartidaEsgrima = {
  juego: "esgrima";
  items: ItemEsgrima[];
  ronda: number;
  servida: number;
  revelada: number | null;
  primerAcierto: number | null;
  resp: Map<number, Resp>;
  puntos: Map<number, number>;
  tiempo: Map<number, number>;
  ultima: { primero: number | null; aciertos: { u: number; ms: number }[]; resp: Map<number, Resp> } | null;
};
type PreguntaTribus = { texto: string; correcta: string; opciones: string[]; explica: string; ref: string };
type PartidaTribus = {
  juego: "tribus";
  n: number;
  preguntas: PreguntaTribus[];
  turno: number;
  enTurno: number;
  fase: "pregunta" | "robo" | "revelar";
  servida: number;
  roboDesde: number | null;
  revelada: number | null;
  respTurno: Resp | null;
  respRobo: Map<number, Resp>;
  quitada: string | null;
  gano: { tribu: number; como: "turno" | "robo" } | null;
  falloTurno: string | null;
  puntos: number[];
  tribuDe: Map<number, number>;
};
type PartidaQuien = {
  juego: "quien";
  items: { i: number; opciones: string[] }[];
  ronda: number;
  servida: number;
  revelada: number | null;
  resp: Map<number, Resp & { pistas: number }>;
  puntos: Map<number, number>;
  tiempo: Map<number, number>;
  ultima: Map<number, Resp & { pistas: number }> | null;
};
type Pos = { x: number; z: number; at: number };
type Corredor = { siguiente: number; tiempos: number[]; ultima: Pos | null; margen: number; salto: boolean; termino: number | null };
type PartidaCarrera = { juego: "carrera"; puntos: LugarCarrera[]; salida: number; primero: number | null; corredores: Map<number, Corredor> };
type PartidaMuro = {
  juego: "muro";
  meta: number;
  puestas: number;
  salida: number;
  aportes: Map<number, number>;
  llevando: Set<number>;
  ultima: Map<number, Pos & { margen: number }>;
  cumplido: boolean;
};
type Partida = (PartidaEsgrima | PartidaTribus | PartidaQuien | PartidaCarrera | PartidaMuro) & {
  empezo: number;
  /** Quiénes jugaron de verdad (respondieron, corrieron o pusieron piedras): solo ellos cuentan para los premios. */
  participo: Set<number>;
  /** Más rápido, para las pruebas (solo fuera de producción). */
  rapido: boolean;
};

type FilaFinal = { u: number; t: number; pj: number; nombre: string; puesto: number; puntos: number; detalle: string; gano: boolean; tribu: number | null; participo: boolean; quiere: number };
type Premio = NonNullable<ResultadoVista["mio"]>;

type Sala = {
  codigo: string;
  juego: JuegoId;
  tribus: number;
  estado: EstadoSala;
  anfitrion: number;
  miembros: Miembro[];
  creada: number;
  actividad: number;
  ver: number;
  frases: Frase[];
  fraseN: number;
  partida: Partida | null;
  resultado: { vista: Omit<ResultadoVista, "mio" | "anotando">; filas: FilaFinal[]; premios: Map<number, Premio>; anotando: boolean } | null;
  /** Cuentas que el anfitrión sacó: no vuelven a entrar a esta sala. */
  sacados: Set<number>;
  temporizador: ReturnType<typeof setTimeout> | null;
  emision: ReturnType<typeof setTimeout> | null;
};

const salas = new Map<string, Sala>();
const salaDe = new Map<number, string>();
const MAX_SALAS = 300;
/** Cuándo escribió una frase cada persona (ritmo) y cuándo invitó a quién. */
const frasesDe = new Map<number, number[]>();
const invitadas = new Map<string, number>();
const invitacionesDe = new Map<number, number[]>();
const creadasDe = new Map<number, number[]>();

const enProduccion = () => process.env.NODE_ENV === "production";
const azar = <T>(l: readonly T[]): T => l[Math.floor(Math.random() * l.length)];
function mezclar<T>(arr: readonly T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
const normal = (s: string) => s.normalize("NFC").trim();

function nuevoCodigo(): string {
  for (;;) {
    let c = "";
    for (let i = 0; i < CODIGO_LARGO; i++) c += CODIGO_LETRAS[Math.floor(Math.random() * CODIGO_LETRAS.length)];
    if (!salas.has(c)) return c;
  }
}

/** Las frases que valen en la sala: las del patio y los versículos rápidos de la ciudad. */
function fraseDeSala(id: string): { texto: string; ref?: string } | null {
  const f = FRASES_SALA.find((x) => x.id === id);
  if (f) return { texto: f.texto };
  const v = VERSICULOS_RAPIDOS.find((x) => x.id === id);
  return v ? { texto: v.texto, ref: v.ref } : null;
}

/** Quiénes de la sala están en la ciudad (o en el templo) ahora. */
function conectados(s: Sala): Set<number> {
  return new Set(presenciaDe(s.miembros.map((m) => m.u)).keys());
}

// ================================================================ las partidas: empezar
/** El versículo cortado para una opción (lo que se ve en el botón: el principio, literal, y «…»). */
function corto(t: string, max = 118): string {
  if (t.length <= max) return t;
  const c = t.slice(0, max);
  return `${c.slice(0, Math.max(60, c.lastIndexOf(" ")))}…`;
}
const libroDe = (ref: string) => ref.replace(/\s+\d+:\d+.*$/, "");

function empezarEsgrima(ahora: number): Omit<PartidaEsgrima, never> {
  const elegidos = mezclar(ESGRIMA_BANCO.map((_, i) => i)).slice(0, ESGRIMA.rondas);
  const items: ItemEsgrima[] = elegidos.map((i, k) => {
    const v = ESGRIMA_BANCO[i];
    const modo = k % 2 === 0 ? "cita" : "verso";
    const otros = mezclar(ESGRIMA_BANCO.filter((_, j) => j !== i));
    if (modo === "verso") {
      // las opciones son citas: una del mismo libro (si hay), para que haya que saber dónde está
      const mismo = otros.filter((o) => libroDe(o.ref) === libroDe(v.ref));
      const falsas = [...mismo.slice(0, 1), ...otros.filter((o) => libroDe(o.ref) !== libroDe(v.ref))].slice(0, 3).map((o) => o.ref);
      return { i, modo, muestra: v.texto, opciones: mezclar([v.ref, ...falsas]), correcta: v.ref };
    }
    const falsas = otros.slice(0, 3).map((o) => corto(o.texto));
    return { i, modo, muestra: v.ref, opciones: mezclar([corto(v.texto), ...falsas]), correcta: corto(v.texto) };
  });
  return { juego: "esgrima", items, ronda: 1, servida: ahora + PREPARAR_MS, revelada: null, primerAcierto: null, resp: new Map(), puntos: new Map(), tiempo: new Map(), ultima: null };
}

function preguntasDeTribus(): PreguntaTribus[] {
  const sabio = mezclar(BANCO_SABIO.filter((q) => q.n >= 2 && q.n <= 9)).slice(0, Math.ceil(TRIBUS.turnos / 2));
  const templo = mezclar(BANCO).slice(0, TRIBUS.turnos - sabio.length);
  // una misma pregunta puede estar en los dos bancos: sale una sola vez
  const vistas = new Set<string>();
  const todas = mezclar([
    ...sabio.map((q) => ({ texto: q.pregunta, correcta: q.correcta, falsas: q.falsas.slice(0, 3), explica: q.explica, ref: q.ref })),
    ...templo.map((q) => ({ texto: q.pregunta, correcta: q.correcta, falsas: [...q.falsas], explica: q.explica, ref: q.ref })),
  ]).filter((q) => {
    const k = q.texto.normalize("NFC").trim().toLowerCase();
    if (vistas.has(k)) return false;
    vistas.add(k);
    return true;
  });
  return todas.map((q) => ({ texto: q.texto, correcta: q.correcta, opciones: mezclar([q.correcta, ...q.falsas]), explica: q.explica, ref: q.ref }));
}

/** Reparte las tribus: cada uno en la que eligió (si cabe), los demás en la más chica, y ninguna queda vacía. */
function repartirTribus(miembros: Miembro[], n: number): Map<number, number> {
  const out = new Map<number, number>();
  const cuantos = Array.from({ length: n }, () => 0);
  for (const m of miembros)
    if (m.equipo != null && m.equipo < n) {
      out.set(m.u, m.equipo);
      cuantos[m.equipo]++;
    }
  for (const m of miembros) {
    if (out.has(m.u)) continue;
    const t = cuantos.indexOf(Math.min(...cuantos));
    out.set(m.u, t);
    cuantos[t]++;
  }
  // ninguna vacía: se pasa uno de la más grande
  for (let t = 0; t < n; t++) {
    if (cuantos[t] > 0) continue;
    const grande = cuantos.indexOf(Math.max(...cuantos));
    const quien = [...out.entries()].reverse().find(([, e]) => e === grande);
    if (!quien || cuantos[grande] < 2) continue;
    out.set(quien[0], t);
    cuantos[grande]--;
    cuantos[t]++;
  }
  return out;
}

function empezarPartida(s: Sala, ahora: number, rapido: boolean): Partida {
  const base = { empezo: ahora, participo: new Set<number>(), rapido };
  switch (s.juego) {
    case "esgrima":
      return { ...empezarEsgrima(ahora), ...base };
    case "tribus": {
      const tribuDe = repartirTribus(s.miembros, s.tribus);
      return {
        juego: "tribus",
        n: s.tribus,
        preguntas: preguntasDeTribus(),
        turno: 1,
        enTurno: 0,
        fase: "pregunta",
        servida: ahora + PREPARAR_MS,
        roboDesde: null,
        revelada: null,
        respTurno: null,
        respRobo: new Map(),
        quitada: null,
        gano: null,
        falloTurno: null,
        puntos: Array.from({ length: s.tribus }, () => 0),
        tribuDe,
        ...base,
      };
    }
    case "quien": {
      const elegidos = mezclar(QUIEN_BANCO.map((_, i) => i)).slice(0, QUIEN.rondas);
      const items = elegidos.map((i) => {
        const otros = mezclar(QUIEN_BANCO.filter((_, j) => j !== i).map((p) => p.nombre)).slice(0, QUIEN.opciones - 1);
        return { i, opciones: mezclar([QUIEN_BANCO[i].nombre, ...otros]) };
      });
      return { juego: "quien", items, ronda: 1, servida: ahora + PREPARAR_MS, revelada: null, resp: new Map(), puntos: new Map(), tiempo: new Map(), ultima: null, ...base };
    }
    case "carrera": {
      const corredores = new Map<number, Corredor>();
      for (const m of s.miembros) {
        // se sale de donde el servidor sabe que está (en el patio)
        const pos = ubicacionDe(m.pj);
        corredores.set(m.u, { siguiente: 0, tiempos: [], ultima: pos ? { x: pos.x, z: pos.z, at: ahora } : null, margen: CARRERA.margenM, salto: false, termino: null });
      }
      return { juego: "carrera", puntos: recorridoDeCarrera(Math.floor(Math.random() * 2 ** 31)), salida: ahora + CARRERA.salidaMs, primero: null, corredores, ...base };
    }
    case "muro":
      return {
        juego: "muro",
        meta: metaDelMuro(s.miembros.length),
        puestas: 0,
        salida: ahora + MURO.salidaMs,
        aportes: new Map(),
        llevando: new Set(),
        ultima: new Map(),
        cumplido: false,
        ...base,
      };
  }
}

// ================================================================ las partidas: los tiempos
/** Lo que dura cada cosa (más corto en las pruebas). */
const revelarMs = (p: Partida) => (p.rapido ? 900 : REVELAR_MS);
const pistaMs = (p: Partida) => (p.rapido ? 1200 : QUIEN.pistaMs);
const rondaQuienMs = (p: Partida) => (p.rapido ? (QUIEN.pistas - 1) * 1200 + 1500 : QUIEN_RONDA_MS);
const despuesDelPrimero = (p: Partida) => (p.rapido ? 8000 : CARRERA.despuesDelPrimeroMs);

/** Dentro de cuánto cambia algo por sí solo (null: nada, hasta que alguien haga algo). */
function proximoCambio(s: Sala, ahora: number): number | null {
  const p = s.partida;
  if (s.estado !== "jugando" || !p) return null;
  const quedan = (t: number) => Math.max(0, t - ahora);
  switch (p.juego) {
    case "esgrima": {
      if (ahora < p.servida) return quedan(p.servida);
      if (p.revelada == null) {
        const fin = p.servida + ESGRIMA.segundos * 1000 + GRACIA_MS;
        return quedan(p.primerAcierto != null ? Math.min(fin, p.primerAcierto + ESGRIMA.ventanaMs) : fin);
      }
      return quedan(p.revelada + revelarMs(p));
    }
    case "tribus": {
      if (ahora < p.servida) return quedan(p.servida);
      if (p.fase === "pregunta") return quedan(p.servida + TRIBUS.segundos * 1000 + GRACIA_MS);
      if (p.fase === "robo") return quedan((p.roboDesde ?? ahora) + TRIBUS.roboSegundos * 1000 + GRACIA_MS);
      return quedan((p.revelada ?? ahora) + revelarMs(p));
    }
    case "quien": {
      if (ahora < p.servida) return quedan(p.servida);
      if (p.revelada == null) {
        const pasados = ahora - p.servida;
        const vistas = Math.min(QUIEN.pistas, 1 + Math.floor(pasados / pistaMs(p)));
        const siguientePista = vistas < QUIEN.pistas ? p.servida + vistas * pistaMs(p) : Infinity;
        return quedan(Math.min(siguientePista, p.servida + rondaQuienMs(p) + GRACIA_MS));
      }
      return quedan(p.revelada + revelarMs(p));
    }
    case "carrera": {
      if (ahora < p.salida) return quedan(p.salida);
      const fin = Math.min(p.salida + CARRERA.limiteMs, p.primero != null ? p.primero + despuesDelPrimero(p) : Infinity);
      return quedan(fin);
    }
    case "muro":
      if (ahora < p.salida) return quedan(p.salida);
      return quedan(p.salida + MURO.ms);
  }
}

/** Las pistas que se ven ahora en «¿Quién soy?» (en las pruebas salen más seguido). */
const pistasAhora = (p: PartidaQuien & Partida, ahora: number) =>
  p.rapido ? Math.max(1, Math.min(QUIEN.pistas, 1 + Math.floor(Math.max(0, ahora - p.servida) / 1200))) : pistasVistas(ahora - p.servida);

// ================================================================ las partidas: avanzar
/**
 * Pone la sala al día con la hora: saca a quienes se fueron hace rato, cierra la ronda que terminó, pasa a la
 * siguiente o termina la partida. Devuelve si cambió algo (para avisar a todos).
 */
function avanzar(s: Sala, ahora: number): boolean {
  let cambio = false;
  // quien no está en la ciudad ni pregunta por la sala hace rato, sale de ella
  const pres = conectados(s);
  for (const m of [...s.miembros]) {
    if (!pres.has(m.u) && ahora - m.visto > AUSENTE_SALA_MS) {
      quitarMiembro(s, m.u, "Saliste de la sala porque no estabas en la ciudad.");
      cambio = true;
    }
  }
  if (!salas.has(s.codigo)) return true;
  const p = s.partida;
  if (s.estado !== "jugando" || !p) return cambio;
  const dentro = new Set(s.miembros.map((m) => m.u));
  // con menos de dos que juegan no hay partida
  if (dentro.size < SALA_MIN) {
    terminar(s, ahora, "Quedó una sola persona en la sala: la partida terminó.");
    return true;
  }
  for (let vueltas = 0; vueltas < 30; vueltas++) {
    const paso = avanzarUnPaso(s, p, ahora, dentro);
    if (!paso) break;
    cambio = true;
    if (s.estado !== "jugando") break;
  }
  return cambio;
}

/** Un paso de la partida (devuelve si cambió algo; se llama hasta que no cambie). */
function avanzarUnPaso(s: Sala, p: Partida, ahora: number, dentro: Set<number>): boolean {
  switch (p.juego) {
    case "esgrima": {
      if (ahora < p.servida) return false;
      if (p.revelada == null) {
        const todos = [...dentro].every((u) => p.resp.has(u));
        const fin = ahora >= p.servida + ESGRIMA.segundos * 1000 + GRACIA_MS || (p.primerAcierto != null && ahora >= p.primerAcierto + ESGRIMA.ventanaMs);
        if (!todos && !fin) return false;
        const it = p.items[p.ronda - 1];
        const aciertos = [...p.resp.values()].filter((r) => r.o === it.correcta).sort((a, b) => a.ms - b.ms);
        aciertos.forEach((r, k) => {
          p.puntos.set(r.u, (p.puntos.get(r.u) ?? 0) + (k === 0 ? ESGRIMA.primero : ESGRIMA.acierto));
          p.tiempo.set(r.u, (p.tiempo.get(r.u) ?? 0) + r.ms);
        });
        p.ultima = { primero: aciertos[0]?.u ?? null, aciertos: aciertos.map((r) => ({ u: r.u, ms: r.ms })), resp: p.resp };
        p.revelada = ahora;
        return true;
      }
      if (ahora < p.revelada + revelarMs(p)) return false;
      if (p.ronda >= p.items.length) {
        terminar(s, ahora);
        return true;
      }
      p.ronda++;
      p.servida = ahora;
      p.revelada = null;
      p.primerAcierto = null;
      p.resp = new Map();
      return true;
    }
    case "tribus": {
      if (ahora < p.servida) return false;
      const conGente = (t: number) => [...dentro].some((u) => p.tribuDe.get(u) === t);
      const q = p.preguntas[p.turno - 1];
      if (p.fase === "pregunta") {
        if (p.respTurno) {
          if (p.respTurno.o === q.correcta) {
            p.gano = { tribu: p.enTurno, como: "turno" };
            p.puntos[p.enTurno] += TRIBUS.puntos;
            p.fase = "revelar";
            p.revelada = ahora;
          } else {
            p.falloTurno = p.respTurno.o;
            p.quitada = p.respTurno.o;
            p.fase = "robo";
            p.roboDesde = ahora;
          }
          return true;
        }
        if (ahora >= p.servida + TRIBUS.segundos * 1000 + GRACIA_MS || !conGente(p.enTurno)) {
          p.fase = "robo";
          p.roboDesde = ahora;
          return true;
        }
        return false;
      }
      if (p.fase === "robo") {
        const bien = [...p.respRobo.values()].filter((r) => r.o === q.correcta).sort((a, b) => a.ms - b.ms)[0];
        if (bien) {
          const t = p.tribuDe.get(bien.u) ?? 0;
          p.gano = { tribu: t, como: "robo" };
          p.puntos[t] += TRIBUS.puntosRobo;
          p.fase = "revelar";
          p.revelada = ahora;
          return true;
        }
        const otras = Array.from({ length: p.n }, (_, t) => t).filter((t) => t !== p.enTurno && conGente(t));
        const todas = otras.every((t) => p.respRobo.has(t));
        if (todas || ahora >= (p.roboDesde ?? ahora) + TRIBUS.roboSegundos * 1000 + GRACIA_MS) {
          p.gano = null;
          p.fase = "revelar";
          p.revelada = ahora;
          return true;
        }
        return false;
      }
      // revelar: después de unos segundos, el turno de la tribu que sigue (que tenga gente)
      if (ahora < (p.revelada ?? ahora) + revelarMs(p)) return false;
      if (p.turno >= Math.min(TRIBUS.turnos, p.preguntas.length) || Array.from({ length: p.n }, (_, t) => t).filter(conGente).length < 2) {
        terminar(s, ahora);
        return true;
      }
      p.turno++;
      let sig = p.enTurno;
      for (let k = 0; k < p.n; k++) {
        sig = (sig + 1) % p.n;
        if (conGente(sig)) break;
      }
      p.enTurno = sig;
      p.fase = "pregunta";
      p.servida = ahora;
      p.roboDesde = null;
      p.revelada = null;
      p.respTurno = null;
      p.respRobo = new Map();
      p.quitada = null;
      p.gano = null;
      p.falloTurno = null;
      return true;
    }
    case "quien": {
      if (ahora < p.servida) return false;
      if (p.revelada == null) {
        const todos = [...dentro].every((u) => p.resp.has(u));
        if (!todos && ahora < p.servida + rondaQuienMs(p) + GRACIA_MS) return false;
        const nombre = QUIEN_BANCO[p.items[p.ronda - 1].i].nombre;
        for (const r of p.resp.values())
          if (r.o === nombre) {
            p.puntos.set(r.u, (p.puntos.get(r.u) ?? 0) + puntosQuien(r.pistas));
            p.tiempo.set(r.u, (p.tiempo.get(r.u) ?? 0) + r.ms);
          }
        p.ultima = p.resp;
        p.revelada = ahora;
        return true;
      }
      if (ahora < p.revelada + revelarMs(p)) return false;
      if (p.ronda >= p.items.length) {
        terminar(s, ahora);
        return true;
      }
      p.ronda++;
      p.servida = ahora;
      p.revelada = null;
      p.resp = new Map();
      return true;
    }
    case "carrera": {
      if (ahora < p.salida) return false;
      const quedan = [...dentro].filter((u) => p.corredores.get(u)?.termino == null);
      const fin = ahora >= p.salida + CARRERA.limiteMs || (p.primero != null && ahora >= p.primero + despuesDelPrimero(p));
      if (quedan.length && !fin) return false;
      terminar(s, ahora);
      return true;
    }
    case "muro": {
      if (ahora < p.salida) return false;
      if (!p.cumplido && ahora < p.salida + MURO.ms) return false;
      terminar(s, ahora);
      return true;
    }
  }
}

// ================================================================ la carrera y el muro: las posiciones reales
const radioMuro = (x: number, z: number) => {
  const dx = Math.max(TRAMO.x0 - x, 0, x - TRAMO.x1);
  return Math.hypot(dx, z - TRAMO.z);
};

function alMoverse(u: number, _pj: number, x: number, z: number, canal: string, ahora: number) {
  const codigo = salaDe.get(u);
  if (!codigo) return;
  const s = salas.get(codigo);
  const p = s?.partida;
  if (!s || !p || s.estado !== "jugando" || canal === "templo") return;
  if (p.juego === "carrera") {
    const c = p.corredores.get(u);
    if (!c || c.termino != null) return;
    const prev = c.ultima;
    c.ultima = { x, z, at: ahora };
    if (ahora < p.salida) {
      // antes de la señal se espera en el patio: quien sale antes, tiene que volver a la salida
      c.margen = CARRERA.margenM;
      if (!enElPatio(x, z) && !c.salto) {
        c.salto = true;
        emitir(s);
      }
      if (!c.salto) return;
    } else if (prev) {
      c.margen = margenDespues(c.margen, Math.hypot(x - prev.x, z - prev.z), (ahora - Math.max(prev.at, p.salida)) / 1000);
      if (c.margen < 0) {
        c.margen = CARRERA.margenM;
        if (!c.salto) {
          c.salto = true;
          emitir(s);
        }
        return;
      }
    }
    if (c.salto) {
      // para seguir, tiene que volver al último lugar al que llegó (o a la salida)
      const atras = c.siguiente === 0 ? { x: PATIO_SALIDA[0], z: PATIO_SALIDA[1] } : p.puntos[c.siguiente - 1];
      if (Math.hypot(x - atras.x, z - atras.z) <= CARRERA.radio) {
        c.salto = false;
        c.margen = CARRERA.margenM;
        emitir(s);
      }
      return;
    }
    if (ahora < p.salida) return;
    const obj = p.puntos[c.siguiente];
    if (obj && Math.hypot(x - obj.x, z - obj.z) <= CARRERA.radio) {
      c.tiempos.push(ahora - p.salida);
      c.siguiente++;
      p.participo.add(u);
      if (c.siguiente >= p.puntos.length) {
        c.termino = ahora - p.salida;
        if (p.primero == null) p.primero = ahora;
      }
      s.actividad = ahora;
      if (avanzar(s, ahora)) emitir(s, true);
      else emitir(s);
    }
    return;
  }
  if (p.juego === "muro") {
    const prev = p.ultima.get(u);
    const margen = prev && ahora >= p.salida ? margenDespues(prev.margen, Math.hypot(x - prev.x, z - prev.z), (ahora - Math.max(prev.at, p.salida)) / 1000) : CARRERA.margenM;
    p.ultima.set(u, { x, z, at: ahora, margen: margen < 0 ? CARRERA.margenM : margen });
    if (ahora < p.salida || p.cumplido) return;
    // con un salto (o más rápido que una persona) se cae la piedra: no se vale llevarla con «Ir a…»
    if (margen < 0) {
      if (p.llevando.delete(u)) emitir(s);
      return;
    }
    if (!p.llevando.has(u) && Math.hypot(x - CANTERA[0], z - CANTERA[1]) <= MURO.radioCantera) {
      p.llevando.add(u);
      emitir(s);
    } else if (p.llevando.has(u) && radioMuro(x, z) <= MURO.radioTramo) {
      p.llevando.delete(u);
      p.puestas++;
      p.aportes.set(u, (p.aportes.get(u) ?? 0) + 1);
      p.participo.add(u);
      s.actividad = ahora;
      if (p.puestas >= p.meta) {
        p.cumplido = true;
        avanzar(s, ahora);
        emitir(s, true);
      } else emitir(s);
    }
  }
}

// ================================================================ terminar y los premios
function ordenar<T extends { puntos: number; ms: number; entro: number }>(l: T[]): T[] {
  return [...l].sort((a, b) => b.puntos - a.puntos || a.ms - b.ms || a.entro - b.entro);
}

function tribusVista(s: Sala, p: PartidaTribus): TribuVista[] {
  return Array.from({ length: p.n }, (_, t) => ({
    n: t,
    nombre: TRIBUS_EQUIPOS[t].nombre,
    icono: TRIBUS_EQUIPOS[t].icono,
    color: TRIBUS_EQUIPOS[t].color,
    puntos: p.puntos[t],
    miembros: s.miembros.filter((m) => p.tribuDe.get(m.u) === t).map((m) => m.nombre),
  }));
}

/** Arma el resultado (los puestos y quién ganó) y lo muestra; los premios se anotan después en la base. */
function terminar(s: Sala, ahora: number, aviso?: string) {
  const p = s.partida;
  if (!p) return;
  const filas: FilaFinal[] = [];
  let titulo = "";
  let tribus: TribuVista[] | null = null;
  let cumplido: boolean | undefined;
  const fila = (m: Miembro, puesto: number, puntos: number, detalle: string, gano: boolean, tribu: number | null, quiere: number): FilaFinal => ({
    u: m.u, t: m.t, pj: m.pj, nombre: m.nombre, puesto, puntos, detalle, gano, tribu, participo: p.participo.has(m.u), quiere,
  });
  const gozoPorPuesto = (puesto: number, puntos: number) => (puntos > 0 && puesto <= GOZO_PUESTOS.length ? GOZO_PUESTOS[puesto - 1] : GOZO_JUGAR);
  switch (p.juego) {
    case "esgrima":
    case "quien": {
      const l = ordenar(s.miembros.map((m) => ({ m, puntos: p.puntos.get(m.u) ?? 0, ms: p.tiempo.get(m.u) ?? 0, entro: m.entro })));
      l.forEach((x, k) => filas.push(fila(x.m, k + 1, x.puntos, `${x.puntos} ${x.puntos === 1 ? "punto" : "puntos"}`, k === 0 && x.puntos > 0, null, gozoPorPuesto(k + 1, x.puntos))));
      titulo = l[0] && l[0].puntos > 0 ? `¡Ganó ${l[0].m.nombre}!` : "Nadie sumó puntos esta vez.";
      break;
    }
    case "tribus": {
      tribus = tribusVista(s, p);
      const max = Math.max(...p.puntos);
      const arriba = p.puntos.map((x, t) => (x === max ? t : -1)).filter((t) => t >= 0);
      const empate = arriba.length > 1 || max <= 0;
      const orden = [...tribus].sort((a, b) => b.puntos - a.puntos);
      const puestoTribu = new Map(orden.map((t, k) => [t.n, k + 1]));
      for (const m of s.miembros) {
        const t = p.tribuDe.get(m.u) ?? 0;
        const gano = !empate && t === arriba[0];
        const quiere = empate ? (max > 0 && arriba.includes(t) ? GOZO_TRIBU.empate : GOZO_TRIBU.pierde) : gano ? GOZO_TRIBU.gana : GOZO_TRIBU.pierde;
        filas.push(fila(m, puestoTribu.get(t) ?? 1, p.puntos[t], `${TRIBUS_EQUIPOS[t].icono} ${TRIBUS_EQUIPOS[t].nombre}`, gano, t, quiere));
      }
      filas.sort((a, b) => a.puesto - b.puesto);
      titulo = empate ? (max > 0 ? "¡Empate entre tribus!" : "Ninguna tribu sumó puntos.") : `¡Ganó la tribu de ${TRIBUS_EQUIPOS[arriba[0]].nombre}!`;
      break;
    }
    case "carrera": {
      const l = s.miembros
        .map((m) => {
          const c = p.corredores.get(m.u);
          const llego = c?.termino != null;
          return { m, c, llego, puntos: c?.siguiente ?? 0, ms: llego ? c!.termino! : c?.tiempos[c.tiempos.length - 1] ?? Infinity, entro: m.entro };
        })
        .sort((a, b) => Number(b.llego) - Number(a.llego) || b.puntos - a.puntos || a.ms - b.ms || a.entro - b.entro);
      l.forEach((x, k) => {
        const detalle = x.llego ? `llegó en ${(x.ms / 1000).toFixed(1)} s` : `${x.puntos} de ${p.puntos.length} lugares`;
        filas.push(fila(x.m, k + 1, x.puntos, detalle, k === 0 && x.llego, null, x.llego ? gozoPorPuesto(k + 1, 1) : GOZO_JUGAR));
      });
      titulo = l[0]?.llego ? `¡Ganó ${l[0].m.nombre}, como Ahimaas!` : "Nadie llegó al patio a tiempo.";
      break;
    }
    case "muro": {
      cumplido = p.cumplido;
      const l = [...s.miembros].sort((a, b) => (p.aportes.get(b.u) ?? 0) - (p.aportes.get(a.u) ?? 0) || a.entro - b.entro);
      l.forEach((m, k) => {
        const n = p.aportes.get(m.u) ?? 0;
        const ayudo = n >= MURO_APORTE_MIN;
        filas.push(fila(m, k + 1, n, `${n} ${n === 1 ? "piedra" : "piedras"}`, cumplido! && ayudo, null, ayudo ? (cumplido ? GOZO_MURO.levantado : GOZO_MURO.noAlcanzo) : 0));
      });
      titulo = p.cumplido ? `¡Levantaron el muro! ${p.puestas} piedras.` : `Pusieron ${p.puestas} de ${p.meta} piedras: el muro quedó a medias.`;
      break;
    }
  }
  if (aviso) titulo = `${aviso} ${titulo}`;
  if (s.temporizador) clearTimeout(s.temporizador);
  s.temporizador = null;
  s.estado = "fin";
  s.resultado = {
    vista: { juego: p.juego, titulo, puestos: filas.map((f) => ({ puesto: f.puesto, pj: f.pj, nombre: f.nombre, puntos: f.puntos, detalle: f.detalle, gano: f.gano, yo: false, tribu: f.tribu })), tribus, cumplido },
    filas,
    premios: new Map(),
    anotando: true,
  };
  const ms = ahora - p.empezo;
  s.partida = null;
  for (const m of s.miembros) m.listo = false;
  s.actividad = ahora;
  void anotarPremios(s, p.juego, ms, cumplido)
    .catch((err) => console.error("[juegos] premios:", err))
    .finally(() => {
      if (s.resultado) s.resultado.anotando = false;
      if (salas.get(s.codigo) === s) emitir(s, true);
    });
}

/** Anota la partida y reparte los premios (de a una persona: la base de prueba no aguanta muchas consultas a la vez). */
async function anotarPremios(s: Sala, juego: JuegoId, ms: number, cumplido: boolean | undefined) {
  const r = s.resultado!;
  const jugaron = r.filas.filter((f) => f.participo);
  const sinPremio = jugaron.length < 2 ? "Para los premios tienen que jugar al menos dos personas." : null;
  if (!jugaron.length) return;
  const { rows } = await pool.query(`INSERT INTO game_juegos_partidas (juego, jugadores, ms, cumplido) VALUES ($1, $2, $3, $4) RETURNING id`, [
    juego,
    jugaron.length,
    Math.min(2_000_000_000, Math.max(0, Math.round(ms))),
    cumplido ?? null,
  ]);
  const partidaId = Number(rows[0].id);
  const dia = diaClave();
  const prenda = JUEGOS[juego].prenda;
  for (const f of jugaron) {
    try {
      const premio: Premio = { gozo: 0, topeHoy: false, prenda: null, copa: 0, gozoTotal: null, sinPremio };
      if (!sinPremio) {
        await enFila(f.t, async () => {
          const { rows: g } = await pool.query(
            `INSERT INTO game_juegos_grupo (titular, dia, gozo_hoy) VALUES ($1, $2, 0)
             ON CONFLICT (titular) DO UPDATE SET gozo_hoy = CASE WHEN game_juegos_grupo.dia = $2 THEN game_juegos_grupo.gozo_hoy ELSE 0 END, dia = $2, updated_at = now()
             RETURNING gozo_hoy, premios`,
            [f.t, dia],
          );
          const hoy = Number(g[0]?.gozo_hoy || 0);
          const premios = new Set<string>(Array.isArray(g[0]?.premios) ? (g[0].premios as string[]) : []);
          premio.gozo = Math.max(0, Math.min(f.quiere, GOZO_JUEGOS_DIA - hoy));
          premio.topeHoy = f.quiere > 0 && premio.gozo < f.quiere;
          if (f.gano && !premios.has(prenda)) {
            premios.add(prenda);
            premio.prenda = prenda;
            await pool.query(
              `UPDATE game_characters SET armario = CASE WHEN armario @> to_jsonb($2::text) THEN armario ELSE armario || to_jsonb($2::text) END WHERE id = $1`,
              [f.t, prenda],
            );
          }
          await pool.query(`UPDATE game_juegos_grupo SET gozo_hoy = gozo_hoy + $2, premios = $3::jsonb, updated_at = now() WHERE titular = $1`, [
            f.t,
            premio.gozo,
            JSON.stringify([...premios]),
          ]);
        });
        if (premio.gozo) await sumarGozo(f.t, premio.gozo, "juegos");
        await sumarALaCopa(f.pj, "juego");
        premio.copa += 2;
        if (f.gano) {
          await sumarALaCopa(f.pj, "juegoGanado");
          premio.copa += 3;
        }
      }
      await pool.query(
        `INSERT INTO game_juegos_jugadores (partida_id, titular, juego, puesto, puntos, gano, gozo) VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT DO NOTHING`,
        [partidaId, f.t, juego, f.puesto, Math.round(f.puntos), f.gano && !sinPremio, premio.gozo],
      );
      const { rows: gz } = await pool.query(`SELECT gozo FROM game_characters WHERE id = $1`, [f.t]);
      premio.gozoTotal = gz[0] ? Number(gz[0].gozo) : null;
      r.premios.set(f.u, premio);
    } catch (err) {
      console.error("[juegos] premio de", f.t, err);
    }
  }
}

// ================================================================ lo que ve cada uno
function puedeEmpezar(s: Sala, pres: Set<number>): { ok: boolean; motivo: string | null } {
  if (s.estado !== "espera") return { ok: false, motivo: null };
  const def = JUEGOS[s.juego];
  if (s.miembros.length < Math.max(SALA_MIN, def.min)) return { ok: false, motivo: `Hacen falta al menos ${Math.max(SALA_MIN, def.min)} personas para jugar.` };
  const fuera = s.miembros.filter((m) => !pres.has(m.u));
  if (fuera.length) return { ok: false, motivo: `${fuera.map((m) => m.nombre).join(", ")} no ${fuera.length === 1 ? "está" : "están"} en la ciudad.` };
  const faltan = s.miembros.filter((m) => m.u !== s.anfitrion && !m.listo);
  if (faltan.length) return { ok: false, motivo: `Esperando a que estén a punto: ${faltan.map((m) => m.nombre).join(", ")}.` };
  if (s.juego === "tribus" && s.miembros.length < s.tribus) return { ok: false, motivo: `Para ${s.tribus} tribus hacen falta ${s.tribus} personas: elige menos tribus.` };
  if (def.enElPatio) {
    const lejos = s.miembros.filter((m) => {
      const pos = ubicacionDe(m.pj);
      return !pos || pos.canal === "templo" || !enElPatio(pos.x, pos.z);
    });
    if (lejos.length) return { ok: false, motivo: `Para empezar, el grupo entero tiene que estar en el patio. Faltan: ${lejos.map((m) => m.nombre).join(", ")}.` };
  }
  return { ok: true, motivo: null };
}

function partidaVista(s: Sala, u: number, ahora: number): PartidaVista | null {
  const p = s.partida;
  if (!p || s.estado !== "jugando") return null;
  const nombre = (x: number) => s.miembros.find((m) => m.u === x)?.nombre ?? "Alguien";
  const restante = proximoCambio(s, ahora) ?? 0;
  const tabla = (puntos: Map<number, number>, tiempo: Map<number, number>) =>
    ordenar(s.miembros.map((m) => ({ m, puntos: puntos.get(m.u) ?? 0, ms: tiempo.get(m.u) ?? 0, entro: m.entro }))).map((x) => ({
      pj: x.m.pj, nombre: x.m.nombre, puntos: x.puntos, yo: x.m.u === u,
    }));
  switch (p.juego) {
    case "esgrima": {
      const it = p.items[p.ronda - 1];
      const fase = ahora < p.servida ? "preparar" : p.revelada == null ? "pregunta" : "revelar";
      const v = ESGRIMA_BANCO[it.i];
      const mia = p.ultima?.resp.get(u)?.o ?? null;
      return {
        juego: "esgrima",
        ronda: p.ronda,
        rondas: p.items.length,
        fase,
        restanteMs: restante,
        segundos: ESGRIMA.segundos,
        pregunta: fase === "pregunta" ? { modo: it.modo, muestra: it.muestra, opciones: it.opciones } : null,
        miRespuesta: fase === "pregunta" ? p.resp.get(u)?.o ?? null : null,
        respondieron: fase === "pregunta" ? p.resp.size : 0,
        yaAcerto: fase === "pregunta" && p.primerAcierto != null ? nombre([...p.resp.values()].filter((r) => r.o === it.correcta).sort((a, b) => a.ms - b.ms)[0]?.u ?? 0) : null,
        revelado:
          fase === "revelar" && p.ultima
            ? {
                modo: it.modo,
                muestra: it.muestra,
                correcta: it.correcta,
                verso: { text: v.texto, ref: v.ref },
                primero: p.ultima.primero != null ? nombre(p.ultima.primero) : null,
                aciertos: p.ultima.aciertos.map((a) => ({ nombre: nombre(a.u), ms: a.ms })),
                mia,
                bien: mia === it.correcta,
                puntos: p.ultima.primero === u ? ESGRIMA.primero : mia === it.correcta ? ESGRIMA.acierto : 0,
              }
            : null,
        tabla: tabla(p.puntos, p.tiempo),
      };
    }
    case "tribus": {
      const q = p.preguntas[p.turno - 1];
      const fase = ahora < p.servida ? "preparar" : p.fase;
      const mia = p.tribuDe.get(u) ?? null;
      const respMia = mia == null ? null : fase === "pregunta" ? (mia === p.enTurno ? p.respTurno?.o ?? null : null) : fase === "robo" ? p.respRobo.get(mia)?.o ?? null : null;
      const puedo =
        mia != null &&
        ((fase === "pregunta" && mia === p.enTurno && !p.respTurno) || (fase === "robo" && mia !== p.enTurno && !p.respRobo.has(mia)));
      return {
        juego: "tribus",
        turno: p.turno,
        turnos: Math.min(TRIBUS.turnos, p.preguntas.length),
        fase,
        restanteMs: restante,
        segundos: fase === "robo" ? TRIBUS.roboSegundos : TRIBUS.segundos,
        enTurno: p.enTurno,
        miTribu: mia,
        puedoResponder: puedo,
        respondioMiTribu: respMia,
        pregunta:
          fase === "pregunta" || fase === "robo"
            ? { texto: q.texto, opciones: fase === "robo" && p.quitada ? q.opciones.filter((o) => o !== p.quitada) : q.opciones, quitada: fase === "robo" ? p.quitada : null }
            : null,
        revelado: fase === "revelar" ? { texto: q.texto, correcta: q.correcta, explica: q.explica, ref: q.ref, gano: p.gano, falloTurno: p.falloTurno } : null,
        tribus: tribusVista(s, p),
      };
    }
    case "quien": {
      const it = p.items[p.ronda - 1];
      const pers = QUIEN_BANCO[it.i];
      const fase = ahora < p.servida ? "preparar" : p.revelada == null ? "pistas" : "revelar";
      const vistas = fase === "pistas" ? pistasAhora(p, ahora) : fase === "revelar" ? QUIEN.pistas : 0;
      const mia = p.ultima?.get(u) ?? null;
      return {
        juego: "quien",
        ronda: p.ronda,
        rondas: p.items.length,
        fase,
        restanteMs: restante,
        pistas: pers.pistas.slice(0, vistas),
        totalPistas: QUIEN.pistas,
        opciones: fase === "preparar" ? [] : it.opciones,
        miRespuesta: fase === "pistas" ? p.resp.get(u)?.o ?? null : null,
        respondieron: fase === "pistas" ? p.resp.size : 0,
        revelado:
          fase === "revelar" && p.ultima
            ? {
                nombre: pers.nombre,
                verso: pers.verso,
                aciertos: [...p.ultima.values()]
                  .filter((r) => r.o === pers.nombre)
                  .sort((a, b) => a.ms - b.ms)
                  .map((r) => ({ nombre: nombre(r.u), pistas: r.pistas, puntos: puntosQuien(r.pistas) })),
                mia: mia?.o ?? null,
                bien: mia?.o === pers.nombre,
                puntos: mia?.o === pers.nombre ? puntosQuien(mia.pistas) : 0,
              }
            : null,
        tabla: tabla(p.puntos, p.tiempo),
      };
    }
    case "carrera": {
      const c = p.corredores.get(u);
      return {
        juego: "carrera",
        fase: ahora < p.salida ? "preparar" : "corriendo",
        restanteMs: restante,
        puntos: p.puntos.map((l, n) => ({ n, nombre: l.nombre, x: l.x, z: l.z, r: CARRERA.radio })),
        miSiguiente: c?.siguiente ?? 0,
        saltoMio: !!c?.salto,
        miTiempo: c?.termino ?? null,
        corredores: s.miembros
          .map((m) => {
            const k = p.corredores.get(m.u);
            return { pj: m.pj, nombre: m.nombre, siguiente: k?.siguiente ?? 0, tiempo: k?.termino ?? null, yo: m.u === u };
          })
          .sort((a, b) => Number(b.tiempo != null) - Number(a.tiempo != null) || (a.tiempo ?? 0) - (b.tiempo ?? 0) || b.siguiente - a.siguiente),
      };
    }
    case "muro":
      return {
        juego: "muro",
        fase: ahora < p.salida ? "preparar" : "obra",
        restanteMs: restante,
        meta: p.meta,
        puestas: p.puestas,
        llevo: p.llevando.has(u),
        cantera: { x: CANTERA[0], z: CANTERA[1], r: MURO.radioCantera },
        tramo: { x: TRAMO_CENTRO[0], z: TRAMO_CENTRO[1], r: MURO.radioTramo, x0: TRAMO.x0, x1: TRAMO.x1, zMuro: TRAMO.z },
        aportes: s.miembros
          .map((m) => ({ pj: m.pj, nombre: m.nombre, n: p.aportes.get(m.u) ?? 0, yo: m.u === u }))
          .sort((a, b) => b.n - a.n),
      };
  }
}

function vistaPara(s: Sala, u: number, ahora: number, pres = conectados(s)): SalaVista {
  const miembros: MiembroVista[] = s.miembros.map((m) => {
    const pos = ubicacionDe(m.pj);
    return {
      pj: m.pj,
      nombre: m.nombre,
      camino: m.camino,
      listo: m.listo || m.u === s.anfitrion,
      anfitrion: m.u === s.anfitrion,
      equipo: s.partida?.juego === "tribus" ? s.partida.tribuDe.get(m.u) ?? null : m.equipo,
      yo: m.u === u,
      conectado: pres.has(m.u),
      enPatio: !!pos && pos.canal !== "templo" && enElPatio(pos.x, pos.z),
    };
  });
  const frases: FraseVista[] = s.frases.slice(-FRASES_SALA_VISTAS).map((f) => ({ n: f.n, de: f.nombre, texto: f.texto, ...(f.ref ? { ref: f.ref } : {}) }));
  const r = s.resultado;
  return {
    codigo: s.codigo,
    juego: s.juego,
    tribus: s.tribus,
    estado: s.estado,
    ver: s.ver,
    miembros,
    soyAnfitrion: s.anfitrion === u,
    max: SALA_MAX,
    frases,
    puedeEmpezar: puedeEmpezar(s, pres),
    partida: partidaVista(s, u, ahora),
    resultado:
      s.estado === "fin" && r
        ? {
            ...r.vista,
            puestos: r.vista.puestos.map((x) => ({ ...x, yo: r.filas.find((f) => f.pj === x.pj)?.u === u })),
            mio: r.premios.get(u) ?? (r.anotando ? null : r.filas.some((f) => f.u === u && f.participo) ? null : { gozo: 0, topeHoy: false, prenda: null, copa: 0, gozoTotal: null, sinPremio: "No jugaste en esta partida." }),
            anotando: r.anotando,
          }
        : null,
    proximoMs: proximoCambio(s, ahora),
  };
}

// ================================================================ avisar a todos (de a un aviso por cambio, juntos si llegan seguidos)
function enviarATodos(s: Sala) {
  if (salas.get(s.codigo) !== s) return;
  const ahora = Date.now();
  const pres = conectados(s);
  for (const m of s.miembros) avisarA(m.u, { t: "sala", v: vistaPara(s, m.u, ahora, pres) });
  programar(s, ahora);
}

function emitir(s: Sala, ya = false) {
  s.ver++;
  if (s.emision && !ya) return;
  if (s.emision) clearTimeout(s.emision);
  s.emision = setTimeout(() => {
    s.emision = null;
    enviarATodos(s);
  }, ya ? 0 : 120);
  s.emision.unref?.();
}

/** El temporizador de la sala: en el próximo cambio de fase, la pone al día y avisa. */
function programar(s: Sala, ahora: number) {
  if (s.temporizador) clearTimeout(s.temporizador);
  s.temporizador = null;
  const ms = proximoCambio(s, ahora);
  if (ms == null) return;
  s.temporizador = setTimeout(() => {
    s.temporizador = null;
    if (salas.get(s.codigo) !== s) return;
    // en cada momento esperado cambia lo que se ve (sale la pregunta, otra pista, se cierra la ronda…): se avisa siempre
    avanzar(s, Date.now());
    emitir(s, true);
  }, Math.max(40, ms + 25));
  s.temporizador.unref?.();
}

// ================================================================ entrar y salir
function quitarMiembro(s: Sala, u: number, motivo: string | null) {
  const i = s.miembros.findIndex((m) => m.u === u);
  if (i < 0) return;
  s.miembros.splice(i, 1);
  if (salaDe.get(u) === s.codigo) salaDe.delete(u);
  const p = s.partida;
  if (p?.juego === "muro") p.llevando.delete(u);
  if (s.anfitrion === u && s.miembros.length) s.anfitrion = s.miembros[0].u;
  if (motivo) avisarA(u, { t: "sala", v: null, motivo });
  if (!s.miembros.length) {
    borrarSala(s);
    return;
  }
  s.actividad = Date.now();
  emitir(s);
}

function borrarSala(s: Sala) {
  if (s.temporizador) clearTimeout(s.temporizador);
  if (s.emision) clearTimeout(s.emision);
  s.temporizador = s.emision = null;
  for (const m of s.miembros) if (salaDe.get(m.u) === s.codigo) salaDe.delete(m.u);
  if (salas.get(s.codigo) === s) salas.delete(s.codigo);
}

/** Cierra las salas quietas o vacías (se llama con cada petición: no hay nada corriendo de fondo). */
function barrer(ahora: number) {
  for (const s of [...salas.values()]) {
    if (!s.miembros.length || ahora - s.actividad > SALA_QUIETA_MS) {
      for (const m of s.miembros) avisarA(m.u, { t: "sala", v: null, motivo: "La sala se cerró porque nadie jugaba." });
      borrarSala(s);
    }
  }
}

async function hayBloqueo(u: number, otros: number[]): Promise<boolean> {
  if (!otros.length) return false;
  const { rows } = await pool.query(
    `SELECT 1 FROM user_blocks WHERE (blocker_id = $1 AND blocked_id = ANY($2::int[])) OR (blocked_id = $1 AND blocker_id = ANY($2::int[])) LIMIT 1`,
    [u, otros],
  );
  return rows.length > 0;
}

/** Si la persona recibe invitaciones (el interruptor de llamadas, retos e invitaciones; sin fila, sí). */
async function aceptaInvitaciones(cuenta: number): Promise<boolean> {
  const { rows } = await pool.query(
    `SELECT COALESCE(s.llamadas, true) AS si FROM (SELECT MIN(id) AS t FROM game_characters WHERE user_id = $1 AND game = $2) x
       LEFT JOIN game_sabio s ON s.character_id = x.t`,
    [cuenta, JERUSALEN_JUEGO],
  );
  return rows[0]?.si !== false;
}

// ================================================================ las rutas
type Persona = { ch: PersonajeFila; titular: number };

export function registerJuegosGrupoRoutes(app: Express) {
  observarPosiciones(alMoverse);
  // si alguien bloquea a otro de su sala, el bloqueado sale (sin decirle por qué)
  observarBloqueos((a, b, bloqueado) => {
    if (!bloqueado) return;
    const ca = salaDe.get(a);
    if (!ca || ca !== salaDe.get(b)) return;
    const s = salas.get(ca);
    if (s) quitarMiembro(s, b, "Saliste de la sala.");
  });

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
  /** Para preguntar por la sala: basta la sesión de una cuenta aprobada (sin buscar el personaje). */
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
      console.error("[juegos]", err);
      if (!res.headersSent) res.sendStatus(500);
    });
  /** Mi sala, puesta al día (y marca que la vi). */
  function miSala(u: number, ahora: number): Sala | null {
    barrer(ahora);
    const c = salaDe.get(u);
    const s = c ? salas.get(c) : undefined;
    if (!s) {
      if (c) salaDe.delete(u);
      return null;
    }
    const m = s.miembros.find((x) => x.u === u);
    if (!m) {
      salaDe.delete(u);
      return null;
    }
    m.visto = ahora;
    if (avanzar(s, ahora)) emitir(s);
    if (!salas.has(s.codigo) || !s.miembros.some((x) => x.u === u)) return null;
    return s;
  }
  const vista = (s: Sala | null, u: number) => (s ? vistaPara(s, u, Date.now()) : null);
  const enLaCiudad = (u: number) => presenciaDe([u]).has(u);
  const miembroNuevo = (pr: Persona, ahora: number): Miembro => ({
    u: pr.ch.user_id, pj: pr.ch.id, t: pr.titular, nombre: nombreDe(pr.ch), camino: pr.ch.camino, listo: false, equipo: null, entro: ahora, visto: ahora,
  });

  // ------------------------------------------------------------ el patio: mi sala, las salas de mis amigos y lo mío
  app.get("/api/jerusalen/juegos", (req, res) =>
    responder(res, async () => {
      const pr = await persona(req, res);
      if (!pr) return;
      const ahora = Date.now();
      const s = miSala(pr.ch.user_id, ahora);
      const r = await relacionesDe(pr.titular, pr.ch.user_id);
      const salasAbiertas: SalaAbierta[] = [];
      for (const x of salas.values()) {
        if (x === s || x.estado === "jugando" || x.miembros.length >= SALA_MAX) continue;
        if (x.miembros.some((m) => r.bloqueados.has(m.u)) || x.sacados.has(pr.ch.user_id)) continue;
        const conocidos = x.miembros.filter((m) => r.amigos.has(m.u) || r.vecinos.has(m.u)).map((m) => m.nombre);
        if (!conocidos.length) continue;
        salasAbiertas.push({ codigo: x.codigo, juego: x.juego, anfitrion: x.miembros.find((m) => m.u === x.anfitrion)?.nombre ?? "", jugadores: x.miembros.length, max: SALA_MAX, conocidos });
        if (salasAbiertas.length >= 8) break;
      }
      const [{ rows: g }, { rows: j }] = await Promise.all([
        pool.query(`SELECT dia, gozo_hoy, premios FROM game_juegos_grupo WHERE titular = $1`, [pr.titular]),
        pool.query(`SELECT juego, count(*)::int AS jugadas, count(*) FILTER (WHERE gano)::int AS ganadas FROM game_juegos_jugadores WHERE titular = $1 GROUP BY juego`, [pr.titular]),
      ]);
      const porJuego = Object.fromEntries(ORDEN_JUEGOS.map((id) => [id, { jugadas: 0, ganadas: 0 }])) as PatioEstado["porJuego"];
      for (const x of j) {
        const id: unknown = x.juego;
        if (esJuego(id)) porJuego[id] = { jugadas: Number(x.jugadas), ganadas: Number(x.ganadas) };
      }
      const out: PatioEstado = {
        sala: vista(s, pr.ch.user_id),
        salas: salasAbiertas,
        hoy: { gozo: g[0]?.dia === diaClave() ? Number(g[0].gozo_hoy || 0) : 0, tope: GOZO_JUEGOS_DIA },
        partidas: Object.values(porJuego).reduce((a, b) => a + b.jugadas, 0),
        ganadas: Object.values(porJuego).reduce((a, b) => a + b.ganadas, 0),
        porJuego,
        prendas: Array.isArray(g[0]?.premios) ? (g[0].premios as string[]) : [],
      };
      res.setHeader("Cache-Control", "no-store");
      res.json(out);
    }),
  );

  // Mi sala (lo pregunta el teléfono de vez en cuando, por si se perdió un aviso de la red).
  app.get("/api/jerusalen/juegos/sala", (req, res) =>
    responder(res, async () => {
      const u = cuentaActiva(req, res);
      if (u === null) return;
      const s = miSala(u, Date.now());
      res.setHeader("Cache-Control", "no-store");
      res.json({ sala: vista(s, u) });
    }),
  );

  // Crear una sala con un juego (quien la crea es el anfitrión).
  app.post("/api/jerusalen/juegos/sala", (req, res) =>
    responder(res, async () => {
      const pr = await persona(req, res);
      if (!pr) return;
      const u = pr.ch.user_id;
      const ahora = Date.now();
      const juego = esJuego(req.body?.juego) ? req.body.juego : "esgrima";
      const ya = miSala(u, ahora);
      if (ya) return res.status(409).json({ message: "Ya estás en una sala: sal de ella para crear otra.", sala: vista(ya, u) });
      if (!enLaCiudad(u)) return res.status(409).json({ message: "Para jugar en el patio, entra a la ciudad de Jerusalén." });
      if (salas.size >= MAX_SALAS) return res.status(503).json({ message: "El patio está lleno ahora. Prueba en un rato." });
      const mias = (creadasDe.get(u) ?? []).filter((t) => ahora - t < 60 * 60_000);
      if (mias.length >= 12) return res.status(429).json({ message: "Creaste muchas salas seguidas. Espera un rato." });
      creadasDe.set(u, [...mias, ahora]);
      if (creadasDe.size > 5000) creadasDe.clear();
      const s: Sala = {
        codigo: nuevoCodigo(),
        juego,
        tribus: 2,
        estado: "espera",
        anfitrion: u,
        miembros: [miembroNuevo(pr, ahora)],
        creada: ahora,
        actividad: ahora,
        ver: 1,
        frases: [],
        fraseN: 0,
        partida: null,
        resultado: null,
        sacados: new Set(),
        temporizador: null,
        emision: null,
      };
      salas.set(s.codigo, s);
      salaDe.set(u, s.codigo);
      res.json({ sala: vista(s, u) });
    }),
  );

  // Unirse con el código (o desde la lista de salas de los amigos, o desde una invitación).
  app.post("/api/jerusalen/juegos/sala/unirme", (req, res) =>
    responder(res, async () => {
      const pr = await persona(req, res);
      if (!pr) return;
      const u = pr.ch.user_id;
      const ahora = Date.now();
      const codigo = limpiarCodigo(req.body?.codigo);
      if (!codigo) return res.status(400).json({ message: "El código tiene 6 letras." });
      const ya = miSala(u, ahora);
      if (ya?.codigo === codigo) return res.json({ sala: vista(ya, u) });
      if (ya) return res.status(409).json({ message: "Ya estás en otra sala: sal de ella primero.", sala: vista(ya, u) });
      // con un bloqueo, o si el anfitrión lo sacó, como si la sala no existiera (no se dice por qué)
      const noEsta = { message: "No encontramos esa sala. Revisa el código." };
      const s = salas.get(codigo);
      if (!s || s.sacados.has(u)) return res.status(404).json(noEsta);
      if (await hayBloqueo(u, s.miembros.map((m) => m.u))) return res.status(404).json(noEsta);
      if (s.estado === "jugando") return res.status(409).json({ message: "En esa sala ya empezó una partida. Espera a que termine e inténtalo otra vez." });
      if (s.miembros.length >= SALA_MAX) return res.status(409).json({ message: `Esa sala ya está llena (${SALA_MAX} personas).` });
      if (!enLaCiudad(u)) return res.status(409).json({ message: "Para jugar en el patio, entra a la ciudad de Jerusalén." });
      // se volvió a mirar después de esperar a la base: puede haber cambiado
      if (salas.get(codigo) !== s || s.miembros.some((m) => m.u === u) || salaDe.has(u)) return res.status(409).json({ message: "Intenta otra vez." });
      s.miembros.push(miembroNuevo(pr, ahora));
      salaDe.set(u, s.codigo);
      s.actividad = ahora;
      emitir(s);
      res.json({ sala: vista(s, u) });
    }),
  );

  // Las acciones de la sala: todas devuelven la sala puesta al día (o el motivo).
  type Accion = (s: Sala, m: Miembro, body: Record<string, unknown>, ahora: number) => Promise<{ error: number; message: string } | void> | { error: number; message: string } | void;
  function accion(ruta: string, fn: Accion, conPersonaje = false) {
    app.post(`/api/jerusalen/juegos/sala/${ruta}`, (req, res) =>
      responder(res, async () => {
        let u: number | null;
        if (conPersonaje) {
          const pr = await persona(req, res);
          u = pr ? pr.ch.user_id : null;
        } else u = cuentaActiva(req, res);
        if (u === null) return;
        const ahora = Date.now();
        const s = miSala(u, ahora);
        if (!s) return res.status(404).json({ message: "Ya no estás en una sala.", sala: null });
        const m = s.miembros.find((x) => x.u === u)!;
        const out = await fn(s, m, (req.body ?? {}) as Record<string, unknown>, ahora);
        if (out) return res.status(out.error).json({ message: out.message, sala: vista(salas.get(s.codigo) ?? null, u) });
        s.actividad = ahora;
        const sigue = salas.get(s.codigo) === s && s.miembros.some((x) => x.u === u);
        res.json({ sala: sigue ? vista(s, u) : null });
      }),
    );
  }

  accion("salir", (s, m) => {
    quitarMiembro(s, m.u, null);
  });

  accion("listo", (s, m, body) => {
    if (s.estado !== "espera") return { error: 409, message: "La partida ya empezó." };
    m.listo = body.listo !== false;
    emitir(s);
  });

  // El anfitrión elige el juego (y cuántas tribus).
  accion("juego", (s, m, body) => {
    if (s.anfitrion !== m.u) return { error: 403, message: "Solo quien creó la sala elige el juego." };
    if (s.estado === "jugando") return { error: 409, message: "Espera a que termine la partida." };
    if (body.juego !== undefined) {
      if (!esJuego(body.juego)) return { error: 400, message: "Ese juego no existe." };
      if (body.juego !== s.juego) for (const x of s.miembros) x.listo = false;
      s.juego = body.juego;
    }
    if (body.tribus !== undefined) {
      const n = Math.floor(Number(body.tribus));
      if (!Number.isFinite(n) || n < TRIBUS.minEquipos || n > TRIBUS.maxEquipos) return { error: 400, message: `Pueden ser de ${TRIBUS.minEquipos} a ${TRIBUS.maxEquipos} tribus.` };
      s.tribus = n;
      for (const x of s.miembros) if (x.equipo != null && x.equipo >= n) x.equipo = null;
    }
    if (s.estado === "fin") {
      s.estado = "espera";
      s.resultado = null;
    }
    emitir(s);
  });

  // Elegir mi tribu (antes de empezar).
  accion("tribu", (s, m, body) => {
    if (s.estado === "jugando") return { error: 409, message: "La partida ya empezó." };
    const t = body.tribu === null ? null : Math.floor(Number(body.tribu));
    if (t !== null && (!Number.isFinite(t) || t < 0 || t >= s.tribus)) return { error: 400, message: "Esa tribu no está en esta partida." };
    m.equipo = t;
    emitir(s);
  });

  // El anfitrión saca a alguien de la sala (no puede volver a esta sala).
  accion("sacar", (s, m, body) => {
    if (s.anfitrion !== m.u) return { error: 403, message: "Solo quien creó la sala puede sacar a alguien." };
    const pj = Number(body.pj);
    const otro = s.miembros.find((x) => x.pj === pj);
    if (!otro) return { error: 404, message: "Esa persona ya no está en la sala." };
    if (otro.u === m.u) return { error: 400, message: "Para irte, usa «Salir»." };
    s.sacados.add(otro.u);
    quitarMiembro(s, otro.u, "Quien creó la sala te sacó de ella.");
  });

  // Una frase fija o un versículo (no hay texto libre en la sala).
  accion("frase", (s, m, body, ahora) => {
    const id = typeof body.id === "string" ? body.id : "";
    const f = fraseDeSala(id);
    if (!f) return { error: 400, message: "Esa frase no existe." };
    const mias = (frasesDe.get(m.u) ?? []).filter((t) => ahora - t < 60_000);
    if (mias.length && ahora - mias[mias.length - 1] < FRASE_SALA_CADA_MS) return { error: 429, message: "Espera un momento entre frase y frase." };
    if (mias.length >= FRASES_SALA_POR_MINUTO) return { error: 429, message: "Muchas frases seguidas. Espera un minuto." };
    frasesDe.set(m.u, [...mias, ahora]);
    if (frasesDe.size > 5000) frasesDe.clear();
    s.frases.push({ n: ++s.fraseN, nombre: m.nombre, texto: f.texto, ref: f.ref, u: m.u });
    if (s.frases.length > 40) s.frases.splice(0, s.frases.length - 40);
    emitir(s);
  });

  // Empezar la partida (el anfitrión, cuando todos están a punto).
  accion("empezar", (s, m, body, ahora) => {
    if (s.anfitrion !== m.u) return { error: 403, message: "Solo quien creó la sala puede empezar." };
    if (s.estado === "jugando") return { error: 409, message: "La partida ya empezó." };
    if (s.estado === "fin") {
      s.estado = "espera";
      s.resultado = null;
    }
    const ok = puedeEmpezar(s, conectados(s));
    if (!ok.ok) return { error: 409, message: ok.motivo ?? "Todavía no se puede empezar." };
    const rapido = !enProduccion() && body.rapido === true;
    s.partida = empezarPartida(s, ahora, rapido);
    s.estado = "jugando";
    s.resultado = null;
    emitir(s, true);
  });

  // Responder (esgrima, tribus y ¿quién soy?): una vez por ronda, en el orden que se mostró.
  accion("responder", (s, m, body, ahora) => {
    const p = s.partida;
    if (s.estado !== "jugando" || !p) return { error: 409, message: "No hay una partida en juego." };
    const opcion = typeof body.opcion === "string" ? normal(body.opcion) : "";
    // por si la ronda se cerró justo ahora (se acabó el tiempo): primero se pone al día
    if (avanzar(s, ahora)) emitir(s, true);
    if (s.partida !== p || s.estado !== "jugando") return { error: 409, message: "Esa ronda ya se cerró." };
    switch (p.juego) {
      case "esgrima": {
        if (ahora < p.servida) return { error: 409, message: "La ronda todavía no empieza." };
        if (p.revelada != null) return { error: 409, message: "Esa ronda ya se cerró." };
        if (p.resp.has(m.u)) return { error: 409, message: "Ya respondiste en esta ronda." };
        const it = p.items[p.ronda - 1];
        if (!it.opciones.includes(opcion)) return { error: 400, message: "Esa respuesta no está entre las opciones." };
        p.resp.set(m.u, { u: m.u, o: opcion, ms: Math.min(ESGRIMA.segundos * 1000, ahora - p.servida) });
        p.participo.add(m.u);
        if (opcion === it.correcta && p.primerAcierto == null) p.primerAcierto = ahora;
        break;
      }
      case "tribus": {
        if (ahora < p.servida) return { error: 409, message: "La pregunta todavía no sale." };
        const t = p.tribuDe.get(m.u);
        if (t == null) return { error: 409, message: "No estás en ninguna tribu de esta partida." };
        const q = p.preguntas[p.turno - 1];
        if (p.fase === "pregunta") {
          if (t !== p.enTurno) return { error: 409, message: `Es el turno de la tribu de ${TRIBUS_EQUIPOS[p.enTurno].nombre}. Si falla, podrás robarla.` };
          if (p.respTurno) return { error: 409, message: "Tu tribu ya respondió." };
          if (!q.opciones.includes(opcion)) return { error: 400, message: "Esa respuesta no está entre las opciones." };
          p.respTurno = { u: m.u, o: opcion, ms: ahora - p.servida };
        } else if (p.fase === "robo") {
          if (t === p.enTurno) return { error: 409, message: "Ahora pueden robarla las otras tribus." };
          if (p.respRobo.has(t)) return { error: 409, message: "Tu tribu ya intentó robarla." };
          if (!q.opciones.includes(opcion) || opcion === p.quitada) return { error: 400, message: "Esa respuesta no está entre las opciones." };
          p.respRobo.set(t, { u: m.u, o: opcion, ms: ahora - (p.roboDesde ?? ahora) });
        } else return { error: 409, message: "Esa pregunta ya se cerró." };
        p.participo.add(m.u);
        break;
      }
      case "quien": {
        if (ahora < p.servida) return { error: 409, message: "La ronda todavía no empieza." };
        if (p.revelada != null) return { error: 409, message: "Esa ronda ya se cerró." };
        if (p.resp.has(m.u)) return { error: 409, message: "Ya respondiste en esta ronda." };
        const it = p.items[p.ronda - 1];
        if (!it.opciones.includes(opcion)) return { error: 400, message: "Esa respuesta no está entre las opciones." };
        p.resp.set(m.u, { u: m.u, o: opcion, ms: ahora - p.servida, pistas: pistasAhora(p, ahora) });
        p.participo.add(m.u);
        break;
      }
      default:
        return { error: 409, message: "En este juego no se responde: se juega caminando por la ciudad." };
    }
    if (avanzar(s, ahora)) emitir(s, true);
    else emitir(s);
  });

  // Otra partida: todos vuelven a la sala de espera (el anfitrión).
  accion("otra", (s, m) => {
    if (s.anfitrion !== m.u) return { error: 403, message: "Solo quien creó la sala puede empezar otra partida." };
    if (s.estado === "jugando") return { error: 409, message: "Todavía se está jugando." };
    s.estado = "espera";
    s.resultado = null;
    for (const x of s.miembros) x.listo = false;
    emitir(s);
  });

  // ------------------------------------------------------------ invitar a amigos y vecinos
  async function invitables(pr: Persona): Promise<(InvitableSala & { u: number })[]> {
    const r = await relacionesDe(pr.titular, pr.ch.user_id);
    const cuentas = [...new Set([...r.vecinos, ...r.amigos])].filter((x) => x !== pr.ch.user_id && !r.bloqueados.has(x) && !salaDe.has(x));
    if (!cuentas.length) return [];
    const enLinea = presenciaDe(cuentas);
    const out: (InvitableSala & { u: number })[] = [];
    for (const [x, p] of enLinea) {
      const relacion = r.vecinos.has(x) && r.amigos.has(x) ? "ambos" : r.amigos.has(x) ? "amigo" : "vecino";
      out.push({ personajeId: p.personajeId, nombre: p.info.nombre, camino: p.info.camino ?? "sacerdocio", donde: dondeEsta(p.canal, p.a), relacion, u: x });
    }
    return out.sort((a, b) => a.nombre.localeCompare(b.nombre, "es")).slice(0, 40);
  }

  app.get("/api/jerusalen/juegos/invitables", (req, res) =>
    responder(res, async () => {
      const pr = await persona(req, res);
      if (!pr) return;
      res.setHeader("Cache-Control", "no-store");
      res.json({ invitables: (await invitables(pr)).map(({ u: _u, ...x }) => x) });
    }),
  );

  app.post("/api/jerusalen/juegos/sala/invitar", (req, res) =>
    responder(res, async () => {
      const pr = await persona(req, res);
      if (!pr) return;
      const u = pr.ch.user_id;
      const ahora = Date.now();
      const s = miSala(u, ahora);
      if (!s) return res.status(404).json({ message: "Primero crea una sala o únete a una." });
      if (s.miembros.length >= SALA_MAX) return res.status(409).json({ message: "La sala ya está llena." });
      const a = Number(req.body?.a);
      if (!Number.isInteger(a) || a <= 0) return res.status(400).json({ message: "Elige a quién invitar." });
      const pos = ubicacionDe(a);
      const noEsta = { message: "Esa persona no está en la ciudad ahora." };
      if (!pos) return res.status(404).json(noEsta);
      if (pos.u === u) return res.status(400).json({ message: "Ese eres tú." });
      const r = await relacionesDe(pr.titular, u);
      // con un bloqueo, como si no estuviera
      if (r.bloqueados.has(pos.u) || (await hayBloqueo(pos.u, s.miembros.map((m) => m.u)))) return res.status(404).json(noEsta);
      if (!r.vecinos.has(pos.u) && !r.amigos.has(pos.u)) return res.status(403).json({ message: "Solo puedes invitar a tus amistades y a la gente de tu barrio." });
      if (salaDe.has(pos.u)) return res.status(409).json({ message: `${pos.nombre} ya está en una sala.` });
      if (!(await aceptaInvitaciones(pos.u))) return res.status(403).json({ message: `${pos.nombre} prefiere no recibir invitaciones ahora.` });
      const clave = `${u}:${pos.u}`;
      if (ahora - (invitadas.get(clave) ?? 0) < INVITAR_SALA_CADA_MS) return res.status(429).json({ message: `Ya invitaste a ${pos.nombre}. Espera un momento.` });
      const mias = (invitacionesDe.get(u) ?? []).filter((t) => ahora - t < 60_000);
      if (mias.length >= INVITACIONES_SALA_POR_MINUTO) return res.status(429).json({ message: "Muchas invitaciones seguidas. Espera un minuto." });
      const llego = avisarA(pos.u, { t: "sala-invitacion", i: { codigo: s.codigo, juego: s.juego, de: nombreDe(pr.ch), camino: pr.ch.camino, restantes: INVITACION_SALA_S } });
      if (!llego) return res.status(404).json(noEsta);
      invitadas.set(clave, ahora);
      if (invitadas.size > 5000) invitadas.clear();
      invitacionesDe.set(u, [...mias, ahora]);
      if (invitacionesDe.size > 5000) invitacionesDe.clear();
      res.json({ ok: true, nombre: pos.nombre });
    }),
  );

  // ------------------------------------------------------------ solo fuera de producción: para las pruebas
  app.post("/api/jerusalen/juegos/prueba", (req, res) =>
    responder(res, async () => {
      if (enProduccion()) return res.sendStatus(404);
      const u = cuentaActiva(req, res);
      if (u === null) return;
      const s = miSala(u, Date.now());
      const p = s?.partida;
      if (!s || !p) return res.status(404).json({ message: "No hay partida." });
      const b = (req.body ?? {}) as { meta?: unknown; rapido?: unknown };
      if (p.juego === "muro" && Number.isInteger(b.meta) && Number(b.meta) > 0) p.meta = Number(b.meta);
      if (b.rapido === true) p.rapido = true;
      emitir(s, true);
      res.json({ sala: vista(s, u) });
    }),
  );
}
