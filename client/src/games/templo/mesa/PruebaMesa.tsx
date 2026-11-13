/**
 * SOLO EN DESARROLLO (no existe en la web publicada): una página para ver y probar cada mesa del patio con los
 * módulos puros corriendo en el navegador (el asiento 0 es la persona y los demás, compañeros de la computadora), y
 * la galería de las figuras. En la web de verdad todo lo decide el servidor.
 * Se abre en /mesa-prueba/<juego> (loteria, generala, escaleras, damas-chinas, memoria, basta o galeria).
 */
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
} from "react";
import { useRoute, Link } from "wouter";
import {
  azarCon,
  nombreDeBot,
  type ModuloMesa,
  type Nivel,
} from "@shared/mesa/comun";
import { loteria } from "@shared/mesa/loteria";
import { generala } from "@shared/mesa/generala";
import { escaleras } from "@shared/mesa/escaleras";
import { damasChinas } from "@shared/mesa/damas-chinas";
import { memoria, PAREJAS } from "@shared/mesa/memoria";
import { basta } from "@shared/mesa/basta";
import { CARTAS_LOTERIA } from "@shared/mesa/loteria-cartas";
import { DefsFiguras, Figura, IDS_FIGURAS } from "./figuras";
import { CartaLoteria } from "./Carta";
import { conNombres, type PropsMesa } from "./vida";
import { UI_MESAS, type JuegoMesaId } from "./mesas";

type ModuloConVista = ModuloMesa<
  unknown,
  unknown,
  unknown,
  Record<string, unknown>
> & {
  vistaPara(e: unknown, a: number | null, ahora: number): unknown;
};
const MODULOS: Record<JuegoMesaId, ModuloConVista> = {
  loteria: loteria as unknown as ModuloConVista,
  generala: generala as unknown as ModuloConVista,
  escaleras: escaleras as unknown as ModuloConVista,
  "damas-chinas": damasChinas as unknown as ModuloConVista,
  memoria: memoria as unknown as ModuloConVista,
  basta: basta as unknown as ModuloConVista,
};

function Corredor({
  juego,
  n,
  nivel,
  opciones,
  mirar,
}: {
  juego: JuegoMesaId;
  n: number;
  nivel: Nivel;
  opciones: Record<string, unknown>;
  mirar: boolean;
}) {
  const mod = MODULOS[juego];
  const UI = UI_MESAS[juego] as ComponentType<PropsMesa<unknown, unknown>>;
  const azar = useMemo(() => azarCon(Date.now() & 0xffff), []);
  const bots = useMemo(
    () =>
      Array.from({ length: n }, (_, i) => (i === 0 && !mirar ? null : nivel)),
    [n, nivel, mirar],
  );
  const nombres = useMemo(
    () => bots.map((b, i) => (b ? nombreDeBot(i + 3) : "Luis")),
    [bots],
  );
  const [e, setE] = useState(() =>
    mod.estadoInicial({ bots, opciones }, azar, Date.now()),
  );
  const eRef = useRef(e);
  eRef.current = e;
  useEffect(() => {
    const id = setInterval(() => {
      const x = mod.alTiempo(eRef.current, Date.now(), azar);
      if (x) setE(x);
    }, 100);
    return () => clearInterval(id);
  }, [mod, azar]);
  const ahora = Date.now();
  const vista = mod.vistaPara(e, mirar ? null : 0, ahora);
  const fin = mod.terminado(e);
  return (
    <div className="space-y-3">
      <UI
        vista={vista}
        nombres={nombres}
        bots={bots.map(Boolean)}
        recibidaEn={ahora}
        jugar={async (j) => {
          const r = mod.aplicar(eRef.current, 0, j, Date.now(), azar);
          if (r.ok) setE(r.e);
          return r.ok ? { ok: true } : { ok: false, message: r.motivo };
        }}
      />
      {fin && (
        <div
          className="rounded-xl border border-emerald-300 bg-emerald-50 p-3 text-sm"
          data-testid="prueba-fin"
        >
          <p className="font-bold">{conNombres(fin.titulo, nombres)}</p>
          <ol className="mt-1 list-decimal pl-5">
            {fin.puestos
              .map((p, a) => ({ p, a }))
              .sort((x, y) => x.p - y.p)
              .map(({ p, a }) => (
                <li key={a}>
                  {p}.º {nombres[a]} — {fin.detalle[a]}
                </li>
              ))}
          </ol>
        </div>
      )}
    </div>
  );
}

