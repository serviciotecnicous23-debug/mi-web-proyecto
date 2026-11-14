/**
 * El patio de los juegos (shared/juegos-grupo.ts, server/juegos-grupo.ts) en la pantalla:
 * - la entrada: crear una sala con un juego, unirse con el código o a la sala de un amigo, y lo mío (gozo de hoy, partidas,
 *   prendas);
 * - la sala de espera: el código para compartir, quiénes están (a punto, en el patio), las tribus, invitar, las frases y
 *   «Empezar» (el anfitrión);
 * - cada juego: la esgrima, las doce tribus y «¿Quién soy?» se juegan aquí; la carrera y el muro, caminando por la ciudad
 *   (la ventana se cierra sola y abajo queda un aviso con lo que toca);
 * - el resultado con los premios.
 * La sala llega por la red (juegos-red.ts); aquí nunca está la respuesta antes de tiempo.
 */
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Check, Copy, DoorOpen, Loader2, Play, RotateCcw, Send, UserMinus, UserPlus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, VerseBox, fmt } from "./ui";
import { gameStore } from "./store";
import { CiudadCtx } from "./CiudadUI";
import { ICONO_CAMINO } from "./barrio-chat";
import { juegosRed, pedirJuegos, useAhora, useJuegos } from "./juegos-red";
import { VERSICULOS_RAPIDOS } from "@shared/ciudad";
import { MESAS, ORDEN_MESAS } from "@shared/mesa/index";
import { NIVELES_BOT, type NivelBot } from "@shared/mesa";
import { MesaFinal, MesaJuego, useMusicaDeJuego } from "./mesa";
import { Confeti } from "./mesa/vida";
import {
  FRASES_SALA, GOZO_JUEGOS_DIA, JUEGOS, ORDEN_JUEGOS, PRENDAS_JUEGOS, QUIEN, SALA_MAX, TRIBUS, TRIBUS_EQUIPOS, VERSO_PATIO,
  type EsgrimaVista, type InvitableSala, type JuegoId, type MuroVista, type CarreraVista, type PatioEstado, type QuienVista, type SalaVista, type TribusVista,
} from "@shared/juegos-grupo";
import { Ico } from "./iconos";

const cerrar = () => gameStore.close();
const seg = (ms: number) => Math.max(0, Math.ceil(ms / 1000));
const reloj = (ms: number) => {
  const s = seg(ms);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};
const MEDALLA = ["🥇", "🥈", "🥉"];

function useAudio() {
  const { city } = useContext(CiudadCtx);
  return city?.audio ?? null;
}

/** Un aviso en la ventana (error o información). */
function Aviso({ texto, tono = "warn" }: { texto: string | null; tono?: "warn" | "info" | "ok" }) {
  if (!texto) return null;
  const c = tono === "ok" ? "border-emerald-300 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-100" : tono === "info" ? "border-sky-300 bg-sky-50 text-sky-900 dark:bg-sky-950/40 dark:text-sky-100" : "border-amber-300 bg-amber-50 text-amber-900 dark:bg-amber-950/40 dark:text-amber-100";
  return (
    <p className={`rounded-xl border px-3 py-2 text-[13px] font-semibold leading-snug ${c}`} role="status" data-testid="juegos-aviso">
      {texto}
    </p>
  );
}

/** La barra del tiempo que queda. */
function Barra({ ms, total, color = "bg-amber-500" }: { ms: number; total: number; color?: string }) {
  const pct = Math.max(0, Math.min(100, (ms / Math.max(1, total)) * 100));
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-stone-200 dark:bg-stone-700" aria-hidden="true">
      <div className={`h-full rounded-full ${pct < 25 ? "bg-red-500" : color} transition-[width] duration-200`} style={{ width: `${pct}%` }} />
    </div>
  );
}

/** Los botones de las opciones (con lo que elegí y, al revelar, la buena). */
function Opciones({ opciones, mia, correcta, deshabilitado, onElegir, largo }: { opciones: string[]; mia: string | null; correcta?: string | null; deshabilitado: boolean; onElegir: (o: string) => void; largo?: boolean }) {
  return (
    <div className={`grid gap-2 ${largo ? "grid-cols-1" : "grid-cols-1 min-[420px]:grid-cols-2"}`} data-testid="juegos-opciones">
      {opciones.map((o, i) => {
        const esMia = mia === o;
        const esBuena = correcta != null && o === correcta;
        const mal = correcta != null && esMia && !esBuena;
        return (
          <button
            key={o}
            type="button"
            disabled={deshabilitado || !!mia}
            onClick={() => onElegir(o)}
            aria-pressed={esMia}
            className={`flex min-h-[2.75rem] items-start gap-2 rounded-xl border-2 px-3 py-2 text-left text-[13px] font-semibold leading-snug shadow-sm transition active:scale-[0.98] disabled:cursor-default ${
              esBuena
                ? "border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-50"
                : mal
                  ? "border-red-500 bg-red-50 text-red-900 dark:bg-red-900/40 dark:text-red-50"
                  : esMia
                    ? "border-amber-500 bg-amber-100 text-amber-950 dark:bg-amber-900/50 dark:text-amber-50"
                    : "border-amber-200 bg-white hover:border-amber-400 hover:bg-amber-50 dark:border-amber-800/60 dark:bg-stone-900 dark:hover:bg-stone-800"
            }`}
            data-testid={`juegos-opcion-${i}`}
          >
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-200 text-[11px] font-black text-amber-900 dark:bg-amber-800 dark:text-amber-100">{"ABCDEF"[i]}</span>
            <span className="min-w-0">{o}</span>
          </button>
        );
      })}
    </div>
  );
}

function Tabla({ filas }: { filas: { pj: number; nombre: string; puntos: number; yo: boolean }[] }) {
  return (
    <ol className="space-y-1" data-testid="juegos-tabla">
      {filas.map((f, i) => (
        <li key={f.pj} className={`flex items-center gap-2 rounded-lg px-2 py-1 text-[13px] ${f.yo ? "bg-amber-100 font-bold dark:bg-amber-900/40" : ""}`}>
          <span className="w-6 text-center">{MEDALLA[i] ?? `${i + 1}.`}</span>
          <span className="min-w-0 flex-1 truncate">{f.nombre}</span>
          <span className="tabular-nums font-black">{f.puntos}</span>
        </li>
      ))}
    </ol>
  );
}

// ================================================================ la ventana
export function JuegosGrupoView() {
  const { sala, aviso } = useJuegos();
  const [patio, setPatio] = useState<PatioEstado | null>(null);
  const [cargando, setCargando] = useState(true);

  async function recargar() {
    const r = await pedirJuegos<PatioEstado>("");
    setCargando(false);
    if (r.ok && r.data) {
      setPatio(r.data);
      juegosRed.recibir(r.data.sala);
    }
  }
  useEffect(() => {
    void recargar();
    return () => juegosRed.limpiarAviso();
  }, []);
  // al salir de una sala se vuelve a pedir lo de la entrada (las salas de los amigos y lo mío)
  const tenia = useRef(!!sala);
  useEffect(() => {
    if (tenia.current && !sala) void recargar();
    tenia.current = !!sala;
  }, [sala]);

  // al empezar o terminar una partida, la ventana vuelve arriba (para ver el tablero o el resultado desde el principio)
  const cuerpo = useRef<HTMLDivElement>(null);
  const estado = sala?.estado ?? null;
  useEffect(() => {
    let el: HTMLElement | null = cuerpo.current?.parentElement ?? null;
    while (el && !(el.scrollHeight > el.clientHeight && /(auto|scroll)/.test(getComputedStyle(el).overflowY))) el = el.parentElement;
    if (el && el !== document.scrollingElement) el.scrollTop = 0;
  }, [estado]);

  const titulo = sala ? (
    <span className="flex items-center gap-2">
      <span aria-hidden="true"><Ico e={JUEGOS[sala.juego].icono ?? ""} /></span>
      <span className="truncate">{JUEGOS[sala.juego].nombre}</span>
      <span className="rounded-full bg-amber-200 px-2 py-0.5 font-mono text-xs font-black tracking-widest text-amber-950" data-testid="juegos-codigo-titulo">
        {sala.codigo}
      </span>
    </span>
  ) : (
    "🎲 El patio de los juegos"
  );
  return (
    <Card title={titulo} onClose={cerrar} wide ancha={!!sala && sala.juego === "mesa" && sala.estado !== "espera" && !!(MESAS[sala.mesa ?? ""]?.relojPropio || MESAS[sala.mesa ?? ""]?.ancha)} testid="juegos-ventana">
      <div ref={cuerpo} className="space-y-3 p-4">
        {aviso && !sala && <Aviso texto={aviso} tono="info" />}
        {!sala ? (
          cargando && !patio ? (
            <p className="flex items-center gap-2 text-sm">
              <Loader2 className="h-4 w-4 animate-spin" /> Abriendo el patio…
            </p>
          ) : (
            <PatioInicio patio={patio} onRecargar={() => void recargar()} />
          )
        ) : sala.estado === "espera" ? (
          <SalaEspera sala={sala} />
        ) : sala.estado === "jugando" ? (
          <PartidaView sala={sala} />
        ) : (
          <ResultadoView sala={sala} />
        )}
      </div>
    </Card>
  );
}

