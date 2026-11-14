/**
 * SOLO EN DESARROLLO (no existe en la web publicada): una página para ver y probar cada mesa del patio con los
 * módulos puros corriendo en el navegador (el asiento 0 es la persona y los demás, compañeros de la computadora), y
 * la galería de las figuras. En la web de verdad todo lo decide el servidor.
 * Se abre en /mesa-prueba/<juego> (loteria, generala, escaleras, damas-chinas, memoria, basta, parchis o galeria).
 * El parchís acepta escenas para ver cada animación: ?escena=comer|meta|barrera|tres|fin (y ?dados=3,5 fija los
 * primeros tiros).
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
import { basta, ponerListaBasta } from "@shared/mesa/basta";
import { dibuja } from "@shared/mesa/dibuja";
import { CARTAS_LOTERIA } from "@shared/mesa/loteria-cartas";
import { DefsFiguras, Figura, IDS_FIGURAS } from "./figuras";
import { CartaLoteria } from "./Carta";
import { conNombres, type PropsMesa } from "./vida";
import { UI_MESAS, type JuegoMesaId } from "./mesas";
import { azarConSemilla, type AsientoMesa, type NivelBot } from "@shared/mesa";
import { CASA, META, PARCHIS, PARCHIS_MESA, type EstadoParchis, type JugadaParchis } from "@shared/mesa/parchis";
import { ParchisPantalla } from "./Parchis";

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
  dibuja: dibuja as unknown as ModuloConVista,
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

// ---------------------------------------------------------------- el parchís (un juego de mesa con turnos)
const posEn = (color: number, casilla: number) => (casilla - PARCHIS.salida[color] + PARCHIS.casillas) % PARCHIS.casillas;
/** Escenas para ver cada animación (la persona es el asiento 0, amarillo). */
const ESCENAS_PARCHIS: Record<string, { fichas: (n: number) => number[][]; dados: number[] }> = {
  comer: { fichas: (n) => [[posEn(0, 15), 30, CASA, CASA], [CASA, CASA, CASA, CASA], [posEn(2, 18), 20, CASA, CASA], [CASA, CASA, CASA, CASA]].slice(0, n), dados: [3] },
  meta: { fichas: (n) => [[68, 30, CASA, CASA], [CASA, CASA, CASA, CASA], [CASA, CASA, CASA, CASA], [CASA, CASA, CASA, CASA]].slice(0, n), dados: [3] },
  // (los tiros fijos son para todos, en orden: la persona saca 4, los compañeros 1, 2 y 3, y la persona saca 6)
  barrera: { fichas: (n) => [[posEn(0, 20), posEn(0, 16), 40, CASA], [CASA, CASA, CASA, CASA], [CASA, CASA, CASA, CASA], [CASA, CASA, CASA, CASA]].slice(0, n), dados: [4, 1, 2, 3, 6] },
  tres: { fichas: (n) => [[10, CASA, CASA, CASA], [CASA, CASA, CASA, CASA], [CASA, CASA, CASA, CASA], [CASA, CASA, CASA, CASA]].slice(0, n), dados: [6, 6, 6] },
  fin: { fichas: (n) => [[META, META, META, 69], [10, 30, CASA, CASA], [CASA, CASA, CASA, CASA], [CASA, CASA, CASA, CASA]].slice(0, n), dados: [2] },
};

