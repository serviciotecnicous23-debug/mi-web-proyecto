/**
 * «Dibuja y adivina» (1 a 12; en grupo, de 3 en adelante es lo mejor): uno dibuja una palabra de la Biblia y los demás
 * la adivinan eligiendo entre ocho (sin texto libre). Solo, es práctica: dibujar con el reloj.
 *
 * - Cada uno dibuja una vez (como mucho seis rondas). Quien dibuja ve su palabra; los demás ven el dibujo, que llega
 *   trazo por trazo, y ocho palabras para elegir (una vez por ronda).
 * - Adivinar primero vale más (100, 80, 65…); quien dibuja gana 20 por cada uno que adivina. La ronda se cierra cuando
 *   todos eligieron o se acaba el reloj, y entonces se ve la palabra.
 * - Los compañeros de la computadora no dibujan ni adivinan (no hay IA que mire dibujos): si se agregan, solo miran.
 * - La palabra nunca llega a quien adivina antes de cerrar la ronda; de los demás solo se sabe si acertaron, no qué
 *   eligieron.
 */
import {
  anotar, copiar, entero, mal, mezclar, puestosPor,
  type Aplicado, type Azar, type ConEventos, type ConfigMesa, type FinMesa, type ModuloMesa, type Nivel,
} from "./comun";

export const PALABRAS_DIBUJA = [
  "el arca", "la paloma", "el arco iris", "la escalera", "la zarza ardiente", "la corona", "la lámpara", "el gran pez", "el león", "la oveja",
  "el camello", "la estrella", "la luna", "el sol", "el monte", "la barca", "la red", "el pan", "el cántaro", "las uvas",
  "la palmera", "la torre", "el muro", "el templo", "el arpa", "el cuerno", "la honda", "el pozo", "la llave", "la copa",
  "el rollo", "la sandalia", "la cesta", "el gallo", "la nube", "el río", "la puerta", "el árbol", "el asno", "la rana",
  "el pastor", "la tienda", "el candelero", "las tablas de la ley", "la espiga", "el cordero", "el trono", "el yugo",
];

export const DIBUJA = {
  dibujarMs: 75_000,
  practicaMs: 60_000,
  revelarMs: 5500,
  prepararMs: 3500,
  opciones: 8,
  maxRondas: 6,
  rondasPractica: 3,
  acierto: [100, 80, 65, 50, 40, 30],
  porAcierto: 20,
  maxTrazos: 260,
  maxPuntos: 7000,
  maxPorTrazo: 400,
} as const;
export const COLORES_DIBUJA = ["#2a1a10", "#d9483a", "#2f7fd0", "#2e9e5b", "#e0a21a", "#8a54b8", "#7a4a22", "#ffffff"];
export const GROSORES_DIBUJA = [3, 6, 12, 22];

export type Trazo = { c: number; g: number; p: number[] };
export type EvDibuja =
  | { t: "ronda"; ronda: number; dibuja: number }
  | { t: "trazo"; a: number }
  | { t: "borrar" }
  | { t: "acierto"; a: number; puesto: number }
  | { t: "fallo"; a: number }
  | { t: "revela"; palabra: number }
  | { t: "fin" };

export type EstadoDibuja = ConEventos<EvDibuja> & {
  juego: "dibuja";
  n: number;
  bots: (Nivel | null)[];
  orden: number[];
  ronda: number;
  fase: "preparar" | "dibujar" | "revelar" | "fin";
  faseHasta: number;
  inicioRonda: number;
  palabra: number;
  opciones: number[];
  usadas: number[];
  trazos: Trazo[];
  puntosTrazados: number;
  eleccion: (number | null)[];
  aciertos: { a: number; ms: number }[];
  puntos: number[];
  terminoAt: number | null;
};

export type JugadaDibuja = { t: "trazo"; c: number; g: number; p: number[] } | { t: "borrar" } | { t: "adivinar"; o: number } | { t: "listo" };

