/**
 * Las escaleras de Jacob (2 a 6): las serpientes y escaleras de siempre, con tema bíblico.
 *
 * - Un tablero de 100 casillas en zigzag. Cada uno tira un dado y avanza; quien cae al pie de una escalera sube por ella
 *   (las escaleras de Jacob: Génesis 28:12, y cada una con una virtud), y quien cae en la cabeza de una serpiente se
 *   desliza hasta su cola (cada caída enseña algo, y Dios levanta al caído: Salmos 145:14).
 * - Para ganar hay que llegar justo a la 100: lo que sobra, se devuelve.
 * - Lo decide el dado del servidor; los compañeros de la computadora solo tiran (con su ritmo).
 */
import {
  anotar, copiar, entero, mal, pensar, puestosPor,
  type Aplicado, type Azar, type ConEventos, type ConfigMesa, type FinMesa, type ModuloMesa, type Nivel,
} from "./comun";
import type { Verso } from "../ciudad";

export const ESCALERAS = { meta: 100, turnoMs: 25_000, prepararMs: 2500, maxTiradas: 600 } as const;

export type Atajo = { id: string; de: number; a: number; titulo: string; leccion: string; verso: Verso };

/** Las escaleras de Jacob: suben (una virtud de la Biblia). */
export const ESCALERAS_JACOB: Atajo[] = [
  { id: "jacob", de: 4, a: 25, titulo: "La escalera de Jacob", leccion: "Dios está contigo aunque duermas sobre una piedra.", verso: { text: "Y soñó: y he aquí una escalera que estaba apoyada en tierra, y su extremo tocaba en el cielo; y he aquí ángeles de Dios que subían y descendían por ella.", ref: "Génesis 28:12" } },
  { id: "jose", de: 9, a: 31, titulo: "José perdona", leccion: "Perdonar abre el camino: Dios encamina a bien lo que otros pensaron mal.", verso: { text: "Vosotros pensasteis mal contra mí, mas Dios lo encaminó a bien, para hacer lo que vemos hoy, para mantener en vida a mucho pueblo.", ref: "Génesis 50:20" } },
  { id: "rut", de: 21, a: 42, titulo: "Rut es fiel", leccion: "Quien es fiel en lo poco, crece bajo las alas de Dios.", verso: { text: "Jehová recompense tu obra, y tu remuneración sea cumplida de parte de Jehová Dios de Israel, bajo cuyas alas has venido a refugiarte.", ref: "Rut 2:12" } },
  { id: "daniel", de: 28, a: 84, titulo: "Daniel ora", leccion: "Orar cada día, aunque cueste, te lleva muy alto.", verso: { text: "se arrodillaba tres veces al día, y oraba y daba gracias delante de su Dios, como lo solía hacer antes.", ref: "Daniel 6:10" } },
  { id: "viuda", de: 36, a: 57, titulo: "La viuda da todo", leccion: "Dar con el corazón vale más que dar mucho.", verso: { text: "porque todos han echado de lo que les sobra; pero ésta, de su pobreza echó todo lo que tenía, todo su sustento.", ref: "Marcos 12:44" } },
  { id: "nehemias", de: 51, a: 67, titulo: "Nehemías edifica", leccion: "Trabajar juntos y con ánimo levanta muros.", verso: { text: "Y dijeron: Levantémonos y edifiquemos. Así esforzaron sus manos para bien.", ref: "Nehemías 2:18" } },
  { id: "david", de: 71, a: 91, titulo: "David confía", leccion: "Cuando tienes miedo, confía en Dios.", verso: { text: "En el día que temo, Yo en ti confío.", ref: "Salmos 56:3" } },
  { id: "pablo", de: 80, a: 99, titulo: "Pablo y Silas cantan", leccion: "Alabar a Dios en la noche más oscura abre puertas.", verso: { text: "Pero a medianoche, orando Pablo y Silas, cantaban himnos a Dios; y los presos los oían.", ref: "Hechos 16:25" } },
];

