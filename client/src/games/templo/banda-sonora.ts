/**
 * La banda sonora de Jerusalén en línea: pistas grabadas (compuestas con ACE-Step, instrumentales y propias) para
 * cada lugar y cada juego, en `client/public/musica/<pista>.m4a`.
 *
 * - Cada mundo dice DÓNDE está el jugador (`lugar`): el templo, la zona de la ciudad, la casa, el huerto o un
 *   edificio. Las ventanas y los juegos piden su música ENCIMA (`encima`): «¿Quién es sabio?», el aula, el
 *   patio y cada juego (con el evento `jer-musica`). Suena lo de encima si hay; si no, lo del lugar.
 * - Suena con elementos <audio> (se descargan de a poco y no ocupan memoria) conectados a la música del juego:
 *   respeta «Música», la radio del ministerio y el volumen elegido.
 * - Pasa de una pista a otra con un cruce suave, y al acabarse una alterna con su otra variante (si tiene),
 *   así la vuelta no se nota.
 */

export type LugarMusica =
  | "portada"
  | "templo-dia"
  | "templo-noche"
  | "ciudad-dia"
  | "ciudad-noche"
  | "mercado"
  | "barrio"
  | "casa"
  | "huerto"
  | "siervos"
  | "escuela"
  | "palacio"
  | "camara"
  | "aula"
  | "examen"
  | "sabio-tema"
  | "sabio-suspenso"
  | "patio"
  | "juegos-mesa"
  | "juegos-grupo"
  | "juegos-rapidos"
  | "juegos-fiesta"
  | "fiesta"
  | "amenaza"
  | "pascua";

/** Las pistas de cada lugar (los archivos, sin la extensión). Las que más se oyen tienen dos variantes. */
export const PISTAS: Record<LugarMusica, string[]> = {
  portada: ["portada"],
  "templo-dia": ["templo-dia-1", "templo-dia-2"],
  "templo-noche": ["templo-noche"],
  "ciudad-dia": ["ciudad-dia-1", "ciudad-dia-2"],
  "ciudad-noche": ["ciudad-noche"],
  mercado: ["mercado"],
  barrio: ["barrio"],
  casa: ["casa"],
  huerto: ["huerto"],
  siervos: ["siervos"],
  escuela: ["escuela"],
  palacio: ["palacio"],
  camara: ["camara"],
  aula: ["aula"],
  examen: ["examen"],
  "sabio-tema": ["sabio-tema"],
  "sabio-suspenso": ["sabio-suspenso"],
  patio: ["patio-1", "patio-2"],
  "juegos-mesa": ["juegos-mesa"],
  "juegos-grupo": ["juegos-grupo"],
  "juegos-rapidos": ["juegos-rapidos"],
  "juegos-fiesta": ["juegos-fiesta"],
  fiesta: ["fiesta"],
  amenaza: ["amenaza"],
  pascua: ["pascua"],
};

/** Las piezas cortas (al ganar o perder una partida). */
export type Golpe = "victoria" | "derrota";

export const RUTA_MUSICA = "/musica";
export const rutaDePista = (pista: string) => `${RUTA_MUSICA}/${pista}.m4a`;

/** Segundos del cruce entre pistas. */
export const CRUCE_S = 2.6;
/** Antes de que termine una pista, cuándo empieza el cruce con la siguiente. */
export const ANTES_DEL_FINAL_S = 3.2;

const esLugar = (v: unknown): v is LugarMusica => typeof v === "string" && v in PISTAS;

/**
 * La música de cada juego (lo que manda `jer-musica`). Los de mesa piensan (tranquila), los de grupo se ríen
 * (alegre), los rápidos corren y los de fiesta bailan. Un lugar de la lista también vale tal cual.
 */
export function lugarDeJuego(juego: unknown): LugarMusica | null {
  if (juego === null || juego === undefined || juego === "") return null;
  if (esLugar(juego)) return juego;
  const id = String(juego).toLowerCase();
  if (/(ajedrez|damas|domino|dominó|cuatro|raya|tres|memoria|mesa|parchis|parchís|chinas)/.test(id)) return "juegos-mesa";
  if (/(esgrima|carrera|rapid)/.test(id)) return "juegos-rapidos";
  if (/(muro|fiesta|baile)/.test(id)) return "juegos-fiesta";
  if (/(sabio|noche|duelo)/.test(id)) return "sabio-tema";
  if (/(examen|rango)/.test(id)) return "examen";
  if (/(clase|aula|catedra|cátedra)/.test(id)) return "aula";
  if (/(loteria|lotería|generala|escaleras|basta|dibuja|tribus|quien|quién|cartas|grupo)/.test(id)) return "juegos-grupo";
  return "patio";
}

