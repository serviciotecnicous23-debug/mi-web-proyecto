/**
 * La pantalla de la ciudad de Jerusalén en línea (etapa 2): el marcador y las ventanas de la casa,
 * del púlpito de la plaza (los anuncios de la ciudad), de los ancianos de la puerta, de los
 * edificios que se abren en la etapa 3 y de «Ir a…». El mundo 3D está en ciudad/mundo.ts.
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "wouter";
import {
  Ban, CalendarDays, Check, ChevronRight, Crown, Flag, Footprints, Hand, Home, Landmark, Loader2, MapPin, Maximize2, MessageCircle, Minimize2, Pause, ScrollText,
  Medal, RotateCw, Send, Sparkles, Store, Target, Trophy, Users, WifiOff,
} from "lucide-react";
import { CasaExtras, MercadoView, type Ofrecido, type ParteCasa } from "./MercadoUI";
import { ReunionCasa, ReunionVisita, ReunionesAnuncios } from "./ReunionesUI";
import { ConcursoView } from "./ConcursoUI";
import { PedidosBarrio, PedirAyuda } from "./AyudaUI";
import { LogrosDeOtro, MisLogros } from "./LogrosUI";
import { VERSO_MURO, type MuroEstado } from "@shared/muro";
import { coloresDeIds, type MercadoEstado, type TabMercado } from "@shared/mercado";
import { avisarMisiones } from "./online";
import { Cruceta, elegirOrientacion, textoAyuda, useControles, useReservaControles } from "./motor/Cruceta";
import { EstudiosDeOtro } from "./EstudiosUI";
import { GananciaEnLinea } from "./GananciaUI";
import { MapaView, MiniMapa } from "./MapaUI";
import { CatedraView } from "./CatedraUI";
import { BarrioView } from "./BarrioUI";
import { PersonajeView } from "./PersonajesUI";
import { RachaPill } from "./RachaUI";
import { JuntosChip } from "./BarrioCopa";
import { SiguiendoChip, seguirVecino } from "./Acompanar";
import { useChatBarrio } from "./barrio-chat";
import { EscuelaView, PalacioView } from "./CaminosUI";
import { nombreEscalonCamino } from "@shared/caminos";
import { orientacionActual } from "./motor/controles";
import { Button } from "@/components/ui/button";
import { gameStore, useGame, type EdificioId, type Modal } from "./store";
import { TesoroView } from "./EconomiaUI";
import { Card, VerseBox, fmt, hace } from "./ui";
import { bendecirCasa, casaOfrendar, casaSiervos, fetchEstado, verCasa } from "./online";
import type { CiudadWorld } from "./ciudad/mundo";
import { diaEnJerusalen, proximaFiestaGrande } from "@shared/anio";
import { escalonNombre, type JerusalenEstado } from "@shared/jerusalen";
import {
  BIEN, BIENES, CONSEJOS_ANCIANOS, EDIFICIOS, FRASES, GESTOS, NIVELES_CASA, VERSICULOS_RAPIDOS, VERSO_ALFOLI, VERSO_CASA, VERSO_DADOR, VERSO_HONRA, VERSO_HOSPEDAJE,
  VERSO_PLAZA, VERSO_PULPITO, VERSO_SIERVOS, VERSO_VISITA, bienDeFiesta, nombreDeBarrio, type Bien, type CasaPrivada, type CasaVisita, type CiudadEstado,
} from "@shared/ciudad";
import { FIESTA } from "@shared/calendario";
import { MOTIVOS_DE_DENUNCIA, type MotivoDeDenuncia } from "@shared/reports";
import { SiguientePaso } from "./CaminoHoyUI";
import { Estrellas, ObrasCasa } from "./ObrasUI";
import { OficiosView } from "./TallerUI";
import type { TallerEstado } from "@shared/taller";
import { FotoDeCasa } from "./FotoCasaUI";
import { RegalarBoton, RegalosRecibidos } from "./RegalosUI";
import { BanqueteCasa, BanqueteVisita } from "./BanqueteUI";

/** Pone el gozo nuevo en el estado de la pantalla y en el marcador de la ciudad (después de gastar o ganar). */
function useAlGozo() {
  const ctx = useContext(CiudadCtx);
  const ultimo = useRef(ctx);
  ultimo.current = ctx;
  return useCallback((g: number) => {
    const { estado, city, setEstado } = ultimo.current;
    city?.ponerGozo(g);
    if (estado) setEstado?.({ ...estado, yo: { ...estado.yo, gozo: g } });
  }, []);
}

function BanqueteCasaConMundo() {
  return <BanqueteCasa alGozo={useAlGozo()} />;
}
function VisitaRegaloYBanquete({ personajeId }: { personajeId: number }) {
  const alGozo = useAlGozo();
  return (
    <>
      <BanqueteVisita personajeId={personajeId} alGozo={alGozo} />
      <RegalarBoton personajeId={personajeId} alGozo={alGozo} />
    </>
  );
}
import { OBRAS, type ObrasEstado } from "@shared/obras";

/** La ciudad que corre y lo último que dijo el servidor de ella (con cómo cambiarlo). */
export const CiudadCtx = createContext<{
  city: CiudadWorld | null;
  estado: CiudadEstado | null;
  setEstado?: (e: CiudadEstado) => void;
  /** Entrar a la casa por dentro (la tuya, o la de un vecino con su personajeId). */
  entrarACasa?: (o?: { personajeId?: number; remodelar?: boolean }) => void;
}>({ city: null, estado: null });

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
      className={`${className} h-9 w-9 items-center justify-center rounded-full shadow-lg backdrop-blur active:scale-95 pointer-coarse:h-11 pointer-coarse:w-11 ${active ? "bg-amber-400 text-amber-950 ring-2 ring-white/70 hover:bg-amber-300" : "bg-black/50 text-white hover:bg-black/70"}`}
      data-testid={testid}
    >
      {children}
    </button>
  );
}

/** El botón de tu barrio: su emblema y cuántos mensajes de la charla faltan por ver. */
function BotonBarrio({ onClick }: { onClick: () => void }) {
  const { city } = useContext(CiudadCtx);
  const chat = useChatBarrio();
  return (
    <button
      type="button"
      className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-b from-amber-200 to-amber-400 text-xl shadow-lg ring-2 ring-white/60 active:scale-95"
      onClick={() => {
        city?.audio.click();
        onClick();
      }}
      title="Tu barrio: la charla, los vecinos y el emblema (B)"
      aria-label={`Tu barrio${chat.nuevos ? `: ${chat.nuevos} mensajes nuevos` : ""}`}
      data-testid="button-ciudad-barrio"
    >
      <span aria-hidden="true">{chat.emblema?.icono ?? "🏘️"}</span>
      {chat.nuevos > 0 && (
        <span className="absolute -right-1 -top-1 min-w-[1.25rem] rounded-full bg-red-600 px-1 text-center text-[11px] font-black leading-5 text-white" data-testid="ciudad-barrio-nuevos">
          {chat.nuevos > 99 ? "99+" : chat.nuevos}
        </span>
      )}
    </button>
  );
}

function Reloj({ hora, fecha, fase, icono }: { hora: number; fecha: string; fase: string; icono?: string }) {
  const night = hora < 0.2 || hora > 0.8;
  const a = hora * Math.PI * 2 - Math.PI / 2;
  return (
    <div className="flex max-w-[11rem] items-center gap-1.5 rounded-full bg-black/45 tpl-vidrio py-0.5 pl-0.5 pr-2.5 text-[11px] font-semibold text-white backdrop-blur-sm sm:max-w-none" data-testid="ciudad-reloj">
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
        <circle cx="12" cy="12" r="11" fill={night ? "#1b2140" : "#7fb5e6"} />
        <path d="M1 12 A11 11 0 0 0 23 12 Z" fill={night ? "#0d1022" : "#d9c49a"} opacity="0.85" />
        <circle cx={12 + Math.cos(a + Math.PI) * 7} cy={12 + Math.sin(a + Math.PI) * 7} r="3" fill={night ? "#e8ecff" : "#ffd66b"} />
      </svg>
      <span className="min-w-0 truncate">
        {icono ? `${icono} ` : ""}
        {fecha} · {fase}
      </span>
    </div>
  );
}

