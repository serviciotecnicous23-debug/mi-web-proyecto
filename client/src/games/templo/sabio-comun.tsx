/**
 * Piezas que comparten la pantalla de «¿Quién es sabio?» (SabioUI.tsx) y el duelo de sabios (SabioDuelo.tsx):
 * pedir al servidor, los números con punto de miles, las letras de las respuestas, el presentador y el reloj.
 */
import type { Relacion } from "@shared/sabio";
import { Portrait } from "./Portrait";

export const API_SABIO = "/api/jerusalen/sabio";

/** Pedir algo al servidor: GET sin cuerpo, POST con cuerpo (o el método que se diga). */
export async function pedir<T>(path: string, body?: unknown, metodo?: "DELETE"): Promise<{ ok: boolean; status: number; data: (T & { message?: string }) | null }> {
  try {
    const res = await fetch(`${API_SABIO}${path}`, {
      method: metodo ?? (body === undefined ? "GET" : "POST"),
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    return { ok: res.ok, status: res.status, data: (await res.json().catch(() => null)) as (T & { message?: string }) | null };
  } catch {
    return { ok: false, status: 0, data: null };
  }
}

export const miles = (n: number) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
export const LETRAS = ["A", "B", "C", "D"];
export const primerNombre = (s: string) => s.split(/[\s,]+/)[0] || s;
export const RELACION: Record<Relacion, string> = { amigo: "tu amigo", vecino: "tu vecino", ambos: "tu amigo y vecino" };

export function Presentador({ dice }: { dice: string }) {
  return (
    <div className="flex items-start gap-2.5" data-testid="sabio-presentador">
      <Portrait who="etan" size={44} />
      <div className="relative min-w-0 flex-1 rounded-2xl rounded-tl-sm bg-white/10 px-3 py-2 text-[13px] leading-snug shadow-inner backdrop-blur-sm">
        <p className="text-[10px] font-bold uppercase tracking-wider text-amber-300">Etán ezraíta</p>
        <p className="font-serif italic">{dice}</p>
      </div>
    </div>
  );
}

export function Reloj({ restan, total }: { restan: number; total: number }) {
  const r = 18;
  const c = 2 * Math.PI * r;
  const frac = Math.max(0, Math.min(1, restan / Math.max(1, total)));
  const color = restan <= 5 ? "#f87171" : restan <= 10 ? "#fbbf24" : "#fde68a";
  return (
    <div className={`relative h-12 w-12 shrink-0 ${restan <= 5 ? "sabio-latido" : ""}`} aria-label={`Quedan ${restan} segundos`} data-testid="sabio-reloj">
      <svg viewBox="0 0 44 44" className="h-12 w-12 -rotate-90">
        <circle cx="22" cy="22" r={r} fill="rgba(0,0,0,.35)" stroke="rgba(255,255,255,.15)" strokeWidth="4" />
        <circle cx="22" cy="22" r={r} fill="none" stroke={color} strokeWidth="4" strokeDasharray={c} strokeDashoffset={c * (1 - frac)} strokeLinecap="round" style={{ transition: "stroke-dashoffset .25s linear" }} />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-sm font-black tabular-nums" style={{ color }}>
        {restan}
      </span>
    </div>
  );
}
