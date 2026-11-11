/**
 * «¿Quién es sabio?» (shared/sabio.ts): el concurso de la casa de la sabiduría, en pantalla completa. Un
 * escenario oscuro con luces, el presentador (Etán ezraíta), las quince gradas, el reloj, los comodines, la
 * última palabra con suspenso, la respuesta con su cita, las tablas y los trajes de los sabios.
 * El servidor corrige: aquí nunca está la respuesta antes de contestar.
 */
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Crown, Eye, ListOrdered, Loader2, Lock, PhoneCall, ScrollText, Shirt, Trophy, Volume2, VolumeX, X } from "lucide-react";
import { Portrait } from "./Portrait";
import { gameStore } from "./store";
import { CiudadCtx } from "./CiudadUI";
import { sonido } from "./sabio-sonido";
import { sabioRed } from "./sabio-red";
import { ICONO_CAMINO } from "./barrio-chat";
import {
  APLAUSOS, COMODINES, CONSEJOS_FAJA, ENTRADAS_DIA, FRASES_PRESENTADOR, GOZO_CONSEJO, GOZO_SABIO_DIA, GRADAS, GRADAS_SEGURAS, LLAMADA_S, NOMBRE_CONCURSO, ORDEN_COMODINES,
  PREMIO_SEMANA, PUNTOS_GRADA, TITULOS, TRAJES_SABIOS, VERSO_CASA, VERSO_CONCURSO, VERSO_CONSEJO, VERSO_PUBLICO, VERSO_TRAJES, canticoGrada, segundosGrada,
  type AmigoPosible, type AplausoId, type Comodin, type ConsejoAmigo, type EnVivo, type FilaTabla, type FinPartida, type MirarVista, type PartidaVista, type PreguntaVista,
  type PublicoVista, type Relacion, type RespuestaSabio, type SabioEstado,
} from "@shared/sabio";