/** El marcador de la ciudad: quién eres, dónde está tu casa, el día y la fiesta, y qué hay cerca. */
export function CiudadHudLayer({ paused, onPause, big, onFull }: { paused: boolean; onPause: () => void; big: boolean; onFull: () => void }) {
  const { ciudad: c, toasts, modal } = useGame();
  const { city } = useContext(CiudadCtx);
  const controles = useControles();
  const reserva = useReservaControles();
  const [hint, setHint] = useState(true);
  // los gestos (saludar, aplaudir…): una tira de botones junto a la columna, sin abrir ventana (el mundo sigue)
  const [verGestos, setVerGestos] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHint(false), 14000);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    if (!verGestos) return;
    const t = setTimeout(() => setVerGestos(false), 8000);
    return () => clearTimeout(t);
  }, [verGestos]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const iconoEstacion = useMemo(() => diaEnJerusalen().estacion.icono, [c?.fecha]);
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
              title={`${c.nombre} · ${nombreEscalonCamino(c.camino, c.escalon, escalonNombre(c.escalon))}`}
              data-testid="ciudad-escalon"
            >
              <Crown className="h-4 w-4 shrink-0" />
              {/* en un teléfono angosto, solo la corona (el nombre está sobre tu figura) */}
              <span className="hidden min-w-0 truncate min-[430px]:inline">{c.nombre}</span>
              <span className="hidden shrink-0 font-semibold opacity-80 sm:inline">· {nombreEscalonCamino(c.camino, c.escalon, escalonNombre(c.escalon))}</span>
            </button>
            <button
              type="button"
              className="pointer-events-auto flex min-w-0 max-w-full items-center gap-1 rounded-full bg-black/50 tpl-vidrio py-1 pl-1.5 pr-3 text-xs font-bold text-white shadow-lg"
              onClick={() => open({ kind: "casa" })}
              title={`Tu casa: ${c.barrio}, casa ${c.casa}`}
              data-testid="ciudad-casa"
            >
              <Home className="h-4 w-4 shrink-0 text-amber-300" />
              <span className="min-w-0 truncate">
                <span className="hidden min-[430px]:inline">
                  {c.barrio} · casa {c.casa}
                </span>
                <span className="tabular-nums min-[430px]:hidden">{c.casa}</span>
              </span>
            </button>
            <button
              type="button"
              className="pointer-events-auto flex shrink-0 items-center gap-1 rounded-full bg-black/50 tpl-vidrio py-1 pl-1.5 pr-2.5 text-xs font-black text-amber-200 shadow-lg"
              onClick={() => open({ kind: "mercado" })}
              title="Tu gozo de Jerusalén en línea: se gana sirviendo y se gasta en el mercado de la plaza"
              data-testid="ciudad-gozo"
            >
              <Sparkles className="h-4 w-4 shrink-0 text-amber-300" />
              <span className="tabular-nums">{c.gozo}</span>
            </button>
            <RachaPill onOpen={() => open({ kind: "misiones" })} />
          </div>
          <MeritoCamino camino={c.camino} />
          <GananciaEnLinea />
          {/* el camino de hoy: un solo siguiente paso, con su botón para ir (shared/camino.ts) */}
          {!modal && <SiguientePaso />}
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
            <Boton label="Estudios" onClick={() => open({ kind: "estudios" })} testid="button-ciudad-estudios">
              <ScrollText className="h-5 w-5" />
            </Boton>
            <Boton label="Concurso bíblico de la semana" onClick={() => open({ kind: "concurso" })} testid="button-ciudad-concurso">
              <Medal className="h-5 w-5" />
            </Boton>
            <Boton label="Misiones" onClick={() => open({ kind: "misiones" })} testid="button-ciudad-misiones">
              <Target className="h-5 w-5" />
            </Boton>
            <Boton label="Ir a… (I)" onClick={() => open({ kind: "irA" })} testid="button-ciudad-ir">
              <MapPin className="h-5 w-5" />
            </Boton>
            {/* en el teléfono la temporada se abre tocando la corona (así caben los botones) */}
            <Boton label="Temporada (T)" onClick={() => open({ kind: "temporada" })} testid="button-ciudad-temporada" className="hidden sm:flex">
              <Trophy className="h-5 w-5" />
            </Boton>
            {big && typeof window !== "undefined" && !!window.matchMedia?.("(pointer: coarse)").matches && (
              <Boton
                label="Girar la pantalla"
                onClick={async () => {
                  const aviso = await elegirOrientacion(orientacionActual() === "horizontal" ? "vertical" : "horizontal");
                  if (aviso) gameStore.toast(aviso, "info");
                }}
                testid="button-ciudad-girar"
              >
                <RotateCw className="h-5 w-5" />
              </Boton>
            )}
            <Boton label={big ? "Salir de pantalla completa" : "Pantalla completa"} onClick={onFull} testid="button-ciudad-pantalla" active={big}>
              {big ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
            </Boton>
            <Boton label="Pausa (P)" onClick={onPause} testid="button-ciudad-pausa">
              <Pause className="h-5 w-5" />
            </Boton>
          </div>
          <button type="button" className="pointer-events-auto rounded-full" onClick={() => open({ kind: "calendario" })} title="El calendario de Jerusalén: la fecha, la estación y lo que viene" data-testid="ciudad-abrir-calendario">
            <Reloj hora={c.hora} fecha={c.fecha} fase={c.fase} icono={iconoEstacion} />
          </button>
          {!modal && <MiniMapa city={city} />}
        </div>
      </div>

      {/* a la derecha, en el medio: tu barrio (la charla), frases rápidas y vecinos */}
      <div className="pointer-events-auto absolute top-1/2 flex -translate-y-1/2 flex-col gap-2" style={{ right: "calc(0.5rem + var(--tpl-sr, 0px))" }}>
        <BotonBarrio onClick={() => open({ kind: "barrio" })} />
        <div className="relative">
          <button
            type="button"
            className={`flex h-11 w-11 items-center justify-center rounded-full shadow-lg active:scale-95 ${verGestos ? "bg-amber-400 text-amber-950" : "bg-white/90 text-amber-900"}`}
            onClick={() => setVerGestos((v) => !v)}
            title="Gestos: saludar, aplaudir, orar…"
            aria-label="Gestos para tus vecinos"
            aria-expanded={verGestos}
            data-testid="button-ciudad-gestos"
          >
            <Hand className="h-5 w-5" />
          </button>
          {verGestos && (
            <div className="absolute right-[3.25rem] top-1/2 grid w-max -translate-y-1/2 grid-cols-4 gap-1.5 rounded-2xl bg-black/60 p-1.5 shadow-xl backdrop-blur-sm" role="menu" data-testid="ciudad-gestos">
              {GESTOS.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  role="menuitem"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-xl shadow active:scale-90"
                  title={g.texto}
                  aria-label={g.texto}
                  onClick={() => {
                    city?.gesto(g.id);
                    setVerGestos(false);
                  }}
                  data-testid={`ciudad-gesto-${g.id}`}
                >
                  <span aria-hidden="true">{g.icono}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-amber-900 shadow-lg active:scale-95"
          onClick={() => open({ kind: "frases" })}
          title="Frases rápidas y versículos"
          aria-label="Frases rápidas y versículos"
          data-testid="button-ciudad-frases"
        >
          <MessageCircle className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="relative flex h-11 w-11 items-center justify-center rounded-full bg-black/55 tpl-vidrio text-white shadow-lg active:scale-95"
          onClick={() => open({ kind: "vecinos" })}
          title="Vecinos que se ven"
          aria-label={`Vecinos que se ven: ${c.vecinos}`}
          data-testid="button-ciudad-vecinos"
        >
          <Users className="h-5 w-5" />
          <span className="absolute -right-1 -top-1 min-w-[1.25rem] rounded-full bg-amber-400 px-1 text-center text-[11px] font-black leading-5 text-amber-950" data-testid="ciudad-vecinos-n">
            {c.vecinos}
          </span>
        </button>
      </div>
      {/* a la izquierda: lo último que dijeron los vecinos y si se cortó la conexión */}
      <div className="absolute top-1/2 flex max-w-[60%] -translate-y-1/2 flex-col items-start gap-1" style={{ left: "calc(0.5rem + var(--tpl-sl, 0px))" }}>
        {c.red !== "conectado" && (
          <div className="flex items-center gap-1 rounded-full bg-black/55 tpl-vidrio px-2.5 py-0.5 text-[11px] font-semibold" data-testid="ciudad-red">
            {c.red === "fuera" ? <Ban className="h-3.5 w-3.5 text-red-300" /> : <WifiOff className="h-3.5 w-3.5 text-amber-300" />}
            {c.red === "fuera" ? "Sin vecinos" : "Buscando vecinos…"}
          </div>
        )}
        {c.frases.map((f) => (
          <div key={f.id} className={`max-w-full rounded-xl bg-white/90 px-2.5 py-1 text-[12px] leading-snug text-stone-800 shadow`} data-testid="ciudad-frase">
            <b>{f.nombre}:</b> {f.texto}
          </div>
        ))}
      </div>

      <Cruceta oculto={!!modal || paused} />
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-1" style={{ ...lados, paddingBottom: "calc(0.75rem + var(--tpl-sb, 0px))", ...reserva }}>
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
            {/* la misión del barrio de hoy: cuántos vecinos hay en el lugar y cuánto falta (BarrioCopa.tsx) */}
            <JuntosChip />
            {/* a quién se sigue caminando (Acompanar.tsx) */}
            <SiguiendoChip />
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
          <div className="max-w-[94%] rounded-full bg-black/35 px-3 py-1 text-center text-xs text-white/85 backdrop-blur-sm">{textoAyuda(controles)}</div>
        )}
      </div>
    </div>
  );
}

