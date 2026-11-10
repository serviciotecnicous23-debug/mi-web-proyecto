/**
 * Motor común, la parte de la pantalla: las flechas en pantalla (esquema «Botones de flechas»), el
 * espacio que ocupan los controles abajo, la ayuda según el esquema y el panel de controles de la
 * pausa (esquema, zurdos, botones grandes, tocar para ir, vibración, mando, teclado y pantalla).
 */
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Footprints, Gamepad2, Keyboard, Smartphone } from "lucide-react";
import {
  ESQUEMAS, alCambiarControles, girarPantalla, guardarControles, leerControles, mandoConectado, puedeGirar,
  type Controles, type Orientacion,
} from "./controles";
import { setVibracion, vibracionActiva } from "./entrada";

/** Los controles que eligió el jugador (se actualiza cuando cambian). */
export function useControles(): Controles {
  const [c, setC] = useState(leerControles);
  useEffect(() => alCambiarControles(setC), []);
  return c;
}

/** ¿La pantalla está acostada? */
function useHorizontal(): boolean {
  const [h, setH] = useState(() => typeof window !== "undefined" && window.innerWidth > window.innerHeight);
  useEffect(() => {
    const f = () => setH(window.innerWidth > window.innerHeight);
    window.addEventListener("resize", f);
    return () => window.removeEventListener("resize", f);
  }, []);
  return h;
}

const lado = (c: Controles) => (c.esquema === "cruceta" ? (c.grande ? 196 : 160) : c.grande ? 250 : 206);

/**
 * El espacio que ocupan abajo el joystick fijo o las flechas, para que los avisos no queden
 * debajo: arriba de ellos con la pantalla parada y a un costado con la pantalla acostada.
 */
export function useReservaControles(): CSSProperties {
  const c = useControles();
  const horizontal = useHorizontal();
  if (c.esquema !== "cruceta" && c.esquema !== "fijo") return {};
  const ocupa = lado(c);
  if (!horizontal) return { paddingBottom: `calc(${ocupa + 8}px + var(--tpl-sb, 0px))` };
  const otro = c.esquema === "cruceta" ? 96 : 12;
  return c.zurdo
    ? { paddingRight: `calc(${ocupa}px + var(--tpl-sr, 0px))`, paddingLeft: `calc(${otro}px + var(--tpl-sl, 0px))` }
    : { paddingLeft: `calc(${ocupa}px + var(--tpl-sl, 0px))`, paddingRight: `calc(${otro}px + var(--tpl-sr, 0px))` };
}

/** La ayuda corta de abajo, según cómo se mueve el jugador. */
export function textoAyuda(c: Controles): string {
  const tocar = c.esquema !== "tocar" && c.tocarParaIr ? "toca el piso para ir · " : "";
  switch (c.esquema) {
    case "fijo":
      return `Arrastra el joystick de la esquina (más lejos para correr) · ${tocar}pellizca para acercar`;
    case "cruceta":
      return `Usa las flechas y «Correr» · ${tocar}pellizca para acercar`;
    case "tocar":
      return "Toca el lugar a donde quieres ir · pellizca para acercar";
    default:
      return `Toca el piso para ir o arrastra para caminar (más lejos para correr) · pellizca para acercar · computadora: W A S D, Mayús corre`;
  }
}

function tecla(tipo: "keydown" | "keyup", key: string) {
  window.dispatchEvent(new KeyboardEvent(tipo, { key, bubbles: true, cancelable: true }));
}

/** Un botón que se mantiene apretado: manda la tecla al apretar y la suelta al levantar el dedo. */
function Tecla({ k, label, className, children }: { k: string; label: string; className: string; children: ReactNode }) {
  const abajo = useRef(false);
  const soltar = () => {
    if (!abajo.current) return;
    abajo.current = false;
    tecla("keyup", k);
  };
  useEffect(
    () => () => {
      if (abajo.current) tecla("keyup", k);
    },
    [k],
  );
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={`pointer-events-auto flex touch-none select-none items-center justify-center rounded-2xl bg-black/45 text-white shadow-lg ring-1 ring-white/30 backdrop-blur-sm active:bg-amber-400 active:text-amber-950 ${className}`}
      onPointerDown={(e) => {
        e.preventDefault();
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch {
          /* sin captura */
        }
        abajo.current = true;
        tecla("keydown", k);
      }}
      onPointerUp={soltar}
      onPointerCancel={soltar}
      onLostPointerCapture={soltar}
      onContextMenu={(e) => e.preventDefault()}
      data-testid={`cruceta-${k.toLowerCase()}`}
    >
      {children}
    </button>
  );
}

