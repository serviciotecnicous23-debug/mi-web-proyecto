/**
 * Jerusalén en línea (etapa 1, «Templo en línea»): el puente entre el templo y el servidor.
 *
 * El modo en línea usa el mismo mundo 3D, pero con un templo ya restaurado, sin levitas que
 * trabajen solos y con una partida que NO se guarda (la del modo local queda intacta). Cada
 * deber cumplido se cuenta aquí y se manda junto con los demás cada 15 s; el servidor revisa y
 * devuelve el mérito de la temporada. Las preguntas difíciles las trae y las corrige el servidor.
 */
import {
  ENVIO_CADA, ESPERA_PREGUNTA, type DeberId, type EscalonId, type JerusalenAcciones, type JerusalenEstado,
  type JerusalenPregunta, type JerusalenRespuesta,
} from "@shared/jerusalen";
import { relojEnLinea } from "@shared/calendario";
import type { Bien, CasaPrivada, CasaVisita, CiudadEstado } from "@shared/ciudad";
import { STATIONS } from "./data";
import { newSave, type SaveData } from "./state";
import { gameStore, type OnlineHud } from "./store";

const API = "/api/jerusalen";

async function pedir<T>(path: string, init?: RequestInit): Promise<{ ok: boolean; status: number; data: T | null }> {
  try {
    const res = await fetch(`${API}${path}`, { credentials: "include", ...init, headers: { "Content-Type": "application/json", ...(init?.headers || {}) } });
    const data = (await res.json().catch(() => null)) as T | null;
    return { ok: res.ok, status: res.status, data };
  } catch {
    return { ok: false, status: 0, data: null };
  }
}

export const fetchEstado = () => pedir<JerusalenEstado>("/estado");
export const crearPersonaje = (nombre: string) => pedir<JerusalenEstado & { message?: string }>("/personaje", { method: "POST", body: JSON.stringify({ nombre }) });
export const renombrarPersonaje = (nombre: string) => pedir<JerusalenEstado & { message?: string }>("/personaje", { method: "PATCH", body: JSON.stringify({ nombre }) });
export const adminRevisar = () => pedir<JerusalenEstado>("/admin/revisar", { method: "POST" });
export const adminQuitarCargo = (personajeId: number) => pedir<JerusalenEstado & { message?: string }>("/admin/quitar-cargo", { method: "POST", body: JSON.stringify({ personajeId }) });
/** La ciudad (etapa 2): entrar da la parcela la primera vez y trae el barrio. */
export const entrarCiudad = () => pedir<CiudadEstado & { message?: string }>("/ciudad/entrar", { method: "POST" });
/** Tus siervos (la tarea de cada uno) y llevar al templo lo del alfolí. */
export const casaSiervos = (siervos: Bien[]) => pedir<CasaPrivada & { message?: string }>("/ciudad/casa/siervos", { method: "POST", body: JSON.stringify({ siervos }) });
export const casaOfrendar = (bienes: Partial<Record<Bien, number>>) =>
  pedir<{ ganado: number; doble: Bien | null; subio: number | null; honra: number; privada: CasaPrivada; message?: string }>("/ciudad/casa/ofrendar", { method: "POST", body: JSON.stringify({ bienes }) });
/** Visitar la casa de un vecino y dejarle una bendición (una por día y casa). */
export const verCasa = (personajeId: number) => pedir<CasaVisita & { message?: string }>(`/ciudad/casa/${personajeId}`);
export const bendecirCasa = (personajeId: number) => pedir<CasaVisita & { message?: string }>(`/ciudad/casa/${personajeId}/bendecir`, { method: "POST" });
/** La instrucción del sacerdote: una parte terminada (devuelve el premio la primera vez que se completa). */
export const instruccionParte = (parte: number) =>
  pedir<{ partes: number; premio: number; estado: JerusalenEstado; message?: string }>("/instruccion", { method: "POST", body: JSON.stringify({ parte }) });

/** Avisa en el juego los encargos o la ofrenda del barrio que se acaban de cumplir. */
export function avisarMisiones(m: { titulo: string; premio: number }[] | undefined) {
  for (const x of m || []) gameStore.toast(`${x.titulo} · +${x.premio} de mérito`, "gold");
}

/** Ropa del personaje según su escalón (el mundo usa los cinco rangos del modo local). */
export function escalonRank(e: EscalonId | null | undefined): number {
  switch (e) {
    case "sumo":
      return 4;
    case "principal":
      return 3;
    case "jefe":
    case "turno":
      return 2;
    default:
      return 1;
  }
}

