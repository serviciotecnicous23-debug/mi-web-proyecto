/**
 * La economía en la pantalla (shared/economia.ts): los puestos de los vecinos (comprar y vender lo
 * del alfolí entre jugadores, con su diezmo) y el tesoro del templo (lo que entra y sale, la
 * provisión para los que empiezan y las casas más bendecidas de la semana).
 */
import { useEffect, useState } from "react";
import { Coins, Landmark, Loader2, Minus, Plus, Store, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BIEN_MERCADO_NOMBRE, type BienMercado } from "@shared/mercado";
import {
  DIEZMO, PROVISION, PUESTOS_MAX, PUESTO_CANTIDAD_MAX, VERSO_DIEZMO, VERSO_PROVISION, diezmoDe, type PuestosEstado, type TesoroEstado,
} from "@shared/economia";
import { gameStore } from "./store";
import { Card } from "./ui";
import type { TermometroGozo } from "@shared/obras";

/** Los nombres de las fuentes del termómetro (server/gozo.ts). */
const FUENTE_NOMBRE: Record<string, string> = {
  deberes: "Deberes del templo", preguntas: "Preguntas del templo", encargos: "Encargos del día", racha: "Racha", recado: "Recados",
  cofre: "Cofre del camino", catedras: "Cátedras", sabio: "«¿Quién es sabio?»", estudios: "Estudios", ayuda: "Ayudar a vecinos",
  pueblo: "Casas del pueblo", reuniones: "Reuniones", "barrio-juntos": "Misión del barrio", copa: "Copa de los barrios",
  "ofrenda-barrio": "Ofrenda del barrio", concurso: "Concurso semanal", muro: "El muro", capitulo: "Capítulos", "fiesta-temporada": "Fiesta de la temporada",
  restauracion: "Restauración", cargos: "Cargos", mercader: "Ventas al mercader", vecinos: "Puestos de vecinos", provision: "Provisión",
  "premio-casa": "Premio a las casas", obras: "Obras de las casas", "mercado-semilla": "Semillas", "mercado-adorno": "Adornos",
  "mercado-ropa": "Ropa", "mercado-mueble": "Muebles", "mercado-letrero": "Letreros", otros: "Otros",
  regreso: "Regalo de regreso", "obras-barrio": "Obras del barrio", regalos: "Regalos a vecinos", banquete: "Banquetes (abrir)",
  "banquete-invitado": "Banquetes (invitados)", taller: "Jornal del artesano", fardo: "Ropa para el fardo", cosas: "Puestos de cosas (intercambio)", arca: "El arca de Joás", invitar: "Amigos invitados",
};

