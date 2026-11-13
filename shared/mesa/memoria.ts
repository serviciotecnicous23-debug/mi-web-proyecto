/**
 * La memoria bíblica (1 a 6): parejas de un personaje y su versículo, con las cartas boca abajo.
 *
 * - En su turno cada uno da vuelta dos cartas. Si son pareja (el personaje y su versículo), se las lleva y vuelve a
 *   jugar; si no, todos las ven un momento y se vuelven a tapar, y le toca al siguiente.
 * - Gana quien junta más parejas. Solo, se juega contra el reloj y se cuentan los intentos.
 * - Lo que está boca abajo nunca sale del servidor. Los compañeros de la computadora solo recuerdan lo que todos vieron
 *   (el fácil se olvida pronto; el difícil casi nunca).
 */
import {
  anotar, copiar, entero, entre, mal, mezclaFija, mezclar, pensar, puestosPor,
  type Aplicado, type Azar, type ConEventos, type ConfigMesa, type FinMesa, type ModuloMesa, type Nivel,
} from "./comun";
import type { Verso } from "../ciudad";

/** Cada pareja: el personaje (con el dibujo de la lotería que lo recuerda) y su versículo. */
export type Pareja = { id: string; nombre: string; figura: string; verso: Verso };

export const PAREJAS: Pareja[] = [
  { id: "noe", nombre: "Noé", figura: "noe", verso: { text: "Y lo hizo así Noé; hizo conforme a todo lo que Dios le mandó.", ref: "Génesis 6:22" } },
  { id: "abraham", nombre: "Abraham", figura: "estrella", verso: { text: "Y creyó a Jehová, y le fue contado por justicia.", ref: "Génesis 15:6" } },
  { id: "moises", nombre: "Moisés", figura: "moises", verso: { text: "Ven, por tanto, ahora, y te enviaré a Faraón, para que saques de Egipto a mi pueblo, los hijos de Israel.", ref: "Éxodo 3:10" } },
  { id: "david", nombre: "David", figura: "david", verso: { text: "Jehová es mi pastor; nada me faltará.", ref: "Salmos 23:1" } },
  { id: "daniel", nombre: "Daniel", figura: "leon", verso: { text: "Y Daniel propuso en su corazón no contaminarse con la porción de la comida del rey,", ref: "Daniel 1:8" } },
  { id: "jonas", nombre: "Jonás", figura: "gran-pez", verso: { text: "Entonces oró Jonás a Jehová su Dios desde el vientre del pez,", ref: "Jonás 2:1" } },
  { id: "ester", nombre: "Ester", figura: "ester", verso: { text: "¿Y quién sabe si para esta hora has llegado al reino?", ref: "Ester 4:14" } },
  { id: "rut", nombre: "Rut", figura: "rut", verso: { text: "porque a dondequiera que tú fueres, iré yo, y dondequiera que vivieres, viviré.", ref: "Rut 1:16" } },
  { id: "jose", nombre: "José", figura: "tunica", verso: { text: "Dijo además Faraón a José: He aquí yo te he puesto sobre toda la tierra de Egipto.", ref: "Génesis 41:41" } },
  { id: "samuel", nombre: "Samuel", figura: "samuel", verso: { text: "Habla, porque tu siervo oye.", ref: "1 Samuel 3:10" } },
  { id: "elias", nombre: "Elías", figura: "cuervo", verso: { text: "y Elías subió al cielo en un torbellino.", ref: "2 Reyes 2:11" } },
  { id: "salomon", nombre: "Salomón", figura: "corona", verso: { text: "Da, pues, a tu siervo corazón entendido para juzgar a tu pueblo, y para discernir entre lo bueno y lo malo;", ref: "1 Reyes 3:9" } },
  { id: "pedro", nombre: "Pedro", figura: "red", verso: { text: "Respondiendo Simón Pedro, dijo: Tú eres el Cristo, el Hijo del Dios viviente.", ref: "Mateo 16:16" } },
  { id: "pablo", nombre: "Pablo", figura: "rollo", verso: { text: "Todo lo puedo en Cristo que me fortalece.", ref: "Filipenses 4:13" } },
  { id: "zaqueo", nombre: "Zaqueo", figura: "zaqueo", verso: { text: "He aquí, Señor, la mitad de mis bienes doy a los pobres;", ref: "Lucas 19:8" } },
  { id: "gedeon", nombre: "Gedeón", figura: "cantaro", verso: { text: "Jehová está contigo, varón esforzado y valiente.", ref: "Jueces 6:12" } },
  { id: "josue", nombre: "Josué", figura: "murallas", verso: { text: "Mira que te mando que te esfuerces y seas valiente; no temas ni desmayes, porque Jehová tu Dios estará contigo en dondequiera que vayas.", ref: "Josué 1:9" } },
  { id: "samaritano", nombre: "El buen samaritano", figura: "samaritano", verso: { text: "y acercándose, vendó sus heridas, echándoles aceite y vino;", ref: "Lucas 10:34" } },
];