/** Las serpientes: bajan (una caída de la Biblia y lo que enseña). */
export const SERPIENTES: Atajo[] = [
  { id: "cain", de: 17, a: 7, titulo: "El enojo de Caín", leccion: "El enojo que se guarda hace caer: no dejes que el sol se ponga sobre él.", verso: { text: "Airaos, pero no pequéis; no se ponga el sol sobre vuestro enojo,", ref: "Efesios 4:26" } },
  { id: "esau", de: 54, a: 34, titulo: "Esaú y el guiso", leccion: "No cambies lo valioso por un gusto de un momento.", verso: { text: "Entonces Jacob dio a Esaú pan y del guisado de las lentejas; y él comió y bebió, y se levantó y se fue. Así menospreció Esaú la primogenitura.", ref: "Génesis 25:34" } },
  { id: "babel", de: 62, a: 19, titulo: "La torre de Babel", leccion: "El orgullo va delante de la caída.", verso: { text: "Antes del quebrantamiento es la soberbia, Y antes de la caída la altivez de espíritu.", ref: "Proverbios 16:18" } },
  { id: "jonas", de: 64, a: 60, titulo: "Jonás huye", leccion: "Huir de lo que Dios te pide solo te lleva hacia abajo.", verso: { text: "Y Jonás se levantó para huir de la presencia de Jehová a Tarsis,", ref: "Jonás 1:3" } },
  { id: "sanson", de: 87, a: 24, titulo: "Sansón se descuida", leccion: "Cuida tu corazón: de él mana la vida.", verso: { text: "Sobre toda cosa guardada, guarda tu corazón; Porque de él mana la vida.", ref: "Proverbios 4:23" } },
  { id: "pedro", de: 93, a: 73, titulo: "Pedro niega", leccion: "Nadie está tan firme que no pueda caer: mantente humilde.", verso: { text: "Así que, el que piensa estar firme, mire que no caiga.", ref: "1 Corintios 10:12" } },
  { id: "becerro", de: 95, a: 75, titulo: "El becerro de oro", leccion: "Nada debe ocupar el lugar de Dios.", verso: { text: "Hijitos, guardaos de los ídolos. Amén.", ref: "1 Juan 5:21" } },
  { id: "ananias", de: 98, a: 79, titulo: "Ananías miente", leccion: "La mentira hace caer; la verdad agrada a Dios.", verso: { text: "Los labios mentirosos son abominación a Jehová; Pero los que hacen verdad son su contentamiento.", ref: "Proverbios 12:22" } },
];

/** El consuelo de toda caída. */
export const VERSO_LEVANTA: Verso = { text: "Porque siete veces cae el justo, y vuelve a levantarse;", ref: "Proverbios 24:16" };

const ATAJO_EN = new Map<number, Atajo & { sube: boolean }>([
  ...ESCALERAS_JACOB.map((x) => [x.de, { ...x, sube: true }] as const),
  ...SERPIENTES.map((x) => [x.de, { ...x, sube: false }] as const),
]);
export const atajoEn = (casilla: number) => ATAJO_EN.get(casilla) ?? null;

/** Dónde se dibuja una casilla (1–100) en el tablero de 10 × 10: fila 0 abajo, en zigzag. */
export function celdaDe(casilla: number): { fila: number; col: number } {
  const i = casilla - 1;
  const fila = Math.floor(i / 10);
  const enFila = i % 10;
  return { fila, col: fila % 2 === 0 ? enFila : 9 - enFila };
}

// ---------------------------------------------------------------- el estado
export type EvEscaleras =
  | { t: "dado"; a: number; dado: number; desde: number; camino: number[]; atajo: { id: string; de: number; a: number; sube: boolean } | null; fin: number }
  | { t: "turno"; a: number }
  | { t: "fin" };