/** La música de algunas ventanas del juego (las demás dejan sonar la del lugar). */
export function lugarDeVentana(kind: string | null | undefined): LugarMusica | null {
  switch (kind) {
    case "sabio":
      return "sabio-tema";
    case "aula":
    case "catedra":
      return "aula";
    case "concurso":
    case "dificil":
      return "examen";
    case "fiesta":
      return "fiesta";
    default:
      return null;
  }
}

type Rect = readonly [number, number, number, number];
const dentro = (x: number, z: number, r: Rect) => x >= r[0] && x <= r[2] && z >= r[1] && z <= r[3];

/** Los lugares de la ciudad que tienen su música (copiados de `ciudad/plano.ts`, `shared/personajes.ts` y el patio). */
export const ZONAS_MUSICA = {
  plaza: [38, -12, 74, 12] as Rect,
  mercado: [44, 4.5, 68, 12] as Rect,
  patio: [44, -68, 70, -52] as Rect,
  siervos: [39.2, 49.6, 72.8, 64.6] as Rect,
};

/**
 * La música de la ciudad según dónde está el jugador, la hora y la fiesta del día: el patio, la calle de los
 * siervos y el mercado tienen la suya; en la plaza, la fiesta o la ciudad; en las calles de los barrios, el barrio
 * (y de noche, la ciudad dormida).
 */
export function lugarDeCiudad(x: number, z: number, noche: boolean, fiesta: boolean): LugarMusica {
  if (dentro(x, z, ZONAS_MUSICA.patio)) return "patio";
  if (dentro(x, z, ZONAS_MUSICA.siervos)) return noche ? "ciudad-noche" : "siervos";
  if (dentro(x, z, ZONAS_MUSICA.mercado) && !noche) return fiesta ? "fiesta" : "mercado";
  if (dentro(x, z, ZONAS_MUSICA.plaza)) return fiesta ? "fiesta" : noche ? "ciudad-noche" : "ciudad-dia";
  return noche ? "ciudad-noche" : "barrio";
}

/** La música del templo: de noche, la quieta; en fiesta, la de la fiesta. */
export function lugarDelTemplo(noche: boolean, fiesta: boolean): LugarMusica {
  if (fiesta) return "fiesta";
  return noche ? "templo-noche" : "templo-dia";
}

/** La música de un edificio por dentro (las casas tienen la suya). */
export function lugarDeEdificio(edificio: string | null | undefined): LugarMusica {
  if (edificio === "escuela") return "escuela";
  if (edificio === "palacio") return "palacio";
  if (edificio === "camara") return "camara";
  return "casa";
}

/** La pista que sigue en un lugar: alterna sus variantes (con una sola, vuelve a la misma). */
export function siguientePista(lugar: LugarMusica, actual: string | null): string {
  const l = PISTAS[lugar];
  if (!actual) return l[0];
  const i = l.indexOf(actual);
  return l[(i + 1) % l.length] ?? l[0];
}

type Voz = { el: HTMLAudioElement; nodo: MediaElementAudioSourceNode; g: GainNode; pista: string | null };

/** El reproductor: dos voces que se cruzan, conectadas a `destino` (la ganancia de la música). */
export class BandaSonora {
  private voces: [Voz, Voz];
  private activa = 0;
  private lugarActual: LugarMusica | null = null;
  private golpes = new Map<Golpe, HTMLAudioElement>();
  private reloj: ReturnType<typeof setInterval> | null = null;
  private esperandoToque = false;
  /** Una pista que no se pudo cargar no se vuelve a pedir en esta visita (suena la música de antes). */
  private fallidas = new Set<string>();
  /** Suena una pista grabada ahora mismo (si no, el juego usa su música hecha en el momento). */
  sonando = false;
  /** Para avisar al motor cuando empieza o se calla una pista. */
  alCambiar: ((sonando: boolean) => void) | null = null;

  constructor(private ctx: AudioContext, private destino: AudioNode) {
    this.voces = [this.nuevaVoz(), this.nuevaVoz()];
    this.reloj = setInterval(() => this.vigilar(), 500);
  }

  private nuevaVoz(): Voz {
    const el = new Audio();
    el.preload = "none";
    el.crossOrigin = "anonymous";
    (el as HTMLAudioElement & { playsInline?: boolean }).playsInline = true;
    const nodo = this.ctx.createMediaElementSource(el);
    const g = this.ctx.createGain();
    g.gain.value = 0;
    nodo.connect(g).connect(this.destino);
    const v: Voz = { el, nodo, g, pista: null };
    el.addEventListener("error", () => {
      if (v.pista) this.fallidas.add(v.pista);
      if (this.voces[this.activa] === v) this.marcarSonando(false);
    });
    return v;
  }

