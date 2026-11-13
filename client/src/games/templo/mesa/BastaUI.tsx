/**
 * El «Basta» bíblico en la pantalla (shared/mesa/basta.ts): la letra que gira como en una tómbola, las cuatro
 * casillas (personaje, lugar, libro y objeto), lo que lleva cada uno, el sello de «¡BASTA!» con su cuenta regresiva,
 * y la revisión de la ronda con los puntos que suben. De los demás solo se ve lo que está en la lista.
 */
import { useEffect, useRef, useState } from "react";
import { Hand } from "lucide-react";
import { BASTA, CATEGORIAS_BASTA, LETRAS_BASTA, NOMBRE_CAT_BASTA, limpiarRespuestaBasta, type CatBasta } from "@shared/mesa/basta-reglas";
import type { BastaVista, JugadaBasta } from "@shared/mesa/basta";
import { mesaSonido } from "./mesa-sonido";
import { Asiento, AvisoMesa, BotonSonido, Confeti, RelojAnillo, Sello, colorDe, quedaMs, useAhora, useAvisoCorto, useEventosNuevos, useMusicaDeJuego, useGolpeFinal, type PropsMesa } from "./vida";
import { Ico } from "../iconos";

type Resp = Record<CatBasta, string>;
const vacio = (): Resp => ({ personaje: "", lugar: "", libro: "", objeto: "" });

/** La letra que gira y cae (como una tómbola). */
function Letra({ letra, n }: { letra: string | null; n: number }) {
  const [vista, setVista] = useState(letra ?? "?");
  const [gira, setGira] = useState(false);
  useEffect(() => {
    if (!letra) return;
    let k = 0;
    setGira(true);
    const id = setInterval(() => {
      k++;
      setVista(LETRAS_BASTA[Math.floor(Math.random() * LETRAS_BASTA.length)]);
      if (k % 2 === 0) mesaSonido.tic();
      if (k > 14) {
        clearInterval(id);
        setVista(letra);
        setGira(false);
        mesaSonido.campana();
      }
    }, 75);
    return () => clearInterval(id);
  }, [letra, n]);
  return (
    <div className={`relative flex h-24 w-24 items-center justify-center rounded-3xl border-4 border-[#7a4a22] bg-gradient-to-b from-[#fff3c4] to-[#f1c232] shadow-xl sm:h-28 sm:w-28 ${gira ? "" : "mesa-pop"}`} data-testid="basta-letra">
      <span key={vista} className={`font-serif text-6xl font-black text-[#7a2e1c] sm:text-7xl ${gira ? "mesa-letra" : ""}`}>
        {vista}
      </span>
    </div>
  );
}