export type TamanoMemoria = "chico" | "grande";
export const TAMANOS_MEMORIA: Record<TamanoMemoria, { nombre: string; parejas: number; columnas: number }> = {
  chico: { nombre: "12 parejas", parejas: 12, columnas: 6 },
  grande: { nombre: "18 parejas", parejas: 18, columnas: 6 },
};
export type OpcionesMemoria = { tamano: TamanoMemoria };

export const MEMORIA = { turnoMs: 20_000, verMs: 1900, prepararMs: 2500, segundaMs: [900, 1700] as [number, number] } as const;

// ---------------------------------------------------------------- el estado
export type CartaMemoria = { par: number; cara: "figura" | "verso" };
export type EvMemoria =
  | { t: "voltea"; a: number; c: number; par: number; cara: "figura" | "verso" }
  | { t: "pareja"; a: number; c: [number, number]; par: number }
  | { t: "tapa"; c: [number, number] }
  | { t: "turno"; a: number }
  | { t: "fin" };

export type EstadoMemoria = ConEventos<EvMemoria> & {
  juego: "memoria";
  n: number;
  bots: (Nivel | null)[];
  tamano: TamanoMemoria;
  cartas: CartaMemoria[];
  /** Quién se llevó cada carta (null = sigue en la mesa). */
  tomada: (number | null)[];
  abiertas: number[];
  /** Cuándo se tapan las dos que no eran pareja. */
  taparEn: number | null;
  turno: number;
  turnoHasta: number;
  botEn: number | null;
  ausente: number[];
  puntos: number[];
  intentos: number[];
  /** Cuántas veces se ha dado vuelta una carta, y la última vez que se vio cada una (para la memoria de los compañeros). */
  vueltas: number;
  vistaEn: (number | null)[];
  fase: "preparar" | "jugando" | "fin";
  empiezaEn: number;
  terminoAt: number | null;
};

export type JugadaMemoria = { t: "voltear"; c: number };

export type MemoriaVista = {
  juego: "memoria";
  fase: EstadoMemoria["fase"];
  turno: number;
  yo: number | null;
  columnas: number;
  /** Cada carta: boca abajo (sin nada), abierta o ya tomada (con su pareja y su cara). */
  cartas: ({ estado: "oculta" } | { estado: "abierta" | "tomada"; par: number; cara: "figura" | "verso"; de: number | null })[];
  restanteMs: number;
  turnoMs: number;
  puntos: number[];
  intentos: number[];
  /** Milisegundos de juego (para el reloj de quien juega solo). */
  jugadoMs: number;
  eventos: EstadoMemoria["eventos"];
};

// ---------------------------------------------------------------- la memoria de los compañeros
const RECUERDA: Record<Nivel, { base: number; olvido: number }> = {
  facil: { base: 0.55, olvido: 0.84 },
  normal: { base: 0.82, olvido: 0.93 },
  dificil: { base: 0.97, olvido: 0.995 },
};