/**
 * El templo del modo en línea: todo restaurado, sin levitas, con las mismas mejoras para todos
 * (así nadie llega con ventaja de su partida local) y la historia ya contada.
 */
export function onlineSave(rank: number): SaveData {
  const s = newSave();
  for (const st of STATIONS) s.built[st.id] = true;
  s.rank = Math.max(1, Math.min(4, rank));
  s.rangoMax = s.rank;
  s.upgrades = { paso: 2, brazos: 2, fuego: 2, agua: 2, familias: 1 };
  s.helpers = {};
  for (const k of [
    "intro", "primerFuego", "primeraOfrenda", "recogio", "fuegoApagado", "purezaVacia", "levitas", "visitaRey", "pascuaInicio", "pascua",
    "bendicion", "horaIncienso", "listo1", "listo2", "listo3", "listo4", "listo5",
  ])
    s.story[k] = true;
  s.gozo = 0;
  // Jerusalén en línea vive un mismo día y una misma hora para todos (y las mismas fiestas)
  const reloj = relojEnLinea();
  s.day = reloj.dia;
  s.time = reloj.hora;
  s.altarFuel = 2;
  s.purity = 11;
  s.lampOil = 3;
  s.bread = 6;
  s.incense = 0;
  return s;
}

/** Lo que el mundo le avisa al modo en línea. */
export type OnlineHooks = {
  /** Escalón del sacerdocio para la ropa (1 sacerdote … 4 sumo sacerdote). */
  rank: number;
  /** Un deber cumplido. */
  duty: (kind: DeberId, n: number) => void;
  /** Segundos de juego (solo mientras se juega, no en pausa ni con ventanas abiertas). */
  tick: (dt: number) => void;
  /** El aprendiz llegó adonde Azarías. */
  ask: () => void;
  /** Azarías tiene una pregunta difícil lista (muestra el «?»). */
  ready: () => boolean;
  /** Salir a la ciudad por la escalinata (la pantalla cambia de mundo). */
  toCity?: () => void;
};

type Pregunta = OnlineHud extends infer H ? (H extends { pregunta: infer P } ? P : never) : never;

export class OnlineSession {
  estado: JerusalenEstado;
  private pend: Partial<Record<DeberId, number>> = {};
  private live = 0;
  private sinceSend = 0;
  private sending = false;
  private retryIn = 0;
  private qWait = 0;
  private qState: Pregunta = "lista";
  private merito: number;
  private ganado = 0;
  private escalon: EscalonId;
  private hoySeg: number;
  private factor: number;
  private juntos = 0;
  private closed = false;
  readonly hooks: OnlineHooks;

  constructor(estado: JerusalenEstado) {
    this.estado = estado;
    this.merito = estado.mio?.merito || 0;
    this.escalon = estado.mio?.escalon || "sacerdote";
    this.hoySeg = estado.mio?.hoy.segundos || 0;
    this.factor = estado.mio?.hoy.factor ?? 1;
    if (estado.mio && estado.mio.hoy.preguntas >= estado.mio.hoy.preguntasMax) this.qState = "agotada";
    this.hooks = {
      rank: escalonRank(this.escalon),
      duty: (kind, n) => {
        this.pend[kind] = (this.pend[kind] || 0) + n;
      },
      tick: (dt) => this.tick(dt),
      ask: () => void this.ask(),
      ready: () => this.qState === "lista",
    };
    document.addEventListener("visibilitychange", this.onHide);
    window.addEventListener("pagehide", this.onHide);
    this.publish();
  }

  private onHide = () => {
    if (document.visibilityState === "hidden") void this.flush(true);
  };

  private hasPending() {
    return Object.values(this.pend).some((v) => (v || 0) > 0);
  }

  private tick(dt: number) {
    if (this.closed) return;
    this.live += dt;
    this.sinceSend += dt;
    if (this.qWait > 0) {
      this.qWait -= dt;
      if (this.qWait <= 0 && this.qState === "espera") {
        this.qState = "lista";
        this.publish();
      }
    }
    if (this.retryIn > 0) this.retryIn -= dt;
    if (!this.sending && this.retryIn <= 0 && this.sinceSend >= ENVIO_CADA) {
      this.sinceSend = 0;
      if (this.hasPending()) void this.flush();
      // el tiempo sin ningún deber no cuenta para la hora completa del día
      else this.live = 0;
    }
  }

