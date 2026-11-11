/**
 * Piezas que comparten la pantalla de «¿Quién es sabio?» (SabioUI.tsx) y el duelo de sabios (SabioDuelo.tsx):
 * pedir al servidor, los números con punto de miles, las letras de las respuestas, el presentador y el reloj.
 */
import { useEffect, useState } from "react";
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

/** Si la pantalla está en vertical (teléfono): el estudio deja más lugar abajo para las preguntas. */
export function useVertical(): boolean {
  const [v, setV] = useState(() => typeof window !== "undefined" && window.innerHeight > window.innerWidth);
  useEffect(() => {
    const f = () => setV(window.innerHeight > window.innerWidth);
    window.addEventListener("resize", f);
    return () => window.removeEventListener("resize", f);
  }, []);
  return v;
}

/** El logo del concurso: las siete columnas de la casa de la sabiduría (Proverbios 9:1) y el nombre en oro. */
export function LogoSabio({ grande = false }: { grande?: boolean }) {
  return (
    <div className="flex min-w-0 items-center gap-2" aria-label="¿Quién es sabio? La casa de la sabiduría">
      <svg viewBox="0 0 64 48" className={grande ? "h-14 w-auto shrink-0" : "h-9 w-auto shrink-0"} aria-hidden="true">
        <defs>
          <linearGradient id="sabio-oro" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff3c4" />
            <stop offset=".55" stopColor="#f3c95a" />
            <stop offset="1" stopColor="#b9801a" />
          </linearGradient>
          <radialGradient id="sabio-halo" cx=".5" cy=".55" r=".6">
            <stop offset="0" stopColor="#5b6cff" stopOpacity=".55" />
            <stop offset="1" stopColor="#5b6cff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="32" cy="27" r="24" fill="url(#sabio-halo)" />
        <path d="M6 15 L32 3 L58 15 Z" fill="url(#sabio-oro)" />
        <rect x="6" y="15.5" width="52" height="3" rx="1" fill="url(#sabio-oro)" />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <g key={i}>
            <rect x={8.4 + i * 7.6} y="20" width="3.6" height="19" rx="1" fill="url(#sabio-oro)" />
            <rect x={7.6 + i * 7.6} y="38.5" width="5.2" height="2" rx=".6" fill="url(#sabio-oro)" />
          </g>
        ))}
        <rect x="4" y="41.5" width="56" height="3.2" rx="1.2" fill="url(#sabio-oro)" />
        <circle cx="32" cy="10.4" r="2.2" fill="#fff8de" />
      </svg>
      <div className="min-w-0 leading-none">
        <p className={`sabio-titulo truncate font-serif font-black ${grande ? "text-3xl" : "text-lg sm:text-2xl"}`}>¿Quién es sabio?</p>
        <p className="mt-0.5 truncate text-[9.5px] font-bold uppercase tracking-[0.24em] text-amber-200/75">La casa de la sabiduría</p>
      </div>
    </div>
  );
}

export function Presentador({ dice, compacto = false }: { dice: string; compacto?: boolean }) {
  if (compacto)
    return (
      <div className="flex items-center gap-2 rounded-2xl bg-black/35 px-2.5 py-1.5 backdrop-blur-sm" data-testid="sabio-presentador">
        <Portrait who="etan" size={28} />
        <p className="min-w-0 flex-1 text-[12.5px] leading-snug">
          <b className="mr-1 text-[10px] uppercase tracking-wider text-amber-300">Etán:</b>
          <span className="font-serif italic">{dice}</span>
        </p>
      </div>
    );
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