function CorredorParchis({ n, nivel, escena, dados, opciones }: { n: number; nivel: NivelBot; escena: string | null; dados: number[]; opciones: Record<string, unknown> }) {
  const asientos = useMemo<AsientoMesa[]>(() => Array.from({ length: n }, (_, i) => ({ n: i, nombre: i ? nombreDeBot(i + 3) : "Luis", bot: i ? nivel : null })), [n, nivel]);
  // los tiros fijos primero (los de la escena o los de ?dados=), después al azar
  const tiros = useRef([...(escena ? (ESCENAS_PARCHIS[escena]?.dados ?? []) : []), ...dados]);
  const azarBot = useMemo(() => azarConSemilla(Date.now() & 0xffff), []);
  const azarDado = useMemo(() => {
    const base = azarConSemilla((Date.now() >> 3) & 0xffff);
    return () => {
      const v = tiros.current.shift();
      return v ? (v - 0.5) / 6 : base();
    };
  }, []);
  const [e, setE] = useState<EstadoParchis>(() => {
    const x = PARCHIS_MESA.estadoInicial(asientos, azarBot, opciones);
    const esc = escena ? ESCENAS_PARCHIS[escena] : undefined;
    return esc ? { ...x, fichas: esc.fichas(n), llegada: esc.fichas(n).map((l) => l.map(() => 0)) } : x;
  });
  const [ultima, setUltima] = useState<{ asiento: number; jugada: unknown; n: number } | null>(null);
  const eRef = useRef(e);
  eRef.current = e;
  const aplicar = (a: number, j: JugadaParchis) => {
    const x = PARCHIS_MESA.aplicar(eRef.current, a, j, azarDado);
    if (x === eRef.current) return false;
    eRef.current = x;
    setE(x);
    setUltima((u) => ({ asiento: a, jugada: j, n: (u?.n ?? 0) + 1 }));
    return true;
  };
  // los compañeros de la computadora juegan como en la sala: esperan a que se vea la jugada y piensan un poco
  useEffect(() => {
    if (PARCHIS_MESA.terminado(e) || !asientos[e.turno]?.bot) return;
    const [x, y] = PARCHIS_MESA.pensarMs?.[nivel] ?? [600, 1200];
    const id = setTimeout(() => aplicar(e.turno, PARCHIS_MESA.jugadaDeBot(e, e.turno, nivel, azarBot)), (PARCHIS_MESA.esperaMs?.(e) ?? 0) + x + (y - x) * Math.random());
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [e]);
  const fin = PARCHIS_MESA.terminado(e);
  const juegan = fin ? [] : [e.turno];
  return (
    <div className="space-y-3">
      <ParchisPantalla
        vista={PARCHIS_MESA.vistaPara(e, 0)}
        jugadas={PARCHIS_MESA.jugadasValidas(e, 0)}
        miAsiento={0}
        juegan={juegan}
        asientos={asientos.map((x) => ({ ...x, yo: x.n === 0 }))}
        ultima={ultima}
        jugar={(j) => void aplicar(0, j)}
        ocupado={e.turno !== 0 || !!fin}
      />
      {fin && (
        <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-3 text-sm" data-testid="prueba-fin">
          <p className="font-bold">{fin.titulo}</p>
          <p>{fin.detalle.map((d, a) => `${asientos[a].nombre}: ${d}`).join(" · ")}</p>
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

// en desarrollo, el «Basta» de prueba necesita la lista (en la web de verdad vive solo en el servidor)
void import("../../../../../server/mesa-basta-lista").then((l) => ponerListaBasta(l));

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
    [...q.entries()].filter(([k]) => !["n", "nivel", "mirar", "escena", "dados"].includes(k)),
  );
  const escena = q.get("escena");
  const dados = (q.get("dados") ?? "").split(",").map(Number).filter((x) => x >= 1 && x <= 6);
  const [vuelta, setVuelta] = useState(0);
  return (
    <div className="min-h-screen bg-[#fffaf0] text-stone-800">
      <div className="mx-auto max-w-5xl space-y-3 p-3">
        <nav className="flex flex-wrap gap-2 text-sm">
          {(["galeria", ...Object.keys(MODULOS), "parchis"] as string[]).map((j) => (
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
        ) : (juego as string) === "parchis" ? (
          <CorredorParchis key={vuelta} n={Math.max(2, Math.min(4, n))} nivel={nivel as NivelBot} escena={escena} dados={dados} opciones={opciones} />
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
