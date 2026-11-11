/**
 * La racha de servicio en la pantalla (shared/racha.ts): la pastilla del marcador de la ciudad, que se enciende
 * cuando hoy ya serviste y avisa si la racha está por perderse, y las líneas de «Para hoy» (la racha y lo que espera
 * mañana). Se vuelve a pedir cuando un encargo o el recado suman un día (evento «jer-racha»).
 */
import { useEffect, useState } from "react";
import { Flame } from "lucide-react";
import type { RachaVista } from "@shared/racha";

async function traerRacha(): Promise<RachaVista | null> {
  try {
    const res = await fetch("/api/jerusalen/racha", { credentials: "include", cache: "no-store" });
    return res.ok ? ((await res.json()) as RachaVista) : null;
  } catch {
    return null;
  }
}

export function useRacha(): RachaVista | null {
  const [r, setR] = useState<RachaVista | null>(null);
  useEffect(() => {
    let vivo = true;
    const pedir = () => void traerRacha().then((x) => vivo && x && setR(x));
    pedir();
    window.addEventListener("jer-racha", pedir);
    return () => {
      vivo = false;
      window.removeEventListener("jer-racha", pedir);
    };
  }, []);
  return r;
}

const dias = (n: number) => `${n} ${n === 1 ? "día" : "días"}`;

export function RachaPill({ onOpen }: { onOpen: () => void }) {
  const r = useRacha();
  if (!r) return null;
  const titulo = r.hoy
    ? `Racha de servicio: ${dias(r.actual)}. Mañana, +${r.gozoSiguiente} de gozo.`
    : r.reposoHoy && r.actual > 0
      ? `Hoy es día de reposo: tu racha de ${dias(r.actual)} no se pierde.`
      : r.enPeligro
        ? `¡Tu racha de ${dias(r.actual)} se pierde si hoy no cumples un encargo o el recado!`
        : "Empieza una racha de servicio: cumple un encargo del día o el recado.";
  return (
    <button
      type="button"
      onClick={onOpen}
      title={titulo}
      aria-label={titulo}
      className={`pointer-events-auto relative flex shrink-0 items-center gap-1 rounded-full py-1 pl-1.5 pr-2.5 text-xs font-black shadow-lg ${
        r.hoy ? "bg-gradient-to-b from-orange-400 to-red-600 text-white" : "tpl-vidrio bg-black/50 text-orange-200"
      } ${r.enPeligro ? "ring-2 ring-orange-400/80" : ""}`}
      data-testid="ciudad-racha"
    >
      <Flame className={`h-4 w-4 shrink-0 ${r.hoy ? "text-yellow-200" : "text-orange-300"}`} fill={r.hoy ? "currentColor" : "none"} />
      <span className="tabular-nums">{r.actual}</span>
      {r.enPeligro && <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 animate-ping rounded-full bg-orange-400" />}
    </button>
  );
}

/** Las líneas de la racha y de mañana para «Para hoy». */
export function lineasDeRacha(r: RachaVista): { id: string; icono: string; texto: string }[] {
  const out: { id: string; icono: string; texto: string }[] = [];
  if (r.hoy) {
    const hito = r.proximoHito ? ` · a los ${r.proximoHito.dias} días, +${r.proximoHito.gozo} más` : "";
    out.push({ id: "racha", icono: "🔥", texto: `Racha de servicio: ${dias(r.actual)}. Vuelve mañana para el día ${r.actual + 1}: +${r.gozoSiguiente} de gozo${hito}.` });
  } else if (r.reposoHoy && r.actual > 0) {
    out.push({ id: "racha", icono: "🕊️", texto: `Hoy es día de reposo: tu racha de ${dias(r.actual)} no se pierde (si sirves, también cuenta).` });
  } else if (r.enPeligro) {
    out.push({ id: "racha", icono: "🔥", texto: `¡No pierdas tu racha de ${dias(r.actual)}! Cumple un encargo o el recado hoy: +${r.gozoSiguiente} de gozo.` });
  } else {
    out.push({ id: "racha", icono: "🔥", texto: `Empieza una racha de servicio: cumple un encargo del día o el recado (+${r.gozoSiguiente} de gozo, y más cada día seguido).` });
  }
  if (r.manana.quien) out.push({ id: "manana", icono: "🌅", texto: `Mañana ${r.manana.quien} tendrá un recado para ti: «${r.manana.recado}».` });
  return out;
}