/** Lo que este compañero recuerda de la mesa: hoyo → pareja (solo lo que todos vieron). */
function recuerdos(e: EstadoMemoria, a: number, nivel: Nivel): Map<number, number> {
  const r = RECUERDA[nivel];
  const out = new Map<number, number>();
  e.cartas.forEach((c, i) => {
    const visto = e.vistaEn[i];
    if (visto == null || e.tomada[i] != null || e.abiertas.includes(i)) return;
    const p = r.base * r.olvido ** Math.max(0, e.vueltas - visto);
    if (mezclaFija(a, i, visto, 7) < p) out.set(i, c.par);
  });
  return out;
}

export function decidirMemoria(e: EstadoMemoria, a: number, nivel: Nivel, azar: Azar): number | null {
  const libres = e.cartas.map((_, i) => i).filter((i) => e.tomada[i] == null && !e.abiertas.includes(i));
  if (!libres.length) return null;
  const sabe = recuerdos(e, a, nivel);
  const nunca = libres.filter((i) => e.vistaEn[i] == null);
  const desconocidas = libres.filter((i) => !sabe.has(i));
  const alAzar = (l: number[]) => (l.length ? l[entero(azar, l.length)] : libres[entero(azar, libres.length)]);
  if (nivel === "facil" && azar() < 0.12) return alAzar(libres);
  if (e.abiertas.length === 1) {
    const par = e.cartas[e.abiertas[0]].par;
    for (const [i, p] of sabe) if (p === par) return i;
    return alAzar(nunca.length ? nunca : desconocidas);
  }
  // una pareja que ya conoce entera
  const porPar = new Map<number, number[]>();
  for (const [i, p] of sabe) porPar.set(p, [...(porPar.get(p) ?? []), i]);
  for (const l of porPar.values()) if (l.length >= 2) return l[0];
  return alAzar(nunca.length ? nunca : desconocidas);
}

// ---------------------------------------------------------------- jugar
function voltear(e: EstadoMemoria, a: number, c: number, t: number, azar: Azar): string | null {
  if (e.taparEn != null) return "Espera a que se tapen las cartas.";
  if (!Number.isInteger(c) || c < 0 || c >= e.cartas.length) return "Esa carta no existe.";
  if (e.tomada[c] != null) return "Esa pareja ya se la llevaron.";
  if (e.abiertas.includes(c)) return "Esa carta ya está abierta.";
  e.abiertas.push(c);
  e.vueltas += 1;
  e.vistaEn[c] = e.vueltas;
  anotar(e, t, { t: "voltea", a, c, par: e.cartas[c].par, cara: e.cartas[c].cara });
  if (e.abiertas.length < 2) {
    e.turnoHasta = t + MEMORIA.turnoMs;
    const nivel = e.bots[a];
    e.botEn = nivel ? t + Math.round(entre(azar, ...MEMORIA.segundaMs)) : e.ausente[a] >= 2 ? t + 900 : null;
    return null;
  }
  e.intentos[a] += 1;
  const [x, y] = e.abiertas as [number, number];
  if (e.cartas[x].par === e.cartas[y].par) {
    e.tomada[x] = a;
    e.tomada[y] = a;
    e.puntos[a] += 1;
    e.abiertas = [];
    anotar(e, t, { t: "pareja", a, c: [x, y], par: e.cartas[x].par });
    if (e.tomada.every((q) => q != null)) {
      terminar(e, t + 900);
      return null;
    }
    // vuelve a jugar
    e.turnoHasta = t + 900 + MEMORIA.turnoMs;
    const nivel = e.bots[a];
    e.botEn = nivel ? t + 900 + pensar(nivel, azar, 0.8) : e.ausente[a] >= 2 ? t + 1500 : null;
    return null;
  }
  e.taparEn = t + MEMORIA.verMs;
  e.botEn = null;
  e.turnoHasta = e.taparEn + MEMORIA.turnoMs;
  return null;
}

