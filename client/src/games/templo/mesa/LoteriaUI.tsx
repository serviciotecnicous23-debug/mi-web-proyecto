/**
 * La lotería bíblica en la pantalla (shared/mesa/loteria.ts): el cantor saca cada carta (vuela y se da vuelta), canta
 * su copla y su versículo (y lo dice en voz alta, si se quiere), cada uno marca su tabla con frijolitos, se ven las
 * tablas de los demás con lo que les falta, y el «¡Lotería!» llena la pantalla de confeti.
 * Lo decide todo el servidor: aquí solo se manda «marcar» y «¡Lotería!».
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { Mic, MicOff, Sparkles } from "lucide-react";
import { CARTAS_LOTERIA } from "@shared/mesa/loteria-cartas";
import {
  MODOS_LOTERIA,
  PATRONES_LOTERIA,
  type JugadaLoteria,
  type LoteriaVista,
} from "@shared/mesa/loteria";
import { CartaLoteria, DorsoCarta, Frijol } from "./Carta";
import { DefsFiguras } from "./figuras";
import { mesaSonido } from "./mesa-sonido";
import {
  Asiento,
  AvisoMesa,
  BotonSonido,
  Confeti,
  RelojAnillo,
  Sello,
  colorDe,
  conNombres,
  quedaMs,
  useAhora,
  useAvisoCorto,
  useEventosNuevos,
  useMusicaDeJuego,
  useSonidoMesa,
  type PropsMesa, useGolpeFinal } from "./vida";

const CLAVE_VOZ = "jer-loteria-voz";
function leerVoz() {
  try {
    return localStorage.getItem(CLAVE_VOZ) !== "0";
  } catch {
    return true;
  }
}

/** El cantor en voz alta (la voz del teléfono, en español). */
function cantarEnVoz(texto: string) {
  try {
    const s = window.speechSynthesis;
    if (!s) return;
    s.cancel();
    const u = new SpeechSynthesisUtterance(texto);
    const voces = s.getVoices();
    const v =
      voces.find((x) => /^es[-_](MX|US|419)/i.test(x.lang)) ??
      voces.find((x) => /^es/i.test(x.lang));
    if (v) u.voice = v;
    u.lang = v?.lang ?? "es-MX";
    u.rate = 1.04;
    u.pitch = 1.05;
    s.speak(u);
  } catch {
    /* sin voz */
  }
}

/** La figurita del patrón que se busca (línea, esquinas, centro o tabla llena). */
function Patron({ modo }: { modo: LoteriaVista["modo"] }) {
  const marcadas = new Set(
    modo === "linea" ? PATRONES_LOTERIA.linea[1] : PATRONES_LOTERIA[modo][0],
  );
  return (
    <span
      className="inline-grid grid-cols-4 gap-[2px] rounded bg-white/70 p-[3px] align-middle"
      aria-hidden="true"
    >
      {[...Array(16)].map((_, k) => (
        <span
          key={k}
          className={`h-[6px] w-[6px] rounded-[1px] ${marcadas.has(k) ? "bg-[#7a2e1c]" : "bg-stone-300"}`}
        />
      ))}
    </span>
  );
}