export type EstadoEscaleras = ConEventos<EvEscaleras> & {
  juego: "escaleras";
  n: number;
  bots: (Nivel | null)[];
  pos: number[];
  turno: number;
  turnoHasta: number;
  botEn: number | null;
  ausente: number[];
  fase: "preparar" | "jugando" | "fin";
  empiezaEn: number;
  ganador: number | null;
  tiradas: number;
  /** Cuántas escaleras subió y cuántas caídas tuvo cada uno (para el final). */
  subio: number[];
  cayo: number[];
  terminoAt: number | null;
};

export type JugadaEscaleras = { t: "tirar" };

export type EscalerasVista = {
  juego: "escaleras";
  fase: EstadoEscaleras["fase"];
  turno: number;
  yo: number | null;
  pos: number[];
  restanteMs: number;
  turnoMs: number;
  ganador: number | null;
  subio: number[];
  cayo: number[];
  eventos: EstadoEscaleras["eventos"];
};

/** Mueve la ficha: casilla por casilla, rebota si se pasa de 100, y sube o baja si cae en un atajo. */
export function moverEscaleras(desde: number, dado: number): { camino: number[]; atajo: (Atajo & { sube: boolean }) | null; fin: number } {
  const camino: number[] = [];
  let p = desde;
  let dir = 1;
  for (let k = 0; k < dado; k++) {
    if (p + dir > ESCALERAS.meta) dir = -1;
    p += dir;
    camino.push(p);
  }
  const atajo = atajoEn(p);
  return { camino, atajo, fin: atajo ? atajo.a : p };
}

function tirar(e: EstadoEscaleras, t: number, azar: Azar) {
  const a = e.turno;
  const dado = 1 + entero(azar, 6);
  const desde = e.pos[a];
  const m = moverEscaleras(desde, dado);
  e.pos[a] = m.fin;
  e.tiradas += 1;
  if (m.atajo) (m.atajo.sube ? e.subio : e.cayo)[a] += 1;
  anotar(e, t, { t: "dado", a, dado, desde, camino: m.camino, atajo: m.atajo ? { id: m.atajo.id, de: m.atajo.de, a: m.atajo.a, sube: m.atajo.sube } : null, fin: m.fin });
  if (m.fin === ESCALERAS.meta) {
    e.ganador = a;
    terminar(e, t);
    return;
  }
  if (e.tiradas >= ESCALERAS.maxTiradas) {
    terminar(e, t);
    return;
  }
  // el tiempo de la animación: las casillas, y el atajo si lo hay
  const anima = 450 + m.camino.length * 260 + (m.atajo ? 1400 : 0);
  e.turno = (a + 1) % e.n;
  e.turnoHasta = t + anima + ESCALERAS.turnoMs;
  const nivel = e.bots[e.turno];
  e.botEn = nivel ? t + anima + pensar(nivel, azar, 0.6) : e.ausente[e.turno] >= 2 ? t + anima + 700 : null;
  anotar(e, t, { t: "turno", a: e.turno });
}

function terminar(e: EstadoEscaleras, t: number) {
  e.fase = "fin";
  e.terminoAt = t;
  e.botEn = null;
  anotar(e, t, { t: "fin" });
}

function correr(e: EstadoEscaleras, ahora: number, azar: Azar): boolean {
  let cambio = false;
  for (let vueltas = 0; vueltas < 800 && e.fase !== "fin"; vueltas++) {
    if (e.fase === "preparar") {
      if (ahora < e.empiezaEn) break;
      e.fase = "jugando";
      e.turnoHasta = e.empiezaEn + ESCALERAS.turnoMs;
      const nivel = e.bots[e.turno];
      e.botEn = nivel ? e.empiezaEn + pensar(nivel, azar, 0.6) : null;
      anotar(e, e.empiezaEn, { t: "turno", a: e.turno });
      cambio = true;
      continue;
    }
    const en = Math.min(e.botEn ?? Infinity, e.turnoHasta);
    if (en > ahora) break;
    cambio = true;
    if (!(e.botEn != null && e.botEn <= e.turnoHasta)) e.ausente[e.turno] += 1;
    tirar(e, en, azar);
  }
  return cambio;
}

