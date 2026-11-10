/**
 * Etapa 3, la pantalla de los caminos nuevos:
 * - La escuela de los profetas (con Isaías): estudiar, memorizar la Palabra (ordenar las palabras de
 *   un versículo), tomar un mensaje para llevar por la ciudad y los primeros pasos.
 * - El palacio del rey (con Eliaquim): audiencias con justicia, tomar pan para los pobres, copiar la
 *   ley (ordenar las palabras) y los primeros pasos.
 * Los deberes se cuentan en el mundo de la ciudad (city.deber) y van al mérito de la temporada.
 */
import { useContext, useMemo, useState } from "react";
import { Check, Crown, Megaphone, RefreshCw, ScrollText, Search, Wheat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AUDIENCIAS, CAMINOS, DISCERNIMIENTOS, VERSOS_MEMORIA, VERSO_DISCERNIR, type Camino } from "@shared/caminos";
import { CiudadCtx } from "./CiudadUI";
import { gameStore } from "./store";
import { Card, VerseBox } from "./ui";

function mezclar<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** Ordenar la Palabra: el versículo se muestra, después se arma tocando las palabras en orden. */
export function OrdenarPalabra({ camino, titulo, alTerminar }: { camino: "profecia" | "realeza"; titulo: string; alTerminar: () => void }) {
  const lista = useMemo(() => VERSOS_MEMORIA.filter((v) => v.camino === camino || v.camino === "ambos"), [camino]);
  const [k, setK] = useState(() => Math.floor(Math.random() * lista.length));
  const verso = lista[k % lista.length];
  const palabras = useMemo(() => verso.text.split(/\s+/), [verso]);
  const [fase, setFase] = useState<"leer" | "armar" | "listo">("leer");
  const [elegidas, setElegidas] = useState<number[]>([]);
  const [error, setError] = useState(false);
  const fichas = useMemo(() => mezclar(palabras.map((p, i) => ({ p, i }))), [palabras]);
  const tocar = (i: number) => {
    if (elegidas.includes(i)) return;
    const siguiente = palabras[elegidas.length];
    // vale cualquier ficha con la misma palabra que toca ahora (puede haber palabras repetidas)
    if (palabras[i] !== siguiente) {
      setError(true);
      setTimeout(() => setError(false), 450);
      return;
    }
    const n = [...elegidas, i];
    setElegidas(n);
    if (n.length === palabras.length) {
      setFase("listo");
      alTerminar();
    }
  };
  const otra = () => {
    setK(k + 1);
    setFase("leer");
    setElegidas([]);
  };
  return (
    <div className="space-y-2.5" data-testid="ordenar-palabra">
      <p className="font-black">{titulo}</p>
      {fase === "leer" && (
        <>
          <p className="text-xs text-stone-500">Léelo con calma. Después lo armarás palabra por palabra.</p>
          <VerseBox text={verso.text} refName={verso.ref} />
          <Button className="w-full rounded-full bg-amber-500 font-bold text-amber-950 hover:bg-amber-400" onClick={() => setFase("armar")} data-testid="button-ordenar-empezar">
            Ya lo leí: armarlo
          </Button>
        </>
      )}
      {fase !== "leer" && (
        <>
          <p className={`min-h-[3rem] rounded-xl border-2 border-dashed p-2 font-serif text-[15px] leading-relaxed ${error ? "border-red-400" : "border-amber-300"}`} data-testid="ordenar-armado">
            {elegidas.map((i) => palabras[i]).join(" ")}
            {fase === "armar" && <span className="text-stone-400"> …</span>}
          </p>
          {fase === "armar" ? (
            <div className="flex flex-wrap gap-1.5">
              {fichas.map((f) =>
                elegidas.includes(f.i) ? null : (
                  <button
                    key={f.i}
                    type="button"
                    onClick={() => tocar(f.i)}
                    className="rounded-lg border border-amber-300 bg-white px-2 py-1 text-[13px] font-semibold text-stone-800 hover:bg-amber-50 dark:bg-stone-900 dark:text-stone-100"
                    data-testid={`ficha-${f.i}`}
                  >
                    {f.p}
                  </button>
                ),
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <p className="rounded-xl bg-emerald-50 p-2.5 text-center font-bold text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200">¡Completo! {verso.ref}</p>
              <Button variant="secondary" className="w-full" onClick={otra} data-testid="button-ordenar-otra">
                <RefreshCw className="mr-1 h-4 w-4" /> Otro versículo
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

/** Una audiencia del palacio: el caso, tres caminos y lo que dice la Palabra. */
function AudienciaView({ alTerminar }: { alTerminar: (justa: boolean) => void }) {
  const [k, setK] = useState(() => Math.floor(Math.random() * AUDIENCIAS.length));
  const a = AUDIENCIAS[k % AUDIENCIAS.length];
  const [elegida, setElegida] = useState<number | null>(null);
  const orden = useMemo(() => mezclar([0, 1, 2]), [k]);
  return (
    <div className="space-y-2.5" data-testid="audiencia">
      <p className="font-black">Audiencia en la puerta del palacio</p>
      <p className="rounded-xl bg-stone-50 p-2.5 dark:bg-stone-900/40">{a.caso}</p>
      {orden.map((i) => {
        const estado = elegida === null ? "" : i === a.correcta ? "bien" : elegida === i ? "mal" : "";
        return (
          <button
            key={i}
            type="button"
            disabled={elegida !== null}
            onClick={() => {
              setElegida(i);
              alTerminar(i === a.correcta);
            }}
            className={`block w-full rounded-xl border-2 px-3 py-2 text-left text-[14px] font-semibold ${
              estado === "bien" ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30" : estado === "mal" ? "border-red-400 bg-red-50 dark:bg-red-950/30" : "border-amber-200 hover:bg-amber-50 dark:border-amber-900 dark:hover:bg-amber-950/20"
            }`}
            data-testid={`audiencia-${i}`}
          >
            {a.opciones[i]}
          </button>
        );
      })}
      {elegida !== null && (
        <>
          <p className={`text-sm font-bold ${elegida === a.correcta ? "text-emerald-700 dark:text-emerald-300" : "text-red-700 dark:text-red-300"}`}>{elegida === a.correcta ? "¡Juicio justo!" : "Ese no es el camino del rey justo."}</p>
          <p className="text-sm">{a.explica}</p>
          <VerseBox text={a.verso.text} refName={a.verso.ref} />
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => {
              setK(k + 1);
              setElegida(null);
            }}
            data-testid="button-audiencia-otra"
          >
            Siguiente audiencia
          </Button>
        </>
      )}
    </div>
  );
}

/** Discernir con las Escrituras (la escuela de los profetas): lo que se oye, tres respuestas y la Palabra. */
function DiscernirView({ alTerminar }: { alTerminar: (bien: boolean) => void }) {
  const [k, setK] = useState(() => Math.floor(Math.random() * DISCERNIMIENTOS.length));
  const d = DISCERNIMIENTOS[k % DISCERNIMIENTOS.length];
  const [elegida, setElegida] = useState<number | null>(null);
  const orden = useMemo(() => mezclar([0, 1, 2]), [k]);
  return (
    <div className="space-y-2.5" data-testid="discernir">
      <p className="font-black">Lo que se oye en la plaza</p>
      <p className="rounded-xl bg-stone-50 p-2.5 italic dark:bg-stone-900/40">{d.dice}</p>
      <p className="text-xs text-stone-500">¿Qué dice la Palabra? Elige lo que haría un profeta de Dios.</p>
      {orden.map((i) => {
        const estado = elegida === null ? "" : i === d.correcta ? "bien" : elegida === i ? "mal" : "";
        return (
          <button
            key={i}
            type="button"
            disabled={elegida !== null}
            onClick={() => {
              setElegida(i);
              alTerminar(i === d.correcta);
            }}
            className={`block w-full rounded-xl border-2 px-3 py-2 text-left text-[14px] font-semibold ${
              estado === "bien" ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30" : estado === "mal" ? "border-red-400 bg-red-50 dark:bg-red-950/30" : "border-amber-200 hover:bg-amber-50 dark:border-amber-900 dark:hover:bg-amber-950/20"
            }`}
            data-testid={`discernir-${i}`}
          >
            {d.opciones[i]}
          </button>
        );
      })}
      {elegida !== null && (
        <>
          <p className={`text-sm font-bold ${elegida === d.correcta ? "text-emerald-700 dark:text-emerald-300" : "text-red-700 dark:text-red-300"}`}>
            {elegida === d.correcta ? "¡Bien discernido!" : "Eso no concuerda con la Palabra."}
          </p>
          <p className="text-sm">{d.explica}</p>
          <VerseBox text={d.verso.text} refName={d.verso.ref} />
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => {
              setK(k + 1);
              setElegida(null);
            }}
            data-testid="button-discernir-otra"
          >
            Oír otra palabra
          </Button>
        </>
      )}
    </div>
  );
}

/** Primeros pasos de un camino (la instrucción de su guía), con lo hecho marcado. */
function PrimerosPasos({ camino, partes }: { camino: Camino; partes: number }) {
  const pasos =
    camino === "profecia"
      ? ["Memoriza un versículo en la escuela", "Ora en el monte de la oración", "Lleva un mensaje de ánimo a una casa"]
      : ["Atiende una audiencia con justicia", "Reparte pan a un pobre de la ciudad", "Copia la ley en el palacio"];
  return (
    <div className="rounded-xl border border-sky-200 bg-sky-50/60 p-2.5 text-xs dark:border-sky-900 dark:bg-sky-950/20" data-testid="primeros-pasos">
      <p className="font-bold">Primeros pasos con {CAMINOS[camino].guia.split(",")[0]}</p>
      <ol className="mt-1 space-y-0.5">
        {pasos.map((p, i) => (
          <li key={p} className={partes > i ? "text-emerald-700 dark:text-emerald-300" : ""}>
            {partes > i ? "✓" : `${i + 1}.`} {p}
          </li>
        ))}
      </ol>
      {partes >= 3 && <p className="mt-1 font-semibold">¡Completaste tus primeros pasos!</p>}
    </div>
  );
}

/** La escuela de los profetas (solo para el camino de los profetas). */
export function EscuelaView() {
  const { city } = useContext(CiudadCtx);
  const [tab, setTab] = useState<"inicio" | "memoria" | "discernir">("inicio");
  const partes = city?.partesCamino ?? 0;
  return (
    <Card
      title={
        <span className="flex items-center gap-2">
          <Megaphone className="h-5 w-5" /> La escuela de los profetas
        </span>
      }
      onClose={() => gameStore.close()}
      testid="ciudad-escuela"
    >
      <div className="space-y-3 p-4 text-sm">
        {tab === "inicio" ? (
          <>
            <p>
              Isaías hijo de Amoz enseña aquí a los hijos de los profetas: escuchar a Dios, guardar su Palabra y llevar su mensaje con amor. «Heme aquí, envíame a mí» (Isaías 6:8).
            </p>
            <PrimerosPasos camino="profecia" partes={partes} />
            <div className="grid gap-2">
              <Button className="justify-start rounded-xl" onClick={() => setTab("memoria")} data-testid="button-escuela-memoria">
                <ScrollText className="mr-2 h-4 w-4" /> Memorizar la Palabra (+4 de mérito)
              </Button>
              <Button className="justify-start rounded-xl" onClick={() => setTab("discernir")} data-testid="button-escuela-discernir">
                <Search className="mr-2 h-4 w-4" /> Discernir con las Escrituras (+4)
              </Button>
              <Button
                variant="secondary"
                className="justify-start rounded-xl"
                disabled={!!city?.mensajeEnCurso}
                onClick={() => {
                  city?.tomarMensaje();
                  gameStore.close();
                }}
                data-testid="button-escuela-mensaje"
              >
                <Megaphone className="mr-2 h-4 w-4" /> {city?.mensajeEnCurso ? "Ya llevas un mensaje: entrégalo" : "Tomar un mensaje para llevar (+3)"}
              </Button>
              <Button
                variant="secondary"
                className="justify-start rounded-xl"
                onClick={() => {
                  gameStore.close();
                  gameStore.push({ kind: "estudios" });
                }}
                data-testid="button-escuela-estudios"
              >
                <ScrollText className="mr-2 h-4 w-4" /> Estudios
              </Button>
            </div>
            <p className="text-xs text-stone-500">También puedes orar en el monte de la oración, al sur de la escuela: quédate quieto {15} segundos (+2).</p>
          </>
        ) : tab === "discernir" ? (
          <>
            <p className="text-xs italic text-stone-500">
              «{VERSO_DISCERNIR.text}» ({VERSO_DISCERNIR.ref})
            </p>
            <DiscernirView alTerminar={(bien) => bien && city?.deber("discernir")} />
            <Button variant="ghost" className="w-full" onClick={() => setTab("inicio")}>
              Volver
            </Button>
          </>
        ) : (
          <>
            <OrdenarPalabra camino="profecia" titulo="Memorizar la Palabra" alTerminar={() => city?.deber("memoria")} />
            <Button variant="ghost" className="w-full" onClick={() => setTab("inicio")}>
              Volver
            </Button>
          </>
        )}
      </div>
    </Card>
  );
}

/** El palacio del rey (solo para el camino del palacio). */
export function PalacioView() {
  const { city } = useContext(CiudadCtx);
  const [tab, setTab] = useState<"inicio" | "audiencia" | "ley">("inicio");
  const partes = city?.partesCamino ?? 0;
  return (
    <Card
      title={
        <span className="flex items-center gap-2">
          <Crown className="h-5 w-5" /> El palacio del rey
        </span>
      }
      onClose={() => gameStore.close()}
      testid="ciudad-palacio"
    >
      <div className="space-y-3 p-4 text-sm">
        {tab === "inicio" && (
          <>
            <p>Eliaquim hijo de Hilcías, mayordomo del palacio, organiza el servicio al rey Ezequías: juzgar con verdad, cuidar a los pobres y guardar la ley. «Misericordia y verdad guardan al rey» (Proverbios 20:28).</p>
            <PrimerosPasos camino="realeza" partes={partes} />
            <div className="grid gap-2">
              <Button className="justify-start rounded-xl" onClick={() => setTab("audiencia")} data-testid="button-palacio-audiencia">
                <Crown className="mr-2 h-4 w-4" /> Atender una audiencia (+4)
              </Button>
              <Button
                variant="secondary"
                className="justify-start rounded-xl"
                disabled={(city?.panes ?? 0) >= 3}
                onClick={() => {
                  city?.tomarPan();
                  gameStore.close();
                }}
                data-testid="button-palacio-pan"
              >
                <Wheat className="mr-2 h-4 w-4" /> {(city?.panes ?? 0) >= 3 ? "Ya llevas 3 panes: repártelos" : "Tomar pan para los pobres (+2 cada uno)"}
              </Button>
              <Button variant="secondary" className="justify-start rounded-xl" onClick={() => setTab("ley")} data-testid="button-palacio-ley">
                <ScrollText className="mr-2 h-4 w-4" /> Copiar la ley (+4)
              </Button>
            </div>
          </>
        )}
        {tab === "audiencia" && (
          <>
            <AudienciaView alTerminar={(justa) => justa && city?.deber("audiencia")} />
            <Button variant="ghost" className="w-full" onClick={() => setTab("inicio")}>
              Volver
            </Button>
          </>
        )}
        {tab === "ley" && (
          <>
            <p className="text-xs text-stone-500">El rey escribía para sí una copia de la ley (Deuteronomio 17:18). Los escribas del palacio la copian con cuidado.</p>
            <OrdenarPalabra camino="realeza" titulo="Copiar la ley" alTerminar={() => city?.deber("ley")} />
            <Button variant="ghost" className="w-full" onClick={() => setTab("inicio")}>
              Volver
            </Button>
          </>
        )}
        {tab !== "inicio" && (
          <p className="text-center text-[11px] text-stone-500">
            <Check className="-mt-0.5 mr-0.5 inline h-3 w-3" /> Lo que haces bien cuenta como deber de tu temporada.
          </p>
        )}
      </div>
    </Card>
  );
}
