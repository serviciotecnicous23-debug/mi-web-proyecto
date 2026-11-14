/**
 * Lo común a los tableros de 8 × 8 (ajedrez y damas): las piezas con un número propio para que se deslicen de casilla en
 * casilla, las que se comen se apagan, y los saltos de una comida larga se ven uno por uno.
 */
import { useEffect, useRef, useState } from "react";

export type PiezaEnTablero = { id: number; sq: number; v: number; sale?: boolean };

type Cache = { clave: string; n: number; t: readonly number[]; ids: number[]; quitadas: PiezaEnTablero[]; mueve: number | null };

function idsNuevos(t: readonly number[], siguiente: { n: number }): number[] {
  return t.map((v) => (v ? siguiente.n++ : 0));
}

/**
 * Las piezas del tablero con su número. Cuando llega una jugada nueva (`n` sube y `camino` dice de dónde a dónde), la
 * pieza del origen pasa al destino con su mismo número (así se desliza); lo demás que cambió (la torre del enroque, el
 * peón comido al paso) se arregla mirando qué pieza se fue y cuál llegó.
 */
export function usePiezasAnimadas(t: readonly number[], camino: readonly number[] | null, n: number, pasoMs = 230) {
  const siguiente = useRef({ n: 1 });
  const cache = useRef<Cache | null>(null);
  const clave = `${n}|${t.join(",")}`;
  if (!cache.current || cache.current.clave !== clave) {
    const antes = cache.current;
    let ids: number[] | null = null;
    let quitadas: PiezaEnTablero[] = [];
    let mueve: number | null = null;
    if (antes && camino && camino.length >= 2 && n === antes.n + 1 && antes.t[camino[0]]) {
      ids = [...antes.ids];
      const id = ids[camino[0]];
      ids[camino[0]] = 0;
      const destino = camino[camino.length - 1];
      if (ids[destino]) quitadas.push({ id: ids[destino], sq: destino, v: antes.t[destino], sale: true });
      ids[destino] = id;
      mueve = id;
      // lo que quedó sin pieza y lo que llegó sin número (la torre del enroque; lo comido al paso o en el camino)
      for (let i = 0; i < 64; i++) {
        if (!t[i] && ids[i]) {
          quitadas.push({ id: ids[i], sq: i, v: antes.t[i], sale: true });
          ids[i] = 0;
        }
      }
      for (let i = 0; i < 64; i++) {
        if (t[i] && !ids[i]) {
          const k = quitadas.findIndex((q) => q.v === t[i]);
          if (k >= 0) {
            ids[i] = quitadas[k].id;
            quitadas.splice(k, 1);
          } else ids[i] = siguiente.current.n++;
        }
      }
    }
    if (!ids) {
      ids = idsNuevos(t, siguiente.current);
      quitadas = [];
    }
    cache.current = { clave, n, t: [...t], ids, quitadas, mueve };
  }
  const c = cache.current;

  // las comidas se apagan un momento
  const [salen, setSalen] = useState<PiezaEnTablero[]>([]);
  // los saltos de una comida larga, uno por uno
  const [paso, setPaso] = useState<{ id: number; camino: readonly number[]; k: number } | null>(null);
  const visto = useRef(c.clave);
  useEffect(() => {
    if (visto.current === c.clave) return;
    visto.current = c.clave;
    if (c.quitadas.length) {
      setSalen(c.quitadas);
      const t1 = setTimeout(() => setSalen([]), 420 + (camino ? camino.length * pasoMs : 0));
      return () => clearTimeout(t1);
    }
    return undefined;
  }, [c.clave, c.quitadas, camino, pasoMs]);
  useEffect(() => {
    if (!camino || camino.length <= 2 || c.mueve === null) return undefined;
    setPaso({ id: c.mueve, camino, k: 1 });
    const ts: ReturnType<typeof setTimeout>[] = [];
    for (let k = 2; k < camino.length; k++) ts.push(setTimeout(() => setPaso((p) => (p ? { ...p, k } : p)), (k - 1) * pasoMs));
    ts.push(setTimeout(() => setPaso(null), (camino.length - 1) * pasoMs + 30));
    return () => ts.forEach(clearTimeout);
  }, [c.clave]); // eslint-disable-line react-hooks/exhaustive-deps

  const piezas: PiezaEnTablero[] = [];
  for (let i = 0; i < 64; i++) if (t[i]) piezas.push({ id: c.ids[i], sq: paso && paso.id === c.ids[i] ? paso.camino[paso.k] : i, v: t[i] });
  for (const s of salen) if (!piezas.some((p) => p.id === s.id)) piezas.push(s);
  return piezas.sort((a, b) => a.id - b.id);
}