export type DibujaVista = {
  juego: "dibuja";
  fase: EstadoDibuja["fase"];
  ronda: number;
  rondas: number;
  dibuja: number | null;
  yo: number | null;
  practica: boolean;
  restanteMs: number;
  totalMs: number;
  /** La palabra: solo para quien dibuja (y para todos al revelar). */
  palabra: string | null;
  /** Las ocho para elegir (para quien adivina): su número y su texto (el número no dice cuál es la buena). */
  opciones: { o: number; texto: string }[] | null;
  miEleccion: string | null;
  miAcierto: boolean | null;
  trazos: Trazo[];
  /** Quiénes ya adivinaron (en orden) y quiénes eligieron mal. */
  aciertos: number[];
  fallaron: number[];
  puntos: number[];
  eventos: EstadoDibuja["eventos"];
};

const personas = (e: EstadoDibuja) => e.bots.map((b, a) => (b ? -1 : a)).filter((a) => a >= 0);
const practica = (e: EstadoDibuja) => personas(e).length < 2;
const dibujante = (e: EstadoDibuja) => (e.fase === "preparar" || e.fase === "fin" ? null : e.orden[(e.ronda - 1) % e.orden.length]);

function empezarRonda(e: EstadoDibuja, t: number, azar: Azar) {
  const libres = PALABRAS_DIBUJA.map((_, i) => i).filter((i) => !e.usadas.includes(i));
  const palabra = libres[entero(azar, libres.length)];
  e.usadas.push(palabra);
  const otras = mezclar(
    PALABRAS_DIBUJA.map((_, i) => i).filter((i) => i !== palabra),
    azar,
  ).slice(0, DIBUJA.opciones - 1);
  e.palabra = palabra;
  e.opciones = mezclar([palabra, ...otras], azar);
  e.trazos = [];
  e.puntosTrazados = 0;
  e.eleccion = e.bots.map(() => null);
  e.aciertos = [];
  e.fase = "dibujar";
  e.inicioRonda = t;
  e.faseHasta = t + (practica(e) ? DIBUJA.practicaMs : DIBUJA.dibujarMs);
  anotar(e, t, { t: "ronda", ronda: e.ronda, dibuja: dibujante(e)! });
}

function revelar(e: EstadoDibuja, t: number) {
  const d = dibujante(e);
  if (d != null && !practica(e)) e.puntos[d] += e.aciertos.length * DIBUJA.porAcierto;
  e.fase = "revelar";
  e.faseHasta = t + DIBUJA.revelarMs;
  anotar(e, t, { t: "revela", palabra: e.palabra });
}

function correr(e: EstadoDibuja, ahora: number, azar: Azar): boolean {
  let cambio = false;
  for (let k = 0; k < 50 && e.fase !== "fin" && e.faseHasta <= ahora; k++) {
    cambio = true;
    const t = e.faseHasta;
    if (e.fase === "preparar") empezarRonda(e, t, azar);
    else if (e.fase === "dibujar") revelar(e, t);
    else if (e.ronda >= rondas(e)) {
      e.fase = "fin";
      e.terminoAt = t;
      anotar(e, t, { t: "fin" });
    } else {
      e.ronda += 1;
      empezarRonda(e, t, azar);
    }
  }
  return cambio;
}
const rondas = (e: EstadoDibuja) => (practica(e) ? DIBUJA.rondasPractica : Math.min(DIBUJA.maxRondas, e.orden.length));

function leerTrazo(o: Record<string, unknown>): Trazo | null {
  const c = Number(o.c);
  const g = Number(o.g);
  if (!Number.isInteger(c) || c < 0 || c >= COLORES_DIBUJA.length) return null;
  if (!GROSORES_DIBUJA.includes(g)) return null;
  if (!Array.isArray(o.p) || o.p.length < 2 || o.p.length > DIBUJA.maxPorTrazo * 2 || o.p.length % 2) return null;
  const p: number[] = [];
  for (const v of o.p) {
    if (typeof v !== "number" || !Number.isFinite(v)) return null;
    p.push(Math.max(0, Math.min(1000, Math.round(v))));
  }
  return { c, g, p };
}

