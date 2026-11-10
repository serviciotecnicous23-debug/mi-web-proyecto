/**
 * Piezas de pantalla que comparten el templo y la ciudad: la ventana con su título, el versículo
 * y los números con el formato de la región.
 */
import { X } from "lucide-react";

export const fmt = (n: number) => Math.floor(n).toLocaleString("es-419");

/** «hace 5 min», «hace 2 h», «hace 3 días». */
export function hace(iso: string) {
  const m = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
  if (m < 1) return "ahora";
  if (m < 60) return `hace ${m} min`;
  const h = Math.round(m / 60);
  if (h < 24) return `hace ${h} h`;
  const d = Math.round(h / 24);
  return `hace ${d} ${d === 1 ? "día" : "días"}`;
}

export function Card({ children, title, onClose, wide, testid }: { children: React.ReactNode; title?: React.ReactNode; onClose?: () => void; wide?: boolean; testid?: string }) {
  return (
    <div
      className={`relative flex max-h-full w-full ${wide ? "max-w-2xl" : "max-w-md"} flex-col overflow-hidden rounded-2xl border border-amber-300/40 bg-[#fffaf0] text-stone-800 shadow-2xl dark:bg-[#1f1a12] dark:text-stone-100`}
      data-testid={testid}
    >
      {title && (
        <div className="flex items-center justify-between gap-2 border-b border-amber-200/60 bg-gradient-to-r from-amber-100 to-amber-50 px-4 py-2.5 dark:border-amber-900/50 dark:from-amber-950/60 dark:to-transparent">
          <div className="font-serif text-lg font-bold text-amber-900 dark:text-amber-200">{title}</div>
          {onClose && (
            <button type="button" onClick={onClose} className="rounded-full p-1 hover:bg-black/10" aria-label="Cerrar">
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      )}
      <div className="overflow-y-auto">{children}</div>
    </div>
  );
}

export function VerseBox({ text, refName }: { text: string; refName: string }) {
  return (
    <blockquote className="rounded-xl border-l-4 border-amber-400 bg-amber-50 px-3 py-2 font-serif text-[15px] italic leading-relaxed text-stone-700 dark:bg-amber-950/30 dark:text-stone-200">
      «{text}»
      <footer className="mt-1 text-xs font-semibold not-italic text-amber-800 dark:text-amber-300">{refName} (RVR1960)</footer>
    </blockquote>
  );
}
