/**
 * La generala en la pantalla (shared/mesa/generala.ts): cinco dados de verdad (cubos con sus seis caras) que ruedan
 * sobre el paño verde, el cubilete que se sacude, los dados guardados que se levantan con su anillo de oro, y la
 * planilla de todos con lo que valdría cada casilla. La generala servida llena la pantalla de confeti.
 */
import { useEffect, useRef, useState } from "react";
import { Dices } from "lucide-react";
import { CATEGORIAS_GENERALA, EXPLICA_CAT_GENERALA, GENERALA, NOMBRE_CAT_GENERALA, type CatGenerala, type GeneralaVista, type JugadaGenerala } from "@shared/mesa/generala";
import { mesaSonido } from "./mesa-sonido";
import { Dado } from "./Dado";
import { Asiento, AvisoMesa, BotonSonido, Confeti, RelojAnillo, Sello, colorDe, quedaMs, useAhora, useAvisoCorto, useEventosNuevos, useMusicaDeJuego, useGolpeFinal, type PropsMesa } from "./vida";

const nombreCorto = (n: string) => n.replace(/\s*🤖\s*$/u, "");

export function GeneralaUI({ vista: v, nombres, bots, jugar, recibidaEn }: PropsMesa<GeneralaVista, JugadaGenerala>) {
  useMusicaDeJuego("generala");
  const ahora = useAhora(250);
  const [aviso, setAviso] = useAvisoCorto();
  const [guardar, setGuardar] = useState<boolean[]>([false, false, false, false, false]);
  const [vueltas, setVueltas] = useState([0, 0, 0, 0, 0]);
  const [sacude, setSacude] = useState(0);
  const [sello, setSello] = useState<{ n: number; texto: string; sub?: string; color?: string } | null>(null);
  const [confeti, setConfeti] = useState(0);
  const [flota, setFlota] = useState<{ n: number; a: number; cat: CatGenerala; puntos: number } | null>(null);
  const [ocupado, setOcupado] = useState(false);
  const yo = v.yo;
  const miTurno = yo != null && v.turno === yo && v.fase === "jugando";
  const ultimoTic = useRef(0);

  useEventosNuevos(v.eventos, (e) => {
    if (e.t === "tiro") {
      setVueltas((x) => x.map((k, i) => (e.quedan[i] ? k : k + 1)));
      setSacude((x) => x + 1);
      mesaSonido.dados(e.quedan.filter((q) => !q).length);
    } else if (e.t === "anoto") {
      setFlota({ n: e.n, a: e.a, cat: e.cat, puntos: e.puntos });
      if (e.cat === "generala" && e.puntos) {
        setSello({ n: e.n, texto: "¡GENERALA!", sub: nombres[e.a], color: "#2e7d4f" });
        setConfeti((x) => x + 1);
        mesaSonido.fiesta();
      } else if (e.cat === "doble" && e.puntos) {
        setSello({ n: e.n, texto: "¡DOBLE GENERALA!", sub: nombres[e.a], color: "#8a54b8" });
        setConfeti((x) => x + 1);
        mesaSonido.fiesta();
      } else if (e.puntos >= 30 || e.servida) {
        setSello({ n: e.n, texto: `¡${NOMBRE_CAT_GENERALA[e.cat]}${e.servida ? " servido" : ""}!`, sub: `${nombres[e.a]} · ${e.puntos}`, color: "#b8432f" });
        mesaSonido.bien();
      } else mesaSonido.frijol();
    } else if (e.t === "servida") {
      setSello({ n: e.n, texto: "¡GENERALA SERVIDA!", sub: `¡Gana ${nombres[e.a]}!`, color: "#2e7d4f" });
      setConfeti((x) => x + 1);
      mesaSonido.fiesta();
    } else if (e.t === "turno") {
      setGuardar([false, false, false, false, false]);
      if (e.a === yo) mesaSonido.turno();
    } else if (e.t === "fin") {
      setConfeti((x) => x + 1);
      setTimeout(() => mesaSonido.fiesta(), 300);
    }
  });
  // lo que guardé se borra con cada tiro nuevo que no es mío (o cuando cambia el turno)
  useEffect(() => {
    if (!miTurno) setGuardar([false, false, false, false, false]);
    else setGuardar((g) => g.map((x, i) => (v.tiros > 0 ? x || v.guardados[i] : false)));
  }, [miTurno, v.tiros, v.guardados]);

  const restante = quedaMs(v.restanteMs, recibidaEn, ahora);
  useEffect(() => {
    if (miTurno && restante < 6000 && restante > 0 && Math.ceil(restante / 1000) !== ultimoTic.current) {
      ultimoTic.current = Math.ceil(restante / 1000);
      mesaSonido.tic();
    }
  }, [miTurno, restante]);

  async function tirar() {
    if (ocupado) return;
    setOcupado(true);
    const r = await jugar({ t: "tirar", guardar });
    setOcupado(false);
    if (!r.ok && r.message) setAviso(r.message);
  }
  async function anotar(cat: CatGenerala) {
    if (ocupado) return;
    setOcupado(true);
    const r = await jugar({ t: "anotar", cat });
    setOcupado(false);
    if (!r.ok && r.message) setAviso(r.message);
  }

  useGolpeFinal(v.fase === "fin", yo != null && v.ganadores.includes(yo), yo != null);
  const puedeGuardar = miTurno && v.tiros > 0 && v.tiros < GENERALA.tiros;
  const quien = nombres[v.turno] ?? "";

  return (
    <div className="mesa-raiz space-y-3" data-testid="mesa-generala">
      <Confeti disparo={confeti} />
      {sello && <Sello llave={sello.n} texto={sello.texto} sub={sello.sub} color={sello.color} />}
      <div className="flex flex-wrap items-center gap-1.5">
        {nombres.map((n, a) => (
          <Asiento key={a} a={a} nombre={n} bot={bots[a]} yo={a === yo} activo={a === v.turno && v.fase === "jugando"} extra={`${v.totales[a] ?? 0} puntos`} tam={28} />
        ))}
        <span className="ml-auto">
          <BotonSonido />
        </span>
      </div>

      <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-start">
        {/* la mesa con los dados */}
        <section className="mesa-pano relative overflow-hidden rounded-3xl px-3 pb-4 pt-3 text-white" aria-label="La mesa de los dados">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[12px] font-black uppercase tracking-wider text-amber-100/90">
              {v.fase === "preparar" ? "¡A sentarse a la mesa!" : v.fase === "fin" ? "Terminó la partida" : miTurno ? "¡Te toca!" : `Juega ${nombreCorto(quien)}`} · vuelta {v.ronda} de {v.rondas}
            </p>
            {v.fase !== "fin" && <RelojAnillo ms={restante} total={v.fase === "preparar" ? GENERALA.prepararMs : v.turnoMs} tam={30} />}
          </div>
          <div className="mt-5 flex min-h-[5.5rem] items-end justify-center gap-2.5 sm:gap-3.5">
            {v.dados.map((d, i) => (
              <Dado
                key={i}
                i={i}
                valor={d}
                vueltas={vueltas[i]}
                guardado={(puedeGuardar && guardar[i]) || (!miTurno && v.tiros > 0 && v.tiros < GENERALA.tiros && v.guardados[i])}
                deshabilitado={!puedeGuardar}
                onClick={() => {
                  mesaSonido.frijol();
                  setGuardar((g) => g.map((x, k) => (k === i ? !x : x)));
                }}
              />
            ))}
          </div>
          <p className="mt-3 text-center text-[12px] font-semibold text-emerald-50/90">
            {miTurno
              ? v.tiros === 0
                ? "Tira los cinco dados."
                : v.tiros < GENERALA.tiros
                  ? "Toca los dados que quieres guardar, y vuelve a tirar o anota en tu planilla."
                  : "Ya tiraste tres veces: anota en tu planilla."
              : v.fase === "jugando"
                ? `${nombreCorto(quien)} ${v.tiros === 0 ? "va a tirar…" : `va en el tiro ${v.tiros} de 3`}`
                : ""}
          </p>
          {miTurno && v.tiros < GENERALA.tiros && (
            <div className="mt-3 flex justify-center">
              <button
                type="button"
                onClick={() => void tirar()}
                disabled={ocupado}
                className="flex items-center gap-2 rounded-full border-b-4 border-[#6a3a1c] bg-gradient-to-b from-[#c98b4e] to-[#8a5428] px-6 py-2.5 font-serif text-lg font-black text-white shadow-lg transition active:translate-y-0.5 active:border-b-2 disabled:opacity-60"
                data-testid="generala-tirar"
              >
                <span key={sacude} className="mesa-sacude inline-flex">
                  <Dices className="h-5 w-5" />
                </span>
                {v.tiros === 0 ? "Tirar los dados" : `Tirar otra vez (${v.tiros + 1} de 3)`}
              </button>
            </div>
          )}
        </section>

        {/* la planilla */}
        <section className="mesa-papel overflow-x-auto rounded-2xl border border-amber-300/70 p-2 shadow-inner" aria-label="La planilla">
          <table className="w-full border-collapse text-[12px]">
            <thead>
              <tr>
                <th className="px-1 py-1 text-left font-serif text-[13px] text-[#3a2616]">Planilla</th>
                {nombres.map((n, a) => (
                  <th key={a} className={`px-0.5 py-1 text-center ${a === v.turno && v.fase === "jugando" ? "rounded-t-lg bg-amber-200/80" : ""}`} title={n}>
                    <span className="mx-auto flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-black text-white" style={{ background: colorDe(a) }}>
                      {nombreCorto(n).charAt(0)}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CATEGORIAS_GENERALA.map((cat, ci) => (
                <tr key={cat} className={ci === 6 ? "border-t-2 border-amber-400/60" : "border-t border-amber-300/40"}>
                  <th className="whitespace-nowrap px-1 py-1 text-left font-semibold text-stone-700" title={EXPLICA_CAT_GENERALA[cat]}>
                    {NOMBRE_CAT_GENERALA[cat]}
                  </th>
                  {nombres.map((_, a) => {
                    const val = v.planilla[a]?.[ci];
                    const posible = a === v.turno && miTurno && val == null ? v.posibles?.[cat] : undefined;
                    const recien = flota && flota.a === a && flota.cat === cat;
                    return (
                      <td key={a} className={`relative px-0.5 py-0.5 text-center ${a === v.turno && v.fase === "jugando" ? "bg-amber-200/50" : ""}`}>
                        {val != null ? (
                          <span key={recien ? flota!.n : "x"} className={`inline-block min-w-[1.6rem] font-black tabular-nums ${recien ? "mesa-pop text-emerald-700" : val === 0 ? "text-stone-400" : "text-stone-800"}`}>
                            {val === 0 ? <span className="line-through decoration-2">0</span> : val}
                          </span>
                        ) : posible != null ? (
                          <button
                            type="button"
                            onClick={() => void anotar(cat)}
                            disabled={ocupado}
                            className={`min-w-[1.9rem] rounded-md border px-1 py-0.5 font-black tabular-nums shadow-sm transition active:scale-95 ${posible > 0 ? "border-emerald-400 bg-emerald-50 text-emerald-800 hover:bg-emerald-100" : "border-stone-300 bg-white text-stone-400 hover:bg-stone-50"}`}
                            aria-label={posible > 0 ? `Anotar ${posible} en ${NOMBRE_CAT_GENERALA[cat]}` : `Tachar ${NOMBRE_CAT_GENERALA[cat]}`}
                            data-testid={`generala-anotar-${cat}`}
                          >
                            {posible > 0 ? posible : "0"}
                          </button>
                        ) : (
                          <span className="text-stone-300">·</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr className="border-t-2 border-amber-500">
                <th className="px-1 py-1 text-left font-serif font-black text-[#3a2616]">Total</th>
                {nombres.map((_, a) => (
                  <td key={a} className="px-0.5 py-1 text-center font-serif text-[14px] font-black tabular-nums" style={{ color: colorDe(a) }}>
                    {v.totales[a] ?? 0}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </section>
      </div>
      <AvisoMesa texto={aviso} />
    </div>
  );
}