export const escaleras: ModuloMesa<EstadoEscaleras, JugadaEscaleras, EscalerasVista> & {
  vistaPara(e: EstadoEscaleras, asiento: number | null, ahora: number): EscalerasVista;
  jugadaDeBot(e: EstadoEscaleras, asiento: number, nivel: Nivel, azar: Azar): JugadaEscaleras | null;
} = {
  id: "escaleras",
  min: 2,
  max: 6,

  estadoInicial(cfg: ConfigMesa<Record<string, never>>, _azar: Azar, ahora: number): EstadoEscaleras {
    const n = cfg.bots.length;
    return {
      juego: "escaleras",
      n,
      bots: [...cfg.bots],
      pos: new Array<number>(n).fill(0),
      turno: 0,
      turnoHasta: ahora + ESCALERAS.prepararMs + ESCALERAS.turnoMs,
      botEn: null,
      ausente: new Array<number>(n).fill(0),
      fase: "preparar",
      empiezaEn: ahora + ESCALERAS.prepararMs,
      ganador: null,
      tiradas: 0,
      subio: new Array<number>(n).fill(0),
      cayo: new Array<number>(n).fill(0),
      terminoAt: null,
      ev: 0,
      eventos: [],
    };
  },

  turnoDe: (e) => (e.fase === "jugando" ? e.turno : null),
  jugadasValidas: (e, a) => (e.fase === "jugando" && a === e.turno ? [{ t: "tirar" }] : []),
  leerJugada: (x) => (x && typeof x === "object" && (x as { t?: unknown }).t === "tirar" ? { t: "tirar" } : null),

  aplicar(e0, a, _j, ahora, azar): Aplicado<EstadoEscaleras> {
    const e = copiar(e0);
    correr(e, ahora, azar);
    if (e.fase !== "jugando") return mal(e.fase === "fin" ? "La partida terminó." : "Todavía no empieza.");
    if (a !== e.turno) return mal("No es tu turno.");
    e.ausente[a] = 0;
    tirar(e, ahora, azar);
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
    return Math.max(0, Math.min(e.botEn ?? Infinity, e.turnoHasta) - ahora);
  },

  terminado(e): FinMesa | null {
    if (e.fase !== "fin") return null;
    const valor = e.pos.map((p, a) => (a === e.ganador ? 1000 : p));
    const puestos = puestosPor(valor);
    const titulo = e.ganador != null ? `¡@${e.ganador} llegó a la casilla 100!` : "Se acabó el tiempo: gana quien llegó más alto.";
    return { puestos, puntos: [...e.pos], titulo, detalle: e.pos.map((p, a) => (a === e.ganador ? "¡llegó a la 100!" : `casilla ${p}`)) };
  },

  ponerBot(e0, a, nivel) {
    const e = copiar(e0);
    e.bots[a] = nivel;
    if (!nivel) e.ausente[a] = 0;
    return e;
  },

  vistaPara(e, yo, ahora): EscalerasVista {
    return {
      juego: "escaleras",
      fase: e.fase,
      turno: e.turno,
      yo: yo != null && yo >= 0 && yo < e.n ? yo : null,
      pos: [...e.pos],
      restanteMs: e.fase === "jugando" ? Math.max(0, e.turnoHasta - ahora) : e.fase === "preparar" ? Math.max(0, e.empiezaEn - ahora) : 0,
      turnoMs: ESCALERAS.turnoMs,
      ganador: e.ganador,
      subio: [...e.subio],
      cayo: [...e.cayo],
      eventos: e.eventos,
    };
  },

  jugadaDeBot: (e, a) => (e.fase === "jugando" && a === e.turno ? { t: "tirar" } : null),
};