// ================================================================ ventanas
export function CiudadModal({ modal }: { modal: Modal }) {
  switch (modal.kind) {
    case "casa":
      return <CasaView inicial={modal.pestana} />;
    case "anuncios":
      return <AnunciosView />;
    case "ancianos":
      return <AncianosView n={modal.n} />;
    case "escuela":
      return <EscuelaView tab={modal.tab} />;
    case "palacio":
      return <PalacioView tab={modal.tab} />;
    case "edificio":
      return <EdificioView id={modal.id} />;
    case "mercado":
      return <MercadoModal tab={modal.tab} />;
    case "concurso":
      return <ConcursoView />;
    case "tesoro":
      return <TesoroView />;
    case "irA":
      return <IrAView />;
    case "personaje":
      return <PersonajeView id={modal.id} />;
    case "mapa":
      return <MapaModal />;
    case "catedra":
      return <CatedraView area={modal.area} />;
    case "frases":
      return <FrasesView />;
    case "vecinos":
      return <VecinosView />;
    case "vecino":
      return <VecinoView id={modal.id} />;
    case "barrio":
      return <BarrioView pestana={modal.pestana} />;
    case "visita":
      return <VisitaView personajeId={modal.personajeId} nombre={modal.nombre} />;
    default:
      return null;
  }
}

function cerrar() {
  gameStore.close();
}

/** Lo que cambió en el mercado llega a la pantalla (alfolí, gozo) y al mundo (ropa, adornos, letrero). */
function useAlMercado() {
  // con lo último de la ciudad (la respuesta puede llegar después de otros cambios)
  const ctx = useContext(CiudadCtx);
  const ultimo = useRef(ctx);
  ultimo.current = ctx;
  return useCallback((m: MercadoEstado) => {
    const { estado, city, setEstado } = ultimo.current;
    if (!estado) return;
    const casas = estado.barrio.casas.map((c) => (c.esMia ? { ...c, adornos: m.adornos, letrero: m.letrero } : c));
    setEstado?.({
      ...estado,
      yo: { ...estado.yo, gozo: m.gozo, ropa: coloresDeIds(m.ropa) },
      barrio: { ...estado.barrio, casas },
      privada: { ...estado.privada, bienes: { ...estado.privada.bienes, ...m.bienes } },
    });
    city?.alMercado(m);
  }, []);
}