function Galeria() {
  const q = new URLSearchParams(window.location.search);
  const desde = Number(q.get("desde") || 0);
  if (q.get("grande")) {
    return (
      <div className="grid grid-cols-4 gap-2">
        <DefsFiguras />
        {IDS_FIGURAS.slice(desde, desde + 8).map((id) => (
          <figure key={id} className="text-center text-xs">
            <Figura
              id={id}
              className="aspect-square w-full rounded border bg-white"
            />
            <figcaption>{id}</figcaption>
          </figure>
        ))}
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <DefsFiguras />
      <h2 className="font-serif text-xl font-bold">
        Las 54 cartas de la lotería
      </h2>
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-9">
        {CARTAS_LOTERIA.map((c, i) => (
          <div key={c.id} className="aspect-[3/4]">
            <CartaLoteria i={i} />
          </div>
        ))}
      </div>
      <h2 className="font-serif text-xl font-bold">
        Todas las figuras ({IDS_FIGURAS.length})
      </h2>
      <div className="grid grid-cols-6 gap-2 sm:grid-cols-10">
        {IDS_FIGURAS.map((id) => (
          <figure key={id} className="text-center text-[10px]">
            <Figura id={id} className="aspect-square w-full rounded border" />
            <figcaption>{id}</figcaption>
          </figure>
        ))}
      </div>
      <p className="text-xs">
        Parejas de la memoria sin dibujo propio:{" "}
        {PAREJAS.filter((p) => !IDS_FIGURAS.includes(p.figura))
          .map((p) => p.id)
          .join(", ") || "ninguna"}
      </p>
    </div>
  );
}

export default function PruebaMesa() {
  const [, p] = useRoute("/mesa-prueba/:juego");
  const juego = (p?.juego ?? "galeria") as JuegoMesaId | "galeria";
  const q = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : "",
  );
  const n = Math.max(1, Math.min(12, Number(q.get("n") || 4)));
  const nivel = (q.get("nivel") as Nivel) || "normal";
  const mirar = q.get("mirar") === "1";
  const opciones = Object.fromEntries(
    [...q.entries()].filter(([k]) => !["n", "nivel", "mirar"].includes(k)),
  );
  const [vuelta, setVuelta] = useState(0);
  return (
    <div className="min-h-screen bg-[#fffaf0] text-stone-800">
      <div className="mx-auto max-w-5xl space-y-3 p-3">
        <nav className="flex flex-wrap gap-2 text-sm">
          {(["galeria", ...Object.keys(MODULOS)] as string[]).map((j) => (
            <Link
              key={j}
              href={`/mesa-prueba/${j}`}
              className={`rounded-full border px-3 py-1 ${j === juego ? "bg-amber-200 font-bold" : "bg-white"}`}
            >
              {j}
            </Link>
          ))}
          {juego !== "galeria" && (
            <button
              type="button"
              className="rounded-full border bg-white px-3 py-1"
              onClick={() => setVuelta((x) => x + 1)}
            >
              Otra partida
            </button>
          )}
        </nav>
        {juego === "galeria" ? (
          <Galeria />
        ) : MODULOS[juego] ? (
          <Corredor
            key={`${juego}-${vuelta}`}
            juego={juego}
            n={n}
            nivel={nivel}
            opciones={opciones}
            mirar={mirar}
          />
        ) : (
          <p>No existe ese juego.</p>
        )}
      </div>
    </div>
  );
}
