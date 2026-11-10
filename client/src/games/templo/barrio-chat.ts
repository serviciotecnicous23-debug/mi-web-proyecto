/**
 * La charla del barrio en el teléfono (shared/barrio.ts): los mensajes que llegan por la red de la
 * ciudad aunque la ventana esté cerrada, cuántos faltan por ver (el número del botón), el emblema del
 * barrio y la preferencia «solo frases» de este teléfono (para los niños: oculta los mensajes escritos
 * y deja solo las frases fijas y los versículos).
 */
import { useSyncExternalStore } from "react";
import type { BarrioVista, Emblema, Lema, MensajeBarrio } from "@shared/barrio";

const API = "/api/jerusalen/barrio";

export async function pedirBarrio<T>(path: string, init?: RequestInit): Promise<{ ok: boolean; status: number; data: (T & { message?: string }) | null }> {
  try {
    const res = await fetch(`${API}${path}`, { credentials: "include", ...init, headers: { "Content-Type": "application/json", ...(init?.headers || {}) } });
    const data = (await res.json().catch(() => null)) as (T & { message?: string }) | null;
    return { ok: res.ok, status: res.status, data };
  } catch {
    return { ok: false, status: 0, data: null };
  }
}

type Estado = {
  /** Mi barrio (null hasta que llega el resumen). */
  n: number | null;
  nombre: string;
  emblema: Emblema | null;
  lema: Lema | null;
  /** Los mensajes de mi barrio que se tienen (del más viejo al más nuevo). */
  mensajes: MensajeBarrio[];
  hayMas: boolean;
  cargado: boolean;
  /** Mensajes de otros que no vi. */
  nuevos: number;
  /** La ventana del barrio está abierta en la charla: lo que llega se da por visto. */
  abierto: boolean;
  soloFrases: boolean;
};

const CLAVE_SOLO_FRASES = "jer-solo-frases";

function leerSoloFrases(): boolean {
  try {
    return localStorage.getItem(CLAVE_SOLO_FRASES) === "1";
  } catch {
    return false;
  }
}

let estado: Estado = { n: null, nombre: "", emblema: null, lema: null, mensajes: [], hayMas: false, cargado: false, nuevos: 0, abierto: false, soloFrases: leerSoloFrases() };
const oyentes = new Set<() => void>();

function cambiar(p: Partial<Estado>) {
  estado = { ...estado, ...p };
  for (const o of oyentes) o();
}

let leidoPendiente = 0;
let leidoT: ReturnType<typeof setTimeout> | null = null;
/** Avisa al servidor hasta dónde se vio (con una pausa, para no mandar uno por mensaje). */
function marcarLeido(hasta: number) {
  leidoPendiente = Math.max(leidoPendiente, hasta);
  if (leidoT) return;
  leidoT = setTimeout(() => {
    leidoT = null;
    const h = leidoPendiente;
    if (h > 0) void pedirBarrio("/chat/leido", { method: "POST", body: JSON.stringify({ hasta: h }) });
  }, 800);
}

function unir(a: MensajeBarrio[], b: MensajeBarrio[]): MensajeBarrio[] {
  const m = new Map<number, MensajeBarrio>();
  for (const x of a) m.set(x.id, x);
  for (const x of b) m.set(x.id, x);
  return [...m.values()].sort((x, y) => x.id - y.id).slice(-300);
}

export const chatBarrio = {
  subscribe(fn: () => void) {
    oyentes.add(fn);
    return () => {
      oyentes.delete(fn);
    };
  },
  get: () => estado,

  /** Al entrar a la ciudad: el emblema y lo que no se ha visto. */
  async iniciar() {
    const r = await pedirBarrio<{ n: number; nombre: string; emblema: Emblema; nuevos: number; ultimo: number }>("/resumen");
    if (!r.ok || !r.data) return;
    const otro = estado.n !== null && estado.n !== r.data.n;
    cambiar({ n: r.data.n, nombre: r.data.nombre, emblema: r.data.emblema, nuevos: r.data.nuevos, ...(otro ? { mensajes: [], cargado: false, hayMas: false } : {}) });
  },

  /** Después de un corte de la red: el número de nuevos y los mensajes que llegaron mientras tanto. */
  async ponerAlDia() {
    await chatBarrio.iniciar();
    const ultimo = estado.mensajes[estado.mensajes.length - 1];
    if (!estado.cargado || !ultimo) return;
    const r = await pedirBarrio<{ mensajes: MensajeBarrio[] }>(`/chat?desde=${ultimo.id}`);
    if (r.ok && r.data?.mensajes.length) {
      cambiar({ mensajes: unir(estado.mensajes, r.data.mensajes) });
      if (estado.abierto) marcarLeido(r.data.mensajes[r.data.mensajes.length - 1].id);
    }
  },

  /** Lo que trajo la ventana del barrio (mi barrio). */
  cargar(v: BarrioVista) {
    cambiar({ n: v.n, nombre: v.nombre, emblema: v.emblema, lema: v.lema, mensajes: unir(estado.cargado ? estado.mensajes : [], v.chat), hayMas: v.hayMas, cargado: true });
  },

  /** Mensajes de antes (al subir en la charla). */
  antes(lista: MensajeBarrio[], hayMas: boolean) {
    cambiar({ mensajes: unir(lista, estado.mensajes), hayMas });
  },

  /** Llegó un mensaje por la red (o el mío, al enviarlo). */
  recibir(m: MensajeBarrio) {
    if (estado.mensajes.some((x) => x.id === m.id)) return;
    const visto = estado.abierto || m.mio;
    cambiar({ mensajes: unir(estado.mensajes, [m]), nuevos: visto ? estado.nuevos : estado.nuevos + 1 });
    if (estado.abierto) marcarLeido(m.id);
  },

  /** Se borró u ocultó un mensaje (o lo denuncié yo). */
  quitar(id: number) {
    if (estado.mensajes.some((x) => x.id === id)) cambiar({ mensajes: estado.mensajes.filter((x) => x.id !== id) });
  },

  /** Bloqueé a alguien: sus mensajes se van. */
  quitarDe(personajeId: number) {
    cambiar({ mensajes: estado.mensajes.filter((x) => x.de !== personajeId) });
  },

  /** La ventana del barrio se abre o se cierra en la charla. */
  abrir(abierto: boolean) {
    cambiar({ abierto, ...(abierto ? { nuevos: 0 } : {}) });
    const ultimo = estado.mensajes[estado.mensajes.length - 1];
    if (abierto && ultimo) marcarLeido(ultimo.id);
  },

  /** Cambió el emblema o el lema (después de votar). */
  identidad(emblema: Emblema, lema: Lema) {
    cambiar({ emblema, lema });
  },

  soloFrases(si: boolean) {
    try {
      localStorage.setItem(CLAVE_SOLO_FRASES, si ? "1" : "0");
    } catch {
      /* sin almacenamiento: dura mientras está abierto */
    }
    cambiar({ soloFrases: si });
  },
};

export function useChatBarrio(): Estado {
  return useSyncExternalStore(chatBarrio.subscribe, chatBarrio.get, chatBarrio.get);
}

/** Cómo se lee un mensaje (los versículos con su cita). */
export function textoDeMensaje(m: MensajeBarrio): string {
  return m.ref ? `«${m.texto}» ${m.ref}` : m.texto;
}

export const ICONO_CAMINO: Record<MensajeBarrio["camino"], string> = { sacerdocio: "🕯️", profecia: "📯", realeza: "👑" };
