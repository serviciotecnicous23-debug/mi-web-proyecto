/**
 * «¿Quién es sabio?» (shared/sabio.ts): el concurso de la casa de la sabiduría, en pantalla completa. Un
 * escenario oscuro con luces, el presentador (Etán ezraíta), las quince gradas, el reloj, los comodines, la
 * última palabra con suspenso, la respuesta con su cita, las tablas y los trajes de los sabios.
 * El servidor corrige: aquí nunca está la respuesta antes de contestar.
 */
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Crown, ListOrdered, Loader2, Lock, ScrollText, Shirt, Trophy, Volume2, VolumeX, X } from "lucide-react";
import { Portrait } from "./Portrait";
import { gameStore } from "./store";
import { CiudadCtx } from "./CiudadUI";
import { sonido } from "./sabio-sonido";
import {
  COMODINES, ENTRADAS_DIA, FRASES_PRESENTADOR, GOZO_SABIO_DIA, GRADAS, GRADAS_SEGURAS, NOMBRE_CONCURSO, ORDEN_COMODINES, PREMIO_SEMANA, PUNTOS_GRADA,
  TITULOS, TRAJES_SABIOS, VERSO_CASA, VERSO_CONCURSO, VERSO_TRAJES, canticoGrada, segundosGrada,
  type Comodin, type FilaTabla, type FinPartida, type PartidaVista, type PreguntaVista, type RespuestaSabio, type SabioEstado,
} from "@shared/sabio";