/** Las flechas en pantalla y el botón «Correr» (solo con el esquema «Botones de flechas»). */
export function Cruceta({ oculto }: { oculto?: boolean }) {
  const c = useControles();
  if (c.esquema !== "cruceta" || oculto) return null;
  const t = c.grande ? "h-[60px] w-[60px]" : "h-12 w-12";
  const i = c.grande ? "h-8 w-8" : "h-6 w-6";
  const abajo = { bottom: "calc(0.75rem + var(--tpl-sb, 0px))" };
  return (
    <>
      <div
        className="absolute grid grid-cols-3 gap-1"
        style={{ ...abajo, ...(c.zurdo ? { right: "calc(0.75rem + var(--tpl-sr, 0px))" } : { left: "calc(0.75rem + var(--tpl-sl, 0px))" }) }}
        data-testid="templo-cruceta"
      >
        <span />
        <Tecla k="ArrowUp" label="Adelante" className={t}>
          <ChevronUp className={i} />
        </Tecla>
        <span />
        <Tecla k="ArrowLeft" label="Izquierda" className={t}>
          <ChevronLeft className={i} />
        </Tecla>
        <span />
        <Tecla k="ArrowRight" label="Derecha" className={t}>
          <ChevronRight className={i} />
        </Tecla>
        <span />
        <Tecla k="ArrowDown" label="Atrás" className={t}>
          <ChevronDown className={i} />
        </Tecla>
        <span />
      </div>
      <div className="absolute" style={{ ...abajo, ...(c.zurdo ? { left: "calc(1rem + var(--tpl-sl, 0px))" } : { right: "calc(1rem + var(--tpl-sr, 0px))" }) }}>
        <Tecla k="Shift" label="Correr (mantener)" className={`${c.grande ? "h-20 w-20" : "h-16 w-16"} flex-col rounded-full text-[11px] font-black`}>
          <Footprints className={i} />
          Correr
        </Tecla>
      </div>
    </>
  );
}

// ---------------------------------------------------------------- orientación
const CLAVE_ORIENTACION = "templo-orientacion";

export function orientacionGuardada(): Orientacion {
  try {
    const v = localStorage.getItem(CLAVE_ORIENTACION);
    return v === "horizontal" || v === "vertical" ? v : "auto";
  } catch {
    return "auto";
  }
}

/** Gira la pantalla y lo recuerda. Devuelve un aviso si el teléfono no deja girarla desde el juego. */
export async function elegirOrientacion(o: Orientacion): Promise<string | null> {
  try {
    localStorage.setItem(CLAVE_ORIENTACION, o);
  } catch {
    /* modo privado */
  }
  if (o === "auto") {
    await girarPantalla("auto");
    return null;
  }
  const ok = await girarPantalla(o);
  return ok ? null : "Gira el teléfono con la mano: el juego se acomoda solo (en el iPhone no se puede girar desde el juego).";
}

