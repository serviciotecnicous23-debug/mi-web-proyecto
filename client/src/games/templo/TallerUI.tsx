/**
 * El taller en la pantalla (shared/taller.ts, server/taller.ts y server/intercambio.ts):
 * - El artesano (en el mercado): con 4 iguales hace la pieza fina, dorada. Sin nada al azar.
 * - Los oficios (en Tu casa): el redil, donde los corderos se quedan como ovejas y dan lana, y el telar, que la teje.
 * - El intercambio (en el mercado): los puestos de cosas entre vecinos. Lo de temporada, fuera de su tiempo, solo se
 *   consigue aquí.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2, Minus, Plus, Scissors, Store, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { articulo, type Articulo } from "@shared/mercado";
import { DIEZMO, diezmoDe } from "@shared/economia";
import {
  COSAS_POR_PUESTO, FARDO_MAX, IGUALES, LANA, LANA_HORAS, LANA_POR_PUESTO, PARA_EL_ARTESANO, PUESTOS_COSAS_MAX, RECETAS_TELAR, TELAR,
  VERSO_ARTESANO, VERSO_INTERCAMBIO, VERSO_REDIL, VERSO_TELAR, VERSO_TIEMPO, estudiosDeFina, finaDe, horasDeFina, iconoDeCosa, jornalDeFina,
  nombreDeCosa, porQueNoFina, type CosasEstado, type RecetaTelarId, type TallerEstado,
} from "@shared/taller";
import { MAX_POR_MUEBLE } from "@shared/casa-interior";
import { gameStore } from "./store";
import { VerseBox } from "./ui";
import { Gozo, Ico } from "./iconos";

type Resp<T> = { ok: boolean; data: (T & { message?: string }) | null };
async function pedir<T>(path: string, body?: unknown): Promise<Resp<T>> {
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

function falta(s: number): string {
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), x = s % 60;
  if (h) return `${h} h ${m} min`;
  if (m) return `${m} min ${x} s`;
  return `${x} s`;
}
const horasTexto = (h: number) => (h === 1 ? "1 hora" : `${h} horas`);
const minuscula = (t: string) => t.charAt(0).toLowerCase() + t.slice(1);
const Err = ({ e }: { e: string | null }) => (e ? <p className="rounded-lg bg-rose-50 p-2 text-xs text-rose-800 dark:bg-rose-950/40 dark:text-rose-200" data-testid="taller-error">{e}</p> : null);

type TallerResp = TallerEstado & { empezada?: string; jornal?: number; sacados?: number; llevadas?: number; trasquilado?: number; tejiendo?: RecetaTelarId };

/** El estado del taller, con su reloj (al terminar algo se pide otra vez: el servidor lo entrega). */
function useTaller(alCambiar?: (t: TallerEstado) => void) {
  const [t, setT] = useState<TallerEstado | null>(null);
  const [recibido, setRecibido] = useState(() => Date.now());
  const [ahora, setAhora] = useState(() => Date.now());
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const aviso = useRef(alCambiar);
  aviso.current = alCambiar;
  const recibir = useCallback((d: TallerEstado) => {
    setT(d);
    setRecibido(Date.now());
    aviso.current?.(d);
    if (d.terminada) gameStore.toast(`✨ ¡El artesano terminó tu pieza fina: ${minuscula(articulo(d.terminada)?.nombre ?? "")}!`, "gold");
    if (d.tejido) gameStore.toast(`🧶 El telar terminó: ${minuscula(TELAR[d.tejido].nombre)}.`, "gold");
  }, []);
  const cargar = useCallback(async () => {
    const r = await pedir<TallerEstado>("/taller");
    if (r.ok && r.data) recibir(r.data);
    else setError(r.data?.message || "No se pudo abrir el taller. Revisa tu conexión.");
  }, [recibir]);
  useEffect(() => {
    void cargar();
  }, [cargar]);
  const pasado = Math.floor((ahora - recibido) / 1000);
  const faltaArtesano = t?.artesano ? Math.max(0, t.artesano.faltan - pasado) : 0;
  const faltaTelar = t?.telar ? Math.max(0, t.telar.faltan - pasado) : 0;
  const faltaLana = t?.redil.proxima ? Math.max(0, t.redil.proxima - pasado) : null;
  const corre = !!t?.artesano || !!t?.telar || faltaLana !== null;
  useEffect(() => {
    if (!corre) return;
    const x = setInterval(() => setAhora(Date.now()), 1000);
    return () => clearInterval(x);
  }, [corre]);
  const pedido = useRef(false);
  useEffect(() => {
    const listo = (t?.artesano && faltaArtesano === 0) || (t?.telar && faltaTelar === 0) || faltaLana === 0;
    if (listo && !pedido.current) {
      pedido.current = true;
      void cargar().finally(() => {
        // una vez por cosa que termina (si el servidor tarda, no se pide en cada segundo)
        setTimeout(() => (pedido.current = false), 4000);
      });
    }
  }, [t, faltaArtesano, faltaTelar, faltaLana, cargar]);
  const hacer = async (path: string, body: unknown, ok?: (d: TallerResp) => void) => {
    setBusy(true);
    setError(null);
    const r = await pedir<TallerResp>(path, body);
    setBusy(false);
    if (r.ok && r.data) {
      recibir(r.data);
      ok?.(r.data);
    } else setError(r.data?.message || "No se pudo. Intenta de nuevo.");
  };
  return { t, error, busy, hacer, faltaArtesano, faltaTelar, faltaLana };
}

