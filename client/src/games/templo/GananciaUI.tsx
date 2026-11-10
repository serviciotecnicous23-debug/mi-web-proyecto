/**
 * Lo que se gana se ve (Jerusalén en línea): después de cada envío de servicio aparece unos segundos
 * «+6 mérito · +4 ✨ gozo» (lo que el servidor contó de verdad, con los topes del día y las fiestas).
 */
import { useEffect, useState } from "react";
import { useGame } from "./store";

export function GananciaEnLinea({ className = "" }: { className?: string }) {
  const { online } = useGame();
  const u = online?.ultimo ?? null;
  const [ver, setVer] = useState<typeof u>(null);
  useEffect(() => {
    if (!u) return;
    setVer(u);
    const t = setTimeout(() => setVer(null), 3500);
    return () => clearTimeout(t);
    // cada envío trae su marca de tiempo: solo entonces se vuelve a mostrar
  }, [u?.at]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!ver) return null;
  const partes = [ver.merito > 0 ? `+${ver.merito} mérito` : "", ver.gozo > 0 ? `+${ver.gozo} ✨ gozo` : ""].filter(Boolean);
  if (!partes.length) return null;
  return (
    <div
      className={`pointer-events-none w-fit rounded-full bg-emerald-600/90 px-2.5 py-0.5 text-[11px] font-black text-white shadow-lg ring-1 ring-emerald-300/60 ${className}`}
      data-testid="ganancia-en-linea"
      role="status"
    >
      {partes.join(" · ")}
    </div>
  );
}