export function BastaUI({ vista: v, nombres, bots, jugar, recibidaEn }: PropsMesa<BastaVista, JugadaBasta>) {
  useMusicaDeJuego("basta");
  const ahora = useAhora(250);
  const [aviso, setAviso] = useAvisoCorto();
  const [r, setR] = useState<Resp>(() => ({ ...vacio(), ...(v.mias ?? {}) }));
  const [sello, setSello] = useState<{ n: number; texto: string; sub?: string; color?: string } | null>(null);
  const [confeti, setConfeti] = useState(0);
  const [letraN, setLetraN] = useState(0);
  const envio = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ultimoEnviado = useRef<string>("");
  const rRef = useRef(r);
  rRef.current = r;
  const yo = v.yo;
  const escribiendo = v.fase === "escribir" || v.fase === "basta";

  async function enviar(ya = false) {
    if (envio.current) clearTimeout(envio.current);
    envio.current = null;
    const datos = rRef.current;
    const clave = JSON.stringify(datos);
    if (clave === ultimoEnviado.current) return;
    const mandar = async () => {
      ultimoEnviado.current = clave;
      const x = await jugar({ t: "respuestas", r: datos });
      if (!x.ok && x.message && escribiendo) setAviso(x.message);
    };
    if (ya) await mandar();
    else envio.current = setTimeout(() => void mandar(), 700);
  }

  useEventosNuevos(v.eventos, (e) => {
    if (e.t === "letra") {
      setR(vacio());
      ultimoEnviado.current = JSON.stringify(vacio());
      setLetraN((x) => x + 1);
    } else if (e.t === "basta") {
      mesaSonido.campana();
      setSello({ n: e.n, texto: "¡BASTA!", sub: `Lo dijo ${nombres[e.a] ?? "alguien"}: ¡terminen!`, color: "#b8432f" });
      void enviar(true);
    } else if (e.t === "tiempo") {
      setSello({ n: e.n, texto: "¡Tiempo!", color: "#7a5230" });
    } else if (e.t === "ronda") {
      mesaSonido.bien();
    } else if (e.t === "fin") {
      setConfeti((x) => x + 1);
      mesaSonido.fiesta();
    }
  });
  // si la vista trae lo mío (al volver a abrir), lo pongo
  useEffect(() => {
    if (v.mias && !Object.values(rRef.current).some(Boolean)) setR({ ...vacio(), ...v.mias });
  }, [v.mias]);
  useEffect(() => () => {
    if (envio.current) clearTimeout(envio.current);
  }, []);

  useGolpeFinal(v.fase === "fin", yo != null && (v.puntos[yo] ?? 0) >= Math.max(...v.puntos), yo != null);
  const restante = quedaMs(v.restanteMs, recibidaEn, ahora);
  const llenas = CATEGORIAS_BASTA.every((c) => r[c].trim());
  const rev = v.revisada;

  async function basta() {
    await enviar(true);
    const x = await jugar({ t: "basta" });
    if (!x.ok && x.message) setAviso(x.message);
  }

  return (
    <div className="mesa-raiz space-y-3" data-testid="mesa-basta">
      <Confeti disparo={confeti} />
      {sello && <Sello llave={sello.n} texto={sello.texto} sub={sello.sub} color={sello.color} />}
      <div className="flex flex-wrap items-center gap-1.5">
        {nombres.map((n, a) => (
          <Asiento
            key={a}
            a={a}
            nombre={n}
            bot={bots[a]}
            yo={a === yo}
            activo={v.dijoBasta === a}
            extra={escribiendo ? `lleva ${v.llevan[a] ?? 0} de 4` : `${v.puntos[a] ?? 0} puntos`}
            tam={28}
          />
        ))}
        <span className="ml-auto">
          <BotonSonido />
        </span>
      </div>

      <section className="mesa-papel flex items-center gap-4 rounded-3xl border border-amber-300/70 p-3 shadow-inner">
        <Letra letra={v.letra} n={letraN} />
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-black uppercase tracking-wider text-amber-800">
            Ronda {v.ronda} de {v.rondas}
          </p>
          <p className="font-serif text-lg font-black leading-tight text-[#3a2616]">
            {v.fase === "preparar"
              ? "¡Prepárense! Va a salir la letra…"
              : v.fase === "escribir"
                ? `Palabras de la Biblia con «${v.letra}»`
                : v.fase === "basta"
                  ? "¡Basta! Terminen de escribir…"
                  : v.fase === "revisar"
                    ? "Revisando las respuestas…"
                    : "¡Terminó el «Basta»!"}
          </p>
          {(v.fase === "escribir" || v.fase === "basta" || v.fase === "preparar") && (
            <div className="mt-1 flex items-center gap-2">
              <RelojAnillo ms={restante} total={v.fase === "basta" ? BASTA.bastaMs : v.fase === "preparar" ? BASTA.prepararMs : BASTA.escribirMs} tam={34} />
              {v.fase === "basta" && <span className="mesa-late font-serif text-2xl font-black text-red-700">{Math.ceil(restante / 1000)}</span>}
            </div>
          )}
        </div>
      </section>

      {escribiendo && yo != null && (
        <section className="grid gap-2 sm:grid-cols-2" aria-label="Tus respuestas">
          {CATEGORIAS_BASTA.map((c) => (
            <label key={c} className="flex items-center gap-2 rounded-2xl border-2 border-amber-300 bg-white px-3 py-2 shadow-sm focus-within:border-amber-500 dark:bg-stone-900">
              <span className="text-2xl" aria-hidden="true">
                <Ico e={NOMBRE_CAT_BASTA[c].icono ?? ""} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[11px] font-black uppercase tracking-wide text-amber-800">{NOMBRE_CAT_BASTA[c].nombre}</span>
                <input
                  value={r[c]}
                  onChange={(e) => {
                    const t = limpiarRespuestaBasta(e.target.value);
                    setR((x) => ({ ...x, [c]: t }));
                    void enviar();
                  }}
                  onBlur={() => void enviar(true)}
                  placeholder={v.letra ? `${v.letra}…` : ""}
                  maxLength={BASTA.largoMax}
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                  autoCapitalize="words"
                  className="w-full bg-transparent font-serif text-lg font-bold text-stone-900 outline-none placeholder:text-stone-300 dark:text-stone-50"
                  aria-label={`${NOMBRE_CAT_BASTA[c].nombre} con la letra ${v.letra ?? ""}`}
                  data-testid={`basta-${c}`}
                />
              </span>
            </label>
          ))}
        </section>
      )}

      {v.fase === "escribir" && yo != null && (
        <button
          type="button"
          onClick={() => void basta()}
          disabled={!llenas}
          className={`flex w-full items-center justify-center gap-2 rounded-2xl border-b-4 border-[#7a2e1c] bg-gradient-to-b from-[#e8563e] to-[#b8432f] py-3 font-serif text-2xl font-black tracking-wide text-white shadow-lg transition active:translate-y-0.5 active:border-b-2 disabled:opacity-45 ${llenas ? "mesa-late" : ""}`}
          data-testid="basta-basta"
        >
          <Hand className="h-6 w-6" /> ¡Basta!
        </button>
      )}

      {rev && (
        <section className="mesa-papel overflow-x-auto rounded-2xl border border-amber-300/70 p-2 shadow-inner" aria-label="La revisión de la ronda" data-testid="basta-revision">
          <p className="mb-1 px-1 font-serif text-[15px] font-black text-[#3a2616]">
            La ronda de la «{rev.letra}»{rev.dijoBasta != null ? ` · «¡Basta!» de ${nombres[rev.dijoBasta]}` : ""}
          </p>
          <table className="w-full border-collapse text-[12px]">
            <thead>
              <tr className="text-left text-[11px] uppercase text-amber-800">
                <th className="px-1 py-1">Quién</th>
                {CATEGORIAS_BASTA.map((c) => (
                  <th key={c} className="px-1 py-1">
                    <Ico e={NOMBRE_CAT_BASTA[c].icono ?? ""} /> {NOMBRE_CAT_BASTA[c].nombre.split(" ")[0]}
                  </th>
                ))}
                <th className="px-1 py-1 text-right">Puntos</th>
              </tr>
            </thead>
            <tbody>
              {nombres
                .map((n, a) => ({ n, a }))
                .sort((x, y) => (rev.total[y.a] ?? 0) - (rev.total[x.a] ?? 0))
                .map(({ n, a }, k) => (
                  <tr key={a} className={`border-t border-amber-300/50 ${a === yo ? "bg-amber-100/70" : ""}`}>
                    <td className="truncate px-1 py-1 font-bold" style={{ color: colorDe(a) }}>
                      {n.replace(/\s*🤖\s*$/u, "")}
                    </td>
                    {CATEGORIAS_BASTA.map((c) => {
                      const cas = rev.casillas[a]?.[c];
                      const mia = a === yo ? rev.miCrudo?.[c] : null;
                      return (
                        <td key={c} className="px-1 py-1">
                          {cas?.canon ? (
                            <span className="mesa-pop inline-flex items-center gap-1" style={{ animationDelay: `${k * 120}ms` }}>
                              <span className="font-semibold text-stone-800">{cas.canon}</span>
                              <span className={`rounded-full px-1.5 text-[10px] font-black text-white ${cas.repetida ? "bg-amber-500" : "bg-emerald-600"}`}>{cas.puntos}</span>
                            </span>
                          ) : mia ? (
                            <span className="text-stone-400 line-through" title="No está en la lista o no empieza con la letra">
                              {mia}
                            </span>
                          ) : (
                            <span className="text-stone-300">—</span>
                          )}
                        </td>
                      );
                    })}
                    <td className="px-1 py-1 text-right font-serif text-[14px] font-black tabular-nums" style={{ color: colorDe(a) }}>
                      +{rev.total[a] ?? 0}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <p className="mt-1 px-1 text-[11px] text-stone-600">Lo que nadie más puso vale {BASTA.unica}; repetido, {BASTA.repetida}. Solo se muestran las palabras que están en la lista.</p>
        </section>
      )}

      {v.historial.length > 0 && (
        <section className="rounded-2xl border border-amber-200 bg-white/80 p-2 text-[12px] dark:bg-stone-900/70" aria-label="Los puntos de cada ronda">
          <table className="w-full">
            <thead>
              <tr className="text-[11px] uppercase text-amber-800">
                <th className="text-left">Quién</th>
                {v.historial.map((h, i) => (
                  <th key={i} className="text-center">
                    {h.letra}
                  </th>
                ))}
                <th className="text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {nombres.map((n, a) => (
                <tr key={a} className="border-t border-amber-100">
                  <td className="truncate font-bold" style={{ color: colorDe(a) }}>
                    {n.replace(/\s*🤖\s*$/u, "")}
                  </td>
                  {v.historial.map((h, i) => (
                    <td key={i} className="text-center tabular-nums">
                      {h.total[a] ?? 0}
                    </td>
                  ))}
                  <td className="text-right font-black tabular-nums">{v.puntos[a] ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
      <AvisoMesa texto={aviso} />
    </div>
  );
}