export function LoteriaUI({
  vista: v,
  nombres,
  bots,
  jugar,
  recibidaEn,
}: PropsMesa<LoteriaVista, JugadaLoteria>) {
  useMusicaDeJuego("loteria");
  const ahora = useAhora(200);
  const sonido = useSonidoMesa();
  const [voz, setVoz] = useState(leerVoz);
  const [aviso, setAviso] = useAvisoCorto();
  const [sello, setSello] = useState<{
    n: number;
    texto: string;
    sub?: string;
    color?: string;
  } | null>(null);
  const [confeti, setConfeti] = useState(0);
  const [llega, setLlega] = useState(0);
  const [marcando, setMarcando] = useState<Set<number>>(new Set());
  const yo = v.yo;

  useEventosNuevos(v.eventos, (e) => {
    if (e.t === "carta") {
      setLlega((x) => x + 1);
      mesaSonido.redoble();
      setTimeout(() => mesaSonido.carta(), 330);
      const c = CARTAS_LOTERIA[e.carta];
      if (sonido && voz && c)
        setTimeout(() => cantarEnVoz(`${c.nombre}. ${c.copla}`), 420);
    } else if (e.t === "loteria") {
      mesaSonido.campana();
      setTimeout(() => mesaSonido.fiesta(), 500);
      setConfeti((x) => x + 1);
      setSello({
        n: e.n,
        texto: "¡LOTERÍA!",
        sub: nombres[e.a] ?? "",
        color: "#b8432f",
      });
      if (sonido && voz)
        setTimeout(
          () =>
            cantarEnVoz(`¡Lotería! ${nombres[e.a] ?? ""}`.replace("🤖", "")),
          200,
        );
    } else if (e.t === "falsa") {
      mesaSonido.mal();
      setSello({
        n: e.n,
        texto: "¡Falsa!",
        sub: `${nombres[e.a] ?? "Alguien"} espera dos cartas`,
        color: "#7a5230",
      });
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(CLAVE_VOZ, voz ? "1" : "0");
    } catch {
      /* nada */
    }
    if (!voz) window.speechSynthesis?.cancel();
  }, [voz]);
  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  const salidas = useMemo(() => new Set(v.salidas), [v.salidas]);
  const restante = quedaMs(v.restanteMs, recibidaEn, ahora);
  const actual = v.actual != null ? CARTAS_LOTERIA[v.actual] : null;
  const completa = !!(
    v.marcas &&
    PATRONES_LOTERIA[v.modo].some((p) => p.every((k) => v.marcas![k]))
  );
  const yaGane = yo != null && v.ganadores.includes(yo);
  const cuidado = v.jugadores.filter(
    (j) => j.a !== yo && j.faltan === 1 && !j.gano,
  );

  async function marcar(k: number) {
    if (yo == null || !v.tabla || v.marcas?.[k] || marcando.has(k)) return;
    if (!salidas.has(v.tabla[k])) {
      mesaSonido.mal();
      setAviso(`«${CARTAS_LOTERIA[v.tabla[k]].nombre}» todavía no ha salido.`);
      return;
    }
    mesaSonido.frijol();
    setMarcando((s) => new Set(s).add(k));
    const r = await jugar({ t: "marcar", k });
    setMarcando((s) => {
      const n = new Set(s);
      n.delete(k);
      return n;
    });
    if (!r.ok && r.message) setAviso(r.message);
  }
  async function cantarLoteria() {
    const r = await jugar({ t: "loteria" });
    if (!r.ok && r.message) setAviso(r.message);
  }

  useGolpeFinal(v.fase === "fin", yo != null && v.ganadores.includes(yo), yo != null);
  const fin = v.fase === "fin" || v.fase === "revelar";
  const ganadora = v.jugadores.find((j) => j.gano);

  return (
    <div className="mesa-raiz space-y-3" data-testid="mesa-loteria">
      <DefsFiguras />
      <Confeti disparo={confeti} />
      {sello && (
        <Sello
          llave={sello.n}
          texto={sello.texto}
          sub={sello.sub}
          color={sello.color}
        />
      )}

      {/* quién juega */}
      <div className="flex flex-wrap items-center gap-1.5">
        {v.jugadores.map((j) => (
          <Asiento
            key={j.a}
            a={j.a}
            nombre={nombres[j.a] ?? `Asiento ${j.a + 1}`}
            bot={bots[j.a]}
            yo={j.a === yo}
            activo={j.gano}
            extra={
              j.gano
                ? "¡Lotería!"
                : j.faltan === 1
                  ? "¡le falta una!"
                  : `le faltan ${j.faltan}`
            }
            tam={28}
          />
        ))}
        <span className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={() => setVoz(!voz)}
            aria-pressed={voz}
            aria-label={
              voz ? "Callar la voz del cantor" : "Oír la voz del cantor"
            }
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-stone-700 shadow ring-1 ring-black/10 hover:bg-white dark:bg-stone-800 dark:text-stone-200"
            data-testid="loteria-voz"
          >
            {voz ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
          </button>
          <BotonSonido />
        </span>
      </div>

      <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:items-start">
        <div className="space-y-3">
          {/* el cantor */}
          <section
            className="mesa-papel relative overflow-hidden rounded-2xl border border-amber-300/70 p-3 shadow-inner"
            aria-live="polite"
            data-testid="loteria-cantor"
          >
            <div className="flex gap-3">
              <div className="relative h-[8.6rem] w-[6.4rem] shrink-0 sm:h-[10.4rem] sm:w-[7.8rem]">
                <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 opacity-70">
                  <DorsoCarta />
                </div>
                {v.actual != null ? (
                  <div key={llega} className="mesa-llega absolute inset-0">
                    <CartaLoteria i={v.actual} tam="lg" />
                  </div>
                ) : (
                  <div className="absolute inset-0">
                    <DorsoCarta />
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[11px] font-black uppercase tracking-wider text-amber-800">
                    El cantor · carta {v.cantadas} de {v.total}
                  </p>
                  {(v.fase === "preparar" || v.fase === "cantando") && (
                    <RelojAnillo
                      ms={restante}
                      total={v.fase === "preparar" ? 4000 : v.ritmoMs}
                      tam={30}
                    />
                  )}
                </div>
                {v.fase === "preparar" ? (
                  <p className="mt-2 font-serif text-lg font-black text-[#3a2616]">
                    ¡Atentos, que ya empieza! Revuelvo la baraja…
                  </p>
                ) : actual ? (
                  <div key={`t${llega}`} className="mesa-pop">
                    <p className="mt-1 font-serif text-xl font-black leading-tight text-[#3a2616] sm:text-2xl">
                      ¡{actual.nombre}!
                    </p>
                    <p className="relative mt-1.5 rounded-xl bg-white/85 px-2.5 py-1.5 text-[13px] font-semibold italic leading-snug text-stone-800 shadow-sm">
                      «{actual.copla}»
                    </p>
                    <p className="mt-1.5 text-[11.5px] leading-snug text-stone-700">
                      {actual.verso.text}{" "}
                      <span className="font-bold not-italic text-amber-900">
                        ({actual.verso.ref})
                      </span>
                    </p>
                  </div>
                ) : null}
                <p className="mt-2 flex items-center gap-1.5 text-[11px] font-bold text-stone-600">
                  Se busca: <Patron modo={v.modo} />{" "}
                  {MODOS_LOTERIA[v.modo].nombre}
                </p>
              </div>
            </div>
            {/* lo que ya salió */}
            {v.salidas.length > 1 && (
              <div
                className="mt-2 flex gap-1 overflow-x-auto pb-1"
                aria-label="Las cartas que ya salieron"
              >
                {[...v.salidas]
                  .reverse()
                  .slice(1, 16)
                  .map((c) => (
                    <div
                      key={c}
                      className="h-[3.1rem] w-[2.3rem] shrink-0 opacity-90"
                    >
                      <CartaLoteria i={c} tam="sm" />
                    </div>
                  ))}
              </div>
            )}
          </section>

          {cuidado.length > 0 && !fin && (
            <p
              className="mesa-pop text-center text-[12.5px] font-black text-red-700 dark:text-red-300"
              role="status"
            >
              ¡Cuidado! A {cuidado.map((j) => nombres[j.a]).join(" y ")}{" "}
              {cuidado.length === 1 ? "le" : "les"} falta una.
            </p>
          )}

          <AvisoMesa texto={aviso} />

          {yo != null && !fin && (
            <button
              type="button"
              onClick={() => void cantarLoteria()}
              disabled={v.castigo > 0 || yaGane || v.fase === "preparar"}
              className={`relative w-full overflow-hidden rounded-2xl border-b-4 border-[#7a2e1c] bg-gradient-to-b from-[#e8563e] to-[#b8432f] py-3 font-serif text-2xl font-black tracking-wide text-white shadow-lg transition active:translate-y-0.5 active:border-b-2 disabled:opacity-50 ${completa ? "mesa-late" : ""}`}
              data-testid="loteria-cantar"
            >
              {completa && (
                <span
                  className="mesa-brilla absolute inset-0"
                  aria-hidden="true"
                />
              )}
              <span className="relative flex items-center justify-center gap-2">
                <Sparkles className="h-5 w-5" /> ¡Lotería!
              </span>
              {v.castigo > 0 && (
                <span className="relative block text-xs font-bold">
                  Lotería falsa: espera {v.castigo}{" "}
                  {v.castigo === 1 ? "carta" : "cartas"}
                </span>
              )}
            </button>
          )}
        </div>
        <div className="space-y-3">
          {/* mi tabla */}
          {v.tabla && v.marcas && (
            <section
              className="mesa-madera mx-auto max-w-[30rem] rounded-2xl p-2 shadow-lg"
              aria-label="Tu tabla"
            >
              <div className="grid grid-cols-4 gap-1.5">
                {v.tabla.map((c, k) => {
                  const marcada = v.marcas![k] || marcando.has(k);
                  const esLaQueSalio =
                    c === v.actual && !marcada && v.fase === "cantando";
                  const enPatron =
                    ganadora &&
                    ganadora.a === yo &&
                    ganadora.patron?.includes(k);
                  return (
                    <button
                      key={k}
                      type="button"
                      onClick={() => void marcar(k)}
                      disabled={fin || marcada}
                      aria-label={`${CARTAS_LOTERIA[c].nombre}${marcada ? ", marcada" : ""}`}
                      aria-pressed={marcada}
                      className={`relative aspect-[3/4] rounded-[10%/7.5%] transition active:scale-95 ${esLaQueSalio ? "mesa-late ring-4 ring-amber-300" : ""} ${enPatron ? "ring-4 ring-emerald-400" : ""}`}
                      data-testid={`loteria-casilla-${k}`}
                    >
                      <CartaLoteria i={c} />
                      {marcada && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <Frijol />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          {/* las tablas de los demás */}
          <section
            aria-label="Las tablas de los demás"
            className="grid grid-cols-2 gap-2 min-[480px]:grid-cols-3"
          >
            {v.jugadores
              .filter((j) => j.a !== yo)
              .map((j) => (
                <div
                  key={j.a}
                  className={`rounded-xl border bg-white/80 p-1.5 shadow-sm dark:bg-stone-900/70 ${j.gano ? "border-emerald-400 ring-2 ring-emerald-300" : "border-amber-200"}`}
                >
                  <p
                    className="mb-1 truncate text-[11px] font-black"
                    style={{ color: colorDe(j.a) }}
                  >
                    {nombres[j.a]} ·{" "}
                    {j.gano
                      ? "¡Lotería!"
                      : j.faltan === 1
                        ? "¡le falta una!"
                        : `le faltan ${j.faltan}`}
                  </p>
                  <div className="grid grid-cols-4 gap-[3px]">
                    {j.tabla.map((c, k) => (
                      <div
                        key={k}
                        className={`relative aspect-[3/4] overflow-hidden rounded-[3px] ${j.patron?.includes(k) ? "ring-2 ring-emerald-500" : ""}`}
                        title={CARTAS_LOTERIA[c].nombre}
                      >
                        <CartaLoteria i={c} tam="sm" className="!border" />
                        {j.marcas[k] && (
                          <span className="absolute left-1/2 top-1/2 h-[42%] w-[52%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[#7a2e1c] shadow" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </section>
        </div>
      </div>

      {fin && v.ganadores.length > 0 && (
        <p
          className="mesa-pop text-center font-serif text-lg font-black text-emerald-800 dark:text-emerald-300"
          data-testid="loteria-ganador"
        >
          {conNombres(
            v.ganadores.length === 1
              ? `¡Lotería de @${v.ganadores[0]}!`
              : `¡Empate! ${v.ganadores.map((a) => `@${a}`).join(" y ")}`,
            nombres,
          )}
        </p>
      )}
    </div>
  );
}