const API = "/api/jerusalen/sabio";
async function pedir<T>(path: string, body?: unknown): Promise<{ ok: boolean; status: number; data: (T & { message?: string }) | null }> {
  try {
    const res = await fetch(`${API}${path}`, {
      method: body === undefined && path === "" ? "GET" : "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    return { ok: res.ok, status: res.status, data: (await res.json().catch(() => null)) as (T & { message?: string }) | null };
  } catch {
    return { ok: false, status: 0, data: null };
  }
}

const miles = (n: number) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const LETRAS = ["A", "B", "C", "D"];
const azar = <T,>(l: T[]) => l[Math.floor(Math.random() * l.length)];

type Fase = "cargando" | "portada" | "entre" | "pregunta" | "confirmar" | "suspenso" | "revelado" | "fin" | "error";
type Revelado = { elegida: number; correcta: number; bien: boolean; explica: string; ref: string; respuesta: string };

export function SabioView() {
  const { city } = useContext(CiudadCtx);
  const [fase, setFase] = useState<Fase>("cargando");
  const [estado, setEstado] = useState<SabioEstado | null>(null);
  const [partida, setPartida] = useState<PartidaVista | null>(null);
  // la pregunta que se ve (sigue a la vista con su respuesta aunque el servidor ya la cerró)
  const [qVista, setQVista] = useState<PreguntaVista | null>(null);
  const [elegida, setElegida] = useState<number | null>(null);
  const [revelado, setRevelado] = useState<Revelado | null>(null);
  const [fin, setFin] = useState<FinPartida | null>(null);
  const [dice, setDice] = useState<string>(FRASES_PRESENTADOR.bienvenida);
  const [error, setError] = useState<string | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);
  const [ocupado, setOcupado] = useState(false);
  const [conSonido, setConSonido] = useState(sonido.activo());
  const [verEscalera, setVerEscalera] = useState(false);
  const [retirar, setRetirar] = useState(false);
  const [restan, setRestan] = useState(0);
  const pararSuspenso = useRef<() => void>(() => undefined);
  const finTiempo = useRef<number>(0);
  const vivo = useRef(true);

  const cargar = useCallback(async () => {
    const r = await pedir<SabioEstado>("");
    if (!vivo.current) return;
    if (!r.ok || !r.data) {
      setError(r.data?.message || "No se pudo abrir la casa de la sabiduría. Revisa tu conexión.");
      setFase("error");
      return;
    }
    setEstado(r.data);
    if (r.data.partida) {
      setPartida(r.data.partida);
      if (r.data.partida.pregunta) mostrarPregunta(r.data.partida, true);
      else {
        setDice(`Vas por la grada ${r.data.partida.grada}. ¿Seguimos subiendo?`);
        setFase("entre");
      }
    } else setFase("portada");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    vivo.current = true;
    void cargar();
    sonido.entrada();
    return () => {
      vivo.current = false;
      pararSuspenso.current();
    };
  }, [cargar]);

  // el reloj de la pregunta
  useEffect(() => {
    if (fase !== "pregunta" && fase !== "confirmar") return;
    let ultimo = -1;
    const t = setInterval(() => {
      const s = Math.max(0, Math.ceil((finTiempo.current - Date.now()) / 1000));
      setRestan(s);
      if (s !== ultimo && s > 0 && s <= 10) sonido.tic(s <= 5);
      ultimo = s;
      if (finTiempo.current - Date.now() < -3500) {
        clearInterval(t);
        void seAcabo();
      }
    }, 250);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fase, qVista?.texto]);

  function mostrarPregunta(p: PartidaVista, retomada = false) {
    const q = p.pregunta!;
    finTiempo.current = Date.now() + q.restantes * 1000;
    setRestan(q.restantes);
    setPartida(p);
    setQVista(q);
    setElegida(null);
    setRevelado(null);
    setRetirar(false);
    setDice(
      retomada
        ? `Seguimos en la grada ${q.n}. El reloj no se detuvo…`
        : `Grada ${q.n}, el ${canticoGrada(q.n)}. Por ${miles(PUNTOS_GRADA[q.n])} puntos de sabiduría…`,
    );
    pararSuspenso.current();
    pararSuspenso.current = sonido.suspenso(q.n);
    setFase("pregunta");
  }

  async function empezar() {
    if (ocupado) return;
    setOcupado(true);
    setAviso(null);
    const r = await pedir<{ partida: PartidaVista }>("/empezar", {});
    if (!r.ok || !r.data?.partida) {
      setOcupado(false);
      setAviso(r.data?.message || "No se pudo empezar. Revisa tu conexión.");
      return;
    }
    setFin(null);
    setQVista(null);
    setPartida(r.data.partida);
    // una partida nueva gasta una entrada del día
    if (r.data.partida.grada === 0 && !r.data.partida.pregunta) setEstado((e) => (e ? { ...e, yo: { ...e.yo, entradasHoy: e.yo.entradasHoy + 1 } } : e));
    if (r.data.partida.pregunta) {
      setOcupado(false);
      mostrarPregunta(r.data.partida, true);
      return;
    }
    await siguiente();
    setOcupado(false);
  }

  async function siguiente() {
    const r = await pedir<{ partida: PartidaVista }>("/siguiente", {});
    if (!r.ok || !r.data?.partida?.pregunta) {
      setAviso(r.data?.message || "No se pudo traer la pregunta. Revisa tu conexión.");
      return;
    }
    mostrarPregunta(r.data.partida);
  }

  function elegir(i: number) {
    if (fase !== "pregunta" && fase !== "confirmar") return;
    if (qVista?.quitadas.includes(i)) return;
    city?.audio.click();
    setElegida(i);
    setDice(FRASES_PRESENTADOR.ultima);
    setFase("confirmar");
  }

  async function confirmar() {
    if (elegida === null || !qVista) return;
    const q = qVista;
    setFase("suspenso");
    sonido.fijar();
    setDice("…");
    const espera = new Promise((r) => setTimeout(r, Math.min(2800, 900 + q.n * 130)));
    const [r] = await Promise.all([pedir<RespuestaSabio>("/responder", { opcion: q.opciones[elegida] }), espera]);
    if (!vivo.current) return;
    pararSuspenso.current();
    if (!r.ok || !r.data) {
      setAviso(r.data?.message || "No se pudo enviar la respuesta. Revisa tu conexión.");
      setFase("pregunta");
      return;
    }
    revelar(r.data, elegida);
  }

  async function seAcabo() {
    if (!qVista) return;
    pararSuspenso.current();
    setFase("suspenso");
    setDice(FRASES_PRESENTADOR.tiempo);
    const r = await pedir<RespuestaSabio>("/responder", { opcion: "" });
    if (!vivo.current || !r.data) return;
    // se acabó el tiempo: no cuenta lo que tenía marcado; solo se muestra la respuesta correcta
    if (r.data.fin) revelar(r.data, -1);
  }

  function revelar(d: RespuestaSabio, elegidaI: number) {
    const opciones = qVista?.opciones ?? [];
    const correcta = opciones.indexOf(d.respuesta);
    setRevelado({ elegida: elegidaI, correcta, bien: d.correcta, explica: d.explica, ref: d.ref, respuesta: d.respuesta });
    const subio = d.partida?.grada ?? (d.fin?.estado === "gano" ? GRADAS : 0);
    if (d.correcta) {
      if (d.fin?.estado === "gano") {
        sonido.ganar();
        setDice("¡Subiste las quince gradas!");
      } else if ((GRADAS_SEGURAS as readonly number[]).includes(subio)) {
        sonido.segura();
        setDice(FRASES_PRESENTADOR.segura);
      } else {
        sonido.bien();
        setDice(azar(FRASES_PRESENTADOR.bien));
      }
    } else {
      sonido.mal();
      setDice(elegidaI < 0 ? FRASES_PRESENTADOR.tiempo : FRASES_PRESENTADOR.mal);
    }
    if (d.partida) setPartida(d.partida);
    if (d.fin) {
      setFin(d.fin);
      city?.ponerGozo(d.fin.gozoTotal);
    }
    setFase("revelado");
  }

  async function comodin(tipo: Comodin) {
    if (ocupado || fase !== "pregunta") return;
    setOcupado(true);
    setAviso(null);
    const r = await pedir<{ partida: PartidaVista }>("/comodin", { tipo });
    setOcupado(false);
    if (!r.ok || !r.data?.partida) {
      setAviso(r.data?.message || "No se pudo usar el comodín.");
      return;
    }
    sonido.comodin();
    const p = r.data.partida;
    if (tipo === "rollo") {
      mostrarPregunta(p);
      setDice("Desenrollamos otro rollo: aquí va otra pregunta de la misma grada.");
      return;
    }
    finTiempo.current = Date.now() + (p.pregunta?.restantes ?? 0) * 1000;
    setPartida(p);
    setQVista(p.pregunta);
    setDice(
      tipo === "aventador"
        ? "El aventador limpia la era: se van dos respuestas."
        : tipo === "ancianos"
          ? "Los ancianos de la puerta dan su consejo…"
          : "Husai, el amigo del rey, te manda decir…",
    );
  }

  async function retirarse() {
    setOcupado(true);
    const r = await pedir<{ fin: FinPartida }>("/retirarse", {});
    setOcupado(false);
    setRetirar(false);
    if (!r.ok || !r.data?.fin) {
      setAviso(r.data?.message || "No se pudo retirar.");
      return;
    }
    pararSuspenso.current();
    sonido.segura();
    setFin(r.data.fin);
    city?.ponerGozo(r.data.fin.gozoTotal);
    setDice(`${FRASES_PRESENTADOR.retiro.text} (${FRASES_PRESENTADOR.retiro.ref})`);
    setFase("fin");
  }

  async function volverAPortada() {
    setFin(null);
    setPartida(null);
    setQVista(null);
    setFase("cargando");
    setDice(FRASES_PRESENTADOR.bienvenida);
    await cargar();
  }

  const q = qVista;
  const n = q?.n ?? (partida ? partida.grada + 1 : 1);
  const luces = fase === "suspenso" ? "opacity-40" : fase === "revelado" && revelado ? (revelado.bien ? "opacity-100" : "opacity-60") : "opacity-80";
  return (
    <div
      className="sabio-escena pointer-events-auto relative flex h-full w-full flex-col overflow-hidden text-amber-50"
      style={{ paddingTop: "var(--tpl-st, 0px)", paddingBottom: "var(--tpl-sb, 0px)", paddingLeft: "var(--tpl-sl, 0px)", paddingRight: "var(--tpl-sr, 0px)" }}
      data-testid="sabio"
    >
      <style>{ESTILOS}</style>
      {/* el escenario: fondo, columnas y luces */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,#3a2a7c_0%,#170f38_42%,#05030d_100%)]" />
      <div className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${luces}`}>
        <div className="sabio-foco sabio-foco-a" />
        <div className="sabio-foco sabio-foco-b" />
      </div>
      <Columnas />
      {fase === "revelado" && revelado?.bien && <div className="sabio-destello pointer-events-none absolute inset-0" />}

      {/* cabecera */}
      <div className="relative z-10 flex items-center justify-between gap-2 px-3 pt-2">
        <div className="min-w-0">
          <p className="sabio-titulo truncate font-serif text-lg font-black leading-none sm:text-2xl" data-testid="sabio-titulo">{NOMBRE_CONCURSO}</p>
          <p className="truncate text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-200/70">La casa de la sabiduría</p>
        </div>
        <div className="flex shrink-0 gap-1.5">
          <button
            type="button"
            className="rounded-full bg-white/10 p-2 hover:bg-white/20"
            onClick={() => setConSonido(sonido.alternar())}
            aria-label={conSonido ? "Silenciar el concurso" : "Activar el sonido"}
            data-testid="sabio-sonido"
          >
            {conSonido ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>
          <button type="button" className="rounded-full bg-white/10 p-2 hover:bg-white/20" onClick={() => gameStore.close()} aria-label="Salir de la casa de la sabiduría" data-testid="sabio-cerrar">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="relative z-10 min-h-0 flex-1 overflow-y-auto px-3 pb-3">
        {fase === "cargando" && (
          <div className="flex h-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-amber-300" />
          </div>
        )}
        {fase === "error" && <p className="mt-10 rounded-xl bg-red-950/60 p-4 text-center text-sm">{error}</p>}
        {fase === "portada" && estado && <Portada estado={estado} onEmpezar={() => void empezar()} ocupado={ocupado} aviso={aviso} dice={dice} />}
        {(fase === "entre" || fase === "pregunta" || fase === "confirmar" || fase === "suspenso" || fase === "revelado") && partida && (
          <div className="mx-auto flex max-w-4xl gap-4 pt-2">
            <div className="min-w-0 flex-1 space-y-2.5">
              <Presentador dice={dice} />
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-amber-200/80" data-testid="sabio-grada">
                    Grada {n} de {GRADAS} · {canticoGrada(n)}
                  </p>
                  <p className="text-sm font-black text-amber-100">
                    Por {miles(PUNTOS_GRADA[Math.min(GRADAS, n)])} <span className="font-semibold text-amber-200/70">· seguro {miles(partida.seguro)}</span>
                  </p>
                </div>
                {q && (fase === "pregunta" || fase === "confirmar") && <Reloj restan={restan} total={q.segundos} />}
                <button
                  type="button"
                  className="shrink-0 rounded-full bg-white/10 px-2.5 py-1.5 text-[11px] font-bold hover:bg-white/20 lg:hidden"
                  onClick={() => setVerEscalera(true)}
                  data-testid="sabio-ver-escalera"
                >
                  <ListOrdered className="mr-1 inline h-3.5 w-3.5" />
                  Gradas
                </button>
              </div>
              <MiniEscalera grada={partida.grada} />
              {fase === "entre" && (
                <button type="button" className="sabio-boton w-full" onClick={() => void siguiente()} data-testid="sabio-seguir">
                  Subir a la grada {partida.grada + 1}
                </button>
              )}
              {q && (
                <>
                  <div className="sabio-pregunta rounded-2xl px-4 py-3.5 text-center font-serif text-[16px] font-semibold leading-snug sm:text-lg" data-testid="sabio-pregunta">
                    {q.texto}
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {q.opciones.map((o, i) => {
                      const quitada = q.quitadas.includes(i);
                      const esElegida = elegida === i;
                      const esCorrecta = revelado?.correcta === i;
                      const esMala = revelado && revelado.elegida === i && !revelado.bien;
                      const clase = revelado
                        ? esCorrecta
                          ? "sabio-op-bien"
                          : esMala
                            ? "sabio-op-mal"
                            : "sabio-op opacity-60"
                        : esElegida
                          ? fase === "suspenso"
                            ? "sabio-op-fija"
                            : "sabio-op-elegida"
                          : "sabio-op";
                      return (
                        <button
                          key={i}
                          type="button"
                          disabled={quitada || !!revelado || fase === "suspenso"}
                          onClick={() => elegir(i)}
                          className={`flex min-h-[44px] items-center gap-2 rounded-xl px-3 py-2 text-left text-[14px] font-semibold transition ${clase} ${quitada ? "invisible" : ""}`}
                          data-testid={`sabio-opcion-${i}`}
                        >
                          <span className="font-black text-amber-300">{LETRAS[i]}:</span>
                          <span className="min-w-0 flex-1">{o}</span>
                          {partida.amigo?.opcion === i && !revelado && <span className="rounded-full bg-sky-400/30 px-1.5 text-[10px] font-bold text-sky-100">Husai</span>}
                        </button>
                      );
                    })}
                  </div>
                  {partida.ancianos && !revelado && <Ancianos pct={partida.ancianos} quitadas={q.quitadas} />}
                  {partida.amigo && !revelado && (
                    <div className="flex items-start gap-2 rounded-xl bg-sky-950/60 p-2.5 text-[13px]" data-testid="sabio-amigo">
                      <Portrait who="husai" size={36} />
                      <p>
                        <b>{partida.amigo.quien}:</b> {partida.amigo.dice}
                      </p>
                    </div>
                  )}
                  {fase === "confirmar" && (
                    <div className="grid grid-cols-2 gap-2" data-testid="sabio-confirmar">
                      <button type="button" className="sabio-boton" onClick={() => void confirmar()} data-testid="sabio-si">
                        Sí, es mi última palabra
                      </button>
                      <button type="button" className="rounded-xl bg-white/10 px-3 py-2.5 text-sm font-bold hover:bg-white/20" onClick={() => { setElegida(null); setDice("Piénsalo bien…"); setFase("pregunta"); }}>
                        Déjame pensar
                      </button>
                    </div>
                  )}
                  {fase === "suspenso" && <p className="text-center text-sm font-bold italic text-amber-200/90">El pueblo contiene el aliento…</p>}
                  {revelado && (
                    <div className={`rounded-2xl p-3 text-[13px] leading-snug ${revelado.bien ? "bg-emerald-950/60" : "bg-red-950/60"}`} data-testid="sabio-explica">
                      <p className="font-black">{revelado.bien ? "¡Correcto!" : `La respuesta era: ${revelado.respuesta}`}</p>
                      <p className="mt-1 text-amber-50/90">
                        {revelado.explica} <span className="font-semibold text-amber-300">({revelado.ref})</span>
                      </p>
                    </div>
                  )}
                  {revelado && (
                    <button
                      type="button"
                      className="sabio-boton w-full"
                      onClick={() => (fin ? setFase("fin") : void siguiente())}
                      data-testid="sabio-siguiente"
                    >
                      {fin ? "Ver tu resultado" : `Subir a la grada ${(partida?.grada ?? 0) + 1}`}
                    </button>
                  )}
                  {(fase === "pregunta" || fase === "confirmar") && (
                    <div className="space-y-2 pt-1">
                      <div className="grid grid-cols-4 gap-1.5">
                        {ORDEN_COMODINES.map((c) => {
                          const usado = partida.usados.includes(c);
                          const cerrado = c === "rollo" && !partida.rolloAbierto;
                          return (
                            <button
                              key={c}
                              type="button"
                              disabled={usado || cerrado || ocupado || fase !== "pregunta"}
                              onClick={() => void comodin(c)}
                              className={`relative flex flex-col items-center gap-0.5 rounded-xl px-1 py-1.5 text-[10px] font-bold leading-tight ${usado || cerrado ? "bg-white/5 text-amber-50/40" : "bg-white/10 hover:bg-white/20"}`}
                              title={`${COMODINES[c].nombre}: ${COMODINES[c].texto}`}
                              data-testid={`sabio-comodin-${c}`}
                            >
                              <span className={`text-xl leading-none ${usado ? "grayscale" : ""}`}>{COMODINES[c].icono}</span>
                              <span className="line-clamp-2 text-center">{COMODINES[c].nombre}</span>
                              {usado && <span className="absolute inset-x-2 top-1/2 h-0.5 -rotate-12 bg-red-400/80" />}
                              {cerrado && <Lock className="absolute right-1 top-1 h-3 w-3" />}
                            </button>
                          );
                        })}
                      </div>
                      {partida.grada > 0 && !retirar && (
                        <button type="button" className="w-full rounded-xl bg-white/5 py-2 text-xs font-bold text-amber-100/90 hover:bg-white/10" onClick={() => setRetirar(true)} data-testid="sabio-retirarse">
                          Retirarme con {miles(partida.puntos)} puntos
                        </button>
                      )}
                      {retirar && (
                        <div className="grid grid-cols-2 gap-2 rounded-xl bg-white/5 p-2 text-xs">
                          <p className="col-span-2 text-center">¿Te retiras con {miles(partida.puntos)} puntos de sabiduría?</p>
                          <button type="button" className="sabio-boton py-2 text-xs" disabled={ocupado} onClick={() => void retirarse()} data-testid="sabio-retirarse-si">
                            Sí, me retiro
                          </button>
                          <button type="button" className="rounded-xl bg-white/10 py-2 font-bold" onClick={() => setRetirar(false)}>
                            Sigo jugando
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
              {aviso && <p className="rounded-xl bg-red-950/70 px-3 py-2 text-center text-xs">{aviso}</p>}
            </div>
            <div className="hidden w-56 shrink-0 lg:block">
              <Escalera grada={partida.grada} />
            </div>
          </div>
        )}
        {fase === "fin" && fin && <Fin fin={fin} estado={estado} onOtra={() => void empezar()} onPortada={() => void volverAPortada()} ocupado={ocupado} aviso={aviso} />}
      </div>

      {verEscalera && partida && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/70 p-4" onClick={() => setVerEscalera(false)}>
          <div className="w-full max-w-xs" onClick={(e) => e.stopPropagation()}>
            <Escalera grada={partida.grada} />
            <button type="button" className="mt-2 w-full rounded-xl bg-white/10 py-2 text-sm font-bold" onClick={() => setVerEscalera(false)}>
              Volver a la pregunta
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ================================================================ piezas del escenario
function Columnas() {
  // las siete columnas de la casa de la sabiduría (Proverbios 9:1), en silueta al fondo
  return (
    <svg className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 w-full opacity-[0.16]" viewBox="0 0 700 300" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <rect x="0" y="40" width="700" height="18" fill="#e9c46a" />
      <path d="M40 40 L350 0 L660 40Z" fill="#e9c46a" />
      {Array.from({ length: 7 }, (_, i) => {
        const x = 60 + i * 96;
        return (
          <g key={i} fill="#e9c46a">
            <rect x={x - 4} y="58" width="44" height="10" />
            <rect x={x} y="68" width="36" height="210" />
            <rect x={x - 6} y="278" width="48" height="12" />
          </g>
        );
      })}
    </svg>
  );
}

function Presentador({ dice }: { dice: string }) {
  return (
    <div className="flex items-start gap-2.5" data-testid="sabio-presentador">
      <Portrait who="etan" size={44} />
      <div className="relative min-w-0 flex-1 rounded-2xl rounded-tl-sm bg-white/10 px-3 py-2 text-[13px] leading-snug shadow-inner backdrop-blur-sm">
        <p className="text-[10px] font-bold uppercase tracking-wider text-amber-300">Etán ezraíta</p>
        <p className="font-serif italic">{dice}</p>
      </div>
    </div>
  );
}

function Reloj({ restan, total }: { restan: number; total: number }) {
  const r = 18;
  const c = 2 * Math.PI * r;
  const frac = Math.max(0, Math.min(1, restan / Math.max(1, total)));
  const color = restan <= 5 ? "#f87171" : restan <= 10 ? "#fbbf24" : "#fde68a";
  return (
    <div className={`relative h-12 w-12 shrink-0 ${restan <= 5 ? "sabio-latido" : ""}`} aria-label={`Quedan ${restan} segundos`} data-testid="sabio-reloj">
      <svg viewBox="0 0 44 44" className="h-12 w-12 -rotate-90">
        <circle cx="22" cy="22" r={r} fill="rgba(0,0,0,.35)" stroke="rgba(255,255,255,.15)" strokeWidth="4" />
        <circle cx="22" cy="22" r={r} fill="none" stroke={color} strokeWidth="4" strokeDasharray={c} strokeDashoffset={c * (1 - frac)} strokeLinecap="round" style={{ transition: "stroke-dashoffset .25s linear" }} />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-sm font-black tabular-nums" style={{ color }}>
        {restan}
      </span>
    </div>
  );
}

function MiniEscalera({ grada }: { grada: number }) {
  return (
    <div className="flex gap-0.5 lg:hidden" aria-hidden="true">
      {Array.from({ length: GRADAS }, (_, i) => {
        const g = i + 1;
        const segura = (GRADAS_SEGURAS as readonly number[]).includes(g) || g === GRADAS;
        return (
          <div
            key={g}
            className={`h-1.5 flex-1 rounded-full ${g <= grada ? "bg-amber-300" : g === grada + 1 ? "sabio-latido bg-amber-500" : segura ? "bg-amber-200/30" : "bg-white/15"}`}
          />
        );
      })}
    </div>
  );
}

function Escalera({ grada }: { grada: number }) {
  return (
    <ol className="space-y-0.5 rounded-2xl bg-black/30 p-2 backdrop-blur-sm" data-testid="sabio-escalera">
      {Array.from({ length: GRADAS }, (_, i) => GRADAS - i).map((g) => {
        const segura = (GRADAS_SEGURAS as readonly number[]).includes(g) || g === GRADAS;
        const actual = g === grada + 1;
        const pasada = g <= grada;
        return (
          <li
            key={g}
            className={`flex items-center justify-between rounded-lg px-2 py-[3px] text-[12px] tabular-nums ${actual ? "bg-amber-400 font-black text-amber-950" : pasada ? "text-amber-200/60" : segura ? "font-black text-amber-200" : "text-amber-50/80"}`}
          >
            <span>
              {g} {pasada ? "✓" : ""}
            </span>
            <span>{miles(PUNTOS_GRADA[g])}</span>
          </li>
        );
      })}
    </ol>
  );
}

function Ancianos({ pct, quitadas }: { pct: number[]; quitadas: number[] }) {
  return (
    <div className="rounded-xl bg-black/30 p-2.5" data-testid="sabio-ancianos">
      <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-200/80">👴 Lo que responde el pueblo</p>
      <div className="flex h-24 items-end gap-2">
        {pct.map((p, i) => (
          <div key={i} className={`flex flex-1 flex-col items-center gap-1 ${quitadas.includes(i) ? "opacity-20" : ""}`}>
            <span className="text-[11px] font-black">{p}%</span>
            <div className="sabio-barra w-full rounded-t-md bg-gradient-to-t from-amber-600 to-amber-300" style={{ height: `${Math.max(4, p * 0.7)}px` }} />
            <span className="text-[11px] font-black text-amber-300">{LETRAS[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ================================================================ portada
function Portada({ estado, onEmpezar, ocupado, aviso, dice }: { estado: SabioEstado; onEmpezar: () => void; ocupado: boolean; aviso: string | null; dice: string }) {
  const [tab, setTab] = useState<"semana" | "siempre" | "trajes" | "reglas">("semana");
  const y = estado.yo;
  const quedan = Math.max(0, ENTRADAS_DIA - y.entradasHoy);
  return (
    <div className="mx-auto max-w-2xl space-y-3 pt-2" data-testid="sabio-portada">
      {estado.premioSemana && (
        <div className="rounded-2xl bg-gradient-to-r from-amber-300 to-amber-500 p-3 text-center text-sm font-black text-amber-950 shadow-lg" data-testid="sabio-premio-semana">
          🏆 Quedaste en el puesto {estado.premioSemana.puesto} de la semana pasada: +{estado.premioSemana.gozo} de gozo
        </div>
      )}
      <Presentador dice={dice} />
      <div className="sabio-pregunta rounded-2xl p-3 text-center">
        <p className="font-serif text-[13px] italic text-amber-100/90">«{VERSO_CASA.text}»</p>
        <p className="text-[11px] font-semibold text-amber-300">{VERSO_CASA.ref}</p>
      </div>
      <div className="grid grid-cols-2 gap-2 text-center sm:grid-cols-4" data-testid="sabio-yo">
        <Dato titulo="Título" valor={y.titulo ? `${y.titulo.icono} ${y.titulo.nombre}` : "—"} />
        <Dato titulo="Mejor grada" valor={`${y.mejor} de ${GRADAS}`} />
        <Dato titulo="Victorias" valor={String(y.ganadas)} />
        <Dato titulo="Sabiduría" valor={miles(y.total)} />
      </div>
      {y.siguiente && <p className="text-center text-[11px] text-amber-100/70">Siguiente título: {y.siguiente.icono} {y.siguiente.nombre} — {y.siguiente.requisito.toLowerCase()}.</p>}
      <button type="button" className="sabio-boton w-full py-3.5 text-base" disabled={ocupado || quedan <= 0} onClick={onEmpezar} data-testid="sabio-empezar">
        {ocupado ? <Loader2 className="mx-auto h-5 w-5 animate-spin" /> : quedan > 0 ? "Subir al atril" : "Mañana hay más entradas"}
      </button>
      <p className="text-center text-[11px] text-amber-100/70" data-testid="sabio-entradas">
        Entradas de hoy: {quedan} de {ENTRADAS_DIA} · gozo de hoy {y.gozoHoy} de {GOZO_SABIO_DIA}
      </p>
      {aviso && <p className="rounded-xl bg-red-950/70 px-3 py-2 text-center text-xs">{aviso}</p>}
      <div className="grid grid-cols-4 gap-1 rounded-full bg-black/30 p-1">
        {(
          [
            ["semana", "Semana", Trophy],
            ["siempre", "Siempre", Crown],
            ["trajes", "Trajes", Shirt],
            ["reglas", "Reglas", ScrollText],
          ] as const
        ).map(([id, nombre, Icono]) => (
          <button
            key={id}
            type="button"
            aria-pressed={tab === id}
            onClick={() => setTab(id)}
            className={`flex items-center justify-center gap-1 rounded-full px-1.5 py-1.5 text-[11px] font-bold ${tab === id ? "bg-amber-400 text-amber-950" : "text-amber-100/80"}`}
            data-testid={`sabio-tab-${id}`}
          >
            <Icono className="h-3.5 w-3.5" /> {nombre}
          </button>
        ))}
      </div>
      {tab === "semana" && (
        <Tabla
          filas={estado.tablaSemana}
          vacia="Esta semana nadie ha subido todavía. ¡Sé el primero!"
          nota={`Cuenta tu mejor partida de la semana. Los tres primeros reciben ${PREMIO_SEMANA.join(", ")} de gozo el lunes.${estado.miPuestoSemana ? ` Vas en el puesto ${estado.miPuestoSemana}.` : ""}`}
        />
      )}
      {tab === "siempre" && <Tabla filas={estado.tablaSiempre} vacia="Todavía no hay sabios en la tabla." nota="La sabiduría que juntó cada persona en todas sus partidas." conGanadas />}
      {tab === "trajes" && <Trajes premios={y.premios} />}
      {tab === "reglas" && <Reglas />}
      <p className="pb-2 text-center font-serif text-[12px] italic text-amber-100/70">
        «{VERSO_CONCURSO.text}» <span className="not-italic font-semibold text-amber-300">{VERSO_CONCURSO.ref}</span>
      </p>
    </div>
  );
}

function Dato({ titulo, valor }: { titulo: string; valor: string }) {
  return (
    <div className="rounded-xl bg-white/10 px-2 py-2">
      <p className="text-[10px] font-bold uppercase tracking-wider text-amber-200/70">{titulo}</p>
      <p className="truncate text-sm font-black">{valor}</p>
    </div>
  );
}

function Tabla({ filas, vacia, nota, conGanadas }: { filas: FilaTabla[]; vacia: string; nota: string; conGanadas?: boolean }) {
  return (
    <div className="space-y-1.5" data-testid="sabio-tabla">
      {filas.length === 0 ? (
        <p className="py-4 text-center text-xs text-amber-100/70">{vacia}</p>
      ) : (
        <ol className="divide-y divide-white/10 rounded-2xl bg-black/30">
          {filas.map((f) => (
            <li key={`${f.puesto}-${f.nombre}`} className={`flex items-center gap-2 px-3 py-2 text-[13px] ${f.esYo ? "bg-amber-400/20" : ""}`}>
              <span className="w-6 text-center font-black">{f.puesto <= 3 ? ["🥇", "🥈", "🥉"][f.puesto - 1] : f.puesto}</span>
              <span className="min-w-0 flex-1 truncate font-bold">
                {f.nombre}
                {f.esYo ? " (tú)" : ""}
              </span>
              <span className="text-[11px] text-amber-200/70">grada {f.grada}{conGanadas && f.ganadas ? ` · ${f.ganadas} 🌟` : ""}</span>
              <span className="w-20 text-right font-black tabular-nums">{miles(f.puntos)}</span>
            </li>
          ))}
        </ol>
      )}
      <p className="text-center text-[11px] text-amber-100/60">{nota}</p>
    </div>
  );
}

function Trajes({ premios }: { premios: string[] }) {
  return (
    <div className="space-y-2" data-testid="sabio-trajes">
      <div className="grid grid-cols-2 gap-2">
        {TRAJES_SABIOS.map((t) => {
          const tiene = premios.includes(t.id);
          return (
            <div key={t.id} className={`rounded-xl p-2.5 ${tiene ? "bg-amber-400/15 ring-1 ring-amber-300/60" : "bg-white/5"}`}>
              <div className="flex items-center gap-2">
                <span className="h-7 w-7 shrink-0 rounded-full ring-2 ring-white/30" style={{ background: t.color }} />
                <p className="text-[12px] font-black leading-tight">{t.nombre}</p>
              </div>
              <p className="mt-1 text-[11px] text-amber-100/70">{tiene ? "✓ Es tuyo: póntelo en Tu casa, en Adornos y ropa." : `🔒 ${t.requisito}.`}</p>
            </div>
          );
        })}
      </div>
      <p className="text-center font-serif text-[12px] italic text-amber-100/70">
        «{VERSO_TRAJES.text}» <span className="not-italic font-semibold text-amber-300">{VERSO_TRAJES.ref}</span>
      </p>
      <p className="text-center text-[11px] text-amber-100/60">Estos mantos y fajas no se venden en el mercado: solo se ganan en la casa de la sabiduría.</p>
    </div>
  );
}

function Reglas() {
  return (
    <div className="space-y-2 rounded-2xl bg-black/30 p-3 text-[12.5px] leading-snug" data-testid="sabio-reglas">
      <p>• Quince gradas, una pregunta por grada, cada vez más difícil. Las gradas <b>5</b> y <b>10</b> son seguras: si fallas después, te quedas con ellas.</p>
      <p>• Tienes {segundosGrada(1)} segundos en las gradas 1 a 5, {segundosGrada(6)} en la 6 a la 10 y {segundosGrada(11)} en las últimas. Puedes retirarte con lo ganado antes de responder.</p>
      <p>• Antes de corregir, el presentador te pregunta si es tu última palabra.</p>
      <div className="space-y-1.5">
        {ORDEN_COMODINES.map((c) => (
          <p key={c}>
            {COMODINES[c].icono} <b>{COMODINES[c].nombre}:</b> {COMODINES[c].texto} <span className="italic text-amber-200/80">«{COMODINES[c].verso.text}» {COMODINES[c].verso.ref}</span>
          </p>
        ))}
      </div>
      <p>• {ENTRADAS_DIA} entradas por día (las siete columnas). Las preguntas no se te repiten hasta que veas todas las de esa grada.</p>
      <p>• Ganas puntos de sabiduría, gozo (hasta {GOZO_SABIO_DIA} por día), títulos ({TITULOS.map((t) => t.nombre).join(", ")}) y los trajes de los sabios.</p>
    </div>
  );
}

// ================================================================ el resultado
function Fin({ fin, estado, onOtra, onPortada, ocupado, aviso }: { fin: FinPartida; estado: SabioEstado | null; onOtra: () => void; onPortada: () => void; ocupado: boolean; aviso: string | null }) {
  const gano = fin.estado === "gano";
  const titulo = gano ? "¡Subiste las quince gradas!" : fin.estado === "retiro" ? "Te retiraste a tiempo" : fin.estado === "tiempo" ? "Se acabó el tiempo" : "Fin de la partida";
  const quedan = estado ? Math.max(0, ENTRADAS_DIA - estado.yo.entradasHoy) : 0;
  const frase = gano ? FRASES_PRESENTADOR.gano : fin.estado === "retiro" ? FRASES_PRESENTADOR.retiro : null;
  return (
    <div className="mx-auto max-w-md space-y-3 pt-4 text-center" data-testid="sabio-fin">
      <Portrait who="etan" size={72} />
      <p className={`font-serif text-2xl font-black ${gano ? "sabio-titulo" : ""}`}>{titulo}</p>
      <p className="text-sm text-amber-100/80">Te quedas en la grada {fin.grada} de {GRADAS}</p>
      <div className="sabio-pregunta rounded-2xl p-4">
        <p className="text-[11px] font-bold uppercase tracking-widest text-amber-200/80">Puntos de sabiduría</p>
        <p className="font-serif text-4xl font-black text-amber-200" data-testid="sabio-fin-puntos">{miles(fin.puntos)}</p>
        <p className="mt-1 text-sm font-bold">✨ +{fin.gozo} de gozo{fin.topeGozo ? " (llegaste al tope de hoy)" : ""}</p>
      </div>
      {fin.correcta && !gano && (
        <p className="rounded-xl bg-white/5 p-2.5 text-[12.5px]">
          La respuesta era <b>{fin.correcta}</b>. {fin.explica} <span className="text-amber-300">({fin.ref})</span>
        </p>
      )}
      {fin.tituloNuevo && fin.titulo && (
        <p className="rounded-xl bg-amber-400/20 p-2.5 text-sm font-black" data-testid="sabio-fin-titulo">
          Nuevo título: {fin.titulo.icono} {fin.titulo.nombre}
        </p>
      )}
      {fin.premios.length > 0 && (
        <div className="space-y-1.5 rounded-2xl bg-amber-400/15 p-3" data-testid="sabio-fin-premios">
          <p className="text-[11px] font-bold uppercase tracking-widest text-amber-200">¡Ganaste un traje de los sabios!</p>
          {fin.premios.map((t) => (
            <div key={t.id} className="flex items-center justify-center gap-2 text-sm font-black">
              <span className="h-6 w-6 rounded-full ring-2 ring-white/40" style={{ background: t.color }} />
              {t.nombre}
            </div>
          ))}
          <p className="text-[11px] text-amber-100/70">Ya está en el armario de tu casa: póntelo en Adornos y ropa.</p>
        </div>
      )}
      {frase && (
        <p className="font-serif text-[13px] italic text-amber-100/80">
          «{frase.text}» <span className="not-italic font-semibold text-amber-300">{frase.ref}</span>
        </p>
      )}
      <div className="grid gap-2">
        <button type="button" className="sabio-boton w-full" disabled={ocupado || quedan <= 0} onClick={onOtra} data-testid="sabio-otra">
          {quedan > 0 ? `Jugar otra vez (te quedan ${quedan})` : "Ya usaste las entradas de hoy"}
        </button>
        <button type="button" className="w-full rounded-xl bg-white/10 py-2.5 text-sm font-bold hover:bg-white/20" onClick={onPortada} data-testid="sabio-portada-volver">
          Ver las tablas y los trajes
        </button>
      </div>
      {aviso && <p className="rounded-xl bg-red-950/70 px-3 py-2 text-xs">{aviso}</p>}
    </div>
  );
}

const ESTILOS = `
.sabio-titulo{background:linear-gradient(180deg,#fff6d6 0%,#f2c94c 55%,#b8860b 100%);-webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 2px 6px rgba(242,201,76,.35))}
.sabio-foco{position:absolute;top:-30%;width:70%;height:120%;filter:blur(40px);opacity:.35;mix-blend-mode:screen}
.sabio-foco-a{left:-15%;background:radial-gradient(closest-side,rgba(126,87,255,.9),transparent);animation:sabioFocoA 9s ease-in-out infinite alternate}
.sabio-foco-b{right:-15%;background:radial-gradient(closest-side,rgba(242,201,76,.75),transparent);animation:sabioFocoB 11s ease-in-out infinite alternate}
@keyframes sabioFocoA{from{transform:translateX(0) rotate(-8deg)}to{transform:translateX(18%) rotate(6deg)}}
@keyframes sabioFocoB{from{transform:translateX(0) rotate(8deg)}to{transform:translateX(-18%) rotate(-6deg)}}
.sabio-pregunta{background:linear-gradient(180deg,rgba(40,28,92,.92),rgba(16,10,40,.92));border:1.5px solid rgba(242,201,76,.65);box-shadow:0 0 0 3px rgba(242,201,76,.08),0 10px 30px rgba(0,0,0,.45),inset 0 1px 0 rgba(255,255,255,.08)}
.sabio-op{background:linear-gradient(180deg,#221a52,#120c2e);border:1px solid rgba(242,201,76,.45)}
.sabio-op:hover:not(:disabled){border-color:rgba(242,201,76,.9);box-shadow:0 0 12px rgba(242,201,76,.25)}
.sabio-op-elegida{background:linear-gradient(180deg,#f6c453,#c98a12);color:#2a1a00;border:1px solid #fff2c2;animation:sabioPulso 1s ease-in-out infinite}
.sabio-op-elegida span:first-child{color:#2a1a00!important}
.sabio-op-fija{background:linear-gradient(180deg,#f6a623,#b8650a);color:#2a1300;border:1px solid #ffd27a;box-shadow:0 0 22px rgba(246,166,35,.55)}
.sabio-op-fija span:first-child{color:#2a1300!important}
.sabio-op-bien{background:linear-gradient(180deg,#4ade80,#15803d);color:#052e12;border:1px solid #bbf7d0;animation:sabioBien .9s ease-in-out 3}
.sabio-op-bien span:first-child{color:#052e12!important}
.sabio-op-mal{background:linear-gradient(180deg,#f87171,#991b1b);color:#fff;border:1px solid #fecaca}
@keyframes sabioPulso{0%,100%{box-shadow:0 0 0 rgba(246,196,83,0)}50%{box-shadow:0 0 18px rgba(246,196,83,.7)}}
@keyframes sabioBien{0%,100%{box-shadow:0 0 0 rgba(74,222,128,0)}50%{box-shadow:0 0 26px rgba(74,222,128,.9)}}
.sabio-boton{border-radius:.85rem;padding:.7rem 1rem;font-weight:900;font-size:.9rem;color:#2a1a00;background:linear-gradient(180deg,#ffe28a,#e0a91c);box-shadow:0 6px 18px rgba(224,169,28,.35),inset 0 1px 0 rgba(255,255,255,.6)}
.sabio-boton:disabled{opacity:.5}
.sabio-latido{animation:sabioLatido .8s ease-in-out infinite}
@keyframes sabioLatido{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}
.sabio-destello{background:radial-gradient(circle at 50% 40%,rgba(255,236,170,.35),transparent 60%);animation:sabioDestello 1.2s ease-out forwards}
@keyframes sabioDestello{from{opacity:1}to{opacity:0}}
.sabio-barra{animation:sabioBarra .8s ease-out}
@keyframes sabioBarra{from{transform:scaleY(0);transform-origin:bottom}to{transform:scaleY(1);transform-origin:bottom}}
@media (prefers-reduced-motion: reduce){.sabio-foco,.sabio-op-elegida,.sabio-op-bien,.sabio-latido,.sabio-destello,.sabio-barra{animation:none!important}}
`;