  get lugar(): LugarMusica | null {
    return this.lugarActual;
  }

  /** Pide la música de un lugar. Si ya suena, no hace nada; si no, cruza a su pista. */
  poner(lugar: LugarMusica | null) {
    if (lugar === this.lugarActual) return;
    this.lugarActual = lugar;
    if (!lugar) {
      this.callar();
      return;
    }
    const v = this.voces[this.activa];
    // si la pista que suena también es de este lugar, sigue sonando
    if (v.pista && PISTAS[lugar].includes(v.pista) && !v.el.paused) return;
    void this.cruzarA(siguientePista(lugar, null));
  }

  private async cruzarA(pista: string) {
    if (this.fallidas.has(pista)) {
      this.marcarSonando(false);
      this.callarVoces();
      return;
    }
    const sale = this.voces[this.activa];
    this.activa = 1 - this.activa;
    const entra = this.voces[this.activa];
    const t = this.ctx.currentTime;
    entra.g.gain.cancelScheduledValues(t);
    entra.g.gain.setValueAtTime(0, t);
    if (entra.pista !== pista) {
      entra.pista = pista;
      entra.el.src = rutaDePista(pista);
      entra.el.preload = "auto";
    }
    entra.el.currentTime = 0;
    try {
      await entra.el.play();
    } catch {
      // el navegador todavía no deja sonar (falta un toque): se intenta con el próximo toque
      this.esperarToque();
      entra.pista = pista;
      return;
    }
    if (this.voces[this.activa] !== entra) return; // mientras cargaba, se pidió otra
    const ahora = this.ctx.currentTime;
    entra.g.gain.linearRampToValueAtTime(1, ahora + CRUCE_S);
    sale.g.gain.cancelScheduledValues(ahora);
    sale.g.gain.setValueAtTime(sale.g.gain.value, ahora);
    sale.g.gain.linearRampToValueAtTime(0, ahora + CRUCE_S);
    setTimeout(() => {
      if (this.voces[this.activa] !== sale) sale.el.pause();
    }, CRUCE_S * 1000 + 200);
    this.marcarSonando(true);
  }

  /** Cada medio segundo: si la pista está por terminar, cruza a la siguiente variante del lugar. */
  private vigilar() {
    const v = this.voces[this.activa];
    if (!this.lugarActual || !v.pista || v.el.paused) return;
    const dur = v.el.duration;
    if (Number.isFinite(dur) && dur > 0 && dur - v.el.currentTime < ANTES_DEL_FINAL_S) {
      void this.cruzarA(siguientePista(this.lugarActual, v.pista));
    }
  }

  private esperarToque() {
    if (this.esperandoToque) return;
    this.esperandoToque = true;
    const seguir = () => {
      this.esperandoToque = false;
      window.removeEventListener("pointerdown", seguir, true);
      window.removeEventListener("keydown", seguir, true);
      const l = this.lugarActual;
      if (!l) return;
      void this.ctx.resume();
      void this.cruzarA(siguientePista(l, null));
    };
    window.addEventListener("pointerdown", seguir, true);
    window.addEventListener("keydown", seguir, true);
  }

  private callarVoces() {
    const t = this.ctx.currentTime;
    for (const v of this.voces) {
      v.g.gain.cancelScheduledValues(t);
      v.g.gain.setValueAtTime(v.g.gain.value, t);
      v.g.gain.linearRampToValueAtTime(0, t + 1.2);
    }
    setTimeout(() => {
      for (const v of this.voces) if (!this.lugarActual) v.el.pause();
    }, 1400);
  }

  /** Calla la música grabada (con una bajada suave). */
  callar() {
    this.lugarActual = null;
    this.callarVoces();
    this.marcarSonando(false);
  }

  private marcarSonando(s: boolean) {
    if (this.sonando === s) return;
    this.sonando = s;
    this.alCambiar?.(s);
  }

  /** Un golpe corto encima de la música (al ganar o perder una partida). */
  golpe(cual: Golpe) {
    let el = this.golpes.get(cual);
    if (!el) {
      el = new Audio(rutaDePista(cual));
      el.preload = "auto";
      const nodo = this.ctx.createMediaElementSource(el);
      nodo.connect(this.destino);
      this.golpes.set(cual, el);
    }
    el.currentTime = 0;
    void el.play().catch(() => undefined);
  }

  dispose() {
    if (this.reloj) clearInterval(this.reloj);
    for (const v of this.voces) {
      v.el.pause();
      v.el.removeAttribute("src");
      v.el.load();
      v.nodo.disconnect();
    }
    for (const el of this.golpes.values()) el.pause();
  }
}