function Barra({ hecho, total, color = "from-amber-400 to-amber-600" }: { hecho: number; total: number; color?: string }) {
  return (
    <div className="h-2.5 overflow-hidden rounded-full bg-amber-100 dark:bg-amber-950/50">
      <div className={`h-full rounded-full bg-gradient-to-r ${color} transition-[width] duration-1000`} style={{ width: `${Math.max(0, Math.min(100, Math.round((hecho / Math.max(1, total)) * 100)))}%` }} />
    </div>
  );
}

// ---------------------------------------------------------------- el artesano
/** El artesano del mercado: con 4 iguales hace la pieza fina. */
export function ArtesanoView({ alCambiarGozo }: { alCambiarGozo?: (gozo: number) => void }) {
  const { t, error, busy, hacer, faltaArtesano } = useTaller(useCallback((d: TallerEstado) => alCambiarGozo?.(d.gozo), [alCambiarGozo]));
  if (!t) return error ? <Err e={error} /> : <Loader2 className="mx-auto h-5 w-5 animate-spin" />;
  const enCurso = t.artesano ? articulo(t.artesano.pieza) : null;
  const tengoDe = (a: Articulo) => (a.categoria === "mueble" ? t.muebles[a.id] || 0 : t.fardo[a.id] || 0);
  const cabe = (fina: Articulo) =>
    fina.categoria === "mueble" ? (t.muebles[fina.id] || 0) < MAX_POR_MUEBLE : !t.armario.includes(fina.id) || (t.fardo[fina.id] || 0) < FARDO_MAX;
  const mias = PARA_EL_ARTESANO.filter((a) => tengoDe(a) > 0).sort((a, b) => tengoDe(b) - tengoDe(a) || a.precio - b.precio);
  // las piezas finas que ya tiene (para mostrarlas)
  const finas = [
    ...Object.entries(t.muebles).filter(([id, n]) => n > 0 && articulo(id)?.fina),
    ...t.armario.filter((id) => articulo(id)?.fina).map((id) => [id, 1 + (t.fardo[id] || 0)] as [string, number]),
  ];
  return (
    <div className="space-y-3" data-testid="taller-artesano">
      <p className="rounded-xl bg-amber-50/70 p-2.5 text-[13px] dark:bg-amber-950/20">
        <b>🛠️ El artesano:</b> «Tráeme {IGUALES} iguales y te hago una fina, dorada. Nada al azar: lo que ves es lo que te hago».
      </p>
      <VerseBox text={VERSO_ARTESANO.text} refName={VERSO_ARTESANO.ref} />
      {enCurso && t.artesano && (
        <div className="space-y-1.5 rounded-xl border border-amber-300 bg-amber-50/70 p-3 dark:border-amber-800 dark:bg-amber-950/20" data-testid="artesano-en-curso">
          <p className="font-black">
            <Ico e="✨" /> Haciendo: <Ico e={enCurso.icono ?? ""} /> {enCurso.nombre}
          </p>
          <Barra hecho={t.artesano.total - faltaArtesano} total={t.artesano.total} />
          <p className="text-xs">{faltaArtesano > 0 ? `Falta ${falta(faltaArtesano)}. El artesano trabaja aunque no estés.` : "¡Lista! Trayéndola…"}</p>
        </div>
      )}
      <p className="flex flex-wrap gap-x-3 gap-y-1 rounded-lg bg-stone-100 px-3 py-2 text-xs font-semibold dark:bg-stone-800">
        <span>Tienes: <Gozo n={t.gozo} /> de gozo</span>
        <span><Ico e="📚" /> {t.estudios} {t.estudios === 1 ? "estudio aprobado" : "estudios aprobados"}</span>
      </p>
      <Err e={error} />
      {mias.length ? (
        <ul className="space-y-1.5">
          {mias.map((a) => {
            const fina = finaDe(a.id)!;
            const tengo = tengoDe(a);
            const motivo = porQueNoFina(a, { tengo, estudios: t.estudios, ocupado: !!t.artesano, gozo: t.gozo, cabe: cabe(fina) });
            const puestos = a.categoria === "mueble" ? t.puestos[a.id] || 0 : 0;
            return (
              <li key={a.id} className="rounded-xl border border-stone-200 p-2.5 dark:border-stone-700" data-testid={`artesano-${a.id}`}>
                <div className="flex items-start gap-2">
                  <span className="text-2xl leading-none"><Ico e={a.icono ?? ""} /></span>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold">
                      {a.nombre}{" "}
                      <span className={`ml-1 rounded-full px-2 py-0.5 text-[11px] ${tengo >= IGUALES ? "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-200" : "bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300"}`}>
                        {Math.min(tengo, IGUALES)} de {IGUALES}
                      </span>
                    </p>
                    <p className="text-[11px] text-stone-500">
                      {a.categoria === "ropa" ? `En tu fardo: ${tengo}.` : `Tienes ${tengo}${puestos ? ` (${puestos} ${puestos === 1 ? "puesto" : "puestos"} en tu casa: si faltan, el artesano los saca y pone la fina en su lugar)` : ""}.`}
                    </p>
                    <p className="mt-0.5 text-xs font-semibold text-amber-800 dark:text-amber-300">
                      → {fina.nombre}
                      {fina.color && <span className="ml-1.5 inline-block h-3 w-3 rounded-full align-middle ring-2 ring-amber-400" style={{ background: fina.color }} />}
                    </p>
                    <p className="text-[11px] text-stone-500">
                      Jornal <Gozo n={jornalDeFina(a)} /> · ⏳ {horasTexto(horasDeFina(a))} · 📚 pide {estudiosDeFina(a)} {estudiosDeFina(a) === 1 ? "estudio" : "estudios"}
                      {a.categoria === "mueble" ? " · en tu casa suma +6 a las estrellas" : " · lleva su orla de oro: se ve en la ciudad"}
                    </p>
                  </div>
                </div>
                {motivo ? (
                  <p className="mt-1.5 text-xs text-stone-500">🔒 {motivo}</p>
                ) : (
                  <Button
                    size="sm"
                    className="mt-1.5 rounded-full bg-amber-500 font-bold text-amber-950 hover:bg-amber-400"
                    disabled={busy}
                    onClick={() =>
                      void hacer("/taller/artesano", { pieza: a.id }, (d) =>
                        gameStore.toast(`🛠️ El artesano empezó: ${minuscula(fina.nombre)}. Estará en ${horasTexto(horasDeFina(a))}.${d.sacados ? ` Sacó ${d.sacados} de tu casa: la fina irá a su lugar.` : ""}`, "gold"),
                      )
                    }
                    data-testid={`artesano-hacer-${a.id}`}
                  >
                    Llevar {IGUALES} al artesano · <Gozo n={jornalDeFina(a)} />
                  </Button>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="rounded-xl bg-stone-50 p-2.5 text-xs text-stone-600 dark:bg-stone-800/60 dark:text-stone-300" data-testid="artesano-nada">
          Junta {IGUALES} iguales: muebles en «Muebles», o copias de ropa para tu fardo en «Ropa» (botón 🎒). El telar de tu casa también teje cojines, mantos y alfombras.
        </p>
      )}
      {finas.length > 0 && (
        <section className="space-y-1" data-testid="artesano-mis-finas">
          <p className="font-black">Tus piezas finas</p>
          <p className="flex flex-wrap gap-1.5">
            {finas.map(([id, n]) => (
              <span key={id} className="rounded-full bg-gradient-to-r from-amber-200 to-yellow-100 px-2.5 py-1 text-xs font-bold text-amber-950 ring-1 ring-amber-400">
                {articulo(id)?.icono} {articulo(id)?.nombre}
                {n > 1 ? ` ×${n}` : ""}
              </span>
            ))}
          </p>
          <p className="text-[11px] text-stone-500">Los muebles finos se ponen en tu casa desde el arcón; la ropa fina, en «Tu casa → Adornos y ropa». También se pueden vender en «Intercambio».</p>
        </section>
      )}
      <p className="text-[11px] text-stone-500">El 10 % del jornal va al tesoro del templo, que ayuda a los que recién llegan.</p>
    </div>
  );
}

// ---------------------------------------------------------------- los oficios de la casa
/** El redil y el telar (en Tu casa). `alCambiar`: para que la ciudad dibuje las ovejas. */
export function OficiosView({ alCambiar, alIrAlMercado }: { alCambiar?: (t: TallerEstado) => void; alIrAlMercado?: () => void }) {
  const { t, error, busy, hacer, faltaTelar, faltaLana } = useTaller(alCambiar);
  const [llevar, setLlevar] = useState(1);
  if (!t) return error ? <Err e={error} /> : <Loader2 className="mx-auto h-5 w-5 animate-spin" />;
  const caben = Math.max(0, t.redil.max - t.redil.ovejas);
  const n = Math.max(1, Math.min(llevar, caben, Math.max(1, t.corderos)));
  const tejiendo = t.telar ? TELAR[t.telar.receta] : null;
  return (
    <div className="space-y-3" data-testid="oficios-casa">
      <Err e={error} />
      <section className="space-y-2 rounded-xl border border-stone-200 p-3 dark:border-stone-700" data-testid="oficios-redil">
        <p className="flex items-baseline justify-between gap-2 font-black">
          <span><Ico e="🐑" /> Tu redil</span>
          <span className="text-xs font-semibold text-stone-500">
            {t.redil.ovejas} de {t.redil.max} ovejas
          </span>
        </p>
        <p className="text-lg leading-none" aria-hidden>
          {"🐑".repeat(t.redil.ovejas)}
          <span className="opacity-25">{"🐑".repeat(caben)}</span>
        </p>
        <p className="text-xs text-stone-600 dark:text-stone-300">
          Los corderos que traen tus siervos se pueden quedar en tu redil como ovejas: cada una da 1 de lana cada {LANA_HORAS} horas (junta hasta 3). Tus vecinos ven tus ovejas junto a tu casa.
        </p>
        {t.redil.ovejas > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm" disabled={busy || t.redil.lista < 1} onClick={() => void hacer("/taller/trasquilar", {}, (d) => gameStore.toast(`✂️ Trasquilaste tus ovejas: +${d.trasquilado ?? 0} de lana`, "gold"))} data-testid="oficios-trasquilar">
              <Scissors className="mr-1 h-4 w-4" /> Trasquilar ({t.redil.lista} de {t.redil.tope})
            </Button>
            <span className="text-[11px] text-stone-500">{faltaLana !== null ? `Más lana en ${falta(faltaLana)}.` : "Tienen toda la lana que pueden juntar: trasquílalas."}</span>
          </div>
        )}
        {caben > 0 ? (
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span>En tu alfolí: {t.corderos} corderos.</span>
            {t.corderos > 0 && (
              <>
                <span className="flex items-center gap-1">
                  <button type="button" className="rounded-full bg-stone-100 p-1 dark:bg-stone-800" onClick={() => setLlevar(Math.max(1, n - 1))} aria-label="Menos">
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <b className="w-6 text-center tabular-nums">{n}</b>
                  <button type="button" className="rounded-full bg-stone-100 p-1 dark:bg-stone-800" onClick={() => setLlevar(Math.min(caben, t.corderos, n + 1))} aria-label="Más">
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </span>
                <Button size="sm" variant="secondary" disabled={busy} onClick={() => void hacer("/taller/redil", { corderos: n }, () => gameStore.toast(`🐑 ${n === 1 ? "Un cordero se quedó" : `${n} corderos se quedaron`} en tu redil`, "gold"))} data-testid="oficios-llevar">
                  Llevar al redil
                </Button>
              </>
            )}
            {t.corderos < 1 && <span className="text-stone-500">Pon a un siervo a cuidar el rebaño para tener corderos.</span>}
          </div>
        ) : (
          <p className="text-[11px] text-stone-500">Tu redil está completo{t.nivel < 3 ? ": con una casa mayor caben más ovejas." : "."}</p>
        )}
        <VerseBox text={VERSO_REDIL.text} refName={VERSO_REDIL.ref} />
      </section>

      <section className="space-y-2 rounded-xl border border-stone-200 p-3 dark:border-stone-700" data-testid="oficios-telar">
        <p className="flex items-baseline justify-between gap-2 font-black">
          <span>🧶 El telar de tu casa</span>
          <span className="text-xs font-semibold text-stone-500" data-testid="oficios-lana">
            Lana: {t.lana} de {t.lanaMax}
          </span>
        </p>
        {!t.tieneTelar ? (
          <div className="space-y-1.5 text-xs">
            <p>Para tejer, pon el telar de la casa dentro de tu casa. Se compra en el mercado, en «Muebles».</p>
            {alIrAlMercado && (
              <Button size="sm" variant="secondary" onClick={alIrAlMercado} data-testid="oficios-ir-mercado">
                Ir al mercado
              </Button>
            )}
          </div>
        ) : (
          <>
            {tejiendo && t.telar && (
              <div className="space-y-1" data-testid="telar-en-curso">
                <p className="text-xs font-bold">
                  Tejiendo: <Ico e={tejiendo.icono ?? ""} /> {tejiendo.nombre}
                </p>
                <Barra hecho={t.telar.total - faltaTelar} total={t.telar.total} color="from-rose-300 to-rose-500" />
                <p className="text-[11px] text-stone-500">{faltaTelar > 0 ? `Falta ${falta(faltaTelar)}.` : "¡Listo! Trayéndolo…"}</p>
              </div>
            )}
            <ul className="space-y-1">
              {RECETAS_TELAR.map((id) => {
                const r = TELAR[id];
                const a = articulo(r.da);
                return (
                  <li key={id} className="flex items-center gap-2 rounded-lg bg-stone-50 p-2 text-xs dark:bg-stone-800/60" data-testid={`telar-${id}`}>
                    <span className="text-xl"><Ico e={r.icono ?? ""} /></span>
                    <span className="min-w-0 flex-1">
                      <b>{r.nombre}</b>
                      <span className="block text-[11px] text-stone-500">
                        🧶 {r.lana} de lana · ⏳ {r.minutos < 60 ? `${r.minutos} min` : horasTexto(r.minutos / 60)}
                        {a ? ` · en el mercado vale ✨ ${a.precio}` : ""}
                      </span>
                    </span>
                    <Button size="sm" disabled={busy || !!t.telar || t.lana < r.lana} onClick={() => void hacer("/taller/telar", { receta: id }, () => gameStore.toast(`🧶 El telar empezó: ${minuscula(r.nombre)}`, "gold"))} data-testid={`telar-tejer-${id}`}>
                      Tejer
                    </Button>
                  </li>
                );
              })}
            </ul>
          </>
        )}
        <p className="text-[11px] text-stone-500">Lo tejido va a tu arcón o a tu armario. Junta {IGUALES} iguales y llévaselos al artesano del mercado, o vende la lana y lo tejido a tus vecinos en «Intercambio».</p>
        <VerseBox text={VERSO_TELAR.text} refName={VERSO_TELAR.ref} />
      </section>
    </div>
  );
}

// ---------------------------------------------------------------- el intercambio
/** Los puestos de cosas entre vecinos (en el mercado). */
export function IntercambioView({ alCambiarGozo }: { alCambiarGozo?: (gozo: number) => void }) {
  const [e, setE] = useState<CosasEstado | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [cosa, setCosa] = useState<string | null>(null);
  const [cantidad, setCantidad] = useState(1);
  const [precio, setPrecio] = useState(0);
  const aviso = useRef(alCambiarGozo);
  aviso.current = alCambiarGozo;
  const recibir = useCallback((d: CosasEstado) => {
    setE(d);
    aviso.current?.(d.gozo);
    for (const v of d.ventasNuevas) gameStore.toast(`Vendiste ${v.cantidad} × ${nombreDeCosa(v.cosa).toLowerCase()} en tu puesto: +${v.ganado} de gozo${v.diezmo ? ` (${v.diezmo} de diezmo al tesoro)` : ""}`, "gold");
  }, []);
  useEffect(() => {
    void pedir<CosasEstado>("/cosas").then((r) => {
      if (r.ok && r.data) recibir(r.data);
      else setError(r.data?.message || "No se pudieron ver los puestos.");
    });
  }, [recibir]);
  const hacer = async (path: string, body: unknown, ok?: (d: CosasEstado & { comprado?: { cosa: string; cantidad: number; total: number } }) => void) => {
    setBusy(true);
    setError(null);
    const r = await pedir<CosasEstado & { comprado?: { cosa: string; cantidad: number; total: number } }>(path, body);
    setBusy(false);
    if (r.ok && r.data) {
      recibir(r.data);
      ok?.(r.data);
    } else setError(r.data?.message || "No se pudo. Intenta de nuevo.");
  };
  if (!e) return error ? <Err e={error} /> : <Loader2 className="mx-auto h-5 w-5 animate-spin" />;
  const elegida = e.paraVender.find((p) => p.cosa === cosa) ?? null;
  const maxCant = elegida ? Math.max(1, Math.min(elegida.tengo, elegida.cosa === LANA ? LANA_POR_PUESTO : COSAS_POR_PUESTO)) : 1;
  const cant = Math.min(cantidad, maxCant);
  const p = elegida ? Math.max(elegida.min, Math.min(elegida.max, precio || elegida.min)) : 0;
  const total = cant * p;
  const elegir = (c: string) => {
    const x = e.paraVender.find((y) => y.cosa === c);
    setCosa(c);
    setCantidad(1);
    if (x) setPrecio(Math.round((x.min + x.max) / 2));
  };
  return (
    <div className="space-y-3" data-testid="mercado-intercambio">
      <Err e={error} />
      <p className="text-xs text-stone-500">
        Aquí los vecinos se venden cosas: lana, ropa del fardo, muebles guardados y piezas finas del artesano. Lo que se vende siempre no pasa de su precio del mercado; la ropa de temporada, fuera de su tiempo, <b>solo se consigue aquí</b>. Del total, el {Math.round(DIEZMO * 100)} % es el diezmo para el tesoro del templo.
      </p>
      <VerseBox text={VERSO_TIEMPO.text} refName={VERSO_TIEMPO.ref} />

      <section className="space-y-1.5" data-testid="cosas-abiertas">
        <p className="font-black">Comprar a tus vecinos</p>
        {e.abiertos.length ? (
          e.abiertos.map((x) => {
            const puedo = Math.min(x.cantidad, e.caben[x.cosa] ?? 0, Math.floor(e.gozo / Math.max(1, x.precio)));
            const a = articulo(x.cosa);
            return (
              <div key={x.id} className={`flex items-center gap-2 rounded-xl border p-2 text-xs ${a?.fina ? "border-amber-400 bg-amber-50/60 dark:border-amber-700 dark:bg-amber-950/20" : "border-stone-200 dark:border-stone-700"}`} data-testid={`cosa-${x.id}`}>
                <span className="text-xl">{iconoDeCosa(x.cosa)}</span>
                <span className="min-w-0 flex-1">
                  <b>
                    {x.cantidad} × {nombreDeCosa(x.cosa)}
                  </b>{" "}
                  a <Gozo n={x.precio} /> c/u
                  {x.fueraDeTiempo && <span className="ml-1 rounded-full bg-violet-100 px-1.5 py-0.5 text-[10px] font-bold text-violet-900 dark:bg-violet-900/40 dark:text-violet-200">fuera de su tiempo</span>}
                  {a?.fina && <span className="ml-1 rounded-full bg-amber-200 px-1.5 py-0.5 text-[10px] font-bold text-amber-950">pieza fina</span>}
                  <span className="block text-[11px] text-stone-500">
                    De {x.vendedor} · cierra en {falta(x.quedan)}
                    {(e.caben[x.cosa] ?? 0) < 1 ? " · ya no te cabe" : ""}
                  </span>
                </span>
                <Button size="sm" variant="secondary" className="h-7 px-2" disabled={busy || puedo < 1} onClick={() => void hacer(`/cosas/${x.id}/comprar`, { cantidad: 1 }, (d) => d.comprado && gameStore.toast(`Compraste: ${nombreDeCosa(d.comprado.cosa).toLowerCase()} por ✨ ${d.comprado.total}`, "gold"))} data-testid={`comprar-cosa-${x.id}`}>
                  1
                </Button>
                {puedo > 1 && (
                  <Button size="sm" className="h-7 px-2" disabled={busy} onClick={() => void hacer(`/cosas/${x.id}/comprar`, { cantidad: puedo }, (d) => d.comprado && gameStore.toast(`Compraste ${d.comprado.cantidad} × ${nombreDeCosa(d.comprado.cosa).toLowerCase()} por ✨ ${d.comprado.total}`, "gold"))}>
                    {puedo}
                  </Button>
                )}
              </div>
            );
          })
        ) : (
          <p className="rounded-xl bg-stone-50 p-2 text-[11px] text-stone-500 dark:bg-stone-800/60">Nadie está vendiendo cosas ahora. ¡Abre el primer puesto!</p>
        )}
      </section>

      {e.mios.length > 0 && (
        <section className="space-y-1.5" data-testid="cosas-mias">
          <p className="font-black">Tus puestos</p>
          {e.mios.map((x) => (
            <div key={x.id} className="flex items-center gap-2 rounded-xl bg-amber-50/70 p-2 text-xs dark:bg-amber-950/20">
              <span className="text-xl">{iconoDeCosa(x.cosa)}</span>
              <span className="min-w-0 flex-1">
                Quedan <b>{x.cantidad}</b> × {nombreDeCosa(x.cosa)} a <Gozo n={x.precio} /> c/u · cierra en {falta(x.quedan)}
              </span>
              <Button size="sm" variant="ghost" className="h-7 px-2" disabled={busy} onClick={() => void hacer(`/cosas/${x.id}/cerrar`, {})} title="Cerrar el puesto (lo que quede vuelve a ti)" data-testid={`cerrar-cosa-${x.id}`}>
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
        </section>
      )}

      <section className="space-y-2 rounded-xl border border-amber-200 p-3 dark:border-amber-900/60" data-testid="cosa-nueva">
        <p className="flex items-center gap-1.5 font-black">
          <Store className="h-4 w-4" /> Vender algo ({e.mios.length} de {PUESTOS_COSAS_MAX})
        </p>
        {e.paraVender.length ? (
          <div className="flex flex-wrap gap-1">
            {e.paraVender.map((x) => (
              <button key={x.cosa} type="button" aria-pressed={cosa === x.cosa} onClick={() => elegir(x.cosa)} className={`rounded-full px-2.5 py-1 text-xs font-bold ${cosa === x.cosa ? "bg-amber-400 text-amber-950" : "bg-stone-100 dark:bg-stone-800"}`} data-testid={`vender-cosa-${x.cosa}`}>
                {iconoDeCosa(x.cosa)} {nombreDeCosa(x.cosa)} ({x.tengo})
              </button>
            ))}
          </div>
        ) : (
          <p className="text-[11px] text-stone-500">No tienes nada para vender: la lana de tu redil, la ropa de tu fardo (o la que no llevas puesta), los muebles guardados y las piezas finas se venden aquí.</p>
        )}
        {elegida && (
          <>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <label className="space-y-1">
                <span className="block font-semibold">Cuántos</span>
                <span className="flex items-center gap-1">
                  <button type="button" className="rounded-full bg-stone-100 p-1 dark:bg-stone-800" onClick={() => setCantidad(Math.max(1, cant - 1))} aria-label="Menos">
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <b className="w-8 text-center tabular-nums" data-testid="cosa-cantidad">
                    {cant}
                  </b>
                  <button type="button" className="rounded-full bg-stone-100 p-1 dark:bg-stone-800" onClick={() => setCantidad(Math.min(maxCant, cant + 1))} aria-label="Más">
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </span>
              </label>
              <label className="space-y-1">
                <span className="block font-semibold">
                  Precio c/u (<Gozo n={elegida.min} /> a {elegida.max})
                </span>
                <span className="flex items-center gap-1">
                  <button type="button" className="rounded-full bg-stone-100 p-1 dark:bg-stone-800" onClick={() => setPrecio(Math.max(elegida.min, p - 1))} aria-label="Más barato">
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <b className="w-10 text-center tabular-nums" data-testid="cosa-precio">
                    {p}
                  </b>
                  <button type="button" className="rounded-full bg-stone-100 p-1 dark:bg-stone-800" onClick={() => setPrecio(Math.min(elegida.max, p + 1))} aria-label="Más caro">
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </span>
              </label>
            </div>
            <p className="text-[11px] text-stone-500">
              {elegida.fueraDeTiempo ? "Fuera de su tiempo vale más: hoy el mercado no la vende. " : ""}Si se vende todo: <Gozo n={total} /> − {diezmoDe(total)} de diezmo = <b><Gozo n={total - diezmoDe(total)} /></b> para ti. Si no se vende en 48 horas, vuelve a ti.
            </p>
            <Button className="w-full rounded-full bg-amber-500 font-bold text-amber-950 hover:bg-amber-400" disabled={busy || e.mios.length >= PUESTOS_COSAS_MAX} onClick={() => void hacer("/cosas", { cosa: elegida.cosa, cantidad: cant, precio: p }, () => { gameStore.toast(`Abriste tu puesto: ${cant} × ${nombreDeCosa(elegida.cosa).toLowerCase()} a ✨ ${p} c/u`, "gold"); setCosa(null); })} data-testid="cosa-abrir">
              {busy ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : <Store className="mr-1 h-4 w-4" />} Abrir el puesto
            </Button>
          </>
        )}
      </section>
      <VerseBox text={VERSO_INTERCAMBIO.text} refName={VERSO_INTERCAMBIO.ref} />
    </div>
  );
}
