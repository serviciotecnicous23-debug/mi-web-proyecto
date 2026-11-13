/**
 * El patio de los juegos (shared/juegos-grupo.ts) en el teléfono: la sala en la que estoy, tal como la manda el
 * servidor por la red de la ciudad (ciudad/red.ts → «sala»), las invitaciones que llegan y las acciones (que devuelven
 * la sala al día). Si la red no avisa a tiempo, se le pregunta al servidor: justo después del próximo cambio que espera,
 * o cada 15–20 s (nunca cada segundo: en la wifi de una iglesia, todos comparten el cupo de peticiones).
 * La pantalla (JuegosGrupoUI.tsx) y la ciudad 3D (la carrera y el muro) leen de aquí.
 */
import { useEffect, useState, useSyncExternalStore } from "react";
import type { CarreraVista, InvitacionSala, MuroVista, SalaVista } from "@shared/juegos-grupo";

export type InvitacionEntranteSala = InvitacionSala & { hasta: number };
type Estado = {
  sala: SalaVista | null;
  /** Cuándo llegó la sala (para contar los milisegundos que faltan). */
  at: number;
  invitacion: InvitacionEntranteSala | null;
  /** Por qué ya no estoy en la sala (me sacaron, se cerró…). */
  aviso: string | null;
};

let estado: Estado = { sala: null, at: 0, invitacion: null, aviso: null };
const oyentes = new Set<() => void>();
function cambiar(p: Partial<Estado>) {
  estado = { ...estado, ...p };
  for (const f of oyentes) f();
}

let temporizador: ReturnType<typeof setTimeout> | null = null;
let ultimoDeLaRed = 0;

export type Respuesta<T> = { ok: boolean; status: number; data: (T & { message?: string }) | null };

export async function pedirJuegos<T>(ruta: string, body?: unknown, metodo?: "GET" | "POST"): Promise<Respuesta<T>> {
  try {
    const r = await fetch(`/api/jerusalen/juegos${ruta}`, {
      method: metodo ?? (body === undefined ? "GET" : "POST"),
      credentials: "include",
      cache: "no-store",
      headers: body === undefined ? undefined : { "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    let data: (T & { message?: string }) | null = null;
    try {
      data = (await r.json()) as T & { message?: string };
    } catch {
      data = null;
    }
    return { ok: r.ok, status: r.status, data };
  } catch {
    return { ok: false, status: 0, data: null };
  }
}

/** Pone la sala que llegó (si no es más vieja que la que ya tengo). */
function poner(v: SalaVista | null, motivo?: string | null) {
  const s = estado.sala;
  if (v && s && v.codigo === s.codigo && v.ver < s.ver) return;
  cambiar({ sala: v, at: Date.now(), aviso: v ? null : motivo ?? estado.aviso });
  programar();
}

/** La pregunta de respaldo: al próximo cambio que espera el servidor (más un poco), o cada 15–20 s. */
function programar() {
  if (temporizador) clearTimeout(temporizador);
  temporizador = null;
  const s = estado.sala;
  if (!s) return;
  const espera = s.proximoMs != null ? Math.min(15_000, s.proximoMs + 1200) : 20_000;
  temporizador = setTimeout(() => {
    temporizador = null;
    // si la red avisó hace poco y la sala está quieta, no hace falta preguntar
    if (s.proximoMs == null && Date.now() - ultimoDeLaRed < 15_000) {
      programar();
      return;
    }
    void juegosRed.cargar();
  }, Math.max(1200, espera));
}

export const juegosRed = {
  get: (): Estado => estado,
  subscribe(f: () => void): () => void {
    oyentes.add(f);
    return () => {
      oyentes.delete(f);
    };
  },
  /** Lo que llega por la red de la ciudad. */
  recibir(v: SalaVista | null, motivo?: string) {
    ultimoDeLaRed = Date.now();
    poner(v, motivo);
  },
  invitacion(i: InvitacionSala) {
    cambiar({ invitacion: { ...i, hasta: Date.now() + i.restantes * 1000 } });
  },
  cerrarInvitacion() {
    cambiar({ invitacion: null });
  },
  limpiarAviso() {
    if (estado.aviso) cambiar({ aviso: null });
  },
  /** Pregunta por mi sala (al abrir el patio, al volver la red, o de respaldo). */
  async cargar(): Promise<SalaVista | null> {
    const r = await pedirJuegos<{ sala: SalaVista | null }>("/sala");
    if (r.ok && r.data) poner(r.data.sala ?? null);
    else programar();
    return estado.sala;
  },
  /** Una acción de la sala (o crear/unirse): pone la sala que devuelve el servidor. */
  async accion(ruta: string, body: unknown = {}): Promise<{ ok: boolean; message: string | null; status: number }> {
    const r = await pedirJuegos<{ sala?: SalaVista | null }>(ruta, body, "POST");
    if (r.data && "sala" in r.data) poner(r.data.sala ?? null, r.ok ? null : undefined);
    return { ok: r.ok, message: r.data?.message ?? (r.ok ? null : r.status === 0 ? "Sin conexión: revisa tu internet." : "No se pudo."), status: r.status };
  },
  /** Los milisegundos que faltan para algo que el servidor dijo hace un rato. */
  restante(ms: number): number {
    return Math.max(0, ms - (Date.now() - estado.at));
  },
  /** Para la ciudad: la carrera o el muro que estoy jugando ahora (o null). */
  enLaCiudad(): CarreraVista | MuroVista | null {
    const p = estado.sala?.estado === "jugando" ? estado.sala.partida : null;
    return p && (p.juego === "carrera" || p.juego === "muro") ? p : null;
  },
};

export function useJuegos(): Estado {
  return useSyncExternalStore(juegosRed.subscribe, juegosRed.get, juegosRed.get);
}

/** La hora de ahora, cada tanto (para los relojes de la pantalla). */
export function useAhora(cada = 250): number {
  const [t, setT] = useState(() => Date.now());
  useEffect(() => {
    const i = setInterval(() => setT(Date.now()), cada);
    return () => clearInterval(i);
  }, [cada]);
  return t;
}
