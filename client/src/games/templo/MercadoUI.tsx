/**
 * El mercado de la plaza y lo nuevo de la casa (shared/mercado.ts): comprar semillas, adornos, ropa y
 * el letrero; vender lo del alfolí; el huerto (sembrar, regar y cosechar); poner los adornos, vestirse
 * y nombrar la casa. El servidor lleva las cuentas (server/mercado.ts).
 */
import { useEffect, useState } from "react";
import { Loader2, ShoppingBasket, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ARTICULOS, HORNO_MAX, LETREROS, PUESTOS_MERCADO, RECETAS, SEMILLAS, articulo, precioHoy, precioVentaHoy, type MercadoEstado, type RecetaId, type TabMercado,
} from "@shared/mercado";
import type { CasaPrivada } from "@shared/ciudad";
import { gameStore } from "./store";
import { Card } from "./ui";

async function pedir(path: string, body?: unknown): Promise<{ ok: boolean; data: (MercadoEstado & { message?: string; cosecha?: { bien: string; cuanto: number }; vendido?: number }) | null }> {
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

/** El estado del mercado; cada cambio también se avisa a la ciudad (`alCambiar`). */
function useMercado(alCambiar?: (m: MercadoEstado) => void) {
  const [m, setM] = useState<MercadoEstado | null>(null);
  /** Cuándo llegó (para contar el tiempo del huerto). */
  const [recibido, setRecibido] = useState(() => Date.now());
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const recibir = (d: MercadoEstado) => {
    setM(d);
    setRecibido(Date.now());
  };
  useEffect(() => {
    void pedir("/mercado").then((r) => {
      if (r.ok && r.data) {
        recibir(r.data);
        alCambiar?.(r.data);
      } else setError(r.data?.message || "No se pudo abrir. Revisa tu conexión.");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const hacer = async (path: string, body: unknown, ok?: (d: NonNullable<Awaited<ReturnType<typeof pedir>>["data"]>) => void) => {
    setBusy(true);
    setError(null);
    const r = await pedir(path, body);
    setBusy(false);
    if (r.ok && r.data) {
      recibir(r.data);
      alCambiar?.(r.data);
      ok?.(r.data);
    } else setError(r.data?.message || "No se pudo. Intenta de nuevo.");
  };
  /** Vuelve a pedir el estado (después de ofrecer en el templo, que es otra ruta). */
  const recargar = async () => {
    const r = await pedir("/mercado");
    if (r.ok && r.data) {
      recibir(r.data);
      alCambiar?.(r.data);
    }
  };
  return { m, recibido, error, busy, hacer, recargar };
}

const NOMBRE_BIEN: Record<string, string> = { harina: "flor de harina", aceite: "aceite", corderos: "corderos" };
const mayuscula = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

function tiempo(s: number) {
  const m = Math.floor(s / 60);
  return m >= 1 ? `${m} min` : `${s} s`;
}

/** El mercado de la plaza (los mercaderes de los puestos); `tab` es el puesto donde se entró. */
export function MercadoView({ tab: inicial, alCambiar }: { tab?: TabMercado; alCambiar?: (m: MercadoEstado) => void }) {
  const { m, error, busy, hacer } = useMercado(alCambiar);
  const [tab, setTab] = useState<TabMercado>(inicial ?? "semilla");
  const puesto = PUESTOS_MERCADO.find((p) => p.tab === inicial);
  const tabs: [TabMercado, string][] = [
    ["semilla", "Semillas"],
    ["adorno", "Casa"],
    ["ropa", "Ropa"],
    ["letrero", "Letrero"],
    ["vender", "Vender"],
  ];
  return (
    <Card
      title={
        <span className="flex items-center gap-2">
          <ShoppingBasket className="h-5 w-5" /> El mercado de la plaza
        </span>
      }
      onClose={() => gameStore.close()}
      testid="ciudad-mercado"
    >
      <div className="space-y-3 p-4 text-sm">
        {puesto && (
          <p className="rounded-xl bg-amber-50/70 p-2.5 text-[13px] dark:bg-amber-950/20" data-testid="mercado-puesto">
            <b>
              {puesto.icono} {puesto.nombre}:
            </b>{" "}
            «{puesto.dice}»
          </p>
        )}
        <p className="text-xs text-stone-500">«El peso falso es abominación a Jehová; Mas la pesa cabal le agrada» (Proverbios 11:1). Aquí los precios son justos y fijos. El gozo de Jerusalén en línea se gana sirviendo aquí: no es el de tu partida en el modo historia.</p>
        {m && (
          <p className="flex items-center justify-between rounded-xl bg-amber-50 p-2.5 font-bold dark:bg-amber-950/30" data-testid="mercado-gozo">
            <span>
              <Sparkles className="-mt-0.5 mr-1 inline h-4 w-4 text-amber-500" /> Tu gozo: {m.gozo}
            </span>
            <span className="text-[11px] font-semibold text-stone-500">Ofertas de hoy: {m.ofertas.map((o) => articulo(o)?.nombre).join(" y ")}</span>
          </p>
        )}
        {error && <p className="rounded-xl bg-red-50 p-2.5 text-red-900 dark:bg-red-950/30 dark:text-red-200">{error}</p>}
        {!m && !error && (
          <p className="flex items-center gap-2 text-stone-500">
            <Loader2 className="h-4 w-4 animate-spin" /> Abriendo los puestos…
          </p>
        )}
        {m && (
          <>
            <div className="flex flex-wrap gap-1">
              {tabs.map(([id, n]) => (
                <button key={id} type="button" onClick={() => setTab(id)} className={`rounded-full px-3 py-1 text-xs font-bold ${tab === id ? "bg-amber-400 text-amber-950" : "bg-stone-100 dark:bg-stone-800"}`} data-testid={`mercado-tab-${id}`}>
                  {n}
                </button>
              ))}
            </div>
            {tab !== "vender" ? (
              <ul className="space-y-1.5">
                {ARTICULOS.filter((a) => a.categoria === tab).map((a) => {
                  const precio = precioHoy(a, m.dia);
                  const tiene = (a.categoria === "adorno" || a.categoria === "ropa") && m.armario.includes(a.id);
                  const yaLetrero = a.categoria === "letrero" && m.tieneLetrero;
                  return (
                    <li key={a.id} className="flex items-center gap-2.5 rounded-xl border border-stone-200 p-2.5 dark:border-stone-700">
                      <span className="text-2xl" style={a.color ? { filter: "drop-shadow(0 0 0 transparent)" } : undefined}>
                        {a.icono}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-bold">
                          {a.nombre}
                          {a.color && <span className="ml-1.5 inline-block h-3 w-3 rounded-full align-middle ring-1 ring-black/20" style={{ background: a.color }} />}
                        </span>
                        <span className="block text-[11px] text-stone-500">
                          {a.detalle}
                          {a.categoria === "semilla" && ` Tienes ${m.semillas[a.id] || 0}.`}
                        </span>
                      </span>
                      <span className="shrink-0 text-right">
                        {precio < a.precio && <span className="block text-[10px] text-stone-400 line-through">{a.precio}</span>}
                        <span className="block font-black text-amber-700 dark:text-amber-300">✨ {precio}</span>
                      </span>
                      <Button
                        size="sm"
                        disabled={busy || tiene || yaLetrero || m.gozo < precio}
                        onClick={() => void hacer("/mercado/comprar", { articulo: a.id, cantidad: 1 }, () => gameStore.toast(`Compraste: ${a.nombre}`, "gold"))}
                        data-testid={`comprar-${a.id}`}
                      >
                        {tiene || yaLetrero ? "Tuyo" : "Comprar"}
                      </Button>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="space-y-2" data-testid="mercado-vender">
                <p className="text-xs text-stone-500">Los mercaderes compran lo del alfolí de tu casa (lo que dan el huerto y tus siervos). Ofrecerlo en el templo da honra a tu casa; venderlo te da gozo. Piénsalo bien: cada día buscan una cosa y la pagan al doble.</p>
                <p className="rounded-xl bg-emerald-50 p-2 text-xs font-bold text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200" data-testid="mercado-demanda">
                  Hoy buscan {NOMBRE_BIEN[m.demanda]}: pagan el doble.
                </p>
                {(["harina", "aceite", "corderos"] as const).map((b) => (
                  <div key={b} className={`flex items-center gap-2 rounded-xl border p-2.5 ${m.demanda === b ? "border-emerald-300 dark:border-emerald-800" : "border-stone-200 dark:border-stone-700"}`}>
                    <span className="min-w-0 flex-1">
                      <b>{mayuscula(NOMBRE_BIEN[b])}</b>: tienes {m.bienes[b]} · ✨ {precioVentaHoy(b, m.dia)} cada uno{m.demanda === b ? " (¡doble!)" : ""}
                    </span>
                    <Button
                      size="sm"
                      variant="secondary"
                      disabled={busy || m.bienes[b] <= 0}
                      onClick={() => void hacer("/mercado/vender", { bienes: { [b]: m.bienes[b] } }, (d) => gameStore.toast(`Vendiste ${NOMBRE_BIEN[b]}: +${d.vendido ?? 0} de gozo`, "gold"))}
                      data-testid={`vender-${b}`}
                    >
                      Vender todo
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </Card>
  );
}

/** Lo que vuelve al ofrecer en el templo (para la casa y la ciudad). */
export type Ofrecido = { ganado: number; doble: string | null; subio: number | null; honra: number; privada: CasaPrivada; misiones?: { titulo: string; premio: number; gozo?: number }[] };

/** Lo nuevo de la casa: el huerto, el horno, los adornos, la ropa y el letrero (dentro de «Tu casa»). */
export type ParteCasa = "huerto" | "horno" | "adornos" | "ropa" | "letrero";

export function CasaExtras({ alCambiar, alOfrecer, partes }: { alCambiar?: (m: MercadoEstado) => void; alOfrecer?: (r: Ofrecido) => void; partes?: ParteCasa[] }) {
  const { m, recibido, error, busy, hacer, recargar } = useMercado(alCambiar);
  /** ¿Se muestra esta parte? (sin `partes`, todas) */
  const ver = (p: ParteCasa) => !partes || partes.includes(p);
  const [cuantas, setCuantas] = useState(1);
  const [ofreciendo, setOfreciendo] = useState(false);
  const [avisoHorno, setAvisoHorno] = useState<string | null>(null);
  const [semilla, setSemilla] = useState<"trigo" | "cebada" | "olivo">("trigo");
  const [ahora, setAhora] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setAhora(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  if (!m) return error ? <p className="rounded-xl bg-red-50 p-2.5 text-xs text-red-900 dark:bg-red-950/30 dark:text-red-200">{error}</p> : null;
  const adornosTengo = m.armario.filter((id) => articulo(id)?.categoria === "adorno");
  const mantos = m.armario.filter((id) => id.startsWith("manto-"));
  const fajas = m.armario.filter((id) => id.startsWith("faja-"));
  const semillasTengo = (["trigo", "cebada", "olivo"] as const).filter((s) => (m.semillas[s] || 0) > 0);
  return (
    <div className="space-y-3" data-testid="casa-extras">
      {error && <p className="rounded-xl bg-red-50 p-2 text-xs text-red-900 dark:bg-red-950/30 dark:text-red-200">{error}</p>}
      {ver("huerto") && (
      <section className="space-y-2 rounded-xl border border-emerald-200 p-3 dark:border-emerald-900/60" data-testid="casa-huerto">
        <p className="flex items-baseline justify-between font-black">
          <span>Tu huerto</span>
          <span className="text-xs font-semibold text-stone-500">✨ {m.gozo} de gozo</span>
        </p>
        <p className="text-[11px] text-stone-500">Siembra, riega una vez (crece 25 % más rápido y da uno más) y cosecha al alfolí: para ofrecerlo en el templo o venderlo.</p>
        {semillasTengo.length > 0 && (
          <div className="flex flex-wrap items-center gap-1 text-xs">
            Semilla:
            {semillasTengo.map((s) => (
              <button key={s} type="button" onClick={() => setSemilla(s)} className={`rounded-full px-2 py-0.5 font-bold ${semilla === s ? "bg-emerald-500 text-white" : "bg-stone-100 dark:bg-stone-800"}`}>
                {articulo(s)?.icono} {s} ({m.semillas[s]})
              </button>
            ))}
          </div>
        )}
        <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
          {m.huerto.map((p, i) => {
            // el tiempo sigue corriendo en la pantalla desde que llegó el estado
            const f = p.semilla ? Math.max(0, p.faltan - Math.floor((ahora - recibido) / 1000)) : 0;
            const listo = !!p.semilla && (p.listo || f === 0);
            return (
              <div key={i} className="rounded-lg border border-stone-200 p-2 text-center text-xs dark:border-stone-700" data-testid={`parcela-${i}`}>
                <p className="text-xl">{p.semilla ? (listo ? articulo(p.semilla)?.icono : "🌱") : "🟫"}</p>
                <p className="font-semibold">{p.semilla ? (listo ? "¡Lista!" : `${tiempo(f)}${p.regado ? " · regada" : ""}`) : "Vacía"}</p>
                {!p.semilla ? (
                  <Button size="sm" className="mt-1 h-7 w-full" disabled={busy || !semillasTengo.includes(semilla)} onClick={() => void hacer("/casa/huerto/sembrar", { parcela: i, semilla })} data-testid={`sembrar-${i}`}>
                    Sembrar
                  </Button>
                ) : listo ? (
                  <Button
                    size="sm"
                    className="mt-1 h-7 w-full bg-emerald-600 hover:bg-emerald-500"
                    disabled={busy}
                    onClick={() => void hacer("/casa/huerto/cosechar", { parcela: i }, (d) => d.cosecha && gameStore.toast(`Cosechaste ${d.cosecha.cuanto} de ${NOMBRE_BIEN[d.cosecha.bien]}: está en el alfolí`, "gold"))}
                    data-testid={`cosechar-${i}`}
                  >
                    Cosechar
                  </Button>
                ) : (
                  <Button size="sm" variant="secondary" className="mt-1 h-7 w-full" disabled={busy || p.regado} onClick={() => void hacer("/casa/huerto/regar", { parcela: i })} data-testid={`regar-${i}`}>
                    {p.regado ? "Regada" : "Regar"}
                  </Button>
                )}
              </div>
            );
          })}
        </div>
        {!semillasTengo.length && <p className="text-[11px] text-stone-500">Compra semillas en el mercado de la plaza (trigo y cebada dan flor de harina; el olivo, aceite).</p>}
        <p className="text-[10px] text-stone-400">Trigo {SEMILLAS.trigo.minutos} min · cebada {SEMILLAS.cebada.minutos} min · olivo {SEMILLAS.olivo.minutos} min.</p>
      </section>
      )}

      {ver("horno") && (
      <section className="space-y-2 rounded-xl border border-orange-200 p-3 dark:border-orange-900/60" data-testid="casa-horno">
        <p className="flex items-baseline justify-between font-black">
          <span>Tu horno · prepara tus ofrendas</span>
          <span className="text-xs font-semibold text-stone-500">
            🌾 {m.bienes.harina} · 🫒 {m.bienes.aceite}
          </span>
        </p>
        <p className="text-[11px] text-stone-500">Con lo del alfolí prepara ofrendas que valen más honra que los bienes sueltos. Tardan en el horno: vuelve a sacarlas.</p>
        {avisoHorno && <p className="rounded-lg bg-amber-50 px-2 py-1 text-xs text-amber-900 dark:bg-amber-950/40 dark:text-amber-200" data-testid="horno-aviso">{avisoHorno}</p>}
        {m.horno ? (
          (() => {
            const r = RECETAS[m.horno.receta];
            const f = Math.max(0, m.horno.faltan - Math.floor((ahora - recibido) / 1000));
            return (
              <div className="flex items-center gap-2 rounded-lg bg-orange-50/70 p-2 dark:bg-orange-950/20" data-testid="horno-ocupado">
                <span className="text-2xl">{r.icono}</span>
                <span className="min-w-0 flex-1 text-xs">
                  <b>
                    {m.horno.cantidad} × {r.nombre}
                  </b>
                  <br />
                  {f > 0 ? `En el horno: ${tiempo(f)}` : "¡Listas! Sácalas del horno."}
                </span>
                <Button
                  size="sm"
                  disabled={busy || f > 0}
                  onClick={() => void hacer("/casa/preparar/sacar", {}, () => gameStore.toast(`Sacaste del horno: ${m.horno!.cantidad} × ${r.nombre.toLowerCase()}`, "gold"))}
                  data-testid="horno-sacar"
                >
                  Sacar
                </Button>
              </div>
            );
          })()
        ) : (
          <div className="space-y-1.5">
            <div className="flex items-center gap-1 text-xs">
              Cuántas:
              {Array.from({ length: HORNO_MAX }, (_, i) => i + 1).map((n) => (
                <button key={n} type="button" onClick={() => setCuantas(n)} className={`h-7 w-7 rounded-full font-bold ${cuantas === n ? "bg-orange-500 text-white" : "bg-stone-100 dark:bg-stone-800"}`} data-testid={`horno-cuantas-${n}`}>
                  {n}
                </button>
              ))}
            </div>
            {(Object.keys(RECETAS) as RecetaId[]).map((id) => {
              const r = RECETAS[id];
              const pide = Object.entries(r.pide) as ["harina" | "aceite" | "corderos", number][];
              const alcanza = pide.every(([b, n]) => m.bienes[b] >= n * cuantas);
              return (
                <div key={id} className="flex items-center gap-2 rounded-lg border border-stone-200 p-2 dark:border-stone-700">
                  <span className="text-2xl">{r.icono}</span>
                  <span className="min-w-0 flex-1 text-xs">
                    <b>{r.nombre}</b> · {r.minutos} min
                    <br />
                    Pide {pide.map(([b, n]) => `${n * cuantas} de ${NOMBRE_BIEN[b]}`).join(" y ")} · da {r.honra * cuantas} de honra
                  </span>
                  <Button size="sm" disabled={busy || !alcanza} onClick={() => void hacer("/casa/preparar", { receta: id, cantidad: cuantas }, () => gameStore.toast(`Al horno: ${cuantas} × ${r.nombre.toLowerCase()}`, "gold"))} data-testid={`horno-preparar-${id}`}>
                    Preparar
                  </Button>
                </div>
              );
            })}
          </div>
        )}
        <div className="flex items-center gap-2 text-xs">
          <span className="min-w-0 flex-1">
            Preparadas: {RECETAS.tortas.icono} {m.preparadas.tortas} · {RECETAS.aceitePuro.icono} {m.preparadas.aceitePuro}
          </span>
          <Button
            size="sm"
            className="bg-amber-500 font-bold text-amber-950 hover:bg-amber-400"
            disabled={busy || ofreciendo || m.preparadas.tortas + m.preparadas.aceitePuro === 0}
            onClick={async () => {
              setOfreciendo(true);
              setAvisoHorno(null);
              try {
                const res = await fetch("/api/jerusalen/ciudad/casa/ofrendar", {
                  method: "POST",
                  credentials: "include",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ preparadas: m.preparadas }),
                });
                const d = (await res.json().catch(() => null)) as (Ofrecido & { message?: string }) | null;
                if (res.ok && d) {
                  alOfrecer?.(d);
                  setAvisoHorno(`Llevaste tus ofrendas preparadas al templo: +${d.ganado} de honra para tu casa.${d.subio !== null ? " ¡Tu casa creció!" : ""}`);
                  await recargar();
                } else setAvisoHorno(d?.message || "No se pudo llevar. Intenta de nuevo.");
              } catch {
                setAvisoHorno("No se pudo llevar. Revisa tu conexión.");
              } finally {
                setOfreciendo(false);
              }
            }}
            data-testid="horno-ofrecer"
          >
            Llevar al templo
          </Button>
        </div>
        <p className="text-[10px] italic text-stone-400">
          «{RECETAS.tortas.verso.text}» ({RECETAS.tortas.verso.ref})
        </p>
      </section>
      )}

      {ver("adornos") && (
      <section className="space-y-2 rounded-xl border border-amber-200 p-3 dark:border-amber-900/60" data-testid="casa-adornos">
        <p className="flex items-baseline justify-between font-black">
          <span>Adornos de tu casa</span>
          <span className="text-xs font-semibold text-stone-500">
            {m.adornos.length} de {m.lugares}
          </span>
        </p>
        {adornosTengo.length ? (
          <div className="flex flex-wrap gap-1.5">
            {adornosTengo.map((id) => {
              const puesto = m.adornos.includes(id);
              return (
                <button
                  key={id}
                  type="button"
                  disabled={busy || (!puesto && m.adornos.length >= m.lugares)}
                  onClick={() => void hacer("/casa/adornos", { adornos: puesto ? m.adornos.filter((x) => x !== id) : [...m.adornos, id] })}
                  className={`rounded-full px-2.5 py-1 text-xs font-bold ${puesto ? "bg-amber-400 text-amber-950" : "bg-stone-100 dark:bg-stone-800"} disabled:opacity-40`}
                  data-testid={`adorno-${id}`}
                >
                  {articulo(id)?.icono} {articulo(id)?.nombre} {puesto ? "✓" : ""}
                </button>
              );
            })}
          </div>
        ) : (
          <p className="text-[11px] text-stone-500">Compra adornos en el mercado: macetas, cántaros, bancos, lámparas, toldos, una parra, una higuera o una palmera. Tus vecinos los verán.</p>
        )}
      </section>
      )}

      {ver("ropa") && (
      <section className="space-y-2 rounded-xl border border-sky-200 p-3 dark:border-sky-900/60" data-testid="casa-ropa">
        <p className="font-black">Tu ropa</p>
        {mantos.length + fajas.length ? (
          <div className="space-y-1.5 text-xs">
            <div className="flex flex-wrap items-center gap-1">
              Manto:
              {[null, ...mantos].map((id) => (
                <button key={id ?? "sin"} type="button" disabled={busy} onClick={() => void hacer("/casa/ropa", { manto: id, faja: m.ropa.faja })} className={`rounded-full px-2 py-0.5 font-bold ${m.ropa.manto === id ? "bg-sky-500 text-white" : "bg-stone-100 dark:bg-stone-800"}`} data-testid={`ropa-${id ?? "sin-manto"}`}>
                  {id ? articulo(id)?.nombre : "Sin manto"}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-1">
              Faja:
              {[null, ...fajas].map((id) => (
                <button key={id ?? "sin"} type="button" disabled={busy} onClick={() => void hacer("/casa/ropa", { manto: m.ropa.manto, faja: id })} className={`rounded-full px-2 py-0.5 font-bold ${m.ropa.faja === id ? "bg-sky-500 text-white" : "bg-stone-100 dark:bg-stone-800"}`} data-testid={`ropa-${id ?? "sin-faja"}`}>
                  {id ? articulo(id)?.nombre : "Sin faja"}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-stone-400">Tus vecinos ven tu ropa en la ciudad. En el templo se sirve con las vestiduras sagradas (Éxodo 28:2).</p>
          </div>
        ) : (
          <p className="text-[11px] text-stone-500">Compra un manto o una faja en el mercado: tus vecinos los verán.</p>
        )}
      </section>
      )}

      {ver("letrero") && (
      <section className="space-y-2 rounded-xl border border-stone-200 p-3 dark:border-stone-700" data-testid="casa-letrero">
        <p className="font-black">El nombre de tu casa</p>
        {m.tieneLetrero ? (
          <div className="flex flex-wrap gap-1">
            {LETREROS.map((n) => (
              <button key={n} type="button" disabled={busy} onClick={() => void hacer("/casa/letrero", { nombre: n })} className={`rounded-full px-2 py-0.5 text-xs font-bold ${m.letrero === n ? "bg-amber-400 text-amber-950" : "bg-stone-100 dark:bg-stone-800"}`} data-testid={`letrero-${n}`}>
                {n}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-[11px] text-stone-500">Compra el letrero en el mercado y ponle nombre a tu casa: lo verán tus vecinos.</p>
        )}
      </section>
      )}
    </div>
  );
}
