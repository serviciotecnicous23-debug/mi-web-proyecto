/**
 * La mesa de los juegos de mesa del patio (shared/mesa.ts): lo común a todos (los asientos con los compañeros de la
 * computadora, de quién es el turno y su reloj, el sonido de cada jugada y la música del juego) y la pantalla de cada
 * juego, que se elige con `PANTALLAS_MESA`.
 *
 * Para agregar la pantalla de un juego: un componente con `PantallaMesaProps` y su línea en `PANTALLAS_MESA`.
 */
import { useContext, useEffect, useRef, useState, type ComponentType } from "react";
import { Loader2 } from "lucide-react";
import { MESAS } from "@shared/mesa/index";
import { NIVELES_BOT, type MesaVista } from "@shared/mesa";
import type { MesaPartidaVista, ResultadoVista } from "@shared/juegos-grupo";
import { CiudadCtx } from "../CiudadUI";
import { juegosRed } from "../juegos-red";
import { TresEnRayaPantalla } from "./TresEnRaya";
import { AjedrezPantalla } from "./Ajedrez";
import { DamasPantalla } from "./Damas";
import { CuatroEnRayaPantalla } from "./CuatroEnRaya";
import { DominoPantalla } from "./Domino";
import { ParchisPantalla } from "./Parchis";
import { PANTALLAS_TRADICIONALES } from "./Tradicionales";
import { Ico } from "../iconos";