/** El muro caído en los anuncios: cuántos tramos van, el que se levanta y quiénes más ayudan. */
function MuroAnuncio() {
  const [m, setM] = useState<MuroEstado | null>(null);
  useEffect(() => {
    void fetch("/api/jerusalen/muro", { credentials: "include", cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setM(d))
      .catch(() => null);
  }, []);
  if (!m) return null;
  const listo = m.construidos >= m.tramos;
  return (
    <section className="rounded-xl border border-stone-300 p-3 dark:border-stone-700" data-testid="anuncios-muro">
      <p className="flex items-baseline justify-between gap-2 font-black">
        <span>🧱 El muro caído</span>
        <span className="text-xs font-semibold text-stone-500">
          {m.construidos} de {m.tramos} tramos
        </span>
      </p>
      <div className="mt-1.5 flex gap-0.5" aria-hidden="true">
        {Array.from({ length: m.tramos }, (_, i) => (
          <span key={i} className={`h-3 flex-1 rounded-sm ${i < m.construidos ? "bg-amber-500" : i === m.construidos ? "bg-amber-200 dark:bg-amber-900" : "bg-stone-200 dark:bg-stone-800"}`} />
        ))}
      </div>
      {listo ? (
        <p className="mt-2 text-xs font-bold text-emerald-700 dark:text-emerald-300">¡El muro está levantado! Toda la ciudad lo hizo junta.</p>
      ) : (
        <>
          <p className="mt-2 text-xs">
            Tramo {m.construidos + 1}: <b>{m.progreso}</b> de {m.meta} piedras · tus piedras: <b>{m.mias}</b>. Cada deber de cualquiera pone una; quien pone 10 o más en un tramo recibe gozo cuando se levanta.
          </p>
          {m.top.length > 0 && <p className="mt-1 text-[11px] text-stone-500">Los que más ayudan en este tramo: {m.top.map((t) => `${t.nombre} (${t.n})`).join(" · ")}</p>}
        </>
      )}
      <p className="mt-1 text-[11px] italic text-stone-500">
        «{VERSO_MURO.text}» ({VERSO_MURO.ref})
      </p>
    </section>
  );
}

/** Los pedidos del barrio en los anuncios: lo que se da sale de tu alfolí (y se ve en tu casa). */
function PedidosBarrioConCasa() {
  const ctx = useContext(CiudadCtx);
  const ultimo = useRef(ctx);
  ultimo.current = ctx;
  const alDar = useCallback((bienes: { harina: number; aceite: number; corderos: number }) => {
    const { estado, city, setEstado } = ultimo.current;
    if (!estado) return;
    const privada = { ...estado.privada, bienes: { ...estado.privada.bienes, ...bienes } };
    setEstado?.({ ...estado, privada });
    city?.actualizarPrivada(privada);
  }, []);
  return <PedidosBarrio alDar={alDar} />;
}

function MercadoModal({ tab }: { tab?: TabMercado }) {
  const alCambiar = useAlMercado();
  const ctx = useContext(CiudadCtx);
  const ultimo = useRef(ctx);
  ultimo.current = ctx;
  // comprar o vender entre vecinos: el gozo y el alfolí se ven enseguida en la ciudad
  const alCambiarBienes = useCallback((d: { gozo: number; bienes: { harina: number; aceite: number; corderos: number } }) => {
    const { estado, city, setEstado } = ultimo.current;
    if (!estado) return;
    const privada = { ...estado.privada, bienes: { ...estado.privada.bienes, ...d.bienes } };
    setEstado?.({ ...estado, yo: { ...estado.yo, gozo: d.gozo }, privada });
    city?.actualizarPrivada(privada);
  }, []);
  const { entrarACasa } = ctx;
  return <MercadoView tab={tab} alCambiar={alCambiar} alEntrarACasa={entrarACasa ? () => entrarACasa({ remodelar: true }) : undefined} alCambiarBienes={alCambiarBienes} />;
}

function CasaExtrasConMundo({ partes }: { partes?: ParteCasa[] }) {
  const alCambiar = useAlMercado();
  const ctx = useContext(CiudadCtx);
  const ultimo = useRef(ctx);
  ultimo.current = ctx;
  // lo que se ofreció en el templo: la honra, el alfolí y, si creció, la casa
  const alOfrecer = useCallback((r: Ofrecido) => {
    const { estado, city, setEstado } = ultimo.current;
    if (!estado) return;
    const nivel = r.subio ?? undefined;
    const yo = { ...estado.yo, honra: r.honra, ...(nivel !== undefined ? { nivel } : {}) };
    if (nivel !== undefined) {
      const sig = NIVELES_CASA[nivel + 1];
      yo.siguiente = sig ? { nivel: sig.nivel, honra: sig.honra } : null;
    }
    setEstado?.({ ...estado, privada: r.privada, yo });
    city?.actualizarPrivada(r.privada, nivel);
    avisarMisiones(r.misiones);
  }, []);
  // lo que falta se compra en el mercado: se llega sin caminar todo el trayecto
  const alIrAlMercado = useCallback(() => {
    gameStore.close();
    ultimo.current.city?.irA("mercado");
  }, []);
  return <CasaExtras alCambiar={alCambiar} alOfrecer={alOfrecer} partes={partes} alIrAlMercado={alIrAlMercado} />;
}

/** Las obras de tu casa: lo edificado se ve en la ciudad y el gozo baja (shared/obras.ts). */
function ObrasConMundo() {
  const ctx = useContext(CiudadCtx);
  const ultimo = useRef(ctx);
  ultimo.current = ctx;
  const alCambiar = useCallback((o: ObrasEstado) => {
    const { estado, city, setEstado } = ultimo.current;
    if (!estado) return;
    const casas = estado.barrio.casas.map((c) => (c.esMia ? { ...c, obras: o.hechas, estrellas: o.estrellas.estrellas } : c));
    setEstado?.({ ...estado, yo: { ...estado.yo, gozo: o.gozo }, barrio: { ...estado.barrio, casas }, privada: { ...estado.privada, bienes: { ...estado.privada.bienes, harina: o.harina, aceite: o.aceite } } });
    city?.alObras(o.hechas, o.estrellas.estrellas, o.gozo);
  }, []);
  return <ObrasCasa alCambiar={alCambiar} />;
}

/** Los oficios de tu casa (shared/taller.ts): las ovejas de tu redil se ven junto a tu casa. */
function OficiosConMundo() {
  const ctx = useContext(CiudadCtx);
  const ultimo = useRef(ctx);
  ultimo.current = ctx;
  const alCambiar = useCallback((t: TallerEstado) => {
    const { estado, city, setEstado } = ultimo.current;
    if (!estado) return;
    const mia = estado.barrio.casas.find((c) => c.esMia);
    if ((mia?.ovejas ?? 0) === t.redil.ovejas && estado.yo.gozo === t.gozo) return;
    const casas = estado.barrio.casas.map((c) => (c.esMia ? { ...c, ovejas: t.redil.ovejas } : c));
    setEstado?.({ ...estado, yo: { ...estado.yo, gozo: t.gozo }, barrio: { ...estado.barrio, casas }, privada: { ...estado.privada, bienes: { ...estado.privada.bienes, corderos: t.corderos } } });
    city?.alOficios(t.redil.ovejas, t.gozo);
  }, []);
  const alIrAlMercado = useCallback(() => {
    gameStore.close();
    ultimo.current.city?.irA("mercado");
  }, []);
  return <OficiosView alCambiar={alCambiar} alIrAlMercado={alIrAlMercado} />;
}

/** Tu casa: su nivel, la honra que lleva y lo que falta para el siguiente. */
/** Las pestañas de «Tu casa» (en el teléfono la ventana quedaba muy larga). */
const PESTANAS_CASA: [string, string][] = [
  ["casa", "🏠 Tu casa"],
  ["obras", "🧱 Obras"],
  ["huerto", "🌾 Huerto y horno"],
  ["oficios", "🐑 Oficios"],
  ["adornos", "🪔 Adornos y ropa"],
  ["vecinos", "📖 Vecinos"],
];

function CasaView({ inicial }: { inicial?: string }) {
  const { estado, city } = useContext(CiudadCtx);
  const [pestana, setPestana] = useState(inicial ?? "casa");
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
        <div className="flex flex-wrap gap-1" role="group" aria-label="Partes de tu casa">
          {PESTANAS_CASA.map(([id, nombre]) => (
            <button
              key={id}
              type="button"
              aria-pressed={pestana === id}
              onClick={() => setPestana(id)}
              className={`rounded-full px-3 py-1 text-xs font-bold ${pestana === id ? "bg-amber-400 text-amber-950" : "bg-stone-100 dark:bg-stone-800"}`}
              data-testid={`casa-pestana-${id}`}
            >
              {nombre}
            </button>
          ))}
        </div>
        {pestana === "obras" && <ObrasConMundo />}
        {pestana === "huerto" && <CasaExtrasConMundo partes={["huerto", "horno"]} />}
        {pestana === "oficios" && <OficiosConMundo />}
        {pestana === "adornos" && <CasaExtrasConMundo partes={["adornos", "ropa", "letrero"]} />}
        {pestana === "vecinos" && (
          <>
            <RegalosRecibidos />
            <BanqueteCasaConMundo />
            <ReunionCasa />
            <PedirAyuda />
          </>
        )}
        {pestana === "casa" && (
        <>
        <div>
          <p className="font-serif text-2xl font-black" data-testid="ciudad-casa-nivel">
            {nivel.nombre}
          </p>
          <p className="text-[15px] leading-relaxed text-stone-600 dark:text-stone-300">{nivel.texto}</p>
        </div>
        {(() => {
          const mia = estado.barrio.casas.find((c) => c.esMia);
          const hechas = mia?.obras?.length ?? 0;
          return (
            <div className="flex flex-wrap items-center gap-2 rounded-xl border border-amber-200 bg-amber-50/60 p-2.5 dark:border-amber-900/60 dark:bg-amber-950/20" data-testid="casa-estrellas">
              <span className="min-w-0 flex-1 text-xs">
                <Estrellas n={mia?.estrellas ?? 1} className="text-lg" />
                <br />
                {hechas ? `${hechas} de ${OBRAS.length} obras edificadas.` : "Edifica tu casa con el gozo que ganas: cada obra la ven tus vecinos."}
              </span>
              <Button size="sm" className="rounded-full bg-amber-500 font-bold text-amber-950 hover:bg-amber-400" onClick={() => setPestana("obras")} data-testid="casa-ir-obras">
                🧱 Obras de tu casa
              </Button>
              <FotoDeCasa />
            </div>
          );
        })()}
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
        <SiervosPanel />
        <MisLogros />
        <p className="text-center font-serif text-sm italic text-stone-600 dark:text-stone-300">
          «{VERSO_CASA.text}» <span className="not-italic text-xs font-semibold">— {VERSO_CASA.ref}</span>
        </p>
        </>
        )}
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

/** Tus siervos (solo los ves tú), tu alfolí y llevar las ofrendas de tu casa al templo. */
function SiervosPanel() {
  const { estado, city, setEstado } = useContext(CiudadCtx);
  const [busy, setBusy] = useState(false);
  const [aviso, setAviso] = useState<string | null>(null);
  if (!estado) return null;
  const p = estado.privada;
  const fiesta = diaEnJerusalen().fecha.fiestas[0]?.fiesta;
  const doble = bienDeFiesta(fiesta?.ofrenda);
  const guardar = (privada: CasaPrivada, nivel?: number, honra?: number) => {
    const yo = nivel !== undefined || honra !== undefined ? { ...estado.yo, ...(nivel !== undefined ? { nivel } : {}), ...(honra !== undefined ? { honra } : {}) } : estado.yo;
    if (nivel !== undefined) {
      const sig = NIVELES_CASA[nivel + 1];
      yo.siguiente = sig ? { nivel: sig.nivel, honra: sig.honra } : null;
    }
    const e = { ...estado, privada, yo };
    setEstado?.(e);
    city?.actualizarPrivada(privada, nivel);
  };
  const cambiar = async (lista: Bien[]) => {
    setBusy(true);
    setAviso(null);
    const r = await casaSiervos(lista);
    setBusy(false);
    if (r.ok && r.data) guardar(r.data);
    else setAviso(r.data?.message || "No se pudo cambiar. Intenta de nuevo.");
  };
  const ofrendar = async () => {
    const bienes = { harina: p.bienes.harina, aceite: p.bienes.aceite, corderos: p.bienes.corderos };
    if (!bienes.harina && !bienes.aceite && !bienes.corderos) return;
    setBusy(true);
    setAviso(null);
    const r = await casaOfrendar(bienes);
    setBusy(false);
    if (r.ok && r.data) {
      guardar(r.data.privada, r.data.subio ?? undefined, r.data.honra);
      avisarMisiones((r.data as { misiones?: { titulo: string; premio: number }[] }).misiones);
      setAviso(`Tus siervos llevaron las ofrendas al templo: +${fmt(r.data.ganado)} de honra para tu casa${r.data.doble ? ` (la ${BIEN[r.data.doble].nombre.toLowerCase()} valió el doble por la fiesta)` : ""}.${r.data.subio !== null ? ` ¡Tu casa creció: ahora es ${NIVELES_CASA[r.data.subio].nombre.toLowerCase()}!` : ""}`);
    } else setAviso(r.data?.message || "No se pudo llevar. Intenta de nuevo.");
  };
  const hay = p.bienes.harina + p.bienes.aceite + p.bienes.corderos > 0;
  const libres = p.maxSiervos - p.siervos.length;
  return (
    <section className="space-y-2.5 rounded-xl border border-amber-200 p-3 dark:border-amber-900/60" data-testid="ciudad-siervos">
      <p className="flex items-baseline justify-between gap-2 font-black">
        <span>Tus siervos</span>
        <span className="text-xs font-semibold text-stone-500">
          {p.siervos.length} de {p.maxSiervos} · solo los ves tú
        </span>
      </p>
      <p className="text-xs text-stone-500">Preparan harina, aceite y corderos mientras no juegas: hasta 2 horas seguidas y 3 por día (la segunda hora rinde la mitad). No sirven en el templo ni ganan mérito por ti. Hoy trabajaron {p.minutosHoy} de 180 minutos.</p>
      {aviso && <p className="rounded-lg bg-amber-50 px-2 py-1.5 text-xs text-amber-900 dark:bg-amber-950/40 dark:text-amber-200" data-testid="ciudad-siervos-aviso">{aviso}</p>}
      <ul className="space-y-1.5">
        {p.siervos.map((tarea, i) => (
          <li key={i} className="flex items-center gap-2 rounded-lg bg-amber-50/70 px-2 py-1.5 dark:bg-amber-950/20">
            <span className="w-5 text-center">{BIEN[tarea].icono}</span>
            <span className="min-w-0 flex-1 text-[13px]">
              <b>Siervo {i + 1}:</b> {BIEN[tarea].tarea.toLowerCase()} ({BIEN[tarea].porHora.toLocaleString("es-419")} por hora)
            </span>
            <select
              className="rounded-md border border-stone-300 bg-white px-1 py-0.5 text-xs dark:border-stone-700 dark:bg-stone-900"
              value={tarea}
              disabled={busy}
              onChange={(e) => void cambiar(p.siervos.map((t, k) => (k === i ? (e.target.value as Bien) : t)))}
              aria-label={`Tarea del siervo ${i + 1}`}
              data-testid={`siervo-tarea-${i}`}
            >
              {BIENES.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.nombre}
                </option>
              ))}
            </select>
          </li>
        ))}
      </ul>
      {libres > 0 ? (
        <Button size="sm" variant="secondary" className="w-full" disabled={busy} onClick={() => void cambiar([...p.siervos, "harina"])} data-testid="button-siervo-llamar">
          Llamar un siervo ({libres} {libres === 1 ? "lugar libre" : "lugares libres"})
        </Button>
      ) : p.maxSiervos < 4 ? (
        <p className="text-center text-xs text-stone-500">Cuando tu casa crezca habrá lugar para otro siervo.</p>
      ) : null}
      <p className="pt-1 font-black">Tu alfolí</p>
      <div className="grid grid-cols-3 gap-1.5 text-center" data-testid="ciudad-alfoli">
        {BIENES.map((b) => (
          <div key={b.id} className={`rounded-lg p-1.5 ${doble === b.id ? "bg-amber-200/70 dark:bg-amber-800/40" : "bg-stone-100 dark:bg-stone-800"}`}>
            <p className="text-lg leading-none">{b.icono}</p>
            <p className="text-sm font-black tabular-nums">
              {p.bienes[b.id]}
              <span className="text-[10px] font-semibold text-stone-500">/{p.capacidad}</span>
            </p>
            <p className="text-[10px] text-stone-500">{b.nombre}</p>
          </div>
        ))}
      </div>
      <Button className="w-full rounded-full bg-amber-500 font-bold text-amber-950 hover:bg-amber-400" disabled={busy || !hay} onClick={() => void ofrendar()} data-testid="button-siervos-ofrendar">
        {busy ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : null} Llevar todo al templo (honra para tu casa)
      </Button>
      <p className="text-[11px] text-stone-500">
        Cada harina da 2 de honra, cada aceite 3 y cada cordero 10{doble ? `; hoy, por ${FIESTA[fiesta!.id].nombre.toLowerCase()}, ${BIEN[doble].nombre.toLowerCase()} vale el doble` : ""}. Tu casa ya recibió {fmt(p.ofrecido)} de honra por sus ofrendas.
      </p>
      <VerseBox text={VERSO_ALFOLI.text} refName={VERSO_ALFOLI.ref} />
      <p className="text-center text-xs italic text-stone-500">
        «{VERSO_SIERVOS.text}» — {VERSO_SIERVOS.ref}
      </p>
      <p className="pt-1 font-black">Bendiciones</p>
      <p className="text-xs text-stone-600 dark:text-stone-300" data-testid="ciudad-bendiciones">
        {p.bendiciones === 0 ? "Todavía nadie dejó una bendición en tu casa. Invita a tus vecinos con «Ven a visitar mi casa»." : `Tus vecinos dejaron ${fmt(p.bendiciones)} ${p.bendiciones === 1 ? "bendición" : "bendiciones"} en tu casa.`}
      </p>
      <p className="text-center text-xs italic text-stone-500">
        «{VERSO_DADOR.text}» — {VERSO_DADOR.ref}
      </p>
    </section>
  );
}

