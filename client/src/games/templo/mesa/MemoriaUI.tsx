/**
 * La memoria bíblica en la pantalla (shared/mesa/memoria.ts): las cartas boca abajo que se dan vuelta en 3D, un visor
 * que muestra en grande las dos que están abiertas (para leer el versículo), las parejas que se lleva cada uno con su
 * color, y el reloj y los intentos cuando se juega solo.
 */
import { useEffect, useRef, useState } from "react";
import { MEMORIA, PAREJAS, type JugadaMemoria, type MemoriaVista } from "@shared/mesa/memoria";
import { DorsoCarta } from "./Carta";
import { DefsFiguras, Figura } from "./figuras";
import { mesaSonido } from "./mesa-sonido";
import { Asiento, AvisoMesa, BotonSonido, Confeti, RelojAnillo, Sello, colorDe, quedaMs, useAhora, useAvisoCorto, useEventosNuevos, useMusicaDeJuego, type PropsMesa } from "./vida";

type Cara = { par: number; cara: "figura" | "verso" };

function CaraMemoria({ c, grande }: { c: Cara; grande?: boolean }) {
  const p = PAREJAS[c.par];
  if (!p) return null;
  if (c.cara === "figura") {
    return (
      <div className="flex h-full w-full flex-col overflow-hidden rounded-[10px] border-2 border-[#8a54b8] bg-[#fbf3df]">
        <div className="relative m-[6%] mb-0 flex-1 overflow-hidden rounded-md border border-[#8a54b8]/40">
          <Figura id={p.figura} className="absolute inset-0 h-full w-full" />
        </div>
        <p className={`truncate px-1 py-[4%] text-center font-serif font-black uppercase leading-tight text-[#3a2616] ${grande ? "text-base" : "text-[8.5px] sm:text-[10px]"}`}>{p.nombre}</p>
      </div>
    );
  }
  return (
    <div className="mesa-papel flex h-full w-full flex-col justify-center overflow-hidden rounded-[10px] border-2 border-[#b8862a] p-[7%] text-center">
      <p className={`font-serif italic leading-snug text-stone-800 ${grande ? "text-[14px]" : "line-clamp-5 text-[7px] sm:text-[8.5px]"}`}>«{p.verso.text}»</p>
      <p className={`mt-1 font-bold text-amber-900 ${grande ? "text-xs" : "text-[7px] sm:text-[8px]"}`}>{p.verso.ref}</p>
    </div>
  );
}