/** La casilla que se ve en (fila, col) de la pantalla: quien juega con las negras (o arriba) ve el tablero al revés. */
export const casillaEnPantalla = (sq: number, alReves: boolean) => (alReves ? 63 - sq : sq);

/** Una corona de cinco puntas, con perlas (sin nada con forma de cruz): para la dama de las damas. */
export function CoronaSvg({ className = "", color = "#f59e0b" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 100 80" className={className} aria-hidden="true">
      <path d="M14 62 L8 22 L30 42 L50 12 L70 42 L92 22 L86 62 Z" fill={color} stroke="#78350f" strokeWidth="4" strokeLinejoin="round" />
      <rect x="14" y="60" width="72" height="12" rx="4" fill={color} stroke="#78350f" strokeWidth="4" />
      {[
        [8, 22],
        [50, 12],
        [92, 22],
      ].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="6" fill="#fef3c7" stroke="#78350f" strokeWidth="3" />
      ))}
      <circle cx="50" cy="66" r="4" fill="#dc2626" />
    </svg>
  );
}

/**
 * Un estallido corto en una casilla (al comer): un aro que crece y seis chispas. Va dentro del tablero, en % de su lado;
 * la animación corre una sola vez y queda invisible.
 */
export function Estallido({ izq, arriba, tam, color = "#fca5a5" }: { izq: string; arriba: string; tam: string; color?: string }) {
  return (
    <span className="pointer-events-none absolute z-[5]" style={{ left: izq, top: arriba, width: tam, height: tam }} aria-hidden="true">
      <span className="absolute inset-[12%] rounded-full border-[3px]" style={{ borderColor: color, animation: "mesa-estalla 540ms ease-out both" }} />
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <span key={a} className="absolute inset-0" style={{ transform: `rotate(${a}deg)` }}>
          <span className="absolute left-1/2 h-[13%] w-[13%] -translate-x-1/2 rounded-full" style={{ background: color, animation: "mesa-chispa 560ms ease-out both" }} />
        </span>
      ))}
    </span>
  );
}

/** La veta de la madera, encima de las casillas (muy suave: no tapa nada). */
export function VetaMadera({ className = "" }: { className?: string }) {
  return (
    <span
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{ background: "repeating-linear-gradient(97deg, rgba(60,30,8,.10) 0 1px, transparent 1px 7px), repeating-linear-gradient(3deg, rgba(255,240,210,.05) 0 2px, transparent 2px 13px)", mixBlendMode: "multiply" }}
      aria-hidden="true"
    />
  );
}

export const TECLAS_ANIMACION = `
@keyframes mesa-aparece { from { transform: scale(.6); opacity: 0 } to { transform: scale(1); opacity: 1 } }
@keyframes mesa-latido { 0%,100% { box-shadow: 0 0 0 0 rgba(239,68,68,.75) } 50% { box-shadow: 0 0 0 7px rgba(239,68,68,0) } }
@keyframes mesa-estalla { 0% { transform: scale(.35); opacity: 1 } 100% { transform: scale(1.55); opacity: 0 } }
@keyframes mesa-chispa { 0% { top: 44%; opacity: 1 } 100% { top: -10%; opacity: 0 } }
@keyframes mesa-asienta { 0% { transform: scale(1) } 35% { transform: scale(1.13) translateY(-4%) } 70% { transform: scale(.95) } 100% { transform: scale(1) } }
@keyframes mesa-destello { 0% { opacity: .95; transform: scale(.6) } 100% { opacity: 0; transform: scale(1.7) } }
@media (prefers-reduced-motion: reduce) {
  [style*="mesa-estalla"], [style*="mesa-chispa"], [style*="mesa-destello"] { animation: none !important; opacity: 0 }
  [style*="mesa-asienta"] { animation: none !important }
}
`;