/** La casa de un vecino: se ve sin tocar nada y se deja una bendición (una por día). */
function VisitaView({ personajeId, nombre }: { personajeId: number; nombre: string }) {
  const { city, entrarACasa } = useContext(CiudadCtx);
  const [casa, setCasa] = useState<CasaVisita | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [hecho, setHecho] = useState(false);
  useEffect(() => {
    let vivo = true;
    void verCasa(personajeId).then((r) => {
      if (!vivo) return;
      if (r.ok && r.data) setCasa(r.data);
      else setError(r.data?.message || "No se pudo abrir la casa.");
    });
    return () => {
      vivo = false;
    };
  }, [personajeId]);
  const bendecir = async () => {
    setBusy(true);
    const r = await bendecirCasa(personajeId);
    setBusy(false);
    if (r.ok && r.data) {
      setCasa(r.data);
      setHecho(true);
      city?.audio.correct();
      avisarMisiones((r.data as { misiones?: { titulo: string; premio: number }[] }).misiones);
    } else setError(r.data?.message || "No se pudo dejar la bendición.");
  };
  const nivel = casa ? NIVELES_CASA[casa.nivel] : null;
  return (
    <Card
      title={
        <span className="flex items-center gap-2">
          <Home className="h-5 w-5" /> La casa de {casa?.nombre ?? nombre}
        </span>
      }
      onClose={cerrar}
      testid="ciudad-visita"
    >
      <div className="space-y-3 p-4 text-sm">
        {!casa && !error && (
          <div className="flex justify-center py-4">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
        )}
        {error && <p className="rounded-xl bg-amber-50 p-2.5 text-xs dark:bg-amber-950/30">{error}</p>}
        {casa && nivel && (
          <>
            <p className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
              {escalonNombre(casa.escalon)} · {nombreDeBarrio(casa.barrio)}, casa {casa.parcela + 1}
            </p>
            <div>
              <p className="font-serif text-xl font-black">{nivel.nombre}</p>
              <p className="text-[15px] leading-relaxed text-stone-600 dark:text-stone-300">{nivel.texto}</p>
            </div>
            <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-2.5 text-xs dark:border-amber-900/60 dark:bg-amber-950/20" data-testid="visita-estrellas">
              <Estrellas n={casa.estrellas ?? 1} className="text-lg" />
              {casa.obras?.length ? (
                <p className="mt-1">
                  Edificó: {OBRAS.filter((o) => casa.obras!.includes(o.id)).map((o) => `${o.icono} ${o.nombre.toLowerCase()}`).join(" · ")}
                </p>
              ) : (
                <p className="mt-1 text-stone-500">Todavía no tiene obras en su casa.</p>
              )}
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-300" data-testid="visita-bendiciones">
              ✨ {fmt(casa.bendiciones)} {casa.bendiciones === 1 ? "bendición" : "bendiciones"} de sus vecinos
            </p>
            {entrarACasa && (
              <Button className="w-full rounded-full bg-amber-500 font-bold text-amber-950 hover:bg-amber-400" onClick={() => entrarACasa({ personajeId })} data-testid="button-visita-entrar">
                <Home className="mr-1 h-4 w-4" /> Entrar a ver su casa por dentro
              </Button>
            )}
            {!casa.esMia && <VisitaRegaloYBanquete personajeId={personajeId} />}
            <LogrosDeOtro personajeId={personajeId} />
            <ReunionVisita personajeId={personajeId} alAcertar={() => city?.audio.correct()} />
            <VerseBox text={VERSO_VISITA.text} refName={VERSO_VISITA.ref} />
            {hecho ? (
              <p className="rounded-xl bg-emerald-50 p-2.5 text-center text-sm font-bold text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200">Dejaste tu bendición: «Paz sea a esta casa». Vuelve mañana para dejar otra.</p>
            ) : casa.yaBendije ? (
              <p className="rounded-xl bg-stone-100 p-2.5 text-center text-xs dark:bg-stone-800">Hoy ya dejaste tu bendición en esta casa. Vuelve mañana.</p>
            ) : (
              <Button className="w-full rounded-full bg-amber-500 font-bold text-amber-950 hover:bg-amber-400" disabled={busy} onClick={() => void bendecir()} data-testid="button-visita-bendecir">
                {busy ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : null} Dejar una bendición
              </Button>
            )}
            <p className="text-center text-xs italic text-stone-500">
              «{VERSO_HOSPEDAJE.text}» — {VERSO_HOSPEDAJE.ref}
            </p>
          </>
        )}
        <Button variant="secondary" className="w-full" onClick={cerrar}>
          Volver a la calle
        </Button>
      </div>
    </Card>
  );
}