const reloj = (ms: number) => {
  const s = Math.floor(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

export function MemoriaUI({ vista: v, nombres, bots, jugar, recibidaEn }: PropsMesa<MemoriaVista, JugadaMemoria>) {
  useMusicaDeJuego("memoria");
  const ahora = useAhora(250);
  const [aviso, setAviso] = useAvisoCorto();
  const [sello, setSello] = useState<{ n: number; texto: string; sub?: string; color?: string } | null>(null);
  const [confeti, setConfeti] = useState(0);
  const [brilla, setBrilla] = useState<number[]>([]);
  const [ocupado, setOcupado] = useState(false);
  const yo = v.yo;
  const solo = nombres.length === 1;
  const miTurno = yo != null && v.turno === yo && v.fase === "jugando";
  const abiertas = v.cartas.map((c, i) => ({ c, i })).filter((x) => x.c.estado === "abierta");
  const temporizadores = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => () => temporizadores.current.forEach(clearTimeout), []);

  useEventosNuevos(v.eventos, (e) => {
    if (e.t === "voltea") mesaSonido.carta();
    else if (e.t === "pareja") {
      mesaSonido.bien();
      setBrilla(e.c);
      temporizadores.current.push(setTimeout(() => setBrilla([]), 1500));
      if (!solo) setSello({ n: e.n, texto: "¡Pareja!", sub: `${nombres[e.a]} · ${PAREJAS[e.par]?.nombre ?? ""}`, color: colorDe(e.a) });
    } else if (e.t === "tapa") mesaSonido.salto(-4);
    else if (e.t === "turno" && e.a === yo && !solo) mesaSonido.turno();
    else if (e.t === "fin") {
      setConfeti((x) => x + 1);
      mesaSonido.fiesta();
    }
  });

  async function voltear(i: number) {
    if (!miTurno || ocupado || v.cartas[i].estado !== "oculta" || abiertas.length >= 2) return;
    setOcupado(true);
    const r = await jugar({ t: "voltear", c: i });
    setOcupado(false);
    if (!r.ok && r.message) setAviso(r.message);
  }

  const restante = quedaMs(v.restanteMs, recibidaEn, ahora);
  const jugado = v.fase === "jugando" ? v.jugadoMs + (ahora - recibidaEn) : v.jugadoMs;
  const total = v.cartas.length / 2;
  const tomadas = v.puntos.reduce((s, x) => s + x, 0);

  return (
    <div className="mesa-raiz space-y-3" data-testid="mesa-memoria">
      <DefsFiguras />
      <Confeti disparo={confeti} />
      {sello && <Sello llave={sello.n} texto={sello.texto} sub={sello.sub} color={sello.color} />}
      <div className="flex flex-wrap items-center gap-1.5">
        {nombres.map((n, a) => (
          <Asiento key={a} a={a} nombre={n} bot={bots[a]} yo={a === yo} activo={!solo && a === v.turno && v.fase === "jugando"} extra={`${v.puntos[a] ?? 0} ${v.puntos[a] === 1 ? "pareja" : "parejas"}`} tam={28} />
        ))}
        <span className="ml-auto flex items-center gap-2">
          {solo ? (
            <span className="rounded-full bg-white/85 px-3 py-1 text-[13px] font-black tabular-nums text-stone-800 shadow" data-testid="memoria-reloj">
              ⏱ {reloj(jugado)} · {v.intentos[0] ?? 0} intentos
            </span>
          ) : (
            v.fase !== "fin" && <RelojAnillo ms={restante} total={v.fase === "preparar" ? MEMORIA.prepararMs : v.turnoMs} tam={32} />
          )}
          <BotonSonido />
        </span>
      </div>

      {/* el visor: las dos abiertas en grande */}
      <section className="mesa-pano flex min-h-[9.5rem] items-center justify-center gap-3 rounded-3xl p-3" aria-live="polite" aria-label="Las cartas abiertas">
        {abiertas.length ? (
          abiertas.map(({ c, i }) =>
            c.estado === "abierta" ? (
              <div key={i} className="mesa-pop h-[8.4rem] w-[6.3rem] shadow-xl sm:h-[10rem] sm:w-[7.5rem]">
                <CaraMemoria c={c} grande />
              </div>
            ) : null,
          )
        ) : (
          <p className="max-w-xs text-center text-[13px] font-semibold text-emerald-50/90">
            {v.fase === "preparar"
              ? "Revolviendo las cartas…"
              : v.fase === "fin"
                ? "¡Se encontraron todas las parejas!"
                : miTurno
                  ? "Da vuelta dos cartas: un personaje y su versículo."
                  : `Juega ${(nombres[v.turno] ?? "").replace(/\s*🤖\s*$/u, "")}…`}{" "}
            <span className="block text-[12px] opacity-80">
              {tomadas} de {total} parejas
            </span>
          </p>
        )}
      </section>

      <section className="mx-auto grid max-w-[42rem] gap-1.5 sm:gap-2" style={{ gridTemplateColumns: `repeat(${v.columnas}, minmax(0, 1fr))` }} aria-label="La mesa de las cartas">
        {v.cartas.map((c, i) => {
          const abierta = c.estado !== "oculta";
          const de = c.estado === "tomada" ? c.de : null;
          return (
            <button
              key={i}
              type="button"
              onClick={() => void voltear(i)}
              disabled={!miTurno || c.estado !== "oculta"}
              aria-label={c.estado === "oculta" ? `Carta ${i + 1}, boca abajo` : `${PAREJAS[c.par]?.nombre ?? ""} (${c.cara === "figura" ? "personaje" : "versículo"})`}
              className={`mesa-voltea relative aspect-[3/4] w-full transition ${c.estado === "tomada" ? "opacity-75" : ""} ${brilla.includes(i) ? "mesa-late" : ""} ${miTurno && c.estado === "oculta" ? "hover:-translate-y-0.5" : ""}`}
              data-testid={`memoria-carta-${i}`}
            >
              <span className={`mesa-voltea-dentro ${abierta ? "abierta" : ""}`}>
                <span className="mesa-voltea-cara">
                  <DorsoCarta />
                </span>
                <span className="mesa-voltea-cara frente">{c.estado !== "oculta" && <CaraMemoria c={c} />}</span>
              </span>
              {de != null && <span className="pointer-events-none absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full border-2 border-white shadow" style={{ background: colorDe(de) }} aria-hidden="true" />}
            </button>
          );
        })}
      </section>
      <AvisoMesa texto={aviso} />
    </div>
  );
}
