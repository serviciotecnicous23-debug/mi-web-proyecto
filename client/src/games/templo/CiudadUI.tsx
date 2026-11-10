/**
 * La pantalla de la ciudad de Jerusalén en línea (etapa 2): el marcador y las ventanas de la casa,
 * del púlpito de la plaza (los anuncios de la ciudad), de los ancianos de la puerta, de los
 * edificios que se abren en la etapa 3 y de «Ir a…». El mundo 3D está en ciudad/mundo.ts.
 */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  CalendarDays, Check, ChevronRight, Crown, Home, Landmark, Loader2, MapPin, Maximize2, Minimize2, Pause, ScrollText, Store, Trophy, Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { gameStore, useGame, type EdificioId, type Modal } from "./store";
import { Card, VerseBox, fmt, hace } from "./ui";
import { fetchEstado } from "./online";
import type { CiudadWorld } from "./ciudad/mundo";
import { SEGUNDOS_DIA, fechaDe, proximaFiesta, relojEnLinea } from "@shared/calendario";
import { escalonNombre, type JerusalenEstado } from "@shared/jerusalen";
import { CONSEJOS_ANCIANOS, EDIFICIOS, NIVELES_CASA, VERSO_CASA, VERSO_HONRA, VERSO_PLAZA, VERSO_PULPITO, type CiudadEstado } from "@shared/ciudad";

/** La ciudad que corre y lo último que dijo el servidor de ella. */
export const CiudadCtx = createContext<{ city: CiudadWorld | null; estado: CiudadEstado | null }>({ city: null, estado: null });

function Boton({ label, onClick, children, testid, active, className = "flex" }: { label: string; onClick: () => void; children: React.ReactNode; testid?: string; active?: boolean; className?: string }) {
  const { city } = useContext(CiudadCtx);
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={() => {
        city?.audio.click();
        onClick();
      }}
      className={`${className} h-9 w-9 items-center justify-center rounded-full shadow-lg backdrop-blur active:scale-95 ${active ? "bg-amber-400 text-amber-950 ring-2 ring-white/70 hover:bg-amber-300" : "bg-black/50 text-white hover:bg-black/70"}`}
      data-testid={testid}
    >
      {children}
    </button>
  );
}

function Reloj({ hora, fecha, fase }: { hora: number; fecha: string; fase: string }) {
  const night = hora < 0.2 || hora > 0.8;
  const a = hora * Math.PI * 2 - Math.PI / 2;
  return (
    <div className="flex max-w-[11rem] items-center gap-1.5 rounded-full bg-black/45 py-0.5 pl-0.5 pr-2.5 text-[11px] font-semibold text-white backdrop-blur-sm sm:max-w-none" data-testid="ciudad-reloj">
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
        <circle cx="12" cy="12" r="11" fill={night ? "#1b2140" : "#7fb5e6"} />
        <path d="M1 12 A11 11 0 0 0 23 12 Z" fill={night ? "#0d1022" : "#d9c49a"} opacity="0.85" />
        <circle cx={12 + Math.cos(a + Math.PI) * 7} cy={12 + Math.sin(a + Math.PI) * 7} r="3" fill={night ? "#e8ecff" : "#ffd66b"} />
      </svg>
      <span className="min-w-0 truncate">
        {fecha} · {fase}
      </span>
    </div>
  );
}