// ================================================================ la entrada al patio
function PatioInicio({ patio, onRecargar }: { patio: PatioEstado | null; onRecargar: () => void }) {
  const audio = useAudio();
  const [codigo, setCodigo] = useState("");
  const [aviso, setAviso] = useState<string | null>(null);
  const [ocupado, setOcupado] = useState(false);

  async function crear(juego: JuegoId) {
    audio?.click();
    setOcupado(true);
    setAviso(null);
    const r = await juegosRed.accion("/sala", { juego });
    setOcupado(false);
    if (!r.ok) setAviso(r.message);
    else audio?.page();
  }
  async function unirme(c: string) {
    audio?.click();
    setOcupado(true);
    setAviso(null);
    const r = await juegosRed.accion("/sala/unirme", { codigo: c });
    setOcupado(false);
    if (!r.ok) {
      setAviso(r.message);
      onRecargar();
    } else audio?.page();
  }
  return (
    <>
      <VerseBox text={VERSO_PATIO.text} refName={VERSO_PATIO.ref} />
      <p className="text-[13px] leading-snug text-stone-600 dark:text-stone-300">
        Juega con tus amistades y la gente de tu barrio: crea una sala, comparte su código de 6 letras e invita. Caben de 2 a {SALA_MAX} personas, y en
        los juegos de mesa también puedes jugar solo, con compañeros de la computadora.
      </p>
      <Aviso texto={aviso} />
      <section aria-labelledby="juegos-crear">
        <h3 id="juegos-crear" className="mb-2 font-serif text-base font-bold">
          Crear una sala
        </h3>
        <div className="grid grid-cols-1 gap-2 min-[460px]:grid-cols-2">
          {ORDEN_JUEGOS.map((id) => {
            const j = JUEGOS[id];
            return (
              <button
                key={id}
                type="button"
                disabled={ocupado}
                onClick={() => void crear(id)}
                className="flex items-start gap-3 rounded-2xl border border-amber-300/70 bg-gradient-to-b from-white to-amber-50 p-3 text-left shadow-sm transition hover:border-amber-500 active:scale-[0.98] disabled:opacity-60 dark:from-stone-900 dark:to-stone-950 dark:border-amber-700/50"
                data-testid={`juegos-crear-${id}`}
              >
                <span className="text-3xl leading-none" aria-hidden="true">
                  <Ico e={j.icono ?? ""} />
                </span>
                <span className="min-w-0">
                  <span className="block font-serif text-[15px] font-bold">{j.nombre}</span>
                  <span className="block text-[12px] leading-snug text-stone-600 dark:text-stone-300">{j.corto}</span>
                  <span className="mt-1 block text-[11px] font-semibold text-amber-800 dark:text-amber-300">
                    {j.min} a {j.max} personas{j.enLaCiudad ? " · se juega en la ciudad" : ""}
                    {j.cooperativo ? " · todos juntos" : ""}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </section>
      <section aria-labelledby="juegos-unirme" className="rounded-2xl border border-amber-200 p-3 dark:border-amber-800/50">
        <h3 id="juegos-unirme" className="mb-2 font-serif text-base font-bold">
          Unirme con un código
        </h3>
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (codigo.trim()) void unirme(codigo);
          }}
        >
          <input
            value={codigo}
            onChange={(e) => setCodigo(e.target.value.toUpperCase().replace(/[^A-Za-z]/g, "").slice(0, 6))}
            placeholder="ABCDEF"
            maxLength={6}
            autoCapitalize="characters"
            autoComplete="off"
            aria-label="El código de la sala (6 letras)"
            className="min-w-0 flex-1 rounded-xl border border-amber-300 bg-white px-3 py-2 font-mono text-lg font-black uppercase tracking-[0.3em] text-stone-900 dark:bg-stone-900 dark:text-stone-50"
            data-testid="juegos-codigo"
          />
          <Button type="submit" disabled={ocupado || codigo.length !== 6} data-testid="juegos-unirme">
            {ocupado ? <Loader2 className="h-4 w-4 animate-spin" /> : <DoorOpen className="h-4 w-4" />} Entrar
          </Button>
        </form>
      </section>
      {!!patio?.salas.length && (
        <section aria-labelledby="juegos-amigos">
          <h3 id="juegos-amigos" className="mb-2 font-serif text-base font-bold">
            Salas de tus amistades y de tu barrio
          </h3>
          <ul className="space-y-2">
            {patio.salas.map((s) => (
              <li key={s.codigo} className="flex items-center gap-2 rounded-xl border border-amber-200 bg-white px-3 py-2 dark:border-amber-800/50 dark:bg-stone-900">
                <span className="text-2xl" aria-hidden="true">
                  <Ico e={JUEGOS[s.juego].icono ?? ""} />
                </span>
                <span className="min-w-0 flex-1 text-[13px] leading-snug">
                  <b>{JUEGOS[s.juego].nombre}</b> de {s.anfitrion}
                  <span className="block text-[11px] text-stone-500">
                    {s.jugadores} de {s.max} · con {s.conocidos.join(", ")}
                  </span>
                </span>
                <Button size="sm" variant="secondary" disabled={ocupado} onClick={() => void unirme(s.codigo)} data-testid={`juegos-unirme-${s.codigo}`}>
                  Unirme
                </Button>
              </li>
            ))}
          </ul>
        </section>
      )}
      {patio && <LoMio patio={patio} />}
    </>
  );
}

function LoMio({ patio }: { patio: PatioEstado }) {
  return (
    <section aria-labelledby="juegos-mio" className="rounded-2xl bg-amber-50 p-3 dark:bg-amber-950/30">
      <h3 id="juegos-mio" className="mb-1 font-serif text-base font-bold">
        Lo tuyo en el patio
      </h3>
      <p className="text-[13px]" data-testid="juegos-mio">
        Gozo de hoy en los juegos: <b className="tabular-nums">{patio.hoy.gozo}</b> de {patio.hoy.tope} · {fmt(patio.partidas)} {patio.partidas === 1 ? "partida" : "partidas"} ·{" "}
        {fmt(patio.ganadas)} {patio.ganadas === 1 ? "ganada" : "ganadas"}
      </p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {PRENDAS_JUEGOS.map((p) => {
          const tiene = patio.prendas.includes(p.id);
          return (
            <span
              key={p.id}
              title={p.detalle}
              className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold ${tiene ? "bg-white text-stone-800 shadow dark:bg-stone-800 dark:text-stone-100" : "bg-stone-200/70 text-stone-500 dark:bg-stone-800/60"}`}
            >
              <span className="inline-block h-3 w-3 rounded-full border border-black/20" style={{ background: tiene ? p.color : "transparent" }} aria-hidden="true" />
              <Ico e={JUEGOS[p.juego].icono ?? ""} /> {p.nombre}
              {tiene ? " ✓" : ""}
            </span>
          );
        })}
      </div>
      <p className="mt-2 text-[11px] text-stone-500">Ganar cada juego da su prenda (no se venden). Jugar suma para la copa de tu barrio.</p>
    </section>
  );
}

// ================================================================ la sala de espera
function SalaEspera({ sala }: { sala: SalaVista }) {
  const { city } = useContext(CiudadCtx);
  const audio = city?.audio ?? null;
  const [aviso, setAviso] = useState<string | null>(null);
  const [ocupado, setOcupado] = useState(false);
  const [invitar, setInvitar] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const yo = sala.miembros.find((m) => m.yo);
  const def = JUEGOS[sala.juego];
  const mesaDef = sala.juego === "mesa" && sala.mesa ? MESAS[sala.mesa] ?? null : null;

  async function hacer(ruta: string, body: unknown = {}) {
    audio?.click();
    setOcupado(true);
    setAviso(null);
    const r = await juegosRed.accion(`/sala/${ruta}`, body);
    setOcupado(false);
    if (!r.ok && r.message) setAviso(r.message);
    return r.ok;
  }
  async function copiar() {
    try {
      await navigator.clipboard.writeText(sala.codigo);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      setAviso(`El código es ${sala.codigo}.`);
    }
  }
  const alPatio = () => {
    cerrar();
    setTimeout(() => city?.irA("juegos"), 60);
  };

  return (
    <>
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-amber-300/70 bg-gradient-to-r from-amber-100 to-amber-50 p-3 dark:from-amber-950/50 dark:to-stone-900 dark:border-amber-700/50">
        {/* en el teléfono, los botones bajan a otra línea para que el código entre completo */}
        <div className="min-w-[13.5rem] flex-1">
          <p className="text-[11px] font-bold uppercase tracking-widest text-amber-800 dark:text-amber-300">El código de la sala</p>
          <p className="font-mono text-[1.7rem] font-black tracking-[0.3em] text-amber-950 min-[460px]:text-3xl min-[460px]:tracking-[0.35em] dark:text-amber-100" data-testid="juegos-codigo-sala">
            {sala.codigo}
          </p>
          <p className="text-[12px] text-stone-600 dark:text-stone-300">Compártelo con tu gente de la iglesia, o invita desde aquí.</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="secondary" onClick={() => void copiar()} data-testid="juegos-copiar">
            {copiado ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} {copiado ? "Copiado" : "Copiar"}
          </Button>
          <Button size="sm" onClick={() => setInvitar((v) => !v)} aria-pressed={invitar} data-testid="juegos-invitar-abrir">
            <UserPlus className="h-4 w-4" /> Invitar
          </Button>
        </div>
      </div>
      {invitar && <InvitarPanel onAviso={setAviso} />}
      <Aviso texto={aviso} />

      {/* el juego (lo elige el anfitrión) */}
      <section aria-labelledby="juegos-elegido" className="space-y-2">
        <h3 id="juegos-elegido" className="font-serif text-base font-bold">
          {mesaDef ? `${mesaDef.icono} ${mesaDef.nombre}` : `${def.icono} ${def.nombre}`}
        </h3>
        {sala.soyAnfitrion && (
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Elegir el juego">
            {ORDEN_JUEGOS.map((id) => (
              <button
                key={id}
                type="button"
                aria-pressed={id === sala.juego}
                disabled={ocupado}
                onClick={() => id !== sala.juego && void hacer("juego", { juego: id })}
                className={`rounded-full px-3 py-1 text-[12px] font-bold shadow-sm ${id === sala.juego ? "bg-amber-500 text-amber-950" : "bg-white text-stone-700 hover:bg-amber-50 dark:bg-stone-800 dark:text-stone-200"}`}
                data-testid={`juegos-elegir-${id}`}
              >
                <Ico e={JUEGOS[id].icono ?? ""} /> {JUEGOS[id].nombre}
              </button>
            ))}
          </div>
        )}
        {sala.juego === "mesa" && sala.soyAnfitrion && (
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Elegir el juego de mesa">
            {ORDEN_MESAS.map((id) => (
              <button
                key={id}
                type="button"
                aria-pressed={id === sala.mesa}
                disabled={ocupado}
                onClick={() => id !== sala.mesa && void hacer("juego", { mesa: id })}
                className={`rounded-xl border px-2.5 py-1.5 text-left text-[12px] font-bold shadow-sm ${
                  id === sala.mesa ? "border-amber-500 bg-amber-100 dark:bg-amber-900/40" : "border-stone-200 bg-white hover:bg-amber-50 dark:border-stone-700 dark:bg-stone-800"
                }`}
                data-testid={`juegos-mesa-${id}`}
              >
                <span className="text-base"><Ico e={MESAS[id].icono ?? ""} /></span> {MESAS[id].nombre}
                <span className="block text-[10px] font-semibold text-stone-500">
                  {MESAS[id].min === MESAS[id].max ? `${MESAS[id].min} jugadores` : `de ${MESAS[id].min} a ${MESAS[id].max} jugadores`}
                </span>
              </button>
            ))}
          </div>
        )}
        {mesaDef?.opciones?.length ? <OpcionesMesa sala={sala} ocupado={ocupado} hacer={hacer} /> : null}
        <ul className="list-disc space-y-0.5 pl-5 text-[13px] leading-snug text-stone-700 dark:text-stone-200">
          {(mesaDef?.como ?? def.como).map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        <VerseBox text={(mesaDef?.verso ?? def.verso).text} refName={(mesaDef?.verso ?? def.verso).ref} />
      </section>

      {sala.juego === "tribus" && <TribusEspera sala={sala} ocupado={ocupado} hacer={hacer} />}
      {sala.soyAnfitrion && sala.estado !== "jugando" && <CompanerosPanel sala={sala} ocupado={ocupado} hacer={hacer} />}

      <section aria-labelledby="juegos-gente">
        <h3 id="juegos-gente" className="mb-2 flex items-center gap-2 font-serif text-base font-bold">
          <Users className="h-4 w-4" /> En la sala: {sala.miembros.length} de {sala.max}
        </h3>
        <ul className="space-y-1.5" data-testid="juegos-miembros">
          {sala.miembros.map((m) => (
            <li key={m.pj} className={`flex items-center gap-2 rounded-xl px-3 py-1.5 text-[13px] ${m.yo ? "bg-amber-100 dark:bg-amber-900/40" : "bg-white dark:bg-stone-900"}`}>
              <span aria-hidden="true">{m.bot ? NIVELES_BOT[m.bot].icono : ICONO_CAMINO[m.camino]}</span>
              <span className="min-w-0 flex-1 truncate font-semibold">
                {m.nombre}
                {m.anfitrion && <span title="Creó la sala"> 👑</span>}
                {m.yo && <span className="font-normal text-stone-500"> (tú)</span>}
                {m.bot && <span className="ml-1 rounded-full bg-sky-100 px-1.5 py-0.5 text-[10px] font-bold text-sky-800 dark:bg-sky-900/40 dark:text-sky-200">computadora · {NIVELES_BOT[m.bot].nombre}</span>}
              </span>
              {def.enElPatio && <span className={`text-[11px] font-bold ${m.enPatio ? "text-emerald-700 dark:text-emerald-300" : "text-stone-400"}`}>{m.enPatio ? "📍 en el patio" : "lejos del patio"}</span>}
              {!m.conectado && <span className="text-[11px] font-bold text-red-600">fuera de la ciudad</span>}
              <span className={`text-[11px] font-black ${m.listo ? "text-emerald-700 dark:text-emerald-300" : "text-stone-400"}`}>{m.listo ? "✅ a punto" : "⏳ esperando"}</span>
              {sala.soyAnfitrion && !m.yo && (
                <button type="button" className="rounded-full p-1 text-stone-500 hover:bg-red-50 hover:text-red-700" title={m.bot ? `Quitar a ${m.nombre}` : `Sacar a ${m.nombre} de la sala`} aria-label={m.bot ? `Quitar a ${m.nombre}` : `Sacar a ${m.nombre} de la sala`} onClick={() => void (m.bot ? hacer("bot", { quitar: m.pj }) : hacer("sacar", { pj: m.pj }))} data-testid={m.bot ? `juegos-quitar-bot-${m.pj}` : undefined}>
                  <UserMinus className="h-4 w-4" />
                </button>
              )}
            </li>
          ))}
        </ul>
      </section>

      {def.enElPatio && yo && !yo.enPatio && (
        <Aviso texto="Este juego empieza en el patio de los juegos: ve allá con tu grupo (la ventana se cierra para que camines)." tono="info" />
      )}

      <div className="flex flex-wrap gap-2">
        {!sala.soyAnfitrion && (
          <Button variant={yo?.listo ? "secondary" : "default"} disabled={ocupado} onClick={() => void hacer("listo", { listo: !yo?.listo })} aria-pressed={!!yo?.listo} data-testid="juegos-listo">
            <Check className="h-4 w-4" /> {yo?.listo ? "Ya no estoy a punto" : "Estoy a punto"}
          </Button>
        )}
        {sala.soyAnfitrion && (
          <Button className="tpl-btn-oro" disabled={ocupado || !sala.puedeEmpezar.ok} onClick={() => void hacer("empezar")} data-testid="juegos-empezar">
            <Play className="h-4 w-4" /> Empezar
          </Button>
        )}
        {def.enElPatio && yo && !yo.enPatio && (
          <Button variant="secondary" onClick={alPatio} data-testid="juegos-ir-patio">
            <Ico e="🎲" /> Ir al patio
          </Button>
        )}
        <Button variant="outline" disabled={ocupado} onClick={() => void hacer("salir")} data-testid="juegos-salir">
          <DoorOpen className="h-4 w-4" /> Salir de la sala
        </Button>
      </div>
      {sala.soyAnfitrion && !sala.puedeEmpezar.ok && sala.puedeEmpezar.motivo && <p className="text-[12px] text-stone-500" data-testid="juegos-motivo">{sala.puedeEmpezar.motivo}</p>}

      <Frases sala={sala} />
    </>
  );
}

/** Lo que el anfitrión elige del juego de mesa (los demás lo ven). */
function OpcionesMesa({ sala, ocupado, hacer }: { sala: SalaVista; ocupado: boolean; hacer: (ruta: string, body?: unknown) => Promise<boolean> }) {
  const def = MESAS[sala.mesa ?? ""];
  if (!def?.opciones?.length) return null;
  const elegidas = { ...Object.fromEntries(def.opciones.map((o) => [o.id, o.inicial])), ...(sala.opcionesMesa ?? {}) };
  return (
    <div className="space-y-1.5 rounded-xl border border-amber-200 bg-amber-50/60 p-2 dark:border-amber-800/50 dark:bg-amber-950/20" data-testid="juegos-opciones-mesa">
      {def.opciones.map((op) => (
        <div key={op.id} className="flex flex-wrap items-center gap-1.5" role="group" aria-label={op.nombre}>
          <span className="w-20 shrink-0 text-[12px] font-black text-amber-900 dark:text-amber-200">{op.nombre}</span>
          {op.valores.map((v) => {
            const si = elegidas[op.id] === v.id;
            return sala.soyAnfitrion ? (
              <button
                key={v.id}
                type="button"
                aria-pressed={si}
                disabled={ocupado}
                onClick={() => !si && void hacer("juego", { opciones: { ...elegidas, [op.id]: v.id } })}
                className={`rounded-full border px-2.5 py-1 text-[12px] font-bold ${si ? "border-amber-500 bg-amber-200 text-amber-950" : "border-stone-200 bg-white text-stone-700 hover:bg-amber-50 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200"}`}
                data-testid={`juegos-opcion-${op.id}-${v.id}`}
              >
                {v.nombre}
              </button>
            ) : si ? (
              <span key={v.id} className="rounded-full bg-amber-200 px-2.5 py-1 text-[12px] font-bold text-amber-950">
                {v.nombre}
              </span>
            ) : null;
          })}
        </div>
      ))}
    </div>
  );
}

/** Los compañeros de la computadora: el anfitrión los agrega (con su nivel) para jugar solo o completar la mesa. */
/** Cuántos en total conviene para jugar con la computadora en cada juego (al tocar «Llenar»). */
function objetivoCompaneros(sala: SalaVista): number {
  if (sala.juego === "mesa") return sala.max;
  if (sala.juego === "tribus") return Math.min(sala.max, Math.max(4, sala.tribus * 2));
  if (sala.juego === "muro") return Math.min(sala.max, 3);
  return Math.min(sala.max, 4);
}

const NOTA_COMPANEROS: Partial<Record<SalaVista["juego"], string>> = {
  esgrima: "Contestan con su tiempo: el fácil se equivoca más y tarda; el difícil es rápido.",
  tribus: "Se reparten en las tribus; si en su tribu hay personas, les dejan contestar primero.",
  quien: "Esperan algunas pistas antes de adivinar: el difícil necesita menos.",
  carrera: "Corren su recorrido por su cuenta: en la tabla ves por qué lugar va cada uno.",
  muro: "Cargan piedras con ustedes: cuantos más, más alto el muro (y la meta).",
};

function CompanerosPanel({ sala, ocupado, hacer }: { sala: SalaVista; ocupado: boolean; hacer: (ruta: string, body?: unknown) => Promise<boolean> }) {
  const bots = sala.miembros.filter((m) => m.bot).length;
  const lleno = sala.miembros.length >= sala.max;
  const faltan = Math.max(0, objetivoCompaneros(sala) - sala.miembros.length);
  const [llenando, setLlenando] = useState(false);
  async function llenar() {
    setLlenando(true);
    for (let k = 0; k < faltan; k++) if (!(await hacer("bot", { nivel: "normal" }))) break;
    setLlenando(false);
  }
  return (
    <section aria-labelledby="juegos-companeros" className="space-y-2 rounded-2xl border border-sky-200 bg-sky-50/70 p-3 dark:border-sky-900/60 dark:bg-sky-950/20" data-testid="juegos-companeros">
      <h3 id="juegos-companeros" className="font-serif text-base font-bold">
        🤖 Compañeros de la computadora
      </h3>
      <p className="text-[12px] text-stone-600 dark:text-stone-300">
        {sala.miembros.length === 1 ? "¿No hay nadie? Agrega compañeros y juega solo." : "Completa la sala con compañeros de la computadora."} Con ellos la partida es de
        práctica: hasta 10 de gozo por día, sin copa ni prendas.
      </p>
      {NOTA_COMPANEROS[sala.juego] && <p className="text-[11px] text-stone-500">{NOTA_COMPANEROS[sala.juego]}</p>}
      {faltan > 0 && (
        <Button size="sm" disabled={ocupado || llenando} onClick={() => void llenar()} data-testid="juegos-llenar">
          🤖 Llenar con la computadora ({faltan === 1 ? "1 compañero" : `${faltan} compañeros`})
        </Button>
      )}
      <div className="flex flex-wrap gap-1.5" role="group" aria-label="Agregar un compañero de la computadora">
        {(Object.keys(NIVELES_BOT) as NivelBot[]).map((n) => (
          <Button key={n} size="sm" variant="secondary" disabled={ocupado || lleno} onClick={() => void hacer("bot", { nivel: n })} title={NIVELES_BOT[n].detalle} aria-label={`Agregar un compañero de la computadora, nivel ${NIVELES_BOT[n].nombre.toLowerCase()}`} data-testid={`juegos-bot-${n}`}>
            <Ico e={NIVELES_BOT[n].icono ?? ""} /> {NIVELES_BOT[n].nombre}
          </Button>
        ))}
      </div>
      {lleno && <p className="text-[11px] text-stone-500">Ya están todos los asientos{bots ? ": quita uno para cambiarlo." : "."}</p>}
    </section>
  );
}

function TribusEspera({ sala, ocupado, hacer }: { sala: SalaVista; ocupado: boolean; hacer: (ruta: string, body?: unknown) => Promise<boolean> }) {
  const yo = sala.miembros.find((m) => m.yo);
  return (
    <section aria-labelledby="juegos-tribus" className="space-y-2 rounded-2xl border border-amber-200 p-3 dark:border-amber-800/50">
      <h3 id="juegos-tribus" className="font-serif text-base font-bold">
        Las tribus
      </h3>
      {sala.soyAnfitrion && (
        <div className="flex items-center gap-2 text-[13px]">
          <span>¿Cuántas tribus?</span>
          {Array.from({ length: TRIBUS.maxEquipos - TRIBUS.minEquipos + 1 }, (_, i) => i + TRIBUS.minEquipos).map((n) => (
            <button
              key={n}
              type="button"
              aria-pressed={sala.tribus === n}
              disabled={ocupado}
              onClick={() => void hacer("juego", { tribus: n })}
              className={`h-8 w-8 rounded-full font-black ${sala.tribus === n ? "bg-amber-500 text-amber-950" : "bg-white text-stone-700 dark:bg-stone-800 dark:text-stone-200"}`}
              data-testid={`juegos-tribus-${n}`}
            >
              {n}
            </button>
          ))}
        </div>
      )}
      <p className="text-[12px] text-stone-600 dark:text-stone-300">Elige tu tribu (si no eliges, el servidor te pone en la que tenga menos gente).</p>
      <div className="grid grid-cols-2 gap-2">
        {TRIBUS_EQUIPOS.slice(0, sala.tribus).map((t, n) => {
          const dentro = sala.miembros.filter((m) => m.equipo === n);
          const mia = yo?.equipo === n;
          return (
            <button
              key={t.nombre}
              type="button"
              disabled={ocupado}
              aria-pressed={mia}
              onClick={() => void hacer("tribu", { tribu: mia ? null : n })}
              className={`rounded-xl border-2 p-2 text-left text-[12px] ${mia ? "shadow-lg" : "opacity-90"}`}
              style={{ borderColor: t.color, background: mia ? `${t.color}22` : undefined }}
              data-testid={`juegos-tribu-${n}`}
            >
              <span className="block text-[14px] font-black" style={{ color: t.color }}>
                <Ico e={t.icono ?? ""} /> {t.nombre}
              </span>
              <span className="block text-stone-600 dark:text-stone-300">{dentro.length ? dentro.map((m) => m.nombre).join(", ") : "nadie todavía"}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function InvitarPanel({ onAviso }: { onAviso: (t: string | null) => void }) {
  const [lista, setLista] = useState<InvitableSala[] | null>(null);
  const [enviadas, setEnviadas] = useState<Set<number>>(new Set());
  useEffect(() => {
    void pedirJuegos<{ invitables: InvitableSala[] }>("/invitables").then((r) => setLista(r.ok && r.data ? r.data.invitables : []));
  }, []);
  async function invitar(p: InvitableSala) {
    const r = await pedirJuegos<{ ok: boolean; nombre: string }>("/sala/invitar", { a: p.personajeId });
    if (r.ok) {
      setEnviadas((s) => new Set(s).add(p.personajeId));
      onAviso(null);
    } else onAviso(r.data?.message ?? "No se pudo invitar.");
  }
  return (
    <section className="rounded-2xl border border-emerald-300/70 bg-emerald-50/70 p-3 dark:border-emerald-700/50 dark:bg-emerald-950/30" aria-label="Invitar a tus amistades y a la gente de tu barrio" data-testid="juegos-invitables">
      <p className="mb-2 text-[13px] font-bold">Tus amistades y la gente de tu barrio que está en Jerusalén ahora:</p>
      {lista === null ? (
        <p className="flex items-center gap-2 text-[13px]">
          <Loader2 className="h-4 w-4 animate-spin" /> Buscando…
        </p>
      ) : !lista.length ? (
        <p className="text-[13px] text-stone-600 dark:text-stone-300">Nadie de tus amistades ni de tu barrio está en la ciudad ahora. Comparte el código para que entren.</p>
      ) : (
        <ul className="space-y-1.5">
          {lista.map((p) => (
            <li key={p.personajeId} className="flex items-center gap-2 rounded-xl bg-white px-3 py-1.5 text-[13px] dark:bg-stone-900">
              <span aria-hidden="true">{ICONO_CAMINO[p.camino]}</span>
              <span className="min-w-0 flex-1">
                <b>{p.nombre}</b>
                <span className="block text-[11px] text-stone-500">
                  {p.relacion === "vecino" ? "De tu barrio" : p.relacion === "amigo" ? "Amistad" : "Amistad · de tu barrio"} · {p.donde}
                </span>
              </span>
              <Button size="sm" variant="secondary" disabled={enviadas.has(p.personajeId)} onClick={() => void invitar(p)} data-testid={`juegos-invitar-${p.personajeId}`}>
                {enviadas.has(p.personajeId) ? (
                  <>
                    <Check className="h-4 w-4" /> Invitación enviada
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" /> Invitar
                  </>
                )}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

/** Las frases de la sala: las últimas que se dijeron y las que se pueden decir (sin texto libre). */
function Frases({ sala, compacto }: { sala: SalaVista; compacto?: boolean }) {
  const audio = useAudio();
  const [aviso, setAviso] = useState<string | null>(null);
  const [verVersos, setVerVersos] = useState(false);
  const fin = useRef<HTMLDivElement>(null);
  useEffect(() => {
    fin.current?.scrollIntoView({ block: "nearest" });
  }, [sala.frases.length]);
  async function decir(id: string) {
    audio?.click();
    const r = await juegosRed.accion("/sala/frase", { id });
    setAviso(r.ok ? null : r.message);
  }
  const lista = verVersos ? VERSICULOS_RAPIDOS.map((v) => ({ id: v.id, texto: `${v.texto} (${v.ref})` })) : FRASES_SALA;
  return (
    <section aria-label="Frases de la sala" className="space-y-2 rounded-2xl bg-stone-100 p-2 dark:bg-stone-900/70" data-testid="juegos-frases">
      {!!sala.frases.length && (
        <div className={`${compacto ? "max-h-20" : "max-h-32"} space-y-1 overflow-y-auto px-1`}>
          {sala.frases.map((f) => (
            <p key={f.n} className="text-[12px] leading-snug">
              <b>{f.de}:</b> {f.texto}
              {f.ref ? <span className="text-stone-500"> ({f.ref})</span> : null}
            </p>
          ))}
          <div ref={fin} />
        </div>
      )}
      <div className="flex flex-wrap gap-1">
        {lista.map((f) => (
          <button key={f.id} type="button" onClick={() => void decir(f.id)} className="rounded-full bg-white px-2.5 py-1 text-[12px] font-semibold text-stone-700 shadow-sm hover:bg-amber-50 active:scale-95 dark:bg-stone-800 dark:text-stone-200" data-testid={`juegos-frase-${f.id}`}>
            {f.texto}
          </button>
        ))}
        <button type="button" aria-pressed={verVersos} onClick={() => setVerVersos((v) => !v)} className="rounded-full bg-amber-200 px-2.5 py-1 text-[12px] font-bold text-amber-950 shadow-sm">
          {verVersos ? "Frases" : "📖 Versículos"}
        </button>
      </div>
      {aviso && <p className="px-1 text-[11px] font-semibold text-amber-800 dark:text-amber-300">{aviso}</p>}
    </section>
  );
}

// ================================================================ los juegos
function PartidaView({ sala }: { sala: SalaVista }) {
  const p = sala.partida;
  // la banda sonora pone la música de cada juego (los de mesa la piden ellos, con su nombre)
  useMusicaDeJuego(p && p.juego !== "mesa" ? p.juego : null);
  if (!p)
    return (
      <p className="flex items-center gap-2 text-sm">
        <Loader2 className="h-4 w-4 animate-spin" /> Preparando la partida…
      </p>
    );
  return (
    <>
      {p.juego === "esgrima" && <EsgrimaJuego p={p} />}
      {p.juego === "tribus" && <TribusJuego p={p} />}
      {p.juego === "quien" && <QuienJuego p={p} />}
      {p.juego === "carrera" && <CarreraPanel p={p} />}
      {p.juego === "muro" && <MuroPanel p={p} />}
      {p.juego === "mesa" && <MesaJuego p={p} />}
      <Frases sala={sala} compacto />
      <div className="flex justify-end">
        <Button variant="outline" size="sm" onClick={() => void juegosRed.accion("/sala/salir")} data-testid="juegos-dejar">
          <DoorOpen className="h-4 w-4" /> Dejar la partida
        </Button>
      </div>
    </>
  );
}

/** Responde y avisa (con su sonido) si no se pudo. */
function useResponder() {
  const audio = useAudio();
  const [aviso, setAviso] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);
  async function responder(opcion: string) {
    audio?.click();
    setEnviando(true);
    const r = await juegosRed.accion("/sala/responder", { opcion });
    setEnviando(false);
    setAviso(r.ok ? null : r.message);
  }
  return { responder, aviso, enviando };
}

/** Suena al cambiar de ronda o de fase (sin depender de que la respuesta sea buena: eso lo dice el servidor al revelar). */
function useSonidoDeFase(clave: string, bien: boolean | null) {
  const audio = useAudio();
  const antes = useRef(clave);
  useEffect(() => {
    if (antes.current === clave) return;
    antes.current = clave;
    if (bien === true) audio?.correct();
    else if (bien === false) audio?.wrong();
    else audio?.page();
  }, [clave, bien, audio]);
}

function EsgrimaJuego({ p }: { p: EsgrimaVista }) {
  useAhora();
  const { responder, aviso, enviando } = useResponder();
  const ms = juegosRed.restante(p.restanteMs);
  useSonidoDeFase(`${p.ronda}:${p.fase}`, p.fase === "revelar" && p.revelado ? (p.revelado.mia ? p.revelado.bien : null) : null);
  return (
    <div className="space-y-3" data-testid="juegos-esgrima">
      <div className="flex items-center justify-between text-[12px] font-bold text-stone-600 dark:text-stone-300">
        <span>
          Ronda {p.ronda} de {p.rondas}
        </span>
        <span className="tabular-nums">{p.fase === "pregunta" ? `${seg(ms)} s` : p.fase === "preparar" ? `Empieza en ${seg(ms)} s` : ""}</span>
      </div>
      {p.fase === "pregunta" && <Barra ms={ms} total={p.segundos * 1000} />}
      {p.fase === "preparar" && (
        <div className="rounded-2xl bg-gradient-to-b from-slate-800 to-slate-950 p-6 text-center text-white">
          <p className="text-4xl">⚔️</p>
          <p className="mt-2 font-serif text-xl font-bold">¡Desenvainen la espada del Espíritu!</p>
          <p className="text-sm text-slate-300">Primero sale una cita: hay que hallar su versículo. Después, al revés.</p>
        </div>
      )}
      {p.fase === "pregunta" && p.pregunta && (
        <>
          <div className="rounded-2xl border border-slate-300 bg-gradient-to-b from-slate-50 to-white p-4 text-center shadow-inner dark:from-slate-900 dark:to-stone-950 dark:border-slate-700">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">{p.pregunta.modo === "cita" ? "Halla el versículo de esta cita" : "Halla la cita de este versículo"}</p>
            <p className={`mt-1 font-serif ${p.pregunta.modo === "cita" ? "text-3xl font-black" : "text-[16px] italic leading-relaxed"} text-slate-900 dark:text-slate-50`} data-testid="juegos-esgrima-muestra">
              {p.pregunta.modo === "cita" ? p.pregunta.muestra : `«${p.pregunta.muestra}»`}
            </p>
          </div>
          {p.yaAcerto && <Aviso texto={`⚡ ¡${p.yaAcerto} ya lo encontró! Quedan unos segundos para responder.`} tono="info" />}
          <Opciones opciones={p.pregunta.opciones} mia={p.miRespuesta} deshabilitado={enviando} onElegir={(o) => void responder(o)} largo={p.pregunta.modo === "cita"} />
          {p.miRespuesta && (
            <p className="text-center text-[12px] text-stone-500">
              Respondiste. Esperando a los demás ({p.respondieron} {p.respondieron === 1 ? "respondió" : "respondieron"}).
            </p>
          )}
        </>
      )}
      {p.fase === "revelar" && p.revelado && (
        <div className="space-y-2" data-testid="juegos-esgrima-revelado">
          <Aviso
            texto={
              p.revelado.primero
                ? `🏅 Primero en hallarlo: ${p.revelado.primero}${p.revelado.puntos ? ` · tú: +${p.revelado.puntos}` : p.revelado.mia ? " · tu respuesta no era" : ""}`
                : "Nadie lo halló esta vez."
            }
            tono={p.revelado.bien ? "ok" : "info"}
          />
          <VerseBox text={p.revelado.verso.text} refName={p.revelado.verso.ref} />
          {!!p.revelado.aciertos.length && (
            <p className="text-[12px] text-stone-600 dark:text-stone-300">
              Acertaron: {p.revelado.aciertos.map((a) => `${a.nombre} (${(a.ms / 1000).toFixed(1)} s)`).join(" · ")}
            </p>
          )}
        </div>
      )}
      <Aviso texto={aviso} />
      <Tabla filas={p.tabla} />
    </div>
  );
}

function TribusJuego({ p }: { p: TribusVista }) {
  useAhora();
  const { responder, aviso, enviando } = useResponder();
  const ms = juegosRed.restante(p.restanteMs);
  const enTurno = TRIBUS_EQUIPOS[p.enTurno];
  const mia = p.miTribu != null ? TRIBUS_EQUIPOS[p.miTribu] : null;
  const gane = p.revelado?.gano && p.miTribu === p.revelado.gano.tribu;
  useSonidoDeFase(`${p.turno}:${p.fase}`, p.fase === "revelar" && p.revelado ? (p.revelado.gano ? !!gane : null) : null);
  return (
    <div className="space-y-3" data-testid="juegos-tribus-juego">
      <div className="grid grid-cols-2 gap-2 min-[520px]:grid-cols-4">
        {p.tribus.map((t) => (
          <div key={t.n} className={`rounded-xl border-2 p-2 text-[12px] ${t.n === p.enTurno && p.fase !== "revelar" ? "shadow-lg ring-2 ring-amber-300" : ""}`} style={{ borderColor: t.color, background: p.miTribu === t.n ? `${t.color}1f` : undefined }}>
            <p className="font-black" style={{ color: t.color }}>
              <Ico e={t.icono ?? ""} /> {t.nombre}
            </p>
            <p className="text-xl font-black tabular-nums">{t.puntos}</p>
            <p className="truncate text-[11px] text-stone-500">{t.miembros.join(", ")}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between text-[12px] font-bold text-stone-600 dark:text-stone-300">
        <span>
          Pregunta {p.turno} de {p.turnos}
          {mia && (
            <>
              {" "}
              · tu tribu: <Ico e={mia.icono ?? ""} /> {mia.nombre}
            </>
          )}
        </span>
        <span className="tabular-nums">{p.fase === "pregunta" || p.fase === "robo" ? `${seg(ms)} s` : p.fase === "preparar" ? `Empieza en ${seg(ms)} s` : ""}</span>
      </div>
      {(p.fase === "pregunta" || p.fase === "robo") && <Barra ms={ms} total={p.segundos * 1000} color={p.fase === "robo" ? "bg-violet-500" : "bg-amber-500"} />}
      {p.fase === "preparar" && (
        <div className="rounded-2xl bg-gradient-to-b from-amber-700 to-amber-900 p-6 text-center text-amber-50">
          <p className="text-4xl"><Ico e="🛡️" /></p>
          <p className="mt-2 font-serif text-xl font-bold">Empieza la tribu de {enTurno.nombre}</p>
          <p className="text-sm text-amber-200">Si una tribu falla, las demás pueden robarle la pregunta.</p>
        </div>
      )}
      {(p.fase === "pregunta" || p.fase === "robo") && p.pregunta && (
        <>
          <div className="rounded-2xl p-3 text-center text-white shadow" style={{ background: p.fase === "robo" ? "#5b3f8c" : enTurno.color }}>
            <p className="text-[11px] font-black uppercase tracking-widest opacity-90">
              {p.fase === "robo" ? `¡Robo! ${enTurno.icono} ${enTurno.nombre} ${p.pregunta.quitada ? "falló" : "no respondió"}: las demás tribus pueden robarla` : `Turno de ${enTurno.icono} ${enTurno.nombre}`}
            </p>
            <p className="mt-1 font-serif text-[17px] font-bold leading-snug" data-testid="juegos-tribus-pregunta">
              {p.pregunta.texto}
            </p>
          </div>
          <Opciones opciones={p.pregunta.opciones} mia={p.respondioMiTribu} deshabilitado={enviando || !p.puedoResponder} onElegir={(o) => void responder(o)} />
          <p className="text-center text-[12px] text-stone-500">
            {p.respondioMiTribu
              ? "Tu tribu ya respondió. Esperen…"
              : p.puedoResponder
                ? "La primera respuesta de tu tribu es la que vale: pónganse de acuerdo con las frases."
                : p.fase === "pregunta"
                  ? `Responde la tribu de ${enTurno.nombre}. Si falla, podrán robarla.`
                  : "Tu tribu no puede robar esta pregunta."}
          </p>
        </>
      )}
      {p.fase === "revelar" && p.revelado && (
        <div className="space-y-2" data-testid="juegos-tribus-revelado">
          <Aviso
            texto={
              p.revelado.gano
                ? `${TRIBUS_EQUIPOS[p.revelado.gano.tribu].icono} ${TRIBUS_EQUIPOS[p.revelado.gano.tribu].nombre} ${p.revelado.gano.como === "robo" ? "¡robó la pregunta! +50" : "acertó: +100"}`
                : "Nadie acertó esta vez."
            }
            tono={gane ? "ok" : "info"}
          />
          <p className="text-[13px]">
            <b>Respuesta:</b> {p.revelado.correcta}
          </p>
          <p className="text-[12px] leading-snug text-stone-600 dark:text-stone-300">
            {p.revelado.explica} <span className="font-semibold">({p.revelado.ref})</span>
          </p>
        </div>
      )}
      <Aviso texto={aviso} />
    </div>
  );
}

function QuienJuego({ p }: { p: QuienVista }) {
  useAhora();
  const { responder, aviso, enviando } = useResponder();
  const ms = juegosRed.restante(p.restanteMs);
  const vale = QUIEN.puntos[Math.max(1, p.pistas.length) - 1];
  useSonidoDeFase(`${p.ronda}:${p.fase}:${p.pistas.length}`, p.fase === "revelar" && p.revelado ? (p.revelado.mia ? p.revelado.bien : null) : null);
  return (
    <div className="space-y-3" data-testid="juegos-quien">
      <div className="flex items-center justify-between text-[12px] font-bold text-stone-600 dark:text-stone-300">
        <span>
          Personaje {p.ronda} de {p.rondas}
        </span>
        <span className="tabular-nums">
          {p.fase === "pistas" ? (p.pistas.length < p.totalPistas ? `Otra pista en ${seg(ms)} s` : `Quedan ${seg(ms)} s`) : p.fase === "preparar" ? `Empieza en ${seg(ms)} s` : ""}
        </span>
      </div>
      {p.fase === "preparar" && (
        <div className="rounded-2xl bg-gradient-to-b from-indigo-800 to-indigo-950 p-6 text-center text-white">
          <p className="text-4xl">🕵️</p>
          <p className="mt-2 font-serif text-xl font-bold">¿Quién soy?</p>
          <p className="text-sm text-indigo-200">Las pistas salen una por una. Con menos pistas, más puntos.</p>
        </div>
      )}
      {(p.fase === "pistas" || p.fase === "revelar") && (
        <ol className="space-y-1.5" data-testid="juegos-pistas">
          {p.pistas.map((t, i) => (
            <li key={i} className="flex gap-2 rounded-xl bg-indigo-50 px-3 py-2 text-[14px] leading-snug text-indigo-950 shadow-sm dark:bg-indigo-950/40 dark:text-indigo-50">
              <span className="font-black">{i + 1}.</span> <span>{t}</span>
            </li>
          ))}
        </ol>
      )}
      {p.fase === "pistas" && (
        <>
          <p className="text-center text-[12px] font-bold text-indigo-800 dark:text-indigo-300">{p.miRespuesta ? `Elegiste a ${p.miRespuesta}. Esperando a los demás (${p.respondieron}).` : `Si aciertas ahora: ${vale} puntos`}</p>
          <Opciones opciones={p.opciones} mia={p.miRespuesta} deshabilitado={enviando} onElegir={(o) => void responder(o)} />
        </>
      )}
      {p.fase === "revelar" && p.revelado && (
        <div className="space-y-2" data-testid="juegos-quien-revelado">
          <Aviso texto={`Era ${p.revelado.nombre}.${p.revelado.mia ? (p.revelado.bien ? ` ¡Acertaste! +${p.revelado.puntos}` : ` Elegiste a ${p.revelado.mia}.`) : ""}`} tono={p.revelado.bien ? "ok" : "info"} />
          <VerseBox text={p.revelado.verso.text} refName={p.revelado.verso.ref} />
          {!!p.revelado.aciertos.length && <p className="text-[12px] text-stone-600 dark:text-stone-300">Acertaron: {p.revelado.aciertos.map((a) => `${a.nombre} (con ${a.pistas} ${a.pistas === 1 ? "pista" : "pistas"}, +${a.puntos})`).join(" · ")}</p>}
        </div>
      )}
      <Aviso texto={aviso} />
      <Tabla filas={p.tabla} />
    </div>
  );
}

/** La carrera se corre en la ciudad: aquí, cómo va (la ventana se cierra sola al salir). */
function CarreraPanel({ p }: { p: CarreraVista }) {
  useAhora(500);
  const ms = juegosRed.restante(p.restanteMs);
  const sig = p.puntos[p.miSiguiente];
  return (
    <div className="space-y-3" data-testid="juegos-carrera">
      <div className="rounded-2xl bg-gradient-to-b from-orange-600 to-orange-800 p-4 text-center text-white">
        <p className="text-4xl">🏃</p>
        <p className="font-serif text-xl font-bold">{p.fase === "preparar" ? `¡Salen en ${seg(ms)}!` : p.miTiempo != null ? `¡Llegaste en ${(p.miTiempo / 1000).toFixed(1)} s!` : sig ? `Corre a: ${sig.nombre}` : "¡Corre!"}</p>
        <p className="text-sm text-orange-100">{p.fase === "corriendo" ? `Quedan ${reloj(ms)}` : "Sigue la luz dorada por la ciudad."}</p>
      </div>
      {p.saltoMio && <Aviso texto={`Saltaste de lugar: en la carrera se corre. Vuelve a ${p.miSiguiente === 0 ? "la salida, en el patio" : p.puntos[p.miSiguiente - 1].nombre} para seguir.`} />}
      <ol className="space-y-1 text-[13px]">
        {p.puntos.map((l) => (
          <li key={l.n} className={`flex items-center gap-2 rounded-lg px-2 py-1 ${l.n === p.miSiguiente ? "bg-amber-100 font-bold dark:bg-amber-900/40" : l.n < p.miSiguiente ? "text-stone-400 line-through" : ""}`}>
            <span className="w-5 text-center">{l.n < p.miSiguiente ? "✓" : l.n + 1}</span>
            {l.nombre}
          </li>
        ))}
      </ol>
      <ul className="space-y-1 text-[12px]">
        {p.corredores.map((c) => (
          <li key={c.pj} className={`flex justify-between rounded-lg px-2 py-0.5 ${c.yo ? "bg-amber-100 font-bold dark:bg-amber-900/40" : ""}`}>
            <span>{c.nombre}</span>
            <span className="tabular-nums">{c.tiempo != null ? `🏁 ${(c.tiempo / 1000).toFixed(1)} s` : `${c.siguiente} de ${p.puntos.length}`}</span>
          </li>
        ))}
      </ul>
      <Button className="w-full tpl-btn-oro" onClick={cerrar} data-testid="juegos-a-correr">
        Volver a la ciudad y correr
      </Button>
    </div>
  );
}

function MuroPanel({ p }: { p: MuroVista }) {
  useAhora(500);
  const ms = juegosRed.restante(p.restanteMs);
  const pct = Math.min(100, (p.puestas / Math.max(1, p.meta)) * 100);
  return (
    <div className="space-y-3" data-testid="juegos-muro">
      <div className="rounded-2xl bg-gradient-to-b from-stone-600 to-stone-800 p-4 text-center text-white">
        <p className="text-4xl"><Ico e="🧱" /></p>
        <p className="font-serif text-xl font-bold">{p.fase === "preparar" ? `¡A la obra en ${seg(ms)}!` : `${p.puestas} de ${p.meta} piedras`}</p>
        <p className="text-sm text-stone-200">{p.fase === "obra" ? `Quedan ${reloj(ms)} · ${p.llevo ? "llevas una piedra: ve al muro" : "toma una piedra de la cantera"}` : "Toma piedras de la cantera y llévalas al muro."}</p>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-stone-200 dark:bg-stone-700">
        <div className="h-full rounded-full bg-gradient-to-r from-amber-600 to-amber-400" style={{ width: `${pct}%` }} />
      </div>
      <ul className="space-y-1 text-[12px]">
        {p.aportes.map((a) => (
          <li key={a.pj} className={`flex justify-between rounded-lg px-2 py-0.5 ${a.yo ? "bg-amber-100 font-bold dark:bg-amber-900/40" : ""}`}>
            <span>{a.nombre}</span>
            <span className="tabular-nums"><Ico e="🪨" /> {a.n}</span>
          </li>
        ))}
      </ul>
      <Button className="w-full tpl-btn-oro" onClick={cerrar} data-testid="juegos-a-la-obra">
        Volver al patio y llevar piedras
      </Button>
    </div>
  );
}

// ================================================================ el resultado
function ResultadoView({ sala }: { sala: SalaVista }) {
  const audio = useAudio();
  const r = sala.resultado;
  const [ocupado, setOcupado] = useState(false);
  const yaSono = useRef(false);
  const gane = !!r?.puestos.find((x) => x.yo)?.gano;
  // al ganar, confeti (una vez, al llegar el resultado)
  const [confeti, setConfeti] = useState(0);
  useEffect(() => {
    if (!r || yaSono.current) return;
    yaSono.current = true;
    if (gane) {
      audio?.trumpet(true);
      setConfeti((x) => x + 1);
    } else audio?.page();
    // el golpe corto de la banda sonora al ganar o perder
    window.dispatchEvent(new CustomEvent("jer-golpe", { detail: gane ? "victoria" : "derrota" }));
  }, [r, gane, audio]);
  const prenda = useMemo(() => (r?.mio?.prenda ? PRENDAS_JUEGOS.find((p) => p.id === r.mio!.prenda) : null), [r]);
  if (!r) return null;
  async function hacer(ruta: string, body: unknown = {}) {
    audio?.click();
    setOcupado(true);
    await juegosRed.accion(`/sala/${ruta}`, body);
    setOcupado(false);
  }
  return (
    <div className="relative space-y-3" data-testid="juegos-resultado">
      <Confeti disparo={confeti} />
      <div className={`rounded-2xl p-4 text-center ${r.cumplido === false ? "bg-stone-200 dark:bg-stone-800" : "bg-gradient-to-b from-amber-300 to-amber-500 text-amber-950"}`}>
        <p className="text-4xl">
          <Ico e={r.juego === "muro" ? (r.cumplido ? "🧱" : "⏳") : r.juego === "mesa" && r.mesa ? (MESAS[r.mesa]?.icono ?? "🎲") : "🏆"} />
        </p>
        <p className="font-serif text-xl font-black" data-testid="juegos-resultado-titulo">
          {r.titulo}
        </p>
      </div>
      {r.juego === "mesa" && <MesaFinal r={r} />}
      {r.tribus && (
        <div className="grid grid-cols-2 gap-2 min-[520px]:grid-cols-4">
          {[...r.tribus].sort((a, b) => b.puntos - a.puntos).map((t) => (
            <div key={t.n} className="rounded-xl border-2 p-2 text-[12px]" style={{ borderColor: t.color }}>
              <p className="font-black" style={{ color: t.color }}>
                <Ico e={t.icono ?? ""} /> {t.nombre}
              </p>
              <p className="text-xl font-black tabular-nums">{t.puntos}</p>
              <p className="truncate text-[11px] text-stone-500">{t.miembros.join(", ")}</p>
            </div>
          ))}
        </div>
      )}
      <ol className="space-y-1" data-testid="juegos-puestos">
        {r.puestos.map((x, i) => (
          <li key={x.pj} className={`flex items-center gap-2 rounded-lg px-2 py-1 text-[13px] ${x.yo ? "bg-amber-100 font-bold dark:bg-amber-900/40" : ""}`}>
            <span className="w-6 text-center">{r.juego === "muro" ? (x.gano ? "🧱" : "·") : (MEDALLA[x.puesto - 1] ?? `${x.puesto}.`)}</span>
            <span className="min-w-0 flex-1 truncate">
              {x.nombre}
              {x.gano && r.juego !== "muro" && i === 0 ? " · ganó" : ""}
            </span>
            <span className="text-[12px] text-stone-600 dark:text-stone-300">{x.detalle}</span>
          </li>
        ))}
      </ol>
      {r.anotando ? (
        <p className="flex items-center gap-2 text-[13px]">
          <Loader2 className="h-4 w-4 animate-spin" /> Anotando los premios…
        </p>
      ) : (
        r.mio && (
          <div className="rounded-2xl bg-emerald-50 p-3 text-[13px] text-emerald-950 dark:bg-emerald-950/40 dark:text-emerald-50" data-testid="juegos-premio">
            {r.mio.sinPremio ? (
              <p>{r.mio.sinPremio}</p>
            ) : (
              <>
                {r.mio.practica ? (
                  <p data-testid="juegos-practica">
                    <Ico e="✨" /> <b>+{r.mio.gozo} de gozo</b> · partida de práctica con compañeros de la computadora (hasta 10 de gozo por día, sin copa ni prendas)
                    {r.mio.topeHoy ? ". Ya llegaste al tope de práctica de hoy." : "."}
                  </p>
                ) : (
                  <p>
                    <Ico e="✨" /> <b>+{r.mio.gozo} de gozo</b>
                    {r.mio.topeHoy ? ` (llegaste al tope de hoy en los juegos: ${GOZO_JUEGOS_DIA})` : ""} · 🏆 +{r.mio.copa} para la copa de tu barrio
                  </p>
                )}
                {prenda && (
                  <p className="mt-1 flex items-center gap-2 font-bold">
                    <span className="inline-block h-4 w-4 rounded-full border border-black/20" style={{ background: prenda.color }} aria-hidden="true" />
                    ¡Ganaste la {prenda.nombre}! Póntela en Tu casa → Adornos y ropa.
                  </p>
                )}
              </>
            )}
          </div>
        )
      )}
      <div className="flex flex-wrap gap-2">
        {sala.soyAnfitrion ? (
          <Button className="tpl-btn-oro" disabled={ocupado} onClick={() => void hacer("otra")} data-testid="juegos-otra">
            <RotateCcw className="h-4 w-4" /> Otra partida
          </Button>
        ) : (
          <p className="text-[12px] text-stone-500">Quien creó la sala puede empezar otra partida.</p>
        )}
        <Button variant="outline" disabled={ocupado} onClick={() => void hacer("salir")} data-testid="juegos-salir-fin">
          <DoorOpen className="h-4 w-4" /> Salir de la sala
        </Button>
      </div>
      <Frases sala={sala} compacto />
    </div>
  );
}

// ================================================================ en la ciudad: el botón, el aviso de abajo y la invitación
/** El botón del patio (en la columna de la derecha): con un punto si estás en una sala. */
export function BotonPatio() {
  const { city } = useContext(CiudadCtx);
  const { sala } = useJuegos();
  return (
    <button
      type="button"
      className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-b from-violet-300 to-violet-500 text-xl shadow-lg ring-2 ring-white/60 active:scale-95"
      onClick={() => {
        city?.audio.click();
        gameStore.push({ kind: "juegos" });
      }}
      title="El patio de los juegos: juega en grupo (G)"
      aria-label={sala ? `El patio de los juegos: estás en la sala ${sala.codigo}` : "El patio de los juegos"}
      data-testid="button-ciudad-juegos"
    >
      <span aria-hidden="true"><Ico e="🎲" /></span>
      {sala && <span className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full bg-emerald-500 ring-2 ring-white" />}
    </button>
  );
}

/** Abajo, mientras se camina: lo que toca en la carrera o el muro, o que la sala te espera. */
export function JuegoChip() {
  const { sala } = useJuegos();
  useAhora(500);
  if (!sala) return null;
  const p = sala.partida;
  const abrir = () => gameStore.push({ kind: "juegos" });
  const base = "pointer-events-auto flex max-w-[92vw] items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold text-white shadow-lg ring-1";
  if (sala.estado === "jugando" && p?.juego === "carrera") {
    const sig = p.puntos[p.miSiguiente];
    const ms = juegosRed.restante(p.restanteMs);
    return (
      <button type="button" onClick={abrir} className={`${base} bg-orange-700/95 ring-orange-300/60`} data-testid="ciudad-juego-chip" role="status">
        <span aria-hidden="true">🏃</span>
        <span className="min-w-0 truncate">
          {p.fase === "preparar"
            ? `La carrera sale en ${seg(ms)} s`
            : p.miTiempo != null
              ? `¡Llegaste en ${(p.miTiempo / 1000).toFixed(1)} s! Esperando a los demás · ${reloj(ms)}`
              : p.saltoMio
                ? `⚠️ Saltaste: vuelve a ${p.miSiguiente === 0 ? "la salida" : p.puntos[p.miSiguiente - 1].nombre}`
                : `${p.miSiguiente + 1} de ${p.puntos.length}: ${sig?.nombre ?? "¡corre!"} · ${reloj(ms)}`}
        </span>
      </button>
    );
  }
  if (sala.estado === "jugando" && p?.juego === "muro") {
    const ms = juegosRed.restante(p.restanteMs);
    return (
      <button type="button" onClick={abrir} className={`${base} bg-stone-700/95 ring-stone-300/60`} data-testid="ciudad-juego-chip" role="status">
        <span aria-hidden="true">{p.llevo ? "🪨" : "🧱"}</span>
        <span className="min-w-0 truncate">
          {p.fase === "preparar" ? `A la obra en ${seg(ms)} s` : `${p.puestas} de ${p.meta} · ${reloj(ms)} · ${p.llevo ? "lleva la piedra al muro" : "toma una piedra de la cantera"}`}
        </span>
      </button>
    );
  }
  const texto =
    sala.estado === "jugando" ? `${JUEGOS[sala.juego].icono} ${JUEGOS[sala.juego].nombre}: la partida sigue · Volver` : sala.estado === "fin" ? "🏆 Mira el resultado de la partida" : `🎲 Sala ${sala.codigo} · ${sala.miembros.length} ${sala.miembros.length === 1 ? "persona" : "personas"} · Abrir`;
  return (
    <button type="button" onClick={abrir} className={`${base} bg-violet-800/90 ring-violet-300/60`} data-testid="ciudad-juego-chip" role="status">
      <span className="min-w-0 truncate">{texto}</span>
    </button>
  );
}

/** Una invitación a jugar (arriba de la pantalla). */
export function InvitacionSalaAviso() {
  const { invitacion: inv } = useJuegos();
  const { city } = useContext(CiudadCtx);
  const [restan, setRestan] = useState(0);
  const [ocupado, setOcupado] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!inv) return;
    const paso = () => {
      setRestan(Math.max(0, Math.ceil((inv.hasta - Date.now()) / 1000)));
      if (Date.now() > inv.hasta) juegosRed.cerrarInvitacion();
    };
    const t = setInterval(paso, 500);
    paso();
    return () => clearInterval(t);
  }, [inv]);
  useEffect(() => {
    if (inv) city?.audio.page();
    setError(null);
  }, [inv, city]);
  if (!inv) return null;
  async function unirme() {
    setOcupado(true);
    const r = await juegosRed.accion("/sala/unirme", { codigo: inv!.codigo });
    setOcupado(false);
    if (!r.ok) {
      setError(r.message);
      return;
    }
    juegosRed.cerrarInvitacion();
    if (gameStore.getSnapshot().modal?.kind !== "juegos") gameStore.push({ kind: "juegos" });
  }
  return (
    <div className="pointer-events-auto absolute inset-x-2 top-2 z-[64] mx-auto max-w-md rounded-2xl border border-violet-300/70 bg-gradient-to-b from-violet-900 to-violet-950 p-3 text-violet-50 shadow-2xl shadow-black/60" data-testid="ciudad-invitacion-juego" role="dialog" aria-label={`${inv.de} te invita a jugar`}>
      <div className="flex items-start gap-2">
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-500 text-xl shadow-lg" aria-hidden="true">
          <Ico e={JUEGOS[inv.juego].icono ?? ""} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-violet-200">Te invitan a jugar · {restan} s</p>
          <p className="text-[13px] leading-snug">
            <b>
              {ICONO_CAMINO[inv.camino]} {inv.de}
            </b>{" "}
            te invita a «{JUEGOS[inv.juego].nombre}» en el patio de los juegos (sala {inv.codigo}).
          </p>
          {error && <p className="mt-1 text-[12px] font-semibold text-amber-200">{error}</p>}
        </div>
      </div>
      <div className="mt-2 flex justify-end gap-2">
        <Button size="sm" variant="secondary" onClick={() => juegosRed.cerrarInvitacion()} data-testid="ciudad-invitacion-juego-no">
          Ahora no
        </Button>
        <Button size="sm" className="tpl-btn-oro" disabled={ocupado} onClick={() => void unirme()} data-testid="ciudad-invitacion-juego-si">
          {ocupado ? <Loader2 className="h-4 w-4 animate-spin" /> : <Users className="h-4 w-4" />} Unirme
        </Button>
      </div>
    </div>
  );
}