const API = "/api/jerusalen/sabio";
/** Pedir algo al servidor: GET sin cuerpo (`leer`) o POST con cuerpo. */
async function pedir<T>(path: string, body?: unknown): Promise<{ ok: boolean; status: number; data: (T & { message?: string }) | null }> {
  try {
    const res = await fetch(`${API}${path}`, {
      method: body === undefined ? "GET" : "POST",
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
const primerNombre = (s: string) => s.split(/[\s,]+/)[0] || s;
const RELACION: Record<Relacion, string> = { amigo: "tu amigo", vecino: "tu vecino", ambos: "tu amigo y vecino" };

/** Los aplausos que llegan flotan sobre la pantalla un momento. */
type Flota = { id: number; icono: string; x: number };
let flotaId = 0;
function nuevosAplausos(antes: PublicoVista | null, ahora: PublicoVista): Flota[] {
  if (!antes || ahora.ultimo <= antes.ultimo) return [];
  const out: Flota[] = [];
  for (const a of APLAUSOS) {
    const n = Math.max(0, (ahora.aplausos[a.id] ?? 0) - (antes.aplausos[a.id] ?? 0));
    for (let k = 0; k < Math.min(4, n); k++) out.push({ id: ++flotaId, icono: a.icono, x: 8 + Math.random() * 84 });
  }
  // si los conteos no subieron (se fueron los viejos), igual se ve que alguien aplaudió
  if (!out.length) out.push({ id: ++flotaId, icono: "👏", x: 8 + Math.random() * 84 });
  return out;
}

type Fase = "cargando" | "portada" | "entre" | "pregunta" | "confirmar" | "suspenso" | "revelado" | "fin" | "mirando" | "error";
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
  // con amigos: a quién llamar, la llamada en curso, el público y la partida que se mira
  const [elegirAmigo, setElegirAmigo] = useState(false);
  const [amigos, setAmigos] = useState<AmigoPosible[] | null>(null);
  const [restaLlamada, setRestaLlamada] = useState(0);
  const [publico, setPublico] = useState<PublicoVista | null>(null);
  const [flotan, setFlotan] = useState<Flota[]>([]);
  const [mirandoId, setMirandoId] = useState<number | null>(null);
  const pararSuspenso = useRef<() => void>(() => undefined);
  const finTiempo = useRef<number>(0);
  const finLlamada = useRef<number>(0);
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

  // la llamada a un amigo o vecino: se cuenta su tiempo y se pregunta al servidor hasta que llegue el consejo
  const faseRef = useRef(fase);
  faseRef.current = fase;
  const llamadaPendiente = useRef(false);
  const llamadaId = partida?.llamada && (fase === "pregunta" || fase === "confirmar") ? partida.id : null;
  const traerPartida = useCallback(async () => {
    const r = await pedir<{ partida: PartidaVista | null }>("/partida");
    // si ya respondió mientras tanto, lo que llega es viejo
    if (!vivo.current || !r.ok || !r.data?.partida || (faseRef.current !== "pregunta" && faseRef.current !== "confirmar")) return;
    const p = r.data.partida;
    setPartida(p);
    if (p.pregunta) {
      finTiempo.current = Date.now() + p.pregunta.restantes * 1000;
      setQVista(p.pregunta);
    }
    if (!p.llamada && llamadaPendiente.current) {
      llamadaPendiente.current = false;
      sonido.comodin();
      setDice(p.amigo?.vecino ? `¡Llegó el consejo de ${p.amigo.quien}!` : "Husai, el amigo del rey, te manda decir…");
    }
  }, []);
  // si se acaba el tiempo con la lista abierta, se cierra
  useEffect(() => {
    if (fase !== "pregunta") setElegirAmigo(false);
  }, [fase]);
  useEffect(() => {
    if (llamadaId === null) return;
    const t = setInterval(() => {
      setRestaLlamada(Math.max(0, Math.ceil((finLlamada.current - Date.now()) / 1000)));
    }, 250);
    const sondeo = setInterval(() => void traerPartida(), 2000);
    const quitar = sabioRed.onConsejo((id) => {
      if (id === llamadaId) void traerPartida();
    });
    return () => {
      clearInterval(t);
      clearInterval(sondeo);
      quitar();
    };
  }, [llamadaId, traerPartida]);

  // quien juega ve cuántos lo miran y los aplausos del público
  const jugandoId = partida && (fase === "entre" || fase === "pregunta" || fase === "confirmar" || fase === "suspenso" || fase === "revelado") ? partida.id : null;
  const ultimoPublico = useRef<PublicoVista | null>(null);
  useEffect(() => {
    if (jugandoId === null) return;
    ultimoPublico.current = null;
    let parar = false;
    const leerPublico = async () => {
      const r = await pedir<{ publico: PublicoVista }>(`/publico?id=${jugandoId}`);
      if (parar || !vivo.current || !r.ok || !r.data?.publico) return;
      const nuevos = nuevosAplausos(ultimoPublico.current, r.data.publico);
      ultimoPublico.current = r.data.publico;
      setPublico(r.data.publico);
      if (nuevos.length) {
        sonido.aplauso();
        setFlotan((f) => [...f, ...nuevos].slice(-12));
        setTimeout(() => setFlotan((f) => f.filter((x) => !nuevos.some((n) => n.id === x.id))), 2400);
      }
    };
    void leerPublico();
    const t = setInterval(() => void leerPublico(), 3000);
    return () => {
      parar = true;
      clearInterval(t);
    };
  }, [jugandoId]);

  function mostrarPregunta(p: PartidaVista, retomada = false) {
    const q = p.pregunta!;
    finTiempo.current = Date.now() + q.restantes * 1000;
    if (p.llamada) {
      finLlamada.current = Date.now() + p.llamada.restantes * 1000;
      llamadaPendiente.current = true;
    }
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

  async function abrirAmigos() {
    if (ocupado || fase !== "pregunta") return;
    setElegirAmigo(true);
    setAmigos(null);
    const r = await pedir<{ amigos: AmigoPosible[] }>("/amigos");
    if (!vivo.current) return;
    setAmigos(r.ok && r.data?.amigos ? r.data.amigos : []);
  }

  async function comodin(tipo: Comodin, a?: number) {
    if (ocupado || fase !== "pregunta") return;
    setOcupado(true);
    setAviso(null);
    const r = await pedir<{ partida: PartidaVista }>("/comodin", a ? { tipo, a } : { tipo });
    setOcupado(false);
    if (!r.ok || !r.data?.partida) {
      setAviso(r.data?.message || "No se pudo usar el comodín.");
      // quien se llamó ya no puede: se vuelve a mirar la lista
      if (tipo === "amigo" && a && r.status === 409) void abrirAmigos();
      return;
    }
    setElegirAmigo(false);
    sonido.comodin();
    const p = r.data.partida;
    if (p.llamada) {
      finLlamada.current = Date.now() + p.llamada.restantes * 1000;
      llamadaPendiente.current = true;
      setRestaLlamada(p.llamada.restantes);
      finTiempo.current = Date.now() + (p.pregunta?.restantes ?? 0) * 1000;
      setPartida(p);
      setQVista(p.pregunta);
      setDice(`Llamamos a ${p.llamada.nombre}… ¡Tiene ${LLAMADA_S} segundos! Esos segundos se suman a tu reloj.`);
      return;
    }
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
          : p.amigo?.vecino
            ? `${p.amigo.quien} te manda decir…`
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
    setMirandoId(null);
    setPublico(null);
    setFase("cargando");
    setDice(FRASES_PRESENTADOR.bienvenida);
    await cargar();
  }

  function mirar(id: number) {
    city?.audio.click();
    setMirandoId(id);
    setFase("mirando");
  }

  async function cambiarLlamadas(si: boolean) {
    const r = await pedir<{ llamadas: boolean }>("/llamadas", { si });
    if (r.ok && r.data) setEstado((e) => (e ? { ...e, yo: { ...e.yo, llamadas: r.data!.llamadas } } : e));
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
        {fase === "portada" && estado && (
          <Portada estado={estado} onEmpezar={() => void empezar()} ocupado={ocupado} aviso={aviso} dice={dice} onMirar={mirar} onLlamadas={(si) => void cambiarLlamadas(si)} />
        )}
        {fase === "mirando" && mirandoId !== null && <MirarView id={mirandoId} onSalir={() => void volverAPortada()} />}
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
                {publico && publico.mirando > 0 && (
                  <span className="flex shrink-0 items-center gap-1 rounded-full bg-white/10 px-2 py-1 text-[11px] font-bold" data-testid="sabio-publico" title="Te están mirando en vivo">
                    <Eye className="h-3.5 w-3.5" /> {publico.mirando}
                  </span>
                )}
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
                          {partida.amigo?.opcion === i && !revelado && (
                            <span className="max-w-[6rem] truncate rounded-full bg-sky-400/30 px-1.5 text-[10px] font-bold text-sky-100">{partida.amigo.vecino ? primerNombre(partida.amigo.quien) : "Husai"}</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  {partida.ancianos && !revelado && <Ancianos pct={partida.ancianos} quitadas={q.quitadas} />}
                  {partida.llamada && !revelado && (
                    <div className="flex items-center gap-2 rounded-xl bg-emerald-950/60 p-2.5 text-[13px]" data-testid="sabio-llamando">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500/80">
                        <PhoneCall className="h-4 w-4 animate-pulse" />
                      </span>
                      <p className="min-w-0 flex-1">
                        Llamando a <b>{partida.llamada.nombre}</b>… le quedan <b className="tabular-nums">{restaLlamada}</b> segundos para darte su consejo.
                      </p>
                    </div>
                  )}
                  {partida.amigo && !revelado && <ConsejoVisto amigo={partida.amigo} />}
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
                              onClick={() => (c === "amigo" ? void abrirAmigos() : void comodin(c))}
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

      {flotan.length > 0 && (
        <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden" aria-hidden="true">
          {flotan.map((f) => (
            <span key={f.id} className="sabio-flota absolute bottom-16 text-3xl" style={{ left: `${f.x}%` }}>
              {f.icono}
            </span>
          ))}
        </div>
      )}

      {elegirAmigo && partida && (
        <ElegirAmigo
          amigos={amigos}
          ocupado={ocupado}
          aviso={aviso}
          onHusai={() => void comodin("amigo")}
          onLlamar={(a) => void comodin("amigo", a)}
          onCerrar={() => {
            setElegirAmigo(false);
            setAviso(null);
          }}
        />
      )}

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

/** El consejo que llegó: el retrato de Husai, o el del amigo o vecino (con el ícono de su camino). */
function ConsejoVisto({ amigo }: { amigo: ConsejoAmigo }) {
  return (
    <div className="flex items-start gap-2 rounded-xl bg-sky-950/60 p-2.5 text-[13px]" data-testid="sabio-amigo">
      {amigo.vecino ? (
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-400/30 text-lg ring-2 ring-sky-300/60" aria-hidden="true">
          {ICONO_CAMINO[amigo.vecino.camino]}
        </span>
      ) : (
        <Portrait who="husai" size={36} />
      )}
      <p>
        <b>{amigo.quien}</b>
        {amigo.vecino ? <span className="text-sky-200/80"> ({RELACION[amigo.vecino.relacion]})</span> : null}: {amigo.dice}
      </p>
    </div>
  );
}

/** El comodín «Un amigo»: a quién llamar (amigos y vecinos que están ahora en la ciudad o en el templo) o Husai. */
function ElegirAmigo({
  amigos,
  ocupado,
  aviso,
  onHusai,
  onLlamar,
  onCerrar,
}: {
  amigos: AmigoPosible[] | null;
  ocupado: boolean;
  aviso: string | null;
  onHusai: () => void;
  onLlamar: (personajeId: number) => void;
  onCerrar: () => void;
}) {
  return (
    <div className="absolute inset-0 z-20 flex items-end justify-center bg-black/70 p-3 sm:items-center" onClick={onCerrar} data-testid="sabio-elegir-amigo">
      <div className="max-h-full w-full max-w-md overflow-y-auto rounded-2xl border border-amber-300/50 bg-[#150e36] p-3" onClick={(e) => e.stopPropagation()}>
        <p className="font-serif text-lg font-black text-amber-200">🤝 ¿A quién llamas?</p>
        <p className="text-[12px] text-amber-100/75">
          Un amigo o vecino que esté ahora en la ciudad tiene {LLAMADA_S} segundos para darte su consejo (y te los sumamos al reloj). El reloj sigue corriendo mientras eliges.
        </p>
        <button
          type="button"
          disabled={ocupado}
          onClick={onHusai}
          className="mt-2 flex w-full items-center gap-2 rounded-xl bg-white/10 p-2 text-left hover:bg-white/20 disabled:opacity-50"
          data-testid="sabio-amigo-husai"
        >
          <Portrait who="husai" size={36} />
          <span className="min-w-0 flex-1">
            <span className="block text-[13px] font-black">Husai, el amigo del rey</span>
            <span className="block text-[11px] text-amber-100/70">Contesta enseguida. «{COMODINES.amigo.verso.text}» ({COMODINES.amigo.verso.ref})</span>
          </span>
        </button>
        <p className="mb-1 mt-3 text-[11px] font-bold uppercase tracking-wider text-amber-200/80">Tus amigos y vecinos en línea</p>
        {amigos === null ? (
          <div className="flex justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin text-amber-300" />
          </div>
        ) : amigos.length === 0 ? (
          <p className="rounded-xl bg-white/5 p-3 text-center text-[12px] text-amber-100/75" data-testid="sabio-amigos-vacio">
            Ahora ninguno de tus amigos ni vecinos está en la ciudad (o están jugando). Husai siempre contesta.
          </p>
        ) : (
          <ul className="space-y-1.5" data-testid="sabio-amigos">
            {amigos.map((a) => (
              <li key={a.personajeId}>
                <button
                  type="button"
                  disabled={ocupado}
                  onClick={() => onLlamar(a.personajeId)}
                  className="flex w-full items-center gap-2 rounded-xl bg-emerald-900/40 p-2 text-left ring-1 ring-emerald-400/30 hover:bg-emerald-900/70 disabled:opacity-50"
                  data-testid={`sabio-amigo-${a.personajeId}`}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-lg" aria-hidden="true">
                    {ICONO_CAMINO[a.camino]}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-black">{a.nombre}</span>
                    <span className="block truncate text-[11px] text-amber-100/70">
                      {RELACION[a.relacion]} · {a.donde}
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-1 rounded-full bg-emerald-500 px-2.5 py-1 text-[11px] font-black text-emerald-950">
                    <PhoneCall className="h-3.5 w-3.5" /> Llamar
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
        {aviso && <p className="mt-2 rounded-xl bg-red-950/70 px-3 py-2 text-center text-xs">{aviso}</p>}
        <button type="button" className="mt-3 w-full rounded-xl bg-white/10 py-2 text-sm font-bold hover:bg-white/20" onClick={onCerrar} data-testid="sabio-amigo-volver">
          Volver a la pregunta
        </button>
      </div>
    </div>
  );
}

// ================================================================ portada
function Portada({
  estado,
  onEmpezar,
  ocupado,
  aviso,
  dice,
  onMirar,
  onLlamadas,
}: {
  estado: SabioEstado;
  onEmpezar: () => void;
  ocupado: boolean;
  aviso: string | null;
  dice: string;
  onMirar: (id: number) => void;
  onLlamadas: (si: boolean) => void;
}) {
  const [tab, setTab] = useState<"vivo" | "semana" | "siempre" | "trajes" | "reglas">(estado.enVivo.length ? "vivo" : "semana");
  const [enVivo, setEnVivo] = useState<EnVivo[]>(estado.enVivo);
  const y = estado.yo;
  const quedan = Math.max(0, ENTRADAS_DIA - y.entradasHoy);
  // quién juega ahora: se refresca solo
  useEffect(() => {
    let parar = false;
    const t = setInterval(async () => {
      const r = await pedir<{ enVivo: EnVivo[] }>("/en-vivo");
      if (!parar && r.ok && r.data?.enVivo) setEnVivo(r.data.enVivo);
    }, 10_000);
    return () => {
      parar = true;
      clearInterval(t);
    };
  }, []);
  const primero = enVivo[0];
  return (
    <div className="mx-auto max-w-2xl space-y-3 pt-2" data-testid="sabio-portada">
      {estado.premioSemana && (
        <div className="rounded-2xl bg-gradient-to-r from-amber-300 to-amber-500 p-3 text-center text-sm font-black text-amber-950 shadow-lg" data-testid="sabio-premio-semana">
          🏆 Quedaste en el puesto {estado.premioSemana.puesto} de la semana pasada: +{estado.premioSemana.gozo} de gozo
        </div>
      )}
      {primero && (
        <button
          type="button"
          onClick={() => onMirar(primero.id)}
          className="flex w-full items-center gap-2 rounded-2xl bg-red-950/60 p-2.5 text-left ring-1 ring-red-400/50 hover:bg-red-950/80"
          data-testid="sabio-envivo-banner"
        >
          <span className="sabio-latido h-2.5 w-2.5 shrink-0 rounded-full bg-red-500" aria-hidden="true" />
          <span className="min-w-0 flex-1 text-[12.5px]">
            <b>En vivo:</b> {primero.nombre} va por la grada {primero.grada + 1}
            {enVivo.length > 1 ? ` (y ${enVivo.length - 1} más)` : ""}
          </span>
          <span className="flex shrink-0 items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-black">
            <Eye className="h-3.5 w-3.5" /> Mirar
          </span>
        </button>
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
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-white/5 px-3 py-2 text-[11.5px]" data-testid="sabio-consejos">
        <span>
          🤝 Consejos dados: <b>{y.consejos}</b> · acertados: <b>{y.consejosBuenos}</b>
          {y.consejosBuenos < CONSEJOS_FAJA ? ` (faltan ${CONSEJOS_FAJA - y.consejosBuenos} para la faja del buen consejero)` : " · ¡ya tienes la faja!"}
        </span>
        <label className="flex cursor-pointer items-center gap-1.5 font-bold">
          <input type="checkbox" checked={y.llamadas} onChange={(e) => onLlamadas(e.target.checked)} className="h-4 w-4 accent-amber-400" data-testid="sabio-llamadas" />
          Recibir llamadas
        </label>
      </div>
      <button type="button" className="sabio-boton w-full py-3.5 text-base" disabled={ocupado || quedan <= 0} onClick={onEmpezar} data-testid="sabio-empezar">
        {ocupado ? <Loader2 className="mx-auto h-5 w-5 animate-spin" /> : quedan > 0 ? "Subir al atril" : "Mañana hay más entradas"}
      </button>
      <p className="text-center text-[11px] text-amber-100/70" data-testid="sabio-entradas">
        Entradas de hoy: {quedan} de {ENTRADAS_DIA} · gozo de hoy {y.gozoHoy} de {GOZO_SABIO_DIA}
      </p>
      {aviso && <p className="rounded-xl bg-red-950/70 px-3 py-2 text-center text-xs">{aviso}</p>}
      <div className="grid grid-cols-5 gap-0.5 rounded-full bg-black/30 p-1">
        {(
          [
            ["vivo", "En vivo", Eye],
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
            className={`flex items-center justify-center gap-0.5 rounded-full px-1 py-1.5 text-[10.5px] font-bold leading-none ${tab === id ? "bg-amber-400 text-amber-950" : "text-amber-100/80"}`}
            data-testid={`sabio-tab-${id}`}
          >
            <Icono className="h-3.5 w-3.5 shrink-0" /> <span className="truncate">{nombre}</span>
          </button>
        ))}
      </div>
      {tab === "vivo" && <EnVivoLista enVivo={enVivo} onMirar={onMirar} />}
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
      <p>
        • Con «Un amigo» llamas de verdad a un amigo o vecino que esté en la ciudad: le llega tu pregunta y tiene {LLAMADA_S} segundos. Si acierta, gana {GOZO_CONSEJO} de gozo; con {CONSEJOS_FAJA} consejos acertados gana la faja azul del buen consejero. <span className="italic text-amber-200/80">«{VERSO_CONSEJO.text}» {VERSO_CONSEJO.ref}</span>
      </p>
      <p>
        • El público: en «En vivo» miras las partidas que se juegan ahora y animas con 👏 🙏 🔥 (quien juega lo ve). <span className="italic text-amber-200/80">«{VERSO_PUBLICO.text}» {VERSO_PUBLICO.ref}</span>
      </p>
      <p>• {ENTRADAS_DIA} entradas por día (las siete columnas). Las preguntas no se te repiten hasta que veas todas las de esa grada.</p>
      <p>• Ganas puntos de sabiduría, gozo (hasta {GOZO_SABIO_DIA} por día), títulos ({TITULOS.map((t) => t.nombre).join(", ")}) y los trajes de los sabios.</p>
    </div>
  );
}

// ================================================================ el público
function EnVivoLista({ enVivo, onMirar }: { enVivo: EnVivo[]; onMirar: (id: number) => void }) {
  return (
    <div className="space-y-1.5" data-testid="sabio-envivo">
      {enVivo.length === 0 ? (
        <p className="rounded-2xl bg-black/30 py-4 text-center text-xs text-amber-100/70">Ahora no hay nadie en el atril. Cuando alguien juegue, aquí lo puedes mirar en vivo y animarlo.</p>
      ) : (
        <ul className="divide-y divide-white/10 rounded-2xl bg-black/30">
          {enVivo.map((v) => (
            <li key={v.id} className="flex items-center gap-2 px-3 py-2 text-[13px]">
              <span className="text-lg" aria-hidden="true">
                {ICONO_CAMINO[v.camino]}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-bold">{v.nombre}</span>
                <span className="block truncate text-[11px] text-amber-200/70">
                  grada {v.grada + 1} · {miles(v.puntos)} puntos{v.relacion ? ` · ${RELACION[v.relacion]}` : ""}
                </span>
              </span>
              {v.mirando > 0 && (
                <span className="flex items-center gap-0.5 text-[11px] text-amber-100/70">
                  <Eye className="h-3 w-3" /> {v.mirando}
                </span>
              )}
              <button type="button" className="rounded-full bg-amber-400 px-3 py-1 text-[11px] font-black text-amber-950" onClick={() => onMirar(v.id)} data-testid={`sabio-mirar-${v.id}`}>
                Mirar
              </button>
            </li>
          ))}
        </ul>
      )}
      <p className="text-center font-serif text-[11.5px] italic text-amber-100/70">
        «{VERSO_PUBLICO.text}» <span className="not-italic font-semibold text-amber-300">{VERSO_PUBLICO.ref}</span>
      </p>
    </div>
  );
}

/**
 * Mirar en vivo una partida: la pregunta, el reloj, los comodines y, al responder, si acertó (con su cita). El
 * público anima con aplausos que ve quien juega. Se pregunta al servidor cada segundo y medio.
 */
function MirarView({ id, onSalir }: { id: number; onSalir: () => void }) {
  const [v, setV] = useState<MirarVista | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [restan, setRestan] = useState(0);
  const [espera, setEspera] = useState(false);
  const [flotan, setFlotan] = useState<Flota[]>([]);
  const finTiempo = useRef(0);
  const ultimaVista = useRef<number | null>(null);
  const ultimoPublico = useRef<PublicoVista | null>(null);

  useEffect(() => {
    let parar = false;
    const leer = async () => {
      const r = await pedir<MirarVista>(`/mirar/${id}`);
      if (parar) return;
      if (!r.ok || !r.data) {
        if (r.status === 404 || r.status === 403) setError(r.data?.message || "Esa partida ya no está.");
        return;
      }
      const d = r.data;
      if (d.pregunta) finTiempo.current = Date.now() + d.pregunta.restantes * 1000;
      // la respuesta que se acaba de dar: suena como en el atril
      if (d.ultima && ultimaVista.current !== null && d.ultima.at !== ultimaVista.current) (d.ultima.bien ? sonido.bien : sonido.mal)();
      ultimaVista.current = d.ultima?.at ?? 0;
      const nuevos = nuevosAplausos(ultimoPublico.current, d.publico);
      ultimoPublico.current = d.publico;
      if (nuevos.length) {
        setFlotan((f) => [...f, ...nuevos].slice(-12));
        setTimeout(() => setFlotan((f) => f.filter((x) => !nuevos.some((n) => n.id === x.id))), 2400);
      }
      setV(d);
    };
    void leer();
    const t = setInterval(() => void leer(), 1500);
    const reloj = setInterval(() => setRestan(Math.max(0, Math.ceil((finTiempo.current - Date.now()) / 1000))), 250);
    return () => {
      parar = true;
      clearInterval(t);
      clearInterval(reloj);
    };
  }, [id]);

  async function aplaudir(tipo: AplausoId) {
    if (espera) return;
    setEspera(true);
    const icono = APLAUSOS.find((a) => a.id === tipo)?.icono ?? "👏";
    const mio = { id: ++flotaId, icono, x: 10 + Math.random() * 80 };
    setFlotan((f) => [...f, mio].slice(-12));
    setTimeout(() => setFlotan((f) => f.filter((x) => x.id !== mio.id)), 2400);
    sonido.aplauso();
    await pedir(`/mirar/${id}/aplauso`, { tipo });
    setTimeout(() => setEspera(false), 2600);
  }

  if (error)
    return (
      <div className="mx-auto max-w-md space-y-3 pt-8 text-center" data-testid="sabio-mirar">
        <p className="rounded-xl bg-white/5 p-4 text-sm">{error}</p>
        <button type="button" className="sabio-boton w-full" onClick={onSalir} data-testid="sabio-mirar-salir">
          Volver a la casa de la sabiduría
        </button>
      </div>
    );
  if (!v)
    return (
      <div className="flex h-full items-center justify-center" data-testid="sabio-mirar">
        <Loader2 className="h-8 w-8 animate-spin text-amber-300" />
      </div>
    );
  const q = v.pregunta;
  const u = v.ultima;
  const termino = v.estado !== "jugando";
  const n = q?.n ?? v.grada + 1;
  const dice = termino
    ? v.estado === "gano"
      ? `¡${v.nombre} subió las quince gradas!`
      : v.estado === "retiro"
        ? `${v.nombre} se retiró con ${miles(v.puntos)} puntos de sabiduría.`
        : `${v.nombre} se queda en la grada ${v.grada} con ${miles(v.puntos)} puntos.`
    : v.llamada
      ? `${v.nombre} llama a ${v.llamada.nombre} para pedirle consejo…`
      : q
        ? `Grada ${q.n}, el ${canticoGrada(q.n)}… ${v.nombre} lo piensa.`
        : u
          ? u.bien
            ? `¡Sabia respuesta de ${v.nombre}!`
            : u.elegida
              ? `Lo siento… ${v.nombre} no acertó.`
              : `A ${v.nombre} se le acabó el tiempo…`
          : `${v.nombre} está por subir a la grada ${n}.`;
  return (
    <div className="relative mx-auto max-w-2xl space-y-2.5 pt-2" data-testid="sabio-mirar">
      <div className="flex items-center justify-between gap-2">
        <p className="min-w-0 truncate text-[12px] font-bold uppercase tracking-wider text-amber-200/80">
          <span className="mr-1 inline-block h-2 w-2 rounded-full bg-red-500 align-middle" aria-hidden="true" /> En vivo · {ICONO_CAMINO[v.camino]} {v.nombre}
        </p>
        <span className="flex shrink-0 items-center gap-1 rounded-full bg-white/10 px-2 py-1 text-[11px] font-bold" data-testid="sabio-mirar-publico">
          <Eye className="h-3.5 w-3.5" /> {v.publico.mirando}
        </span>
      </div>
      <Presentador dice={dice} />
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-widest text-amber-200/80" data-testid="sabio-mirar-grada">
            Grada {Math.min(GRADAS, n)} de {GRADAS} · {canticoGrada(Math.min(GRADAS, n))}
          </p>
          <p className="text-sm font-black text-amber-100">
            {miles(v.puntos)} puntos <span className="font-semibold text-amber-200/70">· seguro {miles(v.seguro)}</span>
          </p>
        </div>
        {q && !termino && <Reloj restan={restan} total={q.segundos} />}
      </div>
      <MiniEscalera grada={v.grada} />
      {q && !termino ? (
        <>
          <div className="sabio-pregunta rounded-2xl px-4 py-3.5 text-center font-serif text-[16px] font-semibold leading-snug" data-testid="sabio-mirar-pregunta">
            {q.texto}
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {q.opciones.map((o, i) => (
              <div key={i} className={`sabio-op flex min-h-[44px] items-center gap-2 rounded-xl px-3 py-2 text-[14px] font-semibold ${q.quitadas.includes(i) ? "invisible" : ""}`}>
                <span className="font-black text-amber-300">{LETRAS[i]}:</span>
                <span className="min-w-0 flex-1">{o}</span>
                {v.amigo?.opcion === i && <span className="max-w-[6rem] truncate rounded-full bg-sky-400/30 px-1.5 text-[10px] font-bold text-sky-100">{v.amigo.vecino ? primerNombre(v.amigo.quien) : "Husai"}</span>}
              </div>
            ))}
          </div>
          {v.ancianos && <Ancianos pct={v.ancianos} quitadas={q.quitadas} />}
          {v.amigo && <ConsejoVisto amigo={v.amigo} />}
        </>
      ) : u && !(termino && v.estado === "retiro" && !u.elegida) ? (
        <>
          <div className="sabio-pregunta rounded-2xl px-4 py-3 text-center font-serif text-[15px] font-semibold leading-snug" data-testid="sabio-mirar-ultima">
            {u.texto}
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {u.opciones.map((o, i) => {
              const clase = o === u.correcta ? "sabio-op-bien" : o === u.elegida ? "sabio-op-mal" : "sabio-op opacity-60";
              return (
                <div key={i} className={`flex min-h-[40px] items-center gap-2 rounded-xl px-3 py-2 text-[13.5px] font-semibold ${clase}`}>
                  <span className="font-black">{LETRAS[i]}:</span>
                  <span className="min-w-0 flex-1">{o}</span>
                </div>
              );
            })}
          </div>
          <p className={`rounded-2xl p-3 text-[13px] leading-snug ${u.bien ? "bg-emerald-950/60" : "bg-red-950/60"}`}>
            {u.explica} <span className="font-semibold text-amber-300">({u.ref})</span>
          </p>
        </>
      ) : null}
      {!termino ? (
        <div className="grid grid-cols-3 gap-1.5 pt-1" data-testid="sabio-aplausos">
          {APLAUSOS.map((a) => (
            <button
              key={a.id}
              type="button"
              disabled={espera}
              onClick={() => void aplaudir(a.id)}
              className="flex flex-col items-center rounded-xl bg-white/10 py-1.5 text-[11px] font-bold hover:bg-white/20 disabled:opacity-50"
              data-testid={`sabio-aplauso-${a.id}`}
            >
              <span className="text-xl leading-none">{a.icono}</span>
              {a.texto}
            </button>
          ))}
        </div>
      ) : (
        <p className="rounded-xl bg-amber-400/15 p-3 text-center text-sm font-black" data-testid="sabio-mirar-fin">
          {dice}
        </p>
      )}
      <button type="button" className="w-full rounded-xl bg-white/10 py-2.5 text-sm font-bold hover:bg-white/20" onClick={onSalir} data-testid="sabio-mirar-salir">
        {termino ? "Volver a la casa de la sabiduría" : "Dejar de mirar"}
      </button>
      {flotan.length > 0 && (
        <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden" aria-hidden="true">
          {flotan.map((f) => (
            <span key={f.id} className="sabio-flota absolute bottom-16 text-3xl" style={{ left: `${f.x}%` }}>
              {f.icono}
            </span>
          ))}
        </div>
      )}
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
.sabio-flota{animation:sabioFlota 2.3s ease-out forwards;filter:drop-shadow(0 4px 10px rgba(0,0,0,.5))}
@keyframes sabioFlota{0%{transform:translateY(0) scale(.6);opacity:0}15%{opacity:1;transform:translateY(-20px) scale(1.1)}100%{transform:translateY(-260px) scale(1);opacity:0}}
@media (prefers-reduced-motion: reduce){.sabio-foco,.sabio-op-elegida,.sabio-op-bien,.sabio-latido,.sabio-destello,.sabio-barra,.sabio-flota{animation:none!important}}
`;