/** El púlpito de la plaza: el día y la fiesta, la temporada con sus cargos y lo último de la ciudad. */
function AnunciosView() {
  const { estado, city } = useContext(CiudadCtx);
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
    // el año de Jerusalén: la fecha real y la próxima fiesta grande (shared/anio.ts)
    const d = diaEnJerusalen();
    return { f: d.fecha, fiesta: d.fecha.fiestas[0] ?? null, proxima: proximaFiestaGrande() };
  }, []);
  const prueba = e?.temporada.dePrueba ? " (de prueba)" : "";
  // los cargos de los tres caminos (cada uno con su nombre: sumo sacerdote, varón de Dios, canciller del rey…)
  const titulares = e
    ? (["sacerdocio", "profecia", "realeza"] as const).flatMap((cam) =>
        (e.escaleras?.[cam] ?? (cam === "sacerdocio" ? e.escalera : [])).flatMap((x) => x.titulares.map((t) => ({ ...t, cargo: nombreEscalonCamino(cam, x.id, escalonNombre(x.id)) }))),
      )
    : [];
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
              Próxima fiesta: {hoy.proxima.evento.icono} <b>{hoy.proxima.evento.nombre}</b>, el {hoy.proxima.texto} ({hoy.proxima.enDias === 1 ? "mañana" : `en ${hoy.proxima.enDias} días`}).{" "}
              <button type="button" className="font-bold text-amber-700 underline-offset-2 hover:underline dark:text-amber-300" onClick={() => gameStore.push({ kind: "calendario" })} data-testid="anuncios-calendario">
                Ver el calendario
              </button>
            </p>
          ) : null}
        </section>

        <ReunionesAnuncios
          alIr={(r) => {
            cerrar();
            city?.irACasaDe(r.barrio, r.parcela);
          }}
        />

        <PedidosBarrioConCasa />

        <MuroAnuncio />
        <button type="button" onClick={() => gameStore.push({ kind: "tesoro" })} className="flex w-full items-center gap-2 rounded-xl border border-amber-200 p-3 text-left dark:border-amber-900/60" data-testid="anuncios-tesoro">
          <span className="text-2xl">🏛️</span>
          <span className="min-w-0 flex-1">
            <b>El tesoro del templo</b>
            <span className="block text-[11px] text-stone-500">El diezmo de las ventas, la provisión para los que empiezan y las casas más bendecidas de la semana.</span>
          </span>
        </button>

        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-xl border border-amber-300 bg-gradient-to-r from-amber-50 to-orange-50 p-3 text-left dark:border-amber-800 dark:from-amber-950/30 dark:to-orange-950/20"
          onClick={() => {
            cerrar();
            gameStore.push({ kind: "concurso" });
          }}
          data-testid="anuncios-concurso"
        >
          <Medal className="h-6 w-6 shrink-0 text-amber-600" />
          <span className="min-w-0 flex-1">
            <b>Concurso bíblico de la semana</b>
            <span className="block text-xs text-stone-500">Las mismas 10 preguntas para todos. Los tres primeros ganan gozo y salen aquí como campeones.</span>
          </span>
        </button>

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