/** El marcador de la ciudad: quién eres, dónde está tu casa, el día y la fiesta, y qué hay cerca. */
export function CiudadHudLayer({ paused, onPause, big, onFull }: { paused: boolean; onPause: () => void; big: boolean; onFull: () => void }) {
  const { ciudad: c, toasts, modal } = useGame();
  const [hint, setHint] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setHint(false), 14000);
    return () => clearTimeout(t);
  }, []);
  if (!c) return null;
  const open = (m: Modal) => gameStore.push(m);
  const lados = { paddingLeft: "calc(0.5rem + var(--tpl-sl, 0px))", paddingRight: "calc(0.5rem + var(--tpl-sr, 0px))" };
  const sombra = "[text-shadow:0_1px_2px_rgba(0,0,0,.85)]";
  return (
    <div className="pointer-events-none absolute inset-0 z-10 text-white" data-testid="ciudad-hud">
      <div
        className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 bg-gradient-to-b from-black/55 via-black/25 to-transparent pb-4"
        style={{ ...lados, paddingTop: "calc(0.5rem + var(--tpl-st, 0px))" }}
      >
        <div className="flex min-w-0 flex-col items-start gap-1.5">
          <div className="flex min-w-0 max-w-full flex-wrap items-center gap-1.5">
            <button
              type="button"
              className="pointer-events-auto flex min-w-0 max-w-full items-center gap-1 rounded-full bg-gradient-to-b from-amber-300 to-amber-500 py-1 pl-1.5 pr-3 text-xs font-black text-amber-950 shadow-lg"
              onClick={() => open({ kind: "temporada" })}
              title={`${c.nombre} · ${escalonNombre(c.escalon)}`}
              data-testid="ciudad-escalon"
            >
              <Crown className="h-4 w-4 shrink-0" />
              <span className="min-w-0 truncate">{c.nombre}</span>
              <span className="hidden shrink-0 font-semibold opacity-80 sm:inline">· {escalonNombre(c.escalon)}</span>
            </button>
            <button
              type="button"
              className="pointer-events-auto flex min-w-0 max-w-full items-center gap-1 rounded-full bg-black/50 py-1 pl-1.5 pr-3 text-xs font-bold text-white shadow-lg"
              onClick={() => open({ kind: "casa" })}
              title={`Tu casa: ${c.barrio}, casa ${c.casa}`}
              data-testid="ciudad-casa"
            >
              <Home className="h-4 w-4 shrink-0 text-amber-300" />
              <span className="min-w-0 truncate">
                {c.barrio} · casa {c.casa}
              </span>
            </button>
          </div>
          {c.fiesta && (
            <button
              type="button"
              className={`pointer-events-auto max-w-full self-start truncate rounded-full px-2.5 py-0.5 text-[11px] font-bold shadow ${c.fiesta.solemne ? "bg-slate-700/85 text-slate-100" : "bg-amber-400/90 text-amber-950"}`}
              onClick={() => open({ kind: "fiesta", id: c.fiesta!.id })}
              data-testid="ciudad-fiesta"
            >
              {c.fiesta.icono} {c.fiesta.nombre}
              {c.fiesta.de > 1 ? ` · día ${c.fiesta.dia} de ${c.fiesta.de}` : ""}
              {c.fiesta.merito > 1.01 ? ` · mérito ×${c.fiesta.merito.toLocaleString("es-419")} en el templo` : ""}
            </button>
          )}
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1.5">
          <div className="pointer-events-auto flex gap-1">
            <Boton label="Mi casa (H)" onClick={() => open({ kind: "casa" })} testid="button-ciudad-casa" className="hidden sm:flex">
              <Home className="h-5 w-5" />
            </Boton>
            <Boton label="Ir a… (I)" onClick={() => open({ kind: "irA" })} testid="button-ciudad-ir">
              <MapPin className="h-5 w-5" />
            </Boton>
            <Boton label="Temporada (T)" onClick={() => open({ kind: "temporada" })} testid="button-ciudad-temporada">
              <Trophy className="h-5 w-5" />
            </Boton>
            <Boton label={big ? "Salir de pantalla completa" : "Pantalla completa"} onClick={onFull} testid="button-ciudad-pantalla" active={big}>
              {big ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
            </Boton>
            <Boton label="Pausa (P)" onClick={onPause} testid="button-ciudad-pausa">
              <Pause className="h-5 w-5" />
            </Boton>
          </div>
          <Reloj hora={c.hora} fecha={c.fecha} fase={c.fase} />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-1" style={{ ...lados, paddingBottom: "calc(0.75rem + var(--tpl-sb, 0px))" }}>
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`max-w-[92%] rounded-xl px-3 py-1.5 text-center text-[13px] font-semibold shadow-lg sm:max-w-lg ${t.tone === "gold" ? "bg-gradient-to-r from-amber-300 to-amber-400 text-amber-950" : t.tone === "warn" ? "bg-red-50 text-red-900" : "bg-white/95 text-stone-800"}`}
          >
            {t.text}
          </div>
        ))}
        {!modal && !paused && (
          <>
            <div className={`rounded-full bg-sky-500/30 px-3 py-0.5 text-center text-[11px] font-bold leading-tight text-sky-50 backdrop-blur-[2px] ${sombra}`} data-testid="ciudad-lugar">
              <MapPin className="-mt-0.5 mr-0.5 inline h-3 w-3" />
              {c.lugar}
            </div>
            <div className={`max-w-[94%] rounded-full bg-black/30 px-3 py-1 text-center text-[12px] font-semibold leading-tight text-white backdrop-blur-[2px] sm:max-w-md ${sombra}`} data-testid="ciudad-aviso">
              <ChevronRight className="-mt-0.5 mr-0.5 inline h-3.5 w-3.5 text-amber-300" />
              {c.aviso}
            </div>
          </>
        )}
        {hint && !modal && (
          <div className="rounded-full bg-black/35 px-3 py-1 text-xs text-white/85 backdrop-blur-sm">Toca y arrastra para caminar · computadora: flechas o W A S D</div>
        )}
      </div>
    </div>
  );
}