/** El termómetro del gozo (solo la administración): lo que entró y salió cada día y de dónde. */
function TermometroAdmin() {
  const [t, setT] = useState<TermometroGozo | null>(null);
  useEffect(() => {
    void pedir<TermometroGozo>("/admin/gozo?dias=7").then((r) => (r.ok && r.data ? setT(r.data) : null));
  }, []);
  if (!t) return null;
  const total = new Map<string, { entra: number; sale: number }>();
  for (const d of t.dias) for (const f of d.fuentes) {
    const x = total.get(f.fuente) ?? { entra: 0, sale: 0 };
    x.entra += f.entra;
    x.sale += f.sale;
    total.set(f.fuente, x);
  }
  const fuentes = [...total.entries()].sort((a, b) => b[1].entra + b[1].sale - (a[1].entra + a[1].sale));
  const entra = t.dias.reduce((a, d) => a + d.entra, 0), sale = t.dias.reduce((a, d) => a + d.sale, 0);
  return (
    <section className="space-y-2 rounded-xl border border-sky-200 bg-sky-50/50 p-3 text-xs dark:border-sky-900/60 dark:bg-sky-950/20" data-testid="termometro-gozo">
      <p className="font-black">🌡️ El termómetro del gozo (solo administración)</p>
      <p className="text-[11px] text-stone-600 dark:text-stone-300">
        Últimos 7 días: entró ✨ {Math.round(entra)} y salió ✨ {Math.round(sale)}
        {entra > 0 ? ` (se gastó el ${Math.round((sale / entra) * 100)} %)` : ""}. Guardado: ✨ {t.guardado.total} entre {t.guardado.personas} personas (la mitad tiene menos de {t.guardado.mediana}; {t.guardado.conMil} con 1.000 o más; el que más, {t.guardado.maximo}). Tesoro: ✨ {t.tesoro}.
      </p>
      <table className="w-full text-[11px]">
        <thead>
          <tr className="text-left text-stone-500">
            <th className="font-semibold">Día</th>
            <th className="text-right font-semibold">Entró</th>
            <th className="text-right font-semibold">Salió</th>
          </tr>
        </thead>
        <tbody>
          {t.dias.map((d) => (
            <tr key={d.dia}>
              <td>{d.dia}</td>
              <td className="text-right tabular-nums text-emerald-700 dark:text-emerald-300">+{Math.round(d.entra)}</td>
              <td className="text-right tabular-nums text-amber-700 dark:text-amber-300">−{Math.round(d.sale)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {fuentes.length > 0 && (
        <ul className="grid grid-cols-1 gap-0.5 text-[11px] sm:grid-cols-2">
          {fuentes.map(([f, x]) => (
            <li key={f} className="flex justify-between gap-2 rounded bg-white/60 px-1.5 dark:bg-stone-900/40">
              <span className="truncate">{FUENTE_NOMBRE[f] ?? f}</span>
              <span className="tabular-nums">
                {x.entra ? <b className="text-emerald-700 dark:text-emerald-300">+{Math.round(x.entra)}</b> : null}
                {x.sale ? <b className="ml-1 text-amber-700 dark:text-amber-300">−{Math.round(x.sale)}</b> : null}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

const ICONO: Record<BienMercado, string> = { harina: "🌾", aceite: "🫒", corderos: "🐑" };
const BIENES: BienMercado[] = ["harina", "aceite", "corderos"];
const mayus = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

async function pedir<T>(path: string, body?: unknown): Promise<{ ok: boolean; data: (T & { message?: string }) | null }> {
  try {
    const res = await fetch(`/api/jerusalen${path}`, {
      method: body === undefined ? "GET" : "POST",
      credentials: "include",
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body ?? {}),
    });
    return { ok: res.ok, data: (await res.json().catch(() => null)) as never };
  } catch {
    return { ok: false, data: null };
  }
}

function horas(segundos: number) {
  const h = Math.max(0, segundos / 3600);
  return h >= 1 ? `${Math.round(h)} h` : `${Math.max(1, Math.round(h * 60))} min`;
}

/** Los puestos de los vecinos: comprar lo que otros venden y abrir tus propios puestos. */
export function PuestosView({ alCambiar }: { alCambiar?: (d: { gozo: number; bienes: Record<BienMercado, number> }) => void }) {
  const [e, setE] = useState<PuestosEstado | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [bien, setBien] = useState<BienMercado>("harina");
  const [cantidad, setCantidad] = useState(1);
  const [precio, setPrecio] = useState(0);
  const recibir = (d: PuestosEstado) => {
    setE(d);
    alCambiar?.({ gozo: d.gozo, bienes: d.bienes });
    for (const v of d.ventasNuevas) gameStore.toast(`Vendiste ${v.cantidad} de ${BIEN_MERCADO_NOMBRE[v.bien]} en tu puesto: +${v.ganado} de gozo${v.diezmo ? ` (${v.diezmo} de diezmo al tesoro)` : ""}`, "gold");
  };
  useEffect(() => {
    void pedir<PuestosEstado>("/puestos").then((r) => {
      if (r.ok && r.data) {
        recibir(r.data);
        setPrecio(Math.min(r.data.precios.harina.max, r.data.precios.harina.mercader + 1));
      } else setError(r.data?.message || "No se pudieron ver los puestos.");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const hacer = async (path: string, body: unknown, ok?: (d: PuestosEstado & { comprado?: { bien: BienMercado; cantidad: number; total: number } }) => void) => {
    setBusy(true);
    setError(null);
    const r = await pedir<PuestosEstado & { comprado?: { bien: BienMercado; cantidad: number; total: number } }>(path, body);
    setBusy(false);
    if (r.ok && r.data) {
      recibir(r.data);
      ok?.(r.data);
    } else setError(r.data?.message || "No se pudo. Intenta de nuevo.");
  };
  if (!e) return error ? <p className="rounded-xl bg-red-50 p-2.5 text-xs text-red-900 dark:bg-red-950/30 dark:text-red-200">{error}</p> : <Loader2 className="mx-auto h-5 w-5 animate-spin" />;
  const rango = e.precios[bien];
  const tengo = e.bienes[bien];
  const maxCant = Math.max(1, Math.min(PUESTO_CANTIDAD_MAX, tengo));
  const cant = Math.min(cantidad, maxCant);
  const p = Math.max(rango.min, Math.min(rango.max, precio || rango.min));
  const total = cant * p;
  const elegirBien = (b: BienMercado) => {
    setBien(b);
    setCantidad(1);
    setPrecio(Math.min(e.precios[b].max, e.precios[b].mercader + 1));
  };
  return (
    <div className="space-y-3" data-testid="mercado-vecinos">
      {error && <p className="rounded-xl bg-red-50 p-2 text-xs text-red-900 dark:bg-red-950/30 dark:text-red-200">{error}</p>}
      <p className="text-xs text-stone-500">
        El mercader de la plaza solo compra. Aquí los vecinos se venden unos a otros lo de su alfolí: quien necesita harina o aceite para el horno o las ofrendas, la compra; quien cosechó de más, la vende. Del total, el {Math.round(DIEZMO * 100)} % es el diezmo para el tesoro del templo.
      </p>

      <section className="space-y-1.5" data-testid="puestos-abiertos">
        <p className="font-black">Comprar a tus vecinos</p>
        {e.abiertos.length ? (
          e.abiertos.map((x) => {
            const puedo = Math.min(x.cantidad, e.libre[x.bien], Math.floor(e.gozo / x.precio));
            return (
              <div key={x.id} className="flex items-center gap-2 rounded-xl border border-stone-200 p-2 text-xs dark:border-stone-700" data-testid={`puesto-${x.id}`}>
                <span className="text-xl">{ICONO[x.bien]}</span>
                <span className="min-w-0 flex-1">
                  <b>
                    {x.cantidad} de {BIEN_MERCADO_NOMBRE[x.bien]}
                  </b>{" "}
                  a ✨ {x.precio} c/u
                  <span className="block text-[11px] text-stone-500">
                    De {x.vendedor} · cierra en {horas(x.quedan)}
                  </span>
                </span>
                <Button size="sm" variant="secondary" className="h-7 px-2" disabled={busy || puedo < 1} onClick={() => void hacer(`/puestos/${x.id}/comprar`, { cantidad: 1 }, (d) => d.comprado && gameStore.toast(`Compraste ${d.comprado.cantidad} de ${BIEN_MERCADO_NOMBRE[d.comprado.bien]}: está en tu alfolí`, "gold"))} data-testid={`comprar-puesto-${x.id}`}>
                  1
                </Button>
                {puedo > 1 && (
                  <Button size="sm" className="h-7 px-2" disabled={busy} onClick={() => void hacer(`/puestos/${x.id}/comprar`, { cantidad: puedo }, (d) => d.comprado && gameStore.toast(`Compraste ${d.comprado.cantidad} de ${BIEN_MERCADO_NOMBRE[d.comprado.bien]} por ✨ ${d.comprado.total}`, "gold"))}>
                    {puedo}
                  </Button>
                )}
              </div>
            );
          })
        ) : (
          <p className="rounded-xl bg-stone-50 p-2 text-[11px] text-stone-500 dark:bg-stone-800/60">Nadie está vendiendo ahora. ¡Sé el primero en abrir un puesto!</p>
        )}
      </section>

      {e.mios.length > 0 && (
        <section className="space-y-1.5" data-testid="puestos-mios">
          <p className="font-black">Tus puestos</p>
          {e.mios.map((x) => (
            <div key={x.id} className="flex items-center gap-2 rounded-xl bg-amber-50/70 p-2 text-xs dark:bg-amber-950/20">
              <span className="text-xl">{ICONO[x.bien]}</span>
              <span className="min-w-0 flex-1">
                Quedan <b>{x.cantidad}</b> de {BIEN_MERCADO_NOMBRE[x.bien]} a ✨ {x.precio} c/u · cierra en {horas(x.quedan)}
              </span>
              <Button size="sm" variant="ghost" className="h-7 px-2" disabled={busy} onClick={() => void hacer(`/puestos/${x.id}/cerrar`, {})} title="Cerrar el puesto (lo que quede vuelve a tu alfolí)">
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
        </section>
      )}

      <section className="space-y-2 rounded-xl border border-amber-200 p-3 dark:border-amber-900/60" data-testid="puesto-nuevo">
        <p className="flex items-center gap-1.5 font-black">
          <Store className="h-4 w-4" /> Abrir un puesto ({e.mios.length} de {PUESTOS_MAX})
        </p>
        <div className="flex flex-wrap gap-1">
          {BIENES.map((b) => (
            <button key={b} type="button" aria-pressed={bien === b} onClick={() => elegirBien(b)} className={`rounded-full px-2.5 py-1 text-xs font-bold ${bien === b ? "bg-amber-400 text-amber-950" : "bg-stone-100 dark:bg-stone-800"}`} data-testid={`puesto-bien-${b}`}>
              {ICONO[b]} {mayus(BIEN_MERCADO_NOMBRE[b])} ({e.bienes[b]})
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <label className="space-y-1">
            <span className="block font-semibold">Cuántos</span>
            <span className="flex items-center gap-1">
              <button type="button" className="rounded-full bg-stone-100 p-1 dark:bg-stone-800" onClick={() => setCantidad(Math.max(1, cant - 1))} aria-label="Menos">
                <Minus className="h-3.5 w-3.5" />
              </button>
              <b className="w-8 text-center tabular-nums" data-testid="puesto-cantidad">
                {cant}
              </b>
              <button type="button" className="rounded-full bg-stone-100 p-1 dark:bg-stone-800" onClick={() => setCantidad(Math.min(maxCant, cant + 1))} aria-label="Más">
                <Plus className="h-3.5 w-3.5" />
              </button>
            </span>
          </label>
          <label className="space-y-1">
            <span className="block font-semibold">Precio c/u (✨ {rango.min} a {rango.max})</span>
            <span className="flex items-center gap-1">
              <button type="button" className="rounded-full bg-stone-100 p-1 dark:bg-stone-800" onClick={() => setPrecio(Math.max(rango.min, p - 1))} aria-label="Más barato">
                <Minus className="h-3.5 w-3.5" />
              </button>
              <b className="w-8 text-center tabular-nums" data-testid="puesto-precio">
                {p}
              </b>
              <button type="button" className="rounded-full bg-stone-100 p-1 dark:bg-stone-800" onClick={() => setPrecio(Math.min(rango.max, p + 1))} aria-label="Más caro">
                <Plus className="h-3.5 w-3.5" />
              </button>
            </span>
          </label>
        </div>
        <p className="text-[11px] text-stone-500">
          El mercader te pagaría ✨ {rango.mercader} c/u hoy. Si se vende todo: ✨ {total} − {diezmoDe(total)} de diezmo = <b>✨ {total - diezmoDe(total)}</b> para ti. Si no se vende en 48 horas, vuelve a tu alfolí.
        </p>
        <Button className="w-full rounded-full bg-amber-500 font-bold text-amber-950 hover:bg-amber-400" disabled={busy || tengo < 1 || e.mios.length >= PUESTOS_MAX} onClick={() => void hacer("/puestos", { bien, cantidad: cant, precio: p }, () => gameStore.toast(`Abriste tu puesto: ${cant} de ${BIEN_MERCADO_NOMBRE[bien]} a ✨ ${p} c/u`, "gold"))} data-testid="puesto-abrir">
          {busy ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : <Store className="mr-1 h-4 w-4" />} Abrir el puesto
        </Button>
        {tengo < 1 && <p className="text-[11px] text-stone-500">No tienes {BIEN_MERCADO_NOMBRE[bien]} en el alfolí: cosecha en tu huerto o espera a tus siervos.</p>}
      </section>

      <button type="button" onClick={() => gameStore.push({ kind: "tesoro" })} className="flex w-full items-center gap-2 rounded-xl bg-stone-50 p-2.5 text-left text-xs dark:bg-stone-800/60" data-testid="ver-tesoro">
        <Landmark className="h-5 w-5 shrink-0 text-amber-600" />
        <span className="min-w-0 flex-1">
          <b>El tesoro del templo: ✨ {e.tesoro}</b>
          <span className="block text-[11px] text-stone-500">De ahí sale la provisión para los que empiezan y el premio de las casas más bendecidas.</span>
        </span>
      </button>
    </div>
  );
}

/** El tesoro del templo: lo que entra (diezmo) y lo que sale (provisión y premios). */
export function TesoroView() {
  const [t, setT] = useState<TesoroEstado | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    void pedir<TesoroEstado>("/tesoro").then((r) => (r.ok && r.data ? setT(r.data) : setError(r.data?.message || "No se pudo abrir el tesoro.")));
  }, []);
  const recibir = async () => {
    setBusy(true);
    const r = await pedir<TesoroEstado>("/tesoro/provision", {});
    setBusy(false);
    if (r.ok && r.data) {
      setT(r.data);
      gameStore.toast(`Recibiste la provisión del tesoro: +${PROVISION.gozo} de gozo`, "gold");
    } else setError(r.data?.message || "No se pudo recibir.");
  };
  return (
    <Card
      title={
        <span className="flex items-center gap-2">
          <Landmark className="h-5 w-5" /> El tesoro del templo
        </span>
      }
      onClose={() => gameStore.close()}
      testid="ciudad-tesoro"
    >
      <div className="space-y-3 p-4 text-sm">
        {error && <p className="rounded-xl bg-amber-50 p-2.5 text-xs dark:bg-amber-950/30">{error}</p>}
        {!t && !error && <Loader2 className="mx-auto h-5 w-5 animate-spin" />}
        {t && (
          <>
            <div className="rounded-xl bg-gradient-to-r from-amber-100 to-amber-50 p-3 text-center dark:from-amber-950/50 dark:to-transparent">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">Hay en el tesoro</p>
              <p className="font-serif text-3xl font-black" data-testid="tesoro-saldo">
                ✨ {t.balance}
              </p>
              <p className="text-[11px] text-stone-500">
                Entró ✨ {t.entro} · salió ✨ {t.salio}
              </p>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-300">
              Entra el diezmo: el 10 % de cada venta entre vecinos, de cada compra en la plaza y de cada obra de casa. Sale para la provisión de los que empiezan y para premiar cada semana a las casas más bendecidas.
            </p>
            <section className="space-y-1.5 rounded-xl border border-emerald-200 p-3 dark:border-emerald-900/60" data-testid="tesoro-provision">
              <p className="font-black">La provisión para los que empiezan</p>
              <p className="text-[11px] text-stone-500">
                Los primeros {PROVISION.dias} días en Jerusalén, si tienes menos de {PROVISION.siTieneMenosDe} de gozo, recibes {PROVISION.gozo} cada día.
              </p>
              {t.provision.puede ? (
                <Button className="w-full rounded-full bg-emerald-600 font-bold hover:bg-emerald-500" disabled={busy} onClick={() => void recibir()} data-testid="tesoro-recibir">
                  {busy ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : <Coins className="mr-1 h-4 w-4" />} Recibir mi provisión (+{t.provision.gozo})
                </Button>
              ) : (
                <p className="rounded-lg bg-stone-50 px-2 py-1 text-[11px] dark:bg-stone-800/60">{t.provision.motivo}</p>
              )}
              <p className="text-[10px] italic text-stone-500">
                «{VERSO_PROVISION.text}» ({VERSO_PROVISION.ref})
              </p>
            </section>
            <section className="space-y-1.5" data-testid="tesoro-casas">
              <p className="font-black">Las casas más bendecidas de esta semana</p>
              <p className="text-[11px] text-stone-500">
                Al terminar la semana, el tesoro premia a las tres primeras: ✨ {t.premios.join(" · ")}. Adorna tu casa y visita a tus vecinos: las bendiciones se dejan dentro de cada casa.
              </p>
              {t.casas.length ? (
                <ol className="space-y-1 text-xs">
                  {t.casas.map((c, i) => (
                    <li key={c.personajeId} className="flex items-center gap-2 rounded-lg bg-stone-50 px-2 py-1 dark:bg-stone-800/60">
                      <b className="w-5 text-center">{i + 1}</b>
                      <span className="min-w-0 flex-1 truncate">{c.nombre}</span>
                      <span>🙏 {c.bendiciones}</span>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-[11px] text-stone-500">Todavía nadie recibió bendiciones esta semana.</p>
              )}
            </section>
            {t.ultimos.length > 0 && (
              <section className="space-y-1" data-testid="tesoro-movimientos">
                <p className="font-black">Lo último que entró y salió</p>
                <ul className="space-y-0.5 text-[11px]">
                  {t.ultimos.map((u, i) => (
                    <li key={i} className="flex gap-2">
                      <span className={`w-12 shrink-0 text-right font-bold ${u.entra ? "text-emerald-700 dark:text-emerald-300" : "text-amber-700 dark:text-amber-300"}`}>
                        {u.entra ? "+" : "−"}
                        {u.cuanto}
                      </span>
                      <span className="min-w-0 flex-1 text-stone-600 dark:text-stone-300">{u.texto}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            <TermometroAdmin />
            <p className="text-center text-xs italic text-stone-500">
              «{VERSO_DIEZMO.text}» ({VERSO_DIEZMO.ref})
            </p>
          </>
        )}
      </div>
    </Card>
  );
}