function tapar(e: EstadoMemoria, t: number, azar: Azar) {
  const [x, y] = e.abiertas as [number, number];
  e.abiertas = [];
  e.taparEn = null;
  anotar(e, t, { t: "tapa", c: [x, y] });
  e.turno = (e.turno + 1) % e.n;
  e.turnoHasta = t + MEMORIA.turnoMs;
  const nivel = e.bots[e.turno];
  e.botEn = nivel ? t + pensar(nivel, azar, 0.8) : e.ausente[e.turno] >= 2 ? t + 900 : null;
  anotar(e, t, { t: "turno", a: e.turno });
}

function terminar(e: EstadoMemoria, t: number) {
  e.fase = "fin";
  e.terminoAt = t;
  e.botEn = null;
  e.taparEn = null;
  anotar(e, t, { t: "fin" });
}

function correr(e: EstadoMemoria, ahora: number, azar: Azar): boolean {
  let cambio = false;
  for (let vueltas = 0; vueltas < 400 && e.fase !== "fin"; vueltas++) {
    if (e.fase === "preparar") {
      if (ahora < e.empiezaEn) break;
      e.fase = "jugando";
      e.turnoHasta = e.empiezaEn + MEMORIA.turnoMs;
      const nivel = e.bots[e.turno];
      e.botEn = nivel ? e.empiezaEn + pensar(nivel, azar, 0.8) : null;
      anotar(e, e.empiezaEn, { t: "turno", a: e.turno });
      cambio = true;
      continue;
    }
    if (e.taparEn != null) {
      if (e.taparEn > ahora) break;
      tapar(e, e.taparEn, azar);
      cambio = true;
      continue;
    }
    const en = Math.min(e.botEn ?? Infinity, e.turnoHasta);
    if (en > ahora) break;
    cambio = true;
    const a = e.turno;
    const porBot = e.botEn != null && e.botEn <= e.turnoHasta;
    if (!porBot) e.ausente[a] += 1;
    const c = decidirMemoria(e, a, porBot ? e.bots[a] ?? "normal" : "facil", azar);
    if (c == null) {
      terminar(e, en);
      break;
    }
    voltear(e, a, c, en, azar);
  }
  return cambio;
}