// ================================================================ ventanas
export function CiudadModal({ modal }: { modal: Modal }) {
  switch (modal.kind) {
    case "casa":
      return <CasaView />;
    case "anuncios":
      return <AnunciosView />;
    case "ancianos":
      return <AncianosView n={modal.n} />;
    case "edificio":
      return <EdificioView id={modal.id} />;
    case "irA":
      return <IrAView />;
    default:
      return null;
  }
}

function cerrar() {
  gameStore.close();
}

/** Tu casa: su nivel, la honra que lleva y lo que falta para el siguiente. */
function CasaView() {
  const { estado, city } = useContext(CiudadCtx);
  if (!estado) return null;
  const yo = estado.yo;
  const nivel = NIVELES_CASA[yo.nivel];
  const sig = yo.siguiente ? NIVELES_CASA[yo.siguiente.nivel] : null;
  const pct = sig ? Math.max(0, Math.min(100, ((yo.honra - nivel.honra) / (sig.honra - nivel.honra)) * 100)) : 100;
  return (
    <Card
      title={
        <span className="flex items-center gap-2">
          <Home className="h-5 w-5" /> Tu casa en Jerusalén
        </span>
      }
      onClose={cerrar}
      testid="ciudad-casa-ventana"
    >
      <div className="space-y-3 p-4 text-sm">
        <p className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
          {estado.barrio.nombre} · casa {yo.parcela + 1} de 40
        </p>
        <div>
          <p className="font-serif text-2xl font-black" data-testid="ciudad-casa-nivel">
            {nivel.nombre}
          </p>
          <p className="text-[15px] leading-relaxed text-stone-600 dark:text-stone-300">{nivel.texto}</p>
        </div>
        <VerseBox text={nivel.verso.text} refName={nivel.verso.ref} />
        <div className="rounded-xl border border-amber-200 p-3 dark:border-amber-900/60" data-testid="ciudad-casa-honra">
          {sig ? (
            <>
              <p className="flex items-baseline justify-between gap-2 font-bold">
                <span>Para la {sig.nombre.toLowerCase()}</span>
                <span className="tabular-nums text-amber-800 dark:text-amber-300">
                  {fmt(yo.honra)} / {fmt(sig.honra)}
                </span>
              </p>
              <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-amber-100 dark:bg-amber-950/50">
                <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-600" style={{ width: `${pct}%` }} />
              </div>
            </>
          ) : (
            <p className="font-bold text-amber-800 dark:text-amber-300">Tu casa ya tiene aposento alto. ¡Que sea lugar de descanso para los siervos de Dios!</p>
          )}
          <p className="mt-2 text-xs text-stone-500">La honra es el mérito de todas tus temporadas en el templo. Sirve y tu casa crece; nunca vuelve atrás, aunque la temporada empiece de nuevo.</p>
        </div>
        <VerseBox text={VERSO_HONRA.text} refName={VERSO_HONRA.ref} />
        <ol className="space-y-1">
          {NIVELES_CASA.map((n) => (
            <li key={n.nivel} className={`flex items-center gap-2 rounded-lg px-2 py-1 ${n.nivel === yo.nivel ? "bg-amber-100 font-bold dark:bg-amber-900/40" : ""}`}>
              {n.nivel <= yo.nivel ? <Check className="h-4 w-4 text-emerald-600" /> : <span className="h-4 w-4 rounded-full border border-stone-300" />}
              <span className="flex-1">{n.nombre}</span>
              <span className="text-xs tabular-nums text-stone-500">{n.honra ? `${fmt(n.honra)} de honra` : "al llegar"}</span>
            </li>
          ))}
        </ol>
        <p className="text-center font-serif text-sm italic text-stone-600 dark:text-stone-300">
          «{VERSO_CASA.text}» <span className="not-italic text-xs font-semibold">— {VERSO_CASA.ref}</span>
        </p>
        <Button
          className="w-full rounded-full bg-amber-500 font-bold text-amber-950 hover:bg-amber-400"
          onClick={() => {
            cerrar();
            city?.irA("templo");
          }}
          data-testid="button-ciudad-casa-templo"
        >
          <Landmark className="mr-1 h-4 w-4" /> Ir a servir al templo
        </Button>
      </div>
    </Card>
  );
}