  /** Manda los deberes juntados. Si no se pudo, quedan para el siguiente envío. */
  async flush(keepalive = false) {
    if (!this.hasPending() || (this.sending && !keepalive)) return;
    const acciones = { ...this.pend };
    const segundos = Math.min(60, Math.round(this.live));
    this.pend = {};
    this.live = 0;
    this.sending = true;
    this.publish();
    const r = await pedir<JerusalenAcciones & { espera?: number }>("/acciones", { method: "POST", body: JSON.stringify({ acciones, segundos }), keepalive });
    this.sending = false;
    if (r.ok && r.data) {
      const d = r.data;
      this.ganado = d.ganado;
      this.merito = d.merito;
      this.hoySeg = d.hoy.segundos;
      this.factor = d.hoy.factor;
      if (d.escalon !== this.escalon) {
        const subio = escalonRank(d.escalon) > escalonRank(this.escalon);
        this.escalon = d.escalon;
        if (subio && !this.closed) gameStore.toast(d.escalon === "turno" ? "¡Ahora eres sacerdote de turno en esta temporada!" : "Tu escalón cambió", "gold");
      }
      if (d.constancia && !this.closed) gameStore.toast(`Constancia: 10 minutos de servicio hoy · +${d.constancia} de mérito`, "gold");
      this.juntos = d.juntos ?? 0;
      if (!this.closed) avisarMisiones(d.misiones);
    } else {
      for (const [k, v] of Object.entries(acciones)) this.pend[k as DeberId] = (this.pend[k as DeberId] || 0) + (v || 0);
      this.live += segundos;
      this.retryIn = r.status === 429 ? (r.data?.espera || 10) + 0.5 : r.status === 0 ? 15 : 30;
    }
    this.publish();
  }

  private async ask() {
    if (this.closed) return;
    if (this.qState === "espera") {
      gameStore.toast(`Azarías: «Vuelve en ${Math.max(1, Math.ceil(this.qWait))} segundos y te haré otra pregunta»`, "info");
      return;
    }
    if (this.qState === "agotada") {
      gameStore.toast("Azarías: «Por hoy basta de preguntas; sigue sirviendo en el altar»", "info");
      return;
    }
    if (this.qState !== "lista") return;
    this.qState = "cargando";
    this.publish();
    const r = await pedir<JerusalenPregunta & { agotadas?: boolean; agotadasHoy?: boolean; message?: string; espera?: number }>("/pregunta", { method: "POST" });
    if (this.closed) return;
    const d = r.data;
    if (r.status === 403) {
      // quien no conoce el templo primero termina la instrucción del sacerdote
      this.qState = "espera";
      this.qWait = 45;
      gameStore.toast(d?.message || "Primero termina la instrucción del sacerdote", "info");
    } else if (r.status === 429) {
      this.qState = "espera";
      this.qWait = d?.espera || 10;
    } else if (!r.ok || !d) {
      this.qState = "lista";
      gameStore.toast("No se pudo traer la pregunta. Revisa tu conexión.", "warn");
    } else if (d.agotadasHoy || d.agotadas) {
      this.qState = "agotada";
      gameStore.toast(d.message || "No hay más preguntas por ahora", "info");
    } else {
      this.qState = "abierta";
      gameStore.push({ kind: "dificil", q: d });
    }
    this.publish();
  }

  /** Respuesta a la pregunta difícil (opción vacía = se acabó el tiempo). */
  async answer(q: JerusalenPregunta, opcion: string): Promise<JerusalenRespuesta | null> {
    const r = await pedir<JerusalenRespuesta>("/respuesta", { method: "POST", body: JSON.stringify({ id: q.id, opcion }) });
    if (r.ok && r.data) {
      this.merito = r.data.merito;
      if (r.data.ganado) this.ganado = r.data.ganado;
      avisarMisiones((r.data as JerusalenRespuesta & { misiones?: { titulo: string; premio: number }[] }).misiones);
    }
    this.qState = q.quedanHoy > 0 ? "espera" : "agotada";
    this.qWait = ESPERA_PREGUNTA;
    this.publish();
    return r.ok ? r.data : null;
  }

  /** La pregunta se cerró sin responder (por ejemplo, al salir). */
  dropQuestion() {
    if (this.qState === "abierta") {
      this.qState = "espera";
      this.qWait = ESPERA_PREGUNTA;
      this.publish();
    }
  }

  private publish() {
    gameStore.setOnline({
      merito: this.merito,
      ganado: this.ganado,
      escalon: this.escalon,
      hoySeg: this.hoySeg,
      factor: this.factor,
      pregunta: this.qState,
      enviando: this.sending,
      juntos: this.juntos,
    });
  }

  /** Al salir: manda lo que falta y deja de escuchar. */
  close() {
    if (this.closed) return;
    void this.flush(true);
    this.closed = true;
    document.removeEventListener("visibilitychange", this.onHide);
    window.removeEventListener("pagehide", this.onHide);
    gameStore.setOnline(null);
  }
}