/** Frases rápidas y versículos: en la ciudad no hay chat libre (cuida a los niños). */
function FrasesView() {
  const { city } = useContext(CiudadCtx);
  const [aviso, setAviso] = useState<string | null>(null);
  const decir = (id: string) => {
    if (city?.decir(id)) cerrar();
    else setAviso("Espera un momento antes de decir otra frase.");
  };
  return (
    <Card
      title={
        <span className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" /> Decir a los vecinos
        </span>
      }
      onClose={cerrar}
      testid="ciudad-frases"
    >
      <div className="space-y-3 p-4 text-sm">
        <p className="text-xs text-stone-500">Te oyen los vecinos que te ven. Para hablar con todo tu barrio, abre «Tu barrio» (el botón con el emblema).</p>
        {aviso && <p className="rounded-lg bg-amber-50 px-2 py-1 text-xs text-amber-900 dark:bg-amber-950/40 dark:text-amber-200">{aviso}</p>}
        <div className="grid grid-cols-2 gap-1.5">
          {FRASES.map((f) => (
            <button
              key={f.id}
              type="button"
              className="rounded-xl border border-amber-200 bg-white px-2.5 py-2 text-left text-[13px] font-semibold hover:bg-amber-50 dark:border-amber-900/60 dark:bg-stone-900 dark:hover:bg-amber-950/40"
              onClick={() => decir(f.id)}
              data-testid={`frase-${f.id}`}
            >
              {f.texto}
            </button>
          ))}
        </div>
        <p className="pt-1 text-xs font-black uppercase tracking-wider text-amber-700 dark:text-amber-300">Versículos</p>
        <div className="space-y-1.5">
          {VERSICULOS_RAPIDOS.map((f) => (
            <button
              key={f.id}
              type="button"
              className="w-full rounded-xl border border-amber-200 bg-amber-50/60 px-3 py-2 text-left font-serif text-[13px] italic hover:bg-amber-100 dark:border-amber-900/60 dark:bg-amber-950/20 dark:hover:bg-amber-950/40"
              onClick={() => decir(f.id)}
              data-testid={`frase-${f.id}`}
            >
              «{f.texto}» <span className="not-italic text-xs font-semibold text-amber-800 dark:text-amber-300">{f.ref}</span>
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
}

type Bloqueado = { personajeId: number | null; nombre: string };

async function pedirBloqueos(metodo: "GET" | "POST" | "DELETE", personajeId?: number): Promise<{ ok: boolean; bloqueados: Bloqueado[]; message?: string }> {
  try {
    const url = metodo === "DELETE" ? `/api/jerusalen/ciudad/bloqueos/${personajeId}` : "/api/jerusalen/ciudad/bloqueos";
    const res = await fetch(url, {
      method: metodo,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: metodo === "POST" ? JSON.stringify({ personajeId }) : undefined,
    });
    const data = await res.json().catch(() => ({}));
    return { ok: res.ok, bloqueados: data.bloqueados ?? [], message: data.message };
  } catch {
    return { ok: false, bloqueados: [], message: "Revisa tu conexión." };
  }
}

/** Los vecinos que se ven ahora (hasta 20) y las personas que bloqueaste. */
function VecinosView() {
  const { city } = useContext(CiudadCtx);
  const { ciudad } = useGame();
  const [lista, setLista] = useState(() => city?.listaVecinos() ?? []);
  const [bloqueados, setBloqueados] = useState<Bloqueado[] | null>(null);
  useEffect(() => {
    const t = setInterval(() => setLista(city?.listaVecinos() ?? []), 1000);
    void pedirBloqueos("GET").then((r) => setBloqueados(r.bloqueados));
    return () => clearInterval(t);
  }, [city]);
  const desbloquear = async (b: Bloqueado) => {
    if (b.personajeId === null) return;
    const r = await pedirBloqueos("DELETE", b.personajeId);
    if (r.ok) setBloqueados(r.bloqueados);
  };
  return (
    <Card
      title={
        <span className="flex items-center gap-2">
          <Users className="h-5 w-5" /> Vecinos que se ven
        </span>
      }
      onClose={cerrar}
      testid="ciudad-vecinos"
    >
      <div className="space-y-3 p-4 text-sm">
        {ciudad?.red !== "conectado" && (
          <p className="rounded-lg bg-amber-50 px-2 py-1 text-xs text-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
            {ciudad?.red === "fuera" ? "No estás conectado con los vecinos." : "Buscando a los vecinos…"}
          </p>
        )}
        {lista.length ? (
          <ul className="divide-y rounded-xl border dark:divide-stone-700 dark:border-stone-700">
            {lista.map((v) => (
              <li key={v.id}>
                <button
                  type="button"
                  className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-amber-50 dark:hover:bg-amber-950/30"
                  onClick={() => {
                    cerrar();
                    gameStore.push({ kind: "vecino", id: v.id });
                  }}
                  data-testid={`vecino-${v.id}`}
                >
                  <Crown className="h-4 w-4 shrink-0 text-amber-500" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-bold">{v.nombre}</span>
                    <span className="block text-xs text-stone-500">
                      {nombreEscalonCamino(v.camino ?? "sacerdocio", v.escalon, escalonNombre(v.escalon))} · {v.barrio ? `${nombreDeBarrio(v.barrio)}, casa ${v.casa + 1}` : "Jerusalén"}
                    </span>
                  </span>
                  <span className="shrink-0 text-xs tabular-nums text-stone-500">{Math.round(v.distancia)} m</span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="py-3 text-center text-xs text-stone-500">Ahora no hay vecinos cerca. En tu barrio y en la plaza se ven hasta 20 a la vez.</p>
        )}
        <details className="rounded-xl bg-stone-50 p-3 text-xs dark:bg-stone-900/40" data-testid="ciudad-bloqueados">
          <summary className="cursor-pointer font-bold">Personas que bloqueaste ({bloqueados?.length ?? "…"})</summary>
          {bloqueados && bloqueados.length > 0 ? (
            <ul className="mt-2 space-y-1">
              {bloqueados.map((b, i) => (
                <li key={`${b.personajeId}-${i}`} className="flex items-center justify-between gap-2">
                  <span className="truncate">{b.nombre}</span>
                  {b.personajeId !== null && (
                    <Button size="sm" variant="secondary" onClick={() => void desbloquear(b)} data-testid={`button-desbloquear-${b.personajeId}`}>
                      Desbloquear
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-1 text-stone-500">Nadie. Quien bloqueas deja de verte y de oírte en la ciudad, y tú a él.</p>
          )}
        </details>
      </div>
    </Card>
  );
}

/** Un vecino: saludar, escribirle por la mensajería, bloquear o denunciar. */
function VecinoView({ id }: { id: number }) {
  const { city } = useContext(CiudadCtx);
  const v = city?.vecinoInfo(id) ?? null;
  const [paso, setPaso] = useState<"ficha" | "bloquear" | "denunciar" | "hecho">("ficha");
  const [motivo, setMotivo] = useState<MotivoDeDenuncia | "">("");
  const [detalles, setDetalles] = useState("");
  const [busy, setBusy] = useState(false);
  const [mensaje, setMensaje] = useState<string | null>(null);
  if (!v) {
    return (
      <Card title="Vecino" onClose={cerrar}>
        <p className="p-4 text-sm">Ese vecino ya no está cerca.</p>
      </Card>
    );
  }
  const bloquear = async () => {
    setBusy(true);
    const r = await pedirBloqueos("POST", v.id);
    setBusy(false);
    if (r.ok) {
      city?.ocultarVecino(v.id);
      setMensaje(`Bloqueaste a ${v.nombre}. Ya no se ven ni se oyen en la ciudad. Puedes desbloquearlo en «Vecinos».`);
      setPaso("hecho");
    } else setMensaje(r.message || "No se pudo bloquear.");
  };
  const denunciar = async () => {
    if (!motivo) return;
    setBusy(true);
    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contentType: "jugador", contentId: v.id, reason: motivo, details: detalles.trim() || undefined }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setMensaje("Gracias. La administración revisará la denuncia. Si quieres, también puedes bloquearlo.");
        setPaso("hecho");
      } else setMensaje(data.message || "No se pudo enviar la denuncia.");
    } catch {
      setMensaje("Revisa tu conexión.");
    }
    setBusy(false);
  };
  return (
    <Card
      title={
        <span className="flex items-center gap-2">
          <Crown className="h-5 w-5" /> {v.nombre}
        </span>
      }
      onClose={cerrar}
      testid="ciudad-vecino"
    >
      <div className="space-y-3 p-4 text-sm">
        <p className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
          {nombreEscalonCamino(v.camino ?? "sacerdocio", v.escalon, escalonNombre(v.escalon))} · {nombreDeBarrio(v.barrio)}, casa {v.casa + 1}
        </p>
        {paso === "ficha" && <LogrosDeOtro personajeId={v.id} />}
        {paso === "ficha" && <EstudiosDeOtro personajeId={v.id} />}
        {mensaje && <p className="rounded-xl bg-amber-50 p-2.5 text-xs dark:bg-amber-950/30">{mensaje}</p>}
        {paso === "ficha" && (
          <div className="grid grid-cols-2 gap-2">
            <Button
              className="rounded-full bg-amber-500 font-bold text-amber-950 hover:bg-amber-400"
              onClick={() => {
                city?.decir("paz");
                cerrar();
              }}
              data-testid="button-vecino-saludar"
            >
              <Hand className="mr-1 h-4 w-4" /> Saludar
            </Button>
            <Button asChild variant="secondary" className="rounded-full font-bold">
              <Link href={`/mensajes?to=${v.u}`} data-testid="button-vecino-escribir">
                <Send className="mr-1 h-4 w-4" /> Escribir
              </Link>
            </Button>
            <Button
              variant="secondary"
              className="col-span-2 rounded-full font-bold"
              disabled={busy || !city}
              onClick={async () => {
                if (!city) return;
                setBusy(true);
                const aviso = await seguirVecino(city, v.id);
                setBusy(false);
                if (aviso) setMensaje(aviso);
                else cerrar();
              }}
              data-testid="button-vecino-seguir"
            >
              <Footprints className="mr-1 h-4 w-4" /> Seguir a {v.nombre}
            </Button>
            <Button variant="ghost" className="text-stone-600 dark:text-stone-300" onClick={() => setPaso("bloquear")} data-testid="button-vecino-bloquear">
              <Ban className="mr-1 h-4 w-4" /> Bloquear
            </Button>
            <Button variant="ghost" className="text-red-700 dark:text-red-300" onClick={() => setPaso("denunciar")} data-testid="button-vecino-denunciar">
              <Flag className="mr-1 h-4 w-4" /> Denunciar
            </Button>
            <p className="col-span-2 text-[11px] text-stone-500">«Escribir» abre la mensajería de la web (sales del juego; tu casa y tu mérito quedan guardados).</p>
          </div>
        )}
        {paso === "bloquear" && (
          <div className="space-y-2">
            <p>¿Bloquear a {v.nombre}? Dejarán de verse y de oírse en la ciudad. Puedes desbloquearlo cuando quieras.</p>
            <div className="flex gap-2">
              <Button variant="secondary" className="flex-1" onClick={() => setPaso("ficha")}>
                Cancelar
              </Button>
              <Button className="flex-1 bg-stone-800 text-white hover:bg-stone-700" disabled={busy} onClick={() => void bloquear()} data-testid="button-vecino-bloquear-si">
                {busy ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : <Ban className="mr-1 h-4 w-4" />} Bloquear
              </Button>
            </div>
          </div>
        )}
        {paso === "denunciar" && (
          <div className="space-y-2">
            <p className="text-xs text-stone-500">¿Qué pasa con este jugador? La denuncia llega a la administración.</p>
            <div className="space-y-1">
              {(Object.keys(MOTIVOS_DE_DENUNCIA) as MotivoDeDenuncia[]).map((m) => (
                <label key={m} className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1 hover:bg-stone-50 dark:hover:bg-stone-900">
                  <input type="radio" name="motivo" value={m} checked={motivo === m} onChange={() => setMotivo(m)} />
                  <span>{MOTIVOS_DE_DENUNCIA[m]}</span>
                </label>
              ))}
            </div>
            <textarea
              className="w-full rounded-lg border border-stone-300 bg-white p-2 text-sm dark:border-stone-700 dark:bg-stone-900"
              rows={2}
              maxLength={500}
              placeholder="Detalles (opcional)"
              value={detalles}
              onChange={(e) => setDetalles(e.target.value)}
            />
            <div className="flex gap-2">
              <Button variant="secondary" className="flex-1" onClick={() => setPaso("ficha")}>
                Cancelar
              </Button>
              <Button variant="destructive" className="flex-1" disabled={busy || !motivo} onClick={() => void denunciar()} data-testid="button-vecino-denunciar-si">
                {busy ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : <Flag className="mr-1 h-4 w-4" />} Denunciar
              </Button>
            </div>
          </div>
        )}
        {paso === "hecho" && (
          <Button variant="secondary" className="w-full" onClick={cerrar}>
            Volver a la calle
          </Button>
        )}
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
    { id: "mercado", nombre: "El mercado", nota: "Los cuatro mercaderes: semillas, cosas para la casa, ropa y quien te compra" },
    { id: "puerta", nombre: "La puerta de la ciudad", nota: "Los ancianos sentados a la puerta" },
    { id: "palacio", nombre: "El palacio del rey", nota: "Al sur del monte" },
    { id: "escuela", nombre: "La escuela de los profetas", nota: "Al norte del monte" },
    { id: "camara", nombre: "La cámara de los sacerdotes", nota: "Junto a la escalinata, del lado norte" },
    { id: "sabiduria", nombre: "La casa de la sabiduría", nota: "Junto a la escalinata, del lado sur: «¿Quién es sabio?»" },
    { id: "oracion", nombre: "El monte de la oración", nota: "El lugar de oración, al norte del monte del templo" },
    { id: "siervos", nombre: "La calle de los siervos", nota: "Las casas de Azarías, Eleazar, Conanías, Isaías, Miqueas, Eliaquim y Etán: recados y chismes" },
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

/**
 * El mérito de la temporada y el puesto en la tabla de su camino (los profetas compiten entre profetas,
 * los siervos del rey entre ellos): al tocarlo se abre la temporada con la escalera y los cargos.
 */
function MeritoCamino({ camino }: { camino: "sacerdocio" | "profecia" | "realeza" }) {
  const { online } = useGame();
  if (!online) return null;
  const quien = camino === "profecia" ? "profetas" : camino === "realeza" ? "siervos del rey" : "sacerdotes";
  return (
    <button
      type="button"
      className="pointer-events-auto flex w-fit items-center gap-1 whitespace-nowrap rounded-full bg-gradient-to-b from-amber-300 to-amber-500 py-0.5 pl-1.5 pr-2.5 text-[11px] font-black text-amber-950 shadow-lg"
      onClick={() => gameStore.push({ kind: "temporada" })}
      title={`Tu mérito de la temporada${online.puesto ? ` y tu puesto entre los ${quien}` : ""}: al cerrar la temporada se reparten los cargos`}
      aria-label={`Mérito ${online.merito}${online.puesto ? `, puesto ${online.puesto} entre los ${quien}` : ""}`}
      data-testid="ciudad-merito"
    >
      🏅 <span className="tabular-nums">{online.merito}</span> mérito
      {online.puesto ? <span className="font-bold">· {online.puesto}.º</span> : null}
    </button>
  );
}

/** El mapa grande (con la ciudad del contexto). */
function MapaModal() {
  const { city } = useContext(CiudadCtx);
  return <MapaView city={city} />;
}