// ---------------------------------------------------------------- panel de la pausa
function Interruptor({ on, onClick, children, testid, disabled }: { on: boolean; onClick: () => void; children: ReactNode; testid?: string; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={on}
      className={`flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-sm ${on ? "bg-amber-400/20 text-white" : "bg-white/5 text-white/75"} disabled:opacity-40`}
      data-testid={testid}
    >
      <span>{children}</span>
      <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-black ${on ? "bg-amber-400 text-amber-950" : "bg-white/15"}`}>{on ? "Sí" : "No"}</span>
    </button>
  );
}

/** Controles en la pausa: el esquema, zurdos, botones grandes, tocar para ir, vibración, mando, teclado y pantalla. */
export function PanelControles({ big, onVolver }: { big: boolean; onVolver: () => void }) {
  const c = useControles();
  const [vibra, setVibra] = useState(() => vibracionActiva());
  const [mando, setMando] = useState(() => mandoConectado());
  const [orient, setOrient] = useState<Orientacion>(() => orientacionGuardada());
  const [aviso, setAviso] = useState<string | null>(null);
  const puedeVibrar = typeof navigator !== "undefined" && "vibrate" in navigator;
  useEffect(() => {
    const f = () => setMando(mandoConectado());
    window.addEventListener("gamepadconnected", f);
    window.addEventListener("gamepaddisconnected", f);
    const id = window.setInterval(f, 1500);
    return () => {
      window.removeEventListener("gamepadconnected", f);
      window.removeEventListener("gamepaddisconnected", f);
      window.clearInterval(id);
    };
  }, []);
  const poner = (p: Partial<Controles>) => guardarControles({ ...c, ...p });
  const conLado = c.esquema === "fijo" || c.esquema === "cruceta";
  return (
    <div className="space-y-3 text-left" data-testid="templo-controles">
      <h3 className="text-center font-serif text-2xl font-black">Controles</h3>
      <div className="space-y-1.5">
        {ESQUEMAS.map((e) => (
          <button
            key={e.id}
            type="button"
            onClick={() => poner({ esquema: e.id })}
            aria-pressed={c.esquema === e.id}
            className={`w-full rounded-xl border px-3 py-2 text-left ${c.esquema === e.id ? "border-amber-300 bg-amber-400/20" : "border-white/10 bg-white/5 hover:bg-white/10"}`}
            data-testid={`controles-${e.id}`}
          >
            <span className="block text-sm font-bold">{e.nombre}</span>
            <span className="block text-[11px] text-white/70">{e.texto}</span>
          </button>
        ))}
      </div>
      <div className="space-y-1.5">
        {conLado && (
          <Interruptor on={c.zurdo} onClick={() => poner({ zurdo: !c.zurdo })} testid="controles-zurdo">
            Controles a la derecha (para zurdos)
          </Interruptor>
        )}
        {conLado && (
          <Interruptor on={c.grande} onClick={() => poner({ grande: !c.grande })} testid="controles-grande">
            Botones más grandes
          </Interruptor>
        )}
        {c.esquema !== "tocar" && (
          <Interruptor on={c.tocarParaIr} onClick={() => poner({ tocarParaIr: !c.tocarParaIr })} testid="controles-tocar-para-ir">
            Tocar el piso para ir
          </Interruptor>
        )}
        {puedeVibrar && (
          <Interruptor
            on={vibra}
            onClick={() => {
              setVibracion(!vibra);
              setVibra(!vibra);
            }}
            testid="button-pausa-vibrar"
          >
            Vibración en las acciones
          </Interruptor>
        )}
      </div>
      {big && (
        <div className="rounded-xl bg-white/5 p-2.5">
          <p className="mb-1.5 flex items-center gap-1.5 text-sm font-bold">
            <Smartphone className="h-4 w-4 text-amber-300" /> Pantalla
          </p>
          <div className="grid grid-cols-3 gap-1">
            {(["auto", "horizontal", "vertical"] as Orientacion[]).map((o) => (
              <button
                key={o}
                type="button"
                onClick={async () => {
                  setOrient(o);
                  setAviso(await elegirOrientacion(o));
                }}
                className={`rounded-lg px-2 py-1.5 text-xs font-bold ${orient === o ? "bg-amber-400 text-amber-950" : "bg-white/10 hover:bg-white/20"}`}
                data-testid={`pantalla-${o}`}
              >
                {o === "auto" ? "Automática" : o === "horizontal" ? "Horizontal" : "Vertical"}
              </button>
            ))}
          </div>
          {(aviso || !puedeGirar()) && <p className="mt-1.5 text-[11px] text-white/65">{aviso || "En este teléfono se gira con la mano: el juego se acomoda solo."}</p>}
        </div>
      )}
      <div className="space-y-1 rounded-xl bg-white/5 p-2.5 text-[11px] text-white/75">
        <p className="flex items-start gap-1.5">
          <Gamepad2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
          <span>
            {mando ? <b className="text-white">Mando conectado: {mando}. </b> : "Puedes conectar un mando (Bluetooth o cable). "}
            Palanca o cruceta para caminar; B, gatillo derecho o apretar la palanca para correr; LB y RB acercan; Start pausa.
          </span>
        </p>
        <p className="flex items-start gap-1.5">
          <Keyboard className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
          <span>Computadora: flechas o W A S D, Mayús para correr, + y − para acercar, P para la pausa.</span>
        </p>
      </div>
      <button type="button" onClick={onVolver} className="w-full rounded-full bg-amber-500 py-2 font-bold text-amber-950 hover:bg-amber-400" data-testid="button-controles-volver">
        Listo
      </button>
    </div>
  );
}
