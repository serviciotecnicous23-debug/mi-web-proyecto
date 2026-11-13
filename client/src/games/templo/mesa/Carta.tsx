/**
 * Una carta de la lotería bíblica: el número arriba, el dibujo propio en el centro y el nombre abajo, sobre papel con
 * un marco de color. Sirve para la tabla, para el cantor y para la memoria.
 */
import { memo } from "react";
import { CARTAS_LOTERIA } from "@shared/mesa/loteria-cartas";
import { Figura } from "./figuras";

const MARCO: Record<string, string> = { personaje: "#b8432f", animal: "#3f8f4f", objeto: "#c99024", lugar: "#3b6fb6" };

export const CartaLoteria = memo(function CartaLoteria({ i, tam = "md", className = "" }: { i: number; tam?: "sm" | "md" | "lg"; className?: string }) {
  const c = CARTAS_LOTERIA[i];
  if (!c) return null;
  const marco = MARCO[c.tipo];
  const num = tam === "lg" ? "text-sm" : tam === "md" ? "text-[10px]" : "text-[8px]";
  const nombre = tam === "lg" ? "text-base" : tam === "md" ? "text-[10.5px]" : "text-[8.5px]";
  return (
    <div className={`relative flex h-full w-full flex-col overflow-hidden rounded-[10%/7.5%] border-2 bg-[#fbf3df] shadow-md ${className}`} style={{ borderColor: marco }}>
      <div className="flex items-center justify-between px-[6%] pt-[3%]">
        <span className={`font-serif font-black leading-none ${num}`} style={{ color: marco }}>
          {c.n}
        </span>
      </div>
      <div className="relative mx-[6%] mt-[2%] flex-1 overflow-hidden rounded-[8%] border" style={{ borderColor: `${marco}66` }}>
        <Figura id={c.id} className="absolute inset-0 h-full w-full" />
      </div>
      <div className={`truncate px-[4%] pb-[4%] pt-[2%] text-center font-serif font-black uppercase leading-tight tracking-tight text-[#3a2616] ${nombre}`}>{c.nombre}</div>
    </div>
  );
});

/** El dorso de una carta (para la memoria y la baraja del cantor): una lámpara en su medallón y hojas de olivo, sin cruces. */
export function DorsoCarta({ className = "" }: { className?: string }) {
  return (
    <div className={`relative h-full w-full overflow-hidden rounded-[10%/7.5%] border-2 border-[#7a4a22] shadow-md ${className}`} style={{ background: "linear-gradient(145deg,#8a2b2b,#5a1a1a)" }}>
      <svg viewBox="0 0 60 80" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
        <rect x="4" y="4" width="52" height="72" rx="5" fill="none" stroke="#f1c232" strokeWidth="1.2" opacity=".8" />
        <rect x="7" y="7" width="46" height="66" rx="4" fill="none" stroke="#f1c232" strokeWidth=".6" opacity=".55" />
        {/* el medallón con la lámpara, y un anillo de puntitos alrededor (nada en forma de cruz) */}
        <circle cx="30" cy="40" r="15" fill="#f1c232" opacity=".12" stroke="#f1c232" strokeWidth=".7" strokeOpacity=".7" />
        {[...Array(16)].map((_, k) => {
          const a = (k / 16) * Math.PI * 2;
          return <circle key={k} cx={30 + Math.cos(a) * 18.5} cy={40 + Math.sin(a) * 18.5} r=".9" fill="#f1c232" opacity=".6" />;
        })}
        <path d="M22.5 45 Q30 39 37.5 45 Q35.5 49.5 30 49.5 Q24.5 49.5 22.5 45 Z" fill="#f1c232" opacity=".9" />
        <path d="M37.5 45 Q40 43 41 41" stroke="#f1c232" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity=".9" />
        <path d="M30 33 Q33.5 37.5 31.6 41 Q30 42.2 28.4 41 Q26.5 37.5 30 33 Z" fill="#fff3b0" />
        {/* hojas de olivo en las esquinas */}
        {[
          [12, 14, 40],
          [48, 14, 140],
          [12, 66, -40],
          [48, 66, -140],
        ].map(([x, y, g], k) => (
          <g key={k} transform={`translate(${x} ${y}) rotate(${g})`} opacity=".75">
            <path d="M0 0 Q4 -3 8 0 Q4 3 0 0 Z" fill="#9bd970" />
            <path d="M3 0 Q6 -5 10 -3 Q7 0 3 0 Z" fill="#9bd970" />
          </g>
        ))}
      </svg>
    </div>
  );
}

/** El frijolito que marca una figura en la tabla. */
export function Frijol({ color = "#7a2e1c" }: { color?: string }) {
  return (
    <svg viewBox="0 0 40 30" className="mesa-frijol h-[46%] w-[58%] drop-shadow-[0_3px_2px_rgba(0,0,0,.35)]" aria-hidden="true">
      <path d="M6 16 Q4 4 18 4 Q30 3 35 11 Q38 22 26 26 Q16 29 10 25 Q6 22 6 16 Z" fill={color} stroke="#3a1a10" strokeWidth="1.4" />
      <path d="M12 10 Q18 7 25 9" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" opacity=".55" />
      <path d="M17 20 Q22 18 27 20" stroke="#3a1a10" strokeWidth="1" fill="none" opacity=".5" />
    </svg>
  );
}