/** El púlpito de la plaza: el día y la fiesta, la temporada con sus cargos y lo último de la ciudad. */
function AnunciosView() {
  const { estado } = useContext(CiudadCtx);
  const [e, setE] = useState<JerusalenEstado | null>(null);
  const [actividad, setActividad] = useState<{ id: number; name: string; text: string; createdAt: string }[] | null>(null);
  useEffect(() => {
    let vivo = true;
    void fetchEstado().then((r) => vivo && r.ok && r.data && setE(r.data));
    void fetch("/api/juegos/actividad?juego=aprendiz-del-templo", { credentials: "include" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => vivo && setActividad(d?.items?.slice(0, 6) ?? []))
      .catch(() => vivo && setActividad([]));
    return () => {
      vivo = false;
    };
  }, []);
  const hoy = useMemo(() => {
    const reloj = relojEnLinea();
    const f = fechaDe(reloj.dia);
    const p = proximaFiesta(reloj.dia);
    return { f, fiesta: f.fiestas[0] ?? null, proxima: p ? { ...p, enMinutos: Math.max(1, Math.round(((p.enDias - reloj.hora) * SEGUNDOS_DIA) / 60)) } : null };
  }, []);
  const prueba = e?.temporada.dePrueba ? " (de prueba)" : "";
  const titulares = e?.escalera.flatMap((x) => x.titulares.map((t) => ({ ...t, cargo: escalonNombre(x.id) }))) ?? [];
  return (
    <Card
      title={
        <span className="flex items-center gap-2">
          <ScrollText className="h-5 w-5" /> Anuncios de la ciudad
        </span>
      }
      onClose={cerrar}
      wide
      testid="ciudad-anuncios"
    >
      <div className="space-y-3 p-4 text-sm">
        <section className="rounded-xl bg-amber-50 p-3 dark:bg-amber-950/30">
          <p className="text-xs font-black uppercase tracking-wider text-amber-800 dark:text-amber-300">
            <CalendarDays className="-mt-0.5 mr-1 inline h-3.5 w-3.5" /> Hoy en Jerusalén: {hoy.f.texto}
          </p>
          {hoy.fiesta ? (
            <div className="mt-1 flex flex-wrap items-center justify-between gap-2">
              <p className="font-bold">
                {hoy.fiesta.fiesta.icono} {hoy.fiesta.fiesta.nombre}
                {hoy.fiesta.fiesta.duracion > 1 ? ` · día ${hoy.fiesta.dia} de ${hoy.fiesta.fiesta.duracion}` : ""}
              </p>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  const id = hoy.fiesta!.fiesta.id;
                  cerrar();
                  gameStore.push({ kind: "fiesta", id });
                }}
                data-testid="button-anuncios-fiesta"
              >
                Leer de la fiesta
              </Button>
            </div>
          ) : hoy.proxima ? (
            <p className="mt-1">
              Próxima fiesta: {hoy.proxima.fiesta.icono} <b>{hoy.proxima.fiesta.nombre}</b>, el {hoy.proxima.fecha.texto} (en {hoy.proxima.enMinutos} min de reloj).
            </p>
          ) : null}
        </section>

        <section>
          <p className="mb-1 font-black">
            <Trophy className="-mt-0.5 mr-1 inline h-4 w-4 text-amber-600" /> La temporada sacerdotal {e?.temporada.n ?? ""}
          </p>
          {!e ? (
            <div className="flex justify-center py-3">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          ) : (
            <>
              <p className="text-xs text-stone-500">
                {e.temporada.diasRestantes === 1 ? "Es el último día" : `Quedan ${e.temporada.diasRestantes} días`}. Al cerrar se reparten los cargos{prueba}.
              </p>
              {titulares.length ? (
                <ul className="mt-1.5 flex flex-wrap gap-1">
                  {titulares.map((t) => (
                    <li key={t.personajeId} className="rounded-full bg-stone-100 px-2 py-0.5 text-xs dark:bg-stone-800">
                      <b>{t.cargo}</b>: {t.nombre}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-1 text-xs text-stone-500">Todavía no hay cargos repartidos en esta temporada.</p>
              )}
              {e.tabla.length > 0 && (
                <ol className="mt-2 divide-y rounded-lg border text-sm dark:divide-stone-700 dark:border-stone-700">
                  {e.tabla.slice(0, 3).map((r) => (
                    <li key={r.personajeId} className="flex items-center gap-2 px-3 py-1">
                      <span className="w-5 text-center font-black text-amber-600">{r.puesto}</span>
                      <span className="min-w-0 flex-1 truncate">{r.isMe ? `${r.nombre} (tú)` : r.nombre}</span>
                      <span className="tabular-nums">{fmt(r.merito)}</span>
                    </li>
                  ))}
                </ol>
              )}
            </>
          )}
        </section>

        {estado && (
          <section className="rounded-xl border border-stone-200 p-3 dark:border-stone-700">
            <p className="font-black">
              <Users className="-mt-0.5 mr-1 inline h-4 w-4 text-sky-600" /> {estado.barrio.nombre}
            </p>
            <p className="text-xs text-stone-500">
              {estado.barrio.casas.length} {estado.barrio.casas.length === 1 ? "casa" : "casas"} · {estado.barrio.libres} {estado.barrio.libres === 1 ? "parcela libre" : "parcelas libres"} para los nuevos sacerdotes
            </p>
          </section>
        )}

        <section>
          <p className="mb-1 font-black">Lo último en Jerusalén</p>
          {actividad === null ? (
            <div className="flex justify-center py-2">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          ) : actividad.length ? (
            <ul className="space-y-1">
              {actividad.map((a) => (
                <li key={a.id} className="text-xs">
                  <b>{a.name}</b> {a.text} <span className="text-stone-500">· {hace(a.createdAt)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-stone-500">Aún no hay noticias.</p>
          )}
        </section>
        <VerseBox text={VERSO_PULPITO.text} refName={VERSO_PULPITO.ref} />
        <p className="text-center text-xs italic text-stone-500">
          «{VERSO_PLAZA.text}» — {VERSO_PLAZA.ref}
        </p>
      </div>
    </Card>
  );
}

/** Los ancianos sentados a la puerta (Rut 4:1-2) dan un consejo de los Proverbios. */
function AncianosView({ n }: { n: number }) {
  const consejo = CONSEJOS_ANCIANOS[n % CONSEJOS_ANCIANOS.length];
  return (
    <Card title="Los ancianos de la puerta" onClose={cerrar} testid="ciudad-ancianos">
      <div className="space-y-3 p-4 text-sm">
        <p className="leading-relaxed">Booz subió a la puerta y se sentó allí, con diez ancianos de la ciudad, para tratar las causas del pueblo (Rut 4:1-2). Los ancianos de Jerusalén te dan un consejo:</p>
        <VerseBox text={consejo.text} refName={consejo.ref} />
        <Button className="w-full rounded-full bg-amber-500 font-bold text-amber-950 hover:bg-amber-400" onClick={cerrar} data-testid="button-ancianos-gracias">
          Gracias, padres
        </Button>
      </div>
    </Card>
  );
}

/** El palacio, la escuela y el mercado: por ahora solo edificios (sus caminos son de la etapa 3). */
function EdificioView({ id }: { id: EdificioId }) {
  const e = EDIFICIOS[id];
  const Icono = id === "mercado" ? Store : id === "palacio" ? Crown : ScrollText;
  return (
    <Card
      title={
        <span className="flex items-center gap-2">
          <Icono className="h-5 w-5" /> {e.nombre}
        </span>
      }
      onClose={cerrar}
      testid={`ciudad-edificio-${id}`}
    >
      <div className="space-y-3 p-4 text-sm">
        <p className="text-[15px] leading-relaxed">{e.texto}</p>
        <VerseBox text={e.verso.text} refName={e.verso.ref} />
        <p className="rounded-xl bg-sky-50 p-3 text-sky-900 dark:bg-sky-950/30 dark:text-sky-200">{e.pronto}</p>
        <Button variant="secondary" className="w-full" onClick={cerrar}>
          Volver a la calle
        </Button>
      </div>
    </Card>
  );
}

/** Ir a un lugar de la ciudad sin caminar todo el trayecto. */
function IrAView() {
  const { city } = useContext(CiudadCtx);
  const lugares: { id: Parameters<CiudadWorld["irA"]>[0]; nombre: string; nota: string }[] = [
    { id: "casa", nombre: "Mi casa", nota: "La puerta de tu casa" },
    { id: "templo", nombre: "El templo", nota: "Al pie de la escalinata" },
    { id: "plaza", nombre: "La plaza", nota: "El pozo, el púlpito y el mercado" },
    { id: "puerta", nombre: "La puerta de la ciudad", nota: "Los ancianos sentados a la puerta" },
    { id: "palacio", nombre: "El palacio del rey", nota: "Al sur del monte" },
    { id: "escuela", nombre: "La escuela de los profetas", nota: "Al norte del monte" },
  ];
  return (
    <Card
      title={
        <span className="flex items-center gap-2">
          <MapPin className="h-5 w-5" /> Ir a…
        </span>
      }
      onClose={cerrar}
      testid="ciudad-ir"
    >
      <ul className="divide-y p-2 dark:divide-stone-700">
        {lugares.map((l) => (
          <li key={l.id}>
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left hover:bg-amber-50 dark:hover:bg-amber-950/30"
              onClick={() => {
                cerrar();
                city?.irA(l.id);
              }}
              data-testid={`button-ir-${l.id}`}
            >
              <MapPin className="h-4 w-4 shrink-0 text-amber-600" />
              <span className="flex-1">
                <span className="block font-bold">{l.nombre}</span>
                <span className="block text-xs text-stone-500">{l.nota}</span>
              </span>
              <ChevronRight className="h-4 w-4 text-stone-400" />
            </button>
          </li>
        ))}
      </ul>
    </Card>
  );
}