export const memoria: ModuloMesa<EstadoMemoria, JugadaMemoria, MemoriaVista, OpcionesMemoria> & {
  vistaPara(e: EstadoMemoria, asiento: number | null, ahora: number): MemoriaVista;
  jugadaDeBot(e: EstadoMemoria, asiento: number, nivel: Nivel, azar: Azar): JugadaMemoria | null;
} = {
  id: "memoria",
  min: 1,
  max: 6,

  estadoInicial(cfg: ConfigMesa<OpcionesMemoria>, azar: Azar, ahora: number): EstadoMemoria {
    const n = cfg.bots.length;
    const tamano: TamanoMemoria = cfg.opciones?.tamano === "grande" ? "grande" : "chico";
    const pares = mezclar(PAREJAS.map((_, i) => i), azar).slice(0, TAMANOS_MEMORIA[tamano].parejas);
    const cartas = mezclar(
      pares.flatMap((par) => [
        { par, cara: "figura" as const },
        { par, cara: "verso" as const },
      ]),
      azar,
    );
    return {
      juego: "memoria",
      n,
      bots: [...cfg.bots],
      tamano,
      cartas,
      tomada: new Array(cartas.length).fill(null),
      abiertas: [],
      taparEn: null,
      turno: entero(azar, n),
      turnoHasta: ahora + MEMORIA.prepararMs + MEMORIA.turnoMs,
      botEn: null,
      ausente: new Array<number>(n).fill(0),
      puntos: new Array<number>(n).fill(0),
      intentos: new Array<number>(n).fill(0),
      vueltas: 0,
      vistaEn: new Array(cartas.length).fill(null),
      fase: "preparar",
      empiezaEn: ahora + MEMORIA.prepararMs,
      terminoAt: null,
      ev: 0,
      eventos: [],
    };
  },

  turnoDe: (e) => (e.fase === "jugando" && e.taparEn == null ? e.turno : null),

  jugadasValidas(e, a) {
    if (e.fase !== "jugando" || a !== e.turno || e.taparEn != null) return [];
    return e.cartas.map((_, c) => c).filter((c) => e.tomada[c] == null && !e.abiertas.includes(c)).map((c) => ({ t: "voltear", c }));
  },

  leerJugada(x) {
    if (!x || typeof x !== "object") return null;
    const o = x as Record<string, unknown>;
    return o.t === "voltear" && typeof o.c === "number" && Number.isInteger(o.c) && o.c >= 0 && o.c < 64 ? { t: "voltear", c: o.c } : null;
  },

  aplicar(e0, a, j, ahora, azar): Aplicado<EstadoMemoria> {
    const e = copiar(e0);
    correr(e, ahora, azar);
    if (e.fase !== "jugando") return mal(e.fase === "fin" ? "La partida terminó." : "Todavía no empieza.");
    if (a !== e.turno) return mal("No es tu turno.");
    const motivo = voltear(e, a, j.c, ahora, azar);
    if (motivo) return mal(motivo);
    e.ausente[a] = 0;
    return { ok: true, e };
  },

  alTiempo(e0, ahora, azar) {
    const p = this.proximoCambio(e0, ahora);
    if (p == null || p > 0) return null;
    const e = copiar(e0);
    return correr(e, ahora, azar) ? e : null;
  },

  proximoCambio(e, ahora) {
    if (e.fase === "fin") return null;
    if (e.fase === "preparar") return Math.max(0, e.empiezaEn - ahora);
    if (e.taparEn != null) return Math.max(0, e.taparEn - ahora);
    return Math.max(0, Math.min(e.botEn ?? Infinity, e.turnoHasta) - ahora);
  },

  terminado(e): FinMesa | null {
    if (e.fase !== "fin") return null;
    // más parejas gana; si empatan, quien necesitó menos intentos
    const puestos = puestosPor(e.puntos, e.intentos.map((x) => -x));
    const top = Math.max(...e.puntos);
    const primeros = puestos.map((p, a) => (p === 1 ? a : -1)).filter((a) => a >= 0);
    const titulo =
      e.n === 1
        ? `¡Todas las parejas en ${e.intentos[0]} intentos!`
        : primeros.length === 1
          ? `¡Ganó @${primeros[0]} con ${top} ${top === 1 ? "pareja" : "parejas"}!`
          : `¡Empate! ${primeros.map((a) => `@${a}`).join(" y ")}.`;
    return { puestos, puntos: [...e.puntos], titulo, detalle: e.puntos.map((p, a) => `${p} ${p === 1 ? "pareja" : "parejas"} · ${e.intentos[a]} intentos`) };
  },

  ponerBot(e0, a, nivel) {
    const e = copiar(e0);
    e.bots[a] = nivel;
    if (!nivel) e.ausente[a] = 0;
    return e;
  },

  vistaPara(e, yo, ahora): MemoriaVista {
    return {
      juego: "memoria",
      fase: e.fase,
      turno: e.turno,
      yo: yo != null && yo >= 0 && yo < e.n ? yo : null,
      columnas: TAMANOS_MEMORIA[e.tamano].columnas,
      cartas: e.cartas.map((c, i) =>
        e.tomada[i] != null
          ? { estado: "tomada" as const, par: c.par, cara: c.cara, de: e.tomada[i] }
          : e.abiertas.includes(i)
            ? { estado: "abierta" as const, par: c.par, cara: c.cara, de: null }
            : { estado: "oculta" as const },
      ),
      restanteMs:
        e.fase === "jugando" ? Math.max(0, (e.taparEn ?? e.turnoHasta) - ahora) : e.fase === "preparar" ? Math.max(0, e.empiezaEn - ahora) : 0,
      turnoMs: MEMORIA.turnoMs,
      puntos: [...e.puntos],
      intentos: [...e.intentos],
      jugadoMs: Math.max(0, (e.terminoAt ?? ahora) - e.empiezaEn),
      eventos: e.eventos,
    };
  },

  jugadaDeBot(e, a, nivel, azar) {
    if (e.fase !== "jugando" || a !== e.turno || e.taparEn != null) return null;
    const c = decidirMemoria(e, a, nivel, azar);
    return c == null ? null : { t: "voltear", c };
  },
};
