/**
 * Un dado de verdad: un cubo con sus seis caras (el uno en rojo) que rueda hasta mostrar su valor. Cada tiro suma
 * vueltas completas, así se ve rodar. Lo usan la generala y las escaleras.
 */
const PUNTOS: Record<number, [number, number][]> = {
  1: [[50, 50]],
  2: [
    [28, 28],
    [72, 72],
  ],
  3: [
    [27, 27],
    [50, 50],
    [73, 73],
  ],
  4: [
    [28, 28],
    [72, 28],
    [28, 72],
    [72, 72],
  ],
  5: [
    [27, 27],
    [73, 27],
    [50, 50],
    [27, 73],
    [73, 73],
  ],
  6: [
    [28, 24],
    [28, 50],
    [28, 76],
    [72, 24],
    [72, 50],
    [72, 76],
  ],
};
/** Dónde va cada cara en el cubo, y cómo se gira el cubo para mostrarla de frente. */
const CARA: Record<number, string> = { 1: "rotateY(0deg)", 2: "rotateY(90deg)", 3: "rotateX(90deg)", 4: "rotateX(-90deg)", 5: "rotateY(-90deg)", 6: "rotateY(180deg)" };
const GIRO: Record<number, [number, number]> = { 1: [0, 0], 2: [0, -90], 3: [-90, 0], 4: [90, 0], 5: [0, 90], 6: [0, 180] };

/** Un dado de verdad: un cubo con sus seis caras que rueda hasta mostrar su valor. */
export function Dado({ valor, vueltas, guardado, tam = 50, onClick, deshabilitado, i }: { valor: number; vueltas: number; guardado: boolean; tam?: number; onClick?: () => void; deshabilitado?: boolean; i: number }) {
  const [gx, gy] = GIRO[valor || 1];
  // cada tiro suma vueltas completas (distintas por dado), así se ve rodar
  const rx = gx + vueltas * 360 * (1 + (i % 2));
  const ry = gy + vueltas * 360 * (2 - (i % 2)) + (i - 2) * 12 * Math.sign(vueltas % 2 ? 1 : -1);
  const z = tam / 2;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={deshabilitado}
      aria-pressed={guardado}
      aria-label={valor ? `Dado con ${valor}${guardado ? ", guardado" : ""}` : "Dado sin tirar"}
      className={`relative transition-transform duration-300 disabled:cursor-default ${guardado ? "-translate-y-3" : ""}`}
      style={{ width: tam, height: tam, perspective: 400 }}
      data-testid={`generala-dado-${i}`}
    >
      <span className="absolute -bottom-2 left-1/2 h-2 w-[80%] -translate-x-1/2 rounded-[50%] bg-black/35 blur-[2px]" aria-hidden="true" />
      <span className="mesa-dado absolute inset-0 block" style={{ transform: `rotateX(${rx}deg) rotateY(${ry}deg)`, opacity: valor ? 1 : 0.55 }}>
        {[1, 2, 3, 4, 5, 6].map((c) => (
          <span key={c} className="mesa-dado-cara" style={{ transform: `${CARA[c]} translateZ(${z}px)` }}>
            {PUNTOS[c].map(([x, y], k) => (
              <span key={k} className="mesa-punto" style={{ left: `${x}%`, top: `${y}%`, background: c === 1 ? "radial-gradient(circle at 35% 30%, #e05a48, #9a2416)" : undefined, width: c === 1 ? "24%" : undefined, height: c === 1 ? "24%" : undefined }} />
            ))}
          </span>
        ))}
      </span>
      {guardado && <span className="pointer-events-none absolute -inset-1 rounded-[22%] ring-[3px] ring-amber-300 shadow-[0_0_14px_rgba(241,194,50,.8)]" aria-hidden="true" />}
    </button>
  );
}