export type PantallaMesaProps<V = unknown, J = unknown> = {
  vista: V;
  /** Mis jugadas posibles (vacía si no me toca). */
  jugadas: J[];
  miAsiento: number | null;
  juegan: number[];
  asientos: MesaVista["asientos"];
  ultima: MesaVista["ultima"];
  jugar: (j: J) => void;
  ocupado: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const PANTALLAS_MESA: Record<string, ComponentType<PantallaMesaProps<any, any>>> = {
  "tres-en-raya": TresEnRayaPantalla,
  "cuatro-en-raya": CuatroEnRayaPantalla,
  damas: DamasPantalla,
  ajedrez: AjedrezPantalla,
  domino: DominoPantalla,
  parchis: ParchisPantalla,
  ...PANTALLAS_TRADICIONALES,
};

/** Avisa a la banda sonora qué juego está abierto (y que se cerró al salir). */
export function useMusicaDeJuego(juego: string | null) {
  useEffect(() => {
    if (!juego) return;
    window.dispatchEvent(new CustomEvent("jer-musica", { detail: juego }));
    return () => {
      window.dispatchEvent(new CustomEvent("jer-musica", { detail: null }));
    };
  }, [juego]);
}

export function MesaJuego({ p }: { p: MesaPartidaVista }) {
  const { city } = useContext(CiudadCtx);
  const m = p.mesa;
  const juego = MESAS[m.id];
  const Pantalla = PANTALLAS_MESA[m.id];
  const [ocupado, setOcupado] = useState(false);
  const [aviso, setAviso] = useState<string | null>(null);
  const [ahora, setAhora] = useState(() => Date.now());
  const recibido = useRef({ en: Date.now(), reloj: m.relojMs });
  useMusicaDeJuego(m.id);

  // el reloj del turno corre en la pantalla entre aviso y aviso del servidor
  useEffect(() => {
    recibido.current = { en: Date.now(), reloj: m.relojMs };
  }, [m.relojMs, m.ultima?.n]);
  useEffect(() => {
    const t = setInterval(() => setAhora(Date.now()), 250);
    return () => clearInterval(t);
  }, []);
  // (cada pantalla da su propio sonido a las jugadas: la madera, el dado, la ficha que cae…)

  if (!juego || !Pantalla)
    return (
      <p className="flex items-center gap-2 text-sm">
        <Loader2 className="h-4 w-4 animate-spin" /> Este juego de mesa todavía no está en tu versión: actualiza el juego.
      </p>
    );

  if (juego.relojPropio)
    return (
      <div className="space-y-2" data-testid="mesa-juego">
        <h3 className="font-serif text-lg font-black">
          <Ico e={juego.icono ?? ""} /> {juego.nombre}
        </h3>
        <Pantalla vista={m.vista} jugadas={m.jugadas} miAsiento={m.miAsiento} juegan={m.juegan} asientos={m.asientos} ultima={m.ultima} jugar={(j) => void jugar(j)} ocupado={false} />
      </div>
    );

  const meToca = m.miAsiento !== null && m.juegan.includes(m.miAsiento);
  const quedaMs = recibido.current.reloj === null ? null : Math.max(0, recibido.current.reloj - (ahora - recibido.current.en));
  const turnoDe = m.juegan.length === 1 ? m.asientos[m.juegan[0]] : null;

  async function jugar(j: unknown) {
    if (ocupado) return;
    setOcupado(true);
    setAviso(null);
    const r = await juegosRed.accion("/sala/jugar", { jugada: j });
    setOcupado(false);
    if (!r.ok && r.message) {
      setAviso(r.message);
      city?.audio.wrong();
    }
  }

  return (
    <div className="space-y-3" data-testid="mesa-juego">
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-serif text-lg font-black">
          <Ico e={juego.icono ?? ""} /> {juego.nombre}
        </h3>
        {quedaMs !== null && (
          <span className={`rounded-full px-2 py-0.5 text-[12px] font-black tabular-nums ${quedaMs < 8000 ? "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300" : "bg-stone-100 dark:bg-stone-800"}`} data-testid="mesa-reloj">
            <Ico e="⏳" /> {Math.ceil(quedaMs / 1000)} s
          </span>
        )}
      </div>
      <ul className="flex flex-wrap gap-1.5" data-testid="mesa-asientos">
        {m.asientos.map((a) => {
          const juega = m.juegan.includes(a.n);
          return (
            <li
              key={a.n}
              className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[12px] font-bold transition-all ${
                juega ? "scale-105 bg-amber-400 text-amber-950 shadow-[0_0_12px_rgba(251,191,36,0.7)]" : "bg-white text-stone-700 dark:bg-stone-800 dark:text-stone-200"
              } ${a.yo ? "ring-2 ring-amber-600" : ""}`}
            >
              {a.bot ? <span title={`Compañero de la computadora · ${NIVELES_BOT[a.bot].nombre}`}>{NIVELES_BOT[a.bot].icono}</span> : null}
              {a.nombre}
              {a.yo ? " (tú)" : ""}
              {juega && m.juegan.length === 1 && a.bot ? <Loader2 className="h-3 w-3 animate-spin" aria-label="pensando" /> : null}
            </li>
          );
        })}
      </ul>
      <p className={`text-center text-[13px] font-bold ${meToca ? "text-amber-700 dark:text-amber-300" : "text-stone-500"}`} data-testid="mesa-turno">
        {meToca ? "¡Te toca!" : m.miAsiento === null ? "Estás mirando la partida." : turnoDe ? `Juega ${turnoDe.nombre}${turnoDe.bot ? " (pensando…)" : ""}` : "Esperando a los demás…"}
      </p>
      <Pantalla vista={m.vista} jugadas={m.jugadas} miAsiento={m.miAsiento} juegan={m.juegan} asientos={m.asientos} ultima={m.ultima} jugar={(j) => void jugar(j)} ocupado={ocupado || !meToca} />
      {aviso && <p className="rounded-lg bg-amber-50 p-2 text-center text-[12px] text-amber-900 dark:bg-amber-950/40 dark:text-amber-200">{aviso}</p>}
    </div>
  );
}

/** El tablero como quedó al terminar (con la última jugada y la línea ganadora), arriba del resultado. */
export function MesaFinal({ r }: { r: ResultadoVista }) {
  const f = r.mesaFinal;
  const Pantalla = r.mesa ? PANTALLAS_MESA[r.mesa] : undefined;
  if (!f || !Pantalla) return null;
  const yo = f.asientos.find((a) => a.yo)?.n ?? null;
  return (
    <div className="pointer-events-none rounded-2xl bg-stone-900/5 p-2 dark:bg-white/5" aria-label="El tablero al terminar" data-testid="mesa-final">
      <Pantalla vista={f.vista} jugadas={[]} miAsiento={yo} juegan={[]} asientos={f.asientos} ultima={f.ultima} jugar={() => {}} ocupado />
    </div>
  );
}
