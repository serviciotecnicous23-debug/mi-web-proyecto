/**
 * Los regalos entre vecinos (shared/regalos.ts, server/regalos.ts): «Regalarle algo» al visitar la casa de un vecino o
 * amigo (algo del mercado, con una frase de la lista) y los regalos que te dieron, en Tu casa → Vecinos.
 */
import { useEffect, useMemo, useState } from "react";
import { Gift, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ARTICULOS, enTemporada, precioHoy, type Articulo } from "@shared/mercado";
import { mueble } from "@shared/casa-interior";
import { diaEnJerusalen } from "@shared/anio";
import { CATEGORIAS_REGALO, FRASES_REGALO, VERSO_REGALO, type ParaRegalar, type RegalosEstado } from "@shared/regalos";
import { gameStore } from "./store";
import { hace } from "./ui";

async function pedir<T>(path: string, body?: unknown): Promise<{ ok: boolean; data: (T & { message?: string }) | null }> {
  try {
    const res = await fetch(`/api/jerusalen${path}`, {
      method: body === undefined ? "GET" : "POST",
      credentials: "include",
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    return { ok: res.ok, data: (await res.json().catch(() => null)) as never };
  } catch {
    return { ok: false, data: null };
  }
}

const NOMBRE_CATEGORIA: Record<string, string> = { adorno: "🏺 Adornos para su casa", ropa: "🧵 Ropa", mueble: "🪑 Muebles", semilla: "🌾 Semillas (5)" };
const nombreArticulo = (id: string) => ARTICULOS.find((a) => a.id === id)?.nombre ?? id;

/** «Regalarle algo» (en la visita a la casa de un vecino o amigo). `alGozo` pone el gozo nuevo en el marcador. */
export function RegalarBoton({ personajeId, alGozo }: { personajeId: number; alGozo?: (gozo: number) => void }) {
  const [abierto, setAbierto] = useState(false);
  const [para, setPara] = useState<ParaRegalar | null>(null);
  const [elegido, setElegido] = useState<string | null>(null);
  const [frase, setFrase] = useState<string>(FRASES_REGALO[0]);
  const [busy, setBusy] = useState(false);
  const [aviso, setAviso] = useState<string | null>(null);
  const dia = useMemo(() => diaEnJerusalen().iso, []);
  const abrir = async () => {
    setAbierto(true);
    setAviso(null);
    const r = await pedir<ParaRegalar>(`/regalos/para/${personajeId}`);
    if (r.ok && r.data) setPara(r.data);
    else setAviso(r.data?.message || "No se pudo abrir.");
  };
  const opciones = useMemo(() => {
    if (!para) return [] as { a: Articulo; precio: number }[];
    return ARTICULOS.filter(
      (a) =>
        (CATEGORIAS_REGALO as readonly string[]).includes(a.categoria) &&
        !a.exclusivo &&
        enTemporada(a) &&
        !para.tiene.includes(a.id) &&
        (a.categoria !== "mueble" || (mueble(a.id)?.nivelMin ?? 0) <= para.nivel),
    ).map((a) => ({ a, precio: precioHoy(a, dia) * (a.categoria === "semilla" ? 5 : 1) }));
  }, [para, dia]);
  const regalar = async () => {
    if (!elegido || !para) return;
    setBusy(true);
    setAviso(null);
    const r = await pedir<RegalosEstado & { regalado: { para: string; articulo: string; costo: number } }>("/regalos", { para: personajeId, articulo: elegido, frase });
    setBusy(false);
    if (r.ok && r.data) {
      alGozo?.(r.data.gozo);
      gameStore.toast(`🎁 Le regalaste ${r.data.regalado.articulo} a ${r.data.regalado.para}. ¡Le va a llegar con tu frase!`, "gold");
      setAbierto(false);
      setElegido(null);
      setPara(null);
    } else setAviso(r.data?.message || "No se pudo mandar el regalo.");
  };
  if (!abierto) {
    return (
      <Button variant="secondary" className="w-full rounded-full font-bold" onClick={() => void abrir()} data-testid="button-visita-regalar">
        <Gift className="mr-1 h-4 w-4" /> Regalarle algo
      </Button>
    );
  }
  const elegidoOp = opciones.find((o) => o.a.id === elegido);
  return (
    <section className="space-y-2 rounded-xl border border-rose-200 bg-rose-50/60 p-3 text-xs dark:border-rose-900/60 dark:bg-rose-950/20" data-testid="regalar">
      <p className="flex items-center justify-between gap-2 font-black">
        <span>🎁 Un regalo para {para?.nombre ?? "tu vecino"}</span>
        <button type="button" className="text-[11px] font-semibold underline" onClick={() => setAbierto(false)}>
          Cerrar
        </button>
      </p>
      {!para && !aviso && <Loader2 className="mx-auto h-4 w-4 animate-spin" />}
      {para && !para.puede && <p className="rounded-lg bg-stone-100 p-2 dark:bg-stone-800">{para.motivo}</p>}
      {para?.puede && (
        <>
          <p className="text-[11px] text-stone-600 dark:text-stone-300">
            Tienes ✨ {para.gozo}. Hoy puedes mandar {para.quedanHoy} {para.quedanHoy === 1 ? "regalo" : "regalos"} más. Lo de temporada, solo en su tiempo.
          </p>
          <div className="max-h-56 space-y-2 overflow-y-auto pr-1">
            {CATEGORIAS_REGALO.map((cat) => {
              const lista = opciones.filter((o) => o.a.categoria === cat);
              if (!lista.length) return null;
              return (
                <div key={cat}>
                  <p className="mb-1 font-bold text-stone-600 dark:text-stone-300">{NOMBRE_CATEGORIA[cat]}</p>
                  <div className="flex flex-wrap gap-1">
                    {lista.map(({ a, precio }) => (
                      <button
                        key={a.id}
                        type="button"
                        aria-pressed={elegido === a.id}
                        disabled={para.gozo < precio}
                        onClick={() => setElegido(a.id)}
                        className={`rounded-full px-2 py-1 text-[11px] font-semibold disabled:opacity-40 ${elegido === a.id ? "bg-rose-500 text-white" : "bg-white dark:bg-stone-800"}`}
                        data-testid={`regalo-${a.id}`}
                      >
                        {a.icono} {a.nombre} · {precio}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <label className="block">
            <span className="font-bold">Con esta frase:</span>
            <select value={frase} onChange={(ev) => setFrase(ev.target.value)} className="mt-1 w-full rounded-lg border border-stone-300 bg-white p-1.5 dark:border-stone-700 dark:bg-stone-900" data-testid="regalo-frase">
              {FRASES_REGALO.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </label>
          <Button className="w-full rounded-full bg-rose-500 font-bold text-white hover:bg-rose-400" disabled={busy || !elegidoOp} onClick={() => void regalar()} data-testid="regalo-mandar">
            {busy ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : <Gift className="mr-1 h-4 w-4" />}
            {elegidoOp ? `Regalar ${elegidoOp.a.nombre.toLowerCase()} · ${elegidoOp.precio} de gozo` : "Elige un regalo"}
          </Button>
        </>
      )}
      {aviso && <p className="rounded-lg bg-rose-100 p-2 text-rose-900 dark:bg-rose-950/50 dark:text-rose-200" data-testid="regalo-aviso">{aviso}</p>}
      <p className="text-[10px] italic text-stone-500">
        «{VERSO_REGALO.text}» ({VERSO_REGALO.ref})
      </p>
    </section>
  );
}

/** Los regalos que te dieron (en Tu casa → Vecinos). Al verlos, quedan vistos. */
export function RegalosRecibidos() {
  const [r, setR] = useState<RegalosEstado | null>(null);
  useEffect(() => {
    let vivo = true;
    const cargar = () =>
      void pedir<RegalosEstado>("/regalos").then((x) => {
        if (!vivo || !x.ok || !x.data) return;
        setR(x.data);
        if (x.data.nuevos) void pedir("/regalos/vistos", {});
      });
    cargar();
    window.addEventListener("jer-regalo", cargar);
    return () => {
      vivo = false;
      window.removeEventListener("jer-regalo", cargar);
    };
  }, []);
  if (!r) return null;
  return (
    <section className="space-y-1.5 rounded-xl border border-rose-200 p-3 text-xs dark:border-rose-900/60" data-testid="regalos-recibidos">
      <p className="font-black">🎁 Regalos que te dieron</p>
      {r.recibidos.length ? (
        <ul className="space-y-1">
          {r.recibidos.map((g) => (
            <li key={g.id} className={`rounded-lg px-2 py-1 ${g.nuevo ? "bg-rose-100 font-semibold dark:bg-rose-950/40" : "bg-stone-50 dark:bg-stone-800/60"}`}>
              {g.nuevo ? "✨ " : ""}
              <b>{g.de}</b> te regaló {nombreArticulo(g.articulo).toLowerCase()}: «{g.frase}» <span className="text-stone-500">· {hace(g.cuando)}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-stone-500">Todavía no te regalaron nada. Tú puedes empezar: visita la casa de un vecino y toca «Regalarle algo».</p>
      )}
      <p className="text-[11px] text-stone-500">Lo que te regalan ya está en tu armario o en tu arcón: póntelo o ponlo en tu casa.</p>
    </section>
  );
}