export const dibuja: ModuloMesa<EstadoDibuja, JugadaDibuja, DibujaVista> & {
  vistaPara(e: EstadoDibuja, asiento: number | null, ahora: number): DibujaVista;
  jugadaDeBot(e: EstadoDibuja, asiento: number, nivel: Nivel, azar: Azar): JugadaDibuja | null;
} = {
  id: "dibuja",
  min: 1,
  max: 12,

  estadoInicial(cfg: ConfigMesa<Record<string, never>>, azar: Azar, ahora: number): EstadoDibuja {
    const n = cfg.bots.length;
    const quienes = cfg.bots.map((b, a) => (b ? -1 : a)).filter((a) => a >= 0);
    return {
      juego: "dibuja",
      n,
      bots: [...cfg.bots],
      orden: mezclar(quienes.length ? quienes : [0], azar),
      ronda: 1,
      fase: "preparar",
      faseHasta: ahora + DIBUJA.prepararMs,
      inicioRonda: ahora,
      palabra: 0,
      opciones: [],
      usadas: [],
      trazos: [],
      puntosTrazados: 0,
      eleccion: cfg.bots.map(() => null),
      aciertos: [],
      puntos: new Array<number>(n).fill(0),
      terminoAt: null,
      ev: 0,
      eventos: [],
    };
  },

  turnoDe: (e) => dibujante(e),

  jugadasValidas(e, a) {
    if (e.fase !== "dibujar" || e.bots[a]) return [];
    if (a === dibujante(e)) return [{ t: "borrar" }, ...(practica(e) ? [{ t: "listo" } as JugadaDibuja] : [])];
    return e.eleccion[a] == null ? e.opciones.map((o) => ({ t: "adivinar" as const, o })) : [];
  },

  leerJugada(x) {
    if (!x || typeof x !== "object") return null;
    const o = x as Record<string, unknown>;
    if (o.t === "borrar") return { t: "borrar" };
    if (o.t === "listo") return { t: "listo" };
    if (o.t === "adivinar" && typeof o.o === "number" && Number.isInteger(o.o)) return { t: "adivinar", o: o.o };
    if (o.t === "trazo") {
      const tr = leerTrazo(o);
      return tr ? { t: "trazo", ...tr } : null;
    }
    return null;
  },

  aplicar(e0, a, j, ahora, azar): Aplicado<EstadoDibuja> {
    if (a < 0 || a >= e0.n) return mal("No juegas en esta partida.");
    const e = copiar(e0);
    correr(e, ahora, azar);
    if (e.fase !== "dibujar") return mal(e.fase === "revelar" ? "La ronda ya se cerró." : "Ahora no se dibuja.");
    if (e.bots[a]) return mal("Los compañeros de la computadora solo miran.");
    const d = dibujante(e);
    if (j.t === "trazo" || j.t === "borrar" || j.t === "listo") {
      if (a !== d) return mal("Ahora dibuja otra persona.");
      if (j.t === "borrar") {
        e.trazos = [];
        anotar(e, ahora, { t: "borrar" });
        return { ok: true, e };
      }
      if (j.t === "listo") {
        if (!practica(e)) return mal("En grupo, la ronda se cierra cuando todos eligen o se acaba el reloj.");
        revelar(e, ahora);
        return { ok: true, e };
      }
      const pts = j.p.length / 2;
      if (e.trazos.length >= DIBUJA.maxTrazos || e.puntosTrazados + pts > DIBUJA.maxPuntos) return mal("El dibujo ya está muy lleno: bórralo para seguir.");
      e.trazos.push({ c: j.c, g: j.g, p: j.p });
      e.puntosTrazados += pts;
      anotar(e, ahora, { t: "trazo", a });
      return { ok: true, e };
    }
    // adivinar
    if (a === d) return mal("Tú estás dibujando.");
    if (e.eleccion[a] != null) return mal("Ya elegiste en esta ronda.");
    if (!e.opciones.includes(j.o)) return mal("Esa palabra no está entre las opciones.");
    e.eleccion[a] = j.o;
    if (j.o === e.palabra) {
      const puesto = e.aciertos.length;
      e.aciertos.push({ a, ms: ahora - e.inicioRonda });
      e.puntos[a] += DIBUJA.acierto[Math.min(puesto, DIBUJA.acierto.length - 1)];
      anotar(e, ahora, { t: "acierto", a, puesto: puesto + 1 });
    } else anotar(e, ahora, { t: "fallo", a });
    // si ya eligieron todos los que adivinan, se cierra la ronda
    const faltan = personas(e).filter((p) => p !== d && e.eleccion[p] == null);
    if (!faltan.length) revelar(e, ahora);
    return { ok: true, e };
  },

  alTiempo(e0, ahora, azar) {
    if (e0.fase === "fin" || e0.faseHasta > ahora) return null;
    const e = copiar(e0);
    return correr(e, ahora, azar) ? e : null;
  },

  proximoCambio(e, ahora) {
    return e.fase === "fin" ? null : Math.max(0, e.faseHasta - ahora);
  },

  terminado(e): FinMesa | null {
    if (e.fase !== "fin") return null;
    const puestos = puestosPor(e.puntos);
    if (practica(e)) return { puestos, puntos: [...e.puntos], titulo: "¡Buena práctica de dibujo!", detalle: e.puntos.map(() => "practicó") };
    const top = Math.max(...e.puntos);
    const primeros = puestos.map((p, a) => (p === 1 ? a : -1)).filter((a) => a >= 0);
    const titulo = primeros.length === 1 ? `¡Ganó @${primeros[0]} con ${top} puntos!` : `¡Empate! ${primeros.map((a) => `@${a}`).join(" y ")}.`;
    return { puestos, puntos: [...e.puntos], titulo, detalle: e.puntos.map((p, a) => (e.bots[a] ? "miró" : `${p} puntos`)) };
  },

  ponerBot(e0, a, nivel) {
    const e = copiar(e0);
    e.bots[a] = nivel;
    return e;
  },

  vistaPara(e, yo, ahora): DibujaVista {
    const soy = yo != null && yo >= 0 && yo < e.n ? yo : null;
    const d = dibujante(e);
    const abierta = e.fase === "revelar" || e.fase === "fin";
    const adivino = soy != null && soy !== d && e.fase === "dibujar";
    return {
      juego: "dibuja",
      fase: e.fase,
      ronda: e.ronda,
      rondas: rondas(e),
      dibuja: d,
      yo: soy,
      practica: practica(e),
      restanteMs: Math.max(0, e.faseHasta - ahora),
      totalMs: e.fase === "dibujar" ? (practica(e) ? DIBUJA.practicaMs : DIBUJA.dibujarMs) : e.fase === "revelar" ? DIBUJA.revelarMs : DIBUJA.prepararMs,
      palabra: (soy != null && soy === d && e.fase === "dibujar") || (abierta && e.usadas.length) ? PALABRAS_DIBUJA[e.palabra] : null,
      opciones: adivino && !e.bots[soy!] ? e.opciones.map((o) => ({ o, texto: PALABRAS_DIBUJA[o] })) : null,
      miEleccion: soy != null && e.eleccion[soy] != null ? PALABRAS_DIBUJA[e.eleccion[soy]!] : null,
      miAcierto: soy != null && e.eleccion[soy] != null ? e.eleccion[soy] === e.palabra : null,
      trazos: e.trazos,
      aciertos: e.aciertos.map((x) => x.a),
      fallaron: e.eleccion.map((x, a) => (x != null && x !== e.palabra ? a : -1)).filter((a) => a >= 0),
      puntos: [...e.puntos],
      eventos: e.eventos,
    };
  },

  jugadaDeBot: () => null,
};
